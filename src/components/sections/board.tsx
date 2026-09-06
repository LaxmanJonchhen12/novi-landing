"use client";

import { useEffect, useRef, useState } from "react";

import type { BoardCard, BoardColumn } from "@/content/types";
import { board, incomingCards } from "@/content/board";
import { useFlip } from "@/hooks/use-flip";

import { TONE_STYLES } from "./board-tone";

// Time between moves. Slow enough to read as "a team quietly working," not a
// strobe — and long enough relative to the ~550ms FLIP tween that the board
// spends most of its time resting, not mid-animation.
const STEP_MS = 3600;

type Step = "advance" | "restock";

function cloneColumns(columns: readonly BoardColumn[]): BoardColumn[] {
  return columns.map((c) => ({ ...c, cards: [...c.cards] }));
}

/**
 * One tick of the board's conveyor. Two steps, alternating forever:
 *
 * - "advance": the in-progress card finishes (moves to the front of Done,
 *   loses its active dot) and the front Idea card gets picked up (moves to
 *   the front of In progress, gains the dot) — both at once, since one
 *   finishing is what frees the team to start the next thing.
 * - "restock": the oldest Done card is archived off the board (cards are
 *   unshifted onto the front as they finish, so age increases toward the
 *   back of the array — the back is what leaves), and a fresh card arrives
 *   in Idea from the small `incomingCards` pool.
 *
 * A full advance+restock cycle returns every column to its starting COUNT
 * (2 / 1 / 2) with different cards inside it — a conveyor, not a loop that
 * visibly reverses itself.
 *
 * Returns the id of any card pulled fresh from the pool, so the caller can
 * give it an entrance animation FLIP can't provide (a new card has no
 * "before" position to slide from).
 *
 * Looks columns up by id rather than position — acceptable since
 * `board.columns` is locked content authored with exactly these three ids
 * (idea / in-progress / done), not arbitrary data.
 */
function advanceBoard(
  columns: readonly BoardColumn[],
  step: Step,
  pullIncoming: () => BoardCard,
): { columns: BoardColumn[]; arrivedId: string | null } {
  const next = cloneColumns(columns);
  const idea = next.find((c) => c.id === "idea");
  const inProgress = next.find((c) => c.id === "in-progress");
  const done = next.find((c) => c.id === "done");
  if (!idea || !inProgress || !done) return { columns: next, arrivedId: null };

  if (step === "advance") {
    const finishing = inProgress.cards.shift();
    if (finishing) done.cards.unshift({ ...finishing, isActive: false });

    const starting = idea.cards.shift();
    if (starting) inProgress.cards.unshift({ ...starting, isActive: true });

    return { columns: next, arrivedId: null };
  }

  // "restock" — keep at least the original 2 as a floor so a tab left open
  // a long time never empties the column out.
  if (done.cards.length > 2) done.cards.pop();
  const arrival = pullIncoming();
  idea.cards.push(arrival);
  return { columns: next, arrivedId: arrival.id };
}

/**
 * The hero's product visual, and now its proof: the headline says "Work
 * moves." — this is the one place on the page where something actually does.
 *
 * Client Component (Phase 2 addition — a pure Server Component through
 * Phase 1). The cost is real and worth naming: `board.ts`'s content plus this
 * file's logic now ship as JS, roughly 2KB gzipped. Everything else on the
 * page — hero text, CTAs, the frame this sits inside — stays server-rendered.
 *
 * Motion is a slow two-step conveyor (`advanceBoard`), animated with a
 * hand-rolled FLIP (`useFlip`) instead of a library: a card moving columns is
 * a full unmount/remount in React, which a CSS `transition` can't tween, but
 * doesn't need Framer Motion either — reading a card's old and new position
 * and playing one Web Animations API tween is ~20 lines (see the hook).
 *
 * Respects `prefers-reduced-motion` by never starting the loop at all. This
 * needs an explicit check rather than relying on the site's global CSS rule:
 * that rule collapses `animation-duration`, but WAAPI durations aren't CSS
 * durations and the rule doesn't reach them — a near-zero duration on a
 * LOOPING animation would be a strobe, the opposite of the intent.
 *
 * Also pauses while off-screen, while the tab is hidden, and on hover/focus
 * — nothing to gain animating what's not being looked at, and pausing on
 * hover means someone leaning in to read a card isn't fighting one that's
 * about to slide out from under their cursor.
 */
