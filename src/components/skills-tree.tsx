import Link from 'next/link';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { href } from '@/lib/routes';
import type { SkillGroup } from '@/lib/skills-tree';

export function SkillsTree({ groups, locale, dict }: { groups: SkillGroup[]; locale: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
      {groups.map((group) => (
        <section key={group.category} aria-labelledby={`skills-${group.category}`}>
          <h3 id={`skills-${group.category}`} className="border-b border-fg pb-2 font-display text-xl font-semibold">
            {dict.skillCategory[group.category]}
          </h3>
          <ul>
            {group.skills.map(({ skill, projects }) => (
              <li key={skill.id} className="border-b border-border">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-2.5 [&::-webkit-details-marker]:hidden">
                    <span>{skill.label}</span>
                    <span className="text-sm tabular-nums text-muted">{projects.length}</span>
                  </summary>
                  <p className="pb-3 text-sm text-muted">
                    {dict.about.usedIn}{' '}
                    {projects.map((project, i) => (
                      <span key={project.slug}>
                        {i > 0 && ', '}
                        <Link href={href(locale, 'projects', project.slug)} className="text-fg underline underline-offset-2 hover:text-accent">
                          {project.title}
                        </Link>
                      </span>
                    ))}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
