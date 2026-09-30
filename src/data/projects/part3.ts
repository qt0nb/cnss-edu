import type { ProjectIdea } from "@/lib/types";

// ─── Projects p101–p150 (Part 3) ─────────────────────────────────────────
// Distribution: hardware 10, saas 10, education 8, freelance 8, lab 7, templates 7

export const PROJECTS_PART3: ProjectIdea[] = [
  // ═══ HARDWARE (p101–p110) ═══
  {
    id: "p101",
    title: { ar: "طقم مختبر شبكات محمول للطلاب", en: "Portable Student Network Lab Kit" },
    category: "hardware",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "400-2000$ شهرياً", en: "$400-2000/mo" },
    monetization: { ar: "بيع الطقم عبر متجر إلكتروني مع كتيّب مختبرات مطبوع ودعم رقمي", en: "Sell the kit via an online store with a printed lab workbook and digital support" },
    skills: ["switching", "vlans", "routing", "cabling"],
    desc: {
      ar: "طقم مدمج داخل حقيبة صغيرة يضم مبدّلاً مُداراً بخمسة منافذ وراوترين صغيرين وأسلاكاً مجهزة مسبقاً وسلك وحدة تحكم، مع كتيّب مطبوع من 12 مختبراً موجهاً. الجمهور المستهدف هم طلاب CCNA الذين لا يستطيعون تحمّل تكلفة راك منزلي كامل. الميزة التنافسية أن كل شيء يعمل من بنك طاقة واحد، وأن كل مختبر في الكتيّب مرتبط مباشرة بهدف من أهداف الامتحان.",
      en: "A compact pouch kit: a 5-port managed switch, two mini routers, pre-made cables, a console cable, and a printed workbook of 12 guided labs. Target: CCNA students who cannot afford a full home rack. Differentiator: everything runs off one power bank, and every lab in the workbook maps directly to a specific exam objective."
    },
    steps: [
      { ar: "اجرد أسعار الجملة للمكوّنات (مبدّل مُدار صغير + راوتران + أسلاك ووحدة تحكم) واستهدف هامش ربح لا يقل عن 40%", en: "Source wholesale pricing for components (small managed switch + two routers + cables and console adapter) and target at least a 40% margin" },
      { ar: "ألّف 12 مختبراً متدرجاً بحيث يحل كل مختبر هدفاً محدداً من أهداف الامتحان، ثم اطبع الكتيّب", en: "Author 12 progressive labs where each lab solves a specific exam objective, then print the workbook" },
      { ar: "جمّع 5 نماذج أولية وجرّبها مع مجموعة صغيرة من الطلاب مع تسجيل زمن إنجاز كل مختبر", en: "Assemble 5 prototype kits and pilot them with a small student group while timing each lab" },
      { ar: "أطلق الطقم في متجرك مع فيديو عرض مدته 90 ثانية وصفحة أسئلة شائعة ومقارنة سعرية مع الراك المنزلي", en: "Launch the kit on your store with a 90-second demo video, an FAQ page, and a price comparison vs a home rack" },
      { ar: "أضف نسخة رقمية من الكتيّب كمنتج مستقل واربطها كترقية عند شراء الطقم", en: "Release the workbook as a standalone digital product and bundle it as an upsell with the kit" }
    ],
  },
  {
    id: "p102",
    title: { ar: "طقم مراقبة بيئة Wi-Fi بلوحة ESP32", en: "ESP32 Wi-Fi Environment Monitor Kit" },
    category: "hardware",
    difficulty: 3,
    timeToMarket: { ar: "شهر ونصف", en: "6 weeks" },
    revenue: { ar: "250-1500$ شهرياً", en: "$250-1500/mo" },
    monetization: { ar: "بيع الطقم للهواة مع نسخة مجمّعة مسبقاً ومحدّثة بسعر أعلى لغير التقنيين", en: "Kit sales to hobbyists plus a pre-assembled premium edition for non-technical buyers" },
    skills: ["esp32", "iot", "mqtt", "monitoring", "wifi"],
    desc: {
      ar: "طقم تعليمي قابل للتجميع مبني على لوحة ESP32 مع حساسات حرارة ورطوبة وعلبة مطبوعة ثلاثية الأبعاد، يرسل قياسات الغرفة عبر MQTT إلى Home Assistant أو أي لوحة ويب. يتعلم المشتري منه برمجة اللوحة وبروتوكول MQTT وبناء لوحات المراقبة خطوة بخطوة عبر دليل مصور بالعربية والإنجليزية. الجمهور المستهدف: هواة المنازل الذكية وطلاب دورات إنترنت الأشياء.",
      en: "A build-it-yourself kit around an ESP32 with temperature and humidity sensors and a 3D-printed case, publishing room telemetry over MQTT to Home Assistant or any web dashboard. Buyers learn firmware flashing, MQTT, and dashboard building step by step from a fully illustrated Arabic/English guide. Target: smart-home hobbyists and IoT course students."
    },
    steps: [
      { ar: "ابنِ النموذج الأول على لوحة تجارب ووثّق كل خطوة بصور عالية الجودة للدليل", en: "Build the prototype on a breadboard and document every step with high-quality photos for the guide" },
      { ar: "صمّم العلبة واطبعها، ثم اطلب مكوّنات عشرين طقماً بالجملة لتقليل تكلفة الوحدة", en: "Design and print the case, then order components in bulk for 20 kits to cut unit cost" },
      { ar: "وزّع خمسة طقوم على هواة مقابل تقييمات صادقة وملاحظات على وضوح الدليل", en: "Give 5 kits to hobbyists in exchange for honest reviews and feedback on guide clarity" },
      { ar: "أطلق الطقم في متجر إلكتروني مع نسخة مجهزة مسبقاً وبرامج مثبتة بسعر أعلى", en: "Launch in your store alongside a higher-priced pre-flashed edition for non-technical buyers" },
      { ar: "أضف وحدات حساسات إضافية (دخان، حركة، جودة هواء) كترقيات مدفوعة تشجّع الشراء المتكرر", en: "Add extra sensor modules (smoke, motion, air quality) as paid upgrades that drive repeat purchases" }
    ],
  },
  {
    id: "p103",
    title: { ar: "طقم تدريب إنهاء الكابلات مع تحدٍّ مُقيس", en: "Cable Termination Trainer Kit" },
    category: "hardware",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "بيع لمرة واحدة عبر Etsy مع أكياس تعبئة أسلاك كمنتجات متكررة", en: "One-time sales on Etsy with cable refill packs as recurring products" },
    skills: ["cabling", "ethernet", "testing", "troubleshooting"],
    desc: {
      ar: "طقم تدريب عملي على إنهاء الكابلات يحتوي مختبراً جيبياً وأداة تعريق ومقابس RJ45 ووحدات توصيل جدارية و100 طرف سلك للتدريب، مع بطاقة تحدٍّ مُقيسة: أنهِ عشرة كابلات في عشر دقائق دون أي فشل. موجّه للفنيين المبتدئين ومن يستعدون لمقابلات عمل ميدانية. التميّز أن التمرين الممل يتحول إلى تحدٍّ مُقيس يجعلك جاهزاً فعلياً ليوم العمل الأول.",
      en: "A hands-on cable termination trainer: a pocket tester, punch-down tool, RJ45 plugs, keystone jacks, and 100 practice cable ends, plus a scored challenge card — terminate 10 cables in 10 minutes with zero fails. Target: entry-level technicians prepping for field interviews. Differentiator: dull practice becomes a measured challenge that makes you genuinely day-one ready."
    },
    steps: [
      { ar: "حدد قائمة المكوّنات النهائية واختبرها بنفسك حتى تتقن التمرين في الوقت المستهدف", en: "Finalize the component list and practice until you personally beat the target challenge time" },
      { ar: "صمّم بطاقة التحدّي مع معايير التقييم (زمن، فحص المختبر، جمالية التعريق)", en: "Design the challenge card with scoring criteria (time, tester verification, clean terminations)" },
      { ar: "أطلق الطقم في متجر Etsy مع فيديو قصير يعرض شخصاً ينجز التحدي أمام الكاميرا", en: "Launch on Etsy with a short video of someone actually beating the challenge on camera" },
      { ar: "أضف أكياس تعبئة بـ100 طرف سلم كمنتج شراء متكرر بعد استهلاك الطقم الأول", en: "Add 100-end refill packs as a repeat purchase once customers exhaust their first kit" },
      { ar: "قدّم نسخة مدرّبين للمعاهد المهنية بسعر أعلى مع 10 بطاقات تحدٍّ إضافية", en: "Offer a trainer edition for vocational institutes at a higher price with 10 extra challenge cards" }
    ],
  },
  {
    id: "p104",
    title: { ar: "طقم تركيب كاميرات PoE للمبتدئين", en: "PoE Camera Install Starter Kit" },
    category: "hardware",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "500-2000$ شهرياً", en: "$500-2000/mo" },
    monetization: { ar: "بيع الطقم ثم عرض خدمة التركيب والتشغيل للعملاء أنفسهم", en: "Kit sales followed by installation-service upsell to the same buyers" },
    skills: ["poe", "cabling", "vlans", "troubleshooting"],
    desc: {
      ar: "طقم جاهز للميدان يضم مبدّل PoE بأربعة منافذ وكاميرتين وكابل Cat6 مجهازاً مسبقاً مع حوامل التثبيت، بالإضافة إلى مخطط انسيابي مطبوع ومقوّى يغطي تهيئة VLAN والعناوين الثابتة وإعداد مسجل الفيديو. الجمهور: المركّبون الصغار الذين يبدؤون نشاطاً جانبياً في كاميرات المراقبة. الميزة التنافسية أن المخطط الانسيابي يمنع 90% من أخطاء التركيب الأول.",
      en: "A field-ready kit: a 4-port PoE switch, two cameras, pre-terminated Cat6, mounting hardware, plus a laminated install flowchart covering VLAN setup, static IPs, and NVR configuration. Target: small installers starting a CCTV side business. Differentiator: the flowchart prevents 90% of first-install mistakes."
    },
    steps: [
      { ar: "اختبر توافق كل المكوّنات معاً في تركيبة واحدة موثّقة بالكامل (مبدّل + كاميرات + مسجل)", en: "Verify all components work together in one fully documented combo (switch + cameras + recorder)" },
      { ar: "ألّف المخطط الانسيابي المقوّى من خطوة فحص الشبكة حتى التسليم النهائي مع نقاط فحص مرقّمة", en: "Author the laminated flowchart from network check to final handover with numbered checkpoints" },
      { ar: "بِع الطقم مع فيديو تثبيت خطوة بخطوة ودعم واتساب لمدة 30 يوماً كقيمة مضافة", en: "Sell the kit with a step-by-step install video and 30 days of WhatsApp support as added value" },
      { ar: "أطلق حملة استهداف لمجموعات المركّبين الصغار على فيسبوك وتيليجرام", en: "Run targeting campaigns in small-installer groups on Facebook and Telegram" },
      { ar: "اضف خدمة تركيب بعمولة عبر شبكة مركّبين محليين تستقبل الطلبات من عملائك", en: "Add an install service via a local installer referral network that takes overflow jobs from your buyers" }
    ],
  },
  {
    id: "p105",
    title: { ar: "مصباح مؤشر قوة الواي فاي للمكتب", en: "Wi-Fi Signal Indicator Lamp" },
    category: "hardware",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-800$ شهرياً", en: "$150-800/mo" },
    monetization: { ar: "بيع وحدات مجهزة مع ملف الطباعة ثلاثية الأبعاد المجاني لصنّاع المحتوى", en: "Sell assembled units plus free 3D-print files for makers" },
    skills: ["wifi", "esp32", "iot", "monitoring"],
    desc: {
      ar: "مصباح مكتبي أنيق يعتمد على ESP32 يتوهج بالأخضر أو الكهرماني أو الأحمر بحسب قوة إشارة شبكتك الحالية المقاسة لحظياً. الجمهور المستهدف: العاملون من المنازل والطلاب الذين يريدون إدراكاً محيطاً لجودة الشبكة دون فحص دائم. الميزة أنه منتج هدية جذاب يثير الحديث ويباع في مواسم التخرج والأعياد.",
      en: "An elegant desk lamp built on ESP32 that glows green, amber, or red based on the live measured signal strength of your Wi-Fi. Target: home-office workers and students who want ambient awareness of link quality without constantly checking. Differentiator: a giftable conversation-starter product with seasonal spikes."
    },
    steps: [
      { ar: "ابنِ نموذجاً أولياً يقيس RSSI كل 5 ثوانٍ ويحرّك شريط LED بحسب ثلاث عتبات معايرة", en: "Build a prototype that samples RSSI every 5 seconds and drives an LED strip through three calibrated thresholds" },
      { ar: "صمّم غلافاً مطبوعاً ثلاثياً يبدو كمنتج منزلي لا كمشروع إلكتروني", en: "Design a 3D-printed enclosure that looks like a home product, not an electronics project" },
      { ar: "أطلق حملة تمويل جماعي صغيرة أو بيع مباشر بـ30 وحدة لاختبار الطلب", en: "Run a small crowdfunding campaign or a direct 30-unit presale to test demand" },
      { ar: "انشر ملف الطباعة والبرمجيات مفتوحة المصدر لبناء جمهور الصنّاع وتحويله لمبيعات الوحدات المجهزة", en: "Publish the print files and open firmware to build a maker audience that converts to assembled-unit sales" },
      { ar: "أضف إصداراً مكتبياً متعدد الشبكات لفرق العمل الصغيرة كنسخة أغلى", en: "Add a multi-SSID office edition for small teams as a higher-priced variant" }
    ],
  },
  {
    id: "p106",
    title: { ar: "جهاز حالة الشبكة المكتبي بشاشة حبر إلكتروني", en: "Network Status Desk Gadget" },
    category: "hardware",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "300-1500$ شهرياً", en: "$300-1500/mo" },
    monetization: { ar: "بيع الجهاز مع اشتراك برمجيات متقدم (تنبيهات واجهة برمجية وقنوات مخصصة)", en: "Device sales plus premium firmware subscription (API alerts and custom channels)" },
    skills: ["monitoring", "snmp", "api", "esp32", "linux"],
    desc: {
      ar: "جهاز صغير بشاشة حبر إلكتروني يفحص خوادمك المهمة ويولّد بلاطات خضراء وحمراء لكل خدمة مع عرض عنوان WAN العام وحالة DNS. يُهيّأ عبر واجهة ويب محلية بالكامل دون أي اعتماد على الخدمات السحابية. الجمهور: المستقلون وأصحاب المختبرات المنزلية. التميّز: استهلاك طاقة شبه معدوم وتحديثات تظهر هادئة على المكتب.",
      en: "A small e-ink device that pings your critical hosts and renders green/red tiles per service, plus WAN IP and DNS status. Configured through a fully local web UI with zero cloud dependency. Target: freelancers and homelab owners. Differentiator: near-zero power draw and calm at-a-glance updates on your desk."
    },
    steps: [
      { ar: "ابنِ النموذج الأول على ESP32 مع شاشة e-ink ومحرك فحص ICMP/DNS قابل للجدولة", en: "Build the prototype on ESP32 with an e-ink display and a schedulable ICMP/DNS check engine" },
      { ar: "طوّر واجهة تهيئة ويب محلية تحفظ الأهداف في ذاكرة الجهاز نفسه", en: "Develop a local web config UI that stores targets in on-device memory" },
      { ar: "أنتج دفعة صغيرة (25 وحدة) بعد التحقق من موثوقية أسبوعين متواصلين", en: "Produce a small batch (25 units) after verifying two weeks of continuous reliability" },
      { ar: "بِع عبر متجر متخصص ومجتمعات المختبرات المنزلية مع فيديو عرض صادق للقيود", en: "Sell via a niche store and homelab communities with an honest demo video including limitations" },
      { ar: "أضف مستوى برمجيات مدفوعاً: تنبيهات عبر واجهة برمجية وقنوات واتساب/تلغرام", en: "Add a paid firmware tier: API-based alerts and WhatsApp/Telegram notification channels" }
    ],
  },
  {
    id: "p107",
    title: { ar: "شارة مؤتمرات بماسح قنوات Wi-Fi", en: "Wi-Fi Scanner Conference Badge" },
    category: "hardware",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "250-1200$ شهرياً", en: "$250-1200/mo" },
    monetization: { ar: "طلبات شارات مخصصة بعلامة الشركة للفعاليات التقنية والمؤتمرات", en: "Custom company-branded badge orders for tech events and conferences" },
    skills: ["esp32", "wifi", "security", "cli"],
    desc: {
      ar: "شارة LED مبرمجة بزر واحد يشغّل مسحاً سلبياً لقنوات الطيف وتعرض عدد نقاط الوصول في كل قناة بشكل مرئي فوري. جمهورها: مؤتمرات أمن المعلومات واللقاءات التقنية الإقليمية. الميزة التنافسية: منتج B2B حيث تطلب الشركات نسخاً تحمل شعارها لفعالياتها، فيتحول المنتج الفردي إلى عقود توريد متكررة.",
      en: "A programmable LED badge with one button that triggers a passive channel scan and visually displays AP counts per channel in real time. Target: security conferences and regional tech meetups. Differentiator: a B2B angle — companies order custom-branded runs for their events, turning a gadget into repeat supply contracts."
    },
    steps: [
      { ar: "ابنِ الشارة على ESP32 مع شريط LED وشاشة صغيرة وبرنامج مسح قنوات سلبي آمن قانونياً", en: "Build the badge on ESP32 with an LED strip, tiny display, and a legally-safe passive channel scanner" },
      { ar: "أضف نظام عرض الشعار والاسم قابلاً للبرمجة من ملف إعدادات بسيط", en: "Add a logo and name display system programmable from a simple config file" },
      { ar: "حضر نسخة عرض ووزّعها على متحدثي فعالية تقنية محلية لتوثيق ردة الفعل", en: "Prepare a demo run and hand badges to speakers at a local tech event to capture reactions" },
      { ar: "أنشئ صفحة طلبات B2B بأقل كمية 50 شارة مع خيار طباعة الشعار", en: "Create a B2B order page with a 50-badge minimum and logo-printing option" },
      { ar: "تواصل مع منظمي المؤتمرات الإقليميين وقدم عينة مجانية لعقد اتفاقية توريد سنوية", en: "Pitch regional conference organizers with a free sample to land an annual supply agreement" }
    ],
  },
  {
    id: "p108",
    title: { ar: "حزمة إدارة الكابلات للمختبرات المنزلية", en: "Cable Management Starter Bundle" },
    category: "hardware",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "100-600$ شهرياً", en: "$100-600/mo" },
    monetization: { ar: "بيع الحزمة مع اشتراك تعبئة دوري للمستهلكات (لاصق وتسميات)", en: "Bundle sales plus a consumables refill subscription (ties and labels)" },
    skills: ["cabling", "labeling", "racking"],
    desc: {
      ar: "حزمة منتقاة بعناية تضم لفّات فلكرو وشامات تمشيط الكابلات وربطات ملونة وبطاقة معيار التسمية مطبوعة على صفحة واحدة. الجمهور المستهدف: مبتدئو المختبرات المنزلية والفنيون الجدد. الميزة أن صفحة الراك النظيف المرافقة تنتشر على وسائل التواصل فتسوّق نفسها بنفسها. الحزمة بسيطة لكنها تحل مشكلة يعرفها كل مهندس شبكات دخل غرفة خوادم فوضوية.",
      en: "A carefully curated bundle: velcro rolls, cable combs, colored ties, and a one-page printed labeling standard card. Target: homelab beginners and junior techs. Differentiator: the included clean-rack one-pager gets shared on social media and markets itself. Simple, but it solves a problem every network engineer recognizes the moment they see a messy rack."
    },
    steps: [
      { ar: "اجرد مورّداً جملة للاصق الفلكرو وشامات التمشيط والتسميات الملونة", en: "Source a wholesale supplier for velcro ties, combs, and colored labels" },
      { ar: "صمّم صفحة الراك النظيف المعيارية بحيث تكون قابلة للمشاركة كصورة جذابة", en: "Design the clean-rack standard one-pager to be shareable as an attractive image" },
      { ar: "أطلق الحزمة على متجر إلكتروني ومنشورات Reddit ومجتمعات homelab", en: "Launch on an online store with posts in Reddit and homelab communities" },
      { ar: "صوّر تحويل راك فوضوي إلى راك نظيف بالحزمة وانشر الفيديو القصير", en: "Film a messy-rack to clean-rack transformation using the bundle and post the short video" },
      { ar: "أضف اشتراك إعادة تعبئة نصف سنوي للمستهلكات لتحقيق دخل متكرر", en: "Add a semi-annual consumables refill subscription for recurring revenue" }
    ],
  },
  {
    id: "p109",
    title: { ar: "حزمة طابعة تسميات مهندس الشبكات", en: "Engineer Label Printer Bundle" },
    category: "hardware",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "150-700$ شهرياً", en: "$150-700/mo" },
    monetization: { ar: "بيع الحزمة مع تحديثات دورية مدفوعة لقوالب الملصقات", en: "Bundle sales plus paid periodic label-template updates" },
    skills: ["labeling", "documentation", "cabling"],
    desc: {
      ar: "طابعة ملصقات حرارية محملة مسبقاً بقوالب تسميات الشبكات الجاهزة (منافذ لوحات التوصيل، أطراف الكابلات، وحدات الخزائن) مع بطاقة معيارية مطبوعة وفق TIA-606. الجمهور المستهدف: مهندسو الشبكات الميدانيون وأصحاب المختبرات المنزلية. التميّز: القوالب توفر ساعة عمل لكل راك يُبنى، وتصبح الطابعة العادة اليومية للمهندس المنظم.",
      en: "A thermal label printer preloaded with ready network label templates (patch-panel ports, cable ends, rack units) plus a printed TIA-606-aligned standard card. Target: field network engineers and homelab owners. Differentiator: the templates save an hour per rack build and turn the printer into the organized engineer's daily habit."
    },
    steps: [
      { ar: "اختبر 3 طابعات حرارية محمولة واختر الأنسب للملصقات الدائمة المقاومة للحرارة", en: "Test 3 portable thermal printers and pick the best for durable heat-resistant labels" },
      { ar: "أنشئ مكتبة قوالب التسميات بصيغ جاهزة للطباعة المباشرة مع مثال مصوّر لكل قالب", en: "Build the label-template library in print-ready formats with a photo example for each template" },
      { ar: "صمّم غلافاً يضم الطابعة والبطاقة المعيارية وبكرتين من الملصقات", en: "Design packaging that bundles the printer, standard card, and two label rolls" },
      { ar: "بِع عبر متجر ومجتمعات الشبكات مع فيديو يظهر أثر التسميات في تحويل راك واقعي", en: "Sell via store and network communities with a video showing labels transforming a real rack" },
      { ar: "أضف اشتراكاً سنوياً صغيراً لتجديد القوالب المتوافقة مع معايير محدثة", en: "Add a small annual subscription for template refreshes aligned with updated standards" }
    ],
  },
  {
    id: "p110",
    title: { ar: "طقم راك منزلي مبتدئ مع دليل ثنائي اللغة", en: "Home Rack Starter Kit + Guide" },
    category: "hardware",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "400-2000$ شهرياً", en: "$400-2000/mo" },
    monetization: { ar: "بيع الطقم مع خدمة تركيب إرشادية عبر مكالمة فيديو اختيارية", en: "Kit sales plus an optional guided-setup video-call service" },
    skills: ["racking", "cabling", "poe", "ups"],
    desc: {
      ar: "طقم راك جداري بسعة 9U يضم رفاً ووحدة توزيع طاقة ولوحة توصيل ومسارات إدارة الكابلات، مع دليل مطبوع من 20 صفحة ورموز QR لمقاطع فيديو التركيب. الجمهور المستهدف: العاملون عن بعد وبادئو المختبرات المنزلية. الميزة التنافسية: دليل ثنائي اللغة يغطي التبريد وتوجيه الكابلات الذي تتجاهله معظم الطقوم الرخيصة.",
      en: "A 9U wall-mount rack bundle: shelf, PDU, patch panel, and cable-management routes, plus a 20-page printed guide with QR codes to install videos. Target: remote workers and homelab starters. Differentiator: a bilingual guide covering the cooling and cable-routing details most cheap bundles ignore."
    },
    steps: [
      { ar: "اختبر توافق قطع الراك الفردية معاً وقس أبعاد التغليف النهائية للشحن", en: "Verify all rack parts fit together and measure final shipping dimensions" },
      { ar: "ألّف الدليل المطبوع مع قسم خاص بالتبريد وقيود التحميل ومسافات التهوية", en: "Write the printed guide with dedicated sections on cooling, load limits, and ventilation spacing" },
      { ar: "سجّل مقاطع فيديو تركيب قصيرة واربطها برموز QR داخل الدليل", en: "Record short install videos and link them from QR codes inside the guide" },
      { ar: "أطلق في متجر متخصص مع صور تركيب من عملاء حقيقيين بعد أول دفعة", en: "Launch in a niche store with real customer install photos after the first batch" },
      { ar: "أضف خدمة مكالمة فيديو مدفوعة لإرشاد التركيب خطوة بخطوة لمن يخاف من الحائط", en: "Add a paid video-call service to walk hesitant buyers through wall-mounting step by step" }
    ],
  },

  // ═══ SAAS (p111–p120) ═══
  {
    id: "p111",
    title: { ar: "خدمة تنبيه تغيّر العنوان العام", en: "Public IP Change Alerter" },
    category: "saas",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-900$ شهرياً", en: "$100-900/mo" },
    monetization: { ar: "مجاني لجهاز واحد واشتراك شهري للأجهزة المتعددة والإشعارات عبر ويب هوك", en: "Free for one device; monthly plan for multiple devices and webhook alerts" },
    skills: ["dns", "api", "monitoring", "automation"],
    desc: {
      ar: "خدمة مصغّرة تراقب عنوان IP العام لديك وترسل تنبيهاً فورياً عبر البريد أو واتساب عند تغيّره، مع سجل تاريخي للتغييرات وأوقاتها. الجمهور المستهدف: من يدير خوادم منزلية أو كاميرات أو إعدادات DNS ديناميكية. الميزة التنافسية: إعداد بسطر واحد في الراوتر أو الخادم، ولا حاجة لأي معرفة تقنية عميقة.",
      en: "A tiny service that watches your public IP and sends instant email or WhatsApp alerts when it changes, with a history log of changes and timestamps. Target: people running home servers, cameras, or dynamic-DNS setups. Differentiator: one-line setup on your router or server — no deep technical knowledge required."
    },
    steps: [
      { ar: "ابنِ خادماً مصغراً يستقبل نبضات العملاء ويسجل تغيّر العنوان في قاعدة بيانات خفيفة", en: "Build a minimal server that accepts client heartbeats and logs IP changes in a lightweight database" },
      { ar: "أضف قنوات التنبيه (بريد، واتساب عبر واجهة برمجية، ويب هوك) مع حد أدنى مجاني لجهاز واحد", en: "Add alert channels (email, WhatsApp API, webhooks) with a one-device free tier" },
      { ar: "انشر سكربت التثبيت بسطر واحد واختبره على 3 أنواع أجهزة مختلفة", en: "Publish the one-line install script and test it across 3 different device types" },
      { ar: "أطلق في منتديات الخوادم المنزلية ومجتمعات الواي فاي المنزلي مع صفحة هبوط بسيطة", en: "Launch in homelab forums and home-networking communities with a simple landing page" },
      { ar: "قدّم خطة مدفوعة للأجهزة المتعددة وواجهة برمجية للمطورين مع تقارير شهرية", en: "Offer a paid multi-device plan plus a developer API with monthly reports" }
    ],
  },
  {
    id: "p112",
    title: { ar: "لوحة تحكم DDNS بواجهة جميلة", en: "DDNS Manager with a Beautiful UI" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1500$ شهرياً", en: "$200-1500/mo" },
    monetization: { ar: "اشتراكات متدرجة بحسب عدد النطاقات وموفّري DNS", en: "Tiered subscriptions by domain and provider count" },
    skills: ["dns", "api", "automation", "monitoring"],
    desc: {
      ar: "لوحة استضافة تحافظ على مزامنة سجلات A وAAAA مع العناوين الديناميكية عبر عدة مزودين (Cloudflare وDuckDNS وno-ip) مع سجل صحة التحديثات. الجمهور المستهدف: أصحاب المختبرات المنزلية الذين يديرون أكثر من نطاق وأكثر من مزوّد. الميزة التنافسية: واجهة عربية ودودية تجمع كل المزودين وسجل الأعطال في مكان واحد بعد أن كانت مبعثرة.",
      en: "A hosted panel that keeps A/AAAA records synced with dynamic IPs across multiple providers (Cloudflare, DuckDNS, no-ip) with an update-health history. Target: homelab owners managing several domains and providers. Differentiator: a friendly bilingual UI that unifies all providers and outage history in one place, where before it was scattered."
    },
    steps: [
      { ar: "ابنِ نواة المزامنة لمزوّد Cloudflare أولاً مع نظام سجلات التحديث الناجح والفاشل", en: "Build the sync core for Cloudflare first with a success/failure update log" },
      { ar: "أضف واجهة لوحة بسيطة تعرض حالة كل نطاق وآخر مزامنة ناجحة", en: "Add a simple dashboard UI showing per-domain status and last successful sync" },
      { ar: "وسّع لمزوّدين إضافيين بعد التحقق من صحة النواة مع العملاء الأوائل المجانيين", en: "Expand to two more providers after validating the core with free early users" },
      { ar: "أطلق تسعيراً متدرجاً (3 نطاقات مجاناً ثم خطط شهرية) مع فترة تجريبية", en: "Launch tiered pricing (3 domains free, then monthly plans) with a trial period" },
      { ar: "أضف تنبيهات فشل المزامنة عبر واتساب/تلغرام لخطة الأعمال", en: "Add sync-failure alerts via WhatsApp/Telegram for the business tier" }
    ],
  },
  {
    id: "p113",
    title: { ar: "لوحة مراقبة تجديد شهادات Let's Encrypt", en: "Let's Encrypt Renewal Dashboard" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "تسعير بحسب عدد النطاقات مع خطة وكالات متعددة العملاء", en: "Per-domain pricing with a multi-client agency plan" },
    skills: ["tls", "monitoring", "api", "automation"],
    desc: {
      ar: "لوحة تراقب تواريخ انتهاء شهادات كل نطاقاتك من عدة خوادم، وترسل تنبيهات تصاعدية قبل الانتهاء، وتعرض سجل نجاح أو فشل عملية التجديد لكل خادم. الجمهور المستهدف: الوكالات والمستقلون الذين يديرون عشرات المواقع الصغيرة. الميزة التنافسية: تلتقط فشل التجديد الصامت الذي تفوته أدوات مراقبة الجهوزية العادية.",
      en: "A dashboard tracking certificate expiry across all your domains from multiple servers, sending escalating pre-expiry alerts and showing per-host renewal success/failure history. Target: agencies and freelancers managing dozens of small sites. Differentiator: it catches the silent renewal failures that ordinary uptime monitors miss."
    },
    steps: [
      { ar: "ابنِ فاحص شهادات أساسياً يعمل من عدة نقاط قياس ويعرض الأيام المتبقية", en: "Build a core cert checker running from multiple vantage points showing days-to-expiry" },
      { ar: "أضف سجل التحقق من صحة السلسلة لالتقاط التجديد الناقص", en: "Add chain-validation history to catch incomplete renewals" },
      { ar: "أطلق نسخة مجانية لخمسة نطاقات لجمع التغذية الراجعة وتشغيل التنبيهات البريدية", en: "Launch a free 5-domain tier to gather feedback and validate email alerts" },
      { ar: "أضف خططاً مدفوعة بحسب العدد مع تقارير أسبوعية مجمّعة للوكالات", en: "Add paid count-based plans with weekly aggregated agency reports" },
      { ar: "بنِ تكامل Slack/Teams لتسليم التنبيهات في قنوات الفريق مباشرة", en: "Build Slack/Teams integrations to deliver alerts directly into team channels" }
    ],
  },
  {
    id: "p114",
    title: { ar: "صفحات حالة احترافية للمستقلين", en: "Status Pages for Freelancers" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "خطط شهرية وخطة بيضاء العلامة للوكالات لإعادة البيع", en: "Monthly plans and a white-label reseller tier for agencies" },
    skills: ["monitoring", "api", "dns", "web"],
    desc: {
      ar: "خدمة صفحات حالة بتصميم أنيق تعرض حالة كل موقع أو خدمة تديرها (تعمل/متدهورة/متوقفة) مع خط زمني للحوادث موثّق بالوقت. الجمهور المستهدف: مستقلو الويب والوكالات الصغيرة التي تدير مواقع عملاء. الميزة التنافسية: علامة بيضاء على نطاق مخصص وبسعر يمكن للوكالة إعادة بيعه بربح مريح.",
      en: "A cleanly designed status-page service showing the state of every site or service you maintain (up/degraded/down) with a timestamped incident timeline. Target: web freelancers and small agencies maintaining client sites. Differentiator: white-label on a custom domain at a price agencies can comfortably resell."
    },
    steps: [
      { ar: "ابنِ محرك الفحص (HTTP/DNS/TCP) مع تخزين سجل الحالة لكل خدمة", en: "Build the check engine (HTTP/DNS/TCP) with per-service status history storage" },
      { ar: "أنشئ قالب صفحة الحالة بتصميم يليق بعلامة تجارية مع خط زمني للحوادث", en: "Create a status-page template with brand-worthy design and an incident timeline" },
      { ar: "أطلق نسخة مجانية لخدمتين لبناء قاعدة مستخدمين وقصص نجاح", en: "Launch a free two-service tier to build a user base and success stories" },
      { ar: "فعّل النطاقات المخصصة والقوالب القابلة لإعادة البيع في الخطة المدفوعة", en: "Enable custom domains and reseller-ready templates in the paid plan" },
      { ar: "سوّق للوكالات مباشرة بحساب توفير الوقت مقارنة ببناء الصفحات ذاتياً", en: "Market directly to agencies with a time-savings calculation vs building pages in-house" }
    ],
  },
  {
    id: "p115",
    title: { ar: "خريطة كمون مزودي الإنترنت الإقليميين", en: "Regional ISP Latency Map" },
    category: "saas",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "رعاية إعلانية + خطة واجهة برمجية مدفوعة للمطورين واللاعبين المحترفين", en: "Sponsorship plus a paid API plan for developers and competitive gamers" },
    skills: ["monitoring", "routing", "analytics", "api"],
    desc: {
      ar: "خدمة بمجسّات قياس في عدة دول تقيس الكمون وفقدان الحزم بين مزودي الإنترنت الإقليميين والخدمات الشهيرة (الألعاب، البث، التخزين السحابي) وتعرضها على خريطة حية. الجمهور المستهدف: اللاعبون والعاملون عن بعد والشركات الصغيرة التي تختار مزوّدها. الميزة التنافسية: بيانات لا يعرضها أي مزوّد عن نفسه، محدّثة كل ساعة.",
      en: "A service with probes in several countries measuring latency and packet loss between regional ISPs and popular services (gaming, streaming, cloud) rendered on a live map. Target: gamers, remote workers, and small businesses choosing their ISP. Differentiator: data no ISP will show about itself, refreshed hourly."
    },
    steps: [
      { ar: "نشر مجسّات قياس رخيصة على خوادم VPS في 5 مدن إقليمية وسكربت قياس دوري", en: "Deploy cheap measurement probes on VPS servers in 5 regional cities with a scheduled test script" },
      { ar: "ابنِ واجهة الخريطة الحية مع فلترة حسب المزوّد والخدمة المستهدفة", en: "Build the live map UI with filtering by ISP and target service" },
      { ar: "انشر النتائج الشهرية كتقارير مجانية لجذب الروابط والزيارات", en: "Publish monthly result reports for free to attract links and traffic" },
      { ar: "وقّع رعاية مع شركة ألعاب أو مزوّد استضافة إقليمي يريد الوصول لنفس الجمهور", en: "Sign a sponsorship with a gaming company or regional host targeting the same audience" },
      { ar: "أضف واجهة برمجية مدفوعة لتطبيقات الألعاب ومنصات المقارنة", en: "Add a paid API for gaming apps and comparison platforms" }
    ],
  },
  {
    id: "p116",
    title: { ar: "أداة: هل المشكلة في مزوّدي أم في الموقع؟", en: "Is It My ISP or the Site? Checker" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "أداة مجانية تجذب الزيارات ثم إعلانات وتسويق بالعمولة لخدمات VPN ومزودات", en: "Free traffic-magnet tool monetized via ads and VPN/ISP affiliate offers" },
    skills: ["troubleshooting", "dns", "monitoring"],
    desc: {
      ar: "تطبيق ويب يجري فحوصات traceroute وDNS من عدة نقاط قياس ويصدر حكماً مبسطاً بالعربية: هل تباطؤ الموقع سببه مزوّدك أم الموقع نفسه، مع بطاقة نتيجة قابلة للمشاركة. الجمهور المستهدف: المستهلكون المحبطون والعاملون عن بعد. الميزة التنافسية: أداة مجانية تنتشر بسرعة وتصبح مسار مبيعات للخدمات المرتبطة بها.",
      en: "A web app running traceroute and DNS checks from multiple vantage points and issuing a plain-Arabic verdict: is the slowdown your ISP or the site itself, with a shareable result card. Target: frustrated consumers and remote workers. Differentiator: a free tool that spreads quickly and becomes a funnel for related paid services."
    },
    steps: [
      { ar: "ابنِ منطق الفحص من 3 نقاط قياس على الأقل مع مقارنة نتائج DNS وزمن الاتصال", en: "Build the check logic from at least 3 vantage points comparing DNS results and connect times" },
      { ar: "صمّم بطاقة النتيجة القابلة للمشاركة التي تلخص الحكم في جملة واحدة واضحة", en: "Design the shareable result card that summarizes the verdict in one clear sentence" },
      { ar: "أطلق الأداة مجاناً مع منشورات توضح حالات واقعية (مزود يخنق بروتوكولاً معيناً)", en: "Launch free with posts explaining real cases (an ISP throttling a specific protocol)" },
      { ar: "أضف روابط تسويق بالعمولة لخدمات VPN وخطط بديلة بعد بناء الثقة", en: "Add affiliate links for VPN services and alternative plans once trust is built" },
      { ar: "حوّل البيانات المجهولة إلى تقارير ربع سنوية تجذب الرعاية الإعلانية", en: "Turn anonymized data into quarterly reports that attract sponsorship" }
    ],
  },
  {
    id: "p117",
    title: { ar: "كاشف انحراف إعدادات الشبكات", en: "Network Config Drift Detector" },
    category: "saas",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "اشتراك شهري بحسب عدد الأجهزة المدارة", en: "Per-device monthly subscription" },
    skills: ["automation", "git", "cli", "monitoring"],
    desc: {
      ar: "خدمة تسحب إعدادات الموجهات والمبدّلات دورياً عبر SSH أو NETCONF، وتقارن الفروقات، وتنبه عند أي تعديل غير مصرّح به مع خط زمني يحدد متى ومن غيّر الإعداد. الجمهور المستهدف: مزودو الخدمات المدارة وفرق تقنية المعلومات المرغمة. الميزة التنافسية: يعمل دون وكلاء على المنصات الشائعة ويعرض الفرق بلغة بشرية لا سطور أوامر خام.",
      en: "A service that pulls router/switch configs on a schedule over SSH or NETCONF, diffs them, alerts on unauthorized changes, and shows a timeline of who changed what and when. Target: MSPs and stretched IT teams. Differentiator: agentless on common platforms, with diffs rendered in human-readable form rather than raw command lines."
    },
    steps: [
      { ar: "ابنِ محرك السحب لأجهزة Cisco IOS أولاً مع تخزين نسخ Git مؤرّخة", en: "Build the pull engine for Cisco IOS first with timestamped Git snapshots" },
      { ar: "أضف محرك الفرق الذي يترجم التغييرات إلى ملخص بشري واضح", en: "Add a diff engine that translates changes into a clear human summary" },
      { ar: "أطلق نسخة مجانية لثلاثة أجهزة واختبرها في مختبر حقيقي متعدد البائعين", en: "Launch a free 3-device tier and test it in a real multi-vendor lab" },
      { ar: "فعّل تنبيهات القنوات (بريد/تلغرام/سلاك) وخط زمنياً للتعديلات", en: "Enable channel alerts (email/Telegram/Slack) and a change timeline" },
      { ar: "سوّق لمزودي الخدمات المدارة بحساب توفير ساعات التدقيق اليدوي", en: "Market to MSPs with a manual-audit hours-saved calculation" }
    ],
  },
  {
    id: "p118",
    title: { ar: "مراقب تغيّر المنافذ الخارجية", en: "External Port-Change Monitor" },
    category: "saas",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1400$ شهرياً", en: "$200-1400/mo" },
    monetization: { ar: "اشتراك بحسب عدد العناوين العامة المراقَبة", en: "Subscription per monitored public IP" },
    skills: ["nmap", "monitoring", "security", "automation"],
    desc: {
      ar: "خدمة تفحص عناوينك العامة يومياً وتنبهك عند انفتاح منفذ جديد أو انغلاق آخر، فتلتقط الأخطاء المهمة مثل جدار ناري أُعيد تهيئته أو خدمة كشفت نفسها بالخطأ. الجمهور المستهدف: الشركات الصغيرة ومديرو المختبرات المنزلية. الميزة التنافسية: يركز على التغيير لا على تقرير سطح هجوم كامل، فتبقى التنبيهات قابلة للقراءة والفعل.",
      en: "A service that scans your public IPs daily and alerts when a new port opens or one closes — catching real mistakes like a re-applied firewall or an accidentally exposed service. Target: small businesses and homelab admins. Differentiator: it focuses on change, not a full attack-surface report, so alerts stay readable and actionable."
    },
    steps: [
      { ar: "ابنِ خط المسح اليومي المجدول مع مقارنة لقطة المنافذ باللقطة السابقة", en: "Build the scheduled daily scan pipeline comparing the port snapshot with the previous one" },
      { ar: "نفّذ منطق التنبيه مع ضبط الحساسية لتجنب ضجيج الإنذارات الكاذبة", en: "Implement alert logic with sensitivity tuning to avoid false-alarm noise" },
      { ar: "أطلق خطة مجانية لعنوان واحد لجمع شهادات المستخدمين الأوائل", en: "Launch a free one-IP plan to collect early-user testimonials" },
      { ar: "أضف تقارير شهرية PDF تصلح لتقديمها للإدارة أو المدقق الخارجي", en: "Add monthly PDF reports suitable for management or external auditors" },
      { ar: "سوّق عقداً سنوياً للشركات الصغيرة مع 10 عناوين بسعر مخفض", en: "Market annual plans to small businesses covering 10 IPs at a discount" }
    ],
  },
  {
    id: "p119",
    title: { ar: "خدمة تنبيهات حصة النطاق الترددي", en: "Bandwidth Quota Alert Service" },
    category: "saas",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-600$ شهرياً", en: "$100-600/mo" },
    monetization: { ar: "اشتراك شهري رمزي لكل موقع أو منزل", en: "Small monthly subscription per site or household" },
    skills: ["snmp", "monitoring", "analytics"],
    desc: {
      ar: "خدمة تقرأ عدادات الواجهات عبر SNMP من الراوتر الخاص بك وتحذّرك عند بلوغ 70% و90% و100% من الحصة الشهرية، مع نموذج تنبؤي يخبرك قبل أيام متى ستنفد. الجمهور المستهدف: المنازل والمكاتب الصغيرة على خطط محدودة الانتشار الشائعة في المنطقة. الميزة التنافسية: يفهم يوم إعادة تعيين الفاتورة ويتنبأ بالتجاوز قبل حدوثه لا بعده.",
      en: "A service reading SNMP interface counters from your router and warning at 70%, 90%, and 100% of your monthly quota, with a predictive model telling you days ahead when you will run out. Target: homes and small offices on metered plans common in the region. Differentiator: it understands the billing reset day and predicts overage before it happens, not after."
    },
    steps: [
      { ar: "ابنِ قارئ SNMP يعمل مع أكثر 5 راوترات شيوعاً في السوق المحلي", en: "Build an SNMP reader supporting the 5 most common local-market routers" },
      { ar: "أضف منطق التنبؤ بخط الاستهلاك المتوقع مع مراعاة تاريخ الفاتورة", en: "Add consumption-trend prediction logic accounting for the billing date" },
      { ar: "أطلق نسخة تجريبية مجانية شهراً واحداً مع تنبيه واتساب", en: "Launch a one-month free trial with WhatsApp alerts" },
      { ar: "حوّل التجربة إلى اشتراك شهري رمزي مع خصم سنوي", en: "Convert the trial to a small monthly subscription with an annual discount" },
      { ar: "أضف لوحة استخدام لكل جهاز في المنزل كترقية عائلية", en: "Add a per-device household usage panel as a family upgrade" }
    ],
  },
  {
    id: "p120",
    title: { ar: "خدمة NetBox مُدارة للشركات النامية", en: "Managed NetBox Tier (IPAM-as-a-Service)" },
    category: "saas",
    difficulty: 5,
    timeToMarket: { ar: "3 أشهر", en: "3 months" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "خطط استضافة متدرجة مع رسوم ترحيل لمرة واحدة", en: "Tiered hosting plans with one-time migration fees" },
    skills: ["ip-addressing", "automation", "api", "linux", "documentation"],
    desc: {
      ar: "نسخة NetBox مستضافة ومدارة بالكامل: نسخ احتياطي يومي وصلاحيات دقيقة وقوالب تهيئة جاهزة وترحيل البيانات من جداول Excel الفوضوية. الجمهور المستهدف: مزودو الخدمات المدارة والشركات الناشئة التي تجاوزت مرحلة جداول البيانات لكنها بلا مسؤول أنظمة. الميزة التنافسية: الترحيل من Excel يتم نيابة عن العميل كخدمة، وهو أكبر عائق يمنع التبني عادة.",
      en: "A fully managed hosted NetBox: daily backups, fine-grained permissions, onboarding templates, and migration of messy Excel spreadsheets into clean records. Target: MSPs and startups that outgrew spreadsheets but have no sysadmin. Differentiator: the Excel migration is done for the client as a service — the single biggest blocker to adoption."
    },
    steps: [
      { ar: "ابنِ بيئة نشر آمنة متعددة المستأجرين مع عزل بيانات كل عميل", en: "Build a secure multi-tenant deployment with per-customer data isolation" },
      { ar: "طوّر سكربتات ترحيل Excel مع قواعد تحقق تلتقط أخطاء البيانات الشائعة", en: "Develop Excel migration scripts with validation rules catching common data errors" },
      { ar: "وثّق خطط النسخ الاحتياطي والاستعادة واختبرها فعلياً قبل أول عميل", en: "Document backup and restore plans and actually test them before the first customer" },
      { ar: "قدّم أول 3 ترحيلات مجانية مقابل شهادات حالة قابلة للنشر", en: "Offer the first 3 migrations free in exchange for publishable case studies" },
      { ar: "أضف مستوى مؤسسياً صغيراً: تسجيل دخول موحد وتقارير امتثال شهرية", en: "Add a small enterprise tier: SSO login and monthly compliance reports" }
    ],
  },

  // ═══ EDUCATION (p121–p128) ═══
  {
    id: "p121",
    title: { ar: "منهج شبكات مدرسي جاهز لمعلمي تقنية المعلومات", en: "School Network Curriculum for IT Teachers" },
    category: "education",
    difficulty: 3,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "400-2000$ شهرياً", en: "$400-2000/mo" },
    monetization: { ar: "ترخيص لكل مدرسة مع ورش تدريب مدفوعة للمعلمين", en: "Per-school licensing plus paid teacher training workshops" },
    skills: ["switching", "subnetting", "dns", "documentation"],
    desc: {
      ar: "حزمة فصل دراسي كاملة: 16 خطة درس وملفات Packet Tracer ومعايير تقييم ونصوص جاهزة للمعلم، تغطي وحدة شبكات في منهج تقنية معلومات ثانوي. الجمهور المستهدف: معلمو الحاسب المكلفون بتدريس الشبكات دون خلفية متخصصة. الميزة التنافسية: تحضير صفري — كل درس بنص كامل ومفتاح إجابات وسيناريو صفّي واقعي.",
      en: "A full semester package: 16 lesson plans, Packet Tracer files, rubrics, and ready teacher scripts covering the networking unit of a secondary IT curriculum. Target: IT teachers assigned networking with no specialized background. Differentiator: zero prep — every lesson ships with a full script, answer key, and a realistic classroom scenario."
    },
    steps: [
      { ar: "راجع معايير المنهج الوطني لوحدة الشبكات واربط كل درس بمعيار محدد", en: "Review the national curriculum standards for the networking unit and map each lesson to a standard" },
      { ar: "ألّف الدروس الـ16 مع مختبرات Packet Tracer قابلة للتنزيل وأنشطة تقويم", en: "Author the 16 lessons with downloadable Packet Tracer labs and assessment activities" },
      { ar: "اطبع نسخة تجريبية وجرّبها مع معلمين في مدرستين مقابل ملاحظات موثقة", en: "Print a pilot edition and trial it with teachers in two schools for documented feedback" },
      { ar: "بِع ترخيص المدرسة مع ورشة تدريب معلمين نصف يومية كمجموعة واحدة", en: "Sell the school license bundled with a half-day teacher training workshop" },
      { ar: "أضف مكتبة اختبارات قابلة للطباعة كمشتريات سنوية متجددة", en: "Add a printable assessment library as a renewable annual purchase" }
    ],
  },
  {
    id: "p122",
    title: { ar: "حزمة فيديو: اشرح الشبكات للأطفال بالعربية", en: "Explain Ping to Kids — Arabic Video Pack" },
    category: "education",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-800$ شهرياً", en: "$150-800/mo" },
    monetization: { ar: "بيع الحزمة رقمياً عبر Gumroad مع ترخيص للمدارس والأندية", en: "Digital pack sales on Gumroad plus school and club licenses" },
    skills: ["icmp", "tcp", "dns"],
    desc: {
      ar: "20 فيديو رسوم متحركة قصيرة بالعربية تشرح للأعمار 8-12 مفاهيم البينق وعنوان IP ونظام DNS والموجهات، مع أوراق أنشطة قابلة للطباعة. الجمهور المستهدف: أولياء الأمور وأندية البرمجة والمدارس الابتدائية. الميزة التنافسية: كل فيديو ينتهي بتجربة منزلية حقيقية مثل تتبع المسار من غرفة المعيشة، فيتحول المشاهدة إلى تطبيق.",
      en: "20 short Arabic-animated videos explaining ping, IP addresses, DNS, and routers to ages 8-12, with printable activity sheets. Target: parents, coding clubs, and primary schools. Differentiator: every video ends with a real home experiment — like running traceroute from the living room — so watching turns into doing."
    },
    steps: [
      { ar: "اكتب سيناريوهات 5 فيديوهات أولى واختبر مفرداتها مع أطفال فعليين", en: "Script the first 5 videos and test the vocabulary with real children" },
      { ar: "أنشئ الرسوم المتحركة بأداة بسيطة (Vyond أو مصغّرات مرسومة) مع تعليق صوتي عربي واضح", en: "Produce animations with a simple tool (Vyond or drawn cutouts) and clear Arabic voice-over" },
      { ar: "أرفق أوراق الأنشطة القابلة للطباعة مع كل حلقة كقيمة ملموسة", en: "Attach printable activity sheets to every episode as tangible value" },
      { ar: "أطلق على Gumroad بفيديوهين مجانيين كمفتاح تسويقي", en: "Launch on Gumroad with two free episodes as a marketing hook" },
      { ar: "قدّم ترخيصاً مؤسسياً للأندية والمدارس بسعر لكل مقعد", en: "Offer an institutional license for clubs and schools priced per seat" }
    ],
  },
  {
    id: "p123",
    title: { ar: "معسكر تدريب مؤسسي جاهز للتقديم (Bootcamp-in-a-Box)", en: "Corporate Networking Bootcamp-in-a-Box" },
    category: "education",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "500-3000$ شهرياً", en: "$500-3000/mo" },
    monetization: { ar: "ترخيص بحسب عدد المقاعد مع مسار شهادة مدرّب معتمد", en: "Per-seat licensing plus a certified facilitator track" },
    skills: ["vlans", "routing", "firewall", "automation"],
    desc: {
      ar: "معسكر مكثف لثلاثة أيام تقدمه الشركات داخلياً: شرائح وبيئة مختبرات containerlab وتمارين وتقييم نهائي، مع دليل ميسّر يتيح لمهندس متوسط الخبرة تقديمه بنجاح. الجمهور المستهدف: إدارات الموارد البشرية والتطوير في الشركات التي ترفع مهارات مسؤولي الأنظمة. الميزة التنافسية: سعر المقعد أرخص بكثير من إرسال الموظفين لمعسكر خارجي.",
      en: "A 3-day intensive that companies run in-house: slides, a containerlab lab environment, exercises, and a final assessment, plus a facilitator guide that lets a mid-level engineer deliver it successfully. Target: HR and L&D at companies upskilling sysadmins. Differentiator: per-seat pricing far cheaper than sending staff to an external bootcamp."
    },
    steps: [
      { ar: "ابنِ بنية المعسكر (يوم: أساسيات، يوم: تعمق، يوم: تطبيق مشروع) مع مخرجات واضحة", en: "Structure the bootcamp (day 1: fundamentals, day 2: deepening, day 3: applied project) with clear outcomes" },
      { ar: "جهّز بيئة containerlab تعمل على أجهزة متوسطة الإمكانيات مع سكربت تشغيل واحد", en: "Prepare a containerlab environment that runs on mid-range laptops with a single bootstrap script" },
      { ar: "ألّف دليل الميسّر مع نصوص الانتقالات وتوقيتات كل قسم وأجوبة الأسئلة الشائعة", en: "Write the facilitator guide with transition scripts, per-section timing, and FAQ answers" },
      { ar: "بِع تجربة أولى لشركة واحدة بسعر مخفض مقابل دراسة حالة", en: "Sell a discounted first delivery to one company in exchange for a case study" },
      { ar: "أضف مسار شهادة ميسّر معتمد يفتح سوق الشركات التي بلا مهندس مقدم قادر", en: "Add a certified-facilitator track opening the market to companies with no capable in-house trainer" }
    ],
  },
  {
    id: "p124",
    title: { ar: "خدمة تأليف مقررات مختبرات جامعية", en: "University Lab Course Authoring" },
    category: "education",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "600-2500$ شهرياً", en: "$600-2500/mo" },
    monetization: { ar: "عقود لكل مقرر مع رسوم تحديث سنوية", en: "Per-course contracts with paid annual updates" },
    skills: ["bgp", "ospf", "switching", "linux"],
    desc: {
      ar: "خدمة تأليف أدلة مختبرات مخصصة وطوبولوجيات GNS3 أو EVE-NG لمقررات الشبكات الجامعية، متوافقة مع الخطة الدراسية ومصحوبة بسكربتات تصحيح آلي لتقييم الطلاب تلقائياً. الجمهور المستهدف: أقسام علوم الحاسب ونظم المعلومات. الميزة التنافسية: التصحيح الآلي يوفر للأستاذ أكثر من عشر ساعات لكل دفعة طلاب.",
      en: "A custom authoring service: lab manuals plus GNS3 or EVE-NG topologies for university networking courses, aligned to the syllabus and accompanied by auto-grading scripts that assess students automatically. Target: CS and IS departments. Differentiator: auto-grading saves the instructor 10+ hours per student cohort."
    },
    steps: [
      { ar: "حدد مقرراً واحداً في جامعة محلية وتطوّع بتحسين مختبر واحد كنموذج مجاني", en: "Pick one course at a local university and volunteer to upgrade one lab as a free showcase" },
      { ar: "طوّر نمط التصحيح الآلي (سكربتات تحقق من الوصول والتكوين في الطوبولوجيا)", en: "Develop the auto-grading pattern (scripts verifying reachability and config state in the topology)" },
      { ar: "قدّم عقد مقرر كامل (10 مختبرات) مع ترخيص استخدام داخلي فقط", en: "Pitch a full course contract (10 labs) with internal-use-only licensing" },
      { ar: "أضف عقد تحديث سنوي يواكب إصدارات المنصات وتغيّر الخطط الدراسية", en: "Add an annual update retainer tracking platform releases and syllabus changes" },
      { ar: "وسّع لجامعات أخرى بنفس المقرر مع تخصيص علامتها وتحوّل الطوبولوجيا", en: "Expand to other universities with the same course rebranded and topology-adjusted" }
    ],
  },
  {
    id: "p125",
    title: { ar: "دورة Packet Tracer لمهمات الشبكات للمراهقين", en: "Packet Tracer Missions for Teens" },
    category: "education",
    difficulty: 2,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1000$ شهرياً", en: "$200-1000/mo" },
    monetization: { ar: "بيع الدورة رقمياً وترخيصها لنوادي STEM المدرسية", en: "Digital course sales plus licenses for school STEM clubs" },
    skills: ["switching", "ip-addressing", "dhcp", "nat"],
    desc: {
      ar: "دورة ذاتية الوتيرة يبني فيها المراهقون شبكة شركة صغيرة كاملة في Packet Tracer عبر 8 مهمات مسلّية بنقاط تحقق وشارات إنجاز. الجمهور المستهدف: الفئة 13-17 عاماً في برامج STEM ونوادي الحاسب. الميزة التنافسية: أسلوب تقدّم مرحلي مشوّق مع دليل عربي خطوة بخطوة، والانتهاء ينتج مشروعاً يفتخر الطالب بعرضه.",
      en: "A self-paced course where teens build an entire small-company network in Packet Tracer through 8 gamified missions with checkpoints and achievement badges. Target: ages 13-17 in STEM programs and computer clubs. Differentiator: game-style progression with an Arabic step-by-step guide, and completion yields a portfolio project the student is proud to show."
    },
    steps: [
      { ar: "صمّم المهمات الثماني كسلسلة قصة (شركة ناشئة تحتاج شبكة تكبر كل مهمة)", en: "Design the 8 missions as a story arc (a startup needing a network that grows each mission)" },
      { ar: "ابنِ ملفات Packet Tracer لكل مهمة مع ملف إكمال مرجعي للولي/المشرف", en: "Build the Packet Tracer files per mission with a reference completion file for parents/supervisors" },
      { ar: "سجّل فيديوهات تلميح قصيرة (دقيقتان) لكل مهمة تُحل الإغلاقات الشائعة", en: "Record short 2-minute hint videos per mission that unblock common sticking points" },
      { ar: "أطلق بيعاً مباشراً مع خصم نوادي STEM لخمس مقاعد وأكثر", en: "Launch direct sales with a STEM-club discount for 5+ seats" },
      { ar: "اجمع شهادات الأهالي وحوّلها إلى نسخة إجازة مدرسية موسعة", en: "Collect parent testimonials and spin them into an expanded school-holiday edition" }
    ],
  },
  {
    id: "p126",
    title: { ar: "حزمة علم الشبكات للتعليم المنزلي", en: "Home-School Network Science Pack" },
    category: "education",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "بيع الحزمة عبر Gumroad وEtsy كسلع رقمية", en: "Pack sales on Gumroad and Etsy as digital goods" },
    skills: ["wifi", "dns", "subnetting", "documentation"],
    desc: {
      ar: "حزمة رقمية ومطبوعة من 10 تجارب عائلية تُجرى على شبكة المنزل نفسها: رسم خريطة الأجهزة، قياس جودة الواي فاي في الغرف، سباق خوادم DNS، دون أي شراء إضافي. الجمهور المستهدف: أسر التعليم المنزلي. الميزة التنافسية: العلوم تجري على الشبكة الحقيقية للأسرة فتتحول المعرفة إلى ملاحظة يومية.",
      en: "A printable + digital pack of 10 family experiments run on your own home network: mapping devices, measuring Wi-Fi quality room by room, racing DNS resolvers — with no extra purchases. Target: home-schooling families. Differentiator: science runs on the family's real network, turning knowledge into daily observation."
    },
    steps: [
      { ar: "اختبر كل تجربة في منزلك أولاً وصوّر خطواتها بعناية", en: "Run every experiment in your own home first and carefully photograph the steps" },
      { ar: "ألّف دليل الوالدين بجمل مبسطة وأهداف تعلم واضحة لكل تجربة", en: "Write the parent guide with simplified language and clear learning goals per experiment" },
      { ar: "اجمع التجارب في حزمة PDF مع أوراق تسجيل نتائج قابلة للطباعة", en: "Compile the experiments into a PDF pack with printable result-recording sheets" },
      { ar: "أطلق على Gumroad وEtsy مع صفحة تجربة مجانية واحدة", en: "Launch on Gumroad and Etsy with one free sample experiment" },
      { ar: "أضف حزمة توسعة للمراهقين (تحليل حزم أولي بWireshark) كترقية", en: "Add a teen expansion pack (first Wireshark packet analysis) as an upsell" }
    ],
  },
  {
    id: "p127",
    title: { ar: "ورشة أساسيات الواي فاي لموظفي المكاتب", en: "Office Wi-Fi Basics Workshop Kit" },
    category: "education",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "100-600$ شهرياً", en: "$100-600/mo" },
    monetization: { ar: "تقديم الورشة مباشرة أو ترخيص حزمة التقديم للشركات", en: "Deliver the workshop live or license the kit to companies" },
    skills: ["wifi", "troubleshooting", "documentation"],
    desc: {
      ar: "ورشة مدتها 90 دقيقة بشرائح وسيناريو عرض حي تعلّم الموظفين غير التقنيين حل مشاكل الواي فاي الشائعة والتوقف عن إغراق قسم الدعم بالتذاكر. الجمهور المستهدف: الشركات الصغيرة ذات فرق تقنية قليلة. الميزة التنافسية: تُباع للمدراء بأرقام تذاكر الدعم التي ستختفي، وهي لغة يفهمونها.",
      en: "A 90-minute workshop with slides and a live demo script teaching non-technical office staff to fix common Wi-Fi issues and stop flooding IT with tickets. Target: SMEs with small IT teams. Differentiator: you sell it to managers with help-desk ticket stats that will disappear — the language they understand."
    },
    steps: [
      { ar: "جمع أكثر 10 مشاكل واي فاي تكراراً في التذاكر ورتبها بحسب شيوعها", en: "Collect the 10 most repeated Wi-Fi issues from real tickets and rank them by frequency" },
      { ar: "ألّف الشرح المبسط لكل مشكلة بجمل من 3 خطوات كحد أقصى", en: "Write the plain explanation for each issue in at-most-3-step sentences" },
      { ar: "صمّم عرضاً حياً (تغيير القناة، قطع جهاز متعطش للنطاق) بنتيجة مرئية فورية", en: "Design a live demo (channel change, isolating a bandwidth hog) with instant visible results" },
      { ar: "قدّم أول ورشة مجانية مقابل بيانات قبل/بعد لعدد التذاكر", en: "Deliver the first workshop free in exchange for before/after ticket-count data" },
      { ar: "بِع الحزمة كترخيص داخلي يقدمه فريق الشركة بنفسه", en: "Sell the kit as an in-house license the company's own team can deliver" }
    ],
  },
  {
    id: "p128",
    title: { ar: "دفعة CCNA العربية الحية", en: "Arabic CCNA Live Cohort" },
    category: "education",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "500-3000$ شهرياً", en: "$500-3000/mo" },
    monetization: { ar: "تذاكر الدفعة مع نسخة مسجلة غير محدودة المشاهدة", en: "Cohort tickets plus an unlimited-replay recorded edition" },
    skills: ["switching", "routing", "subnetting", "ospf", "vlans"],
    desc: {
      ar: "دفعة حية لستة أسابيع بالعربية تغطي موضوعات امتحان CCNA مع مختبر أسبوعي ومجتمع خاص وامتحانين تجريبيين مصححين يدوياً. الجمهور المستهدف: المتعلمون العرب الذين يتهربون من الدورات الإنجليزية الجافة. الميزة التنافسية: التزام الدفعة (محاضرة مباشرة أسبوعياً) وتفسير الموضوعات الملغزة بالعربية يرفعان نسب الإكمال والنجاح.",
      en: "A 6-week Arabic live cohort covering CCNA exam topics with a weekly lab, a private community, and two manually-graded mock exams. Target: Arab learners avoiding dry English-only courses. Differentiator: cohort accountability (weekly live session) plus native-language explanation of tricky topics lifts completion and pass rates."
    },
    steps: [
      { ar: "جزّء المنهج إلى 6 أسابيع بموضوعين أسبوعياً وحدد مخرجات قابلة للقياس", en: "Chunk the syllabus into 6 weeks of two topics each with measurable outcomes" },
      { ar: "أعدّ المختبر الأسبوعي ووثائقه وسكربت التصحيح الذاتي", en: "Prepare the weekly lab, its documentation, and a self-check script" },
      { ar: "أطلق دفعة تجريبية مخفضة (15 مقعداً) لجمع الشهادات وتحسين المحتوى", en: "Launch a discounted pilot cohort (15 seats) to gather testimonials and refine content" },
      { ar: "بِع الدفعة التالية بسعر كامل مع سحب على مقعد مجاني بين المسجلين مبكراً", en: "Sell the next cohort at full price with an early-bird giveaway seat" },
      { ar: "أطلق النسخة المسجلة كمنتج دائم يجني دخلاً بين الدفعات", en: "Launch the recorded edition as an evergreen product earning between cohorts" }
    ],
  },

  // ═══ FREELANCE (p129–p136) ═══
  {
    id: "p129",
    title: { ar: "خدمة توسط نزاعات مزودي الإنترنت", en: "ISP Dispute Mediation Service" },
    category: "freelance",
    difficulty: 3,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "300-2000$ شهرياً", en: "$300-2000/mo" },
    monetization: { ar: "رسوم ثابتة لكل حالة مع مكافأة عند نجاح التسوية", en: "Flat fee per case with a success bonus on resolution" },
    skills: ["troubleshooting", "monitoring", "documentation", "routing"],
    desc: {
      ar: "خدمة تقنية مستقلة تجري قياسات موثقة (سجلات كمون، جودة خط، التقاط حزم) وتصدر تقريراً مهنياً يحسم نزاع شركة صغيرة مع مزود الإنترنت حول الانقطاعات المتكررة. الجمهور المستهدف: الشركات الصغيرة والمتوسطة المتعبة من وعود الدعم الفني. الميزة التنافسية: تقرير قائم على أدلة يجعل تصعيد الشكوى يُؤخذ بجدية فعلية.",
      en: "An independent technical service that runs documented measurements (latency logs, line quality, packet captures) and produces a professional report that settles a business's dispute with its ISP over recurring outages. Target: SMEs exhausted by support-runaround. Differentiator: an evidence-based report that gets escalations taken seriously."
    },
    steps: [
      { ar: "جهّز حزمة أدوات القياس المحمولة (راسمال السجلات، مختبر جودة الخط، ماسح طيف)", en: "Assemble a portable measurement toolkit (log recorder, line-quality tester, spectrum scanner)" },
      { ar: "صمّم قالب التقرير المهني الذي يفهمه مهندسو المزود ومديرو الشركة معاً", en: "Design the professional report template both ISP engineers and company managers understand" },
      { ar: "أنجز أول قضية بخصم كبير مقابل إذن بنشر دراسة حالة مجهولة", en: "Take a first heavily-discounted case in exchange for permission to publish an anonymized case study" },
      { ar: "قدّم الخدمة بباقة ثابتة (تقييم أسبوعين + تقرير + جلسة شرح)", en: "Package the service as a flat fee (2-week assessment + report + walkthrough session)" },
      { ar: "أضف مكافأة نجاح مرتبطة بتعويض أو ترقية تحصل عليها الشركة من المزود", en: "Add a success fee tied to a credit or upgrade the company wins from the ISP" }
    ],
  },
  {
    id: "p130",
    title: { ar: "تحسين واي فاي الفنادق الصغيرة", en: "Hotel Guest Wi-Fi Optimization" },
    category: "freelance",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "400-2500$ شهرياً", en: "$400-2500/mo" },
    monetization: { ar: "باقة ثابتة مع عقد مراقبة شهري اختياري", en: "Fixed package plus an optional monthly monitoring retainer" },
    skills: ["wifi", "site-survey", "vlans", "qos", "captive-portal"],
    desc: {
      ar: "خدمة منتجة (باقة محددة) تشمل مسحاً ميدانياً وخطة قنوات وفصل VLAN لضيوف الشبكة وتحسين أولوية QoS وتقرير تجربة ضيف مصور. الجمهور المستهدف: الفنادق البوتيك التي تشتكي تقييماتها من الواي فاي. الميزة التنافسية: تربط التحسينات بمؤشر تقييمات الضيوف على منصات الحجز، وهو الرقم الذي يفهمه صاحب الفندق.",
      en: "A productized service: on-site survey, channel plan, guest VLAN separation, QoS tuning, and a photo-rich guest-experience report. Target: boutique hotels whose reviews mention Wi-Fi. Differentiator: you tie improvements to the review score on booking platforms — the one number the owner actually tracks."
    },
    steps: [
      { ar: "جهّز حزمة المسح (جهاز مسح محمول + قوالب تقارير) وحدد تسعير الباقة الواحدة", en: "Prepare the survey kit (portable survey device + report templates) and set single-package pricing" },
      { ar: "ابنِ عرض مبيعات يربط كل إصلاح بنوع تعليق الضيوف الذي يعالجه", en: "Build a sales pitch linking each fix to the type of guest complaint it eliminates" },
      { ar: "قدّم أول مشروع تجريبي بخصم مقابل صور قبل/بعد وتقييم محدث", en: "Deliver a discounted first project in exchange for before/after photos and an updated review" },
      { ar: "فعّل التوصية المتبادلة عبر وكالات إدارة الفنادق الصغيرة", en: "Activate referrals through small hotel management agencies" },
      { ar: "أضف عقد مراقبة شهري (تنبيهات انقطاع الأجهزة) كدخل متكرر", en: "Add a monthly monitoring retainer (device-down alerts) as recurring revenue" }
    ],
  },
  {
    id: "p131",
    title: { ar: "إعداد واي فاي مجاني آمن للمراكز المجتمعية", en: "Community Center Free Wi-Fi Setup" },
    category: "freelance",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1000$ شهرياً", en: "$200-1000/mo" },
    monetization: { ar: "رسوم تركيب مخفضة مع خطة صيانة رمزية للجهة", en: "Discounted install fees with a low-cost care plan for the organization" },
    skills: ["wifi", "firewall", "captive-portal", "qos"],
    desc: {
      ar: "تصميم وتركيب شبكة واي فاي مجانية وآمنة للمساجد والمراكز المجتمعية: فلترة محتوى وتوزيع عادل للنطاق وصفحة هبوط أنيقة اختيارية لدعم الجهة بالتبرعات. الجمهور المستهدف: الجهات الدينية والمجتمعية والمبادرات التطوعية. الميزة التنافسية: تصميم صفحة هبوط محترمة ووثائق صيانة يستطيع متطوع غير تقني اتباعها.",
      en: "Design and install safe free Wi-Fi for mosques and community centers: content filtering, fair bandwidth shaping, and an optional elegant splash page supporting the organization's donations. Target: religious and community organizations and volunteer initiatives. Differentiator: a dignified splash-page design plus maintenance docs a non-technical volunteer can follow."
    },
    steps: [
      { ar: "جهّز قائمة معدات اقتصادية جيدة الأداء تناسب ميزانيات الجهات غير الربحية", en: "Assemble an affordable high-value equipment list suited to nonprofit budgets" },
      { ar: "صمّم صفحة الهبوط مع خيار تبرع اختياري غير مزعجة للزائر", en: "Design the splash page with an optional non-intrusive donation element" },
      { ar: "أنجز أول تركيب في مركز مجتمعي متعاون مقابل توصية مكتوبة", en: "Complete the first install at a cooperative community center in exchange for a written referral" },
      { ar: "سوّق عبر خطباء ومسؤولي الجهات ومجموعات العمل التطوعي المحلية", en: "Market through community leaders and local volunteer groups" },
      { ar: "بِع خطة صيانة سنوية رمزية (زيارة فصلية + تحديثات فلترة)", en: "Sell a modest annual care plan (quarterly visit + filter updates)" }
    ],
  },
  {
    id: "p132",
    title: { ar: "بوابة واي فاي تسويقية للمطاعم", en: "Restaurant Wi-Fi Marketing Portal" },
    category: "freelance",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "رسوم إعداد + اشتراك شهري للبوابة وإدارة القوائم البريدية", en: "Setup fee plus monthly portal and mailing-list management" },
    skills: ["captive-portal", "wifi", "api", "firewall"],
    desc: {
      ar: "بوابات هبوط تعرض عرض اليوم وتجمع بريد أو رقم واتساب بموافقة صريحة مقابل الواي فاي المجاني، وتصلك البيانات مباشرة لقائمة تسويق المطعم. الجمهور المستهدف: المطاعم والمقاهي التي تملك واي فاي ضعيف التسويق. الميزة التنافسية: تبيع نتيجة تسويقية لا عتاداً — البوابة تسدد كلفتها من القائمة البريدية الأولى.",
      en: "Captive portals that display today's promo and collect email or WhatsApp opt-ins in exchange for free Wi-Fi, feeding the restaurant's marketing list automatically. Target: restaurants and cafés with Wi-Fi that markets nothing. Differentiator: you sell a marketing outcome, not hardware — the portal pays for itself with the first campaign."
    },
    steps: [
      { ar: "ابنِ نموذج البوابة الأساسي على راوتر يدعم captive portal مع دمج أدوات التسويق", en: "Build the base portal on a captive-portal-capable router with marketing-tool integrations" },
      { ar: "اختبر تجربة الضيف حتى تكون أقل من ثلاث نقرات للاتصال", en: "Test the guest flow until connecting takes fewer than three taps" },
      { ar: "نفّذ مشروعاً تجريبياً في مطعم واحد مقابل بيانات نمو القائمة البريدية", en: "Run a pilot at one restaurant in exchange for mailing-list growth data" },
      { ar: "بِع باقة إعداد ثابتة واشتراكاً شهرياً يشمل تحديث العروض الموسمية", en: "Sell a fixed setup package plus a monthly subscription covering seasonal promo updates" },
      { ar: "أضف لوحة تقارير شهرية تعرض عدد الاتصالات وعدد التسجيلات الجديدة", en: "Add a monthly report dashboard showing connections and new signups" }
    ],
  },
  {
    id: "p133",
    title: { ar: "تقسيم شبكة واي فاي النوادي الرياضية", en: "Gym Member Wi-Fi Segmentation" },
    category: "freelance",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "200-1000$ شهرياً", en: "$200-1000/mo" },
    monetization: { ar: "باقة ثابتة لكل فرع مع عقد فحص نصف سنوي", en: "Fixed per-site package with a semi-annual checkup contract" },
    skills: ["vlans", "wifi", "qos", "radius"],
    desc: {
      ar: "خدمة تفصل شبكات SSID وVLAN للأعضاء والموظفين وأجهزة الإنترنت (مكبرات الصوت والكاميرات) مع حدود نطاق تمنع البث من خنق نظام نقاط البيع. الجمهور المستهدف: النوادي الرياضية والاستوديوهات. الميزة التنافسية: إعداد بزيارة واحدة مع خريطة تغطية مرسومة للأرضية تبرر السعر مباشرة.",
      en: "A service separating SSIDs and VLANs for members, staff, and IoT (speakers, cameras) with bandwidth caps that keep streaming from strangling the POS. Target: gyms and studios. Differentiator: one-visit setup plus a drawn floor-coverage map that instantly justifies the price."
    },
    steps: [
      { ar: "وثّق نمط التقسيم القياسي (عضو/موظف/إنترنت الأشياء) قابل التطبيق على أي نادٍ", en: "Document the standard segmentation pattern (member/staff/IoT) applicable to any gym" },
      { ar: "جهّز قائمة أجهزة موثوقة تناسب تسعيرة النوادي الصغيرة", en: "Prepare a trusted equipment list that fits small-gym budgets" },
      { ar: "نفّذ أول نادٍ مقابل شهادة مصورة قبل/بعد وتوصية للمالكين الآخرين", en: "Do the first gym in exchange for a photo case study and an owners-group referral" },
      { ar: "بِع باقة لكل فرع مع خريطة تغطية ومستند تسليم موثق", en: "Sell a per-site package with coverage map and documented handover" },
      { ar: "أضف فحصاً نصف سنوي مع تقرير استخدام موجز كعقد متكرر", en: "Add a semi-annual audit with a usage summary report as a recurring contract" }
    ],
  },
  {
    id: "p134",
    title: { ar: "عزل شبكة الزوار في العيادات", en: "Clinic Guest Network Isolation" },
    category: "freelance",
    difficulty: 3,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "300-1500$ شهرياً", en: "$300-1500/mo" },
    monetization: { ar: "باقة تدقيق وتنفيذ مع شهادة سنوية قابلة للتجديد", en: "Audit + implementation package with a renewable annual certificate" },
    skills: ["vlans", "firewall", "radius", "security"],
    desc: {
      ar: "خدمة تعزل واي فاي الزوار تماماً عن الأجهزة الطبية وأنظمة السجلات الصحية، مع قائمة فحص امتثال ولوحات إرشادية للمرضى وشهادة موثقة للعيادة. الجمهور المستهدف: عيادات الطب العام وطب الأسنان والمراكز الطبية. الميزة التنافسية: شهادة سلامة شبكة معلّقة يستطيع الطبيب عرضها للمرضى كدليل احترافية.",
      en: "A service fully isolating guest Wi-Fi from medical devices and records systems, with a compliance checklist, waiting-room signage, and a documented certificate for the clinic. Target: medical and dental clinics. Differentiator: a framed network-hygiene certificate the doctor can display to patients as proof of professionalism."
    },
    steps: [
      { ar: "ابنِ قائمة فحص الامتثال (عزل، تشفير، كلمات مرور، تحديثات) بمصطلحات واضحة", en: "Build the compliance checklist (isolation, encryption, passwords, updates) in clear terms" },
      { ar: "صمّم نمط التقسيم القياسي للعيادات (زوار/أجهزة/إدارة) بجهاز واحد متوافق", en: "Design the standard clinic segmentation pattern (guest/devices/admin) on one capable device" },
      { ar: "نفّذ أول عيادة بخصم مقابل دراسة حالة وتوصية في مجتمع الأطباء", en: "Deliver a first discounted clinic in exchange for a case study and referral in the medical community" },
      { ar: "بِع الباقة (تدقيق + تنفيذ + شهادة) بسعر ثابت واضح", en: "Sell the package (audit + implementation + certificate) at one clear fixed price" },
      { ar: "أضف تجديداً سنوياً للشهادة مع فحص سريع يتكرر كدخل سنوي", en: "Add an annual certificate renewal with a quick recheck as recurring annual income" }
    ],
  },
  {
    id: "p135",
    title: { ar: "إعداد وصول آمن عن بعد لمكاتب المحاماة", en: "Law Firm Secure Remote Access" },
    category: "freelance",
    difficulty: 4,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "500-2500$ شهرياً", en: "$500-2500/mo" },
    monetization: { ar: "أتعاب المشروع مع عقد إدارة ومراجعة شهري", en: "Project fee plus a monthly managed-access retainer" },
    skills: ["vpn", "firewall", "radius", "security"],
    desc: {
      ar: "إعداد وصول عن بعد بمستوى أمان عالٍ للمحامين: ملفات VPN لكل مستخدم وتوثيق متعدد العوامل وسياسات تقسيم الأنفاق وسجل تدقيق للاستخدام. الجمهور المستهدف: مكاتب المحاماة الصغيرة الملتزمة بسرية المعلومات. الميزة التنافسية: وثيقة سياسة مكتوبة بلغة الامتياز القانوني تحمي المكتب وتفهمها إدارة المخاطر.",
      en: "High-assurance remote access for attorneys: per-user VPN profiles, MFA, split-tunnel policies, and a usage audit log. Target: small law firms with confidentiality obligations. Differentiator: a policy document written in legal-privilege language that protects the firm and satisfies risk reviews."
    },
    steps: [
      { ar: "ابنِ نمط النشر المرجعي (جدار ناري + VPN بمصادقة RADIUS + سجلات مركزية)", en: "Build the reference deployment pattern (firewall + RADIUS-authenticated VPN + centralized logging)" },
      { ar: "ألّف وثيقة السياسة القانونية السرية بمراجعة صياغة من مستشار قانوني مطلع", en: "Author the confidentiality policy document reviewed for wording by a legal advisor" },
      { ar: "قدّم مشروعاً تجريبياً لمكتب صغير مقابل شهادة مرجعية موقعة", en: "Deliver a pilot for one small firm in exchange for a signed reference" },
      { ar: "سوّق عبر مجتمعات المحامين ومديري المكاتب بمخاطر الاختراق المتخصصة", en: "Market through lawyer communities and office managers with specific breach risks" },
      { ar: "أضف عقد إدارة شهرياً (مراجعة سجلات + إدارة مستخدمين) يبني دخلاً متكرراً", en: "Add a monthly managed retainer (log review + user management) building recurring revenue" }
    ],
  },
  {
    id: "p136",
    title: { ar: "فحص تمديدات الكابلات قبل استلام العقارات الجديدة", en: "Real-Estate Pre-Wiring Inspection" },
    category: "freelance",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "400-2000$ شهرياً", en: "$400-2000/mo" },
    monetization: { ar: "رسوم لكل فحص مع عقود إطار للمطورين العقاريين", en: "Per-inspection fees plus framework contracts with developers" },
    skills: ["cabling", "testing", "documentation", "racking"],
    desc: {
      ar: "فحص ميداني لتمديدات الكابلات في المباني الجديدة قبل الاستلام: اختبار كل نقطة، تحقق التسميات، كشف الأزواج المقلوبة، وتقرير مصور يسلّم للمشتري. الجمهور المستهدف: مشترو المنازل الجديدة والمطورون الصغار. الميزة التنافسية: فحص 30 دقيقة يوفر على المشتري آلاف الدولارات من إصلاحات لاحقة تكسر الجدران.",
      en: "A field inspection of new-build cabling before handover: test every drop, verify labeling, catch split pairs, and deliver a photo report to the buyer. Target: new-home buyers and small developers. Differentiator: a 30-minute inspection that saves buyers thousands in later wall-tearing repairs."
    },
    steps: [
      { ar: "جهّز حزمة الفحص (مختبر إسناد معتمد + كاميرا توثيق + قالب تقرير مصور)", en: "Assemble the inspection kit (certification tester + documentation camera + photo report template)" },
      { ar: "حدد تسعيرة الفحص بحسب عدد نقاط التواصل مع تفاوت واضح", en: "Set per-inspection pricing by drop count with clear tiers" },
      { ar: "أنتج عينة تقرير احترافية تعرضها للمشترين في مجموعات المشاريع الجديدة", en: "Produce a professional sample report to showcase in new-project buyer groups" },
      { ar: "بِع خدمة الفحص كإضافة عند الاستلام مع حجز مسبق قبل شهر", en: "Sell the inspection as a handover add-on bookable a month ahead" },
      { ar: "وقّع عقد إطار مع مطور صغير لفحص كل وحداته قبل التسليم", en: "Sign a framework contract with a small developer to inspect every unit pre-delivery" }
    ],
  },

  // ═══ LAB (p137–p143) ═══
  {
    id: "p137",
    title: { ar: "حزمة ملعب BGP بالمختبرات التفاعلية", en: "BGP Playground Config Pack" },
    category: "lab",
    difficulty: 4,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "300-1600$ شهرياً", en: "$300-1600/mo" },
    monetization: { ar: "بيع الحزمة مع اشتراك مختبرات شهرية جديدة", en: "Pack sales plus a monthly new-labs subscription" },
    skills: ["bgp", "routing", "containerlab", "linux", "automation"],
    desc: {
      ar: "25 طوبولوجيا containerlab أو GNS3 تستكشف BGP من التأسيس إلى الفلترة والمجتمعات وهجمات اختطاف المسارات، مع مفتاح حل وأوامر تحقق لكل مختبر. الجمهور المستهدف: مهندسو الشبكات المستعدون لمقابلات أو امتحانات معمقة. الميزة التنافسية: كل مختبر يتحقق من حله آلياً بسكربت فيعرف المتعلم أنه حل فعلًا لا أنه يظن ذلك.",
      en: "25 containerlab or GNS3 topologies exploring BGP from first peering to filters, communities, and route-hijack attacks, each with an answer key and verification commands. Target: engineers prepping for deep interviews or labs. Differentiator: every lab auto-verifies with a script, so learners know they actually solved it rather than believing they did."
    },
    steps: [
      { ar: "ابنِ أول خمس طوبولوجيات على containerlab مع سكربتات تحقق تعمل بلا تعديل", en: "Build the first 5 containerlab topologies with verification scripts that run unmodified" },
      { ar: "أضف دليل PDF لكل مختبر (الهدف، الأوامر، الفخاخ الشائعة، مفتاح الحل)", en: "Add a per-lab PDF guide (objective, commands, common traps, solution key)" },
      { ar: "أطلق حزمة أولى من 10 مختبرات بسعر تجريبي واجمع ملاحظات المتعلمين", en: "Launch a first 10-lab bundle at a trial price and gather learner feedback" },
      { ar: "وسّع إلى 25 مختبراً وأضف مسارات الصعوبة (مبتدئ إلى متقدم)", en: "Expand to 25 labs and add difficulty tracks (beginner through advanced)" },
      { ar: "فعّل اشتراكاً شهرياً يضيف مختبرين جديدين كل شهر للمشتركين", en: "Enable a monthly subscription adding two new labs per month for subscribers" }
    ],
  },
  {
    id: "p138",
    title: { ar: "مختبرات اكسِر وأصلِح", en: "Break & Fix Lab Packs" },
    category: "lab",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "250-1500$ شهرياً", en: "$250-1500/mo" },
    monetization: { ar: "بيع الحزم مع نسخ مدربين بترخيص صفّي", en: "Bundle sales plus trainer-licensed classroom editions" },
    skills: ["troubleshooting", "routing", "switching", "ospf"],
    desc: {
      ar: "طوبولوجيات معطوبة عمداً (مسارات غير متناظرة، ثقوب سوداء، تسريب VLAN، خادم DHCP دخيل) مع موجز بأسلوب تذكرة دعم وحل مخفي حتى النهاية. الجمهور المستهدف: موظفو NOC ومدربو الدورات. الميزة التنافسية: أسلوب التذكرة يحاكي العمل الواقعي لا تمارين الكتب المدرسية، والتحقق يخبرك متى أصلحت الشبكة فعلاً.",
      en: "Deliberately broken topologies (asymmetric routes, blackholes, VLAN leaks, a rogue DHCP server) with a ticket-style brief and a solution hidden until the end. Target: NOC staff and course instructors. Differentiator: the ticket format mirrors real work rather than textbook exercises, and verification tells you when the network is truly fixed."
    },
    steps: [
      { ar: "ابنِ قائمة 15 عطلاً واقعياً موزعة على التوجيه والتبديل والخدمات", en: "List 15 realistic faults spread across routing, switching, and services" },
      { ar: "صمّم قالب التذكرة (الأعراض، نطاق التأثير، أدلة أولية) لكل حالة", en: "Design the ticket template (symptoms, impact scope, initial evidence) for each case" },
      { ar: "أضف سكربت تحقق يفحص عودة الخدمة دون كشف مكان العطل", en: "Add a verification script checking service restoration without revealing the fault location" },
      { ar: "أطلق الحزمة الأولى (10 حالات) في متجر رقمي مع عينة مجانية", en: "Launch the first pack (10 cases) in a digital store with one free sample" },
      { ar: "أضف نسخة مدرّبين بأكثر من 30 حالة وحقوق استخدام صفّي", en: "Add a trainer edition with 30+ cases and classroom usage rights" }
    ],
  },
  {
    id: "p139",
    title: { ar: "مختبرات بروفة يوم الامتحان الموقوتة", en: "Exam-Day Rehearsal Labs" },
    category: "lab",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "حزم لكل مسار شهادة مع تقرير أداء مدفوع بعد التدريب", en: "Per-cert-track packs with a paid post-run performance report" },
    skills: ["routing", "switching", "subnetting", "troubleshooting"],
    desc: {
      ar: "مختبرات محاكاة موقوتة بساعة صارمة وأسئلة مشتتة وتقرير درجات، مصممة لمحاكاة ضغط يوم الامتحان الفعلي. الجمهور المستهدف: المرشحون في الأسابيع الأخيرة قبل الشهادة. الميزة التنافسية: التحليل بعد التشغيل يظهر بالضبط أي هدف من أهداف الامتحان يستهلك وقتك أكثر من اللازم.",
      en: "Timed lab simulations with a strict clock, distractor questions, and a scoring report — built to reproduce real certification-exam pressure. Target: candidates in their final two weeks. Differentiator: the post-run analysis shows exactly which exam objective is eating your time."
    },
    steps: [
      { ar: "حلّل بنية الامتحان المستهدف وزمن كل قسم لبناء نموذج توقيت واقعي", en: "Analyze the target exam blueprint and section timings to build a realistic timing model" },
      { ar: "ابنِ مختبرين تجريبيين متكاملين مع مؤقت ودرجات ومشتتات", en: "Build two complete trial labs with timer, scoring, and distractors" },
      { ar: "أطلق نسخة تجريبية مجانية لجمع بيانات زمن الإنجاز الفعلية", en: "Launch a free trial to collect real completion-time data" },
      { ar: "بِع حزم المسار الكامل (5 محاكاة) بسعر أقل من سعر المحاكاة الواحدة من المنافسين", en: "Sell the full track pack (5 simulations) priced below competitors' single-sim cost" },
      { ar: "أضف خدمة تقرير أداء مفصل يشرح أخطاء الزمن لا فقط الإجابات", en: "Add a detailed performance report service explaining timing errors, not just wrong answers" }
    ],
  },
  {
    id: "p140",
    title: { ar: "دليل مختبر IPv6 الصرف المنزلي", en: "IPv6-Only Home Lab Guide" },
    category: "lab",
    difficulty: 3,
    timeToMarket: { ar: "شهر", en: "1 month" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "بيع الدليل والمختبرات رقمياً كحزمة واحدة", en: "Sell the guide and labs as one digital bundle" },
    skills: ["ipv6", "routing", "dns", "dhcp"],
    desc: {
      ar: "مسار كامل لبناء مختبر منزلي يعمل بـIPv6 فقط مع مخارج NAT64 وDNS64، يتضمن 15 مختبراً متدرجاً من التهيئة إلى استكشاف الأخطاء. الجمهور المستهدف: المهندسون الذين يؤجلون IPv6 منذ سنوات. الميزة التنافسية: الدليل الوحيد الذي يتيح لك الاستمرار في التصفح والعمل بينما مختبرك يعمل بـIPv6 صرف.",
      en: "A complete path to an IPv6-only home lab with NAT64 and DNS64 escape hatches, including 15 progressive labs from addressing to troubleshooting. Target: engineers who have postponed IPv6 for years. Differentiator: the only guide that lets you keep browsing and working while your lab runs v6-only."
    },
    steps: [
      { ar: "ابنِ المختبر المرجعي في منزلك ووثّق كل خطوة بأخطائها الحقيقية", en: "Build the reference lab in your own home and document every step including real mistakes" },
      { ar: "ألّف 15 مختبراً متدرجاً بحيث يعتمد كل واحد على سابقه", en: "Write 15 progressive labs where each builds on the previous one" },
      { ar: "اختبر المسار كاملاً على جهازين مختلفين للتأكد من قابلية التكرار", en: "Test the full path on two different machines to confirm reproducibility" },
      { ar: "أطلق الحزمة على Gumroad مع فصل تجريبي مجاني ومجتمع دعم للمشترين", en: "Launch on Gumroad with a free sample chapter and a buyer support community" },
      { ar: "أضف مساراً متقدماً (تجزئة الشبكات والأمان في IPv6) كترقية لاحقة", en: "Add an advanced track (IPv6 subnetting and security) as a later upsell" }
    ],
  },
  {
    id: "p141",
    title: { ar: "100 تمرين أتمتة شبكات متدرجة", en: "100 Network Automation Exercises" },
    category: "lab",
    difficulty: 4,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "400-2000$ شهرياً", en: "$400-2000/mo" },
    monetization: { ar: "بيع الحزمة مع دفعة تدريب موجهة كترقية", en: "Pack sales with a mentored cohort upsell" },
    skills: ["python", "ansible", "git", "api", "automation"],
    desc: {
      ar: "حزمة من 100 تمرين متدرجة الصعوبة: من نسخ إعداد مبدّل واحد إلى بناء نظام ربط ذاتي للمسارات BGP، مع اختبارات ومختبر Docker لكل تمرين. الجمهور المستهدف: مسؤولو الشبكات الذين يريدون أتمتة أعمالهم اليومية. الميزة التنافسية: كل تمرين يعمل على حاويات محلية — لا حاجة لشراء أي عتاد.",
      en: "A graded ladder of 100 exercises: from backing up one switch to building a self-healing BGP setup, with tests and a Docker lab for each. Target: network admins automating their daily jobs. Differentiator: every exercise runs against local containers — no gear purchases needed."
    },
    steps: [
      { ar: "صمّم المسار التعليمي المتدرج بحيث يقابل كل 10 تمارين مستوى مهارة واضحاً", en: "Design the learning ladder so every 10 exercises maps to a clear skill level" },
      { ar: "ابنِ مختبر الحاويات الأساسي وسكربت الدرجات لكل تمرين", en: "Build the base container lab and per-exercise grading scripts" },
      { ar: "أطلق أول 20 تمريناً بخصم تأسيسي واجمع معدلات الإكمال", en: "Launch the first 20 exercises at a founding discount and track completion rates" },
      { ar: "أكمل المئة تمرين مع مراجعة صعوبة بناءً على بيانات المستخدمين", en: "Complete the 100 exercises with difficulty tuning based on user data" },
      { ar: "أضف دفعة إرشاد جماعية شهرية للمشترين كترقية عالية الهامش", en: "Add a monthly group-coaching cohort for buyers as a high-margin upsell" }
    ],
  },
  {
    id: "p142",
    title: { ar: "مختبرات سيناريوهات استكشاف الواي فاي", en: "Wi-Fi Troubleshooting Scenario Labs" },
    category: "lab",
    difficulty: 2,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "150-900$ شهرياً", en: "$150-900/mo" },
    monetization: { ar: "بيع حزم السيناريوهات للفرق مع ترخيص مدرّب", en: "Scenario deck sales to teams plus a trainer license" },
    skills: ["wifi", "troubleshooting", "site-survey", "packet-analysis"],
    desc: {
      ar: "12 بطاقة سيناريو واقعية: قاعة اجتماعات تتقطع مكالماتها عند الثالثة عصراً — كل بطاقة تحمل التقاطات حزم وإحصاءات نقاط وصول ومخطط تشخيص للعمل عليه. الجمهور المستهدف: موظفو الدعم الفني المنتقلون إلى اللاسلكي. الميزة التنافسية: تعلّم التشخيص من الأدلة لا من الحقائق المحفوظة.",
      en: "12 realistic scenario cards: a meeting room that drops calls at 3pm — each card carries packet captures, AP statistics, and a diagnosis flowchart to work through. Target: helpdesk staff moving into wireless. Differentiator: it teaches diagnosis from evidence, not memorized facts."
    },
    steps: [
      { ar: "اجمع سيناريوهات واقعية من خبرتك أو من مجتمعات الدعم الفني", en: "Collect realistic scenarios from your own experience or support communities" },
      { ar: "جهّز الأدلة لكل سيناريو (ملفات التقاط مصغرة، جداول إحصاءات، مخططات تغطية)", en: "Prepare evidence per scenario (small capture files, stats tables, coverage diagrams)" },
      { ar: "صمّم مخطط التشخيص المرجعي الذي يقود للسبب الجذري خطوة خطوة", en: "Design the reference diagnosis flowchart leading step-by-step to root cause" },
      { ar: "أطلق الحزمة في متجر رقمي مع سيناريو مجاني واحد كمذاق", en: "Launch the deck in a digital store with one free sample scenario" },
      { ar: "بِع نسخة فرق مدربة الترخيص لمسؤولي التدريب في الشركات", en: "Sell a team-licensed edition to corporate training leads" }
    ],
  },
  {
    id: "p143",
    title: { ar: "سلسلة مختبرات أنسجة Spine-Leaf بـEVPN/VXLAN", en: "Spine-Leaf EVPN/VXLAN Fabric Lab Series" },
    category: "lab",
    difficulty: 5,
    timeToMarket: { ar: "شهران", en: "2 months" },
    revenue: { ar: "300-1800$ شهرياً", en: "$300-1800/mo" },
    monetization: { ar: "سلسلة مدفوعة مع جلسة إرشاد أسبوعية مباشرة", en: "Premium series with weekly live mentored sessions" },
    skills: ["bgp", "vxlan", "routing", "linux", "automation"],
    desc: {
      ar: "سلسلة متقدمة تبني أنسجة EVPN/VXLAN خطوة بخطوة في containerlab مع تدريبات الأعطال وتحديات هندسة المرور. الجمهور المستهدف: المهندسون الطامحون لأدوار مراكز البيانات. الميزة التنافسية: مسؤولو التوظيف يحترمون مستودع GitHub فيه إعدادات أنسجة تعمل فعلاً، فيصبح مخرج السلسلة بطاقة دخول مهنية.",
      en: "An advanced series building EVPN/VXLAN fabrics step by step in containerlab with failure drills and traffic-engineering challenges. Target: engineers breaking into datacenter roles. Differentiator: hiring managers respect a GitHub repo of working fabric configs, so the series output becomes a career card."
    },
    steps: [
      { ar: "ابنِ النسيج المرجعي على containerlab بأربعة أوراق وعمودين فقاريين", en: "Build the reference fabric on containerlab with four leaves and two spines" },
      { ar: "قسّم البناء إلى حلقات تعليمية (تحته، تراكب، خدمات، صلابة)", en: "Split the build into teaching rings (underlay, overlay, services, resilience)" },
      { ar: "أضف تدريبات الأعطال التي تكسر النسيج عمداً ليعمل المتعلم على إنقاذه", en: "Add failure drills that deliberately break the fabric for learners to rescue" },
      { ar: "أطلق السلسلة بسعر تأسيسي للمجموعة الأولى (20 مقعداً) مع جلسة أسبوعية", en: "Launch at a founding price for the first 20 seats with a weekly live session" },
      { ar: "وثّق مخرجات المتعلمين في مستودعات عامة كأدلة تسويق للدفعة التالية", en: "Showcase learner output in public repos as marketing for the next cohort" }
    ],
  },

  // ═══ TEMPLATES (p144–p150) ═══
  {
    id: "p144",
    title: { ar: "أدوار Ansible جاهزة للمبدّلات الشائعة", en: "Ansible Roles for Common Switches" },
    category: "templates",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "250-1500$ شهرياً", en: "$250-1500/mo" },
    monetization: { ar: "بيع الحزمة مع طلبات أدوار مخصصة للشركات", en: "Pack sales plus custom-role requests from companies" },
    skills: ["ansible", "automation", "cli", "git"],
    desc: {
      ar: "أدوار Ansible مجربة للعمل مع Cisco IOS وAruba وMikroTik: دفع إعدادات VLAN وتعزيز NTP وتهيئة SNMP مع اختبارات تحقق مدمجة. الجمهور المستهدف: فرق الشبكات التي تخطو أولى خطوات الأتمتة. الميزة التنافسية: الأدوار تعمل من أول تشغيل على طوبولوجيا containerlab مرفقة مع الحزمة.",
      en: "Battle-tested Ansible roles for Cisco IOS, Aruba, and MikroTik: VLAN pushes, NTP hardening, and SNMP configuration with built-in verification tests. Target: network teams taking their first automation steps. Differentiator: the roles work out of the box against a containerlab topology shipped with the pack."
    },
    steps: [
      { ar: "ابنِ الدور الأول لVLAN على Cisco IOS مع اختبارات تحقق آلية", en: "Build the first VLAN role for Cisco IOS with automated verification tests" },
      { ar: "كرر النمط لبائعين آخرين مع توحيد المتغيرات بين الأدوار", en: "Repeat the pattern for two more vendors while unifying variables across roles" },
      { ar: "أرفق طوبولوجيا containerlab تجريبية تعمل بسكربت واحد", en: "Attach a demo containerlab topology that boots with one script" },
      { ar: "أطلق الحزمة على Gumroad مع توثيق كامل وأمثلة جاهزة للنسخ", en: "Launch on Gumroad with full documentation and copy-ready examples" },
      { ar: "استقبل طلبات الأدوار المخصصة بأسعار ثابتة كخدمة مكمّلة", en: "Take custom-role requests at fixed prices as a complementary service" }
    ],
  },
  {
    id: "p145",
    title: { ar: "أطقم Terraform لبدايات VPC السحابية", en: "Terraform VPC Starter Kits" },
    category: "templates",
    difficulty: 3,
    timeToMarket: { ar: "3 أسابيع", en: "3 weeks" },
    revenue: { ar: "300-1600$ شهرياً", en: "$300-1600/mo" },
    monetization: { ar: "بيع الأطقم مع ساعة استشارة مدفوعة لكل مشترٍ", en: "Kit sales with a paid consulting hour attached to every purchase" },
    skills: ["terraform", "cloud", "aws", "automation"],
    desc: {
      ar: "وحدات Terraform قابلة لإعادة الاستخدام لأنماط VPC الشائعة: تطبيق ثلاثي الطبقات ومركز وأطراف وشبكة خاصة فقط مع بوابة NAT، مع وسوم تكلفة ورسوم تخطيط مصورة. الجمهور المستهدف: صغار مهندسي السحابة والمكاتب الاستشارية الصغيرة. الميزة التنافسية: كل طقم يتضمن جدول تقدير تكلفة وتصميماً آمناً ضد أخطاء الحذف المدمر.",
      en: "Reusable Terraform modules for common VPC patterns: 3-tier web, hub-and-spoke, and private-only with NAT — with cost tags and illustrated plan diagrams. Target: cloud juniors and small consultancies. Differentiator: every kit includes a cost estimate table and a destroy-safe design guarding against expensive teardown mistakes."
    },
    steps: [
      { ar: "ابنِ الطقم الأول (تطبيق ثلاثي الطبقات) واختبره من الصفر ثلاث مرات", en: "Build the first kit (3-tier web) and test it from scratch three times" },
      { ar: "أضف جدول تقدير التكلفة الشهرية لكل حجم نشر مدعوم", en: "Add a monthly cost-estimate table for every supported deployment size" },
      { ar: "وسّع لأنماط إضافية (مركز وأطراف، خاص فقط) بنفس بنية المتغيرات", en: "Expand to additional patterns (hub-and-spoke, private-only) with the same variable structure" },
      { ar: "أطلق على Gumroad مع مخططات معمارية مصورة لكل طقم", en: "Launch on Gumroad with illustrated architecture diagrams per kit" },
      { ar: "أضف خيار ساعة استشارة عند الشراء لتخصيص الطقم على حساب العميل", en: "Add a consulting-hour purchase option to customize the kit on the client's account" }
    ],
  },
  {
    id: "p146",
    title: { ar: "حزم لوحات Grafana جاهزة للاستيراد", en: "Grafana Dashboard JSON Packs" },
    category: "templates",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "150-1000$ شهرياً", en: "$150-1000/mo" },
    monetization: { ar: "بيع الحزمة مع خدمات لوحات مخصصة حسب الطلب", en: "Pack sales plus custom dashboard gigs" },
    skills: ["monitoring", "snmp", "analytics", "linux"],
    desc: {
      ar: "15 لوحة Grafana قابلة للاستيراد مباشرة: مرور الواجهات وجلسات BGP وعملاء الواي فاي وحجب جدار الحماية، مع إعدادات المصادر SNMP/Prometheus المطابقة. الجمهور المستهدف: فرق NOC التي تبدأ مشاريع المراقبة. الميزة التنافسية: اللوحات تتطابق مع حزمة مصادر مرفقة فتعمل من أول استيراد دون تعديل.",
      en: "15 ready-to-import Grafana dashboards: interface traffic, BGP sessions, Wi-Fi clients, firewall drops — with matching SNMP/Prometheus exporter configs. Target: NOC teams starting monitoring projects. Differentiator: dashboards match an included exporter stack so they work on first import without edits."
    },
    steps: [
      { ar: "ابنِ حزمة المصادر المرجعية (exporters) التي تعمل بسكربت واحد", en: "Build the reference exporter stack that runs with one script" },
      { ar: "صمّم أول ثلاث لوحات مع عتبات ألوان منطقية وحدود إنذار مقترحة", en: "Design the first 3 dashboards with sensible color thresholds and suggested alert limits" },
      { ar: "اختبر الاستيراد على تثبيت Grafana نظيف تماماً للتأكد من صفر التعديلات", en: "Test import on a totally clean Grafana install to guarantee zero edits needed" },
      { ar: "أطلق الحزمة كاملة (15 لوحة) مع دليل تثبيت مفصل بالصور", en: "Launch the full pack (15 dashboards) with a photo-rich install guide" },
      { ar: "بِع خدمة لوحة مخصصة (لوحة واحدة لمصدر العميل) بسعر ثابت", en: "Sell a custom dashboard service (one dashboard for the client's data source) at a fixed price" }
    ],
  },
  {
    id: "p147",
    title: { ar: "قوالب استيراد NetBox من الجداول الفوضوية", en: "NetBox Import Templates" },
    category: "templates",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "100-700$ شهرياً", en: "$100-700/mo" },
    monetization: { ar: "بيع القوالب مع خدمة تنظيف بيانات مدفوعة", en: "Template sales plus a paid data-cleanup service" },
    skills: ["ip-addressing", "automation", "python", "documentation"],
    desc: {
      ar: "مخططات CSV وسكربتات تحويل تحوّل جداول Excel الفوضوية (مواقع، خزائن، أجهزة، كابلات) إلى استيراد NetBox نظيف مع قواعد تحقق صارمة. الجمهور المستهدف: الفرق التي تتبنى NetBox لأول مرة. الميزة التنافسية: خطوة التحقق تلتقط 90% من البيانات السيئة قبل الاستيراد فتمنع الكارثة الشائعة.",
      en: "CSV schemas and transform scripts that turn messy Excel sheets (sites, racks, devices, cables) into clean NetBox imports with strict validation rules. Target: teams adopting NetBox for the first time. Differentiator: the validation step catches 90% of bad data before import, preventing the classic migration disaster."
    },
    steps: [
      { ar: "حلّل أشكال الجداول الشائعة في الشركات وصمّم مخطط CSV مرجعياً", en: "Analyze common corporate sheet shapes and design a reference CSV schema" },
      { ar: "ابنِ سكربت التحقق الذي يلتقط التسميات المكررة والنطاقات غير الصالحة", en: "Build the validation script catching duplicate names and invalid ranges" },
      { ar: "أرفق مثال جدول فوضوي وحله النهائي كمادة تدريبية", en: "Attach a messy sample sheet and its final result as training material" },
      { ar: "أطلق على Gumroad مع فيديو تحويل من الفوضى إلى NetBox في 10 دقائق", en: "Launch on Gumroad with a video of chaos-to-NetBox in 10 minutes" },
      { ar: "قدّم خدمة تنظيف البيانات كاملة لمن لا يريد فعلها بنفسه", en: "Offer a done-for-you data cleanup service for those who prefer not to DIY" }
    ],
  },
  {
    id: "p148",
    title: { ar: "قوالب دليل العمل المناوب للطوارئ", en: "On-Call Runbook Templates" },
    category: "templates",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "100-600$ شهرياً", en: "$100-600/mo" },
    monetization: { ar: "بيع الحزمة مع خدمات تخصيص للشركات", en: "Pack sales plus company customization gigs" },
    skills: ["documentation", "troubleshooting", "monitoring"],
    desc: {
      ar: "20 دليل عمل جاهزاً للملء يغطي الحوادث الكلاسيكية: تذبذب BGP وانقطاع DNS ومنفذ يتذبذب وVPN متوقف — مع قوائم فرز وقوالب اتصال جاهزة. الجمهور المستهدف: قادة NOC الفارغون من التوثيق. الميزة التنافسية: قوالب الاتصال بالعربية والإنجليزية جاهزة للصق أثناء الحادثة نفسها.",
      en: "20 fill-in-the-blank runbooks covering classic incidents: BGP flap, DNS outage, a flapping port, VPN down — with triage checklists and paste-ready comms templates. Target: NOC leads with no documentation. Differentiator: Arabic/English comms templates you can paste mid-incident."
    },
    steps: [
      { ar: "رتب الحوادث العشرين بحسب شيوعها في فرق NOC الحقيقية", en: "Rank the 20 incidents by their frequency in real NOC teams" },
      { ar: "ألّف نمط الدليل الموحد (فرز، خطوات، تصعيد، قالب إبلاغ) لكل حادثة", en: "Write the unified runbook pattern (triage, steps, escalation, status template) per incident" },
      { ar: "أضف قوالب الاتصال ثنائية اللغة لكل مستوى تقنية/إدارة", en: "Add bilingual comms templates for both technical and management audiences" },
      { ar: "أطلق الحزمة كملفات Notion وMarkdown معاً بسعر واحد", en: "Launch the pack as both Notion files and Markdown at one price" },
      { ar: "بِع خدمة تخصيص (ملء القوالب ببيانات الشركة) بعقد صغير", en: "Sell a customization service (filling templates with company specifics) as a small contract" }
    ],
  },
  {
    id: "p149",
    title: { ar: "قوالب مصفوفة التصعيد للفرق الصغيرة", en: "Escalation Matrix Templates" },
    category: "templates",
    difficulty: 1,
    timeToMarket: { ar: "أسبوع", en: "1 week" },
    revenue: { ar: "100-500$ شهرياً", en: "$100-500/mo" },
    monetization: { ar: "بيع القوالب مع ورشة تطبيق قصيرة للفريق", en: "Template sales plus a short team-implementation workshop" },
    skills: ["documentation", "monitoring", "troubleshooting"],
    desc: {
      ar: "مصفوفات تصعيد قابلة للتحرير (مستويات الخطورة، اتفاقيات زمن الاستجابة، من يوقظ من) بصيغ Excel وNotion معاً. الجمهور المستهدف: الفرق التقنية الصغيرة التي تضبط المناوبة لأول مرة. الميزة التنافسية: تتضمن قواعد التصعيد الصامت التي تفوّتها أغلب القوالب الجاهزة فتنقذ ساعات من الارتباك.",
      en: "Editable escalation matrices (severity levels, response SLAs, who-awakens-whom) in both XLSX and Notion formats. Target: small IT teams formalizing on-call for the first time. Differentiator: includes the silent-escalation rules most templates miss, saving hours of confusion during real incidents."
    },
    steps: [
      { ar: "صمّم مستويات الخطورة الأربعة القياسية مع أمثلة حوادث لكل مستوى", en: "Design the four standard severity levels with example incidents for each" },
      { ar: "ابنِ النسختين (Excel وNotion) بنفس المنطق القابل للتحرير", en: "Build both versions (Excel and Notion) with the same editable logic" },
      { ar: "أضف قسم التصعيد الصامت (متى تتصاعد دون انتظار رد)", en: "Add the silent-escalation section (when to escalate without waiting for a reply)" },
      { ar: "أطلق الحزمة عبر Gumroad مع مثال مملوء كامل كمرجع", en: "Launch on Gumroad with one fully filled example as reference" },
      { ar: "أضف ورشة تطبيق ساعة ونصف عن بعد للفرق المشترية", en: "Add a 90-minute remote implementation workshop for purchasing teams" }
    ],
  },
  {
    id: "p150",
    title: { ar: "مكتبة ردود طلبات العروض لخدمات الشبكات", en: "Network Services RFP Response Library" },
    category: "templates",
    difficulty: 2,
    timeToMarket: { ar: "أسبوعان", en: "2 weeks" },
    revenue: { ar: "200-1200$ شهرياً", en: "$200-1200/mo" },
    monetization: { ar: "بيع المكتبة مع خدمة مراجعة العروض التقنية", en: "Library sales plus a technical proposal review service" },
    skills: ["documentation", "networking", "security", "planning"],
    desc: {
      ar: "مكتبة أقسام ردود جاهزة لعروض خدمات الشبكات: المنهجية والوضع الأمني وجداول الكميات وصياغة اتفاقيات الخدمة وقوالب دراسات الحالة لمزودي الخدمات الصغار. الجمهور المستهدف: المقاولون الصغار المشاركون في المناقصات. الميزة التنافسية: كتبها شخص فاز بمناقصات فعلية مع تعليقات على ما ينجح وما يرفض.",
      en: "A library of ready response sections for network-services tenders: methodology, security posture, BOQ tables, SLA wording, and case-study layouts for small integrators. Target: small integrators bidding on public and private tenders. Differentiator: written by someone who has actually won tenders, with annotations on what wins and what gets rejected."
    },
    steps: [
      { ar: "اجمع 5 طلبات عروض حقيقية منسوخة وحلّل بنية الردود الفائزة", en: "Collect 5 real anonymized RFPs and analyze the structure of winning responses" },
      { ar: "ألّف أقسام المكتبة (منهجية، أمان، كميات، اتفاقيات) بصيغ قابلة للتخصيص", en: "Write the library sections (methodology, security, BOQ, SLAs) in customizable form" },
      { ar: "أضف تعليقات هوامش تشرح لماذا يرفض بعض الصياغ", en: "Add margin notes explaining why certain phrasings get rejected" },
      { ar: "أطلق المكتبة بسعر مقعد واحد وترخيص شركة أعلى", en: "Launch at a single-seat price with a higher company-wide license" },
      { ar: "قدّم خدمة مراجعة العرض قبل التقديم بسعر ثابت لكل مناقصة", en: "Offer a pre-submission proposal review at a fixed per-tender price" }
    ],
  },
];
