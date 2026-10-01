# Cynguard — Landing Page

The official website of **Cynguard** — an international cybersecurity company building PhishNode and LeakShield and delivering managed SOC, penetration testing, code review, and security engineering.

> Think like an attacker. Defend like an engineer.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css`
- **Framer Motion** — reveals, scroll-linked motion, micro-interactions
- **cobe** — lightweight WebGL globe
- **Lenis** — smooth scroll

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Structure

```
src/
  app/
    page.tsx                 home
    products/                products overview, /phishnode, /leakshield
    services/                services catalog + /services/[slug] detail pages
    company/  contact/  privacy/
    layout.tsx               shared nav + footer, metadata, fonts
  components/
    Nav.tsx                  Products / Services dropdowns + mobile menu
    home/  products/  layout/  sections/  ui/
  lib/site.ts                all site copy: services, products, FAQ, contact details
```

Most content changes only need `src/lib/site.ts` — adding a service there creates its page
automatically. Footer social links appear once a URL is added to `SOCIALS`.

## SEO & discoverability

- Canonical origin comes from `NEXT_PUBLIC_SITE_URL` (set it when a custom domain goes live);
  otherwise Vercel's production URL is used.
- Search-console verification: set `GOOGLE_SITE_VERIFICATION` and/or `BING_SITE_VERIFICATION`
  (the token from each console's "HTML tag" method) in the Vercel environment.
- Headquarters (Poland) lives in `HEADQUARTERS` in `src/lib/site.ts`; adding the `city` there
  updates the structured data, `geo.*` tags, and `/llms.txt`.
- Generated: `/sitemap.xml`, `/robots.txt` (search engines and AI crawlers allowed),
  `/manifest.webmanifest`, `/opengraph-image`, and `/llms.txt` + `/llms-full.txt` —
  plain-text summaries for AI assistants, built from `src/lib/site.ts`.
- Structured data (schema.org): Organization (with headquarters address), WebSite, Service,
  SoftwareApplication, BreadcrumbList, FAQPage (home and every service page), AboutPage, and
  ContactPage — see `src/lib/seo.ts`.
- Share images: a site-wide card plus one per service and product, rendered by `src/lib/og.tsx`.

## Products

| Product | What it does | Live |
| --- | --- | --- |
| PhishNode | Phishing reporting, enrichment, and triage platform | https://phishnode.org |
| LeakShield | Data-breach and OSINT monitoring platform | — |

## Brand

| Token | Value |
| --- | --- |
| Base | `#07070B` |
| Violet (primary) | `#8B5CF6` |
| Cyan (secondary) | `#22D3EE` |
| Fonts | Geist · Instrument Serif (accents) · Geist Mono |
| Logo | `public/brand/mark.svg` — icon only; the CYNGUARD wordmark is live text in `src/components/ui/Logo.tsx` |

Contact: `cyngard.support@gmail.com`
