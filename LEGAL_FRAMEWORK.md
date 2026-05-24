# IDsvault Legal & Trust Framework — Global Edition v2

> **Status:** Draft — requires review by a qualified advocate with multi-jurisdiction experience  
> (Indian civil/IT law + EU/UK GDPR + US state privacy laws recommended)  
> **Operating HQ:** Hyderabad, Telangana, India  
> **Service scope:** Worldwide  
> **Prepared:** May 2026  
> **Supersedes:** v1 (India-only draft)

---

## ⚠️ Disclaimer

This document is an internal operational and planning framework. **It is not legal advice.** No text in this document should be published on the website without review by qualified legal counsel. For a global service, budget $2,000–5,000 USD for a proper legal review pass covering Indian law, EU/UK GDPR, and US state privacy law at minimum.

---

## Part 1 — Positioning Decision (Confirmed: Option 1 Global)

### Positioning: Global Digital Identity Advisory & Transfer Facilitation Desk

IDsvault is positioned as a **broker-assisted facilitation desk**, not a marketplace. The service provides:

1. Seller verification and vetting
2. Escrow custody (sub-$5K) or licensed escrow arrangement (above $5K)
3. Transfer facilitation and live supervision
4. Dispute mediation during escrow

**What IDsvault does not do:**
- Buy or sell digital accounts as principal
- Guarantee post-transfer platform behaviour
- Hold cross-border escrow funds directly above $5,000 USD

### Asset Tier Framework

| Asset Type | Legal Status | IDsvault Service | Public Inventory |
|------------|-------------|-----------------|-----------------|
| Telegram usernames (Fragment) | ✅ Platform-sanctioned | Full brokerage | Yes |
| Domain names | ✅ Fully legal | Full brokerage | Yes |
| Discord servers | ✅ Ownership transfer | Full brokerage | Yes |
| YouTube channels | 🟡 Google allows via Brand Account | Brokerage + disclosure | Yes, with caveat |
| TikTok accounts | 🟡 Grey, less enforced | Advisory + disclosure | No (advisory only) |
| Instagram handles | 🔴 Meta ToS-prohibited | Advisory + full disclosure | No (advisory only) |
| X (Twitter) usernames | 🔴 X ToS-prohibited | Advisory + full disclosure | No (advisory only) |

Instagram and X are handled only through the `/advisory` page, never listed publicly, and require written risk acknowledgment before engagement begins.

---

## Part 2 — Jurisdiction Compliance Matrix

### 2.1 India (Operating Jurisdiction — Non-Negotiable Floor)

| Requirement | Authority | Status |
|------------|-----------|--------|
| Udyam Registration (MSME) | Ministry of MSME | ⬜ Pending |
| GST Registration | GSTN | ⬜ Pending |
| Shops & Establishment Act (Telangana) | Telangana Labour Dept | ⬜ Pending |
| Dedicated Business Current Account | Any scheduled bank | ⬜ Pending |
| IT Act 2000 + Intermediary Rules 2021 compliance | MeitY | ⬜ Pending |
| Grievance Officer published | MeitY | ⬜ Pending |
| DPDPA 2023 Privacy Policy | MeitY | ⬜ Pending |
| Consumer Protection (E-Commerce) Rules 2020 | Dept of Consumer Affairs | ⬜ Pending |
| Professional Indemnity Insurance | ICICI Lombard / HDFC Ergo | ⬜ Pending |

### 2.2 European Union (GDPR + Digital Services Act)

| Requirement | Notes |
|------------|-------|
| Lawful basis documented for each data processing activity | Consent, contract, legitimate interest |
| Privacy policy GDPR-compliant (Articles 13-14) | Draft below |
| EU representative designated (if no EU establishment) | Required under Article 27 GDPR if regularly processing EU data |
| Cookie banner with equivalent reject-all option | Reject must be one click, same prominence as accept |
| Data Processing Agreements with Supabase, Vercel, GA4 | Required under Article 28 |
| Standard Contractual Clauses for data transfers out of EU | Required for India ↔ EU data flow |
| Data Subject rights process (access, rectify, erase, port, object) | 30-day response obligation |
| 14-day right of withdrawal disclosure + service-start waiver | Consumer Rights Directive |
| EU ODR platform reference for EU consumers | Required |

