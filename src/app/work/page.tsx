import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import { allProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Everything I've shipped, tinkered with, or abandoned honorably.",
};

export default function WorkPage() {
  return (
    <main className="container-site">
      <section style={{ padding: "clamp(48px, 7vw, 88px) 0 48px" }}>
        <span className="kicker" style={{ marginBottom: 20 }}>
          Work
        </span>
        <h1
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            lineHeight: 1.08,
            margin: "0 0 0 -0.06em",
          }}
        >
          All projects<span style={{ color: "var(--color-accent)" }}>.</span>
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
          Everything I&apos;ve shipped, tinkered with, or abandoned honorably — newest first.
          Each one links to its own page with the full story.
        </p>
      </section>
      <section style={{ padding: "0 0 80px" }}>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {allProjects().map((project) => (
            <ProjectCard key={project.slug} project={project} withImage />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
