import type { LessonInteractive } from "@/lib/types";

// M12 interactive widgets ("w:<lessonId>:<n>") — one checkpoint per lesson:
// classify (l111 user/kernel space · l115 which-OS · l118 multi-user traits),
// order (l112 OS eras · l113 Unix timeline), match (l114 layers · l116 the
// IT6004 OS↔version/distribution matching activity · l119 server roles ·
// l120 license traits), fill (l117 FHS paths).
// Rules: sectionIndex < sections.length · xp 8-15 · bilingual mobile-length ·
// fill bank = every answer + ≤3 distractors.
export const M12_INTERACTIVES: Record<string, LessonInteractive[]> = {
  // ── l111 · user space vs kernel space ──
  l111: [
    {
      kind: "classify",
      id: "w:l111:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "أين يعيش كل شيء؟", en: "Where does everything live?" },
      instructions: {
        ar: "اضغط العنصر ثم حدد: فضاء النواة أم فضاء المستخدم؟",
        en: "Tap an item, then decide: kernel space or user space?",
      },
      buckets: [
        { ar: "فضاء النواة (امتيازات كاملة)", en: "Kernel space (full privileges)" },
        { ar: "فضاء المستخدم (محمي ومحدود)", en: "User space (protected & limited)" },
      ],
      items: [
        { text: { ar: "جدولة العمليات وتوزيع وقت المعالج", en: "Process scheduling and CPU time sharing" }, bucket: 0 },
        { text: { ar: "سائق شبكة يخاطب البطاقة مباشرة", en: "A network driver talking straight to the card" }, bucket: 0 },
        { text: { ar: "إدارة الذاكرة الافتراضية وترقيم الصفحات", en: "Virtual memory management and paging" }, bucket: 0 },
        { text: { ar: "متصفحك وهو يعرض هذا الدرس", en: "Your browser rendering this lesson" }, bucket: 1 },
        { text: { ar: "الصَدَفة bash التي تكتب فيها أوامرك", en: "The bash shell you type commands into" }, bucket: 1 },
        { text: { ar: "محرر النصوص الذي تعدّل به ملفاتك", en: "The text editor you edit files with" }, bucket: 1 },
      ],
    },
  ],

  // ── l112 · order the OS eras ──
  l112: [
    {
      kind: "order",
      id: "w:l112:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "رتّب عصور أنظمة التشغيل", en: "Order the OS eras" },
      instructions: {
        ar: "اضغط العصور بالترتيب الزمني الصحيح من البطاقات المثقبة إلى السحابة",
        en: "Tap the eras in correct chronological order, from punched cards to the cloud",
      },
      items: [
        { ar: "معالجة بالدفعات عبر البطاقات المثقبة", en: "Batch processing on punched cards" },
        { ar: "تعدد البرامج — لا خمول أثناء الإدخال/الإخراج", en: "Multiprogramming — no idling during I/O" },
        { ar: "الاقتسام الزمني — شرائح معالج لكل مستخدم", en: "Time-sharing — CPU slices per user" },
        { ar: "الحواسيب الشخصية والواجهات الرسومية", en: "Personal computers and GUIs" },
        { ar: "الهواتف الذكية بأنظمة بجذور يونكس", en: "Smartphones running Unix-rooted systems" },
        { ar: "السحابة والحاويات المشتركة", en: "Cloud and shared containers" },
      ],
    },
  ],

  // ── l113 · order the Unix timeline ──
  l113: [
    {
      kind: "order",
      id: "w:l113:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "رتّب خط يونكس الزمني", en: "Order the Unix timeline" },
      instructions: {
        ar: "اضغط المحطات بالترتيب من مختبرات بل 1969 حتى لينكس 1991",
        en: "Tap the milestones in order, from Bell Labs 1969 to Linux 1991",
      },
      items: [
        { ar: "1969 — تومسون وريتشي يبنيان يونكس على PDP-7", en: "1969 — Thompson & Ritchie build Unix on a PDP-7" },
        { ar: "1973 — إعادة كتابة النظام بلغة C", en: "1973 — the system rewritten in C" },
        { ar: "1974 — ورقة CACM تعرّف العالم به", en: "1974 — the CACM paper introduces it to the world" },
        { ar: "1977 — بيركلي تطلق تفرع BSD", en: "1977 — Berkeley releases the BSD branch" },
        { ar: "1983 — AT&T تطلق System V وتبدأ الحروب", en: "1983 — AT&T ships System V; the wars begin" },
        { ar: "1988 — معيار POSIX يوحّد الواجهات", en: "1988 — POSIX unifies the interfaces" },
        { ar: "1991 — تورفالدس يعلن نواة لينكس", en: "1991 — Torvalds announces the Linux kernel" },
      ],
    },
  ],

  // ── l114 · match architecture layers to their roles ──
  l114: [
    {
      kind: "match",
      id: "w:l114:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "طابق طبقة معمارية يونكس بدورها", en: "Match each Unix architecture layer to its role" },
      instructions: {
        ar: "اضغط طبقة من اليمين ثم دورها الصحيح — كما في مخطط المحاضرة تماماً",
        en: "Tap a layer, then its correct role — exactly as in the lecture's diagram",
      },
      pairs: [
        {
          left: { ar: "تطبيقات المستخدم", en: "User applications" },
          right: { ar: "احتياجات الناس: تصفح وكتابة وخدمة", en: "People's needs: browsing, writing, serving" },
        },
        {
          left: { ar: "أوامر يونكس والمكتبات", en: "Unix commands & libraries" },
          right: { ar: "تترجم الطلب إلى نداء موحد وتنسّق النتيجة", en: "Translate requests into unified calls and format results" },
        },
        {
          left: { ar: "واجهة استدعاءات النظام", en: "System-call interface" },
          right: { ar: "البوابة الرسمية الوحيدة إلى النواة", en: "The one official gateway into the kernel" },
        },
        {
          left: { ar: "النواة (Kernel)", en: "The kernel" },
          right: { ar: "مدير الموارد: عمليات وذاكرة وملفات وأجهزة", en: "The resource manager: processes, memory, files, devices" },
        },
        {
          left: { ar: "العتاد", en: "Hardware" },
          right: { ar: "التنفيذ الفيزيائي: معالج وذاكرة وأقراص", en: "Physical execution: CPU, memory, disks" },
        },
      ],
    },
  ],

  // ── l115 · which OS does what ──
  l115: [
    {
      kind: "classify",
      id: "w:l115:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "من يملك هذه الساحة؟", en: "Who owns this arena?" },
      instructions: {
        ar: "اضغط السيناريو ثم النظام الأقوى فيه: لينكس/يونكس أم ويندوز أم ماك",
        en: "Tap a scenario, then the system strongest in it: Linux/Unix, Windows, or Mac",
      },
      buckets: [
        { ar: "لينكس / يونكس", en: "Linux / Unix" },
        { ar: "ويندوز", en: "Windows" },
        { ar: "macOS", en: "macOS" },
      ],
      items: [
        { text: { ar: "يشغّل أغلب خوادم الإنترنت وسحابة AWS", en: "Runs most Internet servers and the AWS cloud" }, bucket: 0 },
        { text: { ar: "أندرويد مبني على نواته", en: "Android is built on its kernel" }, bucket: 0 },
        { text: { ar: "خادم مختبراتك يعمل به", en: "Your lab server runs it" }, bucket: 0 },
        { text: { ar: "واجهته WinAPI بوحدات kernel32 و user32", en: "Its interface is WinAPI with kernel32 and user32" }, bucket: 1 },
        { text: { ar: "القلعة الأولى للألعاب والبرامج المكتبية", en: "The first home of gaming and office software" }, bucket: 1 },
        { text: { ar: "نظام مبيعات أجهزة أنيقة بجذور BSD للتصميم والإبداع", en: "A stylish BSD-rooted system sold with elegant hardware for design and creativity" }, bucket: 2 },
      ],
    },
  ],

  // ── l116 · THE IT6004 matching activity: OS ↔ version/distribution ──
  l116: [
    {
      kind: "match",
      id: "w:l116:1",
      sectionIndex: 0,
      xp: 15,
      title: { ar: "نشاط المطابقة: نظام ↔ إصدار/توزيعة", en: "The matching activity: OS ↔ version/distribution" },
      instructions: {
        ar: "نشاط مختبرك الأول: اضغط نظام التشغيل ثم أمثلة إصداراته أو توزيعاته الصحيحة",
        en: "Your first lab's activity: tap an OS, then its correct version or distribution examples",
      },
      pairs: [
        {
          left: { ar: "Windows", en: "Windows" },
          right: { ar: "Vista · XP · 7 · 11", en: "Vista · XP · 7 · 11" },
        },
        {
          left: { ar: "Unix التجارية", en: "Commercial Unix" },
          right: { ar: "HP-UX · Solaris · AIX", en: "HP-UX · Solaris · AIX" },
        },
        {
          left: { ar: "Linux", en: "Linux" },
          right: { ar: "Ubuntu · Red Hat · Suse", en: "Ubuntu · Red Hat · Suse" },
        },
        {
          left: { ar: "macOS", en: "macOS" },
          right: { ar: "10.6 Snow Leopard · 13 Ventura", en: "10.6 Snow Leopard · 13 Ventura" },
        },
        {
          left: { ar: "Amazon Linux 2", en: "Amazon Linux 2" },
          right: { ar: "توزيعة عائلة Red Hat — بيئة مختبراتك على AWS", en: "A Red Hat family distro — your AWS lab environment" },
        },
      ],
    },
  ],

  // ── l117 · fill the FHS paths ──
  l117: [
    {
      kind: "fill",
      id: "w:l117:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل مسارات FHS", en: "Complete the FHS paths" },
      instructions: {
        ar: "اختر من البنك المسار المناسب لكل فراغ حسب معيار FHS",
        en: "Pick the right path for each blank from the bank, per the FHS standard",
      },
      template: {
        ar: "تعيش ملفاتك الشخصية في ____ ، وتقرأ سجلات النظام من ____ ، وتعدّل إعدادات الخادم في ____ ، بينما تظهر الأجهزة كملفات تحت ____.",
        en: "Your personal files live in ____, system logs are read from ____, server configs are edited in ____, while devices appear as files under ____.",
      },
      blanks: [
        { answer: { ar: "/home", en: "/home" }, hint: { ar: "بيتك في الشجرة", en: "Your home in the tree" } },
        { answer: { ar: "/var", en: "/var" }, hint: { ar: "البيانات المتغيرة", en: "Variable data" } },
        { answer: { ar: "/etc", en: "/etc" }, hint: { ar: "بيت الإعدادات", en: "Home of configs" } },
        { answer: { ar: "/dev", en: "/dev" }, hint: { ar: "ملفات الأجهزة", en: "Device files" } },
      ],
      bank: [
        { ar: "/home", en: "/home" },
        { ar: "/var", en: "/var" },
        { ar: "/etc", en: "/etc" },
        { ar: "/dev", en: "/dev" },
        { ar: "/usr", en: "/usr" },
        { ar: "/tmp", en: "/tmp" },
        { ar: "/bin", en: "/bin" },
      ],
    },
  ],

  // ── l118 · multi-user vs single-user aspects ──
  l118: [
    {
      kind: "classify",
      id: "w:l118:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أثر تعدد المستخدمين", en: "Effects of being multi-user" },
      instructions: {
        ar: "اضغط الجانب ثم صنفه: قوة التصميم متعدد المستخدمين أم قيد بيئة المستخدم الواحد؟",
        en: "Tap an aspect, then classify it: a multi-user design strength or a single-user limitation?",
      },
      buckets: [
        { ar: "قوة تعدد المستخدمين (يونكس)", en: "Multi-user strength (Unix)" },
        { ar: "قيد بيئة المستخدم الواحد", en: "Single-user limitation" },
      ],
      items: [
        { text: { ar: "عشرة مهندسين يعملون على الخادم نفسه عبر SSH في اللحظة ذاتها", en: "Ten engineers working on one server over SSH at the same moment" }, bucket: 0 },
        { text: { ar: "كل مستخدم له UID وملفاته المحمية بصلاحيات", en: "Every user has a UID and permission-protected files" }, bucket: 0 },
        { text: { ar: "سجل تدقيق يوثّق من فعل ماذا ومتى", en: "An audit log recording who did what and when" }, bucket: 0 },
        { text: { ar: "فيروس واحد يعدّل ملفات كل مستخدمي الجهاز بحرية", en: "One virus freely modifying every user's files on the machine" }, bucket: 1 },
        { text: { ar: "البرامج كلها تعمل بصلاحيات مالك الجهاز الكاملة", en: "All programs running with the machine owner's full privileges" }, bucket: 1 },
        { text: { ar: "تبديل المستخدم يتطلب إعادة تشغيل الجهاز", en: "Switching users requires rebooting the machine" }, bucket: 1 },
      ],
    },
  ],

  // ── l119 · match server roles to their software ──
  l119: [
    {
      kind: "match",
      id: "w:l119:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "طابق الدور الخادمي ببرمجيته", en: "Match the server role to its software" },
      instructions: {
        ar: "اضغط الدور ثم البرمجية الشهيرة التي تشغّله على لينكس",
        en: "Tap a role, then the famous software running it on Linux",
      },
      pairs: [
        {
          left: { ar: "خادم ويب", en: "Web server" },
          right: { ar: "Apache", en: "Apache" },
        },
        {
          left: { ar: "خادم قواعد بيانات", en: "Database server" },
          right: { ar: "PostgreSQL · Oracle", en: "PostgreSQL · Oracle" },
        },
        {
          left: { ar: "خادم أسماء النطاقات DNS", en: "DNS server" },
          right: { ar: "BIND", en: "BIND" },
        },
        {
          left: { ar: "خادم بريد", en: "Mail server" },
          right: { ar: "Postfix · Dovecot", en: "Postfix · Dovecot" },
        },
        {
          left: { ar: "نظام أندرويد", en: "Android" },
          right: { ar: "نواة لينكس", en: "The Linux kernel" },
        },
      ],
    },
  ],

  // ── l120 · match licenses to their traits ──
  l120: [
    {
      kind: "match",
      id: "w:l120:1",
      sectionIndex: 4,
      xp: 12,
      title: { ar: "طابق الترخيص بسمته", en: "Match the license to its trait" },
      instructions: {
        ar: "اضغط الترخيص ثم السمة التي تميزه عن غيره",
        en: "Tap a license, then the trait that sets it apart",
      },
      pairs: [
        {
          left: { ar: "GPL", en: "GPL" },
          right: { ar: "كوبيلِفت: وزّع نسخة معدلة؟ افتح شيفرتها", en: "Copyleft: distribute a modified copy? Open its source" },
        },
        {
          left: { ar: "MIT", en: "MIT" },
          right: { ar: "تصريح متساهل — فقط اذكر المؤلفين", en: "A permissive grant — just credit the authors" },
        },
        {
          left: { ar: "الاحتكاري", en: "Proprietary" },
          right: { ar: "الشراء حق استخدام فقط — بلا دراسة ولا تعديل", en: "Buying grants usage only — no study, no modification" },
        },
        {
          left: { ar: "نواة لينكس", en: "The Linux kernel" },
          right: { ar: "أشهر مشروع مرخّص بـ GPL", en: "The most famous GPL-licensed project" },
        },
      ],
    },
  ],
};
