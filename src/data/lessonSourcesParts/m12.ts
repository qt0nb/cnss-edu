import type { LessonSourceRef } from "@/lib/types";

// M12 lesson → source citations (sourceIds exist in src/data/sources.ts)
// Pool: stallings-os, tanenbaum-modern-os, silberschatz-os, ritchie-thompson-1974,
// torvalds-1991, posix-1003, fhs-30, linux-kernel-org, gnu-manifesto,
// raymond-cathedral, nemeth-handbook, kernighan-pike, bcs-accreditation, acm-cc2020.
export const M12_LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  // ── l111 · What is an OS? The Resource Manager ──
  l111: [
    {
      sourceId: "stallings-os",
      note: {
        ar: "المرجع الذي تقتبس منه محاضرات IT6004 مخطط طبقات البرمجيات نفسه — تعريف النظام مديراً للموارد (عمليات، ذاكرة، ملفات، أجهزة، أمان) كما يعرضه الدرس",
        en: "The very textbook IT6004 lectures draw their software-layers diagram from — the OS as manager of processes, memory, files, devices and security, exactly as the lesson presents it",
      },
    },
    {
      sourceId: "tanenbaum-modern-os",
      note: {
        ar: "الفصل التمهيدي يوسّع فكرة فضاء المستخدم مقابل فضاء النواة وبوابة استدعاءات النظام الوحيدة",
        en: "The introductory chapter expands user space versus kernel space and the single system-call gateway",
      },
    },
    {
      sourceId: "silberschatz-os",
      note: {
        ar: "«كتاب الديناصور» يعمّق مفهوم الحماية والعزل بين العمليات — أساس قسم «الأمان» في جدول الموارد",
        en: "The 'Dinosaur Book' deepens protection and process isolation — the basis of the resources table's security row",
      },
    },
  ],

  // ── l112 · OS Evolution: From Punched Cards to the Cloud ──
  l112: [
    {
      sourceId: "silberschatz-os",
      note: {
        ar: "الفصل التاريخي في الكتاب يسرد تطور أنظمة التشغيل من المعالجة بالدفعات إلى الاقتسام الزمني — العمود الفقري لخط الدرس الزمني",
        en: "The book's historical chapter narrates the evolution from batch processing to time-sharing — the backbone of the lesson's timeline",
      },
    },
    {
      sourceId: "tanenbaum-modern-os",
      note: {
        ar: "سرد تانينباوم للاقتسام الزمني وتعدد البرامج ومقارنة الحوسبة الشخصية بالسحابية تكمّل جدول «كل عصر ومشكلته»",
        en: "Tanenbaum's account of time-sharing and multiprogramming, and his personal-versus-cloud comparison, complete the era/problem table",
      },
    },
    {
      sourceId: "stallings-os",
      note: {
        ar: "منهج ستالينغز في تعليل كل مرحلة تطورية بمشكلة أداء سابقة ينسجم مع بنية الدرس «الألم ثم الحل»",
        en: "Stallings' method of motivating each evolutionary step by a prior performance pain mirrors the lesson's pain-then-solution structure",
      },
    },
  ],

  // ── l113 · Unix History: From Multics to Bell Labs ──
  l113: [
    {
      sourceId: "ritchie-thompson-1974",
      note: {
        ar: "الورقة الأصلية لصانعي يونكس تذكر بيئة Multics وتوليد النظام المبسط بعدها — المصدر الأولي لقصة 1969 و1973",
        en: "The original paper by Unix's creators mentions the Multics environment and the simplified system born after it — the primary source for the 1969 and 1973 story",
      },
    },
    {
      sourceId: "tanenbaum-modern-os",
      note: {
        ar: "مؤلف الكتاب هو صانع MINIX الذي أعلن تورفالدس مشروعه فوق مجموعته البريدية — حلقة الوصل الحية بين تاريخ يونكس وميلاد لينكس في الدرس",
        en: "The book's author built MINIX, whose mailing list hosted Torvalds' announcement — a living link between Unix history and Linux's birth in the lesson",
      },
    },
    {
      sourceId: "posix-1003",
      note: {
        ar: "المعيار الذي أنهى حروب يونكس بتوحيد الواجهة — شاهد حي على فصل «معاهدة السلام» في الخط الزمني",
        en: "The standard that ended the Unix wars by unifying the interface — a living witness of the timeline's peace-treaty chapter",
      },
    },
  ],

  // ── l114 · Unix Architecture: Kernel, Shell & System Calls ──
  l114: [
    {
      sourceId: "stallings-os",
      note: {
        ar: "مخطط الطبقات الخمس (تطبيقات، أوامر ومكتبات، واجهة استدعاءات، نواة، عتاد) مع نزول الطلبات وصعود الردود منقول من هذا المرجع الذي تعتمده المحاضرة حرفياً",
        en: "The five-layer diagram (applications, commands & libraries, syscall interface, kernel, hardware) with requests down and replies up is drawn from the exact reference the lecture uses",
      },
    },
    {
      sourceId: "ritchie-thompson-1974",
      note: {
        ar: "الورقة الأصلية تصف الصَدَفة واستدعاءات النظام كما صممهما الصانعان — تعزيز قسم «ما الصَدَفة فعلاً؟»",
        en: "The original paper describes the shell and system calls as their designers built them — reinforcing the 'what is the shell really?' section",
      },
    },
    {
      sourceId: "kernighan-pike",
      note: {
        ar: "كيرنيغان وبايك يشرحان الصَدَفة بوصفها لغة برمجة كاملة لا مجرد صندوق أوامر — الأساس لتمييز API عن CLI",
        en: "Kernighan and Pike explain the shell as a full programming language, not a mere command box — the basis for distinguishing API from CLI",
      },
    },
  ],

  // ── l115 · Unix vs Windows vs Mac ──
  l115: [
    {
      sourceId: "stallings-os",
      note: {
        ar: "إطار المقارنة بين واجهات الأنظمة (WinAPI مقابل POSIX) ومستويات الحماية في كل منها — هيكل جدول المقارنة الكبرى في الدرس",
        en: "The framework for comparing system interfaces (WinAPI versus POSIX) and their protection levels — the skeleton of the lesson's big comparison table",
      },
    },
    {
      sourceId: "tanenbaum-modern-os",
      note: {
        ar: "مقارنات تانينباوم الممتدة عبر يونكس وويندوز تدعم صفوف الأمان وتباعد التصميم بين العائلتين",
        en: "Tanenbaum's cross-Unix-and-Windows comparisons support the security row and the design divergence between the two families",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "«الكتاب الأرجواني» لمسؤولي الأنظمة يقارن عملياً إدارة لينكس ويونكس التجارية وويندوز في بيئات العمل الحقيقية",
        en: "The sysadmin 'purple book' compares managing Linux, commercial Unix and Windows in real production environments",
      },
    },
  ],

  // ── l116 · Linux Distributions & Desktop Environments ──
  l116: [
    {
      sourceId: "linux-kernel-org",
      note: {
        ar: "المنبع الرسمي الذي تُبنى عليه كل التوزيعات — يثبت أن «التوزيعة» تجميع فوق نواة واحدة مشتركة",
        en: "The official origin every distribution builds upon — proving a 'distribution' is an assembly over one shared kernel",
      },
    },
    {
      sourceId: "posix-1003",
      note: {
        ar: "المعيار الذي يجعل أوامرك تعمل عبر Ubuntu و Red Hat و Amazon Linux 2 — الجواب على «لماذا تتشابه التوزيعات؟»",
        en: "The standard making your commands work across Ubuntu, Red Hat and Amazon Linux 2 — the answer to 'why do distros feel alike?'",
      },
    },
    {
      sourceId: "raymond-cathedral",
      note: {
        ar: "نموذج البازار المفتوح يفسّر لماذا وُلدت مئات التوزيعات من تعديل حُر بدل إصدار واحد مغلق — البعد الثقافي لجدول التوزيعات",
        en: "The open bazaar model explains why hundreds of distros were born from free modification instead of one closed release — the cultural dimension of the distro table",
      },
    },
  ],

  // ── l117 · Linux Filesystem: FHS & ext4 vs NTFS ──
  l117: [
    {
      sourceId: "fhs-30",
      note: {
        ar: "المعيار الرسمي لشجرة المجلدات — مصدر جدول FHS (الإعدادات في /etc والسجلات في /var وملفاتك في /home) حرفياً",
        en: "The official directory-tree standard — the literal source of the FHS table (configs in /etc, logs in /var, your files in /home)",
      },
    },
    {
      sourceId: "silberschatz-os",
      note: {
        ar: "فصل تنفيذ أنظمة الملفات يشرح التدوين والتجزءة وحساسية حالة الأحرف — المرجع التقني لجدول ext4 مقابل NTFS",
        en: "The file-system implementation chapter covers journaling, fragmentation and case sensitivity — the technical reference for the ext4-vs-NTFS table",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "خبرة مسؤولي الأنظمة في نقاط التركيب والتخزين وسجلاتها — العمق العملي لقسم المسارات والتركيب",
        en: "Sysadmin experience with mount points and storage layout — the practical depth behind the paths-and-mounts section",
      },
    },
  ],

  // ── l118 · Multi-User Unix & Security ──
  l118: [
    {
      sourceId: "silberschatz-os",
      note: {
        ar: "فصلا الحماية والتوثيق هما الأساس النظري ل UID و GID وملكية الملفات ونموذج الصلاحيات الثلاثي",
        en: "The protection and authentication chapters are the theoretical basis for UID, GID, file ownership and the triple permission model",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "مرجع مسؤولي الأنظمة في إدارة المستخدمين و sudo والسجلات — الدليل المهني لمبدأ الامتياز الأدنى وقاعدة «لا تعش كجذر»",
        en: "The sysadmin reference on user management, sudo and logging — the professional guide to least privilege and the 'never live as root' rule",
      },
    },
    {
      sourceId: "stallings-os",
      note: {
        ar: "معالجة ستالينغز لأمان أنظمة التشغيل تربط عزل الذاكرة والملفات بندرة الإصابات — الدعامة المنطقية لقسم «لماذا قليل من فيروسات لينكس»",
        en: "Stallings' OS security treatment links memory and file isolation to rare infections — the logical prop of the 'why few Linux viruses' section",
      },
    },
  ],

  // ── l119 · Linux Servers & the Job Market in Bahrain & the Gulf ──
  l119: [
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "خريطة الأدوار الخادمية (ويب، قواعد بيانات، DNS، بريد) وأدواتها كما تدار فعلياً — مرجع جدول أدوار الخوادم",
        en: "The map of server roles (web, databases, DNS, mail) and their tools as actually run — the reference for the server-roles table",
      },
    },
    {
      sourceId: "bcs-accreditation",
      note: {
        ar: "جهة اعتماد برنامجك نفسه — الركيزة التي يقوم عليها وعد الدرس: شهادة معتمدة دولياً + إتقان لينكس = سيرة قوية",
        en: "Your own programme's accreditor — the pillar behind the lesson's promise: an internationally accredited degree + Linux mastery = a strong CV",
      },
    },
    {
      sourceId: "acm-cc2020",
      note: {
        ar: "إطار الكفايات العالمي من ACM وIEEE يضع مهارات التشغيل والإدارة ضمن كفايات خريجي تقنية المعلومات — الشرعية الأكاديمية لخريطة المسار المهني",
        en: "ACM/IEEE's global competency framework places operations and administration skills within IT graduate competencies — the academic legitimacy of the career map",
      },
    },
  ],

  // ── l120 · The Unix Philosophy & Free Software ──
  l120: [
    {
      sourceId: "kernighan-pike",
      note: {
        ar: "المرجع الكلاسيكي لفلسفة «افعل شيئاً واحداً وافعله جيداً»: المرشّحات والأنابيب وتركيب الأدوات الصغيرة — روح الدرس كلها",
        en: "The classic reference for 'do one thing well': filters, pipes and composing small tools — the soul of the entire lesson",
      },
    },
    {
      sourceId: "gnu-manifesto",
      note: {
        ar: "نص المانيفستو الأصلي (1985) بحرياته الأربع — المصدر الأولي لقسم مشروع GNU وفلسفة البرمجيات الحرة",
        en: "The original manifesto text (1985) with its four freedoms — the primary source for the GNU project section and free-software philosophy",
      },
    },
    {
      sourceId: "torvalds-1991",
      note: {
        ar: "رسالة الإعلان الحرفية بعبارة «just a hobby, won't be big and professional like gnu» — نص قسم 1991 مأخوذ منها مباشرة",
        en: "The verbatim announcement message with 'just a hobby, won't be big and professional like gnu' — the 1991 section's text taken directly from it",
      },
    },
  ],
};
