// ─── Shared types for CNSS-edu platform ───────────────────────────────
export type Lang = "ar" | "en";

/** Bilingual string: Arabic + English */
export interface Bi {
  ar: string;
  en: string;
}

export type LessonLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface CodeExample {
  lang: string; // e.g. "bash", "text", "python"
  snippet: string;
}

/** Comparison/reference table rendered inside a lesson section */
export interface LessonTable {
  caption?: Bi;
  headers: Bi[];
  rows: Bi[][];
}

/** Teaching diagram rendered inside a lesson section */
export interface LessonDiagram {
  /** "layers" = stacked boxes (OSI/TCP-IP/encapsulation)
   *  "flow" = horizontal step arrows (DORA, 3-way handshake, DNS)
   *  "topology" = mini network graph */
  kind: "layers" | "flow" | "topology";
  title?: Bi;
  /** layers/flow: ordered bilingual captions */
  items?: Bi[];
  /** topology: node labels (may be "Router0|راوتر" — first part used when short) */
  nodes?: string[];
  /** topology: pairs of node indexes */
  edges?: [number, number][];
}

export interface LessonSection {
  heading: Bi;
  /** Paragraphs separated by \n\n. Lines starting with "- " render as bullets. */
  body: Bi;
  code?: CodeExample;
  tip?: Bi;
  /** Optional table (comparisons, port numbers, protocol summaries) */
  table?: LessonTable;
  /** Optional diagram (layers stack, flow arrows, topology graph) */
  diagram?: LessonDiagram;
}

export interface QuizQuestion {
  q: Bi;
  /** Exactly 4 options */
  options: Bi[];
  /** index 0-3 */
  correct: number;
  explain: Bi;
}

export interface CommandEntry {
  cmd: string;
  desc: Bi;
}

// ─── Academic sources (research-backed citations) ───────────────────────
export type SourceKind =
  | "rfc" // IETF Request For Comments
  | "standard" // IEEE / ISO / NIST formal standard
  | "paper" // peer-reviewed research paper
  | "book" // canonical textbook
  | "course" // university course / lecture notes
  | "vendor" // official vendor documentation (Cisco, Wireshark…)
  | "portal"; // reputable learning portal (Cloudflare, MDN…)

export interface Source {
  /** "rfc793", "stanford-cs144", "kuross-ross" … */
  id: string;
  kind: SourceKind;
  /** Original (English) title */
  title: string;
  /** Issuing organization */
  org: string;
  year?: number;
  /** Canonical public URL */
  url: string;
  authors?: string;
  /**
   * Original text shown inside the collapsible source box.
   * `quote: true` → verbatim excerpt (rendered with citation marks + `ref`)
   * `quote: false` → faithful official summary (labeled as such)
   */
  excerpt: string;
  quote: boolean;
  /** e.g. "§2.6" or "Abstract" for verbatim excerpts */
  ref?: string;
  /** bilingual description: why this source matters for the learner */
  desc: Bi;
}

/** A lesson → source citation (references registry in src/data/sources.ts) */
export interface LessonSourceRef {
  sourceId: string;
  /** which part of the lesson this source supports */
  note?: Bi;
}

// ─── Interactive lesson widgets ─────────────────────────────────────────
export interface InteractiveBase {
  /** "w:l001:1" — unique per widget */
  id: string;
  /** render this widget after lesson.sections[sectionIndex] */
  sectionIndex: number;
  /** XP awarded once on solve */
  xp: number;
  title: Bi;
  instructions: Bi;
}

/** Order the steps — tap items in the correct sequence (OSI layers, TCP handshake…) */
export interface OrderWidget extends InteractiveBase {
  kind: "order";
  /** items in CORRECT order (engine shuffles for display) */
  items: Bi[];
}

/** Match two columns — tap a left term then its right partner */
export interface MatchWidget extends InteractiveBase {
  kind: "match";
  pairs: { left: Bi; right: Bi }[];
}

/** Classify items into 2-4 buckets */
export interface ClassifyWidget extends InteractiveBase {
  kind: "classify";
  buckets: Bi[];
  items: { text: Bi; bucket: number }[];
}

/** Fill blanks from a word bank. template uses "____" placeholders */
export interface FillWidget extends InteractiveBase {
  kind: "fill";
  template: Bi;
  blanks: { answer: Bi; hint?: Bi }[];
  /** shuffled display bank (must contain every answer + distractors) */
  bank: Bi[];
}

/** Binary↔decimal octet drill with 8 toggle bits (auto-generated rounds if empty) */
export interface BinaryWidget extends InteractiveBase {
  kind: "binary";
  /** optional fixed octets; otherwise random 10-200 */
  values?: number[];
}

/** Subnetting challenge — pick the mask that fits required hosts */
export interface SubnetWidget extends InteractiveBase {
  kind: "subnet";
  network: string;
  hosts: number;
  options: string[];
  /** index into options */
  correct: number;
  explain: Bi;
}

export type LessonInteractive =
  | OrderWidget
  | MatchWidget
  | ClassifyWidget
  | FillWidget
  | BinaryWidget
  | SubnetWidget;

export interface Lesson {
  /** "l001" .. "l100" — must be globally unique, sequential by module order */
  id: string;
  /** "m01" .. "m10" */
  moduleId: string;
  /** 1-10 within module */
  order: number;
  level: LessonLevel;
  title: Bi;
  summary: Bi;
  durationMin: number;
  /** 4-6 sections */
  sections: LessonSection[];
  /** 4-6 key takeaways */
  keyPoints: Bi[];
  /** 2-4 practical commands */
  commands?: CommandEntry[];
  /** 3-4 quiz questions */
  quiz: QuizQuestion[];
}

