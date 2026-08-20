/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SITE_CONFIG } from "./siteConfig";
import { Listing, BlogPost } from "../types";

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: "summary_large_image";
  noindex?: boolean;
  pageType: "website" | "article" | "product";
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Build BreadcrumbList JSON-LD schema */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_CONFIG.canonicalOrigin}${item.url.startsWith("/") ? item.url : `/${item.url}`}`
    }))
  };
}

/** Build Organization / LocalBusiness JSON-LD schema */
export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.canonicalOrigin}/#organization`,
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.canonicalOrigin,
    "email": SITE_CONFIG.broker.email,
    "telephone": SITE_CONFIG.broker.phone,
    "logo": `${SITE_CONFIG.canonicalOrigin}/cover.png`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": SITE_CONFIG.location.addressLocality,
      "addressRegion": SITE_CONFIG.location.addressRegion,
      "postalCode": SITE_CONFIG.location.postalCode,
      "addressCountry": SITE_CONFIG.location.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.location.latitude,
      "longitude": SITE_CONFIG.location.longitude
    },
    "areaServed": {
      "@type": "Country",
      "name": SITE_CONFIG.location.countryName
    },
    "currenciesAccepted": "INR",
    "paymentAccepted": "UPI, NEFT, RTGS, IMPS",
    "serviceType": [
      "Digital Identity Brokerage",
      "Username Transfer",
      "Handle Acquisition",
      "Domain Brokerage"
    ],
    "founder": {
      "@type": "Person",
      "name": SITE_CONFIG.broker.name,
      "jobTitle": SITE_CONFIG.broker.title,
      "email": SITE_CONFIG.broker.email,
      "telephone": SITE_CONFIG.broker.phone
    }
  };
}

/** Build WebSite JSON-LD schema with SearchAction */
export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.canonicalOrigin}/#website`,
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.canonicalOrigin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.canonicalOrigin}/inventory?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/** Build Product + Offer schema for a Listing */
export function buildListingSchema(listing: Listing): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_CONFIG.canonicalOrigin}/asset/${listing.slug}#product`,
    "name": `@${listing.username} — Premium ${listing.platform} Handle`,
    "description": listing.description || `Premium ${listing.platform} handle @${listing.username} available via IDsvault broker-assisted transfer.`,
    "url": `${SITE_CONFIG.canonicalOrigin}/asset/${listing.slug}`,
    "brand": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.canonicalOrigin
    },
    "category": listing.category,
    "offers": {
      "@type": "Offer",
      "@id": `${SITE_CONFIG.canonicalOrigin}/asset/${listing.slug}#offer`,
      "priceCurrency": "INR",
      "price": listing.askingPrice,
      "availability": listing.status === "LIVE" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": SITE_CONFIG.canonicalOrigin
      }
    }
  };
}

