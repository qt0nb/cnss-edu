// ─── NetSim engine: L2/L3 forwarding, ARP, ICMP, DHCP, DNS, HTTP, NAT ───
import type {
  Device,
  DeviceKind,
  Link,
  LinkKind,
  Packet,
  PduLayer,
  Port,
  SimResult,
  SimStep,
  Topology,
} from "./types";

// ─────────────── IP utilities ───────────────
export const ipToInt = (ip: string): number =>
  ip.split(".").reduce((s, o) => (s << 8) + (parseInt(o, 10) || 0), 0) >>> 0;

export const intToIp = (n: number): string =>
  [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

export const prefixToMask = (p: number): string =>
  p === 0 ? "0.0.0.0" : intToIp(0xffffffff << (32 - p) >>> 0);

export const maskToPrefix = (mask: string): number => {
  const bits = ipToInt(mask).toString(2);
  const m = bits.match(/^1*0*$/);
  if (!m || bits.length !== 32) return -1;
  return (bits.match(/1/g) || []).length;
};

export const networkOf = (ip: string, mask: string): string =>
  intToIp((ipToInt(ip) & ipToInt(mask)) >>> 0);

export const sameSubnet = (a: string, b: string, mask: string): boolean =>
  networkOf(a, mask) === networkOf(b, mask);

export const isValidIp = (ip: string): boolean =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").every((o) => +o >= 0 && +o <= 255);

export const isValidMac = (mac: string): boolean =>
  /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(mac);

export const BROADCAST_IP = "255.255.255.255";
export const BROADCAST_MAC = "FF:FF:FF:FF:FF:FF";
export const ZERO_IP = "0.0.0.0";

// ─────────────── Device factory ───────────────
let _mac = 0x0001;
function nextMac(): string {
  _mac += 1;
  return `00:1B:0C:${((_mac >> 16) & 255).toString(16).padStart(2, "0").toUpperCase()}:${((_mac >> 8) & 255).toString(16).padStart(2, "0").toUpperCase()}:${(_mac & 255).toString(16).padStart(2, "0").toUpperCase()}`;
}
export function resetMacCounterFor(topology?: Topology) {
  let max = 0;
  for (const d of topology?.devices ?? []) for (const p of d.ports) {
    const parts = p.mac.split(":").map((h) => parseInt(h, 16));
    max = Math.max(max, (parts[3] << 16) | (parts[4] << 8) | parts[5]);
  }
  _mac = Math.max(_mac, max);
}

const mkPort = (id: string, name: string, kind: Port["kind"]): Port => ({
  id,
  name,
  mac: nextMac(),
  kind,
  linkId: null,
  adminUp: true,
  ip: null,
  mask: null,
  accessVlan: 1,
  trunk: false,
  secure: false,
  stickyMac: null,
});

export function portsForKind(kind: DeviceKind): Port[] {
  switch (kind) {
    case "router":
      return [mkPort("g0/0", "GigabitEthernet0/0", "ethernet"), mkPort("g0/1", "GigabitEthernet0/1", "ethernet"), mkPort("g0/2", "GigabitEthernet0/2", "ethernet"), mkPort("s0/0/0", "Serial0/0/0", "serial"), mkPort("s0/0/1", "Serial0/0/1", "serial")];
    case "switch":
      return [
        ...Array.from({ length: 24 }, (_, i) => mkPort(`fa0/${i + 1}`, `FastEthernet0/${i + 1}`, "ethernet")),
        mkPort("g0/1", "GigabitEthernet0/1", "ethernet"),
        mkPort("g0/2", "GigabitEthernet0/2", "ethernet"),
      ];
    case "hub":
      return Array.from({ length: 8 }, (_, i) => mkPort(`fa0/${i + 1}`, `FastEthernet0/${i + 1}`, "ethernet"));
    case "cloud":
      return Array.from({ length: 6 }, (_, i) => mkPort(`g0/${i}`, `GigabitEthernet0/${i}`, "ethernet"));
    case "pc":
    case "server":
      return [mkPort("fa0", "FastEthernet0", "ethernet")];
    case "laptop":
      return [mkPort("fa0", "FastEthernet0", "ethernet"), mkPort("radio0", "Wireless0", "wireless")];
    case "smartphone":
      return [mkPort("radio0", "Wireless0", "wireless")];
    case "ap":
      return [mkPort("g0/1", "GigabitEthernet0/1", "ethernet"), ...Array.from({ length: 8 }, (_, i) => mkPort(`radio${i}`, `Radio${i}`, "wireless"))];
    case "wirelessRouter":
      return [
        mkPort("g0/0", "GigabitEthernet0/0 (WAN)", "internet"),
        ...Array.from({ length: 4 }, (_, i) => mkPort(`fa0/${i + 1}`, `FastEthernet0/${i + 1}`, "ethernet")),
        ...Array.from({ length: 8 }, (_, i) => mkPort(`radio${i}`, `Radio${i}`, "wireless")),
      ];
    case "firewall":
      return [
        mkPort("g0/0", "GigabitEthernet0/0 (outside)", "ethernet"),
        mkPort("g0/1", "GigabitEthernet0/1 (inside)", "ethernet"),
        mkPort("g0/2", "GigabitEthernet0/2 (DMZ)", "ethernet"),
        mkPort("g0/3", "GigabitEthernet0/3", "ethernet"),
      ];
    case "l3switch":
      return [
        ...Array.from({ length: 24 }, (_, i) => mkPort(`fa0/${i + 1}`, `FastEthernet0/${i + 1}`, "ethernet")),
        mkPort("g0/1", "GigabitEthernet0/1", "ethernet"),
        mkPort("g0/2", "GigabitEthernet0/2", "ethernet"),
        mkPort("vlan10", "Vlan10 (SVI)", "svi"),
        mkPort("vlan20", "Vlan20 (SVI)", "svi"),
        mkPort("vlan30", "Vlan30 (SVI)", "svi"),
      ];
    case "ids":
      return Array.from({ length: 4 }, (_, i) => mkPort(`g0/${i}`, `GigabitEthernet0/${i}`, "ethernet"));
    case "attacker":
      return [mkPort("eth0", "eth0 (Kali)", "ethernet")];
    // ── v3: peripherals & IoT (host port layouts) + modem bridge ──
    case "printer":
    case "ipPhone":
    case "nas":
    case "camera":
      return [mkPort("fa0", "FastEthernet0", "ethernet")];
    case "tv":
      return [mkPort("fa0", "FastEthernet0", "ethernet"), mkPort("radio0", "Wireless0", "wireless")];
    case "thermostat":
      return [mkPort("radio0", "Wireless0", "wireless")];
    case "iotSensor":
      return [mkPort("radio0", "Wireless0", "wireless"), mkPort("fa0", "FastEthernet0", "ethernet")];
    case "modem":
      return [
        mkPort("line0", "Line0 (DSL)", "internet"),
        ...Array.from({ length: 4 }, (_, i) => mkPort(`fa0/${i + 1}`, `FastEthernet0/${i + 1}`, "ethernet")),
      ];
  }
}

const KIND_BASE: Record<DeviceKind, string> = {
  router: "Router",
  l3switch: "L3Sw",
  switch: "Switch",
  firewall: "FW",
  ids: "IDS",
  attacker: "Kali",
  pc: "PC",
  server: "Server",
  laptop: "Laptop",
  smartphone: "Smartphone",
  ap: "AP",
  wirelessRouter: "HomeRouter",
  hub: "Hub",
  cloud: "Cloud",
  printer: "Printer",
  ipPhone: "IPPhone",
  nas: "NAS",
  camera: "Cam",
  tv: "TV",
  thermostat: "Thermo",
  iotSensor: "IoT",
  modem: "Modem",
};

let _dev = 0;
export function createDevice(kind: DeviceKind, x: number, y: number, topo?: Topology): Device {
  const count = (topo?.devices ?? []).filter((d) => d.kind === kind).length;
  const id = `d${++_dev}_${Date.now().toString(36).slice(-4)}`;
  const base: Device = {
    id,
    kind,
    name: `${KIND_BASE[kind]}${count}`,
    x,
    y,
    ports: portsForKind(kind),
    arp: [],
    macTable: [],
    routes: [],
    staticIp: null,
    staticMask: null,
    gateway: null,
    dnsServer: null,
    dhcpClient: false,
    ssid: "NetMastery",
    dhcpPool: null,
    dnsZone: null,
    httpRoot: { title: "NetMastery", body: "مرحباً من خادم NetMastery!\nWelcome from NetMastery server!" },
    nat: kind === "wirelessRouter",
    natTable: [],
    natWanCounter: 40000,
    acls: [],
    defaultDeny: false,
    attack: null,
    idsAlerts: [],
    statsIn: 0,
    statsDropped: 0,
    overloaded: false,
    halfOpen: 0,
  };
  if (kind === "server") {
    base.dnsZone = { a: {} };
  }
  if (kind === "wirelessRouter") {
    const wan = base.ports[0];
    wan.ip = "203.0.113.2";
    wan.mask = "255.255.255.252";
    const lan = base.ports.find((p) => p.id === "fa0/1")!;
    lan.ip = "192.168.0.1";
    lan.mask = "255.255.255.0";
    base.dhcpPool = {
      ifacePortId: "fa0/1",
      subnet: "192.168.0.0",
      mask: "255.255.255.0",
      from: "192.168.0.10",
      to: "192.168.0.50",
      gateway: "192.168.0.1",
      dns: "192.168.0.1",
      domain: "home.local",
      leases: [],
    };
  }
  return base;
}

// ─────────────── Topology helpers ───────────────
export const cloneTopo = (t: Topology): Topology => JSON.parse(JSON.stringify(t)) as Topology;

export const findDevice = (t: Topology, id: string): Device | undefined =>
  t.devices.find((d) => d.id === id);

export const findPort = (d: Device, portId: string): Port | undefined =>
  d.ports.find((p) => p.id === portId);

export const linkOf = (t: Topology, port: Port | null): { link: Link; otherDev: Device; otherPort: Port } | null => {
  if (!port || !port.linkId) return null;
  const link = t.links.find((l) => l.id === port.linkId);
  if (!link) return null;
  const aDev = findDevice(t, link.a.deviceId);
  const bDev = findDevice(t, link.b.deviceId);
  if (!aDev || !bDev) return null;
  const isA = link.a.deviceId === (findDeviceByPort(t, port) ?? aDev).id;
  const other = isA ? bDev : aDev;
  const otherPort = findPort(other, isA ? link.b.portId : link.a.portId)!;
  return { link, otherDev: other, otherPort };
};

function findDeviceByPort(t: Topology, port: Port): Device | undefined {
  return t.devices.find((d) => d.ports.some((p) => p.id === port.id && p === port));
}

// simpler, portability-safe link resolution by (device, port)
export function resolveLink(
  t: Topology,
  deviceId: string,
  portId: string
): { link: Link; otherDevId: string; otherPortId: string } | null {
  const dev = findDevice(t, deviceId);
  const port = dev && findPort(dev, portId);
  if (!dev || !port || !port.linkId) return null;
  const link = t.links.find((l) => l.id === port.linkId);
  if (!link) return null;
  if (link.a.deviceId === deviceId && link.a.portId === portId)
    return { link, otherDevId: link.b.deviceId, otherPortId: link.b.portId };
  if (link.b.deviceId === deviceId && link.b.portId === portId)
    return { link, otherDevId: link.a.deviceId, otherPortId: link.a.portId };
  return null;
}

export function connectPorts(
  t: Topology,
  aDevId: string,
  aPortId: string,
  bDevId: string,
  bPortId: string,
  kind: LinkKind
): Link | null {
  const aDev = findDevice(t, aDevId);
  const bDev = findDevice(t, bDevId);
  const aPort = aDev && findPort(aDev, aPortId);
  const bPort = bDev && findPort(bDev, bPortId);
  if (!aDev || !bDev || !aPort || !bPort) return null;
  if (aPort.linkId || bPort.linkId) return null;
  const link: Link = {
    id: `lk${Date.now().toString(36)}${Math.floor(Math.random() * 999)}`,
    kind,
    a: { deviceId: aDevId, portId: aPortId },
    b: { deviceId: bDevId, portId: bPortId },
  };
  t.links.push(link);
  aPort.linkId = link.id;
  bPort.linkId = link.id;
  return link;
}

const SWITCHY: DeviceKind[] = ["switch", "hub", "cloud", "ap", "l3switch", "ids", "modem"];
export function autoCable(
  t: Topology,
  aDevId: string,
  bDevId: string
): { aPortId: string; bPortId: string; kind: LinkKind } | null {
  const a = findDevice(t, aDevId);
  const b = findDevice(t, bDevId);
  if (!a || !b || a.id === b.id) return null;
  // modem DSL line ↔ ISP cloud/router/firewall uplink (line0 is the WAN side)
  if (a.kind === "modem" || b.kind === "modem") {
    const modem = a.kind === "modem" ? a : b;
    const other = a.kind === "modem" ? b : a;
    if (other.kind === "cloud" || other.kind === "router" || other.kind === "firewall" || other.kind === "wirelessRouter") {
      const line = modem.ports.find((p) => p.id === "line0" && !p.linkId && p.adminUp);
      const oe = other.ports.find((p) => p.kind === "ethernet" && !p.linkId && p.adminUp);
      if (line && oe) {
        return a.kind === "modem"
          ? { aPortId: line.id, bPortId: oe.id, kind: "copper" }
          : { aPortId: oe.id, bPortId: line.id, kind: "copper" };
      }
    }
  }
  // wireless: both have free wireless ports + same ssid
  const aw = a.ports.find((p) => p.kind === "wireless" && !p.linkId && p.adminUp);
  const bw = b.ports.find((p) => p.kind === "wireless" && !p.linkId && p.adminUp);
  const aWirelessOnly = a.kind === "smartphone";
  const bWirelessOnly = b.kind === "smartphone";
  if ((aw && bw) && (aWirelessOnly || bWirelessOnly || a.kind === "ap" || b.kind === "ap" || a.kind === "wirelessRouter" || b.kind === "wirelessRouter")) {
    return { aPortId: aw.id, bPortId: bw.id, kind: "wireless" };
  }
  const serial = (d: Device) => d.ports.find((p) => p.kind === "serial" && !p.linkId && p.adminUp);
  if (a.kind === "router" && b.kind === "router") {
    const sa = serial(a);
    const sb = serial(b);
    if (sa && sb) return { aPortId: sa.id, bPortId: sb.id, kind: "serial" };
  }
  const eth = (d: Device) =>
    d.ports.find((p) => (p.kind === "ethernet" || (p.kind === "internet" && d.kind === "wirelessRouter")) && !p.linkId && p.adminUp);
  const ae = eth(a);
  const be = eth(b);
  if (!ae || !be) return null;
  const aIsSwitchy = SWITCHY.includes(a.kind) || (a.kind === "wirelessRouter" && ae.id !== "g0/0");
  const bIsSwitchy = SWITCHY.includes(b.kind) || (b.kind === "wirelessRouter" && be.id !== "g0/0");
  const kind: LinkKind = aIsSwitchy !== bIsSwitchy ? "copper" : "crossover";
  return { aPortId: ae.id, bPortId: be.id, kind };
}

// ─────────────── PDU construction ───────────────
const ETHERTYPE: Record<string, string> = { ARP: "0x0806", IP: "0x0800", VLAN: "0x8100" };

function mkLayers(p: Omit<Packet, "layers" | "id">, vlan?: number | null): PduLayer[] {
  const layers: PduLayer[] = [];
  if (p.proto === "DHCP") {
    layers.push({ n: 7, title: { ar: "طبقة التطبيق — DHCP", en: "Application — DHCP" }, fields: [ { k: { ar: "الرسالة", en: "Message" }, v: p.kind }, { k: { ar: "المحتوى", en: "Payload" }, v: p.payload ? `${p.payload.en}` : "-" } ] });
  }
  if (p.proto === "DNS") {
    layers.push({ n: 7, title: { ar: "طبقة التطبيق — DNS", en: "Application — DNS" }, fields: [ { k: { ar: "الاستعلام", en: "Query" }, v: p.kind }, { k: { ar: "الاسم", en: "Name" }, v: p.payload ? p.payload.en : "-" } ] });
  }
  if (p.proto === "HTTP") {
    layers.push({ n: 7, title: { ar: "طبقة التطبيق — HTTP", en: "Application — HTTP" }, fields: [ { k: { ar: "الرسالة", en: "Message" }, v: p.kind }, { k: { ar: "المحتوى", en: "Content" }, v: p.payload ? p.payload.en : "-" } ] });
  }
  if (p.srcPort !== undefined) {
    layers.push({ n: 4, title: { ar: "طبقة النقل", en: "Transport Layer" }, fields: [ { k: { ar: "البروتوكول", en: "Protocol" }, v: p.proto === "TCP" || p.proto === "HTTP" ? "TCP" : "UDP" }, { k: { ar: "المنفذ المصدر", en: "Src Port" }, v: String(p.srcPort) }, { k: { ar: "المنفذ الهدف", en: "Dst Port" }, v: String(p.dstPort) } ] });
  } else if (p.proto === "ICMP") {
    layers.push({ n: 4, title: { ar: "طبقة النقل — ICMP", en: "Transport — ICMP" }, fields: [ { k: { ar: "النوع", en: "Type" }, v: p.kind === "Echo Request" ? "8 (Echo Request)" : "0 (Echo Reply)" } ] });
  }
  layers.push({ n: 3, title: { ar: "طبقة الشبكة — IP", en: "Network — IP" }, fields: [ { k: { ar: "عنوان المصدر", en: "Source IP" }, v: p.srcIp }, { k: { ar: "عنوان الهدف", en: "Dest IP" }, v: p.dstIp }, { k: { ar: "TTL", en: "TTL" }, v: String(p.ttl) }, ...(p.proto === "ICMP" ? [] : [{ k: { ar: "البروتوكول", en: "Protocol" }, v: p.proto === "ARP" ? "-" : p.srcPort !== undefined ? (p.proto === "TCP" || p.proto === "HTTP" ? "TCP" : "UDP") : "ICMP" }]) ] });
  layers.push({ n: 2, title: { ar: "طبقة وصلة البيانات — إيثرنت", en: "Data Link — Ethernet" }, fields: [ { k: { ar: "MAC المصدر", en: "Src MAC" }, v: p.srcMac }, { k: { ar: "MAC الهدف", en: "Dst MAC" }, v: p.dstMac }, { k: { ar: "EtherType", en: "EtherType" }, v: p.proto === "ARP" ? ETHERTYPE.ARP : ETHERTYPE.IP }, ...(vlan ? [ { k: { ar: "وسم 802.1Q", en: "802.1Q Tag" }, v: `VLAN ${vlan} (+4 bytes)` } ] : []) ] });
  layers.push({ n: 1, title: { ar: "الطبقة الفيزيائية", en: "Physical Layer" }, fields: [ { k: { ar: "الوسيط", en: "Medium" }, v: "bits — إشارات كهربائية/ضوئية" } ] });
  return layers.reverse().slice().sort((a, b) => b.n - a.n); // L7 on top like PT
}

let _pid = 1;
function mkPacket(p: Omit<Packet, "id" | "layers">, vlan?: number | null): Packet {
  return { ...p, id: _pid++, layers: mkLayers(p, vlan) };
}

// ─────────────── Simulation context ───────────────
interface FlowStat {
  echo: number;
  syn: number;
  dsts: string[];
}

interface Ctx {
  t: Topology;
  steps: SimStep[];
  sid: number;
  warn: string | null; // bilingual note at end
  seen: Set<string>; // loop guard
  maxSteps: number;
  /** per-source flow stats (flood/scan detection at IDS) */
  flow: Map<string, FlowStat>;
  /** IP→MAC binding DB for ARP-spoof detection */
  ipMac: Map<string, string>;
  /** per-target hit counters (flood saturation on victims) */
  hit: Map<string, number>;
}

function step(
  ctx: Ctx,
  dev: Device,
  inPort: string | null,
  outPort: string | null,
  toDeviceId: string | null,
  linkId: string | null,
  packet: Packet,
  info: { ar: string; en: string },
  dropped = false
) {
  ctx.steps.push({
    id: ++ctx.sid,
    deviceId: dev.id,
    deviceName: dev.name,
    inPort,
    outPort,
    linkId,
    toDeviceId,
    packet,
    dropped,
    info,
  });
}

const info = (ar: string, en: string) => ({ ar, en });

// ─────────────── Forwarding ───────────────
const isBridge = (d: Device) => ["switch", "hub", "cloud", "ap", "l3switch", "ids", "modem"].includes(d.kind);

// LAN bridge ports of a wireless router behave like a switch
function wrLanPorts(d: Device): Port[] {
  return d.ports.filter((p) => p.id !== "g0/0");
}

function learnMac(ctx: Ctx, d: Device, inPort: string, srcMac: string, vlan: number) {
  const exists = d.macTable.find((e) => e.mac === srcMac && e.vlan === vlan);
  if (!exists) d.macTable.push({ mac: srcMac, portId: inPort, vlan });
}

function egressPorts(ctx: Ctx, d: Device, inPortId: string, dstMac: string, ingressVlan: number): { port: Port; vlan: number }[] {
  if (d.kind === "hub") {
    return d.ports
      .filter((p) => p.id !== inPortId && p.linkId && p.adminUp)
      .map((p) => ({ port: p, vlan: ingressVlan }));
  }
  if (isBridge(d) || d.kind === "wirelessRouter") {
    const bridgePorts = d.kind === "wirelessRouter" ? wrLanPorts(d) : d.ports;
    const inPort = d.ports.find((p) => p.id === inPortId)!;
    const inIsTrunk = inPort.trunk;
    const up = (p: Port) => p.linkId && p.adminUp && p.id !== inPortId;
    if (dstMac === BROADCAST_MAC) {
      return bridgePorts
        .filter((p) => up(p) && (inIsTrunk || p.trunk || p.accessVlan === ingressVlan))
        .map((p) => ({ port: p, vlan: p.trunk ? ingressVlan : p.accessVlan === ingressVlan ? ingressVlan : ingressVlan }));
    }
    const entry = d.macTable.find((e) => e.mac === dstMac && (e.vlan === ingressVlan || inIsTrunk));
    if (entry) {
      const p = bridgePorts.find((pp) => pp.id === entry.portId);
      if (p && up(p)) {
        const dstIsTrunk = p.trunk;
        if (!dstIsTrunk && !inIsTrunk && p.accessVlan !== ingressVlan) {
          step(ctx, d, inPortId, p.id, null, null, mkPacket({ proto: "ARP", kind: "Dropped", kindBi: { ar: "إطار مُسقط", en: "Frame dropped" }, srcMac: dstMac, dstMac, srcIp: ZERO_IP, dstIp: ZERO_IP, ttl: 0 }), info("أُسقط الإطار: المنفذ في VLAN مختلف", "Frame dropped: port is in a different VLAN"), true);
          return [];
        }
        return [{ port: p, vlan: dstIsTrunk ? ingressVlan : ingressVlan }];
      }
      return [];
    }
    // unknown unicast → flood
    return bridgePorts
      .filter((p) => up(p) && (inIsTrunk || p.trunk || p.accessVlan === ingressVlan))
      .map((p) => ({ port: p, vlan: p.trunk ? ingressVlan : ingressVlan }));
  }
  return [];
}

// send a frame out of a device port onto the wire
function wireOut(
  ctx: Ctx,
  fromDev: Device,
  fromPortId: string,
  packet: Packet,
  depth = 0
): void {
  if (depth > 40 || ctx.steps.length > ctx.maxSteps) {
    step(ctx, fromDev, null, fromPortId, null, null, packet, info("تم إيقاف المحاكاة: حلقة أو عمق كبير — يحتاج STP", "Simulation stopped: loop or excessive depth — STP needed"), true);
    return;
  }
  const res = resolveLink(ctx.t, fromDev.id, fromPortId);
  const port = findPort(fromDev, fromPortId);
  if (!res || !port || !port.adminUp) {
    step(ctx, fromDev, null, fromPortId, null, null, packet, info("الحزمة سقطت: المنفذ غير متصل أو مغلق (shutdown)", "Packet dropped: port not connected or shut down"), true);
    return;
  }
  const outPacket = packet.vlan !== undefined && packet.vlan !== null ? packet : packet;
  step(ctx, fromDev, null, fromPortId, res.otherDevId, res.link.id, outPacket, info("", ""));
  const other = findDevice(ctx.t, res.otherDevId);
  if (!other) return;
  deliver(ctx, other, res.otherPortId, packet, depth + 1);
}

function ingressVlanOf(d: Device, portId: string): number {
  const p = findPort(d, portId);
  if (!p) return 1;
  return p.trunk ? -1 : p.accessVlan; // -1 = came tagged
}

function deliver(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  const key = `${d.id}|${inPortId}|${packet.id}`;
  if (ctx.seen.has(key)) {
    step(ctx, d, inPortId, null, null, null, packet, info("حزمة تدور في حلقة (Loop) — في الواقع يمنعها STP", "Packet looping — real switches prevent this with STP"), true);
    return;
  }
  ctx.seen.add(key);

  // VLAN ingress check on access ports (broadcast tagged?)
  const inPort = findPort(d, inPortId);
  if (!inPort) return;

  // ── bridges (switch/hub/cloud/ap/l3switch/ids) and wireless-router LAN side
  if (isBridge(d) || (d.kind === "wirelessRouter" && inPortId !== "g0/0")) {
    // port-security: lock access ports to their first learned MAC (anti ARP-spoof mitigation)
    if ((d.kind === "switch" || d.kind === "l3switch") && inPort.kind === "ethernet" && inPort.secure) {
      if (inPort.stickyMac && inPort.stickyMac !== packet.srcMac) {
        d.statsDropped = (d.statsDropped ?? 0) + 1;
        pushAlert(d, "port-security", "critical", packet.srcIp, packet.dstIp,
          `انتهاك أمن المنفذ ${inPort.name}: MAC ${packet.srcMac} ≠ المثبّت ${inPort.stickyMac} — الإطار مرفوض`,
          `Port-security violation on ${inPort.name}: MAC ${packet.srcMac} ≠ sticky ${inPort.stickyMac} — frame rejected`);
        step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: أمن المنفذ أسقط إطاراً من ${packet.srcMac}`, `${d.name}: port-security dropped a frame from ${packet.srcMac}`), true);
        return;
      }
      if (!inPort.stickyMac) inPort.stickyMac = packet.srcMac;
    }
    // IDS sensor: inspect everything that traverses this bridge
    if (d.kind === "ids") idsInspect(ctx, d, inPortId, packet);
    // L3 switch: packets addressed to an SVI (its MAC/IP) are routed instead of switched
    if (d.kind === "l3switch") {
      const svi = d.ports.find((p) => p.kind === "svi" && (p.mac === packet.dstMac || (p.ip != null && p.ip === packet.dstIp)));
      if (svi || packet.proto === "ARP") {
        l3Route(ctx, d, inPortId, packet, depth);
        if (svi && packet.dstMac === svi.mac && packet.proto !== "ARP") return;
      }
    }
    const vlan = inPort.trunk ? (packet.vlan ?? 1) : inPort.accessVlan;
    if (d.kind !== "hub") learnMac(ctx, d, inPortId, packet.srcMac, vlan);
    const outs = egressPorts(ctx, d, inPortId, packet.dstMac, vlan);
    if (outs.length === 0) {
      // host attached? just no egress; record device entry info
      if (packet.dstMac === BROADCAST_MAC) {
        step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: بثّ الإطار ولا منافذ خروج أخرى`, `${d.name}: broadcast received, no other egress ports`));
      }
    }
    for (const { port, vlan: outVlan } of outs) {
      const tagged = port.trunk ? vlan : null;
      const pkt = tagged !== null ? { ...packet, vlan: tagged } : { ...packet, vlan: null };
      const localInfo =
        packet.dstMac === BROADCAST_MAC
          ? info(`${d.name}: غمر البث من ${inPort.name} إلى ${port.name}`, `${d.name}: flooding broadcast from ${inPort.name} to ${port.name}`)
          : info(`${d.name}: تعلم ${packet.srcMac} على ${inPort.name} ثم التوجيه إلى ${port.name}`, `${d.name}: learned ${packet.srcMac} on ${inPort.name}, forwarding out ${port.name}`);
      step(ctx, d, inPortId, port.id, null, null, pkt, localInfo);
      wireOut(ctx, d, port.id, pkt, depth);
    }
    // wireless-router LAN side: packets for the router itself (broadcast DHCP/DNS/ARP or unicast to its MAC/IP)
    // are also serviced locally — DHCP pool, DNS zone, ARP replies, ICMP, HTTP — like a real home router
    if (d.kind === "wirelessRouter") {
      const toMe =
        packet.dstMac === BROADCAST_MAC ||
        d.ports.some((p) => p.mac === packet.dstMac) ||
        d.ports.some((p) => p.ip && p.ip === packet.dstIp);
      const serviceable =
        packet.proto === "DHCP" ||
        packet.proto === "ARP" ||
        (packet.proto === "DNS" && packet.kind === "DNS Query") ||
        packet.proto === "ICMP" ||
        packet.proto === "HTTP" ||
        packet.proto === "TCP";
      if (toMe && serviceable) {
        routerHandle(ctx, d, inPortId, packet, depth);
      }
    }
    // if a host/server is directly the target of this bridge's delivery, it arrives via wireOut→deliver on the host
    return;
  }

  // ── router / firewall / wireless-router WAN
  if (d.kind === "router" || d.kind === "firewall" || d.kind === "wirelessRouter") {
    routerHandle(ctx, d, inPortId, packet, depth);
    return;
  }

  // ── hosts (pc/server/laptop/smartphone/attacker + peripherals & IoT: printer/ipPhone/nas/camera/tv/thermostat/iotSensor)
  hostHandle(ctx, d, inPortId, packet, depth);
}

