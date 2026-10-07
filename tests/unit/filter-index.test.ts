import { describe, expect, it } from 'vitest';
import type { Project, Skill } from '@/lib/content/schema';
import { skillOptionsFor } from '@/lib/filter-index';

const project = (ids: string[]) => ({ stack: { frontend: ids } }) as unknown as Project;
const skills: Skill[] = [
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'angular', label: 'Angular', category: 'frontend' },
  { id: 'php', label: 'PHP', category: 'language' },
];

describe('skillOptionsFor', () => {
  it('offers only skills used by at least one project, sorted by label', () => {
    expect(skillOptionsFor([project(['react']), project(['angular', 'react'])], skills)).toEqual([
      { id: 'angular', label: 'Angular' },
      { id: 'react', label: 'React' },
    ]);
  });
});
