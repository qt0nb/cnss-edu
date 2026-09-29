"use client";

// ─── NetSim: export menu — JSON / IOS bundle / Containerlab YAML / clipboard ──
import React from "react";
import { Download, FileJson, FileCode2, Boxes, ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import type { Device, Topology } from "@/lib/netsim/types";

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

const ROUTER_LIKE: Device["kind"][] = ["router", "l3switch", "switch", "firewall", "wirelessRouter", "ids"];

/** IOS-like running-config for one router-like device */
function deviceIosConfig(d: Device): string {
  const out: string[] = [];
  out.push(`! ${d.name} — NetSim ${d.kind}`);
  out.push("!");
  out.push(`hostname ${d.name}`);
  out.push("!");
  const switchy = d.kind === "switch" || d.kind === "l3switch";
  for (const p of d.ports) {
    const hasCfg = (p.ip && p.mask) || !p.adminUp || p.trunk || p.secure || (switchy && p.accessVlan !== 1) || p.kind === "svi";
    if (!hasCfg) continue;
    out.push(`interface ${p.name}`);
    if (p.ip && p.mask) out.push(` ip address ${p.ip} ${p.mask}`);
    out.push(p.adminUp ? " no shutdown" : " shutdown");
    if (p.secure) out.push(" switchport port-security");
    if (p.trunk) out.push(" switchport mode trunk");
    else if (switchy && p.accessVlan !== 1 && p.kind !== "svi") out.push(` switchport access vlan ${p.accessVlan}`);
    out.push("!");
  }
  const vlans = [...new Set(d.ports.filter((p) => switchy && p.accessVlan !== 1).map((p) => p.accessVlan))].sort((a, b) => a - b);
  for (const v of vlans) {
    out.push(`vlan ${v}`, ` name VLAN${v}`, "!");
  }
  const statics = d.routes.filter((r) => r.kind === "static");
  for (const r of statics) out.push(`ip route ${r.network} ${r.mask} ${r.nextHop ?? r.iface}`);
  if (statics.length) out.push("!");
  if (d.kind === "firewall" || d.kind === "l3switch") {
    const rules = d.acls ?? [];
    if (rules.length) {
      out.push("! ACL (first match wins)");
      for (const r of rules) {
        out.push(`access-list ${r.action} ${r.proto} ${r.src === "any" ? "any" : `host ${r.src}`} ${r.dst === "any" ? "any" : `host ${r.dst}`}${r.port ? ` eq ${r.port}` : ""}`);
      }
    }
    out.push(d.defaultDeny ? "policy deny-all" : "! default policy: permit-all");
    out.push("!");
  }
  if (d.kind === "wirelessRouter") {
    out.push(`! SSID: ${d.ssid}`);
    out.push(d.nat ? "ip nat inside source list NAT_ACL interface g0/0 overload" : "! NAT disabled");
    out.push("!");
  }
  return out.join("\n");
}

function buildIosBundle(topo: Topology): string {
  const routerLike = topo.devices.filter((d) => ROUTER_LIKE.includes(d.kind));
  const skipped = topo.devices.filter((d) => !ROUTER_LIKE.includes(d.kind));
  const head = [
    "! ═════════════════════════════════════════════════════",
    "! NetMastery NetSim — IOS-like config bundle",
    `! generated: ${new Date().toISOString()}`,
    `! devices: ${routerLike.length} router-like, ${skipped.length} end/wireless (not included)`,
    "! NOTE: the simulator models static routing, VLANs, ACLs & NAT;",
    "!       OSPF/BGP are not part of the saved device state.",
    "! ═════════════════════════════════════════════════════",
    "",
  ].join("\n");
  const body = routerLike.map((d) => deviceIosConfig(d)).join("\n");
  const foot = routerLike.length ? "" : "!\n! (no router-like devices in this topology)\n";
  return head + body + foot;
}

/** honest Containerlab mapping (FRR carries the IOS-like CLI concepts) */
const CLAB_IMAGE: Record<Device["kind"], { image: string; note: string }> = {
  router: { image: "frrouting/frr:latest", note: "FRR — ip address / ip route / ACLs via vtysh" },
  l3switch: { image: "frrouting/frr:latest", note: "FRR — SVIs & inter-VLAN routing" },
  switch: { image: "alpine:3.19", note: "L2 bridging via containerlab linux bridge (VLANs via bridges)" },
  hub: { image: "alpine:3.19", note: "L2 repeater — shared bridge segment" },
  firewall: { image: "alpine:3.19", note: "map ACL rules to iptables/nftables" },
  ids: { image: "alpine:3.19", note: "run Suricata inside for IDS alerts" },
  pc: { image: "alpine:3.19", note: "end host" },
  server: { image: "alpine:3.19", note: "end host — run dnsmasq/webserver for DHCP/DNS/HTTP" },
  laptop: { image: "alpine:3.19", note: "end host" },
  smartphone: { image: "alpine:3.19", note: "end host (wireless flattened to wired)" },
  attacker: { image: "kalilinux/kali-rolling", note: "attack tooling (nmap/hping3)" },
  ap: { image: "alpine:3.19", note: "Wi-Fi not modeled in containerlab — wired bridge only" },
  wirelessRouter: { image: "alpine:3.19", note: "Wi-Fi not modeled; NAT via iptables, DHCP via dnsmasq" },
  cloud: { image: "alpine:3.19", note: "represents the external/internet network" },
  // ── v3 kinds: honest generic-linux mapping (no vendor NOS models these) ──
  printer: { image: "alpine:3.19", note: "end host — print daemon (CUPS) not simulated" },
  ipPhone: { image: "alpine:3.19", note: "end host — VoIP/SIP signaling not simulated" },
  nas: { image: "alpine:3.19", note: "end host — run NFS/Samba yourself" },
  camera: { image: "alpine:3.19", note: "end host — RTSP stream not simulated" },
  tv: { image: "alpine:3.19", note: "end host — streaming client not simulated" },
  thermostat: { image: "alpine:3.19", note: "end host — wireless flattened to wired" },
  iotSensor: { image: "alpine:3.19", note: "end host — telemetry app not simulated" },
  modem: { image: "alpine:3.19", note: "L2 bridge only — no routing/NAT inside" },
};

function sanitizeNodeName(label: string, used: Set<string>): string {
  let base = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (!base) base = "node";
  let name = base;
  let i = 2;
  while (used.has(name)) name = `${base}-${i++}`;
  used.add(name);
  return name;
}

function buildContainerlab(topo: Topology): string {
  const ts = Math.floor(Date.now() / 1000);
  const used = new Set<string>();
  const nodeName = new Map<string, string>();
  const ethCounter = new Map<string, number>();
  const lines: string[] = [];
  lines.push("# ─── NetMastery NetSim → Containerlab export ───");
  lines.push("# Kind mapping (NetSim device → containerlab node):");
  for (const d of topo.devices) {
    const m = CLAB_IMAGE[d.kind];
    const n = sanitizeNodeName(d.name || d.kind, used);
    nodeName.set(d.id, n);
    lines.push(`#   ${d.name} → ${n}: ${m.image} — ${m.note}`);
  }
  lines.push("# links endpoints get sequential eth1, eth2, … per node.");
  lines.push("");
  lines.push(`name: netmastery-${ts}`);
  lines.push("topology:");
  lines.push("  nodes:");
  for (const d of topo.devices) {
    const m = CLAB_IMAGE[d.kind];
    const n = nodeName.get(d.id) as string;
    lines.push(`    ${n}: # NetSim: ${d.name} (${d.kind})`);
    lines.push("      kind: linux");
    lines.push(`      image: ${m.image}`);
  }
  lines.push("  links:");
  if (topo.links.length === 0) lines.push("    []");
  for (const l of topo.links) {
    const na = nodeName.get(l.a.deviceId);
    const nb = nodeName.get(l.b.deviceId);
    if (!na || !nb) continue;
    const ea = (ethCounter.get(na) ?? 0) + 1;
    const eb = (ethCounter.get(nb) ?? 0) + 1;
    ethCounter.set(na, ea);
    ethCounter.set(nb, eb);
    lines.push(`    - endpoints: ["${na}:eth${ea}", "${nb}:eth${eb}"]`);
  }
  lines.push("");
  return lines.join("\n");
}

export default function ExportMenu({ topo }: { topo: Topology }) {
  const { lang, bi, t } = useLang();
  const L = {
    label: { ar: "تصدير", en: "Export" },
    json: { ar: "مخطط JSON", en: "Topology JSON" },
    ios: { ar: "إعدادات IOS (حزمة .txt)", en: "IOS configs (.txt bundle)" },
    clab: { ar: "Containerlab (.yaml)", en: "Containerlab (.yaml)" },
    copy: { ar: "نسخ JSON إلى الحافظة", en: "Copy JSON to clipboard" },
    empty: { ar: "لا أجهزة للتصدير", en: "Nothing to export — no devices" },
    done: { ar: "بدأ التنزيل", en: "Download started" },
    copyErr: { ar: "تعذر النسخ إلى الحافظة", en: "Clipboard copy failed" },
  };

  const guard = () => {
    if (topo.devices.length === 0) {
      toast({ title: bi(L.empty), variant: "destructive" });
      return false;
    }
    return true;
  };

  const exportJson = () => {
    if (!guard()) return;
    download("netsim-topology.json", JSON.stringify(topo, null, 2), "application/json");
    toast({ title: bi(L.done) });
  };

  const exportIos = () => {
    if (!guard()) return;
    download("netsim-ios-configs.txt", buildIosBundle(topo), "text/plain");
    toast({ title: `${bi(L.done)} — IOS .txt` });
  };

  const exportClab = () => {
    if (!guard()) return;
    download("netsim-containerlab.yaml", buildContainerlab(topo), "text/yaml");
    toast({ title: `${bi(L.done)} — containerlab .yaml` });
  };

  const copyJson = async () => {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(topo, null, 2));
      toast({ title: t("copied") });
    } catch {
      toast({ title: bi(L.copyErr), variant: "destructive" });
    }
  };

  const item = "flex items-center gap-2 cursor-pointer text-xs";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" title={bi(L.label)}>
          <Download className="size-3.5" />
          <span className="hidden sm:inline">{bi(L.label)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs">{bi(L.label)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={item} onClick={exportJson}>
          <FileJson className="size-3.5 text-primary" /> {bi(L.json)}
        </DropdownMenuItem>
        <DropdownMenuItem className={item} onClick={exportIos}>
          <FileCode2 className="size-3.5 text-primary" /> {bi(L.ios)}
        </DropdownMenuItem>
        <DropdownMenuItem className={item} onClick={exportClab}>
          <Boxes className="size-3.5 text-primary" /> {bi(L.clab)}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={item} onClick={copyJson}>
          <ClipboardCopy className="size-3.5 text-primary" /> {bi(L.copy)}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1 text-[9px] text-muted-foreground leading-snug">
          {lang === "ar"
            ? "‎Containerlab: راوترات→FRR، المهاجم→Kali، البقية→Alpine مع ملاحظات"
            : "Containerlab: routers→FRR, attacker→Kali, rest→Alpine with notes"}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
