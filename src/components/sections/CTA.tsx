import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section aria-labelledby="cta-title" className="relative py-16 md:py-24">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[1.75rem] border border-line-strong bg-[linear-gradient(180deg,#110f1d,#09090f)] px-6 py-20 text-center sm:px-12 md:py-28">
          <span className="edge-light" />
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,#000_20%,transparent_75%)]" />
            <div className="absolute left-1/2 top-[38%] h-[520px] w-[820px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(139,92,246,0.32),rgba(34,211,238,0.08)_60%,transparent)]" />
          </div>

          {/* Shield with sonar rings */}
          <div aria-hidden className="relative mx-auto flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[rgba(167,139,250,0.35)] [animation:radar_3.2s_ease-out_infinite]" />
            <span className="absolute inset-0 rounded-full border border-[rgba(103,232,249,0.3)] [animation:radar_3.2s_ease-out_1.6s_infinite]" />
            <span className="absolute inset-2 rounded-full border border-line-strong bg-[radial-gradient(closest-side,rgba(139,92,246,0.25),rgba(12,12,20,0.9))]" />
            <Image
              src="/brand/mark.png"
              alt=""
              width={240}
              height={316}
              className="relative h-14 w-auto drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]"
            />
          </div>

          <h2 id="cta-title" className="heading-lg mx-auto mt-10 max-w-3xl">
            Find your weak points <span className="accent text-gradient">before attackers do.</span>
          </h2>
          <p className="lede mx-auto mt-5 max-w-xl">
            Book a free, no-obligation security assessment. We&apos;ll show you where you stand — and
            exactly what to fix first.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn-primary btn-lg">
              Book a free assessment
              <ArrowRight size={16} className="btn-arrow" />
            </a>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary btn-lg">
              <Mail size={16} />
              Email an engineer
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
