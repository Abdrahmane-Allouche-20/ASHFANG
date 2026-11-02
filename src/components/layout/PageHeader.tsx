import type { CSSProperties, ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";

/** Top-of-page header for inner pages. */
export default function PageHeader({
  title,
  lede,
  children,
  crumbs,
  visual,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  crumbs?: Crumb[];
  visual?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pt-44 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div className="hero-beam absolute inset-x-0 top-0 h-[600px] opacity-70" />
      </div>
      <div className="container-page">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={visual ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-16" : undefined}>
          <div>
            <h1
              className="heading-xl fade-up max-w-4xl text-[clamp(2.5rem,1.3rem+4.2vw,4.5rem)] text-balance"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              {title}
            </h1>
            {lede && (
              <p className="lede fade-up mt-6 max-w-2xl sm:text-lg" style={{ "--d": "100ms" } as CSSProperties}>
                {lede}
              </p>
            )}
            {children && (
              <div className="fade-up mt-9" style={{ "--d": "200ms" } as CSSProperties}>
                {children}
              </div>
            )}
          </div>
          {visual && (
            <div className="fade-up flex justify-center" style={{ "--d": "180ms" } as CSSProperties}>
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
