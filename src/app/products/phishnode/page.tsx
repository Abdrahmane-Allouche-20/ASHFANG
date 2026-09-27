import type { Metadata } from "next";
import { Check } from "lucide-react";
import CTABand from "@/components/layout/CTABand";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FeatureGrid, ProductHero, Section, StatStrip, Steps } from "@/components/products/Blocks";
import { PhishNodeConsole, PhishNodeMark } from "@/components/products/ProductVisuals";
import { PHISHNODE, PRODUCTS } from "@/lib/site";
import { pageMetadata, productSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const product = PRODUCTS.find((p) => p.slug === "phishnode")!;

export const metadata: Metadata = pageMetadata({
  title: "PhishNode — Phishing Triage Platform",
  description:
    "PhishNode by Cynguard: one-click phishing reporting, threat-intelligence enrichment, analyst verdicts, and automatic response for SOC teams and MSSPs.",
  path: "/products/phishnode",
  keywords: ["PhishNode", "phishing triage", "phishing reporting", "SOC platform", "report phishing button", "email threat analysis"],
});

export default function PhishNodePage() {
  return (
    <>
      <JsonLd data={productSchema(product, [...PHISHNODE.steps.map((x) => x.title), ...PHISHNODE.features.map((f) => f.title)])} />
        <ProductHero
          mark={<PhishNodeMark className="h-11 w-11" />}
          name="PhishNode"
          category={product.category}
          title={
            <>
              Every reported email, <span className="heading-dim">answered.</span>
            </>
          }
          lede="Employees report suspicious emails in one click, right from their inbox. PhishNode enriches every report with threat intelligence in seconds, puts it in front of an analyst, and closes the loop the moment a verdict is set."
          visual={<PhishNodeConsole />}
          site={product.url}
          demoHref="/contact?topic=PhishNode%20demo"
          crumbPath="/products/phishnode"
          secondary={{ label: "See how it works", href: "#how" }}
        />

        <StatStrip
          stats={[
            { value: "1 click", label: "To report, from the inbox" },
            { value: "Seconds", label: "To enrich every report" },
            { value: "EN · FR", label: "Branded replies to reporters" },
            { value: "Multi-tenant", label: "Isolated by design" },
          ]}
        />

        <Section id="how">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                From <span className="heading-dim">report</span> to response, automatically.
              </>
            }
            description="The gap between “an employee suspects a phishing email” and “security has acted on it” is where attackers win. PhishNode closes it end to end."
          />
          <Steps steps={PHISHNODE.steps} />
        </Section>

        <Section className="pt-0 md:pt-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Enrichment</p>
              <h2 className="heading-lg mt-5">
                Evidence first, <span className="heading-dim">verdict second.</span>
              </h2>
              <p className="lede mt-5 max-w-md">
                Every report fans out to multiple checks in parallel. Each is time-boxed and
                fail-safe, so a slow source never stalls triage — and analysts always see why.
              </p>
              <div className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Report from anywhere</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {PHISHNODE.channels.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="card divide-y divide-line">
                {PHISHNODE.checks.map((c, i) => (
                  <li key={c.name} className="flex gap-4 px-5 py-4 sm:px-6">
                    <span className="mt-0.5 font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[15px] font-medium text-fg">{c.name}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section className="pt-0 md:pt-0">
          <SectionHeading
            eyebrow="Platform"
            title={
              <>
                Built for security teams — <span className="heading-dim">and the MSSPs</span> that serve them.
              </>
            }
          />
          <FeatureGrid items={PHISHNODE.features} />
        </Section>

        <Section className="pt-0 md:pt-0">
          <SectionHeading
            eyebrow="Service tiers"
            title={
              <>
                Run it yourself, or <span className="heading-dim">let us run it.</span>
              </>
            }
            description="Choose the model that fits your team. Switch as you grow."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PHISHNODE.tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="flex">
                <article className="card relative w-full p-7 sm:p-9">
                  {i === 1 && <span className="edge-light" />}
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                    {i === 1 ? "Premium" : "Your SOC"}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.025em]">{t.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.text}</p>
                  <ul className="mt-6 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[14px] text-[#dcdce8]">
                        <Check size={14} className="shrink-0 text-cyan" strokeWidth={2.5} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        <CTABand
          title="See PhishNode in action."
          text="Book a walkthrough with our team. We'll show you the product and how it fits your environment."
          href="/contact?topic=PhishNode%20demo"
          label="Request a demo"
        />
    </>
  );
}
