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

    // Safety net: content hidden by CSS must never depend solely on an
    // observer callback arriving. If anything already in view is still hidden
    // shortly after mount, show it.
    const fallback = window.setTimeout(() => {
      for (const node of nodes) {
        if (node.hasAttribute("data-revealed")) continue;
        const { top, bottom } = node.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) {
          node.setAttribute("data-revealed", "");
          observer.unobserve(node);
        }
      }
    }, 1200);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return null;
}
