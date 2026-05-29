/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Listing } from "../types";

interface SchemaMarkupProps {
  activeListing?: Listing | null;
}

const BASE = "https://idsvault.com";

const ORG = {
  "@type": "LocalBusiness",
  "@id": `${BASE}/#organization`,
  name: "IDsvault",
  alternateName: "IDsvault Digital Identity Brokerage",
  description:
    "India's broker-supervised digital identity advisory and transfer desk. Buy or sell premium Instagram usernames, X handles, Telegram usernames, and brandable domain names. Based in Hyderabad, Telangana.",
  url: BASE,
  logo: `${BASE}/cover.png`,
  image: `${BASE}/cover.png`,
  email: "broker@idsvault.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  areaServed: { "@type": "Country", name: "India" },
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, NEFT, RTGS, IMPS",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "21:00",
  },
  sameAs: [
    "https://x.com/IDsvault",
    "https://t.me/IDsvault",
    "https://instagram.com/IDsvault",
  ],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "IDsvault",
  description:
    "India's broker-supervised digital identity facilitation desk for premium social handles and domain names.",
  publisher: { "@id": `${BASE}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE}/inventory?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const HOME_FAQS = [
  {
    "@type": "Question",
    name: "How do I buy a premium Instagram username in India?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "To buy a premium Instagram username in India, engage IDsvault's broker desk. The broker verifies seller ownership, holds your payment in a designated broker account (released only after transfer is confirmed), and supervises the live handle migration. Contact broker@idsvault.com to start.",
    },
  },
  {
    "@type": "Question",
    name: "Is buying or selling a social media username legal in India?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Transferring administrative rights to a social media account is legally treated as a contract-based transfer of digital service rights in India. While platforms discourage transfers in their ToS, the underlying private contract between buyer and seller is legally recognised under Indian contract law. IDsvault documents every transaction with a proper transfer agreement.",
    },
  },
  {
    "@type": "Question",
    name: "How does broker-held payment work at IDsvault?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "The buyer transfers funds in INR (via UPI, NEFT, RTGS, or IMPS) to IDsvault's designated broker account — never to the seller. Funds are held until the buyer confirms full handle access. If the transfer fails at any step, the full amount is returned to the buyer with no deductions.",
    },
  },
  {
    "@type": "Question",
    name: "What platforms does IDsvault work with?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "IDsvault facilitates transfers for Instagram usernames, X (Twitter) handles, Telegram usernames, and brandable domain names (.com and .in). IDsvault does not work with Discord, YouTube, TikTok, or any cryptocurrency assets.",
    },
  },
  {
    "@type": "Question",
    name: "Where is IDsvault based?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "IDsvault is based in Hyderabad, Telangana, India. The service is available to buyers and sellers across India only. All transactions are in INR.",
    },
  },
];

const PROCESS_HOWTO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Buy a Premium Social Media Handle Through IDsvault",
  description:
    "Step-by-step guide to safely acquiring a premium Instagram, X, or Telegram handle through IDsvault's broker-supervised process.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Submit an Advisory Request",
      text: "Contact IDsvault at broker@idsvault.com with your target handle, platform, and budget. The broker desk will assess availability and provide a valuation.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Seller Verification",
      text: "IDsvault verifies the seller's identity, Original Registration Email access, account history, and absence of platform penalties before any buyer engagement.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Agree Deal Terms",
      text: "Price and transfer timeline are agreed between buyer and seller through IDsvault as neutral intermediary. A transfer agreement is signed by both parties.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Deposit to Broker Account",
      text: "Buyer transfers the agreed amount in INR via UPI, NEFT, RTGS, or IMPS to IDsvault's designated broker account — never to the seller directly.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Live Supervised Transfer",
      text: "Broker supervises the handle transfer in real time with both buyer and seller simultaneously online, preventing sniper capture and ORE exploitation.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Confirm Access and Receive Payment",
      text: "Buyer confirms full exclusive access and updates all credentials. Broker releases funds from broker account to seller. Post-closing support provided for 7 business days.",
    },
  ],
};

const SELL_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Premium Handle Listing — IDsvault Sellers Desk",
  provider: { "@id": `${BASE}/#organization` },
  description:
    "List your premium Instagram username, X handle, Telegram username, or domain name with IDsvault for broker-supervised sale. Seller identity verification, qualified buyer matching, and secure transfer management included.",
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "Digital Identity Brokerage — Seller Side",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    description: "Commission charged only on successful sale. No upfront listing fee.",
  },
};

