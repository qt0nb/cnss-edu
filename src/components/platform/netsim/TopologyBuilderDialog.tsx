"use client";

// ─── NetSim: AI Topology Builder dialog (POST /api/ai/topology-builder) ───────
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Wand2, CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import type { DeviceKind } from "@/lib/netsim/types";

// ── plan shape (matches the sanitized /api/ai/topology-builder response) ──
export interface TopoPlanDevice {
  kind: DeviceKind;
  label: string;
  x: number;
  y: number;
  ports: Record<string, [string, string]>;
  host: [string, string] | [string, string, string] | null;
  commands: string[];
}
export interface TopoPlan {
  name: { ar: string; en: string };
  goal: { ar: string; en: string };
  devices: TopoPlanDevice[];
  links: { a: number; b: number }[];
}

const EXAMPLES: { ar: string; en: string }[] = [
  { ar: "أنشئ 3 راوترات Cisco تربطها شبكة WAN", en: "Create 3 Cisco routers joined by a WAN" },
  { ar: "Create a DMZ with firewall and web server", en: "Create a DMZ with firewall and web server" },
  { ar: "شبكة مدرسة: 3 VLANs مع L3 switch", en: "School network: 3 VLANs with an L3 switch" },
  { ar: "شبكة منزلية: راوتر لاسلكي + حاسوبان + طابعة", en: "Home network: wireless router + 2 PCs + printer" },
  { ar: "هجوم DDoS على خادم ويب مع جدار ناري وIDS", en: "DDoS attack on a web server with firewall and IDS" },
  { ar: "Small office: 2 switches, WAN router, DHCP + DNS server", en: "Small office: 2 switches, WAN router, DHCP + DNS server" },
];

