# Content backfill skills — design

**Date:** 2026-08-02
**Status:** Approved pending review

## Goal

Backfill the site's placeholder content (6 project stubs, 8 post stubs) with real
writing that sounds like Jonathan, not like AI. Two Claude skills run a structured
interview per piece, treat Jonathan's verbatim answers as the source text, and
assemble consistent `.mdx` files that satisfy the Velite schemas.

## Files

| File | Purpose |
| --- | --- |
| `.claude/skills/write-project/SKILL.md` | `/write-project` — interview → project page |
| `.claude/skills/write-post/SKILL.md` | `/write-post` — interview → blog post |
| `docs/voice.md` | Shared voice guide both skills read first and update after each piece |

Skills are repo-scoped because they encode this site's Velite schemas and section
templates.

## Voice rules (shared, live in both skills + docs/voice.md)

1. **Answers are the source text.** The skill assembles Jonathan's verbatim
   interview answers — reordering, trimming filler, fixing typos, adding minimal
   connective tissue. It never paraphrases into its own prose. If a section needs
   a sentence he didn't say, it asks for it instead of inventing it.
2. **AI-tell blocklist** (hard rules, seeded in `docs/voice.md`):
   - No "delve", "dive into", "landscape", "leverage", "robust", "seamless",
     "supercharge", "elevate", "journey", "unleash", "game-changer"
   - No "It's not just X — it's Y" constructions
   - No rule-of-three flourishes ("fast, simple, and powerful")
   - No breathless adjectives or hype; understatement over emphasis
   - No summary paragraphs that restate what was just said
3. **Voice guide bootstrap.** First time either skill runs, it runs a ~5 minute
   calibration: optionally paste 1–2 writing samples (emails, READMEs, messages),
   plus questions like "words or phrases you'd never use", "how formal do you
   talk", "pet phrases". Results are written to `docs/voice.md`.
4. **Voice guide compounds.** After each published piece, the skill appends any
   new observations (phrases he liked/rejected, recurring edits) to `docs/voice.md`.

## Interview flow (both skills)

- One question at a time, conversational. Open-ended for story questions so
  answers come out in his own words; multiple-choice only for schema enums.
- Collect every required frontmatter field before finishing (checklist below).
- Ask "why" follow-ups — the reasoning is the content.
- Then draft **section by section**: show one section assembled from his answers,
  wait for approval or rewording, only then move to the next.

## `/write-project`

**Frontmatter checklist** (from `velite.config.ts` Project schema):
`title`, `date`, `kicker` (≤40), `summary` (≤300), `meta` (optional, ≤60),
`stack[]`, `timeline`, `role`, `links.live`/`links.github`, `featured`, `image`.

**Fixed body template** (four sections, replacing the current two-section stubs):

```md
## Why I built it
## How it's built
## Where it is now
## What I learned
```

- *Why I built it* — the itch, the moment it started, the first ugly version.
- *How it's built* — decisions and reasoning, the hard parts, the decision he'd
  defend and the one he wouldn't. Stack rationale lives here (the stack list
  itself renders in the sidebar).
- *Where it is now* — status, usage, next steps, or a graceful epitaph. No
  fabricated metrics.
- *What I learned* — plain takeaways, what he'd do differently.

Section names are defaults; if Jonathan phrases a heading differently during
drafting, his wording wins and should be noted in `docs/voice.md` for reuse.

- Keep it short: a paragraph or two per section, well under 1,500 words total.
- Push for captioned screenshots: hero `image` (drop file in `public/`, set
  frontmatter) plus optional inline images between sections. If someone reads
  only captions, they should still get the project.

## `/write-post`

**Frontmatter checklist** (Post schema): `title`, `date`,
`tags[]` (enum: cars | personal | engineering), `type` (essay | note |
field-note), `summary` (≤300).

**Shape per type:**
- **essay** — fuller arc, 2–4 sections with headings in his words; the interview
  digs for the argument and the turn.
- **note** — a few paragraphs, at most one heading; one idea worked through.
- **field-note** — short, single observation, quickly written; no obligation to
  conclude anything.

## Finish (both skills)

1. Validate frontmatter against the schema (enums, max lengths, url formats).
2. Write the `.mdx` into `content/projects/` or `content/posts/` with a slug
   derived from the title; delete the placeholder stub it replaces when
   backfilling.
3. Run the build (`npm run build` or dev-server check) to confirm Velite accepts
   it and the page renders.
4. Append voice observations to `docs/voice.md`.

## Out of scope

- No changes to Velite schemas, page components, or styling.
- No automated screenshot capture; images are provided by Jonathan.
- No batch mode — one piece per skill invocation.
