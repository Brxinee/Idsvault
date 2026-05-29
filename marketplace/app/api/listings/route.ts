import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const db = createServiceClient();

  let q = db.from("listings").select("id,handle,price_inr,followers,niche,char_length,description,status,created_at").eq("status", "live").order("created_at", { ascending: false });

  const niche = sp.get("niche");
  const maxChars = sp.get("chars");
  const sort = sp.get("sort");

  if (niche) q = q.eq("niche", niche);
  if (maxChars) q = q.lte("char_length", Number(maxChars));
  if (sort === "price_asc") q = q.order("price_inr", { ascending: true });
  else if (sort === "price_desc") q = q.order("price_inr", { ascending: false });

  const { data, error } = await q.limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ listings: data ?? [] });
}
