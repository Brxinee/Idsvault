/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Key,
  Download,
  Clock,
  AlertTriangle,
  Layers3,
  Search,
  KanbanSquare,
  FileSpreadsheet,
  ChevronRight,
  Inbox,
  Filter
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Listing, Lead, SourcingRequest, SystemLog, DealStatus } from "../types";
import { formatINR } from "../data";
import { motion } from "motion/react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface AdminDashboardProps {
  listings: Listing[];
  leads: Lead[];
  requests: SourcingRequest[];
  logs: SystemLog[];
  onUpdateListingStatus: (slug: string, status: DealStatus) => void;
  onAddLog: (action: string, detail: string) => void;
  onAuthChange?: (auth: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  listings,
  leads,
  requests,
  logs,
  onUpdateListingStatus,
  onAddLog,
  onAuthChange
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [roleError, setRoleError] = useState("");

  // Search and filter inside tables
  const [inventorySearch, setInventorySearch] = useState("");
  const [proposalsSearch, setProposalsSearch] = useState("");
  const [kanbanPlatformFilter, setKanbanPlatformFilter] = useState<string>("all");

  // ─── Auth mode detection ────────────────────────────────────────────────────
  // Priority: Supabase (full DB auth) → VITE_ADMIN_PASSWORD (env-var auth)
  const envAdminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || "").trim();
  const useEnvAuth = !isSupabaseConfigured && Boolean(envAdminPassword);

  // Load and subscribe to authentication sessions on mount
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // ── Supabase auth path ──────────────────────────────────────────────────
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setSessionUser(session.user);
          checkAdminRole(session.user.id);
        } else {
          setIsLoading(false);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setSessionUser(session.user);
          checkAdminRole(session.user.id);
        } else {
          setSessionUser(null);
          setIsAuthenticated(false);
          if (onAuthChange) onAuthChange(false);
          setIsLoading(false);
        }
      });

      return () => { subscription.unsubscribe(); };

    } else if (useEnvAuth) {
      // ── Env-var password auth path ──────────────────────────────────────────
      // Restore session from sessionStorage (expires when tab closes)
      const saved = sessionStorage.getItem("idsvault_admin_session");
      if (saved === "authenticated") {
        setIsAuthenticated(true);
        if (onAuthChange) onAuthChange(true);
      }
      setIsLoading(false);

    } else {
      // Neither Supabase nor env password configured
      setIsLoading(false);
    }
  }, []);

  // Secure role checker querying Supabase database
  const checkAdminRole = async (userId: string) => {
    try {
      setIsLoading(true);
      setRoleError("");
      const { data, error } = await supabase!
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile security audit error:", error);
        setRoleError("Access Denied: Your account does not have administrator privileges.");
        setIsAuthenticated(false);
        if (onAuthChange) onAuthChange(false);
      } else if (data && data.role === "admin") {
        setIsAuthenticated(true);
        setRoleError("");
        if (onAuthChange) onAuthChange(true);
      } else {
        setRoleError("Access Denied: Your account does not have administrator privileges.");
        setIsAuthenticated(false);
        if (onAuthChange) onAuthChange(false);
      }
    } catch (err) {
      console.error(err);
      setRoleError("Security verification failed. Please refresh and try again.");
      setIsAuthenticated(false);
      if (onAuthChange) onAuthChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    setRoleError("");

    if (isSupabaseConfigured && supabase) {
      // ── Supabase sign-in ────────────────────────────────────────────────────
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setLoginError(error.message);
          onAddLog("LOGIN_FAILURE", `Failed login attempt for: ${email}`);
          setIsLoading(false);
        } else {
          onAddLog("ADMIN_AUTHENTICATED", "Administrative console accessed via Supabase session.");
          // onAuthStateChange listener triggers checkAdminRole automatically
        }
      } catch (err) {
        setLoginError("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      }

    } else if (useEnvAuth) {
      // ── Env-var password sign-in ────────────────────────────────────────────
      if (password === envAdminPassword) {
        sessionStorage.setItem("idsvault_admin_session", "authenticated");
        setIsAuthenticated(true);
        if (onAuthChange) onAuthChange(true);
        onAddLog("ADMIN_AUTHENTICATED", "Administrative console accessed via environment credentials.");
      } else {
        setLoginError("Incorrect password. Please try again.");
        onAddLog("LOGIN_FAILURE", "Failed env-password admin login attempt.");
      }
      setIsLoading(false);

    } else {
      // Nothing configured
      setLoginError("Admin access is not configured. Set VITE_ADMIN_PASSWORD (or VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY) in your Vercel environment variables.");
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    if (supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem("idsvault_admin_session");
    setSessionUser(null);
    setIsAuthenticated(false);
    if (onAuthChange) onAuthChange(false);
    onAddLog("ADMIN_SESSION_CLOSED", "Admin session closed voluntarily.");
    setIsLoading(false);
  };

  /**
   * Escapes a value for safe CSV inclusion.
   * Wraps in double-quotes and escapes any embedded double-quotes.
   */
  const csvEscape = (value: string | number | null | undefined): string => {
    const str = value === null || value === undefined ? "" : String(value);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const triggerCSVDownload = (type: "listings" | "proposals" | "requests") => {
    // Guard: only allow authenticated admins to export
    if (!isAuthenticated) {
      console.error("CSV export blocked: user is not authenticated.");
      return;
    }

    let rows: string[][] = [];
    const fileName = `idsvault_export_${type}_${Date.now()}.csv`;

    if (type === "listings") {
      rows.push(["ID", "Username", "Platform", "Asking Price", "Min Price", "Status", "Created Time"]);
      listings.forEach((v) => {
        rows.push([v.id, v.username, v.platform, String(v.askingPrice), String(v.minPrice), v.status, v.createdTime]);
      });
    } else if (type === "proposals") {
      rows.push(["ID", "Listing", "Buyer Name", "Email", "WhatsApp", "Offer Price", "Urgency", "Status"]);
      leads.forEach((v) => {
        rows.push([v.id, v.listingSlug, v.buyerName, v.buyerEmail, v.whatsapp, String(v.offer), v.urgency, v.status]);
      });
    } else if (type === "requests") {
      rows.push(["ID", "Desired", "Platform", "Budget", "Urgency", "Alternatives", "WhatsApp", "Email"]);
      requests.forEach((v) => {
        rows.push([v.id, v.desiredUsername, v.platform, String(v.budget), v.urgency, v.alternatives, v.whatsapp, v.email]);
      });
    }

    const output = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const encoded = "data:text/csv;charset=utf-8," + encodeURIComponent(output);
    const trigger = document.createElement("a");
    trigger.setAttribute("href", encoded);
    trigger.setAttribute("download", fileName);
    document.body.appendChild(trigger);
    trigger.click();
    document.body.removeChild(trigger);
    onAddLog("CSV_EXPORTED", `Catalog dataset [${type.toUpperCase()}] downloaded to CSV archive.`);
  };

  const handleStatusShift = async (slug: string, newStatus: DealStatus) => {
    // Update local state immediately for responsive UI
    onUpdateListingStatus(slug, newStatus);
    onAddLog("STATUS_MODIFIED", `Vetted handle @${slug} status adjusted to: [${newStatus}]`);

    // Persist to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from("listings")
          .update({ status: newStatus })
          .eq("slug", slug);
        if (error) {
          console.error("Failed to persist status update to database:", error.message);
          onAddLog("STATUS_SYNC_ERROR", `DB sync failed for @${slug}: ${error.message}`);
        }
      } catch (err) {
        console.error("Unexpected error persisting status update:", err);
      }
    }
  };

  // Filtered inventory elements for tabular search
  const filteredInventoryTable = useMemo(() => {
    return listings.filter(item => 
      item.username.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.platform.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.id.includes(inventorySearch)
    );
  }, [listings, inventorySearch]);

  // Filtered proposals list for CRM tracker
  const filteredProposalsTable = useMemo(() => {
    return leads.filter(lead =>
      lead.buyerName.toLowerCase().includes(proposalsSearch.toLowerCase()) ||
      lead.listingSlug.toLowerCase().includes(proposalsSearch.toLowerCase()) ||
      lead.buyerEmail.toLowerCase().includes(proposalsSearch.toLowerCase())
    );
  }, [leads, proposalsSearch]);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-6 py-32 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-blue-500 border-white/10 animate-spin" />
        <p className="text-xs text-gray-400 font-sans">Verifying security credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 select-none">
        <motion.article 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-surface border border-white/[0.08] space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
          
          <header className="text-center space-y-2 font-sans">
            <span className="p-3 rounded-xl bg-blue-500/10 text-blue-500 inline-block mb-1 border border-blue-500/20">
              <Key className="h-5 w-5" />
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Login</h1>
            <p className="text-[10px] text-gray-400 font-medium">Verify credentials and manage transactions securely.</p>
          </header>

          <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-sans"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded bg-red-500/5 border border-red-500/10 text-[10px] text-red-400 font-medium flex items-center gap-1.5 leading-relaxed">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {roleError && (
              <div className="p-3 rounded bg-yellow-500/5 border border-yellow-500/10 text-[10px] text-yellow-400 font-medium flex items-center gap-1.5 leading-relaxed">
                <ShieldAlert className="h-4 w-4 text-yellow-500 shrink-0" />
                <span>{roleError}</span>
              </div>
            )}

            {/* Database config error only shown after a failed submit attempt via loginError */}

            <button
              type="submit"
              className="w-full py-3 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer select-none text-center active:scale-95 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]"
            >
              Sign In
            </button>
          </form>
        </motion.article>
      </div>
    );
  }

  // Calculate high-end static financial metrics for the workspace
  const totalValuation = listings.reduce((sum, item) => sum + item.askingPrice, 0);
  const totalOffersCount = leads.length;
  const pendingRequestsCount = requests.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 text-left">
      
      {/* Executive Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.06] pb-6 font-sans">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight animate-in">Registry CRM Terminal</h1>
          <p className="text-xs text-muted mt-1">Manual operations pipeline control, asset validation, and secure CSV logs export.</p>
        </div>
        <div className="flex items-center gap-3 select-none">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase text-emerald-400">
            <ShieldCheck className="h-4 w-4 animate-pulse text-[#10B981]" />
            Session Audit Active
          </span>
          <button
            onClick={handleLogout}
            className="h-8 px-4 rounded-lg border border-white/[0.08] text-[10px] text-gray-300 hover:text-white uppercase font-bold transition-all cursor-pointer select-none active:scale-95 text-center"
          >
            Lock Vault Console
          </button>
        </div>
      </header>

      {/* Corporate Dashboard Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
        <div className="p-5 rounded-xl bg-surface border border-white/[0.08] space-y-2">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-mono">Vetted Assets count</span>
          <p className="text-3xl font-extrabold text-white font-mono leading-none">{listings.length}</p>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-white/[0.08] space-y-2">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-mono">Book Value Assets</span>
          <p className="text-2xl font-extrabold text-[#10B981] font-mono leading-none">{formatINR(totalValuation)}</p>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-white/[0.08] space-y-2">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-mono">Proposals Recorded</span>
          <p className="text-3xl font-extrabold text-white font-mono leading-none">{totalOffersCount}</p>
        </div>
        <div className="p-5 rounded-xl bg-surface border border-white/[0.08] space-y-2">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block font-mono">Commission Searches</span>
          <p className="text-3xl font-extrabold text-blue-400 font-mono leading-none">{pendingRequestsCount}</p>
        </div>
      </section>

      {/* STATUS KANBAN BOARD */}
      <section className="p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-sans">
              <KanbanSquare className="h-4 w-4 text-blue-400" />
              Interactive Deal Flow Pipeline
            </h3>
            <p className="text-[11px] text-muted font-sans">Instantly advance identifiers through distinct transaction lifecycle coordinates.</p>
          </div>

          {/* Quick Platform Filter */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <Filter className="h-3.5 w-3.5 text-gray-500" />
            <select
              value={kanbanPlatformFilter}
              onChange={(e) => setKanbanPlatformFilter(e.target.value)}
              className="bg-raised border border-white/[0.08] text-white py-1 px-2 rounded-lg text-[10px] outline-none cursor-pointer"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="x">X / Twitter</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>
        </div>

        {/* 4 Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Column 1: LIVE */}
          <div className="rounded-xl bg-raised/80 p-4 space-y-3.5 min-h-[220px]">
            <header className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">● LIVE INDEX</span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">
                ({listings.filter(v => v.status === DealStatus.Live && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter)).length})
              </span>
            </header>
            <div className="space-y-2">
              {listings
                .filter(v => v.status === DealStatus.Live && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter))
                .map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-surface border border-white/[0.06] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">@{item.username}</span>
                      <span className="text-[8px] uppercase tracking-wider font-mono text-blue-400 bg-blue-500/10 px-1.5 rounded">{item.platform}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-white/[0.04]">
                      <span className="font-mono">{formatINR(item.askingPrice)}</span>
                      <button 
                        onClick={() => handleStatusShift(item.slug, DealStatus.OfferPending)}
                        className="text-blue-400 hover:text-white flex items-center gap-0.5 text-[9px] font-bold cursor-pointer"
                      >
                        Bids <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: OFFERS PENDING */}
          <div className="rounded-xl bg-raised/80 p-4 space-y-3.5 min-h-[220px]">
            <header className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">● ACTIVE BIDS</span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">
                ({listings.filter(v => v.status === DealStatus.OfferPending && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter)).length})
              </span>
            </header>
            <div className="space-y-2">
              {listings
                .filter(v => v.status === DealStatus.OfferPending && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter))
                .map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-surface border border-white/[0.06] text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">@{item.username}</span>
                      <span className="text-[8px] uppercase tracking-wider font-mono text-blue-400 bg-blue-500/10 px-1.5 rounded">{item.platform}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-white/[0.04]">
                      <span className="font-mono text-amber-400">{formatINR(item.askingPrice)}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStatusShift(item.slug, DealStatus.Live)}
                          className="text-gray-500 hover:text-white text-[9px]"
                        >
                          Rev
                        </button>
                        <button 
                          onClick={() => handleStatusShift(item.slug, DealStatus.Sold)}
                          className="text-[#10B981] hover:text-white font-bold text-[9px]"
                        >
                          Sold
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 3: SOLD */}
          <div className="rounded-xl bg-raised/80 p-4 space-y-3.5 min-h-[220px]">
            <header className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">● RELEASED / SOLD</span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">
                ({listings.filter(v => v.status === DealStatus.Sold && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter)).length})
              </span>
            </header>
            <div className="space-y-2">
              {listings
                .filter(v => v.status === DealStatus.Sold && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter))
                .map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-surface border border-white/[0.06] text-xs opacity-65 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white line-through">@{item.username}</span>
                      <span className="text-[8px] uppercase tracking-wider font-mono text-gray-500 bg-white/5 px-1.5 rounded">{item.platform}</span>
                    </div>
                    <p className="text-[9px] text-[#10B981] font-mono font-medium">Released to buyer</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 4: QUARANTINED */}
          <div className="rounded-xl bg-raised/80 p-4 space-y-3.5 min-h-[220px]">
            <header className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono">● QUARANTINED</span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">
                ({listings.filter(v => v.status === DealStatus.Quarantined && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter)).length})
              </span>
            </header>
            <div className="space-y-2">
              {listings
                .filter(v => v.status === DealStatus.Quarantined && (kanbanPlatformFilter === "all" || v.platform === kanbanPlatformFilter))
                .map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-surface border border-white/[0.06] text-xs space-y-1">
                    <span className="font-bold text-red-500">@{item.username}</span>
                    <p className="text-[9px] text-gray-505">Auditing Infractions</p>
                    <button 
                      onClick={() => handleStatusShift(item.slug, DealStatus.Live)}
                      className="text-[9px] text-blue-400 hover:underline cursor-pointer font-bold"
                    >
                      Reinstate
                    </button>
                  </div>
                ))}
            </div>
          </div>

        </div>
      </section>

      {/* Database Inventory & Sourcing Tables System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Listings inventory table - Left (7 cols) */}
        <section className="lg:col-span-7 p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-4">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 font-mono">
              <Layers3 className="h-4 w-4 text-gray-400" />
              Active Catalog Inventory Table
            </h3>
            <button
              onClick={() => triggerCSVDownload("listings")}
              className="text-[9px] font-extrabold uppercase tracking-widest text-[#3B82F6] hover:text-white transition-colors cursor-pointer flex items-center gap-1 border border-blue-500/10 px-2.5 py-1 rounded-md bg-blue-500/5 select-none"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> CSV Export
            </button>
          </header>

          {/* Table Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search catalog entries..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/30 outline-none placeholder:text-gray-600 font-mono"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-gray-500 uppercase tracking-widest text-[9px] font-bold font-mono">
                  <th className="py-2.5">Identifier</th>
                  <th className="py-2.5">Platform</th>
                  <th className="py-2.5">Goal Ask</th>
                  <th className="py-2.5">Current Status</th>
                  <th className="py-2.5 text-right">Quick Modify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-normal font-mono">
                {filteredInventoryTable.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500 text-[11px]">
                      No matching namespaces located in our tables database cache files.
                    </td>
                  </tr>
                ) : (
                  filteredInventoryTable.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition-colors leading-[1.12]">
                      <td className="py-3 font-semibold text-white">@{item.username}</td>
                      <td className="py-3 text-gray-400 capitalize">{item.platform}</td>
                      <td className="py-3 text-[#10B981] font-bold">{formatINR(item.askingPrice)}</td>
                      <td className="py-3">
                        <span className={`text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                          item.status === DealStatus.Live
                             ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                             : item.status === DealStatus.OfferPending
                             ? "text-amber-400 bg-amber-500/5 border-amber-500/10"
                             : "text-gray-400 bg-white/5 border-white/10"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusShift(item.slug, e.target.value as DealStatus)}
                          className="bg-raised border border-white/[0.12] text-white py-1 px-1.5 rounded-md text-[10px] outline-none cursor-pointer"
                        >
                          <option value={DealStatus.Live}>Live</option>
                          <option value={DealStatus.OfferPending}>Offers</option>
                          <option value={DealStatus.Sold}>Mark Sold</option>
                          <option value={DealStatus.Quarantined}>Quarantine</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Custom Sourcing Outreach Campaign tracker - Right (5 cols) */}
        <section className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-4">
          <header className="flex items-center justify-between select-none">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 font-mono">
              <Clock className="h-4 w-4 text-gray-400" />
              Sourcing Campaigns
            </h3>
            <button
              onClick={() => triggerCSVDownload("requests")}
              className="text-[9px] font-extrabold uppercase tracking-widest text-blue-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-gray-500 uppercase tracking-widest text-[9px] font-bold font-mono">
                  <th className="py-2.5">Desired Target</th>
                  <th className="py-2.5">Platform</th>
                  <th className="py-2.5">Budget Limit</th>
                  <th className="py-2.5">Outreach Node</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-normal font-mono text-[11px] leading-[1.12]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 font-semibold text-white">@{r.desiredUsername}</td>
                    <td className="py-3 text-gray-400 capitalize">{r.platform}</td>
                    <td className="py-3 text-[#10B981] font-bold">{formatINR(r.budget)}</td>
                    <td className="py-3 text-[10px] text-gray-500 uppercase tracking-wide font-bold">{r.urgency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Proposals Pipeline Table */}
        <section className="p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-4">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none font-sans">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 font-mono">
              <Inbox className="h-4 w-4 text-gray-400" />
              Inbound Proposals Pipeline
            </h3>
            <button
              onClick={() => triggerCSVDownload("proposals")}
              className="text-[9px] font-extrabold uppercase tracking-widest text-[#3B82F6] hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
            >
              <Download className="h-3.5 w-3.5" /> Export CSV
            </button>
          </header>

          {/* Proposals search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search incoming leads profiles..."
              value={proposalsSearch}
              onChange={(e) => setProposalsSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/35 outline-none placeholder:text-gray-600 font-mono"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-gray-500 uppercase tracking-widest text-[9px] font-bold font-mono">
                  <th className="py-2.5">Asset</th>
                  <th className="py-2.5">Buyer Corporate</th>
                  <th className="py-2.5">Offer Amount</th>
                  <th className="py-2.5">Outreach Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] font-normal font-mono text-[11px]">
                {filteredProposalsTable.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No proposals index found matching search coordinates.
                    </td>
                  </tr>
                ) : (
                  filteredProposalsTable.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.01] transition-colors leading-[1.12]">
                      <td className="py-3 font-semibold text-blue-400">@{l.listingSlug}</td>
                      <td className="py-3 text-white font-medium">{l.buyerName}</td>
                      <td className="py-3 font-bold text-[#10B981]">{formatINR(l.offer)}</td>
                      <td className="py-3 text-gray-500 font-mono text-[10px]">{l.whatsapp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Live Cryptographic Timeline Audit System Logs */}
        <section className="p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-4">
          <header className="flex items-center justify-between select-none">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 font-mono">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Cryptographic Audit System Logs
            </h3>
          </header>

          <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
            {logs.map((log, index) => (
              <div key={index} className="p-3.5 rounded-xl bg-raised border border-white/[0.04] space-y-1.5 text-[10px] font-mono leading-relaxed">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-1.5">
                  <span className="text-blue-400 font-extrabold uppercase tracking-wider">{log.action}</span>
                  <span className="text-gray-500 text-[8px]">{log.timestamp}</span>
                </div>
                <p className="text-gray-400 font-normal leading-normal">{log.detail}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
