import fs from "fs";
import path from "path";

const BASE_URL = "https://idsvault.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const DIST_DIR = path.join(process.cwd(), "dist");

// Routes that intentionally resolve elsewhere and must never be submitted
// to Google as independent canonical URLs.
const aliasRoutes = new Set([
  "/buy-instagram-username-india",
  "/buy-x-username-india",
  "/buy-telegram-username-india",
  "/brandable-usernames"
]);

const policyPrefixes = ["/policy/"];

function isIndexableUrl(fullUrl: string): boolean {
  if (!fullUrl.startsWith(`${BASE_URL}/`) && fullUrl !== BASE_URL) return false;
  const pathname = new URL(fullUrl).pathname;
  if (aliasRoutes.has(pathname)) return false;
  if (policyPrefixes.some(prefix => pathname.startsWith(prefix))) return false;
  return true;
}

function filterSitemap(filePath: string): string {
  const xml = fs.readFileSync(filePath, "utf-8");
  const urls = Array.from(xml.matchAll(/<url>[\s\S]*?<loc>(.*?)<\/loc>[\s\S]*?<\/url>/g), match => match[0])
    .filter(block => {
      const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "";
      return isIndexableUrl(loc);
    });

  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const footer = '</urlset>\n';
  return header + (urls.length ? `${urls.join("\n")}\n` : "") + footer;
}

function writeChild(name: string): boolean {
  const publicPath = path.join(PUBLIC_DIR, name);
  const distPath = path.join(DIST_DIR, name);
  if (!fs.existsSync(publicPath)) return false;

  const filtered = filterSitemap(publicPath);
  if (!filtered.includes("<url>")) {
    if (fs.existsSync(publicPath)) fs.unlinkSync(publicPath);
    if (fs.existsSync(distPath)) fs.unlinkSync(distPath);
    return false;
  }

  fs.writeFileSync(publicPath, filtered, "utf-8");
  if (fs.existsSync(DIST_DIR)) fs.writeFileSync(distPath, filtered, "utf-8");
  return true;
}

function writeIndex(childNames: string[]) {
  const today = new Date().toISOString().split("T")[0];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...childNames.map(name => [
      "  <sitemap>",
      `    <loc>${BASE_URL}/${name}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      "  </sitemap>"
    ].join("\n")),
    "</sitemapindex>",
    ""
  ].join("\n");

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf-8");
  if (fs.existsSync(DIST_DIR)) fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
}

if (!fs.existsSync(PUBLIC_DIR)) throw new Error("public/ directory not found");

const candidateChildren = ["sitemap-pages.xml", "sitemap-listings.xml", "sitemap-journal.xml", "sitemap-policies.xml"];
const activeChildren = candidateChildren.filter(writeChild);
writeIndex(activeChildren);

console.log(`✅ Sitemap normalization complete: ${activeChildren.length} canonical child sitemaps.`);
