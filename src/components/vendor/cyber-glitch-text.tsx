"use client";

// Ported from VengeanceUI (Ashutoshx7/VengeanceUI) — CyberGlitchText.
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

const CHARS = "!<>-_\\/[]{}—=+*^?#_";

interface CyberGlitchTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  scrambleDuration?: number;
}

export function CyberGlitchText({
  text,
  className,
  scrambleOnMount = true,
  scrambleDuration = 45,
}: CyberGlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, scrambleDuration);
  };

  useEffect(() => {
    if (scrambleOnMount) scramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, scrambleOnMount]);

  return (
    <span
      className={cn("group relative inline-block", className)}
      onMouseEnter={() => {
        setIsHovered(true);
        scramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{displayText}</span>

      {isHovered && (
        <>
          <motion.span
            className="absolute left-[-2px] top-0 z-0 text-rose-500 opacity-70 mix-blend-screen"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [-2, 2, -1, 3, 0], opacity: [0, 0.8, 0.4, 0.9, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute left-[2px] top-0 z-0 text-cyan opacity-70 mix-blend-screen"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [2, -2, 1, -3, 0], opacity: [0, 0.8, 0.4, 0.9, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: 0.05 }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>
        </>
      )}
    </span>
  );
}

export default CyberGlitchText;