### 2.3 United Kingdom (UK GDPR + Consumer Rights Act)

| Requirement | Notes |
|------------|-------|
| UK ICO as supervisory authority | Register if turnover > £36M or >250 staff (unlikely initially) |
| UK GDPR-compliant privacy policy | Near-identical to EU GDPR version |
| UK representative if no UK establishment | Recommended if regularly processing UK data |
| International Transfer Agreement (ITA) | UK equivalent of EU SCCs |

### 2.4 United States

| Requirement | Notes |
|------------|-------|
| CCPA/CPRA (California) | "Do Not Sell or Share" disclosure, privacy rights notice |
| Virginia, Colorado, Connecticut, Utah, Texas, Oregon | Similar state laws; one unified US privacy notice covers most |
| FTC Act Section 5 | No deceptive practices; testimonials must be genuine |
| Money transmission law risk | Holding escrow funds may require state licenses in CA, NY, TX. **Solution: use Escrow.com for US buyers above $1,000** |
| DMCA agent registration | $6 fee at US Copyright Office — required for DMCA safe harbor |

### 2.5 Canada

| Requirement | Notes |
|------------|-------|
| PIPEDA | Privacy policy compliance |
| CASL | Explicit consent for marketing email; unsubscribe mechanism |

### 2.6 Australia

| Requirement | Notes |
|------------|-------|
| Privacy Act 1988 (Australian Privacy Principles) | If annual turnover > AUD 3M or health information involved |
| Australian Consumer Law | Consumer guarantees for services |

### 2.7 UAE, Singapore, Saudi Arabia, Hong Kong

All broadly GDPR-aligned. A well-drafted global privacy policy with regional addenda covers these adequately. Consult local counsel before active marketing in these regions.

---

## Part 3 — Payment & Escrow Infrastructure (Global)

The choice of payment infrastructure is both a legal requirement and a trust signal.

### 3.1 Recommended Stack

| Use Case | Provider | Notes |
|---------|----------|-------|
| India domestic (INR) | Razorpay or Cashfree | Easiest for Indian buyers; direct UPI for high-trust deals |
| International card payments | Stripe | Supports 135+ currencies; straightforward business setup |
| Multi-currency receiving | Wise Business | Low FX fees; maintains separate currency accounts |
| High-value deals ($5K+) | Escrow.com | Licensed escrow provider; standard in domain industry |
| Telegram handle settlements | Fragment.com | TON-native; platform-endorsed; use for Telegram deals where possible |
| Crypto (USDC/USDT) | Only with legal opinion | VASP compliance requirements in India, EU; do not enable without advice |

### 3.2 Escrow Policy by Deal Size

| Deal Value | Escrow Mechanism | KYC Level |
|-----------|-----------------|-----------|
| Under $1,000 USD | IDsvault business account | Basic (name, email, phone) |
| $1,000 – $5,000 | IDsvault business account | Standard (gov ID + selfie) |
| $5,000 – $25,000 | Escrow.com | Enhanced (source of funds) |
| $25,000+ | Escrow.com + lawyer review | Full EDD |

**Critical rule:** Never hold buyer funds in a personal account. Always in a designated business current account, separate from operating funds.

---

## Part 4 — AML / KYC Framework (Global, FATF-aligned)

### 4.1 KYC Tiers

| Tier | Threshold | Requirements |
|------|-----------|--------------|
| 1 — Basic | Under $1,000 USD | Name, email, WhatsApp/phone number |
| 2 — Standard | $1,000–$10,000 USD | Government photo ID + liveness selfie (via Sumsub or Onfido, ~$1–3/verification) |
| 3 — Enhanced | $10,000–$50,000 USD | Tier 2 + source of funds declaration + address proof |
| 4 — Full EDD | $50,000+ USD | Tier 3 + video verification + CA/lawyer sign-off + senior management approval |

### 4.2 Screening Requirements

