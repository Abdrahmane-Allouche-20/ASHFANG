import type { CSSProperties, ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";

/** Top-of-page header for inner pages. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
  crumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="hero-beam absolute inset-x-0 top-0 h-[600px] opacity-70" />
      </div>
      <div className="container-page">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="eyebrow fade-up" style={{ "--d": "0ms" } as CSSProperties}>
          {eyebrow}
        </p>
        <h1
          className="heading-xl fade-up mt-6 max-w-4xl text-[clamp(2.5rem,1.3rem+4.2vw,4.5rem)] text-balance"
          style={{ "--d": "100ms" } as CSSProperties}
        >
          {title}
        </h1>
        {lede && (
          <p className="lede fade-up mt-6 max-w-2xl sm:text-lg" style={{ "--d": "200ms" } as CSSProperties}>
            {lede}
          </p>
        )}
        {children && (
          <div className="fade-up mt-9" style={{ "--d": "300ms" } as CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
