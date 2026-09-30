"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Command, CommandInput } from "@/components/ui/command";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, CircleHelp, RefreshCw, Wrench, Rocket, FlaskConical,
  Trophy, Settings, Swords, Layers3, Search, Terminal, Languages,
  FileText, ChevronRight, CornerDownLeft, ArrowUp, ArrowDown, Network, Zap, Award, LineChart,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useTheme } from "next-themes";
import type { ViewId } from "@/lib/types";
import { ALL_LESSONS } from "@/data/lessons";
import { ALL_TOOLS } from "@/data/tools";
import { ALL_PROJECTS } from "@/data/projects";
import { MODULES } from "@/data/modules";

/* ── corpus ─────────────────────────────────────────────── */

type Group = "nav" | "cmd" | "lesson" | "tool" | "project";
type Entry = {
  id: string;
  group: Group;
  label: string;
  alt: string;
  sub: string;
  haystack: string;
  icon: React.ElementType;
  run: () => void;
};

const NAV_ICONS: Record<ViewId, React.ElementType> = {
  dashboard: LayoutDashboard, lessons: BookOpen, quizzes: CircleHelp, review: RefreshCw,
  tools: Wrench, projects: Rocket, playground: FlaskConical, challenges: Swords,
  certificates: Award, analytics: LineChart, integrations: Layers3, achievements: Trophy, settings: Settings,
};

/** strip arabic diacritics + lowercase for tolerant matching */
const norm = (s: string) =>
  s.toLowerCase().replace(/[\u064B-\u0652\u0670\u0640]/g, "").trim();

function buildCorpus(lang: "ar" | "en", go: (v: ViewId, p?: Record<string, string>) => void, extra: { theme: (t: string) => void; lang: (l: "ar" | "en") => void }): Entry[] {
  const other = lang === "ar" ? "en" : "ar";
  const out: Entry[] = [];

  const views: { v: ViewId; ar: string; en: string }[] = [
    { v: "dashboard", ar: "الرئيسية", en: "Dashboard" },
    { v: "lessons", ar: "الدروس", en: "Lessons" },
    { v: "quizzes", ar: "الاختبارات", en: "Quizzes" },
    { v: "review", ar: "المراجعة", en: "Review" },
    { v: "tools", ar: "الأدوات", en: "Tools" },
    { v: "projects", ar: "المشاريع", en: "Projects" },
    { v: "playground", ar: "المختبر التفاعلي", en: "Playground" },
    { v: "challenges", ar: "التحديات", en: "Challenges" },
    { v: "certificates", ar: "الشهادات", en: "Certificates" },
    { v: "analytics", ar: "التقييم والتقارير", en: "Assessment & Reports" },
    { v: "integrations", ar: "التكاملات", en: "Integrations" },
    { v: "achievements", ar: "الإنجازات", en: "Achievements" },
    { v: "settings", ar: "الإعدادات", en: "Settings" },
  ];
  for (const x of views) {
    out.push({
      id: x.v, group: "nav", label: x[lang], alt: x[other], sub: `~/${x.v}`,
      haystack: norm(`${x.v} ${x.ar} ${x.en}`), icon: NAV_ICONS[x.v],
      run: () => go(x.v),
    });
  }

  out.push(
    {
      id: "cmd-theme", group: "cmd", label: lang === "ar" ? "تبديل المظهر داكن/فاتح" : "Toggle dark / light theme",
      alt: "", sub: "theme.toggle", haystack: norm(`theme dark light appearance مظهر داكن فاتح`), icon: CircleHelp,
      run: () => extra.theme("toggle"),
    },
    {
      id: "cmd-lang", group: "cmd", label: lang === "ar" ? "تبديل اللغة إلى الإنجليزية" : "التبديل إلى العربية",
      alt: "", sub: "lang.switch", haystack: norm(`language english arabic عربي انجليزي لغة english`), icon: Languages,
      run: () => extra.lang(other),
    },
    {
      id: "cmd-final", group: "cmd", label: lang === "ar" ? "ابدأ الاختبار الشامل النهائي" : "Start the final comprehensive exam",
      alt: "", sub: "quiz.final", haystack: norm(`final exam quiz امتحان نهائي شامل اختبار`), icon: CircleHelp,
      run: () => go("quizzes", { exam: "final" }),
    },
    {
      id: "cmd-netsim", group: "cmd", label: lang === "ar" ? "فتح محاكي الشبكة NetSim" : "Open NetSim network simulator",
      alt: "", sub: "netsim.open", haystack: norm(`netsim simulator packet tracer محاكي الشبكة`), icon: Network,
      run: () => go("playground", { tool: "netsim" }),
    },
  );

  for (const l of ALL_LESSONS) {
    out.push({
      id: l.id, group: "lesson", label: l.title[lang], alt: l.title[other],
      sub: `${MODULES.find((m) => m.id === l.moduleId)?.id ?? ""} · ${l.durationMin}${lang === "ar" ? "د" : "m"}`,
      haystack: norm(`${l.id} ${l.title.ar} ${l.title.en} ${l.summary.ar} ${l.summary.en}`),
      icon: FileText,
      run: () => go("lessons", { lessonId: l.id }),
    });
  }

  for (const t of ALL_TOOLS) {
    out.push({
      id: t.id, group: "tool", label: t.name, alt: "", sub: t.category,
      haystack: norm(`${t.id} ${t.name} ${t.tags.join(" ")} ${t.desc.ar} ${t.desc.en}`),
      icon: Wrench,
      run: () => go("tools", { toolId: t.id }),
    });
  }

  for (const p of ALL_PROJECTS) {
    out.push({
      id: p.id, group: "project", label: p.title[lang], alt: p.title[other],
      sub: `${p.difficulty}/5`,
      haystack: norm(`${p.id} ${p.title.ar} ${p.title.en} ${p.skills.join(" ")}`),
      icon: Rocket,
      run: () => go("projects", { projectId: p.id }),
    });
  }

  return out;
}

