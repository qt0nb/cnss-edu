"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen, Zap, Flame, Target, RefreshCw, CircleHelp, FlaskConical, Rocket, ArrowRight, TrendingUp,
  Wrench, GraduationCap, Layers, Trophy, Terminal, Activity, Gauge, BarChart3, Radio, Play, Timer,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress, learnerLevel, levelTitle, dueCards } from "@/lib/store";
import { useCountUp } from "@/lib/useCountUp";
import { ALL_LESSONS, TOTAL_LESSONS, lessonById } from "@/data/lessons";
import { MODULES } from "@/data/modules";
import { ALL_TOOLS, TOTAL_TOOLS } from "@/data/tools";
import { ALL_PROJECTS, TOTAL_PROJECTS } from "@/data/projects";
import type { LessonLevel } from "@/lib/types";
import * as Icons from "lucide-react";

const pad2 = (n: number) => String(n).padStart(2, "0");
const localDayKey = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const RING_C = 2 * Math.PI * 54; /* readiness gauge: r = 54 */

/** track status per module completion % (bilingual inline: ar · EN ops code) */
const moduleStatus = (pct: number) =>
  pct === 0 ? { sev: "chip-sev-crit", code: "IDLE", ar: "خامل" }
  : pct < 50 ? { sev: "chip-sev-warn", code: "ACTIVE", ar: "نشِط" }
  : pct < 100 ? { sev: "chip-sev-info", code: "SYNCING", ar: "مزامنة" }
  : { sev: "chip-sev-ok", code: "MASTERED", ar: "متقَن" };

/** macOS-style traffic dots — painted by the .term-dots ::before shadow trick. */
function TermDots() {
  return (
    <span dir="ltr" aria-hidden className="inline-flex w-[46px] shrink-0 ps-4">
      <span className="term-dots" />
    </span>
  );
}

/** v3 section header pattern (replaces plain CardTitle). */
function SectionHead({ icon: Icon, title, code, meta }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; code: string; meta?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>
      <h2 className="text-sm font-black">{title}</h2>
      <span className="code-chip shrink-0">{code}</span>
      <span className="dot-leader" />
      {meta ? <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{meta}</span> : null}
    </div>
  );
}

