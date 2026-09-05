import { Columns3, MessageSquareText, RefreshCw, Timer } from "lucide-react";

import type { FeatureIcon } from "@/content/types";

/**
 * Resolves the content layer's semantic icon keys to actual components.
 * This mapping is the reason `features.ts` can stay free of React imports.
 */
export const FEATURE_ICONS: Record<
  FeatureIcon,
  React.ComponentType<{ className?: string }>
> = {
  board: Columns3,
  sprints: RefreshCw,
  threads: MessageSquareText,
  setup: Timer,
};
