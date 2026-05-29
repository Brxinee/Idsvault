import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { sendMessage, answerCallback, formatINR } from "@/lib/telegram";
import type { Listing } from "@/lib/types";

const ADMIN = () => process.env.TELEGRAM_ADMIN_CHAT_ID!;
const BOT = () => process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "idsvaultbot";
const APP_URL = () => process.env.NEXT_PUBLIC_APP_URL ?? "https://idsvault.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body.message;
    const cb = body.callback_query;

    if (cb) {
      await handleCallback(cb);
      return NextResponse.json({ ok: true });
    }
    if (msg) {
      await handleMessage(msg);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ ok: true }); // always 200 to Telegram
  }
}

// ── Message handler ────────────────────────────────────────────────────────

async function handleMessage(msg: {
  chat: { id: number; username?: string; first_name?: string };
  text?: string;
  message_id: number;
}) {
  const chatId = msg.chat.id;
  const text = (msg.text ?? "").trim();
  const db = createServiceClient();

  // Check for active sell session
  const { data: session } = await db
    .from("bot_sessions")
    .select("*")
    .eq("chat_id", chatId)
    .maybeSingle();

  if (session?.step && !text.startsWith("/")) {
    await handleSellStep(chatId, text, session, db);
    return;
  }

  // Commands
  if (text.startsWith("/start reserve_")) {
    const listingId = text.replace("/start reserve_", "").trim();
    await handleReserve(chatId, listingId, msg.chat.username ?? String(chatId), db);
    return;
  }

  if (text.startsWith("/start listing_")) {
    // Deep link from mini app
    const listingId = text.replace("/start listing_", "").trim();
    const { data: listing } = await db.from("listings").select("*").eq("id", listingId).maybeSingle();
    if (listing && listing.status === "live") {
      await sendMessage(chatId, formatListingMessage(listing as Listing), {
        reply_markup: { inline_keyboard: [[{ text: "✅ Reserve This Handle", callback_data: `reserve:${listing.id}` }]] },
      });
    } else {
      await sendMessage(chatId, "Sorry, that listing is no longer available.");
    }
    return;
  }

  if (text === "/start" || text.startsWith("/start ")) {
    await sendMessage(
      chatId,
      `👋 Welcome to <b>IDsvault</b> — India's broker-assisted Instagram handle marketplace.\n\n` +
      `Every handle is ownership-verified. Your payment stays with the broker until the live transfer is confirmed.\n\n` +
      `<b>Commands:</b>\n` +
      `/browse — See available handles\n` +
      `/sell — List your handle for sale\n\n` +
      `Or browse the full marketplace at ${APP_URL()}`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🛍 Browse Handles", web_app: { url: `${APP_URL()}/mini-app` } }],
            [{ text: "🌐 Open Website", url: APP_URL() }],
          ],
        },
      }
    );
    return;
  }

  if (text === "/browse") {
    const { data: listings } = await db
      .from("listings")
      .select("*")
      .eq("status", "live")
      .order("created_at", { ascending: false })
      .limit(8);

    if (!listings || listings.length === 0) {
      await sendMessage(chatId, "No listings available right now. Check back soon or use /sell to list your own handle.");
      return;
    }

    const lines = (listings as Listing[]).map(
      (l) =>
        `• <b>@${l.handle}</b> — ${formatINR(l.price_inr)}` +
        (l.followers ? ` · ${l.followers >= 1000 ? (l.followers / 1000).toFixed(1) + "k" : l.followers} followers` : "") +
        (l.niche ? ` · ${l.niche}` : "")
    );

    await sendMessage(
      chatId,
      `<b>Live Listings</b>\n\n${lines.join("\n")}\n\n<i>Tap below to browse with filters</i>`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🛍 Browse in App", web_app: { url: `${APP_URL()}/mini-app` } }],
            ...((listings as Listing[]).slice(0, 3).map((l) => [
              { text: `Reserve @${l.handle}`, callback_data: `reserve:${l.id}` },
            ])),
          ],
        },
      }
    );
    return;
  }

  if (text === "/sell") {
    await db.from("bot_sessions").upsert({ chat_id: chatId, step: "handle", data: {} });
    await sendMessage(chatId, "Let's list your handle! 🎯\n\nWhat's the Instagram handle you want to sell?\n<i>(just the username, no @)</i>");
    return;
  }

  // Admin commands
  if (String(chatId) === ADMIN()) {
    if (text.startsWith("/approve ")) {
      const id = text.replace("/approve ", "").trim();
      const { error } = await db.from("listings").update({ status: "live" }).eq("id", id);
      await sendMessage(chatId, error ? `Error: ${error.message}` : `✅ Listing ${id} is now live.`);
      return;
    }
    if (text.startsWith("/paid ")) {
      const id = text.replace("/paid ", "").trim();
      await db.from("listings").update({ status: "paid" }).eq("id", id);
      await sendMessage(chatId, `💰 Listing ${id} marked as paid.`);
      return;
    }
    if (text.startsWith("/done ")) {
      const id = text.replace("/done ", "").trim();
      await db.from("listings").update({ status: "completed" }).eq("id", id);
      await sendMessage(chatId, `🏁 Listing ${id} marked as completed.`);
      return;
    }
  }

  // Fallback
  await sendMessage(chatId, "Use /browse to see listings or /sell to list your handle.");
}

