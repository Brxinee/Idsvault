# IDsvault — 30-Day Rollout Checklist

Post-Phase 4 launch checklist. Work through these in order — each week builds on the last.

---

## Week 1 — Trust & Identity (Days 1–7)

The single biggest trust gap: buyers don't know who they're dealing with. Fix this before spending anything on marketing.

| # | Task | Owner | Done? |
|---|------|-------|-------|
| T-01 | Add founder name, photo, and one-line bio to homepage Hero section | Founder | ☐ |
| T-02 | Add GST registration number to footer | Founder | ☐ |
| T-03 | Add WhatsApp Business verified badge screenshot or mention to homepage | Founder | ☐ |
| T-04 | Document your escrow process in plain language on the "How It Works" section — specify that payment goes via WhatsApp/UPI, held until transfer is confirmed | Founder | ☐ |
| T-05 | Collect 2–3 real testimonials (screenshot or quote with permission) from completed deals | Founder | ☐ |
| T-06 | Set `VITE_ADMIN_PASSWORD` in Vercel environment variables | Founder | ☐ |
| T-07 | Run the DATABASE_SCHEMA_SQL from `src/lib/supabase.ts` in your Supabase SQL Editor | Founder | ☐ |

---

## Week 2 — Conversion (Days 8–14)

Once trust is established, optimise the path from browse → enquiry.

| # | Task | Owner | Done? |
|---|-------|-------|-------|
| CV-01 | **Decide: reveal or mask handle names?** Currently all handles show as `@va***t`. Revealing them increases SEO value and buyer confidence, but risks off-platform approaches. Pick one and commit. | Founder | ☐ |
| CV-02 | If revealing: update `maskUsername()` in `src/data.ts` to return the full handle | Dev | ☐ |
| CV-03 | Add a "Recently Sold" section (even 2–3 past deals) to prove the marketplace is active | Founder | ☐ |
| CV-04 | Add price anchoring context to listing cards — e.g. "Handles like this sell for ₹8–15L" | Dev | ☐ |
| CV-05 | Add a WhatsApp "Quick Enquiry" floating button (mobile-only) with pre-filled message | Dev | ☐ |
| CV-06 | Review the contact form copy — remove technical jargon ("coordinate", "handshake") from all buyer-facing UI | Dev | ☐ |
| CV-07 | A/B test: CTA button text "Make Offer" vs "Enquire on WhatsApp" on listing detail | Founder | ☐ |

---

## Week 3 — SEO & Discovery (Days 15–21)

Now that the site is clean and converting, set up organic discovery.

| # | Task | Owner | Done? |
|---|-------|-------|-------|
| S-01 | Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console) | Founder | ☐ |
| S-02 | Verify domain ownership in Google Search Console | Founder | ☐ |
| S-03 | Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters) | Founder | ☐ |
| S-04 | Publish first blog post — target "how to buy a premium Instagram username India" | Founder | ☐ |
| S-05 | Add `robots.txt` referencing the sitemap (`User-agent: * / Allow: / / Sitemap: https://idsvault.com/sitemap.xml`) | Dev | ☐ |
| S-06 | Register on IndiaMART / JustDial with a broker category listing | Founder | ☐ |
| S-07 | Post in relevant Indian entrepreneur communities (Reddit r/india, LinkedIn, Twitter) announcing the platform | Founder | ☐ |
| S-08 | Check Core Web Vitals in Search Console — aim for LCP < 2.5s, CLS < 0.1 | Dev | ☐ |

---

## Week 4 — Analytics & Iteration (Days 22–30)

Look at real data. Cut what isn't working. Double what is.

| # | Task | Owner | Done? |
|---|-------|-------|-------|
| A-01 | Review GA4 — which pages have highest exit rate? | Founder | ☐ |
| A-02 | Check GA4 conversion events — how many "Make Offer" form submissions? | Founder | ☐ |
| A-03 | Check GA4 — which traffic source drives actual WhatsApp clicks? | Founder | ☐ |
| A-04 | Add 3–5 more real listings to the inventory (quality > quantity) | Founder | ☐ |
| A-05 | Follow up with any pending deal enquiries from the first 4 weeks | Founder | ☐ |
| A-06 | Review: is "Custom Sourcing" (/source) getting any traction? If yes, promote it more. If not, investigate why. | Founder | ☐ |
| A-07 | Set monthly targets: listings live, enquiries received, deals closed | Founder | ☐ |

---

## Ongoing

- Keep listing data fresh — stale listings (sold but still live) destroy trust
- Respond to every WhatsApp enquiry within 2 hours during business hours — speed is a competitive advantage
- After 5 completed deals, publish a public "deals completed" counter on the homepage
- Review and update FAQ answers quarterly

---

*Last updated: Phase 4 launch — May 2026*
