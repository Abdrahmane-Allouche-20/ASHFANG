import { WHY } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Stats from "@/components/sections/why/Stats";

/** Why Cyngard — plain principles plus key numbers. */
export default function Principles() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow="Why Cyngard"
          title={
            <>
              The team that breaks it <span className="heading-dim">knows how to guard it.</span>
            </>
          }
          description="We're engineers first: no middlemen, no recycled reports, no security theater."
        />
        <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08} className="flex gap-5 border-t border-line py-7">
              <span className="font-mono text-[12px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{w.title}</h3>
                <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-muted">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Stats />
        </Reveal>
      </div>
    </section>
  );
}
