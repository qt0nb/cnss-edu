import type { Lesson } from "@/lib/types";

export const m01_LESSONS: Lesson[] = [
  {
    id: "l001",
    moduleId: "m01",
    order: 1,
    level: "beginner",
    title: { ar: "ما هي شبكات الحاسوب ولماذا نتعلمها؟", en: "What is a Computer Network & Why Learn It?" },
    summary: {
      ar: "تعريف الشبكة وعناصرها الخمسة، ولماذا تُعد مهارات الشبكات من أعلى المهارات طلباً في سوق العمل التقني.",
      en: "The definition of a network and its five elements, and why networking is one of the most in-demand tech skills.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "التعريف الأساسي", en: "Core Definition" },
        body: {
          ar: "شبكة الحاسوب (Computer Network) هي مجموعة من الأجهزة المتصلة ببعضها عبر وسائط نقل، تتبادل البيانات وفق بروتوكولات (Protocols) متفق عليها.\n\nيمكن تبسيط أي شبكة في الكون إلى عناصر خمسة: المُرسِل (Sender)، المستقبِل (Receiver)، الرسالة (Message)، وسيط النقل (Medium)، والبروتوكول (Protocol).\n\n- المرسل والمستقبل: حواسيب، هواتف، خوادم، طابعات، كاميرات\n- الوسيط: كابل نحاس، ألياف ضوئية، أو موجات لاسلكية\n- البروتوكول: قواعد الحوار مثل TCP و IP",
          en: "A computer network is a set of devices connected through transmission media that exchange data according to agreed-upon protocols.\n\nAny network in existence can be simplified into five elements: sender, receiver, message, medium, and protocol.\n\n- Sender & receiver: computers, phones, servers, printers, cameras\n- Medium: copper cable, fiber optics, or radio waves\n- Protocol: conversation rules such as TCP and IP",
        },
      },
      {
        heading: { ar: "ماذا تمنحنا الشبكات؟", en: "What Networks Give Us" },
        body: {
          ar: "الشبكات تتيح أربع قدرات أساسية غيّرت العالم:\n\n- مشاركة الموارد (Resource Sharing): طابعة واحدة لعشرين موظفاً\n- مشاركة المعلومات: قواعد بيانات ومستندات مركزية\n- الاتصال: بريد، مكالمات، مؤتمرات فيديو\n- الموثوقية والتوزّع: نسخ احتياطية وموازنة أحمال\n\nبدون الشبكات لكان كل جهاز جزيرة معزولة. الإنترنت نفسه هو أكبر شبكة على الإطلاق — شبكة الشبكات (Network of Networks).",
          en: "Networks provide four fundamental capabilities that changed the world:\n\n- Resource sharing: one printer for twenty employees\n- Information sharing: central databases and documents\n- Communication: email, calls, video conferencing\n- Reliability & distribution: backups and load balancing\n\nWithout networks, every device would be an isolated island. The Internet itself is the largest network ever built — a network of networks.",
        },
      },
      {
        heading: { ar: "لماذا تتعلم الشبكات الآن؟", en: "Why Learn Networking Now?" },
        body: {
          ar: "كل شيء يتصل اليوم: السحابة، الهواتف، السيارات، المصانع، وحتى الثلاجات (IoT). هذا يعني طلباً هائلاً متواصلاً على مهندسي الشبكات.\n\n- معلوماتك تمر عبر الشبكة حتى وأنت تقرأ هذا الدرس\n- كل تطبيق حديث يعتمد على الشبكة بلا استثناء\n- وظائف الشبكات من أعلى الوظائف استقراراً لأنها بنية تحتية\n\nمسار التعلم المنظم من هذه المنصة يقودك خطوة بخطوة حتى مستوى الاحتراف الهندسي.",
          en: "Everything connects today: cloud, phones, cars, factories, even fridges (IoT). This means enormous continuous demand for network engineers.\n\n- Your data crosses networks even while you read this lesson\n- Every modern app depends on networking, no exceptions\n- Networking jobs are among the most stable because they are infrastructure\n\nThe structured path on this platform takes you step by step to professional engineering level.",
        },
        tip: {
          ar: "ابدأ بفهم بيتك: افتح صفحة إعدادات الراوتر (غالباً 192.168.1.1) واستكشف الأجهزة المتصلة.",
          en: "Start with your home: open your router settings page (usually 192.168.1.1) and explore connected devices.",
        },
      },
      {
        heading: { ar: "خريطة رحلتك التعليمية", en: "Your Learning Journey Map" },
        body: {
          ar: "علوم الشبكات تُبنى طبقة فوق طبقة مثل البناء نفسه:\n\n- أولاً: المفاهيم والطوبولوجيا (الوحدة الأولى)\n- ثانياً: نموذج OSI الذي يفسر كيف تسافر البيانات (الوحدة الثانية)\n- ثالثاً: الكابلات والإشارات الفيزيائية (الوحدة الثالثة)\n- ثم: المبدلات والتوجيه وعنونة IP — قلب المهنة\n- وأخيراً: الأمن واللاسلكي والأتمتة والمسار المهني\n\nكل وحدة تعتمد على سابقتها، لذا لا تتخطَّ الدروس أبداً دون فهم.",
          en: "Networking science builds layer upon layer, like construction itself:\n\n- First: concepts and topologies (module 1)\n- Second: the OSI model explaining how data travels (module 2)\n- Third: cables and physical signals (module 3)\n- Then: switching, routing and IP addressing — the heart of the craft\n- Finally: security, wireless, automation and career paths\n\nEach module builds on the previous one, so never skip lessons without understanding.",
        },
      },
    ],
    keyPoints: [
      { ar: "الشبكة = أجهزة + وسائط + بروتوكولات لتبادل البيانات", en: "Network = devices + media + protocols for data exchange" },
      { ar: "العناصر الخمسة: مرسل، مستقبل، رسالة، وسيط، بروتوكول", en: "The five elements: sender, receiver, message, medium, protocol" },
      { ar: "الإنترنت = شبكة الشبكات العملاقة", en: "The Internet = the giant network of networks" },
      { ar: "فوائد الشبكات: مشاركة الموارد والمعلومات والاتصال والموثوقية", en: "Network benefits: resource, information sharing, communication, reliability" },
    ],
    commands: [
      { cmd: "ping 8.8.8.8", desc: { ar: "اختبار الاتصال بخادم عام في الإنترنت", en: "Test connectivity to a public Internet server" } },
      { cmd: "ipconfig /all", desc: { ar: "عرض إعدادات الشبكة الكاملة لجهازك (ويندوز)", en: "Show full network configuration of your device (Windows)" } },
      { cmd: "ip addr show", desc: { ar: "عرض واجهات الشبكة (لينكس)", en: "Show network interfaces (Linux)" } },
    ],
    quiz: [
      {
        q: { ar: "ما العنصر الذي يحدد قواعد الحوار بين الأجهزة؟", en: "Which element defines the conversation rules between devices?" },
        options: [
          { ar: "وسيط النقل", en: "The transmission medium" },
          { ar: "البروتوكول", en: "The protocol" },
          { ar: "المرسل", en: "The sender" },
          { ar: "الرسالة", en: "The message" },
        ],
        correct: 1,
        explain: { ar: "البروتوكول هو مجموعة القواعد المتفق عليها لتنسيق الاتصال، مثل TCP/IP.", en: "The protocol is the agreed set of rules coordinating communication, such as TCP/IP." },
      },
      {
        q: { ar: "الإنترنت في جوهره هو:", en: "The Internet at its core is:" },
        options: [
          { ar: "حاسوب خارق واحد", en: "One giant supercomputer" },
          { ar: "برنامج تشغيل", en: "An operating system" },
          { ar: "شبكة من الشبكات", en: "A network of networks" },
          { ar: "كابل واحد عالمي", en: "One global cable" },
        ],
        correct: 2,
        explain: { ar: "الإنترنت شبكة عملاقة تربط ملايين الشبكات الصغرى عبر بروتوكول TCP/IP موحد.", en: "The Internet is a giant network interconnecting millions of smaller networks using the unified TCP/IP protocol." },
      },
      {
        q: { ar: "أي مما يلي ليس فائدة أساسية للشبكات؟", en: "Which of the following is NOT a core network benefit?" },
        options: [
          { ar: "مشاركة الموارد", en: "Resource sharing" },
          { ar: "زيادة سرعة المعالج", en: "Increasing CPU speed" },
          { ar: "الاتصال والتواصل", en: "Communication" },
          { ar: "الموثوقية عبر التوزّع", en: "Reliability through distribution" },
        ],
        correct: 1,
        explain: { ar: "الشبكات لا تؤثر على سرعة المعالج؛ بل تنقل البيانات وتشارك الموارد.", en: "Networks do not affect CPU speed; they move data and share resources." },
      },
    ],
  },
  {
    id: "l002",
    moduleId: "m01",
    order: 2,
    level: "beginner",
    title: { ar: "أنواع الشبكات: LAN و WAN و MAN و PAN", en: "Network Types: LAN, WAN, MAN, PAN" },
    summary: {
      ar: "تصنيف الشبكات حسب المدى الجغرافي من الشبكة الشخصية حتى الشبكة العالمية، مع أمثلة واقعية لكل نوع.",
      en: "Classifying networks by geographic span from personal to global, with real-world examples of each type.",
    },
    durationMin: 10,
    sections: [
      {
        heading: { ar: "التصنيف حسب المدى", en: "Classification by Span" },
        body: {
          ar: "أبسط طريقة لتصنيف الشبكات هي المدى الجغرافي الذي تغطيه:\n\n- PAN (Personal): أمتار قليلة — اتصال هاتفك بسماعة بلوتوث\n- LAN (Local): مبنى أو طابق واحد — شبكة المنزل أو المكتب\n- MAN (Metropolitan): مدينة كاملة — ربط فروع جامعة داخل مدينة\n- WAN (Wide): دولة أو قارة أو العالم — الإنترنت نفسه\n\nكلما اتسع المدى قلّت سرعتك غالباً وارتفعت التكلفة وزادت الحاجة لمزوّدي الخدمة (ISPs).",
          en: "The simplest classification is geographic span:\n\n- PAN (Personal): a few meters — your phone to a Bluetooth headset\n- LAN (Local): one building or floor — home or office network\n- MAN (Metropolitan): an entire city — university branches across a city\n- WAN (Wide): a country, continent, or the globe — the Internet itself\n\nThe wider the span, the slower your link usually is, the higher the cost, and the more you depend on ISPs.",
        },
      },
      {
        heading: { ar: "الشبكة المحلية LAN بعمق", en: "The LAN in Depth" },
        body: {
          ar: "LAN هي شبكتك اليومية: منزل، مكتب، مدرسة. تملكها أنت بالكامل.\n\n- سرعات عالية جداً: 1 و10 و40 و100 جيجابت في الثانية شائعة اليوم\n- زمن استجابة (Latency) منخفض بالميكروثانية/ميلي ثانية\n- تقنيّاتها: الإيثرنت (Ethernet) عبر الكابلات أو Wi-Fi\n\nشبكة LAN ممتدة عبر عدة مبانٍ بمرافق نفس المنظمة تسمى أحياناً CAN (Campus)، وإذا ربطت موقعين في مدينتين عبر خط مستأجر صارت WAN خاصة.",
          en: "The LAN is your daily network: home, office, school. You own it entirely.\n\n- Very high speeds: 1, 10, 40 and 100 Gbps are common today\n- Low latency in microseconds/milliseconds\n- Technologies: Ethernet over cables or Wi-Fi\n\nA LAN stretched across several buildings of the same organization is sometimes called a CAN (Campus); connect two sites in different cities with a leased line and it becomes a private WAN.",
        },
      },
      {
        heading: { ar: "الشبكة الواسعة WAN والإنترنت", en: "The WAN and the Internet" },
        body: {
          ar: "WAN تربط شبكات LAN متباعدة عبر بنية تحتية لا تملكها أنت:\n\n- تقنياتها التاريخية: خطوط مؤجرة (Leased Lines)، Frame Relay، ATM\n- الحديثة: MPLS و VPN عبر الإنترنت وخطوط الألياف\n- مثال كلاسيكي: فروع بنك في مدن مختلفة تربطها WAN مركزية\n\nالإنترنت أكبر WAN عامة في العالم، بينما تبقى شبكات WAN الخاصة للأمان والسيطرة على جودة الخدمة.",
          en: "A WAN connects distant LANs over infrastructure you do not own:\n\n- Legacy technologies: leased lines, Frame Relay, ATM\n- Modern: MPLS, VPNs over the Internet, fiber circuits\n- Classic example: bank branches in different cities tied to a central WAN\n\nThe Internet is the largest public WAN, while private WANs remain for security and quality-of-service control.",
        },
        tip: {
          ar: "Wi-Fi ليس مرادفاً لـ LAN — بل تقنية داخل LAN. كثير من الخلط الشائع هنا!",
          en: "Wi-Fi is not a synonym for LAN — it is a technology inside a LAN. Common confusion!",
        },
      },
    ],
    keyPoints: [
      { ar: "PAN أمتار، LAN مبنى، MAN مدينة، WAN دولة/عالم", en: "PAN meters, LAN building, MAN city, WAN country/world" },
      { ar: "LAN مملوكة ذاتياً وبسرعات جيجابت عالية", en: "LANs are self-owned with high gigabit speeds" },
      { ar: "WAN تعتمد على مزودي الخدمة وتقنيات مثل MPLS/VPN", en: "WANs depend on providers and technologies like MPLS/VPN" },
      { ar: "Wi-Fi تقنية ضمن LAN وليست نوع شبكة منفصل", en: "Wi-Fi is a technology within a LAN, not a separate network type" },
    ],
    commands: [
      { cmd: "ipconfig", desc: { ar: "رؤية نطاق شبكتك المحلية (192.168.x.x عادة)", en: "See your local network range (usually 192.168.x.x)" } },
      { cmd: "tracert 8.8.8.8", desc: { ar: "تتبع مسار حزمك عبر WAN نحو الإنترنت", en: "Trace your packets through the WAN toward the Internet" } },
    ],
    quiz: [
      {
        q: { ar: "شبكة تربط فروع شركة داخل مدينة واحدة تسمى:", en: "A network connecting company branches within one city is called:" },
        options: [
          { ar: "PAN", en: "PAN" },
          { ar: "LAN", en: "LAN" },
          { ar: "MAN", en: "MAN" },
          { ar: "WAN", en: "WAN" },
        ],
        correct: 2,
        explain: { ar: "MAN تغطي مدينة كاملة، مثل ربط فروع جامعة أو شركة داخل المدينة نفسها.", en: "A MAN covers a whole city, such as linking branches within the same city." },
      },
      {
        q: { ar: "اتصال هاتفك بسماعة بلوتوث يُصنف:", en: "Your phone connecting to a Bluetooth headset is classified as:" },
        options: [
          { ar: "PAN", en: "PAN" },
          { ar: "LAN", en: "LAN" },
          { ar: "MAN", en: "MAN" },
          { ar: "WAN", en: "WAN" },
        ],
        correct: 0,
        explain: { ar: "المدى الشخصي (أمتار قليلة حول الشخص) هو تعريف PAN.", en: "A personal range of a few meters around the person defines a PAN." },
      },
    ],
  },
  {
    id: "l003",
    moduleId: "m01",
    order: 3,
    level: "beginner",
    title: { ar: "طوبولوجيات الشبكات: النجمة والناقل والحلقة والشبكية", en: "Network Topologies: Star, Bus, Ring, Mesh" },
    summary: {
      ar: "الأشكال الهندسية لربط الأجهزة، ومزايا وعيوب كل شكل، ولماذا انتصرت النجمة في الشبكات الحديثة.",
      en: "The geometric shapes for connecting devices, pros and cons of each, and why the star won in modern networks.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "النجمة Star — ملكة الحديث", en: "Star — Queen of Modern Networks" },
        body: {
          ar: "كل جهاز يتصل بجهاز مركزي (مبدّل Switch اليوم) عبر وصلة خاصة.\n\n- الميزة الكبرى: فشل جهاز أو وصلة لا يعطل بقية الشبكة\n- سهولة التشخيص: المشكلة معزولة في وصلة واحدة\n- إضافة أجهزة سهلة: وصلة جديدة للمبدّل\n- العيب: المبدّل المركزي نقطة فشل وحيدة (SPOF)\n\nكل شبكات الإيثرنت الحديثة نجمة عملياً — وهذا ما ستبنيه في المحاكي.",
          en: "Every device connects to a central device (today a switch) with its own link.\n\n- Biggest advantage: a failed device or link does not disable the rest\n- Easy troubleshooting: the problem is isolated to one link\n- Adding devices is easy: a new link to the switch\n- Drawback: the central switch is a single point of failure (SPOF)\n\nAll modern Ethernet networks are effectively stars — this is what you will build in the simulator.",
        },
      },
      {
        heading: { ar: "الناقل Bus والحلقة Ring — دروس التاريخ", en: "Bus & Ring — Lessons from History" },
        body: {
          ar: "في الناقل (Bus) تتشارك كل الأجهزة كابلاً واحداً، فترسل عليه الجميع وتتصادم الإشارات (Collisions) فتحتاج آلية CSMA/CD.\n\n- عيوبه: اصطدامات كثيرة، وصلة واحدة مقطوعة تفصل الشبكة، صعوبة التشخيص\n\nفي الحلقة (Ring) يمر الإطار من جهاز لجاره حتى يعود لمنشئه (توكن Token يمنع التصادم).\n\n- عيوبها: حلقة مقطوعة تعطل الكل، وزمن وصول يزيد مع عدد الأجهزة\n\nكلاهما اختفى عملياً من LAN الحديثة وبقي في كتب الشهادات كمفاهيم أساسية.",
          en: "In a bus, all devices share one cable, everyone transmits on it, signals collide, and CSMA/CD is needed.\n\n- Drawbacks: heavy collisions, one broken cable splits the network, hard troubleshooting\n\nIn a ring, a frame passes device to device until it returns to its creator (a token prevents collisions).\n\n- Drawbacks: a broken ring kills everyone, and access delay grows with device count\n\nBoth effectively vanished from modern LANs but remain in certification books as foundational concepts.",
        },
      },
      {
        heading: { ar: "الشبكية Mesh والهجينة", en: "Mesh & Hybrid" },
        body: {
          ar: "الشبكية الكاملة (Full Mesh) تربط كل جهاز بكل جهاز آخر: عدد الوصلات = n(n-1)/2.\n\n- لـ 6 أجهزة تحتاج 15 وصلة! مكلفة لكن موثوقيتها قصوى\n- تستخدم في النوى (Core) وشبكات WAN الحساسة ومراكز البيانات\n\nالشبكية الجزئية (Partial Mesh) تربط المهم فقط بالمهم.\n\nالهجينة (Hybrid) تجمع أشكالاً: نجمة في كل طابق + شبكية بين المبدلات الرئيسية — وهذا تصميم الشبكات المؤسسية الواقعي.",
          en: "A full mesh connects every device to every other: links = n(n-1)/2.\n\n- For 6 devices you need 15 links! Expensive but maximum reliability\n- Used in cores, critical WANs and datacenters\n\nA partial mesh links only the important-to-important nodes.\n\nHybrid combines shapes: a star per floor + mesh between core switches — the realistic enterprise design.",
        },
        tip: {
          ar: "احفظ قانون الوصلات n(n-1)/2 — سؤال شهير في كل اختبارات الشبكات!",
          en: "Memorize the link formula n(n-1)/2 — a famous question in every networking exam!",
        },
      },
    ],
    keyPoints: [
      { ar: "النجمة: المعيار الحديث، عزل الأعطال، لكن مركزها SPOF", en: "Star: modern standard, fault isolation, but central SPOF" },
      { ar: "الناقل والحلقة تاريخياً فقط في LAN", en: "Bus and ring are LAN history only" },
      { ar: "Full Mesh: وصلات n(n-1)/2 وموثوقية قصوى وتكلفة عالية", en: "Full mesh: n(n-1)/2 links, max reliability, high cost" },
      { ar: "الشبكات الواقعية هجينة: نجمة وصول + شبكية نواة", en: "Real networks are hybrid: star access + mesh core" },
    ],
    commands: [
      { cmd: "show interfaces status", desc: { ar: "في مبدّل Cisco: منافذ النجمة وحالاتها", en: "On a Cisco switch: your star ports and their states" } },
    ],
    quiz: [
      {
        q: { ar: "كم وصلة تحتاج شبكية كاملة لـ 5 أجهزة؟", en: "How many links does a full mesh of 5 devices need?" },
        options: [
          { ar: "5", en: "5" },
          { ar: "10", en: "10" },
          { ar: "20", en: "20" },
          { ar: "25", en: "25" },
        ],
        correct: 1,
        explain: { ar: "القانون n(n-1)/2 = 5×4/2 = 10 وصلات.", en: "The formula n(n-1)/2 = 5×4/2 = 10 links." },
      },
      {
        q: { ar: "ما أكبر عيب في طوبولوجيا النجمة؟", en: "What is the star topology's biggest weakness?" },
        options: [
          { ar: "كثرة التصادمات", en: "Frequent collisions" },
          { ar: "صعوبة إضافة أجهزة", en: "Hard to add devices" },
          { ar: "الجهاز المركزي نقطة فشل وحيدة", en: "The central device is a single point of failure" },
          { ar: "بطء شديد في السرعة", en: "Severe speed limits" },
        ],
        correct: 2,
        explain: { ar: "إن فشل المبدّل المركزي تعطلت الشبكة كلها رغم سلامة الكابلات والأجهزة.", en: "If the central switch fails, the whole network dies despite healthy cables and devices." },
      },
    ],
  },
  {
    id: "l004",
    moduleId: "m01",
    order: 4,
    level: "beginner",
    title: { ar: "نموذجا الخدمة: العميل-الخادم والند-للند", en: "Service Models: Client-Server vs P2P" },
    summary: {
      ar: "الفرق بين نموذج تركز الخدمة في خادم قوي ونموذج تشارك فيه كل الأجهزة، وحالات استخدام كل منهما.",
      en: "The difference between centralizing services on a powerful server and peer-sharing across devices, and when to use each.",
    },
    durationMin: 10,
    sections: [
      {
        heading: { ar: "العميل-الخادم Client-Server", en: "Client-Server" },
        body: {
          ar: "خادم واحد (أو مجموعة) قوي يقدم الخدمة، وعملاء كثيرون يطلبونها.\n\n- الخادم ينتظر الطلبات ثم يجيب (مبدأ الطلب/الاستجابة)\n- أمثلة: خادم ويب يخدم ملايين الزوار، خادم بريد، خادم ملفات\n- المزايا: إدارة مركزية، أمان أفضل، قابلية توسع رأسياً (خادم أقوى)\n\nعندما يزداد الحمل نضيف موازن أحمال (Load Balancer) أمام خوادم متعددة — بنية الإنترنت الحديثة.",
          en: "One (or a farm of) powerful servers provide the service while many clients request it.\n\n- The server waits for requests then replies (request/response principle)\n- Examples: a web server serving millions of visitors, mail, file servers\n- Advantages: central management, better security, vertical scaling (bigger server)\n\nAs load grows we add a load balancer in front of multiple servers — the modern Internet architecture.",
        },
      },
      {
        heading: { ar: "الند-للند P2P", en: "Peer-to-Peer" },
        body: {
          ar: "كل جهاز ندّ (Peer) يعمل عميلاً وخادماً في الوقت نفسه.\n\n- لا خادم مركزي: البيانات موزعة بين الأنداد مباشرة\n- أمثلة: مشاركة الملفات (Torrent)، اتصالات فيديو مباشرة، عملات رقمية\n- المزايا: لا تكلفة مركزية، صعوبة إسقاط الشبكة كلها\n- العيوب: أمان أقل، إدارة أصعب، محتوى غير موثوق\n\nحساب عدد الوصلات في شبكة P2P كاملة = n(n-1)/2 أيضاً!",
          en: "Every peer acts as both client and server simultaneously.\n\n- No central server: data flows directly between peers\n- Examples: file sharing (Torrent), direct video calls, cryptocurrencies\n- Advantages: no central cost, hard to take the whole network down\n- Drawbacks: weaker security, harder management, untrusted content\n\nThe full P2P link count also equals n(n-1)/2!",
        },
      },
      {
        heading: { ar: "الهجين والمقارنة", en: "Hybrid & Comparison" },
        body: {
          ar: "الواقع دائماً هجين:\n\n- Skype القديم: تسجيل دخول عبر خادم ثم مكالمات P2P\n- YouTube: خوادم مركزية ضخمة + شبكات CDN موزعة\n- التطبيقات الحديثة: مزيج ذكي حسب الحاجة\n\nقاعدة الاختيار: تحتاج تحكماً وأماناً → مركزية. تحتاج توزيعاً ومقاومة للإسقاط → P2P.",
          en: "Reality is always hybrid:\n\n- Old Skype: login through a server, then P2P calls\n- YouTube: huge central servers + distributed CDN networks\n- Modern apps: a smart mix per need\n\nSelection rule: need control & security → centralized. Need distribution & takedown resistance → P2P.",
        },
        tip: {
          ar: "بروتوكولات كثيرة تعمل بنموذج طلب/استجابة: DNS و HTTP و DHCP — كلها ستراها عملياً لاحقاً.",
          en: "Many protocols use request/response: DNS, HTTP, DHCP — you will see them in practice later.",
        },
      },
    ],
    keyPoints: [
      { ar: "Client-Server: طلب/استجابة مع إدارة مركزية وأمان أعلى", en: "Client-server: request/response with central management and higher security" },
      { ar: "P2P: كل جهاز عميل وخادم معاً، توزيع بلا مركز", en: "P2P: every device is both client and server, centerless distribution" },
      { ar: "الموازنة بالحمل توسّع الخوادم أفقياً", en: "Load balancing scales servers horizontally" },
      { ar: "البنى الواقعية هجينة دائماً", en: "Real architectures are always hybrid" },
    ],
    commands: [
      { cmd: "nslookup www.google.com", desc: { ar: "عميل DNS يسأل خادماً — نموذج عميل-خادم حي", en: "A DNS client asking a server — live client-server" } },
    ],
    quiz: [
      {
        q: { ar: "في P2P الكاملة، كل جهاز يعمل كـ:", en: "In pure P2P, every device acts as:" },
        options: [
          { ar: "عميل فقط", en: "Client only" },
          { ar: "خادم فقط", en: "Server only" },
          { ar: "عميل وخادم معاً", en: "Both client and server" },
          { ar: "موجّه فقط", en: "Router only" },
        ],
        correct: 2,
        explain: { ar: "جوهر P2P أن كل ندّ يطلب ويخدم في آن واحد.", en: "The essence of P2P is that every peer requests and serves at once." },
      },
    ],
  },
  {
    id: "l005",
    moduleId: "m01",
    order: 5,
    level: "beginner",
    title: { ar: "مقاييس الأداء: Bandwidth و Throughput و Latency", en: "Performance Metrics: Bandwidth, Throughput, Latency" },
    summary: {
      ar: "الفرق الجوهري بين سعة الناقل والسرعة الفعلية وزمن الوصول والتذبذب، ووحدات القياس الصحيحة.",
      en: "The crucial difference between link capacity, actual speed, delivery delay and jitter, plus correct measurement units.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "النطاق والإنتاجية", en: "Bandwidth & Throughput" },
        body: {
          ar: "النطاق (Bandwidth) هو السعة النظرية القصوى للوصلة، أما الإنتاجية (Throughput) فهي ما تنقله فعلاً.\n\n- اشتركت بـ 100 ميجابت/ث (Mbps) وحمّلت بـ 8 — النطاق 100 والإنتاجية 8\n- الأسباب: ازدحام، حِمل البروتوكولات (~5-10%)، أخطاء وإعادة إرسال، قيود الخادم\n\nالإنتاجية الصافية (Goodput) تطرح رؤوس الحزم من الحساب.\n\nالوحدات بت (b) صغير للشبكات وبايت (B) كبير للملفات: 100Mbps ≈ 12.5MB/s تحميل أقصى نظري.",
          en: "Bandwidth is the theoretical maximum capacity of a link, while throughput is what actually moves.\n\n- You subscribe at 100 Mbps and download at 8 — bandwidth 100, throughput 8\n- Causes: congestion, protocol overhead (~5-10%), errors & retransmissions, server limits\n\nGoodput excludes packet headers from the measurement.\n\nUnits: small b for bits (networks), capital B for bytes (files): 100Mbps ≈ 12.5MB/s maximum theoretical download.",
        },
      },
      {
        heading: { ar: "زمن الوصول والتذبذب", en: "Latency & Jitter" },
        body: {
          ar: "زمن الوصول (Latency) هو الوقت الكامل لرحلة الحزمة ذهاباً — أو ذهاباً وعوداً (RTT).\n\n- مركباته: زمن الانتشار (Propagation = مسافة/سرعة الضوء) + زمن الإرسال (Transmission = حجم الحزمة/النطاق) + زمن المعالجة + زمن الانتظار في الطوابير\n- أرقام واقعية: 1-10ms داخل بلدك، 50-150ms عبور قارة، 500ms+ عبر قمر صناعي\n\nالتذبذب (Jitter) هو تفاوت زمن الوصول بين الحزم — قاتل المكالمات والبث المباشر، بينما الـ Latency الثابت العالي يمكن التأقلم معه.",
          en: "Latency is the total one-way — or round-trip (RTT) — trip time of a packet.\n\n- Components: propagation (distance/speed of light) + transmission (packet size/bandwidth) + processing + queuing delay\n- Real numbers: 1-10ms within your country, 50-150ms across a continent, 500ms+ via satellite\n\nJitter is the variance of latency between packets — the killer of calls and live streams, while constant high latency can be adapted to.",
        },
      },
      {
        heading: { ar: "قياس عملي وتحسين", en: "Measuring & Optimizing" },
        body: {
          ar: "للقياس العملي:\n\n- ping يعطيك RTT لكل حزمة\n- iperf3 يقيس الإنتاجية الفعلية بين طرفين بكامل النطاق\n- mtr يجمع بين traceroute و ping لكل قفزة\n\nللتحسين: قلل المسافة (CDN قريب منك)، ارفع النطاق، قلل الطوابير (QoS)، استخدم بروتوكولات أسرع (QUIC).\n\nقاعدة ذهبية: بيع المستخدم على «النطاق» لكن راقب أنت «الإنتاجية والـ Latency».",
          en: "For practical measurement:\n\n- ping gives you per-packet RTT\n- iperf3 measures actual throughput between two endpoints at full rate\n- mtr combines traceroute and ping per hop\n\nTo optimize: reduce distance (nearby CDN), raise bandwidth, cut queuing (QoS), use faster protocols (QUIC).\n\nGolden rule: sell users on bandwidth, but you monitor throughput and latency.",
        },
        tip: {
          ar: "جرب الآن: ping google.com ثم شغّل اختبار سرعة — وقارن النطاق المعلن بالواقع.",
          en: "Try now: ping google.com then run a speed test — compare advertised bandwidth with reality.",
        },
      },
    ],
    keyPoints: [
      { ar: "Bandwidth سعة نظرية، Throughput واقع مقيس", en: "Bandwidth is theoretical capacity; throughput is measured reality" },
      { ar: "b بت للشبكات، B بايت للملفات: 8 بت = 1 بايت", en: "b bits for networks, B bytes for files: 8 bits = 1 byte" },
      { ar: "Latency = انتشار + إرسال + معالجة + طوابير", en: "Latency = propagation + transmission + processing + queuing" },
      { ar: "Jitter تفاوت التأخير — عدو البث المباشر", en: "Jitter is delay variance — the enemy of live streaming" },
    ],
    commands: [
      { cmd: "ping -c 10 8.8.8.8", desc: { ar: "قياس RTT ومتوسطه 10 مرات", en: "Measure RTT average over 10 tries" } },
      { cmd: "iperf3 -c 192.168.1.5", desc: { ar: "قياس الإنتاجية الفعلية نحو طرف آخر", en: "Measure real throughput toward another endpoint" } },
      { cmd: "mtr 8.8.8.8", desc: { ar: "متابعة كل قفزة: زمنها وخسائرها", en: "Track every hop: its delay and loss" } },
    ],
    quiz: [
      {
        q: { ar: "وصلة 200Mbps تعادل نظرياً تنزيلاً بأقصى:", en: "A 200Mbps link theoretically equals a maximum download of:" },
        options: [
          { ar: "20 MB/s", en: "20 MB/s" },
          { ar: "25 MB/s", en: "25 MB/s" },
          { ar: "200 MB/s", en: "200 MB/s" },
          { ar: "50 MB/s", en: "50 MB/s" },
        ],
        correct: 1,
        explain: { ar: "200 ميجابت ÷ 8 = 25 ميجابايت/ث نظرياً قبل الحِمل الإضافي.", en: "200 megabits ÷ 8 = 25 MB/s theoretical, before overhead." },
      },
      {
        q: { ar: "أي عامل يزيد زمن الانتشار (Propagation)؟", en: "Which factor increases propagation delay?" },
        options: [
          { ar: "حجم الحزمة", en: "Packet size" },
          { ar: "المسافة الجغرافية", en: "Geographic distance" },
          { ar: "عدد المنافذ", en: "Number of ports" },
          { ar: "نوع الكابل فقط", en: "Cable type only" },
        ],
        correct: 1,
        explain: { ar: "زمن الانتشار = المسافة ÷ سرعة الانتشار في الوسيط، فكلما بعدت المسافة زاد.", en: "Propagation delay = distance ÷ propagation speed in the medium, so greater distance increases it." },
      },
    ],
  },
  {
    id: "l006",
    moduleId: "m01",
    order: 6,
    level: "beginner",
    title: { ar: "مكونات الشبكة: الراوتر والمبدّل ونقطة الوصول والجدار الناري", en: "Network Components: Router, Switch, AP, Firewall" },
    summary: {
      ar: "جولة على الأجهزة الأساسية، الطبقة التي يعمل عندها كل جهاز، ومتى تختار كلاً منها.",
      en: "A tour of essential devices, the layer each operates at, and when to choose each.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "المبدّل Switch — قلب LAN", en: "Switch — The LAN Heart" },
        body: {
          ar: "المبدّل يعمل في الطبقة الثانية (Data Link) ويسلّم الإطارات (Frames) حسب عنوان MAC.\n\n- يبني جدول MAC: منفذ ↔ عنوان\n- كل منفذ نطاق تصادم مستقل (Collision Domain) — ثورة قتلت الـ Hub\n- أنواعه: غير مُدار (Unmanaged) رخيص للبيت، مُدار (Managed) بـ VLAN و QoS و STP\n- سرعاته: 1/10/40/100 جيجابت\n\nنقطة الوصول اللاسلكية (AP) هي مبدّل لاسلكي يجمع Wi-Fi إلى الإيثرنت.",
          en: "The switch works at Layer 2 (Data Link) and delivers frames based on MAC addresses.\n\n- Builds a MAC table: port ↔ address\n- Every port is an independent collision domain — the revolution that killed hubs\n- Types: cheap unmanaged for homes, managed with VLAN, QoS and STP\n- Speeds: 1/10/40/100 Gbps\n\nA wireless access point (AP) is an air switch bridging Wi-Fi into Ethernet.",
        },
      },
      {
        heading: { ar: "الراوتر Router — حارس الحدود", en: "Router — The Border Guard" },
        body: {
          ar: "الراوتر يعمل في الطبقة الثالثة (Network) ويسلّم الحزم (Packets) حسب عنوان IP وجدول التوجيه.\n\n- يفصل بين الشبكات (Broadcast Domains) — كل واجهة شبكة مختلفة\n- يختار أفضل مسار عبر بروتوكولات OSPF/BGP\n- المنزلي = راوتر + مبدّل + AP + NAT + DHCP في جهاز واحد\n- المؤسسي: أجهزة مخصصة بآلاف الواجهات وملايين المسارات\n\nالجدار الناري (Firewall) راوتر متشدد: يوجّه ويفحص ويسمح/يمنع حسب سياسات.",
          en: "The router works at Layer 3 (Network) and forwards packets based on IP address and the routing table.\n\n- Separates networks (broadcast domains) — each interface is a different network\n- Chooses best paths via OSPF/BGP\n- The home box = router + switch + AP + NAT + DHCP in one\n- Enterprise: dedicated chassis with thousands of interfaces and millions of routes\n\nA firewall is a strict router: forwards, inspects, and allows/denies per policy.",
        },
      },
      {
        heading: { ar: "بقية العائلة", en: "The Rest of the Family" },
        body: {
          ar: "- المودم (Modem): يحوّل الإشارة بين وسيطين — الكابل/ADSL/الألياف\n- الـ NIC: بطاقة الشبكة في جهازك بعنوان MAC ثابت\n- الـ Load Balancer: يوزع الطلبات على خوادم متعددة\n- أجهزة IPS/IDS: تراقب الحركة وتكشف/تمنع الهجمات\n- خادم DHCP و DNS: خدمات «البنية التحتية» التي تعمل خلف الكواليس\n\nفي المحاكي التفاعلي بالمنصة ستجد كل هذه الأجهزة جاهزة للسحب والربط!",
          en: "- Modem: converts signals between media — cable/ADSL/fiber\n- NIC: your device's network card with a permanent MAC address\n- Load balancer: spreads requests across servers\n- IDS/IPS appliances: watch traffic and detect/block attacks\n- DHCP & DNS servers: backstage infrastructure services\n\nIn the platform's interactive simulator you will find all these devices ready to drag and connect!",
        },
        tip: {
          ar: "تذكير: مبدّل = إطارات MAC (L2)، راوتر = حزم IP (L3). هذا الفرق يميز المهندس عن الهاوي.",
          en: "Reminder: switch = MAC frames (L2), router = IP packets (L3). This distinction separates engineers from hobbyists.",
        },
      },
    ],
    keyPoints: [
      { ar: "المبدّل: L2 حسب MAC، كل منفذ نطاق تصادم مستقل", en: "Switch: L2 by MAC, each port an independent collision domain" },
      { ar: "الراوتر: L3 حسب IP، يفصل نطاقات البث", en: "Router: L3 by IP, separates broadcast domains" },
      { ar: "AP جسر لاسلكي نحو الإيثرنت", en: "An AP is a wireless bridge to Ethernet" },
      { ar: "الراوتر المنزلي 5 أجهزة في واحد", en: "The home router is 5 devices in one" },
    ],
    commands: [
      { cmd: "show mac address-table", desc: { ar: "جدول MAC في مبدّل Cisco", en: "MAC table on a Cisco switch" } },
      { cmd: "show ip route", desc: { ar: "جدول التوجيه في راوتر", en: "Routing table on a router" } },
    ],
    quiz: [
      {
        q: { ar: "أي جهاز يفصل نطاقات البث (Broadcast Domains)؟", en: "Which device separates broadcast domains?" },
        options: [
          { ar: "المبدّل", en: "Switch" },
          { ar: "الراوتر", en: "Router" },
          { ar: "الـ Hub", en: "Hub" },
          { ar: "الـ Repeater", en: "Repeater" },
        ],
        correct: 1,
        explain: { ar: "الراوتر لا يمرر بث L2 بين واجهاته؛ المبدّل يمرره داخل VLAN نفسها.", en: "A router does not pass L2 broadcasts between its interfaces; a switch floods them within the same VLAN." },
      },
      {
        q: { ar: "المبدّل يسلّم الإطارات بناءً على:", en: "A switch forwards frames based on:" },
        options: [
          { ar: "عنوان IP", en: "IP address" },
          { ar: "رقم المنفذ", en: "Port number" },
          { ar: "عنوان MAC", en: "MAC address" },
          { ar: "اسم المضيف", en: "Hostname" },
        ],
        correct: 2,
        explain: { ar: "التبديل (Switching) عملية L2 تعتمد جدول MAC.", en: "Switching is an L2 process relying on the MAC table." },
      },
    ],
  },
  {
    id: "l007",
    moduleId: "m01",
    order: 7,
    level: "beginner",
    title: { ar: "وسائط النقل: النحاس والألياف واللاسلكي", en: "Transmission Media: Copper, Fiber, Wireless" },
    summary: {
      ar: "مقارنة شاملة بين الوسائط الثلاثة: السرعة والمدى والتكلفة والحساسية للتداخل — أساس قرارات الشراء الهندسية.",
      en: "A full comparison of the three media: speed, reach, cost and interference sensitivity — the basis of engineering purchase decisions.",
    },
    durationMin: 11,
    sections: [
      {
        heading: { ar: "النحاس Copper", en: "Copper" },
        body: {
          ar: "كابلات UTP (زوج مجدول غير محمي) هي الأرخص والأسهل تركيباً.\n\n- Cat5e: جيجابت حتى 100م، Cat6/6a: 10G حتى 55/100م، Cat7/8 أعلى\n- حساسة للتداخل الكهرومغناطيسي (EMI) — تجنب مرورها قرب كابلات الكهرباء والمحركات\n- المجدولة (Twisted) تحسّن مناعة الضجيج بالتحييد المغناطيسي\n\nالكابل المحوري (Coax) أقدم وأعلى مناعة، ويبقى في شبكات الكابل التلفزيوني (Cable Internet).",
          en: "UTP (unshielded twisted pair) cables are the cheapest and easiest to install.\n\n- Cat5e: gigabit to 100m, Cat6/6a: 10G to 55/100m, Cat7/8 higher\n- Sensitive to EMI — avoid running them near power cables and motors\n- Twisting improves noise immunity through magnetic cancellation\n\nCoax is older with higher immunity and survives in cable-TV (cable Internet) networks.",
        },
      },
      {
        heading: { ar: "الألياف الضوئية Fiber", en: "Fiber Optics" },
        body: {
          ar: "ضوء في زجاج: سرعات هائلة ومسافات هائلة بلا أي تداخل كهرومغناطيسي.\n\n- Multimode (OM3/OM4): لمسافات قصيرة داخل المباني (300-550م)\n- Single-mode (OS1/OS2): لكل شيء آخر — عشرات الكيلومترات وصولاً للكابلات البحرية بين القارات\n- غير قابلة للتنصت كهرومغناطيسياً (أمان مادي)\n\nعيبها الوحيد الحقيقي: الكلفة والهشاشة ومحتاج معدات لحام وقياس متخصصة.",
          en: "Light in glass: enormous speeds and distances with zero electromagnetic interference.\n\n- Multimode (OM3/OM4): short runs inside buildings (300-550m)\n- Single-mode (OS1/OS2): everything else — tens of kilometers up to transcontinental submarine cables\n- Cannot be electromagnetically tapped (physical security)\n\nIts only real drawbacks: cost, fragility, and specialized splicing/measuring gear.",
        },
      },
      {
        heading: { ar: "اللاسلكي Wireless", en: "Wireless" },
        body: {
          ar: "موجات راديو: حرية حركة بلا كابلات مقابل مشاكل حصرية.\n\n- 2.4GHz: مدى أطول وتداخل أكثر (مايكروويف، بلوتوث)\n- 5GHz: أسرع ومدى أقصر وقنوات أكثر\n- 6GHz (Wi-Fi 6E/7): طيف نظيف شبه فارغ اليوم\n\nاللاسلكي وسيط مشترك (Shared Medium) كسابق الناقل: كل من في الخلية يتنافس على الهواء — لذا السرعة الفعلية تنخفض مع كثرة المستخدمين.",
          en: "Radio waves: cable-free mobility in exchange for unique problems.\n\n- 2.4GHz: longer range, more interference (microwaves, Bluetooth)\n- 5GHz: faster, shorter range, more channels\n- 6GHz (Wi-Fi 6E/7): nearly clean, empty spectrum today\n\nWireless is a shared medium like the old bus: everyone in the cell contends for air — so real speed drops as users multiply.",
        },
        tip: {
          ar: "قاعدة عملية: نحاس داخل الطابق، ألياف بين الطوابق والمباني، لاسلكي للضيافة والهواتف.",
          en: "Practical rule: copper within a floor, fiber between floors and buildings, wireless for guests and phones.",
        },
      },
    ],
    keyPoints: [
      { ar: "UTP أرخص: 100م أقصى مهما كانت الفئة", en: "UTP is cheapest: 100m max regardless of category" },
      { ar: "Single-mode fiber للمسافات الطويلة وOM للمباني", en: "Single-mode fiber for long haul, OM within buildings" },
      { ar: "الألياف محصنة ضد التداخل الكهرومغناطيسي", en: "Fiber is immune to EMI" },
      { ar: "اللاسلكي وسيط مشترك تنخفض سرعته مع كثافة المستخدمين", en: "Wireless is a shared medium whose speed drops with user density" },
    ],
    commands: [
      { cmd: "ethtool eth0", desc: { ar: "تفاصيل وصلة النحاس: سرعة وتماثل", en: "Copper link details: speed and duplex" } },
    ],
    quiz: [
      {
        q: { ar: "لربط مبنيين على بعد 2 كم، الخيار الهندسي الأمثل:", en: "To connect two buildings 2km apart, the best engineering choice is:" },
        options: [
          { ar: "Cat6 نحاس", en: "Cat6 copper" },
          { ar: "ألياف Single-mode", en: "Single-mode fiber" },
          { ar: "بلوتوث", en: "Bluetooth" },
          { ar: "كابل تسلسلي RS-232", en: "RS-232 serial cable" },
        ],
        correct: 1,
        explain: { ar: "النحاس يتوقف عند 100م، بينما الألياف أحادية النمط تتجاوز الكيلومترات بسهولة.", en: "Copper stops at 100m, while single-mode fiber exceeds kilometers easily." },
      },
    ],
  },
  {
    id: "l008",
    moduleId: "m01",
    order: 8,
    level: "beginner",
    title: { ar: "النماذج المرجعية: نظرة على OSI و TCP/IP", en: "Reference Models: OSI & TCP/IP Overview" },
    summary: {
      ar: "لماذا نحتاج نموذجاً مرجعياً؟ ومقارنة تمهيدية بين نموذج OSI ذي الطبقات السبع ونموذج TCP/IP العملي.",
      en: "Why we need a reference model, and an introductory comparison between the 7-layer OSI and the pragmatic TCP/IP model.",
    },
    durationMin: 11,
    sections: [
      {
        heading: { ar: "لماذا نموذج مرجعي؟", en: "Why a Reference Model?" },
        body: {
          ar: "تخيّل أن كل شركة تصنع أجهزة تتحدث لغة مختلفة — لن يتصل شيء بشيء أبداً.\n\nالنموذج المرجعي يحل ثلاث مشكلات:\n\n- التقسيم (Divide & Conquer): مشكلة معقدة تتحول لطبقات صغيرة قابلة للإدارة\n- التوحيد (Standardization): كل طبقة معروفة الوظيفة فتتبادل الشركات منتجاتها\n- الاستقلالية: تغيير تقنية طبقة لا يكسر الطبقات الأخرى\n\nلهذا وُلد OSI من ISO عام 1984 كمعيار دولي، ووُلد TCP/IP من مشروع ARPANET كحل عملي سبق التنظير.",
          en: "Imagine every vendor speaking a different language — nothing would ever interoperate.\n\nA reference model solves three problems:\n\n- Divide & conquer: one complex problem becomes small manageable layers\n- Standardization: each layer has a known function so vendors interoperate\n- Independence: changing one layer's technology does not break the others\n\nThat is why OSI was born from ISO in 1984 as an international standard, and TCP/IP grew out of ARPANET as a practical solution that preceded the theory.",
        },
      },
      {
        heading: { ar: "النموذجان جنباً إلى جنب", en: "The Two Models Side by Side" },
        body: {
          ar: "OSI: 7 طبقات (Physical, Data Link, Network, Transport, Session, Presentation, Application).\nTCP/IP: 4 طبقات (Link, Internet, Transport, Application).\n\nالمقابلة:\n- OSI 1-2 ≈ طبقة Link في TCP/IP\n- OSI 3 ≝ Internet\n- OSI 4 ≝ Transport\n- OSI 5-7 ≝ Application\n\nالمهندسون يستعملون OSI للفهم والتشخيص والمناقشة، بينما الحزم الحقيقية تسافر بعقلية TCP/IP.",
          en: "OSI: 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application).\nTCP/IP: 4 layers (Link, Internet, Transport, Application).\n\nMapping:\n- OSI 1-2 ≈ TCP/IP Link\n- OSI 3 ≝ Internet\n- OSI 4 ≝ Transport\n- OSI 5-7 ≝ Application\n\nEngineers use OSI for understanding, troubleshooting and discussion, while real packets travel with a TCP/IP mindset.",
        },
      },
      {
        heading: { ar: "كيف ستستخدم النموذج عملياً", en: "How You Will Use the Model" },
        body: {
          ar: "النموذج أداة تشخيص يومية: «المشكلة في الطبقة 1؟» يعني كابلاً مقطوعاً.\n\n- L1: هل الوصلة up؟ (كابل، إشارة)\n- L2: هل MAC يتعلم؟ (مبدّل)\n- L3: هل ping يصل؟ (توجيه، IP)\n- L4: هل المنفذ مفتوح؟ (خدمة تعمل)\n- L7: هل التطبيق يجيب صحيحاً؟\n\nهذه العقلية الطبقية هي الفرق بين تخمين عشوائي وتشخيص منهجي — وستتدرب عليها في المعامل.",
          en: "The model is a daily diagnostic tool: \"Is it a Layer 1 issue?\" means a broken cable.\n\n- L1: is the link up? (cable, signal)\n- L2: is the switch learning MACs?\n- L3: does ping reach? (routing, IP)\n- L4: is the port open? (service running)\n- L7: does the application answer correctly?\n\nThis layered mindset separates systematic diagnosis from random guessing — and you will drill it in the labs.",
        },
        tip: {
          ar: "جملة الحفظ العربية للطبقات: «فيزيائي وصلي شبكي نقل جلسة عرض تطبيق» — من الأسفل للأعلى.",
          en: "Classic mnemonic bottom-up: Please Do Not Throw Sausage Pizza Away.",
        },
      },
    ],
    keyPoints: [
      { ar: "OSI 7 طبقات و TCP/IP 4 طبقات", en: "OSI has 7 layers, TCP/IP has 4" },
      { ar: "الطبقات العليا OSI 5-7 تنطوي في Application وحدها", en: "OSI layers 5-7 fold into a single Application layer" },
      { ar: "النموذج أداة تشخيص منهجي يومية", en: "The model is a daily systematic diagnostic tool" },
    ],
    quiz: [
      {
        q: { ar: "كم طبقة في نموذج OSI؟", en: "How many layers does the OSI model have?" },
        options: [
          { ar: "4", en: "4" },
          { ar: "5", en: "5" },
          { ar: "7", en: "7" },
          { ar: "9", en: "9" },
        ],
        correct: 2,
        explain: { ar: "OSI ذو الطبقات السبع من Physical حتى Application.", en: "OSI has seven layers from Physical up to Application." },
      },
      {
        q: { ar: "طبقة Internet في TCP/IP تقابل في OSI:", en: "The TCP/IP Internet layer maps to which OSI layer?" },
        options: [
          { ar: "Physical", en: "Physical" },
          { ar: "Network", en: "Network" },
          { ar: "Transport", en: "Transport" },
          { ar: "Session", en: "Session" },
        ],
        correct: 1,
        explain: { ar: "طبقة OSI الثالثة Network تقابل Internet في TCP/IP وتعنى بعنونة IP والتوجيه.", en: "OSI Layer 3 Network maps to the TCP/IP Internet layer dealing with IP addressing and routing." },
      },
    ],
  },
  {
    id: "l009",
    moduleId: "m01",
    order: 9,
    level: "beginner",
    title: { ar: "كيف يعمل الإنترنت: مزودو الخدمة و IXPs والعمود الفقري", en: "How the Internet Works: ISPs, IXPs, Backbones" },
    summary: {
      ar: "رحلة طلبك من المتصفح حتى الخادم وعودة عبر هرم مقدمي الخدمة ونقاط التبادل والكابلات البحرية.",
      en: "Your request's journey from browser to server and back across the ISP hierarchy, exchange points and submarine cables.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "هرم مقدمي الخدمة", en: "The ISP Hierarchy" },
        body: {
          ar: "الإنترنت هرم غير مركزي فعلياً لكنه منتظم تجارياً:\n\n- Tier 3: مزوّدك المحلي الصغير يشتري من الأكبر\n- Tier 2: إقليمي يغطي دولة أو عدة دول ويشتري جزئياً\n- Tier 1: عمالقة يملكون العمود الفقري العالمي ويتصلون ببعضهم مجاناً (Peering) — مثل AT&T و Lumen و NTT\n\nلا أحد «يملك» الإنترنت؛ بل يتفق هؤلاء على الترابط عبر معايير مشتركة.",
          en: "The Internet is practically a decentralized yet commercially ordered pyramid:\n\n- Tier 3: your small local ISP buying from a bigger one\n- Tier 2: regional covering a country or a few, partially buying transit\n- Tier 1: giants owning the global backbone peering freely with each other — e.g. AT&T, Lumen, NTT\n\nNobody owns the Internet; these players interconnect through shared standards.",
        },
      },
      {
        heading: { ar: "نقاط التبادل IXP والـ Peering", en: "IXPs & Peering" },
        body: {
          ar: "نقطة تبمر الإنترنت (IXP) منشأة حيث تلتقي شبكات عديدة لتبادل الحركة محلياً بدل اللف حول العالم.\n\n- مثال: عندك خادم في نفس بلد المستخدم → عبر IXP المحلي تكون الرحلة 3 قفزات بدل 20\n- الاتصال المباشر بين شبكتين يسمى Peering (تبادل مجاني غالباً)\n- شراء العبور (Transit) = تدفع لتصل بكل الإنترنت\n\nالشبكات العملاقة (Google/Netflix) تضع خوادمها داخل مزودك (CDN/Google Global Cache) فلا تخرج حزمك من البلد أصلاً.",
          en: "An Internet Exchange Point (IXP) is a facility where many networks meet to exchange traffic locally instead of detouring around the globe.\n\n- Example: a server in the user's own country → via the local IXP the trip is 3 hops instead of 20\n- Direct interconnection between two networks is called peering (usually free)\n- Buying transit = paying to reach the whole Internet\n\nGiant networks (Google/Netflix) place servers inside your ISP (CDN/Google Global Cache) so your packets never leave the country at all.",
        },
      },
      {
        heading: { ar: "الرحلة الكاملة خطوة بخطوة", en: "The Complete Journey" },
        body: {
          ar: "عند كتابة www.example.com:\n\n- DNS يحل الاسم إلى IP عبر شجرة عالمية موزعة\n- جهازك يرسل الحزم إلى بوابتك (الراوتر المنزلي)\n- NAT يستبدل عنوانك الخاص بالعام ثم لمزوّدك\n- راوترات ISP ترفعها عبر BGP نحو الشبكة المستهدفة\n- تصل POP الخادم أو أقرب CDN — كابل بحري أو IXP في الطريق حسب الموقع\n- تعود الاستجابة بالطريق نفسه أو طريق أسرع\n\nكل ذلك في ميلي ثوانٍ! استخدم traceroute الآن لترى القفزات بنفسك.",
          en: "When you type www.example.com:\n\n- DNS resolves the name to an IP via a globally distributed tree\n- Your device sends packets to your gateway (home router)\n- NAT swaps your private address for the public one, then to your ISP\n- ISP routers lift them via BGP toward the target network\n- They reach the server's POP or the nearest CDN — a submarine cable or IXP may be en route\n- The response returns the same or a faster path\n\nAll within milliseconds! Run traceroute now to see the hops yourself.",
        },
        tip: {
          ar: "جرّب traceroute لموقع في قارة أخرى وشاهد أسماء المدن في القفزات — جغرافيا حية في طرفيتك!",
          en: "Traceroute a site on another continent and watch city names in the hops — live geography in your terminal!",
        },
      },
    ],
    keyPoints: [
      { ar: "الإنترنت هرم مقدمي خدمة: Tier 1 يملك العمود الفقري", en: "The Internet is an ISP pyramid: Tier 1 owns the backbone" },
      { ar: "IXP يقرّب الحركة محلياً ويوفر اللف العالمي", en: "IXPs localize traffic and save global detours" },
      { ar: "Peering تبادل مجاني و Transit عبور مدفوع", en: "Peering is free exchange; transit is paid" },
      { ar: "CDN يجعل الخادم بجوارك داخل مزودك", en: "CDNs place the server beside you inside your ISP" },
    ],
    commands: [
      { cmd: "traceroute www.cloudflare.com", desc: { ar: "شاهد قفزاتك نحو خادم عالمي", en: "Watch your hops toward a global server" } },
      { cmd: "whois 8.8.8.8", desc: { ar: "من يملك عنوان IP هذا؟ (Google LLC)", en: "Who owns this IP? (Google LLC)" } },
    ],
    quiz: [
      {
        q: { ar: "الغرض الأساسي من نقطة التبادل IXP:", en: "The primary purpose of an IXP is:" },
        options: [
          { ar: "تشفير حركة المستخدمين", en: "Encrypting user traffic" },
          { ar: "تبادل الحركة محلياً بين الشبكات", en: "Exchanging traffic locally between networks" },
          { ar: "بيع عناوين IP", en: "Selling IP addresses" },
          { ar: "مراقبة الإنترنت", en: "Monitoring the Internet" },
        ],
        correct: 1,
        explain: { ar: "IXP ملتقى شبكات تتبادل المسارات محلياً فيخفض الكلفة والزمن.", en: "An IXP is a meeting point where networks exchange routes locally, cutting cost and delay." },
      },
    ],
  },
  {
    id: "l010",
    moduleId: "m01",
    order: 10,
    level: "beginner",
    title: { ar: "بناء شبكتك المنزلية الأولى خطوة بخطوة", en: "Building Your First Home Network Step by Step" },
    summary: {
      ar: "مشروع عملي متكامل: التخطيط والتركيب والعنونة والإعداد والاختبار — أول شبكة تبنيها بيدك.",
      en: "A complete hands-on project: planning, installation, addressing, configuration and testing — the first network you build yourself.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "التخطيط والمخطط", en: "Planning & Diagram" },
        body: {
          ar: "قبل شراء أي جهاز، ارسم المخطط — مهارة المهندس الأولى:\n\n- اجرد الاحتياجات: كم جهازاً سلكياً؟ لاسلكياً؟ مساحة التغطية؟\n- المخطط النموذجي: المودم → راوتر/مبدّل/AP متعدد الاستخدام\n- خطط العناوين مسبقاً: 192.168.1.0/24 يكفي 254 جهازاً منزلياً\n- حدد مواقع الأجهزة: الراوتر في مركز المنزل لانتشار Wi-Fi أفضل\n\nضع تصوراً لمنافذ المستقبل: شبكة كاميرا؟ جهاز ذكي؟ قسوها الآن لا لاحقاً.",
          en: "Before buying anything, draw the diagram — the engineer's first skill:\n\n- Inventory needs: how many wired devices? wireless? coverage area?\n- Typical layout: modem → all-in-one router/switch/AP\n- Plan addressing upfront: 192.168.1.0/24 fits 254 home devices\n- Place devices centrally: the router mid-home for better Wi-Fi spread\n\nPlan future ports: cameras? smart devices? Rough them in now, not later.",
        },
      },
      {
        heading: { ar: "التركيب والعنونة", en: "Installation & Addressing" },
        body: {
          ar: "خطوات التركيب العملية:\n\n- ثبت الراوتر واربطه بالمودم بمنفذ WAN (المنفذ الملون غالباً)\n- الأجهزة السلكية بمنافذ LAN الأربعة\n- ادخل لوحة الإدارة (192.168.1.1 غالباً) وغيّر كلمة مرور الأدمن فوراً\n- فعّل WPA2/WPA3 بكلمة مرور قوية وسمِّ الشبكة SSID مميزاً\n\nخطة عنونة مقترحة: الراوتر 192.168.1.1، ومجموعة DHCP من 192.168.1.50 حتى .150، وتارك .2-.49 لأجهزتك الثابتة (طابعة/خادم بيتي).",
          en: "Practical installation steps:\n\n- Mount the router and connect it to the modem on the WAN port (usually colored)\n- Wired devices into the four LAN ports\n- Enter the admin panel (usually 192.168.1.1) and change the admin password immediately\n- Enable WPA2/WPA3 with a strong passphrase and name a distinct SSID\n\nSuggested addressing: router at 192.168.1.1, DHCP pool from 192.168.1.50 to .150, leaving .2-.49 for your fixed devices (printer/home server).",
        },
      },
      {
        heading: { ar: "الاختبار والتحسين", en: "Testing & Optimization" },
        body: {
          ar: "اكتمل التركيب؟ اختبر منهجياً طبقة بطبقة:\n\n- L1: هل منافذ الراوتر مضيئة؟\n- L2/L3: ipconfig — هل استلمت عنواناً؟ ping 192.168.1.1 (البوابة)\n- للخارج: ping 8.8.8.8 (IP) ثم ping google.com (DNS أيضاً)\n- Wi-Fi: قس التغطية بكل غرفة وعدّل القناة إن وجدت تداخلاً (قنوات 1/6/11)\n\nطبّق بعدها منصة المحاكي «المعمل ١» لتكرار التجربة افتراضياً وفهم كل ما حدث خلف الكواليس!",
          en: "Installation done? Test layer by layer systematically:\n\n- L1: are the router port LEDs lit?\n- L2/L3: ipconfig — did you get an address? ping 192.168.1.1 (the gateway)\n- Outward: ping 8.8.8.8 (IP) then ping google.com (DNS too)\n- Wi-Fi: measure coverage per room and change channel on interference (1/6/11)\n\nThen replay the experience virtually in the simulator's \"Lab 1\" to understand everything that happened behind the scenes!",
        },
        tip: {
          ar: "إن فشل الإنترنت ونجح ping البوابة: المشكلة عند مزودك. إن فشل ping 8.8.8.8 ونجح اسم النطاق لاحقاً: المشكلة DNS. التشخيص الطبقي يختصر ساعات!",
          en: "If the Internet fails but the gateway pings: your ISP. If 8.8.8.8 fails but domain names later work: DNS. Layered diagnosis saves hours!",
        },
      },
    ],
    keyPoints: [
      { ar: "ارسم المخطط وخطط العناوين قبل الشراء", en: "Draw the diagram and address plan before buying" },
      { ar: "غيّر كلمة مرور الأدمن وأمن Wi-Fi بـ WPA2/3 فوراً", en: "Change admin password and secure Wi-Fi with WPA2/3 immediately" },
      { ar: "خطة منزلية نموذجية: .1 للبوابة و DHCP من .50", en: "Typical home plan: .1 gateway, DHCP from .50" },
      { ar: "اختبر طبقة بطبقة: مادي → IP → DNS → تطبيق", en: "Test layer by layer: physical → IP → DNS → app" },
    ],
    commands: [
      { cmd: "ping 192.168.1.1", desc: { ar: "اختبار الوصول للبوابة", en: "Test reachability of the gateway" } },
      { cmd: "ipconfig /renew", desc: { ar: "طلب عنوان DHCP جديد", en: "Request a fresh DHCP address" } },
      { cmd: "netsh wlan show interfaces", desc: { ar: "تفاصيل شبكة Wi-Fi الحالية (قناة وإشارة)", en: "Current Wi-Fi details (channel & signal)" } },
    ],
    quiz: [
      {
        q: { ar: "ينجح ping 192.168.1.1 ويفشل ping 8.8.8.8، أين المشكلة غالباً؟", en: "Ping to 192.168.1.1 works but 8.8.8.8 fails; where is the problem most likely?" },
        options: [
          { ar: "كابل جهازك", en: "Your device's cable" },
          { ar: "بطاقة Wi-Fi", en: "Your Wi-Fi card" },
          { ar: "خارج شبكتك المحلية (المزوّد/الإنترنت)", en: "Beyond your LAN (ISP/Internet)" },
          { ar: "إعداد DNS", en: "DNS configuration" },
        ],
        correct: 2,
        explain: { ar: "وصولك للبوابة يعني شبكتك المحلية سليمة، والفشل بعدها يعني مشكلة خارجية عند المزوّد أو التوجيه.", en: "Reaching the gateway proves your LAN is fine; failure beyond it indicates an external ISP or routing issue." },
      },
    ],
  },
];
