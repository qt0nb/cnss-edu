// ─── NetSim: Packet-Tracer-style network simulator core types ──────────
import type { Bi } from "@/lib/types";

export type DeviceKind =
  | "router"
  | "switch"
  | "pc"
  | "server"
  | "laptop"
  | "smartphone"
  | "ap"
  | "wirelessRouter"
  | "hub"
  | "cloud";

export type LinkKind = "copper" | "crossover" | "serial" | "fiber" | "console" | "wireless";

export type PortKind = "ethernet" | "serial" | "console" | "wireless" | "internet";

export interface Port {
  id: string; // canonical short id, e.g. "g0/0"
  name: string; // display name, e.g. "GigabitEthernet0/0"
  mac: string;
  kind: PortKind;
  linkId: string | null;
  adminUp: boolean; // shutdown / no shutdown
  ip: string | null;
  mask: string | null;
  accessVlan: number;
  trunk: boolean;
}

export interface ArpEntry {
  ip: string;
  mac: string;
  portId: string;
}

export interface MacEntry {
  mac: string;
  portId: string;
  vlan: number;
}

export interface Route {
  network: string;
  mask: string;
  nextHop: string | null; // null => exit-interface connected
  iface: string;
  ad: number;
  kind: "connected" | "static";
}

export interface DhcpPool {
  ifacePortId: string;
  subnet: string; // network address
  mask: string;
  from: string;
  to: string;
  gateway: string;
  dns: string | null;
  domain: string;
  leases: { mac: string; ip: string }[];
}

export interface DnsZone {
  a: Record<string, string>;
}

export interface Device {
  id: string;
  kind: DeviceKind;
  name: string;
  x: number;
  y: number;
  ports: Port[];
  arp: ArpEntry[]; // hosts & routers
  macTable: MacEntry[]; // switches, cloud, ap, wirelessRouter bridge
  routes: Route[]; // routers
  // host (pc/laptop/server/smartphone):
  staticIp: string | null;
  staticMask: string | null;
  gateway: string | null;
  dnsServer: string | null;
  dhcpClient: boolean;
  // wireless:
  ssid: string;
  // server roles:
  dhcpPool: DhcpPool | null;
  dnsZone: DnsZone | null;
  httpRoot: { title: string; body: string };
  // wireless router NAT:
  nat: boolean;
  natTable: { lanIp: string; lanPort: number; wanPort: number }[];
  natWanCounter: number;
}

export interface Link {
  id: string;
  kind: LinkKind;
  a: { deviceId: string; portId: string };
  b: { deviceId: string; portId: string };
}

export interface Topology {
  devices: Device[];
  links: Link[];
}

export type Proto = "ARP" | "ICMP" | "DHCP" | "DNS" | "TCP" | "HTTP";

export interface PduField {
  k: Bi;
  v: string;
}

export interface PduLayer {
  n: number;
  title: Bi;
  fields: PduField[];
}

export interface Packet {
  id: number;
  proto: Proto;
  kind: string; // "Echo Request", "ARP Request" ...
  kindBi: Bi;
  srcMac: string;
  dstMac: string;
  srcIp: string;
  dstIp: string;
  ttl: number;
  srcPort?: number;
  dstPort?: number;
  seq?: string;
  flags?: string;
  payload?: Bi;
  vlan?: number | null; // tagged on trunks
  layers: PduLayer[];
}

export interface SimStep {
  id: number;
  deviceId: string;
  deviceName: string;
  inPort: string | null;
  outPort: string | null;
  linkId: string | null;
  toDeviceId: string | null;
  packet: Packet;
  dropped: boolean;
  info: Bi;
}

export interface SimResult {
  steps: SimStep[];
  devices: Device[]; // post-sim mutated devices (ARP/MAC learning, DHCP leases)
  success: boolean;
  note: Bi;
}

// device catalog entry for the palette
export interface DeviceSpec {
  kind: DeviceKind;
  nameBi: Bi;
  descBi: Bi;
  category: "end" | "network" | "wireless" | "wan";
}

