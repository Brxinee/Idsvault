/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  /** Optional JSON-LD structured data — a single schema object or an array of them */
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_NAME = "IDsvault";
const SITE_URL  = "https://idsvault.com";
const OG_IMAGE  = `${SITE_URL}/cover.png`;

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, structuredData }) => {
  const fullTitle       = `${title} — ${SITE_NAME}`;
  const canonicalHref   = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:type"        content="website" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* JSON-LD */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
