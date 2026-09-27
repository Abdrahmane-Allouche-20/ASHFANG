import { ArrowUp, ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { NAV_LINKS, PRODUCTS, SERVICES, SITE, SOCIALS } from "@/lib/site";
import Logo from "@/components/ui/Logo";

const SOCIAL_ICONS = { LinkedIn: Linkedin, X: Twitter, GitHub: Github };

export default function Footer({ base = "" }: { base?: string }) {
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(139,92,246,0.14),transparent_70%)]" />

      <div className="container-page grid grid-cols-1 gap-12 pb-10 pt-16 sm:grid-cols-2 md:pt-20 lg:grid-cols-[1.3fr_0.8fr_1.1fr_0.8fr_1.1fr] lg:gap-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
            An international cybersecurity company. {SITE.tagline}
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-[rgba(255,255,255,0.22)] hover:text-fg"
                    >
                      <Icon size={15} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <FooterColumn title="Products">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <a href={p.href} className="footer-link">
                {p.name}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a href={`${base}#${s.id}`} className="footer-link">
                {s.title}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {NAV_LINKS.slice(2).map((l) => (
            <li key={l.href}>
              <a href={base + l.href} className="footer-link">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </li>
        </FooterColumn>

        <FooterColumn title="Get in touch">
          <li>
            <a href={`mailto:${SITE.email}`} className="footer-link font-mono text-[13px]">
              {SITE.email}
            </a>
          </li>
          <li>
            <a href="#contact" className="group inline-flex items-center gap-1.5 text-[14px] text-fg">
              Book a free assessment
              <ArrowUpRight size={14} className="text-violet-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="container-page">
        <div className="divider-x" />
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-[12.5px] text-subtle sm:flex-row">
          <p>© {new Date().getFullYear()} Cyngard. All rights reserved.</p>
          <p className="font-mono tracking-[0.08em]">CYBERSECURITY · ENGINEERED</p>
          <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.2em] text-center font-display text-[18.5vw] font-semibold leading-[0.9] tracking-[0.06em] text-[transparent] [-webkit-background-clip:text] [background-clip:text] bg-[linear-gradient(180deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.02)_70%,transparent)] xl:text-[15rem]">
          CYNGARD
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}
