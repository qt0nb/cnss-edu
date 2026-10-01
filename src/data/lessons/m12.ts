import type { Lesson } from "@/lib/types";

// ─── Module 12 · Operating Systems & Unix (BPT IT6004-aligned) ──────────
// 10 lessons l111..l120 — mirrors IT6004 Topic-1 lecture material:
// OS as middleware/resource manager, Stallings layers diagram, REQUEST/REPLY,
// API vs UI/CLI (math.h, mkdir), WinAPI vs POSIX, Unix history & POSIX,
// OS↔Version↔Distribution matching activity, FHS, multi-user security,
// Linux servers + Bahrain/Gulf job market, Unix philosophy & free software.
export const m12_LESSONS: Lesson[] = [
  // ── l111 · What is an Operating System? The Resource Manager ─────────
  {
    id: "l111",
    moduleId: "m12",
    order: 1,
    level: "beginner",
    title: {
      ar: "ما هو نظام التشغيل؟ مدير الموارد",
      en: "What is an Operating System? The Resource Manager",
    },
    summary: {
      ar: "نظام التشغيل هو الوسيط الذي يقف بين العتاد والتطبيقات: يدير المعالج والذاكرة والملفات والأجهزة والأمان، ويحميك من برمجة المعدن المكشوف مباشرة — المفهوم الافتتاحي في مادة أنظمة يونكس.",
      en: "The OS is the middleware standing between hardware and applications: it manages the CPU, memory, files, devices and security, and spares you programming the bare metal — the opening concept of the Unix Systems course.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "التعريف: الوسيط بين العتاد والتطبيقات", en: "The Definition: Middleware Between Hardware and Apps" },
        body: {
          ar: "تخيّل أنك اشتريت حاسوباً بلا أي برمجيات: معالج وذاكرة وقرص وشاشة، لكن لا توجد أي طريقة مريحة لإعطائه الأوامر. سيكون عليك كتابة شيفرة تتعامل مع كل تفصيلة في العتاد بنفسك — هذا ما نسميه برمجة المعدن المكشوف (Bare Metal).\n\nنظام التشغيل (Operating System) هو طبقة البرمجيات التي تقف بين العتاد من الأسفل والتطبيقات من الأعلى. وهو حرفياً «الوسيط» (Middleware) الذي تصفه محاضرات مادة أنظمة يونكس (IT6004) في البوليتكنيك: التطبيقات لا تلمس العتاد أبداً، بل تطلب الخدمة من النظام، والنظام يخاطب العتاد نيابة عنها.\n\n- الطبقة العلوية: تطبيقاتك — متصفح، محرر نصوص، خادم ويب\n- الطبقة الوسطى: نظام التشغيل — الوسيط المدير\n- الطبقة السفلية: العتاد — معالج، ذاكرة، أقراص، بطاقات شبكة\n\nكل ضغطة زر تؤديها الآن مرّت عبر هذه الطبقات مرات عديدة قبل أن يظهر أثرها على الشاشة.",
          en: "Imagine buying a computer with no software at all: CPU, memory, disk and screen — but no comfortable way to give it commands. You would have to write code that handles every hardware detail yourself. That is called programming the bare metal.\n\nAn operating system is the software layer standing between hardware below and applications above. It is literally the middleware your IT6004 Unix Systems lectures at the Polytechnic describe: applications never touch the hardware — they request a service from the OS, and the OS speaks to the hardware on their behalf.\n\n- Top layer: your applications — browser, text editor, web server\n- Middle layer: the OS — the managing middleware\n- Bottom layer: hardware — CPU, RAM, disks, network cards\n\nEvery click you make right now crossed these layers several times before anything appeared on screen.",
        },
        diagram: {
          kind: "layers",
          title: { ar: "طبقات البرمجيات من التطبيق إلى العتاد", en: "Software layers from the application down to hardware" },
          items: [
            { ar: "تطبيقات المستخدم (متصفح، محرر، خادم ويب)", en: "User applications (browser, editor, web server)" },
            { ar: "أوامر يونكس والمكتبات (ls، libc، mkdir)", en: "Unix commands & libraries (ls, libc, mkdir)" },
            { ar: "واجهة استدعاءات النظام — البوابة الرسمية", en: "System-call interface — the official gateway" },
            { ar: "النواة (Kernel): مدير الموارد الحقيقي", en: "The kernel — the real resource manager" },
            { ar: "العتاد: معالج، ذاكرة، أقراص، شبكة", en: "Hardware: CPU, memory, disks, network" },
          ],
        },
      },
      {
        heading: { ar: "مدير الموارد: الوظيفة الأولى للنظام", en: "The Resource Manager: The OS's First Job" },
        table: {
          caption: { ar: "الموارد الخمسة التي يديرها نظام التشغيل", en: "The five resources an operating system manages" },
          headers: [
            { ar: "المورد", en: "Resource" },
            { ar: "ماذا يفعل النظام", en: "What the OS does" },
            { ar: "مثال قرار يومي", en: "Example everyday decision" },
          ],
          rows: [
            [
              { ar: "المعالج والعمليات", en: "CPU & processes" },
              { ar: "يقسّم وقت المعالج بين البرامج المتنافسة", en: "Splits CPU time among competing programs" },
              { ar: "من يحصل على الدورة التالية؟", en: "Who gets the next CPU cycle?" },
            ],
            [
              { ar: "الذاكرة", en: "Memory" },
              { ar: "يوزّع ذاكرة RAM ويحمي منطقة كل برنامج", en: "Allocates RAM and protects each program's region" },
              { ar: "برنامج يطلب 500 ميجابايت: نوافق؟", en: "A program asks for 500 MB — allow it?" },
            ],
            [
              { ar: "الملفات والتخزين", en: "Files & storage" },
              { ar: "ينظّم القرص في ملفات ومجلدات وصلاحيات", en: "Organizes the disk into files, folders and permissions" },
              { ar: "أين نكتب هذا الملف ومن يقرؤه؟", en: "Where to write this file, and who may read it?" },
            ],
            [
              { ar: "الأجهزة", en: "Devices" },
              { ar: "يوحّد التعامل مع الشبكة والطابعات ولوحات المفاتيح عبر السائقين", en: "Unifies access to network, printers, keyboards via drivers" },
              { ar: "بطاقة شبكة وصلت رسالة: من يستلمها؟", en: "A network card received a frame — who gets it?" },
            ],
            [
              { ar: "الأمان والحماية", en: "Security & protection" },
              { ar: "يعزل المستخدمين والعمليات عن بعضها", en: "Isolates users and processes from each other" },
              { ar: "عملية تطلب ملفاً لا تملكه: نرفض", en: "A process requests a file it does not own — refuse" },
            ],
          ],
        },
        body: {
          ar: "أدق تعريف لنظام التشغيل هو «مدير الموارد» (Resource Manager): جهازك يحتوي موارد محدودة — معالج واحد أو بضعة أنوية، وذاكرة محدودة، وقرص واحد — بينما تطلب عشرات البرامج ومئات العمليات نصيبها منها في اللحظة نفسها.\n\nبدون مدير عادل وحازم لحصل الفوضى: برنامج جائع يلتهم الذاكرة كلها، وآخر يدور في حلقة لا نهائية يجمّد الجهاز كله. نظام التشغيل هو الحَكَم الذي يوزّع، ويعزل، ويحمي.\n\n- يعزل: عطل برنامج واحد لا يسقط النظام كله\n- يوحّد: نفس الأوامر تعمل على أجهزة مختلفة تماماً\n- يحمي: لا عملية تعبث بذاكرة جارتها أو تقرأ ملفات غيرها",
          en: "The sharpest definition of an OS is a resource manager: your machine has limited resources — one CPU or a few cores, finite RAM, one disk — while dozens of programs and hundreds of processes demand their share at the same instant.\n\nWithout a firm, fair arbiter you would get chaos: one greedy program devours all memory, another spins in an infinite loop and freezes everything. The operating system is the judge that distributes, isolates and protects.\n\n- Isolates: one crashing program does not sink the whole system\n- Unifies: the same commands work on wildly different machines\n- Protects: no process tampers with its neighbor's memory or reads others' files",
        },
      },
      {
        heading: { ar: "فضاء المستخدم وفضاء النواة", en: "User Space vs Kernel Space" },
        body: {
          ar: "يقسم نظام التشغيل عالم البرمجيات إلى مملكتين منفصلتين:\n\n- فضاء النواة (Kernel Space): قلب النظام المتيقظ، ينفّذ بامتيازات كاملة ويتحدث إلى العتاد مباشرة — هنا تعيش الجدولة وإدارة الذاكرة والسائقون\n- فضاء المستخدم (User Space): حيث تعمل تطبيقاتك والصَدَفة والأدوات، بامتيازات محدودة ومحاطة بأسوار الحماية\n\nكيف يعبر البرنامج الحدود؟ عبر بوابة رسمية واحدة فقط: استدعاء النظام (System Call). عندما يطلب برنامجك قراءة ملف، فهو لا يلمس القرص؛ بل يطرق باب النواة ويقول: «اقرأ لي هذا الملف»، والنواة تنفّذ وتعيد الجواب.\n\nهذا الفصل هو أساس الاستقرار والأمان معاً: خطأ في فضاء المستخدم يسقط برنامجاً واحداً، أما خطأ في النواة فقد يسقط الجهاز كله — ولهذا تُكتب شيفرة النواة بعناية مضاعفة.",
          en: "The OS splits the software world into two separate kingdoms:\n\n- Kernel space: the alert heart of the system, running with full privileges and talking directly to hardware — home of scheduling, memory management and drivers\n- User space: where your applications, the shell and utilities run, with limited privileges behind protective walls\n\nHow does a program cross the border? Through one official gateway only: the system call. When your program wants to read a file it never touches the disk; it knocks on the kernel's door and says: read this file for me — and the kernel executes and returns the answer.\n\nThis separation is the foundation of both stability and security: a bug in user space crashes one program, while a bug in the kernel can crash the whole machine — which is why kernel code is written with doubled care.",
        },
        tip: {
          ar: "قاعدة ذهبية: كلما قرأت عن ميزة «أمنية» في نظام حديث، اسأل نفسك: في أي المملكتين تعيش؟",
          en: "Golden rule: whenever you read about a modern security feature, ask yourself — which of the two kingdoms does it live in?",
        },
      },
      {
        heading: { ar: "لماذا لا نستغني عن نظام التشغيل؟", en: "Why Can't We Do Without an OS?" },
        body: {
          ar: "يظن كثيرون أن نظام التشغيل هو «الشاشة والنوافذ». الحقيقة أعمق: الشاشة والنوافذ مجرد واجهة فوق النظام، بينما النظام نفسه هو ما يجعل الحاسوب قابلاً للاستخدام أصلاً.\n\nجرّب ذهنياً إزالة النظام: لم تعد هناك ملفات — فقط قطاعات على قرص. لا عمليات — فقط تعليمات يجب أن تعرف أين تسكنها. لا شبكة — فقط سجلات في بطاقة عليك فك ترميزها يدوياً. حتى لو كان لديك وقت لكتابة كل شيء بنفسك، فبرنامجك سيعمل على جهازك أنت فقط، لأنك بلا نظام تتحدث إلى العتاد مباشرة وكل عتاد لغته مختلفة.\n\n- نظام التشغيل يجعل البرمجة معقولة: اكتب مرة، شغّل على ملايين الأجهزة\n- يجعل الجهاز متعدد الاستخدامات: نفس الحاسوب يشغّل أي برنامج\n- يجعل الحوسبة آمنة: عزل المستخدمين والبرامج عن بعضهم\n\nفي الدرس القادم سنرى كيف وصلت البشرية إلى هذا التصميم عبر سبعة عقود من التجربة والخطأ.",
          en: "Many people think the OS is the screen and the windows. Deeper truth: the screen and windows are just a face on top of the system — the system itself is what makes the computer usable at all.\n\nMentally remove the OS: no more files — only sectors on a disk. No processes — only instructions you must know where to place. No network — only registers in a card you must decode by hand. And even if you had time to write all of it yourself, your program would only run on your exact machine, because without an OS you talk to hardware directly and every hardware speaks a different language.\n\n- The OS makes programming sane: write once, run on millions of machines\n- It makes one computer multi-purpose: the same machine runs any program\n- It makes computing safe: users and programs isolated from each other\n\nIn the next lesson we will see how humanity reached this design through seven decades of trial and error.",
        },
      },
    ],
    keyPoints: [
      { ar: "نظام التشغيل = وسيط برمجي بين العتاد والتطبيقات", en: "OS = a software middleware between hardware and applications" },
      { ar: "وظيفته الأولى: إدارة الموارد — معالج، ذاكرة، ملفات، أجهزة، أمان", en: "Its first job: resource management — CPU, memory, files, devices, security" },
      { ar: "التطبيقات لا تلمس العتاد؛ تطلب الخدمة عبر استدعاءات النظام", en: "Apps never touch hardware; they request services via system calls" },
      { ar: "فضاء النواة بامتيازات كاملة، وفضاء المستخدم محدود ومحمي", en: "Kernel space has full privileges; user space is limited and protected" },
      { ar: "بلا نظام تشغيل أنت مبرمج معدن مكشوف: كل تفصيلة يدوية", en: "Without an OS you are a bare-metal programmer: every detail manual" },
    ],
    commands: [
      { cmd: "uname -a", desc: { ar: "اعرف نظام التشغيل ونواة جهازك في سطر واحد", en: "See your OS and kernel in one line" } },
      { cmd: "ps aux", desc: { ar: "شاهد العمليات التي يديرها النظام الآن", en: "Watch the processes the OS is managing right now" } },
      { cmd: "free -h", desc: { ar: "كيف يوزّع النظام الذاكرة الحية والتبديل", en: "How the OS is distributing live memory and swap" } },
    ],
    quiz: [
      {
        q: { ar: "أي وصف أدق لنظام التشغيل؟", en: "Which is the most precise description of an OS?" },
        options: [
          { ar: "برنامج للرسم وتحرير النصوص", en: "A program for drawing and text editing" },
          { ar: "الشاشة والنوافذ التي تراها", en: "The screen and windows you see" },
          { ar: "وسيط يدير موارد العتاد و يخدم التطبيقات", en: "A middleware managing hardware resources and serving applications" },
          { ar: "قرص التخزين الداخلي", en: "The internal storage disk" },
        ],
        correct: 2,
        explain: { ar: "النظام وسيط ومدير موارد: يقف بين العتاد والتطبيقات، والواجهة الرسومية مجرد وجه فوقه.", en: "The OS is a middleware and resource manager standing between hardware and apps; the GUI is just a face on top of it." },
      },
      {
        q: { ar: "كيف يعبر البرنامج الحدود إلى العتاد؟", en: "How does a program cross the border to hardware?" },
        options: [
          { ar: "يكتب في سجلات البطاقة مباشرة", en: "It writes to card registers directly" },
          { ar: "عبر استدعاء نظام (System Call) للنواة", en: "Via a system call to the kernel" },
          { ar: "عبر رسالة إلى شاشة العرض", en: "Via a message to the display screen" },
          { ar: "لا يعبرها إطلاقاً ولا يحتاجها", en: "It never crosses and never needs to" },
        ],
        correct: 1,
        explain: { ar: "استدعاء النظام هو البوابة الرسمية الوحيدة: البرنامج يطلب، والنواة تنفّذ على العتاد نيابة عنه.", en: "The system call is the only official gateway: the program requests, and the kernel executes on hardware on its behalf." },
      },
      {
        q: { ar: "خطأ برمجي في فضاء النواة أخطر من نظيره في فضاء المستخدم لأنه:", en: "A bug in kernel space is more dangerous than one in user space because it:" },
        options: [
          { ar: "يظهر أسرع على الشاشة", en: "Appears faster on screen" },
          { ar: "يسقط البرنامج وحده فقط", en: "Crashes only the single program" },
          { ar: "قد يوقف الجهاز كله لأنه يعمل بامتيازات كاملة", en: "Can halt the entire machine since it runs with full privileges" },
          { ar: "يصيب الشبكة دائماً", en: "Always infects the network" },
        ],
        correct: 2,
        explain: { ar: "النواة تدير كل شيء بامتيازات كاملة؛ خطؤها يعني عدم استقرار الجهاز بأكمله، بينما خطأ فضاء المستخدم محصور ببرنامج واحد.", en: "The kernel manages everything with full privileges; its bug destabilizes the whole machine, while a user-space bug stays confined to one program." },
      },
      {
        q: { ar: "أي هذه الموارد ليس من موارد نظام التشغيل الخمسة؟", en: "Which of these is NOT one of the OS's five managed resources?" },
        options: [
          { ar: "المعالج والعمليات", en: "CPU & processes" },
          { ar: "الذاكرة", en: "Memory" },
          { ar: "كابل تغذية الكهرباء", en: "The power supply cable" },
          { ar: "الأجهزة والملفات", en: "Devices & files" },
        ],
        correct: 2,
        explain: { ar: "كابل الكهرباء شأن فيزيائي خارج نطاق إدارة النظام؛ الموارد المدارة هي المعالج والذاكرة والملفات والأجهزة والأمان.", en: "The power cable is a physical matter outside the OS's scope; the managed resources are CPU, memory, files, devices and security." },
      },
    ],
  },

  // ── l112 · OS Evolution: From Punched Cards to the Cloud ──────────────
  {
    id: "l112",
    moduleId: "m12",
    order: 2,
    level: "beginner",
    title: {
      ar: "تطور أنظمة التشغيل: من البطاقات المثقبة إلى السحابة",
      en: "OS Evolution: From Punched Cards to the Cloud",
    },
    summary: {
      ar: "سبعة عقود من التطور: المعالجة بالدفعات، تعدد البرامج، الاقتسام الزمني العظيم، الحواسيب الشخصية والواجهات الرسومية، الهواتف، ثم السحابة والحاويات — ولكل عصر مشكلته التي حلّتها.",
      en: "Seven decades of evolution: batch processing, multiprogramming, the great time-sharing breakthrough, personal computers and GUIs, mobile, then cloud and containers — each era solving its own problem.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الخمسينيات: البطاقات المثقبة والمعالجة بالدفعات", en: "The 1950s: Punched Cards and Batch Processing" },
        body: {
          ar: "في الخمسينيات كانت الحواسيب آلات غالية بملايين الدولارات بحجم غرفة كاملة. كنت تكتب برنامجك على بطاقات مثقبة (Punched Cards) — كل سطر بطاقة — وتسلّم الحزمة لمشغّل (Operator) خلف نافذة زجاجية.\n\nكان المشغّل يجمّع بطاقات عشرات المستخدمين في «دفعات» (Batches) متتالية، يحمّلها للتشغيل الواحد تلو الآخر، فينتظر صاحب البرنامج نتيجته ساعات — أو يوماً كاملاً — ليكتشف أنه أخطأ في بطاقة واحدة فيعيد الدورة من جديد.\n\n- المشكلة: المعالج يبقى خاملاً دقائق طويلة أثناء تبديل المهام يدوياً\n- الحل الأول: برنامج صغير (سلف نظام التشغيل) يحمّل الدفعات تلقائياً\n- الألم الحقيقي: زمن الانتظار بين خطأ واكتشافه",
          en: "In the 1950s computers were room-sized machines worth millions. You wrote your program on punched cards — one card per line — and handed the stack to an operator behind a glass window.\n\nThe operator grouped cards from dozens of users into batches, loaded them one after another, so you waited hours — or a full day — for your result, only to discover one card was wrong and repeat the whole cycle.\n\n- The problem: the CPU sat idle for long minutes during manual job switching\n- First fix: a small loader program (the OS's ancestor) that loads batches automatically\n- The real pain: the wait between making an error and discovering it",
        },
      },
      {
        heading: { ar: "خريطة سبعة عقود في مخطط واحد", en: "Seven Decades Mapped in One Diagram" },
        body: {
          ar: "قبل الغوص في التفاصيل، خذ الخريطة الكاملة. كل سهم في هذا المخطط يمثل عقداً كاملاً من العمل الهندسي، وكل مرحلة وُلدت من ألم المرحلة السابقة:\n\n- الدفعات حلّت هدر وقت المعالج بالتبديل اليدوي\n- تعدد البرامج حلّ خمول المعالج أثناء الإدخال والإخراج\n- الاقتسام الزمني حلّ زمن الانتظار الطويل للمستخدم\n- الحواسيب الشخصية حلّت احتكار الجهاز لمركز الحوسبة\n- الهواتف حملت الحوسبة إلى كل جيب\n- السحابة أعادت الخوادم الكبيرة لكن بمشاركة ملايين المستخدمين\n\nلاحظ الدورة التاريخية الطريفة: بدأنا بجهاز واحد لعدة مستخدمين (اقتسام زمني)، ثم جهاز لكل مستخدم (PC)، ثم بعدة أجهزة للمستخدم الواحد (هاتف وحاسوب وساعة)، والآن عاد الجهاز الضخم المشترك لكن اسمه «سحابة»!",
          en: "Before diving into detail, take the full map. Every arrow in this diagram stands for a full decade of engineering, and every stage was born from the pain of the previous one:\n\n- Batching fixed CPU waste from manual switching\n- Multiprogramming fixed CPU idling during input/output\n- Time-sharing fixed the user's long waiting time\n- Personal computers ended the computing center's monopoly on machines\n- Phones carried computing into every pocket\n- The cloud brought big servers back — now shared by millions of users\n\nNotice the funny historical cycle: we began with one machine for many users (time-sharing), then one machine per user (PCs), then several devices per user (phone, laptop, watch), and now the giant shared machine is back — renamed the cloud!",
        },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة أنظمة التشغيل عبر العصور", en: "The journey of operating systems through the eras" },
          items: [
            { ar: "الخمسينيات: معالجة بالدفعات عبر البطاقات المثقبة", en: "1950s: batch processing on punched cards" },
            { ar: "أوائل الستينيات: تعدد البرامج — لا خمول أثناء الإدخال/الإخراج", en: "Early 1960s: multiprogramming — no idling during I/O" },
            { ar: "أواخر الستينيات: الاقتسام الزمني — الجهاز يخدم عدة مستخدمين فوراً", en: "Late 1960s: time-sharing — the machine serves many users instantly" },
            { ar: "الثمانينيات: حاسوب شخصي لكل مكتب + واجهات رسومية", en: "1980s: a PC on every desk + graphical interfaces" },
            { ar: "2007 وما بعدها: الهواتف الذكية بأنظمة بجذور يونكس", en: "2007 onward: smartphones running Unix-rooted systems" },
            { ar: "اليوم: سحابة وحاويات — آلاف الأنظمة على خادم واحد", en: "Today: cloud & containers — thousands of systems on one server" },
          ],
        },
      },
      {
        heading: { ar: "تعدد البرامج والاقتسام الزمني: الاختراق العظيم", en: "Multiprogramming and Time-Sharing: The Great Breakthrough" },
        body: {
          ar: "أدرك المهندسون في الستينيات حقيقتين مذهلتين: المعالج أسرع من كل شيء حوله بملايين المرات، والبرامج تقضي معظم وقتها منتظرةً أجهزة بطيئة (قراءة شريط، طباعة ورق).\n\nجاء تعدد البرامج (Multiprogramming) أولاً: عندما يتوقف برنامج ما للإدخال/الإخراج، ينتقل المعالج فوراً لبرنامج آخر بدل أن يخمل. ثم جاء الاقتسام الزمني (Time-Sharing) — الفكرة التي وُصف بها يونكس نفسه لاحقاً — حيث يُمنح كل مستخدم متصل عبر طرفية (Terminal) شريحة زمنية صغيرة من المعالج بالتناوب، بسرعة تجعله يشعر أنه يملك الجهاز وحده.\n\n- الاقتسام الزمني = ولادة «العمليات» (Processes) والجدولة (Scheduling)\n- من هذه البيئة وُلد يونكس (1970) وأجداد Linux و macOS جميعاً\n- مفاهيمك اليوم: العمليات، الجلسات، الأطراف البعيدة — كلها أحفاد هذه الحقبة",
          en: "Engineers in the 1960s realized two astonishing facts: the CPU is millions of times faster than everything around it, and programs spend most of their time waiting for slow devices (tape reads, paper printing).\n\nMultiprogramming came first: when a program pauses for input/output, the CPU instantly switches to another program instead of idling. Then came time-sharing — the very idea Unix itself would later be built on — where every user connected through a terminal gets a tiny rotating slice of CPU time, so fast it feels like owning the machine alone.\n\n- Time-sharing = the birth of processes and scheduling\n- From this environment came Unix (1970) and the ancestors of Linux and macOS\n- Your modern concepts — processes, sessions, remote terminals — are all grandchildren of this era",
        },
      },
      {
        heading: { ar: "الثمانينيات: الحاسوب الشخصي والواجهة الرسومية", en: "The 1980s: Personal Computers and the GUI" },
        body: {
          ar: "مع تقليص رقائق المعالج في السبعينيات، صار ممكناً وضع «حاسوب كامل» على مكتب. جاءت ثورة ثانية أعظم: الواجهة الرسومية (GUI).\n\n- مختبر Xerox PARC اخترع النوافذ والأيقونات والفأرة في السبعينيات — وأهمله العالم\n- أبل أطلقت Lisa ثم Macintosh في 1984 بواجهة رسومية للجميع\n- مايكروسوفت لحقت بالمسيرة بـ Windows (أول إصدار 1985) فوق قاعدة DOS\n\nالمفارقة الجميلة: الواجهات الرسومية لم تلغِ سطر الأوامر، بل بُنيت فوقه. لينكس اليوم يقدم الاثنين معاً: سطح مكتب أنيق إن أردت، وواجهة سطر أوامر هي الأقوى — وستكتشف في مختبرات المادة أن الخوادم تعمل غالباً بلا واجهة رسومية أصلاً.",
          en: "As processor chips shrank through the 1970s, putting a whole computer on a desk became possible. Then came an even greater revolution: the graphical user interface (GUI).\n\n- Xerox PARC invented windows, icons and the mouse in the 1970s — and the world ignored it\n- Apple launched Lisa, then the Macintosh in 1984 with a GUI for everyone\n- Microsoft followed with Windows (first release 1985) on top of DOS\n\nThe beautiful irony: GUIs never abolished the command line — they were built on top of it. Linux today offers both: an elegant desktop if you wish, and a command line that is still the most powerful — and you will discover in the course labs that servers often run with no GUI at all.",
        },
      },
      {
        heading: { ar: "من الهواتف إلى السحابة: الحقبة الحالية", en: "From Phones to the Cloud: The Current Era" },
        table: {
          caption: { ar: "كل عصر ومشكلته وحله المميز", en: "Each era, its problem and its signature solution" },
          headers: [
            { ar: "العصر", en: "Era" },
            { ar: "المشكلة", en: "Problem" },
            { ar: "الحل", en: "Solution" },
          ],
          rows: [
            [
              { ar: "الدفعات (الخمسينيات)", en: "Batch (1950s)" },
              { ar: "هدر المعالج بالتبديل اليدوي", en: "CPU wasted on manual switching" },
              { ar: "تحميل الدفعات تلقائياً", en: "Automatic batch loading" },
            ],
            [
              { ar: "تعدد البرامج", en: "Multiprogramming" },
              { ar: "خمول المعالج أثناء الإدخال/الإخراج", en: "CPU idle during I/O" },
              { ar: "التنقل لبرنامج آخر فور التوقف", en: "Switch to another job on pause" },
            ],
            [
              { ar: "الاقتسام الزمني (الستينيات)", en: "Time-sharing (1960s)" },
              { ar: "انتظار المستخدم ساعات لنتيجته", en: "Users wait hours for results" },
              { ar: "شرائح زمنية متعاقبة لكل طرفية", en: "Rotating time slices per terminal" },
            ],
            [
              { ar: "الحواسيب الشخصية (الثمانينيات)", en: "PCs (1980s)" },
              { ar: "احتكار مراكز الحوسبة للأجهزة", en: "Computing centers monopolize machines" },
              { ar: "جهاز لكل مكتب + واجهة رسومية", en: "A machine per desk + GUI" },
            ],
            [
              { ar: "الهواتف (2007+)", en: "Mobile (2007+)" },
              { ar: "الحوسبة حبيسة المكتب", en: "Computing confined to the desk" },
              { ar: "أنظمة تشغيل بجذور يونكس في كل جيب", en: "Unix-rooted OSes in every pocket" },
            ],
            [
              { ar: "السحابة والحاويات (اليوم)", en: "Cloud & containers (today)" },
              { ar: "كلفة بناء خوادم لكل شركة", en: "Cost of building servers per company" },
              { ar: "أنظمة وهمية عديدة تشترك في عتاد واحد", en: "Many virtual systems sharing one machine" },
            ],
          ],
        },
        body: {
          ar: "في 2007 قفزت الحوسبة إلى الجيب: iPhone بشراكه iOS المبني على جذور BSD/يونكس، وأندرويد بعد عام على نواة لينكس مباشرة. اليوم يعيش في هاتفك نظام تشغيل كامل بتقنيات الخوادم الكبرى.\n\nثم جاءت السحابة: خوادم ضخمة في مراكز بيانات تشغّل آلاف «الأنظمة الوهمية» (Virtual Machines) والحاويات (Containers)، يشترك في كل خادم مئات المستخدمين حول العالم — مختبراتك في هذه المادة مثال حي: خادم Amazon Linux 2 على AWS تتصل به من بيتك!\n\nلاحظ أن أندرويد وأندرويد التلفاز وأجهزة الراوتر وأجهزة PlayStation جميعها تشغّل أنظمة بجذور يونكس — قصة تحوّل نظام مختبر بحثي صغير إلى ملك غير متوَّج لعالم الحوسبة، وهي قصة الدرس القادم.",
          en: "In 2007 computing leapt into the pocket: the iPhone with iOS built on BSD/Unix roots, and Android a year later directly on the Linux kernel. Your phone today runs a full OS with big-server technology.\n\nThen came the cloud: giant servers in data centers running thousands of virtual machines and containers, hundreds of users worldwide sharing each physical machine — your labs in this course are a live example: an Amazon Linux 2 server on AWS you connect to from home!\n\nNotice that Android, Android TV, routers and PlayStation consoles all run Unix-rooted systems — the story of a small research-lab system becoming the uncrowned king of computing, and that is the next lesson's story.",
        },
      },
    ],
    keyPoints: [
      { ar: "البطاقات المثقبة والدفعات: أيام انتظار النتيجة ساعات", en: "Punched cards and batches: results waited for hours" },
      { ar: "الاقتسام الزمني كان الاختراق العظيم — وبيئة ولادة يونكس", en: "Time-sharing was THE breakthrough — and the cradle of Unix" },
      { ar: "الواجهة الرسومية (Xerox PARC → Mac 1984 → Windows) بُنيت فوق سطر الأوامر ولم تلغه", en: "The GUI (Xerox PARC → Mac 1984 → Windows) was built above the command line, not instead of it" },
      { ar: "الهواتف والسحابة اليوم تشغّل أنظمة بجذور يونكس", en: "Phones and the cloud today run Unix-rooted systems" },
      { ar: "دورة تاريخية: جهاز مشترك → جهاز لكل فرد → سحابة مشتركة", en: "Historic cycle: shared machine → machine per person → shared cloud" },
    ],
    commands: [
      { cmd: "who", desc: { ar: "شاهد من المتصل بالخادم الآن — إرث الاقتسام الزمني حي أمامك", en: "See who is connected now — time-sharing heritage alive" } },
      { cmd: "w", desc: { ar: "من متصل وماذا يفعل ومنذ متى خامل", en: "Who is connected, doing what, idle since when" } },
      { cmd: "uptime", desc: { ar: "منذ متى يعمل النظام وكم مستخدماً متصلاً", en: "How long the system has run and how many users are on" } },
    ],
    quiz: [
      {
        q: { ar: "ما المشكلة التي حلّها الاقتسام الزمني (Time-Sharing)؟", en: "What problem did time-sharing solve?" },
        options: [
          { ar: "بطاءة الطابعات الورقية", en: "Slow paper printers" },
          { ar: "انتظار المستخدمين طويلاً لدورهم على الجهاز", en: "Users waiting long turns on the machine" },
          { ar: "ثمن البطاقات المثقبة", en: "The price of punched cards" },
          { ar: "خطر الفيروسات على الشبكة", en: "The risk of network viruses" },
        ],
        correct: 1,
        explain: { ar: "الاقتسام الزمني يمنح كل مستخدم شريحة معالج متعاقبة صغيرة فيشعر بامتلاك الجهاز — ولدت معه العمليات والجدولة.", en: "Time-sharing gives each user a small rotating CPU slice so they feel they own the machine — processes and scheduling were born with it." },
      },
      {
        q: { ar: "أين اخترعت النوافذ والأيقونات والفأرة أولاً؟", en: "Where were windows, icons and the mouse first invented?" },
        options: [
          { ar: "مختبر Xerox PARC", en: "Xerox PARC lab" },
          { ar: "شركة آبل في 1984", en: "Apple in 1984" },
          { ar: "مايكروسوفت مع Windows 95", en: "Microsoft with Windows 95" },
          { ar: "مختبرات بل مع يونكس", en: "Bell Labs with Unix" },
        ],
        correct: 0,
        explain: { ar: "اخترعها Xerox PARC في السبعينيات، ثم شهّرتها آبل مع Macintosh في 1984، ولحقت مايكروسوفت بـ Windows.", en: "Xerox PARC invented them in the 1970s; Apple popularized them with the 1984 Macintosh; Microsoft followed with Windows." },
      },
      {
        q: { ar: "الترتيب الزمني الصحيح لحقب أنظمة التشغيل هو:", en: "The correct chronological order of OS eras is:" },
        options: [
          { ar: "شخصية → دفعات → اقتسام زمني → سحابة", en: "Personal → batch → time-sharing → cloud" },
          { ar: "دفعات → اقتسام زمني → شخصية → سحابة", en: "Batch → time-sharing → personal → cloud" },
          { ar: "اقتسام زمني → دفعات → سحابة → شخصية", en: "Time-sharing → batch → cloud → personal" },
          { ar: "سحابة → شخصية → دفعات → اقتسام زمني", en: "Cloud → personal → batch → time-sharing" },
        ],
        correct: 1,
        explain: { ar: "الدفعات (الخمسينيات) ثم الاقتسام الزمني (الستينيات) ثم الحواسيب الشخصية (الثمانينيات) ثم السحابة (اليوم).", en: "Batch (1950s), then time-sharing (1960s), then personal computers (1980s), then the cloud (today)." },
      },
    ],
  },

  // ── l113 · Unix History: From Multics to Bell Labs ────────────────────
  {
    id: "l113",
    moduleId: "m12",
    order: 3,
    level: "beginner",
    title: {
      ar: "تاريخ يونكس: من Multics إلى مختبرات بل",
      en: "Unix History: From Multics to Bell Labs",
    },
    summary: {
      ar: "قصة نظام بدأ نكتةً تسميةً على مشروع Multics في مختبرات بل 1969، وأُعيدت كتابته بلغة C فصار قابلاً للنقل، وتفرّع إلى BSD و System V، ثم وحّده معيار POSIX — وجيناته اليوم في كل جهاز تقريباً.",
      en: "The story of a system that began as a naming pun on the Multics project at Bell Labs in 1969, was rewritten in C and became portable, branched into BSD and System V, then unified by POSIX — its DNA now lives in almost every device.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "من Multics إلى Unics: النكتة التي سمّت نظاماً", en: "From Multics to Unics: The Pun That Named a System" },
        body: {
          ar: "في أواخر الستينيات عملت مختبرات بل (Bell Labs) ضمن تحالف على مشروع طموح ضخم اسمه Multics (Multiplexed Information and Computing Service): نظام يخدم مئات المستخدمين في آن واحد. كان المشروع رائداً فكرياً لكنه تضخّم حتى صار معقداً بطيئاً بالنسبة لأجهزة عصره، فانسحبت مختبرات بل منه عام 1969.\n\nبقي اثنان من باحثيها — كين تومسون (Ken Thompson) ودنيس ريتشي (Dennis Ritchie) — مفتونين بأفكار الاقتسام الزمني البسيطة، فبنيا على حاسوب صغير مهمل (PDP-7) نسخة مبسطة خاصة بهما. زملاؤهما دعوها ساخرين Unics: «نظام واحد» مفرد ضعيف بدل Multics الجمع المضخّم — ثم كُتبت Unix لاحقاً.\n\n- 1969: تومسون يكتب أول نسخة يونكس على PDP-7\n- الاسم نفسه مزحة لغوية: Mult-ics → Un-ix\n- الفكرة الرابحة: نظام صغير يفعل الشيء الصحيح بدل نظام ضخم يفعل كل شيء",
          en: "In the late 1960s Bell Labs belonged to a consortium building an ambitious giant called Multics (Multiplexed Information and Computing Service): a system to serve hundreds of users at once. Intellectually pioneering, it ballooned into something too complex and slow for its era's hardware, and Bell Labs withdrew in 1969.\n\nTwo of its researchers — Ken Thompson and Dennis Ritchie — remained fascinated by the simple time-sharing ideas, so on a small abandoned computer (the PDP-7) they built their own simplified version. Colleagues jokingly called it Unics: a weak singular 'one-system' instead of the plural inflated Multics — later spelled Unix.\n\n- 1969: Thompson writes the first Unix on a PDP-7\n- The name itself is a language pun: Mult-ics → Un-ix\n- The winning idea: a small system doing the right thing, not a giant doing everything",
        },
      },
      {
        heading: { ar: "1973: إعادة الكتابة بلغة C — قرار غيّر التاريخ", en: "1973: The Rewrite in C — A History-Changing Decision" },
        body: {
          ar: "كُتب يونكس الأول بلغة أسمبلي (Assembly) — لغة العتاد الخام. يعني ذلك أنه سجين جهازه: النقل إلى معالج آخر يتطلب إعادة كتابة شبه كاملة.\n\nثم قام ريتشي بفعل مزدوج عبقري: طوّر لغة C عالية المستوى لإعادة كتابة النظام بها عام 1973. فجأة صار يونكس «قابلاً للنقل» (Portable): خمّن ملفات المصدر، أعد تجميعها على أي عتاد جديد، وسيعمل النظام — في زمن كان فيه كل نظام محكوماً بجهازه.\n\n- لغة C صُممت أصلاً لكتابة أنظمة التشغيل — ثم غزت العالم كله\n- القابلية للنقل هي سر انتشار يونكس في الجامعات والشركات لاحقاً\n- 1974: ورقة ريتشي وتومسون في مجلة CACM عرّفت العالم الأكاديمي بالنظام",
          en: "The first Unix was written in assembly — raw hardware language. That made it a prisoner of its machine: porting to another CPU meant a near-total rewrite.\n\nThen Ritchie did a double-brilliant move: he developed the high-level C language and rewrote the system with it in 1973. Suddenly Unix was portable: copy the source files, recompile on any new hardware, and the system runs — in an era when every OS was chained to its machine.\n\n- C was designed precisely for writing operating systems — then conquered the whole world\n- Portability is the secret of Unix's later spread through universities and companies\n- 1974: Ritchie and Thompson's CACM paper introduced the system to the academic world",
        },
        tip: {
          ar: "كلما رأيت نظاماً يعمل اليوم على أجهزة لا تحصى — من راوتر إلى هاتف — فاسأل: هل كُتب بلغة قابلة للنقل؟ هذا درس يونكس الأول.",
          en: "Whenever you see a system running on countless devices today — router to phone — ask: was it written in a portable language? That is Unix's first lesson.",
        },
      },
      {
        heading: { ar: "الخط الزمني الكامل: من 1969 إلى لينكس", en: "The Full Timeline: 1969 to Linux" },
        body: {
          ar: "رتّب الأحداث في ذهنك كسلسلة واحدة — كل حلقة تفتح التي بعدها:\n\n- نظام مبسط في مختبر (1969) → نظام بلغة قابلة للنقل (1973) → عالم يعرفه (1974)\n- ثم التفرع: بيركلي تأخذ الشيفرة وتطوّر BSD، و AT&T بعد انفصالها تنظيمياً تبيع System V\n- ثم الصدام: «حروب يونكس» بين الشركات حول المعايير\n- ثم السلام: معيار POSIX يوحّد الواجهات (1988)\n- ثم الحفيد: لينكس 1991 — وسنقرأ إعلانه حرفياً في الدرس الأخير من هذه الوحدة\n\nهذا الخط الزمني هو تمرينك التفاعلي في هذا الدرس: أعد ترتيبه بنفسك حتى يستقر في ذاكرتك.",
          en: "Line the events up in your mind as one chain — each link opens the next:\n\n- A lab-side simple system (1969) → a portable-language system (1973) → a world aware of it (1974)\n- Then branching: Berkeley takes the code and evolves BSD; AT&T, newly freed by regulation, sells System V\n- Then collision: the Unix wars among vendors over standards\n- Then peace: POSIX unifies the interfaces (1988)\n- Then the grandchild: Linux 1991 — we will read its announcement verbatim in this module's final lesson\n\nThis timeline is your interactive exercise below: reorder it yourself until it settles in memory.",
        },
        diagram: {
          kind: "flow",
          title: { ar: "خط زمني يونكس: المحطات الكبرى", en: "The Unix timeline: major milestones" },
          items: [
            { ar: "1969 — تومسون وريتشي يبنيان يونكس على PDP-7 في مختبرات بل", en: "1969 — Thompson & Ritchie build Unix on a PDP-7 at Bell Labs" },
            { ar: "1973 — إعادة كتابة النظام بلغة C الجديدة", en: "1973 — the system rewritten in the new C language" },
            { ar: "1974 — ورقة CACM تعرّف العالم الأكاديمي بيونكس", en: "1974 — the CACM paper introduces Unix to academia" },
            { ar: "1977 وما بعدها — جامعة بيركلي تطلق تفرع BSD", en: "1977 onward — UC Berkeley releases the BSD branch" },
            { ar: "1983 — AT&T تطلق System V التجاري وتبدأ حروب يونكس", en: "1983 — AT&T ships commercial System V; the Unix wars begin" },
            { ar: "1988 — معيار POSIX يوحّد الواجهات وينهي الشقاق", en: "1988 — POSIX unifies the interfaces and ends the rift" },
            { ar: "1991 — لينوس تورفالدس يعلن نواة لينكس الحرة", en: "1991 — Linus Torvalds announces the free Linux kernel" },
            { ar: "اليوم — جينات يونكس في الخوادم والهواتف والحواسيب", en: "Today — Unix DNA in servers, phones and computers" },
          ],
        },
      },
      {
        heading: { ar: "شجرة العائلة: BSD و System V", en: "The Family Tree: BSD and System V" },
        table: {
          caption: { ar: "فروع عائلة يونكس وأبرز ذراريها", en: "Unix family branches and their notable descendants" },
          headers: [
            { ar: "الفرع", en: "Branch" },
            { ar: "المنشأ", en: "Origin" },
            { ar: "أبرز الذراري", en: "Notable descendants" },
          ],
          rows: [
            [
              { ar: "البحثي الأصلي", en: "Original research line" },
              { ar: "مختبرات بل، إصدارات V6/V7", en: "Bell Labs, V6/V7 releases" },
              { ar: "الجدّ المشترك لكل الفروع", en: "The common ancestor of all branches" },
            ],
            [
              { ar: "BSD", en: "BSD" },
              { ar: "جامعة كاليفورنيا في بيركلي", en: "UC Berkeley" },
              { ar: "FreeBSD و NetBSD و OpenBSD، وأساس macOS و iOS", en: "FreeBSD, NetBSD, OpenBSD; basis of macOS & iOS" },
            ],
            [
              { ar: "System V", en: "System V" },
              { ar: "AT&T التجارية", en: "Commercial AT&T" },
              { ar: "Solaris من Sun و HP-UX و AIX من IBM", en: "Sun's Solaris, HP-UX, IBM's AIX" },
            ],
            [
              { ar: "GNU/Linux", en: "GNU/Linux" },
              { ar: "نواة تورفالدس + أدوات GNU", en: "Torvalds' kernel + GNU tools" },
              { ar: "Red Hat و Ubuntu و Debian و Amazon Linux 2", en: "Red Hat, Ubuntu, Debian, Amazon Linux 2" },
            ],
          ],
        },
        body: {
          ar: "انتشرت شيفرة يونكس المبكرة في الجامعات بشروط متساهلة، فأخذتها جامعة بيركلي وطوّرتها إلى BSD (Berkeley Software Distribution) — وأضافت لها الطباعة عبر الشبكة ومكدس TCP/IP الشهير. في الجهة الأخرى، انفصلت AT&T تنظيمياً عام 1983 وصار بإمكانها بيع النظام تجارياً: وُلد System V.\n\nبعدها اشتبكت الشركات في «حروب يونكس» (Unix Wars): كل طرف يضيف ميزاته الخاصة ويبتعد عن الآخرين، فكادت ميزة «القابلية للنقل» أن تضيع. أنقذ الوضعَ معيار POSIX (1988) الذي حدّد واجهة موحدة: نظام يتوافق معه، تعمل برامجه وأوامرك على كل يونكس آخر متوافق.\n\n- macOS و iOS يحملان جينات BSD عبر نواة Darwin\n- Solaris و HP-UX و AIX ذراري System V التجارية\n- لينكس ليس يونكس بالمعنى القانوني (لا شيفرة من AT&T) لكنه يونكس بالمعنى العملي: متوافق مع POSIX",
          en: "Early Unix source spread through universities on lenient terms; UC Berkeley took it and evolved BSD (Berkeley Software Distribution) — adding networking and the famous TCP/IP stack. On the other side, AT&T was split apart by regulation in 1983 and could now sell the system commercially: System V was born.\n\nVendors then clashed in the Unix Wars: each adding proprietary extensions and drifting apart, nearly destroying portability itself. POSIX (1988) rescued the situation by defining one unified interface: conform to it, and your programs and commands work on every other conformant Unix.\n\n- macOS and iOS carry BSD genes through the Darwin kernel\n- Solaris, HP-UX and AIX are commercial System V descendants\n- Linux is not legally Unix (no AT&T code) but practically Unix: POSIX-conformant",
        },
      },
      {
        heading: { ar: "جينات يونكس في كل جهاز اليوم", en: "Unix DNA in Every Device Today" },
        body: {
          ar: "أين يعيش يونكس حولك الآن؟ في كل مكان تقريباً:\n\n- macOS و iOS: نواة Darwin بجذور BSD وماخ\n- أندرويد: نواة لينكس مباشرة — مليارات الأجهزة\n- راوتر منزلك وأجهزة التلفاز الذكية: غالباً لينكس مصغّر\n- PlayStation 4 و 5: نظام مبني على FreeBSD\n- كل سوبر كمبيوتر في قائمة TOP500 تقريباً: لينكس\n- خوادم AWS التي تتدرب عليها في مختبرات المادة: Amazon Linux 2\n\nنظام بدأ على حاسوب صغير مهمل عام 1969 كنكتة تسمية، انتهى ملكاً غير متوَّج للحوسبة كلها. وفي درس معمارية يونكس القادم سنفتح غطاء المحرك ونرى الطبقات التي جعلت هذا الصمود ممكناً.",
          en: "Where does Unix live around you right now? Almost everywhere:\n\n- macOS and iOS: the Darwin kernel with BSD and Mach roots\n- Android: the Linux kernel directly — billions of devices\n- Your home router and smart TVs: usually tiny Linux\n- PlayStation 4 and 5: a FreeBSD-based system\n- Virtually every TOP500 supercomputer: Linux\n- The AWS servers you train on in this course's labs: Amazon Linux 2\n\nA system that began on a small abandoned computer in 1969 as a naming joke ended up the uncrowned king of all computing. In the next lesson on Unix architecture we will open the engine cover and see the layers that made this survival possible.",
        },
      },
    ],
    keyPoints: [
      { ar: "1969: تومسون وريتشي يبنيان يونكس في مختبرات بل بعد انسحابها من Multics", en: "1969: Thompson & Ritchie build Unix at Bell Labs after its Multics withdrawal" },
      { ar: "الاسم مزحة: Un-ix المفرد الضعيف في مقابل Mult-ics الجمع المضخّم", en: "The name is a pun: weak singular Un-ix versus inflated plural Mult-ics" },
      { ar: "إعادة الكتابة بلغة C عام 1973 منحت يونكس القابلية للنقل — سر انتشاره", en: "The 1973 C rewrite gave Unix portability — the secret of its spread" },
      { ar: "البر الرئيسان: BSD من بيركلي و System V من AT&T", en: "The two main branches: Berkeley's BSD and AT&T's System V" },
      { ar: "POSIX أنهى حروب يونكس بتوحيد الواجهة — وهو ما يجعل مهاراتك قابلة للنقل", en: "POSIX ended the Unix wars by unifying the interface — what makes your skills portable" },
      { ar: "جينات يونكس اليوم: macOS و iOS و أندرويد و الراوتر و PlayStation و خوادم AWS", en: "Unix DNA today: macOS, iOS, Android, routers, PlayStation, AWS servers" },
    ],
    commands: [
      { cmd: "uname -s", desc: { ar: "اسم نظامك — على لينكس سيرد بـ Linux، وذكرى الجدّ Unix", en: "Your system name — Linux on Linux, a nod to the Unix ancestor" } },
      { cmd: "uname -sr", desc: { ar: "اسم النظام مع رقم إصدار النواة", en: "System name with kernel release number" } },
      { cmd: "cat /etc/os-release", desc: { ar: "من أي توزيعة نزل جهازك؟ التفاصيل الرسمية", en: "Which distribution is your machine? The official details" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا كانت إعادة كتابة يونكس بلغة C عام 1973 قراراً تاريخياً؟", en: "Why was the 1973 C rewrite a historic decision?" },
        options: [
          { ar: "جعل النظام أسرع بعشرة أضعاف فقط", en: "It only made the system ten times faster" },
          { ar: "أخفت الشيفرة عن المنافسين", en: "It hid the source from competitors" },
          { ar: "منح النظام قابلية النقل: أعد التجميع على أي عتاد فيعمل", en: "It gave portability: recompile on any hardware and it runs" },
          { ar: "ألغت الحاجة إلى المعالج", en: "It removed the need for a CPU" },
        ],
        correct: 2,
        explain: { ar: "اللغات عالية المستوى قابلة للنقل بين المعالجات، بينما الأسمبلي سجين عتاده — فصار يونكس يعمل على أجهزة لا تحصى.", en: "High-level languages port across CPUs while assembly is chained to its hardware — so Unix came to run on countless machines." },
      },
      {
        q: { ar: "ما الذي أنهى «حروب يونكس» بين الشركات؟", en: "What ended the corporate Unix wars?" },
        options: [
          { ar: "شراء آبل لكل الشركات", en: "Apple buying all the companies" },
          { ar: "معيار POSIX الموحد للواجهات", en: "The POSIX interface standard" },
          { ar: "تراجع استخدام الحواسيب", en: "The decline of computer usage" },
          { ar: "ظهور ويندوز فقط", en: "The appearance of Windows alone" },
        ],
        correct: 1,
        explain: { ar: "POSIX حدّد واجهة موحدة، فأي نظام متوافق تعمل عليه برامج وأوامر أي نظام متوافق آخر.", en: "POSIX defined a unified interface, so software and commands work across every conformant system." },
      },
      {
        q: { ar: "أندرويد و PlayStation 4 و macOS تشترك جميعاً في:", en: "Android, PlayStation 4 and macOS all share:" },
        options: [
          { ar: "جذور يونكس في أنظمتها", en: "Unix roots in their systems" },
          { ar: "المصنع نفسه: مختبرات بل تصنعها اليوم", en: "The same maker: Bell Labs builds them today" },
          { ar: "نظام الملفات NTFS حصراً", en: "The NTFS file system exclusively" },
          { ar: "غياب سطر الأوامر كلياً", en: "A total absence of any command line" },
        ],
        correct: 0,
        explain: { ar: "أندرويد على نواة لينكس، و PlayStation على FreeBSD، و macOS على Darwin بجذور BSD — كلها سلالة يونكس.", en: "Android runs the Linux kernel, PlayStation runs FreeBSD, macOS runs BSD-rooted Darwin — all Unix descendants." },
      },
      {
        q: { ar: "لماذا لا يُعد لينكس «يونكس» بالمعنى القانوني؟", en: "Why is Linux not 'Unix' in the legal sense?" },
        options: [
          { ar: "لأنه أبطأ من يونكس", en: "Because it is slower than Unix" },
          { ar: "لأنه كُتب من الصفر دون أي شيفرة من AT&T", en: "Because it was written from scratch with no AT&T code" },
          { ar: "لأنه لا يعمل على الخوادم", en: "Because it does not run on servers" },
          { ar: "لأنه رفض معيار POSIX", en: "Because it rejected the POSIX standard" },
        ],
        correct: 1,
        explain: { ar: "لينكس شيفرة مستقلة كلياً كتبها تورفالدس، لكنه يلتزم بمعايير POSIX فوظيفياً يتصرف كأي يونكس.", en: "Linux is fully independent code written by Torvalds, but it follows POSIX standards so it behaves like any Unix." },
      },
    ],
  },

  // ── l114 · Unix Architecture: Kernel, Shell & System Calls ────────────
  {
    id: "l114",
    moduleId: "m12",
    order: 4,
    level: "beginner",
    title: {
      ar: "معمارية يونكس: النواة والصَدَفة واستدعاءات النظام",
      en: "Unix Architecture: Kernel, Shell & System Calls",
    },
    summary: {
      ar: "الدرس المحوري للمحاضرة الأولى في IT6004: الطبقات الخمس من التطبيقات إلى العتاد، نزول الطلبات وصعود الردود، الفرق بين API (مثل mkdir()‎ في C) وواجهة الأوامر، وحقيقة الصَدَفة.",
      en: "The pivotal IT6004 Topic-1 lesson: the five layers from applications to hardware, requests going down and replies coming up, API (like C's mkdir()) versus the command interface, and what the shell really is.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "الطبقات الخمس: نظرة من فوق", en: "The Five Layers: A View from Above" },
        body: {
          ar: "هذا هو المخطط الذي تعرضه محاضرات المادة الأولى بالضبط (مقتبس من مرجع Stallings): خمس طبقات فوق بعضها، من أعلى إلى أسفل:\n\n1. تطبيقات المستخدم: ما تحتاجه أنت — متصفح، محرر، لعبة، خادم ويب\n2. أوامر يونكس والمكتبات: الأدوات (ls، cp، grep) والمكتبات (libc) التي تشتغل نيابة عن التطبيقات\n3. واجهة استدعاءات النظام: البوابة الرسمية الموحدة للدخول إلى النواة\n4. النواة (Kernel): قلب النظام الذي يدير العمليات والذاكرة والملفات والأجهزة\n5. العتاد: المعالج والذاكرة والأقراص والشبكة\n\nالتطبيق لا يعرف — ولا يريد أن يعرف — كيف تتحدث بطاقة الشبكة إلى السلك. كل ما يفعله هو إلقاء طلب في البوابة الموحدة والانتظار. هذا «التغليف بالطبقات» هو أعمق فكرة في هندسة الحاسوب كلها، وستراها مرة أخرى في نموذج OSI للشبكات: طبقات متعالية، كل طبقة تثق بالطبقة التي تحتها.",
          en: "This is exactly the diagram your Topic-1 lecture presents (drawn from Stallings): five layers stacked, top to bottom:\n\n1. User applications: what you need — browser, editor, game, web server\n2. Unix commands & libraries: the utilities (ls, cp, grep) and libraries (libc) working on the applications' behalf\n3. The system-call interface: the one official unified gateway into the kernel\n4. The kernel: the system's heart managing processes, memory, files and devices\n5. Hardware: CPU, RAM, disks, network\n\nAn application neither knows — nor wants to know — how the network card talks to the wire. All it does is drop a request at the unified gateway and wait. This layered encapsulation is the deepest idea in all of computer engineering, and you will meet it again in the OSI networking model: rising layers, each trusting the one beneath.",
        },
        diagram: {
          kind: "layers",
          title: { ar: "معمارية يونكس: الطبقات الخمس كما في محاضرتك", en: "Unix architecture: the five layers as in your lecture" },
          items: [
            { ar: "تطبيقات المستخدم — احتياجات الناس", en: "User applications — people's needs" },
            { ar: "أوامر يونكس + المكتبات — أدوات الترجمة والخدمة", en: "Unix commands + libraries — translation and service tools" },
            { ar: "واجهة استدعاءات النظام — البوابة الموحدة للنواة", en: "System-call interface — the unified kernel gateway" },
            { ar: "النواة — إدارة العمليات والذاكرة والملفات والأجهزة", en: "Kernel — managing processes, memory, files, devices" },
            { ar: "العتاد — التنفيذ الفيزيائي", en: "Hardware — the physical execution" },
          ],
        },
      },
      {
        heading: { ar: "الطلبات تنزل والردود تصعد", en: "Requests Go Down, Replies Come Up" },
        table: {
          caption: { ar: "دور كل طبقة في رحلة الطلب والرد", en: "Each layer's role in the request and reply journey" },
          headers: [
            { ar: "الطبقة", en: "Layer" },
            { ar: "عند نزول الطلب", en: "When the request goes down" },
            { ar: "عند صعود الرد", en: "When the reply comes up" },
          ],
          rows: [
            [
              { ar: "تطبيقات المستخدم", en: "User applications" },
              { ar: "تصفّح حاجتها: «اعرض لي هذا الملف»", en: "State the need: show me this file" },
              { ar: "تستلم النتيجة وتعرضها للمستخدم", en: "Receive the result and display it" },
            ],
            [
              { ar: "الأوامر والمكتبات", en: "Commands & libraries" },
              { ar: "تترجم الطلب إلى نداء موحد وتضيف التفاصيل", en: "Translate it into a unified call with details" },
              { ar: "تنسّق البيانات وتغلفها بصيغة مفهومة", en: "Format and wrap the data readably" },
            ],
            [
              { ar: "واجهة استدعاءات النظام", en: "System-call interface" },
              { ar: "تتحقق من الطلب وتسلّمه للنواة بأمان", en: "Validate the request and hand it to the kernel safely" },
              { ar: "تعيد النتيجة مع رمز النجاح أو الخطأ", en: "Return the result with a success or error code" },
            ],
            [
              { ar: "النواة", en: "Kernel" },
              { ar: "تتحقق من الصلاحيات وتدير العملية وتوجه العتاد", en: "Check permissions, manage the process, drive hardware" },
              { ar: "تجمع النتيجة من العتاد وتصعد بها", en: "Gather the result from hardware and send it up" },
            ],
            [
              { ar: "العتاد", en: "Hardware" },
              { ar: "ينفّذ تعليمات فعلية على الدارة", en: "Executes actual circuit instructions" },
              { ar: "يعيد الإشارات والبيانات الخام", en: "Returns raw signals and data" },
            ],
          ],
        },
        body: {
          ar: "عبارة محاضرتك الحرفية: طبقات البرمجيات تستقبل الطلبات وهي نازلة، وتعيد الردود وهي صاعدة (REQUESTS down, REPLIES up).\n\nتتبّع مثالاً حياً: تطلب من الصَدَفة عرض ملف. ينزل الطلب عبر أوامر يونكس، فيتحول إلى استدعاء نظام مثل read()‎، تتحقق النواة من صلاحيتك في الوصول للملف، تطلب من القرار عبر سائقه البيانات، ثم يصعد الرد بالاتجاه المعاكس حتى يظهر على طرفيتك.\n\nلاحظ نقطتين عميقتين:\n- كل طبقة تثق تماماً بالطبقة التي تحتها ولا تعرف شيئاً عن سلوكها الداخلي\n- الرفض يصعد أيضاً: إن لم تملك صلاحية القراءة أعادت النواة خطأً (EACCES) يصعد بنفس المسار",
          en: "Your lecture's verbatim phrase: the software layers take REQUESTS going down and return REPLIES coming up.\n\nTrace a live example: you ask the shell to display a file. The request descends through the Unix command layer, becoming a system call such as read(); the kernel verifies your permission to the file, asks the disk via its driver for the data, then the reply climbs back the same way until it appears on your terminal.\n\nNotice two deep points:\n- Every layer fully trusts the one beneath and knows nothing of its internal behavior\n- Refusal also climbs: if you lack read permission, the kernel returns an error (EACCES) that ascends the same path",
        },
      },
      {
        heading: { ar: "API مقابل واجهة المستخدم: mkdir()‎ مقابل mkdir", en: "API vs UI: mkdir() versus mkdir" },
        body: {
          ar: "ميّز محاضرتك بدقة بين مستويين تماماً مختلفين للتعامل مع النظام:\n\n- الواجهة البرمجية للتطبيقات API (Application Programming Interface): تخص المبرمج. ملفات ترويسات C مثل math.h تُعرّف الدوال الجاهزة، والدالة mkdir()‎ داخل شيفرة برنامجك تستدعي النظام مباشرة لإنشاء مجلد\n- واجهة المستخدم UI / سطر الأوامر CLI: تخص المستخدم. الأمر mkdir الذي تكتبه في الصَدَفة يُترجم في النهاية إلى الاستدعاء نفسه\n\nكلاهما يصل إلى النواة عبر نفس البوابة، لكن جمهورهما مختلف: المبرمج يكتب دالة بلغة C، والمستخدم يكتب أمراً نصياً. الأمر الذي تكتبه هو في الحقيقة برنامج صغير كُتب يوماً بلغة C ويستدعي الدالة نيابة عنك!\n\n- API = عقد بين المبرمج والنظام: توقيعات دوال موثقة ومستقرة\n- CLI = عقد بين المستخدم والنظام: أوامر نصية ومدعومة بوثائق man\n- سطر الأوامر أقوى للتفعيل الآلي؛ والواجهة الرسومية أسرع للاستخدام اليدوي",
          en: "Your lecture distinguishes two entirely different levels of talking to the system:\n\n- The Application Programming Interface (API): for the programmer. C header files like math.h declare ready functions, and mkdir() inside your program's code calls the system directly to create a folder\n- The User Interface / command line (CLI): for the user. The mkdir command you type in the shell is ultimately translated into that same call\n\nBoth reach the kernel through the same gateway, but their audiences differ: the programmer writes a C function call; the user types a text command. The command you type is in fact a small program once written in C that calls the function on your behalf!\n\n- API = a contract between programmer and system: documented, stable function signatures\n- CLI = a contract between user and system: text commands backed by man pages\n- The command line is stronger for automation; the GUI is faster for manual use",
        },
      },
      {
        heading: { ar: "ما الصَدَفة (Shell) فعلاً؟", en: "What Is the Shell, Really?" },
        body: {
          ar: "الصَدَفة ليست جزءاً من النواة، وليست «واجهة النظام الرسمية» — بل برنامج عادي تماماً يعمل في فضاء المستخدم، وظيفته قراءة ما تكتبه، تفسيره، وتشغيل البرامج المطلوبة.\n\nهذا التعريف المتواضع هو سر قوتها: لأنها مجرد برنامج، استُبدلت عبر التاريخ بصدَفات أفضل — Bourne shell (sh) الأب الكلاسيكي، ثم C shell و Korn، ثم Bash (Bourne-Again Shell) الافتراضي في معظم لينكس، و zsh في macOS الحديثة. ويمكنك أنت تغيير صدفتك بأمر واحد.\n\n- الصَدَفة = مفسر أوامر + لغة برمجة كاملة (متغيرات، حلقات، شروط)\n- عندما تكتب ls فإن الصَدَفة تبحث عن البرنامج ls في المسارات ثم تشغّله وتنتظره\n- الأنبوب '|' في الدرس الأخير من الوحدة سيكشف أن الصَدَفة أداة تركيب تدفقات نصية — قلب فلسفة يونكس",
          en: "The shell is not part of the kernel, nor 'the system's official interface' — it is an entirely ordinary program running in user space whose job is to read what you type, interpret it, and launch the requested programs.\n\nThat humble definition is the secret of its power: being just a program, it has been replaced over history by better shells — the classic Bourne shell (sh), then C shell and Korn, then Bash (Bourne-Again Shell), the default on most Linuxes, and zsh on modern macOS. And you can switch your shell with a single command.\n\n- The shell = a command interpreter + a full programming language (variables, loops, conditionals)\n- When you type ls, the shell searches the paths for the ls program, launches it and waits\n- The pipe '|' in the module's final lesson will reveal the shell as a stream-composition tool — the heart of Unix philosophy",
        },
        tip: {
          ar: "جرّب الآن: man 1 mkdir ثم man 2 mkdir — الأول وثائق الأمر، والثاني وثائق استدعاء النظام. رأيت بعينك الفرق بين CLI و API!",
          en: "Try it now: man 1 mkdir then man 2 mkdir — the first documents the command, the second the system call. You have just seen the CLI vs API difference with your own eyes!",
        },
      },
      {
        heading: { ar: "لماذا يهمك فهم الطبقات؟", en: "Why Do the Layers Matter to You?" },
        body: {
          ar: "لأن كل استكشاف أخطاء في حياتك المهنية سيصبح رحلة عبر هذه الطبقات:\n\n- برنامج لا يفتح ملف؟ اسأل: هل الطلب وصل النواة؟ هل رفضت الصلاحية؟ هل القرص ممتلئ؟\n- خادم لا يستقبل اتصالات؟ هل المشكلة في التطبيق أم المكتبة أم النواة أم البطاقة؟\n- كل أمر تحفيزي لك في هذه المنصة يمر عبر هذا المخطط حرفياً\n\nالمهندس الذي يرى الطبقات يعزل المشكلة بدقة؛ والذي لا يراها يعيد تشغيل كل شيء ويصل متأخراً. احفظ هذا المخطط جيداً — ستحتاجه في كل وحدة قادمة.",
          en: "Because every troubleshooting task in your professional life will become a journey across these layers:\n\n- A program won't open a file? Ask: did the request reach the kernel? Was permission denied? Is the disk full?\n- A server accepts no connections? Is the problem in the app, the library, the kernel, or the card?\n- Literally every command you run on this platform passes through this exact diagram\n\nThe engineer who sees the layers isolates problems precisely; the one who does not restarts everything and arrives late. Memorize this diagram — you will need it in every upcoming module.",
        },
      },
    ],
    keyPoints: [
      { ar: "خمس طبقات: تطبيقات → أوامر ومكتبات → واجهة استدعاءات → نواة → عتاد", en: "Five layers: applications → commands & libraries → syscall interface → kernel → hardware" },
      { ar: "الطلبات تنزل والردود تصعد عبر الطبقات نفسها", en: "Requests descend and replies ascend through the same layers" },
      { ar: "API للمبرمج (mkdir()‎ و math.h) — CLI للمستخدم (أمر mkdir)، وكلاهما يصل النواة", en: "API for the programmer (mkdir(), math.h) — CLI for the user (the mkdir command); both reach the kernel" },
      { ar: "الصَدَفة برنامج عادي في فضاء المستخدم — ولهذا يمكن استبدالها (bash، zsh)", en: "The shell is an ordinary user-space program — which is why it can be swapped (bash, zsh)" },
      { ar: "كل طبقة تثق بالطبقة الأدنى وتتجاهل تفاصيلها الداخلية", en: "Every layer trusts the lower one and ignores its internal details" },
    ],
    commands: [
      { cmd: "echo $SHELL", desc: { ar: "أي صَدَفة تعمل أمامك الآن؟", en: "Which shell is running in front of you?" } },
      { cmd: "which bash", desc: { ar: "أين يسكن برنامج الصَدَفة في شجرة الملفات؟", en: "Where does the shell program live in the file tree?" } },
      { cmd: "man 1 mkdir", desc: { ar: "وثائق أمر mkdir كما يراها المستخدم (CLI)", en: "The mkdir command docs as the user sees them (CLI)" } },
      { cmd: "man 2 mkdir", desc: { ar: "وثائق استدعاء النظام mkdir()‎ كما يراها المبرمج (API)", en: "The mkdir() system-call docs as the programmer sees them (API)" } },
    ],
    quiz: [
      {
        q: { ar: "ما الترتيب الصحيح للطبقات من الأعلى للأسفل؟", en: "What is the correct layer order from top to bottom?" },
        options: [
          { ar: "نواة → تطبيقات → أوامر → عتاد → واجهة استدعاءات", en: "Kernel → applications → commands → hardware → syscall interface" },
          { ar: "تطبيقات → أوامر ومكتبات → واجهة استدعاءات → نواة → عتاد", en: "Applications → commands & libraries → syscall interface → kernel → hardware" },
          { ar: "عتاد → نواة → أوامر → تطبيقات → واجهة استدعاءات", en: "Hardware → kernel → commands → applications → syscall interface" },
          { ar: "واجهة استدعاءات → تطبيقات → عتاد → أوامر → نواة", en: "Syscall interface → applications → hardware → commands → kernel" },
        ],
        correct: 1,
        explain: { ar: "المخطط الكلاسيكي من Stallings: التطبيقات أعلى، والعتاد أسفل، وبينهما الأوامر والمكتبات فالبوابة فالنواة.", en: "The classic Stallings diagram: applications on top, hardware at the bottom, with commands, gateway and kernel between." },
      },
      {
        q: { ar: "الفرق بين mkdir()‎ في C وأمر mkdir في الصَدَفة هو:", en: "The difference between C's mkdir() and the shell's mkdir command is:" },
        options: [
          { ar: "لا فرق: الشيء نفسه تماماً", en: "No difference: exactly the same thing" },
          { ar: "الدالة API للمبرمج والأمر CLI للمستخدم، وكلاهما يستدعي النواة", en: "The function is a programmer API, the command a user CLI; both invoke the kernel" },
          { ar: "الدالة تعمل في النواة والأمر في العتاد", en: "The function runs in the kernel and the command in hardware" },
          { ar: "الأمر أسرع لأنه يتخطى النواة", en: "The command is faster because it skips the kernel" },
        ],
        correct: 1,
        explain: { ar: "الأمر برنامج صغير يستدعي الدالة نفسها؛ جمهور API هو المبرمجين وجمهور CLI هو المستخدمين، والبوابة واحدة.", en: "The command is a small program invoking that same function; the API's audience is programmers, the CLI's is users, and the gateway is one." },
      },
      {
        q: { ar: "الصَدَفة (Shell) هي:", en: "The shell is:" },
        options: [
          { ar: "جزء لا يتجزأ من النواة", en: "An inseparable part of the kernel" },
          { ar: "قطعة عتاد خاصة بالطرفيات", en: "A terminal-specific piece of hardware" },
          { ar: "برنامج عادي في فضاء المستخدم يفسر أوامرك ويشغّل البرامج", en: "An ordinary user-space program interpreting your commands and launching programs" },
          { ar: "واجهة رسومية للنوافذ", en: "A graphical windows interface" },
        ],
        correct: 2,
        explain: { ar: "كون الصَدَفة مجرد برنامج هو سبب وجود عائلة كاملة منها (sh، bash، zsh) وقابليتها للاستبدال.", en: "Being just a program is why a whole family exists (sh, bash, zsh) and why they are swappable." },
      },
      {
        q: { ar: "عندما ترفض النواة طلب قراءة ملف لغياب الصلاحية، فإن رسالة الخطأ:", en: "When the kernel refuses a file-read request for lack of permission, the error message:" },
        options: [
          { ar: "تمحوها النواة ولا تظهر لأحد", en: "Is erased by the kernel, shown to no one" },
          { ar: "تصعد عبر الطبقات نفسها التي نزل منها الطلب", en: "Climbs back up the same layers the request came down" },
          { ar: "تُطبع مباشرة على العتاد", en: "Is printed directly onto the hardware" },
          { ar: "تتحول إلى رسالة بريد إلكتروني", en: "Turns into an email message" },
        ],
        correct: 1,
        explain: { ar: "الرفض يصعد كما يصعد النجاح: نفس مسار الطلب بالاتجاه المعاكس، حتى تظهر لك رسالة Permission denied.", en: "Refusal climbs like success: the same path in reverse, until you see Permission denied." },
      },
    ],
  },

  // ── l115 · Unix vs Windows vs Mac ─────────────────────────────────────
  {
    id: "l115",
    moduleId: "m12",
    order: 5,
    level: "beginner",
    title: {
      ar: "يونكس مقابل ويندوز مقابل ماك",
      en: "Unix vs Windows vs Mac",
    },
    summary: {
      ar: "مقارنة IT6004 الشاملة: الثلاثة وسطاء موارد، لكن واجهة ويندوز WinAPI مقابل POSIX، وأنظمة ملفات NTFS مقابل ext/APFS، وترخيص مقابل ترخيص — ولماذا يندر فيروس لينكس؟",
      en: "The full IT6004 comparison: all three are resource middleware, but Windows' WinAPI versus POSIX, NTFS versus ext/APFS file systems, licensing versus licensing — and why Linux viruses are rare.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "ثلاثة أنظمة، وظيفة واحدة: الوسيط", en: "Three Systems, One Job: The Middleware" },
        body: {
          ar: "كما رأيت في درس المعمارية، كل نظام تشغيل — ويندوز كان أو يونكس أو ماك — هو وسيط بين التطبيقات والعتاد: يدير الموارد ويقدم الخدمات عبر بوابة موحدة.\n\nالفرق ليس في «هل يقوم بالوظيفة؟» بل في «كيف؟ وبأي عقد؟ وبأي ثمن؟»:\n\n- ويندوز من مايكروسوفت: نظام تجاري مغلق، هيمن على المكاتب والألعاب\n- لينكس (سليل يونكس): نواة حرة مفتوحة المصدر، هيمن على الخوادم والسحابة\n- macOS من أبل: نظام مغلق فوق نواة بجذور BSD، يُباع ملتصقاً بأجهزة أبل\n\nمثير للاهتمام: اثنان من الثلاثة (macOS وأندرويد/لينكس) يحملان جينات يونكس مباشرة — المعركة اليوم في جوهرها «ويندوز ضد عائلة يونكس».",
          en: "As you saw in the architecture lesson, every OS — Windows, Unix or Mac — is a middleware between applications and hardware: managing resources and serving them through a unified gateway.\n\nThe difference is not 'does it do the job?' but 'how? under what contract? at what price?':\n\n- Microsoft's Windows: a closed commercial system that conquered offices and gaming\n- Linux (Unix's heir): a free open-source kernel that conquered servers and the cloud\n- Apple's macOS: a closed system over a BSD-rooted kernel, sold attached to Apple hardware\n\nInterestingly, two of the three (macOS and Android/Linux) carry direct Unix genes — today's battle is at heart 'Windows versus the Unix family'.",
        },
      },
      {
        heading: { ar: "المقارنة الكبرى", en: "The Big Comparison" },
        table: {
          caption: { ar: "يونكس/لينكس مقابل ويندوز مقابل ماك — كما في جدول محاضراتك", en: "Unix/Linux vs Windows vs Mac — as in your lecture's table" },
          headers: [
            { ar: "الجانب", en: "Aspect" },
            { ar: "يونكس / لينكس", en: "Unix / Linux" },
            { ar: "ويندوز", en: "Windows" },
            { ar: "macOS", en: "macOS" },
          ],
          rows: [
            [
              { ar: "الواجهة البرمجية", en: "Programming interface" },
              { ar: "POSIX موحدة ومفتوحة (bash، libc)", en: "Unified open POSIX (bash, libc)" },
              { ar: "WinAPI بوحدات kernel32 و advapi32 و gdi و user32", en: "WinAPI: kernel32, advapi32, gdi, user32" },
              { ar: "جذور POSIX + أطر Cocoa خاصة", en: "POSIX roots + proprietary Cocoa frameworks" },
            ],
            [
              { ar: "الواجهة الرسومية", en: "Graphical interface" },
              { ar: "سطح مكتب اختياري (GNOME/KDE) — مجرد برمجية فوق النظام", en: "Optional desktop (GNOME/KDE) — just software above the system" },
              { ar: "مدمجة بعمق مع النظام ومصممة من مايكروسوفت", en: "Deeply integrated, designed by Microsoft" },
              { ar: "Aqua مصممة من أبل ومدمجة بإحكام", en: "Apple's tightly integrated Aqua" },
            ],
            [
              { ar: "نظام الملفات", en: "File system" },
              { ar: "ext4 حساس لحالة الأحرف بصلاحيات مالك/مجموعة/آخرين", en: "ext4: case-sensitive with owner/group/other permissions" },
              { ar: "NTFS غير حساس افتراضياً بصلاحيات ACL", en: "NTFS: case-insensitive by default with ACL permissions" },
              { ar: "APFS بجذور يونكس، غير حساس افتراضياً", en: "APFS with Unix roots, case-insensitive by default" },
            ],
            [
              { ar: "الترخيص والتكلفة", en: "Licensing & cost" },
              { ar: "مجاني وحر مفتوح المصدر — عدّله ووزّعه", en: "Free and open source — modify and redistribute" },
              { ar: "تجاري برخصة لكل جهاز/مستخدم", en: "Commercial license per device/user" },
              { ar: "مجاني لكن سجين أجهزة أبل المدفوعة", en: "Free but bound to paid Apple hardware" },
            ],
            [
              { ar: "الأمان والفيروسات", en: "Security & viruses" },
              { ar: "نادر جداً — عزل صلاحيات متعدد المستخدمين + حصة سوق صغيرة للحواسيب المكتبية", en: "Very rare — multi-user permission isolation + small desktop market share" },
              { ar: "الهدف الأول للفيروسات لضخامة الانتشار", en: "The primary virus target due to sheer prevalence" },
              { ar: "نادر نسبياً — سيطرة أبل على المتجر + جذور يونكس", en: "Relatively rare — Apple's store control + Unix roots" },
            ],
            [
              { ar: "معقل الهيمنة", en: "Stronghold" },
              { ar: "الخوادم والسحابة والأجهزة المدمجة والهواتف (أندرويد)", en: "Servers, cloud, embedded devices, phones (Android)" },
              { ar: "حواسيب المكاتب والألعاب والشركات", en: "Office desktops, gaming, enterprises" },
              { ar: "التصميم والإبداع والاستوديوهات", en: "Design, creativity, studios" },
            ],
          ],
        },
        body: {
          ar: "هذا الجدول هو جوهر مهمة المقارنة في مختبر المادة الأولى. لاحظ سطر الواجهة البرمجية تحديداً: ويندوز يتحدث عبر WinAPI بوحداتها الشهيرة (kernel32 للنواة، advapi32 للأمان، gdi و user32 للرسوميات والنوافذ)، بينما عائلة يونكس تتحدث عبر POSIX الموحدة.\n\nالنتيجة العملية: برنامج ويندوز لا يعمل على لينكس مباشرة (والعكس صحيح) — ليس لأن أحدهما «أفضل» بل لأن كل طرف يتحدث بلغة واجهة مختلفة إلى النواة. وهذا بالضبط سبب أهمية معايير مثل POSIX للنقل بين الأنظمة.",
          en: "This table is the heart of the comparison task in your first course lab. Notice the API row especially: Windows speaks through WinAPI and its famous units (kernel32 for the kernel, advapi32 for security, gdi and user32 for graphics and windows), while the Unix family speaks unified POSIX.\n\nThe practical outcome: a Windows program does not run on Linux directly (nor the reverse) — not because one is 'better' but because each speaks a different interface language to its kernel. That is precisely why standards like POSIX matter for portability.",
        },
      },
      {
        heading: { ar: "الأمان والفيروسات: لماذا نادراً ما يُصاب لينكس؟", en: "Security & Viruses: Why Is a Linux Infection Rare?" },
        body: {
          ar: "تقول محاضرتك بصراحة: من النادر جداً أن يُصاب نظام لينكس بفيروس. لماذا؟ سببان يعملان معاً:\n\n1. التصميم متعدد المستخدمين: منذ الستينيات بُني يونكس على فكرة مستخدمين كثيرين بصلاحيات محصورة. الفيروس الذي يصيب برنامجاً تحت حسابك يجد نفسه محبوساً في مساحتك: لا يعدّل ملفات النظام، ولا يثبّت نفسه للآخرين، وكل تثبيت يتطلب صلاحيات الجذر المشدودة\n2. الحصة السوقية: كتّاب الفيروسات يستهدفون أكبر جمهور بأقل جهد — وحواسيب المكتب أغلبها ويندوز، بينما لينكس يسكن الخوادم المحروسة، فالعائد الإجرامي على استهدافه ضعيف\n\nلاحظ الفرق بين «أقل مستهدف» و«محصّن سحرياً»: لينكس ليس بلا ثغرات، لكن تصميم الصلاحيات يجعل انتشار الضرر أصعب بكثير — وستدرس العزل هذا بالتفصيل في درس تعدد المستخدمين.",
          en: "Your lecture states it plainly: it is rare to get a Linux virus. Why? Two reasons working together:\n\n1. The multi-user design: since the late 1960s Unix has been built around many users with confined permissions. A virus infecting a program under your account finds itself trapped in your space: it cannot modify system files, cannot install itself for others, and installation demands tightly-guarded root privileges\n2. Market share: virus authors chase the largest audience for least effort — office desktops are mostly Windows, while Linux lives on guarded servers, so the criminal return on targeting it is weak\n\nNote the difference between 'less targeted' and 'magically immune': Linux is not flawless, but its permission design makes damage spread far harder — and you will study that isolation in detail in the multi-user lesson.",
        },
      },
      {
        heading: { ar: "متى ينتصر كل منها؟", en: "When Does Each Win?" },
        body: {
          ar: "لا يوجد «أفضل نظام للجميع» — يوجد الأنسب لكل مهمة:\n\n- مختبرات شبكات وخوادم وأتمتة وسحابة: لينكس بلا منازع — ستتأكد بنفسك في مختبرات AWS في هذه المادة\n- بيئة عمل تعتمد برامج مكتبية احتكارية أو ألعاباً أو برمجيات شركات قديمة: ويندوز غالباً الواقع العملي\n- تصميم وإنتاج وسائط وتطوير iOS: ماك هو البيئة الطبيعية\n\nنصيحة مهنية صادقة: مهندس الشبكات الحديث يتقن الاثنين معاً — خوادم لينكس في قلب العملية، وويندوز في حواسيب المستخدمين التي سيخدمها ودعمها. لذلك نؤكد لينكس في هذه المنصة دون أن نحتقر ويندوز: نحن نعلمك بيئة الخوادم التي ستديرها يوماً ما.",
          en: "There is no 'best OS for everyone' — only the fittest per task:\n\n- Network labs, servers, automation and cloud: Linux, unchallenged — you will verify this yourself on this course's AWS labs\n- A workplace depending on proprietary office software, gaming or legacy enterprise apps: Windows is usually the practical reality\n- Design, media production and iOS development: the Mac is the natural habitat\n\nA career tip: the modern network engineer masters both — Linux servers at the heart of operations, and Windows on the user machines you will one day support. That is why this platform emphasizes Linux without despising Windows: we are teaching you the server environment you will manage.",
        },
        tip: {
          ar: "أثناء عملك قد تدير خوادم لينكس من داخل حاسوب ويندوز عبر SSH — ستقوم بذلك حرفياً في مختبرات المادة.",
          en: "At work you may manage Linux servers from a Windows machine over SSH — you will literally do that in this course's labs.",
        },
      },
    ],
    keyPoints: [
      { ar: "الثلاثة أنظمة وسطاء موارد؛ الفرق في العقود والتصميم والثمن", en: "All three are resource middleware; they differ in contracts, design and price" },
      { ar: "ويندوز يتحدث WinAPI (kernel32, advapi32, gdi, user32) وعائلة يونكس تتحدث POSIX", en: "Windows speaks WinAPI (kernel32, advapi32, gdi, user32); the Unix family speaks POSIX" },
      { ar: "سطح المكتب في لينكس مجرد برمجية قابلة للتبديل — ليست جزءاً من النظام", en: "The Linux desktop is swappable software — not part of the OS itself" },
      { ar: "فيروسات لينكس نادرة: عزل صلاحيات متعدد المستخدمين + حصة مكتبية صغيرة", en: "Linux viruses are rare: multi-user permission isolation + small desktop share" },
      { ar: "الخوادم والسحابة مملكة لينكس؛ والمكاتب والألعاب مملكة ويندوز؛ والتصميم مملكة ماك", en: "Servers and cloud are Linux's kingdom; offices and gaming Windows'; design the Mac's" },
    ],
    commands: [
      { cmd: "uname -o", desc: { ar: "نوع نظام التشغيل — سيرد بـ GNU/Linux على مختبرك", en: "The OS type — answers GNU/Linux on your lab" } },
      { cmd: "hostnamectl", desc: { ar: "لوحة تعريف كاملة: النظام والإصدار والنواة ونوع الجهاز", en: "A full identity panel: system, release, kernel, chassis type" } },
      { cmd: "cat /etc/os-release", desc: { ar: "بيانات التوزيعة الرسمية بمقارنتها مع ويندوز في تقرير المختبر", en: "Official distro facts for your lab comparison report" } },
    ],
    quiz: [
      {
        q: { ar: "وحدة WinAPI المسؤولة عن الرسوميات والنوافذ في ويندوز هي:", en: "The WinAPI units responsible for graphics and windows are:" },
        options: [
          { ar: "gdi و user32", en: "gdi and user32" },
          { ar: "kernel32 و advapi32", en: "kernel32 and advapi32" },
          { ar: "libc و math.h", en: "libc and math.h" },
          { ar: "bash و grep", en: "bash and grep" },
        ],
        correct: 0,
        explain: { ar: "gdi للرسوميات و user32 للنوافذ؛ أما kernel32 فبوابة النواة و advapi32 للأمان — كما في محاضرتك.", en: "gdi for graphics and user32 for windows; kernel32 is the kernel gateway and advapi32 security — as in your lecture." },
      },
      {
        q: { ar: "أهم سبب تصميمي لندرة فيروسات لينكس على الحواسيب المكتبية:", en: "The key design reason Linux desktop viruses are rare:" },
        options: [
          { ar: "لأن أحداً لا يستخدم لينكس إطلاقاً", en: "Because nobody uses Linux at all" },
          { ar: "عزل صلاحيات المستخدمين يمنع الفيروس من الانتشار خارج حساب الضحية", en: "User permission isolation stops a virus spreading beyond the victim's account" },
          { ar: "لينكس لا يدعم البرامج أصلاً", en: "Linux does not support programs at all" },
          { ar: "برامج مكافحة الفيروسات مدمجة فقط", en: "Antivirus is simply pre-installed" },
        ],
        correct: 1,
        explain: { ar: "التصميم متعدد المستخدمين منذ الستينيات يحصر الضرر، مع عامل حصة السوق الصغيرة مكتبياً — كما تشرح المحاضرة.", en: "The multi-user design since the late 1960s confines damage, plus the small desktop market share — as the lecture explains." },
      },
      {
        q: { ar: "سطح المكتب GNOME في لينكس هو:", en: "The GNOME desktop on Linux is:" },
        options: [
          { ar: "جزء من النواة لا يمكن تغييره", en: "A kernel part that cannot be changed" },
          { ar: "قطعة عتاد مدمجة", en: "A built-in piece of hardware" },
          { ar: "برمجية فوق النظام يمكن استبدالها بأخرى مثل KDE", en: "Software above the OS, swappable for another such as KDE" },
          { ar: "ترخيص من مايكروسوفت", en: "A Microsoft license" },
        ],
        correct: 2,
        explain: { ar: "المعمارية الطبقية تسمح بتبديل سطح المكتب كله دون لمس النواة — مرونة لا توجد في المنافسين بنفس الدرجة.", en: "The layered architecture lets you swap the whole desktop without touching the kernel — a flexibility unmatched by the rivals." },
      },
    ],
  },

  // ── l116 · Linux Distributions & Desktop Environments ─────────────────
  {
    id: "l116",
    moduleId: "m12",
    order: 6,
    level: "beginner",
    title: {
      ar: "توزيعات لينكس وسطوح المكتب",
      en: "Linux Distributions & Desktop Environments",
    },
    summary: {
      ar: "درس نشاط المطابقة الشهير: نظام التشغيل مقابل الإصدار مقابل التوزيعة — Windows و XP/Vista/7، ويونكس التجارية HP-UX و Solaris، ولينكس Ubuntu و Red Hat، و macOS من Leopard إلى Ventura، ثم عائلات التوزيعات و GNOME و KDE.",
      en: "The famous matching-activity lesson: OS versus version versus distribution — Windows and XP/Vista/7, commercial Unix HP-UX and Solaris, Linux Ubuntu and Red Hat, macOS from Leopard to Ventura, then distro families and GNOME vs KDE.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "نظام تشغيل، إصدار، توزيعة: فك الخلط", en: "OS, Version, Distribution: Untangling the Confusion" },
        table: {
          caption: { ar: "جدول نشاط المطابقة: كل نظام وإصداراته وتوزيعاته", en: "The matching-activity table: each OS with its versions and distributions" },
          headers: [
            { ar: "نظام التشغيل", en: "Operating system" },
            { ar: "طبيعته", en: "Nature" },
            { ar: "أمثلة الإصدارات / التوزيعات", en: "Versions / distributions" },
          ],
          rows: [
            [
              { ar: "Windows", en: "Windows" },
              { ar: "تجاري من مايكروسوفت", en: "Commercial, Microsoft" },
              { ar: "XP، Vista، 7، 10، 11", en: "XP, Vista, 7, 10, 11" },
            ],
            [
              { ar: "Unix التجارية", en: "Commercial Unix" },
              { ar: "نسل System V/BSD بترخيص مدفوع", en: "System V/BSD lineage, paid license" },
              { ar: "HP-UX، Solaris، AIX", en: "HP-UX, Solaris, AIX" },
            ],
            [
              { ar: "Linux", en: "Linux" },
              { ar: "نواة حرة + مجمّعات توزّعها «توزيعات»", en: "Free kernel + packagers shipping 'distributions'" },
              { ar: "Red Hat، Suse، Ubuntu، Debian، CentOS، Amazon Linux 2", en: "Red Hat, Suse, Ubuntu, Debian, CentOS, Amazon Linux 2" },
            ],
            [
              { ar: "macOS", en: "macOS" },
              { ar: "تجاري من أبل فوق نواة بجذور BSD", en: "Commercial, Apple, over a BSD-rooted kernel" },
              { ar: "10.5 Leopard، 10.6 Snow Leopard، …، 13 Ventura", en: "10.5 Leopard, 10.6 Snow Leopard, …, 13 Ventura" },
            ],
          ],
        },
        body: {
          ar: "هذا هو التمرين الذي بدأت به مختبرات المادة الأولى (نشاط المطابقة في ملف الجدول): تفرّق بين ثلاثة مستويات يخلطها الناس:\n\n- نظام التشغيل: العائلة الكبرى — Windows أو Unix أو Linux أو macOS\n- الإصدار (Version): نسخة زمنية مسماة من نظام واحد — Windows 11 هو إصدار، و macOS Ventura إصدار\n- التوزيعة (Distribution): مفهوم خاص بلينكس — لأن النواة وحدها لا تكفي، يجمع أحدهم النواة مع الأدوات والمكتبات وسطح المكتب ومدير الحزم في حزمة جاهزة للتثبيت، فيولد «توزيعة» مثل Ubuntu أو Red Hat\n\nخدعة مفيدة للحفظ: في عالم ويندوز تقول مايكروسوفت «هذا إصدارنا الجديد»؛ وفي عالم لينكس يقول المجتمع «هذه توزيعتنا الجديدة». أنت الآن تملك مفاتيح نشاط المطابقة كاملاً — جرّبها في التمرين التفاعلي أدناه!",
          en: "This is the exercise your first course lab began with (the spreadsheet matching activity): distinguishing three levels people constantly confuse:\n\n- Operating system: the great family — Windows, Unix, Linux or macOS\n- Version: a named point-in-time release of one system — Windows 11 is a version, macOS Ventura is a version\n- Distribution: a Linux-specific concept — since the kernel alone is not enough, someone assembles the kernel with tools, libraries, a desktop and a package manager into an installable bundle, and a 'distribution' like Ubuntu or Red Hat is born\n\nA memory hook: in the Windows world Microsoft says 'here is our new version'; in the Linux world the community says 'here is our new distribution'. You now hold the full key to the matching activity — try it in the interactive exercise below!",
        },
      },
      {
        heading: { ar: "عائلات توزيعات لينكس", en: "Linux Distribution Families" },
        body: {
          ar: "مئات التوزيعات موجودة، لكنها تنحدر من ثلاث عائلات أم كبرى — ومعرفة العائلة تخبرك بمدير الحزم وثقافة الدعم:\n\n- عائلة Debian: Debian الجدّ، و Ubuntu الشهيرة سهلة الاستخدام، و Mint و Kali — حزمها بصيغة deb عبر apt\n- عائلة Red Hat: Red Hat Enterprise Linux (RHEL) للشركات بدعم مدفوع، و CentOS و Rocky و Alma المتوافقة مجاناً، و Fedora مختبر التطوير — حزمها rpm عبر yum/dnf\n- عائلة Arch: توزيعة «اصنعها بنفسك» للمحترفين العاشقين للتحكم الكامل — حزمها عبر pacman\n\nولماذا يهمك هذا في مختبرات المادة؟ لأن خادمك يعمل بـ Amazon Linux 2 — وهو سليل عائلة Red Hat ويستخدم yum، وستستخدمه فعلياً في تثبيت الحزم.",
          en: "Hundreds of distributions exist, but they descend from three great mother families — knowing the family tells you the package manager and the support culture:\n\n- The Debian family: Debian the ancestor, the famous easy Ubuntu, Mint and Kali — .deb packages via apt\n- The Red Hat family: Red Hat Enterprise Linux (RHEL) for companies with paid support, the free compatible CentOS/Rocky/Alma, and Fedora the development lab — rpm packages via yum/dnf\n- The Arch family: a build-it-yourself distro for enthusiasts craving total control — pacman packages\n\nAnd why does this matter in your labs? Because your lab server runs Amazon Linux 2 — a Red Hat family descendant using yum, which you will actually use to install packages.",
        },
      },
      {
        heading: { ar: "أجنحة سطح المكتب: GNOME و KDE و XFCE", en: "Desktop Environments: GNOME, KDE & XFCE" },
        table: {
          caption: { ar: "أجنحة سطح المكتب الثلاثة الكبرى", en: "The three major desktop environments" },
          headers: [
            { ar: "الجِناح", en: "Environment" },
            { ar: "فلسفته", en: "Philosophy" },
            { ar: "وزنه ومتطلباته", en: "Weight & requirements" },
          ],
          rows: [
            [
              { ar: "GNOME", en: "GNOME" },
              { ar: "بساطة مصقولة وتجربة موحدة — افتراضي أوبونتو و RHEL", en: "Polished simplicity, unified experience — Ubuntu & RHEL default" },
              { ar: "متوسط — يحتاج جهازاً معقولاً", en: "Moderate — needs a reasonable machine" },
            ],
            [
              { ar: "KDE Plasma", en: "KDE Plasma" },
              { ar: "تخصيص لا نهائي وقوة أدوات — افتراضي توزيعات مثل openSUSE", en: "Endless customization and tooling power — default on distros like openSUSE" },
              { ar: "متوسط إلى خفيف حديثاً", en: "Moderate to light in modern releases" },
            ],
            [
              { ar: "XFCE", en: "XFCE" },
              { ar: "خفة وأمانة للمعدات القديمة والخوادم العرضية", en: "Lightness and honesty for old hardware and occasional servers" },
              { ar: "خفيف جداً — يعمل على أي شيء", en: "Very light — runs on anything" },
            ],
          ],
        },
        body: {
          ar: "تقول محاضرتك بوضوح: سطح المكتب (Desktop Environment) مجرد طبقة برمجية فوق النظام — ليست «النظام» نفسه. لهذا يمكن تثبيت GNOME أو KDE أو XFCE على التوزيعة نفسها، وتبديلها، أو إزالتها كلياً!\n\n- جناح سطح المكتب يضم: النوافذ وقوائم المهام ومدير الملفات ولوحة الإعدادات والإعدادات الرسومية\n- وثيقة المحاضرة تذكر أمثلة البرمجيات الحرة فوقه: Apache للويب و PostgreSQL للبيانات و LibreOffice للمكتب و GIMP للصور و PHP و Emacs\n- الأفضل للمبتدئ؟ لا يوجد: Ubuntu+GNOME نقطة انطلاق لطيفة، ومحبو التخصيص يعشقون KDE",
          en: "Your lecture says it clearly: a desktop environment is just a software layer above the system — not the system itself. That is why you can install GNOME, KDE or XFCE on the same distro, switch them, or remove them entirely!\n\n- A desktop environment bundles: windows, taskbars, the file manager, settings panels and graphical utilities\n- The lecture document lists the free software living on top: Apache for web, PostgreSQL for data, LibreOffice for office, GIMP for images, PHP and Emacs\n- Best for beginners? There is none: Ubuntu+GNOME is a gentle starting point, customization lovers adore KDE",
        },
      },
      {
        heading: { ar: "الخوادم تعيش بلا شاشة: Headless", en: "Servers Live Without a Screen: Headless" },
        body: {
          ar: "المفاجأة التي تنتظر كثيرين: أغلب خوادم لينكس في العالم لا تعمل بأي واجهة رسومية أصلاً! تسمى «بلا رأس» (Headless): صندوق في مركز بيانات بلا شاشة ولا لوحة مفاتيح دائمة.\n\nكيف تديره إذن؟ عن بعد عبر SSH — تماماً كما ستفعل في مختبرات هذه المادة مع خادمك على AWS. النص المكتوب عبر الطرفية أخف وأسرع وأدق من أي واجهة رسومية عبر الشبكة، ويستهلك موارد الخادم الضئيلة في الحوسبة الحقيقية لا في رسم النوافذ.\n\n- الخلاصة العملية: سطح المكتب للحواسيب الشخصية، والطرفية للخوادم — وأنعم من الهذين للجهاز المكتبي الحديث يجمعهما معاً\n- مهارتك المستقبلية هي إدارة أنظمة عبر SSH — وستتقنها وحدة تالية كاملة",
          en: "A surprise awaiting many: most Linux servers worldwide run with no GUI at all! They are called headless: a box in a data center with no screen and no permanent keyboard.\n\nHow do you manage it then? Remotely over SSH — exactly as you will do in this course's labs with your AWS server. Text over a terminal is lighter, faster and more precise than any GUI across a network, and it spends the server's scarce resources on real computing, not on drawing windows.\n\n- The practical summary: desktops for personal machines, terminals for servers — and a modern desktop machine happily combines both\n- Your future skill is administering systems over SSH — a whole upcoming module is dedicated to it",
        },
        tip: {
          ar: "قبل أي مقابلة عمل تقنية، اختبر نفسك: هل تستطيع شرح الفرق بين Windows و Unix التجارية و Linux و macOS، وتسمي مثالين لكل واحدة؟ راجع جدول المطابقة — إنه سؤال مقابلات شائع فعلاً.",
          en: "Before any technical job interview, test yourself: can you explain the difference between Windows, commercial Unix, Linux and macOS, and name two examples of each? Review the matching table — it is a genuinely common interview question.",
        },
      },
    ],
    keyPoints: [
      { ar: "نظام التشغيل = العائلة؛ الإصدار = نسخة زمنية؛ التوزيعة = حزمة لينكس جاهزة", en: "OS = family; version = point-in-time release; distribution = ready-made Linux bundle" },
      { ar: "ويندوز: XP حتى 11 — يونكس تجارية: HP-UX و Solaris و AIX — لينكس: Ubuntu و Red Hat و Amazon Linux 2 — ماك: Leopard حتى Ventura", en: "Windows: XP to 11 — commercial Unix: HP-UX, Solaris, AIX — Linux: Ubuntu, Red Hat, Amazon Linux 2 — Mac: Leopard to Ventura" },
      { ar: "ثلاث عائلات لينكس كبرى: Debian (apt) و Red Hat (yum/dnf) و Arch (pacman)", en: "Three great Linux families: Debian (apt), Red Hat (yum/dnf), Arch (pacman)" },
      { ar: "Amazon Linux 2 سليل عائلة Red Hat — بيئة مختبراتك على AWS", en: "Amazon Linux 2 is a Red Hat family descendant — your AWS lab environment" },
      { ar: "سطح المكتب مجرد برمجية: GNOME بساطة، KDE تخصيص، XFCE خفة — والخوادم Headless عبر SSH", en: "The desktop is just software: GNOME simple, KDE customizable, XFCE light — and servers are headless over SSH" },
    ],
    commands: [
      { cmd: "lsb_release -a", desc: { ar: "اسم توزيعتك وإصدارها وعائلتها بالتفصيل", en: "Your distro's name, release and family in detail" } },
      { cmd: "cat /etc/os-release", desc: { ar: "التعريف الرسمي للتوزيعة كما تراه الأدوات", en: "The distro's official identity as tools see it" } },
      { cmd: "echo $XDG_CURRENT_DESKTOP", desc: { ar: "أي جِناح سطح مكتب يعمل الآن؟ (فارغ على خادم Headless!)", en: "Which desktop environment runs now? (empty on a headless server!)" } },
    ],
    quiz: [
      {
        q: { ar: "ما الفرق الجوهري بين «إصدار» و«توزيعة»؟", en: "What is the essential difference between a 'version' and a 'distribution'?" },
        options: [
          { ar: "لا فرق؛ مترادفان", en: "No difference; synonyms" },
          { ar: "الإصدار نسخة زمنية من نظام، والتوزيعة حزمة لينكس تجمع النواة مع الأدوات وسطح المكتب", en: "A version is a system's point-in-time release; a distribution is a Linux bundle of kernel + tools + desktop" },
          { ar: "الإصدار مدفوع والتوزيعة مجانية دائماً", en: "Versions are paid and distributions always free" },
          { ar: "التوزيعة جزء من النواة", en: "A distribution is a kernel part" },
        ],
        correct: 1,
        explain: { ar: "Windows 11 إصدار؛ أما Ubuntu فتوزيعة: نواة + GNU + أدوات + سطح مكتب مجمّعة. هذا جوهر نشاط المطابقة.", en: "Windows 11 is a version; Ubuntu is a distribution: kernel + GNU + tools + desktop assembled. That is the matching activity's core." },
      },
      {
        q: { ar: "خادم مختبرك Amazon Linux 2 ينتمي إلى عائلة:", en: "Your lab's Amazon Linux 2 server belongs to the family of:" },
        options: [
          { ar: "Debian — حزم deb", en: "Debian — deb packages" },
          { ar: "Red Hat — حزم rpm عبر yum/dnf", en: "Red Hat — rpm packages via yum/dnf" },
          { ar: "Arch — pacman", en: "Arch — pacman" },
          { ar: "ويندوز — msi", en: "Windows — msi" },
        ],
        correct: 1,
        explain: { ar: "Amazon Linux 2 سليل RHEL: حزمه rpm وأداته yum — سلمحك باستخدامه في المختبرات لتثبيت الحزم.", en: "Amazon Linux 2 descends from RHEL: rpm packages and yum tooling — you will use it in labs to install packages." },
      },
      {
        q: { ar: "خادم «Headless» يعني أنه:", en: "A 'headless' server means it:" },
        options: [
          { ar: "يعمل بواجهة رسومية فاخرة", en: "Runs with a luxurious graphical interface" },
          { ar: "بلا شاشة أو واجهة رسومية، يُدار عن بعد عبر طرفية", en: "Has no screen or GUI, managed remotely over a terminal" },
          { ar: "فقد رأسه في حادث", en: "Lost its head in an accident" },
          { ar: "يستخدم نظام ويندوز الخادم فقط", en: "Uses only Windows Server" },
        ],
        correct: 1,
        explain: { ar: "الخوادم تخسر الشاشة والواجهة الرسومية لتوفر الموارد، وتُدار عبر SSH — كما ستفعل مع خادم AWS الخاص بك.", en: "Servers drop the screen and GUI to save resources and are managed over SSH — as you will do with your AWS server." },
      },
    ],
  },

  // ── l117 · Linux Filesystem: FHS & ext4 vs NTFS ───────────────────────
  {
    id: "l117",
    moduleId: "m12",
    order: 7,
    level: "beginner",
    title: {
      ar: "نظام ملفات لينكس: FHS و ext4 مقابل NTFS",
      en: "Linux Filesystem: FHS & ext4 vs NTFS",
    },
    summary: {
      ar: "مهمة المختبر الأول لمقارنة إدارة الملفات: شجرة FHS الموحدة من / حتى /dev حيث كل شيء ملف، والمسارات مقابل أحرف الأقراص C:، و ext4 مقابل NTFS في التدوين وحساسية الأحرف والصلاحيات.",
      en: "The first lab's file-management comparison: the unified FHS tree from / to /dev where everything is a file, paths versus drive letters C:, and ext4 versus NTFS on journaling, case sensitivity and permissions.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "كل شيء ملف", en: "Everything Is a File" },
        body: {
          ar: "في ويندوز كل نوع جهاز يتعامل معه بطريقة مختلفة: القرص نافذة، والطابعة أداة، والشبكة مجلد خاص. في يونكس قرار تصميمي واحد يبسط كل شيء: كل شيء ملف (Everything is a File).\n\n- قراءة ملف نصي؟ افتحه واقرأه\n- قراءة بيانات من بطاقة الشبكة؟ افتح «ملفاً» في /dev واقرأه بنفس الأوامر\n- إرسال نص للطابعة؟ اكتب في ملفها\n- حتى معلومات النظام والعمليات تعيش كملفات وهمية في /proc\n\nالثمرة التاريخية: نفس أدوات القراءة والبحث والتصفية (cat، grep، wc) تعمل على كل شيء في النظام — من نص عادي إلى بيانات خام من العتاد. هذه الفكرة من أعمدة فلسفة يونكس التي ستحتفل بها في آخر درس من الوحدة.",
          en: "In Windows each device type is handled differently: the disk is a window, the printer a tool, the network a special folder. In Unix one design decision simplifies everything: everything is a file.\n\n- Read a text file? Open and read it\n- Read raw data from the network card? Open a 'file' under /dev and read it with the same commands\n- Send text to the printer? Write into its file\n- Even system and process information lives as virtual files under /proc\n\nThe historic fruit: the same reading, searching and filtering tools (cat, grep, wc) work on everything in the system — from plain text to raw hardware data. This idea is a pillar of the Unix philosophy you will celebrate in the module's last lesson.",
        },
      },
      {
        heading: { ar: "شجرة FHS: خريطة المجلدات المعيارية", en: "The FHS Tree: The Standard Directory Map" },
        table: {
          caption: { ar: "معيار FHS: أهم المجلدات وغاياتها", en: "The FHS standard: key directories and their purposes" },
          headers: [
            { ar: "المسار", en: "Path" },
            { ar: "غايته", en: "Purpose" },
            { ar: "مثال محتوى", en: "Example content" },
          ],
          rows: [
            [
              { ar: "/", en: "/" },
              { ar: "الجذر: نقطة البداية لكل المسارات — لا يوجد C: و D:", en: "The root: start of every path — no C: or D:" },
              { ar: "كل الشجرة تنبثق منه", en: "The whole tree sprouts from it" },
            ],
            [
              { ar: "/bin", en: "/bin" },
              { ar: "الأوامر الأساسية لكل المستخدمين", en: "Essential commands for all users" },
              { ar: "ls، cp، cat، bash", en: "ls, cp, cat, bash" },
            ],
            [
              { ar: "/etc", en: "/etc" },
              { ar: "ملفات الإعدادات للنظام والخدمات", en: "System and service configuration files" },
              { ar: "passwd، ssh/sshd_config", en: "passwd, ssh/sshd_config" },
            ],
            [
              { ar: "/home", en: "/home" },
              { ar: "ملفات المستخدمين الشخصية", en: "Users' personal files" },
              { ar: "/home/student1", en: "/home/student1" },
            ],
            [
              { ar: "/var", en: "/var" },
              { ar: "بيانات متغيرة: سجلات، بريد، طوابير طباعة", en: "Variable data: logs, mail, print queues" },
              { ar: "log/messages، log/secure", en: "log/messages, log/secure" },
            ],
            [
              { ar: "/usr", en: "/usr" },
              { ar: "البرامج والمصادر المثبتة للنظام", en: "Installed programs and system resources" },
              { ar: "bin/، lib/، share/doc", en: "bin/, lib/, share/doc" },
            ],
            [
              { ar: "/tmp", en: "/tmp" },
              { ar: "ملفات مؤقتة قد تُمسح عند إعادة التشغيل", en: "Temporary files, may be wiped on reboot" },
              { ar: "ملفات جلسات العمل", en: "Work-session scratch files" },
            ],
            [
              { ar: "/dev", en: "/dev" },
              { ar: "ملفات الأجهزة: هنا يتحقق مبدأ «كل شيء ملف»", en: "Device files: where 'everything is a file' comes true" },
              { ar: "sda، null، tty0", en: "sda, null, tty0" },
            ],
          ],
        },
        body: {
          ar: "بينما يعطيك ويندوز «أقراصاً» منفصلة (C: و D: و E:)، يعطيك لينكس شجرة واحدة تبدأ من جذر واحد: / — هذا هو جوهر معيار FHS (Filesystem Hierarchy Standard) الذي يوحد مواقع المجلدات في كل التوزيعات، فيعرف المسؤول والمبرمج مسبقاً أين يجدان أي شيء.\n\nالمعيار يجيب عن أسئلة يومية: أين أعدّل إعدادات الخادم؟ /etc. أين أقرأ سجل خطأٍ ما؟ /var/log. أين ملفات زميلي؟ /home. أين «الأجهزة»؟ /dev.\n\n- ملاحظة معيارية حديثة: في التوزيعات الحديثة صار /bin و /lib وصلاً (symlink) إلى مجلداتها تحت /usr — دمج اسمه usrmerge\n- الدرس العملي نفسه يبقى: الشجرة موحدة ومعيارية أياً كانت توزيعتك",
          en: "While Windows hands you separate 'drives' (C:, D:, E:), Linux hands you one tree beginning at a single root: / — the essence of the FHS (Filesystem Hierarchy Standard) that unifies directory locations across all distributions, so admins and programs know in advance where to find anything.\n\nThe standard answers daily questions: where do I edit server configs? /etc. Where do I read an error log? /var/log. Where are my colleague's files? /home. Where are the 'devices'? /dev.\n\n- A modern standard note: on recent distros /bin and /lib became symlinks into their /usr counterparts — a merge called usrmerge\n- The practical lesson stands: one unified, standard tree whatever your distribution",
        },
        diagram: {
          kind: "topology",
          title: { ar: "شجرة FHS مصغّرة من الجذر", en: "A mini FHS tree from the root" },
          nodes: ["/", "etc", "home", "var", "usr", "tmp", "dev", "bin"],
          edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
        },
      },
      {
        heading: { ar: "المسارات ونقاط التركيب مقابل أحرف الأقراص", en: "Paths & Mount Points vs Drive Letters" },
        body: {
          ar: "كيف يتصل قرص إضافي أو قسم USB في لينكس إن لم توجد أحرف أقراص؟ عبر «نقطة التركيب» (Mount Point): تختار مجلداً فارغاً في الشجرة — مثلاً /mnt/backup — وتقول للنظام: علّق هذا القرص هنا (mount). فيصبح محتوى القرص يظهر داخل ذلك المجلد وكأنه جزء طبيعي من الشجرة.\n\n- المسار المطلق في لينكس يبدأ دائماً بـ / مثل /etc/ssh/sshd_config\n- لا يوجد «C:\» ولا انتقال بين «أقراص» — الشجرة واحدة متصلة\n- قرص ثانٍ أو USB أو حتى مجلد شبكة: كلها مجلدات في الشجرة نفسها بعد التركيب\n\nهذا التصميم «متعدد الأشجار في شجرة» هو أحد أسباب مرونة لينكس الشهيرة في التخزين — وتقنيات متقدمة اليوم (مثل التخزين المؤقت الشبكي) تبني عليه مباشرة.",
          en: "How does an extra disk or USB partition attach in Linux without drive letters? Through a mount point: you pick an empty folder in the tree — say /mnt/backup — and tell the system: hang this disk here (mount). The disk's content then appears inside that folder as a natural part of the tree.\n\n- An absolute path in Linux always starts with / such as /etc/ssh/sshd_config\n- There is no 'C:\\' and no jumping between 'drives' — one connected tree\n- A second disk, a USB stick, even a network folder: all just folders in the same tree once mounted\n\nThis 'many trees inside one tree' design is one of Linux's celebrated storage flexibilities — modern techniques (like network storage caching) build on it directly.",
        },
      },
      {
        heading: { ar: "ext4 مقابل NTFS: مواجهة نظامي الملفات", en: "ext4 vs NTFS: The File-System Face-off" },
        table: {
          caption: { ar: "مقارنة نظام الملفات الافتراضي في لينكس وويندوز", en: "Comparing the default file systems of Linux and Windows" },
          headers: [
            { ar: "الخاصية", en: "Feature" },
            { ar: "ext4", en: "ext4" },
            { ar: "NTFS", en: "NTFS" },
          ],
          rows: [
            [
              { ar: "التدوين (Journaling)", en: "Journaling" },
              { ar: "نعم — يسجل التغييرات قبل تنفيذها ليسهل الإصلاح بعد الانهيار", en: "Yes — records changes before applying them, easing crash recovery" },
              { ar: "نعم — بأسلوب مختلف لكن الفكرة ذاتها", en: "Yes — a different style, same idea" },
            ],
            [
              { ar: "حساسية حالة الأحرف", en: "Case sensitivity" },
              { ar: "حساس: Report.txt و report.txt ملفان مختلفان", en: "Sensitive: Report.txt and report.txt are two files" },
              { ar: "غير حساس افتراضياً: الملفان اسمان لنفس الملف", en: "Insensitive by default: both names point to one file" },
            ],
            [
              { ar: "نموذج الصلاحيات", en: "Permissions model" },
              { ar: "POSIX بسيط وقوي: مالك/مجموعة/آخرون × قراءة/كتابة/تنفيذ", en: "Simple strong POSIX: owner/group/others × read/write/execute" },
              { ar: "قوائم ACL تفصيلية عبر أدوات ويندوز", en: "Detailed ACL lists via Windows tools" },
            ],
            [
              { ar: "الجزء الميت والتجزئة", en: "Fragments & defragmentation" },
              { ar: "خوارزميات توزيع تقلل التجزءة — نادراً ما تحتاج إلغاءها", en: "Allocation algorithms minimize fragmentation — defrag rarely needed" },
              { ar: "تتجزأ مع الزمن ويأتي أداة Defrag لتصلح", en: "Fragmenting over time; Defrag tool fixes it" },
            ],
            [
              { ar: "حدود الحجم", en: "Size limits" },
              { ar: "ملك واحد حتى 1 إكسابايت تقريباً — يفوق أي استخدام واقعي", en: "Up to ~1 EiB per file — beyond any real use" },
              { ar: "ضخمة عملياً كذلك — كلاهما يكفي", en: "Practically huge too — both suffice" },
            ],
          ],
        },
        body: {
          ar: "نظام الملفات هو «قواعد التنظيم» التي تدير كيف تُخزّن الملفات على القرص وتُسترجع — وهو مستقل عن المجلدات التي تراها فوقه.\n\nأهم فرق عملي ستلمسه بنفسك في المختبر: حساسية حالة الأحرف. أنشئ في لينكس ملفَي Report.txt و report.txt فستجد ملفين مستقلين تماماً؛ وفي ويندوز اسمان لملف واحد — يفاجئ هذا من اعتاد ويندوز! ارتِب أسماءك دائماً وكأن النظام حساس، فتنجو في العالمين.\n\nالنقطة الثانية الجميلة: صلاحيات POSIX الثلاثية (مالك/مجموعة/آخرون) تُخزّن مع الملف نفسه في ext4 — وهذا الجذر المباشر لقصة «عزل المستخدمين» التي تصنع أمان يونكس، كما سترى في الدرس التالي.",
          en: "A file system is the 'organization rules' governing how files are stored on disk and retrieved — independent of the folders you see above it.\n\nThe most practical difference you will touch yourself in the lab: case sensitivity. Create Report.txt and report.txt on Linux and you own two fully separate files; on Windows both names mean one file — a real surprise for Windows veterans! Always name your files as if the system is case-sensitive and you are safe in both worlds.\n\nThe second elegant point: the POSIX triple permission (owner/group/others) is stored with the file itself in ext4 — the direct root of the user-isolation story behind Unix security, as you will see in the next lesson.",
        },
        tip: {
          ar: "على خادم المختبر جرّب: touch Test.txt ثم touch test.txt ثم ls — سترى ملفين! ثم انقل التجربة ذهنياً إلى ويندوز حيث يريان واحداً.",
          en: "On your lab server try: touch Test.txt then touch test.txt then ls — two files! Then mentally replay it on Windows where they merge into one.",
        },
      },
      {
        heading: { ar: "أين التبديل (Swap) من كل هذا؟", en: "Where Does Swap Fit In?" },
        body: {
          ar: "يبقى عنصر أخير في مهمة مقارنة إدارة الملفات: التبديل (Swap). عندما تمتلئ ذاكرة RAM، يأخذ النظام الصفحات الأقل استخداماً ويحفظها في مساحة معدة على القرص تسمى swap — فتتنفس الذاكرة ويتابع النظام العمل بدل أن يتوقف أو يطرد البرامج.\n\n- في لينكس: قد يكون partition مخصصاً أو ملف swap — وتراه في إخراج free -h\n- في ويندوز: المفهوم نفسه اسمه ملف ترقيم الصفحات (pagefile.sys)\n- الثمن: القرص أبطأ من الذاكرة آلاف المرات — فكثرة التبديل إنذار بنقص RAM لا بحسن أداء\n\nاكتملت الآن خريطتك لملفات لينكس: شجرة واحدة من /، كل شيء ملف، أقراص تُركّب في الشجرة، وext4 ينظمها بصلاحياته الثلاثية — والدرس التالي يشرح من يملك هذه الملفات أصلاً: المستخدمون.",
          en: "One last element remains in the file-management comparison task: swap. When RAM fills up, the system takes the least-used pages and stores them in prepared disk space called swap — memory breathes again and the system continues instead of halting or killing programs.\n\n- On Linux: either a dedicated partition or a swap file — visible in free -h output\n- On Windows: the same concept is the paging file (pagefile.sys)\n- The price: disk is thousands of times slower than memory — heavy swapping warns of a RAM shortage, not good performance\n\nYour Linux file map is now complete: one tree from /, everything a file, disks mounted into the tree, ext4 organizing it with its triple permissions — and the next lesson explains who owns these files in the first place: the users.",
        },
      },
    ],
    keyPoints: [
      { ar: "في يونكس كل شيء ملف — حتى الأجهزة تحت /dev والعمليات تحت /proc", en: "In Unix everything is a file — even devices under /dev and processes under /proc" },
      { ar: "FHS يوحّد الشجرة: الإعدادات /etc والسجلات /var وملفاتك /home والأجهزة /dev", en: "FHS unifies the tree: configs in /etc, logs in /var, your files in /home, devices in /dev" },
      { ar: "شجرة واحدة من / بدل أحرف الأقراص — والأقراص تُركّب في مجلدات (Mount Points)", en: "One tree from / instead of drive letters — disks mount into folders (mount points)" },
      { ar: "ext4 حساس لحالة الأحرف بصلاحيات POSIX ثلاثية؛ NTFS غير حساس افتراضياً بـ ACL", en: "ext4 is case-sensitive with triple POSIX permissions; NTFS is case-insensitive by default with ACLs" },
      { ar: "التبديل Swap (و pagefile.sys في ويندوز) ينقذ الذاكرة الممتلئة بثمن البطء", en: "Swap (pagefile.sys on Windows) rescues full memory at the price of slowness" },
    ],
    commands: [
      { cmd: "ls -l /", desc: { ar: "شاهد شجرة FHS من قمة الجذر بنفسك", en: "See the FHS tree from the root yourself" } },
      { cmd: "man hier", desc: { ar: "دليل يونكس التقليدي لمعنى كل مجلد في الشجرة", en: "The traditional Unix guide to every directory's meaning" } },
      { cmd: "df -h", desc: { ar: "الأقراص المركّبة في الشجرة وسعتها — لاحظ غياب أحرف الأقراص", en: "Mounted disks in the tree and their sizes — note the absent drive letters" } },
      { cmd: "ls -l /dev", desc: { ar: "ملفات الأجهزة: هنا «كل شيء ملف» ملموس", en: "Device files: 'everything is a file' made tangible" } },
    ],
    quiz: [
      {
        q: { ar: "أين تعدّل إعدادات خدمة SSH على خادم لينكس وفق معيار FHS؟", en: "Where do you edit the SSH service config on a Linux server per FHS?" },
        options: [
          { ar: "C:\\Program Files", en: "C:\\Program Files" },
          { ar: "/etc/ssh/", en: "/etc/ssh/" },
          { ar: "/tmp", en: "/tmp" },
          { ar: "/dev", en: "/dev" },
        ],
        correct: 1,
        explain: { ar: "/etc هو بيت إعدادات النظام والخدمات — وستعدّل sshd_config فيه فعلياً في مختبرات لاحقة.", en: "/etc is the home of system and service configs — you will actually edit sshd_config there in later labs." },
      },
      {
        q: { ar: "أنشأت Report.txt و report.txt على لينكس؛ النتيجة:", en: "You created Report.txt and report.txt on Linux; the result:" },
        options: [
          { ar: "ملف واحد فقط — الاسمان مترادفان", en: "One file only — the names are synonyms" },
          { ar: "ملفان مستقلان تماماً بسبب حساسية حالة الأحرف", en: "Two fully separate files due to case sensitivity" },
          { ar: "خطأ في النظام يمنع الإنشاء", en: "A system error preventing creation" },
          { ar: "ينشأ مجلد تلقائياً", en: "A folder is created automatically" },
        ],
        correct: 1,
        explain: { ar: "ext4 حساس لحالة الأحرف — انتبه: في NTFS الاسمان يعنيان ملفاً واحداً. قاعدة الأمان: تعامل مع كل نظام وكأنه حساس.", en: "ext4 is case-sensitive — whereas on NTFS both names point to one file. The safe rule: treat every system as if it were sensitive." },
      },
      {
        q: { ar: "كيف يظهر قرص ثانٍ في لينكس بدل منحه حرف D: مثل ويندوز؟", en: "How does a second disk appear in Linux instead of getting a D: letter like Windows?" },
        options: [
          { ar: "لا يمكن توصيل أقراص إضافية في لينكس", en: "Extra disks cannot be attached on Linux" },
          { ar: "يُركّب داخل مجلد في الشجرة الواحدة (Mount Point)", en: "It is mounted inside a folder in the single tree (mount point)" },
          { ar: "يظهر كتطبيق منفصل", en: "It appears as a separate application" },
          { ar: "يُعطى حرف Q: بدلاً منه", en: "It is given a Q: letter instead" },
        ],
        correct: 1,
        explain: { ar: "الفلسفة: شجرة واحدة متصلة — القرص الجديد مجلد جديد فيها بعد أمر mount أو إعداد تلقائي.", en: "The philosophy: one connected tree — a new disk is just a new folder in it after mount or automatic configuration." },
      },
      {
        q: { ar: "وظيفة التدوين (Journaling) في نظام ملفات مثل ext4 هي:", en: "The role of journaling in a file system like ext4 is:" },
        options: [
          { ar: "تسجيل التغييرات قبل تنفيذها ليسهل الإصلاح بعد الانهيار", en: "Recording changes before applying them to ease crash recovery" },
          { ar: "طباعة اليوميات على الورق", en: "Printing diaries onto paper" },
          { ar: "ضغط الملفات الكبيرة", en: "Compressing large files" },
          { ar: "منع حذف أي ملف نهائياً", en: "Preventing any file deletion forever" },
        ],
        correct: 0,
        explain: { ar: "التدوين دفتر نوايا: إن انقطعت الكهرباء قبل إتمام العملية، يقرأ النظام الدفتر ويلم الحالة — كلاً من ext4 و NTFS يدوّن بأسلوبه.", en: "The journal is an intents notebook: if power fails mid-operation the system reads it and repairs state — both ext4 and NTFS journal, each in its style." },
      },
    ],
  },

  // ── l118 · Multi-User Unix & Security ─────────────────────────────────
  {
    id: "l118",
    moduleId: "m12",
    order: 8,
    level: "intermediate",
    title: {
      ar: "تعدد المستخدمين وأمان يونكس",
      en: "Multi-User Unix & Security",
    },
    summary: {
      ar: "يونكس متعدد المستخدمين منذ أواخر الستينيات: هويات UID و GID وحساب الجذر المطلق، وملكية الملفات والعزل الذي يجعل فيروساته نادرة، وإدارته عن بعد عبر SSH مع السجلات ومبدأ الامتياز الأدنى.",
      en: "Unix has been multi-user since the late 1960s: UID and GID identities, the almighty root account, file ownership and the isolation that makes its viruses rare, plus remote administration over SSH with logs and least privilege.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "متعدد المستخدمين منذ اليوم الأول", en: "Multi-User From Day One" },
        body: {
          ar: "تقول محاضرتك حقيقة تاريخية حاسمة: يونكس وُلد متعدد المستخدمين (Multi-User) منذ أواخر الستينيات — صُمم لخادم واحد يخدم عدة باحثين في آن واحد عبر أطرافهم المتصلة.\n\nقارن ذلك بويندوز الذي وُلد في الثمانينيات نظامَ جهازٍ شخصي لمستخدم واحد يجلس أمامه — ثم حاول لاحقاً إضافة مفاهيم المستخدمين فوق أساس لم يبنَ عليها. الفرق في الجذور، لا في الميزات.\n\n- النتيجة: كل شيء في يونكس (كل ملف، كل عملية، كل اتصال شبكة) له مالك من البداية\n- العمليات تعمل «بصفة» مستخدمها — لا صفة عامة مجهولة\n- كلمة مرورك ليست بوابة شاشة قفل، بل هوية نظام كاملة تحكم كل حركة لك",
          en: "Your lecture states a decisive historical fact: Unix was born multi-user in the late 1960s — designed for one server serving several researchers simultaneously through their connected terminals.\n\nContrast that with Windows, born in the 1980s as a single personal machine's OS for one user sitting in front of it — later trying to add multi-user concepts atop a foundation not built for them. The difference lies in the roots, not the features.\n\n- The outcome: everything in Unix (every file, every process, every network connection) has an owner from birth\n- Processes run under their user's identity — not a vague generic identity\n- Your password is not a lock-screen gate but a complete system identity governing every action of yours",
        },
      },
      {
        heading: { ar: "UID و GID: بطاقة هوية كل شيء", en: "UID & GID: The Identity Card of Everything" },
        table: {
          caption: { ar: "أنواع المستخدمين في نظام لينكس", en: "Types of users on a Linux system" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "نطاق UID", en: "UID range" },
            { ar: "دوره وصلاحياته", en: "Role & privileges" },
          ],
          rows: [
            [
              { ar: "الجذر root", en: "root" },
              { ar: "UID = 0 دائماً", en: "UID = 0 always" },
              { ar: "المالك المطلق لكل شيء: يقرأ ويكتب ويمسح أي ملف، ويوقف أي عملية — بلا سؤال", en: "Absolute owner of everything: reads, writes, deletes any file, kills any process — no questions asked" },
            ],
            [
              { ar: "مستخدم عادي", en: "Regular user" },
              { ar: "غالباً 1000 وما فوق", en: "Usually 1000 and up" },
              { ar: "يملك ملفاته فقط؛ يطلب ترقية صلاحيات عبر sudo عند الحاجة", en: "Owns only their files; requests privilege escalation via sudo when needed" },
            ],
            [
              { ar: "حسابات النظام والخدمات", en: "System & service accounts" },
              { ar: "1 حتى 999 تقريباً", en: "Roughly 1 to 999" },
              { ar: "هويات تشغّل الخدمات (sshd، apache) بأقل صلاحيات ممكنة عمداً", en: "Identities running services (sshd, apache) with deliberately minimal privileges" },
            ],
          ],
        },
        body: {
          ar: "كل مستخدم في لينكس له رقم تعريف UID (User ID) — النظام لا يعرفك باسمك بل برقمك! والاسم مجرد ملصق مريح للبشر في ملف /etc/passwd. كذلك كل مستخدم ينتمي لمجموعة أساسية برقم GID (Group ID)، وقد ينتمي لمجموعات إضافية لغرض مشاركة الصلاحيات.\n\n- حساب الجذر root: UID صفر — الصلاحية المطلقة؛ خطأ واحد فيه قد يمحو النظام كله\n- حسابات الخدمات بلا كلمة مرور دخول أصلاً — هي للبرامج لا للبشر\n- أعمدة /etc/passwd: الاسم، UID، GID، الاسم الكامل، مجلد البيت، الصَدَفة",
          en: "Every Linux user has a UID (User ID) number — the system knows you by your number, not your name! The name is just a human-friendly label in /etc/passwd. Each user also belongs to a primary group with a GID (Group ID), and possibly extra groups for sharing permissions.\n\n- The root account: UID zero — absolute privilege; one mistake there can erase the entire system\n- Service accounts have no login password at all — they exist for programs, not people\n- The /etc/passwd columns: name, UID, GID, full name, home directory, shell",
        },
      },
      {
        heading: { ar: "ملكية الملفات: أساس العزل", en: "File Ownership: The Foundation of Isolation" },
        body: {
          ar: "نفّذ ls -l في أي مجلد وستعمَل أول شيء تراه: سلسلة مثل -rw-r--r-- وحرفا الملكية. هذا هو نظام الصلاحيات الثلاثي في عمله:\n\n- كل ملف له مالك (user) ومجموعة (group) و«آخرون» (others)\n- لكل فئة ثلاث حقوق: قراءة r، كتابة w، تنفيذ x\n- الملف الذي يملكه student1 لا يستطيع student2 حتى قراءته ما لم تُمنح الصلاحية صراحة\n\nهذا هو العزل (Isolation) بعينه — الفيروس الذي يركض تحت حسابك محبوس في أرضك، لا يستطيع لمس ملفات النظام في /etc ولا ملفات زملائك في بيوتهم. وكل تجاوز يتطلب صلاحية الجذر التي يسأل عنها النظام بصوت عالٍ عبر sudo.\n\nسنفصّل هذه الصلاحيات عملياً أمراً بأمر في وحدة سطر الأوامر — هنا يكفيك الإدراك المعماري: الملكية سمة مخزّنة مع الملف نفسه، وليست قراراً مؤقتاً من برنامج.",
          en: "Run ls -l in any directory and the first thing you see is at work: a string like -rw-r--r-- plus the two ownership names. That is the triple permission system in action:\n\n- Every file has an owner (user), a group, and 'others'\n- Each category carries three rights: read r, write w, execute x\n- A file owned by student1 cannot even be read by student2 unless permission is explicitly granted\n\nThis is isolation itself — a virus running under your account is fenced inside your land: it cannot touch system files in /etc or colleagues' files in their homes. And any breach requires root privilege, which the system demands loudly through sudo.\n\nWe will unpack these permissions command-by-command in the command-line module — here the architectural insight suffices: ownership is an attribute stored with the file itself, not a program's temporary decision.",
        },
      },
      {
        heading: { ar: "تعدد المستخدمين عن بعد: SSH والسجلات", en: "Remote Multi-User: SSH & Audit Logs" },
        body: {
          ar: "في مختبرات هذه المادة تعيش الفكرة كاملة: خادم Amazon Linux 2 واحد يخدم عشرات الطلاب في آن واحد — كل واحد جلسة SSH مستقلة، وهوية مستقلة، ومجلد بيت مستقل. هذا هو الاقتسام الزمني الأصلي وقد أعيد اختراعه للإنترنت!\n\n- SSH (Secure Shell): بروتوكول اتصال مشفّر يعطيك طرفية على خادم بعيد — أنت «مستخدم متصل» بالمعنى الحرفي\n- سجل الوصول: كل دخول وخروج يوثّق — أمر last يريك التاريخ كاملاً\n- سجل النواة والخدمات في /var/log: من فعل ماذا ومتى — كاملاً لتدقيق الأمن\n\nالسجلات ممكنة أصلاً لأن كل فعل في النظام مرتبط بهوية UID — في نظام غامض الهويات لا معنى لسجل تدقيق!",
          en: "In this course's labs the idea comes fully alive: one Amazon Linux 2 server serving dozens of students simultaneously — each with an independent SSH session, an independent identity, an independent home folder. This is original time-sharing reinvented for the Internet!\n\n- SSH (Secure Shell): an encrypted protocol giving you a terminal on a remote server — you are a 'connected user' in the literal sense\n- Login auditing: every entry and exit is recorded — the last command shows you the whole history\n- Kernel and service logs under /var/log: who did what and when — complete for security audit\n\nLogs are possible at all because every action in the system ties to a UID identity — in an anonymous system an audit log is meaningless!",
        },
      },
      {
        heading: { ar: "مبدأ الامتياز الأدنى: لا تعش كجذر", en: "The Least-Privilege Principle: Never Live as Root" },
        body: {
          ar: "أقوى درس أمني في هذه الوحدة كلها: امتياز أقل يساوي ضرر أقل (Least Privilege). لذلك:\n\n- اعمل بحسابك العادي، وارقَّ مؤقتاً إلى صلاحيات الجذر عبر sudo للأمر الواحد الذي يحتاجها فقط\n- حسابات الخدمات في النظام تعمل عمداً بأقل هوية ممكنة — خادم ويب مخترق لا يستطيع حتى قراءة /etc/shadow\n- كلمة مرور قوية للمستخدم الجذر تُغيّر عبر أمر passwd الذي ستستخدمه في المختبر\n\nالقاعدة الذهبية التي ستسمعها من كل مسؤول أنظمة خبير: «لا تعمل يومياً بصلاحيات الجذر». كل أمر خاطئ تحت root يقع فوراً بلا سؤال: rm في المجلد الخطأ يمحو النظام في ثانية. الالتزام بالامتياز الأدنى ليس خوفاً — بل هندسة انضباطية صافية.",
          en: "The strongest security lesson of this whole module: less privilege equals less damage (Least Privilege). Therefore:\n\n- Work under your regular account and escalate briefly to root via sudo for exactly the one command that needs it\n- Service accounts deliberately run with the minimal identity possible — a breached web server cannot even read /etc/shadow\n- A strong root password changes via the passwd command you will use in the lab\n\nThe golden rule every expert sysadmin repeats: 'never work daily as root'. Every mistaken command under root lands instantly unchallenged: one rm in the wrong directory erases the system in a second. Committing to least privilege is not fear — it is pure disciplined engineering.",
        },
        tip: {
          ar: "أمسك قاعدة إبهامك: قبل كتابة أي أمر بصلاحيات sudo، اسأل نفسك — هل يحتاج هذا الأمر حقاً امتياز الجذر؟ إن شككت فالجواب غالباً: لا.",
          en: "Hold a rule of thumb: before typing any sudo command ask yourself — does this truly need root privilege? If you hesitate, the answer is usually: no.",
        },
      },
    ],
    keyPoints: [
      { ar: "يونكس متعدد المستخدمين منذ أواخر الستينيات — والملكية سمة مبنية في كل شيء", en: "Unix is multi-user since the late 1960s — ownership built into everything" },
      { ar: "النظام يعرفك برقمك UID لا باسمك؛ والجذر هو UID صفر بصلاحية مطلقة", en: "The system knows your UID, not your name; root is UID zero with absolute privilege" },
      { ar: "صلاحيات ثلاثية: مالك/مجموعة/آخرون × قراءة/كتابة/تنفيذ — مخزنة مع الملف نفسه", en: "Triple permissions: owner/group/others × read/write/execute — stored with the file itself" },
      { ar: "العزل يفسّر ندرة فيروسات لينكس، وSSH يجعل الخادم الواحد خادماً للجميع بأمان", en: "Isolation explains rare Linux viruses; SSH makes one server safely serve everyone" },
      { ar: "مبدأ الامتياز الأدنى: اعمل عادياً وارقَّ عبر sudo للأمر الواحد — لا تعش كجذر", en: "Least privilege: work normally, escalate via sudo per command — never live as root" },
    ],
    commands: [
      { cmd: "whoami", desc: { ar: "من أنت في هذه الجلسة؟ الاسم الذي تعمل تحته", en: "Who are you in this session? The name you work under" } },
      { cmd: "id", desc: { ar: "هويتك الرقمية الكاملة: UID و GID وكل مجموعاتك", en: "Your full numeric identity: UID, GID and all your groups" } },
      { cmd: "cat /etc/passwd", desc: { ar: "سجل هويات كل المستخدمين على النظام", en: "The registry of every user identity on the system" } },
      { cmd: "last", desc: { ar: "تاريخ الدخول والخروج — سجل تدقيق حي أمامك", en: "Login and logout history — a live audit trail before you" } },
    ],
    quiz: [
      {
        q: { ar: "ما UID حساب الجذر root في كل أنظمة يونكس ولينكس؟", en: "What is the UID of the root account on all Unix and Linux systems?" },
        options: [
          { ar: "1000", en: "1000" },
          { ar: "1", en: "1" },
          { ar: "0", en: "0" },
          { ar: "لا يملك UID أصلاً", en: "It has no UID at all" },
        ],
        correct: 2,
        explain: { ar: "الجذر هو UID صفر دائماً — النظام يتحقق من الرقم لا من الاسم، ولهذا يملك الصلاحية المطلقة.", en: "Root is always UID zero — the system checks the number, not the name, which is why it holds absolute privilege." },
      },
      {
        q: { ar: "في الصلاحيات rw-r--r-- ماذا يستطيع «الآخرون» فعله؟", en: "In rw-r--r-- permissions, what can 'others' do?" },
        options: [
          { ar: "قراءة الملف فقط", en: "Read the file only" },
          { ar: "الكتابة فيه", en: "Write to it" },
          { ar: "تنفيذه كبرنامج", en: "Execute it as a program" },
          { ar: "لا شيء إطلاقاً", en: "Nothing at all" },
        ],
        correct: 0,
        explain: { ar: "المجموعة الثالثة r-- تمنح الآخرين القراءة فقط — الكتابة للمالك rw- والقراءة للمجموعة r--.", en: "The third triplet r-- grants others read-only — the owner has rw- and the group r--." },
      },
      {
        q: { ar: "لماذا صُممت حسابات الخدمات (مثل sshd) بأقل صلاحيات ممكنة؟", en: "Why are service accounts (like sshd's) designed with minimal privileges?" },
        options: [
          { ar: "لإبطاء الخدمة عمداً", en: "To deliberately slow the service" },
          { ar: "حتى إذا اختُرقت الخدمة يبقى الضرر محصوراً في أضيق نطاق", en: "So if the service is breached, damage stays confined to the narrowest scope" },
          { ar: "لأن الحسابات القوية أغلى", en: "Because strong accounts cost more" },
          { ar: "لأمنع الخدمة من العمل أصلاً", en: "To stop the service from running at all" },
        ],
        correct: 1,
        explain: { ar: "هذا تطبيق مباشر لمبدأ الامتياز الأدنى: خادم ويب مخترق لا يستطيع حتى قراءة ملف كلمات المرور.", en: "This is least privilege applied directly: a breached web server cannot even read the password file." },
      },
      {
        q: { ar: "المسؤول الصحيح للعمل اليومي على خادم لينكس هو:", en: "The correct daily working style on a Linux server is:" },
        options: [
          { ar: "الدخول كجذر دائماً للسرعة", en: "Always log in as root for speed" },
          { ar: "العمل بحساب عادي وترقية الصلاحية عبر sudo للأمر الواحد", en: "Work under a regular account and escalate via sudo for the single command" },
          { ar: "بلا حساب أصلاً — استخدام النظام علناً", en: "With no account at all — use the system publicly" },
          { ar: "تشارك حساب الجذر مع الفريق كله", en: "Share the root account with the whole team" },
        ],
        correct: 1,
        explain: { ar: "الامتياز الأدنى هندسة انضباطية: عادي للأعمال اليومية، وsudo للنذر اليسير الذي يحتاج الجذر — مع توثيق كل رفع في السجل.", en: "Least privilege is disciplined engineering: normal for daily work, sudo for the rare root need — with every escalation logged." },
      },
    ],
  },

  // ── l119 · Linux Servers & the Job Market in Bahrain & the Gulf ────────
  {
    id: "l119",
    moduleId: "m12",
    order: 9,
    level: "beginner",
    title: {
      ar: "خوادم لينكس وسوق العمل في البحرين والخليج",
      en: "Linux Servers & the Job Market in Bahrain & the Gulf",
    },
    summary: {
      ar: "مهمة البحث في مختبرك الأول: ماذا يشغّل لينكس من خوادم — ويب وقواعد بيانات و DNS وبريد؟ وأين يعمل مسؤولو لينكس في البحرين والخليج؟ وما المهارات التي تطلبها الإعلانات الحقيقية؟",
      en: "Your first lab's research task: which servers run Linux — web, databases, DNS, email? Where do Linux admins work in Bahrain and the Gulf? And which skills do real job listings demand?",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ماذا يشغّل لينكس؟ أدوار الخوادم الكبرى", en: "What Runs on Linux? The Great Server Roles" },
        table: {
          caption: { ar: "أدوار الخوادم التي تذكرها محاضرتك وبرمجياتها الشهيرة", en: "The server roles your lecture lists and their famous software" },
        headers: [
            { ar: "الدور", en: "Role" },
            { ar: "البرمجية الشهيرة عليه", en: "Famous software on it" },
            { ar: "ماذا يقدم", en: "What it delivers" },
          ],
          rows: [
            [
              { ar: "خادم ويب", en: "Web server" },
              { ar: "Apache، Nginx", en: "Apache, Nginx" },
              { ar: "يقدم صفحات وتطبيقات الإنترنت للعالم", en: "Serves the Internet's pages and apps" },
            ],
            [
              { ar: "خادم قواعد بيانات", en: "Database server" },
              { ar: "PostgreSQL، Oracle", en: "PostgreSQL, Oracle" },
              { ar: "يخزن بيانات المؤسسات ويستعلم عنها", en: "Stores and queries organizations' data" },
            ],
            [
              { ar: "خادم أسماء النطاقات DNS", en: "DNS server" },
              { ar: "BIND", en: "BIND" },
              { ar: "يترجم الأسماء إلى عناوين IP — دليل هاتف الإنترنت", en: "Translates names into IP addresses — the Internet's phone book" },
            ],
            [
              { ar: "خادم بريد", en: "Mail server" },
              { ar: "Postfix، Dovecot", en: "Postfix, Dovecot" },
              { ar: "يستقبل ويرسل بريد المؤسسة", en: "Receives and sends organizational email" },
            ],
            [
              { ar: "منصة سحابية", en: "Cloud platform" },
              { ar: "بنية AWS — وضمنها توزيعة Amazon Linux", en: "AWS infrastructure — including Amazon Linux" },
              { ar: "يؤجر حوسبة كاملة بالساعة لآلاف الشركات", en: "Rents whole computing by the hour to thousands of companies" },
            ],
          ],
        },
        body: {
          ar: "هذه هي التطبيقات التي تسردُها محاضرتك بالاسم (مع LibreOffice و GIMP و PHP و Emacs على سطح المكتب): الخوادم التي تدير الإنترنت اليوم تعمل بلينكس في أغلبيتها الساحقة، وتقدم فوقه هذه الأدوار.\n\nفي مختبرات المادة أنت تلمس نموذجاً حياً: خادم Amazon Linux 2 حقيقي على AWS، تدخل إليه عبر SSH من بيتك — أي أنك «مسؤول خادم لينكس مبتدئ» من الأسبوع الأول. البرمجية التي ستشغّلها فوقه مستقبلاً هي نفسها في الجدول: Apache في مختبرات ويب، و PostgreSQL في مختبرات قواعد البيانات.",
          en: "These are the applications your lecture lists by name (alongside LibreOffice, GIMP, PHP and Emacs on the desktop): the servers running today's Internet overwhelmingly run Linux, delivering these roles on top.\n\nIn the course labs you touch a live model: a real Amazon Linux 2 server on AWS, entered over SSH from your home — meaning you are a 'beginner Linux server administrator' from week one. The software you will run on it later is exactly the table's: Apache in web labs, PostgreSQL in database labs.",
        },
      },
      {
        heading: { ar: "لينكس في كل مكان: أندرويد والأقمار والمدمجة", en: "Linux Everywhere: Android, Satellites & Embedded" },
        body: {
          ar: "تذكر محاضرتك أن انتشار لينكس أبعد بكثير من الخوادم:\n\n- أندرويد: أكبر منصة حوسبة في تاريخ البشرية — نواة لينكس في كل هاتف\n- الأقمار الصناعية والمركبات الفضائية: أنظمة تشغيل لينكس مدمجة تدور فوق رؤوسنا الآن\n- الأجهزة المدمجة (Embedded): الراوترات والكاميرات وأجهزة «الإنترنت الأشياء» والتلفاز الذكي\n- السيارات الحديثة وأنظمة الطيران ولوحات الإعلانات الرقمية\n- كل الحواسيب العملاقة في قائمة TOP500 تقريباً\n\nالدرس المهني من هذا الانتشار: مهاراتك في لينكس ليست مهارات «سوق ضيق» بل مهارات البنية التحتية الرقمية نفسها — من هاتف في جيبك إلى قمر صناعي في المدار.",
          en: "Your lecture reminds you Linux's reach is far beyond servers:\n\n- Android: the largest computing platform in human history — a Linux kernel in every phone\n- Satellites and spacecraft: embedded Linux systems orbiting above us right now\n- Embedded devices: routers, cameras, IoT gadgets, smart TVs\n- Modern cars, avionics, digital billboards\n- Virtually every machine on the TOP500 supercomputer list\n\nThe career lesson of this reach: your Linux skills are not a 'niche market' skill — they are the skill of digital infrastructure itself, from a phone in your pocket to a satellite in orbit.",
        },
      },
      {
        heading: { ar: "أين يعمل مسؤولو لينكس في البحرين والخليج؟", en: "Where Do Linux Admins Work in Bahrain & the Gulf?" },
        body: {
          ar: "مهمة البحث في مختبرك الأول تطلب منك استكشاف سوق العمل المحلي. الخريطة الحقيقية في البحرين والخليج أوسع مما يظن معظم الطلبة:\n\n- شركات الاتصالات: Batelco (بيون اليوم) و stc البحرين وزين و Ooredoo — شبكاتها وخدماتها تمتد على بنى لينكس ويونكس\n- البنوك والمؤسسات المالية: بيئات الخوادم والقواعد البيانات والتحليلات المالية\n- القطاع الحكومي وهيئات الأمن السيبراني الوطنية (مثل NESA في المنطقة) — التوجه الخليجي نحو البنى المفتوحة زخم حقيقي للوظائف\n- النفط والصناعة: Bapco و Alba وشركات الطاقة — أنظمة تشغيل صناعية وخوادم مراقبة\n- السحابة الإقليمية: مكاتب AWS الإقليمية ومنطقتها (البحرين من أولى بوابات المنطقة) ومراكز البيانات الخليجية\n- شركات البرمجيات والأمن السيبراني المحلية المتنامية\n\nافتح اليوم أي موقع وظائف خليجياً وابحث بـ «Linux Administrator» أو «DevOps» — ستقابل عشرات الإعلانات الحية. هذه المهمة البحثية ليست واجباً نظرياً: هي أول خريطة طريق مهنية فعلية بين يديك.",
          en: "Your first lab's research task asks you to explore the local market. The real map in Bahrain and the Gulf is wider than most students assume:\n\n- Telecom operators: Batelco (today Beyon), stc Bahrain, Zain and Ooredoo — networks and services on Linux and Unix foundations\n- Banks and financial institutions: server environments, databases and financial analytics\n- Government and national cybersecurity authorities (such as NESA in the region) — the Gulf trend toward open foundations is a real driver\n- Oil and industry: Bapco, Alba and energy companies — industrial control systems and monitoring servers\n- The regional cloud: AWS regional offices and its region (Bahrain among the region's first gateways) and Gulf data centers\n- The growing local software and cybersecurity companies\n\nOpen any Gulf job site today and search 'Linux Administrator' or 'DevOps' — you will meet dozens of live listings. This research task is not theoretical homework: it is the first actual career roadmap in your hands.",
        },
      },
      {
        heading: { ar: "المهارات التي تطلبها الإعلانات الحقيقية", en: "The Skills Real Listings Demand" },
        body: {
          ar: "اقرأ عشرة إعلانات وظيفية لمسؤولي أنظمة لينكس في الخليج وستجد أنماطاً تتكرر بوضوح:\n\n- RHCSA (شهادة Red Hat المعتمدة لمسؤول الأنظمة) — ذكرها شبه ثابت في الإعلانات المؤسسية\n- إتقان bash وسطر أوامر لينكس والسكربتات الآلية — موضوع وحدتك القادمة كاملة!\n- AWS والسحابة: EC2 و VPC وأساسيات التشغيل السحابي — وقد بدأت بها فعلاً في مختبراتك\n- Docker والحاويات و Kubernetes الأساسية — لغة العصر في نشر التطبيقات\n- إدارة الخدمات والمستخدمين والشبكات على الخوادم — تماماً موضوعات CILO الثالث في مادة IT6004\n\nوالخبر الجميل الذي يخصك أنت: شهادتك الجامعية من برنامج معتمد من BCS (معهد تقنية المعلومات الملكي) مضاف إليها إتقان لينكس عملي بمختبرات سحابية حقيقية — هذه تركيبة قوية جداً في أي مقابلة عمل. أضف شهادة RHCSA بعد التخرج (أو حتى قبله) فترتفع قيمتك في السوق بشكل ملموس.\n\nنصيحة صادقة: لا تنتظر السنة الأخيرة — ابدأ الآن ببناء ملفك: سجّل مختبراتك، ووثّق أول خادم تديره، وافتح مذكرة تدوين تقني خاصة بك. كل ساعة تقضيها في مختبرات AWS اليوم هي سطر في سيرتك الذاتية غداً.",
          en: "Read ten Gulf job listings for Linux system administrators and clear patterns repeat:\n\n- RHCSA (Red Hat's Certified System Administrator) — near-constant in enterprise listings\n- Solid bash, the Linux command line and automation scripting — the very subject of your next module!\n- AWS and cloud: EC2, VPC and cloud operations basics — which you have already begun in your labs\n- Docker, containers and basic Kubernetes — the era's language of app deployment\n- Managing services, users and networks on servers — precisely the third CILO topic of IT6004\n\nAnd the beautiful news that is specifically yours: your degree from a BCS-accredited programme (the Chartered Institute for IT) combined with hands-on Linux on real cloud labs is a powerful combination in any interview. Add RHCSA after (or even before) graduation and your market value rises tangibly.\n\nAn honest tip: do not wait for your final year — start building your file now: keep your lab log, document the first server you administer, keep a technical learning journal. Every hour you spend on the AWS labs today is a line in tomorrow's CV.",
        },
        tip: {
          ar: "تدريب عملي اليوم: افتح موقع وظائف، ابحث عن «Linux» في البحرين أو الخليج، واقرأ ثلاثة إعلانات — دوّن المهارات المتكررة في مذكرة مختبرك الأول.",
          en: "A practical drill today: open a job site, search 'Linux' in Bahrain or the Gulf, read three listings — note the repeating skills in your first lab notebook.",
        },
      },
    ],
    keyPoints: [
      { ar: "الخوادم الكبرى — Apache للويب، PostgreSQL و Oracle للبيانات، BIND للـ DNS، Postfix للبريد — تعمل على لينكس", en: "The great servers — Apache for web, PostgreSQL & Oracle for data, BIND for DNS, Postfix for mail — run on Linux" },
      { ar: "لينكس في الهواتف والأقمار الصناعية والمدمجة وكل السوبر كمبيوترات تقريباً", en: "Linux lives in phones, satellites, embedded devices and nearly every supercomputer" },
      { ar: "سوق البحرين والخليج يوظّف مسؤولي لينكس في الاتصالات والبنوك والحكومة والنفط والسحابة", en: "The Gulf market hires Linux admins across telecoms, banks, government, oil and the cloud" },
      { ar: "الإعلانات تتكرر فيها: RHCSA و bash و AWS و Docker — ووحدتك القادمة تغطي أول اثنين", en: "Listings repeat: RHCSA, bash, AWS, Docker — and your next module covers the first two" },
      { ar: "شهادة BCS المعتمدة + إتقان لينكس عملي = تركيبة قوية في أي مقابلة عمل", en: "A BCS-accredited degree + hands-on Linux = a powerful combination in any interview" },
    ],
    commands: [
      { cmd: "systemctl status sshd", desc: { ar: "الخدمة التي تفتح لك باب الخادم الآن — تحقق من حالتها", en: "The service opening the server's door for you right now — check its status" } },
      { cmd: "top", desc: { ar: "نظرة حية على ما تشغّله الخوادم فعلاً: العمليات والذاكرة والمعالج", en: "A live view of what servers really run: processes, memory, CPU" } },
      { cmd: "last", desc: { ar: "من دخل هذا الخادم قبلك؟ سجل المسؤولين الحقيقي", en: "Who entered this server before you? The real administrators' log" } },
    ],
    quiz: [
      {
        q: { ar: "البرمجية الأشهر لخادم DNS على لينكس هي:", en: "The most famous DNS server software on Linux is:" },
        options: [
          { ar: "BIND", en: "BIND" },
          { ar: "Postfix", en: "Postfix" },
          { ar: "LibreOffice", en: "LibreOffice" },
          { ar: "GIMP", en: "GIMP" },
        ],
        correct: 0,
        explain: { ar: "BIND هو خادم أسماء النطاقات الكلاسيكي — أما Postfix فخادم بريد، و LibreOffice و GIMP برمجيات سطح مكتب كما تسرد محاضرتك.", en: "BIND is the classic DNS name server — Postfix is mail, while LibreOffice and GIMP are desktop apps as your lecture lists." },
      },
      {
        q: { ar: "أي جهات خليجية تطلب مسؤولي ومهندسي لينكس فعلياً؟", en: "Which Gulf organizations actually demand Linux admins and engineers?" },
        options: [
          { ar: "شركات الاتصالات فقط", en: "Telecom operators only" },
          { ar: "البنوك فقط", en: "Banks only" },
          { ar: "الاتصالات والبنوك والحكومة والنفط والسحابة — السوق واسع", en: "Telecoms, banks, government, oil and the cloud — the market is wide" },
          { ar: "لا أحد — الوظائف خارج المنطقة فقط", en: "Nobody — the jobs are only outside the region" },
        ],
        correct: 2,
        explain: { ar: "من Batelco و stc إلى البنوك و NESA و Bapco و Alba ومكاتب AWS الإقليمية — ابحث بنفسك في مواقع الوظائف لترى.", en: "From Batelco and stc to banks, NESA, Bapco, Alba and regional AWS offices — search the job sites yourself and see." },
      },
      {
        q: { ar: "الشهادة المهنية الأكثر تكراراً في إعلانات مسؤولي لينكس الخليجية:", en: "The professional certification most repeated in Gulf Linux admin listings:" },
        options: [
          { ar: "رخصة قيادة السيارات", en: "A driving license" },
          { ar: "RHCSA من Red Hat", en: "RHCSA from Red Hat" },
          { ar: "شهادة سباحة", en: "A swimming certificate" },
          { ar: "TOEFL فقط", en: "TOEFL only" },
        ],
        correct: 1,
        explain: { ar: "RHCSA معيار السوق لمسؤولي Red Hat والعائلة الحمراء — و Amazon Linux 2 الذي تدرّب عليه من تلك العائلة.", en: "RHCSA is the market standard for Red Hat family admins — and Amazon Linux 2, which you train on, belongs to that family." },
      },
    ],
  },

  // ── l120 · The Unix Philosophy & Free Software ────────────────────────
  {
    id: "l120",
    moduleId: "m12",
    order: 10,
    level: "intermediate",
    title: {
      ar: "فلسفة يونكس والبرمجيات الحرة",
      en: "The Unix Philosophy & Free Software",
    },
    summary: {
      ar: "«افعل شيئاً واحداً وافعله جيداً»: البرامج مرشّحات والأنابيب والتدفقات النصية، ثم مشروع GNU ومانيفستو 1985، ورسالة تورفالدس الهاوية 1991، والكاتدرائية والبازار، وجدول GPL و MIT والاحتكاري — ولماذا تخدمك الفلسفة مهنياً.",
      en: "'Do one thing well': programs as filters, pipes and text streams, then the GNU project and 1985 manifesto, Torvalds' 1991 hobby message, the Cathedral and the Bazaar, and the GPL/MIT/proprietary table — and why the philosophy serves your career.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "«افعل شيئاً واحداً وافعله جيداً»", en: "'Do One Thing Well'" },
        body: {
          ar: "بدل بناء برامج عملاقة تفعل كل شيء، بناة يونكس اختاروا الطريق المعاكس: أدوات صغيرة متقنة، كل أداة تفعل شيئاً واحداً وتفعله جيداً، ثم تُركَّب الأدوات معاً كما تركّب قطع الليغو.\n\nسرّ التركيب هو فكرتان مركزيتان:\n- كل برنامج «مرشّح» (Filter): يستقبل نصاً من مدخله القياسي، يعالجه، يخرجه من مخرجه القياسي\n- الأنبوب | يوصل مخرج أداة بمدخل التالية مباشرة — تدفّق نصي واحد يعبر سلسلة أدوات\n\nمثال حي تجربه في أي طرفية: أمر ls يعرض الملفات، أمر wc يحسب السطور — والأنبوب يجمعهما:\n\nls | wc -l\n\nسطر واحد أجاب: «كم ملفاً في هذا المجلد؟». جرّب التعميق: ls | sort | head -10 يعطيك أول عشرة أسماء مرتبة. هذه هي «قوة الأتمتة» التي ستتقنها في وحدة bash القادمة — وكلها مبنيّة على هذه الفلسفة.",
          en: "Instead of building giant programs that do everything, Unix's builders chose the opposite road: small, polished tools, each doing one thing and doing it well, then composed together like Lego bricks.\n\nThe secret of composition is two central ideas:\n- Every program is a filter: it receives text on standard input, processes it, emits it on standard output\n- The pipe | connects one tool's output directly to the next's input — one text stream crossing a chain of tools\n\nA live example you can try in any terminal: ls lists files, wc counts lines — and the pipe joins them:\n\nls | wc -l\n\nOne line answered: 'how many files in this directory?'. Deepen it: ls | sort | head -10 yields the first ten sorted names. This is the automation superpower you will master in the upcoming bash module — and all of it stands on this philosophy.",
        },
        code: {
          lang: "bash",
          snippet: "ls | wc -l          # كم ملفاً في المجلد؟\nls | sort | head -10  # أول عشرة أسماء مرتبة\ncat /etc/passwd | wc -l  # كم مستخدماً على هذا الخادم؟",
        },
      },
      {
        heading: { ar: "قابلية النقل عبر C: فلسفة هندسية", en: "Portability Through C: An Engineering Philosophy" },
        body: {
          ar: "قرأت في درس التاريخ كيف أعاد ريتشي كتابة يونكس بلغة C عام 1973 فصار قابلاً للنقل. لاحظ أن هذا ليس قراراً تقنياً فقط — إنه موقف فلسفي: النظام لا ينتمي لعتاد بعينه، بل للأفكار.\n\n- قواعد الكتابة في روح يونكس: اكتب بلغة قابلة للنقل، تجنّب الاعتماد على تفاصيل عتاد خاصة\n- الوثائق جزء من البرنامج لا إضافة لاحقة — لكل أمر صفحة man\n- البساطة معيار الجمال الهندسي: الحل الأبسط الذي يعمل هو الأفضل\n\nهذه القيم هي التي سمحت لشيفرة سبعينيات القرن الماضي أن تعمل اليوم على هاتفك — قلّة نادرة من الأنظمة بلغت هذا العمر التشغيلي.",
          en: "You read in the history lesson how Ritchie rewrote Unix in C in 1973, making it portable. Notice this was not merely a technical choice — it is a philosophical stance: the system belongs to ideas, not to any particular hardware.\n\n- Writing rules in Unix spirit: write in a portable language, avoid depending on hardware specifics\n- Documentation is part of the program, not an afterthought — every command has a man page\n- Simplicity is the engineering beauty standard: the simplest working solution is the best\n\nThese values let 1970s code run today on your phone — a rarity almost no other system has achieved at this operational age.",
        },
      },
      {
        heading: { ar: "مشروع GNU والمانيفستو (1985)", en: "The GNU Project & the Manifesto (1985)" },
        body: {
          ar: "في 1983 أطلق ريتشارد ستولمن (Richard Stallman) مشروع GNU — ورمزه الاختزالي نكتة تعاود الظهور: «GNU ليس يونكس» (GNU's Not Unix)، تحية لطيفة للجدّ الأصلي! — بهدف بناء نظام تشغيل حر بالكامل، وفي 1985 نشر «مانيفستو GNU» يشرح لماذا يجب أن تكون البرمجيات حرة.\n\n«الحرية» هنا حرية محددة بأربع رخص: حرية التشغيل لأي غرض، ودراسة الشيفرة، وتعديلها، وتوزيع نسخك. ليست مجانية السعر بالضرورة — بل حرية المعرفة.\n\n- GNU أنتج الأدوات الكاملة: المترجم gcc ومحرر emacs والصَدَفة bash ومئات الأدوات\n- بقيت قطعة واحدة ناقصة: النواة\n- ثم جاء 1991…",
          en: "In 1983 Richard Stallman launched the GNU project (recursively 'GNU's Not Unix' — a new naming pun honoring the ancestor!) aiming to build a fully free operating system, and in 1985 he published the GNU Manifesto explaining why software must be free.\n\n'Freedom' here is precisely four liberties: to run for any purpose, study the source, modify it, and distribute your copies. Not necessarily free of price — freedom of knowledge.\n\n- GNU produced the full toolkit: the gcc compiler, the emacs editor, the bash shell, hundreds of utilities\n- One piece remained missing: the kernel\n- Then came 1991…",
        },
      },
      {
        heading: { ar: "إعلان لينكس 1991: رسالة هاوٍ", en: "The 1991 Linux Announcement: A Hobbyist's Message" },
        body: {
          ar: "الخامس والعشرون من أغسطس 1991، مجموعة أخبار comp.os.minix، طالب هلسنكي عمره 21 عاماً يكتب:\n\n«أصنع نظام تشغيل (حراً) — مجرد هواية، لن يكون كبيراً ومهنياً مثل gnu — لأجهزة 386/486… أرحّب بأي ملاحظات عن الأشياء التي يستنكرها الناس».\n\nالفتى هو لينوس تورفالدس، والهواية صارت نواة لينكس. فلسفياً حصل العالم على اللحظة الكاملة: أدوات GNU الحرة الجاهزة + نواة حرة جديدة = نظام GNU/Linux كامل، يجمع بساطة يونكس الأصلية مع حرية التوزيع والتعديل.\n\n- لاحظ أدب الرسالة: طالب يطلب النقد — لا شركة تطلق منتجاً\n- التركيب مهندسياً: نواة واحدة من تورفالدس فوق عالم أدوات من ستولمن\n- النتيجة اليوم: أكبر مشروع تعاوني في تاريخ البرمجيات، يديره آلاف المتطوعين حول العالم",
          en: "August 25th, 1991, the comp.os.minix newsgroup, a 21-year-old Helsinki student writes:\n\n'I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386/486 AT clones… I'd like any feedback on things people dislike.'\n\nThe young man is Linus Torvalds, and the hobby became the Linux kernel. Philosophically the world received its complete moment: GNU's ready free tools + a new free kernel = a complete GNU/Linux system, uniting original Unix simplicity with the freedom to distribute and modify.\n\n- Note the message's humility: a student requesting critique — not a company launching a product\n- The engineering composition: one kernel from Torvalds atop a world of Stallman's tools\n- Today's outcome: the largest collaborative software project in history, run by thousands of volunteers worldwide",
        },
        tip: {
          ar: "ابحث عن نص رسالة 1991 الأصلية واقرأها كاملة دقيقة واحدة — قلّة من الوثائق تعطي شعور «بدايات العظمة» مثلها.",
          en: "Look up the original 1991 message and read it fully for one minute — few documents convey the feel of 'great beginnings' like it.",
        },
      },
      {
        heading: { ar: "الكاتدرائية والبازار وجدول التراخيص", en: "Cathedral, Bazaar & the License Table" },
        table: {
          caption: { ar: "التراخيص الثلاثة الكبرى وسماتها", en: "The three major licenses and their traits" },
          headers: [
            { ar: "الترخيص", en: "License" },
            { ar: "ماذا يفرض", en: "What it requires" },
            { ar: "أمثلة شهيرة", en: "Famous examples" },
          ],
          rows: [
            [
              { ar: "GPL", en: "GPL" },
              { ar: "«كوبيلِفت»: من يوزّع نسخة معدلة يجب أن يفتح شيفرتها بنفس الترخيص", en: "'Copyleft': whoever distributes a modified version must open its source under the same license" },
              { ar: "نواة لينكس، bash، GCC", en: "The Linux kernel, bash, GCC" },
            ],
            [
              { ar: "MIT", en: "MIT" },
              { ar: "تصريح متساهل: افعل ما تشاء بشرط ذكر المؤلفين", en: "A permissive grant: do as you wish, just credit the authors" },
              { ar: "أدوات لا تحصى من المكتبات الصغيرة", en: "Countless tools and small libraries" },
            ],
            [
              { ar: "احتكاري", en: "Proprietary" },
              { ar: "ممنوع النسخ أو الدراسة أو التعديل — الشراء حق استخدام فقط", en: "No copying, studying or modifying — purchase grants usage rights only" },
              { ar: "ويندوز، macOS، برامج الشركات", en: "Windows, macOS, corporate software" },
            ],
          ],
        },
        body: {
          ar: "في 1997 لخّص إريك ريموند سرّ نجاح لينكس في ورقة «الكاتدرائية والبازار»: البرمجيات الاحتكارية تُبنى ككاتدرائية — نخبة معزولة تصمم سراً وتطلق نسخاً كل سنوات؛ أما لينكس فيُبنى كبازار مفتوح — آلاف من المتطوعين يبنون علناً ويطلقون أسبوعياً. قوانينه الشهيرة: «مع توافر العيون الكافية تصبح كل الأخطاء سطحية» — كلما زاد الفاحصون قلّت الأخطاء الباقية.\n\nالفلسفة كلها تنعقد في نقطة واحدة مهنية: من يتقن تركيب الأدوات الصغيرة يحصل على قوة أتمتة تفوق أي أداة عملاقة واحدة. تذكّر ls | sort | head — ثلاث أدوات صغيرة، سطر واحد، حل لأسئلة لا تحصى. هذا عقل مهندس الخوادم الذي يستأجره سوق العمل خليجياً وعالمياً.",
          en: "In 1997 Eric Raymond distilled Linux's success secret in 'The Cathedral and the Bazaar': proprietary software is built like a cathedral — an isolated elite designing secretly and releasing every few years; Linux is built like an open bazaar — thousands of volunteers building publicly and releasing weekly. His famous law: 'given enough eyeballs, all bugs are shallow' — the more reviewers, the shallower the remaining bugs.\n\nThe whole philosophy knots into one professional point: whoever masters composing small tools gains an automation power exceeding any single giant application. Remember ls | sort | head — three small tools, one line, answers to countless questions. That is the server engineer's mind the market hires, Gulf-wide and worldwide.",
        },
      },
    ],
    keyPoints: [
      { ar: "«افعل شيئاً واحداً وافعله جيداً» — أدوات صغيرة تُركّب عبر الأنابيب", en: "'Do one thing well' — small tools composed through pipes" },
      { ar: "كل برنامج مرشّح: نص من المدخل القياسي إلى المخرج القياسي", en: "Every program is a filter: text from stdin to stdout" },
      { ar: "GNU (1983-1985) وفّر الأدوات الحرة، ولينكس (1991) وفّر النواة — فاكتمل النظام", en: "GNU (1983-1985) provided the free tools; Linux (1991) the kernel — the system completed" },
      { ar: "GPL كوبيلِفت يُلزم بفتح التعديلات؛ MIT متساهل؛ والاحتكاري يمنع الدراسة", en: "GPL's copyleft forces opening modifications; MIT is permissive; proprietary forbids study" },
      { ar: "التركيب قوة مهنية: من يتقن ربط الأدوات الصغيرة يتفوق في الأتمتة", en: "Composition is career power: whoever masters chaining small tools wins at automation" },
    ],
    commands: [
      { cmd: "ls | wc -l", desc: { ar: "أول أنبوب لك: عدّ ملفات المجلد الحالي", en: "Your first pipe: count the current directory's files" } },
      { cmd: "cat /etc/passwd | wc -l", desc: { ar: "عدّ مستخدمي الخادم عبر تركيب أداتين", en: "Count the server's users by composing two tools" } },
      { cmd: "history | tail -5", desc: { ar: "آخر خمسة أوامر كتبتها — مرشّح وتركيب في عمل واحد", en: "Your last five commands — a filter and a composition at work" } },
    ],
    quiz: [
      {
        q: { ar: "الفكرة المركزية لفلسفة يونكس في بناء البرامج:", en: "The central Unix philosophy idea for building programs:" },
        options: [
          { ar: "برنامج عملاق واحد يفعل كل شيء", en: "One giant program doing everything" },
          { ar: "أدوات صغيرة كل واحدة تفعل شيئاً واحداً جيداً وتُركّب معاً", en: "Small tools each doing one thing well, composed together" },
          { ar: "برامج بلا مدخلات ولا مخرجات", en: "Programs with no inputs or outputs" },
          { ar: "منع ربط البرامج ببعضها أمنياً", en: "Forbidding programs from linking for security" },
        ],
        correct: 1,
        explain: { ar: "البرامج مرشّحات نصية والأنابيب تركّبها — من هنا قوة الأتمتة التي ستتقنها في وحدة bash.", en: "Programs are text filters and pipes compose them — hence the automation power you will master in the bash module." },
      },
      {
        q: { ar: "ما الذي كان ينقص مشروع GNU قبل 1991؟", en: "What was GNU missing before 1991?" },
        options: [
          { ar: "المحرر emacs", en: "The emacs editor" },
          { ar: "المترجم GCC", en: "The GCC compiler" },
          { ar: "النواة — فجاءت نواة تورفالدس لتكمل النظام", en: "The kernel — Torvalds' kernel completed the system" },
          { ar: "الصَدَفة bash", en: "The bash shell" },
        ],
        correct: 2,
        explain: { ar: "GNU وفّر الأدوات العلوية كاملة، وبقي ثقب النواة — ملأته نواة لينكس الحرة عام 1991 فاكتمل GNU/Linux.", en: "GNU provided the full upper toolkit; the kernel hole remained — the free Linux kernel filled it in 1991, completing GNU/Linux." },
      },
      {
        q: { ar: "الفرق الجوهري بين GPL و MIT:", en: "The essential difference between GPL and MIT:" },
        options: [
          { ar: "لا فرق بينهما إطلاقاً", en: "There is no difference at all" },
          { ar: "GPL يفرض فتح شيفرة التعديلات الموزعة، و MIT تصريح متساهل بذكر المؤلفين", en: "GPL forces opening distributed modifications' source; MIT is a permissive grant with author credit" },
          { ar: "MIT يمنع الاستخدام التجاري كلياً", en: "MIT forbids all commercial use" },
          { ar: "GPL أسرع تشغيلاً من MIT", en: "GPL runs faster than MIT" },
        ],
        correct: 1,
        explain: { ar: "كوبيلِفت GPL يحمي حرية الشيفرة عبر السلاسل، و MIT يمنح حداً أقصى من حرية الاستخدام بأدنى التزام — والاحتكاري يمنع الاثنين.", en: "GPL's copyleft protects source freedom down the chain; MIT grants maximum usage freedom with minimal obligation — proprietary forbids both." },
      },
      {
        q: { ar: "قانون لينوس في ورقة الكاتدرائية والبازار يقول:", en: "Linus's Law from the Cathedral and the Bazaar paper states:" },
        options: [
          { ar: "العيون الكافية تجعل كل الأخطاء سطحية", en: "Given enough eyeballs, all bugs are shallow" },
          { ar: "كل البرمجيات تحتاج كاتدرائية", en: "All software needs a cathedral" },
          { ar: "الأخطاء لا تُكتشف أبداً", en: "Bugs are never discovered" },
          { ar: "البرمجيات الحرة أبطأ دوماً", en: "Free software is always slower" },
        ],
        correct: 0,
        explain: { ar: "كلما زاد عدد الفاحصين المفتوحين، سرعان ما تنكشف الأخطاء وتُصلح — سرّ نجاح نموذج البازار التطويري.", en: "The more open reviewers, the faster bugs surface and get fixed — the developmental bazaar model's success secret." },
      },
    ],
  },
];
