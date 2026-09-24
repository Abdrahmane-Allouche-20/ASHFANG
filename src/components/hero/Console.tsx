"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/* An illustrative engagement playing out the Scope → Execute → Report → Harden loop. */

type Tone = "critical" | "high" | "ok";
type Counts = [critical: number, high: number, medium: number, low: number];
type LogLine = {
  at: string;
  tag: keyof typeof TAG_COLOR;
  text: string;
  badge?: { label: string; tone: Tone };
  phase: number;
  open: Counts;
  risk: number | null;
};

const TAG_COLOR = {
  recon: "text-cyan-soft",
  scan: "text-cyan-soft",
  exploit: "text-critical",
  verify: "text-violet-pale",
  report: "text-low",
  harden: "text-ok",
  retest: "text-ok",
};

const LOG: LogLine[] = [
  { at: "D1 09:12", tag: "recon", text: "Mapped 38 subdomains and 212 endpoints", phase: 1, open: [0, 0, 0, 0], risk: null },
  { at: "D1 11:40", tag: "scan", text: "Fingerprinted services across web, API and VPN", phase: 1, open: [0, 0, 0, 0], risk: null },
  { at: "D2 10:03", tag: "exploit", text: "IDOR on /api/v2/invoices exposes other tenants", badge: { label: "Critical", tone: "critical" }, phase: 1, open: [1, 0, 0, 0], risk: 61 },
  { at: "D2 15:26", tag: "exploit", text: "Refresh endpoint accepts unsigned JWTs", badge: { label: "High", tone: "high" }, phase: 1, open: [1, 2, 1, 3], risk: 74 },
  { at: "D3 09:48", tag: "exploit", text: "Admin console reachable without MFA", badge: { label: "Critical", tone: "critical" }, phase: 1, open: [2, 4, 7, 11], risk: 86 },
  { at: "D3 16:05", tag: "verify", text: "Proof-of-concept captured, evidence attached", phase: 1, open: [2, 4, 7, 11], risk: 86 },
  { at: "D4 12:30", tag: "report", text: "24 findings ranked by business impact", phase: 2, open: [2, 4, 7, 11], risk: 86 },
  { at: "D9 10:15", tag: "harden", text: "Fixes shipped by your team, retest started", phase: 3, open: [2, 4, 7, 11], risk: 86 },
  { at: "D9 17:42", tag: "retest", text: "Critical and high findings verified closed", badge: { label: "Resolved", tone: "ok" }, phase: 4, open: [0, 0, 3, 6], risk: 18 },
];

const PHASES = ["Scope", "Execute", "Report", "Harden"];
const TARGETS = ["app.yourcompany.com", "api.yourcompany.com", "vpn.yourcompany.com"];
const SEVERITIES = [
  { label: "Critical", bar: "#fb7185" },
  { label: "High", bar: "#fb923c" },
  { label: "Medium", bar: "#facc15" },
  { label: "Low", bar: "#60a5fa" },
];

const TONE_CLASS: Record<Tone, string> = {
  critical: "sev sev-critical",
  high: "sev sev-high",
  ok: "sev sev-ok",
};

