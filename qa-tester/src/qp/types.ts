export interface QPPill {
  id: string;
  theme: string;
  title: string;
  knowledge_text: string;
  task_prompt: string;
  task_type: string;
  difficulty: string;
  example_solution: string | null;
  takeaway: string | null;
}

export interface QPEvalResult {
  overall_score: number;
  understanding_score: number;
  application_score: number;
  readiness_score: number;
  understanding_feedback: string;
  application_feedback: string;
  readiness_feedback: string;
  feedback_summary: string;
  practical_tip: string;
}

export interface QPTestResult {
  pillTitle: string;
  theme: string;
  quality: string;
  responseLength: number;
  platformScore: number;
  expectedRange: [number, number];
  scores: { understanding: number; application: number; readiness: number };
  feedbackSummary: string;
  practicalTip: string;
  metaVerdict: 'pass' | 'warning' | 'fail';
  metaExplanation: string;
  metaFeedbackQuality: number;
  metaExpertComparison: number;
  metaTakeawayRelevance: number;
  issues: string[];
  durationMs: number;
  tokens: number;
}
