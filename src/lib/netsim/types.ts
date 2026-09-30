// ─── NetSim: Packet-Tracer-style network simulator core types ──────────
import type { Bi } from "@/lib/types";

export type DeviceKind =
  | "router"
  | "switch"
  | "l3switch"
  | "firewall"
  | "ids"
  | "attacker"
  | "pc"
  | "server"
  | "laptop"
  | "smartphone"
  | "ap"
  | "wirelessRouter"
  | "hub"
  | "cloud"
  // ── v3: peripherals, IoT & smart-home end devices + modem bridge ──
  | "printer"
  | "ipPhone"
  | "nas"
  | "camera"
  | "tv"
  | "thermostat"
  | "iotSensor"
  | "modem";

export type LinkKind = "copper" | "crossover" | "serial" | "fiber" | "console" | "wireless";

export type PortKind = "ethernet" | "serial" | "console" | "wireless" | "internet" | "svi";

/** Directional ACL rule enforced on firewall devices */
export interface AclRule {
  id: number;
  action: "permit" | "deny";
  src: string; // "any" or ip
  srcMask: string; // "any" or dotted mask
  dst: string;
  dstMask: string;
  proto: "any" | "icmp" | "tcp" | "udp";
  port: number | null; // dst port match when proto tcp/udp
  hits: number;
}

export type AttackKind = "arpspoof" | "ddos" | "synflood" | "scan";

/** Live attack launched from an attacker device */
export interface AttackState {
  kind: AttackKind;
  targetIp: string; // flood target / scan range start
  victimIp: string | null; // arpspoof: identity being stolen (gateway usually)
  active: boolean;
}

export interface IdsAlert {
  id: number;
  severity: "info" | "warn" | "critical";
  kind: "arp-spoof" | "icmp-flood" | "syn-flood" | "scan" | "acl-deny" | "port-security";
  srcIp: string;
  dstIp: string;
  detail: Bi;
}

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
  /** switch port-security: lock the port to its first learned MAC */
  secure: boolean;
  stickyMac: string | null;
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
  // firewall ACLs + default policy (firewall kind; l3switch can also filter)
  acls: AclRule[];
  defaultDeny: boolean;
  // live attack state (attacker kind)
  attack: AttackState | null;
  // IDS alerts + inspection counters (ids, firewall, switch violations)
  idsAlerts: IdsAlert[];
  // 11-e realism: MOTD banner set via `banner motd <text>` (re-emitted on reload)
  motd?: string | null;
  statsIn: number;
  statsDropped: number;
  // flood victim state (targets overwhelmed by attacks)
  overloaded: boolean;
  halfOpen: number;
}

export interface AttackReport {
  blocked: boolean; // defense stopped every attack packet
  reached: number; // attack packets that hit the target
  sent: number;
  alerts: number; // IDS alerts raised
  targetDown: boolean; // victim overloaded / intercepted
  intercepted: boolean; // arpspoof success
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
  category: "end" | "network" | "wireless" | "wan" | "security" | "iot";
}

