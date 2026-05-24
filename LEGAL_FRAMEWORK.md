# IDsvault Legal & Trust Framework v1

> **Status:** Draft — requires review by a qualified Indian advocate  
> (Civil/commercial + IT Act + DPDPA specialist recommended)  
> **Jurisdiction:** Hyderabad, Telangana, India  
> **Prepared:** May 2026  
> **Next review:** Prior to first paid transaction or 90 days, whichever comes first

---

## ⚠️ Disclaimer

This document is an internal operational framework and starting-point draft. **It is not legal advice.** No text in this document should be published on the website without review by a qualified advocate licensed to practice in India. Particular urgency: DPDPA 2023 compliance, the intermediary liability sections, and the KYC/PMLA thresholds.

---

## Part 1 — Positioning Decision

### Recommendation: **Option 1 — Digital Identity Advisory & Transfer Facilitation**

**Rationale:**

Option 2 (dropping Instagram and X entirely) would remove the two highest-demand segments from the catalogue, gutting commercial viability before the business has found its footing. Telegram via Fragment is currently a thin, high-barrier market in India. Domain brokerage is already dominated by Sedo, GoDaddy Auctions, and Flippa.

Option 1 — framing the service as consulting, escrow, and facilitation rather than as a "marketplace for buying accounts" — is how this category operates legally in every jurisdiction that has case law on it. The core business does not change. What changes is:

**What we stop saying:**
- "Buy Instagram usernames"
- "Sell your Instagram handle"
- "Username marketplace"
- Any framing that implies IDsvault is the seller/buyer of accounts

**What we say instead:**
- "We facilitate private transfer agreements between two willing parties"
- "We provide verification, escrow, and advisory services for digital identity transactions"
- "We help you find, evaluate, and safely acquire digital identifiers"
- "Handle transfer advisory — we manage the process, not the platform"

**The legal basis:** IDsvault's role is that of an intermediary/escrow agent. You are not a party to the underlying agreement between seller and buyer. You provide:
1. Verification services (confirming seller ownership)
2. Escrow services (holding funds during transfer)
3. Advisory services (guiding the transfer process)
4. Dispute mediation (if transfer fails)

This framing is defensible. "Facilitating a private agreement between two adults" is materially different from "operating a marketplace that sells banned-category assets." The former is a service business. The latter invites takedown under IT Act Section 79 (intermediary liability).

**Tiered risk disclosure model (recommended):**

| Platform | Legal Status | IDsvault Offering | Risk Level |
|----------|-------------|-------------------|------------|
| Telegram (via Fragment) | ✅ Fully legal | Full brokerage | Low |
| .com / .in Domains | ✅ Fully legal | Full brokerage | Low |
| YouTube Channels | 🟡 Grey (Google ToS) | Advisory + escrow | Medium |
| TikTok | 🟡 Grey (less enforced) | Advisory + escrow | Medium |
| Instagram | 🔴 ToS-prohibited | Advisory + escrow only, with mandatory risk disclosure | High |
| X (Twitter) | 🔴 ToS-prohibited | Advisory + escrow only, with mandatory risk disclosure | High |

All Instagram and X listings must show a mandatory risk disclosure badge and require checkbox acknowledgment before an inquiry can be submitted.

---

## Part 2 — Required Registrations Checklist

| # | Registration | Authority | Threshold / Requirement | Status | Priority |
|---|-------------|-----------|------------------------|--------|----------|
| 1 | **Udyam Registration** (MSME) | Ministry of MSME | Any micro/small enterprise | ⬜ Pending | 🔴 Immediate |
| 2 | **GST Registration** | GSTN | Services turnover > ₹20L/year; optional below threshold but recommended | ⬜ Pending | 🔴 Immediate |
| 3 | **Shops & Establishment Act** | Telangana Labour Dept | Any commercial establishment in Telangana | ⬜ Pending | 🔴 Immediate |
| 4 | **Current Account (Business)** | Any scheduled bank | Required for business transactions; do NOT use personal account | ⬜ Pending | 🔴 Immediate |
| 5 | **PAN (Individual / Firm)** | Income Tax Dept | Required for financial transactions | ⬜ Pending | 🔴 Immediate |
| 6 | **Professional Tax (Telangana)** | Telangana State | Applicable to employed individuals + businesses | ⬜ Pending | 🟡 Month 1 |
| 7 | **Private Limited Company** (optional but recommended) | MCA / ROC | Provides personal liability shield | ⬜ Optional | 🟡 Month 2–3 |
| 8 | **TAN** (Tax Deduction Account Number) | Income Tax Dept | Required if paying salaries or contracting | ⬜ Pending | 🟡 When hiring |
| 9 | **Google Business Profile** | Google | Not a legal requirement but a trust signal | ⬜ Pending | 🟡 Month 1 |
| 10 | **Professional Indemnity Insurance** | ICICI Lombard / HDFC Ergo | Covers ₹10–50L claims; ₹15–25K/year | ⬜ Pending | 🟡 Month 1 |

