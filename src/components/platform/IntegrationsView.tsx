"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Globe,
  Package2,
  ExternalLink,
  Terminal,
  ArrowRight,
  ArrowDown,
  Zap,
  ShieldCheck,
  Cpu,
  Network,
  Layers3,
  Boxes,
  Download,
  BookOpen,
  GitBranch,
  Code2,
  Star,
  Copy,
  Check,
  Wrench,
  MonitorSmartphone,
  GraduationCap,
  Rocket,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/nav";
import { toast } from "@/hooks/use-toast";
import type { Bi } from "@/lib/types";
import {
  INTEGRATION_PLATFORMS,
  COMPARE_ROWS,
  type ArchNode,
  type IntegrationId,
  type IntegrationLicense,
  type IntegrationLink,
  type IntegrationPlatform,
  type TargetPlatform,
} from "@/data/integrations";

/* ------------------------------------------------------------------ */
/* View-local bilingual strings (indexed by lang)                      */
/* ------------------------------------------------------------------ */

const L = {
  subtitle: {
    ar: "اربط محاكي NetSim بالمختبرات الحقيقية: EVE-NG وGNS3 وContainerlab",
    en: "Wire our NetSim simulator into real labs: EVE-NG, GNS3 and Containerlab",
  },
  kicker: { ar: "دليل التكامل العملي", en: "Hands-on integration guide" },

  heroTitle: { ar: "من NetSim إلى المختبر الحقيقي", en: "From NetSim to a real lab" },
  heroDesc: {
    ar: "مسار التعلّم المثالي: أتقن الأساسيات في محاكي NetSim داخل متصفحك دون أي تثبيت، ثم تخرّج إلى مختبرات حقيقية مفتوحة المصدر — GNS3 وEVE-NG وContainerlab — بالصور نفسها التي تُشغّل شبكات الشركات فعلياً.",
    en: "The ideal learning path: master the fundamentals in our in-browser NetSim with zero install, then graduate to real open-source labs — GNS3, EVE-NG and Containerlab — running the very images that power production networks.",
  },
  step1: { ar: "أتقن الأساسيات في NetSim", en: "Master the basics in NetSim" },
  step1Sub: { ar: "أوامر IOS وVLAN وping — كله في المتصفح", en: "IOS commands, VLANs, ping — all in the browser" },
  step2: { ar: "جسّر المعرفة", en: "Bridge the knowledge" },
  step2Sub: { ar: "المفاهيم والصياغة نفسها تنتقل كما هي", en: "The same concepts and syntax carry over as-is" },
  step3: { ar: "تخرّج إلى مختبر حقيقي", en: "Graduate to a real lab" },
  step3Sub: { ar: "GNS3 / EVE-NG / Containerlab بصور حقيقية", en: "GNS3 / EVE-NG / Containerlab with real images" },

  statPlatformsValue: { ar: "٣", en: "3" },
  statPlatforms: { ar: "منصات مدعومة", en: "supported platforms" },
  statBrowser: { ar: "١٠٠٪ داخل المتصفح", en: "100% in-browser" },
  statToolsValue: { ar: "١٠٦٠", en: "1,060" },
  statTools: { ar: "أداة في الفهرس", en: "tools in the catalog" },

  pickTitle: { ar: "اختر منصتك", en: "Pick your platform" },
  pickDesc: { ar: "روابط مباشرة للمستودعات والوثائق والتنزيلات", en: "Direct links to repos, docs and downloads" },
  bestFor: { ar: "الأفضل لـ", en: "Best for" },

  whatIs: { ar: "ما هو؟", en: "What it is" },
  installSteps: { ar: "خطوات التثبيت", en: "Install steps" },
  apiExamples: { ar: "أمثلة التكامل عبر API", en: "API integration examples" },

  compareTitle: { ar: "قارن المنصات الثلاث", en: "Compare the three platforms" },
  compareDesc: {
    ar: "تقييم من نجم إلى خمس — كلما امتلأت النجوم كان الخيار أقوى في هذا المعيار.",
    en: "Rated one to five stars — more filled stars means a stronger pick for that criterion.",
  },
  criteria: { ar: "المعيار", en: "Criterion" },
  jumpCompare: { ar: "المقارنة", en: "Compare" },

  journeyTitle: { ar: "أكمل رحلتك داخل المنصة", en: "Continue your journey in the platform" },
  journeyDesc: {
    ar: "كل أداة وردت في هذه الصفحة — وغيرها الكثير — موثقة بالتفاصيل في فهرس أدوات المنصة، ويمكنك التدرّب على الطوبولوجيا نفسها في NetSim أولاً قبل الانتقال.",
    en: "Every tool on this page — and many more — is fully documented in the platform tools catalog, and you can rehearse the same topology in NetSim before moving up.",
  },
  toolsBtn: { ar: "فهرس الأدوات (١٠٦٠ أداة)", en: "Tools catalog (1,060 tools)" },
  netSimBtn: { ar: "تدرّب في NetSim أولاً", en: "Rehearse in NetSim first" },

  safetyTitle: { ar: "خادمك أنت، متصفحك نحن", en: "Your server, our browser" },
  footerNote: {
    ar: "شغّل GNS3 وEVE-NG وContainerlab على خوادمك أو أجهزتك الافتراضية الخاصة — الصور وتراخيص المورّدين مسؤوليتك — أما منصتنا نفسها فتبقى ١٠٠٪ داخل المتصفح: لا تثبيت ولا خادم ولا بيانات تغادر جهازك.",
    en: "Run GNS3, EVE-NG and Containerlab on your own servers or VMs — vendor images and licences are your responsibility — while our platform itself stays 100% in-browser: no install, no server, no data leaving your device.",
  },

  copyLabel: { ar: "نسخ", en: "COPY" },
  copiedLabel: { ar: "تم!", en: "OK!" },
} as const;

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<IntegrationId, React.ElementType> = {
  eveng: Server,
  gns3: Globe,
  containerlab: Package2,
};

