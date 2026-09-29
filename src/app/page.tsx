"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  CircleHelp,
  RefreshCw,
  Wrench,
  Rocket,
  FlaskConical,
  Trophy,
  Settings,
  Menu,
  Languages,
  Sun,
  Moon,
  Flame,
  Zap,
  Network,
  X,
  Swords,
  Layers3,
  Download,
  WifiOff,
} from "lucide-react";
import { LangProvider, useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress, learnerLevel, levelTitle } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import type { ViewId } from "@/lib/types";
import { ACHIEVEMENTS } from "@/data/achievements";

const DashboardView = dynamic(() => import("@/components/platform/DashboardView"));
const LessonsView = dynamic(() => import("@/components/platform/LessonsView"));
const QuizView = dynamic(() => import("@/components/platform/QuizView"));
const ReviewView = dynamic(() => import("@/components/platform/ReviewView"));
const ToolsView = dynamic(() => import("@/components/platform/ToolsView"));
const ProjectsView = dynamic(() => import("@/components/platform/ProjectsView"));
const PlaygroundView = dynamic(() => import("@/components/platform/PlaygroundView"));
const AchievementsView = dynamic(() => import("@/components/platform/AchievementsView"));
const SettingsView = dynamic(() => import("@/components/platform/SettingsView"));
const ChallengesView = dynamic(() => import("@/components/platform/ChallengesView"));
const IntegrationsView = dynamic(() => import("@/components/platform/IntegrationsView"));

const NAV_ITEMS: { view: ViewId; icon: React.ElementType; key: string }[] = [
  { view: "dashboard", icon: LayoutDashboard, key: "home" },
  { view: "lessons", icon: BookOpen, key: "lessons" },
  { view: "quizzes", icon: CircleHelp, key: "quizzes" },
  { view: "review", icon: RefreshCw, key: "review" },
  { view: "tools", icon: Wrench, key: "tools" },
  { view: "projects", icon: Rocket, key: "projects" },
  { view: "playground", icon: FlaskConical, key: "playground" },
  { view: "challenges", icon: Swords, key: "challenges" },
  { view: "integrations", icon: Layers3, key: "integrations" },
  { view: "achievements", icon: Trophy, key: "achievements" },
  { view: "settings", icon: Settings, key: "settings" },
];

const MOBILE_TABS: ViewId[] = ["dashboard", "lessons", "quizzes", "tools", "playground"];

function BrandMark({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-primary-foreground shadow-lg glow-primary">
        <Network className="size-5" strokeWidth={2.4} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-extrabold text-[15px] text-glow">{t("appName")}</div>
          <div className="text-[10.5px] text-muted-foreground font-medium">NetMastery</div>
        </div>
      )}
    </div>
  );
}

