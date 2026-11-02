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
        background: "linear-gradient(90deg, #db0210, #c0c0c0 60%, #db0210)",
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left"
    />
  );
}
