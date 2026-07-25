"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Post } from "#velite";
import { PostCard } from "@/components/post-card";
import { tagLabels, type Tag } from "@/lib/site";

type Filter = Tag | "all";
const filters: Filter[] = ["all", "cars", "personal", "engineering"];

const isTag = (value: string | null): value is Tag =>
  value !== null && value in tagLabels;

export function WordsIndex({ posts, counts }: { posts: Post[]; counts: Record<Tag, number> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const active: Filter = isTag(tagParam) ? tagParam : "all";

  const select = (filter: Filter) => {
    router.replace(filter === "all" ? "/words" : `/words?tag=${filter}`, { scroll: false });
  };

  const visible = active === "all" ? posts : posts.filter((p) => p.tags.includes(active));

  return (
    <section style={{ padding: "0 0 80px" }}>
      <div
        className="flex flex-wrap"
        style={{ gap: 5.6, marginBottom: 28 }}
        role="tablist"
        aria-label="Filter posts by topic"
      >
        {filters.map((filter) => {
          const isActive = active === filter;
          const label =
            filter === "all" ? "All" : `${tagLabels[filter]} · ${counts[filter]}`;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(filter)}
              className="cursor-pointer"
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                letterSpacing: "0.02em",
                padding: "6px 14px",
                borderRadius: 999,
                background: isActive ? "var(--color-accent-800)" : "transparent",
                color: isActive ? "var(--color-accent-100)" : "var(--color-text)",
                border: `1px solid ${isActive ? "var(--color-accent-600)" : "var(--color-neutral-700)"}`,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
