/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "./SEO";
import {
  Shield,
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  AlertTriangle,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink,
  IndianRupee,
  CheckCircle2,
  Users,
} from "lucide-react";

// ─── Trust pillars ────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Users,
    title: "One named broker. Every deal.",
    body: "IDsvault is operated by Jogdhande Nikhil Patil from Hyderabad. Not a team, not an algorithm. One person who is directly accountable on every transaction. You can reach the broker by name, at broker@idsvault.com, before you pay a single rupee.",
  },
  {
    icon: Lock,
    title: "Your money stays with us until transfer is done",
    body: "Buyer payment goes to IDsvault's designated broker account — never to the seller. We hold it there, separately from operating funds, until you confirm full access on the live call. The seller gets nothing until you have everything.",
  },
  {
    icon: BadgeCheck,
    title: "Every seller verified before listing",
    body: "Before any asset goes live on our inventory, the broker personally verifies that the seller owns what they claim to sell. No automated checks. No listings from unverified sources. This is non-negotiable.",
  },
  {
    icon: Shield,
    title: "Real identity. Full accountability.",
    body: "IDsvault is operated personally by Jogdhande Nikhil Patil from Hyderabad, Telangana. Every deal is in his name — not behind a corporate entity. His contact details are public, his desk address is real, and a broker invoice is issued for every transaction. There is no anonymity here.",
  },
  {
    icon: FileText,
    title: "Written engagement before any payment",
    body: "Every deal is documented. You sign an engagement letter before making any payment. It specifies the asset, agreed price in ₹ INR, broker fee, KYC requirements, and transfer terms. No verbal agreements, no surprises.",
  },
  {
    icon: CheckCircle2,
    title: "Live call. Both parties present.",
    body: "The transfer happens on a live audio or video call — seller, buyer, and broker simultaneously. The seller transfers access live. You change all credentials live. Neither party disconnects until ownership is fully confirmed.",
  },
];

// ─── What we won't do ─────────────────────────────────────────────────────────

const wontDo = [
  "List assets from unverified sellers",
  "Accept payment to a personal account",
  "Release funds to the seller before the buyer confirms",
  "Facilitate transfers of stolen, hacked, or impersonated handles",
  "Accept crypto, foreign wire transfers, or cash above ₹2,00,000",
  "Publish fake transaction counts, testimonials, or reviews",
  "List Instagram or X handles publicly (ToS-prohibited — advisory only with signed risk disclosure)",
  "Serve clients outside India",
];

// ─── Verification points ──────────────────────────────────────────────────────

const verifications = [
  {
    label: "Broker",
    value: "Jogdhande Nikhil Patil",
    note: "Sole operator — directly reachable before, during, and after every deal",
  },
  {
    label: "Desk address",
    value: "Hyderabad, Telangana — 500 081",
    note: "Verifiable on Google Maps",
  },
  {
    label: "Grievance Officer",
    value: "Jogdhande Nikhil Patil",
    note: "broker@idsvault.com · +91 93929 74031 · Response within 24 hours",
  },
  {
    label: "Governing law",
    value: "Indian law, Hyderabad jurisdiction",
    note: "Arbitration under Arbitration & Conciliation Act 1996",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export const TrustPage: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IDsvault",
    "url": "https://idsvault.com",
    "areaServed": "IN",
    "description": "India-based digital identity advisory and transfer facilitation desk. Solo-operated by Jogdhande Nikhil Patil, Hyderabad.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-93929-74031",
      "contactType": "customer service",
      "availableLanguage": ["en", "te", "hi"],
      "areaServed": "IN",
    },
    "founder": {
      "@type": "Person",
      "name": "Jogdhande Nikhil Patil",
      "jobTitle": "Lead Identity Broker",
    },
  };

  return (
    <>
      <SEO
        title="Trust Framework — IDsvault | How We Protect Every Transaction"
        description="How IDsvault protects buyers and sellers: named broker accountability, broker-held payment, live transfer call, verified listings, full refund commitment."
        canonical="/trust"
        structuredData={jsonLd}
      />

      <div className="min-h-screen bg-canvas text-white">

        {/* ── Hero ── */}
        <section className="border-b border-white/[0.06] py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            <span className="inline-block px-2.5 py-1 rounded bg-accent/10 text-accent text-[10px] font-extrabold uppercase tracking-widest font-mono">
              Trust Framework
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Why buyers and sellers trust IDsvault.
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              In a market full of anonymous brokers and Telegram-group deal-makers, we do something different: we show everything. Real name, real address, real process, real paperwork.
            </p>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">The founder IS the trust mechanism.</strong> There is no brand behind a curtain. Jogdhande Nikhil Patil is directly reachable at broker@idsvault.com before, during, and after every deal. His name is on the engagement letter. His account holds your payment.
            </div>
          </div>
        </section>

        {/* ── Six pillars ── */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold text-white mb-10">Six trust commitments we make on every deal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pillars.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-surface border border-white/[0.06] space-y-3 hover:border-white/[0.1] transition-colors"
                >
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 w-fit">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we won't do ── */}
        <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">What we will never do</h2>
              <p className="text-sm text-gray-400">Commitments that are non-negotiable regardless of deal size or client pressure.</p>
            </div>
            <ul className="space-y-3">
              {wontDo.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-red-400 text-[10px] font-black">✕</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Verification ── */}
        <section className="border-t border-white/[0.06] py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Verify us yourself</h2>
              <p className="text-sm text-gray-400">Everything below is a matter of public record or directly contactable. We hide nothing.</p>
            </div>
            <div className="space-y-3">
              {verifications.map(({ label, value, note }) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 p-4 rounded-xl bg-surface border border-white/[0.06]"
                >
                  <div className="sm:w-44 shrink-0">
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-white">{value}</p>
                    <p className="text-xs text-gray-500">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Founder contact ── */}
        <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-extrabold text-white">Reach the broker directly</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://wa.me/919392974031?text=Hi%2C%20I%20want%20to%20verify%20IDsvault%20before%20proceeding"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">+91 93929 74031</p>
                </div>
              </a>
              <a
                href="tel:+919392974031"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
              >
                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">+91 93929 74031</p>
                </div>
              </a>
              <a
                href="mailto:broker@idsvault.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
              >
                <Mail className="h-5 w-5 text-purple-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors">broker@idsvault.com</p>
                </div>
              </a>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-white/[0.06]">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Desk address</p>
                <p className="text-sm text-white">Hyderabad, Telangana — 500 081, India</p>
                <a
                  href="https://maps.google.com/?q=Hyderabad,Telangana,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-accent transition-colors mt-1"
                >
                  View on Google Maps <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Risk disclosure reminder ── */}
        <section className="border-t border-white/[0.06] py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">Platform risk — read before proceeding</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Telegram username transfers are officially supported by the platform. Brandable domain transfers carry standard secondary-market risk only. Instagram and X handle transfers are prohibited by those platforms' Terms of Service — we do not list these publicly and only engage on a private advisory basis with written risk acknowledgment.
                </p>
                <Link
                  to="/policy/risk-disclosure"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-semibold"
                >
                  Read full risk disclosure <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-white/[0.06] bg-canvas py-14 px-6">
          <div className="max-w-xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-extrabold text-white">See the process in full</h2>
            <p className="text-sm text-gray-400">Six steps, zero ambiguity. Understand exactly what happens from inquiry to confirmed transfer.</p>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-canvas font-bold text-sm hover:bg-accent-light transition-colors"
            >
              How It Works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};
