"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        background: "linear-gradient(90deg, #8b5cf6, #22d3ee 60%, #a78bfa)",
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left"
    />
  );
}
