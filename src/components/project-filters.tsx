'use client';

import { useMemo, useState } from 'react';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory, type Skill } from '@/lib/content/schema';
import { format, type Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { ProjectCard } from './project-card';

export interface ProjectFilter {
  category?: ProjectCategory;
  skill?: string;
}

export function filterProjects(projects: Project[], { category, skill }: ProjectFilter): Project[] {
  return projects.filter(
    (p) => (!category || p.category === category) && (!skill || Object.values(p.stack).flat().includes(skill)),
  );
}

const chipClass = (active: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
    active ? 'border-fg bg-fg text-bg' : 'border-border text-muted hover:border-fg hover:text-fg'
  }`;

export function ProjectFilters({
  projects,
  skills,
  locale,
  dict,
}: {
  projects: Project[];
  skills: Skill[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<ProjectFilter>({});
  const visible = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  const usedSkills = useMemo(() => {
    const used = new Set(projects.flatMap((p) => Object.values(p.stack).flat()));
    return skills.filter((s) => used.has(s.id)).sort((a, b) => a.label.localeCompare(b.label));
  }, [projects, skills]);
  const filtered = Boolean(filter.category || filter.skill);

  return (
    <>
      <div className="mb-12 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={dict.projects.filterByCategory}>
          <button
            type="button"
            aria-pressed={!filter.category}
            className={chipClass(!filter.category)}
            onClick={() => setFilter((f) => ({ ...f, category: undefined }))}
          >
            {dict.projects.filterAll}
          </button>
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter.category === category}
              className={chipClass(filter.category === category)}
              onClick={() => setFilter((f) => ({ ...f, category }))}
            >
              {dict.projects.category[category]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="skill-filter" className="text-sm text-muted">
            {dict.projects.filterByTech}
          </label>
          <select
            id="skill-filter"
            value={filter.skill ?? ''}
            onChange={(e) => setFilter((f) => ({ ...f, skill: e.target.value || undefined }))}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm"
          >
            <option value="">{dict.projects.filterAll}</option>
            {usedSkills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.label}
              </option>
            ))}
          </select>
          {filtered && (
            <button type="button" className="text-sm underline underline-offset-4" onClick={() => setFilter({})}>
              {dict.projects.clearFilter}
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {format(dict.projects.results, { n: visible.length })}
      </p>
      {visible.length === 0 ? (
        <p className="text-muted">{dict.projects.empty}</p>
      ) : (
        <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} variant="compact" />
          ))}
        </div>
      )}
    </>
  );
}
