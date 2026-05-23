import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for end-to-end sweeps.
 *
 * The primary spec (`tests/e2e/sitemap.spec.ts`) walks the built sitemap
 * and asserts every page returns 200 with no console errors. Run against
 * a local production build:
 *
 *   npm run build && npm run serve &
 *   npm run test:e2e
 *
 * In CI, this can be wired as a separate job — keep it out of the main
 * lint/build job since it's slower.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.WARWIKI_E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
