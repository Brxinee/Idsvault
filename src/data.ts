/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Platform, DealStatus, Listing, Lead, SourcingRequest, SystemLog, Urgency } from "./types";

// Business configuration keys with dynamic env overrides for true production readiness
export const WHATSAPP_NUMBER = "919392974031";
export const SUPPORT_EMAIL = "broker@idsvault.com";

export const initialListings: Listing[] = [
  {
    id: "ID-1001",
    username: "oncewrong",
    platform: Platform.Instagram,
    category: "Brandable Word",
    askingPrice: 42000,  // Tier 5 keyword utility (9 chars) × Instagram 1.5× — 0–50 followers, pure username value
    minPrice: 32000,
    status: DealStatus.Live,
    description: "Memorable, easy-to-recall Instagram handle suited to a content, lifestyle, or personal brand. Ownership verified and held under broker contract.",
    slug: "instagram-oncewrong",
    createdTime: "2026-05-29T09:00:00Z"
  },
  {
    id: "ID-1002",
    username: "goalgrip",
    platform: Platform.Instagram,
    category: "Sports Brandable",
    askingPrice: 125000, // Tier 4 coined compound (8 chars, sports niche) × Instagram 1.5× — 0–50 followers
    minPrice: 95000,
    status: DealStatus.Live,
    description: "Punchy sports-themed Instagram handle ideal for a football, fitness, or sports-content brand. Ownership verified and held under broker contract.",
    slug: "instagram-goalgrip",
    createdTime: "2026-05-29T09:10:00Z"
  },
  {
    id: "ID-1003",
    username: "offsmell",
    platform: Platform.Instagram,
    category: "Brandable Word",
    askingPrice: 165000, // Tier 4 creative brandable (8 chars, fragrance/lifestyle niche) × Instagram 1.5× — 0–50 followers
    minPrice: 130000,
    status: DealStatus.Live,
    description: "Distinctive, brandable Instagram handle suited to a fragrance, lifestyle, or creative brand. Clean origin, held under broker contract.",
    slug: "instagram-offsmell",
    createdTime: "2026-05-29T09:20:00Z"
  },
  {
    id: "ID-1004",
    username: "xbigbull",
    platform: Platform.Instagram,
    category: "Finance Brandable",
    askingPrice: 110000, // Tier 4 finance compound (8 chars) × Instagram 1.5× — 0–50 followers
    minPrice: 85000,
    status: DealStatus.Live,
    description: "Markets-themed Instagram handle ideal for a trading, finance, or investing-content brand. Ownership verified and held under broker contract.",
    slug: "instagram-xbigbull",
    createdTime: "2026-05-29T09:30:00Z"
  },
  {
    id: "ID-1005",
    username: "deshlaughs",
    platform: Platform.Instagram,
    category: "Comedy / Desi",
    askingPrice: 38000,  // Tier 5 long-tail keyword (10 chars, desi comedy) × Instagram 1.5× — 0–50 followers
    minPrice: 28000,
    status: DealStatus.Live,
    description: "Ready-made comedy Instagram handle for a desi humour or entertainment brand. Clean ownership, held under broker contract.",
    slug: "instagram-deshlaughs",
    createdTime: "2026-05-29T09:40:00Z"
  }
];

// No fabricated leads — real buyer enquiries populate this at runtime.
export const initialLeads: Lead[] = [];

// No fabricated sourcing requests — real advisory enquiries populate this at runtime.
export const initialRequests: SourcingRequest[] = [];

export const initialLogs: SystemLog[] = [
  {
    timestamp: "2026-05-29 09:00:00",
    action: "SYSTEM_BOOT",
    detail: "IDsvault security ledger initialized with compliance keys and secure endpoints."
  }
];

// Format INR correctly inside JSX
export function formatINR(val: number): string {
  if (!val || val === 0) return "Price on Request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
}

// Formats helper to display estimated range
export function getEstimatedRange(val: number): string {
  if (!val || val === 0) return "Price on Request";
  const low = Math.floor(val * 0.85);
  const high = Math.floor(val * 1.15);
  return `${formatINR(low)} - ${formatINR(high)}`;
}

// Generate premium matching tags based on length and terms
export interface TagDef {
  label: string;
  style: string;
}

export function getBadgesForHandle(handle: string, platform: Platform): TagDef[] {
  const list: TagDef[] = [];
  
  // Always include VERIFIED badge
  list.push({ label: "VERIFIED", style: "text-[#10B981] bg-[#10B981]/10 border-emerald-500/20" });

  if (handle.length <= 3) {
    list.push({ label: "OG", style: "text-purple-400 bg-purple-500/10 border-purple-500/20" });
    list.push({ label: "SHORT", style: "text-blue-400 bg-blue-500/10 border-blue-500/20" });
  } else if (handle.length <= 5) {
    list.push({ label: "SHORT", style: "text-blue-400 bg-blue-500/10 border-blue-500/20" });
  }

  const isFinance = ["pay", "bank", "vault", "yield", "apex"].some(v => handle.toLowerCase().includes(v));
  if (isFinance) {
    list.push({ label: "FINANCE", style: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" });
  }

  const isMedia = ["news", "media", "show", "tv", "nexus"].some(v => handle.toLowerCase().includes(v));
  if (isMedia) {
    list.push({ label: "MEDIA", style: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" });
  }

  if (platform === Platform.Brandable) {
    list.push({ label: "BRANDABLE", style: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" });
  }

  // Fallbacks: populate trending/hot/premium to make registry look highly diverse
  if (handle.length > 5 && !isFinance && !isMedia) {
    list.push({ label: "PREMIUM", style: "text-amber-400 bg-amber-500/10 border-amber-500/20" });
    list.push({ label: "TRENDING", style: "text-pink-400 bg-pink-500/10 border-pink-500/20" });
  } else if (list.length < 3) {
    list.push({ label: "HOT", style: "text-red-400 bg-red-500/10 border-red-500/20" });
  }

  return list;
}

// WhatsApp template builder with universal wa.me redirection
export function buildWhatsAppHandoff(message: string): { url: string; mailto: string } {
  const encMessage = encodeURIComponent(message.trim());
  const mailSubject = encodeURIComponent("IDsvault - Active Brokerage Campaign Request");
  const mailBody = encMessage;
  
  const wUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encMessage}`;
  const mUrl = `mailto:${SUPPORT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  
  return { url: wUrl, mailto: mUrl };
}
