// ─── Lesson → Source mapping (research citations) ────────────────────────
// Every entry: lessonId → 2-4 LessonSourceRef { sourceId, note }.
// sourceId MUST exist in src/data/sources.ts (SOURCES registry).
// Notes are bilingual citation annotations: what THIS source supports in THIS lesson.
// Coverage: all 100 lessons (l001..l100), all 10 modules, all 59 registry sources.
// BPT-aligned expansion (m11..m15, l101..l150) lives in lessonSourcesParts/.

import type { LessonSourceRef } from "@/lib/types";
import { M11_LESSON_SOURCES } from "./lessonSourcesParts/m11";
import { M12_LESSON_SOURCES } from "./lessonSourcesParts/m12";
import { M13_LESSON_SOURCES } from "./lessonSourcesParts/m13";
import { M14_LESSON_SOURCES } from "./lessonSourcesParts/m14";
import { M15_LESSON_SOURCES } from "./lessonSourcesParts/m15";

export const LESSON_SOURCES: Record<string, LessonSourceRef[]> = {
  // ── EXAMPLES (correct shape — keep them, they are real lessons) ──
  l001: [
    {
      sourceId: "rfc2235",
      note: {
        ar: "قصة نشأة الإنترنت من رواده — أساس هذا الدرس التأسيسي",
        en: "The birth of the Internet from its own pioneers — the basis of this foundational lesson",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "الفصل الأول من مرجع Kurose & Ross يعرض مفهوم «شبكة الشبكات» بنفس منهجية الدرس",
        en: "Chapter 1 of Kurose & Ross presents the 'network of networks' concept this lesson follows",
      },
    },
  ],

  // ══════════════════ m01 · Network Fundamentals (l001–l010) ══════════════════

  l002: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "تصنيف الفصل الأول لشبكات الوصول والعمود الفقري يكمل الخريطة الجغرافية (LAN/WAN) التي يرسمها الدرس",
        en: "Chapter 1's taxonomy of access networks and the network core complements the geographic LAN/WAN map this lesson draws",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "التصنيف الكلاسيكي للشبكات حسب المدى الجغرافي (LAN وMAN وWAN) كما ورد في مرجع الشبكات المعتمد",
        en: "The classic geographic taxonomy of LAN, MAN and WAN as presented in the canonical networks text",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "أمثلة منهج CCNA على شبكات المنازل والمكاتب ومراكز البيانات تربط كل نوع بالأجهزة الحقيقية",
        en: "CCNA's examples of home, office and data-center networks tie each type to real equipment",
      },
    },
  ],

  l003: [
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "تحليل النجمة والناقل والحلقة والشبكية بمزاياها وعيوبها — النمط التحليلي الذي يقلّده الدرس",
        en: "The analysis of star, bus, ring and mesh topologies with pros and cons — the analytical pattern this lesson follows",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "منهجية نمذجة الشبكة كرسم بياني (عُقد ووصلات) التي يتبناها الكتاب تناسب دراسة الطوبولوجيات",
        en: "The book's graph-based network modeling (nodes and links) suits the study of topologies",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "لماذا انتصرت النجمة المُبدَّلة في الشبكات الحديثة — الاستنتاج العملي في منهج CCNA",
        en: "Why the switched star won in modern networks — the practical conclusion in the CCNA curriculum",
      },
    },
  ],

  l004: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم الند-للند (P2P) في فصل التطبيقات مع تحليل توزيع الملفات هو المقارنة الكمية المرجعية بين النموذجين",
        en: "The P2P section of the applications chapter with its file-distribution analysis is the reference quantitative comparison of both models",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "واجبات CS144 العملية تُبنى على نموذج العميل-الخادم عبر المقابس (Sockets) — تجربة مباشرة للنموذج المركزي",
        en: "CS144's programming assignments are built on the client-server model over sockets — a direct experience of the centralized model",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "مناقشة البنية المركزية مقابل البنية اللامركزية في سياق تطبيقات الند-للند الحديثة",
        en: "The discussion of centralized vs decentralized organization in the context of modern peer applications",
      },
    },
  ],

  l005: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "تحليل التأخير في الفصل الأول (معالجة وطابور وإرسال وانتشار) وفقدان الحزم — الأساس الرياضي لمقاييس الدرس",
        en: "Chapter 1's delay analysis (processing, queuing, transmission, propagation) and packet loss — the mathematical basis of this lesson's metrics",
      },
    },
    {
      sourceId: "berkeley-cs168",
      note: {
        ar: "محاضرات الأداء في CS168 تفرّق بين سعة الوصلة والمُنجَز الفعلي (Throughput) بمنهجية القياس نفسها",
        en: "CS168's performance lectures distinguish link capacity from achieved throughput using the same measurement mindset",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "تعريفات عرض النطاق والإنتاجية وجودة الخدمة وحساب Shannon للسعة القصوى",
        en: "Definitions of bandwidth, throughput, quality of service, and Shannon's maximum-capacity calculation",
      },
    },
  ],

  l006: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "خريطة الكتاب للأجهزة عبر الطبقات: المبدّلات في طبقة الوصل والموجهات في طبقة الشبكة",
        en: "The book's map of devices across layers: switches at the link layer, routers at the network layer",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "معرفة اختيار الجهاز المناسب لكل موقف (راوتر أو مبدّل أو نقطة وصول) — جوهر منهج CCNA العملي",
        en: "Knowing which device fits each situation (router, switch or access point) — the core of CCNA's practical method",
      },
    },
    {
      sourceId: "cheswick-firewalls",
      note: {
        ar: "دور الجدار الناري كبوابة سياسة أمنية بين الشبكات كما صاغه رواد هندسة الحماية",
        en: "The firewall's role as a security policy gateway between networks, as framed by the pioneers of protection engineering",
      },
    },
  ],

  l007: [
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "فصل الوسائط الفيزيائية: النحاس والألياف والراديو بمعطيات السرعة والمدى والتداخل — مرجع المقارنة الثلاثية",
        en: "The physical media chapter: copper, fiber and radio with speed, reach and interference data — the reference for the three-way comparison",
      },
    },
    {
      sourceId: "cloudflare-fiber",
      note: {
        ar: "شرح مبسّط ودقيق لسبب تفوق الألياف الضوئية على النحاس في المسافات الطويلة",
        en: "A precise, plain-language explanation of why fiber beats copper over long distances",
      },
    },
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "المواصفة الرسمية لفيزياء الوسط اللاسلكي: القنوات ومعاملات السعة التي يقوم عليها فرع المقارنة الثالث",
        en: "The official wireless PHY specification: channels and capacity parameters underlying the third branch of the comparison",
      },
    },
  ],

  l008: [
    {
      sourceId: "itu-x200",
      note: {
        ar: "النموذج المرجعي OSI بطبقاته السبع كما عرّفه الاتحاد الدولي للاتصالات — المرجع الأم للنصف الأول من الدرس",
        en: "The OSI seven-layer reference model as defined by the ITU — the primary reference for the first half of this lesson",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "عرض النموذج الرباعي TCP/IP ومقارنته التفصيلية مع OSI — الأساس للنصف الثاني",
        en: "The TCP/IP Guide's four-layer model presentation and its detailed comparison with OSI — the basis for the second half",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "منهج «الطبقات كخدمات وبروتوكولات» الذي يجعل النموذجين قابلين للمقارنة بوضوح أكاديمي",
        en: "The 'layers as services and protocols' approach that makes both models cleanly comparable",
      },
    },
    {
      sourceId: "clark-1988",
      note: {
        ar: "أهداف تصميم بروتوكولات DARPA التي شكّلت النموذج العملي TCP/IP قبل أن يُرسم على الورق",
        en: "The DARPA protocol design goals that shaped the pragmatic TCP/IP model before it was ever drawn on paper",
      },
    },
  ],

  l009: [
    {
      sourceId: "rfc2235",
      note: {
        ar: "التاريخ الموجز لتحول الإنترنت من شبكة بحثية إلى مزودي خدمة تجاريين — الخلفية المباشرة لهذا الدرس",
        en: "The brief history of the Internet's turn from research network to commercial ISPs — the direct background of this lesson",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "تحليل الفصل الأول لبنية مزودي الوصول ونقاط التبادل (IXPs) والشبكات العمودية",
        en: "Chapter 1's analysis of access ISPs, exchange points (IXPs) and backbone networks",
      },
    },
    {
      sourceId: "labovitz-routing",
      note: {
        ar: "قياسات الورقة لتقلبات التوجيه بين المزودين تكشف سلوك العمود الفقري الحقيقي الذي يمر به طلبك",
        en: "The paper's measurements of inter-provider routing instability reveal the real backbone behavior your request traverses",
      },
    },
  ],

  l010: [
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "خطوات بناء الشبكة الصغيرة: التخطيط والتوصيل والعنونة والاختبار كما يدرسها منهج CCNA",
        en: "The steps for building a small network: planning, cabling, addressing and testing as taught in the CCNA curriculum",
      },
    },
    {
      sourceId: "rfc1918",
      note: {
        ar: "نطاقات العناوين الخاصة (192.168/16) العاملة خلف كل راوتر منزلي — أساس عنونة هذا المشروع الأول",
        en: "The private 192.168/16 ranges living behind every home router — the addressing basis of this first project",
      },
    },
    {
      sourceId: "rfc2131",
      note: {
        ar: "خادم DHCP المدمج في الراوتر المنزلي يوزع العناوين تلقائياً وفق هذه المواصفة — خطوة التهيئة في المشروع",
        en: "The DHCP server built into the home router hands out addresses per this specification — the configuration step of the project",
      },
    },
  ],

  // ══════════════════ m02 · Layered Models (l011–l020) ══════════════════

  l011: [
    {
      sourceId: "itu-x200",
      note: {
        ar: "مبدأ التقسيم الطبقي والتجريد وتعريف خدمة كل طبقة وحدودها — التبرير الرسمي لوجود النموذج",
        en: "The principle of layering and abstraction, with each layer's service and boundaries — the formal rationale for the model's existence",
      },
    },
    {
      sourceId: "clark-1988",
      note: {
        ar: "الطبقية كقرار هندسي بأهداف صريحة في معمارية الإنترنت — لماذا نجح هذا التقسيم تحديداً",
        en: "Layering as an engineering decision with explicit goals in the Internet architecture — why this division in particular worked",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "عرض الطبقات كخدمات تُقدَّم للطبقة الأعلى — الإطار التعليمي الذي يعتمده الدرس",
        en: "Layers as services offered to the layer above — the pedagogical frame this lesson adopts",
      },
    },
  ],

  l012: [
    {
      sourceId: "itu-x200",
      note: {
        ar: "تعريفات خدمتي الطبقة الفيزيائية وطبقة الوصل — الإطار الرسمي لتشريح الطبقتين القابلتين للمس",
        en: "The service definitions of the physical and data-link layers — the formal frame for dissecting the two tangible layers",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح تفصيلي لعمل الطبقتين: من الإشارة الكهربائية إلى الإطار مع أمثلة الإيثرنت",
        en: "A detailed walkthrough of both layers: from the electrical signal to the frame with Ethernet examples",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "المرجع الشامل لفيزياء الإيثرنت وإطاراته — أعمق تغطية متاحة للطبقة الثانية",
        en: "The comprehensive reference for Ethernet's physical nature and frames — the deepest available Layer 2 coverage",
      },
    },
  ],

  l013: [
    {
      sourceId: "rfc791",
      note: {
        ar: "مواصفة IPv4 الأصلية تحدد خدمة طبقة الشبكة: تسليم مخططات بيانات بأقصى جهد عبر شبكات مختلفة",
        en: "The original IPv4 specification defines the network layer's service: best-effort datagram delivery across dissimilar networks",
      },
    },
    {
      sourceId: "rfc793",
      note: {
        ar: "مواصفة TCP تعرّف خدمة طبقة النقل: دفق بايتات موثوق من عملية إلى عملية عبر المنافذ",
        en: "The TCP specification defines the transport service: a reliable process-to-process byte stream over ports",
      },
    },
    {
      sourceId: "itu-x200",
      note: {
        ar: "التقسيم الرسمي بين وظائف الطبقتين الثالثة والرابعة كما رسمه نموذج OSI المرجعي",
        en: "The formal split between Layer 3 and Layer 4 functions as drawn by the OSI reference model",
      },
    },
  ],

  l014: [
    {
      sourceId: "itu-x200",
      note: {
        ar: "تعريف طبقات الجلسة والعرض والتطبيقات ووظائفها المعيارية — الأصل المعياري للطبقات العليا الثلاث",
        en: "The standard definition of the session, presentation and application layers and their functions — the normative origin of the three upper layers",
      },
    },
    {
      sourceId: "rfc854",
      note: {
        ar: "Telnet مثال تاريخي حي على بروتوكولات الجلسة والتفاوض على الخيارات (NVT)",
        en: "Telnet as a living historical example of session protocols and Network Virtual Terminal option negotiation",
      },
    },
    {
      sourceId: "rfc5321",
      note: {
        ar: "بروتوكول SMTP مثال معياري على خدمة طبقة التطبيقات الموجهة للرسائل بين المستخدمين",
        en: "SMTP as a canonical example of a user-to-message application-layer service",
      },
    },
    {
      sourceId: "rfc959",
      note: {
        ar: "بنية FTP ثنائية القنوات (تحكم وبيانات) مثال تعليمي على تعدد الاتصالات في طبقة التطبيقات",
        en: "FTP's dual-channel (control and data) design as a teaching example of multiple application-layer connections",
      },
    },
  ],

  l015: [
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح التغليف خطوة بخطوة وتسمية PDU في كل طبقة (مقطع ومخطط بيانات وإطار) — مرجع الدرس الأول",
        en: "The step-by-step encapsulation walkthrough and PDU naming at each layer (segment, datagram, frame) — the lesson's primary reference",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "الفصل التمهيدي يعرض التغليف بصيغة الحزم الفعلية كما تُلتقط من الشبكة مباشرة",
        en: "The introductory chapter shows encapsulation with actual packets as captured straight off the wire",
      },
    },
    {
      sourceId: "itu-x200",
      note: {
        ar: "التغليف كنتيجة مباشرة لمبدأ التقسيم الطبقي — من المبدأ المجرد إلى الصناديق المتداخلة",
        en: "Encapsulation as a direct consequence of the layering principle — from the abstract principle to nested boxes",
      },
    },
  ],

  l016: [
    {
      sourceId: "rfc1122",
      note: {
        ar: "متطلبات طبقات المضيف: ما يجب أن تتحقق منه كل طبقة قبل تمرير البيانات إلى الأعلى",
        en: "The host-layer requirements: what each layer must validate before passing data upward",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "تتبع حزمة واحدة صعوداً عبر المكدس عند الاستقبال — نفس تشريح الدرس بأداة tcpdump",
        en: "Following a single packet up the stack on arrival — the same anatomy as this lesson, via tcpdump",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "مسار البيانات من بطاقة الشبكة إلى التطبيق عبر طبقات المكدس — الجزء الناقص من صورة التغليف",
        en: "The data path from the NIC to the application through the stack — the completing half of the encapsulation picture",
      },
    },
  ],

  l017: [
    {
      sourceId: "itu-x200",
      note: {
        ar: "النموذج المرسوم على الورق أولاً: قصة المعيار الدولي OSI وتعريفه الرسمي",
        en: "The model drawn on paper first: the story of the international OSI standard and its formal definition",
      },
    },
    {
      sourceId: "rfc1122",
      note: {
        ar: "متطلبات المضيف تمثل النموذج المُنفَّذ أولاً ثم المُوثَّق — الواقع العملي لطبقات TCP/IP",
        en: "The host requirements represent the model implemented first and documented later — TCP/IP layers as they exist in practice",
      },
    },
    {
      sourceId: "rfc2235",
      note: {
        ar: "الخلفية التاريخية لسباق النموذجين في عقدي السبعينيات والثمانينيات من رواد الإنترنت أنفسهم",
        en: "The historical background of the two models' contest in the 1970s–80s, from the Internet's own pioneers",
      },
    },
  ],

  l018: [
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "منهجيات التشخيص (من الأسفل للأعلى والعكس وقسمة المملكة) وأدوات كل طبقة",
        en: "The diagnostic methodologies (bottom-up, top-down, divide-and-conquer) and the tools available at each layer",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "دراسات الحزم التشخيصية: كيف يقرأ الخبير الأعراض في الملتقطات الحقيقية",
        en: "Diagnostic packet studies: how an expert reads symptoms in real captures",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "منهجية CCNA الرسمية لاستكشاف الأخطاء وتسلسلها الاحترافي مع السيناريو الواقعي",
        en: "CCNA's official troubleshooting methodology and its professional sequence with a real-world scenario",
      },
    },
  ],

  l019: [
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "خريطة الأجهزة فوق الطبقات: من المكرِّر إلى المبدّل إلى البوابة — مرجع جدول الدرس",
        en: "The map of devices over the layers: from repeater to switch to gateway — the reference for the lesson's table",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "تطور الأجهزة من المجمّع إلى المبدّل الشفاف — التحول الذي أنهى عصر نطاقات التصادم المشتركة",
        en: "The evolution of devices from hub to transparent switch — the shift that ended the shared collision-domain era",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم الأجهزة الوسيطة (Middleboxes) يوسّع الخريطة إلى موازنات الأحمال وجدران NAT",
        en: "The middleboxes section extends the map to load balancers and NAT middleboxes",
      },
    },
  ],

  l020: [
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "أسلوب الكتاب المعهود في تتبع البروتوكول عبر ملتقطات حقيقية — النمط الأصلي لهذا الدرس السردي",
        en: "The book's signature style of tracing protocols through real captures — the original pattern for this narrative lesson",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "مسار الطلب من المتصفح إلى الخادم عبر شبكات الوصول والعمود الفقري كما يحكيه الفصل الأول",
        en: "The request's path from browser to server across access networks and the core as told in Chapter 1",
      },
    },
    {
      sourceId: "cerf-kahn-1974",
      note: {
        ar: "فكرة البوابة (Gateway) بين الشبكات التي تجعل الرحلة عبر شبكات مختلفة ممكنة أصلاً",
        en: "The inter-network gateway idea that makes the journey across heterogeneous networks possible in the first place",
      },
    },
  ],

  // ══════════════════ m03 · Physical & Cabling (l021–l030) ══════════════════

  l021: [
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "فيزياء الإشارات: تحليل Fourier وحدود عرض النطاق لأي قناة فيزيائية — أساس الفصل الفيزيائي",
        en: "The physics of signals: Fourier analysis and the bandwidth limits of any physical channel — the physical-layer foundation",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "المواصفة الرسمية لإشارات إيثرنت وعرض نطاق PHY المطلوب عند كل سرعة",
        en: "The official specification of Ethernet signaling and the PHY bandwidth required at each speed",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "التمييز العملي بين عرض النطاق والإنتاجية وجودة النقل (Goodput) في سياق إيثرنت",
        en: "The practical distinction among bandwidth, throughput and goodput in the Ethernet context",
      },
    },
  ],

  l022: [
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "جداول فئات الكابل المجدول (Twisted Pair) بسرعاتها وتردداتها — المرجع الأول لجدول الدرس",
        en: "The definitive twisted-pair category tables with speeds and frequencies — the primary reference for the lesson's table",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "الحد الأدنى من فئة الكابل الذي تشترطه كل سرعة (من 1000BASE-T إلى 10GBASE-T) — معيار قرار الشراء",
        en: "The minimum cable category each speed mandates (from 1000BASE-T to 10GBASE-T) — the purchasing-decision criterion",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "إرشادات CCNA العملية لاختيار الفئة المناسبة ومتى يستحق الإنفاق الأعلى",
        en: "CCNA's practical guidance on choosing the right category and when higher spending is worth it",
      },
    },
  ],

  l023: [
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "ترتيب أسلاك T568A وT568B سلكاً سلكاً وجدول المسامير — المصدر المعتمد لهذا التشريح",
        en: "The T568A and T568B wire-by-wire orders and pin tables — the authoritative source for this dissection",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "تعريف MDI/MDI-X وآلية Auto-MDIX في المواصفة — القاتل الرسمي لعصر الكابلات المتصالبة",
        en: "The MDI/MDI-X definitions and Auto-MDIX in the standard — the official killer of the crossover-cable era",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تمارين CCNA العملية على قص الكابلات وتوظيفها في المختبر",
        en: "CCNA's hands-on exercises for building and using cables in the lab",
      },
    },
  ],

  l024: [
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "الإيثرنت المحوري التاريخي (10BASE5/10BASE2) — جذور الكابل المحوري في الشبكات",
        en: "The historical coaxial Ethernet (10BASE5/10BASE2) — the roots of coax in networking",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "المنظومة الهاتفية والكابل المحوري ووصلات WAN التسلسلية في فصل الوسائط والبنية التحتية",
        en: "The telephone system, coax and serial WAN links in the media and infrastructure chapter",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "بقاء الكابل المحوري في تعديلات المواصفة — الاستمرارية المعيارية لوسيط قديم",
        en: "Coax's persistence in the standard's revisions — the normative continuity of a legacy medium",
      },
    },
  ],

  l025: [
    {
      sourceId: "cloudflare-fiber",
      note: {
        ar: "شرح الألياف الضوئية بلغة الجمهور: كيف يسير الضوء في زجاج أرفع من الشعرة",
        en: "A public-friendly explanation of fiber: how light travels through glass thinner than a hair",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "عائلات منافذ الألياف (1000BASE-SX/LX و10GBASE) وتحديد مداها الرسمي في المواصفة",
        en: "The fiber PHY families (1000BASE-SX/LX and 10GBASE) and their official reach definitions in the standard",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "فيزياء الانتشار الضوئي والانعكاس الكلي الداخلي في لب الزجاج — العمق الفيزيائي للدرس",
        en: "The physics of optical propagation and total internal reflection in the glass core — the lesson's physical depth",
      },
    },
  ],

  l026: [
    {
      sourceId: "cloudflare-fiber",
      note: {
        ar: "المقارنة المباشرة بين النمط الأحادي والمتعدد الأنماط وأقطار اللب — إطار القرار",
        en: "The direct comparison of single-mode vs multimode and core diameters — the decision frame",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "مدى كل عائلة منافذ ألياف وفق فئات OM/OS — الجدول الرسمي الذي تُبنى عليه جداول OM/OS في الدرس",
        en: "The reach of each fiber PHY per OM/OS grade — the official table behind the lesson's OM/OS tables",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "لماذا ينتشر النمط الأحادي دون تشتت أنماط — الأساس الفيزيائي لقرار الحرم الجامعي مقابل المدى والتكلفة",
        en: "Why single-mode propagates without modal dispersion — the physical basis of the campus/reach/cost decision",
      },
    },
  ],

  l027: [
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "سجل السرعات الرسمي: من 10Mbps إلى 400Gbps في تعديلات المواصفة نفسها — العمود الفقري لخط الدرس الزمني",
        en: "The official speed record: from 10 Mbps to 400 Gbps within the same standard's amendments — the backbone of the lesson's timeline",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "السرد التاريخي لتطور إيثرنت: كيف ضربت السرعة عشرات آلاف المرات وبقي الاسم واحداً",
        en: "The historical narrative of Ethernet's evolution: how speed multiplied tens of thousands of times while the name stayed the same",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "عرض موجز لأجيال إيثرنت وأثر كل جيل في بنية الشبكة والعنونة",
        en: "A concise survey of Ethernet generations and each generation's impact on network architecture",
      },
    },
  ],

  l028: [
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "بند التفاوض التلقائي الرسمي وتعريفات الثنائية في المواصفة — المرجع الأم للميكانيزم",
        en: "The standard's official autonegotiation clause and duplex definitions — the parent reference for the mechanism",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "قصص عدم تطابق الثنائية (Duplex Mismatch) — أشهر عطل خفي في تاريخ الشبكات كما يحكيه المرجع",
        en: "Duplex-mismatch war stories — the most famous hidden fault in networking history as told by the reference",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تشخيص عدم التطابق بمعاينة منافذ IOS وتصحيحه — الجانب العملي من الدرس",
        en: "Diagnosing duplex mismatch from IOS port counters and fixing it — the lesson's hands-on side",
      },
    },
  ],

  l029: [
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "هندسة أنظمة الكابلات: تسلسل MDF/IDF وقاعدة المتر التسعين كما تُمارَس ميدانياً",
        en: "The engineering of cabling systems: the MDF/IDF hierarchy and the 90-meter rule as practiced in the field",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "قيود قطاعات الوصل القياسية في المواصفة — التبرير المعياري لقاعدة المتر التسعين",
        en: "The standard's link-segment constraints — the normative justification for the 90-meter rule",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "معايير التمديدات المنظمة (TIA-568) كما تُدرَّس لفنيي الشبكات في منهج CCNA",
        en: "Structured cabling standards (TIA-568) as taught to network technicians in the CCNA curriculum",
      },
    },
  ],

  l030: [
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "منهجية اختبار الكابلات: معاني مخطط الأسلاك ونتائج الفقد والتشويش المتقاطع",
        en: "The cable-testing methodology: the meaning of wire-map, loss and crosstalk results",
      },
    },
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "حدود المعايير للمعاملات المقيسة (الفقد والتشويش وقواعد المطابقة) — مرجع التقييم الكمي",
        en: "The standard's limits for measured parameters (loss, crosstalk, conformance) — the quantitative evaluation reference",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "هرمية أجهزة القياس من فاحص الاستمرارية البسيط إلى مُصادق الوصلات المعتمد",
        en: "The tiering of test instruments from a simple continuity tester to a certified link certifier",
      },
    },
  ],

  // ══════════════════ m04 · Switching & VLANs (l031–l040) ══════════════════

  l031: [
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "العنونة 48-بت ومعرفات المزوّد OUI كما تحددها مواصفة إيثرنت المعيارية",
        en: "The 48-bit addressing and vendor OUI structure as defined by the Ethernet standard",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "تشريح عنوان MAC من OUI إلى بت البث والإدارة المحلية — البتات الخاصة التي يحفظها المهندس مدى الحياة",
        en: "The dissection of a MAC address from OUI to broadcast and locally-administered bits — the special bits an engineer remembers for life",
      },
    },
    {
      sourceId: "rfc826",
      note: {
        ar: "العنوان الفيزيائي كما يستخدمه بروتوكول ARP — الدور الذي يجعل تشريح MAC ضرورياً",
        en: "The physical address as consumed by ARP — the role that makes MAC anatomy worth dissecting",
      },
    },
  ],

  l032: [
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "الصيغة الرسمية للإطار: المقدمة وSFD وEtherType وFCS — تعريف كل حقل من مصدره",
        en: "The official frame format: preamble, SFD, EtherType and FCS — every field defined at its source",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "شرح حقول الإطار حقل بحقل ودور فحص FCS في كشف التلف — المرجع الشامل",
        en: "A field-by-field frame explanation and FCS's role in corruption detection — the comprehensive reference",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "حدود MTU والإطارات الجومبو (Jumbo) في سياق التغليف — الجزء الذي يتقاطع مع طبقة الشبكة",
        en: "MTU limits and jumbo frames in the encapsulation context — the part that intersects the network layer",
      },
    },
  ],

  l033: [
    {
      sourceId: "ieee-802-3",
      note: {
        ar: "آلية CSMA/CD الرسمية: الاستماع والكشف والتراجع الأُسّي — النص الأصلي للبروتوكول",
        en: "The official CSMA/CD mechanism: listen, detect and exponential backoff — the protocol in its original text",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "التمييز الكلاسيكي بين نطاقات التصادم والبث عبر المجمّعات والمبدّلات والموجهات",
        en: "The classic distinction of collision and broadcast domains across hubs, switches and routers",
      },
    },
    {
      sourceId: "ieee-802-1d",
      note: {
        ar: "المبدّل الجسري يقسّم نطاقات التصادم ويوحّد نطاقات البث — الدور الذي عرّفته هذه المواصفة",
        en: "The bridging switch splits collision domains while joining broadcast domains — the role this standard defined",
      },
    },
  ],

  l034: [
    {
      sourceId: "ieee-802-1d",
      note: {
        ar: "منطق التوجيه والترشيح والإغراق الرسمي للجسور الشفافة — قلب هذا الدرس",
        en: "The formal forward, filter and flood logic of transparent bridges — the heart of this lesson",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "المبدّل من الداخل: جدول العناوين وطرق التبديل — منصة الشرح الأعمق",
        en: "The switch from the inside: the address table and switching methods — the deeper explanatory platform",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "مقايضة store-and-forward مقابل cut-through في الأداء والسلامة كما تعالجها مختبرات CCNA",
        en: "The store-and-forward vs cut-through performance and integrity tradeoff as treated in CCNA labs",
      },
    },
  ],

  l035: [
    {
      sourceId: "ieee-802-1d",
      note: {
        ar: "عملية التعلم (Learning Process) ومؤقت التقادم معرفتان في نص المواصفة نفسها — الأصل المعياري لدورة الحياة",
        en: "The learning process and aging timer are defined in the standard's own text — the normative origin of the lifecycle",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "دورة حياة مدخل جدول MAC من التعلم إلى الاندثار وعودة الإغراق بعد التقادم",
        en: "The lifecycle of a MAC table entry from learning to expiry, and the flood that follows aging",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "أمن المنافذ وحدود التعلم (Port Security) — ضبط الجدول عملياً على منافذ IOS",
        en: "Port security and bounded learning — controlling the table in practice on IOS ports",
      },
    },
  ],

  l036: [
    {
      sourceId: "ieee-802-1q",
      note: {
        ar: "التقسيم المنطقي للشبكات المُجسَرة (Virtual Bridged LANs) كما عرّفته مواصفة 802.1Q",
        en: "The logical segmentation of bridged networks (Virtual Bridged LANs) as defined by 802.1Q",
      },
    },
    {
      sourceId: "cisco-vlan-guide",
      note: {
        ar: "خطوات ضبط منافذ الوصول على IOS والتحقق منها خطوة خطوة — نواة الجانب العملي في الدرس",
        en: "The step-by-step IOS configuration and verification of access ports — the core of the lesson's hands-on part",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "القاعدة الذهبية VLAN=Subnet وأفضل ممارسات تصميم VLANs في منهج CCNA",
        en: "The VLAN=subnet golden rule and VLAN design best practices in the CCNA curriculum",
      },
    },
  ],

  l037: [
    {
      sourceId: "ieee-802-1q",
      note: {
        ar: "بنية الوسم 4-بايت والـ Native VLAN كما تحددها المواصفة الأم — المرجع الأم لتشريح الوسم",
        en: "The 4-byte tag anatomy and the Native VLAN as defined by the parent standard — the primary reference for the tag dissection",
      },
    },
    {
      sourceId: "cisco-vlan-guide",
      note: {
        ar: "ضبط الجذوع على IOS وقوائم VLAN المسموحة وتشخيص عدم التطابق — التكوين المرجعي",
        en: "Configuring IOS trunks, allowed VLAN lists and troubleshooting mismatches — the reference configuration",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح مصوّر لبنية وسم 802.1Q بتاً بتاً — العمق الذي يحتاجه فهم حقل TPID",
        en: "An illustrated, bit-by-bit walkthrough of the 802.1Q tag — the depth needed to truly understand the TPID field",
      },
    },
  ],

  l038: [
    {
      sourceId: "cisco-vlan-guide",
      note: {
        ar: "الراوتر على العصا بواجهاته الفرعية الموسومة — التكوين المرجعي للمسار الأول",
        en: "Router-on-a-stick with its tagged subinterfaces — the reference configuration for the first approach",
      },
    },
    {
      sourceId: "rfc1812",
      note: {
        ar: "متطلبات الموجه في تمرير الحزم بين الشبكات — الأساس المنطقي لكل توجيه بين VLANs",
        en: "The router requirements for forwarding packets between networks — the logical basis of all inter-VLAN routing",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "واجهات SVI على مبدّلات الطبقة الثالثة ومقارنة الأداء والتكلفة مع الحل الأول",
        en: "SVIs on Layer 3 switches and the performance and cost comparison with the first approach",
      },
    },
  ],

  l039: [
    {
      sourceId: "ieee-802-1d",
      note: {
        ar: "خوارزمية الشجرة الممتدة في مواصفتها الأم: انتخاب الجذر بأدنى Bridge ID وأدوار المنافذ وحالاتها",
        en: "The spanning tree algorithm in its home standard: root election by lowest Bridge ID, port roles and states",
      },
    },
    {
      sourceId: "spurgeon-ethernet",
      note: {
        ar: "لماذا لا تعرف الطبقة الثانية TTL: عواصف البث وقصص حلقات الطبقة الثانية الواقعية",
        en: "Why Layer 2 knows no TTL: broadcast storms and real Layer 2 loop stories",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "القفزة النوعية في RSTP وتحصين STP (PortFast/BPDU Guard) كما يدرسها منهج CCNA",
        en: "RSTP's qualitative convergence leap and STP hardening (PortFast/BPDU Guard) as taught in CCNA",
      },
    },
  ],

  l040: [
    {
      sourceId: "rfc826",
      note: {
        ar: "مواصفة ARP الأصلية: صيغة الحزمة وآلية الطلب والرد عبر البث — أساس الخطوات الأولى في الدرس",
        en: "The original ARP specification: the packet format and broadcast request/reply mechanism — the basis of the lesson's first steps",
      },
    },
    {
      sourceId: "cisco-vlan-guide",
      note: {
        ar: "الدفاع المتدرّج: DHCP Snooping لبناء جدول الربط الموثوق ثم DAI لفرضه — التكوين المرجعي",
        en: "The layered defense: DHCP Snooping to build a trusted binding table, then DAI to enforce it — the reference configuration",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "سيناريو خداع ARP بين الضحية والبوابة (MITM) وأدوات كشفه في مختبرات CCNA",
        en: "The ARP-spoofing man-in-the-middle scenario between victim and gateway, and its detection tools in CCNA labs",
      },
    },
  ],

  // ══════════════════ m05 · IPv4/IPv6 Addressing (l041–l050) ══════════════════

  l041: [
    {
      sourceId: "rfc791",
      note: {
        ar: "تعريف الخدمة الجوهرية لطبقة الشبكة: تمرير مخططات بيانات مستقلة عبر شبكات متغايرة — نقطة انطلاق الدرس",
        en: "The network layer's defining service: passing independent datagrams across dissimilar networks — the lesson's starting point",
      },
    },
    {
      sourceId: "rfc1812",
      note: {
        ar: "كيف «يفكر» الموجه في كل حزمة: متطلبات المعالجة الأمامية الرسمية للموجهات",
        en: "How a router 'thinks' about every packet: the formal forwarding requirements for routers",
      },
    },
    {
      sourceId: "cerf-kahn-1974",
      note: {
        ar: "الورقة المؤسِّسة التي فصلت مسؤولية العنونة المنطقية عن الشبكات الفيزيائية المتغايرة",
        en: "The founding paper that separated logical addressing responsibility from heterogeneous physical networks",
      },
    },
  ],

  l042: [
    {
      sourceId: "rfc791",
      note: {
        ar: "التشريح الرسمي لترويسة IPv4: كل حقل من الإصدار إلى الخيارات، من مصدرها الأول",
        en: "The official IPv4 header dissection: every field from Version to Options, from the original source",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "عرض مصوّر للترويسة مع شرح التقطيع (Fragmentation) بمثال محلول — العمق التفصيلي للدرس",
        en: "An illustrated header walk with fragmentation explained through a worked example — the lesson's detailed depth",
      },
    },
    {
      sourceId: "rfc1812",
      note: {
        ar: "كيف تعالج الموجهات حقل TTL وحقل البروتوكول — سلوك الحقول من منظور الموجه",
        en: "How routers process the TTL and Protocol fields — field behavior from the router's viewpoint",
      },
    },
  ],

  l043: [
    {
      sourceId: "rfc1918",
      note: {
        ar: "النطاقات الخاصة الثلاثة (10/8 و172.16/12 و192.168/16) التي تُبنى عليها كل الشبكات الحقيقية اليوم",
        en: "The three private blocks (10/8, 172.16/12, 192.168/16) that all real networks are built on today",
      },
    },
    {
      sourceId: "rfc791",
      note: {
        ar: "العنونة الطبقية التاريخية A/B/C/D/E كما وردت في المواصفة الأصلية — الأساس المعياري للتاريخ",
        en: "The historical classful A/B/C/D/E addressing as laid out in the original specification — the normative basis of the history",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "جدول النطاقات الخاصة والإذاعية وسلوك 127/8 الحلقي — المرجع الميداني السريع",
        en: "The special, broadcast and loopback (127/8) ranges table — the quick field reference",
      },
    },
  ],

  l044: [
    {
      sourceId: "rfc950",
      note: {
        ar: "إجراء التقسيم الفرعي المعياري: استعارة بتات من حقل المضيف لتكوين حقل الشبكة الفرعية — الميلاد الرسمي للقناع",
        en: "The standard subnetting procedure: borrowing bits from the host field to form the subnet field — the mask's official birth",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "مثال محلول لعملية AND الثنائية يفصل جزء الشبكة عن جزء المضيف — الشرح الذي يجعل القناع منطقياً",
        en: "A worked binary-AND example separating the network part from the host part — the explanation that makes masks logical",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "شرح القناع والعنونة الفرعية في سياق تصميم الشبكات وتخصيص البادئات",
        en: "The mask and subnetting explanation in the context of network design and prefix allocation",
      },
    },
  ],

  l045: [
    {
      sourceId: "rfc950",
      note: {
        ar: "المنهجية الأصلية لتقسيم الشبكات التي يقوم عليها الدرس — من المصدر التاريخي",
        en: "The original subnetting methodology on which this lesson is built — from the historical source",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "أمثلة التقسيم الثنائية والعشرية المحلولة خطوة بخطوة — النمط التدريبي المرجعي",
        en: "Worked binary and decimal subnetting examples, step by step — the reference training pattern",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تمارين CCNA المتدرجة التي تحول التقسيم الفرعي من رهبة إلى روتين يومي",
        en: "CCNA's graded exercises that turn subnetting from terror into a daily routine",
      },
    },
  ],

  l046: [
    {
      sourceId: "rfc4632",
      note: {
        ar: "خلفية CIDR التاريخية تروي كيف خرجت الأقنعة متغيرة الطول (VLSM) كضرورة لتوزيع عادل للعناوين",
        en: "CIDR's historical background tells how VLSM emerged as a necessity for fair address allocation",
      },
    },
    {
      sourceId: "rfc1812",
      note: {
        ar: "متطلبات دعم الموجهات للأقنعة متغيرة الطول — التطبيق المعياري لفكرة الدرس",
        en: "The router requirements for variable-length mask support — the normative implementation of the lesson's idea",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "مشروع تصميم VLSM لشركة بأقسامها الخمسة — الحالة التعليمية المرجعية للخطة الكاملة",
        en: "The five-department VLSM design project — the reference teaching case for the complete plan",
      },
    },
  ],

  l047: [
    {
      sourceId: "rfc4632",
      note: {
        ar: "المواصفة التاريخية الشاملة لـ CIDR: كيف حطّم النظام الطبقي عام 1993 وأنقذ جداول التوجيه العالمية",
        en: "The comprehensive historical CIDR specification: how it broke the class system in 1993 and rescued the global routing tables",
      },
    },
    {
      sourceId: "rfc950",
      note: {
        ar: "العالم الطبقي الذي ورثه CIDR — نقطة البداية الضرورية لفهم الثورة اللاطبقية",
        en: "The classful world CIDR inherited — the necessary starting point for understanding the classless revolution",
      },
    },
    {
      sourceId: "rfc1812",
      note: {
        ar: "واجب الموجه في تجميع المسارات (Aggregation) وإعلان البادئة الأنسب — الجانب التشغيلي للتجميع",
        en: "The router's duty in route aggregation and announcing the appropriate prefix — the operational side of supernetting",
      },
    },
  ],

  l048: [
    {
      sourceId: "rfc1918",
      note: {
        ar: "لماذا وُلدت NAT أصلاً: استنزاف العناوين العامة وخلفية النطاقات الخاصة — التبرير الأصلي",
        en: "Why NAT exists at all: public address exhaustion and the private-range background — the original rationale",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح أنواع الترجمة الثلاثة (ساكن وديناميكي وتحميل) وحدّ المصطلحات الأربعة المربكة",
        en: "The explanation of the three translation types (static, dynamic, overload) and the four confusing terms",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تكوين NAT/PAT الكامل على IOS ودلالات inside/outside — الجانب المعملي من الدرس",
        en: "The full NAT/PAT configuration on IOS and the inside/outside semantics — the lesson's lab side",
      },
    },
  ],

  l049: [
    {
      sourceId: "rfc4291",
      note: {
        ar: "هندسة عنونة IPv6: قواعد التمثيل النصي والضغط وأنواع العناوين من العالمي إلى المحلي للوصلة",
        en: "The IPv6 addressing architecture: textual representation and compression rules, and the address types from global to link-local",
      },
    },
    {
      sourceId: "rfc8200",
      note: {
        ar: "المواصفة الأساسية للبروتوكول وبنية ترويسته المبسطة — السياق الذي تعيش فيه العناوين",
        en: "The core protocol specification and its simplified header structure — the context in which the addresses live",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "قراءة العنوان 128-بت خطوة خطوة وتكوين المعرف الفريد دون DHCP (SLAAC)",
        en: "Reading the 128-bit address step by step, and building a unique ID without DHCP (SLAAC)",
      },
    },
  ],

  l050: [
    {
      sourceId: "rfc4291",
      note: {
        ar: "معرف الواجهة 64-بت والحد القياسي /64 للشبكة الفرعية — الأساس الذي يقوم عليه التقسيم النِّبلي",
        en: "The 64-bit interface ID and the standard /64 subnet boundary — the foundation of nibble-based subnetting",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "مناقشة تبنّي IPv6 والانتقال التدريجي عن IPv4 في فصل طبقة الشبكة",
        en: "The IPv6 adoption and gradual transition discussion in the network-layer chapter",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "التكوين مزدوج المكدس على Cisco IOS وآليات الانتقال عملياً — الجزء التطبيقي",
        en: "Dual-stack configuration on Cisco IOS and the transition mechanisms in practice — the applied part",
      },
    },
  ],

  // ══════════════════ m06 · Routing (l051–l060) ══════════════════

  l051: [
    {
      sourceId: "rfc1812",
      note: {
        ar: "شكل جدول التوجيه الرسمي وقواعد اختيار المسار في متطلبات الموجهات — المرجع الأم لقراءة الجدول",
        en: "The formal routing-table shape and route-selection rules in the router requirements — the primary reference for reading the table",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "قراءة مخرجات show ip route احترافياً: الرموز والمسافة الإدارية والمقياس وبوابة الملاذ الأخير",
        en: "Reading show ip route output like a pro: codes, administrative distance, metric and the gateway of last resort",
      },
    },
    {
      sourceId: "rfc4632",
      note: {
        ar: "البادئات المجمعة كبنود في جدول التوجيه — لماذا تبدو الجداول الحقيقية كما تبدو",
        en: "Aggregated prefixes as routing-table entries — why real tables look the way they do",
      },
    },
  ],

  l052: [
    {
      sourceId: "rfc1812",
      note: {
        ar: "المعالجة الرسمية للمسار الافتراضي والوجهة 0.0.0.0/0 — الأصل المعياري لمسار الملاذ الأخير",
        en: "The formal treatment of the default route and the 0.0.0.0/0 destination — the normative origin of the route of last resort",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تركيب ip route بخياراته والفرق الجوهري بين القفزة التالية ومنفذ الخروج — التكوين العملي",
        en: "The ip route syntax with its options and the crucial next-hop vs exit-interface difference — the practical configuration",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح المسارات الثابتة وحدودها في الشبكات المتغيرة — لماذا ننتقل للتوجيه الديناميكي لاحقاً",
        en: "The static-route explanation and its limits in changing networks — why we move to dynamic routing later",
      },
    },
  ],

  l053: [
    {
      sourceId: "rfc1812",
      note: {
        ar: "قاعدة أطول بادئة مطابقة كمتطلب رسمي على خوارزمية المعالجة الأمامية — نص القاعدة نفسها",
        en: "The longest-prefix-match rule as a formal requirement on the forwarding algorithm — the rule in its own text",
      },
    },
    {
      sourceId: "rfc4632",
      note: {
        ar: "تفاعل التجميع مع أطول بادئة: كيف تتعايش البادئات بأطوال مختلفة في جدول واحد",
        en: "The interplay of aggregation with longest prefix: how prefixes of different lengths coexist in one table",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "هندسة المسارات العائمة بمسافة إدارية معدلة — الطريقة العملية لبناء الاحتياط",
        en: "Engineering floating statics with modified administrative distance — the practical way to build backups",
      },
    },
  ],

  l054: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "خوارزميات التوجيه (حالة الوصل والمتجه المسافة) بتحليلها الرياضي — الإطار النظري الكامل للدرس",
        en: "The routing algorithms (link-state and distance-vector) with their mathematical analysis — the lesson's complete theoretical frame",
      },
    },
    {
      sourceId: "rfc2328",
      note: {
        ar: "نموذج حالة الوصل الحي في OSPF: كيف تبني الخوارزمية خريطة كاملة للشبكة ثم تحسب أقصر المسارات",
        en: "The living link-state model in OSPF: how the algorithm builds a complete network map then computes shortest paths",
      },
    },
    {
      sourceId: "rfc2453",
      note: {
        ar: "المتجه المسافة في RIP كأبسط تجسيد للعائلة الثانية — نجم المقارنة الفلسفية في الدرس",
        en: "The distance-vector model in RIP as the simplest embodiment of the second family — the star of the lesson's philosophical comparison",
      },
    },
    {
      sourceId: "berkeley-cs168",
      note: {
        ar: "محاضرات التوجيه في CS168 تقدم مقارنة العائلتين بعمق أكاديمي مع بروتوكولات البوابة الخارجية",
        en: "CS168's routing lectures present the two families' comparison at academic depth, including exterior gateway protocols",
      },
    },
  ],

  l055: [
    {
      sourceId: "rfc2453",
      note: {
        ar: "مواصفة RIPv2 الأم: آلية المتجه المسافة ومؤقتات 30/180/240 — المصدر الأول لكل تفاصيل الدرس",
        en: "The parent RIPv2 specification: the distance-vector mechanism and the 30/180/240 timers — the primary source for every lesson detail",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "مشكلة العد إلى ما لا نهاية وعلاجاتها الأربعة (التقسيم الأفقي والسموم الخبيثة) كما يحللها الكتاب",
        en: "The count-to-infinity problem and its cures (split horizon and poison reverse) as analyzed in the book",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تكوين RIPv2 الكامل على IOS مع التحقق — وقصة نهاية عصره عملياً",
        en: "The full RIPv2 configuration on IOS with verification — and the story of its practical end",
      },
    },
  ],

  l056: [
    {
      sourceId: "rfc2328",
      note: {
        ar: "مواصفة OSPF الأم: قاعدة بيانات حالة الوصل والمناطق وآلية الجيرة بثماني حالات وانتخاب DR/BDR",
        en: "The parent OSPF specification: the LSDB, the area hierarchy, the eight-state adjacency machine and DR/BDR election",
      },
    },
    {
      sourceId: "cisco-ospf",
      note: {
        ar: "دليل تصميم OSPF: توصيات DR/BDR على الوسائط البثّية وهندسة المنطقة صفر — خبرة المصممين",
        en: "The OSPF Design Guide: DR/BDR recommendations on broadcast media and Area 0 engineering — the designers' experience",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "خوارزمية Dijkstra وحالة الوصل كأساس نظري لما يفعله OSPF عملياً",
        en: "Dijkstra's algorithm and link-state as the theoretical basis of what OSPF does in practice",
      },
    },
  ],

  l057: [
    {
      sourceId: "cisco-ospf",
      note: {
        ar: "الدليل المرجعي لتصميم نطاقات OSPF وRouter-ID وجمل الشبكة — المرجع الأول للتكوين الصحيح",
        en: "The reference guide for OSPF area design, Router-IDs and network statements — the first reference for correct configuration",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "أوامر IOS من router ospf إلى wildcards وأدوات التحقق الأربعة في مختبر CCNA",
        en: "The IOS commands from router ospf to wildcards and the four verification tools in CCNA's lab",
      },
    },
    {
      sourceId: "rfc2328",
      note: {
        ar: "سلوك البروتوكول خلف الأوامر: ما الذي تختبره أوامر التحقق فعلاً عند قراءة المواصفة",
        en: "The protocol behavior behind the commands: what the verification commands actually test, read from the specification",
      },
    },
  ],

  l058: [
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "تصنيفه لعائلات بروتوكولات التوجيه — السياق الذي يقع فيه EIGRP بين المتجه المسافة وحالة الوصل",
        en: "Its classification of routing protocol families — the context where EIGRP sits between distance-vector and link-state",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "بروتوكول سيسكو المتقدم: خوارزمية DUAL والخلف الجاهز (Feasible Successor) كما يدرسها منهج سيسكو",
        en: "Cisco's advanced protocol: the DUAL algorithm and the ready Feasible Successor as Cisco's curriculum teaches them",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "الموقع المفاهيمي لـ EIGRP بين عائلتي التوجيه — لماذا يسمى «متجه مسافة متقدماً»",
        en: "EIGRP's conceptual position between the two routing families — why it is called an 'advanced distance vector'",
      },
    },
  ],

  l059: [
    {
      sourceId: "rfc4271",
      note: {
        ar: "مواصفة BGP-4 الأم: مفهوم الأنظمة المستقلة وسلسلة قرار السمات — العمود الفقري للدرس",
        en: "The parent BGP-4 specification: the autonomous-system concept and the attribute decision chain — the backbone of this lesson",
      },
    },
    {
      sourceId: "labovitz-routing",
      note: {
        ar: "عدم استقرار التوجيه العالمي: العواصف التحديثية بين المزودين التي قاستها الورقة — الواقع وراء قصص اختطاف المسارات",
        en: "Global routing instability: the inter-provider update storms the paper measured — the reality behind route-hijacking tales",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "التوجيه بين الأنظمة والسياسات التجارية في فصل مستوى التحكم — الإطار الأكاديمي لعلاقات Peering وTransit",
        en: "Inter-domain routing and commercial policy in the control-plane chapter — the academic frame for peering and transit relations",
      },
    },
  ],

  l060: [
    {
      sourceId: "rfc2328",
      note: {
        ar: "أساس OSPFv2 الذي وُسِّع إلى v3: فهم الجذور لفهم التغييرات في التفعيل لكل واجهة",
        en: "The OSPFv2 basis that v3 extended: understanding the roots to understand the per-interface activation change",
      },
    },
    {
      sourceId: "rfc8200",
      note: {
        ar: "متطلبات توجيه IPv6 وخصوصيات المكدس الجديد التي تميز OSPFv3 عن سلفه",
        en: "IPv6 routing requirements and the new-stack specifics that distinguish OSPFv3 from its predecessor",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "تفعيل OSPFv3 لكل واجهة والمسارات الساكنة ::/0 والتحقق بأوامر ipv6 — الجانب المعملي",
        en: "Per-interface OSPFv3 activation, the ::/0 static routes and verification with the ipv6 commands — the lab side",
      },
    },
    {
      sourceId: "berkeley-cs168",
      note: {
        ar: "معالجة CS168 لتوجيه IPv6: قراءة جدول التوجيه السداسي عشري ومسارات البادئات الطويلة",
        en: "CS168's treatment of IPv6 routing: reading the hexadecimal routing table and prefix-matched routes",
      },
    },
  ],

  // ══════════════════ m07 · Transport Layer / TCP-UDP (l061–l070) ══════════════════

  l061: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم التجميع والفك (Multiplexing/Demultiplexing) بالمنافذ — الأساس المفاهيمي لمعجزة تعدد التطبيقات",
        en: "The multiplexing/demultiplexing section on ports — the conceptual basis of the many-apps miracle",
      },
    },
    {
      sourceId: "rfc793",
      note: {
        ar: "حقل المنفذ في ترويسة TCP: كيف تحدد الأرقام العملية داخل الجهاز الواحد خلف عنوان واحد",
        en: "The port field in the TCP header: how numbers identify processes within one machine behind one address",
      },
    },
    {
      sourceId: "rfc768",
      note: {
        ar: "المنافذ في UDP: أبسط تجسيد لتعدد الإرسال — الطرف الآخر من المقارنة",
        en: "The ports in UDP: the simplest embodiment of multiplexing — the other side of the comparison",
      },
    },
  ],

  l062: [
    {
      sourceId: "rfc793",
      note: {
        ar: "الصيغة الرسمية لترويسة TCP (§3.1): من المنفذ إلى الخيارات — تعريف كل حقل من مصدره",
        en: "The formal TCP header format (§3.1): from ports to options — every field defined at its source",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "جولة حقلاً بحقل مع ملتقطات tcpdump حقيقية — النمط الأصلي لأسلوب الدرس التشريحي",
        en: "A field-by-field tour with real tcpdump captures — the original pattern for this lesson's dissection style",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "شرح الأعلام التسعة ومعانيها في كل حالة اتصال — مرجع جدول الأعلام",
        en: "The explanation of the nine flags and their meaning in each connection state — the reference for the flags table",
      },
    },
  ],

  l063: [
    {
      sourceId: "rfc768",
      note: {
        ar: "المواصفة الأصلية كاملة في أربع صفحات: ترويسة 8-بايت والمجموع الاختباري مع الترويسة الكاذبة",
        en: "The entire original spec in four pages: the 8-byte header and the checksum with the pseudo-header",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "متى يكون UDP الخيار الهندسي الصحيح: تحليل المقايضة بين الموثوقية والكمون",
        en: "When UDP is the right engineering choice: the reliability-vs-latency tradeoff analysis",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "حالات الاستخدام الحقيقية لـ UDP من DNS إلى الوسائط المتدفقة — الجانب التطبيقي للاختيار",
        en: "Real-world UDP use cases from DNS to streaming media — the applied side of the choice",
      },
    },
  ],

  l064: [
    {
      sourceId: "rfc793",
      note: {
        ar: "المصافحة الثلاثية في موطنها الأصلي (§3.4) وقواعد الافتتاح والإغلاق المتأنّي",
        en: "The three-way handshake in its home (§3.4) and the rules for dignified opening and closing",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "تتبع إنشاء الاتصال وإنهائه بالملتقطات: من SYN إلى TIME_WAIT — النمط التشخيصي المرجعي",
        en: "Tracing connection establishment and teardown in captures: from SYN to TIME_WAIT — the reference diagnostic pattern",
      },
    },
    {
      sourceId: "rfc4987",
      note: {
        ar: "حالة الفشل الشهيرة للمصافحة: فيضان SYN وعلاجاته — الجانب الأمني لهذا الحوار",
        en: "The handshake's famous failure mode: SYN flooding and its mitigations — the security side of this dialogue",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "طلاب CS144 يبرمجون المصافحة بأنفسهم في مشروع TCP — فهم لا يُنسى للحوارات SYN/ACK",
        en: "CS144 students implement the handshake themselves in the TCP project — an unforgettable understanding of SYN/ACK dialogues",
      },
    },
  ],

  l065: [
    {
      sourceId: "rfc793",
      note: {
        ar: "ترقيم بايتات الدفق التراكمي: الأرقام تعد البايتات لا الحزم، والإقرار يعني «استلمت حتى هنا»",
        en: "Cumulative stream byte numbering: the numbers count bytes, not packets, and an ACK means 'received up to here'",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "أمثلة العد بالبايت المحلولة برقم في كل خطوة — نفس أسلوب الحسبة البايتية في الدرس",
        en: "Worked, numbered byte-counting examples — the same style as the lesson's byte-accounting walkthrough",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "مشروع الدفق المرتب في CS144 يجسّد عدّ أرقام التسلسل برمجياً قبل إضافة الموثوقية",
        en: "CS144's in-order byte stream project embodies sequence counting in code before reliability is added",
      },
    },
  ],

  l066: [
    {
      sourceId: "rfc793",
      note: {
        ar: "حقل النافذة ومبدأ التحكم بالتدفق من المستقبِل في المواصفة الأصلية — أصل النافذة المنزلقة",
        en: "The window field and receiver-driven flow control in the original specification — the origin of the sliding window",
      },
    },
    {
      sourceId: "rfc1122",
      note: {
        ar: "تحسينات إدارة النافذة في متطلبات المضيف: مسابر نافذة الصفر وتوسيع النافذة (Scaling)",
        en: "The host-requirements refinements to window management: zero-window probes and window scaling",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "النافذة المنزلقة بتحليلها النظري ومخططاتها الزمنية — العمق الأكاديمي للآلية",
        en: "The sliding window with its theoretical analysis and timing diagrams — the academic depth of the mechanism",
      },
    },
  ],

  l067: [
    {
      sourceId: "jacobson-1988",
      note: {
        ar: "الورقة المؤسِّسة لضبط الازدحام: البدء البطيء وتجنب الازدحام وإعادة الإرسال السريع من مصدرها الأول",
        en: "The founding paper of congestion control: slow start, congestion avoidance and fast retransmit from their original source",
      },
    },
    {
      sourceId: "rfc6298",
      note: {
        ar: "حساب مؤقت إعادة الإرسال (RTO) من متوسطات RTT وتباينها — القاعدة المعيارية الحالية",
        en: "Computing the retransmission timer (RTO) from smoothed RTT and its variance — the current standard rule",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "فصل ضبط الازدحام بعمقه النظري الكامل: AIMD وcwnd وتطور الخوارزميات حتى BBR",
        en: "The congestion-control chapter in full theoretical depth: AIMD, cwnd and algorithm evolution up to BBR",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "المشروع الختامي في CS144: تنفيذ AIMD بأيدي الطلاب داخل TCP — الاستيعاب بالبرمجة",
        en: "CS144's capstone project: implementing AIMD with the students' own hands inside TCP — understanding by programming",
      },
    },
  ],

  l068: [
    {
      sourceId: "rfc793",
      note: {
        ar: "حقل المنفذ ذو 16-بت يتسع لـ 65,536 قيمة — الحاوية الرسمية التي يسكنها جدول المنافذ الشائع",
        en: "The 16-bit port field spans 65,536 values — the official container the common-ports table lives in",
      },
    },
    {
      sourceId: "rfc768",
      note: {
        ar: "المنافذ في UDP: النصف الآخر من الجدول الذهبي الذي يقرأه المهندس يومياً",
        en: "The UDP ports: the other half of the golden table engineers read daily",
      },
    },
    {
      sourceId: "kozierok-tcpipguide",
      note: {
        ar: "جداول مدايات المنافذ (المعروفة والمسجلة والعابرة) وربطها بالمنافذ المؤقتة في NAT",
        en: "The port-range tables (well-known, registered, dynamic) and their tie to ephemeral ports in NAT",
      },
    },
  ],

  l069: [
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "برمجة المقابس من واجبات CS144 الأولى — أساس فهم الرباعية (4-Tuple) التي تحدد الاتصال",
        en: "Socket programming from CS144's early assignments — the basis for understanding the 4-tuple that identifies a connection",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "آلة حالات TCP الكاملة كما تُقرأ من مخرجات netstat وss — مرجع التدريبات الحية",
        en: "The full TCP state machine as read from netstat/ss output — the reference for the live drills",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "واجهة المقابس (Socket API) بوصفها بوابة طبقة النقل إلى التطبيقات — الإطار البرمجي",
        en: "The socket API as the transport layer's doorway to applications — the programming frame",
      },
    },
  ],

  l070: [
    {
      sourceId: "rfc1122",
      note: {
        ar: "التفسيرات المعيارية لسلوك TCP: توليد RST والبقاء على قيد الحياة (Keepalive) — مرجع التشخيص الرسمي",
        en: "The normative clarifications of TCP behavior: RST generation and keepalives — the formal diagnostic reference",
      },
    },
    {
      sourceId: "rfc6298",
      note: {
        ar: "توقيت إعادة الإرسال: قراءة مهلات RTO في الأعراض الحية وفهم سبب التأخير",
        en: "Retransmission timing: reading RTO timeouts in live symptoms and understanding why the delay happens",
      },
    },
    {
      sourceId: "jacobson-1988",
      note: {
        ar: "جذور خوارزميات إعادة الإرسال الحديثة — فهم السلوك الذي تشخّصه من مخترعه",
        en: "The roots of modern retransmission algorithms — understanding the behavior you diagnose, from its inventor",
      },
    },
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "أعلام تحليل TCP في Wireshark (إعادة الإرسال وACK المكرر وRST) — أداة التشخيص العملية الجاهزة",
        en: "Wireshark's TCP analysis flags (retransmissions, duplicate ACKs, RST) — the ready practical diagnostic tool",
      },
    },
  ],

  // ══════════════════ m08 · Application Services (l071–l080) ══════════════════

  l071: [
    {
      sourceId: "rfc1034",
      note: {
        ar: "مفاهيم DNS ومرافقه: التسلسل الهرمي والمحلّلات والتخزين المؤقت — مواصفة الأسماء الأم",
        en: "DNS concepts and facilities: the hierarchy, resolvers and caching — the parent name-system specification",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم DNS في فصل التطبيقات: كيف تعمل قاعدة البيانات الموزعة الأشهر في العالم",
        en: "The DNS section in the applications chapter: how the world's most famous distributed database works",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "نظرة Tanenbaum لرحلة الاستعلام من الخادم الجذر إلى الخادم الموثوق — السرد الكلاسيكي للهرمية",
        en: "Tanenbaum's view of the query's journey from the root server to the authoritative one — the classic narrative of the hierarchy",
      },
    },
  ],

  l072: [
    {
      sourceId: "rfc1034",
      note: {
        ar: "بنية سجلات الموارد (Resource Records) ومعاني أنواعها — الأساس النظري لجدول أنواع السجلات",
        en: "The resource-record structure and the meaning of its types — the theoretical basis of the record-types table",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "شرح أنواع السجلات (A وMX وNS وCNAME) وأدوارها في حل الأسماء",
        en: "The record types (A, MX, NS, CNAME) and their roles in name resolution",
      },
    },
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "تطبيق عملي مصاحب: قراءة إجابات DNS في Wireshark أثناء التنقيب بأمر dig",
        en: "A companion hands-on: reading DNS answers in Wireshark while digging with the dig command",
      },
    },
  ],

  l073: [
    {
      sourceId: "rfc9110",
      note: {
        ar: "دلالات HTTP المعيارية: الأفعال وأكواد الحالة والترويسات — المرجع الأم لكل قسم في الدرس",
        en: "The standard HTTP semantics: methods, status codes and headers — the parent reference for every section of this lesson",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم HTTP الكامل في فصل التطبيقات: بنية الرسائل والكوكيز والاتصالات المستمرة",
        en: "The full HTTP section in the applications chapter: message structure, cookies and persistent connections",
      },
    },
    {
      sourceId: "mit-6.858",
      note: {
        ar: "محاضرات أمان الويب في MIT: الكوكيز والجلسات وسياسة نفس الأصل — الامتداد الأمني لدلالات HTTP",
        en: "MIT's web-security lectures: cookies, sessions and the same-origin policy — the security extension of HTTP semantics",
      },
    },
  ],

  l074: [
    {
      sourceId: "rfc8446",
      note: {
        ar: "مواصفة TLS 1.3: المصافحة في دور واحد والاستئنام بصفر دور — الجانب «الثوري» في الدرس",
        en: "The TLS 1.3 specification: the one-round-trip handshake and zero-round-trip resumption — the lesson's 'revolution' part",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم TLS في فصل الأمن: التشفير الهجين وسلسلة الثقة وشهادات CA",
        en: "The TLS section in the security chapter: hybrid encryption, the chain of trust and CA certificates",
      },
    },
    {
      sourceId: "durumeric-heartbleed",
      note: {
        ar: "قياس أثر Heartbleed على ملايين الخوادم: حين تفشل التطبيقات لا البروتوكول — درس التواضع الأمني",
        en: "Measuring Heartbleed's impact on millions of servers: when implementations fail, not the protocol — a lesson in security humility",
      },
    },
  ],

  l075: [
    {
      sourceId: "rfc9110",
      note: {
        ar: "الدلالات المشتركة التي تحملها كل نسخ HTTP فوق أي وسيلة نقل — الثابت في خضم تطور HTTP/2 وHTTP/3",
        en: "The shared semantics every HTTP version carries over any transport — the constant amid the HTTP/2 and HTTP/3 evolution",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "تغطية الكتاب لـ HTTP/2: التأطير الثنائي والتعدد الإرسالي وHPACK وولادة HTTP/3 فوق QUIC",
        en: "The book's coverage of HTTP/2: binary framing, multiplexing, HPACK, and the birth of HTTP/3 over QUIC",
      },
    },
    {
      sourceId: "rfc768",
      note: {
        ar: "QUIC يستقر فوق UDP — عودة بروتوكولات النقل الحديثة إلى بساطة UDP وسبب هروبها من TCP",
        en: "QUIC rides over UDP — modern transport returning to UDP's simplicity, and why it fled TCP's head-of-line blocking",
      },
    },
  ],

  l076: [
    {
      sourceId: "rfc5321",
      note: {
        ar: "مواصفة SMTP الأم: معاملة البريد وسجلات MX والترحيل — العمود الفقري لرحلة الرسالة",
        en: "The parent SMTP specification: the mail transaction, MX records and relaying — the backbone of the message's journey",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم البريد في فصل التطبيقات: مقارنة POP3 وIMAP ونماذج الوصول",
        en: "The e-mail section in the applications chapter: the POP3 vs IMAP comparison and access models",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "عرض المرجع لمنظومة البريد: MUA وMTA وMDA وحماية البريد الحديثة",
        en: "The reference's view of the mail ecosystem: MUA, MTA, MDA and modern mail protection",
      },
    },
  ],

  l077: [
    {
      sourceId: "rfc2131",
      note: {
        ar: "مواصفة DHCP الأم: رسائل DORA الأربع ودورة حياة الإيجار وتجديده — مصدر الخطوة الأولى للأخيرة",
        en: "The parent DHCP specification: the four DORA messages and the lease lifecycle and renewal — the source for every step of this lesson",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "شرح DHCP في فصل الشبكة: كيف يستأجر المضيف عنوانه وحقوقه على الشبكة",
        en: "The DHCP explanation in the network chapter: how a host leases its address and network rights",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "إعداد خادم DHCP على IOS وإعداد الوكيل المرحل (ip helper-address) — الجانب التشغيلي",
        en: "Setting up a DHCP server on IOS and the relay agent (ip helper-address) — the operational side",
      },
    },
  ],

  l078: [
    {
      sourceId: "rfc959",
      note: {
        ar: "مواصفة FTP: النموذج ثنائي القنوات والوضعان النشط والسلبي — مرجع التشريح الكامل",
        en: "The FTP specification: the dual-channel model and active vs passive modes — the complete dissection reference",
      },
    },
    {
      sourceId: "rfc854",
      note: {
        ar: "Telnet الذي خلفه SSH: لماذا هجرنا الإدارة النصية غير المشفرة — القصة التاريخية للدرس",
        en: "The Telnet that SSH replaced: why we abandoned unencrypted text management — the lesson's historical story",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "مناقشة نقل الملفات في فصل التطبيقات: مقارنة FTP ببدائله وحدود القناتين",
        en: "The file-transfer discussion in the applications chapter: FTP vs its alternatives and the dual-channel tradeoffs",
      },
    },
  ],

  l079: [
    {
      sourceId: "rfc768",
      note: {
        ar: "NTP يعمل فوق UDP في المنفذ 123 — أساس النقل الخفيف الذي يشرحه الدرس",
        en: "NTP runs over UDP on port 123 — the lightweight transport basis this lesson explains",
      },
    },
    {
      sourceId: "rfc2827",
      note: {
        ar: "أمن NTP: هجمات التضخيم والانعكاس (monlist) وترشيح الدخول كخط دفاع — جزء الأمن في الدرس",
        en: "NTP security: amplification/reflection (monlist) attacks and ingress filtering as a line of defense — the lesson's security part",
      },
    },
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "تحليل حزم NTP الملتقطة لفهم الطبقات (Strata) وسلوك الاستعلام — التطبيق العملي",
        en: "Analyzing captured NTP packets to understand strata and query behavior — the applied exercise",
      },
    },
  ],

  l080: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم شبكات توصيل المحتوى (CDN): نقاط الحضور والاختيار العنقودي والاختيار بـ Anycast",
        en: "The content-distribution networks section: PoPs, cluster selection and anycast-based selection",
      },
    },
    {
      sourceId: "rfc9110",
      note: {
        ar: "دلالات HTTP التي ترتكز عليها واجهات REST: الأفعال والترويسات وسلوك الكاش",
        en: "The HTTP semantics REST APIs build on: methods, headers and caching behavior",
      },
    },
    {
      sourceId: "mit-6.858",
      note: {
        ar: "أمان واجهات APIs: رموز الجلسات والصلاحيات — الجانب الأمني لخدمات الويب الحديثة",
        en: "API security: session tokens and authority — the security side of modern web services",
      },
    },
  ],

  // ══════════════════ m09 · Network Security (l081–l090) ══════════════════

  l081: [
    {
      sourceId: "anderson-security-eng",
      note: {
        ar: "خريطة التهديدات من منظور مهندس الأمن: الثقة مورد اقتصادي والمهاجم يفكر بالتكلفة والعائد",
        en: "The threat landscape from the security engineer's viewpoint: trust as an economic resource and the attacker's cost-benefit mindset",
      },
    },
    {
      sourceId: "nmap-book",
      note: {
        ar: "الاستطلاع عملياً: كيف يمسح المهاجم الشبكة قبل الضربة — كتاب Nmap من منظور سلسلة الهجوم",
        en: "Reconnaissance in practice: how an attacker scans the network before striking — the Nmap book from the kill-chain's perspective",
      },
    },
    {
      sourceId: "mit-6.858",
      note: {
        ar: "عقلية الهجوم والدفاع في مختبرات MIT: كيف يُبنى دفتر الخصم قبل بناء الدفاع",
        en: "The attack-defense mindset in MIT's labs: how the adversary's playbook is built before the defense",
      },
    },
    {
      sourceId: "berkeley-cs161",
      note: {
        ar: "مبادئ أمن الحاسوب: ثالوث CIA والنمذجة التهديدية كمنهج دراسي جامعي",
        en: "Computer-security principles: the CIA triad and threat modeling as a university discipline",
      },
    },
  ],

  l082: [
    {
      sourceId: "cheswick-firewalls",
      note: {
        ar: "الكتاب المرجعي في الجدران النارية: من المرشح البسيط إلى الفلسفة الأمنية الكاملة وفلسفة «الطعم والمراقبة»",
        en: "The reference book on firewalls: from simple packet filters to a complete security philosophy and the 'bait and watch' doctrine",
      },
    },
    {
      sourceId: "nist-sp800-94",
      note: {
        ar: "علاقة أنظمة الكشف بجدران الحماية — الدفاع المتكامل الذي يوصي به دليل NIST",
        en: "The relationship of detection systems to firewalls — the layered defense recommended by the NIST guide",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "الجانب العملي لضبط الجدران ومناطق الأمان على IOS في منهج CCNA",
        en: "The practical side of configuring firewalls and security zones on IOS in the CCNA curriculum",
      },
    },
  ],

  l083: [
    {
      sourceId: "nist-sp800-94",
      note: {
        ar: "الدليل المعياري الشامل لأنظمة كشف ومنع الاختراق: الكشف بالتوقيت مقابل الشذوذ وأنماط الفشل وموضعية النشر",
        en: "The comprehensive NIST guide to IDPS: signature vs anomaly detection, failure modes and deployment placement",
      },
    },
    {
      sourceId: "cheswick-firewalls",
      note: {
        ar: "قصص الرصد التاريخية من مؤلفي الكتاب: مراقبة المهاجم في الزمن الحقيقي (قصة Berferd) — أصل فكرة IDS",
        en: "Historical detection stories from the book's authors: watching a hacker in real time (the Berferd affair) — the origin of the IDS idea",
      },
    },
    {
      sourceId: "berkeley-cs161",
      note: {
        ar: "مفاهيم الدفاع في العمق والكشف ضمن مناهج الأمن الجامعية — العمق النظري لأنظمة الحماية",
        en: "Defense-in-depth and detection concepts in university security curricula — the theoretical depth behind protection systems",
      },
    },
  ],

  l084: [
    {
      sourceId: "rfc8446",
      note: {
        ar: "الأساس التشفيري الحديث للأنفاق: مصافحة TLS ومفاتيح الجلسة وسرعة الإعادة الأمامية",
        en: "The modern cryptographic basis of tunnels: the TLS handshake, session keys and forward secrecy",
      },
    },
    {
      sourceId: "nist-sp800-207",
      note: {
        ar: "موقع VPN التقليدي من هندسة الثقة الصفرية: من الثقة بالموقع إلى الثقة بالهوية والجهاز",
        en: "The traditional VPN's place in zero-trust architecture: from location trust to identity and device trust",
      },
    },
    {
      sourceId: "anderson-security-eng",
      note: {
        ar: "هندسة الأنفاق والشبكات الخاصة الافتراضية: مقايضات الأمن في الربط البعيد وتقييم WireGuard",
        en: "The engineering of tunnels and VPNs: the security tradeoffs of remote access and an assessment of WireGuard",
      },
    },
  ],

  l085: [
    {
      sourceId: "nist-sp800-48",
      note: {
        ar: "الدليل المعياري لأمن 802.11: لماذا فشل WEP وما الذي فرضه WPA2 وWPA3 (SAE وPMF)",
        en: "The standard guide to 802.11 security: why WEP failed and what WPA2/WPA3 (SAE, PMF) mandate",
      },
    },
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "تطور آليات الأمن في تعديلات المواصفة: من WEP إلى مصادقة SAE في الجيل الأحدث",
        en: "The evolution of security mechanisms in the standard's amendments: from WEP to SAE authentication in the newest generation",
      },
    },
    {
      sourceId: "anderson-security-eng",
      note: {
        ar: "التحليل التشفيري لانهيار WEP: حالة دراسية في هندسة أمن الشبكات اللاسلكية",
        en: "The cryptographic analysis of WEP's collapse: a case study in wireless security engineering",
      },
    },
  ],

  l086: [
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "بروتوكولات AAA (RADIUS وTACACS+) وفروقهما الدقيقة كما يدرسها منهج سيسكو للتشغيل",
        en: "The AAA protocols (RADIUS and TACACS+) and their subtle differences as Cisco's curriculum teaches them",
      },
    },
    {
      sourceId: "iso-27001",
      note: {
        ar: "ضوابط التحكم بالوصول وهوية المستخدمين في نظام إدارة أمن المعلومات — الإطار الإداري لـ AAA",
        en: "Access-control and user-identity controls in the ISMS — the management framework behind AAA",
      },
    },
    {
      sourceId: "mit-6.858",
      note: {
        ar: "المصادقة بعمقها الأكاديمي: من كلمات المرور إلى المفاتيح والرموز المتغيرة",
        en: "Authentication at academic depth: from passwords to keys and one-time tokens",
      },
    },
  ],

  l087: [
    {
      sourceId: "nist-sp800-48",
      note: {
        ar: "توصية NIST المركزية: 802.1X مع EAP-TLS كبوابة ولوج مؤسسية للشبكة — أساس نموذج الأدوار الثلاثة",
        en: "NIST's central recommendation: 802.1X with EAP-TLS as the enterprise's network admission gate — the basis of the three-role model",
      },
    },
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "تطبيقات 802.1X في الشبكات اللاسلكية المؤسسية (WPA-Enterprise) — نموذج الاستخدام الأكبر",
        en: "802.1X usage in enterprise wireless networks (WPA-Enterprise) — the biggest deployment model",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "ضبط dot1x على منافذ المبدّل وخيارات الأجهزة غير القادرة (MAB) — الجانب التشغيلي",
        en: "Configuring dot1x on switch ports and options for incapable devices (MAB) — the operational side",
      },
    },
  ],

  l088: [
    {
      sourceId: "rfc2827",
      note: {
        ar: "ترشيح الدخول (BCP 38): قطع تزييف المصادر الذي يغذي هجمات الانعكاس والتضخيم — خط الدفاع الأول",
        en: "Ingress filtering (BCP 38): cutting the source spoofing that fuels reflection and amplification attacks — the first line of defense",
      },
    },
    {
      sourceId: "rfc4987",
      note: {
        ar: "الفهرس الشامل لفيضانات SYN وعلاجاتها: من SYN Cookies إلى ضبط طوابير الاتصال",
        en: "The exhaustive catalog of SYN floods and their mitigations: from SYN cookies to connection-backlog tuning",
      },
    },
    {
      sourceId: "nist-sp800-61",
      note: {
        ar: "الاستجابة للحوادث أثناء هجمات حجب الخدمة: منهجية الاحتواء والتخفيف والاتصال",
        en: "Incident response during denial-of-service attacks: the containment, mitigation and communications methodology",
      },
    },
  ],

  l089: [
    {
      sourceId: "ieee-802-1q",
      note: {
        ar: "البنية المعيارية للتقسيم المنطقي التي تُبنى عليها مناطق الحماية والشبكات الافتراضية المعزولة",
        en: "The standard basis of logical segmentation on which security zones and isolated virtual networks are built",
      },
    },
    {
      sourceId: "cisco-vlan-guide",
      note: {
        ar: "أنماط التقسيم على منافذ IOS: منافذ الوصول والمناطق المعزولة وقوائم الجذوع المسموحة",
        en: "Segmentation patterns on IOS ports: access ports, isolated zones and allowed trunk lists",
      },
    },
    {
      sourceId: "nist-sp800-207",
      note: {
        ar: "التقطيع الدقيق (Microsegmentation) كأثر مباشر لتفكير الثقة الصفرية: سياسة لكل حمل عمل",
        en: "Microsegmentation as a direct consequence of zero-trust thinking: policy per workload",
      },
    },
    {
      sourceId: "iso-27001",
      note: {
        ar: "فصل الشبكات وتقسيمها كضابط رسمي في نظام إدارة أمن المعلومات — الوجه الإداري للتقطيع",
        en: "Network segregation as a formal control in the ISMS — the governance face of segmentation",
      },
    },
  ],

  l090: [
    {
      sourceId: "nist-sp800-207",
      note: {
        ar: "المرجع الأم للهندسة: «لا تثق أبداً، تحقق دائماً» ومحرك السياسة ونقاط الإنفاذ — مصدر كل ركائز الدرس",
        en: "The architecture's parent reference: 'never trust, always verify', the policy engine and enforcement points — the source of every pillar in this lesson",
      },
    },
    {
      sourceId: "anderson-security-eng",
      note: {
        ar: "سقوط نموذج الحصن: تحليل أسباب فشل الثقة بالمحيط — التربة التي نبتت منها الثقة الصفرية",
        en: "The fall of the castle model: an analysis of why perimeter trust failed — the soil zero trust grew from",
      },
    },
    {
      sourceId: "iso-27001",
      note: {
        ar: "إدارة المخاطر المستمرة والتحقق الدائم كممارسة إدارية معيارية — الوجه الإداري للثقة الصفرية",
        en: "Continuous risk management and continuous verification as standard management practice — zero trust's governance face",
      },
    },
  ],

  // ══════════════════ m10 · Advanced & Career (l091–l100) ══════════════════

  l091: [
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "الفيزياء الراديوية المعيارية: القنوات وعرضها في نطاقات 2.4/5/6 GHz — المرجع الأم لخريطة القنوات",
        en: "The standard's radio physics: channels and widths across the 2.4/5/6 GHz bands — the parent reference for the channel map",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "أساسيات الطيف والتردد وقوة الإشارة ومفهوم SNR وسعة Shannon — الفيزياء التي يقف عليها الدرس",
        en: "Spectrum, frequency, signal strength, SNR and Shannon capacity fundamentals — the physics this lesson stands on",
      },
    },
    {
      sourceId: "nist-sp800-48",
      note: {
        ar: "قراءة القوة والتغطية ضمن مخاطر التنصت اللاسلكي — البعد الأمني لقياسات dBm",
        en: "Reading signal power and coverage amid wireless eavesdropping risks — the security dimension of dBm readings",
      },
    },
  ],

  l092: [
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "سلسلة التعديلات الرسمية b/a/g/n/ac/ax/be وما أضافته MIMO وMU-MIMO وOFDMA وMLO — السجل المعياري للأجيال",
        en: "The official chain of b/a/g/n/ac/ax/be amendments and what MIMO, MU-MIMO, OFDMA and MLO each added — the normative record of the generations",
      },
    },
    {
      sourceId: "nist-sp800-48",
      note: {
        ar: "تطور الأمن عبر الأجيال من WEP إلى WPA3 — الخط الزمني الأمني الموازي لتطور السرعات",
        en: "Security evolution across the generations from WEP to WPA3 — the parallel security timeline to the speed evolution",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "تغطية المرجع لتطور معايير 802.11 وطرقها الفيزيائية عبر الأجيال — العمق التاريخي",
        en: "The reference's coverage of 802.11 standards evolution and their PHY methods across generations — the historical depth",
      },
    },
  ],

  l093: [
    {
      sourceId: "nist-sp800-48",
      note: {
        ar: "توصية المسح الموقعي الرسمية: اكتشاف التغطية الفعلية ونقاط الوصول المارقة قبل الاعتماد",
        en: "The official site-survey recommendation: discovering actual coverage and rogue access points before sign-off",
      },
    },
    {
      sourceId: "ieee-802-11",
      note: {
        ar: "معايير التجوال 802.11k/v/r التي تُبنى عليها حركة المستخدم السلسة — مرجع قسم التنقل",
        en: "The 802.11k/v/r roaming standards on which seamless user mobility is built — the roaming section's reference",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "منهجية التصميم للسعة لا التغطية فقط وقواعد توزيع نقاط الوصول — الخبرة الميدانية",
        en: "The design-for-capacity-not-just-coverage methodology and AP placement rules — the field experience",
      },
    },
  ],

  l094: [
    {
      sourceId: "kurose-ross",
      note: {
        ar: "فصول مستوى التحكم وSDN في الكتاب: واجهات الشمال والجنوب وفكرة التحكم المركزي — العرض الأكاديمي المرجعي",
        en: "The book's control-plane and SDN chapters: northbound/southbound interfaces and the centralized-control idea — the reference academic treatment",
      },
    },
    {
      sourceId: "tanenbaum-networks",
      note: {
        ar: "مناقشة SDN في الطبعة السادسة: من الفكرة إلى التحكم المبرمج في الشبكة — السياق التاريخي",
        en: "The SDN discussion in the sixth edition: from idea to programmable network control — the historical context",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "محاضرات Stanford عن فصل المستويات والتحكم المركزي — المدرسة التي وُلد فيها OpenFlow",
        en: "Stanford's lectures on plane separation and centralized control — the school where OpenFlow was born",
      },
    },
  ],

  l095: [
    {
      sourceId: "nist-sp800-145",
      note: {
        ar: "تعريف NIST الرسمي للحوسبة السحابية وخصائصها الخمس — الأرضية المشتركة لمصطلحات الدرس",
        en: "NIST's official definition of cloud computing and its five characteristics — the shared terminological ground for this lesson",
      },
    },
    {
      sourceId: "aws-vpc",
      note: {
        ar: "دليل VPC المرجعي: الشبكات الفرعية العامة والخاصة وجداول التوجيه وفرق Security Groups عن NACLs وPeering وTransit Gateway",
        en: "The VPC reference guide: public/private subnets, route tables, Security Groups vs NACLs, peering and Transit Gateway",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "شبكات السحابة والربط الهجين في منهج CCNA المعاصر — الجسر بين التقليدي والسحابي",
        en: "Cloud networking and hybrid connectivity in the contemporary CCNA curriculum — the bridge between traditional and cloud",
      },
    },
  ],

  l096: [
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "مدخل CCNA للأتمتة: مصدر الحقيقة وأدوات إدارة التهيئة وAnsible — نقطة الانطلاق العملية",
        en: "CCNA's introduction to automation: source of truth, configuration management tools and Ansible — the practical starting point",
      },
    },
    {
      sourceId: "nmap-book",
      note: {
        ar: "محرك البرمجة النصية (NSE) في Nmap: أتمتة مهام الشبكة بلغة Lua — نموذج مبكر للأتمتة المبرمجة",
        en: "Nmap's scripting engine (NSE): automating network tasks with Lua — an early model of scripted automation",
      },
    },
    {
      sourceId: "aws-vpc",
      note: {
        ar: "إدارة الشبكة عبر الواجهات البرمجية (APIs) — النموذج السحابي الذي تحتذي به أتمتة الشبكات الحديثة",
        en: "Managing networks through APIs — the cloud model that modern network automation follows",
      },
    },
  ],

  l097: [
    {
      sourceId: "ieee-802-1q",
      note: {
        ar: "أساس التقسيم المنطقي الذي توسّعه طبقة VXLAN العليا بمعرفات VNIs — الجذر المعياري للفكرة",
        en: "The logical-segmentation basis that the VXLAN overlay extends with VNIs — the idea's standard root",
      },
    },
    {
      sourceId: "rfc4271",
      note: {
        ar: "BGP طائرةَ تحكمٍ لـ EVPN فوق نسيج Spine-Leaf — إعادة توظيف مواصفة الإنترنت في مراكز البيانات",
        en: "BGP as the control plane for EVPN over a Spine-Leaf fabric — re-tasking the Internet's workhorse for the datacenter",
      },
    },
    {
      sourceId: "kurose-ross",
      note: {
        ar: "قسم شبكات مراكز البيانات في الكتاب: هيكلة الطبقات وحركة مرور الشرق-غرب — الإطار التصميمي",
        en: "The book's data-center networking section: topology structure and east-west traffic — the design frame",
      },
    },
  ],

  l098: [
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "المرجع الرسمي لتحليل الحزم: المرشحات والإحصاءات ورسوم I/O — عين المهندس التي لا تنام",
        en: "The official packet-analysis reference: filters, statistics and I/O graphs — the engineer's ever-watchful eye",
      },
    },
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "منهج CCNA للرصد: SNMP وSyslog بمستوياته الثمانية وNetFlow — الأدوات اليومية",
        en: "CCNA's monitoring approach: SNMP, syslog with its eight levels and NetFlow — the daily tools",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "قراءة سلوك البروتوكول من الملتقطات الحقيقية — أساس الملاحظة العميقة قبل عصر المراصد الحديثة",
        en: "Reading protocol behavior from real captures — the basis of deep observation before the modern observability era",
      },
    },
  ],

  l099: [
    {
      sourceId: "nist-sp800-61",
      note: {
        ar: "منهجية الاستجابة للحوادث كنموذج منضبط للتشخيص الاحترافي: التعريف الدقيق ثم التصنيف ثم المعالجة",
        en: "The incident-response methodology as a disciplined model for professional diagnosis: precise definition, classification, then treatment",
      },
    },
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "سير العمل التشخيصي بالتحليل المرئي للحزم خطوة خطوة — أداة دراسة الحالة الرئيسة",
        en: "The step-by-step diagnostic workflow of visual packet analysis — the case study's main tool",
      },
    },
    {
      sourceId: "stevens-tcpip",
      note: {
        ar: "دراسات الحالة الكلاسيكية: تتبع الأعطال من الأعراض إلى السبب الجذري — النمط الأصلي لدراسة الحالة",
        en: "Classic case studies: tracing faults from symptoms to root cause — the original pattern for the case study",
      },
    },
    {
      sourceId: "durumeric-heartbleed",
      note: {
        ar: "منهجية قياس واسعة النطاق لتشخيص أثر عطل عالمي — دراسة الحالة العلمية بامتياز",
        en: "A wide-scale measurement methodology for diagnosing a global flaw — the scientific case study par excellence",
      },
    },
  ],

  l100: [
    {
      sourceId: "cisco-netacad",
      note: {
        ar: "مسار الشهادات من Network+ وCCNA إلى تخصصات CCNP — الخريطة المهنية المعتمدة التي يرسمها الدرس",
        en: "The certification path from Network+ and CCNA to CCNP specializations — the official career map this lesson draws",
      },
    },
    {
      sourceId: "wireshark-guide",
      note: {
        ar: "بناء الخبرة العملية بتحليل حزم حقيقية — مختبر مجاني ومتاح لكل متعلم لا يملك معهج معدات",
        en: "Building real expertise by analyzing real packets — a free lab accessible to every learner without lab hardware",
      },
    },
    {
      sourceId: "stanford-cs144",
      note: {
        ar: "الأساس الأكاديمي المفتوح: مقرر Stanford بمراجعه المتاحة — مرجع التعلم الذاتي المنظم في المقابلات",
        en: "The open academic foundation: Stanford's course with its available materials — structured self-study reference for interviews",
      },
    },
  ],
  ...M11_LESSON_SOURCES,
  ...M12_LESSON_SOURCES,
  ...M13_LESSON_SOURCES,
  ...M14_LESSON_SOURCES,
  ...M15_LESSON_SOURCES,
};
