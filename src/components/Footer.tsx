/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, MapPin, FileCheck, Mail, Briefcase, Phone, HelpCircle } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0A0A0B] py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto space-y-12 text-sm text-[#8E8E93]">
        
        {/* Dense Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/[0.05]">
          
          {/* Column 1: Brand / Entity */}
          <div className="space-y-4 text-left">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Shield className="h-5 w-5 text-[#D4AF37]" />
              <span className="font-semibold text-lg text-white font-display tracking-tight">IDsvault</span>
            </button>
            <p className="text-xs text-[#8E8E93] leading-relaxed font-normal">
              Premium digital identity brokerage desk based in Hyderabad. Serving startups, enterprise platforms, and creators with secure human-supervised custody.
            </p>
            <div className="pt-2 text-[10px] font-mono leading-relaxed">
              <span className="text-white font-bold uppercase tracking-wider block mb-1">REGISTRATION:</span>
              <p>Sole Proprietorship Registry</p>
              <p>Telangana Shops Act Registered</p>
            </div>
          </div>

          {/* Column 2: Broker Services */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Broker Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("browse")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Browse Registry Inventory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("keep")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">
                  Keep Desk Custody
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("sell")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sell Handle Valuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("request")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Request Private Custom Handle
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Custom Process & Trust */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Process & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("process")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our 10-Step Handover
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("trust")} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-gray-300">
                  Trust Framework & Ledger
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("blog")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Journal / Strategy Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("faq")} className="hover:text-white transition-colors cursor-pointer text-left">
                  Faq Base
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("showcase")} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left font-mono text-[9px] uppercase tracking-wider font-bold">
                  ❖ Component Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Private Desk Sourcing */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Private Sourcing</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("advisory")} className="text-[#D4AF37] hover:text-white transition-colors font-semibold cursor-pointer text-left">
                  Elite Sourcing Advisory
                </button>
              </li>
              <li>
                <span className="text-[10px] text-gray-500 font-mono block">
                  Minimum Commission: 12%<br/>
                  Minimum Budget: ₹1,00,000<br/>
                  Retainer Hold Required
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Hyderabad Desk Coordinates */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Hyderabad Desk</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-1.5 text-gray-300 leading-normal">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Desk 4A, High-Tech Workspace Plaza, Madhapur, Hyderabad, TS, IN</span>
              </li>
              <li className="flex items-center gap-1.5 text-gray-300">
                <FileCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span className="font-mono">GST: 36AAPCV8248M1ZC</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#D4AF37]">
                <Mail className="h-3.5 w-3.5" />
                <a href="mailto:broker@idsvault.com" className="hover:underline font-mono">broker@idsvault.com</a>
              </li>
              <li className="flex items-center gap-1.5 text-gray-300">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                <a href="tel:+919392974031" className="hover:underline font-mono">+91 93929 74031</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Policies row mapping all 10 blueprints strictly */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium leading-normal text-left">
            <span className="text-white/60">Compliance Guidelines:</span>
            <button onClick={() => onNavigate("policy-terms")} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-privacy")} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-refund")} className="hover:text-white transition-colors cursor-pointer">
              Refund & Escrow
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-risk-disclosure")} className="hover:text-white transition-colors cursor-pointer">
              Risk Disclosure
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-dispute")} className="hover:text-white transition-colors cursor-pointer">
              Disputes Process
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-aml-kyc")} className="hover:text-white transition-colors cursor-pointer">
              AML & KYC
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-grievance")} className="hover:text-white transition-colors cursor-pointer">
              Grievance Officer
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-cookies")} className="hover:text-white transition-colors cursor-pointer">
              Cookie Policy
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-acceptable")} className="hover:text-white transition-colors cursor-pointer">
              Acceptable Use
            </button>
            <span className="text-white/[0.15]">•</span>
            <button onClick={() => onNavigate("policy-trademark")} className="hover:text-white transition-colors cursor-pointer">
              Trademarks
            </button>
          </div>

          {/* Independent Disclaimer */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 border-t border-white/[0.05] text-[10px]">
            <div className="max-w-xl text-left space-y-1.5 font-sans leading-relaxed text-gray-500">
              <p>
                IDSVAULT is a fully independent, private brokerage facilitation desk. We are not officially affiliated with, endorsed by, or licensed under Meta Platforms, Instagram, X Corp (Twitter), or Telegram Messenger Inc. Social usernames remain platform assets subject to platform Rules.
              </p>
              <p className="font-mono text-gray-600">
                Udyam Registration: UDYAM-TS-02-0038419 | Securing digital asset transitions under Hyderabad administrative compliance.
              </p>
            </div>
            <div className="text-left lg:text-right font-mono text-gray-650 self-end">
              <span>© 2026 IDsvault Registry. All rights reserved.</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
