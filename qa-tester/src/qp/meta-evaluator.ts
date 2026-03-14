import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from '../config.js';
import { QPPill, QPEvalResult, QPTestResult } from './types.js';
import { QPQuality, QP_QUALITY_RANGES } from './response-generator.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

const QP_META_PROMPT = `You are the QA auditor for AIProof's Quick Pill micro-learning module.

A synthetic test was run where:
1. A pill (knowledge bit + task) was presented
2. A response of KNOWN QUALITY was submitted
3. The platform evaluated it

YOUR JOB: Judge whether the platform's evaluation is correct.

Evaluate these aspects:

A) SCORING ACCURACY: Is the overall_score within the expected range for this quality level?
- accurate: within range ±5
- too_lenient / too_harsh: 5-15 points off
- wildly_off: >15 points off

B) FEEDBACK QUALITY (1-5): Is the feedback specific to the actual response? Does it reference concrete parts of what the user wrote? Is the practical_tip actionable?

C) EXPERT COMPARISON (1-5): Does the expert solution demonstrate a clearly better approach? Would comparing their answer to the expert solution teach them something?

D) TAKEAWAY RELEVANCE (1-5): Does the takeaway accurately capture the core lesson from this pill?

RESPOND WITH ONLY VALID JSON:
{
  "scoring_verdict": "accurate|too_lenient|too_harsh|wildly_off",
  "scoring_explanation": "why",
  "feedback_quality": 1-5,
  "expert_comparison": 1-5,
  "takeaway_relevance": 1-5,
  "overall_verdict": "pass|warning|fail",
  "issues": ["list of problems"],
  "recommendations": ["improvements"]
}

VERDICT RULES:
- PASS: scoring accurate + feedback ≥ 3 + expert ≥ 3 + takeaway ≥ 3
- WARNING: scoring slightly off OR any dimension < 3
- FAIL: scoring wildly_off OR feedback = 1`;

export async function metaEvaluateQP(
  pill: QPPill,
  responseText: string,
  quality: QPQuality,
  evalResult: QPEvalResult,
): Promise<{ result: any; tokens: number }> {
  const expectedRange = QP_QUALITY_RANGES[quality];

  const response = await anthropic.messages.create({
    model: CONFIG.models.metaEval,
    max_tokens: 1500,
    system: QP_META_PROMPT,
    messages: [{
      role: 'user',
      content: JSON.stringify({
        pill: {
          title: pill.title,
          theme: pill.theme,
          knowledge_text: pill.knowledge_text.slice(0, 500),
          task_prompt: pill.task_prompt,
          example_solution: pill.example_solution?.slice(0, 500) || null,
          takeaway: pill.takeaway,
        },
        synthetic_response: {
          content: responseText.slice(0, 1500),
          intended_quality: quality,
          expected_score_range: expectedRange,
        },
        platform_evaluation: evalResult,
      }, null, 2),
    }],
  });

  const tokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';

  let result: any;
  try {
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    result = JSON.parse(raw.slice(firstBrace, lastBrace + 1));
  } catch {
    result = {
      scoring_verdict: 'wildly_off',
      scoring_explanation: 'Meta-evaluator JSON parse failed',
      feedback_quality: 1,
      expert_comparison: 1,
      takeaway_relevance: 1,
      overall_verdict: 'fail',
      issues: ['Meta-evaluator response could not be parsed'],
      recommendations: [],
    };
  }

  return { result, tokens };
}
