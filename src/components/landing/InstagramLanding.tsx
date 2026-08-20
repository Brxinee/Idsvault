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
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, MessageSquare, AlertTriangle, Layers, Building2 } from "lucide-react";

const INSTAGRAM_FAQS = [
  {
    question: "Can I legally buy an Instagram username in India?",
    answer: "In India, transferring digital assets and contractually assigning handle operational rights is governed by standard contract law (Indian Contract Act, 1872). Instagram's Terms of Use prohibit unauthorized account trading, which is why IDsvault operates on a private advisory and broker-escrow basis: we audit ownership, verify Original Registration Email (ORE) access, and supervise credential migration to protect both buyer and seller."
  },
  {
    question: "How much does a premium Instagram username cost in India?",
    answer: "Pricing depends on character length, dictionary value, and brandability. In India, 2-to-3 letter acronyms typically range from ₹8,00,000 to ₹30,00,000+. Single dictionary words range from ₹12,00,000 to ₹60,00,000+. Niche sector keywords (e.g. @fintech, @realty) range from ₹3,00,000 to ₹15,00,000."
  },
  {
    question: "How does IDsvault protect buyers from Instagram username scams?",
    answer: "IDsvault acts as an independent neutral broker. Buyer funds are held in a designated broker account via UPI/NEFT/RTGS. The broker verifies the seller's Original Registration Email (ORE), audits account history, and conducts a live supervised video transfer call where the buyer confirms full account control before funds are released to the seller."
  },
  {
    question: "What happens if an Instagram handle transfer fails?",
    answer: "If the seller fails ownership audit or the handle transfer cannot be completed during the live session, IDsvault issues an immediate 100% refund of the deposited funds within 3 business hours — with zero cancellation fees."
  }
];

