"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CircleHelp, Timer, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy,
  Shuffle, GraduationCap, Award, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { moduleExam, finalExam, randomPractice } from "@/lib/data";
import { MODULES } from "@/data/modules";
import { ALL_LESSONS, lessonById } from "@/data/lessons";
import { shuffle } from "@/lib/data";
import type { QuizQuestion, LessonLevel } from "@/lib/types";
import * as Icons from "lucide-react";

interface Q extends QuizQuestion {
  lessonId: string;
}

type Mode = "menu" | "lesson" | "exam" | "random" | "final" | "results";

export default function QuizView() {
  const { lang, t, bi } = useLang();
  const params = useNav((s) => s.params);
  const go = useNav((s) => s.go);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const quizStats = useProgress((s) => s.quizStats);
  const ensureCards = useProgress((s) => s.ensureCards);

  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ q: Q; picked: number }[]>([]);
  const [instantFeedback, setInstantFeedback] = useState(true);
  const [timer, setTimer] = useState<number | null>(null);
  const [quizKey, setQuizKey] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [returnedTo, setReturnedTo] = useState<string | null>(null);

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

  const startLessonQuiz = (lessonId: string) => {
    const lesson = lessonById(lessonId);
    if (!lesson) return;
    setQuestions(lesson.quiz.map((q) => ({ ...q, lessonId })));
    setQuizKey(lessonId);
    setTitle(bi(lesson.title));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setInstantFeedback(true);
    setTimer(null);
    setMode("lesson");
    setReturnedTo(lessonId);
  };

  const startModuleExam = (moduleId: string) => {
    const qs = moduleExam(moduleId, 10);
    setQuestions(qs);
    setQuizKey(`exam:${moduleId}`);
    setTitle(bi(MODULES.find((m) => m.id === moduleId)!.title));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setInstantFeedback(false);
    setTimer(10 * 60);
    setMode("exam");
    setReturnedTo(null);
  };

  const startRandom = () => {
    setQuestions(randomPractice(15));
    setQuizKey("random");
    setTitle(lang === "ar" ? "تدريب عشوائي" : "Random practice");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setInstantFeedback(true);
    setTimer(null);
    setMode("random");
    setReturnedTo(null);
  };

  const startFinal = () => {
    setQuestions(finalExam(40));
    setQuizKey("final");
    setTitle(t("finalExam"));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setInstantFeedback(false);
    setTimer(40 * 60);
    setMode("final");
    setReturnedTo(null);
  };

  // timer countdown
  useEffect(() => {
    if (timer === null || mode === "results" || mode === "menu") return;
    const int = setInterval(() => {
      setTimer((tm) => {
        if (tm === null) return null;
        if (tm <= 1) {
          clearInterval(int);
          finish();
          return 0;
        }
        return tm - 1;
      });
    }, 1000);
    return () => clearInterval(int);
     
  }, [timer, mode]);

  const q = questions[current];
  const correctCount = answers.filter((a) => a.picked === a.q.correct).length;

  const pick = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const nextQ = () => {
    if (selected === null || !q) return;
    const newAnswers = [...answers, { q, picked: selected }];
    setAnswers(newAnswers);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finish(newAnswers);
    }
  };

  const finish = (ans = answers) => {
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
    setMode("results");
  };

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
    const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const pass = pct >= 80;
    return (
      <div className="space-y-4">
        <Card className={pass ? "border-primary/50" : "border-amber-500/50"}>
          <CardContent className="p-6 text-center space-y-3">
            <div className={`mx-auto grid size-16 place-items-center rounded-full ${pass ? "bg-primary/15 text-primary" : "bg-amber-500/15 text-amber-500"}`}>
              {pass ? <Trophy className="size-8" /> : <RotateCcw className="size-8" />}
            </div>
            <div className="text-4xl font-black font-mono">{pct}%</div>
            <div className="text-sm font-bold">
              {correctCount} / {questions.length} — {pct === 100 ? t("perfectScore") : pass ? t("passedExam") : t("failedExam")}
            </div>
            <div className="text-[11px] text-muted-foreground">+{correctCount * 5}{correctCount === questions.length ? " + 15" : ""} XP</div>
            <div className="flex gap-2 justify-center pt-2">
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setMode("menu")}>
                <ChevronLeft className="size-3.5 rtl:rotate-180" /> {t("quizzes")}
              </Button>
              {returnedTo && (
                <Button size="sm" variant="outline" className="gap-1.5" onClick={() => go("lessons", { lessonId: returnedTo })}>
                  {t("backToLessons")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-xs font-black pt-1">{lang === "ar" ? "مراجعة الأسئلة" : "Question review"}</div>
        <div className="space-y-2">
          {answers.map((a, i) => {
            const ok = a.picked === a.q.correct;
            const lesson = lessonById(a.q.lessonId);
            return (
              <Card key={i} className={ok ? "" : "border-destructive/40"}>
                <CardContent className="p-3.5 space-y-1.5">
                  <div className="flex items-start gap-2">
                    {ok ? <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> : <XCircle className="size-4 text-destructive shrink-0 mt-0.5" />}
                    <div className="text-[13px] font-bold leading-6">{bi(a.q.q)}</div>
                    {lesson && <Badge variant="outline" className="ms-auto text-[9px] shrink-0">{bi(lesson.title)}</Badge>}
                  </div>
                  <div className="flex gap-2 items-center text-[12px] ps-6">
                    <span className="text-muted-foreground">{t("correctAnswer")}:</span>
                    <span className="font-bold text-primary">{bi(a.q.options[a.q.correct])}</span>
                  </div>
                  {!ok && (
                    <div className="flex gap-2 items-center text-[12px] ps-6">
                      <span className="text-muted-foreground">{lang === "ar" ? "اخترتَ" : "You picked"}:</span>
                      <span className="font-bold text-destructive line-through">{bi(a.q.options[a.picked])}</span>
                    </div>
                  )}
                  <div className="ps-6 text-[11.5px] text-muted-foreground leading-6">{bi(a.q.explain)}</div>
                </CardContent>
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
  const progressPct = Math.round(((current + (selected !== null ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setMode("menu")}>
          <ChevronLeft className="size-3.5 rtl:rotate-180 me-1" />
          {t("quizzes")}
        </Button>
        <span className="text-sm font-black truncate">{title}</span>
        <Badge variant={instantFeedback ? "secondary" : "default"} className="text-[9.5px] ms-auto">
          {instantFeedback ? t("practiceMode") : t("examMode")}
        </Badge>
        {timer !== null && (
          <Badge variant="outline" className="text-[10px] font-mono gap-1">
            <Timer className="size-3" />
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
          </Badge>
        )}
      </div>

      <Progress value={progressPct} className="h-1.5" />

      <div className="text-[11px] text-muted-foreground">
        {t("question")} {current + 1} {t("of")} {questions.length}
      </div>

      <Card>
        <CardContent className="p-5 sm:p-6 space-y-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={current}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="text-[15.5px] font-black leading-8"
            >
              {bi(q.q)}
            </motion.h2>
          </AnimatePresence>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isPicked = selected === i;
              const showState = selected !== null && (instantFeedback || current === questions.length - 1);
              const isCorrect = i === q.correct;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={selected !== null}
                  className={`w-full text-start rounded-xl border p-3.5 flex items-center gap-3 transition-all
                    ${selected === null ? "hover:border-primary hover:bg-accent/50 cursor-pointer" : ""}
                    ${isPicked && !showState ? "border-primary bg-accent" : ""}
                    ${showState && isCorrect ? "border-primary bg-primary/10" : ""}
                    ${isPicked && showState && !isCorrect ? "border-destructive bg-destructive/10" : ""}
                    ${!isPicked && !isCorrect ? "opacity-60" : ""}
                  `}
                >
                  <span className={`grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-black
                    ${showState && isCorrect ? "bg-primary text-primary-foreground" : isPicked ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[13.5px] font-semibold leading-6">{bi(opt)}</span>
                  {showState && isCorrect && <CheckCircle2 className="size-5 text-primary ms-auto shrink-0" />}
                  {isPicked && showState && !isCorrect && <XCircle className="size-5 text-destructive ms-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          {selected !== null && instantFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl border p-3.5 space-y-1.5 ${selectedOk ? "border-primary/40 bg-primary/5" : "border-destructive/40 bg-destructive/5"}`}
            >
              <div className={`text-xs font-black ${selectedOk ? "text-primary" : "text-destructive"}`}>
                {selectedOk ? `✓ ${t("correct")}` : `✗ ${t("wrong")}`}
              </div>
              <div className="text-[12.5px] leading-6">{bi(q.explain)}</div>
            </motion.div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted-foreground">
              {t("correct")}: {correctCount}/{answers.length}
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