export default function DashboardView() {
  const { lang, t, bi } = useLang();
  const go = useNav((s) => s.go);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const completedLessons = useProgress((s) => s.completedLessons);
  const quizTotals = useProgress((s) => s.quizTotals);
  const cards = useProgress((s) => s.reviewCards);

  /* ── operator level (unchanged math) ── */
  const lvl = learnerLevel(xp);
  const title = levelTitle(lvl);
  const nextLvlXp = Math.pow(lvl, 2) * 70;
  const prevLvlXp = Math.pow(lvl - 1, 2) * 70;
  const lvlPct = Math.min(100, Math.round(((xp - prevLvlXp) / Math.max(1, nextLvlXp - prevLvlXp)) * 100));

  const doneCount = Object.keys(completedLessons).length;
  const accuracy = quizTotals.answered > 0 ? Math.round((quizTotals.correct / quizTotals.answered) * 100) : 0;
  const dueCount = dueCards(cards).length;
  const totalCards = Object.keys(cards).length;
  const masteredCards = Object.values(cards).filter((c) => c.box >= 4).length;

  /* ── exam readiness: 0.4·lessons + 0.35·accuracy + 0.25·review ── */
  const lessonsPct = doneCount / Math.max(1, TOTAL_LESSONS);
  const quizAcc = quizTotals.answered > 0 ? quizTotals.correct / quizTotals.answered : 0;
  const reviewUpkeep = totalCards > 0 ? masteredCards / totalCards : doneCount > 0 ? 0.3 : 0;
  const readiness = Math.round((0.4 * lessonsPct + 0.35 * quizAcc + 0.25 * reviewUpkeep) * 100);
  const grade = readiness >= 95 ? "A+" : readiness >= 85 ? "A" : readiness >= 70 ? "B" : readiness >= 50 ? "C" : "D";
  const gradeSev = readiness >= 85 ? "chip-sev-ok" : readiness >= 70 ? "chip-sev-info" : readiness >= 50 ? "chip-sev-warn" : "chip-sev-crit";

  const nextLesson = useMemo(() => ALL_LESSONS.find((l) => !completedLessons[l.id]) ?? null, [completedLessons]);
  const totalQuestions = ALL_LESSONS.reduce((s, l) => s + l.quiz.length, 0);

  /* ── live session uptime (honest: seconds since this mount) ── */
  /* ── wall clock: hydration-safe (placeholder until mount, ticks every second) ── */
  const [uptimeSec, setUptimeSec] = useState(0);
  const [nowHms, setNowHms] = useState("--:--:--");
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      setUptimeSec(Math.floor((Date.now() - start) / 1000));
      const d = new Date();
      setNowHms(`${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const uptimeLabel = `${pad2(Math.floor(uptimeSec / 60))}:${pad2(uptimeSec % 60)}`;

  /* ── weekly activity: strictly real completions, D-6 … Today ── */
  const week = useMemo(() => {
    const now = new Date();
    const days = Array.from({ length: 7 }, (_, k) => {
      const back = 6 - k;
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back);
      return { key: localDayKey(d), label: back === 0 ? (lang === "ar" ? "اليوم" : "Today") : `D-${back}`, count: 0, isToday: back === 0 };
    });
    for (const v of Object.values(completedLessons)) {
      const day = days.find((x) => x.key === localDayKey(new Date(v.completedAt)));
      if (day) day.count++;
    }
    return days;
  }, [completedLessons, lang]);
  const weekTotal = week.reduce((s, d) => s + d.count, 0);

  /* ── live feed: real store events, newest first, capped at 6 ── */
  const feed = useMemo(() => {
    const nowTs = nowHms;
    const lines: { ts: string; text: string; tone: string; lessonId?: string }[] = [];
    for (const [id, v] of Object.entries(completedLessons).sort((a, b) => (a[1].completedAt < b[1].completedAt ? 1 : -1)).slice(0, 4)) {
      const d = new Date(v.completedAt);
      lines.push({
        ts: `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`,
        text: `✓ ${lang === "ar" ? "درس" : "lesson"} ${id} · ${localDayKey(d)}`,
        tone: "text-emerald-400", lessonId: id,
      });
    }
    lines.push({
      ts: nowTs,
      text: lang === "ar" ? `◇ مراجعة: ${dueCount} بطاقة مستحقة` : `◇ review: ${dueCount} card${dueCount === 1 ? "" : "s"} due`,
      tone: dueCount > 0 ? "text-amber-400" : "text-zinc-500",
    });
    lines.push({
      ts: nowTs,
      text: lang === "ar" ? `~ سلسلة أيام: ${streak}` : `~ streak: ${streak}d`,
      tone: streak > 0 ? "text-teal-400" : "text-zinc-500",
    });
    return lines.slice(0, 6);
  }, [completedLessons, dueCount, streak, lang, nowHms]);
  const feedEmpty = doneCount === 0 && totalCards === 0 && streak === 0;
  const nowClock = nowHms;

  /* ── animated counters ── */
  const xpDisplay = useCountUp(xp);
  const toolsDisplay = useCountUp(TOTAL_TOOLS, 1100);
  const lessonsDisplay = useCountUp(TOTAL_LESSONS, 900);
  const streakDisplay = useCountUp(streak, 500);
  const doneDisplay = useCountUp(doneCount, 700);
  const accDisplay = useCountUp(accuracy, 700);
  const readyDisplay = useCountUp(readiness, 1100);

  /* ── grafana-style telemetry tiles (honest deltas: real 7d counts / sample size / live) ── */
  const stats = [
    { icon: BookOpen, label: t("lessonsCompleted"), value: `${doneDisplay}/${TOTAL_LESSONS}`, color: "text-emerald-500 bg-emerald-500/10",
      delta: weekTotal > 0 ? { text: `+${weekTotal}·7d`, cls: "text-emerald-500" } : { text: "—", cls: "text-muted-foreground/50" } },
    { icon: Flame, label: t("streakDays"), value: streakDisplay, color: "text-orange-500 bg-orange-500/10",
      delta: streak > 0 ? { text: lang === "ar" ? "↑ نشِط" : "↑ live", cls: "text-emerald-500" } : { text: "—", cls: "text-muted-foreground/50" } },
    { icon: Target, label: t("quizAccuracy"), value: `${accDisplay}%`, color: "text-amber-500 bg-amber-500/10",
      delta: quizTotals.answered > 0 ? { text: `n=${quizTotals.answered}`, cls: "text-muted-foreground" } : { text: "—", cls: "text-muted-foreground/50" } },
    { icon: RefreshCw, label: t("dueCards"), value: dueCount, color: "text-primary bg-primary/10",
      delta: totalCards > 0 ? { text: `${dueCount}/${totalCards}`, cls: dueCount > 0 ? "text-amber-500" : "text-muted-foreground" } : { text: "—", cls: "text-muted-foreground/50" } },
  ];

  const platformStats = [
    { icon: BookOpen, value: lessonsDisplay, label: t("lessonsCount"), code: "content.lessons" },
    { icon: Wrench, value: toolsDisplay, label: t("toolsCount"), code: "content.tools" },
    { icon: Rocket, value: TOTAL_PROJECTS, label: t("projectsCount"), code: "content.projects" },
    { icon: CircleHelp, value: totalQuestions, label: t("quizQuestions"), code: "quiz.bank" },
    { icon: Layers, value: MODULES.length, label: t("modulesCount"), code: "ops.modules" },
  ];

  const breakdown = [
    { label: lang === "ar" ? "الدروس" : "lessons", w: "L·0.40", pct: Math.round(lessonsPct * 100) },
    { label: lang === "ar" ? "الدقة" : "accuracy", w: "Q·0.35", pct: Math.round(quizAcc * 100) },
    { label: lang === "ar" ? "المراجعة" : "review", w: "R·0.25", pct: Math.round(reviewUpkeep * 100) },
  ];

  const lvlSev: Record<LessonLevel, string> = { beginner: "chip-sev-ok", intermediate: "chip-sev-info", advanced: "chip-sev-warn", expert: "chip-sev-crit" };
  const levelMap: Record<LessonLevel, string> = { beginner: t("beginner"), intermediate: t("intermediate"), advanced: t("advanced"), expert: t("expert") };

  return (
    <div className="space-y-2.5">
      {/* ═══ hero · ops console terminal ═══ */}
      <section className="term-window hud-panel relative overflow-hidden">
        <div className="aurora" />
        <div dir="ltr" className="relative flex items-center gap-2 border-b border-zinc-100/10 bg-zinc-950/70 px-2 py-2.5">
          <TermDots />
          <span className="truncate font-mono text-[10.5px] text-zinc-400">cnss://ops-console</span>
          <span className="code-chip hidden shrink-0 sm:inline-block">v3.0</span>
          <span className="dot-leader" />
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400">
            <span className="relative flex size-2 items-center justify-center">
              <span className="pulse-ring" />
              <span className="blink-dot absolute size-1.5 rounded-full bg-emerald-400" />
            </span>
            STATUS: ACTIVE
          </span>
        </div>
        <div className="net-grid-bg relative space-y-4 bg-card/90 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="code-chip inline-flex items-center gap-1"><Terminal className="size-3" />operator</span>
                <span className="code-chip">lvl {lvl}/12</span>
              </div>
              <h1 className="text-xl font-black leading-snug sm:text-2xl">
                {t("welcome")} {lang === "ar" ? "في" : "·"} <span className="glitch-hover grad-text">{t("opsConsole")}</span>
              </h1>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{t("appTagline")}</p>
            </div>
            <div className="glitch-hover radar glow-primary hidden size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-primary-foreground sm:grid">
              <Activity className="relative z-10 size-6" strokeWidth={2.4} />
            </div>
          </div>

          {/* operator strip: level · uptime · xp */}
          <div className="flex flex-wrap items-stretch gap-2.5">
            <div className="flex min-w-[210px] flex-1 items-center gap-3 rounded-xl border bg-card/80 px-4 py-3 backdrop-blur">
              <div className="glow-primary grid size-12 place-items-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">{lvl}</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black">{bi(title)}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={lvlPct} className="h-1.5 flex-1" />
                  <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-muted-foreground">{xpDisplay}/{nextLvlXp}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border bg-card/80 px-3.5 py-3 backdrop-blur">
              <Timer className="size-4 text-primary" />
              <div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("uptime")}</div>
                <div className="text-glow font-mono text-sm font-black tabular-nums">{uptimeLabel}</div>
              </div>
              <span aria-hidden className="eq-bars ms-1"><i /><i /><i /><i /></span>
            </div>
            <Badge variant="outline" className="gap-1.5 self-center px-3 py-1.5 text-[11px] font-bold">
              <Zap className="size-3.5 text-yellow-500" /> {t("xp")}: <span className="font-mono tabular-nums">{xpDisplay}</span>
            </Badge>
          </div>

          {/* focus zone: current task + quick ops */}
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
            <AnimatePresence mode="wait" initial={false}>
              {nextLesson ? (
                <motion.button
                  key={nextLesson.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                  onClick={() => go("lessons", { lessonId: nextLesson.id })}
                  className="group flex flex-1 items-center gap-3 rounded-xl border-2 border-primary/40 bg-card/90 p-4 text-start transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 font-mono text-lg font-black text-primary">❯</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("focusZone")}</span>
                      <span className="font-mono text-[10px] font-black text-primary">{doneCount === 0 ? t("startLearning") : t("continueLearning")}</span>
                      <span className="code-chip">{nextLesson.id}</span>
                      <span className="code-chip hidden sm:inline-block">{nextLesson.moduleId}</span>
                    </div>
                    <div className="mt-0.5 truncate text-[13.5px] font-black transition-colors group-hover:text-primary">{bi(nextLesson.title)}</div>
                    <div className="mt-0.5 text-[10.5px] text-muted-foreground">{bi(MODULES.find((m) => m.id === nextLesson.moduleId)?.title)} · {nextLesson.durationMin} {t("minutes")}</div>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary rtl:rotate-180" />
                </motion.button>
              ) : (
                <motion.button
                  key="all-done"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                  onClick={() => go("playground")}
                  className="group flex flex-1 items-center gap-3 rounded-xl border-2 border-primary/40 bg-card/90 p-4 text-start transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 font-mono text-lg font-black text-primary">❯</div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("focusZone")}</span>
                    <div className="flex items-center gap-2 text-sm font-black">
                      <Trophy className="size-4 text-primary" />
                      {lang === "ar" ? "أكملت كل الدروس! جرّب المحاكي" : "All lessons done! Try the simulator"}
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("quizzes")}>
                <CircleHelp className="size-3.5" /> {t("quizzes")}
              </Button>
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("review")}>
                <RefreshCw className="size-3.5" /> {t("review")} {dueCount > 0 && <Badge className="min-w-4 px-1 py-0 text-[8px]">{dueCount}</Badge>}
              </Button>
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("playground")}>
                <FlaskConical className="size-3.5" /> {t("playground")}
              </Button>
            </div>
          </div>
        </div>
        <div className="scanline" />
      </section>

      {/* ═══ exam readiness gauge + weekly activity ═══ */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="hud-panel h-full">
            <CardContent>
              <SectionHead icon={Gauge} title={t("examReadiness")} code="ops.readiness" meta="w 40/35/25" />
              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div dir="ltr" className="relative shrink-0">
                  <svg width="136" height="136" viewBox="0 0 120 120" role="img" aria-label={`${t("readinessScore")} ${readiness}%`}>
                    <defs>
                      <linearGradient id="readyGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="55%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted-foreground/25" />
                    <g transform="rotate(-90 60 60)">
                      <motion.circle
                        cx="60" cy="60" r="54" fill="none" stroke="url(#readyGrad)" strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={RING_C}
                        initial={{ strokeDashoffset: RING_C }}
                        animate={{ strokeDashoffset: RING_C * (1 - readiness / 100) }}
                        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </g>
                  </svg>
                  <div className="absolute inset-0 grid place-content-center text-center">
                    <div className="text-glow font-mono text-[26px] font-black leading-none tabular-nums">
                      {readyDisplay}<span className="text-sm">%</span>
                    </div>
                    <span className={`chip-sev ${gradeSev} mx-auto mt-1.5`}>{grade}</span>
                  </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-3">
                  <p className="text-[11.5px] leading-relaxed text-muted-foreground">{t("examReadinessDesc")}</p>
                  <div>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{t("perfIndex")}</span>
                      <span className="dot-leader" />
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{readiness}%</span>
                    </div>
                    <div className="space-y-1.5">
                      {breakdown.map((b) => (
                        <div key={b.w} className="flex items-center gap-2">
                          <span className="w-14 shrink-0 truncate font-mono text-[9.5px] text-muted-foreground">{b.label}</span>
                          <span className="code-chip shrink-0">{b.w}</span>
                          <Progress value={b.pct} className="h-1 flex-1" />
                          <span className="w-8 shrink-0 text-end font-mono text-[10px] font-bold tabular-nums">{b.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="breathe w-full gap-2 font-black" onClick={() => go("quizzes", { exam: "final" })}>
                    <Play className="size-4" />{t("startFinalExam")}
                    <ArrowRight className="size-4 rtl:rotate-180" />
                  </Button>
                  <div dir="ltr" className="text-center font-mono text-[9.5px] text-muted-foreground/70">❯ quizzes --exam final</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hud-panel h-full hex-bg">
            <CardContent>
              <SectionHead icon={BarChart3} title={t("weeklyActivity")} code="ops.activity" meta={`Σ ${weekTotal}`} />
              <div dir="ltr">
                <div className="flex h-24 items-end gap-1.5 border-b border-border/70 sm:gap-2">
                  {week.map((d, i) => {
                    const h = d.count > 0 ? Math.min(100, 15 + d.count * 25) : 6;
                    return (
                      <div key={d.key} className="flex h-full flex-1 items-end justify-center"
                        title={lang === "ar" ? `${d.label} · ${d.count} درس مكتمل` : `${d.label} · ${d.count} lesson${d.count === 1 ? "" : "s"} completed`}>
                        <div className="relative h-16 w-full max-w-[26px]">
                          {d.count > 0 && (
                            <span className="absolute inset-x-0 text-center font-mono text-[9px] font-bold tabular-nums text-emerald-600 dark:text-emerald-400"
                              style={{ bottom: `calc(${h}% + 3px)` }}>{d.count}</span>
                          )}
                          <div className={`bar-grow absolute inset-x-0 bottom-0 rounded-t-md ${d.isToday
                            ? "bg-gradient-to-t from-teal-600 to-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.4)] ring-1 ring-teal-400/60"
                            : "bg-gradient-to-t from-emerald-600 to-emerald-400"}`}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-1.5 flex gap-1.5 sm:gap-2">
                  {week.map((d) => (
                    <span key={d.key} className={`flex-1 text-center font-mono text-[8.5px] ${d.isToday ? "font-bold text-teal-600 dark:text-teal-400" : "text-muted-foreground/70"}`}>{d.label}</span>
                  ))}
                </div>
                <div className="mt-2.5 flex items-center gap-2 font-mono text-[9.5px] text-muted-foreground">
                  <span className="chip-sev chip-sev-info">{lang === "ar" ? "٧ أيام · إكمال حقيقي" : "7d · real completions"}</span>
                  <span className="dot-leader" />
                  <span className="shrink-0">Σ {weekTotal}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ═══ system health tiles ═══ */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="hud-panel">
          <CardContent>
            <SectionHead icon={Activity} title={t("systemHealth")} code="ops.health" meta="4ch" />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }} className="rise-in" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="hud-panel rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`grid size-9 place-items-center rounded-lg ${s.color}`}><s.icon className="size-4.5" /></div>
                      <span className={`font-mono text-[9.5px] font-bold tabular-nums ${s.delta.cls}`}>{s.delta.text}</span>
                    </div>
                    <div className="mt-2.5 font-mono text-xl font-black leading-none tabular-nums">{s.value}</div>
                    <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ═══ module track + live feed ═══ */}
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hud-panel h-full">
            <CardContent>
              <SectionHead icon={GraduationCap} title={t("studyPath")} code="ops.track" meta={`${doneCount}/${TOTAL_LESSONS}`} />
              <div className="relative">
                {/* vertical track rail running behind the module node tiles */}
                <span aria-hidden className="data-rail" style={{ position: "absolute", insetInlineStart: "31px", top: "2rem", bottom: "2rem" }} />
                <div className="space-y-2">
                  {MODULES.map((m, i) => {
                    const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[m.icon] ?? BookOpen;
                    const ls = ALL_LESSONS.filter((l) => l.moduleId === m.id);
                    const done = ls.filter((l) => completedLessons[l.id]).length;
                    const pct = ls.length > 0 ? Math.round((done / ls.length) * 100) : 0;
                    const status = moduleStatus(pct);
                    return (
                      <motion.button key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }}
                        onClick={() => go("lessons")}
                        className="group flex w-full items-center gap-3 rounded-xl border bg-card/70 p-3 text-start transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 hover:bg-accent/40">
                        <span className="relative z-[2] grid size-10 shrink-0 place-items-center rounded-xl shadow-sm" style={{ background: m.color, color: "#fff" }}>
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-1.5">
                            <span className="code-chip shrink-0">M{String(i + 1).padStart(2, "0")}</span>
                            <span className="truncate text-[13px] font-black transition-colors group-hover:text-primary">{bi(m.title)}</span>
                            <span className={`chip-sev ${lvlSev[m.level]} shrink-0`}>{levelMap[m.level]}</span>
                          </span>
                          <span className="mt-1.5 flex items-center gap-2">
                            <Progress value={pct} className="h-1.5 flex-1" />
                            <span className="shrink-0 font-mono text-[9.5px] font-bold tabular-nums text-muted-foreground">{done}/{ls.length}</span>
                          </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1">
                          <span className={`chip-sev ${status.sev}`}>{lang === "ar" ? `${status.ar} · ${status.code}` : status.code}</span>
                          <ArrowRight className="size-3.5 text-muted-foreground transition-all group-hover:text-primary rtl:rotate-180" />
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="hud-panel h-full">
            <CardContent>
              <SectionHead icon={Radio} title={t("liveFeed")} code="ops.feed" meta={`${feed.length} ln`} />
              <div dir="ltr" className="overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-950/90 font-mono dark:bg-zinc-900/70">
                <div className="flex items-center gap-2 border-b border-zinc-100/10 px-3 py-2">
                  <TermDots />
                  <span className="truncate text-[10px] text-zinc-500">tail -f activity.log</span>
                  <span className="dot-leader" />
                  <span className="shrink-0 text-[9px] text-emerald-400/80">live</span>
                </div>
                <div className="max-h-44 space-y-0.5 overflow-y-auto px-2 py-2 text-[11px] leading-relaxed">
                  {feedEmpty ? (
                    <>
                      <div className="px-1 py-0.5 text-zinc-600">[{nowClock}] $ <span className="text-zinc-500">{lang === "ar" ? "بانتظار أول حزمة بيانات…" : "awaiting first packet…"}</span></div>
                      <div className="px-1 py-0.5 text-zinc-600">$ <span className="text-zinc-500">{lang === "ar" ? "لا قياسات بعد — أكمل درساً لبدء السجل" : "no telemetry yet — complete a lesson to start the log"}</span></div>
                    </>
                  ) : (
                    feed.map((ln, i) => {
                      const lid = ln.lessonId;
                      return lid ? (
                        <button key={i} onClick={() => go("lessons", { lessonId: lid })} title={bi(lessonById(lid)?.title)}
                          className="flex w-full items-baseline gap-2 rounded px-1 py-0.5 text-start hover:bg-zinc-100/5">
                          <span className="shrink-0 text-zinc-600">[{ln.ts}]</span>
                          <span className={ln.tone}>{ln.text}</span>
                        </button>
                      ) : (
                        <div key={i} className="flex items-baseline gap-2 px-1 py-0.5">
                          <span className="shrink-0 text-zinc-600">[{ln.ts}]</span>
                          <span className={ln.tone}>{ln.text}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex items-center gap-2 border-t border-zinc-100/10 px-3 py-1.5 text-[9.5px] text-zinc-600">
                  <span className="shrink-0"># {ALL_TOOLS.length} tools · {ALL_PROJECTS.length} projects</span>
                  <span className="dot-leader" />
                  <span className="shrink-0 text-emerald-400/80">$ <span className="caret">▌</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ═══ platform inventory ═══ */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="hud-panel">
          <CardContent>
            <SectionHead icon={TrendingUp} title={t("platformStats")} code="ops.platform" meta="v3.0" />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {platformStats.map((s, i) => (
                <motion.div key={s.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                  className="hud-panel rounded-xl bg-muted/30 p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  <div className="mb-1.5 flex items-center justify-center gap-1.5">
                    <s.icon className="float-soft size-4 shrink-0 text-primary" style={{ animationDelay: `${i * 0.3}s` }} />
                    <span className="code-chip shrink-0">{s.code}</span>
                  </div>
                  <div className="font-mono text-xl font-black leading-none tabular-nums">{s.value.toLocaleString()}</div>
                  <div className="mt-1 text-[9.5px] text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
