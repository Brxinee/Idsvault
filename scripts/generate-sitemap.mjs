/**
 * Dynamic Sitemap Generator for IDsvault
 * Sources directly from src/data.ts and src/data/blogs.ts
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();

// Core pages
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/inventory", priority: "0.9", changefreq: "daily" },
  { url: "/sell", priority: "0.8", changefreq: "weekly" },
  { url: "/advisory", priority: "0.8", changefreq: "weekly" },
  { url: "/journal", priority: "0.8", changefreq: "weekly" },
  { url: "/faq", priority: "0.8", changefreq: "monthly" },
  { url: "/process", priority: "0.8", changefreq: "monthly" },
  { url: "/trust", priority: "0.8", changefreq: "monthly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/instagram-usernames", priority: "0.9", changefreq: "weekly" },
  { url: "/buy-instagram-username-india", priority: "0.9", changefreq: "weekly" },
  { url: "/x-usernames", priority: "0.9", changefreq: "weekly" },
  { url: "/buy-x-username-india", priority: "0.9", changefreq: "weekly" },
  { url: "/telegram-usernames", priority: "0.9", changefreq: "weekly" },
  { url: "/buy-telegram-username-india", priority: "0.9", changefreq: "weekly" },
  { url: "/sell-instagram-username-india", priority: "0.9", changefreq: "weekly" },
  { url: "/username-valuation", priority: "0.9", changefreq: "weekly" },
  { url: "/digital-identity-broker", priority: "0.9", changefreq: "weekly" },
  { url: "/premium-usernames", priority: "0.9", changefreq: "weekly" },
  { url: "/brandable-usernames", priority: "0.9", changefreq: "weekly" },
];

const policyPages = [
  "terms", "privacy", "refund", "dispute", "risk-disclosure", "aml-kyc",
  "sanctions", "cookie-policy", "dmca", "grievance", "accessibility",
  "imprint", "acceptable-use", "trademark"
].map(p => ({
  url: `/policy/${p}`,
  priority: "0.4",
  changefreq: "monthly"
}));

// Function to extract live listings from src/data.ts
function getLiveListings() {
  const dataPath = path.join(ROOT_DIR, "src", "data.ts");
  if (!fs.existsSync(dataPath)) return [];
  const content = fs.readFileSync(dataPath, "utf-8");

  // Parse object blocks in initialListings
  const listingBlocks = content.split(/\{\s*id:/g).slice(1);
  const liveListings = [];

  for (const block of listingBlocks) {
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const statusMatch = block.match(/status:\s*DealStatus\.([A-Za-z]+)/) || block.match(/status:\s*"([^"]+)"/);
    const dateMatch = block.match(/createdTime:\s*"([^"]+)"/);

    if (slugMatch) {
      const slug = slugMatch[1];
      const status = statusMatch ? statusMatch[1] : "Live";
      const createdTime = dateMatch ? dateMatch[1].split("T")[0] : "2026-05-31";

      // Only include Live listings
      if (status === "Live" || status === "LIVE") {
        liveListings.push({
          url: `/asset/${slug}`,
          lastmod: createdTime,
          priority: "0.7",
          changefreq: "weekly"
        });
      }
    }
  }

  return liveListings;
}

// Function to extract published blogs from src/data/blogs.ts
function getPublishedBlogs() {
  const blogPath = path.join(ROOT_DIR, "src", "data/blogs.ts");
  if (!fs.existsSync(blogPath)) return [];
  const content = fs.readFileSync(blogPath, "utf-8");

  const blogBlocks = content.split(/\{\s*id:/g).slice(1);
  const blogs = [];

  for (const block of blogBlocks) {
    const slugMatch = block.match(/slug:\s*"([^"]+)"/);
    const dateMatch = block.match(/publishedAt:\s*"([^"]+)"/);
    const statusMatch = block.match(/status:\s*"([^"]+)"/);

    if (slugMatch) {
      const slug = slugMatch[1];
      const publishedAt = dateMatch ? dateMatch[1] : "2026-05-20";
      const status = statusMatch ? statusMatch[1] : "published";

      if (status === "published") {
        blogs.push({
          url: `/journal/${slug}`,
          lastmod: publishedAt,
          priority: "0.7",
          changefreq: "monthly"
        });
      }
    }
  }

  return blogs;
}

export function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const listings = getLiveListings();
  const blogs = getPublishedBlogs();

  const allUrls = [
    ...staticPages.map(p => ({ ...p, lastmod: today })),
    ...listings,
    ...policyPages.map(p => ({ ...p, lastmod: "2026-05-31" })),
    ...blogs
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  for (const entry of allUrls) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const publicSitemapPath = path.join(ROOT_DIR, "public", "sitemap.xml");
  fs.writeFileSync(publicSitemapPath, xml, "utf-8");
  console.log(`✅ Generated public/sitemap.xml with ${allUrls.length} total URLs.`);

  const distDir = path.join(ROOT_DIR, "dist");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml, "utf-8");
    console.log(`✅ Copied sitemap.xml to dist/sitemap.xml.`);
  }
}

generateSitemap();
