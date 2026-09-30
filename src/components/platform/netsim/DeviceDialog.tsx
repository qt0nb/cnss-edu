"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Globe, Terminal, SlidersHorizontal, ListTree, Server, Wifi, Table2, Trash2, Plus,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import type { Device } from "@/lib/netsim/types";
import { isValidIp, prefixToMask, isHostKind } from "@/lib/netsim/engine";
import { runCliLine, runHostLine, initialCliState, promptOf, type CliState } from "@/lib/netsim/cli";

export interface NetSimActions {
  updateDevice(): void;
  runPing(srcId: string, ip: string): string[];
  runDhcp(clientId: string): string[];
  runDns(srcId: string, name: string): string[];
  runHttp(srcId: string, host: string): { lines: string[]; page: { title: string; body: string } | null };
  /** 11-e: `copy run start` / `write memory` — persist topology snapshot to localStorage */
  saveStartupConfig(): boolean;
  /** 11-e: `reload` — clear volatile state (ARP/MAC/alerts/NAT sessions) */
  reloadDevice(devId: string): void;
}

export function CliTerminal({
  device,
  actions,
  isHost,
  bootBanner,
}: {
  device: Device;
  actions: NetSimActions;
  isHost: boolean;
  bootBanner?: string[];
}) {
  const { lang } = useLang();
  const [lines, setLines] = useState<string[]>([
    lang === "ar"
      ? "CNSS-edu Sim — اكتب ? لعرض الأوامر"
      : "CNSS-edu Sim — type ? for commands",
  ]);
  const [input, setInput] = useState("");
  const [cliState, setCliState] = useState<CliState>(initialCliState);
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [busy, setBusy] = useState(false); // 11-e: console busy printing ping replies
  const endRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bannerShownRef = useRef(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  // 11-e: one-time "startup-config restored" banner (provided by NetSim after resume)
  useEffect(() => {
    if (bootBanner?.length && !bannerShownRef.current) {
      bannerShownRef.current = true;
      setLines((ls) => [...bootBanner, ...ls]);
    }
  }, [bootBanner]);

  // clear pending ping-stream timers on unmount
  useEffect(() => () => { for (const t of timersRef.current) clearTimeout(t); }, []);

  const prompt = isHost
    ? `${device.name}>`
    : promptOf(device, cliState);

  /** 11-e realism: stagger output lines over time (ping replies / summary) */
  const streamLines = (outLines: string[], delayMs = 350) => {
    setBusy(true);
    outLines.forEach((l, i) => {
      const t = setTimeout(() => {
        setLines((ls) => [...ls, l]);
        timersRef.current = timersRef.current.filter((x) => x !== t);
        if (i === outLines.length - 1) setBusy(false);
      }, delayMs * (i + 1));
      timersRef.current.push(t);
    });
  };

  const submit = () => {
    if (busy) return; // console busy — like a real router mid-ping
    const line = input;
    setInput("");
    if (line.trim()) setHist((h) => [...h, line]);
    setHIdx(-1);
    const promptLine = `${prompt} ${line}`;
    let out: string[] = [];
    let pingOut: string[] | null = null;
    if (isHost) {
      const r = runHostLine(device, line);
      out = r.lines;
      if (r.action?.type === "ping") pingOut = actions.runPing(device.id, r.action.arg);
      else if (r.action?.type === "dhcp-renew") out = [...out, ...actions.runDhcp(device.id)];
      else if (r.action?.type === "dns") out = [...out, ...actions.runDns(device.id, r.action.arg)];
      else if (r.action?.type === "http") {
        const r2 = actions.runHttp(device.id, r.action.arg);
        out = [...out, ...r2.lines];
      }
      actions.updateDevice();
    } else {
      const r = runCliLine(device, line, cliState);
      setCliState(r.state);
      out = r.lines;
      if (r.action?.type === "ping") pingOut = actions.runPing(device.id, r.action.arg);
      else if (r.action?.type === "save-config") actions.saveStartupConfig();
      else if (r.action?.type === "reload") actions.reloadDevice(device.id);
      actions.updateDevice();
    }
    setLines((ls) => [...ls, promptLine, ...out]);
    if (pingOut && pingOut.length) streamLines(pingOut);
  };

  return (
    <div className="flex flex-col gap-2" dir="ltr">
      <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-3 h-72 overflow-y-auto text-[12px] font-mono text-emerald-300 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith("%") ? "text-rose-400" : undefined}>{l || "\u00A0"}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-emerald-500 shrink-0">{prompt}</span>
        <Input
          value={input}
          disabled={busy}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            else if (e.key === "ArrowUp") {
              e.preventDefault();
              const idx = hIdx === -1 ? hist.length - 1 : Math.max(0, hIdx - 1);
              if (hist[idx] !== undefined) { setHIdx(idx); setInput(hist[idx]); }
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const idx = hIdx === -1 ? -1 : Math.min(hist.length - 1, hIdx + 1);
              if (idx === hist.length - 1) { setHIdx(-1); setInput(""); }
              else if (hist[idx] !== undefined) { setHIdx(idx); setInput(hist[idx]); }
            }
          }}
          className="font-mono text-xs h-8 bg-zinc-950 border-zinc-800 text-emerald-200"
          placeholder={busy ? (lang === "ar" ? "قيد الإرسال..." : "transmitting...") : "?"}
          autoComplete="off"
          spellCheck={false}
        />
        <Button size="sm" onClick={submit} disabled={busy} className="h-8">↵</Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, mono = true, placeholder }: { label: string; value: string; onChange: (v: string) => void; mono?: boolean; placeholder?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
      <Label className="text-[11px] text-muted-foreground">{label}</Label>
      <Input
        dir="ltr"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-8 text-xs ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}

