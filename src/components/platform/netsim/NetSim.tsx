"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2, Trash2, Cable, Radar, Globe, HandCoins, Play, Pause, SkipBack,
  SkipForward, RotateCcw, Save, FolderOpen, Download, Upload, FlaskConical, Info,
  MessageSquareText, Eraser, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import type { Bi } from "@/lib/types";
import type { Device, SimStep, Topology } from "@/lib/netsim/types";
import { DEVICE_SPECS, LINK_SPECS } from "@/lib/netsim/types";
import {
  createDevice, autoCable, connectPorts, simulatePing, simulateDhcp, simulateDns,
  simulateHttp, findDevice, findPort,
} from "@/lib/netsim/engine";
import { NETSIM_LABS } from "@/lib/netsim/labs";
import { DeviceIcon, linkStyle, protoColor } from "./icons";
import DeviceDialog, { type NetSimActions } from "./DeviceDialog";
import PduDialog from "./PduDialog";

type Tool = "select" | "delete" | "link" | "ping" | "dhcp" | "http";

const CATEGORY_LABEL: Record<string, Bi> = {
  end: { ar: "الأجهزة الطرفية", en: "End Devices" },
  network: { "en": "Network Devices", ar: "أجهزة الشبكة" },
  wireless: { ar: "اللاسلكي", en: "Wireless" },
  wan: { ar: "WAN", en: "WAN" },
};

const CANVAS_W = 1040;
const CANVAS_H = 600;

