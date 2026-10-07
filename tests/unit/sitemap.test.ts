import { describe, expect, it } from 'vitest';
import { getProjects } from '@/lib/content/queries';
import { SITE_URL, allLocalizedPaths } from '@/lib/site';

const SECTION_COUNT = 3;

describe('allLocalizedPaths', () => {
  it('lists home, sections and every project in both locales, without duplicates', () => {
    const paths = allLocalizedPaths();
    expect(paths).toHaveLength(2 * (1 + SECTION_COUNT + getProjects().length));
    expect(paths).toContain('/fr/');
    expect(paths).toContain('/en/about/');
    expect(paths).toContain('/fr/projets/leadboy/');
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('uses the production domain', () => {
    expect(SITE_URL).toBe('https://portfolio-sailorvanbercy.vercel.app');
  });
});
