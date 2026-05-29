import Link from "next/link";
import type { Listing } from "@/lib/types";

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  live:      { bg: "#DCFCE7", color: "#0FA968", label: "Live" },
  reserved:  { bg: "#FEF3C7", color: "#D97706", label: "Reserved" },
  paid:      { bg: "#F3F4F6", color: "#62708A", label: "Sold" },
  completed: { bg: "#F3F4F6", color: "#62708A", label: "Sold" },
  pending:   { bg: "#F3F4F6", color: "#62708A", label: "Pending" },
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export function ListingCard({ listing }: { listing: Listing }) {
  const s = STATUS_STYLE[listing.status] ?? STATUS_STYLE.live;
  const isClickable = listing.status === "live";

  const card = (
    <article
      style={{
        background: "#F5F8FC",
        border: "1px solid #E3E9F1",
        borderRadius: "0.875rem",
        padding: "1.25rem",
        transition: "box-shadow 0.15s, border-color 0.15s",
        cursor: isClickable ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
      }}
      className={isClickable ? "hover:shadow-md hover:border-[#0FA968]/30" : ""}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#62708A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.25rem" }}>
            @{listing.handle}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "1.625rem",
              color: "#14264F",
              lineHeight: 1,
            }}
          >
            {listing.handle}
          </h3>
        </div>
        <span
          style={{
            background: s.bg,
            color: s.color,
            fontSize: "0.6875rem",
            fontWeight: 700,
            padding: "0.2rem 0.625rem",
            borderRadius: "9999px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {s.label}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {listing.char_length != null && (
          <Stat label="Length" value={`${listing.char_length} chars`} />
        )}
        {listing.followers != null && (
          <Stat label="Followers" value={listing.followers >= 1000 ? `${(listing.followers / 1000).toFixed(1)}k` : String(listing.followers)} />
        )}
        {listing.niche && (
          <Stat label="Niche" value={listing.niche} />
        )}
      </div>

      {listing.description && (
        <p style={{ fontSize: "0.8125rem", color: "#62708A", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {listing.description}
        </p>
      )}

      {/* Price + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid #E3E9F1" }}>
        <div>
          <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "#62708A", textTransform: "uppercase", letterSpacing: "0.06em" }}>Asking Price</p>
          <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0FA968", fontVariantNumeric: "tabular-nums" }}>
            {formatINR(listing.price_inr)}
          </p>
        </div>
        {isClickable && (
          <span
            style={{
              background: "#0FA968",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.4rem 0.875rem",
              borderRadius: "0.5rem",
              letterSpacing: "0.03em",
            }}
          >
            View →
          </span>
        )}
      </div>
    </article>
  );

  if (!isClickable) return card;
  return <Link href={`/listing/${listing.id}`}>{card}</Link>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "#62708A", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#1A2436", textTransform: "capitalize" }}>{value}</p>
    </div>
  );
}
