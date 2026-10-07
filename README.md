# Sailor Vanbercy — Portfolio

Bilingual (French / English) portfolio of a junior full-stack developer, live at
**https://portfolio-sailorvanbercy.vercel.app**.

13 projects, each with real screenshots, a detailed write-up and its full technical stack.
The skills tree on the About page is generated from the projects themselves, so every skill
links to the work that proves it.

## Stack

- Next.js (App Router, static export), React, TypeScript (strict)
- Tailwind CSS v4, `next/font` (Bricolage Grotesque, IBM Plex Sans)
- Zod for build-time content validation
- Vitest + Testing Library (unit), Playwright (end-to-end, desktop and mobile)
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests
npm run build      # validates content, then exports the static site to out/
npm run test:e2e   # builds, serves out/ and runs Playwright
npm run cv         # regenerates the FR/EN resume PDFs from cv/cv-data.ts
```

## Content

All content lives in `content/`:

- `content/projects/<slug>.ts` — one file per project, French and English side by side
- `content/skills.ts` — the skills registry (frameworks, ORMs, tools, patterns...)
- `content/profile.ts` — bio, journey and contact details

Screenshots live in `public/projects/<slug>/` with an 800px `.thumb.webp` next to each image.
`npm run build` fails on a missing translation, an unknown skill, a duplicate slug or a missing image.
