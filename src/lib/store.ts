"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Bi, ProgressState, QuizMode, ReviewCardState } from "@/lib/types";
import { ACHIEVEMENTS } from "@/data/achievements";

const todayStr = () => new Date().toISOString().slice(0, 10);
const dayDiff = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);

/** caps for the digital-record logs (bounded memory) */
const MAX_QUIZ_LOG = 200;
const MAX_ERROR_LOG = 300;
const MAX_AI_LOG = 100;

/** Leitner box intervals in days: box0→10min treated as 0.007d */
const BOX_DAYS = [0.007, 1, 3, 7, 14, 30];

export interface Store extends ProgressState {
  hydrated: boolean;
  setHydrated: () => void;
  touchDay: () => void;
  completeLesson: (lessonId: string) => void;
  recordQuiz: (
    lessonId: string,
    correct: number,
    total: number,
    detail?: {
      moduleId?: string;
      mode?: QuizMode;
      errors?: { qIdx: number; chosen: number; correct: number }[];
    }
  ) => number;
  ensureCards: (cards: { key: string; front: Bi; back: Bi }[]) => number;
  answerReview: (key: string, grade: "good" | "ok" | "bad") => void;
  toggleToolBookmark: (id: string) => void;
  toggleProjectBookmark: (id: string) => void;
  markPlaygroundUsed: (id: string) => void;
  recordChallenge: (id: string, xp: number) => boolean;
  resetAll: () => void;
  checkAchievements: () => string[];
  setLearnerName: (name: string) => void;
  markInteractiveSolved: (id: string, xp: number) => boolean;
  trackLessonOpen: (lessonId: string) => void;
  addLessonTime: (lessonId: string, ms: number) => void;
  recordAiQuery: (topic: string, q: string) => void;
}

const initial: ProgressState = {
  version: 1,
  xp: 0,
  streak: 0,
  lastActiveDay: "",
  learnerName: "",
  completedLessons: {},
  quizStats: {},
  quizTotals: { answered: 0, correct: 0, perfect: 0 },
  reviewCards: {},
  reviewsDone: 0,
  toolBookmarks: [],
  projectBookmarks: [],
  achievements: [],
  playgroundUsed: [],
  interactiveDone: [],
  lessonViews: {},
  quizLog: [],
  errorLog: [],
  aiQueries: [],
  challengesDone: [],
};

function metrics(p: ProgressState) {
  return {
    lessonsCompleted: Object.keys(p.completedLessons).length,
    xp: p.xp,
    quizCorrect: p.quizTotals.correct,
    quizTotal: p.quizTotals.answered,
    streak: p.streak,
    toolsBookmarked: p.toolBookmarks.length,
    projectsBookmarked: p.projectBookmarks.length,
    reviewsDone: p.reviewsDone,
    perfectQuizzes: p.quizTotals.perfect,
  };
}

