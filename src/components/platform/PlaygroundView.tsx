"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Calculator, Binary, Radar, Gauge } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import NetSim from "./netsim/NetSim";
import SubnetCalculator from "./playground/SubnetCalculator";
import BinaryConverter from "./playground/BinaryConverter";
import PortLookup from "./playground/PortLookup";
import BandwidthCalculator from "./playground/BandwidthCalculator";

const TAB_TRIGGER_CLS =
  "flex-none gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold tracking-tight " +
  "data-[state=active]:border-transparent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow " +
  "dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground";

export default function PlaygroundView() {
  const { lang, t } = useLang();
  const params = useNav((s) => s.params);

  const tabFromParam = (() => {
    const p = params?.playground ?? params?.tool;
    if (p === "subnet" || p === "binary" || p === "ports" || p === "bandwidth" || p === "netsim") return p;
    return "netsim";
  })();

  return (
    <div className="space-y-3">
      {/* section header */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <FlaskConical className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("playgroundTitle")}</h2>
        <span className="code-chip">lab.sandbox</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground">
          {lang === "ar" ? "٥ وحدات" : "5 modules"}
        </span>
      </div>
      <p className="-mt-1.5 text-[11px] text-muted-foreground">{t("playgroundDesc")}</p>

      <Tabs defaultValue={tabFromParam} dir={lang === "ar" ? "rtl" : "ltr"}>
        {/* terminal segmented control + fullscreen hint */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <TabsList className="h-auto flex-wrap gap-1 rounded-lg bg-muted p-1">
            <TabsTrigger value="netsim" className={TAB_TRIGGER_CLS}>
              <FlaskConical className="size-3.5" />
              {lang === "ar" ? "محاكي الشبكات (Packet Tracer)" : "Network Simulator (PT)"}
            </TabsTrigger>
            <TabsTrigger value="subnet" className={TAB_TRIGGER_CLS}>
              <Calculator className="size-3.5" />
              {t("subnetCalculator")}
            </TabsTrigger>
            <TabsTrigger value="binary" className={TAB_TRIGGER_CLS}>
              <Binary className="size-3.5" />
              {t("binaryConverter")}
            </TabsTrigger>
            <TabsTrigger value="ports" className={TAB_TRIGGER_CLS}>
              <Radar className="size-3.5" />
              {t("portLookup")}
            </TabsTrigger>
            <TabsTrigger value="bandwidth" className={TAB_TRIGGER_CLS}>
              <Gauge className="size-3.5" />
              {t("bandwidthCalc")}
            </TabsTrigger>
          </TabsList>
          <span className="hidden items-center gap-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
            <span className="kbd">esc</span>
            {lang === "ar" ? "خروج من ملء الشاشة في المحاكي" : "exits netsim fullscreen"}
          </span>
        </div>
        <TabsContent value="netsim" className="mt-3">
          <NetSim />
        </TabsContent>
        <TabsContent value="subnet" className="mt-3">
          <SubnetCalculator />
        </TabsContent>
        <TabsContent value="binary" className="mt-3">
          <BinaryConverter />
        </TabsContent>
        <TabsContent value="ports" className="mt-3">
          <PortLookup />
        </TabsContent>
        <TabsContent value="bandwidth" className="mt-3">
          <BandwidthCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
