import { FAQS, LEAKSHIELD, PHISHNODE, PRODUCTS, SERVICE_CATEGORIES, SERVICES, SITE, servicesIn } from "@/lib/site";
import { absolute } from "@/lib/seo";

/** Concise, link-rich site summary for AI assistants (llmstxt.org). */
export function llmsTxt() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} is an international cybersecurity company serving organizations across North America, Europe, Africa and the Middle East, and Asia-Pacific. Work is delivered by engineers, with fixed scopes and plain-language reporting in English and French. Contact: ${SITE.email}.`,
    "",
    "## Products",
    ...PRODUCTS.map((p) => `- [${p.name}](${absolute(p.href)}): ${p.category}. ${p.summary}${p.url ? ` Website: ${p.url}` : ""}`),
    "",
    ...SERVICE_CATEGORIES.flatMap((c) => [
      `## Services — ${c.name}`,
      ...servicesIn(c.id).map((s) => `- [${s.title}](${absolute(`/services/${s.slug}`)}): ${s.summary}`),
      "",
    ]),
    "## Company",
    `- [About ${SITE.name}](${absolute("/company")}): who we are, principles, and global reach`,
    `- [Contact](${absolute("/contact")}): talk to an engineer, request a product demo, or book a free assessment`,
    "",
    "## Optional",
    `- [Full details](${absolute("/llms-full.txt")}): every product and service in full`,
    `- [Privacy](${absolute("/privacy")})`,
  ];
  return lines.join("\n");
}

/** Everything an assistant needs to answer questions about Cyngard accurately. */
export function llmsFullTxt() {
  const out: string[] = [llmsTxt(), "", "---", ""];
  out.push("# PhishNode", "", PRODUCTS[0].summary, "", "## How it works");
  PHISHNODE.steps.forEach((s, i) => out.push(`${i + 1}. ${s.title}: ${s.text}`));
  out.push("", "## Checks on every report", ...PHISHNODE.checks.map((c) => `- ${c.name}: ${c.text}`));
  out.push("", "## Platform", ...PHISHNODE.features.map((f) => `- ${f.title}: ${f.text}`));
  out.push("", `Reporting channels: ${PHISHNODE.channels.join(", ")}.`);
  out.push("", "## Service tiers", ...PHISHNODE.tiers.map((t) => `- ${t.name}: ${t.text}`), "");

  out.push("# LeakShield", "", PRODUCTS[1].summary, "", "## How it works");
  LEAKSHIELD.steps.forEach((s, i) => out.push(`${i + 1}. ${s.title}: ${s.text}`));
  out.push("", "## What it watches", ...LEAKSHIELD.watches.map((w) => `- ${w.name}: ${w.text}`));
  out.push("", "## Platform", ...LEAKSHIELD.features.map((f) => `- ${f.title}: ${f.text}`), "");

  out.push("# Services", "");
  for (const s of SERVICES) {
    out.push(`## ${s.title}`, `URL: ${absolute(`/services/${s.slug}`)}`, "", s.intro, "", "Includes:");
    out.push(...s.includes.map((i) => `- ${i}`), "", "Deliverables:", ...s.deliverables.map((d) => `- ${d}`), "");
  }

  out.push("# Frequently asked questions", "");
  for (const f of FAQS) out.push(`## ${f.q}`, f.a, "");
  return out.join("\n");
}
