import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { projectSchema, skillSchema, type Project, type Skill } from './schema';

function findDuplicates<T>(values: T[]): T[] {
  const seen = new Set<T>();
  const duplicates = new Set<T>();
  values.forEach((value) => (seen.has(value) ? duplicates.add(value) : seen.add(value)));
  return [...duplicates];
}

function validateSkills(skills: Skill[]): string[] {
  const errors = skills.flatMap((skill) => {
    const result = skillSchema.safeParse(skill);
    return result.success ? [] : [`skill ${JSON.stringify(skill)}: ${result.error.message}`];
  });
  return [...errors, ...findDuplicates(skills.map((s) => s.id)).map((id) => `duplicate skill id "${id}"`)];
}

function parseProjects(projects: unknown[]): { parsed: Project[]; errors: string[] } {
  const parsed: Project[] = [];
  const errors: string[] = [];
  projects.forEach((raw, index) => {
    const result = projectSchema.safeParse(raw);
    if (result.success) {
      parsed.push(result.data);
      return;
    }
    const label = (raw as { slug?: string } | null)?.slug ?? `#${index}`;
    result.error.issues.forEach((issue) => errors.push(`${label}: ${issue.path.join('.')} ${issue.message}`));
  });
  return { parsed, errors };
}

function checkReferences(project: Project, skillIds: Set<string>, publicDir: string): string[] {
  const unknownSkills = Object.values(project.stack)
    .flat()
    .filter((id): id is string => Boolean(id) && !skillIds.has(id as string))
    .map((id) => `${project.slug}: unknown skill "${id}"`);
  const missingImages = project.images
    .filter((image) => !existsSync(join(publicDir, image.src)))
    .map((image) => `${project.slug}: missing image ${image.src}`);
  return [...unknownSkills, ...missingImages];
}

export function validateContent(projects: unknown[], skills: Skill[], publicDir: string): string[] {
  const skillIds = new Set(skills.map((s) => s.id));
  const { parsed, errors: parseErrors } = parseProjects(projects);
  return [
    ...validateSkills(skills),
    ...parseErrors,
    ...findDuplicates(parsed.map((p) => p.slug)).map((slug) => `duplicate slug "${slug}"`),
    ...findDuplicates(parsed.map((p) => p.order)).map((order) => `duplicate order ${order}`),
    ...parsed.flatMap((project) => checkReferences(project, skillIds, publicDir)),
  ];
}
