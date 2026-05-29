"use client";

import { useEffect, useState, useCallback } from "react";
import type { Listing } from "@/lib/types";

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initData: string;
        initDataUnsafe: {
          user?: { id: number; first_name?: string; username?: string };
          start_param?: string;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          setText: (text: string) => void;
          onClick: (fn: () => void) => void;
          offClick: (fn: () => void) => void;
        };
        BackButton: { show: () => void; hide: () => void; onClick: (fn: () => void) => void; offClick: (fn: () => void) => void };
        showAlert: (msg: string, cb?: () => void) => void;
        showConfirm: (msg: string, cb: (confirmed: boolean) => void) => void;
        HapticFeedback: { notificationOccurred: (type: "error" | "success" | "warning") => void };
        setHeaderColor: (color: string) => void;
        colorScheme: string;
      };
    };
  }
}

const NICHES = ["", "gaming", "fashion", "fitness", "food", "travel", "tech", "meme", "og", "sports", "finance", "comedy", "brandable"];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function MiniAppPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Listing | null>(null);
  const [niche, setNiche] = useState("");
  const [sort, setSort] = useState("newest");
  const [reserving, setReserving] = useState(false);
  const [reservedHandle, setReservedHandle] = useState<string | null>(null);

  const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

  // Init Telegram SDK
  useEffect(() => {
    if (!tg) return;
    tg.ready();
    tg.expand();
    tg.setHeaderColor("#14264F");
  }, [tg]);

  // Fetch listings
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (niche) params.set("niche", niche);
      if (sort !== "newest") params.set("sort", sort);
      const res = await fetch(`/api/listings?${params}`);
      const json = await res.json();
      setListings(json.listings ?? []);
    } catch {
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [niche, sort]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  // Handle deep-link start param (listing_<id>)
  useEffect(() => {
    const param = tg?.initDataUnsafe?.start_param;
    if (param?.startsWith("listing_")) {
      const id = param.replace("listing_", "");
      const found = listings.find((l) => l.id === id);
      if (found) setSelected(found);
    }
  }, [listings, tg?.initDataUnsafe?.start_param]);

  // Back button
  useEffect(() => {
    if (!tg) return;
    const handler = () => { setSelected(null); setReservedHandle(null); };
    if (selected || reservedHandle) {
      tg.BackButton.show();
      tg.BackButton.onClick(handler);
    } else {
      tg.BackButton.hide();
      tg.BackButton.offClick(handler);
    }
    return () => { tg.BackButton.offClick(handler); };
  }, [selected, reservedHandle, tg]);

  // Main button for reservation
  useEffect(() => {
    if (!tg) return;
    const mb = tg.MainButton;
    const handler = async () => {
      if (!selected || reserving) return;
      const initData = tg.initData;
      if (!initData) {
        tg.showAlert("Please open this app via the Telegram bot to reserve.");
        return;
      }
      tg.showConfirm(`Reserve @${selected.handle} for ${formatINR(selected.price_inr)}?`, async (confirmed) => {
        if (!confirmed) return;
        setReserving(true);
        mb.disable();
        mb.setText("Reserving...");
        try {
          const res = await fetch("/api/telegram/reserve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listing_id: selected.id, init_data: initData }),
          });
          const json = await res.json();
          if (json.ok) {
            tg.HapticFeedback.notificationOccurred("success");
            setReservedHandle(selected.handle);
            setSelected(null);
          } else {
            tg.HapticFeedback.notificationOccurred("error");
            tg.showAlert(json.error === "Not available" ? "This handle was just reserved by someone else." : "Reservation failed. Please try again.");
          }
        } catch {
          tg.showAlert("Network error. Please try again.");
        } finally {
          setReserving(false);
          mb.enable();
          mb.setText("Reserve This Handle");
        }
      });
    };

    if (selected) {
      mb.setText("Reserve This Handle");
      mb.color = "#0FA968";
      mb.textColor = "#FFFFFF";
      mb.enable();
      mb.show();
      mb.onClick(handler);
    } else {
      mb.hide();
      mb.offClick(handler);
    }
    return () => { mb.offClick(handler); };
  }, [selected, reserving, tg]);

  if (reservedHandle) {
    return (
      <div style={{ padding: "2rem 1.25rem", textAlign: "center", maxWidth: "32rem", margin: "0 auto" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2rem", color: "#14264F", marginBottom: "0.75rem" }}>
          @{reservedHandle} Reserved!
        </h1>
        <p style={{ color: "#62708A", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          The broker will contact you shortly to arrange payment and the live transfer call.
        </p>
        <p style={{ color: "#62708A", fontSize: "0.875rem" }}>Your reservation is valid for 48 hours.</p>
        <button
          onClick={() => { setReservedHandle(null); setSelected(null); fetchListings(); }}
          style={{ marginTop: "1.75rem", background: "#14264F", color: "#fff", border: "none", borderRadius: "0.625rem", padding: "0.75rem 1.5rem", fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer" }}
        >
          Browse More Handles
        </button>
      </div>
    );
  }

  if (selected) {
    return (
      <div style={{ padding: "1.25rem", maxWidth: "32rem", margin: "0 auto" }}>
        <button
          onClick={() => setSelected(null)}
          style={{ background: "none", border: "none", color: "#62708A", fontSize: "0.875rem", cursor: "pointer", marginBottom: "1.25rem", padding: 0 }}
        >
          ← Back
        </button>

        <div style={{ background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "1rem", padding: "1.5rem" }}>
          <span style={{ display: "inline-block", background: "#DCFCE7", color: "#0FA968", fontSize: "0.6875rem", fontWeight: 700, padding: "0.2rem 0.625rem", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.875rem" }}>
            Live
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "2.5rem", color: "#14264F", lineHeight: 1, marginBottom: "0.25rem" }}>
            @{selected.handle}
          </h1>
          <p style={{ fontSize: "0.8125rem", color: "#62708A", marginBottom: "1.5rem" }}>Instagram Username</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <StatCell label="Price" value={formatINR(selected.price_inr)} accent />
            {selected.char_length != null && <StatCell label="Length" value={`${selected.char_length} chars`} />}
            {selected.followers != null && <StatCell label="Followers" value={selected.followers >= 1000 ? `${(selected.followers / 1000).toFixed(1)}k` : String(selected.followers)} />}
            {selected.niche && <StatCell label="Niche" value={selected.niche} />}
          </div>

          {selected.description && (
            <p style={{ fontSize: "0.875rem", color: "#62708A", lineHeight: 1.6, marginBottom: "1.25rem" }}>{selected.description}</p>
          )}

          <div style={{ background: "#fff", border: "1px solid #E3E9F1", borderRadius: "0.625rem", padding: "0.875rem", fontSize: "0.8125rem", color: "#62708A" }}>
            No payment now. Broker holds funds until live transfer is confirmed.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "2rem" }}>
      {/* Header */}
      <div style={{ background: "#14264F", padding: "1rem 1.25rem 0.875rem", position: "sticky", top: 0, zIndex: 10 }}>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", color: "#fff", lineHeight: 1 }}>
          IDs<span style={{ color: "#0FA968" }}>vault</span>
        </p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "0.2rem" }}>Browse verified handles</p>
      </div>

      {/* Filters */}
      <div style={{ padding: "0.875rem 1.25rem", background: "#F5F8FC", borderBottom: "1px solid #E3E9F1", display: "flex", gap: "0.5rem", overflowX: "auto" }}>
        <select
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          style={{ border: "1px solid #E3E9F1", borderRadius: "0.5rem", padding: "0.375rem 0.625rem", fontSize: "0.8125rem", background: "#fff", color: "#1A2436", flexShrink: 0 }}
        >
          <option value="">All niches</option>
          {NICHES.filter(Boolean).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ border: "1px solid #E3E9F1", borderRadius: "0.5rem", padding: "0.375rem 0.625rem", fontSize: "0.8125rem", background: "#fff", color: "#1A2436", flexShrink: 0 }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
        <span style={{ fontSize: "0.75rem", color: "#62708A", alignSelf: "center", marginLeft: "auto", flexShrink: 0 }}>
          {loading ? "Loading…" : `${listings.length} available`}
        </span>
      </div>

      {/* Listings */}
      <div style={{ padding: "0.875rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ background: "#F5F8FC", border: "1px solid #E3E9F1", borderRadius: "0.875rem", padding: "1.25rem", height: "7rem", opacity: 0.5 }} />
          ))
        ) : listings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#62708A" }}>
            <p style={{ fontWeight: 600 }}>No listings match your filters.</p>
          </div>
        ) : (
          listings.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              style={{
                background: "#F5F8FC",
                border: "1px solid #E3E9F1",
                borderRadius: "0.875rem",
                padding: "1rem 1.125rem",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.375rem", color: "#14264F", lineHeight: 1 }}>
                  @{l.handle}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#62708A", marginTop: "0.2rem" }}>
                  {l.char_length} chars
                  {l.followers ? ` · ${l.followers >= 1000 ? (l.followers / 1000).toFixed(1) + "k" : l.followers} followers` : ""}
                  {l.niche ? ` · ${l.niche}` : ""}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0FA968" }}>{formatINR(l.price_inr)}</p>
                <p style={{ fontSize: "0.6875rem", color: "#62708A", marginTop: "0.15rem" }}>Tap to reserve</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function StatCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E3E9F1", borderRadius: "0.5rem", padding: "0.75rem" }}>
      <p style={{ fontSize: "0.625rem", fontWeight: 600, color: "#62708A", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: accent ? "1.125rem" : "0.875rem", fontWeight: 700, color: accent ? "#0FA968" : "#14264F", marginTop: "0.2rem" }}>{value}</p>
    </div>
  );
}
