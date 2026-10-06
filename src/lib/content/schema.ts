import { z } from 'zod';

export const SKILL_CATEGORIES = [
  'language',
  'frontend',
  'backend',
  'database',
  'orm',
  'security',
  'architecture',
  'devops',
  'testing',
  'ai',
  'tooling',
  'mobile',
  'desktop',
  'methodology',
] as const;

export const STACK_LAYERS = [
  'frontend',
  'backend',
  'database',
  'security',
  'architecture',
  'infrastructure',
  'testing',
  'tooling',
  'ai',
  'mobile',
  'desktop',
] as const;

export const PROJECT_CATEGORIES = ['professional', 'personal', 'academic'] as const;

const nonEmpty = z.string().trim().min(1);
const localized = <T extends z.ZodType>(inner: T) => z.strictObject({ fr: inner, en: inner });

export const skillSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: nonEmpty,
  category: z.enum(SKILL_CATEGORIES),
});

export const imageSchema = z.strictObject({
  src: z.string().regex(/^projects\/[a-z0-9-]+\/[\w.-]+\.(webp|png|jpg)$/),
  alt: localized(nonEmpty),
  viewport: z.enum(['desktop', 'mobile']),
});

export const projectSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: nonEmpty,
  pitch: localized(nonEmpty),
  category: z.enum(PROJECT_CATEGORIES),
  period: nonEmpty,
  team: z.strictObject({ solo: z.boolean(), size: z.number().int().min(2).optional() }),
  role: localized(nonEmpty),
  context: localized(nonEmpty),
  features: localized(z.array(nonEmpty).min(3)),
  architecture: localized(nonEmpty),
  stack: z.partialRecord(z.enum(STACK_LAYERS), z.array(nonEmpty).min(1)),
  images: z.array(imageSchema).min(1),
  links: z.strictObject({ repo: z.url().optional(), demo: z.url().optional() }).optional(),
  featured: z.boolean(),
  order: z.number().int().min(1),
});

export type Skill = z.infer<typeof skillSchema>;
export type SkillCategory = Skill['category'];
export type StackLayer = (typeof STACK_LAYERS)[number];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectImage = z.infer<typeof imageSchema>;
export type Project = z.infer<typeof projectSchema>;
