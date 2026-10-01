import type { Lesson } from "@/lib/types";

// Authored by content agent (Task 2-e) — 10 lessons (m15) aligned to BPT
// IT6010 Maths for Computing + IT7012 Entrepreneurship & Research Methods.
// The learner's through-line: a quantitative survey mini-project about gamers
// (gaming hours vs sleep, ping vs satisfaction on a 1-5 Likert scale).
export const m15_LESSONS: Lesson[] = [
  {
    id: "l141",
    moduleId: "m15",
    order: 1,
    level: "beginner",
    title: {
      ar: "الرياضيات للحوسبة: لماذا يحتاجها مهندس الشبكات؟",
      en: "Math for Computing: Why a Networker Needs It?",
    },
    summary: {
      ar: "جولة تأسيسية غير مخيفة: المجموعات والدوال والأسس والنسب — وكيف تظهر كلها يومياً في العناوين وقياسات التوافر وتقارير المراقبة.",
      en: "A friendly, zero-intimidation tour: sets, functions, exponents and rates — and where each one secretly runs your daily IP, uptime and monitoring work.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "الرياضيات: نظام تشغيل تقنية المعلومات", en: "Math: the Operating System of IT" },
        body: {
          ar: "خذي نفساً عميقاً: هذا ليس درس رياضيات مدرسياً. مادة «الرياضيات للحوسبة» في خطتك الدراسية (IT6010) هدفها المعلن هو تطبيق التقنيات الرياضية والإحصائية القياسية في قطاع تقنية المعلومات والاتصالات — أي رياضيات الأدوات التي ستستخدمها فعلاً.\n\nفكّر في الرياضيات هنا على أنها لغة، لا كحسابات مؤلمة: كل عنوان IP تكتبه رياضيات، وكل نسبة فقد في تقرير مراقبة رياضيات، وكل قرار «هل أحتاج رابطاً احتياطياً؟» احتمالات.\n\n- أنت أصلاً تمارس الرياضيات يومياً: قراءة نتيجة ping فهي إحصاء، ومقارنة خطة إنترنت بأسعارها فهي معدلات\n- مهندس الشبكات الذي يفهم الأرقام يشرح مشكلاته للإدارة بلغة قرارات، لا بلغة شكوى\n- كل درس قادم في هذه الوحدة موضوع لمشكلة واقعية ستقابلك في العمل أو في مشروع بحثك",
          en: "Take a deep breath: this is not school arithmetic. Your Maths for Computing course (IT6010) declares its aim as applying standard mathematical and statistical techniques in the ICT sector — the maths of tools you will actually use.\n\nThink of maths here as a language, not a punishment: every IP address you type is maths, every loss percentage in a monitoring report is maths, and every decision like «do I need a backup link?» is probability.\n\n- You already do maths daily: reading a ping result is statistics; comparing internet plans is rates\n- A networker who understands numbers explains problems to management in the language of decisions, not complaints\n- Every lesson ahead in this module maps to a real problem you will meet at work or in your research project",
        },
        tip: {
          ar: "القاعدة الذهبية للوحدة كلها: إذا استطعت شرح الفكرة لصديق يلعب ألعاب الفيديو في دقيقة واحدة، فقد فهمتها أنت أيضاً.",
          en: "The golden rule for this whole module: if you can explain an idea to a gamer friend in one minute, you understand it too.",
        },
      },
      {
        heading: { ar: "المجموعات: عندما تتحدث الشبكات بلغة الرياضيات", en: "Sets: When Networks Speak Math" },
        body: {
          ar: "المجموعة (Set) هي تجميع لعناصر واضحة المعالم دون تكرار. الشبكات مليئة بالمجموعات قبل أن تنتبه:\n\n- نطاق العناوين 192.168.1.0/24 هو مجموعة من 256 عنواناً (من 192.168.1.0 إلى 192.168.1.255)\n- VLAN 10 هي مجموعة منافذ المبدّل: {المنفذ 1، المنفذ 2، المنفذ 3}\n- قائمة السماح في الجدار الناري مجموعة عناوين مسموح لها بالمرور\n\nمثال محلول: لنقل أن الأجهزة المتصلة بالطابق الأول A = {192.168.1.1، 192.168.1.2، 192.168.1.3} والطابق الثاني B = {192.168.1.3، 192.168.1.4}:\n\n- الاتحاد A ∪ B = أربعة عناوين (كل الأجهزة في المبنى، دون تكرار 192.168.1.3)\n- التقاطع A ∩ B = {192.168.1.3} — جهاز واحد فقط مشترك، لعله نقطة وصول خدمت الطابقين\n- ملاحظة شبكية شهيرة: تقاطع مجموعتي VLAN مختلفتين فارغ تماماً — وهذا هو العزل الذي نريده!",
          en: "A set is a collection of well-defined elements without duplicates. Networks are full of sets before you even notice:\n\n- The range 192.168.1.0/24 is a set of 256 addresses (192.168.1.0 through 192.168.1.255)\n- VLAN 10 is a set of switch ports: {port 1, port 2, port 3}\n- A firewall allow-list is a set of permitted addresses\n\nWorked example: let floor-1 devices be A = {192.168.1.1, 192.168.1.2, 192.168.1.3} and floor-2 devices B = {192.168.1.3, 192.168.1.4}:\n\n- Union A ∪ B = four addresses (every device in the building, counting 192.168.1.3 once)\n- Intersection A ∩ B = {192.168.1.3} — exactly one shared device, maybe an AP serving both floors\n- Famous networking note: two different VLANs have an empty intersection — which is precisely the isolation we want!",
        },
        table: {
          caption: { ar: "عمليات المجموعات ومعانيها في الشبكات", en: "Set operations and their networking meaning" },
          headers: [
            { ar: "العملية", en: "Operation" },
            { ar: "المعنى الرياضي", en: "Math meaning" },
            { ar: "المثال الشبكي", en: "Networking example" },
          ],
          rows: [
            [
              { ar: "الاتحاد ∪", en: "Union ∪" },
              { ar: "كل عنصر في أيٍّ من المجموعتين", en: "Every element in either set" },
              { ar: "كل الأجهزة في VLAN 10 أو VLAN 20", en: "All devices in VLAN 10 or VLAN 20" },
            ],
            [
              { ar: "التقاطع ∩", en: "Intersection ∩" },
              { ar: "العناصر المشتركة فقط", en: "Only the shared elements" },
              { ar: "أجهزة عضو في مجموعتي بث (multicast) معاً", en: "Devices in two multicast groups at once" },
            ],
            [
              { ar: "المتمّم", en: "Complement" },
              { ar: "كل ما ليس داخل المجموعة", en: "Everything outside the set" },
              { ar: "العناوين المرفوضة = متمّم قائمة السماح", en: "Denied addresses = complement of the allow-list" },
            ],
            [
              { ar: "المجموعة الجزئية ⊆", en: "Subset ⊆" },
              { ar: "كل عناصرها داخل مجموعة أكبر", en: "All its elements live inside a bigger set" },
              { ar: "خادمات الويب ⊆ كل خادمات مركز البيانات", en: "Web servers ⊆ all data-center servers" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الدوال والتحويلات: من العنوان إلى الجهاز", en: "Functions & Mappings: from Address to Host" },
        body: {
          ar: "الدالة (Function) آلة تأخذ مدخلاً واحداً وتعطيك مخرجاً واحداً بالضبط لكل مدخل. الشبكة كلها دوال تعمل فوق بعضها:\n\n- f(اسم النطاق) = عنوان IP — هذا هو DNS بأكمله\n- f(عنوان IP) = عنوان MAC — هذا هو ARP\n- f(رقم المنفذ) = الخدمة — المنفذ 443 يوصلك دائماً إلى HTTPS\n\nالمجال (Domain) هو كل المدخلات الممكنة، والمدى (Range) هو كل المخرجات. عندما يفشل f(اسم) في إعطائك IP، فأنت تعرف فوراً أن المشكلة في الدالة نفسها (خادم DNS) لا في جهازك — هذه قوة التفكير بالدوال في التشخيص.\n\n- دوال كثيرة إلى واحدة (many-to-one) مقبولة: عشرات الأجهزة قد تشارك بوابة واحدة\n- دالة واحدة إلى كثيرين (one-to-many) علامة خطر: عنوان IP مكرر في الشبكة = صراع عناوين",
          en: "A function is a machine that takes one input and gives exactly one output per input. A network is functions stacked on functions:\n\n- f(domain name) = IP address — that is all of DNS\n- f(IP address) = MAC address — that is ARP\n- f(port number) = service — port 443 always lands you on HTTPS\n\nThe domain is every possible input; the range is every possible output. When f(name) fails to return an IP, you instantly know the fault is in the function itself (the DNS server), not your device — that is the diagnostic power of thinking in functions.\n\n- Many-to-one is fine: dozens of devices may share one gateway\n- One-to-many is a red flag: the same IP on two devices = address conflict",
        },
      },
      {
        heading: { ar: "الأسس والنمو الأسي: قوة 2ⁿ", en: "Exponents & Growth: the Power of 2ⁿ" },
        body: {
          ar: "لو كان للرياضيات نجم سينمائي في عالم الشبكات لكانت قوى العدد 2. السبب بسيط: البت حالة واحدة من اثنين (0 أو 1)، فكل بت إضافي يضاعف عدد الاحتمالات.\n\n- 2⁰ = 1، 2¹ = 2، 2² = 4، 2³ = 8 … حتى 2⁸ = 256\n- الثمانية الواحدة (octet) في عنوان IPv4 تسع 2⁸ = 256 قيمة (0 حتى 255)\n- عنوان IPv4 من 32 بتاً، فعدد العناوين النظري = 2³² ≈ 4.29 مليار عنوان\n\nمثال محلول سريع: شبكة /24 تعني 24 بتاً ثابتاً للشبكة و8 بتات للأجهزة:\n\n- عدد العناوين الكلي = 2⁸ = 256\n- نطرح عنوان الشبكة وعنوان البث: 256 − 2 = 254 عنواناً صالحاً للأجهزة\n\nهذه السلسلة الصغيرة (2⁸ − 2) هي أكثر عملية حسابية تتكرر في تصميم الشبكات الفرعية — وستراها بالتفصيل في درس الأنظمة الثنائية.",
          en: "If maths had a movie star in networking it would be the powers of 2. The reason is simple: a bit is one of two states (0 or 1), so every extra bit doubles the possibilities.\n\n- 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8 … up to 2⁸ = 256\n- One IPv4 octet holds 2⁸ = 256 values (0 through 255)\n- IPv4 is 32 bits, so the theoretical address count = 2³² ≈ 4.29 billion\n\nQuick worked example: a /24 network fixes 24 bits for the network and leaves 8 bits for hosts:\n\n- Total addresses = 2⁸ = 256\n- Subtract the network address and the broadcast address: 256 − 2 = 254 usable host addresses\n\nThat tiny chain (2⁸ − 2) is the single most repeated calculation in subnet design — and you will meet it again in the number-systems lesson.",
        },
      },
      {
        heading: { ar: "النسب والمعدلات: لغة مهندس التشغيل", en: "Rates & Percentages: the Operator's Language" },
        body: {
          ar: "تقارير التشغيل لا تقول «الشبكة كانت سيئة قليلاً»؛ إنها تقول أرقاماً. وأنت من سيحسبها:\n\nمثال 1 — التوافر: شهر كامل = 30 × 24 × 60 = 43,200 دقيقة. اتفاقية توافر 99.5% تعني أقصى توقف = 0.5% × 43,200 = 216 دقيقة في الشهر (3.6 ساعة). هكذا تتحول كلمة «تقريباً دائماً تعمل» إلى رقم قابل للمحاسبة.\n\nمثال 2 — فقد الحزم: أرسلت 200 حزمة اختبار وضاع 6 منها → نسبة الفقد = 6 ÷ 200 = 0.03 = 3%. القاعدة الذهبية: أقل من 1% ممتاز، وحتى 3% ملاحظ، وفوق 5% يستدعي تحقيقاً فورياً.\n\nمثال 3 — ميزانية زمن الاستجابة: ميزانية 100 ms لمكالمة صوتية، استهلك الترميز 20 ms والتوجيه 35 ms والازدحام 25 ms → المجموع 80 ms والباقي 20 ms هامش أمان.\n\n- النسبة المئوية = (الجزء ÷ الكل) × 100\n- المعدل دائماً «كمية لكل وحدة»: بت لكل ثانية، حزم مفقودة لكل ألف، دقائق توقف لكل شهر",
          en: "Operations reports never say «the network was a bit bad»; they say numbers. And you will be the one computing them:\n\nExample 1 — uptime: a full month = 30 × 24 × 60 = 43,200 minutes. A 99.5% availability SLA allows at most 0.5% × 43,200 = 216 minutes of downtime per month (3.6 hours). That is how «nearly always works» becomes an accountable number.\n\nExample 2 — packet loss: you sent 200 test packets and 6 vanished → loss = 6 ÷ 200 = 0.03 = 3%. Rule of thumb: under 1% is excellent, up to 3% is noticeable, above 5% demands an immediate investigation.\n\nExample 3 — latency budget: a 100 ms budget for a voice call, where encoding ate 20 ms, routing 35 ms and congestion 25 ms → total 80 ms, leaving a 20 ms safety margin.\n\n- Percentage = (part ÷ whole) × 100\n- A rate is always «an amount per unit»: bits per second, lost packets per thousand, downtime minutes per month",
        },
      },
      {
        heading: { ar: "خريطة الرياضيات في رحلتك", en: "Your Maths-in-Networking Map" },
        body: {
          ar: "هذه الوحدة ليست جزراً متناثرة؛ إنها خريطة واحدة تخدم كل ما تبقى من دراستك. احفظ الجدول التالي وراجعه بعد إنهاء كل درس:\n\n- المنطق البولياني → قواعد الجدران النارية وشروط السكربتات\n- أنظمة الأعداد → العنونة والقناعات وأذونات الملفات\n- الإحصاء الوصفي → تقارير المراقبة وتحليل نتائج استبيانك\n- الاحتمالات → تصميم الموثوقية والاحتياط\n- منهجية البحث → دراسات السعة وقرارات مبنية على أدلة\n\nوفي نهاية الوحدة ستنجز مشروعاً كمياً صغيراً حقيقياً عن اللاعبين: ساعات اللعب مقابل النوم ورضا البينغ — أي أنك ستطبق خمسة دروس من هذه الوحدة في مشروع واحد.",
          en: "This module is not scattered islands; it is one map serving the rest of your studies. Keep the table below and revisit it after every lesson:\n\n- Boolean logic → firewall rules and script conditions\n- Number systems → addressing, masks and file permissions\n- Descriptive statistics → monitoring reports and your survey analysis\n- Probability → reliability and redundancy design\n- Research methodology → capacity studies and evidence-based decisions\n\nAt the end of the module you will deliver a real mini quantitative project about gamers: gaming hours vs sleep and ping satisfaction — five lessons of this module applied inside one project.",
        },
        table: {
          caption: { ar: "أين ستقابل كل فرع رياضي مرة أخرى", en: "Where each maths branch will meet you again" },
          headers: [
            { ar: "الفرع الرياضي", en: "Maths branch" },
            { ar: "الدرس", en: "Lesson" },
            { ar: "التطبيق الشبكي / البحثي", en: "Networking / research use" },
          ],
          rows: [
            [
              { ar: "المنطق البولياني", en: "Boolean logic" },
              { ar: "l142", en: "l142" },
              { ar: "قواعد السماح والمنع، AND البتّي للقناع، شروط if", en: "Allow/deny rules, bitwise mask AND, if conditions" },
            ],
            [
              { ar: "أنظمة الأعداد", en: "Number systems" },
              { ar: "l143", en: "l143" },
              { ar: "IPv4 وIPv6 وMAC وأذونات 755", en: "IPv4, IPv6, MAC and 755 permissions" },
            ],
            [
              { ar: "الإحصاء الوصفي", en: "Descriptive statistics" },
              { ar: "l144 وl145", en: "l144 & l145" },
              { ar: "متوسط البينغ وتباينه وقراءة الرسوم", en: "Ping mean, its spread, reading charts" },
            ],
            [
              { ar: "الاحتمالات", en: "Probability" },
              { ar: "l146", en: "l146" },
              { ar: "فقد الحزم عبر القفزات وحسابات التوافر", en: "Loss across hops and uptime arithmetic" },
            ],
            [
              { ar: "منهجية البحث", en: "Research methods" },
              { ar: "l147 إلى l150", en: "l147 to l150" },
              { ar: "تصميم الاستبيان وتحليله وكتابته بأخلاقية", en: "Survey design, analysis and ethical write-up" },
            ],
          ],
        },
      },
    ],
    keyPoints: [
      { ar: "الرياضيات في IT6010 لغة أدوات: كل عنوان ونسبة وقرار تقني يقوم عليها حساب", en: "Maths in IT6010 is a tools language: every address, percentage and technical decision rests on a calculation" },
      { ar: "المجموعات تصف نطاقات العناوين وVLAN وقوائم الجدار الناري، والتقاطع الفارغ بين VLAN هو العزل نفسه", en: "Sets describe address ranges, VLANs and firewall lists; the empty VLAN intersection is the isolation itself" },
      { ar: "كل بت إضافي يضاعف الاحتمالات: 2⁸ = 256، وشبكة /24 تعطي 254 عنواناً صالحاً", en: "Each extra bit doubles possibilities: 2⁸ = 256, and a /24 yields 254 usable addresses" },
      { ar: "النسب تحول الانطباعات إلى أرقام: 99.5% توافر = 216 دقيقة توقف كحد أقصى شهرياً", en: "Percentages turn impressions into numbers: 99.5% uptime = at most 216 downtime minutes per month" },
      { ar: "الدوال تشرح الشبكة: DNS وARP مجرد دوال من المدخل إلى المخرج", en: "Functions explain the network: DNS and ARP are just input-to-output functions" },
    ],
    quiz: [
      {
        q: {
          ar: "شبكة /24 تحتوي نظرياً على 256 عنواناً. كم عنواناً صالحاً لتعيينه للأجهزة؟",
          en: "A /24 network theoretically contains 256 addresses. How many are assignable to hosts?",
        },
        options: [
          { ar: "256", en: "256" },
          { ar: "255", en: "255" },
          { ar: "254", en: "254" },
          { ar: "128", en: "128" },
        ],
        correct: 2,
        explain: {
          ar: "نطرح عنوانين محجوزين: عنوان الشبكة نفسه (192.168.1.0) وعنوان البث (192.168.1.255)، فيبقى 256 − 2 = 254.",
          en: "Two addresses are reserved: the network address itself (192.168.1.0) and the broadcast address (192.168.1.255), leaving 256 − 2 = 254.",
        },
      },
      {
        q: {
          ar: "جمعُ أجهزة VLAN 10 وأجهزة VLAN 20 في قائمة واحدة دون تكرار يسمى:",
          en: "Combining the devices of VLAN 10 and VLAN 20 into one list without duplicates is called:",
        },
        options: [
          { ar: "تقاطع المجموعتين", en: "The intersection of the sets" },
          { ar: "اتحاد المجموعتين", en: "The union of the sets" },
          { ar: "متمّم المجموعة الأولى", en: "The complement of the first set" },
          { ar: "الفرق بين المجموعتين", en: "The difference of the sets" },
        ],
        correct: 1,
        explain: {
          ar: "الاتحاد (∪) يجمع كل عنصر يظهر في أيٍّ من المجموعتين ويحتسب المشترك مرة واحدة، بينما التقاطع يأخذ المشترك فقط.",
          en: "Union (∪) collects every element appearing in either set and counts shared items once, whereas intersection keeps only the shared items.",
        },
      },
      {
        q: {
          ar: "اتفاقية توافر 99.5% لشهر من 43,200 دقيقة تسمح بأقصى توقف قدره:",
          en: "A 99.5% availability SLA over a 43,200-minute month allows at most:",
        },
        options: [
          { ar: "432 دقيقة", en: "432 minutes" },
          { ar: "216 دقيقة", en: "216 minutes" },
          { ar: "4320 دقيقة", en: "4320 minutes" },
          { ar: "21.6 دقيقة", en: "21.6 minutes" },
        ],
        correct: 1,
        explain: {
          ar: "نسبة التوقف المسموحة = 100% − 99.5% = 0.5%، ثم 0.005 × 43,200 = 216 دقيقة (نحو 3.6 ساعة).",
          en: "Allowed downtime = 100% − 99.5% = 0.5%, and 0.005 × 43,200 = 216 minutes (about 3.6 hours).",
        },
      },
    ],
  },
  {
    id: "l142",
    moduleId: "m15",
    order: 2,
    level: "beginner",
    title: {
      ar: "المنطق البولياني والبوابات المنطقية",
      en: "Boolean Logic & Logic Gates",
    },
    summary: {
      ar: "جداول الصدق للعمليات AND وOR وNOT وXOR، وقوانين دي مورغان، وكيف تتحول البوابات إلى معالج — ولماذا كل قاعدة جدار ناري هي تعبير بولياني.",
      en: "Truth tables for AND, OR, NOT and XOR, De Morgan's laws, how gates become a CPU — and why every firewall rule is a Boolean expression.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "من الصواب والخطأ إلى البت", en: "From True/False to the Bit" },
        body: {
          ar: "قبل قرن ونصف، فكر جورج بول في عالم يمكن وصفه بقيمتين فقط: صواب (1) وخطأ (0). لم يكن يعلم أن كل حاسوب على وجه الأرض سيُبنى على فكرته.\n\nفي الشبكات نعيش هذا العالم يومياً:\n\n- الوصلة أعلى/أسفل (up/down) — بت واحد\n- الحزمة مسموح بها/مرفوضة (allow/deny) — بت واحد\n- البت في الإطار 1 أو 0 — لا حالة ثالثة\n\nالمنطق البولياني هو حساب هذه القيم: تأخذ مدخلات صواب/خطأ وتنتج مخرجات صواب/خطأ وفق قواعد ثابتة تسمى العمليات المنطقية.",
          en: "A century and a half ago George Boole imagined a world describable with just two values: true (1) and false (0). He could not know that every computer on Earth would be built on his idea.\n\nIn networking we live that world daily:\n\n- A link is up/down — one bit\n- A packet is allowed/denied — one bit\n- A frame bit is 1 or 0 — no third state\n\nBoolean logic is the arithmetic of these values: it takes true/false inputs and produces true/false outputs by fixed rules called logical operations.",
        },
        tip: {
          ar: "تذكّر: اسم الجهاز نفسه مدين للرجل — Boole + an = Boolean. وفي العربية نقول «البولياني».",
          en: "Remember: the device name itself honors the man — Boole + an = Boolean.",
        },
      },
      {
        heading: { ar: "العمليات الأساسية وجداول الصدق", en: "The Core Operations & Truth Tables" },
        body: {
          ar: "جدول الصدق (Truth Table) هو الطريقة الشريفة لوصف عملية منطقية: نجرّب كل تركيبة مدخلات ممكنة ونسجل الناتج. الجدول التالي يجمع الأربع عمليات الأشهر:\n\n- AND: صواب فقط إذا كان المدخلان صواباً معاً — كلما صار أحد المدخلين 0 صار الناتج 0\n- OR: صواب إذا كان أي مدخل صواباً (أو كلاهما)\n- NOT: عكس المدخل الوحيد\n- XOR (الإضافة الحصرية): صواب إذا اختلف المدخلان فقط — انتبه: 1 XOR 1 = 0\n\nمثال سريع من الحياة: «أسمح بالمرور إذا كان المستخدم موظفاً AND معه بطاقة» — عامل شرط واحد فاقد يمنع الجميع. بينما «أسمح إذا كان موظفاً OR زائراً مسجلاً» أوسع باباً.",
          en: "A truth table is the honest way to describe a logical operation: try every possible input combination and record the output. The table below gathers the four most famous operations:\n\n- AND: true only when both inputs are true — any single 0 forces the output to 0\n- OR: true when any input is true (or both)\n- NOT: inverts its single input\n- XOR (exclusive-or): true only when the inputs differ — note carefully: 1 XOR 1 = 0\n\nA quick life example: «allow entry if user is staff AND has a badge» — one missing condition blocks everyone. Whereas «allow if staff OR registered visitor» is a wider door.",
        },
        table: {
          caption: { ar: "جدول الصدق الموحد للعمليات الأربع", en: "Unified truth table for the four operations" },
          headers: [
            { ar: "A", en: "A" },
            { ar: "B", en: "B" },
            { ar: "A AND B", en: "A AND B" },
            { ar: "A OR B", en: "A OR B" },
            { ar: "A XOR B", en: "A XOR B" },
          ],
          rows: [
            [
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
            ],
            [
              { ar: "0", en: "0" },
              { ar: "1", en: "1" },
              { ar: "0", en: "0" },
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
            ],
            [
              { ar: "1", en: "1" },
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
            ],
            [
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
              { ar: "0", en: "0" },
            ],
          ],
        },
      },
      {
        heading: { ar: "البوابات المنطقية: جدول ورمز وسلوك", en: "Logic Gates: Table, Symbol, Behavior" },
        body: {
          ar: "البوابة المنطقية (Logic Gate) هي الدارة الإلكترونية التي تنفذ عملية منطقية بفيزياء الترانزستورات. جدول واحد يلخصها:\n\n- بوابات NAND وNOR تسمى «عالمية» لأن أي دارة أخرى تُبنى منها وحدها — حتى المعالج كله\n- المعالج يحسب الجمع والطرح والمقارنات بترليونات العمليات المنطقية في الثانية — الرياضة نفسها، بسرعة رهيبة\n- في شبكاتك ستقابل هذه المنطق بشكله البرمجي: شروط if في سكربتات بايثون وباش، وقواعد قوائم التحكم بالوصول",
          en: "A logic gate is the electronic circuit that implements a logical operation in transistor physics. One table sums them up:\n\n- NAND and NOR gates are called «universal» because any other circuit can be built from them alone — even an entire CPU\n- A CPU computes addition, subtraction and comparisons via trillions of logic operations per second — the same algebra, at insane speed\n- In your networks you will meet this logic in its software form: if conditions in Python and bash scripts, and access-control list rules",
        },
        table: {
          caption: { ar: "البوابة، رمزها الشائع، وسلوكها بكلمة واحدة", en: "Gate, its common symbol, and its one-word behavior" },
          headers: [
            { ar: "البوابة", en: "Gate" },
            { ar: "الرمز الشائع", en: "Common symbol" },
            { ar: "الناتج = 1 عندما", en: "Output = 1 when" },
            { ar: "تشبيه من الحياة", en: "Life analogy" },
          ],
          rows: [
            [
              { ar: "AND", en: "AND" },
              { ar: "D-شكل", en: "D-shape" },
              { ar: "المدخلان كلاهما 1", en: "Both inputs are 1" },
              { ar: "المفتاحان على التوالي", en: "Two switches in series" },
            ],
            [
              { ar: "OR", en: "OR" },
              { ar: "قوس منحنٍ", en: "Curved shield" },
              { ar: "أي مدخل 1", en: "Any input is 1" },
              { ar: "المفتاحان على التوازي", en: "Two switches in parallel" },
            ],
            [
              { ar: "NOT", en: "NOT" },
              { ar: "مثلث + دائرة", en: "Triangle + bubble" },
              { ar: "المدخل 0", en: "The input is 0" },
              { ar: "مفتاح قلب الحالة", en: "A state-flipping switch" },
            ],
            [
              { ar: "XOR", en: "XOR" },
              { ar: "OR بخط إضافي", en: "OR with an extra line" },
              { ar: "المدخلان مختلفان", en: "The inputs differ" },
              { ar: "كاشف الاختلاف", en: "A difference detector" },
            ],
            [
              { ar: "NAND", en: "NAND" },
              { ar: "AND + دائرة", en: "AND + bubble" },
              { ar: "ليس المدخلان كلاهما 1", en: "Not both inputs 1" },
              { ar: "البوابة العالمية", en: "The universal gate" },
            ],
          ],
        },
      },
      {
        heading: { ar: "المنطق البتّي في الشبكات: القناع هو عملية AND", en: "Bitwise Logic in Networks: the Mask IS an AND" },
        body: {
          ar: "أجمل تطبيق ستراه: عندما يسأل جهاز التوجيه «إلى أي شبكة ينتمي هذا العنوان؟» فإنه ينفذ عملية AND بتّية (bitwise) بين عنوان IP وقناع الشبكة الفرعية.\n\nمثال محلول بتاً ببت — العنوان 192.168.10.77 مع القناع 255.255.255.0:\n\n- الثمانيات الثلاث الأولى: 192 AND 255 = 192، و168 AND 255 = 168، و10 AND 255 = 10 (لا تتغير لأن 255 = ثمانية آحاد)\n- الثمانية الأخيرة: 77 AND 0 = 0 لأن 0 = ثمانية أصفار\n- الناتج: 192.168.10.0 — عنوان الشبكة!\n\nوبالمثل في الثنائي: 77 = 01001101، والقناع 00000000، فيسقط كل بت إلى 0.\n\nأما XOR فهو بطل اكتشاف الأخطاء:\n\n- بت التكافؤ (parity) في الروابط القديمة كان XOR لكل بتات البايت\n- خوارزميات الكشف مثل CRC تعتمد فكرة «اختلاف البتات» نفسها\n- وفي كثير من أدوات التحليل، البتات التي تغيرت بين نسختين من ملف تُحسب بـ XOR",
          en: "The most beautiful application you will see: when a router asks «which network does this address belong to?», it performs a bitwise AND between the IP address and the subnet mask.\n\nWorked example, octet by octet — address 192.168.10.77 with mask 255.255.255.0:\n\n- The first three octets: 192 AND 255 = 192, 168 AND 255 = 168, 10 AND 255 = 10 (unchanged because 255 = eight ones)\n- The last octet: 77 AND 0 = 0 because 0 = eight zeros\n- Result: 192.168.10.0 — the network address!\n\nIn binary the same story: 77 = 01001101 and the mask is 00000000, so every bit falls to 0.\n\nXOR, in turn, is the hero of error detection:\n\n- The parity bit on old links was the XOR of all bits in a byte\n- Detection algorithms like CRC build on the same «which bits differ» idea\n- Many diff tools count changed bits between two file versions using XOR",
        },
      },
      {
        heading: { ar: "دي مورغان وبناء التعابير المنطقية", en: "De Morgan & Building Logical Expressions" },
        body: {
          ar: "قانونان يحررانك من التعابير المتشابكة:\n\n- NOT (A AND B) = NOT A OR NOT B\n- NOT (A OR B) = NOT A AND NOT B\n\nبالعربية السليمة: نفي «الاثنان معاً» يساوي «أحدهما على الأقل منفي»، ونفي «أحدهما على الأقل» يساوي «كلاهما منفي».\n\nمثال من جدار ناري: قاعدة «اسمح إذا كان المصدر من الشبكة الداخلية AND المنفذ 443». نفيها (أي المنع): «امنع إذا لم يكن المصدر داخلياً OR لم يكن المنفذ 443» — لاحظ تحول AND إلى OR عند النفي!\n\nفي السكربتات تُبنى الشروط بنفس المنطق، والسكربت التالي يطبع جدول صدق كاملاً بأسطر معدودة:",
          en: "Two laws free you from tangled expressions:\n\n- NOT (A AND B) = NOT A OR NOT B\n- NOT (A OR B) = NOT A AND NOT B\n\nIn plain words: negating «both together» equals «at least one negated», and negating «at least one» equals «both negated».\n\nFirewall example: the rule «allow if source is internal AND port is 443». Its negation (the deny): «deny if the source is not internal OR the port is not 443» — notice the AND flipping to OR under negation!\n\nScripts build conditions on the same logic, and the next snippet prints a full truth table in a handful of lines:",
        },
        code: {
          lang: "python",
          snippet:
            "for a in (0, 1):\n    for b in (0, 1):\n        print(a, b, '| AND =', a and b,\n              '| OR =', a or b,\n              '| XOR =', a ^ b)\n\n# الناتج 4 أسطر تغطي كل الحالات الممكنة",
        },
      },
    ],
    keyPoints: [
      { ar: "AND تعطي 1 فقط إذا كان المدخلان 1، بينما XOR تعطي 1 فقط إذا اختلف المدخلان", en: "AND yields 1 only when both inputs are 1; XOR yields 1 only when the inputs differ" },
      { ar: "قناع الشبكة الفرعية يعمل بعملية AND بتّية: 192.168.10.77 AND 255.255.255.0 = 192.168.10.0", en: "A subnet mask works as a bitwise AND: 192.168.10.77 AND 255.255.255.0 = 192.168.10.0" },
      { ar: "قوانين دي مورغان: نفي AND يعطي OR للنفيات والعكس صحيح", en: "De Morgan's laws: negating an AND gives an OR of negations, and vice versa" },
      { ar: "قواعد الجدار الناري وشروط if ليست إلا تعبيرات بوليانية تُقيَّم إلى صواب أو خطأ", en: "Firewall rules and if conditions are nothing but Boolean expressions evaluating to true or false" },
      { ar: "بوابات NAND وحدها كافية لبناء أي دارة منطقية، ومنها تُبنى المعالجات", en: "NAND gates alone suffice to build any logic circuit, CPUs included" },
    ],
    quiz: [
      {
        q: { ar: "ما ناتج 1 XOR 1؟", en: "What is 1 XOR 1?" },
        options: [
          { ar: "1", en: "1" },
          { ar: "0", en: "0" },
          { ar: "2", en: "2" },
          { ar: "غير معرّف", en: "Undefined" },
        ],
        correct: 1,
        explain: {
          ar: "XOR (الإضافة الحصرية) تعطي 1 فقط عندما يختلف المدخلان؛ تشابه المدخلين يعطي 0 — وهذا جعلها كاشف اختلاف مثالياً.",
          en: "XOR (exclusive-or) yields 1 only when the inputs differ; identical inputs give 0 — which makes it an ideal difference detector.",
        },
      },
      {
        q: {
          ar: "حزمة وصلت من الإنترنت على المنفذ 443، والقاعدة: «اسمح إذا (منفذ 443) AND (المصدر داخلي)». ما الحكم؟",
          en: "A packet arrived from the Internet on port 443 under the rule «allow if (port 443) AND (source internal)». What is the verdict?",
        },
        options: [
          { ar: "تسمح، لأن المنفذ 443 صحيح", en: "Allowed, because the port is 443" },
          { ar: "ترفض، لأن شرطاً واحداً فاقداً يكفي لفشل AND", en: "Denied, because one missing condition fails the whole AND" },
          { ar: "ترفض، لأن AND يرفض كل شيء دائماً", en: "Denied, because AND always rejects everything" },
          { ar: "تنتظر قاعدة تالية تتضمن OR", en: "It waits for a following OR rule" },
        ],
        correct: 1,
        explain: {
          ar: "AND تصدق فقط إذا صدق المدخلان معاً. المنفذ تحقق لكن المصدر ليس داخلياً، فالناتج خطأ والحزمة ترفض.",
          en: "AND is true only when both inputs are true. The port matched, but the source is not internal, so the result is false and the packet is denied.",
        },
      },
      {
        q: {
          ar: "بحسب دي مورغان، NOT (A OR B) تساوي:",
          en: "By De Morgan's laws, NOT (A OR B) equals:",
        },
        options: [
          { ar: "NOT A AND NOT B", en: "NOT A AND NOT B" },
          { ar: "NOT A OR NOT B", en: "NOT A OR NOT B" },
          { ar: "A AND B", en: "A AND B" },
          { ar: "NOT (A AND B)", en: "NOT (A AND B)" },
        ],
        correct: 0,
        explain: {
          ar: "نفي «أحدهما على الأقل» يفرض نفي الاثنين معاً: NOT A AND NOT B. أما الخيار الثاني فهو نفي AND.",
          en: "Negating «at least one» requires negating both: NOT A AND NOT B. The second option is the negation of AND instead.",
        },
      },
      {
        q: {
          ar: "أي عملية بتّية يستخدمها جهاز التوجيه لاستخراج عنوان الشبكة من عنوان IP والقناع؟",
          en: "Which bitwise operation does a router use to extract the network address from an IP and its mask?",
        },
        options: [
          { ar: "OR البتّية", en: "Bitwise OR" },
          { ar: "XOR البتّية", en: "Bitwise XOR" },
          { ar: "AND البتّية", en: "Bitwise AND" },
          { ar: "NOT البتّية", en: "Bitwise NOT" },
        ],
        correct: 2,
        explain: {
          ar: "AND تحافظ على البتات حيث القناع 1 (جزء الشبكة) وتصفّرها حيث القناع 0 (جزء المضيف)، فينتج عنوان الشبكة نقياً.",
          en: "AND keeps the bits where the mask is 1 (the network part) and zeroes them where the mask is 0 (the host part), yielding the pure network address.",
        },
      },
    ],
  },
  {
    id: "l143",
    moduleId: "m15",
    order: 3,
    level: "beginner",
    title: {
      ar: "أنظمة الأعداد: الثنائي والثماني والست عشري",
      en: "Number Systems: Binary, Octal & Hex",
    },
    summary: {
      ar: "التحويل خطوة بخطوة بين الثنائي والعشري والست عشري والثماني، واختصار الأنصاف، ولماذا يكتب المهندسون 0xD4 بدل 11010100 — مع IPv4 وIPv6 وMAC وصلاحيات 755.",
      en: "Step-by-step conversion across binary, decimal, hex and octal, the nibble shortcut, why engineers write 0xD4 instead of 11010100 — plus IPv4, IPv6, MAC and the 755 permissions.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "لماذا أنظمة أعداد متعددة؟", en: "Why Multiple Number Systems?" },
        body: {
          ar: "نحن نعد بالعشري (base 10) لأن لدينا عشرة أصابع — قرار تاريخي لا كوني. أما الحاسوب فيعرف حالتين كهربائيتين موثوقتين، فيعد بالثنائي (base 2).\n\nالمشكلة أن الثنائي مطوّل بشدة: البايت الواحد يصير 11010100. فاخترع المهندسون اختصارات مقروءة:\n\n- الست عشري (base 16): كل 4 بتات (نصف بايت = nibble) تصبح خانة واحدة من 0 إلى F\n- الثماني (base 8): كل 3 بتات تصبح خانة من 0 إلى 7 — وما زالت حية في أذونات يونكس\n\nالتدوين الموضعي (Positional Notation) هو المفتاح المشترك: قيمة كل خانة تساوي رقمها مضروباً في الأساس مرفوعاً لقوة موضعها. مثال عشري مألوف: 253 = (2 × 10²) + (5 × 10¹) + (3 × 10⁰).",
          en: "We count in decimal (base 10) because we have ten fingers — a historical choice, not a cosmic one. A computer, however, reliably distinguishes two electrical states, so it counts in binary (base 2).\n\nThe trouble is binary is brutally long: a single byte becomes 11010100. So engineers invented readable shortcuts:\n\n- Hexadecimal (base 16): every 4 bits (half a byte = a nibble) becomes one digit from 0 to F\n- Octal (base 8): every 3 bits become one digit from 0 to 7 — still alive in Unix permissions\n\nPositional notation is the shared key: each digit's value equals the digit times the base raised to its position's power. A familiar decimal example: 253 = (2 × 10²) + (5 × 10¹) + (3 × 10⁰).",
        },
      },
      {
        heading: { ar: "الثنائي والعشري: التحويل خطوة بخطوة", en: "Binary ↔ Decimal: Step by Step" },
        body: {
          ar: "أوزان الخانات في الثمانية الثنائية من اليسار لليمين: 128، 64، 32، 16، 8، 4، 2، 1 — وهي مجرد قوى العدد 2.\n\nمن الثنائي إلى العشري: اجمع أوزان البتات المساوية 1.\n\nمثال محلول: 11010110\n\n- 128 + 64 + 16 + 4 + 2 = 214 (البتات 32 و1 تساوي صفراً فتُتجاهل)\n\nمن العشري إلى الثنائي: طريقة الطرح من الأوزان الكبرى.\n\nمثال محلول: 202\n\n- أكبر وزن ≤ 202 هو 128 → ضع 1 ويتبقى 202 − 128 = 74\n- أكبر وزن ≤ 74 هو 64 → ضع 1 ويتبقى 74 − 64 = 10\n- 32 و16 أكبر من 10 → ضع 0 و0\n- أكبر وزن ≤ 10 هو 8 → ضع 1 ويتبقى 2\n- أكبر وزن ≤ 2 هو 2 → ضع 1 ويتبقى 0\n- الناتج: 11001010 (تحقق: 128 + 64 + 8 + 2 = 202)\n\nجدول الأوزان نفسه يصير طريقة «المضاعفة» من اليمين: ابدأ بـ 1 ثم ضاعف قيمة كل موضع تنتقل إليه يساراً.",
          en: "The place weights of a binary octet, left to right: 128, 64, 32, 16, 8, 4, 2, 1 — simply the powers of 2.\n\nBinary to decimal: add up the weights of the 1-bits.\n\nWorked example: 11010110\n\n- 128 + 64 + 16 + 4 + 2 = 214 (the 32 and 1 bits are zero, so ignored)\n\nDecimal to binary: the subtract-from-weights method.\n\nWorked example: 202\n\n- Largest weight ≤ 202 is 128 → write 1, remainder 202 − 128 = 74\n- Largest weight ≤ 74 is 64 → write 1, remainder 74 − 64 = 10\n- 32 and 16 exceed 10 → write 0 and 0\n- Largest weight ≤ 10 is 8 → write 1, remainder 2\n- Largest weight ≤ 2 is 2 → write 1, remainder 0\n- Result: 11001010 (check: 128 + 64 + 8 + 2 = 202)\n\nThe same weights give you the right-to-left «doubling» method: start at 1 and double as you move left.",
        },
        tip: {
          ar: "احفظ قوى 2 حتى 256 حفظاً (1، 2، 4، 8، 16، 32، 64، 128، 256) — ستستدعيها في كل subnetting وكل تحويل.",
          en: "Memorize the powers of 2 up to 256 (1, 2, 4, 8, 16, 32, 64, 128, 256) — you will call on them in every subnetting task and conversion.",
        },
      },
      {
        heading: { ar: "الست عشري واختصار الأنصاف (nibble)", en: "Hexadecimal & the Nibble Shortcut" },
        body: {
          ar: "القاعدة الذهبية: 4 بتات = خانة ست عشرية واحدة. لهذا نحتاج 16 رمزاً: 0-9 ثم A وB وC وD وE وF بقيم 10 إلى 15.\n\nمثال محلول: الثنائي 11010110 نقسمه من اليمين أنصافاً: 1101 | 0110\n\n- 1101 = 8 + 4 + 1 = 13 = D\n- 0110 = 4 + 2 = 6\n- الناتج الست عشري: D6، أي بايت واحد كامل يُكتب D6 بدل ثمانية بتات\n\nوالعكس أسرع: 0xFA → F = 1111 وA = 1010 فيصير 11111010 = 250 عشرياً.\n\nجدول 0-15 أدناه هو مرجعك مدى الحياة — أتقنه مرة واحدة وستقرأ العناوين بطلاقة.",
          en: "The golden rule: 4 bits = exactly one hex digit. That is why we need 16 symbols: 0-9 then A, B, C, D, E and F with values 10 through 15.\n\nWorked example: split the binary 11010110 from the right into nibbles: 1101 | 0110\n\n- 1101 = 8 + 4 + 1 = 13 = D\n- 0110 = 4 + 2 = 6\n- Hex result: D6 — a whole byte written as D6 instead of eight bits\n\nThe reverse is even faster: 0xFA → F = 1111 and A = 1010, so 11111010 = 250 decimal.\n\nThe 0-15 table below is your lifetime reference — master it once and you will read addresses fluently.",
        },
        table: {
          caption: { ar: "القيم 0-15 في الأنظمة الأربعة", en: "Values 0-15 across the four bases" },
          headers: [
            { ar: "عشري (10)", en: "Decimal (10)" },
            { ar: "ثنائي (2)", en: "Binary (2)" },
            { ar: "ثماني (8)", en: "Octal (8)" },
            { ar: "ست عشري (16)", en: "Hex (16)" },
          ],
          rows: [
            [
              { ar: "0", en: "0" },
              { ar: "0000", en: "0000" },
              { ar: "0", en: "0" },
              { ar: "0", en: "0" },
            ],
            [
              { ar: "1", en: "1" },
              { ar: "0001", en: "0001" },
              { ar: "1", en: "1" },
              { ar: "1", en: "1" },
            ],
            [
              { ar: "2", en: "2" },
              { ar: "0010", en: "0010" },
              { ar: "2", en: "2" },
              { ar: "2", en: "2" },
            ],
            [
              { ar: "3", en: "3" },
              { ar: "0011", en: "0011" },
              { ar: "3", en: "3" },
              { ar: "3", en: "3" },
            ],
            [
              { ar: "4", en: "4" },
              { ar: "0100", en: "0100" },
              { ar: "4", en: "4" },
              { ar: "4", en: "4" },
            ],
            [
              { ar: "5", en: "5" },
              { ar: "0101", en: "0101" },
              { ar: "5", en: "5" },
              { ar: "5", en: "5" },
            ],
            [
              { ar: "6", en: "6" },
              { ar: "0110", en: "0110" },
              { ar: "6", en: "6" },
              { ar: "6", en: "6" },
            ],
            [
              { ar: "7", en: "7" },
              { ar: "0111", en: "0111" },
              { ar: "7", en: "7" },
              { ar: "7", en: "7" },
            ],
            [
              { ar: "8", en: "8" },
              { ar: "1000", en: "1000" },
              { ar: "10", en: "10" },
              { ar: "8", en: "8" },
            ],
            [
              { ar: "9", en: "9" },
              { ar: "1001", en: "1001" },
              { ar: "11", en: "11" },
              { ar: "9", en: "9" },
            ],
            [
              { ar: "10", en: "10" },
              { ar: "1010", en: "1010" },
              { ar: "12", en: "12" },
              { ar: "A", en: "A" },
            ],
            [
              { ar: "11", en: "11" },
              { ar: "1011", en: "1011" },
              { ar: "13", en: "13" },
              { ar: "B", en: "B" },
            ],
            [
              { ar: "12", en: "12" },
              { ar: "1100", en: "1100" },
              { ar: "14", en: "14" },
              { ar: "C", en: "C" },
            ],
            [
              { ar: "13", en: "13" },
              { ar: "1101", en: "1101" },
              { ar: "15", en: "15" },
              { ar: "D", en: "D" },
            ],
            [
              { ar: "14", en: "14" },
              { ar: "1110", en: "1110" },
              { ar: "16", en: "16" },
              { ar: "E", en: "E" },
            ],
            [
              { ar: "15", en: "15" },
              { ar: "1111", en: "1111" },
              { ar: "17", en: "17" },
              { ar: "F", en: "F" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الثماني وصلاحيات يونكس: لغز 755", en: "Octal & Unix Permissions: the 755 Riddle" },
        body: {
          ar: "رأيت الأمر chmod 755 مئات المرات في دروس يونكس. حان وقت فك شفرته — إنه ثماني خالص:\n\n- 7 = 111 في الثنائي = قراءة (4) + كتابة (2) + تنفيذ (1) — للمالك\n- 5 = 101 = قراءة (4) + تنفيذ (1) — للمجموعة\n- 5 = 101 = قراءة (4) + تنفيذ (1) — للآخرين\n\nكل خانة ثلاثية صلاحيات تُرمز بأوزان 4-2-1، والجمع يعطي رقماً واحداً من 0 إلى 7. لهذا كان الثماني مثالياً: 3 بتات لكل فئة صلاحيات، خانة ثمانية واحدة بالضبط.\n\n- 755: السكربتات القابلة للتنفيذ (المالك يملك كل شيء، والبقية يقرؤون وينفذون)\n- 644: الملفات العادية (قراءة وكتابة للمالك، قراءة للجميع)\n- 600: الملفات الخاصة (المالك وحده، مثل مفاتيح SSH)\n- 777: الأذونات المفتوحة الكاملة — نادراً ما تكون فكرة جيدة!",
          en: "You have seen chmod 755 hundreds of times in Unix lessons. Time to decode it — it is pure octal:\n\n- 7 = 111 in binary = read (4) + write (2) + execute (1) — for the owner\n- 5 = 101 = read (4) + execute (1) — for the group\n- 5 = 101 = read (4) + execute (1) — for others\n\nEach triple of permission bits maps to the weights 4-2-1, and their sum gives one digit from 0 to 7. That is why octal fits perfectly: 3 bits per permission class, exactly one octal digit.\n\n- 755: executable scripts (owner has everything, others read and execute)\n- 644: ordinary files (read-write for owner, read for everyone)\n- 600: private files (owner only, like SSH keys)\n- 777: fully open permissions — rarely a good idea!",
        },
      },
      {
        heading: { ar: "العناوين التي ستديرها كل يوم", en: "The Addresses You Will Manage Daily" },
        body: {
          ar: "كل عناوين الشبكات الكبرى مبنية على هذين النظامين:\n\n- IPv4 بالنقاط العشرية: أربع ثمانيات كل واحدة 8 بتات = 32 بتاً. مثال محلول: 192 = 128 + 64 = 11000000، و168 = 128 + 32 + 8 = 10101000. فالعنوان 192.168.1.10 هو بايت 11000000.10101000.00000001.00001010 مقنّعاً بعباءة عشرية مقروءة\n- IPv6 بالست عشري: ثماني مجموعات، كل مجموعة 4 خانات ست عشرية = 16 بتاً → 128 بتاً إجمالاً. مثال: 2001:0db8:0000:0000:0000:ff00:0042:8329 يُختصر إلى 2001:db8::ff00:42:8329 (حذف الأصفار البادئة واستبدال أطول سلسلة أصفار بـ ::)\n- MAC: 12 خانة ست عشرية = 48 بتاً، مثل 00:1A:2B:3C:4D:5E — النصف الأول معرّف المصنّع (OUI) والنصف الثاني رقم البطاقة\n\nالآن صرت تقرأ هذه الصفوف كما يقرأ المهندسون: 0x مقدمة تعني «ست عشري»، والبادئة 0b تعني «ثنائي».",
          en: "Every major network address is built on these two systems:\n\n- IPv4 in dotted decimal: four octets of 8 bits each = 32 bits. Worked example: 192 = 128 + 64 = 11000000, and 168 = 128 + 32 + 8 = 10101000. So 192.168.1.10 is really 11000000.10101000.00000001.00001010 wearing a readable decimal costume\n- IPv6 in hex: eight groups, each of 4 hex digits = 16 bits → 128 bits total. Example: 2001:0db8:0000:0000:0000:ff00:0042:8329 shortens to 2001:db8::ff00:42:8329 (leading zeros dropped, longest zero run replaced by ::)\n- MAC: 12 hex digits = 48 bits, like 00:1A:2B:3C:4D:5E — the first half is the manufacturer's OUI, the second half is the card's number\n\nYou now read these rows the way engineers do: a 0x prefix means «hexadecimal», and 0b means «binary».",
        },
      },
      {
        heading: { ar: "تمارين ذهنية وحاسبات", en: "Mental Drills & Calculators" },
        body: {
          ar: "مهارات صغيرة تصنع فارقاً كبيراً في الامتحان وفي العمل:\n\n- العنوان ينتهي بالخانة 255؟ غالباً عنوان بث لشبكة /24\n- الثمانية FF = 255 = ثمانية آحاد = كل البتات في جزء الشبكة\n- تحويل ثنائي↔ست عشري عقلياً عبر جدول الأنصاف، دون المرور بالعشري أصلاً\n\nاستخدم الحاسبة للتحقق لا للتفكير:\n\n- في لينكس: printf '%x\\n' 214 يطبع d6، وprintf '%d\\n' 0xD6 يطبع 214\n- وفي بايثون: bin(202) وhex(214) وint('11001010', 2)\n\nالهدف النهائي ليس الحفظ الأعمى، بل الطلاقة: أن تنظر إلى D6 وتشعر فوراً بثقل 214 وقربها من حد 255.",
          en: "Small skills make a big difference in exams and at work:\n\n- An address ending in 255? Likely the broadcast address of a /24\n- The octet FF = 255 = eight ones = all bits in the network part\n- Convert binary↔hex mentally via the nibble table, without even passing through decimal\n\nUse calculators to verify, not to think:\n\n- On Linux: printf '%x\\n' 214 prints d6, and printf '%d\\n' 0xD6 prints 214\n- In Python: bin(202), hex(214) and int('11001010', 2)\n\nThe end goal is not blind memorization but fluency: you glance at D6 and instantly feel the weight of 214 near the 255 boundary.",
        },
      },
    ],
    keyPoints: [
      { ar: "التدوين الموضعي هو القاعدة المشتركة: قيمة الخانة = الرقم × الأساس^الموضع", en: "Positional notation is the shared rule: digit value = digit × base^position" },
      { ar: "قوى 2 (128 64 32 16 8 4 2 1) هي مفتاح تحويل الثمانيات: 11010110 = 214", en: "The powers of 2 (128 64 32 16 8 4 2 1) unlock octet conversion: 11010110 = 214" },
      { ar: "4 بتات = خانة ست عشرية واحدة: 1101 0110 = D6 — والجدول 0-15 مرجعك الدائم", en: "4 bits = one hex digit: 1101 0110 = D6 — and the 0-15 table is your permanent reference" },
      { ar: "أذونات يونكس ثمانية خالصة: 7 = 111 = rwx، و5 = 101 = r-x", en: "Unix permissions are pure octal: 7 = 111 = rwx, and 5 = 101 = r-x" },
      { ar: "IPv4 أربع ثمانيات (32 بتاً)، وIPv6 ثماني مجموعات ست عشرية (128 بتاً)، وMAC 12 خانة ست عشرية (48 بتاً)", en: "IPv4 is four octets (32 bits), IPv6 is eight hex groups (128 bits), and MAC is 12 hex digits (48 bits)" },
      { ar: "IPv6 يختصر بحذف الأصفار البادئة واستبدال أطول مجموعة أصفار متتالية بـ ::", en: "IPv6 shortens by dropping leading zeros and replacing the longest zero run with ::" },
    ],
    quiz: [
      {
        q: { ar: "ما القيمة العشرية للثنائي 11010110؟", en: "What is the decimal value of binary 11010110?" },
        options: [
          { ar: "212", en: "212" },
          { ar: "214", en: "214" },
          { ar: "198", en: "198" },
          { ar: "216", en: "216" },
        ],
        correct: 1,
        explain: {
          ar: "اجمع أوزان البتات 1: 128 + 64 + 16 + 4 + 2 = 214. البتتان 32 و1 تساويان صفراً.",
          en: "Add the weights of the 1-bits: 128 + 64 + 16 + 4 + 2 = 214. The 32 and 1 bits are zero.",
        },
      },
      {
        q: {
          ar: "الثمانية الثنائية 11010000 تكافئ أي قيمة ست عشرية؟",
          en: "The binary octet 11010000 equals which hex value?",
        },
        options: [
          { ar: "D0", en: "D0" },
          { ar: "0D", en: "0D" },
          { ar: "A0", en: "A0" },
          { ar: "C8", en: "C8" },
        ],
        correct: 0,
        explain: {
          ar: "قسّمها أنصافاً: 1101 = 13 = D و0000 = 0، فالناتج D0. لا تنعكس الأنصاف أبداً: D0 لا 0D.",
          en: "Split into nibbles: 1101 = 13 = D and 0000 = 0, giving D0. Never reverse the nibbles: D0, not 0D.",
        },
      },
      {
        q: {
          ar: "في chmod 755، ما صلاحيات فئة «المجموعة» (الخانة الثانية 5)؟",
          en: "In chmod 755, what permissions does the «group» class (the second digit, 5) get?",
        },
        options: [
          { ar: "قراءة وكتابة وتنفيذ", en: "Read, write and execute" },
          { ar: "قراءة وتنفيذ فقط", en: "Read and execute only" },
          { ar: "قراءة فقط", en: "Read only" },
          { ar: "كتابة فقط", en: "Write only" },
        ],
        correct: 1,
        explain: {
          ar: "5 = 101 في الثنائي = 4 (قراءة) + 1 (تنفيذ) بلا كتابة (2). المالك وحده يحصل على 7 الكاملة.",
          en: "5 = 101 in binary = 4 (read) + 1 (execute) with no write (2). Only the owner gets the full 7.",
        },
      },
      {
        q: {
          ar: "عنوان MAC مثل 00:1A:2B:3C:4D:5E يتكون من:",
          en: "A MAC address like 00:1A:2B:3C:4D:5E consists of:",
        },
        options: [
          { ar: "8 خانات ثمانية", en: "8 octal digits" },
          { ar: "12 خانة ست عشرية (48 بتاً)", en: "12 hex digits (48 bits)" },
          { ar: "32 بتاً عشرياً", en: "32 decimal bits" },
          { ar: "6 أرقام عشرية فقط", en: "6 plain decimal numbers" },
        ],
        correct: 1,
        explain: {
          ar: "كل خانة ست عشرية = 4 بتات، و12 خانة × 4 = 48 بتاً. النصف الأول OUI للمصنّع والثاني معرف البطاقة.",
          en: "Each hex digit = 4 bits, and 12 digits × 4 = 48 bits. The first half is the vendor's OUI, the second the card identifier.",
        },
      },
    ],
  },
  {
    id: "l144",
    moduleId: "m15",
    order: 4,
    level: "intermediate",
    title: {
      ar: "الإحصاء الوصفي: المتوسط والوسيط والمنوال",
      en: "Descriptive Statistics: Mean, Median & Mode",
    },
    summary: {
      ar: "أنواع البيانات قبل أي حساب، ثم المتوسط والوسيط والمنوال على بيانات حقيقية للاعبين — ومتى يكذب المتوسط عليك.",
      en: "Data types before any calculation, then mean, median and mode on real gamer data — and exactly when the mean lies to you.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "أنواع البيانات: قبل أي حساب", en: "Data Types: Before Any Calculation" },
        body: {
          ar: "أكبر خطأ في تحليل الاستبيانات ليس حسابيّاً بل تصنيفيّ: تطبيق المقياس الخطأ على نوع البيانات الخطأ. صنّف أولاً، واحسب ثانياً:\n\n- فئوية (Categorical): تصنيف بلا ترتيب طبيعي — نوع اللعبة المفضلة، الجهاز المستخدم، الجنس\n- عددية (Numerical): كميات تقاس بالأرقام، وتنقسم إلى:\n  - منفصلة (Discrete): عدّ صحيح — عدد المباريات هذا الأسبوع\n  - مستمرة (Continuous): أي قيمة ضمن مدى — ساعات النوم (6.5 ساعة معقولة تماماً)، زمن البينغ بالمللي ثانية\n- ترتيبية (Ordinal): فئات مرتبة دون فروق متساوية — مقياس ليكرت 1-5 (المسافة بين «محايد» و«أوافق» ليست بالضرورة مساوية للمسافة بين «أوافق» و«أوافق بشدة»)\n\nفي مشروعك عن اللاعبين ستجد الأنواع كلها: ساعات اللعب (مستمرة)، عدد مرات الانقطاع (منفصل)، نوع الجهاز (فئوي)، ورضا البينغ على ليكرت (ترتيبي).",
          en: "The biggest mistake in survey analysis is not arithmetic but classification: applying the wrong measure to the wrong data type. Classify first, calculate second:\n\n- Categorical: classification without natural order — preferred game genre, device used, gender\n- Numerical: quantities measured in numbers, split into:\n  - Discrete: whole-number counts — matches played this week\n  - Continuous: any value in a range — sleep hours (6.5 is perfectly sensible), ping in milliseconds\n- Ordinal: ordered categories without equal gaps — the 1-5 Likert scale (the distance from «neutral» to «agree» is not necessarily the same as from «agree» to «strongly agree»)\n\nYour gamers project contains all of them: gaming hours (continuous), disconnect count (discrete), device type (categorical), and ping satisfaction on Likert (ordinal).",
        },
        table: {
          caption: { ar: "نوع البيانات يحدد المقاييس المشروعة", en: "The data type decides the legitimate measures" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "أمثلة من مشروع اللاعبين", en: "Examples from the gamers project" },
            { ar: "المقياس المناسب", en: "Suitable measure" },
          ],
          rows: [
            [
              { ar: "فئوي", en: "Categorical" },
              { ar: "نوع اللعبة، الجهاز، نظام التشغيل", en: "Game genre, device, operating system" },
              { ar: "المنوال والتكرارات والنسب", en: "Mode, counts and percentages" },
            ],
            [
              { ar: "عددي منفصل", en: "Discrete" },
              { ar: "عدد المباريات، عدد مرات الانقطاع", en: "Match count, disconnect count" },
              { ar: "الثلاثة كلها (متوسط/وسيط/منوال)", en: "All three (mean/median/mode)" },
            ],
            [
              { ar: "عددي مستمر", en: "Continuous" },
              { ar: "ساعات اللعب، ساعات النوم، البينغ ms", en: "Gaming hours, sleep hours, ping ms" },
              { ar: "المتوسط والوسيط (+ مقاييس التشتت)", en: "Mean and median (+ spread measures)" },
            ],
            [
              { ar: "ترتيبي", en: "Ordinal" },
              { ar: "رضا البينغ على مقياس 1-5", en: "Ping satisfaction on a 1-5 scale" },
              { ar: "الوسيط والمنوال والتكرارات", en: "Median, mode and counts" },
            ],
          ],
        },
      },
      {
        heading: { ar: "المتوسط الحسابي: الصيغة والفخ", en: "The Arithmetic Mean: Formula & Trap" },
        body: {
          ar: "المتوسط (Mean) أكثر المقاييس شهرة: اجمع القيم واقسم على عددها.\n\nالمتوسط = (مجموع القيم) ÷ (عددها) = Σx ÷ n\n\nمثال محلول — ساعات نوم ستة لاعبين: 5، 6، 6، 7، 9، 12\n\n- المجموع = 5 + 6 + 6 + 7 + 9 + 12 = 45\n- المتوسط = 45 ÷ 6 = 7.5 ساعة\n\nلكن انظر عن قرب: القيمة 12 «نوم عطلة نهاية الأسبوع» تسحب المتوسط لأعلى. لو حذفناها وحدها: 33 ÷ 5 = 6.6 ساعة. قيمة واحدة غيّرت المتوسط 0.9 ساعة كاملة!\n\n- المتوسط يستخدم كل قيمة في الحساب — وهذه قوته وضعفه معاً\n- القيم الشاذة (Outliers) المتطرفة تحرفه بعيداً عن «مركز» البيانات الحقيقي\n- متوسط الرواتب مع موظف واحد براتب أسطوري يكذب عن الجميع — نفس الفكرة تماماً",
          en: "The mean is the most famous measure: add the values, divide by their count.\n\nMean = (sum of values) ÷ (count) = Σx ÷ n\n\nWorked example — sleep hours of six gamers: 5, 6, 6, 7, 9, 12\n\n- Sum = 5 + 6 + 6 + 7 + 9 + 12 = 45\n- Mean = 45 ÷ 6 = 7.5 hours\n\nBut look closely: the value 12 — «a weekend recovery sleep» — drags the mean upward. Remove it alone: 33 ÷ 5 = 6.6 hours. One single value moved the mean by a full 0.9 hours!\n\n- The mean uses every value in the calculation — its strength and its weakness at once\n- Extreme outliers pull it away from the true «center» of the data\n- A salary average with one legendary CEO salary lies about everyone — exactly the same idea",
        },
      },
      {
        heading: { ar: "الوسيط: المقاوم للقيم الشاذة", en: "The Median: Outlier-Resistant" },
        body: {
          ar: "الوسيط (Median) هو القيمة الوسطى بعد ترتيب البيانات تصاعدياً — نصف القيم فوقه ونصفها تحته.\n\nقواعد الحساب:\n\n- عدد فردي من القيم: الوسيط هو القيمة في المنتصف بالضبط\n- عدد زوجي: متوسط القيمتين الوسطيتين\n\nعلى بيانات النوم نفسها (الترتيب جاهز أصلاً): 5، 6، 6، 7، 9، 12\n\n- القيمتان الوسطيتان: 6 و7\n- الوسيط = (6 + 7) ÷ 2 = 6.5 ساعة\n\nاختبر مقاومته: استبدل القيمة 12 بـ 100 (نوم إغفاء شهر كامل!):\n\n- الوسيط يبقى 6.5 — لم يتحرك قيد أنملة\n- المتوسط يقفز إلى 22.2 — انفجر تماماً\n\nلهذا يقال إن الوسيط «مقياس مقاوم» (Robust): يحاذي مركز البيانات حتى مع وجود شواذ. وفي بيانات النوم الملتوية — حيث يستطيع شخص واحد النوم 12 ساعة بينما لا يستطيع أحد النوم أقل من 0 — الوسيط هو الصديق الأمين.",
          en: "The median is the middle value after sorting the data ascending — half the values lie above it, half below.\n\nComputation rules:\n\n- Odd count: the median is the exact middle value\n- Even count: the average of the two middle values\n\nOn the same sleep data (already sorted): 5, 6, 6, 7, 9, 12\n\n- The two middle values: 6 and 7\n- Median = (6 + 7) ÷ 2 = 6.5 hours\n\nTest its resistance: replace the 12 with 100 (a month-long coma!):\n\n- The median stays 6.5 — unmoved by a hair\n- The mean jumps to 22.2 — completely blown up\n\nThat is why the median is called a robust measure: it tracks the data's center even with outliers present. And in skewed sleep data — where one person can sleep 12 hours but nobody can sleep below 0 — the median is the honest friend.",
        },
      },
      {
        heading: { ar: "المنوال: بطل البيانات الفئوية", en: "The Mode: Hero of Categorical Data" },
        body: {
          ar: "المنوال (Mode) هو القيمة الأكثر تكراراً. هو المقياس الوحيد الذي يعمل مع الفئويات — لأن «نوع اللعبة الأكثر شعبية» جملة منطقية بينما «متوسط أنواع الألعاب» هراء تام.\n\n- في بيانات النوم (5، 6، 6، 7، 9، 12): المنوال = 6 لأنه تكرر مرتين\n- في سؤال مفتوح «ما نوع لعبك المفضل؟» بتكرارات (تصويب 18، رياضات 12، استراتيجية 7): المنوال = تصويب\n- يمكن أن يكون للبيانات منوالان (bimodal) أو بلا منوال أصلاً إذا تساوت التكرارات\n\nملاحظة عملية لاستبيانك: المنوال والتكرارات المرافقة له هما ما تصنعه «أشهر نتيجة» في تقريرك — الجهاز الأكثر استخداماً، الفئة العمرية الأكبر، ساعات الذروة.",
          en: "The mode is the most frequently repeated value. It is the only measure that works for categorical data — because «the most popular genre» is a sensible sentence, while «the average of genres» is complete nonsense.\n\n- In the sleep data (5, 6, 6, 7, 9, 12): mode = 6, repeated twice\n- In an open question «what is your favorite genre?» with counts (shooter 18, sports 12, strategy 7): mode = shooter\n- Data can be bimodal, or have no mode at all when counts tie\n\nA practical note for your survey: the mode and its count are exactly what builds the «most common finding» in your report — the most-used device, the largest age group, the peak hours.",
        },
      },
      {
        heading: { ar: "أي مقياس تُبلّغ؟ والالتواء", en: "Which Measure to Report? And Skewness" },
        body: {
          ar: "القاعدة العملية:\n\n- بيانات متناظرة بلا شواذ: المتوسط ممثل ممتاز (وسيط قريب منه جداً)\n- بيانات ملتوية أو فيها شواذ: الوسيط أكثر صدقاً — أبلغ الاثنين معاً ليظهر الفرق\n- بيانات فئوية: المنوال والتكرارات، لا خيار آخر أصلاً\n\nحدس الالتواء (Skewness) في جملة واحدة: الذيل الطويل يسحب المتوسط نحوه ويترك الوسيط خلفه.\n\n- التواء أيمن (ذيل نحو القيم الكبيرة): المتوسط > الوسيط — حالة ساعات النوم والرواتب\n- التواء أيسر (ذيل نحو القيم الصغيرة): المتوسط < الوسيط\n- توزع متناظر: المتوسط ≈ الوسيط\n\nفي بياناتنا: 7.5 (متوسط) مقابل 6.5 (وسيط) → متوسط أكبر → التواء أيمن → اللاعب العادي ينام أقرب إلى 6.5 ساعة والرقم 12 حالة خاصة لا قاعدة.",
          en: "The practical rule:\n\n- Symmetric data without outliers: the mean is an excellent representative (the median sits very close)\n- Skewed data or outliers present: the median is more honest — report both so the gap itself is visible\n- Categorical data: the mode and its counts, there is genuinely no other option\n\nSkewness intuition in one sentence: the long tail drags the mean toward itself and leaves the median behind.\n\n- Right skew (tail toward large values): mean > median — the sleep-hours and salaries case\n- Left skew (tail toward small values): mean < median\n- Symmetric distribution: mean ≈ median\n\nIn our data: 7.5 (mean) vs 6.5 (median) → mean larger → right-skewed → the typical gamer sleeps closer to 6.5 hours, and the 12 is a special case, not the rule.",
        },
        table: {
          caption: { ar: "المقاييس الثلاثة: القوة والضعف", en: "The three measures: strength vs weakness" },
          headers: [
            { ar: "المقياس", en: "Measure" },
            { ar: "نقطة القوة", en: "Strength" },
            { ar: "نقطة الضعف", en: "Weakness" },
            { ar: "استخدمه عندما", en: "Use it when" },
          ],
          rows: [
            [
              { ar: "المتوسط", en: "Mean" },
              { ar: "يستفيد من كل قيمة؛ مناسب للعمليات اللاحقة", en: "Uses every value; feeds later math" },
              { ar: "تنجرف بالقيم الشاذة بعيداً", en: "Dragged far by outliers" },
              { ar: "البيانات متناظرة وبلا شواذ", en: "Data is symmetric, outlier-free" },
            ],
            [
              { ar: "الوسيط", en: "Median" },
              { ar: "مقاوم للشواذ تماماً؛ مثالي للبيانات الملتوية", en: "Fully outlier-resistant; ideal for skewed data" },
              { ar: "يتجاهل حجم معظم القيم (مواقعها فقط)", en: "Ignores the magnitude of most values" },
              { ar: "بيانات ملتوية أو ترتيبية (ليكرت)", en: "Skewed or ordinal data (Likert)" },
            ],
            [
              { ar: "المنوال", en: "Mode" },
              { ar: "الوحيد المتاح للفئويات؛ سهل الفهم فوراً", en: "The only option for categoricals; instantly readable" },
              { ar: "قد يغيب أو يتعدد فيربك التقرير", en: "May be absent or multiple, confusing the report" },
              { ar: "الفئويات، أو أسرع تلخيص شعبي", en: "Categoricals, or a quick popularity summary" },
            ],
          ],
        },
        code: {
          lang: "python",
          snippet:
            "import statistics\n\nsleep = [5, 6, 6, 7, 9, 12]\nprint(statistics.mean(sleep))    # 7.5\nprint(statistics.median(sleep))  # 6.5\nprint(statistics.mode(sleep))    # 6",
        },
        tip: {
          ar: "عند الاشتباه بالالتواء، أبلغ الوسيط أولاً ثم المتوسط بين قوسين مع عبارة «بسبب قيمة/قيم شاذة» — هذا مستوى احترافي يلاحظه المصحح.",
          en: "When skewness is suspected, report the median first and the mean in parentheses «due to outlier(s)» — that professional touch gets noticed by graders.",
        },
      },
    ],
    keyPoints: [
      { ar: "صنّف نوع البيانات قبل الحساب: فئوية، منفصلة، مستمرة، ترتيبية", en: "Classify the data type before calculating: categorical, discrete, continuous, ordinal" },
      { ar: "المتوسط = Σx ÷ n؛ يستخدم كل قيمة فينجرف بالشواذ (12 ساعة نوم سحبته إلى 7.5)", en: "Mean = Σx ÷ n; it uses every value so outliers drag it (the 12-hour sleep pulled it to 7.5)" },
      { ar: "الوسيط مقاوم للشواذ: (6+7)÷2 = 6.5 ساعة، ولا يتحرك لو صارت الشاذة 100", en: "The median resists outliers: (6+7)÷2 = 6.5 hours, unmoved even if the outlier becomes 100" },
      { ar: "المنوال هو المقياس الوحيد الممكن للبيانات الفئوية", en: "The mode is the only workable measure for categorical data" },
      { ar: "بيانات ليكرت ترتيبية: للوسيط والمنوال والتكرارات فيها الأولوية", en: "Likert data is ordinal: median, mode and counts take priority there" },
      { ar: "متوسط أكبر من وسيط = التواء أيمن: الذيل الطويل نحو القيم الكبيرة", en: "Mean greater than median = right skew: the long tail points to large values" },
    ],
    commands: [
      { cmd: "python3 stats.py", desc: { ar: "تشغيل سكربت يحسب المتوسط والوسيط والمنوال لبيانات نوم اللاعبين", en: "Run the script computing mean, median and mode of the gamers' sleep data" } },
      { cmd: "python3 -c \"import statistics as s; print(s.median([5,6,6,7,9,12]))\"", desc: { ar: "حساب الوسيط مباشرة من سطر الأوامر", en: "Compute the median straight from the command line" } },
    ],
    quiz: [
      {
        q: {
          ar: "بيانات ساعات النوم: 5، 6، 6، 7، 9، 12. ما الوسيط؟",
          en: "Sleep-hours data: 5, 6, 6, 7, 9, 12. What is the median?",
        },
        options: [
          { ar: "7.5", en: "7.5" },
          { ar: "6.5", en: "6.5" },
          { ar: "6", en: "6" },
          { ar: "7", en: "7" },
        ],
        correct: 1,
        explain: {
          ar: "عدد القيم زوجي (6 قيم)، فالوسيط متوسط القيمتين الوسطيتين 6 و7: (6+7)÷2 = 6.5. أما 7.5 فهو المتوسط.",
          en: "The count is even (6 values), so the median averages the two middle values 6 and 7: (6+7)÷2 = 6.5. The 7.5 figure is the mean.",
        },
      },
      {
        q: {
          ar: "سؤال استبيانك: «ما نوع لعبك المفضل؟» بأجوبة نصية. أي مقياس يلخصه بشكل صحيح؟",
          en: "Your survey asks: «What is your favorite game genre?» with text answers. Which measure summarizes it correctly?",
        },
        options: [
          { ar: "المتوسط الحسابي", en: "The arithmetic mean" },
          { ar: "الوسيط", en: "The median" },
          { ar: "المنوال مع التكرارات", en: "The mode with counts" },
          { ar: "الانحراف المعياري", en: "The standard deviation" },
        ],
        correct: 2,
        explain: {
          ar: "البيانات فئوية: لا معنى لجمع أنواع الألعاب أو ترتيبها عددياً. المنوال والتكرارات (تصويب 18 من 30 مثلاً) هو الوصف الصحيح الوحيد.",
          en: "The data is categorical: summing or numerically ordering genres is meaningless. The mode with counts (e.g. shooter 18 of 30) is the only correct summary.",
        },
      },
      {
        q: {
          ar: "لماذا يُعد المتوسط مضللاً في بيانات نوم اللاعبين هذه؟",
          en: "Why is the mean misleading for this gamers' sleep data?",
        },
        options: [
          { ar: "لأن عدد القيم زوجي", en: "Because the count of values is even" },
          { ar: "لأن القيمة الشاذة 12 تسحبه بعيداً عن مركز البيانات", en: "Because the outlier 12 drags it away from the data's center" },
          { ar: "لأن المتوسط يحسب دائماً بشكل خاطئ", en: "Because the mean is always computed wrongly" },
          { ar: "لأن البيانات فئوية لا عددية", en: "Because the data is categorical, not numerical" },
        ],
        correct: 1,
        explain: {
          ar: "القيمة 12 متطرفة نسبياً (نوم عطلة كامل). المتوسط يستخدم كل قيمة فتنجرف، بينما الوسيط يقاومها ويبقى 6.5.",
          en: "The value 12 is relatively extreme (a full weekend recovery). The mean uses every value so it drifts, while the median resists and stays at 6.5.",
        },
      },
      {
        q: {
          ar: "لاحظت في بياناتك أن المتوسط أكبر من الوسيط بفارق واضح. ماذا يعني ذلك غالباً؟",
          en: "You notice the mean is clearly larger than the median in your data. What does that usually indicate?",
        },
        options: [
          { ar: "توزع متناظر تماماً", en: "A perfectly symmetric distribution" },
          { ar: "تواء أيسر (ذيل نحو القيم الصغيرة)", en: "Left skew (tail toward small values)" },
          { ar: "تواء أيمن (ذيل نحو القيم الكبيرة)", en: "Right skew (tail toward large values)" },
          { ar: "خطأ في إدخال البيانات حتماً", en: "Definitely a data-entry error" },
        ],
        correct: 2,
        explain: {
          ar: "الذيل الطويل نحو القيم الكبيرة يشد المتوسط نحو اليمين ويترك الوسيط مكانه — توصيف التواء الأيمن الكلاسيكي، وهو شائع في ساعات النوم والرواتب.",
          en: "A long tail toward large values pulls the mean rightward while the median stays put — the classic description of right skew, common in sleep hours and salaries.",
        },
      },
    ],
  },
  {
    id: "l145",
    moduleId: "m15",
    order: 5,
    level: "intermediate",
    title: {
      ar: "قياس التشتت والعرض البصري للبيانات",
      en: "Measuring Spread & Visualizing Data",
    },
    summary: {
      ar: "المدى والتباين والانحراف المعياري خطوة بخطوة، والربيعيات ومخططات الصندوق من توكي، والفرق الأزلي بين المدرج والأعمدة — وJitter لغة مهندس الشبكات.",
      en: "Range, variance and standard deviation step by step, Tukey's quartiles and box plots, the eternal histogram-vs-bar confusion — and jitter, the networker's own spread.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "لماذا لا يكفي المتوسط وحده؟", en: "Why the Mean Alone Is Not Enough" },
        body: {
          ar: "لاعبان، متوسط البينغ عند كليهما 30 ms. أحدهما يلعب بسلاسة والآخر يشكو من «تقطيع». المتوسطان متساويان — فأين المشكلة؟ في التشتت (Spread): كم تتباعد القيم عن مركزها.\n\nقارن هاتين عينتي البينغ، كلتاهما بمتوسط 16 ms:\n\n- اللاعب الأول: 12، 14، 16، 18، 20 → المدى = 20 − 12 = 8\n- اللاعب الثاني: 4، 10، 16، 22، 28 → المدى = 28 − 4 = 24\n\nالمدى (Range) = القيمة العظمى − القيمة الصغرى. أبسط مقياس تشتت، لكنه يعتمد على قيمتين فقط فينخدع بسهولة: قيمة شاذة واحدة تصنع مدى مرعباً رغم بيانات هادئة.",
          en: "Two gamers, both averaging 30 ms ping. One plays smoothly, the other complains of stutter. The means are equal — so where is the problem? In the spread: how far the values scatter from their center.\n\nCompare these two ping samples, both averaging 16 ms:\n\n- Gamer one: 12, 14, 16, 18, 20 → range = 20 − 12 = 8\n- Gamer two: 4, 10, 16, 22, 28 → range = 28 − 4 = 24\n\nThe range = maximum − minimum. It is the simplest spread measure, but it leans on just two values, so it is easily fooled: one outlier creates a terrifying range despite calm data.",
        },
      },
      {
        heading: { ar: "التباين والانحراف المعياري خطوة بخطوة", en: "Variance & Standard Deviation Step by Step" },
        body: {
          ar: "الانحراف المعياري (Standard Deviation، رمزه σ للمجتمع وs للعينة) يقيس متوسط ابتعاد القيم عن المتوسط — بوحدات البيانات نفسها، بخلاف التباين الذي يكون بوحدات مربعة.\n\nحساب σ على عينة اللاعب الأول (12، 14، 16، 18، 20):\n\n- الخطوة 1 — المتوسط: (12+14+16+18+20) ÷ 5 = 80 ÷ 5 = 16\n- الخطوة 2 — الانحرافات عن المتوسط: 12−16 = −4، 14−16 = −2، 16−16 = 0، 18−16 = +2، 20−16 = +4\n- الخطوة 3 — تربيع الانحرافات (لإلغاء الإشارات): 16، 4، 0، 4، 16\n- الخطوة 4 — مجموع المربعات: 16+4+0+4+16 = 40\n- الخطوة 5 — التباين (مجتمعي): 40 ÷ 5 = 8\n- الخطوة 6 — الانحراف المعياري: √8 ≈ 2.83 ms\n\nملاحظتان مهنيتان:\n\n- مع عينة صغيرة يستخدم المقام (n−1) بدل n فيخطو التباين إلى 10 والانحراف إلى ≈ 3.16 — جداول البيانات تفعل هذا تلقائياً في دالة STDEV\n- الآن عِد لعينة اللاعب الثاني ستجد انحرافها ≈ 9.8 ms — ثلاثة أضعاف! هذا هو «التقطيع» الذي اشتكى منه: قيمة متطابقة، تجربة مختلفة",
          en: "The standard deviation (symbol σ for a population, s for a sample) measures the typical distance of values from the mean — in the data's own units, unlike variance which lives in squared units.\n\nComputing σ on gamer one's sample (12, 14, 16, 18, 20):\n\n- Step 1 — the mean: (12+14+16+18+20) ÷ 5 = 80 ÷ 5 = 16\n- Step 2 — deviations from the mean: 12−16 = −4, 14−16 = −2, 16−16 = 0, 18−16 = +2, 20−16 = +4\n- Step 3 — square the deviations (killing the signs): 16, 4, 0, 4, 16\n- Step 4 — sum of squares: 16+4+0+4+16 = 40\n- Step 5 — (population) variance: 40 ÷ 5 = 8\n- Step 6 — standard deviation: √8 ≈ 2.83 ms\n\nTwo professional notes:\n\n- With a small sample, the denominator becomes (n−1) instead of n, nudging variance to 10 and the deviation to ≈ 3.16 — spreadsheets do this automatically in STDEV\n- Now redo gamer two's sample: its deviation ≈ 9.8 ms — threefold! That is the «stutter» complaint: identical mean, different experience",
        },
      },
      {
        heading: { ar: "الربيعيات ومخطط الصندوق (رسم توكي)", en: "Quartiles & the Box Plot (Tukey's Plot)" },
        body: {
          ar: "الحل الذكي لحساسية المدى: قسم البيانات المرتبة إلى أرباع بدل الاكتفاء بالطرفين.\n\n- الربيع الأول Q1: تحته 25% من البيانات\n- الربيع الثاني Q2: هذا هو الوسيط نفسه (50%)\n- الربيع الثالث Q3: تحته 75%\n- مدى الأرباع IQR = Q3 − Q1: «الصندوق» الذي يعيش فيه النصف الأوسط من بياناتك\n\nمثال محلول على ساعات نوم ثمانية لاعبين (مرتبة): 4، 5، 6، 6، 7، 8، 9، 10\n\n- النصف الأدنى: 4، 5، 6، 6 → Q1 = (5+6) ÷ 2 = 5.5\n- الوسيط: (6+7) ÷ 2 = 6.5\n- النصف الأعلى: 7، 8، 9، 10 → Q3 = (8+9) ÷ 2 = 8.5\n- IQR = 8.5 − 5.5 = 3 ساعات\n\nمخطط الصندوق (Box Plot) الذي اخترعه جون توكي عام 1977 يرسم هذه الأرقام الخمسة (الأدنى، Q1، الوسيط، Q3، الأقصى) في لمحة واحدة:\n\n- الصندوق = الأرباع الوسطى (50% من البيانات)\n- الخط داخل الصندوق = الوسيط\n- الشوارب (Whiskers) تمتد حتى آخر قيمة «طبيعية»\n- القيم الشاذة: أبعد من 1.5 × IQR من حافة الصندوق — تُرسم نقاطاً منفصلة\n\nقاعدة الشواذ هذه (1.5 × IQR) هي نفسها التي تستخدمها أدوات المراقبة لرصد قيم البينغ الشاذة آلياً.",
          en: "The clever fix for the range's sensitivity: split the sorted data into quarters instead of clinging to the two ends.\n\n- First quartile Q1: 25% of the data below it\n- Second quartile Q2: this is the median itself (50%)\n- Third quartile Q3: 75% below it\n- Interquartile range IQR = Q3 − Q1: the «box» where the middle half of your data lives\n\nWorked example on eight gamers' sorted sleep hours: 4, 5, 6, 6, 7, 8, 9, 10\n\n- Lower half: 4, 5, 6, 6 → Q1 = (5+6) ÷ 2 = 5.5\n- Median: (6+7) ÷ 2 = 6.5\n- Upper half: 7, 8, 9, 10 → Q3 = (8+9) ÷ 2 = 8.5\n- IQR = 8.5 − 5.5 = 3 hours\n\nThe box plot John Tukey invented in 1977 draws these five numbers (min, Q1, median, Q3, max) in a single glance:\n\n- The box = the middle two quartiles (50% of the data)\n- The line inside the box = the median\n- The whiskers stretch to the last «normal» value\n- Outliers: farther than 1.5 × IQR from the box edge — drawn as separate dots\n\nThat 1.5 × IQR rule is the very same one monitoring tools use to auto-flag anomalous ping values.",
        },
      },
      {
        heading: { ar: "اختيار الرسم الصحيح: المدرج ضد الأعمدة", en: "Choosing the Right Chart: Histogram vs Bar" },
        body: {
          ar: "أشهر التباس في تاريخ الإحصاء الاستبياني: مخطط الأعمدة (Bar Chart) والمدرج التكراري (Histogram) يبدوان أخوين توأمين لكنهما لغتين مختلفتين:\n\n- الأعمدة: لكل عمود فئة مستقلة (نوع لعبة، جهاز) — الأعمدة منفصلة وترتيبها حر\n- المدرج: المحور الأفقي متصل مقسوم فئات متجاورة (ساعات النوم 4-5، 5-6، 6-7…) — الأعمدة ملتصقة والترتيب إجباري\n\nومخطط التشتت (Scatter Plot) هو بطل مشروعك: نقطة لكل لاعب، المحور الأفقي ساعات اللعب والرأسي ساعات النوم — العلاقة المرئية تظهر فوراً (سحابة هابطة تعني: كلما زاد اللعب قلّ النوم).\n\nقاعدة الاختيار في جدول. والقاعدة الذهبية: خريطة ذهنية أولاً (انظر البيانات بعينك قبل أي حساب — فلسفة توكي نفسها: استكشاف قبل نمذجة).",
          en: "The most famous confusion in survey statistics: the bar chart and the histogram look like twin brothers but speak different languages:\n\n- Bars: each column is an independent category (genre, device) — columns are separated and their order is free\n- Histogram: the horizontal axis is continuous, cut into adjacent bins (sleep 4-5, 5-6, 6-7…) — columns touch and order is mandatory\n\nThe scatter plot is your project's hero: one dot per gamer, gaming hours on the x-axis and sleep hours on the y-axis — the relationship shows itself (a descending cloud means: more gaming, less sleep).\n\nThe choice rule sits in a table. And the golden rule: picture first (look at the data with your own eyes before any calculation — Tukey's own philosophy: explore before modelling).",
        },
        table: {
          caption: { ar: "أي رسم لأي بيانات؟", en: "Which chart for which data?" },
          headers: [
            { ar: "نوع الرسم", en: "Chart type" },
            { ar: "نوع البيانات", en: "Data type" },
            { ar: "مثال من مشروع اللاعبين", en: "Gamers-project example" },
          ],
          rows: [
            [
              { ar: "أعمدة Bar", en: "Bar chart" },
              { ar: "فئوي: فئات مستقلة", en: "Categorical: independent categories" },
              { ar: "عدد اللاعبين لكل نوع لعبة مفضل", en: "Player count per preferred genre" },
            ],
            [
              { ar: "مدرج تكراري Histogram", en: "Histogram" },
              { ar: "عددي مستمر مقسم فئات متجاورة", en: "Continuous numeric in adjacent bins" },
              { ar: "توزيع ساعات النوم (4-5، 5-6، 6-7…)", en: "Distribution of sleep hours (4-5, 5-6, 6-7…)" },
            ],
            [
              { ar: "تشتت Scatter", en: "Scatter plot" },
              { ar: "متغيران عدديان معاً", en: "Two numeric variables together" },
              { ar: "ساعات اللعب مقابل ساعات النوم", en: "Gaming hours vs sleep hours" },
            ],
            [
              { ar: "صندوق Box plot", en: "Box plot" },
              { ar: "ملخص الأرقام الخمسة (+ شواذ)", en: "Five-number summary (+ outliers)" },
              { ar: "مقارنة توزيع البينغ بين مزوّدين", en: "Comparing ping distributions across ISPs" },
            ],
            [
              { ar: "دائري Pie", en: "Pie chart" },
              { ar: "أجزاء من كل واحد (فئوي)", en: "Parts of one whole (categorical)" },
              { ar: "حصة كل جهاز من إجمالي اللاعبين", en: "Each device's share of all gamers" },
            ],
          ],
        },
      },
      {
        heading: { ar: "التشتت في حياة مهندس الشبكات", en: "Spread in a Networker's Life" },
        body: {
          ar: "تشتت الشبكة له اسم مهني: Jitter — تذبذب زمن الاستجابة. عندما تقيس البينغ 25 مرة تحصل على سلسلة، والمهندس الجيد لا يبلّغ متوسطها فقط بل متوسطها وانحرافها:\n\n- رابط A: 25 ± 2 ms → سلس ويمكن الاعتماد عليه للمكالمات والألعاب التنافسية\n- رابط B: 18 ± 15 ms → متوسط أفضل ورحلة أسوأ: القفزات ستقطع الصوت\n\nاتفاقيات مستوى الخدمة (SLA) الاحترافية تُصاغ دائماً بمقياسين: «متوسط زمن الاستجابة ≤ 30 ms وانحرافه المعياري ≤ 5 ms». المتوسط يعِد، والتشتت يضمن.\n\n- في مراقبة الشبكة: القيمة التي تتجاوز المتوسط بـ 3σ تستدعي تنبيهاً آلياً\n- في استبيانك: أبلغ عن التشتت كذلك — «متوسط ساعات النوم 6.6 بانحراف معياري 2.1» أصدق بكثير من رقم وحيد",
          en: "A network's spread has a professional name: jitter — the wobble of response time. When you measure ping 25 times you get a series, and a good engineer never reports only its mean but its mean and its deviation:\n\n- Link A: 25 ± 2 ms → smooth, dependable for calls and competitive gaming\n- Link B: 18 ± 15 ms → better mean, worse journey: spikes will chop the audio\n\nProfessional SLAs are always phrased with two numbers: «average response time ≤ 30 ms with standard deviation ≤ 5 ms». The mean promises; the spread guarantees.\n\n- In network monitoring: a value crossing mean + 3σ triggers an automated alert\n- In your survey: report spread too — «mean sleep 6.6 with standard deviation 2.1» is far more honest than a lone number",
        },
        code: {
          lang: "python",
          snippet:
            "import statistics\n\npings = [12, 14, 16, 18, 20]\nprint(statistics.stdev(pings))   # 3.16 (sample, n-1)\nprint(statistics.pstdev(pings))  # 2.83 (population, n)",
        },
        tip: {
          ar: "قاعدة الـ 3σ العملية: في بيانات قريبة من الطبيعية، نحو 99.7% من القيم تقع ضمن متوسط ± 3 انحرافات — أساس تنبيهات المراقبة وحدود الشواذ.",
          en: "The practical 3σ rule: in roughly normal data, about 99.7% of values fall within mean ± 3 deviations — the basis of monitoring alerts and outlier limits.",
        },
      },
    ],
    keyPoints: [
      { ar: "المتوسط لا يكفي: عينتان بمتوسط 16 ms يمكن أن تكونا 16±2.8 و16±9.8 — تجربتان مختلفتان تماماً", en: "The mean is not enough: two samples averaging 16 ms can be 16±2.8 and 16±9.8 — utterly different experiences" },
      { ar: "الانحراف المعياري = جذر متوسط مربعات الانحرافات: على [12,14,16,18,20] يبلغ ≈ 2.83", en: "Standard deviation = square root of the average squared deviation: ≈ 2.83 on [12,14,16,18,20]" },
      { ar: "IQR = Q3 − Q1 يمسك بالنصف الأوسط، وقاعدة 1.5 × IQR تحدد الشواذ — كما في مخطط توكي", en: "IQR = Q3 − Q1 grips the middle half, and the 1.5 × IQR rule flags outliers — as in Tukey's plot" },
      { ar: "الأعمدة للفئويات المنفصلة، والمدرج للمستمر في فئات متلاصقة، والتشتت لعلاقة متغيرين", en: "Bars for discrete categoricals, histograms for continuous data in touching bins, scatter for two-variable relationships" },
      { ar: "Jitter هو تشتت البينغ: 25±2 ms أفضل عملياً من 18±15 ms", en: "Jitter is ping spread: 25±2 ms beats 18±15 ms in practice" },
    ],
    commands: [
      { cmd: "ping -c 10 8.8.8.8", desc: { ar: "جمع 10 عينات بينغ لتحليل التشتت وJitter", en: "Collect 10 ping samples to analyze spread and jitter" } },
      { cmd: "python3 spread.py", desc: { ar: "حساب المدى والانحراف المعياري وIQR لعينات البينغ", en: "Compute range, standard deviation and IQR of the ping samples" } },
    ],
    quiz: [
      {
        q: {
          ar: "في مخطط الصندوق، ماذا يمثل الصندوق نفسه؟",
          en: "In a box plot, what does the box itself represent?",
        },
        options: [
          { ar: "كل البيانات من الأدنى إلى الأقصى", en: "All the data from min to max" },
          { ar: "القيم الشاذة فقط", en: "Only the outliers" },
          { ar: "الأرباع الوسطى: 50% من البيانات بين Q1 وQ3", en: "The middle quartiles: 50% of the data between Q1 and Q3" },
          { ar: "المتوسط ± انحراف معياري واحد", en: "The mean ± one standard deviation" },
        ],
        correct: 2,
        explain: {
          ar: "الصندوق يمتد من Q1 إلى Q3 فيحيط بالأرباع الوسطى — نصف البيانات. الشوارب تمدد المدى، والشواذ تُرسم نقاطاً منفصلة.",
          en: "The box spans Q1 to Q3, enclosing the middle quartiles — half the data. Whiskers extend the range, and outliers are drawn as separate dots.",
        },
      },
      {
        q: {
          ar: "البيانات [12، 14، 16، 18، 20]: ما الانحراف المعياري المجتمعي؟",
          en: "For the data [12, 14, 16, 18, 20], what is the population standard deviation?",
        },
        options: [
          { ar: "8", en: "8" },
          { ar: "2.83 تقريباً", en: "About 2.83" },
          { ar: "16", en: "16" },
          { ar: "4", en: "4" },
        ],
        correct: 1,
        explain: {
          ar: "الانحرافات ±4، ±2، 0 تتربع إلى 16، 4، 0، 4، 16 وتجمع 40، فالتباين 40÷5 = 8 والانحراف √8 ≈ 2.83. (الخيار 8 هو التباين نفسه!).",
          en: "Deviations ±4, ±2, 0 square to 16, 4, 0, 4, 16 and sum to 40, so variance = 40÷5 = 8 and deviation = √8 ≈ 2.83. (Option 8 is the variance itself!).",
        },
      },
      {
        q: {
          ar: "تريد عرض العلاقة بين ساعات اللعب وساعات النوم لكل مستجيب على حدة. أي رسم تختار؟",
          en: "You want to show the relationship between gaming hours and sleep hours for each respondent individually. Which chart?",
        },
        options: [
          { ar: "مخطط أعمدة", en: "A bar chart" },
          { ar: "مدرج تكراري", en: "A histogram" },
          { ar: "مخطط تشتت", en: "A scatter plot" },
          { ar: "مخطط دائري", en: "A pie chart" },
        ],
        correct: 2,
        explain: {
          ar: "التشتت يضع نقطة لكل فرد بمتغيرين عدديين معاً، فتظهر سحابة العلاقة فوراً — لا يمكن للأعمدة أو الدوائر تمثيل متغيرين لكل شخص.",
          en: "A scatter plot places one dot per person using two numeric variables at once, revealing the relationship cloud immediately — bars and pies cannot represent two variables per person.",
        },
      },
      {
        q: {
          ar: "وصفان لرابطين: A: 25±2 ms وB: 18±15 ms. أيهما أفضل لتطبيق مكالمات حساس للتقطيع؟",
          en: "Two link descriptions: A: 25±2 ms and B: 18±15 ms. Which is better for a stutter-sensitive calling app?",
        },
        options: [
          { ar: "B لأن متوسطه أقل", en: "B, because its mean is lower" },
          { ar: "A لأن تشتته أقل، فالجودة تعتمد على الاستقرار لا المتوسط وحده", en: "A, because its spread is lower — quality depends on stability, not the mean alone" },
          { ar: "متساويان لأن متوسط B أفضل جزئياً", en: "Equal, since B's mean is partially better" },
          { ar: "لا يمكن المقارنة دون قياس جديد", en: "Impossible to compare without new measurements" },
        ],
        correct: 1,
        explain: {
          ar: "التطبيبات التفاعلية تعذبها القفزات المفاجئة لا المتوسط. انحراف 15 ms يعني قفزات متكررة تقطع الصوت، بينما ±2 ms سلس حتى بمتوسط أعلى.",
          en: "Interactive apps are tortured by sudden spikes, not by the mean. A 15 ms deviation means recurring spikes that chop audio, while ±2 ms stays smooth even at a higher mean.",
        },
      },
    ],
  },
  {
    id: "l146",
    moduleId: "m15",
    order: 6,
    level: "intermediate",
    title: {
      ar: "أساسيات الاحتمالات",
      en: "Probability Basics",
    },
    summary: {
      ar: "فضاء العينة والقواعد الأربع للمئة احتمال، وحساب «التسعات» الشهير للتوافر، وفقد الحزم عبر القفزات — ورياضيات الاحتياط الذي ينقذ الشبكة.",
      en: "Sample space and the four rules you need 90% of the time, the famous nines arithmetic for uptime, packet loss across hops — and the redundancy maths that saves networks.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "فضاء العينة والحوادث", en: "Sample Space & Events" },
        body: {
          ar: "كل حساب احتمالي يبدأ بسؤال واحد: ما كل النواتج الممكنة؟ هذه المجموعة اسمها فضاء العينة (Sample Space) ورمزها Ω.\n\n- رمي نموذج متوازن: Ω = {1، 2، 3، 4، 5، 6} والحادثة «رقم زوجي» = {2، 4، 6}\n- إرسال 200 حزمة: Ω = كل الحزم المرسلة، والحادثة «حزمة ضائعة» = الحزم الست التي لم تصل\n- بطاقتا شبكة في خادم: Ω يضم أربع حالات (كلتاهما تعمل، الأولى فقط، الثانية فقط، كلتاهما فاشلة)\n\nالحادثة (Event) إذن مجموعة جزئية من فضاء العينة — وهنا يلتقي درس المجموعات (l141) بالاحتمالات: فالاحتمال في جوهره «حجم مجموعة» نسبيّ.",
          en: "Every probability calculation starts with one question: what are all possible outcomes? That set is called the sample space, symbol Ω.\n\n- Rolling a fair die: Ω = {1, 2, 3, 4, 5, 6} and the event «even number» = {2, 4, 6}\n- Sending 200 packets: Ω = all packets sent, and the event «packet lost» = the six that never arrived\n- Two NICs in a server: Ω contains four states (both up, first only, second only, both down)\n\nAn event is therefore a subset of the sample space — and here the sets lesson (l141) meets probability: probability is fundamentally a relative «set size».",
        },
      },
      {
        heading: { ar: "القاعدة الأساسية والمتممة", en: "The Basic Rule & the Complement" },
        body: {
          ar: "احتمال الحادثة = (عدد نواتج الحادثة) ÷ (كل النواتج الممكنة)، بشرط أن تكون النواتج متساوية الإمكان.\n\nمثال محلول من الشبكة: أرسلت 200 حزمة وضاع 6 منها:\n\n- P(فقد حزمة) = 6 ÷ 200 = 0.03 = 3%\n- P(وصول حزمة) = 194 ÷ 200 = 0.97 = 97%\n\nلاحظ: 0.03 + 0.97 = 1 — وهذه قاعدة المتممة، أذكى اختصار في الاحتمالات:\n\nP(لا تحدث A) = 1 − P(A)\n\nمتى تستخدم المتممة؟ عندما يكون «عدم الحدوث» أسهل عدّاً. مثال: احتمال وصول 10 حزم كلها؟ صعب مباشرة. لكن احتمال ضياع أي حزمة من العشر = 1 − P(لا يضيع أي شيء)… وهنا تنجح إعادة الصياغة التالية.",
          en: "Probability of an event = (outcomes in the event) ÷ (all possible outcomes), provided the outcomes are equally likely.\n\nWorked network example: you sent 200 packets and 6 were lost:\n\n- P(packet lost) = 6 ÷ 200 = 0.03 = 3%\n- P(packet delivered) = 194 ÷ 200 = 0.97 = 97%\n\nNotice: 0.03 + 0.97 = 1 — the complement rule, the smartest shortcut in probability:\n\nP(A does not happen) = 1 − P(A)\n\nWhen to use the complement? When «not happening» is easier to count. Example: the probability that 10 packets all arrive? Hard directly. But the probability that at least one of the ten is lost = 1 − P(none are lost)… and there the next reframing wins.",
        },
      },
      {
        heading: { ar: "الاستقلال والتنافي: الضرب أم الجمع؟", en: "Independence vs Exclusivity: Multiply or Add?" },
        body: {
          ar: "القاعدتان الأكثر استخداماً — والالتباس الأكثر ضرراً بينهما:\n\nالاستقلال (Independence): معرفة نتيجة الأول لا تغير احتمال الثاني. عندها نضرب:\n\n- مثال محلول: بطاقتا شبكة مستقلتان، احتمال فشل كل واحدة 1%\n- P(فشل كلتيهما معاً) = 0.01 × 0.01 = 0.0001 — أي واحد من كل عشرة آلاف! لهذا ينجو الخادم المزدوج عملياً\n\nالتنافي (Mutual Exclusivity): الحادثتان لا تحدثان معاً أبداً — لا يمكن للحزمة أن تكون TCP وUDP في الوقت نفسه. عندها نجمع:\n\n- P(TCP أو UDP) = P(TCP) + P(UDP)\n\nخريطة قرار سريعة:\n\n- «معاً» وحدثان مستقلان → اضرب\n- «أحدهما» وحدثان متنافيان → اجمع\n- «أحدهما على الأقل» وحدثان مستقلان → 1 − (احتمال عدم حدوث كليهما)",
          en: "The two most used rules — and the most damaging confusion between them:\n\nIndependence: knowing the first outcome does not change the second's probability. Then we multiply:\n\n- Worked example: two independent NICs, each failing with probability 1%\n- P(both fail together) = 0.01 × 0.01 = 0.0001 — one in ten thousand! That is why the dual-NIC server practically survives\n\nMutual exclusivity: the two events can never occur together — a packet cannot be TCP and UDP simultaneously. Then we add:\n\n- P(TCP or UDP) = P(TCP) + P(UDP)\n\nQuick decision map:\n\n- «Both» and independent → multiply\n- «Either» and mutually exclusive → add\n- «At least one» and independent → 1 − (probability neither happens)",
        },
        table: {
          caption: { ar: "الوضع، القاعدة، والمثال", en: "Situation, rule, example" },
          headers: [
            { ar: "الوضع", en: "Situation" },
            { ar: "القاعدة", en: "Rule" },
            { ar: "مثال", en: "Example" },
          ],
          rows: [
            [
              { ar: "حدثان مستقلان معاً", en: "Two independent events together" },
              { ar: "P(A) × P(B)", en: "P(A) × P(B)" },
              { ar: "فشل بطاقتي الشبكة كلتيهما: 0.0001", en: "Both NICs failing: 0.0001" },
            ],
            [
              { ar: "حدثان متنافيان: أحدهما", en: "Two exclusive events: either one" },
              { ar: "P(A) + P(B)", en: "P(A) + P(B)" },
              { ar: "الحزمة TCP أو UDP", en: "The packet is TCP or UDP" },
            ],
            [
              { ar: "متممة الحادثة", en: "Complement of an event" },
              { ar: "1 − P(A)", en: "1 − P(A)" },
              { ar: "وصول الحزمة = 1 − الفقد", en: "Delivery = 1 − loss" },
            ],
            [
              { ar: "أحدهما على الأقل (مستقلان)", en: "At least one (independent)" },
              { ar: "1 − P(لا) × P(لا)", en: "1 − P(not) × P(not)" },
              { ar: "نجاة أحد مساري الاحتياط", en: "One of two backup paths surviving" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الاحتمال الشرطي ولمحة عن بايز", en: "Conditional Probability & a Bayes Teaser" },
        body: {
          ar: "الاحتمال الشرطي (Conditional Probability) يجيب عن سؤال أدق: «ما احتمال A علماً بأن B حدث؟» ونكتبه P(A|B).\n\nبالحسّ لا بالصيغ:\n\n- في استبيانك: P(اللاعب في التصنيف العالي) قد تكون 10% عموماً… لكن P(التصنيف العالي | يلعب يومياً) قد تصبح 35% — الشرط غيّر الصورة كلياً\n- الالتباس الشهير في العكس: P(يلعب يومياً | تصنيف عالٍ) رقم آخر تماماً — «معظم العارفين قرأوا الكتاب» لا تساوي «معظم من قرأوا الكتاب عارفون»\n\nفكرة بايز في سطر: نبدأ باعتقاد مبدئي، ثم نعدّله عند وصول دليل جديد. مرشّح البريد المزعج يعمل بها: رسالة فيها كلمة «مكافأة مجانية»؟ ارفع احتمال «مزعجة». رابطتا الاحتياط كلتاهما «حمراء»؟ ارفع احتمال «عطل المصعد الرئيسي المشترك». ستحتاج صيغ بايز الكاملة لاحقاً في مادة الأمن — اليوم يكفي الحس السليم الشرطي.",
          en: "Conditional probability answers a sharper question: «what is the probability of A, given that B happened?» written P(A|B).\n\nBy intuition, not formulas:\n\n- In your survey: P(gamer is high-ranked) might be 10% overall… but P(high-ranked | plays daily) might reach 35% — the condition reshapes the picture entirely\n- The famous reversal trap: P(plays daily | high-ranked) is a completely different number — «most experts read the book» is not «most who read the book are experts»\n\nBayes' idea in one line: start with a prior belief, then update it when new evidence arrives. Spam filters run on it: an email containing «free reward»? Raise the «spam» probability. Both backup links red at once? Raise the «shared core failure» probability. You will need the full Bayes formulas later in security courses — for now, conditional common sense suffices.",
        },
      },
      {
        heading: { ar: "تطبيقات الشبكات: التسعات وفقد القفزات والاحتياط", en: "Networker Applications: Nines, Hop Loss & Redundancy" },
        body: {
          ar: "حيث تتحول الاحتمالات إلى أموال وعقود:\n\nمثال 1 — فقد عبر قفزات متعددة: مسار من 10 قفزات، كل قفزة توصل 99% من الحزم (تفقد 1%):\n\n- نجاة الحزمة عبر القفزات العشر = 0.99 × 0.99 × … عشر مرات = 0.99¹⁰ ≈ 0.904\n- أي نحو 90.4% فقط من الحزم تكمل المسار — أي ما يقارب 9.6% تتأثر بطريقة ما!\n- الدرس الهندسي: خسارة صغيرة تتضاعف عبر السلسلة — تحسين كل قفزة 0.5% يظهر أثره الكبير في المسار الكامل\n\nمثال 2 — رياضيات الاحتياط: رابطان مستقلان كل منهما بتوافر 99%:\n\n- الشبكة تسقط فقط إذا سقط الرابطان معاً: 0.01 × 0.01 = 0.0001\n- التوافر المركب = 1 − 0.0001 = 99.99% — قفزتان كاملتان بإضافة رابط واحد ذكي!\n\nمثال 3 — جدول التسعات: لغة عقود الخدمة حول العالم، يحوّل النسب المئوية إلى دقائق وأيام معاناة:",
          en: "Where probability turns into money and contracts:\n\nExample 1 — loss across multiple hops: a 10-hop path where each hop delivers 99% of packets (losing 1%):\n\n- Packet survival hop by hop = 0.99 × 0.99 × … ten times = 0.99¹⁰ ≈ 0.904\n- So only about 90.4% of packets complete the path — roughly 9.6% are affected somehow!\n- Engineering lesson: a small loss compounds down the chain — improving each hop by 0.5% shows its full weight across the whole path\n\nExample 2 — redundancy maths: two independent links, each with 99% availability:\n\n- The network dies only if both die together: 0.01 × 0.01 = 0.0001\n- Combined availability = 1 − 0.0001 = 99.99% — two full nines gained by one smart extra link!\n\nExample 3 — the nines table: the worldwide language of service contracts, converting percentages into minutes and days of suffering:",
        },
        table: {
          caption: { ar: "التسعات: من النسبة المئوية إلى دقائق التوقف", en: "The nines: from percentage to downtime minutes" },
          headers: [
            { ar: "التوافر", en: "Availability" },
            { ar: "التوقف السنوي", en: "Yearly downtime" },
            { ar: "التوقف الشهري", en: "Monthly downtime" },
            { ar: "الطابع", en: "Character" },
          ],
          rows: [
            [
              { ar: "99% (تسعتان)", en: "99% (two nines)" },
              { ar: "≈ 3.65 يوم", en: "≈ 3.65 days" },
              { ar: "≈ 7.3 ساعة", en: "≈ 7.3 hours" },
              { ar: "مقبول لشبكة منزلية", en: "Acceptable for a home lab" },
            ],
            [
              { ar: "99.9% (ثلاث)", en: "99.9% (three nines)" },
              { ar: "≈ 8.76 ساعة", en: "≈ 8.76 hours" },
              { ar: "≈ 43.8 دقيقة", en: "≈ 43.8 minutes" },
              { ar: "حد أدنى لمعظم الشركات", en: "Floor for most businesses" },
            ],
            [
              { ar: "99.99% (أربع)", en: "99.99% (four nines)" },
              { ar: "≈ 52.6 دقيقة", en: "≈ 52.6 minutes" },
              { ar: "≈ 4.4 دقيقة", en: "≈ 4.4 minutes" },
              { ar: "متطلب البنوك والمستشفيات", en: "Banks and hospitals requirement" },
            ],
            [
              { ar: "99.999% (خمس)", en: "99.999% (five nines)" },
              { ar: "≈ 5.26 دقيقة", en: "≈ 5.26 minutes" },
              { ar: "≈ 26 ثانية", en: "≈ 26 seconds" },
              { ar: "معدات الاتصالات الحاملة", en: "Carrier-grade telecom gear" },
            ],
          ],
        },
        tip: {
          ar: "احفظ التحويلة المفتاحية: كل «تسعة» إضافية تقسم زمن التوقف على 10. من 43.8 دقيقة إلى 4.4 دقيقة ب تسعة واحدة!",
          en: "Memorize the key conversion: each extra «nine» divides downtime by 10. From 43.8 minutes to 4.4 minutes with a single nine!",
        },
      },
    ],
    keyPoints: [
      { ar: "الاحتمال = نواتج الحادثة ÷ كل النواتج، والمتممة P(لا A) = 1 − P(A) أذكى اختصار", en: "Probability = event outcomes ÷ all outcomes, and the complement P(not A) = 1 − P(A) is the smartest shortcut" },
      { ar: "الحدثان المستقلان يضربان: فشل بطاقتين كلٍّ 1% معاً = 0.0001", en: "Independent events multiply: two 1% NICs failing together = 0.0001" },
      { ar: "الحدثان المتنافيان يجمعان: P(TCP أو UDP) = P(TCP) + P(UDP)", en: "Mutually exclusive events add: P(TCP or UDP) = P(TCP) + P(UDP)" },
      { ar: "فقد صغير يتضاعف عبر القفزات: 0.99¹⁰ ≈ 0.904 فيتأثر ~9.6% من الحزم", en: "Small loss compounds across hops: 0.99¹⁰ ≈ 0.904, so ~9.6% of packets are affected" },
      { ar: "رابطان مستقلان 99% يمنحان 99.99%: الاحتياط يضاعف التسعات", en: "Two independent 99% links yield 99.99%: redundancy multiplies nines" },
      { ar: "كل تسعة إضافية تقسم التوقف على 10: ثلاث تسعات = 43.8 دقيقة شهرياً", en: "Each extra nine divides downtime by 10: three nines = 43.8 minutes monthly" },
    ],
    quiz: [
      {
        q: {
          ar: "خادم ببطاقتي شبكة مستقلتين، احتمال فشل كل واحدة 1%. ما احتمال انقطاع الخادم كلياً (فشل كلتيهما)؟",
          en: "A server has two independent NICs, each with a 1% failure probability. What is the probability of total disconnection (both failing)?",
        },
        options: [
          { ar: "1%", en: "1%" },
          { ar: "2%", en: "2%" },
          { ar: "0.01% (0.0001)", en: "0.01% (0.0001)" },
          { ar: "50%", en: "50%" },
        ],
        correct: 2,
        explain: {
          ar: "الاستقلال يعني الضرب: 0.01 × 0.01 = 0.0001 = 0.01%. الخيار 2% خطأ الجمع الشهير — الجمع للمتنافيين فقط.",
          en: "Independence means multiplying: 0.01 × 0.01 = 0.0001 = 0.01%. The 2% option is the classic addition mistake — addition is for mutually exclusive events.",
        },
      },
      {
        q: {
          ar: "مسار من 10 قفزات، كل قفزة توصل 99% من الحزم. ما النسبة التقريبية للحزم التي تكمل المسار كاملاً؟",
          en: "A 10-hop path where each hop delivers 99% of packets. Roughly what share of packets complete the full path?",
        },
        options: [
          { ar: "99%", en: "99%" },
          { ar: "90% تقريباً", en: "About 90%" },
          { ar: "95%", en: "95%" },
          { ar: "80%", en: "80%" },
        ],
        correct: 1,
        explain: {
          ar: "النجاة عبر القفزات مستقلة متعاقبة: 0.99¹⁰ ≈ 0.904، أي نحو 90% فقط — وهذا يفسر حساسية تطبيقات الوقت الحقيقي لطول المسار.",
          en: "Survival across hops is sequential independence: 0.99¹⁰ ≈ 0.904, only about 90% — which explains why real-time apps are so sensitive to path length.",
        },
      },
      {
        q: {
          ar: "توافر 99.99% يعني توقفاً سنوياً يقارب:",
          en: "An availability of 99.99% implies a yearly downtime of about:",
        },
        options: [
          { ar: "8.76 ساعة", en: "8.76 hours" },
          { ar: "52.6 دقيقة", en: "52.6 minutes" },
          { ar: "3.65 أيام", en: "3.65 days" },
          { ar: "5.26 دقيقة", en: "5.26 minutes" },
        ],
        correct: 1,
        explain: {
          ar: "سنة = 525,600 دقيقة، والتوقف = 0.0001 × 525,600 ≈ 52.6 دقيقة. الأربع تسعات متطلب البنوك — والأربع تسعات تليها (خمس) تعطي 5.26 دقيقة فقط.",
          en: "A year = 525,600 minutes, and downtime = 0.0001 × 525,600 ≈ 52.6 minutes. Four nines is the banks' requirement — five nines gives just 5.26 minutes.",
        },
      },
      {
        q: {
          ar: "«الحزمة بروتوكولها TCP أو UDP» — العلاقة بين الحادثتين:",
          en: "«The packet's protocol is TCP or UDP» — the relationship between the two events is:",
        },
        options: [
          { ar: "مستقلة", en: "Independent" },
          { ar: "متنافية (لا تحدثان معاً)", en: "Mutually exclusive (cannot co-occur)" },
          { ar: "متممتان لبعضهما", en: "Complements of each other" },
          { ar: "شرطيتان", en: "Conditional" },
        ],
        correct: 1,
        explain: {
          ar: "الحزمة الواحدة لا تحمل بروتوكولين في الطبقة نفسها، فالحادثتان متنافيتان ويجمع احتمالهما. لو أضفنا بروتوكولات أخرى (ICMP…) فلا تصيران متممتين إلا إذا حصرنا الكل.",
          en: "One packet cannot carry two protocols at the same layer, so the events are mutually exclusive and their probabilities add. With more protocols (ICMP…) they stop being complements unless we cover the whole space.",
        },
      },
    ],
  },
  {
    id: "l147",
    moduleId: "m15",
    order: 7,
    level: "intermediate",
    title: {
      ar: "البحث الكمي وتصميم الاستبيان",
      en: "Quantitative Research & Survey Design",
    },
    summary: {
      ar: "هيكل مشروعك المصغر كاملاً: سؤال البحث، المتغير المستقل والتابع، الفرضيتان H0 وH1، العينة والانحياز، وبناء استبيان يستحق جمع بياناته.",
      en: "Your whole mini-project skeleton: the research question, IV and DV, H0 vs H1, sampling and bias, and building a questionnaire worth collecting.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الكمي أم النوعي؟", en: "Quantitative or Qualitative?" },
        body: {
          ar: "منهجان مختلفان لأسئلة مختلفة — والخلط بينهما أول أسباب فشل مشاريع الطلبة:\n\n- الكمي (Quantitative): يجيب عن «كم؟» و«ما مدى العلاقة؟» بأرقام قابلة للقياس والاختبار الإحصائي — مشروعك (ساعات اللعب مقابل النوم) كمي بامتياز\n- النوعي (Qualitative): يجيب عن «لماذا؟» و«كيف يعيش الناس التجربة؟» بمقابلات وملاحظات ونصوص — «ما شعور اللاعب عند فقد الاتصال في مباراة حاسمة؟» سؤال نوعي\n\nمختبر البوليتكنيك الذي ستقدمه مشروعك فيه ينص صراحة على البحث الكمي (Quantitative research) للاعبين، بمقياس ليكرت 1-5 — أي أنك في المسار الصحيح تماماً.",
          en: "Two different methods for different questions — and confusing them is the first cause of student-project failure:\n\n- Quantitative: answers «how much?» and «how strong is the relationship?» with numbers measurable and statistically testable — your project (gaming hours vs sleep) is proudly quantitative\n- Qualitative: answers «why?» and «how do people experience it?» with interviews, observations and text — «how does a gamer feel when the connection drops in a decisive match?» is a qualitative question\n\nThe polytechnic lab you will submit in explicitly calls for quantitative research on gamers with a 1-5 Likert scale — meaning you are exactly on the right track.",
        },
        table: {
          caption: { ar: "المنهجان وجهاً لوجه", en: "The two methods face to face" },
          headers: [
            { ar: "الجانب", en: "Aspect" },
            { ar: "الكمي", en: "Quantitative" },
            { ar: "النوعي", en: "Qualitative" },
          ],
          rows: [
            [
              { ar: "السؤال النموذجي", en: "Typical question" },
              { ar: "كم؟ ما العلاقة؟ ما الفرق؟", en: "How much? What relation? What difference?" },
              { ar: "لماذا؟ كيف؟ ما المعنى؟", en: "Why? How? What meaning?" },
            ],
            [
              { ar: "البيانات", en: "Data" },
              { ar: "أرقام: ساعات، نقاط ليكرت، ميلي ثانية", en: "Numbers: hours, Likert points, milliseconds" },
              { ar: "نصوص ومقابلات وملاحظات", en: "Texts, interviews, observations" },
            ],
            [
              { ar: "العينة", en: "Sample" },
              { ar: "أكبر ممكن (30+ مثالية للمشروع المصغر)", en: "As large as possible (30+ ideal for a mini-project)" },
              { ar: "صغيرة عميقة (5-12 مشاركاً)", en: "Small and deep (5-12 participants)" },
            ],
            [
              { ar: "التحليل", en: "Analysis" },
              { ar: "متوسطات ووسائط وارتباطات ورسوم", en: "Means, medians, correlations, charts" },
              { ar: "تصنيف الموضوعات وقراءة النصوص", en: "Thematic coding and close reading" },
            ],
            [
              { ar: "الناتج", en: "Output" },
              { ar: "أرقام واتجاهات وفرضيات مختبرة", en: "Numbers, trends, tested hypotheses" },
              { ar: "أفهام وسياقات وقصص", en: "Insights, contexts, stories" },
            ],
          ],
        },
      },
      {
        heading: { ar: "سؤال البحث: بوصلة المشروع", en: "The Research Question: the Project's Compass" },
        body: {
          ar: "كل شيء في مشروعك يُشتق من سؤال واحد مكتوب بإتقان. السؤال الجيد محدد ومحدود وقابل للإجابة بالأدوات المتاحة:\n\nسؤال ضعيف: «هل الألعاب مؤذية؟» — فضفاض، محمّل بأحكام، غير قابل للقياس\n\nسؤال جيد (مشروعك): «ما العلاقة بين عدد ساعات اللعب اليومية وعدد ساعات النوم لدى اللاعبين؟»\n\nصيغة مبسطة على غرار PICO تساعدك على البناء:\n\n- المجتمع (Population): من ندرس؟ اللاعبون النشطون\n- المتغير/التعرض (Variable): ما نُقيس علاقته؟ ساعات اللعب اليومية\n- الناتج (Outcome): ما الأثر المحتمل؟ ساعات النوم\n- الإطار (Setting): أين ومتى؟ جامعتك، هذا الفصل\n\nاختبر سؤالك بثلاثة أسئلة مراجعة: هل يمكن قياس كل كلمة فيه؟ هل تحدد البيانات المطلوبة بدقة؟ هل يستطيع غيرك فهمه دون شرحك؟",
          en: "Everything in your project derives from one well-written question. A good question is specific, bounded, and answerable with available tools:\n\nWeak question: «Are games harmful?» — vague, judgment-loaded, unmeasurable\n\nGood question (your project): «What is the relationship between daily gaming hours and sleep hours among gamers?»\n\nA simplified PICO-style frame helps you build it:\n\n- Population: who do we study? Active gamers\n- Variable/exposure: what relationship do we measure? Daily gaming hours\n- Outcome: the suspected effect? Sleep hours\n- Setting: where and when? Your university, this semester\n\nTest your question with three review questions: can every word in it be measured? Does it pin down the required data precisely? Can someone else understand it without your explanation?",
        },
      },
      {
        heading: { ar: "المتغيرات والفرضيات", en: "Variables & Hypotheses" },
        body: {
          ar: "المتغير (Variable) أي خاصية تختلف من شخص لآخر — ومشاريع العلاقة تحتاج متغيرين على الأقل بلغة واضحة:\n\n- المتغير المستقل (Independent Variable, IV): المتسبب المفترض أو المفسّر — ساعات اللعب اليومية (نظن أنها تؤثر)\n- المتغير التابع (Dependent Variable, DV): الناتج المتأثر المفترض — ساعات النوم (نظن أنها تتأثر)\n\nحيلة الحفظ: التابع «يعتمد» على غيره، والمستقل «يستقل» عن تأثير أحد. في الرسم البياني: المستقل على المحور الأفقي عادة والتابع على الرأسي.\n\nالفرضيات تُصاغ في جملتين متقابلتين بلغة سهلة:\n\n- H0 (الصفرية): لا توجد علاقة بين ساعات اللعب وساعات النوم لدى اللاعبين\n- H1 (البديلة): توجد علاقة (نتوقعها سالبة: كلما زاد اللعب قلّ النوم)\n\nلماذا نصوغ «اللا علاقة» أصلاً؟ لأن الاختبار الإحصائي في العمق لا يثبت صحة فرضية، بل يقيّم كم تبدو البيانات غريبة لو كانت H0 صحيحة — عقلية العدالة: البراءة افتراض حتى يثبت الدليل خلافها.",
          en: "A variable is any property that differs from person to person — and relationship projects need at least two, in clear language:\n\n- Independent Variable (IV): the presumed cause or explainer — daily gaming hours (we suspect it influences)\n- Dependent Variable (DV): the presumed affected outcome — sleep hours (we suspect it is influenced)\n\nMemory trick: the dependent «depends» on something else; the independent stands «independent» of anyone's influence. On a chart: IV usually on the horizontal axis, DV on the vertical.\n\nHypotheses come as two opposing sentences in plain language:\n\n- H0 (null): there is no relationship between gaming hours and sleep hours among gamers\n- H1 (alternative): there is a relationship (we expect it negative: more gaming, less sleep)\n\nWhy phrase «no relationship» at all? Because a statistical test never proves a hypothesis true; it evaluates how strange the data would look if H0 were true — the justice mindset: innocent until the evidence says otherwise.",
        },
      },
      {
        heading: { ar: "المجتمع والعينة والانحياز", en: "Population, Sample & Bias" },
        body: {
          ar: "المجتمع (Population) كل من تريد التعميم عليهم؛ والعينة (Sample) الجزء الذي ستقيسه فعلاً — لأن قياس كل اللاعبين في العالم مستحيل عملياً.\n\nطرائق الاختيار الأساسية:\n\n- العشوائية البسيطة (Simple Random): كل عضو في المجتمع فرصة متساوية — مثل القرعة على قائمة كاملة. أعدل طريقة وأصعبها تنظيماً\n- العينة الميسرة (Convenience): من يسهل الوصول إليه — أصدقاؤك، سيرفر الديسكورد الذي تشارك فيه\n\nالانحياز (Bias) هو النكاية الحقيقية: العينة الميسرة تجيب عن سؤال مختلف عما تظن!\n\n- استبيان في سيرفر «اللاعبين المتوسطين» سيرفع متوسط ساعات اللعب بلا رحمة — لأنك سألت الأكثر انغماساً أصلاً\n- الحل المهني الصادق: اعترف بالحد في تقريرك — «عينة ميسرة من مجتمع لاعبين متوسطي الانغماس، والنتائج استكشافية لا تعميمية» — جملة واحدة كهذه تنقذ مصداقية البحث كله\n- عملياً لمشروعك: استهدف 30+ مستجيباً، وحاول تنويع القنوات (الجامعة، مجموعات متعددة، لا سيرفر واحد فقط)",
          en: "The population is everyone you want to generalize to; the sample is the part you will actually measure — because measuring every gamer on Earth is practically impossible.\n\nThe basic selection methods:\n\n- Simple random: every member of the population has an equal chance — like a lottery over a complete list. The fairest method and the hardest to organize\n- Convenience sampling: whoever is easy to reach — your friends, the Discord server you hang out in\n\nBias is the real menace: a convenience sample answers a different question than you think!\n\n- A survey in a «hardcore gamers» server will mercilessly inflate average gaming hours — because you asked the most immersed people to begin with\n- The honest professional fix: confess the limit in your report — «a convenience sample of engaged gamers; findings are exploratory, not generalizable» — one such sentence rescues the whole study's credibility\n- Practically for your project: target 30+ respondents and diversify channels (university, several groups, not one server only)",
        },
      },
      {
        heading: { ar: "بنية الاستبيان والتجربة الاستطلاعية", en: "Questionnaire Structure & the Pilot" },
        body: {
          ar: "الاستبيان الجيد مبني كرحلة مدروسة، لا قائمة أسئلة متكدسة:\n\n1. صفحة البداية والموافقة: تعريف بمن أنت ولماذا تسأل، إفصاح عن الطوعية والسرية، وزر موافقة\n2. الديموغرافيا (2-4 أسئلة): العمر، الجنس، الجهاز الرئيسي — لاحقاً ستغدو هذه متغيرات مقارنة ذهبية\n3. النواة (الأسئلة الجوهرية): ساعات اللعب اليومية، ساعات النوم، رضا البينغ على مقياس ليكرت 1-5\n4. الختام المفتوح: «هل تريد إضافة أي شيء عن تجربتك؟» — يقصّ الخصوصيات التي فاتتك\n\nقبل النشر العام: التجربة الاستطلاعية (Pilot) على 3-5 أصدقاء:\n\n- كم دقيقة استغرقوا؟ (فوق 7 دقائق = تسرب مستجيبين)\n- أي سؤال قرأوه مرتين؟ (غموض يحتاج إعادة صياغة)\n- هل فهموا «رضا البينغ» دون شرح منك؟\n\nالخط الزمني الكامل لرحلة البحث في الرسم أدناه — وخمسة أسباط تسير عليها من الفكرة إلى التقرير:",
          en: "A good questionnaire is a designed journey, not a pile of questions:\n\n1. Opening & consent: introduce who you are and why you ask, disclose voluntariness and confidentiality, place a consent button\n2. Demographics (2-4 items): age, gender, main device — later these become golden comparison variables\n3. The core (substantive items): daily gaming hours, sleep hours, ping satisfaction on a 1-5 Likert scale\n4. Open closing: «Anything you'd like to add about your experience?» — it catches particularities you missed\n\nBefore public release: the pilot on 3-5 friends:\n\n- How many minutes did they take? (over 7 = respondent leakage)\n- Which question did they read twice? (ambiguity needing rewording)\n- Did they understand «ping satisfaction» without your explanation?\n\nThe full research-journey timeline sits in the diagram below — five beats from idea to report:",
        },
        diagram: {
          kind: "flow",
          title: { ar: "خط أنابيب البحث الكمي من الفكرة إلى التقرير", en: "The quantitative research pipeline from idea to report" },
          items: [
            { ar: "صياغة سؤال البحث والفرضيات", en: "Frame the research question & hypotheses" },
            { ar: "تصميم الاستبيان وتجربته على أصدقاء", en: "Design the questionnaire & pilot it with friends" },
            { ar: "جمع البيانات وتنظيفها", en: "Collect the data & clean it" },
            { ar: "التحليل والرسوم", en: "Analyze & visualize" },
            { ar: "كتابة التقرير والتوثيق", en: "Write the report & cite honestly" },
          ],
        },
      },
      {
        heading: { ar: "جسر إلى بقية الوحدة", en: "The Bridge to the Rest of the Module" },
        body: {
          ar: "هذا الدرس صمم الهيكل؛ والدروس الباقية تملأ العضلات:\n\n- l148: صياغة كل سؤال بعينه — مقياس ليكرت ومصائد الصياغة\n- l149: إدخال البيانات في جدول بيانات وتحليلها بدواله ورسومه\n- l150: أخلاقيات العمل كله وكتابة التقرير النهائي\n\nنصيحة إدارة المشروع: افتح الآن ملفاً واحداً باسم «قرارات المشروع» وسجل فيه كل قرار تتخذه (لماذا هذا السؤال؟ لماذا هذه الفئات؟) — يوم كتابة قسم «المناقشة» ستحتاج هذه السجلات، وستشكرك نفسك المستقبلية.",
          en: "This lesson designed the skeleton; the remaining lessons add the muscles:\n\n- l148: wording each individual question — the Likert scale and its pitfalls\n- l149: entering data into a spreadsheet and analyzing it with formulas and charts\n- l150: the ethics of all of it and writing the final report\n\nA project-management tip: open a single file now named «project decisions» and log every choice you make (why this question? why these brackets?) — on report-writing day you will need those records, and your future self will thank you.",
        },
        tip: {
          ar: "قاعدة الـ 7 دقائق: الاستبيان الأطول من 7 دقائق يفقد الربع الأخير من المستجيبين. اقصص بلا رحمة.",
          en: "The 7-minute rule: questionnaires longer than 7 minutes lose their final quarter of respondents. Cut ruthlessly.",
        },
      },
    ],
    keyPoints: [
      { ar: "الكمي يجيب عن «كم والعلاقة» بالأرقام — وهو مسار مشروعك المصغر بامتياز", en: "Quantitative answers «how much and what relation» with numbers — precisely your mini-project's track" },
      { ar: "سؤال البحث الجيد محدد وقابل للقياس: «ما العلاقة بين ساعات اللعب اليومية وساعات النوم؟»", en: "A good research question is specific and measurable: «What is the relationship between daily gaming hours and sleep hours?»" },
      { ar: "المستقل (اللعب) يفترض أنه يؤثر، والتابع (النوم) يفترض أنه يتأثر", en: "The IV (gaming) is presumed to influence; the DV (sleep) is presumed to be influenced" },
      { ar: "H0 تفترض «لا علاقة» وH1 تفترض وجود علاقة — والاختبار يزن غرابة البيانات تحت H0", en: "H0 assumes «no relationship» and H1 assumes one exists — the test weighs how odd the data look under H0" },
      { ar: "العينة الميسرة (أصدقاؤك) تنحاز؛ اعترف بذلك صراحة في قسم حدود الدراسة", en: "A convenience sample (your friends) is biased; confess it explicitly in the study-limitations section" },
      { ar: "بنية الاستبيان: موافقة ← ديموغرافيا ← نواة ← سؤال مفتوح، مع تجربة استطلاعية قبل النشر", en: "Questionnaire structure: consent → demographics → core → open question, with a pilot before release" },
    ],
    quiz: [
      {
        q: {
          ar: "في دراسة «ساعات اللعب اليومية مقابل ساعات النوم»، أيهما المتغير التابع (DV)؟",
          en: "In the study «daily gaming hours vs sleep hours», which is the dependent variable (DV)?",
        },
        options: [
          { ar: "ساعات اللعب اليومية", en: "Daily gaming hours" },
          { ar: "ساعات النوم", en: "Sleep hours" },
          { ar: "عمر المستجيب", en: "Respondent's age" },
          { ar: "نوع الجهاز المستخدم", en: "The device used" },
        ],
        correct: 1,
        explain: {
          ar: "التابع هو الناتج المتأثر المفترض. نفترض أن النوم «يعتمد» على اللعب — فاللعب مستقل والنوم تابع. والعمر والجهاز متغيرات ديموغرافية للمقارنة.",
          en: "The DV is the presumed affected outcome. We assume sleep «depends» on gaming — gaming is independent, sleep is dependent. Age and device are demographic comparison variables.",
        },
      },
      {
        q: {
          ar: "ماذا تنص الفرضية الصفرية H0 في مشروعك عادة؟",
          en: "What does the null hypothesis H0 typically state in your project?",
        },
        options: [
          { ar: "توجد علاقة سالبة قوية بين اللعب والنوم", en: "A strong negative relationship exists between gaming and sleep" },
          { ar: "لا توجد علاقة بين ساعات اللعب وساعات النوم", en: "No relationship exists between gaming hours and sleep hours" },
          { ar: "اللعب يحسن جودة النوم دائماً", en: "Gaming always improves sleep quality" },
          { ar: "العينة انحيازية لا تصلح للقياس", en: "The sample is biased and unfit for measurement" },
        ],
        correct: 1,
        explain: {
          ar: "الصفرية هي فرضية «اللا فرق/اللا علاقة» — خط البراءة الافتراضي الذي تحاول بياناتك زحزحته. البديلة H1 هي من تدّعي وجود علاقة.",
          en: "The null is the «no difference / no relationship» hypothesis — the default line of innocence your data tries to shake. The alternative H1 is the one claiming a relationship.",
        },
      },
      {
        q: {
          ar: "أرسلت استبيانك إلى سيرفر ديسكورد واحد «للاعبين المحترفين». ما تقييمك الأدق للعينة؟",
          en: "You sent your survey to a single «hardcore gamers» Discord server. What is the most accurate assessment of the sample?",
        },
        options: [
          { ar: "عينة عشوائية بسيطة ممتازة", en: "An excellent simple random sample" },
          { ar: "عينة ميسرة منحازة نحو الانغماس العالي في اللعب", en: "A convenience sample biased toward heavy gaming immersion" },
          { ar: "حصر شامل للمجتمع كله", en: "A complete census of the population" },
          { ar: "عينة طبقية متوازنة", en: "A balanced stratified sample" },
        ],
        correct: 1,
        explain: {
          ar: "الوصول السهل يعرّف العينة الميسرة، وسيرفر المحترفين يرفع متوسط ساعات اللعب — أي انحياز في الاتجاه الذي تدرسه نفسه! اعترف به في التقرير.",
          en: "Easy access defines convenience sampling, and a hardcore server inflates average gaming hours — a bias in the very direction you study! Acknowledge it in the report.",
        },
      },
      {
        q: {
          ar: "أي خطوة تأتي مباشرة بعد تصميم مسودة الاستبيان وقبل جمع البيانات الواسع؟",
          en: "Which step comes directly after drafting the questionnaire and before wide data collection?",
        },
        options: [
          { ar: "كتابة قائمة المصادر النهائية", en: "Writing the final reference list" },
          { ar: "الاستنتاج وكتابة المناقشة", en: "Drawing conclusions and writing the discussion" },
          { ar: "التجربة الاستطلاعية على 3-5 أشخاص لاختبار الوضوح والوقت", en: "The pilot with 3-5 people testing clarity and timing" },
          { ar: "حساب معامل الارتباط النهائي", en: "Computing the final correlation coefficient" },
        ],
        correct: 2,
        explain: {
          ar: "التجربة الاستطلاعية (Pilot) تكشف الغموض وطول المدة قبل أن تلوّث بياناتك الأساسية — أرخص لحظة لإصلاح الأخطاء في المشروع كله.",
          en: "The pilot exposes ambiguity and duration before your main data is contaminated — the cheapest error-fixing moment in the entire project.",
        },
      },
    ],
  },
  {
    id: "l148",
    moduleId: "m15",
    order: 8,
    level: "intermediate",
    title: {
      ar: "مقاييس ليكرت وصياغة الأسئلة الجيدة",
      en: "Likert Scales & Writing Good Questions",
    },
    summary: {
      ar: "من ورقة ليكيرت 1932 إلى استبيانك: نقاط المقياس الخمس، الجدل حول نقطة المنتصف، ومصائد الصياغة الأربع مع أمثلة سيئة وجيدة جنباً إلى جنب.",
      en: "From Likert's 1932 paper to your survey: the five points, the middle-option debate, and the four wording pitfalls with bad-and-better examples side by side.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "مقياس ليكرت: من 1932 إلى استبيانك", en: "The Likert Scale: from 1932 to Your Survey" },
        body: {
          ar: "عام 1932 نشر عالم النفس رنسيس ليكيرت (Rensis Likert) ورقته «تقنية لقياس الاتجاهات»، وقدم فيها فكرة بسيطة غيّرت البحث الاجتماعي: بدل السؤال نعم/لا، اعرض عبارة واطلب درجة موافقة متدرجة عليها. سميت لاحقاً باسمه: مقياس ليكرت.\n\nالشكل الكلاسيكي خمس نقاط متدرجة من الاعتراض إلى الموافقة:\n\n- «أشعر أن زمن الاستجابة (البينغ) في لعبتي مستقر» — من 1 (أعارض بشدة) إلى 5 (أوافق بشدة)\n\nسر نجاح الفكرة أن التقدير المتدرج يمسك درجات الرأي الرمادية: «أوافق نوعاً ما» موقف حقيقي واسع الانتشار لا يمكن لثنائية نعم/لا التقاطه.\n\nملاحظة إحصائية مهمة: كل نقطة ليكرت رقم من 1 إلى 5، لكن البيانات الناتجة ترتيبية (Ordinal) — الفرق بين 2 و3 ليس بالضرورة مساوياً للفرق بين 4 و5. سيترتب على ذلك قرارات تحليل في l149.",
          en: "In 1932 the psychologist Rensis Likert published «A Technique for the Measurement of Attitudes», offering one simple idea that changed social research: instead of yes/no, present a statement and ask for a graded degree of agreement. It was later named after him: the Likert scale.\n\nThe classic shape is five graded points from disagreement to agreement:\n\n- «I feel the latency (ping) in my game is stable» — from 1 (strongly disagree) to 5 (strongly agree)\n\nThe idea's secret of success: graded rating captures gray opinions — «somewhat agree» is a real, widespread position that a yes/no dichotomy cannot catch.\n\nA key statistical note: each Likert point is a number from 1 to 5, but the resulting data is ordinal — the gap between 2 and 3 is not necessarily equal to the gap between 4 and 5. Analysis decisions in l149 will follow from this.",
        },
        table: {
          caption: { ar: "نقاط المقياس الخمس ورموزها", en: "The five scale points and their codes" },
          headers: [
            { ar: "الرمز", en: "Code" },
            { ar: "العربية", en: "Arabic label" },
            { ar: "الإنجليزية", en: "English label" },
          ],
          rows: [
            [
              { ar: "1", en: "1" },
              { ar: "أعارض بشدة", en: "Strongly disagree" },
              { ar: "Strongly disagree", en: "Strongly disagree" },
            ],
            [
              { ar: "2", en: "2" },
              { ar: "أعارض", en: "Disagree" },
              { ar: "Disagree", en: "Disagree" },
            ],
            [
              { ar: "3", en: "3" },
              { ar: "محايد", en: "Neutral" },
              { ar: "Neutral", en: "Neutral" },
            ],
            [
              { ar: "4", en: "4" },
              { ar: "أوافق", en: "Agree" },
              { ar: "Agree", en: "Agree" },
            ],
            [
              { ar: "5", en: "5" },
              { ar: "أوافق بشدة", en: "Strongly agree" },
              { ar: "Strongly agree", en: "Strongly agree" },
            ],
          ],
        },
      },
      {
        heading: { ar: "فردي أم زوجي؟ جدل نقطة المنتصف", en: "Odd or Even? The Middle-Option Debate" },
        body: {
          ar: "سؤال تصميمي حقيقي: كم نقطة تضع؟\n\n- مقياس فردي (5 أو 7 نقاط): يقدم خيار «محايد» — ملاذ صادق لمن ليست له فكرة أو لا يهتم؛ النقد: يغري المترددين بالاختباء فيه\n- مقياس زوجي (4 أو 6 نقاط): يحذف المنتصف فيرغم كل مستجيب على الميل — «الاختيار القسري» (Forced choice)؛ النقد: يصنع مواقف وهمية لمن يحيد فعلاً\n\nالتوصية العملية لمشروعك: 5 نقاط. هي الأشهر عالمياً (المستجيبون يحفظونها عن ظهر قلب)، وسمتها المعتدلة تخفض مقاومة الإجابة، ومستوى «محايد» فيها يطرد بصدق من لا رأي له — وهؤلاء معلومة بحد ذاتها.\n\nالالتزام أهم من الاختي: إذا بدأت استبيانك بمقياس 5 نقاط فالتزم به حتى آخر سؤال تقديري — تغيير المقياس في المنتصف يفسد المقارنة بين الأسئلة ويشرد المستجيب.",
          en: "A genuine design question: how many points?\n\n- Odd scale (5 or 7 points): offers «neutral» — an honest refuge for the undecided or indifferent; criticism: it tempts fence-sitters to hide\n- Even scale (4 or 6 points): removes the middle, forcing every respondent to lean — «forced choice»; criticism: it manufactures fake positions for genuine neutrals\n\nThe practical recommendation for your project: 5 points. It is the world's most used (respondents know it by heart), its moderate length lowers answering friction, and its «neutral» level honestly filters out the opinion-less — who are themselves information\n\nConsistency beats choice: if you start with a 5-point scale, keep it to the last rating item — switching mid-survey breaks comparability across items and disorients respondents.",
        },
      },
      {
        heading: { ar: "مصائد صياغة الأسئلة الأربع", en: "The Four Question-Wording Pitfalls" },
        body: {
          ar: "سؤال واحد سيئ يفسد بيانات سؤال كامل — والمصائد الأربع الكبرى:\n\n- السؤال القائد (Leading): يزرع الجواب في السؤال نفسه — «أليس البينغ سيئاً في لعبتك؟» يضاعف الشكوى\n- السؤال المزدوج (Double-barreled): سؤالان في جملة واحدة — «هل أنت راضٍ عن سرعة التحميل واستقرار الاتصال؟»: من يرضى عن الأولى دون الثانية لا يملك خانة صادقة\n- الغموض (Ambiguity): كلمات مطاطة — «هل تلعب كثيراً؟»: «كثيراً» عند طالب في الامتحانات غيرها عند آخر في العطلة\n- المصطلح التقني (Jargon): «هل يؤثر إعداد QoS على الجITTER لديك؟» — سؤال تقني في استبيان لاعبين عاديين يعني بيانات عشوائية\n\nالجدول التالي يضع أمثلة سيئة وإصلاحها جنباً إلى جنب — احفظه، فأسئلة الامتحان ستدور حوله، ومصحح مشروعك سيصطاد هذه الأخطاء بفرح.",
          en: "One bad question ruins a whole item's data — the four great traps:\n\n- Leading: plants the answer inside the question — «Isn't the ping in your game terrible?» doubles the complaints\n- Double-barreled: two questions in one sentence — «Are you satisfied with download speed and connection stability?»: someone happy with the first but not the second has no honest option\n- Ambiguity: rubber words — «Do you play a lot?»: «a lot» for a student in exam season differs from one on holiday\n- Jargon: «Does your QoS setup affect your jitter?» — a technical question in a general gamers' survey means random data\n\nThe table below places bad examples and their fixes side by side — memorize it, exam questions revolve around it, and your project grader will happily hunt these errors.",
        },
        table: {
          caption: { ar: "صياغات سيئة مقابل صياغات مصلحة", en: "Bad wording vs repaired wording" },
          headers: [
            { ar: "الفخ", en: "Trap" },
            { ar: "صياغة سيئة", en: "Bad wording" },
            { ar: "الصياغة الأفضل", en: "Better wording" },
          ],
          rows: [
            [
              { ar: "قائد (موحٍ)", en: "Leading" },
              { ar: "أليست جودة الاتصال في مبارياتك سيئة؟", en: "Isn't the connection quality in your matches bad?" },
              { ar: "كيف تقيّم جودة الاتصال في مبارياتك؟ (ليكرت 1-5)", en: "How do you rate connection quality in your matches? (Likert 1-5)" },
            ],
            [
              { ar: "مزدوج", en: "Double-barreled" },
              { ar: "هل أنت راضٍ عن سرعة التحميل واستقرار الاتصال؟", en: "Are you satisfied with download speed and connection stability?" },
              { ar: "سؤالان منفصلان، واحد لكل موضوع", en: "Two separate questions, one per topic" },
            ],
            [
              { ar: "غامض", en: "Ambiguous" },
              { ar: "هل تلعب كثيراً؟", en: "Do you play a lot?" },
              { ar: "كم ساعة تلعب في اليوم المعتاد؟ (رقم)", en: "How many hours do you play on a typical day? (number)" },
            ],
            [
              { ar: "مصطلح تقني", en: "Jargon" },
              { ar: "هل يرفع ترتيب البث جودة اللعب لديك؟", en: "Does stream prioritization raise your gameplay quality?" },
              { ar: "هل يتحسن أداؤك عندما لا أحد في البيت يشاهد الفيديوهات؟", en: "Does your performance improve when nobody at home is streaming video?" },
            ],
          ],
        },
      },
      {
        heading: { ar: "تصميم خيارات الاختيار المتعدد", en: "Designing Multiple-Choice Options" },
        body: {
          ar: "أسئلة الفئات (مثل الإنفاق الشهري على اللعب) تحتاج قواعد دقيقة للخيارات:\n\n- شاملة (Exhaustive): تغطي كل الاحتمالات — لا يُحبس أحد خارج الخيارات\n- متبادلة الاستبعاد (Mutually Exclusive): لا تتقاطع — لا يجد مستجيب نفسه في خانتين معاً\n\nمثال المعيب: 0-10 و10-30 — من ينفق بالضبط 10؟ ينتمي للخانتين معاً!\n\nالمصلح من مشروعك الحقيقي:\n\n- 0$ (لا أنفق شيئاً)\n- 1$ إلى 10$\n- 11$ إلى 30$\n- أكثر من 30$\n\nقواعد إتقان إضافية:\n\n- رتب الخيارات منطقياً (تصاعدياً هنا) — العين تجد جوابها أسرع\n- «لا أعرف / لا ينطبق» خيار مشروع في أسئلة المعرفة، لا في أسئلة الرأي\n- اجعل الحدود الخارجية مفتوحة («أكثر من…») ليلجأ إليها الأطراف\n- عدد الخيارات 4-7: أقل يبخس التمييز وأكثر يرهق",
          en: "Category questions (like monthly gaming spend) need precise option rules:\n\n- Exhaustive: covering every possibility — nobody gets locked outside the options\n- Mutually exclusive: non-overlapping — no respondent fits two options at once\n\nThe flawed example: 0-10 and 10-30 — who spends exactly 10? They belong to both!\n\nThe fix, from your actual project:\n\n- $0 (I spend nothing)\n- $1 to $10\n- $11 to $30\n- More than $30\n\nExtra mastery rules:\n\n- Order options logically (ascending here) — the eye finds its answer faster\n- «Don't know / not applicable» is legitimate for knowledge questions, not opinion ones\n- Make the outer bounds open («more than…») so extremes have a home\n- Keep 4-7 options: fewer starves discrimination, more exhausts",
        },
      },
      {
        heading: { ar: "الترميز العكسي وتحليل بيانات ليكرت", en: "Reverse Scoring & Analyzing Likert Data" },
        body: {
          ar: "أداة احترافية تُبقي المستجيب متيقظاً: البنود المعاكسة (Reverse-scored items). معظم عباراتك «5 = إيجابي»، فازرع بينها عبارة معكوسة «5 = سلبي»:\n\n- عادي: «أشعر أن اتصالي مستقر أثناء اللعب» (5 = تجربة ممتازة)\n- معكوس: «يتقطع الاتصال لديّ في اللحظات المهمة» (5 = تجربة كارثية)\n\nفائدتان: تكسر رتابة الموافقة الآلية (من يضغط 5 على كل شيء سينكشف)، وتوازن الانحياز الإيجابي العام. لكن حذار عند التحليل: يجب عكس النقاط المعكوسة قبل أي جمع — النقطة 5 على البند المعكوس تصبح 1، والـ4 تصبح 2 (القاعدة: الجديد = 6 − القديم).\n\nكيف تحلل بيانات ليكرت؟ حسب مستوى الطموح:\n\n- الأسلم (ترتيبي خالص): الوسيط والمنوال والتكرارات والنسب لكل نقطة — «40% اختاروا 4 أو أكثر»\n- المقبول: متوسط البند الواحد كمؤشر وصفي سريع (مع الإفصاح أنه تقريب)\n- درجات المجموع (Summated scores): جمع بنود سابقة الترميز المتسقة الاتجاه (روح طريقة ليكيرت الأصلية!) لإنشاء درجة 10-50 مثلاً — مقبول عند اتساق البنود وعدم الاختلاط معكوساً بلا عكس\n\nوتذكّر دائماً: هذا المقياس ورقة علمية عمرها 90+ عاماً ما زالت الأكثر استخداماً في العالم — قوة الأفكار البسيطة المصممة بعناية.",
          en: "A professional tool that keeps respondents alert: reverse-scored items. Most of your statements read «5 = positive», so plant an inverted one among them:\n\n- Normal: «I feel my connection is stable while gaming» (5 = great experience)\n- Reversed: «My connection stutters at decisive moments» (5 = disastrous experience)\n\nTwo benefits: it breaks automatic-agreement monotony (someone clicking 5 on everything gets exposed), and it balances overall positive bias. But beware at analysis: reverse the reversed items before any summing — a 5 on the reversed item becomes 1, a 4 becomes 2 (rule: new = 6 − old).\n\nHow do you analyze Likert data? By ambition level:\n\n- Safest (purely ordinal): median, mode, counts and percentages per point — «40% chose 4 or higher»\n- Acceptable: a single item's mean as a quick descriptive index (disclosing it is an approximation)\n- Summated scores: summing consistently pre-scored same-direction items (the spirit of Likert's original method!) into a 10-50 score — acceptable when items are consistent and reversals are flipped\n\nAnd always remember: this scale is a 90+ year-old scientific paper still the most used in the world — the power of simple ideas designed carefully.",
        },
        tip: {
          ar: "اختبر كل سؤال بصياغة ليكيرت بسؤال واحد: هل يستطيع شخصان عاقلان مختلفان تفسير السؤال بالمعنى نفسه؟ إن كان الجواب لا — أعد الصياغة فوراً.",
          en: "Test every Likert item with one question: could two different reasonable people read the same meaning into it? If no — rewrite immediately.",
        },
      },
    ],
    keyPoints: [
      { ar: "مقياس ليكرت 1932: عبارة + درجة موافقة متدرجة؛ خمس نقاط من أعارض بشدة إلى أوافق بشدة", en: "The 1932 Likert scale: a statement + graded agreement; five points from strongly disagree to strongly agree" },
      { ar: "بيانات ليكرت ترتيبية: للوسيط والمنوال والتكرارات الأولوية على المتوسط", en: "Likert data is ordinal: median, mode and counts take priority over the mean" },
      { ar: "المصائد الأربع: السؤال القائد، المزدوج، الغامض، والمصطلح التقني", en: "The four traps: leading, double-barreled, ambiguous and jargon questions" },
      { ar: "خيارات الاختيار المتعدد يجب أن تكون شاملة ومتبادلة الاستبعاد: 0$ / 1-10$ / 11-30$ / 30$+", en: "MC options must be exhaustive and mutually exclusive: $0 / $1-10 / $11-30 / $30+" },
      { ar: "البنود المعكوسة تكسر الموافقة الآلية — وعكسها قبل التحليل: الجديد = 6 − القديم", en: "Reverse items break automatic agreement — flip them before analysis: new = 6 − old" },
      { ar: "التزم مقياساً واحداً (5 نقاط) في الاستبيان كله ليبقى قابلاً للمقارنة", en: "Keep one scale (5 points) across the whole survey to preserve comparability" },
    ],
    quiz: [
      {
        q: {
          ar: "«أليس البينغ في لعبتك سيئاً للغاية؟» — ما عيب هذا السؤال؟",
          en: "«Isn't the ping in your game terribly bad?» — what is this question's defect?",
        },
        options: [
          { ar: "سؤال مزدوج (سؤالان في واحد)", en: "Double-barreled (two questions in one)" },
          { ar: "سؤال قائد يوحي بالجواب داخل نصه", en: "A leading question planting the answer in its wording" },
          { ar: "سؤال غامض بكلمات مطاطة", en: "An ambiguous question with rubber words" },
          { ar: "سؤال مليء بالمصطلحات التقنية", en: "A question loaded with technical jargon" },
        ],
        correct: 1,
        explain: {
          ar: "صيغة «أليس… سيئاً للغاية» تلوي ذراع المستجيب نحو الشكوى قبل أن يجيب — النسخة المحايدة: «كيف تقيّم البينغ في لعبتك؟» بمقياس 1-5.",
          en: "The «isn't it terribly bad» phrasing arm-twists the respondent toward complaining before answering — the neutral version: «How do you rate the ping in your game?» on a 1-5 scale.",
        },
      },
      {
        q: {
          ar: "«هل أنت راضٍ عن سرعة التحميل واستقرار الاتصال؟» — ما العيب؟",
          en: "«Are you satisfied with download speed and connection stability?» — what is the defect?",
        },
        options: [
          { ar: "مزدوج: يجمع موضوعين في عبارة واحدة", en: "Double-barreled: it fuses two topics into one sentence" },
          { ar: "قائد نحو الرضا", en: "Leading toward satisfaction" },
          { ar: "يستخدم مصطلحات تقنية غامضة", en: "It uses vague technical jargon" },
          { ar: "لا عيب فيه إطلاقاً", en: "It has no defect at all" },
        ],
        correct: 0,
        explain: {
          ar: "سرعة التحميل واستقرار الاتصال أمران مختلفان؛ من يرضى عن أحدهما فقط سيضطر للكذب. الحل: سؤالان منفصلان.",
          en: "Download speed and connection stability are two different things; someone satisfied with only one is forced to lie. The fix: two separate questions.",
        },
      },
      {
        q: {
          ar: "أي معالجة إحصائية تعتبر الأسلم لسؤال ليكرت فردي واحد؟",
          en: "Which statistical treatment is considered safest for a single Likert item?",
        },
        options: [
          { ar: "المتوسط الحسابي وحده", en: "The arithmetic mean alone" },
          { ar: "الوسيط والمنوال والتكرارات لكل نقطة", en: "The median, mode and per-point counts" },
          { ar: "الانحراف المعياري وحده", en: "The standard deviation alone" },
          { ar: "معامل الارتباط مع العمر", en: "Its correlation with age" },
        ],
        correct: 1,
        explain: {
          ar: "بيانات نقطة واحدة ترتيبية: المسافات بين النقاط غير مضمونة التساوي، فالوسيط والتكرارات («60% اختاروا 4 أو أعلى») أوصف أصدق من متوسط يعامل الفروق كمتساوية.",
          en: "A single item's data is ordinal: the gaps between points are not guaranteed equal, so the median and counts («60% chose 4 or higher») describe more honestly than a mean treating gaps as equal.",
        },
      },
      {
        q: {
          ar: "الخيارات: «$0 / $1-10 / $11-30 / أكثر من $30». ما الخاصيتان المتحققتان هنا؟",
          en: "The options: «$0 / $1-10 / $11-30 / more than $30». Which two properties are satisfied here?",
        },
        options: [
          { ar: "شاملة ومتبادلة الاستبعاد", en: "Exhaustive and mutually exclusive" },
          { ar: "قائدة ومزدوجة", en: "Leading and double-barreled" },
          { ar: "غامضة ومتقاطعة", en: "Ambiguous and overlapping" },
          { ar: "ترتيبية فقط دون غيرها", en: "Ordinal only, nothing else" },
        ],
        correct: 0,
        explain: {
          ar: "كل مبلغ ممكن له خانة واحدة بالضبط (شاملة)، ولا مبلغ يسقط في خانتين (متبادلة) — القيم الحدية 10 و30 تحسم بانتمائها لفئة واحدة. لاحظ أنها فئات مشروعك الحقيقي نفسها.",
          en: "Every possible amount has exactly one slot (exhaustive), and no amount falls into two slots (mutually exclusive) — the boundary values 10 and 30 settle into a single bracket. Note these are your real project's brackets.",
        },
      },
    ],
  },
  {
    id: "l149",
    moduleId: "m15",
    order: 9,
    level: "intermediate",
    title: {
      ar: "تحليل بيانات الاستبيان بجداول البيانات",
      en: "Analyzing Survey Data in Spreadsheets",
    },
    summary: {
      ar: "من صفحة الإدخال النظيفة إلى الدوال والجداول المحورية والرسوم الصحيحة، مع مثال محلول كامل على بيانات 10 لاعبين — وتحذير الارتباط والسببية الشهير.",
      en: "From a clean entry sheet to formulas, pivot tables and the right charts, with a fully worked example on 10 gamers — and the famous correlation-vs-causation warning.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "إدخال البيانات وتنظيفها", en: "Data Entry & Cleaning" },
        body: {
          ar: "توافق جداول البيانات (Excel أو LibreOffice Calc أو Google Sheets) على قاعدة ذهبية: كل صف مستجيب واحد، وكل عمود متغير واحد — «بيانات نظيفة» تحليل سعيد.\n\nقواعد الإدخال الاحترافية:\n\n- القيم مرمّزة رقمياً حيث أمكن: ليكرت 1-5 كما هي، والفئات برمز متفق عليه تسجله في ورقة الشرح (1 = حاسوب، 2 = هاتف…)\n- خلية واحدة = قيمة واحدة: لا «3-4 ساعات» ولا «كثير» داخل خانة عددية\n- التاريخ والوقت تلقائيان إن أمكن (نماذج Google تفعلها) — سلاحك ضد التكرار\n\nالتنظيف قبل التحليل، دائماً:\n\n- التكرارات: صفان بنفس الطابع الزمني والقيم — يحذف أحدهما\n- المفقودات: خلايا فارغة — إما تستبعد الصف من حساب معين أو تبلغ العدد بصدق؛ لا تختلق قيمة أبداً\n- المستحيلات: نوم 26 ساعة أو لعب 24 ساعة ونوم 8 — راجع أو استبعد ووثّق قرارك\n\nقاعدة 10 دقائق: دقائق التنظيف العشر توفر ساعات من ارتباك الرسوم لاحقاً.",
          en: "Spreadsheets (Excel, LibreOffice Calc or Google Sheets) agree on one golden rule: one row per respondent, one column per variable — «tidy data, happy analysis».\n\nProfessional entry rules:\n\n- Values numerically coded where possible: Likert 1-5 as-is, and categories by an agreed code you record in a notes sheet (1 = PC, 2 = phone…)\n- One cell = one value: no «3-4 hours» and no «a lot» inside a numeric column\n- Timestamps automatic if possible (Google Forms does it) — your weapon against duplicates\n\nClean before analyzing, always:\n\n- Duplicates: two rows with the same timestamp and values — delete one\n- Missing values: empty cells — either exclude the row from that specific computation or report the count honestly; never invent a value\n- Impossibilities: 26 hours of sleep, or 24 hours of gaming plus 8 of sleep — review, exclude, and document your decision\n\nThe 10-minute rule: ten minutes of cleaning saves hours of charting confusion later.",
        },
      },
      {
        heading: { ar: "الدوال الأساسية", en: "The Core Formulas" },
        body: {
          ar: "عدد محدود من الدوال يغطي مشروعك كاملاً — تعلمها مرة واحدة:\n\nمثال محلول على بياناتنا المصغرة (الجدول في القسم التالي):\n\n- متوسط ساعات النوم: =AVERAGE(C2:C11) → 60 ÷ 10 = 6.0 ساعة\n- وسيط ساعات النوم: =MEDIAN(C2:C11) → 6.0 ساعة (البيانات متناظرة تقريباً)\n- منوال رضا البينغ: =MODE(D2:D11) → 4 (تكرر ثلاث مرات)\n- انحراف ساعات النوم المعياري: =STDEV(C2:C11)\n- عدد من اختاروا الرضا = 4: =COUNTIF(D2:D11,4) → 3 أشخاص\n- متوسط نوم من يلعب أكثر من 4 ساعات: =SUMIF(B2:B11,\">4\",C2:C11) ÷ عددِهم\n\nلاحظ نمط النطاقات: B2:B11 يعني «من الصف 2 إلى الصف 11 من العمود B» — صفوف العناوين محجوزة دائماً للصف 1.",
          en: "A short list of formulas covers your whole project — learn them once:\n\nWorked example on our mini data (table in the next section):\n\n- Mean sleep hours: =AVERAGE(C2:C11) → 60 ÷ 10 = 6.0 hours\n- Median sleep hours: =MEDIAN(C2:C11) → 6.0 (the data is nearly symmetric)\n- Mode of ping satisfaction: =MODE(D2:D11) → 4 (occurred three times)\n- Standard deviation of sleep: =STDEV(C2:C11)\n- Count of those choosing satisfaction = 4: =COUNTIF(D2:D11,4) → 3 people\n- Mean sleep of those playing more than 4 hours: =SUMIF(B2:B11,\">4\",C2:C11) ÷ their count\n\nNotice the range pattern: B2:B11 means «from row 2 to row 11 of column B» — header rows always reserve row 1.",
        },
        table: {
          caption: { ar: "الدوال ووظائفها", en: "Formulas and their purposes" },
          headers: [
            { ar: "الدالة", en: "Formula" },
            { ar: "وظيفتها", en: "Purpose" },
            { ar: "مثال", en: "Example" },
          ],
          rows: [
            [
              { ar: "=AVERAGE", en: "=AVERAGE" },
              { ar: "المتوسط الحسابي لعمود عددي", en: "Arithmetic mean of a numeric column" },
              { ar: "=AVERAGE(C2:C11)", en: "=AVERAGE(C2:C11)" },
            ],
            [
              { ar: "=MEDIAN", en: "=MEDIAN" },
              { ar: "القيمة الوسطى (مقاومة للشواذ)", en: "The middle value (outlier-resistant)" },
              { ar: "=MEDIAN(C2:C11)", en: "=MEDIAN(C2:C11)" },
            ],
            [
              { ar: "=MODE", en: "=MODE" },
              { ar: "القيمة الأكثر تكراراً", en: "The most frequent value" },
              { ar: "=MODE(D2:D11)", en: "=MODE(D2:D11)" },
            ],
            [
              { ar: "=STDEV", en: "=STDEV" },
              { ar: "الانحراف المعياري (تشتت العينة)", en: "Standard deviation (sample spread)" },
              { ar: "=STDEV(C2:C11)", en: "=STDEV(C2:C11)" },
            ],
            [
              { ar: "=COUNTIF", en: "=COUNTIF" },
              { ar: "عدد الخلايا التي تحقق شرطاً", en: "Count of cells meeting a condition" },
              { ar: "=COUNTIF(D2:D11,4)", en: "=COUNTIF(D2:D11,4)" },
            ],
            [
              { ar: "=SUMIF", en: "=SUMIF" },
              { ar: "مجموع قيم عمود بشرط من عمود آخر", en: "Sum of one column's values conditioned on another" },
              { ar: "=SUMIF(B2:B11,\">4\",C2:C11)", en: "=SUMIF(B2:B11,\">4\",C2:C11)" },
            ],
            [
              { ar: "=CORREL", en: "=CORREL" },
              { ar: "معامل الارتباط بين عمودين (من −1 إلى +1)", en: "Correlation coefficient of two columns (−1 to +1)" },
              { ar: "=CORREL(B2:B11,C2:C11)", en: "=CORREL(B2:B11,C2:C11)" },
            ],
          ],
        },
        code: {
          lang: "text",
          snippet:
            "=AVERAGE(C2:C11)\n=MEDIAN(C2:C11)\n=MODE(D2:D11)\n=STDEV(C2:C11)\n=COUNTIF(D2:D11,4)\n=SUMIF(B2:B11,\">4\",C2:C11)\n=CORREL(B2:C11,C2:C11)",
        },
      },
      {
        heading: { ar: "بيانات المشروع المصغر: عشرة لاعبين", en: "The Mini-Project Data: Ten Gamers" },
        body: {
          ar: "لنتدرّب على مجموعة بيانات كاملة — عشرة مستجيبين بثلاثة متغيرات: ساعات اللعب اليومية (B)، ساعات النوم (C)، ورضا البينغ على ليكرت 1-5 (D):\n\n- متوسط ساعات اللعب: 41 ÷ 10 = 4.1 ساعة، ووسيطها 4.0\n- متوسط ساعات النوم: 60 ÷ 10 = 6.0 ساعة، ووسيطها 6.0\n- رضا البينغ: المنوال 4 (ثلاثة اختيارات)، وأدناه نقطة 1 (مستجيبان)\n- نصف من يلعبون 4 ساعات أو أقل ينامون 7 ساعات أو أكثر، ونصف من يلعبون 6 أو أكثر ينامون 5 أو أقل — الاتجاه السلبي يلمع بالعين المجردة\n\nبهذه الجمل الأربع يكون «قسم النتائج» في تقريرك جاهز الهيكل — الأرقام أمامك والمقارنة لغتك.",
          en: "Let's practice on a complete dataset — ten respondents with three variables: daily gaming hours (B), sleep hours (C), and ping satisfaction on the 1-5 Likert scale (D):\n\n- Mean gaming hours: 41 ÷ 10 = 4.1, median 4.0\n- Mean sleep hours: 60 ÷ 10 = 6.0, median 6.0\n- Ping satisfaction: mode 4 (three picks), lowest point 1 (two respondents)\n- Half of those playing 4 hours or less sleep 7 or more, and half of those playing 6 or more sleep 5 or less — the negative trend glows to the naked eye\n\nWith these four sentences, your report's «results section» skeleton is ready — numbers in front of you and comparison as your language.",
        },
        table: {
          caption: { ar: "بيانات العينة المصغرة: صف لكل مستجيب", en: "The mini sample: one row per respondent" },
          headers: [
            { ar: "المستجيب", en: "Respondent" },
            { ar: "ساعات اللعب (B)", en: "Gaming hours (B)" },
            { ar: "ساعات النوم (C)", en: "Sleep hours (C)" },
            { ar: "رضا البينغ 1-5 (D)", en: "Ping satisfaction 1-5 (D)" },
          ],
          rows: [
            [
              { ar: "r01", en: "r01" },
              { ar: "1", en: "1" },
              { ar: "8", en: "8" },
              { ar: "4", en: "4" },
            ],
            [
              { ar: "r02", en: "r02" },
              { ar: "2", en: "2" },
              { ar: "8", en: "8" },
              { ar: "5", en: "5" },
            ],
            [
              { ar: "r03", en: "r03" },
              { ar: "2", en: "2" },
              { ar: "7", en: "7" },
              { ar: "4", en: "4" },
            ],
            [
              { ar: "r04", en: "r04" },
              { ar: "3", en: "3" },
              { ar: "7", en: "7" },
              { ar: "4", en: "4" },
            ],
            [
              { ar: "r05", en: "r05" },
              { ar: "4", en: "4" },
              { ar: "6", en: "6" },
              { ar: "3", en: "3" },
            ],
            [
              { ar: "r06", en: "r06" },
              { ar: "4", en: "4" },
              { ar: "6", en: "6" },
              { ar: "3", en: "3" },
            ],
            [
              { ar: "r07", en: "r07" },
              { ar: "5", en: "5" },
              { ar: "5", en: "5" },
              { ar: "2", en: "2" },
            ],
            [
              { ar: "r08", en: "r08" },
              { ar: "6", en: "6" },
              { ar: "5", en: "5" },
              { ar: "2", en: "2" },
            ],
            [
              { ar: "r09", en: "r09" },
              { ar: "6", en: "6" },
              { ar: "4", en: "4" },
              { ar: "1", en: "1" },
            ],
            [
              { ar: "r10", en: "r10" },
              { ar: "8", en: "8" },
              { ar: "4", en: "4" },
              { ar: "1", en: "1" },
            ],
          ],
        },
      },
      {
        heading: { ar: "الجداول المحورية: حصان العمل", en: "Pivot Tables: the Workhorse" },
        body: {
          ar: "الجدول المحوري (Pivot Table) هو إعادة تجميع فورية لبياناتك دون أي صيغ — أهم مهارة جدول بيانات ستكتسبها:\n\n- «عدد اللاعبين في كل نقطة رضا»: ضع عمود الرضا في الصفوف واختر «العدّ» — تحصل فوراً على: 1←مستجيبان، 2←مستجيبان، 3←مستجيبان، 4←ثلاثة، 5←واحد\n- نفس الجدول بالنسب المئوية: 20% و20% و20% و30% و10% — التوزيع كاملاً في لمحة\n- «متوسط النوم لكل فئة لعب»: ضع ساعات اللعب في الصفوف، وساعات النوم في القيم باختيار «المتوسط» بدل «العدّ» — الاتجاه التنازلي سيظهر أمامك\n\nخطوات الإنشاء في أي جدول بيانات: حدد البيانات ← إدراج ← جدول محوري ← اسحب الأعمدة إلى الصفوف/الأعمدة/القيم. سحب وإفلات ثلاث مرات يعادل كتابة عشر صيغ.",
          en: "The pivot table is an instant re-grouping of your data with zero formulas — the single most valuable spreadsheet skill you will acquire:\n\n- «Player count per satisfaction point»: put the satisfaction column in rows and choose «Count» — you instantly get: 1←two, 2←two, 3←two, 4←three, 5←one\n- The same table in percentages: 20%, 20%, 20%, 30%, 10% — the full distribution at a glance\n- «Mean sleep per gaming bracket»: put gaming hours in rows and sleep hours in values choosing «Average» instead of «Count» — the descending trend will show itself\n\nCreation steps in any spreadsheet: select the data → Insert → Pivot table → drag columns into rows/columns/values. Three drags equal ten formulas.",
        },
      },
      {
        heading: { ar: "الرسوم ومعامل الارتباط وتحذير السببية", en: "Charts, the Correlation Coefficient & the Causation Warning" },
        body: {
          ar: "قواعد الرسوم من l145 تنطبق هنا حرفياً: أعمدة للفئويات (توزيع نقاط الرضا)، مدرج لساعات النوم في فئات (4-5، 5-6، 6-7…)، وتشتت لساعات اللعب مقابل ساعات النوم مع خط اتجاه (Trendline) يلخص الميل.\n\nمعامل الارتباط r يقيس قوة العلاقة الخطية واتجاهها:\n\n- r = +1: ارتباط موجب تام (كل زيادة في X تقابلها زيادة متناسبة في Y)\n- r = −1: ارتباط سالب تام\n- r = 0: لا علاقة خطية\n- في بياناتنا: r ≈ −0.9 — علاقة سالبة قوية: كلما زادت ساعات اللعب قلّت ساعات النوم\n\nوالآن التحذير الذي يفصل الباحث الناضج عن الهاوي — الارتباط لا يثبت السببية:\n\n- مثال شهير: وجدت دراسة ارتباطاً بين اللعب المفرط والدرجات المتدنية. هل اللعب «يسبب» التدني؟ ربما — لكن ربما المتغير الثالث هو الحكم: ضعف إدارة الوقت يرفع اللعب ويخفض الدرجات معاً!\n\n- في بياناتنا: العلاقة سالبة قوية، لكن الصياغة العلمية الملتزمة هي «ترتبط ساعات اللعب عكسياً بساعات النوم في هذه العينة» — لا «تسبب اللعب قلة النوم»\n\nالإبلاغ الصادق ثلاثي الأركان: حجم العينة (n)، المقاييس مع تشتتها، والرسوم الصحيحة — وعند الاختلاط بشيء من كل ذلك: حدود الدراسة بلا مواربة.",
          en: "The chart rules from l145 apply here verbatim: bars for categoricals (satisfaction point distribution), a histogram for sleep hours in bins (4-5, 5-6, 6-7…), and a scatter of gaming vs sleep with a trendline summarizing the slope.\n\nThe correlation coefficient r measures the strength and direction of a linear relationship:\n\n- r = +1: perfect positive correlation\n- r = −1: perfect negative correlation\n- r = 0: no linear relationship\n- In our data: r ≈ −0.9 — a strong negative relationship: more gaming hours, fewer sleep hours\n\nAnd now the warning separating the mature researcher from the amateur — correlation does not prove causation:\n\n- A famous example: a study found a correlation between heavy gaming and low grades. Does gaming «cause» the drop? Maybe — but maybe a third variable rules: weak time management raises gaming and lowers grades together!\n\n- In our data: the relationship is strongly negative, but the scientifically honest phrasing is «gaming hours are inversely related to sleep hours in this sample» — not «gaming causes less sleep»\n\nHonest reporting stands on three legs: the sample size (n), measures with their spread, and the correct charts — and when in doubt: state the study limits without hedging.",
        },
        tip: {
          ar: "أضف خط الاتجاه للتشتت بنقرة يمين على النقاط (اتجاه خطي) — واطلب عرض المعادلة على الرسم فيصير تقريرك أشبه بأبحاث المحترفين.",
          en: "Right-click the scatter points to add a linear trendline — and display its equation on the chart to make your report look like the pros'.",
        },
      },
    ],
    keyPoints: [
      { ar: "البيانات النظيفة: صف لكل مستجيب وعمود لكل متغير، بقيم مرمّزة رقمياً", en: "Tidy data: one row per respondent, one column per variable, numerically coded values" },
      { ar: "الدوال السبع تكفي المشروع: AVERAGE وMEDIAN وMODE وSTDEV وCOUNTIF وSUMIF وCORREL", en: "Seven formulas cover the project: AVERAGE, MEDIAN, MODE, STDEV, COUNTIF, SUMIF and CORREL" },
      { ar: "الجدول المحوري يحول الأعمدة إلى توزيعات ومتوسطات مقارنة بثلاث عمليات سحب", en: "The pivot table turns columns into distributions and comparative means in three drags" },
      { ar: "r يقيس قوة العلاقة واتجاهها: في بيانات العينة ≈ −0.9 علاقة سالبة قوية", en: "r measures relationship strength and direction: ≈ −0.9, a strong negative, in the sample data" },
      { ar: "الارتباط لا يثبت السببية: المتغير الثالث (إدارة الوقت) قد يحرك كليهما معاً", en: "Correlation does not prove causation: a third variable (time management) may drive both" },
      { ar: "أبلغ بأمانة: حجم العينة n والمقاييس مع تشتتها والرسوم الصحيحة وحدود الدراسة", en: "Report honestly: sample size n, measures with spread, correct charts, and the study limits" },
    ],
    commands: [
      { cmd: "=MEDIAN(C2:C11)", desc: { ar: "وسيط ساعات النوم لعشرة مستجيبين في ورقة التحليل", en: "Median sleep hours of the ten respondents in the analysis sheet" } },
      { cmd: "=COUNTIF(D2:D11,4)", desc: { ar: "عدّ من اختاروا نقطة الرضا 4 في عمود ليكرت", en: "Count those who chose satisfaction point 4 in the Likert column" } },
      { cmd: "=CORREL(B2:B11,C2:C11)", desc: { ar: "معامل الارتباط بين ساعات اللعب وساعات النوم", en: "Correlation coefficient between gaming and sleep hours" } },
    ],
    quiz: [
      {
        q: {
          ar: "أي دالة تُستخدم لعدّ المستجيبين الذين اختاروا «أوافق» (النقطة 4) في سؤال ليكرت؟",
          en: "Which function counts the respondents who chose «agree» (point 4) on a Likert item?",
        },
        options: [
          { ar: "=AVERAGE", en: "=AVERAGE" },
          { ar: "=COUNTIF", en: "=COUNTIF" },
          { ar: "=MEDIAN", en: "=MEDIAN" },
          { ar: "=CORREL", en: "=CORREL" },
        ],
        correct: 1,
        explain: {
          ar: "=COUNTIF(D2:D11,4) تعدّ الخلايا المساوية للشرط — وتمتد بسهولة إلى شروط مركبة (أكبر من قيمة، ضمن مدى).",
          en: "=COUNTIF(D2:D11,4) counts cells equal to the condition — and extends easily to compound conditions (greater than, within a range).",
        },
      },
      {
        q: {
          ar: "حصلت على r = −0.9 بين ساعات اللعب وساعات النوم. ما التفسير الصحيح؟",
          en: "You obtained r = −0.9 between gaming hours and sleep hours. What is the correct interpretation?",
        },
        options: [
          { ar: "اللعب يسبب قلة النوم بدرجة عالية من اليقين", en: "Gaming causes less sleep with high certainty" },
          { ar: "علاقة خطية سالبة قوية في هذه البيانات، دون إثبات للسببية", en: "A strong negative linear relationship in this data, without proof of causation" },
          { ar: "لا علاقة بين المتغيرين", en: "No relationship between the variables" },
          { ar: "علاقة موجبة قوية", en: "A strong positive relationship" },
        ],
        correct: 1,
        explain: {
          ar: "قرب r من −1 يعني علاقة سالبة قوية. لكن r وصفٌ للعلاقة لا حكمٌ بالسببية — المتغير الثالث ممكن، والصياغة الملتزمة: «ترتبط عكسياً في هذه العينة».",
          en: "r near −1 signals a strong negative relationship. But r describes association, not causation — a third variable is possible, and the honest phrasing is «inversely related in this sample».",
        },
      },
      {
        q: {
          ar: "تريد مقارنة «متوسط ساعات النوم» بين فئات ساعات اللعب (1-2، 3-4، 5-6، +7). الأداة الأسرع؟",
          en: "You want to compare «mean sleep hours» across gaming-hour brackets (1-2, 3-4, 5-6, 7+). The fastest tool?",
        },
        options: [
          { ar: "كتابة صيغ SUMIF يدوية لكل فئة", en: "Hand-written SUMIF formulas per bracket" },
          { ar: "الجدول المحوري: ساعات اللعب في الصفوف ومتوسط النوم في القيم", en: "A pivot table: gaming hours in rows, mean sleep in values" },
          { ar: "مخطط دائري للعينة", en: "A pie chart of the sample" },
          { ar: "دالة MODE على عمود كامل", en: "A MODE function over the whole column" },
        ],
        correct: 1,
        explain: {
          ar: "الجدول المحوري صُمم لهذه المهمة بالضبط: سحب عمودين وإفلاتهما ينتج جدول المقارنة كاملاً — ومع إمكانية التبديل إلى النسب أو العدّ بنقرة.",
          en: "The pivot table was designed for exactly this task: two column drags produce the full comparison table — switchable to percentages or counts in one click.",
        },
      },
      {
        q: {
          ar: "ما الاستنتاج الآمن من ملاحظة: «اللاعبون الأقل درجات يلعبون ساعات أكثر»؟",
          en: "What is the safe conclusion from the observation: «students with lower grades play more hours»?",
        },
        options: [
          { ar: "اللعب يخفض الدرجات دائماً", en: "Gaming always lowers grades" },
          { ar: "الدرجات المتدنية تدفع للعب دائماً", en: "Low grades always drive gaming" },
          { ar: "يوجد ارتباط سالب؛ السببية تحتاج تصميماً أقوى أو ضبط متغيرات أخرى", en: "There is a negative correlation; causation needs a stronger design or control of other variables" },
          { ar: "الملاحظة خطأ إحصائي حتماً", en: "The observation is definitely a statistical error" },
        ],
        correct: 2,
        explain: {
          ar: "الارتباط واقعي لكنه لا يخبرك بالسهم السببي. إدارة الوقت، ضغط الامتحانات، أو شخصية الباحث عن الإثارة — كلها متغيرات ثالثة محتملة تفسر الارتباط دون أن يكون أحد الطرفين سبباً للآخر.",
          en: "The correlation is real but tells you nothing about the causal arrow. Time management, exam pressure, or a thrill-seeking personality — all plausible third variables explaining the correlation without either side causing the other.",
        },
      },
    ],
  },
  {
    id: "l150",
    moduleId: "m15",
    order: 10,
    level: "intermediate",
    title: {
      ar: "أخلاقيات البحث والكتابة العلمية",
      en: "Research Ethics & Scientific Writing",
    },
    summary: {
      ar: "أنواع السرقة العلمية وكيف تُكتشف، والتوثيق بأسلوب APA بمثال حقيقي، وسلامة البيانات والخصوصية وأخلاقيات الذكاء الاصطناعي — ثم هيكل التقرير التقني كاملاً.",
      en: "Plagiarism types and how they get caught, citing in APA with a real example, data integrity, privacy and AI-tool ethics — then the full technical report structure.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "السرقة العلمية بأنواعها", en: "Plagiarism and Its Types" },
        body: {
          ar: "السرقة العلمية (Plagiarism) تقديم عمل الغير أو فكرته كأنه لك — والجامعة تعرفها بأنواع ثلاثة، كلها عقوبتها واحدة مؤلمة:\n\n- النسخ المباشر: لصق نص من موقع أو بحث دون تغيير ودون توثيق — الأسهل كشفاً والأسوأ سمعة\n- إعادة الصياغة دون توثيق: تغيير كلمات المصدر بالمرادفات وتقديم الفكرة كأنها لك — الخدعة الشائعة «كتبتُها بكلماتي!»؛ الفكرة ملك لصاحبها، والصياغة الجديدة لا تلغي الدَّين\n- السرقة الذاتية: إعادة تسليم عمل قدّمته في مقرر سابق (أو جزء منه) دون إفصاح وموافقة — عملك القديم «مُستهلك أكاديمياً» بالفعل\n\nكيف تُكتشف؟ أدوات كشف التشابه (مثل مدقق الجامعة) تقارن نصك بمليارات الصفحات المنشورة والأبحاث المسجلة وقاعدة أعمال طلبة الجامعة نفسها — وتسلّم المصحح تقرير نسبة تشابه ملوّناً. المفارقة: أدوات الذكاء الاصطناعي جعلت اكتشاف النسخ أسهل وأسرع من أي وقت مضى.\n\nالخبر الجيد: التوثيق الصحيح يحصّنك تماماً — انظر القسم التالي.",
          en: "Plagiarism is presenting someone else's work or idea as yours — and the university defines it in three types, all carrying the same painful penalty:\n\n- Copy-paste: pasting text from a website or paper unchanged and uncited — the easiest to catch and the worst for your reputation\n- Paraphrase without citation: swapping the source's words for synonyms and presenting the idea as yours — the common self-deception «I wrote it in my own words!»; the idea belongs to its author, and new wording does not cancel the debt\n- Self-plagiarism: resubmitting work (or part of it) you already submitted in a previous course without disclosure and consent — your old work is «academically consumed» already\n\nHow does it get caught? Similarity-detection tools (like your university's checker) compare your text against billions of published pages, recorded papers, and the university's own student-work database — handing the grader a colored similarity report. The irony: AI tools made catching copying easier and faster than ever.\n\nThe good news: correct citation immunizes you completely — see the next section.",
        },
      },
      {
        heading: { ar: "التوثيق بأسلوب APA: مثال حقيقي", en: "Citing in APA Style: a Real Example" },
        body: {
          ar: "أسلوب APA هو المعيار الأشهر في التقارير التقنية والاجتماعية، وقاعدته بسيطة: كل فكرة ليست لك تحتاج إشارة مصدر في موضعين — داخل النص وفي قائمة المراجع.\n\nالتوثيق داخل النص (in-text):\n\n- صيغة السرد: ليكيرت (1932) قدّم مقياس الدرجات المجمعة الذي ما زال الأشهر حتى اليوم.\n- صيغة القوسين: قدم مقياس الدرجات المجمعة كأسلوب قياس الاتجاهات (Likert, 1932).\n- الاقتباس الحرفي يحتاج علامتي اقتباس ورقم الصفحة: (Likert, 1932, p. 44)\n\nوفي قائمة المراجع في نهاية التقرير، المدخل الكامل:\n\nحيلة التنفيذ: أثناء القراءة سجّل كل مصدر فور جمعه في ملف مراجع — الباحث الذي «يؤجل التوثيق للنهاية» هو الذي ينتهي منتحلاً دون أن يقصد.",
          en: "APA is the most common style in technical and social reports, and its rule is simple: every idea that is not yours needs a source pointer in two places — in the text and in the reference list.\n\nIn-text citation:\n\n- Narrative form: Likert (1932) introduced the summated-rating scale that remains the most used today.\n- Parenthetical form: the summated-rating scale was introduced as an attitude-measurement technique (Likert, 1932).\n- Verbatim quotes add quotation marks and a page number: (Likert, 1932, p. 44)\n\nAnd in the reference list at the report's end, the full entry:",
        },
        code: {
          lang: "text",
          snippet:
            "Likert, R. (1932). A technique for the measurement of attitudes.\nArchives of Psychology, 140, 1-55.",
        },
        tip: {
          ar: "القاعدة البسيطة للتوثيق داخل النص: إذا حذفت المصدر، فهل يجد القارئ نفسه يتساءل «من قال هذا؟» — إن كان الجواب نعم فوثّق.",
          en: "The simple in-text rule: if you removed the citation, would the reader wonder «who says that?» — if yes, cite.",
        },
      },
      {
        heading: { ar: "سلامة البيانات والخصوصية", en: "Data Integrity & Privacy" },
        body: {
          ar: "أخلاقيات البيانات تبدأ قبل أول رقم يجري في تحليلك:\n\n- التلفيق (Fabrication): اختراع بيانات لم تجمعها قط — «استبيان من 60 مستجيبا» منهم 40 وهميون. أسوأ مخالفة بحثية على الإطلاق: ليس خطأ، بل تزوير\n- التحريف (Falsification): بيانات حقيقية عُبث بها — حذف من يخالفون فرضيتك، أو «تجميل» الرقم 3.9 ليصبح 4.2 لأنه أجمل في الرسم. جريمة بنفس الدرجة، وأشد خفاءً\n- القاعدة الذهبية: النتائج غير المريحة نتائج أيضاً — والباحث الذي «لم يجد علاقة» قدم مساهمة صادقة تماماً كمن وجدها\n\nالخصوصية والموافقة المستنيرة في استبيانك:\n\n- إفصاح في صفحة البداية: من أنت، ماذا تجمع، لماذا، وكيف تحمي البيانات\n- المشاركة طوعية والانسحاب متاح في أي لحظة دون عقاب\n- التجميع المجهول: لا أسماء ولا أرقام هواتف في بيانات التحليل — الشخص رقم r07 وحد\n- تقليل البيانات (مبدأ على طراز GDPR): لا تجمع إلا ما يحتاجه سؤال بحثك فعلاً — سؤال «رقم هاتفك؟» في استبيان عن النوم علامة استفهام حمراء\n\n- التخزين بجهازك المحمي، والحذف بعد انتهاء المشروع وفق سياسة الجامعة",
          en: "Data ethics starts before the first number enters your analysis:\n\n- Fabrication: inventing data you never collected — a «survey of 60 respondents» where 40 are fictional. The worst research offense of all: not a mistake, but forgery\n- Falsification: real data that was tampered with — dropping respondents who contradict your hypothesis, or «beautifying» 3.9 into 4.2 for a nicer chart. Same class of crime, harder to spot\n- The golden rule: uncomfortable results are results too — the researcher who «found no relationship» contributes honestly, exactly like one who found it\n\nPrivacy and informed consent in your survey:\n\n- Disclosure on the opening page: who you are, what you collect, why, and how you protect it\n- Participation is voluntary, withdrawal available at any moment without penalty\n- Anonymous aggregation: no names or phone numbers in the analysis data — person r07 and nothing more\n- Data minimization (a GDPR-style principle): collect only what your research question truly needs — a «phone number?» item in a sleep survey is a red flag\n- Storage on your protected device, deletion after the project per university policy",
        },
      },
      {
        heading: { ar: "أخلاقيات أدوات الذكاء الاصطناعي", en: "The Ethics of AI Tools" },
        body: {
          ar: "أدوات الذكاء الاصطناعي في متناولك — والسؤال الحقيقي ليس «هل أستخدمها؟» بل «متى يكون الاستخدام شريفاً؟»\n\nاستخدام مشروع (عزز قدرتك):\n\n- عصف ذهني وزوايا نظر لصياغة سؤال البحث\n- تحسين قواعد اللغة في مسودة كتبتها أنت\n- شرح مفهوم إحصائي غامض بعد قراءتك الأولى\n- مع شرط واحد صريح: اتبع سياسة مقررك، وأفصح عند الطلب\n\nاستخدام غير مشروع (يُلغي تعلمك):\n\n- تسليم نص كامل كتبته الأداة ولم تقرؤه أنت أصلاً\n- توليد «بيانات» لاستبيانك — تلفيق بعطر تقني، والعقوبة كالتلفيق تماماً\n- الاستشهاد بمصادر اقترحتها الأداة دون التحقق من وجودها — الأدوات «تهلوس» مراجع غير موجودة فعلاً، ومصدر وهمي في قائمتك فضيحة مضاعفة\n\nالاختبار الحاسم بثلاث أسئلة: هل قرأت وفهمت كل سطر أسلّمه؟ هل أستطيع الدفاع عن كل فكرة في مناقشة شفهية؟ هل أفصحت عما استخدمته وفق السياسة؟ ثلاث مرات نعم = أنت في الجانب الآمن.",
          en: "AI tools are at your fingertips — and the real question is not «do I use them?» but «when is the use honest?»\n\nLegitimate use (amplifying your ability):\n\n- Brainstorming angles for framing the research question\n- Polishing grammar in a draft you wrote yourself\n- Explaining a confusing statistical concept after your first reading\n- Under one explicit condition: follow your course policy, and disclose when asked\n\nIllegitimate use (cancelling your learning):\n\n- Submitting full text the tool wrote, which you never even read\n- Generating «data» for your survey — fabrication with a tech perfume, penalized exactly like fabrication\n- Citing sources the tool suggested without verifying they exist — tools «hallucinate» non-existent references, and a phantom source in your list is a doubled scandal\n\nThe decisive test, three questions: have I read and understood every line I submit? Can I defend every idea in an oral discussion? Have I disclosed my usage per policy? Three yeses = you are on the safe side.",
        },
      },
      {
        heading: { ar: "هيكل التقرير التقني والعرض أمام الصف", en: "Technical Report Structure & Class Presentation" },
        body: {
          ar: "التقرير العلمي ليس مقالاً حراً؛ إنه هيكل معياري تعرفه كل التخصصات وتتوقعه لجنة التقييم — وكل قسم له وظيفة واحدة واضحة:\n\n- الملخص (Abstract): المشروع كله في 100-150 كلمة: السؤال، العينة، أهم نتيجة، أهم استنتاج — يُكتب أخيراً ويُقرأ أولاً\n- المقدمة: السياق وسؤال البحث ولماذا يستحق الدراسة\n- المنهجية: كيف جمعت البيانات بالضبط (العينة والأداة والإجراء) — بدقتها يُحكم على صدق كل ما بعدها\n- النتائج: الأرقام والرسوم بلا تفسير شخصي — «ماذا وجدت؟» فقط\n- المناقشة: هنا مملكتك التفسيرية: ماذا تعني النتائج؟ ما حدودها؟ ماذا يفسر الارتباط إن لم يكن سببية؟\n- الخاتمة: خلاصة موجزة وتوصية عملية واحدة على الأقل\n- المراجع: كل مصدر استندت إليه، بتنسيق APA موحد\n\nوعرضك أمام الصف (5-10 دقائق عادة):\n\n- شريحة لكل قسم كبير، ونتيجة واحدة لكل شريحة — لا تنقل فقرات التقرير\n- افتتح بسؤال البحث وأقفل بأهم رقم وجدته\n- تدرب مرة كاملة بصوت عالٍ مع مؤقت: العرض المتدرب يبدو سهلاً، وغير المتدرب يبدو أطول مما هو\n\nبهذا الدرس تكتمل الوحدة: من منطق البت إلى أخلاقيات التقرير — ومشروعك المصغر أصبح بين يديك خريطةً كاملة.",
          en: "A scientific report is not a free essay; it is a standardized structure every discipline knows and every committee expects — each section with one clear job:\n\n- Abstract: the whole project in 100-150 words: question, sample, headline finding, headline conclusion — written last, read first\n- Introduction: context, the research question, and why it deserves study\n- Method: exactly how you collected data (sample, instrument, procedure) — its precision judges the credibility of everything after it\n- Results: numbers and charts with no personal interpretation — purely «what did you find?»\n- Discussion: your interpretive kingdom: what do the results mean? their limits? what explains a correlation that is not causation?\n- Conclusion: a tight wrap-up plus at least one practical recommendation\n- References: every source you leaned on, in uniform APA format\n\nAnd your class presentation (usually 5-10 minutes):\n\n- One slide per major section, one finding per slide — never paste report paragraphs\n- Open with the research question, close with the strongest number you found\n- Rehearse once fully, out loud, with a timer: a rehearsed talk looks easy, an unrehearsed one always runs long\n\nWith this lesson the module closes: from bit logic to report ethics — and your mini-project now sits complete in your hands as a full map.",
        },
        table: {
          caption: { ar: "أقسام التقرير ووظيفة كل قسم", en: "Report sections and each one's job" },
          headers: [
            { ar: "القسم", en: "Section" },
            { ar: "وظيفته", en: "Its job" },
            { ar: "خطأ شائع فيه", en: "A common mistake" },
          ],
          rows: [
            [
              { ar: "الملخص Abstract", en: "Abstract" },
              { ar: "المشروع كاملاً في 100-150 كلمة", en: "The whole project in 100-150 words" },
              { ar: "كتابته أولاً فيصبح وعداً لا ملخصاً", en: "Writing it first, turning it into a promise, not a summary" },
            ],
            [
              { ar: "المقدمة Introduction", en: "Introduction" },
              { ar: "السياق وسؤال البحث وأهميته", en: "Context, the research question, its importance" },
              { ar: "حشو عام لا ينتهي إلى سؤال محدد", en: "Generic padding that never lands on a specific question" },
            ],
            [
              { ar: "المنهجية Method", en: "Method" },
              { ar: "العينة والأداة والإجراء بدقة قابلة للتكرار", en: "Sample, instrument and procedure, replicably precise" },
              { ar: "إغفال حجم العينة وطرق الاختيار", en: "Omitting sample size and selection method" },
            ],
            [
              { ar: "النتائج Results", en: "Results" },
              { ar: "الأرقام والرسوم كما هي بلا تفسير", en: "Numbers and charts as-is, uninterpreted" },
              { ar: "خلط التفسير بالأرقام", en: "Mixing interpretation into the numbers" },
            ],
            [
              { ar: "المناقشة Discussion", en: "Discussion" },
              { ar: "تفسير النتائج وحدودها وارتباطها بالسؤال", en: "Interpreting results, their limits, tying back to the question" },
              { ar: "تكرار النتائج بدل تفسيرها", en: "Repeating results instead of interpreting them" },
            ],
            [
              { ar: "المراجع References", en: "References" },
              { ar: "كل مصدر بتنسيق APA موحد", en: "Every source in uniform APA format" },
              { ar: "مراجع في القائمة لم تُذكر في المتن", en: "Listed references never cited in the text" },
            ],
          ],
        },
      },
    ],
    keyPoints: [
      { ar: "السرقة العلمية ثلاثة أنواع: نسخ مباشر، إعادة صياغة دون توثيق، وسرقة ذاتية — وأدوات التشابه تكشفها", en: "Plagiarism comes in three types: copy-paste, uncited paraphrase and self-plagiarism — similarity tools catch them" },
      { ar: "APA توثق في موضعين: داخل النص (Likert, 1932) وفي قائمة المراجع بالمدخل الكامل", en: "APA cites in two places: in-text (Likert, 1932) and in the reference list with the full entry" },
      { ar: "تلفيق البيانات وتحريفها أسوأ مخالفتين — والنتيجة غير المريحة نتائج مشروعة أيضاً", en: "Fabrication and falsification are the gravest offenses — and an uncomfortable result is a legitimate result too" },
      { ar: "الخصوصية: موافقة مستنيرة، تجميع مجهول، تقليل البيانات إلى ما يخدم السؤال فقط", en: "Privacy: informed consent, anonymous aggregation, and minimizing data to what serves the question" },
      { ar: "الذكاء الاصطناعي مشروع للتحسين والتوثيق مع الإفصاح — وغير مشروع للتسليم والتوليد والاستشهاد بالهلوسات", en: "AI is legitimate for polish and explanation with disclosure — illegitimate for submission, data generation or citing hallucinations" },
      { ar: "التقرير هيكل وظيفي: ملخص ← مقدمة ← منهجية ← نتائج ← مناقشة ← خاتمة ← مراجع", en: "The report is a functional structure: abstract → intro → method → results → discussion → conclusion → references" },
    ],
    quiz: [
      {
        q: {
          ar: "طالب غيّر رقم نتيجة في جدول بياناته ليصبح متسقاً مع فرضيته. كيف يُصنف هذا؟",
          en: "A student altered a result figure in the data table to fit the hypothesis. How is this classified?",
        },
        options: [
          { ar: "خطأ حسابي مقبول", en: "An acceptable calculation error" },
          { ar: "تحريف للبيانات (Falsification)", en: "Data falsification" },
          { ar: "تلفيق للبيانات (Fabrication)", en: "Data fabrication" },
          { ar: "سرقة علمية بسيطة", en: "Simple plagiarism" },
        ],
        correct: 1,
        explain: {
          ar: "البيانات حقيقية لكن العبث بها (تعديلها أو حذف المخالف) تحريف. التلفيق هو اختراع بيانات غير موجودة أصلاً — وكلاهما في قمة المخالفات البحثية.",
          en: "The data is real but tampering with it (editing or deleting the contradicting) is falsification. Fabrication means inventing data that never existed — both sit at the top of research offenses.",
        },
      },
      {
        q: {
          ar: "كيف يُوثّق اقتباس الفكرة (لا النص الحرفي) من ورقة ليكيرت 1932 داخل متن التقرير بأسلوب APA؟",
          en: "How is a paraphrased idea (not verbatim text) from Likert's 1932 paper cited in-text in APA?",
        },
        options: [
          { ar: "(Likert, 1932)", en: "(Likert, 1932)" },
          { ar: "ذكر الاسم فقط دون سنة", en: "Name only, without year" },
          { ar: "لا حاجة للتوثيق إن غيّرتُ الصياغة بكلماتي", en: "No citation needed if I reworded it myself" },
          { ar: "(مصدر إنترنت، تاريخ غير معروف)", en: "(internet source, unknown date)" },
        ],
        correct: 0,
        explain: {
          ar: "إعادة الصياغة لا تلغي الدَّين: الفكرة ملك صاحبها. الصيغة القوسية القياسية (المؤلف، السنة) تكفي للتلخيص وإعادة الصياغة — والاقتباس الحرفي يضيف رقم الصفحة.",
          en: "Paraphrasing does not cancel the debt: the idea belongs to its author. The standard parenthetical (author, year) suffices for summaries and paraphrase — verbatim quotes add the page number.",
        },
      },
      {
        q: {
          ar: "طالب أعاد تسليم تقرير قدّمه في مقرر سابق دون إفصاح. ما التصنيف الصحيح؟",
          en: "A student resubmitted a report from a previous course without disclosure. What is the correct classification?",
        },
        options: [
          { ar: "استخدام كفء لموارده", en: "Efficient use of his resources" },
          { ar: "سرقة ذاتية (self-plagiarism)", en: "Self-plagiarism" },
          { ar: "تلفيق بيانات", en: "Data fabrication" },
          { ar: "ممارسة توثيق سليمة", en: "Sound citation practice" },
        ],
        correct: 1,
        explain: {
          ar: "العمل القديم «مُستهلك أكاديمياً»، وإعادة استخدامه دون إفصاح وموافقة سرقة ذاتية — العقوبة فيها تعادل سرقة عمل الغير.",
          en: "Old work is «academically consumed», and reusing it without disclosure and consent is self-plagiarism — penalized like stealing someone else's work.",
        },
      },
      {
        q: {
          ar: "في هيكل التقرير، القسم المخصص لتفسير النتائج وذكر حدود الدراسة هو:",
          en: "In the report structure, the section dedicated to interpreting results and stating study limits is:",
        },
        options: [
          { ar: "المنهجية", en: "Method" },
          { ar: "النتائج", en: "Results" },
          { ar: "المناقشة", en: "Discussion" },
          { ar: "الملخص", en: "Abstract" },
        ],
        correct: 2,
        explain: {
          ar: "النتائج تعرض «ماذا وجدت؟»، والمناقشة تجيب «ماذا يعني ذلك وما حدود الصلاحية؟» — هنا تعترف بعينة الميسرة والارتباط لا السببية.",
          en: "Results present «what did you find?», and Discussion answers «what does it mean and how far does it hold?» — this is where you confess the convenience sample and correlation-not-causation.",
        },
      },
    ],
  },
];
