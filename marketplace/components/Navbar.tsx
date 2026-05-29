"use client";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/buy-instagram-usernames", label: "Browse" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";

  return (
    <header style={{ background: "#14264F" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", color: "#fff", letterSpacing: "-0.01em" }}
          >
            IDs<span style={{ color: "#0FA968" }}>vault</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 500 }}
              className="hover:text-white transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <a
            href={`https://t.me/${tg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#0FA968",
              color: "#fff",
              borderRadius: "0.5rem",
              padding: "0.4rem 1rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            Open in Telegram
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
          style={{ color: "#fff" }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {open && (
        <div style={{ background: "#14264F", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <nav className="max-w-6xl mx-auto px-4 pb-4 pt-2 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                style={{ color: "rgba(255,255,255,0.8)", padding: "0.6rem 0", fontSize: "0.9375rem", fontWeight: 500 }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`https://t.me/${tg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0FA968", padding: "0.6rem 0", fontSize: "0.9375rem", fontWeight: 700 }}
            >
              Open in Telegram →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