**Immediate actions (before first paid transaction):**
- Register Udyam (free, online: udyamregistration.gov.in, done in 30 minutes)
- Open a dedicated business current account — do not hold escrow funds in a personal account
- Get CA advice on GST applicability for your specific service description
- Consult an advocate on intermediary classification under IT Rules 2021

---

## Part 3 — Draft Legal Page Text

> ⚠️ **All drafts below are starting points only. Send to a qualified advocate before publishing.**

---

### 3.1 — Terms of Service (`/policy/terms`)

```
TERMS OF SERVICE
IDsvault Digital Advisory Services
Last updated: [DATE]
Document reference: SV-TOS-2026-v4

1. PARTIES AND SERVICE DESCRIPTION

1.1 These Terms of Service ("Terms") govern your use of IDsvault ("we," "us," "our"), 
operated by [REGISTERED ENTITY NAME], a [sole proprietorship / private limited company] 
registered at [FULL ADDRESS], Hyderabad, Telangana, India — [UDYAM/CIN NUMBER].

1.2 IDsvault provides digital identity advisory, verification, and escrow facilitation 
services. We act as an independent intermediary — not as a buyer or seller of digital 
accounts, handles, or usernames. The underlying agreement to transfer any digital 
identifier is between the seller and the buyer directly. IDsvault's role is limited to:
   (a) Verifying seller's claimed ownership of a listed identifier
   (b) Holding buyer funds in escrow during the transfer process
   (c) Facilitating the transfer process and communication between parties
   (d) Mediating disputes arising during the escrow period
   (e) Providing advisory guidance on the transfer process

1.3 We are NOT affiliated with, endorsed by, or licensed by Meta Platforms Inc., 
X Corp., Telegram FZ LLC, Alphabet Inc., or any other platform whose identifiers 
may be discussed on this site.

2. ELIGIBILITY

2.1 You must be at least 18 years of age and have the legal capacity to enter 
binding contracts under the laws of India (or your country of residence).

2.2 By using IDsvault, you represent and warrant that you meet these requirements.

3. PLATFORM RISK ACKNOWLEDGMENT (MANDATORY)

3.1 IMPORTANT NOTICE: The transfer of usernames, handles, or accounts on platforms 
including Instagram, X (formerly Twitter), and similar social networks may violate 
those platforms' Terms of Service. Platform operators may, at their discretion, 
suspend, disable, or reclaim accounts involved in such transfers.

3.2 IDsvault provides facilitation and escrow services only. We do not guarantee 
that any transfer will be permitted by the relevant platform, nor do we guarantee 
that a transferred account will remain active after transfer.

3.3 By submitting any inquiry or initiating any transaction through IDsvault, you 
acknowledge that you have read, understood, and accepted these platform risks. 
Telegram handles transferred via Fragment (Telegram's official auction platform) 
are specifically excluded from this risk disclosure as that mechanism is sanctioned 
by the platform operator.

4. PROHIBITED USES

4.1 You must not use IDsvault to:
   (a) List, buy, or sell any identifier obtained through hacking, phishing, 
       SIM-swapping, credential theft, or any unauthorized access
   (b) List, buy, or sell any identifier that infringes a registered trademark 
       or impersonates a real person or entity
   (c) Facilitate any transaction that constitutes money laundering, fraud, 
       or a violation of the Prevention of Money Laundering Act 2002
   (d) Circumvent the escrow process or attempt to transact directly with a 
       counterparty discovered through IDsvault, bypassing our facilitation
   (e) Submit false ownership claims or fraudulent documentation
   (f) Use the platform for any purpose prohibited under the Information 
       Technology Act 2000 and rules thereunder

5. ESCROW AND PAYMENT

5.1 Buyer funds are held in a designated IDsvault business account. Personal 
accounts are never used to hold escrow funds.

5.2 Funds are released to the seller only upon: (a) buyer confirmation of 
successful transfer and satisfactory inspection, or (b) expiry of the 48-72 
hour inspection window without a buyer dispute.

5.3 All transactions are denominated in Indian Rupees (INR). IDsvault's 
facilitation fee (if any) will be disclosed in full before any payment is made.

5.4 For transactions above ₹2,00,000 (Two Lakh Rupees), basic KYC verification 
of both parties is mandatory before funds are released.

6. REFUNDS AND CANCELLATIONS

6.1 See Refund & Cancellation Policy at /policy/refund.

7. INTELLECTUAL PROPERTY

7.1 All content on this site (excluding user-submitted content) is the property 
of IDsvault or its licensors. You may not reproduce, distribute, or create 
derivative works without written permission.

8. LIMITATION OF LIABILITY

8.1 IDsvault's total aggregate liability to you in connection with any transaction 
or use of this service shall not exceed the facilitation fee paid by you to IDsvault 
in respect of the relevant transaction, or ₹10,000, whichever is greater.

8.2 IDsvault is not liable for: (a) platform-side account suspensions or bans 
after a completed transfer; (b) loss of followers, content, or monetisation on 
a transferred account; (c) indirect or consequential losses of any kind.

9. INDEMNIFICATION

9.1 You agree to indemnify and hold IDsvault, its officers, employees, and agents 
harmless from any claims, losses, damages, and expenses (including legal fees) 
arising from: (a) your use of the service; (b) your violation of these Terms; 
(c) false or inaccurate information provided by you; (d) any IP claim arising 
from an identifier you listed.

10. GOVERNING LAW AND DISPUTE RESOLUTION

10.1 These Terms are governed by the laws of India.

10.2 Any dispute arising from these Terms shall first be attempted to be resolved 
through good-faith negotiation. If unresolved within 30 days, disputes shall be 
referred to arbitration under the Arbitration and Conciliation Act 1996, with 
the seat of arbitration at Hyderabad, Telangana.

10.3 Subject to the arbitration clause above, courts at Hyderabad, Telangana 
shall have exclusive jurisdiction.

11. GRIEVANCE OFFICER

11.1 In accordance with the Information Technology (Intermediary Guidelines and 
Digital Media Ethics Code) Rules 2021, the following person is designated as 
Grievance Officer:

Name: [GRIEVANCE OFFICER NAME]
Designation: [TITLE]
Email: grievance@idsvault.com
Phone: [PHONE NUMBER]
Address: [FULL ADDRESS], Hyderabad, Telangana

Grievances will be acknowledged within 24 hours and resolved within 15 days 
of receipt.

12. MODIFICATIONS

12.1 We may update these Terms at any time. Continued use after changes 
constitutes acceptance of the revised Terms. We will notify active users 
of material changes via email or prominent site notice.
```

