import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getDictionary } from '@/lib/dictionary';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { LOCALES, isLocale } from '@/lib/i18n';
import { href } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';
import { THEME_INIT_SCRIPT } from '@/lib/theme-script';

type Params = Promise<{ locale: string }>;

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.siteTitle, template: '%s | Sailor Vanbercy' },
    description: dict.meta.siteDescription,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/icon-32.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      ],
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: href(locale, 'home'),
      languages: Object.fromEntries(LOCALES.map((l) => [l, href(l, 'home')])),
    },
    openGraph: {
      type: 'website',
      siteName: 'Sailor Vanbercy',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: ['/projects/leadboy/01-pipeline.webp'],
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
        >
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 sm:px-8">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
