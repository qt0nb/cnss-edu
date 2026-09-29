"use client";

import { create } from "zustand";
import type { ViewId } from "@/lib/types";

const VALID_VIEWS: string[] = [
  "dashboard",
  "lessons",
  "quizzes",
  "review",
  "tools",
  "projects",
  "playground",
  "challenges",
  "integrations",
  "achievements",
  "settings",
];

/** Parse the current location.hash into a ViewId (e.g. "#/lessons" -> "lessons"). */
export function viewFromHash(): ViewId {
  if (typeof window === "undefined") return "dashboard";
  const raw = window.location.hash.replace(/^#\/?/, "");
  const id = raw.split("?")[0].split("/")[0].trim().toLowerCase();
  return VALID_VIEWS.includes(id) ? (id as ViewId) : "dashboard";
}

/** Canonical hash for a view (e.g. "lessons" -> "#/lessons"). */
export function hashForView(view: ViewId): string {
  return `#/${view}`;
}

interface NavState {
  view: ViewId;
  params: Record<string, string>;
  go: (view: ViewId, params?: Record<string, string>) => void;
  syncFromHash: () => void;
}

export const useNav = create<NavState>((set, get) => ({
  view: "dashboard",
  params: {},
  go: (view, params = {}) => {
    if (typeof window !== "undefined") {
      const target = hashForView(view);
      if (window.location.hash !== target) {
        // location.hash assignment pushes a history entry and fires
        // `hashchange`, which the listener below handles to update state.
        window.location.hash = target;
        if (Object.keys(params).length > 0) set({ params });
        return;
      }
    }
    set({ view, params });
  },
  syncFromHash: () => {
    const view = viewFromHash();
    if (get().view !== view) set({ view, params: {} });
  },
}));

if (typeof window !== "undefined") {
  // Browser back / forward buttons keep working through hashchange events.
  window.addEventListener("hashchange", () => {
    useNav.getState().syncFromHash();
  });
}
