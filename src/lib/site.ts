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
    "Cyngard is an international cybersecurity company. We build security platforms — PhishNode and LeakShield — and deliver offensive testing, defensive solutions, and secure development to organizations worldwide.",
  email: "cyngard.support@gmail.com",
  url: "https://cyngard.com",
};

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
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
  /** In-house platform that powers this service. */
  product?: { name: string; href: string };
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
    product: { name: "PhishNode", href: "/products/phishnode" },
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
    product: { name: "LeakShield", href: "/products/leakshield" },
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
  { value: 2, suffix: "", label: "In-house security platforms" },
  { value: 5, suffix: "", label: "Core security services" },
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
    q: "What are PhishNode and LeakShield?",
    a: "Our two in-house platforms. PhishNode turns every suspicious email your employees report into an enriched, analyst-confirmed verdict. LeakShield finds exposed API keys, tokens, and secret files in your code — fully offline — and shows you how to fix each one.",
  },
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

/* ---------- Products ---------- */

export type Product = {
  slug: "phishnode" | "leakshield";
  name: string;
  href: string;
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  accent: "violet" | "cyan";
};

export const PRODUCTS: Product[] = [
  {
    slug: "phishnode",
    name: "PhishNode",
    href: "/products/phishnode",
    category: "Phishing detection & triage",
    tagline: "Every reported email, analyzed and answered.",
    summary:
      "Employees report suspicious emails in one click from their inbox. PhishNode enriches every report with threat intelligence, puts it in front of an analyst, and closes the loop the moment a verdict is set.",
    highlights: ["One-click reporting", "Threat-intel enrichment in seconds", "Multi-tenant SOC platform"],
    accent: "cyan",
  },
  {
    slug: "leakshield",
    name: "LeakShield",
    href: "/products/leakshield",
    category: "Secret & credential leak prevention",
    tagline: "Stop secrets before they leak.",
    summary:
      "LeakShield scans your projects for exposed API keys, bot tokens, and environment files — 100% offline — scores the risk, and shows you exactly how to fix each finding.",
    highlights: ["100% offline scanning", "Risk scoring 0–100", "Guided, code-level fixes"],
    accent: "violet",
  },
];

export const PHISHNODE = {
  steps: [
    {
      title: "Report",
      text: "An employee clicks Report right inside their inbox — browser extension or Gmail add-on. No portal, no password, no training. Headers and attachments are captured intact.",
    },
    {
      title: "Enrich",
      text: "In seconds, every URL, domain, IP, and attachment hash is checked against threat-intelligence feeds in parallel, with an optional AI read of the message's intent.",
    },
    {
      title: "Decide",
      text: "Analysts work one clear queue. They open a report, review the evidence side by side with the raw source, and set the verdict. The AI advises; people decide.",
    },
    {
      title: "Respond",
      text: "The moment a verdict is set, the reporter gets a branded reply, severe cases escalate to the security manager, the SIEM receives a signed webhook, and the audit log records it.",
    },
  ],
  checks: [
    { name: "Header authentication", text: "SPF, DKIM and DMARC results for every reported message." },
    { name: "URL & domain reputation", text: "Every link and referenced domain checked against multiple reputation feeds." },
    { name: "IP reputation", text: "The originating IP scored against abuse databases." },
    { name: "Malware hashes", text: "Attachment SHA-256s looked up against a shared malware corpus." },
    { name: "Safe-browsing signals", text: "Live social-engineering and unwanted-software flags." },
    { name: "IOC matching", text: "Your own indicators plus global community feeds, matched automatically." },
    { name: "AI intent", text: "Injection-hardened reasoning over sender, subject, and body — shown inline, never overriding the analyst." },
  ],
  features: [
    {
      title: "Multi-tenant by design",
      text: "One platform, many organizations. Each tenant sees only its own data, enforced at the database with row-level security.",
    },
    {
      title: "Roles that fit real teams",
      text: "Owner, admin, analyst, and viewer roles with seat caps — plus reporters who never need a dashboard login.",
    },
    {
      title: "Cyber Weather",
      text: "Trends at a glance: verdict distribution, threat volume, top reporters, and top attackers over any time window.",
    },
    {
      title: "Verifiable reports",
      text: "Printable compliance and activity reports, integrity-hashed with SHA-256 so a shared PDF can be verified.",
    },
    {
      title: "Security Center & audit",
      text: "Live sessions, connection history, MFA resets, and a permanent audit trail of every meaningful change.",
    },
    {
      title: "API & signed webhooks",
      text: "Scoped API keys for automation and signed, retried webhooks that push every verdict into your SIEM.",
    },
  ],
  channels: ["Chrome extension", "Firefox extension", "Gmail add-on", "Roundcube webmail", "REST API", "Webhooks"],
  tiers: [
    {
      name: "Self-managed",
      text: "Your own SOC or IT team runs triage in PhishNode, with the full role set and your own intelligence quotas.",
      points: ["Owner, admin, analyst & viewer roles", "Bring your own intel keys", "Full queue & verdict control"],
    },
    {
      name: "Managed service",
      text: "Cyngard analysts run triage for you. Your team keeps full visibility while we handle the queue.",
      points: ["Triage by Cyngard analysts", "Service activity reports", "Shared intelligence coverage"],
    },
  ],
};

export const LEAKSHIELD = {
  steps: [
    {
      title: "Discover",
      text: "LeakShield identifies high-risk files first — environment files, configs, and anything that tends to hold secrets.",
    },
    {
      title: "Crawl",
      text: "It walks your project recursively, skipping dependencies and irrelevant directories so large repos stay fast.",
    },
    {
      title: "Analyze",
      text: "Pattern matching, context analysis, and a 0–100 risk score separate real exposures from noise.",
    },
    {
      title: "Fix",
      text: "Each finding comes with a priority, step-by-step remediation, and the insecure code next to its secure version.",
    },
  ],
  detects: [
    { name: "GitHub tokens", severity: "critical" },
    { name: "Discord bot tokens", severity: "critical" },
    { name: "JWT secrets", severity: "critical" },
    { name: "Hardcoded credentials", severity: "critical" },
    { name: "Telegram bot tokens", severity: "high" },
    { name: "API keys", severity: "high" },
    { name: ".env & sensitive files", severity: "high" },
  ] as { name: string; severity: "critical" | "high" }[],
  privacy: [
    { title: "No cloud processing", text: "Your code never leaves your machine. There is nothing to upload." },
    { title: "Zero network requests", text: "Scans run fully offline — safe for air-gapped and regulated environments." },
    { title: "No data collection", text: "No telemetry, no accounts, no tracking of what you scan." },
    { title: "Open & transparent", text: "The detection logic is open source, so your team can audit exactly what it does." },
  ],
};
