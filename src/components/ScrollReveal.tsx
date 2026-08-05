"use client";

import { useEffect } from "react";

// Unhides every [data-reveal] element as it enters the viewport. Kept as one
// document-level observer instead of per-component state so sections stay
// server-rendered — the markup ships complete and CSS handles the transition.
export default function ScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!nodes.length) return;

    // No IntersectionObserver (or reduced motion): show everything at once.
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully on screen so the motion
      // finishes as it settles into view rather than after.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
