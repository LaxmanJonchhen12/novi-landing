"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

/**
 * FLIP (First, Last, Invert, Play) helper for animating a card that moves
 * between columns.
 *
 * Why this exists: when a card object moves from one column's array to
 * another's, React unmounts it from the old parent and mounts a new element
 * in the new one — there's no single DOM node a CSS transition could animate,
 * so `transition:` alone can't tween the move. FLIP works around that: read
 * where every tracked element IS right before the change (`recordPositions`),
 * let React re-render into the new arrangement, then read where each element
 * ended up and play a Web Animations API tween from old position to new.
 *
 * Deliberately WAAPI (`el.animate()`), not CSS: it's driven at the moment the
 * board's own timer decides to move a card, not by a class toggle. Note this
 * means the global `prefers-reduced-motion` CSS rule (which collapses
 * `animation-duration`) does NOT reach this — WAAPI durations aren't CSS
 * durations. The caller (`Board`) is responsible for not starting the loop at
 * all under reduced motion, which is also the correct behaviour (see notes
 * there) rather than a duration that would otherwise just fail to shrink.
 */
export function useFlip<K extends string>() {
  const nodes = useRef(new Map<K, HTMLElement>());
  const prevRects = useRef(new Map<K, DOMRect>());

  const register = useCallback(
    (id: K) => (el: HTMLElement | null) => {
      if (el) nodes.current.set(id, el);
      else nodes.current.delete(id);
    },
    [],
  );

  /** Call synchronously, right before the state update that will reorder tracked elements. */
  const recordPositions = useCallback(() => {
    const rects = new Map<K, DOMRect>();
    nodes.current.forEach((el, id) => rects.set(id, el.getBoundingClientRect()));
    prevRects.current = rects;
  }, []);

  /**
   * For an element with no "before" position to invert from — a genuinely
   * new arrival, not a relocation — a slide has nothing to slide from.
   * `fadeOut` covers the opposite case, an element about to be removed from
   * state entirely: play the fade first and let the caller await it before
   * actually removing the card, so it doesn't just vanish mid-frame.
   */
  const fadeOut = useCallback((id: K, duration = 400): Promise<void> => {
    const el = nodes.current.get(id);
    if (!el) return Promise.resolve();
    const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: "ease-in",
      fill: "forwards",
    });
    return animation.finished.then(() => undefined);
  }, []);

  // Runs after every commit. Elements with no recorded "before" position
  // (newly arrived cards) are left alone — there's nothing to invert from,
  // and a card fading/rising in on arrival is a separate, existing concern
  // (the `rise` keyframes), not this hook's job.
  useLayoutEffect(() => {
    nodes.current.forEach((el, id) => {
      const before = prevRects.current.get(id);
      if (!before) return;

      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (dx === 0 && dy === 0) return;

      el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
        { duration: 550, easing: "ease-in-out" },
      );
    });
  });

  return { register, recordPositions, fadeOut };
}
