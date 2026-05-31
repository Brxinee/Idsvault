/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Platform, DealStatus, Listing, Lead, SourcingRequest, SystemLog, Urgency } from "./types";
import {
  initialListings,
  initialLeads,
  initialRequests,
  initialLogs,
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
// Heavy components lazy-loaded to reduce initial bundle
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const BlogView       = lazy(() => import("./components/BlogView").then(m => ({ default: m.BlogView })));
import { RegulatoryInfo } from "./components/RegulatoryInfo";
import { AboutPage } from "./components/AboutPage";
import { ContactView } from "./components/ContactView";
import { ProcessPage } from "./components/ProcessPage";
import { TrustPage } from "./components/TrustPage";
import { KeepDesk } from "./components/KeepDesk";
import { CookieConsent } from "./components/CookieConsent";
import { ScreenshotGuard } from "./components/ScreenshotGuard";
import { motion, AnimatePresence } from "motion/react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

// ─── Route helpers ────────────────────────────────────────────────────────────

/** Maps legacy view names (used by inner components) to URL paths */
function viewToPath(view: string): string {
  if (view.startsWith("policy-")) {
    return `/policy/${view.replace("policy-", "")}`;
  }
  const map: Record<string, string> = {
    home:      "/",
    browse:    "/inventory",
    inventory: "/inventory",
    sell:      "/sell",
    request:   "/advisory",
    source:    "/advisory",
    advisory:  "/advisory",
    blog:      "/journal",
    journal:   "/journal",
    faq:       "/faq",
    about:     "/about",
    process:   "/process",
    trust:     "/trust",
    contact:   "/contact",
    admin:     "/admin",
    keep:      "/keep",
  };
  return map[view] ?? "/";
}

// ─── Sub-route wrappers ───────────────────────────────────────────────────────

interface ListingDetailRouteProps {
  listings: Listing[];
  onAddProposal: (offer: number, name: string, email: string, whatsapp: string) => void;
  onAddLog: (action: string, detail: string) => void;
}

function ListingDetailRoute({ listings, onAddProposal, onAddLog }: ListingDetailRouteProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const listing = listings.find((l) => l.slug === slug);

  useEffect(() => {
    if (listing) {
      onAddLog("LISTING_VIEW", `Viewed listing: @${listing.slug}`);
    }
  }, [listing?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!listing) return <Navigate to="/inventory" replace />;

  return (
    <ListingDetail
      listing={listing}
      onSubmitProposal={onAddProposal}
      onNavigateBack={() => navigate("/inventory")}
    />
  );
}

/** Redirect /browse/:slug → /asset/:slug */
function BrowseSlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/asset/${slug}`} replace />;
}

function PolicyRoute() {
  const { segment } = useParams<{ segment: string }>();
  const valid = [
    "terms",
    "privacy",
    "refund",
    "dispute",
    "risk-disclosure",
    "aml-kyc",
    "sanctions",
    "cookie-policy",
    "dmca",
    "grievance",
    "accessibility",
    "imprint"
  ] as const;
  type Seg = typeof valid[number];

  if (!segment || !(valid as readonly string[]).includes(segment)) {
    return <Navigate to="/" replace />;
  }

  return <RegulatoryInfo segment={`policy-${segment as Seg}` as any} />;
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Core data stores
  const [listings,  setListings]  = useState<Listing[]>(initialListings);
  const [leads,     setLeads]     = useState<Lead[]>(initialLeads);
  const [requests,  setRequests]  = useState<SourcingRequest[]>(initialRequests);
  const [logs,      setLogs]      = useState<SystemLog[]>(initialLogs);

  // Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Analytics / logging on route changes
  useEffect(() => {
    addLog("NAVIGATION", `Route: ${location.pathname}`);
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("page_view", {
        page_title: location.pathname,
        page_location: window.location.href,
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Supabase auth
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          supabase.from("users").select("role").eq("id", session.user.id).single()
            .then(({ data }) => setIsAdminLoggedIn(data?.role === "admin"));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          supabase.from("users").select("role").eq("id", session.user.id).single()
            .then(({ data }) => setIsAdminLoggedIn(data?.role === "admin"));
        } else {
          setIsAdminLoggedIn(false);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const addLog = (action: string, detail: string) => {
    const timeNow = new Date().toISOString().replace("T", " ").slice(0, 19);
    setLogs((prev) => [{ timestamp: timeNow, action: action.toUpperCase(), detail }, ...prev]);
  };

  /** Legacy-style navigation used by components that still carry onNavigate prop */
  const handleNavigate = (view: string) => {
    navigate(viewToPath(view));
  };

  const handleSelectListing = (slug: string) => {
    navigate(`/asset/${slug}`);
    addLog("LISTING_VIEW", `Viewed listing: @${slug}`);
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("view_item", { item_id: slug, item_category: "username" });
    }
  };

  const handleAddProposal = (offer: number, name: string, email: string, whatsapp: string) => {
    const slug = location.pathname.split("/asset/")[1] ?? location.pathname.split("/browse/")[1] ?? "";
    if (!slug) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      listingSlug: slug,
      buyerName: name,
      buyerEmail: email,
      whatsapp,
      offer,
      urgency: Urgency.Standard,
      notes: "Inbound offer from listing page.",
      status: "SUBMITTED",
      createdTime: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);
    setListings((prev) =>
      prev.map((item) => item.slug === slug ? { ...item, status: DealStatus.OfferPending } : item)
    );
    addLog("OFFER_SUBMITTED", `Offer of ${formatINR(offer)} for @${slug} from: ${name}`);

    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("generate_lead", { item_id: slug, value: offer, currency: "INR" });
    }
  };

  const handleRegisterListing = (username: string, platform: Platform, asking: number, min: number) => {
    const slug = `${platform}-${username.toLowerCase()}`;
    const newListing: Listing = {
      id: `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      username,
      platform,
      category: "Off-Market Client Target",
      askingPrice: asking,
      minPrice: min,
      status: DealStatus.Live,
      description: `Premium single-word handle on ${platform} under broker contract. Ownership verified.`,
      slug,
      createdTime: new Date().toISOString(),
    };
    setListings((prev) => [newListing, ...prev]);
    addLog("LISTING_SUBMITTED", `Listing application: @${username} on ${platform} asking ${formatINR(asking)}`);
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("submit_listing", { username, platform, asking_price: asking });
    }
  };

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
      whatsapp: "Recorded",
      email: "Recorded",
      createdTime: new Date().toISOString(),
    };
    setRequests((prev) => [newReq, ...prev]);
    addLog("SOURCING_SUBMITTED", `Sourcing request: @${desiredUsername} on ${platform}, budget ${formatINR(budget)}`);
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("submit_sourcing", { username: desiredUsername, platform, budget });
    }
  };

  const handleUpdateListingStatus = (slug: string, status: DealStatus) => {
    setListings((prev) => prev.map((item) => item.slug === slug ? { ...item, status } : item));
  };

  const handleDialBroker = () => {
    const phrase = "Hi IDsvault, I'd like to discuss buying or selling a username. Please contact me.";
    const launch = buildWhatsAppHandoff(phrase);
    window.open(launch.url, "_blank");
    addLog("WHATSAPP_CTA", "WhatsApp CTA tapped from mobile sticky bar.");
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("contact_whatsapp", { context: "sticky_mobile_cta" });
    }
  };

  const featuredListings = listings.filter((l) => l.status === DealStatus.Live).slice(0, 4);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="text-white min-h-screen flex flex-col selection:bg-blue-500/20 selection:text-white relative font-sans">

      {/* Drifting ambient glow — gold + blue radial fields behind all content */}
      <div className="ambient" aria-hidden="true" />

      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-canvas focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider"
      >
        Skip to content
      </a>

      <Navbar onContactBroker={handleDialBroker} />

      <main id="main-content" className="flex-grow pb-24 md:pb-12">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="h-5 w-5 rounded-full border-2 border-white/10 border-t-blue-500 animate-spin" />
          </div>
        }>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/"
                element={
                  <Hero
                    featuredListings={featuredListings}
                    onSelectListing={handleSelectListing}
                    onNavigate={handleNavigate}
                  />
                }
              />

              {/* ── Primary routes (new URL structure) ── */}
              <Route path="/inventory"
                element={<RegistryBrowse listings={listings} onSelectListing={handleSelectListing} />}
              />
              <Route path="/asset/:slug"
                element={
                  <ListingDetailRoute
                    listings={listings}
                    onAddProposal={handleAddProposal}
                    onAddLog={addLog}
                  />
                }
              />
              <Route path="/sell"
                element={<SellApplication onRegisterListing={handleRegisterListing} />}
              />
              <Route path="/advisory"
                element={<SourcingRequestView onRegisterRequest={handleRegisterSourcing} />}
              />
              <Route path="/journal"
                element={
                  <BlogView
                    onNavigate={handleNavigate}
                    onBrowseListing={handleSelectListing}
                    isAdmin={isAdminLoggedIn}
                  />
                }
              />
              <Route path="/journal/:slug"
                element={
                  <BlogView
                    onNavigate={handleNavigate}
                    onBrowseListing={handleSelectListing}
                    isAdmin={isAdminLoggedIn}
                  />
                }
              />
              <Route path="/contact" element={<ContactView />} />
              <Route path="/admin"
                element={
                  <AdminDashboard
                    listings={listings}
                    leads={leads}
                    requests={requests}
                    logs={logs}
                    onUpdateListingStatus={handleUpdateListingStatus}
                    onAddLog={addLog}
                    onAuthChange={setIsAdminLoggedIn}
                  />
                }
              />
              <Route path="/keep"    element={<KeepDesk />} />
              <Route path="/about"   element={<AboutPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/trust"   element={<TrustPage />} />
              <Route path="/faq" element={<RegulatoryInfo segment="faq" />} />
              <Route path="/policy/:segment" element={<PolicyRoute />} />
              <Route path="/policy/acceptable-use" element={<RegulatoryInfo segment="policy-acceptable-use" />} />
              <Route path="/policy/trademark" element={<RegulatoryInfo segment="policy-trademark" />} />

              {/* ── Legacy redirects (backward compat) ── */}
              <Route path="/browse" element={<Navigate to="/inventory" replace />} />
              <Route path="/browse/:slug" element={<BrowseSlugRedirect />} />
              <Route path="/source" element={<Navigate to="/advisory" replace />} />
              <Route path="/blog" element={<Navigate to="/journal" replace />} />
              <Route path="/listing/:slug" element={<BrowseSlugRedirect />} />

              {/* ── Catch-all ── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        </Suspense>
      </main>

      <Footer />

      {/* DPDPA 2023 cookie consent banner */}
      <CookieConsent />

      {/* Best-effort screenshot / capture protection */}
      <ScreenshotGuard />

      {/* Mobile sticky CTA — Browse / Sell dual buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-canvas/95 backdrop-blur-xl border-t border-white/[0.06] md:hidden">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          <a
            href="/inventory"
            className="h-11 rounded-xl bg-accent hover:bg-accent-light text-canvas text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
            onClick={(e) => { e.preventDefault(); navigate("/inventory"); }}
          >
            Browse Handles
          </a>
          <a
            href="/sell"
            className="h-11 rounded-xl bg-surface border border-[#26262B] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
            onClick={(e) => { e.preventDefault(); navigate("/sell"); }}
          >
            Sell Yours
          </a>
        </div>
      </div>

      {/* WhatsApp floating button — desktop */}
      <a
        href="https://wa.me/919392974031?text=Hi+IDsvault%2C+I+want+to+buy+or+sell+a+handle"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 h-12 w-12 items-center justify-center rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95"
        aria-label="Contact IDsvault on WhatsApp"
        title="WhatsApp Broker"
      >
        <MessageSquare className="h-5 w-5 text-white" />
      </a>

    </div>
  );
}
