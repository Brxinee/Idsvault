/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";
import { MessageSquare, ShieldCheck } from "lucide-react";
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
import { ContactView } from "./components/ContactView";
import { motion, AnimatePresence } from "motion/react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";

// ─── Route helpers ────────────────────────────────────────────────────────────

/** Maps legacy view names (used by inner components) to URL paths */
function viewToPath(view: string): string {
  if (view.startsWith("policy-")) {
    return `/policy/${view.replace("policy-", "")}`;
  }
  const map: Record<string, string> = {
    home:    "/",
    browse:  "/browse",
    sell:    "/sell",
    request: "/source",
    blog:    "/blog",
    faq:     "/faq",
    contact: "/contact",
    admin:   "/admin",
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

  if (!listing) return <Navigate to="/browse" replace />;

  return (
    <ListingDetail
      listing={listing}
      onSubmitProposal={onAddProposal}
      onNavigateBack={() => navigate("/browse")}
    />
  );
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

  // Consent banner
  const [showConsent, setShowConsent] = useState<boolean>(false);
  useEffect(() => {
    if (!localStorage.getItem("idsvault_consent_shield")) {
      setShowConsent(true);
    }
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const addLog = (action: string, detail: string) => {
    const timeNow = new Date().toISOString().replace("T", " ").slice(0, 19);
    setLogs((prev) => [{ timestamp: timeNow, action: action.toUpperCase(), detail }, ...prev]);
  };

  const handleConsentAnswer = (granted: boolean) => {
    localStorage.setItem("idsvault_consent_shield", granted ? "granted" : "denied");
    setShowConsent(false);
    addLog("CONSENT", `Analytics consent: ${granted ? "granted" : "declined"}`);
  };

  /** Legacy-style navigation used by components that still carry onNavigate prop */
  const handleNavigate = (view: string) => {
    navigate(viewToPath(view));
  };

  const handleSelectListing = (slug: string) => {
    navigate(`/browse/${slug}`);
    addLog("LISTING_VIEW", `Viewed listing: @${slug}`);
    if (typeof window !== "undefined" && (window as any).trackIDsVaultEvent) {
      (window as any).trackIDsVaultEvent("view_item", { item_id: slug, item_category: "username" });
    }
  };

  const handleAddProposal = (offer: number, name: string, email: string, whatsapp: string) => {
    const slug = location.pathname.split("/browse/")[1] ?? "";
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
    <div className="bg-[#050505] text-white min-h-screen flex flex-col selection:bg-blue-500/20 selection:text-white relative font-sans">

      <Navbar onContactBroker={handleDialBroker} />

      <main className="flex-grow pb-24 md:pb-12">
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
              <Route path="/browse"
                element={<RegistryBrowse listings={listings} onSelectListing={handleSelectListing} />}
              />
              <Route path="/browse/:slug"
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
              <Route path="/source"
                element={<SourcingRequestView onRegisterRequest={handleRegisterSourcing} />}
              />
              <Route path="/blog"
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
              <Route path="/faq" element={<RegulatoryInfo segment="faq" />} />
              <Route path="/policy/:segment" element={<PolicyRoute />} />
              {/* Legacy hash-less redirects for old links */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        </Suspense>
      </main>

      <Footer />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.06] md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="text-left leading-tight gap-0.5 font-sans">
              <p className="text-[8px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Desk Online</p>
              <p className="text-xs text-white font-bold font-mono">HYDERABAD</p>
            </div>
          </div>
          <button
            onClick={handleDialBroker}
            className="flex-grow max-w-[200px] h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp Broker</span>
          </button>
        </div>
      </div>

      {/* Consent banner */}
      <AnimatePresence>
        {showConsent && (
          <div className="fixed bottom-22 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[150] p-6 rounded-2xl bg-[#151517]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-4 text-left font-sans">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Analytics Consent</span>
              </h4>
              <p className="text-[10px] text-[#9CA3AF] leading-relaxed font-normal">
                We use Google Analytics to understand how visitors use this site. No personal data is sold or shared with advertisers. You can decline and the site works fully.
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
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-[10px] text-white font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer select-none active:scale-95 text-center"
              >
                Allow Analytics
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
