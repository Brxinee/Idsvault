import type { Metadata } from "next";
import Link from "next/link";
import { getLiveListings } from "@/lib/supabase";
import { ListingCard } from "@/components/ListingCard";
import { TrustBadges } from "@/components/TrustBadges";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IDsvault — Buy & Sell Instagram Usernames | Broker-Assisted India",
  description:
    "Browse broker-verified Instagram handles for sale in India. Reserve safely — your money stays with the broker until the live transfer is confirmed. Hyderabad-based marketplace.",
};

export default async function HomePage() {
  const listings = await getLiveListings().catch(() => []);
  const featured = listings.slice(0, 6);
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#14264F", padding: "5rem 0 4rem" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span
            style={{
              display: "inline-block",
              background: "rgba(15,169,104,0.15)",
              color: "#0FA968",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3rem 0.875rem",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
            }}
          >
            India&apos;s #1 Broker-Assisted Handle Marketplace
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              color: "#fff",
              lineHeight: 1,
              marginBottom: "1.25rem",
            }}
          >
            Buy Instagram Usernames
            <br />
            <span style={{ color: "#0FA968" }}>the safe way.</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.65,
              maxWidth: "38rem",
              margin: "0 auto 2rem",
            }}
          >
            Broker holds your payment. You watch the transfer live. No upfront risk, no middlemen, no crypto.
            Every handle is ownership-verified before listing.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
            <Link
              href="/buy-instagram-usernames"
              style={{
                background: "#0FA968",
                color: "#fff",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.625rem",
                fontWeight: 700,
                fontSize: "0.9375rem",
                letterSpacing: "0.02em",
              }}
            >
              Browse All Handles
            </Link>
            <a
              href={`https://t.me/${tg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.625rem",
                fontWeight: 700,
                fontSize: "0.9375rem",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              Chat on Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#0FA968", padding: "1.25rem 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n: listings.length, label: "Live Listings" },
              { n: "100%", label: "Broker-Verified" },
              { n: "₹0", label: "Upfront Risk" },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem,4vw,2rem)", color: "#fff", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.8)", marginTop: "0.2rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section style={{ padding: "4rem 0" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "#14264F" }}>
                Featured Handles
              </h2>
              <Link href="/buy-instagram-usernames" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0FA968" }}>
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        </section>
      )}

      <TrustBadges />

      {/* Why manual broker section */}
      <section style={{ padding: "4rem 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.75rem,5vw,2.75rem)", color: "#14264F", marginBottom: "1rem" }}>
            Why a Manual Broker is Safer Than Automated Escrow
          </h2>
          <p style={{ fontSize: "1rem", color: "#62708A", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Automated escrow services release funds based on system signals that can be spoofed. A human broker on a
            live call is the only method where you can confirm the transfer happened with your own eyes before a single
            rupee leaves the broker&apos;s account. No smart contract, no code, no loophole.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { step: "01", title: "Browse & Reserve", body: "Find a handle. Reserve it via Telegram — your spot is held, no payment yet." },
              { step: "02", title: "Pay the Broker", body: "Send payment (UPI/NEFT) to the broker's verified business account." },
              { step: "03", title: "Live Transfer", body: "Broker, you, and seller on a call. Transfer happens live. Broker releases payment to seller." },
            ].map((s) => (
              <div key={s.step} style={{ background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "0.875rem", padding: "1.25rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "#0FA968", lineHeight: 1 }}>{s.step}</span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.125rem", color: "#14264F", margin: "0.5rem 0 0.4rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#62708A", lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ background: "#14264F", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.75rem,5vw,2.75rem)", color: "#fff", marginBottom: "1rem" }}>
            Have a Handle to Sell?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "1.75rem" }}>
            Message the broker on Telegram. We review every submission and list quality handles within 24 hours.
          </p>
          <a
            href={`https://t.me/${tg}?start=sell`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#0FA968", color: "#fff", padding: "0.75rem 2rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9375rem" }}
          >
            List Your Handle →
          </a>
        </div>
      </section>
    </>
  );
}