function StatPills() {
  const { t, lang } = useLang();
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const lvl = learnerLevel(xp);
  const title = levelTitle(lvl)[lang];
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
        <span className="text-amber-500">★</span> {title} · {lvl}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground" title={t("streakDays")}>
        <Flame className="size-3.5 text-orange-500" />
        {streak}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground" title={t("xp")}>
        <Zap className="size-3.5 text-yellow-500" />
        {xp}
      </span>
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle language"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className="size-9 rounded-lg"
    >
      <span className="text-[11px] font-black tracking-wide">{lang === "ar" ? "EN" : "ع"}</span>
    </Button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLang();
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={t("theme")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-9 rounded-lg"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLang();
  const { view, go } = useNav();
  const achievements = useProgress((s) => s.achievements);

  return (
    <nav className="flex flex-col gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const active = view === item.view;
        const Icon = item.icon;
        const badge =
          item.view === "achievements" && achievements.length > 0
            ? `${achievements.length}/${ACHIEVEMENTS.length}`
            : null;
        return (
          <button
            key={item.view}
            onClick={() => {
              go(item.view);
              onNavigate?.();
            }}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all
              ${active
                ? "bg-primary text-primary-foreground shadow-md glow-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={2.2} />
            <span className="truncate">{t(item.key)}</span>
            {badge && (
              <span className={`ms-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? "bg-primary-foreground/20" : "bg-muted"}`}>
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const { t } = useLang();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="size-9 rounded-lg lg:hidden" aria-label={t("menu")}>
          <Menu className="size-4.5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar">
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-sidebar-border p-4">
            <BrandMark />
            <X className="size-4 text-muted-foreground" onClick={() => setOpen(false)} />
          </div>
          <div className="p-3">
            <SideNav onNavigate={() => setOpen(false)} />
          </div>
          <div className="mt-auto p-4 text-[11px] text-muted-foreground border-t border-sidebar-border">
            {t("appTagline")}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function BottomTabs() {
  const { t } = useLang();
  const { view, go } = useNav();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/92 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5">
        {MOBILE_TABS.map((v) => {
          const item = NAV_ITEMS.find((n) => n.view === v)!;
          const Icon = item.icon;
          const active = view === v;
          return (
            <button
              key={v}
              onClick={() => go(v)}
              className={`flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-colors
                ${active ? "text-primary" : "text-muted-foreground"}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              <span className="truncate max-w-full px-0.5">{t(item.key)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ProgressWatcher() {
  const store = useProgress();
  const { t, lang } = useLang();
  const hydrated = useProgress((s) => s.hydrated);
  const lastUnlocked = useRef<Set<string>>(new Set());
  const synced = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // streak touch once per day on load
  useEffect(() => {
    if (hydrated) store.touchDay();
     
  }, [hydrated]);

  // achievement toasts
  useEffect(() => {
    if (!hydrated) return;
    const unlocked = store.checkAchievements();
    for (const id of unlocked) {
      if (lastUnlocked.current.has(id)) continue;
      lastUnlocked.current.add(id);
      const a = ACHIEVEMENTS.find((x) => x.id === id);
      if (a) {
        toast({
          title: `🏆 ${a.title[lang]}`,
          description: a.desc[lang],
        });
      }
    }
     
  }, [
    hydrated,
    store.xp,
    store.completedLessons,
    store.quizTotals,
    store.streak,
    store.reviewsDone,
    store.toolBookmarks,
    store.projectBookmarks,
  ]);

  // debounce sync to API
  useEffect(() => {
    if (!hydrated) return;
    synced.current = false;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const { setHydrated, touchDay, completeLesson, recordQuiz, ensureCards, answerReview, toggleToolBookmark, toggleProjectBookmark, markPlaygroundUsed, recordChallenge, resetAll, checkAchievements, ...snapshot } = store;
      void snapshot;
      fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snapshot),
      })
        .then(() => {
          synced.current = true;
        })
        .catch(() => {});
    }, 2500);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
     
  }, [
    store.xp,
    store.streak,
    store.completedLessons,
    store.quizStats,
    store.quizTotals,
    store.reviewCards,
    store.reviewsDone,
    store.toolBookmarks,
    store.projectBookmarks,
    store.achievements,
    store.playgroundUsed,
    store.challengesDone,
  ]);

  return null;
}

function ViewRouter() {
  const view = useNav((s) => s.view);
  const views = useMemo(
    () => ({
      dashboard: <DashboardView />,
      lessons: <LessonsView />,
      quizzes: <QuizView />,
      review: <ReviewView />,
      tools: <ToolsView />,
      projects: <ProjectsView />,
      playground: <PlaygroundView />,
      challenges: <ChallengesView />,
      integrations: <IntegrationsView />,
      achievements: <AchievementsView />,
      settings: <SettingsView />,
    }),
    [view]
  );
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {views[view]}
      </motion.div>
    </AnimatePresence>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 pb-24 lg:pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Network className="size-3.5 text-primary" />
          <span className="font-semibold">{t("appName")} · NetMastery</span>
        </div>
        <span className="text-center">{t("footerRights")}</span>
      </div>
    </footer>
  );
}

function PwaButtons() {
  const { t } = useLang();
  const [prompt, setPrompt] = useState<{ prompt: () => void } | null>(null);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setPrompt({ prompt: () => (e as unknown as { prompt: () => Promise<void> }).prompt().catch(() => {}) });
    };
    const onReady = () => setOfflineReady(true);
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("sw-offline-ready", onReady as EventListener);
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) setOfflineReady(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("sw-offline-ready", onReady as EventListener);
    };
  }, []);

  return (
    <>
      {offlineReady && !prompt && (
        <span
          className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
          title={t("offlineReady")}
        >
          <WifiOff className="size-3" />
        </span>
      )}
      {prompt && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-lg text-[11px] font-bold"
          onClick={() => {
            prompt.prompt();
            setPrompt(null);
          }}
        >
          <Download className="size-3.5" />
          <span className="hidden md:inline">{t("installApp")}</span>
        </Button>
      )}
    </>
  );
}

function AppShell() {
  const { t } = useLang();
  const view = useNav((s) => s.view);
  const syncFromHash = useNav((s) => s.syncFromHash);

  // Keep the store in sync with location.hash (deep links, back/forward).
  // Runs before paint on the client to avoid a flash of the default view.
  const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useBeforePaint(() => {
    syncFromHash();
  }, [syncFromHash]);

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressWatcher />
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 start-0 z-30 w-60 flex-col border-e bg-sidebar">
        <div className="p-4">
          <BrandMark />
        </div>
        <div className="px-3">
          <SideNav />
        </div>
        <div className="mt-auto p-4 text-[10.5px] leading-relaxed text-muted-foreground border-t border-sidebar-border">
          {t("appTagline")}
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:ms-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 border-b bg-background/88 backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 sm:px-5 h-14">
            <MobileDrawer />
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
            <h1 className="hidden lg:block text-base font-extrabold truncate">{t(view === "dashboard" ? "appName" : NAV_ITEMS.find((n) => n.view === view)?.key ?? "appName")}</h1>
            <div className="ms-auto flex items-center gap-1.5">
              <StatPills />
              <PwaButtons />
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-5 py-4 sm:py-6 pb-24 lg:pb-6">
          <ViewRouter />
        </main>

        <Footer />
      </div>

      <BottomTabs />
    </div>
  );
}

export default function Page() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}
