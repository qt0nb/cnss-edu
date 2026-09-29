// ─── NetSim mini IOS-like CLI interpreter (routers, switches, firewall, L3, IDS) ─────────
import type { Device, AttackKind } from "./types";
import { findPort, hostIp, isValidIp, networkOf, prefixToMask, connectedRoutes, maskToPrefix, isHostKind } from "./engine";

export type CliMode = "exec" | "priv" | "conf" | "iface" | "vlan";

export interface CliState {
  mode: CliMode;
  iface: string; // current interface in config mode
  vlan: number; // current vlan in vlan mode
}

export const initialCliState: CliState = { mode: "exec", iface: "", vlan: 0 };

export interface CliAction {
  type: "ping" | "dhcp-renew" | "dns" | "http" | "attack" | "stop-attack";
  arg: string;
}

export interface CliResult {
  lines: string[];
  state: CliState;
  action?: CliAction;
}

const OK = [""];
const isRouterLike = (d: Device) => d.kind === "router" || d.kind === "wirelessRouter" || d.kind === "switch" || d.kind === "hub" || d.kind === "firewall" || d.kind === "l3switch" || d.kind === "ids";
const isSwitchLike = (d: Device) => d.kind === "switch" || d.kind === "hub" || d.kind === "l3switch";
const canFilter = (d: Device) => d.kind === "firewall" || d.kind === "l3switch";
const ATTACK_KINDS: AttackKind[] = ["arpspoof", "ddos", "synflood", "scan"];

function nextAclId(d: Device): number {
  return (d.acls ?? []).reduce((m, r) => Math.max(m, r.id), 0) + 1;
}

export function promptOf(d: Device, s: CliState): string {
  const h = d.name;
  switch (s.mode) {
    case "exec": return `${h}>`;
    case "priv": return `${h}#`;
    case "conf": return `${h}(config)#`;
    case "iface": return `${h}(config-if)#`;
    case "vlan": return `${h}(config-vlan)#`;
  }
}

