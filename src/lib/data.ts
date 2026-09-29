import type { Lesson, QuizQuestion } from "@/lib/types";
import { ALL_LESSONS } from "@/data/lessons";
import { MODULES } from "@/data/modules";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function searchLessons(q: string, lang: "ar" | "en"): Lesson[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return ALL_LESSONS;
  return ALL_LESSONS.filter(
    (l) =>
      l.title.ar.toLowerCase().includes(needle) ||
      l.title.en.toLowerCase().includes(needle) ||
      l.summary[lang].toLowerCase().includes(needle) ||
      l.keyPoints.some((k) => k[lang].toLowerCase().includes(needle))
  );
}

export function moduleExam(moduleId: string, count = 10): QuizQuestion[] {
  const lessons = ALL_LESSONS.filter((l) => l.moduleId === moduleId);
  const pool = lessons.flatMap((l) => l.quiz.map((q) => ({ ...q, lessonId: l.id })));
  return shuffle(pool).slice(0, count);
}

export function finalExam(count = 40): QuizQuestion[] {
  const pool = ALL_LESSONS.flatMap((l) => l.quiz.map((q) => ({ ...q, lessonId: l.id })));
  // spread across modules: take per module proportionally
  const perModule = Math.max(2, Math.floor(count / MODULES.length));
  const picked: (QuizQuestion & { lessonId: string })[] = [];
  for (const m of MODULES) {
    const modPool = shuffle(pool.filter((q) => q.lessonId.startsWith("l") && ALL_LESSONS.find((l) => l.id === q.lessonId)?.moduleId === m.id));
    picked.push(...modPool.slice(0, perModule));
  }
  const rest = shuffle(pool.filter((q) => !picked.includes(q)));
  while (picked.length < count && rest.length) picked.push(rest.pop()!);
  return shuffle(picked).slice(0, count);
}

export function randomPractice(count = 15): QuizQuestion[] {
  const pool = ALL_LESSONS.flatMap((l) => l.quiz.map((q) => ({ ...q, lessonId: l.id })));
  return shuffle(pool).slice(0, count);
}

export const TOTAL_QUESTIONS = ALL_LESSONS.reduce((s, l) => s + l.quiz.length, 0);
