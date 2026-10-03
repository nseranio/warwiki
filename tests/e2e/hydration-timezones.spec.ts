import {test, expect} from '@playwright/test';
import {collectBrowserErrors} from './browser-errors';

/**
 * Server-rendered HTML is built in one timezone (UTC on Vercel and CI) and
 * hydrated in the reader's. Anything formatted with the local timezone then
 * differs and React throws hydration error #418. UTC-12 and UTC+14 are 26 hours
 * apart, so for any build time at least one of them falls on a different
 * calendar day from UTC: a fixed single timezone would only catch the bug at
 * certain hours.
 */
const TIMEZONES = ['Etc/GMT+12', 'Pacific/Kiritimati'];
const PAGES = ['/', '/docs/foundations', '/docs/surgical-techniques'];

for (const timezoneId of TIMEZONES) {
  test(`hydrates without errors in ${timezoneId}`, async ({browser}) => {
    const context = await browser.newContext({timezoneId});
    const page = await context.newPage();
    const errors = collectBrowserErrors(page);
    for (const path of PAGES) {
      await page.goto(path, {waitUntil: 'domcontentloaded'});
      await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
    }
    expect(errors).toEqual([]);
    await context.close();
  });
}
