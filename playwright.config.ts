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
 * Without WARWIKI_E2E_BASE_URL, Playwright serves `build/` itself on port
 * 3000 (reusing a server that is already running). CI runs this as a
 * separate job after the build (`.github/workflows/ci.yml`).
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
  webServer: process.env.WARWIKI_E2E_BASE_URL ? undefined : {
    command: 'npm run serve -- --port 3000 --no-open',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
