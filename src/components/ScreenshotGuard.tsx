/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";

/**
 * Best-effort capture protection.
 *
 * Adds the `capture-armed` class to <html> when the page loses focus or
 * visibility (which many desktop screenshot and screen-recording tools
 * trigger as they steal focus), or when the PrintScreen key is pressed.
 * While armed, any element marked `.screenshot-private` collapses to a solid
 * black block via CSS (see src/index.css). Focus/visibility returning removes
 * the class and restores the content.
 *
 * Hard limitation: OS/hardware screenshots on mobile (power+volume) and native
 * snip tools that do NOT steal browser focus cannot be detected or blocked by
 * any web page. This is a browser security boundary, not a bug. Printing and
 * "Save as PDF" are covered separately by an @media print rule.
 */
export function ScreenshotGuard(): null {
  useEffect(() => {
    const root = document.documentElement;
    let restoreTimer: number | undefined;

    const arm = () => {
      if (restoreTimer) {
        window.clearTimeout(restoreTimer);
        restoreTimer = undefined;
      }
      root.classList.add("capture-armed");
    };
    const disarm = () => root.classList.remove("capture-armed");

    const onVisibility = () => (document.hidden ? arm() : disarm());
    const onBlur = () => arm();
    const onFocus = () => disarm();

    const onKey = (e: KeyboardEvent) => {
      // PrintScreen on desktop — arm briefly and neutralise the clipboard grab.
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        arm();
        try {
          navigator.clipboard?.writeText("");
        } catch {
          /* clipboard write may be blocked — ignore */
        }
        restoreTimer = window.setTimeout(disarm, 1200);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    window.addEventListener("keyup", onKey);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("keyup", onKey);
      if (restoreTimer) window.clearTimeout(restoreTimer);
    };
  }, []);

  return null;
}