/* ── scoring ────────────────────────────────────────────── */

function scoreEntry(haystack: string, tokens: string[]): number {
  let total = 0;
  for (const tk of tokens) {
    if (!tk) continue;
    let best = 0;
    const idx = haystack.indexOf(tk);
    if (idx === 0) best = 100;
    else if (idx > 0) best = 72;
    else {
      // subsequence fallback (fuzzy)
      let hi = 0;
      let hits = 0;
      for (const ch of tk) {
        const f = haystack.indexOf(ch, hi);
        if (f === -1) { hits = 0; break; }
        hits++;
        hi = f + 1;
      }
      if (hits > 0 && hits === tk.length) best = 38;
    }
    if (best === 0) return 0; // AND semantics
    total += best;
  }
  return total;
}

const LIMITS: Record<Group, number> = { nav: 11, cmd: 4, lesson: 8, tool: 12, project: 6 };

/* ── component ──────────────────────────────────────────── */

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { lang, t, setLang } = useLang();
  const go = useNav((s) => s.go);
  const { setTheme } = useTheme();
  const [q, setQ] = useState("");

  const corpus = useMemo(
    () => buildCorpus(lang, go, { theme: setTheme, lang: (l) => setLang(l) }),
     
    [lang]
  );

  const tokens = useMemo(() => norm(q).split(/\s+/).filter(Boolean), [q]);

  const results = useMemo(() => {
    if (tokens.length === 0) {
      // default: views + commands only
      return corpus.filter((e) => e.group === "nav" || e.group === "cmd");
    }
    const scored = corpus
      .map((e) => ({ e, s: scoreEntry(e.haystack, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);
    const counts: Record<Group, number> = { nav: 0, cmd: 0, lesson: 0, tool: 0, project: 0 };
    const out: Entry[] = [];
    for (const { e } of scored) {
      if (counts[e.group] >= LIMITS[e.group]) continue;
      counts[e.group]++;
      out.push(e);
    }
    return out;
  }, [corpus, tokens]);

  const grouped = useMemo(() => {
    const g: Partial<Record<Group, Entry[]>> = {};
    for (const e of results) (g[e.group] ??= []).push(e);
    return g;
  }, [results]);

  const hasResults = results.length > 0;

  useEffect(() => { if (open) setQ(""); }, [open]);

  const runEntry = (e: Entry) => {
    e.run();
    setOpen(false);
  };

  const GROUP_META: Record<Group, { path: string; label: string }> = {
    nav: { path: "nav/", label: t("quickJump") },
    cmd: { path: "cmd/", label: t("quickCommands") },
    lesson: { path: "lessons/", label: t("lessons") },
    tool: { path: "tools/", label: t("tools") },
    project: { path: "projects/", label: t("projects") },
  };
  const ORDER: Group[] = ["nav", "cmd", "lesson", "tool", "project"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" onClick={() => setOpen(false)} />
          <motion.div
            className="relative w-full max-w-xl rounded-xl border border-primary/30 bg-popover/95 backdrop-blur-xl shadow-2xl overflow-hidden hud-panel"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            role="dialog"
            aria-label={t("commandPalette")}
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-border/70 px-3.5 py-2 bg-muted/40">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[oklch(0.68_0.19_25)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.78_0.16_85)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.72_0.17_150)]" />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground ms-1" dir="ltr">cnss://command-palette</span>
              <span className="ms-auto font-mono text-[9.5px] text-primary/70" dir="ltr">v3.0</span>
            </div>

            <Command shouldFilter={false} className="bg-transparent" loop>
              <div className="flex items-center gap-2.5 border-b border-border/70 px-4">
                <Terminal className="size-4 text-primary shrink-0" />
                <CommandInput
                  value={q}
                  onValueChange={setQ}
                  placeholder={t("searchEverything")}
                  className="h-11 text-[13px] font-medium"
                />
                <span className="kbd shrink-0 hidden sm:inline-flex">esc</span>
              </div>

              <div className="max-h-[52vh] overflow-y-auto py-2 px-1.5">
                {!hasResults && (
                  <div className="px-4 py-8 text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
                    <Search className="size-5 mx-auto text-muted-foreground/60 mb-2" />
                    <p className="text-[12px] text-muted-foreground">{t("noResultsFound")}</p>
                    <span className="caret inline-block h-3 w-1.5 bg-primary align-middle" />
                  </div>
                )}

                {ORDER.map((g) => {
                  const items = grouped[g];
                  if (!items?.length) return null;
                  const meta = GROUP_META[g];
                  return (
                    <div key={g} className="mb-1.5">
                      <div className="flex items-center gap-2 px-3 py-1.5">
                        <span className="code-chip">{meta.path}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">{meta.label}</span>
                        <span className="dot-leader" />
                        <span className="font-mono text-[9.5px] text-muted-foreground/70">{items.length}</span>
                      </div>
                      {items.map((e) => (
                        <button
                          key={`${e.group}-${e.id}`}
                          onClick={() => runEntry(e)}
                          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start outline-none transition-colors hover:bg-primary/10 focus-visible:bg-primary/15"
                          data-cmdk-item
                        >
                          <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-border/60 bg-muted/60 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-colors">
                            <e.icon className="size-3.5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[12.5px] font-bold truncate">{e.label}</span>
                            {e.sub && <span className="block font-mono text-[9.5px] text-muted-foreground truncate" dir="ltr">{e.sub}</span>}
                          </span>
                          <span className="font-mono text-[9px] text-muted-foreground/50 shrink-0 hidden sm:inline" dir="ltr">{e.id}</span>
                          <ChevronRight className="size-3.5 text-muted-foreground/40 group-hover:text-primary rtl:rotate-180 shrink-0" />
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </Command>

            {/* footer hints */}
            <div className="flex items-center gap-3 border-t border-border/70 px-4 py-2 bg-muted/30">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="kbd"><ArrowUp className="size-2.5" /></span>
                <span className="kbd"><ArrowDown className="size-2.5" /></span>
                <span className="hidden sm:inline">{t("navigate")}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="kbd"><CornerDownLeft className="size-2.5" /></span>
                <span className="hidden sm:inline">{t("runCommand")}</span>
              </span>
              <span className="ms-auto flex items-center gap-1.5 font-mono text-[9.5px] text-muted-foreground/70">
                <Zap className="size-3 text-primary" />
                {corpus.length.toLocaleString()} {t("entries")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
