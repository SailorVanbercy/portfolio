import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '@content/projects';
import { skills } from '@content/skills';
import { validateContent } from '@/lib/content/validate';

const EXPECTED_PROJECT_COUNT = 13;
const EXPECTED_FEATURED = ['leadboy', 'smaatch', 'tetris-formation'];
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

describe('real content', () => {
  it('passes validation', () => {
    expect(validateContent(projects, [...skills], join(process.cwd(), 'public'))).toEqual([]);
  });

  it('contains no emoji', () => {
    expect(JSON.stringify(projects)).not.toMatch(EMOJI);
  });

  it.skipIf(projects.length < EXPECTED_PROJECT_COUNT)('contains all projects and the 3 featured ones', () => {
    expect(projects).toHaveLength(EXPECTED_PROJECT_COUNT);
    expect(projects.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual([...EXPECTED_FEATURED].sort());
  });
});