const ADVISORY_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Premium Handle Acquisition Advisory — IDsvault",
  provider: { "@id": `${BASE}/#organization` },
  description:
    "Submit a sourcing request for a specific premium Instagram, X, Telegram handle or domain name. IDsvault's broker desk will identify, verify, and negotiate acquisition on your behalf.",
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "Digital Identity Brokerage — Buyer Side",
};

const FAQ_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ...HOME_FAQS,
    {
      "@type": "Question",
      name: "How much does a premium Instagram handle cost in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Premium Instagram handle prices in India range from ₹80,000 for short brandable words to ₹60,00,000+ for ultra-rare 2–3 character handles or prime single-word dictionary nouns. Niche sector keywords typically fetch ₹2.5–10 Lakhs. Prices have risen 30–50% year-on-year since 2024.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Original Registration Email (ORE) exploit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ORE exploit occurs when a seller, after transferring a social handle, uses the original signup email to file a platform support claim of 'unauthorised access' and reclaims the account. IDsvault prevents this by ensuring the ORE is changed to the buyer's email before any funds are released.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a refund if the username transfer fails?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the transfer fails at any step under IDsvault's broker supervision, the full purchase amount is returned to the buyer's UPI or bank account with no deductions. No brokerage fee is charged on failed transactions.",
      },
    },
    {
      "@type": "Question",
      name: "What KYC documents are required for username deals in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For transactions above ₹50,000, IDsvault requires government-issued photo ID (Aadhaar, PAN, or passport) from both buyer and seller. PAN card is mandatory for all transactions above ₹5,00,000. All data is handled under DPDPA 2023 compliance.",
      },
    },
  ],
};

const TRUST_PAGE = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Trust & Verification — IDsvault",
  url: `${BASE}/trust`,
  description:
    "How IDsvault verifies sellers, protects buyers, and ensures every digital identity transaction is safe, documented, and legally sound.",
  publisher: { "@id": `${BASE}/#organization` },
};

const ABOUT_PAGE = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About IDsvault — India's Digital Identity Brokerage Desk",
  url: `${BASE}/about`,
  description:
    "IDsvault is operated by Jogdhande Nikhil Patil, Lead Identity Broker, from Hyderabad, Telangana. India's dedicated desk for premium social handle and domain brokerage.",
  publisher: { "@id": `${BASE}/#organization` },
  about: {
    "@type": "Person",
    name: "Jogdhande Nikhil Patil",
    jobTitle: "Lead Identity Broker",
    worksFor: { "@id": `${BASE}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  },
};

const CONTACT_PAGE = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact IDsvault — Hyderabad Digital Identity Broker",
  url: `${BASE}/contact`,
  description:
    "Reach IDsvault's broker desk for handle acquisition advisory, seller listing, or general enquiries. Email: broker@idsvault.com. Based in Hyderabad, India.",
  publisher: { "@id": `${BASE}/#organization` },
};

const JOURNAL_PAGE = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE}/journal#blog`,
  name: "IDsvault Journal — Digital Identity Insights",
  url: `${BASE}/journal`,
  description:
    "Expert articles on buying and selling premium Instagram usernames, X handles, Telegram usernames, and domain names in India. Written by IDsvault's broker desk.",
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: "en-IN",
};

