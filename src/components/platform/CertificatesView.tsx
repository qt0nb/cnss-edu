"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Lock,
  PenLine,
  Printer,
  X,
} from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress, learnerLevel, levelTitle } from "@/lib/store";
import { MODULES } from "@/data/modules";
import { lessonById, lessonsByModule, TOTAL_LESSONS } from "@/data/lessons";
import {
  CERT_PASS_SCORE,
  certDate,
  certificateRecords,
  certificateStatus,
  gradeLabel,
  type CertificateRecord,
} from "@/lib/certificates";
import type { Lesson, ModuleMeta } from "@/lib/types";

/* ═══════════════════════ certificate palette (paper doc) ═══════════════════ */
const GOLD = "#d4a017";
const GOLD_DK = "#a1741a";
const EM = "#059669";
const EM_DK = "#065f46";
const PAPER = "#fefdf9";

/* inline type scale — cqw so the whole doc scales with its own width,
   with pixel floors so mobile stays readable */
const FS = {
  micro: "max(0.95cqw, 8px)",
  small: "max(1.2cqw, 10px)",
  base: "max(1.45cqw, 11.5px)",
  mid: "max(1.75cqw, 13px)",
  big: "max(2.7cqw, 17px)",
  head: "max(3.3cqw, 21px)",
  name: "max(4.6cqw, 25px)",
};

/* print rules — rendered only while the modal is mounted: everything hides
   except the certificate doc, which fills one landscape page on white */
const PRINT_CSS = `
@media print {
  html, body { background: #ffffff !important; }
  body * { visibility: hidden !important; }
  .cert-print-root, .cert-print-root * { visibility: visible !important; }
  .no-print { display: none !important; }
  .cert-print-root {
    position: fixed !important;
    inset: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }
  .cert-doc {
    transform: none !important;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    min-height: 0 !important;
    aspect-ratio: auto !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
  }
  .cert-doc, .cert-doc * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  /* gradient text can drop in some print pipelines — solid deep emerald */
  .cert-name {
    background: none !important;
    color: ${EM_DK} !important;
    -webkit-text-fill-color: ${EM_DK} !important;
  }
  @page { size: landscape; margin: 8mm; }
}`;

/* ── deep-link relay ─────────────────────────────────────────────────────
 * Other views call go("certificates", { lesson: id }). On a cross-view jump
 * nav.syncFromHash can clear params a tick later — possibly before this
 * lazily-imported view mounts. Capture the id at store level so it survives
 * until mount; same-view jumps are handled by the live params effect. */
const deepLinkQueue: string[] = [];
if (typeof window !== "undefined") {
  useNav.subscribe((state, prev) => {
    const id = state.params?.lesson ?? state.params?.lessonId;
    const prevId = prev.params?.lesson ?? prev.params?.lessonId;
    if (id && id !== prevId && state.view !== "certificates") deepLinkQueue.push(id);
  });
}

const GRADE_SEV: Record<string, string> = { pass: "chip-sev-info", merit: "chip-sev-ok", distinction: "chip-sev-ok" };
const GRADE_GLYPH: Record<string, string> = { pass: "", merit: "✦ ", distinction: "★ " };

/* ornamental frame helpers (physical corners — the frame is symmetric, so it
   does not need to mirror in RTL) */
const CORNER_MARKS: {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  sides: { t?: boolean; b?: boolean; l?: boolean; r?: boolean };
}[] = [
  { top: "2cqw", left: "2cqw", sides: { t: true, l: true } },
  { top: "2cqw", right: "2cqw", sides: { t: true, r: true } },
  { bottom: "2cqw", left: "2cqw", sides: { b: true, l: true } },
  { bottom: "2cqw", right: "2cqw", sides: { b: true, r: true } },
];

