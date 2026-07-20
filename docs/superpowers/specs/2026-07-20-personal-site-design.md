# Personal Site — Design Spec

**Date:** 2026-07-20
**Design reference:** https://claude.ai/design/p/f4f1762a-96bb-49a0-a6fd-62b166a1f45d ("Nocturne" design system, Marquee-style home)

## Goal

A blog-heavy personal site for Jonathan Southern: essays, notes, and field
reports on cars, personal topics, and software engineering, plus a secondary
projects showcase. Dark, editorial "Nocturne" look with an oversized name hero.

## Stack

- **Framework:** Next.js (App Router, TypeScript), fully static output
- **Styling:** Tailwind CSS v4 — Nocturne tokens as CSS variables in one theme block
- **Content:** MDX files in `content/`, typed and validated by Velite
- **Contact:** one API route sending mail via Resend (honeypot spam guard)
- **RSS + sitemap:** generated at build time
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, featured project band, latest projects, latest words |
| `/work` | Projects grid |
| `/work/[slug]` | Project detail |
| `/words` | Blog index with tag filter (client-side, synced to `?tag=`) |
| `/words/[slug]` | Post page |
| `/api/contact` | Contact form handler (only server code) |

## Content model (Velite collections)

**posts** — `title`, `date`, `tags` (`cars | personal | engineering`),
`type` (`essay | note | field-note`), `summary`, MDX body.
Computed: `slug`, `readingTime`.

**projects** — `title`, `date`, `summary`, `tags`, optional `image`,
optional `featured` flag, MDX body. Computed: `slug`.

Home page sections derive from these: featured band = `featured` project;
latest lists = sorted slices.

## Structure

```
content/
  posts/*.mdx
  projects/*.mdx
src/
  app/            # routes + api/contact, sitemap.ts, feed route
  components/     # nav, footer, post-card, project-card, tag-filter, …
  styles/         # Tailwind v4 theme with Nocturne tokens
velite.config.ts
```

## Contact form

Name / email / message → `/api/contact` → Resend → owner inbox.
Hidden honeypot field rejects bots. On failure, show inline error including
the real email address so a broken form never silently eats a message.
`RESEND_API_KEY` + `CONTACT_TO_EMAIL` via env vars.

## Error handling

- Bad frontmatter fails the build (Velite schema validation).
- Unknown slugs → `notFound()` → styled 404.
- Contact route validates input, rate-limits naively (honeypot + basic checks),
  returns 4xx/5xx JSON consumed by inline form error state.

## Testing

- Velite schema validation as the content safety net
- Unit tests for pure helpers (post sorting/filtering, feed generation)
- `tsc` + `next build` as the CI gate
