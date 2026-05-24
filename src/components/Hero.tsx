/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  BadgeCheck, 
  Users, 
  ArrowUpRight, 
  ChevronRight,
  Fingerprint,
  FileCheck2,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Building2,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { formatINR, initialListings } from "../data";
import { Platform } from "../types";

interface HeroProps {
  onNavigate: (view: string) => void;
  onSelectListing?: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectListing }) => {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Handle of the Week Selection
  const handleOfTheWeek = initialListings[0]; // @apex or @quantum

  const featuredListings = initialListings.slice(0, 6);

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  const faqsData = [
    {
      q: "How are sellers verified?",
      a: "Sellers undergo intensive, mandatory due diligence audits. To list a handle in our active ledger, our team performs bio-challenge token validations, verifies creation history logs, and coordinates identity verification. We ensure the listing owner is original and possesses sole authorized clearance to transfer administrative rights."
    },
    {
      q: "What if transfer fails?",
      a: "Our Refund Policy guarantees full protection. In the highly unlikely event that a credentials transition fails or gets blocked during the swap window, our desk cancels the deal sequence immediately. Since we hold the funds directly in our designated broker account, we issue a 100% refund back to the buyer's payment coordinates within 24 business hours."
    },
    {
      q: "Why pay IDsvault instead of the seller?",
      a: "Paying sellers directly is extremely risky; they can take the money and delete their accounts. By funding IDsvault's designated business broker account, your money stays frozen in safe custody. The seller is only paid after you log in, claim full ownership, and activate 2FA under our live, supervised transfer session."
    },
    {
      q: "Are you affiliated with Instagram/X/Telegram?",
      a: "No. IDsvault is a strictly independent, private digital identity brokerage coordination desk. We are NOT affiliated, endorsed, associated, or officially connected with Meta, Instagram, X Corp, Twitter, Telegram, or Discord. All platform names and symbols belong purely to their respective intellectual property holders."
    },
    {
      q: "Do you guarantee future access?",
      a: "No. Platforms like Instagram, X, and Telegram enforce strict terms against raw profile trading and reserve absolute rights to suspend, reclaim, or change any username at their discretion. IDsvault operates as a transaction facilitation desk. Once the administrative credentials successfully transition to the buyer under our live oversight on the call, IDsVault's custody liability concludes entirely. We provide zero subsequent access guarantees."
    },
    {
      q: "What if seller is fake?",
      a: "If a seller fails our bio challenges, refuses to sign standard intellectual property assignment contracts, or backs out from our live supervised call, we instantly terminate the deal and return 100% of the holds to the buyer cleanly without fees."
    },
    {
      q: "How long do deals take?",
      a: "Most micro-transactions or simple handle handovers require 1 to 3 business days for complete buyer routing, account audits, and ledger confirmation. More complex multi-asset or high-AOV acquisitions requiring legal trademark reviews may take 5 to 7 business days under customized contracts."
    },
    {
      q: "What qualifies as premium?",
      a: "We exclusively catalog short, high-prestige, and brandable digital assets. This includes single-word dictionary terms, 2-3 letter short acronyms, highly active first-generation handles (OG), and authoritative category identifiers that simplify digital trademarking and brand discoverability."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#0A0A0B] text-[#F5F5F7] font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[5%] w-[450px] h-[450px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[3%] w-[400px] h-[400px] bg-blue-500/3 blur-[100px] rounded-full pointer-events-none" />

      {/* 1. HERO MAIN HEADER HEADER SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left main text column */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Factual Origin Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex flex-wrap items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-[#141416] text-[#F5F5F7] font-sans text-[10px] select-none"
          >
            <span className="font-bold text-white uppercase tracking-wider">Broker Holds Funds</span>
            <span className="text-gray-600 font-mono">•</span>
            <span className="font-bold text-[#D4AF37] uppercase tracking-wider">Hyderabad, India</span>
            <span className="text-gray-600 font-mono">•</span>
            <span className="font-bold text-blue-400 uppercase tracking-wider">482 Handles Transferred</span>
          </motion.div>

          <div className="space-y-3">
            {/* Story-driven headline and kicker */}
            <p className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest leading-none">
              OFF-MARKET DIGITAL NAMESPACES
            </p>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Buy the handle. <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F2D06B] to-amber-500 bg-clip-text text-transparent">
                Skip the scam.
              </span>
            </motion.h1>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Broker-verified Instagram, X, and Telegram usernames. Your money stays with the broker until the transfer is done — on a live call, with both parties present.
            </p>
          </div>

          {/* Quick Dual Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <button
              onClick={() => onNavigate("browse")}
              className="group relative w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              id="hero_primary_cta"
            >
              <span>Explore Verified Registry</span>
              <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("sell")}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#141416] hover:bg-[#1A1A1E] border border-[#2A2A2E] hover:border-[#D4AF37]/30 text-gray-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              id="hero_secondary_cta"
            >
              <span>Liquidate My Handle</span>
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>
          </motion.div>

          {/* Trust Chips Grid */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3 text-xs text-gray-400 font-medium border-t border-[#2A2A2E]/60">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
              <span>Full Custody Auditing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-blue-400 shrink-0" />
              <span>Supervised Live Transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4.5 w-4.5 text-emerald-450 shrink-0" />
              <span>UPI & Imps Secure Holds</span>
            </div>
          </div>

        </div>

        {/* Right column:curated Handle of the Week */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <div className="relative w-full max-w-sm p-6 rounded-2xl bg-[#141416] border border-[#2A2A2E] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5 overflow-hidden">
            
            {/* Curated Gold Ribbon */}
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-black font-mono font-bold text-[8px] uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              FEATURED HANDLE
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">HANDLE OF THE WEEK</span>
              <h3 className="text-3xl font-extrabold text-white font-mono tracking-tight text-left">@{handleOfTheWeek.username}</h3>
              <p className="text-[10px] text-gray-500 text-left">Platform: Instagram • Organic Niche Premium Domain</p>
            </div>

            <div className="border-t border-[#2A2A2E] pt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">Verification State</span>
                <span className="text-xs font-bold text-[#30D158] bg-[#30D158]/5 border border-[#30D158]/15 px-2 py-0.5 rounded uppercase">Verified Ownership</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium">Original Credentials</span>
                <span className="text-xs font-bold text-blue-400 font-mono">Original OG Mail</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-1">
                <span className="text-gray-400 font-medium">Corporate Target Price</span>
                <span className="text-base font-black text-[#D4AF37] font-mono">{formatINR(handleOfTheWeek.askingPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectListing?.(handleOfTheWeek.slug)}
              className="w-full h-11 rounded-xl bg-white/[0.04] hover:bg-[#D4AF37]/10 border border-[#2A2A2E] hover:border-[#D4AF37]/35 text-white hover:text-[#D4AF37] text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Acquire This Handle</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </section>

      {/* 2. WHY NOT DEAL DIRECTLY (THE PROBLEM VS SOLUTIONS) */}
      <section className="bg-gradient-to-b from-[#0A0A0B] to-[#121214] border-t border-[#2A2A2E] py-20 px-6 relative" id="why_not_deal_directly">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest leading-none">
              RISK ASSESSMENT MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Why you should never deal directly on social handles.
            </h2>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              Direct peer-to-peer digital trades are structurally built for asymmetrical fraud. Without a supervising neutral party holding the funds and auditing the transition, the risk of capital loss is nearly absolute.
            </p>
          </div>

          {/* Premium High-Fidelity Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-red-500/20 active:scale-[0.99] transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform duration-300">
                <Fingerprint className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  Seller Verification Issue
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  In unverified forums/DMs, scammers routinely impersonate genuine handle holders using fabricated profile records, stolen bio credentials, or altered screenshots to extract advance deposits.
                </p>
                <p className="text-[11px] text-[#30D158] font-bold font-mono pt-1">
                  IDsvault Shield: Strict bio-challenge audits verify actual owner records before listing.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-blue-500/20 active:scale-[0.99] transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-300">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  Human Broker Supervision Deficit
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  Automated swaps can trigger automated platform security blocks. Meanwhile, unmonitored sellers key in OGE (Original Email) alerts to pull the handle back immediately after a handover.
                </p>
                <p className="text-[11px] text-[#30D158] font-bold font-mono pt-1">
                  IDsvault Shield: Real brokers coordinate the handover live on a supervised private call.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-[#D4AF37]/20 active:scale-[0.99] transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  Structured Payment Workflow Gaps
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  Sending advance wire or cryptocurrency directly to a stranger's account means zero safety margins. Receipts are forged, communication channels are blocked, and funds remain irrecoverable.
                </p>
                <p className="text-[11px] text-[#30D158] font-bold font-mono pt-1">
                  IDsvault Shield: Funds sit in our designated domestic broker account until you verify full login.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-emerald-500/20 active:scale-[0.99] transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                  Reduced Scam Exposure Moat
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  P2P swap deals ignore complex anti-bot precautions, leaving valuable usernames vulnerable to high-speed registry snatchers the second they are temporarily released.
                </p>
                <p className="text-[11px] text-[#30D158] font-bold font-mono pt-1">
                  IDsvault Shield: Safe release scheduling and multi-device coordination shields transitions.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUST STRIP STRIP SECTION */}
      <section className="border-y border-[#2A2A2E] bg-[#141416]/50 py-8 px-6 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] text-[#D4AF37]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Broker Trust Holdings</h4>
              <p className="text-[11px] text-gray-500 leading-normal">INR held in segregated client accounts</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] text-blue-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">₹4.2 Crore Brokered</h4>
              <p className="text-[11px] text-gray-500 leading-normal">High-ticket Indian transactions resolved</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] text-emerald-400">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Hyderabad Hub Desk</h4>
              <p className="text-[11px] text-gray-500 leading-normal">Operational in Madhapur Hi-Tech City</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0A0A0B] border border-[#2A2A2E] text-purple-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Established 2024</h4>
              <p className="text-[11px] text-gray-500 leading-normal">Pioneering social brand relocations</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED INVENTORY (REAL PRICES, NO BLANK LABELS) */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">Active Stock Ledger</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Curated Premium Listings</h2>
            <p className="text-xs text-gray-400">Vetted original origin handles with immediate transfer capabilities.</p>
          </div>
          <button
            onClick={() => onNavigate("browse")}
            className="text-xs font-bold text-[#D4AF37] hover:text-[#F2D06B] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View Complete Registry ({initialListings.length} Assets)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((item) => (
            <div 
              key={item.id}
              className="p-5 rounded-xl bg-[#141416] border border-[#2A2A2E] hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <span className="inline-block px-2 py-0.5 rounded bg-white/[0.03] text-[9px] text-[#D4AF37] font-mono font-bold uppercase tracking-wider mb-2">
                    {item.platform.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold text-white font-mono leading-none group-hover:text-[#D4AF37] transition-colors">@{item.username}</h3>
                  <p className="text-[10px] text-gray-500 mt-1">{item.category}</p>
                </div>
                {item.status === "OFFER_PENDING" ? (
                  <span className="text-[8px] bg-amber-500/15 text-amber-500 border border-amber-500/25 px-1.5 py-0.5 rounded font-bold uppercase">Offer Pending</span>
                ) : (
                  <span className="text-[8px] bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/15 px-1.5 py-0.5 rounded font-bold uppercase">Live Supervised</span>
                )}
              </div>

              <p className="text-xs text-gray-400 text-left leading-relaxed mt-2 h-10 overflow-hidden line-clamp-2">
                {item.description}
              </p>

              <div className="border-t border-[#2A2A2E] pt-3.5 flex justify-between items-center mt-auto">
                <div className="text-left">
                  <p className="text-[8px] text-gray-500 uppercase font-mono font-semibold">Broker Clearance Target</p>
                  <p className="text-base font-extrabold text-white font-mono mt-0.5">
                    {item.askingPrice > 0 ? formatINR(item.askingPrice) : "Price on Request"}
                  </p>
                </div>
                <button
                  onClick={() => onSelectListing?.(item.slug)}
                  className="h-8.5 px-4 rounded-lg bg-[#0A0A0B] hover:bg-[#D4AF37] border border-[#2A2A2E] hover:border-[#D4AF37] text-white hover:text-black text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Acquire Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 WHY BROKER SECURED HOLDS MATTER (SAFETY GUARANTEE) */}
      <section className="py-16 px-6 bg-black border-y border-[#2A2A2E]">
        <div className="max-w-4xl mx-auto text-left gap-8 grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 text-[#30D158] text-[9px] uppercase tracking-wider font-bold">
              <ShieldCheck className="h-4 w-4 text-[#30D158]" />
              <span>Broker Safety Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug font-sans">
              Why Broker holds make or break deal handovers.
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-normal">
              We hold the buyer's balance in an isolated Indian corporate broker account. 
              <strong> No transfer, no payout.</strong> Funds are never dispersed to the seller until the buyer confirms full console login, clears 2FA ties, and establishes absolute identity authority. 
              If the seller tries to pull back or ghosts, we issue a <strong>100% refund guarantee</strong>.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.04] space-y-3 font-mono text-[11.5px] text-gray-400 select-none">
            <p className="text-[#D4AF37] font-extrabold pb-1">THE IDSVAULT RULES OF THE DESK:</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#D4AF37] font-bold">1.</span>
              <span>Buyer locks funds at designated UPI / bank clearance desk.</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-blue-400 font-bold">2.</span>
              <span>Seller verifies clean ownership under administrative audit.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="font-bold">3.</span>
              <span>Immediate release after 2FA credentials transition completes.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3.8 HOW SELLER VERIFICATION WORKS (TRUST PROOF) */}
      <section className="bg-gradient-to-b from-[#121214] to-[#0A0A0B] py-20 px-6 relative" id="seller_verification_works">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest leading-none">
              DUE DILIGENCE BLUEPRINT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              How Seller Verification Works
            </h2>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              Vague promises do not build real financial trust. We enforce a granular, strictly audited verification process on every social media resource and seller profile prior to inclusion in our marketplace database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-[#D4AF37]/30 transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                <Fingerprint className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest font-bold">STAGE 01</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Ownership Proof Audit
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  Sellers must verify active operational custody by submitting to real-time biography-challenge checks. We issue a dynamic broker token string that must be inserted into the handle's profile bio within a 15-minute window for automated scanning.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-blue-500/30 transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-300">
                <FileCheck2 className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-blue-400 tracking-widest font-bold">STAGE 02</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Manual Desk Moderation
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  Our professional desk brokers in Hyderabad inspect the handle's historic data. Any sign of bot-manipulated reach, artificial follower inflation, or inactive content drops leads to instant application rejection without appeal.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-[#30D158]/30 transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-[#30D158] group-hover:scale-105 transition-transform duration-300">
                <BadgeCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#30D158] tracking-widest font-bold">STAGE 03</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Transition Validation
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  Before any deal is presented to premium corporate buyers, we audit original creation details. We map the OGE (Original Email address) registry timeline, verify the presence of phone linkages, and establish a secure, multi-party handover plan.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141416] to-[#0E0E10] border border-[#2A2A2E] hover:border-red-500/30 transition-all duration-300 space-y-4 text-left group">
              <div className="h-10 w-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-red-400 tracking-widest font-bold">STAGE 04</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                  Active Fraud Screening
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
                  We check each handle against public and private blacklists, tracking reports of theft, social engineering hijackings, or trademark challenges. This ensures buyers only purchase assets with pristine legal standing.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. HOW SECURE DEALS WORK section */}
      <section className="bg-[#141416] border-y border-[#2A2A2E] py-20 px-6" id="secure_deals_workflow">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">TRANSACTION ARCHITECTURE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">How Secure Deals Work</h2>
            <p className="text-xs text-[#8E8E93] max-w-lg mx-auto">
              IDsvault acts as an independent professional clearing desk. Below is the chronological, step-by-step master lifecycle of our supervised broker deals.
            </p>
          </div>

          {/* 6-Step Chronological Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-[#D4AF37]/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-[#D4AF37] text-black font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">01</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">INITIATION</span>
                <h3 className="font-bold text-sm text-white font-sans">Buyer Starts Secure Deal</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  The buyer selects a validated marketplace handle of interest or submits a confidential target sourcing order through our Hyderabad broker desk to engage negotiations.
                </p>
              </div>
            </article>

            {/* Step 2 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-blue-500/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-blue-500 text-white font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">02</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-blue-400 tracking-widest uppercase font-bold">DUE DILIGENCE</span>
                <h3 className="font-bold text-sm text-white font-sans">Seller Ownership Verified</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  Our brokers issue strict bio-challenges, check historic logs, and require token check challenges to guarantee the seller has exclusive operational rights.
                </p>
              </div>
            </article>

            {/* Step 3 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-yellow-500/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-yellow-500 text-black font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">03</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-yellow-400 tracking-widest uppercase font-bold">SECURITY FUNDING</span>
                <h3 className="font-bold text-sm text-white font-sans">Buyer Pays Broker</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  The buyer transmits transaction funds to IDsvault's designated business trust account. We freeze the funds securely in custody, isolated from company operations.
                </p>
              </div>
            </article>

            {/* Step 4 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-indigo-500/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-indigo-500 text-white font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">04</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-indigo-400 tracking-widest uppercase font-bold">MIGRATION SESSION</span>
                <h3 className="font-bold text-sm text-white font-sans">Seller Transfers Live</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  Under manual, hand-supervised live call guidance, the seller coordinates the username transition with both parties present, bypassing platform automated blocks.
                </p>
              </div>
            </article>

            {/* Step 5 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-[#30D158]/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-[#30D158] text-black font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">05</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-[#30D158] tracking-widest uppercase font-bold">VALIDATION</span>
                <h3 className="font-bold text-sm text-white font-sans">Buyer Confirms Full Control</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  The buyer signs into the target console, establishes secure multi-factor ties (2FA), updates secondary credentials, and verifies exclusive ownership access.
                </p>
              </div>
            </article>

            {/* Step 6 */}
            <article className="p-6 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4 text-left relative group hover:border-emerald-500/30 transition-colors duration-300">
              <span className="absolute -top-4 left-6 h-8 w-8 rounded-lg bg-emerald-500 text-white font-mono font-black border border-[#2A2A2E] flex items-center justify-center text-xs shadow-lg">06</span>
              <div className="pt-2 text-left space-y-2">
                <span className="text-[8px] font-mono text-emerald-400 tracking-widest uppercase font-bold">DISPLACEMENT</span>
                <h3 className="font-bold text-sm text-white font-sans">Seller Gets Paid</h3>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed font-sans font-normal">
                  Once custody is fully resolved, confirmed, and verified, the broker coordinates direct domestic UPI or SWIFT clearance payouts to the seller's coordinates.
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* 5. AEO DEFINITION BOX & SECURE COMPARISONS MATRIX */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-left space-y-4 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-widest">
            AEO Snippet Box & Safety matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Why direct peer-to-peer digital trades are critical financial threats
          </h2>
          {/* Definition Box */}
          <div className="border-l-3 border-[#D4AF37] bg-[#141416] p-5 text-xs text-gray-300 leading-relaxed rounded-r-lg">
            <strong>Definition: Direct Username Hijacking</strong> occurs when an un-brokered transaction seller recovers the social media account coordinates using original, unaltered owner verification linkages immediately after receiving buyer payment. Peer-to-peer deals contain zero legal mediation layers or payout safety mechanisms to freeze fraud.
          </div>
        </div>

        {/* Comparison grid table */}
        <div className="overflow-x-auto rounded-xl border border-[#2A2A2E] bg-[#141416]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#2A2A2E] bg-[#0A0A0B]/80 font-mono text-[10px] uppercase text-[#D4AF37] tracking-wider">
                <th className="p-4 font-bold">Transaction Metrics</th>
                <th className="p-4 font-bold">Direct Peer Handshakes (e.g. Forums)</th>
                <th className="p-4 font-bold">IDsvault Broker holding Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2E] text-gray-400 font-medium">
              <tr>
                <td className="p-4 font-semibold text-white">Ownership Vetting</td>
                <td className="p-4 text-red-400">Zero proof required. High fake listings</td>
                <td className="p-4 text-emerald-450">✓ Mandatory cryptographic bio-token challenge</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Payment Custody</td>
                <td className="p-4 text-red-400">Buyer pays advance directly. high runaways risk</td>
                <td className="p-4 text-emerald-450">✓ Held in segregated broker trust transit accounts</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Platform ToS Defense</td>
                <td className="p-4 text-red-400">Automated transitions prompt instant lockouts</td>
                <td className="p-4 text-emerald-450">✓ Hand-supervised transitions via isolated clean IPs</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Contractual Execution</td>
                <td className="p-4 text-red-400">None. Scammers use fake identities</td>
                <td className="p-4 text-emerald-450">✓ Vetted KYC checks & corporate compliance registers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. WHY IDSVAULT: HUMAN CHANNELS, FOUNDER & GST DETAILS */}
      <section className="bg-[#141416]/40 border-t border-[#2A2A2E] py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#141416] border border-[#2A2A2E] p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="space-y-5">
            <span className="text-[9px] font-bold text-[#D4AF37] tracking-widest uppercase font-mono">WHO WE ARE & CORE BUSINESS MOAT</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Who We Are & The Hyderabad Desk</h3>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Founded by <strong>Vinay Naidu</strong>, veteran digital identity counselor, IDsvault maintains dedicated administrative support offices in Madhapur Hi-Tech City, Hyderabad, India.
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
              We vet global transactions securely. Operating under active trade tax registrations, our verification registers are audit-compliant with corporate compliance standards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                <span>GST: 36AAPCV8248M1ZC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                <span>Office Handshakes Welcomed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                <span>Founder Mentorship desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-[#D4AF37] shrink-0" />
                <span>SWIFT Coordinates Audited</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs text-gray-400 font-mono">
            {/* Founder Avatar Simulation Card */}
            <div className="p-5 rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-600 flex items-center justify-center font-bold text-sm text-black shadow-md shadow-[#D4AF37]/10">
                  VN
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-sans leading-none">Vinay Naidu</h4>
                  <p className="text-[10px] text-[#D4AF37] font-mono mt-1">Lead Broker & Sourcing Director</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-450 leading-relaxed font-sans font-normal italic">
                "We launched IDsvault to bring absolute safety to high-AOV identity acquisition. Every deal matches our strict compliance standard."
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0B]/60 border border-[#2A2A2E]">
                <span className="h-2 w-2 rounded-full bg-[#30D158]" />
                <span>Main Hyderabad Desk: ONLINE</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0B]/60 border border-[#2A2A2E]">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span>Broker holds funds: GUARANTEED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 THE FOUNDER'S RISK DISCLOSURE & STORY (FOUNDER'S PLEDGE) */}
      <section className="bg-gradient-to-b from-[#141416] to-[#0A0A0B] border-t border-[#2A2A2E] py-16 px-6 relative">
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">FOUNDER'S NOTE</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">"I built IDsvault because I got burned."</h3>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-normal">
            <p>
              I'm <strong>Vinay Naidu</strong>, Hyderabad-based. I started IDsvault because I got burned on a $400 handle deal in 2023. 
              The transaction seemed smooth in a trusted Telegram group. I sent the USDT, the seller sent the login, and 12 hours later, 
              the seller recovered the account using original creation indicators. The group admin did nothing because they "just matched the buyer and seller."
            </p>
            <p>
              I realized that matchmaking is useless without real oversight. High-value usernames are corporate assets, not forum playthings. 
              IDsVault was established to supervise the transfer step-by-step. If an issue occurs, we handle it immediately. If the deal fails, the buyer receives a 100% refund. 
              Trust is our entire moat, and we back it up with compliant administrative audits.
            </p>
          </div>
          <div className="flex items-center gap-3.5 pt-2 select-none">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-600 flex items-center justify-center font-bold text-xs text-black">
              VN
            </div>
            <div>
              <p className="text-xs font-bold text-white font-sans leading-none">Vinay Naidu</p>
              <p className="text-[10px] text-gray-500 font-mono mt-1">Founder, IDsvault • Madhapur, Hyderabad, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-CONVERSION FAQ ACCORDION GRID FOR GOOGLE SNIPPETS */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold tracking-widest">Q&A Knowledge Library</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Answer Engine Optimization Frequently Asked Questions</h2>
          <p className="text-xs text-gray-450">Factual answers to high-intent search queries concerning digital property acquisitions.</p>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-[#2A2A2E] bg-[#141416]/70 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.01] transition-colors gap-4"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">{faq.q}</h3>
                  <span className={`h-5 w-5 rounded-full bg-[#0A0A0B] border border-[#2A2A2E] flex items-center justify-center text-xs text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#D4AF37]" : ""}`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                
                {/* Expandable Body */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden text-xs text-gray-450 leading-relaxed border-t border-[#2A2A2E]/40 ${
                    isOpen ? "max-h-[300px] p-5 opacity-100 bg-[#0A0A0B]/40" : "max-h-0 opacity-0 py-0 px-5"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL HIGH-CONVERSION CTA BAND */}
      <section className="py-20 px-6 bg-[#0E0E10] border-t border-[#2A2A2E] text-center relative overflow-hidden select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-xl mx-auto space-y-8 relative">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">Ready to secure your digital brand?</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto font-sans leading-relaxed">
              Secure elite namespace placement on Instagram, X, or Telegram today. No escrow risks, hand-supervised handovers, and 100% refund guarantee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("browse")}
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Browse Registry</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("sell")}
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-white/25 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Sell Yours</span>
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
