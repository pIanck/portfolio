"use client";

import { useEffect } from "react";

/**
 * Ensures the page starts at the top on initial load. Prevents the browser from
 * restoring a previous scroll position (e.g. to #experience) which can cause
 * the page to jump on load.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // Run again after paint so we override any hash-based scroll the browser may do.
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}
