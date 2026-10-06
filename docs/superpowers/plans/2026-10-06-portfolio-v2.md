# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Angular portfolio with a bilingual (FR/EN) static Next.js site presenting 13 projects with real screenshots, detailed write-ups and a skills tree derived from project data, positioning Sailor Vanbercy as a Junior Full-Stack Developer.

**Architecture:** Next.js App Router with static export. Content lives in typed TypeScript files (`content/`) validated by Zod and by a `validateContent()` function shared by tests and a `prebuild` script. Locale is the first path segment; localized section segments (`projets`/`projects`) are resolved through one route dictionary. Screenshots are produced by running each source project from a **scratchpad copy** and driving it with Playwright (web) or a PowerShell window capture (desktop).

**Tech Stack:** Next.js (latest stable), React, TypeScript strict, Tailwind CSS v4, shadcn/ui (Dialog, Badge), Zod, Vitest + Testing Library, Playwright, sharp (screenshot conversion), Docker (Supabase local, PHP/MySQL, .NET, Flutter).

**Spec:** `docs/superpowers/specs/2026-10-06-portfolio-v2-design.md`

## Global Constraints

- Source projects are read-only: never edit, commit, or create files inside a source project directory. Every project is copied to `$SCRATCH/run/<slug>` (excluding `node_modules`, `.next`, `.git`, `build`, `dist`, `.env*`) and run from there.
- Never read, print or copy `.env*` files. Never open `C:\MonPc\mcdo\*` or `HELHA\Bac 2\Q2\TI\Projet TM\$host*.txt`.
- No real personal data in screenshots: Supabase/DB-backed apps run against local databases seeded with fictional data written in `$SCRATCH`.
- No emojis anywhere (UI, code, comments, commits, content).
- Code, comments, technical docs: English. Site content: FR (default) + EN, both mandatory and non-empty.
- Profile title: "Développeur Full-Stack Junior" / "Junior Full-Stack Developer". Mention the Indigo Studio internship and AI tooling (Claude Code) integrated into the workflow. **No mention of the master's degree.**
- Skills include frameworks, libraries, ORMs, security, patterns, DevOps, testing, tooling, AI, methodology — only when evidenced in the project (manifest, imports, config, docs).
- Featured projects (exactly 3): `leadboy`, `smaatch`, `tetris-formation`.
- Commits: Conventional Commits, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Work on branch `feat/portfolio-v2`. Merge to `main` / deploy only on explicit user approval.
- Lighthouse Performance and Accessibility >= 95 on `/fr/` and `/fr/projets/leadboy/`.

`$SCRATCH` = `C:\Users\sailo\AppData\Local\Temp\claude\c--Users-sailo-OneDrive---Haute-Ecole-Louvain-en-Hainaut-HELHA-Portfolio\93167dea-7ab9-4cc9-92af-3e65d5a02750\scratchpad`
`$REPO` = `C:\Users\sailo\OneDrive - Haute Ecole Louvain en Hainaut\HELHA\Portfolio\portfolio`
`$HELHA` = `C:\Users\sailo\OneDrive - Haute Ecole Louvain en Hainaut\HELHA`

## Review Focus

1. Switching language on a project detail page must land on the same project in the other language (`/fr/projets/leadboy/` -> `/en/projects/leadboy/`), not on the home page. Pinned in Task 2 (unit) and Task 12 (e2e).
2. An unknown slug or a section segment from the other locale (`/fr/projects/`, `/en/projets/x/`) must produce the 404 page, not a crash or a wrong page. Pinned in Task 2 (unit) and Task 12 (e2e).
3. A project with a single screenshot, or only mobile screenshots, must render the gallery without prev/next controls and without stretching portrait images. Pinned in Task 10.
4. A content file with a missing EN translation, unknown skill id, duplicate slug or missing image file must fail `npm run build`, not ship silently. Pinned in Task 3.
5. First paint in dark mode must not flash the light theme, and motion must be disabled under `prefers-reduced-motion`. Pinned in Task 7 (unit on the init script) and Task 12 (e2e).

---

## File Structure

```
portfolio/
  next.config.ts                 # output: 'export', trailingSlash, images.unoptimized
  vercel.json                    # '/' -> '/fr/' redirect, no SPA rewrite
  vitest.config.ts
  playwright.config.ts
  scripts/validate-content.ts    # prebuild: runs validateContent(), exits 1 on errors
  content/
    skills.ts                    # skills registry (single source of truth), exports SkillId
    profile.ts                   # bio, timeline, contact (FR/EN)
    projects/
      index.ts                   # ordered list of all projects
      <slug>.ts                  # one file per project (13)
  src/
    lib/
      i18n.ts                    # LOCALES, Locale, isLocale
      dictionary.ts              # UI strings FR/EN
      routes.ts                  # RouteKey, href(), resolveSection(), switchLocalePath()
      content/
        schema.ts                # Zod schemas + inferred types
        validate.ts              # validateContent(projects, skills, publicDir): string[]
        queries.ts               # getProjects(), getProject(), getFeatured(), getSkill()
      skills-tree.ts             # buildSkillsTree()
      theme-script.ts            # inline no-flash theme script string
    app/
      (root)/layout.tsx          # minimal root layout for '/'
      (root)/page.tsx            # redirect page to /fr/ (meta refresh + language hint)
      [locale]/layout.tsx        # html lang, fonts, header, footer
      [locale]/page.tsx          # home
      [locale]/not-found.tsx
      [locale]/[section]/page.tsx          # projects list | about | contact
      [locale]/[section]/[slug]/page.tsx   # project detail
      sitemap.ts
      globals.css
    components/
      site-header.tsx  site-footer.tsx  locale-switch.tsx  theme-toggle.tsx
      project-card.tsx  project-filters.tsx  project-gallery.tsx  stack-list.tsx
      skills-tree.tsx  timeline.tsx  section-heading.tsx
      ui/                        # shadcn generated (dialog, badge)
  public/
    cv-vanbercy-sailor.pdf favicon.ico apple-touch-icon.png logo-mark.png
    projects/<slug>/NN-<name>.webp
  tests/unit/*.test.ts(x)
  tests/e2e/*.spec.ts
```

