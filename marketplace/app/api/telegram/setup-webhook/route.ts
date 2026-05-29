import { NextRequest, NextResponse } from "next/server";

/**
 * One-time setup: register the webhook + bot menu button with Telegram.
 * Call via: GET /api/telegram/setup-webhook?secret=<WEBHOOK_SETUP_SECRET>
 * Set WEBHOOK_SETUP_SECRET in .env.local to something random (e.g. openssl rand -hex 16).
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.WEBHOOK_SETUP_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://idsvault.com";
  const webhookUrl = `${appUrl}/api/telegram/webhook`;

  const results: Record<string, unknown> = {};

  // Register webhook
  const whRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: true,
    }),
  });
  results.webhook = await whRes.json();

  // Set bot menu button to open the Mini App
  const menuRes = await fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      menu_button: {
        type: "web_app",
        text: "Browse Handles",
        web_app: { url: `${appUrl}/mini-app` },
      },
    }),
  });
  results.menuButton = await menuRes.json();

  // Set bot commands
  const cmdRes = await fetch(`https://api.telegram.org/bot${token}/setMyCommands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      commands: [
        { command: "start", description: "Welcome & how it works" },
        { command: "browse", description: "Browse available handles" },
        { command: "sell", description: "List your handle for sale" },
      ],
    }),
  });
  results.commands = await cmdRes.json();

  return NextResponse.json({ ok: true, results });
}
