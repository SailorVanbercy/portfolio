import { projects as rawProjects } from '@content/projects';
import { skills } from '@content/skills';
import type { Project, Skill } from './schema';

const SORTED_PROJECTS: Project[] = [...rawProjects].sort((a, b) => a.order - b.order);
const SKILLS: Skill[] = [...skills];
const SKILLS_BY_ID = new Map<string, Skill>(SKILLS.map((skill) => [skill.id, skill]));

export const getProjects = (): Project[] => SORTED_PROJECTS;
export const getProject = (slug: string): Project | undefined => SORTED_PROJECTS.find((p) => p.slug === slug);
export const getFeatured = (): Project[] => SORTED_PROJECTS.filter((p) => p.featured);
export const getSkills = (): Skill[] => SKILLS;

export function getSkill(id: string): Skill {
  const skill = SKILLS_BY_ID.get(id);
  if (!skill) throw new Error(`Unknown skill id "${id}"`);
  return skill;
}

export function getAdjacent(slug: string): { previous?: Project; next?: Project } {
  const index = SORTED_PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: SORTED_PROJECTS[index - 1], next: SORTED_PROJECTS[index + 1] };
}
