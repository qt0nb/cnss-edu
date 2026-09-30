"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Rocket, Terminal, Bookmark, BookmarkCheck, ChevronDown, Clock, TrendingUp,
  ListOrdered,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { useNav } from "@/lib/nav";
import { ALL_PROJECTS, TOTAL_PROJECTS } from "@/data/projects";
import { PROJECT_CATEGORIES, projectCategoryById } from "@/data/projectCategories";
import type { ProjectIdea } from "@/lib/types";
import * as Icons from "lucide-react";

const DOT_SIZES = ["size-1", "size-[5px]", "size-1.5", "size-[7px]", "size-2"];

/* ── deep-link relay ──────────────────────────────────────────────────
 * Same trick as ToolsView: command-palette deep links can lose their
 * params to nav.syncFromHash before this lazy chunk mounts — capture the
 * projectId at store level and replay it on mount. */
const deepLinkQueue: string[] = [];
if (typeof window !== "undefined") {
  useNav.subscribe((state, prev) => {
    const id = state.params?.projectId;
    if (id && id !== prev.params?.projectId && state.view !== "projects") deepLinkQueue.push(id);
  });
}

function DifficultyDots({ level }: { level: number }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-[3px]" dir="ltr" title={`${t("difficulty")} ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${DOT_SIZES[i - 1] ?? "size-1"} rounded-full ${i <= level ? "bg-emerald-500" : "bg-muted-foreground/25"}`}
        />
      ))}
    </span>
  );
}

