"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { SERVICES, type Service } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 180, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${px}% ${py}%, rgba(139,92,246,0.16), transparent 65%)`;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x);
    my.set(y);
    px.set(x * 100);
    py.set(y * 100);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const Icon = service.icon;
  const accent = service.accent === "violet" ? "text-violet" : "text-cyan";

  return (
    <Reveal delay={index * 0.06} className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="ring-gradient group relative h-full overflow-hidden rounded-2xl glass p-7 transition-shadow duration-500 hover:shadow-glow"
      >
        <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0" />
        <div style={{ transform: "translateZ(40px)" }} className="relative">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/10 ring-1 ring-white/10">
            <Icon size={22} className={accent} />
          </div>
          <h3 className="font-display text-xl font-semibold">{service.title}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.blurb}</p>
          <ul className="mt-5 space-y-2">
            {service.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-fg/80">
                <Check size={14} className={accent} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">01 / What we do</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          Full-spectrum <span className="text-gradient">security</span>
        </h2>
        <p className="mx-auto mt-4 text-muted">
          Offense, defense, and secure engineering — the complete coverage most companies stitch
          together from three vendors, delivered by one team.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <TiltCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
