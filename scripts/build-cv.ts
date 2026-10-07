// Renders the FR and EN resumes to text-based PDFs in public/ (`npm run cv`).
import { chromium } from '@playwright/test';
import { join } from 'node:path';
import { cv } from '../cv/cv-data';
import { renderCvHtml } from '../cv/render';
import { LOCALES } from '../src/lib/i18n';

const MAX_PAGES = 1;

const OUTPUT: Record<(typeof LOCALES)[number], string> = {
  fr: 'cv-vanbercy-sailor.pdf',
  en: 'cv-vanbercy-sailor-en.pdf',
};

async function main(): Promise<void> {
  const browser = await chromium.launch();
  try {
    for (const locale of LOCALES) {
      const page = await browser.newPage();
      await page.setContent(renderCvHtml(cv[locale], locale), {
        waitUntil: 'networkidle',
      });
      await page.evaluate(() => document.fonts.ready);
      const path = join(process.cwd(), 'public', OUTPUT[locale]);
      const pdf = await page.pdf({
        path,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
      });
      // A junior resume must fit on one page: fail the build instead of shipping a spill-over.
      const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
      if (pages > MAX_PAGES) throw new Error(`${OUTPUT[locale]} has ${pages} pages, expected ${MAX_PAGES}`);
      console.log(`Wrote ${path} (${pages} page)`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