// ── Callback query handler ─────────────────────────────────────────────────

async function handleCallback(cb: {
  id: string;
  data: string;
  from: { id: number; username?: string };
  message: { message_id: number };
}) {
  const chatId = cb.from.id;
  const db = createServiceClient();

  if (cb.data.startsWith("reserve:")) {
    const listingId = cb.data.replace("reserve:", "");
    await answerCallback(cb.id, "Processing reservation...");
    await handleReserve(chatId, listingId, cb.from.username ?? String(chatId), db);
  }
}

// ── Reserve logic ──────────────────────────────────────────────────────────

async function handleReserve(
  chatId: number,
  listingId: string,
  buyerTelegram: string,
  db: ReturnType<typeof createServiceClient>
) {
  const { data: listing } = await db.from("listings").select("*").eq("id", listingId).maybeSingle();

  if (!listing) {
    await sendMessage(chatId, "Listing not found. It may have been removed.");
    return;
  }
  if (listing.status !== "live") {
    await sendMessage(chatId, `Sorry, <b>@${listing.handle}</b> is no longer available (status: ${listing.status}).`);
    return;
  }

  // Create reservation + update status atomically
  const { error } = await db.from("reservations").insert({ listing_id: listingId, buyer_telegram: buyerTelegram });
  if (error) {
    await sendMessage(chatId, "Reservation failed — please try again or contact the broker.");
    return;
  }
  await db.from("listings").update({ status: "reserved" }).eq("id", listingId);

  // Confirm to buyer
  await sendMessage(
    chatId,
    `✅ <b>@${listing.handle}</b> is reserved for you!\n\n` +
    `💰 Asking price: <b>${formatINR(listing.price_inr)}</b>\n\n` +
    `The broker will contact you shortly to arrange payment and the live transfer call.\n\n` +
    `<i>Reservation valid for 48 hours.</i>`
  );

  // Alert admin
  await sendMessage(
    ADMIN(),
    `🔔 <b>New Reservation</b>\n\n` +
    `Handle: <b>@${listing.handle}</b>\n` +
    `Price: ${formatINR(listing.price_inr)}\n` +
    `Buyer: @${buyerTelegram}\n` +
    `Listing ID: <code>${listingId}</code>\n\n` +
    `Use /paid ${listingId} after payment received.\nUse /done ${listingId} after transfer complete.`
  );
}

// ── Sell flow steps ────────────────────────────────────────────────────────