Removed: `src/app/**` (Angular), `angular.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `.angular/`, `dist/`, `.editorconfig` (kept if harmless), Angular deps.

---

## Phase 1 — Foundation

### Task 1: Replace Angular with a Next.js scaffold

**Files:**
- Delete: `src/`, `angular.json`, `tsconfig.app.json`, `tsconfig.spec.json`, `.angular/`, `dist/`, `node_modules/`, `package-lock.json`
- Create: Next.js scaffold files at repo root (from scratchpad generation)
- Modify: `.gitignore`, `vercel.json`, `CLAUDE.md`
- Keep: `public/*` (CV, favicon, logos, `projects/leadboy/*.png`), `docs/`

**Interfaces:**
- Produces: working `npm run dev`, `npm run build` (static export to `out/`), `npm test` (Vitest), `npm run test:e2e` (Playwright).

- [ ] **Step 1: Generate the scaffold in the scratchpad**

```bash
cd "$SCRATCH" && npx create-next-app@latest next-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack --skip-install
```

- [ ] **Step 2: Remove Angular files from the repo**

```bash
cd "$REPO" && git rm -r -q src angular.json tsconfig.app.json tsconfig.spec.json package.json package-lock.json README.md && rm -rf .angular dist node_modules
```

- [ ] **Step 3: Copy the scaffold into the repo (without overwriting `public/` assets)**

```bash
cd "$SCRATCH/next-scaffold" && cp -r src package.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs next-env.d.ts "$REPO"/ && cp -n public/* "$REPO/public/" 2>/dev/null; true
```

Delete the scaffold's sample SVGs from `$REPO/public` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) and `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/favicon.ico` (replaced in Task 6).

- [ ] **Step 4: Install dependencies**

```bash
cd "$REPO" && npm install && npm install zod clsx tailwind-merge && npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test tsx serve vite-tsconfig-paths
```

- [ ] **Step 5: Configure static export** — write `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 6: Scripts** — set `package.json` scripts:

```json
{
  "dev": "next dev",
  "prebuild": "tsx scripts/validate-content.ts",
  "build": "next build",
  "start": "serve out -l 3100",
  "lint": "eslint .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

Create a temporary `scripts/validate-content.ts` containing `console.log('content validation not yet implemented');` (replaced in Task 3).

- [ ] **Step 7: Vitest config** — `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/unit/setup.ts'],
  },
});
```

`tests/unit/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add `"@content/*": ["./content/*"]` to `compilerOptions.paths` in `tsconfig.json` next to `"@/*": ["./src/*"]`.

- [ ] **Step 8: Playwright config** — `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

export default defineConfig({
  testDir: 'tests/e2e',
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: { command: 'npm run build && npm run start', port: PORT, reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
```

```bash
npx playwright install chromium
```

- [ ] **Step 9: Update `.gitignore`** — replace the Angular section with:

```
/node_modules
/.next
/out
/coverage
/test-results
/playwright-report
next-env.d.ts
*.tsbuildinfo
.env*
```

Keep the IDE section.

- [ ] **Step 10: `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "redirects": [{ "source": "/", "destination": "/fr/", "permanent": false }]
}
```

- [ ] **Step 11: Smoke test** — create placeholder `src/app/[locale]/layout.tsx` and `page.tsx` rendering `<h1>ok</h1>` with `generateStaticParams` returning `[{locale:'fr'},{locale:'en'}]`, then:

Run: `npm run build`
Expected: build succeeds, `out/fr/index.html` and `out/en/index.html` exist.

- [ ] **Step 12: Rewrite `CLAUDE.md`** with the new stack, commands, structure (File Structure section above), conventions (content in `content/`, add a project = add file + register in `content/projects/index.ts` + images in `public/projects/<slug>/`), and the rule "no emojis".

- [ ] **Step 13: Commit**

```bash
git add -A && git commit -m "chore: replace Angular app with Next.js static export scaffold

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: i18n and route dictionary

**Files:**
- Create: `src/lib/i18n.ts`, `src/lib/routes.ts`, `src/lib/dictionary.ts`
- Test: `tests/unit/routes.test.ts`, `tests/unit/dictionary.test.ts`

**Interfaces:**
- Produces:
  - `LOCALES: readonly ['fr','en']`, `type Locale`, `DEFAULT_LOCALE: 'fr'`, `isLocale(v: string): v is Locale`
  - `type RouteKey = 'home' | 'projects' | 'about' | 'contact'`
  - `href(locale: Locale, key: RouteKey, slug?: string): string` (always trailing slash)
  - `resolveSection(locale: Locale, segment: string): Exclude<RouteKey,'home'> | undefined`
  - `sectionParams(): { locale: Locale; section: string }[]`
  - `switchLocalePath(pathname: string, target: Locale): string`
  - `getDictionary(locale: Locale): Dictionary`

- [ ] **Step 1: Write the failing tests** — `tests/unit/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { href, resolveSection, sectionParams, switchLocalePath } from '@/lib/routes';

describe('href', () => {
  it('builds localized paths with trailing slash', () => {
    expect(href('fr', 'home')).toBe('/fr/');
    expect(href('fr', 'projects')).toBe('/fr/projets/');
    expect(href('en', 'projects', 'leadboy')).toBe('/en/projects/leadboy/');
    expect(href('fr', 'about')).toBe('/fr/a-propos/');
    expect(href('en', 'contact')).toBe('/en/contact/');
  });
});

describe('resolveSection', () => {
  it('resolves a segment only within its own locale', () => {
    expect(resolveSection('fr', 'projets')).toBe('projects');
    expect(resolveSection('en', 'projects')).toBe('projects');
    expect(resolveSection('fr', 'projects')).toBeUndefined();
    expect(resolveSection('en', 'a-propos')).toBeUndefined();
    expect(resolveSection('en', 'unknown')).toBeUndefined();
  });
});

describe('sectionParams', () => {
  it('lists every section for every locale exactly once', () => {
    const params = sectionParams();
    expect(params).toHaveLength(6);
    expect(params).toContainEqual({ locale: 'fr', section: 'a-propos' });
    expect(params).toContainEqual({ locale: 'en', section: 'about' });
  });
});

describe('switchLocalePath', () => {
  it('keeps the same page across locales', () => {
    expect(switchLocalePath('/fr/', 'en')).toBe('/en/');
    expect(switchLocalePath('/fr/a-propos/', 'en')).toBe('/en/about/');
    expect(switchLocalePath('/fr/projets/leadboy/', 'en')).toBe('/en/projects/leadboy/');
    expect(switchLocalePath('/en/projects/smaatch', 'fr')).toBe('/fr/projets/smaatch/');
  });

  it('falls back to the target home for unknown paths', () => {
    expect(switchLocalePath('/fr/nope/', 'en')).toBe('/en/');
    expect(switchLocalePath('/', 'en')).toBe('/en/');
  });
});
```

`tests/unit/dictionary.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getDictionary } from '@/lib/dictionary';

const flatten = (obj: object, prefix = ''): string[] =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

describe('dictionary', () => {
  it('has the same keys in FR and EN, all non-empty', () => {
    const fr = getDictionary('fr');
    const en = getDictionary('en');
    expect(flatten(fr).sort()).toEqual(flatten(en).sort());
    for (const dict of [fr, en]) {
      flatten(dict).forEach((key) => {
        const value = key.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown>)[k], dict);
        expect(String(value).length, key).toBeGreaterThan(0);
      });
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/routes.test.ts tests/unit/dictionary.test.ts`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement `src/lib/i18n.ts`**

```ts
export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
```

- [ ] **Step 4: Implement `src/lib/routes.ts`**

```ts
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './i18n';

export type RouteKey = 'home' | 'projects' | 'about' | 'contact';
type SectionKey = Exclude<RouteKey, 'home'>;

const SECTION_SEGMENTS: Record<SectionKey, Record<Locale, string>> = {
  projects: { fr: 'projets', en: 'projects' },
  about: { fr: 'a-propos', en: 'about' },
  contact: { fr: 'contact', en: 'contact' },
};

const SECTION_KEYS = Object.keys(SECTION_SEGMENTS) as SectionKey[];

export function href(locale: Locale, key: RouteKey, slug?: string): string {
  if (key === 'home') return `/${locale}/`;
  const base = `/${locale}/${SECTION_SEGMENTS[key][locale]}/`;
  return slug ? `${base}${slug}/` : base;
}

export function resolveSection(locale: Locale, segment: string): SectionKey | undefined {
  return SECTION_KEYS.find((key) => SECTION_SEGMENTS[key][locale] === segment);
}

export function sectionParams(): { locale: Locale; section: string }[] {
  return LOCALES.flatMap((locale) =>
    SECTION_KEYS.map((key) => ({ locale, section: SECTION_SEGMENTS[key][locale] })),
  );
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const [localeSegment, sectionSegment, slug] = pathname.split('/').filter(Boolean);
  const source = localeSegment && isLocale(localeSegment) ? localeSegment : DEFAULT_LOCALE;
  if (!sectionSegment) return href(target, 'home');
  const key = resolveSection(source, sectionSegment);
  if (!key) return href(target, 'home');
  return href(target, key, key === 'projects' ? slug : undefined);
}
```

- [ ] **Step 5: Implement `src/lib/dictionary.ts`** — FR is the reference shape; EN must satisfy it:

```ts
import type { Locale } from './i18n';

const fr = {
  meta: {
    siteTitle: 'Sailor Vanbercy — Développeur Full-Stack Junior',
    siteDescription:
      'Portfolio de Sailor Vanbercy, développeur full-stack junior : applications web, mobiles et outils IA, du concept à la production.',
  },
  nav: { home: 'Accueil', projects: 'Projets', about: 'À propos', contact: 'Contact', skipToContent: 'Aller au contenu' },
  theme: { toggle: 'Changer de thème', light: 'Clair', dark: 'Sombre' },
  locale: { switchTo: 'English', switchLabel: 'Voir le site en anglais' },
  home: {
    eyebrow: 'Développeur Full-Stack Junior',
    featured: 'Projets phares',
    others: 'Autres projets',
    allProjects: 'Tous les projets',
    downloadCv: 'Télécharger mon CV',
    contactMe: 'Me contacter',
  },
  projects: {
    title: 'Projets',
    intro: 'Projets professionnels, personnels et académiques, du prototype à la production.',
    filterAll: 'Tous',
    filterByTech: 'Filtrer par technologie',
    clearFilter: 'Réinitialiser',
    empty: 'Aucun projet ne correspond à ce filtre.',
    category: { professional: 'Professionnel', personal: 'Personnel', academic: 'Académique' },
  },
  project: {
    context: 'Contexte',
    features: 'Fonctionnalités clés',
    architecture: 'Architecture',
    stack: 'Stack technique',
    gallery: 'Captures d’écran',
    role: 'Rôle',
    period: 'Période',
    team: 'Équipe',
    solo: 'Projet individuel',
    teamOf: 'Équipe de {n}',
    repo: 'Code source',
    demo: 'Démo',
    previous: 'Projet précédent',
    next: 'Projet suivant',
    close: 'Fermer',
    imageOf: 'Image {i} sur {n}',
    layers: {
      frontend: 'Frontend', backend: 'Backend', database: 'Base de données et ORM', security: 'Sécurité',
      architecture: 'Architecture et patterns', infrastructure: 'Infrastructure et DevOps', testing: 'Tests',
      tooling: 'Outils', ai: 'Intelligence artificielle', mobile: 'Mobile', desktop: 'Desktop',
    },
  },
  about: { title: 'À propos', profile: 'Profil', journey: 'Parcours', skills: 'Compétences', usedIn: 'Utilisé dans' },
  skillCategory: {
    language: 'Langages', frontend: 'Frontend', backend: 'Backend', database: 'Bases de données', orm: 'ORM et accès aux données',
    security: 'Sécurité', architecture: 'Architecture et patterns', devops: 'DevOps et infrastructure', testing: 'Tests',
    ai: 'Intelligence artificielle', tooling: 'Outils', mobile: 'Mobile', desktop: 'Desktop', methodology: 'Méthodologie',
  },
  contact: { title: 'Contact', intro: 'Un poste, un projet ou une question : voici comment me joindre.', email: 'E-mail', phone: 'Téléphone', github: 'GitHub', cv: 'CV' },
  notFound: { title: 'Page introuvable', back: 'Retour à l’accueil' },
  footer: { rights: 'Tous droits réservés.' },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    siteTitle: 'Sailor Vanbercy — Junior Full-Stack Developer',
    siteDescription:
      'Portfolio of Sailor Vanbercy, junior full-stack developer: web, mobile and AI-powered applications, from concept to production.',
  },
  nav: { home: 'Home', projects: 'Projects', about: 'About', contact: 'Contact', skipToContent: 'Skip to content' },
  theme: { toggle: 'Toggle theme', light: 'Light', dark: 'Dark' },
  locale: { switchTo: 'Français', switchLabel: 'View the site in French' },
  home: {
    eyebrow: 'Junior Full-Stack Developer',
    featured: 'Featured projects',
    others: 'More projects',
    allProjects: 'All projects',
    downloadCv: 'Download my resume',
    contactMe: 'Get in touch',
  },
  projects: {
    title: 'Projects',
    intro: 'Professional, personal and academic projects, from prototype to production.',
    filterAll: 'All',
    filterByTech: 'Filter by technology',
    clearFilter: 'Reset',
    empty: 'No project matches this filter.',
    category: { professional: 'Professional', personal: 'Personal', academic: 'Academic' },
  },
  project: {
    context: 'Context',
    features: 'Key features',
    architecture: 'Architecture',
    stack: 'Tech stack',
    gallery: 'Screenshots',
    role: 'Role',
    period: 'Period',
    team: 'Team',
    solo: 'Solo project',
    teamOf: 'Team of {n}',
    repo: 'Source code',
    demo: 'Demo',
    previous: 'Previous project',
    next: 'Next project',
    close: 'Close',
    imageOf: 'Image {i} of {n}',
    layers: {
      frontend: 'Frontend', backend: 'Backend', database: 'Database and ORM', security: 'Security',
      architecture: 'Architecture and patterns', infrastructure: 'Infrastructure and DevOps', testing: 'Testing',
      tooling: 'Tooling', ai: 'Artificial intelligence', mobile: 'Mobile', desktop: 'Desktop',
    },
  },
  about: { title: 'About', profile: 'Profile', journey: 'Journey', skills: 'Skills', usedIn: 'Used in' },
  skillCategory: {
    language: 'Languages', frontend: 'Frontend', backend: 'Backend', database: 'Databases', orm: 'ORM and data access',
    security: 'Security', architecture: 'Architecture and patterns', devops: 'DevOps and infrastructure', testing: 'Testing',
    ai: 'Artificial intelligence', tooling: 'Tooling', mobile: 'Mobile', desktop: 'Desktop', methodology: 'Methodology',
  },
  contact: { title: 'Contact', intro: 'A position, a project or a question: here is how to reach me.', email: 'Email', phone: 'Phone', github: 'GitHub', cv: 'Resume' },
  notFound: { title: 'Page not found', back: 'Back to home' },
  footer: { rights: 'All rights reserved.' },
};

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run tests/unit/routes.test.ts tests/unit/dictionary.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/lib tests/unit && git commit -m "feat(i18n): add locale routing and FR/EN dictionary

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Content schema, skills registry, validation and skills tree

**Files:**
- Create: `content/skills.ts`, `content/projects/index.ts`, `src/lib/content/schema.ts`, `src/lib/content/validate.ts`, `src/lib/content/queries.ts`, `src/lib/skills-tree.ts`
- Replace: `scripts/validate-content.ts`
- Test: `tests/unit/validate.test.ts`, `tests/unit/skills-tree.test.ts`, `tests/unit/content.test.ts`

**Interfaces:**
- Consumes: `Locale`, `LOCALES` (Task 2)
- Produces:
  - `content/skills.ts`: `skills` (readonly array), `type SkillId`
  - `schema.ts`: `projectSchema`, `type Project`, `type Skill`, `type SkillCategory`, `type StackLayer`, `SKILL_CATEGORIES`, `STACK_LAYERS`, `type ProjectImage`
  - `validate.ts`: `validateContent(projects: unknown[], skills: Skill[], publicDir: string): string[]`
  - `queries.ts`: `getProjects(): Project[]` (sorted by `order`), `getProject(slug): Project | undefined`, `getFeatured(): Project[]`, `getSkill(id): Skill`, `getAdjacent(slug): { previous?: Project; next?: Project }`
  - `skills-tree.ts`: `buildSkillsTree(projects: Project[], skills: Skill[]): SkillGroup[]` with `SkillGroup = { category: SkillCategory; skills: { skill: Skill; projects: Pick<Project,'slug'|'title'>[] }[] }`

- [ ] **Step 1: Write the schema** — `src/lib/content/schema.ts`:

```ts
import { z } from 'zod';

export const SKILL_CATEGORIES = [
  'language', 'frontend', 'backend', 'database', 'orm', 'security', 'architecture',
  'devops', 'testing', 'ai', 'tooling', 'mobile', 'desktop', 'methodology',
] as const;

export const STACK_LAYERS = [
  'frontend', 'backend', 'database', 'security', 'architecture',
  'infrastructure', 'testing', 'tooling', 'ai', 'mobile', 'desktop',
] as const;

export const PROJECT_CATEGORIES = ['professional', 'personal', 'academic'] as const;

const nonEmpty = z.string().trim().min(1);
const localized = <T extends z.ZodTypeAny>(inner: T) => z.object({ fr: inner, en: inner }).strict();

export const skillSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: nonEmpty,
  category: z.enum(SKILL_CATEGORIES),
});

export const imageSchema = z.object({
  src: z.string().regex(/^projects\/[a-z0-9-]+\/[\w.-]+\.(webp|png|jpg)$/),
  alt: localized(nonEmpty),
  viewport: z.enum(['desktop', 'mobile']),
});

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: nonEmpty,
    pitch: localized(nonEmpty),
    category: z.enum(PROJECT_CATEGORIES),
    period: nonEmpty,
    team: z.object({ solo: z.boolean(), size: z.number().int().min(2).optional() }),
    role: localized(nonEmpty),
    context: localized(nonEmpty),
    features: localized(z.array(nonEmpty).min(3)),
    architecture: localized(nonEmpty),
    stack: z.partialRecord(z.enum(STACK_LAYERS), z.array(nonEmpty).min(1)),
    images: z.array(imageSchema).min(1),
    links: z.object({ repo: z.string().url().optional(), demo: z.string().url().optional() }).optional(),
    featured: z.boolean(),
    order: z.number().int().min(1),
  })
  .strict();

export type Skill = z.infer<typeof skillSchema>;
export type SkillCategory = Skill['category'];
export type StackLayer = (typeof STACK_LAYERS)[number];
export type ProjectImage = z.infer<typeof imageSchema>;
export type Project = z.infer<typeof projectSchema>;
```

Note: if the installed Zod version lacks `z.partialRecord`, use `z.record(z.enum(STACK_LAYERS), z.array(nonEmpty).min(1))` combined with `.partial()` semantics via `z.object(Object.fromEntries(STACK_LAYERS.map(l => [l, z.array(nonEmpty).min(1).optional()])))`. Check with `npm ls zod`.

- [ ] **Step 2: Write the failing validation tests** — `tests/unit/validate.test.ts`:

```ts
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { validateContent } from '@/lib/content/validate';
import type { Skill } from '@/lib/content/schema';

const skills: Skill[] = [
  { id: 'nextjs', label: 'Next.js', category: 'frontend' },
  { id: 'typescript', label: 'TypeScript', category: 'language' },
];

const validProject = (overrides: Record<string, unknown> = {}) => ({
  slug: 'demo',
  title: 'Demo',
  pitch: { fr: 'Pitch', en: 'Pitch' },
  category: 'personal',
  period: '2026',
  team: { solo: true },
  role: { fr: 'Dev', en: 'Dev' },
  context: { fr: 'Contexte', en: 'Context' },
  features: { fr: ['a', 'b', 'c'], en: ['a', 'b', 'c'] },
  architecture: { fr: 'Archi', en: 'Archi' },
  stack: { frontend: ['nextjs'], tooling: ['typescript'] },
  images: [{ src: 'projects/demo/01-home.webp', alt: { fr: 'Accueil', en: 'Home' }, viewport: 'desktop' }],
  featured: false,
  order: 1,
  ...overrides,
});

let publicDir: string;

beforeEach(() => {
  publicDir = mkdtempSync(join(tmpdir(), 'portfolio-public-'));
  mkdirSync(join(publicDir, 'projects', 'demo'), { recursive: true });
  writeFileSync(join(publicDir, 'projects', 'demo', '01-home.webp'), '');
});

describe('validateContent', () => {
  it('accepts a valid project', () => {
    expect(validateContent([validProject()], skills, publicDir)).toEqual([]);
  });

  it('rejects a missing EN translation', () => {
    const errors = validateContent([validProject({ pitch: { fr: 'Pitch', en: '' } })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/demo.*pitch\.en/);
  });

  it('rejects an unknown skill id', () => {
    const errors = validateContent([validProject({ stack: { frontend: ['vue'] } })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/unknown skill "vue"/);
  });

  it('rejects a missing image file', () => {
    const images = [{ src: 'projects/demo/02-missing.webp', alt: { fr: 'x', en: 'x' }, viewport: 'desktop' }];
    const errors = validateContent([validProject({ images })], skills, publicDir);
    expect(errors.join('\n')).toMatch(/missing image .*02-missing\.webp/);
  });

  it('rejects duplicate slugs and duplicate order', () => {
    const errors = validateContent([validProject(), validProject()], skills, publicDir);
    expect(errors.join('\n')).toMatch(/duplicate slug "demo"/);
    expect(errors.join('\n')).toMatch(/duplicate order 1/);
  });

  it('rejects duplicate skill ids in the registry', () => {
    const errors = validateContent([validProject()], [...skills, skills[0]], publicDir);
    expect(errors.join('\n')).toMatch(/duplicate skill id "nextjs"/);
  });
});
```

- [ ] **Step 3: Run to verify failure**

Run: `npx vitest run tests/unit/validate.test.ts`
Expected: FAIL, `validateContent` not found.

- [ ] **Step 4: Implement `src/lib/content/validate.ts`**

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { projectSchema, skillSchema, type Project, type Skill } from './schema';

function findDuplicates<T>(values: T[]): T[] {
  const seen = new Set<T>();
  return values.filter((value) => (seen.has(value) ? true : (seen.add(value), false)));
}

export function validateContent(projects: unknown[], skills: Skill[], publicDir: string): string[] {
  const errors: string[] = [];

  skills.forEach((skill) => {
    const result = skillSchema.safeParse(skill);
    if (!result.success) errors.push(`skill ${JSON.stringify(skill)}: ${result.error.message}`);
  });
  findDuplicates(skills.map((s) => s.id)).forEach((id) => errors.push(`duplicate skill id "${id}"`));
  const skillIds = new Set(skills.map((s) => s.id));

  const parsed: Project[] = [];
  projects.forEach((raw, index) => {
    const result = projectSchema.safeParse(raw);
    const label = (raw as { slug?: string })?.slug ?? `#${index}`;
    if (!result.success) {
      result.error.issues.forEach((issue) => errors.push(`${label}: ${issue.path.join('.')} ${issue.message}`));
      return;
    }
    parsed.push(result.data);
  });

  findDuplicates(parsed.map((p) => p.slug)).forEach((slug) => errors.push(`duplicate slug "${slug}"`));
  findDuplicates(parsed.map((p) => p.order)).forEach((order) => errors.push(`duplicate order ${order}`));

  parsed.forEach((project) => {
    Object.values(project.stack).flat().forEach((id) => {
      if (id && !skillIds.has(id)) errors.push(`${project.slug}: unknown skill "${id}"`);
    });
    project.images.forEach((image) => {
      if (!existsSync(join(publicDir, image.src))) errors.push(`${project.slug}: missing image ${image.src}`);
    });
  });

  return errors;
}
```

- [ ] **Step 5: Run validation tests**

Run: `npx vitest run tests/unit/validate.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 6: Write failing skills-tree test** — `tests/unit/skills-tree.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildSkillsTree } from '@/lib/skills-tree';
import type { Project, Skill } from '@/lib/content/schema';

const skills: Skill[] = [
  { id: 'react', label: 'React', category: 'frontend' },
  { id: 'angular', label: 'Angular', category: 'frontend' },
  { id: 'jpa', label: 'JPA', category: 'orm' },
  { id: 'unused', label: 'Unused', category: 'tooling' },
  { id: 'java', label: 'Java', category: 'language' },
];

const project = (slug: string, order: number, stack: Project['stack']) =>
  ({ slug, title: slug.toUpperCase(), order, stack }) as Project;

const projects = [
  project('a', 1, { frontend: ['react'], backend: ['java'], database: ['jpa'] }),
  project('b', 2, { frontend: ['react', 'angular'] }),
  project('c', 3, { frontend: ['react'], backend: ['java'] }),
];

describe('buildSkillsTree', () => {
  const tree = buildSkillsTree(projects, skills);

  it('groups skills by category in registry category order and omits unused skills', () => {
    expect(tree.map((g) => g.category)).toEqual(['language', 'frontend', 'orm']);
    expect(tree.flatMap((g) => g.skills.map((s) => s.skill.id))).not.toContain('unused');
  });

  it('sorts skills by project count desc, then label', () => {
    const frontend = tree.find((g) => g.category === 'frontend')!;
    expect(frontend.skills.map((s) => s.skill.id)).toEqual(['react', 'angular']);
  });

  it('lists projects using each skill in project order, without duplicates', () => {
    const react = tree.find((g) => g.category === 'frontend')!.skills[0];
    expect(react.projects).toEqual([
      { slug: 'a', title: 'A' },
      { slug: 'b', title: 'B' },
      { slug: 'c', title: 'C' },
    ]);
  });
});
```

- [ ] **Step 7: Run to verify failure**, then implement `src/lib/skills-tree.ts`:

```ts
import { SKILL_CATEGORIES, type Project, type Skill, type SkillCategory } from './content/schema';

export interface SkillUsage {
  skill: Skill;
  projects: Pick<Project, 'slug' | 'title'>[];
}

export interface SkillGroup {
  category: SkillCategory;
  skills: SkillUsage[];
}

export function buildSkillsTree(projects: Project[], skills: Skill[]): SkillGroup[] {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const usage = new Map<string, Pick<Project, 'slug' | 'title'>[]>();

  ordered.forEach(({ slug, title, stack }) => {
    new Set(Object.values(stack).flat()).forEach((id) => {
      if (!id) return;
      usage.set(id, [...(usage.get(id) ?? []), { slug, title }]);
    });
  });

  return SKILL_CATEGORIES.map((category) => ({
    category,
    skills: skills
      .filter((skill) => skill.category === category && usage.has(skill.id))
      .map((skill) => ({ skill, projects: usage.get(skill.id)! }))
      .sort((a, b) => b.projects.length - a.projects.length || a.skill.label.localeCompare(b.skill.label)),
  })).filter((group) => group.skills.length > 0);
}
```

Run: `npx vitest run tests/unit/skills-tree.test.ts` — Expected: PASS.

- [ ] **Step 8: Skills registry seed** — `content/skills.ts` (grows as projects are analysed in Phase 2; each new tool found is appended here):

```ts
import type { Skill } from '@/lib/content/schema';

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
```

- [ ] **Step 9: Project index and queries** — `content/projects/index.ts`:

```ts
import type { Project } from '@/lib/content/schema';

// Each project file is appended here as it is written in Phase 2.
export const projects: Project[] = [];
```

Project files use this typed helper so stack ids are checked at compile time — add to `content/projects/define.ts`:

```ts
import type { Project, StackLayer } from '@/lib/content/schema';
import type { SkillId } from '../skills';

type ProjectInput = Omit<Project, 'stack'> & { stack: Partial<Record<StackLayer, SkillId[]>> };

export const defineProject = (project: ProjectInput): Project => project;
```

`src/lib/content/queries.ts`:

```ts
import { projects as rawProjects } from '@content/projects';
import { skills } from '@content/skills';
import type { Project, Skill } from './schema';

const SORTED: Project[] = [...rawProjects].sort((a, b) => a.order - b.order);
const SKILLS_BY_ID = new Map<string, Skill>(skills.map((s) => [s.id, s]));

export const getProjects = (): Project[] => SORTED;
export const getProject = (slug: string): Project | undefined => SORTED.find((p) => p.slug === slug);
export const getFeatured = (): Project[] => SORTED.filter((p) => p.featured);
export const getSkills = (): Skill[] => [...skills];

export function getSkill(id: string): Skill {
  const skill = SKILLS_BY_ID.get(id);
  if (!skill) throw new Error(`Unknown skill id "${id}"`);
  return skill;
}

export function getAdjacent(slug: string): { previous?: Project; next?: Project } {
  const index = SORTED.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return { previous: SORTED[index - 1], next: SORTED[index + 1] };
}
```

- [ ] **Step 10: Real-content test** — `tests/unit/content.test.ts`:

```ts
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from '@content/projects';
import { skills } from '@content/skills';
import { validateContent } from '@/lib/content/validate';

const EXPECTED_PROJECT_COUNT = 13;
const EXPECTED_FEATURED = ['leadboy', 'smaatch', 'tetris-formation'];

describe('real content', () => {
  it('passes validation', () => {
    expect(validateContent(projects, [...skills], join(process.cwd(), 'public'))).toEqual([]);
  });

  it.skipIf(projects.length < EXPECTED_PROJECT_COUNT)('contains all projects and the 3 featured ones', () => {
    expect(projects).toHaveLength(EXPECTED_PROJECT_COUNT);
    expect(projects.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual([...EXPECTED_FEATURED].sort());
  });
});
```

The `skipIf` is removed in Task 13 once all projects exist.

- [ ] **Step 11: Prebuild script** — `scripts/validate-content.ts`:

```ts
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
```

If `tsx` cannot resolve the `@/` alias inside `content/projects/define.ts`, replace those imports with relative paths (`../../src/lib/content/schema`).

- [ ] **Step 12: Run everything**

Run: `npm test && npx tsx scripts/validate-content.ts`
Expected: all PASS, "Content valid: 0 projects, 10 skills."

- [ ] **Step 13: Commit**

```bash
git add -A && git commit -m "feat(content): add typed content model, validation and skills tree

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

## Phase 2 — Projects: run, capture, analyse, write

### Task 4: Capture toolkit (scratchpad, not committed)

**Files (all in `$SCRATCH/capture/`):**
- Create: `package.json`, `capture.mjs`, `to-webp.mjs`, `window-capture.ps1`, `copy-project.sh`

**Interfaces:**
- Produces:
  - `copy-project.sh <src> <slug>` -> clean copy in `$SCRATCH/run/<slug>`
  - `node capture.mjs <config.json>` -> PNGs in `$SCRATCH/shots/<slug>/`
  - `node to-webp.mjs <slug>` -> WebP in `$REPO/public/projects/<slug>/`
  - `powershell -File window-capture.ps1 -ProcessName <name> -Out <png>`

- [ ] **Step 1: Copy helper** — `copy-project.sh`:

```bash
#!/usr/bin/env bash
# Copies a source project into the scratchpad without dependencies, build output, git data or env files.
set -euo pipefail
SRC="$1"; SLUG="$2"
DEST="$SCRATCH/run/$SLUG"
mkdir -p "$DEST"
tar -C "$SRC" \
  --exclude=node_modules --exclude=.next --exclude=.git --exclude=build --exclude=dist \
  --exclude=.dart_tool --exclude=bin --exclude=obj --exclude=target --exclude=coverage \
  --exclude='.env*' --exclude='cmake-build-*' -cf - . | tar -C "$DEST" -xf -
echo "$DEST"
```

- [ ] **Step 2: Playwright capture** — `package.json` with deps `playwright`, `sharp`; then `npm install && npx playwright install chromium`. `capture.mjs`:

```js
// Usage: node capture.mjs <config.json>
// config: { slug, baseUrl, viewport: 'desktop'|'mobile', login?: { url, steps: [{fill|click|wait}] },
//           shots: [{ name, path, waitFor?, actions?: [{click|fill|scroll|wait}], fullPage? }] }
import { chromium, devices } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const VIEWPORTS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  mobile: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 },
};
const SETTLE_MS = 800;

const config = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const outDir = join(process.env.SCRATCH, 'shots', config.slug);
mkdirSync(outDir, { recursive: true });

async function runAction(page, action) {
  if (action.click) await page.click(action.click);
  if (action.fill) await page.fill(action.fill[0], action.fill[1]);
  if (action.scroll) await page.mouse.wheel(0, action.scroll);
  if (action.wait) await page.waitForSelector(action.wait);
  if (action.goto) await page.goto(new URL(action.goto, config.baseUrl).toString());
}

const browser = await chromium.launch();
const context = await browser.newContext({ ...VIEWPORTS[config.viewport ?? 'desktop'], colorScheme: 'light', locale: 'fr-BE' });
const page = await context.newPage();

if (config.login) {
  await page.goto(new URL(config.login.url, config.baseUrl).toString());
  for (const step of config.login.steps) await runAction(page, step);
}

for (const [index, shot] of config.shots.entries()) {
  await page.goto(new URL(shot.path, config.baseUrl).toString(), { waitUntil: 'networkidle' });
  if (shot.waitFor) await page.waitForSelector(shot.waitFor);
  for (const action of shot.actions ?? []) await runAction(page, action);
  await page.waitForTimeout(SETTLE_MS);
  const file = join(outDir, `${String(index + 1).padStart(2, '0')}-${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: shot.fullPage ?? false });
  console.log('captured', file);
}

await browser.close();
```

- [ ] **Step 3: WebP conversion** — `to-webp.mjs`:

```js
// Usage: node to-webp.mjs <slug>  — converts $SCRATCH/shots/<slug>/*.png into $REPO/public/projects/<slug>/*.webp
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const MAX_WIDTH = 1600;
const QUALITY = 82;
const slug = process.argv[2];
const src = join(process.env.SCRATCH, 'shots', slug);
const dest = join(process.env.REPO, 'public', 'projects', slug);
mkdirSync(dest, { recursive: true });

for (const file of readdirSync(src).filter((f) => f.endsWith('.png'))) {
  const out = join(dest, `${parse(file).name}.webp`);
  await sharp(join(src, file)).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
  console.log('wrote', out);
}
```

- [ ] **Step 4: Desktop window capture** — `window-capture.ps1`:

```powershell
param([Parameter(Mandatory)][string]$ProcessName, [Parameter(Mandatory)][string]$Out, [string]$TitleLike = '*')
Add-Type -AssemblyName System.Drawing
Add-Type @'
using System; using System.Runtime.InteropServices;
public static class Win {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
}
'@
[Win]::SetProcessDPIAware() | Out-Null
$proc = Get-Process -Name $ProcessName | Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -like $TitleLike } | Select-Object -First 1
if (-not $proc) { throw "No window for process $ProcessName" }
[Win]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 600
$r = New-Object Win+RECT
[Win]::GetWindowRect($proc.MainWindowHandle, [ref]$r) | Out-Null
$w = $r.Right - $r.Left; $h = $r.Bottom - $r.Top
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($r.Left, $r.Top, 0, 0, $bmp.Size)
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "captured $Out"
```

- [ ] **Step 5: Verify the toolkit** on the existing Angular build? No — verify on a trivial target: `npx serve "$REPO/public" -l 3999` and a config capturing `/` once. Expected: one PNG in `$SCRATCH/shots/toolkit-check/`, converted by `to-webp.mjs` into `$REPO/public/projects/toolkit-check/`; then delete both test folders.

No commit (scratchpad only).

---

### Per-project procedure (applies to Tasks 5.1 to 5.13)

Each project task follows the same steps. The task-specific blocks below give the run recipe, target screens and analysis entry points.

- [ ] **A. Copy** — `bash $SCRATCH/capture/copy-project.sh "<source>" <slug>`
- [ ] **B. Run** — follow the task's run recipe from `$SCRATCH/run/<slug>`. Data must be fictional (seed written in `$SCRATCH/seeds/<slug>.sql`). If the project cannot start without modifying source, stop and report to the user with the exact error.
- [ ] **C. Capture** — write `$SCRATCH/capture/configs/<slug>.json`, run `node capture.mjs`, review every PNG visually (Read tool) for: real personal data (must be none), error overlays, empty states, cut-off UI. Re-capture until clean. 4 to 6 images; add 1 to 3 mobile shots when the UI is responsive or mobile-native.
- [ ] **D. Convert** — `node to-webp.mjs <slug>`.
- [ ] **E. Analyse** (read-only, original source path) — manifests (`package.json`, `pom.xml`, `*.csproj`, `pubspec.yaml`, `CMakeLists.txt`, `requirements.txt`), entry points, folder structure, data models / migrations, routes / controllers, auth, tests, Docker / CI files, README and docs, and `git log --format='%an' | sort | uniq -c` for team size and contribution share. Record every evidenced tool (framework, library, ORM, security mechanism, pattern, DevOps, testing, tooling, AI, methodology).
- [ ] **F. Register skills** — append new entries to `content/skills.ts` (ids kebab-case, correct category).
- [ ] **G. Write** `content/projects/<slug>.ts` with `defineProject({...})`, professional tone, FR then EN, no emojis:
  - `pitch`: one sentence, outcome-oriented
  - `context`: 2-4 sentences — who it is for, which problem, constraints
  - `features`: 4-7 bullets, concrete user capabilities
  - `architecture`: 3-6 sentences — layers, data flow, notable technical decisions
  - `role`: what Sailor personally did (from git history / user statement)
  - `stack`: every evidenced skill id, grouped by layer
  - `images`: each with a descriptive bilingual `alt`
- [ ] **H. Register** the project in `content/projects/index.ts`.
- [ ] **I. Verify** — `npm test && npx tsx scripts/validate-content.ts` -> PASS.
- [ ] **J. Commit** — `git add content public/projects/<slug> && git commit -m "feat(content): add <slug> project page content and screenshots" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`
- [ ] **K. Stop the project** — stop dev servers and `docker compose down -v` / `docker rm -f` every container started for it.

Example content file (structure only; text comes from step E):

```ts
import { defineProject } from './define';

export default defineProject({
  slug: 'leadboy',
  title: 'LeadBoy',
  pitch: { fr: '...', en: '...' },
  category: 'professional',
  period: '2025-2026',
  team: { solo: true },
  role: { fr: '...', en: '...' },
  context: { fr: '...', en: '...' },
  features: { fr: ['...', '...', '...', '...'], en: ['...', '...', '...', '...'] },
  architecture: { fr: '...', en: '...' },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss'],
    backend: ['nodejs', 'supabase'],
    database: ['postgresql'],
    security: ['jwt', 'zod', 'row-level-security', 'rate-limiting'],
    infrastructure: ['docker', 'vps'],
    testing: ['vitest'],
    ai: ['openai-api', 'claude-code', 'prompt-engineering'],
  },
  images: [
    { src: 'projects/leadboy/01-pipeline.webp', alt: { fr: '...', en: '...' }, viewport: 'desktop' },
  ],
  featured: true,
  order: 1,
});
```

### Task 5.1: LeadBoy (`leadboy`, order 1, featured, professional)

- Source: `C:\MonPc\indigo-studio\LeadBoy` (+ `baileys-server/`, `TFE_DOCS/`, `TFE_CONTEXT.md`, `CLAUDE.md`)
- Run recipe: copy; `npm ci`; local Supabase: copy `supabase/` or `database/` migrations to `$SCRATCH/run/leadboy-db/supabase`, `npx supabase init --workdir` if no config, `npx supabase start --workdir $SCRATCH/run/leadboy-db`, apply migrations + seed (fictional sellers, vehicles, conversations). Start with env vars passed inline (`NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=<local anon key from supabase status> ... npm run dev`). WhatsApp/AI services are not started; screens that need them use seeded data.
- Fallback: keep the 6 existing PNGs in `public/projects/leadboy/` (convert to WebP with the same naming `01-pipeline` ... `06-login`) if the local run is not feasible within reasonable effort; report it.
- Screens: pipeline dashboard, scraper, conversation, negotiation, bulk send, login (+ analytics if available).
- Delete the old PNGs after WebP conversion.

### Task 5.2: Smaatch (`smaatch`, order 2, featured)

- Source: `C:\Users\sailo\Smaatch` (web), `C:\Users\sailo\smaatch-mobile` (mobile, same page)
- Run recipe (web): copy; `npm ci`; local Supabase from the copied `supabase/` (`npx supabase start --workdir`, migrations applied automatically, then `$SCRATCH/seeds/smaatch.sql`: one fictional club "RFC Demo", categories, ~20 fictional members, events, attendance, match scores, finances, tickets). Create a demo user via Supabase Auth admin API (`http://127.0.0.1:54321/auth/v1/admin/users` with the local service key). `npm run dev` with local env vars inline.
- Run recipe (mobile): copy; `npm ci`; `npx expo start --web` with the same local Supabase env vars (`EXPO_PUBLIC_*` names taken from the code, not from `.env`); capture with `viewport: 'mobile'`.
- Screens: dashboard home, members, events/attendance, finances, results, tickets PDF batch, statistics; mobile: 2-3 screens.
- Category: personal unless code/user says otherwise.

### Task 5.3: Tetris Formation (`tetris-formation`, order 3, featured, professional)

- Source: `C:\MonPc\indigo-studio\tetris-formation`
- Run recipe: copy; `npm ci`; inspect `prisma/schema.prisma` provider. SQLite: `DATABASE_URL=file:./dev.db npx prisma migrate deploy && npx prisma db seed` (if seed exists, else seed from `questions.json` via a scratch script). PostgreSQL: `docker run -d --name tetris-pg -e POSTGRES_PASSWORD=demo -p 55432:5432 postgres:16` and `DATABASE_URL=postgresql://postgres:demo@localhost:55432/postgres`. `npm run dev`.
- Screens: landing, quiz/game in progress, results/leaderboard, admin if any.

### Task 5.4: Plan Financier (`plan-financier`, order 4, professional)

- Source: `C:\MonPc\indigo-studio\App-Formation`
- Run recipe: copy; `npm ci`; read `drizzle.config.ts` for dialect; start matching DB container; `npx drizzle-kit push` with inline `DATABASE_URL`; seed fictional financial plan; `npm run dev`.
- Screens: dashboard, plan editor, charts/projections, export.

### Task 5.5: Job Tracker (`job-tracker`, order 5)

- Source: `C:\MonPc\sites\job-tracker`
- Run recipe: copy; `docker compose up -d --build` from the copy (override env via `docker-compose.override.yml` in the copy if secrets are required). Seed fictional applications.
- Screens: board/list of applications, detail, stats, create form.

### Task 5.6: Arborescence (`arborescence`, order 6)

- Source: `C:\MonPc\Arborescence`
- Run recipe: copy; `npm ci`; `npm run dev`.
- Screens: hero, each main section (full-page capture split into 3-4 images), mobile view.

### Task 5.7: The Lost Grimoire (`the-lost-grimoire`, order 7, academic, group)

- Source: `$HELHA\Bac 3\AEMT\Hackathon` (`front/`, `back/`, `db/`, `docker-compose.yml`). First confirm it is The Lost Grimoire (README, titles in `front/`); if not, search `$HELHA\Bac 3\AEMT` and report.
- Run recipe: copy; `docker compose up -d --build`; create notes/folders with fictional content (via UI actions in the capture config).
- Screens: folder tree + markdown editor, preview, folder management, login.
- Expected stack evidence: React, Spring Boot, Spring Data JPA / Hibernate, Spring Security / JWT, Maven, Docker Compose, database engine from `db/`.

### Task 5.8: ClinikTime (`cliniktime`, order 8, academic, group)

- Source: `$HELHA\Bac 3\Projet\ClinikTime\Backend\ClinikTime`, `...\FrontEnd\ClinikTimeFrontend`, `...\diagramme`
- Run recipe: copy both; DB container matching `appsettings.json` provider (MySQL 8: `docker run -d --name clinik-db -e MYSQL_ROOT_PASSWORD=demo -e MYSQL_DATABASE=cliniktime -p 53306:3306 mysql:8`); backend in `mcr.microsoft.com/dotnet/sdk:<version from csproj>` with the copy mounted, connection string overridden via `ConnectionStrings__<Name>` env var, EF migrations applied (`dotnet ef database update` or app startup); frontend `npm ci && npx ng serve --port 4300` with API URL from its environment file (in the copy, edit the copied environment file only if necessary — the copy is scratch).
- Screens: landing, doctor search, booking calendar, patient appointments, admin/doctor dashboard.
- Expected stack evidence: Angular, C#, ASP.NET Core Web API, Entity Framework Core, MySQL, JWT, Swagger.

### Task 5.9: FoodSnap (`foodsnap`, order 9, academic)

- Source: `C:\MonPc\ecole\FoodSnap` (Flutter + `MockExpress/` + `openapi.yaml`), backend `$HELHA\Bac 3\TM\Projet\Backend\FoodSnap`
- Run recipe: copy; backend: run `MockExpress` (`npm ci && node <entry>`) or the backend folder; Flutter web build via `docker run --rm -v "$SCRATCH/run/foodsnap:/app" -w /app ghcr.io/cirruslabs/flutter:stable flutter build web`, serve `build/web` with `npx serve -l 5200`. If web build fails (plugins without web support), report and propose installing the Flutter SDK + Android emulator.
- Screens (mobile viewport): recipe list, recipe detail, add recipe with photo, search.

### Task 5.10: Zombie High School (`zombie-high-school`, order 10, academic, group)

- Source: `$HELHA\Bac 3\devJeu\ZombieHighSchoolBrainrot`
- Run recipe: try the existing executable in `cmake-build-release` (run from its folder so assets resolve; do not write there — if the game writes saves next to the exe, copy `cmake-build-release` + `assets` to scratch first). If it does not start (missing DLLs), report and ask before installing MinGW/SFML.
- Capture: `window-capture.ps1 -ProcessName <exe name>` at menu, gameplay (several moments), game over.
- Analyse: `src/` classes, game loop, entity/collision management, patterns used.

### Task 5.11: Adresseur IP (`adresseur-ip`, order 11, academic, group)

- Source: `$HELHA\Bac 3\Reseau\python\ProjetReseau` (`app.py`, `controllers/`, `models/`, `repository/`, `views/`, `bdd/`)
- Run recipe: copy; `python -m venv $SCRATCH/venv/adresseur && $SCRATCH/venv/adresseur/Scripts/pip install customtkinter <other imports found>`; run `python app.py` from the copy (its SQLite file is a copy, so writes are harmless).
- Capture: window capture (`-ProcessName python -TitleLike '*'`) of login, subnet calculation, VLSM result, saved networks.
- Expected stack evidence: Python, customtkinter, SQLite, MVC + repository pattern.

### Task 5.12: Are You the New Emilien ? (`emilien`, order 12, academic, group)

- Sources: `$HELHA\Bac 2\Q2\Projet` (`eclipse/`, `Diagramme/`, `user stories.xlsx`, `05-Backlog Sprint.pptx`) and `$HELHA\Bac 2\Q2\POO\POO_Eclipse\{GameInterface,Projet_2025_}`. The POO_Eclipse files are deleted in the HELHA working tree but present in git: extract without touching the working tree:

```bash
cd "$HELHA" && mkdir -p "$SCRATCH/run/emilien" && git archive HEAD "Bac 2/Q2/POO/POO_Eclipse" | tar -x -C "$SCRATCH/run/emilien"
```

  Pick the most complete version between `Bac 2/Q2/Projet/eclipse` and the git-extracted one (compare `src/` contents).
- Run recipe: download JavaFX SDK 21 for Windows into `$SCRATCH/tools/javafx-sdk-21` (from gluonhq.com, official), collect jars referenced in `.classpath` (e.g. Gson/Jackson) from the project `lib/` or Maven Central into `$SCRATCH/tools/libs`; compile `javac --module-path $FX/lib --add-modules javafx.controls,javafx.fxml -cp "libs/*" -d out $(find src -name '*.java')`, copy resources, run `java --module-path ... -cp "out;libs/*" application.Main` (main class from code).
- Capture: window capture of menu, board, question card, end screen.
- Methodology evidence: Scrum backlog, user stories, UML diagrams.

### Task 5.13: Moit-Moit (`moit-moit`, order 13, academic, group)

- Source: `$HELHA\Bac 2\Q2\TI\Projet TM\GitHub` (+ `Moit-Moit.pdf`). Do not open the `$host*.txt` file.
- Run recipe: copy the `GitHub` folder; locate the SQL schema (`*.sql`) and the PHP DB config file; write `$SCRATCH/run/moit-moit-config/<same filename>` with local credentials and mount it over the copy's config (or edit the copy — it is scratch). Containers:

```bash
docker network create moitmoit
docker run -d --name moitmoit-db --network moitmoit -e MYSQL_ROOT_PASSWORD=demo -e MYSQL_DATABASE=moitmoit -v "$SCRATCH/run/moit-moit/<schema dir>:/docker-entrypoint-initdb.d:ro" mysql:8
docker run -d --name moitmoit-web --network moitmoit -p 8088:80 -v "$SCRATCH/run/moit-moit/<web root>:/var/www/html" php:8.2-apache
docker exec moitmoit-web docker-php-ext-install pdo_mysql mysqli && docker restart moitmoit-web
```

  Seed fictional users/groups/expenses with One Piece-themed names (matches the project theme, no real people).
- Screens: login, groups, expense list, balance / who owes whom, add expense.

---

## Phase 3 — Site

### Task 6: Design tokens, fonts, layouts and redirect

**Files:**
- Create: `src/app/globals.css`, `src/app/(root)/layout.tsx`, `src/app/(root)/page.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/not-found.tsx`, `src/lib/fonts.ts`
- Modify: delete placeholder `src/app/[locale]/page.tsx` content (replaced Task 9)

**Interfaces:**
- Consumes: `LOCALES`, `isLocale`, `getDictionary`
- Produces: CSS tokens `--bg --fg --muted --border --accent --accent-fg --card`, utility classes via Tailwind theme (`bg-bg text-fg text-muted border-border text-accent bg-card`), fonts `fontDisplay`, `fontSans`

- [ ] **Step 1: Tokens** — `src/app/globals.css`:

```css
@import 'tailwindcss';

@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));

:root {
  --bg: #fafaf7;
  --fg: #16161a;
  --muted: #5d5d66;
  --border: #e4e2dc;
  --card: #ffffff;
  --accent: #c2410c;
  --accent-fg: #ffffff;
}

:root[data-theme='dark'] {
  --bg: #111113;
  --fg: #ededee;
  --muted: #a1a1aa;
  --border: #2a2a2f;
  --card: #18181b;
  --accent: #fb923c;
  --accent-fg: #111113;
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
}

html { background: var(--bg); color: var(--fg); }
body { font-family: var(--font-sans), system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: reveal 0.6s ease-out both; }
}
@keyframes reveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
```

Accent contrast check: `#c2410c` on `#fafaf7` = 5.0:1, `#fb923c` on `#111113` = 8.6:1 (both >= 4.5). Verify with Lighthouse in Task 13.

- [ ] **Step 2: Fonts** — `src/lib/fonts.ts`:

```ts
import { Fraunces, Inter } from 'next/font/google';

export const fontDisplay = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
export const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
```

- [ ] **Step 3: Root redirect** — `src/app/(root)/layout.tsx`:

```tsx
import '../globals.css';

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/(root)/page.tsx`:

```tsx
const PREFERRED_LOCALE_SCRIPT = `try{var l=(navigator.language||'fr').slice(0,2);location.replace(l==='en'?'/en/':'/fr/')}catch(e){location.replace('/fr/')}`;

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <script dangerouslySetInnerHTML={{ __html: PREFERRED_LOCALE_SCRIPT }} />
      <p><a href="/fr/">Sailor Vanbercy — Portfolio</a></p>
    </>
  );
}
```

- [ ] **Step 4: Locale layout** — `src/app/[locale]/layout.tsx` (header/footer components arrive in Task 7; import them there):

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { fontDisplay, fontSans } from '@/lib/fonts';
import { LOCALES, isLocale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { THEME_INIT_SCRIPT } from '@/lib/theme-script';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL('https://portfolio-sailor.vercel.app'),
    title: { default: dict.meta.siteTitle, template: `%s — Sailor Vanbercy` },
    description: dict.meta.siteDescription,
    icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg">
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
```

Replace `metadataBase` with the real production domain from the Vercel project (check `vercel.json` / Vercel dashboard with the user before deploy; keep a single constant `SITE_URL` in `src/lib/site.ts` and reuse it in sitemap).

- [ ] **Step 5: Not found** — `src/app/[locale]/not-found.tsx` (static, no params available; bilingual):

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24">
      <h1 className="font-display text-4xl">Page introuvable / Page not found</h1>
      <p className="mt-6 flex gap-6">
        <Link className="underline underline-offset-4" href="/fr/">Retour à l’accueil</Link>
        <Link className="underline underline-offset-4" href="/en/">Back to home</Link>
      </p>
    </section>
  );
}
```

- [ ] **Step 6: Commit** after Task 7 makes the build pass (layout imports header/footer).

### Task 7: Header, footer, locale switch, theme toggle

**Files:**
- Create: `src/lib/theme-script.ts`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/locale-switch.tsx`, `src/components/theme-toggle.tsx`, `src/lib/site.ts`, `content/profile.ts`
- Test: `tests/unit/theme-script.test.ts`, `tests/unit/locale-switch.test.tsx`

**Interfaces:**
- Consumes: `href`, `switchLocalePath`, `getDictionary`
- Produces: `THEME_INIT_SCRIPT: string`, `THEME_STORAGE_KEY = 'theme'`, `profile` (see Step 4), `SITE_URL`

- [ ] **Step 1: Failing test for no-flash script** — `tests/unit/theme-script.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from '@/lib/theme-script';

const run = () => new Function(THEME_INIT_SCRIPT)();

describe('THEME_INIT_SCRIPT', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.clear();
  });

  it('applies the stored theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    run();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('falls back to the system preference', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('dark') }));
    run();
    expect(document.documentElement.dataset.theme).toBe('dark');
    vi.unstubAllGlobals();
  });

  it('does not throw when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(run).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe('light');
    vi.restoreAllMocks();
  });
});
```

- [ ] **Step 2: Implement** `src/lib/theme-script.ts`:

```ts
export const THEME_STORAGE_KEY = 'theme';

export const THEME_INIT_SCRIPT = `(function(){var t='light';try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');if(s==='dark'||s==='light'){t=s}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){t='dark'}}catch(e){}document.documentElement.dataset.theme=t})();`;
```

Run: `npx vitest run tests/unit/theme-script.test.ts` — Expected: PASS. (The storage-blocked test expects `light` because matchMedia is undefined in jsdom by default.)

- [ ] **Step 3: Theme toggle** — `src/components/theme-toggle.tsx`:

```tsx
'use client';

import { THEME_STORAGE_KEY } from '@/lib/theme-script';

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* storage unavailable: theme stays for this visit */ }
  };
  return (
    <button type="button" onClick={toggle} aria-label={label} className="rounded-full p-2 text-muted transition-colors hover:text-fg">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />
      </svg>
    </button>
  );
}
```

- [ ] **Step 4: Profile content** — `content/profile.ts`:

```ts
import type { Locale } from '@/lib/i18n';

