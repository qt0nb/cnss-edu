// ─── NetSim mini IOS-like CLI interpreter (routers & switches) ─────────
import type { Device } from "./types";
import { findPort, hostIp, isValidIp, networkOf, prefixToMask, connectedRoutes, maskToPrefix, isHostKind } from "./engine";

export type CliMode = "exec" | "priv" | "conf" | "iface" | "vlan";

export interface CliState {
  mode: CliMode;
  iface: string; // current interface in config mode
  vlan: number; // current vlan in vlan mode
}

export const initialCliState: CliState = { mode: "exec", iface: "", vlan: 0 };

export interface CliAction {
  type: "ping" | "dhcp-renew" | "dns" | "http";
  arg: string;
}

export interface CliResult {
  lines: string[];
  state: CliState;
  action?: CliAction;
}

const OK = [""];
const isRouterLike = (d: Device) => d.kind === "router" || d.kind === "wirelessRouter" || d.kind === "switch" || d.kind === "hub";
const isSwitchLike = (d: Device) => d.kind === "switch" || d.kind === "hub";

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
  if (line === "") return { lines: [""], state: st };
  if (line === "?" || lower === "help") {
    lines.push("الأوامر المتاحة / Available commands:", "  enable, disable, configure terminal", "  interface <name> | vlan <n>", "  hostname <name>, ip route <net> <mask> <nh>", "  show ip interface brief | show arp", "  show mac address-table | show ip route", "  show running-config | show vlan | write", "  ping <ip>, exit, end");
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
      if (st.mode === "conf" && sub === "ip" && tokens[2] === "route") {
        const net = tokens[3];
        const mask = tokens[4];
        d.routes = d.routes.filter((r) => !(r.network === net && r.mask === mask && r.kind === "static"));
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
  if (s.startsWith("ip interface brief") || s === "ip int brief" || s.startsWith("ip int")) {
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
    out.push(d.ports.filter((p) => p.ip).map((p) => `interface ${p.name}\n ip address ${p.ip} ${p.mask}\n ${p.adminUp ? "no shutdown" : "shutdown"}`).join("\n"));
    out.push(d.routes.filter((r) => r.kind === "static").map((r) => `ip route ${r.network} ${r.mask} ${r.nextHop ?? r.iface}`).join("\n"));
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
    return { lines: ["أوامر متاحة: ipconfig, ipconfig /ip <ip> <mask>, ipconfig /gw <ip>, ipconfig /dns <ip>, ipconfig /dhcp, arp -a, ping <ip>, nslookup <name>, http <host>, cls"] };
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