All onboarding (Tier 2+) must include:
- OFAC SDN list screening
- EU Consolidated Sanctions List
- UN Security Council Sanctions
- PEP (Politically Exposed Person) check
- Adverse media check (manual or automated)

Recommended provider: Sumsub or Onfido (bundle KYC + AML screening in one API, $1–5 per check).

### 4.3 Record Keeping

- KYC documents: retained 5 years from transaction date (PMLA India + FATF standard)
- Transaction records: retained 7 years

### 4.4 Sanctioned Jurisdictions — Block List

Block at both signup and payment stage:
- OFAC SDN countries: North Korea, Iran, Syria, Cuba
- Crimea, Donetsk, Luhansk regions (Russia-occupied Ukraine)
- EU/UK/UN sanctioned parties

Implementation: Cloudflare geofencing at CDN level + payment method screening + Sumsub checks.

---

## Part 5 — Trademark & IP Framework (Global)

### 5.1 Pre-Listing Checks (Mandatory for Every Asset)

Before any listing is published:
1. Search WIPO Global Brand Database (free)
2. Search USPTO (US trademarks, free)
3. Search EUIPO (EU trademarks, free)
4. Search IP India (Indian trademarks, free)
5. Google the handle for obvious brand association

If any result suggests trademark conflict: reject the listing.

### 5.2 Seller Indemnification

Every seller must sign (digitally via checkbox, logged with timestamp and IP):
- Declaration that they own the asset free and clear
- Declaration that the asset does not infringe any registered trademark worldwide
- Indemnification of IDsvault against all IP claims arising from the listing

### 5.3 DMCA Agent Registration (Required for US Safe Harbor)

Register a DMCA agent with the US Copyright Office:
- Cost: $6 per agent designation (3-year term)
- Required for Section 512 safe harbor protection
- Agent contact must be published at /policy/dmca

### 5.4 Takedown SOP

1. Verified IP claim received → listing delisted within 24 hours
2. Seller notified
3. Counter-notice period: 10 business days
4. If no counter-notice: permanent delisting, escrow refund to buyer
5. If counter-notice: legal review, arbitration as necessary

---

## Part 6 — Draft Legal Pages (12 pages, all require advocate review)

> These are operational drafts. **Have an advocate review and approve before publishing.**

---

### 6.1 — Global Terms of Service (`/policy/terms`)

Key provisions (draft full text with advocate):

**Parties:** IDsvault (operated by [REGISTERED ENTITY], Hyderabad) and the user

**Service description:** Independent broker-assisted facilitation and escrow for the private transfer of digital assets. IDsvault is not a buyer, seller, or marketplace. The underlying agreement is between seller and buyer directly.

**Platform risk:** Instagram and X transfers violate those platforms' ToS. Telegram (via Fragment), domains, Discord, and YouTube are lower-risk categories. Risk disclosure is mandatory and signed before any engagement.

**Escrow:** Buyer pays IDsvault (not seller). Funds held in designated business account or licensed escrow. Released only on buyer confirmation. Refunded in full if transfer fails.

**KYC:** Users consent to identity verification appropriate to transaction value.

**Prohibited uses:** Hacked/stolen assets, trademark-infringing assets, sanctioned parties, money laundering, fraud.

**Limitation of liability:** Capped at facilitation fee paid, or INR 10,000 minimum.

**Governing law:** India. Arbitration under Arbitration & Conciliation Act 1996, seat Hyderabad.

**EU/UK addendum:** 14-day withdrawal right disclosed, with service-commencement waiver. Consumer rights preserved where non-waivable.

**Grievance Officer:** [NAME], grievance@idsvault.com, 24-hour acknowledgment, 15-day resolution.

---

### 6.2 — Global Privacy Policy (`/policy/privacy`)

Unified policy compliant with: GDPR · UK GDPR · CCPA/CPRA · DPDPA 2023 · PIPEDA

**Data Fiduciary / Controller:** [REGISTERED ENTITY NAME], Hyderabad

**Data collected and lawful basis:**

