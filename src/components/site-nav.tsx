"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/words", label: "Words" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="nav-site">
      <Link href="/" className="nav-brand">
        {site.initials}
      </Link>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          style={{ color: isActive(href) ? "var(--color-accent)" : "var(--color-text)" }}
        >
          {label}
        </Link>
      ))}
      <Link href="/#about" style={{ color: "var(--color-text)" }}>
        About
      </Link>
      <Link href="/#contact" className="btn btn-primary" style={{ marginLeft: 8 }}>
        Get in touch
      </Link>
    </nav>
  );
}
