import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { validateContent } from '@/lib/content/validate';
import type { Skill } from '@/lib/content/schema';

const skills: Skill[] = [
  { id: 'nextjs', label: 'Next.js', category: 'frontend' },
  { id: 'typescript', label: 'TypeScript', category: 'language' },
];

const validProject = (overrides: Record<string, unknown> = {}) => ({
  slug: 'demo',
  title: 'Demo',
  pitch: { fr: 'Pitch', en: 'Pitch' },
  category: 'personal',
  period: '2026',
  team: { solo: true },
  role: { fr: 'Dev', en: 'Dev' },
  context: { fr: 'Contexte', en: 'Context' },
  features: { fr: ['a', 'b', 'c'], en: ['a', 'b', 'c'] },
  architecture: { fr: 'Archi', en: 'Archi' },
  stack: { frontend: ['nextjs'], tooling: ['typescript'] },
  images: [{ src: 'projects/demo/01-home.webp', alt: { fr: 'Accueil', en: 'Home' }, viewport: 'desktop' }],
  featured: false,
  order: 1,
  ...overrides,
});

let publicDir: string;

beforeEach(() => {
  publicDir = mkdtempSync(join(tmpdir(), 'portfolio-public-'));
  mkdirSync(join(publicDir, 'projects', 'demo'), { recursive: true });
  writeFileSync(join(publicDir, 'projects', 'demo', '01-home.webp'), '');
  writeFileSync(join(publicDir, 'projects', 'demo', '01-home.thumb.webp'), '');
});

describe('validateContent', () => {
  it('accepts a valid project', () => {
    expect(validateContent([validProject()], skills, publicDir)).toEqual([]);
  });

  it('rejects a missing EN translation', () => {
    const errors = validateContent([validProject({ pitch: { fr: 'Pitch', en: '' } })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/demo: pitch\.en/);
  });

  it('rejects an unknown skill id', () => {
    const errors = validateContent([validProject({ stack: { frontend: ['vue'] } })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/unknown skill "vue"/);
  });

  it('rejects a missing image file', () => {
    const images = [{ src: 'projects/demo/02-missing.webp', alt: { fr: 'x', en: 'x' }, viewport: 'desktop' }];
    const errors = validateContent([validProject({ images })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/missing image .*02-missing\.webp/);
  });

  it('rejects duplicate slugs and duplicate order', () => {
    const errors = validateContent([validProject(), validProject()], skills, publicDir);
    expect(errors.join('\n')).toMatch(/duplicate slug "demo"/);
    expect(errors.join('\n')).toMatch(/duplicate order 1/);
  });

  it('rejects duplicate skill ids in the registry', () => {
    const errors = validateContent([validProject()], [...skills, skills[0]], publicDir);
    expect(errors.join('\n')).toMatch(/duplicate skill id "nextjs"/);
  });

  it('rejects an unknown stack layer', () => {
    const errors = validateContent([validProject({ stack: { cloud: ['nextjs'] } })], skills, publicDir);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects an image without its card thumbnail', () => {
    writeFileSync(join(publicDir, 'projects', 'demo', '02-other.webp'), '');
    const images = [{ src: 'projects/demo/02-other.webp', alt: { fr: 'x', en: 'x' }, viewport: 'desktop' }];
    const errors = validateContent([validProject({ images })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/missing thumbnail .*02-other\.thumb\.webp/);
  });
});
