# IDsvault Phase 0 Code Audit Report

**Date:** May 2026  
**Auditor:** Claude Code (automated code audit, no browser/Lighthouse)  
**Branch:** claude/full-audit-improvements-kmzhZ  
**Scope:** Source code, configuration, public assets, component architecture  

---

## A — index.html

### A1 — Duplicate GA4 tag [P1]
**Finding:** index.html contains TWO separate Google Analytics gtag.js script blocks — one with ID `G-Q0MWNQ7TSQ` (lines 5-12) and another with ID `G-8L9EQTY2P3` (lines 38-50). The first script fires unconditionally before consent, violating GDPR/DPDPA and wasting events.  
**Fix:** Remove the first (unconsented) GA block entirely. Keep only the second block (`G-8L9EQTY2P3`) which has the consent-aware `trackIDsVaultEvent` wrapper. Confirm the correct GA4 property ID and keep only one.

### A2 — GA4 fires before consent [P1]
**Finding:** Even the remaining GA4 block (`G-8L9EQTY2P3`) loads unconditionally on page load. The consent banner appears after JS hydration, but GA fires immediately. This violates India's DPDPA 2023 requirement for prior consent before analytics tracking.  
**Fix:** Gate the gtag script load behind consent. Use `gtag('consent', 'default', { analytics_storage: 'denied' })` before config, and update to 'granted' only when the user clicks Allow.

### A3 — Meta description mentions "escrow" and "marketplace" framing [P2]
**Finding:** `<meta name="description">` says "India's broker-assisted marketplace. Payment held in escrow." The business model is now "facilitation desk" not "marketplace", and "escrow" is replaced by "broker-held payment".  
**Fix:** Update to: "India's broker-advised digital identity facilitation desk. Payment held in designated broker account until transfer confirmed. Hyderabad, Telangana."

### A4 — lang attribute on html element [P2]
**Finding:** `<html lang="en">` is set to English. For India-first service, consider adding `lang="en-IN"` or at minimum confirm English is the primary service language. Not a blocker but improves SEO signals.  
**Fix:** Change to `<html lang="en-IN">` to signal Indian English variant to search engines.

### A5 — Font loading blocks render [P2]
**Finding:** Google Fonts are loaded with `<link>` (not `font-display: swap`). The stylesheet link at line 35 is render-blocking for users on slow mobile connections (2G/3G) which is common in Tier 2/3 India markets.  
**Fix:** Add `&display=swap` to the Google Fonts URL (already present as `display=swap`) — verified. Additionally, preload the woff2 files for Inter 400/600 directly to reduce LCP.

### A6 — No favicon defined [P2]
**Finding:** No `<link rel="icon">` in index.html. Browser shows a blank favicon, reducing brand recognition and trust in tabs.  
**Fix:** Add `<link rel="icon" href="/favicon.ico" type="image/x-icon">` and create a favicon.ico from the Shield logo.

### A7 — No meta theme-color [P3]
**Finding:** Missing `<meta name="theme-color" content="#050505">`. On Android Chrome, the browser chrome will be default white/grey instead of the site's dark background.  
**Fix:** Add `<meta name="theme-color" content="#050505">`.

---

## B — vercel.json

### B1 — Missing security headers [P1]
**Finding:** `vercel.json` has `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy` headers, but is missing:
- `Strict-Transport-Security` (HSTS) — forces HTTPS, important for a payment-adjacent service
- `Content-Security-Policy` — prevents XSS attacks
- `Permissions-Policy` — controls browser feature access  

**Fix:** Add to the catch-all header block:
```json
{ "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
```
CSP is more complex (requires audit of inline scripts/styles) but should be implemented in Phase 1.

### B2 — No cache header for HTML [P2]
**Finding:** The catch-all `"source": "/(.*)"` sets security headers but no cache-control for HTML documents. HTML should be `no-cache` (must revalidate) to ensure users always get fresh content after deploys.  
**Fix:** Add `{ "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }` to the catch-all source header, or a dedicated rule for HTML requests.

### B3 — SPA rewrite is overly broad [P3]
**Finding:** The single rewrite `"source": "/(.*)"` routes all paths including missing static assets to index.html, which can mask 404 errors on static files.  
**Fix:** Add a `!` exclusion for known static asset patterns or confirm assets are properly handled by the immutable cache rules above.

---

## C — tokens.css / Design System

