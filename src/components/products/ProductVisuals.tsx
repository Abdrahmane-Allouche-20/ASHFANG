import Image from "next/image";
import { Check, Lock, Paperclip, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import Beam from "@/components/ui/Beam";
import StatusOrb from "@/components/ui/StatusOrb";

/* Illustrative product views for PhishNode and LeakShield (sample data only). */

const WINDOW_SHADOW = "shadow-[0_40px_100px_-40px_rgba(139,92,246,0.45),0_24px_60px_-30px_rgba(0,0,0,0.9)]";

/** App window chrome. `working` runs a border beam to show the product busy. */
function Window({
  title,
  children,
  className,
  right,
  working,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
  working?: boolean;
}) {
  const frame = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.1rem] border border-line-strong bg-[linear-gradient(180deg,#151520,#0a0a10)]",
        !working && WINDOW_SHADOW,
        className,
      )}
    >
      <span className="edge-light" />
      <div className="flex h-10 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md border border-line bg-fill px-3 py-0.5 font-mono text-[10.5px] text-muted">
          <Lock size={10} className="shrink-0 text-subtle" />
          <span className="truncate">{title}</span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-muted">{right}</div>
      </div>
      {children}
    </div>
  );
  if (!working) return frame;
  // The beam clips its wrapper, so the window's outer shadow moves onto it.
  return (
    <Beam size="md" colorVariant="ocean" className={cn("rounded-[1.1rem]", WINDOW_SHADOW)}>
      {frame}
    </Beam>
  );
}

/* ---------------- PhishNode ---------------- */

const QUEUE = [
  { from: "HR Payroll", subject: "Verify your bank details before Friday", status: "In review", verdict: "phishing" },
  { from: "DocuSign", subject: "Contract awaiting your signature", status: "Enriching", verdict: null },
  { from: "IT Helpdesk", subject: "Mailbox storage almost full", status: "Done", verdict: "suspicious" },
  { from: "Finance", subject: "Q3 budget review — agenda", status: "Done", verdict: "clean" },
] as const;

const VERDICT_CLASS = {
  phishing: "sev sev-critical",
  suspicious: "sev sev-medium",
  clean: "sev sev-ok",
};

const CHECKS = [
  { label: "SPF / DKIM / DMARC", result: "Fail", bad: true },
  { label: "Lookalike domain", result: "Match", bad: true },
  { label: "URL reputation", result: "Malicious", bad: true },
  { label: "Attachment hash", result: "Clean", bad: false },
  { label: "AI intent", result: "Credential theft", bad: true },
];

const ACTIONS = ["Reporter emailed", "Security manager alerted", "SIEM webhook delivered", "Audit log entry"];

