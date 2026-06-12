import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: process.env.CI ? true : false,
  retries: 0,
  workers: 1,
  timeout: 60000,
  outputDir: './test-results/artifacts',
  reporter: [
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: undefined,
});
