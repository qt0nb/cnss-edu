import type { LessonInteractive } from "@/lib/types";

// M11 interactive widgets ("w:<lessonId>:<n>") — 1 per lesson, rendered after
// lesson.sections[widget.sectionIndex]. Rules honored: sectionIndex valid,
// xp 8-15, bilingual mobile-length strings, fill bank = every answer + ≤3 distractors.
export const M11_INTERACTIVES: Record<string, LessonInteractive[]> = {
  l101: [
    {
      kind: "match",
      id: "w:l101:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق مكونات فون نويمان", en: "Match the von Neumann components" },
      instructions: {
        ar: "اضغط المكون ثم وظيفته الصحيحة في المعمارية",
        en: "Tap a component, then its correct role in the architecture",
      },
      pairs: [
        {
          left: { ar: "المعالج CPU", en: "The CPU" },
          right: { ar: "وحدة الحساب ALU ووحدة التحكم معاً", en: "The ALU and the control unit together" },
        },
        {
          left: { ar: "الذاكرة الرئيسة", en: "Main memory" },
          right: { ar: "تخزن التعليمات والبيانات في عناوين مرقمة", en: "Stores instructions and data at numbered addresses" },
        },
        {
          left: { ar: "وحدات الإدخال/الإخراج", en: "Input/output units" },
          right: { ar: "تربط الجهاز بالعالم الخارجي والشبكة", en: "Connect the machine to the outside world and network" },
        },
        {
          left: { ar: "النواقل Buses", en: "The buses" },
          right: { ar: "مسارات نقل البيانات والعناوين بين المكونات", en: "The paths carrying data and addresses between components" },
        },
        {
          left: { ar: "البرنامج المخزّن", en: "The stored program" },
          right: { ar: "الفكرة التي تسكن التعليمات الذاكرة كالبيانات", en: "The idea letting instructions live in memory like data" },
        },
      ],
    },
  ],
  l102: [
    {
      kind: "fill",
      id: "w:l102:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "أكمل حقائق المعالج والذاكرة", en: "Complete the CPU and memory facts" },
      instructions: {
        ar: "اختر من البنك الكلمة المناسبة لكل فراغ",
        en: "Pick from the bank the word fitting each blank",
      },
      template: {
        ar: "أسرع ذاكرات الكاش هي ____ الخاص بكل نواة، وذاكرة RAM ____ أي تفقد بياناتها عند انقطاع الكهرباء، بينما تفعّل عصوان متطابقتان ____ التي تضاعف عرض النطاق.",
        en: "The fastest cache is the ____ private to each core, RAM is ____ losing data without power, and two matched sticks enable ____ which doubles bandwidth.",
      },
      blanks: [
        { answer: { ar: "L1", en: "L1" }, hint: { ar: "الأصغر والأسرع", en: "Smallest and fastest" } },
        { answer: { ar: "متطايرة", en: "volatile" }, hint: { ar: "صفة سلوكها مع التيار", en: "How it behaves with power" } },
        { answer: { ar: "القناة المزدوجة", en: "dual channel" }, hint: { ar: "ميزة العصوين المتطابقتين", en: "The two matched sticks feature" } },
      ],
      bank: [
        { ar: "L1", en: "L1" },
        { ar: "متطايرة", en: "volatile" },
        { ar: "القناة المزدوجة", en: "dual channel" },
        { ar: "L3", en: "L3" },
        { ar: "ROM", en: "ROM" },
      ],
    },
  ],
  l103: [
    {
      kind: "order",
      id: "w:l103:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "رتّب هرم التخزين", en: "Order the storage pyramid" },
      instructions: {
        ar: "اضغط الطبقات من الأسرع والأصغر إلى الأبطأ والأكبر",
        en: "Tap the tiers from fastest and smallest to slowest and largest",
      },
      items: [
        { ar: "سجلات المعالج Registers", en: "CPU registers" },
        { ar: "الكاش L1/L2/L3", en: "The L1/L2/L3 caches" },
        { ar: "الذاكرة RAM", en: "RAM" },
        { ar: "قرص NVMe", en: "An NVMe SSD" },
        { ar: "قرص HDD", en: "An HDD" },
        { ar: "الشريط والأرشيف البارد", en: "Tape and cold archive" },
      ],
    },
  ],
  l104: [
    {
      kind: "binary",
      id: "w:l104:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "تدريب التحويل الثنائي", en: "Binary conversion drill" },
      instructions: {
        ar: "بدّل البتات الثمانية حتى يساوي العدد العشري الظاهر — تذكر الأوزان 128 و64 و32 و16 و8 و4 و2 و1",
        en: "Toggle the 8 bits until they equal the shown decimal — recall the weights 128, 64, 32, 16, 8, 4, 2, 1",
      },
      values: [10, 170, 202],
    },
  ],
  l105: [
    {
      kind: "order",
      id: "w:l105:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "رتّب خطوات تثبيت النظام", en: "Order the OS install steps" },
      instructions: {
        ar: "اضغط الخطوات بالترتيب الصحيح من التحضير حتى ما بعد الإقلاع",
        en: "Tap the steps in correct order, from preparation to post-boot",
      },
      items: [
        { ar: "جهّز وسط USB للإقلاع وغيّر ترتيب الأجهزة", en: "Prepare a bootable USB and change boot order" },
        { ar: "اختر اللغة والتخطيط والمنطقة الزمنية", en: "Choose language, layout and time zone" },
        { ar: "قسّم القرص: قسم EFI وقسم النظام", en: "Partition the disk: EFI and system partitions" },
        { ar: "انسخ ملفات النظام وثبّت النواة", en: "Copy system files and install the kernel" },
        { ar: "أنشئ حسابك الأول وكلمة مروره", en: "Create your first account and password" },
        { ar: "شغّل التحديثات وثبّت المشغّلات", en: "Run updates and install drivers" },
      ],
    },
  ],
  l106: [
    {
      kind: "order",
      id: "w:l106:1",
      sectionIndex: 0,
      xp: 12,
      title: { ar: "رتّب سلسلة الإقلاع", en: "Order the boot chain" },
      instructions: {
        ar: "اضغط المراحل بالترتيب من زر الطاقة حتى شاشة الدخول",
        en: "Tap the stages in order, from the power button to the login screen",
      },
      items: [
        { ar: "زر الطاقة وإشارة Power Good", en: "Power button and the Power Good signal" },
        { ar: "فحص POST الذاتي للعتاد", en: "The POST hardware self-test" },
        { ar: "الفيرموير BIOS/UEFI يقرأ ترتيب الإقلاع", en: "The BIOS/UEFI firmware reads boot order" },
        { ar: "محمل الإقلاع GRUB أو Boot Manager", en: "The bootloader: GRUB or Boot Manager" },
        { ar: "تحميل النواة وتشغيل المشغّلات", en: "Kernel loading and drivers starting" },
        { ar: "شاشة الدخول ثم سطح المكتب", en: "The login screen, then the desktop" },
      ],
    },
  ],
  l107: [
    {
      kind: "classify",
      id: "w:l107:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "صنّف المشغّلات الفوقية", en: "Classify the hypervisors" },
      instructions: {
        ar: "اضغط كل مشغّل فوقي ثم نوعه الصحيح",
        en: "Tap each hypervisor, then its correct type",
      },
      buckets: [
        { ar: "النوع الأول: خام المعدن Type 1", en: "Type 1: bare metal" },
        { ar: "النوع الثاني: فوق نظام المضيف Type 2", en: "Type 2: atop the host OS" },
      ],
      items: [
        { text: { ar: "VMware ESXi", en: "VMware ESXi" }, bucket: 0 },
        { text: { ar: "VirtualBox", en: "VirtualBox" }, bucket: 1 },
        { text: { ar: "KVM داخل نواة لينكس", en: "KVM inside the Linux kernel" }, bucket: 0 },
        { text: { ar: "VMware Workstation Player", en: "VMware Workstation Player" }, bucket: 1 },
        { text: { ar: "Hyper-V في Windows Server", en: "Hyper-V in Windows Server" }, bucket: 0 },
        { text: { ar: "أوبونتو كضيف على محاكٍ في حاسوبك الشخصي", en: "Ubuntu as a guest on a simulator on your own PC" }, bucket: 1 },
      ],
    },
  ],
  l108: [
    {
      kind: "classify",
      id: "w:l108:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "صنّف خدمات السحابة", en: "Classify the cloud services" },
      instructions: {
        ar: "اضغط الخدمة ثم نموذجها: بنية أم منصة أم برمجيات كخدمة",
        en: "Tap a service, then its model: infrastructure, platform or software as a service",
      },
      buckets: [
        { ar: "IaaS: البنية التحتية كخدمة", en: "IaaS: infrastructure" },
        { ar: "PaaS: المنصة كخدمة", en: "PaaS: platform" },
        { ar: "SaaS: البرمجيات كخدمة", en: "SaaS: software" },
      ],
      items: [
        { text: { ar: "خادم AWS EC2", en: "An AWS EC2 server" }, bucket: 0 },
        { text: { ar: "منصة Heroku للنشر", en: "The Heroku deploy platform" }, bucket: 1 },
        { text: { ar: "بريد Gmail", en: "Gmail" }, bucket: 2 },
        { text: { ar: "DigitalOcean Droplet", en: "A DigitalOcean Droplet" }, bucket: 0 },
        { text: { ar: "Microsoft 365", en: "Microsoft 365" }, bucket: 2 },
        { text: { ar: "Google App Engine", en: "Google App Engine" }, bucket: 1 },
      ],
    },
  ],
  l109: [
    {
      kind: "match",
      id: "w:l109:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق المنفذ بوظيفته", en: "Match each port to its purpose" },
      instructions: {
        ar: "اضغط المنفذ ثم وظيفته الأساسية",
        en: "Tap a port, then its primary purpose",
      },
      pairs: [
        {
          left: { ar: "USB-C", en: "USB-C" },
          right: { ar: "قابل للعكس: بيانات وفيديو وطاقة تصل 240 واط", en: "Reversible: data, video and up to 240 W power" },
        },
        {
          left: { ar: "HDMI", en: "HDMI" },
          right: { ar: "صوت وصورة رقمية في كابل واحد للشاشات", en: "Digital audio and video in one cable for displays" },
        },
        {
          left: { ar: "RJ45", en: "RJ45" },
          right: { ar: "منفذ الإيثرنت ذو الثمانية أسلاك — منفذك المهني", en: "The eight-wire Ethernet port — your professional port" },
        },
        {
          left: { ar: "PCIe x16", en: "PCIe x16" },
          right: { ar: "الخطوط السريعة لبطاقات الرسوميات", en: "The fast lanes for graphics cards" },
        },
        {
          left: { ar: "SFP+", en: "SFP+" },
          right: { ar: "واجهة ألياف لسرعات 10G ومدى أبعد", en: "A fiber interface for 10G and longer reach" },
        },
      ],
    },
  ],
  l110: [
    {
      kind: "classify",
      id: "w:l110:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "صنّف علاج البطء", en: "Classify the slow-machine cure" },
      instructions: {
        ar: "اضغط كل حالة ثم قرار الترقية الصحيح لها",
        en: "Tap each scenario, then its correct upgrade decision",
      },
      buckets: [
        { ar: "زد الذاكرة RAM", en: "Add RAM" },
        { ar: "بدّل القرص إلى SSD", en: "Switch the disk to SSD" },
        { ar: "فكّر بمعالج أقوى", en: "Consider a stronger CPU" },
      ],
      items: [
        { text: { ar: "إقلاع يستغرق 3 دقائق ونشاط القرص 100% دائماً", en: "Boot takes 3 minutes with disk activity always 100%" }, bucket: 1 },
        { text: { ar: "خمسون تبويب متصفح تجمد الجهاز والذاكرة ممتلئة", en: "Fifty browser tabs freeze the machine with memory full" }, bucket: 0 },
        { text: { ar: "ترميز الفيديو يشبع كل الأنوية 100%", en: "Video encoding saturates every core at 100%" }, bucket: 2 },
        { text: { ar: "النظام يستبدل كثيراً إلى القرص عند تشغيل الآلات الافتراضية", en: "The system swaps heavily to disk when running VMs" }, bucket: 0 },
        { text: { ar: "نسخ الملفات الكبيرة بطيء على قرص HDD قديم", en: "Copying large files is slow on an old HDD" }, bucket: 1 },
        { text: { ar: "التصدير والبناء بطيئان والمعالج مشبع في كل الحالات", en: "Exporting and builds are slow with the CPU saturated in all cases" }, bucket: 2 },
      ],
    },
  ],
};
