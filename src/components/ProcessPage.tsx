/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  FileText,
  BadgeCheck,
  Lock,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  AlertTriangle,
  IndianRupee,
  MessageCircle,
} from "lucide-react";

// ─── Step data ───────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Inquiry",
    subtitle: "Tell us what you're looking for",
    body: "Contact us via WhatsApp, Telegram, or the inquiry form. No commitment required at this stage. Share the handle or asset you want — or describe what you're looking for and we'll check availability.",
    detail: "We respond within 4 business hours (IST). After hours: within 24 hours.",
    forBuyers: true,
    forSellers: false,
    sellerNote: "Sellers: submit your asset for review via the Sell page. We verify ownership before any listing goes live.",
  },
  {
    num: "02",
    icon: BadgeCheck,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Ownership Verification",
    subtitle: "We verify the seller owns what they're selling",
    body: "Before any deal proceeds, the broker verifies seller identity and ownership of the asset. No unverified assets are listed or transacted. This step protects buyers from fraudulent listings.",
    detail: "Verification is done by the broker personally — not automated. May take up to 24 hours for complex assets.",
    forBuyers: true,
    forSellers: true,
  },
  {
    num: "03",
    icon: FileText,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "Engagement & KYC",
    subtitle: "Paperwork before payment",
    body: "Both parties sign an engagement letter outlining the asset, agreed price (in ₹ INR), broker fee, and transfer terms. KYC is completed at this stage based on transaction value.",
    detail: null,
    kycTable: [
      { range: "Under ₹85,000", req: "No KYC required" },
      { range: "₹85,000 – ₹8,50,000", req: "Aadhaar or PAN copy" },
      { range: "Above ₹8,50,000", req: "ID + source-of-funds declaration" },
      { range: "Above ₹2,00,000", req: "PAN mandatory (IT Act S.269ST)" },
    ],
    forBuyers: true,
    forSellers: true,
  },
  {
    num: "04",
    icon: Lock,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Payment to Broker",
    subtitle: "You pay IDsvault — never the seller directly",
    body: "Buyer transfers the full agreed amount to IDsvault's registered business current account via UPI, NEFT, RTGS, or IMPS. Payment is held in a designated account, separate from operating funds, until transfer is confirmed.",
    detail: "A GST-compliant tax invoice is issued immediately upon receipt. No payment is ever released to the seller until the buyer confirms ownership.",
    forBuyers: true,
    forSellers: false,
    paymentMethods: ["UPI (PhonePe, GPay, Paytm)", "NEFT / RTGS / IMPS", "Bank transfer to business current account"],
    note: "We do not accept cash above ₹2,00,000 (Income Tax Act Section 269ST). No crypto. No third-party platforms.",
    forBuyers2: false,
    forSellers2: false,
  },
  {
    num: "05",
    icon: PhoneCall,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
    title: "Live Transfer Call",
    subtitle: "Buyer, seller, and broker — simultaneously",
    body: "A live video or audio call is arranged with all three parties present. The seller transfers the asset live on the call. The buyer changes all credentials immediately. Neither party ends the call until transfer is fully confirmed.",
    detail: "This single step eliminates 99% of transfer fraud. There is no 'trust the seller and wait' moment.",
    forBuyers: true,
    forSellers: true,
  },
  {
    num: "06",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    title: "Confirmation & Release",
    subtitle: "You confirm. We release.",
    body: "Once the buyer confirms full access and credential control on the call, IDsvault releases the held payment to the seller. Only after buyer confirmation — never before.",
    detail: "If the transfer fails at any point: full refund within 3 business hours. No questions asked.",
    forBuyers: true,
    forSellers: true,
  },
];

// ─── Guarantee strip ─────────────────────────────────────────────────────────