function addArp(d: Device, ip: string, mac: string, portId: string) {
  if (!d.arp.find((e) => e.ip === ip)) d.arp.push({ ip, mac, portId });
}

export function hostIp(d: Device): { ip: string | null; mask: string | null; port: Port | null } {
  if (d.kind === "pc" || d.kind === "server" || d.kind === "printer" || d.kind === "ipPhone" || d.kind === "nas" || d.kind === "camera") {
    const p = d.ports[0];
    return { ip: p.ip ?? d.staticIp, mask: p.mask ?? d.staticMask, port: p };
  }
  // laptop/smartphone/tv/thermostat/iotSensor: first port with ip
  for (const p of d.ports) if (p.ip) return { ip: p.ip, mask: p.mask, port: p };
  return { ip: d.staticIp, mask: d.staticMask, port: d.ports[0] ?? null };
}

function hostHandle(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  const forMe = packet.dstMac === BROADCAST_MAC || d.ports.some((p) => p.mac === packet.dstMac);
  const { ip } = hostIp(d);
  const ipForMe = ip !== null && (packet.dstIp === ip || packet.dstIp === BROADCAST_IP);

  if (packet.proto === "ARP" && packet.kind === "ARP Request") {
    // learn sender
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    if (ip !== null && packet.dstIp === ip) {
      const out = d.ports.find((p) => p.linkId && p.adminUp) ?? d.ports[0];
      const reply = mkPacket({
        proto: "ARP",
        kind: "ARP Reply",
        kindBi: { ar: "رد ARP", en: "ARP Reply" },
        srcMac: out.mac,
        dstMac: packet.srcMac,
        srcIp: ip,
        dstIp: packet.srcIp,
        ttl: 128,
        payload: { ar: `أنا ${ip} وعنواني ${out.mac}`, en: `I am ${ip}, my MAC is ${out.mac}` },
      });
      step(ctx, d, inPortId, out.id, null, null, reply, info(`${d.name}: أنا ${ip} — أرد على طلب ARP`, `${d.name}: I am ${ip} — replying to ARP request`));
      wireOut(ctx, d, out.id, reply, depth);
    } else {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: طلب ARP ليس له — تجاهل`, `${d.name}: ARP request not for me — ignored`));
    }
    return;
  }

  if (packet.proto === "ARP" && packet.kind === "ARP Reply") {
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: تعلمت ${packet.srcIp} هو ${packet.srcMac} — سُجّل في جدول ARP`, `${d.name}: learned ${packet.srcIp} is ${packet.srcMac} — recorded in ARP table`));
    return;
  }

  if (!forMe) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: ليس عنواني MAC — تجاهل الإطار`, `${d.name}: not my MAC — frame ignored`));
    return;
  }

  if (packet.proto === "ICMP" && packet.kind === "Echo Request" && ipForMe) {
    // flood saturation: too many echoes from one source exhaust the victim CPU
    const hits = (ctx.hit.get(`${d.id}|${packet.srcIp}`) ?? 0) + 1;
    ctx.hit.set(`${d.id}|${packet.srcIp}`, hits);
    if (hits >= 6) d.overloaded = true;
    if (d.overloaded) {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: مشبع بالطلبات — CPU 100%، الحزمة مُسقطة`, `${d.name}: saturated by flood — CPU 100%, packet dropped`), true);
      return;
    }
    const out = d.ports.find((p) => p.linkId && p.adminUp) ?? d.ports[0];
    const reply = mkPacket({
      proto: "ICMP",
      kind: "Echo Reply",
      kindBi: { ar: "رد ICMP", en: "ICMP Echo Reply" },
      srcMac: out.mac,
      dstMac: packet.srcMac,
      srcIp: ip!,
      dstIp: packet.srcIp,
      ttl: 128,
    });
    step(ctx, d, inPortId, out.id, null, null, reply, info(`${d.name}: وصلني Ping من ${packet.srcIp} — أرد!`, `${d.name}: ping received from ${packet.srcIp} — replying!`));
    wireOut(ctx, d, out.id, reply, depth);
    return;
  }

  if (packet.proto === "DHCP") {
    dhcpHostHandle(ctx, d, inPortId, packet, depth);
    return;
  }
  if (packet.proto === "DNS" && packet.kind === "DNS Query") {
    // client receiving answer handled below; server:
    dnsHandle(ctx, d, inPortId, packet, depth);
    return;
  }
  if (packet.proto === "DNS" && packet.kind === "DNS Answer") {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: وصل جواب DNS`, `${d.name}: DNS answer received`));
    return;
  }
  if (packet.proto === "TCP" || packet.proto === "HTTP") {
    httpHandle(ctx, d, inPortId, packet, depth);
    return;
  }

  step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: استلم الحزمة`, `${d.name}: packet received`));
}

