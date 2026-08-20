import fs from "fs";
import path from "path";
import { initialListings } from "../src/data.ts";
import { initialBlogPosts } from "../src/data/blogs.ts";
import { DealStatus } from "../src/types.ts";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();

// Core pages
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily", lastmod: "2026-08-20" },
  { url: "/inventory", priority: "0.9", changefreq: "daily", lastmod: "2026-08-20" },
  { url: "/sell", priority: "0.8", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/advisory", priority: "0.8", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/journal", priority: "0.8", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/faq", priority: "0.8", changefreq: "monthly", lastmod: "2026-08-20" },
  { url: "/process", priority: "0.8", changefreq: "monthly", lastmod: "2026-08-20" },
  { url: "/trust", priority: "0.8", changefreq: "monthly", lastmod: "2026-08-20" },
  { url: "/about", priority: "0.7", changefreq: "monthly", lastmod: "2026-08-20" },
  { url: "/contact", priority: "0.7", changefreq: "monthly", lastmod: "2026-08-20" },
  { url: "/instagram-usernames", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/buy-instagram-username-india", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/x-usernames", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/buy-x-username-india", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/telegram-usernames", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/buy-telegram-username-india", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/sell-instagram-username-india", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/username-valuation", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/digital-identity-broker", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/premium-usernames", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" },
  { url: "/brandable-usernames", priority: "0.9", changefreq: "weekly", lastmod: "2026-08-20" }
];

const policyPages = [
  "terms", "privacy", "refund", "dispute", "risk-disclosure", "aml-kyc",
  "sanctions", "cookie-policy", "dmca", "grievance", "accessibility",
  "imprint", "acceptable-use", "trademark"
].map(p => ({
  url: `/policy/${p}`,
  priority: "0.4",
  changefreq: "monthly",
  lastmod: "2026-08-20"
}));

function getLiveListings() {
  return initialListings
    .filter(l => l.status === DealStatus.Live)
    .map(l => ({
      url: `/asset/${l.slug}`,
      lastmod: l.createdTime.split("T")[0],
      priority: "0.7",
      changefreq: "weekly"
    }));
}

function getPublishedBlogs() {
  return initialBlogPosts
    .filter(b => b.status === "published")
    .map(b => ({
      url: `/journal/${b.slug}`,
      lastmod: b.publishedAt.split("T")[0],
      priority: "0.7",
      changefreq: "monthly"
    }));
}

function buildSitemapXml(urls: { url: string; lastmod?: string; changefreq?: string; priority?: string }[]) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const entry of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${entry.url}</loc>\n`;
    if (entry.lastmod) xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    if (entry.changefreq) xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    if (entry.priority) xml += `    <priority>${entry.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  xml += `</urlset>\n`;
  return xml;
}

function buildSitemapIndexXml(sitemaps: { url: string; lastmod: string }[]) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const entry of sitemaps) {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${BASE_URL}${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }
  xml += `</sitemapindex>\n`;
  return xml;
}

export function generateSitemap() {
  const listings = getLiveListings();
  const blogs = getPublishedBlogs();
  const today = new Date().toISOString().split("T")[0];

  const sitemaps = [
    { name: "sitemap-pages.xml", urls: staticPages },
    { name: "sitemap-listings.xml", urls: listings },
    { name: "sitemap-journal.xml", urls: blogs },
    { name: "sitemap-policies.xml", urls: policyPages }
  ];

  const indexEntries = [];

  const publicDir = path.join(ROOT_DIR, "public");
  const distDir = path.join(ROOT_DIR, "dist");

  // Create child sitemaps
  for (const sitemap of sitemaps) {
    if (sitemap.urls.length === 0) continue;
    const xml = buildSitemapXml(sitemap.urls);
    
    fs.writeFileSync(path.join(publicDir, sitemap.name), xml, "utf-8");
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, sitemap.name), xml, "utf-8");
    }
    
    indexEntries.push({
      url: `/${sitemap.name}`,
      lastmod: today
    });
    console.log(`✅ Generated ${sitemap.name} with ${sitemap.urls.length} URLs.`);
  }

  // Create sitemap index
  const indexXml = buildSitemapIndexXml(indexEntries);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), indexXml, "utf-8");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), indexXml, "utf-8");
  }
  console.log(`✅ Generated sitemap.xml index with ${indexEntries.length} sitemaps.`);
}

generateSitemap();
