import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import CTABand from "@/components/layout/CTABand";
import Products from "@/components/products/Products";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description: "PhishNode for phishing detection and triage, and LeakShield for secret and credential leak prevention — built by Cyngard.",
  alternates: { canonical: "/products" },
};

const PAIRINGS = [
  {
    product: "PhishNode",
    service: "Managed SOC",
    href: "/services/managed-soc",
    text: "Run PhishNode yourself, or let Cyngard analysts triage every report for you as part of our managed SOC.",
  },
  {
    product: "LeakShield",
    service: "Secure Code Review",
    href: "/services/secure-code-review",
    text: "Scan with LeakShield on your own machines, and bring in our engineers to review code and remediate what it finds.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Security software, <span className="heading-dim">built by practitioners.</span>
          </>
        }
        lede="Our products come out of real engagements. We built them to solve problems we kept seeing in the field — and they power the services we deliver every day."
      />
      <Products heading={false} />
      <section className="relative pb-8">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Products + services</p>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em]">
              Use them on your own, or with our team.
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PAIRINGS.map((p, i) => (
              <Reveal key={p.product} delay={i * 0.08} className="flex">
                <Link href={p.href} className="card group flex w-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold">
                      {p.product} <span className="text-subtle">+</span> {p.service}
                    </p>
                    <ArrowUpRight size={16} className="text-subtle transition-colors group-hover:text-fg" />
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="See our products in action." text="Book a walkthrough with our team — we'll tailor it to your environment." label="Request a demo" />
    </>
  );
}
