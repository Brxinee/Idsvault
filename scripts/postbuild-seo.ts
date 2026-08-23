import fs from "fs";
import path from "path";
import { initialBlogPosts } from "../src/data/blogs.ts";
import { initialListings } from "../src/data.ts";
import { DealStatus, BlogPost, BlogSection } from "../src/types.ts";
import { SITE_CONFIG } from "../src/lib/siteConfig.ts";
import { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema, getPageSEO } from "../src/lib/seo.ts";

const BASE_URL = SITE_CONFIG.canonicalOrigin;
const DIST_DIR = path.join(process.cwd(), "dist");

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function renderSection(section: BlogSection, index: number): string {
  switch (section.type) {
    case "heading2":
      return `<h2 id="section-${index}">${escapeHtml(section.content)}</h2>`;
    case "heading3":
      return `<h3>${escapeHtml(section.content)}</h3>`;
    case "paragraph":
      return `<p>${escapeHtml(section.content)}</p>`;
    case "quote":
      return `<blockquote>${escapeHtml(section.content)}</blockquote>`;
    case "list":
      return `<ul>${(section.items ?? []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    case "table": {
      const head = (section.columns ?? []).map(column => `<th>${escapeHtml(column)}</th>`).join("");
      const rows = (section.rows ?? []).map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
      return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "cta":
      return `<aside><strong>${escapeHtml(section.content)}</strong>${section.subtitle ? `<p>${escapeHtml(section.subtitle)}</p>` : ""}</aside>`;
    default:
      return "";
  }
}

function renderBlog(post: BlogPost): string {
  const related = post.relatedSlugs
    .map(slug => initialBlogPosts.find(candidate => candidate.slug === slug && candidate.status === "published"))
    .filter(Boolean)
    .slice(0, 3) as BlogPost[];

  const articleSchema = buildArticleSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Journal", url: "/journal" },
    { name: post.title, url: `/journal/${post.slug}` }
  ]);
  const faqSchema = post.faqs.length > 0 ? buildFAQSchema(post.faqs) : null;

  return `
    <article class="seo-prerender article-content">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/journal">Journal</a> / <span>${escapeHtml(post.title)}</span></nav>
      <header>
        <p>${escapeHtml(post.category)}</p>
        <h1>${escapeHtml(post.title)}</h1>
        <p>By ${escapeHtml(post.author.name)} · ${escapeHtml(post.author.role)} · ${escapeHtml(post.publishedAt)} · ${escapeHtml(post.readTime)}</p>
      </header>
      <p class="lead">${escapeHtml(post.introduction)}</p>
      ${post.directAnswer ? `<aside class="direct-answer"><strong>Direct answer</strong><p>${escapeHtml(post.directAnswer)}</p></aside>` : ""}
      <div class="article-sections">
        ${post.sections.map((section, index) => renderSection(section, index)).join("\n")}
      </div>
      ${post.faqs.length > 0 ? `
        <section id="faq">
          <h2>Frequently asked questions</h2>
          ${post.faqs.map(faq => `<div><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`).join("\n")}
        </section>` : ""}
      ${related.length > 0 ? `
        <nav aria-label="Related articles">
          <h2>Related articles</h2>
          <ul>${related.map(item => `<li><a href="/journal/${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a></li>`).join("")}</ul>
        </nav>` : ""}
    </article>
    <script type="application/ld+json">${escapeJsonForHtml(articleSchema)}</script>
    <script type="application/ld+json">${escapeJsonForHtml(breadcrumbSchema)}</script>
    ${faqSchema ? `<script type="application/ld+json">${escapeJsonForHtml(faqSchema)}</script>` : ""}
  `;
}

function renderJournalIndex(): string {
  const posts = initialBlogPosts.filter(post => post.status === "published");
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "IDsvault Journal",
    "url": `${BASE_URL}/journal`,
    "description": "India-specific guides on premium usernames, digital identity brokerage, valuation, transfers, KYC, and fraud prevention.",
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${BASE_URL}/journal/${post.slug}`,
      "datePublished": post.publishedAt,
      "description": post.metaDescription,
      "author": { "@type": "Person", "name": post.author.name }
    }))
  };

  return `
    <main class="seo-prerender journal-index">
      <header>
        <p>IDsvault Journal</p>
        <h1>Digital Identity Journal &amp; Market Intelligence</h1>
        <p>${escapeHtml(getPageSEO("/journal").description)}</p>
      </header>
      <section>
        <h2>Latest guides</h2>
        <div class="journal-list">
          ${posts.map(post => `
            <article>
              <p>${escapeHtml(post.category)}</p>
              <h3><a href="/journal/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3>
              <p>${escapeHtml(post.introduction)}</p>
              <p>${escapeHtml(post.readTime)} · ${escapeHtml(post.publishedAt)}</p>
            </article>`).join("\n")}
        </div>
      </section>
    </main>
    <script type="application/ld+json">${escapeJsonForHtml(blogSchema)}</script>
  `;
}

function renderGeneric(route: string, pageTitle: string, description: string): string {
  const links = [
    ["/inventory", "Browse inventory"],
    ["/sell", "Sell a username or domain"],
    ["/advisory", "Request private sourcing"],
    ["/journal", "Read the journal"],
    ["/trust", "Trust & safety"],
    ["/contact", "Contact the broker"]
  ];

  return `
    <main class="seo-prerender">
      <header>
        <h1>${escapeHtml(pageTitle)}</h1>
        <p>${escapeHtml(description)}</p>
      </header>
      <nav aria-label="IDsvault navigation">
        <ul>${links.filter(([href]) => href !== route).map(([href, label]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`).join("")}</ul>
      </nav>
    </main>
  `;
}

function collectHtmlFiles(dir: string): string[] {
  const output: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "assets") output.push(...collectHtmlFiles(fullPath));
    } else if (entry.name === "index.html") {
      output.push(fullPath);
    }
  }
  return output;
}

function routeFromHtmlPath(filePath: string): string {
  const relative = path.relative(DIST_DIR, filePath).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "")}`;
}

function replaceMeta(html: string, name: string, content: string): string {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta\\s+name="${name}"[^>]*>`, "i");
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function replacePropertyMeta(html: string, property: string, content: string): string {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const regex = new RegExp(`<meta\\s+property="${property}"[^>]*>`, "i");
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function replaceCanonical(html: string, href: string): string {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const regex = /<link\s+rel="canonical"[^>]*>/i;
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function replaceRoot(html: string, body: string): string {
  return html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${body}</div>`);
}

function upsertRobots(html: string, content: string): string {
  return replaceMeta(html, "robots", content);
}

function processFile(filePath: string) {
  const route = routeFromHtmlPath(filePath);
  let html = fs.readFileSync(filePath, "utf-8");
  const isPolicy = route.startsWith("/policy/");
  const post = route.startsWith("/journal/")
    ? initialBlogPosts.find(candidate => candidate.slug === route.slice("/journal/".length) && candidate.status === "published")
    : undefined;

  if (post) {
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.introduction;
    const canonical = `${BASE_URL}/journal/${post.slug}`;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)} — ${escapeHtml(SITE_CONFIG.name)}</title>`);
    html = replaceMeta(html, "description", description);
    html = replaceMeta(html, "author", post.author.name);
    html = replaceCanonical(html, canonical);
    html = upsertRobots(html, "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    html = replacePropertyMeta(html, "og:type", "article");
    html = replacePropertyMeta(html, "og:title", title);
    html = replacePropertyMeta(html, "og:description", description);
    html = replacePropertyMeta(html, "og:url", canonical);
    html = replacePropertyMeta(html, "article:published_time", post.publishedAt);
    html = replacePropertyMeta(html, "article:modified_time", post.publishedAt);
    html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
    html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
    html = replaceRoot(html, renderBlog(post));
  } else if (route === "/journal") {
    const seo = getPageSEO(route);
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
    html = replaceMeta(html, "description", seo.description);
    html = replaceCanonical(html, `${BASE_URL}${seo.canonical}`);
    html = upsertRobots(html, "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    html = replacePropertyMeta(html, "og:title", seo.ogTitle);
    html = replacePropertyMeta(html, "og:description", seo.ogDescription);
    html = replacePropertyMeta(html, "og:url", seo.ogUrl);
    html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />`);
    html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />`);
    html = replaceRoot(html, renderJournalIndex());
  } else {
    const seo = getPageSEO(route);
    const canonical = `${BASE_URL}${seo.canonical}`;
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
    html = replaceMeta(html, "description", seo.description);
    html = replaceCanonical(html, canonical);
    html = upsertRobots(html, isPolicy ? "noindex, follow" : (seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"));
    html = replacePropertyMeta(html, "og:title", seo.ogTitle);
    html = replacePropertyMeta(html, "og:description", seo.ogDescription);
    html = replacePropertyMeta(html, "og:url", seo.ogUrl);
    html = html.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />`);
    html = html.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />`);
    if (route !== "/404") {
      html = replaceRoot(html, renderGeneric(route, seo.title, seo.description));
    }
  }

  fs.writeFileSync(filePath, html, "utf-8");
}

if (!fs.existsSync(DIST_DIR)) {
  throw new Error("dist/ not found. Run vite build and prerender before postbuild SEO enrichment.");
}

const files = collectHtmlFiles(DIST_DIR);
for (const file of files) processFile(file);

// Keep the prerendered inventory corpus aligned with the actual live set so search engines receive useful HTML.
const liveListingCount = initialListings.filter(listing => listing.status === DealStatus.Live).length;
console.log(`✅ SEO enrichment complete: ${files.length} HTML files processed; ${liveListingCount} live listings available.`);
