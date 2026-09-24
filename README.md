# Cyngard — Landing Page

The official landing site for **Cyngard** — a cybersecurity company delivering offensive testing, defensive solutions, and secure development.

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
  app/                 layout, page, global styles, icons, Open Graph image
  components/
    Nav.tsx            condensing glass nav + accessible mobile menu
    hero/              hero + animated sample-engagement console
    sections/          Services, Manifesto, Why Cyngard, Approach, FAQ, CTA, Contact, Footer
    ui/                shared primitives (Reveal, SectionHeading, SpotlightGroup, Globe, Logo)
  lib/site.ts          all site copy: services, FAQ, stats, contact details, socials
```

Most copy changes only need `src/lib/site.ts`. Social links in the footer appear once a URL is added to `SOCIALS` there.

## Brand

| Token | Value |
| --- | --- |
| Base | `#07070B` |
| Violet (primary) | `#8B5CF6` |
| Cyan (secondary) | `#22D3EE` |
| Fonts | Geist · Instrument Serif (accents) · Geist Mono |

Contact: `cyngard.support@gmail.com`
