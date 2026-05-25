/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Lock, EyeOff, FileText, CheckCircle, ArrowRight, Phone, MessageSquare } from "lucide-react";

export const AdvisoryView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    targetHandles: "",
    approxBudget: "₹1L - ₹5L",
    acknowledgedRisk: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.acknowledgedRisk) {
      alert("Please fill working details and acknowledge the platform legal risk checkbox first.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16 text-left animate-page-fade">
      
      {/* Editorial Header */}
      <header className="space-y-4 max-w-2xl border-b border-[#26262B] pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#131316] border border-[#26262B] rounded-full">
          <span className="h-2 w-2 rounded-full bg-[#C9A961] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1A9]">Strictly Confidential</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#F5F5F7] font-display">
          Private Asset Sourcing & Advisory Desk
        </h1>
        <p className="text-[#A1A1A9] text-sm md:text-base leading-relaxed">
          Instagram, X (Twitter), and TikTok handles are never publicly listed on our platform. High-value social brand names must be navigated through exclusive, high-security client brokerages with absolute discretion.
        </p>
      </header>

      {/* Narrative Points */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-6 md:p-8 rounded-2xl bg-[#131316] border border-[#26262B] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-[#C9A961] p-3 bg-[#1C1C20] rounded-xl w-max border border-white/5">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Anonymity & Security First</h3>
            <p className="text-xs text-[#A1A1A9] leading-relaxed font-normal">
              We handle direct outreach and negotiation with target handle holders anonymously. We protect buyer identity until absolute lock keys are secured under Indian legal jurisdiction. We do not trigger handle valuation hikes by broadcasting buyers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#0A0A0B]/60 border border-[#26262B] text-[10.5px] font-mono text-[#A1A1A9] leading-relaxed">
            <p className="text-white font-bold mb-1">MINIMUM ADVISORY PARAMETERS:</p>
            <p>• MIN BUDGET: ₹1,00,000</p>
            <p>• RETAINER: ₹50,000 upfront lock-in charge</p>
            <p>• SUCCESS COMMISSION: 12% to 15%</p>
          </div>
        </div>

        <div className="p-6 md:p-8 rounded-2xl bg-[#131316] border border-[#26262B] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-emerald-450 p-3 bg-[#1C1C20] rounded-xl w-max border border-white/5">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Structured Risk Management</h3>
            <p className="text-xs text-[#A1A1A9] leading-relaxed font-normal">
              Acquiring off-market properties involves strict host tracking risk. Our private desk conducts trademark clearance reports, age/verification history logs, original registry reviews, and live hand-overs, minimizing post-swap reclamation triggers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/[0.02] border border-amber-500/10 text-[10.5px] leading-relaxed text-[#A1A1A9]">
            <p className="text-amber-500 font-bold mb-1">RISK DISCLOSURE ENFORCEMENT:</p>
            <p>Sourcing actions are initiated strictly after the client formally executes our physical Risk Disclosure Agreement.</p>
          </div>
        </div>
      </section>

      {/* Sourcing Inquiry Form */}
      <section className="p-8 rounded-2xl bg-[#131316] border border-[#26262B] max-w-2xl mx-auto space-y-8 relative">
        <h3 className="text-lg font-bold text-white tracking-tight text-center font-display">
          Initiate Private Consultation Sourcing Brief
        </h3>

        {isSubmitted ? (
          <div className="p-8 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10 text-center space-y-4 animate-scale-up">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white tracking-tight">Sourcing Brief Received Coordinates</h4>
              <p className="text-xs text-[#A1A1A9] leading-relaxed font-normal">
                Thank you. Vinay Naidu will review your brand handle specifications and initiate secure communication under NDA within 4 hours.
              </p>
            </div>
            <p className="text-[10px] font-mono text-[#6E6E78]">Reference Reference: SECURE-DESK-{Math.floor(Math.random() * 8999) + 1000}-TS</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vinay Naidu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-[#26262B] text-white text-xs rounded-xl focus:border-[#C9A961] focus:outline-none transition-all placeholder:text-gray-650"
                  id="adv_form_name"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. contact@yourbrand.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-[#26262B] text-white text-xs rounded-xl focus:border-[#C9A961] focus:outline-none transition-all placeholder:text-gray-650"
                  id="adv_form_email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono">WhatsApp Phone Coordinate *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 93929 74031"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-[#26262B] text-white text-xs rounded-xl focus:border-[#C9A961] focus:outline-none transition-all placeholder:text-gray-650"
                  id="adv_form_phone"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono">Brand or Registered Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. FinTech Solutions Ltd"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-[#26262B] text-white text-xs rounded-xl focus:border-[#C9A961] focus:outline-none transition-all placeholder:text-gray-650"
                  id="adv_form_brand"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono">Target Platform and Handles Brief</label>
              <textarea
                placeholder="List target brand handles you are looking to secure (e.g. @alpha on X or Instagram, @nexus on TikTok)"
                value={formData.targetHandles}
                onChange={(e) => setFormData({ ...formData, targetHandles: e.target.value })}
                rows={3}
                className="w-full p-4 bg-[#0A0A0B] border border-[#26262B] text-white text-xs rounded-xl focus:border-[#C9A961] focus:outline-none transition-all placeholder:text-gray-650 font-sans"
                id="adv_form_brief"
              />
            </div>

            <div className="space-y-1.5 text-left select-none">
              <label className="text-[10px] uppercase font-bold text-[#A1A1A9] tracking-wider font-mono block mb-1">Target Advisory Budget Allocation</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["₹1L - ₹5L", "₹5L - ₹15L", "₹15L - ₹50L", "₹50L+ / Elite"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, approxBudget: option })}
                    className={`h-10 text-[11px] font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                      formData.approxBudget === option
                        ? "bg-[#C9A961] text-black border-[#C9A961]"
                        : "bg-[#0A0A0B] border-[#26262B] text-gray-300 hover:border-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Strict Legal Risk Checkbox */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0A0A0B]/80 border border-amber-500/10 text-left">
              <input
                type="checkbox"
                required
                id="acknowledgedRiskAdvisory"
                checked={formData.acknowledgedRisk}
                onChange={(e) => setFormData({ ...formData, acknowledgedRisk: e.target.checked })}
                className="h-4.5 w-4.5 rounded text-[#C9A961] bg-[#141416] border-[#26262B] focus:ring-0 active:scale-95 cursor-pointer accent-[#C9A961]"
              />
              <label htmlFor="acknowledgedRiskAdvisory" className="text-[11px] text-gray-300 font-sans cursor-pointer">
                I acknowledge the target service transfer risks. I agree that IDsvault acts solely as a consult private brokerage desk. I accept that all transactions are subjected to 18% GST under Hyderabad (Telangana) court jurisdiction limits.
              </label>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-[#C9A961] to-amber-600 hover:scale-[1.01] hover:shadow-lg text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95"
              id="adv_form_submit"
            >
              <span>Submit Sourcing Application Brief</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