const LINK_ICONS: Record<IntegrationLink["kind"], React.ElementType> = {
  site: Globe,
  download: Download,
  repo: GitBranch,
  docs: BookOpen,
};

const LICENSE_LABEL: Record<IntegrationLicense, Bi> = {
  opensource: { ar: "مفتوح المصدر", en: "Open source" },
  free: { ar: "مجاني", en: "Free" },
  freemium: { ar: "مجاني جزئياً", en: "Freemium" },
};

const LICENSE_CLASS: Record<IntegrationLicense, string> = {
  opensource: "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  free: "border-teal-500/30 bg-teal-500/15 text-teal-700 dark:text-teal-400",
  freemium: "border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-400",
};

/** display-only "type" chip for each lab platform (ops console v3) */
const PLATFORM_TYPE: Record<IntegrationId, { sev: string; label: Bi }> = {
  eveng: { sev: "chip-sev-info", label: { ar: "مُضاهاة", en: "EMULATOR" } },
  gns3: { sev: "chip-sev-info", label: { ar: "مُضاهاة", en: "EMULATOR" } },
  containerlab: { sev: "chip-sev-ok", label: { ar: "حاويات", en: "CONTAINER LAB" } },
};

const PLATFORM_LABEL_KEYS: Record<TargetPlatform, string> = {
  Linux: "linux",
  Windows: "windows",
  Web: "web",
  macOS: "mac",
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** hostname of an official site link (for the mono url chip) */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* ------------------------------------------------------------------ */
/* Code block with copy-to-clipboard (term-window chrome, v3)          */
/* ------------------------------------------------------------------ */

function CodeBlock({ language, code, chip }: { language: string; code: string; chip?: string }) {
  const { lang, t } = useLang();
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        toast({ title: t("copied") });
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <div className="term-window overflow-hidden" dir="ltr">
      <div className="flex items-center gap-2 border-b border-border/60 px-5 py-1.5">
        <span className="term-dots" aria-hidden />
        <span className="code-chip inline-flex items-center gap-1">
          <Terminal className="size-3" />
          {chip ?? language}
        </span>
        <span className="dot-leader" />
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 transition-colors hover:text-emerald-300"
          aria-label={L.copyLabel[lang]}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? L.copiedLabel[lang] : L.copyLabel[lang]}
        </button>
      </div>
      <pre className="overflow-x-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100">{code}</pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture diagram (flex boxes + arrows, RTL-aware)               */
/* rendering kept exactly as-is — only the wrapper changed (v3)        */
/* ------------------------------------------------------------------ */

function ArchDiagram({ nodes }: { nodes: ArchNode[] }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch">
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div className="grid shrink-0 place-items-center py-1 sm:px-1.5">
              <ArrowDown className="size-4 text-emerald-500 sm:hidden" />
              <ArrowRight className="hidden size-4 text-emerald-500 sm:inline-block rtl:rotate-180" />
            </div>
          )}
          <div
            className={`flex-1 rounded-xl border p-3 text-center ${
              n.highlight
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-border bg-muted/40"
            }`}
          >
            <div className="text-xs font-black leading-snug">{n.label[lang]}</div>
            {n.sub && <div className="mt-1 text-[10px] leading-tight text-muted-foreground">{n.sub[lang]}</div>}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Star rating                                                         */
