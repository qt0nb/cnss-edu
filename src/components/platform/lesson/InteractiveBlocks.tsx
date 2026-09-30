"use client";

/* ── (B) Interactive checkpoint engine — 6 widget kinds ────────────────
 * Rendered by the lesson reader right after section `sectionIndex`.
 * One <InteractiveBlock> per LessonInteractive (default export; loaded
 * through next/dynamic from LessonsView).
 *
 * Kinds: order · match · classify · fill · binary · subnet
 * Identity: v3 ops console — hud-panel + terminal chrome strip
 * (term-dots + cnss://checkpoint + kind chip), 44px touch targets,
 * RTL-safe logical utilities, emerald/teal/amber/rose palette only.
 *
 * Solve flow: exercise calls onSolve() → markInteractiveSolved(id, xp)
 * (awards XP once) → celebrate overlay (scale-pulse ✓ + "+xp XP") →
 * collapsed solved row persisted via store.interactiveDone. */

import {
  Fragment, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUpDown, Check, Link2, Network, RotateCcw, ShieldCheck, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import type {
  BinaryWidget, ClassifyWidget, FillWidget, LessonInteractive, MatchWidget,
  OrderWidget, SubnetWidget,
} from "@/lib/types";

/** solid dark base layered under term-window chrome (readable in light + dark mode) */
const TERM_BG = "#09090b";

/** MSB→LSB place values for the 8 binary bit buttons */
const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];

/* ── helpers ──────────────────────────────────────────────────────────── */

/** Fisher–Yates shuffle (pure — returns a new array) */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i] as T;
    a[i] = a[j] as T;
    a[j] = t;
  }
  return a;
}

/** brief horizontal shake (wrong-answer feedback), replays on every rise */
function ShakeBox({ active, children, className }: { active: boolean; children: ReactNode; className?: string }) {
  const controls = useAnimationControls();
  const prev = useRef(false);
  useEffect(() => {
    if (active && !prev.current) {
      controls.start({ x: [0, -7, 7, -5, 5, 0], transition: { duration: 0.38 } });
    }
    prev.current = active;
  }, [active, controls]);
  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
}

type Status = "idle" | "wrong" | "correct";

/* ── shared chrome ────────────────────────────────────────────────────── */

const KIND_ICON: Record<LessonInteractive["kind"], typeof ArrowUpDown> = {
  order: ArrowUpDown,
  match: Link2,
  classify: Network,
  fill: ShieldCheck,
  binary: Zap,
  subnet: Network,
};

type Phase = "live" | "celebrate" | "done";

