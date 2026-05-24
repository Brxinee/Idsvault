/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, MapPin, FileCheck, Mail, Briefcase } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0A0A0B] py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8 text-sm text-[#8E8E93]">
        
        {/* Row 1: Brand & Core Directory Actions horizontally */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/[0.05]">
          
          {/* Logo & Headline */}
          <div className="space-y-2 text-left max-w-md">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Shield className="h-5 w-5 text-[#D4AF37]" />
              <span className="font-semibold text-lg text-white font-display tracking-tight">IDsvault</span>
            </button>
            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Premium digital identity brokerage desk based in Hyderabad. Serving startups, creators, and brands with verified human brokerage and secure holds.
            </p>
          </div>

          {/* Navigation Links Horizontally */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold">
            <button onClick={() => onNavigate("browse")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              Marketplace Directory
            </button>
            <button onClick={() => onNavigate("keep")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              Keep Desk
            </button>
            <button onClick={() => onNavigate("sell")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              Sell Username
            </button>
            <button onClick={() => onNavigate("request")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              Private Sourcing
            </button>
            <button onClick={() => onNavigate("blog")} className="text-[#D4AF37] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              📖 Strategy Library (AEO/GEO)
            </button>
            <button onClick={() => onNavigate("faq")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              FAQ Base
            </button>
            <button onClick={() => onNavigate("contact")} className="text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
              Connect Desk
            </button>
            <button onClick={() => onNavigate("admin")} className="text-gray-550 hover:text-white text-[10px] transition-colors cursor-pointer">
              Internal Admin
            </button>
          </nav>
        </div>

        {/* Row 2: Hyderabad HQ metadata in a horizontal row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#8E8E93] font-mono justify-start">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider block mr-2">HYDERABAD HQ DESK:</span>
          
          <span className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Madhapur Hi-Tech City, Hyderabad, IN</span>
          </span>
          
          <span className="flex items-center gap-1.5 text-gray-300">
            <FileCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>GST: 36AAPCV8248M1ZC</span>
          </span>
          
          <span className="flex items-center gap-1.5 text-gray-300">
            <Briefcase className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Founder: Vinay Naidu</span>
          </span>

          <span className="flex items-center gap-1.5 text-gray-300">
            <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
            <a href="mailto:broker@idsvault.com" className="hover:text-[#D4AF37] transition-all underline animate-pulse">broker@idsvault.com</a>
          </span>
        </div>

        {/* Row 3: Regulatory Notice + Legal Policies Horizontally */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 border-t border-white/[0.05] text-[11px] text-[#8E8E93]">
          
          {/* Policy Links Group */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium">
            <span className="text-white/60">Policies:</span>
            <button onClick={() => onNavigate("policy-acceptable")} className="hover:text-white transition-colors cursor-pointer text-left">
              Acceptable Use
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-trademark")} className="hover:text-white transition-colors cursor-pointer text-left">
              Trademark Rules
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-refund")} className="hover:text-white transition-colors cursor-pointer text-left">
              Refund Rules & Escrow
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-terms")} className="hover:text-white transition-colors cursor-pointer text-left">
              Terms of Service
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-privacy")} className="hover:text-white transition-colors cursor-pointer text-left">
              Privacy Protection
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-aml-kyc")} className="hover:text-white transition-colors cursor-pointer text-left">
              AML & KYC
            </button>
          </div>

          <div className="max-w-xl text-left lg:text-right space-y-1 font-sans text-gray-500 leading-relaxed text-[10px]">
            <p>
              Warning: IDsvault is fully independent and is not endorsed or officially affiliated with Meta Platforms, Instagram, X Corp, or Telegram Inc. Social usernames remain subject to platform terms.
            </p>
            <p className="text-[9px] text-[#8E8E93] font-mono">
              © 2026 IDsvault. All rights reserved. Registered digital identity facilitation registry.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