// ─────────────── Router logic ───────────────
export function connectedRoutes(d: Device): import("./types").Route[] {
  const routes: import("./types").Route[] = [];
  for (const p of d.ports) {
    if (p.ip && p.mask) {
      routes.push({ network: networkOf(p.ip, p.mask), mask: p.mask, nextHop: null, iface: p.id, ad: 0, kind: "connected" });
    }
  }
  return routes;
}

function lookupRoute(d: Device, dstIp: string): import("./types").Route | null {
  const all = [...connectedRoutes(d), ...d.routes];
  let best: import("./types").Route | null = null;
  let bestLen = -1;
  for (const r of all) {
    if (networkOf(dstIp, r.mask) === r.network) {
      const len = maskToPrefix(r.mask);
      if (len > bestLen || (len === bestLen && r.ad < (best?.ad ?? 99))) {
        best = r;
        bestLen = len;
      }
    }
  }
  return best;
}

function routerHandle(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  const inPort = findPort(d, inPortId);
  if (!inPort) return;
  const myMacs = d.ports.map((p) => p.mac);
  const forMe = packet.dstMac === BROADCAST_MAC || myMacs.includes(packet.dstMac);

  // ARP for me?
  if (packet.proto === "ARP" && packet.kind === "ARP Request") {
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    const targetPort = d.ports.find((p) => p.ip === packet.dstIp);
    if (forMe && targetPort) {
      const replyPort = targetPort.linkId && targetPort.adminUp ? targetPort : inPort;
      const reply = mkPacket({
        proto: "ARP",
        kind: "ARP Reply",
        kindBi: { ar: "رد ARP", en: "ARP Reply" },
        srcMac: targetPort.mac,
        dstMac: packet.srcMac,
        srcIp: packet.dstIp,
        dstIp: packet.srcIp,
        ttl: 128,
        payload: { ar: `أنا ${packet.dstIp} عند ${targetPort.mac}`, en: `I am ${packet.dstIp} at ${targetPort.mac}` },
      });
      step(ctx, d, inPortId, replyPort.id, null, null, reply, info(`${d.name}: رد ARP من ${targetPort.name}`, `${d.name}: ARP reply from ${targetPort.name}`));
      wireOut(ctx, d, replyPort.id, reply, depth);
    } else {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: طلب ARP ليس لعناويني`, `${d.name}: ARP request not for my IPs`));
    }
    return;
  }

  if (packet.proto === "ARP" && packet.kind === "ARP Reply") {
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: تعلمت ${packet.srcIp} هو ${packet.srcMac} — سُجّل في ARP`, `${d.name}: learned ${packet.srcIp} is ${packet.srcMac} — recorded in ARP`));
    return;
  }

  // reverse NAT: a session reply arriving on the WAN addressed to my WAN IP → translate & deliver to the LAN host
  if (d.kind === "wirelessRouter" && d.nat && inPortId === "g0/0") {
    const wanP = findPort(d, "g0/0");
    if (wanP?.ip && packet.dstIp === wanP.ip) {
      const map =
        packet.dstPort != null
          ? d.natTable.find((m) => m.wanPort === packet.dstPort)
          : [...d.natTable].reverse().find((m) => !m.lanPort);
      if (map) {
        const out = d.ports.find((p) => p.linkId && p.adminUp && p.id !== "g0/0");
        if (out) {
          let arpE = d.arp.find((a) => a.ip === map.lanIp);
          if (!arpE) {
            ensureArpFor(ctx, d, out, map.lanIp, depth);
            arpE = d.arp.find((a) => a.ip === map.lanIp);
          }
          if (arpE) {
            const fwd = {
              ...packet,
              dstIp: map.lanIp,
              dstPort: map.lanPort || packet.dstPort,
              dstMac: arpE.mac,
              srcMac: out.mac,
              ttl: packet.ttl - 1,
            };
            step(ctx, d, inPortId, out.id, null, null, fwd, info(`${d.name}: NAT عكسي — إعادة ${packet.dstIp}:${packet.dstPort ?? "-"} إلى ${map.lanIp}:${map.lanPort || "-"}`, `${d.name}: reverse NAT — restoring ${packet.dstIp}:${packet.dstPort ?? "-"} to ${map.lanIp}:${map.lanPort || "-"}`));
            wireOut(ctx, d, out.id, fwd, depth);
            return;
          }
        }
      }
    }
  }

  if (!forMe) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: ليس عنواني MAC — تجاهل`, `${d.name}: not my MAC — ignored`));
    return;
  }

  // DHCP server on router? (not typical—servers handle) → skip
  // local services only answer packets addressed to one of my own IPs — everything else gets routed/forwarded
  const isMyDstIp = d.ports.some((p) => p.ip === packet.dstIp);
  if (packet.proto === "DNS" && packet.kind === "DNS Query" && isMyDstIp) {
    dnsHandle(ctx, d, inPortId, packet, depth);
    return;
  }
  if ((packet.proto === "TCP" || packet.proto === "HTTP") && isMyDstIp) {
    httpHandle(ctx, d, inPortId, packet, depth);
    return;
  }
  if (packet.proto === "DHCP") {
    dhcpHostHandle(ctx, d, inPortId, packet, depth);
    return;
  }

  const dstMe = d.ports.find((p) => p.ip === packet.dstIp);
  if (dstMe && packet.proto === "ICMP" && packet.kind === "Echo Request") {
    const replyPort = dstMe.linkId && dstMe.adminUp ? dstMe : inPort;
    const reply = mkPacket({
      proto: "ICMP",
      kind: "Echo Reply",
      kindBi: { ar: "رد ICMP", en: "ICMP Echo Reply" },
      srcMac: dstMe.mac,
      dstMac: packet.srcMac,
      srcIp: packet.dstIp,
      dstIp: packet.srcIp,
      ttl: 128,
    });
    step(ctx, d, inPortId, replyPort.id, null, null, reply, info(`${d.name}: الهدف أنا — رد Pong`, `${d.name}: I am the target — pong reply`));
    wireOut(ctx, d, replyPort.id, reply, depth);
    return;
  }

  // firewall ACL transit filter (traffic to the firewall itself was handled above)
  if (d.kind === "firewall" || (d.acls?.length ?? 0) > 0 || d.defaultDeny) {
    const verdict = aclCheck(d, packet);
    if (verdict.action === "deny") {
      d.statsDropped = (d.statsDropped ?? 0) + 1;
      if (verdict.rule) verdict.rule.hits++;
      pushAlert(d, "acl-deny", "warn", packet.srcIp, packet.dstIp,
        `ACL أسقط ${packet.proto} من ${packet.srcIp} إلى ${packet.dstIp}${verdict.rule ? ` (قاعدة #${verdict.rule.id})` : " (سياسة الرفض الافتراضية)"}`,
        `ACL dropped ${packet.proto} from ${packet.srcIp} to ${packet.dstIp}${verdict.rule ? ` (rule #${verdict.rule.id})` : " (default deny)"}`);
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: ACL — رفض ${packet.proto} ${packet.srcIp} → ${packet.dstIp}`, `${d.name}: ACL — deny ${packet.proto} ${packet.srcIp} → ${packet.dstIp}`), true);
      return;
    }
  }

  // forwarding
  if (packet.ttl <= 1) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: TTL انتهى — إسقاط الحزمة`, `${d.name}: TTL expired — packet dropped`), true);
    return;
  }
  const route = lookupRoute(d, packet.dstIp);
  if (!route) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا يوجد مسار إلى ${packet.dstIp} — إسقاط (أضف ip route)`, `${d.name}: no route to ${packet.dstIp} — dropping (add ip route)`), true);
    return;
  }
  const nextIp = route.nextHop ?? packet.dstIp;
  // resolve egress: explicit iface, or the port whose subnet contains the next hop (recursive next-hop resolution)
  let outPort = route.iface ? findPort(d, route.iface) : undefined;
  if (!outPort || !outPort.linkId || !outPort.adminUp) {
    const nh = d.ports.find(
      (p) => p.ip && p.mask && p.linkId && p.adminUp && networkOf(nextIp, p.mask) === networkOf(p.ip, p.mask)
    );
    if (nh) outPort = nh;
  }
  if (!outPort || !outPort.linkId || !outPort.adminUp) {
    step(ctx, d, inPortId, route.iface, null, null, packet, info(`${d.name}: منفذ الخروج ${route.iface} غير متصل`, `${d.name}: egress ${route.iface} not connected`), true);
    return;
  }
  const arpEntry = d.arp.find((a) => a.ip === nextIp);
  if (!arpEntry) {
    // trigger ARP resolution first
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: أحتاج MAC لـ ${nextIp} — سأرسل ARP أولاً`, `${d.name}: need MAC for ${nextIp} — sending ARP first`));
    ensureArpFor(ctx, d, outPort, nextIp, depth);
    const after = d.arp.find((a) => a.ip === nextIp);
    if (!after) {
      step(ctx, d, inPortId, route.iface, null, null, packet, info(`${d.name}: لا جواب ARP — الحزمة سقطت`, `${d.name}: no ARP reply — packet dropped`), true);
      return;
    }
    forwardRouted(ctx, d, inPortId, outPort, packet, after.mac, depth);
    return;
  }
  forwardRouted(ctx, d, inPortId, outPort, packet, arpEntry.mac, depth);
}

function forwardRouted(ctx: Ctx, d: Device, inPortId: string, outPort: Port, packet: Packet, dstMac: string, depth: number): void {
  // NAT (wireless router LAN→WAN)
  let fwd = packet;
  if (d.kind === "wirelessRouter" && d.nat && outPort.id === "g0/0" && inPortId !== "g0/0") {
    const wanIp = outPort.ip ?? "203.0.113.2";
    const lanPort = packet.srcPort ?? 0;
    let map = d.natTable.find((m) => m.lanIp === packet.srcIp && m.lanPort === lanPort);
    if (!map) {
      map = { lanIp: packet.srcIp, lanPort, wanPort: ++d.natWanCounter };
      d.natTable.push(map);
    }
    fwd = { ...packet, srcIp: wanIp, srcPort: map.wanPort || packet.srcPort, dstMac, srcMac: outPort.mac, ttl: packet.ttl - 1 };
    step(ctx, d, inPortId, outPort.id, null, null, fwd, info(`${d.name}: NAT — استبدال ${packet.srcIp}:${packet.srcPort ?? "-"} بـ ${wanIp}:${map.wanPort}`, `${d.name}: NAT — replacing ${packet.srcIp}:${packet.srcPort ?? "-"} with ${wanIp}:${map.wanPort}`));
    wireOut(ctx, d, outPort.id, fwd, depth);
    return;
  }
  // NAT reverse (WAN→LAN)
  if (d.kind === "wirelessRouter" && d.nat && inPortId === "g0/0" && outPort.id !== "g0/0") {
    const map = d.natTable.find((m) => m.wanPort === (packet.dstPort ?? 0));
    if (map) {
      fwd = { ...packet, dstIp: map.lanIp, dstPort: map.lanPort || packet.dstPort, srcMac: outPort.mac, ttl: packet.ttl - 1 };
      step(ctx, d, inPortId, outPort.id, null, null, fwd, info(`${d.name}: NAT عكسي — إعادة ${packet.dstIp}:${packet.dstPort ?? "-"} إلى ${map.lanIp}`, `${d.name}: reverse NAT — restoring ${packet.dstIp}:${packet.dstPort ?? "-"} to ${map.lanIp}`));
      wireOut(ctx, d, outPort.id, fwd, depth);
      return;
    }
  }
  const fwdPacket = mkPacket({ ...packet, proto: packet.proto, kind: packet.kind, kindBi: packet.kindBi, srcMac: outPort.mac, dstMac, ttl: packet.ttl - 1, srcPort: packet.srcPort, dstPort: packet.dstPort });
  step(ctx, d, inPortId, outPort.id, null, null, fwdPacket, info(`${d.name}: بحث في جدول التوجيه → ${networkOf(packet.dstIp, "255.255.255.255") ? packet.dstIp : ""} خارج ${outPort.name} (TTL-1)`, `${d.name}: routing table lookup → out ${outPort.name} (TTL-1)`));
  wireOut(ctx, d, outPort.id, fwdPacket, depth);
}

function ensureArpFor(ctx: Ctx, d: Device, outPort: Port, targetIp: string, depth: number): void {
  const req = mkPacket({
    proto: "ARP",
    kind: "ARP Request",
    kindBi: { ar: "طلب ARP", en: "ARP Request" },
    srcMac: outPort.mac,
    dstMac: BROADCAST_MAC,
    srcIp: outPort.ip ?? ZERO_IP,
    dstIp: targetIp,
    ttl: 128,
    payload: { ar: `من يعرف ${targetIp}؟`, en: `Who has ${targetIp}?` },
  });
  wireOut(ctx, d, outPort.id, req, depth);
}

// ─────────────── DNS / DHCP / HTTP handlers ───────────────
function dnsHandle(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  if (packet.kind !== "DNS Query") return;
  const zone = d.dnsZone;
  const inP = findPort(d, inPortId);
  const out = (inP && inP.linkId && inP.adminUp ? inP : d.ports.find((p) => p.linkId && p.adminUp)) ?? d.ports[0];
  const name = packet.payload?.en ?? "";
  const answer = zone?.a[name];
  const reply = mkPacket({
    proto: "DNS",
    kind: "DNS Answer",
    kindBi: { ar: "جواب DNS", en: "DNS Answer" },
    srcMac: out.mac,
    dstMac: packet.srcMac,
    srcIp: packet.dstIp,
    dstIp: packet.srcIp,
    ttl: 128,
    srcPort: 53,
    dstPort: packet.srcPort,
    payload: answer
      ? { ar: `${name} = ${answer}`, en: `${name} = ${answer}` }
      : { ar: `${name} غير موجود (NXDOMAIN)`, en: `${name} not found (NXDOMAIN)` },
  });
  step(ctx, d, inPortId, out.id, null, null, reply, answer
    ? info(`${d.name}: جواب DNS — ${name} = ${answer}`, `${d.name}: DNS answer — ${name} = ${answer}`)
    : info(`${d.name}: لا يوجد سجل لـ ${name}`, `${d.name}: no record for ${name}`));
  wireOut(ctx, d, out.id, reply, depth);
}

function dhcpHostHandle(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  const inP = findPort(d, inPortId);
  const out = (inP && inP.linkId && inP.adminUp ? inP : d.ports.find((p) => p.linkId && p.adminUp)) ?? d.ports[0];
  if (packet.kind === "DHCP Discover") {
    // server side
    const pool = d.dhcpPool;
    if (!pool || !pool.ifacePortId) {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا أدير DHCP — تجاهل`, `${d.name}: not a DHCP server — ignoring`));
      return;
    }
    const ip = leaseIp(pool, packet.srcMac);
    const offer = mkPacket({
      proto: "DHCP",
      kind: "DHCP Offer",
      kindBi: { ar: "عرض DHCP", en: "DHCP Offer" },
      srcMac: out.mac,
      dstMac: packet.srcMac,
      srcIp: (findPort(d, pool.ifacePortId)?.ip) ?? "0.0.0.0",
      dstIp: ip,
      ttl: 128,
      srcPort: 67,
      dstPort: 68,
      payload: { ar: `أعرض ${ip} بوابة ${pool.gateway} قناع ${pool.mask}`, en: `Offering ${ip} gw ${pool.gateway} mask ${pool.mask}` },
    });
    step(ctx, d, inPortId, out.id, null, null, offer, info(`${d.name}: عرض DHCP بعنوان ${ip}`, `${d.name}: DHCP offer with ${ip}`));
    wireOut(ctx, d, out.id, offer, depth);
    return;
  }
  if (packet.kind === "DHCP Request" && d.dhcpPool) {
    const pool = d.dhcpPool;
    const m = packet.payload?.en.match(/\b(\d{1,3}(?:\.\d{1,3}){3})\b/);
    const ip = m?.[1] ?? leaseIp(pool, packet.srcMac);
    const ack = mkPacket({
      proto: "DHCP",
      kind: "DHCP Ack",
      kindBi: { ar: "تأكيد DHCP", en: "DHCP Ack" },
      srcMac: out.mac,
      dstMac: packet.srcMac,
      srcIp: (findPort(d, pool.ifacePortId)?.ip) ?? "0.0.0.0",
      dstIp: ip,
      ttl: 128,
      srcPort: 67,
      dstPort: 68,
      payload: { ar: `تأكيد ${ip} بوابة ${pool.gateway} DNS ${pool.dns ?? "-"}`, en: `Ack ${ip} gw ${pool.gateway} dns ${pool.dns ?? "-"}` },
    });
    step(ctx, d, inPortId, out.id, null, null, ack, info(`${d.name}: تأكيد DHCP — ${ip} أصبح لعنوان ${packet.srcMac}`, `${d.name}: DHCP ack — ${ip} assigned to ${packet.srcMac}`));
    wireOut(ctx, d, out.id, ack, depth);
    return;
  }
  // client side
  if (packet.kind === "DHCP Offer" && d.dhcpClient) {
    const ip = packet.dstIp;
    const req = mkPacket({
      proto: "DHCP",
      kind: "DHCP Request",
      kindBi: { ar: "طلب DHCP", en: "DHCP Request" },
      srcMac: out.mac,
      dstMac: BROADCAST_MAC,
      srcIp: ZERO_IP,
      dstIp: BROADCAST_IP,
      ttl: 128,
      srcPort: 68,
      dstPort: 67,
      payload: { ar: `أطلب ${ip}`, en: `Requesting ${ip}` },
    });
    step(ctx, d, inPortId, out.id, null, null, req, info(`${d.name}: طلب العنوان ${ip}`, `${d.name}: requesting ${ip}`));
    (d as Device & { _offered?: string })._offered = ip;
    wireOut(ctx, d, out.id, req, depth);
    return;
  }
  if (packet.kind === "DHCP Ack" && d.dhcpClient) {
    const ip = packet.dstIp;
    const port = out;
    port.ip = ip;
    port.mask = "255.255.255.0";
    const gwMatch = packet.payload?.ar.match(/بوابة\s*(\S+)/);
    const dnsMatch = packet.payload?.ar.match(/DNS\s*(\S+)/);
    d.gateway = gwMatch?.[1] ?? null;
    d.dnsServer = dnsMatch?.[1] && dnsMatch[1] !== "-" ? dnsMatch[1] : null;
    delete (d as Device & { _offered?: string })._offered;
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: استلمت ${ip} عبر DHCP — تم الإعداد!`, `${d.name}: got ${ip} via DHCP — configured!`));
    return;
  }
}

function leaseIp(pool: import("./types").DhcpPool, mac: string): string {
  const existing = pool.leases.find((l) => l.mac === mac);
  if (existing) return existing.ip;
  const from = ipToInt(pool.from);
  const to = ipToInt(pool.to);
  const used = new Set(pool.leases.map((l) => l.ip));
  for (let i = from; i <= to; i++) {
    const cand = intToIp(i);
    if (!used.has(cand)) {
      pool.leases.push({ mac, ip: cand });
      return cand;
    }
  }
  return pool.from;
}

function httpHandle(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  const inP0 = findPort(d, inPortId);
  const out = (inP0 && inP0.linkId && inP0.adminUp ? inP0 : d.ports.find((p) => p.linkId && p.adminUp)) ?? d.ports[0];
  const myIp = hostIp(d).ip ?? d.ports.find((p) => p.ip)?.ip;
  if (!myIp) return;
  const forMeIp = packet.dstIp === myIp;

  if (packet.kind === "TCP SYN" && forMeIp) {
    // SYN flood: half-open connections exhaust the backlog
    const hits = (ctx.hit.get(`${d.id}|${packet.srcIp}`) ?? 0) + 1;
    ctx.hit.set(`${d.id}|${packet.srcIp}`, hits);
    if (hits >= 6) d.halfOpen = 6;
    if ((d.halfOpen ?? 0) >= 6) {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: طابور SYN ممتلئ — رفض الاتصال (SYN Flood?)`, `${d.name}: SYN backlog full — connection refused (SYN flood?)`), true);
      return;
    }
    const synack = mkPacket({ proto: "TCP", kind: "TCP SYN-ACK", kindBi: { ar: "مصافحة SYN-ACK", en: "TCP SYN-ACK" }, srcMac: out.mac, dstMac: packet.srcMac, srcIp: myIp, dstIp: packet.srcIp, ttl: 128, srcPort: packet.dstPort, dstPort: packet.srcPort, flags: "SYN,ACK", seq: "200" });
    step(ctx, d, inPortId, out.id, null, null, synack, info(`${d.name}: SYN-ACK — بدء المصافحة الثلاثية`, `${d.name}: SYN-ACK — three-way handshake`));
    wireOut(ctx, d, out.id, synack, depth);
    return;
  }
  if (packet.kind === "TCP ACK") {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: اكتملت المصافحة — الاتصال مفتوح`, `${d.name}: handshake complete — connection open`));
    return;
  }
  if (packet.kind === "HTTP GET" && forMeIp) {
    const page = d.httpRoot;
    const ok = mkPacket({ proto: "HTTP", kind: "HTTP 200 OK", kindBi: { ar: "رد HTTP 200", en: "HTTP 200 OK" }, srcMac: out.mac, dstMac: packet.srcMac, srcIp: myIp, dstIp: packet.srcIp, ttl: 128, srcPort: 80, dstPort: packet.srcPort, payload: { ar: `${page.title}\n${page.body}`, en: `${page.title}\n${page.body}` } });
    step(ctx, d, inPortId, out.id, null, null, ok, info(`${d.name}: صفحة «${page.title}» جاهزة — 200 OK`, `${d.name}: page "${page.title}" served — 200 OK`));
    wireOut(ctx, d, out.id, ok, depth);
    return;
  }
  step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: استلم حزمة ${packet.kind}`, `${d.name}: received ${packet.kind}`));
}

