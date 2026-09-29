"use client";

// ─── NetSim: IDS sensor alerts panel ─────────────────────────────────────────
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, OctagonAlert, TriangleAlert, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/i18n";
import type { Device, IdsAlert } from "@/lib/netsim/types";

const SEV_STYLE: Record<IdsAlert["severity"], { border: string; text: string; bg: string; icon: React.ElementType; label: { ar: string; en: string } }> = {
  critical: { border: "border-red-500/50", text: "text-red-600", bg: "bg-red-500/10", icon: OctagonAlert, label: { ar: "حرج", en: "critical" } },
  warn: { border: "border-amber-500/50", text: "text-amber-600", bg: "bg-amber-500/10", icon: TriangleAlert, label: { ar: "تحذير", en: "warn" } },
  info: { border: "border-zinc-500/40", text: "text-zinc-600", bg: "bg-zinc-500/10", icon: Info, label: { ar: "معلومة", en: "info" } },
};

const KIND_LABEL: Record<IdsAlert["kind"], { ar: string; en: string }> = {
  "arp-spoof": { ar: "انتحال ARP", en: "ARP spoof" },
  "icmp-flood": { ar: "إغراق ICMP", en: "ICMP flood" },
  "syn-flood": { ar: "إغراق SYN", en: "SYN flood" },
  scan: { ar: "مسح منافذ", en: "Port scan" },
  "acl-deny": { ar: "رفض ACL", en: "ACL deny" },
  "port-security": { ar: "خرق أمن المنفذ", en: "Port-security violation" },
};

export default function IdsPanel({ device }: { device: Device }) {
  const { bi, lang } = useLang();
  const alerts = device.idsAlerts ?? [];
  const L = {
    title: { ar: "تنبيهات المستشعر", en: "Sensor alerts" },
    empty: { ar: "لا تنبيهات — شغّل حركة أو هجوماً ليراقب المستشعر", en: "No alerts — run traffic or an attack for the sensor to inspect" },
    emptyHint: { ar: "صِّل المستشعر بمسار الحركة (بين المبدّل والراوتر مثلاً)", en: "Place the sensor on the traffic path (e.g. between switch and router)" },
    total: { ar: "تنبيهاً", en: "alerts" },
  };

  return (
    <div className="space-y-2 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black inline-flex items-center gap-1"><Radar className="size-3.5" />{bi(L.title)}</span>
        <Badge variant="outline" className="text-[9px] font-mono">{alerts.length} {bi(L.total)}</Badge>
      </div>

      {alerts.length === 0 && (
        <div className="space-y-1 rounded-lg border border-dashed p-3 text-center">
          <div className="text-[10.5px] text-muted-foreground">{bi(L.empty)}</div>
          <div className="text-[9.5px] text-muted-foreground/80">{bi(L.emptyHint)}</div>
        </div>
      )}

      <div className="space-y-1.5">
        <AnimatePresence initial={false}>
          {alerts.map((a, i) => {
            const st = SEV_STYLE[a.severity] ?? SEV_STYLE.info;
            const k = KIND_LABEL[a.kind] ?? { ar: a.kind, en: a.kind };
            return (
              <motion.div
                key={`${a.id}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-lg border p-2 space-y-1 ${st.border} ${st.bg}`}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <st.icon className={`size-3.5 shrink-0 ${st.text}`} />
                  <span className={`text-[10px] font-black ${st.text}`}>{bi(st.label)}</span>
                  <span className="text-[10px] font-bold">{bi(k)}</span>
                  <span className="ms-auto text-[9px] font-mono text-muted-foreground" dir="ltr">{a.srcIp} → {a.dstIp}</span>
                </div>
                <div className="text-[9.5px] leading-snug text-muted-foreground" dir={lang === "ar" ? "rtl" : "ltr"}>
                  {bi(a.detail)}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
