import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// noindex — detail pages are browsable but not crawled
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id).catch(() => null);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `@${listing.handle} — Instagram Handle for Sale`,
    description: listing.description ?? `Buy @${listing.handle} on Instagram. Broker-assisted transfer, INR payment, live handover.`,
    robots: { index: false, follow: false },
  };
}

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

const STATUS_MAP: Record<string, { color: string; bg: string; label: string }> = {
  live:      { color: "#0FA968", bg: "#DCFCE7", label: "Available" },
  reserved:  { color: "#D97706", bg: "#FEF3C7", label: "Reserved" },
  paid:      { color: "#62708A", bg: "#F3F4F6", label: "Sold" },
  completed: { color: "#62708A", bg: "#F3F4F6", label: "Sold" },
  pending:   { color: "#62708A", bg: "#F3F4F6", label: "Pending Review" },
};

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id).catch(() => null);
  if (!listing) notFound();

  const tg = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";
  const s = STATUS_MAP[listing.status] ?? STATUS_MAP.live;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://idsvault.com";

  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "2.5rem 1rem 5rem" }}>
      <Link href="/buy-instagram-usernames" style={{ fontSize: "0.875rem", color: "#62708A", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.75rem" }}>
        ← Back to listings
      </Link>

      <article style={{ background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "1rem", padding: "2rem" }}>
        {/* Status badge */}
        <span style={{ display: "inline-block", background: s.bg, color: s.color, fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: "9999px", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "1rem" }}>
          {s.label}
        </span>

        {/* Handle */}
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2.5rem, 8vw, 4rem)", color: "#14264F", lineHeight: 1, marginBottom: "0.25rem" }}>
          @{listing.handle}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#62708A", marginBottom: "1.75rem" }}>Instagram Username</p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginBottom: "1.75rem" }}>
          <StatBox label="Price" value={formatINR(listing.price_inr)} accent />
          {listing.char_length != null && <StatBox label="Length" value={`${listing.char_length} chars`} />}
          {listing.followers != null && <StatBox label="Followers" value={listing.followers >= 1000 ? `${(listing.followers / 1000).toFixed(1)}k` : String(listing.followers)} />}
          {listing.niche && <StatBox label="Niche" value={listing.niche} />}
        </div>

        {listing.description && (
          <div style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1rem", color: "#14264F", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>About this Handle</h2>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.65 }}>{listing.description}</p>
          </div>
        )}

        {/* CTA */}
        {listing.status === "live" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <a
              href={`https://t.me/${tg}?start=reserve_${listing.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#0FA968", color: "#fff", padding: "0.875rem 1.5rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "1rem", textAlign: "center" }}
            >
              Reserve on Telegram
            </a>
            <a
              href={`https://t.me/${tg}/app?startapp=listing_${listing.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#fff", color: "#14264F", padding: "0.875rem 1.5rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "1rem", border: "1px solid #E3E9F1", textAlign: "center" }}
            >
              Open in Telegram App
            </a>
            <p style={{ fontSize: "0.8125rem", color: "#62708A", textAlign: "center", lineHeight: 1.5 }}>
              No payment now. Broker contacts you to arrange the live transfer call. Funds held until transfer is confirmed.
            </p>
          </div>
        ) : (
          <div style={{ background: "#F3F4F6", border: "1px solid #E3E9F1", borderRadius: "0.625rem", padding: "1.25rem", textAlign: "center" }}>
            <p style={{ fontWeight: 600, color: "#62708A" }}>This handle is no longer available.</p>
            <Link href="/buy-instagram-usernames" style={{ display: "inline-block", marginTop: "0.75rem", color: "#0FA968", fontWeight: 600, fontSize: "0.875rem" }}>
              Browse other handles →
            </Link>
          </div>
        )}
      </article>

      {/* Process reassurance */}
      <div style={{ marginTop: "2rem", background: "#fff", border: "1px solid #E3E9F1", borderRadius: "0.875rem", padding: "1.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.125rem", color: "#14264F", marginBottom: "1rem" }}>What happens after you reserve</h2>
        <ol style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {[
            "The broker contacts you on Telegram within a few hours to confirm your interest.",
            "You transfer payment (UPI/NEFT/RTGS) to the broker's verified business account.",
            "A live call is arranged with you, the seller, and the broker — you watch the username change.",
            "Once confirmed in your account, the broker releases payment to the seller. Deal done.",
          ].map((step, i) => (
            <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "#DCFCE7", color: "#0FA968", fontWeight: 900, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
              <p style={{ fontSize: "0.875rem", color: "#62708A", lineHeight: 1.55 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E3E9F1", borderRadius: "0.625rem", padding: "0.875rem" }}>
      <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "#62708A", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: accent ? "1.25rem" : "0.9375rem", fontWeight: 700, color: accent ? "#0FA968" : "#14264F", marginTop: "0.2rem" }}>{value}</p>
    </div>
  );
}