// ─────────────── Public simulation API ───────────────
function newCtx(t: Topology, maxSteps = 220): Ctx {
  return { t, steps: [], sid: 0, warn: null, seen: new Set(), maxSteps, flow: new Map(), ipMac: new Map(), hit: new Map() };
}

export function simulatePing(topo: Topology, srcId: string, dstIdOrIp: string): SimResult {
  const t = cloneTopo(topo);
  const ctx = newCtx(t);
  const src = findDevice(t, srcId);
  if (!src) return { steps: [], devices: topo.devices, success: false, note: info("الجهاز غير موجود", "Device not found") };
  const { ip, mask, port } = hostIp(src);
  if (!ip || !mask || !port) {
    return { steps: [], devices: topo.devices, success: false, note: info(`${src.name} بلا عنوان IP — اضبطه أولاً من إعدادات الجهاز`, `${src.name} has no IP — configure it first in device settings`) };
  }
  // resolve destination ip
  let dstIp = dstIdOrIp;
  const dstDev = findDevice(t, dstIdOrIp);
  if (dstDev) {
    const dip = hostIp(dstDev).ip;
    if (!dip) return { steps: [], devices: topo.devices, success: false, note: info(`${dstDev.name} بلا عنوان IP`, `${dstDev.name} has no IP`) };
    dstIp = dip;
  }
  // ARP resolution
  const local = sameSubnet(ip, dstIp, mask);
  const nextIp = local ? dstIp : src.gateway;
  if (!nextIp) {
    return { steps: [], devices: topo.devices, success: false, note: info("الوجهة خارج شبكتك ولا يوجد بوابة افتراضية (Default Gateway)", "Destination is off-subnet and no default gateway is set") };
  }
  let arpEntry = src.arp.find((a) => a.ip === nextIp);
  const outPort = local ? port : (port.linkId ? port : port);
  if (!arpEntry) {
    const req = mkPacket({ proto: "ARP", kind: "ARP Request", kindBi: { ar: "طلب ARP", en: "ARP Request" }, srcMac: outPort.mac, dstMac: BROADCAST_MAC, srcIp: ip, dstIp: nextIp, ttl: 128, payload: { ar: `من يعرف ${nextIp}؟`, en: `Who has ${nextIp}?` } });
    step(ctx, src, null, outPort.id, null, null, req, info(`${src.name}: أريد ${nextIp} — إرسال ARP بثّاً`, `${src.name}: need ${nextIp} — broadcasting ARP`));
    wireOut(ctx, src, outPort.id, req, 0);
    arpEntry = src.arp.find((a) => a.ip === nextIp);
    if (!arpEntry) {
      return { steps: ctx.steps, devices: t.devices, success: false, note: info("لا جواب ARP — تحقق من الكابلات والشبكة الفرعية نفسها", "No ARP reply — check cables and matching subnets") };
    }
  }
  const echo = mkPacket({ proto: "ICMP", kind: "Echo Request", kindBi: { ar: "طلب ICMP (Ping)", en: "ICMP Echo Request" }, srcMac: outPort.mac, dstMac: arpEntry.mac, srcIp: ip, dstIp, ttl: 128 });
  step(ctx, src, null, outPort.id, null, null, echo, info(`${src.name}: Ping إلى ${dstIp}`, `${src.name}: ping to ${dstIp}`));
  wireOut(ctx, src, outPort.id, echo, 0);
  const replied = ctx.steps.some((s) => s.packet.kind === "Echo Reply" && s.deviceId === srcId);
  return {
    steps: ctx.steps,
    devices: t.devices,
    success: replied,
    note: replied
      ? info("نجح Ping! رأيت الطلب والرد يمران عبر كل الأجهزة", "Ping succeeded! You saw request & reply traverse every device")
      : info("فشل Ping — راجع الخطوات المظللة بالأحمر", "Ping failed — review the red-marked steps"),
  };
}

