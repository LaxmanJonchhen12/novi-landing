# Where this thesis actually came from

I've worked in a few different setups, and none of them got it fully right.

On one team, there was no process at all — no backlog grooming, no formal sprints, just developers and designers working in the same room. It worked in the moment, but there was no shared visibility into what was actually happening across the team.

On another team, there was full process — backlog grooming, sprint planning, retro, the works. But that came with its own cost: we needed separate tools just to run planning poker and retros (Sprint retro planning needed a tool like Retrium), on top of whatever we used for the actual board. Backlog grooming itself often ended up as informal talk between engineering and QA rather than something that lived on the same platform as the work.

I also did freelance work tracked entirely in docs. That was too loose to track properly, but going the other direction — creating and updating tickets under real time pressure — felt heavy for a fast-moving, one- or two-person job. And separately, when I've had to track multiple projects at once, needing separate analytics or separate views per project became its own kind of overhead.

So the belief driving this isn't "process is bad" — it's that too much process becomes its own job, and too little process loses visibility. Novi's thesis is the middle: one place that gives a team the visibility that formal process is trying to protect, without needing a stack of separate tools (planning poker tool, retro tool, spreadsheet, docs) to get there.

---

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

The board started as a Server Component shipping zero JavaScript — a
staggered one-time reveal on load, nothing more. That changed in the
elevation pass below: the headline says "Work moves," and a board that never
moves again after loading undercuts its own claim just as much as a static
screenshot would. See "Phase 2" for what replaced it and the real bug that
came with it.

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

## Phase 2 — the elevation pass

Steps 0–8 shipped a technically clean page: Lighthouse 100/100/100/100
desktop, WCAG AA verified by measurement, zero dead nav links, twelve
incremental commits. It was also forgettable. My own read and an independent
review agreed: engineering ~9/10, landing page ~6.5/10. A cold visitor opens
the deployed URL before the repo, and for the first thirty seconds the page
read as clean, competent, and generic — every genuinely strong decision was
sitting in code nobody skimming the site would ever see.

