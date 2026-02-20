import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, MODEL, extractJSON } from '@/lib/kimi/client';
import { TASK_GENERATION_PROMPT } from '@/lib/kimi/prompts';
import { ADMIN_KNOWLEDGE_BASE } from '@/lib/knowledge-base/admin';

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

    const tasks = [];

    for (const difficulty of DIFFICULTIES) {
      try {
        const response = await anthropic.messages.create({
          model: MODEL,
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
        const taskData = JSON.parse(cleaned);

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

        if (insertError) {
          console.error(`Insert error for ${difficulty}:`, insertError);
        } else {
          tasks.push(inserted);
        }
      } catch (err) {
        console.error(`Task generation error for ${difficulty}:`, err);
      }
    }

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Generate tasks error:', error);
    return NextResponse.json({ error: 'Task generation failed' }, { status: 500 });
  }
}
