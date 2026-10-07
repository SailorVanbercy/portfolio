import { expect, test } from '@playwright/test';

const MIN_PAGES = 34;

test('root redirects to a localized home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/(fr|en)\/$/);
});

test('language switch keeps the same project', async ({ page }) => {
  await page.goto('/fr/projets/leadboy/');
  await page.getByRole('link', { name: 'Voir le site en anglais' }).click();
  await expect(page).toHaveURL(/\/en\/projects\/leadboy\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'LeadBoy' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

for (const path of ['/fr/projects/', '/en/projets/leadboy/', '/fr/projets/does-not-exist/', '/de/']) {
  test(`unknown route ${path} returns the branded 404 page`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page introuvable' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/en/');
  });
}

test('every internal link resolves', async ({ page, request }) => {
  const visited = new Set<string>();
  const queue = ['/fr/', '/en/'];
  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const links = await page.locator('a[href^="/"]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href') ?? ''));
    links.filter((link) => !link.endsWith('.pdf') && !visited.has(link)).forEach((link) => queue.push(link));
  }
  expect((await request.get('/cv-vanbercy-sailor.pdf')).status()).toBe(200);
  expect(visited.size).toBeGreaterThanOrEqual(MIN_PAGES);
});

test('category filter narrows the project list', async ({ page }) => {
  await page.goto('/fr/projets/');
  const cards = page.locator('main article');
  const total = await cards.count();
  await page.getByRole('button', { name: 'Professionnel' }).click();
  const filtered = await cards.count();
  expect(filtered).toBeGreaterThan(0);
  expect(filtered).toBeLessThan(total);
});

test('gallery opens, navigates with the keyboard and closes with Escape', async ({ page }) => {
  await page.goto('/en/projects/smaatch/');
  await page.getByRole('button', { name: /^Enlarge:/ }).first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText(/Image 1 of \d+/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText(/Image 2 of \d+/);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('no horizontal scroll on main pages', async ({ page }) => {
  for (const path of ['/fr/', '/fr/projets/', '/fr/a-propos/', '/fr/contact/', '/fr/projets/leadboy/', '/en/projects/foodsnap/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
