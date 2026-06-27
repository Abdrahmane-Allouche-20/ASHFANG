import Image from "next/image";
import { Linkedin, Twitter, Github } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

const SOCIALS = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "X" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line/60 bg-ink/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/logo-mark.png"
                alt="Cyngard"
                width={32}
                height={32}
                className="h-8 w-8 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              />
              <span className="font-display text-lg font-bold tracking-tight">Cyngard</span>
            </div>
            <p className="mt-4 text-sm text-muted">{SITE.tagline}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg glass-panel text-muted transition-colors hover:text-fg"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Navigate</h4>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-fg/80 transition-colors hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Contact</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-mono text-sm text-fg/80 transition-colors hover:text-fg"
                  >
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/60 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Cyngard. All rights reserved.</p>
          <p className="font-mono">Cybersecurity · Engineered</p>
        </div>
      </div>
    </footer>
  );
}
