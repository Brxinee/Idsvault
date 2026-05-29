import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — IDsvault Instagram Handle Marketplace",
  description: "Common questions about buying and selling Instagram usernames through IDsvault. Broker process, pricing, safety, legality.",
};

const FAQS = [
  { q: "Is it legal to buy or sell an Instagram username in India?", a: "Instagram's Terms of Service prohibit username transfers between users, which means there is inherent platform risk — Instagram can suspend accounts involved in transfers if detected. IDsvault discloses this risk explicitly and in writing before any engagement. We recommend buyers understand this risk. In practice, broker-supervised transfers that resemble organic account activity carry the lowest detection risk, but no guarantee can be made. Telegram username transfers carry no equivalent platform risk." },
  { q: "How does the broker hold my money?", a: "You transfer payment to the broker's verified Indian business bank account via UPI/NEFT/RTGS. The funds are held in that account — not in escrow software, not in a crypto wallet, not in a third-party app. The broker is the escrow. Payment is released to the seller only after you confirm the handle is in your control on the live call." },
  { q: "What happens if the transfer fails mid-call?", a: "If the transfer attempt fails (Instagram rejects the username change, seller backs out, or any technical issue), the call ends and your funds are returned to you within 24 hours. No fees are charged for failed transfers." },
  { q: "Can I negotiate the price?", a: "Yes. All asking prices are the seller's opening price. Once you reserve a listing on Telegram, the broker facilitates price negotiation between you and the seller. The listing price is a ceiling, not always a floor." },
  { q: "How long does a reservation hold my spot?", a: "Reservations are held for 48 hours. If payment is not received within 48 hours, the listing goes back to 'live' status. Extensions can be requested via Telegram." },
  { q: "What niches do you list?", a: "We list Instagram handles across all niches — gaming, fashion, fitness, food, travel, tech, meme accounts, OG/short handles, finance, comedy, and brandable single-word handles. We do not list handles with a history of ToS violations or adult-content accounts." },
  { q: "I want to sell my handle. How do I list it?", a: "Message the broker on Telegram using the /sell command or the link on our homepage. The broker will ask for: the handle, your asking price, followers, and niche. After verification, the listing goes live within 24 hours. Sellers pay no listing fee — the broker's commission is included in the sale price." },
  { q: "Do you handle Telegram usernames too?", a: "Yes. Telegram username transfers are simpler and carry no platform risk. The transfer is done on a live supervised call — the seller changes the username while you watch. Process and fees are identical to Instagram." },
  { q: "How do I know the handle won't be transferred to someone else before I pay?", a: "When you reserve a listing, the broker marks it 'Reserved' immediately and no other buyers can proceed. The reservation is your exclusive window to complete the purchase. Simultaneously, the seller is notified not to change or transfer the handle until the deal is done or the reservation expires." },
  { q: "Who is the broker?", a: "Jogdhande Nikhil Patil, based in Hyderabad, Telangana, India. IDsvault operates as a private brokerage desk — not a registered marketplace platform. Business registration is in progress. Contact via Telegram for any due-diligence queries." },
];

export default function FAQPage() {
  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            Everything you need to know before buying or selling a handle through IDsvault.
          </p>
        </div>
      </section>

      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid #E3E9F1",
                  padding: "1.625rem 0",
                }}
              >
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.125rem", color: "#14264F", marginBottom: "0.625rem" }}>
                  {faq.q}
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
