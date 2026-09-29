"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Bi, Lang } from "./types";

type Dict = Record<string, Bi>;

export const UI: Dict = {
  // Brand / shell
  appName: { ar: "CNSS-edu", en: "CNSS-edu" },
  appNameFull: { ar: "علوم الشبكات والأمن السيبراني", en: "Computer Networks & Security Sciences" },
  appTagline: {
    ar: "منصتك الأدائية لإتقان علوم الشبكات والأمن السيبراني — اختبارات، تحديات ومختبر محاكاة",
    en: "Your performance platform for networking & security sciences — exams, challenges & simulation lab",
  },
  home: { ar: "الرئيسية", en: "Dashboard" },
  lessons: { ar: "الدروس", en: "Lessons" },
  quizzes: { ar: "الاختبارات", en: "Quizzes" },
  review: { ar: "المراجعة", en: "Review" },
  tools: { ar: "الأدوات", en: "Tools" },
  projects: { ar: "المشاريع", en: "Projects" },
  playground: { ar: "المختبر التفاعلي", en: "Playground" },
  achievements: { ar: "الإنجازات", en: "Achievements" },
  settings: { ar: "الإعدادات", en: "Settings" },
  challenges: { ar: "التحديات", en: "Challenges" },
  integrations: { ar: "التكاملات", en: "Integrations" },
  installApp: { ar: "تثبيت التطبيق", en: "Install app" },
  installDesc: { ar: "ثبّت المنصة على جهازك واستخدمها دون اتصال بالكامل", en: "Install the platform on your device and use it fully offline" },
  offlineReady: { ar: "جاهز للعمل دون اتصال", en: "Ready to work offline" },
  offlineMode: { ar: "وضع عدم الاتصال — يعمل محلياً", en: "Offline mode — running locally" },
  backOnline: { ar: "عاد الاتصال بالإنترنت", en: "Back online" },
  language: { ar: "اللغة", en: "Language" },
  theme: { ar: "المظهر", en: "Theme" },
  dark: { ar: "داكن", en: "Dark" },
  light: { ar: "فاتح", en: "Light" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "الإنجليزية", en: "English" },
  menu: { ar: "القائمة", en: "Menu" },
  footerRights: {
    ar: "CNSS-edu — منصة أدائية شخصية: ١٠٠ درس، ١٠٦٠ أداة، ٢٠٠ فكرة، مختبر ذكي",
    en: "CNSS-edu — personal performance platform: 100 lessons, 1060 tools, 200 ideas, smart lab",
  },

  // Dashboard
  welcome: { ar: "أهلاً بك مجدداً", en: "Welcome back" },
  learnerLevel: { ar: "مستوى المتعلم", en: "Learner level" },
  xp: { ar: "نقاط الخبرة", en: "XP" },
  streakDays: { ar: "أيام متتالية", en: "Day streak" },
  lessonsCompleted: { ar: "دروس مكتملة", en: "Lessons completed" },
  quizAccuracy: { ar: "دقة الاختبارات", en: "Quiz accuracy" },
  continueLearning: { ar: "أكمل التعلّم", en: "Continue learning" },
  startLearning: { ar: "ابدأ رحلة التعلّم", en: "Start your journey" },
  progressOverview: { ar: "نظرة عامة على التقدم", en: "Progress overview" },
  quickActions: { ar: "إجراءات سريعة", en: "Quick actions" },
  platformStats: { ar: "إحصائيات المنصة", en: "Platform stats" },
  lessonsCount: { ar: "درساً شاملاً", en: "Comprehensive lessons" },
  toolsCount: { ar: "أداة متخصصة", en: "Specialized tools" },
  projectsCount: { ar: "فكرة قابلة للربح", en: "Monetizable ideas" },
  quizQuestions: { ar: "سؤال اختباري", en: "Quiz questions" },
  modulesCount: { ar: "وحدة تعليمية", en: "Learning modules" },
  studyPath: { ar: "مسار التعلّم الكامل", en: "Full learning path" },
  level: { ar: "المستوى", en: "Level" },
  minutes: { ar: "دقيقة", en: "min" },
  lessonsWord: { ar: "درس", en: "lessons" },
  noActivity: { ar: "لا يوجد نشاط بعد — ابدأ بأول درس!", en: "No activity yet — start with the first lesson!" },
  recentActivity: { ar: "النشاط الأخير", en: "Recent activity" },

  // Levels
  beginner: { ar: "مبتدئ", en: "Beginner" },
  intermediate: { ar: "متوسط", en: "Intermediate" },
  advanced: { ar: "متقدم", en: "Advanced" },
  expert: { ar: "خبير", en: "Expert" },

  // Lessons
  browseLessons: { ar: "استعراض الدروس", en: "Browse lessons" },
  searchLessons: { ar: "ابحث في الدروس...", en: "Search lessons..." },
  allModules: { ar: "كل الوحدات", en: "All modules" },
  lessonOf: { ar: "درس", en: "Lesson" },
  keyPoints: { ar: "النقاط الجوهرية", en: "Key takeaways" },
  practicalCommands: { ar: "أوامر عملية", en: "Practical commands" },
  markComplete: { ar: "إتمام الدرس", en: "Mark as complete" },
  completed: { ar: "مكتمل", en: "Completed" },
  takeQuiz: { ar: "اختبر نفسك", en: "Take the quiz" },
  nextLesson: { ar: "الدرس التالي", en: "Next lesson" },
  prevLesson: { ar: "الدرس السابق", en: "Previous lesson" },
  backToLessons: { ar: "عودة إلى الدروس", en: "Back to lessons" },
  readTime: { ar: "زمن القراءة", en: "Read time" },
  lessonProgress: { ar: "تقدم الدروس", en: "Lesson progress" },
  filterLevel: { ar: "تصفية بالمستوى", en: "Filter by level" },
  tip: { ar: "نصيحة", en: "Tip" },

  // Quiz
  quiz: { ar: "اختبار", en: "Quiz" },
  startQuiz: { ar: "بدء الاختبار", en: "Start quiz" },
  question: { ar: "سؤال", en: "Question" },
  of: { ar: "من", en: "of" },
  next: { ar: "التالي", en: "Next" },
  finish: { ar: "إنهاء", en: "Finish" },
  yourScore: { ar: "نتيجتك", en: "Your score" },
  correctAnswer: { ar: "الإجابة الصحيحة", en: "Correct answer" },
  explanation: { ar: "الشرح", en: "Explanation" },
  retryQuiz: { ar: "إعادة الاختبار", en: "Retry quiz" },
  practiceMode: { ar: "وضع التدريب", en: "Practice mode" },
  examMode: { ar: "وضع الامتحان", en: "Exam mode" },
  moduleExam: { ar: "امتحان الوحدة", en: "Module exam" },
  finalExam: { ar: "الاختبار الشامل النهائي", en: "Final comprehensive exam" },
  randomPractice: { ar: "تدريب عشوائي", en: "Random practice" },
  selectModule: { ar: "اختر وحدة", en: "Select a module" },
  timedExam: { ar: "امتحان موقّت", en: "Timed exam" },
  timeLeft: { ar: "الوقت المتبقي", en: "Time left" },
  quizComplete: { ar: "اكتمل الاختبار", en: "Quiz complete" },
  correct: { ar: "صحيح", en: "Correct" },
  wrong: { ar: "خطأ", en: "Wrong" },
  perfectScore: { ar: "درجة كاملة! ممتاز!", en: "Perfect score! Excellent!" },
  passedExam: { ar: "اجتزت الاختبار", en: "You passed" },
  failedExam: { ar: "لم تجتز هذه المرة — راجع وحاول مجدداً", en: "Not this time — review and retry" },
  noQuestions: { ar: "لا توجد أسئلة", en: "No questions available" },
  quizHistory: { ar: "سجل الاختبارات", en: "Quiz history" },
  attempts: { ar: "المحاولات", en: "Attempts" },
  best: { ar: "الأفضل", en: "Best" },
  questionsCount: { ar: "عدد الأسئلة", en: "Questions" },
  examDesc: {
    ar: "١٠ أسئلة مختارة من الوحدة كلها، بنظام التقييم الفوري",
    en: "10 questions picked across the module with instant grading",
  },
  finalExamDesc: {
    ar: "٤٠ سؤالاً من كل المنهج — اجتزه بشهادة إتقان المنصة",
    en: "40 questions from the whole curriculum — pass it to earn the platform certificate",
  },
  randomDesc: {
    ar: "١٥ سؤالاً عشوائياً من جميع الوحدات",
    en: "15 random questions from all modules",
  },

  // Review / flashcards
  reviewTitle: { ar: "بطاقات المراجعة الذكية", en: "Smart review flashcards" },
  reviewDesc: {
    ar: "نظام التكرار المتباعد (Leitner) يثبّت المعلومات في ذاكرتك طويلة المدى",
    en: "Spaced repetition (Leitner system) locks knowledge into your long-term memory",
  },
  dueCards: { ar: "بطاقات مستحقة اليوم", en: "Cards due today" },
  totalCards: { ar: "إجمالي البطاقات", en: "Total cards" },
  masteredCards: { ar: "بطاقات متقنة", en: "Mastered cards" },
  startReview: { ar: "ابدأ المراجعة", en: "Start reviewing" },
  showAnswer: { ar: "أظهر الإجابة", en: "Show answer" },
  knewIt: { ar: "أعرفها", en: "I knew it" },
  almost: { ar: "تقريباً", en: "Almost" },
  forgot: { ar: "نسيتها", en: "Forgot" },
  reviewSessionDone: { ar: "انتهت جلسة المراجعة!", en: "Review session complete!" },
  noCardsYet: {
    ar: "لا توجد بطاقات بعد — أكمل دروساً أو أجب على اختبارات لتوليد بطاقات تلقائياً",
    en: "No cards yet — complete lessons or take quizzes to auto-generate cards",
  },
  generateFromLesson: { ar: "توليد بطاقات من الدروس المكتملة", en: "Generate cards from completed lessons" },
  cardsReviewed: { ar: "بطاقة تمت مراجعتها", en: "cards reviewed" },
  box: { ar: "صندوق", en: "Box" },

  // Tools
  toolsLibrary: { ar: "مكتبة أدوات الشبكات", en: "Networking tools library" },
  searchTools: { ar: "ابحث بالاسم أو الوسم...", en: "Search by name or tag..." },
  allCategories: { ar: "كل الفئات", en: "All categories" },
  platforms: { ar: "المنصات", en: "Platforms" },
  license: { ar: "الترخيص", en: "License" },
  difficulty: { ar: "الصعوبة", en: "Difficulty" },
  free: { ar: "مجاني", en: "Free" },
  opensource: { ar: "مفتوح المصدر", en: "Open source" },
  freemium: { ar: "مجاني جزئياً", en: "Freemium" },
  paid: { ar: "مدفوع", en: "Paid" },
  bookmark: { ar: "حفظ", en: "Bookmark" },
  bookmarked: { ar: "محفوظ", en: "Bookmarked" },
  exampleUsage: { ar: "مثال الاستخدام", en: "Example usage" },
  openWebsite: { ar: "فتح الموقع", en: "Open website" },
  resultsFound: { ar: "نتيجة", en: "results" },
  noToolsFound: { ar: "لا توجد أدوات مطابقة", en: "No matching tools" },
  cross: { ar: "عبر المنصات", en: "Cross-platform" },
  windows: { ar: "ويندوز", en: "Windows" },
  linux: { ar: "لينكس", en: "Linux" },
  mac: { ar: "ماك", en: "macOS" },
  web: { ar: "ويب", en: "Web" },
  android: { ar: "أندرويد", en: "Android" },
  ios: { ar: "iOS", en: "iOS" },

  // Projects
  ideasTitle: { ar: "٢٠٠ فكرة ومشروع مربح", en: "200 monetizable project ideas" },
  ideasDesc: {
    ar: "مهام ومشاريع رقمية جانبية تبني بها خبرتك وتربح منها مالاً حقيقياً",
    en: "Digital side projects that build your expertise and earn you real income",
  },
  searchProjects: { ar: "ابحث في المشاريع...", en: "Search projects..." },
  timeToMarket: { ar: "زمن الوصول للسوق", en: "Time to market" },
  revenuePotential: { ar: "إمكانية الربح", en: "Revenue potential" },
  howToMonetize: { ar: "طريقة الربح", en: "How to monetize" },
  skillsNeeded: { ar: "المهارات المطلوبة", en: "Skills needed" },
  actionSteps: { ar: "خطوات التنفيذ", en: "Action steps" },
  markAsDone: { ar: "أنجزتها", en: "Done" },
  ideasCompleted: { ar: "أفكار منجزة", en: "Ideas completed" },

  // Playground
  playgroundTitle: { ar: "المختبر التفاعلي", en: "Interactive playground" },
  playgroundDesc: {
    ar: "أدوات حسابية ومحاكيات عملية تطبّق ما تعلمته فوراً",
    en: "Calculators and simulators to instantly apply what you learned",
  },
  subnetCalculator: { ar: "حاسبة الشبكات الفرعية", en: "Subnet calculator" },
  binaryConverter: { ar: "محول الثنائي", en: "Binary converter" },
  portLookup: { ar: "بحث المنافذ", en: "Port lookup" },
  bandwidthCalc: { ar: "حاسبة زمن التنزيل", en: "Bandwidth calculator" },
  terminalSim: { ar: "محاكي الطرفية", en: "Terminal simulator" },
  tcpHandshake: { ar: "محاكي مصافحة TCP", en: "TCP handshake simulator" },
  packetJourney: { ar: "رحلة الحزمة عبر الطبقات", en: "Packet journey through layers" },
  osiExplorer: { ar: "مستكشف نموذج OSI", en: "OSI model explorer" },
  dnsWalkthrough: { ar: "محاكي استعلام DNS", en: "DNS resolution walkthrough" },
  cableCalc: { ar: "حاسبة الكابلات والقدرة", en: "Cable & power calculator" },

  // Achievements
  achievementsTitle: { ar: "أوسمة وإنجازات", en: "Badges & achievements" },
  unlocked: { ar: "مفتوح", en: "Unlocked" },
  locked: { ar: "مغلق", en: "Locked" },
  progress: { ar: "التقدم", en: "Progress" },
  totalAchievements: { ar: "إجمالي الإنجازات", en: "Total achievements" },

  // Settings
  resetProgress: { ar: "تصفير كل التقدم", en: "Reset all progress" },
  resetConfirm: {
    ar: "سيتم حذف كل تقدمك ونقاطك وبطاقاتك نهائياً. متابعة؟",
    en: "This permanently deletes all progress, XP and cards. Continue?",
  },
  confirm: { ar: "تأكيد", en: "Confirm" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  dataStored: { ar: "يتم حفظ تقدمك محلياً على جهازك", en: "Your progress is stored locally on your device" },
  syncStatus: { ar: "حالة المزامنة", en: "Sync status" },
  synced: { ar: "متزامن", en: "Synced" },
  offline: { ar: "غير متزامن — وضع محلي", en: "Offline — local mode" },

  // misc
  lesson: { ar: "الدرس", en: "Lesson" },
  module: { ar: "الوحدة", en: "Module" },
  words: { ar: "مصطلح", en: "terms" },
  yes: { ar: "نعم", en: "Yes" },
  no: { ar: "لا", en: "No" },
  close: { ar: "إغلاق", en: "Close" },
  copied: { ar: "تم النسخ!", en: "Copied!" },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  dir: "rtl" | "ltr";
  /** pick bilingual value */
  bi: (b: Bi | undefined) => string;
  /** translate UI key */
  t: (key: keyof typeof UI | string) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "ar",
  setLang: () => {},
  dir: "rtl",
  bi: (b) => b?.ar ?? "",
  t: (k) => String(k),
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ar";
    const saved = window.localStorage.getItem("nm-lang");
    return saved === "ar" || saved === "en" ? saved : "ar";
  });

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("nm-lang", l);
  };

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      dir: lang === "ar" ? "rtl" : "ltr",
      bi: (b) => (b ? (lang === "ar" ? b.ar : b.en) : ""),
      t: (k) => {
        const key = UI[String(k)];
        return key ? (lang === "ar" ? key.ar : key.en) : String(k);
      },
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