/** Derive a simple view key from the pathname */
function getView(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";
  if (pathname.startsWith("/asset/")) return "listing-detail";
  if (pathname.startsWith("/journal/")) return "blog-post";
  const seg = pathname.replace(/^\//, "").split("/")[0];
  return seg || "home";
}

/** Build breadcrumb for any pathname */
function buildBreadcrumb(pathname: string, activeListing?: Listing | null) {
  const items: { name: string; item: string }[] = [{ name: "Home", item: BASE }];

  if (pathname === "/inventory") {
    items.push({ name: "Premium Handle Inventory", item: `${BASE}/inventory` });
  } else if (pathname.startsWith("/asset/") && activeListing) {
    items.push({ name: "Inventory", item: `${BASE}/inventory` });
    items.push({
      name: `@${activeListing.username} on ${activeListing.platform}`,
      item: `${BASE}/asset/${activeListing.slug}`,
    });
  } else if (pathname === "/sell") {
    items.push({ name: "Sell a Handle", item: `${BASE}/sell` });
  } else if (pathname === "/advisory") {
    items.push({ name: "Advisory Request", item: `${BASE}/advisory` });
  } else if (pathname === "/journal") {
    items.push({ name: "Journal", item: `${BASE}/journal` });
  } else if (pathname.startsWith("/journal/")) {
    items.push({ name: "Journal", item: `${BASE}/journal` });
    const slug = pathname.replace("/journal/", "");
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    items.push({ name: title, item: `${BASE}${pathname}` });
  } else if (pathname === "/process") {
    items.push({ name: "Transfer Process", item: `${BASE}/process` });
  } else if (pathname === "/trust") {
    items.push({ name: "Trust & Verification", item: `${BASE}/trust` });
  } else if (pathname === "/about") {
    items.push({ name: "About", item: `${BASE}/about` });
  } else if (pathname === "/contact") {
    items.push({ name: "Contact", item: `${BASE}/contact` });
  } else if (pathname === "/faq") {
    items.push({ name: "FAQ", item: `${BASE}/faq` });
  } else if (pathname.startsWith("/policy/")) {
    const seg = pathname.replace("/policy/", "");
    const label = seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    items.push({ name: "Policies", item: `${BASE}/policy/terms` });
    items.push({ name: label, item: `${BASE}${pathname}` });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ activeListing }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remove previous dynamic schemas
    document.querySelectorAll(".dynamic-schema-ld").forEach((s) => s.remove());

    const view = getView(pathname);
    const schemas: object[] = [];

    // Always: WebSite + LocalBusiness + breadcrumb
    schemas.push(WEBSITE);
    schemas.push({ "@context": "https://schema.org", ...ORG });
    schemas.push(buildBreadcrumb(pathname, activeListing));

    // Per-route schemas
    if (view === "home") {
      schemas.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: HOME_FAQS });
    }

    if (view === "inventory") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Premium Handle Inventory — IDsvault",
        url: `${BASE}/inventory`,
        description:
          "Browse IDsvault's verified registry of premium Instagram usernames, X handles, Telegram usernames, and brandable domain names available for acquisition in India.",
        publisher: { "@id": `${BASE}/#organization` },
      });
    }

    if (view === "listing-detail" && activeListing) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: `@${activeListing.username} — Premium ${activeListing.platform} Handle`,
        image: `${BASE}/cover.png`,
        description: `Verified premium digital handle @${activeListing.username} on ${activeListing.platform}. Broker-supervised transfer with buyer fund protection. Available exclusively through IDsvault.`,
        sku: activeListing.id,
        brand: { "@type": "Brand", name: "IDsvault" },
        offers: {
          "@type": "Offer",
          url: `${BASE}/asset/${activeListing.slug}`,
          priceCurrency: "INR",
          price: activeListing.askingPrice || 500000,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: { "@type": "Organization", name: "IDsvault", url: BASE },
        },
      });
    }

    if (view === "sell") {
      schemas.push(SELL_SERVICE);
    }

    if (view === "advisory") {
      schemas.push(ADVISORY_SERVICE);
    }

    if (view === "process") {
      schemas.push(PROCESS_HOWTO);
    }

    if (view === "trust") {
      schemas.push(TRUST_PAGE);
    }

    if (view === "about") {
      schemas.push(ABOUT_PAGE);
    }

    if (view === "contact") {
      schemas.push(CONTACT_PAGE);
    }

    if (view === "faq") {
      schemas.push(FAQ_PAGE_SCHEMA);
    }

    if (view === "journal" || view === "blog-post") {
      schemas.push(JOURNAL_PAGE);
    }

    // Inject all schemas
    schemas.forEach((schema, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.className = "dynamic-schema-ld";
      el.id = `jsonld-dynamic-${i}`;
      el.text = JSON.stringify(schema);
      document.head.appendChild(el);
    });
  }, [pathname, activeListing]);

  return null;
};
