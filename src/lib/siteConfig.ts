/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SITE_CONFIG = {
  name: "IDsvault",
  legalName: "IDsvault Digital Identity Desk",
  tagline: "Digital Identity Advisory & Transfer Desk",
  domain: "https://idsvault.com",
  canonicalOrigin: "https://idsvault.com",
  description: "India's broker-advised digital identity facilitation desk. Buy or sell premium Instagram usernames, X handles, Telegram usernames, and brandable domains. Broker-supervised live transfer, broker-held payment, full refund guarantee. Based in Hyderabad, Telangana.",
  defaultKeywords: [
    "buy instagram username india",
    "buy telegram username india",
    "sell premium domain india",
    "x twitter handle broker india",
    "digital identity broker hyderabad",
    "premium username marketplace india",
    "buy handles safe india"
  ].join(", "),
  defaultOgImage: "https://idsvault.com/cover.png",
  defaultOgImageAlt: "IDsvault — Digital Identity Broker, Hyderabad India",
  locale: "en_IN",
  language: "en-IN",
  broker: {
    name: "Jogdhande Nikhil Patil",
    title: "Lead Identity Broker & Founder",
    email: "broker@idsvault.com",
    phone: "+919392974031",
    whatsapp: "919392974031",
    whatsappFormatted: "+91 93929 74031"
  },
  location: {
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
    countryName: "India",
    latitude: 17.3850,
    longitude: 78.4867
  },
  socials: {
    whatsapp: "https://wa.me/919392974031"
  },
  supportedPlatforms: ["Telegram", "Instagram", "X (Twitter)", "Domains"]
} as const;
