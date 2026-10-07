'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { switchLocalePath } from '@/lib/routes';

export function LocaleSwitch({ locale, label, text }: { locale: Locale; label: string; text: string }) {
  const target: Locale = locale === 'fr' ? 'en' : 'fr';
  return (
    <Link
      href={switchLocalePath(usePathname(), target)}
      hrefLang={target}
      aria-label={label}
      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium tracking-wide text-muted transition-colors hover:border-fg hover:text-fg"
    >
      {text}
    </Link>
  );
}
