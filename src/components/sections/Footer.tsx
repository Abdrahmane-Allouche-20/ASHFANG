import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { PRODUCTS, SERVICES, SITE, SOCIALS } from "@/lib/site";
import Logo from "@/components/ui/Logo";

const SOCIAL_ICONS = { LinkedIn: Linkedin, X: Twitter, GitHub: Github };
const FEATURED_SERVICES = ["managed-soc", "penetration-testing", "secure-code-review", "incident-response", "phishing-protection"];

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href);

  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(139,92,246,0.12),transparent_70%)]" />

      <div className="container-page grid grid-cols-1 gap-12 pb-10 pt-16 sm:grid-cols-2 md:pt-20 lg:grid-cols-[1.4fr_0.9fr_1.2fr_0.8fr_1.1fr] lg:gap-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
            An international cybersecurity company building security products and delivering expert
            services to organizations worldwide.
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
              <Link href={p.href} className="footer-link">
                {p.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/products" className="footer-link">
              All products
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Services">
          {FEATURED_SERVICES.map((slug) => {
            const s = SERVICES.find((x) => x.slug === slug)!;
            return (
              <li key={slug}>
                <Link href={`/services/${slug}`} className="footer-link">
                  {s.title}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/services" className="footer-link">
              All services
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Company">
          <li>
            <Link href="/company" className="footer-link">
              About Cynguard
            </Link>
          </li>
          <li>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="footer-link">
              Privacy
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Get in touch">
          <li>
            <a href={`mailto:${SITE.email}`} className="footer-link font-mono text-[13px]">
              {SITE.email}
            </a>
          </li>
          <li>
            <Link href="/contact" className="group inline-flex items-center gap-1.5 text-[14px] text-fg">
              Talk to an expert
              <ArrowUpRight size={14} className="text-violet-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        </FooterColumn>
      </div>

      <div className="container-page">
        <div className="divider-x" />
        <div className="flex flex-col items-center justify-between gap-4 py-7 text-[12.5px] text-subtle sm:flex-row">
          <p>© {new Date().getFullYear()} Cynguard. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
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