export interface ModuleMeta {
  /** "m01" .. "m10" */
  id: string;
  title: Bi;
  desc: Bi;
  /** lucide-react icon name, exported from lucide-react */
  icon: string;
  level: LessonLevel;
  /** tailwind-usable hex color */
  color: string;
}

export type ToolLicense = "free" | "opensource" | "freemium" | "paid";
export type ToolPlatform =
  | "windows"
  | "linux"
  | "mac"
  | "web"
  | "cross"
  | "android"
  | "ios";

export interface Tool {
  /** "t001" .. "t500" */
  id: string;
  name: string;
  url?: string;
  /** category id from toolCategories.ts */
  category: string;
  platform: ToolPlatform[];
  license: ToolLicense;
  /** 1 (easy) – 5 (expert) */
  difficulty: number;
  desc: Bi;
  /** example usage command */
  cmd?: string;
  cmdDesc?: Bi;
  tags: string[];
}

export interface ToolCategory {
  /** ids: scan, sniff, monitor, wireless, pentest, webproxy, utility, speed, simulate, ipcalc, transfer, remote, traffic, firewall, vpn, dns, automation, crypto, craft, mgmt, inventory, log, cloud, windows, hardware */
  id: string;
  name: Bi;
  icon: string;
}

export interface ProjectIdea {
  /** "p001" .. "p200" */
  id: string;
  title: Bi;
  /** category id from projectCategories.ts */
  category: string;
  /** 1 (easy) – 5 (hard) */
  difficulty: number;
  /** estimated time to first revenue */
  timeToMarket: Bi;
  /** realistic monthly revenue potential */
  revenue: Bi;
  /** how to monetize */
  monetization: Bi;
  /** networking skills needed (english tags) */
  skills: string[];
  desc: Bi;
  /** 4-6 action steps */
  steps: Bi[];
}

export interface ProjectCategory {
  id: string;
  name: Bi;
  icon: string;
}

export interface Achievement {
  id: string;
  title: Bi;
  desc: Bi;
  icon: string;
  /** required value */
  goal: number;
  metric:
    | "lessonsCompleted"
    | "xp"
    | "quizCorrect"
    | "quizTotal"
    | "streak"
    | "toolsBookmarked"
    | "projectsBookmarked"
    | "reviewsDone"
    | "perfectQuizzes";
}

export interface PortEntry {
  port: number;
  proto: "tcp" | "udp" | "both";
  service: string;
  desc: Bi;
}

// ─── Progress / store types ─────────────────────────────────────────────
export interface LessonProgress {
  completedAt: string;
  bestQuiz?: number; // 0-100 percentage
}

export interface ReviewCardState {
  /** key: `k:${lessonId}:${keyPointIndex}` */
  box: number; // 0..5 Leitner box
  due: number; // epoch ms
  seen: number;
  lapses: number;
}

// ─── Analytics / assessment tracking (digital learner record) ──────────
export interface LessonViewStats {
  /** how many times the lesson reader was opened */
  opens: number;
  /** accumulated reading time (ms) — only while tab visible */
  totalMs: number;
  lastOpenedAt: string; // ISO
}

export type QuizMode = "lesson" | "module" | "random" | "final";

export interface QuizRunEntry {
  lessonId: string; // may be a synthetic key like "m01-exam" or "final" for aggregates
  moduleId: string;
  correct: number;
  total: number;
  at: string; // ISO
  mode: QuizMode;
}

export interface QuizErrorEntry {
  lessonId: string;
  moduleId: string;
  /** question index within the lesson quiz */
  qIdx: number;
  /** wrong option the learner chose */
  chosen: number;
  /** correct option index */
  correct: number;
  at: string; // ISO
}

export interface AiQueryEntry {
  at: string; // ISO
  /** context the query was asked from (e.g. "netsim.topology", "netsim.assistant") */
  topic: string;
  /** the query text (first 120 chars) */
  q: string;
}

export interface ProgressState {
  version: number;
  xp: number;
  streak: number;
  lastActiveDay: string; // YYYY-MM-DD
  /** learner name shown on certificates ("" → default placeholder) */
  learnerName: string;
  completedLessons: Record<string, LessonProgress>;
  /** lessonId -> { attempts, correct, best } */
  quizStats: Record<string, { attempts: number; correct: number; best: number }>;
  quizTotals: { answered: number; correct: number; perfect: number };
  reviewCards: Record<string, ReviewCardState>;
  reviewsDone: number;
  toolBookmarks: string[];
  projectBookmarks: string[];
  achievements: string[];
  playgroundUsed: string[]; // tool ids used
  /** interactive widget ids solved (XP awarded once) */
  interactiveDone: string[];
  /** lessonId → reading-time tracking (digital record) */
  lessonViews: Record<string, LessonViewStats>;
  /** chronological quiz runs (capped 200) — the assessment trail */
  quizLog: QuizRunEntry[];
  /** every wrong answer with details (capped 300) — error taxonomy input */
  errorLog: QuizErrorEntry[];
  /** AI assistant / builder queries the learner asked (capped 100) */
  aiQueries: AiQueryEntry[];
  /** challenge ids completed with auto-grading */
  challengesDone: string[];
}

export type ViewId =
  | "dashboard"
  | "lessons"
  | "quizzes"
  | "review"
  | "tools"
  | "projects"
  | "playground"
  | "challenges"
  | "certificates"
  | "analytics"
  | "integrations"
  | "achievements"
  | "settings";
