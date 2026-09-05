# Design and technical decisions

Notes on why this is built the way it is. Written for whoever reviews it —
the trade-offs are more interesting than the code.

---

## Content came before layout

The brief supplies suggested copy. I wrote my own instead, because the copy is
where a product's point of view lives and the suggested lines are feature
labels rather than arguments.

> Brief: *"Threads, not another inbox."*
> Mine: *"Decisions stay on the ticket — the reasoning, the objection, the
> final call, all attached to the task, still there six months later."*

Everything the page says is typed data in `src/content/`. Sections render
content; they never contain it. Icons and colours are stored as semantic keys
(`icon: "sprints"`, `tone: "amber"`) and resolved to components in the
presentation layer, so the content files import no React at all and could be
swapped for a CMS without touching a component.

One consequence worth calling out: column counts on the board are derived from
`cards.length`, never stored. The original prototype had a hardcoded `2` next
to a column showing one card.

---

## The hero board is the argument

The headline is *"Work moves."* A static screenshot underneath it would
undercut the claim, so the board is real DOM that animates into place — five
cards with a staggered reveal continuing the hero's own entrance timing, an
active card marked with the accent, and a status dot that breathes.

**It is deliberately not draggable.** Real drag-and-drop needs pointer-event
state management or a library, and a half-working drag interaction reads worse
than none. The motion demonstrates the claim; interactivity beyond that would
have been scope for its own sake.

The whole board is a Server Component — it ships zero JavaScript.

---

## Motion budget

The signature of a generated page is a fade-up on every element. I kept a
deliberate count instead: hero entrance, board card stagger, the breathing
status dot, hover states, the nav's scroll transition, and scroll reveals on
exactly two sections — features and how-it-works. Pricing and the footer are
destinations, not experiences, and don't animate.

No animation library. The page needs entrance choreography and scroll reveals,
not physics or gestures; CSS keyframes plus a small `IntersectionObserver` hook
do that with zero added bundle.

`prefers-reduced-motion` is handled globally rather than per-component, so any
animation added later is covered without revisiting this.

---

## Restraint as a position

The palette is two neutrals and one accent. No gradients, no heavy shadows,
1px borders. Novi's pitch is "less system, more shipped" — a page selling that
shouldn't look like the dense dashboards it's arguing against.

**No dark mode, deliberately.** It isn't in the brief, it doubles the QA matrix
to sixteen combinations (eight widths × two themes), and the board's pastel
category tags would need a designed dark variant rather than an inversion. A
half-correct dark mode would cost more than it gained. The token layer is
theme-ready anyway — `--muted-foreground` and `--border` derive from
`--foreground` via `color-mix()` — so adding it later is a `[data-theme]`
block, not a refactor.

**Neither pricing tier is featured.** The section says "Two plans. Both include
everything" and "we don't gate the basics to sell you an upgrade." Giving the
paid tier an accent border would have the design contradicting the sentence
directly above it.

---

## The design system failed WCAG, so it changed

I measured the palette rather than trusting it, and three pairings failed:

| | Before | After |
|---|---|---|
| Button label on accent | 3.19:1 | **4.52:1** |
| Small accent text | 3.19:1 | **4.52:1** |
| Muted body text | 4.47:1 | **5.28:1** |
| Focus rings | 1.84:1 | **4.52:1** |

The accent moved from `#2596BE` to `#1E7B9C` — same hue, darkened until white
text on it clears AA. Muted text went from 60% to 65% opacity. Focus rings were
at 45% opacity, which is 1.84:1 against the background when WCAG 1.4.11 needs
3:1 — a focus ring a keyboard user can't see is worse than no ring.

Verified by tabbing the page with real key events: every stop has a visible
indicator, the order matches the visual order, and the mobile menu traps focus,
closes on Escape, and returns focus to its trigger.

---

## Progressive enhancement, not just for show

The signup uses a Server Action rather than a client fetch, so the form still
works with JavaScript disabled — verified by disabling JS entirely and driving
real mouse and keyboard events. Server-side validation is deliberately stricter
than the browser's `type="email"` (which accepts `a@b`), so the error path is
reachable rather than dead code.

The same principle governs the scroll reveals: content is visible by default
and only hidden after the client explicitly arms the animation. Hiding by
default and revealing with JavaScript would leave a no-JS visitor with blank
sections. With JS off, everything is simply there.

---

## Why not shadcn/ui

I started with it. `shadcn init` overwrote the entire token layer — the accent
became grey, a `.dark` block appeared, the radius changed, and roughly thirty
unused tokens (chart, sidebar, popover) were added. Its generated Button was
also wrong for this page: 32px tall, below comfortable tap-target size, with
`dark:` classes throughout and references to five semantic colours this system
doesn't have.

Rather than fight a token layer built for a full application UI, I used **Base
UI** directly — the primitive library shadcn is itself built on — for the
mobile menu's focus management, and wrote the two components I actually needed.

---

## Responsiveness

Checked at eight widths from 320 to 2560 at every step, not once at the end.
Type scales fluidly with `clamp()`; content caps at `80rem` so it doesn't
stretch on a large monitor.

Two bugs this caught that a two-breakpoint check would have missed:

**Section spacing was double-counted.** Components were paying for the gap that
the next section's padding already provided, producing a 221px void at desktop.
`Section` now owns top padding only, so every gap on the page comes from one
place.

**Scroll-snap ate the carousel's padding.** On mobile the board's first card sat
flush against the frame edge despite `padding-left: 16px` computing correctly.
A scroll-snap container resolves its resting scroll position to the first snap
target's own edge, scrolling past any leading space — padding, margin, and a
spacer element all failed identically. The fix is `scroll-margin`, which is the
property snap alignment actually consults.

---

## Known limitations

Being explicit about these rather than leaving them to be discovered:

- **Footer links point to `#`.** Novi is fictional; there's no Careers page to
  link to. Nav links and hero CTAs all resolve to real sections — those are the
  ones a reviewer will click.
- **No backend behind the signup.** The Server Action validates and responds;
  connecting a real provider would be the only change.
- **The board isn't draggable** — a deliberate scope decision, explained above.
- **No test suite.** For a static marketing page on this timeline I put the
  effort into measured verification instead: Lighthouse, contrast maths, and
  scripted keyboard/no-JS checks. A component test suite would be the first
  thing I'd add if this grew.

---

## On AI assistance

Veel's guidance was that AI could be used in moderation, so to be straight
about how: I used Claude Code as a pair-programming tool throughout — for
implementation speed, and for verification work like the WCAG contrast
measurements, the scroll-snap diagnosis, and the scripted keyboard and no-JS
testing above.

The direction was mine. The headline and feature copy came out of my own
research before any code existed, as did the locked design system. Where there
was a real choice — dropping dark mode, not featuring a pricing tier, keeping
the board choreographed rather than draggable, the layout of each section — I
made the call and can explain the reasoning behind each one. Copy for the
how-it-works and pricing sections was drafted with AI against my brief and
edited by me.

Every commit in this repository was reviewed and written by me, and I'm happy
to walk through any line of it.
