import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <main className="container-site">
      <section style={{ padding: "clamp(64px, 9vw, 112px) 0 72px" }}>
        <span className="kicker" style={{ marginBottom: 20 }}>
          404
        </span>
        <h1
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            lineHeight: 1.08,
            margin: "0 0 0 -0.06em",
          }}
        >
          Nothing here<span style={{ color: "var(--color-accent)" }}>.</span>
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
          That page doesn&apos;t exist — or it did and I moved it. Head back{" "}
          <Link href="/">home</Link>, or browse the <Link href="/words">words</Link>.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
