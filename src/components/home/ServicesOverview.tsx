import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES, servicesIn } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightGroup from "@/components/ui/SpotlightGroup";

export default function ServicesOverview() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={
            <>
              One partner for your security. <span className="heading-dim">End to end.</span>
            </>
          }
          description="Offense, defense, and engineering — the coverage most organizations stitch together from several vendors, delivered by one accountable team."
        />

        <SpotlightGroup className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08} className="flex">
              <article data-spot className="card flex w-full min-w-0 flex-col p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em]">{c.name}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{c.blurb}</p>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {servicesIn(c.id).map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex items-center gap-3 py-3 text-[14.5px] text-[#dcdce8] transition-colors hover:text-fg"
                        >
                          <Icon size={16} className="shrink-0 text-violet-soft" />
                          <span className="flex-1">{s.title}</span>
                          <ArrowUpRight
                            size={15}
                            className="text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </SpotlightGroup>

        <Reveal className="mt-8 flex justify-center">
          <Link href="/services" className="btn btn-secondary">
            View all services
            <ArrowRight size={15} className="btn-arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
