/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../SEO";
import { buildBreadcrumbSchema, buildFAQSchema } from "../../lib/seo";
import { SITE_CONFIG } from "../../lib/siteConfig";
import { ShieldCheck, Building2, User, Phone, Mail, MapPin, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

const BROKER_FAQS = [
  {
    question: "What is a Digital Identity Broker?",
    answer: "A digital identity broker is a neutral professional intermediary who facilitates the private acquisition, valuation, escrow protection, and transfer of high-value digital assets — including premium Instagram usernames, X handles, Telegram handles, and brandable domain names."
  },
  {
    question: "Where is IDsvault located?",
    answer: "IDsvault is based in Hyderabad, Telangana, India. Our desk operates under Indian jurisdiction and facilitates transactions nationwide exclusively in Indian Rupees (INR) via UPI, NEFT, RTGS, and IMPS."
  },
  {
    question: "Who leads the IDsvault broker desk?",
    answer: "IDsvault is led by Jogdhande Nikhil Patil, Lead Identity Broker. He personally manages seller ownership audits, buyer fund escrow protection, and live transfer supervision for every transaction."
  }
];

export const BrokerLanding: React.FC = () => {
  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Digital Identity Broker", url: "/digital-identity-broker" }
    ]),
    buildFAQSchema(BROKER_FAQS),
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "description": "India's dedicated digital identity advisory and transfer desk in Hyderabad, Telangana.",
      "url": SITE_CONFIG.canonicalOrigin,
      "email": SITE_CONFIG.broker.email,
      "telephone": SITE_CONFIG.broker.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500081",
        "addressCountry": "IN"
      },
      "founder": {
        "@type": "Person",
        "name": SITE_CONFIG.broker.name,
        "jobTitle": SITE_CONFIG.broker.title
      }
    }
  ];

  return (
    <div className="min-h-screen bg-canvas text-white font-sans">
      <SEO
        title="Digital Identity Broker India — Hyderabad Desk | IDsvault"
        description="IDsvault is India's dedicated digital identity brokerage desk based in Hyderabad, Telangana. Lead Broker Jogdhande Nikhil Patil facilitates safe Instagram, X, and Telegram handle transfers."
        canonical="/digital-identity-broker"
        pageType="website"
        structuredData={pageSchema}
      />

      <section className="relative pt-12 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
            <Building2 className="w-3.5 h-3.5" />
            <span>Broker Desk · Hyderabad, Telangana, India</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            India’s Dedicated <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Digital Identity Broker Desk</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-8">
            IDsvault is a Hyderabad-based advisory desk that facilitates the private acquisition and divestiture of premium social media handles and brandable domain names across India.
          </p>

          {/* Broker Entity Card */}
          <div className="p-8 rounded-2xl bg-surface border border-emerald-500/30 max-w-3xl shadow-2xl mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs text-ghost font-mono uppercase tracking-wider mb-1">Lead Identity Broker</div>
                <h2 className="text-2xl font-bold text-white">{SITE_CONFIG.broker.name}</h2>
                <div className="text-sm text-emerald-400 font-mono mt-0.5">{SITE_CONFIG.broker.title}</div>
              </div>
              <a
                href="https://wa.me/919392974031?text=Hi%20Nikhil%2C%20I%20would%20like%20to%20consult%20on%20a%20digital%20identity%20transaction."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Broker</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.broker.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.broker.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Block */}
      <section className="py-12 bg-surface/50 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-6 md:p-8 rounded-2xl bg-surface border border-emerald-500/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>What IDsvault Does</span>
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              <strong>Direct Answer:</strong> IDsvault is a broker-supervised facilitation desk — not an automated open marketplace or exchange. The broker personally verifies seller ownership (including Original Registration Email access), secures buyer funds in a designated broker account, supervises the live credential transfer, and disburses payment to the seller upon verified buyer access.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Broker Desk FAQs</h2>
          <div className="space-y-6">
            {BROKER_FAQS.map((faq, i) => (
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
