/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Attribution Management Module
 *
 * Captures, stores, and manages acquisition touchpoints (first-touch & last-touch)
 * including UTM parameters, organic search source detection, and landing page URLs.
 * Stores state safely in localStorage with fallback.
 */

export interface AttributionData {
  // First touch
  first_landing_page?: string;
  first_touch_source?: string;
  first_touch_medium?: string;
  first_touch_campaign?: string;
  first_touch_term?: string;
  first_touch_content?: string;
  first_touch_timestamp?: string;

  // Last touch / current session
  last_touch_source?: string;
  last_touch_medium?: string;
  last_touch_campaign?: string;
  last_touch_term?: string;
  last_touch_content?: string;
  last_touch_timestamp?: string;

  // Current session parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  // AI referrals
  ai_source?: string;
}

const STORAGE_KEY_FIRST = "idsvault_attr_first";
const STORAGE_KEY_LAST = "idsvault_attr_last";

function safeGetStorage(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch {
    // Storage blocked or unavailable
  }
  return null;
}

function safeSetStorage(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch {
    // Storage blocked or unavailable
  }
}

/**
 * Detects referrer category when UTM parameters are not explicitly present.
 */
function parseReferrer(referrerUrl: string): { source: string; medium: string; ai_source?: string } {
  if (!referrerUrl) {
    return { source: "direct", medium: "none" };
  }

  try {
    const url = new URL(referrerUrl);
    const host = url.hostname.toLowerCase();

    // Internal navigation
    if (typeof window !== "undefined" && host === window.location.hostname.toLowerCase()) {
      return { source: "internal", medium: "internal" };
    }

    // Google Search
    if (host.includes("google.")) {
      return { source: "google", medium: "organic" };
    }

    // Bing / Yahoo / DuckDuckGo / Ecosia / Baidu
    if (host.includes("bing.")) return { source: "bing", medium: "organic" };
    if (host.includes("yahoo.")) return { source: "yahoo", medium: "organic" };
    if (host.includes("duckduckgo.")) return { source: "duckduckgo", medium: "organic" };
    if (host.includes("ecosia.")) return { source: "ecosia", medium: "organic" };
    if (host.includes("baidu.")) return { source: "baidu", medium: "organic" };

    // Social Platforms
    if (host.includes("instagram.com") || host.includes("l.instagram.com")) return { source: "instagram", medium: "social" };
    if (host.includes("twitter.com") || host.includes("t.co") || host.includes("x.com")) return { source: "x_twitter", medium: "social" };
    if (host.includes("telegram.me") || host.includes("t.me")) return { source: "telegram", medium: "social" };
    if (host.includes("linkedin.com") || host.includes("lnkd.in")) return { source: "linkedin", medium: "social" };
    if (host.includes("facebook.com") || host.includes("m.facebook.com")) return { source: "facebook", medium: "social" };
    if (host.includes("youtube.com") || host.includes("youtu.be")) return { source: "youtube", medium: "social" };
    if (host.includes("reddit.com")) return { source: "reddit", medium: "social" };

    // AI Platforms
    if (host.includes("chatgpt.com") || host.includes("openai.com")) return { source: "chatgpt", medium: "referral", ai_source: "chatgpt" };
    if (host.includes("perplexity.ai")) return { source: "perplexity", medium: "referral", ai_source: "perplexity" };
    if (host.includes("claude.ai") || host.includes("anthropic.com")) return { source: "claude", medium: "referral", ai_source: "claude" };
    if (host.includes("copilot.microsoft.com")) return { source: "copilot", medium: "referral", ai_source: "copilot" };
    if (host.includes("gemini.google.com")) return { source: "gemini", medium: "referral", ai_source: "gemini" };

    return { source: host, medium: "referral" };
  } catch {
    return { source: "unknown", medium: "referral" };
  }
}

/**
 * Parses current URL and document.referrer to capture and store attribution touchpoints.
 * Call this on application initialization / route changes.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmTerm = urlParams.get("utm_term");
  const utmContent = urlParams.get("utm_content");

  const referrer = document.referrer;
  const refParsed = parseReferrer(referrer);

  const currentSource = utmSource || refParsed.source;
  const currentMedium = utmMedium || refParsed.medium;
  const currentCampaign = utmCampaign || "(not set)";
  const currentTerm = utmTerm || "(not set)";
  const currentContent = utmContent || "(not set)";
  const timestamp = new Date().toISOString();

  // 1. Handle First-Touch (only set once ever)
  let firstTouchData: Record<string, string> = {};
  const existingFirst = safeGetStorage(STORAGE_KEY_FIRST);

  if (existingFirst) {
    try {
      firstTouchData = JSON.parse(existingFirst);
    } catch {
      firstTouchData = {};
    }
  } else if (currentSource !== "internal") {
    firstTouchData = {
      first_landing_page: window.location.pathname,
      first_touch_source: currentSource,
      first_touch_medium: currentMedium,
      first_touch_campaign: currentCampaign,
      first_touch_term: currentTerm,
      first_touch_content: currentContent,
      first_touch_timestamp: timestamp,
    };
    safeSetStorage(STORAGE_KEY_FIRST, JSON.stringify(firstTouchData));
  }

  // 2. Handle Last-Touch (updated on new session or non-internal referrer or explicitly present UTMs)
  let lastTouchData: Record<string, string> = {};
  if (utmSource || refParsed.source !== "internal") {
    lastTouchData = {
      last_touch_source: currentSource,
      last_touch_medium: currentMedium,
      last_touch_campaign: currentCampaign,
      last_touch_term: currentTerm,
      last_touch_content: currentContent,
      last_touch_timestamp: timestamp,
    };
    safeSetStorage(STORAGE_KEY_LAST, JSON.stringify(lastTouchData));
  } else {
    const existingLast = safeGetStorage(STORAGE_KEY_LAST);
    if (existingLast) {
      try {
        lastTouchData = JSON.parse(existingLast);
      } catch {
        lastTouchData = {};
      }
    }
  }

  return {
    ...firstTouchData,
    ...lastTouchData,
    utm_source: utmSource || undefined,
    utm_medium: utmMedium || undefined,
    utm_campaign: utmCampaign || undefined,
    utm_term: utmTerm || undefined,
    utm_content: utmContent || undefined,
    ai_source: refParsed.ai_source || undefined,
  };
}

/**
 * Returns currently active attribution data for event enrichment.
 */
export function getActiveAttribution(): AttributionData {
  return captureAttribution();
}
