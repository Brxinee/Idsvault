/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
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
  Workflow,
  Sparkles,
  ShieldAlert,
  ArrowRightLeft
} from "lucide-react";
import { motion } from "motion/react";
import { formatINR } from "../data";

interface HeroProps {
  onNavigate: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsData = [
    {
      step: "01",
      title: "Buyer Starts Secure Deal",
      desc: "Buyer submits an offer or custom campaign parameters to initiate a proposals ticket with our designated desk.",
      icon: <Lock className="h-5 w-5 text-blue-500" />
    },
    {
      step: "02",
      title: "Seller Ownership Verified",
      desc: "Broker validates possession of the digital handle using active token check bio hashes or audited submission files.",
      icon: <Fingerprint className="h-5 w-5 text-emerald-500" />
    },
    {
      step: "03",
      title: "Buyer Pays Broker",
      desc: "Buyer routes the designated ledger amount directly to our supervised Bengaluru brokerage balance coordinates.",
      icon: <FileCheck2 className="h-5 w-5 text-purple-400" />
    },
    {
      step: "04",
      title: "Seller Transfers Live",
      desc: "Coordinators host a supervised private transfer session. Dual safety 2FA links and credential overrides are monitored.",
      icon: <RefreshCw className="h-5 w-5 text-amber-500" />
    },
    {
      step: "05",
      title: "Buyer Confirms Full Control",
      desc: "Buyer verifies possession, audits profile link properties, and confirms final administrative control.",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />
    },
    {
      step: "06",
      title: "Seller Gets Paid",
      desc: "Designated broker releases held funds securely to the verified seller minus our consulting platform fee.",
      icon: <Sparkles className="h-5 w-5 text-emerald-400" />
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">
      {/* Premium background gradient rays */}
      <div className="absolute top-[-10%] left-[8%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-emerald-600/3 blur-[130px] rounded-full pointer-events-none" />

      {/* Hero Section Container */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Powerful trust and conversion triggers */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Trust badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-[#0F0F10] text-[#10B981] font-mono text-[10px] font-bold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-405 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Premium Broker-Assisted Network • Bengaluru Hub Desk</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Acquire Elite Namespace <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                With Ultimate Trust.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Secure high-value usernames, legacy handles, and brandable off-market assets. Human-brokered, vetted seller verification processes keeping your capital guarded at every handshake.
            </motion.p>
          </div>

          {/* Trust Chips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-xs text-gray-400 font-medium"
          >
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Seller Verification Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Human Broker Supervision</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Structured Payment Workflow</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={() => onNavigate("browse")}
              className="group relative w-full sm:w-auto h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              id="hero_primary_cta"
            >
              <span>Explore Verified Registry</span>
              <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("sell")}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#0F0F10] hover:bg-[#151517] border border-white/[0.08] hover:border-white/[0.15] text-gray-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              id="hero_secondary_cta"
            >
              <span>Apply to List Handle</span>
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>
          </motion.div>

        </div>

        {/* Right Column: Premium Interactive Floating Mockups */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          
          {/* Card Mockup Group */}
          <div className="relative w-full max-w-sm h-[380px] flex items-center justify-center">
            
            {/* Background ambient glow behind cards */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />

            {/* Float Card 1: Active Deal Status */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-2 w-[85%] p-5 rounded-2xl bg-[#151517]/90 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-4 backdrop-blur-sm z-20"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-blue-500/10 text-blue-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest text-[9px]">DEAL STATUS</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">SECURED</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight font-mono">@apex</h4>
                  <p className="text-[9px] text-gray-500 font-bold">INSTAGRAM LEGACY ID</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-gray-500 uppercase font-mono">VALUATION TARGET</p>
                  <p className="text-base font-extrabold text-emerald-450 font-mono">{formatINR(1250000)}</p>
                </div>
              </div>

              {/* Steps checklist simulation */}
              <div className="space-y-2 pt-2 text-[9px] text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Interactive Bio Authentication Satisfied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping mx-0.75" />
                  <span className="font-semibold text-white">Guarding Indian Rupee (INR) Transfer</span>
                </div>
              </div>
            </motion.div>

            {/* Float Card 2: Broker Verification Card */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 w-[85%] p-4 rounded-xl bg-[#0F0F10] border border-white/[0.06] shadow-lg space-y-3 z-10 scale-[0.95]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Assigned Coordinator</span>
                </div>
                <span className="text-[8px] text-[#10B981] font-mono font-semibold">ONLINE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/35 flex items-center justify-center font-bold text-xs text-blue-400">
                  BK
                </div>
                <div className="text-left leading-none gap-1">
                  <h5 className="text-[11px] font-bold text-white">Bengaluru Desk Broker</h5>
                  <p className="text-[9px] text-gray-500 font-mono">Ref id: ID-DESK-BANGALORE</p>
                </div>
              </div>
              {/* Fake message bubble */}
              <div className="bg-[#151517] p-2.5 rounded-lg border border-white/[0.04] text-[9px] text-gray-400 text-left leading-relaxed">
                "Our desk has audited original ownership markers for @nexus. We are ready to coordinate the human-supervised workflow handshake."
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Structured Deal Handshake: Timeline with interactive steps */}
      <section className="border-t border-white/[0.06] bg-[#0F0F10] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">How Secure Deals Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Structured Payment Workflow</h2>
            <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
              Our manually audited, broker-assisted transaction steps eliminate delivery failure risk completely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {stepsData.map((s, idx) => (
              <motion.article 
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-5 rounded-xl bg-[#151517] border transition-all duration-300 relative space-y-3.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
                  activeStep === idx 
                    ? "border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.05)]" 
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
                onClick={() => setActiveStep(idx)}
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-gray-500">{s.step}</span>
                  <div className="p-2 rounded-lg bg-[#0F0F10] border border-white/[0.08]">
                    {s.icon}
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-semibold text-xs text-white leading-snug">{s.title}</h3>
                  <p className="text-[11px] text-gray-400 font-normal leading-normal">{s.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* Critical Objection Handling: Why Use IDsvault Instead of Dealing Directly? */}
      <section className="bg-[#050505] border-b border-white/[0.06] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-[9px] font-extrabold uppercase tracking-widest font-mono">
              OBJECTION HANDLING
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-[1.12]">
              Why Use IDsvault Instead of Dealing Directly?
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Direct off-market handshake transactions are prone to chargebacks, credential recovery hijacking, and anonymous black mailing. IDsvault creates a complete human-brokered shield.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Seller Verification
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                We enforce strict proof criteria to confirm ownership before any listing is published, eliminating anonymous scams entirely.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-405" />
                Human Broker Supervision
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Dedicated Bengaluru brokers supervise every single step, ensuring coordinates match standard security instructions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Workflow className="h-4 w-4 text-[#10B981]" />
                Structured Payment Workflow
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Transactions are structured safely in stages, holding payments securely until handle ownership transfer is fully checked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Reduced Scam Exposure
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                We protect both parties from credit card chargebacks, fake identity claims, or listing hijackers through discrete coordination.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Business Identity: Who We Are Block */}
      <section className="bg-[#0F0F10] py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#151517] border border-white/[0.06] p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden font-sans">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="space-y-4">
            <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase font-mono">BUSINESS IDENTITY: WHO WE ARE</span>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">Premium Digital Brokerage Desk</h3>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              <strong>IDsvault</strong> is an independent premium digital identity brokerage platform helping buyers and sellers transact premium digital identities through human broker-assisted workflows. We are not officially affiliated with Instagram, X, or Telegram.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>India-based Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Human Broker Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Premium Listing Review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Dedicated Assistance</span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-gray-300 font-mono">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Brokerage Network Status: ACTIVE</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span> Bengaluru Desks Assigned: ONLINE</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span>Independent Verification Audits: ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
