"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronLeft, ChevronRight, ArrowLeft, ArrowDown, ArrowRight, Clock, Lightbulb,
  CheckCircle2, Terminal, CircleHelp, ListChecks, X, Network, FileText, Copy,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { searchLessons } from "@/lib/data";
import { MODULES, moduleById } from "@/data/modules";
import { lessonsByModule, lessonById, ALL_LESSONS } from "@/data/lessons";
import { LESSON_SOURCES } from "@/data/lessonSources";
import { LESSON_INTERACTIVES } from "@/data/lessonInteractives";
import SourceBoxes from "@/components/platform/lesson/SourceBoxes";
import CertTeaser from "@/components/platform/lesson/CertTeaser";
import type {
  Bi, CodeExample, CommandEntry, Lesson, LessonInteractive, LessonLevel, LessonSection,
  LessonTable, LessonDiagram, ModuleMeta,
} from "@/lib/types";
import * as Icons from "lucide-react";

/* ── interactive checkpoint engine (heavy — loaded on demand) ────────── */

const InteractiveBlock = dynamic(() => import("@/components/platform/lesson/InteractiveBlocks"), {
  ssr: false,
  loading: () => <CheckpointLoading />,
});

function CheckpointLoading() {
  const { lang } = useLang();
  return (
    <div className="hud-panel rise-in flex min-h-24 items-center gap-2.5 rounded-xl px-3.5 py-3" style={{ backgroundColor: "var(--card)" }}>
      <span className="eq-bars" aria-hidden><i /><i /><i /><i /></span>
      <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">
        {lang === "ar" ? "جارٍ تحميل نقطة التحقق التفاعلية…" : "loading interactive checkpoint…"}
      </span>
    </div>
  );
}

/* ── v3 ops-console tokens ───────────────────────────────────────────── */

/** level → severity chip (emerald/teal/amber/rose only) */
const levelSev: Record<LessonLevel, string> = {
  beginner: "chip-sev-ok",
  intermediate: "chip-sev-info",
  advanced: "chip-sev-warn",
  expert: "chip-sev-crit",
};

/** level → filled-dot count for file-tree rows */
const levelDotCount: Record<LessonLevel, number> = {
  beginner: 1, intermediate: 2, advanced: 3, expert: 4,
};

/** solid dark base layered under term-window chrome (readable in light + dark mode) */
const TERM_BG = "#09090b";

/** level as 1-4 filled dots */
function LevelDots({ level }: { level: LessonLevel }) {
  const { t } = useLang();
  const n = levelDotCount[level] ?? 1;
  return (
    <span className="flex shrink-0 items-center gap-[3px]" role="img" aria-label={t(level)}>
      {[1, 2, 3, 4].map((i) => (
        <span key={i} className={`size-1.5 rounded-full ${i <= n ? "bg-primary" : "bg-border"}`} />
      ))}
    </span>
  );
}

function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? BookOpen;
  return <Icon className={className} />;
}

/* ── lesson body (preserved typography: \n\n paragraphs, "- " bullets) ─ */

