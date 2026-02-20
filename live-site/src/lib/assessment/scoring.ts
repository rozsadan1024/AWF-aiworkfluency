import { AssessmentAnswer, AssessmentScores } from '@/types';

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
  return {
    ai_exposure_score: calcExposure(answers),
    adaptability_index: calcAdaptability(answers),
    current_ai_competence: calcCompetence(answers),
    awareness_gap: calcAwarenessGap(answers),
    action_readiness: calcReadiness(answers),
  };
}

function calcExposure(a: AssessmentAnswer[]): number {
  let score = 0;
  // Computer time (0-100 slider → 0-30 points)
  score += (numVal(a, 'q3_computer_pct') / 100) * 30;
  // Repetitiveness (1-5 → 0-20 points)
  score += (numVal(a, 'q4_repetitive') / 5) * 20;
  // Low physical presence → higher exposure
  const presence: Record<string, number> = { never: 20, rarely: 16, sometimes: 12, often: 6, always: 0 };
  score += presence[strVal(a, 'q5_physical_presence')] ?? 10;
  // Low interaction → higher exposure
  const interact: Record<string, number> = { '0-2': 15, '3-5': 10, '6-10': 5, '10+': 0 };
  score += interact[strVal(a, 'q6_interactions')] ?? 8;
  // Digital-heavy tasks boost exposure
  const highExposureTasks = ['writing', 'data', 'processing', 'research', 'scheduling'];
  const tasks = arrVal(a, 'q2_daily_tasks');
  const digitalCount = tasks.filter(t => highExposureTasks.includes(t)).length;
  score += Math.min(digitalCount * 5, 15);

  return Math.min(Math.round(score), 100);
}

function calcAdaptability(a: AssessmentAnswer[]): number {
  let score = 0;
  // New software reaction
  const software: Record<string, number> = { excited: 20, leader: 20, cautious: 12, stressed: 6, skeptical: 4 };
  score += software[strVal(a, 'q13_new_software')] ?? 10;
  // Change experience
  const change: Record<string, number> = { energizing: 20, fine: 15, uncomfortable: 8, difficult: 3, none: 5 };
  score += change[strVal(a, 'q14_change_experience')] ?? 10;
  // Task automated reaction
  const automated: Record<string, number> = { relieved: 15, curious: 18, threatened: 5, skeptical: 8, anxious: 3 };
  score += automated[strVal(a, 'q15_task_automated')] ?? 8;
  // Learning style
  const learning: Record<string, number> = { jump_in: 18, tutorials: 14, docs: 12, ask: 10, avoid: 2 };
  score += learning[strVal(a, 'q16_learning_style')] ?? 10;
  // Mistakes response
  const mistakes: Record<string, number> = { analyze: 15, ask_help: 10, fix_quick: 8, feel_bad: 6, external: 2 };
  score += mistakes[strVal(a, 'q17_mistakes')] ?? 8;
  // Innovation frequency
  const innovation: Record<string, number> = { weekly: 12, monthly: 10, few_times: 6, rarely: 3, never: 0 };
  score += innovation[strVal(a, 'q18_innovation')] ?? 5;

  return Math.min(Math.round(score), 100);
}

function calcCompetence(a: AssessmentAnswer[]): number {
  let score = 0;
  // Tools used (more = higher)
  const tools = arrVal(a, 'q8_tools_used');
  if (tools.includes('none')) {
    score += 0;
  } else {
    score += Math.min(tools.length * 8, 30);
  }
  // Usage breadth
  const usage = arrVal(a, 'q9_ai_usage');
  if (usage.includes('none')) {
    score += 0;
  } else {
    score += Math.min(usage.length * 6, 25);
  }
  // Output handling (iterative > as-is)
  const output: Record<string, number> = { depends: 20, starting_point: 18, revise: 15, major_rewrite: 12, minor_edits: 8, as_is: 3 };
  score += output[strVal(a, 'q10_ai_output')] ?? 10;
  // Self-reported confidence
  score += numVal(a, 'q11_confidence') * 5;
  // Error detection ability
  const errors: Record<string, number> = { caught_fast: 10, caught_slow: 6, unsure: 3, no: 2, not_enough: 0 };
  score += errors[strVal(a, 'q12_error_detection')] ?? 3;

  return Math.min(Math.round(score), 100);
}

function calcAwarenessGap(a: AssessmentAnswer[]): number {
  // Perceived risk vs calculated exposure
  const perceivedRisk = numVal(a, 'q19_ai_impact_belief'); // 1-5
  const selfConfidence = numVal(a, 'q20_tech_skills_self'); // 1-5
  const layoffConfidence = numVal(a, 'q21_layoff_confidence'); // 1-5

  // Perceived safety = average of these (inverted where needed)
  const perceivedSafety = ((6 - perceivedRisk) + selfConfidence + layoffConfidence) / 3; // 1-5
  const perceivedSafetyNorm = (perceivedSafety / 5) * 100; // 0-100

  // Actual exposure already calculated
  const exposure = calcExposure(a);

  // Gap = how much safer they feel than they are
  // Positive = they underestimate risk (dangerous)
  // Negative = they overestimate risk (anxious but maybe OK)
  const gap = perceivedSafetyNorm - (100 - exposure);

  // Normalize to 0-100 where 50 = accurate, >50 = underestimates risk, <50 = overestimates
  return Math.max(0, Math.min(100, Math.round(50 + gap / 2)));
}

function calcReadiness(a: AssessmentAnswer[]): number {
  let score = 0;
  // Time available
  const time: Record<string, number> = { '5+': 25, '3-5': 20, '1-2': 12, '<1': 5, none: 0 };
  score += time[strVal(a, 'q25_time_available')] ?? 10;
  // Autonomy
  const perm: Record<string, number> = { autonomous: 20, probably_fine: 15, difficult: 8, restricted: 3, unsure: 10 };
  score += perm[strVal(a, 'q24_permission')] ?? 10;
  // Motivation
  const reason: Record<string, number> = { worried: 15, ahead: 18, learn: 18, company: 10, curious: 8 };
  score += reason[strVal(a, 'q26_reason')] ?? 10;
  // Action orientation
  const action: Record<string, number> = { start_now: 22, research: 15, career_change: 12, anxious: 5, wait: 2 };
  score += action[strVal(a, 'q27_action')] ?? 8;
  // Strategy
  const strat: Record<string, number> = { active: 15, watching: 10, unsure: 6, not_thought: 3, unaffected: 0 };
  score += strat[strVal(a, 'q22_career_strategy')] ?? 5;

  return Math.min(Math.round(score), 100);
}
