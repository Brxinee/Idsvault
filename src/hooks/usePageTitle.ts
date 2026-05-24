/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

const BASE_TITLE = "IDsvault — Buy & Sell Premium Usernames | Instagram, X, Telegram";

/**
 * Updates document.title on mount and restores the base title on unmount.
 * Usage: usePageTitle("Browse Handles")  →  "Browse Handles — IDsvault"
 */
export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — IDsvault` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
