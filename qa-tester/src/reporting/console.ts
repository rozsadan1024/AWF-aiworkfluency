import { RunReport } from '../orchestrator.js';

export function printSummary(report: RunReport): void {
  const s = report.summary;
  const total = report.totalTests;

  console.log('\n' + '='.repeat(60));
  console.log('  AWF QA REPORT');
  console.log('='.repeat(60));
  console.log(`  Time:     ${report.startedAt.slice(0, 16)}`);
  console.log(`  Duration: ${(report.durationMs / 1000).toFixed(0)}s`);
  console.log(`  Tests:    ${total}`);
  console.log(`  Cost:     ~$${s.estimatedCost.toFixed(2)}`);
  console.log(`  Tokens:   ${(s.totalTokens / 1000).toFixed(0)}K`);
  console.log('');
  console.log(`  PASS:    ${s.pass}/${total} (${Math.round(s.pass / total * 100)}%)`);
  console.log(`  WARNING: ${s.warning}/${total} (${Math.round(s.warning / total * 100)}%)`);
  console.log(`  FAIL:    ${s.fail}/${total} (${Math.round(s.fail / total * 100)}%)`);
  console.log('');
  console.log(`  Scoring Accuracy:  ${s.avgScoringAccuracy}%`);
  console.log(`  Feedback Quality:  ${s.avgFeedbackQuality}/5`);
  console.log(`  Expert Quality:    ${s.avgExpertQuality}/5`);
  console.log(`  Task Relevance:    ${s.avgTaskRelevance}/5`);

  console.log('\n  -- By Quality --');
  for (const [q, v] of Object.entries(s.byQuality)) {
    const t = v.pass + v.warning + v.fail;
    const pct = Math.round((v.pass / t) * 100);
    const bar = '#'.repeat(Math.round(pct / 5));
    const icon = pct >= 80 ? 'v' : pct >= 50 ? '!' : 'X';
    console.log(`  ${q.padEnd(12)} ${bar.padEnd(20)} ${pct}% avg:${v.avgScore} ${icon}`);
  }

  console.log('\n  -- By Profile --');
  for (const [p, v] of Object.entries(s.byProfile)) {
    const t = v.pass + v.warning + v.fail;
    const pct = Math.round((v.pass / t) * 100);
    const bar = '#'.repeat(Math.round(pct / 5));
    const icon = pct >= 80 ? 'v' : pct >= 50 ? '!' : 'X';
    console.log(`  ${p.padEnd(20)} ${bar.padEnd(20)} ${pct}% avg:${v.avgScore} ${icon}`);
  }

  if (s.issues.length > 0) {
    console.log('\n  -- Top Issues --');
    for (const issue of s.issues.slice(0, 10)) {
      console.log(`  ! ${issue}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}