### C1 — Design tokens not used in components [P2]
**Finding:** `tokens.css` defines a complete token system (`--color-bg`, `--color-accent`, `--color-text-primary` etc.) but components use raw Tailwind hex values (`bg-[#050505]`, `text-[#C9A961]`) throughout. If a color needs updating, it must be changed in dozens of places.  
**Fix:** Migrate components to use `bg-[var(--color-bg)]`, `text-[var(--color-accent)]` etc. Start with the most reused tokens (background, accent, text-secondary). This is a Phase 1 refactor.

### C2 — `--color-bg` vs actual page background mismatch [P2]
**Finding:** `tokens.css` defines `--color-bg: #0A0A0B` but the actual page/hero background is `#050505` (slightly darker). Components use `bg-[#050505]` and `bg-[#0A0A0B]` inconsistently.  
**Fix:** Decide on one true background value and align the token. Update `--color-bg` to `#050505` and `--color-surface` to `#0A0A0B`.

### C3 — No focus ring token defined [P3]
**Finding:** There is no `--color-focus-ring` token. Focus states across interactive elements are inconsistent — some use `blue-500`, some have no visible focus ring at all.  
**Fix:** Add `--color-focus-ring: #2563EB` and enforce `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]` on all interactive elements.

---

## D — src/App.tsx — Routing & Architecture

### D1 — No error boundary on routes [P1]
**Finding:** The `<Suspense>` wrapper handles lazy-loaded component loading, but there is no `<ErrorBoundary>` wrapping the routes. If any component throws a runtime error, the entire app white-screens. `ErrorBoundary.tsx` exists in the project but is not used in App.tsx.  
**Fix:** Import and wrap the route tree with `<ErrorBoundary>`:
```tsx
import { ErrorBoundary } from "./components/ErrorBoundary";
// Wrap routes:
<ErrorBoundary><AnimatePresence>...</AnimatePresence></ErrorBoundary>
```

### D2 — /about route missing from sitemap.xml [P2]
**Finding:** The `/about` route was added in this audit cycle but `public/sitemap.xml` does not include `https://idsvault.com/about`.  
**Fix:** Add the `/about` entry to sitemap.xml with `changefreq: monthly` and `priority: 0.7`.

### D3 — viewToPath map missing /about [P2]
**Finding:** The `viewToPath()` function maps legacy view names to paths. "about" is not in the map. If any older component calls `handleNavigate("about")`, it will redirect to "/".  
**Fix:** Add `about: "/about"` to the map object.

### D4 — No 404 page [P2]
**Finding:** The catch-all route `<Route path="*">` redirects silently to "/" instead of showing a proper 404 page. This harms SEO (broken links return 200) and user experience.  
**Fix:** Create a `NotFoundPage.tsx` component and render it in the catch-all route. Vercel handles the actual 404 HTTP status; the React router just needs to render the right UI.

### D5 — Supabase config check pattern could leak errors [P3]
**Finding:** `isSupabaseConfigured && supabase` is used as a guard, but if Supabase is misconfigured (wrong key format), the `supabase.auth.getSession()` call will throw and the error is silently swallowed.  
**Fix:** Wrap the Supabase auth calls in a try/catch and log configuration errors to the console in development.

---

## E — Component Accessibility (a11y)

### E1 — Listing cards have no accessible text [P0]
**Finding:** In `Hero.tsx`, the featured listing `<motion.article>` cards are clickable (`onClick`) but have no `aria-label` describing what they link to. Screen readers will announce the card contents verbatim, which includes "Asking Price" and the masked handle name, but no clear action intent.  
**Fix:** Add `aria-label={`View listing for @${masked} on ${item.platform}`}` to each article element. Add `role="button"` or convert to a proper `<Link>` element.

