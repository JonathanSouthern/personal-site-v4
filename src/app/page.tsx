import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ImageFrame } from "@/components/image-frame";
import { ProjectCard } from "@/components/project-card";
import { SiteFooter } from "@/components/site-footer";
import {
  featuredProject,
  formatMonthYear,
  latestPosts,
  latestProjects,
  primaryTagLabel,
} from "@/lib/content";
import { site } from "@/lib/site";

const textAt = (pct: number) => `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;

export default function HomePage() {
  const featured = featuredProject();
  const projects = latestProjects(3, featured?.slug);
  const posts = latestPosts(3);

  return (
    <main>
      <div className="container-site">
        <section style={{ padding: "clamp(64px, 9vw, 112px) 0 72px" }}>
          <p style={{ fontSize: 15, margin: "0 0 20px", color: textAt(70) }}>
            Hello — good to see you here.
          </p>
          <h1
            style={{
              fontSize: "clamp(56px, 9.5vw, 112px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: "0 0 0 -0.06em",
            }}
          >
            Jonathan
            <br />
            Southern<span style={{ color: "var(--color-accent)" }}>.</span>
          </h1>
          <div className="flex flex-wrap items-baseline gap-12" style={{ marginTop: 44 }}>
            <p
              style={{
                fontSize: 17,
                lineHeight: "28px",
                maxWidth: "44ch",
                margin: 0,
                color: textAt(85),
              }}
            >
              Software engineer who likes making useful things and writing honestly about the
              process.
            </p>
            <div className="flex gap-5" style={{ fontSize: 14 }}>
              <a href={site.github} target="_blank" rel="noopener">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>
      </div>

      {featured && (
        <section className="section-band" style={{ padding: "64px 0" }}>
          <div className="container-site">
            <span
              className="kicker"
              style={{ color: "var(--color-on-section)", marginBottom: 24 }}
            >
              Featured project
            </span>
            <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(280px,380px)]">
              <div>
                <h2
                  style={{
                    fontSize: 40,
                    lineHeight: 1.15,
                    letterSpacing: "-0.012em",
                    margin: 0,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: "28px",
                    margin: "20px 0 0",
                    maxWidth: "48ch",
                    color: textAt(82),
                  }}
                >
                  {featured.summary}
                </p>
                <p style={{ margin: "28px 0 0" }}>
                  <Link href={`/work/${featured.slug}`} className="btn btn-primary">
                    See the project
                  </Link>
                </p>
              </div>
              <ImageFrame
                src={featured.image}
                alt={featured.title}
                aspectRatio="4 / 3"
                placeholder="Project screenshot"
              />
            </div>
          </div>
        </section>
      )}

      <div className="container-site">
        <section style={{ padding: "64px 0" }}>
          <div className="mb-6 flex items-baseline justify-between">
            <span className="kicker">Latest personal projects</span>
            <Link href="/work" style={{ fontSize: 14 }}>
              View all projects →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <div className="fade-rule" />

        <section id="about" className="grid gap-16 md:grid-cols-2" style={{ padding: "56px 0" }}>
          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <span className="kicker">Latest words</span>
              <Link href="/words" style={{ fontSize: 14 }}>
                All words →
              </Link>
            </div>
            <div className="flex flex-col" style={{ gap: 18 }}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/words/${post.slug}`}
                  style={{ color: "var(--color-text)" }}
                >
                  <span className="block" style={{ fontSize: 17 }}>
                    {post.title}
                  </span>
                  <span className="mt-1 flex items-baseline gap-2.5">
                    <span className="tag tag-accent">{primaryTagLabel(post)}</span>
                    <span style={{ fontSize: 13, color: textAt(55) }}>
                      {formatMonthYear(post.date)} · {post.readingTime} min
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="kicker" style={{ marginBottom: 24 }}>
              Now
            </span>
            <p style={{ fontSize: 15.5, lineHeight: "28px", margin: 0, color: textAt(78) }}>
              Building this site, wrenching on whatever&apos;s in the garage, and writing it all
              down as I go. Updated when it changes.
            </p>
          </div>
        </section>

        <div className="fade-rule" />

        <section id="contact" className="grid gap-16 md:grid-cols-2" style={{ padding: "56px 0" }}>
          <div>
            <span className="kicker" style={{ marginBottom: 24 }}>
              Get in touch
            </span>
            <p style={{ fontSize: 15.5, lineHeight: "28px", margin: 0, color: textAt(78) }}>
              Questions, corrections, car recommendations — all welcome. Use the form or email me
              at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </div>
          <ContactForm />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
