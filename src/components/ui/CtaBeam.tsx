"use client";

import type { ReactNode } from "react";
import { BorderBeam } from "border-beam";

/**
 * A soft glow breathing inside the primary call to action. The beam clips its
 * wrapper, so the button's outer glow lives on `.cta-beam` instead.
 */
export default function CtaBeam({ children }: { children: ReactNode }) {
  return (
    <BorderBeam size="pulse-inner" colorVariant="ocean" theme="light" className="cta-beam">
      {children}
    </BorderBeam>
  );
}
