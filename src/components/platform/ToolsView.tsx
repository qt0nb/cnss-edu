"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench, Search, Bookmark, BookmarkCheck, ExternalLink, Terminal, Monitor,
  Globe, Smartphone, Apple, Laptop, X, Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import { useProgress } from "@/lib/store";
import { ALL_TOOLS, TOTAL_TOOLS } from "@/data/tools";
import { TOOL_CATEGORIES, toolCategoryById } from "@/data/toolCategories";
import type { Tool, ToolLicense, ToolPlatform } from "@/lib/types";
import * as Icons from "lucide-react";

const PlatformIcon: Record<ToolPlatform, React.ElementType> = {
  windows: Monitor,
  linux: Terminal,
  mac: Apple,
  web: Globe,
  cross: Laptop,
  android: Smartphone,
  ios: Smartphone,
};

const licenseColor: Record<ToolLicense, string> = {
  free: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  opensource: "bg-primary/15 text-primary",
  freemium: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  paid: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

function DifficultyDots({ level }: { level: number }) {
  return (
    <span className="flex gap-0.5" title={`Difficulty ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`size-1.5 rounded-full ${i <= level ? "bg-primary" : "bg-muted"}`} />
      ))}
    </span>
  );
}

export default function ToolsView() {
  const { lang, t, bi } = useLang();
  const bookmarks = useProgress((s) => s.toolBookmarks);
  const toggleBookmark = useProgress((s) => s.toggleToolBookmark);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [license, setLicense] = useState<string>("all");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_TOOLS.filter((tool: Tool) => {
      if (cat !== "all" && tool.category !== cat) return false;
      if (license !== "all" && tool.license !== license) return false;
      if (bookmarkedOnly && !bookmarks.includes(tool.id)) return false;
      if (!needle) return true;
      return (
        tool.name.toLowerCase().includes(needle) ||
        tool.desc.ar.includes(needle) ||
        tool.desc.en.toLowerCase().includes(needle) ||
        tool.tags.some((tag) => tag.includes(needle))
      );
    });
  }, [q, cat, license, bookmarkedOnly, bookmarks]);

  const catCount = (id: string) => ALL_TOOLS.filter((x) => x.category === id).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-primary">
          <Wrench className="size-5" />
        </div>
        <div>
          <h2 className="text-base font-black">{t("toolsLibrary")}</h2>
          <p className="text-[11px] text-muted-foreground">
            {TOTAL_TOOLS.toLocaleString()} {lang === "ar" ? "أداة حقيقية مصنفة وموثقة" : "real documented tools"} · {TOOL_CATEGORIES.length} {lang === "ar" ? "فئة" : "categories"}
          </p>
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchTools")} className="ps-9 text-xs h-10" />
        </div>
        <div className="flex rounded-lg border overflow-hidden h-10">
          {["all", "free", "opensource", "freemium", "paid"].map((l) => (
            <button
              key={l}
              onClick={() => setLicense(l)}
              className={`px-2.5 text-[10px] font-black ${license === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}
            >
              {l === "all" ? (lang === "ar" ? "الكل" : "All") : t(l)}
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
          {bookmarks.length}
        </Button>
      </div>

      {/* category chips */}
      <ScrollArea className="whitespace-nowrap pb-1" dir="ltr">
        <div className="flex gap-1.5 w-max px-0.5">
          <button
            onClick={() => setCat("all")}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black border transition-colors ${cat === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"}`}
          >
            {t("allCategories")} ({TOTAL_TOOLS})
          </button>
          {TOOL_CATEGORIES.map((c) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[c.icon] ?? Wrench;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black border transition-colors ${cat === c.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-accent"}`}
              >
                <Icon className="size-3.5" />
                {bi(c.name)} ({catCount(c.id)})
              </button>
            );
          })}
        </div>
      </ScrollArea>

      <div className="text-[11px] text-muted-foreground">
        {filtered.length.toLocaleString()} {t("resultsFound")}
      </div>

      {/* tools grid */}
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 120).map((tool, i) => {
          const marked = bookmarks.includes(tool.id);
          const catMeta = toolCategoryById(tool.category);
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.2) }}
            >
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="p-3.5 flex flex-col gap-2 h-full">
                  <div className="flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-black truncate" dir="ltr">{tool.name}</div>
                      <Badge variant="outline" className="text-[9px] mt-0.5">{bi(catMeta.name)}</Badge>
                    </div>
                    <button
                      onClick={() => toggleBookmark(tool.id)}
                      className={`shrink-0 rounded-lg p-1.5 transition-colors ${marked ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent"}`}
                      aria-label={t("bookmark")}
                    >
                      {marked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                    </button>
                  </div>

                  <p className="text-[11.5px] leading-5 text-muted-foreground line-clamp-3">{bi(tool.desc)}</p>

                  {tool.cmd && (
                    <div className="rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 overflow-x-auto" dir="ltr">
                      <code className="text-[10.5px] font-mono text-emerald-300">$ {tool.cmd}</code>
                    </div>
                  )}

                  <div className="mt-auto flex items-center gap-2 flex-wrap pt-1">
                    <div className="flex gap-1">
                      {tool.platform.map((p) => {
                        const PI = PlatformIcon[p];
                        return <PI key={p} className="size-3.5 text-muted-foreground" />;
                      })}
                    </div>
                    <Badge className={`text-[9px] ${licenseColor[tool.license]}`}>{t(tool.license)}</Badge>
                    <DifficultyDots level={tool.difficulty} />
                    {tool.url && (
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-auto inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline"
                        dir="ltr"
                      >
                        {t("openWebsite")} <ExternalLink className="size-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length > 120 && (
        <div className="text-center text-[11px] text-muted-foreground py-3">
          {lang === "ar" ? `تُعرض أول ١٢٠ نتيجة من ${filtered.length} — نقّ البحث للوصول أدق` : `Showing first 120 of ${filtered.length} — refine your search`}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-10 text-xs text-muted-foreground">
          <Search className="size-8 mx-auto mb-2 opacity-40" />
          {t("noToolsFound")}
        </div>
      )}
    </div>
  );
}
