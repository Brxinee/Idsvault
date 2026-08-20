/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { SITE_CONFIG } from "../../lib/siteConfig";
import { initialListings } from "../../data";
import { ShieldCheck, MessageSquare, ArrowRight } from "lucide-react";

import { Platform, DealStatus } from "../../types";

const X_FAQS = [
  {
    question: "How do I buy an X (Twitter) handle in India?",
    answer: "To acquire an X handle in India without scam exposure, hire IDsvault's Hyderabad desk. We verify the current handle owner, negotiate clear terms, hold buyer funds in a designated broker account (UPI/NEFT/RTGS), and oversee credential handover on a live supervised call before releasing seller funds."
  },
  {
    question: "What is the price of a short X handle in India?",
    answer: "Short X handles (2 to 4 characters) typically command ₹3,00,000 to ₹25,00,000+ depending on acronym relevance, corporate trademark conflicts, and account creation history."
  },
  {
    question: "Are X handle transfers safe with a broker?",
    answer: "Yes. Direct peer-to-peer transfers carry severe risks of advance-payment theft or account reclamation via registered recovery phone/email. IDsvault eliminates these risks by sanitizing account credentials and holding payment until the buyer confirms exclusive login control."
  }
];

export const XLanding: React.FC = () => {
  const xListings = initialListings.filter(l => l.platform === Platform.X && l.status === DealStatus.Live);

  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "X Usernames", url: "/x-usernames" }
    ]),
    buildFAQSchema(X_FAQS)
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Buy X (Twitter) Handles in India — Verified Broker Desk | IDsvault"
        description="Acquire corporate and brandable X (Twitter) handles safely in India. Broker-verified ownership, broker-held payment protection, and live supervised transfer in Hyderabad."
        canonical="/x-usernames"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" />
            <span>Corporate Handle Sourcing · Hyderabad Desk</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Buy Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">X (Twitter) Handles</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Elevate corporate trust and executive branding with concise X handles. Broker-supervised transfers, verified ownership, and broker-held payment protection in INR.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://wa.me/919392974031?text=Hi%20IDsvault%2C%20I%20am%20looking%20to%20acquire%20an%20X%20handle."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss X Handle Acquisition</span>
            </a>
            <Link
              to="/inventory?platform=X"
              className="px-6 py-3.5 bg-surface hover:bg-surface-elevated text-white font-medium rounded-xl border border-white/10 transition flex items-center gap-2 text-sm"
            >
              <span>Browse X Inventory</span>
              <ArrowRight className="w-4 h-4 text-ghost" />
            </Link>
          </div>
        </div>
      </section>

      {/* Direct AEO Block */}
      <section className="py-12 bg-surface/50 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-slate-500/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-300" />
              <span>How X Handle Acquisition Works at IDsvault</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              <strong>Direct Answer:</strong> IDsvault facilitates off-market X (Twitter) handle acquisitions for Indian enterprises and founders. The broker verifies current ownership, audits account age and history, holds buyer payment in a designated broker account, and conducts a live credential migration call. Payment is released to the seller only after the buyer confirms exclusive access.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions — X Handles</h2>
          <div className="space-y-6">
            {X_FAQS.map((faq, i) => (
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
