"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * framer-motion's useReducedMotion, but `false` until mounted so the first
 * client render matches the server markup (no hydration mismatch).
 */
export function usePrefersReducedMotion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
