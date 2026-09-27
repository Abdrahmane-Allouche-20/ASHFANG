import type { Metadata } from "next";
import CTABand from "@/components/layout/CTABand";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FeatureGrid, ProductHero, Section, StatStrip, Steps } from "@/components/products/Blocks";
import { LeakShieldAlerts, LeakShieldExposure, LeakShieldMark } from "@/components/products/ProductVisuals";
import { LEAKSHIELD, PRODUCTS } from "@/lib/site";
import { pageMetadata, productSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const product = PRODUCTS.find((p) => p.slug === "leakshield")!;

export const metadata: Metadata = pageMetadata({
  title: "LeakShield — Breach & OSINT Monitoring",
  description:
    "LeakShield monitors paste sites, breach databases, and public sources for your domains and credentials, correlates assets with the NVD, and alerts in real time.",
  path: "/products/leakshield",
  keywords: ["LeakShield", "data breach monitoring", "OSINT monitoring", "leaked credentials", "dark web monitoring", "paste site monitoring", "NVD"],
});

export default function LeakShieldPage() {
  return (
    <>
      <JsonLd data={productSchema(product, LEAKSHIELD.features.map((f) => f.title))} />
      <ProductHero
        mark={<LeakShieldMark className="h-11 w-11" />}
        name="LeakShield"
        category={product.category}
        title={
          <>
            Know the moment <span className="heading-dim">your data is exposed.</span>
          </>
        }
        lede="LeakShield is an automated data-breach and OSINT monitoring platform. It watches public sources, paste sites, and breach databases for your domains, keywords, and credentials — and turns raw threat data into alerts your team can act on."
        visual={<LeakShieldAlerts />}
        site={product.url}
        demoHref="/contact?topic=LeakShield%20demo"
        crumbPath="/products/leakshield"
        secondary={{ label: "See how it works", href: "#how" }}
      />

      <StatStrip
        stats={[
          { value: "Continuous", label: "OSINT monitoring" },
          { value: "Real-time", label: "Exposure alerts" },
          { value: "NVD", label: "Vulnerability correlation" },
          { value: "One view", label: "Threats, history & asset health" },
        ]}
      />

      <Section id="how">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From raw threat data <span className="heading-dim">to action.</span>
            </>
          }
          description="LeakShield bridges the gap between noisy threat feeds and the decisions your team needs to make."
        />
        <Steps steps={LEAKSHIELD.steps} />
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Coverage</p>
            <h2 className="heading-lg mt-5">
              What LeakShield <span className="heading-dim">watches for you.</span>
            </h2>
            <ul className="card mt-8 divide-y divide-line">
              {LEAKSHIELD.watches.map((w) => (
                <li key={w.name} className="px-5 py-4">
                  <p className="text-[15px] font-medium text-fg">{w.name}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{w.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="lg:pt-16">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Every alert, actionable</p>
            <LeakShieldExposure />
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Engineered for <span className="heading-dim">continuous monitoring.</span>
            </>
          }
        />
        <FeatureGrid items={LEAKSHIELD.features} twoUp />
        <Reveal className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Under the hood</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LEAKSHIELD.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CTABand
        title="See LeakShield in action."
        text="Book a walkthrough with our team. We'll show you what LeakShield finds about your organization."
        href="/contact?topic=LeakShield%20demo"
        label="Request a demo"
      />
    </>
  );
}
