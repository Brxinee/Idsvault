/**
 * Route-level Static HTML Prerenderer for IDsvault
 * Generates SEO-ready static HTML files for every indexed public route in dist/
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");

// Load Site Config metadata manually or via simple constants
const SITE_NAME = "IDsvault";
const BROKER_EMAIL = "broker@idsvault.com";
const BROKER_PHONE = "+919392974031";

// Read live listings from src/data.ts
function getLiveListings() {
  const dataPath = path.join(ROOT_DIR, "src", "data.ts");
  if (!fs.existsSync(dataPath)) return [];
  const content = fs.readFileSync(dataPath, "utf-8");

  const blocks = content.split(/\{\s*id:/g).slice(1);
  const listings = [];

  for (const block of blocks) {
    const usernameMatch = block.match(/username:\s*"([^"]+)"/);
    const platformMatch = block.match(/platform:\s*Platform\.([A-Za-z]+)/) || block.match(/platform:\s*"([^"]+)"/);
    const priceMatch = block.match(/askingPrice:\s*(\d+)/);
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const descMatch = block.match(/description:\s*"([^"]+)"/);
    const statusMatch = block.match(/status:\s*DealStatus\.([A-Za-z]+)/) || block.match(/status:\s*"([^"]+)"/);

    if (usernameMatch && slugMatch) {
      const status = statusMatch ? statusMatch[1] : "Live";
      if (status === "Live" || status === "LIVE") {
        listings.push({
          username: usernameMatch[1],
          platform: platformMatch ? platformMatch[1] : "Instagram",
          askingPrice: priceMatch ? parseInt(priceMatch[1], 10) : 0,
          slug: slugMatch[1],
          description: descMatch ? descMatch[1] : ""
        });
      }
    }
  }
  return listings;
}

// Read published blog posts from src/data/blogs.ts
function getPublishedBlogs() {
  const blogPath = path.join(ROOT_DIR, "src", "data/blogs.ts");
  if (!fs.existsSync(blogPath)) return [];
  const content = fs.readFileSync(blogPath, "utf-8");

  const blocks = content.split(/\{\s*id:/g).slice(1);
  const blogs = [];

  for (const block of blocks) {
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const descMatch = block.match(/metaDescription:\s*"([^"]+)"/) || block.match(/introduction:\s*"([^"]+)"/);
    const statusMatch = block.match(/status:\s*"([^"]+)"/);
    const dateMatch = block.match(/publishedAt:\s*"([^"]+)"/);

    if (titleMatch && slugMatch) {
      const status = statusMatch ? statusMatch[1] : "published";
      if (status === "published") {
        blogs.push({
          title: titleMatch[1],
          slug: slugMatch[1],
          description: descMatch ? descMatch[1] : "",
          publishedAt: dateMatch ? dateMatch[1] : "2026-05-20"
        });
      }
    }
  }
  return blogs;
}

const policySlugs = [
  { slug: "terms", title: "Terms of Service & Broker Agreement" },
  { slug: "privacy", title: "Privacy Policy & DPDPA 2023 Compliance" },
  { slug: "refund", title: "Refund & Escrow Cancellation Guarantee" },
  { slug: "dispute", title: "Dispute Resolution & Arbitration Framework" },
  { slug: "risk-disclosure", title: "Platform Risk & ToS Disclosure" },
  { slug: "aml-kyc", title: "AML & KYC Compliance Policy" },
  { slug: "sanctions", title: "Sanctions & Prohibited Entities Policy" },
  { slug: "cookie-policy", title: "Cookie & Tracking Policy" },
  { slug: "dmca", title: "IP & DMCA Takedown Policy" },
  { slug: "grievance", title: "Grievance Redressal Mechanism" },
  { slug: "accessibility", title: "Digital Accessibility Statement" },
  { slug: "imprint", title: "Legal Imprint & Desk Details" },
  { slug: "acceptable-use", title: "Acceptable Use Policy" },
  { slug: "trademark", title: "Trademark & Intellectual Property Rights" }
];

export function prerender() {
  const indexTemplatePath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexTemplatePath)) {
    console.error("❌ dist/index.html not found. Run vite build first.");
    return;
  }

  const template = fs.readFileSync(indexTemplatePath, "utf-8");

  const listings = getLiveListings();
  const blogs = getPublishedBlogs();

  const routesToPrerender = [
    {
      route: "/",
      title: "IDsvault — Digital Identity Advisory & Transfer Desk | Hyderabad, India",
      description: "India's broker-advised digital identity desk. Buy or sell premium Instagram usernames, X (Twitter) handles, Telegram usernames, and brandable domains. Broker-held payment & live transfer. Hyderabad, Telangana.",
      h1: "Buy the handle. Skip the scam.",
      bodyHtml: `
        <header style="padding:16px;border-bottom:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
          <a href="/" style="color:#fff;font-weight:bold;text-decoration:none;font-size:20px;">IDsvault</a>
          <nav style="display:flex;gap:16px;">
            <a href="/inventory" style="color:#aaa;text-decoration:none;">Inventory</a>
            <a href="/sell" style="color:#aaa;text-decoration:none;">Sell</a>
            <a href="/advisory" style="color:#aaa;text-decoration:none;">Advisory</a>
            <a href="/journal" style="color:#aaa;text-decoration:none;">Journal</a>
            <a href="/about" style="color:#aaa;text-decoration:none;">About</a>
            <a href="/process" style="color:#aaa;text-decoration:none;">Process</a>
            <a href="/trust" style="color:#aaa;text-decoration:none;">Trust</a>
            <a href="/contact" style="color:#aaa;text-decoration:none;">Contact</a>
          </nav>
        </header>
        <main style="max-width:1200px;margin:0 auto;padding:48px 24px;">
          <h1 style="font-size:48px;font-weight:800;margin-bottom:16px;color:#fff;">Buy the handle. Skip the scam.</h1>
          <p style="font-size:18px;color:#999;max-width:600px;line-height:1.6;margin-bottom:32px;">
            Broker-verified Instagram, X, and Telegram usernames. Your money stays with the broker until the transfer is done — on a live call, with both parties present.
          </p>
          <div style="display:flex;gap:16px;margin-bottom:48px;">
            <a href="/inventory" style="padding:12px 24px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;">Browse Handles</a>
            <a href="/sell" style="padding:12px 24px;background:#222;color:#fff;text-decoration:none;border-radius:8px;border:1px solid #333;">Sell Yours</a>
          </div>
          <section style="margin-top:64px;">
            <h2 style="font-size:24px;color:#fff;margin-bottom:24px;">Featured Live Listings</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:24px;">
              ${listings.slice(0, 6).map(l => `
                <div style="padding:20px;background:#111;border:1px solid #222;border-radius:12px;">
                  <span style="font-size:12px;color:#3b82f6;text-transform:uppercase;">${l.platform}</span>
                  <h3 style="font-size:20px;margin:8px 0;color:#fff;"><a href="/asset/${l.slug}" style="color:#fff;text-decoration:none;">@${l.username}</a></h3>
                  <p style="font-size:14px;color:#888;margin-bottom:12px;">Asking: ₹${l.askingPrice.toLocaleString('en-IN')}</p>
                  <a href="/asset/${l.slug}" style="font-size:13px;color:#3b82f6;text-decoration:none;">View Listing &rarr;</a>
                </div>
              `).join('')}
            </div>
          </section>
        </main>
      `
    },
    {
      route: "/inventory",
      title: "Premium Username & Domain Registry — Live Inventory | IDsvault",
      description: "Browse verified, broker-held Telegram usernames, Instagram handles, X usernames, and brandable domains available for secure transfer in India.",
      h1: "Verified Digital Identity Registry",
      bodyHtml: `
        <main style="max-width:1200px;margin:0 auto;padding:48px 24px;">
          <h1 style="font-size:36px;font-weight:800;color:#fff;margin-bottom:16px;">Verified Digital Identity Registry</h1>
          <p style="color:#999;font-size:16px;margin-bottom:32px;">Browse broker-verified handles available for secure, supervised transfer in India.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:24px;">
            ${listings.map(l => `
              <article style="padding:24px;background:#111;border:1px solid #222;border-radius:12px;">
                <span style="font-size:11px;color:#10b981;font-weight:bold;text-transform:uppercase;">${l.platform}</span>
                <h2 style="font-size:24px;color:#fff;margin:8px 0;"><a href="/asset/${l.slug}" style="color:#fff;text-decoration:none;">@${l.username}</a></h2>
                <p style="font-size:13px;color:#888;line-height:1.5;">${l.description}</p>
                <div style="margin-top:16px;padding-top:16px;border-top:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-size:16px;font-weight:bold;color:#10b981;">₹${l.askingPrice.toLocaleString('en-IN')}</span>
                  <a href="/asset/${l.slug}" style="padding:8px 16px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:6px;font-size:12px;font-weight:bold;">View Asset</a>
                </div>
              </article>
            `).join('')}
          </div>
        </main>
      `
    },
    {
      route: "/sell",
      title: "Sell Your Premium Username or Domain — Broker Valuation | IDsvault",
      description: "Submit your premium Telegram username, Instagram handle, X handle, or brandable domain to IDsvault. Verified ownership, broker escrow, INR payout.",
      h1: "Sell Your Premium Handle or Domain",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Sell Your Premium Handle or Domain</h1><p style="color:#999;">Submit your username or domain name for private broker evaluation and valuation in Hyderabad, India.</p></main>`
    },
    {
      route: "/advisory",
      title: "Private Handle Sourcing & Identity Advisory | IDsvault",
      description: "Request off-market acquisition or private brokerage for target Instagram, X, Telegram usernames, or brandable domains in India.",
      h1: "Private Identity Sourcing Desk",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Private Identity Sourcing Desk</h1><p style="color:#999;">Commission our Hyderabad desk for off-market acquisition of target social handles and domains.</p></main>`
    },
    {
      route: "/journal",
      title: "Digital Identity Journal & Market Intelligence | IDsvault",
      description: "Expert guides, legal frameworks, pricing benchmarks, and safety protocols for buying, selling, and transferring social usernames and domains in India.",
      h1: "Digital Identity Journal",
      bodyHtml: `
        <main style="max-width:1200px;margin:0 auto;padding:48px 24px;">
          <h1 style="font-size:36px;font-weight:800;color:#fff;margin-bottom:16px;">Digital Identity Journal</h1>
          <p style="color:#999;font-size:16px;margin-bottom:32px;">Market intelligence, pricing analysis, and legal frameworks for digital identity transactions in India.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:24px;">
            ${blogs.map(b => `
              <article style="padding:24px;background:#111;border:1px solid #222;border-radius:12px;">
                <span style="font-size:11px;color:#888;">${b.publishedAt}</span>
                <h2 style="font-size:20px;color:#fff;margin:8px 0;"><a href="/journal/${b.slug}" style="color:#fff;text-decoration:none;">${b.title}</a></h2>
                <p style="font-size:13px;color:#888;line-height:1.5;">${b.description.slice(0, 140)}...</p>
                <a href="/journal/${b.slug}" style="display:inline-block;margin-top:12px;color:#3b82f6;text-decoration:none;font-size:13px;font-weight:bold;">Read Article &rarr;</a>
              </article>
            `).join('')}
          </div>
        </main>
      `
    },
    {
      route: "/instagram-usernames",
      title: "Buy Instagram Usernames in India — Verified Broker Desk | IDsvault",
      description: "Acquire premium Instagram usernames safely in India. Single words, 2-letter handles, and brandable keywords. Broker-held payment, ORE ownership audit, and live supervised transfer in Hyderabad.",
      h1: "Buy Premium Instagram Usernames in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium Instagram Usernames in India</h1><p style="color:#aaa;">Broker-supervised Instagram handle acquisition desk in Hyderabad. ORE ownership verification, broker-held payment in INR, and live supervised transfer calls.</p></main>`
    },
    {
      route: "/buy-instagram-username-india",
      title: "Buy Instagram Usernames in India — Verified Broker Desk | IDsvault",
      description: "Acquire premium Instagram usernames safely in India. Single words, 2-letter handles, and brandable keywords. Broker-held payment, ORE ownership audit, and live supervised transfer in Hyderabad.",
      h1: "Buy Premium Instagram Usernames in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium Instagram Usernames in India</h1><p style="color:#aaa;">Broker-supervised Instagram handle acquisition desk in Hyderabad.</p></main>`
    },
    {
      route: "/x-usernames",
      title: "Buy X (Twitter) Handles in India — Verified Broker Desk | IDsvault",
      description: "Acquire corporate and brandable X (Twitter) handles safely in India. Broker-verified ownership, broker-held payment protection, and live supervised transfer in Hyderabad.",
      h1: "Buy Premium X (Twitter) Handles in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium X (Twitter) Handles in India</h1><p style="color:#aaa;">Broker-supervised X handle acquisition desk in Hyderabad.</p></main>`
    },
    {
      route: "/buy-x-username-india",
      title: "Buy X (Twitter) Handles in India — Verified Broker Desk | IDsvault",
      description: "Acquire corporate and brandable X (Twitter) handles safely in India. Broker-verified ownership, broker-held payment protection, and live supervised transfer in Hyderabad.",
      h1: "Buy Premium X (Twitter) Handles in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium X (Twitter) Handles in India</h1><p style="color:#aaa;">Broker-supervised X handle acquisition desk in Hyderabad.</p></main>`
    },
    {
      route: "/telegram-usernames",
      title: "Buy Telegram Usernames in India — Verified Escrow Desk | IDsvault",
      description: "Acquire short and premium Telegram usernames in India with INR payment (UPI/NEFT). Broker-supervised release-and-claim and Fragment auction assistance from Hyderabad.",
      h1: "Buy Premium Telegram Usernames in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium Telegram Usernames in India</h1><p style="color:#aaa;">Broker-supervised Telegram username acquisition desk in Hyderabad.</p></main>`
    },
    {
      route: "/buy-telegram-username-india",
      title: "Buy Telegram Usernames in India — Verified Escrow Desk | IDsvault",
      description: "Acquire short and premium Telegram usernames in India with INR payment (UPI/NEFT). Broker-supervised release-and-claim and Fragment auction assistance from Hyderabad.",
      h1: "Buy Premium Telegram Usernames in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Buy Premium Telegram Usernames in India</h1><p style="color:#aaa;">Broker-supervised Telegram username acquisition desk in Hyderabad.</p></main>`
    },
    {
      route: "/sell-instagram-username-india",
      title: "Sell Instagram Username in India — Broker Valuation & Guaranteed Payout | IDsvault",
      description: "Sell your premium Instagram handle safely in India. Verified corporate buyers, broker-held buyer funds in INR (NEFT/RTGS), zero payment risk. Hyderabad desk.",
      h1: "Sell Your Instagram Username in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Sell Your Instagram Username in India</h1><p style="color:#aaa;">Divest premium handles to verified corporate buyers with broker payment protection.</p></main>`
    },
    {
      route: "/username-valuation",
      title: "Username Valuation & Handle Appraisal in India | IDsvault",
      description: "Calculate estimated valuation for Instagram, X, and Telegram usernames in Indian Rupees. Appraisal methodology based on character length, dictionary classification, and brandability.",
      h1: "Username Valuation & Appraisal in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Username Valuation & Appraisal in India</h1><p style="color:#aaa;">Determine fair market value of social media handles based on current transaction benchmarks in India.</p></main>`
    },
    {
      route: "/digital-identity-broker",
      title: "Digital Identity Broker India — Hyderabad Desk | IDsvault",
      description: "IDsvault is India's dedicated digital identity brokerage desk based in Hyderabad, Telangana. Lead Broker Jogdhande Nikhil Patil facilitates safe Instagram, X, and Telegram handle transfers.",
      h1: "India's Dedicated Digital Identity Broker Desk",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">India's Dedicated Digital Identity Broker Desk</h1><p style="color:#aaa;">IDsvault is a Hyderabad-based advisory desk led by Lead Broker Jogdhande Nikhil Patil.</p></main>`
    },
    {
      route: "/premium-usernames",
      title: "Premium Usernames & Brandable Social Handles Marketplace India | IDsvault",
      description: "Explore premium social media usernames and brandable handles for sale in India. Instagram, X (Twitter), Telegram, and brandable domains with broker payment protection.",
      h1: "Premium Usernames & Brandable Handles in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Premium Usernames & Brandable Handles in India</h1><p style="color:#aaa;">Verified digital identity asset directory for Indian brands and founders.</p></main>`
    },
    {
      route: "/brandable-usernames",
      title: "Premium Usernames & Brandable Social Handles Marketplace India | IDsvault",
      description: "Explore premium social media usernames and brandable handles for sale in India. Instagram, X (Twitter), Telegram, and brandable domains with broker payment protection.",
      h1: "Premium Usernames & Brandable Handles in India",
      bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Premium Usernames & Brandable Handles in India</h1><p style="color:#aaa;">Verified digital identity asset directory for Indian brands and founders.</p></main>`
    },
    {
      route: "/about",
      title: "About IDsvault — Hyderabad Digital Identity Broker Desk",
      description: "Learn about IDsvault, India's solo-operated digital identity desk led by broker Jogdhande Nikhil Patil in Hyderabad, Telangana.",
      h1: "About IDsvault Desk",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">About IDsvault Desk</h1><p style="color:#999;">One named broker. Every deal. Personally handled by Jogdhande Nikhil Patil in Hyderabad, Telangana, India.</p></main>`
    },
    {
      route: "/process",
      title: "How Handle Transfers Work — 5-Step Broker Protocol | IDsvault",
      description: "Understand our step-by-step broker-supervised transfer process: verification, broker account deposit, live handover call, credential sanitization, and payout.",
      h1: "5-Step Broker Transfer Protocol",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">5-Step Broker Transfer Protocol</h1><p style="color:#999;">Step-by-step breakdown of our live supervised call transfer process.</p></main>`
    },
    {
      route: "/trust",
      title: "Trust & Safety Framework — IDsvault Accountability",
      description: "Our security promises: broker-held funds, live-call transfer supervision, named broker accountability, and full refund policy.",
      h1: "Trust & Safety Commitments",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Trust & Safety Commitments</h1><p style="color:#999;">Full accountability, broker-held payment, and verified ownership protocols.</p></main>`
    },
    {
      route: "/faq",
      title: "Frequently Asked Questions — IDsvault Identity Desk",
      description: "Answers to common questions about buying, selling, legal frameworks, broker fees, transfer timelines, and refund guarantees.",
      h1: "Frequently Asked Questions",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Frequently Asked Questions</h1><p style="color:#999;">Find answers to common questions about buying and selling digital handles in India.</p></main>`
    },
    {
      route: "/contact",
      title: "Contact IDsvault Broker Desk — Hyderabad, India",
      description: "Get in touch with Lead Broker Jogdhande Nikhil Patil via WhatsApp, email, or phone for handle inquiries, advisory, or deal coordination.",
      h1: "Contact IDsvault Desk",
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">Contact IDsvault Desk</h1><p style="color:#999;">Email: broker@idsvault.com | WhatsApp: +91 93929 74031 | Hyderabad, Telangana.</p></main>`
    },
    {
      route: "/404",
      title: "Page Not Found (404) | IDsvault",
      description: "The requested digital identity resource or route could not be found on IDsvault.",
      h1: "HTTP 404 — Page Not Found",
      noindex: true,
      bodyHtml: `<main style="max-width:600px;margin:0 auto;padding:64px 24px;text-align:center;"><h1 style="color:#fff;">Looking for a handle or record?</h1><p style="color:#999;">The page or route you followed doesn't exist on IDsvault.</p><a href="/inventory" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:8px;">Browse Inventory</a></main>`
    }
  ];

  // Add policy pages
  for (const pol of policySlugs) {
    routesToPrerender.push({
      route: `/policy/${pol.slug}`,
      title: `${pol.title} | IDsvault`,
      description: `${pol.title} governing digital identity transfers and user rights on IDsvault.`,
      h1: pol.title,
      bodyHtml: `<main style="max-width:800px;margin:0 auto;padding:48px 24px;"><h1 style="color:#fff;">${pol.title}</h1><p style="color:#999;">Official regulatory disclosure for ${pol.title} at IDsvault.</p></main>`
    });
  }

  // Add listing pages
  for (const l of listings) {
    routesToPrerender.push({
      route: `/asset/${l.slug}`,
      title: `Buy @${l.username} on ${l.platform} — Premium Handle | IDsvault`,
      description: `Acquire @${l.username} on ${l.platform}. Asking price: ₹${l.askingPrice.toLocaleString('en-IN')}. Broker-verified ownership, funds held by broker, live transfer supervision.`,
      h1: `@${l.username} on ${l.platform}`,
      bodyHtml: `
        <main style="max-width:1000px;margin:0 auto;padding:48px 24px;">
          <a href="/inventory" style="color:#3b82f6;text-decoration:none;font-size:14px;">&larr; Back to Inventory</a>
          <h1 style="font-size:48px;font-weight:800;color:#fff;margin:16px 0;">@${l.username}</h1>
          <p style="font-size:18px;color:#10b981;font-weight:bold;margin-bottom:24px;">Platform: ${l.platform} | Asking Price: ₹${l.askingPrice.toLocaleString('en-IN')}</p>
          <div style="padding:24px;background:#111;border:1px solid #222;border-radius:12px;margin-bottom:32px;">
            <h2 style="color:#fff;font-size:18px;margin-bottom:8px;">Broker Assessment & Description</h2>
            <p style="color:#ccc;line-height:1.6;">${l.description}</p>
          </div>
          <a href="https://wa.me/919392974031?text=Hi%20IDsvault%2C%20I%20want%20to%20buy%20%40${l.username}" style="padding:14px 28px;background:#25D366;color:#000;font-weight:bold;text-decoration:none;border-radius:8px;display:inline-block;">Discuss Purchase on WhatsApp</a>
        </main>
      `
    });
  }

  // Add blog post pages
  for (const b of blogs) {
    routesToPrerender.push({
      route: `/journal/${b.slug}`,
      title: `${b.title} | IDsvault Journal`,
      description: b.description,
      h1: b.title,
      bodyHtml: `
        <main style="max-width:800px;margin:0 auto;padding:48px 24px;">
          <a href="/journal" style="color:#3b82f6;text-decoration:none;font-size:14px;">&larr; Back to Journal</a>
          <h1 style="font-size:36px;font-weight:800;color:#fff;margin:24px 0 12px 0;line-height:1.2;">${b.title}</h1>
          <p style="font-size:14px;color:#888;margin-bottom:24px;">Published on ${b.publishedAt} by Jogdhande Nikhil Patil</p>
          <div style="font-size:16px;color:#ddd;line-height:1.8;">
            <p>${b.description}</p>
          </div>
        </main>
      `
    });
  }

  let prerenderedCount = 0;

  for (const item of routesToPrerender) {
    const canonicalHref = `${BASE_URL}${item.route === "/" ? "" : item.route}`;

    let html = template;

    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeXml(item.title)}</title>`);

    // Replace description meta
    html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeXml(item.description)}" />`);

    // Replace canonical link
    html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonicalHref}" />`);

    // Replace robots if noindex
    if (item.noindex) {
      html = html.replace(/<meta name="robots" content=".*?" \/>/s, `<meta name="robots" content="noindex, nofollow" />`);
    } else {
      html = html.replace(/<meta name="robots" content=".*?" \/>/s, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
    }

    // Replace Open Graph tags
    html = html.replace(/<meta property="og:title"\s+content=".*?" \/>/s, `<meta property="og:title" content="${escapeXml(item.title)}" />`);
    html = html.replace(/<meta property="og:description"\s+content=".*?" \/>/s, `<meta property="og:description" content="${escapeXml(item.description)}" />`);
    html = html.replace(/<meta property="og:url"\s+content=".*?" \/>/s, `<meta property="og:url" content="${canonicalHref}" />`);

    // Inject static body content inside <div id="root">
    html = html.replace('<div id="root"></div>', `<div id="root">${item.bodyHtml}</div>`);

    // Determine target file path
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

function escapeXml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

prerender();
