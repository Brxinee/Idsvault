"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const NICHES = ["all", "gaming", "fashion", "fitness", "food", "travel", "tech", "meme", "og", "4-letter", "sports", "finance", "comedy", "lifestyle", "brandable"];
const LENGTHS = [
  { label: "Any", value: "" },
  { label: "≤4 chars", value: "4" },
  { label: "≤5 chars", value: "5" },
  { label: "≤6 chars", value: "6" },
  { label: "≤8 chars", value: "8" },
];

const SELECT_STYLE: React.CSSProperties = {
  appearance: "none",
  WebkitAppearance: "none",
  background: "#fff",
  border: "1px solid #E3E9F1",
  borderRadius: "0.5rem",
  padding: "0.45rem 2rem 0.45rem 0.75rem",
  fontSize: "0.875rem",
  color: "#1A2436",
  fontFamily: "var(--font-body)",
  cursor: "pointer",
  outline: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2362708A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.6rem center",
};

export function FilterBar({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const set = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(sp.toString());
      if (value) p.set(key, value); else p.delete(key);
      router.push(`${pathname}?${p.toString()}`);
    },
    [router, pathname, sp]
  );

  return (
    <div
      style={{
        background: "#F5F8FC",
        border: "1px solid #E3E9F1",
        borderRadius: "0.75rem",
        padding: "1rem 1.25rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#62708A" }}>
        {total} listing{total !== 1 ? "s" : ""}
      </span>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", flex: 1, justifyContent: "flex-end" }}>
        <div style={{ position: "relative" }}>
          <select
            style={SELECT_STYLE}
            value={sp.get("niche") ?? "all"}
            onChange={(e) => set("niche", e.target.value === "all" ? "" : e.target.value)}
          >
            {NICHES.map((n) => (
              <option key={n} value={n}>{n === "all" ? "All niches" : n}</option>
            ))}
          </select>
        </div>

        <div style={{ position: "relative" }}>
          <select
            style={SELECT_STYLE}
            value={sp.get("chars") ?? ""}
            onChange={(e) => set("chars", e.target.value)}
          >
            {LENGTHS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        <div style={{ position: "relative" }}>
          <select
            style={SELECT_STYLE}
            value={sp.get("sort") ?? "newest"}
            onChange={(e) => set("sort", e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price_asc">Price: low → high</option>
            <option value="price_desc">Price: high → low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