export function simulateDhcp(topo: Topology, clientId: string): SimResult {
  const t = cloneTopo(topo);
  const ctx = newCtx(t);
  const client = findDevice(t, clientId);
  if (!client) return { steps: [], devices: topo.devices, success: false, note: info("الجهاز غير موجود", "Device not found") };
  const port = client.ports.find((p) => p.linkId && p.adminUp);
  if (!port) return { steps: [], devices: topo.devices, success: false, note: info("لا يوجد كابل متصل", "No cable connected") };
  const discover = mkPacket({ proto: "DHCP", kind: "DHCP Discover", kindBi: { ar: "استكشاف DHCP", en: "DHCP Discover" }, srcMac: port.mac, dstMac: BROADCAST_MAC, srcIp: ZERO_IP, dstIp: BROADCAST_IP, ttl: 128, srcPort: 68, dstPort: 67, payload: { ar: "هل من خادم DHCP؟", en: "Any DHCP server?" } });
  step(ctx, client, null, port.id, null, null, discover, info(`${client.name}: بث DISCOVER بحثاً عن خادم DHCP`, `${client.name}: broadcasting DISCOVER for a DHCP server`));
  wireOut(ctx, client, port.id, discover, 0);
  const acked = client.ports.some((p) => p.ip) && ctx.steps.some((s) => s.packet.kind === "DHCP Ack");
  return { steps: ctx.steps, devices: t.devices, success: acked, note: acked ? info("تم استئجار العنوان بنجاح (DORA كاملة)", "Lease acquired (full DORA)") : info("لم يصل ACK — تأكد من وجود خادم DHCP بالشبكة نفسها", "No ACK — ensure a DHCP server in the same L2 network") };
}