| Data | Purpose | Lawful Basis | Retention |
|------|---------|-------------|-----------|
| Name, email, phone | Inquiry processing | Contract / Consent | 30 days post-ticket |
| Offer details | Deal facilitation | Contract | 30 days post-ticket |
| KYC documents | Legal obligation (AML) | Legal obligation | 5 years |
| Device/IP, GA4 | Analytics, fraud prevention | Legitimate interest | 14 months |

**Data rights (all jurisdictions):**
- Access, correction, deletion, portability, objection — respond within 30 days
- CCPA: "Do Not Sell or Share My Personal Information" — we do not sell; opt-out via privacy@idsvault.com
- DPDPA: Data Principal rights, nomination, grievance

**International transfers:** India → EU/UK requires Standard Contractual Clauses. India → US: adequacy assessment + SCCs.

**Vendors with DPAs:** Supabase (hosting), Vercel (CDN), Google Analytics (anonymized), any payment processor.

**Cookies:** Analytics only (GA4 with IP anonymization). Reject-all available.

**Breach notification:** 72 hours to relevant supervisory authority; prompt notice to affected individuals.

**Privacy contact:** privacy@idsvault.com

---

### 6.3 — Refund Policy (`/policy/refund`)

**Full automatic refund** if:
- Transfer cannot be completed within agreed timeframe
- Seller ownership verification fails or is fraudulent
- Platform blocks transfer before completion
- Seller withdraws before transfer begins

**Refund timeline:** 3 business hours from cancellation confirmation, subject to payment network processing (1–5 business days).

**EU/UK 14-day right of withdrawal:** EU and UK consumers have a 14-day cooling-off right. By explicitly requesting service commencement within that period (via checkbox on payment confirmation), the right is waived for the portion of the service already delivered. Full refund still applies for transfer failure.

**No refund:** After buyer confirms full account access and inspection window expires without dispute.

---

### 6.4 — Dispute Resolution Policy (`/policy/dispute`)

**Step 1:** Buyer raises dispute within inspection window (48–72 hours) → escrow frozen

**Step 2:** IDsvault acknowledges within 4 business hours, assigns reference number

**Step 3:** Both parties submit evidence within 24 hours

**Step 4:** IDsvault determination within 48 hours: refund, release, or split

**Step 5:** Either party may escalate to Hyderabad arbitration or (EU consumers) EU ODR platform

**EU ODR:** For EU consumer buyers, the EU Online Dispute Resolution platform is available at: ec.europa.eu/consumers/odr

---

### 6.5 — Platform Risk Disclosure (`/policy/risk-disclosure`)

**Low-risk transfers (publicly listed):**
- Telegram usernames via Fragment — fully platform-sanctioned
- Domain names — legal secondary market
- Discord servers — standard ownership transfer
- YouTube channels — Google allows via Brand Account transfer in most cases

**Advisory-only (not publicly listed):**
Instagram and X account/handle transfers are prohibited by Meta's and X's Terms of Service respectively. These platforms may suspend or permanently disable accounts found to have been transferred. IDsvault provides escrow and advisory services only. We cannot protect against platform action after transfer.

**Acknowledgment required (mandatory checkbox before advisory engagement):**
> "I have read and understood the Platform Risk Disclosure. I understand that Instagram and X prohibit account transfers and that the platform may suspend or ban the account after transfer. IDsvault's escrow protects my payment but cannot protect the account's post-transfer survival. I proceed voluntarily."

---

### 6.6 — AML / KYC Policy (`/policy/aml-kyc`)

Public-facing version of Part 4 of this document. Publishes the tier thresholds, explains what documents are required, explains that information is retained for legal compliance purposes, and explains that sanctions screening is conducted on all Tier 2+ transactions.

---

### 6.7 — Sanctions Policy (`/policy/sanctions`)

IDsvault does not provide services to sanctioned individuals, entities, or residents of embargoed regions. Service is denied to parties on the OFAC SDN list, EU Consolidated Sanctions List, or UN Security Council Sanctions list. Geofencing at CDN level and payment screening at transaction level. False declarations during onboarding result in permanent account ban and potential legal reporting.

---

### 6.8 — Cookie Policy (`/policy/cookie-policy`)

