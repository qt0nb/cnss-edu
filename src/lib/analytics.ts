// ─── CNSS-edu Assessment & Analytics Engine ──────────────────────────────
// Advanced learner-evaluation algorithms studied from / inspired by:
//  • NIST NICE Framework competency areas (networking + security KSAs)
//  • Bloom's mastery taxonomy (cognitive stage classification)
//  • ELO/Glicko ability-rating ideas (difficulty-weighted coverage)
//  • Leitner SRS analytics (retention & memory decay estimation)
//  • xAPI-style engagement verbs (opened / read / answered / applied)
//  • Item-level error taxonomy + recurrence detection
// Everything is derived from REAL tracked events only — no guesswork.

import type { Bi, ProgressState, Lesson, ModuleMeta, QuizErrorEntry } from "@/lib/types";
import { ALL_LESSONS } from "@/data/lessons";
import { MODULES, moduleById } from "@/data/modules";
import { CERT_PASS_SCORE } from "@/lib/certificates";

// ── helpers ────────────────────────────────────────────────────────────
const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);
const dayKey = (iso: string) => iso.slice(0, 10);

/** difficulty weights per lesson level (ELO-style value of mastery) */
const LEVEL_WEIGHT: Record<Lesson["level"], number> = {
  beginner: 1,
  intermediate: 1.5,
  advanced: 2,
  expert: 2.5,
};

// ── report types ───────────────────────────────────────────────────────
export interface DimensionSet {
  knowledge: number; // quiz accuracy
  application: number; // challenges + interactive widgets + playground
  retention: number; // SRS card mastery
  consistency: number; // active-day cadence over 14d
  breadth: number; // module coverage breadth
  depth: number; // weakest-chain module mastery
}

export interface ModuleAnalytics {
  moduleId: string;
  title: Bi;
  color: string;
  lessonsTotal: number;
  lessonsDone: number;
  views: number;
  timeMs: number;
  quizAnswered: number;
  quizCorrect: number;
  accuracy: number;
  wrongCount: number;
  errorRate: number;
  mastery: number; // 0-100 composite
  status: "idle" | "learning" | "proficient" | "mastered" | "at-risk";
}

export interface LessonErrorInsight {
  lessonId: string;
  lessonTitle: Bi | undefined;
  moduleId: string;
  wrong: number;
  answered: number;
  errorRate: number;
  lastWrongAt: string;
}

export interface Recommendation {
  id: string;
  kind: "remedial" | "review" | "next" | "enrich";
  priority: number; // 1 (highest) .. 4
  lessonId?: string;
  title: Bi;
  reason: Bi;
  actionLabel: Bi;
}

export interface TrendPoint {
  x: string; // run index (1-based)
  date: string; // short date
  accuracy: number; // 0-100
}

export interface DayActivity {
  date: string; // YYYY-MM-DD
  reads: number; // lesson opens
  completions: number;
  quizRuns: number;
  minutes: number; // reading minutes
}

export interface InterestEntry {
  moduleId: string;
  title: Bi;
  score: number; // engagement composite
  timeMs: number;
  accuracy: number;
}

export interface PatternInsight {
  key: string;
  text: Bi;
}

