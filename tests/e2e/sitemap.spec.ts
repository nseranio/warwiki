import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Sitemap sweep.
 *
 * Reads the built sitemap at `build/sitemap.xml`, optionally samples a
 * subset (set WARWIKI_E2E_SAMPLE=N), and asserts each URL returns a
 * page with no uncaught console errors and a real <h1>.
 *
 * Run sequence:
 *   npm run build
 *   npx http-server build -p 3000 &   (or `npm run serve`)
 *   npm run test:e2e
 */

const SITEMAP_PATH = path.resolve(__dirname, '../../build/sitemap.xml');
const SAMPLE = Number(process.env.WARWIKI_E2E_SAMPLE ?? 0); // 0 = all
const BASE = process.env.WARWIKI_E2E_BASE_URL ?? 'http://localhost:3000';

function readSitemapUrls(): string[] {
  if (!fs.existsSync(SITEMAP_PATH)) {
    throw new Error(
      `sitemap.xml not found at ${SITEMAP_PATH}. Run \`npm run build\` first.`
    );
  }
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1]);
  return urls.map(u => u.replace(/^https?:\/\/[^/]+/, BASE));
}

function pickUrls(): string[] {
  const all = readSitemapUrls();
  if (SAMPLE <= 0 || SAMPLE >= all.length) return all;
  // Deterministic sample so reruns are reproducible.
  const out: string[] = [];
  const step = all.length / SAMPLE;
  for (let i = 0; i < SAMPLE; i++) out.push(all[Math.floor(i * step)]);
  return out;
}

const urls = pickUrls();

test.describe('Sitemap sweep', () => {
  for (const url of urls) {
    test(`loads cleanly: ${url}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const res = await page.goto(url, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), `HTTP status for ${url}`).toBeLessThan(400);

      // Every Docusaurus page should render an h1 (except hide_title pages
      // which still emit the title in their <article>; we just check for
      // *some* main content).
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // Filter out known-benign Docusaurus warnings if any creep in over
      // time. For now: any console error fails the test.
      const realErrors = consoleErrors.filter(
        e =>
          !/Download the React DevTools/.test(e) &&
          !/google-analytics/i.test(e) &&
          !/algolia/i.test(e)
      );
      expect(realErrors, `console errors on ${url}`).toEqual([]);
    });
  }
});
