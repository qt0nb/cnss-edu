"use client";

// ─── Challenges view: auto-graded practical network configuration ─────
// The learner reads a scenario, types IOS-like commands for the target
// device, hits Verify — and the commands are REALLY applied to a cloned
// simulated topology; connectivity checks (ping / http / dhcp / attack)
// are executed with the netsim engine. No answer matching anywhere.
// v3 "Ops Console" restyle — mission briefing cards + terminal pipeline.
// All grading / XP / store logic below is untouched.
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords, Trophy, CheckCircle2, XCircle, Lightbulb, Play, RotateCcw,
  ArrowLeft, Terminal, Zap, ShieldCheck, Wifi, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { CHALLENGES } from "@/data/challenges";
import type { Challenge, ChallengeCheck } from "@/data/challenges";
import {
  cloneTopo, findDevice, hostIp, isHostKind,
  simulatePing, simulateHttp, simulateDhcp, simulateAttack,
} from "@/lib/netsim/engine";
import { runCliLine, runHostLine, initialCliState } from "@/lib/netsim/cli";
import type { Device, DeviceKind, Topology } from "@/lib/netsim/types";

// ─────────────── i18n (local strings) ───────────────
const L = {
  subtitle: {
    ar: "اقرأ السيناريو، اكتب أوامر IOS للجهاز المطلوب، ثم اضغط «تحقق» — تُطبَّق أوامرك فعلياً على طوبولوجيا محاكاة وتُختبر بالحوافز والاتصالات الحقيقية.",
    en: "Read the scenario, type IOS commands for the target device, then hit Verify — your commands are applied to a live simulated topology and graded with real connectivity checks.",
  },
  progress: { ar: "تقدم التحديات", en: "Challenges progress" },
  completed: { ar: "مكتمل", en: "Completed" },
  difficultyWord: { ar: "الصعوبة", en: "Difficulty" },
  diffLabels: {
    ar: { 1: "سهل", 2: "متوسط", 3: "صعب" } as Record<number, string>,
    en: { 1: "Easy", 2: "Medium", 3: "Hard" } as Record<number, string>,
  },
  start: { ar: "ابدأ التحدي", en: "Start challenge" },
  story: { ar: "السيناريو", en: "The scenario" },
  topology: { ar: "طوبولوجيا المعمل", en: "Lab topology" },
  targetOf: { ar: "الجهاز الذي تُعدّه", en: "Device you configure" },
  wrapNote: {
    ar: "تلميح: إن نسيت enable أو conf t فسنضيفهما تلقائياً — ركّز على أوامر الإعداد نفسها.",
    en: "Tip: if you forget enable or conf t we add them automatically — focus on the config commands.",
  },
  console: { ar: "طرفية الأوامر", en: "Command console" },
  verify: { ar: "تحقق", en: "Verify" },
  verifying: { ar: "جارٍ تطبيق الأوامر وتشغيل الفحوص...", en: "Applying commands & running checks..." },
  reset: { ar: "إعادة تعيين", en: "Reset" },
  back: { ar: "عودة إلى القائمة", en: "Back to list" },
  hints: { ar: "تلميحات", en: "Hints" },
  revealHint: { ar: "اكشف تلميحاً", en: "Reveal a hint" },
  noMoreHints: { ar: "لا مزيد من التلميحات", en: "No more hints" },
  solution: { ar: "الحل المرجعي", en: "Reference solution" },
  solutionLocked: { ar: "يُكشف الحل بعد حل التحدي.", en: "Solution unlocks after you solve it." },
  checks: { ar: "فحوص التقييم", en: "Grading checks" },
  checksWaiting: { ar: "اضغط «تحقق» لتشغيل الفحوص على الشبكة المحاكاة.", en: "Press Verify to run the checks on the simulated network." },
  allPass: { ar: "تحدٍ مكتمل! كل الفحوص ناجحة", en: "Challenge complete! All checks passed" },
  partialPass: { ar: "فحوص ناجحة", en: "checks passed" },
  keepTrying: { ar: "راجع المخرجات أدناه وحاول مجدداً — الشبكة تُحاكى فعلياً.", en: "Review the output below and try again — the network is simulated for real." },
  noCommands: { ar: "اكتب أمراً واحداً على الأقل قبل التحقق.", en: "Type at least one command before verifying." },
  tooManyLines: { ar: "الحد الأقصى ٢٠٠ سطر أمر.", en: "Maximum 200 command lines." },
  noTarget: { ar: "لم يُعثر على الجهاز الهدف في الطوبولوجيا.", en: "Target device not found in the topology." },
  alreadyDone: { ar: "كان هذا التحدي مكتملاً من قبل — بلا نقاط إضافية.", en: "This challenge was already completed — no extra XP." },
  xpEarned: { ar: "نقاط الخبرة", en: "XP" },
  terminal: { ar: "آخر مخرجات الطرفية", en: "Last CLI output" },
  cmd: { ar: "أوامر", en: "commands" },
  legend: {
    ar: "راوتر · مبدّل · جدار ناري · طرفية · خادم · لاسلكي · مهاجم",
    en: "Router · Switch · Firewall · End host · Server · Wireless · Attacker",
  },
  target: { ar: "هدفك", en: "target" },
};

