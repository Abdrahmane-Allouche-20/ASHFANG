import {
  ClipboardCheck,
  Cloud,
  Code2,
  Crosshair,
  GraduationCap,
  Layout,
  MailWarning,
  Radar,
  ShieldAlert,
  Siren,
  Swords,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Cyngard",
  tagline: "Think like an attacker. Defend like an engineer.",
  description:
    "Cyngard is an international cybersecurity company. We build PhishNode and LeakShield, and deliver managed SOC, penetration testing, code review, and security engineering to organizations worldwide.",
  email: "cyngard.support@gmail.com",
  url: "https://cyngard.com",
};

/** Add a profile URL to show the icon in the footer. Empty links are hidden. */
export const SOCIALS: { label: "LinkedIn" | "X" | "GitHub"; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "X", href: "" },
  { label: "GitHub", href: "" },
];

/* ---------- Services ---------- */

export type ServiceCategory = "offensive" | "defense" | "advisory";

export const SERVICE_CATEGORIES: { id: ServiceCategory; name: string; blurb: string }[] = [
  {
    id: "offensive",
    name: "Offensive Security",
    blurb: "We attack your systems the way real adversaries do, so you can fix what matters first.",
  },
  {
    id: "defense",
    name: "Defense & Operations",
    blurb: "Monitoring, triage, and response that keep threats from turning into incidents.",
  },
  {
    id: "advisory",
    name: "Engineering & Advisory",
    blurb: "Security built into your cloud, your code, your people, and your governance.",
  },
];

export type Service = {
  slug: string;
  category: ServiceCategory;
  icon: LucideIcon;
  title: string;
  summary: string;
  intro: string;
  includes: string[];
  deliverables: string[];
  /** In-house platform used to deliver this service. */
  product?: "phishnode" | "leakshield";
};

