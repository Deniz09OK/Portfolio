import { defineConfig, devices } from '@playwright/test'

// Tests run against the static build (`npm run generate`), served like GitHub Pages.
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-webkit', use: { ...devices['iPhone 15'] } },
    // Tablette : limitée aux tests de certifications, les autres specs ne tournent pas dessus.
    { name: 'tablet-chromium', use: { ...devices['Galaxy Tab S4'] }, testMatch: /certifications\.spec\.ts/ },
  ],
  webServer: {
    command: 'node tests/serve.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
