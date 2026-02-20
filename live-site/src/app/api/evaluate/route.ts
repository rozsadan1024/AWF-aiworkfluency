import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, MODEL, extractJSON } from '@/lib/kimi/client';
import { EVALUATION_PROMPT } from '@/lib/kimi/prompts';

export async function POST(request: Request) {
  try {
    const { submission_id, task_id } = await request.json();
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [subRes, taskRes] = await Promise.all([
      supabase.from('submissions').select('*').eq('id', submission_id).single(),
      supabase.from('tasks').select('*').eq('id', task_id).single(),
    ]);

    const submission = subRes.data;
    const task = taskRes.data;
    if (!submission || !task) {
      return NextResponse.json({ error: 'Submission or task not found' }, { status: 404 });
    }

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8000,
      system: EVALUATION_PROMPT,
      messages: [
        {
          role: 'user',
          content: `ORIGINAL TASK:
Title: ${task.title}
Difficulty: ${task.difficulty}
Scenario: ${task.scenario}
Expected deliverable: ${JSON.stringify(task.evaluation_rubric)}
Expert solution: ${JSON.stringify(task.expert_solution)}
Expert time benchmark: ${task.estimated_minutes} minutes

USER SUBMISSION:
Final output:
${submission.final_output}

Prompts used:
${submission.prompts_used || '(User did not share prompts)'}

Process description:
${submission.process_description || '(User did not describe their process)'}

Tools used: ${submission.tools_used?.join(', ') || '(Not specified)'}
Time spent: ${submission.time_spent_minutes || '(Not specified)'} minutes

Return a JSON object only.`,
        },
      ],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
    const cleaned = extractJSON(raw);
    console.log('[evaluate] raw length:', raw.length, 'cleaned length:', cleaned.length);
    const evalResult = JSON.parse(cleaned);

    console.log(`[evaluate] score:${evalResult.overall_score} feedback:${evalResult.feedback_text?.length || 0} chars`);

    const { data: evaluation, error: evalError } = await supabase.from('evaluations').insert({
      submission_id,
      user_id: user.id,
      task_id,
      overall_score: evalResult.overall_score || 50,
      dimension_scores: evalResult.dimension_scores || {},
      feedback_text: evalResult.feedback_text || 'Evaluation complete.',
      improvement_tips: evalResult.improvement_tips || [],
      top_strength: evalResult.top_strength || null,
      top_improvement: evalResult.top_improvement || null,
    }).select().single();

    if (evalError) throw evalError;

    await supabase.from('tasks').update({ status: 'evaluated' }).eq('id', task_id);

    const { data: progress } = await supabase.from('user_progress').select('*').eq('user_id', user.id).single();
    if (progress) {
      const newCompleted = progress.tasks_completed + 1;
      const newAvg = ((progress.average_score * progress.tasks_completed) + (evalResult.overall_score || 50)) / newCompleted;
      const lastActivity = progress.last_activity_at ? new Date(progress.last_activity_at) : null;
      const now = new Date();
      const daysDiff = lastActivity ? Math.floor((now.getTime() - lastActivity.getTime()) / 86400000) : 999;
      const newStreak = daysDiff <= 1 ? progress.streak_days + (daysDiff === 1 ? 1 : 0) : 1;
      let level = 'novice';
      if (newCompleted >= 20 && newAvg >= 75) level = 'expert';
      else if (newCompleted >= 12 && newAvg >= 65) level = 'proficient';
      else if (newCompleted >= 6 && newAvg >= 55) level = 'practitioner';
      else if (newCompleted >= 3) level = 'learner';
      const skillScores = { ...progress.skill_scores } as Record<string, number>;
      if (evalResult.dimension_scores) {
        for (const [key, val] of Object.entries(evalResult.dimension_scores)) {
          const existing = skillScores[key] || 0;
          const newScore = (val as { score: number }).score || 0;
          skillScores[key] = existing ? Math.round((existing * 0.7) + (newScore * 0.3)) : newScore;
        }
      }
      await supabase.from('user_progress').update({
        tasks_completed: newCompleted,
        average_score: Math.round(newAvg * 100) / 100,
        streak_days: newStreak,
        last_activity_at: now.toISOString(),
        level,
        skill_scores: skillScores,
        updated_at: now.toISOString(),
      }).eq('user_id', user.id);
    }

    return NextResponse.json({ evaluation });
  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
