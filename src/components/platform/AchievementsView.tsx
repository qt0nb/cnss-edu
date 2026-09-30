"use client";

import React from "react";
import { Trophy, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { ACHIEVEMENTS } from "@/data/achievements";
import type { Achievement } from "@/lib/types";
import * as Icons from "lucide-react";

const metricValue = (a: Achievement, m: Record<string, number>): number => m[a.metric] ?? 0;

export default function AchievementsView() {
  const { lang, t, bi } = useLang();
  const store = useProgress();
  const unlocked = store.achievements;

  const metrics: Record<string, number> = {
    lessonsCompleted: Object.keys(store.completedLessons).length,
    xp: store.xp,
    quizCorrect: store.quizTotals.correct,
    quizTotal: store.quizTotals.answered,
    streak: store.streak,
    toolsBookmarked: store.toolBookmarks.length,
    projectsBookmarked: store.projectBookmarks.length,
    reviewsDone: store.reviewsDone,
    perfectQuizzes: store.quizTotals.perfect,
  };

  const wallPct = Math.round((unlocked.length / ACHIEVEMENTS.length) * 100);

  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Trophy className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("achievementsTitle")}</h2>
        <span className="code-chip">ach.wall</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground">
          {unlocked.length}/{ACHIEVEMENTS.length} {t("unlocked")}
        </span>
      </div>

      {/* progress rail */}
      <div className="hud-panel rise-in flex items-center gap-3 rounded-xl p-3">
        <span className={`chip-sev shrink-0 ${wallPct === 100 ? "chip-sev-ok" : "chip-sev-info"}`}>{wallPct}%</span>
        <Progress value={wallPct} className="h-2 flex-1" />
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
          {t("totalAchievements")}: {ACHIEVEMENTS.length}
        </span>
      </div>

      {/* trophy wall */}
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked.includes(a.id);
          const value = metricValue(a, metrics);
          const pct = Math.min(100, Math.round((value / a.goal) * 100));
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[a.icon] ?? Trophy;
          return (
            <div
              key={a.id}
              className={`rise-in h-full rounded-2xl ${isUnlocked ? "hud-panel relative overflow-hidden" : "border bg-card/60"}`}
              style={{ animationDelay: `${Math.min(i * 0.045, 0.6)}s` }}
            >
              {isUnlocked && (
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent" />
              )}
              <div className="relative flex h-full items-start gap-3 p-4">
                <div
                  className={`relative grid size-11 shrink-0 place-items-center rounded-2xl ${
                    isUnlocked ? "breathe bg-primary text-primary-foreground glow-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isUnlocked ? (
                    <Icon className="size-5" />
                  ) : (
                    <>
                      <Icon className="size-5 grayscale opacity-50" />
                      <span className="absolute -bottom-1 -end-1 grid size-4.5 place-items-center rounded-full border bg-card text-muted-foreground">
                        <Lock className="size-2.5" />
                      </span>
                    </>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-black">{bi(a.title)}</span>
                    <span className={`chip-sev shrink-0 ${isUnlocked ? "chip-sev-ok" : "chip-sev-crit opacity-70"}`}>
                      {isUnlocked ? (lang === "ar" ? "مفتوح" : "UNLOCKED") : lang === "ar" ? "مقفل" : "LOCKED"}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{bi(a.desc)}</div>
                  {!isUnlocked && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="shrink-0 font-mono text-[9.5px] font-bold tabular-nums text-muted-foreground">
                        {value}/{a.goal}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
