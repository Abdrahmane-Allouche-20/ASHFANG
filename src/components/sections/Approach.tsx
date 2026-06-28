import { APPROACH } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";

export default function Approach() {
  return (
    <section id="approach" className="relative scroll-mt-24 overflow-hidden px-6 py-20">
      <Parallax speed={0.22} className="pointer-events-none absolute inset-[-20%] z-0 bg-[radial-gradient(48%_42%_at_50%_15%,rgba(139,92,246,0.13),transparent_60%),radial-gradient(40%_40%_at_88%_72%,rgba(34,211,238,0.08),transparent_60%)]" />

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
              className="group grid grid-cols-[auto_1fr] items-start gap-5 rounded-2xl px-3 py-8 transition-colors duration-300 hover:bg-white/[0.03] sm:gap-10"
            >
              <span className="w-[3.5rem] select-none font-display text-5xl font-bold leading-none text-gradient opacity-35 transition-opacity duration-300 group-hover:opacity-100 sm:w-[6rem] sm:text-7xl">
                {a.step}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white sm:text-base">
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
