// Platform Replayer — replicates exactly what the frontend does:
// 1. Create user via Supabase admin API
// 2. Insert assessment with calculated scores
// 3. Insert role profile
// 4. Call Claude for task generation (same prompt, same model)
// 5. Insert submission
// 6. Call Claude for evaluation (same prompt, same model)
// 7. Apply server-side weighted average override

import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from '../config.js';
import { TestProfile, AssessmentScores } from '../profiles/types.js';
import { calculateScores } from './scoring.js';
import { getSupabase } from './supabase.js';
import { TASK_GENERATION_PROMPT, EVALUATION_PROMPT, ADMIN_KNOWLEDGE_BASE } from './prompts.js';

const anthropic = new Anthropic({ apiKey: CONFIG.anthropic.apiKey });

function extractJSON(text: string): string {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }
  return text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
}

function parseWithRepair(text: string): any {
  const cleaned = extractJSON(text);
  try {
    return JSON.parse(cleaned);
  } catch {
    const repaired = cleaned
      .replace(/,\s*([\]}])/g, '$1')
      .replace(/([^\\])\\n/g, '$1\\\\n')
      .replace(/[\x00-\x1F\x7F]/g, ' ');
    try {
      return JSON.parse(repaired);
    } catch {
      let attempt = repaired;
      const opens = (attempt.match(/{/g) || []).length;
      const closes = (attempt.match(/}/g) || []).length;
      for (let i = 0; i < opens - closes; i++) attempt += '}';
      const openB = (attempt.match(/\[/g) || []).length;
      const closeB = (attempt.match(/\]/g) || []).length;
      for (let i = 0; i < openB - closeB; i++) attempt += ']';
      return JSON.parse(attempt);
    }
  }
}

export interface ReplayedTask {
  id: string;
  title: string;
  scenario: string;
  difficulty: string;
  input_materials: any;
  evaluation_rubric: any;
  expert_solution: any;
  skills_tested: string[];
  estimated_minutes: number;
  tokens: number;
}

export interface ReplayedEvaluation {
  overall_score: number;
  dimension_scores: Record<string, { score: number; feedback: string }>;
  feedback_text: string;
  improvement_tips: string[];
  top_strength: string;
  top_improvement: string;
  tokens: number;
}

export async function createTestUser(profile: TestProfile): Promise<{ userId: string; scores: AssessmentScores }> {
  const sb = getSupabase();

  // Generate unique email per test run to avoid collisions
  const rnd = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const uniqueEmail = profile.email.replace('@', `-${rnd}@`);

  // Create auth user (service role bypasses RLS)
  const { data: authData, error: authError } = await sb.auth.admin.createUser({
    email: uniqueEmail,
    password: CONFIG.testUserPassword,
    email_confirm: true,
  });
  if (authError) throw new Error(`Auth create failed: ${authError.message}`);
  const userId = authData.user.id;

  // Profile is auto-created by DB trigger, but insert role profile
  const { error: roleError } = await sb.from('role_profiles').insert({
    user_id: userId,
    job_description: profile.roleProfile.job_description,
    pain_point_task: profile.roleProfile.pain_point_task,
    typical_morning: profile.roleProfile.typical_morning,
    tools_used: profile.roleProfile.tools_used,
    industry: profile.roleProfile.industry,
    company_size: profile.roleProfile.company_size,
    parsed_profile: {
      role_type: profile.assessment.find(a => a.question_id === 'q1_work_area')?.value || 'other',
      industry: profile.roleProfile.industry,
      company_size: profile.roleProfile.company_size,
      key_tasks: (profile.assessment.find(a => a.question_id === 'q2_daily_tasks')?.value as string[]) || [],
      tools: profile.roleProfile.tools_used,
      pain_points: [profile.roleProfile.pain_point_task],
      ai_familiarity: 'basic',
    },
  });
  if (roleError) throw new Error(`Role profile insert failed: ${roleError.message}`);

  // Calculate scores (same logic as frontend)
  const scores = calculateScores(profile.assessment);

  // Insert assessment
  const { error: assessError } = await sb.from('assessments').insert({
    user_id: userId,
    answers: profile.assessment,
    scores,
    ai_exposure_score: scores.ai_exposure_score,
    adaptability_index: scores.adaptability_index,
    current_ai_competence: scores.current_ai_competence,
    awareness_gap: scores.awareness_gap,
    action_readiness: scores.action_readiness,
  });
  if (assessError) throw new Error(`Assessment insert failed: ${assessError.message}`);

  // Create user_progress row
  await sb.from('user_progress').insert({
    user_id: userId,
    tasks_completed: 0,
    average_score: 0,
    streak_days: 0,
    skill_scores: {},
    level: 'novice',
  });

  return { userId, scores };
}

