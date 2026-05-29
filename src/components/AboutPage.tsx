/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Users,
  Lock,
  FileText,
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";

export const AboutPage: React.FC = () => {
  usePageTitle("About IDsvault — Hyderabad Broker Desk");

  return (
    <div className="relative overflow-hidden bg-canvas text-white">
      <SEO
        title="About IDsvault — Hyderabad Broker Desk"
        description="IDsvault is India's broker-supervised desk for buying and selling premium Instagram usernames, X handles, Telegram usernames, and brandable domains. Based in Hyderabad, Telangana. Broker: Jogdhande Nikhil Patil."
        canonical="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About IDsvault",
          "description": "IDsvault is a solo-operated digital identity facilitation desk based in Hyderabad, Telangana, India.",
          "url": "https://idsvault.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "IDsvault",
            "description": "India-based broker-advised digital identity facilitation desk. One named broker per deal.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "postalCode": "500 081",
              "addressCountry": "IN"
            },
            "email": "broker@idsvault.com",
            "telephone": "+919392974031"
          }
        }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative max-w-4xl mx-auto px-6 pt-12 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-surface text-faint font-mono text-[10px] font-medium uppercase tracking-wider mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Hyderabad, Telangana, India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] mb-4"
        >
          About IDsvault
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted text-base leading-relaxed max-w-2xl"
        >
          One broker. Every deal. Personally handled.
        </motion.p>
      </section>

      {/* ── THE DESK ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0 mt-1">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">The desk</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                A real person. Every time.
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                IDsvault is operated by a single named broker based in Hyderabad, Telangana. Every inquiry, every verification, every transfer is handled personally — not routed to a support queue or a chatbot. When you message us, you speak to the broker directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY A BROKER ─────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-surface py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 shrink-0 mt-1">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest font-mono">Why a broker</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                The problem with direct deals
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                The handle trading space has a fraud problem. Buyers send payment and sellers recover the account. Sellers transfer first and buyers reverse the payment. A broker solves both problems by holding payment until transfer is confirmed on a live supervised call. That's the entire model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ───────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest font-mono">How we operate</span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-2 mb-6">Every deal, same process</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
                text: "Every seller's ownership is verified by the broker before listing"
              },
              {
                icon: <Lock className="h-4 w-4 text-blue-400" />,
                text: "Payment goes to IDsvault's registered business account — not to the seller"
              },
              {
                icon: <Phone className="h-4 w-4 text-accent" />,
                text: "Transfer happens on a live call with buyer, seller, and broker together"
              },
              {
                icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
                text: "Buyer changes all credentials before broker releases payment"
              },
              {
                icon: <Shield className="h-4 w-4 text-blue-400" />,
                text: "Full refund in 3 hours if transfer fails at any step"
              },
              {
                icon: <FileText className="h-4 w-4 text-accent" />,
                text: "GST-compliant tax invoice issued for every transaction"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-white/[0.06]">
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-surface py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-1">
              <MapPin className="h-5 w-5 text-amber-400" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest font-mono">Location</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Hyderabad desk</h2>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                Our broker desk is based in Hyderabad, Telangana. Inquiries handled via WhatsApp, phone call, and Telegram. Business hours: Monday–Saturday, 10AM–7PM IST. Response within 4 hours during business hours.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <Clock className="h-3.5 w-3.5 text-gray-600" />
                <span>After-hours inquiries acknowledged within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEGAL STANDING ───────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shrink-0 mt-1">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest font-mono">Legal standing</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Registered business, Indian law</h2>
              <p className="text-sm text-muted leading-relaxed max-w-2xl">
                IDsvault is a registered business in Hyderabad operating under Indian law. Governed by the IT Act 2000, Consumer Protection Act 2019, and DPDPA 2023. GST registration applied. All transactions invoiced.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  "IT Act 2000",
                  "Consumer Protection Act 2019",
                  "DPDPA 2023",
                  "PMLA / AML-KYC",
                  "GST-compliant invoicing"
                ].map((item) => (
                  <span key={item} className="text-[10px] font-mono font-semibold text-gray-400 bg-surface border border-white/[0.06] px-2.5 py-1 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] bg-surface py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest font-mono">Contact</span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Reach the broker desk</h2>
            <p className="text-sm text-gray-400">WhatsApp is the fastest channel. All inquiries answered personally.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href="https://wa.me/919392974031?text=Hi+IDsvault%2C+I+have+an+inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border border-white/[0.06] hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition-all text-center group"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <MessageCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">WhatsApp</p>
                <p className="text-[10px] text-gray-500 mt-0.5">+91 93929 74031</p>
              </div>
            </a>

            <a
              href="mailto:broker@idsvault.com"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border border-white/[0.06] hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all text-center group"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Email</p>
                <p className="text-[10px] text-gray-500 mt-0.5">broker@idsvault.com</p>
              </div>
            </a>

            <a
              href="tel:+919392974031"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border border-white/[0.06] hover:border-accent/30 hover:bg-accent/[0.03] transition-all text-center group"
            >
              <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-accent transition-colors">Phone</p>
                <p className="text-[10px] text-gray-500 mt-0.5">+91 93929 74031</p>
              </div>
            </a>
          </div>

          <div className="flex justify-center pt-4">
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-lg border border-[#26262B] hover:border-[#3A3A42] text-xs font-medium text-muted hover:text-white transition-all uppercase tracking-wider"
            >
              Browse handles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
