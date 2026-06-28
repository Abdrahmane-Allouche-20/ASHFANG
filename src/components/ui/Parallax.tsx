"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked parallax. Drifts its content vertically as the element passes
 * through the viewport — used on decorative layers to create depth.
 * `speed` ~ how far it drifts (0.1 subtle … 0.4 strong).
 */
export default function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children?: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = speed * 220;
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className} aria-hidden>
      {children}
    </motion.div>
  );
}