/* ── project card (terminal-library catalog entry) ──────────────────── */
function ProjectCard({
  p, i, highlighted, forceOpen, cardRef,
}: {
  p: ProjectIdea;
  i: number;
  highlighted: boolean;
  forceOpen: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const { t, bi } = useLang();
  const marked = useProgress((s) => s.projectBookmarks.includes(p.id));
  const toggle = useProgress((s) => s.toggleProjectBookmark);
  const [open, setOpen] = useState(forceOpen);
  const cat = projectCategoryById(p.category);
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] ?? Rocket;

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  return (
    <div className="rise-in" style={{ animationDelay: `${Math.min(i * 35, 560)}ms` }}>
      <div
        ref={cardRef}
        className={`hud-panel flex h-full flex-col gap-2.5 rounded-xl bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/50 ${highlighted ? "ring-2 ring-primary/70" : ""}`}
      >
        {/* title · id · done toggle */}
        <div className="flex items-start gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-black leading-snug">{bi(p.title)}</div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="code-chip shrink-0">{p.id}</span>
              <span className="truncate text-[9.5px] text-muted-foreground">{bi(cat.name)}</span>
              <DifficultyDots level={p.difficulty} />
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={() => toggle(p.id)}
            aria-label={t("markAsDone")}
            aria-pressed={marked}
            className={`shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors ${marked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={marked ? "done" : "todo"}
                initial={{ scale: 0.4, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.4, rotate: 25, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 16 }}
                className="block"
              >
                {marked ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <p className="text-[12px] leading-6 text-muted-foreground">{bi(p.desc)}</p>

        {/* time-to-market chip + honest revenue line */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2 py-1.5">
            <Clock className="size-3.5 shrink-0 text-primary" />
            <span className="min-w-0 truncate text-[10.5px] font-bold" title={bi(p.timeToMarket)}>
              {bi(p.timeToMarket)}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1.5">
            <TrendingUp className="size-3.5 shrink-0 text-emerald-500" />
            <span className="min-w-0 truncate text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400" dir="ltr" title={bi(p.revenue)}>
              {bi(p.revenue)}
            </span>
          </div>
        </div>

        {/* monetization as a terminal window */}
        <div className="term-window overflow-hidden rounded-xl">
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-1" dir="ltr">
            <span className="term-dots inline-block h-2.5 shrink-0" />
            <span className="code-chip shrink-0">project.monetize</span>
            <span className="dot-leader" />
          </div>
          <div className="px-3 py-2 text-[11.5px] leading-5">{bi(p.monetization)}</div>
        </div>

        {/* skills (max 4 + overflow) */}
        {p.skills.length > 0 && (
          <div className="flex flex-wrap gap-1" dir="ltr">
            {p.skills.slice(0, 4).map((s) => (
              <span key={s} className="rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                {s}
              </span>
            ))}
            {p.skills.length > 4 && (
              <span className="self-center font-mono text-[9px] text-muted-foreground/70">+{p.skills.length - 4}</span>
            )}
          </div>
        )}

        {/* steps toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-auto h-7 w-full gap-1 text-[11px] font-bold"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <ListOrdered className="size-3.5" />
          {t("actionSteps")}
          <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>

        {/* numbered terminal lines */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.ol
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="space-y-1.5 overflow-hidden"
            >
              {p.steps.map((s, j) => (
                <li key={j} className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/30 px-2 py-1.5">
                  <span className="code-chip mt-px shrink-0" dir="ltr">{String(j + 1).padStart(2, "0")}</span>
                  <span className="text-[11.5px] leading-5">{bi(s)}</span>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── view ───────────────────────────────────────────────────────────── */
export default function ProjectsView() {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.projectBookmarks);
  const params = useNav((s) => s.params);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [maxDiff, setMaxDiff] = useState(5);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [forceOpenId, setForceOpenId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const handledRef = useRef<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_PROJECTS.filter((p: ProjectIdea) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (bookmarkedOnly && !bookmarks.includes(p.id)) return false;
      if (p.difficulty > maxDiff) return false;
      if (!needle) return true;
      return (
        p.title.ar.includes(needle) ||
        p.title.en.toLowerCase().includes(needle) ||
        p.desc.ar.includes(needle) ||
        p.desc.en.toLowerCase().includes(needle) ||
        p.skills.some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [q, cat, bookmarkedOnly, bookmarks, maxDiff]);

  const catCount = (id: string) => ALL_PROJECTS.filter((p) => p.category === id).length;

  /* deep link (command palette → params.projectId): reset filters so the
   * project is visible, highlight it, expand its steps, scroll to it once */
  const openProjectFromLink = (id: string) => {
    const proj = ALL_PROJECTS.find((p) => p.id === id);
    if (!proj) return;
    setQ("");
    setBookmarkedOnly(false);
    setMaxDiff(5);
    setCat(proj.category);
    setHighlightId(id);
    setForceOpenId(id);
    setTimeout(() => {
      const el = cardRefs.current[id];
      if (el && el.isConnected) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  useEffect(() => {
    const queued = deepLinkQueue.length > 0 ? deepLinkQueue[deepLinkQueue.length - 1] : null;
    if (queued) deepLinkQueue.length = 0;
    const id = queued ?? params?.projectId ?? null;
    if (!id || handledRef.current === id) return;
    handledRef.current = id;
    openProjectFromLink(id);
     
  }, [params]);

  return (
    <div className="space-y-3">
      {/* section header */}
      <div className="rise-in flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Rocket className="size-4" />
        </span>
        <h2 className="truncate text-sm font-black">{t("ideasTitle")}</h2>
        <span className="code-chip shrink-0">projects.index</span>
        <span className="dot-leader" />
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground" dir="ltr">
          {TOTAL_PROJECTS} {t("entries")}
        </span>
      </div>

      {/* search + difficulty chips + done filter */}
      <div className="rise-in flex flex-col gap-2 sm:flex-row" style={{ animationDelay: "40ms" }}>
        <div className="relative min-w-0 flex-1">
          <Terminal className="absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-primary" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchProjects")}
            className="h-10 ps-9 pe-8 text-xs"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 select-none font-mono text-sm leading-none text-muted-foreground/60"
          >
            ⌕
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setMaxDiff(d)}
                aria-pressed={maxDiff === d}
                title={lang === "ar" ? `صعوبة حتى ${d}` : `up to difficulty ${d}`}
                className={`shrink-0 cursor-pointer rounded-md border px-2 py-1.5 font-mono text-[10px] font-bold transition-all ${
                  maxDiff === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 text-muted-foreground/70 hover:border-primary/40 hover:text-muted-foreground"
                }`}
              >
                ≤{d}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBookmarkedOnly((v) => !v)}
            aria-pressed={bookmarkedOnly}
            className={`h-10 gap-1.5 text-[11px] font-bold ${bookmarkedOnly ? "border-primary bg-primary/10 text-primary" : ""}`}
          >
            {bookmarkedOnly ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
            {t("ideasCompleted")}: <span className="font-mono tabular-nums">{bookmarks.length}</span>
          </Button>
        </div>
      </div>

      {/* category pill row — wraps on desktop, scrolls on mobile */}
      <div
        className="rise-in flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin] sm:flex-wrap sm:overflow-visible sm:pb-0"
        style={{ animationDelay: "80ms" }}
      >
        <button
          onClick={() => setCat("all")}
          className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
            cat === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {t("allCategories")} <span className="font-mono opacity-80">({TOTAL_PROJECTS})</span>
        </button>
        {PROJECT_CATEGORIES.map((c) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Rocket;
          return (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
                cat === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5 shrink-0" />
              {bi(c.name)} <span className="font-mono opacity-80">({catCount(c.id)})</span>
            </button>
          );
        })}
      </div>

      {/* mono status / results count */}
      <div className="rise-in flex items-center gap-2 font-mono text-[10px] text-muted-foreground" dir="ltr" style={{ animationDelay: "110ms" }}>
        <span className="inline-block size-1.5 rounded-full bg-emerald-500 blink-dot" />
        <span>
          <span className="font-bold text-primary">{filtered.length}</span>/{TOTAL_PROJECTS} {t("resultsFound")}
        </span>
        <span className="opacity-50">
          · {PROJECT_CATEGORIES.length} {lang === "ar" ? "فئة" : "categories"}
        </span>
      </div>

      {/* projects grid */}
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 60).map((p, i) => (
          <ProjectCard
            key={p.id}
            p={p}
            i={i}
            highlighted={highlightId === p.id}
            forceOpen={forceOpenId === p.id}
            cardRef={(el) => {
              cardRefs.current[p.id] = el;
            }}
          />
        ))}
      </div>

      {filtered.length > 60 && (
        <div className="py-3 text-center text-[11px] text-muted-foreground">
          {lang === "ar"
            ? `تُعرض أول ٦٠ فكرة من ${filtered.length} — استخدم الفلاتر`
            : `Showing first 60 of ${filtered.length} — use filters`}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="hud-panel rounded-xl bg-card py-12 text-center">
          <div className="font-mono text-xs text-muted-foreground" dir="ltr">
            <span className="text-base text-primary">
              <span className="caret">▍</span>
            </span>{" "}
            grep: 0 matches
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">
            {lang === "ar" ? "لا مشاريع مطابقة" : "No matching projects"}
          </p>
        </div>
      )}
    </div>
  );
}