export default function NetSim() {
  const { lang, bi, t } = useLang();
  const markUsed = useProgress((s) => s.markPlaygroundUsed);
  useEffect(() => { markUsed("netsim"); }, [markUsed]);

  const [topo, setTopo] = useState<Topology>({ devices: [], links: [] });
  const topoRef = useRef(topo);
  topoRef.current = topo;
  const [tool, setTool] = useState<Tool>("select");
  const [linkSrc, setLinkSrc] = useState<string | null>(null);
  const [pingSrc, setPingSrc] = useState<string | null>(null);
  const [httpDev, setHttpDev] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [openDevId, setOpenDevId] = useState<string | null>(null);
  const [sim, setSim] = useState<{ steps: SimStep[]; idx: number; playing: boolean; note: Bi | null; success: boolean } | null>(null);
  const simRef = useRef(sim);
  simRef.current = sim;
  const [pduStep, setPduStep] = useState<SimStep | null>(null);
  const [speed, setSpeed] = useState(1);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number; moved: boolean } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // autosave
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nm-netsim");
      if (saved) {
        const parsed = JSON.parse(saved) as Topology;
        if (parsed?.devices?.length) setTopo(parsed);
        else setTopo(NETSIM_LABS[0].build());
      } else {
        setTopo(NETSIM_LABS[0].build());
      }
    } catch {
      setTopo(NETSIM_LABS[0].build());
    }
  }, []);

  const commitDevices = useCallback((devices: Device[]) => {
    setTopo((t) => ({ devices, links: t.links }));
  }, []);

  const runSim = useCallback(
    (steps: SimStep[], devices: Device[], note: Bi | null, success: boolean, autoplay = true) => {
      setSim({ steps, idx: 0, playing: autoplay && steps.length > 0, note, success });
      if (steps.length > 0) {
        commitDevices(devices);
        setShowPanel(true);
      }
    },
    [commitDevices]
  );

  const actions: NetSimActions = useMemo(() => ({
    updateDevice: () => setTopo((t) => ({ devices: [...t.devices], links: t.links })),
    runPing: (srcId, ip) => {
      const r = simulatePing(topoRef.current, srcId, ip);
      runSim(r.steps, r.devices, r.note, r.success);
      const lines = r.success
        ? [
            `Reply from ${ip}: bytes=32 time${lang === "ar" ? "≈" : "≈"}1ms TTL=${128 - Math.max(0, r.steps.filter((s) => s.outPort && s.deviceId !== srcId).length - 1)}`,
            `Reply from ${ip}: bytes=32 time≈1ms`,
            lang === "ar" ? "نجح: 4/4 — Ping يعمل" : "Success: 4/4 — ping working",
          ]
        : [lang === "ar" ? "انتهت المهلة: الطلب لم يجد طريقه — راجع لوحة المحاكاة" : "Request timed out — check the simulation panel"];
      return lines;
    },
    runDhcp: (clientId) => {
      const r = simulateDhcp(topoRef.current, clientId);
      runSim(r.steps, r.devices, r.note, r.success);
      const d = findDevice({ devices: r.devices, links: [] }, clientId);
      return r.success
        ? [lang === "ar" ? `استلمت ${d?.ports.find((p) => p.ip)?.ip ?? ""} بوابة ${d?.gateway ?? "-"} DNS ${d?.dnsServer ?? "-"}` : `Got ${d?.ports.find((p) => p.ip)?.ip ?? ""} gw ${d?.gateway ?? "-"} dns ${d?.dnsServer ?? "-"}`]
        : [lang === "ar" ? "فشل DORA — تأكد من الخادم والكابلات" : "DORA failed — check server & cables"];
    },
    runDns: (srcId, name) => {
      const r = simulateDns(topoRef.current, srcId, name);
      runSim(r.steps, r.devices, r.note, r.success, false);
      return [r.success ? `${name} → ${r.resolvedIp}` : (lang === "ar" ? "تعذر الحل" : "Resolution failed")];
    },
    runHttp: (srcId, host) => {
      const r = simulateHttp(topoRef.current, srcId, host);
      runSim(r.steps, r.devices, r.note, r.success, false);
      return { lines: [bi(r.note)], page: r.page };
    },
  }), [lang, bi, runSim]);

  // playback
  useEffect(() => {
    if (!sim?.playing) return;
    if (sim.idx >= sim.steps.length - 1) {
      setSim((s) => (s ? { ...s, playing: false } : s));
      return;
    }
    const dur = Math.max(220, 1150 / speed);
    const timer = setTimeout(() => {
      setSim((s) => (s ? { ...s, idx: Math.min(s.steps.length - 1, s.idx + 1) } : s));
    }, dur);
    return () => clearTimeout(timer);
  }, [sim?.playing, sim?.idx, sim?.steps.length, speed]);

  // ── device ops ──
  const addDevice = (kind: Device["kind"]) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = Math.min(CANVAS_W - 90, Math.max(20, (rect?.width ?? 800) / 2 - 40 + (Math.random() * 120 - 60)));
    const y = Math.min(CANVAS_H - 90, Math.max(20, (rect?.height ?? 500) / 2 - 40 + (Math.random() * 120 - 60)));
    const dev = createDevice(kind, x, y, topoRef.current);
    setTopo((t) => ({ devices: [...t.devices, dev], links: t.links }));
    toast({ title: `${dev.name} ${lang === "ar" ? "أُضيف" : "added"}` });
  };

  const deleteDevice = (id: string) => {
    setTopo((t) => {
      const links = t.links.filter((l) => l.a.deviceId !== id && l.b.deviceId !== id);
      for (const d of t.devices) {
        if (d.id === id) continue;
        for (const p of d.ports) if (p.linkId && !links.find((l) => l.id === p.linkId)) p.linkId = null;
      }
      return { devices: t.devices.filter((d) => d.id !== id), links };
    });
    setSim(null);
  };

  const deleteLink = (linkId: string) => {
    setTopo((t) => {
      const links = t.links.filter((l) => l.id !== linkId);
      for (const d of t.devices) for (const p of d.ports) if (p.linkId === linkId) p.linkId = null;
      return { devices: t.devices, links };
    });
    setSim(null);
  };

  // ── canvas interactions ──
  const onDevicePointerDown = (e: React.PointerEvent, dev: Device) => {
    if (tool !== "select") return;
    const rect = canvasRef.current!.getBoundingClientRect();
    setDrag({ id: dev.id, dx: e.clientX - rect.left - dev.x, dy: e.clientY - rect.top - dev.y, moved: false });
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onCanvasPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(8, Math.min(CANVAS_W - 80, e.clientX - rect.left - drag.dx));
    const y = Math.max(8, Math.min(CANVAS_H - 70, e.clientY - rect.top - drag.dy));
    if (Math.abs(x - (findDevice(topo, drag.id)?.x ?? 0)) > 2 || Math.abs(y - (findDevice(topo, drag.id)?.y ?? 0)) > 2) drag.moved = true;
    setTopo((t) => ({
      devices: t.devices.map((d) => (d.id === drag.id ? { ...d, x, y } : d)),
      links: t.links,
    }));
  };

  const onDeviceClick = (dev: Device) => {
    if (tool === "select") {
      if (drag?.moved) return;
      setOpenDevId(dev.id);
    } else if (tool === "delete") {
      deleteDevice(dev.id);
    } else if (tool === "link") {
      if (!linkSrc) {
        setLinkSrc(dev.id);
        toast({ title: `${dev.name}: ${lang === "ar" ? "اختر الجهاز الثاني للربط" : "pick the second device to connect"}` });
      } else if (linkSrc === dev.id) {
        setLinkSrc(null);
      } else {
        const t = topoRef.current;
        const auto = autoCable(t, linkSrc, dev.id);
        if (!auto) {
          toast({ title: lang === "ar" ? "لا منافذ متوافقة حرة" : "No compatible free ports", variant: "destructive" });
        } else {
          const link = connectPorts(t, linkSrc, auto.aPortId, dev.id, auto.bPortId, auto.kind);
          if (link) {
            setTopo({ devices: [...t.devices], links: [...t.links] });
            toast({ title: `${dev.name} ↔ ${findDevice(t, linkSrc)?.name} — ${bi(LINK_SPECS.find((l) => l.kind === link.kind)!.nameBi)}` });
          }
        }
        setLinkSrc(null);
      }
    } else if (tool === "ping") {
      if (!pingSrc) {
        const hasIp = dev.ports.some((p) => p.ip) || dev.staticIp;
        setPingSrc(dev.id);
        toast({ title: hasIp ? `${dev.name}: ${lang === "ar" ? "اختر الهدف" : "now pick the target"}` : `${dev.name} ${lang === "ar" ? "بلا IP!" : "has no IP!"}`, variant: hasIp ? "default" : "destructive" });
      } else {
        actions.runPing(pingSrc, dev.id);
        setPingSrc(null);
      }
    } else if (tool === "dhcp") {
      actions.runDhcp(dev.id);
    } else if (tool === "http") {
      setHttpDev(dev.id);
    }
  };

  // ── persistence ──
  const save = () => {
    localStorage.setItem("nm-netsim", JSON.stringify(topo));
    toast({ title: t("copied") + " ✔ " + (lang === "ar" ? "حُفظ المخطط محلياً" : "topology saved locally") });
  };
  const loadSaved = () => {
    const raw = localStorage.getItem("nm-netsim");
    if (raw) {
      setTopo(JSON.parse(raw) as Topology);
      toast({ title: lang === "ar" ? "تم التحميل" : "loaded" });
    } else toast({ title: lang === "ar" ? "لا مخطط محفوظ" : "no saved topology" });
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(topo, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "netsim-topology.json";
    a.click();
  };
  const importJson = (f: File) => {
    f.text().then((txt) => {
      try {
        const parsed = JSON.parse(txt) as Topology;
        if (Array.isArray(parsed.devices) && Array.isArray(parsed.links)) {
          setTopo(parsed);
          toast({ title: lang === "ar" ? "تم الاستيراد" : "imported" });
        } else throw new Error();
      } catch {
        toast({ title: lang === "ar" ? "ملف غير صالح" : "invalid file", variant: "destructive" });
      }
    });
  };

  const currentStep = sim && sim.idx < sim.steps.length ? sim.steps[sim.idx] : null;
  const openDevice = openDevId ? findDevice(topo, openDevId) : null;

  const envelope = useMemo(() => {
    if (!currentStep || !sim?.playing && sim?.idx === 0 && !sim.steps.length) return null;
    if (!currentStep) return null;
    const srcD = findDevice(topo, currentStep.deviceId);
    if (!currentStep.linkId || !currentStep.toDeviceId) return null;
    const dstD = findDevice(topo, currentStep.toDeviceId);
    if (!srcD || !dstD) return null;
    return { x1: srcD.x + 30, y1: srcD.y + 22, x2: dstD.x + 30, y2: dstD.y + 22, proto: currentStep.packet.proto };
     
  }, [currentStep?.id]);

  const tools: { id: Tool; icon: React.ElementType; label: Bi }[] = [
    { id: "select", icon: MousePointer2, label: { ar: "تحديد/تحريك", en: "Select/Move" } },
    { id: "delete", icon: Trash2, label: { ar: "حذف", en: "Delete" } },
    { id: "link", icon: Cable, label: { ar: "ربط كابل (تلقائي)", en: "Connect cable (auto)" } },
    { id: "ping", icon: Radar, label: { ar: "Ping (PDU بسيط)", en: "Ping (Simple PDU)" } },
    { id: "dhcp", icon: HandCoins, label: { ar: "طلب DHCP", en: "DHCP request" } },
    { id: "http", icon: Globe, label: { ar: "متصفح/HTTP", en: "Browser/HTTP" } },
  ];

  const palette = (
    <div className="flex gap-1.5 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden lg:flex-col lg:gap-0.5 p-1.5">
      {(["end", "network", "wireless", "wan"] as const).map((cat) => (
        <div key={cat} className="shrink-0">
          <div className="text-[9.5px] font-black text-muted-foreground px-1 pt-1.5 pb-0.5 uppercase">{bi(CATEGORY_LABEL[cat])}</div>
          <div className="flex lg:flex-col gap-1">
            {DEVICE_SPECS.filter((s) => s.category === cat).map((spec) => (
              <button
                key={spec.kind}
                onClick={() => addDevice(spec.kind)}
                title={bi(spec.descBi)}
                className="group flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 hover:border-primary hover:bg-accent transition-colors shrink-0"
              >
                <DeviceIcon kind={spec.kind} size={26} />
                <span className="hidden lg:block text-[10.5px] font-bold text-start leading-tight">{bi(spec.nameBi)}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* header */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
            <FlaskConical className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-black leading-tight">{lang === "ar" ? "محاكي الشبكات التفاعلي" : "Interactive Network Simulator"}</h2>
            <p className="text-[10.5px] text-muted-foreground">{lang === "ar" ? "مثل Cisco Packet Tracer — عربي بالكامل" : "Like Cisco Packet Tracer"}</p>
          </div>
        </div>
        <div className="ms-auto flex flex-wrap items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <FlaskConical className="size-3.5" /> {lang === "ar" ? "المعامل الجاهزة" : "Labs"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="text-xs">{lang === "ar" ? "حمّل سيناريو جاهزاً" : "Load a ready scenario"}</DropdownMenuLabel>
              {NETSIM_LABS.map((lab) => (
                <DropdownMenuItem key={lab.id} onClick={() => { setTopo(lab.build()); setSim(null); toast({ title: bi(lab.title), description: bi(lab.goal) }); }}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{bi(lab.title)}</span>
                    <span className="text-[10px] text-muted-foreground">{bi(lab.goal).slice(0, 80)}…</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={save}><Save className="size-3.5" />{lang === "ar" ? "حفظ" : "Save"}</Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={loadSaved}><FolderOpen className="size-3.5" />{lang === "ar" ? "تحميل" : "Load"}</Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={exportJson}><Download className="size-3.5" /></Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => fileRef.current?.click()}><Upload className="size-3.5" /></Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => { setTopo({ devices: [], links: [] }); setSim(null); }}><Eraser className="size-3.5" /></Button>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border bg-card p-1.5">
        {tools.map((tt) => (
          <button
            key={tt.id}
            onClick={() => { setTool(tt.id); setLinkSrc(null); setPingSrc(null); }}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-colors
              ${tool === tt.id ? "bg-primary text-primary-foreground glow-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
            title={bi(tt.label)}
          >
            <tt.icon className="size-4" />
            <span className="hidden sm:inline">{bi(tt.label)}</span>
          </button>
        ))}
        <div className="ms-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{topo.devices.length} {lang === "ar" ? "جهاز" : "devices"}</span>
          <span>· {topo.links.length} {lang === "ar" ? "وصلة" : "links"}</span>
        </div>
        <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={() => setPaletteOpen((v) => !v)}>
          <Cable className="size-3.5" /> {lang === "ar" ? "الأجهزة" : "Devices"}
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={() => setShowPanel((v) => !v)}>
          <MessageSquareText className="size-3.5" /> {lang === "ar" ? "المحاكاة" : "Simulation"}
          {sim && <span className="size-1.5 rounded-full bg-primary dot-ping relative" />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* palette desktop */}
        <div className="hidden lg:block w-36 shrink-0 rounded-xl border bg-sidebar h-fit">
          {palette}
        </div>
        {paletteOpen && (
          <div className="lg:hidden rounded-xl border bg-sidebar">{palette}</div>
        )}

        {/* canvas */}
        <div className="relative flex-1 min-w-0 rounded-xl border overflow-hidden bg-background">
          <div
            ref={canvasRef}
            className="net-grid-bg relative overflow-auto"
            style={{ height: 560 }}
            onPointerMove={onCanvasPointerMove}
            onPointerUp={() => setDrag(null)}
            onPointerLeave={() => setDrag(null)}
          >
            <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
              {/* links */}
              <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H}>
                {topo.links.map((l) => {
                  const a = findDevice(topo, l.a.deviceId);
                  const b = findDevice(topo, l.b.deviceId);
                  if (!a || !b) return null;
                  const isCurrent = currentStep?.linkId === l.id;
                  const st = linkStyle(l.kind);
                  return (
                    <g key={l.id}>
                      <line
                        x1={a.x + 30} y1={a.y + 22} x2={b.x + 30} y2={b.y + 22}
                        stroke={isCurrent ? "#fbbf24" : st.color}
                        strokeWidth={isCurrent ? st.width + 2.5 : st.width}
                        strokeDasharray={st.dash}
                        strokeLinecap="round"
                        style={isCurrent ? { filter: "drop-shadow(0 0 6px #fbbf24)" } : undefined}
                      />
                      {tool === "delete" && (
                        <line
                          x1={a.x + 30} y1={a.y + 22} x2={b.x + 30} y2={b.y + 22}
                          stroke="transparent" strokeWidth={16} style={{ pointerEvents: "stroke", cursor: "pointer" }}
                          onClick={() => deleteLink(l.id)}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* devices */}
              {topo.devices.map((dev) => {
                const active = currentStep && (currentStep.deviceId === dev.id || currentStep.toDeviceId === dev.id);
                const isLinkSrc = linkSrc === dev.id || pingSrc === dev.id;
                return (
                  <button
                    key={dev.id}
                    className={`absolute flex flex-col items-center gap-0.5 rounded-xl p-1.5 border transition-shadow
                      ${active ? "border-primary shadow-lg glow-primary bg-primary/10" : isLinkSrc ? "border-primary border-dashed bg-accent" : "border-transparent hover:border-border hover:bg-accent/50"}
                      ${tool === "delete" ? "hover:border-destructive" : ""}`}
                    style={{ left: dev.x, top: dev.y, cursor: tool === "select" ? "grab" : "pointer", touchAction: "none" }}
                    onPointerDown={(e) => onDevicePointerDown(e, dev)}
                    onClick={() => onDeviceClick(dev)}
                    title={dev.name}
                  >
                    <DeviceIcon kind={dev.kind} size={44} />
                    <span className="text-[10px] font-black text-foreground/90 bg-background/70 rounded px-1 leading-tight">{dev.name}</span>
                  </button>
                );
              })}

              {/* animated envelope */}
              {envelope && currentStep && (
                <motion.div
                  key={`${currentStep.id}-env`}
                  initial={{ left: envelope.x1, top: envelope.y1, opacity: 0.4 }}
                  animate={{ left: envelope.x2, top: envelope.y2, opacity: 1 }}
                  transition={{ duration: Math.max(0.22, 1.05 / speed), ease: "linear" }}
                  className="absolute z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className="w-6 h-5 rounded-[4px] border-2 flex items-center justify-center text-[8px] font-black text-white"
                    style={{ background: protoColor(envelope.proto), borderColor: "#fff" }}
                  >
                    {envelope.proto.slice(0, 3)}
                  </div>
                </motion.div>
              )}

              {/* processing pulse */}
              {currentStep && !currentStep.linkId && (
                <motion.div
                  key={`${currentStep.id}-pulse`}
                  initial={{ scale: 0.6, opacity: 0.8 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute z-10 pointer-events-none size-16 rounded-full border-2"
                  style={{ left: (findDevice(topo, currentStep.deviceId)?.x ?? 0) + 22, top: (findDevice(topo, currentStep.deviceId)?.y ?? 0) + 14, borderColor: protoColor(currentStep.packet.proto) }}
                />
              )}

              {/* empty hint */}
              {topo.devices.length === 0 && (
                <div className="absolute inset-0 grid place-items-center pointer-events-none">
                  <div className="text-center space-y-1">
                    <Info className="size-8 mx-auto text-muted-foreground" />
                    <div className="text-xs font-bold text-muted-foreground">
                      {lang === "ar" ? "اسحب/أضف أجهزة من اللوحة ثم اربطها بأداة الكابل" : "Add devices from the palette then connect them with the cable tool"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* simulation panel */}
        {showPanel && (
          <div className="w-full lg:w-72 shrink-0 rounded-xl border bg-card overflow-hidden flex flex-col" style={{ maxHeight: 588 }}>
            <div className="flex items-center justify-between border-b px-3 py-2">
              <span className="text-xs font-black">{lang === "ar" ? "لوحة المحاكاة" : "Simulation Panel"}</span>
              <Button variant="ghost" size="icon" className="size-6" onClick={() => setShowPanel(false)}><X className="size-3.5" /></Button>
            </div>
            {sim ? (
              <>
                <div className="flex items-center gap-1 px-2 py-2 border-b">
                  <Button size="icon" variant="outline" className="size-7" onClick={() => setSim((s) => (s ? { ...s, idx: 0, playing: false } : s))}><SkipBack className="size-3.5" /></Button>
                  <Button size="icon" variant="outline" className="size-7" onClick={() => setSim((s) => (s ? { ...s, idx: Math.max(0, s.idx - 1), playing: false } : s))}><RotateCcw className="size-3.5" /></Button>
                  <Button size="icon" className="size-7 glow-primary" onClick={() => setSim((s) => (s ? { ...s, playing: !s.playing } : s))}>
                    {sim.playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                  </Button>
                  <Button size="icon" variant="outline" className="size-7" onClick={() => setSim((s) => (s ? { ...s, idx: Math.min(s.steps.length - 1, s.idx + 1), playing: false } : s))}><SkipForward className="size-3.5" /></Button>
                  <div className="ms-1 flex items-center gap-1.5 flex-1">
                    <span className="text-[9px] text-muted-foreground shrink-0">×{speed.toFixed(1)}</span>
                    <Slider value={[speed]} min={0.25} max={4} step={0.25} onValueChange={(v) => setSpeed(v[0])} className="flex-1" />
                  </div>
                </div>
                <div className="px-3 py-1.5 border-b text-[10.5px] flex items-center justify-between">
                  <span className="text-muted-foreground">{sim.idx + 1} / {sim.steps.length}</span>
                  <Badge variant={sim.success ? "default" : "destructive"} className="text-[9px] px-1.5">
                    {sim.success ? (lang === "ar" ? "نجاح" : "Success") : (lang === "ar" ? "انتبه" : "Check")}
                  </Badge>
                </div>
                <ScrollArea className="flex-1 min-h-0" style={{ height: 380 }}>
                  <div className="p-1.5 space-y-0.5">
                    {sim.steps.map((st, i) => (
                      <button
                        key={st.id}
                        onClick={() => { setSim((s) => (s ? { ...s, idx: i, playing: false } : s)); setPduStep(st); }}
                        className={`w-full text-start rounded-lg px-2 py-1.5 border transition-colors
                          ${i === sim.idx ? "border-primary bg-accent" : "border-transparent hover:bg-muted/60"} ${st.dropped ? "opacity-90" : ""}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono text-muted-foreground w-5 shrink-0">{i + 1}</span>
                          <span className="inline-flex rounded px-1 py-px text-[8.5px] font-black text-white shrink-0" style={{ background: protoColor(st.packet.proto) }}>
                            {st.packet.proto}
                          </span>
                          <span className={`text-[10.5px] font-bold truncate ${st.dropped ? "text-destructive" : ""}`}>
                            {st.deviceName}{st.inPort ? ` (${st.inPort})` : ""}
                          </span>
                        </div>
                        <div className="text-[9.5px] text-muted-foreground leading-snug ps-6 line-clamp-2">
                          {st.info && (st.info.ar || st.info.en) ? bi(st.info) : `${lang === "ar" ? "انتقال عبر الوصلة إلى" : "traversing link to"} ${findDevice(topo, st.toDeviceId ?? "")?.name ?? "?"}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
                {sim.note && (
                  <div className={`px-3 py-2 text-[10.5px] font-semibold border-t ${sim.success ? "text-emerald-600 bg-emerald-500/10" : "text-amber-600 bg-amber-500/10"}`}>
                    {bi(sim.note)}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-[11px] text-muted-foreground text-center space-y-2">
                <MessageSquareText className="size-7 mx-auto opacity-50" />
                <p>{lang === "ar" ? "اختر أداة Ping ثم انقر جهازاً مصدراً وآخر هدفاً لبدء المحاكاة." : "Pick the Ping tool then click a source device and a target to start simulating."}</p>
                <p>{lang === "ar" ? "كل خطوة قابلة للنقر لفحص الحزمة طبقة-بطبقة." : "Every step is clickable to inspect the PDU layer-by-layer."}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
        {LINK_SPECS.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 h-0.5 rounded" style={{ background: linkStyle(l.kind).color }} />
            {bi(l.nameBi)}
          </span>
        ))}
        <span className="ms-auto inline-flex items-center gap-1">
          <Info className="size-3" />
          {lang === "ar" ? "انقر أي خطوة في لوحة المحاكاة لعرض PDU" : "Click any sim step to open PDU info"}
        </span>
      </div>

      <DeviceDialog device={openDevice ?? null} onClose={() => setOpenDevId(null)} actions={actions} />
      <PduDialog step={pduStep} onClose={() => setPduStep(null)} />

      {/* HTTP URL prompt */}
      <Dialog open={!!httpDev} onOpenChange={(o) => !o && setHttpDev(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">{lang === "ar" ? "فتح موقع" : "Open site"}</DialogTitle>
            <DialogDescription className="text-xs">
              {lang === "ar" ? "اكتب اسم الموقع (يُحل عبر DNS ثم HTTP)" : "Type the site name (DNS then HTTP)"}
            </DialogDescription>
          </DialogHeader>
          <Input
            dir="ltr"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="net.local"
            className="font-mono text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter" && httpDev && urlInput.trim()) {
                const r = actions.runHttp(httpDev, urlInput.trim());
                setHttpDev(null);
                toast({ title: r.lines[0] });
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setHttpDev(null)}>{t("cancel")}</Button>
            <Button size="sm" onClick={() => {
              if (httpDev && urlInput.trim()) {
                const r = actions.runHttp(httpDev, urlInput.trim());
                setHttpDev(null);
                toast({ title: r.lines[0] });
              }
            }}>{lang === "ar" ? "اذهب" : "Go"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
