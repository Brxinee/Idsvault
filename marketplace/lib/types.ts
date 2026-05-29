export type ListingStatus = "pending" | "live" | "reserved" | "paid" | "completed";

export interface Listing {
  id: string;
  handle: string;
  price_inr: number;
  followers: number | null;
  niche: string | null;
  char_length: number | null;
  description: string | null;
  status: ListingStatus;
  created_at: string;
}

export interface Reservation {
  id: string;
  listing_id: string;
  buyer_telegram: string;
  created_at: string;
}

export interface BotSession {
  chat_id: number;
  step: string | null;
  data: Record<string, string>;
  updated_at: string;
}

export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
}
