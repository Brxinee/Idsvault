/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "./SEO";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Copy, 
  Twitter, 
  Facebook, 
  ArrowLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink,
  MessageSquare,
  Lock,
  Eye,
  Check,
  Briefcase,
  Layers,
  Sparkles,
  Settings,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { BlogPost, BlogSection, BlogFAQ } from "../types";
import { initialBlogPosts } from "../data/blogs";
import { motion, AnimatePresence } from "motion/react";

interface BlogViewProps {
  onBrowseListing: (slug: string) => void;
  isAdmin?: boolean;
  /** Legacy prop — kept for backward compat with App.tsx. Navigation uses useNavigate() internally. */
  onNavigate?: (view: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBrowseListing, isAdmin = false }) => {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams<{ slug?: string }>();
  // Load blog posts from local storage or fall back to initial seeded database.
  //
  // The bundled `initialBlogPosts` is the source of truth. We version the seed so
  // that whenever the shipped posts change (count or content), returning visitors
  // get the fresh set instead of being stuck on a stale localStorage cache.
  // Admin-authored posts that aren't part of the seed (matched by slug) are kept.
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const SEED_VERSION = `v${initialBlogPosts.length}`;
    try {
      const savedVersion = localStorage.getItem("idsvault_blogs_seed_version");
      const saved = localStorage.getItem("idsvault_blogs_db");

      if (saved && savedVersion === SEED_VERSION) {
        const parsed: BlogPost[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }

      // Stale or missing cache → re-seed from the bundled posts, preserving any
      // admin-authored extras (slugs that don't exist in the seed).
      if (saved) {
        const parsed: BlogPost[] = JSON.parse(saved);
        const seedSlugs = new Set(initialBlogPosts.map(p => p.slug));
        const adminExtras = Array.isArray(parsed)
          ? parsed.filter(p => p && p.slug && !seedSlugs.has(p.slug))
          : [];
        return [...initialBlogPosts, ...adminExtras];
      }
    } catch (e) {
      console.error("Failed to parse saved blogs — re-seeding", e);
    }
    return initialBlogPosts;
  });

  // Persist edits + keep the seed version in sync
  useEffect(() => {
    localStorage.setItem("idsvault_blogs_db", JSON.stringify(posts));
    localStorage.setItem("idsvault_blogs_seed_version", `v${initialBlogPosts.length}`);
  }, [posts]);

  // Views and navigation inside Blog — initialised from the URL for deep-linking
  const [activeSlug, setActiveSlug] = useState<string | null>(urlSlug ?? null);

  // Keep the URL in sync with the open post so /journal/:slug is shareable & crawlable
  useEffect(() => {
    if (activeSlug) {
      navigate(`/journal/${activeSlug}`, { replace: true });
    } else if (urlSlug) {
      navigate("/journal", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlug]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // CMS management UI state
  const [cmsMode, setCmsMode] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null); // BlogPost ID or 'new'
  
  // CMS Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Instagram");
  const [formMetaTitle, setFormMetaTitle] = useState("");
  const [formMetaDescription, setFormMetaDescription] = useState("");
  const [formReadTime, setFormReadTime] = useState("6 min read");
  const [formIntro, setFormIntro] = useState("");
  const [formDirectAnswer, setFormDirectAnswer] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [formAuthorName, setFormAuthorName] = useState("Jogdhande Nikhil Patil");
  const [formAuthorRole, setFormAuthorRole] = useState("Lead Identity Broker");

  // Custom lists of sections and faqs in editing
  const [formSections, setFormSections] = useState<BlogSection[]>([]);
  const [formFaqs, setFormFaqs] = useState<BlogFAQ[]>([]);

  // Feedback states
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Pagination
  const POSTS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Available categories inside the registry
  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  // Filter posts for lists (Drafts hidden unless in CMS mode)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Hide drafts for users not in CMS mode
      if (!cmsMode && post.status === "draft") return false;

      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.introduction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = activeCategory === "All" || post.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory, cmsMode]);

  // Find active post
  const activePost = useMemo(() => {
    if (!activeSlug) return null;
    return posts.find(p => p.slug === activeSlug) || null;
  }, [posts, activeSlug]);

  // Dynamically compile and inject JSON-LD schema markup on slug changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Clean up any existing JSON-LD schemas
    const existingScripts = document.querySelectorAll("script[id^='idsvault-ld-']");
    existingScripts.forEach(script => script.remove());

    if (!activePost) {
      // General Blog Listing Page Schema
      const listSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "IDsvault Strategy Library",
        "description": "High-authority guides, valuation frameworks, transfer checklists, and strategy audits for Premium Usernames.",
        "publisher": {
          "@type": "Organization",
          "name": "IDsvault Hub",
          "url": "https://idsvault.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://idsvault.com/public/logo.png"
          }
        },
        "blogPost": posts.filter(p => p.status === "published").map(p => ({
          "@type": "BlogPosting",
          "headline": p.title,
          "url": `https://idsvault.com/journal/${p.slug}`,
          "datePublished": p.publishedAt,
          "author": {
            "@type": "Person",
            "name": p.author.name
          }
        }))
      };

      const script = document.createElement("script");
      script.id = "idsvault-ld-bloglist";
      script.type = "application/ld+json";
      script.text = JSON.stringify(listSchema);
      document.head.appendChild(script);

      return;
    }

    // Dynamic schema definitions for a single article

    // 1. BlogPosting & Article Scheme
    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://idsvault.com/journal/${activePost.slug}`
      },
      "headline": activePost.title,
      "description": activePost.metaDescription,
      "datePublished": activePost.publishedAt,
      "author": {
        "@type": "Person",
        "name": activePost.author.name,
        "jobTitle": activePost.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "IDsvault Hub",
        "url": "https://idsvault.com"
      }
    };

    // 2. Breadcrumbs schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://idsvault.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Journal",
          "item": "https://idsvault.com/journal"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": activePost.category,
          "item": `https://idsvault.com/journal?category=${encodeURIComponent(activePost.category)}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": activePost.title,
          "item": `https://idsvault.com/journal/${activePost.slug}`
        }
      ]
    };

    // 3. FAQPage Schema
    const faqSchema = activePost.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": activePost.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    } : null;

    // Append script elements to document head
    const scriptPost = document.createElement("script");
    scriptPost.id = "idsvault-ld-posting";
    scriptPost.type = "application/ld+json";
    scriptPost.text = JSON.stringify(blogPostingSchema);
    document.head.appendChild(scriptPost);

    const scriptBread = document.createElement("script");
    scriptBread.id = "idsvault-ld-bread";
    scriptBread.type = "application/ld+json";
    scriptBread.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptBread);

    if (faqSchema) {
      const scriptFaq = document.createElement("script");
      scriptFaq.id = "idsvault-ld-faq";
      scriptFaq.type = "application/ld+json";
      scriptFaq.text = JSON.stringify(faqSchema);
      document.head.appendChild(scriptFaq);
    }

  }, [activePost, posts]);

  // Featured Article - Choose the starred one
  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured && p.status === "published") || posts[0];
  }, [posts]);

  // Reset pagination when search/category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Non-featured listing posts (all, used for total count)
  const listPosts = useMemo(() => {
    return filteredPosts.filter(p => p.id !== featuredPost?.id || activeCategory !== "All");
  }, [filteredPosts, featuredPost, activeCategory]);

  // Paginated slice of listPosts
  const totalPages = Math.ceil(listPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return listPosts.slice(start, start + POSTS_PER_PAGE);
  }, [listPosts, currentPage]);

  // Trigger copy URL slug action
  const handleCopyLink = () => {
    const url = `${window.location.origin}/journal/${activePost?.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  // Launch social triggers
  const handleShareSocial = (platform: "twitter" | "facebook") => {
    const url = encodeURIComponent(`${window.location.origin}/journal/${activePost?.slug}`);
    const text = encodeURIComponent(activePost?.title || "");
    const shareUrl = platform === "twitter" 
      ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
      : `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
  };

  // Setup state fields for creating/editing posts
  const handleBeginCMS = (postToEdit?: BlogPost) => {
    if (postToEdit) {
      setIsEditing(postToEdit.id);
      setFormTitle(postToEdit.title);
      setFormSlug(postToEdit.slug);
      setFormCategory(postToEdit.category);
      setFormMetaTitle(postToEdit.metaTitle);
      setFormMetaDescription(postToEdit.metaDescription);
      setFormReadTime(postToEdit.readTime);
      setFormIntro(postToEdit.introduction);
      setFormDirectAnswer(postToEdit.directAnswer);
      setFormFeatured(postToEdit.featured);
      setFormStatus(postToEdit.status);
      setFormAuthorName(postToEdit.author.name);
      setFormAuthorRole(postToEdit.author.role);
      setFormSections(JSON.parse(JSON.stringify(postToEdit.sections)));
      setFormFaqs(JSON.parse(JSON.stringify(postToEdit.faqs)));
    } else {
      setIsEditing("new");
      setFormTitle("");
      setFormSlug("");
      setFormCategory("Instagram");
      setFormMetaTitle("");
      setFormMetaDescription("");
      setFormReadTime("6 min read");
      setFormIntro("");
      setFormDirectAnswer("");
      setFormFeatured(false);
      setFormStatus("published");
      setFormAuthorName("Jogdhande Nikhil Patil");
      setFormAuthorRole("Lead Identity Broker");
      setFormSections([
        { type: "heading2", content: "Key Strategy Analysis" },
        { type: "paragraph", content: "Write comprehensive research breakdown paragraphs. Avoid fluff." }
      ]);
      setFormFaqs([
        { question: "Is this transaction secure?", answer: "Yes, IDsvault broker-held payment ensures funds are held in the designated broker account and only released after the buyer confirms full ownership on the live transfer call." }
      ]);
    }
  };

  // Save changes from editing
  const handleSaveCMS = () => {
    if (!formTitle || !formSlug) {
      alert("Article Title and Slug are required parameters.");
      return;
    }

    if (isEditing === "new") {
      const newPost: BlogPost = {
        id: `blog-custom-${Date.now()}`,
        title: formTitle,
        slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
        category: formCategory,
        metaTitle: formMetaTitle || `${formTitle} | IDsvault`,
        metaDescription: formMetaDescription || formIntro.slice(0, 155),
        publishedAt: new Date().toISOString().split("T")[0],
        readTime: formReadTime,
        author: {
          name: formAuthorName,
          role: formAuthorRole,
          avatar: formAuthorName.split(" ").map(n => n[0]).join("")
        },
        featured: formFeatured,
        status: formStatus,
        introduction: formIntro,
        directAnswer: formDirectAnswer,
        sections: formSections,
        faqs: formFaqs,
        relatedSlugs: posts.slice(0, 3).map(p => p.slug)
      };

      // Set featured priority flags
      let updated = [...posts];
      if (formFeatured) {
        updated = updated.map(p => ({ ...p, featured: false }));
      }
      setPosts([newPost, ...updated]);
    } else {
      let updated = posts.map(p => {
        if (p.id === isEditing) {
          return {
            ...p,
            title: formTitle,
            slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
            category: formCategory,
            metaTitle: formMetaTitle || `${formTitle} | IDsvault`,
            metaDescription: formMetaDescription || formIntro.slice(0, 155),
            readTime: formReadTime,
            author: {
              ...p.author,
              name: formAuthorName,
              role: formAuthorRole,
              avatar: formAuthorName.split(" ").map(n => n[0]).join("")
            },
            featured: formFeatured,
            status: formStatus,
            introduction: formIntro,
            directAnswer: formDirectAnswer,
            sections: formSections,
            faqs: formFaqs
          };
        }
        return p;
      });

      if (formFeatured) {
        updated = updated.map(p => p.id === isEditing ? p : { ...p, featured: false });
      }

      setPosts(updated);
    }

    setIsEditing(null);
  };

  // Delete article completely
  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to permanently delete this article? This is irreversible.")) {
      setPosts(prev => prev.filter(p => p.id !== id));
      if (activePost?.id === id) {
        setActiveSlug(null);
      }
    }
  };

  // Manage custom dynamic list of sections in form setup
  const addFormSection = (type: BlogSection["type"]) => {
    setFormSections(prev => [...prev, { type, content: "", items: type === "list" ? [""] : undefined }]);
  };

  const updateFormSectionText = (idx: number, text: string) => {
    setFormSections(prev => prev.map((sec, i) => i === idx ? { ...sec, content: text } : sec));
  };

  const removeFormSection = (idx: number) => {
    setFormSections(prev => prev.filter((_, i) => i !== idx));
  };

  // Sub section list items manager
  const addFormSectionListItem = (secIdx: number) => {
    setFormSections(prev => prev.map((sec, i) => {
      if (i === secIdx) {
        return {
          ...sec,
          items: [...(sec.items || []), ""]
        };
      }
      return sec;
    }));
  };

  const updateFormSectionListItem = (secIdx: number, itemIdx: number, val: string) => {
    setFormSections(prev => prev.map((sec, i) => {
      if (i === secIdx) {
        const newItems = [...(sec.items || [])];
        newItems[itemIdx] = val;
        return { ...sec, items: newItems };
      }
      return sec;
    }));
  };

  // Dynamic related articles suggestions
  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return posts.filter(p => p.status === "published" && activePost.relatedSlugs.includes(p.slug)).slice(0, 3);
  }, [posts, activePost]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">

      {/* Per-route SEO: individual post meta when a post is open, listing meta otherwise */}
      {activePost ? (
        <SEO
          title={activePost.metaTitle || activePost.title}
          description={activePost.metaDescription}
          canonical={`/journal/${activePost.slug}`}
        />
      ) : (
        <SEO
          title="Journal — Premium Username & Digital Identity Guides"
          description="IDsvault's journal: India-specific guides on buying and selling premium Instagram, X, and Telegram handles and brandable domains — valuation, transfers, KYC, and fraud prevention."
          canonical="/journal"
        />
      )}

      {/* Editorial Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.06] pb-8 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 select-none mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono font-bold uppercase text-blue-400 rounded-full">
              <BookOpen className="h-3 w-3" />
              Topical Authority Hub
            </span>
            <span className="text-[10px] text-gray-500 font-mono">SEO & AI Engine Optimized</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
            IDsVault Editorial Strategy
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl font-sans">
            Guiding founders, startups, and virtual asset managers through secure ownership, valuation models, and legal digital brand clearances in India.
          </p>
        </div>

        {/* CMS Actions Toggle Controller */}
        {isAdmin && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCmsMode(p => !p)}
              className={`flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none border ${
                cmsMode 
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30" 
                  : "border-white/[0.08] hover:border-white/[0.15] text-gray-300 hover:text-white"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>{cmsMode ? "Admin CMS Active" : "CMS Console"}</span>
            </button>

            {cmsMode && (
              <button
                onClick={() => handleBeginCMS()}
                className="flex items-center gap-2 h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none active:scale-95 text-center"
              >
                <Plus className="h-4 w-4" />
                <span>Compose Article</span>
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        // ==========================================
        // DYNAMIC BLOG CMS CREATOR/EDITOR MODULE
        // ==========================================
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-surface p-8 max-w-4xl mx-auto space-y-6 text-left font-sans"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
              <span>{isEditing === "new" ? "Create Premium SEO Post" : "Edit Digital Identity Article"}</span>
            </h3>
            <button
              onClick={() => setIsEditing(null)}
              className="text-xs text-gray-400 hover:text-white uppercase font-bold px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.04] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Article Title</label>
              <input
                type="text"
                placeholder="e.g. How to Buy Premium Telegram Usernames Safely"
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                  // Generate slug cleanly if creating new card
                  if (isEditing === "new") {
                    setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                  }
                }}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">URL Slug (No slash)</label>
              <input
                type="text"
                placeholder="buy-telegram-usernames-securely"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Category</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none font-sans"
              >
                <option value="Instagram">Instagram</option>
                <option value="X-Platform">X-Platform</option>
                <option value="Telegram">Telegram</option>
                <option value="Acquisition">Acquisition</option>
                <option value="Selling">Selling</option>
                <option value="Valuation">Valuation</option>
                <option value="Branding">Branding</option>
                <option value="Security">Security</option>
                <option value="Registry">Registry</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Reading Speed Estimate</label>
              <input
                type="text"
                placeholder="6 min read"
                value={formReadTime}
                onChange={(e) => setFormReadTime(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none font-sans"
              />
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded bg-raised border border-white/[0.08] active:border-emerald-500 text-emerald-600 focus:ring-0 cursor-pointer h-4 w-4"
                />
                <span>Featured Hero Post</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={formStatus === "draft"}
                  onChange={(e) => setFormStatus(e.target.checked ? "draft" : "published")}
                  className="rounded bg-raised border border-white/[0.08] text-emerald-600 focus:ring-0 cursor-pointer h-4 w-4"
                />
                <span>Draft Status</span>
              </label>
            </div>
          </div>

          <div className="border border-emerald-500/10 bg-emerald-500/[0.01] p-4 rounded-xl space-y-4">
            <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-widest font-mono flex items-center gap-1.5 leading-none">
              <Layers className="h-4 w-4 text-emerald-500" />
              <span>AEO, GEO, and Search Engine Parameters</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1">Target SEO Title</label>
                <input
                  type="text"
                  placeholder="e.g. Primary Instagram Valuation Guide | IDsvault"
                  value={formMetaTitle}
                  onChange={(e) => setFormMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-white/[0.06] text-white focus:border-emerald-500/50 outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1">Meta Description (155 length)</label>
                <input
                  type="text"
                  placeholder="Keep under 160 characters to optimize SERPs snippets listings."
                  value={formMetaDescription}
                  onChange={(e) => setFormMetaDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-white/[0.06] text-white focus:border-emerald-500/50 outline-none font-sans"
                />
              </div>
            </div>
          </div>

          {/* Intro description */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Editorial Introduction</label>
            <textarea
              rows={3}
              placeholder="Write a high-authority research paragraph setting up the target digital assets context..."
              value={formIntro}
              onChange={(e) => setFormIntro(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none font-sans leading-relaxed"
            />
          </div>

          {/* AI Direct Answer Block */}
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                GEO Direct Answer Block (Google AI Overview, Perplexity Matcher)
              </label>
              <span title="This block will be dynamically extracted by AI indexers querying this exact intent.">
                <HelpCircle className="h-3 w-3 text-gray-500" />
              </span>
            </div>
            <textarea
              rows={2}
              placeholder="Deliver a high-density, concise direct response containing no qualifiers. Ideal for semantic search extractors."
              value={formDirectAnswer}
              onChange={(e) => setFormDirectAnswer(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-amber-500/[0.02] border border-amber-500/20 text-amber-250 focus:border-amber-500/50 outline-none font-sans leading-relaxed"
            />
          </div>

          {/* Editable sections builder */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Article Editorial Sections</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addFormSection("heading2")}
                  className="text-[9px] font-bold uppercase text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  + Heading 2
                </button>
                <button
                  type="button"
                  onClick={() => addFormSection("paragraph")}
                  className="text-[9px] font-bold uppercase text-blue-400 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all cursor-pointer"
                >
                  + Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addFormSection("list")}
                  className="text-[9px] font-bold uppercase text-purple-400 px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all cursor-pointer"
                >
                  + Bullet List
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {formSections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-surface border border-white/[0.04] space-y-3 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-white/[0.05] text-gray-400">
                      Block {idx + 1}: {sec.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFormSection(idx)}
                      className="text-red-400 hover:text-red-300 transform scale-90 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {sec.type === "list" ? (
                    <div className="space-y-2">
                      {sec.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2">
                          <span className="text-[10px] text-gray-500 pt-2 font-mono">•</span>
                          <input
                            type="text"
                            placeholder="Bullet factor text details..."
                            value={item}
                            onChange={(e) => updateFormSectionListItem(idx, itemIdx, e.target.value)}
                            className="flex-grow px-3 py-1.5 text-xs rounded bg-raised border border-white/[0.06] text-white focus:outline-none focus:border-purple-500/40"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFormSectionListItem(idx)}
                        className="text-[9px] font-bold text-purple-400 uppercase tracking-widest pl-4 hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        + Add List Item
                      </button>
                    </div>
                  ) : (
                    <textarea
                      rows={sec.type === "heading2" || sec.type === "heading3" ? 1 : 3}
                      placeholder={sec.type === "heading2" ? "Enter Section Heading text..." : "Enter analytical body copy details..."}
                      value={sec.content || ""}
                      onChange={(e) => updateFormSectionText(idx, e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded bg-raised border border-white/[0.06] text-white focus:outline-none focus:border-blue-500/40 leading-relaxed font-sans"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action trigger panel */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/[0.05]">
            <button
              onClick={() => setIsEditing(null)}
              className="h-10 px-5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSaveCMS}
              className="h-10 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:zoom-95 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer select-none"
            >
              Commit & Deploy Post
            </button>
          </div>
        </motion.div>
      ) : activeSlug && activePost ? (
        // ==========================================
        // INDIVIDUAL EDITORIAL ARTICLE VIEW (/blog/[slug])
        // ==========================================
        <article className="max-w-4xl mx-auto space-y-8 text-left font-sans animate-in duration-300">
          
          {/* Breadcrumb Navigation System */}
          <nav className="flex items-center gap-1.5 text-gray-500 text-[10px] font-mono tracking-wide uppercase select-none">
            <button 
              onClick={() => navigate("/")} 
              className="hover:text-blue-400 cursor-pointer transition-colors"
            >
              Home
            </button>
            <ChevronRight className="h-3 w-3" />
            <button
              onClick={() => {
                setActiveSlug(null);
                setActiveCategory("All");
              }}
              className="hover:text-blue-400 cursor-pointer transition-colors"
            >
              Journal
            </button>
            <ChevronRight className="h-3 w-3" />
            <button 
              onClick={() => {
                setActiveSlug(null);
                setActiveCategory(activePost.category);
              }}
              className="hover:text-blue-400 cursor-pointer transition-colors text-blue-500 font-bold"
            >
              {activePost.category}
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-400 truncate max-w-[200px]">{activePost.title}</span>
          </nav>

          {/* Back Action */}
          <button
            onClick={() => {
              setActiveSlug(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2 text-xs text-gray-400 hover:text-white uppercase font-bold tracking-wider transition-colors cursor-pointer select-none"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Strategy Library</span>
          </button>

          {/* Header Block */}
          <header className="space-y-4">
            <span className="px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest text-[#10B981] uppercase bg-[#10B981]/10 border border-emerald-500/10 rounded">
              {activePost.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {activePost.title}
            </h1>

            {/* Authoring Info Line */}
            <div className="flex flex-wrap items-center gap-y-3 gap-6 text-xs text-gray-400 border-y border-white/[0.06] py-3.5">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-raised border border-white/[0.08] flex items-center justify-center text-[10px] font-mono font-bold text-blue-400 select-none">
                  {activePost.author.avatar}
                </div>
                <div className="text-left leading-tight">
                  <p className="text-white font-semibold">{activePost.author.name}</p>
                  <p className="text-[9px] text-gray-500">{activePost.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                <span>{activePost.publishedAt}</span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                <Clock className="h-3.5 w-3.5 text-gray-500" />
                <span>{activePost.readTime}</span>
              </div>

              {/* Dynamic Share Hub */}
              <div className="ml-auto flex items-center gap-2.5">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-[10px] font-mono font-bold text-gray-300 hover:text-white transition-all cursor-pointer active:scale-95 text-center shrink-0"
                >
                  {copiedSlug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedSlug ? "Link Copied" : "Copy URL"}</span>
                </button>
                <button
                  onClick={() => handleShareSocial("twitter")}
                  className="h-8 w-8 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white cursor-pointer active:scale-95 shrink-0"
                  title="Share on X (Twitter)"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Grid Layout: Main Article vs Sticky Sidebar TOC */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-4">

            {/* Left/Middle Column (TOC compilation, intro, sections, faqs) */}
            <div className="md:col-span-3 space-y-8 leading-relaxed text-[#D1D5DB] text-[14.5px]">

              {/* Table of contents mapping for small screens */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] md:hidden mb-6 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Table of Contents</h4>
                <ul className="text-xs space-y-1.5 text-blue-400 font-sans">
                  {activePost.sections.filter(s => s.type === "heading2").map((s, i) => (
                    <li key={i}>
                      <a href={`#toc-sec-${i}`} className="hover:underline flex items-center gap-1">
                        <span>•</span>
                        <span>{s.content}</span>
                      </a>
                    </li>
                  ))}
                  {activePost.faqs.length > 0 && (
                    <li>
                      <a href="#faq" className="hover:underline flex items-center gap-1">
                        <span>•</span>
                        <span>Frequently Asked Questions</span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Bold Editorial Intro */}
              <p className="text-base text-gray-200 font-medium leading-relaxed font-sans select-text pb-2 border-b border-white/[0.03]">
                {activePost.introduction}
              </p>

              {/* GEO / AEO Direct Answer highlight box */}
              {activePost.directAnswer && (
                <div className="p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/15 relative overflow-hidden select-text font-sans">
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500" />
                  <div className="flex items-center gap-2 mb-2 select-none">
                    <Sparkles className="h-[18px] w-[18px] text-amber-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                      Query Direct Answer (AI Overview & GEO Summary)
                    </span>
                  </div>
                  <p className="text-[13px] text-amber-250 leading-relaxed font-normal">
                    {activePost.directAnswer}
                  </p>
                </div>
              )}

              {/* Dynamic sections rendering */}
              <div className="space-y-6">
                {activePost.sections.map((sec, idx) => {
                  switch (sec.type) {
                    case "heading2":
                      return (
                        <h2 
                          key={idx} 
                          id={`toc-sec-${activePost.sections.filter((s, s_idx) => s.type === "heading2" && s_idx <= idx).length - 1}`}
                          className="pt-4 text-xl md:text-2xl font-bold text-white tracking-tight border-b border-white/[0.04] pb-2 font-sans select-text scroll-mt-20"
                        >
                          {sec.content}
                        </h2>
                      );
                    case "heading3":
                      return (
                        <h3 key={idx} className="pt-2 text-base font-semibold text-white tracking-tight font-sans select-text">
                          {sec.content}
                        </h3>
                      );
                    case "paragraph":
                      return (
                        <p key={idx} className="text-gray-300 font-sans select-text leading-relaxed font-normal">
                          {sec.content}
                        </p>
                      );
                    case "list":
                      return (
                        <ul key={idx} className="space-y-2 pl-4 list-none font-sans select-text">
                          {sec.items?.map((item, idy) => (
                            <li key={idy} className="flex gap-2.5 text-gray-300 font-normal">
                              <span className="text-blue-500 text-xs font-mono font-bold select-none pt-1">0{idy+1}.</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    case "quote":
                      return (
                        <blockquote key={idx} className="pl-5 border-l-2 border-blue-500 py-1 text-gray-400 italic bg-white/[0.01] rounded-r-lg p-4 font-sans select-text">
                          {sec.content}
                        </blockquote>
                      );
                    case "table":
                      return (
                        <div key={idx} className="overflow-x-auto rounded-xl border border-white/[0.05] bg-surface my-4 select-text">
                          <table className="min-w-[560px] w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                                {sec.columns?.map((col, c_idx) => (
                                  <th key={c_idx} className="p-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                              {sec.rows?.map((row, r_idx) => (
                                <tr key={r_idx} className="hover:bg-white/[0.01] transition-colors">
                                  {row.map((cell, cell_idx) => (
                                    <td key={cell_idx} className="p-3 text-gray-300 leading-normal font-sans">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    case "cta":
                      return (
                        <div key={idx} className="p-6 rounded-2xl border border-blue-500/15 bg-blue-500/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-6 font-sans">
                          <div>
                            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">{sec.subtitle || "Sourcing Alert"}</h4>
                            <p className="text-xs text-gray-300 max-w-lg leading-relaxed">{sec.content}</p>
                          </div>
                          <button
                            onClick={() => {
                              navigate("/advisory");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-[10px] text-white font-bold uppercase tracking-wider transition-all select-none cursor-pointer text-center shrink-0"
                          >
                            Launch Request
                          </button>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              {/* Dynamic Interactive FAQs Module on Bottom */}
              {activePost.faqs.length > 0 && (
                <div id="faq" className="pt-6 border-t border-white/[0.06] space-y-4 font-sans scroll-mt-20">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  
                  <div className="space-y-2">
                    {activePost.faqs.map((faq, i) => {
                      const isOpen = activeFaqIndex === i;
                      return (
                        <div 
                          key={i} 
                          className="rounded-lg border border-white/[0.05] bg-canvas overflow-hidden"
                        >
                          <button
                            onClick={() => setActiveFaqIndex(isOpen ? null : i)}
                            className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-white/[0.01] transition-colors cursor-pointer select-none"
                          >
                            <span className="text-xs font-bold text-white leading-snug">{faq.question}</span>
                            <span className="text-xs text-gray-500 ml-auto font-mono shrink-0">
                              {isOpen ? "[ Collapse ]" : "[ Expand ]"}
                            </span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-white/[0.04] p-4 text-xs text-gray-400 select-text leading-relaxed bg-surface/40 font-normal"
                              >
                                {faq.answer}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Avoid Dangerous Platforms Claim warning Disclaimer */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[10px] text-gray-500 leading-relaxed max-w-2xl font-sans mt-4">
                <strong>Safety & Regulatory Notice:</strong> IDsvault is an independent digital identity broker facilitating supervised transfer agreements for high-value handles. We hold no official affiliation, sponsorship, license, or association with Instagram, Twitter/X, Telegram, or any associated parent organizations. Transactions are secured through broker-held payment in a dedicated broker account with supervised live transfer.
              </div>

            </div>

            {/* Right Column: Sticky Sidebar Table of Contents */}
            <aside className="hidden md:block md:col-span-1 space-y-6 select-none font-sans">
              <div className="sticky top-24 border border-white/[0.04] bg-canvas/80 backdrop-blur-md p-5 rounded-2xl space-y-4">
                
                {/* TOC links */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Article Outline
                  </h4>
                  <ul className="text-xs space-y-3 font-sans text-gray-400">
                    {activePost.sections.filter(s => s.type === "heading2").map((s, i) => (
                      <li key={i}>
                        <a 
                          href={`#toc-sec-${i}`} 
                          className="hover:text-blue-400 transition-colors block text-left leading-snug font-medium border-l border-white/[0.08] pl-3 hover:border-blue-500/60"
                        >
                          {s.content}
                        </a>
                      </li>
                    ))}
                    {activePost.faqs.length > 0 && (
                      <li>
                        <a 
                          href="#faq" 
                          className="hover:text-blue-400 transition-colors block text-left leading-snug font-medium border-l border-white/[0.08] pl-3 hover:border-blue-500/60"
                        >
                          FAQ Guide
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Side CTA Panel */}
                <div className="pt-4 border-t border-white/[0.05] space-y-3">
                  <h4 className="text-[9px] font-bold text-[#10B981] uppercase tracking-widest font-mono flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>Broker Desk Live</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
                    Looking to acquire a secure handle on the off-market? Hire an experienced identity coordinate agent.
                  </p>
                  <button
                    onClick={() => {
                      navigate("/advisory");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer select-none text-center"
                  >
                    Acquisition Campaign
                  </button>
                </div>

              </div>
            </aside>

          </div>

          {/* Core Dynamic Internal Linking: Related Articles Recommendation Grid */}
          {relatedPosts.length > 0 && (
            <section className="pt-10 border-t border-white/[0.06] space-y-6 font-sans">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-[18px] w-[18px] text-blue-500" />
                <span>Related Insights & Strategies</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setActiveSlug(post.slug);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group border border-white/[0.06] hover:border-white/[0.12] bg-surface p-5 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[8px] font-mono font-bold uppercase text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 inline-block mb-1">
                        {post.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-normal leading-relaxed line-clamp-2">
                        {post.introduction}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-muted font-mono select-none pt-2 border-t border-white/[0.04]">
                      <span>{post.publishedAt}</span>
                      <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform uppercase font-bold text-[8px] tracking-wider">
                        Read Guide <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>
      ) : (
        // ==========================================
        // MAIN EDITORIAL OVERVIEW VIEW (/blog)
        // ==========================================
        <div className="space-y-10">
          
          {/* Real Search bar + category taxonomic pill filter */}
          <div className="space-y-4">
            
            {/* Search inputs */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search premium identity valuation, legal guides, security rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-surface border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3.5 text-[9px] text-gray-400 hover:text-white uppercase font-bold font-mono pl-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap items-center justify-center gap-2 select-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-mono font-bold rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-500/30"
                        : "bg-surface text-muted border-white/[0.04] hover:text-white hover:border-white/[0.1]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURED POST HERO HERO */}
          {featuredPost && activeCategory === "All" && !searchQuery && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setActiveSlug(featuredPost.slug)}
              className="group border border-white/[0.08] bg-surface hover:border-white/[0.14] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/[0.02] transition-all duration-300 cursor-pointer text-left"
            >
              <div className="flex-grow space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 select-none">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/15 text-[#10B981] border border-emerald-500/20 text-[9px] font-mono font-bold uppercase rounded-full">
                      <Sparkles className="h-3 w-3 animate-pulse" />
                      FEATURED STRATEGY DEPLOYMENT
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors tracking-tight leading-tight font-sans">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-400 text-xs mt-2.5 max-w-3xl leading-relaxed font-sans font-normal line-clamp-3">
                    {featuredPost.introduction}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-[10px] text-gray-500 font-mono select-none pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span className="font-sans font-semibold text-gray-400">{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{featuredPost.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Glowing decorative preview button on featured card */}
              <div className="md:w-48 bg-[#070708] border border-white/[0.05] rounded-xl flex flex-col justify-center items-center gap-1 p-6 select-none shrink-0 group-hover:border-blue-500/20 group-hover:bg-canvas transition-all">
                <span className="p-3 bg-blue-500/5 text-blue-500 rounded-full border border-blue-500/10 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                  <Eye className="h-5 w-5" />
                </span>
                <span className="text-[9px] font-mono font-bold uppercase text-gray-500 tracking-widest mt-1.5 group-hover:text-blue-400 transition-colors">Analyze Post</span>
              </div>
            </motion.div>
          )}

          {/* DYNAMIC STRATEGY SEARCH FEED GRID */}
          {filteredPosts.length === 0 ? (
            <div className="p-16 border border-dashed border-white/[0.06] rounded-2xl text-center space-y-3 max-w-md mx-auto">
              <AlertCircle className="h-8 w-8 text-gray-500 mx-auto" />
              <h3 className="text-sm font-bold text-white tracking-tight">No articles found</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal">
                No articles matched your search. Try different terms or reset the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-3.5 py-2 rounded bg-white/[0.04] text-[10px] text-gray-200 uppercase tracking-wider font-bold hover:bg-white/[0.08]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post, idx) => (
                  <motion.article
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.05, 0.2) }}
                    key={post.id}
                    onClick={() => {
                      setActiveSlug(post.slug);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group border border-white/[0.06] hover:border-white/[0.12] bg-surface p-6 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/[0.01] transition-all duration-300 cursor-pointer text-left flex flex-col justify-between"
                    id={`article_card_${post.slug}`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center select-none mb-1">
                        <span className="text-[8px] font-mono font-bold uppercase text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                          {post.category}
                        </span>
                        {post.status === "draft" && (
                          <span className="text-[8px] font-mono font-bold uppercase text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            DRAFT
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-snug tracking-tight font-sans">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-xs font-sans font-normal leading-relaxed line-clamp-3">
                        {post.introduction}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-muted font-mono select-none">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        <span>{post.readTime}</span>
                      </div>

                      {/* Admin editing suite controls */}
                      {cmsMode ? (
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleBeginCMS(post)}
                            className="h-6 w-6 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/25 transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => handleDeletePost(post.id, e)}
                            className="h-6 w-6 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer"
                            title="Delete article"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-0.5 text-blue-400 group-hover:translate-x-1 transition-transform uppercase font-bold text-[8px] tracking-widest leading-none pt-0.5">
                          Read <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 select-none">
                  <button
                    onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={currentPage === 1}
                    className="h-8 px-4 rounded-lg border border-white/[0.08] text-xs font-bold text-gray-400 hover:text-white hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        page === currentPage
                          ? "bg-blue-600 text-white border border-blue-500/30"
                          : "border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={currentPage === totalPages}
                    className="h-8 px-4 rounded-lg border border-white/[0.08] text-xs font-bold text-gray-400 hover:text-white hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      )}

    </div>
  );
};