export const SERVICES: Service[] = [
  {
    slug: "penetration-testing",
    category: "offensive",
    icon: Crosshair,
    title: "Penetration Testing",
    summary: "Real-world attacks on your web apps, APIs, and networks — with a clear map to close every door.",
    intro:
      "Automated scanners find the obvious. Our engineers chain weaknesses together the way attackers do, prove the impact, and rank every finding by what it means for your business.",
    includes: [
      "Web application and API testing",
      "External and internal network testing",
      "Authentication, session, and access-control testing",
      "Business-logic abuse and chained attacks",
      "OWASP and PTES-aligned methodology",
      "A free retest once you've fixed the gaps",
    ],
    deliverables: [
      "Executive summary for leadership",
      "Technical findings with evidence and severity",
      "Prioritized, step-by-step remediation plan",
      "Retest report confirming closure",
    ],
  },
  {
    slug: "red-teaming",
    category: "offensive",
    icon: Swords,
    title: "Red Teaming",
    summary: "Goal-driven adversary simulation that tests how well you detect and respond.",
    intro:
      "A penetration test asks “where are the holes?” A red team engagement asks “could an attacker reach our crown jewels — and would we notice?” We agree objectives with you, then pursue them quietly.",
    includes: [
      "Scenario and objective design with your leadership",
      "Consent-based social engineering and phishing",
      "Initial access, lateral movement, and persistence",
      "Detection and response assessment mapped to MITRE ATT&CK",
    ],
    deliverables: [
      "Attack narrative and timeline",
      "MITRE ATT&CK coverage map",
      "Detection gap analysis",
      "Debrief workshop with your defenders",
    ],
  },
  {
    slug: "secure-code-review",
    category: "offensive",
    icon: Code2,
    title: "Secure Code Review",
    summary: "Engineer-led audits that catch the vulnerabilities scanners miss — before they ship.",
    intro:
      "We read your code the way an attacker would, focusing on the paths that handle money, data, and identity. Every finding comes with a fix your developers can apply the same day.",
    includes: [
      "Manual review of critical code paths",
      "Automated static and dependency analysis",
      "Secret and credential exposure scanning with LeakShield",
      "Authentication, authorization, and injection flaws",
      "Fix-first guidance with code examples",
    ],
    deliverables: [
      "Findings mapped to files and lines",
      "Secure code examples for each issue",
      "Developer walkthrough session",
    ],
    product: "leakshield",
  },
  {
    slug: "managed-soc",
    category: "defense",
    icon: Radar,
    title: "Managed SOC",
    summary: "Our analysts monitor, triage, and respond to threats for you — no in-house SOC required.",
    intro:
      "Building a security operations center takes people, tooling, and years. With Cyngard, you get an operating SOC from day one: our analysts watch your environment, triage what matters, and escalate with context when action is needed.",
    includes: [
      "Continuous alert monitoring and triage",
      "Phishing report triage on PhishNode",
      "Threat-intelligence enrichment",
      "Escalation and response coordination",
      "Defined escalation paths and contacts",
    ],
    deliverables: [
      "Service activity reports",
      "Incident reports for severe events",
      "Regular service reviews with your team",
    ],
    product: "phishnode",
  },
  {
    slug: "incident-response",
    category: "defense",
    icon: Siren,
    title: "Incident Response",
    summary: "Contain the attack, find the root cause, recover — and close the gap that let it in.",
    intro:
      "When something goes wrong, speed and clarity matter more than anything. We help you contain the threat, investigate what happened, restore operations, and harden your environment so it doesn't happen again.",
    includes: [
      "Triage, scoping, and containment",
      "Forensic investigation and root-cause analysis",
      "Eradication and recovery support",
      "Communication support for stakeholders",
      "Post-incident hardening",
    ],
    deliverables: [
      "Incident timeline",
      "Root-cause report",
      "Remediation and hardening actions",
      "Lessons-learned session",
    ],
  },
  {
    slug: "phishing-protection",
    category: "defense",
    icon: MailWarning,
    title: "Email Phishing Protection",
    summary: "Detect, triage, and neutralize phishing before it reaches the people who'll click.",
    intro:
      "Most breaches still start in the inbox. We deploy PhishNode so employees can report suspicious emails in one click, then triage every report, close the loop with the reporter, and push confirmed threats into your security stack.",
    includes: [
      "One-click reporting for employees",
      "Threat-intelligence enrichment of every report",
      "Analyst triage and verdicts",
      "Automatic feedback to reporters",
      "SIEM integration via signed webhooks",
    ],
    deliverables: [
      "Deployed reporting across your mail clients",
      "Monthly phishing activity reports",
      "Indicators of compromise for your defenses",
    ],
    product: "phishnode",
  },
  {
    slug: "breach-monitoring",
    category: "defense",
    icon: ShieldAlert,
    title: "Data Leak & Breach Monitoring",
    summary: "Know the moment your credentials, secrets, or data are exposed.",
    intro:
      "Leaks happen in two places: in your own code and on the open web. We scan your projects for exposed secrets with LeakShield and monitor public sources for your domains and credentials, so you can act before attackers do.",
    includes: [
      "Secret scanning of your code with LeakShield",
      "Continuous OSINT monitoring",
      "Domain and email coverage",
      "Exposure alerts with remediation guidance",
    ],
    deliverables: [
      "Exposure alerts as they surface",
      "Credential rotation guidance",
      "Periodic exposure reports",
    ],
    product: "leakshield",
  },
  {
    slug: "cloud-security",
    category: "advisory",
    icon: Cloud,
    title: "Cloud Security",
    summary: "Configuration reviews and hardening for your cloud accounts, identities, and workloads.",
    intro:
      "Most cloud breaches come from misconfiguration, not zero-days. We review how your accounts, identities, networks, and workloads are set up, and help you move to least privilege without slowing your teams down.",
    includes: [
      "Identity and access review",
      "Network exposure and segmentation",
      "Storage and data protection settings",
      "Logging and monitoring coverage",
    ],
    deliverables: [
      "Prioritized misconfiguration report",
      "Hardening roadmap",
      "Secure baseline for new environments",
    ],
  },
  {
    slug: "compliance-risk",
    category: "advisory",
    icon: ClipboardCheck,
    title: "Compliance & Risk",
    summary: "Gap assessments and roadmaps aligned with ISO 27001 and NIST CSF.",
    intro:
      "Frameworks are only useful when they turn into decisions. We assess where you stand against the standards your customers and regulators expect, and give you a roadmap written for decision-makers.",
    includes: [
      "Gap assessment against ISO 27001 or NIST CSF",
      "Risk register and treatment plan",
      "Policy and procedure review",
      "Readiness support ahead of audits",
    ],
    deliverables: [
      "Gap assessment report",
      "Prioritized roadmap",
      "Board-ready risk summary",
    ],
  },
  {
    slug: "security-awareness",
    category: "advisory",
    icon: GraduationCap,
    title: "Security Awareness",
    summary: "Practical training and phishing simulations that turn employees into a line of defense.",
    intro:
      "People are targeted every day. We train them with short, practical sessions and realistic simulations — and with PhishNode, every real report they make gets a response, which keeps them reporting.",
    includes: [
      "Role-based awareness sessions",
      "Phishing simulation campaigns",
      "Reporting culture with PhishNode feedback",
      "Progress tracking over time",
    ],
    deliverables: [
      "Training materials",
      "Simulation results and trends",
      "Recommendations by team",
    ],
    product: "phishnode",
  },
  {
    slug: "secure-development",
    category: "advisory",
    icon: Layout,
    title: "Web & App Development",
    summary: "Modern products built secure from the first commit, not patched after the breach.",
    intro:
      "Our engineers design and build web and mobile products with security in the architecture from day one — authentication, data protection, and secure deployment included.",
    includes: [
      "Security-by-design architecture",
      "Secure authentication and access control",
      "Automated security checks in CI",
      "Performance-focused engineering",
    ],
    deliverables: [
      "Production-ready application",
      "Security documentation",
      "Handover and support",
    ],
  },
];

export function servicesIn(category: ServiceCategory) {
  return SERVICES.filter((s) => s.category === category);
}

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
  { value: 11, suffix: "", label: "Security services" },
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
    q: "Can you run our security operations for us?",
    a: "Yes. Our managed SOC service monitors, triages, and responds to threats on your behalf — including phishing triage on PhishNode — so you get a security operations team without building one in-house.",
  },
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
  /** Live product site. */
  url: string;
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
    url: "https://phishnode.org",
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
    url: "https://leakshield.vercel.app",
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
