import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { sendMessage, validateInitData, getUserFromInitData, formatINR } from "@/lib/telegram";

const ADMIN = () => process.env.TELEGRAM_ADMIN_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { listing_id, init_data } = await req.json();

    if (!listing_id || !init_data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate Telegram Mini App initData HMAC
    if (!validateInitData(init_data)) {
      return NextResponse.json({ error: "Invalid initData" }, { status: 401 });
    }

    const user = getUserFromInitData(init_data);
    if (!user) {
      return NextResponse.json({ error: "No user in initData" }, { status: 400 });
    }

    const db = createServiceClient();
    const { data: listing } = await db.from("listings").select("*").eq("id", listing_id).maybeSingle();

    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (listing.status !== "live") return NextResponse.json({ error: "Not available", status: listing.status }, { status: 409 });

    const buyerTelegram = user.username ?? String(user.id);

    const { error } = await db.from("reservations").insert({ listing_id, buyer_telegram: buyerTelegram });
    if (error) return NextResponse.json({ error: "Reservation failed" }, { status: 500 });

    await db.from("listings").update({ status: "reserved" }).eq("id", listing_id);

    // Notify buyer via bot
    await sendMessage(
      user.id,
      `✅ <b>@${listing.handle}</b> is reserved for you!\n\n` +
      `💰 ${formatINR(listing.price_inr)}\n\n` +
      `The broker will contact you to arrange payment and the live transfer call. Reservation valid 48 hours.`
    );

    // Alert admin
    await sendMessage(
      ADMIN(),
      `🔔 <b>Mini App Reservation</b>\n\n` +
      `Handle: <b>@${listing.handle}</b>\n` +
      `Price: ${formatINR(listing.price_inr)}\n` +
      `Buyer: @${buyerTelegram} (ID: ${user.id})\n` +
      `Listing ID: <code>${listing_id}</code>\n\n` +
      `/paid ${listing_id} — after payment\n/done ${listing_id} — after transfer`
    );

    return NextResponse.json({ ok: true, handle: listing.handle });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