export function Board() {
  const [columns, setColumns] = useState<BoardColumn[]>(() => cloneColumns(board.columns));
  const columnsRef = useRef(columns);
  useEffect(() => {
    columnsRef.current = columns;
  }, [columns]);

  // Alternates advance/restock — a ref, since it drives an interval callback
  // rather than render output.
  const stepRef = useRef<Step>("advance");
  const incomingCursor = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const { register, recordPositions, fadeOut } = useFlip<string>();

  // The very first paint keeps the original staggered rise-in (see `Card`).
  // Every tick after the first flips this false: subsequent moves rely on
  // the FLIP slide, not a replayed entrance.
  const [isInitial, setIsInitial] = useState(true);
  // The one card, if any, that just arrived from the incoming pool this
  // render — the only card that still gets a (plain, non-staggered) rise-in
  // once the board is past its initial paint.
  const [arrivedId, setArrivedId] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    io.observe(container);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    container.addEventListener("pointerenter", pause);
    container.addEventListener("pointerleave", resume);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", resume);

    const interval = setInterval(async () => {
      if (pausedRef.current || !isVisible || document.hidden) return;

      const step = stepRef.current;

      // Fade the departing card out before it's actually removed from
      // state, so it doesn't just vanish between frames.
      if (step === "restock") {
        const oldestDoneId = columnsRef.current.find((c) => c.id === "done")?.cards.at(-1)?.id;
        if (oldestDoneId) await fadeOut(oldestDoneId);
      }

      recordPositions();
      const result = advanceBoard(columnsRef.current, step, () => {
        const base = incomingCards[incomingCursor.current % incomingCards.length];
        const card: BoardCard = { ...base, id: `${base.id}-${incomingCursor.current}` };
        incomingCursor.current += 1;
        return card;
      });

      setIsInitial(false);
      setArrivedId(result.arrivedId);
      setColumns(result.columns);
      stepRef.current = step === "advance" ? "restock" : "advance";
    }, STEP_MS);

    return () => {
      io.disconnect();
      clearInterval(interval);
      container.removeEventListener("pointerenter", pause);
      container.removeEventListener("pointerleave", resume);
      container.removeEventListener("focusin", pause);
      container.removeEventListener("focusout", resume);
    };
  }, [fadeOut, recordPositions]);

  const startIndexes = columns.reduce<number[]>((offsets, column, i) => {
    offsets.push(i === 0 ? 0 : offsets[i - 1] + columns[i - 1].cards.length);
    return offsets;
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        // No `gap` here — see comment below. py-4 for vertical spacing only.
        "flex overflow-x-auto py-4 scrollbar-none",
        // md+ isn't scrollable (grid, not flex), so `gap` is safe there.
        "snap-x snap-proximity md:grid md:gap-4 md:snap-none md:grid-cols-3 md:overflow-visible md:px-4",
        // Spacing between columns, and the leading inset, as MARGIN rather
        // than `gap` or `padding` — see board.tsx history in CLAUDE.md for
        // why (`scroll-margin` is what a snap container actually consults).
        "*:mr-4 md:*:mr-0 [&>*:first-child]:ml-4 md:[&>*:first-child]:ml-0",
        "[&>*:first-child]:scroll-ml-4 md:[&>*:first-child]:scroll-ml-0",
        "[&>*:last-child]:scroll-mr-4 md:[&>*:last-child]:scroll-mr-0",
      ].join(" ")}
    >
      {columns.map((column, i) => (
        <Column
          key={column.id}
          column={column}
          startIndex={startIndexes[i]}
          isInitial={isInitial}
          arrivedId={arrivedId}
          register={register}
        />
      ))}
    </div>
  );
}

function Column({
  column,
  startIndex,
  isInitial,
  arrivedId,
  register,
}: {
  column: BoardColumn;
  startIndex: number;
  isInitial: boolean;
  arrivedId: string | null;
  register: (id: string) => (el: HTMLElement | null) => void;
}) {
  return (
    <div className="flex w-[85%] shrink-0 snap-start flex-col gap-3 md:w-auto">
      <div className="flex items-center gap-2 px-1">
        {/*
          Deliberately not a heading. These label columns inside a mockup of
          Novi's app — they aren't part of this page's document outline, and
          making them headings both skipped a level (h1 -> h3) and told screen
          readers the picture was page structure.
        */}
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {column.name}
        </p>
        <span className="rounded-full bg-foreground/6 px-1.5 text-xs text-muted-foreground tabular-nums">
          {column.cards.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {column.cards.map((card, i) => (
          <Card
            key={card.id}
            card={card}
            delayMs={isInitial ? 480 + (startIndex + i) * 60 : null}
            showRiseIn={isInitial || card.id === arrivedId}
            registerRef={register(card.id)}
          />
        ))}
      </div>
    </div>
  );
}

function Card({
  card,
  delayMs,
  showRiseIn,
  registerRef,
}: {
  card: BoardCard;
  /** Staggered entrance delay — only set on the board's very first paint. */
  delayMs: number | null;
  /** Plays the `rise` keyframes: true on initial paint, or for a card that
   *  just arrived from the incoming pool (FLIP has no "before" position to
   *  slide those from, so they need their own entrance). A card merely
   *  relocating between columns gets neither — only the FLIP slide. */
  showRiseIn: boolean;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const tone = TONE_STYLES[card.tag.tone];
  const avatarTone = TONE_STYLES[card.assignee.tone];

  return (
    <div
      ref={registerRef}
      className={[
        showRiseIn ? "animate-[rise_0.6s_ease-out_both]" : "",
        "rounded-xl border bg-background p-3.5",
        "transition-[transform,border-color] duration-150 ease-out",
        "hover:-translate-y-0.5 hover:border-foreground/20",
        card.isActive ? "border-accent" : "border-border",
      ].join(" ")}
      style={delayMs !== null ? { animationDelay: `${delayMs}ms` } : undefined}
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
