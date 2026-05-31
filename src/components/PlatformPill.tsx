/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Instagram, Twitter, Send, Globe, type LucideIcon } from "lucide-react";
import { Platform } from "../types";

/**
 * Single source of truth for platform → lucide brand icon + display label.
 * Mirrors the design-system prototype: mono micro-label pills, muted ink,
 * raised fill, razor-thin border. No emoji, lucide icons only.
 */
interface PlatformMeta {
  icon: LucideIcon;
  label: string;
}

export const platformMeta: Record<string, PlatformMeta> = {
  [Platform.Instagram]: { icon: Instagram, label: "Instagram" },
  [Platform.X]:         { icon: Twitter,   label: "X" },
  [Platform.Telegram]:  { icon: Send,      label: "Telegram" },
  [Platform.Brandable]: { icon: Globe,     label: "Domain" },
};

export function getPlatformMeta(platform: string): PlatformMeta {
  return platformMeta[platform] ?? { icon: Globe, label: platform };
}

interface PlatformPillProps {
  platform: string;
  className?: string;
}

/** Mono uppercase platform pill — raised fill, 1px border, muted ink. */
export const PlatformPill: React.FC<PlatformPillProps> = ({ platform, className = "" }) => {
  const { icon: Icon, label } = getPlatformMeta(platform);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-raised border border-[#26262B] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted ${className}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};
