import React, { useEffect, useRef, useState } from "react";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

interface TurnstileWidgetProps {
  onVerify: (token: string | null) => void;
  actionName?: string;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onVerify, actionName = "form_submission" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADUnYiTH-QihS0W1buI8_DcJ9_Q").trim();
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [tokenGenerated, setTokenGenerated] = useState<string | null>(null);

  useEffect(() => {
    let widgetId: string | null = null;
    let timer: any = null;

    const renderWidget = () => {
      if (typeof window !== "undefined" && (window as any).turnstile && containerRef.current) {
        try {
          // Clear any existing elements inside
          containerRef.current.innerHTML = "";
          
          widgetId = (window as any).turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: "dark",
            action: actionName,
            callback: (token: string) => {
              setTokenGenerated(token);
              onVerify(token);
            },
            "error-callback": () => {
              console.error("Turnstile verification error.");
              setErrorStatus(true);
              onVerify(null);
            },
            "expired-callback": () => {
              setTokenGenerated(null);
              onVerify(null);
            }
          });
        } catch (e) {
          console.error("Failed to render Cloudflare Turnstile widget:", e);
          setErrorStatus(true);
        }
      } else {
        // Retry polling in case script is still loading async
        timer = setTimeout(renderWidget, 500);
      }
    };

    renderWidget();

    return () => {
      if (timer) clearTimeout(timer);
      if (widgetId && typeof window !== "undefined" && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetId);
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [siteKey, actionName, onVerify]);

  return (
    <div className="my-4 p-3 rounded-lg bg-[#0F0F10] border border-white/[0.04] flex flex-col gap-2">
      <div className="flex items-center justify-between text-[10px] text-gray-400 select-none">
        <span className="flex items-center gap-1.5 text-blue-400 font-semibold font-mono">
          <Shield className="h-3.5 w-3.5" />
          Cloudflare Security Validation
        </span>
        <span className="font-mono text-[8.5px] text-gray-600">ID: SEC-PORTAL</span>
      </div>

      {errorStatus ? (
        <p className="text-[10px] text-red-400 flex items-center gap-1.5 font-mono">
          <ShieldAlert className="h-3.5 w-3.5" />
          Turnstile load failed. Verify keys or internet status.
        </p>
      ) : tokenGenerated ? (
        <div className="text-[9px] text-emerald-400 flex items-center justify-between font-mono bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
          <span className="flex items-center gap-1.25">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Anti-bot telemetry completed.
          </span>
          <span className="text-[8px] text-emerald-600">TOKEN SECURED</span>
        </div>
      ) : (
        <p className="text-[9.5px] text-gray-500 font-mono">
          Solve the security gate below to authorize submission:
        </p>
      )}

      {/* Target div for Cloudflare Turnstile */}
      <div 
        ref={containerRef} 
        className="flex justify-center min-h-[65px] transition-all bg-transparent my-1.5"
        id="cf_turnstile"
      />
    </div>
  );
};
