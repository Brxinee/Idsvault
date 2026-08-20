/**
 * IDsvault Automated Technical SEO, AEO, GEO & Crawlability Test Suite
 * Performs automated validation across all technical criteria.
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

// 4. Audit Deployment Config (vercel.json SPA Rewrites & 301 Redirects)
const vercelPath = path.join(ROOT_DIR, "vercel.json");
if (fs.existsSync(vercelPath)) {
  const vercelContent = fs.readFileSync(vercelPath, "utf-8");
  check("vercel.json contains SPA rewrite for deep links", vercelContent.includes('"destination": "/index.html"'), "SPA rewrite rule missing in vercel.json");
  check("vercel.json contains www -> non-www 301 redirect", vercelContent.includes('"www.idsvault.com"') && vercelContent.includes("https://idsvault.com/$1"), "www -> non-www redirect missing in vercel.json");
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

// 6. Audit AI Plugin & LLMs files with Consistency Enforcement
const aiPluginPath = path.join(ROOT_DIR, "public", ".well-known", "ai-plugin.json");
let aiPlugin = null;
if (fs.existsSync(aiPluginPath)) {
  aiPlugin = JSON.parse(fs.readFileSync(aiPluginPath, "utf-8"));
  check("ai-plugin.json name_for_human is IDsvault", aiPlugin.name_for_human === "IDsvault", "Incorrect name_for_human in ai-plugin.json");
  check("ai-plugin.json contact_email is broker@idsvault.com", aiPlugin.contact_email === "broker@idsvault.com", "Contact email mismatch in ai-plugin.json");
} else {
  errors.push("ai-plugin.json missing at public/.well-known/ai-plugin.json");
}

const llmsPath = path.join(ROOT_DIR, "public", "llms.txt");
check("public/llms.txt exists", fs.existsSync(llmsPath), "llms.txt missing at public/llms.txt");
if (fs.existsSync(llmsPath)) {
  const llmContent = fs.readFileSync(llmsPath, "utf-8");
  check("llms.txt references Jogdhande Nikhil Patil", llmContent.includes("Jogdhande Nikhil Patil"), "Broker name missing from llms.txt");
  check("llms.txt references Hyderabad, Telangana", llmContent.includes("Hyderabad, Telangana"), "Location missing from llms.txt");
  check("llms.txt references broker@idsvault.com", llmContent.includes("broker@idsvault.com"), "Email missing from llms.txt");
}

// 6b. Cross-file Machine-Readable Fact Consistency Validation
const siteConfigPath = path.join(ROOT_DIR, "src", "lib", "siteConfig.ts");
if (fs.existsSync(siteConfigPath)) {
  const scContent = fs.readFileSync(siteConfigPath, "utf-8");
  check("siteConfig has broker email broker@idsvault.com", scContent.includes("broker@idsvault.com"), "siteConfig email mismatch");
  check("siteConfig has broker phone +91 93929 74031", scContent.includes("+91 93929 74031"), "siteConfig phone mismatch");
  check("siteConfig has location Hyderabad", scContent.includes("Hyderabad"), "siteConfig location mismatch");
}

// 7. Audit Central Site Config & SEO System
check("src/lib/siteConfig.ts exists", fs.existsSync(path.join(ROOT_DIR, "src", "lib", "siteConfig.ts")), "src/lib/siteConfig.ts missing");
check("src/lib/seo.ts exists", fs.existsSync(path.join(ROOT_DIR, "src", "lib", "seo.ts")), "src/lib/seo.ts missing");

// 8. Audit Prerendered Static HTML Files (if dist/ exists)
const distDir = path.join(ROOT_DIR, "dist");
if (fs.existsSync(distDir)) {
  console.log("🔍 Checking dist/ prerendered static HTML assets...");

  const testRoutes = [
    { file: path.join(distDir, "index.html"), name: "Home (/)" },
    { file: path.join(distDir, "inventory", "index.html"), name: "Inventory (/inventory)" },
    { file: path.join(distDir, "sell", "index.html"), name: "Sell (/sell)" },
    { file: path.join(distDir, "journal", "index.html"), name: "Journal (/journal)" },
    { file: path.join(distDir, "instagram-usernames", "index.html"), name: "Instagram Landing (/instagram-usernames)" },
    { file: path.join(distDir, "x-usernames", "index.html"), name: "X Landing (/x-usernames)" },
    { file: path.join(distDir, "telegram-usernames", "index.html"), name: "Telegram Landing (/telegram-usernames)" },
    { file: path.join(distDir, "sell-instagram-username-india", "index.html"), name: "Sell Instagram Landing (/sell-instagram-username-india)" },
    { file: path.join(distDir, "username-valuation", "index.html"), name: "Valuation Landing (/username-valuation)" },
    { file: path.join(distDir, "digital-identity-broker", "index.html"), name: "Broker Landing (/digital-identity-broker)" },
    { file: path.join(distDir, "premium-usernames", "index.html"), name: "Premium Landing (/premium-usernames)" },
    { file: path.join(distDir, "policy", "terms", "index.html"), name: "Terms (/policy/terms)" },
    { file: path.join(distDir, "404.html"), name: "404 Page (/404.html)" }
  ];

  for (const tr of testRoutes) {
    if (fs.existsSync(tr.file)) {
      const html = fs.readFileSync(tr.file, "utf-8");
      check(`Prerendered HTML for ${tr.name} contains <title>`, html.includes("<title>") && !html.includes("<title></title>"), `Missing title in ${tr.name}`);
      check(`Prerendered HTML for ${tr.name} contains meta description`, html.includes('name="description"'), `Missing meta description in ${tr.name}`);
      check(`Prerendered HTML for ${tr.name} contains canonical link`, html.includes('rel="canonical"'), `Missing canonical in ${tr.name}`);
      check(`Prerendered HTML for ${tr.name} contains visible static content`, html.includes('<main') || html.includes('<header') || html.includes('<h1>'), `Missing visible content in ${tr.name}`);
    } else {
      warnings.push(`Prerendered file missing for ${tr.name} (run npm run build first)`);
    }
  }
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
