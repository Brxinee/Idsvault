/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";
import {
  Send,
  Mail,
  Loader2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Platform, Urgency } from "../types";
import { buildWhatsAppHandoff, formatINR } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

interface SourcingRequestProps {
  onRegisterRequest: (
    desiredUsername: string,
    platform: Platform,
    budget: number,
    urgency: Urgency,
    alternatives: string
  ) => void;
}

export const SourcingRequest: React.FC<SourcingRequestProps> = ({
  onRegisterRequest,
}) => {
  usePageTitle("Private Advisory");

  const [step, setStep] = useState(1);
  const [desiredUsername, setDesiredUsername] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [budget, setBudget] = useState("");
  const [urgency, setUrgency] = useState<Urgency>(Urgency.Standard);
  const [alternatives, setAlternatives] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [riskAcknowledged, setRiskAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCoords, setSuccessCoords] = useState<{
    url: string;
    mailto: string;
  } | null>(null);

  // Platforms with ToS risk that require the risk disclosure checkbox
  const isToSRiskyPlatform =
    platform === Platform.Instagram || platform === Platform.X;

  const handleNextStep = () => {
    if (!desiredUsername.trim()) {
      alert("Please enter the handle you are looking for.");
      return;
    }
    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert("Please enter a valid budget in ₹.");
      return;
    }
    if (isToSRiskyPlatform && !riskAcknowledged) {
      alert(
        "Please read and acknowledge the platform risk disclosure before continuing."
      );
      return;
    }
    setStep(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim() || !email.trim()) {
      alert("Please provide your WhatsApp number and email address.");
      return;
    }

    setIsSubmitting(true);
    const budgetValue = parseFloat(budget);

    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterRequest(
        desiredUsername,
        platform,
        budgetValue,
        urgency,
        alternatives
      );

      const template = `Hi IDsvault, I am looking for help sourcing a handle.

Desired handle: @${desiredUsername}
Platform: ${platform.toUpperCase()}
Budget: ${formatINR(budgetValue)}
Timeline: ${urgency}`;

      const coords = buildWhatsAppHandoff(template);
      setSuccessCoords({ url: coords.url, mailto: coords.mailto });
    }, 1200);
  };

  return (
    <>
      <SEO
        title="Private Advisory — Off-Market Sourcing"
        description="Can't find the handle you need in our inventory? Submit a sourcing request. Our Hyderabad broker will reach out to find it for you."
        canonical="/advisory"
      />
      <div className="max-w-xl mx-auto px-6 py-12 text-left">

        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Private Advisory
          </h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Can't find the handle you need? Tell us what you're looking for and
            we'll reach out to find it. No commitment at this stage.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06] text-xs font-mono select-none">
          <div
            className={`flex items-center gap-2 ${
              step >= 1 ? "text-blue-400 font-bold" : "text-gray-500"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 1 ? "bg-blue-600 text-white" : "bg-white/5"
              }`}
            >
              1
            </span>
            <span>Your Request</span>
          </div>
          <div className="h-[1px] flex-grow bg-white/[0.06] mx-4" />
          <div
            className={`flex items-center gap-2 ${
              step >= 2 ? "text-blue-400 font-bold" : "text-gray-500"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                step >= 2 ? "bg-blue-600 text-white" : "bg-white/5"
              }`}
            >
              2
            </span>
            <span>Contact Details</span>
          </div>
        </div>

        <article
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08]"
          id="advisory_form"
        >
          <form
            onSubmit={
              step === 2 ? handleFormSubmit : (e) => e.preventDefault()
            }
            className="space-y-6"
          >
            {step === 1 ? (
              <div className="space-y-6">

                {/* Handle + Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Desired Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">
                        @
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. zenith"
                        value={desiredUsername}
                        onChange={(e) =>
                          setDesiredUsername(
                            e.target.value.replace(/[^a-zA-Z0-9_.]/g, "")
                          )
                        }
                        className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => {
                        setPlatform(e.target.value as Platform);
                        setRiskAcknowledged(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none cursor-pointer"
                    >
                      <option value={Platform.Instagram}>Instagram</option>
                      <option value={Platform.X}>X / Twitter</option>
                      <option value={Platform.Telegram}>Telegram</option>
                    </select>
                  </div>
                </div>

                {/* Budget + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Budget (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-mono">
                        ₹
                      </span>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 500000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1">
                      Payment via UPI · Bank once we confirm sourcing
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Timeline
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as Urgency)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none cursor-pointer"
                    >
                      <option value={Urgency.Immediate}>
                        Urgent (within 48 hours)
                      </option>
                      <option value={Urgency.Standard}>
                        Standard (7–14 days)
                      </option>
                      <option value={Urgency.Flexible}>
                        Flexible (no deadline)
                      </option>
                    </select>
                  </div>
                </div>

                {/* ToS Risk Disclosure — shown for Instagram / X only */}
                {isToSRiskyPlatform && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="space-y-2 text-xs">
                        <p className="font-semibold text-white">
                          Platform risk disclosure —{" "}
                          {platform === Platform.Instagram
                            ? "Instagram"
                            : "X (Twitter)"}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                          {platform === Platform.Instagram
                            ? "Instagram's Terms of Service explicitly prohibit the transfer or sale of usernames. Any transfer carries the risk of account suspension, username recycling, or enforcement action by Instagram. IDsvault does not publicly list Instagram handles. We only engage on a private advisory basis."
                            : "X (Twitter)'s Terms of Service explicitly prohibit the transfer or sale of usernames. Any transfer carries the risk of account suspension, username recycling, or enforcement action by X. IDsvault does not publicly list X handles. We only engage on a private advisory basis."}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                          We cannot guarantee that the platform will not suspend
                          the account or reclaim the username after transfer.
                          IDsvault's liability is limited to our brokerage fee
                          on the specific deal.
                        </p>
                        <Link
                          to="/policy/risk-disclosure"
                          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                        >
                          Full risk disclosure →
                        </Link>
                      </div>
                    </div>

                    {/* Mandatory checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={riskAcknowledged}
                        onChange={(e) =>
                          setRiskAcknowledged(e.target.checked)
                        }
                        className="mt-0.5 h-3.5 w-3.5 rounded border-amber-500/50 bg-[#151517] text-amber-500 accent-amber-500 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        I have read the platform risk disclosure above. I
                        understand this transfer is not sanctioned by the
                        platform and I accept the associated risks in full.
                      </span>
                    </label>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 select-none active:scale-95"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Alternative handles */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Acceptable Alternatives (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. zenithmedia, zenithcorp"
                    value={alternatives}
                    onChange={(e) => setAlternatives(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                  />
                </div>

                {/* WhatsApp + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Your WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91111 22222"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Nav */}
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
                    className="py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none active:scale-95"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span>Send Request</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </article>

        {/* Info note */}
        <div className="mt-6 p-4 rounded-xl bg-[#0F0F10] border border-white/[0.06] text-xs text-gray-400 space-y-1 leading-relaxed">
          <p className="font-semibold text-white text-[11px]">
            What happens after you submit
          </p>
          <p className="text-[11px]">
            The broker reviews your request and contacts you on WhatsApp within
            4 business hours. No payment is taken at this stage. KYC and
            payment instructions are only sent after we confirm the handle is
            available and you agree to proceed.
          </p>
        </div>

        {/* Success modal */}
        <AnimatePresence>
          {successCoords && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white"
              >
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Send className="h-5 w-5 text-blue-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-white tracking-tight">
                    Request Received
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Your request has been logged. The broker will review it and
                    contact you on WhatsApp within 4 business hours.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={successCoords.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={() => setSuccessCoords(null)}
                  >
                    Message Broker on WhatsApp
                  </a>
                  <a
                    href={successCoords.mailto}
                    className="text-gray-400 hover:text-white text-[11px] underline transition-colors flex items-center justify-center gap-1"
                    onClick={() => setSuccessCoords(null)}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    No WhatsApp? Email broker@idsvault.com
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
