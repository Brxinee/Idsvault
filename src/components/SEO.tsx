/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "../lib/siteConfig";
export { buildBreadcrumbSchema } from "../lib/seo";

export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  pageType?: "website" | "article" | "product";
  noindex?: boolean;
  /** Optional JSON-LD structured data — a single schema object or an array of them */
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  ogImage?: string;
  ogImageAlt?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = SITE_CONFIG.description,
  canonical,
  pageType = "website",
  noindex = false,
  structuredData,
  ogImage = SITE_CONFIG.defaultOgImage,
  ogImageAlt = SITE_CONFIG.defaultOgImageAlt,
}) => {
  // Always format title cleanly with business name appended if not already present
  const fullTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} — ${SITE_CONFIG.name}`;

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const canonicalPath = canonical ?? currentPath;
  const cleanCanonicalPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const canonicalHref = `${SITE_CONFIG.canonicalOrigin}${cleanCanonicalPath}`;

  const ogType = pageType === "article" ? "article" : "website";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalHref} />

      {/* Robots indexation rule */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalHref} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD Structured Data */}
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
