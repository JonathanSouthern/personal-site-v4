import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageFrame } from "@/components/image-frame";
import { MDXContent } from "@/components/mdx-content";
import { SiteFooter } from "@/components/site-footer";
import { allProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects().find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects().find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="container-site">
      <section style={{ padding: "clamp(48px, 7vw, 88px) 0 40px" }}>
        <p style={{ margin: "0 0 24px" }}>
          <Link href="/work" style={{ fontSize: 14 }}>
            ← All projects
          </Link>
        </p>
        <span className="kicker" style={{ marginBottom: 20 }}>
          {project.year} · {project.kicker}
        </span>
        <h1
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            lineHeight: 1.08,
            margin: "0 0 0 -0.06em",
          }}
        >
          {project.title}
          <span style={{ color: "var(--color-accent)" }}>.</span>
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: "28px",
            maxWidth: "58ch",
            margin: "28px 0 0",
            color: "color-mix(in srgb, var(--color-text) 85%, transparent)",
          }}
        >
          {project.summary}
        </p>
        {(project.links.live || project.links.github) && (
          <div className="flex" style={{ gap: 8.4, marginTop: 28 }}>
            {project.links.live && (
              <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noopener">
                Visit the live site
              </a>
            )}
            {project.links.github && (
              <a className="btn btn-ghost" href={project.links.github} target="_blank" rel="noopener">
                Source on GitHub
              </a>
            )}
          </div>
        )}
      </section>

      <div style={{ marginBottom: 56 }}>
        <ImageFrame
          src={project.image}
          alt={project.title}
          aspectRatio="21 / 9"
          placeholder="Hero screenshot or demo still"
        />
      </div>

      <section
        className="grid gap-18 md:grid-cols-[minmax(0,1fr)_280px]"
        style={{ paddingBottom: 72, gap: "clamp(40px, 6vw, 72px)" }}
      >
        <div className="prose-site">
          <MDXContent code={project.code} />
        </div>
        <aside className="flex flex-col" style={{ gap: 28 }}>
          {project.stack.length > 0 && (
            <div>
              <span className="kicker" style={{ marginBottom: 12 }}>
                Stack
              </span>
              <div className="flex flex-wrap" style={{ gap: 5.6 }}>
                {project.stack.map((item) => (
                  <span key={item} className="tag tag-neutral">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {project.timeline && (
            <div>
              <span className="kicker" style={{ marginBottom: 12 }}>
                Timeline
              </span>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: "24px",
                  margin: 0,
                  color: "color-mix(in srgb, var(--color-text) 75%, transparent)",
                }}
              >
                {project.timeline}
              </p>
            </div>
          )}
          {project.role && (
            <div>
              <span className="kicker" style={{ marginBottom: 12 }}>
                Role
              </span>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: "24px",
                  margin: 0,
                  color: "color-mix(in srgb, var(--color-text) 75%, transparent)",
                }}
              >
                {project.role}
              </p>
            </div>
          )}
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