type Localized = Record<Locale, string>;

export const profile = {
  name: 'Sailor Vanbercy',
  title: { fr: 'Développeur Full-Stack Junior', en: 'Junior Full-Stack Developer' } satisfies Localized,
  headline: {
    fr: 'Je conçois et livre des applications web et mobiles complètes, de la base de données à l’interface, avec un workflow augmenté par l’IA.',
    en: 'I design and ship complete web and mobile applications, from database to interface, with an AI-augmented workflow.',
  } satisfies Localized,
  bio: {
    fr: [
      'Développeur full-stack junior diplômé de la HELHa, je travaille principalement avec TypeScript, Next.js, React et PostgreSQL (Supabase), et je suis à l’aise côté back-end avec Node.js, Java / Spring Boot et C# / ASP.NET.',
      'Lors de mon stage chez Indigo Studio, j’ai conçu et mis en production LeadBoy, un agent conversationnel qui automatise la prospection de véhicules d’occasion : extraction d’annonces, échanges WhatsApp et négociation pilotée par l’IA, centralisés dans un tableau de bord temps réel.',
      'Ce stage m’a aussi permis d’intégrer des outils d’intelligence artificielle comme Claude Code au cœur de mon workflow : exploration de code, refactoring, écriture de tests, revue et documentation. Je les utilise comme des accélérateurs encadrés par des pratiques rigoureuses — tests automatisés, validation des entrées, revue systématique — pour livrer plus vite sans sacrifier la qualité.',
      'Je recherche un poste de développeur full-stack au sein d’une équipe où je pourrai contribuer à des produits concrets et continuer à progresser.',
    ],
    en: [
      'I am a junior full-stack developer who graduated from HELHa. I mainly work with TypeScript, Next.js, React and PostgreSQL (Supabase), and I am comfortable on the back end with Node.js, Java / Spring Boot and C# / ASP.NET.',
      'During my internship at Indigo Studio, I designed and shipped LeadBoy to production: a conversational agent that automates used-vehicle sourcing — listing extraction, WhatsApp conversations and AI-driven negotiation, all centralised in a real-time dashboard.',
      'This internship also led me to embed AI tools such as Claude Code at the core of my workflow: codebase exploration, refactoring, test writing, review and documentation. I use them as accelerators framed by rigorous practices — automated tests, input validation, systematic review — to ship faster without trading off quality.',
      'I am looking for a full-stack developer role in a team where I can contribute to real products and keep growing.',
    ],
  } satisfies Record<Locale, string[]>,
  timeline: [
    {
      period: '2025 – 2026',
      title: { fr: 'Stage et TFE — Indigo Studio', en: 'Internship and final project — Indigo Studio' },
      text: {
        fr: 'Conception et mise en production de LeadBoy, développement d’outils internes (Tetris Formation, Plan Financier), intégration de Claude Code dans le workflow de développement.',
        en: 'Designed and shipped LeadBoy to production, built internal tools (Tetris Formation, Plan Financier), integrated Claude Code into the development workflow.',
      },
    },
    {
      period: '2023 – 2026',
      title: { fr: 'Bachelier en informatique de gestion — HELHa', en: 'Bachelor in Business Computing — HELHa' },
      text: {
        fr: 'Développement web, mobile et desktop, bases de données, réseaux, design patterns et gestion de projet agile.',
        en: 'Web, mobile and desktop development, databases, networking, design patterns and agile project management.',
      },
    },
  ],
  contact: {
    email: 'sailorvanbercy2005@gmail.com',
    phone: '+32 497 20 67 05',
    phoneHref: 'tel:+32497206705',
    github: 'https://github.com/SailorVanbercy',
    githubHandle: '@SailorVanbercy',
    cv: '/cv-vanbercy-sailor.pdf',
  },
} as const;
```

Facts to confirm with the user during Task 14 review (marked in the review checklist, not in the site): exact diploma title and years, internship period, and whether "diplômé" is accurate as of today.

- [ ] **Step 5: Locale switch test** — `tests/unit/locale-switch.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/fr/projets/leadboy/' }));

