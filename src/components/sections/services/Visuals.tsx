"use client";

import { Check, FileCode2, KeyRound, Lock, Mail, TriangleAlert } from "lucide-react";
import type { ServiceVisual } from "@/lib/site";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/* Small, illustrative product vignettes for each service card. */

export default function ServiceVisualArt({ kind }: { kind: ServiceVisual }) {
  switch (kind) {
    case "attack-path":
      return <AttackPath />;
    case "phishing":
      return <Phishing />;
    case "leaks":
      return <Leaks />;
    case "code":
      return <CodeDiff />;
    case "build":
      return <SecureBuild />;
  }
}

/* ---------- Penetration testing: an exploited path through the stack ---------- */

const NODES = [
  { id: "internet", x: 160, y: 34, label: "internet", hit: true },
  { id: "edge", x: 160, y: 110, label: "edge / waf", hit: true },
  { id: "api", x: 94, y: 192, label: "api-gateway", hit: true },
  { id: "web", x: 226, y: 192, label: "web-app", hit: false },
  { id: "billing", x: 94, y: 270, label: "billing-api", hit: true },
  { id: "db", x: 160, y: 350, label: "tenant-db", hit: true },
];
const ROUTE = "M160 34 L160 110 C160 152 94 150 94 192 L94 270 C94 312 160 308 160 350";

