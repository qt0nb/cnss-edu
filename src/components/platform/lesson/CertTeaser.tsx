"use client";

/* ── (C) Certificate teaser — lesson reader bottom action area ─────────
 * earned      → hud-panel strip: Award icon, t(certTeaser) + grade +
 *               score chip, primary button → go("certificates", {lesson})
 * not earned
 *  · lesson done → dim requirements hint (✓ lesson + quiz best %)
 *  · otherwise   → null (nothing to tease)
 * Identity: v3 ops console, emerald/amber only, rise-in animation. */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ChevronRight, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { certificateStatus, gradeLabel } from "@/lib/certificates";

export default function CertTeaser({ lessonId }: { lessonId: string }) {
  const { t, bi } = useLang();
  const go = useNav((s) => s.go);
  const completedLessons = useProgress((s) => s.completedLessons);
  const quizStats = useProgress((s) => s.quizStats);

  const status = useMemo(
    () => certificateStatus(lessonId, { completedLessons, quizStats }),
    [lessonId, completedLessons, quizStats]
  );

  /* ── earned: celebratory terminal strip ── */
  if (status.earned && status.record) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="hud-panel net-grid-bg relative overflow-hidden rounded-2xl p-4"
          style={{ backgroundColor: "var(--card)" }}
        >
          <div className="aurora" aria-hidden />
          <div className="scanline" aria-hidden />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-emerald-500 breathe">
              <Award className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-black leading-6">{t("certTeaser")}</div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="chip-sev chip-sev-ok shrink-0">{bi(gradeLabel(status.record.grade))}</span>
                <span className="code-chip shrink-0" dir="ltr">{t("certScore")}: {status.record.score}%</span>
                <span className="code-chip hidden shrink-0 sm:inline-flex" dir="ltr">{status.record.vid}</span>
              </div>
            </div>
            <Button
              size="sm"
              className="h-11 gap-1.5"
              onClick={() => go("certificates", { lesson: lessonId })}
            >
              {t("certOpenFromLesson")}
              <ChevronRight className="size-4 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── lesson done but quiz not passed yet: honest requirements hint ── */
  if (status.lessonDone) {
    return (
      <div className="rise-in flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xl border border-dashed border-border px-3.5 py-2.5 text-[11.5px] text-muted-foreground">
        <Award className="size-4 shrink-0 text-muted-foreground/60" />
        <span className="font-bold">{t("certRequirements")}:</span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-3.5 shrink-0" />
          {t("certReqLesson")}
        </span>
        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <CircleHelp className="size-3.5 shrink-0" />
          {t("certReqQuiz")}
          <span dir="ltr" className="font-mono text-[10.5px] font-bold">best: {status.best}%</span>
        </span>
      </div>
    );
  }

  return null;
}
