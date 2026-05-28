/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";
import {
  Upload,
  Mail,
  Loader2,
  FileImage,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { Platform } from "../types";
import { buildWhatsAppHandoff, formatINR } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

interface SellApplicationProps {
  onRegisterListing: (
    username: string,
    platform: Platform,
    asking: number,
    min: number
  ) => void;
}

export const SellApplication: React.FC<SellApplicationProps> = ({
  onRegisterListing,
}) => {
  usePageTitle("Sell Your Handle");

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [askingPrice, setAskingPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  // Seller indemnity checkboxes
  const [ownsAsset, setOwnsAsset] = useState(false);
  const [noTrademark, setNoTrademark] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [isHoveringDrag, setIsHoveringDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successHandoff, setSuccessHandoff] = useState<{
    url: string;
    mailto: string;
  } | null>(null);

  const [usernameError, setUsernameError] = useState("");
  const [pricingError, setPricingError] = useState("");

  useEffect(() => {
    if (username.trim()) {
      if (/[^a-zA-Z0-9_.]/.test(username)) {
        setUsernameError("Only letters, numbers, dots, and underscores allowed.");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [username]);

  useEffect(() => {
    const ask = parseFloat(askingPrice);
    const min = parseFloat(minPrice);
    if (!isNaN(ask) && !isNaN(min) && min > ask) {
      setPricingError("Reserve price must not exceed the asking price.");
    } else {
      setPricingError("");
    }
  }, [askingPrice, minPrice]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDrag(true);
  };
  const handleDragLeave = () => setIsHoveringDrag(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDrag(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleNextStep = () => {
    if (!username.trim() || usernameError) {
      alert("Please enter a valid handle.");
      return;
    }
    const ask = parseFloat(askingPrice);
    const min = parseFloat(minPrice);
    if (isNaN(ask) || isNaN(min) || ask <= 0 || min <= 0) {
      alert("Please enter valid asking and reserve prices in ₹.");
      return;
    }
    if (pricingError) {
      alert(pricingError);
      return;
    }
    setStep(2);
  };

  const allCheckboxesTicked = ownsAsset && noTrademark && termsAgreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      alert("Please provide your name and WhatsApp number.");
      return;
    }
    if (!allCheckboxesTicked) {
      alert("Please confirm all three declarations before submitting.");
      return;
    }

    setIsSubmitting(true);
    const ask = parseFloat(askingPrice);
    const min = parseFloat(minPrice);

    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterListing(username, platform, ask, min);

      const msg = `Hi IDsvault, I want to list my handle for sale.

Handle: @${username}
Platform: ${platform.toUpperCase()}
Asking price: ${formatINR(ask)}
Name: ${fullName}
WhatsApp: ${whatsapp}`;

      const coords = buildWhatsAppHandoff(msg);
      setSuccessHandoff({ url: coords.url, mailto: coords.mailto });
    }, 1200);
  };

  return (
    <>
      <SEO
        title="Sell Your Handle"
        description="List your premium Telegram username, Instagram handle, X (Twitter) username, or brandable domain for sale through IDsvault's broker-supervised transfer process. Hyderabad desk."
        canonical="/sell"
      />
      <div className="max-w-xl mx-auto px-6 py-12 text-left">

        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Sell Your Handle
          </h1>
          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Submit your asset for review. We verify ownership before anything
            goes live. You deal with our broker — not buyers directly.
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
            <span>Asset Details</span>
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
            <span>Your Details</span>
          </div>
        </div>

        <article
          className="p-8 rounded-2xl bg-surface border border-white/[0.08]"
          id="sell_form"
        >
          <form
            onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}
            className="space-y-6"
          >
            {step === 1 ? (
              <div className="space-y-6">

                {/* Handle + Platform */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      Username / Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                        @
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. quantum"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value.replace(/\s+/g, ""))
                        }
                        className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                      />
                    </div>
                    {usernameError && (
                      <p className="text-[10px] text-red-400 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="h-3 w-3" /> {usernameError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) =>
                        setPlatform(e.target.value as Platform)
                      }
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none cursor-pointer"
                    >
                      <option value={Platform.Telegram}>Telegram</option>
                      <option value={Platform.Instagram}>Instagram</option>
                      <option value={Platform.X}>X / Twitter</option>
                      <option value={Platform.Brandable}>
                        Brandable Domain
                      </option>
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      Asking Price (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                        ₹
                      </span>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 1500000"
                        value={askingPrice}
                        onChange={(e) => setAskingPrice(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      Minimum Reserve (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                        ₹
                      </span>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 1200000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {pricingError && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 bg-red-500/5 p-2.5 rounded border border-red-500/10">
                    <AlertCircle className="h-3.5 w-3.5" /> {pricingError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-95"
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">

                {/* Name + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91111 22222"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                {/* Screenshot upload */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                    Proof of Ownership (optional but speeds up verification)
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-6 rounded-xl border border-dashed text-center flex flex-col justify-center items-center gap-2.5 cursor-pointer transition-colors ${
                      isHoveringDrag
                        ? "border-blue-500 bg-blue-500/5 text-blue-300"
                        : "border-white/10 hover:border-white/20 bg-raised"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    {file ? (
                      <div className="space-y-1.5">
                        <span className="p-2.5 rounded bg-blue-500/10 text-blue-400 inline-block">
                          <FileImage className="h-5 w-5" />
                        </span>
                        <p className="text-xs font-bold text-white font-mono">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    ) : (
                      <>
                        <span className="p-2.5 rounded-lg bg-white/5 text-gray-400">
                          <Upload className="h-4 w-4" />
                        </span>
                        <div className="space-y-1 leading-none">
                          <p className="text-xs font-bold text-white">
                            Screenshot showing you own the account
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Drag and drop or click to upload
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Seller indemnity declarations */}
                <div className="space-y-3 p-4 rounded-xl bg-raised border border-white/[0.06]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Seller declarations (required)
                  </p>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={ownsAsset}
                      onChange={(e) => setOwnsAsset(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      I am the original and lawful owner of @{username || "this handle"}.
                      I have not obtained it through hacking, phishing, account recovery
                      exploits, or any other unauthorised means.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={noTrademark}
                      onChange={(e) => setNoTrademark(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      To the best of my knowledge, this handle does not infringe any
                      registered trademark in India or internationally. I agree to
                      indemnify IDsvault against any third-party trademark claims
                      arising from this listing.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-500 cursor-pointer shrink-0"
                    />
                    <span className="text-[11px] text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                      I have read and agree to IDsvault's{" "}
                      <Link
                        to="/policy/terms"
                        className="text-blue-400 hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/policy/risk-disclosure"
                        className="text-blue-400 hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener"
                      >
                        Risk Disclosure
                      </Link>
                      .
                    </span>
                  </label>

                  {!allCheckboxesTicked && (
                    <div className="flex items-center gap-2 pt-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <p className="text-[10px] text-amber-300">
                        All three declarations must be confirmed to submit.
                      </p>
                    </div>
                  )}
                </div>

                {/* Nav */}
                <div className="grid grid-cols-2 gap-3">
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
                    disabled={isSubmitting || !allCheckboxesTicked}
                    className="py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none active:scale-95"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span>Submit Listing</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </article>

        {/* Context note */}
        <div className="mt-6 p-4 rounded-xl bg-surface border border-white/[0.06] text-xs text-gray-400 space-y-1 leading-relaxed">
          <p className="font-semibold text-white text-[11px]">
            What happens after you submit
          </p>
          <p className="text-[11px]">
            The broker reviews your submission and contacts you on WhatsApp
            within 4 business hours to verify ownership. Nothing is listed
            publicly until verification is complete. There is no listing fee —
            we earn commission only on completed deals.
          </p>
        </div>

        {/* Success modal */}
        <AnimatePresence>
          {successHandoff && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-8 rounded-2xl bg-surface border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white"
                id="sell_success_modal"
              >
                <div className="h-12 w-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6 text-[#10B981]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-white tracking-tight">
                    Listing Submitted
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    The broker will contact you on WhatsApp within 4 business
                    hours to verify ownership. Message us now to speed things up.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={successHandoff.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={() => setSuccessHandoff(null)}
                  >
                    Message Broker on WhatsApp
                  </a>
                  <a
                    href={successHandoff.mailto}
                    className="text-gray-400 hover:text-white text-[11px] underline transition-colors flex items-center justify-center gap-1"
                    onClick={() => setSuccessHandoff(null)}
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
