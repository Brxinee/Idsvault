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

export interface SystemLog {
  timestamp: string;
  action: string;
  detail: string;
}
