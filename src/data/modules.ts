import type { ModuleMeta } from "@/lib/types";

export const MODULES: ModuleMeta[] = [
  {
    id: "m01",
    title: { ar: "أساسيات الشبكات", en: "Network Fundamentals" },
    desc: {
      ar: "ابدأ رحلتك: ما هي الشبكات، أنواعها، مكوناتها، ووسائط النقل والمصطلحات الأساسية.",
      en: "Start your journey: what networks are, their types, components, transmission media, and core terminology.",
    },
    icon: "Network",
    level: "beginner",
    color: "#10b981",
  },
  {
    id: "m02",
    title: { ar: "نموذج OSI", en: "The OSI Model" },
    desc: {
      ar: "الطبقات السبع بالتفصيل: من الفيزيائية إلى التطبيقية مع التغليف وفك التغليف.",
      en: "All seven layers in detail: from Physical to Application, plus encapsulation/decapsulation.",
    },
    icon: "Layers",
    level: "beginner",
    color: "#34d399",
  },
  {
    id: "m03",
    title: { ar: "الطبقة الفيزيائية والكابلات", en: "Physical Layer & Cabling" },
    desc: {
      ar: "الإشارات، النحاس، الألياف الضوئية، معايير الإيثرنت، التوصيلات وحل مشاكل الكابلات.",
      en: "Signals, copper, fiber optics, Ethernet standards, connectors, and cable troubleshooting.",
    },
    icon: "Cable",
    level: "beginner",
    color: "#f59e0b",
  },
  {
    id: "m04",
    title: { ar: "طبقة الوصل والتبديل", en: "Data Link & Switching" },
    desc: {
      ar: "عناوين MAC، إطارات الإيثرنت، عمل المبدلات، VLAN، بروتوكول الشجرة الممتدة، و ARP.",
      en: "MAC addresses, Ethernet frames, how switches learn, VLANs, STP, and ARP in depth.",
    },
    icon: "GitBranch",
    level: "intermediate",
    color: "#84cc16",
  },
  {
    id: "m05",
    title: { ar: "طبقة الشبكة وعنونة IP", en: "Network Layer & IP Addressing" },
    desc: {
      ar: "عنونة IPv4، التقسيم إلى شبكات فرعية، VLSM، NAT، و IPv6 من الصفر إلى الإتقان.",
      en: "IPv4 addressing, subnetting, VLSM, NAT, and IPv6 from zero to mastery.",
    },
    icon: "MapPin",
    level: "intermediate",
    color: "#22c55e",
  },
  {
    id: "m06",
    title: { ar: "بروتوكولات التوجيه", en: "Routing Protocols" },
    desc: {
      ar: "جداول التوجيه، المسارات الثابتة، RIP و OSPF و EIGRP و BGP وتوجيه IPv6.",
      en: "Routing tables, static routes, RIP, OSPF, EIGRP, BGP, and IPv6 routing.",
    },
    icon: "Route",
    level: "advanced",
    color: "#e11d48",
  },
  {
    id: "m07",
    title: { ar: "طبقة النقل", en: "Transport Layer" },
    desc: {
      ar: "TCP و UDP بعمق، المصافحة الثلاثية، التحكم بالتدفق والازدحام، المنافذ والمقابس.",
      en: "TCP & UDP in depth, three-way handshake, flow & congestion control, ports and sockets.",
    },
    icon: "ArrowLeftRight",
    level: "intermediate",
    color: "#0d9488",
  },
  {
    id: "m08",
    title: { ar: "طبقة التطبيقات والخدمات", en: "Application Layer & Services" },
    desc: {
      ar: "DNS و HTTP/HTTPS و HTTP/2 و HTTP/3 والبريد و DHCP و CDN والـ APIs.",
      en: "DNS, HTTP/HTTPS, HTTP/2 & HTTP/3, email, DHCP, CDNs, and APIs.",
    },
    icon: "Globe",
    level: "intermediate",
    color: "#f97316",
  },
  {
    id: "m09",
    title: { ar: "أمن الشبكات", en: "Network Security" },
    desc: {
      ar: "التهديدات، الجدران النارية، IDS/IPS، VPN، أمان الشبكات اللاسلكية، و Zero Trust.",
      en: "Threats, firewalls, IDS/IPS, VPNs, wireless security, AAA, and Zero Trust.",
    },
    icon: "ShieldCheck",
    level: "advanced",
    color: "#dc2626",
  },
  {
    id: "m10",
    title: { ar: "اللاسلكي والتقنيات المتقدمة والمسار المهني", en: "Wireless, Advanced Tech & Career" },
    desc: {
      ar: "Wi-Fi، إدارة الشبكات، SDN والسحابة والأتمتة ومراكز البيانات والمسار المهني والشهادات.",
      en: "Wi-Fi, network management, SDN, cloud, automation, datacenters, career paths & certifications.",
    },
    icon: "Wifi",
    level: "expert",
    color: "#a855f7",
  },
  {
    id: "m11",
    title: { ar: "أساسيات أنظمة الحاسوب", en: "Computer Systems Fundamentals" },
    desc: {
      ar: "العتاد والمعمارية وتمثيل البيانات والتمهيد والمحاكاة والسحابة — أساس مادة أنظمة الحاسوب في السنة الأولى.",
      en: "Hardware, architecture, data representation, booting, virtualization and cloud — the Year-1 Computer Systems foundation.",
    },
    icon: "Cpu",
    level: "beginner",
    color: "#14b8a6",
  },
  {
    id: "m12",
    title: { ar: "أنظمة التشغيل ويونكس", en: "Operating Systems & Unix" },
    desc: {
      ar: "من طبقات البرمجيات إلى نواة يونكس وتاريخه وفلسفته ومقارنته بويندوز وماك — قلب مادة أنظمة يونكس.",
      en: "From software layers to the Unix kernel, its history and philosophy, and how it compares to Windows and Mac — the heart of Unix Systems.",
    },
    icon: "Terminal",
    level: "beginner",
    color: "#b45309",
  },
  {
    id: "m13",
    title: { ar: "سطر أوامر لينكس و Bash", en: "Linux Command Line & Bash" },
    desc: {
      ar: "الدخول عبر SSH بـ Putty، إدارة الملفات والصلاحيات والمستخدمين والعمليات والبرمجة النصية — مختبرات يونكس خطوة بخطوة.",
      en: "SSH login with Putty, managing files, permissions, users, processes and scripting — the Unix labs step by step.",
    },
    icon: "SquareTerminal",
    level: "beginner",
    color: "#65a30d",
  },
  {
    id: "m14",
    title: { ar: "البرمجة وقواعد البيانات والويب", en: "Programming, Databases & Web" },
    desc: {
      ar: "التفكير الحاسوبي وبايثون وهياكل البيانات وقواعد Oracle وSQL وERD وبناء المواقع بـ HTML/CSS.",
      en: "Computational thinking, Python, data structures, Oracle databases, SQL, ERD, and building websites with HTML/CSS.",
    },
    icon: "Code2",
    level: "intermediate",
    color: "#c2410c",
  },
  {
    id: "m15",
    title: { ar: "الرياضيات والإحصاء والبحث العلمي", en: "Math, Statistics & Research" },
    desc: {
      ar: "المنطق والاحتمالات والإحصاء الوصفي وتصميم الاستبيانات ومقاييس ليكرت وتحليل البيانات وأخلاقيات البحث.",
      en: "Logic, probability, descriptive statistics, survey design, Likert scales, data analysis, and research ethics.",
    },
    icon: "Sigma",
    level: "intermediate",
    color: "#9f1239",
  },
];

export const moduleById = (id: string): ModuleMeta =>
  MODULES.find((m) => m.id === id) ?? MODULES[0];
