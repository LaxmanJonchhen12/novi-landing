# Novi — Landing Page

A landing page for **Novi**, a project and task management tool for small,
fast-moving teams.

Built by [Laxman Jonchhen](https://github.com/LaxmanJonchhen12) as a frontend
assessment.

**Live preview:** _connecting deployment — link to follow_

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

## Stack

| Choice | Why |
|---|---|
| **Next.js 16** (App Router) | Server Components by default — the static parts of a landing page ship no JavaScript. `"use client"` is used only on the interactive leaves. |
| **TypeScript** | Page content is typed data rather than hardcoded JSX, so content and presentation stay separate. |
| **Tailwind CSS v4** | CSS-first config. The design system lives in `globals.css` as CSS variables — one source of truth, no `tailwind.config.js` needed. |
| **Geist** via `next/font` | Self-hosted at build time. No external font request, no layout shift on load. |
| **CSS animations** (no animation library) | The page needs entrance choreography and scroll reveals, not physics or gestures. A ~34kB animation library would be the wrong trade; CSS keyframes plus a small `IntersectionObserver` hook ship zero extra JS. |

---

## Design system

Defined once in [`src/app/globals.css`](src/app/globals.css) and consumed
everywhere through Tailwind utilities, so no component hardcodes a hex value.

| Token | Value | Used for |
|---|---|---|
| `--background` | `#F8F8F5` | Page surface |
| `--foreground` | `#181A1B` | Primary text |
| `--muted-foreground` | `--foreground` @ 60% | Subheads, labels |
| `--accent` | `#2596BE` | Primary action, emphasis |
| `--border` | `--foreground` @ 12% | Thin 1px rules |
| `--radius` | `0.75rem` | Corner radius throughout |

Variables use shadcn/ui's naming convention so the component library can be
added later without rewriting the token layer.

The visual direction is deliberately calm — generous whitespace, thin borders,
a single accent, no gradients or heavy shadows. Novi's own pitch is a workspace
that stays out of the way, and the page is meant to argue that by looking like
it.

**There is no dark mode, on purpose.** The brief specifies one calm surface;
a theme that shifts with the OS would work against that.

---

## Responsiveness

Verified at each step across the full range, not just at a mobile and a desktop
breakpoint:

`320px` · `390px` · `430px` · `768px` · `1024px` · `1440px` · `1920px` · `2560px`

Type scales fluidly with `clamp()` rather than jumping at breakpoints, and
content is width-capped so it stays readable on large monitors while the
background remains full-bleed.

---

## Project structure

```
src/
  app/
    globals.css     Design tokens + Tailwind entry
    layout.tsx      Root layout, fonts, metadata
    page.tsx        Landing page composition
```

_This section grows as sections are built._

---

## Notes

Design and technical decisions are documented in
[`DECISIONS.md`](DECISIONS.md) _(added before submission)_.
