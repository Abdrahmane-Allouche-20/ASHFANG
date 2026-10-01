"use client";

import type { ComponentProps } from "react";
import { BorderBeam } from "border-beam";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * border-beam behind a client boundary. Travelling beams ignore
 * prefers-reduced-motion on their own, so they are switched off here.
 */
export default function Beam({ active = true, ...props }: ComponentProps<typeof BorderBeam>) {
  const reduce = usePrefersReducedMotion();
  return <BorderBeam active={active && !reduce} {...props} />;
}
