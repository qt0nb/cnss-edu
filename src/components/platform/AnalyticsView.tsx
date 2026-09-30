"use client";

import { useMemo } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Gauge, GraduationCap, Radar as RadarIcon, Activity, Bug, TrendingUp, Clock,
  Timer, Clock3, ClipboardCheck, CalendarCheck, Percent, BookOpen, Medal, Heart, Fingerprint,
  ListChecks, Download, Focus, ArrowUpRight, ArrowDownRight, Compass, CheckCircle2, CircleHelp,
  ArrowRight, AlertTriangle, RefreshCw, Sparkles,
} from "lucide-react";
import * as Icons from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { useCountUp } from "@/lib/useCountUp";
import { buildAnalytics, buildDigitalRecord } from "@/lib/analytics";
import type { Recommendation } from "@/lib/analytics";
import { moduleById } from "@/data/modules";

/* ═══════════════════ shared helpers (v3 ops-console identity) ═══════════ */

const RING_C = 2 * Math.PI * 54; /* readiness gauge: r = 54 */
const pad2 = (n: number) => String(n).padStart(2, "0");
const fmtHhMm = (min: number) => `${Math.floor(min / 60)}:${pad2(min % 60)}`;
const fmtMmSs = (sec: number) => `${Math.floor(sec / 60)}:${pad2(sec % 60)}`;

/** chip-sev severity for an error-rate percentage */
const sevForRate = (rate: number) =>
  rate > 40 ? "chip-sev-crit" : rate > 20 ? "chip-sev-warn" : rate > 10 ? "chip-sev-info" : "chip-sev-ok";

/** A+/A → ok · B/C → info · D → warn · F → crit */
const letterSev = (letter: string) =>
  letter.startsWith("A") ? "chip-sev-ok"
  : letter === "B" || letter === "C" ? "chip-sev-info"
  : letter === "D" ? "chip-sev-warn"
  : "chip-sev-crit";

/** module icon lookup — same 3-line pattern as LessonsView */
function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[name] ?? BookOpen;
  return <Icon className={className} />;
}

/** v3 section header pattern (icon tile + title + code-chip + dot-leader + meta) */
function SectionHead({ icon: Icon, title, code, meta }: {
  icon: ComponentType<{ className?: string }>;
  title: string; code: string; meta?: string;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>
      <h2 className="text-sm font-black">{title}</h2>
      <span className="code-chip shrink-0">{code}</span>
      <span className="dot-leader" />
      {meta ? <span className="shrink-0 font-mono text-[10px] text-muted-foreground" dir="ltr">{meta}</span> : null}
    </div>
  );
}

/** terminal window chrome bar — dots + code-chip + meta (dir=ltr) */
function TermHeader({ chip, meta }: { chip: string; meta?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-5 py-2" dir="ltr">
      <span className="term-dots" aria-hidden />
      <span className="code-chip">{chip}</span>
      <span className="dot-leader" />
      {meta ? <span className="font-mono text-[10px] text-muted-foreground">{meta}</span> : null}
    </div>
  );
}

/** recharts tooltip skin (vars resolve — inline style is a CSS context) */
const tooltipStyle = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 11,
  fontFamily: "var(--font-jetbrains-mono)",
  color: "var(--foreground)",
  padding: "6px 10px",
} as const;

const KIND: Record<Recommendation["kind"], { sev: string; key: string; icon: ComponentType<{ className?: string }> }> = {
  remedial: { sev: "chip-sev-crit", key: "recRemedial", icon: AlertTriangle },
  review: { sev: "chip-sev-warn", key: "recReview", icon: RefreshCw },
  next: { sev: "chip-sev-info", key: "recNext", icon: ArrowRight },
  enrich: { sev: "chip-sev-ok", key: "recEnrich", icon: Sparkles },
};

/** pattern.key → sensible lucide icon (trend sniffs direction from its own text) */
function patternIcon(key: string, text: string): ComponentType<{ className?: string }> {
  if (key === "focus") return Focus;
  if (key === "trend") {
    if (/improved|تحسّنت/.test(text)) return ArrowUpRight;
    if (/dropped|تراجعت/.test(text)) return ArrowDownRight;
    return Activity;
  }
  if (key === "asks") return CircleHelp;
  if (key === "closer") return CheckCircle2;
  if (key === "explorer") return Compass;
  if (key === "due") return Clock;
  return Fingerprint;
}

