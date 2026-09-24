"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";
import { cn } from "@/lib/cn";

// Hairlines between cells: a 2×2 grid on small screens, one row on large.
const BORDERS = [
  "border-r border-b lg:border-b-0",
  "border-b lg:border-b-0 lg:border-r",
  "border-r",
  "",
];

function Stat({
  value,
  suffix,
  label,
  className,
}: {
  value: number;
  suffix: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 60px 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce || value === 0) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className={cn("border-line px-3 py-8 text-center sm:py-10", className)}>
      <p className="font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
        <span className="text-sheen">{n}</span>
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="mt-3 text-[13px] text-muted">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="card grid grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Stat key={s.label} {...s} className={BORDERS[i]} />
      ))}
    </div>
  );
}