export default function Console() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = usePrefersReducedMotion();
  // Start a few lines in so the first paint is never an empty window.
  const [step, setStep] = useState(2);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    if (reduce) {
      setStep(LOG.length);
      setClearing(false);
      return;
    }
    if (!inView) return;
    let id: ReturnType<typeof setTimeout>;
    if (clearing) {
      id = setTimeout(() => {
        setStep(0);
        setClearing(false);
      }, 450);
    } else if (step >= LOG.length) {
      id = setTimeout(() => setClearing(true), 5200);
    } else {
      id = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 1250);
    }
    return () => clearTimeout(id);
  }, [step, clearing, inView, reduce]);

  const last = step > 0 ? LOG[step - 1] : null;
  const phase = last?.phase ?? 0;
  const open: Counts = last?.open ?? [0, 0, 0, 0];
  const total = open.reduce((a, b) => a + b, 0);
  const risk = last?.risk ?? null;
  const complete = phase >= PHASES.length;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[1.25rem] border border-line-strong bg-[linear-gradient(180deg,#151520,#0a0a10)] shadow-[0_50px_120px_-40px_rgba(139,92,246,0.5),0_30px_80px_-30px_rgba(0,0,0,0.9)]"
    >
      <span className="edge-light" />

      {/* Window chrome */}
      <div className="flex h-11 items-center gap-3 border-b border-line px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a3a]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-2 rounded-md border border-line bg-fill px-3 py-1 font-mono text-[11px] text-muted">
          <Lock size={11} className="shrink-0 text-subtle" />
          <span className="truncate">cyngard · sample engagement</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted">
          <span className="live-dot" />
          <span className="hidden sm:inline">{complete ? "COMPLETE" : "LIVE"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_260px]">
        {/* Phases & targets */}
        <aside className="hidden border-r border-line p-5 md:block">
          <p className="font-mono text-[10px] tracking-[0.16em] text-subtle">PHASES</p>
          <ol className="mt-3 space-y-1">
            {PHASES.map((p, i) => {
              const done = phase > i;
              const current = phase === i;
              return (
                <li
                  key={p}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] transition-colors duration-500",
                    current ? "bg-fill-strong text-fg" : done ? "text-fg" : "text-subtle",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border transition-colors duration-500",
                      done
                        ? "border-transparent bg-[rgba(52,211,153,0.18)] text-ok"
                        : current
                          ? "border-violet-soft"
                          : "border-line-strong",
                    )}
                  >
                    {done ? (
                      <Check size={10} strokeWidth={3} />
                    ) : current ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-soft shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    ) : null}
                  </span>
                  {p}
                </li>
              );
            })}
          </ol>

          <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-subtle">TARGETS</p>
          <ul className="mt-3 space-y-2">
            {TARGETS.map((t) => (
              <li key={t} className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ok" />
                <span className="truncate">{t}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Activity log */}
        <div className="relative flex min-w-0 flex-col p-4 sm:p-5">
          <p className="font-mono text-[11px] text-subtle">
            <span className="text-violet-soft">$</span> cyngard engage --scope scope.yml
          </p>
          <div
            aria-hidden
            className={cn(
              "mt-3 flex h-[270px] flex-col justify-end gap-1 overflow-hidden transition-opacity duration-300 sm:h-[320px] md:justify-start",
              clearing && "opacity-0",
            )}
          >
            {LOG.slice(0, step).map((l, i) => (
              <div
                key={i}
                className="grid shrink-0 grid-cols-[3.9rem_3.6rem_1fr] items-start gap-x-2 rounded-md px-1.5 py-[5px] font-mono text-[11px] leading-[1.5] [animation:line-in_0.5s_cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-[4.4rem_4rem_1fr_auto] sm:text-[12px]"
              >
                <span className="text-subtle">{l.at}</span>
                <span className={TAG_COLOR[l.tag]}>{l.tag}</span>
                <span className="min-w-0 text-[#d9d9e6]">{l.text}</span>
                {l.badge ? (
                  <span className={cn(TONE_CLASS[l.badge.tone], "col-start-3 mt-1 justify-self-start sm:col-start-auto sm:mt-0")}>
                    {l.badge.label}
                  </span>
                ) : (
                  <span className="hidden sm:block" />
                )}
              </div>
            ))}
            <div className="shrink-0 px-1.5 font-mono text-[12px] text-subtle">
              <span className="caret inline-block h-3.5 w-[7px] translate-y-[3px] bg-violet-soft" />
            </div>
          </div>
          <p className="sr-only">
            Example engagement: reconnaissance, exploitation of critical and high findings, a
            prioritized report, and a retest verifying the fixes.
          </p>
        </div>

        {/* Findings & risk */}
        <div className="border-t border-line p-4 sm:p-5 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] tracking-[0.16em] text-subtle">OPEN FINDINGS</p>
            <p className="font-mono text-[11px] text-muted">
              <span className="text-fg tabular-nums">{total}</span> total
            </p>
          </div>

          <ul className="mt-3 grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-2.5">
            {SEVERITIES.map((s, i) => (
              <li key={s.label} className="rounded-lg border border-line bg-fill px-2.5 py-2 lg:border-0 lg:bg-transparent lg:p-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] text-muted lg:text-[12px]">{s.label}</span>
                  <span className="font-mono text-[13px] text-fg tabular-nums">{open[i]}</span>
                </div>
                <div className="mt-1.5 hidden h-1.5 overflow-hidden rounded-full bg-fill-strong lg:block">
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-premium"
                    style={{ width: `${(open[i] / 12) * 100}%`, background: s.bar }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 hidden rounded-xl border border-line bg-fill p-4 lg:block">
            <p className="font-mono text-[10px] tracking-[0.16em] text-subtle">RISK SCORE</p>
            <RiskGauge value={risk} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskGauge({ value }: { value: number | null }) {
  const len = Math.PI * 40;
  const v = value ?? 0;
  const color = v >= 70 ? "#fb7185" : v >= 40 ? "#fb923c" : "#34d399";
  const label = value === null ? "Assessing" : v >= 70 ? "High" : v >= 40 ? "Elevated" : "Low";

  return (
    <div className="relative mx-auto mt-2 w-[168px]">
      <svg viewBox="0 0 100 56" className="w-full" aria-hidden>
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" strokeLinecap="round" />
        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - v / 100)}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1), stroke 1s ease", filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="font-display text-3xl font-semibold leading-none tracking-tight tabular-nums text-fg">
          {value ?? "—"}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted">{label.toUpperCase()}</p>
      </div>
    </div>
  );
}
