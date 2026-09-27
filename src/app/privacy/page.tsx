import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How the Cyngard website handles your information — no analytics, no trackers, and a contact form that never stores your data.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What this website collects",
    body: "This website does not use analytics, advertising trackers, or third-party cookies. Fonts are served from our own domain, so browsing the site does not send your data to font providers.",
  },
  {
    title: "Contact form",
    body: "Our contact form does not store anything on our servers. When you press Send, it opens your own email app with your message pre-filled; nothing is transmitted until you send that email yourself.",
  },
  {
    title: "Emails you send us",
    body: "We use the information in your email only to reply and to discuss the services or products you asked about. We do not sell or share it with third parties for marketing.",
  },
  {
    title: "Our products",
    body: "PhishNode and LeakShield each come with their own terms describing how they handle your data.",
  },
  {
    title: "Your rights",
    body: `You can ask us what information we hold about you, or ask us to delete it, at any time by writing to ${SITE.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Legal" title="Privacy" lede="A plain-language summary of how this website handles your information." />
      <section className="relative pb-24">
        <div className="container-page">
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {SECTIONS.map((s) => (
              <div key={s.title} className="py-7">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