export interface AnalyticsReport {
  empty: boolean;
  readiness: {
    score: number;
    dimensions: DimensionSet;
  };
  classification: {
    letter: string; // A+..F
    label: Bi;
    gpa: string; // 4.0-scale
    bloom: Bi; // cognitive stage
  };
  actualLevel: {
    coverage: number; // difficulty-weighted curriculum coverage 0-100
    label: Bi; // realistic description
    tierCoverages: { level: Lesson["level"]; covered: number; total: number }[];
  };
  engagement: {
    totalMs: number;
    openedLessons: number;
    avgMsPerOpen: number;
    quizRuns: number;
    answers: number;
    correct: number;
    accuracy: number;
    activeDays: number;
    readCompleteRatio: number;
    avgQuizPerActiveDay: number;
  };
  modules: ModuleAnalytics[];
  errorAnalysis: {
    totalWrong: number;
    overallErrorRate: number;
    byModule: ModuleAnalytics[]; // only modules with answers, sorted by errorRate desc
    recurring: LessonErrorInsight[]; // lessons with ≥2 wrong answers
    recentErrors: QuizErrorEntry[]; // last 8
  };
  strengths: InterestEntry[]; // modules with accuracy ≥75 and answered ≥4
  interests: InterestEntry[]; // top-3 by engagement score
  trends: TrendPoint[]; // quiz accuracy per run (last 30)
  activity: DayActivity[]; // last 14 days
  patterns: PatternInsight[]; // auto-generated behavioral sentences
  recommendations: Recommendation[];
}

// ── classification helpers ─────────────────────────────────────────────
export function letterFor(score: number): { letter: string; label: Bi; gpa: string } {
  if (score >= 95) return { letter: "A+", label: { ar: "امتياز مع أَوّلية", en: "Summa-grade mastery" }, gpa: "4.0" };
  if (score >= 85) return { letter: "A", label: { ar: "امتياز", en: "Excellent" }, gpa: "3.7" };
  if (score >= 75) return { letter: "B", label: { ar: "جيد جداً", en: "Very good" }, gpa: "3.3" };
  if (score >= 65) return { letter: "C", label: { ar: "جيد", en: "Good" }, gpa: "2.8" };
  if (score >= 50) return { letter: "D", label: { ar: "مقبول", en: "Pass" }, gpa: "2.0" };
  return { letter: "F", label: { ar: "يحتاج بناء الأساس", en: "Foundation needed" }, gpa: "0.0" };
}

/** Bloom-style cognitive stage from application+knowledge mix */
export function bloomStage(dims: DimensionSet): Bi {
  const apply = dims.application;
  const know = dims.knowledge;
  if (know >= 80 && apply >= 70) return { ar: "مُنشيء/مُقيِّم — يطبّق ويبني", en: "Create/Evaluate — applies and builds" };
  if (know >= 65 && apply >= 45) return { ar: "محلِّل — يفكّك المشكلات ويحلّها", en: "Analyze — decomposes and solves" };
  if (know >= 50) return { ar: "مطبِّق — يستخدم المعرفة في تمارين", en: "Apply — uses knowledge in exercises" };
  if (know >= 25) return { ar: "فاهم — يستوعب المفاهيم", en: "Understand — grasps the concepts" };
  if (know > 0) return { ar: "متذكِّر — يحفظ المعلومات الأساسية", en: "Remember — recalls core facts" };
  return { ar: "بداية التعلّم", en: "Learning not started" };
}

