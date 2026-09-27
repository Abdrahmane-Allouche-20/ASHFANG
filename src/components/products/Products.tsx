import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightGroup from "@/components/ui/SpotlightGroup";
import { LeakShieldMark, LeakShieldScan, PhishNodeFlow, PhishNodeMark } from "@/components/products/ProductVisuals";

export default function Products({ heading = true }: { heading?: boolean }) {
  return (
    <section id="products" aria-label="Products" className={heading ? "relative py-24 md:py-32" : "relative pb-20"}>
      <div className="container-page">
        {heading && (
        <SectionHeading
          id="products-title"
          eyebrow="Products"
          title={
            <>
              Our products. <span className="heading-dim">Built from the front line.</span>
            </>
          }
          description="We build the tools our own engineers rely on — and make them available to your team. They catch phishing and leaked secrets before they become incidents."
        />
        )}

        <SpotlightGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="flex">
              <article data-spot className="card flex w-full min-w-0 flex-col">
                <div className="relative h-[260px] overflow-hidden rounded-t-[inherit] border-b border-line bg-[radial-gradient(80%_70%_at_50%_100%,rgba(139,92,246,0.14),transparent_70%)]">
                  <div aria-hidden className="dot-grid absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />
                  <div aria-hidden className="relative flex h-full items-center">
                    {p.slug === "phishnode" ? (
                      <div className="w-full">
                        <PhishNodeFlow />
                      </div>
                    ) : (
                      <div className="w-full px-6">
                        <LeakShieldScan compact />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3.5">
                    {p.slug === "phishnode" ? <PhishNodeMark /> : <LeakShieldMark />}
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">{p.name}</h3>
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{p.category}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.0625rem] font-medium tracking-[-0.01em] text-fg">{p.tagline}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.summary}</p>
                  <ul className="mt-5 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-[14px] text-[#dcdce8]">
                        <Check size={14} className="shrink-0 text-cyan" strokeWidth={2.5} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                    <Link href={p.href} className="btn btn-secondary">
                      Explore {p.name}
                      <ArrowRight size={15} className="btn-arrow" />
                    </Link>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-fg"
                    >
                      {p.url.replace(/^https:\/\//, "")}
                      <ArrowUpRight size={14} className="text-violet-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
