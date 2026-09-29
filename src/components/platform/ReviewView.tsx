"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Brain, Layers3, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useProgress, dueCards } from "@/lib/store";
import { ALL_LESSONS, lessonById } from "@/data/lessons";
import type { Bi } from "@/lib/types";

interface CardData {
  key: string;
  front: Bi;
  back: Bi;
  lessonId: string;
}

const MAX_SESSION = 20;

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
  };

  const grade = (g: "good" | "ok" | "bad") => {
    if (!session || !session[idx]) return;
    answerReview(session[idx].key, g);
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

  const current = session?.[idx];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <RefreshCw className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("reviewTitle")}</h2>
          <p className="text-[11px] text-muted-foreground">{t("reviewDesc")}</p>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: t("dueCards"), value: due.length, icon: Brain, color: "text-amber-500 bg-amber-500/10" },
          { label: t("totalCards"), value: allCards.length, icon: Layers3, color: "text-primary bg-primary/10" },
          { label: t("masteredCards"), value: mastered, icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10" },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-3 flex items-center gap-2.5">
              <div className={`grid size-9 place-items-center rounded-xl ${s.color}`}>
                <s.icon className="size-4.5" />
              </div>
              <div>
                <div className="text-xl font-black font-mono leading-none">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* session */}
      {session && current ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{idx + 1} / {session.length}</span>
            <button className="text-[10px] font-bold hover:text-foreground" onClick={() => setSession(null)}>✕</button>
          </div>
          <Progress value={((idx) / session.length) * 100} className="h-1.5" />

          {/* flip card */}
          <div className="flip-card h-64 cursor-pointer select-none" onClick={() => setFlipped((f) => !f)}>
            <div className={`flip-inner relative w-full h-full ${flipped ? "flipped" : ""}`}>
              <div className="flip-face absolute inset-0 rounded-2xl border-2 border-primary/40 bg-card p-6 flex flex-col items-center justify-center text-center gap-3">
                <Badge variant="secondary" className="text-[9.5px]">
                  {bi(lessonById(current.lessonId)?.title)}
                </Badge>
                <div className="text-[16px] font-black leading-8">{bi(current.front)}</div>
                <div className="text-[10.5px] text-muted-foreground">{t("showAnswer")} 👆</div>
              </div>
              <div className="flip-face flip-back absolute inset-0 rounded-2xl border-2 border-amber-500/50 bg-amber-500/10 p-6 flex flex-col items-center justify-center text-center gap-2 overflow-y-auto">
                <div className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase">{t("explanation")}</div>
                <div className="text-[14px] font-bold leading-7 whitespace-pre-line">{bi(current.back)}</div>
              </div>
            </div>
          </div>

          {flipped && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10 h-11 flex-col gap-0.5" onClick={() => grade("bad")}>
                <span className="text-xs font-black">{t("forgot")}</span>
                <span className="text-[9px] opacity-70">{lang === "ar" ? "إعادة من الصفر" : "reset to box 0"}</span>
              </Button>
              <Button variant="outline" className="border-amber-500/40 text-amber-600 hover:bg-amber-500/10 h-11 flex-col gap-0.5" onClick={() => grade("ok")}>
                <span className="text-xs font-black">{t("almost")}</span>
                <span className="text-[9px] opacity-70">{lang === "ar" ? "ابقِ بالمستوى" : "stay in box"}</span>
              </Button>
              <Button className="h-11 flex-col gap-0.5 glow-primary" onClick={() => grade("good")}>
                <span className="text-xs font-black">{t("knewIt")}</span>
                <span className="text-[9px] opacity-80">{lang === "ar" ? "صندوق أعلى" : "promote"}</span>
              </Button>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {sessionDone > 0 && (
            <Card className="border-primary/40 bg-primary/5">
              <CardContent className="p-4 text-center space-y-1">
                <Sparkles className="size-6 mx-auto text-primary" />
                <div className="text-sm font-black">{t("reviewSessionDone")}</div>
                <div className="text-[11px] text-muted-foreground">{sessionDone} {t("cardsReviewed")}</div>
              </CardContent>
            </Card>
          )}
          {allCards.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center space-y-2">
                <Layers3 className="size-8 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground leading-6">{t("noCardsYet")}</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-5 space-y-3">
                <Button className="w-full gap-1.5 glow-primary" onClick={start} disabled={due.length === 0}>
                  <RotateCcw className="size-4" />
                  {t("startReview")} ({due.length})
                </Button>
                {due.length === 0 && (
                  <p className="text-[11px] text-muted-foreground text-center">
                    {lang === "ar" ? "لا بطاقات مستحقة الآن — عُد لاحقاً أو أنشئ المزيد من الدروس" : "Nothing due now — come back later or complete more lessons"}
                  </p>
                )}
                <Button variant="outline" className="w-full gap-1.5 text-xs" onClick={generateFromCompleted}>
                  <Sparkles className="size-3.5" />
                  {t("generateFromLesson")} ({Object.keys(completedLessons).length})
                </Button>
              </CardContent>
            </Card>
          )}

          {/* box distribution */}
          {allCards.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-1.5">
                <div className="text-xs font-black mb-1">{lang === "ar" ? "توزيع الصناديق (Leitner)" : "Box distribution (Leitner)"}</div>
                {[0, 1, 2, 3, 4, 5].map((b) => {
                  const count = allCards.filter((c) => (cards[c.key]?.box ?? 0) === b).length;
                  const pct = allCards.length > 0 ? (count / allCards.length) * 100 : 0;
                  return (
                    <div key={b} className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground w-14 shrink-0">{t("box")} {b}</span>
                      <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${b >= 5 ? "bg-emerald-500" : b >= 3 ? "bg-primary" : "bg-amber-500"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold w-8 text-end">{count}</span>
                    </div>
                  );
                })}
                <div className="text-[9.5px] text-muted-foreground pt-1">
                  {lang === "ar"
                    ? "الفواصل الزمنية: 10 دقائق → يوم → 3 أيام → أسبوع → أسبوعان → شهر"
                    : "Intervals: 10min → 1d → 3d → 1w → 2w → 1mo"}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
