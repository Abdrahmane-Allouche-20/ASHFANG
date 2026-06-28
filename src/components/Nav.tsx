"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1] }}
        className="liquid-nav pointer-events-auto py-2.5 pl-3 pr-2.5"
      >
        <nav className="relative z-10 flex items-center gap-4 sm:gap-6">
          <a href="#top" className="flex items-center gap-2.5 pr-1">
            <Image
              src="/brand/logo-mark.png"
              alt="Cyngard"
              width={30}
              height={30}
              className="h-7 w-7 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              priority
            />
            <span className="font-display text-base font-bold tracking-tight text-white">Cyngard</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group relative text-sm transition-colors duration-300",
                    isActive ? "text-white" : "text-white hover:text-white",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-violet to-cyan transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-1.5 text-sm font-medium text-[#07070b] shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition-shadow duration-300 hover:shadow-glow md:inline-flex"
          >
            Book assessment
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="ml-1 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel pointer-events-auto fixed inset-x-4 top-20 rounded-2xl p-5 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active === l.href ? "bg-white/[0.06] text-fg" : "text-muted hover:bg-white/[0.04] hover:text-fg",
                  )}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-center text-sm font-medium text-[#07070b]"
              >
                Book assessment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
