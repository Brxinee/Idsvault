import React, { useState } from "react";
import { ChevronDown, FileText, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "./SEO";
import { Link } from "react-router-dom";

type Segment =
  | "policy-terms"
  | "policy-privacy"
  | "policy-refund"
  | "policy-dispute"
  | "policy-risk-disclosure"
  | "policy-aml-kyc"
  | "policy-sanctions"
  | "policy-cookie-policy"
  | "policy-dmca"
  | "policy-grievance"
  | "policy-accessibility"
  | "policy-imprint"
  | "policy-acceptable-use"
  | "policy-trademark"
  | "faq";

interface RegulatoryInfoProps {
  segment: Segment;
}

type PolicySection = { heading: string; body: string };
type PolicyDoc = {
  title: string;
  description: string;
  canonical: string;
  updated: string;
  sections: PolicySection[];
};

const policyContent: Record<string, PolicyDoc> = {
  "policy-terms": {
    title: "Terms of Service",
    description: "How IDsvault works, what we do, what we don't do, and what you agree to when you use our brokerage service.",
    canonical: "/policy/terms",
    updated: "May 2025",
    sections: [
      {
        heading: "What IDsvault is",
        body: "IDsvault is a private broker-assisted desk based in Hyderabad, India. We facilitate the supervised transfer of digital handles — Telegram usernames, Instagram handles, X (Twitter) usernames, and brandable domains — between private parties. We are not an open marketplace. Every deal goes through a named human broker."
      },
      {
        heading: "What we list publicly",
        body: "Our public inventory covers Telegram usernames (broker-supervised live transfer), domain names (brandable domains). Instagram and X (Twitter) handles are handled on a private advisory basis only — they are never publicly listed — because both platforms prohibit username transfers in their Terms of Service. We disclose this risk in writing before any advisory engagement begins."
      },
      {
        heading: "How payment works",
        body: "Your payment goes to IDsvault's designated broker account — via UPI or bank transfer (NEFT/RTGS/IMPS). All payments are processed through our registered business current account. We hold the full amount, separate from our operating funds, until you confirm on the live call that you have full account access and have changed all credentials. Only then do we release payment to the seller. If the transfer fails at any step, you get a full refund — no third-party claim process needed, because we hold the funds directly."
      },
      {
        heading: "Fees and disclosure",
        body: "Our commission is 15% for deals under ₹5,00,000, 12% for deals between ₹5,00,000 and ₹20,00,000, and 10% for deals above ₹20,00,000. Deals above ₹85,00,000 are negotiable. All fees are disclosed before any payment is made. A broker invoice is issued for every transaction. There are no hidden charges."
      },
      {
        heading: "Governing law",
        body: "These terms are governed by the laws of India. IDsvault serves buyers and sellers in India only. Disputes are subject to arbitration in Hyderabad, Telangana under the Arbitration and Conciliation Act 1996. Consumer rights under the Consumer Protection Act 2019 (India) apply to all transactions and are not excluded by these terms."
      },
      {
        heading: "Limitations",
        body: "IDsvault is not affiliated with Telegram, Instagram, X (Twitter), or any domain registrar. All platform trademarks belong to their respective owners. We cannot guarantee that a platform will not change its policies after a transfer is completed. Our liability is limited to the amount of brokerage fees we collected on the specific deal in question."
      }
    ]
  },
  "policy-privacy": {
    title: "Privacy Policy",
    description: "What personal data IDsvault collects, why we collect it, how long we keep it, and your rights.",
    canonical: "/policy/privacy",
    updated: "May 2025",
    sections: [
      {
        heading: "What we collect",
        body: "When you use IDsvault, we collect the information you provide directly: your name, email address, WhatsApp number, and deal-related details (the handle you want, your budget, the platform). For KYC-required deals (above ₹85,000), we collect government-issued ID documents (Aadhaar/PAN). For deals above ₹8,50,000, we may request a source-of-funds declaration. We collect analytics data through Google Analytics to understand how visitors use the site."
      },
      {
        heading: "Why we collect it",
        body: "We process your data to operate the facilitation service — matching buyers and sellers, verifying ownership, coordinating payment, and completing the transfer. KYC data is collected because we are legally required under PMLA guidelines to verify identity above certain deal thresholds. Analytics data helps us improve the site. We do not sell personal data to third parties or use it for advertising."
      },
      {
        heading: "How long we keep it",
        body: "Deal records and KYC documents are retained for seven years to comply with India's anti-money laundering record-keeping requirements. Analytics data follows Google Analytics retention settings (up to 14 months). If you request deletion of your data, we will delete what we legally can and explain what we are required to retain."
      },
      {
        heading: "Your rights",
        body: "Under the Digital Personal Data Protection Act 2023 (DPDPA), you have the right to access the personal data we hold about you, correct inaccuracies, request erasure of data we are not legally required to retain, and raise a grievance. Requests are handled through our Grievance Officer — email broker@idsvault.com. We aim to respond within 7 business days."
      },
      {
        heading: "Data processors",
        body: "IDsvault is India-based and serves Indian clients only. We use third-party processors for hosting (Vercel) and analytics (Google Analytics). When data is processed outside India, we maintain appropriate contractual safeguards. We do not share personal data with buyers, sellers, or any marketing platform."
      }
    ]
  },
  "policy-refund": {
    title: "Refund Policy",
    description: "When you get your money back, how quickly, and what happens if a transfer goes wrong.",
    canonical: "/policy/refund",
    updated: "May 2025",
    sections: [
      {
        heading: "The short version",
        body: "If the transfer fails for any reason — the seller backs out, ownership verification fails, the platform blocks it, anything — you get a full refund within 3 business hours. No questions. No deductions. No waiting weeks. This is the whole point of broker-held payment: we control the funds, so we can return them immediately."
      },
      {
        heading: "When refunds apply",
        body: "A refund is triggered if: (1) the seller fails to complete the transfer during the live supervised call; (2) we cannot verify seller ownership and therefore cannot proceed with listing; (3) either party withdraws before the transfer has been initiated; or (4) the transfer attempt fails for any technical or platform reason."
      },
      {
        heading: "Completed transfers",
        body: "Once you confirm to our broker that you have full account access — you have changed the recovery email, phone number, and 2FA — payment is released to the seller and the deal is complete. At that point, the transaction is final. If you later discover a problem with the account, that is treated as a dispute (see our Dispute Resolution Policy), not an automatic refund."
      },
      {
        heading: "Fees",
        body: "If a deal is cancelled before the transfer is initiated, our brokerage fee is refunded in full. If the transfer was attempted but failed, our fee is also refunded. We only retain our commission on successfully completed deals."
      }
    ]
  },
  "policy-dispute": {
    title: "Dispute Resolution",
    description: "How we handle disagreements, what evidence we look at, and your escalation options.",
    canonical: "/policy/dispute",
    updated: "May 2025",
    sections: [
      {
        heading: "Start with us",
        body: "Most disputes are resolved quickly because we have records of everything — WhatsApp messages, call logs, ownership verification steps, and payment release confirmations. If you have a concern about a deal, contact broker@idsvault.com with your deal reference. We aim to respond within 24 hours."
      },
      {
        heading: "Broker-held payment disputes",
        body: "Since IDsvault holds the funds directly in our designated broker account, payment disputes do not require a third-party process. Contact broker@idsvault.com with your deal reference number. We maintain records of all WhatsApp conversations, call logs, and transfer confirmations. Most disputes are resolved within 24 hours."
      },
      {
        heading: "Ownership and platform disputes",
        body: "If a seller is found to have misrepresented ownership, or if an account is recovered post-transfer, we treat that as fraud and escalate internally. We will cooperate with law enforcement if required and can assist buyers in documenting the incident for police complaint purposes."
      },
      {
        heading: "Consumer forum escalation",
        body: "If a dispute cannot be resolved through our process, you may escalate to the National Consumer Disputes Redressal Commission (NCDRC) or relevant State Consumer Forum under the Consumer Protection Act 2019. You may also file a complaint with the Telangana State Consumer Forum if you are based in Telangana."
      },
      {
        heading: "Final resolution",
        body: "If a dispute cannot be resolved through our internal process or consumer forum escalation, it is subject to arbitration in Hyderabad, India under the Arbitration and Conciliation Act 1996. Indian law governs all disputes."
      }
    ]
  },
  "policy-risk-disclosure": {
    title: "Platform Risk Disclosure",
    description: "Honest disclosure of what can go wrong with each type of digital handle transfer — before you buy.",
    canonical: "/policy/risk-disclosure",
    updated: "May 2025",
    sections: [
      {
        heading: "Telegram usernames",
        body: "Telegram username transfers are done through a live supervised call — broker, buyer, and seller together. The seller transfers the username, you confirm access, and only then does the broker release payment. This is the cleanest and most straightforward category we handle. The main risk is market value fluctuation: a handle worth ₹5,00,000 today may be worth more or less in the future."
      },
      {
        heading: "Domain names",
        body: "Domain transfers are standard secondary-market transactions processed through registrar transfer protocols. The primary risks are expiry (if a domain is not renewed), trademark disputes if a brand later claims the domain, and country-code domain restrictions that vary by TLD. We verify that the seller has full transfer authority before listing."
      },
      {
        heading: "Instagram and X (Twitter) — advisory only",
        body: "Both Instagram and X explicitly prohibit the transfer or sale of usernames in their Terms of Service. This means any transfer carries the risk of platform enforcement: the account could be suspended, the username could be recycled, or the original owner could report the transfer to the platform. IDsvault does not publicly list Instagram or X handles. We only engage with these on a private advisory basis, and we require clients to sign a written risk acknowledgement before we do anything. We are telling you this upfront so there is no ambiguity."
      },
      {
        heading: "No permanent guarantees",
        body: "No broker — including IDsvault — can guarantee that a platform will not change its policies, suspend an account, or reclaim a username in the future. We can guarantee a clean, supervised transfer process. We cannot guarantee what a platform does after the transfer is complete."
      }
    ]
  },
  "policy-aml-kyc": {
    title: "AML / KYC Policy",
    description: "Why we verify identity, what documents we need, and how we handle high-value deals.",
    canonical: "/policy/aml-kyc",
    updated: "May 2025",
    sections: [
      {
        heading: "Why we do KYC",
        body: "Digital handle transactions can involve significant sums of money. We have an obligation to ensure we are not facilitating money laundering, tax evasion, or transactions with sanctioned parties. This is not just a legal requirement — it protects honest buyers and sellers by keeping bad actors off the platform."
      },
      {
        heading: "Thresholds",
        body: "Under ₹85,000 equivalent: basic name and contact details. Between ₹85,000 and ₹8,50,000: government-issued photo ID. Above ₹8,50,000: ID plus source-of-funds review and enhanced due diligence. For all clients, we require identity verification at the thresholds above regardless of payment method. PAN and Aadhaar are the primary accepted documents for Indian clients."
      },
      {
        heading: "How we handle KYC documents",
        body: "KYC documents are transmitted securely and stored with access controls. They are retained for seven years as required by India's Prevention of Money Laundering Act (PMLA). We do not share KYC documents with sellers. If you are a buyer, the seller does not see your identity documents — they only know the deal is proceeding."
      },
      {
        heading: "Suspicious activity",
        body: "We reserve the right to refuse or cancel any transaction where we suspect money laundering, fraud, or sanctions evasion — regardless of deal size. We will not explain specific reasons to the parties involved if doing so would compromise a compliance investigation. Refunds for cancelled KYC-flagged deals are handled on a case-by-case basis in accordance with our legal obligations."
      }
    ]
  },
  "policy-sanctions": {
    title: "Sanctions Policy",
    description: "Who we cannot work with and how we screen for restricted parties.",
    canonical: "/policy/sanctions",
    updated: "May 2025",
    sections: [
      {
        heading: "Restricted parties",
        body: "IDsvault does not provide services to individuals or entities on Indian government sanctions lists, or UN sanctions lists. Since we serve India only, international sanctions lists are not applicable, but we do not knowingly facilitate any transaction that would violate Indian law."
      },
      {
        heading: "Restricted jurisdictions",
        body: "IDsvault serves Indian buyers and sellers only. We do not accept international clients, cross-border payments, or transactions involving overseas parties. This simplifies our compliance posture and eliminates most sanctions-related risk entirely."
      },
      {
        heading: "How screening works",
        body: "We use name, email, payment origin, and IP data as part of our layered screening process. False declarations during onboarding — claiming to be in an unrestricted jurisdiction when you are not — are grounds for permanent service denial and potential reporting to relevant authorities."
      },
      {
        heading: "False declarations",
        body: "Providing false identity or location information during onboarding is a material breach of our terms. We reserve the right to freeze any in-progress deal and withhold funds pending compliance review if we discover a false declaration mid-transaction."
      }
    ]
  },
  "policy-cookie-policy": {
    title: "Cookie Policy",
    description: "What cookies we use, what they do, and how to control them.",
    canonical: "/policy/cookie-policy",
    updated: "May 2025",
    sections: [
      {
        heading: "What we use",
        body: "IDsvault uses Google Analytics to understand how visitors use the site — which pages are visited, how long people stay, and what actions they take. We use a consent banner to ask for your permission before enabling analytics. We do not use advertising cookies or share cookie data with third-party advertisers."
      },
      {
        heading: "Essential cookies",
        body: "A small number of cookies are strictly necessary for the site to function — for example, remembering your consent choice so we do not ask you every time. These are not optional and cannot be disabled without breaking site functionality."
      },
      {
        heading: "Analytics cookies",
        body: "Google Analytics cookies (ga, gid, _gat) are loaded only after you consent. They track anonymised usage patterns to help us improve the site. No personal information is transmitted in these cookies. You can decline analytics at any time through the cookie preference controls in the footer."
      },
      {
        heading: "Changing your preference",
        body: "You can change your cookie consent at any time. Clear site cookies in your browser settings or use the cookie preference link in the footer. Declining analytics does not affect your ability to use the site or contact our broker desk."
      }
    ]
  },
  "policy-dmca": {
    title: "DMCA / Copyright Policy",
    description: "How to submit a copyright takedown notice if your content appears on IDsvault without permission.",
    canonical: "/policy/dmca",
    updated: "May 2025",
    sections: [
      {
        heading: "How to file a notice",
        body: "If you believe content on IDsvault infringes your copyright, send a written notice to broker@idsvault.com with: (1) your name and contact information; (2) identification of the copyrighted work you claim is infringed; (3) identification of the specific content on our site; (4) a statement that you believe in good faith the use is not authorised; (5) a statement under penalty of perjury that the information is accurate and you are the rights holder or authorised to act on their behalf."
      },
      {
        heading: "What happens next",
        body: "We will acknowledge receipt within 3 business days. Valid notices will result in the content being temporarily delisted while we review. Incomplete notices may be returned for additional information before action is taken."
      },
      {
        heading: "Counter-notices",
        body: "If you believe content was delisted incorrectly, you may submit a counter-notice with your contact details, identification of the removed content, and a statement under penalty of perjury that the content was removed by mistake. Counter-notices may result in content reinstatement after the statutory waiting period."
      },
      {
        heading: "Note on username listings",
        body: "Username listings on IDsvault display platform handles (e.g. @username) and descriptive information about the handle. We do not host third-party creative content. If you believe a listing misrepresents your brand in a way that causes trademark confusion, please contact us — this may be better handled as a trademark matter than a DMCA notice."
      }
    ]
  },
  "policy-grievance": {
    title: "Grievance & Complaints",
    description: "How to raise a complaint with IDsvault and who our India grievance officer is.",
    canonical: "/policy/grievance",
    updated: "May 2025",
    sections: [
      {
        heading: "How to raise a complaint",
        body: "If you have a complaint about our service — whether about a deal, our conduct, data handling, or any other matter — email broker@idsvault.com with a clear description of your concern. We acknowledge all complaints within 24 hours during business days and aim to resolve them within 7 business days."
      },
      {
        heading: "India grievance officer",
        body: "In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, IDsvault maintains a designated Grievance Officer.\n\nName: Jogdhande Nikhil Patil\nDesignation: Lead Broker & Grievance Officer\nEmail: broker@idsvault.com\nPhone: +91 93929 74031\nAddress: Hyderabad, Telangana — 500 081, India\n\nThe Grievance Officer will acknowledge complaints within 24 hours and work to resolve them within 15 business days."
      },
      {
        heading: "Escalation",
        body: "If you are not satisfied with our response, you may escalate to Indian consumer forums under the Consumer Protection Act 2019. We cooperate fully with regulatory inquiries."
      },
      {
        heading: "Regulatory contact",
        body: "For data protection complaints, Indian clients may contact the relevant CERT-In or data protection authority once the DPDPA 2023 framework is fully operational. Email broker@idsvault.com for all compliance-related inquiries."
      }
    ]
  },
  "policy-accessibility": {
    title: "Accessibility Statement",
    description: "Our commitment to making IDsvault usable for everyone, including people with disabilities.",
    canonical: "/policy/accessibility",
    updated: "May 2025",
    sections: [
      {
        heading: "Our commitment",
        body: "IDsvault is committed to making our website accessible to people with disabilities. We target WCAG 2.1 AA conformance as our standard. We believe everyone who needs to buy or sell a digital handle should be able to use our site."
      },
      {
        heading: "What we have done",
        body: "The site is designed for keyboard navigation throughout. We maintain visible focus indicators so keyboard users can track their position. Buttons and interactive elements have descriptive labels. We use sufficient colour contrast ratios in our dark-first design. Modal dialogs manage focus correctly. A skip-to-content link is provided at the top of every page."
      },
      {
        heading: "Known limitations",
        body: "Some dynamic content (animated deal status cards, the floating WhatsApp button) may not be fully optimised for all screen reader workflows. We are working to improve this. If you encounter a barrier, please tell us — we will prioritise fixing it."
      },
      {
        heading: "Request accommodations",
        body: "If you need information in a different format — large print, plain text, or another accessible format — contact broker@idsvault.com. We will do our best to accommodate you promptly. For deal-specific assistance, our broker desk can manage the entire process over WhatsApp or phone if the website is not accessible to you."
      }
    ]
  },
  "policy-acceptable-use": {
    title: "Acceptable Use Policy",
    description: "What IDsvault will and will not facilitate — conduct rules for buyers and sellers.",
    canonical: "/policy/acceptable-use",
    updated: "May 2025",
    sections: [
      {
        heading: "What we facilitate",
        body: "IDsvault facilitates the supervised transfer of: Telegram usernames (officially transferable, no platform restriction), domain names (standard secondary-market transfers), Instagram handles and X usernames (private advisory basis only, with written risk acknowledgment). All transfers are handled with full documentation and broker oversight."
      },
      {
        heading: "What we do not facilitate",
        body: "IDsvault will refuse service for the following, without exception:\n\n• Assets obtained through hacking, phishing, social engineering, or account recovery exploits\n• Handles or accounts that impersonate real individuals, brands, or public figures\n• Assets that infringe registered trademarks in India or internationally\n• Assets containing slurs, hate speech, or content prohibited under Indian IT Rules 2021\n• Transactions where the buyer's intended use is impersonation, fraud, or misrepresentation\n• Assets linked to unlawful activity of any kind\n• Parties on Indian government sanctions lists or UNSC consolidated list"
      },
      {
        heading: "Instagram and X — advisory only",
        body: "Instagram and X (Twitter) explicitly prohibit username transfers in their Terms of Service. IDsvault does not publicly list handles from these platforms. We only engage with Instagram and X handles on a private advisory basis, and only after the client has signed a written risk acknowledgement confirming they understand and accept the platform enforcement risk."
      },
      {
        heading: "Seller responsibilities",
        body: "Sellers must: (1) be the original and lawful owner of the asset; (2) not have obtained the asset through any unauthorised method; (3) warrant that the asset does not infringe any third-party trademark; (4) indemnify IDsvault against any third-party claims arising from the listing or transfer of the asset."
      },
      {
        heading: "Buyer responsibilities",
        body: "Buyers must: (1) confirm their identity as required under our KYC policy; (2) ensure their intended use of the asset does not infringe any third-party trademark or violate any applicable law; (3) not misrepresent their identity or intended use to IDsvault."
      },
      {
        heading: "Enforcement",
        body: "Violation of this policy may result in immediate termination of service, forfeiture of any deposits, and reporting to relevant law enforcement authorities. False declarations are a material breach of our Terms of Service."
      }
    ]
  },
  "policy-trademark": {
    title: "Trademark Complaint Procedure",
    description: "How to submit a trademark complaint if you believe an IDsvault listing infringes your registered trademark.",
    canonical: "/policy/trademark",
    updated: "May 2025",
    sections: [
      {
        heading: "Before you file",
        body: "IDsvault pre-screens listings against the Indian Trade Marks Registry (ipindiaservices.gov.in) and WIPO databases before publishing. If you believe a listing still infringes your registered trademark, follow the procedure below."
      },
      {
        heading: "How to file a trademark complaint",
        body: "Send a written notice to broker@idsvault.com with the subject line 'Trademark Complaint'. Your notice must include:\n\n1. Your full legal name and contact information\n2. The registered trademark you claim is infringed (provide TM registration number and jurisdiction)\n3. The specific IDsvault listing you are complaining about (URL or handle)\n4. A statement explaining how the listing infringes your mark\n5. A declaration under penalty of perjury that the information is accurate and you are the rights holder or authorised agent\n\nWe cannot act on anonymous complaints or complaints without a trademark registration reference."
      },
      {
        heading: "What happens after you file",
        body: "We will acknowledge receipt within 24 hours. Valid notices with a verified trademark registration will result in the listing being temporarily suspended within 48 hours while we investigate. We will contact the seller and provide them an opportunity to respond. Incomplete notices will be returned for additional information."
      },
      {
        heading: "Seller response",
        body: "If a listing is suspended following a trademark complaint, the seller will be notified and may provide a counter-statement with evidence that the handle does not infringe the claimed mark. We will mediate where possible. If the complaint is valid, the listing will be permanently delisted and any pending deal will be cancelled with a full buyer refund."
      },
      {
        heading: "Repeat infringement",
        body: "Sellers who repeatedly list trademark-infringing assets will be permanently banned from IDsvault. We cooperate fully with trademark owners pursuing legal remedies through Indian courts or the Trade Marks Registry."
      }
    ]
  },
  "policy-imprint": {
    title: "Imprint / Business Identification",
    description: "Legal identity and contact details for IDsvault.",
    canonical: "/policy/imprint",
    updated: "May 2025",
    sections: [
      {
        heading: "Business identity",
        body: "IDsvault is operated as a private brokerage desk based in Hyderabad, Telangana, India. We provide broker-advised digital identity transfer facilitation services to buyers and sellers in India."
      },
      {
        heading: "Contact",
        body: "Primary: broker@idsvault.com\nWhatsApp: +91 93929 74031\nLocation: Hyderabad, Telangana, India"
      },
      {
        heading: "Platform independence",
        body: "IDsvault is an independent intermediary. We are not affiliated with, endorsed by, or officially connected to Telegram, Instagram, X (Twitter), or any domain registrar. All platform names and trademarks are the property of their respective owners."
      },
      {
        heading: "Governing jurisdiction",
        body: "All service terms are governed by the laws of India. For legal correspondence, contact broker@idsvault.com. We aim to respond to all legal inquiries within 5 business days."
      }
    ]
  }
};

const faqItems = [
  {
    q: "Is it legal to buy or sell an Instagram or X username?",
    a: "Instagram and X (Twitter) both prohibit username transfers in their Terms of Service. This means any transfer carries platform enforcement risk — the account could be suspended or the username recycled. IDsvault does not publicly list Instagram or X handles. We only engage with these on a private advisory basis, and we require clients to sign a written risk acknowledgement before we do anything. Telegram username transfers are done on a live broker-supervised call and carry no platform enforcement risk."
  },
  {
    q: "How does broker-held payment work?",
    a: "You pay IDsvault via UPI or bank transfer — not the seller. We hold the full amount in our designated business account until you confirm full account access on the live call and have changed all credentials — email, phone, and 2FA. Only then do we release payment to the seller. If the transfer fails at any step, you get a full refund within 3 business hours."
  },
  {
    q: "What is a live supervised transfer?",
    a: "The buyer, seller, and our Hyderabad broker are all on a video call together. The seller transfers the account while our broker watches. You update all credentials live on the call. Nobody leaves until you confirm you have full control. This makes account recovery after transfer essentially impossible."
  },
  {
    q: "How much does IDsvault charge?",
    a: "15% for deals under ₹5,00,000 · 12% for ₹5,00,000–₹20,00,000 · 10% above ₹20,00,000 · Negotiable for deals above ₹85,00,000. All fees are disclosed before any payment is made. Broker invoice issued for every transaction."
  },
  {
    q: "Can I buy a Telegram username through IDsvault?",
    a: "Yes. Telegram username transfers are our primary listing category. The transfer happens on a live supervised call — broker, buyer, and seller together. No platform enforcement risk. Browse our inventory to see available handles."
  },
  {
    q: "Do you serve buyers and sellers across India?",
    a: "Yes. IDsvault serves buyers and sellers across all Indian states. Our broker desk is based in Hyderabad but handles inquiries from anywhere in India via WhatsApp, phone, and Telegram. Payments are via UPI or bank transfer in INR."
  },
  {
    q: "What KYC documents do I need?",
    a: "Under ₹85,000: no KYC required. ₹85,000–₹8,50,000: government-issued photo ID (PAN or Aadhaar). Above ₹8,50,000: ID plus source-of-funds review. PAN is the primary document for Indian clients. All documents are treated with full confidentiality and are not shared with the counterparty."
  },
  {
    q: "How long does a deal take?",
    a: "Typically 24–72 hours from first inquiry to completed transfer. This includes ownership verification, KYC (if required), both parties scheduling the live call, and the transfer itself. Complex deals or high-value deals with enhanced due diligence may take longer — we will keep you updated throughout."
  },
  {
    q: "What if the seller tries to recover the account after transfer?",
    a: "Account recovery is effectively prevented by the live supervised transfer process. You change the recovery email, phone number, and 2FA before our broker releases any funds to the seller. The seller has no financial incentive to attempt recovery once they have been paid. If it ever happens, we assist you in documenting the incident and escalating to law enforcement."
  },
  {
    q: "How do I list a handle for sale?",
    a: "Submit through our Sell page. We verify ownership before listing anything — you must prove you own the account. Once verified, we handle all buyer inquiries and negotiations. You deal with our broker, not with buyers directly. There is no listing fee — we earn our commission only on completed deals."
  },
  {
    q: "Is IDsvault affiliated with Telegram, Instagram, or any platform?",
    a: "No. IDsvault is an independent intermediary. We are not affiliated with, endorsed by, or officially connected to Telegram, Instagram, X (Twitter), or any domain registrar. All platform trademarks belong to their respective owners."
  },
  {
    q: "What happens if IDsvault shuts down mid-deal?",
    a: "All funds are held in IDsvault's registered business current account, kept strictly separate from operating funds. Every deal has a signed engagement letter and broker invoice. Deal records are maintained for 7 years. If something ever goes wrong, all documentation is available to any legal authority."
  }
];

export const RegulatoryInfo: React.FC<RegulatoryInfoProps> = ({ segment }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (segment === "faq") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-left space-y-8">
        <SEO
          title="Frequently Asked Questions — IDsvault"
          description="Common questions about buying and selling Instagram, X, and Telegram usernames through IDsvault's broker-supervised transfer service in India."
          canonical="/faq"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }))
          }}
        />

        <div className="space-y-2">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">FAQ</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Everything buyers and sellers ask us</h1>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
            Plain answers. No legal jargon. If you have a question that isn't here, message our broker on{" "}
            <a href="https://wa.me/919392974031" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">WhatsApp</a>.
          </p>
        </div>

        <div className="space-y-2">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-white/[0.06] rounded-xl bg-canvas overflow-hidden">
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors cursor-pointer gap-4"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                aria-expanded={activeFaq === index}
              >
                <span className="text-sm font-semibold text-white leading-snug">{item.q}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/[0.04] px-5 py-4 text-sm text-gray-400 leading-relaxed"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/919392974031?text=Hi+IDsvault%2C+I+have+a+question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </a>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-xs font-medium text-gray-300 hover:text-white uppercase tracking-wider transition-colors"
          >
            Browse handles
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const content = policyContent[segment];
  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-left space-y-8">
      <SEO title={`${content.title} — IDsvault`} description={content.description} canonical={content.canonical} />

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/25 text-amber-400 text-xs font-semibold">
        <span className="shrink-0">⚠</span>
        <span>Draft — under legal review. This document has not been reviewed by a qualified legal professional and is subject to change.</span>
      </div>

      <header className="space-y-3 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface border border-white/[0.08]">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">IDsvault Policy</p>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{content.title}</h1>
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{content.description}</p>
        <p className="text-[10px] text-gray-600 font-mono">Last updated: {content.updated} · Questions? <a href="mailto:broker@idsvault.com" className="underline hover:text-gray-400">broker@idsvault.com</a></p>
      </header>

      <div className="space-y-8">
        {content.sections.map((section, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-sm font-bold text-white">{section.heading}</h2>
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row gap-3">
        <Link
          to="/faq"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-mono"
        >
          Full FAQ
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href="mailto:broker@idsvault.com"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-mono"
        >
          Email broker desk
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
