"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Gauge } from "lucide-react";
import { useLang } from "@/lib/i18n";

const UNITS = [
  { id: "kb", label: { ar: "كيلوبايت KB", en: "KB" }, bytes: 1024 },
  { id: "mb", label: { ar: "ميغابايت MB", en: "MB" }, bytes: 1024 ** 2 },
  { id: "gb", label: { ar: "غيغابايت GB", en: "GB" }, bytes: 1024 ** 3 },
  { id: "tb", label: { ar: "تيرابايت TB", en: "TB" }, bytes: 1024 ** 4 },
];

const SPEEDS = [
  { mbps: 1, label: "1 Mbps" },
  { mbps: 10, label: "10 Mbps" },
  { mbps: 25, label: "25 Mbps" },
  { mbps: 50, label: "50 Mbps" },
  { mbps: 100, label: "100 Mbps" },
  { mbps: 250, label: "250 Mbps" },
  { mbps: 500, label: "500 Mbps" },
  { mbps: 1000, label: "1 Gbps" },
];

function fmtTime(seconds: number): { ar: string; en: string } {
  if (!isFinite(seconds)) return { ar: "∞", en: "∞" };
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  const t = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : m > 0 ? `${m}:${pad(s)}` : `${s}s`;
  return { ar: t, en: t };
}

export default function BandwidthCalculator() {
  const { lang } = useLang();
  const [size, setSize] = useState("8");
  const [unit, setUnit] = useState("gb");
  const [mbps, setMbps] = useState(100);
  const [overhead, setOverhead] = useState(true);

  const result = useMemo(() => {
    const n = parseFloat(size);
    if (isNaN(n) || n <= 0) return null;
    const u = UNITS.find((x) => x.id === unit)!;
    const bytes = n * u.bytes;
    const bits = bytes * 8;
    const effectiveMbps = overhead ? mbps * 0.93 : mbps; // TCP/IP overhead ~7%
    const seconds = bits / (effectiveMbps * 1e6);
    return { seconds, bytes, bits };
  }, [size, unit, mbps, overhead]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Gauge className="size-4 text-primary" />
          {lang === "ar" ? "حاسبة زمن التنزيل والنطاق" : "Bandwidth & Download Time"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
          <div className="space-y-1">
            <Label className="text-[11px]">{lang === "ar" ? "حجم الملف" : "File size"}</Label>
            <Input dir="ltr" value={size} onChange={(e) => setSize(e.target.value)} className="font-mono text-xs h-9" />
          </div>
          <div className="flex rounded-lg border overflow-hidden h-9">
            {UNITS.map((u) => (
              <button
                key={u.id}
                onClick={() => setUnit(u.id)}
                className={`px-2 text-[10px] font-black ${unit === u.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
              >
                {u.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[11px]">{lang === "ar" ? "سرعة الاتصال" : "Link speed"}</Label>
          <div className="flex flex-wrap gap-1">
            {SPEEDS.map((s) => (
              <button
                key={s.mbps}
                onClick={() => setMbps(s.mbps)}
                className={`rounded-md px-2 py-1 text-[10px] font-black ${mbps === s.mbps ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <Slider value={[mbps]} min={1} max={1000} step={1} onValueChange={(v) => setMbps(v[0])} />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold">{mbps} Mbps</span>
            <div className="flex items-center gap-1.5">
              <Switch checked={overhead} onCheckedChange={setOverhead} className="scale-90" />
              <span className="text-[10px] text-muted-foreground">{lang === "ar" ? "حساب الحِمل الإضافي (7%)" : "Count overhead (7%)"}</span>
            </div>
          </div>
        </div>

        {result && (
          <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
            <div className="text-[11px] text-muted-foreground">{lang === "ar" ? "الوقت المتوقع للتنزيل" : "Estimated transfer time"}</div>
            <div dir="ltr" className="text-3xl font-black text-primary font-mono text-center py-1">
              {fmtTime(result.seconds)[lang === "ar" ? "ar" : "en"]}
            </div>
            <div className="text-[10px] text-muted-foreground text-center" dir="ltr">
              {result.bytes.toLocaleString()} bytes ≈ {(result.bits / 1e9).toFixed(2)} gigabits
            </div>
            <div className="text-[10px] text-muted-foreground text-center">
              {lang === "ar"
                ? "تذكّر: النطاق (Bandwidth) سعة نظرية، والإنتاجية (Throughput) الفعلية أقل بسبب الحمل والازدحام."
                : "Remember: bandwidth is theoretical capacity; actual throughput is lower due to overhead & congestion."}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