const KIND_LABEL: Record<string, { ar: string; en: string }> = {
  router: { ar: "موجّه", en: "router" },
  switch: { ar: "مبدّل", en: "switch" },
  l3switch: { ar: "مبدّل L3", en: "L3 switch" },
  firewall: { ar: "جدار ناري", en: "firewall" },
  wirelessRouter: { ar: "راوتر لاسلكي", en: "wireless router" },
  pc: { ar: "حاسوب", en: "PC" },
};

const KIND_COLOR: Partial<Record<DeviceKind, string>> = {
  router: "#0d9488",
  l3switch: "#047857",
  switch: "#059669",
  firewall: "#d97706",
  pc: "#71717a",
  server: "#65a30d",
  laptop: "#52525b",
  smartphone: "#14b8a6",
  ap: "#14b8a6",
  wirelessRouter: "#0f766e",
  hub: "#a1a1aa",
  cloud: "#a1a1aa",
  ids: "#ca8a04",
  attacker: "#dc2626",
};

const MAX_LINES = 200;

// ─────────────── ops-console v3 helpers ───────────────

/** "ch7" → mission code "c07" (display only — the store id is untouched). */
function missionCode(id: string): string {
  const n = parseInt(id.replace(/\D/g, ""), 10);
  return `c${String(Number.isFinite(n) ? n : 0).padStart(2, "0")}`;
}

/** difficulty → severity chip + ops codename (bilingual, easy/medium/hard). */
const DIFF_META: Record<number, { sev: string; label: { ar: string; en: string } }> = {
  1: { sev: "chip-sev-ok", label: { ar: "RECON · سهل", en: "RECON · EASY" } },
  2: { sev: "chip-sev-info", label: { ar: "PATROL · متوسط", en: "PATROL · MEDIUM" } },
  3: { sev: "chip-sev-warn", label: { ar: "ASSAULT · صعب", en: "ASSAULT · HARD" } },
};

type StatusFilter = "all" | "ready" | "cleared";

// ─────────────── grading core (shared with the engine) ───────────────

/** Mirrors an IOS session: auto-adds enable / conf t / end when missing. */
function wrapScript(target: Device, lines: string[]): string[] {
  if (isHostKind(target.kind)) return lines;
  let ls = [...lines];
  const first = ls[0]?.toLowerCase() ?? "";
  if (first !== "enable" && first !== "en") ls = ["enable", ...ls];
  const second = ls[1]?.toLowerCase() ?? "";
  if (!second.startsWith("conf") && !second.startsWith("configure")) ls = [ls[0], "conf t", ...ls.slice(1)];
  const last = ls[ls.length - 1]?.toLowerCase() ?? "";
  if (!["end", "exit", "write"].includes(last)) ls = [...ls, "end"];
  return ls;
}

/** Apply one check to the post-command topology. This is the real grader. */
function runCheck(topo: Topology, c: ChallengeCheck): boolean {
  switch (c.kind) {
    case "ping":
      return simulatePing(topo, c.srcId, c.dstId).success;
    case "ping-fail":
      return !simulatePing(topo, c.srcId, c.dstId).success;
    case "http": {
      const dst = findDevice(topo, c.dstId);
      const ip = dst ? hostIp(dst).ip : null;
      return ip ? simulateHttp(topo, c.srcId, ip).success : false;
    }
    case "dhcp":
      return simulateDhcp(topo, c.srcId).success;
    case "attack":
      return simulateAttack(topo, c.srcId).success;
    default:
      return false;
  }
}