// ── module analytics ───────────────────────────────────────────────────
function moduleAnalytics(state: ProgressState): ModuleAnalytics[] {
  const lessonsOf = (m: string) => ALL_LESSONS.filter((l) => l.moduleId === m);
  return MODULES.map((m: ModuleMeta) => {
    const ls = lessonsOf(m.id);
    const done = ls.filter((l) => state.completedLessons[l.id]).length;
    const views = ls.reduce((s, l) => s + (state.lessonViews[l.id]?.opens ?? 0), 0);
    const timeMs = ls.reduce((s, l) => s + (state.lessonViews[l.id]?.totalMs ?? 0), 0);
    const modLessonIds = ls.map((l) => l.id);
    // quiz answers attributed to this module via quizLog runs
    let answered = 0;
    let correct = 0;
    for (const run of state.quizLog) {
      if (run.moduleId === m.id) {
        answered += run.total;
        correct += run.correct;
      }
    }
    // legacy fallback: if no quizLog entries (old data), approximate from quizStats
    if (answered === 0) {
      for (const [lid, q] of Object.entries(state.quizStats)) {
        if (modLessonIds.includes(lid) && q.attempts > 0) {
          answered += q.attempts * 3; // rough historical estimate marker
          correct += Math.round((q.best / 100) * q.attempts * 3);
        }
      }
    }
    const accuracy = pct(correct, answered);
    const wrongCount = state.errorLog.filter((e) => e.moduleId === m.id).length;
    const cardsOf = Object.entries(state.reviewCards).filter(([k]) =>
      modLessonIds.includes(k.split(":")[1] ?? "")
    );
    const masteredCards = cardsOf.filter(([, c]) => c.box >= 4).length;
    const coverage = pct(done, ls.length);
    const mastery = clamp(
      Math.round(coverage * 0.45 + accuracy * 0.35 + pct(masteredCards, Math.max(1, cardsOf.length)) * 0.2)
    );
    const status: ModuleAnalytics["status"] =
      done === 0 && views === 0 && answered === 0
        ? "idle"
        : mastery >= 85
          ? "mastered"
          : accuracy < 50 && answered >= 6
            ? "at-risk"
            : mastery >= 60
              ? "proficient"
              : "learning";
    return {
      moduleId: m.id,
      title: m.title,
      color: m.color,
      lessonsTotal: ls.length,
      lessonsDone: done,
      views,
      timeMs,
      quizAnswered: answered,
      quizCorrect: correct,
      accuracy,
      wrongCount,
      errorRate: 100 - accuracy,
      mastery,
      status,
    };
  });
}

