import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, SERVICE_CATEGORIES, servicesIn } from "@/lib/site";
import PageHeader from "@/components/layout/PageHeader";
import CTABand from "@/components/layout/CTABand";
import Reveal from "@/components/ui/Reveal";
import SpotlightGroup from "@/components/ui/SpotlightGroup";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cybersecurity Services — Managed SOC & Pentesting",
  description:
    "Managed SOC, penetration testing, red teaming, code review, incident response, breach monitoring, cloud security, and compliance — by Cynguard engineers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={
          <>
            Security services, <span className="heading-dim">delivered by engineers.</span>
          </>
        }
        lede="From finding weaknesses to watching your environment and responding when it matters — one team, fixed scopes, and reporting your leadership can act on."
      />

      {SERVICE_CATEGORIES.map((c, ci) => (
        <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="relative py-14 md:py-16">
          <div className="container-page">
            <Reveal className="mb-8 grid grid-cols-1 gap-3 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 id={`${c.id}-title`} className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">
                  {c.name}
                </h2>
              </div>
              <p className="text-[15.5px] leading-relaxed text-muted lg:justify-self-end lg:text-right">{c.blurb}</p>
            </Reveal>
            <SpotlightGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {servicesIn(c.id).map((s, i) => {
                const Icon = s.icon;
                const product = PRODUCTS.find((p) => p.slug === s.product);
                return (
                  <Reveal key={s.slug} delay={(i % 3) * 0.06} className="flex">
                    <Link
                      href={`/services/${s.slug}`}
                      data-spot
                      className="card group flex w-full min-w-0 flex-col p-6 sm:p-7"
                    >
                      <div className="flex items-center justify-between">
                        <span className="icon-chip" data-accent={i % 2 ? "cyan" : undefined}>
                          <Icon size={16} />
                        </span>
                        <ArrowUpRight
                          size={17}
                          className="text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                        />
                      </div>
                      <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{s.summary}</p>
                      {product && (
                        <p className="mt-auto pt-5 text-[12.5px] text-subtle">
                          Delivered with <span className="text-[#d6d6e2]">{product.name}</span>
                        </p>
                      )}
                    </Link>
                  </Reveal>
                );
              })}
            </SpotlightGroup>
          </div>
        </section>
      ))}

      <CTABand
        title="Not sure where to start?"
        text="Book a free, no-obligation assessment. We'll show you where you stand and what to fix first."
        label="Book a free assessment"
      />
    </>
  );
}
