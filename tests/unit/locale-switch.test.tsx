import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/fr/projets/leadboy/' }));

import { LocaleSwitch } from '@/components/locale-switch';

describe('LocaleSwitch', () => {
  it('links to the same page in the other locale', () => {
    render(<LocaleSwitch locale="fr" label="Voir le site en anglais" text="EN" />);
    const link = screen.getByRole('link', { name: 'Voir le site en anglais' });
    expect(link).toHaveAttribute('href', '/en/projects/leadboy/');
    expect(link).toHaveAttribute('hreflang', 'en');
  });
});
