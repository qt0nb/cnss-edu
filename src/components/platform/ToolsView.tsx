"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wrench, Terminal, Star, Bookmark, BookmarkCheck, ExternalLink, Monitor,
  Globe, Smartphone, Apple, Laptop, Copy, Check, X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { useNav } from "@/lib/nav";
import { ALL_TOOLS, TOTAL_TOOLS, toolById } from "@/data/tools";
import { TOOL_CATEGORIES, toolCategoryById } from "@/data/toolCategories";
import type { Tool, ToolLicense, ToolPlatform } from "@/lib/types";
import * as Icons from "lucide-react";

const PlatformIcon: Record<ToolPlatform, React.ElementType> = {
  windows: Monitor,
  linux: Terminal,
  mac: Apple,
  web: Globe,
  cross: Laptop,
  android: Smartphone,
  ios: Smartphone,
};

const PlatformLabel: Record<ToolPlatform, string> = {
  windows: "win",
  linux: "linux",
  mac: "macOS",
  web: "web",
  cross: "cross-platform",
  android: "android",
  ios: "iOS",
};

const licenseSev: Record<ToolLicense, string> = {
  free: "chip-sev-ok",
  opensource: "chip-sev-ok",
  freemium: "chip-sev-info",
  paid: "chip-sev-warn",
};