---

### 3.2 — Privacy Policy (`/policy/privacy`)

```
PRIVACY POLICY
IDsvault Digital Advisory Services
Last updated: [DATE]
Compliant with: Digital Personal Data Protection Act 2023 (DPDPA)

1. DATA FIDUCIARY IDENTITY

IDsvault, operated by [REGISTERED ENTITY NAME], [ADDRESS], Hyderabad, 
Telangana — [REGISTRATION NUMBER] — is the Data Fiduciary for all personal 
data collected through this service.

Contact for data matters: privacy@idsvault.com

2. WHAT WE COLLECT AND WHY

We collect only the minimum data necessary to provide our service.

| Data | Purpose | Legal Basis (DPDPA) | Retention |
|------|---------|---------------------|-----------|
| Name, email, WhatsApp number | To process your inquiry and contact you | Consent | 30 days after ticket closure |
| Offer amount, platform, handle of interest | To match inquiries to listings | Consent | 30 days after ticket closure |
| KYC documents (for transactions > ₹2L) | Legal obligation (PMLA/KYC compliance) | Legal obligation | 5 years (PMLA requirement) |
| GA4 analytics (anonymized) | To understand site usage patterns | Legitimate interest | 14 months (GA4 default) |
| IP address (server logs) | Security and fraud prevention | Legitimate interest | 30 days |

3. CONSENT

3.1 By submitting any inquiry form on IDsvault, you consent to us processing 
your personal data as described in this policy.

3.2 You may withdraw consent at any time by contacting privacy@idsvault.com. 
Withdrawal does not affect the lawfulness of processing before withdrawal.

4. YOUR RIGHTS UNDER DPDPA 2023

As a Data Principal, you have the right to:
- (a) Access: Obtain a summary of what personal data we hold about you
- (b) Correction: Request correction of inaccurate data
- (c) Erasure: Request deletion of your data (subject to legal retention requirements)
- (d) Grievance: Raise a complaint about how your data is handled
- (e) Nomination: Nominate another person to exercise rights on your behalf

To exercise any right, email privacy@idsvault.com with subject line: 
"DATA PRINCIPAL REQUEST — [YOUR NAME]"

We will respond within 15 days.

5. DATA SHARING

5.1 We do not sell your personal data.

5.2 We may share data with:
   - Payment processors (if applicable) — for transaction processing only
   - Law enforcement agencies — only in response to a lawful order
   - Our legal and financial advisors — bound by professional confidentiality

6. DATA SECURITY

6.1 Personal data is stored on Supabase-hosted infrastructure with 
row-level security policies. All data in transit is encrypted via TLS.

6.2 In the event of a data breach affecting your personal data, we will 
notify you within 72 hours of becoming aware of the breach.

7. COOKIES AND ANALYTICS

7.1 We use Google Analytics 4 with IP anonymization enabled. GA4 uses 
cookies to measure aggregate traffic patterns. We do not use advertising 
or retargeting cookies.

7.2 You may opt out of GA4 tracking by installing the 
[Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout).

8. CHILDREN'S DATA

8.1 This service is not directed at persons under 18. We do not knowingly 
collect data from minors. If you believe a minor has submitted data, contact 
privacy@idsvault.com immediately.

9. GRIEVANCE FOR DATA MATTERS

Name: [DATA PROTECTION OFFICER / GRIEVANCE OFFICER NAME]
Email: privacy@idsvault.com
Response time: 24-hour acknowledgment, 15-day resolution
```