The fix wasn't a redesign. The calm/minimal system stays; every rule in
"Restraint as a position" above still holds. The brief was narrower: spend
the two design levers the system already had and had never used
(`--foreground` at low opacity as a full-bleed ground, and breaking the
page's total symmetry once), make the headline's central claim literally
true, and stop shipping dead buttons.

### The board moves — and a real bug that came with making it move

"Work moves." needed a board that does. Real drag-and-drop stayed out of
scope for the same reason as Phase 1 — pointer-event state or a library, and
a half-working drag reads worse than none — but the middle option between
"static" and "@dnd-kit" had never been offered: a slow, deliberate conveyor.
Every ~3.6s a card finishes and archives, or a fresh one arrives, cycling the
board's own five cards forever without ever reversing itself.

This is the one part of the page that had to become a Client Component, and
the honest cost is real: `board.ts`'s content plus the conveyor logic now
ship as JS, roughly 2KB gzipped. The animation itself is a hand-rolled FLIP
(`useFlip`, ~50 lines) over the Web Animations API rather than a library — a
card moving between columns is a full unmount/remount in React, which a CSS
`transition` can't tween, but reading a card's before/after position and
playing one `el.animate()` tween doesn't need Framer Motion either.

**The bug, and how it was actually caught.** A user report (not a code
review) was: reading the features section while the board animated above it,
the page moved under the cursor. I measured it rather than guessing —
sampling the board's rendered height over a full cycle in headless Chrome:

```
t=0.0s   board=312px  cols=[2,1,2]
t=2.7s   board=444px  cols=[1,1,3]   ← +132px
t=6.3s   board=312px  cols=[2,1,2]   ← back
```

The archive step (moving the oldest Done card off the board) ran a whole
tick *after* the finish that caused Done to grow, so Done legitimately held
three cards — and the page's own layout — for one full tick every cycle. The
fix folds the archive into the same state update as the finish that requires
it, so React never renders the three-tall intermediate at all. Re-measured
after: `352px` flat across the entire cycle, 0px swing. Also capped every
card title to two lines (`line-clamp-2` + `min-h-10`), since a swap between a
one-line and two-line title is the same class of bug at a smaller scale.

Two smaller fixes came out of the same pass: the conveyor used to run on a
free-floating interval, so scrolling to the board could land anywhere in an
invisible countdown before the first move — sometimes it looked static.
It's now tied to an `IntersectionObserver` that restarts a short (1.5s)
countdown every time the board actually enters view. And hover-pause was
restricted to `pointerType === "mouse"`: a phone tap fires `pointerenter`
without a matching `pointerleave`, which would have frozen the board for any
touch visitor on the first tap.

Respecting `prefers-reduced-motion` needed its own explicit check rather than
the site's global CSS rule, which collapses `animation-duration` — that rule
doesn't reach WAAPI, so a near-zero duration on a *looping* animation would
have been a strobe, the opposite of the intent. The board simply never
starts the loop under reduced motion. Verified by holding the page open 8s
under the media query and diffing the DOM: byte-identical.

### CTAs stopped being dead ends

"Start free," "Start a board," and "Start free trial" were all `href="#"` —
Interactions is a named grading criterion and the page shipped none beyond
hover and scroll. The fix isn't a fake signup form that "succeeds" into
nothing, which would be the same category of dishonesty the rest of the page
avoids (no invented metrics, no fake testimonials): all three now open one
shared dialog that says plainly this is a concept product built for an
assessment, with a link to this repository. It's the one thing this page's
actual audience — a reviewer — can use.

The buttons are real `<button>`s now, not anchors to nowhere, which is also
a correctness fix: `href="#"` was never right semantics for "open a dialog."
State lives in a small shared context (`CtaDialogProvider`) rather than four
copies of the same Dialog markup, which is what lets the mobile nav's own
CTA close its menu and open this dialog in the same tap without two dialogs
racing.

### The visual system, extended, not reinvented

The features section's four lucide icons were the most generic block on the
page. They're now mini illustrations built from the board's own shapes and
tones — a board fragment, a sprint timeline, a comment thread, a checklist —
so that section stopped looking like it could belong to any SaaS product.
The comment-thread visual does double duty: it's also the literal proof of
the new pain-naming copy above it ("no decision buried in a thread the board
never saw"), which is a stronger structure than three unrelated ideas.

How-it-works and pricing got the same treatment at smaller scale rather than
a new pattern: a slim, unboxed visual under each step (a card frame there
would have quietly turned the section back into the card grid it's
deliberately not), and a short check-row list under each pricing tier's
existing description — both tiers get exactly four, keeping the "neither
tier is featured" decision intact.

### One section, one break in the rhythm

Every section on the page was centered, on a flat ground, in the same
rhythm. Features now sits on a full-bleed `bg-foreground/[0.02]` band — the
same treatment the board's frame already used, just spent at section scale
for the first time. Only this one section; the brief was explicit that the
point is one change of rhythm, not a new pattern competing with the first.

**A real visual bug in the first version of this.** The tint was on the
outer `<section>` box, which is the same box that owns the gap between
sections — so the color began flush against the board's own border above it,
and ended flush against the last card's border below it. Screenshotted, both
edges read as a collision, not a deliberate zone. Fixed by moving the tint to
an inner wrapper with its own top/bottom padding, sitting *after* the
section's normal (unchanged) top-padding gap — so the color has genuine
breathing room on both sides, independent of the inter-section spacing rule.

### A hero that isn't flat

The hero was centred type on `--background` and nothing else. It now carries
a faint dot-grid — `radial-gradient`, 14% `--foreground`, on a 24px grid,
masked to fade out before the board. This is a defensible reading of "no
gradients": that rule targets the purple/indigo hero-wash anti-slop pattern,
not a neutral texture with no new colour and no photo. Pure CSS on the same
Server Component the hero already was — no client boundary added for it.

### Lighthouse, re-measured honestly

The numbers in the README were from before any of the above — a page with
zero client JS beyond the mobile menu and the signup form. Re-measured
against `pnpm build && pnpm start` after Phase 2:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **100** | **100** | **100** | **100** |
| Mobile (throttled) | **97** | **100** | **100** | **100** |

CLS is still **0** on both — the layout-shift bug above was caught and fixed
before it could show up here. Mobile Total Blocking Time moved from 0ms to
**10ms**: real, small, and explained by "Reduce unused JavaScript" flagging
~47KB in Next's own framework/hydration chunks, not application code — the
baseline cost of having any client component at all, present since Phase 1's
mobile menu and now shared by the board and the CTA dialog. I'd rather report
a real 97 than leave a stale 99 in the README.

---

## Known limitations

Being explicit about these rather than leaving them to be discovered:

- **Footer links point to `#`.** Novi is fictional; there's no Careers page to
  link to. Nav links and hero CTAs all resolve to real sections — those are the
  ones a reviewer will click.
- **No backend behind the signup**, or behind the CTA dialog. The Server
  Action validates and responds; the dialog says outright that this is a
  concept product. Connecting a real provider, or a real signup flow, would
  be the only change either way — neither pretends to be more than it is.
- **The board isn't draggable** — a deliberate scope decision, explained
  above. It does move on its own now (Phase 2); draggable interaction stays a
  different, larger scope than a slow conveyor.
- **No test suite.** For a static marketing page on this timeline I put the
  effort into measured verification instead: Lighthouse, contrast maths,
  scripted keyboard/no-JS checks, and — for the board's motion — sampling its
  rendered height in headless Chrome across a full animation cycle rather
  than eyeballing it. A component test suite would be the first thing I'd
  add if this grew.

---

## On AI assistance

Veel's guidance was that AI could be used in moderation, so to be straight
about how: I used Claude Code as a pair-programming tool throughout — for
implementation speed, and for verification work like the WCAG contrast
measurements, the scroll-snap diagnosis, and the scripted keyboard and no-JS
testing above. Phase 2 leaned on the same verification habit for a harder
problem: I reported the board's motion felt like it was shifting the page
under me, and rather than guess at a fix, the actual board height was sampled
in headless Chrome across a full cycle first — that's what turned "something
feels off" into an exact 132px, and later confirmed the fix at exactly 0px.
The tinted-section boundary bug the same way: I flagged the transition felt
like a collision, a screenshot at the exact boundary confirmed it, and the
fix was re-verified with another screenshot rather than taken on faith.

The direction was mine. The headline and feature copy came out of my own
research before any code existed, as did the locked design system. Where
there was a real choice — dropping dark mode, not featuring a pricing tier,
keeping the board choreographed rather than draggable, the honest-dialog CTA
over a fake signup, the layout of each section — I made the call and can
explain the reasoning behind each one. Copy for the how-it-works and pricing
sections, and the "second job" pain-naming line in Phase 2, was drafted with
AI against my brief and edited by me.

Every commit in this repository was reviewed and written by me, and I'm happy
to walk through any line of it.
