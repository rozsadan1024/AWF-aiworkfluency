import 'dotenv/config';

export const CONFIG = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  },
  models: {
    taskGen: process.env.TASK_GEN_MODEL || 'claude-haiku-4-5-20251001',
    eval: process.env.EVAL_MODEL || 'claude-sonnet-4-5-20250929',
    metaEval: process.env.META_EVAL_MODEL || 'claude-sonnet-4-5-20250929',
    responseGen: process.env.RESPONSE_GEN_MODEL || 'claude-sonnet-4-5-20250929',
  },
  testUserPassword: 'AwfQaTest2026!',
  concurrency: parseInt(process.env.QA_CONCURRENCY || '2', 10),
  cleanup: process.env.QA_CLEANUP !== 'false',
} as const;

export type ResponseQuality = 'excellent' | 'good' | 'mediocre' | 'bad' | 'gibberish' | 'empty' | 'off_topic' | 'copy_paste';

// Expected ranges account for server-side caps:
// - iteration_skill capped at 30 (no workspace conversation)
// - prompt_sophistication capped at 35 (when no prompts shared)
// These caps pull overall scores ~5-10 points lower than pure prompt scoring
export const QUALITY_EXPECTED_RANGES: Record<ResponseQuality, [number, number]> = {
  excellent: [55, 85],
  good: [40, 75],
  mediocre: [20, 50],
  bad: [8, 35],
  gibberish: [0, 10],
  empty: [0, 5],
  off_topic: [0, 20],
  copy_paste: [5, 25],
};

export const DEFAULT_QUALITIES: ResponseQuality[] = ['excellent', 'good', 'bad', 'gibberish'];
export const ALL_QUALITIES: ResponseQuality[] = ['excellent', 'good', 'mediocre', 'bad', 'gibberish', 'empty', 'off_topic', 'copy_paste'];

export interface TestResult {
  profileName: string;
  quality: ResponseQuality;
  taskTitle: string;
  taskDifficulty: string;
  submissionLength: number;
  platformScore: number;
  dimensionScores: Record<string, { score: number; feedback: string }>;
  feedbackText: string;
  expectedRange: [number, number];
  metaEval: MetaEvalResult;
  tokenUsage: { taskGen: number; responseGen: number; eval: number; metaEval: number };
  durationMs: number;
}

export interface MetaEvalResult {
  scoring_accuracy: {
    verdict: 'accurate' | 'too_lenient' | 'too_harsh' | 'wildly_off';
    expected_range: [number, number];
    actual_score: number;
    delta: number;
    explanation: string;
  };
  feedback_quality: {
    score: number;
    is_actionable: boolean;
    is_specific: boolean;
    explanation: string;
  };
  expert_quality: {
    score: number;
    is_better_than_submission: boolean;
    explanation: string;
  };
  task_relevance: {
    score: number;
    explanation: string;
  };
  trap_handling: {
    trap_present: boolean;
    trap_description: string;
    correctly_evaluated: boolean;
    explanation: string;
  };
  overall_verdict: 'pass' | 'warning' | 'fail';
  issues: string[];
  recommendations: string[];
}
