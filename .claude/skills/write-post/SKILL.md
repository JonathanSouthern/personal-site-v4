---
name: write-post
description: Use when Jonathan wants to write, backfill, or rewrite a blog post for the personal site (content/posts/*.mdx) — essay, note, or field-note — or replace a post placeholder stub.
---

# Write a blog post

Interview Jonathan about one post, then assemble **his verbatim answers** into `content/posts/<slug>.mdx`. One post per invocation.

## Before anything

1. Read `docs/voice.md`. If it's missing or calibration is empty, run the calibration in it first.
2. Read the Post schema in `velite.config.ts` and one existing post `.mdx`.

## Voice rules (non-negotiable)

Same as `/write-project` — these are shared rules:

Jonathan's interview answers ARE the source text. Assembling means: reorder, trim filler, fix typos and punctuation, add connective tissue of at most a clause. It does not mean rewriting. If a section needs a sentence he didn't say, ask him for it. Apply the blocklist and style notes in `docs/voice.md`.

| Excuse | Reality |
|---|---|
| "His answer is rough; I'll smooth it" | Rough is the voice. Trim, don't rewrite. |
| "It needs a stronger ending" | Ask him for one. |
| "Just this one transition sentence" | Connective tissue is a clause, not a sentence written for him. |
| "I'll paraphrase to fit the word count" | Cut whole phrases of his instead. |

## Interview

One question at a time. First establish `type`, because it sets the shape and the depth of the interview:

- **essay** — fuller arc, 2–4 sections with headings in his words. Dig for the argument and the turn: what does he believe, what changed his mind, what's the counterexample?
- **note** — a few paragraphs, at most one heading. One idea worked through.
- **field-note** — short, single observation, quickly written. No obligation to conclude anything. Interview may be two or three questions total.

Collect frontmatter along the way: `title`, `date`, `tags[]` (enum: `cars` | `personal` | `engineering`), `type`, `summary` (≤300 — drafted from his words, approved by him).

## Draft — section by section

Show ONE section at a time (for note/field-note, the whole piece may be one section), assembled from his answers. Wait for approval or rewording before moving on.

## Finish

1. Validate frontmatter against the schema (tag enum, max lengths).
2. Write `content/posts/<slug>.mdx`; delete the placeholder stub it replaces.
3. Verify the build accepts it (`npm run build` or dev server + page check).
4. Append any new voice observations to `docs/voice.md`.
