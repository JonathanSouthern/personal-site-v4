import { defineCollection, defineConfig, s } from 'velite'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(120),
      date: s.isodate(),
      tags: s.array(s.enum(['cars', 'personal', 'engineering'])).min(1),
      type: s.enum(['essay', 'note', 'field-note']),
      summary: s.string().max(300),
      path: s.path(),
      metadata: s.metadata(),
      code: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.replace(/^posts\//, ''),
      readingTime: Math.max(1, Math.round(data.metadata.readingTime)),
    })),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(120),
      date: s.isodate(),
      kicker: s.string().max(40), // e.g. "Side project", "Open source"
      summary: s.string().max(300),
      meta: s.string().max(60).optional(), // card footer line, e.g. "TypeScript · Live"
      stack: s.array(s.string()).default([]),
      timeline: s.string().optional(),
      role: s.string().optional(),
      links: s
        .object({ live: s.string().url().optional(), github: s.string().url().optional() })
        .default({}),
      featured: s.boolean().default(false),
      image: s.string().optional(),
      path: s.path(),
      code: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.replace(/^projects\//, ''),
      year: new Date(data.date).getFullYear(),
    })),
})

export default defineConfig({
  root: 'content',
  collections: { posts, projects },
})
