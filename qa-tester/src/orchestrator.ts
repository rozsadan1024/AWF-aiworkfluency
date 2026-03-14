// Test Orchestrator — runs the full test matrix

import { CONFIG, ResponseQuality, QUALITY_EXPECTED_RANGES, TestResult } from './config.js';
import { TestProfile } from './profiles/types.js';
import { PROFILES } from './profiles/presets.js';
import { createTestUser, generateTask, submitAndEvaluate, deleteTestUser } from './platform/replayer.js';
import { generateSyntheticResponse } from './generators/response-generator.js';
import { metaEvaluate } from './meta-eval/meta-evaluator.js';

export interface RunConfig {
  profiles: string[];
  qualities: ResponseQuality[];
  concurrency: number;
  cleanup: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface RunReport {
  startedAt: string;
  completedAt: string;
  durationMs: number;
  totalTests: number;
  results: TestResult[];
  summary: RunSummary;
}

export interface RunSummary {
  pass: number;
  warning: number;
  fail: number;
  avgScoringAccuracy: number;
  avgFeedbackQuality: number;
  avgExpertQuality: number;
  avgTaskRelevance: number;
  totalTokens: number;
  estimatedCost: number;
  byQuality: Record<string, { pass: number; warning: number; fail: number; avgScore: number }>;
  byProfile: Record<string, { pass: number; warning: number; fail: number; avgScore: number }>;
  issues: string[];
}

async function runSingleTest(
  profile: TestProfile,
  quality: ResponseQuality,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  cleanup: boolean,
): Promise<TestResult> {
  const startTime = Date.now();
  let userId: string | null = null;

  try {
    // Step 1: Create test user
    const { userId: uid, scores } = await createTestUser(profile);
    userId = uid;
    console.log(`  [+] User created: ${profile.name} (${uid.slice(0, 8)}...)`);

    // Step 2: Generate task
    const task = await generateTask(userId, profile, scores, difficulty);
    console.log(`  [+] Task generated: "${task.title}" (${task.difficulty})`);

    // Step 3: Generate synthetic response
    const synthetic = await generateSyntheticResponse(task, profile, quality);
    console.log(`  [+] Response generated: ${quality} quality (${synthetic.content.length} chars)`);

    // Step 4: Submit and evaluate
    const evaluation = await submitAndEvaluate(userId, task, synthetic.content, synthetic.promptsUsed);
    console.log(`  [+] Platform evaluated: score=${evaluation.overall_score}`);

    // Step 5: Meta-evaluate
    const meta = await metaEvaluate(profile, task, synthetic.content, quality, evaluation);
    console.log(`  [+] Meta verdict: ${meta.result.overall_verdict.toUpperCase()}`);

    const result: TestResult = {
      profileName: profile.name,
      quality,
      taskTitle: task.title,
      taskDifficulty: task.difficulty,
      submissionLength: synthetic.content.length,
      platformScore: evaluation.overall_score,
      dimensionScores: evaluation.dimension_scores,
      feedbackText: evaluation.feedback_text,
      expectedRange: QUALITY_EXPECTED_RANGES[quality],
      metaEval: meta.result,
      tokenUsage: {
        taskGen: task.tokens,
        responseGen: synthetic.tokens,
        eval: evaluation.tokens,
        metaEval: meta.tokens,
      },
      durationMs: Date.now() - startTime,
    };

    return result;
  } finally {
    // Cleanup test user
    if (userId && cleanup) {
      try {
        await deleteTestUser(userId);
        console.log(`  [x] Cleaned up user ${userId.slice(0, 8)}...`);
      } catch (e: any) {
        console.error(`  [!] Cleanup failed: ${e.message}`);
      }
    }
  }
}

export async function runTests(config: RunConfig): Promise<RunReport> {
  const startedAt = new Date().toISOString();
  const startMs = Date.now();

  const profiles = config.profiles.map(key => {
    const p = PROFILES[key];
    if (!p) throw new Error(`Unknown profile: ${key}`);
    return p;
  });

  // Build test matrix
  const testCases: { profile: TestProfile; quality: ResponseQuality }[] = [];
  for (const profile of profiles) {
    for (const quality of config.qualities) {
      testCases.push({ profile, quality });
    }
  }

  console.log(`\n=== AWF QA Run ===`);
  console.log(`Profiles: ${config.profiles.join(', ')}`);
  console.log(`Qualities: ${config.qualities.join(', ')}`);
  console.log(`Difficulty: ${config.difficulty}`);
  console.log(`Total tests: ${testCases.length}`);
  console.log(`Concurrency: ${config.concurrency}`);
  console.log(`Cleanup: ${config.cleanup}`);
  console.log(`==================\n`);

  // Run with concurrency control
  const results: TestResult[] = [];
  const semaphore = new Array(config.concurrency).fill(null);

  async function runWithSemaphore(tc: { profile: TestProfile; quality: ResponseQuality }, index: number) {
    const label = `[${index + 1}/${testCases.length}] ${tc.profile.name} × ${tc.quality}`;
    console.log(`\n${label}`);
    try {
      const result = await runSingleTest(tc.profile, tc.quality, config.difficulty, config.cleanup);
      results.push(result);
      const icon = result.metaEval.overall_verdict === 'pass' ? 'v' :
                   result.metaEval.overall_verdict === 'warning' ? '!' : 'X';
      console.log(`  [${icon}] Done in ${(result.durationMs / 1000).toFixed(1)}s — score: ${result.platformScore} (expected: ${result.expectedRange[0]}-${result.expectedRange[1]})`);
    } catch (e: any) {
      console.error(`  [X] FAILED: ${e.message}`);
      // Still add a failed result
      results.push({
        profileName: tc.profile.name,
        quality: tc.quality,
        taskTitle: 'ERROR',
        taskDifficulty: config.difficulty,
        submissionLength: 0,
        platformScore: -1,
        dimensionScores: {},
        feedbackText: e.message,
        expectedRange: QUALITY_EXPECTED_RANGES[tc.quality],
        metaEval: {
          scoring_accuracy: { verdict: 'wildly_off', expected_range: QUALITY_EXPECTED_RANGES[tc.quality], actual_score: -1, delta: 0, explanation: e.message },
          feedback_quality: { score: 0, is_actionable: false, is_specific: false, explanation: 'Error' },
          expert_quality: { score: 0, is_better_than_submission: false, explanation: 'Error' },
          task_relevance: { score: 0, explanation: 'Error' },
          trap_handling: { trap_present: false, trap_description: '', correctly_evaluated: false, explanation: 'Error' },
          overall_verdict: 'fail',
          issues: [e.message],
          recommendations: [],
        },
        tokenUsage: { taskGen: 0, responseGen: 0, eval: 0, metaEval: 0 },
        durationMs: 0,
      });
    }
  }

  // Simple concurrency: process in batches
  for (let i = 0; i < testCases.length; i += config.concurrency) {
    const batch = testCases.slice(i, i + config.concurrency);
    await Promise.all(batch.map((tc, j) => runWithSemaphore(tc, i + j)));
  }

  const completedAt = new Date().toISOString();
  const summary = buildSummary(results);

  return {
    startedAt,
    completedAt,
    durationMs: Date.now() - startMs,
    totalTests: testCases.length,
    results,
    summary,
  };
}

function buildSummary(results: TestResult[]): RunSummary {
  const valid = results.filter(r => r.platformScore >= 0);

  const pass = valid.filter(r => r.metaEval.overall_verdict === 'pass').length;
  const warning = valid.filter(r => r.metaEval.overall_verdict === 'warning').length;
  const fail = results.filter(r => r.metaEval.overall_verdict === 'fail').length;

  const avgFn = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const totalTokens = results.reduce((sum, r) =>
    sum + r.tokenUsage.taskGen + r.tokenUsage.responseGen + r.tokenUsage.eval + r.tokenUsage.metaEval, 0);

  // Rough cost estimate: ~$0.003 per 1K input tokens, ~$0.015 per 1K output tokens
  // Simplified: ~$0.005 per 1K total tokens (blended)
  const estimatedCost = (totalTokens / 1000) * 0.005;

  const byQuality: Record<string, { pass: number; warning: number; fail: number; avgScore: number }> = {};
  const byProfile: Record<string, { pass: number; warning: number; fail: number; avgScore: number }> = {};

  for (const r of results) {
    // By quality
    if (!byQuality[r.quality]) byQuality[r.quality] = { pass: 0, warning: 0, fail: 0, avgScore: 0 };
    byQuality[r.quality][r.metaEval.overall_verdict]++;

    // By profile
    if (!byProfile[r.profileName]) byProfile[r.profileName] = { pass: 0, warning: 0, fail: 0, avgScore: 0 };
    byProfile[r.profileName][r.metaEval.overall_verdict]++;
  }

  // Calculate average scores per group
  for (const q of Object.keys(byQuality)) {
    const qResults = valid.filter(r => r.quality === q);
    byQuality[q].avgScore = Math.round(avgFn(qResults.map(r => r.platformScore)));
  }
  for (const p of Object.keys(byProfile)) {
    const pResults = valid.filter(r => r.profileName === p);
    byProfile[p].avgScore = Math.round(avgFn(pResults.map(r => r.platformScore)));
  }

  // Collect all issues
  const issues = results.flatMap(r => r.metaEval.issues || []);
  const uniqueIssues = [...new Set(issues)];

  return {
    pass,
    warning,
    fail,
    avgScoringAccuracy: Math.round(
      (valid.filter(r => r.metaEval.scoring_accuracy.verdict === 'accurate').length / Math.max(valid.length, 1)) * 100
    ),
    avgFeedbackQuality: Math.round(avgFn(valid.map(r => r.metaEval.feedback_quality.score)) * 10) / 10,
    avgExpertQuality: Math.round(avgFn(valid.map(r => r.metaEval.expert_quality.score)) * 10) / 10,
    avgTaskRelevance: Math.round(avgFn(valid.map(r => r.metaEval.task_relevance.score)) * 10) / 10,
    totalTokens,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
    byQuality,
    byProfile,
    issues: uniqueIssues,
  };
}
