import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, extractJSON } from '@/lib/kimi/client';
import { TASK_GENERATION_PROMPT } from '@/lib/kimi/prompts';
import { ADMIN_KNOWLEDGE_BASE } from '@/lib/knowledge-base/admin';

const TASK_GEN_MODEL = process.env.TASK_GEN_MODEL || 'claude-haiku-4-5-20251001';
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

export async function POST() {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
        const response = await anthropic.messages.create({
          model: TASK_GEN_MODEL,
          max_tokens: 6000,
          system: `${TASK_GENERATION_PROMPT}\n\n${ADMIN_KNOWLEDGE_BASE}`,
          messages: [
            {
              role: 'user',
              content: `${userContext}\n\nGenerate a ${difficulty} task. Respond with valid JSON only.`,
            },
          ],
        });

        const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
        const cleaned = extractJSON(raw);
        let taskData: any;
        try {
          taskData = JSON.parse(cleaned);
        } catch {
          // Attempt repair: fix unescaped newlines in string values, trailing commas
          const repaired = cleaned
            .replace(/,\s*([\]}])/g, '$1')                    // trailing commas
            .replace(/([^\\])\\n/g, '$1\\\\n')                 // unescaped \n in strings
            .replace(/[\x00-\x1F\x7F]/g, ' ');                // control chars
          try {
            taskData = JSON.parse(repaired);
          } catch {
            // Last resort: truncated JSON — close all open braces/brackets
            let attempt = repaired;
            const opens = (attempt.match(/{/g) || []).length;
            const closes = (attempt.match(/}/g) || []).length;
            for (let i = 0; i < opens - closes; i++) attempt += '}';
            const openB = (attempt.match(/\[/g) || []).length;
            const closeB = (attempt.match(/\]/g) || []).length;
            for (let i = 0; i < openB - closeB; i++) attempt += ']';
            taskData = JSON.parse(attempt);
          }
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
          evaluation_rubric: taskData.evaluation_criteria || {},
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
