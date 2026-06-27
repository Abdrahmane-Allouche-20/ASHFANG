"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-line/60 bg-ink/30 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-wider text-muted sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
