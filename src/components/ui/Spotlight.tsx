"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A card that lights up with a glow following the cursor. */
export default function Spotlight({
  children,
  className,
  size = 420,
  color = "rgba(139,92,246,0.16)",
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${px}% ${py}%, ${color}, transparent 62%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width) * 100);
    py.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={cn("group relative", className)}>
      <motion.div
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
