"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { SERVICES, type Service } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { cn } from "@/lib/cn";

// Asymmetric bento spans (12-col grid). First card is the feature, spans 2 rows.
const SPANS = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-6",
  "lg:col-span-6",
];

// Rich content for the feature card (Penetration Testing).
const FEATURE = {
  why: "Every system has a way in. We think and move like a real adversary — across your web apps, APIs, and internal network — then hand you the exact map to close every door before someone else walks through it.",
  includes: [
    "Real-world attack simulation, not just automated scans",
    "Findings ranked by genuine business impact",
    "Clear, step-by-step remediation guidance",
    "A free retest once you've fixed the gaps",
  ],
  stat: { value: "9 / 10", label: "breaches start with a gap a pentest would have caught" },
};

function ServiceCard({
  service,
  index,
  span,
  feature,
}: {
  service: Service;
  index: number;
  span: string;
  feature: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(440px circle at ${px}% ${py}%, rgba(139,92,246,0.15), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width) * 100);
    py.set(((e.clientY - r.top) / r.height) * 100);
  };

  const Icon = service.icon;
  const accent = service.accent === "violet" ? "text-violet" : "text-cyan";

  return (
    <Reveal delay={index * 0.12} className={cn("group relative", span)}>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-500 hover:border-violet/40"
      >
        <motion.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* HUD corner brackets */}
        <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-white/15 transition-colors duration-500 group-hover:border-cyan/70" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/15 transition-colors duration-500 group-hover:border-violet/70" />
        {/* ghost numeral */}
        <span className="pointer-events-none absolute right-5 top-4 select-none font-mono text-5xl font-bold leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-white/[0.08]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative flex h-full flex-col">
          <Icon
            size={feature ? 30 : 22}
            className={cn(accent, "mb-5 drop-shadow-[0_0_14px_rgba(139,92,246,0.5)]")}
          />
          <h3
            className={cn(
              "font-display font-semibold tracking-tight",
              feature ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {service.title}
          </h3>
          <p className={cn("mt-3 leading-relaxed text-muted", feature ? "max-w-lg text-base" : "text-sm")}>
            {service.blurb}
          </p>

          {feature && (
            <>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg/65">{FEATURE.why}</p>

              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {FEATURE.includes.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-fg/85">
                    <Check size={15} className="mt-0.5 shrink-0 text-cyan" />
                    {it}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-baseline gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
                <span className="font-display text-2xl font-bold text-gradient">{FEATURE.stat.value}</span>
                <span className="text-xs leading-snug text-muted">{FEATURE.stat.label}</span>
              </div>
            </>
          )}

          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {service.points.map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-fg/65 transition-colors group-hover:border-white/15 group-hover:text-fg/85"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden px-6 py-24">
      <Parallax speed={0.22} className="pointer-events-none absolute inset-[-20%] z-0 bg-[radial-gradient(50%_40%_at_18%_18%,rgba(139,92,246,0.14),transparent_60%),radial-gradient(42%_42%_at_90%_60%,rgba(34,211,238,0.09),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-5 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-cyan">// 01 — WHAT WE DO</p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Full-spectrum <span className="text-gradient">security.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
            Offense, defense, and secure engineering — the coverage most companies stitch from three
            vendors, delivered by one.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:auto-rows-fr lg:grid-cols-12">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} span={SPANS[i]} feature={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
