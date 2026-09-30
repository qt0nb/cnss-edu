"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "next-themes";
import { Settings as SettingsIcon, Moon, Sun, Trash2, ShieldAlert, FlaskConical, Download, Award } from "lucide-react";
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

/** terminal block: term-window chrome bar + code-chip + dotted leader + content screen */
function TermBlock({
  chip,
  title,
  meta,
  delay = 0,
  children,
}: {
  chip: string;
  title: string;
  meta?: ReactNode;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <section className="term-window rise-in overflow-hidden" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-3.5 py-2.5">
        <span className="term-dots" />
        <span className="text-xs font-black">{title}</span>
        <span className="code-chip">{chip}</span>
        <span className="dot-leader" />
        {meta ?? null}
      </div>
      <div className="bg-card/90 p-4">{children}</div>
    </section>
  );
}

export default function SettingsView() {
  const { lang, setLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const resetAll = useProgress((s) => s.resetAll);
  const learnerName = useProgress((s) => s.learnerName);
  const setLearnerName = useProgress((s) => s.setLearnerName);
  const go = useNav((s) => s.go);
  const [resetting, setResetting] = useState(false);
  const [synced, setSynced] = useState(false);
  const [name, setName] = useState(learnerName);

  /* keep the local field in sync with the store (e.g. after resetAll) */
  useEffect(() => setName(learnerName), [learnerName]);

  /* commit on blur / Enter — avoids touchDay() spam on every keystroke */
  const commitName = () => {
    const next = name.trim().slice(0, 40);
    setName(next);
    if (next === learnerName) return;
    setLearnerName(next);
    toast({
      title: next
        ? lang === "ar" ? "تم حفظ الاسم — سيظهر في شهاداتك" : "Name saved — it will appear on your certificates"
        : lang === "ar" ? "تمت إزالة الاسم" : "Name cleared",
    });
  };

  useEffect(() => {
    try {
      setSynced(localStorage.getItem("nm-progress") !== null);
    } catch {
      setSynced(false);
    }
  }, []);

  const handleReset = () => {
    resetAll();
    localStorage.removeItem("nm-netsim");
    toast({ title: lang === "ar" ? "تم تصفير التقدم بالكامل" : "All progress reset" });
    go("dashboard");
  };

  /** export a localStorage snapshot as cnss-progress.json (Blob + link click) */
  const exportProgress = () => {
    try {
      const snapshot: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) snapshot[k] = localStorage.getItem(k) ?? "";
      }
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cnss-progress.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast({ title: lang === "ar" ? "تم تصدير التقدم → cnss-progress.json" : "Progress exported → cnss-progress.json" });
    } catch {
      toast({ title: lang === "ar" ? "فشل التصدير" : "Export failed" });
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      {/* section header */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <SettingsIcon className="size-4" />
        </span>
        <h2 className="text-sm font-black">{t("settings")}</h2>
        <span className="code-chip">sys.config</span>
        <span className="dot-leader" />
        <span className="font-mono text-[10px] text-muted-foreground">v3.0</span>
      </div>

      {/* learner identity (shown on certificates) */}
      <TermBlock
        chip="sys.identity"
        title={t("learnerNameLabel")}
        delay={0.05}
        meta={<span className="font-mono text-[10px] text-muted-foreground">{name.length}/40</span>}
      >
        <div className="space-y-2.5">
          <Input
            value={name}
            maxLength={40}
            dir="auto"
            placeholder={t("learnerNamePlaceholder")}
            onChange={(e) => setName(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
          />
          {learnerName && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
              <Award className="size-4 shrink-0 text-primary" />
              <span className="grad-text truncate font-mono text-sm font-bold">{learnerName}</span>
              <span className="dot-leader" />
              <span className="hidden shrink-0 text-[10px] text-muted-foreground sm:inline">
                {lang === "ar" ? "كما سيظهر في الشهادة" : "as printed on certificates"}
              </span>
            </div>
          )}
          <p className="text-[11px] text-muted-foreground">
            {lang === "ar"
              ? "يُستخدم هذا الاسم في شهادات إتمام الدروس — اكتبه كما تريد ظهوره رسمياً."
              : "Used on your lesson completion certificates — type it exactly as it should officially appear."}
          </p>
        </div>
      </TermBlock>

      {/* appearance */}
      <TermBlock chip="sys.appearance" title={t("theme")} delay={0.1} meta={<span className="font-mono text-[10px] text-muted-foreground">{theme ?? "—"}</span>}>
        <div className="grid grid-cols-2 gap-2">
          {(["dark", "light"] as const).map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className={`flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-xs font-black transition-all
                ${theme === th ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
            >
              {th === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
              {t(th)}
              {theme === th && <span className="blink-dot inline-block size-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </TermBlock>

      {/* locale */}
      <TermBlock chip="sys.locale" title={t("language")} delay={0.15} meta={<span className="font-mono text-[10px] text-muted-foreground">{lang === "ar" ? "rtl" : "ltr"}</span>}>
        <div className="grid grid-cols-2 gap-2">
          {(["ar", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 transition-all
                ${lang === l ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"}`}
            >
              <span className="font-mono text-sm font-black">{l === "ar" ? "ع AR" : "EN"}</span>
              <span className="text-xs font-black">{l === "ar" ? "العربية" : "English"}</span>
              <span className="text-center text-[10px] font-normal text-muted-foreground">
                {l === "ar" ? "المنصة كاملة بالعربية مع مصطلحات إنجليزية" : "Full platform in English"}
              </span>
            </button>
          ))}
        </div>
      </TermBlock>

      {/* data */}
      <TermBlock
        chip="sys.data"
        title={lang === "ar" ? "بياناتك" : "Your data"}
        delay={0.2}
        meta={<span className="font-mono text-[10px] text-muted-foreground">localStorage</span>}
      >
        <div className="space-y-3">
          {/* sync status row */}
          <div className="flex items-center gap-2.5 rounded-xl border bg-muted/30 px-3 py-2.5">
            {synced ? (
              <span className="eq-bars shrink-0">
                <i />
                <i />
                <i />
                <i />
              </span>
            ) : (
              <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/40" />
            )}
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{t("syncStatus")}:</span>
            <span className={`chip-sev shrink-0 ${synced ? "chip-sev-ok" : "chip-sev-warn"}`}>
              {synced ? t("synced") : lang === "ar" ? "بانتظار" : "pending"}
            </span>
            <span className="dot-leader" />
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">nm-progress</span>
          </div>

          <p className="text-[11.5px] text-muted-foreground">{t("dataStored")}</p>

          <div className="flex flex-wrap gap-1.5">
            <span className="code-chip">{TOTAL_LESSONS} {t("lessons")}</span>
            <span className="code-chip">{TOTAL_TOOLS} {t("tools")}</span>
            <span className="code-chip">{TOTAL_PROJECTS} {t("projects")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button size="sm" className="gap-1.5 text-xs" onClick={exportProgress}>
              <Download className="size-3.5" />
              {lang === "ar" ? "تصدير التقدم (JSON)" : "Export progress (JSON)"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => go("playground")}>
              <FlaskConical className="size-3.5" />
              {lang === "ar" ? "الرجوع للمحاكي" : "Back to simulator"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-1.5 text-xs" disabled={resetting}>
                  <Trash2 className="size-3.5" />
                  {t("resetProgress")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent dir={lang === "ar" ? "rtl" : "ltr"}>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-sm">
                    <ShieldAlert className="size-4 text-destructive" />
                    {t("resetConfirm")}
                  </AlertDialogTitle>
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
          </div>
        </div>
      </TermBlock>

      {/* about */}
      <TermBlock chip="sys.about" title={lang === "ar" ? "عن المنصة" : "About"} delay={0.25} meta={<span className="font-mono text-[10px] text-muted-foreground">build ok</span>}>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-glow font-mono text-sm font-black text-primary">CNSS-edu</span>
            <span className="code-chip">v3.0</span>
            <span className="dot-leader" />
            <span className={`chip-sev chip-sev-ok`}>{lang === "ar" ? "مستقر" : "stable"}</span>
          </div>
          <p className="text-[11.5px] text-muted-foreground">{t("appTagline")}</p>
          <div className="hex-bg space-y-1 rounded-lg border bg-muted/30 p-3 font-mono text-[11px]">
            <div className="text-[10px] text-muted-foreground">{"// stack"}</div>
            <div>next.js 16</div>
            <div>tailwind 4</div>
            <div>prisma · sqlite</div>
          </div>
        </div>
      </TermBlock>
    </div>
  );
}
