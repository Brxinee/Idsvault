/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * IDsvault Analytics Event Taxonomy & Parameter Standards
 *
 * Enforces strict GA4 event taxonomy, custom IDsvault parameters,
 * and PII scrubbing rules to prevent accidental capture of sensitive user information.
 */

export type GA4CoreEvent =
  | "page_view"
  | "view_item"
  | "select_item"
  | "search"
  | "generate_lead"
  | "contact"
  | "form_start"
  | "form_submit"
  | "click"
  | "scroll";

export type IDsvaultEvent =
  | GA4CoreEvent
  | "view_inventory"
  | "view_listing"
  | "view_article"
  | "listing_search"
  | "listing_filter"
  | "listing_sort"
  | "listing_cta"
  | "buyer_request_start"
  | "buyer_request_submit"
  | "seller_listing_start"
  | "seller_listing_submit"
  | "valuation_start"
  | "valuation_submit"
  | "whatsapp_click"
  | "email_click"
  | "phone_click"
  | "contact_broker"
  | "view_process"
  | "view_trust"
  | "view_pricing"
  | "cta_click"
  | "page_load_error"
  | "form_validation_error"
  | "form_submit_error"
  | "supabase_error"
  | "whatsapp_error";

export interface PageParams {
  page_type?: string;
  page_path?: string;
  page_title?: string;
  content_group?: string;
  content_cluster?: string;
}

export interface ListingParams {
  listing_id?: string;
  listing_slug?: string;
  username?: string;
  platform?: string;
  listing_category?: string;
  listing_price?: number;
  listing_status?: string;
}

export interface SearchParams {
  search_term?: string;
  search_platform?: string;
  result_count?: number;
}

export interface FilterParams {
  filter_platform?: string;
  filter_category?: string;
  filter_price_min?: number;
  filter_price_max?: number;
  sort_method?: string;
}

export interface LeadParams {
  lead_type?: string;
  lead_source_page?: string;
  listing_slug?: string;
  platform?: string;
  offer_value?: number;
  currency?: string;
}

export interface CTAParams {
  cta_name?: string;
  cta_location?: string;
  intent?: string;
  page_type?: string;
  page_path?: string;
}

export interface ErrorParams {
  error_type?: string;
  component?: string;
  page_type?: string;
  route?: string;
  action?: string;
  message?: string;
}

export type BaseEventParams = Record<string, unknown>;

/**
 * List of keys that must NEVER be logged or sent to analytics.
 */
const SENSITIVE_KEYS = new Set([
  "email",
  "buyeremail",
  "phone",
  "whatsapp",
  "password",
  "name",
  "buyername",
  "notes",
  "address",
  "token",
  "secret",
  "utr",
  "pan",
  "aadhaar",
  "card",
  "cvv",
  "authorization",
]);

/**
 * Regex patterns for stripping PII values.
 */
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE_REGEX = /(\+?\d{1,4}[\s.-]?)?(\(?\d{2,5}\)?[\s.-]?)?\d{3,5}[\s.-]?\d{3,5}/g;

/**
 * Recursively cleans and sanitizes event payloads to strip PII and sensitive parameters.
 */
export function sanitizePayload<T extends Record<string, unknown>>(payload: T): Record<string, unknown> {
  const clean: Record<string, unknown> = {};

  for (const [key, val] of Object.entries(payload)) {
    if (val === undefined || val === null) continue;

    const lowerKey = key.toLowerCase();

    // 1. Drop blacklisted keys
    if (SENSITIVE_KEYS.has(lowerKey)) {
      continue;
    }

    // 2. Sanitize strings
    if (typeof val === "string") {
      let scrubbed = val;
      // Strip emails
      scrubbed = scrubbed.replace(EMAIL_REGEX, "[REDACTED_EMAIL]");
      // Strip potential phone numbers if string is longer than 7 chars and looks numeric
      if (scrubbed.length >= 7 && /\d{7,}/.test(scrubbed.replace(/\D/g, ""))) {
        scrubbed = scrubbed.replace(PHONE_REGEX, "[REDACTED_PHONE]");
      }
      clean[key] = scrubbed;
    } else if (typeof val === "number" || typeof val === "boolean") {
      clean[key] = val;
    } else if (typeof val === "object" && !Array.isArray(val)) {
      clean[key] = sanitizePayload(val as Record<string, unknown>);
    }
  }

  return clean;
}