export function runCliLine(d: Device, rawLine: string, state: CliState): CliResult {
  const line = rawLine.trim();
  const lower = line.toLowerCase();
  const lines: string[] = [];
  let st: CliState = { ...state };
  let action: CliAction | undefined;

  if (!isRouterLike(d)) {
    lines.push("% الأوامر غير متاحة على هذا الجهاز / Commands not available on this device");
    return { lines, state: st };
  }
  if (line === "" || lower === "cls" || lower === "clear") return { lines, state: st };
  if (line === "?" || lower === "help") {
    lines.push(
      "الأوامر المتاحة / Available commands:",
      "  enable, disable, configure terminal",
      "  interface <name> | interface vlan <n>",
      "  hostname <name>, ip route <net> <mask> <nh>",
      "  access-list <permit|deny> <proto> <src> <dst> [port]  ← جدار ناري",
      "  policy deny-all | no policy deny-all              ← السياسة الافتراضية",
      "  switchport port-security                          ← أمن المنفذ",
      "  show ip interface brief | show arp | show vlan",
      "  show mac address-table | show ip route",
      "  show access-list | show alerts | show running-config",
      "  ping <ip>, attack ... (Kali), exit, end, write"
    );
    return { lines, state: st };
  }

  // do prefix
  let body = line;
  if (lower.startsWith("do ")) {
    body = line.slice(3);
    st = { ...st, mode: "priv" };
  }

  const tokens = body.split(/\s+/);
  const cmd = tokens[0]?.toLowerCase() ?? "";
  const arg = tokens.slice(1).join(" ");

  switch (cmd) {
    case "enable": {
      if (st.mode === "exec") st = { ...st, mode: "priv" };
      return { lines: OK, state: st };
    }
    case "disable": {
      if (st.mode === "priv") st = { ...st, mode: "exec" };
      return { lines: OK, state: st };
    }
    case "configure":
    case "conf": {
      if (st.mode === "priv" && ["terminal", "t"].includes(tokens[1]?.toLowerCase() ?? "")) st = { ...st, mode: "conf" };
      else lines.push("% اكتب: configure terminal");
      return { lines, state: st };
    }
    case "interface":
    case "int": {
      if (st.mode !== "conf") {
        lines.push("% خطأ: يجب أن تكون في وضع الإعداد (configure terminal أولاً)");
        return { lines, state: st };
      }
      const lowerArg = arg.toLowerCase();
      if (lowerArg.startsWith("vlan") && d.kind === "l3switch") {
        const n = parseInt(tokens[2] ?? "", 10);
        const svi = d.ports.find((p) => p.kind === "svi" && p.id === `vlan${n}`);
        if (!svi) {
          lines.push(`% لا توجد SVI للـVLAN ${n} — المتاح: vlan10, vlan20, vlan30`);
          return { lines, state: st };
        }
        st = { ...st, mode: "iface", iface: svi.id };
        return { lines: OK, state: st };
      }
      const name = arg;
      const port = findPortByName(d, name);
      if (!port) {
        lines.push(`% واجهة غير صالحة: ${name}. جرّب: ${d.ports.slice(0, 6).map((p) => p.name).join(" , ")}`);
        return { lines, state: st };
      }
      st = { ...st, mode: "iface", iface: port.id };
      return { lines: OK, state: st };
    }
    case "vlan": {
      if (st.mode === "conf") {
        const n = parseInt(tokens[1] ?? "", 10);
        if (!n || n < 1 || n > 4094) {
          lines.push("% رقم VLAN غير صالح (1-4094)");
        } else {
          st = { ...st, mode: "vlan", vlan: n };
        }
      } else lines.push("% يجب أن تكون في وضع configure terminal");
      return { lines, state: st };
    }
    case "name": {
      if (st.mode === "vlan") {
        lines.push(`VLAN ${st.vlan} named ${arg}`);
      } else if (st.mode === "conf") {
        if (isValidIp(arg) === false && arg.length > 0 && arg.length < 26 && !arg.includes(" ") && !arg.match(/\d+\.\d+\.\d+\.\d+/)) {
          d.name = arg;
        } else if (arg.match(/^\S+$/)) {
          d.name = arg;
        }
      }
      return { lines, state: st };
    }
    case "hostname": {
      if (st.mode === "conf" && /^\S{1,25}$/.test(arg)) d.name = arg;
      else lines.push("% اسم غير صالح");
      return { lines, state: st };
    }
    case "exit": {
      if (st.mode === "iface" || st.mode === "vlan") st = { ...st, mode: "conf" };
      else if (st.mode === "conf") st = { ...st, mode: "priv" };
      else if (st.mode === "priv") st = { ...st, mode: "exec" };
      return { lines: OK, state: st };
    }
    case "end": {
      st = { ...st, mode: "priv" };
      return { lines: OK, state: st };
    }
    case "no": {
      const sub = tokens[1]?.toLowerCase();
      if (st.mode === "iface" && sub === "shutdown") {
        const p = findPort(d, st.iface);
        if (p) p.adminUp = true;
        return { lines: [`%LINK-5-CHANGED: Interface ${p?.name}, changed state to up`], state: st };
      }
      if (st.mode === "iface" && isSwitchLike(d) && sub === "switchport" && tokens[2] === "port-security") {
        const p = findPort(d, st.iface);
        if (p) { p.secure = false; p.stickyMac = null; }
        return { lines: [`${p?.name}: أمن المنفذ معطّل`], state: st };
      }
      if (st.mode === "conf" && sub === "policy") {
        d.defaultDeny = false;
        return { lines: ["السياسة الافتراضية: السماح (permit-all)"], state: st };
      }
      if (st.mode === "conf" && sub === "ip" && tokens[2] === "route") {
        const net = tokens[3];
        const mask = tokens[4];
        d.routes = d.routes.filter((r) => !(r.network === net && r.mask === mask && r.kind === "static"));
        return { lines: OK, state: st };
      }
      if (st.mode === "conf" && (sub === "access-list" || sub === "acl")) {
        const id = parseInt(tokens[2] ?? "", 10);
        d.acls = (d.acls ?? []).filter((r) => r.id !== id);
        return { lines: [`حُذفت القاعدة ${id || ""} `], state: st };
      }
      lines.push("% أمر غير مدعوم");
      return { lines, state: st };
    }
    case "shutdown": {
      if (st.mode === "iface") {
        const p = findPort(d, st.iface);
        if (p) p.adminUp = false;
        return { lines: [`%LINK-5-CHANGED: Interface ${p?.name}, changed state to administratively down`], state: st };
      }
      lines.push("% استخدمه داخل واجهة");
      return { lines, state: st };
    }
    case "ip": {
      const sub = tokens[1]?.toLowerCase();
      if (st.mode === "iface" && sub === "address") {
        const ip = tokens[2];
        const mask = tokens[3] ?? (tokens[2]?.includes("/") ? undefined : "255.255.255.0");
        let m = mask;
        let i = ip;
        if (ip?.includes("/")) {
          const [a, p] = ip.split("/");
          i = a;
          m = prefixToMask(parseInt(p, 10));
        }
        if (!i || !m || !isValidIp(i) || maskToPrefix(m) < 0) {
          lines.push("% عنوان/قناع غير صالح. مثال: ip address 192.168.1.1 255.255.255.0");
          return { lines, state: st };
        }
        const p = findPort(d, st.iface);
        if (p) {
          p.ip = i;
          p.mask = m;
          lines.push(`تم ضبط ${i} ${m} على ${p.name}`);
        }
        return { lines, state: st };
      }
      if (st.mode === "conf" && sub === "route") {
        const net = tokens[2];
        let mask = tokens[3];
        const next = tokens[4];
        let network = net;
        if (net?.includes("/")) {
          const [a, pfx] = net.split("/");
          network = a;
          mask = prefixToMask(parseInt(pfx, 10));
        }
        if (!isValidIp(network) || !mask || !isValidIp(mask)) {
          lines.push("% صيغة: ip route <network> <mask> <next-hop>");
          return { lines, state: st };
        }
        if (!next) {
          lines.push("% حدد next-hop أو منفذ خروج");
          return { lines, state: st };
        }
        d.routes = d.routes.filter((r) => !(r.network === network && r.mask === mask && r.kind === "static"));
        d.routes.push({ network, mask, nextHop: isValidIp(next) ? next : null, iface: isValidIp(next) ? "" : next, ad: 1, kind: "static" });
        if (!isValidIp(next)) {
          const route = d.routes[d.routes.length - 1];
          route.iface = next;
        }
        lines.push(`مسار ثابت أُضيف: ${network} ${mask} عبر ${next}`);
        return { lines, state: st };
      }
      if (st.mode === "conf" && sub === "dhcp") {
        lines.push("% إعداد DHCP للمبدّلات غير مدعوم هنا — استخدم الخادم/الراوتر المنزلي");
        return { lines, state: st };
      }
      lines.push("% أمر ip غير مدعوم هنا");
      return { lines, state: st };
    }
    case "access-list":
    case "acl": {
      if (!canFilter(d)) {
        lines.push("% قوائم ACL تُضبط على الجدار الناري أو مبدّل L3");
        return { lines, state: st };
      }
      if (st.mode !== "conf") {
        lines.push("% يجب أن تكون في configure terminal");
        return { lines, state: st };
      }
      const action = tokens[1]?.toLowerCase();
      if (action !== "permit" && action !== "deny") {
        lines.push("% صيغة: access-list permit|deny any|icmp|tcp|udp <src any|ip> <dst any|ip> [port]");
        return { lines, state: st };
      }
      const proto = (tokens[2]?.toLowerCase() ?? "any") as "any" | "icmp" | "tcp" | "udp";
      if (!["any", "icmp", "tcp", "udp"].includes(proto)) {
        lines.push("% البروتوكول: any أو icmp أو tcp أو udp");
        return { lines, state: st };
      }
      const src = tokens[3] ?? "any";
      const dst = tokens[4] ?? "any";
      const port = tokens[5] ? parseInt(tokens[5], 10) : null;
      if (src !== "any" && !isValidIp(src)) { lines.push("% عنوان المصدر غير صالح (أو any)"); return { lines, state: st }; }
      if (dst !== "any" && !isValidIp(dst)) { lines.push("% عنوان الوجهة غير صالح (أو any)"); return { lines, state: st }; }
      const rule = { id: nextAclId(d), action: action as "permit" | "deny", src, srcMask: "any", dst, dstMask: "any", proto, port: Number.isFinite(port) ? port : null, hits: 0 };
      d.acls = [...(d.acls ?? []), rule];
      return { lines: [`قاعدة #${rule.id}: ${action} ${proto} ${src} → ${dst}${port ? ":" + port : ""}`], state: st };
    }
    case "policy": {
      if (!canFilter(d)) { lines.push("% للجدار الناري فقط"); return { lines, state: st }; }
      if (st.mode !== "conf") { lines.push("% يجب أن تكون في configure terminal"); return { lines, state: st }; }
      if (tokens[1]?.toLowerCase() === "deny-all") {
        d.defaultDeny = true;
        return { lines: ["السياسة الافتراضية: رفض كل ما لا تطابقه قواعد permit"], state: st };
      }
      lines.push("% صيغة: policy deny-all");
      return { lines, state: st };
    }
    case "attack": {
      if (d.kind !== "attacker") {
        lines.push("% أوامر الهجوم لجهاز المهاجم (Kali) فقط");
        return { lines, state: st };
      }
      const sub = tokens[1]?.toLowerCase() ?? "";
      if (sub === "stop") {
        d.attack = null;
        return { lines: ["أُوقف الهجوم وصفّرت الحالة"], state: st, action: { type: "stop-attack", arg: "" } };
      }
      if (!ATTACK_KINDS.includes(sub as AttackKind)) {
        lines.push("% صيغ الهجوم:", "  attack arpspoof <ضحيةIP> <هوية مسروقةIP>", "  attack ddos <هدفIP>", "  attack synflood <هدفIP>", "  attack scan <بدايةIP>", "  attack stop");
        return { lines, state: st };
      }
      const a1 = tokens[2];
      const a2 = tokens[3];
      if (!a1 || !isValidIp(a1)) { lines.push("% حدد عنوان IP صالحاً"); return { lines, state: st }; }
      d.attack = {
        kind: sub as AttackKind,
        targetIp: a1,
        victimIp: sub === "arpspoof" ? (a2 && isValidIp(a2) ? a2 : null) : null,
        active: true,
      };
      const desc = sub === "arpspoof"
        ? `تسميم ARP: سأقنع ${a1} أنني أنا ${a2 ?? "الهوية المسروقة"}`
        : sub === "ddos" ? `إغراق ICMP نحو ${a1}`
          : sub === "synflood" ? `إغراق SYN نحو ${a1}:80`
            : `مسح الشبكة بدءاً من ${a1}`;
      return { lines: [desc, "شغّل «تنفيذ الهجوم» أو اضغط زر الهجوم لمشاهدة المحاكاة"], state: st, action: { type: "attack", arg: "" } };
    }
    case "switchport": {
      if (st.mode !== "iface") {
        lines.push("% استخدمه داخل واجهة");
        return { lines, state: st };
      }
      const p = findPort(d, st.iface);
      if (!p || !isSwitchLike(d)) {
        lines.push("% switchport للمبدّلات فقط");
        return { lines, state: st };
      }
      const sub = tokens[1]?.toLowerCase();
      if (sub === "port-security") {
        p.secure = true;
        p.stickyMac = null;
        return { lines: [`${p.name}: أمن المنفذ مفعّل — سيتثبت أول MAC يتعلمه المنفذ`], state: st };
      }
      if (sub === "mode") {
        const m = tokens[2]?.toLowerCase();
        if (m === "access") { p.trunk = false; lines.push(`منفذ ${p.name} صار access`); }
        else if (m === "trunk") { p.trunk = true; lines.push(`منفذ ${p.name} صار trunk`); }
        else lines.push("% mode: access أو trunk");
      } else if (sub === "access" && tokens[2]?.toLowerCase() === "vlan") {
        const n = parseInt(tokens[3] ?? "", 10);
        if (n >= 1 && n <= 4094) { p.accessVlan = n; lines.push(`${p.name} في VLAN ${n}`); }
        else lines.push("% رقم VLAN غير صالح");
      } else {
        lines.push("% جرّب: switchport mode access|trunk أو switchport access vlan <n>");
      }
      return { lines, state: st };
    }
    case "show": {
      if (st.mode === "exec" || st.mode === "priv") {
        lines.push(...showCommand(d, tokens.slice(1).join(" ")));
      } else {
        lines.push("% استخدم do show ... أو اخرج أولاً");
      }
      return { lines, state: st };
    }
    case "write":
    case "copy": {
      lines.push("Building configuration...", "[OK]");
      return { lines, state: st };
    }
    case "ping": {
      if (!isValidIp(arg)) {
        lines.push("% صيغة: ping <ip>");
        return { lines, state: st };
      }
      action = { type: "ping", arg };
      return { lines: [...lines, `Sending 4 echoes to ${arg}, timeout 2s:`], state: st, action };
    }
    case "clear": {
      return { lines: [], state: st };
    }
    default:
      lines.push(`% أمر غير معروف: ${tokens[0]} — اكتب ? للمساعدة`);
      return { lines, state: st };
  }
}

