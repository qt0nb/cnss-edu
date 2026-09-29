"use client";

import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, Calculator, Binary, Radar, Gauge } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import NetSim from "./netsim/NetSim";
import SubnetCalculator from "./playground/SubnetCalculator";
import BinaryConverter from "./playground/BinaryConverter";
import PortLookup from "./playground/PortLookup";
import BandwidthCalculator from "./playground/BandwidthCalculator";

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
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <FlaskConical className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("playgroundTitle")}</h2>
          <p className="text-[11px] text-muted-foreground">{t("playgroundDesc")}</p>
        </div>
      </div>

      <Tabs defaultValue={tabFromParam} dir={lang === "ar" ? "rtl" : "ltr"}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="netsim" className="text-xs gap-1.5">
            <FlaskConical className="size-3.5" />
            {lang === "ar" ? "محاكي الشبكات (Packet Tracer)" : "Network Simulator (PT)"}
          </TabsTrigger>
          <TabsTrigger value="subnet" className="text-xs gap-1.5">
            <Calculator className="size-3.5" />
            {t("subnetCalculator")}
          </TabsTrigger>
          <TabsTrigger value="binary" className="text-xs gap-1.5">
            <Binary className="size-3.5" />
            {t("binaryConverter")}
          </TabsTrigger>
          <TabsTrigger value="ports" className="text-xs gap-1.5">
            <Radar className="size-3.5" />
            {t("portLookup")}
          </TabsTrigger>
          <TabsTrigger value="bandwidth" className="text-xs gap-1.5">
            <Gauge className="size-3.5" />
            {t("bandwidthCalc")}
          </TabsTrigger>
        </TabsList>
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
