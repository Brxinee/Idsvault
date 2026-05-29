/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { buildWhatsAppHandoff, SUPPORT_EMAIL } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { usePageTitle } from "../hooks/usePageTitle";
import { SEO } from "./SEO";

export const ContactView: React.FC = () => {
  const navigate = useNavigate();
  usePageTitle("Contact Desk");
  const [inquiryType, setInquiryType] = useState("buy");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successHandoff, setSuccessHandoff] = useState<{ url: string; mailto: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !whatsapp.trim() || !message.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const topicMap: Record<string, string> = {
        buy: "Buy / Acquisition Enquiry",
        sell: "Sell / Listing Proposal",
        sourcing: "Off-Market Sourcing Request",
        legal: "Legal / IP Claim",
        general: "General Enquiry"
      };

      const customMsg = `Hi IDsvault, I'd like to discuss: ${topicMap[inquiryType] || "General enquiry"}.

Topic: ${topicMap[inquiryType]}
Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}
Message: ${message}`;

      const coords = buildWhatsAppHandoff(customMsg);

      setSuccessHandoff({
        url: coords.url,
        mailto: coords.mailto
      });
    }, 1200);
  };

  return (
    <>
    <SEO
      title="Contact Our Desk"
      description="Contact IDsvault's Hyderabad broker desk by email at broker@idsvault.com. We respond same day to buying and selling enquiries for Instagram, X, Telegram handles and domains."
      canonical="/contact"
    />
    <div className="max-w-4xl mx-auto px-6 py-12 text-left space-y-10">

      {/* Back button */}
      <div className="flex items-center justify-start select-none">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Left: Contact info cards */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">Hyderabad Desk</h1>
            <p className="text-xs text-muted leading-relaxed">
              Reach our desk via WhatsApp, email, or the form. We respond same day, Mon–Sat 09:30 AM – 8:30 PM IST.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-white/[0.06]">
              <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Office</p>
                <p className="text-xs text-white font-medium">Hyderabad, Telangana, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-white/[0.06]">
              <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Phone / WhatsApp</p>
                <a
                  href="tel:+919392974031"
                  className="text-xs text-white font-medium hover:text-blue-400 transition-colors"
                >
                  +91 93929 74031
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-white/[0.06]">
              <Mail className="h-5 w-5 text-[#10B981] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Email</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-xs text-white font-medium hover:text-blue-400 transition-colors"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-surface border border-white/[0.06]">
              <Clock className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest font-mono">Hours</p>
                <p className="text-xs text-white font-medium">Mon – Sat: 09:30 AM – 8:30 PM IST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="md:col-span-7">
          <div className="p-8 rounded-2xl bg-surface border border-white/[0.08]" id="contact_desktop_container">
            <h3 className="font-extrabold text-white text-lg tracking-tight mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Topic selector */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 font-mono">
                  Topic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "buy",      label: "Acquire" },
                    { id: "sell",     label: "List Asset" },
                    { id: "sourcing", label: "Sourcing" },
                    { id: "legal",    label: "Legal / IP" },
                    { id: "general",  label: "General" }
                  ].map((topic) => (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setInquiryType(topic.id)}
                      className={`py-2 px-3 rounded-lg text-[11px] font-medium border transition-colors select-none text-center cursor-pointer ${
                        inquiryType === topic.id
                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold"
                          : "bg-raised border-white/[0.04] text-gray-400 hover:border-white/10"
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@example.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 93929 74031"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-mono">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Handle names, platforms, budget, or anything else..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-raised border border-white/[0.08] text-white focus:border-blue-500/50 outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none active:scale-95 text-center"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>

      {/* Trust note */}
      <article className="p-4 rounded-xl bg-blue-500/[0.012] border border-blue-500/10 text-xs text-gray-400 flex items-start gap-3 select-none leading-relaxed">
        <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
        <p>
          All enquiries are handled confidentially by Jogdhande Nikhil Patil (Lead Broker & Grievance Officer). We do not share your contact details with third parties.
        </p>
      </article>

      {/* Success Modal */}
      <AnimatePresence>
        {successHandoff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-8 rounded-2xl bg-surface border border-white/[0.12] max-w-md w-full text-center space-y-6 text-white block"
              id="contact_success_modal"
            >
              <div className="h-12 w-12 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-xl text-white tracking-tight">Ready to Send</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal text-center">
                  Open WhatsApp to deliver your message, or use the email link below if you prefer.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={successHandoff.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
                  onClick={() => setSuccessHandoff(null)}
                >
                  <MessageSquare className="h-4 w-4 text-white" />
                  Open WhatsApp
                </a>
                <a
                  href={successHandoff.mailto}
                  className="text-gray-400 hover:text-white text-[10px] underline tracking-widest uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer font-extrabold text-center"
                  onClick={() => setSuccessHandoff(null)}
                >
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  Send via Email Instead
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