Only analytics cookies (GA4, IP-anonymized). No advertising or retargeting cookies. Reject-all and accept-all presented with equal prominence. Consent banner required for EU/UK visitors. Preference changeable at any time via policy page.

---

### 6.9 — DMCA Policy (`/policy/dmca`)

**DMCA Agent:**
Name: [NAME]
Address: [FULL ADDRESS], Hyderabad, India
Email: legal@idsvault.com

**Notice requirements:** Copyright registration number or sworn statement of ownership; identification of infringing content; good faith statement; signature.

**Counter-notice:** 10 business days to respond. If counter-notice filed, content re-listed unless rights holder files suit within 10–14 business days (US standard).

**Non-US IP claims:** Email legal@idsvault.com with equivalent information. We apply same 24-hour response standard.

---

### 6.10 — Grievance & Complaints (`/policy/grievance`)

**Grievance Officer (India, IT Rules 2021 mandatory):**
Name: [FULL NAME]
Designation: Grievance Officer, IDsvault
Email: grievance@idsvault.com
Phone: [PHONE]
Hours: Monday–Saturday, 10:00 AM – 6:00 PM IST
Acknowledgment: 24 hours | Resolution: 15 days

**Global complaints:**
Email: support@idsvault.com
Response: 4 business hours during business hours, 24 hours weekends

---

### 6.11 — Accessibility Statement (`/policy/accessibility`)

IDsvault is committed to WCAG 2.1 Level AA conformance. Known limitations: [list any]. Feedback: accessibility@idsvault.com. We will acknowledge accessibility reports within 5 business days and aim to remediate confirmed issues within 30 days.

---

### 6.12 — Imprint / Legal Notice (`/policy/imprint`)

Required for EU visitors (Impressum):

```
Legal name:     [REGISTERED ENTITY NAME]
Registration:   [CIN / UDYAM NUMBER]
GST:            [GSTIN once obtained]
Address:        [FULL ADDRESS], Hyderabad, Telangana — [PIN CODE], India
Email:          broker@idsvault.com
Phone:          +91 93929 74031
Represented by: [FOUNDER NAME]
```

---

## Part 7 — Risk Disclosure Copy (Site Implementation)

### 7.1 Homepage Banner (all pages, below nav)

```
IDsvault is an independent broker-assisted desk. 
Not affiliated with Telegram, any domain registrar, Discord, or Google.
Instagram and X advisory work carries platform-risk — read our full disclosure.
```

### 7.2 Advisory Inquiry Form Checkbox (non-skippable, Instagram/X only)

```
☐ I have read the Platform Risk Disclosure. I understand that Instagram and X 
  prohibit account/handle transfers in their Terms of Service, and that these 
  platforms may suspend or permanently ban the account after transfer. 
  IDsvault's escrow protects my payment, not the account's post-transfer survival. 
  I proceed voluntarily and accept this risk.
```

### 7.3 Advisory page banner

```
Platform Risk Notice
Instagram and X handle transfers are prohibited by those platforms' Terms of Service.
This service is advisory-only. We do not list these assets publicly.
Full disclosure: /policy/risk-disclosure
```

---

## Part 8 — Trust Signal Checklist

### Every page
- [ ] IDsvault wordmark + registered entity name in footer
- [ ] GSTIN in footer (once obtained)
- [ ] Udyam / CIN number in footer
- [ ] Physical Hyderabad address (verifiable on Google Maps)
- [ ] WhatsApp + email contact visible
- [ ] "Not affiliated with Telegram / Google / any platform" statement
- [ ] Deals-completed counter (real number only)
- [ ] Grievance Officer link in footer

### Homepage above the fold
- [ ] Founder name + editorial photo
- [ ] Real deal counter
- [ ] Trust strip: deal count, volume, escrow partner logos

### Inventory listings
- [ ] Verified badge (only on actually-verified listings)
- [ ] Platform category badge
- [ ] No fake "X people viewing" metrics
- [ ] Price shown or "Price on request"

### Advisory / inquiry forms
- [ ] Risk acknowledgment checkbox (non-skippable, IG/X only)
- [ ] GDPR consent notice for EU visitors
- [ ] Clear confirmation of what happens next

