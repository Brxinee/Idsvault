/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { ShieldCheck, Calculator, ArrowRight, MessageSquare, Sparkles } from "lucide-react";

const VALUATION_FAQS = [
  {
    question: "How is a social media username valued in India?",
    answer: "Username valuation is based on character length (2-3 letter handles command top tier), dictionary status (single English nouns), search volume on Instagram/X/Telegram, commercial brand fit (fintech, real estate, luxury), and Original Registration Email (ORE) clean history."
  },
  {
    question: "Does IDsvault provide free username appraisals?",
    answer: "Yes. IDsvault provides complimentary confidential appraisals for high-tier Instagram, X, and Telegram usernames owned by Indian residents and brands."
  }
];

export const ValuationLanding: React.FC = () => {
  const [length, setLength] = useState<string>("short");
  const [platform, setPlatform] = useState<string>("Instagram");
  const [type, setType] = useState<string>("dictionary");

  const getEstimatedRange = () => {
    if (platform === "Instagram") {
      if (type === "acronym") return "₹8,00,000 – ₹30,00,000+";
      if (type === "dictionary") return "₹12,00,000 – ₹60,00,000+";
      if (type === "keyword") return "₹3,00,000 – ₹15,00,000";
      return "₹1,50,000 – ₹6,00,000";
    } else if (platform === "X") {
      if (type === "acronym") return "₹5,00,000 – ₹25,00,000+";
      if (type === "dictionary") return "₹8,00,000 – ₹35,00,000+";
      return "₹2,00,000 – ₹10,00,000";
    } else {
      if (type === "acronym") return "₹3,00,000 – ₹15,00,000";
      if (type === "dictionary") return "₹5,00,000 – ₹20,00,000";
      return "₹1,00,000 – ₹8,00,000";
    }
  };

  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Username Valuation", url: "/username-valuation" }
    ]),
    buildFAQSchema(VALUATION_FAQS)
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Username Valuation & Handle Appraisal in India | IDsvault"
        description="Calculate estimated valuation for Instagram, X, and Telegram usernames in Indian Rupees. Appraisal methodology based on character length, dictionary classification, and brandability."
        canonical="/username-valuation"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Valuation Desk · India Market Benchmarks</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Username <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">Valuation & Appraisal</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Determine the fair market value of premium social media handles and brandable usernames based on current transaction benchmarks in the Indian market.
          </p>

          {/* Interactive Valuation Estimator Box */}
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-violet-500/30 max-w-2xl shadow-2xl mb-12">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-violet-400" />
              <span>Instant Username Valuation Benchmark (INR)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs text-ghost font-mono uppercase mb-2">Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full bg-surface-elevated border border-white/10 rounded-lg p-2.5 text-sm text-white"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="X">X (Twitter)</option>
                  <option value="Telegram">Telegram</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-ghost font-mono uppercase mb-2">Asset Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full bg-surface-elevated border border-white/10 rounded-lg p-2.5 text-sm text-white"
                >
                  <option value="dictionary">Single Dictionary Noun</option>
                  <option value="acronym">2-3 Letter Acronym</option>
                  <option value="keyword">Industry Category Keyword</option>
                  <option value="brandable">Brandable 5-7 Letters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-ghost font-mono uppercase mb-2">Market</label>
                <div className="w-full bg-surface-elevated border border-white/10 rounded-lg p-2.5 text-sm font-mono text-emerald-400 font-bold">
                  India (INR)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-center">
              <div className="text-xs text-ghost font-mono uppercase mb-1">Estimated Valuation Benchmark</div>
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-mono">
                {getEstimatedRange()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Valuation Methodology FAQs</h2>
          <div className="space-y-6">
            {VALUATION_FAQS.map((faq, i) => (
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
