"use client";

import { create } from "zustand";
import type { ViewId } from "@/lib/types";

interface NavState {
  view: ViewId;
  params: Record<string, string>;
  go: (view: ViewId, params?: Record<string, string>) => void;
}

export const useNav = create<NavState>((set) => ({
  view: "dashboard",
  params: {},
  go: (view, params = {}) => set({ view, params }),
}));
