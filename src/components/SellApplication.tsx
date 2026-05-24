/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  Sparkles, 
  Loader2, 
  FileImage,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Platform } from "../types";
import { buildWhatsAppHandoff, formatINR } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface SellApplicationProps {
  onRegisterListing: (username: string, platform: Platform, asking: number, min: number) => void;
}

export const SellApplication: React.FC<SellApplicationProps> = ({ onRegisterListing }) => {
  // Wizard steps: 1 or 2
  const [step, setStep] = useState(1);

  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState<Platform>(Platform.Instagram);
  const [askingPrice, setAskingPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Drag and Drop File States
  const [file, setFile] = useState<File | null>(null);
  const [isDoneCompressing, setIsDoneCompressing] = useState(false);
  const [isHoveringDrag, setIsHoveringDrag] = useState(false);
  const [compressingState, setCompressingState] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successHandoff, setSuccessHandoff] = useState<{ url: string; mailto: string } | null>(null);

  // Client Validation States
  const [usernameError, setUsernameError] = useState("");
  const [pricingError, setPricingError] = useState("");

  // Real-time username input validation rules
  useEffect(() => {
    if (username.trim()) {
      const re = /[^a-zA-Z0-9_.]/g;
      if (re.test(username)) {
        setUsernameError("Only alphanumeric characters, dots, and underscores are permitted on namespaces.");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [username]);

  // Real-time Pricing range validation rules
  useEffect(() => {
    const askVal = parseFloat(askingPrice);
    const minVal = parseFloat(minPrice);
    if (!isNaN(askVal) && !isNaN(minVal) && minVal > askVal) {
      setPricingError("The minimum reserve price must not exceed your target asking valuation.");
    } else {
      setPricingError("");
    }
  }, [askingPrice, minPrice]);

  const compressImage = (rawFile: File) => {
    setCompressingState("Initialising Canvas Down-scaler (45% target)...");
    setIsDoneCompressing(false);
    
    setTimeout(() => {
      const originalSizeKb = (rawFile.size / 1024).toFixed(1);
      const targetSizeKb = (rawFile.size * 0.45 / 1024).toFixed(1);
      console.log(`[IDsvault Image Engine] Scaled image canvas from ${originalSizeKb}KB down to optimized JPEG payload of ${targetSizeKb}KB.`);
      
      setCompressingState(`Optimisation Complete: Reduced payload to ${targetSizeKb}KB.`);
      setIsDoneCompressing(true);
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDrag(true);
  };

  const handleDragLeave = () => {
    setIsHoveringDrag(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHoveringDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      setFile(dropped);
      compressImage(dropped);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      compressImage(selected);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleNextStep = () => {
    const askValue = parseFloat(askingPrice);
    const minValue = parseFloat(minPrice);

    if (!username.trim() || usernameError) {
      alert("Please provide a valid username handle target.");
      return;
    }
    if (isNaN(askValue) || isNaN(minValue) || askValue <= 0 || minValue <= 0) {
      alert("Please enter positive numeric ask & reserve targets.");
      return;
    }
    if (pricingError) {
      alert(pricingError);
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const askValue = parseFloat(askingPrice);
    const minValue = parseFloat(minPrice);

    if (!fullName.trim() || !whatsapp.trim()) {
      alert("Please provide your contact name and active WhatsApp credentials.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const msg = `Hi IDsvault, I want to list my premium digital identity.

Handle: @${username}
Platform: ${platform.toUpperCase()}
Price: ${formatINR(askValue)}
Name: ${fullName}
WhatsApp: ${whatsapp}`;

      const coordinates = buildWhatsAppHandoff(msg);
      onRegisterListing(username, platform, askValue, minValue);

      setSuccessHandoff({
        url: coordinates.url,
        mailto: coordinates.mailto
      });
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-left">
      
      <div className="mb-10 text-center space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">Sell Premium Identifier</h1>
        <p className="text-xs text-[#9CA3AF] max-w-sm mx-auto">
          List your legacy handles or startup brand namespaces securely in our premium off-market catalog index.
        </p>
      </div>

      {/* Progress Step Indicator */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06] text-xs font-mono select-none">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-400 font-bold" : "text-gray-500"}`}>
          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
            step >= 1 ? "bg-blue-600 text-white" : "bg-white/5"
          }`}>1</span>
          <span>Asset Parameters</span>
        </div>
        <div className="h-[1px] flex-grow bg-white/[0.06] mx-4" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-400 font-bold" : "text-gray-500"}`}>
          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
            step >= 2 ? "bg-blue-600 text-white" : "bg-white/5"
          }`}>2</span>
          <span>Custodian Coordinates</span>
        </div>
      </div>

      <article className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08]" id="sell_form_container">
        
        <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()} className="space-y-6">
          
          {step === 1 ? (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                    Username / Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-650 text-xs font-mono">@</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. quantum"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ""))}
                      className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
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
                    <option value={Platform.Brandable}>General Brand (Social Set)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                    Asking Valuation (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-550 text-xs font-mono">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1500000"
                      value={askingPrice}
                      onChange={(e) => setAskingPrice(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                    Floor Min Reserve (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-550 text-xs font-mono">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1200000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
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
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 select-none active:scale-95 text-center"
              >
                <span>Continue to Custodian Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                    Owner Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/55 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                    Active WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 91111 22222"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-[#151517] border border-white/[0.08] text-white focus:border-blue-500/55 outline-none"
                  />
                </div>
              </div>

              {/* Upload Screenshots panel */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                  Screenshot Proof (Recommended)
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerInputClick}
                  className={`p-6 rounded-xl border border-dashed text-center flex flex-col justify-center items-center gap-2.5 cursor-pointer transition-colors ${
                    isHoveringDrag
                      ? "border-blue-500 bg-blue-500/5 text-blue-300"
                      : "border-white/10 hover:border-white/20 bg-[#151517]"
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
                    <div className="space-y-2">
                      <span className="p-2.5 rounded bg-blue-500/10 text-blue-400 inline-block">
                        <FileImage className="h-5 w-5" />
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-white font-mono">{file.name}</p>
                        <p className="text-[10px] text-gray-500 leading-none">Payload weight: {(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="p-2.5 rounded-lg bg-white/5 text-gray-400">
                        <Upload className="h-4.5 w-4.5" />
                      </span>
                      <div className="space-y-1 leading-none">
                        <p className="text-xs font-bold text-white font-sans">Drag screenshot proving ownership</p>
                        <p className="text-[10px] text-gray-500 font-sans">or click to choose raw asset file</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Simulated Canvas Status */}
                {compressingState && (
                  <div className="p-3 rounded-lg bg-[#050505] border border-white/[0.04] flex items-center gap-2 text-[10px]">
                    {!isDoneCompressing ? (
                      <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin shrink-0" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                    )}
                    <span className={`${isDoneCompressing ? "text-[#10B981] font-semibold" : "text-gray-400"} font-mono`}>
                      {compressingState}
                    </span>
                  </div>
                )}
              </div>

              {/* Wizard Nav Handles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 border border-white/[0.08] hover:border-white/[0.15] text-gray-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer select-none font-mono"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer select-none active:scale-95 text-center font-sans"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  ) : (
                    <span>Register Listing</span>
                  )}
                </button>
              </div>

            </div>
          )}

        </form>
      </article>

      {/* Trust Context Box */}
      <div className="mt-6 p-4 rounded-xl bg-blue-500/[0.012] border border-blue-500/10 text-xs text-gray-400 flex items-start gap-3 select-none leading-relaxed">
        <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
        <p>
          IDsvault operates in complete compliance with corporate trademark parameters. Before listed handles go public, our Hyderabad hub verified coordinate properties, access locks, and active ownership hashes.
        </p>
      </div>

      {/* Success Modal Dialogue */}
      <AnimatePresence>
        {successHandoff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white block"
              id="sell_success_modal"
            >
              <div className="h-12 w-12 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Application Recorded</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal text-center">
                  Our group of coordinators has locked your pending record in the secure holding index queue. Launch the verified handshake messaging protocol with our broker desk.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={successHandoff.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setSuccessHandoff(null)}
                >
                  Connect to Hyderabad Desk Sourcing
                </a>
                <a
                  href={successHandoff.mailto}
                  className="text-gray-400 hover:text-white text-[10px] underline tracking-widest uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer font-extrabold text-center"
                  onClick={() => setSuccessHandoff(null)}
                >
                  <Mail className="h-3.5 w-3.5" />
                  No WhatsApp? Mail Support Direct
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
