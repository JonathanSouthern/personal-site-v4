import { allPosts } from "@/lib/content";
import { buildFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildFeed(allPosts()), {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
