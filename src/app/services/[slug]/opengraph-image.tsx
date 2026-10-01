import { SERVICE_CATEGORIES, SERVICES, SITE } from "@/lib/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${SITE.name} cybersecurity service`;
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug) ?? SERVICES[0];
  return renderOgImage({
    eyebrow: SERVICE_CATEGORIES.find((c) => c.id === service.category)?.name,
    title: service.title,
    text: service.summary,
  });
}
