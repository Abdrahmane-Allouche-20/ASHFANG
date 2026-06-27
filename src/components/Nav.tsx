"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

// liquid-glass-react reads `navigator` at render → must be client-only
const LiquidGlass = dynamic(() => import("liquid-glass-react"), { ssr: false });

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-20">
      <LiquidGlass
        style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "auto" }}
        displacementScale={64}
        blurAmount={0.06}
        saturation={130}
        aberrationIntensity={2}
        elasticity={0.1}
        cornerRadius={28}
        padding="8px 14px"
      >
        <nav className="flex items-center gap-5 sm:gap-7">
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
                className="group relative text-sm text-white/70 transition-colors hover:text-white"
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
      </LiquidGlass>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel pointer-events-auto fixed inset-x-4 top-24 rounded-2xl p-5 md:hidden"
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