import { LocaleSwitch } from '@/components/locale-switch';

describe('LocaleSwitch', () => {
  it('links to the same page in the other locale', () => {
    render(<LocaleSwitch locale="fr" label="Voir le site en anglais" text="English" />);
    const link = screen.getByRole('link', { name: 'Voir le site en anglais' });
    expect(link).toHaveAttribute('href', '/en/projects/leadboy/');
    expect(link).toHaveAttribute('hreflang', 'en');
  });
});
```

- [ ] **Step 6: Implement** `src/components/locale-switch.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { switchLocalePath } from '@/lib/routes';

export function LocaleSwitch({ locale, label, text }: { locale: Locale; label: string; text: string }) {
  const target: Locale = locale === 'fr' ? 'en' : 'fr';
  return (
    <Link href={switchLocalePath(usePathname(), target)} hrefLang={target} aria-label={label} className="text-sm text-muted transition-colors hover:text-fg">
      {text}
    </Link>
  );
}
```

Run: `npx vitest run tests/unit/locale-switch.test.tsx` — Expected: PASS.

- [ ] **Step 7: Header and footer**

`src/components/site-header.tsx`:

```tsx
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';
import { href, type RouteKey } from '@/lib/routes';
import { LocaleSwitch } from './locale-switch';
import { ThemeToggle } from './theme-toggle';

