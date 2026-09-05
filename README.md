# Novi — Landing Page

A landing page for **Novi**, a project and task management tool for small,
fast-moving teams.

Built by [Laxman Jonchhen](https://github.com/LaxmanJonchhen12) as a frontend
assessment.

**Live preview:** https://novi-landing-neon.vercel.app/

Design and engineering rationale is in **[DECISIONS.md](DECISIONS.md)**.

---

## Quick start

Requires **Node 20+** and **pnpm**.

```bash
git clone https://github.com/LaxmanJonchhen12/novi-landing.git
cd novi-landing
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Lint |
| `pnpm exec tsc --noEmit` | Type-check |

---

## Lighthouse

Measured against `pnpm build && pnpm start`, not the dev server.

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **100** | **100** | **100** | **100** |
| Mobile (throttled) | **99** | **100** | **100** | **100** |

Cumulative Layout Shift **0** and Total Blocking Time **0 ms** on both.

---

## Stack

| Choice | Why |
|---|---|
| **Next.js 16** (App Router) | Server Components by default. Only four components ship JavaScript: the header's scroll observer, the mobile menu, the scroll-reveal wrapper, and the signup form. |
| **TypeScript** | All page copy is typed data in `src/content/`, so content and presentation stay separate and a missing field fails the build. |
| **Tailwind CSS v4** | CSS-first config. The design system lives in `globals.css` as CSS variables — one source of truth, no `tailwind.config.js`. |
| **Base UI** | Used directly for the mobile menu dialog (focus trap, Escape, scroll lock). See DECISIONS.md for why not shadcn/ui. |
| **Geist** via `next/font` | Self-hosted at build. No external font request, no layout shift. |
| **No animation library** | Entrance choreography and scroll reveals are CSS keyframes plus a ~30-line `IntersectionObserver` hook. A ~34kB library would have been the wrong trade. |

---

## Design system

Defined once in [`src/app/globals.css`](src/app/globals.css) and consumed through
Tailwind utilities, so no component hardcodes a colour.

| Token | Value | Used for |
|---|---|---|
| `--background` | `#F8F8F5` | Page surface |
| `--foreground` | `#181A1B` | Primary text |
| `--muted-foreground` | `--foreground` @ 65% | Subheads, labels |
| `--accent` | `#1E7B9C` | Primary action, emphasis |
| `--border` | `--foreground` @ 12% | Thin 1px rules |
| `--radius` | `0.75rem` | Corner radius throughout |

Variables use shadcn/ui's naming convention so that library could be added later
without rewriting the token layer.

The visual direction is deliberately calm — generous whitespace, thin borders, a
single accent, no gradients or heavy shadows. Novi's own pitch is a workspace
that stays out of the way, and the page argues that by looking like it.

**There is no dark mode, on purpose** — see DECISIONS.md.

---

## Responsiveness

Verified at every step across the full range, not just at one mobile and one
desktop breakpoint:

`320` · `375` · `430` · `768` · `1024` · `1440` · `1920` · `2560`

- Type scales with `clamp()` rather than jumping at breakpoints.
- Content is width-capped at `80rem` so it stays readable on large monitors
  while the background remains full-bleed.
- The hero board becomes a horizontal snap-scroll carousel below `768px`
  rather than stacking three columns vertically.

---

## Project structure

```
src/
  app/
    globals.css          Design tokens, keyframes, reduced-motion rules
    layout.tsx           Root layout, fonts, metadata, skip link
    page.tsx             Section composition
    not-found.tsx        404
    opengraph-image.tsx  Social card, generated at build
  components/
    layout/              Header: scroll shell, mobile menu
    sections/            Hero, board, features, how it works, pricing, footer
    ui/                  Button, Container, Section, Reveal, Logo
  content/               All page copy as typed data
  hooks/                 useReveal (IntersectionObserver)
  lib/                   cn helper
```

---

## Accessibility

- Every interactive element has a visible focus indicator meeting the 3:1
  requirement for non-text contrast.
- Skip link to `#main` as the first focusable element.
- Mobile menu traps focus, closes on Escape, and returns focus to its trigger.
- All colour pairings meet WCAG AA (see DECISIONS.md for the measurements).
- Motion respects `prefers-reduced-motion`.
- Content is fully visible with JavaScript disabled, including the signup form,
  which uses a Server Action.
