/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Shield, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  BadgeCheck, 
  FileText, 
  X,
  CreditCard,
  Plus,
  AlertCircle
} from "lucide-react";
import { formatINR } from "../data";

export const ShowcaseView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "tokens">("visual");
  const [faqOpen, setFaqOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const snippets = {
    Button: `// Button Component with glowing active focus & hover state
<button className="relative group overflow-hidden h-10 px-6 text-xs font-bold rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.01] text-black transition-all cursor-pointer select-none active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
  <span className="relative flex items-center justify-center gap-1.5 uppercase tracking-wider">
    Transact Securely
  </span>
</button>`,

    AssetCard: `// AssetCard Component with premium masking and platform tagging
<article className="p-6 rounded-2xl bg-[#0F0F10] border border-white/[0.08] hover:border-[#D4AF37]/30 flex flex-col justify-between h-60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] group relative transition-all duration-300">
  <div className="flex justify-between items-center mb-4">
    <span className="text-[9px] uppercase tracking-widest font-mono font-extrabold text-blue-450 bg-blue-500/10 px-3 py-1 rounded-full">
      telegram
    </span>
    <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-[#30D158]">
      <BadgeCheck className="h-3.5 w-3.5" /> Verified
    </span>
  </div>
  <h3 className="text-2xl font-mono font-bold text-white tracking-widest">
    @va***t
  </h3>
  <div className="pt-4 border-t border-white/[0.05] flex justify-between items-end mt-4">
    <div>
      <span className="text-[8px] font-mono text-[#8E8E93] block">ASKING VALUATION</span>
      <span className="text-lg font-bold font-mono text-white">₹3,50,000</span>
    </div>
    <button className="h-8 px-3 rounded-lg bg-white text-black font-bold text-[10px] uppercase">
      Acquire
    </button>
  </div>
</article>`,

    StatBlock: `// StatBlock Component for verifiable performance parameters
<div className="p-6 rounded-2xl bg-[#0F0F10] border border-white/[0.06] text-left">
  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono block mb-1">
    Closed Transactions
  </span>
  <div className="text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-1">
    7 <span className="text-xs text-[#E5C158] uppercase font-bold">Escrowed</span>
  </div>
  <p className="text-[10px] text-gray-500 mt-2 font-normal leading-relaxed">
    100% manual coordination completed under direct legal validation.
  </p>
</div>`,

    FAQAccordion: `// FAQAccordion Component featuring animated height bounds
<div className="border border-white/[0.08] rounded-xl bg-[#0F0F10] overflow-hidden">
  <button onClick={() => setOpen(!open)} className="w-full p-5 flex justify-between items-center text-left">
    <span className="font-bold text-xs text-white">Is buying social handles legal?</span>
    <ChevronDown className="h-4 w-4 text-gray-500" />
  </button>
  {open && (
    <div className="p-5 pt-0 text-xs text-gray-300 leading-relaxed">
      Transfer of intangible brand elements is recognized under the Indian Contract Act, 1872. Our desk manages the manual assignment.
    </div>
  )}
</div>`,

    RiskCheckbox: `// RiskCheckbox Component for explicit, legal disclosures
<label className="flex items-start gap-3 p-4 rounded-xl border border-red-500/15 bg-red-500/[0.02] cursor-pointer">
  <input 
    type="checkbox" 
    checked={accepted} 
    onChange={(e) => setAccepted(e.target.checked)} 
    className="h-4 w-4 rounded bg-[#101011] border-white/[0.15] text-[#D4AF37] focus:ring-0 cursor-pointer mt-0.5" 
  />
  <span className="text-[11px] text-gray-300 leading-relaxed">
    I explicitly acknowledge that Meta (Instagram), X Corp, and Telegram prohibit the commercial resale of handles. IDsvault operates as a manual handover consultancy.
  </span>
</label>`
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 text-left">
      
      {/* Title section */}
      <header className="space-y-4 border-b border-white/[0.06] pb-8">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]">SYSTEM DESIGN TOKENS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">IDsvault Component Library</h1>
        <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
          The modular design language of IDsvault. Optimized for high contrast (WCAG 2.1 AA compliant), fast cold starts, and zero telemetry visual clutter. Built using **Tailwind CSS**, Google-optimized **Inter** display typography, and **JetBrains Mono** data alignments.
        </p>

        {/* View switcher */}
        <div className="flex gap-2 pt-4">
          <button 
            onClick={() => setActiveTab("visual")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "visual" 
                ? "bg-white text-black font-extrabold" 
                : "bg-[#101011] border border-white/[0.08] text-gray-400 hover:text-white"
            }`}
          >
            Live Component Grid
          </button>
          <button 
            onClick={() => setActiveTab("tokens")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "tokens" 
                ? "bg-white text-black font-extrabold" 
                : "bg-[#101011] border border-white/[0.08] text-gray-400 hover:text-white"
            }`}
          >
            Design Tokens & Variables
          </button>
        </div>
      </header>

      {activeTab === "visual" && (
        <div className="space-y-12" id="live_components_section">
          
          {/* Section: Typography & Contrast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">1. Contrast-Optimized Button</h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Uses customized golden gradients paired with a black text alignment to satisfy the 4.5:1 WCAG contrast boundary perfectly. Interactive active state features structural micro-scaling transitions (`active:scale-95`).
              </p>
              
              <div className="p-8 rounded-xl bg-[#0F0F10] border border-white/[0.06] flex items-center justify-center min-h-[140px]">
                <button className="relative group overflow-hidden h-10 px-6 text-xs font-bold rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.01] text-black transition-all cursor-pointer select-none active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.15)]">
                  <span className="relative flex items-center justify-center gap-1.5 uppercase font-extrabold tracking-wider">
                    Transact Safely
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#101011] p-3 rounded-t-lg border border-white/[0.08] border-b-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase">React + Tailwind Module</span>
                <button 
                  onClick={() => copyCode("button", snippets.Button)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedId === "button" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#050506] border border-white/[0.08] text-[10px] font-mono text-gray-300 overflow-x-auto">
                <code>{snippets.Button}</code>
              </pre>
            </div>
          </div>

          {/* Section: Asset Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">2. Premium AssetCard</h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Specially designed for short name namespace lists. Features clean platform tag badges, verification status elements, verified desk reference numbers, and custom formatted valuations.
              </p>
              
              <div className="p-8 rounded-xl bg-[#0F0F10] border border-white/[0.06] min-h-[140px]">
                <div className="max-w-sm mx-auto p-6 rounded-2xl bg-[#141416]/90 border border-white/[0.08] hover:border-[#D4AF37]/30 flex flex-col justify-between h-56 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] group relative transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-widest font-mono font-extrabold text-blue-450 bg-blue-500/10 px-2.5 py-1 rounded">
                      telegram
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-mono font-semibold text-[#30D158]">
                      <BadgeCheck className="h-3.5 w-3.5" /> VERIFIED HOLD
                    </span>
                  </div>
                  <h3 className="text-2xl font-mono font-bold text-white tracking-widest my-3">
                    @va***t
                  </h3>
                  <div className="pt-4 border-t border-white/[0.05] flex justify-between items-end mt-2">
                    <div>
                      <span className="text-[7.5px] font-mono text-[#8E8E93] block">ASKING VALUATION</span>
                      <span className="text-lg font-bold font-mono text-white">₹3,50,000</span>
                    </div>
                    <button className="h-8 px-3 rounded-lg bg-white hover:bg-[#D4AF37] text-black transition-colors font-bold text-[9px] uppercase cursor-pointer">
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#101011] p-3 rounded-t-lg border border-white/[0.08] border-b-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase">React + Tailwind Module</span>
                <button 
                  onClick={() => copyCode("assetcard", snippets.AssetCard)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedId === "assetcard" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#050506] border border-white/[0.08] text-[10px] font-mono text-gray-300 overflow-x-auto">
                <code>{snippets.AssetCard}</code>
              </pre>
            </div>
          </div>

          {/* Section: Stat Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">3. Verifiable KPI Stat Block</h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Represents direct human trust metrics without any unrequested visual telemetry bloat. Relies on structured, high-contrast, pure typography layouts.
              </p>
              
              <div className="p-8 rounded-xl bg-[#0F0F10] border border-white/[0.06] flex items-center justify-center min-h-[140px]">
                <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] text-left w-full max-w-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono block mb-1">
                    Closed Transactions
                  </span>
                  <div className="text-3xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-1">
                    7 <span className="text-xs text-[#E5C158] uppercase font-bold">Escrowed</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 font-normal leading-relaxed font-sans">
                    100% manual coordination completed under direct HDFC Bank transactions checking. No external automation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#101011] p-3 rounded-t-lg border border-white/[0.08] border-b-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase">React + Tailwind Module</span>
                <button 
                  onClick={() => copyCode("statblock", snippets.StatBlock)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedId === "statblock" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#050506] border border-white/[0.08] text-[10px] font-mono text-gray-300 overflow-x-auto">
                <code>{snippets.StatBlock}</code>
              </pre>
            </div>
          </div>

          {/* Section: FAQ Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">4. FAQ Accordion Item</h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Uses functional state triggers to reveal high-density answers without layout jumping. Optimized for screen-readers and keyboard controls.
              </p>
              
              <div className="p-8 rounded-xl bg-[#0F0F10] border border-white/[0.06] min-h-[140px]">
                <div className="max-w-md mx-auto border border-white/[0.08] rounded-xl bg-[#141416] overflow-hidden">
                  <button 
                    onClick={() => setFaqOpen(!faqOpen)} 
                    className="w-full p-4 flex justify-between items-center text-left bg-transparent border-0 cursor-pointer"
                  >
                    <span className="font-bold text-xs text-white">Is buying social handles legal in India?</span>
                    <span className="text-xs text-[#D4AF37] font-mono">{faqOpen ? "[-] HIDE" : "[+] EXPAND"}</span>
                  </button>
                  {faqOpen && (
                    <div className="p-4 pt-0 text-[11px] text-gray-300 leading-relaxed border-t border-white/[0.02] mt-1">
                      The transfer of intangible intellectual coordinates under mutual administrative assignment contracts is completely standard under Section 2(h) of the Indian Contract Act, 1872. Our Hyderabad desk handles document verification and secure Escrow coordinate routing.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#101011] p-3 rounded-t-lg border border-white/[0.08] border-b-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase">React + Tailwind Module</span>
                <button 
                  onClick={() => copyCode("faqaccordion", snippets.FAQAccordion)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedId === "faqaccordion" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#050506] border border-white/[0.08] text-[10px] font-mono text-gray-300 overflow-x-auto">
                <code>{snippets.FAQAccordion}</code>
              </pre>
            </div>
          </div>

          {/* Section: Risk Checkbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">5. Risk Disclosure Checkbox</h2>
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Compels direct user acknowledgement of Meta, X, or Telegram Terms of Service prior to checkout registration or offer lodgments, protecting current desk compliance parameters.
              </p>
              
              <div className="p-8 rounded-xl bg-[#0F0F10] border border-white/[0.06] min-h-[140px]">
                <div className="max-w-md mx-auto">
                  <label className="flex items-start gap-3 p-4 rounded-xl border border-rose-500/15 bg-rose-550/[0.02] cursor-pointer selection:bg-rose-500/10">
                    <input 
                      type="checkbox" 
                      checked={termsAccepted} 
                      onChange={(e) => setTermsAccepted(e.target.checked)} 
                      className="h-4 w-4 rounded bg-[#101011] border-white/[0.15] text-[#D4AF37] focus:ring-0 cursor-pointer mt-0.5" 
                    />
                    <span className="text-[11px] text-gray-400 leading-relaxed font-sans">
                      <strong className="text-white">Mandatory Risk Consent:</strong> I explicitly understand that host networks technically prohibit handle trading. I engage IDsvault strictly for live manual security handover consulting.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center bg-[#101011] p-3 rounded-t-lg border border-white/[0.08] border-b-0">
                <span className="text-[10px] font-mono text-gray-400 uppercase">React + Tailwind Module</span>
                <button 
                  onClick={() => copyCode("riskcheckbox", snippets.RiskCheckbox)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedId === "riskcheckbox" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#050506] border border-white/[0.08] text-[10px] font-mono text-gray-300 overflow-x-auto">
                <code>{snippets.RiskCheckbox}</code>
              </pre>
            </div>
          </div>

        </div>
      )}

      {activeTab === "tokens" && (
        <div className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-8" id="design_tokens_section">
          
          <div className="border-b border-white/[0.06] pb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Active CSS Design Tokens Matrix</h2>
            <p className="text-xs text-gray-400 mt-1">
              Direct CSS variables loaded via `@theme` config for 100% color and spacing matching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Token Group: Colors */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-mono">🎨 Color Palette Tokens</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#050505] border border-white/[0.08]" />
                  <div className="text-xs font-mono">
                    <span className="text-white font-bold block">--color-page-bg</span>
                    <span className="text-gray-500">#050505 (Deep Off-black)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#0F0F10] border border-white/[0.08]" />
                  <div className="text-xs font-mono">
                    <span className="text-white font-bold block">--color-card-bg</span>
                    <span className="text-gray-500">#0F0F10 (Isolated Ink)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-[#D4AF37]" />
                  <div className="text-xs font-mono">
                    <span className="text-[#D4AF37] font-bold block">--color-accent-gold</span>
                    <span className="text-gray-500">#D4AF37 (Imperial Brass)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Group: Typography */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">✍️ Typography Stack</h3>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">--font-sans (Primary Brand)</span>
                  <p className="text-gray-500 font-sans mt-1">
                    "Inter", sans-serif (Optimized for maximum cross-device layout readability)
                  </p>
                </div>
                <div>
                  <span className="text-white font-bold block">--font-mono (Data Ledger)</span>
                  <p className="text-gray-500 font-mono mt-1">
                    "JetBrains Mono", monospace (Guarantees character tabular alignments)
                  </p>
                </div>
              </div>
            </div>

            {/* Token Group: Border/Radius */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">⚙️ Structural Bounds</h3>
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-white font-bold block">--radius-card</span>
                  <span className="text-gray-500">16px (2xl rounded boundaries)</span>
                </div>
                <div>
                  <span className="text-white font-bold block">--radius-button</span>
                  <span className="text-gray-500">8px (lg rounded boundaries)</span>
                </div>
                <div>
                  <span className="text-white font-bold block">--maximum-container</span>
                  <span className="text-gray-500">max-w-7xl mx-auto (1280px viewport boundary)</span>
                </div>
              </div>
            </div>

          </div>

          <div className="p-4 rounded-xl border border-white/[0.04] bg-[#141416] flex items-center gap-3 text-xs text-gray-400 leading-relaxed font-sans">
            <AlertCircle className="h-5 w-5 text-[#D4AF37] shrink-0" />
            <p>
              IDsvault’s design token coordinates are fully mapped in the primary global <code className="text-white font-mono shrink-0 font-bold">/src/index.css</code> stylesheet. No third-party runtime scripting is needed, protecting browser Performance interaction paint intervals (LCP &lt; 1.2s on standard mobile viewports).
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