export async function generateTask(
  userId: string,
  profile: TestProfile,
  scores: AssessmentScores,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
): Promise<ReplayedTask> {
  const sb = getSupabase();

  // Build user context — same as generate-tasks route
  const roleProfile = profile.roleProfile;
  const userContext = `USER PROFILE:
- Job: ${roleProfile.job_description}
- Pain point: ${roleProfile.pain_point_task}
- Typical morning: ${roleProfile.typical_morning}
- Tools: ${roleProfile.tools_used.join(', ')}
- Parsed role: ${JSON.stringify({
    role_type: profile.assessment.find(a => a.question_id === 'q1_work_area')?.value,
    industry: roleProfile.industry,
    company_size: roleProfile.company_size,
  })}
- AI Competence: ${scores.current_ai_competence}/100
- AI Exposure: ${scores.ai_exposure_score}/100`;

  const response = await anthropic.messages.create({
    model: CONFIG.models.taskGen,
    max_tokens: 8192,
    system: `${TASK_GENERATION_PROMPT}\n\n${ADMIN_KNOWLEDGE_BASE}`,
    messages: [{
      role: 'user',
      content: `${userContext}\n\nGenerate a ${difficulty} task. Respond with valid JSON only.`,
    }],
  });

  const totalTokens = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}';
  const taskData = parseWithRepair(raw);

  // Insert into DB — same as generate-tasks route
  const { data: inserted, error } = await sb.from('tasks').insert({
    user_id: userId,
    title: taskData.title || `${difficulty} Task`,
    scenario: taskData.scenario || 'Complete this administrative task.',
    input_materials: taskData.input_materials || null,
    difficulty,
    estimated_minutes: taskData.estimated_minutes || (difficulty === 'beginner' ? 15 : difficulty === 'intermediate' ? 30 : 45),
    skills_tested: taskData.skills_tested || ['prompting', 'output_evaluation'],
    evaluation_rubric: {
      ...(taskData.evaluation_criteria || {}),
      deliverables: taskData.deliverables || null,
    },
    expert_solution: taskData.expert_solution || {},
    micro_course_content: taskData.micro_course_content || null,
    status: 'pending',
  }).select().single();

  if (error) throw new Error(`Task insert failed: ${error.message}`);

  return {
    id: inserted.id,
    title: inserted.title,
    scenario: inserted.scenario,
    difficulty: inserted.difficulty,
    input_materials: inserted.input_materials,
    evaluation_rubric: inserted.evaluation_rubric,
    expert_solution: inserted.expert_solution,
    skills_tested: inserted.skills_tested,
    estimated_minutes: inserted.estimated_minutes,
    tokens: totalTokens,
  };
}

