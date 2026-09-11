import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {collectBrowserErrors} from './browser-errors';

/**
 * Sitemap sweep.
 *
 * Reads the built sitemap at `build/sitemap.xml`, optionally samples a
 * subset (set WARWIKI_E2E_SAMPLE=N), and asserts each URL returns a
 * page with usable content and no browser or HTTP resource errors.
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
      const errors = collectBrowserErrors(page);
      try {
        const res = await page.goto(url, {waitUntil: 'load'});
        expect(res?.status(), `HTTP status for ${url}`).toBeLessThan(400);
        await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
        if (['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname)) {
          await expect(page.locator('script[src*="/_vercel/insights/"]')).toHaveCount(0);
        }

        if (new URL(url).pathname.replace(/\/+$/, '') === '/search') {
          // Upstream renders <main> only when it has results. An empty query
          // page is valid; verify its actual entry point instead of a landmark.
          await expect(page.getByRole('heading', {level: 1})).toBeVisible();
          const input = page.getByRole('searchbox', {name: 'Search', exact: true});
          await expect(input).toBeVisible();
          await expect(input).toBeEnabled();
          await expect(input).toHaveValue('');
        } else {
          const main = page.getByRole('main');
          await expect(main).toBeVisible();
          await expect(main).toContainText(/\S/);
        }

        expect(errors, `browser errors on ${url}`).toEqual([]);
      } finally {
        if (errors.length) {
          await test.info().attach('browser-errors', {
            body: errors.join('\n'),
            contentType: 'text/plain',
          });
        }
      }
    });
  }
});
