import {test, expect} from '@playwright/test';

for (const width of [375, 1280]) {
  test(`clinic retrieval and saved topics at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/clinic');
    await expect(page.getByRole('heading', {name: 'Clinic quick access', exact: true})).toBeVisible();
    await expect(page.locator('main article')).toHaveCount(7);
    await page.screenshot({path: `test-results/clinic-all-${width}.png`, fullPage: true});
    await page.getByRole('searchbox', {name: 'Find a problem'}).fill('rUTI');
    await expect(page.locator('main article')).toHaveCount(1);
    const save = page.getByRole('button', {name: /^Save /});
    await save.click();
    await expect(save).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await page.getByRole('checkbox', {name: 'Saved topics'}).check();
    await expect(page.locator('main article')).toHaveCount(1);
    await expect(page.locator('main article')).toContainText('Recurrent urinary tract infection in women');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({path: `test-results/clinic-${width}.png`, fullPage: true});
  });
}

test('clinical abbreviation reaches the search service as expanded words', async ({page}) => {
  let query = '';
  await page.route(/algolia(net|\.net|\.io)|algolianet\.com/, async route => {
    const body = route.request().postDataJSON();
    const request = body?.requests?.[0];
    query = request?.query ?? new URLSearchParams(request?.params ?? '').get('query') ?? '';
    await route.fulfill({json: {results: [{hits: [], nbHits: 0, page: 0, nbPages: 0, hitsPerPage: 20, processingTimeMS: 1, query}]}});
  });
  await page.goto('/');
  await page.screenshot({path: 'test-results/homepage-1280.png', fullPage: true});
  await page.locator('.DocSearch-Button').click();
  await page.locator('#docsearch-input').fill('rUTI');
  await expect.poll(() => query).toBe('recurrent urinary tract infection');
});

test('compiled clinical figures enlarge and return keyboard focus', async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/docs/clinical-conditions/03c-pelvic-support/obstetric-perineal-injury');
  const enlarge = page.getByRole('button', {name: /enlarge/i}).first();
  await enlarge.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(enlarge).toBeFocused();
  expect(errors).toEqual([]);
});
