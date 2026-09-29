import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_KINDS = [
  "router",
  "l3switch",
  "switch",
  "firewall",
  "ids",
  "attacker",
  "pc",
  "server",
  "laptop",
  "smartphone",
  "ap",
  "wirelessRouter",
  "hub",
  "cloud",
  "printer",
  "ipPhone",
  "nas",
  "camera",
  "tv",
  "thermostat",
  "iotSensor",
  "modem",
] as const;

type Kind = (typeof VALID_KINDS)[number];

const PORT_HINTS: Record<Kind, string> = {
  router: "g0/0, g0/1, g0/2, s0/0/0, s0/0/1",
  l3switch: "fa0/1..fa0/24, g0/1, g0/2, vlan10, vlan20, vlan30",
  switch: "fa0/1..fa0/24, g0/1, g0/2",
  firewall: "g0/0 (outside), g0/1 (inside), g0/2 (DMZ)",
  ids: "g0/0..g0/3",
  attacker: "eth0",
  pc: "fa0",
  server: "fa0",
  laptop: "fa0, radio0",
  smartphone: "radio0",
  ap: "g0/1, radio0..radio7",
  wirelessRouter: "g0/0 (WAN), fa0/1..fa0/4, radio0..radio7",
  hub: "fa0/1..fa0/8",
  cloud: "g0/0..g0/5",
  printer: "fa0",
  ipPhone: "fa0",
  nas: "fa0",
  camera: "fa0",
  tv: "fa0, radio0",
  thermostat: "radio0",
  iotSensor: "radio0, fa0",
  modem: "line0 (DSL WAN), fa0/1..fa0/4",
};

const SYSTEM_PROMPT = `You are the "AI Topology Builder" for NetSim, a Cisco-Packet-Tracer-style browser simulator. Convert the user's natural-language description into a ready-to-run network topology.

Output ONLY a single valid JSON object (no markdown fences, no commentary) with this exact schema:
{
  "name": { "ar": "<scenario name Arabic>", "en": "<scenario name English>" },
  "goal": { "ar": "<what to explore, Arabic>", "en": "<English>" },
  "devices": [
    {
      "kind": "<one of: router, l3switch, switch, firewall, ids, attacker, pc, server, laptop, smartphone, ap, wirelessRouter, hub, cloud, printer, ipPhone, nas, camera, tv, thermostat, iotSensor, modem>",
      "label": "<short label like R1, SW1, FW1, PC0, WebSrv>",
      "x": <number 60..840>,
      "y": <number 60..460>,
      "ports": { "<portId>": ["<ip>", "<mask>"] },
      "host": ["<ip>", "<mask>", "<gatewayIp>"],
      "commands": ["<IOS-like config line>", "..."]
    }
  ],
  "links": [ { "a": <device index>, "b": <device index> } ]
}

Field rules:
- "ports": only for router/l3switch/firewall/switch uplinks — map VALID port ids to [ip, mask]. Port ids by kind: router: g0/0, g0/1, g0/2, s0/0/0, s0/0/1 | l3switch: fa0/1.., g0/1, g0/2, vlan10, vlan20, vlan30 (SVIs get ip + mask) | switch: fa0/1.., g0/1, g0/2 | firewall: g0/0 (outside), g0/1 (inside), g0/2 (DMZ) | ids: g0/0..g0/3 | attacker: eth0.
- "host": only for pc/server/laptop/smartphone and the smart-device kinds (printer, ipPhone, nas, camera, tv, thermostat, iotSensor) — [ip, mask, defaultGateway]. wirelessRouter hosts behind it may omit gateway. modem is an L2 bridge like a switch (no "host" field).
- "commands": optional IOS-like lines applied after boot. Router/L3: "ip route <net> <mask> <nextHop>", "router ospf <id>" + "network <net> <wildcard> area <n>", "ip nat inside|outside", "access-list ...". Firewall: "access-list <permit|deny> <any|icmp|tcp|udp> <src any|ip> <dst any|ip> [port]". Switch: "vlan <n>" + "name <x>", "switchport access vlan <n>". Host: "ip <ip> <mask>", "gateway <ip>", "nslookup <name>", "ping <ip>".
- "links": endpoints reference device array indices (0-based). Switches connect end-devices; routers connect to switches/uplinks; firewall g0/0 outside / g0/1 inside; attacker links to a switch near its target.
- Keep plans consistent: every subnet appears on exactly 2+ interfaces in the same network; static routes or OSPF make distant subnets reachable; gateways match the connected router/firewall interface IP.
- Use classic private ranges (192.168.x.0/24, 10.x.x.0/24, 172.16.x.0/24). Max 12 devices, max 18 links. Spread x/y to avoid overlaps (canvas 2400x1400, keep x 60..840 and y 60..460 so the initial view fits).

If the request is unrelated to network topologies, return { "error": "unsupported" }.`;

interface RawDevice {
  kind?: unknown;
  label?: unknown;
  x?: unknown;
  y?: unknown;
  ports?: unknown;
  host?: unknown;
  commands?: unknown;
}
interface RawPlan {
  name?: unknown;
  goal?: unknown;
  devices?: unknown;
  links?: unknown;
  error?: unknown;
}

