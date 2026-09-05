"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot scroll reveal via IntersectionObserver.
 *
 * Two deliberate details:
 *
 * 1. `isArmed` is separate from `isRevealed`. The server renders neither, so
 *    the markup's default state is VISIBLE — if JavaScript never runs, the
 *    content is simply there. Hiding is something the client opts into after
 *    mount, never the default. Hiding by default would leave no-JS users
 *    staring at empty sections.
 *
 * 2. If the element is already in view at mount, it stays unarmed and never
 *    animates at all. Arming it would hide already-visible content for a
 *    frame before revealing it — a flash the user would notice, e.g. when
 *    landing directly on `#features` from the nav.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isArmed, setIsArmed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setIsArmed(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsRevealed(true);
        // One-shot: re-animating every time it scrolls past is noise.
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isArmed, isRevealed };
}
