/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { ShieldCheck, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

const SELL_FAQS = [
  {
    question: "How do I sell my Instagram username in India?",
    answer: "Submit your handle details to IDsvault for confidential ownership verification. Once verified and priced, we list your handle to vetted corporate buyers. Buyer funds are deposited into IDsvault's broker account before you hand over access, guaranteeing payment upon successful transfer."
  },
  {
    question: "What commission does IDsvault charge sellers?",
    answer: "IDsvault operates on a transparent tiered commission structure: 15% for deals under ₹5 Lakhs, 12% for deals between ₹5 Lakhs and ₹20 Lakhs, and 10% for deals above ₹20 Lakhs."
  },
  {
    question: "How long does it take to receive payment after handle transfer?",
    answer: "Payouts are disbursed immediately via NEFT, RTGS, or IMPS upon the buyer confirming account access during the live supervised transfer session — typically within 1 to 3 hours."
  }
];

export const SellInstagramLanding: React.FC = () => {
  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Sell Instagram Username", url: "/sell-instagram-username-india" }
    ]),
    buildFAQSchema(SELL_FAQS)
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Sell Instagram Username in India — Broker Valuation & Guaranteed Payout | IDsvault"
        description="Sell your premium Instagram handle safely in India. Verified corporate buyers, broker-held buyer funds in INR (NEFT/RTGS), zero payment risk. Hyderabad desk."
        canonical="/sell-instagram-username-india"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Seller Desk · Confidential Listing & Escrow</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Sell Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Instagram Username</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Divest premium Instagram handles to verified Indian buyers with complete payment security. Buyer funds are secured in broker escrow before you transfer account credentials.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/sell"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-amber-500/10"
            >
              <span>Submit Handle for Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919392974031?text=Hi%20IDsvault%2C%20I%20want%20to%20sell%20my%20Instagram%20username."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-surface hover:bg-surface-elevated text-white font-medium rounded-xl border border-white/10 transition flex items-center gap-2 text-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contact Broker on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* AEO Block */}
      <section className="py-12 bg-surface/50 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-amber-500/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>How Seller Protection Works at IDsvault</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              <strong>Direct Answer:</strong> To sell an Instagram username safely in India, submit your handle to IDsvault. The broker verifies your ownership (Original Registration Email) and agrees on a target INR valuation. IDsvault secures the buyer's full payment in a designated broker account before you hand over account credentials. Payment is wired to your Indian bank account immediately following successful transfer.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Seller FAQs</h2>
          <div className="space-y-6">
            {SELL_FAQS.map((faq, i) => (
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
