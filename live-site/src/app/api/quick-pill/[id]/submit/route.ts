import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { anthropic, extractJSON } from '@/lib/kimi/client';
import { QP_EVALUATION_PROMPT } from '@/lib/kimi/prompts';

const QP_EVAL_MODEL = process.env.WORKSPACE_MODEL || 'claude-haiku-4-5-20251001';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { answer_text } = await request.json();
    if (!answer_text?.trim()) {
      return NextResponse.json({ error: 'Answer is required' }, { status: 400 });
    }

    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get the pill
    const { data: pill, error: pillError } = await supabase
      .from('qp_pills')
      .select('*')
      .eq('id', params.id)
      .eq('active', true)
      .single();

    if (pillError || !pill) {
      return NextResponse.json({ error: 'Pill not found' }, { status: 404 });
    }

    // Check for existing submission (prevent duplicates)
    const { data: existing } = await supabase
      .from('qp_evaluations')
      .select('id')
      .eq('user_id', user.id)
      .eq('pill_id', params.id)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Already completed this pill' }, { status: 409 });
    }

    // Insert submission
    const { data: submission, error: subError } = await supabase
      .from('qp_submissions')
      .insert({
        pill_id: params.id,
        user_id: user.id,
        answer_text: answer_text.trim(),
      })
      .select()
      .single();

    if (subError) throw subError;

    // Call Claude Haiku for evaluation
    const response = await anthropic.messages.create({
      model: QP_EVAL_MODEL,
      max_tokens: 1500,
      system: QP_EVALUATION_PROMPT,
      messages: [{
        role: 'user',
        content: `KNOWLEDGE BIT THE USER READ:
Title: ${pill.title}
Theme: ${pill.theme}
Content:
${pill.knowledge_text}

TASK GIVEN TO THE USER:
${pill.task_prompt}

USER'S RESPONSE:
${answer_text}

Evaluate this response. Return JSON only.`,
      }],
    });

    const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
    const cleaned = extractJSON(raw);

    let evalResult: any;
    try {
      evalResult = JSON.parse(cleaned);
    } catch {
      const repaired = cleaned
        .replace(/,\s*([\]}])/g, '$1')
        .replace(/([^\\])\\n/g, '$1\\\\n')
        .replace(/[\x00-\x1F\x7F]/g, ' ');
      evalResult = JSON.parse(repaired);
    }

    // Server-side weighted average override
    const u = evalResult.understanding_score ?? 50;
    const a = evalResult.application_score ?? 50;
    const r = evalResult.readiness_score ?? 50;
    evalResult.overall_score = Math.round(u * 0.4 + a * 0.4 + r * 0.2);

    // Insert evaluation
    const { data: evaluation, error: evalError } = await supabase
      .from('qp_evaluations')
      .insert({
        submission_id: submission.id,
        user_id: user.id,
        pill_id: params.id,
        overall_score: evalResult.overall_score,
        understanding_score: evalResult.understanding_score ?? 50,
        application_score: evalResult.application_score ?? 50,
        readiness_score: evalResult.readiness_score ?? 50,
        understanding_feedback: evalResult.understanding_feedback || '',
        application_feedback: evalResult.application_feedback || '',
        readiness_feedback: evalResult.readiness_feedback || '',
        feedback_summary: evalResult.feedback_summary || 'Evaluation complete.',
        practical_tip: evalResult.practical_tip || '',
      })
      .select()
      .single();

    if (evalError) throw evalError;

    // Update user progress
    const { data: progress } = await supabase
      .from('qp_user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const now = new Date();
    if (progress) {
      const newCompleted = progress.pills_completed + 1;
      const newAvg = ((progress.average_score * progress.pills_completed) + evalResult.overall_score) / newCompleted;

      const lastPill = progress.last_pill_at ? new Date(progress.last_pill_at) : null;
      const daysDiff = lastPill ? Math.floor((now.getTime() - lastPill.getTime()) / 86400000) : 999;
      const newStreak = daysDiff <= 1 ? progress.streak_days + (daysDiff === 1 ? 1 : 0) : 1;
      const longestStreak = Math.max(progress.longest_streak, newStreak);

      // Update theme scores
      const themeScores = { ...progress.theme_scores } as Record<string, number>;
      const existing = themeScores[pill.theme] || 0;
      themeScores[pill.theme] = existing ? Math.round((existing * 0.7) + (evalResult.overall_score * 0.3)) : evalResult.overall_score;

      // Calculate level
      let level = 'curious';
      if (newCompleted >= 100 && newAvg >= 75) level = 'sage';
      else if (newCompleted >= 50 && newAvg >= 65) level = 'specialist';
      else if (newCompleted >= 25 && newAvg >= 55) level = 'practitioner';
      else if (newCompleted >= 10) level = 'explorer';

      await supabase.from('qp_user_progress').update({
        pills_completed: newCompleted,
        average_score: Math.round(newAvg * 100) / 100,
        streak_days: newStreak,
        longest_streak: longestStreak,
        last_pill_at: now.toISOString(),
        theme_scores: themeScores,
        level,
        updated_at: now.toISOString(),
      }).eq('user_id', user.id);
    } else {
      await supabase.from('qp_user_progress').insert({
        user_id: user.id,
        pills_completed: 1,
        average_score: evalResult.overall_score,
        streak_days: 1,
        longest_streak: 1,
        last_pill_at: now.toISOString(),
        theme_scores: { [pill.theme]: evalResult.overall_score },
        level: 'curious',
      });
    }

    return NextResponse.json({ evaluation });
  } catch (error) {
    console.error('Quick Pill submit error:', error);
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
