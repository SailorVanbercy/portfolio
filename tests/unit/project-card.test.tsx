import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/content/schema';

const project = {
  slug: 'smaatch',
  title: 'Smaatch',
  category: 'personal',
  period: '2026',
  pitch: { fr: 'Gestion de clubs', en: 'Club management' },
  stack: { frontend: ['nextjs', 'react', 'tailwindcss', 'typescript'], database: ['postgresql'] },
  images: [{ src: 'projects/smaatch/01-dashboard.webp', alt: { fr: 'Tableau de bord', en: 'Dashboard' }, viewport: 'desktop' }],
} as unknown as Project;

describe('ProjectCard', () => {
  it('links to the localized detail page and shows the localized pitch and cover', () => {
    render(<ProjectCard project={project} locale="en" variant="compact" />);
    expect(screen.getByRole('link', { name: /Smaatch/ })).toHaveAttribute('href', '/en/projects/smaatch/');
    expect(screen.getByText('Club management')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Dashboard' })).toHaveAttribute('src', '/projects/smaatch/01-dashboard.thumb.webp');
  });

  it('shows at most 4 skills', () => {
    const many = {
      ...project,
      stack: { frontend: ['nextjs', 'react', 'tailwindcss', 'typescript', 'javascript'] },
    } as unknown as Project;
    render(<ProjectCard project={many} locale="en" variant="compact" />);
    expect(screen.getAllByTestId('skill-chip')).toHaveLength(4);
  });

  it('prefers a desktop screenshot as cover when the first image is mobile', () => {
    const mixed = {
      ...project,
      images: [
        { src: 'projects/x/01-m.webp', alt: { fr: 'm', en: 'Mobile' }, viewport: 'mobile' },
        { src: 'projects/x/02-d.webp', alt: { fr: 'd', en: 'Desktop' }, viewport: 'desktop' },
      ],
    } as unknown as Project;
    render(<ProjectCard project={mixed} locale="en" variant="compact" />);
    expect(screen.getByRole('img', { name: 'Desktop' })).toBeInTheDocument();
  });
});

describe('ProjectCard heading level', () => {
  it('uses h3 by default and h2 when requested, keeping heading order valid per page', () => {
    const { unmount } = render(<ProjectCard project={project} locale="en" variant="compact" />);
    expect(screen.getByRole('heading', { level: 3, name: 'Smaatch' })).toBeInTheDocument();
    unmount();
    render(<ProjectCard project={project} locale="en" variant="compact" headingLevel="h2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Smaatch' })).toBeInTheDocument();
  });
});
