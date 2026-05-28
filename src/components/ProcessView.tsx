/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Clock, Lock, FileCheck, Check, Users, Video, FileText, ArrowUpRight, HelpCircle } from "lucide-react";

export const ProcessView: React.FC = () => {
  const steps = [
    {
      no: "01",
      title: "Direct Inquiry & Review",
      desc: "An inquiry is filed or submitted. Our managing broker Jogdhande Nikhil Patil reviews the handle's market history and reaches out within 4 hours, establishing direct direct phone communication."
    },
    {
      no: "02",
      title: "Tiered Identity Verification (KYC)",
      desc: "Both parties are routed through identity verification based on the transaction value. Standard threshold records are gathered, verified, and safely archived in secure, isolated offline structures."
    },
    {
      no: "03",
      title: "Engagement Contract Execution",
      desc: "We draft and sign a formal advisory contract governing the scope of active work, broker commissions, transfer parameters, timelines, and Hyderabad court jurisdiction."
    },
    {
      no: "04",
      title: "Cryptographic Asset Audit",
      desc: "Our broker oversees a real-time ownership check. Sellers are mandated to update profile Bios with temporary coordinate hashes or conduct active account screenshot reviews."
    },
    {
      no: "05",
      title: "Introduction Consultation",
      desc: "A private call is coordinated where the buyer and seller align on intended use boundaries, original login parameters, and platforms guidelines."
    },
    {
      no: "06",
      title: "Buyer Payment Lodgment",
      desc: "The buyer deposits the funds into IDsvault's domestic business current account at HDFC Bank. A GST-compliant tax invoice is generated and delivered to the buyer."
    },
    {
      no: "07",
      title: "Sim supervised transition session",
      desc: "A live handover session is coordinated. The broker is present to supervise the seller disconnecting recovery credentials and the buyer updating passwords, recovery vectors, and 2FA."
    },
    {
      no: "08",
      title: "Seller Capital Release",
      desc: "Upon validated, manual buyer coordinate confirmation of handle control on the live call, we release the transaction payment net of brokerage fees directly to the seller."
    },
    {
      no: "09",
      title: "Tax Ledger Execution",
      desc: "A final tax invoice and compliance closing files are prepared. The 18% GST collection is booked sequentially under our corporate SACConsulting code."
    },
    {
      no: "10",
      title: "7-Day Post-Transfer Window",
      desc: "We maintain active monitoring for 7 days post-transfer to coordinate any platform inquiries, ensuring the buyer has a seamless setup experience."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 text-left animate-page-fade">
      
      {/* Header Panel */}
      <header className="space-y-4 max-w-2xl border-b border-[#26262B] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131316] border border-[#26262B] rounded-full">
          <span className="h-2 w-2 rounded-full bg-[#C9A961] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A9]">The Supervision Protocol</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#F5F5F7] font-display">
          How It Works: Our 10-Step Escrow Workflow
        </h1>
        <p className="text-[#A1A1A9] text-sm md:text-base leading-relaxed">
          Unlike instant automated platforms that expose users to immediate recovery vulnerability or chargebacks, IDsvault governs transfers through a rigorous, human-supervised legal and technical checklist.
        </p>
      </header>

      {/* Interactive Timeline Loop */}
      <section className="relative border-l border-[#26262B] ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
        {steps.map((step) => (
          <div key={step.no} className="relative group" id={`timeline_step_${step.no}`}>
            {/* Timeline bullet handle */}
            <div className="absolute -left-[35px] md:-left-[43px] top-1 h-[18px] w-[18px] md:h-6 md:w-6 rounded-full bg-[#0A0A0B] border-2 border-[#C9A961] flex items-center justify-center text-[8px] md:text-[10px] font-bold text-[#C9A961] font-mono z-10 font-mono shadow-[0_0_10px_rgba(201,169,97,0.1)]">
              {step.no}
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#131316] border border-[#26262B] hover:border-[#3A3A42] transition-colors duration-200 space-y-2">
              <span className="text-[9px] font-mono text-[#6E6E78] uppercase tracking-widest font-extrabold block">STAGE {step.no} of 10</span>
              <h3 className="text-base font-bold text-white tracking-tight">{step.title}</h3>
              <p className="text-xs text-[#A1A1A9] leading-relaxed font-normal">{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Safety Notice Block */}
      <section className="p-8 rounded-2xl bg-[#131316] border border-red-500/10 text-xs text-[#A1A1A9] leading-relaxed relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-red-500/[0.01] pointer-events-none rounded-full blur-3xl" />
        <h4 className="text-sm font-bold text-white block mb-3 uppercase tracking-wider font-mono text-red-450">Critical Risk Warning</h4>
        <p className="mb-3">
          Instagram, X (Twitter), and TikTok technically declare username exchanges to violate standard terms. Platforms maintain the immediate right to suspend or lock namespaces where clear transactional patterns are caught by automated systems. 
        </p>
        <p>
          IDsvault’s 10-step manual transfer checklist is designed specifically to mirror natural user pattern updates, verify fallbacks are erased completely, update 2FA, and mitigate risk indicators. Working with a dedicated Hyderabad broker minimizes platform flag risks.
        </p>
      </section>

    </div>
  );
};
