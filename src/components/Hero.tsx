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
  Fingerprint,
  FileCheck2,
  Workflow,
  ShieldAlert,
  IndianRupee
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
      title: "Submit Your Offer",
      desc: "Tell us the handle you want and your budget. Our Hyderabad desk creates a deal ticket and contacts both parties within 24 hours.",
      icon: <Lock className="h-5 w-5 text-blue-500" />
    },
    {
      step: "02",
      title: "Seller Ownership Verified",
      desc: "We confirm the seller actually owns the handle through direct account checks — no listing goes live without verification.",
      icon: <Fingerprint className="h-5 w-5 text-emerald-500" />
    },
    {
      step: "03",
      title: "Buyer Pays Broker",
      desc: "Send payment to our UPI or bank account. We hold the full amount in escrow — you get a complete refund if the transfer fails or doesn't happen.",
      icon: <FileCheck2 className="h-5 w-5 text-purple-400" />
    },
    {
      step: "04",
      title: "Live Supervised Transfer",
      desc: "We host a live call where the seller transfers the account while our broker watches. Both parties are on the call until transfer is confirmed.",
      icon: <RefreshCw className="h-5 w-5 text-amber-500" />
    },
    {
      step: "05",
      title: "Buyer Confirms Control",
      desc: "You update the recovery email, phone number, and 2FA. Confirm to our broker that you have full account access before we proceed.",
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />
    },
    {
      step: "06",
      title: "Seller Gets Paid",
      desc: "Once you confirm full ownership, we release the escrowed funds to the seller. Our brokerage fee is deducted from the held amount.",
      icon: <IndianRupee className="h-5 w-5 text-emerald-400" />
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8 text-left">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-[#0F0F10] text-[#10B981] font-mono text-[10px] font-bold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Broker-Assisted Marketplace · Hyderabad Desk</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Buy the username<br />
              <span className="text-[#D4AF37]">
                you actually want.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Broker-verified Instagram handles, X usernames, and Telegram channels.
              Your payment is held in escrow until the transfer is done — neither side can be scammed.
            </motion.p>
          </div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-xs text-gray-400 font-medium"
          >
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Seller verified before listing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Human broker on every deal</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-400 shrink-0" />
              <span>Payment held in escrow</span>
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
              className="group w-full sm:w-auto h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              id="hero_primary_cta"
            >
              <span>Browse Available Handles</span>
              <ArrowRight className="h-4 w-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("sell")}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#0F0F10] hover:bg-[#151517] border border-white/[0.08] hover:border-white/[0.15] text-gray-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              id="hero_secondary_cta"
            >
              <span>List Your Handle for Sale</span>
              <ArrowUpRight className="h-4 w-4 text-gray-500" />
            </button>
          </motion.div>

        </div>

        {/* Right Column: Deal status mockup cards */}
        <div className="lg:col-span-5 relative w-full flex justify-center">

          <div className="relative w-full max-w-sm h-[380px] flex items-center justify-center">

            {/* Active Deal Status Card */}
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
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Deal Status</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">Secured</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-extrabold text-white tracking-tight font-mono">@apex</h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase">Instagram Legacy Handle</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-gray-500 uppercase font-mono">Asking Price</p>
                  <p className="text-base font-extrabold text-emerald-400 font-mono">{formatINR(1250000)}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[9px] text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Seller ownership verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping mx-0.75" />
                  <span className="font-semibold text-white">Payment in escrow · Transfer pending</span>
                </div>
              </div>
            </motion.div>

            {/* Broker Desk Card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 w-[85%] p-4 rounded-xl bg-[#0F0F10] border border-white/[0.06] shadow-lg space-y-3 z-10 scale-[0.95]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Hyderabad Desk</span>
                </div>
                <span className="text-[8px] text-[#10B981] font-mono font-semibold">Online</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-bold text-xs text-blue-400">
                  HD
                </div>
                <div className="text-left leading-none space-y-1">
                  <h5 className="text-[11px] font-bold text-white">IDsvault Broker</h5>
                  <p className="text-[9px] text-gray-500 font-mono">Hyderabad Operations Desk</p>
                </div>
              </div>
              <div className="bg-[#151517] p-2.5 rounded-lg border border-white/[0.04] text-[9px] text-gray-400 text-left leading-relaxed">
                "Seller ownership for @nexus has been verified. Ready to start the live transfer call — both parties confirmed."
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* How It Works — 6 steps */}
      <section className="border-t border-white/[0.06] bg-[#0F0F10] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Six steps, fully brokered</h2>
            <p className="text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
              Every deal follows this process. Neither buyer nor seller can skip a step — that's what makes it safe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {stepsData.map((s, idx) => (
              <motion.article
                key={idx}
                whileHover={{ y: -5 }}
                className={`p-5 rounded-xl bg-[#151517] border transition-all duration-300 relative space-y-3.5 ${
                  activeStep === idx
                    ? "border-blue-500/30"
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

      {/* Why Use IDsvault Instead of Dealing Directly */}
      <section className="bg-[#050505] border-b border-white/[0.06] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-[9px] font-extrabold uppercase tracking-widest font-mono">
              Why Use a Broker?
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-[1.12]">
              Direct deals get scammed. Brokered deals don't.
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              When you buy directly from a stranger, they can take your money and recover the account. When you sell directly, the buyer can chargeback after transfer. A broker eliminates both problems.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Seller Verified Before Listing
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                We confirm the seller has real account access before we accept their listing. No anonymous sellers, no fake inventory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Broker on Every Live Transfer
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Our Hyderabad broker supervises the account handover on a live call. No unsupervised transfers — the broker confirms both sides are satisfied.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Workflow className="h-4 w-4 text-[#10B981]" />
                Escrow Until You Confirm
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                The buyer's payment stays with us until they confirm they have full account access. The seller only gets paid when the buyer is satisfied.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Chargeback & Recovery Protection
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Sellers are protected from chargebacks. Buyers are protected from account recovery after sale. Our escrow process prevents both.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* About Block */}
      <section className="bg-[#0F0F10] py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#151517] border border-white/[0.06] p-8 md:p-12 text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden font-sans">

          <div className="space-y-4">
            <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase font-mono">About IDsvault</span>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">India's dedicated username brokerage</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              <strong className="text-white">IDsvault</strong> is an independent brokerage platform for buying and selling premium Instagram handles, X usernames, and Telegram channels. We are not affiliated with Instagram, X, or Telegram. Every transaction is human-supervised by our Hyderabad desk.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>India-based desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Human broker support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Seller verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Escrow on every deal</span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 text-xs text-gray-300 font-mono">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Brokerage desk: Active</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span>Hyderabad desk: Online</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0F0F10] border border-white/[0.04]">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              <span>Seller verification: Running</span>
            </div>
            <div className="mt-2 pt-3 border-t border-white/[0.04] text-[10px] text-gray-500 leading-relaxed">
              Platforms covered: Instagram · X (Twitter) · Telegram
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
