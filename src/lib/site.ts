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
  { label: "Why us", href: "#why" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  points: string[];
  accent: "violet" | "cyan";
};

export const SERVICES: Service[] = [
  {
    icon: Crosshair,
    title: "Penetration Testing",
    blurb:
      "We attack your systems the way real adversaries do — then hand you the map to close every door.",
    points: ["Web, API & network", "OWASP / PTES methodology", "Actionable remediation report"],
    accent: "violet",
  },
  {
    icon: MailWarning,
    title: "Email Phishing Protection",
    blurb:
      "Detect, triage, and neutralize phishing campaigns before they reach the people who'll click.",
    points: ["Real-time detection", "Analyst-grade triage", "Threat intelligence"],
    accent: "cyan",
  },
  {
    icon: ShieldAlert,
    title: "Data Leak & Breach Monitoring",
    blurb:
      "Know the moment your credentials or data surface across the web, paste sites, and dark corners.",
    points: ["Continuous OSINT", "Instant exposure alerts", "Domain & email coverage"],
    accent: "violet",
  },
  {
    icon: Code2,
    title: "Secure Code Review",
    blurb:
      "Engineer-led audits that catch the vulnerabilities scanners miss — before they ship.",
    points: ["Manual + automated", "Logic & auth flaws", "Fix-first guidance"],
    accent: "cyan",
  },
  {
    icon: Layout,
    title: "Web & App Development",
    blurb:
      "Modern products built secure from the first commit, not patched after the breach.",
    points: ["Security by design", "Performance-obsessed", "Built by engineers"],
    accent: "violet",
  },
];

export const STATS = [
  { value: 100, suffix: "%", label: "Engineer-led delivery" },
  { value: 24, suffix: "/7", label: "Threat monitoring" },
  { value: 5, suffix: "", label: "Core security services" },
  { value: 0, suffix: " fluff", label: "Just results" },
];

export const APPROACH = [
  { step: "01", title: "Scope", text: "We define exactly what we test, deploy, or build — clear boundaries, no surprises." },
  { step: "02", title: "Execute", text: "Offensive testing, solution deployment, or secure development — done by engineers." },
  { step: "03", title: "Report", text: "Plain-English findings with severity, impact, and a prioritized path to fix." },
  { step: "04", title: "Harden", text: "We remediate, retest, and verify — until the risk is genuinely closed." },
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
