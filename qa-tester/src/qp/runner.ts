import { CONFIG } from '../config.js';
import { getSupabase } from '../platform/supabase.js';
import { QPPill, QPTestResult } from './types.js';
import { generateQPResponse, QPQuality, QP_QUALITY_RANGES } from './response-generator.js';
import { evaluateQPResponse } from './evaluator.js';
import { metaEvaluateQP } from './meta-evaluator.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export interface QPRunConfig {
  pillCount: number;  // how many pills to test (0 = all)
  qualities: QPQuality[];
  concurrency: number;
}

export interface QPRunReport {
  startedAt: string;
  completedAt: string;
  durationMs: number;
  totalTests: number;
  results: QPTestResult[];
  summary: {
    pass: number;
    warning: number;
    fail: number;
    avgScore: number;
    avgFeedbackQuality: number;
    avgExpertComparison: number;
    avgTakeawayRelevance: number;
    totalTokens: number;
    estimatedCost: number;
    byQuality: Record<string, { pass: number; warning: number; fail: number; avgScore: number }>;
    issues: string[];
  };
}

async function runSingleQPTest(pill: QPPill, quality: QPQuality): Promise<QPTestResult> {
  const startTime = Date.now();
  const expectedRange = QP_QUALITY_RANGES[quality];

  // Generate synthetic response
  const synth = await generateQPResponse(pill, quality);
  console.log(`    [+] Response: ${quality} (${synth.content.length} chars)`);

  // Evaluate
  const { result: evalResult, tokens: evalTokens } = await evaluateQPResponse(pill, synth.content);
  console.log(`    [+] Score: ${evalResult.overall_score}`);

  // Meta-evaluate
  const { result: metaResult, tokens: metaTokens } = await metaEvaluateQP(pill, synth.content, quality, evalResult);
  console.log(`    [+] Verdict: ${metaResult.overall_verdict?.toUpperCase()}`);

  const totalTokens = synth.tokens + evalTokens + metaTokens;

  return {
    pillTitle: pill.title,
    theme: pill.theme,
    quality,
    responseLength: synth.content.length,
    platformScore: evalResult.overall_score,
    expectedRange,
    scores: {
      understanding: evalResult.understanding_score,
      application: evalResult.application_score,
      readiness: evalResult.readiness_score,
    },
    feedbackSummary: evalResult.feedback_summary,
    practicalTip: evalResult.practical_tip,
    metaVerdict: metaResult.overall_verdict || 'fail',
    metaExplanation: metaResult.scoring_explanation || '',
    metaFeedbackQuality: metaResult.feedback_quality || 0,
    metaExpertComparison: metaResult.expert_comparison || 0,
    metaTakeawayRelevance: metaResult.takeaway_relevance || 0,
    issues: metaResult.issues || [],
    durationMs: Date.now() - startTime,
    tokens: totalTokens,
  };
}