const NAV_ITEMS: Exclude<RouteKey, 'home'>[] = ['projects', 'about', 'contact'];

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
      <Link href={href(locale, 'home')} className="font-display text-lg tracking-tight">Sailor Vanbercy</Link>
      <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
        {NAV_ITEMS.map((key) => (
          <Link key={key} href={href(locale, key)} className="text-sm text-muted transition-colors hover:text-fg">
            {dict.nav[key]}
          </Link>
        ))}
        <LocaleSwitch locale={locale} label={dict.locale.switchLabel} text={dict.locale.switchTo} />
        <ThemeToggle label={dict.theme.toggle} />
      </nav>
    </header>
  );
}
```

`src/components/site-footer.tsx`:

```tsx
import { profile } from '@content/profile';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionary';

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} {profile.name}. {dict.footer.rights}</p>
        <p className="flex gap-4">
          <a href={`mailto:${profile.contact.email}`} className="hover:text-fg">{dict.contact.email}</a>
          <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
```

On mobile (<640px) the nav items must fit: verify at 360px width in Task 12; if they overflow, hide the "Contact" link text behind the footer and keep projects/about/locale/theme.

- [ ] **Step 8: Build and commit**

Run: `npm test && npm run build` — Expected: PASS, `out/fr/index.html` contains `lang="fr"` and the header.

```bash
git add -A && git commit -m "feat(layout): add locale layout, header, footer, theme and locale switch

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

