/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MessageSquare, ShieldCheck, ArrowRight, Lock, Sparkles, X, ChevronRight } from "lucide-react";
import { Platform, DealStatus, Listing, Lead, SourcingRequest, SystemLog, Urgency } from "./types";
import {
  initialListings,
  initialLeads,
  initialRequests,
  initialLogs,
  WHATSAPP_NUMBER,
  SUPPORT_EMAIL,
  buildWhatsAppHandoff,
  formatINR
} from "./data";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { RegistryBrowse } from "./components/RegistryBrowse";
import { ListingDetail } from "./components/ListingDetail";
import { SellApplication } from "./components/SellApplication";
import { SourcingRequest as SourcingRequestView } from "./components/SourcingRequest";
import { AdminDashboard } from "./components/AdminDashboard";
import { RegulatoryInfo } from "./components/RegulatoryInfo";
import { ContactView } from "./components/ContactView";
import { BlogView } from "./components/BlogView";
import { SchemaMarkup } from "./components/SchemaMarkup";
import { KeepDesk } from "./components/KeepDesk";
import { motion, AnimatePresence } from "motion/react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Core Datastores modeled in React status
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [requests, setRequests] = useState<SourcingRequest[]>(initialRequests);
  const [logs, setLogs] = useState<SystemLog[]>(initialLogs);

  // Consent shield state
  const [showConsent, setShowConsent] = useState<boolean>(false);

  // Admin global login state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("idsvault_mock_admin_unlocked") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          supabase
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single()
            .then(({ data }) => {
              if (data && data.role === "admin") {
                setIsAdminLoggedIn(true);
              } else {
                setIsAdminLoggedIn(false);
              }
            });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          supabase
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single()
            .then(({ data }) => {
              if (data && data.role === "admin") {
                setIsAdminLoggedIn(true);
              } else {
                setIsAdminLoggedIn(false);
              }
            });
        } else {
          setIsAdminLoggedIn(localStorage.getItem("idsvault_mock_admin_unlocked") === "true");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("idsvault_consent_shield");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  // Technical SEO Title and Meta Description Engine
  const currentListingForSEO = selectedSlug ? listings.find((item) => item.slug === selectedSlug) : null;
  useEffect(() => {
    let title = "IDsvault | Premium Digital Identity & Username Brokerage";
    let desc = "Secure, broker-assisted premium digital handle and username brokerage marketplace. Hyderabad-based human-guided verification and structured payment workflow.";

    if (currentView === "browse") {
      title = "Premium Username Registry | Instagram, X, Telegram | IDsvault";
      desc = "Browse verified digital namespaces and premium off-market handles on X, Instagram, and Telegram. Hand-audited assets under Hyderabad brokerage custody.";
    } else if (currentView === "listing-detail" && currentListingForSEO) {
      title = `Acquire @${currentListingForSEO.username} Premium Handle | ${currentListingForSEO.platform.toUpperCase()} Brokerage | IDsvault`;
      desc = `Secure the high-value handle @${currentListingForSEO.username} on ${currentListingForSEO.platform.toUpperCase()} with IDsvault security. Live verification and broker-held transfer protection in India.`;
    } else if (currentView === "sell") {
      title = "Sell Premium Usernames & Handles Safely | IDsvault India";
      desc = "Submit your high-value Instagram, Telegram, or X handle for corporate valuation and listing. Premium audience reach under discrete escrow-holding safeguards.";
    } else if (currentView === "request") {
      title = "Custom Username Sourcing Campaigns | IDsvault Bureau";
      desc = "Commission a targeted off-market username acquisition campaign. Our Hyderabad brokers track and secure elite handles with complete anonymity.";
    } else if (currentView === "blog") {
      title = "Digital Brand Strategy Library & Handle Valuations | IDsvault";
      desc = "Read expert articles on digital asset positioning, social username values, trademark risks, the transfer mechanics of OG handles, and compliance updates.";
    } else if (currentView === "contact") {
      title = "Contact Hyderabad Desk | Secure Username Brokerage | IDsvault";
      desc = "Reach out directly to the IDsvault elite desk in Hi-Tech City, Hyderabad. Live WhatsApp support, SWIFT wire coordination, and manual audits.";
    } else if (currentView.startsWith("policy-")) {
      const formatted = currentView.replace("policy-", "").toUpperCase();
      title = `${formatted} Policy & Legal Framework | IDsvault`;
      desc = `Understand the administrative legal guidelines, risk disclosures, refund commitments, and AML/KYC policies for IDsvault digital transactions.`;
    } else if (currentView === "faq") {
      title = "IDsvault FAQs | Secure Handle Trading Questions Answered";
      desc = "Factual answers about social media username transfers, how payment holding works, platform terms of service risks, and Indian banking coordinates.";
    }

    document.title = title;
    
    // Update meta description tag dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }

    // Dynamic JSON-LD structured data script injection
    const existingSchema = document.getElementById("idsvault-jsonld-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemas = [];

    // Organization Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "IDsvault",
      "url": "https://idsvault.com",
      "logo": "https://idsvault.com/logo.png",
      "description": "Hyderabad-based secure secure escrow brokerage coordination desk for high-AOV Instagram, X, and Telegram usernames.",
      "founder": {
        "@type": "Person",
        "name": "Vinay Naidu"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@idsvault.com",
        "contactType": "customer service"
      }
    });

    // WebSite with SearchAction
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "IDsvault",
      "url": "https://idsvault.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://idsvault.com/?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });

    // FAQ Page Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is buying and selling social usernames legal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. While platform Terms of Service technically prohibit handle trading, administrative assignment contracts for intangible branding rights are valid and enforceable in India."
          }
        },
        {
          "@type": "Question",
          "name": "How does the IDsvault broker bank holding work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Buyers transfer funds directly to our secure bank account (UPI / bank transfers). We hold the funds securely in our designated broker account, supervise the transition of credentials live, and credit the seller only after ownership is fully confirmed."
          }
        },
        {
          "@type": "Question",
          "name": "What is the refund timeline if credentials fail to transfer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If seller bio audits fail or platform blocks transition, we immediately cancel the deal and issue a complete 100% refund within 24 business hours."
          }
        }
      ]
    });

    // Product Schema for Current Listing or All Featured
    if (currentListingForSEO) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `@${currentListingForSEO.username} on ${currentListingForSEO.platform.toUpperCase()}`,
        "description": currentListingForSEO.description,
        "offers": {
          "@type": "Offer",
          "price": currentListingForSEO.askingPrice,
          "priceCurrency": "INR",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": {
            "@type": "Country",
            "name": "IN"
          }
        }
      });
    }

    // BreadcrumbList Schema
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "id": "https://idsvault.com/",
        "position": 1,
        "name": "Home"
      }
    ];
    if (currentView !== "home") {
      breadcrumbs.push({
        "@type": "ListItem",
        "id": `https://idsvault.com/#${currentView}`,
        "position": 2,
        "name": currentView.toUpperCase()
      });
    }
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    });

    const script = document.createElement("script");
    script.id = "idsvault-jsonld-schema";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

    // Dynamic OpenGraph/Twitter card tags
    const setMetaTag = (attrName: "property" | "name", attrValue: string, contentValue: string) => {
      let metaNode = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!metaNode) {
        metaNode = document.createElement("meta");
        metaNode.setAttribute(attrName, attrValue);
        document.head.appendChild(metaNode);
      }
      metaNode.setAttribute("content", contentValue);
    };

    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", desc);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", typeof window !== "undefined" ? window.location.href : "https://idsvault.com");
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", desc);

  }, [currentView, currentListingForSEO]);

  const handleConsentAnswer = (granted: boolean) => {
    localStorage.setItem("idsvault_consent_shield", granted ? "granted" : "denied");
    setShowConsent(false);
    addLog("SHIELD_CONSENT", `Privacy Shield preferences configured by client: [${granted ? "GRANTED" : "DECLINED"}]`);
  };

  // Helper logger
  const addLog = (action: string, detail: string) => {
    const timeNow = new Date().toISOString().replace("T", " ").slice(0, 19);
    const newLog: SystemLog = {
      timestamp: timeNow,
      action: action.toUpperCase(),
      detail
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    addLog("NAVIGATION_EVENT", `Client navigated to segment layout: [${view.toUpperCase()}]`);
    
    // GA4 Page View Tracking Link
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("page_view", { 
        page_title: view.toUpperCase(), 
        page_location: window.location.href 
      });
    }
  };

  const handleSelectListing = (slug: string) => {
    setSelectedSlug(slug);
    setCurrentView("listing-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
    addLog("ASSET_VIEW", `Client examined vetted platform ledger coordinates for tag: @${slug}`);

    // GA4 View Item Tracking Link
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("view_item", { 
        item_id: slug, 
        item_category: "username" 
      });
    }
  };

  // Pushes proposal from client side
  const handleAddProposal = (offer: number, name: string, email: string, whatsapp: string) => {
    if (!selectedSlug) return;
    
    // Add lead entry to state
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      listingSlug: selectedSlug,
      buyerName: name,
      buyerEmail: email,
      whatsapp,
      offer,
      urgency: Urgency.Standard,
      notes: "Auto-generated inbound proposal matching portal bidding form inputs.",
      status: "SUBMITTED",
      createdTime: new Date().toISOString()
    };

    setLeads((prev) => [newLead, ...prev]);
    addLog("PROPOSAL_LOGGED", `Proposal bid of ${formatINR(offer)} logged for @${selectedSlug} by representative: ${name}`);

    // Update listing status to offer pending
    setListings((prev) =>
      prev.map((item) =>
        item.slug === selectedSlug ? { ...item, status: DealStatus.OfferPending } : item
      )
    );

    // GA4 Lead Submission Tracking Link
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("generate_lead", { 
        item_id: selectedSlug,
        value: offer,
        currency: "INR"
      });
    }
  };

  // Regists brand new seller list application
  const handleRegisterListing = (username: string, platform: Platform, asking: number, min: number) => {
    const slug = `${platform}-${username.toLowerCase()}`;
    const newListing: Listing = {
      id: `ID-${Math.floor(1000 + Math.random() * 9000).toString()}`,
      username,
      platform,
      category: "Off-Market Client Target",
      askingPrice: asking,
      minPrice: min,
      status: DealStatus.Live,
      description: `Premium single word dictionary handle on ${platform.toUpperCase()} under contract. Unaltered original credentials status verified.`,
      slug,
      createdTime: new Date().toISOString()
    };

    setListings((prev) => [newListing, ...prev]);
    addLog("LISTING_APPLICATION", `Application to list high-value identifier @${username} on ${platform.toUpperCase()} with ${formatINR(asking)} target recorded.`);

    // GA4 Register Listing event tracking
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("submit_listing", { 
        username, 
        platform, 
        asking_price: asking 
      });
    }
  };

  // Regists a discrete off-market sourcing request demand
  const handleRegisterSourcing = (
    desiredUsername: string,
    platform: Platform,
    budget: number,
    urgency: Urgency,
    alternatives: string
  ) => {
    const newReq: SourcingRequest = {
      id: `req-${Date.now()}`,
      desiredUsername,
      platform,
      budget,
      urgency,
      alternatives,
      whatsapp: "Recorded Coordination Key",
      email: "Vetted Corporate Mail Node",
      createdTime: new Date().toISOString()
    };

    setRequests((prev) => [newReq, ...prev]);
    addLog("SOURCING_CAMPAIGN", `Discrete sourcing outreach commissioned for @${desiredUsername} on ${platform.toUpperCase()} with limit budget of ${formatINR(budget)}.`);

    // GA4 Submit Sourcing event tracking
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("submit_sourcing", { 
        username: desiredUsername, 
        platform, 
        budget 
      });
    }
  };

  // Status transitions
  const handleUpdateListingStatus = (slug: string, status: DealStatus) => {
    setListings((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, status } : item))
    );
  };

  // Quick WhatsApp sticky click
  const handleDialBroker = () => {
    const phrase = "Hello IDsvault Hyderabad desk. Sourcing representative is looking to coordinate private off-market transaction handovers.";
    const launch = buildWhatsAppHandoff(phrase);
    window.open(launch.url, "_blank");
    addLog("STICKY_BROKER_TAP", "Direct WhatsApp hotline triggered from mobile sticky panel.");

    // GA4 Dialog event tracking
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("contact_whatsapp", { 
        context: "sticky_mobile_cta" 
      });
    }
  };

  // Find listing for detail
  const activeListing = selectedSlug ? listings.find((item) => item.slug === selectedSlug) : null;

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen flex flex-col selection:bg-blue-500/20 selection:text-white relative font-sans">
      <SchemaMarkup view={currentView} activeListing={activeListing} />
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onContactBroker={handleDialBroker}
      />

      {/* Main Dynamic Viewport Frame */}
      <main className="flex-grow pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedSlug || "")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {currentView === "home" && (
              <Hero 
                onNavigate={handleNavigate} 
                onSelectListing={handleSelectListing} 
              />
            )}

            {currentView === "browse" && (
              <RegistryBrowse listings={listings} onSelectListing={handleSelectListing} />
            )}

            {currentView === "listing-detail" && activeListing && (
              <ListingDetail
                listing={activeListing}
                onSubmitProposal={handleAddProposal}
                onNavigateBack={() => handleNavigate("browse")}
              />
            )}

            {currentView === "sell" && (
              <SellApplication onRegisterListing={handleRegisterListing} />
            )}

            {currentView === "request" && (
              <SourcingRequestView onRegisterRequest={handleRegisterSourcing} />
            )}

            {currentView === "keep" && (
              <KeepDesk />
            )}

            {currentView === "admin" && (
              <AdminDashboard
                listings={listings}
                leads={leads}
                requests={requests}
                logs={logs}
                onUpdateListingStatus={handleUpdateListingStatus}
                onAddLog={addLog}
                onAuthChange={setIsAdminLoggedIn}
              />
            )}

            {currentView === "blog" && (
              <BlogView 
                onNavigate={handleNavigate} 
                onBrowseListing={(slug) => { setSelectedSlug(slug); setCurrentView("listing-detail"); }} 
                isAdmin={isAdminLoggedIn}
              />
            )}

            {currentView.startsWith("policy-") && (
              <RegulatoryInfo segment={currentView as any} />
            )}

            {currentView === "faq" && (
              <RegulatoryInfo segment="faq" />
            )}

            {currentView === "contact" && (
              <ContactView onBackToHome={() => setCurrentView("home")} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Regulatory Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Universal Mobile Sticky Coordinator CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.06] md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="text-left leading-tight gap-0.5 font-sans">
              <p className="text-[8px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Operations Live</p>
              <p className="text-xs text-white font-bold font-mono">HYDERABAD DESK</p>
            </div>
          </div>
          <button
            onClick={handleDialBroker}
            className="flex-grow max-w-[200px] h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10 active:scale-95 text-center"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Connect Desk</span>
          </button>
        </div>
      </div>

      {/* Preference Drawer */}
      <AnimatePresence>
        {showConsent && (
          <div className="fixed bottom-22 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[150] p-6 rounded-2xl bg-[#151517]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-4 text-left font-sans">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-blue-500" />
                <span>Privacy Shield Guidelines</span>
              </h4>
              <p className="text-[10px] text-[#9CA3AF] leading-relaxed font-normal">
                IDsVault uses strictly isolated, in-memory logs to manage live re-linking sessions. No browser files are aggregated or sent to third-party ad registries.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-1 select-none">
              <button
                onClick={() => handleConsentAnswer(false)}
                className="px-3 py-1.5 text-[10px] text-gray-400 hover:text-white uppercase font-bold tracking-wider cursor-pointer font-sans"
              >
                Decline
              </button>
              <button
                onClick={() => handleConsentAnswer(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-[10px] text-white font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer select-none ring-1 ring-blue-400/20 active:scale-95 text-center"
              >
                Agree & Trust
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