function Body({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <div className="space-y-2.5">
      {paragraphs.map((para, i) => {
        const lines = para.split("\n");
        const bullets = lines.filter((l) => l.startsWith("- "));
        const texts = lines.filter((l) => !l.startsWith("- "));
        if (bullets.length > 0 || texts.length > 0) {
          return (
            <div key={i} className="space-y-1.5">
              {texts.map((t, j) => (
                <p key={j} className="text-[13.5px] leading-7 text-foreground/90">{t}</p>
              ))}
              {bullets.length > 0 && (
                <ul className="space-y-1 ms-1">
                  {bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-[13px] leading-7 text-foreground/85">
                      <span className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
                      {b.slice(2)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return <p key={i} className="text-[13.5px] leading-7">{para}</p>;
      })}
    </div>
  );
}

/* ── code block in terminal window chrome ────────────────────────────── */

function CodeBlock({ code, lessonId, sectionIdx }: { code: CodeExample; lessonId: string; sectionIdx: number }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  return (
    <div className="term-window overflow-hidden" dir="ltr" style={{ backgroundColor: TERM_BG }}>
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
        <span className="term-dots shrink-0" aria-hidden />
        <span className="truncate font-mono text-[10px] text-zinc-400">lesson.{lessonId}#s{sectionIdx + 1}</span>
        <span className="dot-leader" />
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-emerald-400">{code.lang}</span>
        <button
          className="shrink-0 text-[10px] font-bold text-zinc-400 hover:text-emerald-300"
          onClick={() => {
            navigator.clipboard?.writeText(code.snippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? t("copied") : "COPY"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-[12px] leading-relaxed text-emerald-200">{code.snippet}</pre>
    </div>
  );
}

/* ─── Lesson table + diagram renderers ─────────────────────────────────── */

/** A cell is rendered mono/LTR when it holds technical notation (no Arabic + digits/symbols) */
function isTechnicalCell(v: string) {
  return !/[\u0600-\u06FF]/.test(v) && /[\d./:~-]/.test(v);
}

function LessonTableBlock({ table }: { table: LessonTable }) {
  const { bi } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border overflow-hidden bg-card"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          {table.caption ? (
            <caption className="px-3 pt-2.5 text-start text-[10.5px] font-bold text-muted-foreground">{bi(table.caption)}</caption>
          ) : null}
          <thead>
            <tr className="bg-muted/60">
              {table.headers.map((h, j) => (
                <th key={j} className="whitespace-nowrap px-3 py-2 text-start font-mono text-[10.5px] font-bold text-foreground/85">{bi(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className={`transition-colors hover:bg-accent/40 ${i % 2 === 1 ? "bg-muted/30" : ""}`}>
                {r.map((c, j) => {
                  const v = bi(c);
                  const tech = isTechnicalCell(v);
                  return (
                    <td
                      key={j}
                      dir={tech ? "ltr" : undefined}
                      className={`px-3 py-1.5 text-start align-top leading-6 text-foreground/85 border-t ${tech ? "font-mono text-[11px]" : ""}`}
                    >
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function DiagramLegend() {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] font-bold text-muted-foreground/80">
      <Network className="size-3" />
      <span>مخطط توضيحي / Illustrative diagram</span>
    </div>
  );
}

/** Vertical stack of boxes (OSI layers, PDU encapsulation) — top→bottom, numbered len-i */
function DiagramLayers({ d }: { d: LessonDiagram }) {
  const { bi } = useLang();
  const items = d.items ?? [];
  const len = items.length;
  if (len === 0) return null;
  return (
    <div className="max-w-md mx-auto flex flex-col">
      {items.map((it, i) => {
        const n = len - i;
        const hue = 160 + (len > 1 ? Math.round((i / (len - 1)) * 28) : 0);
        const depth = len > 1 ? i / (len - 1) : 0;
        return (
          <Fragment key={i}>
            {i > 0 && (
              <div className="flex justify-center py-0.5" aria-hidden>
                <ArrowDown className="size-3.5 text-muted-foreground" />
              </div>
            )}
            <div
              className="flex items-center gap-2.5 rounded-lg border p-2.5"
              style={{
                background: `hsl(${hue} 65% 45% / ${0.08 + depth * 0.14})`,
                borderColor: `hsl(${hue} 65% 45% / 0.4)`,
              }}
            >
              <span
                className="grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-black text-white"
                style={{ background: `hsl(${hue} 62% 38%)` }}
              >
                {n}
              </span>
              <span className="text-[12.5px] leading-6 font-semibold">{bi(it)}</span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

/** Horizontal pill steps joined by arrows (vertical on small screens) */
function DiagramFlow({ d }: { d: LessonDiagram }) {
  const { bi } = useLang();
  const items = d.items ?? [];
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-1.5">
      {items.map((it, i) => (
        <Fragment key={i}>
          <div className="flex-1 min-w-40 rounded-lg border bg-muted/40 p-2.5 flex items-start gap-2">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-black">{i + 1}</span>
            <span className="text-[12px] leading-6">{bi(it)}</span>
          </div>
          {i < items.length - 1 && (
            <div className="grid shrink-0 place-items-center py-0.5 sm:py-0 sm:px-0.5">
              <ArrowDown className="size-4 text-muted-foreground sm:hidden" />
              <ArrowRight className="hidden size-4 text-muted-foreground rtl:rotate-180 sm:block" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/** Mini network graph as inline SVG — circle layout ≤6 nodes, else 2 rows */
function DiagramTopology({ d }: { d: LessonDiagram }) {
  const nodes = d.nodes ?? [];
  const n = nodes.length;
  if (n === 0) return null;
  const W = 360;
  const H = n <= 6 ? 230 : 260;
  const pos: { x: number; y: number }[] = [];
  if (n <= 6) {
    const cx = W / 2;
    const cy = H / 2;
    const r = 78;
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      pos.push({ x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) });
    }
  } else {
    const per = Math.ceil(n / 2);
    const gapX = (W - 70) / Math.max(1, per - 1);
    for (let i = 0; i < n; i++) {
      const row = i < per ? 0 : 1;
      const col = row === 0 ? i : i - per;
      pos.push({ x: 40 + col * gapX, y: row === 0 ? H * 0.28 : H * 0.78 });
    }
  }
  const box = (label: string) => {
    const main = label.split("|")[0].trim();
    return { w: Math.max(50, main.length * 7.2 + 14), h: 24, label: main };
  };
  const edgePoint = (a: { x: number; y: number }, b: { x: number; y: number }, bw: number, bh: number) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 0 && dy === 0) return { x: a.x, y: a.y };
    const s = Math.min(bw / 2 / Math.abs(dx || 1e-9), bh / 2 / Math.abs(dy || 1e-9));
    return { x: a.x + dx * s, y: a.y + dy * s };
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto text-muted-foreground" role="img" aria-label="network topology" style={{ maxWidth: 420, margin: "0 auto" }}>
      {d.edges?.map(([ai, bi_], i) => {
        const a = pos[ai];
        const b = pos[bi_];
        if (!a || !b) return null;
        const na = box(nodes[ai]);
        const nb = box(nodes[bi_]);
        const p1 = edgePoint(a, b, na.w, na.h);
        const p2 = edgePoint(b, a, nb.w, nb.h);
        return (
          <g key={`e${i}`}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="currentColor" strokeWidth={1.4} />
            <circle cx={p1.x} cy={p1.y} r={2.6} fill="currentColor" />
            <circle cx={p2.x} cy={p2.y} r={2.6} fill="currentColor" />
          </g>
        );
      })}
      {nodes.map((raw, i) => {
        const { w, h, label } = box(raw);
        const p = pos[i];
        return (
          <g key={`n${i}`} transform={`translate(${p.x - w / 2}, ${p.y - h / 2})`}>
            <rect width={w} height={h} rx={7} ry={7} fill="var(--card)" stroke="var(--border)" strokeWidth={1.2} />
            <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--card-foreground)">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LessonDiagramBlock({ d }: { d: LessonDiagram }) {
  const { bi } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border bg-card/60 p-4 space-y-3"
    >
      {d.title ? <div className="text-center text-[12.5px] font-black">{bi(d.title)}</div> : null}
      {d.kind === "layers" ? <DiagramLayers d={d} /> : d.kind === "flow" ? <DiagramFlow d={d} /> : <DiagramTopology d={d} />}
      <DiagramLegend />
    </motion.div>
  );
}

/* ── lesson section: §-numbered + vertical data-rail accent ──────────── */

function SectionBlock({ s, i, lessonId }: { s: LessonSection; i: number; lessonId: string }) {
  const { t, bi } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(i * 0.06, 0.3) }}
      className="relative"
    >
      {/* vertical data-rail accent on the section side */}
      <span className="absolute start-0 top-1 bottom-1 w-0.5" aria-hidden>
        <span className="data-rail block h-full" />
      </span>
      <div className="ps-3 sm:ps-4 space-y-2.5">
        <h3 className="flex flex-wrap items-center gap-2 text-[15px] font-black">
          <span className="code-chip shrink-0" dir="ltr">§{i + 1}</span>
          {bi(s.heading)}
        </h3>
        <Body text={bi(s.body)} />
        {s.code && <CodeBlock code={s.code} lessonId={lessonId} sectionIdx={i} />}
        {s.table && <div className="pt-1"><LessonTableBlock table={s.table} /></div>}
        {s.diagram && <div className="pt-1"><LessonDiagramBlock d={s.diagram} /></div>}
        {s.tip && (
          <div>
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 flex gap-2.5 items-start">
              <Lightbulb className="size-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-black text-amber-600 dark:text-amber-400">{t("tip")}</div>
                <div className="text-[12.5px] leading-6 text-foreground/85">{bi(s.tip)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}

/* ── key takeaways: dark term block with emerald checks ──────────────── */

function TakeawaysBlock({ points }: { points: Bi[] }) {
  const { bi } = useLang();
  return (
    <div className="term-window p-4 sm:p-5 rise-in" style={{ animationDelay: "90ms", backgroundColor: TERM_BG }}>
      <div className="mb-3 flex items-center gap-2">
        <span className="code-chip shrink-0">lesson.takeaways</span>
        <span className="dot-leader" />
        <ListChecks className="size-3.5 shrink-0 text-primary" />
      </div>
      <ul className="space-y-2">
        {points.map((k, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            <span className="text-[13px] leading-6 font-semibold text-zinc-100">{bi(k)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── practical commands: term chrome + per-command copy ──────────────── */

function CommandsBlock({ commands }: { commands: CommandEntry[] }) {
  const { t, bi } = useLang();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const copy = (i: number, cmd: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx((cur) => (cur === i ? null : cur)), 1500);
  };
  return (
    <div className="term-window p-4 sm:p-5 rise-in" style={{ animationDelay: "120ms", backgroundColor: TERM_BG }}>
      <div className="mb-3 flex items-center gap-2">
        <span className="code-chip shrink-0">lesson.cmd</span>
        <span className="dot-leader" />
        <Terminal className="size-3.5 shrink-0 text-primary" />
      </div>
      <div className="space-y-2">
        {commands.map((c, i) => (
          <div key={i} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <code
              dir="ltr"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1.5 font-mono text-[11.5px] font-bold text-emerald-300 sm:self-auto"
            >
              {c.cmd}
              <button
                className="text-emerald-500/70 transition-colors hover:text-emerald-300"
                onClick={() => copy(i, c.cmd)}
                aria-label={copiedIdx === i ? t("copied") : "copy"}
              >
                {copiedIdx === i ? <CheckCircle2 className="size-3.5" /> : <Copy className="size-3" />}
              </button>
            </code>
            <span className="text-[12px] leading-6 text-zinc-300/90">{bi(c.desc)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── file-tree lesson row (module list + search results) ─────────────── */

function LessonRow({ lesson, mod, current }: { lesson: Lesson; mod?: ModuleMeta; current?: boolean }) {
  const { bi } = useLang();
  const completed = useProgress((s) => !!s.completedLessons[lesson.id]);
  return (
    <button
      onClick={() => useNav.getState().go("lessons", { lessonId: lesson.id })}
      className="group flex w-full items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 text-start transition-all hover:-translate-y-px hover:border-primary/40 hover:bg-accent/30"
    >
      {completed ? (
        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
      ) : current ? (
        <span className="relative grid size-4 shrink-0 place-items-center" aria-hidden>
          <span className="pulse-ring" />
          <span className="size-1.5 rounded-full bg-primary" />
        </span>
      ) : (
        <FileText className="size-4 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
      )}
      <span className="code-chip shrink-0" dir="ltr">{lesson.id}</span>
      <span className="truncate text-[12.5px] font-bold">{bi(lesson.title)}</span>
      {mod && (
        <span className="code-chip hidden shrink-0 lg:inline-flex" dir="ltr">{mod.id.toUpperCase()}</span>
      )}
      <span className="ms-auto flex shrink-0 items-center gap-2.5">
        <LevelDots level={lesson.level} />
        <span className="hidden items-center gap-1 font-mono text-[9.5px] text-muted-foreground sm:flex" dir="ltr">
          <Clock className="size-3" />
          {lesson.durationMin}m
        </span>
      </span>
    </button>
  );
}

/* ── reading progress: 2px emerald bar pinned to the viewport top ────── */
/** Isolated component so the heavy article never re-renders on scroll. */
function ReadingProgress({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const el = targetRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (vh - r.top) / (r.height + vh);
      setPct(Math.round(Math.min(Math.max(p, 0), 1) * 100));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [targetRef]);
  return (
    <div className="sticky top-0 z-30 h-0.5 overflow-hidden bg-border/50">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ── lesson reader (deep view) ───────────────────────────────────────── */

function LessonReader({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  const { lang, t, bi } = useLang();
  const completed = useProgress((s) => !!s.completedLessons[lesson.id]);
  const completeLesson = useProgress((s) => s.completeLesson);
  const ensureCards = useProgress((s) => s.ensureCards);
  const go = useNav((s) => s.go);
  const mod = moduleById(lesson.moduleId);
  const all = lessonsByModule(lesson.moduleId);
  const idxInModule = all.findIndex((l) => l.id === lesson.id);
  const prev = idxInModule > 0 ? all[idxInModule - 1] : null;
  const next = idxInModule < all.length - 1 ? all[idxInModule + 1] : null;
  const flatIdx = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const articleRef = useRef<HTMLDivElement | null>(null);

  /* ── behavioral tracking (digital record): one open event per lesson +
     wall-clock reading time accumulated ONLY while the tab is visible.
     Flushed every 30s and on unmount/lesson-switch (min 2s chunks). ── */
  useEffect(() => {
    if (!lesson.id) return;
    useProgress.getState().trackLessonOpen(lesson.id);
    let acc = 0;
    let last: number | null = document.visibilityState === "visible" ? performance.now() : null;
    const flush = () => {
      if (acc > 2000) useProgress.getState().addLessonTime(lesson.id, Math.round(acc));
      acc = 0;
    };
    const onVis = () => {
      if (document.visibilityState === "visible") {
        last = performance.now();
      } else if (last !== null) {
        acc += performance.now() - last;
        last = null;
      }
    };
    const tick = setInterval(() => {
      if (last !== null) {
        acc += performance.now() - last;
        last = performance.now();
      }
      flush();
    }, 30_000);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVis);
      if (last !== null) acc += performance.now() - last;
      flush();
    };
  }, [lesson.id]);

  /* (A) academic citations — rendered after the last section, before takeaways */
  const sourceRefs = useMemo(() => LESSON_SOURCES[lesson.id] ?? [], [lesson.id]);

  /* (B) interactive checkpoints — sorted by sectionIndex, injected after their section */
  const widgets = useMemo<LessonInteractive[]>(
    () => [...(LESSON_INTERACTIVES[lesson.id] ?? [])].sort((a, b) => a.sectionIndex - b.sectionIndex),
    [lesson.id]
  );
  const widgetsForSection = (i: number): LessonInteractive[] => widgets.filter((w) => w.sectionIndex === i);

  const markComplete = () => {
    if (completed) return;
    completeLesson(lesson.id);
    ensureCards([
      ...lesson.keyPoints.map((k, i) => ({ key: `k:${lesson.id}:${i}`, front: k, back: lesson.title })),
      ...lesson.quiz.map((q, i) => ({
        key: `q:${lesson.id}:${i}`,
        front: q.q,
        back: { ar: `${q.options[q.correct].ar}\n— ${q.explain.ar}`, en: `${q.options[q.correct].en}\n— ${q.explain.en}` },
      })),
    ]);
    toast({ title: lang === "ar" ? "أُكمل الدرس! +10 XP" : "Lesson complete! +10 XP" });
  };

  return (
    <div className="space-y-4">
      {/* sonner toasts (interactive checkpoint XP awards) */}
      <Toaster position="top-center" />

      <ReadingProgress targetRef={articleRef} />

      {/* terminal breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 rise-in">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={onBack}>
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t("backToLessons")}
        </Button>
        <span className="code-chip truncate" dir="ltr">~/lessons/{lesson.moduleId}/{lesson.id}</span>
        <span className="dot-leader hidden sm:block" />
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted-foreground" dir="ltr">
          <span className="size-1.5 rounded-full bg-emerald-500 blink-dot" aria-hidden />
          reading
        </span>
      </div>

      {/* lesson header */}
      <div
        className="net-grid-bg relative overflow-hidden rounded-2xl border bg-card p-5 sm:p-7 rise-in"
        style={{ animationDelay: "60ms" }}
      >
        <div className="aurora" aria-hidden />
        <div className="scanline" aria-hidden />
        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-primary" dir="ltr">
              {t("lessonOf")} {String(lesson.order).padStart(2, "0")} · {flatIdx + 1}/{ALL_LESSONS.length}
            </span>
            <span className="chip-sev chip-sev-info inline-flex shrink-0 items-center gap-1.5">
              <ModuleIcon name={mod.icon} className="size-3 shrink-0" />
              <span className="truncate">{bi(mod.title)}</span>
            </span>
            <span className={`chip-sev shrink-0 ${levelSev[lesson.level]}`}>{t(lesson.level)}</span>
            <span className="ms-auto flex shrink-0 items-center gap-1 font-mono text-[10px] text-muted-foreground" dir="ltr">
              <Clock className="size-3" /> {lesson.durationMin} {t("minutes")}
            </span>
          </div>
          <h1 className="text-xl font-black leading-snug sm:text-2xl">{bi(lesson.title)}</h1>
          <p className="border-s-2 border-primary/50 ps-3 text-[13px] leading-7 text-muted-foreground">{bi(lesson.summary)}</p>
        </div>
      </div>

      {/* article — reading progress is measured from this element;
          interactive checkpoints are injected right after their section */}
      <div ref={articleRef} className="space-y-8 rounded-2xl border bg-card p-4 sm:p-7">
        {lesson.sections.map((s, i) => (
          <Fragment key={i}>
            <SectionBlock s={s} i={i} lessonId={lesson.id} />
            {widgetsForSection(i).map((w) => (
              <InteractiveBlock key={w.id} w={w} />
            ))}
          </Fragment>
        ))}
      </div>

      {/* academic sources & references (only when cited) */}
      {sourceRefs.length > 0 && <SourceBoxes refs={sourceRefs} />}

      {lesson.keyPoints.length > 0 && <TakeawaysBlock points={lesson.keyPoints} />}

      {lesson.commands && lesson.commands.length > 0 && <CommandsBlock commands={lesson.commands} />}

      {/* prev / next */}
      <div className="flex items-center justify-between gap-2 rise-in">
        {prev ? (
          <Button variant="outline" size="sm" className="max-w-[46%] gap-1.5 text-xs" onClick={() => go("lessons", { lessonId: prev.id })}>
            <ChevronLeft className="size-3.5 rtl:rotate-180" />
            <span className="truncate">{bi(prev.title)}</span>
          </Button>
        ) : <div />}
        {next ? (
          <Button size="sm" className="max-w-[46%] gap-1.5 text-xs" onClick={() => go("lessons", { lessonId: next.id })}>
            <span className="truncate">{bi(next.title)}</span>
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </Button>
        ) : <div />}
      </div>

      {/* (C) certificate teaser — earned strip or requirements hint */}
      <CertTeaser lessonId={lesson.id} />

      {/* sticky ops footer: complete / quiz / xp / prev-next */}
      <div className="sticky bottom-16 z-30 lg:bottom-4">
        <div className="hud-panel flex flex-wrap items-center gap-2 rounded-xl p-2.5 shadow-lg" style={{ backgroundColor: "var(--card)" }}>
          <Button
            size="sm"
            variant={completed ? "outline" : "default"}
            className={`gap-1.5 ${completed ? "" : "breathe"}`}
            onClick={markComplete}
            disabled={completed}
          >
            <CheckCircle2 className="size-4" />
            {completed ? t("completed") : t("markComplete")}
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => go("quizzes", { lessonId: lesson.id })}>
            <CircleHelp className="size-4" />
            {t("takeQuiz")} ({lesson.quiz.length})
          </Button>
          <span className={`code-chip shrink-0 ${completed ? "opacity-60" : ""}`} dir="ltr">+10 XP</span>
          <div className="ms-auto flex shrink-0 items-center gap-1.5">
            {prev ? (
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                aria-label={bi(prev.title)}
                onClick={() => go("lessons", { lessonId: prev.id })}
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </Button>
            ) : <span className="size-8" aria-hidden />}
            {next ? (
              <Button
                size="icon"
                className="size-8"
                aria-label={bi(next.title)}
                onClick={() => go("lessons", { lessonId: next.id })}
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </Button>
            ) : <span className="size-8" aria-hidden />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── index: curriculum tracks ────────────────────────────────────────── */

export default function LessonsView() {
  const { lang, t, bi } = useLang();
  const params = useNav((s) => s.params);
  const completedLessons = useProgress((s) => s.completedLessons);
  const [q, setQ] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const lessonId = params?.lessonId;
  const activeLesson = lessonId ? lessonById(lessonId) : null;

  const searched = q.trim() ? searchLessons(q, lang) : null;
  const filteredAll = useMemo(() => {
    if (!searched) return null;
    return levelFilter === "all" ? searched : searched.filter((l) => l.level === levelFilter);
  }, [searched, levelFilter]);

  if (activeLesson) {
    return <LessonReader lesson={activeLesson} onBack={() => useNav.getState().go("lessons")} />;
  }

  const moduleProgress = (mid: string) => {
    const ls = lessonsByModule(mid);
    if (ls.length === 0) return 0;
    return Math.round((ls.filter((l) => completedLessons[l.id]).length / ls.length) * 100);
  };

  /** the lesson the user is "on": first uncompleted across the curriculum */
  const globalCurrentId = ALL_LESSONS.find((l) => !completedLessons[l.id])?.id;

  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="flex items-center gap-2.5 rise-in">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <BookOpen className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("lessons")}</h2>
        <span className="code-chip">lessons.index</span>
        <span className="dot-leader" />
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground" dir="ltr">
          {ALL_LESSONS.length} lessons · {MODULES.length} tracks
        </span>
      </div>

      {/* search + level filter chips */}
      <div className="rise-in" style={{ animationDelay: "60ms" }}>
        <div className="relative">
          <Terminal className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("searchLessons")}
            className="h-10 ps-9 pe-9 font-mono text-xs"
          />
          {q && (
            <button className="absolute end-3 top-1/2 -translate-y-1/2" onClick={() => setQ("")} aria-label={lang === "ar" ? "مسح" : "clear"}>
              <X className="size-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {["all", "beginner", "intermediate", "advanced", "expert"].map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(lv)}
              className={`rounded-full border px-3 py-1 text-[10.5px] font-bold transition-colors ${
                levelFilter === lv
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {lv === "all" ? t("allModules") : t(lv)}
            </button>
          ))}
          {filteredAll && (
            <span className="ms-auto hidden shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex" dir="ltr">
              <span className="eq-bars" aria-hidden><i /><i /><i /><i /></span>
              » {filteredAll.length} {lang === "ar" ? "نتيجة" : "results"}
            </span>
          )}
        </div>
      </div>

      {filteredAll ? (
        /* search hits — flat file-tree rows */
        <div className="space-y-1">
          {filteredAll.map((l, i) => (
            <div key={l.id} className="rise-in" style={{ animationDelay: `${Math.min(i * 0.03, 0.24)}s` }}>
              <LessonRow lesson={l} mod={moduleById(l.moduleId)} current={l.id === globalCurrentId} />
            </div>
          ))}
          {filteredAll.length === 0 && (
            <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
              {lang === "ar" ? "لا نتائج مطابقة" : "No matching lessons"}
            </div>
          )}
        </div>
      ) : (
        /* curriculum tracks — module pipeline joined by a data rail */
        <div className="relative">
          <span className="absolute start-[21px] top-[22px] bottom-[22px] w-0.5" aria-hidden>
            <span className="data-rail block h-full" />
          </span>
          <div className="space-y-3">
            {MODULES.map((mod, mi) => {
              const ls = lessonsByModule(mod.id);
              const pct = moduleProgress(mod.id);
              const done = ls.filter((l) => completedLessons[l.id]).length;
              const expanded = expandedModule === mod.id;
              const mastered = ls.length > 0 && pct === 100;
              const firstOpenId = ls.find((l) => !completedLessons[l.id])?.id;
              return (
                <div key={mod.id} className="flex gap-3 rise-in" style={{ animationDelay: `${Math.min(mi * 0.05, 0.3)}s` }}>
                  {/* icon tile plugged into the rail */}
                  <div
                    className="relative z-10 grid size-11 shrink-0 place-items-center rounded-xl border bg-card"
                    style={{
                      borderColor: `${mod.color}66`,
                      color: mod.color,
                      backgroundImage: `linear-gradient(135deg, ${mod.color}40, ${mod.color}12)`,
                    }}
                  >
                    <ModuleIcon name={mod.icon} className="size-5" />
                  </div>

                  {/* track row */}
                  <div className="min-w-0 flex-1 overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-px hover:border-primary/40">
                    <button
                      className="flex w-full flex-wrap items-center gap-2 p-3.5 text-start transition-colors hover:bg-accent/30"
                      onClick={() => setExpandedModule(expanded ? null : mod.id)}
                    >
                      <span className="code-chip shrink-0" dir="ltr">{mod.id.toUpperCase()}</span>
                      <span className="truncate text-[14px] font-black">{bi(mod.title)}</span>
                      <span className={`chip-sev shrink-0 ${levelSev[mod.level]}`}>{t(mod.level)}</span>
                      {mastered && (
                        <span className="chip-sev chip-sev-ok shrink-0">
                          {lang === "ar" ? "✓ متقن" : "✓ MASTERED"}
                        </span>
                      )}
                      <span className="ms-auto flex shrink-0 items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-muted-foreground" dir="ltr">{done}/{ls.length}</span>
                        <ChevronRight className={`size-4 shrink-0 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`} />
                      </span>
                    </button>
                    <div className="px-3.5 pb-3.5">
                      <div className="mb-1.5 line-clamp-1 text-[11px] text-muted-foreground">{bi(mod.desc)}</div>
                      <div className="flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="bar-grow h-full rounded-full"
                            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${mod.color}, ${mod.color}b3)` }}
                          />
                        </div>
                        <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground" dir="ltr">{pct}%</span>
                      </div>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          <div className="max-h-96 space-y-0.5 overflow-y-auto border-t bg-muted/20 p-2">
                            {ls.map((l) => (
                              <LessonRow key={l.id} lesson={l} current={l.id === firstOpenId} />
                            ))}
                            {ls.length === 0 && (
                              <div className="p-3 text-center text-[11px] text-muted-foreground">
                                {lang === "ar" ? "قريباً..." : "Coming soon..."}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
