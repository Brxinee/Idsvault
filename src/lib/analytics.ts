/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * IDsvault Central Analytics Engine
 *
 * Single, unified analytics hub that manages GA4 dispatching, consent state,
 * SPA route deduplication, attribution enrichment, dev/admin exclusions,
 * and PII sanitization.
 */

import { getActiveAttribution } from "./attribution";
import { IDsvaultEvent, sanitizePayload } from "./analyticsEvents";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    grantAnalyticsConsent?: () => void;
  }
}

const CONSENT_STORAGE_KEY = "cookie_consent";

let consentGranted = false;
let initialized = false;
let lastTrackedPath = "";
let lastTrackedTime = 0;

/**
 * Checks if current environment or route should be excluded from production analytics.
 */
function isExcludedEnvironment(pathname?: string): boolean {
  if (typeof window === "undefined") return true;

  const host = window.location.hostname.toLowerCase();
  const currentPath = pathname || window.location.pathname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
    return true;
  }

  if (navigator.webdriver) {
    return true;
  }

  if (currentPath.startsWith("/admin") || currentPath.startsWith("/keep")) {
    return true;
  }

  return false;
}

/**
 * Derives structured page context from the URL path.
 */
export function getPageContext(pathname: string): {
  pageType: string;
  contentCluster: string;
  contentGroup: string;
} {
  const path = pathname.toLowerCase();

  if (path === "/") return { pageType: "home", contentCluster: "landing", contentGroup: "core" };
  if (path === "/inventory" || path.startsWith("/browse")) return { pageType: "inventory", contentCluster: "marketplace", contentGroup: "inventory" };
  if (path.startsWith("/asset/")) return { pageType: "listing_detail", contentCluster: "marketplace", contentGroup: "inventory" };
  if (path === "/sell") return { pageType: "sell_apply", contentCluster: "seller_funnel", contentGroup: "services" };
  if (path === "/advisory") return { pageType: "advisory_apply", contentCluster: "buyer_funnel", contentGroup: "services" };
  if (path === "/journal") return { pageType: "journal_index", contentCluster: "editorial", contentGroup: "journal" };
  if (path.startsWith("/journal/")) return { pageType: "article_detail", contentCluster: "editorial", contentGroup: "journal" };
  if (path === "/about") return { pageType: "about", contentCluster: "brand", contentGroup: "company" };
  if (path === "/process") return { pageType: "process", contentCluster: "educational", contentGroup: "company" };
  if (path === "/trust") return { pageType: "trust", contentCluster: "educational", contentGroup: "company" };
  if (path === "/faq") return { pageType: "faq", contentCluster: "educational", contentGroup: "company" };
  if (path === "/contact") return { pageType: "contact", contentCluster: "support", contentGroup: "company" };
  if (path === "/username-valuation") return { pageType: "valuation_tool", contentCluster: "tool", contentGroup: "services" };
  if (path === "/digital-identity-broker") return { pageType: "broker_landing", contentCluster: "entity", contentGroup: "services" };
  if (path === "/instagram-usernames" || path === "/buy-instagram-username-india") return { pageType: "commercial_landing", contentCluster: "instagram", contentGroup: "category" };
  if (path === "/x-usernames" || path === "/buy-x-username-india") return { pageType: "commercial_landing", contentCluster: "x_twitter", contentGroup: "category" };
  if (path === "/telegram-usernames" || path === "/buy-telegram-username-india") return { pageType: "commercial_landing", contentCluster: "telegram", contentGroup: "category" };
  if (path === "/sell-instagram-username-india") return { pageType: "commercial_landing", contentCluster: "instagram_seller", contentGroup: "category" };
  if (path === "/premium-usernames" || path === "/brandable-usernames") return { pageType: "commercial_landing", contentCluster: "premium", contentGroup: "category" };
  if (path.startsWith("/policy/")) return { pageType: "policy", contentCluster: "regulatory", contentGroup: "legal" };

  return { pageType: "other", contentCluster: "general", contentGroup: "general" };
}

