"use client";

/* ── (A) Collapsible academic source boxes ─────────────────────────────
 * Rendered by the lesson reader after the last section, before takeaways.
 * Each box: kind icon + chip, mono ltr title, org/year meta, rotating
 * chevron; expanded → term-window excerpt/summary + why + note + link.
 * Identity: v3 ops console (emerald/teal/amber/rose only, RTL-safe). */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ChevronDown, ExternalLink, FileSearch, FileText, Globe,
  GraduationCap, Landmark, Link2, Scroll, ShieldCheck, Wrench,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { sourceById } from "@/data/sources";
import type { LessonSourceRef, SourceKind } from "@/lib/types";

/** solid dark base layered under term-window chrome (readable in light + dark mode) */
const TERM_BG = "#09090b";

const KIND_META: Record<SourceKind, { icon: typeof FileText; i18n: string }> = {
  rfc: { icon: FileText, i18n: "kindRfc" },
  standard: { icon: Scroll, i18n: "kindStandard" },
  paper: { icon: FileSearch, i18n: "kindPaper" },
  book: { icon: BookOpen, i18n: "kindBook" },
  course: { icon: GraduationCap, i18n: "kindCourse" },
  vendor: { icon: Wrench, i18n: "kindVendor" },
  portal: { icon: Globe, i18n: "kindPortal" },
};

/* ── one collapsible citation box ─────────────────────────────────────── */

function SourceBox({ sr, index }: { sr: LessonSourceRef; index: number }) {
  const { t, bi, lang } = useLang();
  const [open, setOpen] = useState(false);
  const src = sourceById(sr.sourceId);
  if (!src) return null;

  const meta = KIND_META[src.kind];
  const Icon = meta.icon;
  const showHide = open ? t("sourceHide") : t("sourceShow");

  return (
    <div
      className="rise-in overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-px hover:border-primary/40"
      style={{ animationDelay: `${Math.min(index * 0.05, 0.25)}s` }}
    >
      {/* header row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-11 w-full flex-wrap items-center gap-2.5 p-3.5 text-start transition-colors hover:bg-accent/30"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <span className="min-w-0 flex-1 space-y-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="chip-sev chip-sev-info shrink-0">{t(meta.i18n)}</span>
            <span dir="ltr" className="font-mono text-[12.5px] font-bold leading-6">{src.title}</span>
          </span>
          <span dir="ltr" className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-mono text-[10px] text-muted-foreground">
            {src.authors ? <span className="truncate">{src.authors}</span> : null}
            {src.authors ? <span aria-hidden>·</span> : null}
            <span className="shrink-0">{src.org}{src.year ? ` · ${src.year}` : ""}</span>
          </span>
        </span>
        <span className="ms-auto flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-[9.5px] text-muted-foreground/70 sm:inline">{showHide}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid size-7 place-items-center rounded-md border text-muted-foreground"
            aria-hidden
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </span>
      </button>

      {/* expanded content — smooth height animation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="src-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t px-3.5 py-3.5">
              {/* 1 · excerpt (verbatim) or official summary — term-window block */}
              <div className="term-window overflow-hidden" dir="ltr" style={{ backgroundColor: TERM_BG }}>
                <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/60 px-3 py-1.5">
                  <span className="term-dots shrink-0" aria-hidden />
                  <span className="truncate font-mono text-[10px] text-zinc-400">
                    {src.quote ? t("sourceExcerpt") : t("sourceSummary")}
                  </span>
                  <span className="dot-leader" />
                  <span className="shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-emerald-400">
                    {src.id}
                  </span>
                </div>
                <div className="space-y-2 p-3">
                  <p
                    className={`font-mono text-[12px] leading-relaxed ${
                      src.quote ? "text-emerald-200" : "italic text-teal-200/90"
                    }`}
                  >
                    {src.quote ? `« ${src.excerpt} »` : src.excerpt}
                  </p>
                  {src.quote && src.ref && (
                    <p className="text-end font-mono text-[10px] text-zinc-500">— {src.ref}</p>
                  )}
                </div>
              </div>

              {/* 2 · why this source matters */}
              <div className="rounded-lg border border-teal-500/25 bg-teal-500/5 px-3 py-2.5">
                <div className="mb-0.5 text-[10px] font-black text-teal-600 dark:text-teal-400">{t("sourceWhy")}</div>
                <p className="text-[12.5px] leading-6 text-foreground/85">{bi(src.desc)}</p>
              </div>

              {/* 3 · what this citation supports in THIS lesson */}
              {sr.note && (
                <div className="flex items-start gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-[11.5px] leading-6 text-emerald-700 dark:text-emerald-300">
                  <Link2 className="mt-1 size-3.5 shrink-0" />
                  <span>{bi(sr.note)}</span>
                </div>
              )}

              {/* 4 · open the original source (real anchor, new tab) */}
              <a
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3.5 py-2 font-mono text-[11.5px] font-bold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 active:scale-[0.98]"
              >
                <ExternalLink className="size-4 shrink-0" />
                {/* narrow: full mono title as the link text · wide: localized label */}
                <span dir="ltr" className="min-w-0 flex-1 break-words text-[11px] sm:hidden">{src.title}</span>
                <span className="hidden sm:inline">{t("sourceOpen")}</span>
                <span dir="ltr" className="hidden max-w-[260px] truncate text-[10px] font-medium text-muted-foreground sm:inline-block">
                  ↗ {src.org}
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── the full sources section (title + count + boxes + curriculum note) ── */

export default function SourceBoxes({ refs }: { refs: LessonSourceRef[] }) {
  const { t, lang } = useLang();
  if (refs.length === 0) return null;
  return (
    <section className="space-y-3 rounded-2xl border bg-card p-4 sm:p-6 rise-in" style={{ animationDelay: "90ms" }}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <Landmark className="size-4" />
        </span>
        <h3 className="text-[14px] font-black">{t("sourcesTitle")}</h3>
        <span className="code-chip shrink-0" dir="ltr">lesson.sources</span>
        <span className="dot-leader" />
        <span className="chip-sev chip-sev-info shrink-0" dir="ltr">
          {refs.length} {lang === "ar" ? "مصادر" : "sources"}
        </span>
      </div>

      <div className="space-y-2">
        {refs.map((sr, i) => (
          <SourceBox key={`${sr.sourceId}-${i}`} sr={sr} index={i} />
        ))}
      </div>

      <p className="flex items-start gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-[11px] leading-6 text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary/70" />
        {t("curriculumNote")}
      </p>
    </section>
  );
}
