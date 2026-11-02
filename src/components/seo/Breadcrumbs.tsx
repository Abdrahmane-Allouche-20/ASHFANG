import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export type Crumb = { name: string; path: string };

/**
 * The page's place in the site as BreadcrumbList structured data, so search
 * results can show "Ashfang › Services › …". Nothing is rendered on the page.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, ...items])} />;
}
