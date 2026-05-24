/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Scale, ShieldAlert, Sparkles, AlertTriangle, HelpCircle, FileText, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RegulatoryInfoProps {
  segment: "policy-acceptable" | "policy-trademark" | "policy-refund" | "policy-terms" | "policy-privacy" | "policy-aml-kyc" | "faq";
}

export const RegulatoryInfo: React.FC<RegulatoryInfoProps> = ({ segment }) => {
  // FAQ active index state for interactive accordion reveal
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: "How are sellers verified?",
      a: "Our Hyderabad coordination desk operates extensive pre-listing verification audits, manual ownership checks, profile verification, and strict listing moderation. Sellers must resolve ownership token hashes or custom screenshot proof reviews before any database approval is posted in our publicly searchable index catalog, reducing anonymous speculation risks entirely."
    },
    {
      q: "What if transfer fails?",
      a: "If coordinate release fails validation checks or a handle is determined permanently locked, the transaction is gracefully cancelled. Held INR deposits are fully reversed and refunded back to the originating bank coordinate account within three (3) business hours under our structured payment workflow."
    },
    {
      q: "Why pay IDsvault instead of seller?",
      a: "Paying our supervised brokerage ensures absolute security. Our structured payment workflow acts as a complete protective shield, isolating intermediate funds. Capital is only released to the seller upon validated, manual buyer coordinate possession, eliminating direct-deal chargebacks or hijackings entirely."
    },
    {
      q: "Are you affiliated with Instagram/X/Telegram?",
      a: "No. IDsvault is a strictly independent, premium digital identity brokerage coordination desk. We are NOT an official partner, associate, or affiliate of Meta, Instagram, X Corp, or Telegram, nor are we licensed by them. All trademarks belong to their respective corporate trademark holders."
    },
    {
      q: "Do you guarantee future access?",
      a: "No. Independent coordination desks can guarantee future access or indefinitely override host platform policies. We supervise and verify the immediate transaction handshake, but post-transfer account security is subject to platform Terms of Service, which prohibit identity transfers. Buyers acknowledge this host risk before starting deals."
    },
    {
      q: "How long do deals take?",
      a: "Standard, human-brokered transfers resolve in 4 to 24 hours under the active manual supervision of our Hyderabad-based coordination staff."
    },
    {
      q: "What qualifies as premium?",
      a: "An identifier is considered premium if it consists of a single dictionary word, is under 5 characters (short handle), contains historical brand equity, or represents a prominent industry niche. Our Hyderabad curation desk manually checks trademark databases and platform age before listing approval."
    },
    {
      q: "What if seller is fake?",
      a: "All listed usernames are publicly masked. Direct bypass attempts are actively screened out. We check and confirm actual coordinate control before listing approval, completely mitigating fake listings before they are indexed."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-left">
      
      {segment === "policy-acceptable" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/15">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Acceptable Use Policy</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Platform Guideline SV-AUP-2026-v1</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              IDsvault facilitates matchmaking communications, seller ownership audits, and manual broker-assisted transfers for premium social usernames and digital identifiers. We support robust standards to insulate transaction workflows from unethical or illicit activities.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Strictly Prohibited Assets</h3>
            <p className="text-gray-400 pl-3 border-l-2 border-red-500/40 font-normal">
              Users are strictly forbidden from submitting requests, listing applications, or proposing bids on any identifier obtained via illicit means, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400 font-normal leading-relaxed">
              <li>Credential phishing, SIM-swapping, session hijacking, or malicious credential breaches.</li>
              <li>Cyberstalking, extortion, harassment campaigns, or coercive real-life threats directed toward previous account holders.</li>
              <li>Any identifier belonging to standard government administration agencies, military branches, emergency response systems, or public health structures.</li>
            </ul>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Speculation Boundaries</h3>
            <p className="font-normal text-gray-400">
              To protect off-market asset integrations, listed identifiers are publicly masked (e.g., @va***t) in our catalog. Direct communications bypass tactics to evade broker ledger checkpoints when a transaction has begun will result in administrative seller listing termination and complete quarantine of listings.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">3. Platform Abuse & Intellectual Complaints</h3>
            <p className="text-gray-400 font-normal">
              We reserve immediate listing removal rights for any profiles determined to contain fraudulent claims, stale assets, or coordinate bypass tricks.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-trademark" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/15">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Trademark & Patent Policies</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Policy Guideline SV-IP-2026-v2</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              IDsvault operates strictly as an independent third-party listing indexing portal, coordinate compliance auditor, and manual broker consultation desk. We maintain absolute respect for registered corporate brand titles, registered corporate entities, and trademark patents.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Trademark Audit & Quarantine Processes</h3>
            <p className="font-normal text-gray-400">
              Authorized legal representatives of corporate entities holding registered trademark certifications from recognized public registries can submit trademark infringement or IP complaint claims directly to our operations hub.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Submission Minimum Requirements</h3>
            <p className="text-gray-400 font-normal">
              All legal IP communications must be routed to <strong className="text-white">support@idsvault.com</strong> and contain the following certified coordinates:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400 font-mono text-[10.5px]">
              <li>Subject heading: [TRADEMARK AUDIT REQUEST - SV-LEDGER]</li>
              <li>Official registration certificate citation numbers.</li>
              <li>Direct electronic signature of patent counsel or authorized trademark representative.</li>
            </ul>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">3. Disposition Response Times</h3>
            <p className="text-gray-450 font-normal">
              Vetted infracting listings are quarantined from the public database index within twelve (12) business hours and held in administrative arbitration pending legal resolution or coordinate release.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-refund" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6 animate-in duration-200"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Refund & Escrow Payout Policy</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">SV-ESCROW-REVERSAL-2026-v2</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p className="text-gray-400">
              Clear financial rules build trust. This Refund & Escrow Policy outlines exactly when and how your funds move during broked deals.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">1. Exactly How Money Moves Step-by-Step</h3>
            <div className="pl-3 border-l border-[#D4AF37] space-y-2.5 text-gray-450">
              <p>
                <strong>Step 1: Buyer locks payment.</strong> The buyer transfers the agreed funds to our designated corporate banking trust account (via standard Indian UPI, IMPS, RTGS, NEFT, or global USDC). We verify the credit deposit.
              </p>
              <p>
                <strong>Step 2: Broker freezes the escrow hold.</strong> The funds sit frozen in our secured partner account. They are isolated from any company operating capital. We send a verified challenge alert to the seller to lock the handle.
              </p>
              <p>
                <strong>Step 3: Supervised Handover.</strong> Our broker leads a private call or secure chat. We guide the buyer to take control, update recover coordinates, clear out original fallback vectors, and set up 2FA parameters.
              </p>
              <p>
                <strong>Step 4: Buyer confirms & Funds Dispatch.</strong> Once the buyer confirms total control of credentials, our desk releases the payout. We credit the seller's registered bank coordinates immediately.
              </p>
            </div>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">2. Guaranteed 100% Refund Triggers</h3>
            <p className="text-gray-400">
              We issue a full, prompt refund of held balances within 24 business hours if any of these conditions are met:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>The seller cancels the trade, backs out, or goes unresponsive during verification audits.</li>
              <li>The seller fails the profile live Bio verification challenge.</li>
              <li>The host platform (Instagram, X, Telegram) locks, resets, or permanently freezes the credential during transition.</li>
            </ul>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">3. Post-Transfer Handover Policy</h3>
            <p className="text-gray-400 bg-red-500/[0.02] p-3 border border-red-500/10 rounded-lg">
              Once the buyer logs in live, overrides original email bindings, confirms custody under broker supervision, and signals release, the trade is finalized. At this point, the transaction is irreversible. IDsVault offers no post-swap survival warranties, as host platforms reserve the right to enforce terms at any future date.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">4. Payment Disputes Resolution</h3>
            <p className="text-gray-400">
              Since IDsvault holds the funds directly in our designated broker account, payment disputes do not require a third-party escrow provider's process. Contact <strong className="text-white font-mono">broker@idsvault.com</strong> with your deal reference. We hold all deal records — WhatsApp messages, call logs, transfer confirmations — and can resolve most disputes within 24 hours.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">5. Jurisdiction & Contact</h3>
            <p className="text-gray-400">
              All transactions are subject to legal mediation in <strong>Hyderabad, India</strong>. For any pending trade disputes, contact the Broker Lead directly at <strong className="text-white font-mono">broker@idsvault.com</strong>.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-terms" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6 animate-in duration-200"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/15">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Terms of Service</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">SV-PLAIN-TOS-2026-v1</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal font-sans">
            <p className="text-gray-400">
              By using IDsvault, applying to list social handles, or submitting buyer deposits, you agree to these clear rules in their entirety.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">1. Who Can Use This Platform</h3>
            <p className="text-gray-400">
              You must be at least 18 years old and have the complete legal capacity to enter binding contracts under Indian law (or the laws of your home jurisdiction) to buy or sell namespace identifiers with us.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">2. Listing Rules & Ownership Warranties</h3>
            <p className="text-gray-400">
              Sellers applying to index username assets must warrant full, legitimate authority to control and release the handle. Sellers are subject to cryptographic verification challenges (profile Bio bio-token updates) to verify ownership. Fake claims, stolen profiles, or coordinates bypass will trigger an immediate, lifelong platform ban.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">3. Prohibited Handle Assets</h3>
            <p className="text-gray-400">
              We strictly reject and ban the listing or purchase of:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-450">
              <li>Names registered as active corporate trademarks.</li>
              <li>Usernames mirroring public government agencies, military, or municipal divisions.</li>
              <li>Identifiers obtained through extortion, coordinate hacking, phishing, SIM swapping, or physical harassment threats.</li>
              <li>Names used solely for hate speech, violence, or brand impersonation scams.</li>
            </ul>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">4. Platform Terms of Service Disclaimer</h3>
            <div className="text-amber-500 bg-amber-500/[0.03] p-4 rounded-xl border border-amber-500/10 leading-relaxed">
              <strong>OFFICIAL DISCLAIMER:</strong> Social networks (Meta, Instagram, X Corp, and Telegram) technically prohibit the commercial transfer, leasing, or sale of usernames. They reserve the absolute right to reset, freeze, or terminate profiles at any time. Buyers assume this platform-level risk entirely. IDsvault is an independent, private brokerage desk. We are not affiliated with, endorsed by, or officially connected to Meta, X, or Telegram. All trademarks belong to their respective corporate IP holders.
            </div>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">5. Broker Fee Structure</h3>
            <p className="text-gray-400">
              We charge a standard <strong>10% brokerage commission fee</strong> on successful transactions. If customized sourcing campaigns fail or the transfer is unfinalized, no setup or hidden listing fees are charged.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">6. How payment works</h3>
            <p className="text-gray-400">
              Your payment goes to IDsvault's designated broker account — via UPI, bank transfer, Wise, SWIFT, or crypto (USDC/USDT). We hold the full amount, separate from our operating funds, until you confirm on the live call that you have full account access and have changed all credentials. Only then do we release payment to the seller. If the transfer fails at any step, you get a full refund — no third-party claim process needed, because we hold the funds directly.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">7. Jurisdiction & Dispute Resolution</h3>
            <p className="text-gray-400">
              These Terms are governed by the laws of India. Any legal dispute or mediation concerning our services is resolved exclusively under the jurisdiction of the courts in <strong>Hyderabad, Telangana, India</strong>.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-privacy" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6 animate-in duration-200"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/15">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Plain-English Privacy Policy</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">SV-CORE-PRIVACY-2026-v1</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p className="text-gray-405">
              We respect your privacy. Username deals require confidentiality. This plain-English policy explains exactly what we gather, how we store it, and when we remove it.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">1. Exactly What Data We Collect & Why</h3>
            <p className="text-gray-400">
              We collect the bare minimum required to safely verify ownership and complete secure currency disbursements:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-450 border-l border-blue-500/20 ml-2">
              <li><strong>Email Address:</strong> Primarily to send transactional contracts, receipt confirmations, and secure codes.</li>
              <li><strong>Phone / WhatsApp:</strong> Used for direct secure chat communication during live coordinate transfers.</li>
              <li><strong>Payment Reference Numbers:</strong> Standard transaction receipts or bank reference reference records to verify UPI/RTGS clearance.</li>
              <li><strong>Social Handle Traded:</strong> The specific username identifier under contract, necessary for ownership checks.</li>
            </ul>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">2. Storing Data & Secure Holdings</h3>
            <p className="text-gray-400">
              All client details are processed locally in secure-hashed offline vaults. No database indexes are shared with outside advertising or digital harvesting networks. Our escrow banking processes run through verified partner bank trusts in Hyderabad, India, compliant with national transaction frameworks.
            </p>

            <h3 className="font-bold text-white text-xs uppercase tracking-wider font-mono pt-2">3. Precise Retention & Fast Deletion</h3>
            <p className="text-gray-400">
              Our storage targets prioritize data pruning over generic data hoarding:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-450">
              <li>All transition logs, Bio tokens, and temporary files are permanently pruned within <strong>thirty (30) days</strong> of trade completion.</li>
              <li><strong>You can delete your data instantly at any time.</strong> Simply email <strong className="text-white font-mono">support@idsvault.com</strong> with your reference number. We will permanently purge all personal files and data from our active folders within 24 business hours.</li>
            </ul>
          </div>
        </motion.section>
      )}

      {segment === "policy-aml-kyc" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/15">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Anti-Money Laundering & KYC Policies</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Ref: SV-AML-KYC-2026</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              To maintain the integrity of our brokerage platform, IDsvault maintains risk mitigation standards including Identity Verification (KYC).
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Identity Verification Thresholds</h3>
            <p className="text-gray-400 font-normal">
              Identity verification (KYC) is strictly required for deals exceeding $1,000 USD (or equivalent INR). Users must provide a copy of government-issued photo identification (e.g. Aadhaar, PAN card, or passport) before entering deep broker-monitored transition phases.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Verification Compliance</h3>
            <p className="text-gray-400 font-normal">
              For all clients, we require identity verification at the thresholds above regardless of payment method. We reserve the absolute right to suspend transaction matching until identity claims are verified.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "faq" && (
        <section className="space-y-6">
          <header className="text-center space-y-2 pb-6 border-b border-white/[0.06]">
            <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 inline-block mb-1 border border-blue-500/20">
              <HelpCircle className="h-5 w-5" />
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Trust & Operations FAQ</h1>
            <p className="text-xs text-gray-400 max-w-sm mx-auto font-normal text-center">
              Answering key questions transparently to maintain absolute transactional trust without misleading official alignments.
            </p>
          </header>

          {/* Interactive Accordion elements */}
          <div className="space-y-3" id="faq_accordion_wrapper">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#0F0F10] border border-white/[0.08] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-white hover:bg-white/[0.01] cursor-pointer"
                  >
                    <span className="font-semibold tracking-tight">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/[0.04] bg-[#050505]/40 overflow-hidden"
                      >
                        <p className="p-5 text-xs text-gray-400 leading-relaxed font-normal">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
