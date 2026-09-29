"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/i18n";
import type { SimStep } from "@/lib/netsim/types";
import { protoColor } from "./icons";

export default function PduDialog({
  step,
  onClose,
}: {
  step: SimStep | null;
  onClose: () => void;
}) {
  const { lang, bi } = useLang();
  if (!step) return null;
  const p = step.packet;
  return (
    <Dialog open={!!step} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span
              className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-black text-white"
              style={{ background: protoColor(p.proto) }}
            >
              {p.proto}
            </span>
            <span>{bi(p.kindBi)}</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {lang === "ar" ? "تشريح الحزمة عبر طبقات OSI — كما في Packet Tracer" : "PDU dissection through OSI layers — just like Packet Tracer"}
          </DialogDescription>
        </DialogHeader>

        <div className="text-xs font-semibold mb-1">
          {step.deviceName}
          {step.inPort ? ` ← ${step.inPort}` : ""}
          {step.outPort ? ` → ${step.outPort}` : ""}
          {step.dropped ? " ⛔" : ""}
        </div>
        {step.info && (step.info.ar || step.info.en) && (
          <div className={`mb-3 rounded-lg border px-3 py-2 text-xs ${step.dropped ? "border-destructive/50 bg-destructive/10 text-destructive" : "border-border bg-muted/50"}`}>
            {bi(step.info)}
          </div>
        )}

        <div className="space-y-2">
          {p.layers.map((l) => (
            <div key={l.n} className="rounded-lg border border-border bg-card p-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="secondary" className="font-mono text-[10px]">L{l.n}</Badge>
                <span className="text-xs font-bold">{bi(l.title)}</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px] font-mono">
                {l.fields.map((f, i) => (
                  <React.Fragment key={i}>
                    <span className="text-muted-foreground whitespace-nowrap">{bi(f.k)}</span>
                    <span className="font-semibold break-all">{f.v}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