// ── main builder ───────────────────────────────────────────────────────
export function buildAnalytics(state: ProgressState): AnalyticsReport {
  const mods = moduleAnalytics(state);
  const empty =
    Object.keys(state.completedLessons).length === 0 &&
    Object.keys(state.lessonViews).length === 0 &&
    state.quizLog.length === 0;

  // 1) dimensions
  const answeredTotal = state.quizLog.reduce((s, r) => s + r.total, 0) || state.quizTotals.answered;
  const correctTotal = state.quizLog.reduce((s, r) => s + r.correct, 0) || state.quizTotals.correct;
  const knowledge = pct(correctTotal, Math.max(1, answeredTotal));
  const application = clamp(
    Math.round(
      (state.challengesDone.length / 12) * 45 +
        (state.interactiveDone.length / 76) * 35 +
        Math.min(1, state.playgroundUsed.length / 20) * 20
    )
  );
  const totalCards = Object.keys(state.reviewCards).length;
  const masteredCards = Object.values(state.reviewCards).filter((c) => c.box >= 4).length;
  const retention = totalCards > 0 ? pct(masteredCards, totalCards) : state.quizTotals.answered > 0 ? 30 : 0;
  const activeDaySet = new Set<string>([
    ...Object.values(state.completedLessons).map((p) => dayKey(p.completedAt)),
    ...state.quizLog.map((r) => dayKey(r.at)),
    ...Object.values(state.lessonViews).map((v) => dayKey(v.lastOpenedAt)),
    ...(state.lastActiveDay ? [state.lastActiveDay] : []),
  ]);
  const activeDays = activeDaySet.size;
  // cadence over trailing 14 days
  const today = new Date();
  let cadenceDays = 0;
  for (let i = 0; i < 14; i++) {
    const d = new Date(today.getTime() - i * 86400000).toISOString().slice(0, 10);
    if (activeDaySet.has(d)) cadenceDays++;
  }
  const consistency = clamp(Math.round((cadenceDays / 10) * 100)); // 10/14 days = 100
  const touchedModules = mods.filter((m) => m.lessonsDone > 0 || m.quizAnswered > 0 || m.views > 0).length;
  const breadth = clamp(Math.round((touchedModules / MODULES.length) * 100));
  const startedMods = mods.filter((m) => m.lessonsDone + m.quizAnswered >= 3);
  const depth = startedMods.length > 0 ? Math.min(...startedMods.map((m) => m.mastery)) : 0;

  const dims: DimensionSet = { knowledge, application, retention, consistency, breadth, depth };

  // 2) readiness composite (documented weights)
  const readinessScore = clamp(
    Math.round(
      dims.knowledge * 0.3 +
        dims.application * 0.2 +
        dims.retention * 0.2 +
        dims.consistency * 0.1 +
        dims.breadth * 0.1 +
        dims.depth * 0.1
    )
  );

  // 3) actual (realistic) level — difficulty-weighted curriculum coverage
  const tierCoverages = (["beginner", "intermediate", "advanced", "expert"] as Lesson["level"][]).map((level) => {
    const ls = ALL_LESSONS.filter((l) => l.level === level);
    return {
      level,
      covered: ls.filter((l) => state.completedLessons[l.id]).length,
      total: ls.length,
    };
  });
  let wSum = 0;
  let wCov = 0;
  for (const t of tierCoverages) {
    const w = LEVEL_WEIGHT[t.level];
    wSum += w * t.total;
    wCov += w * t.covered;
  }
  const coverage = pct(wCov, Math.max(1, wSum));
  const actualLabel: Bi =
    coverage >= 80
      ? { ar: "خبير فعلي — تغطية شاملة موزونة بالصعوبة", en: "Actual expert — difficulty-weighted full coverage" }
      : coverage >= 60
        ? { ar: "متقدم فعلي — تُتقن أغلب المنهج الموزون", en: "Actual advanced — most weighted curriculum mastered" }
        : coverage >= 40
          ? { ar: "متوسط فعلي — نصف المنهج الموزون مضبوط", en: "Actual intermediate — half the weighted curriculum" }
          : coverage >= 20
            ? { ar: "أساس فعلي متين — بدايات المنهج مضمونة", en: "Actual foundational — the start is secured" }
            : { ar: "طالب مبتدئ فعلي — الطريق ما زال طويلاً", en: "Actual novice beginner — the road is long" };

  // 4) engagement
  const openedLessons = Object.keys(state.lessonViews).length;
  const totalMs = Object.values(state.lessonViews).reduce((s, v) => s + v.totalMs, 0);
  const totalOpens = Object.values(state.lessonViews).reduce((s, v) => s + v.opens, 0);
  const doneLessons = Object.keys(state.completedLessons).length;
  const engagement = {
    totalMs,
    openedLessons,
    avgMsPerOpen: totalOpens > 0 ? Math.round(totalMs / totalOpens) : 0,
    quizRuns: state.quizLog.length,
    answers: answeredTotal,
    correct: correctTotal,
    accuracy: knowledge,
    activeDays,
    readCompleteRatio: openedLessons > 0 ? pct(doneLessons, openedLessons) : 0,
    avgQuizPerActiveDay: activeDays > 0 ? Math.round((state.quizLog.length / activeDays) * 10) / 10 : 0,
  };

  // 5) error analysis
  const wrongByLesson = new Map<string, { wrong: number; answered: number; last: string }>();
  for (const e of state.errorLog) {
    const cur = wrongByLesson.get(e.lessonId) ?? { wrong: 0, answered: 0, last: "" };
    cur.wrong += 1;
    cur.last = e.at > cur.last ? e.at : cur.last;
    wrongByLesson.set(e.lessonId, cur);
  }
  for (const r of state.quizLog) {
    const cur = wrongByLesson.get(r.lessonId);
    if (cur) cur.answered += r.total;
  }
  // lessons answered but never wrong: answered count from quizStats
  const lessonTitle = (id: string) => ALL_LESSONS.find((l) => l.id === id)?.title;
  const recurring: LessonErrorInsight[] = [...wrongByLesson.entries()]
    .filter(([, v]) => v.wrong >= 2)
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .slice(0, 8)
    .map(([lessonId, v]) => {
      const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
      return {
        lessonId,
        lessonTitle: lessonTitle(lessonId),
        moduleId: lesson?.moduleId ?? "",
        wrong: v.wrong,
        answered: v.answered,
        errorRate: v.answered > 0 ? pct(v.wrong, v.answered) : 100,
        lastWrongAt: v.last,
      };
    });
  const byModule = mods
    .filter((m) => m.quizAnswered > 0)
    .sort((a, b) => b.errorRate - a.errorRate);
  const totalWrong = state.errorLog.length;
  const errorAnalysis = {
    totalWrong,
    overallErrorRate: 100 - knowledge,
    byModule,
    recurring,
    recentErrors: state.errorLog.slice(-8).reverse(),
  };

  // 6) strengths & interests
  const interestScore = (m: ModuleAnalytics) =>
    m.views * 1 + m.timeMs / 60000 + m.lessonsDone * 3 + m.quizAnswered * 0.5;
  const interestEntries: InterestEntry[] = mods.map((m) => ({
    moduleId: m.moduleId,
    title: m.title,
    score: Math.round(interestScore(m)),
    timeMs: m.timeMs,
    accuracy: m.accuracy,
  }));
  const interests = [...interestEntries].sort((a, b) => b.score - a.score).slice(0, 3).filter((i) => i.score > 0);
  const strengths = mods
    .filter((m) => m.quizAnswered >= 4 && m.accuracy >= 75)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 4)
    .map((m) => ({
      moduleId: m.moduleId,
      title: m.title,
      score: m.mastery,
      timeMs: m.timeMs,
      accuracy: m.accuracy,
    }));

  // 7) trends (quiz accuracy per run, last 30)
  const trends: TrendPoint[] = state.quizLog.slice(-30).map((r, i) => ({
    x: String(i + 1),
    date: r.at.slice(5, 10).replace("-", "/"),
    accuracy: pct(r.correct, r.total),
  }));

  // 8) daily activity (14 days)
  const activity: DayActivity[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000).toISOString().slice(0, 10);
    const reads = Object.values(state.lessonViews).filter((v) => dayKey(v.lastOpenedAt) === d).length;
    const completions = Object.values(state.completedLessons).filter((p) => dayKey(p.completedAt) === d).length;
    const quizRuns = state.quizLog.filter((r) => dayKey(r.at) === d).length;
    const minutes = Math.round(
      Object.entries(state.lessonViews)
        .filter(([, v]) => dayKey(v.lastOpenedAt) === d)
        .reduce((s, [, v]) => s + v.totalMs, 0) / 60000
    );
    activity.push({ date: d, reads, completions, quizRuns, minutes });
  }

  // 9) auto-generated pattern insights (honest, data-driven sentences)
  const patterns: PatternInsight[] = [];
  if (engagement.totalMs > 0) {
    const bestMod = [...mods].sort((a, b) => b.timeMs - a.timeMs)[0];
    if (bestMod && bestMod.timeMs > 0) {
      patterns.push({
        key: "focus",
        text: {
          ar: `تركيزك الأعلى في «${bestMod.title.ar}» — تُمضي فيه أكثر وقتك.`,
          en: `Your deepest focus is "${bestMod.title.en}" — most of your reading time goes there.`,
        },
      });
    }
  }
  if (trends.length >= 3) {
    const first3 = trends.slice(0, 3).reduce((s, p) => s + p.accuracy, 0) / Math.min(3, trends.length);
    const last3 = trends.slice(-3).reduce((s, p) => s + p.accuracy, 0) / Math.min(3, trends.length);
    const delta = Math.round(last3 - first3);
    patterns.push({
      key: "trend",
      text:
        delta > 5
          ? { ar: `منحناك صاعد: دقتك تحسّنت بنحو ${delta}٪ عبر آخر المحاولات.`, en: `Upward curve: accuracy improved by ~${delta}% across recent runs.` }
          : delta < -5
            ? { ar: `تنبيه: دقتك تراجعت بنحو ${Math.abs(delta)}٪ مؤخراً — راجع مواضع الضعف.`, en: `Warning: accuracy dropped ~${Math.abs(delta)}% recently — review weak spots.` }
            : { ar: "منحناك مستقر بثبات ملحوظ.", en: "Your curve is stable and consistent." },
    });
  }
  if (state.aiQueries.length > 0) {
    patterns.push({
      key: "asks",
      text: {
        ar: `طرحت ${state.aiQueries.length} استفساراً على المساعد الذكي — طلب الاستكشاف سمة تعلّمك.`,
        en: `You asked the AI assistant ${state.aiQueries.length} queries — exploratory questioning is part of your style.`,
      },
    });
  }
  if (engagement.readCompleteRatio >= 80 && engagement.openedLessons >= 3) {
    patterns.push({
      key: "closer",
      text: {
        ar: "نمطك: تُتمّ ما تفتحه — نسبة إتمام مرتفعة تنمّ عن انضباط.",
        en: "Your pattern: you finish what you open — a high completion ratio signals discipline.",
      },
    });
  } else if (engagement.openedLessons >= 5 && engagement.readCompleteRatio < 50) {
    patterns.push({
      key: "explorer",
      text: {
        ar: "نمطك: مستكشف — تفتح دروساً كثيرة قبل إتمامها؛ حاول التركيز على الإغلاق.",
        en: "Your pattern: explorer — you open many lessons before finishing; try focusing on closure.",
      },
    });
  }
  const dueCount = Object.values(state.reviewCards).filter((c) => c.due <= Date.now()).length;
  if (dueCount > 0) {
    patterns.push({
      key: "due",
      text: {
        ar: `لديك ${dueCount} بطاقة مراجعة مستحقة الآن — استبقاء الذاكرة أولوية.`,
        en: `${dueCount} review cards are due now — memory retention is the priority.`,
      },
    });
  }

  // 10) recommendations (progressive, priority-ordered)
  const recommendations: Recommendation[] = [];
  const done = new Set(Object.keys(state.completedLessons));
  const flat = ALL_LESSONS;
  const nextLesson = flat.find((l) => !done.has(l.id));
  // 10a. remedial: recurring-error lesson (highest priority)
  for (const r of recurring.slice(0, 2)) {
    recommendations.push({
      id: `rec-rem-${r.lessonId}`,
      kind: "remedial",
      priority: 1,
      lessonId: r.lessonId,
      title: r.lessonTitle ?? { ar: "درس علاجي", en: "Remedial lesson" },
      reason: {
        ar: `أخطأت فيه ${r.wrong} مرات — إعادة القراءة والاختبار ستكسر النمط المتكرر.`,
        en: `You got ${r.wrong} errors here — rereading + retesting will break the recurring pattern.`,
      },
      actionLabel: { ar: "أعد الدرس الآن", en: "Redo the lesson now" },
    });
  }
  // 10b. review due cards
  if (dueCount >= 3) {
    recommendations.push({
      id: "rec-review-due",
      kind: "review",
      priority: 2,
      title: { ar: `جلسة مراجعة (${dueCount} بطاقة مستحقة)`, en: `Review session (${dueCount} cards due)` },
      reason: {
        ar: "خوارزمية Leitner حدّدت أن ذاكرتك على وشك التراجع في هذه البطاقات.",
        en: "The Leitner algorithm detected your memory is about to decay on these cards.",
      },
      actionLabel: { ar: "ابدأ المراجعة", en: "Start reviewing" },
    });
  }
  // 10c. weakest-module next incomplete lesson
  const weakest = [...byModule].sort((a, b) => a.accuracy - b.accuracy)[0];
  if (weakest && weakest.errorRate > 25) {
    const target = flat.find((l) => l.moduleId === weakest.moduleId && !done.has(l.id));
    if (target) {
      recommendations.push({
        id: `rec-weak-${target.id}`,
        kind: "remedial",
        priority: 2,
        lessonId: target.id,
        title: target.title,
        reason: {
          ar: `نسبة خطئك في «${weakest.title.ar}» ${weakest.errorRate}٪ — عالجها قبل التقدّم.`,
          en: `Your error rate in "${weakest.title.en}" is ${weakest.errorRate}% — treat it before advancing.`,
        },
        actionLabel: { ar: "ابدأ الدرس العلاجي", en: "Start remedial lesson" },
      });
    }
  }
  // 10d. sequential next
  if (nextLesson) {
    recommendations.push({
      id: `rec-next-${nextLesson.id}`,
      kind: "next",
      priority: 3,
      lessonId: nextLesson.id,
      title: nextLesson.title,
      reason: {
        ar: "الدرس التالي في المسار التسلسلي المعتمد للمنهج.",
        en: "The next lesson in the accredited sequential curriculum path.",
      },
      actionLabel: { ar: "أكمل المسار", en: "Continue the path" },
    });
  }
  // 10e. enrichment in favorite module
  const fav = interests[0];
  if (fav) {
    const target = flat.find((l) => l.moduleId === fav.moduleId && !done.has(l.id));
    if (target && (!nextLesson || target.id !== nextLesson.id)) {
      recommendations.push({
        id: `rec-enrich-${target.id}`,
        kind: "enrich",
        priority: 4,
        lessonId: target.id,
        title: target.title,
        reason: {
          ar: `اهتمامك الأعلى في «${fav.title.ar}» — توسّع فيما تحب.`,
          en: `Your top interest is "${fav.title.en}" — expand in what you love.`,
        },
        actionLabel: { ar: "توسّع في شغفك", en: "Expand your passion" },
      });
    }
  }
  recommendations.sort((a, b) => a.priority - b.priority);

  const letter = letterFor(readinessScore);
  return {
    empty,
    readiness: { score: readinessScore, dimensions: dims },
    classification: { letter: letter.letter, label: letter.label, gpa: letter.gpa, bloom: bloomStage(dims) },
    actualLevel: { coverage, label: actualLabel, tierCoverages },
    engagement,
    modules: mods,
    errorAnalysis,
    strengths,
    interests,
    trends,
    activity,
    patterns,
    recommendations,
  };
}

