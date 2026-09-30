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
  Search,
  Terminal,
  Award,
  LineChart,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useCountUp } from "@/lib/useCountUp";
import { useProgress, learnerLevel, levelTitle } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import type { ViewId } from "@/lib/types";
import { ACHIEVEMENTS } from "@/data/achievements";
import CommandPalette from "@/components/platform/shell/CommandPalette";
import NetBackground from "@/components/platform/shell/NetBackground";
import { ViewErrorBoundary } from "@/components/platform/shell/ViewErrorBoundary";

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
const CertificatesView = dynamic(() => import("@/components/platform/CertificatesView"));
const AnalyticsView = dynamic(() => import("@/components/platform/AnalyticsView"));
const IntegrationsView = dynamic(() => import("@/components/platform/IntegrationsView"));

/** The CNSS-edu identity mark — soft network constellation with terminal hub (matches favicon) */
function CnssMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cmk-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="0.5" stopColor="#10b981" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* gentle dashed orbit ring — a circle, not a polygon */}
      <circle
        cx="256" cy="256" r="182" fill="none" stroke="#10b981" strokeOpacity="0.3"
        strokeWidth="3" strokeDasharray="3 15" strokeLinecap="round"
      />
      {/* soft curved network arcs */}
      <g fill="none" stroke="#10b981" strokeOpacity="0.8" strokeWidth="9" strokeLinecap="round">
        <path d="M256 256 Q282 182 256 112" />
        <path d="M256 256 Q342 196 372 168" />
        <path d="M256 256 Q350 302 392 314" />
        <path d="M256 256 Q294 348 298 404" />
        <path d="M256 256 Q186 322 152 352" />
        <path d="M256 256 Q174 208 142 176" />
      </g>
      {/* perimeter nodes */}
      <g fill="#0c1310" stroke="url(#cmk-g)" strokeWidth="11">
        <circle cx="256" cy="112" r="27" />
        <circle cx="372" cy="168" r="27" />
        <circle cx="392" cy="314" r="27" />
        <circle cx="298" cy="404" r="27" />
        <circle cx="152" cy="352" r="27" />
        <circle cx="142" cy="176" r="27" />
      </g>
      <g fill="#34d399">
        <circle cx="256" cy="112" r="7.5" />
        <circle cx="372" cy="168" r="7.5" />
        <circle cx="392" cy="314" r="7.5" />
        <circle cx="298" cy="404" r="7.5" />
        <circle cx="152" cy="352" r="7.5" />
        <circle cx="142" cy="176" r="7.5" />
      </g>
      {/* central hub: soft circle + curved caret wing + soft dot */}
      <circle cx="256" cy="256" r="60" fill="#0c1310" stroke="url(#cmk-g)" strokeWidth="12" />
      <circle cx="256" cy="256" r="44" fill="url(#cmk-g)" />
      <path d="M234 239 Q261 257 234 275" stroke="#032b20" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="268" cy="271" r="6.5" fill="#032b20" />
    </svg>
  );
}

const NAV_ITEMS: { view: ViewId; icon: React.ElementType; key: string }[] = [
  { view: "dashboard", icon: LayoutDashboard, key: "home" },
  { view: "lessons", icon: BookOpen, key: "lessons" },
  { view: "quizzes", icon: CircleHelp, key: "quizzes" },
  { view: "review", icon: RefreshCw, key: "review" },
  { view: "tools", icon: Wrench, key: "tools" },
  { view: "projects", icon: Rocket, key: "projects" },
  { view: "playground", icon: FlaskConical, key: "playground" },
  { view: "challenges", icon: Swords, key: "challenges" },
  { view: "certificates", icon: Award, key: "certificates" },
  { view: "analytics", icon: LineChart, key: "analytics" },
  { view: "integrations", icon: Layers3, key: "integrations" },
  { view: "achievements", icon: Trophy, key: "achievements" },
  { view: "settings", icon: Settings, key: "settings" },
];

