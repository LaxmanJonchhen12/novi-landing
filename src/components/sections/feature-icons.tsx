import { Check } from "lucide-react";

import type { FeatureIcon, Tone } from "@/content/types";

import { TONE_STYLES } from "./board-tone";

/**
 * Resolves the content layer's semantic keys to small product visuals.
 *
 * Phase 2 (elevation pass): these replaced a single lucide icon per card.
 * A generic icon-in-a-square is the one block on the page that could belong
 * to any SaaS product; these four are built from the same shapes and pastel
 * tones the real board above already uses (`TONE_STYLES`), so the features
 * section reads as more of *this* product instead of an icon library.
 *
 * All four are static markup — no new animation, no new colours. Each fills
 * a fixed-height slot the card provides (see `Features`), so the 2x2 grid
 * stays visually aligned regardless of which shape a given visual draws.
 */
export const FEATURE_VISUALS: Record<FeatureIcon, React.ComponentType> = {
  board: BoardFragment,
  sprints: SprintTimeline,
  threads: ThreadSnippet,
  setup: SetupChecklist,
};

/** "The whole board, one glance" — a shrunken echo of the real board above. */
function BoardFragment() {
  return (
    <div className="flex h-full items-stretch gap-1.5">
      <MiniColumn tones={["violet", "amber"]} />
      <MiniColumn tones={["sky"]} />
      <MiniColumn tones={["green", "violet"]} />
    </div>
  );
}

function MiniColumn({ tones }: { tones: Tone[] }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-1 rounded-md border border-border bg-background p-1.5">
      {tones.map((tone, i) => (
        <span key={i} className={`h-2 rounded-sm ${TONE_STYLES[tone].pill}`} />
      ))}
    </div>
  );
}

/** "Sprints planned in place" — a week strip with today's progress filled in. */
function SprintTimeline() {
  const days = 7;
  const daysDone = 4;

  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: days }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-sm ${i < daysDone ? "bg-accent" : "bg-foreground/8"}`}
          />
        ))}
      </div>
      <span className="h-2 w-1/3 rounded-full bg-foreground/10" />
    </div>
  );
}

/**
 * "Decisions stay on the ticket" — a condensed comment thread: a message, a
 * reply, and the final call (accent) landing right on it. This is the one
 * visual that doesn't just illustrate its feature — it's the literal proof
 * of the "no decision buried in a thread" line above the section.
 */
function ThreadSnippet() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <ThreadLine tone="bg-sky-200" width="w-4/5" />
      <ThreadLine tone="bg-amber-200" width="w-3/5" indent />
      <ThreadLine tone="bg-accent" width="w-2/5" indent accent />
    </div>
  );
}

function ThreadLine({
  tone,
  width,
  indent,
  accent,
}: {
  tone: string;
  width: string;
  indent?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${indent ? "pl-5" : ""}`}>
      <span className={`size-3.5 shrink-0 rounded-full ${tone}`} />
      <span className={`h-2 rounded-full ${width} ${accent ? "bg-accent/60" : "bg-foreground/10"}`} />
    </div>
  );
}

/** "Set up in an afternoon" — defaults that are already switched on. */
function SetupChecklist() {
  const rows = ["w-4/5", "w-3/5", "w-2/5"];

  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      {rows.map((width, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            aria-hidden
            className="grid size-3.5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
          >
            <Check className="size-2.5" strokeWidth={3} />
          </span>
          <span className={`h-2 rounded-full bg-foreground/10 ${width}`} />
        </div>
      ))}
    </div>
  );
}
