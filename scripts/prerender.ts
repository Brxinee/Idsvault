import fs from "fs";
import path from "path";
import { initialListings } from "../src/data.ts";
import { initialBlogPosts } from "../src/data/blogs.ts";
import { DealStatus } from "../src/types.ts";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");

function escapeXml(str: string | undefined): string {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    console.error("❌ index.html not found in dist/. Run vite build first.");
    process.exit(1);
  }

  const template = fs.readFileSync(indexHtmlPath, "utf-8");
  
  const liveListings = initialListings.filter(l => l.status === DealStatus.Live);
  const publishedBlogs = initialBlogPosts.filter(b => b.status === "published");

  const policySlugs = [
    { slug: "terms", title: "Terms of Service" },
    { slug: "privacy", title: "Privacy Policy" },
    { slug: "refund", title: "Refund Policy" },
    { slug: "dispute", title: "Dispute Resolution Policy" },
    { slug: "risk-disclosure", title: "Risk Disclosure" },
    { slug: "aml-kyc", title: "AML / KYC Policy" },
    { slug: "sanctions", title: "Sanctions Policy" },
    { slug: "cookie-policy", title: "Cookie Policy" },
    { slug: "dmca", title: "DMCA Policy" },
    { slug: "grievance", title: "Grievance Redressal" },
    { slug: "accessibility", title: "Accessibility" },
    { slug: "imprint", title: "Legal Imprint" },
    { slug: "acceptable-use", title: "Acceptable Use Policy" },
    { slug: "trademark", title: "Trademark Policy" }
  ];

  const routesToPrerender = [
    {
      route: "/",
      title: "IDsvault | Premium Digital Identity Broker & Marketplace",
      description: "Buy and sell premium Instagram, X (Twitter), and Telegram usernames. India's trusted digital identity broker ensuring safe, Escrow-backed transfers.",
      bodyHtml: `<main><h1>Premium Digital Identity Broker & Marketplace</h1></main>`
    },
    {
      route: "/inventory",
      title: "Browse Premium Usernames | IDsvault Inventory",
      description: "Explore our curated marketplace of premium, short, and brandable social media handles.",
      bodyHtml: `<main><h1>Browse Premium Usernames</h1></main>`
    },
    {
      route: "/sell",
      title: "Sell Your Premium Username | IDsvault",
      description: "List your valuable social media handles safely with IDsvault's fully managed broker service.",
      bodyHtml: `<main><h1>Sell Your Premium Username</h1></main>`
    },
    {
      route: "/advisory",
      title: "Private Username Sourcing & Advisory | IDsvault",
      description: "Hire our expert brokers to negotiate and acquire off-market digital identities for your brand.",
      bodyHtml: `<main><h1>Private Username Sourcing & Advisory</h1></main>`
    },
    {
      route: "/journal",
      title: "IDsvault Journal — Insights on Digital Identity",
      description: "Market reports, security guides, and insights on the secondary market for premium usernames.",
      bodyHtml: `<main><h1>IDsvault Journal</h1></main>`
    },
    {
      route: "/instagram-usernames",
      title: "Buy Premium Instagram Usernames in India | IDsvault",
      description: "Secure, short, and highly brandable Instagram handles for Indian businesses and creators.",
      bodyHtml: `<main><h1>Buy Premium Instagram Usernames in India</h1></main>`
    },
    {
      route: "/buy-instagram-username-india",
      title: "How to Buy an Instagram Username in India Safely | IDsvault",
      description: "The complete guide to safely purchasing Instagram handles in India using IDsvault.",
      bodyHtml: `<main><h1>How to Buy an Instagram Username in India Safely</h1></main>`
    },
    {
      route: "/x-usernames",
      title: "Buy Premium X (Twitter) Handles in India | IDsvault",
      description: "Premium X (Twitter) handles for web3, startups, and personal brands.",
      bodyHtml: `<main><h1>Buy Premium X (Twitter) Handles in India</h1></main>`
    },
    {
      route: "/buy-x-username-india",
      title: "How to Buy an X (Twitter) Username in India | IDsvault",
      description: "Step-by-step process for acquiring premium X handles securely.",
      bodyHtml: `<main><h1>How to Buy an X (Twitter) Username in India</h1></main>`
    },
    {
      route: "/telegram-usernames",
      title: "Buy Premium Telegram Usernames in India | IDsvault",
      description: "Rare and brandable Telegram usernames for channels and communities.",
      bodyHtml: `<main><h1>Buy Premium Telegram Usernames in India</h1></main>`
    },
    {
      route: "/buy-telegram-username-india",
      title: "How to Buy a Telegram Username in India | IDsvault",
      description: "Secure escrow transfer process for acquiring Telegram handles.",
      bodyHtml: `<main><h1>How to Buy a Telegram Username in India</h1></main>`
    },
    {
      route: "/sell-instagram-username-india",
      title: "Sell Your Instagram Username Safely in India | IDsvault",
      description: "Cash out your valuable Instagram handles securely through IDsvault broker services.",
      bodyHtml: `<main><h1>Sell Your Instagram Username Safely in India</h1></main>`
    },
    {
      route: "/username-valuation",
      title: "Free Username Valuation Calculator | IDsvault",
      description: "Calculate the market value of your premium social media handles.",
      bodyHtml: `<main><h1>Free Username Valuation Calculator</h1></main>`
    },
    {
      route: "/digital-identity-broker",
      title: "Digital Identity Broker Services | IDsvault",
      description: "Professional brokering and escrow for high-value digital asset transfers.",
      bodyHtml: `<main><h1>Digital Identity Broker Services</h1></main>`
    },
    {
      route: "/premium-usernames",
      title: "Premium Usernames & Handles Marketplace | IDsvault",
      description: "Discover ultra-rare, OG, and premium handles.",
      bodyHtml: `<main><h1>Premium Usernames & Handles Marketplace</h1></main>`
    },
    {
      route: "/brandable-usernames",
      title: "Brandable Social Media Usernames | IDsvault",
      description: "Find the perfect brandable handle for your next startup or project.",
      bodyHtml: `<main><h1>Brandable Social Media Usernames</h1></main>`
    },
    {
      route: "/about",
      title: "About IDsvault | India's Digital Identity Broker",
      description: "Learn about IDsvault, our broker team, and our mission to secure the secondary market for digital identities.",
      bodyHtml: `<main><h1>About IDsvault</h1></main>`
    },
    {
      route: "/process",
      title: "How Handle Transfers Work — 5-Step Broker Protocol | IDsvault",
      description: "Understand our step-by-step broker-supervised transfer process.",
      bodyHtml: `<main><h1>5-Step Broker Transfer Protocol</h1></main>`
    },
    {
      route: "/trust",
      title: "Trust & Safety Framework — IDsvault Accountability",
      description: "Our security promises: broker-held funds, live-call transfer supervision.",
      bodyHtml: `<main><h1>Trust & Safety Commitments</h1></main>`
    },
    {
      route: "/faq",
      title: "Frequently Asked Questions — IDsvault Identity Desk",
      description: "Answers to common questions about buying, selling, and broker fees.",
      bodyHtml: `<main><h1>Frequently Asked Questions</h1></main>`
    },
    {
      route: "/contact",
      title: "Contact IDsvault Broker Desk — Hyderabad, India",
      description: "Get in touch with Lead Broker Jogdhande Nikhil Patil.",
      bodyHtml: `<main><h1>Contact IDsvault Desk</h1></main>`
    },
    {
      route: "/404",
      title: "Page Not Found (404) | IDsvault",
      description: "The requested digital identity resource or route could not be found.",
      noindex: true,
      bodyHtml: `<main><h1>HTTP 404 — Page Not Found</h1></main>`
    }
  ];

  // Add policy pages
  for (const pol of policySlugs) {
    routesToPrerender.push({
      route: `/policy/${pol.slug}`,
      title: `${pol.title} | IDsvault`,
      description: `${pol.title} governing digital identity transfers on IDsvault.`,
      bodyHtml: `<main><h1>${pol.title}</h1></main>`
    });
  }

  // Add listing pages
  for (const l of liveListings) {
    routesToPrerender.push({
      route: `/asset/${l.slug}`,
      title: `Buy @${l.username} on ${l.platform} — Premium Handle | IDsvault`,
      description: `Acquire @${l.username} on ${l.platform}. Broker-verified ownership.`,
      bodyHtml: `<main><h1>@${l.username}</h1></main>`
    });
  }

  // Add blog pages
  for (const b of publishedBlogs) {
    routesToPrerender.push({
      route: `/journal/${b.slug}`,
      title: `${b.title} | IDsvault Journal`,
      description: b.metaDescription || "IDsvault Journal Article",
      bodyHtml: `<main><h1>${b.title}</h1></main>`
    });
  }

  let prerenderedCount = 0;

  for (const item of routesToPrerender) {
    const canonicalHref = `${BASE_URL}${item.route}`;
    let html = template;

    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeXml(item.title)}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeXml(item.description)}" />`);
    
    // Some routes might not have a canonical link in index.html, so let's safely insert or replace
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonicalHref}" />`);
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${canonicalHref}" />\n</head>`);
    }

    if (item.noindex) {
      if (html.includes('<meta name="robots"')) {
        html = html.replace(/<meta name="robots" content=".*?" \/>/s, `<meta name="robots" content="noindex, nofollow" />`);
      } else {
        html = html.replace('</head>', `  <meta name="robots" content="noindex, nofollow" />\n</head>`);
      }
    } else {
      if (html.includes('<meta name="robots"')) {
        html = html.replace(/<meta name="robots" content=".*?" \/>/s, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
      } else {
        html = html.replace('</head>', `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />\n</head>`);
      }
    }

    html = html.replace('<div id="root"></div>', `<div id="root">${item.bodyHtml}</div>`);

    let targetFilePath;
    if (item.route === "/") {
      targetFilePath = path.join(DIST_DIR, "index.html");
    } else if (item.route === "/404") {
      targetFilePath = path.join(DIST_DIR, "404.html");
    } else {
      const routeDir = path.join(DIST_DIR, item.route.startsWith("/") ? item.route.slice(1) : item.route);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFilePath = path.join(routeDir, "index.html");
    }

    fs.writeFileSync(targetFilePath, html, "utf-8");
    prerenderedCount++;
  }

  console.log(`✅ Successfully prerendered ${prerenderedCount} static HTML pages in dist/!`);
}

prerender();
