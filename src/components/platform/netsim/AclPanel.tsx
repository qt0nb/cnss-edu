"use client";

// ─── NetSim: ACL rule editor for firewall / L3 switch devices ────────────────
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Trash2, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import type { AclRule, Device } from "@/lib/netsim/types";
import { isValidIp } from "@/lib/netsim/engine";

type Proto = AclRule["proto"];
type Action = AclRule["action"];

const PROTOS: Proto[] = ["any", "icmp", "tcp", "udp"];

export default function AclPanel({
  device,
  onChange,
}: {
  device: Device;
  onChange: () => void;
}) {
  const { lang, bi } = useLang();
  const [action, setAction] = useState<Action>("deny");
  const [proto, setProto] = useState<Proto>("tcp");
  const [src, setSrc] = useState("any");
  const [dst, setDst] = useState("any");
  const [port, setPort] = useState("");

  const L = {
    title: { ar: "قواعد جدار الحماية (ACL)", en: "Firewall ACL rules" },
    defaultPolicy: { ar: "السياسة الافتراضية", en: "Default policy" },
    denyAll: { ar: "رفض ما لم تسمح به قاعدة (deny-all)", en: "Deny unless a rule permits (deny-all)" },
    permitAll: { ar: "السماح بكل شيء (permit-all)", en: "Permit everything (permit-all)" },
    rule: { ar: "قاعدة", en: "Rule" },
    add: { ar: "إضافة قاعدة", en: "Add rule" },
    empty: { ar: "لا قواعد — كل الحركة تتبع السياسة الافتراضية", en: "No rules — all traffic follows the default policy" },
    hits: { ar: "مطابقة", en: "hits" },
    src: { ar: "المصدر", en: "Source" },
    dst: { ar: "الوجهة", en: "Destination" },
    port: { ar: "المنفذ (اختياري)", en: "Port (optional)" },
    invalid: { ar: "عنوان غير صالح — استخدم IP أو any", en: "Invalid address — use an IP or any" },
    invalidPort: { ar: "المنفذ 1-65535", en: "Port must be 1-65535" },
    added: { ar: "أُضيفت القاعدة", en: "Rule added" },
    deleted: { ar: "حُذفت القاعدة", en: "Rule deleted" },
    policyHint: { ar: "يُطبَّق أول تطابق من الأعلى للأسفل", en: "First match wins — evaluated top to bottom" },
    protoNeedsPort: { ar: "المنفذ مع tcp/udp فقط", en: "Port applies to tcp/udp only" },
  };

  const rules = device.acls ?? [];
  const nextId = rules.reduce((m, r) => Math.max(m, r.id), 0) + 1;

  const addRule = () => {
    const s = src.trim() || "any";
    const d = dst.trim() || "any";
    if (s !== "any" && !isValidIp(s)) return toast({ title: bi(L.invalid), variant: "destructive" });
    if (d !== "any" && !isValidIp(d)) return toast({ title: bi(L.invalid), variant: "destructive" });
    const pPort = port.trim() ? parseInt(port.trim(), 10) : null;
    if (pPort !== null && (!Number.isFinite(pPort) || pPort < 1 || pPort > 65535)) {
      return toast({ title: bi(L.invalidPort), variant: "destructive" });
    }
    const effProto: Proto = pPort !== null && proto !== "tcp" && proto !== "udp" ? "tcp" : proto;
    const rule: AclRule = {
      id: nextId,
      action,
      src: s,
      srcMask: "any",
      dst: d,
      dstMask: "any",
      proto: effProto,
      port: pPort,
      hits: 0,
    };
    device.acls = [...rules, rule];
    setPort("");
    onChange();
    toast({ title: `${bi(L.added)} #${nextId}` });
  };

  const delRule = (id: number) => {
    device.acls = rules.filter((r) => r.id !== id);
    onChange();
    toast({ title: `${bi(L.deleted)} #${id}` });
  };

  return (
    <div className="space-y-3 p-3">
      {/* default policy */}
      <div className="flex items-center justify-between rounded-lg border p-2.5">
        <div className="space-y-0.5">
          <div className="text-[11px] font-black inline-flex items-center gap-1"><ShieldCheck className="size-3.5" />{bi(L.title)}</div>
          <div className="text-[9.5px] text-muted-foreground">
            {device.defaultDeny ? bi(L.denyAll) : bi(L.permitAll)}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-muted-foreground" dir="ltr">
            {device.defaultDeny ? "deny-all" : "permit-all"}
          </span>
          <Switch
            checked={device.defaultDeny}
            onCheckedChange={(v) => { device.defaultDeny = v; onChange(); }}
          />
        </div>
      </div>

      {/* rules list */}
      <div className="space-y-1">
        <div className="text-[10px] text-muted-foreground">{bi(L.policyHint)}</div>
        {rules.length === 0 && (
          <div className="rounded-lg border border-dashed p-3 text-center text-[10.5px] text-muted-foreground">{bi(L.empty)}</div>
        )}
        <AnimatePresence initial={false}>
          {rules.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: lang === "ar" ? 12 : -12 }}
              className="flex items-center gap-1.5 rounded-lg border bg-card px-2 py-1.5"
            >
              <Badge className={`text-[9px] shrink-0 ${r.action === "deny" ? "bg-red-600 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-600"}`}>
                {r.action}
              </Badge>
              <span className="text-[9px] font-mono font-bold text-muted-foreground shrink-0" dir="ltr">{r.proto}</span>
              <span className="text-[10px] font-mono truncate flex items-center gap-0.5 min-w-0" dir="ltr" title={`${r.src} → ${r.dst}${r.port ? ":" + r.port : ""}`}>
                <span className="truncate">{r.src}</span>
                <ArrowRight className="size-3 shrink-0 rotate-0 rtl:rotate-180" />
                <span className="truncate">{r.dst}{r.port ? `:${r.port}` : ""}</span>
              </span>
              <span className="ms-auto text-[9px] text-muted-foreground font-mono shrink-0" dir="ltr">{r.hits} {bi(L.hits)}</span>
              <Button variant="ghost" size="icon" className="size-6 shrink-0 hover:text-destructive" onClick={() => delRule(r.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* add-rule form */}
      <div className="space-y-1.5 rounded-lg border p-2.5 bg-muted/30">
        <div className="text-[11px] font-black">{bi(L.add)}</div>
        <div className="grid grid-cols-2 gap-1.5">
          <label className="space-y-0.5">
            <span className="text-[9.5px] text-muted-foreground">{bi(L.rule)}</span>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as Action)}
              className="h-8 w-full rounded-md border bg-background px-2 text-[11px] font-bold"
              dir="ltr"
            >
              <option value="deny">deny</option>
              <option value="permit">permit</option>
            </select>
          </label>
          <label className="space-y-0.5">
            <span className="text-[9.5px] text-muted-foreground">proto</span>
            <select
              value={proto}
              onChange={(e) => setProto(e.target.value as Proto)}
              className="h-8 w-full rounded-md border bg-background px-2 text-[11px] font-bold"
              dir="ltr"
            >
              {PROTOS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <label className="space-y-0.5">
            <span className="text-[9.5px] text-muted-foreground">{bi(L.src)}</span>
            <Input dir="ltr" value={src} onChange={(e) => setSrc(e.target.value)} placeholder="any" className="h-8 text-xs font-mono" />
          </label>
          <label className="space-y-0.5">
            <span className="text-[9.5px] text-muted-foreground">{bi(L.dst)}</span>
            <Input dir="ltr" value={dst} onChange={(e) => setDst(e.target.value)} placeholder="any" className="h-8 text-xs font-mono" />
          </label>
        </div>
        <label className="block space-y-0.5">
          <span className="text-[9.5px] text-muted-foreground">{bi(L.port)}</span>
          <Input dir="ltr" value={port} onChange={(e) => setPort(e.target.value)} placeholder="80" className="h-8 text-xs font-mono" inputMode="numeric" />
        </label>
        <Button size="sm" className="h-8 w-full gap-1.5 text-xs" onClick={addRule}>
          <Plus className="size-3.5" /> {bi(L.add)}
        </Button>
      </div>
    </div>
  );
}
