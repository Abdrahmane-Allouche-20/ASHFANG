"use client";

// Adapted from VengeanceUI (Ashutoshx7/VengeanceUI) — CyberGlitchText.
// Kept the clean scramble/decode effect; removed the chromatic-aberration ghost
// layers (they misaligned over a large multi-line headline word).
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const CHARS = "!<>-_\\/[]{}—=+*^?#_:.";

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
      className={cn("inline-block whitespace-nowrap tabular-nums", className)}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
}

export default CyberGlitchText;
