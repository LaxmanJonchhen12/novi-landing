import type { HowItWorksStep } from "./types";

export const howItWorksSection = {
  heading: "Three steps, then you're working.",
  supportingLine:
    "No implementation plan, no workspace architect. Most teams are running their first sprint the same afternoon.",
} as const;

/**
 * Deliberately covers the "imports from your existing tool" ground that the
 * feature cards don't, so the two sections argue different things instead of
 * restating each other.
 */
export const howItWorksSteps = [
  {
    title: "Bring your work in",
    description:
      "Import from Trello, Asana, Jira, or a spreadsheet. Your columns and assignees come across as they are — nothing to rebuild by hand.",
  },
  {
    title: "Plan the sprint in place",
    description:
      "Pull what matters into this week. Everything you didn't pick stays visible in the backlog instead of disappearing into a second tool.",
  },
  {
    title: "Ship, and keep the reasoning",
    description:
      "Close the sprint when it's done. The discussion that got you there stays attached to the tickets, not buried in a thread nobody can find.",
  },
] as const satisfies readonly HowItWorksStep[];
