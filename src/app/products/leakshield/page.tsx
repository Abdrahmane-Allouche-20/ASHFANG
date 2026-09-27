import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CTABand from "@/components/layout/CTABand";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FeatureGrid, ProductHero, Section, StatStrip, Steps } from "@/components/products/Blocks";
import { LeakShieldFix, LeakShieldMark, LeakShieldScan } from "@/components/products/ProductVisuals";
import { LEAKSHIELD, PRODUCTS } from "@/lib/site";
import { cn } from "@/lib/cn";

const product = PRODUCTS.find((p) => p.slug === "leakshield")!;

export const metadata: Metadata = {
  title: "LeakShield — secret & credential leak prevention",
  description: product.summary,
  alternates: { canonical: "/products/leakshield" },
};

export default function LeakShieldPage() {
  return (
    <>
        <ProductHero
          mark={<LeakShieldMark className="h-11 w-11" />}
          name="LeakShield"
          category={product.category}
          title={
            <>
              Stop secrets <span className="heading-dim">before they leak.</span>
            </>
          }
          lede="API keys, bot tokens, and environment files have a way of ending up in the wrong place. LeakShield finds them in your projects — fully offline — scores the risk, and shows you exactly how to fix each one."
          visual={<LeakShieldScan />}
          site={product.url}
          demoHref="/contact?topic=LeakShield%20demo"
          secondary={{ label: "See what it detects", href: "#detects" }}
        />

        <StatStrip
          stats={[
            { value: "100%", label: "Offline — nothing leaves your machine" },
            { value: "10,000+", label: "Files per scan" },
            { value: "50+", label: "Languages supported" },
            { value: "0–100", label: "Risk score per project" },
          ]}
        />

        <Section id="how">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Your final line of defense, <span className="heading-dim">on your machine.</span>
              </>
            }
            description="Run it before every push, in CI, or as part of an audit. LeakShield turns a sprawling codebase into a short, prioritized list of fixes."
          />
          <Steps steps={LEAKSHIELD.steps} />
        </Section>

        <Section id="detects" className="pt-0 md:pt-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Detection</p>
              <h2 className="heading-lg mt-5">
                Finds what <span className="heading-dim">shouldn&apos;t be there.</span>
              </h2>
              <p className="lede mt-5 max-w-md">
                Known token formats, high-entropy strings, and sensitive files — each ranked by
                severity and paired with a concrete fix.
              </p>
              <ul className="card mt-8 divide-y divide-line">
                {LEAKSHIELD.detects.map((d) => (
                  <li key={d.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <span className="text-[14.5px] text-fg">{d.name}</span>
                    <span className={cn("sev", d.severity === "critical" ? "sev-critical" : "sev-high")}>
                      {d.severity}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="lg:pt-16">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Every finding, fixed</p>
              <LeakShieldFix />
            </Reveal>
          </div>
        </Section>

        <Section className="pt-0 md:pt-0">
          <SectionHeading
            eyebrow="Privacy first"
            title={
              <>
                Your code never <span className="heading-dim">leaves the room.</span>
              </>
            }
            description="Built for teams that can't send source code to someone else's cloud — from startups to regulated and air-gapped environments."
          />
          <FeatureGrid items={LEAKSHIELD.privacy} />
          <Reveal className="card mt-4 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="text-[15px] font-medium text-fg">Found something serious?</p>
              <p className="mt-1 text-[14px] text-muted">
                Our engineers help you rotate credentials, clean history, and harden your pipeline.
              </p>
            </div>
            <Link href="/#secure-code-review" className="btn btn-secondary shrink-0">
              Secure code review
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </Section>

        <CTABand
          title="See LeakShield in action."
          text="Book a walkthrough with our team. We'll show you the product and how it fits your environment."
          href="/contact?topic=LeakShield%20demo"
          label="Request a demo"
        />
    </>
  );
}
