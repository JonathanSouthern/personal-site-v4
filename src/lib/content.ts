import { posts, projects, type Post, type Project } from "#velite";
import { tagLabels, typeLabels, type Tag } from "@/lib/site";

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

export function allPosts(): Post[] {
  return [...posts].sort(byDateDesc);
}

export function allProjects(): Project[] {
  return [...projects].sort(byDateDesc);
}

export function featuredProject(): Project | undefined {
  return allProjects().find((p) => p.featured) ?? allProjects()[0];
}

export function latestProjects(count: number, excludeSlug?: string): Project[] {
  return allProjects()
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, count);
}

export function latestPosts(count: number): Post[] {
  return allPosts().slice(0, count);
}

export function postsByTag(tag: Tag | "all"): Post[] {
  const sorted = allPosts();
  return tag === "all" ? sorted : sorted.filter((p) => p.tags.includes(tag));
}

export function tagCounts(): Record<Tag, number> {
  const counts = { cars: 0, personal: 0, engineering: 0 };
  for (const post of allPosts()) {
    for (const tag of post.tags) counts[tag] += 1;
  }
  return counts;
}

/** "Jun 2026 · Essay · 6 min" */
export function postMeta(post: Post): string {
  return [formatMonthYear(post.date), typeLabels[post.type], `${post.readingTime} min`].join(
    " · ",
  );
}

export function primaryTagLabel(post: Post): string {
  return tagLabels[post.tags[0]];
}

export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
