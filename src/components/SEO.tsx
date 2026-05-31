/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Helmet } from "react-helmet-async";

type PageType = "website" | "article" | "product";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  pageType?: PageType;
  /** Optional JSON-LD structured data — a single schema object or an array of them */
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_NAME = "IDsvault";
const SITE_URL  = "https://idsvault.com";
const OG_IMAGE  = `${SITE_URL}/cover.png`;
const OG_ALT    = "IDsvault — Digital Identity Broker, Hyderabad India";

/** Build a BreadcrumbList JSON-LD object for any inner page. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`,
    })),
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  pageType = "website",
  structuredData,
}) => {
  const fullTitle     = `${title} — ${SITE_NAME}`;
  const canonicalHref = canonical ? `${SITE_URL}${canonical}` : undefined;
  const ogType        = pageType === "article" ? "article" : pageType === "product" ? "website" : "website";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* Open Graph */}
      <meta property="og:type"         content={ogType} />
      <meta property="og:title"        content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:image"        content={OG_IMAGE} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"    content={OG_ALT} />
      <meta property="og:locale"       content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image"       content={OG_IMAGE} />
      <meta name="twitter:image:alt"   content={OG_ALT} />

      {/* JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : structuredData
          )}
        </script>
      )}
    </Helmet>
  );
};
