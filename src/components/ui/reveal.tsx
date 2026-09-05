"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Reveals its children in sequence as it scrolls into view.
 *
 * The client boundary stops here: children are server-rendered and passed in,
 * so this file adds an observer to the bundle, not the section's content.
 * Stagger is per-child CSS delay, driven by `--reveal-step`.
 */
export function Reveal({
  as: Tag = "div",
  className,
  stepMs = 90,
  children,
}: {
  /**
   * The element to render. This exists so `Reveal` can BE a list rather than
   * wrap one: the stagger CSS targets direct children, so wrapping an `<ol>`
   * in a `<div>` would reveal the whole list as a single child instead of
   * step by step.
   */
  as?: "div" | "ol" | "ul";
  className?: string;
  stepMs?: number;
  children: React.ReactNode;
}) {
  const { ref, isArmed, isRevealed } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLOListElement>}
      data-reveal-armed={isArmed || undefined}
      data-revealed={isRevealed || undefined}
      style={{ "--reveal-step": `${stepMs}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