---

### 3.3 — Refund & Cancellation Policy (`/policy/refund`)

```
REFUND AND CANCELLATION POLICY
IDsvault Digital Advisory Services
Last updated: [DATE]

1. FULL REFUND CASES (automatic, no questions asked)

You are entitled to a full refund of your escrowed payment if:
- (a) The seller cannot complete the transfer within the agreed timeframe (default: 72 hours)
- (b) IDsvault's verification process reveals the listing was fraudulent or ownership 
     was misrepresented
- (c) The platform itself blocks the transfer before it is completed
- (d) The seller withdraws from the transaction before the transfer begins
- (e) IDsvault cannot verify seller ownership to its satisfaction

Refund processing time: 3 business hours from cancellation confirmation, 
subject to banking network processing times (typically 1–5 business days 
for bank account credit).

2. PARTIAL REFUND CASES

IDsvault's facilitation fee (if any) is non-refundable once the verification 
process has been completed, even if the underlying transfer is subsequently cancelled.

3. NO-REFUND CASES

Once a transaction is marked COMPLETED — meaning the buyer has confirmed 
receipt of full account access and the inspection window has expired — 
no refunds will be issued. It is your responsibility to:
- (a) Verify you have full account access before confirming
- (b) Change all passwords and recovery details before confirming
- (c) Raise any disputes within the 48-72 hour inspection window

4. DISPUTE PROCESS

If you believe a completed transaction should be reversed, see our 
Dispute Resolution Policy at /dispute.

5. CONTACT FOR REFUND REQUESTS

Email: support@idsvault.com
WhatsApp: +91 93929 74031
Response time: within 4 business hours
```

---

### 3.4 — Dispute Resolution Policy (`/dispute`)

```
DISPUTE RESOLUTION POLICY
IDsvault Digital Advisory Services
Last updated: [DATE]

1. SCOPE

This policy applies to any dispute arising during or within 7 days after 
a transaction facilitated by IDsvault, including disputes about:
- Transfer failure or incomplete transfer
- Account access after transfer
- Misrepresentation of listing details
- Escrow fund release or refund

2. STEP-BY-STEP DISPUTE PROCESS

Step 1 — Raise a Dispute
Contact us within the inspection window (48–72 hours from transfer initiation):
Email: support@idsvault.com | WhatsApp: +91 93929 74031
Include: Transaction reference, nature of dispute, evidence (screenshots, videos)

Step 2 — Acknowledgment (within 4 business hours)
We acknowledge receipt and assign a dispute reference number.
Escrow funds are frozen — no release to either party during active dispute.

Step 3 — Evidence Review (within 24 hours)
IDsvault reviews evidence from both parties. Both buyer and seller have 
24 hours from Step 2 acknowledgment to submit their evidence.

Step 4 — Determination (within 48 hours of evidence submission)
IDsvault issues a written determination: refund to buyer, release to seller, 
or partial split with reasoning.

Step 5 — Escalation (if determination is rejected)
Either party may escalate to formal arbitration under the Arbitration and 
Conciliation Act 1996, seat Hyderabad. Each party bears their own costs 
for arbitration unless the arbitrator awards costs.

3. IDsvault IS NOT AN ADJUDICATOR

IDsvault's dispute determination is a commercial mediation outcome, not 
a binding legal judgment. Either party retains the right to pursue civil 
remedies in Hyderabad courts independently of IDsvault's determination.

4. BAD FAITH DISPUTES

Disputes filed with fabricated evidence, threats, or for the purpose of 
reversing a legitimately completed transaction will result in permanent 
account ban and may be reported to law enforcement.
```

---

### 3.5 — Platform Risk Disclosure (`/risk-disclosure`)

