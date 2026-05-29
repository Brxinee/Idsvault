const BADGES = [
  { icon: "🔒", title: "Broker-Held Funds", body: "Your payment stays with the broker until the handle transfer is confirmed live." },
  { icon: "📞", title: "On-Call Transfer", body: "Buyer, seller, and broker on a live call — you watch the username change hands in real time." },
  { icon: "✅", title: "Ownership Verified", body: "Every listed handle is verified for authentic ownership before going live on the marketplace." },
  { icon: "🇮🇳", title: "India-Based Broker", body: "INR payments via UPI / NEFT. Hyderabad, Telangana. No crypto, no escrow middlemen." },
];

export function TrustBadges() {
  return (
    <section style={{ background: "#F5F8FC", padding: "4rem 0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 900,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#14264F",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          Why Buyers Trust IDsvault
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BADGES.map((b) => (
            <div
              key={b.title}
              style={{
                background: "#fff",
                border: "1px solid #E3E9F1",
                borderRadius: "0.875rem",
                padding: "1.5rem",
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{b.icon}</span>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "1.125rem",
                  color: "#14264F",
                  margin: "0.75rem 0 0.4rem",
                }}
              >
                {b.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#62708A", lineHeight: 1.55 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
