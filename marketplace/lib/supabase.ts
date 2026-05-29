import { createClient } from "@supabase/supabase-js";
import type { Listing } from "./types";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  return createClient(url, key);
}

export async function getLiveListings(filters?: {
  niche?: string;
  maxChars?: number;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Listing[]> {
  const db = getClient();
  let q = db
    .from("listings")
    .select("*")
    .eq("status", "live")
    .order("created_at", { ascending: false });

  if (filters?.niche) q = q.eq("niche", filters.niche);
  if (filters?.maxChars) q = q.lte("char_length", filters.maxChars);
  if (filters?.minPrice) q = q.gte("price_inr", filters.minPrice);
  if (filters?.maxPrice) q = q.lte("price_inr", filters.maxPrice);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function getListingById(id: string): Promise<Listing | null> {
  const db = getClient();
  const { data } = await db
    .from("listings")
    .select("*")
    .eq("id", id)
    .single();
  return data as Listing | null;
}
