/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";
import { 
  Send, 
  AlertCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  Loader2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { Platform, Urgency } from "../types";
import { buildWhatsAppHandoff, formatINR } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface SourcingRequestProps {
  onRegisterRequest: (desiredUsername: string, platform: Platform, budget: number, urgency: Urgency, alternatives: string) => void;
}

export const SourcingRequest: React.FC<SourcingRequestProps> = ({ onRegisterRequest }) => {
  usePageTitle("Custom Sourcing");
  const [step, setStep] = useState(1);

  const [desiredUsername, setDesiredUsername] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [budget, setBudget] = useState("");
  const [urgency, setUrgency] = useState<Urgency>(Urgency.Standard);
  const [alternatives, setAlternatives] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCoords, setSuccessCoords] = useState<{ url: string; mailto: string } | null>(null);

  const handleNextStep = () => {
    const budgetValue = parseFloat(budget);
    if (!desiredUsername.trim()) {
      alert("Please provide the desired namespace handle.");
      return;
    }
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert("Please enter a valid target budget limits.");
      return;
    }
    setStep(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetValue = parseFloat(budget);

    if (!whatsapp.trim() || !email.trim()) {
      alert("Please provide active communications coordinates.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Save to logs/state
      onRegisterRequest(desiredUsername, platform, budgetValue, urgency, alternatives);

      const template = `Hi IDsvault, I want help sourcing a premium digital identity.

Desired Handle: @${desiredUsername}
Platform: ${platform.toUpperCase()}
Budget: ${formatINR(budgetValue)}
Urgency: ${urgency}`;

      const coords = buildWhatsAppHandoff(template);

      setSuccessCoords({
        url: coords.url,
        mailto: coords.mailto
      });
    }, 1500);
  };

  return (
    <>
    <SEO
      title="Custom Handle Sourcing"
      description="Can't find the username you want? Tell our Hyderabad broker desk what you need — we'll source your ideal Instagram handle, X username, or Telegram channel."
      canonical="/source"
    />
    <div className="max-w-xl mx-auto px-6 py-12 text-left">

      <div className="mb-10 text-center space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight animate-in">Private Commission Sourcing</h1>
        <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
          Can't locate your target identifier? Commission discrete, off-market sourcing campaigns managed entirely by our active India-based coordinators.
        </p>
      </div>

      {/* Step indicator progress bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06] text-xs font-mono select-none">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-400 font-bold" : "text-gray-500"}`}>
          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-white/5"
          }`}>1</span>
          <span>Sourcing Target</span>
        </div>
        <div className="h-[1px] flex-grow bg-white/[0.06] mx-4" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-400 font-bold" : "text-gray-500"}`}>
          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-white/5"
          }`}>2</span>
          <span>Contact Channels</span>
        </div>
      </div>

      <article className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08]" id="sourcing_container">
        
        <form onSubmit={step === 2 ? handleFormSubmit : (e) => e.preventDefault()} className="space-y-6">
          
          {step === 1 ? (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Desired Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">@</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. zenith"
                      value={desiredUsername}
                      onChange={(e) => setDesiredUsername(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ""))}
                      className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Target Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none cursor-pointer"
                  >
                    <option value={Platform.Instagram}>Instagram</option>
                    <option value={Platform.X}>X / Twitter</option>
                    <option value={Platform.Telegram}>Telegram</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Campaign Target Budget (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 500000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Campaign Urgency
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as Urgency)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none cursor-pointer"
                  >
                    <option value={Urgency.Immediate}>Immediate outreach (48 hours)</option>
                    <option value={Urgency.Standard}>Standard campaign (7-14 days)</option>
                    <option value={Urgency.Flexible}>Flexible tracking search</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 select-none active:scale-95 text-center"
              >
                <span>Continue to Contact Channels</span>
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          ) : (
            <div className="space-y-6">
              
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                  Proposed Alternative Variants
                </label>
                <input
                  type="text"
                  placeholder="e.g. zenithmedia, zenithcorp"
                  value={alternatives}
                  onChange={(e) => setAlternatives(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none animate-in fade-in duration-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Owner WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 91111 22222"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Corporate Email Coordinate
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. buyer@zenithlabs.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 border border-white/[0.08] hover:border-white/[0.15] text-gray-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer select-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <span>Commission Campaign</span>
                  )}
                </button>
              </div>

            </div>
          )}

        </form>
      </article>

      {/* Sourcing warning note */}
      <div className="mt-6 p-4 rounded-xl bg-[#151517] border border-white/[0.06] text-xs text-gray-400 space-y-2 leading-relaxed select-none">
        <h4 className="font-bold text-white text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#10B981]" />
          Discrete Campaign Confidentiality Guard
        </h4>
        <p className="text-[10px]">
          We conduct candidate checks in deep isolation, keeping current handle custodians blind to your maximum budget targets, preventing artificial price escalation or blackmail.
        </p>
      </div>

      {/* Success dialogue window */}
      <AnimatePresence>
        {successCoords && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white block"
              id="sourcing_success_modal"
            >
              <div className="h-12 w-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <Send className="h-5 w-5 text-blue-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Campaign Commissioned</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  Our discrete outreach coordinator desk has updated the campaign ledger. To initiate manual candidate checks, launch the verified secure communication handshake.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={successCoords.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setSuccessCoords(null)}
                >
                  Verify Handshake Workspace
                </a>
                <a
                  href={successCoords.mailto}
                  className="text-gray-400 hover:text-white text-[10px] underline tracking-widest uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer font-extrabold"
                  onClick={() => setSuccessCoords(null)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  No WhatsApp? Mail Sourcing Support
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
};
