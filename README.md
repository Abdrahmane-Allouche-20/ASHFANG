# Cyngard — Landing Page

The official website of **Cyngard** — an international cybersecurity company building PhishNode and LeakShield and delivering managed SOC, penetration testing, code review, and security engineering.

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

## Products

| Product | What it does | Live |
| --- | --- | --- |
| PhishNode | Phishing reporting, enrichment, and triage platform | https://phishnode.org |
| LeakShield | Offline secret and credential leak scanner | https://leakshield.vercel.app |

## Brand

| Token | Value |
| --- | --- |
| Base | `#07070B` |
| Violet (primary) | `#8B5CF6` |
| Cyan (secondary) | `#22D3EE` |
| Fonts | Geist · Instrument Serif (accents) · Geist Mono |

Contact: `cyngard.support@gmail.com`
