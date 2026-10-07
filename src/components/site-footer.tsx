import { profile } from '@content/profile';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
        </p>
        <ul className="flex gap-5">
          <li><a href={`mailto:${profile.contact.email}`} className="hover:text-fg">{dict.contact.email}</a></li>
          <li><a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a></li>
          <li><a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a></li>
          <li><a href={profile.contact.cv[locale]} download className="hover:text-fg">CV</a></li>
        </ul>
      </div>
    </footer>
  );
}
