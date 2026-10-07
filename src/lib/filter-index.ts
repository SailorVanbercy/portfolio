import type { Project, Skill } from './content/schema';

export interface SkillOption {
  id: string;
  label: string;
}

export const projectSkillIds = (project: Project): string[] => [...new Set(Object.values(project.stack).flat())];

export function skillOptionsFor(projects: Project[], skills: Skill[]): SkillOption[] {
  const used = new Set(projects.flatMap(projectSkillIds));
  return skills
    .filter((skill) => used.has(skill.id))
    .map(({ id, label }) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
