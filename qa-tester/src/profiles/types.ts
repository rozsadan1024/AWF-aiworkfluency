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

export interface TestProfile {
  name: string;
  email: string;
  description: string;
  roleProfile: {
    job_description: string;
    pain_point_task: string;
    typical_morning: string;
    tools_used: string[];
    industry: string;
    company_size: string;
  };
  assessment: AssessmentAnswer[];
}
