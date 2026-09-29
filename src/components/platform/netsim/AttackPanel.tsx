"use client";

// ─── NetSim: attack/defense controls for the attacker (Kali) device ──────────
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Zap, Waves, Search, Play, Square, ShieldAlert, Crosshair, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import type { Device, AttackKind, AttackReport } from "@/lib/netsim/types";
import { runHostLine } from "@/lib/netsim/cli";
import { isValidIp } from "@/lib/netsim/engine";

const KINDS: { id: AttackKind; icon: React.ElementType; ar: string; en: string; hint: { ar: string; en: string } }[] = [
  { id: "arpspoof", icon: Bug, ar: "ARP-Spoof", en: "ARP-Spoof", hint: { ar: "تسميم جدول ARP لخطف حركة الضحية", en: "Poison the victim's ARP table to intercept traffic" } },
  { id: "ddos", icon: Zap, ar: "DDoS ICMP", en: "ICMP DDoS", hint: { ar: "إغراق الهدف بطلبات Echo", en: "Flood the target with echo requests" } },
  { id: "synflood", icon: Waves, ar: "SYN-Flood", en: "SYN-Flood", hint: { ar: "إشغال الهدف باتصالات نصف مفتوحة", en: "Saturate the target with half-open connections" } },
  { id: "scan", icon: Search, ar: "Port-Scan", en: "Port-Scan", hint: { ar: "جسّ نطاق عناوين المجاورة", en: "Probe a small address range" } },
];

