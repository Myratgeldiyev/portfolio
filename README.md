# Portfolio

Personal portfolio of Yunus Myratgeldiyev, built with Next.js 16, React 19 and Tailwind CSS 4.

## Features

- Single-page home (about, skills, experience, education, projects, contact) plus a detail page for each project
- Contact form backed by an API route: Zod validation, IP-hashed rate limiting (3 messages per 10 minutes), messages stored in Postgres and optionally emailed via Resend
- Light and dark themes
- SEO: metadata, generated Open Graph image, `sitemap.xml` and `robots.txt`
- Unit tests (Vitest), end-to-end smoke tests on desktop and mobile (Playwright), GitHub Actions CI

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run db:migrate           # create the tables (needs DATABASE_URL)
npm run dev
```

## Editing content

All text, experience and projects live in [`content/profile.ts`](content/profile.ts).

- Project screenshots go in `public/projects/<slug>.png`. Run `npm run screenshots` to re-capture every project that has a `liveUrl`.
- Put a CV at `public/cv.pdf` and the download button appears automatically.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript checks |
| `npm test` | Unit tests |
| `npm run test:e2e` | Playwright smoke tests (run `npm run build` first) |
| `npm run db:generate` / `npm run db:migrate` | Drizzle migrations |
| `npm run screenshots` | Re-capture project screenshots |

## Environment variables

See [`.env.example`](.env.example). The contact form needs `DATABASE_URL`. Set `IP_HASH_SALT` in production so stored IP hashes can't be reversed. Without `RESEND_API_KEY`, messages are stored but not emailed. Umami analytics loads only when both `NEXT_PUBLIC_UMAMI_*` values are set.
