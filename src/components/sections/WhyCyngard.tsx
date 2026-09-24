import Image from "next/image";
import { Terminal, UserRound, X } from "lucide-react";
import { WHY } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightGroup from "@/components/ui/SpotlightGroup";
import Reveal from "@/components/ui/Reveal";
import Globe from "@/components/ui/Globe";
import Clocks from "@/components/sections/why/Clocks";
import Stats from "@/components/sections/why/Stats";

const [mindset, engineers, global, clarity] = WHY;

export default function WhyCyngard() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow="Why Cyngard"
          title={
            <>
              The team that breaks it{" "}
              <span className="accent text-gradient">knows how to guard it.</span>
            </>
          }
          description="We're engineers first. That means no middlemen, no recycled reports, and no security theater — just people who understand exactly how attacks work, and how to stop them."
        />

        <SpotlightGroup className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Global & responsive */}
          <Reveal className="flex lg:col-span-7 lg:row-span-2">
            <article data-spot className="card relative flex min-h-[560px] w-full min-w-0 flex-col">
              <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute -right-[18%] top-[22%] w-[92%] min-w-[420px] sm:-right-[8%] sm:top-[14%] sm:w-[78%]">
                  <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)] blur-2xl" />
                  <Globe />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(9,9,15,0.85)_55%,#09090f)]" />
              </div>

              <div className="relative p-6 sm:p-8">
                <TileLabel>01 — Reach</TileLabel>
                <h3 className="mt-4 max-w-xs font-display text-2xl font-semibold tracking-[-0.025em]">
                  {global.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{global.text}</p>
              </div>

              <div className="relative mt-auto border-t border-line p-6 sm:px-8">
                <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-subtle">
                  WHEREVER YOU ARE, RIGHT NOW
                </p>
                <Clocks />
              </div>
            </article>
          </Reveal>

          {/* Engineer-led */}
          <Reveal delay={0.08} className="flex lg:col-span-5">
            <article data-spot className="card flex w-full min-w-0 flex-col p-6 sm:p-8">
              <DirectLine />
              <TileLabel className="mt-9">02 — Access</TileLabel>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{engineers.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{engineers.text}</p>
            </article>
          </Reveal>

          {/* Attacker mindset */}
          <Reveal delay={0.16} className="flex lg:col-span-5">
            <article data-spot className="card flex w-full min-w-0 flex-col p-6 sm:p-8">
              <OffenseDefense />
              <TileLabel className="mt-9">03 — Mindset</TileLabel>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">{mindset.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{mindset.text}</p>
            </article>
          </Reveal>

          {/* Clarity over jargon */}
          <Reveal className="flex lg:col-span-12">
            <article data-spot className="card grid w-full min-w-0 grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <div>
                <TileLabel>04 — Reporting</TileLabel>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em]">{clarity.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{clarity.text}</p>
              </div>
              <PlainEnglish />
            </article>
          </Reveal>
        </SpotlightGroup>

        <Reveal className="mt-4">
          <Stats />
        </Reveal>
      </div>
    </section>
  );
}

function TileLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.16em] text-subtle ${className ?? ""}`}>
      {children}
    </p>
  );
}

/** You ↔ engineer, with the middleman struck out. */
function DirectLine() {
  return (
    <div aria-hidden className="relative pb-9 pt-2">
      <div className="flex items-center gap-3">
        <Node icon={<UserRound size={14} />} label="You" />
        <div className="relative h-px flex-1 bg-[linear-gradient(90deg,#a78bfa,#22d3ee)]">
          <span className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_10px_#67e8f9] [animation:travel_2.8s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </div>
        <Node icon={<Terminal size={14} />} label="Engineer" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <span className="chip text-subtle line-through decoration-[rgba(251,113,133,0.7)]">
          <X size={11} className="text-critical" />
          Account manager
        </span>
      </div>
    </div>
  );
}

function Node({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-[#12121c] py-1.5 pl-1.5 pr-3.5 text-[13px] text-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fill-strong text-violet-pale">
        {icon}
      </span>
      {label}
    </span>
  );
}

/** Offense and defense meeting at the shield. */
function OffenseDefense() {
  return (
    <div aria-hidden className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <ul className="flex flex-col items-end gap-1.5">
        <li className="mb-1 font-mono text-[10px] tracking-[0.16em] text-critical">OFFENSE</li>
        {["Recon", "Exploit", "Pivot"].map((t) => (
          <li key={t} className="chip border-[rgba(251,113,133,0.22)] bg-[rgba(251,113,133,0.06)]">
            {t}
          </li>
        ))}
      </ul>
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-line-strong" />
        <span className="absolute inset-0 rounded-full border border-[rgba(167,139,250,0.4)] [animation:radar_3s_ease-out_infinite]" />
        <span className="absolute inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),transparent)]" />
        <Image src="/brand/mark.png" alt="" width={240} height={316} className="relative h-10 w-auto drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
      </div>
      <ul className="flex flex-col items-start gap-1.5">
        <li className="mb-1 font-mono text-[10px] tracking-[0.16em] text-cyan">DEFENSE</li>
        {["Detect", "Harden", "Verify"].map((t) => (
          <li key={t} className="chip border-[rgba(34,211,238,0.22)] bg-[rgba(34,211,238,0.06)]">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The same finding, as jargon and as we'd actually write it. */
function PlainEnglish() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-line-strong px-4 py-3">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-subtle">TYPICAL</span>
        <p className="truncate font-mono text-[12px] text-subtle line-through decoration-[rgba(255,255,255,0.3)]">
          CWE-640: Weak Password Recovery Mechanism for Forgotten Password
        </p>
      </div>

      <div className="relative rounded-xl border border-line-strong bg-[linear-gradient(180deg,#14141f,#0d0d15)] p-5 shadow-[0_30px_60px_-30px_rgba(139,92,246,0.35)]">
        <span className="edge-light" />
        <div className="flex items-center gap-2.5">
          <span className="sev sev-high">High</span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-subtle">CYNGARD · FINDING 07</span>
        </div>
        <p className="mt-3 text-[16px] font-medium tracking-[-0.01em] text-fg">
          Password reset links never expire
        </p>
        <dl className="mt-4 grid gap-2.5 text-[13.5px] leading-relaxed">
          <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
            <dt className="text-subtle">What it means</dt>
            <dd className="text-[#d6d6e2]">Anyone holding an old reset email can take over that account.</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
            <dt className="text-subtle">How to fix</dt>
            <dd className="text-[#d6d6e2]">Expire links after 30 minutes and invalidate them once used.</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
            <dt className="text-subtle">Effort</dt>
            <dd className="text-[#d6d6e2]">About an hour · Backend team</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
