import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { THEME_INIT_SCRIPT } from '@/lib/theme-script';

export const metadata: Metadata = {
  title: 'Page introuvable | Sailor Vanbercy',
  robots: { index: false },
};

// Used for every unmatched URL, including ones outside a locale (e.g. /de/), hence bilingual.
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <main className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
          <p className="text-muted">404</p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight sm:text-7xl">Page introuvable</h1>
          <p className="mt-3 text-xl text-muted" lang="en">
            Page not found
          </p>
          <ul className="mt-10 flex flex-wrap gap-3">
            <li>
              <Link href="/fr/" className="inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-fg">
                Retour à l’accueil
              </Link>
            </li>
            <li>
              <Link href="/en/" hrefLang="en" lang="en" className="inline-block rounded-full border border-fg px-6 py-3 font-medium">
                Back to home
              </Link>
            </li>
          </ul>
        </main>
      </body>
    </html>
  );
}
