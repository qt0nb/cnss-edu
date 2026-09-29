"use client";

import React, { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, ArrowLeft, Clock, Lightbulb,
  CheckCircle2, Terminal, CircleHelp, ListChecks, X, ArrowDown, ArrowRight, Network,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { searchLessons } from "@/lib/data";
import { MODULES, moduleById } from "@/data/modules";
import { lessonsByModule, lessonById, ALL_LESSONS } from "@/data/lessons";
import type { Bi, Lesson, LessonSection, LessonTable, LessonDiagram } from "@/lib/types";
import * as Icons from "lucide-react";

const levelColor: Record<string, string> = {
  beginner: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  intermediate: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  advanced: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  expert: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
};

function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? BookOpen;
  return <Icon className={className} />;
}

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

function CodeBlock({ code }: { code: { lang: string; snippet: string } }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden" dir="ltr">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-800 bg-zinc-900/60">
        <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">{code.lang}</span>
        <button
          className="text-[10px] text-zinc-400 hover:text-emerald-300 font-bold"
          onClick={() => { navigator.clipboard?.writeText(code.snippet); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        >
          {copied ? t("copied") : "COPY"}
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-[12px] leading-relaxed font-mono text-emerald-200">{code.snippet}</pre>
    </div>
  );
}

// ─── Lesson table + diagram renderers ───────────────────────────────────

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
                <th key={j} className="px-3 py-2 text-start font-bold whitespace-nowrap text-foreground/85">{bi(h)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/30" : undefined}>
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

function SectionBlock({ s, i }: { s: LessonSection; i: number }) {
  const { t, bi } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(i * 0.06, 0.3) }}
      className="space-y-2.5"
    >
      <h3 className="text-[15px] font-black flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-lg bg-primary/15 text-primary text-[11px] font-black">{i + 1}</span>
        {bi(s.heading)}
      </h3>
      <div className="ps-8"><Body text={bi(s.body)} /></div>
      {s.code && <div className="ps-8"><CodeBlock code={s.code} /></div>}
      {s.table && <div className="ps-4 sm:ps-8 pt-1"><LessonTableBlock table={s.table} /></div>}
      {s.diagram && <div className="ps-4 sm:ps-8 pt-1"><LessonDiagramBlock d={s.diagram} /></div>}
      {s.tip && (
        <div className="ps-8">
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2.5 flex gap-2.5 items-start">
            <Lightbulb className="size-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-black text-amber-600 dark:text-amber-400">{t("tip")}</div>
              <div className="text-[12.5px] leading-6 text-foreground/85">{bi(s.tip)}</div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

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
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={onBack}>
          <ArrowLeft className="size-3.5 rtl:rotate-180" />
          {t("backToLessons")}
        </Button>
        <Badge variant="outline" className="text-[10px] gap-1.5 font-bold">
          <ModuleIcon name={mod.icon} className="size-3" />
          {bi(mod.title)}
        </Badge>
        <Badge className={`text-[10px] font-bold ${levelColor[lesson.level]}`}>{t(lesson.level)}</Badge>
        <span className="text-[11px] text-muted-foreground flex items-center gap-1 ms-auto">
          <Clock className="size-3.5" /> {lesson.durationMin} {t("minutes")}
        </span>
      </div>

      <div className="rounded-2xl border bg-card p-5 sm:p-7 space-y-3">
        <div className="text-[11px] font-black text-primary">
          {t("lessonOf")} {String(lesson.order).padStart(2, "0")} · {flatIdx + 1}/{ALL_LESSONS.length}
        </div>
        <h1 className="text-xl sm:text-2xl font-black leading-snug">{bi(lesson.title)}</h1>
        <p className="text-[13px] text-muted-foreground leading-7 border-s-2 border-primary/50 ps-3">{bi(lesson.summary)}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            size="sm"
            variant={completed ? "outline" : "default"}
            className={`gap-1.5 ${completed ? "" : "glow-primary"}`}
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
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-7">
          {lesson.sections.map((s, i) => (
            <SectionBlock key={i} s={s} i={i} />
          ))}
        </CardContent>
      </Card>

      {lesson.keyPoints.length > 0 && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <ListChecks className="size-4 text-primary" />
              {t("keyPoints")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.keyPoints.map((k, i) => (
                <li key={i} className="flex gap-2.5 items-start rounded-lg bg-muted/40 p-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground text-[10px] font-black">{i + 1}</span>
                  <span className="text-[13px] leading-6 font-semibold">{bi(k)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {lesson.commands && lesson.commands.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Terminal className="size-4 text-primary" />
              {t("practicalCommands")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {lesson.commands.map((c, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                <code dir="ltr" className="rounded-md bg-zinc-950 text-emerald-300 border border-zinc-800 px-2.5 py-1.5 text-[11.5px] font-mono font-bold shrink-0">{c.cmd}</code>
                <span className="text-[12px] text-muted-foreground">{bi(c.desc)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-2">
        {prev ? (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs max-w-[46%]" onClick={() => go("lessons", { lessonId: prev.id })}>
            <ChevronLeft className="size-3.5 rtl:rotate-180" />
            <span className="truncate">{bi(prev.title)}</span>
          </Button>
        ) : <div />}
        {next ? (
          <Button size="sm" className="gap-1.5 text-xs max-w-[46%]" onClick={() => go("lessons", { lessonId: next.id })}>
            <span className="truncate">{bi(next.title)}</span>
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </Button>
        ) : <div />}
      </div>
    </div>
  );
}

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <BookOpen className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("lessons")}</h2>
          <p className="text-[11px] text-muted-foreground">
            {ALL_LESSONS.length} {t("lessonsCount")} · {MODULES.length} {t("modulesCount")}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchLessons")} className="ps-9 text-xs h-10" />
          {q && (
            <button className="absolute end-3 top-1/2 -translate-y-1/2" onClick={() => setQ("")}>
              <X className="size-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex rounded-lg border overflow-hidden h-10">
          {["all", "beginner", "intermediate", "advanced", "expert"].map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(lv)}
              className={`px-2.5 text-[10.5px] font-bold ${levelFilter === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              {lv === "all" ? t("allModules") : t(lv)}
            </button>
          ))}
        </div>
      </div>

      {filteredAll ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {filteredAll.map((l) => {
            const mod = moduleById(l.moduleId);
            return (
              <button
                key={l.id}
                onClick={() => useNav.getState().go("lessons", { lessonId: l.id })}
                className="text-start rounded-xl border bg-card p-3.5 hover:border-primary transition-colors group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <ModuleIcon name={mod.icon} className="size-3.5" />
                  <span className="text-[10px] font-bold text-muted-foreground">{bi(mod.title)}</span>
                  <Badge className={`ms-auto text-[9px] ${levelColor[l.level]}`}>{t(l.level)}</Badge>
                </div>
                <div className="text-[13px] font-black group-hover:text-primary transition-colors">{bi(l.title)}</div>
                <div className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{bi(l.summary)}</div>
              </button>
            );
          })}
          {filteredAll.length === 0 && (
            <div className="text-xs text-muted-foreground p-4 text-center col-span-2">{lang === "ar" ? "لا نتائج مطابقة" : "No matching lessons"}</div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {MODULES.map((mod) => {
            const ls = lessonsByModule(mod.id);
            const pct = moduleProgress(mod.id);
            const done = ls.filter((l) => completedLessons[l.id]).length;
            const expanded = expandedModule === mod.id;
            return (
              <motion.div key={mod.id} layout className="rounded-xl border bg-card overflow-hidden">
                <button
                  className="w-full text-start p-4 flex items-center gap-3 hover:bg-accent/40 transition-colors"
                  onClick={() => setExpandedModule(expanded ? null : mod.id)}
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: `${mod.color}22`, color: mod.color }}>
                    <ModuleIcon name={mod.icon} className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-black truncate">{bi(mod.title)}</span>
                      <Badge variant="outline" className={`text-[9px] shrink-0 ${levelColor[mod.level]}`}>{t(mod.level)}</Badge>
                    </div>
                    <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{bi(mod.desc)}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="text-[10px] font-bold text-muted-foreground shrink-0">{done}/{ls.length} · {pct}%</span>
                    </div>
                  </div>
                  <ChevronRight className={`size-4 text-muted-foreground shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="border-t p-2 space-y-0.5 max-h-96 overflow-y-auto">
                        {ls.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => useNav.getState().go("lessons", { lessonId: l.id })}
                            className="w-full text-start flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-accent/50 transition-colors"
                          >
                            {completedLessons[l.id] ? (
                              <CheckCircle2 className="size-4 text-primary shrink-0" />
                            ) : (
                              <span className="grid size-5 shrink-0 place-items-center rounded-full border text-[9px] font-black text-muted-foreground">{l.order}</span>
                            )}
                            <span className="text-[12.5px] font-bold truncate">{bi(l.title)}</span>
                            <span className="ms-auto text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                              <Clock className="size-3" />{l.durationMin}m
                            </span>
                          </button>
                        ))}
                        {ls.length === 0 && (
                          <div className="text-[11px] text-muted-foreground p-3 text-center">{lang === "ar" ? "قريباً..." : "Coming soon..."}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
