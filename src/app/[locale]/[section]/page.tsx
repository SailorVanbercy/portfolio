import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutView, ContactView, ProjectsView } from '@/components/section-views';
import { getDictionary } from '@/lib/dictionary';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n';
import { href, resolveSection, sectionParams, type SectionKey } from '@/lib/routes';

type Params = Promise<{ locale: string; section: string }>;

const VIEWS: Record<SectionKey, (props: { locale: Locale }) => React.ReactNode> = {
  projects: ProjectsView,
  about: AboutView,
  contact: ContactView,
};

export const dynamicParams = false;
export const generateStaticParams = () => sectionParams();

async function resolve(params: Params): Promise<{ locale: Locale; key: SectionKey } | undefined> {
  const { locale, section } = await params;
  if (!isLocale(locale)) return undefined;
  const key = resolveSection(locale, section);
  return key ? { locale, key } : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const route = await resolve(params);
  if (!route) return {};
  const dict = getDictionary(route.locale);
  const titles: Record<SectionKey, string> = {
    projects: dict.projects.title,
    about: dict.about.title,
    contact: dict.contact.title,
  };
  return {
    title: titles[route.key],
    alternates: {
      canonical: href(route.locale, route.key),
      languages: Object.fromEntries(LOCALES.map((l) => [l, href(l, route.key)])),
    },
  };
}

export default async function SectionPage({ params }: { params: Params }) {
  const route = await resolve(params);
  if (!route) notFound();
  const View = VIEWS[route.key];
  return <View locale={route.locale} />;
}
