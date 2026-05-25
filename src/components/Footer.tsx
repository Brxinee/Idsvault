/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-canvas py-16 px-6 mt-auto">
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
            IDsvault — Digital Identity Facilitation Desk. India-based broker-advised service for Telegram usernames, domains, Discord communities, and selected YouTube transfers.
          </p>
          <div className="text-[11px] text-gray-500 space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gray-600 shrink-0" />
              <span>Hyderabad, Telangana — 500 081, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gray-600 shrink-0" />
              <a href="tel:+919392974031" className="hover:text-white transition-colors">
                +91 93929 74031
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gray-600 shrink-0" />
              <a href="mailto:broker@idsvault.com" className="hover:text-white transition-colors">
                broker@idsvault.com
              </a>
            </div>
            <div className="pt-1 text-[10px] text-gray-600 font-mono">
              GSTIN: Applied / [XX XXXXX XXXXX XX]
              <span className="block text-[9px] text-gray-700 mt-0.5">to be updated on registration</span>
            </div>
          </div>
        </div>

        {/* Marketplace */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/inventory" className="hover:text-white transition-colors">Inventory</Link></li>
            <li><Link to="/sell"      className="hover:text-white transition-colors">Submit an Asset</Link></li>
            <li><Link to="/advisory"  className="hover:text-white transition-colors">Private Advisory</Link></li>
            <li><Link to="/about"     className="hover:text-white transition-colors">About IDsvault</Link></li>
            <li><Link to="/journal"   className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link to="/contact"   className="hover:text-white transition-colors">Contact Desk</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Trust</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/policy/aml-kyc" className="hover:text-white transition-colors">AML & KYC</Link></li>
            <li><Link to="/policy/sanctions"  className="hover:text-white transition-colors">Sanctions</Link></li>
            <li><Link to="/policy/dispute"     className="hover:text-white transition-colors">Dispute Resolution</Link></li>
            <li><Link to="/faq"               className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/policy/terms"   className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/policy/risk-disclosure"  className="hover:text-white transition-colors">Risk Disclosure</Link></li>
            <li><Link to="/policy/acceptable-use"   className="hover:text-white transition-colors">Acceptable Use</Link></li>
            <li><Link to="/policy/trademark"        className="hover:text-white transition-colors">Trademark</Link></li>
            <li><Link to="/policy/imprint"          className="hover:text-white transition-colors">Imprint</Link></li>
            <li className="pt-3 border-t border-white/[0.04]">
              <Link to="/admin" className="hover:text-white text-[10px] text-gray-600 transition-colors">
                Admin Console
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.04] space-y-3">
        <p className="text-[10px] text-gray-600 leading-relaxed max-w-3xl">
          IDsvault facilitates private transfer agreements. We do not own digital assets. All transactions governed by Indian law, Hyderabad jurisdiction. Platform trademarks belong to respective owners.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] text-gray-600">
          <p>© {year} IDsvault. All rights reserved. Independent brokerage — not affiliated with Meta, X Corp, or Telegram.</p>
          <p className="font-mono">Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  );
};
