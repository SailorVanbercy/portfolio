import type { Project, StackLayer } from '../../src/lib/content/schema';
import type { SkillId } from '../skills';

type ProjectInput = Omit<Project, 'stack'> & { stack: Partial<Record<StackLayer, SkillId[]>> };

// Typed helper: stack entries are checked against the skills registry at compile time.
export const defineProject = (project: ProjectInput): Project => project;
