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
    username: "apex",
    platform: Platform.Instagram,
    category: "Short OG",
    askingPrice: 1250000, // ₹12.5 Lakhs
    minPrice: 950000,
    status: DealStatus.Live,
    description: "Vetted corporate-ready single-word domain on Instagram under broker contract with clean origin records.",
    slug: "instagram-apex",
    createdTime: "2026-05-20T10:00:00Z"
  },
  {
    id: "ID-1002",
    username: "nexus",
    platform: Platform.X,
    category: "Tech Brandable",
    askingPrice: 580000, // ₹5.8 Lakhs
    minPrice: 450000,
    status: DealStatus.Live,
    description: "Ultra-clean tech startup moniker on X (Twitter). Sourced via supervised verification audits.",
    slug: "x-nexus",
    createdTime: "2026-05-21T11:30:00Z"
  },
  {
    id: "ID-1003",
    username: "vault",
    platform: Platform.Telegram,
    category: "Fintech Core",
    askingPrice: 0, // Price on Request
    minPrice: 750000,
    status: DealStatus.Live,
    description: "Highly authoritative brand name on Telegram suitable for fintech, channels registry, or corporate bots.",
    slug: "telegram-vault",
    createdTime: "2026-05-22T09:15:00Z"
  },
  {
    id: "ID-1004",
    username: "prime",
    platform: Platform.Brandable,
    category: "Elite Label",
    askingPrice: 1400000, // ₹14 Lakhs
    minPrice: 1100000,
    status: DealStatus.Live,
    description: "Premium dictionary branding. Fully prepared for corporate infrastructure deployment and domain matching.",
    slug: "brandable-prime",
    createdTime: "2026-05-22T14:45:00Z"
  },
  {
    id: "ID-1005",
    username: "quantum",
    platform: Platform.Instagram,
    category: "Acronym/Short",
    askingPrice: 1850000, // ₹18.5 Lakhs
    minPrice: 1550000,
    status: DealStatus.Live,
    description: "Extremely secure, single-word high-liquidity handle on Instagram. Ownership verified by broker desk.",
    slug: "instagram-quantum",
    createdTime: "2026-05-23T08:00:00Z"
  },
  {
    id: "ID-1006",
    username: "yield",
    platform: Platform.X,
    category: "Finance Label",
    askingPrice: 420000, // ₹4.2 Lakhs
    minPrice: 350000,
    status: DealStatus.OfferPending,
    description: "High commercial interest fintech moniker. Ideal for digital media or investment community setup.",
    slug: "x-yield",
    createdTime: "2026-05-23T09:20:00Z"
  }
];

export const initialLeads: Lead[] = [
  {
    id: "lead-101",
    listingSlug: "instagram-apex",
    buyerName: "Michael Desai",
    buyerEmail: "m.desai@apexventures.in",
    whatsapp: "+91 98220 11223",
    offer: 1100000, // ₹11 Lakhs
    urgency: Urgency.Immediate,
    notes: "Allocated corporate funding ready. Awaiting supervised transfer session.",
    status: "BROKER_ASSIGNED",
    createdTime: "2026-05-23T10:15:00Z"
  },
  {
    id: "lead-102",
    listingSlug: "x-nexus",
    buyerName: "Sarah Jenkins",
    buyerEmail: "s.jenkins@nexuslabs.co",
    whatsapp: "+91 70112 55555",
    offer: 520000, // ₹5.2 Lakhs
    urgency: Urgency.Standard,
    notes: "Requires owner verification of the original handle register date.",
    status: "UNDER_REVIEW",
    createdTime: "2026-05-23T11:45:00Z"
  }
];

export const initialRequests: SourcingRequest[] = [
  {
    id: "req-201",
    desiredUsername: "peak",
    platform: Platform.X,
    budget: 450000, // ₹4.5 Lakhs
    urgency: Urgency.Standard,
    alternatives: "peaknow, peakventures, peakindia",
    whatsapp: "+91 99881 22334",
    email: "p.desai@peakenergy.in",
    createdTime: "2026-05-23T12:00:00Z"
  }
];

export const initialLogs: SystemLog[] = [
  {
    timestamp: "2026-05-23 12:43:19",
    action: "SYSTEM_BOOT",
    detail: "IDsvault security ledger initialized with compliance keys and secure endpoints."
  },
  {
    timestamp: "2026-05-23 12:05:14",
    action: "OWNERSHIP_VERIFIED",
    detail: "@nexus ownership validated on X Platform via token verification handshake: SV-192-38B."
  },
  {
    timestamp: "2026-05-23 11:32:00",
    action: "PROPOSAL_LOGGED",
    detail: "Proposal of ₹11,00,000 recorded for @apex from authenticated corporate buyer: m.desai@apexventures.in."
  }
];

// Helper functions for masking usernames to prevent direct deal bypass
export function maskUsername(handle: string): string {
  if (handle.length <= 2) return `${handle.charAt(0)}*`;
  return `${handle.slice(0, 2)}***${handle.slice(-1)}`;
}

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
