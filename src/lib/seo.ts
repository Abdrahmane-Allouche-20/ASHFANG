import type { Metadata } from "next";
import { FAQS, PRODUCTS, SERVICES, SITE, SOCIALS, type Product, type Service } from "@/lib/site";

/** Absolute URL for a site path. */
export const absolute = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

const ORG_ID = `${SITE.url}/#organization`;

/** Consistent per-page metadata: title, description, canonical, and social cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  // Don't append the brand to titles that already carry it.
  const full = title.includes(SITE.name) ? title : `${title} · ${SITE.name}`;
  return {
    title: { absolute: full },
    description,
    keywords,
    alternates: { canonical: path },
    // Page-level openGraph replaces the parent's, so re-attach the share image.
    openGraph: { title: full, description, url: path, siteName: SITE.name, type: "website", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: full, description, images: ["/opengraph-image"] },
  };
}

export function organizationSchema() {
  const sameAs = [...SOCIALS.map((s) => s.href), ...PRODUCTS.map((p) => p.url)].filter(Boolean);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    logo: absolute("/brand/logo-full.png"),
    image: absolute("/opengraph-image"),
    slogan: SITE.tagline,
    description: SITE.description,
    areaServed: ["North America", "Europe", "Africa", "Middle East", "Asia-Pacific"],
    knowsAbout: [
      "Cybersecurity",
      "Managed SOC",
      "Penetration testing",
      "Red teaming",
      "Secure code review",
      "Incident response",
      "Phishing detection",
      "Data breach monitoring",
      "OSINT",
      "Cloud security",
      "ISO 27001",
      "NIST Cybersecurity Framework",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English", "French"],
      url: absolute("/contact"),
    },
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: absolute(`/services/${s.slug}`) },
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@type": "Service",
    "@id": `${absolute(`/services/${s.slug}`)}#service`,
    name: s.title,
    serviceType: s.title,
    description: `${s.summary} ${s.intro}`,
    url: absolute(`/services/${s.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} — what's included`,
      itemListElement: s.includes.map((it) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it } })),
    },
  };
}

export function productSchema(p: Product, featureList: string[]) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absolute(p.href)}#software`,
    name: p.name,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    description: p.summary,
    url: absolute(p.href),
    ...(p.url ? { sameAs: [p.url] } : {}),
    featureList,
    publisher: { "@id": ORG_ID },
    creator: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs = FAQS) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
