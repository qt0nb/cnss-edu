"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket, Search, Bookmark, BookmarkCheck, ChevronDown, Star, Clock, DollarSign,
  Briefcase, ListOrdered,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { ALL_PROJECTS, TOTAL_PROJECTS } from "@/data/projects";
import { PROJECT_CATEGORIES, projectCategoryById } from "@/data/projectCategories";
import type { ProjectIdea } from "@/lib/types";
import * as Icons from "lucide-react";

function Stars({ level }: { level: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`size-2.5 ${i <= level ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`} />
      ))}
    </span>
  );
}

function ProjectCard({ p, i }: { p: ProjectIdea; i: number }) {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.projectBookmarks);
  const toggle = useProgress((s) => s.toggleProjectBookmark);
  const marked = bookmarks.includes(p.id);
  const [open, setOpen] = useState(false);
  const cat = projectCategoryById(p.category);
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] ?? Rocket;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.2) }}>
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardContent className="p-4 flex flex-col gap-2.5 h-full">
          <div className="flex items-start gap-2">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-black leading-snug">{bi(p.title)}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[9px]">{bi(cat.name)}</Badge>
                <Stars level={p.difficulty} />
              </div>
            </div>
            <button
              onClick={() => toggle(p.id)}
              className={`shrink-0 rounded-lg p-1.5 transition-colors ${marked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent"}`}
              aria-label={t("bookmark")}
            >
              {marked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            </button>
          </div>

          <p className="text-[12px] leading-6 text-muted-foreground">{bi(p.desc)}</p>

          <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
            <div className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-2 py-1.5">
              <Clock className="size-3.5 text-primary shrink-0" />
              <span className="font-bold truncate">{bi(p.timeToMarket)}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2 py-1.5">
              <DollarSign className="size-3.5 text-emerald-500 shrink-0" />
              <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate" dir="ltr">{bi(p.revenue)}</span>
            </div>
          </div>

          <div className="rounded-lg border border-primary/25 bg-primary/5 px-2.5 py-2">
            <div className="text-[9.5px] font-black text-primary mb-0.5">{t("howToMonetize")}</div>
            <div className="text-[11.5px] leading-5">{bi(p.monetization)}</div>
          </div>

          {p.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {p.skills.slice(0, 4).map((s) => (
                <Badge key={s} variant="secondary" className="text-[9px] font-mono">{s}</Badge>
              ))}
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-[11px] gap-1 mt-auto"
            onClick={() => setOpen((v) => !v)}
          >
            <ListOrdered className="size-3.5" />
            {t("actionSteps")}
            <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </Button>

          {open && (
            <motion.ol initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5 overflow-hidden">
              {p.steps.map((s, j) => (
                <li key={j} className="flex gap-2 items-start rounded-lg bg-muted/40 p-2">
                  <span className="grid size-4.5 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground text-[9px] font-black">{j + 1}</span>
                  <span className="text-[11.5px] leading-5">{bi(s)}</span>
                </li>
              ))}
            </motion.ol>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProjectsView() {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.projectBookmarks);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [maxDiff, setMaxDiff] = useState(5);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_PROJECTS.filter((p: ProjectIdea) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (bookmarkedOnly && !bookmarks.includes(p.id)) return false;
      if (p.difficulty > maxDiff) return false;
      if (!needle) return true;
      return (
        p.title.ar.includes(needle) ||
        p.title.en.toLowerCase().includes(needle) ||
        p.desc.ar.includes(needle) ||
        p.desc.en.toLowerCase().includes(needle) ||
        p.skills.some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [q, cat, bookmarkedOnly, bookmarks, maxDiff]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <Rocket className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("ideasTitle")}</h2>
          <p className="text-[11px] text-muted-foreground">{t("ideasDesc")}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchProjects")} className="ps-9 text-xs h-10" />
        </div>
        <div className="flex rounded-lg border overflow-hidden h-10">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              onClick={() => setMaxDiff(d)}
              className={`px-2.5 text-[10px] font-black ${maxDiff === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
              title={lang === "ar" ? `صعوبة حتى ${d}` : `up to difficulty ${d}`}
            >
              ≤{d}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className={`h-10 gap-1.5 text-[11px] ${bookmarkedOnly ? "border-primary text-primary" : ""}`}
          onClick={() => setBookmarkedOnly((v) => !v)}
        >
          <BookmarkCheck className="size-3.5" />
          {t("ideasCompleted")}: {bookmarks.length}
        </Button>
      </div>

      <ScrollArea className="whitespace-nowrap pb-1" dir="ltr">
        <div className="flex gap-1.5 w-max px-0.5">
          <button
            onClick={() => setCat("all")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black border transition-colors ${cat === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"}`}
          >
            {t("allCategories")} ({TOTAL_PROJECTS})
          </button>
          {PROJECT_CATEGORIES.map((c) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Rocket;
            const count = ALL_PROJECTS.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black border transition-colors ${cat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"}`}
              >
                <Icon className="size-3.5" />
                {bi(c.name)} ({count})
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="text-[11px] text-muted-foreground">
        {filtered.length} {t("resultsFound")}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 60).map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>

      {filtered.length > 60 && (
        <div className="text-center text-[11px] text-muted-foreground py-3">
          {lang === "ar" ? `تُعرض أول ٦٠ فكرة من ${filtered.length} — استخدم الفلاتر` : `Showing first 60 of ${filtered.length} — use filters`}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-10 text-xs text-muted-foreground">
          <Briefcase className="size-8 mx-auto mb-2 opacity-40" />
          {lang === "ar" ? "لا مشاريع مطابقة" : "No matching projects"}
        </div>
      )}
    </div>
  );
}