### Task 8: Shared project components

**Files:**
- Create: `src/components/project-card.tsx`, `src/components/stack-list.tsx`, `src/components/section-heading.tsx`; shadcn `src/components/ui/badge.tsx`, `src/components/ui/dialog.tsx`
- Test: `tests/unit/project-card.test.tsx`, `tests/unit/stack-list.test.tsx`

**Interfaces:**
- Consumes: `Project`, `getSkill`, `href`, `getDictionary`
- Produces: `<ProjectCard project locale variant="large"|"compact" />`, `<StackList project locale />`, `<SectionHeading eyebrow? title />`

- [ ] **Step 1: shadcn** — `npx shadcn@latest init` (style: new-york, base color: neutral, CSS variables: yes; then remap its generated variables to the tokens of Task 6 — keep only what dialog/badge need) and `npx shadcn@latest add dialog badge`.

- [ ] **Step 2: Failing tests** — `tests/unit/stack-list.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StackList } from '@/components/stack-list';
import type { Project } from '@/lib/content/schema';

const project = { stack: { frontend: ['nextjs', 'react'], database: ['postgresql'] } } as unknown as Project;

describe('StackList', () => {
  it('renders one group per non-empty layer with localized headings and skill labels', () => {
    render(<StackList project={project} locale="en" />);
    const frontend = screen.getByRole('group', { name: 'Frontend' });
    expect(within(frontend).getByText('Next.js')).toBeInTheDocument();
    expect(within(frontend).getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Database and ORM' })).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'Backend' })).not.toBeInTheDocument();
  });
});
```

`tests/unit/project-card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/content/schema';

const project = {
  slug: 'smaatch', title: 'Smaatch', category: 'personal', period: '2026',
  pitch: { fr: 'Gestion de clubs', en: 'Club management' },
  stack: { frontend: ['nextjs', 'react', 'tailwindcss', 'typescript'], database: ['postgresql'] },
  images: [{ src: 'projects/smaatch/01-dashboard.webp', alt: { fr: 'Tableau de bord', en: 'Dashboard' }, viewport: 'desktop' }],
} as unknown as Project;

describe('ProjectCard', () => {
  it('links to the localized detail page and shows the localized pitch and cover', () => {
    render(<ProjectCard project={project} locale="en" variant="compact" />);
    expect(screen.getByRole('link', { name: /Smaatch/ })).toHaveAttribute('href', '/en/projects/smaatch/');
    expect(screen.getByText('Club management')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Dashboard' })).toHaveAttribute('src', '/projects/smaatch/01-dashboard.webp');
  });

  it('shows at most 4 skills', () => {
    const many = { ...project, stack: { frontend: ['nextjs', 'react', 'tailwindcss', 'typescript', 'javascript'] } } as unknown as Project;
    render(<ProjectCard project={many} locale="en" variant="compact" />);
    expect(screen.getAllByTestId('skill-chip')).toHaveLength(4);
  });
});
```

Run: FAIL (modules missing).

- [ ] **Step 3: Implement** `src/components/stack-list.tsx`:

```tsx
import { STACK_LAYERS, type Project } from '@/lib/content/schema';
import { getSkill } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { Badge } from './ui/badge';

export function StackList({ project, locale }: { project: Project; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {STACK_LAYERS.filter((layer) => project.stack[layer]?.length).map((layer) => {
        const headingId = `stack-${layer}`;
        return (
          <div key={layer} role="group" aria-labelledby={headingId}>
            <h3 id={headingId} className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{dict.project.layers[layer]}</h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack[layer]!.map((id) => (
                <li key={id}><Badge variant="outline">{getSkill(id).label}</Badge></li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
```

