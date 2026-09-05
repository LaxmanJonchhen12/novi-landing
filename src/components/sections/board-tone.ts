import type { Tone } from "@/content/types";

/**
 * Colour map for the board's card tags and avatars.
 *
 * These are the demo product's OWN UI colours, not the marketing page's
 * design system — the board is effectively a screenshot of Novi's app inside
 * the page. The site's actual chrome (nav, buttons, borders) still uses only
 * the single locked `--accent`. A real board needs to categorise cards; one
 * blue can't do that on its own.
 */
export const TONE_STYLES: Record<Tone, { pill: string; avatar: string }> = {
  violet: {
    pill: "bg-violet-100 text-violet-700",
    avatar: "bg-violet-200 text-violet-700",
  },
  amber: {
    pill: "bg-amber-100 text-amber-700",
    avatar: "bg-amber-200 text-amber-700",
  },
  green: {
    pill: "bg-emerald-100 text-emerald-700",
    avatar: "bg-emerald-200 text-emerald-700",
  },
  sky: {
    pill: "bg-sky-100 text-sky-700",
    avatar: "bg-sky-200 text-sky-700",
  },
};