function findPortByName(d: Device, name: string): ReturnType<typeof findPort> {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9/]/g, "");
  const target = norm(name);
  return d.ports.find((p) => norm(p.name) === target || p.id.toLowerCase() === target || norm(p.name).endsWith(target) || norm(p.name).replace("fastethernet", "fa").replace("gigabitethernet", "g") === target || p.name.toLowerCase() === name.toLowerCase());
}

export function showCommand(d: Device, sub: string): string[] {
  const out: string[] = [];
  const s = sub.toLowerCase();
  if (s.startsWith("access-list") || s === "acl") {
    out.push(`السياسة الافتراضية: ${d.defaultDeny ? "رفض الكل (deny-all)" : "السماح (permit-all)"}`);
    out.push("#  Action  Proto  Source        Dest          Port  Hits");
    const rules = d.acls ?? [];
    out.push(rules.length ? rules.map((r) => `${String(r.id).padEnd(3)}${r.action.padEnd(8)}${r.proto.padEnd(7)}${(r.src === "any" ? "any" : r.src).padEnd(14)}${(r.dst === "any" ? "any" : r.dst).padEnd(14)}${(r.port ?? "-").toString().padEnd(6)}${r.hits}`).join("\n") : "  (لا قواعد)");
  } else if (s.startsWith("alert")) {
    const alerts = d.idsAlerts ?? [];
    out.push(`تنبيهات ${d.name} (${alerts.length}):`);
    out.push(alerts.length ? alerts.map((a) => `[${a.severity.toUpperCase()}] ${a.kind} ${a.srcIp} → ${a.dstIp} — ${a.detail.ar}`).join("\n") : "  (لا تنبيهات — شغّل حركة أو هجوماً)");
  } else if (s.startsWith("attack")) {
    if (d.kind !== "attacker") { out.push("% لجهاز المهاجم فقط"); return out; }
    out.push(d.attack ? `الهجوم الحالي: ${d.attack.kind} → ${d.attack.targetIp}${d.attack.victimIp ? ` (سرقة هوية ${d.attack.victimIp})` : ""} — ${d.attack.active ? "نشط" : "متوقف"}` : "  (لا هجوم مضبوط — جرّب: attack ddos <ip>)");
  } else if (s.startsWith("port-security")) {
    const secured = d.ports.filter((p) => p.secure);
    out.push(secured.length ? secured.map((p) => `${p.name}: ${p.stickyMac ?? "بانتظار أول MAC"}`).join("\n") : "  (لا منافذ مؤمّنة — استخدم switchport port-security داخل الواجهة)");
  } else if (s.startsWith("ip interface brief") || s === "ip int brief" || s.startsWith("ip int")) {
    out.push("Interface              IP-Address      OK? Method Status  Protocol");
    out.push(d.ports.map((p) => {
      const short = p.name.replace("FastEthernet", "Fa").replace("GigabitEthernet", "Gi").replace("Serial", "Se").replace(" (WAN)", "").padEnd(22).slice(0, 22);
      return `${short}${(p.ip ?? "unassigned").padEnd(16).slice(0, 16)}YES manual ${(p.adminUp ? "up" : "down").padEnd(7)} ${p.linkId ? "up" : "down"}`;
    }).join("\n"));
  } else if (s.startsWith("arp")) {
    out.push("Protocol  Address          Age (min)  Hardware Addr   Type");
    out.push(d.arp.length ? d.arp.map((a) => `Internet  ${a.ip.padEnd(16)} -         ${a.mac}  ARPA`).join("\n") : "  (جدول ARP فارغ)");
  } else if (s.startsWith("mac")) {
    out.push("Mac Address Table", "------------------------------------------", "Vlan    Mac Address       Type        Ports");
    out.push(d.macTable.length ? d.macTable.map((e) => `  ${String(e.vlan).padEnd(5)} ${e.mac.padEnd(17)} DYNAMIC     ${e.portId}`).join("\n") : "  (الجدول فارغ)");
  } else if (s.startsWith("ip route")) {
    const all = [...connectedRoutes(d), ...d.routes];
    out.push("Codes: C - connected, S - static", "");
    out.push(all.length ? all.map((r) => `${r.kind === "connected" ? "C" : "S"}    ${networkOf(r.network, r.mask)}${r.mask !== "255.255.255.255" ? "/" + maskToPrefix(r.mask) : ""} ${r.nextHop ? `is directly via ${r.nextHop}` : `is directly connected, ${r.iface}`}`).join("\n") : "  (لا مسارات)");
  } else if (s.startsWith("vlan")) {
    const vlans = new Map<number, number>();
    for (const p of d.ports) vlans.set(p.trunk ? -1 : p.accessVlan, (vlans.get(p.trunk ? -1 : p.accessVlan) ?? 0) + 1);
    out.push("Vlan Name                Status    Ports", "---- -------------------- --------- -------------------------------");
    for (const [v, c] of vlans) {
      out.push(`${String(v === -1 ? "trunk" : v).padEnd(5)}${`VLAN${v}`.padEnd(21)}active    ${c} منفذ`);
    }
  } else if (s.startsWith("running-config") || s === "run") {
    out.push("! التكوين الحالي لـ " + d.name);
    out.push(d.ports.filter((p) => p.ip).map((p) => `interface ${p.name}\n ip address ${p.ip} ${p.mask}\n ${p.adminUp ? "no shutdown" : "shutdown"}${p.secure ? "\n switchport port-security" : ""}${p.trunk ? "\n switchport mode trunk" : ""}${!p.trunk && p.accessVlan !== 1 && (d.kind === "switch" || d.kind === "l3switch") ? `\n switchport access vlan ${p.accessVlan}` : ""}`).join("\n"));
    out.push(d.routes.filter((r) => r.kind === "static").map((r) => `ip route ${r.network} ${r.mask} ${r.nextHop ?? r.iface}`).join("\n"));
    out.push((d.acls ?? []).map((r) => `access-list ${r.action} ${r.proto} ${r.src} ${r.dst}${r.port ? " " + r.port : ""}`).join("\n"));
    if (d.defaultDeny) out.push("policy deny-all");
  } else if (s.startsWith("version")) {
    out.push(`${d.name} — NetMastery Sim (IOS-like)\nالنموذج: ${d.kind === "router" ? "1941 ISR" : d.kind === "switch" ? "2960" : "عمومي"}\nالذاكرة: 512MB DRAM\nالبوابات: ${d.ports.length}`);
  } else {
    out.push("% اكتب: show ip interface brief | show arp | show mac address-table | show ip route | show vlan | show running-config");
  }
  return out;
}

