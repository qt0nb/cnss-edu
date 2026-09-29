"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radar } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PORTS } from "@/data/ports";

export default function PortLookup() {
  const { lang, bi } = useLang();
  const [q, setQ] = useState("");
  const [proto, setProto] = useState<"all" | "tcp" | "udp">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PORTS.filter((p) => {
      if (proto !== "all" && p.proto !== proto && p.proto !== "both") return false;
      if (!needle) return true;
      return (
        String(p.port).includes(needle) ||
        p.service.toLowerCase().includes(needle) ||
        p.desc.ar.includes(needle) ||
        p.desc.en.toLowerCase().includes(needle)
      );
    }).sort((a, b) => a.port - b.port);
  }, [q, proto]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Radar className="size-4 text-primary" />
          {lang === "ar" ? "قاعدة منافذ TCP/UDP" : "TCP/UDP Port Knowledge Base"}
          <Badge variant="secondary" className="ms-auto text-[10px]">{PORTS.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "ar" ? "ابحث: 443 أو dns أو بريد..." : "Search: 443 or dns or mail..."}
            className="text-xs h-9"
          />
          <div className="flex rounded-lg border overflow-hidden shrink-0">
            {(["all", "tcp", "udp"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setProto(p)}
                className={`px-2.5 text-[10px] font-black ${proto === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <ScrollArea className="h-80 rounded-lg border">
          <table className="w-full text-[11px]">
            <thead className="bg-muted/70 sticky top-0 z-10">
              <tr>
                <th className="p-1.5 text-start font-black w-14">Port</th>
                <th className="p-1.5 text-start font-black w-12">Proto</th>
                <th className="p-1.5 text-start font-black">Service</th>
                <th className="p-1.5 text-start font-bold hidden sm:table-cell">{lang === "ar" ? "الوصف" : "Description"}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={`${p.port}-${p.proto}-${i}`} className="border-t hover:bg-accent/40">
                  <td className="p-1.5 font-mono font-bold text-primary">{p.port}</td>
                  <td className="p-1.5">
                    <span className={`rounded px-1 text-[9px] font-black text-white ${p.proto === "tcp" ? "bg-teal-600" : p.proto === "udp" ? "bg-amber-600" : "bg-zinc-600"}`}>
                      {p.proto.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-1.5 font-mono font-semibold">{p.service}</td>
                  <td className="p-1.5 text-muted-foreground hidden sm:table-cell">{bi(p.desc)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-xs text-muted-foreground">{lang === "ar" ? "لا نتائج" : "No results"}</td></tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
        <div className="text-[10px] text-muted-foreground">
          {lang === "ar" ? "المنافذ 0-1023 معروفة، 1024-49151 مسجلة، 49152-65535 ديناميكية." : "Ports 0-1023 well-known, 1024-49151 registered, 49152-65535 dynamic."}
        </div>
      </CardContent>
    </Card>
  );
}
