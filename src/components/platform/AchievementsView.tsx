"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Lock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <Trophy className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("achievementsTitle")}</h2>
          <p className="text-[11px] text-muted-foreground">
            {unlocked.length}/{ACHIEVEMENTS.length} {t("unlocked")} · {t("totalAchievements")}: {ACHIEVEMENTS.length}
          </p>
        </div>
        <div className="ms-auto w-32">
          <Progress value={(unlocked.length / ACHIEVEMENTS.length) * 100} className="h-2" />
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = unlocked.includes(a.id);
          const value = metricValue(a, metrics);
          const pct = Math.min(100, Math.round((value / a.goal) * 100));
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[a.icon] ?? Trophy;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className={`h-full transition-colors ${isUnlocked ? "border-primary/60 bg-gradient-to-br from-primary/10 to-transparent" : ""}`}>
                <CardContent className="p-4 flex items-start gap-3 h-full">
                  <div className={`grid size-11 shrink-0 place-items-center rounded-2xl ${isUnlocked ? "bg-primary text-primary-foreground glow-primary" : "bg-muted text-muted-foreground"}`}>
                    {isUnlocked ? <Icon className="size-5" /> : <Lock className="size-4.5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-black truncate">{bi(a.title)}</span>
                      {isUnlocked && <CheckCircle2 className="size-3.5 text-primary shrink-0" />}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-5 mt-0.5">{bi(a.desc)}</div>
                    {!isUnlocked && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <Progress value={pct} className="h-1.5 flex-1" />
                        <span className="text-[9.5px] font-mono font-bold text-muted-foreground shrink-0">
                          {value}/{a.goal}
                        </span>
                      </div>
                    )}
                    {isUnlocked && (
                      <Badge className="mt-1.5 text-[9px]">{t("unlocked")} ✓</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