export function simulateDns(topo: Topology, clientId: string, name: string): SimResult & { resolvedIp: string | null } {
  const t = cloneTopo(topo);
  const ctx = newCtx(t);
  const client = findDevice(t, clientId);
  if (!client) return { steps: [], devices: topo.devices, success: false, note: info("الجهاز غير موجود", "Device not found"), resolvedIp: null };
  const { ip, mask, port } = hostIp(client);
  if (!ip || !mask || !port) return { steps: [], devices: topo.devices, success: false, note: info("اضبط عنوان الجهاز أولاً", "Configure device IP first"), resolvedIp: null };
  if (!client.dnsServer) return { steps: [], devices: topo.devices, success: false, note: info("لا يوجد خادم DNS مضبوط", "No DNS server configured"), resolvedIp: null };
  const local = sameSubnet(ip, client.dnsServer, mask);
  const nextIp = local ? client.dnsServer : client.gateway;
  if (!nextIp) return { steps: [], devices: topo.devices, success: false, note: info("لا بوابة للوصول لخادم DNS", "No gateway to reach DNS server"), resolvedIp: null };
  let arpEntry = client.arp.find((a) => a.ip === nextIp);
  if (!arpEntry) {
    ensureArpFor(ctx, client, port, nextIp, 0);
    arpEntry = client.arp.find((a) => a.ip === nextIp);
    if (!arpEntry) return { steps: ctx.steps, devices: t.devices, success: false, note: info("لا جواب ARP نحو DNS", "No ARP reply toward DNS"), resolvedIp: null };
  }
  const query = mkPacket({ proto: "DNS", kind: "DNS Query", kindBi: { ar: "استعلام DNS", en: "DNS Query" }, srcMac: port.mac, dstMac: arpEntry.mac, srcIp: ip, dstIp: client.dnsServer, ttl: 128, srcPort: 1025, dstPort: 53, payload: { ar: name, en: name } });
  step(ctx, client, null, port.id, null, null, query, info(`${client.name}: استعلام عن ${name}`, `${client.name}: querying ${name}`));
  wireOut(ctx, client, port.id, query, 0);
  const answerStep = [...ctx.steps].reverse().find((s) => s.packet.kind === "DNS Answer" && s.deviceId === clientId);
  const resolved = answerStep?.packet.payload?.ar.split(" = ")[1] ?? null;
  const ok = !!answerStep && !answerStep.packet.payload?.ar.includes("غير موجود");
  return { steps: ctx.steps, devices: t.devices, success: ok, note: ok ? info(`تم حل ${name} إلى ${resolved}`, `Resolved ${name} to ${resolved}`) : info(`تعذر حل ${name}`, `Could not resolve ${name}`), resolvedIp: ok ? resolved : null };
}

export function simulateHttp(topo: Topology, clientId: string, host: string): SimResult & { page: { title: string; body: string } | null } {
  const t = cloneTopo(topo);
  const ctx = newCtx(t);
  const client = findDevice(t, clientId);
  if (!client) return { steps: [], devices: topo.devices, success: false, note: info("الجهاز غير موجود", "Device not found"), page: null };
  let targetIp: string | null = null;
  let stepsSoFar: SimStep[] = [];
  if (!isValidIp(host)) {
    const dns = simulateDns(topo, clientId, host);
    stepsSoFar = dns.steps;
    // commit arp/dns state
    for (const dev of dns.devices) {
      const mine = findDevice(t, dev.id);
      if (mine) {
        mine.arp = dev.arp;
        mine.macTable = dev.macTable;
      }
    }
    targetIp = dns.resolvedIp;
    if (!targetIp) {
      return { steps: stepsSoFar, devices: t.devices, success: false, note: info(`تعذر حل اسم ${host} — أضف سجل A في خادم DNS`, `Cannot resolve ${host} — add an A record on the DNS server`), page: null };
    }
  } else {
    targetIp = host;
  }
  // run on a fresh context so steps continue linearly
  ctx.steps.push(...stepsSoFar);
  ctx.sid = stepsSoFar.length;
  const { ip, mask, port } = hostIp(client);
  if (!ip || !mask || !port) return { steps: ctx.steps, devices: t.devices, success: false, note: info("اضبط عنوان الجهاز أولاً", "Configure device IP first"), page: null };
  const local = sameSubnet(ip, targetIp, mask);
  const nextIp = local ? targetIp : client.gateway;
  if (!nextIp) return { steps: ctx.steps, devices: t.devices, success: false, note: info("لا بوابة مضبوطة", "No gateway set"), page: null };
  let arpEntry = client.arp.find((a) => a.ip === nextIp);
  if (!arpEntry) {
    ensureArpFor(ctx, client, port, nextIp, 0);
    arpEntry = client.arp.find((a) => a.ip === nextIp);
    if (!arpEntry) return { steps: ctx.steps, devices: t.devices, success: false, note: info("لا جواب ARP", "No ARP reply"), page: null };
  }
  // TCP handshake
  const sendTcp = (kind: string, kindBi: { ar: string; en: string }, flags: string, seq: string, srcPort: number, dstPort: number, payload?: { ar: string; en: string }) => {
    const pkt = mkPacket({ proto: kind.startsWith("HTTP") ? "HTTP" : "TCP", kind, kindBi, srcMac: port.mac, dstMac: arpEntry!.mac, srcIp: ip!, dstIp: targetIp!, ttl: 128, srcPort, dstPort, flags, seq, payload });
    wireOut(ctx, client, port.id, pkt, 0);
    return pkt;
  };
  const syn = sendTcp("TCP SYN", { ar: "SYN", en: "TCP SYN" }, "SYN", "100", 1025, 80);
  void syn;
  // SYN-ACK/ACK handled by handlers; send ACK
  const ack = sendTcp("TCP ACK", { ar: "ACK", en: "TCP ACK" }, "ACK", "101", 1025, 80);
  void ack;
  // GET
  const get = sendTcp("HTTP GET", { ar: "طلب GET", en: "HTTP GET" }, "ACK", "102", 1025, 80, { ar: `GET / HTTP/1.1\nHost: ${host}`, en: `GET / HTTP/1.1\nHost: ${host}` });
  void get;
  const okStep = [...ctx.steps].reverse().find((s) => s.packet.kind === "HTTP 200 OK" && s.deviceId === clientId);
  const page = okStep ? { title: okStep.packet.payload?.en.split("\n")[0] ?? "NetMastery", body: okStep.packet.payload?.en.split("\n").slice(1).join("\n") ?? "" } : null;
  return { steps: ctx.steps, devices: t.devices, success: !!okStep, note: okStep ? info("تم تحميل الصفحة بنجاح عبر HTTP!", "Page loaded successfully over HTTP!") : info("لم يصل رد HTTP — تأكد من إعداد الخادم والمسار", "No HTTP reply — check server config & route"), page };
}

