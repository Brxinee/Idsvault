/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Reusable SEO head manager — sets <title>, meta description, Open Graph tags,
 * and injects JSON-LD structured data via react-helmet-async.
 *
 * Usage:
 *   <SEO
 *     title="Browse Handles"
 *     description="Browse verified Instagram, X, and Telegram handles for sale."
 *     canonical="/browse"
 *     structuredData={{ "@context": "...", "@type": "..." }}
 *   />
 */

import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL         = "https://idsvault.com";
const BASE_TITLE       = "IDsvault — Buy & Sell Premium Usernames | Instagram, X, Telegram";
const BASE_DESCRIPTION = "Buy or sell premium Instagram handles, X usernames, and Telegram channels through IDsvault — India's broker-assisted marketplace. Payment held in escrow. Hyderabad desk.";
const OG_IMAGE         = "https://idsvault.com/cover.png";

interface SEOProps {
  /** Short page name — rendered as "{title} — IDsvault". Omit for homepage. */
  title?: string;
  description?: string;
  /** Path only, e.g. "/browse". Defaults to current path. */
  canonical?: string;
  /** Override OG title when it should differ from <title>. */
  ogTitle?: string;
  /** Override OG description. */
  ogDescription?: string;
  /** One or more Schema.org objects to inject as JSON-LD. */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = BASE_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  structuredData,
}) => {
  const fullTitle = title ? `${title} — IDsvault` : BASE_TITLE;
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDesc  = ogDescription ?? description;
  const canonicalUrl    = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const ldBlocks = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"       content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content="IDsvault" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* JSON-LD structured data */}
      {ldBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};
