/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Platform {
  Instagram = "instagram",
  X = "x",
  Telegram = "telegram",
  Brandable = "brandable"
}

export enum DealStatus {
  Live = "LIVE",
  OfferPending = "OFFER_PENDING",
  Sold = "SOLD",
  Quarantined = "QUARANTINED"
}

export enum Urgency {
  Immediate = "Immediate",
  Standard = "Standard",
  Flexible = "Flexible"
}

export interface Listing {
  id: string;
  username: string; // The raw username under contract
  platform: Platform;
  category: string;
  askingPrice: number;
  minPrice: number;
  status: DealStatus;
  description: string;
  slug: string;
  createdTime: string;
}

export interface Lead {
  id: string;
  listingSlug: string;
  buyerName: string;
  buyerEmail: string;
  whatsapp: string;
  offer: number;
  urgency: Urgency;
  notes: string;
  status: string; // "SUBMITTED" | "UNDER_REVIEW" | "BROKER_ASSIGNED" | "COMPLETED"
  createdTime: string;
}

export interface SourcingRequest {
  id: string;
  desiredUsername: string;
  platform: Platform;
  budget: number;
  urgency: Urgency;
  alternatives: string;
  whatsapp: string;
  email: string;
  createdTime: string;
}

export interface BlogSection {
  type: "heading2" | "heading3" | "paragraph" | "list" | "quote" | "table" | "cta";
  content?: string;
  items?: string[]; // for list
  columns?: string[]; // for table
  rows?: string[][]; // for table
  subtitle?: string; // for CTA or heading
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured: boolean;
  status: "published" | "draft";
  introduction: string;
  directAnswer: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  relatedSlugs: string[];
}

export interface SystemLog {
  timestamp: string;
  action: string;
  detail: string;
}

export interface KeepChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface KeepNote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  color: string; // Tailwind color class or hex background overlay
  label: string; // e.g. "Registry", "Sourcing", "Escrow", "Personal"
  checklist: KeepChecklistItem[] | null;
  image: string | null; // Base64 image attachment
  lastUpdated: string;
  isGoogleSynced: boolean;
}