function AttackPath() {
  const reduce = usePrefersReducedMotion();
  return (
    <div className="flex h-full w-full flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-subtle">
        <span>SAMPLE ATTACK PATH</span>
        <span className="text-critical">1 CRITICAL</span>
      </div>
      <svg viewBox="0 0 320 400" className="mx-auto mt-3 w-full max-w-[340px] flex-1 font-mono">
        <defs>
          <linearGradient id="route" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <radialGradient id="hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.45)" />
            <stop offset="100%" stopColor="rgba(251,113,133,0)" />
          </radialGradient>
        </defs>

        {/* Quiet edges */}
        <path d="M160 127 C160 160 226 150 226 175" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <path d="M226 209 C226 285 196 296 190 333" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* Exploited route */}
        <path d={ROUTE} fill="none" stroke="url(#route)" strokeOpacity="0.22" strokeWidth="6" strokeLinejoin="round" />
        <path
          d={ROUTE}
          fill="none"
          stroke="url(#route)"
          strokeWidth="1.6"
          strokeDasharray="5 6"
          strokeLinejoin="round"
          className="[animation:dash_1.2s_linear_infinite]"
        />
        {!reduce && (
          <circle r="4" fill="#fff" style={{ filter: "drop-shadow(0 0 6px #fb7185)" }}>
            <animateMotion dur="3.4s" repeatCount="indefinite" path={ROUTE} />
          </circle>
        )}

        <circle cx="160" cy="350" r="52" fill="url(#hot)" className="origin-center [animation:pulse-soft_2.4s_ease-in-out_infinite] [transform-box:fill-box]" />

        {NODES.map((n) => {
          const critical = n.id === "db";
          return (
            <g key={n.id}>
              <rect
                x={n.x - 54}
                y={n.y - 17}
                width="108"
                height="34"
                rx="9"
                fill={critical ? "#1c0f16" : "#11111b"}
                stroke={critical ? "rgba(251,113,133,0.7)" : n.hit ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.12)"}
              />
              <circle cx={n.x - 40} cy={n.y} r="3" fill={critical ? "#fb7185" : n.hit ? "#a78bfa" : "#4a4a60"} />
              <text x={n.x - 30} y={n.y + 4} fontSize="11" fill={n.hit ? "#e4e4ee" : "#8a8aa0"}>
                {n.label}
              </text>
            </g>
          );
        })}

        <text x="222" y="38" fontSize="9.5" letterSpacing="1.2" fill="#80809a">
          ENTRY
        </text>
        <g transform="translate(222 342)">
          <rect width="88" height="18" rx="5" fill="rgba(251,113,133,0.12)" stroke="rgba(251,113,133,0.4)" />
          <text x="44" y="12.5" textAnchor="middle" fontSize="9" letterSpacing="1" fill="#fda4af">
            CRITICAL · IDOR
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ---------- Phishing protection: an inbox being triaged ---------- */

const MAILS = [
  { from: "IT Service Desk", subject: "Password expires in 2 hours — verify now", verdict: "Phishing", tone: "sev-critical" },
  { from: "Accounts Payable", subject: "Updated bank details for invoice #4471", verdict: "Suspicious", tone: "sev-medium" },
  { from: "Product Team", subject: "Sprint review notes and next steps", verdict: "Clean", tone: "sev-ok" },
];

function Phishing() {
  return (
    <Screen>
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5 font-mono text-[10px] tracking-[0.12em] text-subtle">
        <span>INBOX · TRIAGE</span>
        <span className="flex items-center gap-1.5">
          <span className="live-dot scale-75" /> SCANNING
        </span>
      </div>
      <ul className="relative">
        {MAILS.map((m, i) => (
          <li
            key={m.from}
            className={cn(
              "flex items-center gap-3 border-b border-line px-3.5 py-2.5 last:border-0",
              i === 0 && "bg-[rgba(251,113,133,0.05)]",
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fill-strong font-mono text-[10px] text-muted">
              {m.from
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-medium text-fg">{m.from}</span>
              <span className={cn("block truncate text-[11px]", i === 0 ? "text-muted line-through decoration-[rgba(251,113,133,0.6)]" : "text-subtle")}>
                {m.subject}
              </span>
            </span>
            <span className={cn("sev shrink-0", m.tone)}>{m.verdict}</span>
          </li>
        ))}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(34,211,238,0.10),transparent)] [animation:scan_3.2s_ease-in-out_infinite]"
        />
      </ul>
    </Screen>
  );
}

/* ---------- Leak monitoring: exposure alerts as they surface ---------- */

const ALERTS = [
  { icon: KeyRound, title: "Credential pair in combo list", source: "breach forum", time: "2m", dot: "bg-critical", fresh: true },
  { icon: FileCode2, title: "API key posted on a paste site", source: "paste site", time: "14m", dot: "bg-high", fresh: false },
  { icon: Mail, title: "12 staff emails in breach dump", source: "dark web", time: "1h", dot: "bg-medium", fresh: false },
];

function Leaks() {
  return (
    <Screen>
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-cyan [animation:radar_2s_ease-out_infinite]" />
          <span className="relative h-2 w-2 rounded-full bg-cyan" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] text-subtle">WATCHING</span>
        <span className="font-mono text-[11px] text-fg">yourcompany.com</span>
      </div>
      <ul>
        {ALERTS.map((a) => (
          <li key={a.title} className="flex items-center gap-3 border-b border-line px-3.5 py-2.5 last:border-0">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-fill text-muted">
              <a.icon size={13} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] text-fg">{a.title}</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-subtle">
                <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
                {a.source} · {a.time} ago
              </span>
            </span>
            {a.fresh && <span className="sev sev-critical shrink-0">New</span>}
          </li>
        ))}
      </ul>
    </Screen>
  );
}

/* ---------- Secure code review: the fix, as a diff ---------- */

