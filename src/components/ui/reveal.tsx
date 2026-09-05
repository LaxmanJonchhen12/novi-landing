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
  className,
  stepMs = 90,
  children,
}: {
  className?: string;
  stepMs?: number;
  children: React.ReactNode;
}) {
  const { ref, isArmed, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal-armed={isArmed || undefined}
      data-revealed={isRevealed || undefined}
      style={{ "--reveal-step": `${stepMs}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