// ─────────────── PC / host command prompt (like PT) ───────────────
export function runHostLine(d: Device, rawLine: string): { lines: string[]; action?: CliAction } {
  const line = rawLine.trim();
  const lower = line.toLowerCase();
  const lines: string[] = [];
  if (!isHostKind(d.kind)) return { lines: ["ليس جهاز طرفية / not an end device"] };
  if (line === "" || lower === "cls" || lower === "clear") return { lines: [] };
  if (lower === "?" || lower === "help") {
    return { lines: [d.kind === "attacker"
      ? "أوامر Kali: attack arpspoof <ضحية> <هوية> | attack ddos <هدف> | attack synflood <هدف> | attack scan <ip> | attack stop | attack status, ipconfig, arp -a, arp -d, ping <ip>"
      : "أوامر متاحة: ipconfig, ipconfig /ip <ip> <mask>, ipconfig /gw <ip>, ipconfig /dns <ip>, ipconfig /dhcp, arp -a, arp -d, ping <ip>, nslookup <name>, http <host>, cls"] };
  }
  if (d.kind === "attacker" && lower.startsWith("attack")) {
    const toks = line.split(/\s+/);
    const sub = toks[1]?.toLowerCase() ?? "";
    if (sub === "status") {
      return { lines: [d.attack ? `الهجوم: ${d.attack.kind} → ${d.attack.targetIp}${d.attack.victimIp ? ` (هوية ${d.attack.victimIp})` : ""}` : "(لا هجوم مضبوط)"] };
    }
    if (sub === "stop") {
      d.attack = null;
      return { lines: ["أُوقف الهجوم"], action: { type: "stop-attack", arg: "" } };
    }
    if (!ATTACK_KINDS.includes(sub as AttackKind) || !toks[2] || !isValidIp(toks[2])) {
      return { lines: ["% صيغة: attack arpspoof|ddos|synflood|scan <ip> [هوية] — أو attack stop"] };
    }
    d.attack = {
      kind: sub as AttackKind,
      targetIp: toks[2],
      victimIp: sub === "arpspoof" && toks[3] && isValidIp(toks[3]) ? toks[3] : null,
      active: true,
    };
    return { lines: [`هجوم ${sub} جاهز نحو ${toks[2]} — تنفيذ المحاكاة الآن...`], action: { type: "attack", arg: "" } };
  }
  const { ip, mask } = hostIp(d);
  if (lower === "ipconfig" || lower === "ifconfig" || lower === "ipconfig /all") {
    lines.push(`اسم الجهاز . . . . . . . : ${d.name}`);
    for (const p of d.ports) {
      lines.push(`واجهة ${p.name}:`);
      lines.push(`  العنوان الفعلي . . . . : ${p.mac}`);
      lines.push(`  عنوان IPv4. . . . . . : ${p.ip ?? (d.dhcpClient ? "بانتظار DHCP" : "غير مضبوط")}`);
      lines.push(`  القناع الفرعي  . . . . : ${p.mask ?? "-"}`);
    }
    lines.push(`  البوابة الافتراضية. . : ${d.gateway ?? "-"}`);
    lines.push(`  خادم DNS  . . . . . . : ${d.dnsServer ?? "-"}`);
    return { lines };
  }
  if (lower.startsWith("ipconfig")) {
    const rest = line.slice(8).trim();
    const toks = rest.split(/\s+/);
    const flag = toks[0]?.toLowerCase() ?? "";
    if (flag === "/ip") {
      const ipn = toks[1];
      let m = toks[2];
      if (ipn?.includes("/")) {
        const [a, p] = ipn.split("/");
        toks[1] = a;
        m = prefixToMask(parseInt(p, 10));
      }
      if (!isValidIp(toks[1] ?? "") || (m !== undefined && !isValidIp(m))) return { lines: ["% صيغة: ipconfig /ip 192.168.1.10 255.255.255.0"] };
      const port = d.ports.find((p) => p.kind !== "wireless" && p.linkId) ?? d.ports[0];
      port.ip = toks[1];
      port.mask = m ?? "255.255.255.0";
      d.dhcpClient = false;
      return { lines: ["تم ضبط العنوان — يلزم /gw للبوابة إن كانت الوجهة خارج الشبكة"] };
    }
    if (flag === "/gw") {
      if (!isValidIp(toks[1] ?? "")) return { lines: ["% صيغة: ipconfig /gw 192.168.1.1"] };
      d.gateway = toks[1];
      return { lines: [`البوابة: ${toks[1]}`] };
    }
    if (flag === "/dns") {
      if (!isValidIp(toks[1] ?? "")) return { lines: ["% صيغة: ipconfig /dns 8.8.8.8"] };
      d.dnsServer = toks[1];
      return { lines: [`DNS: ${toks[1]}`] };
    }
    if (flag === "/dhcp" || flag === "/renew") {
      d.dhcpClient = true;
      for (const p of d.ports) { p.ip = null; p.mask = null; }
      d.gateway = null;
      d.dnsServer = null;
      return { lines: ["طلب DHCP قيد الإرسال... (شغّل المحاكاة)"], action: { type: "dhcp-renew", arg: "" } };
    }
    return { lines: ["% راجع ?"] };
  }
  if (lower === "arp" || lower === "arp -a") {
    return { lines: d.arp.length ? d.arp.map((a) => `  ${a.ip.padEnd(16)} ${a.mac}`).join("\n").split("\n") : ["  (جدول ARP فارغ)"] };
  }
  if (lower === "arp -d" || lower === "arp /d") {
    d.arp = [];
    return { lines: ["أُفرغ جدول ARP — إعادة التعلم عند أول حزمة (علاج التسميم)"] };
  }
  if (lower.startsWith("ping")) {
    const ipn = line.split(/\s+/)[1];
    if (!ipn) return { lines: ["% صيغة: ping <ip>"] };
    return { lines: [`Pinging ${ipn} ببيانات 32 بايت...`], action: { type: "ping", arg: ipn } };
  }
  if (lower.startsWith("nslookup")) {
    const name = line.split(/\s+/)[1];
    if (!name) return { lines: ["% صيغة: nslookup <name>"] };
    return { lines: [`الاستعلام عن ${name}...`], action: { type: "dns", arg: name } };
  }
  if (lower.startsWith("http") || lower.startsWith("curl")) {
    const name = line.split(/\s+/)[1];
    if (!name) return { lines: ["% صيغة: http <host>"] };
    return { lines: [`جلب http://${name} ...`], action: { type: "http", arg: name } };
  }
  return { lines: [`'${line}' ليس أمراً معروفاً — اكتب ?`] };
}
