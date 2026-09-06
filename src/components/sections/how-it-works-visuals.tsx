import { ArrowRight, Check } from "lucide-react";

import type { HowItWorksVisual } from "@/content/types";

/**
 * Small illustrations for each step — same idea as the feature cards'
 * mini visuals (`feature-icons.tsx`): built from the page's own shapes and
 * tones instead of another lucide icon-in-a-square.
 *
 * Deliberately NOT wrapped in a bordered box the way the feature visuals
 * are — this section's whole point (see `how-it-works.tsx`) is that it's
 * NOT another card grid. Giving these their own card frame would quietly
 * undo that. They sit unboxed under each step's text instead.
 */
export const HOW_IT_WORKS_VISUALS: Record<HowItWorksVisual, React.ComponentType> = {
  sources: SourcesVisual,
  plan: PlanVisual,
  ship: ShipVisual,
};

/** Step 1 — several outside tools converging into one place. */
function SourcesVisual() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex flex-col gap-1.5">
        <span className="h-2 w-8 rounded-full border border-border" />
        <span className="h-2 w-6 rounded-full border border-border" />
        <span className="h-2 w-7 rounded-full border border-border" />
      </div>
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5">
        <span className="block h-2 w-9 rounded-full bg-accent/50" />
      </span>
    </div>
  );
}

/** Step 2 — one item lifted out of the backlog into this week's plan. */
function PlanVisual() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1.5 opacity-40">
        <span className="h-2 w-9 rounded-full bg-foreground/40" />
        <span className="h-2 w-7 rounded-full bg-foreground/40" />
      </div>
      <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1.5">
        <span className="mb-1 block text-[9px] font-medium tracking-wide text-accent uppercase">
          This week
        </span>
        <span className="block h-2 w-11 rounded-full bg-accent/50" />
      </span>
    </div>
  );
}

/** Step 3 — the shipped card, with the thread that got it there still attached. */
function ShipVisual() {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
        <span className="h-2 w-14 rounded-full bg-foreground/15" />
        <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      </span>
      <span className="flex items-center gap-1.5 pl-3">
        <span className="size-2.5 shrink-0 rounded-full bg-sky-200" />
        <span className="h-1.5 w-10 rounded-full bg-foreground/10" />
      </span>
    </div>
  );
}
