import type { Feature } from "./types";

export const featuresSection = {
  heading: "Built for teams who'd rather ship.",
  supportingLine:
    "No admin overhead, no dashboard to rebuild every Monday.",
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
