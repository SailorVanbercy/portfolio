import { expect, test } from '@playwright/test';

test('dark preference applies before first paint', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as unknown as { __themeAtLoad: string }).__themeAtLoad = document.documentElement.dataset.theme ?? 'none';
    });
  });
  await page.goto('/fr/');
  expect(await page.evaluate(() => (window as unknown as { __themeAtLoad: string }).__themeAtLoad)).toBe('dark');
  await context.close();
});

test('theme toggle persists across navigation', async ({ page }) => {
  await page.goto('/fr/');
  const initial = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: 'Changer de thème' }).click();
  await page.goto('/fr/a-propos/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', initial ?? '');
});

test('reduced motion disables the hero animation', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/fr/');
  const animation = await page.locator('.hero-reveal > p').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
  await context.close();
});