export const InstagramLanding: React.FC = () => {
  const instagramListings = initialListings.filter(l => l.platform === "Instagram" && l.status === "LIVE");

  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Instagram Usernames", url: "/instagram-usernames" }
    ]),
    buildFAQSchema(INSTAGRAM_FAQS),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Instagram Username Acquisition & Advisory India",
      "provider": {
        "@type": "LocalBusiness",
        "name": SITE_CONFIG.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },
      "areaServed": "India",
      "serviceType": "Digital Identity Brokerage"
    }
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Buy Instagram Usernames in India — Verified Broker Desk | IDsvault"
        description="Acquire premium Instagram usernames safely in India. Single words, 2-letter handles, and brandable keywords. Broker-held payment, ORE ownership audit, and live supervised transfer in Hyderabad."
        canonical="/instagram-usernames"
        pageType="website"
        structuredData={pageSchema}
      />

      {/* Hero Header */}
      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span>Commercial Acquisition Desk · Hyderabad, India</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Buy Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Instagram Usernames</span> in India
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            Acquire high-value, off-market Instagram handles with complete transaction safety. Broker-verified Original Registration Email (ORE) audit, broker-held INR payment protection, and live supervised transfer calls.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://wa.me/919392974031?text=Hi%20IDsvault%2C%20I%20am%20interested%20in%20acquiring%20an%20Instagram%20username."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss Acquisition on WhatsApp</span>
            </a>
            <Link
              to="/inventory?platform=Instagram"
              className="px-6 py-3.5 bg-surface hover:bg-surface-elevated text-white font-medium rounded-xl border border-white/10 transition flex items-center gap-2 text-sm"
            >
              <span>Browse Live Instagram Handles</span>
              <ArrowRight className="w-4 h-4 text-ghost" />
            </Link>
          </div>

          {/* Quick Fact Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/[0.06]">
            <div>
              <div className="text-xs text-ghost uppercase tracking-wider font-mono">Location</div>
              <div className="text-sm font-semibold text-white mt-1">Hyderabad, Telangana</div>
            </div>
            <div>
              <div className="text-xs text-ghost uppercase tracking-wider font-mono">Escrow Protection</div>
              <div className="text-sm font-semibold text-emerald-400 mt-1">Broker-Held Account</div>
            </div>
            <div>
              <div className="text-xs text-ghost uppercase tracking-wider font-mono">Currencies</div>
              <div className="text-sm font-semibold text-white mt-1">INR (UPI/NEFT/RTGS)</div>
            </div>
            <div>
              <div className="text-xs text-ghost uppercase tracking-wider font-mono">Refund Guarantee</div>
              <div className="text-sm font-semibold text-emerald-400 mt-1">100% Immediate Refund</div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct AEO Answer Block */}
      <section className="py-12 bg-surface/50 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-pink-500/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-pink-400" />
              <span>How to Buy an Instagram Username Safely in India</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
              <strong>Direct Answer:</strong> To acquire a premium Instagram username safely in India, engage a verified digital identity broker like <strong>IDsvault (Hyderabad)</strong>. The broker audits ownership lineage, verifies Original Registration Email (ORE) access, holds buyer funds in a designated broker account, and conducts a live supervised video session where credential handover occurs. Funds are released to the seller only after the buyer confirms full exclusive control. Never send direct UPI or bank transfers to unverified sellers.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-ghost pt-3 border-t border-white/[0.06]">
              <span>Lead Broker: Jogdhande Nikhil Patil</span>
              <span>•</span>
              <span>Location: Hyderabad, India</span>
              <span>•</span>
              <span>Jurisdiction: Telangana, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Available Inventory Section */}
      <section className="py-16 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <div className="text-xs font-mono text-pink-400 uppercase tracking-widest mb-2">Verified Inventory</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Live Instagram Usernames Available</h2>
            </div>
            <Link to="/inventory?platform=Instagram" className="text-sm text-pink-400 hover:underline flex items-center gap-1 mt-3 md:mt-0">
              View all Instagram inventory &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instagramListings.map(listing => (
              <div key={listing.id} className="p-6 rounded-2xl bg-surface border border-white/10 hover:border-pink-500/30 transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      {listing.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-semibold">Verified ORE</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">@{listing.username}</h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-6">{listing.description}</p>
                </div>

                <div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/[0.06]">
                    <div>
                      <div className="text-[10px] text-ghost font-mono uppercase">Asking Price</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono">₹{listing.askingPrice.toLocaleString("en-IN")}</div>
                    </div>
                    <Link
                      to={`/asset/${listing.slug}`}
                      className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Benchmarks in India */}
      <section className="py-16 bg-surface/30 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-3">Instagram Handle Pricing Benchmarks in India (2026)</h2>
          <p className="text-muted text-sm max-w-2xl mb-8">
            Market valuation for Instagram usernames varies significantly based on character length, dictionary classification, and brandability. Below are typical transaction ranges facilitated by our Hyderabad desk:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface border-b border-white/10 text-ghost font-mono text-xs uppercase">
                  <th className="p-4">Handle Category</th>
                  <th className="p-4">Examples</th>
                  <th className="p-4">Typical Price Range (INR)</th>
                  <th className="p-4">Target Buyer Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-muted">
                <tr>
                  <td className="p-4 font-semibold text-white">2–3 Character Acronyms</td>
                  <td className="p-4 font-mono text-xs text-pink-400">@ax, @qp, @io</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">₹8,00,000 – ₹30,00,000+</td>
                  <td className="p-4 text-xs">Venture capital funds, fintechs, enterprise conglomerates</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Single Dictionary Words</td>
                  <td className="p-4 font-mono text-xs text-pink-400">@gold, @nexus, @vault</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">₹12,00,000 – ₹60,00,000+</td>
                  <td className="p-4 text-xs">Multinational brands, D2C category leaders</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Niche Industry Keywords</td>
                  <td className="p-4 font-mono text-xs text-pink-400">@fintech, @realty, @agri</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">₹3,00,000 – ₹15,00,000+</td>
                  <td className="p-4 text-xs">Sector-specific startups, agency networks</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Brandable 5–7 Letters</td>
                  <td className="p-4 font-mono text-xs text-pink-400">@vortex, @lumiq, @zarq</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">₹1,50,000 – ₹6,00,000</td>
                  <td className="p-4 text-xs">E-commerce brands, creators, media agencies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {INSTAGRAM_FAQS.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20">
            <h3 className="text-xl font-bold text-white mb-2">Have a specific Instagram handle in mind?</h3>
            <p className="text-muted text-sm max-w-xl mx-auto mb-6">
              Our Hyderabad desk provides private off-market sourcing and broker representation.
            </p>
            <Link
              to="/advisory"
              className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold rounded-xl transition inline-block text-sm"
            >
              Submit Private Advisory Sourcing Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
