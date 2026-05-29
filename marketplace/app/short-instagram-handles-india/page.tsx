import type { Metadata } from "next";
import { Suspense } from "react";
import { getLiveListings } from "@/lib/supabase";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Short Instagram Handles India — Buy 6-Character Usernames",
  description:
    "Buy short Instagram handles in India — 6 characters or fewer. Broker-verified, live transfer, INR payments. Browse available handles at IDsvault.",
  keywords: ["short instagram handle india", "buy short instagram username", "6 letter instagram handle", "short instagram username for sale india"],
};

type Props = { searchParams: Promise<{ sort?: string }> };

export default async function ShortHandlesPage({ searchParams }: Props) {
  const sp = await searchParams;
  let listings = await getLiveListings({ maxChars: 6 }).catch(() => []);
  if (sp.sort === "price_asc") listings.sort((a, b) => a.price_inr - b.price_inr);
  else if (sp.sort === "price_desc") listings.sort((a, b) => b.price_inr - a.price_inr);

  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Short Instagram Handles India
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            Six characters or fewer. These handles outperform longer ones on every brand metric: recall, ad copy, SEO,
            and cross-platform consistency.
          </p>
        </div>
      </section>

      <section style={{ background: "#F5F8FC", padding: "2.5rem 0 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ maxWidth: "72ch" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "#14264F", marginBottom: "0.75rem" }}>
              The Strategic Case for Short Instagram Handles
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Studies on brand recall consistently show that shorter names are remembered more accurately and more quickly.
              On Instagram specifically, a short handle shows fully in every notification, every tag, every story mention —
              no truncation, no ellipsis. When someone tags @yourbrand in a reel caption, the full handle is visible without
              the reader having to hover or tap to see the rest.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              For Indian brands expanding across platforms, a short Instagram handle almost always secures the same name
              on X (Twitter), Threads, and even domain registrations. This brand consistency is worth paying for once and
              owning forever — versus spending years fighting for variations of a long handle.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Handles of 6 characters or fewer at IDsvault start from ₹15,000 for 6-character brandable names and go up
              to several lakhs for ultra-short or high-follower accounts. Every handle is ownership-verified before listing.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              IDsvault is based in Hyderabad, Telangana. All transactions are in INR via UPI, NEFT, or RTGS. No crypto,
              no overseas wire transfers, no hidden fees.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "2rem 0 4rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Suspense>
            <FilterBar total={listings.length} />
          </Suspense>
          {listings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#62708A" }}>
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No short handles available right now.</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Check back soon or contact the broker for off-market listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
