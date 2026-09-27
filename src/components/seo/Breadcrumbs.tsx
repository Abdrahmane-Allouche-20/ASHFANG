import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-subtle">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-muted">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-fg">
                    {c.name}
                  </Link>
                )}
                {!last && <ChevronRight size={12} aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
