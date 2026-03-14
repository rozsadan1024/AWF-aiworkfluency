#!/usr/bin/env node

import { Command } from 'commander';
import { join } from 'path';
import { runTests, RunConfig } from './orchestrator.js';
import { ALL_PROFILE_KEYS, PROFILES } from './profiles/presets.js';
import { DEFAULT_QUALITIES, ALL_QUALITIES, ResponseQuality } from './config.js';
import { generateHTMLReport } from './reporting/html-report.js';
import { saveReport, listReports, loadReport } from './reporting/json-store.js';
import { printSummary } from './reporting/console.js';
import { getSupabase } from './platform/supabase.js';
import { runQPTests } from './qp/runner.js';
import { QPQuality } from './qp/response-generator.js';

const program = new Command();

program
  .name('awf-qa')
  .description('AIWorkFluency QA Testing System')
  .version('1.0.0');

program
  .command('run')
  .description('Run the QA test suite')
  .option('-p, --profiles <names>', 'Comma-separated profile names or "all"', 'all')
  .option('-q, --qualities <names>', 'Comma-separated quality levels or "all"', DEFAULT_QUALITIES.join(','))
  .option('-c, --concurrency <n>', 'Max parallel tests', '2')
  .option('-d, --difficulty <level>', 'Task difficulty: beginner, intermediate, advanced', 'intermediate')
  .option('--no-cleanup', 'Keep test users in database after run')
  .action(async (opts) => {
    const profiles = opts.profiles === 'all'
      ? ALL_PROFILE_KEYS
      : opts.profiles.split(',').map((s: string) => s.trim());

    // Validate profiles
    for (const p of profiles) {
      if (!PROFILES[p]) {
        console.error(`Unknown profile: ${p}`);
        console.error(`Available: ${ALL_PROFILE_KEYS.join(', ')}`);
        process.exit(1);
      }
    }

    const qualities = opts.qualities === 'all'
      ? ALL_QUALITIES
      : opts.qualities.split(',').map((s: string) => s.trim()) as ResponseQuality[];

    // Validate qualities
    for (const q of qualities) {
      if (!ALL_QUALITIES.includes(q)) {
        console.error(`Unknown quality: ${q}`);
        console.error(`Available: ${ALL_QUALITIES.join(', ')}`);
        process.exit(1);
      }
    }

    const config: RunConfig = {
      profiles,
      qualities,
      concurrency: parseInt(opts.concurrency, 10),
      cleanup: opts.cleanup !== false,
      difficulty: opts.difficulty as any,
    };

    try {
      const report = await runTests(config);

      // Save JSON report
      const jsonPath = saveReport(report);
      console.log(`\nJSON report saved: ${jsonPath}`);

      // Generate HTML report
      const htmlPath = jsonPath.replace('.json', '.html');
      generateHTMLReport(report, htmlPath);
      console.log(`HTML report saved: ${htmlPath}`);

      // Print console summary
      printSummary(report);

      // Exit with non-zero if any failures
      if (report.summary.fail > 0) {
        process.exit(1);
      }
    } catch (e: any) {
      console.error(`\nFatal error: ${e.message}`);
      console.error(e.stack);
      process.exit(2);
    }
  });

program
  .command('cleanup')
  .description('Delete all QA test users from the database')
  .action(async () => {
    const sb = getSupabase();
    console.log('Looking for QA test users...');

    const { data: users, error } = await sb.auth.admin.listUsers();
    if (error) {
      console.error(`Failed to list users: ${error.message}`);
      process.exit(1);
    }

    const qaUsers = users.users.filter(u => u.email?.includes('@awf-test.local'));
    console.log(`Found ${qaUsers.length} QA test users`);

    for (const user of qaUsers) {
      try {
        // Delete data first (in case CASCADE doesn't cover everything)
        await sb.from('evaluations').delete().eq('user_id', user.id);
        await sb.from('submissions').delete().eq('user_id', user.id);
        await sb.from('conversations').delete().eq('user_id', user.id);
        await sb.from('tasks').delete().eq('user_id', user.id);
        await sb.from('user_progress').delete().eq('user_id', user.id);
        await sb.from('assessments').delete().eq('user_id', user.id);
        await sb.from('role_profiles').delete().eq('user_id', user.id);
        await sb.from('profiles').delete().eq('id', user.id);
        await sb.auth.admin.deleteUser(user.id);
        console.log(`  Deleted: ${user.email}`);
      } catch (e: any) {
        console.error(`  Failed to delete ${user.email}: ${e.message}`);
      }
    }

    console.log('Cleanup complete.');
  });

program
  .command('report')
  .description('View or regenerate reports')
  .option('--latest', 'Open the latest report')
  .option('--list', 'List all reports')
  .action(async (opts) => {
    if (opts.list) {
      const reports = listReports();
      if (reports.length === 0) {
        console.log('No reports found. Run `awf-qa run` first.');
        return;
      }
      console.log('Available reports:');
      for (const r of reports) {
        console.log(`  ${r}`);
      }
      return;
    }

    const reports = listReports();
    if (reports.length === 0) {
      console.log('No reports found. Run `awf-qa run` first.');
      return;
    }

    const latestJson = join(process.cwd(), 'reports', reports[0]);
    const report = loadReport(latestJson);
    printSummary(report);

    const htmlPath = latestJson.replace('.json', '.html');
    console.log(`\nHTML report: ${htmlPath}`);
  });

program
  .command('qp')
  .description('Run Quick Pill QA tests')
  .option('-n, --pills <n>', 'Number of pills to test (0 = all)', '0')
  .option('-q, --qualities <names>', 'Comma-separated quality levels', 'excellent,good,bad,gibberish')
  .option('-c, --concurrency <n>', 'Max parallel tests', '2')
  .action(async (opts) => {
    const qualities = opts.qualities.split(',').map((s: string) => s.trim()) as QPQuality[];
    const validQualities: QPQuality[] = ['excellent', 'good', 'bad', 'gibberish'];
    for (const q of qualities) {
      if (!validQualities.includes(q)) {
        console.error(`Unknown quality: ${q}. Available: ${validQualities.join(', ')}`);
        process.exit(1);
      }
    }

    try {
      const report = await runQPTests({
        pillCount: parseInt(opts.pills, 10),
        qualities,
        concurrency: parseInt(opts.concurrency, 10),
      });

      if (report.summary.fail > 0) process.exit(1);
    } catch (e: any) {
      console.error(`Fatal: ${e.message}`);
      process.exit(2);
    }
  });

program.parse();
