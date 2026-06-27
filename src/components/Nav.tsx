"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import clsx from "clsx";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.5, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={clsx(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6",
          scrolled ? "glass ring-gradient" : "bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt="Cyngard"
            width={36}
            height={36}
            className="h-9 w-9 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight">Cyngard</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted transition-colors hover:text-fg"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet to-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2 text-sm font-medium text-base transition-shadow hover:shadow-glow md:inline-flex"
        >
          Book assessment
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-fg md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute left-4 right-4 top-20 rounded-2xl p-5 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-2.5 text-center text-sm font-medium text-base"
            >
              Book assessment
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
