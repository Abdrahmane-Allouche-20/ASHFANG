"use client";

import { ThinkingOrb, type OrbState } from "thinking-orbs";

/**
 * Inline orb for "the platform is working" states in product views.
 * Decorative: the adjacent text names the activity. Ink is pinned to dark
 * because the site is dark-only, whatever the visitor's OS theme.
 */
export default function StatusOrb({ state = "searching", className }: { state?: OrbState; className?: string }) {
  return <ThinkingOrb state={state} size={20} theme="dark" aria-hidden="true" className={className} />;
}
