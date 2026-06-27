import { WHY } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function WhyCyngard() {
  return (
    <section id="why" className="relative scroll-mt-24 border-y border-line/60 bg-ink/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">02 / Why Cyngard</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              The team that breaks it <span className="text-gradient">knows how to guard it.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              We&apos;re engineers first. That means no middlemen, no recycled reports, and no
              security theater — just people who understand exactly how attacks work, and how to stop them.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-line/60 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal
                key={w.title}
                delay={i * 0.08}
                className="group bg-base p-7 transition-colors hover:bg-surface"
              >
                <div className="mb-4 font-mono text-sm text-violet-soft">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
