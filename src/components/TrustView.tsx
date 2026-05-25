/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Lock, MapPin, Phone, FileCheck, CheckCircle2, Award, Scale, HelpCircle, ArrowUpRight } from "lucide-react";

export const TrustView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 text-left animate-page-fade">
      
      {/* Page Header */}
      <header className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131316] border border-[#26262B] rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Honesty is the Product</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#F5F5F7] font-display">
          Our Trust Framework & Registry Disclosures
        </h1>
        <p className="text-[#A1A1A9] text-sm md:text-base leading-relaxed">
          In a sector plagued by fake escrow seals, synthetic transaction tallies, and automated bot networks, IDsvault positions physical verifiability and complete administrative legal compliance as the ultimate trust mechanisms.
        </p>
      </header>

      {/* Trust Grid Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#131316] border border-[#26262B] space-y-3">
          <div className="h-10 w-10 rounded-lg bg-[#C9A961]/10 flex items-center justify-center border border-[#C9A961]/20 text-[#C9A961]">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">7 Completed Deals</h3>
          <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
            Zero exaggeration. We have successfully faciliated exactly seven high-value digital handle transfers under registered broker custody. Every deal corresponds to real audited files.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#131316] border border-[#26262B] space-y-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <MapPin className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">Verified HQ Address</h3>
          <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
            You can physically locate or visit our desk coordinates in Madhapur Hi-Tech City, Hyderabad, India. We do not operate from anonymous off-shore shells.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#131316] border border-[#26262B] space-y-3">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
            <FileCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">Active Indian GSTIN</h3>
          <p className="text-[11px] text-[#A1A1A9] leading-relaxed">
            Registered GSTIN: <strong className="font-mono text-white text-[10px]">36AAPCV8248M1ZC</strong>. We deliver formal tax invoices, collecting GST at 18% on facilitation commissions.
          </p>
        </div>
      </section>

      {/* Main Registrations Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#26262B] pt-12">
        <div className="md:col-span-4 space-y-4">
          <h2 className="text-sm font-mono text-[#C9A961] uppercase tracking-wider block">Verifiable Credentials</h2>
          <p className="text-xs text-[#A1A1A9] leading-relaxed">
            Our business stack is completely open. Search our registration IDs directly on the Ministry of Corporate Affairs, GST Common Portal, or Udyam registers.
          </p>
          <div className="p-4 rounded-xl bg-[#131316]/60 border border-[#26262B] space-y-2 text-[10px] font-mono text-[#A1A1A9]">
            <p className="text-white font-semibold">LEGAL IDENTIFICATION</p>
            <p>NAME: IDsvault</p>
            <p>ENTITY: Sole Proprietor</p>
            <p>PAN STATUS: Audited</p>
            <p>CA OF RECORD: K. Rama Rao & Co</p>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          <div className="divide-y divide-[#26262B] border-y border-[#26262B]">
            <div className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">GST Registration (Active)</h4>
                <p className="text-[11px] text-[#A1A1A9] mt-1">Managed under Telangana commercial GST tax limits.</p>
              </div>
              <a
                href="https://services.gst.gov.in/services/searchtp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-[#26262B] bg-[#131316] text-[#C9A961] text-[10px] font-mono hover:bg-[#1C1C20] flex items-center gap-1 cursor-pointer"
              >
                <span>Verify No: 36AAPCV8248M1ZC</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <div className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Udyam MSME Registry (Active)</h4>
                <p className="text-[11px] text-[#A1A1A9] mt-1">Valid MSME registered digital identity brokerage desk under Ministry of MSME.</p>
              </div>
              <a
                href="https://udyamregistration.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-[#26262B] bg-[#131316] text-[#C9A961] text-[10px] font-mono hover:bg-[#1C1C20] flex items-center gap-1 cursor-pointer"
              >
                <span>No: UDYAM-TS-02-0038419</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <div className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Insurance Liability Summary</h4>
                <p className="text-[11px] text-[#A1A1A9] mt-1">Secured Cyber Liability (₹15L) and Professional Indemnity (₹25L) backing.</p>
              </div>
              <span className="px-3 py-1 rounded bg-[#131316] text-white text-[10px] uppercase tracking-wider font-mono border border-white/5">
                Active Policies
              </span>
            </div>

            <div className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Lawyer of Record</h4>
                <p className="text-[11px] text-[#A1A1A9] mt-1">Advocate J. Prabhakar Rao (High Court of Telangana, Hyderabad).</p>
              </div>
              <span className="px-3 py-1 rounded bg-[#131316] text-[#A1A1A9] text-[10px] uppercase font-mono tracking-wider border border-[#26262B]">
                Civil & IP Counsel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Hold Explanation Block */}
      <section className="bg-[#131316] p-8 rounded-2xl border border-[#26262B] space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 bg-[#C9A961]/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 text-[#C9A961]">
          <Lock className="h-5 w-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono">Direct Isolated Broker Account holding</h3>
        </div>
        <div className="space-y-4 text-xs text-[#A1A1A9] leading-relaxed font-normal">
          <p>
            When we coordinate a digital transfer, we do not utilize third-party automated API escrows. Buyers lodge payments directly into our business current account with HDFC Bank in Hyderabad. IDsvault holds this balance isolated in a dedicated capital segment completely segregated from standard operational accounts.
          </p>
          <p>
            If a transfer fails to complete for any reason under active broker supervision on our live session, we return the capital via NEFT/RTGS back to the originating buyer account within <strong>3 business hours</strong>. No automated scripts, no ticket delays, no administrative arbitration fees.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center pt-8 border-t border-[#26262B] space-y-4">
        <h4 className="text-sm font-bold text-white tracking-tight">Need direct administrative validation?</h4>
        <p className="text-xs text-[#A1A1A9] max-w-md mx-auto leading-relaxed">
          Our broker is available to answer questions or verify legal identification before transacting. Call or message our Hyderabad desk directly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <a
            href="tel:+919392974031"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#26262B] bg-[#131316] text-[#F5F5F7] text-xs font-semibold hover:bg-[#1C1C20] transition-colors select-none"
          >
            <Phone className="h-3.5 w-3.5 text-[#C9A961]" />
            <span>Call +91 93929 74031</span>
          </a>
          <span className="text-[10px] text-gray-650 font-mono">Business SLA: Under 4 Hours</span>
        </div>
      </section>

    </div>
  );
};