export async function submitAndEvaluate(
  userId: string,
  task: ReplayedTask,
  responseText: string,
  promptsUsed: string | null,
): Promise<ReplayedEvaluation> {
  const sb = getSupabase();

  // Insert submission — same as submit page
  const { data: submission, error: subError } = await sb.from('submissions').insert({
    user_id: userId,
    task_id: task.id,
    final_output: responseText,
    prompts_used: promptsUsed,
    process_description: promptsUsed ? 'Used AI assistant to complete the task' : null,
    tools_used: ['ChatGPT'],
    time_spent_minutes: task.estimated_minutes,
  }).select().single();

  if (subError) throw new Error(`Submission insert failed: ${subError.message}`);

  // Update task status
  await sb.from('tasks').update({ status: 'submitted' }).eq('id', task.id);

  // Build evaluation prompt — same as evaluate route
  const hiddenTrap = task.evaluation_rubric?.hidden_trap;
  const trapSection = hiddenTrap ? `\n\nHIDDEN TRAP IN THIS TASK:\n${hiddenTrap}` : '';

  const evalResponse = await anthropic.messages.create({
    model: CONFIG.models.eval,
    max_tokens: 8000,
    system: EVALUATION_PROMPT,
    messages: [{
      role: 'user',
      content: `ORIGINAL TASK:
Title: ${task.title}
Difficulty: ${task.difficulty}
Scenario: ${task.scenario}
Evaluation criteria (rubric): ${JSON.stringify(task.evaluation_rubric)}
Explicit deliverable: ${task.evaluation_rubric?.deliverables || '(See scenario)'}
Expert solution reference (for calibration only — do NOT compare user output directly to this):
- Time benchmark: ${task.expert_solution?.time_benchmark} minutes
- Skills expected: ${task.skills_tested?.join(', ')}
- Key lesson: ${task.expert_solution?.key_lesson || ''}
- Prompt scorecard (what an expert prompt would contain): ${JSON.stringify(task.expert_solution?.prompt_scorecard || {})}
Expert time benchmark: ${task.estimated_minutes} minutes${trapSection}

USER SUBMISSION:
Final output:
${responseText}

Prompts used by user:
${promptsUsed || '(User did not share their prompts — score prompt_sophistication lower, max 35)'}

Process description:
${promptsUsed ? 'Used AI assistant to complete the task' : '(Not provided)'}

Tools used: ChatGPT
Time spent: ${task.estimated_minutes} minutes

Return a JSON object only.`,
    }],
  });

  const evalTokens = (evalResponse.usage?.input_tokens || 0) + (evalResponse.usage?.output_tokens || 0);
  const evalRaw = evalResponse.content[0].type === 'text' ? evalResponse.content[0].text : '{}';
  const evalResult = parseWithRepair(evalRaw);

  // Server-side dimension caps — same as evaluate route
  const ds = evalResult.dimension_scores || {};

  // No workspace conversation in QA tests → cap iteration_skill at 30
  ds.iteration_skill && (ds.iteration_skill.score = Math.min(ds.iteration_skill.score, 30));

  // Cap prompt_sophistication at 35 if no prompts were shared
  if (!promptsUsed && ds.prompt_sophistication) {
    ds.prompt_sophistication.score = Math.min(ds.prompt_sophistication.score, 35);
  }

  // Detect truncated/incomplete submissions and cap output_quality
  const trimmed = responseText.trimEnd();
  const truncationSignals = [
    /\S$/.test(trimmed) && !/[.!?)"'\u2019\u201D]$/.test(trimmed),
    trimmed.endsWith('...') && responseText.length < 500,
    responseText.length < 100 && responseText.trim().length > 0,
  ];
  if (truncationSignals.some(Boolean) && ds.output_quality) {
    ds.output_quality.score = Math.min(ds.output_quality.score, 40);
  }

  // Server-side weighted average override — same as evaluate route
  const oq = ds.output_quality?.score ?? 50;
  const al = ds.ai_leverage?.score ?? 50;
  const ps = ds.prompt_sophistication?.score ?? 50;
  const hj = ds.human_judgment?.score ?? 50;
  const is_ = ds.iteration_skill?.score ?? 50;
  const weightedAvg = Math.round(oq * 0.35 + al * 0.25 + ps * 0.15 + hj * 0.15 + is_ * 0.10);
  evalResult.overall_score = weightedAvg;

  // Insert evaluation — same as evaluate route
  const { error: evalError } = await sb.from('evaluations').insert({
    submission_id: submission.id,
    user_id: userId,
    task_id: task.id,
    overall_score: evalResult.overall_score || 50,
    dimension_scores: evalResult.dimension_scores || {},
    feedback_text: evalResult.feedback_text || 'Evaluation complete.',
    improvement_tips: evalResult.improvement_tips || [],
    top_strength: evalResult.top_strength || null,
    top_improvement: evalResult.top_improvement || null,
  });

  if (evalError) throw new Error(`Evaluation insert failed: ${evalError.message}`);

  // Update task status
  await sb.from('tasks').update({ status: 'evaluated' }).eq('id', task.id);

  return {
    overall_score: evalResult.overall_score,
    dimension_scores: evalResult.dimension_scores,
    feedback_text: evalResult.feedback_text,
    improvement_tips: evalResult.improvement_tips || [],
    top_strength: evalResult.top_strength || '',
    top_improvement: evalResult.top_improvement || '',
    tokens: evalTokens,
  };
}

export async function deleteTestUser(userId: string): Promise<void> {
  const sb = getSupabase();

  // Delete in order to handle foreign keys (or rely on CASCADE)
  await sb.from('evaluations').delete().eq('user_id', userId);
  await sb.from('submissions').delete().eq('user_id', userId);
  await sb.from('conversations').delete().eq('user_id', userId);
  await sb.from('tasks').delete().eq('user_id', userId);
  await sb.from('user_progress').delete().eq('user_id', userId);
  await sb.from('assessments').delete().eq('user_id', userId);
  await sb.from('role_profiles').delete().eq('user_id', userId);
  await sb.from('profiles').delete().eq('id', userId);

  // Finally delete auth user
  const { error } = await sb.auth.admin.deleteUser(userId);
  if (error) console.error(`Warning: auth user delete failed: ${error.message}`);
}