// helper to reset a host's DHCP-assigned values
export function releaseIp(d: Device): void {
  for (const p of d.ports) {
    p.ip = null;
    p.mask = null;
  }
  d.gateway = null;
  d.dnsServer = null;
}

export const isHostKind = (k: DeviceKind) => ["pc", "server", "laptop", "smartphone", "attacker", "printer", "ipPhone", "nas", "camera", "tv", "thermostat", "iotSensor"].includes(k);
export const infoBi = info;

// ═══════════════ NetSim v2: ACL / IDS / L3-Switch / Attacks ═══════════════

let _alertId = 0;

/** Record an IDS-style alert on a device (ids sensors, firewalls, switches) */
export function pushAlert(d: Device, kind: import("./types").IdsAlert["kind"], severity: import("./types").IdsAlert["severity"], srcIp: string, dstIp: string, ar: string, en: string): void {
  if (!Array.isArray(d.idsAlerts)) d.idsAlerts = [];
  d.idsAlerts.push({ id: ++_alertId, kind, severity, srcIp, dstIp, detail: { ar, en } });
  if (d.idsAlerts.length > 80) d.idsAlerts.shift();
}

/** Evaluate a packet against a device ACL rule list (first match wins) */
export function aclCheck(d: Device, packet: Packet): { action: "permit" | "deny"; rule: import("./types").AclRule | null } {
  const rules = d.acls ?? [];
  for (const r of rules) {
    if (matchAcl(r, packet)) return { action: r.action, rule: r };
  }
  return { action: d.defaultDeny ? "deny" : "permit", rule: null };
}

function matchAcl(r: import("./types").AclRule, packet: Packet): boolean {
  if (r.src !== "any" && r.srcMask !== "any" && !ipInSubnet(packet.srcIp, r.src, r.srcMask)) return false;
  if (r.dst !== "any" && r.dstMask !== "any" && !ipInSubnet(packet.dstIp, r.dst, r.dstMask)) return false;
  if (r.proto !== "any") {
    const protoName =
      packet.proto === "ICMP" ? "icmp"
        : packet.proto === "TCP" || packet.proto === "HTTP" ? "tcp"
          : packet.proto === "DNS" || packet.proto === "DHCP" ? "udp"
            : "any";
    if (r.proto !== protoName) return false;
    if (r.port != null && packet.dstPort !== r.port) return false;
  }
  return true;
}

function ipInSubnet(ip: string, net: string, mask: string): boolean {
  if (!isValidIp(ip) || !isValidIp(net) || !isValidIp(mask)) return false;
  return networkOf(ip, mask) === networkOf(net, mask);
}

/** IDS sensor inspection: ARP-spoof binding conflicts, floods & scans */
function idsInspect(ctx: Ctx, d: Device, inPortId: string, packet: Packet): void {
  d.statsIn = (d.statsIn ?? 0) + 1;
  // IP↔MAC binding DB: forged ARP replies that contradict a known binding = spoof
  if (packet.proto === "ARP" && packet.kind === "ARP Reply" && isValidIp(packet.srcIp) && packet.srcIp !== ZERO_IP) {
    const prev = ctx.ipMac.get(packet.srcIp);
    if (prev && prev !== packet.srcMac) {
      pushAlert(d, "arp-spoof", "critical", packet.srcIp, packet.dstIp,
        `تسميم ARP مكتشف: ${packet.srcIp} كان ${prev} والآن يدّعي ${packet.srcMac} — مصدره منفذ ${inPortId}`,
        `ARP poisoning detected: ${packet.srcIp} was ${prev} but now claims ${packet.srcMac} — seen on port ${inPortId}`);
      return;
    }
    if (!prev) ctx.ipMac.set(packet.srcIp, packet.srcMac);
  }
  if (!isValidIp(packet.srcIp) || packet.srcIp === ZERO_IP) return;
  // flow statistics per source
  const fs = ctx.flow.get(packet.srcIp) ?? { echo: 0, syn: 0, dsts: [] };
  if (packet.proto === "ICMP" && packet.kind === "Echo Request") fs.echo += 1;
  if (packet.kind === "TCP SYN") fs.syn += 1;
  if (!fs.dsts.includes(packet.dstIp)) fs.dsts.push(packet.dstIp);
  ctx.flow.set(packet.srcIp, fs);
  if (fs.echo === 8) {
    pushAlert(d, "icmp-flood", "critical", packet.srcIp, packet.dstIp,
      `إغراق ICMP: 8+ طلبات Echo متتالية من ${packet.srcIp} — نمط هجوم DDoS`,
      `ICMP flood: 8+ consecutive echo requests from ${packet.srcIp} — DDoS attack pattern`);
  }
  if (fs.syn === 8) {
    pushAlert(d, "syn-flood", "critical", packet.srcIp, packet.dstIp,
      `إغراق SYN: 8+ محاولات اتصال نصف مفتوحة من ${packet.srcIp} إلى ${packet.dstIp}`,
      `SYN flood: 8+ half-open connection attempts from ${packet.srcIp} to ${packet.dstIp}`);
  }
  if (fs.dsts.length === 5) {
    pushAlert(d, "scan", "warn", packet.srcIp, packet.dstIp,
      `مسح شبكة مكتشف: ${packet.srcIp} يرمي حزماً نحو 5 عناوين مختلفة — نمط Port/Host Scan`,
      `Network scan detected: ${packet.srcIp} probing 5 distinct addresses — host/port scan pattern`);
  }
}

