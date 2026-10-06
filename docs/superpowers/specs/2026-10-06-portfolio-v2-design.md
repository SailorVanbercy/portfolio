# Portfolio v2 — Design Spec

- **Date:** 2026-10-06
- **Branch:** `feat/portfolio-v2`
- **Status:** Approved in brainstorming, pending written-spec review

## 1. Goal

Rebuild Sailor Vanbercy's portfolio from scratch to **land a full-stack developer job**.
The target reader is a recruiter or tech lead who scans in under two minutes, then
drills into one or two projects to judge technical depth.

Success criteria:

- Profile positioned as **Junior Full-Stack Developer**, explicitly mentioning the
  internship at Indigo Studio where AI tooling (Claude Code, etc.) was integrated
  into the development workflow. No mention of the master's degree.
- 13 project pages, each with real screenshots, a detailed write-up and an
  exhaustive, per-layer technology list.
- A skills tree derived automatically from project data (every skill links to the
  projects that prove it).
- Fully bilingual FR (default) / EN.
- Lighthouse Performance and Accessibility >= 95 on home and a project page.

## 2. Project scope

| # | Slug | Project | Source location | Category | Featured |
|---|------|---------|-----------------|----------|----------|
| 1 | `leadboy` | LeadBoy (TFE) | `C:\MonPc\indigo-studio\LeadBoy` | Professional | yes |
| 2 | `smaatch` | Smaatch (web + mobile) | `C:\Users\sailo\Smaatch`, `C:\Users\sailo\smaatch-mobile` | Personal | yes |
| 3 | `tetris-formation` | Tetris Formation | `C:\MonPc\indigo-studio\tetris-formation` | Professional | yes |
| 4 | `plan-financier` | Plan Financier | `C:\MonPc\indigo-studio\App-Formation` | Professional | no |
| 5 | `job-tracker` | Job Tracker | `C:\MonPc\sites\job-tracker` | Personal | no |
| 6 | `arborescence` | Arborescence | `C:\MonPc\Arborescence` | Personal | no |
| 7 | `the-lost-grimoire` | The Lost Grimoire | `HELHA\Bac 3\AEMT\Hackathon` | Academic | no |
| 8 | `cliniktime` | ClinikTime | `HELHA\Bac 3\Projet\ClinikTime` | Academic | no |
| 9 | `foodsnap` | FoodSnap | `C:\MonPc\ecole\FoodSnap` + `HELHA\Bac 3\TM\Projet\Backend` | Academic | no |
| 10 | `zombie-high-school` | Zombie High School | `HELHA\Bac 3\devJeu\ZombieHighSchoolBrainrot` | Academic | no |
| 11 | `adresseur-ip` | Adresseur IP | `HELHA\Bac 3\Reseau\python\ProjetReseau` | Academic | no |
| 12 | `emilien` | Are You the New Emilien ? | `HELHA\Bac 2\Q2\Projet` + `POO_Eclipse` | Academic | no |
| 13 | `moit-moit` | Moit-Moit | `HELHA\Bac 2\Q2\TI\Projet TM` | Academic | no |

Removed from v1: Gestion de Cinéma (C), Gestion d'étudiants (VBA).
Two mappings are inferred and must be confirmed while analysing the code: the
Hackathon folder is The Lost Grimoire, and the Smaatch / Job Tracker / Arborescence
category ("Personal") — reclassified if the code or user says otherwise.

## 3. Hard constraints

- **Source projects are read-only.** No edits, no commits, no config changes in any
  source repo. Installing dependencies (`npm ci`, `node_modules`) is allowed.
  Any temporary file (Docker compose overrides, seeds, scripts) lives in the
  session scratchpad.
- **Secrets:** `.env` files are never read, printed or copied. Files that look like
  credentials (e.g. `mdp mcdo account.txt`, Moit-Moit host file) are never opened.
- **No real personal data in screenshots.** Supabase-backed apps run against a
  local Supabase (`supabase start` via Docker) with the repo migrations and a
  fictional demo seed written in the scratchpad.
- **No emojis** anywhere (UI, code, commits, content).
- Code, comments and technical docs in English; site content FR + EN.

## 4. Site architecture