/**
 * Initializes analytics and restores an existing consent decision.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined" || initialized) return;

  initialized = true;

  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    consentGranted = storedConsent === "granted";
  } catch {
    consentGranted = false;
  }

  // Keep consent control inside the central analytics module.
  window.grantAnalyticsConsent = setConsentGranted;
}

/**
 * Updates consent state to granted.
 * Analytics storage is the only category enabled by this site.
 */
export function setConsentGranted(): void {
  consentGranted = true;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  } catch {
    // localStorage unavailable
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
}

/**
 * Updates consent state to denied.
 */
export function setConsentDenied(): void {
  consentGranted = false;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  } catch {
    // localStorage unavailable
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }
}

/**
 * Central event dispatcher.
 * Every event passes through environment checks, consent checks,
 * attribution enrichment and recursive PII sanitization.
 */
export function trackEvent(
  eventName: IDsvaultEvent,
  eventParams: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname;
  const excluded = isExcludedEnvironment(pathname);

  // Never dispatch analytics events until the user has granted analytics consent.
  if (excluded || !consentGranted || typeof window.gtag !== "function") {
    return;
  }

  const ctx = getPageContext(pathname);
  const attribution = getActiveAttribution();

  const fullPayload: Record<string, unknown> = {
    ...eventParams,
    page_type: ctx.pageType,
    content_cluster: ctx.contentCluster,
    content_group: ctx.contentGroup,
    page_path: pathname,
    page_title: document.title,
    ...attribution,
  };

  const cleanPayload = sanitizePayload(fullPayload);

  const isDebug =
    import.meta.env.DEV ||
    (typeof localStorage !== "undefined" && localStorage.getItem("analytics_debug") === "true");

  if (isDebug) {
    console.log(`%c[Analytics Debug] ${eventName}`, "color: #3b82f6; font-weight: bold;", {
      event: eventName,
      consentGranted,
      excluded,
      payload: cleanPayload,
    });
  }

  window.gtag("event", eventName, cleanPayload);
}

/**
 * Tracks SPA route pageviews with strict deduplication against React StrictMode
 * and initial-load races.
 */
export function trackPageView(customPath?: string, customTitle?: string): void {
  if (typeof window === "undefined") return;

  const currentPath = customPath || window.location.pathname;
  const now = Date.now();

  if (currentPath === lastTrackedPath && now - lastTrackedTime < 1000) {
    return;
  }

  lastTrackedPath = currentPath;
  lastTrackedTime = now;

  const pageTitle = customTitle || document.title;
  const ctx = getPageContext(currentPath);

  trackEvent("page_view", {
    page_path: currentPath,
    page_title: pageTitle,
    page_type: ctx.pageType,
    content_cluster: ctx.contentCluster,
    content_group: ctx.contentGroup,
  });
}

// ─── Domain Specific Measurement Helpers ────────────────────────────────────

export function trackListingView(listing: {
  slug: string;
  username: string;
  platform: string;
  askingPrice: number;
  category: string;
}): void {
  trackEvent("view_listing", {
    listing_slug: listing.slug,
    username: listing.username,
    platform: listing.platform,
    listing_price: listing.askingPrice,
    listing_category: listing.category,
  });

  trackEvent("view_item", {
    item_id: listing.slug,
    item_name: `@${listing.username} on ${listing.platform}`,
    item_category: listing.category,
    price: listing.askingPrice,
    currency: "INR",
  });
}

export function trackSearch(
  searchTerm: string,
  platform?: string,
  category?: string,
  resultCount?: number
): void {
  const isZeroResults = resultCount === 0;

  if (isZeroResults) {
    trackEvent("search_zero_results", {
      search_term_category: "redacted",
      platform: platform || "ALL",
      result_count: 0,
    });
    return;
  }

  trackEvent("listing_search", {
    search_term: searchTerm,
    search_platform: platform || "ALL",
    filter_category: category || "ALL",
    result_count: resultCount ?? 0,
  });

  trackEvent("search", {
    search_term: searchTerm,
  });
}

export function trackFilter(
  platform: string,
  category: string,
  priceMin?: number,
  priceMax?: number,
  sortMethod?: string
): void {
  trackEvent("listing_filter", {
    filter_platform: platform,
    filter_category: category,
    filter_price_min: priceMin,
    filter_price_max: priceMax,
    sort_method: sortMethod || "recommended",
  });
}