const guarantees = [
  { icon: ShieldCheck, text: "Refund in 3 hrs if transfer fails" },
  { icon: Lock,        text: "Funds never released until you confirm" },
  { icon: Clock,       text: "4-hour response during business hours" },
  { icon: BadgeCheck,  text: "Every seller verified before listing" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export const ProcessPage: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How IDsvault facilitates a digital identity transfer",
    "description": "Step-by-step process for broker-supervised digital asset transfers in India",
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.body,
    })),
    "supplier": {
      "@type": "Organization",
      "name": "IDsvault",
      "url": "https://idsvault.com",
      "areaServed": "IN",
    },
  };

  return (
    <>
      <Helmet>
        <title>How It Works — IDsvault | Broker-Supervised Transfer Process</title>
        <meta
          name="description"
          content="IDsvault's 6-step verified transfer process: inquiry, ownership verification, KYC, payment to broker, live transfer call, and confirmed release. India only."
        />
        <link rel="canonical" href="https://idsvault.com/process" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-canvas text-white">

        {/* ── Hero ── */}
        <section className="border-b border-white/[0.06] py-20 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-block px-2.5 py-1 rounded bg-accent/10 text-accent text-[10px] font-extrabold uppercase tracking-widest font-mono">
              How It Works
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Six steps. Zero ambiguity.
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Every IDsvault transaction follows the same process — verified, documented, and supervised by a named broker from first contact to final confirmation.
            </p>
          </div>
        </section>

        {/* ── Guarantee strip ── */}
        <section className="border-b border-white/[0.06] bg-canvas py-6 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {guarantees.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-gray-300">
                <Icon className="h-4 w-4 text-accent shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Steps ── */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl bg-surface border border-white/[0.06] p-7 space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${step.bg}`}>
                      <Icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-mono text-[10px] font-bold text-white/20 tracking-widest">{step.num}</span>
                        <h2 className="font-bold text-white text-base">{step.title}</h2>
                      </div>
                      <p className="text-sm text-accent font-medium">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-sm text-gray-400 leading-relaxed pl-[52px]">{step.body}</p>

                  {/* KYC table */}
                  {step.kycTable && (
                    <div className="pl-[52px]">
                      <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-surface border-b border-white/[0.06]">
                              <th className="text-left px-4 py-2.5 text-gray-400 font-semibold">Transaction value</th>
                              <th className="text-left px-4 py-2.5 text-gray-400 font-semibold">KYC requirement</th>
                            </tr>
                          </thead>
                          <tbody>
                            {step.kycTable.map((row) => (
                              <tr key={row.range} className="border-b border-white/[0.04] last:border-0">
                                <td className="px-4 py-2.5 font-mono text-white/70">{row.range}</td>
                                <td className="px-4 py-2.5 text-gray-300">{row.req}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Payment methods */}
                  {step.paymentMethods && (
                    <div className="pl-[52px] space-y-2">
                      <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Accepted payment methods</p>
                      <ul className="space-y-1">
                        {step.paymentMethods.map((m) => (
                          <li key={m} className="flex items-center gap-2 text-sm text-gray-300">
                            <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Note / detail */}
                  {step.note && (
                    <div className="pl-[52px]">
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-200/70">{step.note}</p>
                      </div>
                    </div>
                  )}
                  {step.detail && (
                    <p className="pl-[52px] text-xs text-gray-500 leading-relaxed">{step.detail}</p>
                  )}
                  {step.sellerNote && (
                    <p className="pl-[52px] text-xs text-gray-500 leading-relaxed">{step.sellerNote}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Timelines ── */}
        <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-extrabold text-white">Typical timelines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Simple deal (no KYC required)", time: "Same day – 24 hours", eg: "Telegram username under ₹85,000" },
                { label: "Standard deal with KYC", time: "24 – 48 hours", eg: "Telegram username or domain, ₹85K–₹8.5L" },
                { label: "Complex or high-value deal", time: "48 – 72 hours", eg: "Premium Instagram or X handle above ₹8.5L" },
              ].map(({ label, time, eg }) => (
                <div key={label} className="p-5 rounded-2xl bg-surface border border-white/[0.06] space-y-2">
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{label}</p>
                  <p className="text-xl font-extrabold text-white font-mono">{time}</p>
                  <p className="text-xs text-gray-500">{eg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commission ── */}
        <section className="border-t border-white/[0.06] py-16 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Fees</h2>
              <p className="text-sm text-gray-400">All fees are disclosed before any payment is made. GST-compliant invoice issued on every transaction.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-white/[0.06]">
                    <th className="text-left px-5 py-3.5 text-gray-400 font-semibold">Deal value (INR)</th>
                    <th className="text-left px-5 py-3.5 text-gray-400 font-semibold">Commission</th>
                    <th className="text-right px-5 py-3.5 text-gray-400 font-semibold">GST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {[
                    { range: "Under ₹5,00,000", rate: "15%", gst: "18% on fee" },
                    { range: "₹5,00,000 – ₹20,00,000", rate: "12%", gst: "18% on fee" },
                    { range: "Above ₹20,00,000", rate: "10%", gst: "18% on fee" },
                    { range: "Above ₹85,00,000", rate: "Negotiable", gst: "18% on fee" },
                  ].map(({ range, rate, gst }) => (
                    <tr key={range} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 font-mono text-white/80">{range}</td>
                      <td className="px-5 py-3.5 font-bold text-accent">{rate}</td>
                      <td className="px-5 py-3.5 text-right text-gray-400">{gst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-white/[0.06] bg-canvas py-16 px-6">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-extrabold text-white">Ready to start?</h2>
            <p className="text-sm text-gray-400">Browse what's available, or contact the broker directly on WhatsApp.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/inventory"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-accent text-canvas font-bold text-sm hover:bg-accent-light transition-colors"
              >
                Browse Inventory <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/919392974031?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20transfer%20process"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-surface border border-white/[0.08] text-white font-semibold text-sm hover:border-white/[0.16] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                WhatsApp Broker
              </a>
            </div>
            <p className="text-xs text-gray-600">
              IDsvault is a facilitation desk, not a marketplace. We do not own digital assets. All transactions governed by Indian law, Hyderabad jurisdiction.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};
