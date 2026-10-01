import type { LessonSourceRef } from "@/lib/types";

// M13 lesson → source citations (sourceIds exist in src/data/sources.ts)
// Pool: rfc4251, gnu-bash-manual, man-pages-linux, openssh-project, amazon-linux-2,
// fhs-30, stallings-os, nemeth-handbook, kernighan-pike, posix-1003, torvalds-1991,
// ritchie-thompson-1974 — chosen to mirror the actual BPT IT6004 Unix Systems labs
// (Putty/SSH logins to Amazon Linux 2 student servers, file/user/process management,
// yum, bash scripting).

export const M13_LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  l121: [
    {
      sourceId: "rfc4251",
      note: {
        ar: "بنية بروتوكول SSH وأهدافه الأمنية — الأساس النظري لدرس الدخول الأول عبر المنفذ 22",
        en: "The SSH protocol architecture and its security goals — the theoretical basis of the first login lesson on port 22",
      },
    },
    {
      sourceId: "openssh-project",
      note: {
        ar: "وثائق OpenSSH الرسمية تصف سلوك أول اتصال وتخزين مفتاح المضيف الذي يمر به كل طالب في المختبر",
        en: "Official OpenSSH docs describe the first-connection behavior and host-key caching every lab student passes through",
      },
    },
    {
      sourceId: "amazon-linux-2",
      note: {
        ar: "دليل Amazon Linux 2 الرسمي — نظام خوادم الطلبة الفعلي (student1.bptest.cloud) على AWS",
        en: "The official Amazon Linux 2 guide — the actual OS of the student servers (student1.bptest.cloud) on AWS",
      },
    },
  ],

  l122: [
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحة الدليل passwd(1) توثّق حوار كلمة المرور الحالية والجديدة والتأكيد كما يُجرى في المختبر",
        en: "The passwd(1) man page documents the current/new/confirm dialogue exactly as performed in the lab",
      },
    },
    {
      sourceId: "openssh-project",
      note: {
        ar: "إرشادات OpenSSH لإنهاء الجلسات نظيفًا بـ exit — أساس تحذير ورقة المختبر من إغلاق النافذة بالـ X",
        en: "OpenSSH guidance on clean session teardown with exit — the basis of the lab sheet's X-closing warning",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "فصل سياسات كلمات المرور وإدارة الحسابات في مرجع إدارة الأنظمة — معايير كلمة المرور الجيدة",
        en: "The password policy and account management chapter of the admin handbook — criteria for strong passwords",
      },
    },
  ],

  l123: [
    {
      sourceId: "fhs-30",
      note: {
        ar: "معيار تراتبية نظام الملفات FHS يفسّر بنية /home و /etc و /var التي يتنقل بينها الدرس",
        en: "The FHS standard explains the /home, /etc and /var layout the lesson navigates",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحات pwd(1) و ls(1) و cd المرجعية — الوصف الرسمي للأوامر وخياراتها",
        en: "The reference man pages for pwd(1), ls(1) and cd — the official command and option descriptions",
      },
    },
    {
      sourceId: "kernighan-pike",
      note: {
        ar: "نموذج الملف كتدفق بايتات متسلسل في البيئة البرمجية ليونكس — العقل المفكر خلف شجرة المسارات",
        en: "The file-as-ordered-byte-stream model in the Unix programming environment — the mind behind the path tree",
      },
    },
  ],

  l124: [
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحات coreutils لأوامر cp و mv و rm و find — توثيق الخيارات -r و -i و -p الرسمي",
        en: "The coreutils man pages for cp, mv, rm and find — official documentation of the -r, -i and -p options",
      },
    },
    {
      sourceId: "kernighan-pike",
      note: {
        ar: "فلسفة «كل شيء ملف» وأدوات التحرير الطرفية — السياق التاريخي لمحرر nano وأخواته",
        en: "The everything-is-a-file philosophy and terminal editors — the historical context of nano and its siblings",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "ممارسات الأمان في حذف الملفات ونقلها بلا سلة محذوفات — تحذير «لا تراجع» في الدرس",
        en: "Safe file deletion and moving practices without a recycle bin — the lesson's \"no undo\" warning",
      },
    },
  ],

  l125: [
    {
      sourceId: "posix-1003",
      note: {
        ar: "معيار POSIX يحدد بتات الصلاحيات rwx ومضاعفاتها الثلاثية — المرجع الحاسم لجدول 755/644",
        en: "The POSIX standard defines the rwx permission bits and their triplets — the decisive reference for the 755/644 table",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحتا chmod(1) و chown(1) — الوصف الرسمي للوضع الثماني والرمزي وصيغة user:group",
        en: "The chmod(1) and chown(1) man pages — the official account of octal and symbolic modes and the user:group form",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "إدارة ملكية الملفات وحدود صلاحيات الجذر — مادة CILO 3 في IT6004 كما يشرحها مرجع المديرين",
        en: "File ownership management and the limits root bypasses — IT6004 CILO 3 material as the admins' handbook presents it",
      },
    },
  ],

  l126: [
    {
      sourceId: "ritchie-thompson-1974",
      note: {
        ar: "ورقة UNIX الأصلية تصف نظام المشاركة متعدد المستخدمين — الأصل التاريخي لملف /etc/passwd",
        en: "The original UNIX paper describes the multi-user time-sharing system — the historical root of /etc/passwd",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحات passwd(5) و useradd(8) و usermod(8) — الحقول السبعة وسلسلة إنشاء الحسابات",
        en: "The passwd(5), useradd(8) and usermod(8) man pages — the seven fields and the account-creation chain",
      },
    },
    {
      sourceId: "stallings-os",
      note: {
        ar: "فصل الحماية ووضعي التشغيل user/kernel في مرجع أنظمة التشغيل — الأساس الذي يفسّر قوة الجذر وسلطة sudo",
        en: "The protection and user/kernel modes chapter in the OS reference — the base explaining root's power and sudo's mandate",
      },
    },
  ],

  l127: [
    {
      sourceId: "stallings-os",
      note: {
        ar: "فصول العمليات وجدولة المعالج (Scheduling) في مرجع ستالينغز — تعريف العملية وPID ودورة حياتها",
        en: "The processes and scheduling chapters in Stallings — the definition of a process, its PID and lifecycle",
      },
    },
    {
      sourceId: "posix-1003",
      note: {
        ar: "معيار POSIX يعرّف الإشارات signal.h وسلوك TERM وKILL القابل وغير القابل للالتقاط",
        en: "The POSIX standard defines the signals in signal.h and the catchable TERM versus uncatchable KILL behavior",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحات ps(1) و top(1) و kill(1) و jobs — توثيق الأعمدة والإشارات وحالات المهام",
        en: "The man pages for ps(1), top(1), kill(1) and jobs — documentation of the columns, signals and job states",
      },
    },
  ],

  l128: [
    {
      sourceId: "amazon-linux-2",
      note: {
        ar: "دليل Amazon Linux 2 الرسمي لإدارة الحزم بـ yum — بالضبط ما تنفّذه مختبرات IT6004 على خوادمها",
        en: "The official Amazon Linux 2 guide to managing packages with yum — exactly what the IT6004 labs run on their servers",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "فصل إدارة الحزم والمستودعات في مرجع المديرين — لماذا التبعيات والتواقيع تفوق تنزيل exe اليدوي",
        en: "The package management chapter of the admin handbook — why dependencies and signatures beat manual .exe downloads",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحة yum(8) — خيارات install وhistory undo الرسمية كما وردت في مخرجات المختبر",
        en: "The yum(8) man page — the official install and history undo options as seen in the lab outputs",
      },
    },
  ],

  l129: [
    {
      sourceId: "kernighan-pike",
      note: {
        ar: "الكلاسيكية الأصلية لفلسفة الأنابيب والمصفّيات «برامج صغيرة تتقن شيئًا واحدًا» — روح الدرس كاملة",
        en: "The original classic on the pipes-and-filters philosophy, \"small programs doing one thing well\" — this lesson's entire soul",
      },
    },
    {
      sourceId: "posix-1003",
      note: {
        ar: "معيار POSIX للصدفة والأدوات يعرّف سلوك grep وsort وuniq وإعادة التوجيه > و >>",
        en: "The POSIX shell-and-utilities standard defines the behavior of grep, sort, uniq and the > and >> redirection",
      },
    },
    {
      sourceId: "man-pages-linux",
      note: {
        ar: "صفحات grep(1) و wc(1) و sort(1) و uniq(1) — المرجع الرسمي للمصفّيات الخمسة الذهبية",
        en: "The man pages for grep(1), wc(1), sort(1) and uniq(1) — the official reference for the five golden filters",
      },
    },
  ],

  l130: [
    {
      sourceId: "gnu-bash-manual",
      note: {
        ar: "دليل Bash المرجعي الرسمي — المتغيرات والوسائط $1 و$? وبنية if/for كما يشرحها GNU نفسه",
        en: "The official Bash reference manual — variables, the $1 and $? arguments, and the if/for constructs straight from GNU",
      },
    },
    {
      sourceId: "nemeth-handbook",
      note: {
        ar: "فصل الأتمتة والسكربتات للمديرين — لماذا يكتب المدير سكربت النسخ الاحتياطي بدل تكرار العمل يدويًا",
        en: "The admins' handbook chapter on automation and scripting — why an admin writes the backup script instead of repeating the work",
      },
    },
    {
      sourceId: "posix-1003",
      note: {
        ar: "معيار لغة الصدفة sh في POSIX — القواعد القياسية التي يتقيد بها #!/bin/bash في السطر الأول",
        en: "The POSIX shell language standard — the rules #!/bin/bash conforms to from its very first line",
      },
    },
  ],
};