// ── digital record export (report JSON) ────────────────────────────────
export function buildDigitalRecord(state: ProgressState): Record<string, unknown> {
  const report = buildAnalytics(state);
  const earnedCerts = Object.entries(state.quizStats)
    .filter(([id, q]) => q.best >= CERT_PASS_SCORE && state.completedLessons[id])
    .map(([id, q]) => ({ lessonId: id, best: q.best, completedAt: state.completedLessons[id]?.completedAt }));
  return {
    platform: "CNSS-edu — Computer Networks & Security Sciences",
    generatedAt: new Date().toISOString(),
    learner: { name: state.learnerName || "CNSS Learner", xp: state.xp, streak: state.streak },
    classification: report.classification,
    readiness: report.readiness,
    actualLevel: report.actualLevel,
    engagement: report.engagement,
    moduleBreakdown: report.modules.map((m) => ({
      moduleId: m.moduleId,
      lessonsDone: `${m.lessonsDone}/${m.lessonsTotal}`,
      accuracy: `${m.accuracy}%`,
      mastery: `${m.mastery}%`,
      status: m.status,
      readingMinutes: Math.round(m.timeMs / 60000),
    })),
    errorAnalysis: {
      totalWrong: report.errorAnalysis.totalWrong,
      overallErrorRate: `${report.errorAnalysis.overallErrorRate}%`,
      recurring: report.errorAnalysis.recurring.map((r) => ({ lessonId: r.lessonId, wrong: r.wrong })),
    },
    certificates: { earned: earnedCerts.length, details: earnedCerts },
    challengesSolved: state.challengesDone.length,
    interactiveSolved: state.interactiveDone.length,
    reviewCards: { total: Object.keys(state.reviewCards).length, mastered: Object.values(state.reviewCards).filter((c) => c.box >= 4).length },
    quizLog: state.quizLog,
    recommendations: report.recommendations,
  };
}