---

## Part 9 — 30-Day Global Compliance Rollout

### Week 1 — Legal Foundation

| Day | Action | Blocker |
|-----|--------|---------|
| 1 | Brief CA + advocate with this document | Blocks everything |
| 1 | Open dedicated business current account | Blocks all transactions |
| 2 | Register Udyam (free, 30 minutes) | — |
| 3 | Apply for GST registration (CA files this) | — |
| 4 | Apply for Shops & Establishment registration | — |
| 5 | **Publish Grievance Officer page** (legally required by IT Rules 2021) | Critical |
| 7 | Register DMCA agent with US Copyright Office ($6) | US safe harbor |

### Week 2 — Legal Pages Live

| Day | Action | Blocker |
|-----|--------|---------|
| 8 | Send Part 6 drafts to advocate for review | — |
| 10 | Advocate returns reviewed drafts | — |
| 11 | Publish advocate-approved ToS, Privacy, Refund, Dispute | Legal compliance |
| 12 | Publish Risk Disclosure, AML/KYC, Sanctions, Cookie Policy | — |
| 13 | Publish DMCA, Grievance, Accessibility, Imprint | EU compliance |
| 14 | Add risk acknowledgment checkbox to advisory form | Before first advisory deal |

### Week 3 — Trust Signals

| Day | Action | Blocker |
|-----|--------|---------|
| 15 | Add founder name + photo to homepage and /about | Biggest trust signal |
| 16 | Add GSTIN + Udyam number to footer | — |
| 17 | Create Google Business Profile (Hyderabad) | — |
| 18 | Set up Escrow.com business account | Required for >$5K deals |
| 19 | Set up Sumsub or Onfido for KYC verification | Required for Tier 2+ |
| 21 | Obtain professional indemnity insurance quote | — |

### Week 4 — Operations

| Day | Action | Blocker |
|-----|--------|---------|
| 22 | Draft internal SOP for legal notices | — |
| 23 | Run WIPO/USPTO/EUIPO checks on all existing listings | Before any deal |
| 24 | Draft seller intake form with indemnification checkbox | Before listing new assets |
| 25 | End-to-end deal simulation (test all steps) | — |
| 28 | Audit all site copy for "buy/sell username" framing → replace with advisory language | — |
| 30 | Legal sign-off: confirm all mandatory pages live and advocate-approved | — |

---

## Appendix A — Immediate Red Lines

Stop doing or saying these immediately. Each is a current legal exposure.

| Current State | Required Change | Risk |
|--------------|----------------|------|
| "Buy Instagram usernames" in any copy | "Instagram advisory only — read risk disclosure" | Meta legal action |
| No Grievance Officer published | Publish immediately | IT Rules 2021 violation |
| Any escrow funds in personal account | Dedicated business account only | PMLA criminal exposure |
| No risk disclosure before advisory inquiry | Mandatory signed checkbox | Consumer Protection Act violation |
| No legal entity name in footer | Register entity, add to footer | E-Commerce Rules 2020 violation |
| DMCA agent not registered | Register now ($6) | Loss of US DMCA safe harbor |

---

## Appendix B — Professional Budget (Global)

| Service | Provider | Annual Cost |
|---------|----------|------------|
| CA (GST, tax filing, quarterly) | CA firm | ₹40,000–80,000 |
| Advocate (ToS + retainer + advice) | Civil/IT/IP advocate | ₹60,000–120,000 |
| KYC provider (Sumsub/Onfido) | Per-check pricing | ~$1–5/check |
| Escrow.com fees | ~3.25% of deal value | Deal-dependent |
| Professional Indemnity Insurance | ICICI Lombard / Marsh | ₹50,000–150,000 |
| Legal page drafting (one-time) | Advocate + review | $2,000–5,000 USD |
| **Total Year 1 (approximate)** | | ₹3L–8L + one-time legal |

One deal at $10,000 USD covers the entire annual legal budget.

---

*End of IDsvault Legal & Trust Framework — Global Edition v2*  
*All draft text requires advocate review before any public publication.*
