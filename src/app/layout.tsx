import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { HEADQUARTERS, SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  // Only used by the optional .accent style, so keep it off the critical path.
  preload: false,
});

// Kept under ~160 characters so search results show it in full.
const META_DESCRIPTION =
  "Poland-based international cybersecurity company: managed SOC, penetration testing, code review, and incident response. Makers of PhishNode and LeakShield.";
const HOME_TITLE = `${SITE.name} — International Cybersecurity Company Based in ${HEADQUARTERS.country}`;

// Search-console ownership tokens, set in the deployment environment when available.
const verification: Metadata["verification"] = {
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: META_DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Cybersecurity",
  keywords: [
    "Ashfang",
    "cybersecurity company",
    `cybersecurity company ${HEADQUARTERS.country}`,
    `penetration testing ${HEADQUARTERS.country}`,
    "managed SOC",
    "penetration testing",
    "red teaming",
    "secure code review",
    "incident response",
    "phishing protection",
    "data breach monitoring",
    "OSINT monitoring",
    "PhishNode",
    "LeakShield",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: META_DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: META_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
  icons: {
    icon: "/logo without bg.png",
    shortcut: "/logo without bg.png",
  },
  verification,
  other: {
    "llms-txt": "/llms.txt",
    "geo.region": HEADQUARTERS.countryCode,
    "geo.placename": HEADQUARTERS.city ? `${HEADQUARTERS.city}, ${HEADQUARTERS.country}` : HEADQUARTERS.country,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
