import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, FileCheck2 } from "lucide-react";
import { APPROACH, PRODUCTS, SERVICE_CATEGORIES, SERVICES } from "@/lib/site";
import PageHeader from "@/components/layout/PageHeader";
import CTABand from "@/components/layout/CTABand";
import Reveal from "@/components/ui/Reveal";
import { LeakShieldMark, PhishNodeMark } from "@/components/products/ProductVisuals";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata, serviceSchema } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} Services`,
    description:
      service.summary.length < 110 ? `${service.summary} Delivered by Cynguard engineers, worldwide.` : service.summary,
    path: `/services/${service.slug}`,
    keywords: [service.title, `${service.title} services`, `${service.title} company`, "Cynguard"],
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const category = SERVICE_CATEGORIES.find((c) => c.id === service.category)!;
  const product = PRODUCTS.find((p) => p.slug === service.product);
  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug);
  const Icon = service.icon;
  const contactHref = `/contact?topic=${encodeURIComponent(service.title)}`;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <PageHeader
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        eyebrow={category.name}
        title={
          <span className="inline-flex flex-col gap-5">
            <span className="icon-chip h-12 w-12 rounded-2xl">
              <Icon size={22} />
            </span>
            {service.title}
          </span>
        }
        lede={service.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={contactHref} className="btn btn-primary btn-lg">
            Discuss your project
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
          <Link href="/services" className="btn btn-secondary btn-lg">
            All services
          </Link>
        </div>
      </PageHeader>

      <section className="relative pb-8">
        <div className="container-page grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal className="card p-7 sm:p-9">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">What&apos;s included</h2>
            <ul className="mt-6 space-y-3.5">
              {service.includes.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[15px] leading-snug text-[#dcdce8]">
                  <span className="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[rgba(34,211,238,0.12)] text-cyan">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="card p-7 sm:p-9">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">What you receive</h2>
            <ul className="mt-6 space-y-3.5">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] leading-snug text-[#dcdce8]">
                  <FileCheck2 size={17} className="mt-px shrink-0 text-violet-soft" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {product && (
        <section className="relative py-8">
          <div className="container-page">
            <Reveal className="card flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div className="flex items-start gap-4">
                {product.slug === "phishnode" ? <PhishNodeMark className="h-11 w-11" /> : <LeakShieldMark className="h-11 w-11" />}
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Delivered with</p>
                  <p className="mt-1 font-display text-xl font-semibold tracking-[-0.02em]">{product.name}</p>
                  <p className="mt-1.5 max-w-xl text-[14.5px] text-muted">{product.tagline} {product.summary}</p>
                </div>
              </div>
              <Link href={product.href} className="btn btn-secondary shrink-0">
                About {product.name}
                <ArrowUpRight size={15} />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
              Every engagement follows the same disciplined loop.
            </h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((a, i) => (
              <Reveal as="li" key={a.step} delay={i * 0.06} className="border-t border-line pt-5">
                <p className="font-mono text-[12px] text-subtle">{a.step}</p>
                <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative py-8">
          <div className="container-page">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                More in {category.name}
              </p>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Reveal key={r.slug} className="flex">
                  <Link href={`/services/${r.slug}`} className="card group flex w-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-semibold">{r.title}</h3>
                      <ArrowUpRight size={16} className="text-subtle transition-colors group-hover:text-fg" />
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{r.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand title={`Talk to us about ${service.title}.`} href={contactHref} label="Discuss your project" />
    </>
  );
}