export const useProgress = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      touchDay: () => {
        const today = todayStr();
        const { lastActiveDay, streak } = get();
        if (lastActiveDay === today) return;
        const diff = lastActiveDay ? dayDiff(lastActiveDay, today) : 99;
        const newStreak = diff === 1 ? streak + 1 : 1;
        set({ lastActiveDay: today, streak: newStreak, xp: get().xp + 2 });
      },

      completeLesson: (lessonId) => {
        const state = get();
        if (state.completedLessons[lessonId]) return;
        set({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: { completedAt: new Date().toISOString() },
          },
          xp: state.xp + 10,
        });
        get().touchDay();
      },

      recordQuiz: (lessonId, correct, total, detail) => {
        const state = get();
        const prev = state.quizStats[lessonId] ?? { attempts: 0, correct: 0, best: 0 };
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
        const perfect = correct === total && total > 0 ? 1 : 0;
        const now = new Date().toISOString();
        const moduleId = detail?.moduleId ?? "";
        const mode: QuizMode = detail?.mode ?? "lesson";
        const errorEntries = (detail?.errors ?? []).map((e) => ({
          lessonId,
          moduleId,
          qIdx: e.qIdx,
          chosen: e.chosen,
          correct: e.correct,
          at: now,
        }));
        set({
          quizStats: {
            ...state.quizStats,
            [lessonId]: {
              attempts: prev.attempts + 1,
              correct: prev.correct + correct,
              best: Math.max(prev.best, pct),
            },
          },
          quizTotals: {
            answered: state.quizTotals.answered + total,
            correct: state.quizTotals.correct + correct,
            perfect: state.quizTotals.perfect + perfect,
          },
          quizLog: [...state.quizLog, { lessonId, moduleId, correct, total, at: now, mode }].slice(-MAX_QUIZ_LOG),
          errorLog: errorEntries.length
            ? [...state.errorLog, ...errorEntries].slice(-MAX_ERROR_LOG)
            : state.errorLog,
          xp: state.xp + correct * 5 + (perfect ? 15 : 0),
        });
        get().touchDay();
        return pct;
      },

      ensureCards: (cards) => {
        const state = get();
        const next = { ...state.reviewCards };
        let added = 0;
        for (const c of cards) {
          if (!(c.key in next)) {
            next[c.key] = { box: 0, due: Date.now(), seen: 0, lapses: 0 };
            added++;
          }
        }
        if (added > 0) set({ reviewCards: next });
        return added;
      },

      answerReview: (key, grade) => {
        const state = get();
        const card = state.reviewCards[key];
        if (!card) return;
        let box = card.box;
        if (grade === "good") box = Math.min(5, box + 1);
        else if (grade === "ok") box = Math.max(0, box);
        else box = 0;
        const due = Date.now() + BOX_DAYS[box] * 86400000;
        set({
          reviewCards: { ...state.reviewCards, [key]: { ...card, box, due, seen: card.seen + 1, lapses: grade === "bad" ? card.lapses + 1 : card.lapses } },
          reviewsDone: state.reviewsDone + 1,
          xp: state.xp + (grade === "good" ? 3 : 1),
        });
      },

      toggleToolBookmark: (id) => {
        const state = get();
        const has = state.toolBookmarks.includes(id);
        set({
          toolBookmarks: has ? state.toolBookmarks.filter((t) => t !== id) : [...state.toolBookmarks, id],
          xp: has ? state.xp : state.xp + 2,
        });
      },

      toggleProjectBookmark: (id) => {
        const state = get();
        const has = state.projectBookmarks.includes(id);
        set({
          projectBookmarks: has ? state.projectBookmarks.filter((t) => t !== id) : [...state.projectBookmarks, id],
          xp: has ? state.xp : state.xp + 2,
        });
      },

      markPlaygroundUsed: (id) => {
        const state = get();
        if (state.playgroundUsed.includes(id)) return;
        set({ playgroundUsed: [...state.playgroundUsed, id], xp: state.xp + 5 });
      },

      recordChallenge: (id, xp) => {
        if (get().challengesDone.includes(id)) return false;
        set({ challengesDone: [...get().challengesDone, id], xp: get().xp + xp });
        return true;
      },

      setLearnerName: (name) => {
        set({ learnerName: name.trim().slice(0, 40) });
        get().touchDay();
      },

      markInteractiveSolved: (id, xp) => {
        if (get().interactiveDone.includes(id)) return false;
        set({ interactiveDone: [...get().interactiveDone, id], xp: get().xp + xp });
        get().touchDay();
        return true;
      },

      trackLessonOpen: (lessonId) => {
        const state = get();
        const prev = state.lessonViews[lessonId];
        set({
          lessonViews: {
            ...state.lessonViews,
            [lessonId]: {
              opens: (prev?.opens ?? 0) + 1,
              totalMs: prev?.totalMs ?? 0,
              lastOpenedAt: new Date().toISOString(),
            },
          },
        });
      },

      addLessonTime: (lessonId, ms) => {
        if (ms <= 0 || ms > 15 * 60_000) return; // sanity: ignore huge jumps
        const state = get();
        const prev = state.lessonViews[lessonId];
        set({
          lessonViews: {
            ...state.lessonViews,
            [lessonId]: {
              opens: prev?.opens ?? 1,
              totalMs: (prev?.totalMs ?? 0) + Math.round(ms),
              lastOpenedAt: prev?.lastOpenedAt ?? new Date().toISOString(),
            },
          },
        });
      },

      recordAiQuery: (topic, q) => {
        const state = get();
        set({
          aiQueries: [
            ...state.aiQueries,
            { at: new Date().toISOString(), topic, q: q.slice(0, 120) },
          ].slice(-MAX_AI_LOG),
        });
      },

      resetAll: () => set({ ...initial }),

      checkAchievements: () => {
        const state = get();
        const m = metrics(state);
        const unlocked: string[] = [];
        for (const a of ACHIEVEMENTS) {
          if (!state.achievements.includes(a.id) && m[a.metric] >= a.goal) unlocked.push(a.id);
        }
        if (unlocked.length > 0) {
          set({ achievements: [...state.achievements, ...unlocked], xp: state.xp + unlocked.length * 20 });
        }
        return unlocked;
      },
    }),
    {
      name: "nm-progress",
      storage: createJSONStorage(() => localStorage),
      // Rehydrate manually after mount (page.tsx) so the first client render
      // matches the server HTML — prevents React hydration mismatches when
      // persisted progress (XP, lessons, streaks…) differs from defaults.
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// ── derived helpers ────────────────────────────────────────────────────
export const learnerLevel = (xp: number): number => Math.min(12, Math.floor(Math.sqrt(Math.max(xp, 1) / 70)) + 1);

export const levelTitle = (level: number): Bi => {
  const titles: Bi[] = [
    { ar: "مبتدئ", en: "Novice" },
    { ar: "متعلم", en: "Learner" },
    { ar: "متمرّس", en: "Practitioner" },
    { ar: "متقن", en: "Proficient" },
    { ar: "محترف", en: "Professional" },
    { ar: "خبير", en: "Expert" },
    { ar: "مهندس شبكات", en: "Network Engineer" },
    { ar: "معماري شبكات", en: "Network Architect" },
    { ar: "سيد الشبكات", en: "Network Master" },
    { ar: "أسطورة الشبكات", en: "Network Legend" },
    { ar: "حكيم الإنترنت", en: "Internet Sage" },
    { ar: "خارق", en: "Transcendent" },
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
};

export const dueCards = (cards: Record<string, ReviewCardState>): string[] =>
  Object.entries(cards)
    .filter(([, c]) => c.due <= Date.now())
    .map(([k]) => k);
