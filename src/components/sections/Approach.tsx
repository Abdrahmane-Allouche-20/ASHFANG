import { APPROACH } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function Approach() {
  return (
    <section id="approach" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">03 / How we work</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          A clear path to <span className="text-gradient">closed risk</span>
        </h2>
        <p className="mx-auto mt-4 text-muted">
          No black boxes. Every engagement follows the same disciplined, transparent loop.
        </p>
      </Reveal>

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-violet/10 via-violet/40 to-cyan/40 lg:block" />
        <div className="grid gap-8 lg:grid-cols-4">
          {APPROACH.map((a, i) => (
            <Reveal key={a.step} delay={i * 0.1} className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl glass-panel ring-gradient">
                <span className="font-display text-lg font-bold text-gradient">{a.step}</span>
              </div>
              <h3 className="font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
