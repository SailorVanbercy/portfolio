import type { Skill } from '../src/lib/content/schema';

// Single source of truth for every skill shown on the site.
// Only add a skill when a project evidences it (manifest, imports, config or docs).
export const skills = [
  // Languages
  { id: 'typescript', label: 'TypeScript', category: 'language' },
  { id: 'javascript', label: 'JavaScript', category: 'language' },
  { id: 'java', label: 'Java', category: 'language' },
  { id: 'sql', label: 'SQL', category: 'language' },

  // Frontend
  { id: 'nextjs', label: 'Next.js', category: 'frontend' },
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'tailwindcss', label: 'Tailwind CSS', category: 'frontend' },
  { id: 'radix-ui', label: 'Radix UI', category: 'frontend' },
  { id: 'next-intl', label: 'next-intl (i18n)', category: 'frontend' },
  { id: 'dnd-kit', label: 'dnd kit', category: 'frontend' },
  { id: 'recharts', label: 'Recharts', category: 'frontend' },
  { id: 'tanstack-query', label: 'TanStack Query', category: 'frontend' },
  { id: 'zustand', label: 'Zustand', category: 'frontend' },
  { id: 'jspdf', label: 'jsPDF', category: 'frontend' },

  // Backend
  { id: 'nodejs', label: 'Node.js', category: 'backend' },
  { id: 'express', label: 'Express', category: 'backend' },
  { id: 'nextjs-api-routes', label: 'Next.js Route Handlers', category: 'backend' },
  { id: 'supabase', label: 'Supabase', category: 'backend' },
  { id: 'websocket', label: 'WebSocket', category: 'backend' },
  { id: 'baileys', label: 'Baileys (WhatsApp Web)', category: 'backend' },
  { id: 'cheerio', label: 'Cheerio', category: 'backend' },
  { id: 'pusher', label: 'Pusher', category: 'backend' },

  // Databases
  { id: 'postgresql', label: 'PostgreSQL', category: 'database' },
  { id: 'sqlite', label: 'SQLite', category: 'database' },
  { id: 'supabase-client', label: 'Supabase JS client', category: 'orm' },
  { id: 'prisma', label: 'Prisma', category: 'orm' },
  { id: 'drizzle', label: 'Drizzle ORM', category: 'orm' },

  // Security
  { id: 'jwt', label: 'JWT', category: 'security' },
  { id: 'zod', label: 'Zod', category: 'security' },
  { id: 'rate-limiting', label: 'Rate limiting', category: 'security' },
  { id: 'cors', label: 'CORS', category: 'security' },
  { id: 'security-headers', label: 'CSP / security headers', category: 'security' },
  { id: 'row-level-security', label: 'Row Level Security (RLS)', category: 'security' },
  { id: 'oauth', label: 'OAuth 2.0', category: 'security' },
  { id: 'nextauth', label: 'NextAuth.js', category: 'security' },
  { id: 'bcrypt', label: 'bcrypt', category: 'security' },
  { id: 'rbac', label: 'RBAC', category: 'security' },

  // Architecture
  { id: 'rest-api', label: 'API REST', category: 'architecture' },
  { id: 'circuit-breaker', label: 'Circuit breaker', category: 'architecture' },
  { id: 'web-scraping', label: 'Web scraping', category: 'architecture' },
  { id: 'i18n', label: 'i18n', category: 'architecture' },
  { id: 'multi-tenant', label: 'Multi-tenant', category: 'architecture' },

  // DevOps
  { id: 'docker', label: 'Docker', category: 'devops' },
  { id: 'docker-compose', label: 'Docker Compose', category: 'devops' },
  { id: 'traefik', label: 'Traefik', category: 'devops' },
  { id: 'linux-vps', label: 'Linux / VPS', category: 'devops' },
  { id: 'nginx', label: 'Nginx', category: 'devops' },
  { id: 'pm2', label: 'PM2', category: 'devops' },

  // Testing
  { id: 'vitest', label: 'Vitest', category: 'testing' },
  { id: 'playwright', label: 'Playwright', category: 'testing' },
  { id: 'jest', label: 'Jest', category: 'testing' },
  { id: 'testing-library', label: 'Testing Library', category: 'testing' },

  // AI
  { id: 'claude-api', label: 'Claude API (Anthropic)', category: 'ai' },
  { id: 'grok-api', label: 'Grok API (xAI)', category: 'ai' },
  { id: 'llamaindex', label: 'LlamaIndex (RAG)', category: 'ai' },
  { id: 'prompt-engineering', label: 'Prompt engineering', category: 'ai' },
  { id: 'ai-agents', label: 'Agentic AI', category: 'ai' },
  { id: 'claude-code', label: 'Claude Code', category: 'ai' },

  // Tooling
  { id: 'git', label: 'Git', category: 'tooling' },
  { id: 'eslint', label: 'ESLint', category: 'tooling' },
  { id: 'husky', label: 'Husky / lint-staged', category: 'tooling' },

  // Mobile
  { id: 'react-native', label: 'React Native', category: 'mobile' },
  { id: 'expo', label: 'Expo', category: 'mobile' },
  { id: 'expo-router', label: 'Expo Router', category: 'mobile' },
  { id: 'nativewind', label: 'NativeWind', category: 'mobile' },
  { id: 'push-notifications', label: 'Push notifications', category: 'mobile' },
] as const satisfies readonly Skill[];

export type SkillId = (typeof skills)[number]['id'];
