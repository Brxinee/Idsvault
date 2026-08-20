/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { initialListings } from "../../data";
import { ShieldCheck, MessageSquare, ArrowRight } from "lucide-react";

import { Platform, DealStatus } from "../../types";

const TELEGRAM_FAQS = [
  {
    question: "Can I buy Telegram usernames in India with INR?",
    answer: "Yes. IDsvault facilitates Telegram username transactions in Indian Rupees (INR) via UPI, NEFT, RTGS, and IMPS. We handle direct username transfers as well as Fragment TON auction coordination for Indian buyers and sellers."
  },
  {
    question: "How does a Telegram username transfer work?",
    answer: "Telegram handles can be transferred directly between accounts or converted into collectible Fragment NFT handles on the TON blockchain. IDsvault's broker supervises the release-and-claim or Fragment transfer live, keeping buyer payment protected in broker escrow."
  },
  {
    question: "How much is a premium Telegram username in India?",
    answer: "Short 4-character Telegram usernames generally range from ₹1,00,000 to ₹20,00,000 depending on keyword popularity, search volume, and Fragment collectible valuation."
  }
];

export const TelegramLanding: React.FC = () => {
  const telegramListings = initialListings.filter(l => l.platform === Platform.Telegram && l.status === DealStatus.Live);

  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Telegram Usernames", url: "/telegram-usernames" }
    ]),
    buildFAQSchema(TELEGRAM_FAQS)
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Buy Telegram Usernames in India — Verified Escrow Desk | IDsvault"
        description="Acquire short and premium Telegram usernames in India with INR payment (UPI/NEFT). Broker-supervised release-and-claim and Fragment auction assistance from Hyderabad."
        canonical="/telegram-usernames"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Telegram Channel & Username Desk · Hyderabad</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Buy Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">Telegram Usernames</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Acquire high-demand Telegram usernames and channel handles. Paid in INR via UPI/NEFT under broker-supervised release-and-claim protocols.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://wa.me/919392974031?text=Hi%20IDsvault%2C%20I%20want%20to%20buy%20a%20Telegram%20username."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Telegram Username Acquisition</span>
            </a>
            <Link
              to="/inventory?platform=Telegram"
              className="px-6 py-3.5 bg-surface hover:bg-surface-elevated text-white font-medium rounded-xl border border-white/10 transition flex items-center gap-2 text-sm"
            >
              <span>Browse Telegram Handles</span>
              <ArrowRight className="w-4 h-4 text-ghost" />
            </Link>
          </div>
        </div>
      </section>

      {/* AEO Block */}
      <section className="py-12 bg-surface/50 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-sky-500/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>Telegram Handle Transfer Process</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              <strong>Direct Answer:</strong> Telegram username transfers require precise synchronization during the release-and-claim window. IDsvault holds buyer funds in a designated broker account, coordinates the live transfer call, and releases payment to the seller only after the buyer secures the handle.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Telegram Username FAQs</h2>
          <div className="space-y-6">
            {TELEGRAM_FAQS.map((faq, i) => (
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
