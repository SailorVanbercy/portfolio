import type { Skill } from '../src/lib/content/schema';

// Single source of truth for every skill shown on the site.
// Only add a skill when a project evidences it (manifest, imports, config or docs).
export const skills = [
  { id: 'typescript', label: 'TypeScript', category: 'language' },
  { id: 'javascript', label: 'JavaScript', category: 'language' },
  { id: 'java', label: 'Java', category: 'language' },
  { id: 'nextjs', label: 'Next.js', category: 'frontend' },
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'tailwindcss', label: 'Tailwind CSS', category: 'frontend' },
  { id: 'supabase', label: 'Supabase', category: 'backend' },
  { id: 'postgresql', label: 'PostgreSQL', category: 'database' },
  { id: 'docker', label: 'Docker', category: 'devops' },
  { id: 'git', label: 'Git', category: 'tooling' },
] as const satisfies readonly Skill[];

export type SkillId = (typeof skills)[number]['id'];
