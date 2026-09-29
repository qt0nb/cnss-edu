// ─── NetSim preset labs (like Packet Tracer activities) ────────────────
import type { Device, Topology } from "./types";
import { createDevice, connectPorts, resetMacCounterFor, findPort, autoCable, isValidIp } from "./engine";

export interface NetSimLab {
  id: string;
  title: { ar: string; en: string };
  goal: { ar: string; en: string };
  steps: { ar: string; en: string }[];
  difficulty: 1 | 2 | 3;
  build: () => Topology;
}

function T(devices: Device[], links: ReturnType<typeof connectPorts>[]): Topology {
  return { devices, links: links.filter((l): l is NonNullable<typeof l> => l !== null) };
}

function setIp(d: Device, portId: string, ip: string, mask: string) {
  const p = findPort(d, portId);
  if (p) { p.ip = ip; p.mask = mask; }
}
function setHost(d: Device, ip: string, mask: string, gw: string | null, dns: string | null = null) {
  const p = d.ports.find((pp) => pp.kind !== "wireless") ?? d.ports[0];
  p.ip = ip; p.mask = mask;
  d.gateway = gw; d.dnsServer = dns;
}
function addRoute(d: Device, net: string, mask: string, next: string) {
  d.routes.push({ network: net, mask, nextHop: next, iface: "", ad: 1, kind: "static" });
}
function linkPair(t: Topology, a: Device, b: Device) {
  const auto = autoCable(t, a.id, b.id);
  if (!auto) return null;
  return connectPorts(t, a.id, auto.aPortId, b.id, auto.bPortId, auto.kind);
}

