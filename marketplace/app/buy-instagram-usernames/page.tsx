import type { Metadata } from "next";
import { Suspense } from "react";
import { getLiveListings } from "@/lib/supabase";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buy Instagram Usernames India — Verified Handles for Sale",
  description:
    "Browse broker-verified Instagram usernames for sale in India. Secure broker-held transfer, live on-call handover, INR payments. IDsvault Hyderabad.",
  keywords: ["buy instagram username india", "instagram handle for sale", "buy instagram account username", "purchase instagram username india"],
  openGraph: { title: "Buy Instagram Usernames India | IDsvault", description: "Verified Instagram handles. Broker-held payment. Live transfer." },
};

type Props = { searchParams: Promise<{ niche?: string; chars?: string; sort?: string }> };

export default async function BuyPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters: Parameters<typeof getLiveListings>[0] = {};
  if (sp.niche) filters.niche = sp.niche;
  if (sp.chars) filters.maxChars = Number(sp.chars);

  let listings = await getLiveListings(filters).catch(() => []);
  if (sp.sort === "price_asc") listings.sort((a, b) => a.price_inr - b.price_inr);
  else if (sp.sort === "price_desc") listings.sort((a, b) => b.price_inr - a.price_inr);

  return (
    <>
      {/* Page header */}
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Buy Instagram Usernames
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            Every handle below is broker-verified and available for immediate reservation. Payment is held by the broker
            until the live transfer is confirmed — you never pay before the handle is yours.
          </p>
        </div>
      </section>

      {/* SEO copy */}
      <section style={{ background: "#F5F8FC", padding: "2.5rem 0 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ maxWidth: "72ch" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "#14264F", marginBottom: "0.75rem" }}>
              How to Buy an Instagram Username Safely in India
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              The Instagram username market in India has exploded — short, memorable handles that were once ignored are now
              worth tens of thousands of rupees for brands, creators, and businesses. But the market is full of scams.
              Buyers send money and never receive the handle; sellers transfer and never get paid.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              IDsvault eliminates both risks with a simple broker model: you pay the broker (not the seller directly),
              the broker facilitates a live transfer call, and releases funds only after the handle is confirmed in your
              account. No escrow software, no smart contracts — just a verified human intermediary with a Hyderabad
              business address and a verifiable track record.
            </p>
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <section style={{ padding: "2rem 0 4rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Suspense>
            <FilterBar total={listings.length} />
          </Suspense>
          {listings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#62708A" }}>
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No listings match your filters.</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Try removing a filter or check back soon.</p>
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
