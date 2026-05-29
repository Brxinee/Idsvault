import { createHmac } from "crypto";

const BASE = () => `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function tg(method: string, body: Record<string, unknown>) {
  const res = await fetch(`${BASE()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export const sendMessage = (
  chatId: number | string,
  text: string,
  extra: Record<string, unknown> = {}
) =>
  tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", ...extra });

export const answerCallback = (id: string, text?: string) =>
  tg("answerCallbackQuery", { callback_query_id: id, text });

export const editMessage = (
  chatId: number | string,
  messageId: number,
  text: string,
  extra: Record<string, unknown> = {}
) =>
  tg("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    ...extra,
  });

/** Validate Telegram Mini App initData HMAC */
export function validateInitData(initData: string): boolean {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get("hash");
    if (!hash) return false;
    params.delete("hash");
    const checkString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("\n");
    const secretKey = createHmac("sha256", "WebAppData")
      .update(process.env.TELEGRAM_BOT_TOKEN!)
      .digest();
    const expected = createHmac("sha256", secretKey)
      .update(checkString)
      .digest("hex");
    return hash === expected;
  } catch {
    return false;
  }
}

/** Extract user object from validated initData */
export function getUserFromInitData(
  initData: string
): { id: number; username?: string; first_name?: string } | null {
  try {
    const params = new URLSearchParams(initData);
    const userStr = params.get("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
