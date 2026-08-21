# IDsvault Production Analytics Measurement Engine & Taxonomy

This document describes the production-grade measurement framework implemented for **IDsvault** (`https://idsvault.com`). The analytics stack is built on Google Analytics 4 (GA4 ID: `G-Q0MWNQ7TSQ`) with strict DPDPA 2023 compliance, custom attribution modeling, zero-PII sanitization, and SPA pageview deduplication.

---

## 1. Architecture Overview

```
[User Interaction / Route Change]
                 │
                 ▼
     [central analytics engine]
       (/src/lib/analytics.ts)
                 │
  ┌──────────────┼──────────────┐
  │              │              │
  ▼              ▼              ▼
[Attribution]  [Sanitization] [Exclusion Checks]
 (First/Last)  (Regex PII)    (Admin / Dev)
  │              │              │
  └──────────────┴──────────────┘
                 │
                 ▼
        [Consent Verification]
      (DPDPA 2023 Consent Mode)
                 │
        ┌────────┴────────┐
        ▼                 ▼
  [Granted]          [Denied]
    gtag()           Cookieless Ping (Advanced Consent Mode)
```

### Key Components

- **`index.html`**: Initializes default GA4 consent to `denied` for all storage types (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) and sets `send_page_view: false` to allow SPA-controlled measurement.
- **`src/lib/analytics.ts`**: The central dispatcher. Coordinates consent updates, route deduplication, event creation, attribution enrichment, and environment exclusions.
- **`src/lib/attribution.ts`**: Captures UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) and organic referrers. Persists first-touch and last-touch attribution in `sessionStorage`.
- **`src/lib/analyticsEvents.ts`**: Declares strict TypeScript interfaces for all event payloads and executes recursive zero-PII regex scrubbing on all parameters before dispatch.
- **`src/components/CookieConsent.tsx`**: UI interface for DPDPA 2023 compliance that triggers `setConsentGranted()` or `setConsentDenied()`.

---

## 2. Event Taxonomy & Parameter Reference

| Event Name | Trigger Condition | Custom Parameters | Standard Equivalent |
| :--- | :--- | :--- | :--- |
| `page_view` | SPA route change or initial render | `page_type`, `content_cluster`, `content_group`, `page_path`, `page_title`, `first_touch_source`, `last_touch_source` | `page_view` |
| `view_listing` | User navigates to a handle detail page (`/asset/:slug`) | `listing_slug`, `username`, `platform`, `listing_price`, `listing_category` | `view_item` |
| `listing_search` | User enters search term on inventory page | `search_term`, `search_platform`, `filter_category`, `result_count` | `search` |
| `listing_filter` | User selects platform, category, or sort order | `filter_platform`, `filter_category`, `filter_price_min`, `filter_price_max`, `sort_method` | N/A |
| `cta_click` | User clicks key CTA button across site | `cta_name`, `cta_location`, `intent` | N/A |
| `form_start` | User focuses on an input field in any form | `form_name`, `page_type` | `form_start` |
| `form_submit` | Form submission completed successfully | `form_name`, `success`, `listing_slug`, `offer_value` | `form_submit` |
| `generate_lead` | Acquisition offer, sourcing request, or listing application | `lead_type`, `listing_slug`, `platform`, `offer_value`, `value`, `currency` | `generate_lead` |
| `whatsapp_click` | User clicks any WhatsApp handoff CTA | `cta_location`, `page_type`, `listing_slug`, `platform`, `intent` | `contact` |
| `email_click` | User clicks an email link (`mailto:`) | `cta_location`, `page_type` | `contact` |
| `phone_click` | User clicks phone number link | `cta_location`, `page_type` | `contact` |
| `seller_listing_submit` | Seller submits handle for listing | `platform`, `username`, `asking_price` | `generate_lead` |
| `buyer_request_submit` | Buyer submits sourcing advisory request | `budget`, `platform`, `urgency` | `generate_lead` |
| `valuation_submit` | User runs valuation calculator | `platform`, `username`, `estimated_valuation` | N/A |
| `view_article` | User opens a journal strategy guide | `article_slug`, `article_category`, `content_cluster` | N/A |
| `form_validation_error` | Client-side validation failure or React error catch | `error_type`, `component`, `action`, `message` | N/A |

---

## 3. Attribution & Campaign Tracking

The attribution module (`src/lib/attribution.ts`) extracts marketing parameters on entry:

1. **URL Parameters Captured**:
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
   - `gclid` (Google Ads Click ID)
   - `fbclid` (Meta Click ID)

2. **Referrer Parsing**:
   - Classifies organic traffic from Google, Bing, DuckDuckGo, Yahoo, Baidu, Yandex, ChatGPT, Perplexity, Claude.
   - Detects social traffic from Instagram, X/Twitter, Telegram, LinkedIn, YouTube, Reddit.

3. **Touch Model**:
   - **First-Touch**: Captured on initial landing session and locked.
   - **Last-Touch**: Updated whenever new UTM parameters or organic search referrers are detected.

---

## 4. Privacy & Zero-PII Safeguards

In accordance with global privacy standards and DPDPA 2023:

- **Redaction Filter**: `sanitizePayload()` inspects every string in event payloads using regex patterns to redact:
  - Email addresses (`[REDACTED_EMAIL]`)
  - Phone numbers & WhatsApp numbers (`[REDACTED_PHONE]`)
  - Universal Transaction References / Banking IDs (`[REDACTED_UTR]`)
- **Blocked Forms Data**: Form input strings (such as names, private notes, passwords, and message bodies) are strictly excluded from event parameters.
- **Consent Gate**: By default, no analytics cookies are set until the user interacts with `CookieConsent.tsx` and selects "Allow".

---

## 5. Enhanced Measurement Settings (GA4 UI)
Since `idsvault.com` is a Single Page Application (SPA) using React Router, we explicitly manage route changes through the centralized `trackPageView` function.
**IMPORTANT:** To avoid duplicate `page_view` events, the GA4 Property must be configured properly in the GA4 Dashboard:
1. Go to **Admin** > **Data Streams** > Select the Web Stream.
2. Under **Enhanced measurement**, click the gear icon to configure.
3. Under **Page views**, ensure **Page changes based on browser history events** is **DISABLED** (unchecked).
4. (Optional) Keep Scrolls, Outbound clicks, and Site search enabled as they do not conflict with the manual tracker.

---

## 6. Exclusions & Filtering

To preserve analytics integrity, events are automatically suppressed under the following conditions:

1. **Admin Routes**: Any path starting with `/admin` or `/keep` is excluded.
2. **Local & Dev Workspaces**: Domains `localhost`, `127.0.0.1`, and `.local` environments do not transmit data to GA4.
3. **Automated Testing**: `navigator.webdriver` flags and synthetic runner environments are filtered out.

---

## 6. Verification & Debug Protocol

To verify analytics events during development:

1. **Enable Console Debugging**:
   Open browser DevTools Console and execute:
   ```js
   localStorage.setItem('analytics_debug', 'true');
   ```
   Refresh the page. All tracked events will log with formatted parameters:
   `[Analytics Debug] page_view ...`

2. **GA4 DebugView**:
   Append `?gatsby_debug=true` or install Google Analytics Debugger Chrome Extension to inspect events live in GA4 DebugView console.

3. **Automated Test Verification**:
   Execute build and compilation verification:
   ```bash
   npm run build
   ```
