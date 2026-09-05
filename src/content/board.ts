import type { Board } from "./types";

/**
 * The demo sprint board shown in the hero.
 *
 * Written to read like a real team's board mid-sprint rather than filler:
 * the "Done" item about expiring guest links is the follow-on to the guest
 * access work still in progress. Column counts are derived from `cards.length`
 * at render time, so this stays the single source of truth.
 */
export const board = {
  name: "Q3 Launch — Current sprint",
  columns: [
    {
      id: "idea",
      name: "Idea",
      cards: [
        {
          id: "onboarding-redesign",
          tag: { label: "UX", tone: "violet" },
          title: "Redesign onboarding flow",
          assignee: { name: "Maya Chen", initials: "MC", tone: "sky" },
        },
        {
          id: "csv-export",
          tag: { label: "Feature", tone: "green" },
          title: "Add CSV export to reports",
          assignee: { name: "Jordan T.", initials: "JT", tone: "green" },
        },
      ],
    },
    {
      id: "in-progress",
      name: "In progress",
      cards: [
        {
          id: "guest-access",
          tag: { label: "Engineering", tone: "amber" },
          title: "Ship guest access permissions",
          assignee: { name: "Alex Rivera", initials: "AR", tone: "amber" },
          isActive: true,
        },
      ],
    },
    {
      id: "done",
      name: "Done",
      cards: [
        {
          id: "slack-v2",
          tag: { label: "Integration", tone: "violet" },
          title: "Slack integration v2",
          assignee: { name: "Sam Park", initials: "SP", tone: "violet" },
        },
        {
          id: "guest-link-expiry",
          tag: { label: "Engineering", tone: "amber" },
          title: "Guest links expire after 7 days",
          assignee: { name: "Maya Chen", initials: "MC", tone: "sky" },
        },
      ],
    },
  ],
} as const satisfies Board;
