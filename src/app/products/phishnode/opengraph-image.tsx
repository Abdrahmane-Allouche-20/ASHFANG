import { PRODUCTS, SITE } from "@/lib/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

const product = PRODUCTS.find((p) => p.slug === "phishnode")!;

export const alt = `${product.name} by ${SITE.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: product.category, title: product.name, text: product.tagline });
}
