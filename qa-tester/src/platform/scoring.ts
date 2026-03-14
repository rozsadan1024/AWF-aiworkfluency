// Exact replica of live-site/src/lib/assessment/scoring.ts
// Any change here MUST mirror the frontend scoring logic

import { AssessmentAnswer, AssessmentScores } from '../profiles/types.js';

function getVal(answers: AssessmentAnswer[], id: string): string | string[] | number {
  return answers.find(a => a.question_id === id)?.value ?? '';
}

function numVal(answers: AssessmentAnswer[], id: string): number {
  const v = getVal(answers, id);
  return typeof v === 'number' ? v : parseInt(v as string, 10) || 0;
}

function strVal(answers: AssessmentAnswer[], id: string): string {
  const v = getVal(answers, id);
  return typeof v === 'string' ? v : '';
}

function arrVal(answers: AssessmentAnswer[], id: string): string[] {
  const v = getVal(answers, id);
  return Array.isArray(v) ? v : [];
}

export function calculateScores(answers: AssessmentAnswer[]): AssessmentScores {
  const competence = calcCompetence(answers);

  return {
    ai_exposure_score: calcExposure(answers),
    adaptability_index: calcAdaptability(answers),
    current_ai_competence: competence,
    awareness_gap: Math.max(0, Math.min(100, Math.round(50 + (numVal(answers, 'q11_confidence') / 5 * 100 - competence) / 2))),
    action_readiness: calcReadiness(answers),
  };
}

function calcExposure(a: AssessmentAnswer[]): number {
  let score = 0;
  score += (numVal(a, 'q3_computer_pct') / 100) * 35;
  score += (numVal(a, 'q4_repetitive') / 5) * 25;
  const highExposureTasks = ['writing', 'data', 'processing', 'research', 'scheduling'];
  const tasks = arrVal(a, 'q2_daily_tasks');
  const digitalCount = tasks.filter(t => highExposureTasks.includes(t)).length;
  score += Math.min(digitalCount * 8, 25);
  const roleWeight: Record<string, number> = {
    admin_ops: 15, finance: 14, marketing: 12, hr: 11, customer_service: 11,
    project_mgmt: 10, sales: 9, legal: 8, it_support: 7, management: 6, other: 8,
  };
  score += roleWeight[strVal(a, 'q1_work_area')] ?? 8;
  return Math.min(Math.round(score), 100);
}

function calcAdaptability(a: AssessmentAnswer[]): number {
  let score = 0;
  const newTools: Record<string, number> = { jump_in: 40, show_me: 25, wait: 12, stick: 5 };
  score += newTools[strVal(a, 'q_new_tools')] ?? 15;
  const output: Record<string, number> = { depends: 20, starting_point: 18, major_rewrite: 15, revise: 12, minor_edits: 8, as_is: 3 };
  score += output[strVal(a, 'q10_ai_output')] ?? 10;
  const errors: Record<string, number> = { caught_fast: 20, caught_slow: 14, unsure: 6, no: 4, not_enough: 2 };
  score += errors[strVal(a, 'q12_error_detection')] ?? 5;
  const usage = arrVal(a, 'q9_ai_usage');
  if (usage.includes('none')) {
    score += 2;
  } else {
    score += Math.min(usage.length * 4, 20);
  }
  return Math.min(Math.round(score), 100);
}

function calcCompetence(a: AssessmentAnswer[]): number {
  let score = 0;
  const tools = arrVal(a, 'q8_tools_used');
  if (!tools.includes('none')) {
    score += Math.min(tools.length * 8, 30);
  }
  const usage = arrVal(a, 'q9_ai_usage');
  if (!usage.includes('none')) {
    score += Math.min(usage.length * 6, 25);
  }
  const output: Record<string, number> = { depends: 20, starting_point: 18, revise: 15, major_rewrite: 12, minor_edits: 8, as_is: 3 };
  score += output[strVal(a, 'q10_ai_output')] ?? 10;
  score += numVal(a, 'q11_confidence') * 5;
  const errors: Record<string, number> = { caught_fast: 10, caught_slow: 6, unsure: 3, no: 2, not_enough: 0 };
  score += errors[strVal(a, 'q12_error_detection')] ?? 3;
  return Math.min(Math.round(score), 100);
}

function calcReadiness(a: AssessmentAnswer[]): number {
  let score = 0;
  const time: Record<string, number> = { '5+': 35, '3-5': 28, '1-2': 18, '<1': 8, none: 0 };
  score += time[strVal(a, 'q25_time_available')] ?? 15;
  const reason: Record<string, number> = { ahead: 35, learn: 35, worried: 28, company: 18, curious: 12 };
  score += reason[strVal(a, 'q26_reason')] ?? 15;
  const value: Record<string, number> = { hands_on: 30, plan: 28, proof: 25, clear_picture: 18, peace: 10 };
  score += value[strVal(a, 'q28_value')] ?? 15;
  return Math.min(Math.round(score), 100);
}