`src/components/project-card.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/content/schema';
import { getSkill } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { href } from '@/lib/routes';

const MAX_CARD_SKILLS = 4;
const COVER_SIZE = { width: 1600, height: 1000 } as const;

export function ProjectCard({ project, locale, variant }: { project: Project; locale: Locale; variant: 'large' | 'compact' }) {
  const dict = getDictionary(locale);
  const cover = project.images.find((i) => i.viewport === 'desktop') ?? project.images[0];
  const skills = [...new Set(Object.values(project.stack).flat())].slice(0, MAX_CARD_SKILLS);
  return (
    <article className="group">
      <Link href={href(locale, 'projects', project.slug)} className="block">
        <div className={`overflow-hidden rounded-lg border border-border bg-card aspect-[16/10]`}>
          <Image
            src={`/${cover.src}`}
            alt={cover.alt[locale]}
            {...COVER_SIZE}
            className={`size-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none ${cover.viewport === 'mobile' ? 'object-contain' : 'object-cover object-top'}`}
            sizes={variant === 'large' ? '(min-width: 1024px) 1024px, 100vw' : '(min-width: 640px) 50vw, 100vw'}
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className={`font-display ${variant === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{project.title}</h3>
          <span className="shrink-0 text-xs text-muted">{dict.projects.category[project.category]} · {project.period}</span>
        </div>
        <p className="mt-2 text-muted">{project.pitch[locale]}</p>
      </Link>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
        {skills.map((id) => (
          <li key={id} data-testid="skill-chip" className="rounded-full border border-border px-2 py-0.5">{getSkill(id).label}</li>
        ))}
      </ul>
    </article>
  );
}
```

`src/components/section-heading.tsx`:

```tsx
export function SectionHeading({ eyebrow, title, as: Tag = 'h2' }: { eyebrow?: string; title: string; as?: 'h1' | 'h2' }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">{eyebrow}</p>}
      <Tag className={`font-display tracking-tight ${Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{title}</Tag>
    </div>
  );
}
```

Note: tests use real skill ids (`nextjs`, `react`, `tailwindcss`, `typescript`, `javascript`, `postgresql`) present in `content/skills.ts`.

- [ ] **Step 4: Run tests** — `npx vitest run tests/unit/stack-list.test.tsx tests/unit/project-card.test.tsx` — Expected: PASS.

- [ ] **Step 5: Commit** — `feat(ui): add project card, stack list and section heading`.

### Task 9: Home page

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Test: covered by e2e in Task 12

**Interfaces:**
- Consumes: `getFeatured`, `getProjects`, `profile`, `ProjectCard`, `SectionHeading`, `href`

- [ ] **Step 1: Implement**

```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profile } from '@content/profile';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { getFeatured, getProjects } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import { isLocale } from '@/lib/i18n';
import { href } from '@/lib/routes';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const featured = getFeatured();
  const others = getProjects().filter((p) => !p.featured);

  return (
    <>
      <section className="reveal py-16 sm:py-24">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">{dict.home.eyebrow}</p>
        <h1 className="font-display text-5xl tracking-tight sm:text-7xl">{profile.name}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{profile.headline[locale]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.contact.cv} download className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg">{dict.home.downloadCv}</a>
          <Link href={href(locale, 'contact')} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium">{dict.home.contactMe}</Link>
        </div>
      </section>

      <section aria-labelledby="featured" className="py-12">
        <div id="featured"><SectionHeading title={dict.home.featured} /></div>
        <div className="grid gap-16">
          {featured.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} variant="large" />)}
        </div>
      </section>

      <section className="py-12">
        <SectionHeading title={dict.home.others} />
        <div className="grid gap-12 sm:grid-cols-2">
          {others.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} variant="compact" />)}
        </div>
        <Link href={href(locale, 'projects')} className="mt-12 inline-block text-sm font-medium underline underline-offset-4">{dict.home.allProjects}</Link>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Visual check** — `npm run dev`, open `/fr/` and `/en/` at 1440 and 390 widths with Playwright MCP, screenshot, inspect: hierarchy, spacing, images not stretched, no horizontal scroll.

- [ ] **Step 3: Commit** — `feat(home): add hero, featured and other projects`.

### Task 10: Section pages (projects list, about, contact) and project detail with gallery

**Files:**
- Create: `src/app/[locale]/[section]/page.tsx`, `src/app/[locale]/[section]/[slug]/page.tsx`, `src/components/project-filters.tsx`, `src/components/project-gallery.tsx`, `src/components/skills-tree.tsx`, `src/components/timeline.tsx`, `src/components/projects-view.tsx`, `src/components/about-view.tsx`, `src/components/contact-view.tsx`
- Test: `tests/unit/project-filters.test.tsx`, `tests/unit/project-gallery.test.tsx`

**Interfaces:**
- Consumes: `sectionParams`, `resolveSection`, `getProjects`, `getProject`, `getAdjacent`, `getSkills`, `buildSkillsTree`, `StackList`, `ProjectCard`
- Produces: static pages for 6 section routes and 26 project routes (13 x 2)

- [ ] **Step 1: Failing filter test** — `tests/unit/project-filters.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { filterProjects } from '@/components/project-filters';
import type { Project } from '@/lib/content/schema';

const p = (slug: string, category: Project['category'], ids: string[]) => ({ slug, category, stack: { frontend: ids } }) as unknown as Project;
const projects = [p('a', 'professional', ['react']), p('b', 'academic', ['java']), p('c', 'academic', ['react', 'java'])];

describe('filterProjects', () => {
  it('returns all projects with no filter', () => {
    expect(filterProjects(projects, {}).map((x) => x.slug)).toEqual(['a', 'b', 'c']);
  });
  it('filters by category', () => {
    expect(filterProjects(projects, { category: 'academic' }).map((x) => x.slug)).toEqual(['b', 'c']);
  });
  it('filters by skill', () => {
    expect(filterProjects(projects, { skill: 'react' }).map((x) => x.slug)).toEqual(['a', 'c']);
  });
  it('combines category and skill', () => {
    expect(filterProjects(projects, { category: 'academic', skill: 'react' }).map((x) => x.slug)).toEqual(['c']);
  });
});
```

- [ ] **Step 2: Implement** `src/components/project-filters.tsx` (exports the pure `filterProjects` plus the client UI):

```tsx
'use client';

import { useMemo, useState } from 'react';
import { PROJECT_CATEGORIES, type Project, type Skill } from '@/lib/content/schema';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { ProjectCard } from './project-card';

type Category = (typeof PROJECT_CATEGORIES)[number];
export interface ProjectFilter { category?: Category; skill?: string }

export function filterProjects(projects: Project[], { category, skill }: ProjectFilter): Project[] {
  return projects.filter(
    (p) => (!category || p.category === category) && (!skill || Object.values(p.stack).flat().includes(skill)),
  );
}

export function ProjectFilters({ projects, skills, locale, dict }: { projects: Project[]; skills: Skill[]; locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<ProjectFilter>({});
  const visible = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  const usedSkills = useMemo(() => {
    const used = new Set(projects.flatMap((p) => Object.values(p.stack).flat()));
    return skills.filter((s) => used.has(s.id)).sort((a, b) => a.label.localeCompare(b.label));
  }, [projects, skills]);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${active ? 'border-fg bg-fg text-bg' : 'border-border text-muted hover:text-fg'}`;

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={dict.projects.title}>
        <button type="button" aria-pressed={!filter.category} className={chip(!filter.category)} onClick={() => setFilter((f) => ({ ...f, category: undefined }))}>{dict.projects.filterAll}</button>
        {PROJECT_CATEGORIES.map((c) => (
          <button key={c} type="button" aria-pressed={filter.category === c} className={chip(filter.category === c)} onClick={() => setFilter((f) => ({ ...f, category: c }))}>
            {dict.projects.category[c]}
          </button>
        ))}
      </div>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <label htmlFor="skill-filter" className="text-sm text-muted">{dict.projects.filterByTech}</label>
        <select id="skill-filter" value={filter.skill ?? ''} onChange={(e) => setFilter((f) => ({ ...f, skill: e.target.value || undefined }))} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm">
          <option value="">{dict.projects.filterAll}</option>
          {usedSkills.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        {(filter.category || filter.skill) && (
          <button type="button" className="text-sm underline underline-offset-4" onClick={() => setFilter({})}>{dict.projects.clearFilter}</button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length}</p>
      {visible.length === 0 ? (
        <p className="text-muted">{dict.projects.empty}</p>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2">
          {visible.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} variant="compact" />)}
        </div>
      )}
    </>
  );
}
```

Note: `ProjectCard` uses `getSkill` (imports content) — allowed in a client component since content is static data bundled at build.

Run: `npx vitest run tests/unit/project-filters.test.tsx` — Expected: PASS.

- [ ] **Step 3: Failing gallery test** — `tests/unit/project-gallery.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectGallery } from '@/components/project-gallery';
import type { ProjectImage } from '@/lib/content/schema';

const img = (n: number, viewport: 'desktop' | 'mobile' = 'desktop'): ProjectImage => ({
  src: `projects/demo/0${n}-x.webp`, alt: { fr: `Image ${n}`, en: `Image ${n}` }, viewport,
});
const labels = { close: 'Close', previous: 'Previous', next: 'Next', imageOf: 'Image {i} of {n}' };

describe('ProjectGallery', () => {
  it('opens the lightbox and navigates with arrow keys, wrapping around', () => {
    render(<ProjectGallery images={[img(1), img(2), img(3)]} locale="en" labels={labels} />);
    fireEvent.click(screen.getAllByRole('button', { name: /Image 1/ })[0]);
    expect(screen.getByText('Image 1 of 3')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' });
    expect(screen.getByText('Image 2 of 3')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' });
    expect(screen.getByText('Image 3 of 3')).toBeInTheDocument();
  });

  it('hides previous/next controls for a single image', () => {
    render(<ProjectGallery images={[img(1, 'mobile')]} locale="en" labels={labels} />);
    fireEvent.click(screen.getByRole('button', { name: /Image 1/ }));
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('renders mobile screenshots with object-contain to avoid stretching', () => {
    render(<ProjectGallery images={[img(1, 'mobile')]} locale="en" labels={labels} />);
    expect(screen.getByRole('img', { name: 'Image 1' })).toHaveClass('object-contain');
  });
});
```

- [ ] **Step 4: Implement** `src/components/project-gallery.tsx`:

```tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectImage } from '@/lib/content/schema';
import { format } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

interface GalleryLabels { close: string; previous: string; next: string; imageOf: string }
const SIZE = { desktop: { width: 1600, height: 1000 }, mobile: { width: 780, height: 1688 } } as const;

export function ProjectGallery({ images, locale, labels }: { images: ProjectImage[]; locale: Locale; labels: GalleryLabels }) {
  const [index, setIndex] = useState<number | null>(null);
  const count = images.length;
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count));
  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.src} className={image.viewport === 'mobile' ? 'justify-self-center' : ''}>
            <button type="button" onClick={() => setIndex(i)} aria-label={image.alt[locale]} className="block overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src={`/${image.src}`}
                alt={image.alt[locale]}
                {...SIZE[image.viewport]}
                sizes="(min-width: 640px) 50vw, 100vw"
                className={image.viewport === 'mobile' ? 'max-h-[520px] w-auto object-contain' : 'h-auto w-full object-cover'}
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={current !== null} onOpenChange={(open) => !open && setIndex(null)}>
        {current && index !== null && (
          <DialogContent
            className="max-w-[min(96vw,1600px)] border-border bg-bg p-4"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1);
              if (e.key === 'ArrowLeft') step(-1);
            }}
          >
            <DialogTitle className="text-sm text-muted">{format(labels.imageOf, { i: index + 1, n: count })}</DialogTitle>
            <Image src={`/${current.src}`} alt={current.alt[locale]} {...SIZE[current.viewport]} className="max-h-[80vh] w-full object-contain" />
            <p className="text-sm text-muted">{current.alt[locale]}</p>
            {count > 1 && (
              <div className="flex justify-between">
                <button type="button" onClick={() => step(-1)} className="rounded-full border border-border px-4 py-1.5 text-sm">{labels.previous}</button>
                <button type="button" onClick={() => step(1)} className="rounded-full border border-border px-4 py-1.5 text-sm">{labels.next}</button>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
```

The shadcn `DialogContent` already renders a close button; set its `sr-only` text to `labels.close` (add a `closeLabel` prop to the generated `dialog.tsx`).

Run: `npx vitest run tests/unit/project-gallery.test.tsx` — Expected: PASS.

- [ ] **Step 5: Skills tree and timeline components**

`src/components/skills-tree.tsx`:

```tsx
import Link from 'next/link';
import type { SkillGroup } from '@/lib/skills-tree';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { href } from '@/lib/routes';

export function SkillsTree({ groups, locale, dict }: { groups: SkillGroup[]; locale: Locale; dict: Dictionary }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {groups.map((group) => (
        <section key={group.category} aria-labelledby={`skills-${group.category}`}>
          <h3 id={`skills-${group.category}`} className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">{dict.skillCategory[group.category]}</h3>
          <ul className="space-y-2">
            {group.skills.map(({ skill, projects }) => (
              <li key={skill.id}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                    <span>{skill.label}</span>
                    <span className="text-xs text-muted">{projects.length}</span>
                  </summary>
                  <p className="mt-1 text-sm text-muted">
                    {dict.about.usedIn}{' '}
                    {projects.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && ', '}
                        <Link href={href(locale, 'projects', p.slug)} className="underline underline-offset-2 hover:text-fg">{p.title}</Link>
                      </span>
                    ))}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

`src/components/timeline.tsx`:

```tsx
import type { Locale } from '@/lib/i18n';
import { profile } from '@content/profile';

export function Timeline({ locale }: { locale: Locale }) {
  return (
    <ol className="space-y-8 border-l border-border pl-6">
      {profile.timeline.map((item) => (
        <li key={item.period} className="relative">
          <span aria-hidden="true" className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-accent" />
          <p className="text-xs text-muted">{item.period}</p>
          <h3 className="mt-1 font-medium">{item.title[locale]}</h3>
          <p className="mt-1 text-muted">{item.text[locale]}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 6: Section views** — `src/components/projects-view.tsx`, `about-view.tsx`, `contact-view.tsx` (server components):

```tsx
// projects-view.tsx
import { ProjectFilters } from './project-filters';
import { SectionHeading } from './section-heading';
import { getProjects, getSkills } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';

export function ProjectsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="py-16">
      <SectionHeading as="h1" title={dict.projects.title} />
      <p className="-mt-4 mb-10 max-w-2xl text-muted">{dict.projects.intro}</p>
      <ProjectFilters projects={getProjects()} skills={getSkills()} locale={locale} dict={dict} />
    </section>
  );
}
```

```tsx
// about-view.tsx
import { profile } from '@content/profile';
import { SectionHeading } from './section-heading';
import { SkillsTree } from './skills-tree';
import { Timeline } from './timeline';
import { getProjects, getSkills } from '@/lib/content/queries';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';
import { buildSkillsTree } from '@/lib/skills-tree';

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="py-16">
      <SectionHeading as="h1" eyebrow={profile.title[locale]} title={dict.about.title} />
      <section aria-label={dict.about.profile} className="max-w-2xl space-y-4 text-lg leading-relaxed">
        {profile.bio[locale].map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
      </section>
      <section className="mt-20"><SectionHeading title={dict.about.journey} /><Timeline locale={locale} /></section>
      <section className="mt-20"><SectionHeading title={dict.about.skills} /><SkillsTree groups={buildSkillsTree(getProjects(), getSkills())} locale={locale} dict={dict} /></section>
    </div>
  );
}
```

```tsx
// contact-view.tsx
import { profile } from '@content/profile';
import { SectionHeading } from './section-heading';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n';

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    { label: dict.contact.email, value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { label: dict.contact.phone, value: profile.contact.phone, href: profile.contact.phoneHref },
    { label: dict.contact.github, value: profile.contact.githubHandle, href: profile.contact.github, external: true },
  ];
  return (
    <section className="py-16">
      <SectionHeading as="h1" title={dict.contact.title} />
      <p className="-mt-4 mb-10 max-w-2xl text-muted">{dict.contact.intro}</p>
      <ul className="divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-baseline justify-between gap-4 py-5 hover:text-accent">
              <span className="text-sm text-muted">{item.label}</span>
              <span className="text-lg">{item.value}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={profile.contact.cv} download className="mt-10 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg">{dict.home.downloadCv}</a>
    </section>
  );
}
```

- [ ] **Step 7: Section route** — `src/app/[locale]/[section]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutView } from '@/components/about-view';
import { ContactView } from '@/components/contact-view';
import { ProjectsView } from '@/components/projects-view';
import { getDictionary } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { resolveSection, sectionParams } from '@/lib/routes';

type Params = Promise<{ locale: string; section: string }>;

export const dynamicParams = false;
export const generateStaticParams = () => sectionParams();

function resolve(locale: string, section: string) {
  if (!isLocale(locale)) return undefined;
  const key = resolveSection(locale, section);
  return key ? { locale: locale as Locale, key } : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, section } = await params;
  const route = resolve(locale, section);
  if (!route) return {};
  const dict = getDictionary(route.locale);
  const titles = { projects: dict.projects.title, about: dict.about.title, contact: dict.contact.title };
  return { title: titles[route.key] };
}

export default async function SectionPage({ params }: { params: Params }) {
  const { locale, section } = await params;
  const route = resolve(locale, section);
  if (!route) notFound();
  const views = { projects: ProjectsView, about: AboutView, contact: ContactView };
  const View = views[route.key];
  return <View locale={route.locale} />;
}
```

- [ ] **Step 8: Project detail route** — `src/app/[locale]/[section]/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectGallery } from '@/components/project-gallery';
import { StackList } from '@/components/stack-list';
import { getAdjacent, getProject, getProjects } from '@/lib/content/queries';
import { format, getDictionary } from '@/lib/dictionary';
import { LOCALES, isLocale } from '@/lib/i18n';
import { href, resolveSection } from '@/lib/routes';

type Params = Promise<{ locale: string; section: string; slug: string }>;

export const dynamicParams = false;
export const generateStaticParams = () =>
  LOCALES.flatMap((locale) =>
    getProjects().map((p) => ({ locale, section: href(locale, 'projects').split('/')[2], slug: p.slug })),
  );

async function load(params: Params) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale) || resolveSection(locale, section) !== 'projects') return undefined;
  const project = getProject(slug);
  return project ? { locale, project } : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { locale, project } = data;
  const cover = `/${project.images[0].src}`;
  return {
    title: project.title,
    description: project.pitch[locale],
    alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, href(l, 'projects', project.slug)])) },
    openGraph: { title: project.title, description: project.pitch[locale], images: [cover] },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) notFound();
  const { locale, project } = data;
  const dict = getDictionary(locale);
  const { previous, next } = getAdjacent(project.slug);
  const team = project.team.solo ? dict.project.solo : format(dict.project.teamOf, { n: project.team.size ?? 2 });

  return (
    <article className="py-16">
      <header className="reveal">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">{dict.projects.category[project.category]}</p>
        <h1 className="font-display text-4xl tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.pitch[locale]}</p>
        <dl className="mt-8 grid grid-cols-1 gap-4 border-y border-border py-6 text-sm sm:grid-cols-3">
          <div><dt className="text-muted">{dict.project.period}</dt><dd>{project.period}</dd></div>
          <div><dt className="text-muted">{dict.project.team}</dt><dd>{team}</dd></div>
          <div><dt className="text-muted">{dict.project.role}</dt><dd>{project.role[locale]}</dd></div>
        </dl>
      </header>

      <div className="mt-16 grid gap-16">
        <section><h2 className="mb-4 font-display text-2xl">{dict.project.context}</h2><p className="max-w-3xl leading-relaxed">{project.context[locale]}</p></section>
        <section>
          <h2 className="mb-4 font-display text-2xl">{dict.project.features}</h2>
          <ul className="max-w-3xl list-disc space-y-2 pl-5">{project.features[locale].map((f) => <li key={f}>{f}</li>)}</ul>
        </section>
        <section><h2 className="mb-4 font-display text-2xl">{dict.project.architecture}</h2><p className="max-w-3xl leading-relaxed">{project.architecture[locale]}</p></section>
        <section><h2 className="mb-6 font-display text-2xl">{dict.project.stack}</h2><StackList project={project} locale={locale} /></section>
        <section>
          <h2 className="mb-6 font-display text-2xl">{dict.project.gallery}</h2>
          <ProjectGallery images={project.images} locale={locale} labels={{ close: dict.project.close, previous: dict.project.previous, next: dict.project.next, imageOf: dict.project.imageOf }} />
        </section>
        {project.links && (
          <section className="flex gap-4">
            {project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{dict.project.repo}</a>}
            {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{dict.project.demo}</a>}
          </section>
        )}
      </div>

      <nav aria-label={dict.nav.projects} className="mt-24 flex justify-between gap-4 border-t border-border pt-8 text-sm">
        {previous ? <Link href={href(locale, 'projects', previous.slug)}>&larr; {previous.title}</Link> : <span />}
        {next ? <Link href={href(locale, 'projects', next.slug)}>{next.title} &rarr;</Link> : <span />}
      </nav>
    </article>
  );
}
```

`section` for detail pages must only be the projects segment of each locale, so `generateStaticParams` yields `projets` for FR and `projects` for EN; `/fr/a-propos/leadboy/` is never generated (404).

- [ ] **Step 9: Build and visual check**

Run: `npm test && npm run build`
Expected: PASS; `out/fr/projets/leadboy/index.html`, `out/en/projects/leadboy/index.html`, `out/fr/a-propos/index.html` exist; `out/fr/projects/` does not exist.

Visual pass with Playwright MCP at 1440 and 390 on: projects list (apply a filter), one detail page per category, about (expand a skill), contact. Fix layout issues found.

- [ ] **Step 10: Commit** — `feat(pages): add projects list with filters, project detail with gallery, about and contact`.

### Task 11: SEO — sitemap, robots, Open Graph defaults

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/site.ts`
- Modify: `src/app/[locale]/page.tsx` and section page metadata to add `alternates.languages`
- Test: `tests/unit/sitemap.test.ts`

**Interfaces:**
- Produces: `SITE_URL`, `allLocalizedPaths(): string[]`

- [ ] **Step 1: Failing test** — `tests/unit/sitemap.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { allLocalizedPaths } from '@/lib/site';
import { getProjects } from '@/lib/content/queries';

describe('allLocalizedPaths', () => {
  it('lists home, sections and every project in both locales', () => {
    const paths = allLocalizedPaths();
    const expected = 2 * (1 + 3 + getProjects().length);
    expect(paths).toHaveLength(expected);
    expect(paths).toContain('/fr/');
    expect(paths).toContain('/en/about/');
    expect(new Set(paths).size).toBe(paths.length);
  });
});
```

- [ ] **Step 2: Implement** `src/lib/site.ts`:

```ts
import { getProjects } from './content/queries';
import { LOCALES } from './i18n';
import { href } from './routes';

export const SITE_URL = 'https://portfolio-sailor.vercel.app';

export function allLocalizedPaths(): string[] {
  return LOCALES.flatMap((locale) => [
    href(locale, 'home'),
    href(locale, 'projects'),
    href(locale, 'about'),
    href(locale, 'contact'),
    ...getProjects().map((p) => href(locale, 'projects', p.slug)),
  ]);
}
```

(Replace `SITE_URL` with the real domain confirmed with the user; use it in `[locale]/layout.tsx` `metadataBase`.)

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL, allLocalizedPaths } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return allLocalizedPaths().map((path) => ({ url: `${SITE_URL}${path}` }));
}
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
```

- [ ] **Step 3: Run** `npm test && npm run build` — Expected: PASS, `out/sitemap.xml` lists 2 x (4 + 13) = 34 URLs.

- [ ] **Step 4: Commit** — `feat(seo): add sitemap, robots and hreflang alternates`.

---

## Phase 4 — Verification and delivery

### Task 12: End-to-end tests

**Files:**
- Create: `tests/e2e/navigation.spec.ts`, `tests/e2e/assets.spec.ts`, `tests/e2e/theme.spec.ts`

- [ ] **Step 1: Write the e2e tests** — `tests/e2e/navigation.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('root redirects to French home', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/(fr|en)\/$/);
});

test('language switch keeps the same project', async ({ page }) => {
  await page.goto('/fr/projets/leadboy/');
  await page.getByRole('link', { name: 'Voir le site en anglais' }).click();
  await expect(page).toHaveURL('/en/projects/leadboy/');
  await expect(page.getByRole('heading', { level: 1, name: 'LeadBoy' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

for (const path of ['/fr/projects/', '/en/projets/leadboy/', '/fr/projets/does-not-exist/', '/de/']) {
  test(`unknown route ${path} returns the 404 page`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /Page introuvable/ })).toBeVisible();
  });
}

test('every internal link resolves', async ({ page, request }) => {
  const visited = new Set<string>();
  const queue = ['/fr/', '/en/'];
  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const links = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    links.filter((l) => !l.endsWith('.pdf')).forEach((l) => queue.push(l));
  }
  expect((await request.get('/cv-vanbercy-sailor.pdf')).status()).toBe(200);
  expect(visited.size).toBeGreaterThanOrEqual(34);
});

test('project filter by category narrows the list', async ({ page }) => {
  await page.goto('/fr/projets/');
  const cards = page.locator('article');
  const total = await cards.count();
  await page.getByRole('button', { name: 'Professionnel' }).click();
  const filtered = await cards.count();
  expect(filtered).toBeGreaterThan(0);
  expect(filtered).toBeLessThan(total);
});

test('gallery opens and navigates with the keyboard', async ({ page }) => {
  await page.goto('/en/projects/smaatch/');
  await page.locator('main ul button').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText(/Image 1 of \d+/);
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText(/Image 2 of \d+/);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('no horizontal scroll on any main page', async ({ page }) => {
  for (const path of ['/fr/', '/fr/projets/', '/fr/a-propos/', '/fr/contact/', '/fr/projets/leadboy/']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
```

Note on 404: `serve` returns 404 with `out/404.html` for unknown paths; verify the not-found page renders there. If `serve` does not use `404.html` automatically, add `serve.json` at `out/` via a `postbuild` step or use `npx serve out --single false`; check behaviour once and adapt the `start` script.

`tests/e2e/assets.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('all images on project pages load', async ({ page }) => {
  await page.goto('/fr/projets/');
  const slugs = await page.locator('article a').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')!))]);
  for (const slug of slugs) {
    await page.goto(slug);
    const broken = await page.locator('img').evaluateAll((imgs) =>
      (imgs as HTMLImageElement[]).filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
    );
    expect(broken, slug).toEqual([]);
  }
});
```

`tests/e2e/theme.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('dark preference applies before first paint', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  const themes: string[] = [];
  await page.exposeFunction('recordTheme', (t: string) => themes.push(t));
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => (window as unknown as { recordTheme: (t: string) => void }).recordTheme(document.documentElement.dataset.theme ?? 'none'));
  });
  await page.goto('/fr/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(themes[0]).toBe('dark');
  await context.close();
});

test('theme toggle persists across navigation', async ({ page }) => {
  await page.goto('/fr/');
  const initial = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: 'Changer de thème' }).click();
  await page.goto('/fr/a-propos/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', initial!);
});

test('reduced motion disables reveal animations', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/fr/');
  const animation = await page.locator('.reveal').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe('none');
  await context.close();
});
```

- [ ] **Step 2: Run** `npm run test:e2e`
Expected: all PASS on desktop and mobile projects. Fix failures in the owning component (not in tests) unless the test is wrong.

- [ ] **Step 3: Commit** — `test(e2e): cover navigation, i18n, 404, assets, theme and motion`.

### Task 13: Quality gate

- [ ] **Step 1:** Remove `it.skipIf(...)` in `tests/unit/content.test.ts` (all 13 projects exist). Run `npm test` -> PASS.
- [ ] **Step 2:** `npm run lint` -> no errors. `npx tsc --noEmit` -> no errors.
- [ ] **Step 3:** Lighthouse via chrome-devtools MCP (`lighthouse_audit`) on `http://localhost:3100/fr/` and `/fr/projets/leadboy/`, mobile and desktop. Expected: Performance >= 95, Accessibility >= 95. Fix (image `sizes`, `priority` on hero cover, contrast) until met.
- [ ] **Step 4:** Content proofreading pass: read every project page FR and EN in the browser; check no emojis (`grep -rP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" content src` returns nothing), no placeholders (`grep -rn "\.\.\." content/projects` returns nothing), no real personal data in any screenshot (re-inspect all WebP files).
- [ ] **Step 5:** Commit — `chore: finalize quality gate`.

### Task 14: User review and delivery

- [ ] **Step 1:** `npm run build && npm run start`; give the user `http://localhost:3100/fr/` and a review checklist:
  - profile facts: diploma title and years, internship period, "diplômé" wording
  - project categories (Smaatch, Job Tracker, Arborescence = Personal)
  - per project: role and team size, any project the user does not want public
  - production domain for `SITE_URL`
- [ ] **Step 2:** Apply feedback, re-run `npm test && npm run test:e2e`, commit each change (`fix(content): ...`).
- [ ] **Step 3:** Only on explicit approval: push branch, open PR (body ends with the Claude Code attribution line), merge to `main`, verify the Vercel deployment (open production URL, run the navigation e2e against it with `baseURL` override).
- [ ] **Step 4:** Update memory (`project_portfolio.md`) with the new stack, URL and how to add a project.