function bi(v: unknown, fallbackAr: string, fallbackEn: string): { ar: string; en: string } {
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    const ar = typeof o.ar === "string" ? o.ar.slice(0, 120) : fallbackAr;
    const en = typeof o.en === "string" ? o.en.slice(0, 120) : fallbackEn;
    return { ar, en };
  }
  return { ar: fallbackAr, en: fallbackEn };
}

function num(v: unknown, lo: number, hi: number, dflt: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? v : dflt;
  return Math.min(hi, Math.max(lo, Math.round(n)));
}

const IPV4 = /^(\d{1,3}\.){3}\d{1,3}$/;
const cleanIp = (v: unknown): string | null => {
  const s = typeof v === "string" ? v.trim() : "";
  return IPV4.test(s) ? s : null;
};

function sanitizePlan(raw: RawPlan) {
  if (raw.error) return { error: "unsupported" as const };
  const rawDevices = Array.isArray(raw.devices) ? (raw.devices as RawDevice[]) : [];
  const devices = rawDevices.slice(0, 12).map((d, i) => {
    const kind = VALID_KINDS.includes(d.kind as Kind) ? (d.kind as Kind) : "router";
    const ports: Record<string, [string, string]> = {};
    if (d.ports && typeof d.ports === "object") {
      for (const [pid, val] of Object.entries(d.ports as Record<string, unknown>)) {
        if (Array.isArray(val)) {
          const ip = cleanIp(val[0]);
          const mask = cleanIp(val[1]) ?? "255.255.255.0";
          if (ip) ports[pid.slice(0, 12)] = [ip, mask];
        }
      }
    }
    const host: [string, string] | [string, string, string] | null = Array.isArray(d.host)
      ? (() => {
          const ip = cleanIp(d.host[0]);
          const mask = cleanIp(d.host[1]) ?? "255.255.255.0";
          const gw = cleanIp(d.host[2]);
          if (!ip) return null;
          return gw ? ([ip, mask, gw] as const) : ([ip, mask] as const);
        })()
      : null;
    const commands = Array.isArray(d.commands)
      ? (d.commands as unknown[]).filter((c): c is string => typeof c === "string").slice(0, 30).map((c) => c.slice(0, 160))
      : [];
    return {
      kind,
      label: typeof d.label === "string" && d.label.trim() ? d.label.trim().slice(0, 14) : `${kind}${i}`,
      x: num(d.x, 60, 840, 120 + (i % 4) * 180),
      y: num(d.y, 60, 460, 120 + Math.floor(i / 4) * 150),
      ports,
      host,
      commands,
    };
  });
  const links = (Array.isArray(raw.links) ? (raw.links as { a?: unknown; b?: unknown }[]) : [])
    .slice(0, 18)
    .map((l) => ({ a: num(l.a, 0, devices.length - 1, 0), b: num(l.b, 0, devices.length - 1, 1) }))
    .filter((l) => l.a !== l.b)
    .filter((l, idx, arr) => {
      const key = (x: number, y: number) => (x < y ? `${x}-${y}` : `${y}-${x}`);
      const k = key(l.a, l.b);
      return arr.findIndex((o) => key(o.a, o.b) === k) === idx;
    });
  return {
    name: bi(raw.name, "طوبولوجيا الذكاء الاصطناعي", "AI topology"),
    goal: bi(raw.goal, "استكشف السيناريو المُنشأ", "Explore the generated scenario"),
    devices,
    links,
  };
}

function extractJson(text: string): RawPlan | null {
  const trimmed = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/,"").trim();
  try {
    return JSON.parse(trimmed) as RawPlan;
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1)) as RawPlan;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { prompt?: string; lang?: "ar" | "en" };
    const prompt = typeof body.prompt === "string" ? body.prompt.trim().slice(0, 1200) : "";
    if (!prompt) {
      return NextResponse.json({ error: "prompt required" }, { status: 400 });
    }

    const lang = body.lang === "en" ? "en" : "ar";
    const zai = await ZAI.create();
    const result = (await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `${prompt}\n\n(Remember: respond with JSON only. Write "name" and "goal" values in both Arabic and English. Interface port hints: ${Object.entries(PORT_HINTS)
            .slice(0, 6)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | ")})`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1600,
    })) as { choices?: { message?: { content?: string } }[] };

    const text = result?.choices?.[0]?.message?.content ?? "";
    const plan = extractJson(text);
    if (!plan || plan.error) {
      return NextResponse.json(
        { error: "parse_failed", reply: plan?.error ? "unsupported" : text.slice(0, 300) },
        { status: 422 },
      );
    }
    const clean = sanitizePlan(plan);
    if ("error" in clean) {
      return NextResponse.json({ error: "unsupported" }, { status: 422 });
    }
    if (clean.devices.length === 0) {
      return NextResponse.json({ error: "no_devices" }, { status: 422 });
    }
    return NextResponse.json({ plan: clean, lang });
  } catch (err) {
    console.error("topology-builder error:", err);
    return NextResponse.json({ error: "builder unavailable" }, { status: 500 });
  }
}
