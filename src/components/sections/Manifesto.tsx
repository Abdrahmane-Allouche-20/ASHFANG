"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// *word* marks a serif accent.
const TEXT =
  "We break systems for a living — so we know exactly how to *defend* them. No middlemen, no recycled reports, no security theater. Just engineers who understand how attacks work, and how to *stop* them.";
const WORDS = TEXT.split(" ");

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  return (
    <section aria-label="Our principle" className="relative py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Our principle</p>
          <p
            ref={ref}
            className="mt-8 font-display text-[clamp(1.75rem,1rem+2.7vw,3.25rem)] font-medium leading-[1.16] tracking-[-0.032em] text-fg"
          >
            {WORDS.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / WORDS.length, (i + 1) / WORDS.length]}
                still={reduce}
              >
                {w}
              </Word>
            ))}
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-muted">
            <Image src="/brand/mark.png" alt="" width={240} height={316} className="h-6 w-auto" />
            <span>The Cyngard team</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const accent = children.startsWith("*");
  const [, word, rest] = accent ? (children.match(/^\*(.+)\*(.*)$/) ?? []) : [];

  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }}>
        {accent ? (
          <>
            <span className="accent text-gradient">{word}</span>
            {rest}
          </>
        ) : (
          children
        )}
      </motion.span>{" "}
    </>
  );
}
