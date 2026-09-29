"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Binary, Hexagon, Hash } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { isValidIp, toBinary, ipToInt, intToIp } from "./SubnetCalculator";

export default function BinaryConverter() {
  const { lang } = useLang();
  const [ip, setIp] = useState("192.168.1.25");
  const [num, setNum] = useState("202");
  const [bin, setBin] = useState("11011010");

  const ipValid = isValidIp(ip);
  const numValid = /^-?\d+$/.test(num.trim());
  const numN = numValid ? parseInt(num, 10) : 0;
  const binValid = /^[01]{1,32}$/.test(bin.trim());

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Binary className="size-4 text-primary" />
          {lang === "ar" ? "محوّل الثنائي والعناوين" : "Binary & IP Converter"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ip" dir={lang === "ar" ? "rtl" : "ltr"}>
          <TabsList>
            <TabsTrigger value="ip" className="text-xs gap-1"><Hexagon className="size-3.5" />IP ↔ Binary</TabsTrigger>
            <TabsTrigger value="dec" className="text-xs gap-1"><Hash className="size-3.5" />Dec ↔ Bin ↔ Hex</TabsTrigger>
          </TabsList>

          <TabsContent value="ip" className="space-y-2 pt-2">
            <Input dir="ltr" value={ip} onChange={(e) => setIp(e.target.value)} className="font-mono text-xs h-9" placeholder="192.168.1.25" />
            {ipValid && (
              <div className="space-y-1.5 rounded-lg border p-3">
                <div className="text-[10px] text-muted-foreground">Binary</div>
                <div dir="ltr" className="font-mono text-xs font-bold text-primary break-all">{toBinary(ip)}</div>
                <div className="text-[10px] text-muted-foreground">Hex</div>
                <div dir="ltr" className="font-mono text-xs font-bold text-amber-500">
                  0x{ip.split(".").map((o) => (+o).toString(16).padStart(2, "0")).join(" ")}
                </div>
                <div className="text-[10px] text-muted-foreground">Integer</div>
                <div dir="ltr" className="font-mono text-xs font-bold">{ipToInt(ip).toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground">
                  {lang === "ar" ? "أجزاء الشبكة/المضيف (بناءً على الفئة التاريخية)" : "Network/host split (classful view)"}
                </div>
                <div dir="ltr" className="font-mono text-[10px]">
                  {(() => {
                    const o = +ip.split(".")[0];
                    const bits = o < 128 ? 8 : o < 192 ? 16 : 24;
                    const b = toBinary(ip).replace(/\./g, "");
                    return (
                      <>
                        <span className="text-primary">{b.slice(0, bits)}</span>
                        <span className="text-muted-foreground"> | </span>
                        <span className="text-amber-500">{b.slice(bits)}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="dec" className="space-y-2 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Input dir="ltr" value={num} onChange={(e) => setNum(e.target.value)} className="font-mono text-xs h-9" placeholder="202" />
                {numValid && (
                  <div className="rounded-lg border p-2.5 space-y-1 font-mono text-[11px]" dir="ltr">
                    <div><span className="text-muted-foreground">bin:</span> <b className="text-primary">{(numN >>> 0).toString(2)}</b></div>
                    <div><span className="text-muted-foreground">hex:</span> <b className="text-amber-500">0x{(numN >>> 0).toString(16).toUpperCase()}</b></div>
                    <div><span className="text-muted-foreground">oct:</span> <b>0o{(numN >>> 0).toString(8)}</b></div>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Input dir="ltr" value={bin} onChange={(e) => setBin(e.target.value)} className="font-mono text-xs h-9" placeholder="11011010" />
                {binValid && (
                  <div className="rounded-lg border p-2.5 space-y-1 font-mono text-[11px]" dir="ltr">
                    <div><span className="text-muted-foreground">dec:</span> <b className="text-primary">{parseInt(bin, 2)}</b></div>
                    <div><span className="text-muted-foreground">hex:</span> <b className="text-amber-500">0x{parseInt(bin, 2).toString(16).toUpperCase()}</b></div>
                    <Button size="sm" variant="outline" className="h-6 text-[10px] w-full mt-1" onClick={() => setNum(String(parseInt(bin, 2)))}>
                      {lang === "ar" ? "أرسله للمحوّل العشري" : "Send to decimal box"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {binValid && (
              <div dir="ltr" className="rounded-lg border bg-muted/40 p-2 font-mono text-[10px] overflow-x-auto">
                {bin.padStart(8, "0").split("").map((b, i) => (
                  <span key={i} className={b === "1" ? "text-primary font-bold" : "text-muted-foreground"}>
                    {b}<sub className="text-[7px] me-0.5">{7 - (i % 8)}</sub>
                  </span>
                ))}
                <span className="ms-2 text-foreground">= {parseInt(bin, 2)}</span>
              </div>
            )}
            <div className="text-[10px] text-muted-foreground">
              {lang === "ar" ? "تلميح: أوزان البتات من اليسار: 128 64 32 16 8 4 2 1" : "Tip: bit weights from left: 128 64 32 16 8 4 2 1"}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
