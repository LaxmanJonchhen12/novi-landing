"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Owns one piece of state — whether the page has scrolled past the top — and
 * exposes it as `data-scrolled` for CSS to style against.
 *
 * Deliberately an IntersectionObserver watching a sentinel rather than a
 * `scroll` listener: this fires only when the sentinel crosses the viewport
 * edge, instead of on every scroll frame, so there is nothing to throttle and
 * no layout read in a hot path.
 *
 * The desktop header content is passed in as `children` from a Server
 * Component, so this file ships only the observer itself. The mobile menu is a
 * separate client component and does carry its own copy of the links, because
 * each one has to close the dialog when tapped — a deliberate trade, and only
 * a few hundred bytes.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sits at the document origin and scrolls away; height sets how far you
          travel before the header takes on its background. */}
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute top-0 h-6 w-full"
      />
      <header
        data-scrolled={isScrolled || undefined}
        className={[
          "fixed inset-x-0 top-0 z-50 border-b border-transparent",
          "transition-[background-color,border-color] duration-[170ms] ease-out",
          "data-scrolled:border-border data-scrolled:bg-background/88",
          "data-scrolled:backdrop-blur-sm",
        ].join(" ")}
      >
        {children}
      </header>
    </>
  );
}
