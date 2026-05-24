/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#050505] py-16 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-400">

        {/* Brand */}
        <div className="space-y-4 md:col-span-1 text-left">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-lg text-white">IDsvault</span>
          </Link>
          <p className="text-xs text-gray-500 leading-relaxed">
            Independent username brokerage marketplace. Buyer and seller verified. Payment held in escrow until transfer is complete. Hyderabad, India.
          </p>
          <div className="text-[11px] text-gray-500 space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gray-600 shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gray-600 shrink-0" />
              <a href="mailto:support@idsvault.com" className="hover:text-white transition-colors">
                support@idsvault.com
              </a>
            </div>
          </div>
        </div>

        {/* Marketplace */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Marketplace</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/browse"  className="hover:text-white transition-colors">Browse Handles</Link></li>
            <li><Link to="/sell"    className="hover:text-white transition-colors">Sell Your Username</Link></li>
            <li><Link to="/source"  className="hover:text-white transition-colors">Custom Sourcing</Link></li>
            <li><Link to="/blog"    className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Desk</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Policies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/policy/acceptable" className="hover:text-white transition-colors">Acceptable Use</Link></li>
            <li><Link to="/policy/trademark"  className="hover:text-white transition-colors">Trademark Policy</Link></li>
            <li><Link to="/policy/refund"     className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link to="/faq"               className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/policy/terms"   className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li className="pt-3 border-t border-white/[0.04]">
              <Link to="/admin" className="hover:text-white text-[10px] text-gray-600 transition-colors">
                Admin Console
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-gray-600">
        <p>© {year} IDsvault. All rights reserved. Independent brokerage — not affiliated with Meta, X Corp, or Telegram.</p>
        <p className="font-mono">Hyderabad, Telangana, India</p>
      </div>
    </footer>
  );
};
