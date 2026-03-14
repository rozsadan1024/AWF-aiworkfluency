// Meta-Evaluator — the QA system's own judge
// Evaluates whether the PLATFORM's evaluation was correct

import Anthropic from '@anthropic-ai/sdk';
import { CONFIG, ResponseQuality, QUALITY_EXPECTED_RANGES, MetaEvalResult } from '../config.js';
import { ReplayedTask, ReplayedEvaluation } from '../platform/replayer.js';
import { TestProfile } from '../profiles/types.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

const META_EVAL_PROMPT = `You are the quality assurance auditor for AIProof, an AI upskilling platform.

You are reviewing a SYNTHETIC TEST where:
1. A test profile (known persona) was given a generated task
2. A synthetic response of KNOWN QUALITY was submitted
3. The platform evaluated the response

YOUR JOB: Judge whether the PLATFORM'S EVALUATION is correct.

EVALUATION CRITERIA:

A) SCORING ACCURACY
Compare the platform's overall_score against the expected range for this quality level.
- If within range ±5: "accurate"
- If slightly outside (5-15 points): "too_lenient" or "too_harsh"
- If wildly off (>15 points): "wildly_off"

B) FEEDBACK QUALITY (1-5)
1 = Generic template, could apply to any submission
2 = Some specific references but mostly boilerplate
3 = Specific to the submission but lacks practical advice
4 = Specific + actionable improvement tips
5 = Specific + actionable + calibrated to the user's profile/level

C) EXPERT SOLUTION QUALITY (1-5)
1 = Wrong or worse than what a beginner would produce
2 = Barely better than the submission
3 = Better but doesn't teach anything
4 = Better + demonstrates a superior approach with clear reasoning
5 = Significantly better, demonstrates expert thinking, would genuinely teach the user

D) TASK RELEVANCE (1-5)
1 = No connection to the profile's work area or industry
2 = Vaguely related to the industry
3 = Industry-specific but not role-specific
4 = Role-specific task
5 = Role + experience level + AI skill level all calibrated

E) TRAP HANDLING
- Was there a hidden trap in the task?
- Did the platform correctly evaluate whether the user caught it?
- If the synthetic response was "excellent" quality, did it catch the trap? Did the platform credit it?
- If the response was "bad/gibberish", did it miss the trap? Did the platform correctly note this?

RESPOND WITH ONLY VALID JSON:
{
  "scoring_accuracy": {
    "verdict": "accurate|too_lenient|too_harsh|wildly_off",
    "expected_range": [min, max],
    "actual_score": number,
    "delta": number,
    "explanation": "why the scoring is right or wrong"
  },
  "feedback_quality": {
    "score": 1-5,
    "is_actionable": boolean,
    "is_specific": boolean,
    "explanation": "assessment of feedback quality"
  },
  "expert_quality": {
    "score": 1-5,
    "is_better_than_submission": boolean,
    "explanation": "assessment of expert solution"
  },
  "task_relevance": {
    "score": 1-5,
    "explanation": "how well the task matches the profile"
  },
  "trap_handling": {
    "trap_present": boolean,
    "trap_description": "what the trap was",
    "correctly_evaluated": boolean,
    "explanation": "whether platform correctly assessed trap detection"
  },
  "overall_verdict": "pass|warning|fail",
  "issues": ["list of specific problems found"],
  "recommendations": ["list of actionable improvements"]
}

VERDICT RULES:
- PASS: scoring accurate + feedback ≥ 3 + expert ≥ 3 + task_relevance ≥ 3 + trap correctly evaluated
- WARNING: scoring slightly off OR any quality dimension < 3 OR trap evaluation questionable
- FAIL: scoring wildly_off OR feedback = 1 OR expert < 2 OR task completely irrelevant`;

export async function metaEvaluate(
  profile: TestProfile,
  task: ReplayedTask,
  syntheticResponse: string,
  quality: ResponseQuality,
  platformEval: ReplayedEvaluation,
): Promise<{ result: MetaEvalResult; tokens: number }> {
  const expectedRange = QUALITY_EXPECTED_RANGES[quality];

  const response = await anthropic.messages.create({
    model: CONFIG.models.metaEval,
    max_tokens: 3000,
    system: META_EVAL_PROMPT,
    messages: [{
      role: 'user',
      content: JSON.stringify({
        test_profile: {
          name: profile.name,
          work_area: profile.assessment.find(a => a.question_id === 'q1_work_area')?.value,
          industry: profile.roleProfile.industry,
          ai_confidence: profile.assessment.find(a => a.question_id === 'q11_confidence')?.value,
          description: profile.description,
        },
        task: {
          title: task.title,
          scenario: task.scenario,
          difficulty: task.difficulty,
          hidden_trap: task.evaluation_rubric?.hidden_trap || null,
          deliverables: task.evaluation_rubric?.deliverables || null,
          expert_solution: task.expert_solution,
        },
        synthetic_submission: {
          content: syntheticResponse.slice(0, 3000), // Truncate for token efficiency
          intended_quality: quality,
          expected_score_range: expectedRange,
        },
        platform_evaluation: {
          overall_score: platformEval.overall_score,
          dimension_scores: platformEval.dimension_scores,
          feedback_text: platformEval.feedback_text,
          top_strength: platformEval.top_strength,
          top_improvement: platformEval.top_improvement,
          improvement_tips: platformEval.improvement_tips,
        },
      }, null, 2),
    }],
  });

  const totalTokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';

  let result: MetaEvalResult;
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    result = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
  } catch {
    // Fallback: construct a fail result
    result = {
      scoring_accuracy: {
        verdict: 'wildly_off',
        expected_range: expectedRange,
        actual_score: platformEval.overall_score,
        delta: 0,
        explanation: 'Meta-evaluator JSON parse failed',
      },
      feedback_quality: { score: 1, is_actionable: false, is_specific: false, explanation: 'Parse error' },
      expert_quality: { score: 1, is_better_than_submission: false, explanation: 'Parse error' },
      task_relevance: { score: 1, explanation: 'Parse error' },
      trap_handling: { trap_present: false, trap_description: '', correctly_evaluated: false, explanation: 'Parse error' },
      overall_verdict: 'fail',
      issues: ['Meta-evaluator response could not be parsed'],
      recommendations: ['Check meta-evaluator prompt and model'],
    };
  }

  return { result, tokens: totalTokens };
}