export const DEVICE_SPECS: DeviceSpec[] = [
  {
    kind: "router",
    category: "network",
    nameBi: { ar: "موجّه (Router)", en: "Router" },
    descBi: { ar: "1941 ISR — يوجّه الحزم بين الشبكات ويدعم CLI كامل", en: "1941 ISR — routes between networks, full IOS CLI" },
  },
  {
    kind: "switch",
    category: "network",
    nameBi: { ar: "مبدّل (Switch)", en: "Switch" },
    descBi: { ar: "2960 — ٢٤ منفذاً مع VLANs وجدول MAC", en: "2960 — 24 ports, VLANs, MAC table" },
  },
  {
    kind: "hub",
    category: "network",
    nameBi: { ar: "موزّع (Hub)", en: "Hub" },
    descBi: { ar: "جهاز قديم يكرر كل شيء لكل المنافذ — لتعلم الفرق عن المبدّل", en: "Legacy repeater — floods everything, to contrast with switches" },
  },
  {
    kind: "pc",
    category: "end",
    nameBi: { ar: "حاسوب (PC)", en: "PC" },
    descBi: { ar: "سطح مكتب مع سطر أوامر ومتصفح وإعداد IP", en: "Desktop with CLI, browser & IP config" },
  },
  {
    kind: "laptop",
    category: "end",
    nameBi: { ar: "حاسوب محمول", en: "Laptop" },
    descBi: { ar: "يدعم الإيثرنت والواي فاي معاً", en: "Ethernet + Wi-Fi capable" },
  },
  {
    kind: "smartphone",
    category: "wireless",
    nameBi: { ar: "هاتف ذكي", en: "Smartphone" },
    descBi: { ar: "يتصل لاسلكياً فقط", en: "Wireless-only connection" },
  },
  {
    kind: "server",
    category: "end",
    nameBi: { ar: "خادم (Server)", en: "Server" },
    descBi: { ar: "يقدم HTTP و DNS و DHCP معاً — قلب المعمل", en: "HTTP + DNS + DHCP roles — lab centerpiece" },
  },
  {
    kind: "ap",
    category: "wireless",
    nameBi: { ar: "نقطة وصول (AP)", en: "Access Point" },
    descBi: { ar: "جسر لاسلكي بين الواي فاي والإيثرنت", en: "Wireless-to-Ethernet L2 bridge" },
  },
  {
    kind: "wirelessRouter",
    category: "wireless",
    nameBi: { ar: "راوتر منزلي", en: "Home Wireless Router" },
    descBi: { ar: "WAN + LAN + واي فاي + DHCP + NAT", en: "WAN + LAN + Wi-Fi + DHCP + NAT" },
  },
  {
    kind: "cloud",
    category: "wan",
    nameBi: { ar: "سحابة الإنترنت", en: "Internet Cloud" },
    descBi: { ar: "تمثل شبكة المزوّد/الإنترنت بين المواقع", en: "ISP/Internet between sites" },
  },
];

export const LINK_SPECS: { kind: LinkKind; nameBi: Bi; descBi: Bi }[] = [
  { kind: "copper", nameBi: { ar: "نحاس مستقيم", en: "Copper Straight-Through" }, descBi: { ar: "PC/راوتر ↔ مبدّل", en: "PC/Router ↔ Switch" } },
  { kind: "crossover", nameBi: { ar: "نحاس متقاطع", en: "Copper Cross-Over" }, descBi: { ar: "أجهزة متشابهة مباشرة", en: "Similar devices direct" } },
  { kind: "serial", nameBi: { ar: "تسلسلي DCE", en: "Serial DCE" }, descBi: { ar: "WAN تسلسلي بين راوترات", en: "Serial WAN between routers" } },
  { kind: "fiber", nameBi: { ar: "ألياف ضوئية", en: "Fiber" }, descBi: { ar: "ربط طويل المدى عالي السرعة", en: "Long-reach high-speed" } },
  { kind: "console", nameBi: { ar: "كابل تحكم", en: "Console" }, descBi: { ar: "إعداد مباشر من الحاسوب", en: "Direct management from PC" } },
  { kind: "wireless", nameBi: { ar: "اتصال لاسلكي", en: "Wireless" }, descBi: { ar: "واي فاي عبر SSID مطابق", en: "Wi-Fi over matching SSID" } },
];