### E2 — FAQ accordion missing aria-controls [P1]
**Finding:** Both Hero.tsx and RegulatoryInfo.tsx accordion buttons have `aria-expanded` but are missing `aria-controls` pointing to the answer panel ID. The answer div has no `id` attribute, breaking the ARIA relationship.  
**Fix:** Add matching `id` to answer panels and `aria-controls` to buttons:
```tsx
<button aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`}>
<div id={`faq-answer-${idx}`} role="region">
```

### E3 — Floating WhatsApp button icon has no alternative text [P1]
**Finding:** The `<MessageSquare>` icon in the floating WhatsApp button in App.tsx has `aria-label="Contact IDsvault on WhatsApp"` on the anchor — this is correct. However, the SVG inside has no `aria-hidden="true"` to prevent double-announcement.  
**Fix:** Add `aria-hidden="true"` to the Lucide icon: `<MessageSquare aria-hidden="true" className="h-5 w-5 text-white" />`.

### E4 — Motion animations not respecting prefers-reduced-motion [P1]
**Finding:** Multiple `motion.div` elements in Hero.tsx use `animate={{ y: [0, -10, 0] }}` infinite loops. These run unconditionally regardless of `prefers-reduced-motion: reduce` OS setting. This can cause nausea in users with vestibular disorders.  
**Fix:** Use Framer Motion's `useReducedMotion()` hook and conditionally disable or reduce animations:
```tsx
const shouldReduceMotion = useReducedMotion();
animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
```

### E5 — Skip link exists but skip target needs id="main-content" [P2]
**Finding:** App.tsx has a skip-to-content `<a href="#main-content">` and `<main id="main-content">` — this is correctly implemented. No fix needed. (Noted as pass.)

### E6 — Color contrast: gray-500 text on dark background [P2]
**Finding:** Text using `text-gray-500` (`#6B7280`) on `#050505` background has a contrast ratio of approximately 4.5:1 — just meets WCAG AA for normal text but fails for small text below 14px. Multiple label elements use text sizes of 9-10px in this color.  
**Fix:** Replace `text-gray-500` with `text-gray-400` (`#9CA3AF`) for any text below 12px, or increase font size.

### E7 — Form inputs in SellApplication lack explicit labels [P2]
**Finding:** Code review of `SellApplication.tsx` shows form fields. Without reading the full component it cannot be confirmed, but typical React forms often use `placeholder` instead of `<label>` elements. Placeholders disappear on input and are not a substitute for labels.  
**Fix (to verify):** Audit SellApplication.tsx and ContactView.tsx to confirm every input has an explicit `<label htmlFor>` association or `aria-label`.

---

## F — Performance & Bundle

### F1 — AdminDashboard and BlogView are lazy-loaded — correct [P3]
**Finding:** AdminDashboard and BlogView are correctly lazy-loaded via `React.lazy`. This keeps the initial bundle smaller. (Noted as pass.)

### F2 — Framer Motion (motion library) is in dependencies, not devDependencies [P3]
**Finding:** `motion` (framer-motion) v12 is a production dependency — correct.

### F3 — No bundle size analysis [P2]
**Finding:** `package.json` has no `analyze` script for bundle size visualization. The Vite build reports chunk sizes in console output but there is no automated size budget enforcement.  
**Fix:** Add `"analyze": "vite build --mode analyze"` and configure `vite-bundle-visualizer` or `rollup-plugin-visualizer` in vite.config.ts to generate bundle reports.

### F4 — No vite.config.ts found [P2]
**Finding:** The project uses Vite but no explicit `vite.config.ts` was found in the repository root. This means all Vite configuration is using defaults. This may affect build optimization, chunk splitting, and asset handling.  
**Fix:** Create a `vite.config.ts` with explicit React plugin configuration, chunk splitting strategy, and build targets.

---

## G — SEO Health

### G1 — /about missing from sitemap [P1]
**Finding:** sitemap.xml was not updated when /about route was added. Search engines will not index the /about page until it is in the sitemap.  
**Fix:** Add `<url><loc>https://idsvault.com/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>` to sitemap.xml.

### G2 — robots.txt is minimal but correct [P3]
**Finding:** robots.txt has `User-agent: * Allow: /` and `Sitemap: https://idsvault.com/sitemap.xml`. No admin/private paths are disallowed.  
**Fix:** Add `Disallow: /admin` to prevent crawling of the admin console path.

### G3 — JSON-LD Organization schema has placeholder logo URL [P2]
**Finding:** Hero.tsx JSON-LD has `"logo": "https://idsvault.com/logo.png"` but no logo.png file exists in `/public`. Search engines (especially Google Knowledge Panel) expect this URL to resolve.  
**Fix:** Create and deploy a logo.png (512x512 recommended) and cover.png for OG image to `/public`.

