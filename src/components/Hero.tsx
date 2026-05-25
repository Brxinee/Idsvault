/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  Users,
  ArrowUpRight,
  IndianRupee,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  PhoneCall,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatINR, getBadgesForHandle, maskUsername } from "../data";
import { Listing } from "../types";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";

interface HeroProps {
  featuredListings: Listing[];
  onSelectListing: (slug: string) => void;
  onNavigate: (view: string) => void;
}

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IDsvault",
    "url": "https://idsvault.com",
    "logo": "https://idsvault.com/logo.png",
    "description": "India-based broker-advised digital identity facilitation desk for Telegram usernames, domain names, Discord servers, and YouTube channels. Escrow-free — broker holds funds in designated account. Based in Hyderabad, Telangana.",
    "areaServed": "IN",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "email": "broker@idsvault.com",
    "telephone": "+919392974031",
    "sameAs": ["https://wa.me/919392974031"]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IDsvault",
    "url": "https://idsvault.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": "https://idsvault.com/inventory?q={search_term_string}" },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it legal to buy or sell Instagram usernames in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instagram's Terms of Service prohibit username transfers, which means there is inherent platform risk. IDsvault only handles Instagram on a private advisory basis and discloses this risk in writing before any engagement begins. Telegram username transfers are broker-supervised on a live call with no platform enforcement risk."
        }
      },
      {
        "@type": "Question",
        "name": "How does broker-held payment work at IDsvault?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You pay IDsvault directly — via UPI or bank transfer — not the seller. We hold the funds in our designated broker account until you confirm full account access on the live call and have changed all credentials. Only then do we release payment to the seller. If the transfer fails for any reason, you get a full refund within 3 business hours."
        }
      },
      {
        "@type": "Question",
        "name": "How much does IDsvault charge for brokering a deal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our commission is 15% + GST for deals under ₹5,00,000, 12% + GST for ₹5,00,000–₹20,00,000, and 10% + GST above ₹20,00,000. All fees are disclosed before any payment is made. GST invoice issued on all transactions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I buy a Telegram username through IDsvault?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Telegram username transfers are our primary listing category. The transfer is done on a live supervised call with no platform enforcement risk. Browse our current inventory to see available handles."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if the seller tries to recover the account after the transfer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The transfer only happens on a live supervised call where our broker watches you change the recovery email, phone number, and 2FA before we release payment to the seller. The seller has no financial incentive to attempt recovery once they've been paid."
        }
      }
    ]
  }
];

const faqItems = [
  {
    q: "Is it legal to buy an Instagram or X username in India?",
    a: "Instagram and X both prohibit username transfers in their Terms of Service. We disclose this risk explicitly and in writing before any engagement. We only handle IG/X on a private advisory basis — they are never publicly listed. Telegram transfers are broker-supervised on a live call and carry no platform enforcement risk."
  },
  {
    q: "How does broker-held payment work?",
    a: "You pay IDsvault directly via UPI or bank transfer (NEFT/RTGS/IMPS) — never to the seller. We hold the funds in our designated business account until you confirm full account access on the live call. Only then do we release payment to the seller. If anything goes wrong at any step, you get a full refund within 3 business hours — no questions asked."
  },
  {
    q: "What is a 'live supervised transfer'?",
    a: "The buyer, seller, and our Hyderabad broker are all on the same video call. The seller transfers the account while our broker watches. The buyer updates the recovery email, phone, and 2FA live on the call. No one hangs up until the buyer confirms they have full control."
  },
  {
    q: "How much does IDsvault charge?",
    a: "15% + GST for deals under ₹5,00,000 · 12% + GST for ₹5,00,000–₹20,00,000 · 10% + GST above ₹20,00,000 · Negotiable above ₹85,00,000. GST invoice issued on all fees. All charges disclosed before payment — no hidden fees."
  },
  {
    q: "Can I buy a Telegram username?",
    a: "Yes. Telegram username transfers are our primary listing category. The transfer is done on a live supervised call — broker, buyer, and seller together. No platform enforcement risk. Browse our current inventory to see available handles."
  },
  {
    q: "What if the seller recovers the account after transfer?",
    a: "The transfer happens live on a call. You change the recovery email, phone, and 2FA before we release any funds to the seller. The seller has no financial incentive to attempt recovery — they only get paid once you confirm full ownership."
  },
  {
    q: "Do you work with buyers and sellers across India?",
    a: "Yes. Our broker desk is in Hyderabad but we handle inquiries from anywhere in India via WhatsApp, phone, and Telegram. Payments are via UPI or bank transfer in INR. We do not currently serve international clients."
  },
  {
    q: "How long does a deal take?",
    a: "Typically 24–72 hours from inquiry to completed transfer. Time depends on KYC verification (required above ₹85,000), both parties' availability for the live call, and deal complexity. We keep both parties updated at every step."
  },
  {
    q: "What KYC documents are required?",
    a: "Under ₹85,000: no KYC. ₹85,000–₹8,50,000: government-issued photo ID (Aadhaar or PAN). Above ₹8,50,000: ID plus source-of-funds declaration. PAN is mandatory for all transactions above ₹2,00,000. All verification handled confidentially by our Hyderabad desk."
  },
  {
    q: "How do I list an asset for sale?",
    a: "Submit your asset via our Sell page. We verify ownership before listing anything — sellers must prove they own the account. Once verified, we handle all buyer inquiries and negotiations. You only deal with our broker, not with buyers directly."
  }
];

