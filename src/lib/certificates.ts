// ─── Certificate engine: derivation, grading, verification IDs ─────────
// A lesson certificate is EARNED when:
//   1. completedLessons[lessonId] exists (lesson finished)
//   2. quizStats[lessonId].best >= 80 (serious pass in the lesson quiz)
// Grades: 80-89 PASS · 90-99 WITH MERIT · 100 WITH DISTINCTION

import type { ProgressState, Bi } from "@/lib/types";

export type CertGrade = "pass" | "merit" | "distinction";

export interface CertificateRecord {
  lessonId: string;
  /** best quiz percentage at issue time */
  score: number;
  grade: CertGrade;
  /** lesson completion date (ISO) = issue date */
  dateISO: string;
  /** deterministic verification id, e.g. "CNSS-L032-K7F2-9QD1" */
  vid: string;
}

export const CERT_PASS_SCORE = 80;

export function gradeFor(score: number): CertGrade {
  if (score >= 100) return "distinction";
  if (score >= 90) return "merit";
  return "pass";
}

export const gradeLabel = (g: CertGrade): Bi =>
  g === "distinction"
    ? { ar: "مع مرتبة الامتياز", en: "WITH DISTINCTION" }
    : g === "merit"
      ? { ar: "بمرتبة الشرف", en: "WITH MERIT" }
      : { ar: "مُجتاز", en: "PASS" };

/** FNV-1a 32-bit hash → base36, used for stable verification ids */
function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function b36(n: number, len: number): string {
  return n.toString(36).toUpperCase().padStart(len, "0").slice(-len);
}

/** Deterministic verification id for a lesson certificate */
export function verificationId(lessonId: string, score: number, dateISO: string): string {
  const a = fnv1a(`${lessonId}|${dateISO}`);
  const c = fnv1a(`${lessonId}|${score}|${dateISO}|CNSS`);
  return `CNSS-${lessonId.toUpperCase().padStart(4, "0")}-${b36(a, 4)}-${b36(c, 4)}`;
}

/** All earned certificates, oldest first. */
export function certificateRecords(state: {
  completedLessons: ProgressState["completedLessons"];
  quizStats: ProgressState["quizStats"];
}): CertificateRecord[] {
  const out: CertificateRecord[] = [];
  for (const [lessonId, prog] of Object.entries(state.completedLessons)) {
    const best = state.quizStats[lessonId]?.best ?? 0;
    if (best >= CERT_PASS_SCORE) {
      out.push({
        lessonId,
        score: best,
        grade: gradeFor(best),
        dateISO: prog.completedAt,
        vid: verificationId(lessonId, best, prog.completedAt),
      });
    }
  }
  out.sort((x, y) => x.dateISO.localeCompare(y.dateISO));
  return out;
}

/** Status of one lesson's certificate (for grids / lesson reader teasers). */
export function certificateStatus(
  lessonId: string,
  state: { completedLessons: ProgressState["completedLessons"]; quizStats: ProgressState["quizStats"] }
): { earned: boolean; record?: CertificateRecord; lessonDone: boolean; best: number } {
  const prog = state.completedLessons[lessonId];
  const best = state.quizStats[lessonId]?.best ?? 0;
  const earned = Boolean(prog) && best >= CERT_PASS_SCORE;
  return {
    earned,
    lessonDone: Boolean(prog),
    best,
    record: earned
      ? {
          lessonId,
          score: best,
          grade: gradeFor(best),
          dateISO: prog.completedAt,
          vid: verificationId(lessonId, best, prog.completedAt),
        }
      : undefined,
  };
}

/** Arabic-Indic + Latin date formatting used on certificates */
export function certDate(dateISO: string, lang: "ar" | "en"): string {
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return dateISO;
  try {
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-TN-u-nu-latn" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}
