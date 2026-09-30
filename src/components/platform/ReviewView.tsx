"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Brain, Layers3, CheckCircle2, RotateCcw, Sparkles, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useProgress, dueCards } from "@/lib/store";
import { lessonById } from "@/data/lessons";
import type { Bi } from "@/lib/types";

interface CardData {
  key: string;
  front: Bi;
  back: Bi;
  lessonId: string;
}

const MAX_SESSION = 20;

/** Leitner rail tones: box 0 = new (amber), 1→5 progressively emerald */
const RAIL_TONES = [
  "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "border-emerald-500/40 bg-emerald-500/20 text-emerald-700 dark:text-emerald-200",
  "border-emerald-500/55 bg-emerald-500/35 text-emerald-800 dark:text-emerald-100",
  "border-emerald-500/70 bg-emerald-500/55 text-white",
  "border-emerald-400 bg-emerald-500 text-white glow-primary",
];
const RAIL_DIM = "border-transparent bg-muted/50 text-muted-foreground opacity-70";

const pad2 = (n: number) => String(n).padStart(2, "0");

export default function ReviewView() {
  const { lang, t, bi } = useLang();
  const cards = useProgress((s) => s.reviewCards);
  const answerReview = useProgress((s) => s.answerReview);
  const ensureCards = useProgress((s) => s.ensureCards);
  const completedLessons = useProgress((s) => s.completedLessons);
  const [session, setSession] = useState<CardData[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionDone, setSessionDone] = useState(0);
  const [tally, setTally] = useState({ good: 0, ok: 0, bad: 0 });

  // resolve card data from store keys
  const allCards: CardData[] = useMemo(() => {
    const out: CardData[] = [];
    for (const key of Object.keys(cards)) {
      const [type, lessonId, iStr] = key.split(":");
      const lesson = lessonById(lessonId);
      if (!lesson) continue;
      const i = parseInt(iStr, 10);
      if (type === "q" && lesson.quiz[i]) {
        const q = lesson.quiz[i];
        out.push({
          key,
          front: q.q,
          back: { ar: `${q.options[q.correct].ar}\n— ${q.explain.ar}`, en: `${q.options[q.correct].en}\n— ${q.explain.en}` },
          lessonId,
        });
      } else if (type === "k" && lesson.keyPoints[i]) {
        out.push({ key, front: lesson.keyPoints[i], back: lesson.title, lessonId });
      }
    }
    return out;
  }, [cards]);

  const due = useMemo(() => {
    const dueKeys = new Set(dueCards(cards));
    return allCards.filter((c) => dueKeys.has(c.key));
  }, [allCards, cards]);

  const mastered = allCards.filter((c) => (cards[c.key]?.box ?? 0) >= 5).length;

  // Leitner box census (box 0..5)
  const boxCounts = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    for (const c of allCards) {
      const b = cards[c.key]?.box ?? 0;
      if (b >= 0 && b <= 5) counts[b]++;
    }
    return counts;
  }, [allCards, cards]);

  const generateFromCompleted = () => {
    const newCards: { key: string; front: Bi; back: Bi }[] = [];
    for (const lid of Object.keys(completedLessons)) {
      const lesson = lessonById(lid);
      if (!lesson) continue;
      lesson.keyPoints.forEach((k, i) => {
        newCards.push({ key: `k:${lid}:${i}`, front: k, back: lesson.title });
      });
      lesson.quiz.forEach((q, i) => {
        newCards.push({
          key: `q:${lid}:${i}`,
          front: q.q,
          back: { ar: `${q.options[q.correct].ar}\n— ${q.explain.ar}`, en: `${q.options[q.correct].en}\n— ${q.explain.en}` },
        });
      });
    }
    const added = ensureCards(newCards);
    toast({ title: added > 0 ? `+${added} ${t("totalCards")}` : lang === "ar" ? "لا بطاقات جديدة" : "No new cards" });
  };

  const start = () => {
    const queue = due.slice(0, MAX_SESSION);
    setSession(queue);
    setIdx(0);
    setFlipped(false);
    setSessionDone(0);
    setTally({ good: 0, ok: 0, bad: 0 });
  };

  const grade = (g: "good" | "ok" | "bad") => {
    if (!session || !session[idx]) return;
    answerReview(session[idx].key, g);
    setTally((p) => ({ ...p, [g]: p[g] + 1 }));
    const nextIdx = idx + 1;
    const done = sessionDone + 1;
    if (nextIdx >= session.length) {
      setSession(null);
      setSessionDone(done);
    } else {
      setIdx(nextIdx);
      setFlipped(false);
      setSessionDone(done);
    }
  };

  // keyboard grading: 1 = forgot · 2 = almost · 3 = knew
  useEffect(() => {
    if (!session || !flipped) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "1") grade("bad");
      else if (e.key === "2") grade("ok");
      else if (e.key === "3") grade("good");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
     
  }, [session, flipped, idx, sessionDone]);

  const current = session?.[idx];
  const currentBox = current ? (cards[current.key]?.box ?? 0) : 0;
  const boxChipTone = currentBox >= 4 ? "chip-sev-ok" : currentBox >= 2 ? "chip-sev-info" : "chip-sev-warn";
  const accuracy = sessionDone > 0 ? Math.round((tally.good / sessionDone) * 100) : 0;
  const sessionXp = tally.good * 3 + tally.ok + tally.bad;

  const railLabels = [
    lang === "ar" ? "جديد" : "new",
    lang === "ar" ? "صندوق ١" : "box 1",
    lang === "ar" ? "صندوق ٢" : "box 2",
    lang === "ar" ? "صندوق ٣" : "box 3",
    lang === "ar" ? "صندوق ٤" : "box 4",
    lang === "ar" ? "صندوق ٥" : "box 5",
  ];

  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <RefreshCw className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("reviewTitle")}</h2>
        <span className="code-chip">review.srs</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground">
          {lang === "ar" ? "مستحق" : "due"} {due.length}/{allCards.length}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground -mt-2.5">{t("reviewDesc")}</p>

      {/* stats blocks */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: t("dueCards"), value: due.length, icon: Brain, color: "text-amber-500 bg-amber-500/10" },
          { label: t("totalCards"), value: allCards.length, icon: Layers3, color: "text-primary bg-primary/10" },
          { label: t("masteredCards"), value: mastered, icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10" },
        ].map((s, i) => (
          <div key={i} className="hud-panel rise-in rounded-xl p-3 flex items-center gap-2.5" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className={`grid size-9 shrink-0 place-items-center rounded-lg ${s.color}`}>
              <s.icon className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-xl font-black leading-none tabular-nums">{s.value}</div>
              <div className="truncate text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Leitner box rail */}
      {allCards.length > 0 && (
        <div className="hud-panel rise-in rounded-xl p-3 space-y-2" style={{ animationDelay: "0.18s" }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black">{lang === "ar" ? "مسار صناديق ليتمان" : "Leitner box rail"}</span>
            <span className="dot-leader" />
            <span className="font-mono text-[10px] text-muted-foreground">
              {mastered}/{allCards.length} {lang === "ar" ? "متقن" : "mastered"}
            </span>
          </div>
          <div className="flex gap-1.5">
            {boxCounts.map((count, b) => (
              <div
                key={b}
                className={`rise-in min-w-[3.1rem] rounded-lg border px-1.5 py-2 text-center ${count === 0 ? RAIL_DIM : RAIL_TONES[b]}`}
                style={{ flexGrow: Math.max(count, 1), animationDelay: `${0.22 + b * 0.06}s` }}
              >
                <div className="font-mono text-sm font-black leading-none tabular-nums">{count}</div>
                <div className="mt-1 font-mono text-[8.5px] font-bold tracking-wide">{railLabels[b]}</div>
              </div>
            ))}
          </div>
          <div className="font-mono text-[9.5px] text-muted-foreground">
            {lang === "ar"
              ? "الفواصل الزمنية: 10 دقائق → يوم → 3 أيام → أسبوع → أسبوعان → شهر"
              : "intervals: 10min → 1d → 3d → 1w → 2w → 1mo"}
          </div>
        </div>
      )}

      {/* session */}
      {session && current ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-mono font-bold tabular-nums">{idx + 1} / {session.length}</span>
            <button className="font-mono text-[10px] hover:text-foreground" onClick={() => setSession(null)}>✕</button>
          </div>
          <Progress value={(idx / session.length) * 100} className="h-1.5" />

          {/* flip card — terminal window front / answer back */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={{ opacity: 0, scale: 0.9, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 14 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <div className="flip-card h-64 cursor-pointer select-none" onClick={() => setFlipped((f) => !f)}>
                <div className={`flip-inner relative h-full w-full ${flipped ? "flipped" : ""}`}>
                  {/* front */}
                  <div className="flip-face term-window absolute inset-0 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-3.5 py-2.5">
                      <span className="term-dots" />
                      <span className="font-mono text-[10px] font-bold text-muted-foreground">
                        card {pad2(idx + 1)}/{pad2(session.length)}
                      </span>
                      <span className="dot-leader" />
                      <span className={`chip-sev ${boxChipTone}`}>box {currentBox}</span>
                    </div>
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-3 bg-card/90 px-6 text-center">
                      <span className="code-chip max-w-full truncate">{bi(lessonById(current.lessonId)?.title)}</span>
                      <div className="text-[16px] font-black leading-8">{bi(current.front)}</div>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                        <span className="caret font-mono text-primary">▍</span>
                        {t("showAnswer")}
                      </div>
                    </div>
                  </div>
                  {/* back */}
                  <div className="flip-face flip-back absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-amber-500/50 bg-amber-500/10 backdrop-blur-[6px]">
                    <div className="flex items-center gap-2 border-b border-amber-500/40 px-3.5 py-2.5">
                      <span className={`chip-sev chip-sev-warn`}>{t("explanation")}</span>
                      <span className="dot-leader" />
                      <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        card {pad2(idx + 1)}/{pad2(session.length)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto px-6 py-4 text-center">
                      <div className="text-[14px] font-bold leading-7 whitespace-pre-line">{bi(current.back)}</div>
                    </div>
                    <div className="flex items-center gap-2 border-t border-amber-500/30 px-3.5 py-2">
                      <span className="font-mono text-[9.5px] text-muted-foreground">ref:</span>
                      <span className="code-chip">{current.lessonId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {flipped && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-2">
              <button
                onClick={() => grade("bad")}
                className="relative flex flex-col items-center gap-1 rounded-xl border border-rose-500/40 bg-rose-500/5 px-2 py-3 transition-all hover:bg-rose-500/15 active:scale-[0.97]"
              >
                <span className="kbd absolute top-1.5 end-1.5">1</span>
                <span className="chip-sev chip-sev-crit">FORGOT</span>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400">{t("forgot")}</span>
                <span className="text-[9px] text-muted-foreground">{lang === "ar" ? "إعادة من الصفر" : "reset to box 0"}</span>
              </button>
              <button
                onClick={() => grade("ok")}
                className="relative flex flex-col items-center gap-1 rounded-xl border border-amber-500/40 bg-amber-500/5 px-2 py-3 transition-all hover:bg-amber-500/15 active:scale-[0.97]"
              >
                <span className="kbd absolute top-1.5 end-1.5">2</span>
                <span className="chip-sev chip-sev-warn">ALMOST</span>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400">{t("almost")}</span>
                <span className="text-[9px] text-muted-foreground">{lang === "ar" ? "ابقِ بالمستوى" : "stay in box"}</span>
              </button>
              <button
                onClick={() => grade("good")}
                className="relative flex flex-col items-center gap-1 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-2 py-3 transition-all hover:bg-emerald-500/20 active:scale-[0.97] glow-primary"
              >
                <span className="kbd absolute top-1.5 end-1.5">3</span>
                <span className="chip-sev chip-sev-ok">KNEW</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{t("knewIt")}</span>
                <span className="text-[9px] text-muted-foreground">{lang === "ar" ? "صندوق أعلى" : "promote"}</span>
              </button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* session summary */}
          {sessionDone > 0 && (
            <div className="hud-panel rise-in rounded-xl p-4 text-center space-y-3">
              <Sparkles className="mx-auto size-6 text-primary" />
              <div className="text-sm font-black">{t("reviewSessionDone")}</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border bg-muted/30 px-2 py-2.5">
                  <div className="flex items-center justify-center gap-1 font-mono text-xl font-black leading-none tabular-nums text-primary">
                    <Target className="size-3.5" />
                    {accuracy}%
                  </div>
                  <div className="mt-1 text-[9px] text-muted-foreground">{lang === "ar" ? "دقة الجلسة" : "accuracy"}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 px-2 py-2.5">
                  <div className="font-mono text-xl font-black leading-none tabular-nums">{sessionDone}</div>
                  <div className="mt-1 text-[9px] text-muted-foreground">{t("cardsReviewed")}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 px-2 py-2.5">
                  <div className="flex h-full items-center justify-center">
                    <span className="chip-sev chip-sev-info">+{sessionXp} XP</span>
                  </div>
                  <div className="mt-1 text-[9px] text-muted-foreground">{lang === "ar" ? "مكافأة الجلسة" : "session reward"}</div>
                </div>
              </div>
              <Button className="breathe w-full gap-1.5 glow-primary" onClick={start} disabled={due.length === 0}>
                <RotateCcw className="size-4" />
                {t("startReview")} ({due.length})
              </Button>
            </div>
          )}
          {allCards.length === 0 ? (
            <div className="hud-panel rise-in rounded-xl p-6 text-center space-y-2">
              <Layers3 className="mx-auto size-8 text-muted-foreground" />
              <p className="text-xs leading-6 text-muted-foreground">{t("noCardsYet")}</p>
            </div>
          ) : (
            <div className="hud-panel rise-in rounded-xl p-4 space-y-3">
              <Button className="glow-primary w-full gap-1.5" onClick={start} disabled={due.length === 0}>
                <RotateCcw className="size-4" />
                {t("startReview")} ({due.length})
              </Button>
              {due.length === 0 && (
                <p className="text-center text-[11px] text-muted-foreground">
                  {lang === "ar" ? "لا بطاقات مستحقة الآن — عُد لاحقاً أو أنشئ المزيد من الدروس" : "Nothing due now — come back later or complete more lessons"}
                </p>
              )}
              <Button variant="outline" className="w-full gap-1.5 text-xs" onClick={generateFromCompleted}>
                <Sparkles className="size-3.5" />
                {t("generateFromLesson")} ({Object.keys(completedLessons).length})
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
