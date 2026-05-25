import React, { useEffect } from "react";
import { Listing } from "../types";

interface SchemaMarkupProps {
  view: string;
  activeListing?: Listing | null;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ view, activeListing }) => {
  useEffect(() => {
    // Clean up existing dynamic LD-JSON blocks
    const existingScripts = document.querySelectorAll(".dynamic-schema-ld");
    existingScripts.forEach((script) => script.remove());

    const schemas: any[] = [];

    // 1. Breadcrumb List Schema
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://idsvault.com"
        }
      ]
    };

    if (view === "browse") {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Premium Handle Inventory",
        "item": "https://idsvault.com/inventory"
      });
    } else if (view === "listing-detail" && activeListing) {
      breadcrumbs.itemListElement.push(
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Inventory",
          "item": "https://idsvault.com/inventory"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `@${activeListing.username} Sourcing`,
          "item": `https://idsvault.com/handle/${activeListing.slug}`
        }
      );
    } else if (view === "sell") {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Sell Premium Handle",
        "item": "https://idsvault.com/sell"
      });
    } else if (view === "request") {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Sourcing Campaigns",
        "item": "https://idsvault.com/request"
      });
    } else if (view === "blog") {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Strategy Library",
        "item": "https://idsvault.com/blog"
      });
    } else if (view === "contact") {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Connect Desk",
        "item": "https://idsvault.com/contact"
      });
    }
    schemas.push(breadcrumbs);

    // 2. Conditional schemas
    if (view === "home" || view === "about" || view === "contact") {
      // Organization and FinancialService details
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "IDsvault Hyderabad",
        "alternateName": "IDsvault Digital Handle Brokerage",
        "url": "https://idsvault.com",
        "logo": "https://idsvault.com/logo.png",
        "description": "Premium digital identity and social namespace brokerage desk based in Hyderabad, India. Specializing in high-value verified transfers for brands, creators, and resellers.",
        "telephone": "+919392974031",
        "email": "broker@idsvault.com",
        "priceRange": "₹₹₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hi-Tech City, Madhapur",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500081",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "17.4483",
          "longitude": "78.3741"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        }
      });

      // FAQ Page Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where to buy high-value Instagram usernames safely in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The safest method is through a dedicated Hyderabad-based digital broker like IDsvault. We execute deep verification audits of the account registration lineage, safeguard payment inside a segregated broker account, and coordinate the active transfer live with full contract execution."
            }
          },
          {
            "@type": "Question",
            "name": "Is buying and selling social media handles legal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While social platform Terms of Service (ToS) restrict the unauthorized commercial trade of handles, administrative assignment contracts for intangible digital branding assets are standard commercial practices. IDsvault operates on-desk human supervision to legally transition administrative controls without platform reset risks."
            }
          },
          {
            "@type": "Question",
            "name": "How does the IDsvault broker-held payment work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Buyers send payment to IDsvault's designated broker trust account. We securely hold the funds separate from operations. Only once both parties attend the live handover call and the buyer confirms full admin custody do we release the payout to the verified seller."
            }
          }
        ]
      });
    }

    if (view === "listing-detail" && activeListing) {
      // Product schema for specific listings
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `@${activeListing.username} Sourcing and Verification`,
        "image": "https://idsvault.com/cover.png",
        "description": `Vetted and audited premium digital handle @${activeListing.username} on ${activeListing.platform.toUpperCase()}. Sourced with clean administrative origin records.`,
        "sku": activeListing.id,
        "offers": {
          "@type": "Offer",
          "url": `https://idsvault.com/handle/${activeListing.slug}`,
          "priceCurrency": "INR",
          "price": activeListing.askingPrice || 500000,
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": activeListing.askingPrice || 500000,
            "priceCurrency": "INR",
            "valueAddedTaxIncluded": "true"
          },
          "itemCondition": "https://schema.org/UsedCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "IDsvault"
          }
        }
      });
    }

    // Inject generated schemas into the head
    schemas.forEach((schemaObj, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.className = "dynamic-schema-ld";
      script.id = `jsonld-dynamic-${index}`;
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [view, activeListing]);

  return null; // Side-effect only component
};
