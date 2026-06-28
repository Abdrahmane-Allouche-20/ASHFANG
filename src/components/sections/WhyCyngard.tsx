import { WHY } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import Spotlight from "@/components/ui/Spotlight";

export default function WhyCyngard() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden border-y border-line/60 bg-ink/30 py-28">
      <Parallax speed={0.2} className="pointer-events-none absolute inset-[-20%] z-0 bg-[radial-gradient(45%_40%_at_10%_20%,rgba(139,92,246,0.12),transparent_60%),radial-gradient(40%_40%_at_95%_80%,rgba(34,211,238,0.07),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-cyan">// 02 — WHY CYNGARD</p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              The team that breaks it <span className="text-gradient">knows how to guard it.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              We&apos;re engineers first. That means no middlemen, no recycled reports, and no
              security theater — just people who understand exactly how attacks work, and how to stop them.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <Spotlight className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/40">
                  <div className="mb-4 font-mono text-2xl font-bold text-gradient opacity-50 transition-opacity duration-300 group-hover:opacity-100">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
