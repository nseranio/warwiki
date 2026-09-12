import { expect, test } from '@playwright/test';

test('citation previews stay within the viewport and leave no overflow when dismissed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/docs/foundations/tools/biomaterials/autologous-tissue/rectus-fascia');
  const citation = page.locator('article .markdown sup > a[href="#ref1"]').first();
  const preview = page.locator('.warwiki-cite-tooltip');

  await citation.hover();
  await expect(preview).toBeVisible();
  await expect(preview).toContainText('American Urological Association');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(preview).toBeHidden();
  await expect(preview).toHaveAttribute('aria-hidden', 'true');
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth <= window.innerWidth + 1,
  )).toBe(true);

  await citation.scrollIntoViewIfNeeded();
  await citation.focus();
  await expect(preview).toBeVisible();
  await expect.poll(() => preview.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return bounds.left >= 0 && bounds.right <= window.innerWidth;
  })).toBe(true);

  await page.locator('h1').click();
  await expect(preview).toBeHidden();
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth <= window.innerWidth + 1,
  )).toBe(true);
});
