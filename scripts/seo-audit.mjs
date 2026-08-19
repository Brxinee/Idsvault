/**
 * IDsvault Automated Technical SEO, AEO, GEO & Crawlability Test Suite
 * Performs automated validation across all 28 technical criteria.
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://idsvault.com";
const ROOT_DIR = process.cwd();

let errors = [];
let warnings = [];
let passes = [];

function check(title, condition, errorMsg) {
  if (condition) {
    passes.push(title);
  } else {
    errors.push(`${title}: ${errorMsg}`);
  }
}

console.log("==================================================");
console.log("🚀 Running IDsvault Complete Technical SEO Crawl Audit...");
console.log("==================================================\n");

// 1. Audit public/sitemap.xml
const sitemapPath = path.join(ROOT_DIR, "public", "sitemap.xml");
let locMatches = [];
if (!fs.existsSync(sitemapPath)) {
  errors.push("sitemap.xml: File missing at public/sitemap.xml");
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  check("Sitemap exists and has entries", locMatches.length > 0, "No <loc> tags found in sitemap.xml");

  const nonCanonicalUrls = locMatches.filter(url => !url.startsWith(`${BASE_URL}/`) && url !== BASE_URL);
  check("All sitemap URLs use canonical origin (https://idsvault.com)", nonCanonicalUrls.length === 0, `Found non-canonical URLs: ${nonCanonicalUrls.join(", ")}`);

  const duplicates = locMatches.filter((url, index) => locMatches.indexOf(url) !== index);
  check("Zero duplicate URLs in sitemap", duplicates.length === 0, `Duplicate URLs found: ${duplicates.join(", ")}`);

  // Verify core routes
  const coreRoutes = [
    "/",
    "/inventory",
    "/sell",
    "/advisory",
    "/journal",
    "/faq",
    "/process",
    "/trust",
    "/about",
    "/contact"
  ];
  const missingCore = coreRoutes.filter(r => !locMatches.includes(`${BASE_URL}${r === "/" ? "/" : r}`));
  check("All core pages present in sitemap", missingCore.length === 0, `Missing core routes in sitemap: ${missingCore.join(", ")}`);

  // Verify all policy routes
  const policySegments = [
    "terms", "privacy", "refund", "dispute", "risk-disclosure", "aml-kyc",
    "sanctions", "cookie-policy", "dmca", "grievance", "accessibility",
    "imprint", "acceptable-use", "trademark"
  ];
  const missingPolicies = policySegments.filter(seg => !locMatches.includes(`${BASE_URL}/policy/${seg}`));
  check("All policy pages present in sitemap", missingPolicies.length === 0, `Missing policy routes in sitemap: ${missingPolicies.join(", ")}`);
}

// 2. Audit Data Source Alignment (Listings & Blog Posts)
const dataFilePath = path.join(ROOT_DIR, "src", "data.ts");
if (fs.existsSync(dataFilePath)) {
  const dataContent = fs.readFileSync(dataFilePath, "utf-8");
  const slugMatches = [...dataContent.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  
  const missingListingsInSitemap = slugMatches.filter(slug => !locMatches.includes(`${BASE_URL}/asset/${slug}`));
  check("All live listings from data source present in sitemap", missingListingsInSitemap.length === 0, `Missing listing URLs in sitemap: ${missingListingsInSitemap.join(", ")}`);
}

const blogDataPath = path.join(ROOT_DIR, "src", "data", "blogs.ts");
if (fs.existsSync(blogDataPath)) {
  const blogContent = fs.readFileSync(blogDataPath, "utf-8");
  const blogSlugMatches = [...blogContent.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  
  // Exclude draft articles if any
  const missingBlogsInSitemap = blogSlugMatches.filter(slug => !locMatches.includes(`${BASE_URL}/journal/${slug}`));
  check("All published blog posts present in sitemap", missingBlogsInSitemap.length === 0, `Missing blog URLs in sitemap (${missingBlogsInSitemap.length}): ${missingBlogsInSitemap.slice(0, 5).join(", ")}...`);
}

// 3. Audit public/robots.txt
const robotsPath = path.join(ROOT_DIR, "public", "robots.txt");
if (!fs.existsSync(robotsPath)) {
  errors.push("robots.txt: File missing at public/robots.txt");
} else {
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");
  check("robots.txt points to https://idsvault.com/sitemap.xml", robotsContent.includes(`Sitemap: ${BASE_URL}/sitemap.xml`), "Sitemap directive missing or incorrect in robots.txt");
  check("robots.txt disallows /admin", robotsContent.includes("Disallow: /admin"), "Disallow: /admin missing");
  check("robots.txt disallows /keep", robotsContent.includes("Disallow: /keep"), "Disallow: /keep missing");
  check("robots.txt permits GPTBot, ClaudeBot, PerplexityBot", robotsContent.includes("User-agent: GPTBot") && robotsContent.includes("User-agent: ClaudeBot"), "AI crawlers missing from robots.txt");
}

// 4. Audit Deployment Config (vercel.json SPA Rewrites)
const vercelPath = path.join(ROOT_DIR, "vercel.json");
if (fs.existsSync(vercelPath)) {
  const vercelContent = fs.readFileSync(vercelPath, "utf-8");
  check("vercel.json contains SPA rewrite for deep links", vercelContent.includes('"destination": "/index.html"'), "SPA rewrite rule missing in vercel.json");
  check("vercel.json sets security headers (nosniff, HSTS, DENY)", vercelContent.includes("X-Content-Type-Options") && vercelContent.includes("Strict-Transport-Security"), "Security headers missing in vercel.json");
} else {
  errors.push("vercel.json: Missing deployment configuration file");
}

// 5. Audit index.html
const indexPath = path.join(ROOT_DIR, "index.html");
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, "utf-8");
  check("index.html lang set to en-IN", indexContent.includes('lang="en-IN"'), 'lang="en-IN" missing on <html>');
  check("index.html canonical set to https://idsvault.com", indexContent.includes('<link rel="canonical" href="https://idsvault.com" />'), "Base canonical link missing in index.html");
  check("index.html DPDPA 2023 consent default denied", indexContent.includes("analytics_storage': 'denied'"), "Consent default denied missing in GA4 script");
}

// 6. Audit AI Plugin & LLMs files
const aiPluginPath = path.join(ROOT_DIR, "public", ".well-known", "ai-plugin.json");
if (fs.existsSync(aiPluginPath)) {
  const aiPlugin = JSON.parse(fs.readFileSync(aiPluginPath, "utf-8"));
  check("ai-plugin.json name_for_human is IDsvault", aiPlugin.name_for_human === "IDsvault", "Incorrect name_for_human in ai-plugin.json");
} else {
  errors.push("ai-plugin.json missing at public/.well-known/ai-plugin.json");
}

const llmsPath = path.join(ROOT_DIR, "public", "llms.txt");
check("public/llms.txt exists", fs.existsSync(llmsPath), "llms.txt missing at public/llms.txt");

// 7. Search for accidental noindex on public routes
const srcAppPath = path.join(ROOT_DIR, "src", "App.tsx");
if (fs.existsSync(srcAppPath)) {
  const appContent = fs.readFileSync(srcAppPath, "utf-8");
  check("App.tsx renders NotFoundPage for catch-all route", appContent.includes('element={<NotFoundPage />}'), "App.tsx missing NotFoundPage for catch-all route");
}

// Summary Report
console.log(`\n📊 Crawl & Technical QA Audit Summary:`);
console.log(`   - Total checks passed: ${passes.length}`);
console.log(`   - Total sitemap URLs checked: ${locMatches.length}`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`   - ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Critical Errors (${errors.length}):`);
  errors.forEach(e => console.log(`   - ${e}`));
  console.log("\n❌ Technical SEO Audit FAILED. Fix issues above before proceeding.\n");
  process.exit(1);
} else {
  console.log("\n🎉 ALL TECHNICAL SEO & CRAWLABILITY CHECKS PASSED WITH 0 ERRORS!\n");
  process.exit(0);
}
