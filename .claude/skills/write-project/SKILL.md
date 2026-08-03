---
name: write-project
description: Use when Jonathan wants to write, backfill, or rewrite a project page for the personal site (content/projects/*.mdx), replace a project placeholder stub, or update an existing project writeup.
---

# Write a project page

Interview Jonathan about one project, then assemble **his verbatim answers** into `content/projects/<slug>.mdx`. One project per invocation.

## Before anything

1. Read `docs/voice.md`. If it's missing or calibration is empty, run the calibration in it first.
2. Read the Project schema in `velite.config.ts` and one existing project `.mdx`.

## Voice rules (non-negotiable)

Jonathan's interview answers are the primary source text. Since the Hatch A Pet session he also allows drafted content, under two conditions: the voice matches `docs/voice.md`, and every fact is grounded in something he said or something read from his actual repos. Never invent facts about his life or experience. When a fact is missing, ask.

If he's given the material, assemble it: reorder, trim filler, fix typos, keep his phrasing.

Apply the blocklist and style notes in `docs/voice.md`.

| Excuse | Reality |
|---|---|
| "His answer is rough; I'll smooth it" | Rough is the voice. Trim, don't rewrite. |
| "It needs a stronger ending" | Ask him for one. |
| "Just this one transition sentence" | Connective tissue is a clause, not a sentence written for him. |
| "I'll paraphrase to fit the word count" | Cut whole phrases of his instead. |

## Interview

One question at a time, open-ended, conversational. Follow up with "why" — the reasoning is the content. Collect frontmatter along the way, but don't lead with it:

`title`, `date`, `kicker` (≤40), `summary` (≤300 — drafted from his words, approved by him), `meta` (≤60, optional), `stack[]`, `timeline`, `role`, `links.live` / `links.github`, `featured`, `image` (file dropped in `public/`).

Ground to cover (adapt the wording, don't script-read):

- Why did you build it? What was the moment it started? What did the first ugly version look like?
- How is it built — the decision you'd defend, the one you wouldn't, what turned out to be hard?
- Where is it now? Anyone using it? Next steps, or an epitaph?
- What did you learn? What would you do differently?

## Research (do this, don't just interview)

- **Mine the repo.** Ask for the project's local path early. Read the source
  tree for grounded facts: real module names with their use case, systems he
  forgot to mention, config data worth citing. Facts read from his code are
  fair game without asking.
- **Write out reasons.** When he gives shorthand ("there's a plethora of
  reasons"), research the actual reasons (web search plus his code) and write
  them out fully. Vague bullets are a draft smell, he will send them back.
- **Examples over counts.** Module or file counts are fine for one overview
  line. Below that, name two or three real modules and what they do.
- **Never mention private repos or their files in the page.** Readers can't
  see them. Facts mined from the repo go in as plain statements.
- If the project is live, fetch its public page (store listing, site) for
  usable copy and links.

## Draft — section by section

Fixed template. If Jonathan rewords a heading, his wording becomes the new default — update this file and note it in `docs/voice.md`.

```md
## Why I built it     (short: who I am, why this project)
## The loop           (what the product/game actually does — rename per project)
## How it's built     (Tools list with links, then Architecture bullets)
## Where it is now
## What I learned
```

A table of contents renders automatically in the page sidebar from the `##`
headings (Velite `s.toc()` plus rehype-slug). Never write a manual TOC into the
`.mdx`, and keep heading names short since they double as TOC links.

Show ONE section at a time, assembled from his answers. Wait for approval or rewording before moving on. A paragraph or two per section — well under 1,500 words total.

Formatting (full rules in `docs/voice.md`, these are the load-bearing ones):

- Prose paragraphs only for the story sections. Everything technical is
  bullets, because people scan these pages.
- Every bullet leads with a one or two word bold label and a colon
  (**Security:**, **Sync:**). A label with multiple points gets sub-bullets,
  each with its own label.
- Tool lists: `[Tool](link) - short high level description`. Dashes are fine
  as list separators, banned inside prose sentences. Semicolons always banned.

Push for captioned images: the hero `image` plus optional inline screenshots. If someone reads only captions, they should still get the project. No fabricated metrics — "where it is now" reflection is enough.

## Finish

1. Validate frontmatter against the schema (tag enums, max lengths, URL format).
2. Write `content/projects/<slug>.mdx`; delete the placeholder stub it replaces.
3. Verify the build accepts it (`npm run build` or dev server + page check).
4. Append any new voice observations to `docs/voice.md`.