/** Build BlogPosting schema for an Article */
export function buildArticleSchema(post: BlogPost): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_CONFIG.canonicalOrigin}/journal/${post.slug}#article`,
    "headline": post.title,
    "description": post.metaDescription || post.introduction,
    "url": `${SITE_CONFIG.canonicalOrigin}/journal/${post.slug}`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.canonicalOrigin,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.canonicalOrigin}/cover.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.canonicalOrigin}/journal/${post.slug}`
    }
  };
}

/** Build FAQPage schema */
export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/** Centralized route-level SEO resolver */
export function getPageSEO(pathname: string): SEOMetadata {
  const cleanPath = pathname.split("?")[0].split("#")[0];

  // 1. Homepage
  if (cleanPath === "/" || cleanPath === "") {
    return {
      title: "IDsvault — Digital Identity Advisory & Transfer Desk | Hyderabad, India",
      description: "India's broker-advised digital identity desk. Buy or sell premium Instagram usernames, X (Twitter) handles, Telegram usernames, and brandable domains. Broker-held payment & live transfer. Hyderabad, Telangana.",
      canonical: "/",
      ogTitle: "IDsvault — Digital Identity Advisory & Transfer Desk",
      ogDescription: "Broker-advised transfer facilitation for Instagram usernames, X handles, Telegram usernames, and brandable domains. India only. Hyderabad desk.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildOrganizationSchema(),
        buildWebSiteSchema()
      ]
    };
  }

  // 2. Inventory / Registry
  if (cleanPath === "/inventory" || cleanPath === "/browse") {
    return {
      title: "Premium Username & Domain Registry — Live Inventory",
      description: "Browse verified, broker-held Telegram usernames, Instagram handles, X usernames, and brandable domains available for secure transfer in India.",
      canonical: "/inventory",
      ogTitle: "Verified Digital Identity Registry — IDsvault",
      ogDescription: "Browse verified premium handles and brandable domain names available via broker-supervised transfer.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/inventory`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Inventory", url: "/inventory" }
        ])
      ]
    };
  }

  // 3. Sell Application
  if (cleanPath === "/sell") {
    return {
      title: "Sell Your Premium Username or Domain — Broker Valuation",
      description: "Submit your premium Telegram username, Instagram handle, X handle, or brandable domain to IDsvault. Verified ownership, broker escrow, INR payout.",
      canonical: "/sell",
      ogTitle: "Sell Premium Digital Handles — IDsvault Hyderabad",
      ogDescription: "List your premium handle or domain with India's broker-advised digital identity desk. Direct broker valuation & secure handover.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/sell`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Sell", url: "/sell" }
        ])
      ]
    };
  }

  // 4. Advisory / Sourcing
  if (cleanPath === "/advisory" || cleanPath === "/source" || cleanPath === "/request") {
    return {
      title: "Private Handle Sourcing & Identity Advisory — IDsvault",
      description: "Request off-market acquisition or private brokerage for target Instagram, X, Telegram usernames, or brandable domains in India.",
      canonical: "/advisory",
      ogTitle: "Private Identity Sourcing Desk — IDsvault",
      ogDescription: "Discrete off-market acquisition of high-value social handles and domains for Indian brands, founders, and enterprises.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/advisory`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Advisory", url: "/advisory" }
        ])
      ]
    };
  }

  // 5. Journal / Blog index
  if (cleanPath === "/journal" || cleanPath === "/blog") {
    return {
      title: "Digital Identity Journal & Market Intelligence — IDsvault",
      description: "Expert guides, legal frameworks, pricing benchmarks, and safety protocols for buying, selling, and transferring social usernames and domains in India.",
      canonical: "/journal",
      ogTitle: "IDsvault Journal — Digital Identity Insights",
      ogDescription: "Market intelligence and compliance guides for username acquisition and digital identity brokerage in India.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/journal`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Journal", url: "/journal" }
        ])
      ]
    };
  }

  // 6. About Page
  if (cleanPath === "/about") {
    return {
      title: "About IDsvault — Hyderabad Digital Identity Broker Desk",
      description: "Learn about IDsvault, India's solo-operated digital identity desk led by broker Jogdhande Nikhil Patil in Hyderabad, Telangana.",
      canonical: "/about",
      ogTitle: "About IDsvault — Hyderabad Identity Broker",
      ogDescription: "Personalized, accountable brokerage for premium social handles and domains across India.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/about`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" }
        ]),
        buildOrganizationSchema()
      ]
    };
  }

  // 7. Process Page
  if (cleanPath === "/process") {
    return {
      title: "How Handle Transfers Work — 5-Step Broker Protocol",
      description: "Understand our step-by-step broker-supervised transfer process: verification, broker account deposit, live handover call, credential sanitization, and payout.",
      canonical: "/process",
      ogTitle: "5-Step Broker Transfer Protocol — IDsvault",
      ogDescription: "Detailed breakdown of our live-supervised transfer workflow for zero-risk username acquisition.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/process`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Process", url: "/process" }
        ])
      ]
    };
  }

  // 8. Trust Page
  if (cleanPath === "/trust") {
    return {
      title: "Trust & Safety Framework — IDsvault Accountability",
      description: "Our security promises: broker-held funds, live-call transfer supervision, named broker accountability, and full refund policy.",
      canonical: "/trust",
      ogTitle: "Trust & Safety Commitments — IDsvault",
      ogDescription: "How IDsvault protects buyers and sellers with verified ownership and broker-supervised transfers.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/trust`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Trust", url: "/trust" }
        ])
      ]
    };
  }

  // 9. FAQ Page
  if (cleanPath === "/faq") {
    return {
      title: "Frequently Asked Questions — IDsvault Identity Desk",
      description: "Answers to common questions about buying, selling, legal frameworks, broker fees, transfer timelines, and refund guarantees.",
      canonical: "/faq",
      ogTitle: "Frequently Asked Questions — IDsvault",
      ogDescription: "Clear answers to questions regarding digital handle transactions and broker escrow in India.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/faq`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" }
        ])
      ]
    };
  }

  // 10. Contact Page
  if (cleanPath === "/contact") {
    return {
      title: "Contact IDsvault Broker Desk — Hyderabad, India",
      description: "Get in touch with Lead Broker Jogdhande Nikhil Patil via WhatsApp, email, or phone for handle inquiries, advisory, or deal coordination.",
      canonical: "/contact",
      ogTitle: "Contact IDsvault Broker Desk",
      ogDescription: "Direct contact options for our Hyderabad desk via WhatsApp (+91 93929 74031) and email (broker@idsvault.com).",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/contact`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" }
        ])
      ]
    };
  }

  // 10b. Commercial Landing Pages
  if (cleanPath === "/instagram-usernames" || cleanPath === "/buy-instagram-username-india") {
    return {
      title: "Buy Instagram Usernames in India — Verified Broker Desk | IDsvault",
      description: "Acquire premium Instagram usernames safely in India. Single words, 2-letter handles, and brandable keywords. Broker-held payment, ORE ownership audit, and live supervised transfer in Hyderabad.",
      canonical: "/instagram-usernames",
      ogTitle: "Buy Instagram Usernames in India — IDsvault Desk",
      ogDescription: "Verified Instagram handles with broker payment protection and live supervised transfer.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/instagram-usernames`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Buy Instagram Usernames India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Instagram Usernames", url: "/instagram-usernames" }
        ])
      ]
    };
  }

  if (cleanPath === "/x-usernames" || cleanPath === "/buy-x-username-india") {
    return {
      title: "Buy X (Twitter) Handles in India — Verified Broker Desk | IDsvault",
      description: "Acquire corporate and brandable X (Twitter) handles safely in India. Broker-verified ownership, broker-held payment protection, and live supervised transfer in Hyderabad.",
      canonical: "/x-usernames",
      ogTitle: "Buy X Handles in India — IDsvault Desk",
      ogDescription: "Corporate X handle sourcing and broker-escrow transfer in India.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/x-usernames`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Buy X Handles India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "X Usernames", url: "/x-usernames" }
        ])
      ]
    };
  }

  if (cleanPath === "/telegram-usernames" || cleanPath === "/buy-telegram-username-india") {
    return {
      title: "Buy Telegram Usernames in India — Verified Escrow Desk | IDsvault",
      description: "Acquire short and premium Telegram usernames in India with INR payment (UPI/NEFT). Broker-supervised release-and-claim and Fragment auction assistance from Hyderabad.",
      canonical: "/telegram-usernames",
      ogTitle: "Buy Telegram Usernames in India — IDsvault Desk",
      ogDescription: "Telegram handle acquisitions with INR payment protection and live transfer supervision.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/telegram-usernames`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Buy Telegram Usernames India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Telegram Usernames", url: "/telegram-usernames" }
        ])
      ]
    };
  }

  if (cleanPath === "/sell-instagram-username-india") {
    return {
      title: "Sell Instagram Username in India — Broker Valuation & Guaranteed Payout | IDsvault",
      description: "Sell your premium Instagram handle safely in India. Verified corporate buyers, broker-held buyer funds in INR (NEFT/RTGS), zero payment risk. Hyderabad desk.",
      canonical: "/sell-instagram-username-india",
      ogTitle: "Sell Instagram Username in India — IDsvault Desk",
      ogDescription: "Sell your handle with payment held in broker escrow before credential transfer.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/sell-instagram-username-india`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Sell Instagram Username India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Sell Instagram Username", url: "/sell-instagram-username-india" }
        ])
      ]
    };
  }

  if (cleanPath === "/username-valuation") {
    return {
      title: "Username Valuation & Handle Appraisal in India | IDsvault",
      description: "Calculate estimated valuation for Instagram, X, and Telegram usernames in Indian Rupees. Appraisal methodology based on character length, dictionary classification, and brandability.",
      canonical: "/username-valuation",
      ogTitle: "Username Valuation India — IDsvault Desk",
      ogDescription: "Social media handle appraisals and pricing benchmarks for Indian buyers and sellers.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/username-valuation`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Username Valuation India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Username Valuation", url: "/username-valuation" }
        ])
      ]
    };
  }

  if (cleanPath === "/digital-identity-broker") {
    return {
      title: "Digital Identity Broker India — Hyderabad Desk | IDsvault",
      description: "IDsvault is India's dedicated digital identity brokerage desk based in Hyderabad, Telangana. Lead Broker Jogdhande Nikhil Patil facilitates safe Instagram, X, and Telegram handle transfers.",
      canonical: "/digital-identity-broker",
      ogTitle: "Digital Identity Broker India — IDsvault Desk",
      ogDescription: "Dedicated digital identity broker in Hyderabad, Telangana.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/digital-identity-broker`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Digital Identity Broker India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Digital Identity Broker", url: "/digital-identity-broker" }
        ])
      ]
    };
  }

  if (cleanPath === "/premium-usernames" || cleanPath === "/brandable-usernames") {
    return {
      title: "Premium Usernames & Brandable Social Handles Marketplace India | IDsvault",
      description: "Explore premium social media usernames and brandable handles for sale in India. Instagram, X (Twitter), Telegram, and brandable domains with broker payment protection.",
      canonical: "/premium-usernames",
      ogTitle: "Premium Usernames India — IDsvault Desk",
      ogDescription: "Verified premium handles and brandable domains for Indian brands.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/premium-usernames`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: "Premium Usernames India",
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Premium Usernames", url: "/premium-usernames" }
        ])
      ]
    };
  }

  // 11. Regulatory & Policy Pages
  if (cleanPath.startsWith("/policy/")) {
    const seg = cleanPath.replace("/policy/", "");
    const segTitleMap: Record<string, string> = {
      terms: "Terms of Service & Broker Agreement",
      privacy: "Privacy Policy & DPDPA 2023 Compliance",
      refund: "Refund & Escrow Cancellation Guarantee",
      dispute: "Dispute Resolution & Arbitration Framework",
      "risk-disclosure": "Platform Risk & ToS Disclosure",
      "aml-kyc": "AML & KYC Compliance Policy",
      sanctions: "Sanctions & Prohibited Entities Policy",
      "cookie-policy": "Cookie & Tracking Policy",
      dmca: "IP & DMCA Takedown Policy",
      grievance: "Grievance Redressal Mechanism",
      accessibility: "Digital Accessibility Statement",
      imprint: "Legal Imprint & Desk Details",
      "acceptable-use": "Acceptable Use Policy",
      trademark: "Trademark & Intellectual Property Rights"
    };

    const displayTitle = segTitleMap[seg] || "Regulatory & Compliance Policy";

    return {
      title: `${displayTitle} — IDsvault`,
      description: `${displayTitle} governing digital identity transfers, broker escrow, and user rights on IDsvault.`,
      canonical: `/policy/${seg}`,
      ogTitle: `${displayTitle} — IDsvault`,
      ogDescription: `Official regulatory disclosure for ${displayTitle} on IDsvault.`,
      ogUrl: `${SITE_CONFIG.canonicalOrigin}/policy/${seg}`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      pageType: "website",
      structuredData: [
        buildBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Policies", url: "/policy/terms" },
          { name: displayTitle, url: `/policy/${seg}` }
        ])
      ]
    };
  }

  // 12. NOINDEX Routes (/admin, /keep, /404, or unknown)
  if (cleanPath === "/admin" || cleanPath === "/keep" || cleanPath === "/404") {
    return {
      title: cleanPath === "/admin" ? "Admin Desk — Restricted" : cleanPath === "/keep" ? "Keep Desk — System Log" : "Page Not Found (404)",
      description: "Restricted or internal system view.",
      canonical: cleanPath,
      ogTitle: "IDsvault Desk System",
      ogDescription: "System view.",
      ogUrl: `${SITE_CONFIG.canonicalOrigin}${cleanPath}`,
      ogImage: SITE_CONFIG.defaultOgImage,
      ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
      twitterCard: "summary_large_image",
      noindex: true,
      pageType: "website"
    };
  }

  // Fallback default
  return {
    title: "IDsvault — Digital Identity Broker Desk",
    description: SITE_CONFIG.description,
    canonical: cleanPath,
    ogTitle: SITE_CONFIG.name,
    ogDescription: SITE_CONFIG.description,
    ogUrl: `${SITE_CONFIG.canonicalOrigin}${cleanPath}`,
    ogImage: SITE_CONFIG.defaultOgImage,
    ogImageAlt: SITE_CONFIG.defaultOgImageAlt,
    twitterCard: "summary_large_image",
    pageType: "website"
  };
}

