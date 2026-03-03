import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 180_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: process.env.TEST_URL || 'http://localhost:3100',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
