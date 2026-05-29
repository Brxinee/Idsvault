import type { Metadata } from "next";
import { Suspense } from "react";
import { getLiveListings } from "@/lib/supabase";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "OG Instagram Handles for Sale India — Original, Rare Usernames",
  description:
    "Buy rare OG Instagram handles in India. Single-word, original, 4–6 character usernames with clean history. Broker-assisted transfer, INR payments.",
  keywords: ["og instagram handle", "og instagram username", "rare instagram username india", "original instagram handle for sale"],
};

type Props = { searchParams: Promise<{ sort?: string }> };

export default async function OGPage({ searchParams }: Props) {
  const sp = await searchParams;
  let listings = await getLiveListings({ niche: "og" }).catch(() => []);
  // Also include short handles (≤5 chars) that aren't already niche=og
  const short = await getLiveListings({ maxChars: 5 }).catch(() => []);
  const combined = [...listings, ...short.filter((s) => !listings.find((l) => l.id === s.id))];
  listings = combined;
  if (sp.sort === "price_asc") listings.sort((a, b) => a.price_inr - b.price_inr);
  else if (sp.sort === "price_desc") listings.sort((a, b) => b.price_inr - a.price_inr);

  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            OG Instagram Handles
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            Original, rare handles — short, clean, and never repurposed. These are the handles that define a brand before
            it even launches.
          </p>
        </div>
      </section>

      <section style={{ background: "#F5F8FC", padding: "2.5rem 0 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ maxWidth: "72ch" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "#14264F", marginBottom: "0.75rem" }}>
              What Makes an Instagram Handle "OG"?
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              In the Instagram world, an "OG" (Original) handle is one that was registered early, is short (typically
              4–6 characters), single-word, and has never been repurposed or recycled by Instagram. OG handles carry
              immense brand value because they are impossible to recreate once taken — Instagram stopped allowing
              re-registration of previously deleted short handles years ago.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Brands pay premium prices for OG handles because they signal credibility and make advertising simpler —
              a 4-letter username fits on a billboard, a business card, and a TV commercial without truncation. Indian
              startups and D2C brands in particular have been aggressively acquiring short handles as they scale.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              IDsvault verifies ownership and account age before listing any OG handle. We do not list handles that have
              prior violations, restricted statuses, or unclear ownership history. Every handle comes with a written
              broker assessment before the transfer begins.
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
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No OG listings right now.</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>New handles are added regularly — message the broker on Telegram to get notified.</p>
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