const DIAMOND_MARKS: { top?: string; bottom?: string; left?: string; right?: string; transform: string }[] = [
  { top: "1.28cqw", left: "50%", transform: "translateX(-50%)" },
  { bottom: "1.28cqw", left: "50%", transform: "translateX(-50%)" },
  { left: "1.28cqw", top: "50%", transform: "translateY(-50%)" },
  { right: "1.28cqw", top: "50%", transform: "translateY(-50%)" },
];

/* ═══════════════════════ small inline brand mark ═══════════════════ */
function CertMark({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 512 512" style={style} aria-hidden="true">
      <path
        d="M256 106 L385.9 181 L385.9 331 L256 406 L126.1 331 L126.1 181 Z"
        fill="none"
        stroke={EM}
        strokeWidth="26"
        strokeLinejoin="round"
      />
      <g stroke={EM} strokeOpacity="0.55" strokeWidth="12" strokeLinecap="round">
        <path d="M256 256 L256 106" />
        <path d="M256 256 L385.9 181" />
        <path d="M256 256 L385.9 331" />
        <path d="M256 256 L256 406" />
        <path d="M256 256 L126.1 331" />
        <path d="M256 256 L126.1 181" />
      </g>
      <g fill={PAPER} stroke={EM} strokeWidth="14">
        <circle cx="256" cy="106" r="26" />
        <circle cx="385.9" cy="181" r="26" />
        <circle cx="385.9" cy="331" r="26" />
        <circle cx="256" cy="406" r="26" />
        <circle cx="126.1" cy="331" r="26" />
        <circle cx="126.1" cy="181" r="26" />
      </g>
      <circle cx="256" cy="256" r="56" fill={EM} />
      <path
        d="M232 240 L254 258 L232 276 M262 272 H286"
        stroke={PAPER}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ═══════════════════════ academic seal ═══════════════════ */
function CertSeal({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 120" style={style} aria-hidden="true">
      <defs>
        <path
          id="cert-seal-arc"
          d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0"
          fill="none"
        />
      </defs>
      <circle cx="60" cy="60" r="57.5" fill="none" stroke={GOLD} strokeWidth="2.4" />
      <circle cx="60" cy="60" r="51" fill="#f4fdf8" stroke={EM} strokeWidth="0.8" />
      <circle cx="60" cy="60" r="45" fill="none" stroke={GOLD} strokeWidth="0.7" strokeDasharray="2 2.6" />
      <text
        fontSize="6.6"
        fill={GOLD_DK}
        fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
        letterSpacing="1.5"
      >
        <textPath href="#cert-seal-arc" startOffset="6">
          CNSS-EDU · NETWORK SCIENCE ACADEMY ·
        </textPath>
      </text>
      {/* hex network core */}
      <g stroke={EM} strokeWidth="1.5" fill="none">
        <path d="M60 43 L74.5 51.5 L74.5 68.5 L60 77 L45.5 68.5 L45.5 51.5 Z" />
      </g>
      <g stroke={EM} strokeWidth="0.9" strokeOpacity="0.7">
        <path d="M60 60 L60 43 M60 60 L74.5 51.5 M60 60 L74.5 68.5 M60 60 L60 77 M60 60 L45.5 68.5 M60 60 L45.5 51.5" />
      </g>
      <g fill={EM}>
        <circle cx="60" cy="43" r="2.6" />
        <circle cx="74.5" cy="51.5" r="2.6" />
        <circle cx="74.5" cy="68.5" r="2.6" />
        <circle cx="60" cy="77" r="2.6" />
        <circle cx="45.5" cy="68.5" r="2.6" />
        <circle cx="45.5" cy="51.5" r="2.6" />
      </g>
      <circle cx="60" cy="60" r="8" fill={EM} />
      <path
        d="M57.6 58.4 L59.7 60.5 L57.6 62.6 M61.2 62.4 H63.8"
        stroke="#f4fdf8"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ═══════════════════════ the certificate document ═══════════════════ */
function CertificateDoc({
  record,
  lesson,
  mod,
  learnerName,
  level,
  levelText,
  copied,
  onCopyId,
}: {
  record: CertificateRecord;
  lesson: Lesson;
  mod: ModuleMeta;
  learnerName: string;
  level: number;
  levelText: string;
  copied: boolean;
  onCopyId: () => void;
}) {
  const { lang, t, bi, dir } = useLang();
  const isAr = lang === "ar";
  const gold = record.grade !== "pass";
  const gradeCol = gold ? GOLD_DK : EM_DK;
  const name = learnerName || (isAr ? "متعلّم CNSS-edu" : "CNSS-edu Learner");

  return (
    <motion.div
      dir={dir}
      className="cert-doc relative mx-auto w-full select-text overflow-hidden rounded-md shadow-2xl sm:aspect-[1.414/1]"
      style={{ containerType: "inline-size", background: PAPER, color: "#3f3f46" }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
    >
      {/* subtle hex-mesh paper pattern */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="cert-hexnet" width="52" height="45" patternUnits="userSpaceOnUse">
            <path
              d="M26 8 L41 16.5 L41 33.5 L26 42 L11 33.5 L11 16.5 Z"
              fill="none"
              stroke={EM}
              strokeOpacity="0.06"
              strokeWidth="1"
            />
            <path d="M26 8 L41 16.5 M41 33.5 L26 42 M11 33.5 L26 8" stroke={EM} strokeOpacity="0.045" strokeWidth="0.8" fill="none" />
            <circle cx="26" cy="8" r="1.3" fill={GOLD} fillOpacity="0.2" />
            <circle cx="41" cy="33.5" r="1.1" fill={EM} fillOpacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cert-hexnet)" />
      </svg>

      {/* double ornamental border: gold outer + emerald inner */}
      <div className="pointer-events-none absolute rounded-[3px]" style={{ inset: "1.1cqw", border: `1px solid ${GOLD}cc` }} />
      <div className="pointer-events-none absolute rounded-[2px]" style={{ inset: "2cqw", border: `max(1.5px, 0.16cqw) solid ${EM}b8` }} />

      {/* gold corner flourishes on the inner frame */}
      {CORNER_MARKS.map((c, i) => (
        <span
          key={i}
          className="pointer-events-none absolute"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            width: "max(2.5cqw, 12px)",
            height: "max(2.5cqw, 12px)",
            borderColor: GOLD,
            borderStyle: "solid",
            borderTopWidth: c.sides.t ? "max(2px, 0.2cqw)" : 0,
            borderBottomWidth: c.sides.b ? "max(2px, 0.2cqw)" : 0,
            borderLeftWidth: c.sides.l ? "max(2px, 0.2cqw)" : 0,
            borderRightWidth: c.sides.r ? "max(2px, 0.2cqw)" : 0,
          }}
        />
      ))}
      {/* gold diamonds at frame midpoints */}
      {DIAMOND_MARKS.map((d, i) => (
        <span
          key={i}
          className="pointer-events-none absolute"
          style={{
            ...d,
            width: "max(0.75cqw, 5px)",
            height: "max(0.75cqw, 5px)",
            background: GOLD,
            transform: `${d.transform} rotate(45deg)`,
          }}
        />
      ))}

      {/* content */}
      <div
        className="relative flex h-full w-full flex-col justify-between text-center"
        style={{ padding: "max(4.6cqw, 18px) max(5.6cqw, 22px)", gap: "max(1.5cqw, 8px)" }}
      >
        {/* meta row: brand + serial */}
        <div className="flex items-start justify-between" style={{ gap: "1.4cqw" }}>
          <div className="flex items-center" style={{ gap: "1.1cqw" }}>
            <CertMark style={{ width: "max(5.4cqw, 30px)", height: "max(5.4cqw, 30px)", flex: "none" }} />
            <div className="text-start" style={{ lineHeight: 1.25 }}>
              <div
                className="font-mono font-extrabold"
                dir="ltr"
                style={{ fontSize: FS.small, letterSpacing: "0.16em", color: EM_DK }}
              >
                CNSS-EDU
              </div>
              <div style={{ fontSize: FS.micro, color: "#71717a" }}>
                {isAr ? "أكاديمية علوم الشبكات" : "Network Science Academy"}
              </div>
            </div>
          </div>
          <div className="font-mono" dir="ltr" style={{ fontSize: FS.micro, color: "#71717a", letterSpacing: "0.05em" }}>
            № {record.vid}
          </div>
        </div>

        {/* title block */}
        <div className="flex flex-col items-center" style={{ gap: "max(0.4cqw, 3px)" }}>
          <div className="font-serif font-bold leading-tight" style={{ fontSize: FS.head, color: EM_DK }}>
            {isAr ? "شهادة إتمام" : "Certificate of Completion"}
          </div>
          <div
            className="font-serif font-semibold"
            style={{ fontSize: FS.mid, letterSpacing: "0.28em", color: GOLD_DK }}
          >
            {isAr ? "CERTIFICATE OF COMPLETION" : "SHAHĀDAT ITMĀM"}
          </div>
          <div className="flex items-center" style={{ gap: "0.8cqw", width: "min(46%, 220px)", marginTop: "0.3cqw" }} aria-hidden="true">
            <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}99)` }} />
            <span style={{ width: "max(0.65cqw, 5px)", height: "max(0.65cqw, 5px)", background: GOLD }} />
            <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}99, transparent)` }} />
          </div>
        </div>

        {/* award block: issued-to + name + lesson */}
        <div className="flex flex-col items-center" style={{ gap: "max(0.3cqw, 3px)" }}>
          <div style={{ fontSize: FS.small, color: "#71717a", letterSpacing: "0.06em" }}>{t("certIssuedTo")}</div>
          <div
            className="cert-name break-words font-serif font-bold leading-tight bg-clip-text text-transparent"
            style={{ fontSize: FS.name, backgroundImage: "linear-gradient(100deg, #065f46, #0d9488 45%, #a1741a)" }}
          >
            {name}
          </div>
          <span
            aria-hidden="true"
            style={{
              height: "max(0.13cqw, 1.5px)",
              width: "min(30cqw, 62%)",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
          />
          <div style={{ fontSize: FS.base, color: "#52525b", marginTop: "0.25cqw" }}>{t("certForCompleting")}</div>
          <div className="font-mono font-bold" dir="ltr" style={{ fontSize: FS.mid, color: EM_DK }}>
            {lesson.title.en}
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "0.7cqw", marginTop: "0.2cqw" }}>
            <span className="font-serif italic" style={{ fontSize: FS.small, color: "#52525b" }}>
              {bi(mod.title)}
            </span>
            <span
              aria-hidden="true"
              style={{ width: "max(0.3cqw, 3px)", height: "max(0.3cqw, 3px)", background: GOLD, borderRadius: 999 }}
            />
            <span
              className="inline-flex items-center rounded-full border"
              style={{
                fontSize: FS.micro,
                padding: "0.22cqw 0.9cqw",
                borderColor: `${EM}66`,
                color: EM_DK,
                background: `${EM}0f`,
              }}
            >
              L{level} · {levelText}
            </span>
          </div>
        </div>

        {/* stats row: score / grade / date */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "max(1.6cqw, 10px)", rowGap: "max(1cqw, 8px)" }}
        >
          <div className="flex min-w-[16%] flex-col items-center" style={{ gap: "0.2cqw" }}>
            <span style={{ fontSize: FS.micro, color: "#71717a", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {t("certScore")}
            </span>
            <span dir="ltr" className="font-serif font-bold leading-none" style={{ fontSize: FS.big, color: EM_DK }}>
              {record.score}%
              <span style={{ fontSize: FS.small, color: "#a1a1aa", fontWeight: 600 }}> /100</span>
            </span>
          </div>
          <span aria-hidden="true" className="hidden self-stretch w-px sm:block" style={{ background: "#d4d4d866", minHeight: "max(2.6cqw, 22px)" }} />
          <div className="flex min-w-[24%] flex-col items-center" style={{ gap: "0.25cqw" }}>
            <span style={{ fontSize: FS.micro, color: "#71717a", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {t("certGrade")}
            </span>
            <span
              className="inline-flex flex-col items-center rounded-md border"
              style={{
                borderColor: gold ? `${GOLD}99` : `${EM}80`,
                background: gold ? `${GOLD}1a` : `${EM}12`,
                borderWidth: "max(1.5px, 0.13cqw)",
                padding: "0.35cqw 1.3cqw",
              }}
            >
              <span className="font-serif font-bold leading-tight" style={{ fontSize: FS.mid, color: gradeCol }}>
                {GRADE_GLYPH[record.grade]}
                {gradeLabel(record.grade)[lang]}
              </span>
              <span style={{ fontSize: FS.micro, color: "#71717a", letterSpacing: "0.1em" }}>
                {gradeLabel(record.grade)[isAr ? "en" : "ar"]}
              </span>
            </span>
          </div>
          <span aria-hidden="true" className="hidden self-stretch w-px sm:block" style={{ background: "#d4d4d866", minHeight: "max(2.6cqw, 22px)" }} />
          <div className="flex min-w-[18%] flex-col items-center" style={{ gap: "0.2cqw" }}>
            <span style={{ fontSize: FS.micro, color: "#71717a", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {t("certDate")}
            </span>
            <span className="font-serif font-semibold leading-tight" style={{ fontSize: FS.base, color: "#3f3f46" }}>
              {certDate(record.dateISO, lang)}
            </span>
          </div>
        </div>

        {/* footer: seal / verification / signature */}
        <div className="flex flex-wrap items-end justify-between" style={{ gap: "max(1.4cqw, 10px)" }}>
          <CertSeal style={{ width: "max(9.5cqw, 62px)", height: "max(9.5cqw, 62px)", flex: "none" }} />
          <div className="flex flex-col items-center" style={{ gap: "0.22cqw" }}>
            <div className="flex flex-wrap items-center justify-center" style={{ gap: "0.6cqw" }}>
              <span style={{ fontSize: FS.micro, color: "#71717a" }}>{t("certId")}</span>
              <span
                className="font-mono font-bold"
                dir="ltr"
                style={{ fontSize: FS.small, color: EM_DK, letterSpacing: "0.04em" }}
              >
                {record.vid}
              </span>
              <button
                onClick={onCopyId}
                className="no-print inline-grid size-9 place-items-center rounded-md border transition-colors hover:bg-accent/60"
                style={{ borderColor: `${EM}55`, color: EM_DK, background: "transparent" }}
                aria-label={t("certCopyId")}
                title={t("certCopyId")}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-3.5" />}
              </button>
            </div>
            <div style={{ fontSize: FS.micro, color: "#a1a1aa" }}>{t("certVerifyNote")}</div>
          </div>
          <div className="flex flex-col items-center" style={{ gap: "0.25cqw" }}>
            <span aria-hidden="true" style={{ width: "max(14cqw, 104px)", borderTop: "max(1px, 0.09cqw) solid #a1a1aa" }} />
            <span className="font-serif italic" style={{ fontSize: FS.small, color: "#52525b" }}>
              {t("certBoard")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ certificate modal overlay ═══════════════════ */
function CertificateModal({
  record,
  lesson,
  mod,
  learnerName,
  level,
  levelText,
  onClose,
}: {
  record: CertificateRecord;
  lesson: Lesson;
  mod: ModuleMeta;
  learnerName: string;
  level: number;
  levelText: string;
  onClose: () => void;
}) {
  const { lang, t } = useLang();
  const [copied, setCopied] = useState(false);
  const printBtnRef = useRef<HTMLButtonElement | null>(null);

  /* esc to close + body scroll lock */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    printBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const copyId = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(record.vid);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = record.vid;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    toast({ title: ok ? t("certIdCopied") : lang === "ar" ? "فشل النسخ" : "Copy failed" });
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={t("certTitle")}
    >
      {/* print rules live only while the modal is open */}
      <style>{PRINT_CSS}</style>
      <div className="no-print absolute inset-0 bg-black/75 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />
      <button
        onClick={onClose}
        className="no-print absolute end-3 top-3 z-10 grid size-11 place-items-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-colors hover:bg-accent"
        aria-label={t("close")}
      >
        <X className="size-5" />
      </button>
      <div className="relative z-[1] my-auto flex w-full max-w-3xl flex-col items-center gap-3 py-1">
        <div className="cert-print-root w-full">
          <CertificateDoc
            record={record}
            lesson={lesson}
            mod={mod}
            learnerName={learnerName}
            level={level}
            levelText={levelText}
            copied={copied}
            onCopyId={copyId}
          />
        </div>
        <div className="no-print flex flex-wrap items-center justify-center gap-2">
          <Button ref={printBtnRef} className="gap-1.5" onClick={() => window.print()}>
            <Printer className="size-4" />
            {t("certPrint")}
          </Button>
          <Button variant="outline" className="gap-1.5" onClick={copyId}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {t("certCopyId")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ earned card ═══════════════════ */
function EarnedCard({
  record,
  lesson,
  mod,
  i,
  onOpen,
  cardRef,
}: {
  record: CertificateRecord;
  lesson: Lesson;
  mod: ModuleMeta;
  i: number;
  onOpen: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const { lang, t, bi } = useLang();
  const ModIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[mod.icon] ?? Award;
  const distinction = record.grade === "distinction";
  return (
    <div
      ref={cardRef}
      className="hud-panel rise-in relative overflow-hidden rounded-xl"
      style={{ animationDelay: `${Math.min(i * 0.04, 0.32)}s` }}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-transparent" />
      <div className="relative flex h-full items-start gap-3 p-3.5">
        <div
          className="grid size-11 shrink-0 place-items-center rounded-2xl"
          style={{ backgroundColor: `${mod.color}22`, color: mod.color }}
        >
          <Award className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-black" title={bi(lesson.title)}>
            {bi(lesson.title)}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="code-chip">{lesson.id}</span>
            <span className={`chip-sev ${GRADE_SEV[record.grade] ?? "chip-sev-info"} ${distinction ? "text-glow" : ""}`}>
              {gradeLabel(record.grade)[lang]}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <span dir="ltr" className="font-bold text-emerald-600 dark:text-emerald-400">
              {record.score}%
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span dir="ltr">{record.dateISO.slice(0, 10)}</span>
            <span className="dot-leader" />
            <ModIcon className="size-3.5 shrink-0 opacity-50" />
          </div>
          <Button size="sm" className="mt-2.5 h-9 gap-1.5 text-[11px]" onClick={onOpen}>
            <FileText className="size-3.5" />
            {t("certView")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ locked card ═══════════════════ */
function LockedCard({
  lesson,
  lessonDone,
  best,
  highlighted,
  i,
  onGo,
  cardRef,
}: {
  lesson: Lesson;
  lessonDone: boolean;
  best: number;
  highlighted: boolean;
  i: number;
  onGo: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const { lang, t, bi } = useLang();
  const quizOk = best >= CERT_PASS_SCORE;
  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onGo}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onGo();
        }
      }}
      title={lang === "ar" ? "انتقل إلى الدرس" : "Go to lesson"}
      className={`rise-in cursor-pointer rounded-xl border border-dashed p-3.5 text-start outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring hover:-translate-y-px ${
        highlighted
          ? "border-primary/70 bg-primary/5 ring-1 ring-primary/35"
          : "border-border/70 bg-card/45 opacity-75 hover:border-primary/40 hover:bg-accent/30 hover:opacity-100"
      }`}
      style={{ animationDelay: `${Math.min(i * 0.04, 0.32)}s` }}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground/70">
          <Lock className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-black text-muted-foreground" title={bi(lesson.title)}>
            {bi(lesson.title)}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="code-chip">{lesson.id}</span>
            <span className="chip-sev chip-sev-crit opacity-70">{t("certLocked")}</span>
          </div>
        </div>
      </div>
      {/* requirements */}
      <div className="mt-2.5 space-y-1.5 border-t border-dashed border-border/60 pt-2.5">
        <div className="flex items-center gap-2 text-[11px]">
          {lessonDone ? (
            <Check className="size-3.5 shrink-0 text-emerald-500" />
          ) : (
            <X className="size-3.5 shrink-0 text-rose-500/70" />
          )}
          <span className="truncate">{t("certReqLesson")}</span>
          <span className="dot-leader" />
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {quizOk ? (
            <Check className="size-3.5 shrink-0 text-emerald-500" />
          ) : (
            <X className="size-3.5 shrink-0 text-rose-500/70" />
          )}
          <span className="truncate">{t("certReqQuiz")}</span>
          <span className="dot-leader" />
          <span className="shrink-0 font-mono text-[10px] text-muted-foreground" dir="ltr">
            quiz best: {best}%
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70">
        <GraduationCap className="size-3" />
        {lang === "ar" ? "افتح الدرس للمتابعة" : "open lesson to continue"}
      </div>
    </div>
  );
}

/* ═══════════════════════ main view ═══════════════════ */
export default function CertificatesView() {
  const { lang, t, bi } = useLang();
  const params = useNav((s) => s.params);
  const go = useNav((s) => s.go);
  const completedLessons = useProgress((s) => s.completedLessons);
  const quizStats = useProgress((s) => s.quizStats);
  const learnerName = useProgress((s) => s.learnerName);
  const xp = useProgress((s) => s.xp);
  const hydrated = useProgress((s) => s.hydrated);

  const state = useMemo(() => ({ completedLessons, quizStats }), [completedLessons, quizStats]);
  const records = useMemo(() => certificateRecords(state), [state]);
  const recordByLesson = useMemo(() => new Map(records.map((r) => [r.lessonId, r])), [records]);

  const earnedCount = records.length;
  const pct = TOTAL_LESSONS > 0 ? Math.round((earnedCount / TOTAL_LESSONS) * 100) : 0;
  const sev =
    earnedCount === 0 ? "chip-sev-crit" : pct < 25 ? "chip-sev-warn" : pct < 60 ? "chip-sev-info" : "chip-sev-ok";
  const lvl = learnerLevel(xp);
  const lvlText = levelTitle(lvl)[lang];

  const [activeId, setActiveId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const handledRef = useRef<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeRecord = activeId ? (recordByLesson.get(activeId) ?? null) : null;
  const activeLesson = activeRecord ? (lessonById(activeRecord.lessonId) ?? null) : null;

  /* deep-link: ?lesson=l032 → open modal (if earned) or highlight the locked card */
  useEffect(() => {
    if (!hydrated) return;
    const queued = deepLinkQueue.length > 0 ? deepLinkQueue[deepLinkQueue.length - 1] : null;
    if (queued) deepLinkQueue.length = 0;
    const id = queued ?? params?.lesson ?? params?.lessonId ?? null;
    if (!id || handledRef.current === id) return;
    const lesson = lessonById(id);
    if (!lesson) return;
    handledRef.current = id;
    const status = certificateStatus(id, state);
    if (status.earned && status.record) {
      setHighlightId(null);
      setActiveId(id);
    } else {
      setHighlightId(id);
      setTimeout(() => {
        const el = cardRefs.current[id];
        if (el && el.isConnected) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [params, state, hydrated]);

  const openCert = (id: string) => {
    setHighlightId(null);
    setActiveId(id);
  };

  return (
    <div className="space-y-4">
      {/* section header */}
      <div className="rise-in flex flex-wrap items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Award className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("certOf")}</h2>
        <span className="code-chip">cert.vault</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground">
          {earnedCount}/{TOTAL_LESSONS} {t("certEarned")}
        </span>
      </div>
      <p className="rise-in text-[11.5px] leading-5 text-muted-foreground" style={{ animationDelay: "0.03s" }}>
        {t("certDesc")}
      </p>

      {/* overall progress */}
      <div className="hud-panel rise-in rounded-xl p-3.5" style={{ animationDelay: "0.06s" }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`chip-sev shrink-0 ${sev}`} dir="ltr">
            {pct}%
          </span>
          <span className="text-[11px] font-black">{t("certProgress")}</span>
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">
            {earnedCount}/{TOTAL_LESSONS}
          </span>
          <span className="dot-leader" />
          {learnerName ? (
            <span className="max-w-[40%] truncate font-mono text-[10px] text-muted-foreground" title={learnerName}>
              @{learnerName}
            </span>
          ) : (
            <button
              onClick={() => go("settings")}
              className="chip-sev chip-sev-warn inline-flex items-center gap-1 transition-opacity hover:opacity-80"
              title={t("learnerNameLabel")}
            >
              <PenLine className="size-3" />
              {lang === "ar" ? "أضف اسمك" : "set your name"}
            </button>
          )}
        </div>
        <Progress value={pct} className="mt-2.5 h-2" />
        {earnedCount === 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-border/70 bg-muted/25 px-3 py-2.5">
            <Award className="size-4 shrink-0 text-muted-foreground/60" />
            <span className="text-[11px] text-muted-foreground">{t("certEmpty")}</span>
            <span className="dot-leader" />
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-[11px]" onClick={() => go("lessons")}>
              <BookOpen className="size-3.5" />
              {t("lessons")}
            </Button>
          </div>
        )}
      </div>

      {/* 10 module vaults */}
      {MODULES.map((mod, mi) => {
        const lessons = lessonsByModule(mod.id);
        const earnedInModule = lessons.filter((l) => recordByLesson.has(l.id)).length;
        const ModIcon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[mod.icon] ?? Award;
        return (
          <section key={mod.id} className="space-y-2">
            <div
              className="rise-in flex flex-wrap items-center gap-2.5"
              style={{ animationDelay: `${Math.min(0.08 + mi * 0.04, 0.4)}s` }}
            >
              <span
                className="grid size-7 place-items-center rounded-lg border"
                style={{ backgroundColor: `${mod.color}1a`, borderColor: `${mod.color}55`, color: mod.color }}
              >
                <ModIcon className="size-3.5" />
              </span>
              <h3 className="text-xs font-black">{bi(mod.title)}</h3>
              <span className="code-chip">{mod.id}</span>
              <span className="dot-leader" />
              <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">
                {earnedInModule}/{lessons.length}
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {lessons.map((lesson, i) => {
                const record = recordByLesson.get(lesson.id);
                return record ? (
                  <EarnedCard
                    key={lesson.id}
                    record={record}
                    lesson={lesson}
                    mod={mod}
                    i={i}
                    onOpen={() => openCert(lesson.id)}
                    cardRef={(el) => {
                      cardRefs.current[lesson.id] = el;
                    }}
                  />
                ) : (
                  <LockedCard
                    key={lesson.id}
                    lesson={lesson}
                    lessonDone={Boolean(completedLessons[lesson.id])}
                    best={quizStats[lesson.id]?.best ?? 0}
                    highlighted={highlightId === lesson.id}
                    i={i}
                    onGo={() => go("lessons", { lessonId: lesson.id })}
                    cardRef={(el) => {
                      cardRefs.current[lesson.id] = el;
                    }}
                  />
                );
              })}
            </div>
          </section>
        );
      })}

      {/* certificate modal */}
      <AnimatePresence>
        {activeRecord && activeLesson && (
          <CertificateModal
            key={activeRecord.lessonId}
            record={activeRecord}
            lesson={activeLesson}
            mod={activeLesson ? MODULES.find((m) => m.id === activeLesson.moduleId) ?? MODULES[0] : MODULES[0]}
            learnerName={learnerName}
            level={lvl}
            levelText={lvlText}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
