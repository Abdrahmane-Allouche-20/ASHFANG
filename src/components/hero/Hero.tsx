"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Console from "./Console";
import { SITE } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const HEADLINE = [
  ["Think", "like", "an", "attacker."],
  ["Defend", "like", "an", "engineer."],
];
const ASSURANCES = ["Engineer-led", "Fixed scope", "Free retest"];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.93, 1]);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="hero-beam absolute inset-x-0 top-0 h-[760px]" />
      </div>

      <div className="container-page text-center">
        <a
          href="#contact"
          className="fade-up group inline-flex items-center gap-2.5 rounded-full border border-line bg-fill py-1 pl-1 pr-3.5 text-[13px] text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg"
          style={{ "--d": "0ms" } as CSSProperties}
        >
          <span className="rounded-full border border-[rgba(167,139,250,0.35)] bg-[rgba(139,92,246,0.18)] px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-violet-pale">
            FREE
          </span>
          Security assessment — no obligation
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>

        <h1 id="hero-title" className="heading-xl mx-auto mt-8 max-w-[15ch] sm:max-w-none">
          {HEADLINE.map((words, line) => (
            <span key={line} className="block">
              {words.map((w, i) => {
                const accent = i === words.length - 1;
                return (
                  <span key={w}>
                    <span
                      className={accent ? "word-in accent text-gradient" : "word-in"}
                      style={{ "--i": line * 4 + i } as CSSProperties}
                    >
                      {w}
                    </span>
                    {i < words.length - 1 && " "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p
          className="fade-up lede mx-auto mt-7 max-w-2xl sm:text-lg"
          style={{ "--d": "650ms" } as CSSProperties}
        >
          Offensive testing, defensive solutions, and secure development — built by engineers for
          companies that can&apos;t afford to get breached.
        </p>

        <div
          className="fade-up mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          style={{ "--d": "780ms" } as CSSProperties}
        >
          <a href="#contact" className="btn btn-primary btn-lg">
            Book a free assessment
            <ArrowRight size={16} className="btn-arrow" />
          </a>
          <a href="#services" className="btn btn-secondary btn-lg">
            Explore services
          </a>
        </div>

        <ul
          className="fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted"
          style={{ "--d": "900ms" } as CSSProperties}
        >
          {ASSURANCES.map((a) => (
            <li key={a} className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-cyan" strokeWidth={2.5} />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Product stage */}
      <div
        ref={stageRef}
        className="fade-up relative mt-14 sm:mt-20"
        style={{ perspective: 1800, "--d": "1000ms" } as CSSProperties}
      >
        <div aria-hidden className="planet" />
        <motion.div
          style={{ rotateX, scale, transformOrigin: "50% 0%" }}
          className="container-page relative z-10"
        >
          <Console />
        </motion.div>
      </div>

      <span className="sr-only">{SITE.description}</span>
    </section>
  );
}
