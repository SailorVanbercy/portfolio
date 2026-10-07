import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { href, type SectionKey } from '@/lib/routes';
import { LocaleSwitch } from './locale-switch';
import { ThemeToggle } from './theme-toggle';

const NAV_ITEMS: SectionKey[] = ['projects', 'about', 'contact'];

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-5 sm:px-8">
      <Link href={href(locale, 'home')} className="whitespace-nowrap font-display text-lg font-semibold tracking-tight">
        Sailor Vanbercy
      </Link>
      <nav aria-label={dict.nav.main} className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-6">
        <ul className="flex items-center gap-5 sm:gap-6">
          {NAV_ITEMS.map((key) => (
            <li key={key}>
              <Link href={href(locale, key)} className="whitespace-nowrap text-sm text-muted transition-colors hover:text-fg">
                {dict.nav[key]}
              </Link>
            </li>
          ))}
        </ul>
        <LocaleSwitch locale={locale} label={dict.locale.switchLabel} text={dict.locale.switchTo} />
        <ThemeToggle label={dict.theme.toggle} />
      </nav>
    </header>
  );
}