export default function DeviceDialog({
  device,
  onClose,
  actions,
  bootBanner,
}: {
  device: Device | null;
  onClose: () => void;
  actions: NetSimActions;
  bootBanner?: string[];
}) {
  const { lang, t } = useLang();
  const [url, setUrl] = useState("");
  const [page, setPage] = useState<{ title: string; body: string } | null>(null);
  const [newRecord, setNewRecord] = useState({ name: "", ip: "" });
  const [linesEcho, setLinesEcho] = useState<string[]>([]);
  const [dhcp, setDhcp] = useState(device?.dhcpPool ? { ...device.dhcpPool } : null);

  useEffect(() => {
    setPage(null);
    setUrl("");
    if (device?.dhcpPool) setDhcp({ ...device.dhcpPool });
    else setDhcp(null);
  }, [device?.id]);

  if (!device) return null;
  const d = device;
  const isRouterLike = d.kind === "router" || d.kind === "switch" || d.kind === "hub" || d.kind === "wirelessRouter";
  const host = isHostKind(d.kind);

  const commit = () => actions.updateDevice();

  const setPortIp = (portId: string, ip: string, mask: string) => {
    const p = d.ports.find((pp) => pp.id === portId);
    if (!p) return;
    p.ip = isValidIp(ip) ? ip : null;
    p.mask = isValidIp(mask) ? mask : null;
    commit();
  };

  const fetchPage = () => {
    const r = actions.runHttp(d.id, url.trim());
    setLinesEcho(r.lines);
    if (r.page) setPage(r.page);
  };

  return (
    <Dialog open={!!d} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            {d.name}
            <Badge variant="outline" className="text-[10px]">{d.kind}</Badge>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {lang === "ar" ? "إعداد الجهاز كما في Packet Tracer" : "Configure the device like Packet Tracer"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={host ? "ipconf" : isRouterLike ? "cli" : "ports"} dir={lang === "ar" ? "rtl" : "ltr"}>
          <TabsList className="flex-wrap h-auto">
            {host && <TabsTrigger value="ipconf" className="text-xs gap-1"><SlidersHorizontal className="size-3.5" />{lang === "ar" ? "إعداد IP" : "IP Config"}</TabsTrigger>}
            {(isRouterLike) && <TabsTrigger value="cli" className="text-xs gap-1"><Terminal className="size-3.5" />CLI</TabsTrigger>}
            {host && <TabsTrigger value="pcmd" className="text-xs gap-1"><Terminal className="size-3.5" />{lang === "ar" ? "سطر الأوامر" : "Command Prompt"}</TabsTrigger>}
            {host && <TabsTrigger value="browser" className="text-xs gap-1"><Globe className="size-3.5" />{lang === "ar" ? "المتصفح" : "Browser"}</TabsTrigger>}
            <TabsTrigger value="ports" className="text-xs gap-1"><ListTree className="size-3.5" />{lang === "ar" ? "المنافذ" : "Ports"}</TabsTrigger>
            {d.kind === "switch" && <TabsTrigger value="mac" className="text-xs gap-1"><Table2 className="size-3.5" />{lang === "ar" ? "جدول MAC" : "MAC Table"}</TabsTrigger>}
            {(isRouterLike || host) && <TabsTrigger value="arp" className="text-xs gap-1"><Table2 className="size-3.5" />ARP</TabsTrigger>}
            {d.kind === "server" && <TabsTrigger value="services" className="text-xs gap-1"><Server className="size-3.5" />{lang === "ar" ? "الخدمات" : "Services"}</TabsTrigger>}
            {(d.kind === "wirelessRouter" || d.kind === "ap") && <TabsTrigger value="wireless" className="text-xs gap-1"><Wifi className="size-3.5" />{lang === "ar" ? "اللاسلكي" : "Wireless"}</TabsTrigger>}
            {d.kind === "router" && <TabsTrigger value="routes" className="text-xs gap-1"><ListTree className="size-3.5" />{lang === "ar" ? "التوجيه" : "Routing"}</TabsTrigger>}
          </TabsList>

          {/* ── host IP config ── */}
          {host && (
            <TabsContent value="ipconf" className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="text-xs font-semibold">{lang === "ar" ? "استخدام DHCP" : "Use DHCP"}</div>
                <Switch
                  checked={d.dhcpClient}
                  onCheckedChange={(v) => {
                    d.dhcpClient = v;
                    if (v) {
                      for (const p of d.ports) { p.ip = null; p.mask = null; }
                      d.gateway = null;
                      d.dnsServer = null;
                    }
                    commit();
                  }}
                />
              </div>
              {d.dhcpClient ? (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    {lang === "ar" ? "الحالة: بانتظار خادم DHCP — استخدم زر الطلب" : "State: waiting for DHCP — use request"}
                  </div>
                  <Button size="sm" onClick={() => { const ls = actions.runDhcp(d.id); setLinesEcho(ls); }}>
                    {lang === "ar" ? "طلب عنوان (DORA)" : "Request address (DORA)"}
                  </Button>
                  {linesEcho.length > 0 && (
                    <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-2 text-[11px] font-mono text-emerald-300" dir="ltr">
                      {linesEcho.join("\n")}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {d.ports.map((p) => (
                    <div key={p.id} className="space-y-2 rounded-lg border p-3">
                      <div className="text-xs font-bold font-mono" dir="ltr">{p.name} — {p.mac}</div>
                      <Field label="IP" value={p.ip ?? ""} onChange={(v) => setPortIp(p.id, v, p.mask ?? "255.255.255.0")} placeholder="192.168.1.10" />
                      <Field label={lang === "ar" ? "القناع" : "Mask"} value={p.mask ?? ""} onChange={(v) => setPortIp(p.id, p.ip ?? "192.168.1.10", v)} placeholder="255.255.255.0" />
                    </div>
                  ))}
                  <Field label={lang === "ar" ? "البوابة" : "Gateway"} value={d.gateway ?? ""} onChange={(v) => { if (isValidIp(v)) { d.gateway = v; commit(); } }} placeholder="192.168.1.1" />
                  <Field label="DNS" value={d.dnsServer ?? ""} onChange={(v) => { if (isValidIp(v)) { d.dnsServer = v; commit(); } }} placeholder="8.8.8.8" />
                </div>
              )}
            </TabsContent>
          )}

          {/* ── router CLI ── */}
          {isRouterLike && (
            <TabsContent value="cli">
              <CliTerminal device={d} actions={actions} isHost={false} bootBanner={bootBanner} />
            </TabsContent>
          )}

          {/* ── host command prompt ── */}
          {host && (
            <TabsContent value="pcmd">
              <CliTerminal device={d} actions={actions} isHost />
            </TabsContent>
          )}

          {/* ── browser ── */}
          {host && (
            <TabsContent value="browser" className="space-y-3">
              <div className="flex gap-2" dir="ltr">
                <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="net.local أو 192.168.1.5" className="font-mono text-xs h-9" />
                <Button size="sm" onClick={fetchPage}>{lang === "ar" ? "اذهب" : "Go"}</Button>
              </div>
              {linesEcho.length > 0 && !page && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-2 text-[11px] text-destructive" dir="ltr">
                  {linesEcho.join("\n")}
                </div>
              )}
              {page ? (
                <div className="rounded-lg border bg-card">
                  <div className="border-b bg-muted/60 px-3 py-2 text-xs font-bold flex items-center gap-2">
                    <Globe className="size-3.5 text-primary" /> {page.title}
                  </div>
                  <div className="p-3 text-xs whitespace-pre-wrap leading-relaxed">{page.body}</div>
                </div>
              ) : (
                <div className="text-[11px] text-muted-foreground">
                  {lang === "ar"
                    ? "اكتب اسم الموقع (سيُحل عبر DNS ثم HTTP). يحتاج خادم DNS بسجل A وخادم HTTP في الشبكة."
                    : "Type the site name (resolved via DNS then HTTP). Needs a DNS server with an A record and an HTTP server."}
                </div>
              )}
            </TabsContent>
          )}

          {/* ── ports ── */}
          <TabsContent value="ports" className="space-y-2">
            <ScrollArea className="h-72 rounded-lg border">
              <table className="w-full text-[11px] font-mono" dir="ltr">
                <thead className="bg-muted/70 sticky top-0">
                  <tr>
                    <th className="p-2 text-start">{lang === "ar" ? "المنفذ" : "Port"}</th>
                    <th className="p-2 text-start">MAC</th>
                    <th className="p-2 text-start">IP</th>
                    <th className="p-2 text-start">{lang === "ar" ? "الحالة" : "State"}</th>
                    {d.kind === "switch" && <th className="p-2 text-start">VLAN</th>}
                  </tr>
                </thead>
                <tbody>
                  {d.ports.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2">{p.name}</td>
                      <td className="p-2 text-muted-foreground">{p.mac}</td>
                      <td className="p-2">
                        {(d.kind === "router" || d.kind === "wirelessRouter" || host) && p.kind !== "wireless" ? (
                          <input
                            defaultValue={p.ip ?? ""}
                            onBlur={(e) => setPortIp(p.id, e.target.value, p.mask ?? "255.255.255.0")}
                            placeholder="—"
                            className="w-28 bg-transparent outline-none focus:bg-muted rounded px-1"
                          />
                        ) : (
                          p.ip ?? "—"
                        )}
                      </td>
                      <td className="p-2">
                        <span className={p.linkId && p.adminUp ? "text-emerald-500" : "text-muted-foreground"}>
                          {p.linkId ? (p.adminUp ? "up" : "admin down") : "not connected"}
                        </span>
                      </td>
                      {d.kind === "switch" && (
                        <td className="p-2">
                          <select
                            value={p.accessVlan}
                            onChange={(e) => { p.accessVlan = parseInt(e.target.value, 10); commit(); }}
                            className="bg-transparent rounded border px-1"
                          >
                            {[1, 10, 20, 30, 40, 99].map((v) => <option key={v} value={v}>{v}</option>)}
                          </select>
                          <label className="ms-2 inline-flex items-center gap-1 text-[10px]">
                            <input type="checkbox" checked={p.trunk} onChange={(e) => { p.trunk = e.target.checked; commit(); }} />
                            trunk
                          </label>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
            {d.kind === "switch" && (
              <div className="text-[11px] text-muted-foreground">
                {lang === "ar" ? "غيّر VLAN المنفذ من القائمة أو فعّل trunk لتمرير كل الشبكات (802.1Q)" : "Change port VLAN or enable trunk to carry all VLANs (802.1Q)"}
              </div>
            )}
          </TabsContent>

          {/* ── MAC table ── */}
          {d.kind === "switch" && (
            <TabsContent value="mac">
              <ScrollArea className="h-64 rounded-lg border">
                <table className="w-full text-[11px] font-mono" dir="ltr">
                  <thead className="bg-muted/70 sticky top-0">
                    <tr><th className="p-2 text-start">VLAN</th><th className="p-2 text-start">MAC</th><th className="p-2 text-start">Port</th></tr>
                  </thead>
                  <tbody>
                    {d.macTable.length === 0 && (
                      <tr><td colSpan={3} className="p-4 text-center text-muted-foreground text-xs">
                        {lang === "ar" ? "فارغ — شغّل ping أولاً ليتعلم المبدّل" : "Empty — run a ping so the switch learns"}
                      </td></tr>
                    )}
                    {d.macTable.map((e, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{e.vlan}</td>
                        <td className="p-2">{e.mac}</td>
                        <td className="p-2">{e.portId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </TabsContent>
          )}

          {/* ── ARP ── */}
          {(isRouterLike || host) && (
            <TabsContent value="arp">
              <ScrollArea className="h-64 rounded-lg border">
                <table className="w-full text-[11px] font-mono" dir="ltr">
                  <thead className="bg-muted/70 sticky top-0">
                    <tr><th className="p-2 text-start">IP</th><th className="p-2 text-start">MAC</th><th className="p-2 text-start">Port</th></tr>
                  </thead>
                  <tbody>
                    {d.arp.length === 0 && (
                      <tr><td colSpan={3} className="p-4 text-center text-muted-foreground text-xs">
                        {lang === "ar" ? "فارغ — يُملأ تلقائياً بعد ARP" : "Empty — fills automatically after ARP"}
                      </td></tr>
                    )}
                    {d.arp.map((e, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{e.ip}</td>
                        <td className="p-2">{e.mac}</td>
                        <td className="p-2">{e.portId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </TabsContent>
          )}

          {/* ── routes ── */}
          {d.kind === "router" && (
            <TabsContent value="routes" className="space-y-2">
              {d.routes.filter((r) => r.kind === "static").length === 0 && (
                <div className="text-xs text-muted-foreground">
                  {lang === "ar" ? "لا مسارات ثابتة — أضفها من CLI: ip route <net> <mask> <next-hop>" : "No static routes — add via CLI: ip route <net> <mask> <next-hop>"}
                </div>
              )}
              {d.routes.filter((r) => r.kind === "static").map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2 text-xs font-mono" dir="ltr">
                  <span>S {r.network}/{prefixToMask.length ? "" : ""} {r.mask} → {r.nextHop ?? r.iface}</span>
                  <Button variant="ghost" size="icon" className="size-6" onClick={() => {
                    d.routes = d.routes.filter((rr) => rr !== r);
                    commit();
                  }}><Trash2 className="size-3.5" /></Button>
                </div>
              ))}
            </TabsContent>
          )}

          {/* ── server services ── */}
          {d.kind === "server" && (
            <TabsContent value="services" className="space-y-4">
              <div className="rounded-lg border p-3 space-y-2">
                <div className="text-xs font-bold">{lang === "ar" ? "خادم DHCP" : "DHCP Server"}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{lang === "ar" ? "مفعّل؟" : "Enabled?"}</span>
                  <Switch checked={!!d.dhcpPool} onCheckedChange={(v) => {
                    d.dhcpPool = v
                      ? (d.dhcpPool ?? { ifacePortId: "fa0", subnet: "192.168.1.0", mask: "255.255.255.0", from: "192.168.1.20", to: "192.168.1.60", gateway: "192.168.1.1", dns: "192.168.1.5", domain: "net.local", leases: [] })
                      : null;
                    setDhcp(d.dhcpPool ? { ...d.dhcpPool } : null);
                    commit();
                  }} />
                </div>
                {d.dhcpPool && dhcp && (
                  <div className="space-y-1.5">
                    <Field label={lang === "ar" ? "الشبكة" : "Subnet"} value={dhcp.subnet} onChange={(v) => { dhcp.subnet = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <Field label={lang === "ar" ? "القناع" : "Mask"} value={dhcp.mask} onChange={(v) => { dhcp.mask = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <Field label={lang === "ar" ? "من" : "From"} value={dhcp.from} onChange={(v) => { dhcp.from = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <Field label={lang === "ar" ? "إلى" : "To"} value={dhcp.to} onChange={(v) => { dhcp.to = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <Field label={lang === "ar" ? "البوابة" : "Gateway"} value={dhcp.gateway} onChange={(v) => { dhcp.gateway = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <Field label="DNS" value={dhcp.dns ?? ""} onChange={(v) => { dhcp.dns = v; d.dhcpPool = { ...dhcp }; commit(); }} />
                    <div className="text-[10px] text-muted-foreground" dir="ltr">
                      Leases: {d.dhcpPool.leases.map((l) => `${l.ip}`).join(", ") || "—"}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg border p-3 space-y-2">
                <div className="text-xs font-bold">{lang === "ar" ? "سجلات DNS" : "DNS Records (A)"}</div>
                {d.dnsZone && Object.entries(d.dnsZone.a).map(([name, ip]) => (
                  <div key={name} className="flex items-center justify-between rounded-md bg-muted/50 px-2 py-1 text-xs font-mono" dir="ltr">
                    <span>{name} → {ip}</span>
                    <Button variant="ghost" size="icon" className="size-5" onClick={() => {
                      delete d.dnsZone!.a[name];
                      commit();
                    }}><Trash2 className="size-3" /></Button>
                  </div>
                ))}
                <div className="flex gap-2" dir="ltr">
                  <Input value={newRecord.name} onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })} placeholder="name.local" className="h-8 text-xs font-mono" />
                  <Input value={newRecord.ip} onChange={(e) => setNewRecord({ ...newRecord, ip: e.target.value })} placeholder="192.168.1.5" className="h-8 text-xs font-mono" />
                  <Button size="sm" className="h-8" onClick={() => {
                    if (isValidIp(newRecord.ip) && newRecord.name.trim()) {
                      d.dnsZone = d.dnsZone ?? { a: {} };
                      d.dnsZone.a[newRecord.name.trim()] = newRecord.ip;
                      setNewRecord({ name: "", ip: "" });
                      commit();
                    } else {
                      toast({ title: lang === "ar" ? "بيانات غير صالحة" : "Invalid data", variant: "destructive" });
                    }
                  }}><Plus className="size-3.5" /></Button>
                </div>
              </div>

              <div className="rounded-lg border p-3 space-y-2">
                <div className="text-xs font-bold">{lang === "ar" ? "صفحة HTTP" : "HTTP Page"}</div>
                <Field label={lang === "ar" ? "العنوان" : "Title"} value={d.httpRoot.title} onChange={(v) => { d.httpRoot.title = v; commit(); }} mono={false} />
                <textarea
                  value={d.httpRoot.body}
                  onChange={(e) => { d.httpRoot.body = e.target.value; commit(); }}
                  className="w-full min-h-24 rounded-lg border bg-transparent p-2 text-xs"
                />
              </div>
            </TabsContent>
          )}

          {/* ── wireless ── */}
          {(d.kind === "wirelessRouter" || d.kind === "ap") && (
            <TabsContent value="wireless" className="space-y-3">
              <Field label="SSID" value={d.ssid} onChange={(v) => { d.ssid = v; commit(); }} mono={false} />
              {d.kind === "wirelessRouter" && (
                <>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="text-xs font-semibold">NAT / PAT</div>
                    <Switch checked={d.nat} onCheckedChange={(v) => { d.nat = v; commit(); }} />
                  </div>
                  {d.natTable.length > 0 && (
                    <ScrollArea className="h-28 rounded-lg border">
                      <table className="w-full text-[11px] font-mono" dir="ltr">
                        <thead className="bg-muted/70 sticky top-0"><tr><th className="p-2 text-start">LAN IP:Port</th><th className="p-2 text-start">WAN Port</th></tr></thead>
                        <tbody>
                          {d.natTable.map((m, i) => (
                            <tr key={i} className="border-t"><td className="p-2">{m.lanIp}:{m.lanPort}</td><td className="p-2">{m.wanPort}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </ScrollArea>
                  )}
                </>
              )}
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