### 4.1 Stack

- Next.js (App Router, latest stable), TypeScript strict
- Tailwind CSS + shadcn/ui (Badge, Dialog, Tabs — only what is used)
- Static export (`output: 'export'`), deployed on the existing Vercel project
- Zod for content validation at build time
- Vitest + Testing Library (unit), Playwright (e2e)
- The Angular app is removed entirely on this branch (no coexistence)

### 4.2 Routes

All routes are prefixed with the locale: `/fr/...` and `/en/...`. `/` redirects to
`/fr` (static redirect page + `vercel.json` redirect).

| Route | Content |
|-------|---------|
| `/[locale]` | Hero (name, title, pitch, CTA CV/contact), 3 featured projects large, remaining projects list |
| `/[locale]/projets` (`/en/projects`) | Full list, filter by category (Professional / Personal / Academic) and by technology |
| `/[locale]/projets/[slug]` | Project detail (see 4.4) |
| `/[locale]/a-propos` (`/en/about`) | Profile, timeline, skills tree |
| `/[locale]/contact` | Email, LinkedIn, GitHub, CV download |

Localized path segments are mapped in a single `routes.ts` dictionary.

### 4.3 Visual direction — "sober editorial"

- Neutral background, light and dark themes (system preference + toggle)
- One accent color, strong typography (a display font for headings, a readable
  sans for body), generous spacing
- Screenshots carry the visual weight; UI chrome stays minimal
- Subtle motion only (fade/translate on scroll, respects `prefers-reduced-motion`)
- Mobile-first, 16px gutters, no horizontal scroll

### 4.4 Project detail layout

1. Title, one-line pitch, category, period, team/solo, role
2. Hero screenshot
3. Context and problem solved
4. Key features (bullets)
5. Architecture (short text, optional simple diagram)
6. Tech stack grouped by layer: Frontend, Backend, Database/ORM, Security,
   Architecture, Infrastructure/DevOps, Testing, Tooling, AI (when relevant) —
   including frameworks, libraries and tools, not only languages (see 4.5)
7. Screenshot gallery (lightbox via Dialog, keyboard navigable)
8. Links (repo/demo when public), previous/next project

### 4.5 Content model

```
content/
  skills.ts            # single skills registry
  projects/
    <slug>.ts          # one file per project
  profile.ts           # bio, timeline, contact (FR/EN)
```

```ts
type Locale = 'fr' | 'en';
type Localized<T = string> = Record<Locale, T>;

type SkillCategory =
  | 'language' | 'frontend' | 'backend' | 'database' | 'orm'
  | 'security' | 'architecture' | 'devops' | 'testing' | 'ai'
  | 'tooling' | 'mobile' | 'desktop' | 'methodology';

interface Skill {
  id: string;              // e.g. 'nextjs'
  label: string;           // e.g. 'Next.js'
  category: SkillCategory;
}

type StackLayer =
  | 'frontend' | 'backend' | 'database' | 'security' | 'architecture'
  | 'infrastructure' | 'testing' | 'tooling' | 'ai' | 'mobile' | 'desktop';

interface Project {
  slug: string;
  title: string;
  pitch: Localized;
  category: 'professional' | 'personal' | 'academic';
  period: string;          // e.g. '2025-2026'
  team: { solo: boolean; size?: number };
  role: Localized;
  context: Localized;
  features: Localized<string[]>;
  architecture: Localized;
  stack: Partial<Record<StackLayer, string[]>>; // skill ids, validated against registry
  images: { src: string; alt: Localized; viewport: 'desktop' | 'mobile' }[];
  links?: { repo?: string; demo?: string };
  featured: boolean;
  order: number;
}
```

Zod validates every project at build time; an unknown skill id or a missing image
file fails the build.

**Skill granularity — job-market oriented.** The registry is not limited to
programming languages. Every tool a recruiter may search for is extracted from the
code and dependency manifests and listed, for example:

- Frameworks and libraries: Spring Boot, Spring Security, Spring Data, React Router,
  TanStack Query, Zustand, Expo Router, RxJS, Entity Framework Core
