import fs from "fs";
import path from "path";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");

let errors: string[] = [];
let warnings: string[] = [];
let passes: string[] = [];

function check(title: string, condition: boolean, errorMsg: string) {
  if (condition) {
    passes.push(title);
  } else {
    errors.push(`${title}: ${errorMsg}`);
  }
}

function extractMatches(regex: RegExp, text: string) {
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

console.log("==================================================");
console.log("🚀 Running IDsvault Comprehensive SEO & Sitemap Validation...");
console.log("==================================================\n");

if (!fs.existsSync(DIST_DIR)) {
  console.log("❌ dist/ directory not found. Please run 'npm run build' first.");
  process.exit(1);
}

// 1. Audit Sitemap Index
const indexSitemapPath = path.join(DIST_DIR, "sitemap.xml");
check("Master sitemap.xml exists", fs.existsSync(indexSitemapPath), "Missing sitemap.xml in dist/");

let childSitemaps: string[] = [];
if (fs.existsSync(indexSitemapPath)) {
  const indexContent = fs.readFileSync(indexSitemapPath, "utf-8");
  check("Master sitemap is valid XML", indexContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), "Missing XML declaration");
  check("Master sitemap has sitemapindex tag", indexContent.includes('<sitemapindex'), "Missing sitemapindex root tag");

  childSitemaps = extractMatches(/<loc>.*?\/([^/]+\.xml)<\/loc>/g, indexContent);
  check("Master sitemap references child sitemaps", childSitemaps.length > 0, "No child sitemaps found in index");
}

let allUrls: string[] = [];
let urlToSitemap: Record<string, string> = {};

for (const child of childSitemaps) {
  const childPath = path.join(DIST_DIR, child);
  const exists = fs.existsSync(childPath);
  check(`Child sitemap ${child} exists`, exists, `Referenced child sitemap missing: ${child}`);

  if (exists) {
    const childContent = fs.readFileSync(childPath, "utf-8");
    check(`${child} is valid XML`, childContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), "Missing XML declaration");
    check(`${child} has urlset tag`, childContent.includes('<urlset'), "Missing urlset root tag");

    const locs = extractMatches(/<loc>(.*?)<\/loc>/g, childContent);
    const nonCanonicalUrls = locs.filter(url => !url.startsWith(`${BASE_URL}/`) && url !== BASE_URL);
    check(`${child} URLs use canonical origin`, nonCanonicalUrls.length === 0, `Non-canonical URLs: ${nonCanonicalUrls.join(", ")}`);
    
    const trailingSlashes = locs.filter(url => url !== BASE_URL && url !== `${BASE_URL}/` && url.endsWith("/"));
    check(`${child} URLs have no trailing slash`, trailingSlashes.length === 0, `Trailing slash found: ${trailingSlashes.join(", ")}`);

    for (const url of locs) {
      if (urlToSitemap[url]) {
        errors.push(`Duplicate URL found in sitemaps: ${url} (in ${child} and ${urlToSitemap[url]})`);
      } else {
        urlToSitemap[url] = child;
        allUrls.push(url);
      }
    }
  }
}

// Ensure static public inventory match
const coreRoutes = [
  "/", "/inventory", "/sell", "/advisory", "/journal", "/faq", 
  "/process", "/trust", "/about", "/contact",
  "/instagram-usernames", "/buy-instagram-username-india",
  "/x-usernames", "/buy-x-username-india",
  "/telegram-usernames", "/buy-telegram-username-india",
  "/sell-instagram-username-india", "/username-valuation",
  "/digital-identity-broker", "/premium-usernames", "/brandable-usernames"
];

for (const route of coreRoutes) {
  const expectedUrl = `${BASE_URL}${route}`;
  check(`Core route in sitemap: ${route}`, allUrls.includes(expectedUrl), `Missing from sitemaps: ${expectedUrl}`);
}

// Audit generated HTML files
let missingTitles = 0;
let missingDescriptions = 0;
let canonicalMismatches = 0;
let noindexConflicts = 0;
let missingHtmlFiles = 0;
let notFoundPages = 0;

console.log("\n🔍 Checking prerendered static HTML assets...");

for (const url of allUrls) {
  // Convert URL to local path
  let relativePath = url.replace(BASE_URL, "");
  if (relativePath === "" || relativePath === "/") {
    relativePath = "/index.html";
  } else {
    relativePath = `${relativePath}/index.html`;
  }
  
  const htmlPath = path.join(DIST_DIR, relativePath);
  
  if (!fs.existsSync(htmlPath)) {
    missingHtmlFiles++;
    errors.push(`Missing HTML file for sitemap URL: ${url} (Expected: ${htmlPath})`);
    continue;
  }
  
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  
  if (htmlContent.includes("404 - Not Found") || htmlContent.includes('<title>404</title>')) {
    notFoundPages++;
    errors.push(`Sitemap URL resolves to 404 page: ${url}`);
  }
  
  if (!htmlContent.includes("<title>") || htmlContent.includes("<title></title>")) {
    missingTitles++;
    errors.push(`Missing title: ${url}`);
  }
  
  if (!htmlContent.includes('name="description"')) {
    missingDescriptions++;
    errors.push(`Missing meta description: ${url}`);
  }
  
  const canonicalMatch = htmlContent.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  if (!canonicalMatch) {
    canonicalMismatches++;
    errors.push(`Missing canonical tag: ${url}`);
  } else if (canonicalMatch[1] !== url) {
    canonicalMismatches++;
    errors.push(`Canonical mismatch for ${url}. Sitemap says ${url}, page says ${canonicalMatch[1]}`);
  }
  
  if (htmlContent.includes('content="noindex"') || htmlContent.includes('content="none"')) {
    noindexConflicts++;
    errors.push(`Noindex conflict: ${url} is in sitemap but contains noindex directive`);
  }
}

// 3. Audit robots.txt
const robotsPath = path.join(DIST_DIR, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  errors.push("robots.txt: File missing at dist/robots.txt");
} else {
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");
  check("robots.txt points to https://idsvault.com/sitemap.xml", robotsContent.includes(`Sitemap: ${BASE_URL}/sitemap.xml`), "Sitemap directive missing or incorrect in robots.txt");
  check("robots.txt disallows /admin", robotsContent.includes("Disallow: /admin"), "Disallow: /admin missing");
  check("robots.txt disallows /keep", robotsContent.includes("Disallow: /keep"), "Disallow: /keep missing");
}

console.log(`\n📊 IDsvault Sitemap Health`);
console.log(`-----------------------`);
console.log(`Indexable URLs (Checked): ${allUrls.length}`);
console.log(`Missing HTML files: ${missingHtmlFiles}`);
console.log(`Non-indexable sitemap URLs (noindex): ${noindexConflicts}`);
console.log(`404 sitemap URLs: ${notFoundPages}`);
console.log(`Canonical mismatches: ${canonicalMismatches}`);
console.log(`Missing titles: ${missingTitles}`);
console.log(`Missing descriptions: ${missingDescriptions}`);
console.log(`Total tests passed: ${passes.length}`);

if (errors.length > 0) {
  console.log(`\n❌ Critical Errors (${errors.length}):`);
  errors.forEach(e => console.log(`   - ${e}`));
  console.log("\nRESULT: FAIL\n");
  process.exit(1);
} else {
  console.log("\n🎉 RESULT: PASS\n");
  process.exit(0);
}
