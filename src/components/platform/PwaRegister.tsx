"use client";

import { useEffect, useRef } from "react";

/**
 * PWA glue:
 *  1. Registers the service worker (public/sw.js).
 *  2. Dispatches "sw-offline-ready" once the SW controls the page
 *     (the header badge + install button in page.tsx listen to it).
 *  3. Prefetches EVERY view module (+ data chunks) after first load while online,
 *     so the WHOLE platform (all hash pages) is cached and works offline forever.
 */
export default function PwaRegister() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const dispatchReady = () => {
      window.dispatchEvent(new Event("sw-offline-ready"));
    };

    const prefetchAllViews = async () => {
      if (!navigator.onLine) return;
      // Same dynamic import specifiers as page.tsx → webpack reuses the exact chunks.
      const views = [
        () => import("@/components/platform/DashboardView"),
        () => import("@/components/platform/LessonsView"),
        () => import("@/components/platform/QuizView"),
        () => import("@/components/platform/ReviewView"),
        () => import("@/components/platform/ToolsView"),
        () => import("@/components/platform/ProjectsView"),
        () => import("@/components/platform/PlaygroundView"),
        () => import("@/components/platform/ChallengesView"),
        () => import("@/components/platform/IntegrationsView"),
        () => import("@/components/platform/AchievementsView"),
        () => import("@/components/platform/SettingsView"),
        () => import("@/components/platform/netsim/NetSim"),
      ];
      try {
        for (const load of views) {
          await load();
          await new Promise((r) => setTimeout(r, 120)); // gentle on the dev server
        }
      } catch {
        /* non-fatal — whatever got cached is cached */
      }
    };

    const onControllerChange = () => {
      dispatchReady();
      void prefetchAllViews();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    const onMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "SW_ACTIVATED") {
        dispatchReady();
        void prefetchAllViews();
      }
    };
    navigator.serviceWorker.addEventListener("message", onMessage);

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          if (navigator.serviceWorker.controller) {
            dispatchReady();
            void prefetchAllViews();
          }
          // New version available → activate it right away
          reg.addEventListener("updatefound", () => {
            const w = reg.installing;
            if (w) {
              w.addEventListener("statechange", () => {
                if (w.state === "installed" && navigator.serviceWorker.controller) {
                  w.postMessage({ type: "SKIP_WAITING" });
                }
              });
            }
          });
        })
        .catch(() => {});
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
      navigator.serviceWorker.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
