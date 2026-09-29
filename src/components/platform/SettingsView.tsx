"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Settings as SettingsIcon, Languages, Sun, Moon, Trash2, Database, ShieldAlert, FlaskConical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { useProgress } from "@/lib/store";
import { TOTAL_LESSONS } from "@/data/lessons";
import { TOTAL_TOOLS } from "@/data/tools";
import { TOTAL_PROJECTS } from "@/data/projects";

export default function SettingsView() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const resetAll = useProgress((s) => s.resetAll);
  const go = useNav((s) => s.go);
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    resetAll();
    localStorage.removeItem("nm-netsim");
    toast({ title: lang === "ar" ? "تم تصفير التقدم بالكامل" : "All progress reset" });
    go("dashboard");
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <SettingsIcon className="size-5" />
        </div>
        <h2 className="text-base font-black">{t("settings")}</h2>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Languages className="size-4 text-primary" />
            {t("language")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {(["ar", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-xl border-2 p-3 text-center font-black transition-all
                  ${lang === l ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
              >
                <div className="text-2xl mb-1">{l === "ar" ? "🇸🇦" : "🌍"}</div>
                <div className="text-xs">{l === "ar" ? "العربية" : "English"}</div>
                <div className="text-[10px] text-muted-foreground font-normal mt-0.5">
                  {l === "ar" ? "المنصة كاملة بالعربية مع مصطلحات إنجليزية" : "Full platform in English"}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            {theme === "dark" ? <Moon className="size-4 text-primary" /> : <Sun className="size-4 text-primary" />}
            {t("theme")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {(["dark", "light"] as const).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className={`rounded-xl border-2 p-3 text-center font-black transition-all
                  ${theme === th ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
              >
                <div className="text-2xl mb-1">{th === "dark" ? "🌙" : "☀️"}</div>
                <div className="text-xs">{t(th)}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Database className="size-4 text-primary" />
            {lang === "ar" ? "بياناتك" : "Your data"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-[11.5px] text-muted-foreground">
          <p>{t("dataStored")}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold">{TOTAL_LESSONS} {t("lessons")}</span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold">{TOTAL_TOOLS} {t("tools")}</span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold">{TOTAL_PROJECTS} {t("projects")}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs mt-1" onClick={() => go("playground")}>
            <FlaskConical className="size-3.5" />
            {lang === "ar" ? "الرجوع للمحاكي" : "Back to simulator"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm text-destructive">
            <ShieldAlert className="size-4" />
            {t("resetProgress")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1.5" disabled={resetting}>
                <Trash2 className="size-3.5" />
                {t("resetProgress")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-sm">{t("resetConfirm")}</AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  {lang === "ar" ? "سيشمل ذلك: نقاط الخبرة، الدروس المكتملة، بطاقات المراجعة، الإنجازات، ومخطط المحاكي المحفوظ." : "This includes XP, completed lessons, review cards, achievements, and your saved simulator topology."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>{t("confirm")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
