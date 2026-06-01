/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SEO } from "./SEO";
import {
  BookOpen, Search, Filter, Calendar, Clock, User, Share2, Copy,
  Twitter, Facebook, ArrowLeft, ChevronRight, ChevronDown, Plus, Edit,
  Trash2, ExternalLink, MessageSquare, Lock, Eye, Check, Briefcase,
  Layers, Sparkles, Settings, HelpCircle, AlertCircle, TrendingUp, Zap
} from "lucide-react";
import { BlogPost, BlogSection, BlogFAQ } from "../types";
import { initialBlogPosts } from "../data/blogs";
import { motion, AnimatePresence } from "motion/react";

// Per-category colour tokens — drives card accents, badges, and article header
const CATEGORY_STYLES: Record<string, { gradient: string; text: string; bg: string; border: string; glow: string }> = {
  "Instagram":   { gradient: "from-pink-500 via-fuchsia-500 to-purple-600", text: "text-pink-400",    bg: "bg-pink-500/10",    border: "border-pink-500/25",   glow: "hover:shadow-pink-500/5"   },
  "Telegram":    { gradient: "from-sky-400 to-blue-600",                    text: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/25",    glow: "hover:shadow-sky-500/5"    },
  "X-Platform":  { gradient: "from-slate-300 to-slate-500",                 text: "text-slate-300",   bg: "bg-slate-500/10",   border: "border-slate-500/25",  glow: "hover:shadow-slate-500/5"  },
  "Acquisition": { gradient: "from-emerald-400 to-teal-500",                text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25",glow: "hover:shadow-emerald-500/5"},
  "Selling":     { gradient: "from-amber-400 to-orange-500",                text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/25",  glow: "hover:shadow-amber-500/5"  },
  "Valuation":   { gradient: "from-violet-400 to-purple-600",               text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/25", glow: "hover:shadow-violet-500/5" },
  "Branding":    { gradient: "from-cyan-400 to-blue-500",                   text: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/25",   glow: "hover:shadow-cyan-500/5"   },
  "Security":    { gradient: "from-red-400 to-rose-600",                    text: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/25",    glow: "hover:shadow-red-500/5"    },
  "Legal":       { gradient: "from-orange-400 to-amber-600",                text: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/25", glow: "hover:shadow-orange-500/5" },
  "Registry":    { gradient: "from-green-400 to-emerald-600",               text: "text-green-400",   bg: "bg-green-500/10",   border: "border-green-500/25",  glow: "hover:shadow-green-500/5"  },
  "Trust":       { gradient: "from-teal-400 to-cyan-600",                   text: "text-teal-400",    bg: "bg-teal-500/10",    border: "border-teal-500/25",   glow: "hover:shadow-teal-500/5"   },
  "Platforms":   { gradient: "from-blue-400 to-indigo-500",                 text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/25",   glow: "hover:shadow-blue-500/5"   },
};
const getCatStyle = (cat: string) =>
  CATEGORY_STYLES[cat] ?? { gradient: "from-blue-400 to-indigo-500", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", glow: "hover:shadow-blue-500/5" };

interface BlogViewProps {
  onBrowseListing: (slug: string) => void;
  isAdmin?: boolean;
  onNavigate?: (view: string) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBrowseListing, isAdmin = false }) => {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams<{ slug?: string }>();

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const SEED_VERSION = `v${initialBlogPosts.length}`;
    try {
      const savedVersion = localStorage.getItem("idsvault_blogs_seed_version");
      const saved = localStorage.getItem("idsvault_blogs_db");
      if (saved && savedVersion === SEED_VERSION) {
        const parsed: BlogPost[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      if (saved) {
        const parsed: BlogPost[] = JSON.parse(saved);
        const seedSlugs = new Set(initialBlogPosts.map(p => p.slug));
        const adminExtras = Array.isArray(parsed) ? parsed.filter(p => p && p.slug && !seedSlugs.has(p.slug)) : [];
        return [...initialBlogPosts, ...adminExtras];
      }
    } catch (e) {
      console.error("Failed to parse saved blogs — re-seeding", e);
    }
    return initialBlogPosts;
  });

  useEffect(() => {
    localStorage.setItem("idsvault_blogs_db", JSON.stringify(posts));
    localStorage.setItem("idsvault_blogs_seed_version", `v${initialBlogPosts.length}`);
  }, [posts]);

  const [activeSlug, setActiveSlug] = useState<string | null>(urlSlug ?? null);

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
  const [cmsMode, setCmsMode] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);

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
  const [formSections, setFormSections] = useState<BlogSection[]>([]);
  const [formFaqs, setFormFaqs] = useState<BlogFAQ[]>([]);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Reading progress for article view
  const [readProgress, setReadProgress] = useState(0);
  useEffect(() => {
    if (!activeSlug) { setReadProgress(0); return; }
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? Math.round((el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSlug]);

  const POSTS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (!cmsMode && post.status === "draft") return false;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.introduction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, activeCategory, cmsMode]);

  const activePost = useMemo(() => {
    if (!activeSlug) return null;
    return posts.find(p => p.slug === activeSlug) || null;
  }, [posts, activeSlug]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const existingScripts = document.querySelectorAll("script[id^='idsvault-ld-']");
    existingScripts.forEach(script => script.remove());

    if (!activePost) {
      const listSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "IDsvault Strategy Library",
        "description": "High-authority guides, valuation frameworks, transfer checklists, and strategy audits for Premium Usernames.",
        "publisher": {
          "@type": "Organization",
          "name": "IDsvault Hub",
          "url": "https://idsvault.com",
          "logo": { "@type": "ImageObject", "url": "https://idsvault.com/cover.png" }
        },
        "blogPost": posts.filter(p => p.status === "published").map(p => ({
          "@type": "BlogPosting",
          "headline": p.title,
          "url": `https://idsvault.com/journal/${p.slug}`,
          "datePublished": p.publishedAt,
          "author": { "@type": "Person", "name": p.author.name }
        }))
      };
      const script = document.createElement("script");
      script.id = "idsvault-ld-bloglist";
      script.type = "application/ld+json";
      script.text = JSON.stringify(listSchema);
      document.head.appendChild(script);
      return;
    }

    const blogPostingSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://idsvault.com/journal/${activePost.slug}` },
      "headline": activePost.title,
      "description": activePost.metaDescription,
      "datePublished": activePost.publishedAt,
      "author": { "@type": "Person", "name": activePost.author.name, "jobTitle": activePost.author.role },
      "publisher": { "@type": "Organization", "name": "IDsvault Hub", "url": "https://idsvault.com" }
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://idsvault.com/" },
        { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://idsvault.com/journal" },
        { "@type": "ListItem", "position": 3, "name": activePost.category, "item": `https://idsvault.com/journal?category=${encodeURIComponent(activePost.category)}` },
        { "@type": "ListItem", "position": 4, "name": activePost.title, "item": `https://idsvault.com/journal/${activePost.slug}` }
      ]
    };
    const faqSchema = activePost.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": activePost.faqs.map(f => ({
        "@type": "Question", "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    } : null;

    const scriptPost = document.createElement("script");
    scriptPost.id = "idsvault-ld-posting"; scriptPost.type = "application/ld+json";
    scriptPost.text = JSON.stringify(blogPostingSchema);
    document.head.appendChild(scriptPost);

    const scriptBread = document.createElement("script");
    scriptBread.id = "idsvault-ld-bread"; scriptBread.type = "application/ld+json";
    scriptBread.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptBread);

    if (faqSchema) {
      const scriptFaq = document.createElement("script");
      scriptFaq.id = "idsvault-ld-faq"; scriptFaq.type = "application/ld+json";
      scriptFaq.text = JSON.stringify(faqSchema);
      document.head.appendChild(scriptFaq);
    }
  }, [activePost, posts]);

  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured && p.status === "published") || posts[0];
  }, [posts]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, activeCategory]);

  const listPosts = useMemo(() => {
    return filteredPosts.filter(p => p.id !== featuredPost?.id || activeCategory !== "All");
  }, [filteredPosts, featuredPost, activeCategory]);

  const totalPages = Math.ceil(listPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return listPosts.slice(start, start + POSTS_PER_PAGE);
  }, [listPosts, currentPage]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/journal/${activePost?.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const handleShareSocial = (platform: "twitter" | "facebook") => {
    const url = encodeURIComponent(`${window.location.origin}/journal/${activePost?.slug}`);
    const text = encodeURIComponent(activePost?.title || "");
    const shareUrl = platform === "twitter"
      ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
      : `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
  };

  const handleBeginCMS = (postToEdit?: BlogPost) => {
    if (postToEdit) {
      setIsEditing(postToEdit.id);
      setFormTitle(postToEdit.title); setFormSlug(postToEdit.slug);
      setFormCategory(postToEdit.category); setFormMetaTitle(postToEdit.metaTitle);
      setFormMetaDescription(postToEdit.metaDescription); setFormReadTime(postToEdit.readTime);
      setFormIntro(postToEdit.introduction); setFormDirectAnswer(postToEdit.directAnswer);
      setFormFeatured(postToEdit.featured); setFormStatus(postToEdit.status);
      setFormAuthorName(postToEdit.author.name); setFormAuthorRole(postToEdit.author.role);
      setFormSections(JSON.parse(JSON.stringify(postToEdit.sections)));
      setFormFaqs(JSON.parse(JSON.stringify(postToEdit.faqs)));
    } else {
      setIsEditing("new");
      setFormTitle(""); setFormSlug(""); setFormCategory("Instagram");
      setFormMetaTitle(""); setFormMetaDescription(""); setFormReadTime("6 min read");
      setFormIntro(""); setFormDirectAnswer(""); setFormFeatured(false);
      setFormStatus("published"); setFormAuthorName("Jogdhande Nikhil Patil");
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

  const handleSaveCMS = () => {
    if (!formTitle || !formSlug) { alert("Article Title and Slug are required parameters."); return; }
    if (isEditing === "new") {
      const newPost: BlogPost = {
        id: `blog-custom-${Date.now()}`, title: formTitle,
        slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
        category: formCategory,
        metaTitle: formMetaTitle || `${formTitle} | IDsvault`,
        metaDescription: formMetaDescription || formIntro.slice(0, 155),
        publishedAt: new Date().toISOString().split("T")[0], readTime: formReadTime,
        author: { name: formAuthorName, role: formAuthorRole, avatar: formAuthorName.split(" ").map(n => n[0]).join("") },
        featured: formFeatured, status: formStatus, introduction: formIntro,
        directAnswer: formDirectAnswer, sections: formSections, faqs: formFaqs,
        relatedSlugs: posts.slice(0, 3).map(p => p.slug)
      };
      let updated = [...posts];
      if (formFeatured) updated = updated.map(p => ({ ...p, featured: false }));
      setPosts([newPost, ...updated]);
    } else {
      let updated = posts.map(p => {
        if (p.id === isEditing) {
          return {
            ...p, title: formTitle,
            slug: formSlug.trim().toLowerCase().replace(/\s+/g, "-"),
            category: formCategory,
            metaTitle: formMetaTitle || `${formTitle} | IDsvault`,
            metaDescription: formMetaDescription || formIntro.slice(0, 155),
            readTime: formReadTime,
            author: { ...p.author, name: formAuthorName, role: formAuthorRole, avatar: formAuthorName.split(" ").map(n => n[0]).join("") },
            featured: formFeatured, status: formStatus, introduction: formIntro,
            directAnswer: formDirectAnswer, sections: formSections, faqs: formFaqs
          };
        }
        return p;
      });
      if (formFeatured) updated = updated.map(p => p.id === isEditing ? p : { ...p, featured: false });
      setPosts(updated);
    }
    setIsEditing(null);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to permanently delete this article? This is irreversible.")) {
      setPosts(prev => prev.filter(p => p.id !== id));
      if (activePost?.id === id) setActiveSlug(null);
    }
  };

  const addFormSection = (type: BlogSection["type"]) => {
    setFormSections(prev => [...prev, { type, content: "", items: type === "list" ? [""] : undefined }]);
  };
  const updateFormSectionText = (idx: number, text: string) => {
    setFormSections(prev => prev.map((sec, i) => i === idx ? { ...sec, content: text } : sec));
  };
  const removeFormSection = (idx: number) => {
    setFormSections(prev => prev.filter((_, i) => i !== idx));
  };
  const addFormSectionListItem = (secIdx: number) => {
    setFormSections(prev => prev.map((sec, i) => i === secIdx ? { ...sec, items: [...(sec.items || []), ""] } : sec));
  };
  const updateFormSectionListItem = (secIdx: number, itemIdx: number, val: string) => {
    setFormSections(prev => prev.map((sec, i) => {
      if (i === secIdx) { const newItems = [...(sec.items || [])]; newItems[itemIdx] = val; return { ...sec, items: newItems }; }
      return sec;
    }));
  };

  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return posts.filter(p => p.status === "published" && activePost.relatedSlugs.includes(p.slug)).slice(0, 3);
  }, [posts, activePost]);

  const publishedCount = useMemo(() => posts.filter(p => p.status === "published").length, [posts]);
  const categoryCount = useMemo(() => new Set(posts.map(p => p.category)).size, [posts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative">

      {/* Reading progress bar — fixed across top of viewport during article view */}
      {activeSlug && activePost && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/[0.04]">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>
      )}

      {/* Per-route SEO */}
      {activePost ? (
        <SEO title={activePost.metaTitle || activePost.title} description={activePost.metaDescription} canonical={`/journal/${activePost.slug}`} />
      ) : (
        <SEO
          title="Journal — Premium Username & Digital Identity Guides"
          description="IDsvault's journal: India-specific guides on buying and selling premium Instagram, X, and Telegram handles and brandable domains — valuation, transfers, KYC, and fraud prevention."
          canonical="/journal"
        />
      )}

      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/[0.06] pb-8 mb-10 gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 select-none">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono font-bold uppercase text-blue-400 rounded-full">
              <BookOpen className="h-3 w-3" />
              Topical Authority Hub
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold uppercase text-emerald-400 rounded-full">
              <TrendingUp className="h-3 w-3" />
              {publishedCount} Guides
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-[9px] font-mono font-bold uppercase text-purple-400 rounded-full">
              <Zap className="h-3 w-3" />
              SEO · AEO · GEO
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            IDsvault Editorial Library
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
            Authoritative guides for founders, startups, and brand builders navigating digital identity acquisition, valuation, and secure transfer in India.
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setCmsMode(p => !p)}
              className={`flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none border ${
                cmsMode ? "bg-amber-500/15 text-amber-400 border-amber-500/30" : "border-white/[0.08] hover:border-white/[0.15] text-gray-300 hover:text-white"
              }`}
            >
              <Settings className="h-4 w-4" />
              {cmsMode ? "Admin CMS Active" : "CMS Console"}
            </button>
            {cmsMode && (
              <button
                onClick={() => handleBeginCMS()}
                className="flex items-center gap-2 h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none active:scale-95"
              >
                <Plus className="h-4 w-4" />
                Compose Article
              </button>
            )}
          </div>
        )}
      </div>

      {/* ─── CMS EDITOR ─── */}
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/[0.08] bg-surface p-8 max-w-4xl mx-auto space-y-6 text-left"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
              {isEditing === "new" ? "Create Premium SEO Post" : "Edit Digital Identity Article"}
            </h3>
            <button onClick={() => setIsEditing(null)} className="text-xs text-gray-400 hover:text-white uppercase font-bold px-3 py-1.5 rounded bg-white/[0.03] border border-white/[0.04] cursor-pointer">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Article Title</label>
              <input
                type="text" placeholder="e.g. How to Buy Premium Telegram Usernames Safely"
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                  if (isEditing === "new") setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                }}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">URL Slug</label>
              <input type="text" placeholder="buy-telegram-usernames-securely" value={formSlug} onChange={(e) => setFormSlug(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Category</label>
              <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none">
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
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Read Time</label>
              <input type="text" placeholder="6 min read" value={formReadTime} onChange={(e) => setFormReadTime(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none" />
            </div>
            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold select-none cursor-pointer">
                <input type="checkbox" checked={formFeatured} onChange={(e) => setFormFeatured(e.target.checked)} className="rounded bg-raised border border-white/[0.08] text-emerald-600 focus:ring-0 cursor-pointer h-4 w-4" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-300 font-bold select-none cursor-pointer">
                <input type="checkbox" checked={formStatus === "draft"} onChange={(e) => setFormStatus(e.target.checked ? "draft" : "published")} className="rounded bg-raised border border-white/[0.08] text-emerald-600 focus:ring-0 cursor-pointer h-4 w-4" />
                Draft
              </label>
            </div>
          </div>

          <div className="border border-emerald-500/10 bg-emerald-500/[0.01] p-4 rounded-xl space-y-4">
            <h4 className="text-[11px] font-bold text-gray-300 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-500" /> AEO, GEO & SEO Parameters
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1">SEO Title</label>
                <input type="text" placeholder="Primary Instagram Valuation Guide | IDsvault" value={formMetaTitle} onChange={(e) => setFormMetaTitle(e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-white/[0.06] text-white focus:border-emerald-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1">Meta Description (155 chars)</label>
                <input type="text" placeholder="Keep under 160 characters." value={formMetaDescription} onChange={(e) => setFormMetaDescription(e.target.value)} className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-white/[0.06] text-white focus:border-emerald-500/50 outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono mb-1.5">Introduction</label>
            <textarea rows={3} placeholder="Write a high-authority research paragraph..." value={formIntro} onChange={(e) => setFormIntro(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-emerald-500/50 outline-none leading-relaxed" />
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">GEO Direct Answer Block</label>
              <HelpCircle className="h-3 w-3 text-gray-500" />
            </div>
            <textarea rows={2} placeholder="Concise direct response for AI search extractors..." value={formDirectAnswer} onChange={(e) => setFormDirectAnswer(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-amber-500/[0.02] border border-amber-500/20 text-white focus:border-amber-500/50 outline-none leading-relaxed" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Article Sections</label>
              <div className="flex gap-2">
                {(["heading2", "paragraph", "list"] as const).map(type => (
                  <button key={type} type="button" onClick={() => addFormSection(type)}
                    className={`text-[9px] font-bold uppercase px-2 py-1 rounded border transition-all cursor-pointer ${
                      type === "heading2" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20" :
                      type === "paragraph" ? "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20" :
                      "text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                    }`}
                  >
                    + {type === "heading2" ? "H2" : type === "paragraph" ? "Para" : "List"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {formSections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-surface border border-white/[0.04] space-y-3 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-white/[0.05] text-gray-400">Block {idx + 1}: {sec.type}</span>
                    <button type="button" onClick={() => removeFormSection(idx)} className="text-red-400 hover:text-red-300 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  {sec.type === "list" ? (
                    <div className="space-y-2">
                      {sec.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2">
                          <span className="text-[10px] text-gray-500 pt-2 font-mono">•</span>
                          <input type="text" placeholder="Bullet item..." value={item} onChange={(e) => updateFormSectionListItem(idx, itemIdx, e.target.value)} className="flex-grow px-3 py-1.5 text-xs rounded bg-raised border border-white/[0.06] text-white focus:outline-none focus:border-purple-500/40" />
                        </div>
                      ))}
                      <button type="button" onClick={() => addFormSectionListItem(idx)} className="text-[9px] font-bold text-purple-400 uppercase tracking-widest pl-4 hover:translate-x-1 transition-transform cursor-pointer">+ Add Item</button>
                    </div>
                  ) : (
                    <textarea rows={sec.type === "heading2" || sec.type === "heading3" ? 1 : 3} placeholder={sec.type === "heading2" ? "Section heading..." : "Body copy..."} value={sec.content || ""} onChange={(e) => updateFormSectionText(idx, e.target.value)} className="w-full px-3 py-2 text-xs rounded bg-raised border border-white/[0.06] text-white focus:outline-none focus:border-blue-500/40 leading-relaxed" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-white/[0.05]">
            <button onClick={() => setIsEditing(null)} className="h-10 px-5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white rounded-lg transition-all cursor-pointer">Discard</button>
            <button onClick={handleSaveCMS} className="h-10 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer">Publish Post</button>
          </div>
        </motion.div>

      ) : activeSlug && activePost ? (
        // ─────────────────────────────────────────
        // ARTICLE VIEW
        // ─────────────────────────────────────────
        <article className="max-w-4xl mx-auto text-left font-sans animate-in duration-300">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-gray-500 text-[10px] font-mono tracking-wide uppercase select-none mb-6">
            <button onClick={() => navigate("/")} className="hover:text-blue-400 cursor-pointer transition-colors">Home</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => { setActiveSlug(null); setActiveCategory("All"); }} className="hover:text-blue-400 cursor-pointer transition-colors">Journal</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => { setActiveSlug(null); setActiveCategory(activePost.category); }} className={`cursor-pointer transition-colors font-bold ${getCatStyle(activePost.category).text}`}>
              {activePost.category}
            </button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-500 truncate max-w-[180px]">{activePost.title}</span>
          </nav>

          {/* Back */}
          <button
            onClick={() => { setActiveSlug(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="group flex items-center gap-2 text-xs text-gray-400 hover:text-white uppercase font-bold tracking-wider transition-colors cursor-pointer select-none mb-8"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </button>

          {/* Article header */}
          <header className="mb-8 space-y-4">
            {/* Category badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full border ${getCatStyle(activePost.category).text} ${getCatStyle(activePost.category).bg} ${getCatStyle(activePost.category).border}`}>
              {activePost.category}
            </span>

            <h1 className="text-3xl md:text-[2.25rem] font-extrabold text-white tracking-tight leading-[1.15]">
              {activePost.title}
            </h1>

            {/* Author / meta bar */}
            <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold select-none ${getCatStyle(activePost.category).bg} ${getCatStyle(activePost.category).text} border ${getCatStyle(activePost.category).border}`}>
                  {activePost.author.avatar}
                </div>
                <div className="leading-tight">
                  <p className="text-[13px] text-white font-semibold">{activePost.author.name}</p>
                  <p className="text-[10px] text-gray-500">{activePost.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                <Calendar className="h-3.5 w-3.5" /><span>{activePost.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
                <Clock className="h-3.5 w-3.5" /><span>{activePost.readTime}</span>
              </div>

              {/* Read progress chip */}
              {readProgress > 0 && (
                <span className="text-[10px] font-mono text-gray-500 tabular-nums">{readProgress}% read</span>
              )}

              {/* Share */}
              <div className="ml-auto flex items-center gap-2">
                <button onClick={handleCopyLink} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] text-[10px] font-mono font-bold text-gray-300 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0">
                  {copiedSlug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedSlug ? "Copied!" : "Copy"}
                </button>
                <button onClick={() => handleShareSocial("twitter")} className="h-8 w-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white cursor-pointer active:scale-95 shrink-0" title="Share on X">
                  <Twitter className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          {/* Two-column layout: content + sticky sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-10">

            {/* Main content */}
            <div className="space-y-7 min-w-0">

              {/* Mobile TOC */}
              <div className="md:hidden p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Contents</h4>
                <ol className="text-xs space-y-2 text-blue-400">
                  {activePost.sections.filter(s => s.type === "heading2").map((s, i) => (
                    <li key={i}>
                      <a href={`#toc-sec-${i}`} className="hover:underline flex items-start gap-2">
                        <span className="font-mono text-gray-600 shrink-0">{String(i + 1).padStart(2, "0")}.</span>
                        <span>{s.content}</span>
                      </a>
                    </li>
                  ))}
                  {activePost.faqs.length > 0 && (
                    <li><a href="#faq" className="hover:underline flex items-start gap-2"><span className="font-mono text-gray-600 shrink-0">—</span><span>FAQ</span></a></li>
                  )}
                </ol>
              </div>

              {/* Introduction */}
              <p className="text-[15px] text-gray-200 font-medium leading-[1.75] select-text">
                {activePost.introduction}
              </p>

              {/* Direct answer callout */}
              {activePost.directAnswer && (
                <div className="relative rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] p-5 overflow-hidden select-text">
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full" />
                  <div className="flex items-center gap-2 mb-2 select-none pl-2">
                    <Zap className="h-[15px] w-[15px] text-blue-400" />
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest font-mono">AI Direct Answer</span>
                  </div>
                  <p className="text-[13.5px] text-gray-200 leading-relaxed font-normal pl-2">
                    {activePost.directAnswer}
                  </p>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-5">
                {(() => {
                  let h2Count = 0;
                  return activePost.sections.map((sec, idx) => {
                    switch (sec.type) {
                      case "heading2": {
                        const n = h2Count++;
                        return (
                          <h2
                            key={idx}
                            id={`toc-sec-${n}`}
                            className="pt-6 text-[1.3rem] font-bold text-white tracking-tight scroll-mt-20 flex items-start gap-3 border-b border-white/[0.05] pb-3"
                          >
                            <span className="text-[11px] font-mono text-gray-600 tabular-nums mt-1.5 shrink-0">{String(n + 1).padStart(2, "0")}</span>
                            <span>{sec.content}</span>
                          </h2>
                        );
                      }
                      case "heading3":
                        return <h3 key={idx} className="pt-3 text-[1.05rem] font-semibold text-white tracking-tight">{sec.content}</h3>;
                      case "paragraph":
                        return <p key={idx} className="text-[14.5px] text-gray-300 leading-[1.8] select-text">{sec.content}</p>;
                      case "list":
                        return (
                          <ul key={idx} className="space-y-2.5 pl-2 select-text">
                            {sec.items?.map((item, idy) => (
                              <li key={idy} className="flex gap-3 text-[14px] text-gray-300 leading-relaxed">
                                <span className={`font-mono font-bold text-[11px] shrink-0 mt-[3px] tabular-nums ${getCatStyle(activePost.category).text}`}>{String(idy + 1).padStart(2, "0")}.</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      case "quote":
                        return (
                          <blockquote key={idx} className="pl-5 border-l-2 border-blue-500/60 py-2 text-gray-300 italic bg-white/[0.01] rounded-r-lg p-4 select-text text-[14px] leading-relaxed">
                            {sec.content}
                          </blockquote>
                        );
                      case "table":
                        return (
                          <div key={idx} className="overflow-x-auto rounded-xl border border-white/[0.07] bg-surface my-2 select-text">
                            <table className="min-w-[560px] w-full text-left border-collapse text-[12.5px]">
                              <thead>
                                <tr className="border-b border-white/[0.08] bg-white/[0.025]">
                                  {sec.columns?.map((col, c_idx) => (
                                    <th key={c_idx} className="p-3.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/[0.04]">
                                {sec.rows?.map((row, r_idx) => (
                                  <tr key={r_idx} className="hover:bg-white/[0.015] transition-colors">
                                    {row.map((cell, cell_idx) => (
                                      <td key={cell_idx} className="p-3.5 text-gray-300 leading-normal">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      case "cta":
                        return (
                          <div key={idx} className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-4">
                            <div>
                              <h4 className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-1">{sec.subtitle || "Sourcing Alert"}</h4>
                              <p className="text-[13px] text-gray-300 max-w-lg leading-relaxed">{sec.content}</p>
                            </div>
                            <button onClick={() => { navigate("/advisory"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-[10px] text-white font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0">
                              Launch Request
                            </button>
                          </div>
                        );
                      default:
                        return null;
                    }
                  });
                })()}
              </div>

              {/* FAQ accordion */}
              {activePost.faqs.length > 0 && (
                <div id="faq" className="pt-8 border-t border-white/[0.06] space-y-3 scroll-mt-20">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                    <HelpCircle className="h-5 w-5 text-blue-400" />
                    Frequently Asked Questions
                  </h3>
                  {activePost.faqs.map((faq, i) => {
                    const isOpen = activeFaqIndex === i;
                    return (
                      <div key={i} className={`rounded-xl border transition-colors overflow-hidden ${isOpen ? "border-white/[0.10] bg-white/[0.02]" : "border-white/[0.05] bg-canvas"}`}>
                        <button
                          onClick={() => setActiveFaqIndex(isOpen ? null : i)}
                          className="w-full p-4 text-left flex justify-between items-center gap-4 hover:bg-white/[0.015] transition-colors cursor-pointer select-none"
                        >
                          <span className="text-[13.5px] font-semibold text-white leading-snug">{faq.question}</span>
                          <ChevronDown className={`h-4 w-4 text-gray-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="border-t border-white/[0.05] px-4 pb-4 pt-3 text-[13.5px] text-gray-400 select-text leading-[1.75] bg-white/[0.01]"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] text-[11px] text-gray-500 leading-relaxed">
                <strong className="text-gray-400">Safety & Regulatory Notice:</strong> IDsvault is an independent digital identity broker facilitating supervised transfer agreements. We hold no affiliation with Instagram, Twitter/X, Telegram, or any parent organisations. Transactions are secured through broker-held payment with supervised live transfer.
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden md:block">
              <div className="sticky top-24 space-y-5">

                {/* TOC */}
                <div className="rounded-2xl border border-white/[0.06] bg-canvas/80 backdrop-blur-md p-5 space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Contents</h4>
                  <ol className="space-y-2.5">
                    {activePost.sections.filter(s => s.type === "heading2").map((s, i) => (
                      <li key={i}>
                        <a
                          href={`#toc-sec-${i}`}
                          className="flex items-start gap-2 text-[11.5px] text-gray-400 hover:text-white transition-colors leading-snug group"
                        >
                          <span className="font-mono text-[10px] text-gray-600 tabular-nums mt-[2px] shrink-0 group-hover:text-blue-500 transition-colors">{String(i + 1).padStart(2, "0")}.</span>
                          <span className="border-l border-white/[0.06] pl-2 group-hover:border-blue-500/50 transition-colors">{s.content}</span>
                        </a>
                      </li>
                    ))}
                    {activePost.faqs.length > 0 && (
                      <li>
                        <a href="#faq" className="flex items-start gap-2 text-[11.5px] text-gray-400 hover:text-white transition-colors leading-snug group">
                          <span className="font-mono text-[10px] text-gray-600 tabular-nums mt-[2px] shrink-0">—</span>
                          <span className="border-l border-white/[0.06] pl-2 group-hover:border-blue-500/50 transition-colors">FAQ</span>
                        </a>
                      </li>
                    )}
                  </ol>
                </div>

                {/* CTA */}
                <div className="rounded-2xl border border-white/[0.06] bg-canvas/80 backdrop-blur-md p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Broker Desk Live
                  </div>
                  <p className="text-[11.5px] text-gray-400 leading-relaxed">
                    Looking for a specific handle? Our advisory desk sources off-market identities on request.
                  </p>
                  <button
                    onClick={() => { navigate("/advisory"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Start Acquisition
                  </button>
                </div>

              </div>
            </aside>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-10 border-t border-white/[0.06] space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-[18px] w-[18px] text-blue-500" />
                Related Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedPosts.map((post) => {
                  const cs = getCatStyle(post.category);
                  return (
                    <div
                      key={post.id}
                      onClick={() => { setActiveSlug(post.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`group relative border border-white/[0.06] hover:border-white/[0.12] bg-surface p-5 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between overflow-hidden hover:shadow-xl ${cs.glow}`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cs.gradient}`} />
                      <div className="space-y-2 pt-2">
                        <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border inline-block ${cs.text} ${cs.bg} ${cs.border}`}>{post.category}</span>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">{post.title}</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{post.introduction}</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono pt-3 border-t border-white/[0.04] mt-3">
                        <span>{post.publishedAt}</span>
                        <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform uppercase font-bold text-[8px] tracking-wider">Read <ChevronRight className="h-3 w-3" /></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </article>

      ) : (
        // ─────────────────────────────────────────
        // BLOG LISTING VIEW
        // ─────────────────────────────────────────
        <div className="space-y-10">

          {/* Search + filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search guides — valuation, transfers, KYC, fraud, legal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-3 text-sm rounded-xl bg-surface border border-white/[0.08] text-white focus:border-blue-500/40 outline-none placeholder-gray-600"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-3.5 text-[9px] text-gray-400 hover:text-white uppercase font-bold font-mono">✕</button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 select-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const cs = getCatStyle(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 text-[10px] uppercase tracking-wider font-mono font-bold rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? `${cs.bg} ${cs.text} ${cs.border}`
                        : "bg-surface text-gray-500 border-white/[0.05] hover:text-gray-200 hover:border-white/[0.1]"
                    }`}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-1.5 opacity-50">{posts.filter(p => p.category === cat && p.status === "published").length}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured hero */}
          {featuredPost && activeCategory === "All" && !searchQuery && (() => {
            const cs = getCatStyle(featuredPost.category);
            return (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveSlug(featuredPost.slug)}
                className={`group relative border border-white/[0.08] hover:border-white/[0.14] bg-surface rounded-2xl p-7 md:p-9 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer text-left ${cs.glow}`}
              >
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cs.gradient}`} />
                {/* Subtle background gradient */}
                <div className={`absolute top-0 right-0 w-96 h-96 opacity-[0.03] rounded-full blur-3xl bg-gradient-to-br ${cs.gradient} pointer-events-none`} />

                <div className="relative flex flex-col md:flex-row gap-8 justify-between">
                  <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5 select-none">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[9px] font-mono font-bold uppercase rounded-full">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        Featured
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${cs.text} ${cs.bg} ${cs.border}`}>{featuredPost.category}</span>
                    </div>

                    <h2 className="text-2xl md:text-[1.85rem] font-extrabold text-white group-hover:text-blue-300 transition-colors tracking-tight leading-[1.2]">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[13.5px] text-gray-400 max-w-2xl leading-[1.7] line-clamp-2">
                      {featuredPost.introduction}
                    </p>

                    <div className="flex flex-wrap items-center gap-5 text-[11px] text-gray-500 font-mono pt-2 border-t border-white/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span className="font-sans font-semibold text-gray-400">{featuredPost.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><span>{featuredPost.publishedAt}</span></div>
                      <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /><span>{featuredPost.readTime}</span></div>
                    </div>
                  </div>

                  <div className="md:w-44 shrink-0 rounded-xl border border-white/[0.06] group-hover:border-blue-500/20 bg-black/30 flex flex-col justify-center items-center gap-2 p-6 select-none transition-all">
                    <div className={`p-3 rounded-full border ${cs.bg} ${cs.border}`}>
                      <Eye className={`h-5 w-5 ${cs.text}`} />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest mt-1 ${cs.text}`}>Read Guide</span>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Article grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-20 border border-dashed border-white/[0.06] rounded-2xl text-center space-y-3 max-w-md mx-auto">
              <AlertCircle className="h-8 w-8 text-gray-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">No articles found</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Try different search terms or reset the category filter.</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-2 px-4 py-2 rounded-lg bg-white/[0.04] text-[10px] text-gray-300 uppercase tracking-wider font-bold hover:bg-white/[0.08] transition-colors cursor-pointer">
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Results count */}
              {(searchQuery || activeCategory !== "All") && (
                <p className="text-[11px] text-gray-500 font-mono -mt-4">
                  {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""}
                  {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                  {searchQuery ? ` for "${searchQuery}"` : ""}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedPosts.map((post, idx) => {
                  const cs = getCatStyle(post.category);
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.04, 0.25) }}
                      onClick={() => { setActiveSlug(post.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`group relative border border-white/[0.06] hover:border-white/[0.12] bg-surface rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col hover:shadow-xl ${cs.glow}`}
                      id={`article_card_${post.slug}`}
                    >
                      {/* Category accent line */}
                      <div className={`h-[3px] bg-gradient-to-r ${cs.gradient} shrink-0`} />

                      <div className="p-5 flex flex-col flex-grow gap-4">
                        <div className="flex justify-between items-center select-none">
                          <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${cs.text} ${cs.bg} ${cs.border}`}>
                            {post.category}
                          </span>
                          {post.status === "draft" && (
                            <span className="text-[8px] font-mono font-bold uppercase text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">DRAFT</span>
                          )}
                        </div>

                        <div className="flex-grow space-y-2">
                          <h3 className="text-[13.5px] font-bold text-white group-hover:text-blue-300 transition-colors leading-snug tracking-tight">
                            {post.title}
                          </h3>
                          <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2">
                            {post.introduction}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-gray-600 font-mono select-none">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1"><Clock className="h-3 w-3" /><span>{post.readTime}</span></div>
                            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /><span>{post.publishedAt.slice(0, 7)}</span></div>
                          </div>

                          {cmsMode ? (
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button onClick={() => handleBeginCMS(post)} className="h-6 w-6 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/25 transition-colors cursor-pointer" title="Edit"><Edit className="h-3 w-3" /></button>
                              <button onClick={(e) => handleDeletePost(post.id, e)} className="h-6 w-6 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-colors cursor-pointer" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                          ) : (
                            <span className={`flex items-center gap-0.5 group-hover:translate-x-1 transition-transform uppercase font-bold text-[8px] tracking-widest ${cs.text}`}>
                              Read <ChevronRight className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 select-none">
                  <button
                    onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={currentPage === 1}
                    className="h-9 px-5 rounded-lg border border-white/[0.08] text-xs font-bold text-gray-400 hover:text-white hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <span className="text-[11px] text-gray-500 font-mono px-3">
                    {currentPage} / {totalPages}
                  </span>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const page = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
                    return (
                      <button
                        key={page}
                        onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`h-9 w-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          page === currentPage ? "bg-blue-600 text-white border border-blue-500/30" : "border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/[0.15]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={currentPage === totalPages}
                    className="h-9 px-5 rounded-lg border border-white/[0.08] text-xs font-bold text-gray-400 hover:text-white hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
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
