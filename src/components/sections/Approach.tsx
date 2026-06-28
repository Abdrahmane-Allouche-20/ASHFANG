import { APPROACH } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function Approach() {
  return (
    <section id="approach" className="relative scroll-mt-24 px-6 py-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_45%_at_50%_0%,rgba(139,92,246,0.12),transparent_60%),radial-gradient(40%_40%_at_85%_60%,rgba(34,211,238,0.07),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">03 / How we work</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            A clear path to <span className="text-gradient">closed risk</span>
          </h2>
          <p className="mx-auto mt-4 text-muted">
            No black boxes. Every engagement follows the same disciplined, transparent loop.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-violet/10 via-violet/40 to-cyan/40 lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal key={a.step} delay={i * 0.1} className="group relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl glass-panel ring-gradient transition-all duration-300 group-hover:-translate-y-1 group-hover:border-violet/50 group-hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.7)]">
                  <span className="font-display text-lg font-bold text-gradient">{a.step}</span>
                </div>
                <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
