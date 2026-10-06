import { describe, expect, it } from 'vitest';
import { href, resolveSection, sectionParams, switchLocalePath } from '@/lib/routes';

describe('href', () => {
  it('builds localized paths with trailing slash', () => {
    expect(href('fr', 'home')).toBe('/fr/');
    expect(href('fr', 'projects')).toBe('/fr/projets/');
    expect(href('en', 'projects', 'leadboy')).toBe('/en/projects/leadboy/');
    expect(href('fr', 'about')).toBe('/fr/a-propos/');
    expect(href('en', 'contact')).toBe('/en/contact/');
  });
});

describe('resolveSection', () => {
  it('resolves a segment only within its own locale', () => {
    expect(resolveSection('fr', 'projets')).toBe('projects');
    expect(resolveSection('en', 'projects')).toBe('projects');
    expect(resolveSection('fr', 'projects')).toBeUndefined();
    expect(resolveSection('en', 'a-propos')).toBeUndefined();
    expect(resolveSection('en', 'unknown')).toBeUndefined();
  });
});

describe('sectionParams', () => {
  it('lists every section for every locale exactly once', () => {
    const params = sectionParams();
    expect(params).toHaveLength(6);
    expect(params).toContainEqual({ locale: 'fr', section: 'a-propos' });
    expect(params).toContainEqual({ locale: 'en', section: 'about' });
  });
});

describe('switchLocalePath', () => {
  it('keeps the same page across locales', () => {
    expect(switchLocalePath('/fr/', 'en')).toBe('/en/');
    expect(switchLocalePath('/fr/a-propos/', 'en')).toBe('/en/about/');
    expect(switchLocalePath('/fr/projets/leadboy/', 'en')).toBe('/en/projects/leadboy/');
    expect(switchLocalePath('/en/projects/smaatch', 'fr')).toBe('/fr/projets/smaatch/');
  });

  it('falls back to the target home for unknown paths', () => {
    expect(switchLocalePath('/fr/nope/', 'en')).toBe('/en/');
    expect(switchLocalePath('/', 'en')).toBe('/en/');
  });
});