```
PLATFORM RISK DISCLOSURE
IDsvault Digital Advisory Services
Last updated: [DATE]

READ THIS BEFORE PROCEEDING.

1. WHAT THIS PAGE IS

This page explains the specific risks involved in transferring social media 
handles and usernames. We are required by our own ethics standards — and by 
the Consumer Protection (E-Commerce) Rules 2020 — to make these risks 
completely clear before you commit to any transaction.

2. PLATFORM TERMS OF SERVICE PROHIBITIONS

The following platforms explicitly prohibit the sale, purchase, or transfer 
of accounts and usernames in their Terms of Service:

Instagram / Meta
Meta's Terms of Use state: "You can't transfer your account to someone else 
without our permission." Accounts found to have been sold or transferred may 
be permanently disabled by Meta without notice or recourse.

X (formerly Twitter)
X's Terms of Service state that accounts "may not be sold, bartered, or 
otherwise transferred." X Corp. may suspend or terminate any account 
it determines has been transferred.

3. WHAT THIS MEANS FOR YOU (plain language)

If you purchase a handle on Instagram or X through any service — including 
IDsvault — you are acquiring an asset that the platform may reclaim at any 
time. There is no legal remedy against the platform for doing so.

The risks include:
- Account suspension or permanent ban after transfer
- Loss of follower count, content history, and verification badges
- Loss of linked monetisation (brand deals, subscriptions, etc.)
- The platform's algorithm de-prioritising a recently transferred account

IDsvault CANNOT protect you from platform action. No escrow service can.

4. WHAT IDsvault CAN PROTECT YOU FROM

Our escrow process protects you from:
- Seller fraud (taking payment without delivering access)
- Fake listings (we verify ownership before publishing)
- Failed transfers (full refund if the transfer cannot be completed)

We protect the transaction. We cannot protect the asset after transfer.

5. LOWER-RISK ALTERNATIVES

If you need a permanent, legally defensible digital identity:

- Telegram handles via Fragment (fragment.com) — fully sanctioned by Telegram
- Domain names (.com, .in, etc.) — fully legal secondary market
- YouTube channels — transferable via Google Brand Account, lower enforcement risk

These categories are available through IDsvault with full advisory support 
and carry materially lower platform risk than Instagram or X.

6. ACKNOWLEDGMENT REQUIRED

Before submitting any inquiry for an Instagram or X handle, you must 
check the acknowledgment box on the inquiry form:

☐ "I have read and understood the Platform Risk Disclosure. I acknowledge 
   that Instagram and X prohibit handle transfers in their Terms of Service 
   and that IDsvault cannot protect me from platform-side account action 
   after a completed transfer. I proceed at my own risk."
```

---

### 3.6 — Grievance Officer Contact (`/grievance`)

```
GRIEVANCE REDRESSAL MECHANISM
IDsvault Digital Advisory Services

In accordance with Rule 3(2) of the Information Technology (Intermediary 
Guidelines and Digital Media Ethics Code) Rules, 2021, the following 
contact information is published for grievances.

─────────────────────────────────────────────
GRIEVANCE OFFICER
─────────────────────────────────────────────
Name:        [FULL NAME]
Designation: Grievance Officer, IDsvault
Address:     [FULL ADDRESS], Hyderabad, Telangana — [PIN CODE]
Email:       grievance@idsvault.com
Phone:       +91 [PHONE NUMBER]
Hours:       Monday–Saturday, 10:00 AM – 6:00 PM IST

Response commitment:
- Acknowledgment: within 24 hours of receipt
- Resolution: within 15 days of acknowledgment

─────────────────────────────────────────────
NODAL CONTACT (for law enforcement)
─────────────────────────────────────────────
[Same as Grievance Officer unless separate person designated]
Email: legal@idsvault.com

─────────────────────────────────────────────
HOW TO FILE A GRIEVANCE
─────────────────────────────────────────────
Send an email to grievance@idsvault.com with:
Subject: GRIEVANCE — [Brief description]
Body: Your name, contact details, transaction reference (if applicable), 
nature of grievance, and any supporting documents.

Types of grievances handled:
- Transaction disputes (see /dispute for the full dispute process)
- Privacy / data protection complaints (see /policy/privacy)
- Content complaints (illegal content, impersonation, IP infringement)
- Service complaints (response time, conduct of staff)

If you are law enforcement seeking user data or content removal pursuant 
to a lawful order, email legal@idsvault.com with the order reference number.

─────────────────────────────────────────────
ESCALATION
─────────────────────────────────────────────
If your grievance is not resolved within 15 days, you may approach:
- The Consumer Forum under the Consumer Protection Act 2019
- The Adjudicating Officer under the Information Technology Act 2000
- The Data Protection Board of India (once operational under DPDPA 2023)
```

---

### 3.7 — AML / KYC Policy (`/aml-kyc`)

