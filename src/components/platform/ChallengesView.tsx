"use client";

// ─── Challenges view: auto-graded practical network configuration ─────
// The learner reads a scenario, types IOS-like commands for the target
// device, hits Verify — and the commands are REALLY applied to a cloned
// simulated topology; connectivity checks (ping / http / dhcp / attack)
// are executed with the netsim engine. No answer matching anywhere.
import React, { useMemo, useState } from "react";
import {
  Swords, Trophy, Star, CheckCircle2, XCircle, Lightbulb, Play, RotateCcw,
  ArrowLeft, Terminal, Zap, ShieldCheck, Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

  // ── list view ──
  if (!sel) {
    const done = CHALLENGES.filter((c) => challengesDone.includes(c.id)).length;
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Swords className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">{loc({ ar: "التحديات العملية", en: "Hands-on Challenges" })}</h1>
            <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{loc(L.subtitle)}</p>
          </div>
        </div>

        <Card className="gap-4 py-4">
          <CardContent className="px-4">
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium">{loc(L.progress)}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {done} / {CHALLENGES.length}
              </span>
            </div>
            <Progress value={(done / CHALLENGES.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CHALLENGES.map((ch) => {
            const isDone = challengesDone.includes(ch.id);
            return (
              <Card
                key={ch.id}
                className={`group gap-4 transition-shadow hover:shadow-md ${isDone ? "border-emerald-500/40" : ""}`}
              >
                <CardHeader className="px-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-base leading-snug">
                      <span className="font-mono text-xs text-muted-foreground">{ch.id}</span>
                      {bi(ch.title)}
                    </CardTitle>
                    {isDone && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <Trophy className="size-3.5" />
                        {loc(L.completed)}
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">{bi(ch.story)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1" title={loc(L.difficultyWord)}>
                      {[1, 2, 3].map((i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${i <= ch.difficulty ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                        />
                      ))}
                      <span className="ms-1">{L.diffLabels[lang][ch.difficulty]}</span>
                    </span>
                    <Badge variant="secondary" className="gap-1 font-mono">
                      <Zap className="size-3 text-amber-500" />
                      {ch.xp} XP
                    </Badge>
                    <Badge variant="outline" className="gap-1 font-mono">
                      <ShieldCheck className="size-3 text-emerald-500" />
                      {ch.targetDevice}
                    </Badge>
                  </div>
                  <Button
                    className="w-fit bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => openChallenge(ch)}
                  >
                    <Play className={`size-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
                    {loc(L.start)}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ── detail view ──
  const revealed = hintCount[sel.id] ?? 0;
  const ch = sel;

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={closeChallenge}>
          <ArrowLeft className={`size-4 ${dir === "rtl" ? "-scale-x-100" : ""}`} />
          {loc(L.back)}
        </Button>
        <h1 className="flex flex-wrap items-center gap-2 text-xl font-bold">
          <span className="font-mono text-sm text-muted-foreground">{ch.id}</span>
          {bi(ch.title)}
          {challengesDone.includes(ch.id) && (
            <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <Trophy className="size-3.5" />
              {loc(L.completed)}
            </Badge>
          )}
        </h1>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          {[1, 2, 3].map((i) => (
            <Star
              key={i}
              className={`size-3.5 ${i <= ch.difficulty ? "fill-amber-400 text-amber-400" : "text-muted"}`}
            />
          ))}
          <span className="ms-1">{L.diffLabels[lang][ch.difficulty]}</span>
        </span>
        <Badge variant="secondary" className="gap-1 font-mono">
          <Zap className="size-3 text-amber-500" />
          {ch.xp} XP
        </Badge>
      </div>

      {/* story */}
      <Card>
        <CardHeader className="px-6">
          <CardTitle className="text-base">{loc(L.story)}</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <p className="leading-7">{bi(ch.story)}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* left column: topology + target + hints */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="text-base">{loc(L.topology)}</CardTitle>
              <CardDescription>{loc(L.legend)}</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
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
            </CardContent>
          </Card>

          <Card className="border-emerald-500/30">
            <CardHeader className="px-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-emerald-500" />
                {loc(L.targetOf)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-600 hover:bg-emerald-600 font-mono">{ch.targetDevice}</Badge>
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
            </CardContent>
          </Card>

          {/* hints */}
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="size-4 text-amber-500" />
                {loc(L.hints)}
                <span className="ms-auto font-mono text-xs text-muted-foreground">
                  {revealed}/{ch.hints.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-6">
              {ch.hints.slice(0, revealed).map((h, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm leading-6"
                >
                  {bi(h)}
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={revealHint}
                disabled={revealed >= ch.hints.length}
              >
                <Lightbulb className="size-3.5" />
                {revealed >= ch.hints.length ? loc(L.noMoreHints) : loc(L.revealHint)}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* right column: console + checks + solution */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Terminal className="size-4 text-emerald-500" />
                {loc(L.console)}
                <span className="ms-auto font-mono text-xs text-muted-foreground">{ch.targetDevice}&gt;</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6">
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
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
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
                <span className="ms-auto font-mono text-xs text-muted-foreground">
                  Ctrl+Enter
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
            </CardContent>
          </Card>

          {/* checks */}
          <Card>
            <CardHeader className="px-6">
              <CardTitle className="text-base">{loc(L.checks)}</CardTitle>
              {!outcome && <CardDescription>{loc(L.checksWaiting)}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-3 px-6">
              {outcome ? (
                <>
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
                  <ul className="space-y-2">
                    {outcome.results.map((r, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                          r.pass
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-rose-500/30 bg-rose-500/5"
                        }`}
                      >
                        {r.pass ? (
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                        ) : (
                          <XCircle className="size-4 shrink-0 text-rose-500" />
                        )}
                        <span className="flex-1">{r.label}</span>
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                          {r.kind}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul className="space-y-2">
                  {ch.checks.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-lg border p-3 text-sm text-muted-foreground"
                    >
                      <span className="size-4 shrink-0 rounded-full border border-dashed" />
                      <span className="flex-1">{bi(c.label)}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase">
                        {c.kind}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* solution */}
          <Card className={solved ? "border-emerald-500/40" : ""}>
            <CardHeader className="px-6">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="size-4 text-emerald-500" />
                {loc(L.solution)}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              {solved ? (
                <p className="rounded-lg bg-muted p-3 font-mono text-xs leading-6" dir="ltr">
                  {bi(ch.solution)}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">{loc(L.solutionLocked)}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
