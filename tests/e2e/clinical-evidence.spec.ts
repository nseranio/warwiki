import {test, expect, type Page} from '@playwright/test';
import {collectBrowserErrors} from './browser-errors';

/**
 * Clinical Evidence library (November 18): one search, area tabs, a question select, result chips and a
 * Newest/Oldest switch over one result list, with the selected trial's summary in a reading pane beside it
 * (on phones the pane replaces the list). All of it lives in the URL.
 */

const options = (page: Page) => page.locator('[role="listbox"] [role="option"]');
const count = (page: Page) => page.locator('[role="listbox"] [role="status"]');
const hydrated = (page: Page) => expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test('desktop: search, area, result and question filters share one URL with the reading pane', async ({page}) => {
  const errors = collectBrowserErrors(page);
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto('/docs/clinical-evidence');
  await hydrated(page);
  await expect(options(page).first()).toBeVisible();
  const all = await options(page).count();
  expect(all).toBeGreaterThan(100);
  await expect(count(page)).toContainText('newest first');
  // The first result is selected and its summary is open beside the list.
  await expect(options(page).first()).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('link', {name: /Open the full trial page/})).toBeVisible();

  await page.getByRole('group', {name: 'Show area'}).getByRole('button', {name: 'Pelvic floor', exact: true}).click();
  await expect(page).toHaveURL(/[?&]area=pelvic-floor/);
  await expect.poll(() => options(page).count()).toBeLessThan(all);

  await page.getByRole('searchbox', {name: 'Search trials'}).fill('ROSETTA');
  await expect(page).toHaveURL(/[?&]q=ROSETTA/);
  await options(page).filter({hasText: 'ROSETTA'}).first().click();
  await expect(page).toHaveURL(/[?&]trial=rosetta/);
  const pane = page.locator('section[aria-label="ROSETTA"]');
  await expect(pane.getByRole('heading', {name: 'ROSETTA'})).toBeVisible();
  await expect(pane.getByRole('link', {name: /Open the full trial page/})).toHaveAttribute('href', '/docs/clinical-evidence/studies/rosetta');

  // A timeline link in the pane opens that question oldest first and clears the search.
  await pane.locator('button').first().click();
  await expect(page).toHaveURL(/[?&]question=/);
  await expect(page).not.toHaveURL(/[?&]q=/);
  await expect(count(page)).toContainText('oldest first, as a timeline');
  await page.getByRole('group', {name: 'Order'}).getByRole('button', {name: 'Newest'}).click();
  await expect(page).toHaveURL(/[?&]sort=new/);
  await expect(count(page)).toContainText('newest first');

  // Result chips filter and toggle off again.
  await page.goto('/docs/clinical-evidence');
  await hydrated(page);
  const negative = page.getByRole('group', {name: 'Result'}).getByRole('button', {name: /^Negative/});
  const n = Number((await negative.textContent())!.replace(/\D+/g, ''));
  await negative.click();
  await expect(page).toHaveURL(/[?&]result=negative/);
  await expect(options(page)).toHaveCount(n);
  await page.reload();
  await hydrated(page);
  await expect(negative).toHaveAttribute('aria-pressed', 'true');
  await expect(options(page)).toHaveCount(n);

  // Arrow keys in the search move through the results.
  const search = page.getByRole('searchbox', {name: 'Search trials'});
  await search.focus();
  await page.keyboard.press('ArrowDown');
  await expect(options(page).nth(1)).toHaveAttribute('aria-selected', 'true');
  await noHorizontalOverflow(page);
  expect(errors).toEqual([]);
});

test('older links still land: #decision opens a timeline, #trial selects it, Journal Club #trial- goes to the page', async ({page}) => {
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto('/docs/clinical-evidence#oab-pharmacotherapy');
  await hydrated(page);
  await expect(page.getByLabel('Question')).toHaveValue('oab-pharmacotherapy');
  await expect(count(page)).toContainText('oldest first, as a timeline');
  await expect(page).toHaveURL(/[?&]question=oab-pharmacotherapy/);

  await page.goto('/docs/clinical-evidence#rosetta');
  await hydrated(page);
  await expect(page.locator('[role="option"][aria-selected="true"]')).toContainText('ROSETTA');

  await page.goto('/docs/clinical-evidence?view=trial&area=oab');
  await hydrated(page);
  await expect(page.getByRole('group', {name: 'Show area'}).getByRole('button', {name: /Overactive bladder/})).toHaveAttribute('aria-pressed', 'true');

  await page.goto('/docs/clinical-evidence#trial-rosetta');
  await expect(page).toHaveURL(/\/docs\/clinical-evidence\/studies\/rosetta$/);
});

test('phone: the reading pane replaces the list and Back returns to the results', async ({page}) => {
  const errors = collectBrowserErrors(page);
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/docs/clinical-evidence');
  await hydrated(page);
  const first = options(page).first();
  await expect(first).toBeVisible();
  const name = (await first.locator('span').first().textContent())!;
  await first.click();
  await expect(page).toHaveURL(/[?&]trial=/);
  const pane = page.locator(`section[aria-label="${name}"]`);
  await expect(pane).toBeVisible();
  await expect(page.getByRole('listbox', {name: 'Trials'})).toBeHidden();
  await noHorizontalOverflow(page);
  await page.goBack();
  await expect(page).not.toHaveURL(/[?&]trial=/);
  await expect(page.getByRole('listbox', {name: 'Trials'})).toBeVisible();
  await expect(pane).toBeHidden();
  await noHorizontalOverflow(page);
  expect(errors).toEqual([]);
});