export function trackCTA(ctaName: string, ctaLocation: string, intent?: string): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
    intent: intent || "general",
  });
}

export function trackFormStart(formName: string, pageType?: string): void {
  trackEvent("form_start", {
    form_name: formName,
    page_type: pageType || getPageContext(window.location.pathname).pageType,
  });
}

export function trackFormSubmit(
  formName: string,
  success: boolean,
  metadata?: Record<string, unknown>
): void {
  trackEvent("form_submit", {
    form_name: formName,
    success,
    ...metadata,
  });
}

export function trackLead(
  leadType: string,
  listingSlug?: string,
  platform?: string,
  offerValue?: number
): void {
  trackEvent("generate_lead", {
    lead_type: leadType,
    listing_slug: listingSlug || "",
    platform: platform || "",
    offer_value: offerValue || 0,
    currency: "INR",
    value: offerValue || 0,
  });
}

export function trackWhatsAppClick(
  ctaLocation: string,
  pageType?: string,
  listingSlug?: string,
  platform?: string,
  intent?: string
): void {
  trackEvent("whatsapp_click", {
    cta_location: ctaLocation,
    page_type: pageType || getPageContext(window.location.pathname).pageType,
    listing_slug: listingSlug || "",
    platform: platform || "",
    intent: intent || "contact",
  });

  trackEvent("contact", {
    method: "whatsapp",
    cta_location: ctaLocation,
  });
}

export function trackEmailClick(ctaLocation: string, pageType?: string): void {
  trackEvent("email_click", {
    cta_location: ctaLocation,
    page_type: pageType || getPageContext(window.location.pathname).pageType,
  });

  trackEvent("contact", {
    method: "email",
    cta_location: ctaLocation,
  });
}

export function trackPhoneClick(ctaLocation: string, pageType?: string): void {
  trackEvent("phone_click", {
    cta_location: ctaLocation,
    page_type: pageType || getPageContext(window.location.pathname).pageType,
  });

  trackEvent("contact", {
    method: "phone",
    cta_location: ctaLocation,
  });
}

export function trackArticleView(
  articleSlug: string,
  articleCategory: string,
  contentCluster?: string
): void {
  trackEvent("view_article", {
    article_slug: articleSlug,
    article_category: articleCategory,
    content_cluster: contentCluster || "editorial",
  });
}

export function trackArticleEngagement(
  articleSlug: string,
  articleCategory: string,
  engagementType: string
): void {
  trackEvent("article_engagement", {
    article_slug: articleSlug,
    article_category: articleCategory,
    engagement_type: engagementType,
  });
}

export function trackSellerStart(): void {
  trackEvent("seller_listing_start", {});
}

export function trackSellerSubmission(
  platform: string,
  username: string,
  askingPrice: number
): void {
  trackEvent("seller_listing_submit", {
    platform,
    username,
    asking_price: askingPrice,
  });

  trackLead("seller_submission", undefined, platform, askingPrice);
}

export function trackAdvisoryStart(): void {
  trackEvent("buyer_request_start", {});
}

export function trackAdvisorySubmission(
  budget: number,
  platform: string,
  urgency: string
): void {
  trackEvent("buyer_request_submit", {
    budget,
    platform,
    urgency,
  });

  trackLead("advisory_submission", undefined, platform, budget);
}

export function trackValuationStart(): void {
  trackEvent("valuation_start", {});
}

export function trackValuationResultView(
  platform: string,
  category: string,
  valuationBand: string
): void {
  trackEvent("valuation_result_view", {
    platform,
    category,
    valuation_band: valuationBand,
    result_type: "estimated",
  });
}

export function trackValuationSubmission(
  platform: string,
  username: string,
  estimatedValuation?: number
): void {
  trackEvent("valuation_submit", {
    platform,
    username,
    estimated_valuation: estimatedValuation || 0,
  });
}

export function trackError(
  errorType: string,
  component: string,
  action?: string,
  message?: string
): void {
  trackEvent("form_validation_error", {
    error_type: errorType,
    component,
    action: action || "unknown",
    message: message || "",
  });
}
