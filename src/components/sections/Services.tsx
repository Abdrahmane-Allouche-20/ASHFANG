import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PENTEST_INCLUDES, SERVICES, type Service } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightGroup from "@/components/ui/SpotlightGroup";
import ServiceVisualArt from "@/components/sections/services/Visuals";
import { cn } from "@/lib/cn";

const LAYOUT = [
  "md:col-span-2 lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title={
            <>
              Full-spectrum <span className="accent text-gradient">security,</span> one accountable
              team.
            </>
          }
          description="Offense, defense, and secure engineering — the coverage most companies stitch together from three vendors, delivered by one."
        />

        <SpotlightGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08} className={cn("flex", LAYOUT[i])}>
              {i === 0 ? <FeatureCard service={s} /> : <ServiceCard service={s} index={i} />}
            </Reveal>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}

function FeatureCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article id={service.id} data-spot className="card grid w-full min-w-0 scroll-mt-28 grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="icon-chip">
            <Icon size={17} />
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-subtle">01 · FLAGSHIP</span>
        </div>
        <h3 className="mt-6 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{service.blurb}</p>

        <ul className="mt-6 space-y-3">
          {PENTEST_INCLUDES.map((it) => (
            <li key={it} className="flex items-start gap-3 text-[14px] leading-snug text-[#dcdce8]">
              <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[rgba(34,211,238,0.12)] text-cyan">
                <Check size={11} strokeWidth={3} />
              </span>
              {it}
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-2 pt-8">
          {service.points.map((p) => (
            <li key={p} className="chip">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[300px] overflow-hidden rounded-b-[inherit] border-t border-line bg-[radial-gradient(70%_60%_at_60%_40%,rgba(139,92,246,0.12),transparent_70%)] md:rounded-bl-none md:rounded-r-[inherit] md:border-l md:border-t-0">
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div aria-hidden className="relative flex h-full items-center">
          <ServiceVisualArt kind={service.visual} />
        </div>
      </div>
    </article>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article id={service.id} data-spot className="card flex w-full min-w-0 scroll-mt-28 flex-col">
      <div className="relative h-[212px] overflow-hidden rounded-t-[inherit] border-b border-line bg-[radial-gradient(80%_70%_at_50%_100%,rgba(139,92,246,0.12),transparent_70%)]">
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
        <div aria-hidden className="relative h-full">
          <ServiceVisualArt kind={service.visual} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="icon-chip" data-accent={service.accent}>
            <Icon size={16} />
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{service.title}</h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{service.blurb}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {service.points.map((p) => (
            <li key={p} className="chip">
              {p}
            </li>
          ))}
        </ul>
        {service.product && (
          <Link
            href={service.product.href}
            className="group mt-5 inline-flex items-center gap-1.5 self-start text-[13px] text-muted transition-colors hover:text-fg"
          >
            Powered by <span className="font-medium text-fg">{service.product.name}</span>
            <ArrowUpRight size={14} className="text-violet-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
