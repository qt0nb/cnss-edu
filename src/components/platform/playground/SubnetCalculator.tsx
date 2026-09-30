"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, ArrowLeftRight, CheckCircle2, XCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";

export const ipToInt = (ip: string): number =>
  ip.split(".").reduce((s, o) => (s << 8) + (parseInt(o, 10) || 0), 0) >>> 0;
export const intToIp = (n: number): string =>
  [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
export const toBinary = (ip: string): string =>
  ip.split(".").map((o) => (+o).toString(2).padStart(8, "0")).join(".");
export const isValidIp = (ip: string): boolean =>
  /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").every((o) => +o >= 0 && +o <= 255);

function Row({ k, v, mono = true }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <span className="text-[11px] text-muted-foreground">{k}</span>
      <span className={`text-xs font-bold ${mono ? "font-mono" : ""} text-end`}>{v}</span>
    </div>
  );
}

export default function SubnetCalculator() {
  const { lang } = useLang();
  const [ip, setIp] = useState("192.168.10.77");
  const [cidr, setCidr] = useState(26);
  const [ip2, setIp2] = useState("192.168.10.100");

  const result = useMemo(() => {
    if (!isValidIp(ip)) return null;
    const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const ipInt = ipToInt(ip);
    const net = (ipInt & maskInt) >>> 0;
    const broad = (net | (~maskInt >>> 0)) >>> 0;
    const total = Math.pow(2, 32 - cidr);
    const usable = cidr >= 31 ? total : total - 2;
    const first = cidr >= 31 ? intToIp(net) : intToIp(net + 1);
    const last = cidr >= 31 ? intToIp(broad) : intToIp(broad - 1);
    const wildcard = intToIp(~maskInt >>> 0);
    const o1 = ipInt >>> 24;
    const cls = o1 < 128 ? "A" : o1 < 192 ? "B" : o1 < 224 ? "C" : o1 < 240 ? "D (Multicast)" : "E (تجريبي)";
    const priv =
      o1 === 10 ||
      (o1 === 172 && (ipInt >>> 16 & 255) >= 16 && (ipInt >>> 16 & 255) <= 31) ||
      (o1 === 192 && (ipInt >>> 16 & 255) === 168) ||
      (o1 === 169 && (ipInt >>> 16 & 255) === 254) ||
      o1 === 127;
    const mask = intToIp(maskInt);
    const same = isValidIp(ip2) ? ((ipToInt(ip2) & maskInt) >>> 0) === net : null;
    return { mask, net: intToIp(net), broad: intToIp(broad), total, usable, first, last, wildcard, cls, priv, maskBin: toBinary(mask), ipBin: toBinary(ip), same };
  }, [ip, cidr, ip2]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Calculator className="size-4 text-primary" />
          {lang === "ar" ? "حاسبة الشبكات الفرعية IPv4" : "IPv4 Subnet Calculator"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-[1fr_90px] gap-2">
          <div className="space-y-1">
            <Label className="text-[11px]">{lang === "ar" ? "عنوان IP" : "IP address"}</Label>
            <Input
              dir="ltr"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="font-mono text-xs h-9"
              onBlur={() => !isValidIp(ip) && toast({ title: lang === "ar" ? "عنوان غير صالح" : "Invalid IP", variant: "destructive" })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[11px]">/CIDR</Label>
            <Input
              dir="ltr"
              type="number"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Math.min(32, Math.max(0, +e.target.value)))}
              className="font-mono text-xs h-9"
            />
          </div>
        </div>

        {result && (
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border p-2.5">
              <Row k={lang === "ar" ? "القناع" : "Subnet mask"} v={result.mask} />
              <Row k={lang === "ar" ? "عنوان الشبكة" : "Network address"} v={result.net} />
              <Row k={lang === "ar" ? "البث" : "Broadcast"} v={result.broad} />
              <Row k={lang === "ar" ? "أول مضيف" : "First host"} v={result.first} />
              <Row k={lang === "ar" ? "آخر مضيف" : "Last host"} v={result.last} />
              <Row k={lang === "ar" ? "العدد الكلي" : "Total addresses"} v={result.total.toLocaleString()} />
              <Row k={lang === "ar" ? "المضيفون المتاحون" : "Usable hosts"} v={result.usable.toLocaleString()} />
            </div>
            <div className="rounded-lg border p-2.5">
              <Row k={lang === "ar" ? "القناع البدلي" : "Wildcard mask"} v={result.wildcard} />
              <Row k={lang === "ar" ? "الفئة" : "Class"} v={result.cls} mono={false} />
              <Row
                k={lang === "ar" ? "النطاق" : "Scope"}
                v={result.priv ? (lang === "ar" ? "خاص (RFC1918)" : "Private (RFC1918)") : lang === "ar" ? "عام" : "Public"}
                mono={false}
              />
              <Separator className="my-1.5" />
              <div className="text-[10px] text-muted-foreground mb-1">{lang === "ar" ? "عنوان IP بالثنائي" : "IP in binary"}</div>
              <div dir="ltr" className="font-mono text-[10px] font-bold break-all text-primary">{result.ipBin}</div>
              <div className="text-[10px] text-muted-foreground mb-1 mt-1.5">{lang === "ar" ? "القناع بالثنائي" : "Mask in binary"}</div>
              <div dir="ltr" className="font-mono text-[10px] font-bold break-all text-amber-500">{result.maskBin}</div>
            </div>
          </div>
        )}

        <Separator />
        <div className="space-y-2">
          <Label className="text-[11px] font-bold">
            <ArrowLeftRight className="size-3.5 inline me-1" />
            {lang === "ar" ? "هل هذان العنوانان في الشبكة نفسها؟" : "Are these two IPs in the same subnet?"}
          </Label>
          <div className="flex items-center gap-2">
            <Input dir="ltr" value={ip2} onChange={(e) => setIp2(e.target.value)} className="font-mono text-xs h-9" />
            {result?.same !== null && result?.same !== undefined && (
              <Badge variant={result.same ? "default" : "destructive"} className="gap-1 shrink-0">
                {result.same ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                {result.same ? (lang === "ar" ? "نفس الشبكة" : "Same subnet") : lang === "ar" ? "مختلفة" : "Different"}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
