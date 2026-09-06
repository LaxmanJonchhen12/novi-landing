import type { Board, BoardCard } from "./types";

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

/**
 * Cards the board's motion (`Board`, client-side) pulls from as older work
 * archives out of Done and new work needs to land in Idea. Kept as plain
 * content, same as `board` itself — the component decides when to use them,
 * this file just supplies what a believable next card looks like.
 *
 * Never `isActive`: a card only gets that once the motion promotes it into
 * In progress.
 */
export const incomingCards: readonly BoardCard[] = [
  {
    id: "slack-thread-sync",
    tag: { label: "Integration", tone: "violet" },
    title: "Sync Slack threads to card comments",
    assignee: { name: "Sam Park", initials: "SP", tone: "violet" },
  },
  {
    id: "weekly-digest",
    tag: { label: "Feature", tone: "green" },
    title: "Send weekly progress digest email",
    assignee: { name: "Jordan T.", initials: "JT", tone: "green" },
  },
  {
    id: "invite-copy-fix",
    tag: { label: "Engineering", tone: "amber" },
    title: "Fix invite link copy on mobile",
    assignee: { name: "Alex Rivera", initials: "AR", tone: "amber" },
  },
];