```
ANTI-MONEY LAUNDERING AND KNOW YOUR CUSTOMER POLICY
IDsvault Digital Advisory Services
Last updated: [DATE]

[NOTE TO FOUNDER: Have a CA and advocate review this section before 
publishing. PMLA applicability to your specific business model — 
particularly whether you are a "reporting entity" — is a technical 
question that requires professional advice.]

1. POLICY STATEMENT

IDsvault is committed to preventing money laundering and related financial 
crimes. We apply Know Your Customer (KYC) procedures proportionate to 
transaction value and risk.

2. KYC REQUIREMENTS BY TRANSACTION TIER

Tier 1 — Transactions below ₹2,00,000 (Two Lakh Rupees)
  - Seller: Name, email, WhatsApp number, self-declaration of ownership
  - Buyer: Name, email, WhatsApp number

Tier 2 — Transactions ₹2,00,000 to ₹10,00,000
  Seller and Buyer both provide:
  - Government-issued photo ID (Aadhaar, PAN, or Passport)
  - PAN number
  - Bank account details (for fund transfer)
  - Self-declaration that funds are from legitimate sources

Tier 3 — Transactions above ₹10,00,000 (Ten Lakh Rupees)
  All Tier 2 requirements, plus:
  - Source of funds declaration with supporting documentation
  - Enhanced due diligence as determined by IDsvault
  - CA/legal sign-off before transaction proceeds

3. PROHIBITED TRANSACTIONS

IDsvault will not facilitate any transaction where:
  - We have reason to believe funds are proceeds of crime
  - The counterparty is on any sanctions list
  - KYC cannot be completed to our satisfaction
  - The transaction structure appears designed to avoid reporting thresholds

4. RECORD KEEPING

KYC documents are retained for 5 years from transaction date in 
compliance with PMLA record-keeping requirements.

5. REPORTING

If we identify a suspicious transaction, we reserve the right to report 
it to the Financial Intelligence Unit India (FIU-IND) as required by law.
```

---

### 3.8 — About (`/about`)

```
ABOUT IDSVAULT
[This page must include: founder name, founder photo, registered entity 
name, physical address, registration numbers, the real deal count, and 
a plain-language description of what the business actually does.]

Template:

Hi, I'm [FOUNDER NAME].

I started IDsvault in [YEAR] because I saw a real problem: people were 
trying to buy and sell premium digital handles through direct WhatsApp 
deals, with no verification and no protection. Buyers were getting 
scammed. Sellers were ghosted after transfer. There was no one in the 
middle making sure both parties were protected.

IDsvault is that middle. We verify sellers. We hold payment. We supervise 
the transfer. We refund if it falls through. Simple.

We're based in Hyderabad, Telangana. We're not affiliated with Meta, X 
Corp, or Telegram. We're an independent advisory and escrow desk run by 
real people with real accountability.

[NUMBER] deals completed to date.

Registered entity: [ENTITY NAME]
[UDYAM/CIN NUMBER]
[GSTIN] (if registered)
Address: [FULL ADDRESS], Hyderabad, Telangana — [PIN CODE]

Phone: +91 93929 74031
Email: support@idsvault.com
```

---

## Part 4 — Risk Disclosure Copy

### 4.1 Homepage Banner (above the fold, always visible)

```
⚠️  IDsvault is an independent advisory and escrow service.  
We are not affiliated with Meta, X Corp, or Telegram.  
Handle transfers on Instagram and X may violate platform Terms of Service.  
Read our full risk disclosure before proceeding.
```

### 4.2 Inquiry Form Checkbox (Instagram / X listings only)

Required checkbox, non-skippable, must be checked before form submits:

```
☐ I have read the Platform Risk Disclosure. I understand that Instagram 
  and X prohibit account transfers in their Terms of Service, that my 
  account could be suspended by the platform after transfer, and that 
  IDsvault cannot protect me from platform-side action. I proceed 
  voluntarily and accept this risk.
```

### 4.3 Listing Card Badge (Instagram / X only)

Small badge on every Instagram and X listing card:

```
⚠️ Platform risk — read disclosure
```

### 4.4 Listing Detail Page Banner (Instagram / X only)

```
Platform Risk Notice
Instagram and X prohibit account transfers in their Terms of Service. 
The platform may suspend this account after transfer. IDsvault's escrow 
protects your payment — not the account's post-transfer survival. 
Full details: /risk-disclosure
```

---

## Part 5 — Escrow Flow Diagram

