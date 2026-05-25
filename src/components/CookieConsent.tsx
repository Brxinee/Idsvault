/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Cookie / analytics consent banner — DPDPA 2023 compliant.
 * GA4 defaults to denied in index.html; this component upgrades consent
 * when the user explicitly clicks "Allow". Choice is stored in localStorage
 * as "cookie_consent" ("granted" | "denied"). Banner never shows again once
 * a choice is made.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cookie_consent";

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Delay slightly so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
    // If previously granted, re-apply so SPA reloads honour the choice
    if (stored === "granted" && typeof window.grantAnalyticsConsent === "function") {
      window.grantAnalyticsConsent();
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem(STORAGE_KEY, "granted");
    if (typeof window.grantAnalyticsConsent === "function") {
      window.grantAnalyticsConsent();
    }
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-16 md:bottom-6 left-0 right-0 z-[200] flex justify-center px-4 pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-lg bg-surface border border-white/[0.10] rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Icon */}
        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 shrink-0">
          <Cookie className="h-4 w-4 text-accent" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-xs font-semibold text-white">We use analytics cookies</p>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            We use Google Analytics to understand site usage. No advertising cookies.{" "}
            <Link to="/policy/cookie-policy" className="underline hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="h-8 px-3 rounded-lg text-[11px] font-semibold text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/[0.16] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAllow}
            className="h-8 px-3 rounded-lg text-[11px] font-bold text-canvas bg-accent hover:bg-accent-light transition-colors"
          >
            Allow
          </button>
          <button
            onClick={handleDecline}
            aria-label="Dismiss"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Extend Window so TypeScript knows about the function set in index.html
declare global {
  interface Window {
    grantAnalyticsConsent?: () => void;
    trackIDsVaultEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}
