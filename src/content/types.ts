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

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type PricingTier = {
  name: string;
  price: string;
  /** e.g. "per person / month" — omitted for free tiers. */
  cadence?: string;
  description: string;
  cta: Cta;
  /** Renders with accent emphasis. Exactly one tier should set this. */
  isFeatured?: boolean;
};