/* ═════════════════════════════ the view ═════════════════════════════════ */

export default function AnalyticsView() {
  const { t, bi, lang } = useLang();
  const go = useNav((s) => s.go);
  /* full store snapshot (Store extends ProgressState — engine contract) */
  const store = useProgress();
  const hydrated = useProgress((s) => s.hydrated);

  const report = useMemo(() => (hydrated ? buildAnalytics(store) : null), [store, hydrated]);

  /* count-ups (hooks run unconditionally — values default to 0 pre-report) */
  const readyDisplay = useCountUp(report?.readiness.score ?? 0, 1100);
  const covDisplay = useCountUp(report?.actualLevel.coverage ?? 0, 1000);
  const readMinDisplay = useCountUp(report ? Math.round(report.engagement.totalMs / 60000) : 0, 900);
  const avgSecDisplay = useCountUp(report ? Math.round(report.engagement.avgMsPerOpen / 1000) : 0, 900);
  const runsDisplay = useCountUp(report?.engagement.quizRuns ?? 0, 800);
  const daysDisplay = useCountUp(report?.engagement.activeDays ?? 0, 800);
  const ratioDisplay = useCountUp(report?.engagement.readCompleteRatio ?? 0, 800);
  const openedDisplay = useCountUp(report?.engagement.openedLessons ?? 0, 800);

  const dateStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  /* radar axes — data-driven from the six dimensions */
  const dims = report?.readiness.dimensions;
  const radarData = useMemo(() => {
    if (!dims) return [] as { key: string; label: string; v: number }[];
    return [
      { key: "knowledge", label: t("dimKnowledge"), v: dims.knowledge },
      { key: "application", label: t("dimApplication"), v: dims.application },
      { key: "retention", label: t("dimRetention"), v: dims.retention },
      { key: "consistency", label: t("dimConsistency"), v: dims.consistency },
      { key: "breadth", label: t("dimBreadth"), v: dims.breadth },
      { key: "depth", label: t("dimDepth"), v: dims.depth },
    ];
  }, [dims, t]);

  /* 14-day activity with short weekday labels (locale-aware, local parse) */
  const activityData = useMemo(
    () =>
      (report?.activity ?? []).map((d) => ({
        ...d,
        weekday: new Date(`${d.date}T00:00:00`).toLocaleDateString(lang === "ar" ? "ar" : "en", { weekday: "short" }),
      })),
    [report, lang]
  );

  /* reading minutes per module (skipped entirely when all zero) */
  const timeData = useMemo(
    () =>
      (report?.modules ?? [])
        .map((m) => ({ id: m.moduleId, name: bi(m.title), minutes: Math.round(m.timeMs / 60000), color: m.color }))
        .filter((m) => m.minutes > 0),
    [report, bi]
  );

  /* last 5 AI-assistant queries (newest first) */
  const aiQueries = useMemo(() => store.aiQueries.slice(-5).reverse(), [store.aiQueries]);

  /* export: full digital record → pretty JSON → Blob download */
  const exportRecord = () => {
    const record = buildDigitalRecord(useProgress.getState());
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cnss-edu-record-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success(t("recordExported"));
  };

  const handleRec = (rec: Recommendation) => {
    if (rec.kind === "review" || !rec.lessonId) go("review");
    else go("lessons", { lessonId: rec.lessonId });
  };

  /* ── boot: persisted store not rehydrated yet ── */
  if (!report) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary"><LineChart className="size-4" /></span>
          <h2 className="text-sm font-black">{t("analyticsTitle")}</h2>
          <span className="code-chip">analytics.engine</span>
        </div>
        <div className="hud-panel rounded-xl p-8 text-center">
          <div className="eq-bars mx-auto" aria-hidden><i /><i /><i /><i /></div>
          <p className="mt-3 font-mono text-[10px] text-muted-foreground" dir="ltr">analytics.engine — loading record…</p>
        </div>
      </div>
    );
  }

  const letter = report.classification.letter;

  return (
    <div className="space-y-4">
      {/* ═══ section header ═══ */}
      <header className="rise-in flex flex-wrap items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <LineChart className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("analyticsTitle")}</h2>
        <span className="code-chip">analytics.engine</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">{dateStr}</span>
        <span className="code-chip" dir="ltr">Σ {report.engagement.quizRuns} runs</span>
      </header>
      <p className="rise-in text-[11.5px] leading-5 text-muted-foreground" style={{ animationDelay: "0.03s" }}>
        {t("analyticsDesc")}
      </p>

      {/* ═══ empty record ═══ */}
      {report.empty ? (
        <div className="hud-panel net-grid-bg relative overflow-hidden rounded-2xl p-8 text-center sm:p-12">
          <span className="scanline" aria-hidden />
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <LineChart className="size-6" />
          </div>
          <p className="mx-auto mt-4 max-w-sm text-[13px] leading-6 text-muted-foreground">{t("emptyAnalytics")}</p>
          <Button className="breathe mx-auto mt-5 gap-1.5 font-black" onClick={() => go("lessons")}>
            <BookOpen className="size-4" />
            {t("lessons")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Button>
        </div>
      ) : (
        <>
          {/* ═══ hero row: readiness ring + actual level ═══ */}
          <div className="grid gap-2.5 lg:grid-cols-2">
            {/* a) readiness */}
            <div className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.05s" }}>
              <SectionHead icon={Gauge} title={t("readinessTitle")} code="readiness.score" meta="w 30/20/20/10/10/10" />
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div dir="ltr" className="relative shrink-0">
                  <svg width="136" height="136" viewBox="0 0 120 120" role="img" aria-label={`${t("readinessTitle")} ${report.readiness.score}%`}>
                    <defs>
                      <linearGradient id="anaReadyGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="55%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted-foreground/25" />
                    <g transform="rotate(-90 60 60)">
                      <motion.circle
                        cx="60" cy="60" r="54" fill="none" stroke="url(#anaReadyGrad)" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={RING_C}
                        initial={{ strokeDashoffset: RING_C }}
                        animate={{ strokeDashoffset: RING_C * (1 - report.readiness.score / 100) }}
                        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </g>
                  </svg>
                  <div className="absolute inset-0 grid place-content-center text-center">
                    <div className="text-glow font-mono text-[26px] font-black leading-none tabular-nums">
                      {readyDisplay}<span className="text-sm">%</span>
                    </div>
                    <span className={`chip-sev ${letterSev(letter)} mx-auto mt-1.5`} dir="ltr">{letter}</span>
                  </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-2.5">
                  <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("classificationTitle")}</div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-black">{bi(report.classification.label)}</span>
                      <span className="code-chip" dir="ltr">GPA {report.classification.gpa}</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("bloomTitle")}</div>
                    <div className="mt-0.5 text-[11.5px] font-bold leading-relaxed">{bi(report.classification.bloom)}</div>
                  </div>
                </div>
              </div>
              <p className="mt-3 border-t border-border/60 pt-2.5 text-[10px] leading-4 text-muted-foreground/70">
                {t("recordNote")}
              </p>
            </div>

            {/* b) actual level */}
            <div className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.08s" }}>
              <SectionHead icon={GraduationCap} title={t("actualLevelTitle")} code="level.actual" meta="difficulty-weighted" />
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-glow font-mono text-3xl font-black tabular-nums" dir="ltr">
                  {covDisplay}<span className="text-sm">%</span>
                </span>
                <span className="min-w-0 flex-1 text-[12px] font-bold leading-relaxed">{bi(report.actualLevel.label)}</span>
              </div>
              <div className="mt-3 space-y-2">
                {report.actualLevel.tierCoverages.map((tc) => {
                  const p = tc.total > 0 ? Math.round((tc.covered / tc.total) * 100) : 0;
                  return (
                    <div key={tc.level} className="flex items-center gap-2">
                      <span className="w-[76px] shrink-0 truncate text-[10.5px] font-bold text-muted-foreground">{t(tc.level)}</span>
                      <Progress value={p} className="h-1.5 flex-1" />
                      <span className="w-9 shrink-0 text-end font-mono text-[10px] font-bold tabular-nums text-muted-foreground" dir="ltr">
                        {tc.covered}/{tc.total}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 border-t border-border/60 pt-2.5 font-mono text-[9.5px] text-muted-foreground/70" dir="ltr">
                ❯ coverage = Σ(level-weight × done) / Σ(level-weight × total)
              </p>
            </div>
          </div>

          {/* ═══ six-dimension radar ═══ */}
          <section className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.12s" }}>
            <SectionHead icon={RadarIcon} title={t("dimensionsTitle")} code="dims.radar" meta="0–100" />
            <div dir="ltr" className="h-72 text-muted-foreground">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="currentColor" strokeOpacity={0.35} />
                  <PolarAngleAxis dataKey="label" tick={{ fontSize: 10, fill: "currentColor" }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "currentColor" }} tickCount={5} axisLine={false} tickLine={false} />
                  <Radar dataKey="v" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {radarData.map((d) => (
                <div key={d.key} className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-2">
                  <div className="truncate text-[9.5px] font-bold text-muted-foreground">{d.label}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-[15px] font-black tabular-nums" dir="ltr">{d.v}</span>
                    <span className="font-mono text-[9px] text-muted-foreground">/100</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${d.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ engagement strip ═══ */}
          <section className="space-y-2.5">
            <SectionHead
              icon={Activity}
              title={t("engagementTitle")}
              code="engage.metrics"
              meta={`${t("sessionsDepth")} ${report.engagement.avgQuizPerActiveDay}/day`}
            />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: Timer, cls: "text-emerald-500 bg-emerald-500/10", label: t("readingTime"), value: fmtHhMm(readMinDisplay), code: "t.total" },
                { icon: Clock3, cls: "text-teal-500 bg-teal-500/10", label: t("avgReadTime"), value: fmtMmSs(avgSecDisplay), code: "t.avg" },
                { icon: ClipboardCheck, cls: "text-amber-500 bg-amber-500/10", label: t("quizAttemptsTotal"), value: runsDisplay, code: "q.runs" },
                { icon: CalendarCheck, cls: "text-emerald-500 bg-emerald-500/10", label: t("activeDays"), value: daysDisplay, code: "d.active" },
                { icon: Percent, cls: "text-teal-500 bg-teal-500/10", label: t("readCompleteRatio"), value: `${ratioDisplay}%`, code: "r.done" },
                { icon: BookOpen, cls: "text-amber-500 bg-amber-500/10", label: t("lessonsOpened"), value: openedDisplay, code: "l.open" },
              ].map((tile) => (
                <div key={tile.code} className="hud-panel rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`grid size-6 shrink-0 place-items-center rounded-md ${tile.cls}`}>
                      <tile.icon className="size-3.5" />
                    </span>
                    <span className="code-chip shrink-0" dir="ltr">{tile.code}</span>
                  </div>
                  <div className="mt-1.5 font-mono text-[15px] font-black tabular-nums" dir="ltr">{tile.value}</div>
                  <div className="truncate text-[9.5px] font-bold text-muted-foreground">{tile.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ error analysis — err.log terminal ═══ */}
          <section className="space-y-2.5">
            <SectionHead icon={Bug} title={t("errorsTitle")} code="err.taxonomy" meta={`Σ${report.errorAnalysis.totalWrong}`} />
            <div className="term-window rise-in overflow-hidden" style={{ animationDelay: "0.04s" }}>
              <TermHeader chip="err.log" meta={`Σ ${report.errorAnalysis.totalWrong} wrong · ${report.errorAnalysis.overallErrorRate}% rate`} />
              <div className="bg-card/90 p-3.5">
                <h3 className="mb-2 text-[11.5px] font-black">{t("errorsByModule")}</h3>
                {report.errorAnalysis.byModule.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] leading-5 text-muted-foreground">
                    {t("noErrorsYet")}
                  </p>
                ) : (
                  <table className="w-full border-collapse text-[11px]">
                    <thead>
                      <tr className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">
                        <th className="px-1 pb-1.5 text-start">{lang === "ar" ? "المجال" : "domain"}</th>
                        <th className="px-1 pb-1.5 text-end">{t("answeredCol")}</th>
                        <th className="px-1 pb-1.5 text-end">{t("wrongCol")}</th>
                        <th className="px-1 pb-1.5 text-end">{t("errorRate")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.errorAnalysis.byModule.map((m) => (
                        <tr key={m.moduleId} className="border-t border-border/50">
                          <td className="px-1 py-2">
                            <span className="flex items-center gap-2">
                              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
                              <span className="truncate font-bold">{bi(m.title)}</span>
                            </span>
                          </td>
                          <td className="px-1 py-2 text-end font-mono tabular-nums text-muted-foreground" dir="ltr">{m.quizAnswered}</td>
                          <td className="px-1 py-2 text-end font-mono tabular-nums" dir="ltr">{m.wrongCount}</td>
                          <td className="px-1 py-2 text-end">
                            <span className={`chip-sev ${sevForRate(m.errorRate)}`} dir="ltr">{m.errorRate}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {report.errorAnalysis.recurring.length > 0 && (
                  <div className="mt-3">
                    <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("recurringErrors")}</h4>
                    <ul className="space-y-1.5">
                      {report.errorAnalysis.recurring.map((r) => (
                        <li key={r.lessonId}>
                          <button
                            className="flex min-h-11 w-full items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-2.5 py-2 text-start transition-colors hover:border-primary/40 hover:bg-accent/30"
                            onClick={() => go("lessons", { lessonId: r.lessonId })}
                          >
                            <span className="min-w-0 flex-1 truncate font-mono text-[11px]">{bi(r.lessonTitle) || r.lessonId}</span>
                            <span className="chip-sev chip-sev-crit shrink-0" dir="ltr">×{r.wrong}</span>
                            <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground" dir="ltr">{r.lastWrongAt.slice(0, 10)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ═══ trends: mastery curve + daily activity ═══ */}
          <section className="space-y-2.5">
            <SectionHead icon={TrendingUp} title={t("trendsTitle")} code="trend.runs" meta={`n=${report.trends.length}`} />
            <div className="grid gap-2.5 lg:grid-cols-2">
              <div className="hud-panel rise-in rounded-xl p-3.5" style={{ animationDelay: "0.04s" }}>
                <h3 className="mb-2 text-[11.5px] font-black">{t("masteryCurve")}</h3>
                {report.trends.length < 2 ? (
                  <p className="grid h-56 place-content-center rounded-lg border border-dashed border-border text-center text-[11px] text-muted-foreground">
                    {lang === "ar" ? "لا محاولات اختبار بعد — أجب على اختبار ليبدأ المنحنى" : "No quiz runs yet — answer a quiz to start the curve"}
                  </p>
                ) : (
                  <div dir="ltr" className="h-56 text-muted-foreground">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={report.trends} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                        <defs>
                          <linearGradient id="anaAccGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.25} vertical={false} />
                        <XAxis
                          dataKey="x"
                          tick={{ fontSize: 10, fill: "currentColor" }}
                          tickLine={false}
                          axisLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          width={30}
                          tick={{ fontSize: 10, fill: "currentColor" }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#10b981", strokeOpacity: 0.35 }} />
                        <ReferenceLine
                          y={80}
                          stroke="#f59e0b"
                          strokeDasharray="5 4"
                          label={{ value: "pass 80", fill: "#f59e0b", fontSize: 10, position: "insideTopLeft" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#10b981"
                          strokeWidth={2}
                          fill="url(#anaAccGrad)"
                          dot={{ r: 2, fill: "#10b981", strokeWidth: 0 }}
                          activeDot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="hud-panel rise-in rounded-xl p-3.5" style={{ animationDelay: "0.08s" }}>
                <h3 className="mb-2 text-[11.5px] font-black">{t("weeklyActivityTitle")}</h3>
                <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px] font-bold text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-emerald-500" />{lang === "ar" ? "قراءة" : "reads"}</span>
                  <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-teal-500" />{lang === "ar" ? "إتمام" : "completions"}</span>
                  <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-amber-500" />{lang === "ar" ? "اختبار" : "quizzes"}</span>
                </div>
                <div dir="ltr" className="h-52 text-muted-foreground">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.25} vertical={false} />
                      <XAxis
                        dataKey="weekday"
                        interval="preserveStartEnd"
                        tick={{ fontSize: 10, fill: "currentColor" }}
                        tickLine={false}
                        axisLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
                      />
                      <YAxis
                        width={26}
                        allowDecimals={false}
                        tick={{ fontSize: 10, fill: "currentColor" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(16,185,129,0.07)" }} />
                      <Bar dataKey="reads" stackId="a" fill="#10b981" barSize={12} />
                      <Bar dataKey="completions" stackId="a" fill="#14b8a6" barSize={12} />
                      <Bar dataKey="quizRuns" stackId="a" fill="#f59e0b" barSize={12} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ time by module (vertical bars, module colors) ═══ */}
          {timeData.length > 0 && (
            <section className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.16s" }}>
              <SectionHead
                icon={Clock}
                title={t("timeByModuleTitle")}
                code="time.modules"
                meta={`Σ ${timeData.reduce((s, m) => s + m.minutes, 0)} min`}
              />
              <div dir="ltr" className="text-muted-foreground">
                <ResponsiveContainer width="100%" height={Math.max(150, timeData.length * 36)}>
                  <BarChart data={timeData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.25} />
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{ fontSize: 10, fill: "currentColor" }}
                      tickLine={false}
                      axisLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={112}
                      tick={{ fontSize: 10, fill: "currentColor" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(16,185,129,0.07)" }} />
                    <Bar dataKey="minutes" barSize={13}>
                      {timeData.map((m) => (
                        <Cell key={m.id} fill={m.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* ═══ strengths & interests ═══ */}
          <div className="grid gap-2.5 lg:grid-cols-2">
            <section className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.05s" }}>
              <SectionHead icon={Medal} title={t("strengthsTitle")} code="perf.strengths" />
              <p className="mb-2.5 text-[10.5px] leading-4 text-muted-foreground">{t("strengthsHint")}</p>
              {report.strengths.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] leading-5 text-muted-foreground">
                  {lang === "ar" ? "لا نقاط قوة مثبتة بعد — أجب على ٤+ أسئلة بدقة ٧٥٪+" : "No proven strengths yet — answer 4+ questions at 75%+ accuracy"}
                </p>
              ) : (
                <ul className="space-y-2">
                  {report.strengths.map((s) => {
                    const mod = moduleById(s.moduleId);
                    return (
                      <li key={s.moduleId} className="flex items-center gap-2.5">
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-lg border"
                          style={{
                            borderColor: `${mod.color}55`,
                            color: mod.color,
                            backgroundImage: `linear-gradient(135deg, ${mod.color}30, ${mod.color}0d)`,
                          }}
                        >
                          <ModuleIcon name={mod.icon} className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[12px] font-bold">{bi(s.title)}</span>
                        <span className="chip-sev chip-sev-ok shrink-0" dir="ltr">{s.accuracy}%</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="hud-panel rise-in rounded-xl p-3.5 sm:p-4" style={{ animationDelay: "0.08s" }}>
              <SectionHead icon={Heart} title={t("interestTitle")} code="perf.interests" meta={t("topDomains")} />
              {report.interests.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] leading-5 text-muted-foreground">
                  {lang === "ar" ? "لا بيانات كافية لتحديد اهتماماتك بعد" : "Not enough data to map your interests yet"}
                </p>
              ) : (
                <ul className="space-y-2">
                  {report.interests.map((it, i) => {
                    const mod = moduleById(it.moduleId);
                    return (
                      <li key={it.moduleId} className="flex items-center gap-2.5">
                        <span className="code-chip shrink-0" dir="ltr">#{i + 1}</span>
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-lg border"
                          style={{
                            borderColor: `${mod.color}55`,
                            color: mod.color,
                            backgroundImage: `linear-gradient(135deg, ${mod.color}30, ${mod.color}0d)`,
                          }}
                        >
                          <ModuleIcon name={mod.icon} className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-bold">{bi(it.title)}</span>
                          <span className="font-mono text-[9.5px] text-muted-foreground" dir="ltr">{Math.round(it.timeMs / 60000)} min</span>
                        </span>
                        <span className="chip-sev chip-sev-info shrink-0" dir="ltr">score {it.score}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                <div className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("asksAbout")}</div>
                {aiQueries.length === 0 ? (
                  <p className="text-[10.5px] leading-5 text-muted-foreground/70">{t("aiQueriesNone")}</p>
                ) : (
                  <ul className="space-y-1">
                    {aiQueries.map((q, i) => (
                      <li key={i} dir="auto" className="truncate font-mono text-[10.5px] leading-5 text-foreground/80" title={q.q}>
                        ❯ {q.q}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          {/* ═══ behavioral patterns — patterns.log ═══ */}
          <section className="space-y-2.5">
            <SectionHead icon={Fingerprint} title={t("patternsTitle")} code="patterns.auto" meta={`${report.patterns.length} insights`} />
            <div className="term-window rise-in overflow-hidden" style={{ animationDelay: "0.04s" }}>
              <TermHeader chip="patterns.log" meta={`${report.patterns.length} entries`} />
              <div className="bg-card/90 p-3.5">
                {report.patterns.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] leading-5 text-muted-foreground">
                    {t("emptyAnalytics")}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {report.patterns.map((p, i) => {
                      const text = bi(p.text);
                      const Icon = patternIcon(p.key, text);
                      return (
                        <li key={`${p.key}-${i}`} className="flex items-start gap-2.5 rounded-lg border border-border/50 bg-background/40 p-2.5">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                            <Icon className="size-3.5" />
                          </span>
                          <p className="min-w-0 flex-1 text-[11.5px] leading-relaxed">{text}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* ═══ recommendations (priority-ordered, deep-linked) ═══ */}
          <section className="space-y-2.5">
            <SectionHead icon={ListChecks} title={t("recommendationsTitle")} code="rec.queue" meta={`${report.recommendations.length} tasks`} />
            {report.recommendations.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-4 text-center text-[11px] leading-5 text-muted-foreground">
                {t("emptyAnalytics")}
              </p>
            ) : (
              <div className="grid gap-2.5 md:grid-cols-2">
                {report.recommendations.map((rec, i) => {
                  const kind = KIND[rec.kind];
                  return (
                    <div key={rec.id} className="hud-panel rise-in rounded-xl p-3.5" style={{ animationDelay: `${Math.min(i * 0.06, 0.3)}s` }}>
                      <div className="flex items-center gap-2">
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                          <kind.icon className="size-3.5" />
                        </span>
                        <span className={`chip-sev shrink-0 ${kind.sev}`}>{t(kind.key)}</span>
                        <span className="flex shrink-0 items-center gap-1">
                          <span className="text-[9px] text-muted-foreground">{t("recPriority")}</span>
                          <span className="code-chip" dir="ltr">P{rec.priority}</span>
                        </span>
                        <span className="dot-leader" />
                      </div>
                      <h4 className="mt-2 text-[12.5px] font-black leading-snug">{bi(rec.title)}</h4>
                      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{bi(rec.reason)}</p>
                      <Button size="sm" className="mt-2.5 w-full gap-1.5 font-bold" onClick={() => handleRec(rec)}>
                        {bi(rec.actionLabel)}
                        <ArrowRight className="size-3.5 rtl:rotate-180" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ═══ export footer ═══ */}
          <div className="hud-panel rise-in flex flex-wrap items-center gap-3 rounded-xl p-3.5" style={{ animationDelay: "0.1s" }}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <Download className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-black">{t("exportRecord")}</div>
              <div className="truncate font-mono text-[9.5px] text-muted-foreground" dir="ltr">
                cnss-edu-record-{dateStr}.json
              </div>
            </div>
            <Button className="breathe gap-1.5 font-bold" onClick={exportRecord}>
              <Download className="size-4" />
              {t("exportRecord")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