// ─────────────── L3 switch SVI routing ───────────────
function l3Route(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  if (packet.proto === "ARP" && packet.kind === "ARP Request") {
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    const svi = d.ports.find((p) => p.kind === "svi" && p.ip === packet.dstIp);
    if (svi && svi.ip) {
      const reply = mkPacket({
        proto: "ARP", kind: "ARP Reply", kindBi: { ar: "رد ARP (SVI)", en: "ARP Reply (SVI)" },
        srcMac: svi.mac, dstMac: packet.srcMac, srcIp: svi.ip, dstIp: packet.srcIp, ttl: 128,
        payload: { ar: `بوابة VLAN أنا ${svi.ip}`, en: `I am the VLAN gateway ${svi.ip}` },
      });
      step(ctx, d, inPortId, inPortId, null, null, reply, info(`${d.name}: SVI ${svi.id} يرد على ARP (${svi.ip})`, `${d.name}: SVI ${svi.id} answers ARP (${svi.ip})`));
      wireOut(ctx, d, inPortId, reply, depth);
    }
    return;
  }
  if (packet.proto === "ARP" && packet.kind === "ARP Reply") {
    addArp(d, packet.srcIp, packet.srcMac, inPortId);
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: تعلمت ${packet.srcIp} = ${packet.srcMac} في جدول ARP`, `${d.name}: learned ${packet.srcIp} = ${packet.srcMac} in ARP table`));
    return;
  }
  const sviMe = d.ports.find((p) => p.kind === "svi" && p.ip === packet.dstIp);
  if (packet.proto === "ICMP" && packet.kind === "Echo Request" && sviMe && sviMe.ip) {
    const reply = mkPacket({
      proto: "ICMP", kind: "Echo Reply", kindBi: { ar: "رد ICMP", en: "ICMP Echo Reply" },
      srcMac: sviMe.mac, dstMac: packet.srcMac, srcIp: sviMe.ip, dstIp: packet.srcIp, ttl: 128,
    });
    step(ctx, d, inPortId, inPortId, null, null, reply, info(`${d.name}: SVI ${sviMe.id} هو الهدف — رد Pong`, `${d.name}: SVI ${sviMe.id} is the target — pong reply`));
    wireOut(ctx, d, inPortId, reply, depth);
    return;
  }
  if (packet.proto === "DHCP" || packet.proto === "DNS") return; // still bridge-serviced below
  if (packet.dstMac !== BROADCAST_MAC) {
    l3Forward(ctx, d, inPortId, packet, depth);
  }
}

function l3Forward(ctx: Ctx, d: Device, inPortId: string, packet: Packet, depth: number): void {
  if (packet.ttl <= 1) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: TTL انتهى — إسقاط`, `${d.name}: TTL expired — dropped`), true);
    return;
  }
  const route = lookupRoute(d, packet.dstIp);
  if (!route) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا مسار إلى ${packet.dstIp} — فعّل ip routing واضبط SVI`, `${d.name}: no route to ${packet.dstIp} — configure an SVI or add a route`), true);
    return;
  }
  // resolve egress SVI by route iface or by subnet match
  let svi = route.iface ? d.ports.find((p) => p.id === route.iface && p.kind === "svi") : undefined;
  if (!svi) {
    svi = d.ports.find((p) => p.kind === "svi" && p.ip && p.mask && networkOf(packet.dstIp, p.mask) === networkOf(p.ip, p.mask));
  }
  if (!svi || !svi.ip) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا SVI لشبكة ${packet.dstIp}`, `${d.name}: no SVI for ${packet.dstIp} subnet`), true);
    return;
  }
  const vlan = parseInt(svi.id.replace("vlan", ""), 10) || 1;
  const nextIp = route.nextHop ?? packet.dstIp;
  let arpEntry = d.arp.find((a) => a.ip === nextIp);
  if (!arpEntry) {
    arpBroadcastOnVlan(ctx, d, vlan, svi, nextIp, depth);
    arpEntry = d.arp.find((a) => a.ip === nextIp);
    if (!arpEntry) {
      step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا جواب ARP في VLAN${vlan} — الحزمة سقطت`, `${d.name}: no ARP reply in VLAN${vlan} — packet dropped`), true);
      return;
    }
  }
  // pick the physical port where the destination MAC lives (or flood the vlan)
  const entry = d.macTable.find((e) => e.mac === arpEntry.mac && e.vlan === vlan);
  const phys = d.ports.filter((p) => p.kind === "ethernet" && p.linkId && p.adminUp && p.id !== inPortId && (p.trunk || p.accessVlan === vlan));
  const targets = entry ? phys.filter((p) => p.id === entry.portId) : phys;
  if (targets.length === 0) {
    step(ctx, d, inPortId, null, null, null, packet, info(`${d.name}: لا منافذ في VLAN${vlan} للخروج`, `${d.name}: no egress ports in VLAN${vlan}`), true);
    return;
  }
  for (const p of targets) {
    const fwd = mkPacket({ ...packet, srcMac: p.mac, dstMac: arpEntry.mac, ttl: packet.ttl - 1, vlan: p.trunk ? vlan : null });
    step(ctx, d, inPortId, p.id, null, null, fwd, info(`${d.name}: توجيه بين VLANs → خارج ${p.name} نحو ${arpEntry.mac} (TTL-1)`, `${d.name}: inter-VLAN route → out ${p.name} toward ${arpEntry.mac} (TTL-1)`));
    wireOut(ctx, d, p.id, fwd, depth);
  }
}

function arpBroadcastOnVlan(ctx: Ctx, d: Device, vlan: number, svi: Port, targetIp: string, depth: number): void {
  const phys = d.ports.filter((p) => p.kind === "ethernet" && p.linkId && p.adminUp && (p.trunk || p.accessVlan === vlan));
  for (const p of phys) {
    const req = mkPacket({
      proto: "ARP", kind: "ARP Request", kindBi: { ar: "طلب ARP", en: "ARP Request" },
      srcMac: p.mac, dstMac: BROADCAST_MAC, srcIp: svi.ip ?? ZERO_IP, dstIp: targetIp, ttl: 128,
      payload: { ar: `من يعرف ${targetIp}؟ (SVI${vlan})`, en: `Who has ${targetIp}? (SVI${vlan})` },
    });
    step(ctx, d, null, p.id, null, null, req, info(`${d.name}: ARP من SVI${vlan} نحو ${targetIp}`, `${d.name}: ARP from SVI${vlan} for ${targetIp}`));
    wireOut(ctx, d, p.id, req, depth);
  }
}

// ─────────────── Attack simulation (Kali attacker device) ───────────────
function resetAttackState(t: Topology): void {
  for (const d of t.devices) {
    d.overloaded = false;
    d.halfOpen = 0;
    d.statsIn = 0;
    d.statsDropped = 0;
    if (Array.isArray(d.idsAlerts)) d.idsAlerts = [];
    for (const p of d.ports) p.stickyMac = p.secure ? p.stickyMac : null;
  }
}

function findDevByIp(t: Topology, ip: string): Device | undefined {
  return t.devices.find((d) => d.ports.some((p) => p.ip === ip));
}

export function simulateAttack(topo: Topology, attackerId: string): SimResult & { report: import("./types").AttackReport } {
  const t = cloneTopo(topo);
  resetAttackState(t);
  const ctx = newCtx(t, 900);
  const atk = findDevice(t, attackerId);
  const empty: import("./types").AttackReport = { blocked: false, reached: 0, sent: 0, alerts: 0, targetDown: false, intercepted: false };
  if (!atk || atk.kind !== "attacker" || !atk.attack || !atk.attack.active) {
    return { steps: [], devices: topo.devices, success: false, note: info("اضبط الهجوم أولاً من تبويب «الهجمات» في جهاز المهاجم", "Configure the attack first in the attacker's Attacks tab"), report: empty };
  }
  const port = atk.ports.find((p) => p.linkId && p.adminUp);
  if (!port) return { steps: [], devices: topo.devices, success: false, note: info("المهاجم غير موصول بكابل", "Attacker has no cable connected"), report: empty };
  const { ip } = hostIp(atk);
  if (!ip) return { steps: [], devices: topo.devices, success: false, note: info("المهاجم بلا عنوان IP", "Attacker has no IP address"), report: empty };
  const { kind, targetIp, victimIp } = atk.attack;
  let sent = 0;
  let reached = 0;
  let intercepted = false;

  const send = (packet: Omit<Packet, "id" | "layers">) => {
    sent += 1;
    const before = ctx.steps.length;
    wireOut(ctx, atk, port.id, mkPacket(packet), 0);
    return ctx.steps.length - before;
  };

  step(ctx, atk, null, port.id, null, null, mkPacket({ proto: "ICMP", kind: "Attack Start", kindBi: { ar: "بدء الهجوم", en: "Attack Start" }, srcMac: port.mac, dstMac: BROADCAST_MAC, srcIp: ip, dstIp: targetIp, ttl: 128, payload: { ar: `${kind} → ${targetIp}`, en: `${kind} → ${targetIp}` } }), info(`${atk.name}: إطلاق ${kind} على ${targetIp}`, `${atk.name}: launching ${kind} at ${targetIp}`));

  if (kind === "arpspoof") {
    // forged unicast ARP replies: "I am <victimIp> at <attacker MAC>"
    const targetDev = findDevByIp(t, targetIp);
    const victimPort = targetDev?.ports.find((p) => p.linkId && p.adminUp);
    if (targetDev && victimPort) {
      for (let i = 0; i < 2; i++) {
        send({
          proto: "ARP", kind: "ARP Reply", kindBi: { ar: "رد ARP مسموم", en: "Poisoned ARP Reply" },
          srcMac: port.mac, dstMac: victimPort.mac, srcIp: victimIp ?? targetIp, dstIp: targetIp, ttl: 128,
          payload: { ar: `أنا ${victimIp} وعنواني ${port.mac} (زيف!)`, en: `I am ${victimIp}, my MAC is ${port.mac} (forged!)` },
        });
      }
      const poisoned = targetDev.arp.find((a) => a.ip === (victimIp ?? ""));
      intercepted = !!poisoned && poisoned.mac === port.mac;
      reached = intercepted ? 1 : 0;
      if (intercepted) {
        step(ctx, targetDev, victimPort.id, null, null, null, mkPacket({ proto: "ARP", kind: "ARP Poison", kindBi: { ar: "تسمم ARP", en: "ARP Poison" }, srcMac: port.mac, dstMac: victimPort.mac, srcIp: ip, dstIp: targetIp, ttl: 64 }), info(`${targetDev.name}: سُمّم جدول ARP — ${victimIp} يُوجَّه الآن إلى MAC المهاجم!`, `${targetDev.name}: ARP table poisoned — ${victimIp} now points to the attacker MAC!`), true);
      }
    }
  } else if (kind === "ddos") {
    for (let i = 0; i < 10; i++) {
      const before = ctx.steps.length;
      send({ proto: "ICMP", kind: "Echo Request", kindBi: { ar: `طلب Echo #${i + 1}`, en: `Echo Request #${i + 1}` }, srcMac: port.mac, dstMac: BROADCAST_MAC, srcIp: ip, dstIp: targetIp, ttl: 64 });
      const arrived = ctx.steps.slice(before).some((s) => s.deviceId === (findDevByIp(t, targetIp)?.id ?? "") && s.inPort && s.packet.kind === "Echo Request");
      if (arrived) reached += 1;
    }
  } else if (kind === "synflood") {
    for (let i = 0; i < 10; i++) {
      const before = ctx.steps.length;
      send({ proto: "TCP", kind: "TCP SYN", kindBi: { ar: `SYN #${i + 1}`, en: `SYN #${i + 1}` }, srcMac: port.mac, dstMac: BROADCAST_MAC, srcIp: ip, dstIp: targetIp, ttl: 64, srcPort: 4000 + i, dstPort: 80, flags: "SYN", seq: String(1000 + i) });
      const arrived = ctx.steps.slice(before).some((s) => s.deviceId === (findDevByIp(t, targetIp)?.id ?? "") && s.inPort && s.packet.kind === "TCP SYN");
      if (arrived) reached += 1;
    }
  } else {
    // scan: probe a small address range
    const base = ipToInt(targetIp);
    for (let i = 0; i < 6; i++) {
      send({ proto: "TCP", kind: "TCP SYN", kindBi: { ar: `مسح ${intToIp(base + i)}:80`, en: `probe ${intToIp(base + i)}:80` }, srcMac: port.mac, dstMac: BROADCAST_MAC, srcIp: ip, dstIp: intToIp(base + i), ttl: 64, srcPort: 5000 + i, dstPort: 80, flags: "SYN", seq: String(2000 + i) });
      const arrived = ctx.steps.some((s) => s.packet.dstIp === intToIp(base + i) && s.inPort && s.deviceId === (findDevByIp(t, intToIp(base + i))?.id ?? ""));
      if (arrived) reached += 1;
    }
  }

  const target = findDevByIp(t, targetIp);
  const alerts = t.devices.reduce((n, d) => n + (d.idsAlerts?.length ?? 0), 0);
  const targetDown = kind === "ddos" ? !!(target?.overloaded) : kind === "synflood" ? (target?.halfOpen ?? 0) >= 6 : intercepted;
  const blocked = sent > 0 && reached === 0;
  const defended = !targetDown && !intercepted;
  const report: import("./types").AttackReport = { blocked, reached, sent, alerts, targetDown, intercepted };

  const notes: Record<string, { ar: string; en: string }> = {
    defended: { ar: `صدَّت دفاعاتك الهجوم! ${alerts} تنبيه IDS، وصلت ${reached}/${sent} حزمة فقط`, en: `Your defense blocked the attack! ${alerts} IDS alerts, only ${reached}/${sent} packets got through` },
    down: { ar: `الهجوم نجح: الهدف ${targetDown ? "سقط (مشبع)" : "مُعترض"} — أضف قواعد جدار ناري أو أمن منافذ`, en: `Attack succeeded: target ${targetDown ? "down (saturated)" : "intercepted"} — add firewall rules or port-security` },
  };
  return {
    steps: ctx.steps,
    devices: t.devices,
    success: defended,
    note: defended ? info(notes.defended.ar, notes.defended.en) : info(notes.down.ar, notes.down.en),
    report,
  };
}

/** Restore defaults on devices loaded from old saved topologies (missing v2 fields) */
export function normalizeTopology(t: Topology): Topology {
  for (const d of t.devices) {
    d.acls = Array.isArray(d.acls) ? d.acls : [];
    d.defaultDeny = !!d.defaultDeny;
    d.attack = d.attack ?? null;
    d.idsAlerts = Array.isArray(d.idsAlerts) ? d.idsAlerts : [];
    d.statsIn = d.statsIn ?? 0;
    d.statsDropped = d.statsDropped ?? 0;
    d.overloaded = !!d.overloaded;
    d.halfOpen = d.halfOpen ?? 0;
    for (const p of d.ports) {
      p.secure = !!p.secure;
      p.stickyMac = p.stickyMac ?? null;
    }
    if (!KIND_BASE[d.kind]) d.kind = "pc";
  }
  return t;
}
