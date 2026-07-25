import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { WordsIndex } from "@/components/words-index";
import { allPosts, tagCounts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Words",
  description: site.description,
};

export default function WordsPage() {
  return (
    <main className="container-site">
      <section style={{ padding: "clamp(48px, 7vw, 88px) 0 40px" }}>
        <span className="kicker" style={{ marginBottom: 20 }}>
          Words
        </span>
        <h1
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            lineHeight: 1.08,
            margin: "0 0 0 -0.06em",
          }}
        >
          All words<span style={{ color: "var(--color-accent)" }}>.</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: "28px",
            maxWidth: "58ch",
            margin: "28px 0 0",
            color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
          }}
        >
          Essays, notes, and the occasional field report — on cars, code, and life in between.
          Pick a lane or read it all.
        </p>
      </section>
      <Suspense>
        <WordsIndex posts={allPosts()} counts={tagCounts()} />
      </Suspense>
      <SiteFooter />
    </main>
  );
}
