import type { Feature } from "./types";

export const featuresSection = {
  // Phase 2 (elevation pass): the original heading described the product in
  // positive-only terms — never named what it's actually up against. This
  // states the pain first ("second job" deliberately echoes the hero
  // subhead's "second tool"), then the supporting line previews it in the
  // same three concrete failure modes the four cards below individually fix.
  heading: "Most tools become a second job.",
  supportingLine:
    "No admin overhead, no dashboard to rebuild every Monday, no decision buried in a thread the board never saw.",
} as const;

export const features = [
  {
    icon: "board",
    title: "The whole board, one glance",
    description:
      "See every project's real state without opening ten views or rebuilding a dashboard each Monday.",
  },
  {
    icon: "sprints",
    title: "Sprints planned in place",
    description:
      "Plan, run, and close sprints where the work already lives — no exported spreadsheet, no separate retro app.",
  },
  {
    icon: "threads",
    title: "Decisions stay on the ticket",
    description:
      "The reasoning, the objection, the final call — all attached to the task, still there six months later.",
  },
  {
    icon: "setup",
    title: "Set up in an afternoon",
    description:
      "Sensible defaults out of the box. No admin role, no six-week rollout, no consultant.",
  },
] as const satisfies readonly Feature[];
