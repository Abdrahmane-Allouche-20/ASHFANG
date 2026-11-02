"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import { APPROACH } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Approach() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(APPROACH.length, Math.floor(v * APPROACH.length + 0.35)));
  });

  const lit = reduce ? APPROACH.length : reached;

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="approach-title"
          title={
            <>
              A clear path to <span className="heading-dim">closed risk.</span>
            </>
          }
          description="No black boxes. Every engagement runs the same disciplined, transparent loop — and you always know which step we're on."
        />

        <div ref={trackRef} className="relative">
          {/* Progress rail: vertical on mobile, horizontal on desktop */}
          <div aria-hidden className="absolute bottom-6 left-[1.19rem] top-6 w-px bg-line lg:hidden">
            <motion.div
              style={{ scaleY: reduce ? 1 : progress }}
              className="h-full w-full origin-top bg-[linear-gradient(180deg,#db0210,#c0c0c0)]"
            />
          </div>
          <div aria-hidden className="absolute left-[1.19rem] right-8 top-[1.19rem] hidden h-px bg-line lg:block">
            <motion.div
              style={{ scaleX: reduce ? 1 : progress }}
              className="h-full w-full origin-left bg-[linear-gradient(90deg,#db0210,#c0c0c0)]"
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-5">
            {APPROACH.map((a, i) => {
              const on = i < lit;
              return (
                <Reveal as="li" key={a.step} delay={i * 0.08} className="relative pl-14 lg:pl-0">
                  <span
                    className={cn(
                      "absolute left-0 top-0 flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full border font-mono text-[12px] transition-all duration-500 lg:relative",
                      on
                        ? "border-[rgba(219,2,16,0.6)] bg-[#1a0507] text-fg shadow-[0_0_24px_-4px_rgba(219,2,16,0.7)]"
                        : "border-line-strong bg-base text-subtle",
                    )}
                  >
                    {a.step}
                  </span>
                  <div className="lg:mt-7 lg:pr-4">
                    <h3 className="pt-1.5 font-display text-2xl font-semibold tracking-[-0.025em] lg:pt-0">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.text}</p>
                    <p
                      className={cn(
                        "mt-5 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12.5px] transition-colors duration-500",
                        on
                          ? "border-[rgba(192,192,192,0.25)] bg-[rgba(192,192,192,0.06)] text-[#c0c0c0]"
                          : "border-line bg-fill text-muted",
                      )}
                    >
                      <FileCheck2 size={14} className={on ? "text-cyan" : "text-subtle"} />
                      {a.deliverable}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
