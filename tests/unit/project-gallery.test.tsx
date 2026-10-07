import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectGallery } from '@/components/project-gallery';
import type { ProjectImage } from '@/lib/content/schema';

const img = (n: number, viewport: 'desktop' | 'mobile' = 'desktop'): ProjectImage => ({
  src: `projects/demo/0${n}-x.webp`,
  alt: { fr: `Image ${n}`, en: `Shot ${n}` },
  viewport,
});
const labels = { open: 'Enlarge', close: 'Close', previous: 'Previous', next: 'Next', imageOf: 'Image {i} of {n}' };

describe('ProjectGallery', () => {
  it('opens the lightbox and navigates with arrow keys, wrapping around', () => {
    render(<ProjectGallery images={[img(1), img(2), img(3)]} locale="en" labels={labels} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Shot 1' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('Image 1 of 3');
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog).toHaveTextContent('Image 2 of 3');
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(dialog).toHaveTextContent('Image 3 of 3');
  });

  it('closes with the close button', () => {
    render(<ProjectGallery images={[img(1), img(2)]} locale="en" labels={labels} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Shot 2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides previous/next controls for a single image', () => {
    render(<ProjectGallery images={[img(1, 'mobile')]} locale="en" labels={labels} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enlarge: Shot 1' }));
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('renders mobile screenshots with object-contain to avoid stretching', () => {
    render(<ProjectGallery images={[img(1, 'mobile')]} locale="en" labels={labels} />);
    expect(screen.getByRole('img', { name: 'Shot 1' })).toHaveClass('object-contain');
  });
});
