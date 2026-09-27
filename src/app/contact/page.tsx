import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Cynguard — Talk to a Security Engineer",
  description:
    "Contact Cynguard about managed SOC, penetration testing, PhishNode, LeakShield, or any security challenge. Free, no-obligation assessments.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const { topic } = await searchParams;
  const defaultTopic = typeof topic === "string" ? topic : undefined;
  return (
    <>
      <Contact key={defaultTopic} defaultTopic={defaultTopic} />
      <FAQ />
    </>
  );
}
