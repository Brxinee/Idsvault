/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "./SEO";
import { Shield, ArrowLeft, Search, Compass, HelpCircle, PhoneCall } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <SEO
        title="Page Not Found (404)"
        description="The requested digital identity resource or page could not be found on IDsvault."
        canonical="/404"
        noindex={true}
      />

      <div className="max-w-lg w-full text-center space-y-8 bg-surface border border-white/[0.08] p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-semibold">
          <Shield className="h-3.5 w-3.5" />
          <span>HTTP 404 — RESOURCE NOT FOUND</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Looking for a handle or record?
          </h1>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
            The page or asset route you followed doesn’t exist or may have been relocated. IDsvault’s active inventory and journal records remain fully accessible.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            to="/inventory"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-light text-canvas text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            <Compass className="h-4 w-4" />
            <span>Browse Inventory</span>
          </Link>
          <Link
            to="/journal"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-white/[0.1] hover:border-white/[0.2] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            <Search className="h-4 w-4 text-blue-400" />
            <span>Read Journal</span>
          </Link>
        </div>

        {/* Secondary Links */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Go Back</span>
          </button>
          <Link to="/process" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <HelpCircle className="h-3.5 w-3.5 text-gray-500" />
            <span>How Transfer Works</span>
          </Link>
          <Link to="/contact" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <PhoneCall className="h-3.5 w-3.5 text-gray-500" />
            <span>Contact Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
