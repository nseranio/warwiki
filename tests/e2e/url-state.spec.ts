import {test, expect} from '@playwright/test';

test('atlas database search and filter survive a reload via the URL', async ({page}) => {
  await page.goto('/docs/surgical-techniques/04l-cosmetic-genital-surgery/male-cosmetic');
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const search = page.locator('.td-search').first();
  const count = page.locator('.td-count').first();
  const total = await count.textContent();

  await search.fill('hyaluronic');
  await expect(page).toHaveURL(/[?&]q=hyaluronic/);
  const filtered = await count.textContent();
  expect(filtered).not.toEqual(total);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(search).toHaveValue('hyaluronic');
  await expect(count).toHaveText(filtered!);

  await search.fill('');
  await expect(page).not.toHaveURL(/[?&]q=/);
});

test('video library filters load from and write to the URL', async ({page}) => {
  await page.goto('/video-library');
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  const topicSelect = page.getByRole('combobox', {name: 'Filter by topic'});
  const topic = await topicSelect.locator('option').nth(1).getAttribute('value');
  await topicSelect.selectOption(topic!);
  await expect(page).toHaveURL(new RegExp(`[?&]topic=${encodeURIComponent(topic!).replace(/%20/g, '(?:\\+|%20)')}`));

  await page.goto(`/video-library?topic=${encodeURIComponent(topic!)}`);
  await expect(page.locator('html')).toHaveAttribute('data-has-hydrated', 'true');
  await expect(topicSelect).toHaveValue(topic!);
});
