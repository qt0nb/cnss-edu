// ─── Auto-graded practical challenges ─────────────────────────────────
// Each challenge ships a BROKEN topology; the learner types IOS-like
// commands for one target device, and grading really happens: the
// commands are applied to a simulated topology and connectivity checks
// (ping / http / dhcp / attack) are executed with the netsim engine.
import type { Device, DeviceKind, LinkKind, Topology } from "@/lib/netsim/types";
import { createDevice, connectPorts, resetMacCounterFor, findPort, simulateDhcp } from "@/lib/netsim/engine";

/**
 * A single graded check. Executed against the topology AFTER the learner's
 * commands are applied:
 * - "ping"      → simulatePing(src → dst) must succeed
 * - "ping-fail" → simulatePing(src → dst) must FAIL (something must stay blocked)
 * - "http"      → simulateHttp(src → dst-as-IP) must load a page
 * - "dhcp"      → simulateDhcp(src) must obtain a lease
 * - "attack"    → simulateAttack(src) must be defended (attack blocked)
 */
export interface ChallengeCheck {
  kind: "ping" | "ping-fail" | "http" | "dhcp" | "attack";
  label: { ar: string; en: string };
  srcId: string; // device id in the built topology (stable, e.g. "c1pc0")
  dstId: string; // device id (unused for dhcp / attack)
}

export interface Challenge {
  id: string; // "ch1".."ch12"
  title: { ar: string; en: string };
  story: { ar: string; en: string }; // scenario narrative, 2-4 sentences
  difficulty: 1 | 2 | 3;
  xp: number; // 40..120
  targetDevice: string; // label of the device the learner configures (e.g. "R1")
  targetKind: "router" | "switch" | "l3switch" | "firewall" | "wirelessRouter" | "pc";
  hints: { ar: string; en: string }[]; // progressive hints
  solution: { ar: string; en: string }; // commands summary revealed after solving
  build: () => Topology; // the BROKEN topology (stable device ids)
  checks: ChallengeCheck[];
}

// ─────────────── local helpers (same conventions as netsim/labs.ts) ───────────────

function mk(t: Topology, kind: DeviceKind, id: string, name: string, x: number, y: number): Device {
  const d = createDevice(kind, x, y, t);
  d.id = id; // stable id so checks can reference it
  d.name = name;
  t.devices.push(d);
  return d;
}

function cable(t: Topology, a: Device, aPort: string, b: Device, bPort: string, kind: LinkKind = "copper") {
  connectPorts(t, a.id, aPort, b.id, bPort, kind);
}

function setIp(d: Device, portId: string, ip: string, mask: string) {
  const p = findPort(d, portId);
  if (p) {
    p.ip = ip;
    p.mask = mask;
  }
}

function setHost(d: Device, ip: string, mask: string, gw: string | null) {
  const p = d.ports.find((pp) => pp.kind !== "wireless") ?? d.ports[0];
  p.ip = ip;
  p.mask = mask;
  d.gateway = gw;
}

function addRoute(d: Device, net: string, mask: string, next: string) {
  d.routes.push({ network: net, mask, nextHop: next, iface: "", ad: 1, kind: "static" });
}

function fresh(): Topology {
  const t: Topology = { devices: [], links: [] };
  resetMacCounterFor(t);
  return t;
}

/**
 * connectPorts() mints link ids from Date.now()+Math.random(), so links created
 * in the same millisecond can collide (flaky port→link resolution). We re-key
 * every link id deterministically from its authoritative endpoints.
 */
function relink(t: Topology, prefix: string) {
  t.links.forEach((l, i) => {
    const nid = `${prefix}lk${i}`;
    const a = t.devices.find((d) => d.id === l.a.deviceId);
    const b = t.devices.find((d) => d.id === l.b.deviceId);
    const ap = a && a.ports.find((p) => p.id === l.a.portId);
    const bp = b && b.ports.find((p) => p.id === l.b.portId);
    l.id = nid;
    if (ap) ap.linkId = nid;
    if (bp) bp.linkId = nid;
  });
}

// ─────────────── the 12 challenges ───────────────

