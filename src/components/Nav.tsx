"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/components/SmoothScroll";
import Logo from "@/components/ui/Logo";

const MOBILE_LINKS = [...NAV_LINKS, { label: "Contact", href: "#contact" }];

/**
 * `base` prefixes the home-page section links — "" on the home page,
 * "/" on other pages so the links lead back to the right section.
 */
export default function Nav({ base = "" }: { base?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Condense the bar into a floating glass pill once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link for the section currently in view.
  useEffect(() => {
    if (base) return;
    const ids = ["top", ...MOBILE_LINKS.map((l) => l.href.slice(1))];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [base]);

  const unlock = useCallback(() => {
    document.documentElement.style.removeProperty("overflow");
    document.querySelectorAll("main, footer").forEach((el) => el.removeAttribute("inert"));
    getLenis()?.start();
  }, []);

  // Closing unlocks scrolling synchronously so a tapped anchor can scroll right away.
  const close = useCallback(() => {
    setOpen(false);
    unlock();
  }, [unlock]);

  // Mobile menu: lock the page behind it, close on Escape or when widening.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    document.querySelectorAll("main, footer").forEach((el) => el.setAttribute("inert", ""));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onWide = () => mq.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
      unlock();
    };
  }, [open, close, unlock]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        data-scrolled={scrolled || open}
        className="nav-shell relative z-10 mx-auto grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]"
      >
        <a href={base || "#top"} aria-label="Cyngard — home" className="justify-self-start rounded-full">
          <Logo priority />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={base + l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3 py-1.5 text-[0.84rem] transition-colors duration-300 lg:px-3.5",
                      isActive || hovered === l.href ? "text-fg" : "text-muted",
                    )}
                  >
                    {l.label}
                  </a>
                  {hovered === l.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-fill-strong"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <a href="#contact" className="btn btn-primary btn-sm hidden md:inline-flex">
            Book assessment
            <ArrowRight size={15} className="btn-arrow" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative -mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-fg md:hidden"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-premium",
                open ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-premium",
                open ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[rgba(7,7,11,0.94)] backdrop-blur-xl"
              onClick={close}
              aria-hidden
            />
            <nav aria-label="Mobile" className="relative flex h-full flex-col px-6 pb-10 pt-28">
              <ul>
                {MOBILE_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href === "#contact" ? l.href : base + l.href}
                      onClick={close}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-5 text-[1.75rem] font-medium tracking-tight",
                        active === l.href ? "text-fg" : "text-muted",
                      )}
                    >
                      {l.label}
                      <ArrowUpRight size={20} className="text-subtle" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-auto space-y-5"
              >
                <a href="#contact" onClick={close} className="btn btn-primary btn-lg w-full">
                  Book a free assessment
                  <ArrowRight size={16} className="btn-arrow" />
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="block text-center font-mono text-sm text-muted"
                >
                  {SITE.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
