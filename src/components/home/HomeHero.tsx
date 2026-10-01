import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Globe from "@/components/ui/Globe";

const REGIONS = ["North America", "Europe", "Africa & Middle East", "Asia-Pacific"];

export default function HomeHero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="hero-beam absolute inset-x-0 top-0 h-[760px]" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
        <div>
          <h1
            id="hero-title"
            className="heading-xl fade-up text-[clamp(2.6rem,1.1rem+4vw,4.35rem)]"
            style={{ "--d": "0ms" } as CSSProperties}
          >
            Cybersecurity for organizations that{" "}
            <span className="heading-dim">can&apos;t afford to get breached.</span>
          </h1>
          <p className="lede fade-up mt-7 max-w-xl sm:text-lg" style={{ "--d": "220ms" } as CSSProperties}>
            Cynguard builds security products — PhishNode and LeakShield — and delivers managed SOC,
            penetration testing, code review, and security engineering for clients around the world.
          </p>
          <div
            className="fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": "340ms" } as CSSProperties}
          >
            <Link href="/contact" className="btn btn-primary btn-lg">
              Talk to an expert
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <Link href="/services" className="btn btn-secondary btn-lg">
              Explore services
            </Link>
          </div>
        </div>

        <div className="fade-up relative mx-auto w-full max-w-[560px]" style={{ "--d": "300ms" } as CSSProperties}>
          <div aria-hidden className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.32),transparent)] blur-2xl" />
          <Globe />
          <ul className="absolute inset-x-0 bottom-2 flex flex-wrap justify-center gap-2">
            {REGIONS.map((r) => (
              <li key={r} className="chip glass border-line-strong text-[10.5px]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
