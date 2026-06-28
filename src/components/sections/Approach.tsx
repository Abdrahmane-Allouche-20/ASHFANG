import { APPROACH } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function Approach() {
  return (
    <section id="approach" className="relative scroll-mt-24 px-6 py-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(139,92,246,0.12),transparent_60%),radial-gradient(40%_40%_at_88%_70%,rgba(34,211,238,0.07),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Editorial, left-aligned header */}
        <Reveal className="mb-12 flex flex-col gap-5 border-b border-white/[0.08] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-cyan">// 03 — HOW WE WORK</p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              A clear path to <span className="text-gradient">closed risk.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
            No black boxes. Every engagement runs the same disciplined, transparent loop.
          </p>
        </Reveal>

        <div className="divide-y divide-white/[0.06]">
          {APPROACH.map((a, i) => (
            <Reveal
              key={a.step}
              delay={i * 0.08}
              className="group grid grid-cols-[3rem_1fr] items-start gap-4 rounded-2xl px-3 py-7 transition-colors duration-300 hover:bg-white/[0.025] sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <span className="select-none font-display text-5xl font-bold leading-none text-gradient opacity-25 transition-opacity duration-300 group-hover:opacity-100 sm:text-7xl">
                {a.step}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {a.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
