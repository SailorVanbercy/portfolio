import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectCover, pickCover } from '@/components/project-cover';
import { ProjectGallery } from '@/components/project-gallery';
import { StackList } from '@/components/stack-list';
import { getAdjacent, getProject, getProjects } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import { LOCALES, isLocale } from '@/lib/i18n';
import { href, resolveSection, sectionSegment } from '@/lib/routes';
import { teamLabel } from '@/lib/team';

type Params = Promise<{ locale: string; section: string; slug: string }>;

export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((locale) =>
    getProjects().map((project) => ({ locale, section: sectionSegment(locale, 'projects'), slug: project.slug })),
  );

async function load(params: Params) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale) || resolveSection(locale, section) !== 'projects') return undefined;
  const project = getProject(slug);
  return project ? { locale, project } : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { locale, project } = data;
  return {
    title: project.title,
    description: project.pitch[locale],
    alternates: {
      canonical: href(locale, 'projects', project.slug),
      languages: Object.fromEntries(LOCALES.map((l) => [l, href(l, 'projects', project.slug)])),
    },
    openGraph: {
      title: project.title,
      description: project.pitch[locale],
      images: [`/${pickCover(project.images).src}`],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { locale, project } = data;
  const dict = getDictionary(locale);
  const { previous, next } = getAdjacent(project.slug);
  const facts = [
    { label: dict.project.period, value: project.period },
    { label: dict.project.team, value: teamLabel(project.team, dict) },
    { label: dict.project.role, value: project.role[locale] },
  ];

  return (
    <article className="pt-10 sm:pt-16">
      <header className="max-w-4xl">
        <p className="text-sm text-muted">
          <Link href={href(locale, 'projects')} className="hover:text-fg">
            {dict.nav.projects}
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{dict.projects.category[project.category]}</span>
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-xl text-muted">{project.pitch[locale]}</p>
      </header>

      <div className="mt-10">
        <ProjectCover image={pickCover(project.images)} locale={locale} priority sizes="(min-width: 1152px) 1088px, 100vw" />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <section aria-labelledby="context">
            <h2 id="context" className="font-display text-2xl font-semibold">{dict.project.context}</h2>
            <p className="mt-4 max-w-[68ch] text-lg leading-relaxed">{project.context[locale]}</p>
          </section>
          <section aria-labelledby="features">
            <h2 id="features" className="font-display text-2xl font-semibold">{dict.project.features}</h2>
            <ul className="mt-4 max-w-[68ch] space-y-3">
              {project.features[locale].map((feature) => (
                <li key={feature} className="border-l-2 border-accent pl-4 leading-relaxed">{feature}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="architecture">
            <h2 id="architecture" className="font-display text-2xl font-semibold">{dict.project.architecture}</h2>
            <p className="mt-4 max-w-[68ch] text-lg leading-relaxed">{project.architecture[locale]}</p>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <dl className="space-y-5 border-t border-fg pt-5 lg:sticky lg:top-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
            {project.links?.repo && (
              <div>
                <dt className="text-sm text-muted">{dict.project.repo}</dt>
                <dd className="mt-1">
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-4 hover:text-accent">
                    {project.links.repo.replace('https://', '')}
                  </a>
                </dd>
              </div>
            )}
            {project.links?.demo && (
              <div>
                <dt className="text-sm text-muted">{dict.project.demo}</dt>
                <dd className="mt-1">
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
                    {project.links.demo.replace('https://', '')}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>

      <section aria-labelledby="stack" className="mt-20">
        <h2 id="stack" className="mb-6 font-display text-2xl font-semibold">{dict.project.stack}</h2>
        <StackList project={project} locale={locale} />
      </section>

      <section aria-labelledby="gallery" className="mt-20">
        <h2 id="gallery" className="mb-6 font-display text-2xl font-semibold">{dict.project.gallery}</h2>
        <ProjectGallery
          images={project.images}
          locale={locale}
          labels={{
            open: dict.project.enlarge,
            close: dict.project.close,
            previous: dict.project.previous,
            next: dict.project.next,
            imageOf: dict.project.imageOf,
          }}
        />
      </section>

      <nav aria-label={dict.project.otherProjects} className="mt-24 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? (
          <Link href={href(locale, 'projects', previous.slug)} className="group">
            <span className="text-sm text-muted">{dict.project.previous}</span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={href(locale, 'projects', next.slug)} className="group sm:text-right">
            <span className="text-sm text-muted">{dict.project.next}</span>
            <span className="block font-display text-2xl font-semibold group-hover:text-accent">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
