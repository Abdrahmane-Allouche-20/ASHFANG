import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RadialGlowButton from "@/components/vendor/radial-glow-button";

export default function CTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal className="ring-gradient relative overflow-hidden rounded-3xl glass-panel px-8 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan/15 blur-[120px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Find your weak points <span className="text-gradient">before attackers do.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Book a free, no-obligation security assessment. We&apos;ll show you where you stand —
            and exactly what to fix first.
          </p>
          <div className="mt-9 flex justify-center">
            <RadialGlowButton href="#contact">
              <span className="inline-flex items-center gap-2">
                Get started <ArrowRight size={16} />
              </span>
            </RadialGlowButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