```
IDSVAULT ESCROW PROCESS
========================

SELLER                    IDSVAULT                    BUYER
  │                           │                           │
  │  1. Submits listing        │                           │
  │  application + proof of   │                           │
  │  ownership                │                           │
  ├──────────────────────────►│                           │
  │                           │                           │
  │                           │  2. IDsvault verifies     │
  │                           │  ownership (bio token     │
  │                           │  change / settings        │
  │                           │  screenshot review)       │
  │                           │                           │
  │                           │  3. Listing published     │
  │                           │  (handle masked in        │
  │                           │  public catalogue)        │
  │                           │                           │
  │                           │◄──────────────────────────┤
  │                           │  4. Buyer submits inquiry │
  │                           │  + offer amount           │
  │                           │                           │
  │◄──────────────────────────┤                           │
  │  5. IDsvault contacts      │                           │
  │  seller; deal terms        │                           │
  │  confirmed by both         │──────────────────────────►│
  │  parties on WhatsApp/call  │  6. Deal terms confirmed  │
  │                           │  to buyer                 │
  │                           │                           │
  │                           │◄──────────────────────────┤
  │                           │  7. BUYER PAYS IDSVAULT   │
  │                           │  (UPI / bank transfer to  │
  │                           │  IDsvault business account│
  │                           │  — NOT to seller directly)│
  │                           │                           │
  │                           │  8. IDsvault confirms     │
  │                           │  receipt of funds to both │
  │◄──────────────────────────┤──────────────────────────►│
  │                           │                           │
  │  9. Transfer begins:      │                           │
  │  Seller + Buyer + IDsvault│                           │
  │  broker on WhatsApp / call│                           │
  │  simultaneously           │                           │
  │                           │                           │
  │  10. Seller transfers     │                           │
  │  account access to buyer  │                           │
  ├───────────────────────────┼──────────────────────────►│
  │                           │                           │
  │                           │  11. INSPECTION WINDOW    │
  │                           │  48–72 hours              │
  │                           │  Funds FROZEN during      │
  │                           │  this period              │
  │                           │                           │
  │                           │◄──────────────────────────┤
  │                           │  12a. Buyer CONFIRMS      │
  │                           │  successful transfer      │
  │◄──────────────────────────┤                           │
  │  12b. IDsvault RELEASES   │                           │
  │  funds to seller (minus   │                           │
  │  facilitation fee)        │                           │
  │                           │                           │
  └─── DEAL COMPLETE ─────────┴───────────────────────────┘

DISPUTE PATH (if raised within inspection window):
  │
  ├─► Buyer raises dispute → Escrow remains frozen
  ├─► Both parties submit evidence (24-hour window)
  ├─► IDsvault reviews and issues determination (48 hours)
  │     ├─► Refund to buyer: full escrow returned
  │     ├─► Release to seller: escrow released
  │     └─► Partial: split per evidence and determination
  └─► Either party may escalate to formal arbitration

KEY RULES:
  ✓ Buyer ALWAYS pays IDsvault — never the seller directly
  ✓ Seller NEVER receives payment until transfer is confirmed
  ✓ IDsvault uses a dedicated business bank account (not personal)
  ✓ No back-channel deals — bypassing escrow voids all protections
  ✓ For deals > ₹50,000: video verification call required before transfer
  ✓ For deals > ₹2,00,000: KYC documents required from both parties
```

---

## Part 6 — Trust Signal Checklist (per page template)

Every public-facing page must include all items in this checklist:

### Header / Navbar (every page)
- [ ] IDsvault name + shield icon
- [ ] Primary navigation visible
- [ ] "Talk to our desk" button → links to WhatsApp
- [ ] No fake urgency indicators ("X people viewing", countdown timers)

### Footer (every page)
- [ ] Founder name (real, first + last)
- [ ] Registered entity name
- [ ] GSTIN (once obtained)
- [ ] Udyam / CIN number
- [ ] Physical address (Hyderabad, Telangana, verifiable)
- [ ] Phone number that actually answers
- [ ] Email: support@idsvault.com
- [ ] Link to /grievance (legally required)
- [ ] "Not affiliated with Meta, X Corp, or Telegram" statement
- [ ] Deals completed counter (real number only — start at 0, increment honestly)
- [ ] Current year copyright

### Homepage above the fold
- [ ] Founder name + real photo
- [ ] Platform risk disclosure banner (for IG/X)
- [ ] Real deal counter (not inflated)
- [ ] WhatsApp contact number visible
- [ ] Address visible

### Listing cards
- [ ] Risk badge (Instagram / X only)
- [ ] Verified seller badge (only if actually verified)
- [ ] No fake "X people viewing" metrics
- [ ] Price shown or "Price on request" — no hidden fees
- [ ] Platform clearly labeled

### Inquiry / offer form
- [ ] Risk acknowledgment checkbox (Instagram / X only — non-skippable)
- [ ] Privacy notice ("Your data is used only to process this inquiry — see /policy/privacy")
- [ ] No pre-ticked boxes
- [ ] Clear submit button copy ("Send Inquiry to IDsvault Desk")
- [ ] Post-submit: confirmation that IDsvault (not seller) holds funds

### How it Works page
- [ ] Escrow flow described in plain language (matches diagram in Part 5)
- [ ] Explicit "Buyer pays IDsvault — not seller" statement
- [ ] KYC requirement thresholds disclosed
- [ ] Honest timeline ("4–24 hours typical, not guaranteed")
- [ ] What happens if it fails (refund, no questions asked)

---

## Part 7 — 30-Day Legal Compliance Rollout Plan

Sequenced by urgency and dependency. Some items require professional help — engage CA and advocate in Week 1.

### Week 1 — Foundation (Days 1–7)

| Day | Action | Who | Blocker? |
|-----|--------|-----|---------|
| 1 | Brief a CA on GST registration + business structure (Proprietorship vs Pvt Ltd) | Founder | Blocks Week 2 |
| 1 | Brief an advocate on IT Rules 2021 intermediary classification + ToS review | Founder | Blocks Weeks 2–3 |
| 2 | Open a dedicated business current account at any scheduled bank | Founder | Blocks all transactions |
| 2 | Register Udyam (online, free, 30 minutes) | Founder | — |
| 3 | Apply for GST registration (CA can file this) | CA | — |
| 4 | Apply for Shops & Establishment registration, Telangana | Founder | — |
| 5 | Add Grievance Officer name, email, phone to /grievance page — make it live | Dev | Required by IT Rules 2021 |
| 5 | Add "Not affiliated with Meta/X/Telegram" to footer | Dev | — |
| 7 | Add risk disclosure banner to homepage | Dev | — |

