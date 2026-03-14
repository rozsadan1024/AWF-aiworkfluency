import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { RunReport } from '../orchestrator.js';

const REPORTS_DIR = join(process.cwd(), 'reports');

export function saveReport(report: RunReport): string {
  if (!existsSync(REPORTS_DIR)) mkdirSync(REPORTS_DIR, { recursive: true });

  const timestamp = report.startedAt.replace(/[:.]/g, '-').slice(0, 19);
  const jsonPath = join(REPORTS_DIR, `qa-${timestamp}.json`);
  writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  return jsonPath;
}

export function loadReport(path: string): RunReport {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

export function listReports(): string[] {
  if (!existsSync(REPORTS_DIR)) return [];
  return readdirSync(REPORTS_DIR)
    .filter((f: string) => f.endsWith('.json'))
    .sort()
    .reverse();
}
