/**
 * Shared shapes for the page's content layer.
 *
 * Content files hold plain, serializable data only — no React, no icon
 * components. Icons and colours are referenced by semantic key (`"sprints"`,
 * `"amber"`) and resolved to components/classes in the presentation layer.
 * That keeps copy reviewable as copy, and means this data could come from a
 * CMS later without touching a single component.
 */

export type Link = {
  label: string;
  href: string;
};

export type Cta = Link & {
  /** Small reassurance text rendered beneath the button, e.g. "No card required". */
  note?: string;
};

/**
 * Phase 2: "Start free" / "Start a board" / "Start free trial" stopped being
 * links (see `CtaButton`) — they open the shared concept-product dialog
 * instead, so they never had an `href` to read. Kept separate from `Cta`
 * (still used by `hero.secondaryCta`, a real anchor) rather than leaving a
 * `href: "#"` field on these that nothing reads.
 */
export type DialogCta = {
  label: string;
  note?: string;
};

/** Semantic icon slots, mapped to lucide components where features are rendered. */
export type FeatureIcon = "board" | "sprints" | "threads" | "setup";

export type Feature = {
  icon: FeatureIcon;
  title: string;
  description: string;
};

/** Tag/avatar colour slots, mapped to token-based classes at render time. */
export type Tone = "violet" | "amber" | "green" | "sky";

export type Assignee = {
  name: string;
  initials: string;
  tone: Tone;
};

export type BoardCard = {
  id: string;
  tag: { label: string; tone: Tone };
  title: string;
  assignee: Assignee;
  /** Renders with the accent border — the card the eye should land on. */
  isActive?: boolean;
};

export type BoardColumn = {
  id: string;
  name: string;
  /** Counts are derived from `cards.length`, never stored separately. */
  cards: BoardCard[];
};

export type Board = {
  name: string;
  columns: BoardColumn[];
};

export type FooterGroup = {
  heading: string;
  links: Link[];
};

export type SocialIcon = "x" | "github" | "linkedin";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

/** Semantic visual slots, mapped to mini illustrations where steps are rendered. */
export type HowItWorksVisual = "sources" | "plan" | "ship";

export type HowItWorksStep = {
  title: string;
  description: string;
  visual: HowItWorksVisual;
};

export type PricingTier = {
  name: string;
  price: string;
  /** e.g. "per person / month" — omitted for free tiers. */
  cadence?: string;
  description: string;
  /** Short scannable list under the description — not a replacement for it,
   *  a second, denser pass over the same claims. */
  checks: readonly string[];
  cta: DialogCta;
};
