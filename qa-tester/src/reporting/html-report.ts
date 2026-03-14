import { RunReport } from '../orchestrator.js';
import { writeFileSync } from 'fs';

export function generateHTMLReport(report: RunReport, outputPath: string): void {
  const s = report.summary;
  const totalTests = report.totalTests;
  const passPct = Math.round((s.pass / totalTests) * 100);
  const warnPct = Math.round((s.warning / totalTests) * 100);
  const failPct = Math.round((s.fail / totalTests) * 100);

  const qualityRows = Object.entries(s.byQuality)
    .map(([q, v]) => {
      const total = v.pass + v.warning + v.fail;
      const pct = Math.round((v.pass / Math.max(total, 1)) * 100);
      const icon = pct >= 80 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444';
      return `<tr>
        <td>${q}</td>
        <td>${v.avgScore}</td>
        <td>${v.pass}/${total}</td>
        <td><div class="bar" style="width:${pct}%;background:${icon}"></div> ${pct}%</td>
      </tr>`;
    }).join('');

  const profileRows = Object.entries(s.byProfile)
    .map(([p, v]) => {
      const total = v.pass + v.warning + v.fail;
      const pct = Math.round((v.pass / Math.max(total, 1)) * 100);
      const icon = pct >= 80 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444';
      return `<tr>
        <td>${p}</td>
        <td>${v.avgScore}</td>
        <td>${v.pass}/${total}</td>
        <td><div class="bar" style="width:${pct}%;background:${icon}"></div> ${pct}%</td>
      </tr>`;
    }).join('');

  const detailRows = report.results.map((r, i) => {
    const verdict = r.metaEval.overall_verdict;
    const verdictColor = verdict === 'pass' ? '#22c55e' : verdict === 'warning' ? '#eab308' : '#ef4444';
    const inRange = r.platformScore >= r.expectedRange[0] && r.platformScore <= r.expectedRange[1];
    const dims = Object.entries(r.dimensionScores)
      .map(([k, v]) => `<span class="dim">${k}: ${v.score}</span>`)
      .join(' ');

    return `<tr class="detail-row" onclick="this.nextElementSibling.classList.toggle('hidden')">
      <td>${i + 1}</td>
      <td>${r.profileName}</td>
      <td>${r.quality}</td>
      <td>${r.taskTitle}</td>
      <td style="color:${inRange ? '#22c55e' : '#ef4444'}">${r.platformScore} <small>(${r.expectedRange[0]}-${r.expectedRange[1]})</small></td>
      <td style="color:${verdictColor};font-weight:bold">${verdict.toUpperCase()}</td>
      <td>${(r.durationMs / 1000).toFixed(1)}s</td>
    </tr>
    <tr class="hidden expand-row">
      <td colspan="7">
        <div class="detail-box">
          <h4>Dimension Scores</h4>
          <div class="dims">${dims}</div>
          <h4>Platform Feedback</h4>
          <p>${escapeHtml(r.feedbackText).slice(0, 500)}</p>
          <h4>Meta-Evaluation</h4>
          <p><b>Scoring:</b> ${r.metaEval.scoring_accuracy.verdict} — ${escapeHtml(r.metaEval.scoring_accuracy.explanation)}</p>
          <p><b>Feedback Quality:</b> ${r.metaEval.feedback_quality.score}/5 — ${escapeHtml(r.metaEval.feedback_quality.explanation)}</p>
          <p><b>Expert Quality:</b> ${r.metaEval.expert_quality.score}/5 — ${escapeHtml(r.metaEval.expert_quality.explanation)}</p>
          <p><b>Task Relevance:</b> ${r.metaEval.task_relevance.score}/5 — ${escapeHtml(r.metaEval.task_relevance.explanation)}</p>
          <p><b>Trap:</b> ${r.metaEval.trap_handling.trap_present ? 'Present' : 'None'} — ${escapeHtml(r.metaEval.trap_handling.explanation)}</p>
          ${r.metaEval.issues.length ? `<h4>Issues</h4><ul>${r.metaEval.issues.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` : ''}
        </div>
      </td>
    </tr>`;
  }).join('');

  const issuesList = s.issues.length
    ? s.issues.map(i => `<li>${escapeHtml(i)}</li>`).join('')
    : '<li>No issues found</li>';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>AWF QA Report — ${report.startedAt.slice(0, 16)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 24px; }
  h1 { font-size: 1.5rem; margin-bottom: 8px; }
  h2 { font-size: 1.1rem; margin: 24px 0 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
  h4 { margin: 12px 0 4px; color: #94a3b8; font-size: 0.85rem; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #334155; }
  .meta { color: #64748b; font-size: 0.85rem; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .card { background: #1e293b; border-radius: 12px; padding: 20px; text-align: center; }
  .card .num { font-size: 2rem; font-weight: 700; }
  .card .label { font-size: 0.8rem; color: #94a3b8; margin-top: 4px; }
  .pass { color: #22c55e; }
  .warn { color: #eab308; }
  .fail { color: #ef4444; }
  table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; margin-bottom: 24px; }
  th { text-align: left; padding: 10px 14px; background: #334155; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; }
  td { padding: 10px 14px; border-bottom: 1px solid #334155; font-size: 0.9rem; }
  .detail-row { cursor: pointer; }
  .detail-row:hover { background: #334155; }
  .hidden { display: none; }
  .expand-row td { background: #0f172a; }
  .detail-box { padding: 12px; }
  .detail-box p { margin: 4px 0; font-size: 0.85rem; line-height: 1.5; }
  .bar { height: 8px; border-radius: 4px; display: inline-block; min-width: 4px; }
  .dims { display: flex; gap: 12px; flex-wrap: wrap; }
  .dim { background: #334155; padding: 4px 10px; border-radius: 6px; font-size: 0.8rem; }
  .issues { background: #1e293b; border-radius: 8px; padding: 16px; }
  .issues li { margin: 6px 0 6px 20px; font-size: 0.9rem; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>AWF QA Report</h1>
    <div class="meta">${report.startedAt.slice(0, 16)} | ${totalTests} tests | ${(report.durationMs / 1000).toFixed(0)}s | ~$${s.estimatedCost.toFixed(2)}</div>
  </div>
</div>

<div class="cards">
  <div class="card"><div class="num pass">${s.pass}</div><div class="label">PASS (${passPct}%)</div></div>
  <div class="card"><div class="num warn">${s.warning}</div><div class="label">WARNING (${warnPct}%)</div></div>
  <div class="card"><div class="num fail">${s.fail}</div><div class="label">FAIL (${failPct}%)</div></div>
  <div class="card"><div class="num">${s.avgScoringAccuracy}%</div><div class="label">Scoring Accuracy</div></div>
  <div class="card"><div class="num">${s.avgFeedbackQuality}/5</div><div class="label">Feedback Quality</div></div>
  <div class="card"><div class="num">${s.avgExpertQuality}/5</div><div class="label">Expert Quality</div></div>
  <div class="card"><div class="num">${s.avgTaskRelevance}/5</div><div class="label">Task Relevance</div></div>
  <div class="card"><div class="num">${(s.totalTokens / 1000).toFixed(0)}K</div><div class="label">Total Tokens</div></div>
</div>

<h2>By Response Quality</h2>
<table>
  <tr><th>Quality</th><th>Avg Score</th><th>Pass</th><th>Pass Rate</th></tr>
  ${qualityRows}
</table>

<h2>By Profile</h2>
<table>
  <tr><th>Profile</th><th>Avg Score</th><th>Pass</th><th>Pass Rate</th></tr>
  ${profileRows}
</table>

<h2>All Tests (click to expand)</h2>
<table>
  <tr><th>#</th><th>Profile</th><th>Quality</th><th>Task</th><th>Score</th><th>Verdict</th><th>Time</th></tr>
  ${detailRows}
</table>

<h2>Issues Found</h2>
<div class="issues"><ul>${issuesList}</ul></div>

</body>
</html>`;

  writeFileSync(outputPath, html);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