const MOBILE_TABS: ViewId[] = ["dashboard", "lessons", "quizzes", "tools", "playground"];

function BrandMark({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative grid size-10 place-items-center rounded-xl bg-[#0c1310] border border-emerald-500/30 shadow-lg glow-primary radar overflow-hidden">
        <CnssMark className="size-9 relative z-10" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-mono font-extrabold text-[15px] tracking-tight text-glow glitch-hover">
            {t("appName")}
            <span className="caret text-emerald-500 font-bold">_</span>
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold truncate max-w-[170px]">
            {t("appNameFull")}
          </div>
        </div>
      )}
    </div>
  );
}

/** Animated count-up for numeric stats */
// (moved to @/lib/useCountUp — imported above)

function StatPills() {
  const { t, lang } = useLang();
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const lvl = learnerLevel(xp);
  const title = levelTitle(lvl)[lang];
  const xpDisplay = useCountUp(xp);
  // level progress: XP needed for level L is (L-1)^2*70
  const prevXp = Math.pow(lvl - 1, 2) * 70;
  const nextXp = Math.pow(lvl, 2) * 70;
  const lvlPct = Math.min(100, Math.max(3, Math.round(((xp - prevXp) / Math.max(nextXp - prevXp, 1)) * 100)));
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground" title={t("learnerLevel")}>
        <span className="text-amber-500">★</span>
        <span className="font-mono">L{lvl}</span>
        <span className="hidden md:inline">{title}</span>
        <span className="relative ms-0.5 block h-1 w-10 overflow-hidden rounded-full bg-muted">
          <span className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700" style={{ width: `${lvlPct}%` }} />
        </span>
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground" title={t("streakDays")}>
        <Flame className="size-3.5 text-orange-500 blink-dot" />
        <span className="font-mono">{streak}</span>
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 border border-border px-2.5 py-1 text-[11px] font-bold text-accent-foreground" title={t("xp")}>
        <Zap className="size-3.5 text-yellow-500" />
        <span className="font-mono tabular-nums">{xpDisplay}</span>
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
      {NAV_ITEMS.map((item, idx) => {
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
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200
              ${active
                ? "bg-primary text-primary-foreground shadow-md glow-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-x-0.5 rtl:hover:translate-x-0.5"
              }`}
            aria-current={active ? "page" : undefined}
          >
            {active && (
              <motion.span
                layoutId="nav-active-glow"
                className="absolute inset-y-1 -start-1 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500 glow-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative font-mono text-[9.5px] w-4 shrink-0 text-center opacity-60 group-hover:opacity-100">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <Icon className={`size-[18px] shrink-0 transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-105"}`} strokeWidth={2.2} />
            <span className="truncate">{t(item.key)}</span>
            {badge && (
              <span className={`ms-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold font-mono ${active ? "bg-primary-foreground/20" : "bg-muted"}`}>
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
              className={`relative flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition-colors
                ${active ? "text-primary" : "text-muted-foreground"}`}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="mobile-tab-pill"
                  className="absolute top-1.5 h-1 w-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
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
      certificates: <CertificatesView />,
      analytics: <AnalyticsView />,
      integrations: <IntegrationsView />,
      achievements: <AchievementsView />,
      settings: <SettingsView />,
    }),
    [view]
  );
  return (
    // Per-view error boundary keyed on the view: a failed chunk (dev server
    // restart) auto-retries via remount instead of blanking the whole app.
    <ViewErrorBoundary resetKey={view}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 14, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ type: "spring", stiffness: 360, damping: 34, mass: 0.9 }}
        >
          {views[view]}
        </motion.div>
      </AnimatePresence>
    </ViewErrorBoundary>
  );
}