interface CheckResult {
  label: string;
  kind: string;
  pass: boolean;
}
interface Outcome {
  results: CheckResult[];
  allPass: boolean;
  terminal: string[];
  applied: number;
}

function starterFor(ch: Challenge): string {
  if (ch.targetKind === "pc") return "! PC0 — ipconfig /ip ... / ipconfig /gw ...\n";
  return `! ${ch.targetDevice} — type your commands below\nenable\nconf t\n\nend\n`;
}

// ─────────────── mini topology diagram (inline SVG) ───────────────

function TopoDiagram({ topo, targetName }: { topo: Topology; targetName: string }) {
  const nodes = useMemo(() => topo.devices, [topo]);
  const xs = topo.devices.map((d) => d.x);
  const ys = topo.devices.map((d) => d.y);
  const minX = Math.min(...xs) - 70;
  const minY = Math.min(...ys) - 55;
  const w = Math.max(...xs) - minX + 70;
  const h = Math.max(...ys) - minY + 55;
  return (
    <svg
      viewBox={`${minX} ${minY} ${w} ${h}`}
      className="h-auto max-h-[300px] w-full"
      role="img"
      aria-label="topology"
    >
      {topo.links.map((l) => {
        const a = findDevice(topo, l.a.deviceId);
        const b = findDevice(topo, l.b.deviceId);
        if (!a || !b) return null;
        return (
          <line
            key={l.id}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="currentColor"
            strokeOpacity={l.kind === "wireless" ? 0.5 : 0.28}
            strokeWidth={l.kind === "serial" ? 2.5 : 1.8}
            strokeDasharray={l.kind === "wireless" ? "5 6" : undefined}
          />
        );
      })}
      {nodes.map((d) => {
        const isTarget = d.name === targetName;
        const color = KIND_COLOR[d.kind] ?? "#71717a";
        return (
          <g key={d.id}>
            {isTarget && (
              <circle
                cx={d.x} cy={d.y} r={30}
                fill="none" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4"
              />
            )}
            <circle cx={d.x} cy={d.y} r={20} fill={color} fillOpacity={0.9} stroke="currentColor" strokeOpacity={0.15} />
            {d.kind === "wirelessRouter" || d.kind === "smartphone" ? (
              <text x={d.x} y={d.y + 4} textAnchor="middle" fontSize={12} fill="#fff" className="select-none">
                <tspan>∿</tspan>
              </text>
            ) : null}
            <text
              x={d.x} y={d.y + 38}
              textAnchor="middle" fontSize={12}
              fill="currentColor" className="select-none"
              fontWeight={isTarget ? 700 : 500}
            >
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LegendDot({ color }: { color: string }) {
  return <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
}

// ─────────────── the view ───────────────

export default function ChallengesView() {
  const { lang, bi, dir } = useLang();
  const challengesDone = useProgress((s) => s.challengesDone);
  const recordChallenge = useProgress((s) => s.recordChallenge);

  const [sel, setSel] = useState<Challenge | null>(null);
  const [code, setCode] = useState<Record<string, string>>({});
  const [hintCount, setHintCount] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  // v3 list chrome (visual only — does not affect any grading logic)
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const loc = (o: { ar: string; en: string }) => (lang === "ar" ? o.ar : o.en);

  const topo = useMemo(() => (sel ? sel.build() : null), [sel]);
  const solved = !!sel && (outcome?.allPass || challengesDone.includes(sel.id));

  const openChallenge = (ch: Challenge) => {
    setSel(ch);
    setOutcome(null);
    setMsg(null);
  };

  const closeChallenge = () => {
    setSel(null);
    setOutcome(null);
    setMsg(null);
  };

  const runVerify = async () => {
    if (!sel) return;
    const raw = (code[sel.id] ?? starterFor(sel))
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("!") && !l.startsWith("#"));
    if (raw.length === 0) {
      setMsg(loc(L.noCommands));
      return;
    }
    if (raw.length > MAX_LINES) {
      setMsg(loc(L.tooManyLines));
      return;
    }
    setBusy(true);
    setMsg(null);
    setOutcome(null);
    await new Promise((r) => setTimeout(r, 450)); // let the UI breathe
    try {
      const t = cloneTopo(sel.build());
      const target = t.devices.find((d) => d.name === sel.targetDevice);
      if (!target) {
        setMsg(loc(L.noTarget));
        return;
      }
      const out: string[] = [];
      if (isHostKind(target.kind)) {
        for (const line of raw) {
          const r = runHostLine(target, line);
          out.push(...r.lines);
        }
      } else {
        const script = wrapScript(target, raw);
        let st = { ...initialCliState };
        for (const line of script) {
          const r = runCliLine(target, line, st);
          st = r.state;
          out.push(...r.lines);
        }
      }
      const results = sel.checks.map((c) => ({
        label: bi(c.label),
        kind: c.kind,
        pass: runCheck(t, c),
      }));
      const allPass = results.every((r) => r.pass);
      setOutcome({ results, allPass, terminal: out.filter(Boolean).slice(-10), applied: raw.length });
      if (allPass) {
        const first = recordChallenge(sel.id, sel.xp);
        if (first) {
          toast({ title: lang === "ar" ? `أحسنت! +${sel.xp} XP` : `Well done! +${sel.xp} XP` });
        } else {
          toast({ title: loc(L.alreadyDone) });
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const resetChallenge = () => {
    if (!sel) return;
    setCode((p) => ({ ...p, [sel.id]: starterFor(sel) }));
    setOutcome(null);
    setMsg(null);
    setHintCount((p) => ({ ...p, [sel.id]: 0 }));
  };

  const revealHint = () => {
    if (!sel) return;
    setHintCount((p) => ({ ...p, [sel.id]: Math.min((p[sel.id] ?? 0) + 1, sel.hints.length) }));
  };

  // ── list view: mission briefings ──
  if (!sel) {
    const done = CHALLENGES.filter((c) => challengesDone.includes(c.id)).length;
    const pct = Math.round((done / CHALLENGES.length) * 100);
    const visible = CHALLENGES.filter((c) => {
      const isDone = challengesDone.includes(c.id);
      if (filter === "cleared") return isDone;
      if (filter === "ready") return !isDone;
      return true;
    });
    return (
      <div className="space-y-5">
        {/* section header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Swords className="size-4" />
            </span>
            <h2 className="text-sm font-black">{lang === "ar" ? "مهام ميدانية" : "Mission Briefings"}</h2>
            <span className="code-chip">challenges.ops</span>
            <span className="dot-leader" />
            <span className="font-mono text-[10px] text-muted-foreground">
              {done}/{CHALLENGES.length} {lang === "ar" ? "مكتملة" : "CLEARED"}
            </span>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">{loc(L.subtitle)}</p>
        </div>

        {/* progress + filter strip */}
        <div className="hud-panel net-grid-bg rounded-xl p-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 font-medium">
              <span className="eq-bars" aria-hidden>
                <i /><i /><i /><i />
              </span>
              {loc(L.progress)}
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {done} / {CHALLENGES.length}
            </span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted" dir="ltr">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {(["all", "ready", "cleared"] as StatusFilter[]).map((f) => {
              const activeF = filter === f;
              const count =
                f === "all" ? CHALLENGES.length : f === "ready" ? CHALLENGES.length - done : done;
              const label =
                f === "all"
                  ? lang === "ar" ? "الكل" : "ALL"
                  : f === "ready"
                    ? lang === "ar" ? "جاهزة" : "READY"
                    : lang === "ar" ? "مكتملة" : "CLEARED";
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    activeF
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "bg-muted/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {label} <span className="opacity-70">{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* mission briefing cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((ch, i) => {
            const isDone = challengesDone.includes(ch.id);
            const isOpen = expanded === ch.id;
            return (
              <div key={ch.id} className="rise-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <article
                  className={`hud-panel flex h-full flex-col gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isDone ? "border-emerald-500/40" : ""
                  }`}
                >
                  {/* header row: mission code + title + status */}
                  <div className="flex items-start gap-2">
                    <span className="code-chip shrink-0">{missionCode(ch.id)}</span>
                    <h3 className="min-w-0 flex-1 text-sm font-black leading-snug">{bi(ch.title)}</h3>
                    {isDone ? (
                      <span className="chip-sev chip-sev-ok inline-flex shrink-0 items-center gap-1">
                        <CheckCircle2 className="size-3" /> CLEARED
                      </span>
                    ) : (
                      <span className="chip-sev chip-sev-info inline-flex shrink-0 items-center gap-1">
                        <span className="blink-dot inline-block size-1.5 rounded-full bg-emerald-500" /> READY
                      </span>
                    )}
                  </div>

                  {/* difficulty / XP / target chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`chip-sev ${DIFF_META[ch.difficulty].sev}`} title={loc(L.difficultyWord)}>
                      {loc(DIFF_META[ch.difficulty].label)}
                    </span>
                    <span className="code-chip inline-flex items-center gap-1" title="XP">
                      <Zap className="size-3 text-amber-500" /> +{ch.xp}
                    </span>
                    <span className="code-chip inline-flex items-center gap-1" title={loc(L.targetOf)}>
                      <ShieldCheck className="size-3 text-emerald-500" /> {ch.targetDevice}
                    </span>
                  </div>

                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{bi(ch.story)}</p>

                  {/* expandable mission brief + objective steps */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="brief"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="term-window overflow-hidden">
                          <div className="flex items-center gap-2 border-b border-border/60 px-5 py-1.5" dir="ltr">
                            <span className="term-dots" aria-hidden />
                            <span className="code-chip">mission.brief</span>
                          </div>
                          <p className="px-4 py-3 text-xs leading-6 text-foreground/90">{bi(ch.story)}</p>
                        </div>
                        <ol className="mt-2 space-y-1.5">
                          {ch.checks.map((c, j) => (
                            <li key={j} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              <span className="code-chip shrink-0">{String(j + 1).padStart(2, "0")}</span>
                              <span className="min-w-0 flex-1 truncate">{bi(c.label)}</span>
                              <span className="font-mono text-[9px] uppercase text-muted-foreground/60">{c.kind}</span>
                            </li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* actions */}
                  <div className="mt-auto flex items-center gap-2">
                    <Button className="bg-emerald-600 text-white hover:bg-emerald-700" onClick={() => openChallenge(ch)}>
                      <Play className={`size-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
                      {loc(L.start)}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                      onClick={() => setExpanded(isOpen ? null : ch.id)}
                      aria-expanded={isOpen}
                    >
                      <ChevronDown className={`size-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      {lang === "ar" ? "الموجز" : "BRIEF"}
                    </Button>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── detail view: mission console ──
  const revealed = hintCount[sel.id] ?? 0;
  const ch = sel;
  const allDone = outcome?.allPass ?? false;
  const steps = outcome
    ? outcome.results.map((r) => ({ label: r.label, kind: r.kind, pass: r.pass }))
    : ch.checks.map((c) => ({ label: bi(c.label), kind: c.kind, pass: null as boolean | null }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* mission header */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Button variant="outline" size="sm" onClick={closeChallenge}>
          <ArrowLeft className={`size-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
          {loc(L.back)}
        </Button>
        <span className="code-chip">{missionCode(ch.id)}</span>
        <h1 className="flex flex-wrap items-center gap-2 text-xl font-black leading-snug">
          {bi(ch.title)}
          {challengesDone.includes(ch.id) && (
            <span className="chip-sev chip-sev-ok inline-flex items-center gap-1">
              <Trophy className="size-3" /> {loc(L.completed)}
            </span>
          )}
        </h1>
        <span className={`chip-sev ${DIFF_META[ch.difficulty].sev}`} title={loc(L.difficultyWord)}>
          {loc(DIFF_META[ch.difficulty].label)}
        </span>
        <span className="code-chip inline-flex items-center gap-1">
          <Zap className="size-3 text-amber-500" /> +{ch.xp} XP
        </span>
        <span className="code-chip inline-flex items-center gap-1">
          <ShieldCheck className="size-3 text-emerald-500" /> {ch.targetDevice}
        </span>
      </div>

      {/* objective block: mission brief terminal */}
      <div className="term-window net-grid-bg relative overflow-hidden">
        <span className="scanline" aria-hidden />
        <div className="flex items-center gap-2 border-b border-border/60 px-5 py-2" dir="ltr">
          <span className="term-dots" aria-hidden />
          <span className="code-chip">mission.brief</span>
          <span className="dot-leader" />
          <span className="font-mono text-[10px] text-muted-foreground">{ch.id}.txt</span>
        </div>
        <p className="px-4 py-4 leading-7">
          {bi(ch.story)}
          <span className="caret ms-1 inline-block font-mono text-primary" aria-hidden>▌</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* left column: topology + target + hints */}
        <div className="space-y-5">
          <div className="hud-panel rounded-xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="code-chip">lab.topology</span>
              <span className="text-xs font-black">{loc(L.topology)}</span>
              <span className="dot-leader" />
              <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">{ch.targetDevice}</span>
            </div>
            {topo && <TopoDiagram topo={topo} targetName={ch.targetDevice} />}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {[
                { c: "#0d9488", l: { ar: "راوتر", en: "Router" } },
                { c: "#059669", l: { ar: "مبدّل", en: "Switch" } },
                { c: "#d97706", l: { ar: "جدار", en: "Firewall" } },
                { c: "#71717a", l: { ar: "طرفية", en: "Host" } },
                { c: "#65a30d", l: { ar: "خادم", en: "Server" } },
                { c: "#14b8a6", l: { ar: "لاسلكي", en: "Wireless" } },
                { c: "#dc2626", l: { ar: "مهاجم", en: "Attacker" } },
              ].map((it) => (
                <span key={it.l.en} className="flex items-center gap-1.5">
                  <LegendDot color={it.c} />
                  {loc(it.l)}
                </span>
              ))}
            </div>
          </div>

          <div className="hud-panel rounded-xl border-emerald-500/30 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" />
              </span>
              <span className="text-xs font-black">{loc(L.targetOf)}</span>
              <span className="dot-leader" />
              <span className="code-chip">target.device</span>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-600 font-mono hover:bg-emerald-600">{ch.targetDevice}</Badge>
                <span className="text-sm text-muted-foreground">
                  {loc(KIND_LABEL[ch.targetKind] ?? { ar: "جهاز", en: "device" })}
                </span>
                {(ch.targetKind === "wirelessRouter" || ch.targetKind === "pc") && (
                  <Wifi className="size-4 text-teal-500" />
                )}
              </div>
              <p className="font-mono text-xs text-muted-foreground" dir="ltr">
                {ch.targetDevice}&gt; enable … conf t … (IOS-like CLI)
              </p>
              <p className="text-xs text-muted-foreground">{loc(L.wrapNote)}</p>
            </div>
          </div>

          {/* hints */}
          <div className="hud-panel rounded-xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="code-chip inline-flex items-center gap-1">
                <Lightbulb className="size-3 text-amber-500" /> hints
              </span>
              <span className="text-xs font-black">{loc(L.hints)}</span>
              <span className="dot-leader" />
              <span className="font-mono text-[10px] text-muted-foreground">
                {revealed}/{ch.hints.length}
              </span>
            </div>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {ch.hints.slice(0, revealed).map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm leading-6">
                      {bi(h)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button
                variant="secondary"
                size="sm"
                onClick={revealHint}
                disabled={revealed >= ch.hints.length}
              >
                <Lightbulb className="size-3.5" />
                {revealed >= ch.hints.length ? loc(L.noMoreHints) : loc(L.revealHint)}
              </Button>
            </div>
          </div>
        </div>

        {/* right column: console + checks pipeline + solution */}
        <div className="space-y-5">
          {/* command console */}
          <div className="term-window overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-2" dir="ltr">
              <span className="term-dots" aria-hidden />
              <span className="code-chip">{missionCode(ch.id)}.console</span>
              <span className="dot-leader" />
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">{ch.targetDevice}&gt;</span>
            </div>
            <div className="space-y-4 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold">
                <Terminal className="size-3.5 text-emerald-500" />
                {loc(L.console)}
              </p>
              <Textarea
                dir="ltr"
                spellCheck={false}
                value={code[ch.id] ?? starterFor(ch)}
                onChange={(e) => setCode((p) => ({ ...p, [ch.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    if (!busy) void runVerify();
                  }
                }}
                placeholder={lang === "ar" ? "اكتب أوامر IOS هنا..." : "type IOS commands here..."}
                className="min-h-[220px] bg-zinc-950 font-mono text-[13px] leading-6 text-emerald-50 caret-emerald-400 dark:bg-zinc-950"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  className={`bg-emerald-600 text-white hover:bg-emerald-700 ${allDone ? "breathe" : ""}`}
                  onClick={() => void runVerify()}
                  disabled={busy}
                >
                  <Play className={`size-4 ${busy ? "animate-pulse" : ""} ${dir === "rtl" ? "-scale-x-100" : ""}`} />
                  {busy ? loc(L.verifying) : loc(L.verify)}
                </Button>
                <Button variant="outline" onClick={resetChallenge} disabled={busy}>
                  <RotateCcw className="size-4" />
                  {loc(L.reset)}
                </Button>
                <span className="ms-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground" dir="ltr">
                  <span className="kbd">Ctrl</span>+<span className="kbd">Enter</span>
                </span>
              </div>
              {msg && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-600 dark:text-rose-400">
                  {msg}
                </div>
              )}
              {outcome && outcome.terminal.length > 0 && (
                <div className="space-y-1.5">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Terminal className="size-3" />
                    {loc(L.terminal)}
                  </p>
                  <pre
                    dir="ltr"
                    className="max-h-40 overflow-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs leading-5 text-zinc-300"
                  >
                    {outcome.terminal.join("\n")}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* grading pipeline */}
          <div className="hud-panel rounded-xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="code-chip">grading.pipeline</span>
              <span className="text-xs font-black">{loc(L.checks)}</span>
              <span className="dot-leader" />
              <span className="font-mono text-[10px] text-muted-foreground">
                {outcome
                  ? `${outcome.results.filter((r) => r.pass).length}/${outcome.results.length} PASS`
                  : `${ch.checks.length} ${loc(L.cmd)}`}
              </span>
            </div>
            {!outcome && <p className="mb-3 text-xs text-muted-foreground">{loc(L.checksWaiting)}</p>}
            <AnimatePresence initial={false} mode="wait">
              {outcome && (
                <motion.div
                  key={outcome.allPass ? "pass" : "partial"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mb-3"
                >
                  {outcome.allPass ? (
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
                      <Trophy className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="font-semibold text-emerald-700 dark:text-emerald-300">{loc(L.allPass)}</p>
                        <p className="mt-1 flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                          <Zap className="size-3.5" />+{ch.xp} {loc(L.xpEarned)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
                      <p className="font-semibold">
                        {outcome.results.filter((r) => r.pass).length} / {outcome.results.length} {loc(L.partialPass)}
                      </p>
                      <p className="mt-1 text-xs">{loc(L.keepTrying)}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {/* numbered terminal pipeline with side rail */}
            <div className="relative">
              <span aria-hidden className="data-rail absolute bottom-3 top-3 start-[7px]" />
              <ol className="space-y-2">
                {steps.map((s, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2.5 rounded-lg border p-2.5 ${
                      s.pass === true
                        ? "border-emerald-500/30 bg-emerald-500/5"
                        : s.pass === false
                          ? "border-rose-500/30 bg-rose-500/5"
                          : "border-dashed"
                    }`}
                  >
                    <span className="relative z-10 grid size-4 shrink-0 place-items-center bg-background">
                      {s.pass === true ? (
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                      ) : s.pass === false ? (
                        <XCircle className="size-4 shrink-0 text-rose-500" />
                      ) : (
                        <span className="size-2.5 shrink-0 rounded-full border border-dashed border-muted-foreground/50" />
                      )}
                    </span>
                    <span className="code-chip shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`min-w-0 flex-1 text-xs leading-snug ${s.pass === null ? "text-muted-foreground" : ""}`}>
                      {s.label}
                    </span>
                    <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                      {s.kind}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* solution */}
          <div className={`hud-panel rounded-xl p-4 ${solved ? "border-emerald-500/40" : ""}`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <Trophy className="size-3.5" />
              </span>
              <span className="text-xs font-black">{loc(L.solution)}</span>
              <span className="dot-leader" />
              <span className="code-chip">{solved ? "solution.unlocked" : "solution.locked"}</span>
            </div>
            {solved ? (
              <div className="term-window overflow-hidden">
                <p className="p-3 font-mono text-xs leading-6" dir="ltr">
                  {bi(ch.solution)}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{loc(L.solutionLocked)}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