export async function runQPTests(config: QPRunConfig): Promise<QPRunReport> {
  const startedAt = new Date().toISOString();
  const startMs = Date.now();

  // Fetch pills from DB
  const sb = getSupabase();
  const { data: pills, error } = await sb
    .from('qp_pills')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  if (error || !pills?.length) {
    throw new Error(`Failed to fetch pills: ${error?.message || 'no pills found'}`);
  }

  const selectedPills = config.pillCount > 0 ? pills.slice(0, config.pillCount) : pills;

  // Build test matrix
  const testCases: { pill: QPPill; quality: QPQuality }[] = [];
  for (const pill of selectedPills) {
    for (const quality of config.qualities) {
      testCases.push({ pill, quality });
    }
  }

  console.log(`\n=== Quick Pill QA Run ===`);
  console.log(`Pills: ${selectedPills.length}/${pills.length}`);
  console.log(`Qualities: ${config.qualities.join(', ')}`);
  console.log(`Total tests: ${testCases.length}`);
  console.log(`========================\n`);

  const results: QPTestResult[] = [];

  // Run with concurrency
  for (let i = 0; i < testCases.length; i += config.concurrency) {
    const batch = testCases.slice(i, i + config.concurrency);
    const batchResults = await Promise.all(batch.map(async (tc, j) => {
      const idx = i + j + 1;
      console.log(`  [${idx}/${testCases.length}] "${tc.pill.title}" × ${tc.quality}`);
      try {
        const result = await runSingleQPTest(tc.pill, tc.quality);
        const icon = result.metaVerdict === 'pass' ? 'v' : result.metaVerdict === 'warning' ? '!' : 'X';
        console.log(`    [${icon}] ${result.platformScore} (expected ${result.expectedRange[0]}-${result.expectedRange[1]}) ${result.durationMs / 1000 | 0}s`);
        return result;
      } catch (e: any) {
        console.error(`    [X] FAILED: ${e.message}`);
        return {
          pillTitle: tc.pill.title,
          theme: tc.pill.theme,
          quality: tc.quality,
          responseLength: 0,
          platformScore: -1,
          expectedRange: QP_QUALITY_RANGES[tc.quality],
          scores: { understanding: 0, application: 0, readiness: 0 },
          feedbackSummary: e.message,
          practicalTip: '',
          metaVerdict: 'fail' as const,
          metaExplanation: e.message,
          metaFeedbackQuality: 0,
          metaExpertComparison: 0,
          metaTakeawayRelevance: 0,
          issues: [e.message],
          durationMs: 0,
          tokens: 0,
        };
      }
    }));
    results.push(...batchResults);
  }

  const completedAt = new Date().toISOString();
  const valid = results.filter(r => r.platformScore >= 0);
  const avgFn = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const totalTokens = results.reduce((s, r) => s + r.tokens, 0);

  const byQuality: Record<string, { pass: number; warning: number; fail: number; avgScore: number }> = {};
  for (const r of results) {
    if (!byQuality[r.quality]) byQuality[r.quality] = { pass: 0, warning: 0, fail: 0, avgScore: 0 };
    byQuality[r.quality][r.metaVerdict]++;
  }
  for (const q of Object.keys(byQuality)) {
    const qr = valid.filter(r => r.quality === q);
    byQuality[q].avgScore = Math.round(avgFn(qr.map(r => r.platformScore)));
  }

  const report: QPRunReport = {
    startedAt,
    completedAt,
    durationMs: Date.now() - startMs,
    totalTests: testCases.length,
    results,
    summary: {
      pass: results.filter(r => r.metaVerdict === 'pass').length,
      warning: results.filter(r => r.metaVerdict === 'warning').length,
      fail: results.filter(r => r.metaVerdict === 'fail').length,
      avgScore: Math.round(avgFn(valid.map(r => r.platformScore))),
      avgFeedbackQuality: Math.round(avgFn(valid.map(r => r.metaFeedbackQuality)) * 10) / 10,
      avgExpertComparison: Math.round(avgFn(valid.map(r => r.metaExpertComparison)) * 10) / 10,
      avgTakeawayRelevance: Math.round(avgFn(valid.map(r => r.metaTakeawayRelevance)) * 10) / 10,
      totalTokens,
      estimatedCost: Math.round((totalTokens / 1000) * 0.003 * 100) / 100,
      byQuality,
      issues: [...new Set(results.flatMap(r => r.issues))],
    },
  };

  // Save report
  const reportsDir = join(process.cwd(), 'reports');
  if (!existsSync(reportsDir)) mkdirSync(reportsDir, { recursive: true });
  const timestamp = startedAt.replace(/[:.]/g, '-').slice(0, 19);
  const jsonPath = join(reportsDir, `qp-${timestamp}.json`);
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\nReport saved: ${jsonPath}`);

  // Print summary
  const s = report.summary;
  console.log('\n' + '='.repeat(50));
  console.log('  QUICK PILL QA REPORT');
  console.log('='.repeat(50));
  console.log(`  Tests:    ${report.totalTests}`);
  console.log(`  Duration: ${(report.durationMs / 1000).toFixed(0)}s`);
  console.log(`  Cost:     ~$${s.estimatedCost}`);
  console.log(`  PASS: ${s.pass}  WARNING: ${s.warning}  FAIL: ${s.fail}`);
  console.log(`  Avg Score:           ${s.avgScore}`);
  console.log(`  Feedback Quality:    ${s.avgFeedbackQuality}/5`);
  console.log(`  Expert Comparison:   ${s.avgExpertComparison}/5`);
  console.log(`  Takeaway Relevance:  ${s.avgTakeawayRelevance}/5`);
  console.log('\n  -- By Quality --');
  for (const [q, v] of Object.entries(s.byQuality)) {
    const t = v.pass + v.warning + v.fail;
    console.log(`  ${q.padEnd(12)} pass:${v.pass}/${t}  avg:${v.avgScore}`);
  }
  if (s.issues.length > 0) {
    console.log('\n  -- Issues --');
    for (const issue of s.issues.slice(0, 8)) {
      console.log(`  ! ${issue}`);
    }
  }
  console.log('='.repeat(50));

  return report;
}
