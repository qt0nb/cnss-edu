"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Award, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, CircleHelp,
  Flame, GraduationCap, Keyboard, RotateCcw, Shuffle, Sparkles, Target, Terminal,
  Timer, Trophy, XCircle, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { useCountUp } from "@/lib/useCountUp";
import { moduleExam, finalExam, randomPractice, shuffle } from "@/lib/data";
import { MODULES } from "@/data/modules";
import { ALL_LESSONS, lessonById } from "@/data/lessons";
import type { QuizQuestion } from "@/lib/types";
import * as Icons from "lucide-react";

interface Q extends QuizQuestion {
  lessonId: string;
  /** original index within lesson.quiz (lesson runs) — maps run questions
   *  back to their source position for the error-log qIdx */
  origIdx?: number;
}

type Mode = "menu" | "lesson" | "exam" | "random" | "final" | "results";
type Source = "lesson" | "exam" | "random" | "final";

/** emoji set for the perfect-score burst (no extra deps) */
const CONFETTI = ["🏆", "✨", "🎉", "⭐", "🎊"];

/** mono option letters — align with the A–D keyboard shortcuts */
const OPT_LETTERS = ["A", "B", "C", "D"];

const pad2 = (n: number) => String(n).padStart(2, "0");

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
  /** total seconds the current timed run started with (for low-time severity) */
  const [timerTotal, setTimerTotal] = useState(0);
  const [quizKey, setQuizKey] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [returnedTo, setReturnedTo] = useState<string | null>(null);
  // ── explanation / review upgrades ──
  const [shuffleOpts, setShuffleOpts] = useState(false);
  /** display position → original option index */
  const [optOrder, setOptOrder] = useState<number[]>(identityOrder(4));
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [bonusToast, setBonusToast] = useState<number | null>(null);
  /** menu: lesson-quiz picker drawer */
  const [lessonsOpen, setLessonsOpen] = useState(false);

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
    setTimerTotal(seconds ?? 0);
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
    resetRun(
      lesson.quiz.map((qq, qi) => ({ ...qq, lessonId, origIdx: qi })),
      lessonId, bi(lesson.title), true, null, "lesson", lessonId
    );
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

  // auto-start final exam deep link (Command Palette: go("quizzes", { exam: "final" }))
  useEffect(() => {
    if (params?.exam === "final") {
      startFinal();
      useNav.getState().go("quizzes", { exam: "final" });
    }
  }, [params?.exam]);

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

  // ── animated report numbers (hooks must run before any conditional return) ──
  const pDisplay = useCountUp(pct, 1100);
  const cDisplay = useCountUp(correctCount, 700);
  const wDisplay = useCountUp(Math.max(0, answers.length - correctCount), 700);
  const aDisplay = useCountUp(answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0, 700);
  const xDisplay = useCountUp(correctCount * 5 + (pct === 100 && questions.length > 0 ? 15 : 0), 900);

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

  // keyboard: 1-4 / A-D select option, Enter = next/finish
  useEffect(() => {
    if (mode === "menu" || mode === "results") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable)) return;
      let disp = -1;
      if (e.key >= "1" && e.key <= "4") disp = Number(e.key) - 1;
      else if (/^[a-d]$/i.test(e.key)) disp = e.key.toLowerCase().charCodeAt(0) - 97;
      if (disp >= 0) {
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
    // ── behavioral tracking: mode-aware quiz log (assessment trail) +
    // per-question error taxonomy. Lesson runs carry full error details with
    // qIdx mapped back to the original lesson.quiz order (origIdx); mixed runs
    // (module exam / random / final) span many lessons, so a single errorLog
    // lessonId can't be attributed honestly — aggregate stats only. ──
    if (source === "lesson") {
      const lesson = lessonById(quizKey);
      recordQuiz(quizKey, correct, ans.length, {
        moduleId: lesson?.moduleId ?? "",
        mode: "lesson",
        errors: ans
          .map((a, i) => ({ a, i }))
          .filter(({ a }) => a.picked !== a.q.correct)
          .map(({ a, i }) => ({ qIdx: a.q.origIdx ?? i, chosen: a.picked, correct: a.q.correct })),
      });
    } else if (source === "exam") {
      recordQuiz(quizKey, correct, ans.length, { moduleId: quizKey.replace(/^exam:/, ""), mode: "module" });
    } else if (source === "random") {
      recordQuiz(quizKey, correct, ans.length, { moduleId: "", mode: "random" });
    } else if (source === "final") {
      recordQuiz(quizKey, correct, ans.length, { moduleId: "", mode: "final" });
    } else {
      recordQuiz(quizKey, correct, ans.length);
    }
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

  // ── MENU · launch console ──
  if (mode === "menu") {
    const totalQuestions = ALL_LESSONS.reduce((s, l) => s + l.quiz.length, 0);
    const randomStat = quizStats["random"];
    const finalStat = quizStats["final"];
    return (
      <div className="space-y-4">
        {/* section header */}
        <div className="rise-in flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Terminal className="size-4" />
          </span>
          <h2 className="text-sm font-black">{t("quizzes")}</h2>
          <span className="code-chip" dir="ltr">quiz.engine</span>
          <span className="dot-leader" />
          <span className="hidden items-center gap-1.5 font-mono text-[10px] text-muted-foreground sm:flex">
            <span className="blink-dot inline-block size-1.5 rounded-full bg-emerald-500" aria-hidden />
            <span dir="ltr">{totalQuestions}q</span>
            <span className="eq-bars" aria-hidden><i /><i /><i /><i /></span>
          </span>
        </div>
        <p className="rise-in -mt-2 text-[11px] text-muted-foreground" style={{ animationDelay: "40ms" }}>
          {totalQuestions} {t("questionsCount")} · {lang === "ar" ? "تقييم فوري وشرح لكل سؤال" : "instant grading with explanations"}
        </p>

        {/* launch cards: random practice + final exam */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={startRandom}
            style={{ animationDelay: "80ms" }}
            className="hud-panel rise-in group relative overflow-hidden rounded-2xl p-4 text-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" aria-hidden />
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-500">
                <Shuffle className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black transition-colors group-hover:text-primary">{t("randomPractice")}</div>
                <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{t("randomDesc")}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="code-chip" dir="ltr">q:15</span>
                  <span className="code-chip" dir="ltr">mode:practice</span>
                  <span className="code-chip" dir="ltr">xp:75</span>
                  {randomStat && <span className="chip-sev chip-sev-info" dir="ltr">best {randomStat.best}%</span>}
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={startFinal}
            style={{ animationDelay: "150ms" }}
            className="hud-panel rise-in group relative overflow-hidden rounded-2xl p-4 text-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            <span className="net-grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
            <div className="relative flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <Award className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black transition-colors group-hover:text-primary">{t("finalExam")}</div>
                <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{t("finalExamDesc")}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="code-chip" dir="ltr">q:40</span>
                  <span className="code-chip" dir="ltr">mode:timed</span>
                  <span className="code-chip" dir="ltr">time:40m</span>
                  <span className="code-chip" dir="ltr">xp:200</span>
                  {finalStat && <span className="chip-sev chip-sev-ok" dir="ltr">best {finalStat.best}%</span>}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* module exams */}
        <div className="rise-in flex items-center gap-2 pt-2" style={{ animationDelay: "210ms" }}>
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <GraduationCap className="size-3.5" />
          </span>
          <span className="text-xs font-black">{t("moduleExam")}</span>
          <span className="dot-leader" />
          <span className="code-chip" dir="ltr">{MODULES.length} mods</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m, i) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[m.icon] ?? CircleHelp;
            const stat = quizStats[`exam:${m.id}`];
            return (
              <button
                key={m.id}
                onClick={() => startModuleExam(m.id)}
                title={t("examDesc")}
                style={{ animationDelay: `${250 + i * 45}ms` }}
                className="hud-panel rise-in group flex items-center gap-3 rounded-2xl p-3.5 text-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: `${m.color}22`, color: m.color }}>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-black transition-colors group-hover:text-primary">{bi(m.title)}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="code-chip" dir="ltr">q:10</span>
                    <span className="code-chip" dir="ltr">time:10m</span>
                    {stat ? (
                      <>
                        <span className="chip-sev chip-sev-ok" dir="ltr">best {stat.best}%</span>
                        <span className="code-chip" dir="ltr">{stat.attempts}x</span>
                      </>
                    ) : (
                      <span className="code-chip" dir="ltr">new</span>
                    )}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary rtl:rotate-180" />
              </button>
            );
          })}
        </div>

        {/* lesson quizzes */}
        <div className="pt-1">
          <button
            onClick={() => setLessonsOpen((v) => !v)}
            aria-expanded={lessonsOpen}
            style={{ animationDelay: `${250 + MODULES.length * 45}ms` }}
            className="flow-border rise-in flex w-full items-center gap-2.5 rounded-xl bg-card/70 px-3 py-2.5 text-start transition-transform hover:-translate-y-px"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="size-3.5" />
            </span>
            <span className="text-xs font-black">{lang === "ar" ? "اختبارات الدروس" : "Lesson quizzes"}</span>
            <span className="code-chip" dir="ltr">{ALL_LESSONS.length}</span>
            <span className="dot-leader" />
            <span className="hidden font-mono text-[9.5px] text-muted-foreground sm:inline" dir="ltr">
              {lessonsOpen ? "collapse" : "expand"}
            </span>
            <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", lessonsOpen && "rotate-180")} />
          </button>
          <AnimatePresence initial={false}>
            {lessonsOpen && (
              <motion.div
                key="lesson-picker"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-2 grid max-h-72 grid-cols-1 gap-1 overflow-y-auto rounded-xl border bg-card/60 p-1.5 sm:grid-cols-2">
                  {ALL_LESSONS.map((l, li) => (
                    <button
                      key={l.id}
                      onClick={() => startLessonQuiz(l.id)}
                      className="group flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-start transition-colors hover:bg-accent/60"
                    >
                      <span className="w-7 shrink-0 font-mono text-[9px] tabular-nums text-muted-foreground/70" dir="ltr">{pad2(li + 1)}</span>
                      <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold transition-colors group-hover:text-primary">{bi(l.title)}</span>
                      <span className="code-chip shrink-0" dir="ltr">q:{l.quiz.length}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── RESULTS · exam report ──
  if (mode === "results") {
    const pass = pct >= 80;
    const perfect = pct === 100 && questions.length > 0;
    const xpEarned = correctCount * 5;
    const xpBonus = perfect ? 15 : 0;
    const wrongCount = answers.length - correctCount;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    const hist = quizStats[quizKey];
    const weakLessonIds = [...new Set(answers.filter((a) => a.picked !== a.q.correct).map((a) => a.q.lessonId))];
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
        {/* report hero */}
        <div className="term-window relative overflow-hidden rounded-2xl rise-in">
          {/* chrome strip */}
          <div className="relative flex items-center gap-2 border-b border-border/60 px-3 py-2">
            <span className="term-dots ms-1 shrink-0" aria-hidden />
            <span className="glitch-hover select-none font-mono text-[10px] font-black tracking-[0.2em] text-zinc-200" dir="ltr">EXAM REPORT</span>
            <span className="code-chip hidden max-w-44 items-center truncate sm:inline-flex" dir="ltr">run:{quizKey}</span>
            <span className="dot-leader" />
            <span className="eq-bars shrink-0" aria-hidden><i /><i /><i /><i /></span>
          </div>

          <div className="relative bg-card/95 p-4 dark:bg-card/75 sm:p-6">
            <div className="aurora" aria-hidden />
            <div className="scanline" aria-hidden />
            {/* perfect-score emoji burst */}
            {confetti.length > 0 && (
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
                {confetti.map((c, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xl select-none sm:text-2xl"
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

            <div className="relative space-y-5">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:gap-6 sm:text-start">
                {/* animated score ring */}
                <div className="relative size-32 shrink-0 sm:size-36">
                  <svg viewBox="0 0 128 128" className="size-full -rotate-90">
                    <circle cx="64" cy="64" r={R} fill="none" strokeWidth="10" className="stroke-muted" />
                    <motion.circle
                      cx="64" cy="64" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={CIRC}
                      initial={{ strokeDashoffset: CIRC }}
                      animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className={pass ? "stroke-primary" : "stroke-amber-500"}
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="grad-text font-mono text-3xl font-black leading-none tabular-nums">{pDisplay}%</div>
                      <div className="mt-1.5 font-mono text-[10px] font-bold tabular-nums text-muted-foreground" dir="ltr">
                        {correctCount}/{questions.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-3">
                  {/* pass / fail banner */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5",
                      pass ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"
                    )}>
                      {pass ? <CheckCircle2 className="size-4 shrink-0 text-emerald-500" /> : <XCircle className="size-4 shrink-0 text-rose-500" />}
                      <span className={cn("text-xs font-black", pass ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400")}>
                        {perfect ? t("perfectScore") : pass ? t("passedExam") : t("failedExam")}
                      </span>
                      <span className={cn("chip-sev", pass ? "chip-sev-ok" : "chip-sev-crit")} dir="ltr">{pass ? "PASS" : "FAIL"}</span>
                    </span>
                    <span className={cn("inline-flex items-center gap-1 text-xs font-black", grade.cls)}>
                      <GradeIcon className="size-3.5" />
                      {bi(grade.label)}
                    </span>
                    <span className="chip-sev chip-sev-warn inline-flex items-center gap-1" dir="ltr">
                      <Zap className="size-3" />+{xDisplay} XP
                    </span>
                  </div>

                  {/* stats row */}
                  <div className="mx-auto grid max-w-md grid-cols-3 gap-2 sm:mx-0">
                    <div className="hud-panel rounded-xl p-2.5 text-center">
                      <div className="font-mono text-xl font-black tabular-nums text-emerald-600 dark:text-emerald-400">{cDisplay}</div>
                      <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">{t("correct")}</div>
                    </div>
                    <div className="hud-panel rounded-xl p-2.5 text-center">
                      <div className="font-mono text-xl font-black tabular-nums text-rose-600 dark:text-rose-400">{wDisplay}</div>
                      <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">{t("wrong")}</div>
                    </div>
                    <div className="hud-panel rounded-xl p-2.5 text-center">
                      <div className="font-mono text-xl font-black tabular-nums text-primary">{aDisplay}%</div>
                      <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">
                        {lang === "ar" ? "الدقة" : "Accuracy"}
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
                        <div className="bar-grow h-full rounded-full bg-primary" style={{ width: `${accuracy}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* history stat blocks */}
                  {hist && (
                    <div className="mx-auto grid max-w-md grid-cols-3 gap-2 sm:mx-0">
                      <div className="hud-panel rounded-xl p-2.5 text-center">
                        <div className="font-mono text-lg font-black tabular-nums">{hist.attempts}</div>
                        <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">
                          {lang === "ar" ? "المحاولات" : "Attempts"}
                        </div>
                      </div>
                      <div className="hud-panel rounded-xl p-2.5 text-center">
                        <div className="font-mono text-lg font-black tabular-nums text-primary">{hist.best}%</div>
                        <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">{t("best")}</div>
                      </div>
                      <div className="hud-panel rounded-xl p-2.5 text-center">
                        <div className="font-mono text-lg font-black tabular-nums" dir="ltr">{answers.length}/{questions.length}</div>
                        <div className="mt-0.5 text-[9px] font-black tracking-wider text-muted-foreground uppercase">
                          {lang === "ar" ? "أُجيبت" : "Answered"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* xp breakdown */}
                  <div className="mx-auto w-full max-w-xs space-y-1 rounded-xl border bg-muted/40 p-3 text-[11.5px] sm:mx-0">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-muted-foreground">
                        {lang === "ar" ? "إجابات صحيحة" : "Correct answers"} ({correctCount} × 5)
                      </span>
                      <span className="font-mono font-black" dir="ltr">+{xpEarned} XP</span>
                    </div>
                    {xpBonus > 0 && (
                      <div className="flex items-center justify-between gap-4 font-bold text-emerald-600 dark:text-emerald-400">
                        <span>{lang === "ar" ? "مكافأة الدرجة الكاملة" : "Perfect score bonus"}</span>
                        <span className="font-mono font-black" dir="ltr">+{xpBonus} XP</span>
                      </div>
                    )}
                    <div className="my-1 border-t border-border" />
                    <div className="flex items-center justify-between gap-4 font-black">
                      <span>{t("xp")}</span>
                      <span className="font-mono text-primary" dir="ltr">+{xpEarned + xpBonus} XP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="relative flex flex-wrap justify-center gap-2 pt-1">
                <Button size="sm" className="breathe gap-1.5 glow-primary" onClick={retry}>
                  <RotateCcw className="size-3.5" />
                  {t("retryQuiz")}
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5" onClick={scrollToReview}>
                  <BookOpen className="size-3.5" />
                  {lang === "ar" ? "مراجعة الإجابات" : "Review answers"}
                </Button>
                {weakLessonIds.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => go("lessons", weakLessonIds.length === 1 ? { lessonId: weakLessonIds[0] } : undefined)}
                  >
                    <Target className="size-3.5" />
                    {lang === "ar" ? "راجع الدروس الضعيفة" : "Review weak lessons"}
                    <span className="code-chip" dir="ltr">{weakLessonIds.length}</span>
                  </Button>
                )}
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

              {/* per-question breakdown */}
              <div className="space-y-1.5 border-t border-border/60 pt-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9.5px] font-black tracking-[0.2em] text-muted-foreground" dir="ltr">Q·BREAKDOWN</span>
                  <span className="dot-leader" />
                  <span className="code-chip" dir="ltr">{answers.length} {lang === "ar" ? "صف" : "rows"}</span>
                </div>
                <div className="max-h-72 space-y-1 overflow-y-auto pe-1">
                  {answers.map((a, i) => {
                    const ok = a.picked === a.q.correct;
                    return (
                      <button
                        key={i}
                        onClick={() => toggleQ(i)}
                        title={ok ? t("correct") : t("wrong")}
                        className="group flex w-full min-h-9 items-center gap-2 rounded-lg px-2 py-1.5 text-start transition-colors hover:bg-accent/50"
                      >
                        <span className="code-chip shrink-0" dir="ltr">Q{pad2(i + 1)}</span>
                        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-foreground/75 transition-colors group-hover:text-foreground">
                          {bi(a.q.q)}
                        </span>
                        {!ok && (
                          <span className="hidden max-w-52 min-w-0 truncate text-[10px] font-semibold text-emerald-600 md:inline dark:text-emerald-400" dir="auto">
                            → {bi(a.q.options[a.q.correct])}
                          </span>
                        )}
                        <span className={cn("chip-sev shrink-0", ok ? "chip-sev-ok" : "chip-sev-crit")} dir="ltr">
                          {ok ? "✓" : "✗"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data-rail mx-auto hidden h-14 sm:block" aria-hidden />

        {/* ── end-of-quiz review: every question, options, explanation ── */}
        <div ref={reviewRef} className="scroll-mt-28 space-y-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black">{lang === "ar" ? "مراجعة الأسئلة والشروح" : "Answers & explanations"}</span>
            <span className="chip-sev chip-sev-ok inline-flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              {correctCount} {t("correct")}
            </span>
            <span className="chip-sev chip-sev-crit inline-flex items-center gap-1">
              <XCircle className="size-3" />
              {wrongCount} {t("wrong")}
            </span>
            <div className="ms-auto flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 gap-1 px-2 text-[10.5px]" onClick={expandAll}>
                <ChevronDown className="size-3" />
                {lang === "ar" ? "توسيع الكل" : "Expand all"}
              </Button>
              <Button size="sm" variant="outline" className="h-7 px-2 text-[10.5px]" onClick={collapseAll}>
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
              <div key={i} className={cn("overflow-hidden rounded-2xl border bg-card transition-colors", ok ? "border-emerald-500/25" : "border-rose-500/35")}>
                <button
                  onClick={() => toggleQ(i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-2.5 p-3.5 text-start outline-none transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring/70"
                >
                  <span className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-lg font-mono text-[10px] font-black",
                    ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  )}>
                    {pad2(i + 1)}
                  </span>
                  <span className={cn("chip-sev shrink-0", ok ? "chip-sev-ok" : "chip-sev-crit")}>{ok ? t("correct") : t("wrong")}</span>
                  <span className="line-clamp-2 min-w-0 flex-1 text-[12.5px] font-bold leading-6">{bi(a.q.q)}</span>
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
                      <div className="space-y-3 px-3.5 pb-4">
                        <div className="text-[13.5px] font-bold leading-7">{bi(a.q.q)}</div>

                        {(moduleMeta || lesson) && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            {moduleMeta && (
                              <span className="code-chip inline-flex items-center gap-1">
                                <GraduationCap className="size-3" />
                                {bi(moduleMeta.title)}
                              </span>
                            )}
                            {lesson && (
                              <span className="code-chip inline-flex items-center gap-1">
                                <BookOpen className="size-3" />
                                {bi(lesson.title)}
                              </span>
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
                                  "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[12px] font-semibold leading-6",
                                  isCorrect && "border-emerald-500/60 bg-emerald-500/10",
                                  isPicked && !isCorrect && "border-rose-500/60 bg-rose-500/10",
                                  !isCorrect && !isPicked && "border-border opacity-55"
                                )}
                              >
                                <span className={cn(
                                  "grid size-5 shrink-0 place-items-center rounded-md font-mono text-[9.5px] font-black",
                                  isCorrect ? "bg-emerald-500 text-white" : isPicked ? "bg-rose-500 text-white" : "bg-muted text-muted-foreground"
                                )}>
                                  {OPT_LETTERS[oi] ?? oi + 1}
                                </span>
                                <span className="min-w-0 flex-1">{bi(opt)}</span>
                                {isPicked && (
                                  <span className="code-chip shrink-0">{lang === "ar" ? "اختيارك" : "pick"}</span>
                                )}
                                {isCorrect && <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />}
                                {isPicked && !isCorrect && <XCircle className="size-4 shrink-0 text-rose-500" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* full explanation — terminal block */}
                        <div className="term-window overflow-hidden rounded-xl">
                          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-1.5">
                            <span className="font-mono text-[10px] font-black text-zinc-200" dir="ltr">why:</span>
                            <span className="ms-auto font-mono text-[9px] text-zinc-300">{t("explanation")}</span>
                          </div>
                          <div className="bg-card/95 px-3.5 py-3 dark:bg-card/60">
                            <p className="text-[12px] leading-6 text-foreground/90">{bi(a.q.explain)}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── RUNTIME · exam console ──
  if (!q) {
    return <div className="p-6 text-center text-xs text-muted-foreground">{t("noQuestions")}</div>;
  }

  const selectedOk = selected !== null && selected === q.correct;
  const showState = selected !== null && instantFeedback;
  const dirX = lang === "ar" ? -1 : 1;
  const lesson = lessonById(q.lessonId);
  const moduleMeta = lesson ? MODULES.find((m) => m.id === lesson.moduleId) : undefined;
  // timer severity: amber under 50% of the budget, rose + pulse-ring under 25%
  const timed = timer !== null;
  const tRatio = timed && timerTotal > 0 ? (timer as number) / timerTotal : 1;
  const tCrit = timed && tRatio <= 0.25;
  const tWarn = timed && !tCrit && tRatio <= 0.5;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* sticky console strip */}
      <div className="term-window sticky top-[59px] z-20 flex items-center gap-2 rounded-xl p-1.5 sm:gap-2.5 sm:p-2">
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-lg"
          onClick={() => setMode("menu")}
          aria-label={t("quizzes")}
          title={t("quizzes")}
        >
          <ChevronLeft className="size-4 rtl:rotate-180" />
        </Button>
        <span
          className="code-chip hidden shrink-0 sm:inline-flex"
          title={instantFeedback ? t("practiceMode") : t("examMode")}
          dir="ltr"
        >
          {instantFeedback ? "mode:practice" : "mode:timed"}
        </span>
        <span className="shrink-0 font-mono text-[11.5px] font-black tracking-tight tabular-nums text-zinc-100" dir="ltr">
          Q {pad2(current + 1)}/{pad2(questions.length)}
        </span>
        <span className="hidden min-w-0 flex-1 truncate text-[11px] font-black text-zinc-300 md:block">{title}</span>

        {/* segmented progress */}
        <div className="flex min-w-10 flex-1 items-center gap-[3px]">
          {questions.map((_, i) => {
            const answered = i < answers.length;
            return (
              <span
                key={i}
                title={`${t("question")} ${i + 1}`}
                className={cn(
                  "h-1.5 min-w-0 flex-1 rounded-full transition-colors duration-300",
                  i === current ? "animate-pulse bg-primary" : answered ? "bg-emerald-500" : "bg-white/20 dark:bg-white/15"
                )}
              />
            );
          })}
        </div>

        {/* streak */}
        <span
          className={cn(
            "hidden shrink-0 items-center gap-1 text-[11px] font-black transition-colors lg:flex",
            streak >= 3 ? "text-orange-400" : "text-zinc-400"
          )}
          title={lang === "ar" ? "إجابات صحيحة متتالية" : "Consecutive correct answers"}
        >
          <Flame className={cn("size-3.5", streak >= 5 && "animate-pulse")} />
          <span className="font-mono tabular-nums" dir="ltr">{streak}</span>
        </span>

        {/* timer */}
        {timed && (
          <span
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[11px] font-bold tabular-nums",
              tCrit
                ? "border-rose-400/60 bg-rose-500/15 text-rose-300"
                : tWarn
                ? "border-amber-400/60 bg-amber-500/15 text-amber-300"
                : "border-white/15 text-zinc-200"
            )}
            title={tWarn || tCrit ? (lang === "ar" ? "الوقت المتبقي" : "Time remaining") : undefined}
          >
            {tCrit && <span className="pulse-ring" style={{ borderColor: "oklch(0.7 0.19 25 / 65%)" }} aria-hidden />}
            <Timer className={cn("size-3.5", tCrit ? "text-rose-400" : tWarn ? "text-amber-400" : "text-zinc-400")} />
            <span dir="ltr">{pad2(Math.floor((timer as number) / 60))}:{pad2((timer as number) % 60)}</span>
          </span>
        )}
      </div>

      {/* exam-mode notice: no feedback until the end */}
      {!instantFeedback && (
        <div className="rise-in flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3 py-2">
          <Timer className="size-3.5 shrink-0 text-amber-500" />
          <p className="text-[11px] leading-5 font-semibold text-amber-700 dark:text-amber-400">
            {lang === "ar"
              ? "لن تظهر النتائج أثناء الامتحان — ستُقيَّم إجاباتك وتستعرض كل الشروح في نهايته."
              : "No feedback during the exam — your answers are graded with full explanations at the end."}
          </p>
          <span className="chip-sev chip-sev-warn ms-auto hidden shrink-0 sm:inline-flex" dir="ltr">blind</span>
        </div>
      )}

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
            <div className="flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-[11.5px] font-black text-white shadow-lg">
              <Flame className="size-3.5" />
              {lang === "ar" ? `سلسلة ${bonusToast} إجابات صحيحة متتالية!` : `${bonusToast} correct in a row!`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* question console */}
      <div className="hud-panel relative overflow-hidden rounded-2xl">
        {/* terminal chrome strip */}
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-3 py-2">
          <span className="term-dots ms-1 shrink-0" aria-hidden />
          <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline" dir="ltr">cnss://quiz</span>
          <span className="truncate text-[10px] font-bold text-muted-foreground md:hidden">{title}</span>
          <span className="ms-auto flex min-w-0 items-center gap-1.5">
            {moduleMeta && (
              <span className="code-chip hidden max-w-36 items-center gap-1 sm:inline-flex">
                <GraduationCap className="size-3 shrink-0" />
                <span className="truncate">{bi(moduleMeta.title)}</span>
              </span>
            )}
            {lesson && (
              <span className="code-chip hidden max-w-36 items-center gap-1 md:inline-flex">
                <BookOpen className="size-3 shrink-0" />
                <span className="truncate">{bi(lesson.title)}</span>
              </span>
            )}
            <Toggle
              size="sm"
              variant="outline"
              pressed={shuffleOpts}
              onPressedChange={toggleShuffle}
              disabled={selected !== null}
              aria-label={lang === "ar" ? "خلط ترتيب الخيارات" : "Shuffle answer order"}
              title={lang === "ar" ? "خلط ترتيب الخيارات" : "Shuffle answer order"}
              className="h-7 shrink-0 px-2"
            >
              <Shuffle className="size-3.5" />
            </Toggle>
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 24 * dirX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 * dirX }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="space-y-4"
            >
              <h2 className="text-[15px] leading-8 font-semibold">{bi(q.q)}</h2>

              <div className="space-y-2">
                {optOrder.map((orig, disp) => {
                  const opt = q.options[orig];
                  const isPicked = selected === orig;
                  const isCorrect = orig === q.correct;
                  const tileCls =
                    showState && isCorrect
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : showState && isPicked
                      ? "border-rose-500 bg-rose-500 text-white"
                      : isPicked
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-transparent bg-muted text-muted-foreground";
                  return (
                    <button
                      key={disp}
                      onClick={() => pick(orig)}
                      disabled={selected !== null}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-start outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring/70",
                        selected === null && "cursor-pointer hover:border-primary hover:bg-primary/5",
                        !showState && isPicked && "border-primary bg-primary/10",
                        showState && isCorrect && "border-emerald-500 bg-emerald-500/10",
                        showState && isPicked && !isCorrect && "border-rose-500 bg-rose-500/10",
                        showState && !isCorrect && !isPicked && "opacity-50"
                      )}
                    >
                      <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg border font-mono text-[11px] font-black", tileCls)}>
                        {OPT_LETTERS[disp] ?? disp + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-[13.5px] leading-6 font-semibold">{bi(opt)}</span>
                      {showState && isCorrect && <span className="chip-sev chip-sev-ok shrink-0">✓ {t("correct")}</span>}
                      {showState && isPicked && !isCorrect && <span className="chip-sev chip-sev-crit shrink-0">✗ {t("wrong")}</span>}
                    </button>
                  );
                })}
              </div>

              {/* answer-level explanation (practice mode) — terminal block */}
              {selected !== null && instantFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="term-window relative overflow-hidden rounded-xl"
                >
                  <div className="relative flex items-center gap-2 border-b border-border/60 px-3 py-1.5">
                    <span className="font-mono text-[10px] font-black text-zinc-200" dir="ltr">why:</span>
                    <span className={cn("chip-sev", selectedOk ? "chip-sev-ok" : "chip-sev-crit")}>
                      {selectedOk ? t("correct") : t("wrong")}
                    </span>
                    <span className="ms-auto flex items-center gap-1 font-mono text-[9px] text-zinc-300">
                      <BookOpen className="size-3" />
                      {t("explanation")}
                    </span>
                  </div>
                  <div className="relative space-y-2 bg-card/95 px-3.5 py-3 dark:bg-card/60">
                    <p className="text-[12.5px] leading-7 text-foreground/90">
                      {bi(q.explain)}
                      <span className="caret ms-1 inline-block h-3 w-1.5 translate-y-0.5 rounded-[1px] bg-primary/70" aria-hidden />
                    </p>
                    {!selectedOk && (
                      <div className="text-[11.5px] font-bold text-emerald-700 dark:text-emerald-400">
                        <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">ans: </span>
                        {bi(q.options[q.correct])}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* footer: running score, keyboard hint, next */}
          <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
            <span className="shrink-0 text-[10.5px] font-bold whitespace-nowrap text-muted-foreground">
              {t("correct")}:{" "}
              <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400" dir="ltr">
                {correctCount}/{answers.length}
              </span>
            </span>
            <span
              className="hidden items-center gap-1.5 text-[10px] font-bold text-muted-foreground/80 md:flex"
              title={lang === "ar" ? "اضغط 1-4 أو A-D لاختيار الإجابة وEnter للتالي" : "Press 1-4 or A-D to answer, Enter for next"}
            >
              <Keyboard className="size-3" />
              <span className="kbd">1-4</span>
              <span className="kbd">A-D</span>
              <span className="kbd">↵</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <Button size="sm" className="gap-1.5 glow-primary" disabled={selected === null} onClick={nextQ}>
                {current === questions.length - 1 ? t("finish") : t("next")}
                <ArrowRight className="size-3.5 rtl:rotate-180" />
              </Button>
              <span className="kbd hidden sm:inline-flex" aria-hidden>↵</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
