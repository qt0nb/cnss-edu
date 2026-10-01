import type { LessonInteractive } from "@/lib/types";

// M13 interactive widgets ("w:<lessonId>:<n>") — one checkpoint per lesson,
// embedded after a relevant section of the m13 Unix-lab lessons.
// Kind mix: order ×3 (l121, l122, l130) · match ×3 (l123, l125, l128)
// classify ×2 (l124, l127) · fill ×2 (l126, l129).
// Fill banks contain every answer (exact strings) plus ≤3 distractors.

export const M13_INTERACTIVES: Record<string, LessonInteractive[]> = {
  l121: [
    {
      kind: "order",
      id: "w:l121:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "رتّب خطوات الدخول الأولى", en: "Order the first-login steps" },
      instructions: {
        ar: "اضغط الخطوات بالترتيب الصحيح كما في ورقة المختبر الأولى",
        en: "Tap the steps in the correct order, as written in the first lab sheet",
      },
      items: [
        { ar: "افتح Putty من قائمة البرامج", en: "Open Putty from the programs menu" },
        { ar: "أدخل student1.bptest.cloud في خانة Host Name", en: "Type student1.bptest.cloud in the Host Name field" },
        { ar: "اضبط النافذة 120 عمودًا × 20 صفًا", en: "Set the window to 120 columns × 20 rows" },
        { ar: "اضغط Open لبدء الاتصال", en: "Click Open to start the connection" },
        { ar: "اكتب yes لقبول مفتاح المضيف أول مرة", en: "Type yes to accept the host key the first time" },
        { ar: "أدخل A20161234 ثم كلمة المرور", en: "Enter A20161234 then the password" },
      ],
    },
  ],

  l122: [
    {
      kind: "order",
      id: "w:l122:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "رتّب حوار passwd", en: "Order the passwd dialogue" },
      instructions: {
        ar: "اضغط أسئلة الأمر بالترتيب الصحيح حتى النجاح",
        en: "Tap the command's questions in the correct order until success",
      },
      items: [
        { ar: "اكتب الأمر passwd", en: "Type the passwd command" },
        { ar: "أدخل كلمة المرور الحالية", en: "Enter the current password" },
        { ar: "أدخل كلمة المرور الجديدة", en: "Enter the new password" },
        { ar: "أعد كتابة الجديدة للتأكيد", en: "Retype the new one to confirm" },
        { ar: "اقرأ رسالة النجاح ثم اخرج بـ exit", en: "Read the success message, then log out with exit" },
      ],
    },
  ],

  l123: [
    {
      kind: "match",
      id: "w:l123:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "طابق أمر بوظيفته", en: "Match each command to its purpose" },
      instructions: {
        ar: "اضغط أمرًا من العمود الأول ثم وظيفته الصحيحة",
        en: "Tap a command, then its correct purpose",
      },
      pairs: [
        {
          left: { ar: "pwd", en: "pwd" },
          right: { ar: "يطبع المسار الكامل لموقعك", en: "Prints the full path of your location" },
        },
        {
          left: { ar: "ls -l", en: "ls -l" },
          right: { ar: "قائمة طويلة بالصلاحيات والحجم والتاريخ", en: "Long listing with permissions, size and date" },
        },
        {
          left: { ar: "ls -a", en: "ls -a" },
          right: { ar: "يكشف الملفات المخفية النقطية", en: "Reveals hidden dot files" },
        },
        {
          left: { ar: "cd ..", en: "cd .." },
          right: { ar: "يصعد درجة إلى المجلد الأب", en: "Climbs one level to the parent folder" },
        },
        {
          left: { ar: "cd ~", en: "cd ~" },
          right: { ar: "قفزة مباشرة إلى مجلد المنزل", en: "A direct jump to the home folder" },
        },
      ],
    },
  ],

  l124: [
    {
      kind: "classify",
      id: "w:l124:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "صنّف مصير الملف", en: "Classify each file's fate" },
      instructions: {
        ar: "اضغط الأمر ثم ما يفعله فعلًا بالملف",
        en: "Tap a command, then what it actually does to the file",
      },
      buckets: [
        { ar: "حذف نهائي لا رجعة فيه", en: "Permanent delete, no undo" },
        { ar: "نقل أو إعادة تسمية", en: "Move or rename" },
        { ar: "نسخ أو إنشاء جديد", en: "Copy or create new" },
      ],
      items: [
        { text: { ar: "rm notes.txt", en: "rm notes.txt" }, bucket: 0 },
        { text: { ar: "rm -r oldproject", en: "rm -r oldproject" }, bucket: 0 },
        { text: { ar: "mv draft.txt final.txt", en: "mv draft.txt final.txt" }, bucket: 1 },
        { text: { ar: "mv report.sh archive/", en: "mv report.sh archive/" }, bucket: 1 },
        { text: { ar: "cp notes.txt backup.txt", en: "cp notes.txt backup.txt" }, bucket: 2 },
        { text: { ar: "mkdir -p labs/linux", en: "mkdir -p labs/linux" }, bucket: 2 },
      ],
    },
  ],

  l125: [
    {
      kind: "match",
      id: "w:l125:1",
      sectionIndex: 2,
      xp: 14,
      title: { ar: "طابق الثماني بالرمزي والمعنى", en: "Match octal to symbolic and meaning" },
      instructions: {
        ar: "اضغط الرقم الثماني ثم رمزه ومعناه الصحيح — تدريب جدول الامتحان",
        en: "Tap the octal number, then its symbolic form and meaning — exam-table practice",
      },
      pairs: [
        {
          left: { ar: "755", en: "755" },
          right: { ar: "rwxr-xr-x — المالك كامل والبقية قراءة وتنفيذ", en: "rwxr-xr-x — owner full, others read + execute" },
        },
        {
          left: { ar: "644", en: "644" },
          right: { ar: "rw-r--r-- — المالك يكتب والبقية قراءة فقط", en: "rw-r--r-- — owner writes, others read only" },
        },
        {
          left: { ar: "700", en: "700" },
          right: { ar: "rwx------ — المالك كامل ولا سواه", en: "rwx------ — owner full and nobody else" },
        },
        {
          left: { ar: "600", en: "600" },
          right: { ar: "rw------- — ملف سري كالمفاتيح الخاصة", en: "rw------- — a secret file like private keys" },
        },
        {
          left: { ar: "777", en: "777" },
          right: { ar: "rwxrwxrwx — الجميع بكل الحقوق (خطر)", en: "rwxrwxrwx — everyone, everything (dangerous)" },
        },
      ],
    },
  ],

  l126: [
    {
      kind: "fill",
      id: "w:l126:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل حقول /etc/passwd", en: "Complete the /etc/passwd fields" },
      instructions: {
        ar: "اختر من البنك القيمة الصحيحة لكل فراغ",
        en: "Pick the correct value for each blank from the bank",
      },
      template: {
        ar: "يتكوّن كل سطر في /etc/passwd من ____ حقول؛ الحقل الثاني حرف ____ ويعني أن كلمة المرور في /etc/shadow، والحقل الثالث هو رقم المستخدم ____، والحقل الأخير هو الـ____ التي تُفتح عند الدخول مثل /bin/bash.",
        en: "Every /etc/passwd line has ____ fields; the second field, the letter ____, means the password lives in /etc/shadow; the third field is the user's ____ number; and the last field is the login ____ such as /bin/bash.",
      },
      blanks: [
        { answer: { ar: "7", en: "7" }, hint: { ar: "عدّ النقطتين الفاصلات", en: "Count the separating colons" } },
        { answer: { ar: "x", en: "x" }, hint: { ar: "حرف واحد صغير", en: "One small letter" } },
        { answer: { ar: "UID", en: "UID" }, hint: { ar: "الاختصار الشهير لرقم المستخدم", en: "The famous user-number acronym" } },
        { answer: { ar: "الشل", en: "shell" }, hint: { ar: "ما يفسّر اسم /bin/bash", en: "What /bin/bash is" } },
      ],
      bank: [
        { ar: "7", en: "7" },
        { ar: "x", en: "x" },
        { ar: "UID", en: "UID" },
        { ar: "الشل", en: "shell" },
        { ar: "5", en: "5" },
        { ar: "GID", en: "GID" },
      ],
    },
  ],

  l127: [
    {
      kind: "classify",
      id: "w:l127:1",
      sectionIndex: 4,
      xp: 10,
      title: { ar: "صنّف الإشارة: مهذبة أم قسرية؟", en: "Classify the signal: polite or forced?" },
      instructions: {
        ar: "اضغط الإشارة ثم نوعها بحسب قابليتها للالتقاط والتنظيف",
        en: "Tap a signal, then its type by whether it can be caught and cleaned up",
      },
      buckets: [
        { ar: "مهذبة: تُلتقط وتسمح بالتنظيف", en: "Polite: catchable, allows cleanup" },
        { ar: "قسرية: لا تُلتقط ولا تُعالج", en: "Forced: cannot be caught or handled" },
      ],
      items: [
        { text: { ar: "SIGTERM — kill 2240 الافتراضي", en: "SIGTERM — the default kill 2240" }, bucket: 0 },
        { text: { ar: "SIGINT — Ctrl+C في الطرفية", en: "SIGINT — Ctrl+C in the terminal" }, bucket: 0 },
        { text: { ar: "SIGHUP — إعادة قراءة الإعدادات", en: "SIGHUP — re-reading configuration" }, bucket: 0 },
        { text: { ar: "SIGKILL — kill -9 2255", en: "SIGKILL — kill -9 2255" }, bucket: 1 },
      ],
    },
  ],

  l128: [
    {
      kind: "match",
      id: "w:l128:1",
      sectionIndex: 4,
      xp: 10,
      title: { ar: "طابق مهمة yum بمكافئها apt", en: "Match each yum task to its apt twin" },
      instructions: {
        ar: "اضغط أمر yum ثم ما يقابله في عائلة Debian/Ubuntu",
        en: "Tap a yum command, then its Debian/Ubuntu family equivalent",
      },
      pairs: [
        {
          left: { ar: "yum info nginx", en: "yum info nginx" },
          right: { ar: "apt show nginx", en: "apt show nginx" },
        },
        {
          left: { ar: "yum makecache (تحديث الفهارس)", en: "yum makecache (refresh indexes)" },
          right: { ar: "apt update", en: "apt update" },
        },
        {
          left: { ar: "yum update (ترقية المثبّت)", en: "yum update (upgrade installed)" },
          right: { ar: "apt upgrade", en: "apt upgrade" },
        },
        {
          left: { ar: "yum erase htop", en: "yum erase htop" },
          right: { ar: "apt remove htop", en: "apt remove htop" },
        },
        {
          left: { ar: "yum history undo N", en: "yum history undo N" },
          right: { ar: "لا مكافئ مباشر في apt", en: "No direct apt equivalent" },
        },
      ],
    },
  ],

  l129: [
    {
      kind: "fill",
      id: "w:l129:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "أكمل الأنبوب الناقص", en: "Complete the missing pipeline" },
      instructions: {
        ar: "اختر من البنك الأداة أو الرمز الصحيح لكل فراغ",
        en: "Pick the correct tool or symbol for each blank from the bank",
      },
      template: {
        ar: "لعدّ عمليات sshd نكتب: ps aux | ____ sshd | ____ -l، ولإلحاق النتيجة بملف سجل دون مسح القديم نستخدم ____ بدلاً من >.",
        en: "To count sshd processes we write: ps aux | ____ sshd | ____ -l, and to append the result to a log file without erasing it we use ____ instead of >.",
      },
      blanks: [
        { answer: { ar: "grep", en: "grep" }, hint: { ar: "المصفّي الذي يرشّح الأسطر", en: "The filter that picks lines" } },
        { answer: { ar: "wc", en: "wc" }, hint: { ar: "أداة العدّ", en: "The counting tool" } },
        { answer: { ar: ">>", en: ">>" }, hint: { ar: "رمز الإلحاق لا الاستبدال", en: "The append, not overwrite, operator" } },
      ],
      bank: [
        { ar: "grep", en: "grep" },
        { ar: "wc", en: "wc" },
        { ar: ">>", en: ">>" },
        { ar: "sort", en: "sort" },
        { ar: ">", en: ">" },
      ],
    },
  ],

  l130: [
    {
      kind: "order",
      id: "w:l130:1",
      sectionIndex: 2,
      xp: 14,
      title: { ar: "رتّب خطوات تنفيذ السكربت", en: "Order the script execution steps" },
      instructions: {
        ar: "اضغط الخطوات بالترتيب من كتابة السكربت حتى التحقق من نتيجته",
        en: "Tap the steps in order, from writing the script to checking its result",
      },
      items: [
        { ar: "اكتب السكربت في nano وابدأه بـ #!/bin/bash", en: "Write the script in nano, starting with #!/bin/bash" },
        { ar: "احفظ بـ Ctrl+O واخرج بـ Ctrl+X", en: "Save with Ctrl+O and exit with Ctrl+X" },
        { ar: "امنحه التنفيذ: chmod +x backup.sh", en: "Grant execution: chmod +x backup.sh" },
        { ar: "شغّله: ./backup.sh labs", en: "Run it: ./backup.sh labs" },
        { ar: "تحقق من النتيجة: ls وcat backup.log", en: "Verify the result: ls and cat backup.log" },
      ],
    },
  ],
};