function CodeDiff() {
  return (
    <Screen>
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5 font-mono text-[10px] tracking-[0.12em] text-subtle">
        <span>users/repository.ts</span>
        <span className="text-ok">+2 −1</span>
      </div>
      <pre className="overflow-hidden py-2 font-mono text-[11px] leading-[1.75]">
        <DiffLine n={18}>
          <span className="text-violet-soft">const</span> user = <span className="text-violet-soft">await</span> db.
          <span className="text-cyan-soft">query</span>(
        </DiffLine>
        <DiffLine n={19} kind="del">
          {"  "}
          <span className="text-[#fdba74]">`SELECT * FROM users WHERE id=${"{"}id{"}"}`</span>
        </DiffLine>
        <DiffLine n={19} kind="add">
          {"  "}
          <span className="text-[#86efac]">&quot;SELECT * FROM users WHERE id=$1&quot;</span>,
        </DiffLine>
        <DiffLine n={20} kind="add">
          {"  "}[id]
        </DiffLine>
        <DiffLine n={21}>);</DiffLine>
      </pre>
      <div className="mx-3.5 mb-3 flex items-center gap-2 rounded-lg border border-[rgba(251,113,133,0.25)] bg-[rgba(251,113,133,0.06)] px-2.5 py-1.5 text-[11px] text-muted">
        <TriangleAlert size={12} className="shrink-0 text-critical" />
        <span className="truncate">
          SQL injection <span className="text-subtle">(CWE-89)</span> → parameterized
        </span>
        <Check size={12} className="ml-auto shrink-0 text-ok" />
      </div>
    </Screen>
  );
}

function DiffLine({
  n,
  kind,
  children,
}: {
  n: number;
  kind?: "add" | "del";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex whitespace-pre pr-3",
        kind === "del" && "bg-[rgba(251,113,133,0.08)]",
        kind === "add" && "bg-[rgba(52,211,153,0.08)]",
      )}
    >
      <span className="w-8 shrink-0 select-none pr-2 text-right text-subtle">{n}</span>
      <span
        className={cn(
          "w-4 shrink-0 select-none",
          kind === "del" && "text-critical",
          kind === "add" && "text-ok",
        )}
      >
        {kind === "del" ? "−" : kind === "add" ? "+" : " "}
      </span>
      <span className="text-[#d9d9e6]">{children}</span>
    </div>
  );
}

/* ---------- Web & app development: secure by default ---------- */

const CHECKS = ["Security headers & CSP", "Auth with MFA", "Dependency audit"];

function SecureBuild() {
  return (
    <Screen>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <div className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#2a2a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#2a2a3a]" />
          <span className="h-2 w-2 rounded-full bg-[#2a2a3a]" />
        </div>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-fill px-2.5 py-0.5 font-mono text-[10px] text-muted">
          <Lock size={9} className="text-ok" /> app.yourcompany.com
        </span>
      </div>
      <div className="relative grid grid-cols-[1fr_auto] gap-3 p-3.5">
        <div className="space-y-2" aria-hidden>
          <div className="h-2.5 w-3/4 rounded-full bg-fill-strong" />
          <div className="h-2 w-full rounded-full bg-fill" />
          <div className="h-2 w-5/6 rounded-full bg-fill" />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="h-9 rounded-md bg-[linear-gradient(135deg,rgba(139,92,246,0.25),rgba(139,92,246,0.05))]" />
            <div className="h-9 rounded-md bg-fill-strong" />
            <div className="h-9 rounded-md bg-[linear-gradient(135deg,rgba(34,211,238,0.2),rgba(34,211,238,0.04))]" />
          </div>
        </div>
        <ul className="w-[10.5rem] space-y-1.5 rounded-lg border border-line bg-[#101019] p-2.5">
          {CHECKS.map((c) => (
            <li key={c} className="flex items-center gap-1.5 text-[10.5px] text-muted">
              <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[rgba(52,211,153,0.15)] text-ok">
                <Check size={9} strokeWidth={3} />
              </span>
              <span className="truncate">{c}</span>
            </li>
          ))}
          <li className="flex items-center justify-between border-t border-line pt-1.5 font-mono text-[9.5px] tracking-[0.1em] text-subtle">
            BUILD <span className="text-ok">PASSING</span>
          </li>
        </ul>
      </div>
    </Screen>
  );
}

/* A small app window that holds each vignette. */
function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-end px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="relative w-full overflow-hidden rounded-t-xl border border-b-0 border-line-strong bg-[linear-gradient(180deg,#12121c,#0c0c14)] shadow-[0_-20px_50px_-30px_rgba(139,92,246,0.35)]">
        {children}
      </div>
    </div>
  );
}