export const DEVICE_SPECS: DeviceSpec[] = [
  {
    kind: "router",
    category: "network",
    nameBi: { ar: "موجّه (Router)", en: "Router" },
    descBi: { ar: "1941 ISR — يوجّه الحزم بين الشبكات ويدعم CLI كامل", en: "1941 ISR — routes between networks, full IOS CLI" },
  },
  {
    kind: "l3switch",
    category: "network",
    nameBi: { ar: "مبدّل طبقة-3 (L3 Switch)", en: "Layer-3 Switch" },
    descBi: { ar: "3560 — تمدين + توجيه بين VLANs عبر واجهات SVI", en: "3560 — switching + inter-VLAN routing via SVIs" },
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
    kind: "firewall",
    category: "security",
    nameBi: { ar: "جدار ناري (Firewall)", en: "Firewall" },
    descBi: { ar: "ASA 5505 — قواعد ACL تسمح/تمنع + سياسة افتراضية + سجل إسقاط", en: "ASA 5505 — permit/deny ACL rules + default policy + deny log" },
  },
  {
    kind: "ids",
    category: "security",
    nameBi: { ar: "مستشعر IDS", en: "IDS Sensor" },
    descBi: { ar: "يراقب الحركة العابرة ويكشف ARP-Spoof والإغراق ومسح المنافذ", en: "Inspects transit traffic — detects ARP-spoof, floods & scans" },
  },
  {
    kind: "attacker",
    category: "security",
    nameBi: { ar: "جهاز مهاجم (Kali)", en: "Attacker (Kali)" },
    descBi: { ar: "يطلق ARP-Spoof وDDoS وSYN-Flood وScan من CLI — للتمرين الدفاعي", en: "Launches ARP-spoof, DDoS, SYN-flood & scan from CLI — defensive drills" },
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
  // ── v3: peripherals & IoT (host behavior) + modem (L2 bridge) ──
  {
    kind: "printer",
    category: "iot",
    nameBi: { ar: "طابعة شبكية", en: "Network Printer" },
    descBi: { ar: "طابعة مكتبية موصولة بالإيثرنت — جهاز طرفي مثل الحاسوب", en: "Ethernet office printer — end device like a PC" },
  },
  {
    kind: "ipPhone",
    category: "iot",
    nameBi: { ar: "هاتف IP", en: "IP Phone" },
    descBi: { ar: "هاتف VoIP يعمل بالبروتوكولات الشبكية — طرفية بإيثرنت", en: "VoIP desk phone — ethernet end device" },
  },
  {
    kind: "nas",
    category: "iot",
    nameBi: { ar: "خزنة تخزين NAS", en: "NAS Storage" },
    descBi: { ar: "وحدة تخزين شبكية مركزية تشارك الملفات", en: "Central network-attached storage box" },
  },
  {
    kind: "camera",
    category: "iot",
    nameBi: { ar: "كاميرا مراقبة IP", en: "IP Camera" },
    descBi: { ar: "كاميرا CCTV ترسل الفيديو عبر الشبكة", en: "CCTV camera streaming over the network" },
  },
  {
    kind: "tv",
    category: "iot",
    nameBi: { ar: "تلفاز ذكي", en: "Smart TV" },
    descBi: { ar: "تلفاز ببثّ الإنترنت — إيثرنت وواي فاي معاً", en: "Streaming TV — ethernet + Wi-Fi" },
  },
  {
    kind: "thermostat",
    category: "iot",
    nameBi: { ar: "منظّم حرارة ذكي", en: "Smart Thermostat" },
    descBi: { ar: "يتصل لاسلكياً فقط — جهاز منزل ذكي", en: "Wireless-only smart-home device" },
  },
  {
    kind: "iotSensor",
    category: "iot",
    nameBi: { ar: "مستشعر IoT", en: "IoT Sensor" },
    descBi: { ar: "مستشعر بيئي بواجهتين: لاسلكي وإيثرنت اختياري", en: "Environmental sensor — wireless + optional ethernet" },
  },
  {
    kind: "modem",
    category: "network",
    nameBi: { ar: "مودم DSL", en: "DSL Modem" },
    descBi: { ar: "جسر L2 بين خط الإنترنت والشبكة المحلية — بدون توجيه", en: "L2 bridge between the DSL line and the LAN — no routing" },
  },
];

export const LINK_SPECS: { kind: LinkKind; nameBi: Bi; descBi: Bi }[] = [
  { kind: "copper", nameBi: { ar: "نحاس مستقيم", en: "Copper Straight-Through" }, descBi: { ar: "PC/راوتر ↔ مبدّل", en: "PC/Router ↔ Switch" } },
  { kind: "crossover", nameBi: { ar: "نحاس متقاطع", en: "Copper Cross-Over" }, descBi: { ar: "أجهزة متشابهة مباشرة", en: "Similar devices direct" } },
  { kind: "serial", nameBi: { ar: "تسلسلي DCE", en: "Serial DCE" }, descBi: { ar: "WAN تسلسلي بين راوترات", en: "Serial WAN between routers" } },
  { kind: "fiber", nameBi: { ar: "ألياف ضوئية", en: "Fiber" }, descBi: { ar: "ربط طويل المدى عالي السرعة — محاكاة مبسطة كإيثرنت", en: "Long-reach high-speed — simulated like ethernet" } },
  { kind: "console", nameBi: { ar: "كابل تحكم", en: "Console" }, descBi: { ar: "كابل إدارة — للمحاكاة يتصرف كوصلة عادية", en: "Management cable — simulated as a regular link" } },
  { kind: "wireless", nameBi: { ar: "اتصال لاسلكي", en: "Wireless" }, descBi: { ar: "واي فاي عبر SSID مطابق", en: "Wi-Fi over matching SSID" } },
];
