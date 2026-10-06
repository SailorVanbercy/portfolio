# CLAUDE.md — Portfolio Sailor Vanbercy (v2)

## Project

Bilingual (FR default / EN) static portfolio. Next.js App Router with `output: 'export'`,
deployed on Vercel at https://portfolio-sailorvanbercy.vercel.app. No backend.

Spec: `docs/superpowers/specs/2026-10-06-portfolio-v2-design.md`
Plan: `docs/superpowers/plans/2026-10-06-portfolio-v2.md`

## Commands

```bash
npm run dev        # Dev server
npm run build      # Validates content (prebuild) then static export to out/
npm start          # Serves out/ on http://localhost:3100
npm test           # Vitest unit tests
npm run test:e2e   # Playwright (builds and serves out/ automatically)
npm run lint
```

## Structure

```
content/
  skills.ts              # Skills registry (single source of truth, exports SkillId)
  profile.ts             # Bio, timeline, contact (FR/EN)
  projects/
    define.ts            # defineProject() typed helper
    index.ts             # List of all projects
    <slug>.ts            # One file per project
src/
  lib/                   # i18n, routes, dictionary, content schema/validation/queries, skills tree
  app/
    (root)/              # '/' redirect page
    [locale]/            # Locale layout, home, [section] (projects|about|contact), [section]/[slug]
  components/            # UI components (ui/ = shadcn)
public/projects/<slug>/  # Screenshots (WebP)
scripts/validate-content.ts  # prebuild content validation
tests/unit, tests/e2e
```

## Adding a project

1. Add screenshots to `public/projects/<slug>/NN-<name>.webp`.
2. Add any missing skill to `content/skills.ts` (frameworks, ORMs, tools — not only languages).
3. Create `content/projects/<slug>.ts` with `defineProject({...})`, FR and EN both filled.
4. Register it in `content/projects/index.ts`.
5. `npm test && npm run build` — the build fails on a missing translation, unknown skill id,
   duplicate slug/order or missing image.

## Conventions

- TypeScript strict, named exports, kebab-case file names.
- Routes are built only through `href()` from `src/lib/routes.ts` (localized segments:
  `projets`/`projects`, `a-propos`/`about`, `contact`). Always trailing slash.
- UI strings live in `src/lib/dictionary.ts`; FR and EN must have identical keys.
- Colors only through CSS tokens in `globals.css` (`bg-bg`, `text-fg`, `text-muted`,
  `border-border`, `bg-card`, `text-accent`).
- No emojis anywhere (UI, code, commits, content).
- Code and comments in English; site content in French and English.
- Conventional Commits.
