// Plain constants shared by server and client code. Kept free of Zod so client bundles stay small.
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

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type StackLayer = (typeof STACK_LAYERS)[number];
