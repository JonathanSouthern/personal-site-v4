import { describe, expect, it } from "vitest";
import {
  allPosts,
  allProjects,
  featuredProject,
  formatMonthYear,
  latestProjects,
  postsByTag,
  tagCounts,
} from "@/lib/content";
import { buildFeed } from "@/lib/feed";

describe("content helpers", () => {
  it("sorts posts newest first", () => {
    const dates = allPosts().map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("sorts projects newest first", () => {
    const dates = allProjects().map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("filters posts by tag", () => {
    for (const post of postsByTag("cars")) {
      expect(post.tags).toContain("cars");
    }
    expect(postsByTag("all")).toHaveLength(allPosts().length);
  });

  it("tag counts cover every post's tags", () => {
    const counts = tagCounts();
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const tagged = allPosts().reduce((a, p) => a + p.tags.length, 0);
    expect(total).toBe(tagged);
  });

  it("picks the flagged featured project and excludes it from latest", () => {
    const featured = featuredProject();
    expect(featured?.featured).toBe(true);
    const latest = latestProjects(3, featured?.slug);
    expect(latest.map((p) => p.slug)).not.toContain(featured?.slug);
  });

  it("formats dates as short month + year in UTC", () => {
    expect(formatMonthYear("2026-06-15")).toBe("Jun 2026");
    expect(formatMonthYear("2025-12-31")).toBe("Dec 2025");
  });
});

describe("feed", () => {
  it("escapes XML and includes every post", () => {
    const posts = allPosts();
    const feed = buildFeed(posts);
    expect(feed).toContain("<rss");
    for (const post of posts) {
      expect(feed).toContain(`/words/${post.slug}`);
    }
    expect(feed).not.toMatch(/<title>[^<]*&(?!amp;|lt;|gt;|quot;)/);
  });
});
