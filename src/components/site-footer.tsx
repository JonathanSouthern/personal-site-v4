import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      <div className="fade-rule" />
      <footer
        className="flex flex-wrap items-baseline justify-between gap-4"
        style={{
          padding: "40px 0 48px",
          fontSize: 13,
          color: "color-mix(in srgb, var(--color-text) 50%, transparent)",
        }}
      >
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex gap-5">
          <a href={site.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="/feed.xml">RSS</a>
        </div>
      </footer>
    </>
  );
}
