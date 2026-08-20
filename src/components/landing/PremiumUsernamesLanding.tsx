/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { initialListings } from "../../data";
import { ShieldCheck, ArrowRight, MessageSquare } from "lucide-react";

const PREMIUM_FAQS = [
  {
    question: "What defines a premium username?",
    answer: "A premium username is a short, memorable, dictionary noun, 2-to-3 character acronym, or high-intent industry keyword on social platforms like Instagram, X, and Telegram."
  },
  {
    question: "How do I purchase a premium username on IDsvault?",
    answer: "Browse our verified inventory or submit an advisory request. Once terms are agreed, deposit funds in IDsvault's designated broker account via UPI/NEFT/RTGS. The broker supervises live credential migration before releasing funds to the seller."
  }
];

export const PremiumUsernamesLanding: React.FC = () => {
  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Premium Usernames", url: "/premium-usernames" }
    ]),
    buildFAQSchema(PREMIUM_FAQS)
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Premium Usernames & Brandable Social Handles Marketplace India | IDsvault"
        description="Explore premium social media usernames and brandable handles for sale in India. Instagram, X (Twitter), Telegram, and brandable domains with broker payment protection."
        canonical="/premium-usernames"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
            <span>Verified Marketplace Directory · India Desk</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">Usernames & Brandable Handles</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Acquire high-tier digital identity assets across Instagram, X, Telegram, and brandable domains under broker-held payment protection.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/inventory"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
            >
              <span>Browse Full Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/advisory"
              className="px-6 py-3.5 bg-surface hover:bg-surface-elevated text-white font-medium rounded-xl border border-white/10 transition flex items-center gap-2 text-sm"
            >
              <span>Submit Sourcing Request</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Inventory Preview */}
      <section className="py-16 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Verified Handles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialListings.slice(0, 6).map(listing => (
              <div key={listing.id} className="p-6 rounded-2xl bg-surface border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {listing.platform}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-semibold">Verified</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">@{listing.username}</h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-6">{listing.description}</p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex justify-between items-center">
                  <div className="text-lg font-bold text-emerald-400 font-mono">₹{listing.askingPrice.toLocaleString("en-IN")}</div>
                  <Link to={`/asset/${listing.slug}`} className="text-xs text-white underline font-semibold">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {PREMIUM_FAQS.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
