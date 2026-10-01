import type { Metadata } from "next";
import { FAQS, HEADQUARTERS, PRODUCTS, SERVICES, SITE, SOCIALS, type Faq, type Product, type Service } from "@/lib/site";

/** Absolute URL for a site path. */
export const absolute = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

const ORG_ID = `${SITE.url}/#organization`;

/** Consistent per-page metadata: title, description, canonical, and social cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Share image for this page; defaults to the site-wide card. */
  image?: string;
}): Metadata {
  // Don't append the brand to titles that already carry it.
  const full = title.includes(SITE.name) ? title : `${title} · ${SITE.name}`;
  return {
    title: { absolute: full },
    description,
    keywords,
    alternates: { canonical: path },
    // Page-level openGraph replaces the parent's, so re-attach the share image.
    openGraph: { title: full, description, url: path, siteName: SITE.name, type: "website", locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: full, description, images: [image] },
  };
}

/** Headquarters as a schema.org PostalAddress. */
function headquartersAddress() {
  return {
    "@type": "PostalAddress",
    addressCountry: HEADQUARTERS.countryCode,
    ...(HEADQUARTERS.city ? { addressLocality: HEADQUARTERS.city } : {}),
  };
}

export function organizationSchema() {
  // sameAs lists profiles of this organization only; product sites live on each product.
  const sameAs = SOCIALS.map((s) => s.href).filter(Boolean);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    email: SITE.email,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: absolute("/brand/icon-square-512.png"),
      width: 512,
      height: 512,
      caption: SITE.name,
    },
    image: absolute("/opengraph-image"),
    slogan: SITE.tagline,
    description: SITE.description,
    address: headquartersAddress(),
    location: { "@type": "Place", name: `${SITE.name} headquarters`, address: headquartersAddress() },
    areaServed: [
      { "@type": "Country", name: HEADQUARTERS.country },
      "Europe",
      "North America",
      "Africa",
      "Middle East",
      "Asia-Pacific",
    ],
    knowsLanguage: ["en", "fr"],
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
    makesOffer: [
      ...PRODUCTS.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "SoftwareApplication", "@id": `${absolute(p.href)}#software`, name: p.name, url: absolute(p.href) },
      })),
      ...SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": `${absolute(`/services/${s.slug}`)}#service`, name: s.title, url: absolute(`/services/${s.slug}`) },
      })),
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.alternateNames,
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
    areaServed: [{ "@type": "Country", name: HEADQUARTERS.country }, "Worldwide"],
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

export function faqSchema(faqs: Faq[] = FAQS) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function contactPageSchema() {
  return {
    "@type": "ContactPage",
    "@id": `${absolute("/contact")}#webpage`,
    url: absolute("/contact"),
    name: `Contact ${SITE.name}`,
    about: { "@id": ORG_ID },
    isPartOf: { "@id": `${SITE.url}/#website` },
  };
}
