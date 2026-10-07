import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StackList } from '@/components/stack-list';
import type { Project } from '@/lib/content/schema';

const project = { stack: { frontend: ['nextjs', 'react'], database: ['postgresql'] } } as unknown as Project;

describe('StackList', () => {
  it('renders one group per non-empty layer with localized headings and skill labels', () => {
    render(<StackList project={project} locale="en" />);
    const frontend = screen.getByRole('group', { name: 'Frontend' });
    expect(within(frontend).getByText('Next.js')).toBeInTheDocument();
    expect(within(frontend).getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Database and ORM' })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Backend' })).not.toBeInTheDocument();
  });
});
