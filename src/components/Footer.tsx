/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0A0A0B] py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-[#8E8E93]">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1 text-left">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <Shield className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold text-lg text-white font-display tracking-tight">IDsvault</span>
          </button>
          <p className="text-xs text-[#8E8E93] leading-relaxed">
            Premium, independent digital identity brokerage desk based in Hyderabad. Serving startusp, creators, and brands with verified human brokerage and secure holds.
          </p>
          <div className="text-[11px] text-[#8E8E93] space-y-1 font-mono pt-2">
            <p className="font-bold text-white uppercase tracking-wider text-[9px] mb-1">Hyderabad HQ Desk</p>
            <p className="text-gray-300">📍 Madhapur Hi-Tech City, Hyderabad, IN</p>
            <p className="text-gray-300">💼 GST No: 36AAPCV8248M1ZC</p>
            <p className="text-gray-300">👤 Founder: Vinay Naidu</p>
            <p>✉️ <a href="mailto:broker@idsvault.com" className="hover:text-[#D4AF37] transition-colors text-white">broker@idsvault.com</a></p>
          </div>
        </div>

        {/* Registry navigation */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono text-[#D4AF37]">Registry Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("browse")} className="hover:text-white transition-colors cursor-pointer text-left">
                Marketplace Directory
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("sell")} className="hover:text-white transition-colors cursor-pointer text-left">
                Sell Username Application
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("request")} className="hover:text-white transition-colors cursor-pointer text-left">
                Private Sourcing Campaign
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("blog")} className="hover:text-white transition-colors cursor-pointer text-left font-semibold text-[#D4AF37]">
                📖 Strategy Library (AEO/GEO)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors cursor-pointer text-left">
                📞 Connect Desk
              </button>
            </li>
            <li className="pt-1.5 border-t border-[#2A2A2E]">
              <button onClick={() => onNavigate("admin")} className="hover:text-white text-[10px] text-gray-500 transition-colors cursor-pointer text-left">
                🔐 Internal Admin Portal 
              </button>
            </li>
          </ul>
        </div>

        {/* Operational Guidelines */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono text-[#D4AF37]">Policies & Guidelines</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("policy-acceptable")} className="hover:text-white transition-colors cursor-pointer text-left">
                Acceptable Use
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-trademark")} className="hover:text-white transition-colors cursor-pointer text-left">
                Trademark Rules
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-refund")} className="hover:text-white transition-colors cursor-pointer text-left">
                Refund Rules & Escrow
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("faq")} className="hover:text-white transition-colors cursor-pointer text-left">
                Knowledge FAQ Base
              </button>
            </li>
          </ul>
        </div>

        {/* Regulatory Posture */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono text-[#D4AF37]">Legal Framework</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("policy-terms")} className="hover:text-white transition-colors cursor-pointer text-left">
                Terms of Service (ToS)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-privacy")} className="hover:text-white transition-colors cursor-pointer text-left">
                Privacy Protection
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-aml-kyc")} className="hover:text-white transition-colors cursor-pointer text-left">
                AML & KYC Standard
              </button>
            </li>
            <li className="text-[10px] text-gray-600 leading-normal pt-1 italic font-sans">
              Warning: IDsvault is fully independent and is not endorsed or officially affiliated with Meta Platforms, Instagram, X Corp, or Telegram Inc. Social usernames are subject to platform Terms of Service.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
