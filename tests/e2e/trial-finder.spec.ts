import {expect, test} from '@playwright/test';
import {collectBrowserErrors} from './browser-errors';

/** Structure only: the registry changes daily, so no study counts or names are asserted. */
test('trial finder: snapshot loads, OAB details, ZIP states, reading pane', async ({page}) => {
  const errors = collectBrowserErrors(page);
  await page.goto('/docs/resources/clinical-trial-finder');
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(page.getByText(/ClinicalTrials\.gov snapshot [A-Z][a-z]+ \d{1,2}, \d{4}/)).toBeVisible();
  await expect(page.locator('p[aria-live="polite"]').filter({hasText: /\d+ (study|studies) · [\d,]+ sites?/})).toBeVisible();
  await page.getByRole('button', {name: /^Disease/}).click();
  await page.getByRole('button', {name: 'OAB / urgency', exact: true}).click();
  await page.getByRole('combobox', {name: 'Type', exact: true}).selectOption('idiopathic');
  await page.getByRole('combobox', {name: 'Treatment so far', exact: true}).selectOption('medication');
  await page.getByRole('button', {name: 'Done'}).click();
  await expect(page.getByRole('button', {name: /^Disease.*idiopathic/})).toBeVisible();
  await page.getByLabel('US ZIP').fill('19107');
  await expect(page.getByRole('button', {name: /Within 100 mi of 19107/})).toBeVisible();
  await page.getByLabel('US ZIP').fill('99999');
  await expect(page.getByText(/has no Census ZIP Code Tabulation Area/)).toBeVisible();
  await page.getByLabel('US ZIP').fill('');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});
