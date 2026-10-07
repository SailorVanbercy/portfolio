import { expect, test } from '@playwright/test';

test('every image on every project page loads', async ({ page }) => {
  await page.goto('/fr/projets/');
  const paths = await page
    .locator('main article a')
    .evaluateAll((anchors) => [...new Set(anchors.map((a) => a.getAttribute('href') ?? ''))]);
  expect(paths.length).toBe(13);
  for (const path of paths) {
    await page.goto(path);
    const images = page.locator('main img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { message: `${path} image ${i}` }).toBe(true);
    }
  }
});
