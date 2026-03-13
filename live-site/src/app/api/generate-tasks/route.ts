import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, extractJSON } from '@/lib/kimi/client';
import { TASK_GENERATION_PROMPT } from '@/lib/kimi/prompts';
import { ADMIN_KNOWLEDGE_BASE } from '@/lib/knowledge-base/admin';

const TASK_GEN_MODEL = process.env.TASK_GEN_MODEL || 'claude-haiku-4-5-20251001';
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

const FREE_TASK_LIMIT = 3;
const DAILY_TASK_LIMIT = 5; // for paid tiers

export async function POST() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Check tier-based limits
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = profile?.subscription_tier || 'free';

    if (tier === 'free') {
      // Free tier: max 3 total tasks ever
      const { count } = await supabase
        .from('tasks')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if ((count || 0) >= FREE_TASK_LIMIT) {
        return NextResponse.json({
          error: 'limit_reached',
          message: 'Free tier limit reached. Upgrade to continue practicing.',
          limit: FREE_TASK_LIMIT,
        }, { status: 403 });
      }
    } else {
      // Paid tiers: max 5 tasks per day
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from('tasks')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString());

      if ((count || 0) >= DAILY_TASK_LIMIT) {
        return NextResponse.json({
          error: 'daily_limit_reached',
          message: 'Daily task limit reached. Come back tomorrow!',
          limit: DAILY_TASK_LIMIT,
        }, { status: 429 });
      }
    }

    const [roleRes, assessRes] = await Promise.all([
      supabase.from('role_profiles').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
      supabase.from('assessments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    ]);

    const roleProfile = roleRes.data;
    const assessment = assessRes.data;

    const userContext = roleProfile
      ? `USER PROFILE:
- Job: ${roleProfile.job_description}
- Pain point: ${roleProfile.pain_point_task}
- Typical morning: ${roleProfile.typical_morning}
- Tools: ${roleProfile.tools_used?.join(', ')}
- Parsed role: ${JSON.stringify(roleProfile.parsed_profile || {})}
${assessment ? `- AI Competence: ${assessment.current_ai_competence}/100\n- AI Exposure: ${assessment.ai_exposure_score}/100` : ''}`
      : 'USER PROFILE: Administrative professional, general office work, uses Microsoft Office.';

    const results = await Promise.allSettled(
      DIFFICULTIES.map(async (difficulty) => {
        const makeRequest = () => anthropic.messages.create({
          model: TASK_GEN_MODEL,
          max_tokens: 8192,
          system: `${TASK_GENERATION_PROMPT}\n\n${ADMIN_KNOWLEDGE_BASE}`,
          messages: [
            {
              role: 'user',
              content: `${userContext}\n\nGenerate a ${difficulty} task. Respond with valid JSON only.`,
            },
          ],
        });

        let response = await makeRequest();

        const inputTokens = response.usage?.input_tokens || 0;
        const outputTokens = response.usage?.output_tokens || 0;
        console.log(`[generate-tasks][${difficulty}] tokens: ${inputTokens} in / ${outputTokens} out (total: ${inputTokens + outputTokens})`);

        function parseWithRepair(text: string) {
          const cleaned = extractJSON(text);
          try {
            return JSON.parse(cleaned);
          } catch {
            const repaired = cleaned
              .replace(/,\s*([\]}])/g, '$1')
              .replace(/([^\\])\\n/g, '$1\\\\n')
              .replace(/[\x00-\x1F\x7F]/g, ' ');
            try {
              return JSON.parse(repaired);
            } catch {
              let attempt = repaired;
              const opens = (attempt.match(/{/g) || []).length;
              const closes = (attempt.match(/}/g) || []).length;
              for (let i = 0; i < opens - closes; i++) attempt += '}';
              const openB = (attempt.match(/\[/g) || []).length;
              const closeB = (attempt.match(/\]/g) || []).length;
              for (let i = 0; i < openB - closeB; i++) attempt += ']';
              return JSON.parse(attempt);
            }
          }
        }

        let raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
        let taskData: any;
        try {
          taskData = parseWithRepair(raw);
        } catch (parseErr) {
          // Retry once on parse failure
          console.log(`[generate-tasks][${difficulty}] JSON parse failed, retrying...`);
          response = await makeRequest();
          raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
          taskData = parseWithRepair(raw);
        }

        console.log(`[${difficulty}] expert approach: ${taskData.expert_solution?.approach?.length || 0} chars, micro_course: ${taskData.micro_course_content?.length || 0} chars`);

        const { data: inserted, error: insertError } = await supabase.from('tasks').insert({
          user_id: user.id,
          title: taskData.title || `${difficulty} Task`,
          scenario: taskData.scenario || 'Complete this administrative task.',
          input_materials: taskData.input_materials || null,
          difficulty,
          estimated_minutes: taskData.estimated_minutes || (difficulty === 'beginner' ? 15 : difficulty === 'intermediate' ? 30 : 45),
          skills_tested: taskData.skills_tested || ['prompting', 'output_evaluation'],
          evaluation_rubric: {
            ...(taskData.evaluation_criteria || {}),
            deliverables: taskData.deliverables || null,
          },
          expert_solution: taskData.expert_solution || {},
          micro_course_content: taskData.micro_course_content || null,
          status: 'pending',
        }).select().single();

        if (insertError) throw insertError;
        return inserted;
      })
    );

    const tasks = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
      .map(r => r.value);

    results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .forEach((r, i) => console.error(`Task generation error for ${DIFFICULTIES[i]}:`, r.reason));

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Generate tasks error:', error);
    return NextResponse.json({ error: 'Task generation failed' }, { status: 500 });
  }
}
