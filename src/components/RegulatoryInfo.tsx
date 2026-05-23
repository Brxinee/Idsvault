/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Scale, ShieldAlert, Sparkles, AlertTriangle, HelpCircle, FileText, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RegulatoryInfoProps {
  segment: "policy-acceptable" | "policy-trademark" | "policy-refund" | "policy-terms" | "policy-privacy" | "faq";
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
      a: "Our Bengaluru coordination desk operates extensive pre-listing verification audits. Sellers must resolve ownership bio hash or screenshot validations before any database approval is posted in our publicly searchable catalog index, eliminating anonymous speculation risks."
    },
    {
      q: "What if a transfer fails?",
      a: "If coordinate release fails validation checks or a coordinate is determined legacy-locked, the transaction is gracefully halted and cancelled. Held INR deposits are fully reversed and refunded back to the originating bank coordinate account within three (3) business hours."
    },
    {
      q: "Why pay IDsvault?",
      a: "Paying our supervised brokerage ensures absolute security. Our structured payment workflow acts as a complete protective shield, isolating intermediate funds securely. Capital is only released to the seller upon validated, manual buyer coordinate possession."
    },
    {
      q: "Are you affiliated with Instagram/X/Telegram?",
      a: "No. IDsvault is a strictly independent premium digital identity brokerage consultancy. We are NOT an official partner, associate, or affiliate of Meta, Instagram, X (Twitter), or Telegram, nor are we licensed by them. All trademarks belong to their respective owners."
    },
    {
      q: "How long do deals take?",
      a: "Standard brokered transfers resolve in 4 to 24 hours under the active manual supervision of our India-based coordination staff."
    },
    {
      q: "What if a seller is fake?",
      a: "All listed usernames are publicly masked. Direct bypass attempts are actively screened out. We check and confirm actual coordinate control before listing approval, completely mitigating fake listings before they are indexed."
    },
    {
      q: "Does IDsvault guarantee future access?",
      a: "No corporate consulting desk can guarantee future access or indefinitely override host platform regulations. We guarantee the safe execution of the immediate transaction handshake, but the post-transfer security is subject to platform Terms of Service policies, which prohibit identity transfers. Buyers acknowledge this host risk disclaimer before initiating deals."
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
              All legal IP communications must be routed to <strong className="text-white">desk@idsvault.com</strong> and contain the following certified coordinates:
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
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Refund & Reversal Terms</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Framework Guideline SV-REVERSAL-2026</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              Capital security is the fundamental hallmark of IDsvault. We operate a highly structured payment workflow to protect both parties during verification stages.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Failed Verification Reversals</h3>
            <p className="text-[#10B981] pl-3 border-l-2 border-emerald-500 font-normal bg-emerald-500/5 p-3 rounded-r-lg">
              If an assigned administrative coordinator determines that a social username transition cannot be executed securely—due to seller loss of custody, host platform technical blocking, or invalid creation coordinates, the buyer's held payments will be fully reversed to the original originating bank credit ledger within three (3) business hours, excluding standard network processing bank fees.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Final Handoff Completed Posture</h3>
            <p className="text-gray-400 font-normal">
              The transaction is finalized and marked COMPLETED when the buyer completes verification checks, configures secure recovery passwords/2FA factors, and confirms original administrative custody. Following completion, all transactions are final, irreversible, and non-refundable. IDsvault does not assume post-transfer risks.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-terms" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/15">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Terms of Service Agreement</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Document reference SV-TOS-2026-v3</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              Welcome to IDsvault. By using this browser application, submitting proposals, or interacting with our India-based coordination staff, you accept these terms in their entirety.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Legal Capacity Limit (18+ Requirement)</h3>
            <p className="text-gray-400 font-normal">
              You must be at least 18 years of age and possess full legal capacity to enter binding agreements in your jurisdiction to engage our broker desk, submit listings, or participate in structured deals.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Seller Ownership Warranty & Guarantees</h3>
            <p className="text-gray-400 font-normal">
              Sellers applying to index username assets must warrant full, legal, unencumbered ownership of the handle. Sellers assume full liability for fraudulent claims or coordinates bypass.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">3. Buyer Acknowledgement & Platform Risk Disclaimer</h3>
            <p className="text-gray-400 font-normal">
              Digital handle transfers violate the strictly defined user Terms of Service of social networks (Instagram, X, Telegram). Host platforms reserve immediate, absolute right to reset, freeze, or terminate profiles. Buyers engage coordinators entirely at their own risk. IDsvault offers zero post-transfer possession guarantees, nor does it guarantee future account survival.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">4. Independent Intermediary Role</h3>
            <p className="text-[#3B82F6] bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 leading-relaxed font-normal">
              <strong>NOTICE OF THIRD-PARTY POLICY:</strong> IDsvault is NOT an official financial bank, nor is it affiliated with Meta, Instagram, X Corp, or Telegram. We operate strictly as an independent premium digital brokerage helper desk.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">5. Liability Limitation & Fraud Policy</h3>
            <p className="text-gray-400 font-normal">
              IDsvault is not liable for indirect, incidental, or post-transfer network bans. Any malicious coordination bypass, coordinate fraud, or credit chargeback attempt triggers a complete blacklist and immediate report to legal authorities.
            </p>
          </div>
        </motion.section>
      )}

      {segment === "policy-privacy" && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-[#0F0F10] border border-white/[0.08] space-y-6"
        >
          <header className="flex items-center gap-3 border-b border-white/[0.06] pb-5">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/15">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Privacy Shield Policy</h1>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider font-bold">Ref: SV-PRIVACY-SHIELD-2026</p>
            </div>
          </header>

          <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-normal">
            <p>
              We prioritize isolation of client identities over generic data harvesting campaigns. Client credentials, WhatsApp codes, and coordinate profiles remain strictly localized.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">1. Encryption & Data Retention Limits</h3>
            <p className="text-gray-400 font-normal">
              Client details are stored under secure multi-layered hashes. Transaction data collected during active handshakes are permanently pruned from indexes within thirty (30) days of ticket resolution.
            </p>

            <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono pt-2">2. Analytics & Cookie Disclosure</h3>
            <p className="text-gray-400 font-normal">
              Our site implements Google Analytics (GA4) with anonymised IP tracking coordinates solely to measure general geographic browser volumes. We never collect login credentials, social profiles, or financial banking coordinate codes via cookies.
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
