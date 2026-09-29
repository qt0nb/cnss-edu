"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, CircleHelp,
  Flame, GraduationCap, Keyboard, RotateCcw, Shuffle, Sparkles, Timer, Trophy, XCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { moduleExam, finalExam, randomPractice, shuffle } from "@/lib/data";
import { MODULES } from "@/data/modules";
import { ALL_LESSONS, lessonById } from "@/data/lessons";
import type { QuizQuestion } from "@/lib/types";
import * as Icons from "lucide-react";

interface Q extends QuizQuestion {
  lessonId: string;
}

type Mode = "menu" | "lesson" | "exam" | "random" | "final" | "results";
type Source = "lesson" | "exam" | "random" | "final";

/** emoji set for the perfect-score burst (no extra deps) */
const CONFETTI = ["🏆", "✨", "🎉", "⭐", "🎊"];

const identityOrder = (len: number) => Array.from({ length: len }, (_, i) => i);
const shuffledOrder = (len: number) => shuffle(identityOrder(len));

export default function QuizView() {
  const { lang, t, bi } = useLang();
  const params = useNav((s) => s.params);
  const go = useNav((s) => s.go);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const quizStats = useProgress((s) => s.quizStats);
  const ensureCards = useProgress((s) => s.ensureCards);

  const [mode, setMode] = useState<Mode>("menu");
  const [source, setSource] = useState<Source | null>(null);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [current, setCurrent] = useState(0);
  /** selected option — stored as the ORIGINAL option index (pre-shuffle) */
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ q: Q; picked: number }[]>([]);
  const [instantFeedback, setInstantFeedback] = useState(true);
  const [timer, setTimer] = useState<number | null>(null);
  const [quizKey, setQuizKey] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [returnedTo, setReturnedTo] = useState<string | null>(null);
  // ── explanation / review upgrades ──
  const [shuffleOpts, setShuffleOpts] = useState(false);
  /** display position → original option index */
  const [optOrder, setOptOrder] = useState<number[]>(identityOrder(4));
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [bonusToast, setBonusToast] = useState<number | null>(null);

  const finishedRef = useRef(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const resetRun = (
    qs: Q[], key: string, titleText: string, feedback: boolean,
    seconds: number | null, src: Source, back: string | null
  ) => {
    finishedRef.current = false;
    setQuestions(qs);
    setQuizKey(key);
    setTitle(titleText);
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setInstantFeedback(feedback);
    setTimer(seconds);
    setMode(src);
    setSource(src);
    setReturnedTo(back);
    setExpanded({});
    setBonusToast(null);
    setOptOrder(shuffleOpts ? shuffledOrder(qs[0]?.options.length ?? 4) : identityOrder(qs[0]?.options.length ?? 4));
  };

  const startLessonQuiz = (lessonId: string) => {
    const lesson = lessonById(lessonId);
    if (!lesson) return;
    resetRun(lesson.quiz.map((qq) => ({ ...qq, lessonId })), lessonId, bi(lesson.title), true, null, "lesson", lessonId);
  };

  const startModuleExam = (moduleId: string) => {
    resetRun(
      moduleExam(moduleId, 10),
      `exam:${moduleId}`,
      bi(MODULES.find((m) => m.id === moduleId)!.title),
      false, 10 * 60, "exam", null
    );
  };

  const startRandom = () => {
    resetRun(randomPractice(15), "random", lang === "ar" ? "تدريب عشوائي" : "Random practice", true, null, "random", null);
  };

  const startFinal = () => {
    resetRun(finalExam(40), "final", t("finalExam"), false, 40 * 60, "final", null);
  };

  // auto-start lesson quiz from nav params
  useEffect(() => {
    const lid = params?.lessonId;
    if (lid) {
      const lesson = lessonById(lid);
      if (lesson) {
        startLessonQuiz(lesson.id);
        useNav.getState().go("quizzes", { lessonId: lesson.id });
      }
    }
  }, [params?.lessonId]);

  // timer countdown (finish fires from the effect, never inside a state updater)
  useEffect(() => {
    if (timer === null || mode === "results" || mode === "menu") return;
    if (timer <= 0) {
      finish();
      return;
    }
    const int = setInterval(() => setTimer((tm) => (tm === null ? null : tm - 1)), 1000);
    return () => clearInterval(int);
  }, [timer, mode]);

  const q = questions[current];
  const correctCount = answers.filter((a) => a.picked === a.q.correct).length;
  const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // consecutive correct answers (includes the pending selection for instant feedback)
  const streak = useMemo(() => {
    let s = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers[i].picked === answers[i].q.correct) s++;
      else break;
    }
    if (selected !== null && q) s = selected === q.correct ? s + 1 : 0;
    return s;
  }, [answers, selected, q]);

  // streak bonus toast at every 5-in-a-row
  useEffect(() => {
    if (streak >= 5 && streak % 5 === 0) {
      setBonusToast(streak);
      const id = window.setTimeout(() => setBonusToast(null), 2800);
      return () => window.clearTimeout(id);
    }
  }, [streak]);

  // deterministic confetti plan for a perfect score
  const confetti = useMemo(() => {
    if (mode !== "results" || pct !== 100 || questions.length === 0) return [];
    return Array.from({ length: 18 }, (_, i) => ({
      e: CONFETTI[i % CONFETTI.length],
      x: ((i * 53) % 280) - 140,
      h: (i * 37) % 100,
      rot: ((i * 71) % 220) - 110,
      delay: (i % 6) * 0.12,
      dur: 1.7 + ((i * 13) % 5) * 0.22,
    }));
  }, [mode, pct, questions.length]);

  // keyboard: 1-4 select option, Enter = next/finish
  useEffect(() => {
    if (mode === "menu" || mode === "results") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key >= "1" && e.key <= "4") {
        const disp = Number(e.key) - 1;
        if (selected === null && q && disp < optOrder.length) setSelected(optOrder[disp]);
      } else if (e.key === "Enter" && selected !== null) {
        e.preventDefault();
        nextQ();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pick = (origIdx: number) => {
    if (selected !== null || !q) return;
    setSelected(origIdx);
  };

  const nextQ = () => {
    if (selected === null || !q) return;
    const newAnswers = [...answers, { q, picked: selected }];
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      const next = questions[current + 1];
      setCurrent(current + 1);
      setOptOrder(shuffleOpts ? shuffledOrder(next.options.length) : identityOrder(next.options.length));
    } else {
      finish(newAnswers);
    }
  };

  const finish = (ans = answers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const correct = ans.filter((a) => a.picked === a.q.correct).length;
    recordQuiz(quizKey, correct, ans.length);
    // generate review cards for wrong answers
    const lessonIds = [...new Set(ans.filter((a) => a.picked !== a.q.correct).map((a) => a.q.lessonId))];
    const cards: { key: string; front: QuizQuestion["q"]; back: QuizQuestion["q"] }[] = [];
    for (const lid of lessonIds) {
      const lesson = lessonById(lid);
      if (!lesson) continue;
      lesson.quiz.forEach((qq, qi) => {
        const wrong = ans.find((a) => a.q === qq || (a.q.q.en === qq.q.en && a.q.lessonId === lid));
        if (wrong && wrong.picked !== qq.correct) {
          cards.push({
            key: `q:${lid}:${qi}`,
            front: qq.q,
            back: { ar: `${qq.options[qq.correct].ar}\n— ${qq.explain.ar}`, en: `${qq.options[qq.correct].en}\n— ${qq.explain.en}` },
          });
        }
      });
    }
    if (cards.length > 0) ensureCards(cards);
    // auto-expand the first wrong answer in the review list
    const firstWrong = ans.findIndex((a) => a.picked !== a.q.correct);
    setExpanded(firstWrong >= 0 ? { [firstWrong]: true } : {});
    setBonusToast(null);
    setMode("results");
  };

  const toggleShuffle = (v: boolean) => {
    if (selected !== null) return; // locked once an answer is revealed
    setShuffleOpts(v);
    setOptOrder(v ? shuffledOrder(q?.options.length ?? 4) : identityOrder(q?.options.length ?? 4));
  };

  const retry = () => {
    if (source === "lesson" && returnedTo) startLessonQuiz(returnedTo);
    else if (source === "exam") startModuleExam(quizKey.replace(/^exam:/, ""));
    else if (source === "final") startFinal();
    else if (source === "random") startRandom();
    else setMode("menu");
  };

  const scrollToReview = () => reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const expandAll = () => setExpanded(answers.reduce<Record<number, boolean>>((acc, _, i) => { acc[i] = true; return acc; }, {}));
  const collapseAll = () => setExpanded({});
  const toggleQ = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  // ── MENU ──
  if (mode === "menu") {
    const totalQuestions = ALL_LESSONS.reduce((s, l) => s + l.quiz.length, 0);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
            <CircleHelp className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-black">{t("quizzes")}</h2>
            <p className="text-[11px] text-muted-foreground">
              {totalQuestions} {t("questionsCount")} · {lang === "ar" ? "تقييم فوري وشرح لكل سؤال" : "instant grading with explanations"}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={startRandom} className="text-start rounded-xl border bg-card p-4 hover:border-primary transition-colors group">
            <div className="flex items-center gap-2 mb-1">
              <div className="grid size-8 place-items-center rounded-lg bg-amber-500/15 text-amber-500"><Shuffle className="size-4" /></div>
              <span className="text-sm font-black group-hover:text-primary">{t("randomPractice")}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">{t("randomDesc")}</p>
          </button>
          <button onClick={startFinal} className="text-start rounded-xl border bg-gradient-to-br from-primary/10 to-transparent p-4 hover:border-primary transition-colors group">
            <div className="flex items-center gap-2 mb-1">
              <div className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary"><Award className="size-4" /></div>
              <span className="text-sm font-black group-hover:text-primary">{t("finalExam")}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">{t("finalExamDesc")}</p>
          </button>
        </div>

        <div className="text-xs font-black text-muted-foreground pt-1">{t("moduleExam")}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[m.icon] ?? CircleHelp;
            const stat = quizStats[`exam:${m.id}`];
            return (
              <button
                key={m.id}
                onClick={() => startModuleExam(m.id)}
                className="text-start rounded-xl border bg-card p-3.5 hover:border-primary transition-colors group flex items-center gap-3"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: `${m.color}22`, color: m.color }}>
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-black truncate group-hover:text-primary">{bi(m.title)}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {t("examDesc")}
                    {stat ? ` · ${t("best")}: ${stat.best}%` : ""}
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground rtl:rotate-180" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  if (mode === "results") {
    const pass = pct >= 80;
    const perfect = pct === 100 && questions.length > 0;
    const xpEarned = correctCount * 5;
    const xpBonus = perfect ? 15 : 0;
    const grade =
      pct >= 90
        ? { icon: Sparkles, label: { ar: "ممتاز", en: "Excellent" }, cls: "text-emerald-600 dark:text-emerald-400" }
        : pct >= 80
        ? { icon: Trophy, label: { ar: "جيد", en: "Good" }, cls: "text-primary" }
        : { icon: RotateCcw, label: { ar: "حاول مجدداً", en: "Try again" }, cls: "text-amber-600 dark:text-amber-400" };
    const GradeIcon = grade.icon;
    const R = 54;
    const CIRC = 2 * Math.PI * R;

    return (
      <div className="space-y-4">
        <Card className={cn("gap-0 relative overflow-hidden", pass ? "border-primary/50" : "border-amber-500/50")}>
          <CardContent className="p-6">
            {/* perfect-score emoji burst */}
            {confetti.length > 0 && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                {confetti.map((c, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl sm:text-2xl select-none"
                    style={{ left: "50%", top: "60%" }}
                    initial={{ opacity: 0, x: 0, y: -10, scale: 0.4, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [0, c.x * 0.6, c.x, c.x * 1.1],
                      y: [-10, -(60 + c.h), -(110 + c.h), -(130 + c.h)],
                      rotate: [0, c.rot * 0.5, c.rot, c.rot * 1.15],
                      scale: [0.4, 1.15, 1.1, 1],
                    }}
                    transition={{ duration: c.dur, delay: c.delay, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
                  >
                    {c.e}
                  </motion.span>
                ))}
              </div>
            )}

            <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-start">
              {/* circular score ring */}
              <div className="relative size-32 sm:size-36 shrink-0">
                <svg viewBox="0 0 128 128" className="size-full -rotate-90">
                  <circle cx="64" cy="64" r={R} fill="none" strokeWidth="10" className="stroke-muted" />
                  <circle
                    cx="64" cy="64" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - pct / 100)}
                    className={cn("transition-[stroke-dashoffset] duration-1000 ease-out", pass ? "stroke-primary" : "stroke-amber-500")}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="text-3xl font-black font-mono leading-none">{pct}%</div>
                    <div className="text-[10px] font-bold text-muted-foreground mt-1.5 font-mono">{correctCount}/{questions.length}</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-3">
                <div className={cn("flex items-center justify-center sm:justify-start gap-1.5", grade.cls)}>
                  <GradeIcon className="size-4" />
                  <span className="text-sm font-black">{bi(grade.label)}</span>
                </div>
                <div className="text-sm font-bold leading-6">
                  {correctCount} / {questions.length} — {perfect ? t("perfectScore") : pass ? t("passedExam") : t("failedExam")}
                </div>

                {/* XP breakdown */}
                <div className="rounded-xl border bg-muted/40 p-3 space-y-1.5 text-[11.5px] w-full max-w-xs mx-auto sm:mx-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground font-bold">
                      {lang === "ar" ? "إجابات صحيحة" : "Correct answers"} ({correctCount} × 5)
                    </span>
                    <span className="font-mono font-black">+{xpEarned} XP</span>
                  </div>
                  {xpBonus > 0 && (
                    <div className="flex items-center justify-between gap-4 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>{lang === "ar" ? "مكافأة الدرجة الكاملة" : "Perfect score bonus"}</span>
                      <span className="font-mono font-black">+{xpBonus} XP</span>
                    </div>
                  )}
                  <Separator className="my-1" />
                  <div className="flex items-center justify-between gap-4 font-black">
                    <span>{t("xp")}</span>
                    <span className="font-mono text-primary">+{xpEarned + xpBonus} XP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex gap-2 justify-center pt-4 flex-wrap">
              <Button size="sm" className="gap-1.5 glow-primary" onClick={scrollToReview}>
                <BookOpen className="size-3.5" />
                {lang === "ar" ? "مراجعة الإجابات" : "Review answers"}
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={retry}>
                <RotateCcw className="size-3.5" />
                {t("retryQuiz")}
              </Button>
              {returnedTo && (
                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => go("lessons", { lessonId: returnedTo })}>
                  {t("backToLessons")}
                </Button>
              )}
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setMode("menu")}>
                <ChevronLeft className="size-3.5 rtl:rotate-180" />
                {t("quizzes")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── end-of-quiz review: every question, options, explanation ── */}
        <div ref={reviewRef} className="scroll-mt-24 space-y-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black">{lang === "ar" ? "مراجعة الأسئلة والشروح" : "Answers & explanations"}</span>
            <Badge variant="outline" className="text-[9.5px] gap-1 font-bold border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3" />
              {correctCount} {t("correct")}
            </Badge>
            <Badge variant="outline" className="text-[9.5px] gap-1 font-bold border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400">
              <XCircle className="size-3" />
              {answers.length - correctCount} {t("wrong")}
            </Badge>
            <div className="ms-auto flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-[10.5px] px-2 gap-1" onClick={expandAll}>
                <ChevronDown className="size-3" />
                {lang === "ar" ? "توسيع الكل" : "Expand all"}
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-[10.5px] px-2" onClick={collapseAll}>
                {lang === "ar" ? "طيّ الكل" : "Collapse all"}
              </Button>
            </div>
          </div>

          {answers.map((a, i) => {
            const ok = a.picked === a.q.correct;
            const open = !!expanded[i];
            const lesson = lessonById(a.q.lessonId);
            const moduleMeta = lesson ? MODULES.find((m) => m.id === lesson.moduleId) : undefined;
            return (
              <Card key={i} className={cn("gap-0 py-0 overflow-hidden", ok ? "border-emerald-500/25" : "border-red-500/35")}>
                <button
                  onClick={() => toggleQ(i)}
                  aria-expanded={open}
                  className="w-full text-start p-4 flex items-center gap-2.5 hover:bg-accent/40 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                >
                  <span className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-lg text-[10px] font-black font-mono",
                    ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-red-500/15 text-red-600 dark:text-red-400"
                  )}>
                    {i + 1}
                  </span>
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black shrink-0",
                    ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
                  )}>
                    {ok ? t("correct") : t("wrong")}
                  </Badge>
                  <span className="text-[12.5px] font-bold leading-6 flex-1 min-w-0 line-clamp-2">{bi(a.q.q)}</span>
                  <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <CardContent className="px-4 pb-4 pt-0 space-y-3">
                        <div className="text-[13.5px] font-bold leading-7">{bi(a.q.q)}</div>

                        {(moduleMeta || lesson) && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {moduleMeta && (
                              <Badge variant="outline" className="text-[9px] font-bold gap-1">
                                <GraduationCap className="size-3" />
                                {bi(moduleMeta.title)}
                              </Badge>
                            )}
                            {lesson && (
                              <Badge variant="outline" className="text-[9px] font-bold gap-1">
                                <BookOpen className="size-3" />
                                {bi(lesson.title)}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* all options: correct highlighted, user pick marked */}
                        <div className="space-y-1.5">
                          {a.q.options.map((opt, oi) => {
                            const isCorrect = oi === a.q.correct;
                            const isPicked = oi === a.picked;
                            return (
                              <div
                                key={oi}
                                className={cn(
                                  "rounded-xl border px-3 py-2.5 flex items-center gap-2.5 text-[12px] font-semibold leading-6",
                                  isCorrect && "border-emerald-500/60 bg-emerald-500/10",
                                  isPicked && !isCorrect && "border-red-500/60 bg-red-500/10",
                                  !isCorrect && !isPicked && "border-border opacity-55"
                                )}
                              >
                                <span className={cn(
                                  "grid size-5 shrink-0 place-items-center rounded-md text-[9.5px] font-black font-mono",
                                  isCorrect ? "bg-emerald-500 text-white" : isPicked ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"
                                )}>
                                  {oi + 1}
                                </span>
                                <span className="flex-1 min-w-0">{bi(opt)}</span>
                                {isPicked && (
                                  <Badge variant="outline" className="text-[8.5px] font-black shrink-0">
                                    {lang === "ar" ? "اختيارك" : "Your pick"}
                                  </Badge>
                                )}
                                {isCorrect && <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />}
                                {isPicked && !isCorrect && <XCircle className="size-4 text-red-500 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* full explanation paragraph */}
                        <div className="rounded-xl border bg-muted/50 p-3.5 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10.5px] font-black text-muted-foreground">
                            <BookOpen className="size-3.5" />
                            {t("explanation")}
                          </div>
                          <p className="text-[12px] leading-6 text-foreground/90">{bi(a.q.explain)}</p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ── RUNTIME ──
  if (!q) {
    return <div className="text-xs text-muted-foreground p-6 text-center">{t("noQuestions")}</div>;
  }

  const selectedOk = selected !== null && selected === q.correct;
  const showState = selected !== null && instantFeedback;
  const progressPct = Math.round(((current + (selected !== null ? 1 : 0)) / questions.length) * 100);
  const dirX = lang === "ar" ? -1 : 1;
  const lesson = lessonById(q.lessonId);
  const moduleMeta = lesson ? MODULES.find((m) => m.id === lesson.moduleId) : undefined;

  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setMode("menu")}>
          <ChevronLeft className="size-3.5 rtl:rotate-180 me-1" />
          {t("quizzes")}
        </Button>
        <span className="text-sm font-black truncate">{title}</span>
        <div className="ms-auto flex items-center gap-2">
          <Badge variant={instantFeedback ? "secondary" : "default"} className="text-[9.5px]">
            {instantFeedback ? t("practiceMode") : t("examMode")}
          </Badge>
          <Toggle
            size="sm"
            variant="outline"
            pressed={shuffleOpts}
            onPressedChange={toggleShuffle}
            disabled={selected !== null}
            aria-label={lang === "ar" ? "خلط ترتيب الخيارات" : "Shuffle answer order"}
            title={lang === "ar" ? "خلط ترتيب الخيارات" : "Shuffle answer order"}
            className="h-7 px-2"
          >
            <Shuffle className="size-3.5" />
          </Toggle>
          {timer !== null && (
            <Badge variant="outline" className="text-[10px] font-mono gap-1">
              <Timer className="size-3" />
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </Badge>
          )}
        </div>
      </div>

      {/* exam-mode notice: no feedback until the end */}
      {!instantFeedback && (
        <Alert className="py-2.5 px-3.5 border-amber-500/40 bg-amber-500/5 [&>svg]:text-amber-500">
          <Timer className="size-4" />
          <AlertTitle className="text-[11.5px] font-black">{t("examMode")}</AlertTitle>
          <AlertDescription className="text-[11px] leading-5">
            {lang === "ar"
              ? "لن تظهر النتائج أثناء الامتحان — ستُقيَّم إجاباتك وتستعرض كل الشروح في نهايته."
              : "No feedback during the exam — your answers are graded with full explanations at the end."}
          </AlertDescription>
        </Alert>
      )}

      {/* segmented progress dots + streak flame */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className={cn("flex items-center flex-wrap", questions.length > 20 ? "gap-1" : "gap-1.5")}>
          {questions.map((_, i) => {
            const answered = i < answers.length;
            const ok = answered && answers[i].picked === answers[i].q.correct;
            return (
              <span
                key={i}
                title={`${t("question")} ${i + 1}`}
                className={cn(
                  "rounded-full transition-all",
                  questions.length > 20 ? "size-1.5" : "size-2",
                  i === current && "bg-primary scale-125",
                  i !== current && ok && "bg-emerald-500",
                  i !== current && answered && !ok && "bg-red-500 dark:bg-red-400",
                  !answered && i !== current && "bg-zinc-300 dark:bg-zinc-700"
                )}
              />
            );
          })}
        </div>
        <div
          className={cn("ms-auto flex items-center gap-1 text-[11px] font-black transition-colors", streak >= 3 ? "text-orange-500" : "text-muted-foreground")}
          title={lang === "ar" ? "إجابات صحيحة متتالية" : "Consecutive correct answers"}
        >
          <Flame className={cn("size-3.5", streak >= 5 && "animate-pulse")} />
          <span className="font-mono tabular-nums">{streak}</span>
        </div>
      </div>

      <Progress value={progressPct} className="h-1" />

      {/* streak bonus toast */}
      <AnimatePresence>
        {bonusToast !== null && (
          <motion.div
            key="bonus"
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-none z-20 flex justify-center"
          >
            <div className="rounded-full bg-orange-500 px-4 py-1.5 text-[11.5px] font-black text-white shadow-lg flex items-center gap-1.5">
              <Flame className="size-3.5" />
              {lang === "ar" ? `سلسلة ${bonusToast} إجابات صحيحة متتالية!` : `${bonusToast} correct in a row!`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="gap-0">
        <CardContent className="p-4 sm:p-6 space-y-4">
          {/* question meta: module + lesson source, question counter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {moduleMeta && (
              <Badge variant="outline" className="text-[9px] font-bold gap-1">
                <GraduationCap className="size-3" />
                {bi(moduleMeta.title)}
              </Badge>
            )}
            {lesson && (
              <Badge variant="outline" className="text-[9px] font-bold gap-1">
                <BookOpen className="size-3" />
                {bi(lesson.title)}
              </Badge>
            )}
            <span className="ms-auto text-[10.5px] text-muted-foreground font-bold whitespace-nowrap">
              {t("question")} {current + 1} {t("of")} {questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 16 * dirX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 * dirX }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-[15.5px] font-black leading-8">{bi(q.q)}</h2>

              <div className="space-y-2">
                {optOrder.map((orig, disp) => {
                  const opt = q.options[orig];
                  const isPicked = selected === orig;
                  const isCorrect = orig === q.correct;
                  return (
                    <button
                      key={disp}
                      onClick={() => pick(orig)}
                      disabled={selected !== null}
                      className={cn(
                        "w-full text-start rounded-xl border p-3.5 flex items-center gap-3 transition-all outline-none",
                        "focus-visible:ring-2 focus-visible:ring-ring/70",
                        selected === null && "hover:border-primary hover:bg-accent/50 cursor-pointer",
                        !showState && isPicked && "border-primary bg-accent",
                        showState && isCorrect && "border-emerald-500 bg-emerald-500/10",
                        showState && isPicked && !isCorrect && "border-red-500 bg-red-500/10",
                        showState && !isCorrect && !isPicked && "opacity-50"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-black font-mono",
                          showState && isCorrect
                            ? "bg-emerald-500 text-white"
                            : showState && isPicked && !isCorrect
                            ? "bg-red-500 text-white"
                            : isPicked
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {disp + 1}
                      </span>
                      <span className="text-[13.5px] font-semibold leading-6">{bi(opt)}</span>
                      {showState && isCorrect && <CheckCircle2 className="size-5 text-emerald-500 ms-auto shrink-0" />}
                      {showState && isPicked && !isCorrect && <XCircle className="size-5 text-red-500 ms-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* answer-level explanation card (practice mode) */}
              {selected !== null && instantFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "rounded-xl border p-4 space-y-2",
                    selectedOk ? "border-emerald-500/40 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"
                  )}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedOk ? <CheckCircle2 className="size-4 text-emerald-500" /> : <XCircle className="size-4 text-red-500" />}
                    <span className={cn("text-xs font-black", selectedOk ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                      {selectedOk ? t("correct") : t("wrong")}
                    </span>
                    <Separator orientation="vertical" className="h-3.5 mx-1" />
                    <span className="flex items-center gap-1 text-[10.5px] font-black text-muted-foreground">
                      <BookOpen className="size-3.5" />
                      {t("explanation")}
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-7 text-foreground/90">{bi(q.explain)}</p>
                  {!selectedOk && (
                    <div className="text-[11.5px] font-bold text-emerald-700 dark:text-emerald-400">
                      {t("correctAnswer")}: {bi(q.options[q.correct])}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* footer: running score, keyboard hint, next */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-muted-foreground font-bold whitespace-nowrap">
              {t("correct")}: {correctCount}/{answers.length}
            </span>
            <span
              className="hidden md:flex items-center gap-1.5 text-[10px] text-muted-foreground/80 font-bold"
              title={lang === "ar" ? "اضغط 1-4 لاختيار الإجابة وEnter للتالي" : "Press 1-4 to answer, Enter for next"}
            >
              <Keyboard className="size-3" />
              <span>1-4</span>
              <span className="opacity-40">·</span>
              <span>Enter</span>
            </span>
            <Button size="sm" className="gap-1.5 glow-primary" disabled={selected === null} onClick={nextQ}>
              {current === questions.length - 1 ? t("finish") : t("next")}
              <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
