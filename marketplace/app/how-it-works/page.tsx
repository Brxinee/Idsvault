import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — IDsvault Broker-Assisted Handle Transfers",
  description: "Learn how IDsvault brokers Instagram username transfers safely. Broker-held funds, live transfer call, no upfront risk.",
};

const STEPS = [
  { n: "01", title: "Browse the Inventory", body: "All listed handles are broker-verified. Each listing shows the handle, asking price, follower count, and niche. Listings are updated in real time — a \"Reserved\" badge means the broker is in active negotiation with another buyer." },
  { n: "02", title: "Reserve on Telegram", body: "Click \"Reserve on Telegram\" on any live listing. This opens a direct message to the IDsvault broker bot. Your reservation holds the listing for 48 hours — no payment required at this stage." },
  { n: "03", title: "Broker Confirms & Sends Payment Details", body: "The broker contacts you within a few hours to confirm your identity and interest. You receive the broker's verified business account details for the UPI/NEFT/RTGS transfer. No third-party escrow, no crypto wallet." },
  { n: "04", title: "Transfer Payment to Broker", body: "You transfer the agreed amount (INR) to the broker's business account. The broker holds this — it does not go to the seller yet. You receive a confirmation receipt." },
  { n: "05", title: "Live Transfer Call", body: "The broker schedules a video/voice call with you and the seller. On the call, the seller logs into their Instagram account and changes the username to your chosen new handle (or transfers ownership if the account itself is being sold). You confirm the change on your end in real time." },
  { n: "06", title: "Payment Released, Deal Complete", body: "Once you confirm the transfer is complete and the handle is in your control, the broker releases the held funds to the seller. The deal is done. The broker provides a written summary of the transaction for your records." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section style={{ background: "#14264F", padding: "3rem 0 2.5rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.25rem)", color: "#fff", marginBottom: "0.75rem" }}>
            How It Works
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "42rem", lineHeight: 1.6 }}>
            A six-step process that eliminates scam risk for both buyers and sellers. No automation — a real broker, on a real call.
          </p>
        </div>
      </section>

      <section style={{ padding: "3.5rem 0 5rem" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((step, i) => (
              <div key={step.n} style={{ display: "flex", gap: "1.5rem", paddingBottom: i < STEPS.length - 1 ? "2.5rem" : 0, position: "relative" }}>
                {/* Timeline line */}
                {i < STEPS.length - 1 && (
                  <div style={{ position: "absolute", left: "1.625rem", top: "3rem", bottom: 0, width: "2px", background: "#E3E9F1" }} />
                )}
                {/* Step number circle */}
                <div style={{ flexShrink: 0, width: "3.25rem", height: "3.25rem", borderRadius: "50%", background: "#14264F", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1rem", color: "#0FA968" }}>{step.n}</span>
                </div>
                <div style={{ paddingTop: "0.5rem" }}>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", color: "#14264F", marginBottom: "0.5rem" }}>{step.title}</h2>
                  <p style={{ fontSize: "0.9375rem", color: "#62708A", lineHeight: 1.65 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem", background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "0.875rem", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.25rem", color: "#14264F", marginBottom: "0.75rem" }}>
              Accepted Payment Methods
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["UPI", "NEFT", "RTGS", "IMPS"].map((m) => (
                <div key={m} style={{ background: "#fff", border: "1px solid #E3E9F1", borderRadius: "0.5rem", padding: "0.75rem", textAlign: "center", fontWeight: 700, color: "#14264F", fontSize: "0.9375rem" }}>
                  {m}
                </div>
              ))}
            </div>
            <p style={{ marginTop: "0.875rem", fontSize: "0.8125rem", color: "#62708A" }}>
              All transactions in Indian Rupees (INR). No crypto, no international wire transfers, no third-party escrow apps.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
