"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2, Trash2, Cable, Radar, Globe, HandCoins, Play, Pause, SkipBack,
  SkipForward, RotateCcw, Save, FolderOpen, Upload, FlaskConical, Info,
  MessageSquareText, Eraser, X, Sparkles, Bot, SlidersHorizontal, Skull, Shield, Network, Cpu,
  ZoomIn, ZoomOut, Maximize2, Expand, Minimize, Route, Search, Maximize, HardDriveDownload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import type { Bi } from "@/lib/types";
import type { Device, SimStep, Topology, AttackReport, LinkKind } from "@/lib/netsim/types";
import { DEVICE_SPECS, LINK_SPECS } from "@/lib/netsim/types";
import {
  createDevice, autoCable, connectPorts, simulatePing, simulateDhcp, simulateDns,
  simulateHttp, simulateAttack, cloneTopo, resetMacCounterFor, findDevice, findPort,
  maskToPrefix, isHostKind, normalizeTopology,
} from "@/lib/netsim/engine";
import { runCliLine, runHostLine, initialCliState } from "@/lib/netsim/cli";
import { NETSIM_LABS } from "@/lib/netsim/labs";
import { DeviceIcon, linkStyle, protoColor } from "./icons";
import DeviceDialog, { type NetSimActions } from "./DeviceDialog";
import PduDialog from "./PduDialog";
import AiAssistantPanel from "./AiAssistantPanel";
import TopologyBuilderDialog, { type TopoPlan } from "./TopologyBuilderDialog";
import AttackPanel from "./AttackPanel";
import AclPanel from "./AclPanel";
import IdsPanel from "./IdsPanel";
import ExportMenu from "./ExportMenu";

type Tool = "select" | "delete" | "link" | "ping" | "traceroute" | "dhcp" | "http";

type View = { x: number; y: number; scale: number };
const MIN_SCALE = 0.35;
const MAX_SCALE = 2.5;
const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

const CATEGORY_LABEL: Record<string, Bi> = {
  end: { ar: "الأجهزة الطرفية", en: "End Devices" },
  network: { "en": "Network Devices", ar: "أجهزة الشبكة" },
  wireless: { ar: "اللاسلكي", en: "Wireless" },
  wan: { ar: "WAN", en: "WAN" },
  security: { ar: "الأمن", en: "Security" },
  iot: { ar: "طرفيات وأجهزة ذكية", en: "Peripherals & IoT" },
};
const CATEGORY_ORDER = ["end", "network", "wireless", "wan", "security", "iot"] as const;

const CANVAS_W = 2400;
const CANVAS_H = 1400;

/** 11-e: versioned localStorage key for `copy running-config startup-config` snapshots */
const STARTUP_KEY = "netsim-startup-config";

/** device kinds that open the dedicated security side panel on click */
const SEC_KINDS: Device["kind"][] = ["attacker", "firewall", "l3switch", "ids"];
/** kinds whose "commands" run through runCliLine (mirrors cli.ts isRouterLike) */
const CLI_KINDS: Device["kind"][] = ["router", "wirelessRouter", "switch", "hub", "firewall", "l3switch", "ids"];