/** Analyst queue + open report, as seen in the PhishNode dashboard. */
export function PhishNodeConsole() {
  return (
    <Window title="phishnode · email queue" right={<span className="hidden sm:inline">SAMPLE</span>} working>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <ul className="border-b border-line md:border-b-0 md:border-r">
          {QUEUE.map((q, i) => (
            <li
              key={q.subject}
              className={cn(
                "flex items-center gap-3 border-b border-line px-4 py-3 last:border-0",
                i === 0 && "bg-[rgba(139,92,246,0.08)] shadow-[inset_2px_0_0_#a78bfa]",
              )}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fill-strong font-mono text-[10px] text-muted">
                {q.from
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-medium text-fg">{q.subject}</span>
                <span className="block truncate font-mono text-[10px] text-subtle">
                  {q.from} · {q.status}
                </span>
              </span>
              {q.verdict ? (
                <span className={cn(VERDICT_CLASS[q.verdict], "shrink-0")}>{q.verdict}</span>
              ) : (
                <StatusOrb className="shrink-0" />
              )}
            </li>
          ))}
        </ul>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-medium text-fg">Verify your bank details before Friday</p>
              <p className="mt-0.5 truncate font-mono text-[10.5px] text-subtle">
                payroll@yourcompany-portal-secure.com
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-subtle">
              <Paperclip size={11} /> 1
            </span>
          </div>

          <ul className="mt-4 space-y-1.5">
            {CHECKS.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-3 text-[12px]">
                <span className="text-muted">{c.label}</span>
                <span className={cn("font-mono text-[11px]", c.bad ? "text-critical" : "text-ok")}>{c.result}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Clean", "Suspicious", "Phishing"].map((v) => (
              <span
                key={v}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[11px]",
                  v === "Phishing"
                    ? "border-[rgba(251,113,133,0.5)] bg-[rgba(251,113,133,0.14)] text-[#fda4af]"
                    : "border-line text-subtle",
                )}
              >
                {v}
              </span>
            ))}
          </div>

          <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
            {ACTIONS.map((a, i) => (
              <li
                key={a}
                className="flex items-center gap-2 text-[11.5px] text-muted opacity-0 [animation:fade-up_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ animationDelay: `${600 + i * 250}ms` }}
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[rgba(52,211,153,0.16)] text-ok">
                  <Check size={9} strokeWidth={3} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Window>
  );
}

/** Compact report → verdict pipeline for the product card on the home page. */
export function PhishNodeFlow() {
  const steps = ["Report", "Enrich", "Decide", "Respond"];
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-6">
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <span className="rounded-full border border-[rgba(103,232,249,0.3)] bg-[rgba(34,211,238,0.08)] px-3 py-1 font-mono text-[10.5px] text-cyan-soft">
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="mx-1.5 h-px flex-1 bg-[linear-gradient(90deg,rgba(103,232,249,0.5),rgba(167,139,250,0.5))]" />
            )}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-line-strong bg-[#101019] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[12.5px] font-medium text-fg">Verify your bank details before Friday</p>
          <span className="sev sev-critical shrink-0">Phishing</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {ACTIONS.map((a) => (
            <span key={a} className="flex items-center gap-1.5 truncate text-[11px] text-muted">
              <Check size={11} className="shrink-0 text-ok" />
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- LeakShield ---------------- */

const ALERTS = [
  { title: "Credentials for 3 accounts in a new breach dump", source: "Breach database", time: "2m", sev: "critical" },
  { title: "yourcompany.com mentioned on a paste site", source: "Paste site", time: "18m", sev: "high" },
  { title: "Known CVE matches web server on api.yourcompany.com", source: "NVD", time: "1h", sev: "high" },
  { title: "Brand keyword in newly indexed forum post", source: "OSINT", time: "3h", sev: "medium" },
] as const;

const SEV_CLASS = { critical: "sev sev-critical", high: "sev sev-high", medium: "sev sev-medium" };

/** Real-time exposure alert feed, as seen in the LeakShield dashboard. */
export function LeakShieldAlerts({ compact }: { compact?: boolean }) {
  return (
    <Window title="leakshield · exposure alerts" right={<span className="hidden sm:inline">SAMPLE</span>} working>
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
        <StatusOrb className="-my-1 shrink-0" />
        <span className="font-mono text-[10px] tracking-[0.12em] text-subtle">MONITORING</span>
        <span className="truncate font-mono text-[11px] text-fg">yourcompany.com · 4 keywords · 12 assets</span>
      </div>
      <ul>
        {ALERTS.slice(0, compact ? 3 : 4).map((a, i) => (
          <li
            key={a.title}
            className="flex items-center gap-3 border-b border-line px-4 py-2.5 opacity-0 last:border-0 [animation:fade-up_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
            style={{ animationDelay: `${250 + i * 200}ms` }}
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] text-fg">{a.title}</span>
              <span className="font-mono text-[10px] text-subtle">
                {a.source} · {a.time} ago
              </span>
            </span>
            <span className={cn(SEV_CLASS[a.sev], "shrink-0")}>{a.sev}</span>
          </li>
        ))}
      </ul>
    </Window>
  );
}

/** A single exposure, with where it came from and what to do next. */
export function LeakShieldExposure() {
  return (
    <div className="card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="sev sev-critical">Critical</span>
          <span className="text-[13px] font-medium text-fg">Leaked credentials</span>
        </div>
        <span className="font-mono text-[10.5px] text-subtle">SAMPLE ALERT</span>
      </div>
      <dl className="grid grid-cols-1 gap-3 px-5 py-4 text-[13px] sm:grid-cols-[8rem_1fr]">
        <dt className="text-subtle">Source</dt>
        <dd className="text-[#d6d6e2]">Newly published breach dump</dd>
        <dt className="text-subtle">Matched asset</dt>
        <dd className="font-mono text-[12px] text-[#d6d6e2]">@yourcompany.com · 3 accounts</dd>
        <dt className="text-subtle">First seen</dt>
        <dd className="text-[#d6d6e2]">2 minutes ago</dd>
      </dl>
      <div className="border-t border-line px-5 py-4">
        <p className="font-mono text-[10px] tracking-[0.14em] text-subtle">RECOMMENDED ACTIONS</p>
        <ol className="mt-2.5 space-y-1.5 text-[12.5px] text-muted">
          {["Force a password reset for the affected accounts", "Revoke active sessions and enforce MFA", "Check sign-in logs for suspicious access"].map(
            (s, i) => (
              <li key={s} className="flex gap-2.5">
                <span className="font-mono text-[11px] text-subtle">{i + 1}.</span>
                {s}
              </li>
            ),
          )}
        </ol>
      </div>
    </div>
  );
}

/* ---------------- Marks ---------------- */

export function PhishNodeMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/phishnode.png"
      alt=""
      width={512}
      height={512}
      className={cn("h-9 w-9 drop-shadow-[0_0_14px_rgba(59,130,246,0.55)]", className)}
    />
  );
}

export function LeakShieldMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-[0.7rem] bg-[linear-gradient(145deg,#a78bfa,#6d28d9)] text-white shadow-[0_0_20px_-4px_rgba(139,92,246,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]",
        className,
      )}
    >
      <ShieldCheck size={19} strokeWidth={2.2} />
    </span>
  );
}

