import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SpotlightGroup from "@/components/ui/SpotlightGroup";

/* Building blocks shared by the product pages. */

export function ProductHero({
  mark,
  name,
  category,
  title,
  lede,
  visual,
  secondary,
}: {
  mark: ReactNode;
  name: string;
  category: string;
  title: ReactNode;
  lede: string;
  visual: ReactNode;
  secondary: { label: string; href: string };
}) {
  return (
    <section id="top" aria-labelledby="product-title" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="hero-beam absolute inset-x-0 top-0 h-[760px]" />
      </div>
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <div className="fade-up flex items-center gap-3.5" style={{ "--d": "0ms" } as CSSProperties}>
            {mark}
            <div>
              <p className="font-display text-lg font-semibold tracking-[-0.02em]">{name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{category}</p>
            </div>
          </div>
          <h1 id="product-title" className="heading-xl fade-up mt-8 text-[clamp(2.6rem,1.2rem+4.6vw,4.75rem)]" style={{ "--d": "120ms" } as CSSProperties}>
            {title}
          </h1>
          <p className="fade-up lede mt-6 max-w-xl sm:text-lg" style={{ "--d": "260ms" } as CSSProperties}>
            {lede}
          </p>
          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "380ms" } as CSSProperties}>
            <a href="#contact" className="btn btn-primary btn-lg">
              Request a demo
              <ArrowRight size={16} className="btn-arrow" />
            </a>
            <a href={secondary.href} className="btn btn-secondary btn-lg">
              {secondary.label}
            </a>
          </div>
        </div>
        <div className="fade-up" style={{ "--d": "450ms" } as CSSProperties}>
          {visual}
        </div>
      </div>
    </section>
  );
}

export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section aria-label="At a glance" className="relative">
      <div className="container-page">
        <Reveal className="card grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "border-line px-3 py-8 text-center",
                ["border-r border-b lg:border-b-0", "border-b lg:border-b-0 lg:border-r", "border-r", ""][i],
              ].join(" ")}
            >
              <p className="font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.75rem)] font-semibold leading-none tracking-[-0.04em]">
                <span className="text-sheen">{s.value}</span>
              </p>
              <p className="mt-3 text-[13px] text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.08} className="card p-6 sm:p-7">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(167,139,250,0.5)] bg-[#161225] font-mono text-[12px] text-fg shadow-[0_0_20px_-6px_rgba(139,92,246,0.7)]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
          <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function FeatureGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <SpotlightGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 0.06} className="flex">
          <article data-spot className="card w-full min-w-0 p-6 sm:p-7">
            <span className="block h-px w-8 bg-[linear-gradient(90deg,#a78bfa,#22d3ee)]" />
            <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em]">{f.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{f.text}</p>
          </article>
        </Reveal>
      ))}
    </SpotlightGroup>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={["relative py-24 md:py-32", className].filter(Boolean).join(" ")}>
      <div className="container-page">{children}</div>
    </section>
  );
}
