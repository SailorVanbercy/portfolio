import { join } from 'node:path';
import { projects } from '../content/projects';
import { skills } from '../content/skills';
import { validateContent } from '../src/lib/content/validate';

const errors = validateContent(projects, [...skills], join(process.cwd(), 'public'));

if (errors.length > 0) {
  console.error(`Content validation failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Content valid: ${projects.length} projects, ${skills.length} skills.`);
