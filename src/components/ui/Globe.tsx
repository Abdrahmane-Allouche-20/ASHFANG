"use client";

import { useEffect, useRef } from "react";
import type { Globe as CobeGlobe } from "cobe";
import { cn } from "@/lib/cn";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [40.7128, -74.006], size: 0.045 }, // New York
  { location: [37.7749, -122.4194], size: 0.035 }, // San Francisco
  { location: [51.5072, -0.1276], size: 0.035 }, // London
  { location: [48.8566, 2.3522], size: 0.035 }, // Paris
  { location: [36.7538, 3.0588], size: 0.045 }, // Algiers
  { location: [25.2048, 55.2708], size: 0.035 }, // Dubai
  { location: [1.3521, 103.8198], size: 0.035 }, // Singapore
  { location: [35.6762, 139.6503], size: 0.045 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.035 }, // Sydney
];

/** WebGL globe (cobe). Renders only while on screen; loaded lazily on the client. */
export default function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ start: number | null; offset: number }>({ start: null, offset: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let destroyed = false;
    let visible = false;
    let raf = 0;
    let phi = 4.2;
    let width = canvas.offsetWidth;
    let globe: CobeGlobe | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Only animate while the globe is on screen.
    const frame = () => {
      if (!globe) return;
      if (!reduce && drag.current.start === null) phi += 0.0022;
      globe.update({ phi: phi + drag.current.offset / 220, width: width * dpr, height: width * dpr });
      raf = requestAnimationFrame(frame);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (visible && globe) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        play();
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    window.addEventListener("resize", onResize);

    import("cobe").then(({ default: createGlobe }) => {
      if (destroyed) return;
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.3, 0.27, 0.5],
        markerColor: [0.4, 0.88, 0.98],
        glowColor: [0.33, 0.24, 0.72],
        markers: MARKERS,
      });
      canvas.style.opacity = "1";
      play();
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      globe?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "aspect-square w-full cursor-grab opacity-0 transition-opacity duration-1000 [contain:layout_paint_size] active:cursor-grabbing",
        className,
      )}
      onPointerDown={(e) => {
        drag.current.start = e.clientX - drag.current.offset;
      }}
      onPointerUp={() => {
        drag.current.start = null;
      }}
      onPointerLeave={() => {
        drag.current.start = null;
      }}
      onPointerMove={(e) => {
        if (drag.current.start !== null) drag.current.offset = e.clientX - drag.current.start;
      }}
    />
  );
}
