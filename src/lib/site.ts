import { getProjects } from './content/queries';
import { LOCALES } from './i18n';
import { href } from './routes';

export const SITE_URL = 'https://portfolio-sailorvanbercy.vercel.app';

export function allLocalizedPaths(): string[] {
  return LOCALES.flatMap((locale) => [
    href(locale, 'home'),
    href(locale, 'projects'),
    href(locale, 'about'),
    href(locale, 'contact'),
    ...getProjects().map((project) => href(locale, 'projects', project.slug)),
  ]);
}