const LICENSE_FILTERS: { id: string; active: string }[] = [
  { id: "all", active: "border-primary/60 bg-primary/15 text-primary" },
  { id: "free", active: "border-emerald-500/50 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { id: "opensource", active: "border-emerald-500/50 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { id: "freemium", active: "border-teal-500/50 bg-teal-500/15 text-teal-600 dark:text-teal-400" },
  { id: "paid", active: "border-amber-500/50 bg-amber-500/15 text-amber-600 dark:text-amber-400" },
];

const DOT_SIZES = ["size-1", "size-[5px]", "size-1.5", "size-[7px]", "size-2"];

/* ── deep-link relay ──────────────────────────────────────────────────
 * The command palette calls go("tools", { toolId }). On a cross-view jump
 * nav.syncFromHash can clear params a tick later — possibly before this
 * lazily-imported view mounts. Capture the id at store level so it survives
 * until mount; same-view jumps are handled by the live params effect. */
const deepLinkQueue: string[] = [];
if (typeof window !== "undefined") {
  useNav.subscribe((state, prev) => {
    const id = state.params?.toolId;
    if (id && id !== prev.params?.toolId && state.view !== "tools") deepLinkQueue.push(id);
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

/* ── tool card (terminal-library catalog entry) ─────────────────────── */
function ToolCard({
  tool, i, marked, highlighted, onToggle, onOpen, cardRef,
}: {
  tool: Tool;
  i: number;
  marked: boolean;
  highlighted: boolean;
  onToggle: (id: string) => void;
  onOpen: (tool: Tool) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const { t, bi } = useLang();
  const catMeta = toolCategoryById(tool.category);

  return (
    <div className="rise-in" style={{ animationDelay: `${Math.min(i * 28, 480)}ms` }}>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={() => onOpen(tool)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(tool);
          }
        }}
        className={`hud-panel flex h-full cursor-pointer flex-col gap-2 rounded-xl bg-card p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/50 focus-visible:ring-2 focus-visible:ring-primary/60 ${highlighted ? "ring-2 ring-primary/70" : ""}`}
      >
        {/* name · id · bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="glitch-hover truncate font-mono text-[13px] font-bold" dir="ltr" title={tool.name}>
              {tool.name}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="code-chip shrink-0">{tool.id}</span>
              <span className="truncate text-[9.5px] text-muted-foreground">{bi(catMeta.name)}</span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(tool.id);
            }}
            aria-label={t("bookmark")}
            aria-pressed={marked}
            className={`shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors ${marked ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={marked ? "marked" : "unmarked"}
                initial={{ scale: 0.4, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.4, rotate: 25, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 16 }}
                className="block"
              >
                <Star className={`size-4 ${marked ? "fill-primary text-primary" : ""}`} />
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        <p className="line-clamp-2 text-[11.5px] leading-5 text-muted-foreground">{bi(tool.desc)}</p>

        {/* one-line cmd preview */}
        {tool.cmd && (
          <div className="overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-950/90 px-2.5 py-1.5" dir="ltr" title={tool.cmd}>
            <code className="block truncate font-mono text-[10.5px] leading-4 text-emerald-300/90">$ {tool.cmd}</code>
          </div>
        )}

        {/* tags (max 3 + overflow) */}
        {tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1" dir="ltr">
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                {tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="self-center font-mono text-[9px] text-muted-foreground/70">+{tool.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* meta footer */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <span className="flex shrink-0 gap-1" dir="ltr" title={tool.platform.join(" · ")}>
            {tool.platform.map((p) => {
              const PI = PlatformIcon[p];
              return <PI key={p} className="size-3.5 text-muted-foreground" />;
            })}
          </span>
          <span className={`chip-sev shrink-0 ${licenseSev[tool.license]}`}>{t(tool.license)}</span>
          <DifficultyDots level={tool.difficulty} />
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ms-auto inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
              dir="ltr"
            >
              {t("openWebsite")} <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── tool detail dialog (ops-console spec) ──────────────────────────── */
function ToolDialog({ tool, onClose }: { tool: Tool | null; onClose: () => void }) {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.toolBookmarks);
  const toggleBookmark = useProgress((s) => s.toggleToolBookmark);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCopied(false);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [tool?.id]);

  const marked = tool ? bookmarks.includes(tool.id) : false;

  const copyCmd = async () => {
    if (!tool?.cmd) return;
    try {
      await navigator.clipboard.writeText(tool.cmd);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — silently skip */
    }
  };

  return (
    <Dialog open={tool != null} onOpenChange={(o) => { if (!o) onClose(); }}>
      {tool && (
        <DialogContent className="max-h-[85vh] gap-3 overflow-y-auto p-4 sm:p-5">
          {/* header: mono name + id chip + external link */}
          <DialogHeader className="gap-0">
            <div className="flex items-center gap-2.5 pe-8" dir="ltr">
              <span className="term-dots inline-block h-2.5 shrink-0" />
              <DialogTitle className="min-w-0 flex-1 truncate font-mono text-base font-bold tracking-tight">
                {tool.name}
              </DialogTitle>
              <span className="code-chip shrink-0">{tool.id}</span>
              {tool.url && (
                <Button asChild variant="ghost" size="icon" className="size-7 shrink-0 text-primary">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" aria-label={t("openWebsite")} title={t("openWebsite")}>
                    <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </DialogHeader>

          {/* description feeds the Radix aria-describedby → no a11y warning */}
          <DialogDescription asChild>
            <p className="text-[12px] leading-6 text-muted-foreground">{bi(tool.desc)}</p>
          </DialogDescription>

          {/* example usage in a terminal window */}
          {tool.cmd && (
            <div className="term-window overflow-hidden rounded-xl" dir="ltr">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-1.5">
                <span className="term-dots inline-block h-2.5 shrink-0" />
                <span className="code-chip shrink-0">usage</span>
                <span className="dot-leader" />
                <button
                  onClick={copyCmd}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
                >
                  {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  {copied ? (lang === "ar" ? "تم النسخ" : "copied") : lang === "ar" ? "نسخ" : "copy"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-all px-4 py-2.5 font-mono text-[11px] leading-5 text-emerald-300">
                $ {tool.cmd}
              </pre>
              {tool.cmdDesc && (
                <div className="px-4 pb-3 text-[11px] leading-5 text-muted-foreground">{bi(tool.cmdDesc)}</div>
              )}
            </div>
          )}

          {/* meta grid: mono rows with dot leaders */}
          <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2" dir="ltr">
            <div className="flex items-center gap-2 font-mono text-[10.5px]">
              <span className="shrink-0 text-muted-foreground">platform</span>
              <span className="dot-leader" />
              <span className="min-w-0 truncate">{tool.platform.map((p) => PlatformLabel[p]).join(" · ")}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10.5px]">
              <span className="shrink-0 text-muted-foreground">license</span>
              <span className="dot-leader" />
              <span className={`chip-sev shrink-0 ${licenseSev[tool.license]}`}>{t(tool.license)}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10.5px]">
              <span className="shrink-0 text-muted-foreground">difficulty</span>
              <span className="dot-leader" />
              <DifficultyDots level={tool.difficulty} />
              <span className="shrink-0 text-muted-foreground">{tool.difficulty}/5</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10.5px]">
              <span className="shrink-0 text-muted-foreground">category</span>
              <span className="dot-leader" />
              <span className="min-w-0 truncate">{bi(toolCategoryById(tool.category).name)}</span>
            </div>
          </div>

          {tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1" dir="ltr">
              {tool.tags.map((tag) => (
                <span key={tag} className="rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <DialogFooter className="gap-2 border-t border-border/60 pt-3 sm:justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleBookmark(tool.id)}
              className={`gap-1.5 text-[11px] font-bold ${marked ? "border-primary text-primary" : ""}`}
              aria-pressed={marked}
            >
              <Star className={`size-3.5 ${marked ? "fill-primary text-primary" : ""}`} />
              {marked ? t("bookmarked") : t("bookmark")}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-7 gap-1.5 px-2 text-[10px]">
              <X className="size-3" /> <span className="kbd">esc</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

/* ── view ───────────────────────────────────────────────────────────── */
export default function ToolsView() {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.toolBookmarks);
  const toggleBookmark = useProgress((s) => s.toggleToolBookmark);
  const params = useNav((s) => s.params);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [license, setLicense] = useState<string>("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const handledRef = useRef<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_TOOLS.filter((tool: Tool) => {
      if (cat !== "all" && tool.category !== cat) return false;
      if (license !== "all" && tool.license !== license) return false;
      if (bookmarkedOnly && !bookmarks.includes(tool.id)) return false;
      if (!needle) return true;
      return (
        tool.name.toLowerCase().includes(needle) ||
        tool.desc.ar.includes(needle) ||
        tool.desc.en.toLowerCase().includes(needle) ||
        tool.tags.some((tag) => tag.includes(needle))
      );
    });
  }, [q, cat, license, bookmarkedOnly, bookmarks]);

  const catCount = (id: string) => ALL_TOOLS.filter((x) => x.category === id).length;

  /* deep link (command palette → params.toolId): make the tool visible and
   * open its dialog once — params are read-only, never cleaned here */
  const openToolFromLink = (id: string) => {
    const tool = toolById(id);
    if (!tool) return;
    setQ("");
    setLicense("all");
    setBookmarkedOnly(false);
    setCat(tool.category);
    setHighlightId(id);
    setActiveTool(tool);
  };

  useEffect(() => {
    const queued = deepLinkQueue.length > 0 ? deepLinkQueue[deepLinkQueue.length - 1] : null;
    if (queued) deepLinkQueue.length = 0;
    const id = queued ?? params?.toolId ?? null;
    if (!id || handledRef.current === id) return;
    handledRef.current = id;
    openToolFromLink(id);
     
  }, [params]);

  const closeDialog = () => {
    const deep = activeTool != null && highlightId === activeTool.id;
    setActiveTool(null);
    if (deep) {
      setTimeout(() => {
        const el = highlightId ? cardRefs.current[highlightId] : null;
        if (el && el.isConnected) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  return (
    <div className="space-y-3">
      {/* section header */}
      <div className="rise-in flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Wrench className="size-4" />
        </span>
        <h2 className="truncate text-sm font-black">{t("toolsLibrary")}</h2>
        <span className="code-chip shrink-0">tools.index</span>
        <span className="dot-leader" />
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground" dir="ltr">
          {TOTAL_TOOLS.toLocaleString()} {t("entries")}
        </span>
      </div>

      {/* search + license chips + bookmarked-only */}
      <div className="rise-in flex flex-col gap-2 sm:flex-row" style={{ animationDelay: "40ms" }}>
        <div className="relative min-w-0 flex-1">
          <Terminal className="absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-primary" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchTools")}
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
          {LICENSE_FILTERS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLicense(l.id)}
              aria-pressed={license === l.id}
              className={`shrink-0 cursor-pointer rounded-md border px-2 py-1.5 font-mono text-[10px] font-bold transition-all ${
                license === l.id ? l.active : "border-border/60 text-muted-foreground/70 hover:border-primary/40 hover:text-muted-foreground"
              }`}
            >
              {l.id === "all" ? (lang === "ar" ? "الكل" : "all") : t(l.id)}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBookmarkedOnly((v) => !v)}
            aria-pressed={bookmarkedOnly}
            className={`h-10 gap-1.5 text-[11px] font-bold ${bookmarkedOnly ? "border-primary bg-primary/10 text-primary" : ""}`}
          >
            {bookmarkedOnly ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
            <span className="font-mono tabular-nums">{bookmarks.length}</span>
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
          {t("allCategories")} <span className="font-mono opacity-80">({TOTAL_TOOLS})</span>
        </button>
        {TOOL_CATEGORIES.map((c) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Wrench;
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
          <span className="font-bold text-primary">{filtered.length.toLocaleString()}</span>/{TOTAL_TOOLS.toLocaleString()} {t("resultsFound")}
        </span>
        <span className="opacity-50">
          · {TOOL_CATEGORIES.length} {lang === "ar" ? "فئة" : "categories"}
        </span>
      </div>

      {/* tools grid */}
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 120).map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            i={i}
            marked={bookmarks.includes(tool.id)}
            highlighted={highlightId === tool.id}
            onToggle={toggleBookmark}
            onOpen={setActiveTool}
            cardRef={(el) => {
              cardRefs.current[tool.id] = el;
            }}
          />
        ))}
      </div>

      {filtered.length > 120 && (
        <div className="py-3 text-center text-[11px] text-muted-foreground">
          {lang === "ar"
            ? `تُعرض أول ١٢٠ نتيجة من ${filtered.length} — نقّ البحث للوصول أدق`
            : `Showing first 120 of ${filtered.length} — refine your search`}
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
          <p className="mt-2 text-[12px] text-muted-foreground">{t("noToolsFound")}</p>
        </div>
      )}

      <ToolDialog tool={activeTool} onClose={closeDialog} />
    </div>
  );
}