const SEC_ICON: Record<string, React.ElementType> = { attacker: Skull, firewall: Shield, l3switch: Network, ids: Cpu };

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
  const rootRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── v3: canvas pan / zoom / pinch view state ──
  const [view, setView] = useState<View>({ x: 0, y: 0, scale: 1 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const [isFs, setIsFs] = useState(false); // document fullscreen
  const [expanded, setExpanded] = useState(false); // tall canvas within the page
  const expandedRef = useRef(false);
  expandedRef.current = expanded;
  const pendingFit = useRef(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const panRef = useRef<{ px: number; py: number; vx: number; vy: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number; wx: number; wy: number } | null>(null);

  // ── v3: traceroute hops + manual link-kind dialog + palette search ──
  const [traceSrc, setTraceSrc] = useState<string | null>(null);
  const [trace, setTrace] = useState<{ src: string; dst: string; hops: { name: string; ttl: number; dropped: boolean }[] } | null>(null);
  const [linkDialog, setLinkDialog] = useState<{ a: string; b: string } | null>(null);
  const [paletteQ, setPaletteQ] = useState("");
  const [panning, setPanning] = useState(false); // cursor feedback grab/grabbing
  const dragMovedRef = useRef(false); // survives pointerup (unlike the drag state) so click-after-drag never opens dialogs

  // ── v2: AI panels + security panel state ──
  const [aiOpen, setAiOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [secDevId, setSecDevId] = useState<string | null>(null);

  // ── 11-e: startup-config resume offer + restored-router console banner ──
  const [startupOffer, setStartupOffer] = useState<{ savedAt: string } | null>(null);
  const [bootBanner, setBootBanner] = useState<string[] | null>(null);

  const resumeStartup = useCallback(() => {
    try {
      const raw = localStorage.getItem(STARTUP_KEY);
      if (raw) {
        const snap = JSON.parse(raw) as { version?: number; savedAt?: string; topo?: Topology };
        if (snap?.topo && Array.isArray(snap.topo.devices) && Array.isArray(snap.topo.links)) {
          resetMacCounterFor(snap.topo);
          pendingFit.current = true;
          setTopo(normalizeTopology(snap.topo));
          setSim(null);
          setTrace(null);
          const when = snap.savedAt ? new Date(snap.savedAt).toLocaleString() : "";
          setBootBanner([`%STARTUP-CONFIG: restored from flash${when ? ` (saved ${when})` : ""}`]);
          toast({ title: lang === "ar" ? `استُعيد startup-config (${snap.topo.devices.length} جهازاً)` : `startup-config restored (${snap.topo.devices.length} devices)` });
        }
      }
    } catch {
      toast({ title: lang === "ar" ? "ملف startup-config غير صالح" : "invalid startup-config snapshot", variant: "destructive" });
    }
    setStartupOffer(null);
  }, [lang]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STARTUP_KEY);
      if (raw) {
        const snap = JSON.parse(raw) as { savedAt?: string; topo?: Topology };
        if (snap?.topo?.devices?.length) setStartupOffer({ savedAt: snap.savedAt ?? "" });
      }
    } catch {
      /* snapshot unreadable — offer nothing */
    }
  }, []);
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const fn = () => setIsDesktop(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // ── v3: view helpers — fit topology bounding box into the viewport ──
  const fitView = useCallback((t?: Topology) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const devs = (t ?? topoRef.current).devices;
    const pad = 40;
    if (devs.length === 0 || rect.width < 40 || rect.height < 40) {
      setView({ x: 0, y: 0, scale: 1 });
      return;
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const d of devs) {
      minX = Math.min(minX, d.x); minY = Math.min(minY, d.y);
      maxX = Math.max(maxX, d.x + 76); maxY = Math.max(maxY, d.y + 60);
    }
    const bw = Math.max(160, maxX - minX);
    const bh = Math.max(120, maxY - minY);
    const scale = clampScale(Math.min((rect.width - pad * 2) / bw, (rect.height - pad * 2) / bh));
    setView({
      scale,
      x: Math.round((rect.width - bw * scale) / 2 - minX * scale),
      y: Math.round((rect.height - bh * scale) / 2 - minY * scale),
    });
  }, []);

  const zoomAt = useCallback((factor: number, sx: number, sy: number) => {
    setView((v) => {
      const scale = clampScale(v.scale * factor);
      const wx = (sx - v.x) / v.scale;
      const wy = (sy - v.y) / v.scale;
      return { scale, x: sx - wx * scale, y: sy - wy * scale };
    });
  }, []);

  const zoomCenter = useCallback((factor: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    zoomAt(factor, rect.width / 2, rect.height / 2);
  }, [zoomAt]);

  const resetView = useCallback(() => setView({ x: 0, y: 0, scale: 1 }), []);

  // wheel zoom toward the cursor — registered NON-passive so preventDefault works
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * 0.0016);
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      setView((v) => {
        const scale = clampScale(v.scale * factor);
        const wx = (sx - v.x) / v.scale;
        const wy = (sy - v.y) / v.scale;
        return { scale, x: sx - wx * scale, y: sy - wy * scale };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // fullscreen tracking + refit when the viewport changes size
  useEffect(() => {
    const fn = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    return () => document.removeEventListener("fullscreenchange", fn);
  }, []);
  useEffect(() => {
    if (isFs || expanded) requestAnimationFrame(() => fitView());
  }, [isFs, expanded, fitView]);
  useEffect(() => {
    const onResize = () => {
      if (document.fullscreenElement || expandedRef.current) fitView();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [fitView]);

  // auto-fit after a fresh topology lands (lab load / import / AI plan / initial autosave)
  useEffect(() => {
    if (pendingFit.current) {
      pendingFit.current = false;
      requestAnimationFrame(() => fitView());
    }
  }, [topo, fitView]);

  const toggleFullscreen = () => {
    const el = rootRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      el.requestFullscreen?.().catch(() => {
        toast({ title: lang === "ar" ? "ملء الشاشة غير متاح هنا" : "Fullscreen unavailable here", variant: "destructive" });
      });
    }
  };

  // autosave
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nm-netsim");
      if (saved) {
        const parsed = JSON.parse(saved) as Topology;
        if (parsed?.devices?.length) { pendingFit.current = true; setTopo(parsed); }
        else { pendingFit.current = true; setTopo(NETSIM_LABS[0].build()); }
      } else {
        pendingFit.current = true;
        setTopo(NETSIM_LABS[0].build());
      }
    } catch {
      pendingFit.current = true;
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

  // ── 11-e realism: startup-config snapshot (copy run start / write memory) ──
  const saveStartupConfig = useCallback((): boolean => {
    try {
      localStorage.setItem(STARTUP_KEY, JSON.stringify({ version: 1, savedAt: new Date().toISOString(), topo: topoRef.current }));
      toast({ title: lang === "ar" ? "حُفظ startup-config في ذاكرة المحاكي" : "startup-config saved to simulated flash" });
      return true;
    } catch {
      toast({ title: lang === "ar" ? "تعذر الحفظ" : "Save failed", variant: "destructive" });
      return false;
    }
  }, [lang]);

  // ── 11-e realism: reload — clear volatile state, keep the config ──
  const reloadDevice = useCallback((devId: string) => {
    setTopo((t) => ({
      devices: t.devices.map((d) => (d.id === devId
        ? { ...d, arp: [], macTable: [], idsAlerts: [], statsIn: 0, statsDropped: 0, natTable: [], halfOpen: 0, overloaded: false, attack: null }
        : d)),
      links: t.links,
    }));
  }, []);

  const actions: NetSimActions = useMemo(() => ({
    updateDevice: () => setTopo((t) => ({ devices: [...t.devices], links: t.links })),
    runPing: (srcId, ip) => {
      setTrace(null); // hop list belongs to the latest traceroute only
      const t = topoRef.current;
      const r = simulatePing(t, srcId, ip);
      runSim(r.steps, r.devices, r.note, r.success);
      // 11-e realism: Cisco-accurate ping output — RTT scales with hop count, TTL = 128 - L3 hops
      const src = findDevice(t, srcId);
      const hostStyle = src ? isHostKind(src.kind) : true;
      const L3_KINDS = new Set(["router", "firewall", "l3switch", "wirelessRouter"]);
      const l3 = new Set<string>();
      for (const st of r.steps) {
        if (st.packet.kind !== "Echo Request" || st.deviceId === srcId) continue;
        const dev = findDevice(t, st.deviceId);
        if (dev && L3_KINDS.has(dev.kind)) l3.add(dev.id);
      }
      const hops = l3.size;
      const ttl = Math.max(1, 128 - hops);
      const count = hostStyle ? 4 : 5; // Windows hosts send 4, IOS sends 5
      const base = 1 + hops * 2;
      if (r.success) {
        const times = Array.from({ length: count }, () => Math.max(1, base + Math.floor(Math.random() * 3)));
        const min = Math.min(...times);
        const max = Math.max(...times);
        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        if (hostStyle) {
          return [
            ...times.map((tm) => `Reply from ${ip}: bytes=32 time=${tm}ms TTL=${ttl}`),
            "",
            `Ping statistics for ${ip}:`,
            `    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),`,
            "Approximate round trip times in milli-seconds:",
            `    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`,
          ];
        }
        return [
          ...times.map((tm) => `Reply from ${ip}: bytes=100 time=${tm}ms TTL=${ttl}`),
          `Success rate is 100 percent (${count}/${count}), round-trip min/avg/max = ${min}/${avg}/${max} ms`,
        ];
      }
      if (hostStyle) {
        return [
          ...Array.from({ length: count }, () => "Request timed out."),
          "",
          `Ping statistics for ${ip}:`,
          `    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss),`,
        ];
      }
      return [
        ...Array.from({ length: count }, () => "Request timed out."),
        `Success rate is 0 percent (0/${count})`,
      ];
    },
    runDhcp: (clientId) => {
      setTrace(null);
      const r = simulateDhcp(topoRef.current, clientId);
      runSim(r.steps, r.devices, r.note, r.success);
      const d = findDevice({ devices: r.devices, links: [] }, clientId);
      return r.success
        ? [lang === "ar" ? `استلمت ${d?.ports.find((p) => p.ip)?.ip ?? ""} بوابة ${d?.gateway ?? "-"} DNS ${d?.dnsServer ?? "-"}` : `Got ${d?.ports.find((p) => p.ip)?.ip ?? ""} gw ${d?.gateway ?? "-"} dns ${d?.dnsServer ?? "-"}`]
        : [lang === "ar" ? "فشل DORA — تأكد من الخادم والكابلات" : "DORA failed — check server & cables"];
    },
    runDns: (srcId, name) => {
      setTrace(null);
      const r = simulateDns(topoRef.current, srcId, name);
      runSim(r.steps, r.devices, r.note, r.success, false);
      return [r.success ? `${name} → ${r.resolvedIp}` : (lang === "ar" ? "تعذر الحل" : "Resolution failed")];
    },
    runHttp: (srcId, host) => {
      setTrace(null);
      const r = simulateHttp(topoRef.current, srcId, host);
      runSim(r.steps, r.devices, r.note, r.success, false);
      return { lines: [bi(r.note)], page: r.page };
    },
    saveStartupConfig,
    reloadDevice,
  }), [lang, bi, runSim, saveStartupConfig, reloadDevice]);

  // ── v2: attack simulation (feeds the sim panel + returns the report) ──
  const runAttackSim = useCallback(
    (attackerId: string): AttackReport | null => {
      setTrace(null);
      const r = simulateAttack(cloneTopo(topoRef.current), attackerId);
      runSim(r.steps, r.devices, r.note, r.success);
      return r.report;
    },
    [runSim]
  );

  // ── v2: AI topology builder — replace the topology with a generated plan ──
  const applyPlan = useCallback(
    (plan: TopoPlan) => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(); // fresh MAC space for the regenerated topology
      let cmdSkipped = 0;
      for (const pd of plan.devices) {
        const x = Math.min(CANVAS_W - 90, Math.max(12, pd.x));
        const y = Math.min(CANVAS_H - 80, Math.max(12, pd.y));
        const d = createDevice(pd.kind, x, y, t);
        t.devices.push(d);
        if (pd.label) d.name = pd.label.slice(0, 14);
        // interface addressing
        const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9/]/g, "");
        for (const [pid, val] of Object.entries(pd.ports ?? {})) {
          const p = findPort(d, pid) ?? d.ports.find((pp) => norm(pp.name) === norm(pid) || norm(pp.id) === norm(pid));
          if (p && Array.isArray(val)) {
            p.ip = typeof val[0] === "string" ? val[0] : null;
            p.mask = typeof val[1] === "string" ? val[1] : null;
          }
        }
        // host addressing
        if (Array.isArray(pd.host) && pd.host[0]) {
          const hp = d.ports.find((p) => p.kind !== "wireless") ?? d.ports[0];
          if (hp) {
            hp.ip = pd.host[0];
            hp.mask = pd.host[1] ?? "255.255.255.0";
          }
          d.dhcpClient = false;
          d.gateway = pd.host[2] ?? null;
          d.dnsServer = null;
        }
        // scripted commands (errors counted & ignored)
        if (pd.commands?.length) {
          const useCli = CLI_KINDS.includes(d.kind);
          const seq = useCli ? ["enable", "conf t", ...pd.commands, "end"] : pd.commands;
          let st = initialCliState;
          for (const line of seq) {
            if (useCli) {
              const r = runCliLine(d, line, st);
              st = r.state;
              if (r.lines.some((l) => l.startsWith("%"))) cmdSkipped += 1;
            } else {
              const r = runHostLine(d, line);
              if (r.lines.some((l) => l.startsWith("%"))) cmdSkipped += 1;
            }
          }
        }
      }
      // links
      let linksOk = 0;
      for (const l of plan.links ?? []) {
        const a = t.devices[l.a];
        const b = t.devices[l.b];
        if (!a || !b || a === b) continue;
        const auto = autoCable(t, a.id, b.id);
        if (!auto) continue;
        if (connectPorts(t, a.id, auto.aPortId, b.id, auto.bPortId, auto.kind)) linksOk += 1;
      }
      setSecDevId(null);
      setSim(null);
      pendingFit.current = true; // v3: auto-fit the view to the generated topology
      setTopo({ devices: [...t.devices], links: [...t.links] });
      if (cmdSkipped > 0) {
        toast({
          title: lang === "ar" ? `طُبّق المخطط — تجاوز ${cmdSkipped} أمراً غير مدعوم` : `Plan applied — skipped ${cmdSkipped} unsupported commands`,
        });
      }
      return { devices: t.devices.length, links: linksOk };
    },
    [lang]
  );

  // ── v2: AI assistant context — snapshot of the current topology ──
  const buildAiContext = useCallback((): string => {
    const t = topoRef.current;
    const lines: string[] = [`Topology: ${t.devices.length} devices, ${t.links.length} links.`];
    if (t.devices.length === 0) {
      lines.push("(canvas is empty)");
    } else {
      for (const d of t.devices.slice(0, 16)) {
        const parts: string[] = [`${d.name} (${d.kind})`];
        const ips = d.ports.filter((p) => p.ip).map((p) => `${p.id}=${p.ip}${p.mask ? "/" + maskToPrefix(p.mask) : ""}`);
        if (ips.length) parts.push(`ports: ${ips.join(", ")}`);
        if (isHostKind(d.kind)) {
          const hp = d.ports.find((p) => p.ip && p.kind !== "wireless");
          parts.push(`host: ${hp?.ip ?? "no-ip"}/${hp?.mask ?? "-"} gw=${d.gateway ?? "-"} dns=${d.dnsServer ?? "-"}${d.dhcpClient ? " [DHCP client]" : ""}`);
        }
        const statics = d.routes.filter((r) => r.kind === "static").map((r) => `${r.network}/${maskToPrefix(r.mask)}→${r.nextHop ?? r.iface}`);
        if (statics.length) parts.push(`static routes: ${statics.join(", ")}`);
        if (d.acls?.length) {
          parts.push(`acl: ${d.acls.map((r) => `${r.action} ${r.proto} ${r.src}→${r.dst}${r.port ? ":" + r.port : ""}`).join("; ")} default=${d.defaultDeny ? "deny" : "permit"}`);
        }
        if (d.attack) parts.push(`attack: ${d.attack.kind}→${d.attack.targetIp}${d.attack.victimIp ? ` spoof:${d.attack.victimIp}` : ""} ${d.attack.active ? "(active)" : "(stopped)"}`);
        lines.push("- " + parts.join(" | "));
      }
      const links = t.links.slice(0, 24).map((l) => {
        const a = findDevice(t, l.a.deviceId);
        const b = findDevice(t, l.b.deviceId);
        return `${a?.name ?? "?"}[${l.a.portId}]—${b?.name ?? "?"}[${l.b.portId}]`;
      });
      if (links.length) lines.push(`Links: ${links.join(", ")}`);
    }
    const s = simRef.current;
    if (s) {
      const note = s.note ? (lang === "ar" ? s.note.ar : s.note.en) : "";
      lines.push(`Last simulation: ${s.steps.length} steps, ${s.success ? "succeeded" : "failed"}. ${note}`);
    }
    return lines.join("\n").slice(0, 8000);
  }, [lang]);

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
    // place at the center of the current view (world coords) so new devices are visible
    const rect = canvasRef.current?.getBoundingClientRect();
    const v = viewRef.current;
    const cx = rect ? (rect.width / 2 - v.x) / v.scale : CANVAS_W / 2;
    const cy = rect ? (rect.height / 2 - v.y) / v.scale : CANVAS_H / 2;
    const x = Math.min(CANVAS_W - 90, Math.max(20, cx - 38 + (Math.random() * 120 - 60)));
    const y = Math.min(CANVAS_H - 90, Math.max(20, cy - 30 + (Math.random() * 120 - 60)));
    const dev = createDevice(kind, x, y, topoRef.current);
    setTopo((t) => ({ devices: [...t.devices, dev], links: t.links }));
    toast({ title: `${dev.name} ${lang === "ar" ? "أُضيف" : "added"}` });
  };

  const deleteDevice = (id: string) => {
    setSecDevId((cur) => (cur === id ? null : cur));
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

  // ── canvas interactions (v3: pan / pinch / scale-aware device drag) ──
  const onDevicePointerDown = (e: React.PointerEvent, dev: Device) => {
    if (tool !== "select") return;
    // a background finger is already down → this press joins a two-finger (pinch) gesture, never a device drag
    if (pointers.current.size >= 1) return;
    e.stopPropagation(); // dragging a device must never start a canvas pan
    const rect = canvasRef.current!.getBoundingClientRect();
    const v = viewRef.current;
    dragMovedRef.current = false;
    setDrag({
      id: dev.id,
      dx: (e.clientX - rect.left - v.x) / v.scale - dev.x,
      dy: (e.clientY - rect.top - v.y) / v.scale - dev.y,
      moved: false,
    });
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchRef.current = null;
    if (pointers.current.size === 0) panRef.current = null;
  };

  const onCanvasPointerDown = (e: React.PointerEvent) => {
    const el = canvasRef.current;
    if (!el) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size >= 2) {
      // two tracked fingers (device presses during a gesture aren't tracked) → pinch zoom;
      // pinch cancels any device drag so two-finger gestures never move devices
      el.setPointerCapture?.(e.pointerId);
      const [p1, p2] = [...pointers.current.values()];
      const rect = el.getBoundingClientRect();
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1;
      const midX = (p1.x + p2.x) / 2 - rect.left;
      const midY = (p1.y + p2.y) / 2 - rect.top;
      const v = viewRef.current;
      pinchRef.current = { dist, scale: v.scale, wx: (midX - v.x) / v.scale, wy: (midY - v.y) / v.scale };
      panRef.current = null;
      setDrag(null);
      setPanning(true);
      return;
    }
    if (drag) return; // an ongoing device drag owns the gesture (extra finger is tracked but idle)
    if (tool === "select") {
      // single pointer on the background → pan (device presses stopPropagation, so they never reach here);
      // capture only when panning so clicks on devices/tools are never retargeted
      el.setPointerCapture?.(e.pointerId);
      panRef.current = { px: e.clientX, py: e.clientY, vx: viewRef.current.x, vy: viewRef.current.y };
      setPanning(true);
    }
  };

  const onCanvasPointerMove = (e: React.PointerEvent) => {
    // 1) device drag — deltas divided by the current zoom (world coords)
    if (drag) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const v = viewRef.current;
      const x = Math.max(8, Math.min(CANVAS_W - 80, (e.clientX - rect.left - v.x) / v.scale - drag.dx));
      const y = Math.max(8, Math.min(CANVAS_H - 70, (e.clientY - rect.top - v.y) / v.scale - drag.dy));
      if (Math.abs(x - (findDevice(topo, drag.id)?.x ?? 0)) > 2 || Math.abs(y - (findDevice(topo, drag.id)?.y ?? 0)) > 2) { drag.moved = true; dragMovedRef.current = true; }
      setTopo((t) => ({
        devices: t.devices.map((d) => (d.id === drag.id ? { ...d, x, y } : d)),
        links: t.links,
      }));
      return;
    }
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const el = canvasRef.current;
    if (!el) return;
    // 2) pinch: distance ratio → scale, world midpoint stays under the finger midpoint
    const pin = pinchRef.current;
    if (pin && pointers.current.size >= 2) {
      const [p1, p2] = [...pointers.current.values()];
      const rect = el.getBoundingClientRect();
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1;
      const scale = clampScale(pin.scale * (dist / pin.dist));
      const midX = (p1.x + p2.x) / 2 - rect.left;
      const midY = (p1.y + p2.y) / 2 - rect.top;
      setView({ scale, x: midX - pin.wx * scale, y: midY - pin.wy * scale });
      return;
    }
    // 3) single-pointer pan
    const pan = panRef.current;
    if (pan) {
      setView((v) => ({ ...v, x: pan.vx + (e.clientX - pan.px), y: pan.vy + (e.clientY - pan.py) }));
    }
  };

  // ── v3: Traceroute — pure UI over simulatePing steps (hop list + TTL) ──
  const runTraceroute = (srcId: string, dstId: string) => {
    const r = simulatePing(topoRef.current, srcId, dstId);
    runSim(r.steps, r.devices, r.note, r.success);
    const seen = new Set<string>();
    const hops: { name: string; ttl: number; dropped: boolean }[] = [];
    for (const st of r.steps) {
      if (st.packet.kind !== "Echo Request") continue; // follow the outbound request only
      if (seen.has(st.deviceId)) continue;
      seen.add(st.deviceId);
      hops.push({ name: st.deviceName, ttl: st.packet.ttl, dropped: st.dropped });
    }
    setTrace({ src: srcId, dst: dstId, hops });
    setShowPanel(true);
  };

  // ── v3: link-kind helpers for the manual cable dialog ──
  const ethFreePort = (d: Device) => d.ports.find((p) => (p.kind === "ethernet" || p.kind === "internet") && !p.linkId && p.adminUp);
  const serialFreePort = (d: Device) => d.ports.find((p) => p.kind === "serial" && !p.linkId && p.adminUp);
  const wirelessFreePort = (d: Device) => d.ports.find((p) => p.kind === "wireless" && !p.linkId && p.adminUp);

  const consoleCompatible = (a: Device, b: Device) => {
    const HOSTY = ["pc", "laptop"];
    const MGMT = ["router", "switch", "firewall", "l3switch", "modem"];
    return (HOSTY.includes(a.kind) && MGMT.includes(b.kind)) || (HOSTY.includes(b.kind) && MGMT.includes(a.kind));
  };

  /** which manual link kinds can join these two devices right now */
  const linkKindOptions = (a: Device, b: Device): LinkKind[] => {
    const out: LinkKind[] = [];
    if (ethFreePort(a) && ethFreePort(b)) {
      out.push("copper", "crossover", "fiber");
      if (consoleCompatible(a, b)) out.push("console");
    }
    if (serialFreePort(a) && serialFreePort(b)) out.push("serial");
    if (wirelessFreePort(a) && wirelessFreePort(b)) out.push("wireless");
    return out;
  };

  const connectManual = (aId: string, bId: string, kind: LinkKind): boolean => {
    const t = topoRef.current;
    const a = findDevice(t, aId);
    const b = findDevice(t, bId);
    if (!a || !b) return false;
    if (kind === "wireless") {
      const pa = wirelessFreePort(a);
      const pb = wirelessFreePort(b);
      if (pa && pb) return !!connectPorts(t, aId, pa.id, bId, pb.id, "wireless");
      return false;
    }
    if (kind === "serial") {
      const pa = serialFreePort(a);
      const pb = serialFreePort(b);
      if (pa && pb) return !!connectPorts(t, aId, pa.id, bId, pb.id, "serial");
      return false;
    }
    // copper / crossover / fiber / console → first free ethernet-ish port each side
    const pa = ethFreePort(a);
    const pb = ethFreePort(b);
    if (!pa || !pb) return false;
    return !!connectPorts(t, aId, pa.id, bId, pb.id, kind);
  };

  const applyLink = (kind: "auto" | LinkKind) => {
    if (!linkDialog) return;
    const t = topoRef.current;
    const a = findDevice(t, linkDialog.a);
    const b = findDevice(t, linkDialog.b);
    if (!a || !b) { setLinkDialog(null); return; }
    let ok = false;
    let usedKind: LinkKind | null = null;
    if (kind === "auto") {
      const auto = autoCable(t, a.id, b.id);
      if (auto) {
        ok = !!connectPorts(t, a.id, auto.aPortId, b.id, auto.bPortId, auto.kind);
        usedKind = ok ? auto.kind : null;
      }
    } else {
      ok = connectManual(a.id, b.id, kind);
      usedKind = ok ? kind : null;
    }
    if (ok) {
      setTopo({ devices: [...t.devices], links: [...t.links] });
      toast({ title: `${a.name} ↔ ${b.name} — ${bi(LINK_SPECS.find((l) => l.kind === usedKind)!.nameBi)}` });
    } else {
      toast({ title: lang === "ar" ? "لا منافذ متوافقة حرة لهذا الكابل" : "No compatible free ports for this cable", variant: "destructive" });
    }
    setLinkDialog(null);
  };

  const onDeviceClick = (dev: Device) => {
    if (tool === "select") {
      if (dragMovedRef.current) return;
      // security devices get the dedicated attack/defense side panel
      if (SEC_KINDS.includes(dev.kind)) setSecDevId(dev.id);
      else setOpenDevId(dev.id);
    } else if (tool === "delete") {
      deleteDevice(dev.id);
    } else if (tool === "link") {
      if (!linkSrc) {
        setLinkSrc(dev.id);
        toast({ title: `${dev.name}: ${lang === "ar" ? "اختر الجهاز الثاني للربط" : "pick the second device to connect"}` });
      } else if (linkSrc === dev.id) {
        setLinkSrc(null);
      } else {
        // v3: open the link-kind dialog (auto + manual cable picks)
        setLinkDialog({ a: linkSrc, b: dev.id });
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
    } else if (tool === "traceroute") {
      if (!traceSrc) {
        const hasIp = dev.ports.some((p) => p.ip) || dev.staticIp;
        setTraceSrc(dev.id);
        toast({ title: hasIp ? `${dev.name}: ${lang === "ar" ? "اختر الهدف لتتبّع المسار" : "now pick the trace target"}` : `${dev.name} ${lang === "ar" ? "بلا IP!" : "has no IP!"}`, variant: hasIp ? "default" : "destructive" });
      } else {
        runTraceroute(traceSrc, dev.id);
        setTraceSrc(null);
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
      pendingFit.current = true;
      setTopo(JSON.parse(raw) as Topology);
      toast({ title: lang === "ar" ? "تم التحميل" : "loaded" });
    } else toast({ title: lang === "ar" ? "لا مخطط محفوظ" : "no saved topology" });
  };
  const importJson = (f: File) => {
    f.text().then((txt) => {
      try {
        const parsed = JSON.parse(txt) as Topology;
        if (Array.isArray(parsed.devices) && Array.isArray(parsed.links)) {
          pendingFit.current = true;
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
  const secDevice = secDevId ? findDevice(topo, secDevId) : null;
  const linkA = linkDialog ? findDevice(topo, linkDialog.a) : null;
  const linkB = linkDialog ? findDevice(topo, linkDialog.b) : null;
  const autoOk = !!(linkA && linkB && autoCable(topo, linkA.id, linkB.id));
  const commitSec = useCallback(() => {
    setTopo((t) => ({ devices: [...t.devices], links: t.links }));
  }, []);

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
    { id: "link", icon: Cable, label: { ar: "ربط كابل", en: "Connect cable" } },
    { id: "ping", icon: Radar, label: { ar: "Ping (PDU بسيط)", en: "Ping (Simple PDU)" } },
    { id: "traceroute", icon: Route, label: { ar: "تتبّع المسار", en: "Traceroute" } },
    { id: "dhcp", icon: HandCoins, label: { ar: "طلب DHCP", en: "DHCP request" } },
    { id: "http", icon: Globe, label: { ar: "متصفح/HTTP", en: "Browser/HTTP" } },
  ];

  const palette = (
    <div className="flex flex-col gap-0.5 p-1.5">
      {/* v3: quick search across all device names */}
      <div className="relative px-0.5 pb-1">
        <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <Input
          value={paletteQ}
          onChange={(e) => setPaletteQ(e.target.value)}
          placeholder={lang === "ar" ? "ابحث عن جهاز…" : "search devices…"}
          className="h-7 ps-7 text-[11px]"
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden lg:flex-col lg:gap-0.5">
        {CATEGORY_ORDER.map((cat) => {
          const specs = DEVICE_SPECS.filter(
            (s) => s.category === cat &&
              (paletteQ.trim() === "" ||
                bi(s.nameBi).toLowerCase().includes(paletteQ.trim().toLowerCase()) ||
                s.kind.toLowerCase().includes(paletteQ.trim().toLowerCase()))
          );
          if (specs.length === 0) return null;
          return (
            <div key={cat} className="shrink-0">
              <div className="text-[9.5px] font-black text-muted-foreground px-1 pt-1.5 pb-0.5 uppercase">{bi(CATEGORY_LABEL[cat])}</div>
              <div className="flex lg:flex-col gap-1">
                {specs.map((spec) => (
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
          );
        })}
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={`flex flex-col gap-3 ${isFs ? "h-dvh overflow-hidden bg-background p-2" : ""}`}>
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
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-primary/40 text-primary hover:bg-primary/10" onClick={() => setBuilderOpen(true)}>
            <Sparkles className="size-3.5" /> {lang === "ar" ? "بناء بالذكاء" : "AI Builder"}
          </Button>
          <Button variant={aiOpen ? "default" : "outline"} size="sm" className="h-8 gap-1.5 text-xs" onClick={() => setAiOpen((v) => !v)}>
            <Bot className="size-3.5" /> {lang === "ar" ? "المساعد الذكي" : "AI Assistant"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <FlaskConical className="size-3.5" /> {lang === "ar" ? "المعامل الجاهزة" : "Labs"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="text-xs">{lang === "ar" ? "حمّل سيناريو جاهزاً" : "Load a ready scenario"}</DropdownMenuLabel>
              {NETSIM_LABS.map((lab) => (
                <DropdownMenuItem key={lab.id} onClick={() => { pendingFit.current = true; setTopo(lab.build()); setSim(null); toast({ title: bi(lab.title), description: bi(lab.goal) }); }}>
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
          <ExportMenu topo={topo} />
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => fileRef.current?.click()}><Upload className="size-3.5" /></Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} />
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={() => { pendingFit.current = true; setTopo({ devices: [], links: [] }); setSim(null); setTrace(null); }}><Eraser className="size-3.5" /></Button>
        </div>
      </div>

      {/* 11-e: startup-config resume offer (shown when a snapshot exists on mount) */}
      {startupOffer && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1.5">
          <HardDriveDownload className="size-4 text-amber-600 shrink-0" />
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 min-w-0">
            {lang === "ar"
              ? `startup-config محفوظ${startupOffer.savedAt ? ` (${new Date(startupOffer.savedAt).toLocaleString()})` : ""} — استئناف جلسة الإعداد السابقة؟`
              : `startup-config on flash${startupOffer.savedAt ? ` (${new Date(startupOffer.savedAt).toLocaleString()})` : ""} — resume the previous session?`}
          </span>
          <span className="ms-auto flex items-center gap-1.5 shrink-0">
            <Button size="sm" className="min-h-11 sm:h-9 px-3 text-xs" onClick={resumeStartup}>
              <RotateCcw className="size-3.5" /> {lang === "ar" ? "استئناف" : "Resume"}
            </Button>
            <Button variant="ghost" size="sm" className="min-h-11 sm:h-9 px-3 text-xs" onClick={() => setStartupOffer(null)}>
              {lang === "ar" ? "تجاهل" : "Dismiss"}
            </Button>
          </span>
        </div>
      )}

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border bg-card p-1.5">
        {tools.map((tt) => (
          <button
            key={tt.id}
            onClick={() => { setTool(tt.id); setLinkSrc(null); setPingSrc(null); setTraceSrc(null); }}
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

      <div className={`flex flex-col lg:flex-row gap-3 ${isFs ? "flex-1 min-h-0" : ""}`}>
        {/* palette desktop (side-by-side on wide screens, incl. fullscreen) */}
        <div className={`hidden lg:block w-36 shrink-0 rounded-xl border bg-sidebar ${isFs ? "h-full overflow-y-auto min-h-0" : "h-fit"}`}>
          {palette}
        </div>
        {paletteOpen && !isFs && (
          <div className="lg:hidden rounded-xl border bg-sidebar">{palette}</div>
        )}

        {/* canvas */}
        <div className={`relative flex-1 min-w-0 rounded-xl border overflow-hidden bg-background ${isFs ? "flex flex-col min-h-0" : ""}`}>
          <div
            ref={canvasRef}
            tabIndex={0}
            role="application"
            aria-label={lang === "ar" ? "لوحة الطوبولوجيا — سحب للتحريك، عجلة الفأرة أو القرص للتكبير" : "Topology canvas — drag to pan, wheel or pinch to zoom"}
            className={`relative overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-ring/60 ${isFs ? "flex-1 min-h-0" : ""}`}
            style={{
              height: isFs ? undefined : expanded ? "calc(100dvh - 8rem)" : 560,
              touchAction: "none",
              cursor: tool === "select" ? (panning ? "grabbing" : "grab") : "default",
              // subtle dot grid that pans & scales with the view (perceptible panning)
              backgroundImage: "radial-gradient(circle, oklch(0.596 0.145 163 / 20%) 1.1px, transparent 1.1px)",
              backgroundSize: `${Math.max(16, 26 * view.scale)}px ${Math.max(16, 26 * view.scale)}px`,
              backgroundPosition: `${view.x}px ${view.y}px`,
            }}
            onKeyDown={(e) => {
              if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomCenter(1.25); }
              else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomCenter(0.8); }
              else if (e.key === "0") { e.preventDefault(); resetView(); }
              else if (e.key.toLowerCase() === "f") { e.preventDefault(); fitView(); }
            }}
            onPointerDown={onCanvasPointerDown}
            onPointerMove={onCanvasPointerMove}
            onPointerUp={(e) => { endPointer(e); setDrag(null); setPanning(false); }}
            onPointerCancel={(e) => { endPointer(e); setDrag(null); setPanning(false); }}
            onPointerLeave={() => setDrag(null)}
          >
            {/* world wrapper — everything inside uses world coordinates */}
            <div
              className="net-grid-bg"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                transformOrigin: "0 0",
              }}
            >
              {/* sheet edge marker */}
              <div className="absolute inset-0 rounded-lg border border-border/70 pointer-events-none" />

              {/* links */}
              <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H} style={{ overflow: "visible" }}>
                {topo.links.map((l) => {
                  const a = findDevice(topo, l.a.deviceId);
                  const b = findDevice(topo, l.b.deviceId);
                  if (!a || !b) return null;
                  const isCurrent = currentStep?.linkId === l.id;
                  const st = linkStyle(l.kind);
                  const x1 = a.x + 30, y1 = a.y + 22, x2 = b.x + 30, y2 = b.y + 22;
                  return (
                    <g key={l.id}>
                      <line
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={isCurrent ? "#fbbf24" : st.color}
                        strokeWidth={isCurrent ? st.width + 2.5 : st.width}
                        strokeDasharray={st.dash}
                        strokeLinecap="round"
                        style={isCurrent ? { filter: "drop-shadow(0 0 6px #fbbf24)" } : undefined}
                      />
                      {l.kind === "fiber" && (
                        <text
                          x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 5}
                          textAnchor="middle" fontSize="10" fontWeight="900" fill={st.color}
                          style={{ pointerEvents: "none", userSelect: "none", paintOrder: "stroke", stroke: "#fff", strokeWidth: 3 }}
                        >F</text>
                      )}
                      {tool === "delete" && (
                        <line
                          x1={x1} y1={y1} x2={x2} y2={y2}
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
                const isLinkSrc = linkSrc === dev.id || pingSrc === dev.id || traceSrc === dev.id;
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
                    {/* 11-e: per-interface link-state LEDs — green=up, amber=shutdown, dark=no cable */}
                    {(() => {
                      const phys = dev.ports.filter((p) => p.kind !== "svi");
                      // compact cards: hosts show every port; multi-port devices show only active (cabled/shut) ports
                      const show = phys.length <= 8 ? phys : phys.filter((p) => p.linkId || !p.adminUp).slice(0, 12);
                      if (show.length === 0) return null;
                      return (
                        <span className="flex flex-wrap justify-center gap-1 max-w-[76px] leading-none" dir="ltr" aria-hidden="true">
                          {show.map((p) => (
                            <span
                              key={p.id}
                              title={`${p.name} — ${!p.adminUp ? (lang === "ar" ? "مغلق (shutdown)" : "shutdown") : p.linkId ? (lang === "ar" ? "يعمل" : "up") : (lang === "ar" ? "بلا كابل" : "no cable")}`}
                              className={`size-1.5 rounded-full ${
                                !p.adminUp
                                  ? "bg-amber-500"
                                    : p.linkId
                                      ? "bg-emerald-500 shadow-[0_0_3px] shadow-emerald-500/80"
                                      : "bg-zinc-600/70"
                              }`}
                            />
                          ))}
                        </span>
                      );
                    })()}
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
            </div>

            {/* empty hint — screen space overlay */}
            {topo.devices.length === 0 && (
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center space-y-1.5 pointer-events-auto">
                  <Info className="size-8 mx-auto text-muted-foreground" />
                  <div className="text-xs font-bold text-muted-foreground">
                    {lang === "ar" ? "اسحب/أضف أجهزة من اللوحة ثم اربطها بأداة الكابل" : "Add devices from the palette then connect them with the cable tool"}
                  </div>
                  <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[11px] border-primary/40 text-primary hover:bg-primary/10" onClick={() => setBuilderOpen(true)}>
                    <Sparkles className="size-3.5" />
                    {lang === "ar" ? "أو أنشئها بالذكاء الاصطناعي" : "or generate one with AI"}
                  </Button>
                </div>
              </div>
            )}

            {/* v3: zoom controls (bottom-end corner) */}
            <div className="absolute bottom-2 end-2 z-20 flex items-center gap-0.5 rounded-xl border bg-background/95 backdrop-blur p-1 shadow-sm">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7" onClick={() => zoomCenter(1.25)} title={lang === "ar" ? "تكبير" : "Zoom in"}>
                    <ZoomIn className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px]">{lang === "ar" ? "تكبير" : "Zoom in"}</TooltipContent>
              </Tooltip>
              <span className="min-w-10 text-center text-[10px] font-black tabular-nums text-muted-foreground select-none" dir="ltr">
                {Math.round(view.scale * 100)}%
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7" onClick={() => zoomCenter(0.8)} title={lang === "ar" ? "تصغير" : "Zoom out"}>
                    <ZoomOut className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px]">{lang === "ar" ? "تصغير" : "Zoom out"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7" onClick={resetView} title={lang === "ar" ? "إعادة 100%" : "Reset 100%"}>
                    <RotateCcw className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px]">{lang === "ar" ? "إعادة ضبط إلى 100%" : "Reset to 100%"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7" onClick={() => fitView()} title={lang === "ar" ? "ملاءمة الشبكة" : "Fit topology"}>
                    <Maximize className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[10px]">{lang === "ar" ? "ملاءمة كل الأجهزة في الشاشة" : "Fit all devices on screen"}</TooltipContent>
              </Tooltip>
            </div>

            {/* v3: expand + fullscreen (top-end corner) */}
            <div className="absolute top-2 end-2 z-20 flex items-center gap-0.5 rounded-xl border bg-background/95 backdrop-blur p-1 shadow-sm">
              {!isFs && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => setExpanded((v) => !v)} title={lang === "ar" ? (expanded ? "استعادة الحجم" : "توسيع اللوحة") : expanded ? "Restore size" : "Expand canvas"}>
                      {expanded ? <Minimize className="size-4" /> : <Expand className="size-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px]">{lang === "ar" ? (expanded ? "استعادة حجم اللوحة" : "توسيع لوحة الشبكة داخل الصفحة") : expanded ? "Restore canvas size" : "Grow the canvas within the page"}</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7" onClick={toggleFullscreen} title={lang === "ar" ? (isFs ? "الخروج من ملء الشاشة" : "ملء الشاشة") : isFs ? "Exit fullscreen" : "Fullscreen"}>
                    <Maximize2 className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px]">{lang === "ar" ? (isFs ? "خروج (أو Esc)" : "ملء الشاشة للتركيز على المعمل") : isFs ? "Exit (or Esc)" : "Fullscreen the lab"}</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* right column: simulation panel + security panel */}
        <div className={`flex flex-col gap-3 w-full lg:w-72 shrink-0 ${isFs ? "min-h-0 overflow-y-auto" : ""}`}>
        {/* simulation panel */}
        {showPanel && (
          <div className="rounded-xl border bg-card overflow-hidden flex flex-col" style={{ maxHeight: isFs ? undefined : 588 }}>
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
                {/* v3: traceroute hop list (unique devices traversed, in order, with TTL) */}
                {trace && trace.hops.length > 0 && (
                  <div className="px-2.5 py-1.5 border-b">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black">{lang === "ar" ? "قفزات المسار (Traceroute)" : "Route hops (traceroute)"}</span>
                      <span className="text-[9px] text-muted-foreground">{trace.hops.length} {lang === "ar" ? "قفزة" : "hops"}</span>
                    </div>
                    <div className="max-h-28 overflow-y-auto space-y-0.5" dir="ltr">
                      {trace.hops.map((h, i) => (
                        <div key={i} className={`flex items-center gap-1.5 text-[10px] font-mono rounded px-1.5 py-0.5 ${h.dropped ? "text-destructive bg-destructive/10" : "text-muted-foreground"}`}>
                          <span className="w-4 text-[9px] font-black shrink-0">{i + 1}</span>
                          <span className="font-bold text-foreground/90 truncate">{h.name}</span>
                          {h.dropped && <span className="text-[8.5px] font-black">⛔</span>}
                          <span className="ms-auto text-[9px] shrink-0">TTL {h.ttl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

        {/* security side panel: attacker / firewall / l3switch / ids */}
        {secDevice && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card overflow-hidden flex flex-col"
            style={{ maxHeight: isFs ? undefined : 588 }}
          >
            <div className="flex items-center gap-1.5 border-b px-2.5 py-2">
              {(() => { const I = SEC_ICON[secDevice.kind] ?? Cpu; return <I className="size-4 text-primary shrink-0" />; })()}
              <span className="text-xs font-black truncate">{secDevice.name}</span>
              <Badge variant="outline" className="text-[9px] shrink-0">{secDevice.kind}</Badge>
              <div className="ms-auto flex items-center gap-0.5 shrink-0">
                <Button variant="ghost" size="icon" className="size-6" title={lang === "ar" ? "الإعدادات الكاملة (IP/CLI)" : "Full config (IP/CLI)"} onClick={() => setOpenDevId(secDevice.id)}>
                  <SlidersHorizontal className="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="size-6" onClick={() => setSecDevId(null)}><X className="size-3.5" /></Button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0">
              {secDevice.kind === "attacker" && (
                <AttackPanel device={secDevice} onChange={commitSec} onRunReport={() => runAttackSim(secDevice.id)} />
              )}
              {(secDevice.kind === "firewall" || secDevice.kind === "l3switch") && (
                <AclPanel device={secDevice} onChange={commitSec} />
              )}
              {secDevice.kind === "ids" && <IdsPanel device={secDevice} />}
            </div>
          </motion.div>
        )}
        </div>

        {/* AI assistant panel — side-by-side on desktop */}
        {aiOpen && isDesktop && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full lg:w-80 shrink-0" style={{ height: isFs ? undefined : 588, minHeight: isFs ? 0 : undefined, maxHeight: isFs ? "100%" : undefined }}>
            <AiAssistantPanel deviceCount={topo.devices.length} getContext={buildAiContext} onClose={() => setAiOpen(false)} className="h-full" />
          </motion.div>
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
        {LINK_SPECS.map((l) => (
          <span key={l.kind} className="inline-flex items-center gap-1.5">
            <span className="inline-block w-4 rounded" style={{ background: linkStyle(l.kind).color, height: linkStyle(l.kind).width / 2.5 }} title={bi(l.descBi)} />
            {bi(l.nameBi)}
          </span>
        ))}
        <span className="ms-auto inline-flex items-center gap-1">
          <Info className="size-3" />
          {lang === "ar" ? "اسحب الخلفية للتحريك · العجلة/القرص للتكبير · انقر أي خطوة لعرض PDU" : "Drag background to pan · wheel/pinch to zoom · click a step for PDU"}
        </span>
      </div>

      {/* AI assistant — bottom drawer on mobile */}
      <Sheet open={aiOpen && !isDesktop} onOpenChange={(o) => !o && setAiOpen(false)}>
        <SheetContent side="bottom" className="h-[75vh] p-0 flex flex-col">
          <SheetHeader className="sr-only">
            <SheetTitle>{lang === "ar" ? "المساعد الذكي" : "AI Assistant"}</SheetTitle>
            <SheetDescription>{lang === "ar" ? "مساعد معمل الشبكات" : "Network lab assistant"}</SheetDescription>
          </SheetHeader>
          <div className="flex-1 min-h-0 p-2 pt-0">
            <AiAssistantPanel deviceCount={topo.devices.length} getContext={buildAiContext} onClose={() => setAiOpen(false)} className="h-full" />
          </div>
        </SheetContent>
      </Sheet>

      {/* v3: device palette drawer — fullscreen on narrow screens */}
      <Sheet open={paletteOpen && isFs && !isDesktop} onOpenChange={(o) => !o && setPaletteOpen(false)}>
        <SheetContent side={lang === "ar" ? "right" : "left"} className="w-44 p-0 overflow-y-auto">
          <SheetHeader className="sr-only">
            <SheetTitle>{lang === "ar" ? "لوحة الأجهزة" : "Device Palette"}</SheetTitle>
            <SheetDescription>{lang === "ar" ? "أضف أجهزة إلى الشبكة" : "Add devices to the network"}</SheetDescription>
          </SheetHeader>
          {palette}
        </SheetContent>
      </Sheet>

      {/* AI topology builder */}
      <TopologyBuilderDialog open={builderOpen} onOpenChange={setBuilderOpen} onApply={applyPlan} />

      <DeviceDialog device={openDevice ?? null} onClose={() => setOpenDevId(null)} actions={actions} bootBanner={bootBanner ?? undefined} />
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

      {/* v3: link-kind picker — auto (autoCable) + manual cable kinds */}
      <Dialog open={!!linkDialog} onOpenChange={(o) => !o && setLinkDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">{lang === "ar" ? "نوع الكابل" : "Cable type"}</DialogTitle>
            <DialogDescription className="text-xs">
              {linkA && linkB ? `${linkA.name} ↔ ${linkB.name}` : ""} — {lang === "ar" ? "اختر تلقائياً أو حدد النوع بنفسك" : "pick automatic or choose the type yourself"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              disabled={!autoOk}
              onClick={() => applyLink("auto")}
              className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-start transition-colors ${autoOk ? "border-primary/50 hover:bg-accent cursor-pointer" : "opacity-50 cursor-not-allowed border-border"}`}
            >
              <Cable className="size-4 text-primary shrink-0" />
              <span className="flex-1">
                <span className="block text-xs font-bold">{lang === "ar" ? "تلقائي (autoCable)" : "Automatic (autoCable)"}</span>
                <span className="block text-[10px] text-muted-foreground">{lang === "ar" ? "يختار المنافذ والنوع المناسب تلقائياً" : "picks matching free ports & type automatically"}</span>
              </span>
            </button>
            {LINK_SPECS.map((spec) => {
              const ok = !!(linkA && linkB && linkKindOptions(linkA, linkB).includes(spec.kind));
              const st = linkStyle(spec.kind);
              return (
                <button
                  key={spec.kind}
                  disabled={!ok}
                  onClick={() => applyLink(spec.kind)}
                  title={bi(spec.descBi)}
                  className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-start transition-colors ${ok ? "border-border hover:bg-accent hover:border-primary/50 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                >
                  <span className="w-6 shrink-0 flex items-center justify-center">
                    <svg width="24" height="8" aria-hidden>
                      <line x1="0" y1="4" x2="24" y2="4" stroke={st.color} strokeWidth={Math.min(4, st.width)} strokeDasharray={st.dash === "0" ? undefined : st.dash} strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-bold">{bi(spec.nameBi)}</span>
                    <span className="block text-[10px] text-muted-foreground">{bi(spec.descBi)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
