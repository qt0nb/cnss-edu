// ─── Shared types for NetMastery platform ───────────────────────────────
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

export interface ProgressState {
  version: number;
  xp: number;
  streak: number;
  lastActiveDay: string; // YYYY-MM-DD
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
  | "integrations"
  | "achievements"
  | "settings";
