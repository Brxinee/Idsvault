import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About IDsvault — Hyderabad Instagram Handle Broker",
  description: "IDsvault is a broker-assisted Instagram username marketplace based in Hyderabad, India. Founder: Jogdhande Nikhil Patil.",
};

export default function AboutPage() {
  const tg = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";
  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            About IDsvault
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            India&apos;s trusted broker for Instagram and Telegram username transactions.
          </p>
        </div>
      </section>

      <section style={{ padding: "3.5rem 0 5rem" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose">
            <h2>Who We Are</h2>
            <p>
              IDsvault is a private brokerage desk operated by <strong>Jogdhande Nikhil Patil</strong> from Hyderabad,
              Telangana, India. We facilitate the buying and selling of Instagram and Telegram usernames through a
              manual broker-assisted process that eliminates the two biggest risks in the handle market: buyers paying
              and never receiving, and sellers transferring and never getting paid.
            </p>

            <h2>Why We Exist</h2>
            <p>
              The secondary market for social media usernames is real, growing, and almost completely unregulated.
              Buyers and sellers transact on Twitter DMs, Telegram groups, and WhatsApp threads with no protection
              and no recourse when deals go wrong. Automated escrow apps exist, but they create new risks —
              platform bugs, chargeback fraud, and identity verification gaps.
            </p>
            <p>
              A human broker on a live call is the oldest and most reliable form of transaction protection. You
              can verify the seller&apos;s account yourself, watch the transfer happen in real time, and confirm receipt
              before a single rupee leaves the broker&apos;s account. That&apos;s the IDsvault model.
            </p>

            <h2>What We List</h2>
            <p>
              We accept listings for Instagram handles and Telegram usernames. Every submission goes through a
              manual review: we verify that the seller is the genuine account owner, that the account has no
              pending ToS violations, and that the handle is not involved in any ongoing disputes. We do not
              list adult-content accounts, compromised accounts, or handles with unclear ownership history.
            </p>

            <h2>Our Fees</h2>
            <p>
              Sellers pay no listing fee. The broker&apos;s commission is a percentage of the final sale price,
              agreed upfront before the listing goes live. Buyers pay the listed price with no additional fees.
            </p>

            <h2>Contact</h2>
            <p>
              The fastest way to reach us is on Telegram. For any business, legal, or partnership enquiry, message
              the broker directly.
            </p>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <a
              href={`https://t.me/${tg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#0FA968", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9375rem" }}
            >
              Message on Telegram
            </a>
            <a
              href="mailto:broker@idsvault.com"
              style={{ background: "#F5F8FC", color: "#14264F", padding: "0.75rem 1.5rem", borderRadius: "0.625rem", fontWeight: 700, fontSize: "0.9375rem", border: "1px solid #E3E9F1" }}
            >
              broker@idsvault.com
            </a>
          </div>

          <div style={{ marginTop: "3rem", background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <p style={{ fontSize: "0.8125rem", color: "#62708A", lineHeight: 1.6 }}>
              <strong style={{ color: "#14264F" }}>Legal notice:</strong> IDsvault does not guarantee that Instagram or Telegram
              will not take enforcement action on transferred accounts. Platform ToS risk is disclosed to all buyers before
              any transaction begins. Business registration is currently in progress. All transactions are in INR.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
