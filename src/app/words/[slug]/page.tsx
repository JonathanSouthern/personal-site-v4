import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import { SiteFooter } from "@/components/site-footer";
import { allPosts, postMeta } from "@/lib/content";
import { tagLabels } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="container-site">
      <article style={{ maxWidth: 720, paddingBottom: 72 }}>
        <header style={{ padding: "clamp(48px, 7vw, 88px) 0 40px" }}>
          <p style={{ margin: "0 0 24px" }}>
            <Link href="/words" style={{ fontSize: 14 }}>
              ← All words
            </Link>
          </p>
          <span className="kicker" style={{ marginBottom: 20 }}>
            {postMeta(post)}
          </span>
          <h1
            style={{
              fontSize: "clamp(34px, 4.5vw, 52px)",
              lineHeight: 1.1,
              margin: "0 0 0 -0.04em",
            }}
          >
            {post.title}
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </h1>
          <div className="flex flex-wrap" style={{ gap: 5.6, marginTop: 24 }}>
            {post.tags.map((tag) => (
              <Link key={tag} href={`/words?tag=${tag}`} className="tag tag-accent">
                {tagLabels[tag]}
              </Link>
            ))}
          </div>
        </header>
        <div className="prose-site">
          <MDXContent code={post.code} />
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
