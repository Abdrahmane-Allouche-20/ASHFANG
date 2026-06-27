"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      {/* SVG displacement filter — pipes the backdrop through feDisplacementMap for a real liquid warp */}
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <filter id="cyngard-liquid" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.013" numOctaves={2} seed={7} result="turb" />
          <feGaussianBlur in="turb" stdDeviation={2.5} result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale={42} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1] }}
        className="liquid-nav pointer-events-auto px-4 py-2.5"
      >
        <nav className="relative z-10 flex items-center gap-5 sm:gap-7">
          <a href="#top" className="flex items-center gap-2.5">
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
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-white/75 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-1.5 text-sm font-medium text-[#07070b] transition-shadow hover:shadow-glow md:inline-flex"
          >
            Book assessment
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="text-white md:hidden"
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
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-center text-sm font-medium text-[#07070b]"
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
