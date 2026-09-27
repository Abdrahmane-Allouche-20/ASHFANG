import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a Cyngard engineer about managed SOC, penetration testing, PhishNode, LeakShield, or any security challenge.",
  alternates: { canonical: "/contact" },
};

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