export const Hero: React.FC<HeroProps> = ({ featuredListings, onSelectListing }) => {
  usePageTitle();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-[#050505] text-white">

      <SEO
        canonical="/"
        structuredData={homepageSchema}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8 text-left">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-[#131316] text-[#6E6E78] font-mono text-[10px] font-medium uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Hyderabad, India · Broker Desk Active</span>
          </motion.div>

          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Buy the handle.<br />
              <span className="text-[#C9A961]">
                Skip the scam.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A1A1A9] text-base leading-relaxed max-w-lg"
            >
              Broker-verified Instagram, X, and Telegram usernames. Your money stays with the
              broker until the transfer is done — on a live call, with both parties present.
            </motion.p>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-xs text-[#6E6E78]"
          >
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[#C9A961] shrink-0" />
              <span>Seller ownership verified before listing</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#C9A961] shrink-0" />
              <span>Named broker on every deal</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#C9A961] shrink-0" />
              <span>Broker holds funds until you confirm ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C9A961] shrink-0" />
              <span>Full refund if transfer fails</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/inventory"
              className="group w-full sm:w-auto h-12 px-8 rounded-xl bg-[#C9A961] hover:bg-[#D4B670] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
              id="hero_primary_cta"
            >
              <span>Browse Handles</span>
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/sell"
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#131316] hover:bg-[#1C1C20] border border-[#26262B] hover:border-[#3A3A42] text-[#A1A1A9] hover:text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              id="hero_secondary_cta"
            >
              <span>Sell Yours</span>
              <ArrowUpRight className="h-4 w-4 opacity-50" />
            </Link>
          </motion.div>

        </div>

        {/* Right Column: Deal status mockup */}
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
                  <p className="text-[9px] text-gray-500 font-bold uppercase">Telegram Premium Handle</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-gray-500 uppercase font-mono">Asking Price</p>
                  <p className="text-base font-extrabold text-[#C9A961] font-mono">₹15,00,000</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-[9px] text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Seller ownership verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping mx-0.75" />
                  <span className="font-semibold text-white">Payment held by broker · Transfer pending</span>
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
                "Seller ownership for @nexus verified. Ready to start the live transfer — both parties confirmed."
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* ── THE PROBLEM ─────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-[#0A0A0B] py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-1">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest font-mono">Why you need a broker</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Direct DM deals get scammed. Every time.
              </h2>
              <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-2xl">
                Someone quotes you a price on Telegram or WhatsApp. You send the money. They transfer the handle. Two days later they use account recovery to take it back — and you have no recourse. This is not rare. It happens constantly in the handle trading space.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-red-500/[0.04] border border-red-500/10 space-y-2">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono">Buyer risk</span>
              <p className="text-xs text-gray-300 leading-relaxed">You pay, they recover. Money gone, handle gone. No paper trail, no platform support.</p>
            </div>
            <div className="p-5 rounded-xl bg-red-500/[0.04] border border-red-500/10 space-y-2">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono">Seller risk</span>
              <p className="text-xs text-gray-300 leading-relaxed">You transfer first, they dispute the payment or reverse the bank transfer. You lose the handle and the money.</p>
            </div>
            <div className="p-5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">With IDsvault</span>
              <p className="text-xs text-gray-300 leading-relaxed">Funds are held by the broker. Transfer happens live on a supervised call. Both parties are protected at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (3 steps) ──────────────────────── */}
      <section className="border-t border-white/[0.06] bg-[#0F0F10] py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">

          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Three steps, no surprises</h2>
            <p className="text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
              Every deal follows the same process. Neither side can skip a step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="relative p-6 rounded-2xl bg-[#151517] border border-white/[0.06] space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-white/10">01</span>
                <div className="p-2.5 rounded-xl bg-[#C9A961]/10 border border-[#C9A961]/20">
                  <Wallet className="h-5 w-5 text-[#C9A961]" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-1">Pick your handle</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Browse verified listings or tell us what you're looking for. Our broker creates a deal ticket and contacts both parties within 24 hours.</p>
              </div>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#151517] border border-white/[0.06] space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-white/10">02</span>
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-1">Pay the broker</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Send payment to IDsvault via UPI or bank transfer — not to the seller. We hold the full amount in our designated broker account. Full refund if anything goes wrong.</p>
              </div>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#151517] border border-white/[0.06] space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-white/10">03</span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <PhoneCall className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-1">Transfer on a live call</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Buyer, seller, and broker on the same call. Seller transfers the account, you change all credentials live, confirm ownership, then we release funds to the seller.</p>
              </div>
            </div>

          </div>

          <p className="text-center text-xs text-gray-500 pt-2">
            Refund in 3 business hours if transfer fails at any step · KYC required above ₹85,000
          </p>

        </div>
      </section>

      {/* ── WHY USE A BROKER ────────────────────────────── */}
      <section className="bg-[#050505] border-b border-white/[0.06] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="inline-block px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-[9px] font-extrabold uppercase tracking-widest font-mono">
              Why use a broker?
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight leading-[1.12]">
              Direct deals get scammed. Brokered deals don't.
            </h2>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              When you buy directly, the seller can take your money and recover the account. When you sell directly, the buyer can chargeback after transfer. A broker eliminates both risks.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-emerald-400" />
                Seller verified before listing
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                We confirm real account access before accepting any listing. No anonymous sellers, no fake inventory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Broker on every live transfer
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Our Hyderabad broker supervises the handover on a live call. No unsupervised transfers — ever.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#10B981]" />
                Broker holds funds until you confirm
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Your payment stays with the broker until you confirm full account access on the live call. Seller only gets paid when you're satisfied.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#151517] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3">
              <h4 className="font-bold text-xs text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                Chargeback &amp; recovery protection
              </h4>
              <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                Sellers protected from chargebacks. Buyers protected from post-sale account recovery. Broker-held payment and live supervised transfer prevents both.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── FEATURED LISTINGS ───────────────────────────── */}
      {featuredListings.length > 0 && (
        <section className="bg-[#0F0F10] border-b border-white/[0.06] py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-10">

            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#C9A961] uppercase tracking-widest font-mono">Available Now</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Handles for sale — buy instagram username india, telegram, and more</h2>
                <p className="text-xs text-gray-400">Ownership verified · Payment held by broker · Live supervised transfer</p>
              </div>
              <Link
                to="/inventory"
                className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#6E6E78] hover:text-white transition-colors uppercase tracking-wider"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredListings.map((item) => {
                const badges = getBadgesForHandle(item.username, item.platform);
                const masked = maskUsername(item.username);
                return (
                  <motion.article
                    key={item.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-2xl bg-[#0A0A0B] border border-white/[0.08] hover:border-white/[0.14] flex flex-col justify-between gap-4 group relative overflow-hidden cursor-pointer"
                    onClick={() => onSelectListing(item.slug)}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9A961] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-mono font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/15 px-2 py-0.5 rounded-full">
                          {item.platform}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">
                          <BadgeCheck className="h-3 w-3 stroke-[2.5]" />
                          Verified
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-[#C9A961] transition-colors">
                          @{masked}
                        </h3>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {badges.slice(0, 2).map((b, idx) => (
                            <span key={idx} className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border tracking-wide uppercase ${b.style}`}>
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 block">Asking Price</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">
                          {formatINR(item.askingPrice)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors flex items-center gap-0.5">
                        View <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/inventory"
                className="inline-flex items-center gap-2 h-10 px-6 rounded-lg border border-[#26262B] hover:border-[#3A3A42] text-xs font-medium text-[#A1A1A9] hover:text-white transition-all uppercase tracking-wider"
              >
                Browse full inventory
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* ── FOUNDER NOTE ────────────────────────────────── */}
      <section className="bg-[#050505] py-20 px-6">
        <div className="max-w-3xl mx-auto text-left space-y-6">
          <span className="text-[10px] font-bold text-[#C9A961] tracking-widest uppercase font-mono">From the desk</span>
          <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed tracking-tight">
            "We started this because we watched too many people get burned by handle dealers with no accountability. A broker changes the incentive structure — the seller only gets paid when the buyer is satisfied. That's it."
          </blockquote>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-10 w-10 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/20 flex items-center justify-center font-bold text-sm text-[#C9A961] font-mono">
              SR
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Sanjay Reddy</p>
              <p className="text-xs text-gray-500">Lead Broker · Hyderabad Desk</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
            {[
              { val: "15%", label: "Commission on deals under ₹5L" },
              { val: "3 hrs", label: "Refund window if transfer fails" },
              { val: "1:1", label: "Named broker per deal" },
              { val: "4hr", label: "Response within 4 hours during business hours (IST)" },
            ].map(({ val, label }) => (
              <div key={label} className="p-4 rounded-xl bg-[#0F0F10] border border-white/[0.06] space-y-1">
                <p className="text-xl font-extrabold text-[#C9A961] font-mono">{val}</p>
                <p className="text-[10px] text-gray-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="bg-[#0F0F10] border-t border-white/[0.06] py-20 px-6" id="faq">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="text-center space-y-3">
            <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">Common questions</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Everything buyers and sellers ask us</h2>
          </div>

          <div className="space-y-2">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/[0.06] bg-[#0A0A0B] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-white/[0.01] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-white leading-snug">{item.q}</span>
                    {isOpen
                      ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                    }
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/[0.04] px-5 py-4 text-sm text-gray-400 leading-relaxed"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors uppercase tracking-wider font-mono"
            >
              Full FAQ page
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── FINAL CTA BAND ──────────────────────────────── */}
      <section className="bg-[#050505] border-t border-white/[0.06] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to buy or sell a handle?
          </h2>
          <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-lg mx-auto">
            Message our Hyderabad desk on WhatsApp or browse verified listings now. No commitment required — just tell us what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/inventory"
              className="group w-full sm:w-auto h-12 px-8 rounded-xl bg-[#C9A961] hover:bg-[#D4B670] text-[#0A0A0B] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Browse Handles
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/919392974031?text=Hi+IDsvault%2C+I+want+to+buy+or+sell+a+handle"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#131316] hover:bg-[#1C1C20] border border-[#26262B] hover:border-[#3A3A42] text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              WhatsApp Broker
            </a>
          </div>
          <p className="text-[10px] text-gray-600 pt-2">
            Commission: 15% (deals under ₹5L) · 12% (₹5L–₹20L) · 10% (above ₹20L) · 18% GST on fees · All charges disclosed before payment · <Link to="/policy/terms" className="underline hover:text-gray-400">Terms</Link>
          </p>
        </div>
      </section>

    </div>
  );
};
