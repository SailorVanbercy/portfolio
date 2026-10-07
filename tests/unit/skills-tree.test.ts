import { describe, expect, it } from 'vitest';
import { buildSkillsTree } from '@/lib/skills-tree';
import type { Project, Skill } from '@/lib/content/schema';

const skills: Skill[] = [
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'angular', label: 'Angular', category: 'frontend' },
  { id: 'jpa', label: 'JPA', category: 'orm' },
  { id: 'unused', label: 'Unused', category: 'tooling' },
  { id: 'java', label: 'Java', category: 'language' },
];

const project = (slug: string, order: number, stack: Project['stack']) =>
  ({ slug, title: slug.toUpperCase(), order, stack }) as Project;

const projects = [
  project('c', 3, { frontend: ['react'], backend: ['java'] }),
  project('a', 1, { frontend: ['react'], backend: ['java'], database: ['jpa'] }),
  project('b', 2, { frontend: ['react', 'angular'], tooling: ['react'] }),
];

describe('buildSkillsTree', () => {
  const tree = buildSkillsTree(projects, skills);

  it('groups skills by category in category order and omits unused skills', () => {
    expect(tree.map((g) => g.category)).toEqual(['language', 'frontend', 'orm']);
    expect(tree.flatMap((g) => g.skills.map((s) => s.skill.id))).not.toContain('unused');
  });

  it('sorts skills by project count desc, then label', () => {
    const frontend = tree.find((g) => g.category === 'frontend')!;
    expect(frontend.skills.map((s) => s.skill.id)).toEqual(['react', 'angular']);
  });

  it('lists projects using each skill in project order, without duplicates', () => {
    const react = tree.find((g) => g.category === 'frontend')!.skills[0];
    expect(react.projects).toEqual([
      { slug: 'a', title: 'A' },
      { slug: 'b', title: 'B' },
      { slug: 'c', title: 'C' },
    ]);
  });
});
