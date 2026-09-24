"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { FAQS, SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-28 md:py-36">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="heading-lg mt-5">
            Questions, <span className="accent text-gradient">answered.</span>
          </h2>
          <p className="lede mt-5 max-w-sm">
            Straight answers about how we work. Anything else? Ask an engineer directly.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="group mt-7 inline-flex items-center gap-1.5 text-[15px] text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-violet-soft"
          >
            {SITE.email}
            <ArrowUpRight size={15} className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="border-t border-line">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <li key={f.q} className="border-b border-line">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span
                        className={cn(
                          "text-[1.0625rem] font-medium tracking-[-0.01em] transition-colors duration-300 sm:text-lg",
                          isOpen ? "text-fg" : "text-[#d6d6e2] group-hover:text-fg",
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-premium",
                          isOpen
                            ? "rotate-45 border-[rgba(167,139,250,0.5)] bg-[rgba(139,92,246,0.15)] text-violet-pale"
                            : "border-line-strong text-muted group-hover:text-fg",
                        )}
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
