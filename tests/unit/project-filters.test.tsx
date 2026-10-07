import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectFilters, filterProjects } from '@/components/project-filters';
import type { Project } from '@/lib/content/schema';
import { getDictionary } from '@/lib/dictionary';

const p = (slug: string, category: Project['category'], ids: string[]) =>
  ({
    slug,
    title: slug.toUpperCase(),
    category,
    period: '2026',
    pitch: { fr: slug, en: slug },
    stack: { frontend: ids },
    images: [{ src: `projects/${slug}/01-a.webp`, alt: { fr: slug, en: slug }, viewport: 'desktop' }],
  }) as unknown as Project;

const projects = [p('a', 'professional', ['react']), p('b', 'academic', ['java']), p('c', 'academic', ['react', 'java'])];
const skills = [
  { id: 'react', label: 'React', category: 'frontend' as const },
  { id: 'java', label: 'Java', category: 'language' as const },
];

describe('filterProjects', () => {
  it('returns all projects with no filter', () => {
    expect(filterProjects(projects, {}).map((x) => x.slug)).toEqual(['a', 'b', 'c']);
  });
  it('filters by category', () => {
    expect(filterProjects(projects, { category: 'academic' }).map((x) => x.slug)).toEqual(['b', 'c']);
  });
  it('filters by skill', () => {
    expect(filterProjects(projects, { skill: 'react' }).map((x) => x.slug)).toEqual(['a', 'c']);
  });
  it('combines category and skill', () => {
    expect(filterProjects(projects, { category: 'academic', skill: 'react' }).map((x) => x.slug)).toEqual(['c']);
  });
});

describe('ProjectFilters', () => {
  const dict = getDictionary('en');

  it('narrows the list when a category is pressed and resets it', () => {
    render(<ProjectFilters projects={projects} skills={skills} locale="en" dict={dict} />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Professional' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Professional' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('shows an empty state when nothing matches', () => {
    render(<ProjectFilters projects={projects} skills={skills} locale="en" dict={dict} />);
    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));
    expect(screen.getByText('No project matches this filter.')).toBeInTheDocument();
  });

  it('only offers technologies used by at least one project', () => {
    render(<ProjectFilters projects={projects} skills={[...skills, { id: 'php', label: 'PHP', category: 'language' }]} locale="en" dict={dict} />);
    expect(screen.queryByRole('option', { name: 'PHP' })).not.toBeInTheDocument();
  });
});
