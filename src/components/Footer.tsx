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
    <footer className="border-t border-white/8 bg-[#050505] py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-400">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1 text-left">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-lg text-white">IDsvault</span>
          </button>
          <p className="text-xs text-gray-500 leading-relaxed">
            Premium, independent digital identity brokerage marketplace. Dedicated support, pre-listing verified review, and manual broker-assisted transfers since 2026.
          </p>
          <div className="text-[11px] text-gray-400 space-y-1 font-mono pt-2">
            <p className="font-bold text-white uppercase tracking-wider text-[9px] mb-1">Corporate Desk</p>
            <p>📍 Hyderabad, India</p>
            <p>✉️ <a href="mailto:support@idsvault.com" className="hover:text-white transition-colors">support@idsvault.com</a></p>
          </div>
        </div>

        {/* Registry navigation */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Registry Navigation</h4>
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
                Private Commission Sourcing
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("contact")} className="hover:text-white font-semibold text-blue-400 transition-colors cursor-pointer text-left">
                📞 Contact page
              </button>
            </li>
          </ul>
        </div>

        {/* Operational Guidelines */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Policies & Guidelines</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("policy-acceptable")} className="hover:text-white transition-colors cursor-pointer text-left">
                Acceptable Use
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-trademark")} className="hover:text-white transition-colors cursor-pointer text-left">
                Trademark Policy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-refund")} className="hover:text-white transition-colors cursor-pointer text-left">
                Refund Rules
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("faq")} className="hover:text-white transition-colors cursor-pointer text-left">
                Common Trust FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Regulatory Posture */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Legal Framework</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate("policy-terms")} className="hover:text-white transition-colors cursor-pointer text-left">
                Terms of Service
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("policy-privacy")} className="hover:text-white transition-colors cursor-pointer text-left">
                Privacy Policy
              </button>
            </li>
            <li className="text-[10px] text-gray-600 leading-normal pt-1">
              All third-party trademarks, names, and logos are the properties of their respective trademark holders. IDsvault is fully independent and has no official relationship with Instagram, X, or Telegram.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
