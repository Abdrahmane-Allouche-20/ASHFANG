import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

export default function CTABand({
  title = "Let's talk about your security.",
  text = "Tell us what you're protecting. An engineer — not a salesperson — will reply with a clear next step.",
  href = "/contact",
  label = "Talk to an expert",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[1.5rem] border border-line-strong bg-[linear-gradient(180deg,#110f1d,#09090f)] px-6 py-14 sm:px-12 md:flex md:items-center md:justify-between md:gap-10 md:py-16">
          <span className="edge-light" />
          <div aria-hidden className="absolute -right-24 top-1/2 -z-10 h-[420px] w-[520px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)]" />
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em]">
              {title}
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{text}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <Link href={href} className="btn btn-primary btn-lg">
              {label}
              <ArrowRight size={16} className="btn-arrow" />
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-secondary btn-lg">
              <Mail size={16} />
              Email us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
