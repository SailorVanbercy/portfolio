import { profile } from '@content/profile';
import { getProjects, getSkills } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { projectSkillIds, skillOptionsFor } from '@/lib/filter-index';
import { buildSkillsTree } from '@/lib/skills-tree';
import { ProjectCard } from './project-card';
import { ProjectFilters } from './project-filters';
import { SectionHeading } from './section-heading';
import { SkillsTree } from './skills-tree';

const ABOVE_THE_FOLD_CARDS = 2;

export function ProjectsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const projects = getProjects();
  return (
    <section className="pt-12 sm:pt-20">
      <SectionHeading as="h1" title={dict.projects.title} intro={dict.projects.intro} />
      <ProjectFilters
        items={projects.map((project, i) => ({
          slug: project.slug,
          category: project.category,
          skills: projectSkillIds(project),
          card: <ProjectCard project={project} locale={locale} variant="compact" headingLevel="h2" priority={i < ABOVE_THE_FOLD_CARDS} />,
        }))}
        skillOptions={skillOptionsFor(projects, getSkills())}
        dict={dict}
      />
    </section>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="pt-12 sm:pt-20">
      <SectionHeading as="h1" title={dict.about.title} intro={profile.title[locale]} />

      <section aria-labelledby="profile" className="grid gap-8 md:grid-cols-12">
        <h2 id="profile" className="font-display text-2xl font-semibold md:col-span-4">
          {dict.about.profile}
        </h2>
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed md:col-span-8">
          {profile.bio[locale].map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="journey" className="mt-24 grid gap-8 md:grid-cols-12">
        <h2 id="journey" className="font-display text-2xl font-semibold md:col-span-4">
          {dict.about.journey}
        </h2>
        <ol className="md:col-span-8">
          {profile.timeline.map((item) => (
            <li key={item.period} className="grid gap-1 border-t border-border py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <p className="text-sm tabular-nums text-muted">{item.period}</p>
              <div>
                <h3 className="font-medium">{item.title[locale]}</h3>
                <p className="mt-1 text-muted">{item.text[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills" className="mt-24">
        <h2 id="skills" className="font-display text-2xl font-semibold sm:text-3xl">
          {dict.about.skills}
        </h2>
        <p className="mb-10 mt-3 max-w-2xl text-muted">{dict.about.skillsIntro}</p>
        <SkillsTree groups={buildSkillsTree(getProjects(), getSkills())} locale={locale} dict={dict} />
      </section>
    </div>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    { label: dict.contact.email, value: profile.contact.email, href: `mailto:${profile.contact.email}`, external: false },
    { label: dict.contact.phone, value: profile.contact.phone, href: profile.contact.phoneHref, external: false },
    { label: dict.contact.github, value: profile.contact.githubHandle, href: profile.contact.github, external: true },
    { label: 'LinkedIn', value: profile.contact.linkedinHandle, href: profile.contact.linkedin, external: true },
  ];
  return (
    <section className="pt-12 sm:pt-20">
      <SectionHeading as="h1" title={dict.contact.title} intro={dict.contact.intro} />
      <ul className="border-t border-fg">
        {items.map((item) => (
          <li key={item.label} className="border-b border-border">
            <a
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col gap-1 py-6 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="text-sm text-muted">{item.label}</span>
              <span className="font-display text-2xl font-medium sm:text-3xl">{item.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={profile.contact.cv[locale]}
        download
        className="mt-10 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        {dict.home.downloadCv}
      </a>
    </section>
  );
}
