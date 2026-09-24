import {
  Crosshair,
  MailWarning,
  ShieldAlert,
  Code2,
  Layout,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Cyngard",
  tagline: "Think like an attacker. Defend like an engineer.",
  description:
    "Cyngard is a cybersecurity company delivering offensive testing, defensive solutions, and secure development to organizations worldwide.",
  email: "cyngard.support@gmail.com",
  url: "https://cyngard.com",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Cyngard", href: "#why" },
  { label: "Approach", href: "#approach" },
  { label: "FAQ", href: "#faq" },
];

/** Add a profile URL to show the icon in the footer. Empty links are hidden. */
export const SOCIALS: { label: "LinkedIn" | "X" | "GitHub"; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "X", href: "" },
  { label: "GitHub", href: "" },
];

export type ServiceVisual = "attack-path" | "phishing" | "leaks" | "code" | "build";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  blurb: string;
  points: string[];
  accent: "violet" | "cyan";
  visual: ServiceVisual;
};

export const SERVICES: Service[] = [
  {
    id: "penetration-testing",
    icon: Crosshair,
    title: "Penetration Testing",
    blurb:
      "We attack your systems the way real adversaries do — then hand you the map to close every door.",
    points: ["Web, API & network", "OWASP / PTES methodology", "Actionable remediation report"],
    accent: "violet",
    visual: "attack-path",
  },
  {
    id: "phishing-protection",
    icon: MailWarning,
    title: "Email Phishing Protection",
    blurb:
      "Detect, triage, and neutralize phishing campaigns before they reach the people who'll click.",
    points: ["Real-time detection", "Analyst-grade triage", "Threat intelligence"],
    accent: "cyan",
    visual: "phishing",
  },
  {
    id: "breach-monitoring",
    icon: ShieldAlert,
    title: "Data Leak & Breach Monitoring",
    blurb:
      "Know the moment your credentials or data surface across the web, paste sites, and dark corners.",
    points: ["Continuous OSINT", "Instant exposure alerts", "Domain & email coverage"],
    accent: "violet",
    visual: "leaks",
  },
  {
    id: "secure-code-review",
    icon: Code2,
    title: "Secure Code Review",
    blurb:
      "Engineer-led audits that catch the vulnerabilities scanners miss — before they ship.",
    points: ["Manual + automated", "Logic & auth flaws", "Fix-first guidance"],
    accent: "cyan",
    visual: "code",
  },
  {
    id: "secure-development",
    icon: Layout,
    title: "Web & App Development",
    blurb:
      "Modern products built secure from the first commit, not patched after the breach.",
    points: ["Security by design", "Performance-obsessed", "Built by engineers"],
    accent: "violet",
    visual: "build",
  },
];

/** Extra depth for the featured service card (Penetration Testing). */
export const PENTEST_INCLUDES = [
  "Real-world attack simulation, not just automated scans",
  "Findings ranked by genuine business impact",
  "Clear, step-by-step remediation guidance",
  "A free retest once you've fixed the gaps",
];

export const FRAMEWORKS = [
  "OWASP",
  "MITRE ATT&CK",
  "PTES",
  "NIST CSF",
  "ISO 27001",
  "Zero Trust",
  "Threat Intelligence",
  "Red Teaming",
  "OSINT",
];

export const STATS = [
  { value: 100, suffix: "%", label: "Engineer-led delivery" },
  { value: 24, suffix: "/7", label: "Threat monitoring" },
  { value: 5, suffix: "", label: "Core security services" },
  { value: 0, suffix: " fluff", label: "Just results" },
];

export const APPROACH = [
  {
    step: "01",
    title: "Scope",
    text: "We define exactly what we test, deploy, or build — clear boundaries, no surprises.",
    deliverable: "Scope & rules of engagement",
  },
  {
    step: "02",
    title: "Execute",
    text: "Offensive testing, solution deployment, or secure development — done by engineers.",
    deliverable: "Validated findings with evidence",
  },
  {
    step: "03",
    title: "Report",
    text: "Plain-English findings with severity, impact, and a prioritized path to fix.",
    deliverable: "Prioritized remediation plan",
  },
  {
    step: "04",
    title: "Harden",
    text: "We remediate, retest, and verify — until the risk is genuinely closed.",
    deliverable: "Retest & verified closure",
  },
];

export const WHY = [
  {
    title: "Attacker mindset, defender discipline",
    text: "We break systems for a living, so we know exactly how to defend them. Offense and defense, under one roof.",
  },
  {
    title: "Engineer-led, end to end",
    text: "No account managers relaying messages. You work directly with the people writing the code and running the tests.",
  },
  {
    title: "Global & responsive",
    text: "Built for clients across the US, Europe, Asia, and Africa — fast, clear, timezone-aware communication.",
  },
  {
    title: "Clarity over jargon",
    text: "Fixed scope, transparent reporting, and remediation you can actually action. Security without the smoke.",
  },
];

/** Cities shown with live local time in the "Global & responsive" tile. */
export const CLOCKS = [
  { city: "New York", tz: "America/New_York" },
  { city: "London", tz: "Europe/London" },
  { city: "Algiers", tz: "Africa/Algiers" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "Singapore", tz: "Asia/Singapore" },
];

export const FAQS = [
  {
    q: "What does the free assessment include?",
    a: "A no-obligation first look at where you stand. We walk through what you're protecting, show you where you're exposed, and tell you exactly what to fix first — no sales runaround.",
  },
  {
    q: "Who actually does the work?",
    a: "Engineers. There are no account managers relaying messages — you work directly with the people writing the code and running the tests, from the first call to the final retest.",
  },
  {
    q: "What do we get at the end of a penetration test?",
    a: "A plain-English report with every finding ranked by severity and business impact, evidence for each issue, and a prioritized, step-by-step path to fix it. Once you've fixed the gaps, we retest for free.",
  },
  {
    q: "How do you define scope?",
    a: "Every engagement starts with a fixed scope: clear boundaries on what we test, deploy, or build. You know exactly what's covered before we begin — no surprises along the way.",
  },
  {
    q: "Can you help fix what you find?",
    a: "Yes. We remediate, retest, and verify until the risk is genuinely closed. And when you're building something new, our development team ships it secure from the first commit.",
  },
  {
    q: "Do you work with teams outside your region?",
    a: "Yes. We work with clients across the US, Europe, Asia, and Africa, with fast, clear, timezone-aware communication.",
  },
];
