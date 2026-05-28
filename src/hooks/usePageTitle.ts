/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

/**
 * Sets document.title for the current route.
 * react-helmet-async handles the canonical <title> tag;
 * this hook provides a lightweight fallback for components
 * that don't use the SEO wrapper.
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    if (!title) return;
    const prev = document.title;
    document.title = `${title} — IDsvault`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
