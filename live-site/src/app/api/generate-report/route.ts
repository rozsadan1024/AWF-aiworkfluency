import { NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/kimi/client';
import { REPORT_GENERATOR_PROMPT } from '@/lib/kimi/prompts';
import { AssessmentScores } from '@/types';

export async function POST(request: Request) {
  try {
    const { scores } = await request.json() as { scores: AssessmentScores };

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: REPORT_GENERATOR_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate a personalized report for these scores:
- AI Exposure Score: ${scores.ai_exposure_score}/100
- Current AI Competence: ${scores.current_ai_competence}/100  
- Adaptability Index: ${scores.adaptability_index}/100
- Awareness Gap: ${scores.awareness_gap}/100 (50 = accurate, >50 = underestimates risk)
- Action Readiness: ${scores.action_readiness}/100`,
        },
      ],
    });

    const report = response.content[0].type === 'text' ? response.content[0].text : 'Your assessment is complete.';
    return NextResponse.json({ report });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json(
      { report: 'Your assessment is complete. Sign up to get personalized practice tasks based on your results.' },
      { status: 200 }
    );
  }
}
