// ─── Lesson interactive widgets (checkpoint exercises) ───────────────────
// Every entry: lessonId → LessonInteractive[] rendered after
// lesson.sections[widget.sectionIndex] inside the lesson reader.
//
// Authored in Task 11-b — 64 lessons · 76 widgets across modules m01..m10:
//   order ×24 · match ×23 · classify ×14 · fill ×9 · binary ×3 · subnet ×3
// Rules honored: ids "w:<lessonId>:<n>", sectionIndex < sections.length,
// xp 8-15, bilingual AR/EN mobile-length text, fill bank = every answer
// (exact strings) + ≤3 distractors, subnet masks are the smallest
// mathematically valid fit (2^hostbits − 2 ≥ hosts).

import type { LessonInteractive } from "@/lib/types";

export const LESSON_INTERACTIVES: Record<string, LessonInteractive[]> = {
  // ═══════════════ MODULE 01 · Foundations ═══════════════
  l001: [
    {
      kind: "order",
      id: "w:l001:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "رتّب نمو الشبكة", en: "Order the network growth stages" },
      instructions: {
        ar: "اضغط المراحل بالترتيب الصحيح من البداية للإنترنت الحديث",
        en: "Tap the stages in correct order, from the beginnings to the modern Internet",
      },
      items: [
        { ar: "شبكة ARPANET البحثية", en: "ARPANET research network" },
        { ar: "معيار TCP/IP الموحد", en: "The unified TCP/IP standard" },
        { ar: "شبكة الشبكات NSFNET", en: "The NSFNET network of networks" },
        { ar: "الإنترنت التجاري العالمي", en: "The global commercial Internet" },
        { ar: "سحابة وإنترنت الأشياء", en: "Cloud & the Internet of Things" },
      ],
    },
    {
      kind: "match",
      id: "w:l001:2",
      sectionIndex: 0,
      xp: 8,
      title: { ar: "طابق عناصر الشبكة الخمسة", en: "Match the five network elements" },
      instructions: {
        ar: "اضغط عنصرًا من العمود الأول ثم وصفه الصحيح",
        en: "Tap an element, then its correct description",
      },
      pairs: [
        {
          left: { ar: "المُرسِل", en: "Sender" },
          right: { ar: "يبدأ الحوار ويطلب الخدمة", en: "Starts the dialogue and requests the service" },
        },
        {
          left: { ar: "المُستقبِل", en: "Receiver" },
          right: { ar: "الوجهة النهائية للرسالة", en: "The final destination of the message" },
        },
        {
          left: { ar: "الرسالة", en: "Message" },
          right: { ar: "البيانات المُتبادَلة نفسها", en: "The data being exchanged" },
        },
        {
          left: { ar: "الوسيط", en: "Medium" },
          right: { ar: "المسار الذي يحمل الإشارة", en: "The path that carries the signal" },
        },
        {
          left: { ar: "البروتوكول", en: "Protocol" },
          right: { ar: "قواعد الحوار المتفق عليها", en: "The agreed rules of the dialogue" },
        },
      ],
    },
  ],
  l002: [
    {
      kind: "classify",
      id: "w:l002:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "صنّف الشبكة حسب امتدادها", en: "Classify each network by span" },
      instructions: {
        ar: "اضغط الحالة ثم نوع الشبكة المناسب لها",
        en: "Tap a scenario, then its matching network type",
      },
      buckets: [
        { ar: "PAN: أمتار حول الشخص", en: "PAN: meters around a person" },
        { ar: "LAN: مبنى واحد", en: "LAN: one building" },
        { ar: "MAN: مدينة واحدة", en: "MAN: one city" },
        { ar: "WAN: بلد إلى العالم", en: "WAN: country to the world" },
      ],
      items: [
        { text: { ar: "هاتف يتصل بسماعة بلوتوث", en: "A phone paired to a Bluetooth headset" }, bucket: 0 },
        { text: { ar: "شبكة مكتب داخل مبنى واحد", en: "An office network inside one building" }, bucket: 1 },
        { text: { ar: "شبكة منزلك اللاسلكية", en: "Your home Wi-Fi network" }, bucket: 1 },
        { text: { ar: "فروع شركة داخل مدينة واحدة", en: "Company branches within one city" }, bucket: 2 },
        { text: { ar: "ربط المقر بموقع في قارة أخرى", en: "Linking HQ to a site on another continent" }, bucket: 3 },
        { text: { ar: "حسّاسات على جسم المستخدم", en: "Sensors worn on the user's body" }, bucket: 0 },
      ],
    },
  ],
  l003: [
    {
      kind: "match",
      id: "w:l003:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "طابق الطوبولوجيا وسماتها", en: "Match topologies to their traits" },
      instructions: {
        ar: "اضغط الطوبولوجيا ثم صفتها الأساسية",
        en: "Tap a topology, then its key trait",
      },
      pairs: [
        {
          left: { ar: "النجمة Star", en: "Star" },
          right: { ar: "جهاز مركزي؛ عزل أعطال ممتاز لكنه SPOF", en: "Central device; great fault isolation but a SPOF" },
        },
        {
          left: { ar: "الناقل Bus", en: "Bus" },
          right: { ar: "كابل واحد مشترك؛ صفحة من التاريخ", en: "One shared cable; a page of history" },
        },
        {
          left: { ar: "الحلقة Ring", en: "Ring" },
          right: { ar: "كل جهاز موصول بجارين له", en: "Each device connects to its two neighbors" },
        },
        {
          left: { ar: "الشبكية الكاملة Mesh", en: "Full mesh" },
          right: { ar: "‏n(n−1)/2 وصلة وأقصى موثوقية وأعلى كلفة", en: "n(n−1)/2 links, max reliability, highest cost" },
        },
      ],
    },
  ],
  l005: [
    {
      kind: "match",
      id: "w:l005:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق مقاييس الأداء", en: "Match the performance metrics" },
      instructions: {
        ar: "اضغط المقياس ثم تعريفه الدقيق",
        en: "Tap a metric, then its precise definition",
      },
      pairs: [
        {
          left: { ar: "عرض النطاق Bandwidth", en: "Bandwidth" },
          right: { ar: "السعة النظرية القصوى للوصلة", en: "The theoretical maximum capacity of the link" },
        },
        {
          left: { ar: "المُخرَج Throughput", en: "Throughput" },
          right: { ar: "معدل النقل الفعلي المُقاس", en: "The actual measured transfer rate" },
        },
        {
          left: { ar: "زمن الاستجابة Latency", en: "Latency" },
          right: { ar: "إجمالي تأخير وصول الحزمة من A إلى B", en: "Total delay for a packet from A to B" },
        },
        {
          left: { ar: "التذبذب Jitter", en: "Jitter" },
          right: { ar: "تباين التأخير بين الحزم — عدو البث الحي", en: "Delay variance between packets — live streaming's enemy" },
        },
      ],
    },
  ],
  l006: [
    {
      kind: "match",
      id: "w:l006:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "طابق الجهاز بدوره", en: "Match each device to its role" },
      instructions: {
        ar: "اضغط الجهاز ثم وظيفته الأساسية",
        en: "Tap a device, then its core function",
      },
      pairs: [
        {
          left: { ar: "المبدّل Switch", en: "Switch" },
          right: { ar: "يمرر الإطارات حسب MAC في الطبقة 2", en: "Forwards frames by MAC at layer 2" },
        },
        {
          left: { ar: "الموجّه Router", en: "Router" },
          right: { ar: "يوّجه الحزم بين الشبكات حسب IP ويحجز نطاقات البث", en: "Routes packets between networks by IP and separates broadcast domains" },
        },
        {
          left: { ar: "نقطة الوصول AP", en: "Access Point" },
          right: { ar: "جسر لاسلكي يربط Wi-Fi بالإيثرنت", en: "A wireless bridge between Wi-Fi and Ethernet" },
        },
        {
          left: { ar: "الجدار الناري Firewall", en: "Firewall" },
          right: { ar: "يفحص الحركة ويسمح أو يمنع وفق قواعد", en: "Inspects traffic and allows/denies by policy" },
        },
      ],
    },
  ],
  l008: [
    {
      kind: "order",
      id: "w:l008:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب طبقات OSI من 7 إلى 1", en: "Order the OSI layers from 7 to 1" },
      instructions: {
        ar: "اضغط الطبقات بدءًا من العليا (التطبيق) حتى الدنيا (الفيزيائي)",
        en: "Tap the layers from the top (Application) down to the bottom (Physical)",
      },
      items: [
        { ar: "التطبيق Application", en: "Application" },
        { ar: "العرض Presentation", en: "Presentation" },
        { ar: "الجلسة Session", en: "Session" },
        { ar: "النقل Transport", en: "Transport" },
        { ar: "الشبكة Network", en: "Network" },
        { ar: "وصل البيانات Data Link", en: "Data Link" },
        { ar: "الفيزيائي Physical", en: "Physical" },
      ],
    },
  ],
  l010: [
    {
      kind: "order",
      id: "w:l010:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "رتّب بناء الشبكة المنزلية", en: "Order the home-network build" },
      instructions: {
        ar: "اضغط الخطوات بالترتيب الهندسي الصحيح",
        en: "Tap the steps in the correct engineering order",
      },
      items: [
        { ar: "ارسم المخطط وخطة العنونة قبل الشراء", en: "Draw the diagram and addressing plan before buying" },
        { ar: "ثبّت الأجهزة ووصّلها بالكابلات", en: "Install the devices and cable them" },
        { ar: "خصّص البوابة .1 و DHCP من .50", en: "Set gateway .1 and DHCP from .50" },
        { ar: "غيّر كلمة مرور الإدارة وفعّل WPA2/WPA3", en: "Change the admin password and enable WPA2/WPA3" },
        { ar: "اختبر طبقةً طبقة: فيزيائي ← IP ← DNS ← التطبيق", en: "Test layer by layer: physical → IP → DNS → app" },
      ],
    },
  ],

  // ═══════════════ MODULE 02 · OSI model in depth ═══════════════
  l011: [
    {
      kind: "order",
      id: "w:l011:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "رتّب طبقات OSI من 1 إلى 7", en: "Order the OSI layers from 1 to 7" },
      instructions: {
        ar: "ابدأ من الطبقة الدنيا واصعد حتى العليا",
        en: "Start at the bottom layer and climb to the top",
      },
      items: [
        { ar: "الفيزيائي Physical", en: "Physical" },
        { ar: "وصل البيانات Data Link", en: "Data Link" },
        { ar: "الشبكة Network", en: "Network" },
        { ar: "النقل Transport", en: "Transport" },
        { ar: "الجلسة Session", en: "Session" },
        { ar: "العرض Presentation", en: "Presentation" },
        { ar: "التطبيق Application", en: "Application" },
      ],
    },
  ],
  l013: [
    {
      kind: "match",
      id: "w:l013:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "طابق مفاهيم الطبقتين 3 و4", en: "Match L3 & L4 concepts" },
      instructions: {
        ar: "اضغط المفهوم ثم ما يقابله",
        en: "Tap a concept, then its counterpart",
      },
      pairs: [
        {
          left: { ar: "طبقة الشبكة L3", en: "Network layer (L3)" },
          right: { ar: "الحزمة Packet بعنونة منطقية وأفضل جهد", en: "The Packet: logical addressing, best-effort" },
        },
        {
          left: { ar: "حقل TTL", en: "The TTL field" },
          right: { ar: "يُنقص عند كل راوتر لمنع الحلقات الأبدية", en: "Decremented per router to stop infinite loops" },
        },
        {
          left: { ar: "طبقة النقل L4", en: "Transport layer (L4)" },
          right: { ar: "المقطع Segment وتسليم منفذ إلى منفذ", en: "The Segment: process-to-process via ports" },
        },
        {
          left: { ar: "المنفذ 443", en: "Port 443" },
          right: { ar: "HTTPS", en: "HTTPS" },
        },
        {
          left: { ar: "المنفذ 53", en: "Port 53" },
          right: { ar: "DNS", en: "DNS" },
        },
      ],
    },
  ],
  l015: [
    {
      kind: "order",
      id: "w:l015:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "رتّب سلسلة التغليف و PDU", en: "Order the encapsulation PDU chain" },
      instructions: {
        ar: "اضغط الوحدات بالترتيب من بيانات التطبيق حتى الإشارات",
        en: "Tap the PDUs in order, from app data down to signals",
      },
      items: [
        { ar: "Data: بيانات التطبيق", en: "Data: application data" },
        { ar: "Segment: بيانات + ترويسة TCP", en: "Segment: data + TCP header" },
        { ar: "Packet: مقطع + ترويسة IP", en: "Packet: segment + IP header" },
        { ar: "Frame: حزمة + إيثرنت + FCS", en: "Frame: packet + Ethernet + FCS" },
        { ar: "Bits: إشارات على الوسيط", en: "Bits: signals on the medium" },
      ],
    },
    {
      kind: "match",
      id: "w:l015:2",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "طابق أحجام الترويسات", en: "Match the header sizes" },
      instructions: {
        ar: "اضغط الترويسة ثم حجمها الأساسي",
        en: "Tap a header, then its base size",
      },
      pairs: [
        {
          left: { ar: "ترويسة TCP", en: "TCP header" },
          right: { ar: "20 بايتًا", en: "20 bytes" },
        },
        {
          left: { ar: "ترويسة IPv4", en: "IPv4 header" },
          right: { ar: "20 بايتًا (حتى 60 مع الخيارات)", en: "20 bytes (up to 60 with options)" },
        },
        {
          left: { ar: "إيثرنت (ترويسة + FCS)", en: "Ethernet (header + FCS)" },
          right: { ar: "14 + 4 بايتات", en: "14 + 4 bytes" },
        },
        {
          left: { ar: "MTU القياسي", en: "Standard MTU" },
          right: { ar: "1500 بايت", en: "1500 bytes" },
        },
      ],
    },
  ],
  l016: [
    {
      kind: "order",
      id: "w:l016:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "رتّب فك التغليف عند الوصول", en: "Order the arrival decapsulation" },
      instructions: {
        ar: "اضغط الخطوات بالترتيب من استلام الإطار حتى التطبيق",
        en: "Tap the steps in order, from frame arrival up to the app",
      },
      items: [
        { ar: "‏L2: تُفحص FCS وتُرفع ترويسة MAC", en: "L2: FCS checked, MAC header stripped" },
        { ar: "‏L3: تُقرأ عناوين IP ويُنقص TTL", en: "L3: IP addresses read, TTL decremented" },
        { ar: "‏L4: حقل المنفذ يوجّه البيانات للعملية", en: "L4: the port field steers data to the process" },
        { ar: "تصل البيانات سليمة إلى التطبيق", en: "The data reaches the application intact" },
      ],
    },
  ],
  l017: [
    {
      kind: "match",
      id: "w:l017:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق طبقات OSI مع TCP/IP", en: "Map OSI layers onto TCP/IP" },
      instructions: {
        ar: "اضغط طبقات OSI ثم ما تقابلها في TCP/IP",
        en: "Tap OSI layers, then their TCP/IP equivalents",
      },
      pairs: [
        {
          left: { ar: "OSI 5-7 (جلسة/عرض/تطبيق)", en: "OSI 5-7 (session/presentation/app)" },
          right: { ar: "طبقة التطبيقات Application", en: "The Application layer" },
        },
        {
          left: { ar: "OSI 4 (النقل)", en: "OSI 4 (Transport)" },
          right: { ar: "طبقة النقل Transport", en: "The Transport layer" },
        },
        {
          left: { ar: "OSI 3 (الشبكة)", en: "OSI 3 (Network)" },
          right: { ar: "طبقة الإنترنت Internet", en: "The Internet layer" },
        },
        {
          left: { ar: "OSI 1-2 (فيزيائي/وصل)", en: "OSI 1-2 (physical/link)" },
          right: { ar: "طبقة الوصول Network Access", en: "The Network Access layer" },
        },
      ],
    },
  ],
  l018: [
    {
      kind: "classify",
      id: "w:l018:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف منهجية التشخيص", en: "Classify the troubleshooting method" },
      instructions: {
        ar: "اضغط الحالة ثم المنهجية الأنسب لها",
        en: "Tap a scenario, then its best methodology",
      },
      buckets: [
        { ar: "تصعيد من الأسفل Bottom-Up", en: "Bottom-up" },
        { ar: "من الأعلى Top-Down", en: "Top-down" },
        { ar: "اقسم واقهر Divide-and-Conquer", en: "Divide-and-conquer" },
      ],
      items: [
        { text: { ar: "مستخدم جديد لا يعمل له شيء إطلاقًا", en: "A brand-new user for whom nothing works at all" }, bucket: 0 },
        { text: { ar: "عطل غامض كامل بلا أي أدلة مسبقة", en: "A total mystery fault with zero prior clues" }, bucket: 0 },
        { text: { ar: "الاتصال سليم لكن التطبيق مريض", en: "Connectivity is fine but the app is sick" }, bucket: 1 },
        { text: { ar: "شكوى تطبيق مع بقاء الإنترنت يعمل", en: "An app complaint while the Internet still works" }, bucket: 1 },
        { text: { ar: "ping حاسم عند طبقة مرجّحة ثم تتبّع الأدلة", en: "A decisive ping at a probable layer, then follow evidence" }, bucket: 2 },
      ],
    },
  ],
  l020: [
    {
      kind: "order",
      id: "w:l020:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب رحلة فتح موقع https", en: "Order the journey of opening an https site" },
      instructions: {
        ar: "اضغط المراحل الأولى بالترتيب الزمني الصحيح",
        en: "Tap the opening steps in their true chronological order",
      },
      items: [
        { ar: "استعلام DNS يحوّل الاسم إلى عنوان IP", en: "DNS resolves the name to an IP address" },
        { ar: "مصافحة TCP الثلاثية", en: "The TCP three-way handshake" },
        { ar: "مصافحة TLS لتفاوض التشفير", en: "The TLS handshake negotiates encryption" },
        { ar: "إرسال طلب HTTP", en: "The HTTP request is sent" },
        { ar: "الاستجابة تعود وتُعرض على الشاشة", en: "The response returns and renders on screen" },
      ],
    },
  ],

  // ═══════════════ MODULE 03 · Transmission media ═══════════════
  l021: [
    {
      kind: "match",
      id: "w:l021:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق أعداء الإشارة", en: "Match the signal's enemies" },
      instructions: {
        ar: "اضغط المصطلح ثم ظاهرته",
        en: "Tap a term, then the phenomenon it names",
      },
      pairs: [
        {
          left: { ar: "التوهين Attenuation", en: "Attenuation" },
          right: { ar: "فقدان قوة الإشارة مع المسافة", en: "Signal loses strength with distance" },
        },
        {
          left: { ar: "الضجيج Noise", en: "Noise" },
          right: { ar: "تداخل خارجي يفسد الإشارة", en: "External interference corrupting the signal" },
        },
        {
          left: { ar: "التشابك Crosstalk", en: "Crosstalk" },
          right: { ar: "تسرّب من زوج مجاور داخل الكابل نفسه", en: "Leakage from a neighboring pair in the same cable" },
        },
        {
          left: { ar: "‏SNR", en: "SNR" },
          right: { ar: "فارق الإشارة عن الضجيج — حكم الجودة الحقيقي", en: "Signal minus noise — the real quality judge" },
        },
        {
          left: { ar: "المُخرَج Throughput", en: "Throughput" },
          right: { ar: "التدفق الفعلي المُقاس على الوصلة", en: "The actually measured flow on the link" },
        },
      ],
    },
  ],
  l022: [
    {
      kind: "fill",
      id: "w:l022:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "أكمل جدول فئات UTP", en: "Complete the UTP category table" },
      instructions: {
        ar: "اختر من البنك القيمة المناسبة لكل فراغ",
        en: "Pick from the bank to complete each blank",
      },
      template: {
        ar: "يوصل Cat6 سرعة 10G حتى ____ مترًا فقط، بينما ____ يوصلها لكامل 100 متر، ويبلغ Cat8 سرعة ____ جيجابت حتى 30 مترًا.",
        en: "Cat6 carries 10G for only ____ meters, while ____ carries it for the full 100 m, and Cat8 reaches ____ Gbps up to 30 m.",
      },
      blanks: [
        { answer: { ar: "55", en: "55" }, hint: { ar: "أقل من 100 بكثير", en: "Well under 100" } },
        { answer: { ar: "Cat6a", en: "Cat6a" }, hint: { ar: "الفئة المعمّرة الشاملة", en: "The full-distance category" } },
        { answer: { ar: "40", en: "40" }, hint: { ar: "قيمة قصوى قياسية", en: "A top-tier figure" } },
      ],
      bank: [
        { ar: "55", en: "55" },
        { ar: "Cat6a", en: "Cat6a" },
        { ar: "40", en: "40" },
        { ar: "100", en: "100" },
        { ar: "Cat5e", en: "Cat5e" },
      ],
    },
  ],
  l026: [
    {
      kind: "classify",
      id: "w:l026:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "صنّف خصائص الألياف", en: "Classify the fiber properties" },
      instructions: {
        ar: "اضغط الخاصية ثم نوع الليف الذي تنتمي إليه",
        en: "Tap a property, then the fiber type it belongs to",
      },
      buckets: [
        { ar: "أحادي النمط Single-Mode", en: "Single-mode" },
        { ar: "متعدد الأنماط Multimode", en: "Multimode" },
      ],
      items: [
        { text: { ar: "قلب بعرض 8-10 ميكرومتر", en: "An 8-10 µm core" }, bucket: 0 },
        { text: { ar: "قلب بعرض 50 أو 62.5 ميكرومتر", en: "A 50 or 62.5 µm core" }, bucket: 1 },
        { text: { ar: "تشتت نمطي يحد المدى بمئات الأمتار", en: "Modal dispersion caps reach at hundreds of meters" }, bucket: 1 },
        { text: { ar: "غلاف أصفر وOS2 بخسارة 0.4 dB/km", en: "Yellow jacket and OS2 at 0.4 dB/km" }, bucket: 0 },
        { text: { ar: "وحدات SR ومعايير OM3/OM4", en: "SR optics and the OM3/OM4 grades" }, bucket: 1 },
        { text: { ar: "وحدة LR تبلغ 10 كم", en: "An LR optic reaching 10 km" }, bucket: 0 },
      ],
    },
  ],
  l027: [
    {
      kind: "order",
      id: "w:l027:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "رتّب خط زمن الإيثرنت النحاسي", en: "Order the copper Ethernet timeline" },
      instructions: {
        ar: "اضغط المعايير من الأقدم إلى الأحدث",
        en: "Tap the standards from oldest to newest",
      },
      items: [
        { ar: "‏10BASE-T نحاس عام 1990", en: "10BASE-T copper, 1990" },
        { ar: "‏100BASE-TX عام 1995", en: "100BASE-TX, 1995" },
        { ar: "‏1000BASE-T جيجابت عام 1999", en: "1000BASE-T gigabit, 1999" },
        { ar: "‏10GBASE-T عام 2006", en: "10GBASE-T, 2006" },
        { ar: "‏40/100G عبر 802.3ba عام 2010", en: "40/100G via 802.3ba, 2010" },
      ],
    },
  ],
  l030: [
    {
      kind: "order",
      id: "w:l030:1",
      sectionIndex: 2,
      xp: 10,
      title: { ar: "رتّب ترتيب الاتهام عند CRC", en: "Order the CRC accusation sequence" },
      instructions: {
        ar: "عندما تتراكم أخطاء CRC على منفذ، اضغط المتهمين بالترتيب الصحيح",
        en: "When CRC errors pile up on a port, tap the suspects in the correct order",
      },
      items: [
        { ar: "كابل الباتش", en: "The patch cord" },
        { ar: "الموصل", en: "The connector" },
        { ar: "التمديد المسحوق في الجدار", en: "The crushed run in the wall" },
        { ar: "المنفذ نفسه", en: "The port itself" },
      ],
    },
  ],

  // ═══════════════ MODULE 04 · Ethernet & switching ═══════════════
  l031: [
    {
      kind: "match",
      id: "w:l031:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "طابق عناوين MAC الخاصة", en: "Match the special MAC addresses" },
      instructions: {
        ar: "اضغط العنوان أو البت ثم معناه",
        en: "Tap an address or bit, then its meaning",
      },
      pairs: [
        {
          left: { ar: "‏FF:FF:FF:FF:FF:FF", en: "FF:FF:FF:FF:FF:FF" },
          right: { ar: "بث عام يُغرق كل منافذ VLAN", en: "Broadcast, flooded to all VLAN ports" },
        },
        {
          left: { ar: "‏01:00:5E:xx:xx:xx", en: "01:00:5E:xx:xx:xx" },
          right: { ar: "بث متعدد لعناوين IPv4", en: "IPv4 multicast mapping" },
        },
        {
          left: { ar: "‏01:80:C2:xx:xx:xx", en: "01:80:C2:xx:xx:xx" },
          right: { ar: "رسائل بروتوكول STP", en: "STP protocol messages" },
        },
        {
          left: { ar: "بت I/G", en: "The I/G bit" },
          right: { ar: "يميز unicast عن multicast/broadcast", en: "Separates unicast from multicast/broadcast" },
        },
        {
          left: { ar: "بت U/L", en: "The U/L bit" },
          right: { ar: "مُدار محليًا — سر عناوين 02", en: "Locally administered — the secret of 02 addresses" },
        },
      ],
    },
    {
      kind: "binary",
      id: "w:l031:2",
      sectionIndex: 2,
      xp: 8,
      title: { ar: "تدريب ثنائي على ثمانيات MAC", en: "MAC octet binary drill" },
      instructions: {
        ar: "بدّل البتات الثمانية حتى تساوي العدد العشري",
        en: "Toggle the 8 bits until they equal the decimal value",
      },
      values: [10, 96, 224],
    },
  ],
  l032: [
    {
      kind: "order",
      id: "w:l032:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "رتّب حقول إطار الإيثرنت", en: "Order the Ethernet frame fields" },
      instructions: {
        ar: "الحقول الرسمية فقط — المقدمة وSFD خارج العدّ",
        en: "Official fields only — the preamble & SFD sit outside the count",
      },
      items: [
        { ar: "عنوان MAC للوجهة", en: "Destination MAC" },
        { ar: "عنوان MAC للمصدر", en: "Source MAC" },
        { ar: "حقل EtherType", en: "EtherType field" },
        { ar: "الحمولة Payload (مع حشو حتى 64)", en: "Payload (padded up to 64)" },
        { ar: "حقل FCS", en: "FCS field" },
      ],
    },
  ],
  l033: [
    {
      kind: "order",
      id: "w:l033:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب خطوات CSMA/CD", en: "Order the CSMA/CD algorithm" },
      instructions: {
        ar: "اضغط خطوات الخوارزمية بترتيب حدوثها",
        en: "Tap the algorithm's steps in the order they occur",
      },
      items: [
        { ar: "استمع إلى الوسيط قبل الإرسال", en: "Listen to the medium before transmitting" },
        { ar: "أرسل وراقب نفسك أثناء الإرسال", en: "Transmit while self-monitoring" },
        { ar: "اكتشف التصادم", en: "Detect the collision" },
        { ar: "أرسل إشارة Jam لإبلاغ الجميع", en: "Send the jam signal to announce it" },
        { ar: "انتظر مدة تراجع أُسّي", en: "Wait a binary exponential backoff" },
        { ar: "أعد المحاولة حتى 16 مرة", en: "Retry up to 16 attempts" },
      ],
    },
  ],
  l036: [
    {
      kind: "order",
      id: "w:l036:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "رتّب تهيئة منفذ وصول VLAN", en: "Order the VLAN access-port config" },
      instructions: {
        ar: "اضغط أوامر الإعداد بالترتيب الصحيح على IOS",
        en: "Tap the IOS configuration moves in the correct order",
      },
      items: [
        { ar: "إنشاء VLAN وتسميته (vlan 20 / name ...)", en: "Create & name the VLAN (vlan 20 / name …)" },
        { ar: "switchport mode access", en: "switchport mode access" },
        { ar: "switchport access vlan 20", en: "switchport access vlan 20" },
        { ar: "التحقق بـ show vlan brief", en: "Verify with show vlan brief" },
      ],
    },
  ],
  l037: [
    {
      kind: "fill",
      id: "w:l037:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل أرقام وسم 802.1Q", en: "Complete the 802.1Q tag numbers" },
      instructions: {
        ar: "اختر من البنك القيمة الصحيحة لكل فراغ",
        en: "Pick the correct value for each blank from the bank",
      },
      template: {
        ar: "يضيف وسم 802.1Q ____ بايتات بعد عنوان المصدر، ومعرّف VLAN عرضه ____ بتًا، أي ____ معرّفًا صالحًا، بينما القيمتان 0 و ____ محجوزتان.",
        en: "The 802.1Q tag adds ____ bytes after the source address, carries a ____-bit VLAN ID (= ____ usable IDs), while 0 and ____ are reserved.",
      },
      blanks: [
        { answer: { ar: "4", en: "4" }, hint: { ar: "حجم الوسم كاملًا", en: "The whole tag size" } },
        { answer: { ar: "12", en: "12" }, hint: { ar: "عرض معرّف VLAN", en: "VLAN ID width" } },
        { answer: { ar: "4094", en: "4094" }, hint: { ar: "اطرح المحجوز من 2¹²", en: "2¹² minus the reserved" } },
        { answer: { ar: "4095", en: "4095" } },
      ],
      bank: [
        { ar: "4", en: "4" },
        { ar: "12", en: "12" },
        { ar: "4094", en: "4094" },
        { ar: "4095", en: "4095" },
        { ar: "8", en: "8" },
        { ar: "16", en: "16" },
      ],
    },
  ],
  l039: [
    {
      kind: "order",
      id: "w:l039:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "رتّب حالات منفذ STP", en: "Order the STP port states" },
      instructions: {
        ar: "اضغط حالات المنفذ من البداية حتى المرور الكامل",
        en: "Tap the port states from start until full forwarding",
      },
      items: [
        { ar: "‏Blocking — المنفذ معتم منطقيًا", en: "Blocking — logically dark" },
        { ar: "‏Listening — يستمع للـBPDU فقط", en: "Listening — hears BPDUs only" },
        { ar: "‏Learning — يبني جدول MAC", en: "Learning — builds the MAC table" },
        { ar: "‏Forwarding — يمرر البيانات", en: "Forwarding — passes data" },
      ],
    },
    {
      kind: "match",
      id: "w:l039:2",
      sectionIndex: 4,
      xp: 12,
      title: { ar: "طابق أدوات تحصين STP", en: "Match the STP hardening tools" },
      instructions: {
        ar: "اضغط الميزة ثم الغرض منها",
        en: "Tap a feature, then its purpose",
      },
      pairs: [
        {
          left: { ar: "‏PortFast", en: "PortFast" },
          right: { ar: "منفذ حافة يمر فورًا دون انتظار STP", en: "Edge port forwards instantly without STP wait" },
        },
        {
          left: { ar: "‏BPDU Guard", en: "BPDU Guard" },
          right: { ar: "‏err-disable عند وصول BPDU إلى الحافة", en: "err-disable the edge port if a BPDU arrives" },
        },
        {
          left: { ar: "‏Root Guard", en: "Root Guard" },
          right: { ar: "يحمي جذر الشجرة من الخطف على المنفذ", en: "Protects the root from hijack on that port" },
        },
        {
          left: { ar: "‏Root Primary", en: "Root Primary" },
          right: { ar: "تخطيط الجذر يدويًا بأولوية منخفضة", en: "Planning the root manually with low priority" },
        },
      ],
    },
  ],
  l040: [
    {
      kind: "order",
      id: "w:l040:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب مسار طلب ARP", en: "Order the ARP request flow" },
      instructions: {
        ar: "اضغط خطوات ARP بالترتيب من أول الفحص حتى الإرسال",
        en: "Tap the ARP steps in order, from first lookup to delivery",
      },
      items: [
        { ar: "البحث عن الهدف في ذاكرة ARP", en: "Look the target up in the ARP cache" },
        { ar: "بث ARP Request إلى نطاق البث كله", en: "Broadcast the ARP request to the whole domain" },
        { ar: "الجهاز المطلوب يردّ unicast بعنوانه", en: "The target replies unicast with its MAC" },
        { ar: "تحديث جدول ARP بالزوج الجديد", en: "The ARP table updates with the new pair" },
        { ar: "إرسال الإطار مباشرة إلى MAC الهدف", en: "The frame goes straight to the target's MAC" },
      ],
    },
  ],

  // ═══════════════ MODULE 05 · IP addressing & subnetting ═══════════════
  l043: [
    {
      kind: "classify",
      id: "w:l043:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "صنّف العناوين حسب الفئة", en: "Classify addresses by class" },
      instructions: {
        ar: "اضغط العنوان أو المدى ثم فئته التاريخية",
        en: "Tap an address or range, then its historical class",
      },
      buckets: [
        { ar: "الفئة A (1-126, /8)", en: "Class A (1-126, /8)" },
        { ar: "الفئة B (128-191, /16)", en: "Class B (128-191, /16)" },
        { ar: "الفئة C (192-223, /24)", en: "Class C (192-223, /24)" },
        { ar: "الفئة D/E (224-255)", en: "Class D/E (224-255)" },
      ],
      items: [
        { text: { ar: "‏10.0.0.0/8 — النطاق الخاص الكبير", en: "10.0.0.0/8 — the big private block" }, bucket: 0 },
        { text: { ar: "‏172.16.0.0/12 — نطاق خاص للشبكات الوسطى", en: "172.16.0.0/12 — mid-size private block" }, bucket: 1 },
        { text: { ar: "‏169.254.100.20 — عنوان APIPA", en: "169.254.100.20 — an APIPA address" }, bucket: 1 },
        { text: { ar: "‏192.168.0.0/16 — نطاق المنازل والمكاتب", en: "192.168.0.0/16 — homes & small offices" }, bucket: 2 },
        { text: { ar: "‏224.0.0.5 — بث متعدد لـ OSPF", en: "224.0.0.5 — OSPF multicast" }, bucket: 3 },
        { text: { ar: "المدى 240-255 التجريبي", en: "The 240-255 experimental range" }, bucket: 3 },
      ],
    },
    {
      kind: "binary",
      id: "w:l043:2",
      sectionIndex: 0,
      xp: 8,
      title: { ar: "ثنائي ثمانيات IPv4", en: "IPv4 octet binary drill" },
      instructions: {
        ar: "حوّل العدد العشري إلى بتاته الثمانية",
        en: "Convert the decimal value into its 8 bits",
      },
      values: [192, 168, 10],
    },
  ],
  l044: [
    {
      kind: "binary",
      id: "w:l044:1",
      sectionIndex: 0,
      xp: 8,
      title: { ar: "ثنائي قيم القناع", en: "Mask octet binary drill" },
      instructions: {
        ar: "درّب نفسك على ثنائي قيم قناع الشبكة الشائعة",
        en: "Drill the binary of common mask octets",
      },
      values: [192, 224, 255],
    },
    {
      kind: "subnet",
      id: "w:l044:2",
      sectionIndex: 1,
      xp: 12,
      network: "192.168.10.0",
      hosts: 12,
      options: ["255.255.255.240", "255.255.255.224", "255.255.255.248", "255.255.255.192"],
      correct: 0,
      title: { ar: "اختر قناع 12 مضيفًا", en: "Pick the mask for 12 hosts" },
      instructions: {
        ar: "اختر أصغر قناع يستوعب 12 مضيفًا دون هدر",
        en: "Pick the smallest mask that fits 12 hosts without waste",
      },
      explain: {
        ar: "12 مضيفًا يحتاج 2⁴−2=14 عنوانًا صالحًا ← /28 (255.255.255.240) هو أصغر قناع يفي؛ /29 يعطي 6 فقط ولا يكفي، و/27 يفي لكن بهدر.",
        en: "12 hosts need 2⁴−2=14 usable addresses → /28 (255.255.255.240) is the smallest mask that fits; /29 gives only 6, while /27 fits but wastes.",
      },
    },
  ],
  l045: [
    {
      kind: "order",
      id: "w:l045:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "رتّب منهجية التقسيم الخمسية", en: "Order the 5-step subnetting method" },
      instructions: {
        ar: "اضغط خطوات المنهجية بترتيبها الصحيح",
        en: "Tap the method's steps in their correct order",
      },
      items: [
        { ar: "حدّد المتطلبات: عدد الشبكات والمضيفين", en: "Define requirements: subnets & hosts needed" },
        { ar: "احسب البتات: 2^s ≥ S و 2^h−2 ≥ H", en: "Compute bits: 2^s ≥ S and 2^h−2 ≥ H" },
        { ar: "استخرج القناع من عدد بتات المضيف", en: "Derive the mask from the host-bit count" },
        { ar: "احسب حجم الكتلة: 256 − قيمة القناع", en: "Compute block size: 256 − mask value" },
        { ar: "عدّد الكتل وحدد حدودها ومضيفيها", en: "Enumerate the blocks, their bounds and hosts" },
      ],
    },
    {
      kind: "subnet",
      id: "w:l045:2",
      sectionIndex: 2,
      xp: 12,
      network: "192.168.1.0",
      hosts: 100,
      options: ["255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.0"],
      correct: 0,
      title: { ar: "قناع لقسم من 100 مضيف", en: "A mask for a 100-host department" },
      instructions: {
        ar: "اختر أصغر قناع يستوعب 100 مضيف",
        en: "Pick the smallest mask that fits 100 hosts",
      },
      explain: {
        ar: "100 مضيف يحتاج 2⁷−2=126 ← /25 (255.255.255.128)؛ /26 يعطي 62 فقط لا يكفي، و/24 يفي لكنه يهدر نصف المساحة.",
        en: "100 hosts need 2⁷−2=126 → /25 (255.255.255.128); /26 gives only 62, while /24 fits but wastes half the space.",
      },
    },
  ],
  l046: [
    {
      kind: "subnet",
      id: "w:l046:1",
      sectionIndex: 2,
      xp: 12,
      network: "192.168.1.0",
      hosts: 60,
      options: ["255.255.255.192", "255.255.255.224", "255.255.255.128", "255.255.255.252"],
      correct: 0,
      title: { ar: "قناع VLSM لقسم 60 مضيفًا", en: "VLSM mask for 60 hosts" },
      instructions: {
        ar: "في تصميم VLSM، اختر القناع الأقل هدرًا لـ 60 مضيفًا",
        en: "In a VLSM design, pick the least-wasteful mask for 60 hosts",
      },
      explain: {
        ar: "60 مضيفًا يحتاج 2⁶−2=62 ← /26 (255.255.255.192) هو أصغر قناع يفي؛ /27 يعطي 30 فقط، و/25 يعمل لكنه يهدر 66 عنوانًا.",
        en: "60 hosts need 2⁶−2=62 → /26 (255.255.255.192) is the smallest fit; /27 gives only 30, and /25 works but wastes 66 addresses.",
      },
    },
  ],
  l048: [
    {
      kind: "fill",
      id: "w:l048:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "أكمل أمر PAT على IOS", en: "Complete the IOS PAT command" },
      instructions: {
        ar: "أكمل أوامر ترجمة العناوين الناقصة من البنك",
        en: "Complete the missing NAT translation keywords from the bank",
      },
      template: {
        ar: "R1(config)# ip nat ____ source list 1 interface s0/0/0 ____",
        en: "R1(config)# ip nat ____ source list 1 interface s0/0/0 ____",
      },
      blanks: [
        { answer: { ar: "inside", en: "inside" }, hint: { ar: "اتجاه الترجمة من الشبكة الداخلية", en: "The translation direction from the inside" } },
        { answer: { ar: "overload", en: "overload" }, hint: { ar: "الكلمة التي تفعّل PAT بالمنافذ", en: "The keyword enabling port-based PAT" } },
      ],
      bank: [
        { ar: "inside", en: "inside" },
        { ar: "overload", en: "overload" },
        { ar: "outside", en: "outside" },
        { ar: "static", en: "static" },
      ],
    },
  ],
  l049: [
    {
      kind: "classify",
      id: "w:l049:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف أنواع عناوين IPv6", en: "Classify IPv6 address types" },
      instructions: {
        ar: "اضغط العنوان أو الوصف ثم نوعه",
        en: "Tap an address or trait, then its type",
      },
      buckets: [
        { ar: "أحادي عام Global (2000::/3)", en: "Global unicast (2000::/3)" },
        { ar: "محلي الوصلة Link-local (fe80::/10)", en: "Link-local (fe80::/10)" },
        { ar: "محلي فريد Unique-local (fd00::/8)", en: "Unique-local (fd00::/8)" },
        { ar: "بث متعدد Multicast (ff00::/8)", en: "Multicast (ff00::/8)" },
      ],
      items: [
        { text: { ar: "‏2001:db8:cafe::1", en: "2001:db8:cafe::1" }, bucket: 0 },
        { text: { ar: "يتولد تلقائيًا على كل واجهة بمجرد تفعيل IPv6", en: "Auto-generated on every interface once IPv6 is enabled" }, bucket: 1 },
        { text: { ar: "‏fd02:4b6::5 — لا يُوجَّه على الإنترنت", en: "fd02:4b6::5 — never routed on the Internet" }, bucket: 2 },
        { text: { ar: "‏ff02::1 — كل العقد على الوصلة", en: "ff02::1 — all nodes on the link" }, bucket: 3 },
        { text: { ar: "يبنيه SLAAC من بادئة الراوتر المُعلنة", en: "Built by SLAAC from the router-announced prefix" }, bucket: 0 },
      ],
    },
  ],

  // ═══════════════ MODULE 06 · Routing ═══════════════
  l051: [
    {
      kind: "match",
      id: "w:l051:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق رموز مصادر المسارات", en: "Match the route source codes" },
      instructions: {
        ar: "اضغط الرمز ثم مصدر المسار الذي يدل عليه",
        en: "Tap a code, then the route source it indicates",
      },
      pairs: [
        {
          left: { ar: "‏C", en: "C" },
          right: { ar: "شبكة موصولة مباشرة (AD = 0)", en: "A directly connected network (AD = 0)" },
        },
        {
          left: { ar: "‏S", en: "S" },
          right: { ar: "مسار ثابت أضفته يدويًا (AD = 1)", en: "A manually added static route (AD = 1)" },
        },
        {
          left: { ar: "‏O", en: "O" },
          right: { ar: "مسار تعلمه OSPF (AD = 110)", en: "A route learned via OSPF (AD = 110)" },
        },
        {
          left: { ar: "‏D", en: "D" },
          right: { ar: "مسار تعلمه EIGRP (AD = 90)", en: "A route learned via EIGRP (AD = 90)" },
        },
        {
          left: { ar: "‏B", en: "B" },
          right: { ar: "مسار من BGP بين الأنظمة المستقلة", en: "A BGP route between autonomous systems" },
        },
      ],
    },
  ],
  l053: [
    {
      kind: "order",
      id: "w:l053:1",
      sectionIndex: 0,
      xp: 12,
      title: { ar: "رتّب قواعد حكم المسارات", en: "Order the route-selection verdict" },
      instructions: {
        ar: "عند وجود مسارات متعددة، اضغط قواعد الحكم بترتيب أولويتها",
        en: "With multiple routes, tap the verdict rules in priority order",
      },
      items: [
        { ar: "أطول بادئة مطابقة (LPM) أولًا", en: "Longest prefix match (LPM) first" },
        { ar: "المسافة الإدارية الأدنى (AD)", en: "Lower administrative distance (AD)" },
        { ar: "المقياس الأفضل (Metric)", en: "Better metric" },
        { ar: "موازنة الحمل عند التساوي التام", en: "Load balancing on a perfect tie" },
      ],
    },
  ],
  l054: [
    {
      kind: "classify",
      id: "w:l054:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف فلسفتي التوجيه", en: "Classify the two routing philosophies" },
      instructions: {
        ar: "اضغط الصفة ثم الفلسفة التي تنتمي إليها",
        en: "Tap a trait, then the philosophy it belongs to",
      },
      buckets: [
        { ar: "شعاع المسافة Distance Vector", en: "Distance vector" },
        { ar: "حالة الوصلة Link State", en: "Link state" },
      ],
      items: [
        { text: { ar: "يرسل جدول التوجيه كاملًا لجيرانه", en: "Sends its full routing table to neighbors" }, bucket: 0 },
        { text: { ar: "فيضان LSA وخريطة متطابقة عند الجميع", en: "LSA flooding and an identical map everywhere" }, bucket: 1 },
        { text: { ar: "خوارزمية Bellman-Ford", en: "The Bellman-Ford algorithm" }, bucket: 0 },
        { text: { ar: "خوارزمية Dijkstra للمسار الأقصر", en: "Dijkstra's shortest-path-first algorithm" }, bucket: 1 },
        { text: { ar: "‏RIP مثاله التاريخي", en: "RIP is its classic example" }, bucket: 0 },
        { text: { ar: "‏OSPF وIS-IS مثالاه", en: "OSPF and IS-IS are its examples" }, bucket: 1 },
      ],
    },
    {
      kind: "match",
      id: "w:l054:2",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "طابق البروتوكول ومقياسه", en: "Match protocol to metric" },
      instructions: {
        ar: "اضغط البروتوكول ثم المقياس الذي يقيس به جودة المسار",
        en: "Tap a protocol, then the metric it measures paths with",
      },
      pairs: [
        {
          left: { ar: "‏RIP", en: "RIP" },
          right: { ar: "عدد القفزات بحد أقصى 15", en: "Hop count capped at 15" },
        },
        {
          left: { ar: "‏OSPF", en: "OSPF" },
          right: { ar: "التكلفة = 10⁸ ÷ عرض النطاق", en: "Cost = 10⁸ ÷ bandwidth" },
        },
        {
          left: { ar: "‏EIGRP", en: "EIGRP" },
          right: { ar: "مقياس مركب من النطاق والتأخير", en: "A composite of bandwidth and delay" },
        },
        {
          left: { ar: "‏BGP", en: "BGP" },
          right: { ar: "سمات سياسة ومسار الأنظمة المستقلة", en: "Policy attributes and the AS_PATH" },
        },
      ],
    },
  ],
  l055: [
    {
      kind: "fill",
      id: "w:l055:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "أكمل مؤقتات RIP", en: "Complete the RIP timers" },
      instructions: {
        ar: "أكمل قيم المؤقتات بالثواني من البنك",
        en: "Complete the timer values in seconds from the bank",
      },
      template: {
        ar: "يرسل RIP جدوله كل ____ ثانية، ويُعلن المسار غير صالح بعد ____ ثانية، ويحذفه نهائيًا بعد ____ ثانية.",
        en: "RIP sends its table every ____ seconds, invalidates a route after ____ seconds, and flushes it after ____ seconds.",
      },
      blanks: [
        { answer: { ar: "30", en: "30" }, hint: { ar: "إيقاع التحديث الدوري", en: "The periodic update rhythm" } },
        { answer: { ar: "180", en: "180" }, hint: { ar: "مؤقت invalid", en: "The invalid timer" } },
        { answer: { ar: "240", en: "240" }, hint: { ar: "مؤقت flush", en: "The flush timer" } },
      ],
      bank: [
        { ar: "30", en: "30" },
        { ar: "180", en: "180" },
        { ar: "240", en: "240" },
        { ar: "60", en: "60" },
        { ar: "120", en: "120" },
      ],
    },
  ],
  l056: [
    {
      kind: "order",
      id: "w:l056:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "رتّب حالات تجاور OSPF", en: "Order the OSPF adjacency states" },
      instructions: {
        ar: "اضغط الحالات من بداية التعارف حتى الامتلاء الكامل",
        en: "Tap the states from first hello to full adjacency",
      },
      items: [
        { ar: "‏Init — وصلني Hello منك", en: "Init — I received your Hello" },
        { ar: "‏2-Way — تبادل Hello متبادل", en: "2-Way — mutual Hello exchange" },
        { ar: "‏ExStart — اتفاق الرئاسة والترتيب", en: "ExStart — master/slave negotiation" },
        { ar: "‏Exchange — تبادل رؤوس قواعد البيانات", en: "Exchange — swapping DB headers" },
        { ar: "‏Loading — طلب LSAs الناقصة", en: "Loading — requesting missing LSAs" },
        { ar: "‏Full — قواعد متطابقة وجوار كامل", en: "Full — identical LSDBs, full adjacency" },
      ],
    },
  ],
  l057: [
    {
      kind: "fill",
      id: "w:l057:1",
      sectionIndex: 0,
      xp: 12,
      title: { ar: "أكمل تهيئة OSPF", en: "Complete the OSPF configuration" },
      instructions: {
        ar: "أكمل الكلمات الناقصة في أوامر OSPF",
        en: "Complete the missing keywords in the OSPF commands",
      },
      template: {
        ar: "router ____ 1 ثم network 192.168.1.0 0.0.0.255 ____ 0 ثم التحقق بـ show ip ospf ____",
        en: "router ____ 1, then network 192.168.1.0 0.0.0.255 ____ 0, then verify with show ip ospf ____",
      },
      blanks: [
        { answer: { ar: "ospf", en: "ospf" }, hint: { ar: "اسم البروتوكول", en: "The protocol's name" } },
        { answer: { ar: "area", en: "area" }, hint: { ar: "المنطقة — 0 للجذر", en: "The area — 0 for the backbone" } },
        { answer: { ar: "neighbor", en: "neighbor" }, hint: { ar: "أول أداة تحقق: الجيران", en: "First verify tool: the neighbors" } },
      ],
      bank: [
        { ar: "ospf", en: "ospf" },
        { ar: "area", en: "area" },
        { ar: "neighbor", en: "neighbor" },
        { ar: "interface", en: "interface" },
        { ar: "database", en: "database" },
      ],
    },
  ],

  // ═══════════════ MODULE 07 · Transport layer ═══════════════
  l061: [
    {
      kind: "classify",
      id: "w:l061:1",
      sectionIndex: 4,
      xp: 12,
      title: { ar: "صنّف سمات TCP و UDP", en: "Classify TCP vs UDP traits" },
      instructions: {
        ar: "اضغط السمة ثم البروتوكول الذي تنتمي إليه",
        en: "Tap a trait, then the protocol it belongs to",
      },
      buckets: [
        { ar: "‏TCP — موثوق ومتصل", en: "TCP — reliable, connection-oriented" },
        { ar: "‏UDP — سريع ومجرد", en: "UDP — fast and bare" },
      ],
      items: [
        { text: { ar: "مصافحة ثلاثية وضمان تسليم", en: "Three-way handshake with delivery guarantee" }, bucket: 0 },
        { text: { ar: "ترويسة من 8 بايتات فقط", en: "A header of just 8 bytes" }, bucket: 1 },
        { text: { ar: "نافذة منزلقة وضبط تدفق", en: "Sliding window and flow control" }, bucket: 0 },
        { text: { ar: "خيار البث المتعدد والألعاب الحية", en: "The choice for multicast and live gaming" }, bucket: 1 },
        { text: { ar: "‏DNS وDHCP وVoIP من مستخدميه الشائعين", en: "DNS, DHCP and VoIP among its common users" }, bucket: 1 },
        { text: { ar: "إعادة إرسال تلقائية عند الفقد", en: "Automatic retransmission on loss" }, bucket: 0 },
      ],
    },
  ],
  l062: [
    {
      kind: "match",
      id: "w:l062:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "طابق أعلام TCP", en: "Match the TCP flags" },
      instructions: {
        ar: "اضغط العلم ثم وظيفته",
        en: "Tap a flag, then its function",
      },
      pairs: [
        {
          left: { ar: "‏SYN", en: "SYN" },
          right: { ar: "افتتاح الاتصال والتفاوض على الخيارات", en: "Opens the connection and negotiates options" },
        },
        {
          left: { ar: "‏ACK", en: "ACK" },
          right: { ar: "يؤكد استلام البايتات ويجعل رقم الإقرار صالحًا", en: "Confirms received bytes; makes the ack number valid" },
        },
        {
          left: { ar: "‏FIN", en: "FIN" },
          right: { ar: "إنهاء مهذب لاتجاه الإرسال الواحد", en: "Polite close of one send direction" },
        },
        {
          left: { ar: "‏RST", en: "RST" },
          right: { ar: "قطع فوري غير مهذب — منفذ مغلق أو رفض", en: "Impolite immediate abort — closed port or refusal" },
        },
        {
          left: { ar: "‏PSH", en: "PSH" },
          right: { ar: "ادفع البيانات إلى التطبيق فورًا", en: "Push the data up to the app immediately" },
        },
      ],
    },
  ],
  l064: [
    {
      kind: "order",
      id: "w:l064:1",
      sectionIndex: 1,
      xp: 8,
      title: { ar: "رتّب المصافحة الثلاثية", en: "Order the three-way handshake" },
      instructions: {
        ar: "اضغط الرسائل الثلاث بترتيبها الزمني",
        en: "Tap the three messages in chronological order",
      },
      items: [
        { ar: "‏SYN من العميل برقم تسلسل ابتدائي", en: "SYN from the client with its initial sequence number" },
        { ar: "‏SYN-ACK من الخادم برقم مضاد", en: "SYN-ACK from the server with a matching ack" },
        { ar: "‏ACK من العميل — ثم تبدأ البيانات", en: "ACK from the client — then data may flow" },
      ],
    },
    {
      kind: "order",
      id: "w:l064:2",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "رتّب إنهاء الاتصال الرباعي", en: "Order the four-way teardown" },
      instructions: {
        ar: "اضغط خطوات الإغلاق المهذب بترتيبها",
        en: "Tap the polite-close steps in order",
      },
      items: [
        { ar: "‏FIN من المُبادر بالإغلاق", en: "FIN from the closing initiator" },
        { ar: "‏ACK من الطرف الآخر", en: "ACK from the other side" },
        { ar: "‏FIN من الطرف الآخر بدوره", en: "FIN from the other side in turn" },
        { ar: "‏ACK أخير ثم TIME_WAIT لمدة 2×MSL", en: "Final ACK, then TIME_WAIT for 2×MSL" },
      ],
    },
  ],
  l065: [
    {
      kind: "fill",
      id: "w:l065:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل حساب أرقام التسلسل", en: "Complete the sequence-number math" },
      instructions: {
        ar: "أرقام التسلسل تعدّ البايتات لا الحزم — أكمل النتيجتين",
        en: "Sequence numbers count bytes, not packets — complete both results",
      },
      template: {
        ar: "أرسل المرسل قطعة seq=2000 بحمولة 1000 بايت ثم قطعة seq=____ بحمولة 500 بايت؛ بعد استلام الاثنتين يردّ المستقبل ACK=____.",
        en: "The sender sent seq=2000 with 1000 bytes, then seq=____ with 500 bytes; after receiving both, the receiver replies ACK=____.",
      },
      blanks: [
        { answer: { ar: "3000", en: "3000" }, hint: { ar: "‏seq + طول الحمولة", en: "seq + payload length" } },
        { answer: { ar: "3500", en: "3500" }, hint: { ar: "أول بايت يتوقعه المستقبل بعد الاثنتين", en: "The first byte the receiver expects after both" } },
      ],
      bank: [
        { ar: "3000", en: "3000" },
        { ar: "3500", en: "3500" },
        { ar: "2500", en: "2500" },
        { ar: "1500", en: "1500" },
      ],
    },
  ],
  l067: [
    {
      kind: "classify",
      id: "w:l067:1",
      sectionIndex: 3,
      xp: 10,
      title: { ar: "صنّف سلوك نافذة الازدحام", en: "Classify cwnd behaviors" },
      instructions: {
        ar: "اضغط السلوك ثم سياقه: نمو طبيعي أم استجابة للفقد",
        en: "Tap a behavior, then its context: normal growth or loss reaction",
      },
      buckets: [
        { ar: "نمو cwnd الطبيعي", en: "Normal cwnd growth" },
        { ar: "استجابة عند الفقد", en: "Reaction to loss" },
      ],
      items: [
        { text: { ar: "مضاعفة cwnd كل RTT حتى ssthresh", en: "cwnd doubles each RTT up to ssthresh" }, bucket: 0 },
        { text: { ar: "نمو خطي ‎+1 MSS لكل RTT (AIMD)", en: "Linear +1 MSS per RTT (AIMD)" }, bucket: 0 },
        { text: { ar: "ثلاثة ACK مكررة تطلق الإرسال السريع", en: "Three duplicate ACKs trigger fast retransmit" }, bucket: 1 },
        { text: { ar: "انتهاء RTO يُنهار النافذة إلى MSS واحد", en: "RTO expiry collapses the window to 1 MSS" }, bucket: 1 },
      ],
    },
  ],
  l068: [
    {
      kind: "match",
      id: "w:l068:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "طابق المنافذ الشهيرة", en: "Match the famous ports" },
      instructions: {
        ar: "اضغط المنفذ ثم خدمته",
        en: "Tap a port, then its service",
      },
      pairs: [
        {
          left: { ar: "‏22", en: "22" },
          right: { ar: "‏SSH", en: "SSH" },
        },
        {
          left: { ar: "‏53", en: "53" },
          right: { ar: "‏DNS", en: "DNS" },
        },
        {
          left: { ar: "‏80", en: "80" },
          right: { ar: "‏HTTP", en: "HTTP" },
        },
        {
          left: { ar: "‏443", en: "443" },
          right: { ar: "‏HTTPS", en: "HTTPS" },
        },
        {
          left: { ar: "‏25", en: "25" },
          right: { ar: "‏SMTP", en: "SMTP" },
        },
        {
          left: { ar: "‏123", en: "123" },
          right: { ar: "‏NTP", en: "NTP" },
        },
      ],
    },
  ],

  // ═══════════════ MODULE 08 · Application services ═══════════════
  l071: [
    {
      kind: "order",
      id: "w:l071:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "رتّب رحلة استعلام DNS", en: "Order the DNS query journey" },
      instructions: {
        ar: "اضغط المحطات بترتيبها من الجهاز حتى الإجابة الموثوقة",
        en: "Tap the stations in order, from your device to the authoritative answer",
      },
      items: [
        { ar: "فحص ذاكرة المتصفح والنظام", en: "Check browser & OS caches" },
        { ar: "الاستعلام من المحلّل العودي (ISP)", en: "Ask the recursive resolver (ISP)" },
        { ar: "المحلّل يسأل خادم الجذر", en: "The resolver asks a root server" },
        { ar: "إحالة إلى خادم TLD للمجال", en: "A referral to the TLD server" },
        { ar: "الإجابة من الخادم الموثوق للمجال", en: "The answer from the domain's authoritative server" },
        { ar: "تُخزَّن الإجابة مؤقتًا وفق TTL", en: "The answer is cached for its TTL" },
      ],
    },
  ],
  l072: [
    {
      kind: "match",
      id: "w:l072:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "طابق سجلات DNS", en: "Match the DNS records" },
      instructions: {
        ar: "اضغط نوع السجل ثم غرضه",
        en: "Tap a record type, then its purpose",
      },
      pairs: [
        {
          left: { ar: "‏A", en: "A" },
          right: { ar: "عنوان IPv4 للمضيف", en: "The host's IPv4 address" },
        },
        {
          left: { ar: "‏AAAA", en: "AAAA" },
          right: { ar: "عنوان IPv6 للمضيف", en: "The host's IPv6 address" },
        },
        {
          left: { ar: "‏CNAME", en: "CNAME" },
          right: { ar: "اسم بديل يشير إلى اسم آخر — وليس في القمة", en: "An alias to another name — never at the apex" },
        },
        {
          left: { ar: "‏MX", en: "MX" },
          right: { ar: "خوادم البريد — الرقم الأصغر يُجرَّب أولًا", en: "Mail servers — the lowest number is tried first" },
        },
        {
          left: { ar: "‏TXT", en: "TXT" },
          right: { ar: "نصوص اليوم: SPF وDKIM وDMARC", en: "Today's SPF, DKIM and DMARC carrier" },
        },
        {
          left: { ar: "‏PTR", en: "PTR" },
          right: { ar: "عكسي: من عنوان IP إلى الاسم", en: "Reverse: from IP address back to a name" },
        },
      ],
    },
  ],
  l073: [
    {
      kind: "classify",
      id: "w:l073:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف أكواد حالة HTTP", en: "Classify HTTP status codes" },
      instructions: {
        ar: "اضغط الكود ثم عائلته",
        en: "Tap a code, then its family",
      },
      buckets: [
        { ar: "‏2xx نجاح", en: "2xx success" },
        { ar: "‏3xx إعادة توجيه", en: "3xx redirection" },
        { ar: "‏4xx خطأ العميل", en: "4xx client error" },
        { ar: "‏5xx خطأ الخادم", en: "5xx server error" },
      ],
      items: [
        { text: { ar: "‏200 OK", en: "200 OK" }, bucket: 0 },
        { text: { ar: "‏301 — انتقل نهائيًا", en: "301 — moved permanently" }, bucket: 1 },
        { text: { ar: "‏304 Not Modified", en: "304 Not Modified" }, bucket: 1 },
        { text: { ar: "‏404 Not Found", en: "404 Not Found" }, bucket: 2 },
        { text: { ar: "‏429 طلبات كثيرة جدًا", en: "429 Too Many Requests" }, bucket: 2 },
        { text: { ar: "‏502 من البوابة — الخلفية فشلت", en: "502 from the gateway — the backend failed" }, bucket: 3 },
        { text: { ar: "‏504 انتهت مهلة البوابة", en: "504 Gateway Timeout" }, bucket: 3 },
      ],
    },
  ],
  l074: [
    {
      kind: "order",
      id: "w:l074:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "رتّب مصافحة TLS 1.2", en: "Order the TLS 1.2 handshake" },
      instructions: {
        ar: "اضغط خطوات المصافحة بترتيبها الصحيح",
        en: "Tap the handshake steps in their correct order",
      },
      items: [
        { ar: "‏ClientHello مع الخوارزميات المقترحة", en: "ClientHello with the proposed cipher suites" },
        { ar: "‏ServerHello + الشهادة والسلسلة", en: "ServerHello + the certificate chain" },
        { ar: "تبادل المفاتيح (ECDHE) لاشتقاق المفتاح", en: "Key exchange (ECDHE) to derive the session key" },
        { ar: "‏Change Cipher Spec — التحول للتشفير", en: "Change Cipher Spec — switching to encryption" },
        { ar: "‏Finished — يبدأ البيانات المشفرة", en: "Finished — encrypted data begins" },
      ],
    },
  ],
  l077: [
    {
      kind: "order",
      id: "w:l077:1",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "رتّب مراحل DORA", en: "Order the DORA phases" },
      instructions: {
        ar: "اضغط رسائل DHCP الأربع بترتيبها",
        en: "Tap the four DHCP messages in order",
      },
      items: [
        { ar: "‏Discover — العميل يبحث بالبث", en: "Discover — the client broadcasts a search" },
        { ar: "‏Offer — الخادم يعرض عنوانًا", en: "Offer — a server proposes an address" },
        { ar: "‏Request — العميل يطلب العرض بالبث", en: "Request — the client claims the offer (broadcast)" },
        { ar: "‏ACK — الخادم يؤكد الإيجار", en: "ACK — the server confirms the lease" },
      ],
    },
    {
      kind: "fill",
      id: "w:l077:2",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل أرقام DHCP", en: "Complete the DHCP numbers" },
      instructions: {
        ar: "أكمل المنافذ ونسبة التجديد من البنك",
        en: "Complete the ports and renewal ratio from the bank",
      },
      template: {
        ar: "يعمل DHCP عبر UDP: المنفذ ____ للخادم و____ للعميل، ويتجدد الإيجار عند T1 = ____% من مدته.",
        en: "DHCP runs over UDP: port ____ for the server and ____ for the client, and a lease renews at T1 = ____% of its life.",
      },
      blanks: [
        { answer: { ar: "67", en: "67" }, hint: { ar: "منفذ الخادم", en: "The server's port" } },
        { answer: { ar: "68", en: "68" }, hint: { ar: "منفذ العميل", en: "The client's port" } },
        { answer: { ar: "50", en: "50" }, hint: { ar: "منتصف عمر الإيجار تقريبًا", en: "Roughly half the lease's life" } },
      ],
      bank: [
        { ar: "67", en: "67" },
        { ar: "68", en: "68" },
        { ar: "50", en: "50" },
        { ar: "53", en: "53" },
        { ar: "87.5", en: "87.5" },
      ],
    },
  ],
  l078: [
    {
      kind: "classify",
      id: "w:l078:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "صنّف بروتوكولات الإدارة: آمن أم لا", en: "Classify mgmt protocols: secure or not" },
      instructions: {
        ar: "اضغط البروتوكول ثم تصنيفه الأمني",
        en: "Tap a protocol, then its security classification",
      },
      buckets: [
        { ar: "قناة مشفرة/آمنة", en: "Encrypted / secure channel" },
        { ar: "نص واضح أو بلا مصادقة", en: "Cleartext or unauthenticated" },
      ],
      items: [
        { text: { ar: "‏SSH على المنفذ 22", en: "SSH on port 22" }, bucket: 0 },
        { text: { ar: "‏Telnet على المنفذ 23", en: "Telnet on port 23" }, bucket: 1 },
        { text: { ar: "‏FTP بوضعه النشط", en: "FTP in active mode" }, bucket: 1 },
        { text: { ar: "‏SFTP فوق SSH", en: "SFTP over SSH" }, bucket: 0 },
        { text: { ar: "‏TFTP على UDP 69 بلا مصادقة", en: "TFTP on UDP 69 with no authentication" }, bucket: 1 },
        { text: { ar: "‏FTPS — FTP فوق TLS", en: "FTPS — FTP over TLS" }, bucket: 0 },
      ],
    },
  ],

  // ═══════════════ MODULE 09 · Network security ═══════════════
  l081: [
    {
      kind: "classify",
      id: "w:l081:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "صنّف التهديد على ثالوث CIA", en: "Classify threats against the CIA triad" },
      instructions: {
        ar: "اضغط التهديد ثم الخاصية التي يكسرها",
        en: "Tap a threat, then the property it breaks",
      },
      buckets: [
        { ar: "السرية Confidentiality", en: "Confidentiality" },
        { ar: "السلامة Integrity", en: "Integrity" },
        { ar: "التوافر Availability", en: "Availability" },
      ],
      items: [
        { text: { ar: "تسريب قاعدة بيانات العملاء", en: "A customer database leak" }, bucket: 0 },
        { text: { ar: "تعديل مبلغ حوالة أثناء النقل", en: "Altering a wire transfer in transit" }, bucket: 1 },
        { text: { ar: "هجوم DDoS يوقف الخدمة", en: "A DDoS attack stopping the service" }, bucket: 2 },
        { text: { ar: "تنصت على محادثات سرية", en: "Eavesdropping on confidential calls" }, bucket: 0 },
        { text: { ar: "تخريب سجلات المخزون", en: "Tampering with inventory records" }, bucket: 1 },
        { text: { ar: "تدمير خوادم مركز البيانات", en: "Destroying datacenter servers" }, bucket: 2 },
      ],
    },
  ],
  l082: [
    {
      kind: "classify",
      id: "w:l082:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف الجدار الناري: ذو حالة أم لا", en: "Classify the firewall: stateful or not" },
      instructions: {
        ar: "اضغط السلوك ثم نوع الجدار الذي يصفه",
        en: "Tap a behavior, then the firewall type it describes",
      },
      buckets: [
        { ar: "عديم الحالة Stateless", en: "Stateless" },
        { ar: "ذي حالة Stateful", en: "Stateful" },
      ],
      items: [
        { text: { ar: "يفحص كل حزمة بمعزل عن سابقاتها", en: "Inspects each packet in isolation" }, bucket: 0 },
        { text: { ar: "يتذكر الجلسة ويسمح بالردود تلقائيًا", en: "Remembers the session; replies allowed automatically" }, bucket: 1 },
        { text: { ar: "سريع لكنه يفتح ثقوبًا بقواعد الإرجاع", en: "Fast but opens holes with return rules" }, bucket: 0 },
        { text: { ar: "يُسقط ACK خارجيًا لا جلسة مقابلة له", en: "Drops an outside ACK with no matching session" }, bucket: 1 },
      ],
    },
  ],
  l085: [
    {
      kind: "match",
      id: "w:l085:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "طابق أجيال أمن Wi-Fi", en: "Match the Wi-Fi security generations" },
      instructions: {
        ar: "اضغط الجيل أو الميزة ثم وصفها الأمني",
        en: "Tap a generation or feature, then its security story",
      },
      pairs: [
        {
          left: { ar: "‏WEP", en: "WEP" },
          right: { ar: "‏IV بعرض 24 بت ومفتاح ثابت — مكسور نهائيًا", en: "A 24-bit IV and a static key — fully broken" },
        },
        {
          left: { ar: "‏WPA2-PSK", en: "WPA2-PSK" },
          right: { ar: "هجوم قاموس دون اتصال على مصافحة الخطوات الأربع", en: "Offline dictionary attack on the 4-way handshake" },
        },
        {
          left: { ar: "‏WPA3-SAE", en: "WPA3-SAE" },
          right: { ar: "تخمين متصل فقط + سرية أمامية", en: "Online-only guessing plus forward secrecy" },
        },
        {
          left: { ar: "‏PMF إلزامي", en: "Mandatory PMF" },
          right: { ar: "يحمي إطارات الإدارة من التزوير (deauth)", en: "Signs management frames against forged deauths" },
        },
      ],
    },
  ],
  l086: [
    {
      kind: "match",
      id: "w:l086:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "طابق RADIUS و TACACS+", en: "Match RADIUS vs TACACS+" },
      instructions: {
        ar: "اضغط الخصيصة ثم البروتوكول صاحبها",
        en: "Tap a trait, then the protocol that owns it",
      },
      pairs: [
        {
          left: { ar: "‏UDP 1812/1813", en: "UDP 1812/1813" },
          right: { ar: "‏RADIUS", en: "RADIUS" },
        },
        {
          left: { ar: "‏TCP 49", en: "TCP 49" },
          right: { ar: "‏TACACS+", en: "TACACS+" },
        },
        {
          left: { ar: "يشفر كلمة المرور فقط ويرحّل EAP", en: "Encrypts only the password and relays EAP" },
          right: { ar: "‏RADIUS — ملك 802.1X", en: "RADIUS — the 802.1X king" },
        },
        {
          left: { ar: "يشفر الجسم كاملًا ويجيز كل أمر على حدة", en: "Encrypts the whole body and authorizes each command" },
          right: { ar: "‏TACACS+ — حكّام مدراء الأجهزة", en: "TACACS+ — the device admins' referee" },
        },
      ],
    },
  ],
  l088: [
    {
      kind: "classify",
      id: "w:l088:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "صنّف فئات هجمات DDoS", en: "Classify DDoS attack families" },
      instructions: {
        ar: "اضغط الهجوم ثم فئته",
        en: "Tap an attack, then its family",
      },
      buckets: [
        { ar: "حجمي Volumetric", en: "Volumetric" },
        { ar: "بروتوكول Protocol", en: "Protocol" },
        { ar: "تطبيقي Application", en: "Application" },
      ],
      items: [
        { text: { ar: "تضخيم Memcached بفيضان UDP هائل", en: "Memcached amplification with a massive UDP flood" }, bucket: 0 },
        { text: { ar: "‏SYN flood يستنزف جدول الاتصالات", en: "A SYN flood exhausting the connection table" }, bucket: 1 },
        { text: { ar: "‏HTTP flood من شبكة بوت", en: "An HTTP flood from a botnet" }, bucket: 2 },
        { text: { ar: "‏Slowloris باتصالات نصف مفتوحة بطيئة", en: "Slowloris with slow half-open connections" }, bucket: 2 },
        { text: { ar: "تضخيم DNS/NTP — طلب صغير وردّ ضخم", en: "DNS/NTP amplification — small ask, huge reply" }, bucket: 0 },
      ],
    },
    {
      kind: "match",
      id: "w:l088:2",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "طابق دفاعات التوافر", en: "Match the availability defenses" },
      instructions: {
        ar: "اضغط الدفاع ثم الغرض منه",
        en: "Tap a defense, then its purpose",
      },
      pairs: [
        {
          left: { ar: "‏SYN cookies", en: "SYN cookies" },
          right: { ar: "امتصاص فيضان SYN دون استنزاف الجدول", en: "Absorb SYN floods without draining the table" },
        },
        {
          left: { ar: "‏uRPF", en: "uRPF" },
          right: { ar: "إسقاط حزم المصادر المنتحلة", en: "Drop packets with spoofed sources" },
        },
        {
          left: { ar: "‏CoPP", en: "CoPP" },
          right: { ar: "حماية مستوى التحكم — معالج الجهاز نفسه", en: "Protect the control plane — the box's own CPU" },
        },
        {
          left: { ar: "‏RTBH", en: "RTBH" },
          right: { ar: "التضحية بالهدف (null0) لإنقاذ الشبكة", en: "Sacrifice the target (null0) to save the network" },
        },
        {
          left: { ar: "مركز تنقية Scrubbing", en: "Scrubbing center" },
          right: { ar: "خدمة خارجية تمتص الفيضان وتنقّي الحركة", en: "An external service that absorbs and filters the flood" },
        },
      ],
    },
  ],
  l090: [
    {
      kind: "match",
      id: "w:l090:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "طابق مكونات الثقة الصفرية", en: "Match the Zero Trust components" },
      instructions: {
        ar: "اضغط المكون ثم دوره في نموذج NIST 800-207",
        en: "Tap a component, then its role in the NIST 800-207 model",
      },
      pairs: [
        {
          left: { ar: "محرك السياسة Policy Engine", en: "Policy Engine" },
          right: { ar: "يتخذ قرار السماح أو المنع", en: "Makes the allow/deny decision" },
        },
        {
          left: { ar: "مسؤول السياسة Administrator", en: "Policy Administrator" },
          right: { ar: "ينفّذ القرار بإقامة الجلسة وبطاقاتها", en: "Executes the decision by setting up the session" },
        },
        {
          left: { ar: "نقطة الإنفاذ PEP", en: "PEP" },
          right: { ar: "البوابة التي لا يعبرها شيء إلا عبرها", en: "The gate nothing passes except through it" },
        },
        {
          left: { ar: "‏MFA / IdP", en: "MFA / IdP" },
          right: { ar: "ركيزة الهوية والتحقق المستمر", en: "The identity pillar with continuous verification" },
        },
      ],
    },
  ],

  // ═══════════════ MODULE 10 · Wireless & modern networking ═══════════════
  l091: [
    {
      kind: "fill",
      id: "w:l091:1",
      sectionIndex: 1,
      xp: 12,
      title: { ar: "أكمل أرقام 2.4 GHz", en: "Complete the 2.4 GHz numbers" },
      instructions: {
        ar: "أكمل القنوات غير المتداخلة وهدف الإشارة من البنك",
        en: "Complete the non-overlapping channels and signal target from the bank",
      },
      template: {
        ar: "قنوات 2.4GHz غير المتداخلة هي 1 و____ و____ فقط، والهدف الاحترافي عند التجوال إشارة ____ dBm مع SNR ≥ 25dB.",
        en: "The non-overlapping 2.4GHz channels are 1, ____ and ____ only, and the professional roaming target is ____ dBm with SNR ≥ 25dB.",
      },
      blanks: [
        { answer: { ar: "6", en: "6" }, hint: { ar: "القناة الوسطى", en: "The middle channel" } },
        { answer: { ar: "11", en: "11" }, hint: { ar: "أعلى القنوات الثلاث", en: "The highest of the three" } },
        { answer: { ar: "-67", en: "-67" }, hint: { ar: "قيمة سالبة قريبة من -65", en: "A negative value near -65" } },
      ],
      bank: [
        { ar: "6", en: "6" },
        { ar: "11", en: "11" },
        { ar: "-67", en: "-67" },
        { ar: "3", en: "3" },
        { ar: "-70", en: "-70" },
      ],
    },
  ],
  l092: [
    {
      kind: "match",
      id: "w:l092:1",
      sectionIndex: 5,
      xp: 12,
      title: { ar: "طابق أجيال Wi-Fi", en: "Match the Wi-Fi generations" },
      instructions: {
        ar: "اضغط الجيل ثم معياره وتقنيته المميزة",
        en: "Tap a generation, then its standard and signature tech",
      },
      pairs: [
        {
          left: { ar: "‏WiFi 4", en: "WiFi 4" },
          right: { ar: "‏802.11n — عصر الـMIMO وربط 40MHz", en: "802.11n — the MIMO era and 40MHz bonding" },
        },
        {
          left: { ar: "‏WiFi 5", en: "WiFi 5" },
          right: { ar: "‏802.11ac — نطاق 5GHz فقط مع MU-MIMO هابط", en: "802.11ac — 5GHz only with downlink MU-MIMO" },
        },
        {
          left: { ar: "‏WiFi 6", en: "WiFi 6" },
          right: { ar: "‏802.11ax — ثورة الكفاءة OFDMA وTWT", en: "802.11ax — the efficiency revolution: OFDMA & TWT" },
        },
        {
          left: { ar: "‏WiFi 6E", en: "WiFi 6E" },
          right: { ar: "النطاق النظيف الجديد 6GHz", en: "The clean new 6GHz band" },
        },
        {
          left: { ar: "‏WiFi 7", en: "WiFi 7" },
          right: { ar: "‏802.11be — MLO و320MHz و4096-QAM", en: "802.11be — MLO, 320MHz and 4096-QAM" },
        },
      ],
    },
  ],
  l094: [
    {
      kind: "match",
      id: "w:l094:1",
      sectionIndex: 3,
      xp: 12,
      title: { ar: "طابق مفاهيم SDN", en: "Match the SDN concepts" },
      instructions: {
        ar: "اضغط المفهوم ثم دوره في الشبكة المُبرمجة",
        en: "Tap a concept, then its role in the programmable network",
      },
      pairs: [
        {
          left: { ar: "‏API الشمالية Northbound", en: "Northbound API" },
          right: { ar: "يربط المتحكم بتطبيقات الأعمال", en: "Connects the controller to business apps" },
        },
        {
          left: { ar: "‏API الجنوبية Southbound", en: "Southbound API" },
          right: { ar: "يربط المتحكم بالأجهزة (OpenFlow/NETCONF)", en: "Connects the controller to devices (OpenFlow/NETCONF)" },
        },
        {
          left: { ar: "قاعدة priority-0 مع CONTROLLER", en: "A priority-0 rule with CONTROLLER action" },
          right: { ar: "‏table-miss: يُرفع ما لا يطابق قاعدة للمتحكم", en: "Table-miss: unmatched packets get punted to the controller" },
        },
        {
          left: { ar: "الشبكة القائمة على النية IBN", en: "Intent-based networking" },
          right: { ar: "إعلان النتيجة المطلوبة مع تحقق وضمان مستمرين", en: "Declare the outcome with continuous verification & assurance" },
        },
      ],
    },
  ],
  l095: [
    {
      kind: "classify",
      id: "w:l095:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "صنّف حمايات السحابة", en: "Classify the cloud protections" },
      instructions: {
        ar: "أميز بين Security Groups و NACLs — اضغط الصفة ثم صاحبها",
        en: "Security Groups vs NACLs — tap a trait, then its owner",
      },
      buckets: [
        { ar: "‏Security Group", en: "Security Group" },
        { ar: "‏Network ACL", en: "Network ACL" },
      ],
      items: [
        { text: { ar: "ذو حالة: الردود مسموحة تلقائيًا", en: "Stateful: replies are automatically allowed" }, bucket: 0 },
        { text: { ar: "بلا حالة: عند حدود الشبكة الفرعية", en: "Stateless: at the subnet boundary" }, bucket: 1 },
        { text: { ar: "قواعد سماح فقط تُطبَّق على المورد", en: "Allow-only rules applied to the resource" }, bucket: 0 },
        { text: { ar: "قواعد مرقّمة تسمح وتمنع معًا", en: "Numbered rules with both allow and deny" }, bucket: 1 },
      ],
    },
  ],
  l096: [
    {
      kind: "match",
      id: "w:l096:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "طابق مفاهيم الأتمتة", en: "Match the automation concepts" },
      instructions: {
        ar: "اضغط المفهوم ثم معناه في Ansible وNetmiko",
        en: "Tap a concept, then its meaning in Ansible & Netmiko",
      },
      pairs: [
        {
          left: { ar: "القدرة التكرارية Idempotency", en: "Idempotency" },
          right: { ar: "التشغيل المتكرر يتقارب دائمًا إلى الحالة ذاتها", en: "Repeated runs always converge to the same state" },
        },
        {
          left: { ar: "‏--check --diff", en: "--check --diff" },
          right: { ar: "محاكاة التغييرات دون لمس الأجهزة", en: "Simulate changes without touching devices" },
        },
        {
          left: { ar: "‏state: overridden", en: "state: overridden" },
          right: { ar: "فرض الحالة الكاملة وحذف كل غير المعلن", en: "Enforce the full state; delete anything undeclared" },
        },
        {
          left: { ar: "‏Ansible Vault", en: "Ansible Vault" },
          right: { ar: "تخزين الأسرار مشفرة في المستودع", en: "Encrypted secret storage in the repo" },
        },
        {
          left: { ar: "‏Netmiko", en: "Netmiko" },
          right: { ar: "مكتبة Python فوق Paramiko لأجهزة الشبكات", en: "The Python library atop Paramiko for network gear" },
        },
      ],
    },
  ],
  l097: [
    {
      kind: "fill",
      id: "w:l097:1",
      sectionIndex: 2,
      xp: 12,
      title: { ar: "أكمل أرقام VXLAN", en: "Complete the VXLAN numbers" },
      instructions: {
        ar: "أكمل منفذ UDP وعرض VNI وعدد القفزات من البنك",
        en: "Complete the UDP port, VNI width and hop count from the bank",
      },
      template: {
        ar: "يغلف VXLAN إطار L2 داخل UDP بمنفذ ____، ومعرّف VNI عرضه ____ بتًا يمنح ~16.7 مليون شبكة، وأي ورقتين تتصلان عبر أي Spine في ____ قفزات.",
        en: "VXLAN wraps an L2 frame inside UDP port ____, with a ____-bit VNI granting ~16.7M networks, and any two leaves connect through any spine in ____ hops.",
      },
      blanks: [
        { answer: { ar: "4789", en: "4789" }, hint: { ar: "منفذ VXLAN الرسمي", en: "The official VXLAN port" } },
        { answer: { ar: "24", en: "24" }, hint: { ar: "عرض يمنح ~16.7 مليون", en: "The width granting ~16.7M" } },
        { answer: { ar: "2", en: "2" }, hint: { ar: "ورقة ← عمود فقري ← ورقة", en: "leaf → spine → leaf" } },
      ],
      bank: [
        { ar: "4789", en: "4789" },
        { ar: "24", en: "24" },
        { ar: "2", en: "2" },
        { ar: "4784", en: "4784" },
        { ar: "16", en: "16" },
        { ar: "3", en: "3" },
      ],
    },
  ],
  l099: [
    {
      kind: "order",
      id: "w:l099:1",
      sectionIndex: 2,
      xp: 14,
      title: { ar: "رتّب المنهجية السباعية للتشخيص", en: "Order the 7-step troubleshooting method" },
      instructions: {
        ar: "اضغط الخطوات السبع بترتيبها المهني الصحيح",
        en: "Tap the seven steps in their professional order",
      },
      items: [
        { ar: "حدّد المشكلة بدقة: من، ماذا، متى، وما الذي يعمل", en: "Define the problem: who, what, when, and what still works" },
        { ar: "اجمع المعلومات والأدلة", en: "Gather information and evidence" },
        { ar: "حلّل الأدلة وشكّك الفرضيات", en: "Analyze the evidence and form hypotheses" },
        { ar: "استبعد الأسباب غير المحتملة", en: "Eliminate the unlikely causes" },
        { ar: "صمّم خطة اختبار لمتغير واحد فقط", en: "Plan a test changing only one variable" },
        { ar: "نفّذ الحل وتحقق من النتيجة", en: "Implement the fix and verify the result" },
        { ar: "وثّق الحل وامنع التكرار", en: "Document the fix and prevent recurrence" },
      ],
    },
  ],
  l100: [
    {
      kind: "order",
      id: "w:l100:1",
      sectionIndex: 0,
      xp: 10,
      title: { ar: "رتّب سلم المهنة", en: "Order the career ladder" },
      instructions: {
        ar: "اضغط المراتب من البداية حتى المعماري",
        en: "Tap the rungs from the start up to architect",
      },
      items: [
        { ar: "الدعم الفني Helpdesk", en: "Helpdesk support" },
        { ar: "مركز عمليات الشبكة NOC", en: "NOC — network operations center" },
        { ar: "مهندس شبكات", en: "Network engineer" },
        { ar: "مهندس أول", en: "Senior engineer" },
        { ar: "قائد/معماري الشبكات", en: "Lead / network architect" },
      ],
    },
    {
      kind: "match",
      id: "w:l100:2",
      sectionIndex: 1,
      xp: 10,
      title: { ar: "طابق الشهادات وأدوارها", en: "Match certifications to their roles" },
      instructions: {
        ar: "اضغط الشهادة ثم موقعها في مسارك المهني",
        en: "Tap a certification, then its place in your path",
      },
      pairs: [
        {
          left: { ar: "‏CompTIA Network+", en: "CompTIA Network+" },
          right: { ar: "باب مفاهيمي محايد للمصنّع", en: "The vendor-neutral conceptual entry door" },
        },
        {
          left: { ar: "‏CCNA", en: "CCNA" },
          right: { ar: "عتبة التوظيف العملية", en: "The practical employability threshold" },
        },
        {
          left: { ar: "‏CCNP", en: "CCNP" },
          right: { ar: "تخصص بعد سنوات من الخبرة", en: "A specialization after years of experience" },
        },
        {
          left: { ar: "‏350-401 ENCOR", en: "350-401 ENCOR" },
          right: { ar: "الامتحان الأساسي لمسار CCNP Enterprise", en: "The CCNP Enterprise core exam" },
        },
      ],
    },
  ],
};

