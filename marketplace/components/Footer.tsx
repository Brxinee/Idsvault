import Link from "next/link";

const LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/buy-instagram-usernames", label: "Buy Handles" },
  { href: "/og-instagram-handles", label: "OG Handles" },
  { href: "/4-letter-instagram-usernames", label: "4-Letter Handles" },
  { href: "/short-instagram-handles-india", label: "Short Handles" },
];

export function Footer() {
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";
  return (
    <footer style={{ background: "#14264F", color: "rgba(255,255,255,0.65)", marginTop: "4rem" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.25rem", color: "#fff", marginBottom: "0.75rem" }}>
              IDs<span style={{ color: "#0FA968" }}>vault</span>
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              India&apos;s broker-assisted Instagram handle marketplace. Safe, verified, on-call transfers. Based in Hyderabad, Telangana.
            </p>
            <a
              href={`https://t.me/${tg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: "1rem", background: "#0FA968", color: "#fff", padding: "0.45rem 1rem", borderRadius: "0.5rem", fontSize: "0.8125rem", fontWeight: 700 }}
            >
              Contact Broker on Telegram
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: "0.875rem" }}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "2.5rem", paddingTop: "1.5rem", fontSize: "0.8125rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} IDsvault. All rights reserved.</span>
          <span>Broker: Jogdhande Nikhil Patil — Hyderabad, Telangana, India</span>
        </div>
      </div>
    </footer>
  );
}
