"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

let instance: Lenis | null = null;

/** The active Lenis instance (null when the visitor prefers reduced motion). */
export function getLenis() {
  return instance;
}

/** Distance from the top of the document, unaffected by CSS transforms. */
function pageTop(el: HTMLElement) {
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    y += node.offsetTop;
  }
  return y;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = prefersReduced
      ? null
      : new Lenis({
          lerp: 0.12, // frame-rate-independent follow — smooth but responsive (not floaty)
          wheelMultiplier: 1.1,
          smoothWheel: true,
          touchMultiplier: 2,
        });
    instance = lenis;

    let raf = 0;
    if (lenis) {
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // In-page anchors: glide to the target, then move focus there so keyboard
    // and screen-reader users land in the right place too.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      e.preventDefault();
      const toTop = hash === "#top";
      if (lenis) {
        // Resolve the destination from layout (ignoring in-flight reveal
        // transforms), honouring scroll-margin-top like native anchors do.
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        lenis.scrollTo(toTop ? 0 : pageTop(target) - margin, { force: true, duration: 1.1 });
      } else {
        target.scrollIntoView({ block: "start" });
      }
      history.replaceState(null, "", toTop ? window.location.pathname : hash);

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      instance = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