/** Sidebar bottom: XP meter + system status */
function SidebarXpMeter() {
  const { t, lang } = useLang();
  const xp = useProgress((s) => s.xp);
  const lvl = learnerLevel(xp);
  const prevXp = Math.pow(lvl - 1, 2) * 70;
  const nextXp = lvl >= 12 ? prevXp : Math.pow(lvl, 2) * 70;
  const pct = lvl >= 12 ? 100 : Math.min(100, Math.max(2, Math.round(((xp - prevXp) / Math.max(nextXp - prevXp, 1)) * 100)));
  const title = levelTitle(lvl)[lang];
  return (
    <div className="mt-auto border-t border-sidebar-border p-3.5">
      <div className="mb-1.5 flex items-center justify-between text-[10.5px] font-bold">
        <span className="text-muted-foreground">{t("level")} {lvl} · {title}</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400">{xp}/{lvl >= 12 ? "MAX" : nextXp}</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <span className="relative inline-block size-1.5 rounded-full bg-emerald-500 blink-dot" />
        <span className="font-mono">SYSTEM ONLINE</span>
      </div>
    </div>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-auto border-t bg-muted/30">
      {/* system ticker line */}
      <div className="overflow-hidden border-b border-border/60 bg-background/60 py-1.5" dir="ltr">
        <div className="ticker-track font-mono text-[10px] tracking-wide text-muted-foreground">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex gap-12">
              <span className="inline-flex items-center gap-1.5"><span className="inline-block size-1.5 rounded-full bg-emerald-500 blink-dot" />CNSS-EDU v2.0</span>
              <span>MODULES 10 · LESSONS 100</span>
              <span>TOOLS 1060 · CATEGORIES 37</span>
              <span>LABS 12 · CHALLENGES 12</span>
              <span>PWA READY · OFFLINE MODE</span>
              <span>NETSIM ENGINE v3 · AI ONLINE</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-4 pb-24 lg:pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Network className="size-3.5 text-primary float-soft" />
          <span className="font-mono font-semibold">CNSS-edu</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="hidden sm:inline text-[10.5px]">{t("appNameFull")}</span>
        </div>
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
          className="hidden lg:inline-flex items-center gap-2 text-[10.5px] text-muted-foreground/80 hover:text-foreground transition-colors"
        >
          <span>{t("tipPalette")}</span>
          <span className="kbd">Ctrl K</span>
        </button>
        <span className="text-center sm:text-end">{t("footerRights")}</span>
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

/** Terminal-style boot splash — shown once per session, overlays the shell */
function BootSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, [onDone]);
  const lines = [
    "$ cnss-edu --init",
    "> mounting network modules ......... [ OK ]",
    "> loading 1060 tools / 37 categories  [ OK ]",
    "> starting simulation engine ........ [ OK ]",
    "> arming AI lab assistant ........... [ OK ]",
    "> binding command palette (ctrl+k) .. [ OK ]",
    "> SYSTEM ONLINE_",
  ];
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#050807]"
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.45 }}
    >
      <div className="net-grid-bg absolute inset-0 opacity-60" />
      <div className="scanline absolute inset-x-0 top-0" />
      <div className="relative w-[min(92vw,520px)] rounded-xl border border-emerald-500/25 bg-black/70 p-5 shadow-2xl hud-panel">
        <div className="flex items-center gap-2 border-b border-emerald-500/15 pb-2.5 mb-3">
          <div className="radar relative grid size-7 place-items-center rounded-lg bg-[#0c1310] border border-emerald-500/30 text-white overflow-hidden">
            <CnssMark className="size-6 relative z-10" />
          </div>
          <span className="font-mono text-sm font-bold tracking-tight text-emerald-300">CNSS-edu</span>
          <span className="ms-auto font-mono text-[10px] text-emerald-500/60">v2.0 · boot</span>
        </div>
        <div className="font-mono text-[12.5px] leading-7 text-emerald-300/90" dir="ltr">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`type-line ${i === 5 ? "text-emerald-400 font-bold" : ""}`}
              style={{ animationDelay: `${i * 0.16}s` }}
            >
              {l}
            </div>
          ))}
          <div className="caret mt-1 inline-block h-3.5 w-2 bg-emerald-400" />
        </div>
      </div>
    </motion.div>
  );
}

