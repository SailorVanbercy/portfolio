import Link from 'next/link';
import type { Project } from '@/lib/content/schema';
import { getSkill } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { href } from '@/lib/routes';
import { ProjectCover, pickCover } from './project-cover';

const MAX_CARD_SKILLS = 4;

export function ProjectCard({
  project,
  locale,
  variant,
  priority = false,
  headingLevel: Heading = 'h3',
}: {
  project: Project;
  locale: Locale;
  variant: 'large' | 'compact';
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const dict = getDictionary(locale);
  const skills = [...new Set(Object.values(project.stack).flat())].slice(0, MAX_CARD_SKILLS);
  const large = variant === 'large';
  return (
    // One accessible link (the title), stretched over the whole card with ::after.
    <article className={`group relative ${large ? 'grid items-start gap-6 md:grid-cols-12 md:gap-10' : ''}`}>
      <div className={`transition-opacity group-hover:opacity-90 ${large ? 'md:col-span-7' : ''}`}>
        <ProjectCover
          image={pickCover(project.images)}
          locale={locale}
          priority={priority}
          thumb
          sizes={large ? '(min-width: 768px) 640px, 100vw' : '(min-width: 640px) 50vw, 100vw'}
        />
      </div>
      <div className={large ? 'md:col-span-5 md:pt-2' : 'mt-4'}>
        <p className="flex gap-3 text-sm text-muted">
          <span>{dict.projects.category[project.category]}</span>
          <span>{project.period}</span>
        </p>
        <Heading className={`mt-1 font-display font-semibold tracking-tight ${large ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>
          <Link
            href={href(locale, 'projects', project.slug)}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {project.title}
          </Link>
        </Heading>
        <p className={`mt-2 text-muted ${large ? 'text-lg' : ''}`}>{project.pitch[locale]}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {skills.map((id) => (
            <li key={id} data-testid="skill-chip" className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
              {getSkill(id).label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
