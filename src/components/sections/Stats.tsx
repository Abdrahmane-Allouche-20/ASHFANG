"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value, replay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setReplay((r) => r + 1)}
      className="group cursor-default rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.03]"
    >
      <div className="font-display text-4xl font-bold tracking-tight text-gradient transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
        {n}
        {suffix}
      </div>
      <p className="mt-2 text-xs uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-fg/80 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-line/60 bg-ink/30 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}
