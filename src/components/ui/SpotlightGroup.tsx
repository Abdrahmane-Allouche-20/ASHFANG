"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tracks the pointer across a group of `.card[data-spot]` children and feeds
 * each card its local coordinates, so borders light up as the cursor passes —
 * including on neighbouring cards.
 */
export default function SpotlightGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${clientX - r.left}px`);
        card.style.setProperty("--my", `${clientY - r.top}px`);
      });
    });
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={cn("spot-group", className)}>
      {children}
    </div>
  );
}
