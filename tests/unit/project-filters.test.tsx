import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectFilters, filterProjects, type FilterableProject } from '@/components/project-filters';
import { getDictionary } from '@/lib/dictionary';

const item = (slug: string, category: FilterableProject['category'], skills: string[]): FilterableProject => ({
  slug,
  category,
  skills,
  card: <article>{slug}</article>,
});

const items = [item('a', 'professional', ['react']), item('b', 'academic', ['java']), item('c', 'academic', ['react', 'java'])];
const skillOptions = [
  { id: 'java', label: 'Java' },
  { id: 'react', label: 'React' },
];

describe('filterProjects', () => {
  it('returns all projects with no filter', () => {
    expect(filterProjects(items, {}).map((x) => x.slug)).toEqual(['a', 'b', 'c']);
  });
  it('filters by category', () => {
    expect(filterProjects(items, { category: 'academic' }).map((x) => x.slug)).toEqual(['b', 'c']);
  });
  it('filters by skill', () => {
    expect(filterProjects(items, { skill: 'react' }).map((x) => x.slug)).toEqual(['a', 'c']);
  });
  it('combines category and skill', () => {
    expect(filterProjects(items, { category: 'academic', skill: 'react' }).map((x) => x.slug)).toEqual(['c']);
  });
});

describe('ProjectFilters', () => {
  const dict = getDictionary('en');

  it('narrows the list when a category is pressed and resets it', () => {
    render(<ProjectFilters items={items} skillOptions={skillOptions} dict={dict} />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Professional' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Professional' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('filters by technology from the select', () => {
    render(<ProjectFilters items={items} skillOptions={skillOptions} dict={dict} />);
    fireEvent.change(screen.getByLabelText('Technology'), { target: { value: 'java' } });
    expect(screen.getAllByRole('article').map((a) => a.textContent)).toEqual(['b', 'c']);
  });

  it('shows an empty state when nothing matches', () => {
    render(<ProjectFilters items={items} skillOptions={skillOptions} dict={dict} />);
    fireEvent.click(screen.getByRole('button', { name: 'Personal' }));
    expect(screen.getByText('No project matches this filter.')).toBeInTheDocument();
  });
});
