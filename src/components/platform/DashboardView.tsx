"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Zap, Flame, Target, RefreshCw, CircleHelp, FlaskConical, Rocket,
  ArrowRight, TrendingUp, Wrench, GraduationCap, Layers, Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress, learnerLevel, levelTitle, dueCards } from "@/lib/store";
import { ALL_LESSONS, TOTAL_LESSONS, lessonById } from "@/data/lessons";
import { MODULES } from "@/data/modules";
import { ALL_TOOLS, TOTAL_TOOLS } from "@/data/tools";
import { ALL_PROJECTS, TOTAL_PROJECTS } from "@/data/projects";
import type { LessonLevel } from "@/lib/types";
import * as Icons from "lucide-react";

export default function DashboardView() {
  const { lang, t, bi } = useLang();
  const go = useNav((s) => s.go);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const completedLessons = useProgress((s) => s.completedLessons);
  const quizTotals = useProgress((s) => s.quizTotals);
  const cards = useProgress((s) => s.reviewCards);

  const lvl = learnerLevel(xp);
  const title = levelTitle(lvl);
  const nextLvlXp = Math.pow(lvl, 2) * 70;
  const prevLvlXp = Math.pow(lvl - 1, 2) * 70;
  const lvlPct = Math.min(100, Math.round(((xp - prevLvlXp) / Math.max(1, nextLvlXp - prevLvlXp)) * 100));

  const doneCount = Object.keys(completedLessons).length;
  const accuracy = quizTotals.answered > 0 ? Math.round((quizTotals.correct / quizTotals.answered) * 100) : 0;
  const dueCount = dueCards(cards).length;

  const nextLesson = useMemo(() => ALL_LESSONS.find((l) => !completedLessons[l.id]) ?? null, [completedLessons]);
  const recent = useMemo(
    () =>
      Object.entries(completedLessons)
        .sort((a, b) => (b[1].completedAt < a[1].completedAt ? -1 : 1))
        .slice(0, 3)
        .map(([id]) => lessonById(id))
        .filter((l): l is NonNullable<typeof l> => !!l),
    [completedLessons]
  );

  const totalQuestions = ALL_LESSONS.reduce((s, l) => s + l.quiz.length, 0);

  const stats = [
    { icon: BookOpen, label: t("lessonsCompleted"), value: `${doneCount}/${TOTAL_LESSONS}`, color: "text-emerald-500 bg-emerald-500/10" },
    { icon: Flame, label: t("streakDays"), value: streak, color: "text-orange-500 bg-orange-500/10" },
    { icon: Target, label: t("quizAccuracy"), value: `${accuracy}%`, color: "text-amber-500 bg-amber-500/10" },
    { icon: RefreshCw, label: t("dueCards"), value: dueCount, color: "text-primary bg-primary/10" },
  ];

  const platformStats = [
    { icon: BookOpen, value: TOTAL_LESSONS, label: t("lessonsCount") },
    { icon: Wrench, value: TOTAL_TOOLS, label: t("toolsCount") },
    { icon: Rocket, value: TOTAL_PROJECTS, label: t("projectsCount") },
    { icon: CircleHelp, value: totalQuestions, label: t("quizQuestions") },
    { icon: Layers, value: MODULES.length, label: t("modulesCount") },
  ];

  return (
    <div className="space-y-4">
      {/* hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-card to-card p-5 sm:p-6 net-grid-bg">
        <div className="relative space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black leading-snug">
              {t("welcome")} 👋
            </h1>
            <p className="text-[12.5px] text-muted-foreground mt-1">{t("appTagline")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-xl border bg-card/80 backdrop-blur px-4 py-3 min-w-[220px]">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground font-black text-lg glow-primary">
                {lvl}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black">{bi(title)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={lvlPct} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-mono font-bold text-muted-foreground shrink-0">{xp}/{nextLvlXp}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-1.5 py-1.5 px-3 text-[11px] font-bold">
              <Zap className="size-3.5 text-yellow-500" /> {t("xp")}: <span className="font-mono">{xp}</span>
            </Badge>
          </div>

          {/* continue */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
            {nextLesson ? (
              <button
                onClick={() => go("lessons", { lessonId: nextLesson.id })}
                className="group flex-1 text-start rounded-xl border-2 border-primary/40 bg-card/90 hover:border-primary transition-all p-4 flex items-center gap-3"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shrink-0">
                  <BookOpen className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-black text-primary">{doneCount === 0 ? t("startLearning") : t("continueLearning")}</div>
                  <div className="text-[13.5px] font-black truncate group-hover:text-primary transition-colors">{bi(nextLesson.title)}</div>
                  <div className="text-[10.5px] text-muted-foreground">{bi(MODULES.find((m) => m.id === nextLesson.moduleId)?.title)} · {nextLesson.durationMin} {t("minutes")}</div>
                </div>
                <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-0.5 rtl:rotate-180 transition-all shrink-0" />
              </button>
            ) : (
              <button onClick={() => go("playground")} className="flex-1 text-start rounded-xl border-2 border-primary/40 bg-card/90 hover:border-primary p-4 flex items-center gap-3">
                <Trophy className="size-8 text-primary" />
                <div>
                  <div className="text-sm font-black">{lang === "ar" ? "أكملت كل الدروس! جرّب المحاكي" : "All lessons done! Try the simulator"}</div>
                </div>
              </button>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-2">
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("quizzes")}>
                <CircleHelp className="size-3.5" /> {t("quizzes")}
              </Button>
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("review")}>
                <RefreshCw className="size-3.5" /> {t("review")} {dueCount > 0 && <Badge className="text-[8px] px-1 py-0 min-w-4">{dueCount}</Badge>}
              </Button>
              <Button variant="outline" size="sm" className="h-10 gap-1.5 text-[11px] font-bold" onClick={() => go("playground")}>
                <FlaskConical className="size-3.5" /> {t("playground")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-3 flex items-center gap-2.5">
                <div className={`grid size-9 place-items-center rounded-xl ${s.color}`}>
                  <s.icon className="size-4.5" />
                </div>
                <div>
                  <div className="text-lg font-black font-mono leading-none">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* platform stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="size-4 text-primary" />
            {t("platformStats")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {platformStats.map((s, i) => (
              <div key={i} className="rounded-xl border bg-muted/30 p-3 text-center">
                <s.icon className="size-4 mx-auto text-primary mb-1" />
                <div className="text-xl font-black font-mono leading-none">{s.value.toLocaleString()}</div>
                <div className="text-[9.5px] text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* learning path */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <GraduationCap className="size-4 text-primary" />
            {t("studyPath")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {MODULES.map((m, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[m.icon] ?? BookOpen;
            const ls = ALL_LESSONS.filter((l) => l.moduleId === m.id);
            const done = ls.filter((l) => completedLessons[l.id]).length;
            const pct = ls.length > 0 ? Math.round((done / ls.length) * 100) : 0;
            const levelMap: Record<LessonLevel, string> = {
              beginner: t("beginner"), intermediate: t("intermediate"), advanced: t("advanced"), expert: t("expert"),
            };
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => go("lessons")}
                className="w-full text-start rounded-xl border p-3 flex items-center gap-3 hover:border-primary hover:bg-accent/30 transition-all group"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: `${m.color}22`, color: m.color }}>
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-black truncate group-hover:text-primary transition-colors">{bi(m.title)}</span>
                    <span className="text-[9px] text-muted-foreground shrink-0">{levelMap[m.level]}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={pct} className="h-1.5 flex-1" />
                    <span className="text-[9.5px] font-bold text-muted-foreground shrink-0 font-mono">{done}/{ls.length}</span>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary rtl:rotate-180 shrink-0" />
              </motion.button>
            );
          })}
        </CardContent>
      </Card>

      {/* recent activity */}
      {recent.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recent.map((l) => (
              <button key={l.id} onClick={() => go("lessons", { lessonId: l.id })} className="w-full text-start rounded-lg px-3 py-2 hover:bg-accent/40 flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary text-[10px] font-black">✓</span>
                <span className="text-[12.5px] font-bold truncate">{bi(l.title)}</span>
                <span className="ms-auto text-[10px] text-muted-foreground shrink-0">
                  {new Date(completedLessons[l.id].completedAt).toLocaleDateString(lang === "ar" ? "ar" : "en")}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
