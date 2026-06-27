"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/site";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* 3D scene */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Scene />
      </motion.div>

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid" />
      <div className="pointer-events-none absolute -top-1/3 left-1/2 z-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 z-0 h-[400px] w-[400px] rounded-full bg-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-base/10 via-transparent to-base" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-muted"
        >
          <ShieldCheck size={14} className="text-cyan" />
          CYBERSECURITY · ENGINEERED
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.5, 0.3, 1] }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Security that thinks <br className="hidden sm:block" />
          like <span className="text-gradient-anim">an attacker.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg"
        >
          Offensive testing, defensive solutions, and secure development — built by engineers
          for companies that can&apos;t afford to get breached.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#contact" variant="primary">
            Book a free assessment <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton href="#services" variant="ghost">
            Explore our services
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={22} />
      </motion.div>

      <span className="sr-only">{SITE.description}</span>
    </section>
  );
}
