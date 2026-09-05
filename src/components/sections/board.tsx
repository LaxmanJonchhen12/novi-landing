import type { BoardCard, BoardColumn } from "@/content/types";
import { board } from "@/content/board";

import { TONE_STYLES } from "./board-tone";

/**
 * The hero's product visual. Server Component — every motion here is CSS:
 * cards rise into place with a staggered delay continuing the hero's own
 * entrance sequence (this sits above the fold as part of the hero, so an
 * on-load reveal is correct; a scroll-triggered one would never fire for
 * most viewports).
 *
 * Layout: a 3-column grid from `md:` up. Below that, columns become a
 * horizontal snap-scroll row — stacking three columns of cards vertically on
 * a phone would take several screens of scrolling before "Done" is visible.
 * Each column is sized to 85% of the viewport so the next one peeks in at
 * the edge, hinting there's more without a visible scrollbar.
 */
export function Board() {
  // Each column's stagger continues from the previous one's card count, so
  // the delay reflects the card's position across the WHOLE board — the eye
  // reads it as one reveal, not three columns each restarting from zero.
  // Prefix sums computed as a plain pure expression (no mutation during
  // render) — a running `let` here is exactly what React's Compiler forbids.
  const startIndexes = board.columns.reduce<number[]>((offsets, column, i) => {
    offsets.push(i === 0 ? 0 : offsets[i - 1] + board.columns[i - 1].cards.length);
    return offsets;
  }, []);

  return (
    <div
      className={[
        // No `gap` here — see comment below. py-4 for vertical spacing only.
        "flex overflow-x-auto py-4 scrollbar-none",
        // md+ isn't scrollable (grid, not flex), so `gap` is safe there.
        "snap-x snap-proximity md:grid md:gap-4 md:snap-none md:grid-cols-3 md:overflow-visible md:px-4",
        // Spacing between columns, and the leading inset, as MARGIN rather
        // than `gap` or `padding`. Measured and confirmed: a flex row that is
        // both `overflow-x: auto` and a scroll-snap container starts with a
        // non-zero `scrollLeft` on load — and it was consistently exactly the
        // row's `gap` value (16px), regardless of whether the inset itself
        // was padding, a margin, or an unsnapped spacer; each was tried in
        // turn and every one produced the identical scrollLeft:16 anomaly.
        // Removing `gap` from this row (kept for the non-scrolling md+ grid,
        // where it's unaffected) and doing spacing entirely with margin fixed
        // it — first column sits at the intended 16px, scrollLeft is 0.
        "*:mr-4 md:*:mr-0 [&>*:first-child]:ml-4 md:[&>*:first-child]:ml-0",
        // `scroll-margin`, not `margin`, is what a snap container consults
        // when computing where a snap target's aligned position actually is
        // — regular margin is invisible to that calculation, which is the
        // root cause below.
        "[&>*:first-child]:scroll-ml-4 md:[&>*:first-child]:scroll-ml-0",
        "[&>*:last-child]:scroll-mr-4 md:[&>*:last-child]:scroll-mr-0",
      ].join(" ")}
    >
      {board.columns.map((column, i) => (
        <Column key={column.id} column={column} startIndex={startIndexes[i]} />
      ))}
    </div>
  );
}

function Column({
  column,
  startIndex,
}: {
  column: BoardColumn;
  startIndex: number;
}) {
  return (
    <div className="flex w-[85%] shrink-0 snap-start flex-col gap-3 md:w-auto">
      <div className="flex items-center gap-2 px-1">
        <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {column.name}
        </h3>
        <span className="rounded-full bg-foreground/6 px-1.5 text-xs text-muted-foreground tabular-nums">
          {column.cards.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {column.cards.map((card, i) => (
          <Card key={card.id} card={card} delayMs={480 + (startIndex + i) * 60} />
        ))}
      </div>
    </div>
  );
}

function Card({ card, delayMs }: { card: BoardCard; delayMs: number }) {
  const tone = TONE_STYLES[card.tag.tone];
  const avatarTone = TONE_STYLES[card.assignee.tone];

  return (
    <div
      className={[
        "animate-[rise_0.6s_ease-out_both] rounded-xl border bg-background p-3.5",
        "transition-[transform,border-color] duration-150 ease-out",
        "hover:-translate-y-0.5 hover:border-foreground/20",
        card.isActive ? "border-accent" : "border-border",
      ].join(" ")}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone.pill}`}
      >
        {card.tag.label}
      </span>

      <p className="mt-2.5 text-sm font-medium text-balance">{card.title}</p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-medium ${avatarTone}`}
        >
          {card.assignee.initials}
        </span>
        <span className="flex-1 text-xs text-muted-foreground">
          {card.assignee.name}
        </span>
        {card.isActive ? (
          <span
            aria-hidden
            className="size-1.5 shrink-0 animate-[breathe_2s_ease-in-out_infinite] rounded-full bg-accent"
          />
        ) : null}
      </div>
    </div>
  );
}
