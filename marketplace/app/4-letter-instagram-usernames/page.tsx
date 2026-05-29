import type { Metadata } from "next";
import { Suspense } from "react";
import { getLiveListings } from "@/lib/supabase";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar } from "@/components/FilterBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "4-Letter Instagram Usernames for Sale India",
  description:
    "Buy 4-letter Instagram usernames in India. Rare, short, brandable handles — broker-held payment, live transfer call. IDsvault Hyderabad.",
  keywords: ["4 letter instagram username", "4 character instagram handle", "buy 4 letter instagram india", "short instagram username 4 characters"],
};

type Props = { searchParams: Promise<{ sort?: string }> };

export default async function FourLetterPage({ searchParams }: Props) {
  const sp = await searchParams;
  let listings = await getLiveListings({ maxChars: 4 }).catch(() => []);
  if (sp.sort === "price_asc") listings.sort((a, b) => a.price_inr - b.price_inr);
  else if (sp.sort === "price_desc") listings.sort((a, b) => b.price_inr - a.price_inr);

  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            4-Letter Instagram Usernames
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            The rarest category. Four-character handles have not been freely available on Instagram since the platform&apos;s
            early years — every one of these comes with direct ownership verification.
          </p>
        </div>
      </section>

      <section style={{ background: "#F5F8FC", padding: "2.5rem 0 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div style={{ maxWidth: "72ch" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.5rem", color: "#14264F", marginBottom: "0.75rem" }}>
              Why 4-Letter Instagram Usernames Are Worth Premium Prices
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              Instagram first opened registrations in 2010 and had no minimum username length. Users who registered
              early claimed handles as short as one or two characters. By 2012, most meaningful 4-letter combinations
              had already been taken. Since then, Instagram has never released a mechanism to freely claim deleted
              4-letter handles — they enter a limbo state rather than being available for re-registration.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "0.75rem" }}>
              This creates genuine scarcity. A 4-letter handle is almost certainly unique across the platform, easy to
              type on mobile, fits on a business card, and makes a brand immediately look established. Indian D2C
              brands, fintech startups, and personal brands pay ₹50,000–₹5,00,000 or more for the right 4-letter handle.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              IDsvault brokers 4-letter handle transfers with full ownership verification. We confirm the seller&apos;s
              identity, verify the account has no pending violations, and conduct the transfer on a live call where both
              parties are present. The buyer watches the username change in real time before any payment is released.
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
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>No 4-letter listings right now.</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>These are extremely rare — contact the broker to be put on a waitlist.</p>
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