function WidgetShell({
  w, phase, children,
}: { w: LessonInteractive; phase: Phase; children: ReactNode }) {
  const { t, bi } = useLang();

  /* persisted solved state → collapsed progress row, no re-solving */
  if (phase === "done") {
    return (
      <div className="hud-panel rise-in rounded-xl" style={{ backgroundColor: "var(--card)" }}>
        <div className="flex min-h-11 flex-wrap items-center gap-2 px-3 py-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Check className="size-3.5" />
          </span>
          <span className="truncate text-[12px] font-bold text-muted-foreground">{bi(w.title)}</span>
          <span className="ms-auto flex shrink-0 items-center gap-2">
            <span className="chip-sev chip-sev-ok shrink-0">{t("widgetSolved")}</span>
            <span className="code-chip shrink-0" dir="ltr">+{w.xp} XP</span>
          </span>
        </div>
      </div>
    );
  }

  const KindIcon = KIND_ICON[w.kind];

  return (
    <div className="hud-panel rise-in overflow-hidden rounded-xl" style={{ backgroundColor: "var(--card)" }}>
      {/* terminal chrome strip */}
      <div
        className="flex items-center gap-2 border-b border-zinc-800 px-3 py-1.5"
        dir="ltr"
        style={{ backgroundColor: TERM_BG }}
      >
        <span className="term-dots shrink-0" aria-hidden />
        <span className="truncate font-mono text-[10px] text-zinc-400">cnss://checkpoint</span>
        <span className="dot-leader" />
        <span className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-emerald-400">
          {w.kind}
        </span>
        <span className="code-chip shrink-0" dir="ltr">+{w.xp} XP</span>
      </div>

      {/* title + instructions + exercise body */}
      <div className="space-y-3.5 p-4">
        <div className="flex items-start gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
            <KindIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="text-[13.5px] font-black leading-5">{bi(w.title)}</span>
              <span className="chip-sev chip-sev-info shrink-0">{t("interactiveCheckpoint")}</span>
            </span>
            <p className="text-[11.5px] leading-6 text-muted-foreground">{bi(w.instructions)}</p>
          </div>
        </div>

        <div className="relative">
          <div className={phase === "celebrate" ? "pointer-events-none opacity-50" : undefined}>
            {children}
          </div>

          {/* solve celebration: scale-pulse ✓ + XP flash */}
          <AnimatePresence>
            {phase === "celebrate" && (
              <motion.div
                key="celebrate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-card/90 backdrop-blur-[2px]"
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: [0.6, 1.14, 1], opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="grid size-12 place-items-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-500"
                  >
                    <Check className="size-6" strokeWidth={3} />
                  </motion.span>
                  <motion.span
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ repeat: 2, duration: 0.5 }}
                    className="chip-sev chip-sev-ok"
                    dir="ltr"
                  >
                    +{w.xp} XP
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── kind: order — tap chips to build the sequence in the answer rail ── */

function OrderExercise({ w, onSolve }: { w: OrderWidget; onSolve: () => void }) {
  const { t, bi, lang } = useLang();
  const [pool, setPool] = useState<number[]>(() => shuffle(w.items.map((_, i) => i)));
  const [placed, setPlaced] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const shake = useAnimationControls();

  const full = placed.length === w.items.length;

  const reset = () => {
    setPool(shuffle(w.items.map((_, i) => i)));
    setPlaced([]);
    setStatus("idle");
  };

  const place = (idx: number) => {
    setPool((p) => p.filter((x) => x !== idx));
    setPlaced((p) => [...p, idx]);
    setStatus("idle");
  };

  const pullBack = (slot: number) => {
    const idx = placed[slot];
    if (idx === undefined) return;
    setPlaced((p) => p.filter((_, i) => i !== slot));
    setPool((p) => [...p, idx]);
    setStatus("idle");
  };

  const check = () => {
    if (!full) return;
    if (placed.every((idx, i) => idx === i)) {
      setStatus("correct");
      onSolve();
    } else {
      setStatus("wrong");
      shake.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.42 } });
      window.setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 1100);
    }
  };

  return (
    <div className="space-y-3">
      {/* shuffled pool */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="code-chip shrink-0" dir="ltr">pool</span>
        {pool.map((idx) => (
          <button
            key={idx}
            onClick={() => place(idx)}
            className="min-h-11 rounded-lg border border-border bg-muted/40 px-3.5 py-1.5 text-[12px] font-semibold transition-all hover:border-primary/50 hover:bg-accent/50 active:scale-95"
          >
            {bi(w.items[idx])}
          </button>
        ))}
        {pool.length === 0 && (
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">— empty —</span>
        )}
      </div>

      {/* answer rail — numbered slots */}
      <motion.div
        animate={shake}
        className={`space-y-1.5 rounded-xl border-2 border-dashed p-2.5 transition-colors ${
          status === "wrong"
            ? "border-rose-500/60 bg-rose-500/5"
            : status === "correct"
              ? "border-emerald-500/60 bg-emerald-500/5"
              : "border-border"
        }`}
      >
        {w.items.map((_, slot) => {
          const idx = placed[slot];
          const wrong = status === "wrong" && idx !== undefined;
          const correct = status === "correct" && idx !== undefined;
          return (
            <div key={slot} className="flex min-h-11 items-center gap-2">
              <span className="code-chip grid size-7 shrink-0 place-items-center" dir="ltr">{slot + 1}</span>
              {idx === undefined ? (
                <span className="h-11 flex-1 rounded-lg border border-dashed border-border/60 bg-muted/20" />
              ) : (
                <motion.button
                  layout
                  onClick={() => pullBack(slot)}
                  className={`flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 text-[12px] font-bold transition-colors ${
                    wrong
                      ? "border-rose-500/60 bg-rose-500/10 text-foreground"
                      : correct
                        ? "border-emerald-500/60 bg-emerald-500/10 text-foreground"
                        : "border-primary/40 bg-primary/5 text-foreground"
                  }`}
                >
                  <span className="truncate">{bi(w.items[idx])}</span>
                  <X className="ms-auto size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                </motion.button>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" className="h-11 gap-1.5" disabled={!full || status === "correct"} onClick={check}>
          <Check className="size-4" />
          {t("widgetCheck")}
        </Button>
        <Button size="sm" variant="outline" className="h-11 gap-1.5" onClick={reset}>
          <RotateCcw className="size-3.5" />
          {t("widgetReset")}
        </Button>
        {status === "wrong" && <span className="chip-sev chip-sev-crit">{t("widgetWrong")}</span>}
        {lang === "ar" ? null : (
          <span className="ms-auto hidden font-mono text-[9.5px] text-muted-foreground sm:inline" dir="ltr">
            tap a placed item to return it
          </span>
        )}
      </div>
    </div>
  );
}

/* ── kind: match — tap a left term, then its right partner ───────────── */

function MatchExercise({ w, onSolve }: { w: MatchWidget; onSolve: () => void }) {
  const { t, bi } = useLang();
  /** right-slot → pair-index, shuffled once per widget (pairs identity is stable static data) */
  const rightOrder = useMemo(() => shuffle(w.pairs.map((_, i) => i)), [w.pairs]);
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<{ l: number; r: number } | null>(null);

  const tapRight = (pairIdx: number) => {
    if (matched.includes(pairIdx) || selLeft === null) return;
    if (selLeft === pairIdx) {
      const next = [...matched, selLeft];
      setMatched(next);
      setSelLeft(null);
      if (next.length === w.pairs.length) onSolve();
    } else {
      setWrongPair({ l: selLeft, r: pairIdx });
      setSelLeft(null);
      window.setTimeout(() => setWrongPair(null), 750);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 items-start gap-2.5 sm:gap-3">
        {/* left column — terms in canonical order */}
        <div className="space-y-1.5">
          {w.pairs.map((p, i) => {
            const done = matched.includes(i);
            const isSel = selLeft === i;
            const isWrong = wrongPair?.l === i;
            return (
              <ShakeBox key={i} active={isWrong}>
                <button
                  onClick={() => !done && setSelLeft(isSel ? null : i)}
                  disabled={done}
                  className={`flex min-h-11 w-full items-center gap-2 rounded-lg border px-3 py-1.5 text-start text-[12px] font-bold transition-all ${
                    done
                      ? "border-emerald-500/50 bg-emerald-500/10 text-foreground"
                      : isSel
                        ? "border-primary bg-primary/10"
                        : isWrong
                          ? "border-rose-500/60 bg-rose-500/10"
                          : "border-border bg-muted/30 hover:border-primary/40 hover:bg-accent/40"
                  }`}
                >
                  <span className="truncate">{bi(p.left)}</span>
                  {done && <Check className="ms-auto size-4 shrink-0 text-emerald-500" />}
                </button>
              </ShakeBox>
            );
          })}
        </div>

        {/* right column — shuffled partners */}
        <div className="space-y-1.5">
          {rightOrder.map((pairIdx) => {
            const done = matched.includes(pairIdx);
            const isWrong = wrongPair?.r === pairIdx;
            const clickable = selLeft !== null && !done;
            return (
              <ShakeBox key={pairIdx} active={isWrong}>
                <button
                  onClick={() => tapRight(pairIdx)}
                  disabled={done}
                  className={`flex min-h-11 w-full items-center gap-2 rounded-lg border px-3 py-1.5 text-start text-[12px] font-semibold transition-all ${
                    done
                      ? "border-emerald-500/50 bg-emerald-500/10 text-foreground"
                      : isWrong
                        ? "border-rose-500/60 bg-rose-500/10"
                        : clickable
                          ? "border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10"
                          : "border-border bg-muted/30 opacity-80"
                  }`}
                >
                  <span className="truncate">{bi(w.pairs[pairIdx].right)}</span>
                  {done && <Check className="ms-auto size-4 shrink-0 text-emerald-500" />}
                </button>
              </ShakeBox>
            );
          })}
        </div>
      </div>

      {/* progress + hint */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="code-chip shrink-0" dir="ltr">{matched.length}/{w.pairs.length}</span>
        {selLeft !== null && <span className="chip-sev chip-sev-info shrink-0">{t("widgetHint")}: →</span>}
        {wrongPair && <span className="chip-sev chip-sev-crit shrink-0">{t("widgetWrong")}</span>}
      </div>
    </div>
  );
}

/* ── kind: classify — assign each item to a bucket, then check ───────── */

function ClassifyExercise({ w, onSolve }: { w: ClassifyWidget; onSolve: () => void }) {
  const { t, bi } = useLang();
  const [assigned, setAssigned] = useState<number[]>(() => w.items.map(() => -1));
  const [feedback, setFeedback] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const allAssigned = assigned.every((a) => a >= 0);

  const check = () => {
    setFeedback(true);
    if (w.items.every((it, i) => assigned[i] === it.bucket)) {
      setStatus("correct");
      onSolve();
    } else {
      setStatus("wrong");
    }
  };

  const reset = () => {
    setAssigned(w.items.map(() => -1));
    setFeedback(false);
    setStatus("idle");
  };

  const assign = (item: number, bucket: number) => {
    setAssigned((arr) => arr.map((v, i) => (i === item ? (v === bucket ? -1 : bucket) : v)));
    setStatus("idle");
    setFeedback(false);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {w.items.map((it, i) => {
          const a = assigned[i];
          const ok = feedback && a >= 0 && a === it.bucket;
          const bad = feedback && !ok;
          return (
            <div
              key={i}
              className={`space-y-2 rounded-xl border p-2.5 transition-colors ${
                bad ? "border-rose-500/50 bg-rose-500/5" : ok ? "border-emerald-500/50 bg-emerald-500/5" : "border-border"
              }`}
            >
              <div className="flex min-h-6 items-center gap-2">
                <span className="code-chip shrink-0" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12.5px] font-bold">{bi(it.text)}</span>
                {ok && <Check className="ms-auto size-4 shrink-0 text-emerald-500" />}
                {bad && <X className="ms-auto size-4 shrink-0 text-rose-500" />}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {w.buckets.map((b, j) => {
                  const on = a === j;
                  return (
                    <button
                      key={j}
                      onClick={() => assign(i, j)}
                      className={`min-h-11 rounded-lg border px-3.5 py-1.5 text-[11.5px] font-bold transition-all ${
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-muted/30 text-foreground/85 hover:border-primary/50 hover:bg-accent/40"
                      }`}
                    >
                      {bi(b)}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" className="h-11 gap-1.5" disabled={!allAssigned || status === "correct"} onClick={check}>
          <Check className="size-4" />
          {t("widgetCheck")}
        </Button>
        <Button size="sm" variant="outline" className="h-11 gap-1.5" onClick={reset}>
          <RotateCcw className="size-3.5" />
          {t("widgetReset")}
        </Button>
        {status === "wrong" && <span className="chip-sev chip-sev-crit">{t("widgetWrong")}</span>}
      </div>
    </div>
  );
}

/* ── kind: fill — blanks in a template filled from a word bank ───────── */

function FillExercise({ w, onSolve }: { w: FillWidget; onSolve: () => void }) {
  const { t, bi } = useLang();
  /** template split around "____" — recomputed per lang side */
  const template = bi(w.template);
  const parts = useMemo(() => template.split("____"), [template]);
  /** bank display order — shuffled once per widget (bank identity is stable static data) */
  const bankOrder = useMemo(() => shuffle(w.bank.map((_, i) => i)), [w.bank]);
  const [filled, setFilled] = useState<(number | null)[]>(() => w.blanks.map(() => null));
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const slotOk = (i: number): boolean => {
    const f = filled[i];
    return f !== null && bi(w.bank[f]) === bi(w.blanks[i].answer);
  };

  const pick = (slot: number, bankIdx: number) => {
    setFilled((f) => f.map((v, i) => (i === slot ? bankIdx : v)));
    setStatus("idle");
    setOpenSlot(null);
  };

  const clear = (slot: number) => {
    setFilled((f) => f.map((v, i) => (i === slot ? null : v)));
    setStatus("idle");
  };

  const check = () => {
    if (w.blanks.every((_, i) => slotOk(i))) {
      setStatus("correct");
      onSolve();
    } else {
      setStatus("wrong");
    }
  };

  const reset = () => {
    setFilled(w.blanks.map(() => null));
    setOpenSlot(null);
    setStatus("idle");
  };

  return (
    <div className="space-y-3">
      {/* sentence template with inline slots */}
      <div className="rounded-xl border border-border bg-muted/20 p-3.5 text-[13px] leading-9">
        {parts.map((p, i) => (
          <Fragment key={i}>
            {p}
            {i < w.blanks.length && (
              <button
                onClick={() => setOpenSlot(openSlot === i ? null : i)}
                aria-label={`blank ${i + 1}`}
                className={`mx-1 inline-flex min-h-9 items-center rounded-md border-b-2 px-2 font-mono text-[12px] font-bold transition-colors ${
                  status === "correct"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : status === "wrong" && !slotOk(i)
                      ? "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300"
                      : filled[i] !== null
                        ? "border-primary/70 bg-primary/10 text-primary"
                        : openSlot === i
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/40 text-muted-foreground"
                }`}
              >
                {filled[i] !== null ? bi(w.bank[filled[i] as number]) : "____"}
              </button>
            )}
          </Fragment>
        ))}
      </div>

      {/* word bank popover for the open slot */}
      <AnimatePresence initial={false}>
        {openSlot !== null && (
          <motion.div
            key="bank"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2 rounded-xl border border-primary/25 bg-muted/30 p-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="code-chip shrink-0" dir="ltr">bank · slot {openSlot + 1}/{w.blanks.length}</span>
                <span className="dot-leader" />
                {w.blanks[openSlot].hint ? (
                  <span className="chip-sev chip-sev-warn shrink-0">{t("widgetHint")}: {bi(w.blanks[openSlot].hint)}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bankOrder.map((bIdx) => (
                  <button
                    key={bIdx}
                    onClick={() => pick(openSlot, bIdx)}
                    className="min-h-11 rounded-lg border border-border bg-card px-3.5 py-1.5 text-[12px] font-semibold transition-all hover:border-primary/60 hover:bg-accent/40 active:scale-95"
                  >
                    {bi(w.bank[bIdx])}
                  </button>
                ))}
                {filled[openSlot] !== null && (
                  <button
                    onClick={() => clear(openSlot)}
                    className="min-h-11 rounded-lg border border-rose-500/40 bg-rose-500/5 px-3.5 py-1.5 text-[11.5px] font-bold text-rose-600 transition-all hover:bg-rose-500/10 dark:text-rose-400"
                  >
                    <X className="inline size-3.5" /> {t("widgetReset")}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" className="h-11 gap-1.5" disabled={filled.some((f) => f === null) || status === "correct"} onClick={check}>
          <Check className="size-4" />
          {t("widgetCheck")}
        </Button>
        <Button size="sm" variant="outline" className="h-11 gap-1.5" onClick={reset}>
          <RotateCcw className="size-3.5" />
          {t("widgetReset")}
        </Button>
        {status === "wrong" && <span className="chip-sev chip-sev-crit">{t("widgetWrong")}</span>}
      </div>
    </div>
  );
}

/* ── kind: binary — build target octets with 8 toggle bits ───────────── */

function BinaryExercise({ w, onSolve }: { w: BinaryWidget; onSolve: () => void }) {
  const { t } = useLang();
  /** fixed octets or 3 auto-generated rounds (10–200), stable per widget */
  const rounds = useMemo<number[]>(() => {
    if (w.values && w.values.length > 0) return w.values;
    return Array.from({ length: 3 }, () => 10 + Math.floor(Math.random() * 191));
  }, [w.id, w.values]);
  const [roundIdx, setRoundIdx] = useState(0);
  const [bits, setBits] = useState<boolean[]>(() => Array<boolean>(8).fill(false));
  const [status, setStatus] = useState<Status>("idle");
  const [roundFlash, setRoundFlash] = useState(false);
  const shake = useAnimationControls();

  const target = rounds[Math.min(roundIdx, rounds.length - 1)] ?? 0;
  const sum = bits.reduce((acc, b, i) => acc + (b ? BIT_VALUES[i] : 0), 0);

  const toggle = (i: number) => {
    setBits((b) => b.map((v, j) => (j === i ? !v : v)));
    setStatus("idle");
  };

  const resetRound = () => {
    setBits(Array<boolean>(8).fill(false));
    setRoundIdx(0);
    setStatus("idle");
  };

  const check = () => {
    if (sum === target) {
      if (roundIdx >= rounds.length - 1) {
        setStatus("correct");
        onSolve();
      } else {
        setRoundFlash(true);
        window.setTimeout(() => setRoundFlash(false), 800);
        setRoundIdx((r) => r + 1);
        setBits(Array<boolean>(8).fill(false));
        setStatus("idle");
      }
    } else {
      setStatus("wrong");
      shake.start({ x: [0, -7, 7, -5, 5, 0], transition: { duration: 0.38 } });
      window.setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 1100);
    }
  };

  return (
    <div className="space-y-3">
      <motion.div
        animate={shake}
        className="term-window space-y-3 p-3.5"
        dir="ltr"
        style={{ backgroundColor: TERM_BG }}
      >
        {/* target + round counter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-zinc-400">{t("widgetBinaryTarget")}</span>
          <span className="dot-leader" />
          <span className="code-chip shrink-0">round {roundIdx + 1}/{rounds.length}</span>
          {roundFlash && (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="chip-sev chip-sev-ok shrink-0"
            >
              ✓
            </motion.span>
          )}
          <span className="ms-auto font-mono text-2xl font-black tabular-nums text-emerald-300">{target}</span>
        </div>

        {/* 8 toggle bits — MSB 128 … LSB 1 */}
        <div className="grid grid-cols-8 gap-1">
          {bits.map((b, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-pressed={b}
              className={`grid min-h-11 place-items-center gap-0.5 rounded-lg border py-1 font-mono transition-all active:scale-95 ${
                b
                  ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                  : "border-zinc-700 bg-zinc-800/40 text-zinc-400 hover:border-zinc-500"
              }`}
            >
              <span className="text-[9.5px] opacity-70">{BIT_VALUES[i]}</span>
              <span className="text-[13px] font-black">{b ? 1 : 0}</span>
            </button>
          ))}
        </div>

        {/* running sum */}
        <div className="flex items-center gap-2 border-t border-zinc-800 pt-2">
          <span className="font-mono text-[10px] text-zinc-400">{t("widgetBinaryValue")}</span>
          <span className="dot-leader" />
          <span className="font-mono text-[10px] text-zinc-500" dir="ltr">{t("widgetBinaryBits")}: 8</span>
          <span
            className={`ms-auto font-mono text-sm font-black tabular-nums ${
              sum === target ? "text-emerald-300" : "text-zinc-200"
            }`}
          >
            {sum}
          </span>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" className="h-11 gap-1.5" disabled={status === "correct"} onClick={check}>
          <Check className="size-4" />
          {t("widgetCheck")}
        </Button>
        <Button size="sm" variant="outline" className="h-11 gap-1.5" onClick={resetRound}>
          <RotateCcw className="size-3.5" />
          {t("widgetReset")}
        </Button>
        {status === "wrong" && <span className="chip-sev chip-sev-crit">{t("widgetWrong")}</span>}
      </div>
    </div>
  );
}

/* ── kind: subnet — pick the mask that fits the required hosts ───────── */

function SubnetExercise({ w, onSolve }: { w: SubnetWidget; onSolve: () => void }) {
  const { t, bi } = useLang();
  const [picked, setPicked] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const shake = useAnimationControls();

  const pick = (i: number) => {
    if (status === "correct") return;
    setPicked(i);
    if (i === w.correct) {
      setStatus("correct");
      onSolve();
    } else {
      setStatus("wrong");
      shake.start({ x: [0, -7, 7, -5, 5, 0], transition: { duration: 0.38 } });
    }
  };

  const reset = () => {
    setPicked(null);
    setStatus("idle");
  };

  return (
    <div className="space-y-3">
      {/* network + required hosts as code-chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="code-chip shrink-0" dir="ltr">net: {w.network}</span>
        <span className="code-chip shrink-0" dir="ltr">mask: ?</span>
        <span className="chip-sev chip-sev-warn shrink-0">{t("widgetSubnetPick")}</span>
        <span className="ms-auto flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber-500 blink-dot" aria-hidden />
          {t("widgetSubnetHosts")}: <span dir="ltr" className="font-bold text-amber-600 dark:text-amber-400">{w.hosts}</span>
        </span>
      </div>

      {/* 4 mask options — immediate feedback */}
      <motion.div animate={shake} className="grid gap-2 sm:grid-cols-2">
        {w.options.map((m, i) => {
          const isCorrect = status === "correct" && i === w.correct;
          const isWrong = status === "wrong" && i === picked;
          const isDim = (status === "correct" && i !== w.correct) || (status === "wrong" && i !== picked);
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={status === "correct"}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-3.5 py-2 transition-all active:scale-[0.98] ${
                isCorrect
                  ? "border-emerald-500/60 bg-emerald-500/10"
                  : isWrong
                    ? "border-rose-500/60 bg-rose-500/10"
                    : isDim
                      ? "border-border bg-muted/20 opacity-60"
                      : "border-border bg-muted/30 hover:border-primary/50 hover:bg-accent/40"
              }`}
            >
              <span className="code-chip shrink-0" dir="ltr">{String.fromCharCode(65 + i)}</span>
              <span dir="ltr" className="font-mono text-[13px] font-bold">{m}</span>
              {isCorrect && <Check className="ms-auto size-4 shrink-0 text-emerald-500" />}
              {isWrong && <X className="ms-auto size-4 shrink-0 text-rose-500" />}
            </button>
          );
        })}
      </motion.div>

      {/* controls + explanation after correct */}
      <div className="flex flex-wrap items-center gap-2">
        {status === "wrong" && <span className="chip-sev chip-sev-crit">{t("widgetWrong")}</span>}
        {status === "wrong" && (
          <Button size="sm" variant="outline" className="h-11 gap-1.5" onClick={reset}>
            <RotateCcw className="size-3.5" />
            {t("widgetReset")}
          </Button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {status === "correct" && (
          <motion.div
            key="explain"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="term-window p-3" dir="auto" style={{ backgroundColor: TERM_BG }}>
              <div className="mb-1.5 flex items-center gap-2" dir="ltr">
                <span className="code-chip shrink-0">why:</span>
                <span className="dot-leader" />
                <span className="font-mono text-[9.5px] text-emerald-400">mask {w.options[w.correct]}</span>
              </div>
              <p className="text-[12px] leading-6 text-zinc-200">{bi(w.explain)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── dispatcher: one checkpoint per <InteractiveBlock> ───────────────── */

export default function InteractiveBlock({ w }: { w: LessonInteractive }) {
  const { t } = useLang();
  /** solved once → persisted in the store forever */
  const solvedInStore = useProgress((s) => s.interactiveDone.includes(w.id));
  const [phase, setPhase] = useState<Phase>(solvedInStore ? "done" : "live");

  /* safety net: store may flip after late hydration or from another surface */
  useEffect(() => {
    if (solvedInStore && phase === "live") setPhase("done");
  }, [solvedInStore, phase]);

  const solve = useCallback(() => {
    setPhase((p) => (p === "live" ? "celebrate" : p));
    const awarded = useProgress.getState().markInteractiveSolved(w.id, w.xp);
    if (awarded) {
      toast.success(`+${w.xp} XP`, { description: t("widgetXpEarned") });
    }
    window.setTimeout(() => setPhase("done"), 1800);
  }, [w.id, w.xp, t]);

  let exercise: ReactNode;
  switch (w.kind) {
    case "order":
      exercise = <OrderExercise w={w} onSolve={solve} />;
      break;
    case "match":
      exercise = <MatchExercise w={w} onSolve={solve} />;
      break;
    case "classify":
      exercise = <ClassifyExercise w={w} onSolve={solve} />;
      break;
    case "fill":
      exercise = <FillExercise w={w} onSolve={solve} />;
      break;
    case "binary":
      exercise = <BinaryExercise w={w} onSolve={solve} />;
      break;
    case "subnet":
      exercise = <SubnetExercise w={w} onSolve={solve} />;
      break;
  }

  return (
    <WidgetShell w={w} phase={phase}>
      {exercise}
    </WidgetShell>
  );
}