export const CHALLENGES: Challenge[] = [
  // ch1 — router interface without an IP
  {
    id: "ch1",
    title: { ar: "واجهة بلا عنوان", en: "Interface Without an Address" },
    story: {
      ar: "شبكة صغيرة بموجّه واحد R1 يربط الشبكة 192.168.1.0/24 (PC0) بالشبكة 192.168.2.0/24 (PC1). أثناء التركيب نُسيت واجهة g0/1 بلا عنوان IP، فتصل حزم PC0 إلى الموجّه ثم تضيع عنده. أكمل الإعداد حتى ينجح ping من PC0 إلى PC1.",
      en: "A small network: router R1 joins 192.168.1.0/24 (PC0) to 192.168.2.0/24 (PC1). During installation, interface g0/1 was left without an IP, so PC0's packets reach the router and die there. Finish the configuration so that PC0 can ping PC1.",
    },
    difficulty: 1,
    xp: 40,
    targetDevice: "R1",
    targetKind: "router",
    hints: [
      { ar: "البوابة الافتراضية لـ PC1 هي 192.168.2.1 — من يملك هذا العنوان على الشبكة الثانية؟", en: "PC1's default gateway is 192.168.2.1 — which device should own that address on the second network?" },
      { ar: "أدخل وضع الإعداد ثم الواجهة: interface g0/1 ثم ip address 192.168.2.1 255.255.255.0", en: "Enter config mode and the interface: interface g0/1 then ip address 192.168.2.1 255.255.255.0" },
      { ar: "لا تنسَ end للخروج، وكل أمر conf t يحتاج enable قبله.", en: "Remember end to leave; and conf t requires enable first." },
    ],
    solution: {
      ar: "enable ← conf t ← interface g0/1 ← ip address 192.168.2.1 255.255.255.0 ← end",
      en: "enable → conf t → interface g0/1 → ip address 192.168.2.1 255.255.255.0 → end",
    },
    build: () => {
      const t = fresh();
      const r1 = mk(t, "router", "c1r1", "R1", 540, 260);
      const pc0 = mk(t, "pc", "c1pc0", "PC0", 160, 150);
      const pc1 = mk(t, "pc", "c1pc1", "PC1", 160, 380);
      cable(t, pc0, "fa0", r1, "g0/0", "crossover");
      cable(t, pc1, "fa0", r1, "g0/1", "crossover");
      setIp(r1, "g0/0", "192.168.1.1", "255.255.255.0");
      // g0/1 left without an IP (the fault)
      setHost(pc0, "192.168.1.10", "255.255.255.0", "192.168.1.1");
      setHost(pc1, "192.168.2.10", "255.255.255.0", "192.168.2.1");
      relink(t, "c1-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC1", en: "Ping PC0 → PC1" }, srcId: "c1pc0", dstId: "c1pc1" },
    ],
  },

  // ch2 — missing return route
  {
    id: "ch2",
    title: { ar: "مسار العودة المفقود", en: "The Missing Return Route" },
    story: {
      ar: "موقعان يرتبطان عبر WAN: شبكة PC0 خلف R1 (192.168.1.0/24) وخادم Server0 خلف R2 (192.168.2.0/24)، والوصلة التسلسلية 10.0.0.0/30 بين الموجّهين. حُفظ مسار R1 نحو الشبكة الثانية لكن مسار العودة على R2 نُسي، فالطلبات تصل الخادم وأجوبتها تضيع في الطريق. أضف المسار الناقص على R2.",
      en: "Two sites over a WAN: PC0's network behind R1 (192.168.1.0/24) and Server0 behind R2 (192.168.2.0/24), with a serial link 10.0.0.0/30 between them. R1's route toward the second network was saved, but R2's return route was forgotten — requests reach the server while its replies die on the way back. Add the missing route on R2.",
    },
    difficulty: 1,
    xp: 50,
    targetDevice: "R2",
    targetKind: "router",
    hints: [
      { ar: "شغّل show ip route على R2: الشبكة 192.168.1.0/24 غير موجودة في جدوله.", en: "Run show ip route on R2: the 192.168.1.0/24 network is missing from its table." },
      { ar: "الصيغة: ip route 192.168.1.0 255.255.255.0 10.0.0.1 — القفزة التالية هي R1.", en: "Syntax: ip route 192.168.1.0 255.255.255.0 10.0.0.1 — the next hop is R1." },
    ],
    solution: {
      ar: "enable ← conf t ← ip route 192.168.1.0 255.255.255.0 10.0.0.1 ← end",
      en: "enable → conf t → ip route 192.168.1.0 255.255.255.0 10.0.0.1 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c2pc0", "PC0", 100, 200);
      const sw1 = mk(t, "switch", "c2sw1", "SW1", 280, 200);
      const r1 = mk(t, "router", "c2r1", "R1", 280, 390);
      const r2 = mk(t, "router", "c2r2", "R2", 560, 390);
      const sw2 = mk(t, "switch", "c2sw2", "SW2", 780, 200);
      const srv = mk(t, "server", "c2srv", "Server0", 950, 200);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, sw1, "g0/1", r1, "g0/0");
      cable(t, r1, "s0/0/0", r2, "s0/0/0", "serial");
      cable(t, r2, "g0/0", sw2, "g0/1");
      cable(t, sw2, "fa0/1", srv, "fa0");
      setHost(pc0, "192.168.1.10", "255.255.255.0", "192.168.1.1");
      setHost(srv, "192.168.2.10", "255.255.255.0", "192.168.2.1");
      setIp(r1, "g0/0", "192.168.1.1", "255.255.255.0");
      setIp(r1, "s0/0/0", "10.0.0.1", "255.255.255.252");
      setIp(r2, "g0/0", "192.168.2.1", "255.255.255.0");
      setIp(r2, "s0/0/0", "10.0.0.2", "255.255.255.252");
      addRoute(r1, "192.168.2.0", "255.255.255.0", "10.0.0.2");
      // R2's return route intentionally missing (the fault)
      relink(t, "c2-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى Server0", en: "Ping PC0 → Server0" }, srcId: "c2pc0", dstId: "c2srv" },
    ],
  },

  // ch3 — wrong manual IP/gateway on a PC
  {
    id: "ch3",
    title: { ar: "إعداد يدوي خاطئ", en: "Bad Manual Config" },
    story: {
      ar: "استُنسخ PC0 من مكتب قديم فبقي على إعداده اليدوي السابق: 192.168.99.10/24 وبوابة 192.168.99.1. الشبكة الفعلية هنا 192.168.1.0/24 ببوابة R1 (192.168.1.1)، وخلف R1 شبكة ثانية 192.168.2.0/24 فيها PC2. صحّح إعداد PC0 نفسه بأوامر ipconfig.",
      en: "PC0 was cloned from an old office and kept its stale manual settings: 192.168.99.10/24 with gateway 192.168.99.1. The real LAN here is 192.168.1.0/24 with gateway R1 (192.168.1.1), and behind R1 sits a second network 192.168.2.0/24 hosting PC2. Fix PC0 itself with ipconfig commands.",
    },
    difficulty: 1,
    xp: 50,
    targetDevice: "PC0",
    targetKind: "pc",
    hints: [
      { ar: "أوامر جهاز الطرفية هنا ليست IOS بل: ipconfig /ip <عنوان> <قناع> و ipconfig /gw <بوابة>.", en: "This end device doesn't use IOS: try ipconfig /ip <address> <mask> and ipconfig /gw <gateway>." },
      { ar: "العنوان الصحيح 192.168.1.10 بقناع 255.255.255.0 والبوابة 192.168.1.1.", en: "The correct address is 192.168.1.10 mask 255.255.255.0 with gateway 192.168.1.1." },
    ],
    solution: {
      ar: "ipconfig /ip 192.168.1.10 255.255.255.0 ثم ipconfig /gw 192.168.1.1",
      en: "ipconfig /ip 192.168.1.10 255.255.255.0 then ipconfig /gw 192.168.1.1",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c3pc0", "PC0", 110, 150);
      const pc1 = mk(t, "pc", "c3pc1", "PC1", 110, 370);
      const sw1 = mk(t, "switch", "c3sw1", "SW1", 330, 260);
      const r1 = mk(t, "router", "c3r1", "R1", 560, 260);
      const pc2 = mk(t, "pc", "c3pc2", "PC2", 860, 260);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, pc1, "fa0", sw1, "fa0/2");
      cable(t, sw1, "g0/1", r1, "g0/0");
      cable(t, r1, "g0/1", pc2, "fa0", "crossover");
      setHost(pc1, "192.168.1.20", "255.255.255.0", null);
      setHost(pc2, "192.168.2.10", "255.255.255.0", "192.168.2.1");
      setIp(r1, "g0/0", "192.168.1.1", "255.255.255.0");
      setIp(r1, "g0/1", "192.168.2.1", "255.255.255.0");
      // PC0 stuck on the old office's settings (the fault)
      setHost(pc0, "192.168.99.10", "255.255.255.0", "192.168.99.1");
      relink(t, "c3-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC1 (الشبكة المحلية)", en: "Ping PC0 → PC1 (local LAN)" }, srcId: "c3pc0", dstId: "c3pc1" },
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC2 (عبر الموجّه)", en: "Ping PC0 → PC2 (across the router)" }, srcId: "c3pc0", dstId: "c3pc2" },
    ],
  },

  // ch4 — missing default route toward the internet
  {
    id: "ch4",
    title: { ar: "المسار الافتراضي نحو الخارج", en: "Default Route to the Outside" },
    story: {
      ar: "فرع الشركة على الشبكة 192.168.1.0/24 خلف الموجّه R1، ومركز البيانات على 172.16.9.0/24 خلف R2 عبر وصلة WAN تسلسلية 10.0.0.0/30. كان مخططاً تشغيل توجيه ديناميكي (OSPF) لكنه لم يُفعّل قط، وR2 يعرف طريق العودة أصلاً. امنح R1 مساراً افتراضياً نحو R2 حتى يفتح PC0 خادم المركز.",
      en: "The branch office sits on 192.168.1.0/24 behind R1, and the data center on 172.16.9.0/24 behind R2 across serial WAN 10.0.0.0/30. Dynamic routing (OSPF) was planned but never enabled; R2 already knows the way back. Give R1 a default route toward R2 so PC0 can reach the data-center server.",
    },
    difficulty: 2,
    xp: 60,
    targetDevice: "R1",
    targetKind: "router",
    hints: [
      { ar: "المسار الافتراضي يكتب 0.0.0.0 0.0.0.0 ثم القفزة التالية.", en: "A default route is written 0.0.0.0 0.0.0.0 followed by the next hop." },
      { ar: "القفزة التالية هي واجهة R2 التسلسلية: 10.0.0.2.", en: "The next hop is R2's serial interface: 10.0.0.2." },
    ],
    solution: {
      ar: "enable ← conf t ← ip route 0.0.0.0 0.0.0.0 10.0.0.2 ← end",
      en: "enable → conf t → ip route 0.0.0.0 0.0.0.0 10.0.0.2 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c4pc0", "PC0", 100, 200);
      const sw1 = mk(t, "switch", "c4sw1", "SW1", 280, 200);
      const r1 = mk(t, "router", "c4r1", "R1", 280, 390);
      const r2 = mk(t, "router", "c4r2", "R2", 560, 390);
      const sw2 = mk(t, "switch", "c4sw2", "SW2", 780, 200);
      const srv = mk(t, "server", "c4srv", "Server0", 950, 200);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, sw1, "g0/1", r1, "g0/0");
      cable(t, r1, "s0/0/0", r2, "s0/0/0", "serial");
      cable(t, r2, "g0/0", sw2, "g0/1");
      cable(t, sw2, "fa0/1", srv, "fa0");
      setHost(pc0, "192.168.1.10", "255.255.255.0", "192.168.1.1");
      setHost(srv, "172.16.9.10", "255.255.255.0", "172.16.9.1");
      setIp(r1, "g0/0", "192.168.1.1", "255.255.255.0");
      setIp(r1, "s0/0/0", "10.0.0.1", "255.255.255.252");
      setIp(r2, "g0/0", "172.16.9.1", "255.255.255.0");
      setIp(r2, "s0/0/0", "10.0.0.2", "255.255.255.252");
      addRoute(r2, "192.168.1.0", "255.255.255.0", "10.0.0.1");
      // R1 has no default/dynamic route (the fault)
      relink(t, "c4-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى خادم المركز Server0", en: "Ping PC0 → Server0 (data center)" }, srcId: "c4pc0", dstId: "c4srv" },
    ],
  },

  // ch5 — switch port in the wrong VLAN
  {
    id: "ch5",
    title: { ar: "منفذ خارج VLAN 10", en: "Port Outside VLAN 10" },
    story: {
      ar: "قسم المبيعات على VLAN 10 بشبكة 192.168.10.0/24: PC0 وPC1 والموجّه R1 (192.168.10.1) كلها منافذها يجب أن تكون في VLAN 10 على المبدّل SW1. PC1 يعمل بشكل طبيعي لكن PC0 معزول تماماً — منفذه بقي في VLAN 1 الافتراضية. صحّح انتماء المنفذ.",
      en: "Sales lives on VLAN 10, network 192.168.10.0/24: PC0, PC1 and router R1 (192.168.10.1) should all sit in VLAN 10 on switch SW1. PC1 works fine, but PC0 is completely isolated — its port was left in the default VLAN 1. Fix the port membership.",
    },
    difficulty: 2,
    xp: 60,
    targetDevice: "SW1",
    targetKind: "switch",
    hints: [
      { ar: "على المبدّلات: interface fa0/1 ثم switchport access vlan 10.", en: "On switches: interface fa0/1 then switchport access vlan 10." },
      { ar: "PC0 موصول بالمنفذ fa0/1 — تحقق بالأمر show vlan بعد التعديل.", en: "PC0 is plugged into fa0/1 — verify with show vlan after the change." },
    ],
    solution: {
      ar: "enable ← conf t ← interface fa0/1 ← switchport access vlan 10 ← end",
      en: "enable → conf t → interface fa0/1 → switchport access vlan 10 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c5pc0", "PC0", 110, 150);
      const pc1 = mk(t, "pc", "c5pc1", "PC1", 110, 370);
      const sw1 = mk(t, "switch", "c5sw1", "SW1", 350, 260);
      const r1 = mk(t, "router", "c5r1", "R1", 620, 260);
      cable(t, pc0, "fa0", sw1, "fa0/1"); // stays in VLAN 1 (the fault)
      cable(t, pc1, "fa0", sw1, "fa0/2");
      cable(t, sw1, "g0/1", r1, "g0/0");
      const p2 = findPort(sw1, "fa0/2");
      if (p2) p2.accessVlan = 10;
      const pg = findPort(sw1, "g0/1");
      if (pg) pg.accessVlan = 10;
      setHost(pc0, "192.168.10.10", "255.255.255.0", "192.168.10.1");
      setHost(pc1, "192.168.10.20", "255.255.255.0", "192.168.10.1");
      setIp(r1, "g0/0", "192.168.10.1", "255.255.255.0");
      relink(t, "c5-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC1", en: "Ping PC0 → PC1" }, srcId: "c5pc0", dstId: "c5pc1" },
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى البوابة R1", en: "Ping PC0 → gateway R1" }, srcId: "c5pc0", dstId: "c5r1" },
    ],
  },

  // ch6 — inter-VLAN: two ports stranded outside VLAN 20
  {
    id: "ch6",
    title: { ar: "عزل VLAN 20", en: "VLAN 20 Isolated" },
    story: {
      ar: "أُضيف قسم المالية VLAN 20 بشبكة 192.168.20.0/24: ساقٌ ثانية للموجّه R1 عبر g0/1 (192.168.20.1) وحاسوب PC1. لكن منفذين على المبدّل SW1 بقيا في VLAN القديمة، فصار قسم المالية جزيرة معزولة عن قسم VLAN 10. انقل المنفذين الصحيحين إلى VLAN 20.",
      en: "Finance was added as VLAN 20, network 192.168.20.0/24: a second router leg on R1's g0/1 (192.168.20.1) and PC1. But two ports on switch SW1 stayed in their old VLAN, leaving Finance an isolated island cut off from the VLAN 10 team. Move the correct ports into VLAN 20.",
    },
    difficulty: 2,
    xp: 70,
    targetDevice: "SW1",
    targetKind: "switch",
    hints: [
      { ar: "الطبيعي في هذه البنية: ساق R1 (g0/1) موصولة بـ fa0/3، وPC1 موصول بـ fa0/4 — كلاهما يجب أن يكون في VLAN 20.", en: "In this design: R1's second leg (g0/1) lands on fa0/3 and PC1 on fa0/4 — both must be in VLAN 20." },
      { ar: "ستحتاج للدخول إلى واجهتين إحداهما بعد الأخرى: exit بين interface والذي يليه.", en: "You'll enter two interfaces one after the other: use exit between interface blocks." },
      { ar: "الأوامر: switchport access vlan 20 داخل كل واجهة.", en: "The command: switchport access vlan 20 inside each interface." },
    ],
    solution: {
      ar: "interface fa0/3 ← switchport access vlan 20 ← exit ← interface fa0/4 ← switchport access vlan 20 ← end",
      en: "interface fa0/3 → switchport access vlan 20 → exit → interface fa0/4 → switchport access vlan 20 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c6pc0", "PC0", 110, 150);
      const pc1 = mk(t, "pc", "c6pc1", "PC1", 110, 380);
      const sw1 = mk(t, "switch", "c6sw1", "SW1", 340, 260);
      const r1 = mk(t, "router", "c6r1", "R1", 620, 260);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, sw1, "fa0/2", r1, "g0/0");
      cable(t, r1, "g0/1", sw1, "fa0/3"); // stranded in VLAN 1 (the fault)
      cable(t, pc1, "fa0", sw1, "fa0/4"); // stranded in VLAN 10 (the fault)
      const p1 = findPort(sw1, "fa0/1");
      if (p1) p1.accessVlan = 10;
      const p2 = findPort(sw1, "fa0/2");
      if (p2) p2.accessVlan = 10;
      const p4 = findPort(sw1, "fa0/4");
      if (p4) p4.accessVlan = 10; // PC1 cut off from its VLAN-20 router leg on fa0/3
      setHost(pc0, "192.168.10.10", "255.255.255.0", "192.168.10.1");
      setHost(pc1, "192.168.20.10", "255.255.255.0", "192.168.20.1");
      setIp(r1, "g0/0", "192.168.10.1", "255.255.255.0");
      setIp(r1, "g0/1", "192.168.20.1", "255.255.255.0");
      relink(t, "c6-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 (VLAN 10) إلى PC1 (VLAN 20)", en: "Ping PC0 (VLAN 10) → PC1 (VLAN 20)" }, srcId: "c6pc0", dstId: "c6pc1" },
      { kind: "ping", label: { ar: "‏Ping من PC1 (VLAN 20) إلى PC0 (VLAN 10)", en: "Ping PC1 (VLAN 20) → PC0 (VLAN 10)" }, srcId: "c6pc1", dstId: "c6pc0" },
    ],
  },

  // ch7 — firewall deny-all, open ICMP only
  {
    id: "ch7",
    title: { ar: "الجدار الناري الصامت", en: "The Silent Firewall" },
    story: {
      ar: "الجدار FW1 يفصل الشبكة الداخلية 10.0.1.0/24 عن منطقة DMZ بشبكة 172.16.5.0/24 حيث خادم Server0. ترك المشرف السابق السياسة الافتراضية deny-all ولم يضف أي قاعدة — حتى ping لا يمر. الفريق يحتاج التشخيص عبر ICMP بين الطرفين، فافتح ICMP فقط دون تغيير السياسة.",
      en: "Firewall FW1 separates the inside network 10.0.1.0/24 from a DMZ subnet 172.16.5.0/24 hosting Server0. The previous admin left the default policy as deny-all and added no rules — not even ping gets through. The team needs ICMP diagnostics between the two sides, so permit ICMP only and keep the strict policy.",
    },
    difficulty: 2,
    xp: 70,
    targetDevice: "FW1",
    targetKind: "firewall",
    hints: [
      { ar: "القواعد تُضاف من وضع الإعداد: access-list permit icmp any any.", en: "Rules are added from config mode: access-list permit icmp any any." },
      { ar: "اترك policy deny-all كما هو — قاعدة permit واحدة لـ ICMP تكفي وتحافظ على الأمن.", en: "Keep policy deny-all in place — a single permit rule for ICMP is enough and preserves security." },
    ],
    solution: {
      ar: "enable ← conf t ← access-list permit icmp any any ← end",
      en: "enable → conf t → access-list permit icmp any any → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c7pc0", "PC0", 140, 260);
      const fw1 = mk(t, "firewall", "c7fw1", "FW1", 450, 260);
      const srv = mk(t, "server", "c7srv", "Server0", 760, 260);
      cable(t, pc0, "fa0", fw1, "g0/1");
      cable(t, fw1, "g0/0", srv, "fa0");
      setHost(pc0, "10.0.1.10", "255.255.255.0", "10.0.1.1");
      setHost(srv, "172.16.5.10", "255.255.255.0", "172.16.5.1");
      setIp(fw1, "g0/1", "10.0.1.1", "255.255.255.0");
      setIp(fw1, "g0/0", "172.16.5.1", "255.255.255.0");
      fw1.defaultDeny = true; // the fault: strict policy, zero permit rules
      relink(t, "c7-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى Server0 (عبر الجدار)", en: "Ping PC0 → Server0 (through the firewall)" }, srcId: "c7pc0", dstId: "c7srv" },
      { kind: "ping", label: { ar: "‏Ping من Server0 إلى PC0 (الاتجاه المعاكس)", en: "Ping Server0 → PC0 (reverse direction)" }, srcId: "c7srv", dstId: "c7pc0" },
    ],
  },

  // ch8 — DMZ: web traffic only, ICMP must stay blocked
  {
    id: "ch8",
    title: { ar: "الويب فقط عبر DMZ", en: "Web-Only DMZ" },
    story: {
      ar: "خادم الويب Server0 (172.16.5.10) في DMZ يجب أن يخدم صفحاته لمستخدمي الشبكة الداخلية، لكن سياسة الأمن تقول: لا ICMP إلى الـDMZ حتى لا تُكشف تفاصيل الشبكة. الجدار FW1 يعمل بسياسة deny-all. اسمح بجلسات TCP فقط بحيث تُحمَّل الصفحة ويبقى ping محظوراً. ملاحظة: قوائم ACL هنا عديمة الحالة — قاعدة واحدة بدون منفذ تغطي الطلب والرد معاً.",
      en: "Web server Server0 (172.16.5.10) in the DMZ must serve pages to inside users, but security policy says: no ICMP into the DMZ so the topology stays hidden. FW1 runs deny-all. Permit TCP sessions only, so the page loads while ping stays blocked. Note: these ACLs are stateless — one port-less rule covers the request and the reply together.",
    },
    difficulty: 3,
    xp: 80,
    targetDevice: "FW1",
    targetKind: "firewall",
    hints: [
      { ar: "القاعدة المطلوبة: access-list permit tcp any any — بلا رقم منفذ حتى يمر الطلب ورده.", en: "The needed rule: access-list permit tcp any any — no port number so both request and reply pass." },
      { ar: "لا تسمح بـ any any any وإلا سيمر ICMP وينكشف الـDMZ — الاختبار يشترط بقاء ping محظوراً.", en: "Don't permit any any any — ICMP would then flow and expose the DMZ; the grader requires ping to stay blocked." },
    ],
    solution: {
      ar: "enable ← conf t ← access-list permit tcp any any ← end",
      en: "enable → conf t → access-list permit tcp any any → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c8pc0", "PC0", 140, 260);
      const fw1 = mk(t, "firewall", "c8fw1", "FW1", 450, 260);
      const srv = mk(t, "server", "c8srv", "Server0", 760, 260);
      cable(t, pc0, "fa0", fw1, "g0/1");
      cable(t, fw1, "g0/0", srv, "fa0");
      setHost(pc0, "10.0.1.10", "255.255.255.0", "10.0.1.1");
      setHost(srv, "172.16.5.10", "255.255.255.0", "172.16.5.1");
      setIp(fw1, "g0/1", "10.0.1.1", "255.255.255.0");
      setIp(fw1, "g0/0", "172.16.5.1", "255.255.255.0");
      fw1.defaultDeny = true; // nothing is open yet (the fault)
      relink(t, "c8-");
      return t;
    },
    checks: [
      { kind: "http", label: { ar: "تحميل صفحة الويب من PC0 نحو Server0", en: "Load the web page from PC0 to Server0" }, srcId: "c8pc0", dstId: "c8srv" },
      { kind: "ping-fail", label: { ar: "يبقى ping من PC0 إلى Server0 محظوراً", en: "Ping PC0 → Server0 must stay blocked" }, srcId: "c8pc0", dstId: "c8srv" },
    ],
  },

  // ch9 — home wireless router lost its WAN config
  {
    id: "ch9",
    title: { ar: "إعادة إنترنت المنزل", en: "Restoring Home Internet" },
    story: {
      ar: "انقطاع كهرباء صفّر إعدادات راوتر المنزل WR1: أجهزة LAN (PC0 بالكابل والهاتف الذكي لاسلكياً) ما تزال تستأجر عناوين 192.168.0.x عبر DHCP، لكن منفذ WAN (g0/0) فقد عنوانه والمسار الافتراضي. بيانات المزوّد: عنوانك 203.0.113.2/30 والبوابة 203.0.113.1، وخادم الويب عند 198.51.100.10. أعد ضبط WAN ليستعيد المنزل الإنترنت.",
      en: "A power outage wiped the home router WR1's settings: the LAN clients (PC0 on cable, the smartphone wireless) still lease 192.168.0.x addresses via DHCP, but the WAN port (g0/0) lost its address and the default route. ISP details: your address 203.0.113.2/30, gateway 203.0.113.1, and the web server at 198.51.100.10. Reconfigure the WAN side to bring the internet back.",
    },
    difficulty: 3,
    xp: 90,
    targetDevice: "WR1",
    targetKind: "wirelessRouter",
    hints: [
      { ar: "أولاً العنوان: interface g0/0 ثم ip address 203.0.113.2 255.255.255.252 ثم exit.", en: "First the address: interface g0/0 then ip address 203.0.113.2 255.255.255.252 then exit." },
      { ar: "ثم المسار الافتراضي نحو المزوّد: ip route 0.0.0.0 0.0.0.0 203.0.113.1.", en: "Then the default route toward the ISP: ip route 0.0.0.0 0.0.0.0 203.0.113.1." },
      { ar: "لا تلمس جانب LAN — الـDHCP والواي فاي يعملان أصلاً.", en: "Don't touch the LAN side — DHCP and Wi-Fi already work." },
    ],
    solution: {
      ar: "interface g0/0 ← ip address 203.0.113.2 255.255.255.252 ← exit ← ip route 0.0.0.0 0.0.0.0 203.0.113.1 ← end",
      en: "interface g0/0 → ip address 203.0.113.2 255.255.255.252 → exit → ip route 0.0.0.0 0.0.0.0 203.0.113.1 → end",
    },
    build: () => {
      const t = fresh();
      const wr = mk(t, "wirelessRouter", "c9wr1", "WR1", 430, 260);
      const pc0 = mk(t, "pc", "c9pc0", "PC0", 120, 380);
      const sa = mk(t, "smartphone", "c9sa", "Phone0", 240, 120);
      const isp = mk(t, "router", "c9isp", "ISP-R1", 660, 260);
      const srv = mk(t, "server", "c9srv", "Web-Srv", 880, 260);
      cable(t, pc0, "fa0", wr, "fa0/1");
      cable(t, sa, "radio0", wr, "radio0", "wireless");
      cable(t, wr, "g0/0", isp, "g0/0", "crossover");
      cable(t, isp, "g0/1", srv, "fa0");
      // wipe the factory WAN address (the fault)
      const wan = findPort(wr, "g0/0");
      if (wan) {
        wan.ip = null;
        wan.mask = null;
      }
      setIp(isp, "g0/0", "203.0.113.1", "255.255.255.252");
      setIp(isp, "g0/1", "198.51.100.1", "255.255.255.0");
      setHost(srv, "198.51.100.10", "255.255.255.0", "198.51.100.1");
      // LAN clients are DHCP — pre-run DORA so they hold live leases
      pc0.dhcpClient = true;
      sa.dhcpClient = true;
      const afterPc = simulateDhcp(t, pc0.id);
      t.devices = afterPc.devices;
      const afterSa = simulateDhcp(t, sa.id);
      t.devices = afterSa.devices;
      relink(t, "c9-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى خادم الويب (عبر NAT)", en: "Ping PC0 → web server (through NAT)" }, srcId: "c9pc0", dstId: "c9srv" },
      { kind: "http", label: { ar: "تحميل صفحة الويب من PC0", en: "Load the web page from PC0" }, srcId: "c9pc0", dstId: "c9srv" },
    ],
  },

  // ch10 — hub router lost both branch routes
  {
    id: "ch10",
    title: { ar: "موجّه المركز الأعمى", en: "The Blind Hub Router" },
    story: {
      ar: "R1 هو مركز الشبكة: الفرع A (192.168.20.0/24 خلف R2) والفرع B (192.168.30.0/24 خلف R3)، وكلا الفرعين يشير بمسار افتراضي إلى R1. خطة النسخ الاحتياطي حذفت مساري R1 الثابتين نحو شبكتي الفرعين دفعة واحدة. أعد المسارين على R1 لتعود الحركة كاملة.",
      en: "R1 is the network hub: branch A (192.168.20.0/24 behind R2) and branch B (192.168.30.0/24 behind R3), both branches already pointing default routes at R1. A backup script wiped both of R1's static routes to the branch LANs at once. Restore both routes on R1 so traffic flows again.",
    },
    difficulty: 3,
    xp: 90,
    targetDevice: "R1",
    targetKind: "router",
    hints: [
      { ar: "تحتاج مسارين: نحو 192.168.20.0/24 عبر 10.0.0.2، ونحو 192.168.30.0/24 عبر 10.0.1.2.", en: "You need two routes: to 192.168.20.0/24 via 10.0.0.2, and to 192.168.30.0/24 via 10.0.1.2." },
      { ar: "أمران ip route متتاليان في وضع الإعداد — تذكّر القناع 255.255.255.0 لكل منهما.", en: "Two consecutive ip route commands in config mode — remember the 255.255.255.0 mask for each." },
    ],
    solution: {
      ar: "ip route 192.168.20.0 255.255.255.0 10.0.0.2 ← ip route 192.168.30.0 255.255.255.0 10.0.1.2 ← end",
      en: "ip route 192.168.20.0 255.255.255.0 10.0.0.2 → ip route 192.168.30.0 255.255.255.0 10.0.1.2 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c10pc0", "PC0", 100, 420);
      const sw1 = mk(t, "switch", "c10sw1", "SW1", 270, 420);
      const r1 = mk(t, "router", "c10r1", "R1", 460, 300);
      const r2 = mk(t, "router", "c10r2", "R2", 700, 160);
      const sw2 = mk(t, "switch", "c10sw2", "SW2", 880, 160);
      const pc2 = mk(t, "pc", "c10pc2", "PC2", 1040, 160);
      const r3 = mk(t, "router", "c10r3", "R3", 700, 450);
      const sw3 = mk(t, "switch", "c10sw3", "SW3", 880, 450);
      const pc3 = mk(t, "pc", "c10pc3", "PC3", 1040, 450);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, sw1, "g0/1", r1, "g0/0");
      cable(t, r1, "s0/0/0", r2, "s0/0/0", "serial");
      cable(t, r1, "s0/0/1", r3, "s0/0/0", "serial");
      cable(t, r2, "g0/0", sw2, "g0/1");
      cable(t, sw2, "fa0/1", pc2, "fa0");
      cable(t, r3, "g0/0", sw3, "g0/1");
      cable(t, sw3, "fa0/1", pc3, "fa0");
      setHost(pc0, "192.168.10.10", "255.255.255.0", "192.168.10.1");
      setHost(pc2, "192.168.20.10", "255.255.255.0", "192.168.20.1");
      setHost(pc3, "192.168.30.10", "255.255.255.0", "192.168.30.1");
      setIp(r1, "g0/0", "192.168.10.1", "255.255.255.0");
      setIp(r1, "s0/0/0", "10.0.0.1", "255.255.255.252");
      setIp(r1, "s0/0/1", "10.0.1.1", "255.255.255.252");
      setIp(r2, "g0/0", "192.168.20.1", "255.255.255.0");
      setIp(r2, "s0/0/0", "10.0.0.2", "255.255.255.252");
      setIp(r3, "g0/0", "192.168.30.1", "255.255.255.0");
      setIp(r3, "s0/0/0", "10.0.1.2", "255.255.255.252");
      addRoute(r2, "0.0.0.0", "0.0.0.0", "10.0.0.1");
      addRoute(r3, "0.0.0.0", "0.0.0.0", "10.0.1.1");
      // R1's two branch routes intentionally missing (the fault)
      relink(t, "c10-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC2 (الفرع A)", en: "Ping PC0 → PC2 (branch A)" }, srcId: "c10pc0", dstId: "c10pc2" },
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى PC3 (الفرع B)", en: "Ping PC0 → PC3 (branch B)" }, srcId: "c10pc0", dstId: "c10pc3" },
      { kind: "ping", label: { ar: "‏Ping من PC2 إلى PC3 (فرع إلى فرع عبر المركز)", en: "Ping PC2 → PC3 (branch to branch via the hub)" }, srcId: "c10pc2", dstId: "c10pc3" },
    ],
  },

  // ch11 — defend the server from a SYN flood
  {
    id: "ch11",
    title: { ar: "دافع عن الخادم", en: "Defend the Server" },
    story: {
      ar: "رصد IDS جهاز كالي (10.0.2.77) يغرق خادم الويب 172.16.5.10 بطلبات SYN على المنفذ 80 — طابور الخادم امتلأ وصار يرفض الاتصالات. أنت مسؤول الجدار FW1: اصدّ فيضان TCP نحو المنفذ 80 دون أن تكسر قدرة المستخدمين على ping الخادم (ICMP هو أداتهم التشخيصية الوحيدة).",
      en: "The IDS caught a Kali box (10.0.2.77) flooding web server 172.16.5.10 with SYN packets on port 80 — the server's backlog is full and it now refuses connections. You own firewall FW1: block the TCP flood toward port 80 without breaking the users' ability to ping the server (ICMP is their only diagnostic tool).",
    },
    difficulty: 3,
    xp: 100,
    targetDevice: "FW1",
    targetKind: "firewall",
    hints: [
      { ar: "التقرير يقول إن الهجوم TCP نحو المنفذ 80 تحديداً — قاعدة deny واحدة ببروتوكول tcp ومنفذ 80 توقفه.", en: "The report says the attack is TCP to port 80 specifically — a single deny rule with proto tcp and port 80 stops it." },
      { ar: "الصيغة: access-list deny tcp any any 80 — من وضع الإعداد.", en: "Syntax: access-list deny tcp any any 80 — from config mode." },
      { ar: "لا تمنع icmp ولا تفعّل deny-all، وإلا خسر المستخدمون أداة التشخيص.", en: "Don't deny icmp or enable deny-all, or the users lose their diagnostics." },
    ],
    solution: {
      ar: "enable ← conf t ← access-list deny tcp any any 80 ← end",
      en: "enable → conf t → access-list deny tcp any any 80 → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c11pc0", "PC0", 120, 150);
      const fw1 = mk(t, "firewall", "c11fw1", "FW1", 450, 260);
      const srv = mk(t, "server", "c11srv", "Server0", 780, 260);
      const kali = mk(t, "attacker", "c11kali", "Kali0", 120, 400);
      cable(t, pc0, "fa0", fw1, "g0/1");
      cable(t, fw1, "g0/0", srv, "fa0");
      cable(t, kali, "eth0", fw1, "g0/3");
      setHost(pc0, "10.0.1.10", "255.255.255.0", "10.0.1.1");
      setHost(srv, "172.16.5.10", "255.255.255.0", "172.16.5.1");
      setHost(kali, "10.0.2.77", "255.255.255.0", "10.0.2.1");
      setIp(fw1, "g0/1", "10.0.1.1", "255.255.255.0");
      setIp(fw1, "g0/0", "172.16.5.1", "255.255.255.0");
      setIp(fw1, "g0/3", "10.0.2.1", "255.255.255.0");
      // the live attack: SYN flood against the web port
      kali.attack = { kind: "synflood", targetIp: "172.16.5.10", victimIp: null, active: true };
      relink(t, "c11-");
      return t;
    },
    checks: [
      { kind: "attack", label: { ar: "صدّ هجوم Kali0 وإبقاء الخادم فوق الماء", en: "Block Kali0's attack and keep the server alive" }, srcId: "c11kali", dstId: "c11srv" },
      { kind: "ping", label: { ar: "يبقى ping من PC0 إلى Server0 ناجحاً بعد الدفاع", en: "Ping PC0 → Server0 must still work after the defense" }, srcId: "c11pc0", dstId: "c11srv" },
    ],
  },

  // ch12 — capstone: multi-router path + locked firewall
  {
    id: "ch12",
    title: { ar: "الخاتمة: المسار الكامل", en: "Capstone: The Full Path" },
    story: {
      ar: "طوبولوجيا الإنتاج: LAN خلف R1 (192.168.10.0/24) ثم وصلة WAN تسلسلية إلى R2 ثم الجدار FW1 الذي يحمي DMZ بشبكة 172.16.5.0/24 حيث Server0. توجيه R1 وR2 جاهز تماماً، لكن FW1 لا يملك مساراً عائداً نحو الـLAN كما أن سياسته deny-all بلا أي قاعدة. اجعل PC0 يستطيع ping الخادم وتحميل صفحته.",
      en: "The production topology: a LAN behind R1 (192.168.10.0/24), a serial WAN hop to R2, then firewall FW1 guarding a DMZ subnet 172.16.5.0/24 with Server0. R1 and R2 are fully routed, but FW1 has no route back to the LAN and its deny-all policy has no rules. Make PC0 able to ping the server and load its web page.",
    },
    difficulty: 3,
    xp: 120,
    targetDevice: "FW1",
    targetKind: "firewall",
    hints: [
      { ar: "مسار العودة: ip route 192.168.10.0 255.255.255.0 10.0.1.1 — عبر R2.", en: "Return route: ip route 192.168.10.0 255.255.255.0 10.0.1.1 — via R2." },
      { ar: "تحتاج فتح ICMP وTCP معاً: قاعدتا permit icmp any any و permit tcp any any، أو قاعدة واحدة permit any any any.", en: "You need both ICMP and TCP open: two rules (permit icmp any any + permit tcp any any), or a single permit any any any." },
      { ar: "تحقق بـ show ip route و show access-list على الجدار قبل الحكم.", en: "Verify with show ip route and show access-list on the firewall before concluding." },
    ],
    solution: {
      ar: "ip route 192.168.10.0 255.255.255.0 10.0.1.1 ← access-list permit any any any ← end",
      en: "ip route 192.168.10.0 255.255.255.0 10.0.1.1 → access-list permit any any any → end",
    },
    build: () => {
      const t = fresh();
      const pc0 = mk(t, "pc", "c12pc0", "PC0", 90, 200);
      const sw1 = mk(t, "switch", "c12sw1", "SW1", 250, 200);
      const r1 = mk(t, "router", "c12r1", "R1", 250, 390);
      const r2 = mk(t, "router", "c12r2", "R2", 520, 390);
      const fw1 = mk(t, "firewall", "c12fw1", "FW1", 750, 260);
      const srv = mk(t, "server", "c12srv", "Server0", 940, 260);
      cable(t, pc0, "fa0", sw1, "fa0/1");
      cable(t, sw1, "g0/1", r1, "g0/0");
      cable(t, r1, "s0/0/0", r2, "s0/0/0", "serial");
      cable(t, r2, "g0/1", fw1, "g0/1", "crossover");
      cable(t, fw1, "g0/0", srv, "fa0");
      setHost(pc0, "192.168.10.10", "255.255.255.0", "192.168.10.1");
      setHost(srv, "172.16.5.10", "255.255.255.0", "172.16.5.1");
      setIp(r1, "g0/0", "192.168.10.1", "255.255.255.0");
      setIp(r1, "s0/0/0", "10.0.0.1", "255.255.255.252");
      setIp(r2, "s0/0/0", "10.0.0.2", "255.255.255.252");
      setIp(r2, "g0/1", "10.0.1.1", "255.255.255.252");
      addRoute(r1, "0.0.0.0", "0.0.0.0", "10.0.0.2");
      addRoute(r2, "192.168.10.0", "255.255.255.0", "10.0.0.1");
      addRoute(r2, "0.0.0.0", "0.0.0.0", "10.0.1.2");
      setIp(fw1, "g0/1", "10.0.1.2", "255.255.255.252");
      setIp(fw1, "g0/0", "172.16.5.1", "255.255.255.0");
      fw1.defaultDeny = true; // locked shut (the fault)
      // FW1 route back to the LAN intentionally missing (the fault)
      relink(t, "c12-");
      return t;
    },
    checks: [
      { kind: "ping", label: { ar: "‏Ping من PC0 إلى Server0 عبر الموجّهين والجدار", en: "Ping PC0 → Server0 across both routers and the firewall" }, srcId: "c12pc0", dstId: "c12srv" },
      { kind: "http", label: { ar: "تحميل صفحة الويب من PC0 نحو Server0", en: "Load the web page from PC0 to Server0" }, srcId: "c12pc0", dstId: "c12srv" },
    ],
  },
];
