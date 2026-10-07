import { SKILL_CATEGORIES } from './content/constants';
import type { Project, Skill, SkillCategory } from './content/schema';

export type ProjectRef = Pick<Project, 'slug' | 'title'>;

export interface SkillUsage {
  skill: Skill;
  projects: ProjectRef[];
}

export interface SkillGroup {
  category: SkillCategory;
  skills: SkillUsage[];
}

function collectUsage(projects: Project[]): Map<string, ProjectRef[]> {
  const usage = new Map<string, ProjectRef[]>();
  [...projects]
    .sort((a, b) => a.order - b.order)
    .forEach(({ slug, title, stack }) => {
      new Set(Object.values(stack).flat()).forEach((id) => {
        if (!id) return;
        usage.set(id, [...(usage.get(id) ?? []), { slug, title }]);
      });
    });
  return usage;
}

export function buildSkillsTree(projects: Project[], skills: Skill[]): SkillGroup[] {
  const usage = collectUsage(projects);
  return SKILL_CATEGORIES.map((category) => ({
    category,
    skills: skills
      .filter((skill) => skill.category === category && usage.has(skill.id))
      .map((skill) => ({ skill, projects: usage.get(skill.id) ?? [] }))
      .sort((a, b) => b.projects.length - a.projects.length || a.skill.label.localeCompare(b.skill.label)),
  })).filter((group) => group.skills.length > 0);
}
