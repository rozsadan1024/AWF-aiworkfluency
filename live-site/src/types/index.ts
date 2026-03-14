// ---- User & Auth ----
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  subscription_tier: 'free' | 'basic' | 'pro';
  subscription_expires_at: string | null;
  stripe_customer_id: string | null;
  onboarding_completed: boolean;
}

// ---- Assessment ----
export interface AssessmentAnswer {
  question_id: string;
  value: string | string[] | number;
}

export interface AssessmentScores {
  ai_exposure_score: number;
  adaptability_index: number;
  current_ai_competence: number;
  awareness_gap: number;
  action_readiness: number;
}

export interface Assessment {
  id: string;
  user_id: string;
  answers: AssessmentAnswer[];
  scores: AssessmentScores;
  ai_exposure_score: number;
  adaptability_index: number;
  current_ai_competence: number;
  awareness_gap: number;
  action_readiness: number;
  report_text: string | null;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  block: string;
  question: string;
  type: 'single' | 'multi' | 'slider' | 'text';
  options?: { value: string; label: string }[];
  slider_min?: number;
  slider_max?: number;
  slider_labels?: [string, string];
}

// ---- Role Profile ----
export interface RoleProfile {
  id: string;
  user_id: string;
  job_description: string;
  pain_point_task: string;
  typical_morning: string;
  tools_used: string[];
  industry: string | null;
  company_size: string | null;
  parsed_profile: ParsedProfile | null;
  created_at: string;
}

export interface ParsedProfile {
  role_type: string;
  sub_role_match: string;
  industry: string;
  company_size: string;
  key_tasks: string[];
  tools: string[];
  pain_points: string[];
  ai_familiarity: 'none' | 'basic' | 'moderate' | 'advanced';
}

// ---- Tasks ----
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type TaskStatus = 'pending' | 'in_progress' | 'submitted' | 'evaluated';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  scenario: string;
  input_materials: Record<string, unknown> | null;
  difficulty: Difficulty;
  estimated_minutes: number;
  skills_tested: string[];
  evaluation_rubric: Record<string, unknown>;
  expert_solution: ExpertSolution;
  micro_course_content: string | null;
  status: TaskStatus;
  created_at: string;
}

export interface PromptScorecard {
  defines_role: boolean;
  defines_audience: boolean;
  specifies_format: boolean;
  specifies_tone: boolean;
  provides_context: boolean;
  rationale: string;
}

export interface ExpertSolution {
  approach: string;
  recommended_tools: string[];
  example_prompts: string[];
  prompt_scorecard?: PromptScorecard;
  key_insights: string;
  time_benchmark: number;
  key_lesson?: string;
  practice_exercise?: string;
}

// ---- Submissions ----
export interface Submission {
  id: string;
  task_id: string;
  user_id: string;
  final_output: string;
  prompts_used: string | null;
  process_description: string | null;
  tools_used: string[];
  time_spent_minutes: number | null;
  submitted_at: string;
}

// ---- Evaluations ----
export interface DimensionScore {
  score: number;
  feedback: string;
}

export interface EvaluationResult {
  id: string;
  submission_id: string;
  user_id: string;
  task_id: string;
  overall_score: number;
  dimension_scores: {
    output_quality: DimensionScore;
    ai_leverage: DimensionScore;
    prompt_sophistication: DimensionScore;
    human_judgment: DimensionScore;
    iteration_skill: DimensionScore;
  };
  feedback_text: string;
  improvement_tips: string[];
  top_strength?: string;
  top_improvement?: string;
  evaluated_at: string;
}

// ---- Progress ----
export interface UserProgress {
  id: string;
  user_id: string;
  tasks_completed: number;
  average_score: number;
  streak_days: number;
  last_activity_at: string | null;
  skill_scores: Record<string, number>;
  level: 'novice' | 'learner' | 'practitioner' | 'proficient' | 'expert';
  updated_at: string;
}

// ---- Quick Pill ----
export type QPTheme = 'prompt_craft' | 'ai_literacy' | 'workflow_hacks' | 'tool_spotlight' | 'critical_thinking' | 'ai_news';

export interface QuickPill {
  id: string;
  theme: QPTheme;
  title: string;
  knowledge_text: string;
  task_prompt: string;
  task_type: 'rewrite' | 'classify' | 'generate' | 'analyze' | 'compare';
  difficulty: 'easy' | 'medium';
  estimated_minutes: number;
  sort_order: number;
  active: boolean;
  example_solution: string | null;
  takeaway: string | null;
  created_at: string;
  // Joined fields (optional)
  completed?: boolean;
  score?: number;
}

export interface QPSubmission {
  id: string;
  pill_id: string;
  user_id: string;
  answer_text: string;
  submitted_at: string;
}

export interface QPEvaluation {
  id: string;
  submission_id: string;
  user_id: string;
  pill_id: string;
  overall_score: number;
  understanding_score: number;
  application_score: number;
  readiness_score: number;
  understanding_feedback: string;
  application_feedback: string;
  readiness_feedback: string;
  feedback_summary: string;
  practical_tip: string;
  evaluated_at: string;
}

export type QPLevel = 'curious' | 'explorer' | 'practitioner' | 'specialist' | 'sage';

export interface QPUserProgress {
  id: string;
  user_id: string;
  pills_completed: number;
  average_score: number;
  theme_scores: Record<string, number>;
  streak_days: number;
  longest_streak: number;
  last_pill_at: string | null;
  badges: string[];
  level: QPLevel;
  updated_at: string;
}