function AppShell() {
  const { t } = useLang();
  const view = useNav((s) => s.view);
  const syncFromHash = useNav((s) => s.syncFromHash);
  const [booting, setBooting] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Keep the store in sync with location.hash (deep links, back/forward).
  // Runs before paint on the client to avoid a flash of the default view.
  const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useBeforePaint(() => {
    syncFromHash();
    try {
      if (sessionStorage.getItem("cnss-booted")) setBooting(false);
    } catch {
      setBooting(false);
    }
  }, [syncFromHash]);

  // Manual rehydration — the store opts out of automatic rehydrate
  // (skipHydration) so the first client render matches the SSR HTML exactly.
  // Real persisted progress lands a frame later, guarded by `hydrated`.
  useEffect(() => {
    void Promise.resolve(useProgress.persist.rehydrate())
      .catch(() => {})
      .finally(() => {
        if (!useProgress.getState().hydrated) useProgress.getState().setHydrated();
      });
  }, []);

  // safety: never trap the user on the splash
  useEffect(() => {
    if (!booting) return;
    const t = setTimeout(() => setBooting(false), 2600);
    return () => clearTimeout(t);
  }, [booting]);

  // command palette shortcuts: Ctrl/Cmd+K anywhere, "/" outside inputs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "/" && !paletteOpen) {
        const el = document.activeElement as HTMLElement | null;
        const tag = el?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea" && tag !== "select" && !el?.isContentEditable) {
          e.preventDefault();
          setPaletteOpen(true);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  const finishBoot = () => {
    setBooting(false);
    try { sessionStorage.setItem("cnss-booted", "1"); } catch { /* private mode */ }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NetBackground />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <ProgressWatcher />
      <AnimatePresence>{booting && <BootSplash onDone={finishBoot} />}</AnimatePresence>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 start-0 z-30 w-60 flex-col border-e bg-sidebar">
        <div className="p-4 pb-3">
          <BrandMark />
        </div>
        <div className="px-3">
          <SideNav />
        </div>
        <SidebarXpMeter />
      </aside>

      {/* Main column */}
      <div className="lg:ms-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 border-b bg-background/88 backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 sm:px-5 h-14">
            <MobileDrawer />
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
            <div className="hidden lg:flex items-center gap-2.5 min-w-0">
              <Terminal className="size-4 text-primary shrink-0" />
              <span className="font-mono text-[12px] text-muted-foreground shrink-0" dir="ltr">~$</span>
              <span className="code-chip shrink-0" dir="ltr">{`view/${view}`}</span>
              <h1 className="text-base font-extrabold truncate">{t(view === "dashboard" ? "appNameFull" : NAV_ITEMS.find((n) => n.view === view)?.key ?? "appName")}</h1>
            </div>
            <div className="ms-auto flex items-center gap-1.5">
              {/* command palette trigger */}
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden md:flex items-center gap-2 h-9 rounded-lg border border-border bg-muted/50 px-3 text-[11.5px] font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all group"
                aria-label={t("commandPalette")}
              >
                <Search className="size-3.5 group-hover:text-primary transition-colors" />
                <span className="hidden xl:inline">{t("searchEverything")}</span>
                <span className="xl:hidden">{t("commandPalette")}</span>
                <span className="kbd">Ctrl K</span>
              </button>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-lg md:hidden"
                aria-label={t("commandPalette")}
                onClick={() => setPaletteOpen(true)}
              >
                <Search className="size-4" />
              </Button>
              <StatPills />
              <PwaButtons />
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
          {/* animated packet status line */}
          <div className="packet-line h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent">
            <span className="pkt" />
            <span className="pkt" />
            <span className="pkt" />
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
  return <AppShell />;
}
