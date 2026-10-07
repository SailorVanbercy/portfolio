'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { switchLocalePath } from '@/lib/routes';

export function LocaleSwitch({ locale, label, text }: { locale: Locale; label: string; text: string }) {
  const target: Locale = locale === 'fr' ? 'en' : 'fr';
  // A full document navigation on purpose: switching locale changes the root layout (<html lang>),
  // which a client-side transition would remount without re-running the inline theme script
  // (dark mode would be lost and React warns about rendering <script> on the client).
  return (
    <a
      href={switchLocalePath(usePathname(), target)}
      hrefLang={target}
      aria-label={label}
      className="rounded-full border border-border px-2.5 py-1 text-xs font-medium tracking-wide text-muted transition-colors hover:border-fg hover:text-fg"
    >
      {text}
    </a>
  );
}