export const NETSIM_LABS: NetSimLab[] = [
  {
    id: "lab1",
    difficulty: 1,
    title: { ar: "المعمل ١: أول شبكة محلية", en: "Lab 1: First LAN" },
    goal: { ar: "ping من PC0 إلى PC1 ومراقبة الطلب والرد يمران عبر المبدّل", en: "Ping from PC0 to PC1 and watch the request & reply traverse the switch" },
    steps: [
      { ar: "انقر أداة «Ping» ثم انقر PC0 ثم PC1", en: "Pick the Ping tool, then click PC0 then PC1" },
      { ar: "شغّل التشغيل وشاهد مغلف الحزمة يتحرك", en: "Press play and watch the envelope move" },
      { ar: "انقر أي خطوة لفحص الحزمة طبقة-بطبقة (PDU)", en: "Click any event to inspect the PDU layer by layer" },
      { ar: "افتح المبدّل لترى جدول MAC يتعلم العنوانين", en: "Open the switch to see the MAC table learning both addresses" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const sw = createDevice("switch", 400, 260, t); t.devices.push(sw);
      const pc0 = createDevice("pc", 140, 180, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 140, 360, t); t.devices.push(pc1);
      const l1 = linkPair(t, pc0, sw);
      const l2 = linkPair(t, pc1, sw);
      setHost(pc0, "192.168.1.10", "255.255.255.0", null);
      setHost(pc1, "192.168.1.20", "255.255.255.0", null);
      return T(t.devices, [l1, l2]);
    },
  },
  {
    id: "lab2",
    difficulty: 2,
    title: { ar: "المعمل ٢: ping عبر موجّهين", en: "Lab 2: Ping across two routers" },
    goal: { ar: "شبكتان 192.168.1.0/24 و 192.168.2.0/24 تتصلان عبر WAN — لاحظ تناقص TTL", en: "Two LANs 192.168.1.0/24 & 192.168.2.0/24 joined via WAN — watch TTL decrement" },
    steps: [
      { ar: "شغّل ping من PC0 إلى PC1", en: "Run ping from PC0 to PC1" },
      { ar: "لاحظ ARP أولاً ثم ICMP، وعند كل راوتر يقل TTL بمقدار 1", en: "Notice ARP first, then ICMP; TTL decreases by 1 at each router" },
      { ar: "افتح R0 وجرّب: show ip route", en: "Open R0 and try: show ip route" },
      { ar: "احذف المسار الثابت (no ip route) ثم أعد ping — لماذا فشل؟", en: "Remove the static route (no ip route) then re-ping — why does it fail?" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const sw0 = createDevice("switch", 330, 160, t); t.devices.push(sw0);
      const sw1 = createDevice("switch", 570, 360, t); t.devices.push(sw1);
      const pc0 = createDevice("pc", 120, 120, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 790, 420, t); t.devices.push(pc1);
      const r0 = createDevice("router", 330, 330, t); t.devices.push(r0);
      const r1 = createDevice("router", 570, 190, t); t.devices.push(r1);
      const links = [
        linkPair(t, pc0, sw0),
        linkPair(t, sw0, r0),
        linkPair(t, r0, r1),
        linkPair(t, r1, sw1),
        linkPair(t, sw1, pc1),
      ];
      setHost(pc0, "192.168.1.10", "255.255.255.0", "192.168.1.1");
      setHost(pc1, "192.168.2.10", "255.255.255.0", "192.168.2.1");
      setIp(r0, "g0/0", "192.168.1.1", "255.255.255.0");
      setIp(r0, "s0/0/0", "10.0.0.1", "255.255.255.252");
      setIp(r1, "g0/0", "192.168.2.1", "255.255.255.0");
      setIp(r1, "s0/0/0", "10.0.0.2", "255.255.255.252");
      addRoute(r0, "192.168.2.0", "255.255.255.0", "10.0.0.2");
      addRoute(r1, "192.168.1.0", "255.255.255.0", "10.0.0.1");
      return T(t.devices, links);
    },
  },
  {
    id: "lab3",
    difficulty: 2,
    title: { ar: "المعمل ٣: DHCP + DNS + HTTP", en: "Lab 3: DHCP + DNS + HTTP" },
    goal: { ar: "الخادم يوزّع العناوين تلقائياً ويحل الأسماء ويقدم صفحات ويب — جرب المتصفح في الحاسوب", en: "Server hands out IPs, resolves names & serves web — try the PC browser" },
    steps: [
      { ar: "انقر نقراً مزدوجاً PC0 ثم تبويب «إعداد IP» واختر DHCP ثم «طلب عنوان»", en: "Double-click PC0 → IP Config tab → DHCP → Request address" },
      { ar: "راقب رسائل DORA الأربع في لوحة المحاكاة", en: "Watch the four DORA messages in the simulation panel" },
      { ar: "افتح «المتصفح» في PC0 واكتب net.local", en: "Open the PC browser and type net.local" },
      { ar: "راجع خطوات DNS ثم TCP ثم HTTP في السجل", en: "Review the DNS → TCP → HTTP steps in the event log" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const sw = createDevice("switch", 430, 270, t); t.devices.push(sw);
      const srv = createDevice("server", 700, 150, t); t.devices.push(srv);
      const pc0 = createDevice("pc", 150, 200, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 150, 360, t); t.devices.push(pc1);
      const links = [linkPair(t, sw, srv), linkPair(t, pc0, sw), linkPair(t, pc1, sw)];
      setHost(srv, "192.168.1.5", "255.255.255.0", null);
      srv.dhcpClient = false;
      srv.dnsZone = { a: { "net.local": "192.168.1.5", "srv.local": "192.168.1.5" } };
      srv.dhcpPool = {
        ifacePortId: "fa0",
        subnet: "192.168.1.0",
        mask: "255.255.255.0",
        from: "192.168.1.20",
        to: "192.168.1.60",
        gateway: "192.168.1.5",
        dns: "192.168.1.5",
        domain: "net.local",
        leases: [],
      };
      srv.httpRoot = { title: "أهلاً من خادم المعمل!", body: "هذه صفحة تُقدَّم عبر HTTP.\nThis page is served over HTTP.\nجرّب ping الخادم أيضاً: 192.168.1.5" };
      pc0.dhcpClient = true;
      pc1.dhcpClient = true;
      return T(t.devices, links);
    },
  },
  {
    id: "lab4",
    difficulty: 2,
    title: { ar: "المعمل ٤: عزل VLAN", en: "Lab 4: VLAN isolation" },
    goal: { ar: "VLAN10 و VLAN20 على المبدّل نفسه: ping ينجح داخل الـVLAN ويفشل بينها", en: "VLAN10 & VLAN20 on one switch: ping works within a VLAN and fails across" },
    steps: [
      { ar: "Ping PC0 → PC1 (كلاهما VLAN 10) — نجاح", en: "Ping PC0 → PC1 (both VLAN 10) — success" },
      { ar: "Ping PC0 → PC2 (VLAN 20) — فشل رغم الشبكة نفسها!", en: "Ping PC0 → PC2 (VLAN 20) — fails despite same subnet!" },
      { ar: "افتح المبدّل وراجع منافذ كل VLAN", en: "Open the switch and review port VLAN membership" },
      { ar: "جرّب تحويل منفذ PC2 إلى VLAN 10 من CLI ثم أعد المحاولة", en: "Move PC2 port to VLAN 10 via CLI and retry" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const sw = createDevice("switch", 470, 270, t); t.devices.push(sw);
      const pcs: Device[] = [];
      for (let i = 0; i < 4; i++) {
        const pc = createDevice("pc", 150 + (i === 0 || i === 2 ? 0 : 30), 130 + i * 90, t);
        t.devices.push(pc);
        pcs.push(pc);
      }
      const links = pcs.map((pc) => linkPair(t, pc, sw));
      pcs.forEach((pc, i) => setHost(pc, `192.168.1.1${i + 1}`, "255.255.255.0", null));
      // ports fa0/1..4 → pcs; vlans 10,10,20,20
      for (const p of sw.ports) {
        const idx = parseInt(p.id.replace("fa0/", ""), 10);
        if (idx >= 1 && idx <= 4) {
          p.accessVlan = idx <= 2 ? 10 : 20;
        }
      }
      return T(t.devices, links);
    },
  },
  {
    id: "lab5",
    difficulty: 3,
    title: { ar: "المعمل ٥: الشبكة المنزلية اللاسلكية + NAT", en: "Lab 5: Wireless home network + NAT" },
    goal: { ar: "راوتر منزلي بواي فاي وDHCP وNAT يصل بهاتفك وحاسوبك بالإنترنت (الخادم العام)", en: "Home router with Wi-Fi, DHCP & NAT connects your phone & laptop to the Internet (public server)" },
    steps: [
      { ar: "اطلب عنوان DHCP للحاسوب المحمول والهاتف", en: "Request DHCP for the laptop and smartphone" },
      { ar: "ping الخادم العام 203.0.113.10 من الهاتف", en: "Ping the public server 203.0.113.10 from the phone" },
      { ar: "افتح المتصفح في الهاتف واكتب web.local — اربط DNS أولاً", en: "Open the phone browser and type web.local — set DNS first" },
      { ar: "افتح الراوتر المنزلي وراقب جدول NAT", en: "Open the home router and inspect the NAT table" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const wr = createDevice("wirelessRouter", 420, 280, t); t.devices.push(wr);
      const laptop = createDevice("laptop", 150, 180, t); t.devices.push(laptop);
      const phone = createDevice("smartphone", 150, 380, t); t.devices.push(phone);
      const cloud = createDevice("cloud", 660, 200, t); t.devices.push(cloud);
      const web = createDevice("server", 850, 340, t); t.devices.push(web);
      const links = [linkPair(t, laptop, wr), linkPair(t, phone, wr), linkPair(t, wr, cloud), linkPair(t, cloud, web)];
      // widen WAN subnet so the public server is reachable via the cloud bridge
      setIp(wr, "g0/0", "203.0.113.2", "255.255.255.0");
      setIp(web, "fa0", "203.0.113.10", "255.255.255.0");
      // the home router also answers DNS for the home (simplification of a DNS forwarder)
      wr.dnsZone = { a: { "web.local": "203.0.113.10" } };
      web.httpRoot = { title: "الإنترنت!", body: "وصلت إلى خادم عام عبر NAT!\nYou reached a public server through NAT!" };
      laptop.dhcpClient = true;
      phone.dhcpClient = true;
      laptop.dnsServer = "192.168.0.1";
      phone.dnsServer = "192.168.0.1";
      return T(t.devices, links);
    },
  },
  {
    id: "lab6",
    difficulty: 3,
    title: { ar: "المعمل ٦: سلسلة ثلاث راوترات — طرق ثابتة", en: "Lab 6: Three-router chain — static routes" },
    goal: { ar: "شبكة ثلاث راوترات: يحتاج كل راوتر مسارات للشبكات البعيدة — افحص show ip route", en: "Three routers: each needs routes to remote networks — check show ip route" },
    steps: [
      { ar: "Ping من PC0 إلى PC1 — يمر عبر R0 و R1 و R2", en: "Ping from PC0 to PC1 — crosses R0, R1, R2" },
      { ar: "افتح كل راوتر وشغّل show ip route", en: "Open each router and run show ip route" },
      { ar: "احذف مساراً من R1 (no ip route) وأعد ping — أين سقطت؟", en: "Delete a route on R1 (no ip route) and re-ping — where does it die?" },
      { ar: "أضفه مجدداً بالأمر ip route ... — راجع جدول التوجيه", en: "Re-add it with ip route ... — verify the routing table" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const pc0 = createDevice("pc", 110, 160, t); t.devices.push(pc0);
      const r0 = createDevice("router", 320, 250, t); t.devices.push(r0);
      const r1 = createDevice("router", 510, 250, t); t.devices.push(r1);
      const r2 = createDevice("router", 700, 250, t); t.devices.push(r2);
      const pc1 = createDevice("pc", 900, 160, t); t.devices.push(pc1);
      const links = [linkPair(t, pc0, r0), linkPair(t, r0, r1), linkPair(t, r1, r2), linkPair(t, r2, pc1)];
      setHost(pc0, "10.1.0.10", "255.255.255.0", "10.1.0.1");
      setHost(pc1, "10.3.0.10", "255.255.255.0", "10.3.0.1");
      setIp(r0, "g0/0", "10.1.0.1", "255.255.255.0");
      setIp(r0, "s0/0/0", "10.12.0.1", "255.255.255.252");
      setIp(r1, "s0/0/0", "10.12.0.2", "255.255.255.252");
      setIp(r1, "s0/0/1", "10.23.0.1", "255.255.255.252");
      setIp(r2, "s0/0/0", "10.23.0.2", "255.255.255.252");
      setIp(r2, "g0/0", "10.3.0.1", "255.255.255.0");
      addRoute(r0, "10.23.0.0", "255.255.255.252", "10.12.0.2");
      addRoute(r0, "10.3.0.0", "255.255.255.0", "10.12.0.2");
      addRoute(r1, "10.1.0.0", "255.255.255.0", "10.12.0.1");
      addRoute(r1, "10.3.0.0", "255.255.255.0", "10.23.0.2");
      addRoute(r2, "10.12.0.0", "255.255.255.252", "10.23.0.1");
      addRoute(r2, "10.1.0.0", "255.255.255.0", "10.23.0.1");
      return T(t.devices, links);
    },
  },
];

export const sanitizeTopology = (raw: unknown): Topology | null => {
  try {
    const t = raw as Topology;
    if (!t || !Array.isArray(t.devices) || !Array.isArray(t.links)) return null;
    for (const d of t.devices) {
      if (!d.id || !d.kind || !Array.isArray(d.ports)) return null;
      for (const l of t.links) {
        if (isValidIp("1.1.1.1") && (!l.a?.deviceId || !l.b?.deviceId)) return null;
      }
    }
    resetMacCounterFor(t);
    return t;
  } catch {
    return null;
  }
};