export default function TopologyBuilderDialog({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  /** replaces the current topology with the generated plan */
  onApply: (plan: TopoPlan) => void;
}) {
  const { lang, bi } = useLang();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | "parse_failed" | "unsupported" | "no_devices" | "network">(null);
  const [success, setSuccess] = useState<{ plan: TopoPlan; links: number } | null>(null);

  useEffect(() => {
    if (!open) {
      // keep prompt text; reset transient states on close
      setError(null);
      setSuccess(null);
      setLoading(false);
    }
  }, [open]);

  const L = {
    title: { ar: "بانِي الطوبولوجيا بالذكاء الاصطناعي", en: "AI Topology Builder" },
    desc: {
      ar: "صِف الشبكة التي تريدها بالعربية أو الإنجليزية — سيبنيها الذكاء الاصطناعي جهازاً جهازاً ويضبط عناوينها ومساراتها",
      en: "Describe the network you want — the AI will build it device by device, pre-configuring IPs and routes",
    },
    examples: { ar: "أمثلة سريعة", en: "Quick examples" },
    placeholder: { ar: "مثال: معمل من راوترين وشبكتين LAN مع مسارات ثابتة…", en: "e.g. Two routers, two LANs with static routes…" },
    generate: { ar: "توليد الطوبولوجيا", en: "Generate topology" },
    generating: { ar: "جارٍ التوليد…", en: "Generating…" },
    replaces: { ar: "سيستبدل المخطط الحالي بالكامل", en: "Replaces the current topology entirely" },
    parseErr: { ar: "لم يفهم النموذج الطلب — أعد الصياغة بوصف أوضح", en: "The model couldn't parse the request — try a clearer description" },
    unsupported: { ar: "الطلب خارج نطاق بناء الشبكات — صف طوبولوجيا شبكة", en: "Request is outside networking scope — describe a network topology" },
    noDevices: { ar: "لم يُنشئ النموذج أجهزة — أضف تفاصيل أكثر", en: "No devices generated — add more detail" },
    networkErr: { ar: "تعذر الوصول للخدمة — أعد المحاولة", en: "Service unreachable — try again" },
    retry: { ar: "أعد المحاولة / صياغة جديدة", en: "Retry / rephrase" },
    applied: { ar: "طُبِّق المخطط!", en: "Topology applied!" },
    devices: { ar: "جهازاً", en: "devices" },
    links: { ar: "وصلة", en: "links" },
    goal: { ar: "الهدف", en: "Goal" },
    close: { ar: "إغلاق", en: "Close" },
    another: { ar: "توليد آخر", en: "Generate another" },
  };

  const generate = async () => {
    const p = prompt.trim();
    if (!p || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/ai/topology-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: p, lang }),
      });
      const data = (await res.json()) as { plan?: TopoPlan; error?: string };
      if (!res.ok || !data.plan) {
        const err = data.error === "unsupported" ? "unsupported" : data.error === "no_devices" ? "no_devices" : data.error === "parse_failed" ? "parse_failed" : "network";
        setError(err);
        return;
      }
      const plan = data.plan;
      onApply(plan);
      setSuccess({ plan, links: plan.links.length });
      toast({
        title: `${bi(L.applied)} ${bi(plan.name)}`,
        description: `${plan.devices.length} ${bi(L.devices)} · ${plan.links.length} ${bi(L.links)}`,
      });
    } catch {
      setError("network");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-primary"><Sparkles className="size-4" /></span>
            {bi(L.title)}
          </DialogTitle>
          <DialogDescription className="text-xs">{bi(L.desc)}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <div className="rounded-xl border border-emerald-600/40 bg-emerald-500/10 p-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  <span className="text-xs font-black">{bi(L.applied)}</span>
                  <span className="ms-auto flex gap-1">
                    <Badge className="text-[9px] bg-emerald-600 hover:bg-emerald-600">{success.plan.devices.length} {bi(L.devices)}</Badge>
                    <Badge className="text-[9px] bg-emerald-600 hover:bg-emerald-600">{success.links} {bi(L.links)}</Badge>
                  </span>
                </div>
                <div className="text-xs font-black">{bi(success.plan.name)}</div>
                <div className="text-[10.5px] text-muted-foreground leading-relaxed">
                  <span className="font-bold">{bi(L.goal)}: </span>{bi(success.plan.goal)}
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground">
                {lang === "ar"
                  ? "جرّب ping بين جهازين للتحقق، أو اسأل المساعد الذكي إن لم يعمل شيء."
                  : "Test with a ping between two devices, or ask the AI assistant if something doesn't work."}
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={bi(L.placeholder)}
                rows={4}
                className="w-full min-h-24 rounded-lg border bg-transparent p-2.5 text-xs leading-relaxed"
                dir="auto"
                disabled={loading}
              />
              <div className="text-[10px] font-black text-muted-foreground">{bi(L.examples)}</div>
              <div className="flex flex-wrap gap-1.5">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(lang === "ar" ? ex.ar : ex.en)}
                    disabled={loading}
                    className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-bold text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                  >
                    {lang === "ar" ? ex.ar : ex.en}
                  </button>
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-2 text-[10.5px] text-amber-600">
                  <AlertTriangle className="size-3.5 shrink-0" />
                  <span className="flex-1">
                    {error === "parse_failed" ? bi(L.parseErr)
                      : error === "unsupported" ? bi(L.unsupported)
                      : error === "no_devices" ? bi(L.noDevices)
                      : bi(L.networkErr)}
                  </span>
                  <Button variant="outline" size="sm" className="h-6 gap-1 text-[10px] shrink-0" onClick={generate}>
                    <RotateCcw className="size-3" /> {bi(L.retry)}
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="items-center gap-2 sm:justify-between">
          <span className="text-[9.5px] text-muted-foreground truncate">{bi(L.replaces)}</span>
          <div className="flex gap-1.5">
            {success && (
              <Button variant="outline" size="sm" onClick={() => { setSuccess(null); }}>
                <Wand2 className="size-3.5" /> {bi(L.another)}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>{bi(L.close)}</Button>
            {!success && (
              <Button size="sm" onClick={generate} disabled={loading || !prompt.trim()} className="gap-1.5">
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                {loading ? bi(L.generating) : bi(L.generate)}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