/** Get SEO Metadata for a specific Listing `/asset/:slug` */
export function getListingSEO(listing: Listing): SEOMetadata {
  const canonical = `/asset/${listing.slug}`;
  const isLive = listing.status === "LIVE";

  return {
    title: `Buy @${listing.username} on ${listing.platform} — Premium Handle`,
    description: `Acquire @${listing.username} on ${listing.platform}. ${listing.askingPrice > 0 ? `Asking price: ₹${listing.askingPrice.toLocaleString("en-IN")}. ` : ""}Broker-verified ownership, funds held in broker account, live transfer supervision.`,
    canonical,
    ogTitle: `@${listing.username} on ${listing.platform} — Available for Acquisition`,
    ogDescription: listing.description || `Premium ${listing.platform} handle @${listing.username} available via IDsvault.`,
    ogUrl: `${SITE_CONFIG.canonicalOrigin}${canonical}`,
    ogImage: SITE_CONFIG.defaultOgImage,
    ogImageAlt: `@${listing.username} on ${listing.platform} — IDsvault`,
    twitterCard: "summary_large_image",
    noindex: !isLive,
    pageType: "product",
    structuredData: [
      buildListingSchema(listing),
      buildBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Inventory", url: "/inventory" },
        { name: `@${listing.username}`, url: canonical }
      ])
    ]
  };
}

/** Get SEO Metadata for a specific Article `/journal/:slug` */
export function getArticleSEO(post: BlogPost): SEOMetadata {
  const canonical = `/journal/${post.slug}`;
  const isPublished = post.status === "published";

  const schemas: Array<Record<string, unknown>> = [
    buildArticleSchema(post),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Journal", url: "/journal" },
      { name: post.title, url: canonical }
    ])
  ];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push(buildFAQSchema(post.faqs));
  }

  return {
    title: post.metaTitle || `${post.title} — IDsvault Journal`,
    description: post.metaDescription || post.introduction || `Read ${post.title} on IDsvault.`,
    canonical,
    ogTitle: post.title,
    ogDescription: post.metaDescription || post.introduction,
    ogUrl: `${SITE_CONFIG.canonicalOrigin}${canonical}`,
    ogImage: SITE_CONFIG.defaultOgImage,
    ogImageAlt: post.title,
    twitterCard: "summary_large_image",
    noindex: !isPublished,
    pageType: "article",
    structuredData: schemas
  };
}
