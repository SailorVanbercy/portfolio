import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './i18n';

export type RouteKey = 'home' | 'projects' | 'about' | 'contact';
export type SectionKey = Exclude<RouteKey, 'home'>;

const SECTION_SEGMENTS: Record<SectionKey, Record<Locale, string>> = {
  projects: { fr: 'projets', en: 'projects' },
  about: { fr: 'a-propos', en: 'about' },
  contact: { fr: 'contact', en: 'contact' },
};

const SECTION_KEYS = Object.keys(SECTION_SEGMENTS) as SectionKey[];

export function href(locale: Locale, key: RouteKey, slug?: string): string {
  if (key === 'home') return `/${locale}/`;
  const base = `/${locale}/${SECTION_SEGMENTS[key][locale]}/`;
  return slug ? `${base}${slug}/` : base;
}

export function sectionSegment(locale: Locale, key: SectionKey): string {
  return SECTION_SEGMENTS[key][locale];
}

export function resolveSection(locale: Locale, segment: string): SectionKey | undefined {
  return SECTION_KEYS.find((key) => SECTION_SEGMENTS[key][locale] === segment);
}

export function sectionParams(): { locale: Locale; section: string }[] {
  return LOCALES.flatMap((locale) =>
    SECTION_KEYS.map((key) => ({ locale, section: SECTION_SEGMENTS[key][locale] })),
  );
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const [localeSegment, section, slug] = pathname.split('/').filter(Boolean);
  const source = localeSegment && isLocale(localeSegment) ? localeSegment : DEFAULT_LOCALE;
  if (!section) return href(target, 'home');
  const key = resolveSection(source, section);
  if (!key) return href(target, 'home');
  return href(target, key, key === 'projects' ? slug : undefined);
}
