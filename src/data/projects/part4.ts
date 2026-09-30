import type { ProjectIdea } from "@/lib/types";

// ─── Projects p151–p200 (Part 4) ─────────────────────────────────────────
// Distribution: mobile 8, content 6, community 6, career 6, ecommerce 6,
// consulting 6, saas 5, education 4, lab 3

export const PROJECTS_PART4: ProjectIdea[] = [
  // ═══ MOBILE (p151–p158) ═══
  {
    id: "p151",
    title: { ar: "تطبيق خريطة حرارية معزّزة الواقع للواي فاي", en: "AR Wi-Fi Heatmap Visualizer App" },
    category: "mobile",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "200-1500$ شهرياً", en: "$200-1500/mo" },
    monetization: { ar: "المسح مجاني وتصدير تقرير PDF المحترف مدفوع", en: "Free scanning with paid professional PDF report export" },
    skills: ["wifi", "site-survey", "measurement", "api"],
    desc: {
      ar: "تطبيق جوال يرسم قوة الإشارة كبقع ملونة معزّزة الواقع فوق مشهد الكاميرا أثناء تجوالك في المكان، ثم يصدّر خريطة حرارية جاهزة للتقرير. الجمهور المستهدف: مركّبو الشبكات وأصحاب المنازل الذين يقررون مكان الراوتر. الميزة التنافسية: هاتفك يتحول إلى عدّة مسح كاملة — لا حاجة لحاسوب أو أداة احترافية بألف دولار.",
      en: "A phone app that renders live signal strength as colored AR blobs overlaid on your camera view while you walk the floor, then exports a report-ready heatmap. Target: network installers and homeowners deciding router placement. Differentiator: your phone becomes the whole survey kit — no laptop or thousand-dollar professional tool needed."
    },
    steps: [
      { ar: "ابنِ نموذجاً أولياً يقرأ RSSI كل ثانيتين ويرسم البقع على مشهد الكاميرا", en: "Build a prototype that samples RSSI every 2 seconds and draws blobs over the camera view" },
      { ar: "أضف حفظ مسار الجولة مع تدوير المسح وربط القياسات بالموقع النسبي", en: "Add walk-path recording with scan rotation and relative-position binding of measurements" },
      { ar: "اختبر دقة الرسم في شقة ومكتب صغير وقارن النتائج بأداة مسح مرجعية", en: "Test mapping accuracy in an apartment and small office against a reference survey tool" },
      { ar: "أطلق نسخة مجانية للمسح فقط وحوّل تصدير PDF الملوّن إلى ميزة مدفوعة", en: "Launch a free scan-only version with colored PDF export as the paid feature" },
      { ar: "أضف حزمة للفرق (شعار الشركة على التقرير ومشاركة المشاريع) بسعر أعلى", en: "Add a team tier (company-branded reports and shared projects) at a higher price" }
    ],
  },
  {
    id: "p152",
    title: { ar: "تطبيق بطاقات مراجعة ذكية لأساسيات الشبكات", en: "Networking Flashcard Quiz App" },
    category: "mobile",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "إصدار مدفوع بلا إعلانات مع حزم بطاقات متقدمة لكل شهادة", en: "Paid ad-free edition with advanced decks per certification" },
    skills: ["subnetting", "tcp", "dns", "routing"],
    desc: {
      ar: "تطبيق مراجعة بالتكرار المتباعد لأساسيات الشبكات (المنافذ، طبقات OSI، حسابات الشبكات الفرعية) مع تدريبات يومية من خمس دقائق. الجمهور المستهدف: مرشحو الشهادات والطلاب. الميزة التنافسية: البطاقات مولّدة آلياً — تدريب لا نهائي على حساب الشبكات يتكيف مع نقاط ضعفك المقاسة فعلياً.",
      en: "A spaced-repetition flashcard app for networking fundamentals (ports, OSI layers, subnet math) with daily 5-minute drills. Target: exam candidates and students. Differentiator: cards are generated — infinite subnetting drills that adapt to your actually-measured weak spots."
    },
    steps: [
      { ar: "ابنِ محرك التكرار المتباعد الأساسي مع 200 بطاقة أساسية ثابتة", en: "Build the core spaced-repetition engine with 200 curated base cards" },
      { ar: "أضف مولّد بطاقات الشبكات الفرعية الذي يخلق تمارين لا نهائية", en: "Add the subnetting card generator producing infinite exercises" },
      { ar: "أطلق نسخة مجانية بإعلانات واجمع مقاييس الاحتفاظ بالمستخدم", en: "Launch an ad-supported free version and track retention metrics" },
      { ar: "أضف إصداراً مدفوعاً بلا إعلانات مع حزمة CCNA المتقدمة الأولى", en: "Add a paid ad-free edition with the first advanced CCNA deck" },
      { ar: "وسّع حزماً لشهادات إضافية بحسب أكثر المجموعات طلباً", en: "Expand decks for additional certifications based on most-requested topics" }
    ],
  },
  {
    id: "p153",
    title: { ar: "تطبيق مدرّب أوامر IOS للمحاكاة الطرفية", en: "CLI Trainer App (Type IOS Commands)" },
    category: "mobile",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "اشتراك شهري يشمل سلاسل يومية وحزم أوامر متقدمة", en: "Monthly subscription covering daily streaks and advanced command packs" },
    skills: ["cli", "ios", "routing", "switching"],
    desc: {
      ar: "تطبيق يحاكي طرفية موجه حقيقي ويدرّب ذاكرة العضلات على الأوامر: تدريبات موقوتة وإكمال تلقائي مقيد بعد ثلاثة أحرف ودرجات دقة الكتابة. الجمهور المستهدف: طلاب CCNA الذين يتجمدون أمام سطر الأوامر في الامتحان. الميزة التنافسية: تدريبات يومية بأسلوب اللعب وسلاسل إنجاز تحافظ على الاستمرارية أسابيع.",
      en: "An app simulating a real router terminal and drilling command muscle-memory: timed config drills, autocomplete restricted until three letters, and typing-accuracy scores. Target: CCNA students who freeze at the CLI during exams. Differentiator: game-style daily drills with streaks that keep learners coming back for weeks."
    },
    steps: [
      { ar: "ابنِ محاكي طرفية مصغّر يدعم نمطي التشغيل والإعداد مع تحقق من الصياغة", en: "Build a mini terminal emulator supporting exec and config modes with syntax validation" },
      { ar: "أضف 50 تدريباً موقوتاً متدرج الصعوبة مع تسجيل الأخطاء الشائعة", en: "Add 50 timed drills graded by difficulty while logging common mistakes" },
      { ar: "أطلق مجاناً مع 10 تدريبات يومية وسلاسل إنجاز", en: "Launch free with 10 daily drills and achievement streaks" },
      { ar: "أضف اشتراكاً يفتح تدريبات BGP وأتمتة المحتوى والمراجعة الذكية للأخطاء", en: "Add a subscription unlocking BGP drills, content automation, and smart mistake review" },
      { ar: "سوّق في مجتمعات الشهادات بأوقات الامتحانات الموسمية", en: "Market in certification communities during seasonal exam windows" }
    ],
  },
  {
    id: "p154",
    title: { ar: "لعبة سباق الشبكات الفرعية", en: "Subnet Racer Game" },
    category: "mobile",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "100-700$ شهرياً", en: "$100-700/mo" },
    monetization: { ar: "مجاني بإعلانات مع فتح مدفوع للمراحل ومقارنات الأصدقاء", en: "Ad-supported free game with paid level unlocks and friend leaderboards" },
    skills: ["subnetting", "ip-addressing", "cidr"],
    desc: {
      ar: "لعبة أركيد مدتها 60 ثانية: يظهر عنوان وقناع، وأجب عن الشبكة وعنوان البث وعدد المضيفين كي يبقى موجّهك حياً. الجمهور المستهدف: الطلاب قبل الامتحانات. الميزة التنافسية: تحويل أكثر موضوعات الامتحان رهبة إلى حلقة إثارة مدتها دقيقة، مع لوحة صدارة تنشر روح المنافسة في المجموعات.",
      en: "A 60-second arcade game: given an IP and mask, answer network, broadcast, and host counts to keep your router alive. Target: students before exams. Differentiator: it turns the most-feared exam topic into a 60-second dopamine loop, with leaderboards sparking friendly rivalry in study groups."
    },
    steps: [
      { ar: "صمّم مولّد الأسئلة بتدرج صعوبة تلقائي يبدأ بـ/24 وينتهي بـ/28", en: "Design the question generator with automatic difficulty ramping from /24 to /28" },
      { ar: "ابنِ حلقة اللعب مع مؤقت وحيوات وردود فعل بصرية فورية", en: "Build the game loop with timer, lives, and instant visual feedback" },
      { ar: "أطلق مجاناً على المتجرين الرئيسيين مع 20 مرباً مفتوحاً", en: "Launch free on both major app stores with 20 open levels" },
      { ar: "أضف فتح المراحل المتقدمة كشراء لمرة واحدة مع إزالة الإعلانات", en: "Add advanced level unlock as a one-time purchase with ad removal" },
      { ar: "أضف تحدي الأصدقاء الأسبوعي لرفع الانتشار العضوي", en: "Add weekly friend challenges to boost organic spread" }
    ],
  },
  {
    id: "p155",
    title: { ar: "تطبيق تعلم دقيق لكابلات الشبكات", en: "Cable Trivia Microlearning App" },
    category: "mobile",
    difficulty: 1,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "50-400$ شهرياً", en: "$50-400/mo" },
    monetization: { ar: "مجاني بإعلانات وإصدار بلا إعلانات للفنيين الميدانيين", en: "Free with ads and an ad-free pro edition for field technicians" },
    skills: ["cabling", "ethernet", "testing"],
    desc: {
      ar: "إشعارات يومية بحقيقة أو سؤال واحد عن الكابلات (مسافات Cat6، فئات PoE، ترتيب الأسلاك) تصل في وقت محدد وتُحل في عشر ثوانٍ. الجمهور المستهدف: الفنيون الميدانيون ذوو الأوقات الميتة بين مواقع العمل. الميزة التنافسية: تعلم دون جهد يلائم فترات الانتظار ولا يطلب من المستخدم سوى ثانية واحدة من الانتباه.",
      en: "Daily push notifications with one 10-second cable fact or question (Cat6 distances, PoE classes, pinouts) delivered at a chosen time. Target: field technicians with dead time between job sites. Differentiator: zero-effort learning that fits waiting periods and asks for only a second of attention."
    },
    steps: [
      { ar: "اكتب بنك أسئلة من 300 سؤال مصنف بحسب المواضيع", en: "Write a 300-question bank categorized by topic" },
      { ar: "ابنِ شاشة السؤال الواحد مع إشعار يومي في وقت يختاره المستخدم", en: "Build the single-question screen with a daily notification at a user-chosen time" },
      { ar: "أطلق مجاناً بالإعلانات وقس معدل فتح الإشعارات", en: "Launch free with ads and measure notification open rates" },
      { ar: "أضف إصداراً مدفوعاً رخيصاً يزيل الإعلانات ويفتح الأرشيف الكامل", en: "Add a cheap paid edition removing ads and unlocking the full archive" },
      { ar: "أضف وضع المراجعة قبل يوم العمل الكبير بسؤالين سريعين إضافيين", en: "Add a pre-job review mode with two extra quick questions" }
    ],
  },
  {
    id: "p156",
    title: { ar: "تطبيق عميل اختبار RADIUS للهاتف", en: "RADIUS/802.1X Test Client App" },
    category: "mobile",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1100$ شهرياً", en: "$200-1100/mo" },
    monetization: { ar: "إصدار احترافي للفرق مع سجلات كاملة وتقارير اختبار", en: "Professional team edition with full logs and test reports" },
    skills: ["radius", "wifi", "security", "testing"],
    desc: {
      ar: "عميل 802.1X تجريبي على الجوال: اختر الشبكة وطريقة المصادقة (PEAP أو TLS) والاعتمادات، فتحصل على حكم نهائي مع سجل تبادل RADIUS كاملاً. الجمهور المستهدف: مسؤولو الشبكات الذين ينشرون NPS أو FreeRADIUS. الميزة التنافسية: يستبدل حمل حاسوب اختبار إلى كل موقع، ويكشف فوراً هل الخلل في الهوية أم الشهادة أم الخادم.",
      en: "A mobile 802.1X test client: pick the SSID, auth method (PEAP or TLS), and credentials — get a verdict plus a full RADIUS exchange log. Target: network admins deploying NPS or FreeRADIUS. Differentiator: it replaces lugging a test laptop to every site and instantly shows whether the fault is identity, certificate, or server."
    },
    steps: [
      { ar: "ابنِ عميل 802.1X الأساسي بطريقة PEAP مع عرض خطوات التبادل", en: "Build the base 802.1X client with PEAP and step-by-step exchange display" },
      { ar: "أضف دعم TLS مع استيراد شهادات العميل", en: "Add TLS support with client certificate import" },
      { ar: "صمّم شاشة الحكم التي تفسر نتيجة الرفض بلغة بشرية", en: "Design the verdict screen that explains rejections in human language" },
      { ar: "أطلق نسخة فردية رخيصة للجوالين ثم نسخة فرق مدفوعة", en: "Launch a cheap individual edition first, then a paid team edition" },
      { ar: "أضف تصدير تقرير الاختبار PDF لإرفاقه بتذاكر النشر", en: "Add PDF test report export to attach to deployment tickets" }
    ],
  },
  {
    id: "p157",
    title: { ar: "تطبيق تدريب قراءة رؤوس الحزم السداسية", en: "Packet Header Hex Trainer" },
    category: "mobile",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "فتح وحدات البروتوكولات (TCP ثم TLS ثم DNS) بمدفوعات متدرجة", en: "Progressive paid unlocks of protocol modules (TCP, then TLS, then DNS)" },
    skills: ["packet-analysis", "tcp", "wireshark"],
    desc: {
      ar: "تدرب على قراءة البيانات الخام: يعرض التطبيق بايتات حزمة حقيقية ويسألك عن مواضع الحقول والأعلام ومجاميع التحقق. الجمهور المستهدف: محللو الحزم ومرشحو شهادات التحليل. الميزة التنافسية: يبني المهارة النادرة في تشخيص الحزم بلا واجهة رسومية — ميزة حقيقية في المقابلات المتقدمة.",
      en: "Learn to read raw hex: the app shows a real packet's bytes and quizzes you on field offsets, flags, and checksums. Target: packet analysts and analysis-cert candidates. Differentiator: it builds the rare skill of debugging packets without a pretty GUI — a real edge in advanced interviews."
    },
    steps: [
      { ar: "جهّز مكتبة حزم حقيقية مجهولة (pcap مصغرة) مع شرح موضع كل حقل", en: "Prepare a library of real anonymized packets (small pcaps) with every field offset explained" },
      { ar: "ابنِ محرك الأسئلة (حدد الحقل، احسب القيمة، فسر العلم)", en: "Build the question engine (locate the field, compute the value, interpret the flag)" },
      { ar: "أطلق وحدة IP/TCP المجانية كمقدمة مجربة", en: "Launch the free IP/TCP module as a proven teaser" },
      { ar: "أضف وحدات UDP وDNS وTLS مدفوعة بفك القفل المتدرج", en: "Add paid UDP, DNS, and TLS modules with progressive unlocking" },
      { ar: "أضف وضع التحدي اليومي بحزمة عشوائية وسلسلة أيام", en: "Add a daily challenge mode with a random packet and day streak" }
    ],
  },
  {
    id: "p158",
    title: { ar: "صندوق أدوات الفني الميداني (تطبيق)", en: "Field Tech Toolbox App" },
    category: "mobile",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1400$ شهرياً", en: "$200-1400/mo" },
    monetization: { ar: "اشتراك احترافي للفرق مع تقارير بعلامة الشركة", en: "Team pro subscription with company-branded reports" },
    skills: ["troubleshooting", "dns", "testing", "cli"],
    desc: {
      ar: "تطبيق واحد لجولات الموقع: ping وتتبع المسار وفحص DNS وفحص المنافذ وحاسبة الكابلات، مع تصدير تقرير موقع تلقائي بعد كل زيارة. الجمهور المستهدف: مهندسو الميدان الذين يزورون العملاء. الميزة التنافسية: التقرير المولد تلقائياً بمستوى احترافي يصلح لإرساله للعميل مباشرة فيرفع صورة الفني والشركة.",
      en: "One app for site walkthroughs: ping, traceroute, DNS lookup, port check, and cable calculator, with an auto-generated site report after every visit. Target: field engineers visiting clients. Differentiator: the auto-generated report is professional enough to send straight to the client, upgrading the tech's image."
    },
    steps: [
      { ar: "ابنِ الأدوات الأساسية (ping وتتبع وفحص DNS ومنفذ) بواجهة موحدة", en: "Build the core tools (ping, trace, DNS lookup, port check) in a unified interface" },
      { ar: "أضف حاسبة الكابلات (الطول الأقصى، الحجم، التصنيف) كأداة مساعدة", en: "Add the cable calculator (max length, gauge, category) as a helper tool" },
      { ar: "أضف مولّد تقرير الموقع بصيغة PDF أنيق بنتائج كل الفحوصات", en: "Add the site report generator producing a clean PDF of all test results" },
      { ar: "أطلق نسخة فردية مدفوعة لمرة واحدة لقياس الطلب", en: "Launch a one-time paid individual edition to gauge demand" },
      { ar: "أضف اشتراك الفرق مع شعار الشركة وتقارير مجمعة لكل الزيارات", en: "Add a team subscription with company branding and aggregated visit reports" }
    ],
  },

  // ═══ CONTENT (p159–p164) ═══
  {
    id: "p159",
    title: { ar: "بث مباشر لحل مشكلات الشبكات الواقعية", en: "Live Troubleshooting Streams" },
    category: "content",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-900$ شهرياً", en: "$100-900/mo" },
    monetization: { ar: "إكراميات البث ورعاية الأدوات وعضوية مدفوعة للمحتوى الحصري", en: "Stream tips, tool sponsorships, and a paid membership for exclusive content" },
    skills: ["troubleshooting", "wireshark", "routing"],
    desc: {
      ar: "بث أسبوعي مباشر تحل فيه مشكلات شبكات يرسلها المشاهدون (التقاطات حزم وإعدادات أجهزة) خطوة بخطوة أمام الكاميرا وبالعربية. الجمهور المستهدف: المهندسون المبتدئون والطلاب. الميزة التنافسية: حالات معطلة حقيقية لا تمارين مصقولة — محتوى غير متوقع يتشاركه الناس لأنه يشبه عملهم اليومي.",
      en: "A weekly live stream where you debug viewer-submitted network problems (packet captures, device configs) step by step on camera in Arabic. Target: junior engineers and students. Differentiator: real broken cases instead of polished exercises — unpredictable, relatable content people share because it mirrors their daily work."
    },
    steps: [
      { ar: "جهّز استمارة استقبال المشكلات (وصف، التقاط حزم، إعدادات) وبيئة مختبر جاهزة", en: "Set up a problem-intake form (description, capture, configs) and a ready lab environment" },
      { ar: "ابث أول ثلاث جلسات على يوتيوب وتويتش معاً لبناء الجمهور", en: "Stream the first three sessions on both YouTube and Twitch to build an audience" },
      { ar: "فعّل الإكراميات وعضوية القناة بعد أول ألف مشاهد متفاعل", en: "Enable tips and channel membership after the first 1,000 engaged viewers" },
      { ar: "تصدّر لأدوات تستخدمها فعلاً مقابل رعاية شهرية معلنة بصراحة", en: "Pitch tools you genuinely use for a monthly transparently-disclosed sponsorship" },
      { ar: "حوّل أفضل الحالات إلى فيديوهات مقتطعة تبيع حزم مختبرات مرتبطة", en: "Cut the best cases into shorts that sell related lab packs" }
    ],
  },
  {
    id: "p160",
    title: { ar: "سلسلة رسوم متحركة: رحلات الحزمة", en: "Packet Journeys Animated Series" },
    category: "content",
    difficulty: 3,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "إعلانات المنصة وترخيص تعليمي للمعاهد والمدارس", en: "Platform ads plus education licensing for institutes and schools" },
    skills: ["tcp", "dns", "routing", "tls"],
    desc: {
      ar: "حلقات رسوم متحركة قصيرة (خمس دقائق) تتبع حياة حزمة: طلب GET من المتصفح إلى شبكة CDN والعودة، محكي كقصة رحلة بصرية مشوقة. الجمهور المستهدف: المتعلمون البصريون وصنّاع المحتوى التعليمي. الميزة التنافسية: سرد بجودة سينمائية يرخصه المدرسون داخل صفوفهم لأنه يشرح ما يعجزون عن شرحه بالكلام.",
      en: "Short animated episodes (5 minutes) following a packet's life: a GET request from browser to CDN and back, told as a visual journey story. Target: visual learners and educational content creators. Differentiator: cinema-grade storytelling that teachers license for their classrooms because it explains what words cannot."
    },
    steps: [
      { ar: "اكتب سيناريو الحلقة الأولى (طلب بسيط عبر DNS وTCP) بعدد مشاهد محدود", en: "Script episode one (a simple request via DNS and TCP) with a limited scene count" },
      { ar: "أنتج الحلقة بأدوات رسوم ميسورة (After Effects أو أداة ويب) بأسلوب بصري موحد", en: "Produce the episode with affordable animation tools in a consistent visual style" },
      { ar: "انشر ثلاث حلقات مجانية وقيّس معدل المشاركة قبل التوسع", en: "Publish three free episodes and measure share rates before scaling" },
      { ar: "بِع ترخيصاً تعليمياً (استخدام صفي مع أوراق نشاط) للمدارس والمعاهد", en: "Sell an education license (classroom use with activity sheets) to schools and institutes" },
      { ar: "أضف عضوية مبكرية تعرض الحلقات قبل النشر العام", en: "Add an early-access membership showing episodes before public release" }
    ],
  },
  {
    id: "p161",
    title: { ar: "سلسلة معمّقة بالعربية عن BGP", en: "Arabic BGP Deep-Dive Series" },
    category: "content",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "150-1500$ شهرياً", en: "$150-1500/mo" },
    monetization: { ar: "سلسلة مجانية تجذب الجمهور مع حزمة مختبرات مدفوعة مرتبطة", en: "Free series funneling to a paid companion lab pack" },
    skills: ["bgp", "routing", "dns"],
    desc: {
      ar: "سلسلة من 12 حلقة معمقة بالعربية عن BGP: التأسيس والتحديد والفلترة والمجتمعات، مع شرح أشهر انقطاعات الإنترنت العالمية وأسبابها. الجمهور المستهدف: المهندسون متوسطو الخبرة. الميزة التنافسية: أعمق مصدر عربي عن BGP، وكل حلقة مرتبطة بمختبر عملي قابل للتنفيذ بعد المشاهدة.",
      en: "A 12-episode Arabic masterclass on BGP: peering, path selection, filtering, and communities, plus breakdowns of famous global internet outages and their causes. Target: mid-level engineers. Differentiator: the deepest Arabic BGP resource, with every episode tied to a hands-on lab you can run after watching."
    },
    steps: [
      { ar: "خطط الحلقات الاثنتي عشرة من التأسيس إلى مواضيع التشغيل الإقليمية", en: "Plan the 12 episodes from fundamentals to regional operational topics" },
      { ar: "سجّل أول ثلاث حلقات بجودة صوت عالية قبل نشر أي شيء", en: "Record the first three episodes with high audio quality before publishing anything" },
      { ar: "أنتج حزمة المختبرات المرافقة (containerlab) واربطها بكل حلقة", en: "Produce the companion containerlab pack tied to each episode" },
      { ar: "أطلق السلسلة مجاناً مع رابط حزمة المختبرات المدفوعة", en: "Launch the series free with a link to the paid lab pack" },
      { ar: "أضف رعاية من شركة استضافة أو مزود سحابي إقليمي بعد إثبات المشاهدات", en: "Add sponsorship from a hosting or regional cloud company after proving view counts" }
    ],
  },
  {
    id: "p162",
    title: { ar: "سلسلة تاريخ الإنترنت وشبكاته", en: "Network History Video Series" },
    category: "content",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "100-700$ شهرياً", en: "$100-700/mo" },
    monetization: { ar: "رعايات ودعم شهري عبر منصات الدعم المباشر", en: "Sponsorships plus monthly support through direct-funding platforms" },
    skills: ["dns", "tcp", "routing", "documentation"],
    desc: {
      ar: "حلقات وثائقية مدتها عشر دقائق ببحث متقن: اليوم الذي انهار فيه DNS، وكيف دخلت منطقتنا إلى الإنترنت، وحرب الشركات على بروتوكولات التوجيه. الجمهور المستهدف: الجمهور التقني العام. الميزة التنافسية: سرد تاريخي يكسب مشاركات خارج نiche الشبكات فيوسّع قاعدة الجمهور بسرعة.",
      en: "Well-researched 10-minute documentary episodes: the day DNS broke, how our region got online, and the corporate wars over routing protocols. Target: the general tech audience. Differentiator: historical storytelling that earns shares beyond the networking niche, widening the audience fast."
    },
    steps: [
      { ar: "اختر خمس قصص تاريخية موثقة المصادر وشكلها كدراما متتابعة", en: "Pick five well-sourced historical stories and shape them as narrative drama" },
      { ar: "أنتج الحلقة الأولى بجودة بحث عالية (مصادر معلنة في الوصف)", en: "Produce episode one with strong research (sources listed in the description)" },
      { ar: "انشر بوتيرة أسبوعية ثابتة مع ملصقات مصممة لكل حلقة", en: "Publish on a strict weekly cadence with designed episode cover art" },
      { ar: "فعّل عضوية الدعم الشهري بعد الحلقة الخامسة", en: "Enable monthly fan funding after episode five" },
      { ar: "بِع رعاية حلقة كاملة لشركات تقنية إقليمية تريد بناء علامتها", en: "Sell full-episode sponsorship to regional tech companies building their brand" }
    ],
  },
  {
    id: "p163",
    title: { ar: "حواريات مع مهندسي شبكات عرب", en: "Interviews with Arab Network Engineers" },
    category: "content",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-800$ شهرياً", en: "$100-800/mo" },
    monetization: { ar: "رعايات ووصول مبكر مدفوع للحلقات الحصرية", en: "Sponsorships plus paid early access to exclusive episodes" },
    skills: ["networking", "cloud", "routing", "documentation"],
    desc: {
      ar: "سلسلة فيديو/بودكاست تحاور مهندسي شبكات عرباً: مسارهم المهني، حقيقة الرواتب، وقصصهم من مراكز البيانات ومزودي الخدمة. الجمهور المستهدف: الطلاب الذين يختارون مسارهم المهني. الميزة التنافسية: بيانات رواتب ومسارات إقليمية صادقة لا تتوفر في أي مكان آخر، وحكايات من داخل الصناعة تلهم الجيل القادم.",
      en: "A video/podcast series interviewing Arab network engineers: their career paths, salary realities, and war stories from datacenters and ISPs. Target: students choosing their career direction. Differentiator: honest regional salary and career data available nowhere else, plus insider stories that inspire the next generation."
    },
    steps: [
      { ar: "رتب خمسة مقابلات أولى مع مهندسين تعرفهم من خلفيات متنوعة", en: "Line up five first interviews with engineers you know from diverse backgrounds" },
      { ar: "جهّز نمط أسئلة موحد (المسار، الراتب، نصيحة، خطأ تعلم منه)", en: "Prepare a fixed question format (path, salary, advice, a learned-from mistake)" },
      { ar: "انشر الحلقات على يوتيوب مع نسخة صوتية على منصات البودكاست", en: "Publish on YouTube with an audio version on podcast platforms" },
      { ar: "فعّل وصولاً مبكراً مدفوعاً لحلقات المدربين المحترفين", en: "Enable paid early access for premium interview episodes" },
      { ar: "بِع رعاية لشركات توظيف تقنية تستهدف نفس الجمهور", en: "Sell sponsorship to tech hiring companies targeting the same audience" }
    ],
  },
  {
    id: "p164",
    title: { ar: "سلسلة أمان نهاية الأسبوع العملية", en: "Weekend Security Watch Series" },
    category: "content",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "50-500$ شهرياً", en: "$50-500/mo" },
    monetization: { ar: "إعلانات المنصة ورعاية نشرات بريدية مرافقة", en: "Platform ads plus sponsorship of the companion newsletter" },
    skills: ["security", "firewall", "vpn", "packet-analysis"],
    desc: {
      ar: "فيديو أسبوعي مدته ثماني دقائق يعرض حيلة دفاعية واحدة: إغلاق SSH كما يجب، كشف محاولة مسح في السجلات، فلترة DNS منزلية. الجمهور المستهدف: ممارسو تقنية المعلومات العامون. الميزة التنافسية: مخرج واحد قابل للتطبيق فور صباح الاثنين — لا نظريات، فقط خطوات تنفّذ في عشر دقائق.",
      en: "A weekly 8-minute video teaching one defensive trick: properly locking down SSH, spotting a scan in your logs, home DNS filtering. Target: generalist IT practitioners. Differentiator: exactly one Monday-morning action per episode — no theory, just steps you can apply in ten minutes."
    },
    steps: [
      { ar: "اكتب قائمة 20 حيلة دفاعية مرتبة بحسب سهولة التطبيق", en: "List 20 defensive tricks ranked by ease of application" },
      { ar: "صوّر أول أربع حلقات بأسلوب عرض موحد وشاشة مشاركة واضحة", en: "Film the first four episodes in a consistent format with clear screen sharing" },
      { ar: "انشر كل خميس مع عنوان واضح بالنتيجة (وليس بالتقنية)", en: "Publish every Thursday with outcome-based titles (not technology-based)" },
      { ar: "أضف نشرة بريدية أسبوعية تلخص الخطوات لكل مشترك", en: "Add a weekly newsletter summarizing the steps for subscribers" },
      { ar: "بِع رعاية النشرة لشركات أمن بعد تجاوز ألف مشترك", en: "Sell newsletter sponsorship to security companies past 1,000 subscribers" }
    ],
  },

  // ═══ COMMUNITY (p165–p170) ═══
  {
    id: "p165",
    title: { ar: "المؤتمر الافتراضي السنوي لمهندسي الشبكات العرب", en: "Annual Arab Network Engineers Virtual Conference" },
    category: "community",
    difficulty: 4,
    timeToMarket: { ar: "3 أشهر", en: "3 months" },
    revenue: { ar: "500-5000$ لكل نسخة", en: "$500-5000 per edition" },
    monetization: { ar: "تذاكر رمزية وأكشاك رعاية ولوحة وظائف مدفوعة", en: "Low-priced tickets, sponsor booths, and a paid job board" },
    skills: ["networking", "bgp", "cloud", "automation"],
    desc: {
      ar: "مؤتمر افتراضي ليوم واحد يُقام مرتين سنوياً بمتحدثين إقليميين وقاعات مختبرات مباشرة ولوحة وظائف. الجمهور المستهدف: مهندسو الشبكات العرب في كل المستويات. الميزة التنافسية: سعر تذكرة رمزي مع تسجيلات دائمة، وأكشاك رعاية بسعر يناسب المزودين الإقليميين الذين لا يستطيعون مؤتمرات عالمية.",
      en: "A one-day virtual conference run twice a year with regional speakers, live lab rooms, and a job board. Target: Arab network engineers at every level. Differentiator: a symbolic ticket price with permanent recordings, and sponsor booths priced for regional vendors who cannot afford global conferences."
    },
    steps: [
      { ar: "حدد هوية المؤتمر (عربي، عملي، بميزانية صفرية تقريباً) واسمه ونطاقه", en: "Define the conference identity (Arabic, hands-on, near-zero budget) plus name and domain" },
      { ar: "ادعُ خمسة متحدثين من مجتمعك بوعد بتسجيل دائم وشهادة مشاركة", en: "Invite five speakers from your community with permanent recording and a participation certificate" },
      { ar: "أطلق التسجيل المبكر مجاناً ثم تذاكر رمزية لتمويل قاعة البث", en: "Launch free early registration, then symbolic tickets to fund the streaming" },
      { ar: "بِع أكشاك الرعاية (شعار وعرض ثلاث دقائق) لثلاث شركات إقليمية", en: "Sell sponsor booths (logo + 3-minute pitch) to three regional companies" },
      { ar: "أضف لوحة وظائف مدفوعة للشركات بعد النسخة الأولى الناجحة", en: "Add a paid job board for companies after a successful first edition" }
    ],
  },
  {
    id: "p166",
    title: { ar: "برنامج إرشاد مهني بمقاعد مدفوعة وممولَة", en: "Mentorship Program with Paid Mentor Tier" },
    category: "community",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "مقاعد مدفوعة للمنضمين مع رعاية شركات للمقاعد المجانية", en: "Paid mentee seats with company-sponsored free seats" },
    skills: ["routing", "automation", "documentation", "monitoring"],
    desc: {
      ar: "برنامج إرشاد منظم لثمانية أسابيع: مكالمات جماعية أسبوعية ومراجعة مختبرات وعيادة سير ذاتية، مع مقاعد مجانية تمولها الشركات ومقاعد مدفوعة. الجمهور المستهدف: المبتدئون الباحثون عن اتجاه ومتوسطو الخبرة الباحثون عن تخصص. الميزة التنافسية: المرشدون مهندسون عاملون مختارون بعناية لا مدربون مهنيون عاميون.",
      en: "A structured 8-week mentorship: weekly group calls, lab reviews, and a CV clinic — with free seats funded by companies and paid seats for professionals. Target: juniors seeking direction and mid-levels seeking specialization. Differentiator: mentors are vetted working engineers, not generic career coaches."
    },
    steps: [
      { ar: "صمّم منهج الثمانية أسابيع (أهداف أسبوعية ومخرجات قابلة للقياس)", en: "Design the 8-week curriculum (weekly goals and measurable outputs)" },
      { ar: "جند ثلاثة مرشدين متطوعين من مهندسي الشبكات العاملين", en: "Recruit three volunteer mentors from working network engineers" },
      { ar: "أطلق دفعة أولى بمقاعد مدفوعة مخفضة لاختبار البرنامج", en: "Launch a first discounted paid-seat cohort to test the program" },
      { ar: "وقع رعاية مقاعد مجانية مع شركة توظيف تقنية", en: "Sign free-seat sponsorship with a tech hiring company" },
      { ar: "كرر الدفعات شهرياً وأضف مستوى متقدماً للمتخصصين", en: "Repeat cohorts monthly and add an advanced specialist tier" }
    ],
  },
  {
    id: "p167",
    title: { ar: "مسابقات شبكات بأسلوب CTF", en: "CTF-Style Networking Competitions" },
    category: "community",
    difficulty: 3,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "300-2500$ شهرياً", en: "$300-2500/mo" },
    monetization: { ar: "رسوم مشاركة ووصول مدفوع للجهات التوظيف إلى لوحة المتصدرين", en: "Entry fees plus paid recruiter access to the leaderboard" },
    skills: ["tcp", "security", "troubleshooting", "cli"],
    desc: {
      ar: "مسابقات شهرية مدتها أربع ساعات عبر الإنترنت: أعلام مخبأة في التقاطات حزم وشبكات معطوبة وألغاز إعدادات تُحل بالأدلة. الجمهور المستهدف: الطلاب والمبتدئون الجائعون لإثبات مهاراتهم. الميزة التنافسية: لوحة المتصدرين تتحول إلى إشارة توظيف حقيقية — الجهات تدفع للوصول إلى أفضل المشاركين.",
      en: "Monthly 4-hour online competitions: flags hidden in packet captures, broken networks, and config puzzles solved from evidence. Target: students and juniors hungry to prove their skills. Differentiator: the leaderboard becomes a real hiring signal — recruiters pay for access to top performers."
    },
    steps: [
      { ar: "ابنِ منصة المسابقة الأساسية (تسجيل، تسليم أعلام، لوحة متصدرين مباشرة)", en: "Build the core platform (registration, flag submission, live leaderboard)" },
      { ar: "أنتج أول 15 تحدياً متدرجاً في الطول والصعوبة", en: "Produce the first 15 challenges graded in length and difficulty" },
      { ar: "أطلق أول مسابقة مجانية لاختبار البنية وحجم الحمل", en: "Run the first competition free to test infrastructure and load" },
      { ar: "حوّل إلى رسوم مشاركة رمزية مع جوائز رعاية من شركات أدوات", en: "Convert to symbolic entry fees with sponsored prizes from tool companies" },
      { ar: "بِع وصول الجهات التوظيف إلى بيانات المتصدرين كخدمة سنوية", en: "Sell recruiter leaderboard access as an annual service" }
    ],
  },
  {
    id: "p168",
    title: { ar: "هاكاثونات جامعية بنموذج رعاية", en: "University Hackathons with Sponsorship Model" },
    category: "community",
    difficulty: 3,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "200-1500$ شهرياً", en: "$200-1500/mo" },
    monetization: { ar: "باقات رعاية للشركات لكل فعالية مع تغطية تكاليف التشغيل", en: "Per-event corporate sponsorship packages covering operating costs" },
    skills: ["networking", "iot", "wifi", "documentation"],
    desc: {
      ar: "تنظيم هاكاثونات بطابع شبكات في الجامعات: أنت تمنح منصة المختبر والمرشدين والجوائز، والشركات الراعية تدفع مقابل الظهور أمام المواهب. الجمهور المستهدف: شركات التقنية الباحثة عن مواهب واجهات جامعية. الميزة التنافسية: تمتلك خط أنابيب المواهب الذي تدفع العلامات للوقوف أمامه — قيمة تجارية لا تقاوم.",
      en: "Run networking-themed hackathons at universities: you provide the lab platform, mentors, and prizes; sponsors pay for visibility in front of talent. Target: tech companies hunting early talent. Differentiator: you own the talent pipeline brands pay to stand in front of — a commercial position that compounds."
    },
    steps: [
      { ar: "ابنِ حزمة رعاية من ثلاث مستويات (شعار، جلسة، مقعد محكّم)", en: "Build a three-tier sponsorship package (logo, session, judge seat)" },
      { ar: "تواصل مع نادٍ تقني في جامعة واحدة وقدم تنظيم النسخة الأولى", en: "Approach one university tech club and offer to run the first edition" },
      { ar: "جهّز منصة المختبر وأدوات الفرق وتحدي الهاكاثون الأول (شبكة حرم ذكية)", en: "Prepare the lab platform, team tooling, and the first challenge theme (a smart campus network)" },
      { ar: "نفّذ الفعالية الأولى مع تغطية تكاليفها من راعٍ رئيسي واحد", en: "Run the first event covered by a single headline sponsor" },
      { ar: "وثّق النتائج ووسّع لثلاث جامعات بحزمة رعاية موسعة", en: "Document results and expand to three universities with a bigger package" }
    ],
  },
  {
    id: "p169",
    title: { ar: "مجتمع مختبرات مغلق بعضوية شهرية", en: "Members-Only Lab Community" },
    category: "community",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1500$ شهرياً", en: "$200-1500/mo" },
    monetization: { ar: "عضوية شهرية بحسب مستوى الوصول للمحتوى والمراجعات", en: "Monthly membership tiers by access level and review privileges" },
    skills: ["networking", "automation", "troubleshooting"],
    desc: {
      ar: "مجتمع مغلق على ديسكورد أو تلغرام: تحدي مختبر أسبوعي وشرح حلول مسجل ومراجعات متبادلة للإعدادات والأكواد بين الأعضاء. الجمهور المستهدف: المتعلمون الذاتيون بلا زملاء مهنيين. الميزة التنافسية: إيقاع التحدي ثم الشرح ثم المراجعة يصنع استمرارية تفتقدها أغلب المجموعات التقنية.",
      en: "A members-only Discord or Telegram community: a weekly lab challenge, recorded solution walkthroughs, and peer review of each other's configs and code. Target: self-learners without professional colleagues. Differentiator: the challenge → walkthrough → review rhythm creates the retention most tech groups lack."
    },
    steps: [
      { ar: "جهّز مختبر التحدي الأسبوعي الأول ومستند الشرح المرافقة", en: "Prepare the first weekly challenge lab and its companion walkthrough document" },
      { ar: "أنشئ الخادم بقنوات واضحة (تحدي، حلول، مراجعة، فوز)", en: "Create the server with clear channels (challenge, solutions, review, wins)" },
      { ar: "ادعُ 30 متعلماً مجاناً لأربعة أسابيع لاختبار الإيقاع", en: "Invite 30 learners free for four weeks to test the rhythm" },
      { ar: "حوّل إلى عضوية شهرية رمزية مع أرشيف كامل للمشتركين", en: "Convert to a small monthly membership with a full archive for subscribers" },
      { ar: "أضف مستوى مراجعة متقدمة (تسليم إعدادات يراجعها مهندس محترف)", en: "Add a premium review tier (submit configs reviewed by a professional engineer)" }
    ],
  },
  {
    id: "p170",
    title: { ar: "نادي مختبر الشهر", en: "Lab-of-the-Month Club" },
    category: "community",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "100-800$ شهرياً", en: "$100-800/mo" },
    monetization: { ar: "اشتراك شهري بمحتوى جديد وساعات مكتبية مباشرة", en: "Monthly subscription with fresh content and live office hours" },
    skills: ["routing", "bgp", "automation", "containerlab"],
    desc: {
      ar: "شحنة شهرية منتظمة: سيناريو مختبر جديد وفيديو مقدمة من ربع ساعة وساعات مكتبية ولوحة متصدرين للأعضاء. الجمهور المستهدف: المهندسون الذين يبنون ملف أعمال علنياً. الميزة التنافسية: كل مختبر منجز يُرفع إلى حساب العامل على GitHub — النادي يبني سيرتك الذاتية نيابة عنك شهراً بشهر.",
      en: "A reliable monthly drop: a fresh lab scenario, a 15-minute intro video, office hours, and a member leaderboard. Target: engineers building a public portfolio. Differentiator: every completed lab commits to your GitHub — the club builds your CV for you, month by month."
    },
    steps: [
      { ar: "ابنِ أول ثلاثة سيناريوهات شهرية جاهزة قبل الإطلاق", en: "Build the first three monthly scenarios ready before launch" },
      { ar: "صمّم صفحة الاشتراك ووصف القيمة (ملف أعمال يتكامل شهرياً)", en: "Design the subscription page and value story (a portfolio that compounds monthly)" },
      { ar: "أطلق بسعر تأسيسي لأول 50 مشتركاً مع ضمان شهر أول بلا مخاطرة", en: "Launch at a founding price for the first 50 subscribers with a risk-free first month" },
      { ar: "أضف ساعات مكتبية نصف شهرية لحل إغلاقات المشتركين", en: "Add bi-weekly office hours unblocking subscribers' sticking points" },
      { ar: "أبرز أفضل ملفات الأعمال شهرياً كدليل اجتماعي يبيع الاشتراك", en: "Showcase the best member portfolios monthly as social proof that sells the club" }
    ],
  },

  // ═══ CAREER (p171–p176) ═══
  {
    id: "p171",
    title: { ar: "دليل الانتقال من NOC إلى مهندس شبكات", en: "NOC-to-Network-Engineer Transition Playbook" },
    category: "career",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "بيع الدليل الرقمي مع جلسة إرشاد فردية كترقية", en: "Digital playbook sales with a 1:1 coaching session upsell" },
    skills: ["routing", "automation", "monitoring", "documentation"],
    desc: {
      ar: "دليل مدفوع من 60 صفحة: فجوات المهارات الفعلية بين أدوار NOC وأدوار الهندسة، وخطة تسعين يوماً، ومشاريع ملف أعمال، ونصوص مقابلات. الجمهور المستهدف: محللو NOC الشاعرون بالتعطل. الميزة التنافسية: مبني على قصص انتقال حقيقية بجدول زمني صادق لا وعود كاذبة بثلاثين يوماً.",
      en: "A 60-page paid playbook: the exact skill gaps between NOC and engineering roles, a 90-day plan, portfolio projects, and interview scripts. Target: NOC analysts feeling stuck. Differentiator: built from real transition stories with an honest timeline — no fake 30-day promises."
    },
    steps: [
      { ar: "قابل خمسة مهندسين انتقلوا من NOC ووثّق فجوات مهاراتهم الفعلية", en: "Interview five engineers who moved out of NOC and document their real skill gaps" },
      { ar: "ألّف الفصول (التشخيص، الخطة، المشاريع، المقابلات) مع قوائم فحص", en: "Write the chapters (assessment, plan, projects, interviews) with checklists" },
      { ar: "أنتج نسخة PDF أنيقة ونسخة ملف Notion قابل للتعديل", en: "Produce a polished PDF edition plus an editable Notion version" },
      { ar: "أطلق على Gumroad مع فصل مجاني وجلسة جماعية للأسئلة", en: "Launch on Gumroad with a free chapter and a live group Q&A" },
      { ar: "أضف جلسات إرشاد فردية مدفوعة كترقية عالية الهامش", en: "Add paid 1:1 coaching sessions as a high-margin upsell" }
    ],
  },
  {
    id: "p172",
    title: { ar: "تدريب مفاوضات الرواتب للأدوار التقنية", en: "Salary Negotiation Coaching for Tech Roles" },
    category: "career",
    difficulty: 1,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "200-1500$ شهرياً", en: "$200-1500/mo" },
    monetization: { ar: "رسوم الجلسة مع باقة مراجعة العروض والردود البريدية", en: "Per-session fees with offer-review and email-reply packages" },
    skills: ["communication", "documentation", "networking"],
    desc: {
      ar: "جلسات إرشاد فردية ببيانات رواتب إقليمية وسكربتات تقييم العروض ومكالمات مفاوضات تجريبية بالأدوار. الجمهور المستهدف: المهندسون أصحاب العروض الذين يبخسون أنفسهم. الميزة التنافسية: بيانات راتب محددة بالأدوار الشبكية في المنطقة، لا نصائح عامة من غير المتخصصين.",
      en: "1:1 coaching with regional salary data, offer-evaluation scripts, and role-played negotiation calls. Target: engineers with offers who undersell themselves. Differentiator: role-specific salary data for network careers in the region, not generic advice from generalists."
    },
    steps: [
      { ar: "اجمع بيانات رواتب مجهولة من مجتمعات المهندسين لثلاث دول على الأقل", en: "Gather anonymized salary data from engineer communities across at least three countries" },
      { ar: "أعدّ سكربت المفاوضة الأساسي مع ردود على الحجج الخمس الأكثر شيوعاً", en: "Prepare the core negotiation script with counter-arguments to the five most common pushbacks" },
      { ar: "قدّم أول جلستين مجاناً مقابل شهادات نتيجة موثقة", en: "Offer the first two sessions free in exchange for documented outcome testimonials" },
      { ar: "بِع جلسة واحدة وباقة ثلاث جلسات بسعر مخفض", en: "Sell a single session and a discounted three-session package" },
      { ar: "أضف خدمة مراجعة عرض بريدية بسرعة 24 ساعة", en: "Add a 24-hour-turnaround email offer-review service" }
    ],
  },
  {
    id: "p173",
    title: { ar: "خدمة مراجعة مشاريع التوظيف المنزلية", en: "Take-Home Project Reviews" },
    category: "career",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "تسعير بحسب عمق المراجعة وسرعة التسليم", en: "Pricing by review depth and turnaround speed" },
    skills: ["routing", "automation", "python", "documentation"],
    desc: {
      ar: "خدمة مراجعة لمهام التوظيف المنزلية في الشبكات والأتمتة: تُسلَّم المشروع فيُعاد بمعايير تقييم معلمة وملاحظات تحسين مفصلة قبل الموعد النهائي. الجمهور المستهدف: الباحثون عن عمل وخريجو المعاهد. الميزة التنافسية: مصداقية المراجِع — تراجع العمل نفسه الذي تؤديه في وظيفتك اليومية.",
      en: "A review service for networking and automation take-home assignments: you receive the candidate's project and return a marked rubric with detailed improvement notes before the deadline. Target: job seekers and bootcamp grads. Differentiator: reviewer credibility — you review the same work you do in your day job."
    },
    steps: [
      { ar: "صمّم نموذج التقييم (تصميم، تنفيذ، توثيق، قابلية الصيانة) بوزن واضح", en: "Design the rubric (design, implementation, documentation, maintainability) with clear weights" },
      { ar: "أنشئ عينة مراجعة كاملة لمشروع عام تعرض جودة الخدمة", en: "Create a full sample review of a generic project showcasing your quality" },
      { ar: "أطلق خدمة 48 ساعة بأسعار ثابتة وواضحة", en: "Launch a 48-hour service at clear fixed prices" },
      { ar: "أضف خيار 24 ساعة بسعر أعلى لمواعيد قريبة", en: "Add a premium 24-hour option for near deadlines" },
      { ar: "وقّع شراكة مع معاهد تدريب تراجع مشاريع طلابها النهائية", en: "Sign partnerships with training institutes reviewing final student projects" }
    ],
  },
  {
    id: "p174",
    title: { ar: "محتوى يوم في حياة + حزمة مهنية", en: "Day-in-the-Life Content + Career Kit" },
    category: "career",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "100-800$ شهرياً", en: "$100-800/mo" },
    monetization: { ar: "بيع الحزمة المهنية مع روابط تسويق بالعمولة لدورات موصى بها", en: "Career-kit sales plus affiliate links to recommended courses" },
    skills: ["monitoring", "troubleshooting", "routing", "documentation"],
    desc: {
      ar: "سلسلة فيديوهات قصيرة تتبع أياماً حقيقية لمهندسي شبكات (مع الأعمال الروتينية وحوادث الثالثة فجراً)، مرفقة بحزمة مهنية: خرائط الأدوار وقوائم المهارات وخطط الدراسة. الجمهور المستهدف: الطلاب الذين يختارون تخصصهم. الميزة التنافسية: لقطات غير مصقولة تشمل الملل والانهيارات — الصدق الذي يفتقده محتوى المسارات المهنية عادة.",
      en: "A short-video series following real network engineers' days (routine pages and 3am outages included), bundled with a career kit: role maps, skill checklists, and study plans. Target: students choosing a specialization. Differentiator: unfiltered footage including the boring pages — the honesty career content usually lacks."
    },
    steps: [
      { ar: "وافق ثلاثة مهندسين على توثيق يوم كامل بالكاميرا المحمولة", en: "Get three engineers to agree to document a full day with a body-worn camera" },
      { ar: "صغ الحلقات القصيرة (الصباح، الحادثة، الأداة، النصيحة) من كل يوم", en: "Cut each day into short episodes (morning, incident, tool, advice)" },
      { ar: "ألّف الحزمة المهنية (خرائط أدوار، روابط مهارات، خطة 90 يوماً)", en: "Write the career kit (role maps, skill links, a 90-day plan)" },
      { ar: "أطلق السلسلة مجاناً والحزمة مدفوعة عبر Gumroad", en: "Launch the series free and the kit paid via Gumroad" },
      { ar: "أضف روابط تسويق بالعمولة لدورات جربتها فعلاً", en: "Add affiliate links only for courses you have actually taken" }
    ],
  },
  {
    id: "p175",
    title: { ar: "إعادة صياغة ملفات لينكدإن للمهندسين", en: "LinkedIn Makeovers for Engineers" },
    category: "career",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "150-1000$ شهرياً", en: "$150-1000/mo" },
    monetization: { ar: "رسوم لكل ملف مع باقات متدرجة (صياغة، صياغة وتدقيق، متابعة شهر)", en: "Per-profile fees with tiered packages (rewrite, rewrite + audit, month of follow-up)" },
    skills: ["communication", "documentation", "networking"],
    desc: {
      ar: "إعادة كتابة الملفات الشخصية تحوّل سيرة حلال المشكلات إلى قصص أثر: صيغ العناوين وعرض المشاريع بنتائج مقيسة واستراتيجية الكلمات المفتاحية لبحث الموظفين. الجمهور المستهدف: مهندسون جيدون غير مرئيين. الميزة التنافسية: تتحدث لغة المهندس وتكتب بلسان المسوّق — الجمع الذي يفتقده كتّاب السير العاميون.",
      en: "Profile rewrites that turn ticket-resolver CVs into impact stories: headline formulas, project write-ups with measured results, and keyword strategy for recruiter search. Target: invisible good engineers. Differentiator: you speak engineer and write marketing — the combination generalist CV writers lack."
    },
    steps: [
      { ar: "حلّل عشرة ملفات مهندسين تم توظيفهم فعلاً واستخرج الأنماط", en: "Analyze ten profiles of engineers who actually got hired and extract patterns" },
      { ar: "أنشئ نموذج إعادة الصياغة (عنوان، ملخص، خبرات بصيغة أثر)", en: "Create the rewrite template (headline, summary, impact-phrased experience)" },
      { ar: "أنجز أول ملفين مجاناً مقابل صور قبل/بعد وموافقة النشر", en: "Do the first two profiles free for before/after screenshots and permission to publish" },
      { ar: "بِع الباقات الثلاث عبر صفحة هبوط بسيطة", en: "Sell the three packages through a simple landing page" },
      { ar: "أضف خدمة تدقيق أسبوعي لطلبات التواصل والرسائل", en: "Add a weekly audit service for connection requests and messages" }
    ],
  },
  {
    id: "p176",
    title: { ar: "مقابلات تجريبية لأدوار الشبكات", en: "Mock Interviews for Network Roles" },
    category: "career",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "200-1400$ شهرياً", en: "$200-1400/mo" },
    monetization: { ar: "سعر الجلسة مع باقة ثلاث جلسات مخفضة (تقنية، تصميم، سلوكية)", en: "Per-session pricing with a discounted 3-session bundle (technical, design, behavioral)" },
    skills: ["routing", "switching", "troubleshooting", "bgp"],
    desc: {
      ar: "مقابلات تقنية محاكاة: ستون دقيقة من أسئلة الشبكات المتصاعدة (تصميم، استكشاف أخطاء، مواقف سلوكية) مع تغذية راجعة مسجلة وخطط تحسين. الجمهور المستهدف: المرشحون في الأدوار النهائية للمقابلات. الميزة التنافسية: بنك أسئلة يحاكي لجان المقابلات الفعلية لدى المزودين والمقاولين الإقليميين.",
      en: "Simulated technical interviews: 60 minutes of escalating network questions (design, troubleshooting, behavior) with recorded feedback and improvement plans. Target: final-round candidates. Differentiator: a question bank mirroring real panels at regional ISPs and integrators."
    },
    steps: [
      { ar: "اجمع أسئلة مقابلات فعلية من مهندسين حديثي التعيين في ثلاث شركات", en: "Collect real interview questions from recently-hired engineers at three companies" },
      { ar: "ابنِ هيكل الجلسة (10 دقائق تقديم، 35 تقنية، 15 سلوكية)", en: "Structure the session (10-minute intro, 35 technical, 15 behavioral)" },
      { ar: "قدّم أول جلستين مجاناً مقابل تقييمات موثقة", en: "Offer the first two sessions free in exchange for documented reviews" },
      { ar: "بِع الجلسة الواحدة وباقة الثلاث بسعر مخفض", en: "Sell single sessions and a discounted 3-session bundle" },
      { ar: "أضف تقريراً مكتوباً بنقاط القوة والضعف كخدمة إضافية", en: "Add a written strengths/weaknesses report as an add-on" }
    ],
  },

  // ═══ ECOMMERCE (p177–p182) ═══
  {
    id: "p177",
    title: { ar: "حزم Wi-Fi 6 منتقاة للمنازل", en: "Curated Wi-Fi 6 Starter Bundles" },
    category: "ecommerce",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "هامش بيع الحزمة مع خدمة إعداد اختيارية عبر مكالمة فيديو", en: "Bundle margin plus an optional video-call setup service" },
    skills: ["wifi", "networking", "cabling", "documentation"],
    desc: {
      ar: "صندوق منتقى: راوتر Wi-Fi 6 ونقطة شبكية وكابلات مقطوعة مسبقاً وبطاقة إعداد مضبوطة لأنواع مزودي المنطقة. الجمهور المستهدف: الأسر التي ترقي شبكتها للعمل البعيد والألعاب. الميزة التنافسية: بطاقة الإعداد تجيب عن أشهر عشرة أسئلة دعم قبل حدوثها، فتخفض المرتجعات وترفع التقييمات.",
      en: "A curated box: Wi-Fi 6 router, mesh node, pre-cut cables, and a setup card tuned to the region's ISP types. Target: families upgrading for remote work and gaming. Differentiator: the setup card pre-answers the top-10 support questions, cutting returns and lifting reviews."
    },
    steps: [
      { ar: "اختبر ثلاثة توليفات راوتر/مش حتى تجد أفضل توازن سعر وأداء", en: "Test three router/mesh combos to find the best price-to-performance balance" },
      { ar: "صمّم بطاقة الإعداد بخطوات مرقمة لأنواع PPPoE والآي بي الثابت المحلية", en: "Design the numbered setup card for local PPPoE and static-IP ISP types" },
      { ar: "أطلق في متجرك مع فيديو تغليف وفتح صندوق جاذب", en: "Launch in your store with an attractive packing and unboxing video" },
      { ar: "اجمع تقييمات المنتجين وأضف نسخة الألعاب (QoS مضبوط مسبقاً)", en: "Collect product reviews and add a gaming edition with pre-tuned QoS" },
      { ar: "أضف خدمة إعداد عبر مكالمة فيديو مدفوعة للعائلات غير التقنية", en: "Add a paid video-call setup service for non-technical families" }
    ],
  },
  {
    id: "p178",
    title: { ar: "حقيبة مكتب مهندس الشبكات", en: "Network Engineer Desk Kit" },
    category: "ecommerce",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "150-800$ شهرياً", en: "$150-800/mo" },
    monetization: { ar: "بيع لمرة واحدة مع طلبات هدايا الشركات بالجملة", en: "One-time sales plus bulk corporate gift orders" },
    skills: ["cli", "cabling", "testing"],
    desc: {
      ar: "حقيبة مكتب مصغرة: كابل وحدة تحكم USB ومحوّل USB-إيثرنت وقابس عودة الحلقة ومختبر جيب وبطاقات مراجعة ملخصة. الجمهور المستهدف: مسؤولو الشبكات الجدد. الميزة التنافسية: الحقيبة التي تمنيت وجودها في يومك الأول — منتج هدية مثالي لحفل التخرج وأول عمل.",
      en: "A compact desk pouch: USB console cable, USB-Ethernet adapter, loopback plug, pocket tester, and summary cheat cards. Target: new network admins. Differentiator: the pouch you wish you had on day one — a perfect graduation or first-job gift product."
    },
    steps: [
      { ar: "اختبر كل عنصر على حدة (توافق أنظمة التشغيل وجودة التصنيع)", en: "Test each item individually (OS compatibility and build quality)" },
      { ar: "صمّم بطاقات المراجعة الملخصة بأوامر اليوم الأول الحقيقية", en: "Design the cheat cards with the actual commands you use on day one" },
      { ar: "أطلق في متجر مع صور تغليف تصلح للإهداء", en: "Launch in a store with gift-ready packaging photos" },
      { ar: "سوّق في مواسم التخرج عبر إعلانات مستهدفة لأقارب الخريجين", en: "Market during graduation season with ads targeted at graduates' relatives" },
      { ar: "بِع طلبات الشركات حزماً من عشر حقائب مع خصم الجملة", en: "Sell corporate orders in packs of ten with a bulk discount" }
    ],
  },
  {
    id: "p179",
    title: { ar: "حزمة سفر محلل الحزم", en: "Travel Adapter Kits for Packet Sniffers" },
    category: "ecommerce",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "100-700$ شهرياً", en: "$100-700/mo" },
    monetization: { ar: "بيع الطقم عبر متجر متخصص ومجتمعات المستشارين", en: "Kit sales through a niche store and consultant communities" },
    skills: ["packet-analysis", "cabling", "testing"],
    desc: {
      ar: "حزمة سفر لمحللي الحزم: محور USB-C بمنفذ إيثرنت وكابل تجزئة (tap) وذاكرة USB عليها نسخ Wireshark المحمولة وحافظة سفر منسقة. الجمهور المستهدف: المستشارون والمختبرون الأمنيون المسافرون. الميزة التنافسية: كل عناصرها صديقة لتفتيش المطارات ومختبرة للعمل معاً كعدّة واحدة.",
      en: "A travel kit for packet analysts: USB-C hub with Ethernet, a network tap cable, a USB stick with portable Wireshark builds, and an organized travel case. Target: traveling consultants and security testers. Differentiator: every item is TSA-friendly and pre-tested to work together as one kit."
    },
    steps: [
      { ar: "اختبر التوافق بين المحور والكابل والنسخ المحمولة على ثلاثة أنظمة", en: "Test hub, tap cable, and portable builds together across three operating systems" },
      { ar: "جهّز ذاكرة USB بنسخ محمولة محدثة وأدوات مساعدة مختارة", en: "Prepare the USB stick with updated portable builds and selected helper tools" },
      { ar: "صمّم حافظة داخلية بأماكن مخصصة لكل أداة", en: "Design an internal case layout with a dedicated slot per tool" },
      { ar: "أطلق في متجر متخصص مع منشورات في مجتمعات الاستشاريين", en: "Launch in a niche store with posts in consultant communities" },
      { ar: "أضف نسخة فاحص أمني (منافذ ذاكرة مكتوبة الحماية فقط) بسعر أعلى", en: "Add a security-auditor edition (write-protected USB ports only) at a premium" }
    ],
  },
  {
    id: "p180",
    title: { ar: "عدّة أول وظيفة لمهندس الشبكات", en: "First-Job Network Toolkit" },
    category: "ecommerce",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1000$ شهرياً", en: "$200-1000/mo" },
    monetization: { ar: "مبيعات مواسم التخرج وشراكات مع معاهد التدريب", en: "Graduation-season sales plus training-institute partnerships" },
    skills: ["cabling", "labeling", "testing", "documentation"],
    desc: {
      ar: "صندوق هدية جاهز لأول وظيفة في NOC أو الميدان: حقيبة كابلات مسماة ومختبر أساسي ودليل جيب بثلاثين أمراً ستستخدمها فعلاً. الجمهور المستهدف: الخريجون الجدد وأهاليهم. الميزة التنافسية: يُسوّق كهدية تخرج بعبارة جاهز ليوم الأول — رسالة عاطفية تبيع منتجاً عملياً.",
      en: "A gift-ready box for a first NOC or field role: a labeled cable pouch, a basic tester, and a pocket guide of the 30 commands you will actually use. Target: fresh grads and their parents. Differentiator: marketed as a graduation gift with a day-one-ready message — an emotional pitch selling a practical product."
    },
    steps: [
      { ar: "حدد قائمة العناصر النهائية بسعر يجعل الحزمة هدية منطقية", en: "Finalize the item list at a price that makes sense as a gift" },
      { ar: "ألّف دليل الجيب بثلاثين أمراً مرتبة بحسب موقف الاستخدام", en: "Write the pocket guide with 30 commands ordered by usage situation" },
      { ar: "صمّم تعبئة احتفالية ببطاقة إهداء قابلة للكتابة", en: "Design celebratory packaging with a writable gift card" },
      { ar: "أطلق قبل موسم التخرج بستة أسابيع مع إعلانات مستهدفة", en: "Launch six weeks before graduation season with targeted ads" },
      { ar: "وقّع شراكة مع معهدين تدريب يبيعان الحزمة لخريجيهما", en: "Sign partnerships with two training institutes selling the box to their grads" }
    ],
  },
  {
    id: "p181",
    title: { ar: "عدّة محطة عمل NOC عن بعد", en: "Remote NOC Workstation Kit" },
    category: "ecommerce",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "300-1600$ شهرياً", en: "$300-1600/mo" },
    monetization: { ar: "بيع للشركات مع ترخيص لكل موظف عن بعد", en: "B2B sales with per-remote-employee licensing" },
    skills: ["monitoring", "vpn", "linux", "documentation"],
    desc: {
      ar: "عدّة عمل منزلي لفرق NOC: محور وحدة تحكم مزدوج وخيار KVM عبر IP وسمّاعة مواصفات محددة ومختبر توثيق مرفق للتهيئة. الجمهور المستهدف: الشركات التي تجهز موظفي مركز العمليات عن بعد. الميزة التنافسية: تصل مجهزة مسبقاً بصورة مراقبة الشركة الجاهزة للتثبيت فبكون يوم الموظف الأول جاهزاً فور فتح الصندوق.",
      en: "A work-from-home NOC kit: dual-console USB hub, optional KVM-over-IP, a spec'd headset, and a documented onboarding lab. Target: companies equipping remote operations-center hires. Differentiator: it ships pre-imaged with the company's monitoring stack so the employee's first day works out of the box."
    },
    steps: [
      { ar: "ابنِ التوليفة المرجعية واختبرها أسبوع عمل كاملاً من المنزل", en: "Build the reference combo and test it for a full working week from home" },
      { ar: "وثّق مختبر التهيئة خطوة بخطوة بصور تساعد قسم تقنية الشركة", en: "Document the onboarding lab step by step with photos for the company's IT team" },
      { ar: "قدّم نموذجاً تجريبياً لشركة توظف عن بعد مقابل دراسة حالة", en: "Offer a pilot to one remote-hiring company in exchange for a case study" },
      { ar: "بِع للشركات بحزمة لكل مقعد مع خصم حجمي", en: "Sell to companies as a per-seat package with volume discounts" },
      { ar: "أضف خدمة تجهيز الصورة المخصصة لكل شركة برسوم لمرة واحدة", en: "Add a custom company-image flashing service for a one-time fee" }
    ],
  },
  {
    id: "p182",
    title: { ar: "متجر حزم الدراسة الرقمية المطبوعة", en: "Digital Study Bundle Store" },
    category: "ecommerce",
    difficulty: 1,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-900$ شهرياً", en: "$100-900/mo" },
    monetization: { ar: "بيع منتجات رقمية وحزم مخفضة وسلاسل تحديث", en: "Digital product sales with discounted bundles and update seasons" },
    skills: ["subnetting", "routing", "dns", "documentation"],
    desc: {
      ar: "متجر Gumroad يبيع أوراق مراجعة قابلة للطباعة وبطاقات مراجعة وكتب تدريب الشبكات الفرعية — قرطاسية دراسة الشبكات المصممة بإتقان. الجمهور المستهدف: مرشحو الشهادات وطلاب الدورات. الميزة التنافسية: منتجات مطبوعة جميلة التصميم بالعربية والإنجليزية معاً في سوق يقدم الإنجليزية فقط.",
      en: "A Gumroad store selling printable cheat sheets, flashcard decks, and subnetting drill books — the well-designed stationery of networking study. Target: exam candidates and course students. Differentiator: beautifully designed printables in Arabic and English together, in a market offering English only."
    },
    steps: [
      { ar: "أنشئ أول ثلاثة منتجات (ورقة منافذ، بطاقات OSI، كتاب تدريب شامل)", en: "Create the first three products (ports sheet, OSI cards, a drilling workbook)" },
      { ar: "صمّم كل منتج بقالب طباعة أنيق يعمل أبيض وأسود", en: "Design each product in a clean print template that works in black and white" },
      { ar: "أطلق المتجر مع منتج مجاني واحد يجمع القائمة البريدية", en: "Launch the store with one free product building the mailing list" },
      { ar: "بِع الحزمة المجمعة بسعر يوفر 30% عن الشراء المنفصل", en: "Sell the full bundle at 30% off versus separate purchases" },
      { ar: "أطلق تحديثات موسمية للمنتجات قبل مواسم الامتحانات", en: "Release seasonal product updates ahead of exam seasons" }
    ],
  },

  // ═══ CONSULTING (p183–p188) ═══
  {
    id: "p183",
    title: { ar: "فحص صحي لواي فاي المقاهي", en: "Café Wi-Fi Health-Check" },
    category: "consulting",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "300-1500$ شهرياً", en: "$300-1500/mo" },
    monetization: { ar: "رسوم تدقيق ثابتة مع تنفيذ الإصلاحات كمرحلة ثانية مدفوعة", en: "Flat audit fee with fixes as a paid phase two" },
    skills: ["wifi", "site-survey", "troubleshooting", "qos"],
    desc: {
      ar: "تدقيق عملي من ساعتين: خريطة تغطية وخطة قنوات ونصيحة مكان الراوتر وقائمة إصلاحات مرتبة بالأثر — تُسلّم كتقرير مصور جذاب. الجمهور المستهدف: المقاهي التي تخسر زبائن الحاسوب المحمول. الميزة التنافسية: أجر الفحص أقل من إيراد طاولتين إضافيتين شهرياً — معادلة بيع يفهمها صاحب المقهى فوراً.",
      en: "A practical 2-hour audit: coverage map, channel plan, router placement advice, and an impact-ranked fix list — delivered as an attractive photo report. Target: cafés losing laptop customers. Differentiator: the audit fee is less than the monthly revenue of two extra tables — a sales equation any café owner gets instantly."
    },
    steps: [
      { ar: "جهّز حزمة الفحص (مسح، قياس، قوالب تقرير) وعينة تقرير مصورة", en: "Prepare the audit kit (survey, measurement, report templates) plus a sample photo report" },
      { ar: "نفّذ أول فحصين بخصم مقابل تقييمات عامة وصور قبل/بعد", en: "Run the first two audits discounted in exchange for public reviews and before/after photos" },
      { ar: "بِع الفحص بسعر ثابت مع عرض تقرير عينة عند التواصل", en: "Sell the audit at a fixed price, sharing the sample report when pitching" },
      { ar: "حوّل قائمة الإصلاحات إلى مشروع تنفيذ بعرض سعر منفصل", en: "Convert the fix list into an implementation project with a separate quote" },
      { ar: "أضف عقد فحص ربع سنوي للسلاسل متعددة الفروع", en: "Add a quarterly recheck contract for multi-branch chains" }
    ],
  },
  {
    id: "p184",
    title: { ar: "استشارة ما قبل شراء معدات الشبكات", en: "Pre-Purchase Network Gear Advisory" },
    category: "consulting",
    difficulty: 2,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "رسوم مراجعة العرض مع روابط شراء بالعمولة عند التنفيذ", en: "Quote-review fees plus affiliate purchase links when implemented" },
    skills: ["networking", "wifi", "poe", "planning"],
    desc: {
      ar: "جلسة استشارية مدفوعة تراجع عرض شراء المعدات قبل التوقيع: التوافق وكشف الإفراط وتعديل قائمة الكميات ببدائل أرخص بلا خسارة أداء. الجمهور المستهدف: المكاتب الصغيرة وأصحاب المنازل قبل مشاريع التجهيز. الميزة التنافسية: توفر للعميل عادة 20-40% من قيمة العرض مقابل أجر يمثل جزءاً يسيراً من الوفر.",
      en: "A paid advisory session reviewing the gear quote before signing: compatibility, overkill detection, and a revised bill of materials with cheaper alternatives at no performance loss. Target: small offices and homeowners before procurement projects. Differentiator: typically saves the client 20-40% of the quote for a fee that is a small fraction of the savings."
    },
    steps: [
      { ar: "أعدّ قائمة أسئلة المراجعة القياسية (الاستخدام، الأعداد، الميزانية، النمو)", en: "Prepare the standard review questionnaire (usage, counts, budget, growth)" },
      { ar: "ابنِ قاعدة بدائل موثوقة بأسعار السوق الحالية للمعدات الشائعة", en: "Build a trusted alternatives database with current market prices for common gear" },
      { ar: "قدّم أول مراجعتين مجاناً مقابل أرقام وفر موثقة", en: "Offer the first two reviews free in exchange for documented savings numbers" },
      { ar: "بِع المراجعة بسعر ثابت يشمل تقريراً من صفحتين ببدائل محددة", en: "Sell the review at a fixed price including a 2-page report with specific alternatives" },
      { ar: "أضف روابط شراء بالعمولة للمعدات الموصى بها", en: "Add affiliate purchase links for the recommended equipment" }
    ],
  },
  {
    id: "p185",
    title: { ar: "مراجعة الوضع الأمني للعمل عن بعد", en: "Remote-Work Security Posture Review" },
    category: "consulting",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "400-2500$ شهرياً", en: "$400-2500/mo" },
    monetization: { ar: "تدقيق ثابت السعر مع عقد معالجة ومراجعة شهري", en: "Fixed-price review plus a monthly remediation and recheck retainer" },
    skills: ["vpn", "firewall", "security", "documentation"],
    desc: {
      ar: "مراجعة منظمة لوضع العمل عن بعد في الشركة: إعدادات VPN وتغطية المصادقة متعددة العوامل وسياسات تقسيم الأنفاق وحدود أمان المكاتب المنزلية، بنتيجة مصفوفة نضج رقمية. الجمهور المستهدف: شركات من 20-100 موظف. الميزة التنافسية: المخرج تقرير من عشر شرائح بلغة الإدارة العليا لا وثيقة تقنية من مئة صفحة.",
      en: "A structured review of a company's remote setup: VPN configuration, MFA coverage, split-tunnel policy, and home-office baselines — scored on a maturity matrix. Target: 20-100 person companies. Differentiator: the deliverable is a 10-slide, board-language report rather than a hundred-page technical document."
    },
    steps: [
      { ar: "ابنِ مصفوفة النضج (خمسة مجالات بخمسة مستويات) وقالب التقييم", en: "Build the maturity matrix (five domains by five levels) and the assessment template" },
      { ar: "نفّذ مراجعة تجريبية في شركة واحدة بخصم مقابل دراسة حالة", en: "Run a discounted pilot review at one company in exchange for a case study" },
      { ar: "قدّم الخدمة بثلاث باقات (أساسي، كامل مع اختبارات، متابعة ربع سنوية)", en: "Package the service in three tiers (basic, full with tests, quarterly follow-up)" },
      { ar: "سوّق لمدراء تقنية المعلومات عبر حالات انكشاف حقيقية مجهولة المصدر", en: "Market to IT managers using anonymized real exposure cases" },
      { ar: "حوّل قائمة المعالجة إلى عقد متابعة شهري بالتنفيذ المشترك", en: "Convert the remediation list into a monthly co-delivery follow-up retainer" }
    ],
  },
  {
    id: "p186",
    title: { ar: "تدقيق تمديدات مراكز البيانات", en: "Datacenter Cabling Audit" },
    category: "consulting",
    difficulty: 4,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "600-3000$ شهرياً", en: "$600-3000/mo" },
    monetization: { ar: "تسعير بحسب عدد الخزائن مع مشروع إصلاح لاحق اختياري", en: "Per-rack pricing with an optional follow-up remediation project" },
    skills: ["cabling", "labeling", "testing", "documentation", "racking"],
    desc: {
      ar: "تدقيق ميداني بين الممرات: اختبار كل وصلة حرجة والتحقق من التسميات ورسم خريطة فوضى التوصيل وتسليم خطة إصلاح مرتبة بالأولويات. الجمهور المستهدف: مستأجرو مساحات الاستضافة وغرف الخوادم المؤسسية. الميزة التنافسية: ملاحظات الحرارة وتدفق الهواء قبل/بعد التي تتجاهلها أغلب التدقيقات وتثبت أثرها في التبريد.",
      en: "A walk-aisle audit: test every critical link, verify labeling, map patch chaos, and deliver a priority-ranked remediation plan. Target: colocation tenants and enterprise server rooms. Differentiator: before/after thermal and airflow notes most audits skip, proving the cooling impact of the fixes."
    },
    steps: [
      { ar: "جهّز عدة التدقيق (مختبر إسناد، ماسح حراري، قوالب جرد الخزائن)", en: "Assemble the audit kit (certification tester, thermal camera, rack inventory templates)" },
      { ar: "صمّم منهجية التسعير لكل خزانة مع حدود واضحة لما يشمله الفحص", en: "Design the per-rack pricing methodology with clear scope boundaries" },
      { ar: "نفّذ تدقيقاً تجريبياً في غرفة خوادم واحدة بأسعار مخفضة", en: "Run a pilot audit in a single server room at a discounted rate" },
      { ar: "بِع كخدمة متخصصة عبر شبكات إدارة مراكز البيانات ومدراء المرافق", en: "Sell as a specialist service through datacenter management networks and facility managers" },
      { ar: "أضف مشروع إعادة التمديد والتسمية الكامل كمرحلة ثانية", en: "Add the full re-cabling and re-labeling project as phase two" }
    ],
  },
  {
    id: "p187",
    title: { ar: "تدقيق خفض تكاليف الشبكات", en: "Network Cost Optimization Audit" },
    category: "consulting",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "400-2500$ شهرياً", en: "$400-2500/mo" },
    monetization: { ar: "نسبة من الوفر السنوي أو أجر ثابت — أيهما يفضل العميل", en: "Percentage of annual savings or a fixed fee — client's choice" },
    skills: ["monitoring", "qos", "planning", "documentation"],
    desc: {
      ar: "تحليل استخدام النطاق وحاجات QoS وجرد الدوائر لخفض الإنفاق: دمج الخطوط وإلغاء الدوائر الميتة والانتقال المدروس من حلول MPLS إلى الإنترنت. الجمهور المستهدف: الشركات متعددة الفروع. الميزة التنافسية: تُدفع كنسبة من الوفر السنوي المثبت — العميل لا يخسر شيئاً إن لم تحقق وفراً.",
      en: "Analyze bandwidth usage, QoS needs, and circuit inventory to cut spend: consolidate links, kill zombie circuits, and make deliberate MPLS-to-internet moves. Target: multi-branch businesses. Differentiator: paid as a percentage of proven first-year savings — the client risks nothing if no savings materialize."
    },
    steps: [
      { ar: "ابنِ قالب جرد الدوائر ومراقبة الاستخدام لمدة أسبوعين", en: "Build the circuit inventory template and run two weeks of usage monitoring" },
      { ar: "صمّم منهجية تقدير الوفر (دمج، إلغاء، إعادة تفاوض) بأرقام مثبتة", en: "Design the savings-estimate methodology (consolidation, cancellation, renegotiation) with verifiable numbers" },
      { ar: "نفّذ تدقيقاً تجريبياً بلا مخاطرة للعميل مقابل توثيق الوفر", en: "Run a no-risk pilot audit in exchange for documented savings" },
      { ar: "بِع بنموذج نسبة من الوفر مع سقف أقصى واضح", en: "Sell on the percentage-of-savings model with a clear cap" },
      { ar: "أضف مراقبة ربع سنوية تتأكد من استمرار الوفر بعقد رمزي", en: "Add quarterly monitoring confirming savings persist under a small retainer" }
    ],
  },
  {
    id: "p188",
    title: { ar: "خدمة التفاوض مع مزودي الإنترنت", en: "ISP Contract Negotiation Service" },
    category: "consulting",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "عمولة نجاح من نسبة التوفير المتحقق بعد التوقيع", en: "Success fee as a share of realized savings after signing" },
    skills: ["qos", "planning", "monitoring", "documentation"],
    desc: {
      ar: "خدمة تراجع اتفاقيات مستوى الخدمة وتشرح معدلات الالتزام الحقيقية وتوازن الأسعار الإقليمية وتنضم لمكالمات التجديد كمفاوض تقني للعميل. الجمهور المستهدف: الشركات المجددة لعقود خطوط المؤسسات. الميزة التنافسية: توفير مالي حقيقي بصفر جهد من العميل — نموذج عمولة النجاح يسهّل قرار الشراء تماماً.",
      en: "A service reviewing SLAs, decoding committed-rate realities, benchmarking regional pricing, and joining renewal calls as the client's technical negotiator. Target: businesses renewing enterprise circuit contracts. Differentiator: real savings with zero client effort — the success-fee model makes the buying decision trivial."
    },
    steps: [
      { ar: "ابنِ قاعدة معرفة بأسعار وعقود المزودين الإقليميين المحدثة", en: "Build a knowledge base of regional ISP pricing and contract terms, kept current" },
      { ar: "أعدّ نموذج مراجعة العقد (SLA، الغرامات، بنود التجديد، فخاخ المصطلحات)", en: "Prepare the contract review checklist (SLA, penalties, renewal clauses, wording traps)" },
      { ar: "رافق أول تجديدين بعمولة مخفضة مقابل توثيق الوفر كدراسة حالة", en: "Assist the first two renewals at a reduced fee for documented savings case studies" },
      { ar: "بِع بنموذج عمولة النجاح (نسبة محددة من الوفر الأول) مع تقرير قبل التوقيع", en: "Sell on the success-fee model (a fixed share of first-year savings) with a pre-signing report" },
      { ar: "أضف خدمة مراقبة الالتزام بعد التوقيع لضمان تطبيق الشروط", en: "Add post-signing SLA compliance monitoring to guarantee terms are honored" }
    ],
  },

  // ═══ SAAS (p189–p193) ═══
  {
    id: "p189",
    title: { ar: "مراقب تعافي الخطوط المتعددة مع تدريبات", en: "Multi-WAN Failover Monitor & Drill Service" },
    category: "saas",
    difficulty: 5,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "اشتراك شهري لكل موقع مع تقرير تدريب تعافٍ شهري", en: "Per-site monthly subscription with a monthly failover drill report" },
    skills: ["routing", "monitoring", "qos", "api"],
    desc: {
      ar: "لوحة تراقب الخط الأساسي والاحتياطي وتحاكي التبديل شهرياً وتثبت التعافي الحقيقي — بما في ذلك فخاخ مدة بقاء DNS التي تكشف احتياطياً كاذباً. الجمهور المستهدف: الشركات التي اكتشفت أن خطط تعافيها كانت كابلاً واحداً فعلياً. الميزة التنافسية: ميزة تدريب التبديل الشهري تثبت صحة التعافي بالأدلة بدل افتراضه.",
      en: "A dashboard watching primary and backup links, simulating failover monthly, and proving real recovery — including the DNS-TTL traps that expose fake redundancy. Target: companies that discovered their redundancy was effectively one cable. Differentiator: the monthly failover drill feature proves recovery with evidence instead of assumptions."
    },
    steps: [
      { ar: "ابنِ محرك المراقبة المزدوجة (أساسي/احتياطي) مع قياس حقيقي لكل خط", en: "Build the dual-path monitoring engine with real per-link measurement" },
      { ar: "طوّر محاكي التبديل الذي يثبت مسار النجاة ويكشف فخاخ DNS", en: "Develop the failover simulator proving the survival path and exposing DNS traps" },
      { ar: "أطلق مع موقعين تجريبيين مجاناً لبناء تقريرين مرجعيين", en: "Launch with two free pilot sites to build two reference reports" },
      { ar: "بِع اشتراكاً لكل موقع مع تقرير تدريب شهري قابل للعرض للمدققين", en: "Sell a per-site subscription with a monthly drill report suitable for auditors" },
      { ar: "أضف تكامل الإنذار مع قنوات الفريق وتقويد تدقيق سنوي", en: "Add team-channel alert integrations and an annual audit export" }
    ],
  },
  {
    id: "p190",
    title: { ar: "مولّد تقارير الخرائط الحرارية للواي فاي", en: "Wi-Fi Heatmap Report Generator" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "رصيد تقارير مسبق الدفع أو خطة شهرية غير محدودة", en: "Prepaid report credits or an unlimited monthly plan" },
    skills: ["wifi", "site-survey", "documentation", "api"],
    desc: {
      ar: "خدمة تستقبل بيانات المسح الميداني وتولد تقرير PDF جاهزاً للعميل بعلامة تجارية وخرائط حرارية لخطة المبنى وتوصيات مرتبة. الجمهور المستهدف: المقاولون الصغار الذين يكرهون إعداد التقارير أكثر من العمل الميداني نفسه. الميزة التنافسية: تحول أربع ساعات من عمل التقرير إلى عشر دقائق — توفير يسهل حساب قيمته.",
      en: "A service that ingests field survey data and generates a client-ready branded PDF with floor-plan heatmaps and ranked recommendations. Target: small integrators who hate report-making more than the fieldwork itself. Differentiator: it turns 4 hours of report work into 10 minutes — an easy-to-quantify saving."
    },
    steps: [
      { ar: "ابنِ خط معالجة البيانات (رفع، تنظيف، ربط بالمخطط المرفوع)", en: "Build the data pipeline (upload, cleaning, binding to the uploaded floor plan)" },
      { ar: "صمّم قالب التقرير الجذاب بعناصر قابلة لعلامة العميل", en: "Design the attractive report template with client-brandable elements" },
      { ar: "أطلق نظام الرصيد (تقرير واحد بسعر رمزي) لاختبار الجودة", en: "Launch a credit system (one report at a token price) to test quality" },
      { ar: "بِع الخطة الشهرية غير المحدودة للمقاولين النشطين", en: "Sell the unlimited monthly plan to active installers" },
      { ar: "أضف واجهة برمجية لأدوات المسح الشهيرة لرفع تلقائي", en: "Add an API for popular survey tools enabling automatic uploads" }
    ],
  },
  {
    id: "p191",
    title: { ar: "حارس انتهاء الشهادات للوكالات", en: "TLS Expiry Sentinel for Agencies" },
    category: "saas",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "150-1000$ شهرياً", en: "$150-1000/mo" },
    monetization: { ar: "خطط متدرجة بحسب عدد النطاقات مع خطة وكالات", en: "Tiered plans by domain count plus an agency plan" },
    skills: ["tls", "monitoring", "api", "automation"],
    desc: {
      ar: "مراقبة شهادات كل نطاقات عملاء الوكالة مع تنبيهات تصاعدية تصل للشخص الصحيح قبل يوم الانتهاء بوقت كافٍ. الجمهور المستهدف: الوكالات التي تدير 20-500 موقعاً. الميزة التنافسية: فحص سلسلة الشهادة يلتقط التجديد الناقص الذي يجتاز اختبارات الانتهاء البسيطة ثم يسقط الموقع.",
      en: "Certificate monitoring across all the agency's client domains with escalating alerts reaching the right person well before expiry day. Target: agencies managing 20-500 sites. Differentiator: chain validation catches the incomplete renewal that passes simple expiry checks and then takes the site down."
    },
    steps: [
      { ar: "ابنِ فاحص الشهادات بسلسلة كاملة من عدة نقاط قياس", en: "Build the full-chain cert checker running from multiple vantage points" },
      { ar: "نفّذ منطق التنبيه التصاعدي (14 يوماً ثم 7 ثم 3 ثم يوم)", en: "Implement escalating alert logic (14 days, 7, 3, then day-of)" },
      { ar: "أطلق مجاناً لعشرة نطاقات لجمع الوكالات الصغيرة", en: "Launch free for 10 domains to gather small agencies" },
      { ar: "بِع خطط العدد مع لوحة مجمعة لكل العملاء في شاشة واحدة", en: "Sell count-based plans with an all-clients overview in one screen" },
      { ar: "أضف تقريراً شهرياً بصيغة قابلة للإرسال لعملاء الوكالة", en: "Add a monthly client-ready summary report" }
    ],
  },
  {
    id: "p192",
    title: { ar: "خزانة النسخ الاحتياطي لإعدادات الشبكات", en: "Network Config Backup Vault" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "اشتراك بحسب عدد الأجهزة مع ملحق تقارير الامتثال", en: "Per-device subscription plus a compliance report add-on" },
    skills: ["automation", "git", "cli", "encryption"],
    desc: {
      ar: "نسخ احتياطي مجدول ومشفّر للإعدادات من المبدّلات والموجهات وجدران الحماية مع اختبار استعادة دوري وتصدير امتثال. الجمهور المستهدف: الشركات الصغيرة بلا انتظام في حفظ الإعدادات. الميزة التنافسية: تقارير تدريب الاستعادة الربع سنوية تثبت أن النسخ تعمل فعلاً — الفارق بين أرشيف ميت وخطة إنقاذ حقيقية.",
      en: "Encrypted scheduled config backups from switches, routers, and firewalls with periodic restore testing and a compliance export. Target: SMBs with no config discipline. Differentiator: quarterly restore-drill reports prove the backups actually work — the difference between a dead archive and a real recovery plan."
    },
    steps: [
      { ar: "ابنِ محرك السحب المشفر من أجهزة Cisco وMikroTik أولاً", en: "Build the encrypted pull engine for Cisco and MikroTik devices first" },
      { ar: "أضف تخزيناً بإصدارات Git مؤرشفة مع صلاحيات دقيقة", en: "Add versioned Git-backed storage with fine-grained permissions" },
      { ar: "نفّذ تدريب الاستعادة الآلي الربع سنوي مع تقرير نتيجة", en: "Implement the automated quarterly restore drill with a result report" },
      { ar: "أطلق خطة لكل جهاز مع حد أدنى عشرة أجهزة للشركات", en: "Launch the per-device plan with a 10-device minimum for businesses" },
      { ar: "أضف ملحق تقارير الامتثال لجهات التدقيق الخارجية", en: "Add the compliance report add-on for external auditors" }
    ],
  },
  {
    id: "p193",
    title: { ar: "ماسح جرد الشبكات الآلي", en: "Automated Network Inventory Scanner" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "خطط بحسب عدد الشبكات المراقبة مع تصدير للفوترة", en: "Plans by monitored subnet count with billing exports" },
    skills: ["snmp", "automation", "documentation", "api"],
    desc: {
      ar: "اكتشاف بلا وكلاء للمبدّلات ونقاط الوصول والنقاط الطرفية (SNMP وLLDP وCDP) يبني جرداً حياً بتنبيهات التغيّر عند دخول جهاز جديد أو اختفاء آخر. الجمهور المستهدف: مزودو الخدمات المدارة الذين يفوترون بحسب الأصول المدارة. الميزة التنافسية: الجرد يغذي نظام الفوترة مباشرة — الأداة تسدد كلفتها من ضبط الفواتير وحده.",
      en: "Agentless discovery of switches, APs, and endpoints (SNMP, LLDP, CDP) building a live inventory with change alerts when a device appears or disappears. Target: MSPs billing per managed asset. Differentiator: the inventory feeds the billing system directly — the tool pays for itself on invoice accuracy alone."
    },
    steps: [
      { ar: "ابنِ محرك الاكتشاف متعدد البروتوكولات مع جدولة قابلة للضبط", en: "Build the multi-protocol discovery engine with adjustable scheduling" },
      { ar: "أضف مصالحة التغيّر (جديد/مفقود/منقول) مع تنبيهات فورية", en: "Add change reconciliation (new/missing/moved) with instant alerts" },
      { ar: "أطلق نسخة مجانية لشبكة واحدة لجمع ملاحظات الفرق", en: "Launch a free single-network tier to gather team feedback" },
      { ar: "بِع خطط الشبكات المتعددة مع تصدير CSV/XML للفوترة", en: "Sell multi-network plans with CSV/XML billing exports" },
      { ar: "أضف تكاملاً مع أدوات الفوترة الشهيرة لمزودي الخدمات", en: "Add integrations with popular MSP billing tools" }
    ],
  },

  // ═══ EDUCATION (p194–p197) ═══
  {
    id: "p194",
    title: { ar: "دورة أتمتة الشبكات لفرق التشغيل", en: "Network Automation Course for Ops Teams" },
    category: "education",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "500-3000$ شهرياً", en: "$500-3000/mo" },
    monetization: { ar: "ترخيص للفرق داخل الشركة ودفعات مفتوحة للجمهور العام", en: "In-company team licenses plus public open-enrollment cohorts" },
    skills: ["python", "ansible", "git", "api", "automation"],
    desc: {
      ar: "دورة مدمجة لخمسة أسابيع يؤتمت فيها فريق التشغيل مهامه الأسبوعية الحقيقية: نسخ الإعدادات وفحوص الامتثال وتوليد التقارير. الجمهور المستهدف: الشركات التي يغرق مهندسوها في العمل المتكرر. الميزة التنافسية: واجبات الدورة هي عمل الفريق الفعلي — العائد على الاستثمار يظهر في الأسبوع الثاني لا بعد شهور.",
      en: "A 5-week blended course where an ops team automates its real weekly tasks: config backups, compliance checks, and report generation. Target: companies whose engineers drown in repetitive work. Differentiator: the course homework is their actual job — ROI shows up in week two, not months later."
    },
    steps: [
      { ar: "اجرد المهام المتكررة الأكثر استهلاكاً للوقت في فريق تقني نموذجي", en: "Inventory the most time-consuming repetitive tasks in a typical ops team" },
      { ar: "ابنِ مسار الدورة حول ثلاث مهام حقيقية بالتوازي مع مواده النظرية", en: "Build the course path around three real tasks in parallel with its theory" },
      { ar: "قدّم نسخة تجريبية لفريق واحد بخصم مقابل قياس ساعات التوفير", en: "Offer a discounted pilot to one team in exchange for hours-saved measurements" },
      { ar: "بِع ترخيص الفريق (حتى 12 مشاركاً) مع شهادة إتمام لكل واحد", en: "Sell the team license (up to 12 seats) with a completion certificate each" },
      { ar: "أطلق دفعة عامة مفتوحة تملأ المقاعد بين عقود الشركات", en: "Launch an open public cohort filling seats between company contracts" }
    ],
  },
  {
    id: "p195",
    title: { ar: "دورة تأهيل موظفي NOC لمزودي الخدمة", en: "ISP NOC Onboarding Course" },
    category: "education",
    difficulty: 3,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "400-2500$ شهرياً", en: "$400-2500/mo" },
    monetization: { ar: "بيع مقاعد B2B مع رسوم تخصيص المحتوى لكل مزود", en: "B2B per-seat sales plus a content customization fee per ISP" },
    skills: ["bgp", "monitoring", "troubleshooting", "ospf"],
    desc: {
      ar: "دورة أسبوعين للموظفين الجدد في مراكز عمليات مزودي الإنترنت: قراءة جداول BGP وفرز التذاكر وقواعد التصعيد وإدارة نوافذ الصيانة. الجمهور المستهدف: المزودون الإقليميون المتعبون من ستة أشهر تأهيل لكل موظف. الميزة التنافسية: مبنية من حالات حقيقية مجهولة المصدر من حوادث NOC فعلية لا تمارين مصطنعة.",
      en: "A 2-week course for new ISP NOC hires: reading BGP tables, ticket triage, escalation rules, and maintenance-window management. Target: regional ISPs tired of a 6-month ramp-up per hire. Differentiator: built from anonymized real NOC incident cases rather than artificial exercises."
    },
    steps: [
      { ar: "اجمع حالات حوادث مجهولة المصدر من مهندسي NOC سابقين وحاليين", en: "Collect anonymized incident cases from former and current NOC engineers" },
      { ar: "ابنِ مسار الأسبوعين (يوم قراءة الشبكة، يوم فرز، يوم BGP، يوم صيانة)", en: "Build the 2-week path (network reading day, triage day, BGP day, maintenance day)" },
      { ar: "قدّم نسخة تجريبية لشركة واحدة مقابل شهادة توصية وأرقام زمن التأهيل", en: "Offer a pilot to one ISP in exchange for a reference and ramp-time numbers" },
      { ar: "بِع المقاعد للشركات مع خيار تخصيص الأمثلة على أجهزتها الفعلية", en: "Sell corporate seats with an option to customize examples to their actual gear" },
      { ar: "أضف مستوى متقدماً لقادة الورديات كمسار تلافي", en: "Add an advanced tier for shift leads as a follow-on track" }
    ],
  },
  {
    id: "p196",
    title: { ar: "معسكر إنترنت للأطفال عن بعد", en: "Online Networking Summer Camp for Kids" },
    category: "education",
    difficulty: 2,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "تذاكر المعسكر وبرامج إجازات المدارس المرخصة", en: "Camp tickets plus licensed school holiday programs" },
    skills: ["wifi", "ip-addressing", "dns"],
    desc: {
      ar: "معسكر إنترنت لمدة أسبوعين بساعة يومياً: يبني الأطفال إنترنتاً افتراضياً من جزرهم الخاصة في Packet Tracer ويكسبون شارات الإنجاز. الجمهور المستهدف: أطفال الفئة 10-14 فضوليون مع أولياء أمورهم. الميزة التنافسية: لعب قائم على مهمات لا محاضرات — والأهالي يتلقون تقريراً مصوراً يومياً بما تعلم أطفالهم.",
      en: "A 2-week, one-hour-a-day online camp: kids build a virtual internet of their own islands in Packet Tracer and earn achievement badges. Target: curious 10-14 year-olds and their parents. Differentiator: mission-based play instead of lectures — and parents get a daily photo report of what their child actually learned."
    },
    steps: [
      { ar: "صمّم قصة الجزر الافتراضية بعشر مهمات متدرجة ملائمة للفئة العمرية", en: "Design the virtual islands storyline with 10 age-appropriate graded missions" },
      { ar: "جهّز قاعة البث وأدوات المتابعة ونظام الشارات", en: "Prepare the streaming classroom, follow-up tooling, and badge system" },
      { ar: "أطلق معسكراً تجريبياً صغيراً (10 أطفال) بأسعار مخفضة", en: "Launch a small pilot camp (10 kids) at a discounted rate" },
      { ar: "بِع تذاكر المعسكر الكامل مع مواد جاهزة للطباعة المنزلية", en: "Sell full camp tickets with home-printable materials included" },
      { ar: "رخص البرنامج لمدارس ترغب بتشغيله في إجازاتها بنفسها", en: "License the program to schools wanting to run it during their own holidays" }
    ],
  },
  {
    id: "p197",
    title: { ar: "دورات مايكرو لخرائط الشهادات المهنية", en: "Certification Roadmap Micro-Courses" },
    category: "education",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-1000$ شهرياً", en: "$150-1000/mo" },
    monetization: { ar: "بيع كل مسار منفرداً أو الحزمة الكاملة بسعر مخفض", en: "Sell each path separately or the full bundle at a discount" },
    skills: ["routing", "security", "automation", "cloud"],
    desc: {
      ar: "دورات قرار من 45 دقيقة لكل مسار شهادات (من CCNA إلى DevNet، مسارات الأمان، شبكات السحابة) بتكلفة ووقت وملاحظات سوق العمل لكل منطقة. الجمهور المستهدف: المحتارون في تحويل مسارهم المهني. الميزة التنافسية: حساب عائد استثمار صادق يشمل الشهادات التي لا تستحق فعلاً — الشفافية التي لا يقدمها بائعو الدورات.",
      en: "45-minute decision courses per certification path (CCNA to DevNet, security tracks, cloud networking) with cost, time, and regional job-market notes. Target: confused career-switchers. Differentiator: honest ROI math that includes the certifications genuinely not worth it — transparency course sellers never offer."
    },
    steps: [
      { ar: "ابحث ثلاثة مسارات شهادات بالرواتب الإقليمية وأزمنة الدراسة الفعلية", en: "Research three certification paths with regional salaries and actual study times" },
      { ar: "أنتج أول دورة قرار بحسابات عائد واضحة وتوصية صريحة", en: "Produce the first decision course with clear ROI math and a blunt recommendation" },
      { ar: "أطلقها بسعر رمزي لتقيس الطلب والتعليقات", en: "Launch at a token price to test demand and reviews" },
      { ar: "وسّع أربعة مسارات إضافية بحسب أسئلة المتابعين الأكثر شيوعاً", en: "Expand to four more paths based on the most frequent follower questions" },
      { ar: "بِع الحزمة الكاملة بخصم مع تحديث سنوي للأسعار والأسواق", en: "Sell the full bundle discounted with an annual price and market refresh" }
    ],
  },

  // ═══ LAB (p198–p200) ═══
  {
    id: "p198",
    title: { ar: "حزمة مختبرات MPLS وL3VPN", en: "MPLS & L3VPN Lab Bundle" },
    category: "lab",
    difficulty: 4,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "250-1500$ شهرياً", en: "$250-1500/mo" },
    monetization: { ar: "بيع الحزمة مع دفعة إرشاد جماعية كترقية", en: "Bundle sales with a group mentored cohort as an upsell" },
    skills: ["mpls", "bgp", "routing", "qos"],
    desc: {
      ar: "18 مختبراً تبني خدمات MPLS L3VPN من الصفر: العناوين وVRF وتوجيه PE-CE وQoS، مع تحقق آلي وتدريبات أعطال في كل مختبر. الجمهور المستهدف: المهندسون الملتحقون بشركات النقل ومزودي الخدمة. الميزة التنافسية: نصوص الإخراج المتوقعة تحفظ تقدمك — تعرف دائماً ما يجب أن تراه على الشاشة بعد كل أمر.",
      en: "18 labs building MPLS L3VPN services from scratch: labels, VRFs, PE-CE routing, and QoS, with auto-verification and failure drills in every lab. Target: engineers joining carriers and service providers. Differentiator: expected-output transcripts keep you oriented — you always know exactly what your screen should show after each command."
    },
    steps: [
      { ar: "ابنِ مختبر التأسيس الأول (موجهات PE وP بأساس IGP) مع نص الإخراج", en: "Build the first foundational lab (PE and P routers over an IGP underlay) with the output transcript" },
      { ar: "أضف سلسلة VRF وتوجيه PE-CE مع سكربتات تحقق آلية", en: "Add the VRF and PE-CE routing series with automated verification scripts" },
      { ar: "صمّم تدريبات الأعطال (علامة ساقطة، مسار مسدود) لكل قسم", en: "Design failure drills (dropped label, blackholed path) for every section" },
      { ar: "أطلق الحزمة عبر متجر رقمي مع مختبرين مجانيين كعينة", en: "Launch the bundle in a digital store with two free sample labs" },
      { ar: "أضف دفعة إرشاد جماعية شهرية للمشترين الراغبين بمراجعة أعمق", en: "Add a monthly group-coaching session for buyers wanting deeper review" }
    ],
  },
  {
    id: "p199",
    title: { ar: "مختبرات شبكات Kubernetes", en: "Kubernetes Networking Labs" },
    category: "lab",
    difficulty: 4,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "حزمة مختبرات مع ورش عمل مدفوعة للفرق", en: "Lab pack plus paid team workshops" },
    skills: ["kubernetes", "docker", "dns", "linux", "routing"],
    desc: {
      ar: "15 مختبراً عملياً: من شبكات الحاويات إلى إضافات CNI والخدمات وIngress وسياسات الشبكة وتشخيص المشكلات بtcpdump داخل العنقود. الجمهور المستهدف: مهندسو الشبكات المتحولون لفرق المنصات. الميزة التنافسية: ترتيب المنظور الشبكي أولاً — الزاوية التي تفتقدها دورات Kubernetes الموجهة للمطورين.",
      en: "15 hands-on labs: from container networking to CNI plugins, Services, Ingress, NetworkPolicies, and debugging with tcpdump inside the cluster. Target: network engineers moving to platform teams. Differentiator: networking-first ordering — the angle developer-oriented Kubernetes courses miss."
    },
    steps: [
      { ar: "ابنِ بيئة المختبر المرجعية على جهاز واحد بسكربت تهيئة واحد", en: "Build the reference lab environment on a single machine with one bootstrap script" },
      { ar: "ألّف السلسلة من شبكة الحاوية حتى تشخيص الفشل بترتيب الشبكات أولاً", en: "Write the series from container networking to failure debugging in networking-first order" },
      { ar: "أضف سيناريوهات تشخيص معطلة (خدمة غير ظاهرة، سياسة قاطعة) بلا حلول معلنة", en: "Add broken troubleshooting scenarios (invisible service, blocking policy) with hidden solutions" },
      { ar: "أطلق الحزمة مع مختبر مجاني واحد في متجر رقمي", en: "Launch the pack with one free lab in a digital store" },
      { ar: "قدّم ورشة فريق لمدة يوم تبنى على الحزمة كمنتج ثانٍ عالي الهامش", en: "Offer a one-day team workshop built on the pack as a second high-margin product" }
    ],
  },
  {
    id: "p200",
    title: { ar: "مختبرات تشريح الحوادث العكسية", en: "Incident Postmortem Reverse Labs" },
    category: "lab",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "بيع الحزمة مع خدمة مراجعة تحليلاتك المكتوبة كإضافة", en: "Pack sales plus a written-analysis review add-on" },
    skills: ["troubleshooting", "packet-analysis", "monitoring", "documentation"],
    desc: {
      ar: "مختبرات مبنية على انقطاعات حقيقية مجهولة المصدر: تحصل على الخط الزمني والسجلات والتقاطات الحزم — ومهمتك إيجاد السبب الجذري وكتابة تقرير ما بعد الحادث. الجمهور المستهدف: المهندسون الكبار والمهتمون بأدوار موثوقية الأنظمة. الميزة التنافسية: كتابتك تُراجَع مقابل التحليل الحقيقي للسبب — تجربة قاسية ومثقفة تعلمك مهارة التقارير النادرة.",
      en: "Labs built on anonymized real outages: you receive the timeline, logs, and packet captures — your job is to find root cause and write the postmortem. Target: senior engineers and SRE-curious practitioners. Differentiator: your write-up is graded against the real root-cause analysis — a brutally instructive exercise in the rare skill of incident writing."
    },
    steps: [
      { ar: "اجمع ثلاث حوادث حقيقية موثقة وحوّلها إلى مختبرات بمخرجات مجهولة النتيجة", en: "Collect three well-documented real incidents and convert them into labs with the outcome hidden" },
      { ar: "جهّز حزمة الأدلة (سجلات، التقاطات، خط زمني، تذاكر الدعم) لكل حالة", en: "Prepare the evidence pack (logs, captures, timeline, support tickets) per case" },
      { ar: "صمّم قالب كتابة تقرير ما بعد الحادث الذي يتبعه المتعلم", en: "Design the postmortem report template learners follow" },
      { ar: "أطلق الحزمة الثلاثية مع عينة مجانية واحدة", en: "Launch the three-case bundle with one free sample" },
      { ar: "أضف خدمة مراجعة كتابات المتعلمين بتغذية راجعة تفصيلية كمستوى مدفوع", en: "Add a written-work review service with detailed feedback as a paid tier" }
    ],
  },
];