### Week 2 — Legal Pages (Days 8–14)

| Day | Action | Who | Blocker? |
|-----|--------|-----|---------|
| 8 | Send draft Terms, Privacy, Refund, Dispute policies (from Part 3 of this doc) to advocate for review | Founder | — |
| 9 | Send draft Risk Disclosure and AML/KYC policy to advocate | Founder | — |
| 10 | Advocate returns reviewed/marked-up drafts (allow 3–5 business days) | Advocate | — |
| 11 | Implement advocate-approved ToS, Privacy Policy, Refund Policy on site | Dev | — |
| 12 | Implement Dispute Resolution, Risk Disclosure, Grievance, AML/KYC pages on site | Dev | — |
| 13 | Add risk acknowledgment checkbox to IG/X inquiry forms | Dev | Required before first IG/X transaction |
| 14 | Add platform risk badge to all IG/X listing cards | Dev | — |

### Week 3 — Trust Signals (Days 15–21)

| Day | Action | Who | Blocker? |
|-----|--------|-----|---------|
| 15 | Add founder name, photo, bio to homepage and /about page | Founder | Biggest trust signal |
| 15 | Create /about page with registered entity details | Dev | — |
| 16 | Add GSTIN to footer (once received) | Dev | Depends on GST registration |
| 17 | Add Udyam number to footer | Dev | — |
| 18 | Set up Google Business Profile (Hyderabad listing) | Founder | — |
| 18 | Create LinkedIn profile for founder and IDsvault company page | Founder | — |
| 19 | Document escrow flow on /how-it-works page with plain-language version of Part 5 diagram | Dev | — |
| 21 | Obtain professional indemnity insurance quote (ICICI Lombard / HDFC Ergo) | Founder | — |

### Week 4 — Operations & Backup (Days 22–30)

| Day | Action | Who | Blocker? |
|-----|--------|-----|---------|
| 22 | Draft internal SOP for receiving legal notices (based on Part H of Phase 0 prompt) | Founder | — |
| 23 | Set up designated escrow bank account separate from operating account | Founder | Best practice |
| 24 | Draft KYC intake process for Tier 2/3 transactions (email template + document request) | Founder | — |
| 25 | Test full transaction flow end-to-end with a real deal or a staged internal test | Founder | — |
| 26 | Engage second payment backup (if Razorpay refuses category, test Cashfree or direct UPI flow) | Founder | — |
| 28 | Review all site copy against positioning decision (Option 1) — remove any "buy Instagram username" framing | Dev | — |
| 29 | Legal review sign-off: confirm all mandatory pages are live and advocate-approved | Advocate | — |
| 30 | First real transaction (only after escrow bank account confirmed, ToS live, risk disclosure live, KYC process ready) | Founder | — |

---

## Appendix A — Immediate Red Lines

Stop doing / saying these immediately. These are not "nice to have" changes — they are current legal exposures:

| Current | Required change | Risk if unchanged |
|---------|----------------|-------------------|
| "Buy Instagram usernames" in site copy | Replace with "Instagram handle advisory & facilitation" | Admission of ToS violation; invites Meta legal action |
| No Grievance Officer name/contact published | Add immediately to /grievance | IT Rules 2021 violation; intermediary liability risk |
| Personal account used for any escrow | Business account only | Criminal exposure under PMLA |
| No risk disclosure before IG/X inquiry | Mandatory checkbox before form submission | Consumer Protection Act 2019 violation |
| No physical address published | Must be verifiable Hyderabad address | Consumer Protection (E-Commerce) Rules 2020 violation |
| No entity name published | Must show registered entity name in footer | Consumer Protection (E-Commerce) Rules 2020 violation |

---

## Appendix B — Professional Services Budget (estimate)

| Service | Provider type | Estimated cost |
|---------|-------------|----------------|
| CA (GST + tax filing, quarterly) | Chartered Accountant | ₹3,000–6,000/month |
| Advocate (ToS review + retainer) | Civil/IT law advocate, Hyderabad | ₹5,000–10,000/month |
| Professional Indemnity Insurance | ICICI Lombard / HDFC Ergo | ₹15,000–25,000/year |
| Company Registration (Pvt Ltd, optional) | CS/CA | ₹8,000–15,000 one-time |
| Total Year 1 (approximate) | — | ₹1.2L–2.5L |

This is the cost of operating legally in this category. If the business does a single deal at ₹5L, the legal overhead for the year is covered.

---

*End of IDsvault Legal & Trust Framework v1*  
*This document must be reviewed by a qualified advocate before any text is published on the website or used as the basis for operational decisions.*