export default function AttackPanel({
  device,
  onChange,
  onRunReport,
}: {
  device: Device;
  /** commit device mutation (re-render topology) */
  onChange: () => void;
  /** run simulateAttack for this device, feed the sim panel, return the report */
  onRunReport: () => AttackReport | null;
}) {
  const { lang, bi } = useLang();
  const [kind, setKind] = useState<AttackKind>(device.attack?.kind ?? "ddos");
  const [target, setTarget] = useState(device.attack?.targetIp ?? "");
  const [victim, setVictim] = useState(device.attack?.victimIp ?? "");
  const [report, setReport] = useState<AttackReport | null>(null);
  const [echo, setEcho] = useState<string[]>([]);

  // keep form in sync when a different attacker gets selected
  useEffect(() => {
    setKind(device.attack?.kind ?? "ddos");
    setTarget(device.attack?.targetIp ?? "");
    setVictim(device.attack?.victimIp ?? "");
    setReport(null);
    setEcho([]);
  }, [device.id]);

  const L = {
    attackTab: { ar: "الهجمات", en: "Attacks" },
    pickKind: { ar: "نوع الهجوم", en: "Attack kind" },
    targetIp: { ar: "عنوان الهدف (IP)", en: "Target IP" },
    victimIp: { ar: "الهوية المسروقة (البوابة غالباً)", en: "Spoofed identity (usually the gateway)" },
    victimHint: { ar: "IP الضحية التي سيُقنع بها الهدف — مثلاً عنوان البوابة", en: "the IP you claim to own — e.g. the gateway" },
    launch: { ar: "إطلاق الهجوم", en: "Launch attack" },
    stop: { ar: "إيقاف الهجوم", en: "Stop attack" },
    runReport: { ar: "تشغيل تقرير المحاكاة", en: "Run simulation report" },
    active: { ar: "نشط", en: "active" },
    idle: { ar: "لا هجوم جارٍ", en: "No attack configured" },
    state: { ar: "حالة الهجوم", en: "Attack state" },
    invalid: { ar: "عنوان IP غير صالح", en: "Invalid IP address" },
    needVictim: { ar: "ARP-Spoof يحتاج هوية مسروقة صالحة", en: "ARP-spoof needs a valid spoofed identity" },
    launched: { ar: "الهجوم جاهز — شغّل التقرير لرؤية المحاكاة", en: "Attack armed — run the report to simulate" },
    stopped: { ar: "أُوقف الهجوم", en: "Attack stopped" },
    noIp: { ar: "المهاجم بلا عنوان IP — اضبطه من الإعدادات الكاملة", en: "Attacker has no IP — set it from full config" },
    attackerIp: { ar: "عنوان المهاجم", en: "Attacker IP" },
    blocked: { ar: "صُدَّ الهجوم بالكامل", en: "Attack fully blocked" },
    leaked: { ar: "وصلت حزم للهدف", en: "Packets reached the target" },
    sent: { ar: "أُرسلت", en: "sent" },
    reached: { ar: "وصلت", en: "reached" },
    alerts: { ar: "تنبيهات IDS", en: "IDS alerts" },
    targetDown: { ar: "الهدف سقط (مشبع)", en: "Target down (saturated)" },
    intercepted: { ar: "اعتُرضت حركة الضحية", en: "Victim traffic intercepted" },
    defended: { ar: "الدفوع صمدت", en: "Defenses held" },
    tune: { ar: "درّب دفاعك: قواعد ACL على الجدار، أمن منافذ على المبدّل، وراقب IDS", en: "Train your defense: ACL rules on the firewall, port-security on the switch, watch the IDS" },
    noPackets: { ar: "لم تُطلق أي حزمة", en: "No packets were sent" },
    noPacketsHint: { ar: "اضبط الهجوم أولاً، وتأكد أن المهاجم موصول بكابل وله عنوان IP صالح", en: "Configure the attack first, and make sure the attacker is cabled with a valid IP" },
  };

  const attackerIp = device.ports.find((p) => p.ip && p.kind !== "wireless")?.ip ?? null;

  const launch = () => {
    const t = target.trim();
    if (!isValidIp(t)) return toast({ title: bi(L.invalid), variant: "destructive" });
    const v = victim.trim();
    if (kind === "arpspoof" && v && !isValidIp(v)) return toast({ title: bi(L.invalid), variant: "destructive" });
    if (kind === "arpspoof" && !v) return toast({ title: bi(L.needVictim), variant: "destructive" });
    const line = kind === "arpspoof" ? `attack arpspoof ${t} ${v}` : `attack ${kind} ${t}`;
    const r = runHostLine(device, line);
    setEcho(r.lines);
    setReport(null);
    onChange();
    toast({ title: bi(L.launched) });
  };

  const stop = () => {
    const r = runHostLine(device, "attack stop");
    setEcho(r.lines);
    setReport(null);
    onChange();
    toast({ title: bi(L.stopped) });
  };

  const runReport = () => {
    const rep = onRunReport();
    setReport(rep);
  };

  return (
    <div className="space-y-3 p-3">
      {/* attacker ip hint */}
      <div className="flex items-center justify-between text-[10.5px] text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Activity className="size-3" />{bi(L.attackerIp)}</span>
        <span className="font-mono" dir="ltr">{attackerIp ?? "—"}</span>
      </div>
      {!attackerIp && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-2 text-[10.5px] text-amber-600">{bi(L.noIp)}</div>
      )}

      {/* kind picker */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-black">{bi(L.pickKind)}</div>
        <div className="grid grid-cols-2 gap-1.5">
          {KINDS.map((k) => {
            const sel = kind === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setKind(k.id)}
                title={bi(k.hint)}
                className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10.5px] font-bold transition-colors
                  ${sel ? "border-primary bg-primary/10 text-primary glow-primary" : "border-border bg-card text-muted-foreground hover:bg-accent"}`}
              >
                <k.icon className="size-3.5 shrink-0" />
                {bi({ ar: k.ar, en: k.en })}
              </button>
            );
          })}
        </div>
      </div>

      {/* targets */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1"><Crosshair className="size-3" />{bi(L.targetIp)}</span>
          <Input dir="ltr" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="192.168.1.10" className="h-8 text-xs font-mono" />
        </div>
        <AnimatePresence initial={false}>
          {kind === "arpspoof" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-[auto_1fr] items-center gap-2 pb-1">
                <span className="text-[10.5px] text-muted-foreground">{bi(L.victimIp)}</span>
                <Input dir="ltr" value={victim} onChange={(e) => setVictim(e.target.value)} placeholder="192.168.1.1" className="h-8 text-xs font-mono" />
              </div>
              <div className="text-[9.5px] text-muted-foreground pb-1">{bi(L.victimHint)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-1.5">
        <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={launch} disabled={!attackerIp}>
          <Play className="size-3.5" /> {bi(L.launch)}
        </Button>
        {device.attack && (
          <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" onClick={stop}>
            <Square className="size-3.5" /> {bi(L.stop)}
          </Button>
        )}
        <Button size="sm" variant="secondary" className="h-8 gap-1.5 text-xs" onClick={runReport} disabled={!device.attack}>
          <ShieldAlert className="size-3.5" /> {bi(L.runReport)}
        </Button>
      </div>

      {/* cli echo */}
      {echo.length > 0 && (
        <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-2 text-[10.5px] font-mono text-emerald-300" dir="ltr" style={{ whiteSpace: "pre-wrap" }}>
          {echo.join("\n")}
        </div>
      )}

      {/* live attack state */}
      <div className="rounded-lg border p-2.5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black">{bi(L.state)}</span>
          {device.attack ? (
            <Badge className="text-[9px] gap-1 bg-emerald-600 hover:bg-emerald-600">{bi(L.active)}</Badge>
          ) : (
            <Badge variant="outline" className="text-[9px] text-muted-foreground">{bi(L.idle)}</Badge>
          )}
        </div>
        {device.attack ? (
          <div className="text-[10.5px] font-mono" dir="ltr">
            {device.attack.kind} → {device.attack.targetIp}
            {device.attack.victimIp ? ` (spoof ${device.attack.victimIp})` : ""}
          </div>
        ) : (
          <div className="text-[10px] text-muted-foreground">{bi(L.tune)}</div>
        )}
      </div>

      {/* simulation report */}
      <AnimatePresence>
        {report && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {report.sent === 0 ? (
              <Alert variant="destructive">
                <ShieldAlert className="size-4" />
                <AlertTitle className="text-xs">{bi(L.noPackets)}</AlertTitle>
                <AlertDescription className="text-[11px]">{bi(L.noPacketsHint)}</AlertDescription>
              </Alert>
            ) : (
              <Alert variant={report.blocked || (!report.targetDown && !report.intercepted) ? "default" : "destructive"}>
                <ShieldAlert className="size-4" />
                <AlertTitle className="text-xs">
                  {(report.blocked || (!report.targetDown && !report.intercepted)) ? bi(L.defended) : bi(L.leaked)}
                  {report.blocked ? ` — ${bi(L.blocked)}` : ""}
                </AlertTitle>
                <AlertDescription className="text-[11px] space-y-1">
                  <div className="flex flex-wrap gap-x-3 font-mono" dir="ltr">
                    <span>{bi(L.sent)}: {report.sent}</span>
                    <span>{bi(L.reached)}: {report.reached}</span>
                    <span>{bi(L.alerts)}: {report.alerts}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {report.targetDown && <Badge variant="destructive" className="text-[9px]">{bi(L.targetDown)}</Badge>}
                    {report.intercepted && <Badge variant="destructive" className="text-[9px]">{bi(L.intercepted)}</Badge>}
                    {report.blocked && <Badge className="text-[9px] bg-emerald-600 hover:bg-emerald-600">{bi(L.blocked)}</Badge>}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
