// ─── NetSim mini IOS-like CLI interpreter (routers, switches, firewall, L3, IDS) ─────────
import type { Device, AttackKind } from "./types";
import { findPort, hostIp, isValidIp, networkOf, prefixToMask, connectedRoutes, maskToPrefix, isHostKind } from "./engine";

export type CliMode = "exec" | "priv" | "conf" | "iface" | "vlan";

export interface CliState {
  mode: CliMode;
  iface: string; // current interface in config mode
  vlan: number; // current vlan in vlan mode
  /** 11-e: `show history` — last commands typed (max 20) */
  history?: string[];
}

export const initialCliState: CliState = { mode: "exec", iface: "", vlan: 0 };

export interface CliAction {
  type: "ping" | "dhcp-renew" | "dns" | "http" | "attack" | "stop-attack" | "save-config" | "reload";
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
  // 11-e realism: record executed commands for `show history` (cap 20, like IOS terminal history)
  st = { ...st, history: [...(st.history ?? []), line].slice(-20) };
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
      "  show interfaces <name> | show version | show hosts",
      "  show mac address-table | show ip route | show history",
      "  show access-list | show alerts | show running-config",
      "  copy running-config startup-config | write memory | wr",
      "  reload | banner motd <text>",
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
      if (st.mode === "conf" && sub === "banner" && tokens[2]?.toLowerCase() === "motd") {
        d.motd = null;
        return { lines: OK, state: st };
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
        lines.push(...showCommand(d, tokens.slice(1).join(" "), st.history));
      } else {
        lines.push("% استخدم do show ... أو اخرج أولاً");
      }
      return { lines, state: st };
    }
    case "write":
    case "wr": {
      // write / write memory / wr — persist running-config to the simulator "flash"
      return { lines: ["Building configuration...", "[OK]"], state: st, action: { type: "save-config", arg: "" } };
    }
    case "copy": {
      const csrc = tokens[1]?.toLowerCase() ?? "";
      const cdst = tokens[2]?.toLowerCase() ?? "";
      if ((csrc === "running-config" || csrc === "run") && (cdst === "startup-config" || cdst === "start")) {
        return { lines: ["Building configuration...", "[OK]"], state: st, action: { type: "save-config", arg: "" } };
      }
      lines.push("% صيغة: copy running-config startup-config");
      return { lines, state: st };
    }
    case "reload": {
      const boot: string[] = [
        "Proceed with reload? [confirm]",
        "%SYS-5-RELOAD: Reload requested by console.",
        "System restarting...",
      ];
      if (d.motd) boot.push("", "*** " + d.motd + " ***");
      boot.push("");
      return { lines: boot, state: { mode: "exec", iface: "", vlan: 0, history: st.history }, action: { type: "reload", arg: "" } };
    }
    case "banner": {
      if (st.mode !== "conf") {
        lines.push("% يجب أن تكون في وضع الإعداد (configure terminal أولاً)");
        return { lines, state: st };
      }
      if (tokens[1]?.toLowerCase() !== "motd") {
        lines.push("% صيغة: banner motd <نص> — أو no banner motd للحذف");
        return { lines, state: st };
      }
      const text = body.split(/\s+/).slice(2).join(" ").trim();
      if (!text) {
        lines.push("% صيغة: banner motd <نص>");
        return { lines, state: st };
      }
      d.motd = text.slice(0, 120);
      return { lines: OK, state: st };
    }
    case "ping": {
      if (!isValidIp(arg)) {
        lines.push("% صيغة: ping <ip>");
        return { lines, state: st };
      }
      action = { type: "ping", arg };
      return { lines: [...lines, "Type escape sequence to abort.", `Sending 5, 100-byte ICMP Echos to ${arg}, timeout is 2 seconds:`], state: st, action };
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

// ─────────────── 11-e realism helpers (Cisco-style output) ───────────────

/** deterministic pseudo-uptime derived from the device id (stable across renders) */
function uptimeOf(d: Device): { text: string; totalMin: number } {
  let h = 0;
  for (let i = 0; i < d.id.length; i++) h = (h * 31 + d.id.charCodeAt(i)) >>> 0;
  const totalMin = 5 + (h % 4320); // 5 minutes .. ~3 days
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  const text = days > 0
    ? `${days} day${days > 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`
    : hours > 0
      ? `${hours} hour${hours !== 1 ? "s" : ""}, ${mins} minute${mins !== 1 ? "s" : ""}`
      : `${mins} minute${mins !== 1 ? "s" : ""}`;
  return { text, totalMin };
}

/** 00:1B:0C:12:34:AB → 001B.0C12.34AB (Cisco dotted-hex style) */
function ciscoMac(mac: string): string {
  const flat = mac.replace(/:/g, "").toUpperCase();
  return `${flat.slice(0, 4)}.${flat.slice(4, 8)}.${flat.slice(8, 12)}`;
}

interface IosProfile {
  model: string;
  software: string;
  version: string;
  image: string;
  board: string;
  memory: string;
  compiled: string;
  reg: string;
}

const IOS_PROFILE: Record<string, IosProfile> = {
  router: {
    model: "cisco CISCO1941/K9 (revision 1.0)", software: "C2900 Software (C2900-UNIVERSALK9-M)",
    version: "Version 15.1(4)M4, RELEASE SOFTWARE (fc1)", image: "flash:c2900-universalk9-mz.SPA.151-4.M4.bin",
    board: "FHK14324144", memory: "491520K/32768K bytes of memory", compiled: "Compiled Mon 22-Jul-11 23:15 by prod_rel_team", reg: "0x2102",
  },
  switch: {
    model: "cisco WS-C2960-24TT-L (RCV3243250B) (power status: OK)", software: "C2960 Software (C2960-LANBASEK9-M)",
    version: "Version 15.0(2)SE4, RELEASE SOFTWARE (fc3)", image: "flash:c2960-lanbasek9-mz.150-2.SE4.bin",
    board: "FOC1123Z4E2", memory: "65536K bytes of memory", compiled: "Compiled Tue 25-Jun-13 02:31 by prod_rel_team", reg: "0xF",
  },
  l3switch: {
    model: "cisco WS-C3560-24PS (RCV-6534-23) (power status: OK)", software: "C3560 Software (C3560-IPBASEK9-M)",
    version: "Version 12.2(55)SE5, RELEASE SOFTWARE (fc1)", image: "flash:c3560-ipbasek9-mz.122-55.SE5.bin",
    board: "FOC1043W1GF", memory: "65536K bytes of memory", compiled: "Compiled Tue 17-Aug-10 11:12 by prod_rel_team", reg: "0xF",
  },
  firewall: {
    model: "Cisco ASA 5505 (revision 2.0) (power status: OK)", software: "Cisco Adaptive Security Appliance Software",
    version: "Version 9.1(5)16", image: "disk0:/asa915-16-k8.bin",
    board: "FOC1206Y1XQ", memory: "512MB RAM, 128MB flash memory", compiled: "Compiled Thu 09-Jul-15 11:06 by builders", reg: "0x0",
  },
  ids: {
    model: "Cisco IDS 4215 Sensor (revision 5.0)", software: "Cisco Intrusion Detection Sensor Software",
    version: "Version 7.0(4)E4", image: "disk0:/ids-4215-7.0-4-E4.img",
    board: "FOC0807N2DR", memory: "512MB DRAM", compiled: "Compiled Wed 12-Mar-08 09:44 by sensorteam", reg: "0x0",
  },
  wirelessRouter: {
    model: "CNSS HomeRouter WR-300N (revision 2.1)", software: "CNSS RouterOS Software",
    version: "Version 2.1.17", image: "flash:routeros-2.1.17.bin",
    board: "CNSS-300N-8321", memory: "65536K bytes of memory", compiled: "Compiled Sat 06-Sep-25 00:12 by cnss-build", reg: "0x0",
  },
  hub: {
    model: "CNSS Hub-8 (unmanaged repeater)", software: "CNSS Sim Firmware",
    version: "Version 1.0", image: "(no flash)", board: "—", memory: "no CPU", compiled: "—", reg: "—",
  },
};

function interfaceCountLines(d: Device): string[] {
  const out: string[] = [];
  const gi = d.ports.filter((p) => p.kind === "ethernet" && p.name.startsWith("Gigabit")).length;
  const fa = d.ports.filter((p) => p.kind === "ethernet" && p.name.startsWith("Fast")).length;
  const se = d.ports.filter((p) => p.kind === "serial").length;
  const ra = d.ports.filter((p) => p.kind === "wireless").length;
  const svi = d.ports.filter((p) => p.kind === "svi").length;
  const wan = d.ports.filter((p) => p.kind === "internet").length;
  if (gi) out.push(`${gi} Gigabit Ethernet interface${gi > 1 ? "s" : ""}`);
  if (fa) out.push(`${fa} Fast Ethernet interface${fa > 1 ? "s" : ""}`);
  if (se) out.push(`${se} Serial interface${se > 1 ? "s" : ""}`);
  if (ra) out.push(`${ra} IEEE 802.11 radio${ra > 1 ? "s" : ""}`);
  if (svi) out.push(`${svi} SVI virtual interface${svi > 1 ? "s" : ""}`);
  if (wan) out.push(`${wan} WAN interface${wan > 1 ? "s" : ""}`);
  return out;
}

/** interface up/down/protocol status line, Cisco style */
function ifaceStateLine(p: import("./types").Port): string {
  if (!p.adminUp) return "is administratively down, line protocol is down";
  if (p.kind === "svi") return p.ip ? "is up, line protocol is up" : "is down, line protocol is down";
  if (!p.linkId) return "is down, line protocol is down (notconnect)";
  return "is up, line protocol is up (connected)";
}

/** one full `show interfaces`-style block */
function ifaceBlock(d: Device, p: import("./types").Port): string[] {
  const out: string[] = [];
  out.push(`${p.name} ${ifaceStateLine(p)}`);
  const hw =
    p.kind === "serial" ? "HD64570"
      : p.kind === "wireless" ? "IEEE 802.11g Radio"
        : p.kind === "svi" ? "EtherSVI"
          : p.kind === "internet" ? "DSL WAN"
            : p.name.startsWith("Gigabit") ? "CNSS Gigabit Ethernet"
              : "CNSS Fast Ethernet";
  out.push(`  Hardware is ${hw}, address is ${ciscoMac(p.mac)} (bia ${ciscoMac(p.mac)})`);
  if (p.ip) out.push(`  Internet address is ${p.ip}/${maskToPrefix(p.mask ?? "255.255.255.0")}`);
  const bw = p.kind === "serial" ? 1544 : p.name.startsWith("Gigabit") ? 1000000 : p.kind === "wireless" ? 54000 : 100000;
  const dly = p.kind === "serial" ? 20000 : 10;
  out.push(`  MTU 1500 bytes, BW ${bw} Kbit, DLY ${dly} usec,`);
  out.push("     reliability 255/255, txload 1/255, rxload 1/255");
  // derived from real simulated counters (learned MACs, ARP entries, IDS inspections)
  const learned = d.macTable.filter((e) => e.portId === p.id).length;
  const active = (d.statsIn ?? 0) + (d.arp?.length ?? 0) * 2 + learned * 3;
  const inRate = p.linkId ? Math.min(128000, active * 96) : 0;
  const outRate = p.linkId ? Math.min(128000, active * 84) : 0;
  out.push(`  5 minute input rate ${inRate} bits/sec, ${inRate > 0 ? 1 : 0} packets/sec`);
  out.push(`  5 minute output rate ${outRate} bits/sec, ${outRate > 0 ? 1 : 0} packets/sec`);
  const inPkts = 11 + (p.linkId ? 27 : 0) + learned * 4 + (p.ip ? 3 : 0);
  const outPkts = 8 + (p.linkId ? 23 : 0) + learned * 3 + (p.ip ? 2 : 0);
  out.push(`     ${inPkts} packets input, ${inPkts * 96 + 61} bytes, 0 no buffer`);
  out.push("     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort");
  out.push(`     ${outPkts} packets output, ${outPkts * 94 + 57} bytes, 0 underruns`);
  out.push("     0 output errors, 0 collisions, 0 interface resets");
  return out;
}

export function showCommand(d: Device, sub: string, history?: string[]): string[] {
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
    out.push("Interface                  IP-Address      OK? Method Status                Protocol");
    out.push(d.ports.map((p) => {
      const short = p.name.replace("FastEthernet", "Fa").replace("GigabitEthernet", "Gi").replace("Serial", "Se").replace(" (WAN)", "").replace(" (SVI)", "").padEnd(26).slice(0, 26);
      const status = !p.adminUp
        ? "administratively down"
          : p.linkId
            ? "up"
            : p.kind === "svi"
              ? (p.ip ? "up" : "down")
              : "down";
      const proto = p.adminUp && (p.linkId || (p.kind === "svi" && p.ip)) ? "up" : "down";
      return `${short}${(p.ip ?? "unassigned").padEnd(16).slice(0, 16)}YES manual ${status.padEnd(22).slice(0, 22)} ${proto}`;
    }).join("\n"));
  } else if (s === "ip arp" || s.startsWith("ip arp")) {
    out.push("Protocol  Address          Age (min)  Hardware Addr   Type   Interface");
    out.push(d.arp.length
      ? d.arp.map((a) => `Internet  ${a.ip.padEnd(16)} -          ${ciscoMac(a.mac).padEnd(15)} ARPA   ${d.ports.find((p) => p.id === a.portId)?.name ?? a.portId}`).join("\n")
      : "  (جدول ARP فارغ — شغّل ping أولاً)");
  } else if (s.startsWith("arp")) {
    out.push("Protocol  Address          Age (min)  Hardware Addr   Type   Interface");
    out.push(d.arp.length
      ? d.arp.map((a) => `Internet  ${a.ip.padEnd(16)} -          ${ciscoMac(a.mac).padEnd(15)} ARPA   ${d.ports.find((p) => p.id === a.portId)?.name ?? a.portId}`).join("\n")
      : "  (جدول ARP فارغ — شغّل ping أولاً)");
  } else if (s.startsWith("interfaces") || s.startsWith("interface") || s === "int" || s.startsWith("int ")) {
    // `show interfaces` / `show interfaces <name>` / `show int <name>`
    const nameArg = sub.split(/\s+/).slice(1).join(" ").trim();
    if (nameArg) {
      const p = findPortByName(d, nameArg);
      if (!p) {
        out.push(`% Interface not found: ${nameArg}`);
      } else {
        out.push(...ifaceBlock(d, p));
      }
    } else {
      const interesting = d.ports.filter((p) => p.linkId || !p.adminUp || p.ip || p.kind === "svi");
      const shown = interesting.slice(0, 12);
      for (const p of shown) {
        out.push(...ifaceBlock(d, p), "");
      }
      const upN = d.ports.filter((p) => p.adminUp && (p.linkId || (p.kind === "svi" && p.ip))).length;
      out.push(`${d.ports.length} interfaces: ${upN} up, ${d.ports.length - upN} down`);
      if (interesting.length > shown.length) out.push(`... (${interesting.length - shown.length} more — استخدم show interfaces <name> لتخصيص واحد)`);
      if (shown.length === 0) out.push("  (لا واجهات نشطة — اربط كابلاً أو اضبط عنواناً)");
    }
  } else if (s.startsWith("hosts")) {
    const zone = d.dnsZone;
    out.push("Default domain is not set");
    out.push("Name/address lookup uses static mappings");
    out.push("");
    out.push("Host                      Flags    Age Type   Address(es)");
    const entries = zone ? Object.entries(zone.a) : [];
    out.push(entries.length ? entries.map(([name, ip]) => `${name.padEnd(26)}(perm, AA)  0   IN  A    ${ip}`).join("\n") : "  (no entries — أضف سجلات A على الخادم)");
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
  } else if (s.startsWith("history")) {
    const hist = history ?? [];
    out.push(hist.length ? hist.map((h) => `  ${h}`).join("\n") : "  (لا سجل بعد — الأوامر المنفّذة تُسجّل هنا)");
  } else if (s.startsWith("running-config") || s === "run") {
    out.push("! التكوين الحالي لـ " + d.name);
    out.push(d.ports.filter((p) => p.ip).map((p) => `interface ${p.name}\n ip address ${p.ip} ${p.mask}\n ${p.adminUp ? "no shutdown" : "shutdown"}${p.secure ? "\n switchport port-security" : ""}${p.trunk ? "\n switchport mode trunk" : ""}${!p.trunk && p.accessVlan !== 1 && (d.kind === "switch" || d.kind === "l3switch") ? `\n switchport access vlan ${p.accessVlan}` : ""}`).join("\n"));
    out.push(d.routes.filter((r) => r.kind === "static").map((r) => `ip route ${r.network} ${r.mask} ${r.nextHop ?? r.iface}`).join("\n"));
    out.push((d.acls ?? []).map((r) => `access-list ${r.action} ${r.proto} ${r.src} ${r.dst}${r.port ? " " + r.port : ""}`).join("\n"));
    if (d.defaultDeny) out.push("policy deny-all");
    if (d.motd) out.push(`banner motd ^${d.motd}^`);
  } else if (s.startsWith("version")) {
    const pr = IOS_PROFILE[d.kind] ?? {
      model: `CNSS Sim (${d.kind})`, software: "CNSS-edu Sim Software", version: "Version 1.0",
      image: "(sim)", board: "—", memory: "512MB DRAM", compiled: "—", reg: "0x0",
    };
    const up = uptimeOf(d);
    const restarted = new Date(Date.now() - up.totalMin * 60_000);
    out.push("Cisco Internetwork Operating System Software");
    out.push(`IOS (tm) ${pr.software}, ${pr.version}`);
    out.push("Technical Support: http://www.cisco.com/techsupport");
    out.push("Copyright (c) 1986-2025 by Cisco Systems, Inc.");
    out.push(pr.compiled === "—" ? `Compiled by CNSS-edu Sim` : pr.compiled);
    out.push("");
    out.push(`${d.name} uptime is ${up.text}`);
    out.push("System returned to ROM by power-on");
    out.push(`System restarted at ${restarted.toUTCString().replace("GMT", "UTC")}`);
    out.push(`System image file is "${pr.image}"`);
    out.push("");
    out.push(pr.model);
    out.push(pr.memory);
    out.push(`Processor board ID ${pr.board}`);
    out.push(...interfaceCountLines(d));
    out.push("Configuration register is " + pr.reg);
  } else {
    out.push("% اكتب: show ip interface brief | show arp | show interfaces <name> | show version | show history | show hosts | show ip route | show vlan | show running-config");
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
    return { lines: d.arp.length
      ? [
          `Interface: ${(d.ports.find((p) => p.ip) ?? d.ports[0])?.ip ?? "0.0.0.0"} --- 0x1`,
          "  Internet Address      Physical Address      Type",
          ...d.arp.map((a) => `  ${a.ip.padEnd(20)} ${a.mac.replace(/:/g, "-").padEnd(21)} dynamic`),
        ]
      : ["  (جدول ARP فارغ — شغّل ping أولاً)"] };
  }
  if (lower === "arp -d" || lower === "arp /d") {
    d.arp = [];
    return { lines: ["أُفرغ جدول ARP — إعادة التعلم عند أول حزمة (علاج التسميم)"] };
  }
  if (lower.startsWith("ping")) {
    const ipn = line.split(/\s+/)[1];
    if (!ipn) return { lines: ["% صيغة: ping <ip>"] };
    return { lines: [`Pinging ${ipn} with 32 bytes of data:`], action: { type: "ping", arg: ipn } };
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
