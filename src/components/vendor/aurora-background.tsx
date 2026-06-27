"use client";

// Aurora background — adapted from VengeanceUI (Ashutoshx7/VengeanceUI) AuroraHero.
// Reworked into a standalone, dark-theme background tuned to the Cyngard palette.
import { cn } from "@/lib/cn";

export default function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <style>{`
        @keyframes ven-aurora-move {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        .ven-aurora {
          position: absolute;
          inset: -10%;
          --stripes: repeating-linear-gradient(
            100deg,
            #08080f 0%, #08080f 7%,
            transparent 10%, transparent 12%,
            #08080f 16%
          );
          --rainbow: repeating-linear-gradient(
            100deg,
            #8b5cf6 10%,
            #e879f9 16%,
            #60a5fa 22%,
            #22d3ee 27%,
            #8b5cf6 33%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: blur(24px) saturate(155%);
          opacity: 0.5;
          mask-image: radial-gradient(ellipse 105% 95% at 50% 22%, #000 45%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 105% 95% at 50% 22%, #000 45%, transparent 85%);
        }
        .ven-aurora::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: ven-aurora-move 60s linear infinite;
          opacity: 0.55;
        }
        @media (prefers-reduced-motion: reduce) {
          .ven-aurora::after { animation: none; }
        }
      `}</style>
      <div className="ven-aurora" />
    </div>
  );
}
