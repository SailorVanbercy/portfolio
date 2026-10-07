import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profile } from '@content/profile';
import { ProjectCard } from '@/components/project-card';
import { getFeatured, getProjects } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import { isLocale } from '@/lib/i18n';
import { href } from '@/lib/routes';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = getFeatured();
  const others = getProjects().filter((project) => !project.featured);

  return (
    <>
      <section className="hero-reveal pb-20 pt-14 sm:pb-28 sm:pt-24">
        <p className="text-lg text-muted">
          {profile.title[locale]}, {profile.location[locale]}
        </p>
        <h1 className="mt-4 font-display text-[clamp(3.25rem,12vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.035em]">
          Sailor
          <br />
          Vanbercy
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed sm:text-2xl">{profile.headline[locale]}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={profile.contact.cv[locale]}
            download
            className="rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {dict.home.downloadCv}
          </a>
          <Link
            href={href(locale, 'contact')}
            className="rounded-full border border-fg px-6 py-3 font-medium transition-colors hover:bg-fg hover:text-bg"
          >
            {dict.home.contactMe}
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured" className="border-t border-fg pt-10">
        <h2 id="featured" className="mb-12 font-display text-2xl font-semibold sm:text-3xl">
          {dict.home.featured}
        </h2>
        <div className="space-y-20 sm:space-y-28">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} locale={locale} variant="large" priority={i === 0} />
          ))}
        </div>
      </section>

      <section aria-labelledby="others" className="mt-28 border-t border-fg pt-10">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="others" className="font-display text-2xl font-semibold sm:text-3xl">
            {dict.home.others}
          </h2>
          <Link href={href(locale, 'projects')} className="underline underline-offset-4 hover:text-accent">
            {dict.home.allProjects}
          </Link>
        </div>
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} variant="compact" />
          ))}
        </div>
      </section>
    </>
  );
}