async function handleSellStep(
  chatId: number,
  text: string,
  session: { step: string; data: Record<string, string> },
  db: ReturnType<typeof createServiceClient>
) {
  const { step, data } = session;

  if (step === "handle") {
    const handle = text.replace(/^@/, "").trim();
    if (!/^[a-zA-Z0-9_.]{1,30}$/.test(handle)) {
      await sendMessage(chatId, "That doesn't look like a valid Instagram username. Try again (letters, numbers, underscores, periods only).");
      return;
    }
    await db.from("bot_sessions").update({ step: "price", data: { handle } }).eq("chat_id", chatId);
    await sendMessage(chatId, `Got it — <b>@${handle}</b> ✅\n\nWhat's your asking price in INR?\n<i>e.g. 50000 for ₹50,000</i>`);
    return;
  }

  if (step === "price") {
    const price = parseInt(text.replace(/[^0-9]/g, ""), 10);
    if (!price || price < 500) {
      await sendMessage(chatId, "Please enter a valid price in INR (minimum ₹500).");
      return;
    }
    await db.from("bot_sessions").update({ step: "followers", data: { ...data, price: String(price) } }).eq("chat_id", chatId);
    await sendMessage(chatId, `Price: <b>${formatINR(price)}</b> ✅\n\nHow many followers does the account have?\n<i>Enter 0 if you're just selling the username (no followers)</i>`);
    return;
  }

  if (step === "followers") {
    const followers = parseInt(text.replace(/[^0-9]/g, ""), 10);
    if (isNaN(followers)) {
      await sendMessage(chatId, "Please enter a number for followers (or 0).");
      return;
    }
    await db.from("bot_sessions").update({ step: "niche", data: { ...data, followers: String(followers) } }).eq("chat_id", chatId);
    await sendMessage(
      chatId,
      `Followers: <b>${followers}</b> ✅\n\nWhat niche best describes this account?\n\n` +
      `Options: gaming, fashion, fitness, food, travel, tech, meme, og, 4-letter, sports, finance, comedy, lifestyle, brandable\n\n` +
      `<i>Or type your own</i>`
    );
    return;
  }

  if (step === "niche") {
    const niche = text.slice(0, 50).trim().toLowerCase();
    const newData = data as Record<string, string>;

    // Create pending listing
    const { data: inserted, error } = await db.from("listings").insert({
      handle: newData["handle"],
      price_inr: parseInt(newData["price"] ?? "0"),
      followers: parseInt(newData["followers"] ?? "0"),
      niche,
      status: "pending",
    }).select().single();

    await db.from("bot_sessions").delete().eq("chat_id", chatId);

    if (error || !inserted) {
      await sendMessage(chatId, "Something went wrong creating your listing. Please try again or contact the broker.");
      return;
    }

    await sendMessage(
      chatId,
      `🎉 Listing submitted!\n\n` +
      `Handle: <b>@${newData["handle"]}</b>\n` +
      `Price: <b>${formatINR(parseInt(newData["price"] ?? "0"))}</b>\n` +
      `Niche: ${niche}\n\n` +
      `The broker will review and publish your listing within 24 hours. You'll receive a message here once it's live.`
    );

    // Alert admin
    await sendMessage(
      ADMIN(),
      `📥 <b>New Listing Submission</b>\n\n` +
      `Handle: <b>@${newData["handle"]}</b>\n` +
      `Price: ${formatINR(parseInt(newData["price"] ?? "0"))}\n` +
      `Followers: ${newData["followers"]}\n` +
      `Niche: ${niche}\n` +
      `Seller: ${chatId}\n` +
      `Listing ID: <code>${inserted.id}</code>\n\n` +
      `Use /approve ${inserted.id} to publish.`
    );
    return;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatListingMessage(l: Listing) {
  return (
    `<b>@${l.handle}</b>\n\n` +
    `💰 ${formatINR(l.price_inr)}\n` +
    (l.followers ? `👥 ${l.followers >= 1000 ? (l.followers / 1000).toFixed(1) + "k" : l.followers} followers\n` : "") +
    (l.niche ? `🏷 ${l.niche}\n` : "") +
    (l.description ? `\n${l.description}\n` : "") +
    `\n<i>Broker-verified · Live transfer call</i>`
  );
}
