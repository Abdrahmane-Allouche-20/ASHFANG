"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [51.5072, -0.1276], size: 0.05 }, // London
  { location: [48.8566, 2.3522], size: 0.05 }, // Paris
  { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
  { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
  { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
  { location: [36.7538, 3.0588], size: 0.06 }, // Algiers
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = 0;
    let raf = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.46, 0.4, 0.78],
      markerColor: [0.14, 0.83, 0.93],
      glowColor: [0.5, 0.36, 0.95],
      markers: MARKERS,
    });

    const frame = () => {
      if (pointerInteracting.current === null) phi += 0.004;
      globe.update({
        phi: phi + pointerMovement.current / 200,
        width: width * 2,
        height: width * 2,
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const fade = setTimeout(() => {
      canvas.style.opacity = "1";
    }, 60);

    return () => {
      clearTimeout(fade);
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[640px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000 [contain:layout_paint_size]"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerMovement.current = e.clientX - pointerInteracting.current;
          }
        }}
      />
    </div>
  );
}
