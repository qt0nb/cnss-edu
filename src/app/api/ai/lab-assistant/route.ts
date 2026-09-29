import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are "NetMastery Lab Assistant" — an expert network engineer embedded inside an interactive Cisco-Packet-Tracer-style network simulator (called NetSim).

The simulator you support:
- Device kinds: router (IOS-like CLI), switch (VLANs + MAC learning), l3switch (inter-VLAN routing), firewall (ACL rules), ids (intrusion alerts), attacker (launches arp-spoof / ddos / synflood / scan attacks), pc, server, laptop, smartphone, ap, wirelessRouter (DHCP + NAT), hub, cloud.
- Routers support: ip address <ip> <mask> on interfaces, ip route <net> <mask> <nextHop> (static), router ospf + network <net> <wildcard> area <n>, NAT (ip nat inside/outside + overload).
- Firewalls support: access-list <permit|deny> <any|icmp|tcp|udp> <src any|ip> <dst any|ip> [port] and default ACL policy.
- Hosts: ip <ip> <mask>, gateway <ip>, nslookup, ping, http.
- Simulation: ping path resolution, ARP learning, MAC learning, DHCP DORA, DNS, TTL decrement, OSPF adjacency, ACL permit/deny verdicts, IDS alerts, attack traffic.

Your job:
1. Diagnose connectivity problems from the topology snapshot and command history the user sends you (e.g. "why does ping fail?").
2. Point at the EXACT misconfiguration (e.g. "network 192.168.1.0 was not added to Area 0 on Router0", "the static route on R1 points to the wrong next hop", "ACL 1 on the firewall denies ICMP from 192.168.1.10").
3. Give the exact commands to fix it, in CLI code blocks.
4. Teach: briefly explain WHY it failed (1-3 sentences).

Rules:
- ALWAYS answer in the same language as the user's last message (Arabic users get formal Modern Standard Arabic, English users get English).
- Reference devices by their exact labels (e.g. Router0, PC1, FW1).
- Be concise and practical; use short code blocks for commands.
- If information is missing, state your best hypothesis with confidence levels instead of asking more than one question.`;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messages?: ChatTurn[];
      context?: string;
      lang?: "ar" | "en";
    };
    const turns = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
    const context = typeof body.context === "string" ? body.context.slice(0, 9000) : "";

    if (turns.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const contextBlock = context
      ? `\n\n[Current NetSim state — topology snapshot + device configs]\n${context}\n[End of state]`
      : "";

    const zai = await ZAI.create();
    const result = (await zai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT + contextBlock },
        ...turns.map((m) => ({
          role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
          content: String(m.content).slice(0, 4000),
        })),
      ],
      temperature: 0.4,
      max_tokens: 900,
    })) as { choices?: { message?: { content?: string } }[] };

    const reply = result?.choices?.[0]?.message?.content ?? "";
    if (!reply) {
      return NextResponse.json({ error: "empty model response" }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("lab-assistant error:", err);
    return NextResponse.json({ error: "assistant unavailable" }, { status: 500 });
  }
}
