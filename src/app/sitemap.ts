import type { MetadataRoute } from "next";
import { PRODUCTS, SERVICES } from "@/lib/site";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absolute(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/products", 0.9),
    ...PRODUCTS.map((p) => page(p.href, 0.9)),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/company", 0.7),
    page("/contact", 0.7),
    page("/privacy", 0.2, "yearly"),
  ];
}