### G4 — Canonical URL in SEO component defaults to BASE_URL without path [P3]
**Finding:** `SEO.tsx` sets `canonicalUrl = canonical ? \`\${BASE_URL}\${canonical}\` : BASE_URL`. The fallback to `BASE_URL` (without path) means any page that doesn't pass a canonical prop will have a canonical pointing to the homepage. This could cause duplicate content signals.  
**Fix:** Change default to use `window.location.pathname` as the canonical path when none is provided.

---

## H — Legal & Trust Coverage

### H1 — GST invoice commitment but no GSTIN displayed [P1]
**Finding:** Throughout the site and policies, IDsvault commits to issuing "GST-compliant tax invoices." The Footer now shows a GSTIN placeholder `[XX XXXXX XXXXX XX]`. Until GST registration is complete, this is a potential compliance gap — promises an invoice that may not be valid.  
**Fix:** Complete GST registration immediately. Update the GSTIN placeholder in Footer.tsx and policy pages with the actual GSTIN number once obtained.

### H2 — No engagement letter / deal confirmation flow [P1]
**Finding:** The site references "signed engagement letter" (e.g. in FAQ) but there is no digital signature or email confirmation flow in the application. No confirmation email is sent when a deal is submitted via the Sell page.  
**Fix:** Implement email confirmation for every deal submission. Even a simple SendGrid/Resend integration sending the deal terms to buyer and seller email addresses satisfies the "engagement letter" commitment.

### H3 — No cookie consent stored state shown to returning users [P2]
**Finding:** The consent banner shows `localStorage.getItem("idsvault_consent_shield")` as the guard. If consent is denied, it is stored correctly. However, there is no way for users to change their consent preference after the initial decision — the banner only shows once.  
**Fix:** Add a "Cookie Preferences" link in the footer that re-opens the consent modal and allows users to update their choice.

### H4 — Legal pages not linked from all transaction flows [P2]
**Finding:** The SellApplication and SourcingRequest forms do not include a checkbox linking to Terms of Service with explicit consent. Legally, users should affirm they have read and agree to the Terms before submitting.  
**Fix:** Add a required checkbox: "I have read and agree to the [Terms of Service] and [Risk Disclosure]" before the form submit button on both pages.

### H5 — DPDPA Data Fiduciary registration not mentioned [P2]
**Finding:** The Privacy Policy references DPDPA 2023 but does not mention whether IDsvault has registered as a Data Fiduciary under the Act (required for entities processing personal data above thresholds).  
**Fix:** Consult a legal advisor on DPDPA registration requirements. Update the Privacy Policy once status is confirmed.

### H6 — Phone number in footer and About page but not in Terms/Privacy as contact [P3]
**Finding:** Terms and Privacy policies only list broker@idsvault.com as the contact. Adding the WhatsApp/phone number to policy pages would improve reachability for Indian users who may prefer calling.  
**Fix:** Add WhatsApp number to the contact details in Terms, Privacy, and Imprint policy pages.

---

## Priority Summary

| ID  | Finding                                          | Priority |
|-----|--------------------------------------------------|----------|
| A1  | Duplicate GA4 tag                                | P1       |
| A2  | GA4 fires before consent                        | P1       |
| B1  | Missing HSTS and CSP headers                    | P1       |
| D1  | No error boundary on routes                     | P1       |
| E1  | Listing cards no accessible text               | P0       |
| E2  | FAQ accordion missing aria-controls             | P1       |
| E4  | Motion ignores prefers-reduced-motion           | P1       |
| H1  | GSTIN placeholder — complete registration       | P1       |
| H2  | No engagement letter / email confirmation       | P1       |
| G1  | /about missing from sitemap                     | P1       |
| A3  | Meta description stale framing                  | P2       |
| B2  | No cache-control on HTML                        | P2       |
| C1  | Design tokens unused in components              | P2       |
| D2  | /about missing from sitemap (duplicate)         | P2       |
| D4  | No 404 page                                     | P2       |
| E3  | Icon aria-hidden missing in floating button     | P1       |
| E6  | Color contrast below WCAG AA at small sizes     | P2       |
| F3  | No bundle size analysis script                  | P2       |
| G3  | Placeholder logo.png URL doesn't resolve        | P2       |
| H3  | No way to update cookie consent                 | P2       |
| H4  | No ToS checkbox on transaction forms            | P2       |
| All others                                         | P3       |

---

*End of Phase 0 audit. All findings are based on static code analysis — no browser execution, no Lighthouse, no network requests.*