/* ------------------------------------------------------------------ */

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5" dir="ltr" title={`${n}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-3.5 ${i <= n ? "fill-emerald-500 text-emerald-500" : "text-muted-foreground/40"}`}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Platform overview card (grid of three) — mission-card style v3      */
/* ------------------------------------------------------------------ */

function PlatformCard({ p, i }: { p: IntegrationPlatform; i: number }) {
  const { lang, t } = useLang();
  const Icon = PLATFORM_ICONS[p.id];
  const site = p.links.find((l) => l.kind === "site");
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.08 }}
      className="rise-in h-full"
      style={{ animationDelay: `${i * 0.09}s` }}
    >
      <div className="hud-panel flex h-full flex-col gap-3 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Icon className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h4 className="font-mono text-sm font-black tracking-tight">{p.name}</h4>
              <span className={`chip-sev ${PLATFORM_TYPE[p.id].sev}`}>{PLATFORM_TYPE[p.id].label[lang]}</span>
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{p.tagline[lang]}</p>
            {site && (
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="code-chip mt-1.5 inline-flex items-center gap-1 transition-colors hover:border-primary/40"
              >
                {hostOf(site.url)}
                <ExternalLink className="size-2.5" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className={LICENSE_CLASS[p.license]}>
            {LICENSE_LABEL[p.license][lang]}
          </Badge>
          {p.platforms.map((pl) => (
            <Badge key={pl} variant="secondary" className="font-mono text-[10px]">
              {t(PLATFORM_LABEL_KEYS[pl])}
            </Badge>
          ))}
        </div>
        <p className="text-[10px] leading-snug text-muted-foreground">{p.licenseNote[lang]}</p>
        <p className="text-xs leading-relaxed">
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{L.bestFor[lang]}: </span>
          {p.bestFor[lang]}
        </p>
        <Separator />
        <div className="mt-auto space-y-1.5">
          {p.links.map((link) => {
            const LinkIcon = LINK_ICONS[link.kind];
            return (
              <Button
                key={link.url}
                asChild
                variant="outline"
                size="sm"
                className="h-9 w-full justify-between gap-2 text-[11px] font-bold"
              >
                <a href={link.url} target="_blank" rel="noreferrer">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <LinkIcon className="size-3.5 shrink-0 text-emerald-500" />
                    <span className="truncate">{link.label[lang]}</span>
                  </span>
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-platform detail section (what / install / arch / API) — v3      */
/* ------------------------------------------------------------------ */

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase tracking-wider text-primary">
      <Icon className="size-3.5" />
      {children}
    </h4>
  );
}

function PlatformSection({ p }: { p: IntegrationPlatform }) {
  const { lang } = useLang();
  const Icon = PLATFORM_ICONS[p.id];
  return (
    <div className="space-y-3">
      {/* section head */}
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-mono text-sm font-black tracking-tight">{p.name}</h3>
          <p className="text-[11px] text-muted-foreground">{p.tagline[lang]}</p>
        </div>
        <span className="eq-bars ms-auto hidden shrink-0 sm:inline-flex" aria-hidden>
          <i /><i /><i /><i />
        </span>
      </div>

      {/* what it is */}
      <div className="hud-panel space-y-2 rounded-xl p-4">
        <SectionHeading icon={BookOpen}>{L.whatIs[lang]}</SectionHeading>
        <p className="text-xs leading-relaxed">{p.what[lang]}</p>
      </div>

      {/* install steps — numbered terminal lines */}
      <div className="hud-panel space-y-3 rounded-xl p-4">
        <SectionHeading icon={Download}>{L.installSteps[lang]}</SectionHeading>
        {p.install.map((step, i) => (
          <div key={i} className="space-y-1.5 rise-in" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="code-chip shrink-0 font-black">{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-snug">{step.title[lang]}</span>
            </div>
            {step.code && <CodeBlock language="bash" code={step.code} />}
            {step.note && (
              <p className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 size-3 shrink-0 text-teal-500" />
                {step.note[lang]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* integration architecture — same diagram, hud-panel + caption */}
      <div className="hud-panel space-y-3 rounded-xl p-4">
        <SectionHeading icon={Network}>{p.archTitle[lang]}</SectionHeading>
        <ArchDiagram nodes={p.arch} />
        <p className="text-[11px] leading-relaxed text-muted-foreground">{p.archNote[lang]}</p>
        <div className="flex items-center gap-2 border-t border-border/60 pt-2.5">
          <span className="code-chip">arch.topology</span>
          <span className="dot-leader" />
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">{p.id}.diagram</span>
        </div>
      </div>

      {/* API examples — term-window with mono title chip */}
      <div className="hud-panel space-y-3 rounded-xl p-4">
        <SectionHeading icon={Code2}>{L.apiExamples[lang]}</SectionHeading>
        {p.examples.map((ex, i) => (
          <div key={i} className="space-y-1.5">
            <div className="text-xs font-bold">{ex.title[lang]}</div>
            <CodeBlock language={ex.lang} code={ex.code} chip={`api.${p.id}`} />
            {ex.desc && <p className="text-[10.5px] leading-relaxed text-muted-foreground">{ex.desc[lang]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main view                                                           */
/* ------------------------------------------------------------------ */

const HERO_STEPS: { icon: React.ElementType; title: Bi; sub: Bi }[] = [
  { icon: MonitorSmartphone, title: L.step1, sub: L.step1Sub },
  { icon: GraduationCap, title: L.step2, sub: L.step2Sub },
  { icon: Rocket, title: L.step3, sub: L.step3Sub },
];

export default function IntegrationsView() {
  const { lang, t } = useLang();
  const { go } = useNav();
  const [active, setActive] = useState<string>(INTEGRATION_PLATFORMS[0].id);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* section header — ops console v3 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Layers3 className="size-4" />
          </span>
          <h2 className="text-sm font-black">{t("integrations")}</h2>
          <span className="code-chip">lab.bridge</span>
          <span className="dot-leader" />
          <span className="font-mono text-[10px] text-muted-foreground">
            3 {lang === "ar" ? "منصات" : "PLATFORMS"} · 100% IN-BROWSER
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">{L.subtitle[lang]}</p>
      </div>

      {/* hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="hud-panel relative overflow-hidden rounded-2xl p-4 sm:p-6 net-grid-bg">
          <div aria-hidden className="aurora" />
          <div className="relative space-y-4">
            <div className="space-y-1.5">
              <span className="code-chip inline-flex items-center gap-1">
                <Zap className="size-3" />
                {L.kicker[lang]}
              </span>
              <h3 className="grad-text text-xl font-black leading-tight sm:text-2xl">{L.heroTitle[lang]}</h3>
              <p className="text-xs text-muted-foreground" dir={lang === "ar" ? "ltr" : "rtl"}>
                {L.heroTitle[lang === "ar" ? "en" : "ar"]}
              </p>
              <p className="text-[13px] leading-relaxed text-foreground/90">{L.heroDesc[lang]}</p>
            </div>

            {/* learning path */}
            <div className="grid gap-2 sm:grid-cols-3">
              {HERO_STEPS.map((st, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-xl border bg-background/70 p-3">
                  <span className="code-chip shrink-0 font-black">{String(i + 1).padStart(2, "0")}</span>
                  <st.icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold leading-snug">{st.title[lang]}</div>
                    <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{st.sub[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* stats */}
            <div className="flex flex-wrap gap-1.5">
              <span className="code-chip inline-flex items-center gap-1.5">
                <Boxes className="size-3" />
                {L.statPlatformsValue[lang]} {L.statPlatforms[lang]}
              </span>
              <span className="code-chip inline-flex items-center gap-1.5">
                <MonitorSmartphone className="size-3" />
                {L.statBrowser[lang]}
              </span>
              <span className="code-chip inline-flex items-center gap-1.5">
                <Wrench className="size-3" />
                {L.statToolsValue[lang]} {L.statTools[lang]}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* platform cards */}
      <section className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-black">{L.pickTitle[lang]}</h3>
          <span className="code-chip">platforms.pick</span>
          <span className="dot-leader" />
          <p className="text-[11px] text-muted-foreground">{L.pickDesc[lang]}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {INTEGRATION_PLATFORMS.map((p, i) => (
            <PlatformCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* sticky sub-nav (terminal segmented pills) + per-platform deep dives */}
      <Tabs value={active} onValueChange={setActive}>
        <div className="sticky top-14 z-10 -mx-1 border-b bg-background/95 px-1 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <TabsList className="h-9 flex-1 gap-1 overflow-x-auto rounded-full border bg-muted/40 p-1">
              {INTEGRATION_PLATFORMS.map((p) => {
                const Icon = PLATFORM_ICONS[p.id];
                return (
                  <TabsTrigger
                    key={p.id}
                    value={p.id}
                    className="rounded-full px-3 font-mono text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="size-3.5 text-emerald-500" />
                    {p.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              className="h-9 shrink-0 gap-1.5 text-[11px] font-bold"
              onClick={() => scrollToId("sec-compare")}
            >
              <Cpu className="size-3.5 text-emerald-500" />
              <span className="hidden sm:inline">{L.jumpCompare[lang]}</span>
            </Button>
          </div>
        </div>

        {INTEGRATION_PLATFORMS.map((p) => (
          <TabsContent key={p.id} value={p.id} className="mt-3">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <PlatformSection p={p} />
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* compare table */}
      <section id="sec-compare" className="rise-in scroll-mt-28 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Cpu className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-black">{L.compareTitle[lang]}</h3>
            <p className="text-[11px] text-muted-foreground">{L.compareDesc[lang]}</p>
          </div>
        </div>
        <div className="hud-panel overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    {L.criteria[lang]}
                  </TableHead>
                  {INTEGRATION_PLATFORMS.map((p) => {
                    const Icon = PLATFORM_ICONS[p.id];
                    return (
                      <TableHead key={p.id} className="text-center font-mono text-[10px] font-bold uppercase tracking-wider">
                        <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                          <Icon className="size-3.5 text-emerald-500" />
                          {p.name}
                        </span>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARE_ROWS.map((row) => (
                  <TableRow key={row.label.en} className="hover:bg-muted/30">
                    <TableCell className="text-xs font-bold">
                      <div>{row.label[lang]}</div>
                      {row.note && (
                        <div className="mt-0.5 max-w-[220px] text-[10px] font-normal leading-snug text-muted-foreground">
                          {row.note[lang]}
                        </div>
                      )}
                    </TableCell>
                    {INTEGRATION_PLATFORMS.map((p) => (
                      <TableCell key={p.id} className="text-center">
                        <Stars n={row.stars[p.id]} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* cross-links back into the platform */}
      <div className="hud-panel rise-in relative overflow-hidden rounded-2xl border-emerald-500/30 p-4 sm:p-5">
        <div aria-hidden className="aurora" />
        <div className="relative space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-primary-foreground shadow-md">
              <Wrench className="size-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black">{L.journeyTitle[lang]}</h3>
              <p className="text-[11px] leading-snug text-muted-foreground">{L.journeyDesc[lang]}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => go("tools")}
              className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
              size="sm"
            >
              <Wrench className="size-4" />
              {L.toolsBtn[lang]}
            </Button>
            <Button variant="outline" onClick={() => go("playground")} size="sm" className="gap-1.5">
              <MonitorSmartphone className="size-4" />
              {L.netSimBtn[lang]}
            </Button>
          </div>
        </div>
      </div>

      {/* footer note */}
      <Alert className="rise-in border-emerald-500/25 bg-emerald-500/5">
        <ShieldCheck className="size-4" />
        <AlertTitle className="text-xs font-black">{L.safetyTitle[lang]}</AlertTitle>
        <AlertDescription className="text-[11px] leading-relaxed">{L.footerNote[lang]}</AlertDescription>
      </Alert>
    </div>
  );
}
