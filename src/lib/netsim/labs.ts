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
  {
    id: "lab7",
    difficulty: 2,
    title: { ar: "المعمل ٧: دفاع الجدار الناري", en: "Lab 7: Firewall Defense" },
    goal: {
      ar: "مهاجم Kali يغرق خادم الويب بحزم ICMP عبر FW1 — أضف قاعدة ACL تمنع ICMP من المهاجم فيتوقف الهجوم وتبقى الشبكة الداخلية تعمل",
      en: "A Kali attacker ICMP-floods the web server through FW1 — add an ACL rule denying ICMP from the attacker so the flood stops while the inside network keeps working",
    },
    steps: [
      { ar: "افتح Kali1 واكتب: attack ddos 192.168.7.20 ثم اضغط «تنفيذ الهجوم» — عشر حزم ICMP تعبر الجدار وتُشبع الخادم (CPU 100%)", en: "Open Kali1 and type: attack ddos 192.168.7.20 then press Run Attack — ten ICMP packets cross the firewall and saturate the server (CPU 100%)" },
      { ar: "افتح FW1 ثم CLI: enable ← conf t ← access-list deny icmp 10.9.9.50 any ← end", en: "Open FW1 → CLI: enable → conf t → access-list deny icmp 10.9.9.50 any → end" },
      { ar: "أعد تنفيذ الهجوم من Kali1 — الحزم تُسقط الآن عند FW1؛ اكتب show access-list لترى عدّاد Hits يقفز على القاعدة رقم 2، و show alerts لتنبيهات acl-deny", en: "Re-run the attack from Kali1 — packets now die at FW1; run show access-list to watch rule #2's Hits counter jump, and show alerts for acl-deny entries" },
      { ar: "تحقق أن الدفاع لم يكسر العمل: ping من PC0 إلى WebSrv (192.168.7.20) ينجح داخل الشبكة الداخلية، بينما ping من Kali1 نفسه محجوب عند الجدار", en: "Verify nothing broke: ping from PC0 to WebSrv (192.168.7.20) still succeeds inside the LAN, while the ping from Kali1 itself is blocked at the firewall" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const kali = createDevice("attacker", 120, 200, t); t.devices.push(kali); kali.name = "Kali1";
      const swOut = createDevice("switch", 340, 110, t); t.devices.push(swOut); swOut.name = "SW1";
      const fw = createDevice("firewall", 520, 210, t); t.devices.push(fw); fw.name = "FW1";
      const swIn = createDevice("switch", 700, 310, t); t.devices.push(swIn); swIn.name = "SW2";
      const pc0 = createDevice("pc", 900, 180, t); t.devices.push(pc0);
      const web = createDevice("server", 900, 430, t); t.devices.push(web); web.name = "WebSrv";
      const links = [
        linkPair(t, kali, swOut),
        linkPair(t, swOut, fw), // fw g0/0 (outside)
        linkPair(t, fw, swIn),  // fw g0/1 (inside)
        linkPair(t, pc0, swIn),
        linkPair(t, web, swIn),
      ];
      setHost(kali, "10.9.9.50", "255.255.255.0", "10.9.9.1");
      setIp(fw, "g0/0", "10.9.9.1", "255.255.255.0");
      setIp(fw, "g0/1", "192.168.7.1", "255.255.255.0");
      setHost(pc0, "192.168.7.10", "255.255.255.0", "192.168.7.1", "192.168.7.20");
      setHost(web, "192.168.7.20", "255.255.255.0", "192.168.7.1");
      web.dnsZone = { a: { "net7.local": "192.168.7.20" } };
      web.httpRoot = { title: "خادم المعمل ٧", body: "مرور HTTP يعبر الجدار الناري.\nHTTP flowing through the firewall.\nفعّل قاعدة ICMP الصحيحة فيتوقف الإغراق وحده." };
      // one pre-permitted web rule; default policy stays permit-all
      fw.acls = [{ id: 1, action: "permit", proto: "tcp", src: "any", srcMask: "any", dst: "any", dstMask: "any", port: 80, hits: 0 }];
      // the attack is already live: ICMP flood toward the inside web server
      kali.attack = { kind: "ddos", targetIp: "192.168.7.20", victimIp: null, active: true };
      return T(t.devices, links);
    },
  },
  {
    id: "lab8",
    difficulty: 2,
    title: { ar: "المعمل ٨: كشف انتحال ARP", en: "Lab 8: ARP Spoofing Detection" },
    goal: {
      ar: "مهاجم Kali يسمّم جدول ARP عند البوابة R1 بادعاءات IP↔MAC مزيفة — اكشف المدخل المستحيل بـ show arp وتابع مستشعر IDS الموصول على منفذ المراقبة",
      en: "A Kali attacker poisons gateway R1's ARP table with forged IP↔MAC claims — spot the impossible entry with show arp and follow the IDS sensor on its monitor port",
    },
    steps: [
      { ar: "شغّل ping من PC0 إلى البوابة 192.168.8.1 ثم افتح R1 واكتب show arp — كل مدخل يشير إلى MAC حقيقي", en: "Run ping from PC0 to gateway 192.168.8.1, then open R1 and run show arp — every entry points to a genuine MAC" },
      { ar: "افتح Kali1 واكتب: attack arpspoof 192.168.8.1 192.168.8.1 ثم اضغط «تنفيذ الهجوم» — راقب ردود «ARP مسموم» تعبر SW1 نحو R1", en: "Open Kali1 and type: attack arpspoof 192.168.8.1 192.168.8.1 then Run Attack — watch the poisoned ARP replies cross SW1 toward R1" },
      { ar: "افتح R1 → show arp: مدخل مستحيل! عنوان R1 نفسه (192.168.8.1) صار يشير إلى MAC المهاجم — هذا هو الانتحال", en: "Open R1 → show arp: an impossible entry! R1's own address (192.168.8.1) now maps to the attacker's MAC — that is the spoof" },
      { ar: "افتح IDS1 (منفذ المراقبة) واكتب show alerts لرصد ما رصده المستشعر من تعارضات IP↔MAC", en: "Open IDS1 (monitor port) and run show alerts to review any IP↔MAC conflicts the sensor caught" },
      { ar: "قلّل الأثر: في SW1 ادخل interface fa0/2 ثم switchport port-security لتأمين منفذ المهاجم، ونفّذ arp -d في PC0 لإفراغ جدوله، ثم أعد الهجوم وقارن النتيجة", en: "Mitigate: on SW1 enter interface fa0/2 then switchport port-security to lock the attacker's port, run arp -d on PC0 to flush its cache, then replay the attack and compare" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const pc0 = createDevice("pc", 110, 160, t); t.devices.push(pc0);
      const kali = createDevice("attacker", 110, 420, t); t.devices.push(kali); kali.name = "Kali1";
      const sw = createDevice("switch", 390, 280, t); t.devices.push(sw); sw.name = "SW1";
      const ids = createDevice("ids", 620, 130, t); t.devices.push(ids); ids.name = "IDS1";
      const r1 = createDevice("router", 660, 400, t); t.devices.push(r1); r1.name = "R1";
      const links = [
        linkPair(t, pc0, sw),   // sw fa0/1
        linkPair(t, kali, sw),  // sw fa0/2
        linkPair(t, sw, ids),   // ids g0/0 — mirror/monitor port off SW1
        linkPair(t, sw, r1),    // r1 g0/0 = gateway uplink
      ];
      setHost(pc0, "192.168.8.10", "255.255.255.0", "192.168.8.1");
      setHost(kali, "192.168.8.50", "255.255.255.0", "192.168.8.1");
      setIp(r1, "g0/0", "192.168.8.1", "255.255.255.0");
      // pre-armed: ARP poisoning aimed at the gateway's own identity
      kali.attack = { kind: "arpspoof", targetIp: "192.168.8.1", victimIp: "192.168.8.1", active: true };
      return T(t.devices, links);
    },
  },
  {
    id: "lab9",
    difficulty: 2,
    title: { ar: "المعمل ٩: مراقبة IDS", en: "Lab 9: IDS Monitoring" },
    goal: {
      ar: "أطلق مسحاً من Kali ثم إغراقاً وراقب مستشعر IDS يرفع التنبيهات بمستويات خطورة متدرجة (WARN ثم CRITICAL) عبر show alerts",
      en: "Fire a scan then a flood from Kali and watch the IDS raise alerts with escalating severity levels (WARN then CRITICAL) via show alerts",
    },
    steps: [
      { ar: "افتح Kali1 واكتب: attack scan 192.168.9.10 ثم اضغط «تنفيذ الهجوم» — ستة مجسات SYN تتوالى على العناوين 192.168.9.10 حتى .15", en: "Open Kali1 and type: attack scan 192.168.9.10 then Run Attack — six SYN probes walk the addresses 192.168.9.10 through .15" },
      { ar: "افتح IDS1 واكتب show alerts — تنبيه [WARN] scan: المصدر 192.168.9.50 يرمي حزماً نحو 5 عناوين مختلفة؛ انقر أحداث المجسات لفحص PDU (SYN نحو المنفذ 80)", en: "Open IDS1 and run show alerts — a [WARN] scan alert: source 192.168.9.50 probing 5 distinct addresses; click probe events to inspect the PDU (SYN toward port 80)" },
      { ar: "عُد إلى Kali1 واكتب: attack ddos 192.168.9.12 ثم نفّذ الهجوم — عشر طلبات Echo نحو خادم الويب", en: "Back on Kali1 type: attack ddos 192.168.9.12 then run the attack — ten echo requests toward the web server" },
      { ar: "افتح IDS1 مجدداً: show alerts — الآن [CRITICAL] icmp-flood؛ قارن مستويي الخطورة وكيف يفرّق المستشعر بين الاستطلاع والإغراق", en: "Open IDS1 again: show alerts — now [CRITICAL] icmp-flood; compare the two severity levels and how the sensor separates reconnaissance from flooding" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const kali = createDevice("attacker", 150, 140, t); t.devices.push(kali); kali.name = "Kali1";
      const pc0 = createDevice("pc", 150, 270, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 150, 380, t); t.devices.push(pc1);
      const web = createDevice("server", 150, 480, t); t.devices.push(web); web.name = "WebSrv";
      const sw = createDevice("switch", 450, 300, t); t.devices.push(sw); sw.name = "SW1";
      const ids = createDevice("ids", 760, 300, t); t.devices.push(ids); ids.name = "IDS1";
      const links = [
        linkPair(t, kali, sw),
        linkPair(t, pc0, sw),
        linkPair(t, pc1, sw),
        linkPair(t, web, sw),
        linkPair(t, sw, ids), // ids g0/0 — SPAN/monitor tap on the segment
      ];
      setHost(kali, "192.168.9.50", "255.255.255.0", null);
      setHost(pc0, "192.168.9.10", "255.255.255.0", null);
      setHost(pc1, "192.168.9.11", "255.255.255.0", null);
      setHost(web, "192.168.9.12", "255.255.255.0", null);
      web.httpRoot = { title: "شبكة 192.168.9.0", body: "المجسات الحية فقط تحصل على رد.\nOnly live hosts answer the probes." };
      // pre-armed: network scan starting at the first live host
      kali.attack = { kind: "scan", targetIp: "192.168.9.10", victimIp: null, active: true };
      return T(t.devices, links);
    },
  },
  {
    id: "lab10",
    difficulty: 3,
    title: { ar: "المعمل ١٠: إغراق SYN-Flood وحدود الدفاع", en: "Lab 10: SYN Flood & Rate Defense" },
    goal: {
      ar: "مهاجم يغرق خادم DMZ بطلبات SYN نحو المنفذ 80 فيمتلئ طابور المصافحات — أضف قاعدة ACL تمنع TCP من المهاجم نحو المنفذ 80 مع بقاء ICMP والخدمات الأخرى",
      en: "An attacker SYN-floods the DMZ server on port 80 until the handshake backlog fills — add an ACL denying the attacker's TCP to port 80 while ICMP and other traffic survive",
    },
    steps: [
      { ar: "افتح PC0 ← سطر الأوامر ← اكتب: http 172.16.20.10 — الصفحة تُحمَّل عبر FW1 إلى خادم DMZ (راقب SYN/SYN-ACK/ACK ثم GET/200)", en: "Open PC0 → Command Prompt → type: http 172.16.20.10 — the page loads through FW1 to the DMZ server (watch SYN/SYN-ACK/ACK then GET/200)" },
      { ar: "افتح Kali1 واكتب: attack synflood 172.16.20.10 ثم «تنفيذ الهجوم» — عشرة SYN تملأ طابور الخادم؛ أعد http من PC0 — «رفض الاتصال»!", en: "Open Kali1 and type: attack synflood 172.16.20.10 then Run Attack — ten SYNs fill the server backlog; retry http from PC0 — connection refused!" },
      { ar: "دافع في FW1: enable ← conf t ← access-list deny tcp 10.10.9.50 172.16.20.10 80 ← end ثم أعد تنفيذ الهجوم — الحزم تسقط عند الجدار (show access-list لعدّاد Hits)", en: "Defend at FW1: enable → conf t → access-list deny tcp 10.10.9.50 172.16.20.10 80 → end, then replay the attack — packets die at the firewall (show access-list for the Hits counter)" },
      { ar: "تحقق أن المنع موجَّه: ping من PC0 إلى 172.16.20.10 (ICMP) ما زال يعبر FW1 — القاعدة طابقت tcp/80 العابر فقط", en: "Confirm the deny is targeted: ping from PC0 to 172.16.20.10 (ICMP) still crosses FW1 — the rule only matched transit tcp/80" },
      { ar: "انقر حزمة SYN مسقطة في سجل المحاكاة وافحص الـPDU طبقة-بطبقة — لاحظ معلومة الإسقاط عند FW1 وتنبيه acl-deny في show alerts", en: "Click a dropped SYN in the event log and inspect the PDU layer by layer — note the drop note at FW1 and the acl-deny alerts in show alerts" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const kali = createDevice("attacker", 110, 120, t); t.devices.push(kali); kali.name = "Kali1";
      const swOut = createDevice("switch", 300, 180, t); t.devices.push(swOut); swOut.name = "SW1";
      const fw = createDevice("firewall", 480, 260, t); t.devices.push(fw); fw.name = "FW1";
      const swIn = createDevice("switch", 690, 120, t); t.devices.push(swIn); swIn.name = "SW2";
      const pc0 = createDevice("pc", 900, 90, t); t.devices.push(pc0);
      const swDmz = createDevice("switch", 690, 400, t); t.devices.push(swDmz); swDmz.name = "SW3";
      const web = createDevice("server", 900, 430, t); t.devices.push(web); web.name = "WebSrv";
      const links = [
        linkPair(t, kali, swOut),
        linkPair(t, swOut, fw),  // fw g0/0 (outside)
        linkPair(t, fw, swIn),   // fw g0/1 (inside)
        linkPair(t, fw, swDmz),  // fw g0/2 (DMZ)
        linkPair(t, pc0, swIn),
        linkPair(t, web, swDmz),
      ];
      setHost(kali, "10.10.9.50", "255.255.255.0", "10.10.9.1");
      setIp(fw, "g0/0", "10.10.9.1", "255.255.255.0");
      setIp(fw, "g0/1", "172.16.10.1", "255.255.255.0");
      setIp(fw, "g0/2", "172.16.20.1", "255.255.255.0");
      setHost(pc0, "172.16.10.10", "255.255.255.0", "172.16.10.1");
      setHost(web, "172.16.20.10", "255.255.255.0", "172.16.20.1");
      web.httpRoot = { title: "خادم DMZ", body: "خدمة ويب داخل منطقة DMZ.\nA web service inside the DMZ.\nعند امتلاء طابور SYN تتوقف الخدمة." };
      // pre-armed: SYN flood toward the DMZ web server (port 80)
      kali.attack = { kind: "synflood", targetIp: "172.16.20.10", victimIp: null, active: true };
      return T(t.devices, links);
    },
  },
  {
    id: "lab11",
    difficulty: 3,
    title: { ar: "المعمل ١١: التوجيه بين VLANs على مبدّل L3", en: "Lab 11: Inter-VLAN Routing on an L3 Switch" },
    goal: {
      ar: "مبدّل CORE من الطبقة الثالثة بواجهتي SVI: vlan10 (192.168.10.1) و vlan20 (192.168.20.1) — أثبت أن ping يعبر بين الـVLANs عبر التوجيه وراجع المسارات المتصلة",
      en: "A Layer-3 CORE switch with two SVIs: vlan10 (192.168.10.1) and vlan20 (192.168.20.1) — prove ping routes between the VLANs and review the connected routes",
    },
    steps: [
      { ar: "Ping من PC0 إلى PC1 (192.168.10.11) — نجاح داخل VLAN10 نفسها دون مغادرة مبدّل الوصول", en: "Ping PC0 → PC1 (192.168.10.11) — success inside VLAN10 itself without leaving the access switch" },
      { ar: "Ping من PC0 (VLAN10) إلى PC2 (192.168.20.10 في VLAN20) — الحزمة تصعد إلى CORE وتُوجَّه عبر SVI: لاحظ ARP لبوابة كل VLAN وإنقاص TTL بمقدار 1", en: "Ping PC0 (VLAN10) → PC2 (192.168.20.10 in VLAN20) — the packet rides up to CORE and routes across the SVI: watch the per-VLAN gateway ARP and TTL dropping by 1" },
      { ar: "افتح CORE وشغّل: show ip route — مساران متصلان (C) لشبكتي 192.168.10.0/24 و 192.168.20.0/24 عبر vlan10 و vlan20، ثم show ip interface brief لرؤية عناوين SVI", en: "Open CORE and run: show ip route — two connected (C) routes for 192.168.10.0/24 and 192.168.20.0/24 via vlan10 and vlan20, then show ip interface brief to see the SVI addresses" },
      { ar: "افتح PC2 ونفّذ ipconfig — البوابة 192.168.20.1 هي SVI الـVLAN20، ثم ping منه إلى PC0 (192.168.10.10) للتحقق من مسار العودة", en: "Open PC2 and run ipconfig — the gateway 192.168.20.1 is the VLAN20 SVI, then ping PC0 (192.168.10.10) from it to verify the return path" },
      { ar: "افحص أي خطوة توجيه في سجل المحاكاة (PDU): عند العبور بين VLANs يُعاد كتابة عنواني MAC وتنخفض TTL — هذا فرق L3 عن مبدّل L2", en: "Inspect any routing hop in the event log (PDU): crossing VLANs rewrites both MAC addresses and decrements TTL — the L3 difference from an L2 switch" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const l3 = createDevice("l3switch", 560, 280, t); t.devices.push(l3); l3.name = "CORE";
      const swA = createDevice("switch", 330, 170, t); t.devices.push(swA); swA.name = "SW-A";
      const swB = createDevice("switch", 330, 420, t); t.devices.push(swB); swB.name = "SW-B";
      const pc0 = createDevice("pc", 110, 110, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 110, 240, t); t.devices.push(pc1);
      const pc2 = createDevice("pc", 110, 350, t); t.devices.push(pc2);
      const pc3 = createDevice("pc", 110, 480, t); t.devices.push(pc3);
      const links = [
        linkPair(t, pc0, swA),
        linkPair(t, pc1, swA),
        linkPair(t, pc2, swB),
        linkPair(t, pc3, swB),
        linkPair(t, swA, l3), // l3 fa0/1 → VLAN10 uplink
        linkPair(t, swB, l3), // l3 fa0/2 → VLAN20 uplink
      ];
      setHost(pc0, "192.168.10.10", "255.255.255.0", "192.168.10.1");
      setHost(pc1, "192.168.10.11", "255.255.255.0", "192.168.10.1");
      setHost(pc2, "192.168.20.10", "255.255.255.0", "192.168.20.1");
      setHost(pc3, "192.168.20.11", "255.255.255.0", "192.168.20.1");
      // SVI gateways (vlan10 / vlan20 ports exist on l3switch)
      setIp(l3, "vlan10", "192.168.10.1", "255.255.255.0");
      setIp(l3, "vlan20", "192.168.20.1", "255.255.255.0");
      // VLAN membership: SW-A fa0/1-3 + CORE fa0/1 → VLAN10 ; SW-B fa0/1-3 + CORE fa0/2 → VLAN20
      const setVlan = (d: Device, portId: string, vlan: number) => {
        const p = findPort(d, portId);
        if (p) p.accessVlan = vlan;
      };
      setVlan(swA, "fa0/1", 10);
      setVlan(swA, "fa0/2", 10);
      setVlan(swA, "fa0/3", 10);
      setVlan(swB, "fa0/1", 20);
      setVlan(swB, "fa0/2", 20);
      setVlan(swB, "fa0/3", 20);
      setVlan(l3, "fa0/1", 10);
      setVlan(l3, "fa0/2", 20);
      return T(t.devices, links);
    },
  },
  {
    id: "lab12",
    difficulty: 3,
    title: { ar: "المعمل ١٢: السيناريو المؤسسي الشامل", en: "Lab 12: Enterprise Capstone" },
    goal: {
      ar: "إنترنت ← EDGE ← CORE (مسارات متبادلة بمنزلة OSPF area 0) ← FW1 يحمي DMZ والشبكة الداخلية مع IDS — أثبت التدفق الطبيعي، هاجم من Kali الداخلي، ثم دافع عند الجدار",
      en: "Internet → EDGE → CORE (reciprocal routes standing in for OSPF area 0) → FW1 guarding the DMZ and inside LAN with an IDS — verify normal flow, attack from the insider Kali, then defend at the firewall",
    },
    steps: [
      { ar: "أثبت التدفق الطبيعي: افتح متصفح PC0 واكتب intranet.local (DNS عند 172.16.30.10 في DMZ) — راقب سلسلة DNS ثم TCP ثم HTTP تعبر FW1، ثم ping العنوان العام 203.0.113.100", en: "Prove normal flow: open PC0's browser and enter intranet.local (DNS at 172.16.30.10 in the DMZ) — watch the DNS → TCP → HTTP chain cross FW1, then ping the public 203.0.113.100" },
      { ar: "افتح EDGE و CORE وشغّل show ip route — مسارات S متبادلة للشبكات الداخلية (هنا ثابتة، وهي الدور الذي يؤديه OSPF area 0 بين الراوترين)", en: "Open EDGE and CORE and run show ip route — reciprocal S routes for the internal networks (static here — the job OSPF area 0 does between the two routers)" },
      { ar: "أطلق الهجوم الداخلي: افتح Kali1 واكتب: attack ddos 172.16.30.10 ثم «تنفيذ الهجوم» — عشر حزم ICMP تعبر SW-LAN وتُشبع خادم DMZ", en: "Launch the insider attack: open Kali1 and type: attack ddos 172.16.30.10 then Run Attack — ten ICMP packets cross SW-LAN and saturate the DMZ server" },
      { ar: "افتح IDS1 واكتب show alerts — [CRITICAL] icmp-flood من 172.16.31.50، ثم دافع في FW1: enable ← conf t ← access-list deny icmp 172.16.31.50 any ← end", en: "Open IDS1 and run show alerts — [CRITICAL] icmp-flood from 172.16.31.50, then defend at FW1: enable → conf t → access-list deny icmp 172.16.31.50 any → end" },
      { ar: "أعد تنفيذ الهجوم بعد الدفاع — الحزم تسقط عند FW1 (show access-list لعدّاد Hits)، ثم أعد تحميل intranet.local من PC0 — الخدمة عادت لأن TCP/HTTP غير متأثر بقاعدة ICMP", en: "Replay the attack after defending — packets die at FW1 (show access-list for the Hits counter), then reload intranet.local from PC0 — service is back since TCP/HTTP is untouched by the ICMP rule" },
    ],
    build: () => {
      const t: Topology = { devices: [], links: [] };
      resetMacCounterFor(t);
      const cloud = createDevice("cloud", 930, 110, t); t.devices.push(cloud);
      const pub = createDevice("server", 930, 290, t); t.devices.push(pub); pub.name = "PubSrv";
      const edge = createDevice("router", 750, 110, t); t.devices.push(edge); edge.name = "EDGE";
      const core = createDevice("router", 570, 200, t); t.devices.push(core); core.name = "CORE";
      const fw = createDevice("firewall", 400, 290, t); t.devices.push(fw); fw.name = "FW1";
      const swDmz = createDevice("switch", 570, 420, t); t.devices.push(swDmz); swDmz.name = "SW-DMZ";
      const web = createDevice("server", 780, 450, t); t.devices.push(web); web.name = "WebSrv";
      const swLan = createDevice("switch", 210, 400, t); t.devices.push(swLan); swLan.name = "SW-LAN";
      const pc0 = createDevice("pc", 60, 320, t); t.devices.push(pc0);
      const pc1 = createDevice("pc", 60, 400, t); t.devices.push(pc1);
      const kali = createDevice("attacker", 60, 480, t); t.devices.push(kali); kali.name = "Kali1";
      const ids = createDevice("ids", 210, 520, t); t.devices.push(ids); ids.name = "IDS1";
      const links = [
        linkPair(t, cloud, pub),
        linkPair(t, cloud, edge), // edge g0/0 (internet)
        linkPair(t, edge, core),  // serial s0/0/0 ↔ s0/0/0 — the "area 0" backbone
        linkPair(t, core, fw),    // fw g0/0 (outside)
        linkPair(t, fw, swLan),   // fw g0/1 (inside)
        linkPair(t, fw, swDmz),   // fw g0/2 (DMZ)
        linkPair(t, swLan, pc0),
        linkPair(t, swLan, pc1),
        linkPair(t, swLan, kali),
        linkPair(t, swLan, ids),  // ids g0/0 — monitor tap inside the LAN
        linkPair(t, swDmz, web),
      ];
      setHost(pub, "203.0.113.100", "255.255.255.0", "203.0.113.1");
      pub.httpRoot = { title: "الإنترنت العام", body: "خادم عام عبر EDGE و CORE و FW1.\nA public server beyond EDGE, CORE and FW1." };
      setIp(edge, "g0/0", "203.0.113.1", "255.255.255.0");
      setIp(edge, "s0/0/0", "10.0.12.1", "255.255.255.252");
      setIp(core, "s0/0/0", "10.0.12.2", "255.255.255.252");
      setIp(core, "g0/0", "10.0.34.1", "255.255.255.252");
      setIp(fw, "g0/0", "10.0.34.2", "255.255.255.252");
      setIp(fw, "g0/1", "172.16.31.1", "255.255.255.0");
      setIp(fw, "g0/2", "172.16.30.1", "255.255.255.0");
      setHost(web, "172.16.30.10", "255.255.255.0", "172.16.30.1");
      web.dnsZone = { a: { "intranet.local": "172.16.30.10" } };
      web.httpRoot = { title: "بوابة الإنترانت", body: "خدمة DMZ داخلية عبر FW1.\nAn internal DMZ service behind FW1." };
      setHost(pc0, "172.16.31.10", "255.255.255.0", "172.16.31.1", "172.16.30.10");
      setHost(pc1, "172.16.31.11", "255.255.255.0", "172.16.31.1", "172.16.30.10");
      setHost(kali, "172.16.31.50", "255.255.255.0", "172.16.31.1");
      // reciprocal static routing (edge ↔ core ↔ firewall), default toward the internet
      addRoute(edge, "10.0.34.0", "255.255.255.252", "10.0.12.2");
      addRoute(edge, "172.16.30.0", "255.255.255.0", "10.0.12.2");
      addRoute(edge, "172.16.31.0", "255.255.255.0", "10.0.12.2");
      addRoute(core, "172.16.30.0", "255.255.255.0", "10.0.34.2");
      addRoute(core, "172.16.31.0", "255.255.255.0", "10.0.34.2");
      addRoute(core, "0.0.0.0", "0.0.0.0", "10.0.12.1");
      addRoute(fw, "0.0.0.0", "0.0.0.0", "10.0.34.1");
      // one click from disaster: insider DDoS aimed at the DMZ web server
      kali.attack = { kind: "ddos", targetIp: "172.16.30.10", victimIp: null, active: true };
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
