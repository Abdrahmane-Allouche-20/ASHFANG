"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PRODUCTS, SERVICE_CATEGORIES, SITE, servicesIn } from "@/lib/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/components/SmoothScroll";
import Logo from "@/components/ui/Logo";
import { LeakShieldMark, PhishNodeMark } from "@/components/products/ProductVisuals";

type Menu = "products" | "services" | null;

const LINKS = [
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileSection, setMobileSection] = useState<Menu>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setMenu(null);
    setOpen(false);
  }, [pathname]);

  const unlock = useCallback(() => {
    document.documentElement.style.removeProperty("overflow");
    document.querySelectorAll("main, footer").forEach((el) => el.removeAttribute("inert"));
    getLenis()?.start();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    unlock();
  }, [unlock]);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    document.querySelectorAll("main, footer").forEach((el) => el.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onWide = () => mq.matches && close();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
      unlock();
    };
  }, [open, close, unlock]);

  // Desktop dropdowns: open on hover/focus, close on Escape or leaving.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const enter = (m: Menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={leave}>
      <div
        data-scrolled={scrolled || open || menu !== null}
        className="nav-shell relative z-10 mx-auto grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link href="/" aria-label="Cynguard — home" className="justify-self-start rounded-full">
          <Logo priority />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {(["products", "services"] as const).map((m) => (
              <li key={m} onMouseEnter={() => enter(m)}>
                <button
                  type="button"
                  aria-expanded={menu === m}
                  aria-controls={`menu-${m}`}
                  onClick={() => setMenu(menu === m ? null : m)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[0.86rem] capitalize transition-colors",
                    menu === m || isActive(`/${m}`) ? "bg-fill-strong text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {m}
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-300", menu === m && "rotate-180")}
                  />
                </button>
              </li>
            ))}
            {LINKS.map((l) => (
              <li key={l.href} onMouseEnter={() => setMenu(null)}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-1.5 text-[0.86rem] transition-colors",
                    isActive(l.href) ? "bg-fill-strong text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <Link href="/contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
            Talk to an expert
            <ArrowRight size={15} className="btn-arrow" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative -mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-fg lg:hidden"
          >
            <span
              className={cn(
                "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-premium",
                open ? "rotate-45" : "-translate-y-[4px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-300 ease-premium",
                open ? "-rotate-45" : "translate-y-[4px]",
              )}
            />
          </button>
        </div>
      </div>

      {/* Desktop dropdown panels */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            id={`menu-${menu}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => enter(menu)}
            className="absolute inset-x-0 top-[4.5rem] hidden px-4 lg:block"
          >
            <div className="glass mx-auto max-w-[980px] rounded-2xl p-3">
              {menu === "products" ? <ProductsMenu /> : <ServicesMenu />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 lg:hidden"
          >
            <div className="absolute inset-0 bg-[rgba(7,7,11,0.97)] backdrop-blur-xl" onClick={close} aria-hidden />
            <nav aria-label="Mobile" className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24" data-lenis-prevent>
              <ul>
                {(["products", "services"] as const).map((m) => (
                  <li key={m} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={mobileSection === m}
                      onClick={() => setMobileSection(mobileSection === m ? null : m)}
                      className="flex w-full items-center justify-between py-5 text-left text-2xl font-medium capitalize tracking-tight"
                    >
                      {m}
                      <ChevronDown
                        size={20}
                        className={cn("text-subtle transition-transform duration-300", mobileSection === m && "rotate-180")}
                      />
                    </button>
                    {mobileSection === m && (
                      <ul className="space-y-1 pb-5">
                        {m === "products"
                          ? PRODUCTS.map((p) => (
                              <li key={p.slug}>
                                <Link href={p.href} onClick={close} className="block py-2 text-[15px] text-muted">
                                  {p.name} <span className="text-subtle">— {p.category}</span>
                                </Link>
                              </li>
                            ))
                          : SERVICE_CATEGORIES.map((c) => (
                              <li key={c.id} className="pt-2">
                                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{c.name}</p>
                                <ul className="mt-1">
                                  {servicesIn(c.id).map((s) => (
                                    <li key={s.slug}>
                                      <Link href={`/services/${s.slug}`} onClick={close} className="block py-1.5 text-[15px] text-muted">
                                        {s.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                        <li className="pt-2">
                          <Link href={`/${m}`} onClick={close} className="text-[14px] text-fg">
                            All {m} →
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
                {LINKS.map((l) => (
                  <li key={l.href} className="border-b border-line">
                    <Link href={l.href} onClick={close} className="block py-5 text-2xl font-medium tracking-tight">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-5 pt-10">
                <Link href="/contact" onClick={close} className="btn btn-primary btn-lg w-full">
                  Talk to an expert
                  <ArrowRight size={16} className="btn-arrow" />
                </Link>
                <a href={`mailto:${SITE.email}`} className="block text-center font-mono text-sm text-muted">
                  {SITE.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ProductsMenu() {
  return (
    <div className="grid grid-cols-[1fr_1fr_0.8fr] gap-2">
      {PRODUCTS.map((p) => (
        <Link key={p.slug} href={p.href} className="group rounded-xl p-4 transition-colors hover:bg-fill-strong">
          <div className="flex items-center gap-3">
            {p.slug === "phishnode" ? <PhishNodeMark className="h-8 w-8" /> : <LeakShieldMark className="h-8 w-8" />}
            <div>
              <p className="text-[15px] font-semibold text-fg">{p.name}</p>
              <p className="text-[12px] text-subtle">{p.category}</p>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">{p.tagline}</p>
        </Link>
      ))}
      <div className="flex flex-col justify-between rounded-xl border border-line bg-fill p-4">
        <p className="text-[13px] leading-relaxed text-muted">
          Our platforms power our managed services — and are available to your own teams.
        </p>
        <Link href="/products" className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-fg">
          All products <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {SERVICE_CATEGORIES.map((c) => (
        <div key={c.id} className="p-2">
          <p className="px-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle">{c.name}</p>
          <ul className="mt-2">
            {servicesIn(c.id).map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13.5px] text-muted transition-colors hover:bg-fill-strong hover:text-fg"
                  >
                    <Icon size={15} className="shrink-0 text-violet-soft" />
                    {s.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="col-span-3 flex items-center justify-between border-t border-line px-4 pt-3 text-[13px]">
        <span className="text-muted">Not sure what you need? We&apos;ll help you scope it.</span>
        <Link href="/services" className="inline-flex items-center gap-1.5 text-fg">
          All services <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
