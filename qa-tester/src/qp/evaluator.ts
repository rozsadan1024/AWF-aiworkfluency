// Replays the exact same evaluation logic as the live Quick Pill submit route

import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from '../config.js';
import { QPPill, QPEvalResult } from './types.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

// Same prompt as live-site/src/lib/kimi/prompts.ts QP_EVALUATION_PROMPT
const QP_EVALUATION_PROMPT = `You evaluate Quick Pill micro-learning responses for AIProof.

The user read a short knowledge bit and completed a 5-minute task. Evaluate their response on 3 metrics (0-100 each).

METRICS:
1. UNDERSTANDING (40%): Did the user grasp the concept from the knowledge bit? Look for: correct use of terminology, accurate paraphrasing, evidence they read and understood the material. 0-30 = missed the point. 31-60 = partial grasp. 61-80 = solid understanding. 81-100 = deep comprehension with own insights added.

2. APPLICATION (40%): Did they apply the concept correctly to the task? Look for: the concept is visible in their response, they followed the task instructions, the output would work in a real scenario. 0-30 = did not apply the concept. 31-60 = attempted but with errors. 61-80 = correctly applied. 81-100 = applied with sophistication.

3. READINESS (20%): Could they use this knowledge at work tomorrow? Look for: practical awareness, realistic examples, signs they connected it to their own context. 0-30 = theoretical only. 31-60 = some practical sense. 61-80 = ready to use. 81-100 = already connecting to specific work situations.

OVERALL SCORE = (understanding * 0.4) + (application * 0.4) + (readiness * 0.2). Round to integer.

OUTPUT FORMAT — respond with ONLY valid JSON:
{
  "overall_score": 0,
  "understanding_score": 0,
  "application_score": 0,
  "readiness_score": 0,
  "understanding_feedback": "1-2 sentences on their comprehension",
  "application_feedback": "1-2 sentences on how they applied it",
  "readiness_feedback": "1-2 sentences on practical readiness",
  "feedback_summary": "2-3 sentences of encouraging overall feedback",
  "practical_tip": "One specific thing they can do TOMORROW using this knowledge"
}

CALIBRATION — CRITICAL:
- 50 is the median. A "decent" attempt with some gaps.
- 75+ requires clearly correct application with no significant errors.
- Below 30 means the user missed the point or barely tried.
- If the response is very short (under 100 words) and vague, cap overall at 40.
- If the response does not reference or apply the specific concept from the knowledge bit, cap understanding at 30.

RULES:
- ALL text in English
- Be encouraging but honest
- The practical_tip must be concrete and actionable — not generic advice
- Do NOT use markdown in feedback strings
- Keep feedback concise — this is a 5-minute exercise, not a deep evaluation`;

function extractJSON(text: string): string {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  return text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
}

export async function evaluateQPResponse(
  pill: QPPill,
  responseText: string,
): Promise<{ result: QPEvalResult; tokens: number }> {
  const QP_EVAL_MODEL = process.env.WORKSPACE_MODEL || 'claude-haiku-4-5-20251001';

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
${responseText}

Evaluate this response. Return JSON only.`,
    }],
  });

  const tokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
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

  return { result: evalResult, tokens };
}
