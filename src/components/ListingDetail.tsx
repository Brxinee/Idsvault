/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  MessageCircle,
  Mail,
  AlertTriangle,
  BadgePercent,
  Lock,
  Landmark,
  Check,
  Loader2,
  ChevronLeft,
  Calendar,
  Globe,
  Fingerprint,
  UserCheck
} from "lucide-react";
import { Listing, Urgency } from "../types";
import { buildWhatsAppHandoff, WHATSAPP_NUMBER, formatINR, getEstimatedRange } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "./SEO";

interface ListingDetailProps {
  listing: Listing;
  onSubmitProposal: (offer: number, name: string, email: string, whatsapp: string) => void;
  onNavigateBack: () => void;
}

export const ListingDetail: React.FC<ListingDetailProps> = ({ listing, onSubmitProposal, onNavigateBack }) => {
  const [offer, setOffer] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Bot Honeypot state
  const [honeypot, setHoneypot] = useState("");

  // Cooldown timers state tracking
  const [cooldown, setCooldown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOverlay, setSuccessOverlay] = useState<{ active: boolean; whatsappUrl: string; mailto: string } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot Defense
    if (honeypot) {
      console.warn("Anti-bot defense triggered: Honeypot check detected input.");
      alert("Submission blocked. Automated request signature detected.");
      return;
    }

    // 3. Duplicate submission cooldown checks
    if (cooldown > 0) {
      alert(`Please wait ${cooldown} seconds before submitting another acquisition offer.`);
      return;
    }

    const numericOffer = parseFloat(offer);
    if (isNaN(numericOffer) || numericOffer <= 0) {
      alert("Please provide a valid, positive INR offer valuation.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate premium verification and WhatsApp handoff generation
    setTimeout(() => {
      setIsSubmitting(false);
      
      const customMessage = `Hi IDsvault, I want to start a secure deal.

Handle: @${listing.username}
Platform: ${listing.platform.toUpperCase()}
Offer: ${formatINR(numericOffer)}
Name: ${name}
Urgency: Standard`;

      const coords = buildWhatsAppHandoff(customMessage);
      
      // Submit back up to main app state ledger record
      onSubmitProposal(numericOffer, name, email, whatsapp);

      // Save a local 30 second submission cooldown block
      setCooldown(30);

      // Open beautiful modal launcher
      setSuccessOverlay({
        active: true,
        whatsappUrl: coords.url,
        mailto: coords.mailto
      });
    }, 1500);
  };

  const displayTitle = listing.username;

  const listingSchema = listing.askingPrice > 0
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": `@${listing.username} — Premium ${listing.platform} Handle`,
        "description": listing.description || `Premium ${listing.platform} username available via IDsvault broker-assisted transfer.`,
        "url": `https://idsvault.com/asset/${listing.slug}`,
        "brand": {
          "@type": "Organization",
          "name": "IDsvault",
          "url": "https://idsvault.com"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": listing.askingPrice,
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "IDsvault"
          }
        }
      }
    : undefined;

  return (
    <>
    <SEO
      title={`Buy @${listing.username} on ${listing.platform}`}
      description={`Premium @${listing.username} ${listing.platform} handle — ${listing.askingPrice > 0 ? `${formatINR(listing.askingPrice)} asking price. ` : ""}Broker-verified. Payment held by broker until transfer confirmed. IDsvault Hyderabad.`}
      canonical={`/asset/${listing.slug}`}
      structuredData={listingSchema}
    />
    <div className="max-w-7xl mx-auto px-6 py-12 text-left">
      
      {/* Premium Back Trigger */}
      <button
        onClick={onNavigateBack}
        className="text-xs text-gray-400 hover:text-white mb-8 uppercase tracking-widest font-extrabold flex items-center gap-1.5 cursor-pointer transition-colors group select-none"
        id="detail_back_trigger"
      >
        <ChevronLeft className="h-4 w-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform animate-in" />
        <span>Back to Inventory</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Vetted Gallery and Metadata Presentation */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Gallery style premium card */}
          <article className="p-8 rounded-2xl bg-surface border border-white/[0.08] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <header className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-extrabold text-[#10B981] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                Verified Seller Ownership
              </span>
              <span className="text-[9px] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider capitalize font-mono">
                {listing.platform} Platform
              </span>
            </header>

            <div className="space-y-4 pt-10 pb-12">
              <span className="text-[10px] font-bold text-gray-500 block uppercase tracking-widest font-mono">Handle</span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                @{displayTitle}
              </h1>
              <p className="text-xs text-blue-400 font-mono tracking-wide">Ref #{listing.id}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] text-xs">
              <div className="p-3 bg-raised rounded-xl border border-white/[0.04] space-y-1">
                <span className="text-[9px] text-gray-500 uppercase font-mono block">Audit Status</span>
                <span className="text-white font-bold flex items-center gap-1.5 font-mono text-[11px]">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#10B981]" /> Approved
                </span>
              </div>
              <div className="p-3 bg-raised rounded-xl border border-white/[0.04] space-y-1">
                <span className="text-[9px] text-gray-500 uppercase font-mono block">Transfer ETA</span>
                <span className="text-white font-semibold font-mono text-[11px]">
                  &lt; 24h Handover
                </span>
              </div>
              <div className="p-3 bg-raised rounded-xl border border-white/[0.04] col-span-2 sm:col-span-1 space-y-1">
                <span className="text-[9px] text-gray-500 uppercase font-mono block">Credibility Rate</span>
                <span className="text-white font-bold font-mono text-[11px] text-blue-400">
                  A+ Grade Desk
                </span>
              </div>
            </div>
          </article>

          {/* Broker Assessment Context Form */}
          <article className="p-8 rounded-2xl bg-surface border border-white/[0.08] space-y-4 text-left">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest font-mono">About this Handle</h2>
            <p className="text-xs text-muted leading-relaxed">
              {listing.description}
            </p>
          </article>

          {/* Structured Workflow Protective list */}
          <article className="p-6 rounded-2xl bg-surface border border-white/[0.08] space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Compliance Framework</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-raised border border-white/[0.04] space-y-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <h4 className="font-bold text-white text-[11px] tracking-tight">Payment Held by Broker</h4>
                <p className="text-[10px] text-gray-400 leading-normal font-normal">
                  Payment is held in the broker's registered business account. Funds are released only after the transfer is confirmed.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-raised border border-white/[0.04] space-y-2">
                <Fingerprint className="h-4 w-4 text-[#10B981]" />
                <h4 className="font-bold text-white text-[11px] tracking-tight">Ownership Confirmed</h4>
                <p className="text-[10px] text-gray-400 leading-normal font-normal">
                  Sellers demonstrate active account access before listing. We verify ownership before any handle goes live.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-raised border border-white/[0.04] space-y-2">
                <Landmark className="h-4 w-4 text-purple-400" />
                <h4 className="font-bold text-white text-[11px] tracking-tight">Anti-Clawback</h4>
                <p className="text-[10px] text-gray-400 leading-normal font-normal">
                  Our active broker-assisted transfer process eliminates profile recovery hacks, chargebacks, and domain theft.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Sticky Trust Checkout sidebar */}
        <section className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-raised border border-white/[0.08] sticky top-24 space-y-6">
            
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest font-mono block">Offer Desk</span>
              <h3 className="text-lg font-bold text-white">Make an Offer</h3>
              <p className="text-xs text-muted">Submit custom valuation offers in compliance with our structured payment workflow.</p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-white/[0.04] space-y-1.5">
              <span className="text-[9px] text-gray-500 uppercase font-mono block">Estimated Range</span>
              <p className="text-sm font-bold font-mono text-emerald-400">
                {getEstimatedRange(listing.askingPrice)}
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Bot HoneyPot invisible check */}
              <div className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden pointer-events-none">
                <label className="block text-[8px] text-gray-500 uppercase">Do not fill this parameter if you are human</label>
                <input
                  type="text"
                  name="user_cell_home"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  placeholder="Leave completely empty"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                  Proposed Price Offer (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500000"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-surface border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                    id="detail_input_offer"
                  />
                </div>
                {listing.askingPrice > 0 && (
                  <p className="text-[9px] text-muted mt-1.5">
                    Target Asking Valuation: {formatINR(listing.askingPrice)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-lg bg-surface border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                  id="detail_input_name"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. representative@entity.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-lg bg-surface border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                  id="detail_input_email"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-lg bg-surface border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                  id="detail_input_whatsapp"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const message = `Hello IDsvault Desk,\n\nI am interested in proposing an offer for @${listing.username} (${listing.platform}). Let's check estimated ranges.`;
                    const hrefs = buildWhatsAppHandoff(message);
                    window.open(hrefs.url, "_blank");
                  }}
                  className="py-3 px-2 text-center rounded-lg border border-white/[0.08] hover:border-white/[0.15] text-[10px] font-bold text-gray-300 uppercase select-none transition-colors"
                >
                  Price on Request
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                  id="detail_submit_cta"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-white shrink-0" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Make Offer</span>
                      {cooldown > 0 && <span className="font-mono text-[8px] text-blue-300">({cooldown}s)</span>}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Support Message */}
            <div className="pt-2 border-t border-white/[0.06] text-center select-none">
              <p className="text-[10px] text-gray-500">
                Questions? Message our Hyderabad desk on WhatsApp or email broker@idsvault.com.
              </p>
            </div>

          </div>
        </section>
 
      </div>

      {/* WhatsApp Handoff Overlay Dialog */}
      <AnimatePresence>
        {successOverlay && successOverlay.active && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-8 rounded-2xl bg-surface border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white block"
              id="detail_success_modal"
            >
              <div className="h-12 w-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="h-6 w-6" />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Offer Received</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  Open WhatsApp to send your offer to our Hyderabad desk. We'll confirm receipt and come back to you same day.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={successOverlay.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer outline-none"
                  onClick={() => setSuccessOverlay(null)}
                >
                  Open WhatsApp Conversation
                </a>
                <a
                  href={successOverlay.mailto}
                  className="text-gray-400 hover:text-white text-[10px] underline tracking-widest uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer font-bold"
                  onClick={() => setSuccessOverlay(null)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Prefer email? Write to broker@idsvault.com
                </a>
              </div>

              <button
                onClick={() => setSuccessOverlay(null)}
                className="text-[10px] text-gray-500 hover:text-gray-300 uppercase tracking-wider block mx-auto cursor-pointer font-bold select-none pt-2"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
};
