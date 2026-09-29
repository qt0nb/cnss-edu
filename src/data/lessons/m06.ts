import type { Lesson } from "@/lib/types";

// Module 06: Routing Protocols — بروتوكولات التوجيه
// Lessons l051-l060, level: advanced

export const m06_LESSONS: Lesson[] = [
  {
    id: "l051",
    moduleId: "m06",
    order: 1,
    level: "advanced",
    title: { ar: "تشريح جدول التوجيه: خريطة عقل الموجّه", en: "Routing Table Anatomy: The Router's Mental Map" },
    summary: {
      ar: "قراءة مخرجات show ip route باحتراف: الرموز والمسافة الإدارية والمقياس وبوابة الملاذ الأخير — وكيف يختار الموجّه بين مسارين لنفس الوجهة.",
      en: "Reading show ip route output like a pro: codes, administrative distance, metric, and the gateway of last resort — plus how a router chooses between two paths to one destination.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ماذا يحدث عند وصول حزمة؟", en: "What Happens When a Packet Arrives?" },
        body: {
          ar: "عند وصول حزمة إلى واجهة موجّه، تبدأ رحلة قرار دقيقة في أجزاء من الميكروثانية: استخراج عنوان الوجهة، ثم البحث في جدول التوجيه عن أطول بادئة تطابقه، ثم إرسال الحزمة عبر الواجهة الفائزة.\n\nجدول التوجيه (Routing Table) ليس خريطة الإنترنت — إنه قائمة المسارات التي يعرفها هذا الموجّه بالذات: شبكاته المباشرة، ومسارات ثابتة أضفتها، ومسارات تعلمها من بروتوكولات التوجيه الديناميكية.\n\n- كل سطر في الجدول = مسار واحد (Route) نحو شبكة وجهة\n- الجدول يجمع مصادر متعددة ويرتبها بذكاء\n- الهدف النهائي لكل سطر: إلى أين أرسل الحزمة تالياً؟",
          en: "When a packet arrives on a router interface, a decision journey starts in microseconds: extract the destination address, search the routing table for the longest matching prefix, then forward the packet out the winning interface.\n\nThe routing table is not a map of the Internet — it is the list of routes this particular router knows: its directly connected networks, static routes you added, and routes learned from dynamic routing protocols.\n\n- Each table line = one route toward a destination network\n- The table blends multiple sources and ranks them intelligently\n- Every line's final question: where do I send the packet next?",
        },
        code: {
          lang: "cisco",
          snippet: "Router# show ip route\ncodes: L - local, C - connected, S - static, R - RIP, O - OSPF,\n       D - EIGRP, B - BGP, * - candidate default\n\nGateway of last resort is 203.0.113.1 to network 0.0.0.0\n\nO*E2 0.0.0.0/0 [110/1] via 203.0.113.1, 00:12:33, Serial0/0/0\n     10.0.0.0/8 is variably subnetted, 4 subnets, 2 masks\nC       10.1.1.0/24 is directly connected, GigabitEthernet0/0\nL       10.1.1.1/32 is directly connected, GigabitEthernet0/0\nO       10.2.0.0/16 [110/65] via 10.1.1.2, 00:05:12, Gi0/0\nD       10.3.5.0/24 [90/3072] via 10.1.1.3, 00:08:44, Gi0/0",
        },
      },
      {
        heading: { ar: "رموز المصدر: من أين جاء المسار؟", en: "Source Codes: Where Did the Route Come From?" },
        body: {
          ar: "أول حرف في كل سطر يخبرك بمصدر المسار — تعلم هذه الأحرف كما تتعلم الأبجدية:\n\n- L (Local): عنوان الواجهة نفسها كمسار مضيف /32 — تلقائي لكل عنوان تعيّنه\n- C (Connected): الشبكة الموصلة مباشرة عبر الواجهة — المصدر الأوثق (AD = 0)\n- S (Static): مسار أضفته يدوياً (AD = 1)\n- R: مسار من RIP (AD = 120)\n- O: مسار من OSPF (AD = 110)، و O* يعني مرشحاً افتراضياً\n- D: من EIGRP (AD = 90)، و D EX مسار خارجي (AD = 170)\n- B: من BGP (AD = 20 خارجي، 200 داخلي)\n\nلاحظ السطر L لكل عنوان: هذه ميزة IOS الحديثة — مسار /32 لعنوان الواجهة ذاته يضمن دقة الانتقال.\n\nعلامة * (النجمة) على أي مسار تعني أنه مرشح افتراضي — مسار للشبكات التي لا تطابق شيئاً آخر، وسطر Gateway of last resort يلخصه.",
          en: "The first character of each line tells you the route's source — learn these letters like the alphabet:\n\n- L (Local): the interface's own address as a /32 host route — automatic for every configured address\n- C (Connected): the network directly attached via the interface — the most trusted source (AD = 0)\n- S (Static): a route you added by hand (AD = 1)\n- R: from RIP (AD = 120)\n- O: from OSPF (AD = 110); O* means a default candidate\n- D: from EIGRP (AD = 90); D EX is external (AD = 170)\n- B: from BGP (AD = 20 external, 200 internal)\n\nNote the L line for every address: a modern IOS feature — a /32 for the interface's own address ensuring precise forwarding.\n\nA * (star) on any route marks a default candidate — the path for networks matching nothing else, summarized by the Gateway of last resort line.",
        },
        tip: {
          ar: "أمر show ip route protocol=ospf (أو static أو rip) يعرض مسارات مصدر واحد فقط — اختصار ثمين عند استكشاف الخلل في بروتوكول محدد.",
          en: "The command show ip route ospf (or static, or rip) filters a single source — a precious shortcut when troubleshooting one specific protocol.",
        },
      },
      {
        heading: { ar: "المسافة الإدارية: من الأصدق؟", en: "Administrative Distance: Who Is More Trusted?" },
        body: {
          ar: "المسافة الإدارية (Administrative Distance - AD) قيمة من 0 إلى 255 تحدد مدى ثقة الموجّه بالمصدر نفسه — لا بالمسار:\n\n- 0: شبكة موصولة مباشرة (لا شيء يهزمها)\n- 1: مسار ثابت (يدك أنت)\n- 90: EIGRP الداخلي\n- 110: OSPF\n- 120: RIP\n- 170: EIGRP الخارجي\n- 20: eBGP و 200: iBGP\n- 255: غير معروف — يُتجاهل تماماً\n\nالسيناريو الحاسم: OSPF و RIP يعلنان المسار نفسه 10.2.0.0/16. OSPF له AD 110 مقابل 120 لـ RIP — فيثبت مسار OSPF ويرفض الموجّه مسار RIP حتى لو كان أفضل جودة فعلياً!\n\nالقاعدة الذهبية: AD تُقارن بين المصادر فقط عندما تتعلم المسار نفسه من أكثر من مصدر — وهي أول مرشّح بعد تطابق البادئة، قبل المقارنة بالأرقام داخل البروتوكول الواحد.",
          en: "Administrative Distance (AD) is a 0-255 value rating how much the router trusts the source itself — not the path:\n\n- 0: directly connected (nothing beats it)\n- 1: static route (your own hand)\n- 90: internal EIGRP\n- 110: OSPF\n- 120: RIP\n- 170: external EIGRP\n- 20: eBGP and 200: iBGP\n- 255: unknown — completely ignored\n\nThe decisive scenario: OSPF and RIP both announce the same 10.2.0.0/16 route. OSPF holds AD 110 versus RIP's 120 — OSPF's route installs and RIP's is rejected even if it were factually better!\n\nGolden rule: AD is compared across sources only when the same route arrives from more than one source — it is the first tiebreaker after prefix match, before any in-protocol metric comparison.",
        },
      },
      {
        heading: { ar: "المقياس والمسار الافتراضي", en: "The Metric and the Default Route" },
        body: {
          ar: "المقياس (Metric) يختلف عن AD جوهرياً: AD تقارن بين المصادر، والمقياس يقارن بين المسارات داخل المصدر الواحد — وهو الرقمان داخل القوسين في السطر: [110/65] يعني AD=110 و مقياس=65.\n\nمقاييس البروتوكولات الرئيسة:\n\n- RIP: عدد القفزات (Hops) — بدائي: خط T1 بسرعة 1.5 ميغابت وخط 10 جيجابت يعدّان قفزة واحدة!\n- OSPF: الكلفة (Cost) مبنية على عرض النطاق: 10^8 ÷ عرض النطاق بالبت في الثانية\n- EIGRP: مقياس مركب: عرض النطاق الأدنى عبر المسار + مجموع التأخيرات (وزن K1 و K3 افتراضياً)\n- BGP: لا مقياس رقمي بسيط — مجموعة سمات سياسات (سنتعمق في درس BGP)\n\nوأخيراً: مسار الملاذ الأخير (Default Route) هو المسار 0.0.0.0/0 — أقصر بادئة ممكنة، فلا يفوز في المطابقة أبداً إلا حين تفشل كل المسارات الأخرى. سطر Gateway of last resort في أعلى الجدول هو توقيعه الرسمي.",
          en: "The metric is fundamentally different from AD: AD compares sources; the metric compares routes within one source — the two numbers inside the brackets: [110/65] means AD=110 and metric=65.\n\nThe major protocols' metrics:\n\n- RIP: hop count — primitive: a 1.5 Mbps T1 and a 10 Gbps line both count as one hop!\n- OSPF: cost built on bandwidth: 10^8 ÷ bandwidth in bits per second\n- EIGRP: composite metric: minimum bandwidth along the path + summed delay (K1 and K3 weighted by default)\n- BGP: no simple numeric metric — a set of policy attributes (deep-dived in the BGP lesson)\n\nFinally: the default route is the 0.0.0.0/0 route — the shortest prefix possible, so it never wins matching unless every other route fails. The Gateway of last resort line atop the table is its formal signature.",
        },
      },
      {
        heading: { ar: "بنية سطر المسار: قراءة تفصيلية", en: "Route Line Anatomy: A Detailed Read" },
        body: {
          ar: "لنفكك سطراً واحداً حرفاً حرفاً — هذه مهارة يومية لأي مهندس شبكات:\n\nO       10.2.0.0/16 [110/65] via 10.1.1.2, 00:05:12, Gi0/0\n\n- O: المصدر OSPF\n- 10.2.0.0/16: شبكة الوجهة والبادئة\n- [110/65]: المسافة الإدارية / المقياس\n- via 10.1.1.2: القفزة التالية — الموجّه التالي في الرحلة\n- 00:05:12: عمر المسار منذ تعلمه (5 دقائق و12 ثانية)\n- Gi0/0: واجهة الخروج نحو القفزة التالية\n\nهذه الأعمدة الست تجيب عن كل أسئلة الاستكشاف: من أين جاء المسار؟ كم عمره؟ عبر من يخرج؟ بأي ثقة؟\n\nملاحظة تحقق عملية: ping من الموجّه يستهلك عناوين واجهاته مصدراً — لذا ping يعمل من أجل المسار لا يثبت وصول مضيف معين بالضرورة.",
          en: "Let us dissect one line character by character — a daily skill for any network engineer:\n\nO       10.2.0.0/16 [110/65] via 10.1.1.2, 00:05:12, Gi0/0\n\n- O: source OSPF\n- 10.2.0.0/16: destination network and prefix\n- [110/65]: administrative distance / metric\n- via 10.1.1.2: the next hop — the next router on the journey\n- 00:05:12: route age since it was learned (5 minutes 12 seconds)\n- Gi0/0: exit interface toward that next hop\n\nThese six columns answer every troubleshooting question: where did the route come from, how old is it, through whom does it exit, with how much trust?\n\nA practical verification note: a ping from the router uses its own interface addresses as source — so a working ping validates the path, not necessarily one specific host's reachability.",
        },
      },
    ],
    keyPoints: [
      { ar: "جدول التوجيه = شبكات موصولة + مسارات ثابتة + مسارات بروتوكولات ديناميكية", en: "Routing table = connected networks + static routes + dynamic protocol routes" },
      { ar: "الرموز: C موصول، S ثابت، O بـ OSPF، D بـ EIGRP، R بـ RIP، B بـ BGP", en: "Codes: C connected, S static, O OSPF, D EIGRP, R RIP, B BGP" },
      { ar: "AD تقارن المصادر: 0 متصل، 1 ثابت، 90 EIGRP، 110 OSPF، 120 RIP", en: "AD compares sources: 0 connected, 1 static, 90 EIGRP, 110 OSPF, 120 RIP" },
      { ar: "المقياس يقارن المسارات داخل البروتوكول نفسه وهو الرقم الثاني في القوسين", en: "The metric compares routes within one protocol — the second number in brackets" },
      { ar: "0.0.0.0/0 = بوابة الملاذ الأخير: أقصر بادئة تفشل في المطابقة مع كل شيء آخر", en: "0.0.0.0/0 = gateway of last resort: shortest prefix, matching only when everything else fails" },
    ],
    commands: [
      { cmd: "show ip route", desc: { ar: "عرض الجدول الكامل — أمرك اليومي الأول والأخير", en: "Show the full table — your daily first and last command" } },
      { cmd: "show ip route static", desc: { ar: "تصفية مسارات المصدر الثابت فقط", en: "Filter to static-source routes only" } },
      { cmd: "show ip route 10.2.0.0", desc: { ar: "استعلام أفضل مسار نحو شبكة بعينها مع تفاصيله", en: "Query the best route toward one network with its details" } },
      { cmd: "ip route show", desc: { ar: "نظير لينكس: عرض الجدول بأمر ip", en: "The Linux equivalent: table via the ip command" } },
    ],
    quiz: [
      {
        q: { ar: "موجّه تعلم المسار 172.16.0.0/12 من OSPF و RIP معاً. أيهما يثبت في الجدول؟", en: "A router learned 172.16.0.0/12 from both OSPF and RIP. Which installs?" },
        options: [
          { ar: "مسار RIP لأنه أقدم بروتوكولاً", en: "The RIP route because RIP is the older protocol" },
          { ar: "مسار OSPF لأن مسافته الإدارية 110 أقل من 120", en: "The OSPF route because its AD of 110 beats 120" },
          { ar: "كلاهما مع موازنة الأحمال", en: "Both, with load balancing" },
          { ar: "لا شيء — يُتجاهل التكرار", en: "Neither — duplicates are ignored" },
        ],
        correct: 1,
        explain: { ar: "المقارنة الأولى بين المصادر بالمسافة الإدارية: OSPF (110) يهزم RIP (120)، فيثبت مسار OSPF مهما كان مقياس RIP أفضل.", en: "The first comparison across sources is administrative distance: OSPF (110) beats RIP (120), so the OSPF route installs regardless of RIP's metric quality." },
      },
      {
        q: { ar: "ماذا يعني الرقمان [110/65] في سطر مسار OSPF؟", en: "What do the numbers [110/65] mean in an OSPF route line?" },
        options: [
          { ar: "110 = عدد القفزات و 65 = المقياس", en: "110 = hop count and 65 = metric" },
          { ar: "110 = المسافة الإدارية و 65 = المقياس", en: "110 = administrative distance and 65 = metric" },
          { ar: "110 = عمر المسار و 65 = الأولوية", en: "110 = route age and 65 = priority" },
          { ar: "110 = المقياس و 65 = المسافة الإدارية", en: "110 = metric and 65 = administrative distance" },
        ],
        correct: 1,
        explain: { ar: "الصيغة [AD/Metric] دائماً: المسافة الإدارية أولاً ثم مقياس البروتوكول. في OSPF الكلفة 65 تعني تقريباً رابطاً بعرض 10 ميغابت مضافاً إليه رابط أسرع.", en: "The format is always [AD/Metric]: administrative distance first, then protocol metric. An OSPF cost of 65 roughly means a 10 Mbps link plus a faster one along the path." },
      },
      {
        q: { ar: "سطر Gateway of last resort يعني أن الموجّه:", en: "A Gateway of last resort line means the router:" },
        options: [
          { ar: "ليس لديه أي مسارات سوى الافتراضي", en: "Has no routes except the default" },
          { ar: "لديه مسار 0.0.0.0/0 يُستخدم عند فشل مطابقة كل المسارات الأخرى", en: "Holds a 0.0.0.0/0 route used when all other routes fail to match" },
          { ar: "فقد الاتصال بكل جيرانه", en: "Lost connectivity to all neighbors" },
          { ar: "يعمل بمسافة إدارية 255", en: "Operates at administrative distance 255" },
        ],
        correct: 1,
        explain: { ar: "المسار الافتراضي 0.0.0.0/0 بادئته صفرية الطول فتطابق أي عنوان، لكنها الأقصر — فلا تُختار إلا عند عدم مطابقة أي مسار أطول بادئة.", en: "The 0.0.0.0/0 route has a zero-length prefix matching any address, yet the shortest — chosen only when no longer-prefix route matches." },
      },
    ],
  },
  {
    id: "l052",
    moduleId: "m06",
    order: 2,
    level: "advanced",
    title: { ar: "المسارات الثابتة والافتراضية: التوجيه بيدك", en: "Static & Default Routes: Routing by Hand" },
    summary: {
      ar: "صيغة ip route بكل خياراتها، والفروق الجوهرية بين القفزة التالية وواجهة الخروج، ومتى تكتب مساراً افتراضياً، مع مخطط ثلاثة موجّهات محلول.",
      en: "The ip route syntax with all its options, the crucial differences between next-hop and exit interface, when to write a default route, and a solved three-router topology.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "بنية الأمر وصيغه الثلاث", en: "The Command Syntax and Its Three Forms" },
        body: {
          ar: "الأمر الجامع للمسارات اليدوية:\n\nip route <شبكة الوجهة> <قناع> <القفزة التالية أو الواجهة أو كلاهما>\n\nالصيغة الأولى — القفزة التالية (Next Hop): ip route 10.2.0.0 255.255.0.0 10.1.1.2 — تقول: كل ما يذهب إلى 10.2.0.0 سلّمه للموجّه ذي العنوان 10.1.1.2.\n\nالصيغة الثانية — واجهة الخروج (Exit Interface): ip route 10.2.0.0 255.255.0.0 s0/0/0 — تقول: أخرجها من الواجهة التسلسلية مباشرة. ممتازة للروابط النقطية (Point-to-Point) حيث لا لبس في الجهة الأخرى.\n\nالصيغة الثالثة — الكاملة المحددة (Fully Specified): ip route 10.2.0.0 255.255.0.0 s0/0/0 10.1.1.2 — الواجهة والقفزة معاً: أدق الصيغ وأكثرها أماناً في الشبكات المعقدة.\n\n- القفزة التالية يجب أن تكون قابلة للوصول (موجودة في الجدول) وإلا رفض الموجّه المسار\n- الواجهة وحدها على إيثرنت تنشئ مشكلة سنعرفها الآن",
          en: "The master command for manual routes:\n\nip route <destination network> <mask> <next hop, interface, or both>\n\nForm one — Next Hop: ip route 10.2.0.0 255.255.0.0 10.1.1.2 — saying: everything bound for 10.2.0.0, hand to the router at 10.1.1.2.\n\nForm two — Exit Interface: ip route 10.2.0.0 255.255.0.0 s0/0/0 — saying: send it out the serial interface directly. Excellent for point-to-point links where the far side is unambiguous.\n\nForm three — Fully Specified: ip route 10.2.0.0 255.255.0.0 s0/0/0 10.1.1.2 — interface and hop together: the most precise and safest form in complex networks.\n\n- The next hop must itself be resolvable (present in the table) or the router rejects the route\n- Interface-only on Ethernet creates a problem we meet right now",
        },
      },
      {
        heading: { ar: "فخ إيثرنت: البحث التكراري و proxy-ARP", en: "The Ethernet Trap: Recursive Lookup & Proxy ARP" },
        body: {
          ar: "عند كتابة القفزة التالية فقط، يضطر الموجّه إلى بحث تكراري (Recursive Lookup): يبحث عن مسار نحو 10.1.1.2 نفسه ليعرف من أي واجهة يخرج — بحثان بدل بحث واحد، لكن صحيحان دائماً.\n\nالطامة عند كتابة واجهة إيثرنت وحدها: الموجّه يظن الوجهة موصولة مباشرة بالواجهة، فيرسل ARP يطلب MAC لعنوان الوجهة النهائي (10.2.5.5 مثلاً) وهو ليس على القسم المحلي أصلاً!\n\nينجو الموقف فقط إذا فعّل الموجّه البعيد proxy-ARP فيجيب بـ MACه الخاص — حل هش يخفي أخطاء التصميم ويضاعف حركة ARP على الشبكات الكبيرة.\n\nالقاعدة العملية الذهبية:\n\n- روابط نقطة-لنقطة (Serial و tun وغيرها): واجهة الخروج وحدها كافية ونظيفة\n- شبكات الإيثرنت المتعددة الوصول: اكتب القفزة التالية دائماً — أو الصيغة الكاملة",
          en: "Writing only the next hop forces a recursive lookup: the router searches for a route toward 10.1.1.2 itself to learn the exit interface — two lookups instead of one, but always correct.\n\nThe disaster hits with interface-only on Ethernet: the router assumes the destination is directly attached, so it ARPs for the final destination address (say 10.2.5.5) which is not on the local segment at all!\n\nThe situation survives only if the far router runs proxy-ARP, answering with its own MAC — a fragile crutch that hides design errors and multiplies ARP traffic on large networks.\n\nThe practical golden rule:\n\n- Point-to-point links (Serial, tunnels, etc.): exit interface alone is sufficient and clean\n- Multi-access Ethernet: always write the next hop — or the fully specified form",
        },
        tip: {
          ar: "الصيغة الكاملة (واجهة + قفزة) تجمع مزايا الطريقتين: بحث واحد بلا تكرار وسلوك صحيح على الإيثرنت — اجعلها عادتك الافتراضية في كل شبكة متعددة الوصول.",
          en: "The fully specified form (interface + hop) combines both advantages: single lookup without recursion and correct Ethernet behavior — make it your default habit on every multi-access network.",
        },
      },
      {
        heading: { ar: "المسار الافتراضي: الأصفار الرباعية", en: "The Default Route: The Quad Zeroes" },
        body: {
          ar: "المسار الافتراضي هو حالة خاصة بسيطة من المسار الثابت — شبكة 0.0.0.0 بقناع 0.0.0.0:\n\nip route 0.0.0.0 0.0.0.0 203.0.113.1\n\nتسمى الأصفار الرباعية (Quad Zeroes) — وبادئتها الفارغة تجعلها تطابق أي عنوان لم تطابقه المسارات الأطول. القراءة العملية: كل ما لا أعرف وجهته بدقة، أرسله للقفزة 203.0.113.1.\n\nأشهر استخدام: موجّه الحدود في الشبكات الصغيرة والمتوسطة — بدل ملايين المسارات نحو الإنترنت، مسار واحد أنيق يشير للمزود.\n\n- يمكن التعبير عنها بصيغة الشبكة والقناع فقط كما في الأمر أعلاه، أو ip route 0.0.0.0 0.0.0.0 s0/0/0\n- المسار الافتراضي الثابت AD = 1 — يهزم أي بروتوكول ديناميكي يعلن مساراً افتراضياً بلا تعديل يدوي",
          en: "The default route is a simple special case of the static route — network 0.0.0.0 with mask 0.0.0.0:\n\nip route 0.0.0.0 0.0.0.0 203.0.113.1\n\nCalled the quad zeroes — its empty prefix matches any address the longer routes miss. Practical reading: everything I cannot precisely place, send to hop 203.0.113.1.\n\nThe classic use: the border router of small and medium networks — instead of millions of Internet routes, one elegant route pointing at the provider.\n\n- Expressible with network+mask as above, or ip route 0.0.0.0 0.0.0.0 s0/0/0\n- A static default holds AD = 1 — beating any dynamic protocol's default without manual tuning",
        },
      },
      {
        heading: { ar: "مخطط محلول: ثلاثة موجّهات متسلسلة", en: "A Solved Topology: Three Routers in Series" },
        body: {
          ar: "شبكة كلاسيكية: ثلاثة موجّهات R1 و R2 و R3 بروابط بينية، وLAN خلف كل منها — سنبني مساراتها الثابتة كاملة:\n\n- LAN1: 10.1.0.0/24 خلف R1 — وLAN2: 10.2.0.0/24 خلف R2 — وLAN3: 10.3.0.0/24 خلف R3\n- رابط R1-R2: 192.168.12.0/30 (عنوانا .1 و .2)\n- رابط R2-R3: 192.168.23.0/30 (عنوانا .1 و .2)\n\nمنظور R1: يعرف LAN1 موصولة والرابط الأول موصول. يجهل LAN2 وLAN3 والرابط الثاني — يحتاج مسارات نحوها، وقفزتها الصحيحة كلها R2 (192.168.12.2).\n\nمنظور R3 بالمرآة: كل ما يجهل قفزته R2 (192.168.23.1).\n\nR2 في المنتصف: قفزته نحو LAN1 هي R1، ونحو LAN3 هي R3.\n\nبديل أنيق للجميع: بدل مسارين عند R1، مسار افتراضي واحد نحو R2 (لأن R2 يملك كل المعرفة) — يعمل ممتازاً في الهياكل الخطية والنجومية.",
          en: "A classic network: three routers R1, R2, R3 with inter-router links and a LAN behind each — we will build its complete static routes:\n\n- LAN1: 10.1.0.0/24 behind R1 — LAN2: 10.2.0.0/24 behind R2 — LAN3: 10.3.0.0/24 behind R3\n- R1-R2 link: 192.168.12.0/30 (addresses .1 and .2)\n- R2-R3 link: 192.168.23.0/30 (addresses .1 and .2)\n\nR1's view: knows LAN1 as connected and the first link as connected. Unknowns: LAN2, LAN3, and the second link — it needs routes toward them, all with the correct next hop R2 (192.168.12.2).\n\nR3's mirror view: everything unknown next-hops to R2 (192.168.23.1).\n\nR2 in the middle: toward LAN1 the hop is R1; toward LAN3 it is R3.\n\nAn elegant alternative for all: instead of two routes at R1, one default toward R2 (since R2 holds all knowledge) — works beautifully in linear and star topologies.",
        },
        code: {
          lang: "cisco",
          snippet: "! R1\nR1(config)# ip route 10.2.0.0 255.255.255.0 192.168.12.2\nR1(config)# ip route 10.3.0.0 255.255.255.0 192.168.12.2\nR1(config)# ip route 192.168.23.0 255.255.255.252 192.168.12.2\n\n! R3 (mirror)\nR3(config)# ip route 10.1.0.0 255.255.255.0 192.168.23.1\nR3(config)# ip route 10.2.0.0 255.255.255.0 192.168.23.1\nR3(config)# ip route 192.168.12.0 255.255.255.252 192.168.23.1\n\n! R2 (middle)\nR2(config)# ip route 10.1.0.0 255.255.255.0 192.168.12.1\nR2(config)# ip route 10.3.0.0 255.255.255.0 192.168.23.2\n\n! Alternative on R1: one default instead\nR1(config)# ip route 0.0.0.0 0.0.0.0 192.168.12.2",
        },
      },
      {
        heading: { ar: "متى المسارات الثابتة ومتى الديناميكية؟", en: "When Static, When Dynamic?" },
        body: {
          ar: "المسارات الثابتة ليست قديمة — إنها أداة صحيحة في مواضع محددة، والديناميكية في مواضع أخرى:\n\nالثابتة مناسبة تماماً عندما:\n\n- الشبكة صغيرة (حتى ~5 موجّهات): الكتابة اليدوية أرخص وأدق من تشغيل بروتوكول\n- طوبولوجيا خطية أو نجمة بسيطة بلا مسارات بديلة\n- موجّه حدود يشير لمزود الخدمة بمسار افتراضي واحد\n- أمن صارم: لا بروتوكول يكشف بنيتك أو يتعلم مساراته\n\nالديناميكية واجبة عندما:\n\n- الشبكة كبيرة أو متنامية: التعديل اليدوي كارثة أخطاء\n- يوجد مسارات بديلة: البروتوكول يحس بالفشل ويعيد التوجيه تلقائياً\n\nالواقع العملي: هجين دائماً — مسار افتراضي ثابت نحو الإنترنت + بروتوكول داخلي (OSPF غالباً) بين الفروع — هذا تصميم أغلب الشركات الفعلية.",
          en: "Static routes are not legacy — they are the right tool in specific places, as dynamic is in others:\n\nStatic fits perfectly when:\n\n- The network is small (up to ~5 routers): manual writing is cheaper and more precise than running a protocol\n- Topology is linear or a simple star with no alternate paths\n- A border router points at the provider with a single default\n- Strict security: no protocol revealing your structure or learning routes\n\nDynamic is mandatory when:\n\n- The network is large or growing: manual edits are an error catastrophe\n- Alternate paths exist: the protocol senses failure and reroutes automatically\n\nPractical reality: always hybrid — a static default toward the Internet plus an interior protocol (usually OSPF) between sites — the actual design of most companies.",
        },
        tip: {
          ar: "بعد كل تعديل مسارات ثابتة تحقق فوراً: show ip route static ثم ping من موجّه إلى LAN البعيد — التحقق المباشر هو الفرق بين مهندس ومجرب.",
          en: "After every static-route change verify immediately: show ip route static then ping from the router toward the far LAN — direct verification is what separates an engineer from an experimenter.",
        },
      },
    ],
    keyPoints: [
      { ar: "الصيغة: ip route <شبكة> <قناع> <قفزة تالية / واجهة / كلاهما>", en: "Syntax: ip route <network> <mask> <next-hop / interface / both>" },
      { ar: "واجهة الإيثرنت وحدها تسبب ARP لعناوين بعيدة — اكتب القفحة التالية دائماً على الشبكات متعددة الوصول", en: "Ethernet interface-only triggers ARP for remote addresses — always write the next hop on multi-access networks" },
      { ar: "المسار الافتراضي: 0.0.0.0 0.0.0.0 — الأصفار الرباعية، أقصر بادئة", en: "The default route: 0.0.0.0 0.0.0.0 — quad zeroes, shortest prefix" },
      { ar: "القفزة التالية يجب أن تكون قابلة للحل في الجدول وإلا رُفض المسار", en: "The next hop must be resolvable in the table or the route is rejected" },
      { ar: "التصميم الواقعي هجين: ثابت نحو الإنترنت + ديناميكي داخلياً", en: "Real-world design is hybrid: static toward the Internet + dynamic inside" },
    ],
    commands: [
      { cmd: "ip route 10.2.0.0 255.255.255.0 192.168.12.2", desc: { ar: "مسار ثابت نحو شبكة بعيدة عبر قفزة تالية", en: "A static route to a remote network via next hop" } },
      { cmd: "show ip route static", desc: { ar: "عرض المسارات الثابتة المثبتة في الجدول", en: "Show static routes installed in the table" } },
      { cmd: "ip route add 10.2.0.0/24 via 192.168.12.2", desc: { ar: "إضافة مسار ثابت على لينكس بالصيغة الحديثة", en: "Add a static route on Linux in modern syntax" } },
      { cmd: "traceroute 10.3.0.10", desc: { ar: "تتبع المسار للتحقق من صحة التوجيه الجديد", en: "Trace the path to verify the new routing" } },
    ],
    quiz: [
      {
        q: { ar: "ما مشكلة كتابة واجهة إيثرنت وحدها في مسار ثابت؟", en: "What is wrong with specifying only an Ethernet exit interface in a static route?" },
        options: [
          { ar: "لا مشكلة — الصيغة الكاملة دائماً", en: "Nothing — it is always the complete form" },
          { ar: "الموجّه يرسل ARP لعنوان الوجهة النهائي البعيد وكأنه محلي", en: "The router ARPs for the remote final destination as if it were local" },
          { ar: "الموجّه يرفض الأمر فوراً", en: "The router rejects the command outright" },
          { ar: "المسار يُحفظ بمسافة إدارية 0", en: "The route installs with AD 0" },
        ],
        correct: 1,
        explain: { ar: "على واجهة بث متعدد، الموجّه يفترض الوجهة موصولة مباشرة فيسأل ARP عن MAC الوجهة البعيدة — لا يعمل إلا بـ proxy-ARP هش. الحل: اكتب القفزة التالية أو الصيغة الكاملة.", en: "On a multi-access interface the router assumes direct attachment and ARPs for the remote destination's MAC — working only with fragile proxy-ARP. The fix: write the next hop or the fully specified form." },
      },
      {
        q: { ar: "ip route 0.0.0.0 0.0.0.0 203.0.113.1 — ماذا تفعل؟", en: "ip route 0.0.0.0 0.0.0.0 203.0.113.1 — what does it do?" },
        options: [
          { ar: "ترفض لأن 0.0.0.0 ليس شبكة حقيقية", en: "It is rejected because 0.0.0.0 is not a real network" },
          { ar: "تنشئ مساراً افتراضياً يلتقط كل ما لم تطابقه المسارات الأطول", en: "It creates a default route catching whatever longer routes miss" },
          { ar: "تحجب عنوان 203.0.113.1 أمنياً", en: "It blocks 203.0.113.1 for security" },
          { ar: "تعيّن عنوان الواجهة 203.0.113.1", en: "It assigns the interface address 203.0.113.1" },
        ],
        correct: 1,
        explain: { ar: "الأصفار الرباعية: قناع فارغ يطابق أي عنوان لكنه الأقصر بادئة، فيصبح الملاذ الأخير — المسار الافتراضي الكلاسيكي نحو المزود.", en: "Quad zeroes: an empty mask matching any address yet shortest-prefix, becoming the last resort — the classic default route toward the provider." },
      },
      {
        q: { ar: "كتبت ip route 10.9.0.0 255.255.0.0 172.16.99.2 ولم يظهر المسار في الجدول. ما السبب الأرجح؟", en: "You entered ip route 10.9.0.0 255.255.0.0 172.16.99.2 and the route never appears. Most likely cause?" },
        options: [
          { ar: "المسافة الإدارية عالية جداً", en: "Administrative distance is too high" },
          { ar: "القفزة التالية 172.16.99.2 غير قابلة للحل — لا يوجد مسار نحوها في الجدول", en: "The next hop 172.16.99.2 is unresolvable — no route toward it in the table" },
          { ar: "يجب استخدام واجهة لا قفزة", en: "You must use an interface, not a hop" },
          { ar: "قناع 255.255.0.0 غير مدعوم في IOS", en: "Mask 255.255.0.0 is unsupported in IOS" },
        ],
        correct: 1,
        explain: { ar: "IOS يرفض تثبيت مسار بقفزة تالية غير قابلة للوصول (الجدول لا يعرف كيف يصل 172.16.99.2). تحقق: show ip route 172.16.99.2 ثم أصلح رابط الوصول أو استخدم واجهة.", en: "IOS refuses to install a route whose next hop is unreachable (the table has no path to 172.16.99.2). Verify: show ip route 172.16.99.2, then fix the access link or use an interface." },
      },
    ],
  },
  {
    id: "l053",
    moduleId: "m06",
    order: 3,
    level: "advanced",
    title: { ar: "أطول بادئة مطابقة والمسارات العائمة", en: "Longest Prefix Match & Floating Static Routes" },
    summary: {
      ar: "قاعدة البادئة الأطول التي تحسم كل قرارات التوجيه مع مثال عملي من أربعة مسارات، ثم هندسة النسخ الاحتياطي بمسارات عائمة بمسافات إدارية معدلة.",
      en: "The longest-prefix rule that settles every routing decision with a four-route worked example, then backup engineering with floating statics at modified administrative distances.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "القاعدة الحاكمة: البادئة الأطول تفوز", en: "The Governing Rule: Longest Prefix Wins" },
        body: {
          ar: "عند بحث الموجّه عن وجهة، لا يسأل: أي مسار أفضل؟ بل يسأل: أي مسار أطول بادئة يطابق العنوان؟\n\nكل بت إضافي في البادئة يعني مطابقة أدق — قناع /32 يطابق عنواناً واحداً بالضبط، و /0 يطابق العالم كله. البادئة الأطول تفوز حتى لو كان مصدرها أضعف ثقة أو مقياسها أردأ.\n\nمثال عملي: وصلت حزمة وجهتها 10.1.1.5، وفي الجدول:\n\n- 10.0.0.0/8 عبر OSPF — بادئة 8 بتات\n- 10.1.0.0/16 عبر EIGRP — بادئة 16 بتاً\n- 10.1.1.0/24 ثابت — بادئة 24 بتاً\n- 10.1.1.5/32 محلي لواجهة Loopback — بادئة 32 بتاً كاملة\n\nالفائز: /32 — البادئة الأدق دائماً. حتى المسار الثابت /24 الذي هزم بروتوكولين بمقعده الإداري (1) لا يقف أمام /32.\n\nالخلاصة الصارمة: ترتيب الحكم (1) أطول بادئة مطابقة، (2) عند التساوي في البادئة: المسافة الإدارية، (3) عند التساوي فيهما: المقياس — عندها فقط موازنة الأحمال.",
          en: "When the router looks up a destination, it never asks which route is best — it asks which longest-prefix route matches the address.\n\nEvery extra prefix bit means a more precise match — a /32 matches exactly one address, a /0 matches the world. The longest prefix wins even from a less-trusted source with a worse metric.\n\nPractical example: a packet arrives for 10.1.1.5, and the table holds:\n\n- 10.0.0.0/8 via OSPF — 8-bit prefix\n- 10.1.0.0/16 via EIGRP — 16-bit prefix\n- 10.1.1.0/24 static — 24-bit prefix\n- 10.1.1.5/32 local to a loopback — full 32-bit prefix\n\nThe winner: /32 — always the most precise. Even the static /24 that outranked two protocols with its AD of 1 stands no chance against a /32.\n\nThe strict verdict order: (1) longest matching prefix, (2) equal prefix → administrative distance, (3) equal both → metric — and only then, load balancing.",
        },
        code: {
          lang: "text",
          snippet: "Packet destination: 10.1.1.5\n\nCandidate routes:                 Match?   Bits   Winner?\nO    10.0.0.0/8     via 10.9.9.2    yes      8      -\nD    10.1.0.0/16    via 10.1.99.2   yes     16      -\nS    10.1.1.0/24    via Gi0/1       yes     24      -\nL    10.1.1.5/32    Loopback0       exact   32      * WINNER\n\nOrder of judgment: LPM first, then AD, then metric.",
        },
      },
      {
        heading: { ar: "المسار العائم: نسخة احتياطية خفية", en: "The Floating Static: A Hidden Backup Copy" },
        body: {
          ar: "المسار العائم (Floating Static Route) فكرة أنيقة: مسار ثابت ترفع مسافته الإدارية عمداً فوق بروتوكول ديناميكي، فيبقى مختفياً في الظل طالما البروتوكول يعمل.\n\nعند سقوط المسار الديناميكي (رابط أو جار) يطفو المسار الثابت فوراً ويتسلم التوجيه — نسخة احتياطية بلا تكلفة بروتوكول إضافي.\n\nالصياغة: نفس ip route مع رقم AD في نهاية الأمر:\n\nip route 10.2.0.0 255.255.0.0 192.168.13.2 200\n\nالرقم 200 اختيار شائع (فوق كل IGP)، ويكفي أن يقع بين AD البروتوكول الأساسي و 255. الموجّه يخزن المسار لكن لا يستخدمه إلا حين يختار المنافس.\n\n- الرابط الأساسي عبر OSPF (AD 110): المسار العائم 200 يخجل منه\n- يسقط OSPF أو رابطه: يظهر العائم في الجدول خلال لحظة\n- يعود OSPF: يختفي العائم ويعود الديناميكي — كله تلقائي",
          en: "The floating static route is an elegant idea: a static route whose administrative distance you deliberately raise above a dynamic protocol, keeping it hidden in the shadow while the protocol runs.\n\nWhen the dynamic route dies (link or neighbor), the static instantly floats up and takes over forwarding — a backup with zero extra protocol cost.\n\nThe syntax: the same ip route with an AD number at the end:\n\nip route 10.2.0.0 255.255.0.0 192.168.13.2 200\n\n200 is a common pick (above every IGP); any value between the primary protocol's AD and 255 works. The router stores the route but never uses it while the rival is chosen.\n\n- Primary link via OSPF (AD 110): the 200 floating route stays shy\n- OSPF or its link fails: the floater appears in the table within moments\n- OSPF returns: the floater hides again and dynamic resumes — all automatic",
        },
        code: {
          lang: "cisco",
          snippet: "! Primary path: OSPF over FastEthernet (AD 110)\n! Backup path: floating static over ISDN/cellular (AD 200)\n\nR1(config)# ip route 10.2.0.0 255.255.0.0 192.168.13.2 200\n\nR1# show ip route 10.2.0.0\nO    10.2.0.0/16 [110/65] via 10.1.1.2, 00:04:11, Gi0/0\n     (floating static hidden: AD 200 loses to 110)\n\n! OSPF link fails...\nR1# show ip route 10.2.0.0\nS    10.2.0.0/16 [200/0] via 192.168.13.2\n     (floater now active - backup in service)",
        },
      },
      {
        heading: { ar: "سؤال أعمق: الوجهة الموجودة في بادئتين", en: "A Deeper Question: One Destination in Two Prefixes" },
        body: {
          ar: "سيناريو واقعي يربك المبتدئين: موجّه لديه مسار 10.1.1.0/24 عبر OSPF و مسار 10.1.0.0/16 ثابت. لمن تذهب حزمة إلى 10.1.1.7؟\n\nالجواب الحاسم: البادئة الأطول /24 تفوز مهما كان مصدرها — المسافة الإدارية لا تدخل اللعبة أصلاً عند اختلاف طول البادئة. المسار الثابت /16 يخدم فقط العناوين داخل 10.1.0.0/16 التي لا يغطيها /24 (مثل 10.1.2.x).\n\nهذا السلوك يسمى التقسيم الأطول (Longer Match Splitting) وهو ميزة لا خلل: يمكّنك من توجيه قسم واحد من شبكة كبيرة عبر مسار أفضل، والباقي عبر الافتراضي — تقنية تسمى (PBR - Policy Based Routing) تستفيد منها لاحقاً بأدوات أقوى.\n\n- AD تتسابق فقط عند تطابق البادئة تماماً\n- اختلاف بادئة ولو بتاً واحداً = لا منافسة أصلاً\n- يمكنك حصاد هذه السلوكية عمداً في التصاميم الاحترافية",
          en: "A real-world scenario that trips up beginners: a router holds 10.1.1.0/24 via OSPF and a static 10.1.0.0/16. Where does a packet to 10.1.1.7 go?\n\nThe decisive answer: the longer /24 prefix wins regardless of source — administrative distance never even enters the game when prefix lengths differ. The static /16 serves only the addresses inside 10.1.0.0/16 not covered by the /24 (like 10.1.2.x).\n\nThis behavior is called longer-match splitting, and it is a feature not a flaw: it lets you steer one slice of a large network through a better path while the rest follows the default — a technique PBR (Policy-Based Routing) later exploits with stronger tools.\n\n- AD competes only on exactly equal prefixes\n- A prefix differing by even one bit = no contest at all\n- You can harvest this behavior deliberately in professional designs",
        },
        tip: {
          ar: "حين يفشل الوصول لوجهة معينة فقط بينما يعمل الباقي: راجع LPM — غالباً مسار أطول بادئة بائس يتقاطع مع وجهتك. أمر show ip route 10.1.1.7 يكشف الفائز مباشرة.",
          en: "When only one destination fails while everything works: review LPM — usually a dying longer-prefix route intersecting your destination. The command show ip route 10.1.1.7 reveals the winner instantly.",
        },
      },
      {
        heading: { ar: "تحقق عملي شامل", en: "Full Practical Verification" },
        body: {
          ar: "أدوات التحقق من سلوك البادئة والعوامة:\n\n- show ip route <destination>: يعرض المسار المختار للوجهة تحديداً — أسرع تشخيص مباشر\n- show ip route static: هل ظهر المسار العائم؟ إن ظهر والرابط الأساسي سليم فمراجعة الـ AD واجبة\n- traceroute من الجهاز المتأثر: يكشف المسار الفعلي قفزة قفزة\n- ping متتابع مع فصل الرابط الأساسي عمداً: تراقب العوامة تعمل حياً\n\nتمرين معمل مقترح (GNS3 أو Packet Tracer): موجّهان بينهما رابطان — إيثرنت أساسي و تسلسلي احتياطي. OSPF على الإيثرنت، ومسار عائم AD=200 على التسلسلي. افصل الإيثرنت وشاهد traceroute ينتقل خلال أجزاء الثانية، ثم أعد واصلاً وراقب العودة.",
          en: "Tools to verify prefix and floating behavior:\n\n- show ip route <destination>: shows the chosen route for that exact destination — the fastest direct diagnosis\n- show ip route static: did the floating route appear? If yes while the primary link is healthy, an AD review is due\n- traceroute from the affected host: reveals the live path hop by hop\n- sustained ping while deliberately unplugging the primary: watch floating work live\n\nSuggested lab exercise (GNS3 or Packet Tracer): two routers with two links — primary Ethernet plus backup serial. OSPF on Ethernet, floating static AD=200 on serial. Unplug Ethernet and watch traceroute migrate in a fraction of a second, then restore and watch it return.",
        },
      },
    ],
    keyPoints: [
      { ar: "البادئة الأطول تفوز دائماً قبل المسافة الإدارية والمقياس", en: "The longest prefix always wins before AD and metric" },
      { ar: "ترتيب الحكم: LPM ثم AD ثم المقياس ثم موازنة الأحمال", en: "Verdict order: LPM, then AD, then metric, then load balancing" },
      { ar: "المسار العائم: ip route مع AD مرتفع (مثل 200) يظهر عند فشل البروتوكول الديناميكي", en: "Floating static: ip route with a high AD (like 200) surfacing on dynamic protocol failure" },
      { ar: "اختلاف البادئة بتاً واحداً يلغي منافسة AD كلياً", en: "A one-bit prefix difference eliminates any AD competition entirely" },
      { ar: "show ip route <وجهة> يكشف المسار الفائز مباشرة", en: "show ip route <destination> reveals the winning route instantly" },
    ],
    commands: [
      { cmd: "show ip route 10.1.1.5", desc: { ar: "عرض المسار الفائز لوجهة محددة — تحليل LPM فوري", en: "Show the winning route for one destination — instant LPM analysis" } },
      { cmd: "show ip route 10.2.0.0 255.255.0.0", desc: { ar: "استعلام المسارات المطابقة لشبكة كاملة مع تفاصيل البادئات", en: "Query routes matching a whole network with prefix details" } },
      { cmd: "ip route add 10.9.0.0/16 via 192.168.13.2 metric 500", desc: { ar: "مسار احتياطي عائم على لينكس بمقياس أعلى (يُفضل عند تعادل البادئة)", en: "A backup floating route on Linux with a higher metric (preferred on equal prefixes)" } },
    ],
    quiz: [
      {
        q: { ar: "حزمة إلى 10.1.1.5 والجدول يحوي 10.0.0.0/8 و 10.1.0.0/16 و 10.1.1.0/24. أي مسار يُستخدم؟", en: "A packet to 10.1.1.5 with routes 10.0.0.0/8, 10.1.0.0/16, and 10.1.1.0/24 in the table. Which is used?" },
        options: [
          { ar: "10.0.0.0/8 لأنه أوسع تغطية", en: "10.0.0.0/8 because it covers the most" },
          { ar: "10.1.0.0/16 لموازنته بين الدقة والاتساع", en: "10.1.0.0/16 for balancing precision and breadth" },
          { ar: "10.1.1.0/24 لأنه أطول بادئة مطابقة", en: "10.1.1.0/24 because it is the longest matching prefix" },
          { ar: "الثلاثة بالتناوب", en: "All three in rotation" },
        ],
        correct: 2,
        explain: { ar: "قاعدة LPM: البادئة الأدق تفوز دوماً بمعزل عن AD والمقياس — /24 أطول من /16 و /8 هنا، فتحمل الحزمة.", en: "The LPM rule: the most precise prefix wins regardless of AD or metric — /24 beats /16 and /8 here, carrying the packet." },
      },
      {
        q: { ar: "لماذا ترفع المسافة الإدارية لمسار ثابت احتياطي إلى 200؟", en: "Why raise a backup static route's administrative distance to 200?" },
        options: [
          { ar: "لتسريع التوجيه", en: "To speed up forwarding" },
          { ar: "ليبقى مخفياً خلف المسار الديناميكي ويطفو عند فشله فقط", en: "To keep it hidden behind the dynamic route and float only on its failure" },
          { ar: "لتقليل استهلاك الذاكرة", en: "To reduce memory usage" },
          { ar: "لأن 200 رقم مطلوب من IOS", en: "Because 200 is an IOS-mandated number" },
        ],
        correct: 1,
        explain: { ar: "الـ AD المرتفع يجعل المسار الثابت يخسر أمام البروتوكول (110 لـ OSPF أو 120 لـ RIP) فيبقى احتياطياً صامتاً، ويطفو لحظة اختفاء الديناميكي — أي قيمة بين AD البروتوكول و 255 تفي.", en: "The high AD makes the static lose to the protocol (110 OSPF, 120 RIP), keeping it a silent backup that floats the instant dynamic vanishes — any value between the protocol AD and 255 works." },
      },
      {
        q: { ar: "مساران بتطابق البادئة تماماً لكن AD مختلفة (110 و 90). أيهما يفوز؟", en: "Two routes with exactly equal prefixes but different ADs (110 and 90). Which wins?" },
        options: [
          { ar: "الـ 110 لثقة أعلى", en: "The 110 — higher trust" },
          { ar: "الـ 90 لانخفاض المسافة الإدارية", en: "The 90 — lower administrative distance" },
          { ar: "كلاهما بموازنة الأحمال", en: "Both, load-balanced" },
          { ar: "يُسحبان معاً", en: "Both are withdrawn" },
        ],
        correct: 1,
        explain: { ar: "عند تطابق البادئة تدخل AD المعركة: الأقل يفوز. 90 هو EIGRP الداخلي فهزم 110 لـ OSPF — موازنة الأحمال تحدث فقط بعد تساوي AD والمقياس معاً.", en: "On exact prefix equality AD enters the battle: lowest wins. 90 is internal EIGRP beating OSPF's 110 — load balancing happens only after AD and metric both tie." },
      },
    ],
  },
  {
    id: "l054",
    moduleId: "m06",
    order: 4,
    level: "advanced",
    title: { ar: "نظرة عامة على التوجيه الديناميكي: الخوارزميات والمقاييس", en: "Dynamic Routing Overview: Algorithms & Metrics" },
    summary: {
      ar: "لماذا نتخلى عن اليد، وتصنيف البروتوكولات الداخلية والخارجية، والفرق الفلسفي بين متجه المسافة وحالة الوصل، وجدول مقارنة شامل.",
      en: "Why we abandon the manual way, classifying interior and exterior protocols, the philosophical difference between distance-vector and link-state, and a comprehensive comparison table.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "المشكلة التي تحلها البروتوكولات الديناميكية", en: "The Problem Dynamic Protocols Solve" },
        body: {
          ar: "المسارات الثابتة تعمل حتى تكبر الشبكة — عندها تتفجر مشكلاتها:\n\n- 20 موجّهاً تتطلب مئات المسارات اليدوية، وكل إضافة شبكة = تعديل على الجميع\n- فشل رابط لا يراه أحد: الحزم تستمر في السقوط في الفجوة حتى تتدخل يدوياً\n- استكشاف الأخطاء كابوس: من أخطأ في الكتابة؟ أين؟ متى؟\n\nالبروتوكول الديناميكي بروتوكول يتكلم به الموجّهات فيما بينها: تتبادل معرفتها بطوبولوجيا الشبكة، وتحسب المسارات بنفسها، وتحس بالتغييرات وتتكيَّف خلال ثوانٍ.\n\n- التكلفة: قليل من عرض النطاق وذاكرة ومعالجة\n- المقابل: تكيف ذاتي واكتشاف أعطال ومقياس ذكي يراعي سرعة الروابط\n- القاعدة: كلما كبرت الشبكة زادت جدارة الديناميكي",
          en: "Static routes work — until the network grows, and then their problems explode:\n\n- 20 routers require hundreds of manual routes, and every new network = edits on all of them\n- A failed link that nobody sees: packets keep dropping into the gap until you intervene\n- Troubleshooting nightmare: who mistyped, where, when?\n\nA dynamic protocol is the language routers speak among themselves: they exchange knowledge of the topology, compute paths themselves, sense changes, and adapt within seconds.\n\n- The cost: a little bandwidth, memory, and CPU\n- The return: self-adaptation, failure detection, and a smart metric that respects link speeds\n- The rule: the larger the network, the more dynamic earns its keep",
        },
      },
      {
        heading: { ar: "التصنيف الأول: داخلي IGP وخارجي EGP", en: "First Classification: Interior IGP vs Exterior EGP" },
        body: {
          ar: "عالم التوجيه ينقسم إلى مملكتين بحسب المسؤولية:\n\n- بروتوكولات داخلية (IGP - Interior Gateway Protocol): تعمل داخل منظمة واحدة تحت إدارة واحدة — أمثلتها RIP و OSPF و EIGRP و IS-IS\n- بروتوكولات خارجية (EGP - Exterior Gateway Protocol): تربط المنظمات المستقلة بعضها ببعض على مستوى الإنترنت — عملياً بروتوكول واحد يعيش هنا: BGP\n\nالفرق ليس تقنياً فحسب بل فلسفي:\n\n- IGP يحسن (الكفاءة): أقصر أو أسرع مسار داخلياً — الثقة مضمونة بين أجهزتك\n- BGP يطبق (السياسة): من يدفع لمن، ومن يسمح لمن بالعبور — الإنترنت شبكة تجارية قبل أن تكون تقنية\n\nلهذا لا يوجد OSPF على مستوى الإنترنت: لا أحد يثق بجيرانه التجاريين ليعلنوا كلفة مساراته أو يتبعوا أقصر طريق بأمان.",
          en: "The routing world splits into two kingdoms by responsibility:\n\n- Interior Gateway Protocols (IGP): run inside one organization under one administration — RIP, OSPF, EIGRP, IS-IS\n- Exterior Gateway Protocols (EGP): interconnect independent organizations at Internet scale — practically one protocol lives here: BGP\n\nThe difference is not merely technical but philosophical:\n\n- An IGP optimizes efficiency: the shortest or fastest internal path — trust is guaranteed among your own devices\n- BGP applies policy: who pays whom, and who lets whom transit — the Internet is a commercial network before being a technical one\n\nThat is why no OSPF exists at Internet scale: nobody trusts their commercial neighbors to advertise path costs or safely follow shortest paths.",
        },
      },
      {
        heading: { ar: "متجه المسافة مقابل حالة الوصل: فلسفتان", en: "Distance Vector vs Link State: Two Philosophies" },
        body: {
          ar: "متجه المسافة (Distance Vector): كل موجّه يخبر جيرانه بجدوله كاملاً بشكل دوري — أعرف الوصول إلى X بكلفة Y. الجار يضيف قفزته الخاصة ويعيد الإعلان لجيرانه.\n\n- تشبيهه: الإشاعات — تسمع من جارك وتنقل نسخة مطبوعة لجيرانك\n- حسابه: خوارزمية بلمان-فورد (Bellman-Ford) التكرارية\n- نقاط ضعفه: بطء التقارب وحلقات التوجيه والقياس البدائي\n- ممثله التاريخي: RIP — وممثله المطوّر: EIGRP (متجه مسافة متقدم)\n\nحالة الوصل (Link State): كل موجّه يبني خريطة كاملة للشبكة بنفسه — يعلن حالة وصلاته (روابطه وكلفها) لكل الشبكة بالفيض (Flooding)، وكل موجّه يمتلك الخريطة ذاتها ثم يحسب أقصر مسار بنفسه.\n\n- تشبيهه: الجميع يمتلك الخريطة نفسها ويحسب طريقه بنفسه\n- حسابه: خوارزمية دايكسترا (Dijkstra / SPF)\n\nنقاط قوته: تقارب فوري، لا حلقات (كل الخرائط متطابقة)، قياس دقيق بالكلفة — وممثله: OSPF و IS-IS. ثمنه: استهلاك ذاكرة ومعالجة أكبر في الشبكات الهائلة (ولهذا اخترعت المناطق Areas).",
          en: "Distance Vector: each router tells neighbors its whole table periodically — I can reach X at cost Y. The neighbor adds its own hop and re-announces onward.\n\n- Analogy: gossip — you hear from a neighbor and pass a copy to your neighbors\n- Computation: the iterative Bellman-Ford algorithm\n- Weaknesses: slow convergence, routing loops, primitive metrics\n- Historical representative: RIP — evolved one: EIGRP (advanced distance vector)\n\nLink State: each router builds the complete network map itself — it floods the state of its links (attached networks and costs) to all, every router owns the identical map, then computes shortest paths itself.\n\n- Analogy: everyone owns the same map and computes their own route\n- Computation: Dijkstra's SPF algorithm\n\nStrengths: instant convergence, loop-free (identical maps), precise cost metric — representatives: OSPF and IS-IS. Price: heavier memory and CPU in huge networks (hence the invention of Areas).",
        },
        tip: {
          ar: "ملخص الفلسفتين في جملة: متجه المسافة يرسل جدولاً لجيرانه، وحالة الوصل يرسل روابطه للجميع — الأول يخبرك ما يعرف، والثاني يمكّنك من الحساب بنفسك.",
          en: "The two philosophies in one sentence: distance vector sends a table to neighbors; link state sends its links to everyone — the first tells you what it knows, the second lets you compute it yourself.",
        },
      },
      {
        heading: { ar: "المقاييس: كيف يقيس كل بروتوكول الجودة؟", en: "Metrics: How Each Protocol Measures Quality" },
        body: {
          ar: "المقياس (Metric) قيمة رقمية يفضل عندها البروتوكول المسار الأدنى — وكل بروتوكول رأيه:\n\n- RIP — عدد القفزات (Hop Count): قفزات فقط، حد أقصى 15 (16 = لا يمكن الوصول). عملي: رابط 64 كيلوبت ورابط 10 جيجابت قفزة واحدة كلاهما!\n- OSPF — الكلفة (Cost): 10^8 ÷ عرض نطاق الرابط. 10 ميغابت = كلفة 10، و 100 ميغابت = 1. النسب تراعي السرعة فعلياً (المرجع قابل للتعديل في الشبكات الحديثة)\n- EIGRP — مقياس مركب: عرض النطاق الأدنى عبر المسار + مجموع التأخير (بمعاملات K1..K5، الافتراض K1=K3=1 فقط)\n- IS-IS — كلفة (Cost) افتراضية 10 لكل واجهة بغض النظر عن السرعة (قابلة للتهيئة)\n- BGP — لا مقياساً رقمياً بسيطاً: سلسلة سمات (AS_PATH أقصرها، LOCAL_PREF الأعلى، MED الأقل...) حسب سياسات\n\nدرس تاريخي مضحك: RIP في الثمانينيات جعل الشبكات ترسل عبر روابط بطيئة لأن كل الطرق قفزة واحدة — لهذا سُرعان ما استُبدل.",
          en: "The metric is a numeric value where the protocol prefers the lowest — and every protocol has an opinion:\n\n- RIP — hop count: hops only, max 15 (16 = unreachable). Practical: a 64 kbps link and a 10 Gbps link are one hop each!\n- OSPF — cost: 10^8 ÷ link bandwidth. 10 Mbps = cost 10, 100 Mbps = 1. Ratios genuinely respect speed (the reference is tunable in modern networks)\n- EIGRP — composite metric: minimum bandwidth along the path + summed delay (K1..K5 weights; default K1=K3=1 only)\n- IS-IS — a cost defaulting to 10 per interface regardless of speed (configurable)\n- BGP — no simple numeric metric: a chain of attributes (shortest AS_PATH, highest LOCAL_PREF, lowest MED...) by policy\n\nA comic historical lesson: RIP in the eighties had networks sending traffic over slow links because all paths were one hop — hence its rapid replacement.",
        },
        code: {
          lang: "text",
          snippet: "Protocol | Type              | Algorithm     | Metric            | AD  | Scope\nRIP      | Distance Vector   | Bellman-Ford  | Hop count (max15) | 120 | IGP\nEIGRP    | Advanced DV       | DUAL          | Composite (bw+dl) | 90  | IGP\nOSPF     | Link State        | Dijkstra SPF  | Cost (10^8/bw)    | 110 | IGP\nIS-IS    | Link State        | Dijkstra SPF  | Cost (default 10) | 115 | IGP\nBGP      | Path Vector       | Policy-based  | Attributes        | 20/200 | EGP\n\nConvergence: RIP slow (minutes) | EIGRP instant | OSPF fast | BGP policy-driven",
        },
      },
      {
        heading: { ar: "التقارب: ساعة البروتوكول الحقيقية", en: "Convergence: The Protocol's Real Clock" },
        body: {
          ar: "التقارب (Convergence) هو الزمن بين تغير في الشبكة (فشل رابط، إضافة موجّه) وبين اتفاق كل الموجّهات على الخريطة الجديدة والحقيقة الجديدة.\n\nهذا الزمن هو الفارق بين شبكة يشعر مستخدموها بالعطل وشبكة لا يلاحظونه:\n\n- RIP: دقائق (انتظار مؤقتات 30 ثانية وإعلانات دورية وبطء اكتشاف)\n- EIGRP: أجزاء من الثانية (مسار احتياطي جاهز مسبقاً في الذاكرة — Feasible Successor)\n- OSPF: ثوانٍ قليلة (كشف الفشل عبر مؤقتات Hello ثم إعادة حساب SPF)\n- BGP: يعتمد على السياسات وحجم الجدول العالمي — قد يمتد دقائق عند سحب مسارات ضخمة\n\nعند اختيار بروتوكول لشبكتك، اسأل: ما ميزانيات التقارب المقبولة؟ VoIP يتطلب ثوانياً، وتصدير تقارير ليلي يغفر دقائق.",
          en: "Convergence is the time between a change in the network (link failure, router addition) and every router agreeing on the new map and the new truth.\n\nThis time is the difference between a network users feel fail and one they never notice:\n\n- RIP: minutes (waiting on 30-second timers and periodic ads with slow detection)\n- EIGRP: fractions of a second (a pre-computed backup in memory — the Feasible Successor)\n- OSPF: a few seconds (failure detection via Hello timers, then SPF recalculation)\n- BGP: policy-dependent and global-table-sized — can stretch minutes on massive withdrawals\n\nWhen choosing a protocol for your network, ask: what convergence budgets are acceptable? VoIP demands seconds; nightly report exports forgive minutes.",
        },
      },
    ],
    keyPoints: [
      { ar: "IGP داخل منظمة واحدة (RIP و OSPF و EIGRP و IS-IS)، و BGP هو EGP الإنترنت", en: "IGPs run inside one organization (RIP, OSPF, EIGRP, IS-IS); BGP is the Internet's EGP" },
      { ar: "متجه المسافة: جداول كاملة للجيران (بلمان-فورد)؛ حالة الوصل: خريطة مشتركة و دايكسترا", en: "Distance vector: full tables to neighbors (Bellman-Ford); link state: shared map and Dijkstra" },
      { ar: "مقاييس: RIP قفزات (≤15)، OSPF كلفة 10^8/عرض النطاق، EIGRP مركب، BGP سمات سياسات", en: "Metrics: RIP hops (≤15), OSPF cost 10^8/bandwidth, EIGRP composite, BGP policy attributes" },
      { ar: "التقارب: EIGRP لحظي، OSPF ثوانٍ، RIP دقائق — مقياس حساسية خدمتك", en: "Convergence: EIGRP instant, OSPF seconds, RIP minutes — measure by your service sensitivity" },
      { ar: "قيم AD: EIGRP 90، OSPF 110، RIP 120، IS-IS 115، BGP خارجي 20 وداخلي 200", en: "AD values: EIGRP 90, OSPF 110, RIP 120, IS-IS 115, BGP external 20 and internal 200" },
    ],
    commands: [
      { cmd: "show ip protocols", desc: { ar: "عرض البروتوكولات النشطة على الموجّه ومؤقتاتها وشبكاتها المعلنة", en: "Show active protocols on the router with timers and advertised networks" } },
      { cmd: "router ospf 1", desc: { ar: "بدء عملية OSPF — سيأتي شرحه التفصيلي في درسين", en: "Start an OSPF process — detailed in the next two lessons" } },
      { cmd: "ip route show proto ospf", desc: { ar: "تصفية مسارات مصدر واحد في لينكس", en: "Filter routes of a single source in Linux" } },
    ],
    quiz: [
      {
        q: { ar: "ما الفرق الجوهري في آلية التعلم بين OSPF و RIP؟", en: "What is the essential learning difference between OSPF and RIP?" },
        options: [
          { ar: "OSPF يتعلم من خادم مركزي و RIP من الجيران", en: "OSPF learns from a central server, RIP from neighbors" },
          { ar: "RIP يرسل جدوله كاملاً لجيرانه، و OSPF يفيض حالة وصلاته للجميع فيمتلك الجميع الخريطة نفسها", en: "RIP sends its full table to neighbors; OSPF floods its link states to all so everyone owns the same map" },
          { ar: "RIP أسرع تقارباً من OSPF دائماً", en: "RIP always converges faster than OSPF" },
          { ar: "لا فرق — مجرد اختيار تاريخي", en: "No difference — merely a historical choice" },
        ],
        correct: 1,
        explain: { ar: "متجه المسافة (RIP) توزع الجداول الجوارية تدريجياً؛ حالة الوصل (OSPF) تفيض LSAs لتبني LSDB متطابقاً عند الجميع ثم يحسب كل موجّه SPF بنفسه — تقارب أسرع وبلا حلقات.", en: "Distance vector (RIP) distributes tables neighbor-to-neighbor gradually; link state (OSPF) floods LSAs building an identical LSDB everywhere, then each router computes SPF itself — faster, loop-free convergence." },
      },
      {
        q: { ar: "لماذا لا يصلح OSPF كبروتوكول للإنترنت العالمية بين المزودين؟", en: "Why is OSPF unfit as the global inter-provider Internet protocol?" },
        options: [
          { ar: "لأنه بطيء جداً للشبكات الكبيرة", en: "Because it is too slow for large networks" },
          { ar: "لأن الإنترنت يربط منظمات مستقلة تتطلب تطبيق سياسات تجارية وسيادية — وظيفة BGP حصراً", en: "Because the Internet interconnects independent organizations requiring commercial and sovereignty policies — BGP's exclusive function" },
          { ar: "لأنه لا يدعم IPv4", en: "Because it lacks IPv4 support" },
          { ar: "لأنه محصور بـ 15 قفزة", en: "Because it is capped at 15 hops" },
        ],
        correct: 1,
        explain: { ar: "OSPF يفترض إدارة واحدة موثوقة تتبع أقصر مسار؛ الإنترنت بين مزودين مستقلين يتبع عقوداً وأولويات سياسية وتجارية — اختيار المسار بالسياسة لا بالكفاءة، وهذا عمل BGP.", en: "OSPF assumes one trusted administration following shortest paths; inter-provider Internet follows contracts, politics, and commerce — routing by policy not efficiency, which is BGP's job." },
      },
      {
        q: { ar: "أي بروتوكول يستخدم خوارزمية Dijkstra لحساب أقصر مسار؟", en: "Which protocol uses Dijkstra's shortest-path-first algorithm?" },
        options: [
          { ar: "RIP", en: "RIP" },
          { ar: "BGP", en: "BGP" },
          { ar: "EIGRP", en: "EIGRP" },
          { ar: "OSPF", en: "OSPF" },
        ],
        correct: 3,
        explain: { ar: "بروتوكولات حالة الوصل (OSPF و IS-IS) تبني LSDB متطابقاً وتشغّل SPF (ديكسترا) عليه. RIP يستخدم بلمان-فورد، و EIGRP يستخدم DUAL، و BGP يتبع السمات.", en: "Link-state protocols (OSPF, IS-IS) build an identical LSDB and run SPF (Dijkstra) over it. RIP uses Bellman-Ford, EIGRP uses DUAL, and BGP follows attributes." },
      },
    ],
  },
  {
    id: "l055",
    moduleId: "m06",
    order: 5,
    level: "advanced",
    title: { ar: "RIP الإصدار 2: المعلم التاريخي الحي", en: "RIP Version 2: The Living Historical Teacher" },
    summary: {
      ar: "آلية متجه المسافة بالتفصيل، حلقات التوجيه وعلاجاتها الأربع، مؤقتات 30/180/240 الدقيقة، وتهيئة RIPv2 كاملة مع التحقق — وسبب نهاية عصره.",
      en: "The distance-vector mechanism in detail, routing loops and their four cures, the 30/180/240 timers, a full RIPv2 configuration with verification — and why its era ended.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "الآلية: جداول تُرسل كإشاعات دورية", en: "The Mechanism: Tables Broadcast as Periodic Gossip" },
        body: {
          ar: "RIP (Routing Information Protocol) أقدم بروتوكول توجيه في التاريخ الحي (عائلة RFC 2453 للإصدار 2) — بروتوكول متجه مسافة صريح:\n\n- كل 30 ثانية بالضبط: يرسل كل موجّه جدول توجيهه كاملاً لجيرانه (الإصدار 2 عبر البث المتعدد 224.0.0.9، والإصدار 1 بالبث العام)\n- يعمل فوق UDP على المنفذ 520 — سطر طريف في تاريخ البروتوكولات: بروتوكول توجيه يعمل فوق بروتوكول نقل!\n- الجيرانه يزيدون قفزة واحدة على كل مسار مستلم ويعيدون نشره — حتى ينتشر المسار للجميع\n- المقياس: عدد القفزات فقط، بحد أقصى 15 — و 16 تعني لا يمكن الوصول (Infinity)\n\nالحد 15 ليس تعسفياً: هو قاطرة دفاع ضد مشكلة عدّ إلى ما لا نهاية (Count to Infinity) التي سنراها بعد قليل.",
          en: "RIP (Routing Information Protocol) is the oldest living routing protocol (the v2 family is RFC 2453) — a textbook distance-vector protocol:\n\n- Every 30 seconds exactly: each router sends its full routing table to neighbors (v2 via multicast 224.0.0.9; v1 by broadcast)\n- It runs over UDP on port 520 — an amusing line in protocol history: a routing protocol riding a transport protocol!\n- Neighbors add one hop to every received route and re-propagate — until the route spreads to all\n- Metric: hop count only, capped at 15 — 16 means unreachable (infinity)\n\nThe 15 cap is not arbitrary: it is the brake against the count-to-infinity problem we meet shortly.",
        },
      },
      {
        heading: { ar: "حلقة التوجيه وعدّ اللانهاية", en: "The Routing Loop & Counting to Infinity" },
        body: {
          ar: "السيناريو اللعين: R1 يصل شبكة N عبر R2. تسقط وصلة R2 بـ N، فيعلن R2 حذف المسار — لكن قبل أن يصل إعلان الحذف، يصل R1 رسالة R2 الدورية القديمة؟ لا — الأدهى: R3 يرسل لـ R2 أنه يصل N عبر قفزتين (تعلمها أصلاً من R2 نفسه قبل الحذف!). فيظن R2 أن R3 يعرف طريقاً فيتبعه، ويعلن لـ R1 وصوله N بثلاث قفزات — وكل دورة تزيد الجميع قفزة — العد نحو ما لا نهاية والشبكة تدور في حلقة صمت.\n\nأربع علاجات تاريخية طورها RIP:\n\n- Split Horizon (أفق الانقسام): لا تعلن مساراً للجهة التي تعلمته منها — أسهل وأشهر\n- Route Poisoning (تسميم المسار): عند فقد شبكة، أعلنها بمقياس 16 (لا يمكن الوصول) فوراً بدل الصمت\n- Poison Reverse (العكس السام): اكسر أفق الانقسام خصيصاً لإرسال السم للجهة الأصلية — تأكيد قاطع للجار\n- Hold-Down Timer (مؤقت التهدئة): تجاهل معلومات أسوأ للمسار الساقط مدة محددة قبل التصديق",
          en: "The cursed scenario: R1 reaches network N via R2. R2's link to N dies, and R2 announces deletion — but before the deletion arrives, R3 tells R2 it reaches N in 2 hops (learned originally from R2 itself before the deletion!). R2 assumes R3 knows a way and follows it, announcing to R1 that N is 3 hops away — every cycle adds a hop for everyone — the count to infinity as the network spins in a silent loop.\n\nFour historical cures RIP developed:\n\n- Split Horizon: never advertise a route back toward the interface it was learned on — the simplest and most famous\n- Route Poisoning: on losing a network, immediately announce it with metric 16 (unreachable) instead of silence\n- Poison Reverse: deliberately break split horizon to send the poison back to the origin — emphatic confirmation to the neighbor\n- Hold-Down Timer: ignore worse information about the fallen route for a defined period before believing it",
        },
        tip: {
          ar: "أفق الانقسام يشرح سلوكاً ستفترسه كل بروتوكولات متجه المسافة: جدول جارك لا يحوي المسارات التي تعلمها منك — لا تظننه جائعاً أو مخلّاً.",
          en: "Split horizon explains behavior you will spot in every distance-vector protocol: a neighbor's table lacks the routes it learned from you — do not mistake it for stinginess.",
        },
      },
      {
        heading: { ar: "المؤقتات الأربعة: إيقاع RIP الداخلي", en: "The Four Timers: RIP's Internal Rhythm" },
        body: {
          ar: "RIP يتنفس بإيقاع أربعة مؤقتات دقيقة — حفظها إلزامي للامتحانات والحياة العملية:\n\n- التحديث (Update): 30 ثانية — إرسال الجدول الكامل دورياً (مع عشوائية صغيرة ±16.7% لتجنب التزامن العاصف)\n- الإبطال (Invalid / Timeout): 180 ثانية — إن لم يصلك تحديث لمسار خلالها اعتبره ميتاً وعلمه 16\n- التهدئة (Hold-Down): 180 ثانية — بعد الإبطال: تجاهل أي معلومات جديدة عن المسار (إلا كانت أفضل أو من المصدر الأصلي)\n- التطهير (Flush): 240 ثانية — بعد 60 ثانية من الإبطال: امحِ المسار نهائياً من الجدول\n\nترتيب حياة المسار الساقط: 180 ثانية انتظاراً → 180 ثانية تهدئة → 240 ثانية فيمحى تماماً — أي دقائق كاملة قبل استقرار الحقيقة الجديدة!\n\nهذا بالضبط سبب نعي RIP في الشبكات الحديثة: خدمات اليوم لا تغفر ثلاثين ثانية أولى من التوقف، ناهيك عن الدقائق.",
          en: "RIP breathes to the rhythm of four precise timers — memorizing them is mandatory for exams and practical life:\n\n- Update: 30 seconds — periodic full-table send (with small ±16.7% jitter to avoid synchronized storms)\n- Invalid (Timeout): 180 seconds — no update received for a route within it → declare it dead and mark 16\n- Hold-Down: 180 seconds — after invalidation: ignore new information about the route (unless better or from the original source)\n- Flush: 240 seconds — 60 seconds after invalidation: erase the route permanently\n\nThe fallen route's life order: 180s waiting → 180s hold-down → 240s and gone — full minutes before the new truth settles!\n\nThis is exactly RIP's obituary in modern networks: today's services forgive no first thirty seconds of outage, let alone minutes.",
        },
      },
      {
        heading: { ar: "RIPv2: ما أصلحه الإصدار الثاني", en: "RIPv2: What Version 2 Fixed" },
        body: {
          ar: "الإصدار 1 (1988) كان طبقياً (Classful): يرسل الشبكة بلا قناع، فيخمّن القناع من فئته — يكسر VLSM و CIDR تماماً.\n\nالإصدار 2 (1993-1998) أصلح كل شيء تقريباً:\n\n- يحمل قناع الشبكة مع كل مسار → لا طبقي يدعم VLSM و CIDR بالكامل\n- يرسل للبث المتعدد 224.0.0.9 بدل البث العام — لا يزعج كل بطاقة على القسم\n- يدعم المصادقة (نصية MD5) — حماية من إعلانات مسار مزيفة\n- يضيف حقل خطوة تالية اختيارياً لتحسين التوجيه\n\nظل RIP v2 في الشبكات الصغيرة والكتب الدراسية لعقود — اليوم حضوره مقاومة هامشية، لكنه أفضل معلم لمبادئ متجه المسافة على الإطلاق.",
          en: "Version 1 (1988) was classful: it sent the network with no mask, guessing it from the class — breaking VLSM and CIDR entirely.\n\nVersion 2 (1993-1998) fixed nearly everything:\n\n- Carries the network mask with every route → classless, fully VLSM and CIDR capable\n- Sends to multicast 224.0.0.9 instead of broadcast — no longer nagging every NIC on the segment\n- Supports authentication (plaintext and MD5) — protection against forged route announcements\n- Adds an optional next-hop field to improve forwarding\n\nRIPv2 lingered in small networks and textbooks for decades — today it survives marginally, yet remains the finest teacher of distance-vector principles ever.",
        },
        code: {
          lang: "cisco",
          snippet: "R1(config)# router rip\nR1(config-router)# version 2\nR1(config-router)# network 10.0.0.0\nR1(config-router)# network 192.168.12.0\nR1(config-router)# no auto-summary\n\nR1(config-router)# passive-interface g0/1\n\n! Verification\nR1# show ip protocols\nRouting Protocol is rip\n  Sending updates every 30 seconds, next due in 22 seconds\n  Invalid after 180 seconds, hold down 180, flushed after 240\n  Default version control: send version 2, receive version 2\n\nR1# show ip route rip\nR    10.3.0.0/24 [120/2] via 192.168.12.2, 00:00:07, Serial0/0/0",
        },
      },
      {
        heading: { ar: "التهيئة: تفكيك الأمر network", en: "Configuration: Dissecting the network Command" },
        body: {
          ar: "الأمر network في RIP له معنى مزدوج يجب فهمه بدقة — يختلف عن OSPF لاحقاً:\n\n- المعنى الأول: فعّل RIP على أي واجهة تقع ضمن النطاق المذكور (10.0.0.0 يفعّل كل واجهة تبدأ بـ 10)\n- المعنى الثاني: أعلن شبكات تلك الواجهات للجيران\n\nلأن RIP طبقي المنشأ، يكتب network بالحدود الطبقية (10.0.0.0 وليس 10.1.1.0/24).\n\nأمران صغيران لكنهما حاسمان:\n\n- no auto-summary: يمنع تلخيص المسارات تلقائياً عند حدود الفئات — إلزامي مع VLSM وإلا أفسد التصميم\n- passive-interface: اسكت واجهة LAN عن إرسال التحديثات — الجيران هناك مضيفون لا موجّهات؛ يوفر إزعاج البث المتعدد ويخفي طوبولوجيتك قليلاً\n\nوالملاحظة الظريفة للتحقق: show ip route rip ثم اقرأ [120/2] — مقياس قفزتين يعني مساراً عبر موجّهين اثنين لا أكثر.",
          en: "The network command in RIP carries a double meaning you must grasp precisely — it differs from OSPF later:\n\n- First meaning: enable RIP on any interface falling inside the stated range (10.0.0.0 enables every interface beginning with 10)\n- Second meaning: advertise those interfaces' networks to neighbors\n\nBecause RIP is classful by birth, network is written at class boundaries (10.0.0.0, not 10.1.1.0/24).\n\nTwo small but decisive commands:\n\n- no auto-summary: prevents automatic summarization at class boundaries — mandatory with VLSM or it corrupts the design\n- passive-interface: silence a LAN interface from sending updates — the neighbors there are hosts, not routers; it saves multicast noise and hides your topology a little\n\nAnd the neat verification note: show ip route rip then read [120/2] — a metric of 2 means a path crossing exactly two routers, no more.",
        },
      },
    ],
    keyPoints: [
      { ar: "RIP: جدول كامل كل 30 ثانية للجيران، فوق UDP 520، ومقياس قفزات بحد 15", en: "RIP: full table every 30s to neighbors, over UDP 520, hop-count metric capped at 15" },
      { ar: "حلقات التوجيه تعالج بأفق الانقسام والتسميم والعكس السام والتهدئة", en: "Routing loops are treated with split horizon, poisoning, poison reverse, and hold-down" },
      { ar: "المؤقتات: تحديث 30، إبطال 180، تهدئة 180، تطهير 240 ثانية", en: "Timers: update 30, invalid 180, hold-down 180, flush 240 seconds" },
      { ar: "RIPv2: لا طبقي (يحمل الأقنعة)، بث متعدد 224.0.0.9، مصادقة، دعم VLSM", en: "RIPv2: classless (carries masks), multicast 224.0.0.9, authentication, VLSM support" },
      { ar: "no auto-summary و passive-interface أمران إلزاميان في كل تهيئة حديثة", en: "no auto-summary and passive-interface are mandatory in every modern setup" },
    ],
    commands: [
      { cmd: "router rip / version 2", desc: { ar: "تفعيل RIP وتثبيت الإصدار الثاني اللاطبقي", en: "Enable RIP and lock in the classless version 2" } },
      { cmd: "show ip protocols", desc: { ar: "المؤقتات والإصدارات والشبكات المعلنة — لوحة RIP الصحية", en: "Timers, versions, and advertised networks — RIP's health panel" } },
      { cmd: "show ip route rip", desc: { ar: "المسارات المستلمة من RIP فقط مع مقاييس القفزات", en: "Routes learned from RIP only with hop metrics" } },
      { cmd: "debug ip rip", desc: { ar: "مراقبة تحديثات RIP الحية (استخدمه بحذر وبإيقاف سريع)", en: "Watch live RIP updates (use cautiously and disable promptly)" } },
    ],
    quiz: [
      {
        q: { ar: "متى يعتبر RIP مساراً ميتاً ويعلمه 16؟", en: "When does RIP declare a route dead and mark it 16?" },
        options: [
          { ar: "بعد 30 ثانية بلا تحديث", en: "After 30 seconds without an update" },
          { ar: "بعد 180 ثانية بلا تحديث للمسار (مؤقت الإبطال)", en: "After 180 seconds without an update for the route (invalid timer)" },
          { ar: "فوراً عند فقد أول ping", en: "Immediately upon the first failed ping" },
          { ar: "بعد 240 ثانية (مؤقت التطهير)", en: "After 240 seconds (flush timer)" },
        ],
        correct: 1,
        explain: { ar: "180 ثانية = 6 دورات تحديث مفقودة تُعلن موت المسار وتروّجه بالسم 16؛ ثم يُمحى نهائياً عند 240 ثانية. هذا البطء سبب سقوط RIP أمام OSPF و EIGRP.", en: "180 seconds = 6 missed update cycles declaring the route dead and poisoning it at 16; permanent erasure follows at 240 seconds. This slowness is why RIP fell to OSPF and EIGRP." },
      },
      {
        q: { ar: "ما وظيفة أفق الانقسام (Split Horizon)؟", en: "What does split horizon do?" },
        options: [
          { ar: "يمنع إعلان مسار عاد عبر الواجهة التي تعلم منها", en: "It forbids advertising a route back out the interface it was learned on" },
          { ar: "يقسم الشبكة إلى مناطق", en: "It divides the network into areas" },
          { ar: "يزيد المقياس بمقدار واحد", en: "It increments the metric by one" },
          { ar: "يشفر التحديثات بالمصادقة", en: "It encrypts updates with authentication" },
        ],
        correct: 0,
        explain: { ar: "أفق الانقسام يقطع أخطر حلقات التوجيه: الجار الذي أخبرك عن مسار لا يحتاج سماعه منك — وإلا لتغذى على معلوماته القديمة ودار المبلغ في حلقة.", en: "Split horizon cuts the most dangerous loops: the neighbor that told you about a route needs not hear it from you — otherwise it feeds on its own old information and the counter spins." },
      },
      {
        q: { ar: "أي تحسين جوهري قدمه RIP v2 على v1؟", en: "Which essential improvement did RIPv2 bring over v1?" },
        options: [
          { ar: "الحد الأقصى للقفزات ارتفع إلى 255", en: "The hop limit rose to 255" },
          { ar: "يحمل قناع كل شبكة معلنة فيصبح لا طبقياً ويدعم VLSM", en: "It carries each network's mask, becoming classless and VLSM-capable" },
          { ar: "التحديثات أصبحت فورية بلا مؤقتات", en: "Updates became instant without timers" },
          { ar: "يعمل فوق TCP بدل UDP", en: "It runs over TCP instead of UDP" },
        ],
        correct: 1,
        explain: { ar: "v1 الطبقي يخمّن القناع من فئة العنوان فلا يدعم VLSM؛ v2 يرسل القناع صريحاً (لا طبقي)، ويضيف البث المتعدد 224.0.0.9 والمصادقة — الحد 15 بقي كما هو فوق UDP 520.", en: "Classful v1 guesses the mask from the address class, forbidding VLSM; v2 sends the mask explicitly (classless), adding multicast 224.0.0.9 and authentication — the 15-hop cap stays over UDP 520." },
      },
    ],
  },
  {
    id: "l056",
    moduleId: "m06",
    order: 6,
    level: "advanced",
    title: { ar: "أساسيات OSPF: المناطق والجيران و DR/BDR", en: "OSPF Fundamentals: Areas, Neighbors, & DR/BDR" },
    summary: {
      ar: "بنية حالة الوصل بعمق: قاعدة بيانات LSDB و LSA، هرمية المناطق والمحطة 0، تكوين الجوار بمراحله الثماني، وانتخاب الموجّه المخصص و DR و BDR.",
      en: "Link-state in depth: the LSDB and LSAs, the area hierarchy and Area 0, neighbor adjacency through its eight states, and DR/BDR election.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "الرحلة: من حالة الوصل إلى شجرة SPF", en: "The Journey: From Link State to the SPF Tree" },
        body: {
          ar: "OSPF (Open Shortest Path First — المعيار المفتوح RFC 2328) بروتوكول حالة الوصل الأشهر تاريخياً. رحلته الداخلية في أربع خطوات:\n\n- اكتشاف الجيران (Neighbors): عبر رسائل Hello الدورية\n- تبادل حالات الوصل (Link State Advertisements - LSAs): كل موجّه يعلن روابطه — الواجهات المتصلة وكلفها\n- الفيض (Flooding): كل LSA ينتشر للمنطقة كلها حتى تمتلك كل الموجّهات قاعدة البيانات نفسها (LSDB — Link State Database)\n- الحساب المستقل: كل موجّه يشغّل خوارزمية دايكسترا (SPF) على الخريطة فيبني شجرة أقصر المسار بجذر نفسه ويستخرج جدول التوجيه\n\nميزات بنيوية تصدر عن هذا التصميم:\n\n- لا حلقات توجيه: الخرائط متطابقة والحساب كامل من جذر واحد\n- تقارب سريع: تغير واحد يفيض فوراً بلا انتظار مؤقتات دورية\n- وعي بالسرعة: الكلفة مبنية على عرض النطاق\n- بروتوكول IP مباشر رقم 89 (لا TCP ولا UDP) والبث المتعدد 224.0.0.5",
          en: "OSPF (Open Shortest Path First — the open standard, RFC 2328) is history's most famous link-state protocol. Its internal journey has four steps:\n\n- Discover neighbors: via periodic Hello messages\n- Exchange Link State Advertisements (LSAs): each router announces its links — attached interfaces and their costs\n- Flooding: every LSA spreads across the whole area until all routers own the identical LSDB (Link State Database)\n- Independent computation: each router runs Dijkstra (SPF) over the map, building its shortest-path tree rooted at itself and extracting the routing table\n\nStructural merits flowing from this design:\n\n- No routing loops: identical maps and full computation from one root\n- Fast convergence: a single change floods instantly, no periodic timers awaited\n- Speed awareness: cost derives from bandwidth\n- Runs directly over IP protocol 89 (no TCP, no UDP) with multicast 224.0.0.5",
        },
      },
      {
        heading: { ar: "المناطق وهرمية OSPF", en: "Areas & the OSPF Hierarchy" },
        body: {
          ar: "شبكة OSPF واحدة كبيرة تعني LSDB ضخماً وحساب SPF ثقيلاً عند كل تغيير — الحل الهندسي: تقسيم إلى مناطق (Areas) هرمية ثنائية المستوى.\n\n- المنطقة 0 (Backbone Area): العمود الفقري الإلزامي — كل منطقة أخرى يجب أن تتصل بها (فيزيائياً أو عبر نفق وهمي)\n- المناطق العادية (مثل 1 و 2): تحتوي موجّهات داخلية (Internal) وموجّهات حدود (ABR — Area Border Router) تجلس بين منطقتين\n- ASBR (AS Boundary Router): موجّه يحقن مسارات خارجية (من BGP أو مسارات ثابتة) داخل OSPF\n\nفوائد المناطق بأرقام: بدل فيض كل LSA للشبكة كلها، تبقى تفاصيل المنطقة داخلها، و ABR يلخصها إلى المنطقة 0 عبر LSA نوع 3 (Summary) — جدول أصغر وحساب أخف وعزل أعطال.\n\nأنواع LSA التي تصادفها أولاً (سنمارسها في درس التكوين):\n\n- نوع 1 (Router LSA): روابط كل موجّه داخل منطقته — البنة الأساسية\n- نوع 2 (Network LSA): الشبكات متعددة الوصول يولّدها DR\n- نوع 3 (Summary LSA): مسارات ملخصة بين المناطق يولّدها ABR\n- نوع 4 و 5: وصف موقع ASBR و المسارات الخارجية التي يحقنها",
          en: "One large OSPF domain means a giant LSDB and heavy SPF runs on every change — the engineering answer: division into a two-level area hierarchy.\n\n- Area 0 (the backbone): the mandatory spine — every other area must attach to it (physically or via a virtual link)\n- Regular areas (like 1 and 2): contain internal routers and ABRs (Area Border Routers) sitting between two areas\n- ASBR (AS Boundary Router): a router injecting external routes (from BGP or statics) into OSPF\n\nThe area gains in numbers: instead of every LSA flooding the whole domain, area detail stays local, and the ABR summarizes it into Area 0 via Type 3 (Summary) LSAs — smaller tables, lighter computation, fault isolation.\n\nThe LSA types you meet first (we practice them in the configuration lesson):\n\n- Type 1 (Router LSA): each router's links within its area — the fundamental brick\n- Type 2 (Network LSA): multi-access networks, generated by the DR\n- Type 3 (Summary LSA): inter-area summarized routes generated by the ABR\n- Types 4 and 5: describing the ASBR's location and the external routes it injects",
        },
        tip: {
          ar: "قاعدة تصميم ذهبية: أبقِ المنطقة الواحدة حتى ~50 موجّهاً (التوصية التقليدية)، وأول تصميم لك دائماً: منطقة 0 للنواة + منطقة لكل موقع أو وظيفة.",
          en: "A golden design rule: keep a single area to ~50 routers (the traditional recommendation); your first design is always: Area 0 for the core plus one area per site or function.",
        },
      },
      {
        heading: { ar: "رسائل Hello وبناء الجوار: المراحل الثماني", en: "Hello Messages & Adjacency: The Eight States" },
        body: {
          ar: "موجّها OSPF لا يصيران جارين اعتباطاً — علاقة رسمية تمر بمراحل مذكورة بدقة (ستقرؤها في show ip ospf neighbor):\n\n- Down: لا اتصال بعد — نقطة البداية\n- Init: وصلني Hello منك (رأيت معرفي فيه) لكن لم أرَك بعد في جداولك\n- 2-Way: رأيت نفسي في Hello المتبادل — جيرة متبادلة مؤكدة (هنا يُنتخب DR/BDR على شبكات البث)\n- ExStart: التفاوض على من يبدأ تبادل قاعدة البيانات (الموجّه ذو المعرف الأعلى يبدأ)\n- Exchange: تبادل وصف قواعد البيانات (DBDs) — فهرس لا الكتب\n- Loading: طلب LSAs الناقصة فعلياً عبر رسائل LSR و LSU\n- Full: قاعدتا البيانات متطابقتان تماماً — الجوار (Adjacency) الكامل المؤهل لحساب المسارات\n\nشروط Hello ليصلا إلى 2-Way أصلاً: منطقة متطابقة، معرف مصادقة متطابق، مؤقتات Hello/Dead متطابقة (10/40 ثانية على الإيثرنت)، و شبكة IP نفسها وقناعها.\n\nأي خلاف في واحد منها = جار عالق في Init أو لا يظهر أصلاً — أول ما تفحصه عند شكوى OSPF لا يعمل.",
          en: "Two OSPF routers do not become neighbors casually — a formal relationship marches through precisely named states (you will read them in show ip ospf neighbor):\n\n- Down: no contact yet — the starting point\n- Init: I received your Hello (my ID was inside it) but you have not seen me in your tables\n- 2-Way: we saw each other in mutual Hellos — confirmed two-way communication (DR/BDR election happens here on broadcast networks)\n- ExStart: negotiating who starts the database exchange (the higher router ID begins)\n- Exchange: trading database descriptors (DBDs) — the index, not the books\n- Loading: requesting the actually missing LSAs via LSR and LSU messages\n- Full: the two databases are completely identical — the full adjacency qualified for path computation\n\nHello requirements just to reach 2-Way: matching area, matching authentication, matching Hello/Dead timers (10/40 seconds on Ethernet), and the same IP network and mask.\n\nAny single mismatch = a neighbor stuck in Init or never appearing — the first thing you check when OSPF refuses to work.",
        },
        code: {
          lang: "text",
          snippet: "State machine:  Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full\n\nHello (10s) / Dead (40s) on broadcast networks:\n  Hello must match: area id, auth, timers, subnet+mask\n\nOSPF packets (IP protocol 89, multicast 224.0.0.5):\n  1 Hello   2 DBD   3 LSR   4 LSU   5 LSAck\n\nCost formula: cost = 100,000,000 / bandwidth(bps)\n  10 Mbps -> 10   |  100 Mbps -> 1  |  1 Gbps -> 0.1 (rounds to 1!)\n  -> tune with: auto-cost reference-bandwidth 10000 (Mbps)",
        },
      },
      {
        heading: { ar: "DR و BDR: حكم شبكات البث المتعدد", en: "DR & BDR: Ruling Multi-Access Networks" },
        body: {
          ar: "على شبكة إيثرنت تضم خمسة موجّهات، لو تبادل الجميع LSAs مع الجميع لاحتجنا 10 علاقات Full ثنائية كاملة (زوج من كل اثنين: n(n-1)/2) — فيض مكرر وحركة ARP و CPU تضيع.\n\nحل OSPF الأنيق: انتخاب موجّه مخصص (DR — Designated Router) يمثل الشبكة كلها: كل موجّه يبني علاقة Full مع DR فقط ومع نائبه (BDR — Backup DR)، وبقية العلاقات تظل عند 2-Way فقط.\n\n- DR يولّد LSA نوع 2 للشبكة ويدير المزامنة\n- BDR يراقب ويستلم كل شيء جاهزاً — يتسلم عند سقوط DR بلا انتخاب جديد\n- الانتخاب يحدث عند بلوغ 2-Way: الأفضلية الأعلى (Priority) تفوز — والافتراضي 1 — ثم عند التعادل يفوز معرف الموجّه (Router-ID) الأعلى\n- Priority صفر = لن تُنتخب أبداً (موجّه ناري عادي)\n\nحيلة عملية بالغة الأهمية: الانتخاب لا يعاد مع دخول جار جديد — DR الأسبق يبقى حتى يسقط! لتثبيت DR رفع priority لموجّه مختار وإعادة تشغيل العمليات أو انتظار سقوط الجميع.",
          en: "On an Ethernet segment holding five routers, everyone syncing with everyone would demand 10 full adjacencies (every pair: n(n-1)/2) — duplicated flooding and wasted ARP and CPU.\n\nOSPF's elegant answer: electing a Designated Router (DR) representing the whole segment: every router builds a Full relationship only with the DR and its backup (BDR), while all other relationships stay at 2-Way.\n\n- The DR generates the Type 2 LSA for the network and manages synchronization\n- The BDR watches with everything received, ready to take over instantly on DR failure without a new election\n- The election happens upon reaching 2-Way: highest priority wins — default 1 — and on a tie, the highest Router-ID wins\n- Priority zero = never elected (an ordinary soldier router)\n\nA supremely practical trick: the election is not re-run when a new neighbor joins — the incumbent DR stays until it falls! To pin the DR, raise the chosen router's priority and restart processes or wait for everyone to fall.",
        },
      },
    ],
    keyPoints: [
      { ar: "آلية OSPF: Hello ← فيض LSAs ← LSDB متطابق ← SPF (ديكسترا) عند كل موجّه", en: "OSPF mechanism: Hello → LSA flooding → identical LSDB → SPF (Dijkstra) at each router" },
      { ar: "المنطقة 0 العمود الفقري الإلزامي، و ABR يربطها بالمناطق، و ASBR يحقن الخارج", en: "Area 0 is the mandatory backbone; the ABR links areas to it; the ASBR injects externals" },
      { ar: "LSA: 1 روابط الموجّه، 2 شبكة البث من DR، 3 ملخص بين المناطق، 4 و 5 للخارجية", en: "LSAs: 1 router links, 2 broadcast network from DR, 3 inter-area summary, 4 and 5 external" },
      { ar: "الجوار يمر: Init ← 2-Way ← ExStart ← Exchange ← Loading ← Full", en: "Adjacency passes: Init → 2-Way → ExStart → Exchange → Loading → Full" },
      { ar: "DR/BDR: الأفضلية الأعلى ثم Router-ID الأعلى — والانتخاب لا يعاد لداخل جديد", en: "DR/BDR: highest priority then highest Router-ID — and the election is never re-run for a newcomer" },
    ],
    commands: [
      { cmd: "show ip ospf neighbor", desc: { ar: "حالة كل جار (يجب أن ترى FULL) وعناوينه وواجهته", en: "Each neighbor's state (you want FULL) with addresses and interfaces" } },
      { cmd: "show ip ospf interface g0/0", desc: { ar: "مؤقتات Hello/Dead والأفضلية ومعرف المنطقة والكلفة للواجهة", en: "Hello/Dead timers, priority, area ID, and interface cost" } },
      { cmd: "show ip ospf database", desc: { ar: "استعراض LSDB: أنواع LSA ومرسليها وأعمارها", en: "Browse the LSDB: LSA types, originators, and ages" } },
    ],
    quiz: [
      {
        q: { ar: "على شبكة بث فيها 6 موجّهات بلا DR، كم علاقة Full كاملة يتطلب التزامن الكامل؟", en: "On a broadcast network with 6 routers and no DR, how many Full adjacencies would full meshing require?" },
        options: [
          { ar: "6", en: "6" },
          { ar: "12", en: "12" },
          { ar: "15", en: "15" },
          { ar: "30", en: "30" },
        ],
        correct: 2,
        explain: { ar: "قانون n(n-1)/2: ستة موجّهات = 6×5÷2 = 15 علاقة ثنائية كاملة. مع DR و BDR تهبط العلاقات Full إلى 9 فقط: الجميع مع DR و BDR فقط.", en: "The law n(n-1)/2: six routers = 6×5÷2 = 15 full pairwise adjacencies. With a DR and BDR, Full relations drop to just 9: everyone with DR and BDR only." },
      },
      {
        q: { ar: "ماذا يحدث للانتخاب إذا دخل موجّه بأفضلية أعلى بعد اكتمال انتخاب DR؟", en: "What happens to the election if a router with higher priority joins after DR election completes?" },
        options: [
          { ar: "يُعاد الانتخاب فوراً ويفوز القادم", en: "The election re-runs immediately and the newcomer wins" },
          { ar: "لا شيء — لا يُعاد الانتخاب إلا بسقوط DR الحالي", en: "Nothing — the election re-runs only when the current DR falls" },
          { ar: "يصبح القادم DR فوراً و يصبح القديم BDR", en: "The newcomer instantly becomes DR and the old one BDR" },
          { ar: "يفصل الجار الجديد من المنطقة", en: "The new neighbor is expelled from the area" },
        ],
        correct: 1,
        explain: { ar: "انتخاب OSPF لا يستبق نفسه: DR القائم يبقى حتى يفقد الشبكة اتصاله أو يعاد تشغيل عملياته — قاعدة يتصادم معها المهندسون الجدد دائماً في المعامل.", en: "OSPF election never preempts itself: the sitting DR remains until it loses connectivity or its processes restart — a rule new engineers keep colliding with in labs." },
      },
      {
        q: { ar: "جاران عالقان في حالة Init. ما أول ما تتحقق منه؟", en: "Two neighbors stuck at Init. What do you check first?" },
        options: [
          { ar: "تطابق Router-ID", en: "Router-ID match" },
          { ar: "تطابق المنطقة و المؤقتات Hello/Dead والقناع على الواجهتين", en: "Matching area, Hello/Dead timers, and mask on both interfaces" },
          { ar: "قيمة cost على الوصلات", en: "The link cost values" },
          { ar: "عدد المناطق في التصميم", en: "The number of areas in the design" },
        ],
        correct: 1,
        explain: { ar: "الرسائل تصل (وصلنا Init) لكن الشروط لا تكتمل للـ 2-Way: اختلاف المنطقة أو المؤقتات (10/40) أو القناع يمنع الترقية — فحص show ip ospf interface عند الطرفين يكشف الفرق فوراً.", en: "Messages arrive (we reached Init) but conditions for 2-Way fail: an area, timer (10/40), or mask mismatch blocks promotion — checking show ip ospf interface on both ends reveals the difference instantly." },
      },
    ],
  },
  {
    id: "l057",
    moduleId: "m06",
    order: 7,
    level: "advanced",
    title: { ar: "تكوين OSPF والتحقق العملي", en: "OSPF Configuration & Practical Verification" },
    summary: {
      ar: "أوامر التهيئة الكاملة من router ospf إلى wildcards وأوامر الشبك، مع معمل ثلاث موجّهات ومنطقتين، وأدوات التحقق الأربع وسلوك Router-ID.",
      en: "The complete configuration commands from router ospf to wildcards and network statements, a three-router two-area lab, the four verification tools, and Router-ID behavior.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "التهيئة الأساسية خطوة خطوة", en: "Basic Configuration Step by Step" },
        body: {
          ar: "تهيئة OSPF على موجّه Cisco أربع خطوات فقط في أبسط صورها:\n\nالخطوة 1 — إنشاء العملية: router ospf 1 — الرقم (Process ID) محلي في الموجّه نفسه فقط، لا يشترط تطابقه بين الموجّهات (خلافاً لـ EIGRP لاحقاً!).\n\nالخطوة 2 — تعيين Router-ID: router-id 1.1.1.1 — معرف فريد بصيغة IP يحدد الموجّه في المنطقة كلها (يستخدم في انتخابات DR وفك العلاقات). بلا تعيين يدوي: أعلى loopback وإلا أعلى عنوان فعلي.\n\nالخطوة 3 — إعلان الواجهات عبر network: network 10.1.1.0 0.0.0.255 area 0 — وهذا يفتح الباب لأشهر مصدر لغط في OSPF: الأقنعة العكسية (Wildcard).\n\nالخطوة 4 — الأوامر الوقائية: passive-interface للشبكات الطرفية (LANs) — اسكت عنها إرسال Hellos، مع بقائها معلنة للجيران.",
          en: "Configuring OSPF on a Cisco router is just four steps at its simplest:\n\nStep 1 — Create the process: router ospf 1 — the Process ID is local to the router itself and need not match between routers (unlike EIGRP later!).\n\nStep 2 — Assign a Router-ID: router-id 1.1.1.1 — a unique IP-format identifier naming the router across the area (used in DR elections and tie-breaks). Without manual assignment: the highest loopback, else the highest active address.\n\nStep 3 — Announce interfaces via network: network 10.1.1.0 0.0.0.255 area 0 — opening the door to OSPF's most famous confusion: wildcards.\n\nStep 4 — Protective commands: passive-interface for edge networks (LANs) — silence their Hellos while still advertising them.",
        },
        tip: {
          ar: "عدّل Router-ID فقط عند بدء تشغيل نظيف: التغيير يتطلب clear ip ospf process ويفصل كل الجيران مؤقتاً — خطط له في نوافذ الصيانة.",
          en: "Change Router-ID only on a clean restart: modifying it requires clear ip ospf process and briefly drops all neighbors — schedule inside maintenance windows.",
        },
      },
      {
        heading: { ar: "الأقنعة العكسية: البتات المتساهلة", en: "Wildcards: The Permissive Bits" },
        body: {
          ar: "أمر network في OSPF لا يأخذ قناعاً عادياً بل قناعاً عكسياً (Wildcard Mask) — عكس منطقي للقناع:\n\n- القناع العادي 255.255.255.0: البتات 1 = يجب أن تتطابق (شبكة)، 0 = حرة (مضيف)\n- القناع العكسي 0.0.0.255: البتات 0 = يجب أن تتطابق، 1 = لا يهم (متساهل)\n\nحيلة التحويل الفورية: wildcard = 255.255.255.255 ناقص القناع العادي:\n\n- /24 → 255.255.255.0 → 0.0.0.255\n- /25 → 255.255.255.128 → 0.0.0.127\n- /16 → 255.255.0.0 → 0.0.255.255\n\nقوة Wildcard الحقيقية: مطابقة نطاقات غير قابلة للتعبير بقناع عادي — مثل 0.0.0.3 مع 10.0.0.0 تطابق أربع عناوين فقط (0-3)، و 0.1.0.255 مطابقة إبداعية لنطاق موزع. اكتبها بالحدود الصغيرة الصريحة دائماً في التصاميم الحديثة.",
          en: "The network command in OSPF takes not an ordinary mask but a wildcard mask — the logical inverse:\n\n- Ordinary mask 255.255.255.0: 1-bits = must match (network), 0-bits = free (host)\n- Wildcard 0.0.0.255: 0-bits = must match, 1-bits = don't care (permissive)\n\nThe instant conversion trick: wildcard = 255.255.255.255 minus the ordinary mask:\n\n- /24 → 255.255.255.0 → 0.0.0.255\n- /25 → 255.255.255.128 → 0.0.0.127\n- /16 → 255.255.0.0 → 0.0.255.255\n\nThe wildcard's true power: matching ranges no ordinary mask can express — like 0.0.0.3 with 10.0.0.0 matching exactly four addresses (0-3), or 0.1.0.255 creatively matching a sparse range. Always write them small and explicit in modern designs.",
        },
        code: {
          lang: "cisco",
          snippet: "! R1: area 0 core, two LANs and a WAN link\nR1(config)# router ospf 1\nR1(config-router)# router-id 1.1.1.1\nR1(config-router)# network 10.1.1.0 0.0.0.255 area 0\nR1(config-router)# network 10.1.2.0 0.0.0.255 area 0\nR1(config-router)# network 192.168.12.0 0.0.0.3 area 0\nR1(config-router)# passive-interface g0/1\nR1(config-router)# end\n\n! Inject a default route into OSPF (border router)\nR1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1\nR1(config)# router ospf 1\nR1(config-router)# default-information originate",
        },
      },
      {
        heading: { ar: "معمل من منطقتين: R1 و R2 و R3", en: "A Two-Area Lab: R1, R2, R3" },
        body: {
          ar: "لنبنِ التصميم الكلاسيكي: R1 نواة في المنطقة 0، و R2 جسر حدود (ABR) بين 0 و 1، و R3 داخل المنطقة 1:\n\n- LAN A (خلف R1): 10.1.0.0/24 — منطقة 0\n- رابط R1-R2: 192.168.12.0/30 — منطقة 0\n- رابط R2-R3: 192.168.23.0/30 — منططقة 1\n- LAN B (خلف R3): 10.3.0.0/24 — منطقة 1\n\nملاحظات جوهرية على الحل:\n\n- واجهات R1 كلها في منطقة 0 — موجّه داخلي بسيط\n- واجهات R2 موزعة: نحو R1 منطقة 0 ونحو R3 منطقة 1 — هذا ما يجعله ABR حقيقياً؛ يلخص LAN A إلى المنطقة 1 بـ LSA نوع 3 و العكس\n- R3 كله منطقة 1 — لا يعرف تفاصيل المنطقة 0 أصلاً، فقط الملخصات\n\nبهذا المعمل المزدوج سترى سلوك المناطق حياً: LSA نوع 1 داخل كل منطقة، ونوع 3 يعبر الحدود، وجدول R3 يحمل مسارات O IA (Inter-Area) — واضح الأثر في show ip route ospf.",
          en: "Let us build the classic design: R1 core in Area 0, R2 the border bridge (ABR) between 0 and 1, R3 inside Area 1:\n\n- LAN A (behind R1): 10.1.0.0/24 — Area 0\n- R1-R2 link: 192.168.12.0/30 — Area 0\n- R2-R3 link: 192.168.23.0/30 — Area 1\n- LAN B (behind R3): 10.3.0.0/24 — Area 1\n\nEssential notes on the solution:\n\n- All of R1's interfaces sit in Area 0 — a simple internal router\n- R2's interfaces split: toward R1 in Area 0, toward R3 in Area 1 — what makes it a true ABR; it summarizes LAN A into Area 1 with a Type 3 LSA and vice versa\n- R3 lives wholly in Area 1 — it never knows Area 0's details, only summaries\n\nIn this dual lab you watch area behavior live: Type 1 LSAs within each area, Type 3 crossing the border, and R3's table carrying O IA (inter-area) routes — plainly visible in show ip route ospf.",
        },
        code: {
          lang: "cisco",
          snippet: "! R2 - the ABR (border lives here)\nR2(config)# router ospf 1\nR2(config-router)# router-id 2.2.2.2\nR2(config-router)# network 192.168.12.0 0.0.0.3 area 0\nR2(config-router)# network 192.168.23.0 0.0.0.3 area 1\n\n! R3 - internal to area 1\nR3(config)# router ospf 1\nR3(config-router)# router-id 3.3.3.3\nR3(config-router)# network 192.168.23.0 0.0.0.3 area 1\nR3(config-router)# network 10.3.0.0 0.0.0.255 area 1\nR3(config-router)# passive-interface g0/1\n\n! R3 sees area 0 routes as inter-area:\nR3# show ip route ospf\nO IA  10.1.0.0/24 [110/129] via 192.168.23.1, 00:03:41, Serial0/0/1\nO IA  192.168.12.0/30 [110/128] via 192.168.23.1, 00:03:41, Serial0/0/1",
        },
      },
      {
        heading: { ar: "أدوات التحقق الأربع الكبرى", en: "The Four Great Verification Tools" },
        body: {
          ar: "استكشاف OSPF يبدأ بأربعة أوامر — بهذا الترتيب تحديداً:\n\n- show ip ospf neighbor: هل الجيران FULL؟ من DR على كل قسم؟ أي جار عالق في ExStart (مشكلة MTU شهيرة!)؟\n- show ip ospf interface brief: لمحة كل واجهة: المنطقة، العنوان، عدد الجيران، الحالة (DR/BDR/DROTHER)\n- show ip ospf database: قاعدة البيانات — لكل نوع LSA عدّاده ومرسلوه. المصدر الأول عند الشك في المعلومات المنتشرة\n- show ip route ospf: الحصاد النهائي: أي المسارات دخل الجدول؟ O داخل المنطقة و O IA بين المناطق و O E2 خارجية\n\nتشخيص شهير يستحق الحفظ: جار عالق في ExStart/Exchange دائم المتهم الأول اختلاف MTU بين الطرفين (واجهة 1500 مقابل 1492 PPP مثلاً) — OSPF يرفض المزامنة وهو يظن الوصف غير متطابق.",
          en: "OSPF troubleshooting begins with four commands — in exactly this order:\n\n- show ip ospf neighbor: are neighbors FULL? Who is DR per segment? Anyone stuck in ExStart (the famous MTU issue!)?\n- show ip ospf interface brief: a snapshot per interface: area, address, neighbor count, role (DR/BDR/DROTHER)\n- show ip ospf database: the database itself — per LSA type, counts and originators. The first source when doubting circulating information\n- show ip route ospf: the final harvest: which routes entered the table? O for intra-area, O IA for inter-area, O E2 for external\n\nA famous diagnosis worth memorizing: a neighbor stuck at ExStart/Exchange has a prime suspect of MTU mismatch between ends (1500 versus 1492 on PPP, say) — OSPF refuses synchronization believing the descriptors disagree.",
        },
        tip: {
          ar: "أمر تصفية جبار: show ip ospf database router 3.3.3.3 يعرض LSA نوع 1 لموجّه بعينه بروابطه وكلفه — تتبع المنطقة كاملة من موقع واحد.",
          en: "A powerful filter: show ip ospf database router 3.3.3.3 displays one router's Type 1 LSA with its links and costs — tracing the whole area from one vantage point.",
        },
      },
    ],
    keyPoints: [
      { ar: "router ospf <معرف محلي> + router-id فريد + network بـ wildcard + area", en: "router ospf <local id> + unique router-id + network with wildcard + area" },
      { ar: "Wildcard = 255.255.255.255 - القناع العادي ( /24 → 0.0.0.255 )", en: "Wildcard = 255.255.255.255 - ordinary mask ( /24 → 0.0.0.255 )" },
      { ar: "ABR يربط المنطقة 0 بالمناطق الأخرى ويلخص بـ LSA نوع 3 — و ASBR يحقن الخارج", en: "The ABR links Area 0 to other areas summarizing via Type 3 — the ASBR injects externals" },
      { ar: "التحقق بالترتيب: neighbor ← interface brief ← database ← route ospf", en: "Verify in order: neighbor → interface brief → database → route ospf" },
      { ar: "جار عالق في ExStart = اتهم اختلاف MTU أولاً", en: "A neighbor stuck at ExStart = suspect MTU mismatch first" },
    ],
    commands: [
      { cmd: "show ip ospf neighbor", desc: { ar: "التحقق من وصول الجيران إلى FULL ومعرفة DR في كل شبكة", en: "Verify neighbors reach FULL and learn the DR per network" } },
      { cmd: "show ip ospf interface brief", desc: { ar: "جدول كل واجهة: المنطقة والدور والجيران", en: "A table of every interface: area, role, and neighbors" } },
      { cmd: "show ip ospf database", desc: { ar: "محتوى LSDB بأنواع LSA ومرسليها", en: "The LSDB contents with LSA types and originators" } },
      { cmd: "show ip route ospf", desc: { ar: "مسارات OSPF المثبتة: O و O IA و O E2", en: "Installed OSPF routes: O, O IA, and O E2" } },
    ],
    quiz: [
      {
        q: { ar: "network 192.168.12.16 0.0.0.15 area 0 — أي العناوين تطابق؟", en: "network 192.168.12.16 0.0.0.15 area 0 — which addresses match?" },
        options: [
          { ar: "عنوان واحد فقط: 192.168.12.16", en: "Only one address: 192.168.12.16" },
          { ar: "النطاق 192.168.12.16 حتى 192.168.12.31 (16 عنواناً /28)", en: "The range 192.168.12.16 through 192.168.12.31 (16 addresses, a /28)" },
          { ar: "النطاق 192.168.12.0 حتى 192.168.12.255", en: "The range 192.168.12.0 through 192.168.12.255" },
          { ar: "أي عنوان يبدأ بـ 192.168", en: "Any address starting with 192.168" },
        ],
        correct: 1,
        explain: { ar: "wildcard 0.0.0.15 يجعل أول 28 بتاً إلزامية (192.168.12.16) والبتات الأربعة الأخيرة حرة (0-15) — كتلة /28 كاملة من 16 عنواناً.", en: "The wildcard 0.0.0.15 locks the first 28 bits (192.168.12.16) and frees the last four (0-15) — a complete /28 block of 16 addresses." },
      },
      {
        q: { ar: "جارا OSPF عالقان في ExStart/Exchange رغم وصول Hellos. ما الفحص الأول؟", en: "Two OSPF neighbors stuck at ExStart/Exchange despite Hellos arriving. First check?" },
        options: [
          { ar: "اختلاف MTU على الرابط بينهما", en: "MTU mismatch on the link between them" },
          { ar: "معرف العملية router ospf غير متطابق", en: "Mismatched router ospf process IDs" },
          { ar: "عدد LSA كبير جداً", en: "Too many LSAs" },
          { ar: "قيمة cost متطابقة", en: "Identical cost values" },
        ],
        correct: 0,
        explain: { ar: "أشهر عالق لـ ExStart: اختلاف MTU — الوصف في DBD لا يتطابق فيرفض الطرف المزامنة. معرف العملية محلي لا يهم، و Hellos تصل فعلاً فالرابط سليم.", en: "The most famous ExStart blocker: MTU mismatch — the DBD descriptors disagree so a side refuses synchronization. Process IDs are local and irrelevant, and Hellos arriving proves the link healthy." },
      },
      {
        q: { ar: "مسار ظهر في جدولك برمز O IA. ما معناه؟", en: "A route appeared in your table marked O IA. Meaning?" },
        options: [
          { ar: "مسار داخل منطقتك نفسها", en: "A route inside your own area" },
          { ar: "مسار بين المناطق (Inter-Area) تعلمته من ABR عبر LSA نوع 3", en: "An inter-area route learned from an ABR via a Type 3 LSA" },
          { ar: "مسار خارجي من ASBR", en: "An external route from an ASBR" },
          { ar: "مسار ثابت معاد توزيعه", en: "A redistributed static route" },
        ],
        correct: 1,
        explain: { ar: "O = مسار OSPF داخل المنطقة (نوع 1/2)، و O IA = Inter-Area عبر ملخص ABR (نوع 3)، و O E1/E2 = مسارات خارجية حقنها ASBR — ثلاثة رموز تقرأها يومياً.", en: "O = OSPF intra-area (Types 1/2); O IA = inter-area via an ABR summary (Type 3); O E1/E2 = externals injected by an ASBR — three symbols you read daily." },
      },
    ],
  },
  {
    id: "l058",
    moduleId: "m06",
    order: 8,
    level: "advanced",
    title: { ar: "EIGRP: خوارزمية DUAL والمسارات الاحتياطية الجاهزة", en: "EIGRP: The DUAL Algorithm & Ready-Made Backups" },
    summary: {
      ar: "متجه المسافة المتقدم من Cisco: خوارزمية DUAL والمسافة المعلنة والمجدية، الخلف (Feasible Successor) الجاهز في الذاكرة، المقياس المركب، وتهيئة كاملة.",
      en: "Cisco's advanced distance vector: the DUAL algorithm with reported and feasible distances, the in-memory Feasible Successor, the composite metric, and a full configuration.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "ما الذي يجعله متجه مسافة متقدماً؟", en: "What Makes It an Advanced Distance Vector?" },
        body: {
          ar: "EIGRP (Enhanced Interior Gateway Routing Protocol) ملكية Cisco — يبدو متجه مسافة: لا يملك خريطة كاملة كـ OSPF، بل يتعلم من جيرانه. لكن آلية الداخل تنقله طبقات فوق RIP:\n\n- يتحدث مباشرة فوق IP بالبروتوكول رقم 88 (بلا TCP ولا UDP)، وبث متعدد 224.0.0.10\n- تحديثات جزئية ومطلقة: يرسل التغيرات فقط عند حدوثها — لا جداول كاملة دورية\n- بروتوكول نقل موثوق داخلي (RTP) يضمن وصول التحديثات مع إشعار استلام\n- اكتشاف الجيران بـ Hello صغير (كل 5 ثوانٍ، و Hold ثلاثة أضعافها 15)\n- الخوارزمية الحاكمة: DUAL (Diffusing Update Algorithm) — التي تحسب بلا حلقات من حيث المبدأ\n\nالنتيجة العملية: تقارب في أجزاء من الثانية بمسار احتياطي جاهز سلفاً — دون كلفة ذاكرة خرائط OSPF.",
          en: "EIGRP (Enhanced Interior Gateway Routing Protocol) is Cisco proprietary — it looks distance-vector: no complete map like OSPF, learning from neighbors. But its inner machinery lifts it layers above RIP:\n\n- Speaks directly over IP protocol 88 (no TCP, no UDP), multicast 224.0.0.10\n- Partial, bounded updates: sends only changes when they happen — no periodic full tables\n- A built-in reliable transport (RTP) guaranteeing update delivery with acknowledgments\n- Neighbor discovery with small Hellos (every 5 seconds, Hold threefold at 15)\n- The governing algorithm: DUAL (Diffusing Update Algorithm) — provably loop-free\n\nThe practical result: convergence in fractions of a second with a backup pre-computed in memory — without OSPF's map-memory cost.",
        },
      },
      {
        heading: { ar: "DUAL والمصطلحات الأربعة الكبرى", en: "DUAL & the Four Great Terms" },
        body: {
          ar: "EIGRP يدير ثلاثة جداول: الجيران (Neighbors) و الطوبولوجيا (Topology — كل المسارات المسموعة بكل تفاصيلها) و التوجيه (Routing — الأفضل فقط). ومن جدول الطوبولوجيا يعمل DUAL بمصطلحات أربعة يجب أن تتقنها كاسمك:\n\n- Successor: أفضل مسار نحو الوجهة — الذي يدخل جدول التوجيه\n- FD (Feasible Distance): مقياس Successor — تكلفتي الإجمالية عبر المسار الأفضل\n- RD (Reported Distance) ويسمى أيضاً AD (Advertised Distance): مقياس الجار نحو الوجهة — كما أعلنه لي\n- Feasible Successor (FS): مسار احتياطي يحقق شرط الجدية\n\nشرط الجدية (Feasibility Condition) — قلب DUAL كله: يكون المسار بديلاً مجدياً إذا كان RD الجار أقل من FD الحالي — أي: جاري أقرب إلى الوجهة مني عبر مساري الحالي — وهذا ضمان رياضي أن اتباعه لا يصنع حلقة.\n\nعند سقوط ال Successor: إن وجد FS مستوفياً الشرط، يرتقي فوراً بلا أي حساب جديد ولا سؤال جيران — تقارب صفر زمن. وإن لم يوجد، يسأل DUAL جيرانه (الحالة Active) قبل الحسم.",
          en: "EIGRP maintains three tables: neighbors, topology (every heard route with full detail), and routing (the best only). From the topology table DUAL operates with four terms you must master like your name:\n\n- Successor: the best route toward the destination — the one entering the routing table\n- FD (Feasible Distance): the Successor's metric — my total cost through the best route\n- RD (Reported Distance), also called Advertised Distance: the neighbor's own metric toward the destination — as announced to me\n- Feasible Successor (FS): a backup route satisfying the feasibility condition\n\nThe Feasibility Condition — the whole heart of DUAL: a route is a feasible backup if the neighbor's RD is lower than my current FD — meaning: my neighbor is closer to the destination than I am through my current route — a mathematical guarantee that following it creates no loop.\n\nWhen the Successor falls: if an FS satisfying the condition exists, it promotes instantly with no fresh computation and no neighbor queries — zero-time convergence. If none exists, DUAL queries neighbors (the Active state) before deciding.",
        },
        code: {
          lang: "text",
          snippet: "Topology table sample for 10.4.0.0/16:\n\nP 10.4.0.0/16, 2 successors, FD is 3072\n        via 10.1.1.2 (3072/2816), Gi0/0      <- Successor  (FD/RD)\n        via 10.1.1.3 (3584/2816), Gi0/0      <- Feasible Successor\n        via 10.9.9.4 (4096/3900), S0/0/1     <- NOT feasible (RD 3900 > FD 3072)\n\nFeasibility check: neighbor RD must be < my FD\n  2816 < 3072  -> feasible backup  (promotes instantly if main link dies)\n  3900 > 3072  -> mathematically unsafe, never a silent backup",
        },
        tip: {
          ar: "افهم الشرط بحدسه: RD أقل من FD يعني (الجار أقرب للوجهة مني) — اتباع الأقرب منك لا يعيدك إلى نفسك أبداً، وهذا جوهر منع الحلقات في DUAL.",
          en: "Grasp it intuitively: RD below FD means the neighbor is closer to the destination than I am — following someone closer never leads back to you, the essence of DUAL's loop prevention.",
        },
      },
      {
        heading: { ar: "المقياس المركب: عرض النطاق والتأخير", en: "The Composite Metric: Bandwidth & Delay" },
        body: {
          ar: "معادلة EIGRP الأصلية (Classic Metric) صياغتها الرسمية:\n\nالمقياس = [K1×عرض النطاق + K3×التأخير] × 256 (عند الأوزان الافتراضية K1=K3=1 و البقية صفر)\n\n- عرض النطاق هنا: أضيق رابط في المسار كله (بالكيبوبت/ثانية، مقلوباً: 10^7 ÷ bw)\n- التأخير: مجموع تأخيرات كل الروابط على المسار (بعشرات الميكروثانية)\n- عامل 256 قديم تاريخي من عهد IGRP\n\nمثال رقمي سريع: مسار عبر إيثرنت 10 ميغابت (bw=10000 kbps، تأخير 1000) ثم تسلسلي 1544 kbps (تأخير 20000):\n\n- عرض النطاق الحاكم: 1544 → 10^7 ÷ 1544 = 6476 (مقرّباً)\n- مجموع التأخير = 1000 + 20000 = 21000\n- المقياس = (6476 + 21000) × 256 = 27147676 / قيم IOS تقرأها مباشرة في الجداول\n\nالمقارنة الحاسمة مع RIP: روابط 10 جيجابت و 100 جيجابت تُميَّز فعلاً هنا (وفي OSPF)، بينما عند RIP قفزة قفزة فقط. و EIGRP يقدم أوزان واسعة (K5 لإضافة الموثوقية والحمل — لا تستخدمها عملياً؛ كلفة تشخيص عالية وفائدة نادرة).",
          en: "EIGRP's original (classic) metric formula in official form:\n\nMetric = [K1×bandwidth + K3×delay] × 256 (at default weights K1=K3=1, rest zero)\n\n- Bandwidth here: the narrowest link along the whole path (in kbps, inverted: 10^7 ÷ bw)\n- Delay: the sum of every link's delay along the path (in tens of microseconds)\n- The 256 factor is a historical relic from the IGRP era\n\nA quick numeric example: a path over 10 Mbps Ethernet (bw=10000 kbps, delay 1000) then a 1544 kbps serial (delay 20000):\n\n- Governing bandwidth: 1544 → 10^7 ÷ 1544 = 6476 (rounded)\n- Summed delay = 1000 + 20000 = 21000\n- Metric = (6476 + 21000) × 256 = 27,147,676 / IOS reads the values straight from the tables\n\nThe decisive comparison with RIP: 10 Gbps and 100 Gbps links genuinely differ here (and in OSPF), while for RIP they are one hop each. EIGRP also offers wider weights (K5 adding reliability and load — avoid them practically: high diagnosis cost, rare benefit).",
        },
      },
      {
        heading: { ar: "التهيئة والتحقق", en: "Configuration & Verification" },
        body: {
          ar: "ملاحظة تحسم الالتباس الأول: رقم عملية EIGRP (Autonomous System Number) يجب أن يتطابق بين الموجّهات لتتحدث فيما بينها — تماماً عكس Process ID في OSPF المحلي.\n\nالتهيئة الكلاسيكية (بنحو أمر network العكسي نفسه):\n\n- router eigrp 100 ثم network 10.0.0.0 0.0.0.255 (يدعم wildcards مثل OSPF — أدق من صيغة RIP الطبقية)\n- no auto-summary: إلزامي — ملخص التلقائي عند حدود الفئات يفسد التصاميم الحديثة\n- passive-interface g0/1: اسكت واجهات LAN عن الجيران\n\nالنمط الحديث المسمى (Named Mode) يجمع كل شيء تحت عنوان واحد: router eigrp MY-CORP ثم address-family ipv4 unicast autonomous-system 100 — الوصية المهنية اليوم للمشاريع الجديدة.\n\nموازنة الأحمال غير المتساوية ميزة EIGRP الفريدة: الأمر variance 2 يسمح بتوزيع الحركة على مسارين حتى لو كان الأضعف ضعفي تكة الأقوى مقياساً — أدوات جودة خطوط لا يقدمها OSPF بسهولة.",
          en: "A confusion-settling note: the EIGRP process number (Autonomous System number) must match between routers for them to converse — exactly opposite OSPF's local Process ID.\n\nClassic configuration (with the same inverse network command):\n\n- router eigrp 100 then network 10.0.0.0 0.0.0.255 (supports wildcards like OSPF — more precise than RIP's classful form)\n- no auto-summary: mandatory — automatic class-boundary summarization corrupts modern designs\n- passive-interface g0/1: silence LAN interfaces toward neighbors\n\nThe modern Named Mode gathers everything under one heading: router eigrp MY-CORP then address-family ipv4 unicast autonomous-system 100 — today's professional recommendation for new projects.\n\nUnequal-cost load balancing is EIGRP's unique gift: the command variance 2 allows splitting traffic across two paths even when the weaker is up to twice the stronger's metric — line-quality tools OSPF does not offer easily.",
        },
        code: {
          lang: "cisco",
          snippet: "R1(config)# router eigrp 100\nR1(config-router)# eigrp router-id 1.1.1.1\nR1(config-router)# network 10.1.0.0 0.0.0.255\nR1(config-router)# network 192.168.12.0 0.0.0.3\nR1(config-router)# no auto-summary\nR1(config-router)# passive-interface g0/1\n\nR1# show ip eigrp neighbors\nIP-EIGRP neighbors for process 100\nH   Address     Interface  Hold  Uptime   SRTT  RTO  Q  Cnt\n1   192.168.12.2  Se0/0/0   12   00:15:02  28   200  0  0\n\nR1# show ip eigrp topology\nP 10.3.0.0/24, 1 successors, FD is 2172416\n        via 192.168.12.2 (2172416/2816), Serial0/0/0",
        },
      },
    ],
    keyPoints: [
      { ar: "EIGRP فوق IP 88 بتحديثات جزئية موثقة (RTP) و Hello كل 5 ثوانٍ و Hold 15", en: "EIGRP runs over IP 88 with reliable partial updates (RTP), Hellos every 5s and Hold 15" },
      { ar: "شرط الجدية: RD الجار أقل من FD الحالي — ضمان رياضي بلا حلقات", en: "Feasibility condition: neighbor's RD below my current FD — a mathematical loop-free guarantee" },
      { ar: "Feasible Successor جاهز في الذاكرة يرتقي فوراً عند سقوط المسار الرئيس", en: "The Feasible Successor waits in memory and promotes instantly on main-path failure" },
      { ar: "المقياس: أضيق عرض نطاق + مجموع التأخيرات (بوزن K1 و K3) × 256", en: "Metric: narrowest bandwidth + summed delays (K1, K3 weights) × 256" },
      { ar: "رقم AS في EIGRP يجب تطابقه بين الموجّهات — عكس Process ID المحلي في OSPF", en: "EIGRP's AS number must match across routers — unlike OSPF's local Process ID" },
    ],
    commands: [
      { cmd: "show ip eigrp neighbors", desc: { ar: "قائمة الجيران بمؤقتات Hold وأزمنة الإرسال", en: "The neighbor list with Hold timers and send times" } },
      { cmd: "show ip eigrp topology", desc: { ar: "كنز المسارات: Successors و Feasible Successors بقيم FD و RD", en: "The route treasure: Successors and Feasible Successors with FD and RD values" } },
      { cmd: "show ip route eigrp", desc: { ar: "مسارات D المثبتة في جدول التوجيه", en: "Installed D routes in the routing table" } },
    ],
    quiz: [
      {
        q: { ar: "مسار FD الحالي 3072 وجار بديل RD له 2816. هل هو Feasible Successor؟", en: "Current FD is 3072 and an alternate neighbor's RD is 2816. Is it a Feasible Successor?" },
        options: [
          { ar: "لا — يجب أن يتجاوز RD قيمة FD", en: "No — RD must exceed FD" },
          { ar: "نعم — RD (2816) أقل من FD (3072) فيحقق شرط الجدية", en: "Yes — RD (2816) below FD (3072) satisfies the feasibility condition" },
          { ar: "يعتمد على عدد القفزات بينهما", en: "It depends on the hop count between them" },
          { ar: "يعتمد على تطابق Router-ID", en: "It depends on Router-ID matching" },
        ],
        correct: 1,
        explain: { ar: "شرط الجدية صريح: RD < FD. الجار أعلن مقياسه الذاتي 2816 وهو أقل من تكلفتي 3072، فيصلح خلفاً فورياً يرتقي بلا استفسار عند فشل الرئيس.", en: "The feasibility condition is explicit: RD < FD. The neighbor advertised its own metric 2816, below my 3072 cost, qualifying as an instant-promoting backup on main failure." },
      },
      {
        q: { ar: "ما ميزة EIGRP على OSPF في موازنة الأحمال؟", en: "What load-balancing advantage does EIGRP hold over OSPF?" },
        options: [
          { ar: "يوازن على مسارات متساوية فقط مثل الجميع", en: "It balances only on equal paths like everyone" },
          { ar: "يوازن على مسارات غير متساوية عبر أمر variance", en: "It balances on unequal paths via the variance command" },
          { ar: "لا يدعم الموازنة أصلاً", en: "It supports no balancing at all" },
          { ar: "يوازن تلقائياً بلا أوامر مطلقاً", en: "It balances automatically with no commands at all" },
        ],
        correct: 1,
        explain: { ar: "OSPF الافتراضي يوازن المسارات متساوية المقياس فقط؛ EIGRP بـ variance يوزع النسب على مسارات مختلفة الجودة — استثمار روابط أضعف بدل تركها خاملة.", en: "Default OSPF balances only equal-metric paths; EIGRP with variance splits ratios across differently-quality paths — investing weaker links instead of idling them." },
      },
      {
        q: { ar: "رقم العملية في router eigrp 100 — ما شرطه؟", en: "The process number in router eigrp 100 — what is its requirement?" },
        options: [
          { ar: "محلي في الموجّه ولا يهم تطابقه", en: "Local to the router, matching irrelevant" },
          { ar: "يجب أن يتطابق بين كل الموجّهات لتتشارك الجيرة", en: "Must match across all routers for neighborship" },
          { ar: "قيمة عالمية من IANA", en: "A global IANA-assigned value" },
          { ar: "يساوي عدد المناطق دائماً", en: "Always equals the number of areas" },
        ],
        correct: 1,
        explain: { ar: "رقم AS في EIGRP جزء من هوية البروتوكول: جاران برقمين مختلفين يتجاهلان رسائل بعضهما. أما Process ID في OSPF فمحلي بحت ويمكن أن يختلف بين الجيران — التباس شهير بين الاختبارات.", en: "EIGRP's AS number is part of the protocol identity: two neighbors with different numbers ignore each other's messages. OSPF's Process ID is purely local and may differ — a famous exam confusion." },
      },
    ],
  },
  {
    id: "l059",
    moduleId: "m06",
    order: 9,
    level: "advanced",
    title: { ar: "BGP والإنترنت: توجيه الأنظمة المستقلة", en: "BGP & the Internet: Routing Between Autonomous Systems" },
    summary: {
      ar: "مفهوم النظام المستقل ASN، الفرق بين eBGP و iBGP، علاقات Peering و Transit، سلسلة سمات القرار، وتهيئة أول جارة BGP — وحكايات اختطاف المسارات.",
      en: "The Autonomous System concept, eBGP vs iBGP, peering and transit relations, the attribute decision chain, your first BGP neighbor configuration — and route-hijacking tales.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "النظام المستقل: مواطن الإنترنت", en: "The Autonomous System: Citizen of the Internet" },
        body: {
          ar: "الإنترنت ليس شبكة واحدة — إنه اتحاد فضفاض من ~75 ألف شبكة مستقلة إدارياً وتجارياً تسمى الأنظمة المستقلة (AS - Autonomous Systems)، لكل منها رقم تعريف (ASN).\n\n- ASN تقليدي 16 بت: 1 حتى 65,535 — النطاق الخاص للتدريب: 64,512 حتى 65,534\n- ASN موسع 32 بت (منذ 2007): حتى 4,294,967,295 — النطاق الخاص فيه يبدأ من 4,200,000,000 فما فوق\n- توزع الأرقام السلطات الإقليمية (RIPE و ARIN و APNIC...) لمزودي الخدمة والمنظمات الكبرى\n\nداخل AS يعمل IGP (OSPF عادة) ليعرف الموجّهات شبكاته الداخلية، و AS يحادث جيرانه من الأنظمة الأخرى عبر BGP — إنهما عالمان منفصلان بالكامل في التصميم الواقعي.",
          en: "The Internet is not one network — it is a loose federation of ~75,000 administratively and commercially independent networks called Autonomous Systems (AS), each with an identifier (ASN).\n\n- Traditional 16-bit ASN: 1 through 65,535 — the private training range: 64,512 to 65,534\n- Extended 32-bit ASN (since 2007): up to 4,294,967,295 — its private range starts at 4,200,000,000\n- Numbers are assigned by the regional registries (RIPE, ARIN, APNIC...) to providers and large organizations\n\nInside an AS runs an IGP (usually OSPF) so routers know their internal networks; the AS converses with neighboring systems via BGP — two fully separate worlds in real-world design.",
        },
      },
      {
        heading: { ar: "BGP بروتوكول متجه المسار: سياسة قبل سرعة", en: "BGP the Path-Vector: Policy Before Speed" },
        body: {
          ar: "BGP (Border Gateway Protocol — الإصدار 4 المعيار الحالي RFC 4271) لا يحسب أقصر مسار ولا أسرعه — يتبع سياسات من يديره عبر سمات تنتقل مع كل مسار:\n\n- يعمل فوق TCP على المنفذ 179: اتصال مستقر دائم بين الجيران (بدل الإرسال المتقطع)\n- يرسل تحديثات فقط عند التغير — لا إعلانات دورية للجداول\n- المسار يحمل قائمة الأنظمة التي عبرها (AS_PATH): المسار عبر 3 أنظمة يفوز على عبر 6 إن تساوى ما قبله\n\nأشهر السمات التي تصنع القرار (بترتيب مبسط من أولويات القرار الحقيقية):\n\n- LOCAL_PREF (الأعلى يفوز): تفضيل محلي يقرر أي مخرج نحو الخارج\n- AS_PATH (الأقصر يفوز): عدد الأنظمة المقطوعة\n- ORIGIN ثم MED (الأقل يفوز): تلميحة المزود المجاور\n- الوزن (Weight) — أعلى أولوية لكنه محلي للموجّه الواحد\n\nالفارق الفلسفي عن OSPF: لو عرض جارك مساراً أطول لكنه أرخص تجارياً — تتبعه! الإنترنت يوجه بالعقود قبل الكيلومترات.",
          en: "BGP (Border Gateway Protocol — version 4 is the current standard, RFC 4271) computes neither the shortest nor fastest path — it follows its operator's policies via attributes traveling with every route:\n\n- It runs over TCP port 179: a stable permanent connection between neighbors (instead of intermittent sending)\n- It sends updates only on change — no periodic table advertisements\n- A route carries the list of systems it crossed (AS_PATH): a path through 3 ASes beats one through 6 if all else ties\n\nThe most famous attributes shaping the decision (a simplified slice of the real priority chain):\n\n- LOCAL_PREF (highest wins): a local preference choosing the exit toward the outside\n- AS_PATH (shortest wins): the count of crossed systems\n- ORIGIN then MED (lowest wins): the adjacent provider's hint\n- Weight — highest authority but local to a single router\n\nThe philosophical break from OSPF: if a neighbor offers a longer but commercially cheaper path — you take it! The Internet routes by contracts before kilometers.",
        },
        tip: {
          ar: "جرّب stat.ripe.net أو LG (Looking Glass) لأي مزود كبير: اكتب عنواناً وستعرض مسار AS_PATH الحقيقي من مزودهم نحوه — نافذة حية على جدول BGP العالمي.",
          en: "Try stat.ripe.net or any major provider's Looking Glass: enter an address and it shows the real AS_PATH from their side — a live window onto the global BGP table.",
        },
      },
      {
        heading: { ar: "eBGP و iBGP وعلاقات السوق", en: "eBGP, iBGP, & Market Relations" },
        body: {
          ar: "BGP نوعان بحسب موقع الجارين:\n\n- eBGP (خارجي): بين موجّهين في نظامين مختلفين — مباشر عادة على رابط فيزيائي مشترك. AD = 20 (يخسر فقط للموصول مباشرة)\n- iBGP (داخلي): بين موجّهات النظام الواحد — يجري فوق نفق IGP الداخلي. AD = 200\n\nقاعدة iBGP الذهبية: ما تعلمته من iBGP لا تعاده لـ iBGP آخر — منع حلقات داخلي يفرض الشبكة الكاملة (Full Mesh) بين موجّهات iBGP، أو استخدام Route Reflectors لتخفيفها\n\nعلاقات الأنظمة الثلاث الكبرى — قلب اقتصاد الإنترنت:\n\n- Transit (العبور): تدفع ليصل حركك عبري نحو الإنترنت كله — علاقة زبون-مزود\n- Peering (التشارك): اتفاق تبادل حركة متبادلة مباشرة بلا أموال غالباً (مثل علاقة مزودين متكافئين)\n- IXP (نقطة التبادل): مبانٍ تلتقي فيها مئات الأنظمة بملقاط واحد لتبادل peering جماعي\n\nالمبدأ الجامع: كل نظام يعلن مساراته، ومن يقبل — يقبل — والإنترنت شبكة ثقة ضمن حدود عقود.",
          en: "BGP comes in two flavors by neighbor location:\n\n- eBGP (external): between routers of two different systems — usually direct over a shared physical link. AD = 20 (losing only to directly connected)\n- iBGP (internal): among one system's own routers — riding the internal IGP. AD = 200\n\nThe golden iBGP rule: what you learned from iBGP you never re-advertise to another iBGP peer — an internal loop guard forcing a full mesh among iBGP routers, or Route Reflectors to relax it\n\nThe three great system relations — the heart of Internet economics:\n\n- Transit: you pay so your traffic crosses me toward the whole Internet — a customer-provider relation\n- Peering: an agreement exchanging mutual traffic directly, usually moneyless (two equal providers, say)\n- IXP (Internet Exchange Point): buildings where hundreds of systems meet on one switch fabric for collective peering\n\nThe unifying principle: every system announces its routes, and whoever accepts — accepts; the Internet is a trust network bounded by contracts.",
        },
        code: {
          lang: "cisco",
          snippet: "! eBGP between AS 65001 and AS 65002\nR1(config)# router bgp 65001\nR1(config-router)# bgp router-id 1.1.1.1\nR1(config-router)# neighbor 203.0.113.2 remote-as 65002\nR1(config-router)# network 198.51.100.0 mask 255.255.255.0\n\nR1# show ip bgp summary\nNeighbor     V   AS  MsgRcvd  MsgSent  TblVer  State\n203.0.113.2  4   65002   412      409      57    Established\n\nR1# show ip bgp\nNetwork          Next Hop      Metric LocPrf Path\n*> 198.51.100.0/24  0.0.0.0        0      -    i\n*  203.0.115.0/24  203.0.113.2     0      -    65002 64500 i",
        },
      },
      {
        heading: { ar: "قصة رعب حقيقية: اختطاف المسارات", en: "A True Horror Story: Route Hijacking" },
        body: {
          ar: "BGP يفترض حسن نية الجيران — والتاريخ ملّصق بحوادث خالفة:\n\nالحادثة الأشهر (2008): باكستان Telekom أرادت فرض رقابة داخلية على يوتيوب فأعلنت كتلته /24 بمسار أقصر، لكن التسريب خرج للإنترنت كله — سحب حركة يوتيوب العالمية نحو باكستان وأسقط الموقع دقائق على مستوى الكوكب.\n\n2021: Facebook (Meta) سحبت بادئتها الـ /24 الكبرى نفسها بتحديث BGP خاطئ داخلي — سقطت المنصات كلها 6 ساعات كاملة، وذهب العالم يظن أن الإنترنت نفسه انهار.\n\nالدروس الهندسية:\n\n- التحديث الواحد الخاطئ ينتشر عالمياً في دقائق\n- شهادة RPKI (وقّيع البادئات) تحمي من قصص كهذه — تنفيذها ينمو لكنه غير شامل\n- الترشيح (Prefix Filtering) عند الحدود واجب مهني: لا تقبل إلا ما تعرفه عن جارك\n\nهذا درس BGP الأعمق: بروتوكول واحد يربط الكوكب وثقة بلا قفل — قوته وهشاشته وجهان لعملة واحدة.",
          en: "BGP assumes neighbors' good faith — and history is plastered with contrary incidents:\n\nThe most famous (2008): Pakistan Telecom wanted internal censorship of YouTube and announced its /24 with a shorter path; the leak escaped to the whole Internet — pulling global YouTube traffic into Pakistan and downing the site planet-wide for minutes.\n\n2021: Facebook (Meta) withdrew its own big /24 prefixes with an erroneous internal BGP update — all platforms fell for a full 6 hours, and the world assumed the Internet itself had collapsed.\n\nThe engineering lessons:\n\n- A single wrong update spreads globally within minutes\n- RPKI certification (signed prefixes) protects against such tales — deployment grows but remains incomplete\n- Prefix filtering at the border is a professional duty: accept nothing about your neighbor you do not know\n\nThis is BGP's deepest lesson: one protocol stitching the planet together on trust without a lock — its power and fragility two faces of one coin.",
        },
      },
    ],
    keyPoints: [
      { ar: "الإنترنت ~75 ألف نظام مستقل ASN؛ النطاق الخاص 64,512-65,534", en: "The Internet is ~75,000 autonomous systems; the private ASN range is 64,512-65,534" },
      { ar: "BGP يعمل فوق TCP 179: تحديثات بالتغير فقط وسياسات عبر السمات", en: "BGP rides TCP 179: change-only updates and policies through attributes" },
      { ar: "eBGP بين الأنظمة (AD 20)، و iBGP داخلها (AD 200) بمبدأ عدم إعادة الإعلان", en: "eBGP between systems (AD 20); iBGP inside one (AD 200) with the no-readvertise rule" },
      { ar: "القرار: Weight ثم LOCAL_PREF ثم AS_PATH ثم MED — عقود قبل مسافات", en: "The decision: Weight, then LOCAL_PREF, then AS_PATH, then MED — contracts before distances" },
      { ar: "Peering و Transit و IXP هي اقتصاد الإنترنت؛ و RPKI يحمي من الاختطاف", en: "Peering, transit, and IXPs are the Internet's economy; RPKI guards against hijacking" },
    ],
    commands: [
      { cmd: "show ip bgp summary", desc: { ar: "حالة جلسات BGP مع الجيران — Established هي الحالة الصحية", en: "BGP session status with neighbors — Established is the healthy state" } },
      { cmd: "show ip bgp", desc: { ar: "جدول BGP الكامل: البادئات والمسارات AS_PATH وسماتها", en: "The full BGP table: prefixes, AS_PATHs, and attributes" } },
      { cmd: "traceroute -A 8.8.8.8", desc: { ar: "تتبع يعرض رقم AS لكل قفزة (متبعاً AS_PATH عملياً)", en: "A traceroute showing each hop's AS number (walking AS_PATH live)" } },
    ],
    quiz: [
      {
        q: { ar: "BGP يفضل المسار عبر أي سمة أولاً (من منظور القرار الكامل)؟", en: "Which attribute does BGP prefer first (from the full decision standpoint)?" },
        options: [
          { ar: "أقصر AS_PATH دوماً وأبداً", en: "The shortest AS_PATH always and forever" },
          { ar: "Weight ثم LOCAL_PREF قبل AS_PATH — السياسة المحلية تتقدم على طول المسار", en: "Weight then LOCAL_PREF before AS_PATH — local policy precedes path length" },
          { ar: "MED الأدنى أولاً", en: "The lowest MED first" },
          { ar: "أسرع رابط فيزيائياً", en: "The fastest physical link" },
        ],
        correct: 1,
        explain: { ar: "السلسلة الحقيقية: Weight ثم LOCAL_PREF ثم أقصر AS_PATH ثم ORIGIN و MED... أي أن قرار المخرج المحلي والسياسة يتقدمان على عدّ الأنظمة — لهذا يمر حركة مزود عبر جار أطول لكنه أرخص.", en: "The real chain: Weight, then LOCAL_PREF, then shortest AS_PATH, then ORIGIN and MED... meaning the local exit decision and policy precede the AS count — why a provider's traffic crosses a longer but cheaper neighbor." },
      },
      {
        q: { ar: "ما الفرق الجوهري بين eBGP و iBGP؟", en: "What is the essential difference between eBGP and iBGP?" },
        options: [
          { ar: "eBGP يستخدم UDP و iBGP يستخدم TCP", en: "eBGP uses UDP while iBGP uses TCP" },
          { ar: "eBGP بين نظامين مستقلين (AD 20) و iBGP داخل نظام واحد (AD 200) بمنع إعادة الإعلان", en: "eBGP between independent systems (AD 20) and iBGP within one system (AD 200) with no re-advertisement" },
          { ar: "لا فرق سوى السرعة", en: "No difference except speed" },
          { ar: "iBGP للأجهزة القديمة فقط", en: "iBGP is for legacy hardware only" },
        ],
        correct: 1,
        explain: { ar: "كلاهما فوق TCP 179 لكن الجيرة مختلفة: eBGP بين AS مختلفين ويضع رقم AS في المسار؛ iBGP داخل AS الواحد و يمنع إعادة توزيع ما تعلمه بين أقرانه لمنع الحلقات.", en: "Both ride TCP 179 but the neighborships differ: eBGP crosses distinct ASes, appending the AS number to paths; iBGP stays within one AS, forbidding re-advertising learned routes among peers to prevent loops." },
      },
      {
        q: { ar: "أعلن مزود بطريق الخطأ كتلة جاره بسلسلة أقصر. ماذا يحدث على الإنترنت؟", en: "A provider mistakenly announces a neighbor's block with a shorter chain. What happens Internet-wide?" },
        options: [
          { ar: "لا شيء — BGP يرفض المسارات المتكررة", en: "Nothing — BGP rejects duplicate routes" },
          { ar: "ينجذب جزء من حركة العالم نحو المعلن الخاطئ — اختطاف مسارات قد يسقط خدمات عالمياً", en: "Part of global traffic diverts toward the false announcer — route hijacking potentially downing services worldwide" },
          { ar: "يُسقط المعلن من الإنترنت تلقائياً", en: "The announcer is automatically ejected from the Internet" },
          { ar: "تتحول الحركة إلى IPv6", en: "Traffic shifts to IPv6" },
        ],
        correct: 1,
        explain: { ar: "بلا رقابة RPKI أو ترشيح، البادئة الأقصر مساراً تجذب الحركة عالمياً — حادثة يوتيوب/باكستان 2008 نموذجها، ولهذا فرض الترشيح و RPKI واجب مهني اليوم.", en: "Without RPKI or filtering, the shorter-path prefix attracts traffic globally — the 2008 YouTube/Pakistan incident is the model, hence filtering and RPKI are today's professional duty." },
      },
    ],
  },
  {
    id: "l060",
    moduleId: "m06",
    order: 10,
    level: "advanced",
    title: { ar: "توجيه IPv6: المسارات الثابتة و OSPFv3", en: "IPv6 Routing: Static Routes & OSPFv3" },
    summary: {
      ar: "قراءة جدول التوجيه السداسي، المسارات الثابتة v6 وبوابة ::/0، تهيئة OSPFv3 بواجهاتها المنفعلة إفرادياً، و RIPng السريع — والتحقق بأوامر ipv6.",
      en: "Reading the hexadecimal routing table, static v6 routes and the ::/0 gateway, OSPFv3's per-interface activation, quick RIPng — and verification with the ipv6 commands.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "جدول التوجيه في عالم IPv6", en: "The Routing Table in the IPv6 World" },
        body: {
          ar: "جدول توجيه IPv6 يشبه ابن عمه الرابع لكن بلغة سداسية و مفاجآت جميلة:\n\n- الرموز نفسها: C و L (المحلي /128 — أوسع انتشاراً من IPv4 لأن كل واجهة تحمل عناوين متعددة) و O و D و B و S\n- البادئات أطول (/64 بدلاً من /24) والأرقام أخف على العين من عناوين عشرية متتالية\n- القفزة التالية غالباً عنوان ربط محلي fe80:: — لأن روابط IPv6 تعرف بعضها بالربط المحلي لا بالعام\n\nملاحظة بنيوية مهمة: المسارات عبر ربط محلي تربط المتغيرين: عند قراءة via fe80::x لا تسأل عن أي واجهة؟ الجواب موجود في سطر المسار نفسه — واجهة الخروج.\n\nقبل أي شيء: بدون الأمر ip؟ لا — في IOS الحديث: ipv6 unicast-routing أولاً وإلا بقي جهازك مضيفاً IPv6 لا موجّهاً (ذكرناه في درس IPv6 ونجدد التذكير هنا لأنه أشهر خطأ في معامل IPv6).",
          en: "The IPv6 routing table resembles its fourth-generation cousin but in hexadecimal with pleasant surprises:\n\n- Same codes: C, L (the /128 local — more widespread than IPv4 since every interface holds multiple addresses), O, D, B, S\n- Prefixes run longer (/64 instead of /24) and the numbers sit easier on the eye than chained decimals\n- The next hop is usually a link-local fe80:: address — because IPv6 links know each other by link-local, not global\n\nA structural note: routes through link-locals tie the variables together: reading via fe80::x, do not ask which interface — the answer sits in the route line itself, the exit interface.\n\nBefore anything: without the command — in modern IOS run ipv6 unicast-routing first, or your box remains an IPv6 host, never a router (mentioned in the IPv6 lesson and renewed here as the most common lab mistake).",
        },
        code: {
          lang: "cisco",
          snippet: "R1# show ipv6 route\nIPv6 Routing Table - 6 entries\nC   2001:DB8:CAFE:1::/64 [0/0]\n     via GigabitEthernet0/0, directly connected\nL   2001:DB8:CAFE:1::1/128 [0/0]\n     via GigabitEthernet0/0, receive\nO   2001:DB8:CAFE:2::/64 [110/65]\n     via FE80::2A0:27FF:FE5B:8A2C, GigabitEthernet0/1\nS   2001:DB8:BEEF::/48 [1/0]\n     via 2001:DB8:CAFE:FF::2\nO*E2 ::/0 [110/1]\n     via FE80::2A0:27FF:FE5B:8A2C, GigabitEthernet0/1",
        },
      },
      {
        heading: { ar: "المسارات الثابتة في IPv6", en: "Static Routes in IPv6" },
        body: {
          ar: "الصياغة توأم IPv4 تماماً — مع الالتواء السداسي:\n\n- قفزة تالية: ipv6 route 2001:db8:2::/64 2001:db8:12::2\n- واجهة خروج (روابط نقطة لنقطة): ipv6 route 2001:db8:2::/64 serial 0/0/0\n- القفزة التالية ربط محلي: ipv6 route 2001:db8:2::/64 gi0/1 fe80::2 — لاحظ وجوب ذكر الواجهة مع ربط محلي (لأن fe80 يوجد على كل واجهة!)\n- المسار الافتراضي: ipv6 route ::/0 2001:db8:12::2 — قناة النور نحو الإنترنت\n\nمسار المضيف الواحد موجود أيضاً: ipv6 route 2001:db8:1::5/128 ... — بادئة 128 بت لوجهة واحدة بالضبط، تستخدم للأمان والتوجيه الدقيق.\n\nنصيحة صيانة: لأن العناوين الست عشرية أطول، خطأ خانة واحدة يضيع الشبكة كلها — انسخ العناوين لا تعدها يدوياً، وتحقق بـ show ipv6 route بعد كل إضافة.",
          en: "The syntax is IPv4's exact twin — with a hexadecimal twist:\n\n- Next hop: ipv6 route 2001:db8:2::/64 2001:db8:12::2\n- Exit interface (point-to-point links): ipv6 route 2001:db8:2::/64 serial 0/0/0\n- Link-local next hop: ipv6 route 2001:db8:2::/64 gi0/1 fe80::2 — note the interface is mandatory with a link-local (since fe80 exists on every interface!)\n- The default route: ipv6 route ::/0 2001:db8:12::2 — the tunnel of light toward the Internet\n\nSingle-host routes also exist: ipv6 route 2001:db8:1::5/128 ... — a 128-bit prefix for exactly one destination, used for security and precise steering.\n\nA maintenance tip: hexadecimal addresses run long, so one mistyped digit loses the whole network — copy addresses instead of retyping, and verify with show ipv6 route after every addition.",
        },
      },
      {
        heading: { ar: "OSPFv3: التهيئة عبر الواجهات مباشرة", en: "OSPFv3: Configuration Straight on Interfaces" },
        body: {
          ar: "OSPFv3 (RFC 5340) نظير IPv6 لـ OSPFv2 — الخوارزمية نفسها والمناطق نفسها و DR/BDR نفسها — لكن فلسفة التهيئة انقلبت:\n\nفي OSPFv2: أعلن شبكات عبر network داخل العملية. في OSPFv3: فعّل البروتوكول على الواجهة نفسها:\n\n- ipv6 router ospf 1 (أو router ospfv3 1 في الأنظمة الأحدث) ثم اذهب للواجهة\n- على الواجهة: ipv6 ospf 1 area 0 — كل واجهة تنتمي لمنطقتها مباشرة\n\nلماذا الانقلاب؟ لأن واجهة IPv6 تحمل عناوين متعددة (ربط محلي + عام + مؤقت...) — إعلانها كوحدة واحدة أدق من شبكات IPv4 الواحدة. الاتصالات كلها تجري عبر ربط محلي وعناوين البث المتعدد ff02::5 و ff02::6.\n\nميزة عملية رائعة: IPv6 مسار ومنطقة IPv4 مسار آخر على نفس الواجهة بلا تداخل — يدعم تشغيل v2 و v3 معاً في التكديس المزدوج بجيران مستقلين.",
          en: "OSPFv3 (RFC 5340) is OSPFv2's IPv6 twin — same algorithm, same areas, same DR/BDR — but the configuration philosophy flipped:\n\nIn OSPFv2: announce networks via network inside the process. In OSPFv3: activate the protocol on the interface itself:\n\n- ipv6 router ospf 1 (or router ospfv3 1 on newer systems), then go to the interface\n- On the interface: ipv6 ospf 1 area 0 — each interface joins its area directly\n\nWhy the flip? Because an IPv6 interface bears multiple addresses (link-local + global + temporary...) — announcing it as one unit is cleaner than IPv4's single networks. All communication runs over link-local with multicast ff02::5 and ff02::6.\n\nA wonderful practical bonus: the IPv6 process and the IPv4 process run on the same interface without overlap — supporting v2 and v3 together in dual stack with independent neighbors.",
        },
        code: {
          lang: "cisco",
          snippet: "R1(config)# ipv6 unicast-routing\n\nR1(config)# ipv6 router ospf 1\nR1(config-rtr)# router-id 1.1.1.1\n\nR1(config)# interface g0/0\nR1(config-if)# ipv6 address 2001:db8:cafe:1::1/64\nR1(config-if)# ipv6 ospf 1 area 0\n\nR1(config)# interface s0/0/0\nR1(config-if)# ipv6 address 2001:db8:12::1/64\nR1(config-if)# ipv6 ospf 1 area 0\n\nR1# show ipv6 ospf neighbor\nNeighbor ID     Pri  State      Dead Time  Interface\n2.2.2.2          1   FULL/ -    00:00:35   Serial0/0/0\n\nR1# show ipv6 route ospf\nO   2001:DB8:CAFE:2::/64 [110/65]\n     via FE80::2, Serial0/0/0",
        },
      },
      {
        heading: { ar: "RIPng والتحقق الشامل", en: "RIPng & Full Verification" },
        body: {
          ar: "للكمال التاريخي: RIPng (الإصدار السداسي من RIP) يعمل فوق UDP المنفذ 521 ويستخدم البث المتعدد ff02::9 — مقياسه القفزات نفسها بحد 15. حضوره اليوم رمزي في المعدات القديمة والكتب.\n\nوفي لينكس الحديث تعمل منظومة كاملة ببروتوكولات بديلة (Babel و babeld و FRRouting الذي يجمع OSPF و BGP وغيرها لنواة واحدة) — كلها بجدول واحد تقرؤه بـ ip -6 route.\n\nبروتوك التحقق الرسمي لمعمل IPv6 كامل:\n\n- show ipv6 interface brief: هل العناوين في مكانها؟\n- show ipv6 route: هل الجدول يجمع C و L و O و S كما نتوقع؟\n- show ipv6 ospf neighbor: هل الجيران FULL؟\n- ping <عنوان عام بعيد> من موجّه الحدود: هل تصل المسافة البعيدة؟\n- traceroute6: القفزات بالربط المحلي في كل مرحلة — مظهر IPv6 الصريح\n\nبهذا تكتمل رحلة الوحدة: من جدول التوجيه الصغير إلى بروتوكولات تشغّل الكوكب — والخطوة التالية في المنصة: طبقة النقل حيث تتحول الشبكة إلى خدمات.",
          en: "For historical completeness: RIPng (RIP's hexadecimal edition) runs over UDP port 521 using multicast ff02::9 — the same hop metric capped at 15. Its presence today is symbolic, in legacy gear and textbooks.\n\nOn modern Linux a full ecosystem runs alternative protocols (Babel and babeld, and FRRouting bundling OSPF, BGP, and more into one daemon) — all feeding a single table you read with ip -6 route.\n\nThe official verification protocol for a complete IPv6 lab:\n\n- show ipv6 interface brief: are the addresses in place?\n- show ipv6 route: does the table gather C, L, O, and S as expected?\n- show ipv6 ospf neighbor: are neighbors FULL?\n- ping <a far global address> from the border router: does distance respond?\n- traceroute6: hops by link-local at every stage — IPv6's signature look\n\nThis completes the module's journey: from the small routing table to protocols running the planet — and the platform's next step: the transport layer, where the network becomes services.",
        },
        tip: {
          ar: "معاملة خطأ المسار v6: كثيراً ما يكون السبب نسيان ipv6 unicast-routing على موجّه وسيط — الجيران موجودون والعناوين سليمة لكن لا يمر شيء: فحصه يستغرق ثانية ويفسر نصف قضايا المعمل.",
          en: "The classic v6 path failure: forgetting ipv6 unicast-routing on a middle router — neighbors present, addresses healthy, yet nothing passes: checking it takes a second and explains half of all lab cases.",
        },
      },
    ],
    keyPoints: [
      { ar: "ipv6 unicast-routing شرط الحياة: بدونه الموجّه مضيف IPv6 لا موجّه", en: "ipv6 unicast-routing is the life condition: without it the router is an IPv6 host, not a router" },
      { ar: "القفزات التالية في IPv6 غالباً ربط محلي fe80:: مع ذكر الواجهة", en: "Next hops in IPv6 are usually link-local fe80:: with the interface stated" },
      { ar: "المسار الافتراضي ::/0 — توأم 0.0.0.0/0 تماماً", en: "The default route ::/0 — the exact twin of 0.0.0.0/0" },
      { ar: "OSPFv3 يفعّل بالواجهة: ipv6 ospf <process> area <n> — لا أوامر network", en: "OSPFv3 activates per interface: ipv6 ospf <process> area <n> — no network statements" },
      { ar: "RIPng فوق UDP 521 بالبث المتعدد ff02::9 — حضور رمزي اليوم", en: "RIPng rides UDP 521 with multicast ff02::9 — symbolic presence today" },
    ],
    commands: [
      { cmd: "show ipv6 route", desc: { ar: "جدول التوجيه السداسي: الرموز نفسها وبادئات /64 و /128", en: "The hexadecimal routing table: same codes with /64 and /128 prefixes" } },
      { cmd: "ipv6 route ::/0 2001:db8:12::2", desc: { ar: "المسار الافتراضي نحو الإنترنت في IPv6", en: "The default route toward the Internet in IPv6" } },
      { cmd: "show ipv6 ospf neighbor", desc: { ar: "التحقق من جيران OSPFv3 وحالتهم FULL", en: "Verify OSPFv3 neighbors and their FULL state" } },
      { cmd: "ip -6 route show", desc: { ar: "قراءة جدول IPv6 على لينكس", en: "Read the IPv6 table on Linux" } },
    ],
    quiz: [
      {
        q: { ar: "عند كتابة قفزة تالية ربط محلي fe80:: في مسار v6 ثابت، ما الإضافة الواجبة؟", en: "When using a link-local fe80:: next hop in a static v6 route, what must you add?" },
        options: [
          { ar: "لا شيء — يكفي العنوان", en: "Nothing — the address suffices" },
          { ar: "واجهة الخروج مع العنوان — لأن fe80 موجود على كل واجهة فيتشابه", en: "The exit interface with the address — fe80 exists on every interface, creating ambiguity" },
          { ar: "قناع الشبكة الكامل", en: "The full network mask" },
          { ar: "رقم المنطقة", en: "The area number" },
        ],
        correct: 1,
        explain: { ar: "عناوين الربط المحلي ليست فريدة عالمياً — كل واجهة لها fe80 خاص، فلا يعرف الموجّه أي جار تقصد بلا واجهة: ipv6 route ... gi0/1 fe80::2.", en: "Link-local addresses are not globally unique — every interface has its own fe80, so without the interface the router cannot know which neighbor: ipv6 route ... gi0/1 fe80::2." },
      },
      {
        q: { ar: "ما الفرق الجوهري في تهيئة OSPFv3 مقابل OSPFv2 على Cisco؟", en: "What is the essential OSPFv3 versus OSPFv2 configuration difference on Cisco?" },
        options: [
          { ar: "v3 يستخدم أوامر network داخل العملية مثله", en: "v3 uses network statements inside the process like v2" },
          { ar: "v3 يفعّل على كل واجهة بـ ipv6 ospf <pid> area <n> بدل أوامر network", en: "v3 activates per interface with ipv6 ospf <pid> area <n> instead of network statements" },
          { ar: "v3 لا يدعم المناطق أصلاً", en: "v3 supports no areas at all" },
          { ar: "v3 يهيأ عبر DHCPv6", en: "v3 is configured through DHCPv6" },
        ],
        correct: 1,
        explain: { ar: "فلسفة v3 انقلبت لأن واجهة IPv6 تحمل عناوين متعددة: التفعيل إفرادي بالواجهة (ipv6 ospf 1 area 0) — أدق تعبيراً عن حقيقتها بلا أوامر network بالوسائط العكسية.", en: "v3's philosophy flipped because an IPv6 interface carries multiple addresses: activation is per interface (ipv6 ospf 1 area 0) — truer to reality, with no wildcard network statements." },
      },
      {
        q: { ar: "أعدت كل العناوين في مختبر IPv6 والجيران OSPFv3 FULL لكن لا تمر الحزم بين الشبكات. ما أول ما تفحصه؟", en: "You configured every address in an IPv6 lab, OSPFv3 neighbors are FULL, yet packets do not cross between networks. What do you check first?" },
        options: [
          { ar: "أمر ipv6 unicast-routing على كل موجّه", en: "The ipv6 unicast-routing command on every router" },
          { ar: "تغيير Router-ID", en: "Changing Router-IDs" },
          { ar: "إضافة مسارات ثابتة لكل شيء", en: "Adding static routes for everything" },
          { ar: "تعطيل البث المتعدد", en: "Disabling multicast" },
        ],
        correct: 0,
        explain: { ar: "بدون ipv6 unicast-routing يرفض IOS توجيه حزم IPv6 بين واجهاته مهما كانت الجداول سليمة — جيران FULL على روابط مباشرة لا يثبتون التوجيه العابر. أشهر فخ معمل IPv6 بإجماع المهندسين.", en: "Without ipv6 unicast-routing IOS refuses to forward IPv6 packets between its interfaces no matter how healthy the tables — FULL neighbors on direct links never prove transit forwarding. The most famous IPv6 lab trap by engineering consensus." },
      },
    ],
  },
];
