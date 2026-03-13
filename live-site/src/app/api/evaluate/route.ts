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

    const [subRes, taskRes, convRes] = await Promise.all([
      supabase.from('submissions').select('*').eq('id', submission_id).single(),
      supabase.from('tasks').select('*').eq('id', task_id).single(),
      supabase.from('conversations').select('turn_number, user_message, ai_response')
        .eq('task_id', task_id).order('turn_number', { ascending: true }),
    ]);

    const submission = subRes.data;
    const task = taskRes.data;
    if (!submission || !task) {
      return NextResponse.json({ error: 'Submission or task not found' }, { status: 404 });
    }

    // Build workspace conversation section
    const conversations = convRes.data || [];
    let conversationSection = '';
    if (conversations.length > 0) {
      conversationSection = `\nWORKSPACE CONVERSATION (${conversations.length} turns):
${conversations.map(c => `--- Turn ${c.turn_number} ---\nUSER PROMPT: ${c.user_message}\nAI RESPONSE: ${c.ai_response}`).join('\n\n')}`;
    }

    // Include hidden trap if present in evaluation rubric
    const hiddenTrap = task.evaluation_rubric?.hidden_trap;
    const trapSection = hiddenTrap
      ? `\n\nHIDDEN TRAP IN THIS TASK:\n${hiddenTrap}`
      : '';

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
Evaluation criteria (rubric): ${JSON.stringify(task.evaluation_rubric)}
Explicit deliverable: ${task.evaluation_rubric?.deliverables || '(See scenario)'}
Expert solution reference (for calibration only — do NOT compare user output directly to this):
- Time benchmark: ${task.expert_solution?.time_benchmark} minutes
- Skills expected: ${task.skills_tested?.join(', ')}
- Key lesson: ${task.expert_solution?.key_lesson || ''}
- Prompt scorecard (what an expert prompt would contain): ${JSON.stringify(task.expert_solution?.prompt_scorecard || {})}
Expert time benchmark: ${task.estimated_minutes} minutes${trapSection}

USER SUBMISSION:
Final output:
${submission.final_output}
${conversationSection}

Prompts used by user:
${submission.prompts_used || '(User did not share their prompts — score prompt_sophistication lower, max 35)'}

Process description:
${submission.process_description || '(Not provided)'}

Tools used: ${submission.tools_used?.join(', ') || '(Not specified)'}
Time spent: ${submission.time_spent_minutes || '(Not specified)'} minutes

Return a JSON object only.`,
        },
      ],
    });

    const evalInputTokens = response.usage?.input_tokens || 0;
    const evalOutputTokens = response.usage?.output_tokens || 0;
    console.log(`[evaluate] tokens: ${evalInputTokens} in / ${evalOutputTokens} out (total: ${evalInputTokens + evalOutputTokens})`);

    const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
    const cleaned = extractJSON(raw);
    console.log('[evaluate] raw length:', raw.length, 'cleaned length:', cleaned.length);

    let evalResult: any;
    try {
      evalResult = JSON.parse(cleaned);
    } catch {
      const repaired = cleaned
        .replace(/,\s*([\]}])/g, '$1')
        .replace(/([^\\])\\n/g, '$1\\\\n')
        .replace(/[\x00-\x1F\x7F]/g, ' ');
      try {
        evalResult = JSON.parse(repaired);
      } catch {
        let attempt = repaired;
        const opens = (attempt.match(/{/g) || []).length;
        const closes = (attempt.match(/}/g) || []).length;
        for (let i = 0; i < opens - closes; i++) attempt += '}';
        evalResult = JSON.parse(attempt);
      }
    }

    // Bug #3 fix: Server-side weighted average validation
    const ds = evalResult.dimension_scores || {};
    const oq = ds.output_quality?.score ?? 50;
    const al = ds.ai_leverage?.score ?? 50;
    const ps = ds.prompt_sophistication?.score ?? 50;
    const hj = ds.human_judgment?.score ?? 50;
    const is_ = ds.iteration_skill?.score ?? 50;
    const weightedAvg = Math.round(oq * 0.35 + al * 0.25 + ps * 0.15 + hj * 0.15 + is_ * 0.10);
    evalResult.overall_score = weightedAvg; // always override Claude's calculation

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
