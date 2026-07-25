import Link from "next/link";
import type { Post } from "#velite";
import { postMeta, primaryTagLabel } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/words/${post.slug}`} style={{ color: "inherit" }}>
      <div className="card h-full box-border">
        <div className="flex items-baseline justify-between gap-4">
          <span className="card-kicker" style={{ margin: 0 }}>
            {postMeta(post)}
          </span>
          <span className="tag tag-accent flex-none">{primaryTagLabel(post)}</span>
        </div>
        <h3 className="card-title">{post.title}</h3>
        <p className="card-body">{post.summary}</p>
      </div>
    </Link>
  );
}