- ORMs / data access: JPA, Hibernate, Prisma, Drizzle, Supabase client, PDO
- Security: JWT, OAuth, bcrypt, Row Level Security, Zod/validation, CORS, rate limiting
- Architecture and patterns: REST API, MVC, layered/repository architecture,
  design patterns actually implemented (Observer, Strategy, State, Factory...),
  WebSockets, i18n
- DevOps and infrastructure: Docker, Docker Compose, VPS, Vercel, CI, Nginx
- Testing: Vitest, Jest, Playwright, JUnit, Mockito, Karma/Jasmine
- Tooling: Git, Maven/Gradle, CMake, Postman/OpenAPI, Figma
- AI: Claude API / Claude Code, OpenAI API, prompt engineering, agentic workflows
- Methodology: Scrum (sprints, backlog, user stories), UML

Only tools evidenced in the project (manifest, imports, config, docs) are listed;
nothing is inferred without proof.

The **skills tree** is computed from `projects[*].stack`: grouped by
`SkillCategory`, each skill shows how many projects use it and links to them.
No manual skill list exists elsewhere.

### 4.6 Profile content (to be written)

- Title: "Développeur Full-Stack Junior" / "Junior Full-Stack Developer"
- Pitch built on: production experience (LeadBoy in production since Sept. 2025),
  full-stack range (Next.js/React/Angular, Node/Spring/ASP.NET, PostgreSQL/Supabase/MySQL),
  and AI-augmented workflow learned during the Indigo Studio internship
  (Claude Code integrated into daily development: code review, refactoring,
  testing, documentation) — phrased professionally, not as hype
- Timeline: HELHa bachelor (Bloc 1 to 3), Indigo Studio internship + TFE
- Existing CV PDF reused (`public/cv-vanbercy-sailor.pdf`)

## 5. Screenshot pipeline

All tooling lives in the scratchpad. Output goes to
`public/projects/<slug>/NN-<name>.webp`.

- Driver: Playwright scripts per project, desktop 1440x900 (DPR 2, downscaled to
  WebP quality ~82, max width 1600) and mobile 390x844 where relevant
- Desktop (non-web) apps: OS-level window capture
- 4 to 6 screenshots per project, chosen to show the main user flows

| Project | How it runs |
|---------|-------------|
| Smaatch | Local Supabase (Docker) + repo migrations + fictional seed; `npm run dev` |
| smaatch-mobile | `expo start --web` against the same local Supabase, mobile viewport |
| LeadBoy | Reuse the 6 existing screenshots; re-run locally with local Supabase if feasible |
| Tetris Formation | `npm run dev`; Prisma against a local DB if required |
| Plan Financier | `npm run dev`; Drizzle against a local DB if required |
| Job Tracker | `docker compose up` (or front/back separately) |
| Arborescence | `npm run dev` |
| The Lost Grimoire | `docker compose up` |
| ClinikTime | Backend via .NET SDK Docker image, frontend via `ng serve` |
| FoodSnap | Flutter web build via Docker Flutter image (or local SDK), MockExpress backend |
| Zombie High School | Existing release binary if runnable, else MinGW + CMake build in scratchpad |
| Adresseur IP | `python app.py` in a scratchpad venv; window capture |
| Emilien | Java 21 + JavaFX SDK (scratchpad); window capture |
| Moit-Moit | Temporary PHP/Apache + MySQL containers, code mounted read-only, repo SQL schema |

If a project cannot be started without modifying its source, it is reported to
the user instead of being patched.

## 6. Quality and testing

- Vitest: content schema validation (all projects valid, all skill ids known,
  all images exist), skills-tree computation, route dictionary completeness (FR/EN)
- Playwright: every route renders in FR and EN, language switch keeps the page,
  no broken internal links, no missing images, gallery keyboard navigation
- Lighthouse >= 95 Performance and Accessibility (home + one project page)
- SEO: per-page metadata, Open Graph image, `sitemap.xml`, `hreflang` alternates

## 7. Delivery order

1. Screenshots + content files, project by project (progress shared with the user)
2. Site build
3. User review locally
4. Merge to `main` and Vercel deploy only on explicit user approval

## 8. Out of scope

- Contact form backend (mailto link only)
- CMS or blog
- Analytics
