import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import CTABand from "@/components/layout/CTABand";
import Principles from "@/components/home/Principles";
import Reveal from "@/components/ui/Reveal";
import Globe from "@/components/ui/Globe";
import Clocks from "@/components/sections/why/Clocks";
import JsonLd from "@/components/seo/JsonLd";
import { absolute, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Cyngard — International Cybersecurity Company",
  description:
    "Cyngard combines in-house security products with engineer-led services for clients across North America, Europe, Africa & the Middle East, and Asia-Pacific.",
  path: "/company",
});

const PILLARS = [
  {
    title: "We build",
    text: "PhishNode and LeakShield — platforms that catch phishing and data exposures before they become incidents.",
    href: "/products",
    link: "Our products",
  },
  {
    title: "We test",
    text: "Penetration testing, red teaming, and secure code review that show you exactly how an attacker would get in.",
    href: "/services#offensive",
    link: "Offensive security",
  },
  {
    title: "We protect",
    text: "Managed SOC, incident response, and monitoring that keep threats from turning into breaches.",
    href: "/services#defense",
    link: "Defense & operations",
  },
  {
    title: "We advise",
    text: "Cloud security, compliance, awareness, and secure development that build security into how you work.",
    href: "/services#advisory",
    link: "Engineering & advisory",
  },
];

export default function CompanyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "AboutPage",
          url: absolute("/company"),
          name: "About Cyngard",
          about: { "@id": `${absolute("/")}/#organization` },
        }}
      />
      <PageHeader
        crumbs={[{ name: "Company", path: "/company" }]}
        eyebrow="Company"
        title={
          <>
            About Cyngard. <span className="heading-dim">Think like an attacker, defend like an engineer.</span>
          </>
        }
        lede="Cyngard is an international cybersecurity company. We combine in-house security products with engineer-led services to help organizations find their weaknesses, watch for threats, and respond when it matters."
      />

      <section className="relative pb-16">
        <div className="container-page grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="flex">
              <div className="card flex w-full flex-col p-6 sm:p-7">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.025em]">{p.title}</h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.text}</p>
                <Link href={p.href} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-[13.5px] text-fg">
                  {p.link}
                  <ArrowUpRight size={14} className="text-violet-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Principles />

      <section aria-labelledby="global-title" className="relative py-24 md:py-32">
        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Global reach</p>
            <h2 id="global-title" className="heading-lg mt-5">
              International by design.
            </h2>
            <p className="lede mt-5 max-w-lg">
              We work with clients across North America, Europe, Africa and the Middle East, and
              Asia-Pacific — with fast, clear, timezone-aware communication and reporting in English
              and French.
            </p>
            <div className="card mt-10 p-6">
              <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-subtle">LOCAL TIME ACROSS OUR CLIENT REGIONS</p>
              <Clocks />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.3),transparent)] blur-2xl" />
            <Globe />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
