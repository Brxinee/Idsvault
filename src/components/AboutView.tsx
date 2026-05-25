/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Sparkles, User, MapPin, Building, FileCheck, ArrowUpRight } from "lucide-react";

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 text-left animate-page-fade">
      
      {/* Editorial Header */}
      <header className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131316] border border-[#26262B] rounded-full">
          <span className="h-2 w-2 rounded-full bg-[#C9A961] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A9]">The Broker Story</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F5F5F7] font-display leading-[1.1]">
          Independent, high-touch brand handle advisory.
        </h1>
        <p className="text-[#A1A1A9] text-base md:text-lg leading-relaxed font-normal">
          Founded and personally operated by Vinay Naidu from Hyderabad. IDsvault replaces anonymous trading platforms with legal structure, active custody, and live-supervised transacting.
        </p>
      </header>

      {/* Founder Profile Block */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#26262B] pt-12">
        <div className="md:col-span-4 space-y-4">
          <div className="aspect-[4/5] w-full rounded-2xl bg-[#131316] border border-[#26262B] flex flex-col items-center justify-center p-6 relative overflow-hidden group">
            {/* Editorial Avatar Overlay */}
            <div className="absolute inset-0 bg-[#C9A961]/[0.02] bg-gradient-to-b from-transparent to-[#0A0A0B]/80 z-10" />
            <div className="relative z-20 h-24 w-24 rounded-full bg-[#1C1C20] border-2 border-[#C9A961] shadow-xl overflow-hidden flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-[#C9A961]" />
            </div>
            <div className="text-center relative z-20">
              <h3 className="text-sm font-semibold text-white tracking-tight">Vinay Naidu</h3>
              <p className="text-[10px] text-[#A1A1A9] font-mono uppercase tracking-wider mt-1">Managing Broker & Founder</p>
            </div>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#26262B] bg-[#131316] hover:bg-[#1C1C20] text-xs font-semibold text-[#F5F5F7] transition-all cursor-pointer select-none active:scale-95"
            id="view_linkedin_about"
          >
            <span>LinkedIN Verified Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C9A961]" />
          </a>
        </div>

        <div className="md:col-span-8 space-y-6">
          <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider text-[11px] text-[#C9A961] font-mono">The Mission & Genesis</h2>
          <div className="space-y-4 text-xs text-[#A1A1A9] leading-relaxed font-normal">
            <p>
              In 2024, after witnessing numerous domestic startups, venture funds, and micro-influencers lose high-value social namespaces to Telegram phishers, middleman scams, or complex platform locks, I set out to construct a transparent alternative. 
            </p>
            <p>
              The digital handle market is broken: it thrives on anonymous usernames, crypto payouts, and unvetted escrow schemes that have high legal risks under Indian law. There is no automated algorithmic clearing engine that can override Instagram or X's underlying security terms. Real trust requires human vigilance.
            </p>
            <p>
              IDsvault was constructed as a solo boutique brokerage desk. I review every handle listed, coordinate the KYC clearances personally, and stay present on live calls to verify and secure administrative transfers before distributing seller capital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-xl bg-[#131316] border border-[#26262B]">
              <span className="text-[10px] font-mono text-[#C9A961] block mb-1">01. ABSOLUTE VERIFIABILITY</span>
              <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
                If I cannot verify a seller's physical ownership, video-proof, and creation email history, the handle is not listed. Zero speculation.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#131316] border border-[#26262B]">
              <span className="text-[10px] font-mono text-[#C9A961] block mb-1">02. NATIVE JURISDICTION</span>
              <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
                Fully registered sole proprietorship in Hyderabad, paying 18% GST under SAC 998311. Solid domestic bank current accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace & Location */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch border-t border-[#26262B] pt-12">
        <div className="space-y-4 flex flex-col justify-center">
          <div className="p-3 bg-[#131316] border border-[#26262B] rounded-lg w-max text-[#C9A961]">
            <Building className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Hyderabad HQ Desk</h2>
          <p className="text-xs text-[#A1A1A9] leading-relaxed">
            Our brokerage operations are physically conducted out of Madhapur, Hi-Tech City, Hyderabad. Unlike anonymous Telegram group administrators, we welcome corporate clients to schedule physical consultative meetings and coordinate transaction handovers live from a verified commercial workspace location.
          </p>
          <div className="space-y-2 pt-2 text-xs font-mono text-[#6E6E78]">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#C9A961]" />
              <span className="text-[#A1A1A9]">Desk 4A, High-Tech Workspace Plaza, Madhapur, Hyderabad</span>
            </p>
            <p className="flex items-center gap-2">
              <FileCheck className="h-3.5 w-3.5 text-[#C9A961]" />
              <span className="text-[#A1A1A9]">Udyam Registration: UDYAM-TS-02-0038419</span>
            </p>
          </div>
        </div>

        {/* Conceptual Premium Editorial Image Box */}
        <div className="rounded-2xl bg-[#131316] border border-[#26262B] p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#C9A961]/[0.01] pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <span className="text-[8px] font-mono text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded uppercase tracking-wider font-extrabold select-none">Live Operations</span>
            <h4 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">100% Manual Supervision Guarantee</h4>
            <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
              Every invoice is generated sequentially, client identities are held in air-gapped secure vaults, and 18% GST is collected on facilitation fees. We operate with standard, pristine corporate compliance.
            </p>
          </div>
          
          <div className="pt-6 border-t border-[#26262B] flex items-center justify-between text-xs font-bold leading-none select-none relative z-10">
            <button 
              onClick={() => onNavigate("process")} 
              className="text-[#C9A961] hover:text-[#D4B670] flex items-center gap-1.5 cursor-pointer text-[11px]"
            >
              <span>See Our Handover Process</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
