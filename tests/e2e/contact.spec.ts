import { expect, test } from '@playwright/test';

test('resume download matches the page language', async ({ page, request }) => {
  await page.goto('/fr/contact/');
  await expect(page.getByRole('link', { name: 'Télécharger mon CV' })).toHaveAttribute('href', '/cv-vanbercy-sailor.pdf');
  await page.goto('/en/contact/');
  await expect(page.getByRole('link', { name: 'Download my resume' })).toHaveAttribute('href', '/cv-vanbercy-sailor-en.pdf');
  expect((await request.get('/cv-vanbercy-sailor-en.pdf')).status()).toBe(200);
});

test('contact page lists LinkedIn', async ({ page }) => {
  await page.goto('/en/contact/');
  const link = page.getByRole('main').getByRole('link', { name: /LinkedIn/ });
  await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/sailor-vanbercy-141241398/');
  await expect(link).toHaveAttribute('rel', /noopener/);
});
