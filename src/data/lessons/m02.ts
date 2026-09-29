import type { Lesson } from "@/lib/types";

export const m02_LESSONS: Lesson[] = [
  {
    id: "l011",
    moduleId: "m02",
    order: 1,
    level: "beginner",
    title: { ar: "لماذا نحتاج نموذجاً طبقياً؟ قصة بناء الشبكات", en: "Why Do We Need a Layered Model?" },
    summary: {
      ar: "كيف حوّل المهندسون فوضى الشبكات المعقدة إلى سبع طبقات منظمة، ولماذا أصبح هذا التقسيم لغة المهندسين العالمية.",
      en: "How engineers turned network chaos into seven organized layers, and why this division became the global language of networking.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "مشكلة التعقيد الهائل", en: "The Enormous Complexity Problem" },
        body: {
          ar: "تخيّل ما يحدث فعلاً عندما تفتح موقعاً في متصفحك: تتحول نصوص HTML إلى أرقام، ثم إلى نبضات كهربائية في كابل نحاسي، وتسافر عبر مبدّل وموجّه وربما كابل بحري تحت المحيط، ثم تُبنى من جديد على الخادم البعيد. عشرات المهام المختلفة يجب أن تتزامن في أجزاء من الثانية.\n\nلو حاول أي فريق في العالم بناء كل ذلك ككتلة واحدة لفشل؛ لا أحد يستوعب الإشارات الكهربائية وتشفير البيانات وإدارة الازدحام وطلب الصفحة في آنٍ واحد.\n\nالحل الهندسي الذي انتصر عبر التاريخ هو: فَرِّق تَسُدْ (Divide and Conquer). قسّم المهمة العملاقة إلى مهام صغيرة مستقلة، وأتقن كل واحدة على حدة.\n\n- شبيه بناء عمارة: مقاول الأساسات لا يعرف شيئاً عن الدهانات، والكهربائي لا يفقه في السباكة\n- كل حرفي يتقن حرفته فقط، ويعمل وفق نقاط تسليم واضحة للذي بعده\n- النتيجة: عمارة كاملة تُبنى رغم أن لا أحد يجيد كل شيء وحده",
          en: "Imagine what actually happens when you open a website: HTML text becomes numbers, then electrical pulses in a copper cable, travels through a switch, a router, maybe a submarine cable under an ocean, and gets rebuilt on the remote server. Dozens of different tasks must synchronize within fractions of a second.\n\nIf any team tried to build all of that as one monolith, they would fail; no one can master electrical signaling, data encoding, congestion management, and page requests simultaneously.\n\nThe engineering solution that won throughout history is divide and conquer. Split the giant task into independent small tasks, and master each one separately.\n\n- Like constructing a building: the foundation contractor knows nothing about painting, and the electrician is not a plumber\n- Each craftsman masters only their trade and works to clear handoff points for the next one\n- The result: a complete building rises even though nobody can do everything alone",
        },
      },
      {
        heading: { ar: "فكرة الطبقات: عقود بين الجيران", en: "The Layering Idea: Contracts Between Neighbors" },
        body: {
          ar: "الطبقة (Layer) هي مجموعة من الوظائف المتقاربة تعمل كوحدة واحدة. الطبقات ترتّب نفسها عمودياً: كل طبقة تقدم خدمات للطبقة التي فوقها، وتستهلك خدمات الطبقة التي تحتها.\n\nالنقطة الحاسمة هي الواجهة (Interface) بين كل طبقتين: اتفاق واضح على ماذا تُسلّم الطبقة السفلى للعليا وكيف. ما دام العقد محفوظاً، يمكنك استبدال ما يحدث داخل أي طبقة بالكامل دون أن تلاحظ بقية الطبقات شيئاً!\n\n- يمكنك يوماً ما استبدال الكابل النحاسي بألياف ضوئية (تغيير جذري في الطبقة 1) ولن يتغير بروتوكول HTTP في الطبقة 7 حرفاً واحداً\n- هذه السحر الهندسي هو سر صمود الإنترنت عقوداً: تتبدل التقنيات تحت وتبقى التطبيقات فوق\n\nلهذا تُسمى نماذج الطبقات بالنماذج المرجعية (Reference Models): لا تصف منتجاً بعينه، بل تصف الإطار العام الذي يجب أن تتفق عليه كل المنتجات.",
          en: "A layer is a group of closely-related functions working as one unit. Layers stack vertically: each layer provides services to the layer above it and consumes services from the layer below.\n\nThe critical point is the interface between each two layers: a clear agreement on what the lower layer hands up and how. As long as the contract holds, you can replace everything inside any layer completely without the other layers noticing!\n\n- One day you can swap copper cable for fiber optics (a radical change in layer 1) and the HTTP protocol at layer 7 will not change a single character\n- This engineering magic is why the Internet has survived for decades: technologies change below while applications stay above\n\nThat is why layered models are called reference models: they do not describe one product, they describe the framework every product must agree upon.",
        },
      },
      {
        heading: { ar: "التعريف بنموذج OSI", en: "Meet the OSI Model" },
        diagram: {
          kind: "flow",
          title: { ar: "قصة ميلاد النماذج المرجعية", en: "The story of how reference models were born" },
          items: [
            { ar: "مشكلة: كل مصنع يبني بروتوكولاته المغلقة — لا تفاهم بين الأجهزة", en: "Problem: every vendor ran proprietary stacks — devices could not talk" },
            { ar: "1977: ISO تبدأ مشروع نموذج مرجعي موحد", en: "1977: ISO starts a unified reference-model project" },
            { ar: "1983: TCP/IP يصبح معيار الإنترنت العملي", en: "1983: TCP/IP becomes the Internet's de facto standard" },
            { ar: "1984: اعتماد OSI مرجعاً عالمياً للتعليم والتشخيص", en: "1984: OSI adopted worldwide for teaching and troubleshooting" },
          ],
        },
        body: {
          ar: "OSI اختصار لـ Open Systems Interconnection، وهو نموذج مرجعي من سبع طبقات أصدرته المنظمة الدولية للتوحيد القياسي (ISO) عام 1984 في المعيار ISO 7498. الهدف كان ثورياً وقتها: أي نظام يفتح بابه للتواصل مع أي نظام آخر مهما اختلف المصنّع.\n\nالطبقات السبع من الأعلى إلى الأسفل:\n\n- 7 التطبيقات (Application): حيث تسكن HTTP و DNS وغيرها\n- 6 العرض (Presentation): الصيغ والتشفير والضغط\n- 5 الجلسة (Session): بدء الحوار وإدارته وإنهاؤه\n- 4 النقل (Transport): التوصيل من طرف إلى طرف (TCP/UDP)\n- 3 الشبكة (Network): العنونة المنطقية والتوجيه (IP)\n- 2 الوصل (Data Link): الإطارات وعناوين MAC\n- 1 الفيزيائية (Physical): الإشارات والكابلات\n\nللحفظ بالإنجليزية من الأسفل للأعلى استخدم العبارة الشهيرة: Please Do Not Throw Sausage Pizza Away (كلمة لكل حرف: Physical, Data Link, Network, Transport, Session, Presentation, Application).",
          en: "OSI stands for Open Systems Interconnection, a seven-layer reference model released by the International Organization for Standardization (ISO) in 1984 as standard ISO 7498. The goal was revolutionary at the time: any system opens its doors to communicate with any other system regardless of vendor.\n\nThe seven layers from top to bottom:\n\n- 7 Application: where HTTP, DNS and friends live\n- 6 Presentation: formats, encryption, compression\n- 5 Session: starting, managing, and ending dialogs\n- 4 Transport: end-to-end delivery (TCP/UDP)\n- 3 Network: logical addressing and routing (IP)\n- 2 Data Link: frames and MAC addresses\n- 1 Physical: signals and cables\n\nTo memorize them in English bottom-up, use the famous phrase: Please Do Not Throw Sausage Pizza Away (one word per letter).",
        },
        tip: {
          ar: "احفظ الطبقات بالاتجاهين معاً. في المقابلات والاختبارات سُئل آلاف المهندسين: رتب الطبقات من الأعلى للأسفل وبالعكس — إنها خندق الأسئلة الأول.",
          en: "Memorize the layers in both directions. Thousands of engineers have been asked in interviews and exams: order the layers top-down and bottom-up — it is the classic first question.",
        },
      },
      {
        heading: { ar: "عائدات التقسيم الطبقي", en: "The Payoffs of Layering" },
        body: {
          ar: "لماذا نقضي درساً كاملاً في فكرة تبدو نظرية؟ لأن عوائدها عملية بحتة تلمسها يومياً في العمل:\n\n- التشغيل البيني (Interoperability): بطاقة شبكة من شركة كورية تعمل مع مبدّل صيني وموجّه أمريكي لأن الجميع يبنون على العقود نفسها\n- سهولة التعلم والتعليم: تدرس الشبكات طبقة فطبقة بدلاً من ابتلاع كل شيء دفعة واحدة\n- عزل الأعطال: تقول (المشكلة في الطبقة 2) فيفهم كل مهندس على الكوكب ما تعنيه فوراً\n- حرية الاستبدال: تتطور الوسائط والتقنيات دون إعادة كتابة التطبيقات\n- حواجز ابتكار منخفضة: مصنّع متخصص في الكابلات فقط يطور ويبيع دون فهم HTTP\n- لغة موحدة في التوثيق والمناقشات والمقابلات\n\nلاحظ أنك لا تحتاج أن تكون مقتنعاً بعدد سبع طبقات تحديداً — تحتاج أن تكون مقتنعاً بفكرة الطبقية نفسها، ثم تحفظ التقسيم المتفق عليه لغةً مشتركة.",
          en: "Why spend a whole lesson on a seemingly theoretical idea? Because its payoffs are purely practical and touch your daily work:\n\n- Interoperability: a Korean NIC works with a Chinese switch and an American router because all build on the same contracts\n- Easier learning and teaching: you study networking layer by layer instead of swallowing everything at once\n- Fault isolation: you say (the problem is at layer 2) and every engineer on the planet understands instantly\n- Freedom of replacement: media and technologies evolve without rewriting applications\n- Low barriers to innovation: a vendor specializing only in cables can develop and sell without understanding HTTP\n- A unified language for documentation, discussions, and interviews\n\nNotice that you do not need to be convinced that seven is the magic number — you need to believe in layering itself, then memorize the agreed division as a shared language.",
        },
      },
      {
        heading: { ar: "الأنداد يتخاطبون: الحوار المنطقي", en: "Peers Talking: The Logical Conversation" },
        body: {
          ar: "أدق فكرة في نموذج OSI يغفلها المبتدئون: كل طبقة على جهازك تتخاطب (منطقياً) مع طبقتها المقابلة على الجهاز البعيد. طبقة TCP عندك تسلّم رسالة لطبقة TCP عند الخادم، وطبقة IP تخاطب طبقة IP في الموجّه.\n\nهذا الحوار لا يحدث مباشرة في الهواء؛ بل تنزل البيانات فعلياً عبر طبقات جهازك حتى الإشارات، فتصعد من جديد عبر طبقات الجهاز الآخر. لكن كل طبقة تتعامل فقط مع الرأس (Header) الذي وضعته طبقتها المقابلة.\n\n- شبيه دبلوماسي: وزيران يتبادلان خطابات رسمية (حوار الطبقات العليا) بينما تنتقل الخطابات فعلياً عبر السفراء والبريد والطائرات (الطبقات الدنيا)\n- الوزير لا يطير بنفسه، لكنه يكتب بخطاب رسمي وفق بروتوكول متفق عليه مع الوزير المقابل\n\nالبروتوكول (Protocol) هو مجموعة قواعد هذا الحوار المتناظر: بنية الرأس، ترتيب الرسائل، كيفية الرد. ولهذا نقول إن OSI يصف خدمات الطبقات، بينما تصف البروتوكولات (مثل TCP وIP) قواعد الحوار داخل كل طبقة.",
          en: "The subtlest OSI idea that beginners miss: each layer on your device logically talks to its counterpart layer on the remote device. Your TCP layer hands a message to the TCP layer on the server, and your IP layer converses with the IP layer on the router.\n\nThis conversation does not happen directly through the air; data actually descends the layers of your device to signals, then climbs back up the layers of the other device. But each layer only handles the header placed by its counterpart.\n\n- A diplomatic analogy: two ministers exchange official letters (the upper layers conversation) while the letters physically travel via ambassadors, post, and planes (the lower layers)\n- The minister does not fly personally, but writes according to an official protocol agreed with the counterpart minister\n\nA protocol is the rule set of this peer dialog: the header structure, message order, how to reply. That is why OSI describes layer services, while protocols (like TCP and IP) describe the dialog rules inside each layer.",
        },
      },
    ],
    keyPoints: [
      { ar: "التقسيم الطبقي يحل مشكلة التعقيد بمنهج فَرِّق تَسُدْ", en: "Layering solves complexity with divide and conquer" },
      { ar: "OSI نموذج مرجعي من 7 طبقات أصدرته ISO عام 1984 (المعيار ISO 7498)", en: "OSI is a 7-layer reference model released by ISO in 1984 (standard ISO 7498)" },
      { ar: "كل طبقة تخدم ما فوقها وتستهلك ما تحتها عبر واجهات ثابتة", en: "Each layer serves the one above and consumes the one below via fixed interfaces" },
      { ar: "أعظم عوائد الطبقية: التشغيل البيني وعزل الأعطال وحرية استبدال التقنيات", en: "Greatest payoffs: interoperability, fault isolation, and technology replaceability" },
      { ar: "الحوار الحقيقي نظير-لنظير بين الطبقات المتقابلة عبر بروتوكولات متفق عليها", en: "The real conversation is peer-to-peer between matching layers via agreed protocols" },
    ],
    commands: [
      { cmd: "ping 8.8.8.8", desc: { ar: "أمر واحد يجتاز الطبقات من 1 إلى 3 دفعة واحدة — أول أداة تشخيص ستستخدمها دوماً", en: "One command crossing layers 1 through 3 at once — your first diagnostic tool" } },
      { cmd: "show interfaces status", desc: { ar: "على مبدّل Cisco: فحص حالة منافذ الطبقتين 1 و2", en: "On a Cisco switch: inspect layer 1-2 port states" } },
      { cmd: "ipconfig /all", desc: { ar: "عرض إعدادات جهازك في ويندوز: عناوين الطبقة 3 وبطاقة الطبقة 1-2", en: "Show your Windows settings: layer 3 addresses and the layer 1-2 NIC" } },
    ],
    quiz: [
      {
        q: { ar: "كم عدد طبقات نموذج OSI؟", en: "How many layers does the OSI model have?" },
        options: [
          { ar: "4", en: "4" },
          { ar: "5", en: "5" },
          { ar: "7", en: "7" },
          { ar: "9", en: "9" },
        ],
        correct: 2,
        explain: { ar: "سبع طبقات من الفيزيائية حتى التطبيقات. النموذج ذو الأربع طبقات هو TCP/IP وليس OSI.", en: "Seven layers, from Physical to Application. The four-layer model is TCP/IP, not OSI." },
      },
      {
        q: { ar: "أي جهة أصدرت نموذج OSI وفي أي سنة؟", en: "Which body published the OSI model and in what year?" },
        options: [
          { ar: "IEEE عام 1990", en: "IEEE in 1990" },
          { ar: "ISO عام 1984", en: "ISO in 1984" },
          { ar: "IETF عام 1974", en: "IETF in 1974" },
          { ar: "TIA/EIA عام 1995", en: "TIA/EIA in 1995" },
        ],
        correct: 1,
        explain: { ar: "المنظمة الدولية للتوحيد القياسي (ISO) نشرته 1984 ضمن المعيار ISO 7498.", en: "The International Organization for Standardization published it in 1984 as standard ISO 7498." },
      },
      {
        q: { ar: "استبدال كابل النحاس بألياف ضوئية دون أي تعديل في تطبيقات الويب يوضح:", en: "Swapping copper cable for fiber with zero changes to web apps demonstrates:" },
        options: [
          { ar: "أن الطبقة الفيزيائية لا تهم", en: "That the physical layer does not matter" },
          { ar: "أن التطبيقات تتحكم بالإشارات", en: "That applications control the signals" },
          { ar: "قيمة الواجهات الثابتة بين الطبقات", en: "The value of stable interfaces between layers" },
          { ar: "أن OSI إلزامي قانونياً", en: "That OSI is legally mandatory" },
        ],
        correct: 2,
        explain: { ar: "لأن عقد الواجهة بين الطبقات محفوظ: تتغير الطبقة 1 جذرياً وتبقى الطبقة 7 كما هي — هذه هي فائدة الطبقية القصوى.", en: "Because the interface contract is preserved: layer 1 changes radically while layer 7 stays identical — the greatest benefit of layering." },
      },
      {
        q: { ar: "عندما نقول إن طبقة النقل تخاطب (منطقياً) طبقة النقل في الجهاز البعيد، فإن البيانات فعلياً:", en: "When we say the transport layer logically talks to the remote transport layer, the data physically:" },
        options: [
          { ar: "تنتقل مباشرة من طبقة 4 إلى 4 عبر الهواء", en: "Flies directly from layer 4 to 4 through the air" },
          { ar: "تنزل عبر طبقات المرسل حتى الإشارات ثم تصعد في المستقبل", en: "Descends the sender layers to signals, then climbs up at the receiver" },
          { ar: "تتخطى الطبقات الدنيا لأنها للكابلات فقط", en: "Skips the lower layers since those are for cables only" },
          { ar: "تتحول إلى موجات صوتية", en: "Turns into sound waves" },
        ],
        correct: 1,
        explain: { ar: "الحوار نظير-لنظير منطقي فقط؛ فيزيائياً تنزل البيانات حتى الطبقة 1 إشارات، ثم تُفك وتصعد عند الجهاز الآخر.", en: "Peer dialog is logical only; physically data descends to layer 1 signals, then is decapsulated and climbs at the other device." },
      },
    ],
  },
  {
    id: "l012",
    moduleId: "m02",
    order: 2,
    level: "beginner",
    title: { ar: "الطبقة الفيزيائية وطبقة الوصل بعمق (L1 و L2)", en: "Physical & Data Link Layers in Depth (L1, L2)" },
    summary: {
      ar: "من نبضات الإلكترونات إلى إطارات MAC: تشريح كامل للطبقتين اللتين تلمسهما بيدك في كل شبكة.",
      en: "From electron pulses to MAC frames: a complete anatomy of the two layers you can physically touch in every network.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الطبقة 1 الفيزيائية: مملكة البتات", en: "Layer 1 Physical: Kingdom of Bits" },
        body: {
          ar: "الطبقة الفيزيائية (Physical Layer) هي الأرض التي تلتقي فيها الشبكات بالفيزياء الصرفة. مهمتها الوحيدة: تحويل البتات (Bits) — الأصفار والواحدات — إلى إشارات تسافر في وسط نقل، ثم التقاطها في الطرف الآخر وتحويلها إلى بتات من جديد.\n\nالإشارات تتخذ أحد ثلاثة أشكال بحسب الوسط:\n\n- كهربائية: فولتات متغيرة في كابل نحاسي (الأكثر شيوعاً في الشبكات المحلية)\n- ضوئية: نبضات ضوء في ألياف زجاجية (الظهر العظمى للشبكات الحديثة)\n- لاسلكية: موجات راديو في الهواء (Wi-Fi واتصالات الجوال)\n\nوتتولى الطبقة أيضاً تفاصيل ناعمة: كيف يُرمَّز البت نفسه (Encoding) على الإشارة، والزمن المتاح لكل بت (Bit timing) كي يتفق الطرفان على قراءته، وأنواع الموصلات (RJ45 و LC وغيرها)، والمسافات القصوى قبل أن تضعف الإشارة.\n\nكل شيء في هذه الطبقة ملموس أو قابل للقياس بأجهزة مخبرية: كابل، موصل، ضوء الربط (Link LED) على بطاقة الشبكة. ووحدة البيانات فيها (PDU) اسمها: بت (Bit).",
          en: "The Physical Layer is where networking meets pure physics. Its single job: convert bits — zeros and ones — into signals that travel over a medium, then capture them at the far end and convert them back into bits.\n\nSignals take one of three forms depending on the medium:\n\n- Electrical: varying voltage in copper cable (most common in LANs)\n- Optical: light pulses in glass fiber (the modern backbone)\n- Wireless: radio waves in the air (Wi-Fi and cellular)\n\nThe layer also handles subtle details: how a bit is encoded onto the signal, the time slot allowed per bit (bit timing) so both ends agree how to read it, connector types (RJ45, LC, etc.), and maximum distances before the signal degrades.\n\nEverything here is tangible or measurable with lab instruments: cable, connector, the link LED on your NIC. Its PDU is called: the Bit.",
        },
      },
      {
        heading: { ar: "الطبقة 1 عملياً: ما الذي يعطلها؟", en: "Layer 1 in Practice: What Breaks It?" },
        body: {
          ar: "إحصائية يترددها مدربو الشبكات: نسبة كبيرة من الأعطال اليومية سببها الطبقة الفيزيائية — وأغلبها يمكن حله بيدك خلال دقائق. أعطالها النمطية:\n\n- كابل مقطوع أو مقصوص بالخطأ أثناء أعمال البناء\n- موصل RJ45 مثبّت بأسلوب رديء (تبدّل أزواج الأسلاك)\n- انحناء حاد لألياف ضوئية أو غبار في نهايتها\n- تشويش كهرومغناطيسي (EMI) من كابلات كهرباء أو محركات أو إضاءة فلورسنت قريبة\n- كابل أطول من الحد المسموح (100 متر للنحاس) فتضعف الإشارة (Attenuation)\n- بطاقة شبكة أو منفذ مبدّل تالفة فعلياً\n\nمؤشر الفحص الأول دائماً: ضوء الربط على المنفذ. إن كان مطفأً فأنت أمام مشكلة L1 شبه مؤكدة قبل أن تكتب أي أمر تشخيصي.",
          en: "A statistic repeated by networking trainers: a large share of daily faults are physical-layer faults — and most are fixable by hand within minutes. Its typical failures:\n\n- A cut or accidentally severed cable during construction work\n- A poorly crimped RJ45 connector (wires in wrong pair order)\n- A sharp fiber bend or dust on the fiber tip\n- Electromagnetic interference (EMI) from power cables, motors, or nearby fluorescent lighting\n- Cable longer than the allowed limit (100 m for copper), causing attenuation\n- A genuinely dead NIC or switch port\n\nThe first check is always: the link LED on the port. If it is dark, you are almost certainly facing an L1 problem before typing any diagnostic command.",
        },
      },
      {
        heading: { ar: "الطبقة 2 الوصل: من البتات إلى الإطارات", en: "Layer 2 Data Link: From Bits to Frames" },
        table: {
          caption: { ar: "الطبقة الفيزيائية مقابل طبقة الوصل", en: "Physical layer vs data link layer" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "الطبقة 1 الفيزيائية", en: "Layer 1 Physical" },
            { ar: "الطبقة 2 الوصل", en: "Layer 2 Data Link" },
          ],
          rows: [
            [
              { ar: "وحدة البيانات PDU", en: "PDU" },
              { ar: "بتات Bits", en: "Bits" },
              { ar: "إطار Frame", en: "Frame" },
            ],
            [
              { ar: "العنونة", en: "Addressing" },
              { ar: "لا عناوين — إشارة فقط", en: "No addresses — just signal" },
              { ar: "عنوان MAC للجهازين المتجاورين", en: "MAC addresses of the two neighbors" },
            ],
            [
              { ar: "الأجهزة النموذجية", en: "Typical devices" },
              { ar: "مكرر Repeater، مجمّع Hub", en: "Repeater, hub" },
              { ar: "مبدّل Switch، جسر Bridge", en: "Switch, bridge" },
            ],
            [
              { ar: "كشف الأخطاء", en: "Error detection" },
              { ar: "لا شيء", en: "None" },
              { ar: "حقل FCS بفحص CRC", en: "FCS field with a CRC check" },
            ],
            [
              { ar: "الوظيفة الجوهرية", en: "Core job" },
              { ar: "نقل الإشارة عبر الوسيط", en: "Carrying the signal over the medium" },
              { ar: "تأطير البيانات والتحكم بالوصول للوسط", en: "Framing data and controlling medium access" },
            ],
          ],
        },
        body: {
          ar: "لماذا نحتاج طبقة فوق الفيزيائية؟ لأن مجرد إرسال بتات لا يكفي: من يجب أن يستلم هذه البتات؟ متى يبدأ الإرسال؟ وماذا لو فسدت البيانات في الطريق؟ طبقة الوصل (Data Link) تجيب عن هذه الأسئلة الثلاثة.\n\nمهامها الجوهرية:\n\n- التأطير (Framing): تجميع البتات في وحدات محددة الحواف تسمى إطارات (Frames) ليستطيع المستقبل معرفة البداية والنهاية\n- العنونة المادية: عنوان MAC (48 بت) يحدد بطاقة الشبكة المقصودة على الوصلة نفسها\n- كشف الأخطاء: حساب CRC يوضع في ذيل الإطار (FCS) ليكشف أي تلف في الطريق\n- الوصول للوسط (Media Access): قواعد من يرسل ومتى — تاريخياً CSMA/CD في الإيثرنت القديم\n\nنقطة مفصلية: طبقة الوصل توصل من جهاز إلى جيرانه المباشر فقط (Hop-to-Hop) على الوصلة الواحدة. الوصول للجهاز الذي يبعد عشر شبكات ليس عملها — ذلك عمل الطبقة 3. ووحدة بياناتها (PDU) اسمها: إطار (Frame).",
          en: "Why need a layer above the physical? Because sending raw bits is not enough: who should receive these bits? When may transmission start? What if data corrupts in transit? The Data Link layer answers these three questions.\n\nIts core duties:\n\n- Framing: grouping bits into clearly delimited units called frames so the receiver knows start and end\n- Physical addressing: a MAC address (48 bits) identifying the target NIC on the same link\n- Error detection: a CRC computation placed in the frame trailer (FCS) revealing any corruption en route\n- Media access: rules for who transmits and when — historically CSMA/CD in old Ethernet\n\nOne pivotal point: the Data Link delivers device-to-direct-neighbor (hop-to-hop) on a single link only. Reaching a device ten networks away is not its job — that is layer 3. Its PDU is called: the Frame.",
        },
      },
      {
        heading: { ar: "الطبقتان الفرعيتان: LLC و MAC", en: "The Two Sublayers: LLC and MAC" },
        body: {
          ar: "IEEE قسّم طبقة الوصل عملياً إلى طبقتين فرعيتين، وفهم هذا التقسيم يفسر لك أرقام المعايير التي ستقابلها دوماً:\n\n- LLC (Logical Link Control) وفق 802.2: الواجهة العليا؛ يميّز أي بروتوكول طبقة عليا يستقر داخل الإطار (IP؟ ARP؟ غيرهما؟) ويقدم خدمات لبروتوكولات الطبقة 3\n- MAC (Media Access Control) وفق 802.3: الطبقة السفلى؛ تدير الوصول للوسط، وعناوين MAC، وتنسيق الإطار الفعلي\n\nلهذا حين تقرأ IEEE 802.3 فأنت تقرأ مواصفات الجزء MAC من الإيثرنت السلكي، و802.11 هي المعادل اللاسلكي (Wi-Fi).\n\nهذا التقسيم أنتج مرونة تاريخية جميلة: يمكن لجزء MAC أن يعمل مع وسائط مختلفة (نحاس، ألياف، راديو) بينما يبقى LLC واحداً فوقه.",
          en: "IEEE practically split the Data Link layer into two sublayers, and understanding this explains the standards numbers you will keep meeting:\n\n- LLC (Logical Link Control), per 802.2: the upper interface; distinguishes which upper-layer protocol rides inside the frame (IP? ARP? something else?) and offers services to layer-3 protocols\n- MAC (Media Access Control), per 802.3: the lower part; manages medium access, MAC addresses, and actual frame formatting\n\nThat is why reading IEEE 802.3 means reading the MAC portion of wired Ethernet, while 802.11 is the wireless equivalent (Wi-Fi).\n\nThis split produced beautiful historical flexibility: the MAC part can operate over different media (copper, fiber, radio) while a single LLC sits above.",
        },
        tip: {
          ar: "احفظ معكوس الاتجاه لفهم الحد بين الطبقتين: L1 تنقل بتات لا تعرف معناها، وL2 تعطي البتات هوية (عنوان) وحدوداً (إطار) وضمان كشف الخطأ (FCS).",
          en: "Remember the dividing line: L1 moves meaningless bits, while L2 gives bits an identity (address), boundaries (frame), and corruption detection (FCS).",
        },
      },
      {
        heading: { ar: "فحص الطبقتين على أرض الواقع", en: "Inspecting Both Layers on Real Equipment" },
        body: {
          ar: "على مبدّلات Cisco يكشف الأمر show interfaces حالة الطبقتين معاً في تقرير واحد. الجزء الأول من السطر (GigabitEthernet0/1 is up) يعكس الطبقة 1 (الإشارة حاضرة؟)، و(line protocol is up) يعكس الطبقة 2 (الإطار قيد التدفق؟).\n\nعلى لينكس يقوم ethtool بنفس الدور: يعرض سرعة الربط (طبقة 1) وحالة التفاوض والثنائية (بين 1 و2)، بينما ip link يظهر بطاقة الشبكة وعنوانها المادي (طبقة 2).\n\n- is up / line protocol is up: الوصلة سليمة كلياً\n- is up / line protocol is down: الإشارة موجودة لكن لا تدفق إطارات — تلمّح مشكلة VLAN أو تفاوض ثنائية\n- is down / line protocol is down: لا إشارة أصلاً — عد إلى الكابل فوراً",
          en: "On Cisco switches, the show interfaces command reveals both layers in one report. The first part of the line (GigabitEthernet0/1 is up) reflects layer 1 (signal present?), while (line protocol is up) reflects layer 2 (frames flowing?).\n\nOn Linux, ethtool plays the same role: it shows link speed (layer 1) and negotiation/duplex state (between 1 and 2), while ip link shows the NIC and its burned-in address (layer 2).\n\n- is up / line protocol is up: link fully healthy\n- is up / line protocol is down: signal present but no frame flow — hints at VLAN or duplex negotiation issues\n- is down / line protocol is down: no signal at all — go straight to the cable",
        },
        code: {
          lang: "text",
          snippet: "Switch# show interfaces gigabitethernet 0/1\nGigabitEthernet0/1 is up, line protocol is up (connected)\n  Hardware is Gigabit Ethernet, address is 00d0.ffab.1201 (bia 00d0.ffab.1201)\n  Full-duplex, 1000Mb/s, media type is 10/100/1000BaseTX\n  0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored\n  0 output errors, 0 collisions, 0 late collisions",
        },
      },
    ],
    keyPoints: [
      { ar: "الطبقة 1 تحول البتات إلى إشارات: كهربائية أو ضوئية أو لاسلكية، وPDU فيها هو البت", en: "Layer 1 converts bits to signals: electrical, optical, or radio; its PDU is the Bit" },
      { ar: "الطبقة 2 تأطر البيانات وتعنونها بعناوين MAC وتكشف الفساد عبر FCS، وPDU فيها هو الإطار", en: "Layer 2 frames data, addresses it with MAC, and detects corruption via FCS; its PDU is the Frame" },
      { ar: "طبقة الوصل توصل جهازاً بجاره المباشر فقط (hop-to-hop) وليس عبر الشبكات", en: "Data Link delivers to the direct neighbor only (hop-to-hop), not across networks" },
      { ar: "IEEE قسّم L2 إلى LLC (802.2) و MAC (802.3 / 802.11 لاسلكياً)", en: "IEEE split L2 into LLC (802.2) and MAC (802.3 wired / 802.11 wireless)" },
      { ar: "ضوء الربط المطفي وأمر interface is down أول مؤشر على عطل فيزيائي", en: "A dark link LED and interface is down are the first signs of a physical fault" },
    ],
    commands: [
      { cmd: "show interfaces gigabitethernet 0/1", desc: { ar: "فحص مفصل لمنفذ: حالة الطبقتين والأخطاء والتصادمات", en: "Detailed port inspection: both layer states, errors, and collisions" } },
      { cmd: "ethtool eth0", desc: { ar: "لينكس: سرعة الربط وحالة التفاوض والثنائية لبطاقة الشبكة", en: "Linux: link speed, negotiation, and duplex state of your NIC" } },
      { cmd: "ip link show", desc: { ar: "لينكس: عرض البطاقات وعناوينها المادية (MAC)", en: "Linux: list interfaces and their hardware (MAC) addresses" } },
    ],
    quiz: [
      {
        q: { ar: "ما وحدة البيانات (PDU) في كل من الطبقتين 1 و2؟", en: "What are the PDUs at layers 1 and 2?" },
        options: [
          { ar: "إطار في 1 وبت في 2", en: "Frame at 1 and Bit at 2" },
          { ar: "بت في 1 وإطار في 2", en: "Bit at 1 and Frame at 2" },
          { ar: "رزمة في 1 وقطعة في 2", en: "Packet at 1 and Segment at 2" },
          { ar: "بيانات في الطبقتين", en: "Data in both" },
        ],
        correct: 1,
        explain: { ar: "الفيزيائية تنقل بتات خام، وطبقة الوصل تجمعها في إطارات معنونة ومفحوصة بـ FCS.", en: "Physical moves raw bits; Data Link packs them into addressed frames checked by FCS." },
      },
      {
        q: { ar: "مهمة الكشف عن تلف البيانات داخل الإطار تتولاها:", en: "Detecting corruption inside a frame is the job of:" },
        options: [
          { ar: "حقل FCS في ذيل الإطار (CRC)", en: "The FCS field in the frame trailer (CRC)" },
          { ar: "عنوان MAC المصدر", en: "The source MAC address" },
          { ar: "ضوء الربط على المنفذ", en: "The port link LED" },
          { ar: "بروتوكول HTTP", en: "The HTTP protocol" },
        ],
        correct: 0,
        explain: { ar: "المبدل يعيد حساب CRC عند الاستلام ويقارنه بـ FCS؛ عدم التطابق يعني إطار فاسداً فيُرمى.", en: "The switch recomputes the CRC on arrival and compares with FCS; a mismatch means a corrupt frame that gets dropped." },
      },
      {
        q: { ar: "توصيل البيانات من جهاز إلى جاره المباشر على الوصلة نفسها هو تعريف:", en: "Delivering data to a direct neighbor on the same link defines:" },
        options: [
          { ar: "الطبقة النقل end-to-end", en: "Transport end-to-end" },
          { ar: "الطبقة الشبكة routing", en: "Network routing" },
          { ar: "طبقة الوصل hop-to-hop", en: "Data Link hop-to-hop" },
          { ar: "طبقة التطبيقات", en: "The application layer" },
        ],
        correct: 2,
        explain: { ar: "L2 تعمل ضمن الوصلة الواحدة؛ أما العبور بين الشبكات فيبدأ من الطبقة 3 والتوجيه.", en: "L2 works within a single link; crossing networks starts at layer 3 with routing." },
      },
      {
        q: { ar: "المعيار IEEE 802.3 يصف:", en: "IEEE 802.3 describes:" },
        options: [
          { ar: "Wi-Fi اللاسلكي", en: "Wireless Wi-Fi" },
          { ar: "الجزء MAC من الإيثرنت السلكي", en: "The MAC portion of wired Ethernet" },
          { ar: "ترويسة IP", en: "The IP header" },
          { ar: "بروتوكول TCP", en: "The TCP protocol" },
        ],
        correct: 1,
        explain: { ar: "802.3 للإيثرنت السلكي (الجزء MAC من طبقة الوصل)، و802.11 للّاسلكي، و802.2 لجزء LLC.", en: "802.3 is wired Ethernet (the MAC sublayer), 802.11 is wireless, and 802.2 is the LLC part." },
      },
    ],
  },
  {
    id: "l013",
    moduleId: "m02",
    order: 3,
    level: "beginner",
    title: { ar: "طبقة الشبكة وطبقة النقل بعمق (L3 و L4)", en: "Network & Transport Layers in Depth (L3, L4)" },
    summary: {
      ar: "كيف يجد IP طريقه بين شبكات متباعدة، وكيف تسلّم طبقة النقل البيانات من عملية إلى عملية عبر المنافذ.",
      en: "How IP finds a path across distant networks, and how the transport layer hands data from process to process via ports.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الطبقة 3 الشبكة: العقل المخطِّط", en: "Layer 3 Network: The Planning Mind" },
        body: {
          ar: "طبقة الشبكة (Network Layer) هي أول طبقة تهتم بالعالم الكبير خارج وصلتك المحلية. بينما تعمل L2 بين جارين مباشرين، تجيب L3 عن سؤال وجودي: كيف تصل هذه البيانات من شبكة في القاهرة إلى خادم في طوكيو عبر عشرات الأجهزة الوسيطة؟\n\nمهامها الثلاث الكبرى:\n\n- العنونة المنطقية: عناوين IP ذات بنية هرمية (جزء شبكة + جزء جهاز) تسمح بالتجميع والتوجيه الفعّال — بعكس MAC المسطّح\n- التوجيه (Routing): اختيار أفضل مسار عبر شبكة من المسارات الممكنة وفق جداول التوجيه وبروتوكولاتها\n- تجزئة الرزم (Fragmentation) عند الضرورة: تقسيم الرزمة إن كانت أكبر من MTU الوصلة القادمة\n\nالجهاز الذي يعمل هنا هو الموجّه (Router)، ووحدة البيانات (PDU) اسمها: رزمة (Packet). وأشهر بروتوكولاتها: IPv4 و IPv6 وأدوات مساندة مثل ICMP الذي تستخدمه أداة ping.",
          en: "The Network Layer is the first layer that cares about the wide world beyond your local link. While L2 works between direct neighbors, L3 answers an existential question: how does this data travel from a network in Cairo to a server in Tokyo across dozens of intermediate devices?\n\nIts three great tasks:\n\n- Logical addressing: hierarchical IP addresses (network part + host part) enabling aggregation and efficient routing — unlike flat MAC\n- Routing: choosing the best path among possible paths using routing tables and their protocols\n- Fragmenting packets when needed: splitting a packet larger than the next link MTU\n\nThe device operating here is the router, and its PDU is the Packet. Its most famous protocols: IPv4, IPv6, and helpers like ICMP, which powers your ping tool.",
        },
      },
      {
        heading: { ar: "IP غير موثوق — وهذه ميزة! ", en: "IP Is Unreliable — And That Is a Feature!" },
        body: {
          ar: "مفاجأة للمبتدئين: IP بُني عمداً كخدمة (أفضل جهد Best Effort) بلا ضمانات. لا يؤكد التسليم، لا يرتب الرزم، لا يكشف فساد حقل البيانات، وقد يضيّع رزمة أو يكررها.\n\nلماذا هذا القصور المتعمّد؟ لأن الموثوقية الكاملة على مستوى كل قفزة ستكون بطيئة ومكلفة بطبقاتها. الفلسفة: اجعل قلب الشبكة بسيطاً وسريعاً إلى أقصى حد، وارفع الموثوقية فقط عند التطبيقات التي تحتاجها فعلاً.\n\n- تطبيق يتصفح موقعاً؟ HTTP فوق TCP يعيد ما فُقد تلقائياً\n- مكالمة صوتية حية؟ يفضل UDP السريع: إعادة إرسال لحظة فائتة بلا قيمة\n\nحقل TTL في ترويسة IP يمنع رزماً يائسة من الدوران إلى الأبد: كل موجّه ينقصه 1، وعند الصفر تُرمى الرزمة ويُرسل رسالة ICMP تُعلن ذلك — وهكذا يعمل traceroute.",
          en: "A surprise for beginners: IP was deliberately built as a best-effort service with no guarantees. It does not confirm delivery, reorder packets, or detect payload corruption, and it may drop or duplicate packets.\n\nWhy this deliberate weakness? Because full per-hop reliability would be slow and expensive at scale. The philosophy: keep the network core as simple and fast as possible, and add reliability only for the applications that truly need it.\n\n- An app browsing a site? HTTP over TCP retransmits losses automatically\n- A live voice call? UDP speed is preferred: resending a gone-by moment is worthless\n\nThe TTL field in the IP header prevents desperate packets from looping forever: each router decrements it by 1; at zero the packet is dropped and an ICMP message announces it — that is exactly how traceroute works.",
        },
      },
      {
        heading: { ar: "الطبقة 4 النقل: من جهاز إلى عملية", en: "Layer 4 Transport: From Device to Process" },
        table: {
          caption: { ar: "الطبقة 3 مقابل الطبقة 4", en: "Layer 3 vs layer 4" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "الطبقة 3 الشبكة", en: "Layer 3 Network" },
            { ar: "الطبقة 4 النقل", en: "Layer 4 Transport" },
          ],
          rows: [
            [
              { ar: "العنونة", en: "Addressing" },
              { ar: "منطقية: عنوان IP", en: "Logical: IP address" },
              { ar: "المنافذ Ports", en: "Ports" },
            ],
            [
              { ar: "نطاق التسليم", en: "Delivery scope" },
              { ar: "من جهاز إلى جهاز", en: "Host to host" },
              { ar: "من عملية إلى عملية", en: "Process to process" },
            ],
            [
              { ar: "الموثوقية", en: "Reliability" },
              { ar: "لا ضمان (Best Effort)", en: "No guarantee (best effort)" },
              { ar: "TCP يضمن، UDP لا", en: "TCP guarantees, UDP does not" },
            ],
            [
              { ar: "أمثلة البروتوكولات", en: "Protocol examples" },
              { ar: "IP، ICMP، OSPF", en: "IP, ICMP, OSPF" },
              { ar: "TCP، UDP، QUIC", en: "TCP, UDP, QUIC" },
            ],
            [
              { ar: "الجهاز المرتبط", en: "Associated device" },
              { ar: "الراوتر Router", en: "Router" },
              { ar: "لا جهاز — وظيفة في نظام التشغيل", en: "No device — an OS function" },
            ],
          ],
        },
        body: {
          ar: "وصلت الرزمة أخيراً إلى جهازك — لكن إلى أي برنامج بالضبط؟ المتصفح؟ لعبة أونلاين؟ تحديث النظام؟ طبقة النقل (Transport Layer) هي من يفرز:\n\n- التوصيل من طرف إلى طرف (End-to-End): بين التطبيق المرسل والتطبيق المستقبل مهما تباعدت الشبكات\n- التعدد الإرسال (Multiplexing): أرقام المنافذ (Ports) — 16 بت أي 0 إلى 65535 — تحدد العملية المقصودة على كل جهاز\n- التجزئة وإعادة التجميع: تقسيم البيانات الكبيرة إلى قطع (Segments) قابلة للإرسال ثم إعادة بنائها بالترتيب عند الوصول\n\nبروتوكولاها الشهيران يلخصان فلسفتين متعاكستين:\n\n- TCP: مهذب متأنٍّ — مصافحة قبل الكلام، تأكيد كل شيء، إعادة إرسال الفاقد، ضبط التدفق\n- UDP: فوضوي سريع — أرسل واهرب؛ مثالي للبث الحي والألعاب و DNS",
          en: "The packet finally reaches your device — but which program exactly? The browser? An online game? A system update? The Transport Layer is the sorter:\n\n- End-to-end delivery: between the sending application and the receiving one, however far apart\n- Multiplexing: port numbers — 16 bits, i.e. 0 to 65535 — identify the intended process on each device\n- Segmentation and reassembly: splitting large data into transmittable segments, then rebuilding them in order at arrival\n\nIts two famous protocols embody opposite philosophies:\n\n- TCP: polite and patient — handshake before talking, acknowledge everything, retransmit losses, control flow\n- UDP: chaotic and fast — fire and forget; ideal for live streaming, games, and DNS",
        },
      },
      {
        heading: { ar: "المنافذ والمقابس: بلغة الأرقام", en: "Ports and Sockets: In the Language of Numbers" },
        body: {
          ar: "المنفذ (Port) رقمٌ فقط — لكنه الرقم الذي جعل الإنترنت متعدد المهام على جهاز واحد. اصطلاح تقسيم نطاق 65536 منفذاً:\n\n- 0-1023 معروفة (Well-Known): محجوزة للخدمات الجوهرية: 80 لـ HTTP و443 لـ HTTPS و25 لـ SMTP و53 لـ DNS و22 لـ SSH\n- 1024-49151 مسجّلة: لبرامج الخدمات التجارية\n- 49152-65535 ديناميكية/مؤقتة: يفتحها العميل لنفسه في كل اتصال جديد\n\nوحين يلتقي عنوان IP مع رقم منفذ يولد المقبس (Socket): مثل 142.250.72.14:443 — العنوان الكامل لعملية بعينها على جهاز بعينه.\n\n- اتصالك بموقع ما يكتب عملياً: (IP جهازك: منفذ مؤقت) ← (IP الخادم:443)\n- جدار الحماية في جوهره فاحص لهذه الثنائيات: يسمح أو يمنع (IP ومنفذ) معينة",
          en: "A port is just a number — but it is the number that made the Internet multitask on a single device. The convention for dividing the 65536 ports:\n\n- 0-1023 well-known: reserved for core services: 80 HTTP, 443 HTTPS, 25 SMTP, 53 DNS, 22 SSH\n- 1024-49151 registered: for commercial service software\n- 49152-65535 dynamic/ephemeral: opened by the client for itself on each new connection\n\nWhen an IP address meets a port number, the Socket is born: like 142.250.72.14:443 — the full address of a specific process on a specific device.\n\n- Your connection to a site practically writes: (your IP: ephemeral port) to (server IP:443)\n- A firewall is fundamentally an examiner of these pairs: allowing or denying specific (IP and port) combinations",
        },
        tip: {
          ar: "احفظ بذمة: 22 SSH و53 DNS و80 HTTP و443 HTTPS و25 SMTP. هذه تظهر في كل اختبار شبكات وكل تحقيق حقيقي لاتصال مشبوه.",
          en: "Memorize on honor: 22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 25 SMTP. They appear in every networking exam and every real investigation of suspicious connections.",
        },
      },
    ],
    keyPoints: [
      { ar: "L3 تقدم العنونة المنطقية الهرمية والتوجيه، وPDU فيها هي الرزمة Packet", en: "L3 provides hierarchical logical addressing and routing; its PDU is the Packet" },
      { ar: "IP خدمة أفضل-جهد عمداً؛ الموثوقية تُبنى فوقه عند الحاجة (TCP) ", en: "IP is deliberately best-effort; reliability is built above it when needed (TCP)" },
      { ar: "حقل TTL ينقص 1 عند كل موجّه ليمنع دوران الرزم إلى الأبد", en: "TTL decrements at each router to stop packets looping forever" },
      { ar: "L4 توصل من عملية إلى عملية عبر المنافذ (16 بت) وتقسم البيانات إلى قطع Segments", en: "L4 delivers process-to-process via 16-bit ports and splits data into Segments" },
      { ar: "TCP مهذب موثوق وUDP سريع مجرد؛ الاختيار بحسب طبيعة التطبيق", en: "TCP is polite and reliable, UDP is fast and bare; the choice follows the application nature" },
    ],
    commands: [
      { cmd: "show ip route", desc: { ar: "على موجّه Cisco: جدول التوجيه — عقل الطبقة 3 كله أمامك", en: "On a Cisco router: the routing table — the entire layer 3 mind laid bare" } },
      { cmd: "ping 192.168.1.1", desc: { ar: "اختبار الوصول للبوابة عبر ICMP (بروتوكول طبقة 3)", en: "Test reachability to the gateway via ICMP (a layer 3 protocol)" } },
      { cmd: "ss -tulpn", desc: { ar: "لينكس: المنافذ المفتوحة والعمليات التي تستمع عليها (طبقة 4)", en: "Linux: open ports and the processes listening on them (layer 4)" } },
      { cmd: "tracert 8.8.8.8", desc: { ar: "ويندوز: تتبع المسار وكل قفزة عبر رسائل ICMP لنفاد TTL", en: "Windows: trace the path hop by hop via TTL-exceeded ICMP messages" } },
    ],
    quiz: [
      {
        q: { ar: "أي وصف يناسب IP في طبقة الشبكة؟", en: "Which description fits IP at the network layer?" },
        options: [
          { ar: "موثوق ومضبوط التدفق", en: "Reliable with flow control" },
          { ar: "أفضل جهد بلا ضمان تسليم", en: "Best effort with no delivery guarantee" },
          { ar: "مسؤول عن عناوين MAC", en: "Responsible for MAC addresses" },
          { ar: "بروتوكول طبقة تطبيقات", en: "An application layer protocol" },
        ],
        correct: 1,
        explain: { ar: "IP بُني بسيطاً سريعاً بلا ضمانات؛ الموثوقية خيار يبنى فوقه عبر TCP عند الحاجة.", en: "IP was built simple and fast with no guarantees; reliability is an optional layer above it via TCP when needed." },
      },
      {
        q: { ar: "ما وظيفة حقل TTL في ترويسة IP؟", en: "What is the role of the TTL field in the IP header?" },
        options: [
          { ar: "تحديد نوع الحمولة", en: "Identifying the payload type" },
          { ar: "منع دوران الرزم اللانهائي عبر إنقاصه كل قفزة", en: "Stopping infinite packet loops by decrementing each hop" },
          { ar: "حساب زمن استجابة التطبيق", en: "Measuring application response time" },
          { ar: "تشفير البيانات", en: "Encrypting the data" },
        ],
        correct: 1,
        explain: { ar: "كل موجّه ينقص TTL واحداً؛ عند بلوغه صفراً تُرمى الرزمة — وهي الآلية التي يرصد بها traceroute القفزات.", en: "Each router decrements TTL by one; at zero the packet is dropped — the mechanism traceroute exploits to reveal hops." },
      },
      {
        q: { ar: "منفذا HTTPS و DNS هما على الترتيب:", en: "The ports of HTTPS and DNS are respectively:" },
        options: [
          { ar: "80 و 25", en: "80 and 25" },
          { ar: "443 و 53", en: "443 and 53" },
          { ar: "22 و 80", en: "22 and 80" },
          { ar: "53 و 443", en: "53 and 443" },
        ],
        correct: 1,
        explain: { ar: "HTTPS يسكن المنفذ 443 (TCP) و DNS المنفذ 53 (UDP غالباً وTCP للنقل الكبير).", en: "HTTPS lives on port 443 (TCP) and DNS on port 53 (usually UDP, TCP for large transfers)." },
      },
      {
        q: { ar: "بيانات وصلت إلى جهازك — أي طبقة تحدد أنها متجهة إلى متصفحك دون غيره؟", en: "Data arrived at your device — which layer directs it to your browser specifically?" },
        options: [
          { ar: "الطبقة 2 عبر عنوان MAC", en: "Layer 2 via the MAC address" },
          { ar: "الطبقة 4 عبر رقم المنفذ", en: "Layer 4 via the port number" },
          { ar: "الطبقة 1 عبر الإشارة", en: "Layer 1 via the signal" },
          { ar: "الطبقة 6 عبر التشفير", en: "Layer 6 via encryption" },
        ],
        correct: 1,
        explain: { ar: "المقبس (IP:منفذ) هو ما يوجه البيانات إلى العملية الصحيحة — المنفذ 443 مثلاً للمتصفح عبر HTTPS.", en: "The socket (IP:port) directs data to the right process — port 443 for the browser over HTTPS, for instance." },
      },
    ],
  },
  {
    id: "l014",
    moduleId: "m02",
    order: 4,
    level: "beginner",
    title: { ar: "الطبقات العليا: الجلسة والعرض والتطبيقات (L5-L7)", en: "Upper Layers: Session, Presentation, Application (L5-L7)" },
    summary: {
      ar: "الطبقات الثلاث التي تلمس تجربة المستخدم مباشرة: الحوار، التنسيق، والبروتوكولات التي تستخدمها يومياً.",
      en: "The three layers touching user experience directly: dialog, formatting, and the protocols you use daily.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "الطبقة 5 الجلسة: إدارة الحوار", en: "Layer 5 Session: Managing the Dialog" },
        body: {
          ar: "المكالمة الهاتفية ليست مجرد أصوات: فيها تحية افتتاح، وتناوب في الكلام، وربما عبارة (انتظر حتى أنهي فكرة) لاستئناف لاحق. طبقة الجلسة (Session Layer) هي هذا الأدب التحادثي في الشبكات:\n\n- إنشاء الجلسة وتفويضها وإنهائها بين تطبيقين\n- التحكم في الدور (Dialog Control): من يرسل الآن ومتى يتناوب الطرفان\n- المزامنة (Synchronization): نقاط تفتيش (Checkpoints) تُغرز في المحادثات الطويلة، فإذا انقطع الاتصال استؤنف من آخر نقطة لا من الصفر\n\nمثال يجعل الفكرة ملموسة: تنزيل ملف 2 جيجابايت انقطع عند 70%. لو لم توجد جلسة بنقاط مزامنة لعدت للبداية؛ تقنيات الاستئناف (Resume) في المتصفحات تنتمي لروح هذه الطبقة.\n\nأمثلة تقنيات تاريخية ومعاصرة: NetBIOS و RPC (استدعاء إجراءات بعيدة — قلب عمل كثير من أنظمة المؤسسات) و SQL sessions بين التطبيق وقاعدة البيانات.",
          en: "A phone call is not just voices: it has an opening greeting, turn-taking, and perhaps a (hold that thought until I finish) for later resumption. The Session Layer is this conversational etiquette in networking:\n\n- Establishing, authorizing, and terminating sessions between two applications\n- Dialog control: who transmits now and how the sides alternate\n- Synchronization: checkpoints pinned into long conversations so an interrupted connection resumes from the last point, not from zero\n\nA tangible example: a 2 GB download that died at 70%. Without a session with sync points you would restart; the resume feature in browsers carries the spirit of this layer.\n\nExamples of technologies, historical and modern: NetBIOS, RPC (remote procedure calls — the heartbeat of many enterprise systems), and SQL sessions between an app and a database.",
        },
      },
      {
        heading: { ar: "الطبقة 6 العرض: لغة مشتركة", en: "Layer 6 Presentation: A Shared Language" },
        body: {
          ar: "لو أرسل جهاز نصاً بترميز لا يفهمه الطرف الآخر لحصلت كارثة (استبدال كل النصوص بعلامات استفهام). طبقة العرض (Presentation Layer) هي مترجم الأنظمة إلى بعضها:\n\n- تمثيل البيانات: ASCII مقابل UTF-8 مقابل EBCDIC؛ النهاية الصغرى والكبرى للبايتات (Endianness)\n- الضغط (Compression): تقليص الحجم قبل الإرسال كما تفعل تقنيات HTTP الحديثة\n- التشفير (Encryption): تحويل البيانات لصيغة غير مقروءة للوسطاء — ولهذا يُناقش TLS عادة قرب هذه الطبقة\n- صيغ الوسائط: JPEG و MPEG و MP3 صيغ عرض بامتياز\n\nأشهر نقاش امتحاني هنا: أين يسكن TLS؟ الجواب التقليدي: الطبقة 6، لكن التطبيق العملي وضعه بين 4 و6 — وهذا مثال جميل أن حدود الطبقات أحياناً سياسية أكثر منها فيزيائية.",
          en: "If one device sent text in an encoding the other does not understand, catastrophe (every string becomes question marks). The Presentation Layer is the translator between systems:\n\n- Data representation: ASCII vs UTF-8 vs EBCDIC; byte endianness\n- Compression: shrinking size before sending, as modern HTTP techniques do\n- Encryption: converting data to a form unreadable to intermediaries — why TLS is usually discussed near this layer\n- Media formats: JPEG, MPEG, and MP3 are presentation formats par excellence\n\nThe most famous exam debate here: where does TLS live? The textbook answer: layer 6, but practical implementation placed it between 4 and 6 — a beautiful example that layer boundaries are sometimes more political than physical.",
        },
      },
      {
        heading: { ar: "الطبقة 7 التطبيقات: واجهة عالمك الرقمي", en: "Layer 7 Application: Interface to Your Digital World" },
        body: {
          ar: "هنا تسكن البروتوكولات التي تتعامل معها بالاسم. أي شيء يخدم المستخدم النهائي مباشرة يقدمه بروتوكول من هذه الطبقة:\n\n- تصفح الويب: HTTP و HTTPS\n- ترجمة الأسماء: DNS (يحول netmastery إلى عنوان IP)\n- البريد الإلكتروني: SMTP للإرسال و POP3 و IMAP للاستلام\n- نقل الملفات: FTP و SFTP و TFTP\n- الوصول البعيد والأنظمة: SSH و Telnet (الثاني بلا تشفير — تاريخي)\n- الإعداد التلقائي: DHCP يمنح جهازك عنوانه وإعداداته عند الانضمام للشبكة\n\nتنبيه لغوي شائع: الطبقة لا تعني (تطبيق المستخدم) مثل المتصفح أو Outlook — بل تعني (بروتوكولات تخدم التطبيقات). المتصفح برنامج في طبقة المستخدم، وHTTP بروتوكول في الطبقة 7.",
          en: "Here live the protocols you deal with by name. Anything directly serving the end user is delivered by a protocol from this layer:\n\n- Web browsing: HTTP and HTTPS\n- Name resolution: DNS (turns netmastery into an IP address)\n- Email: SMTP for sending, POP3 and IMAP for receiving\n- File transfer: FTP, SFTP, TFTP\n- Remote access and systems: SSH and Telnet (the latter unencrypted — historical)\n- Auto configuration: DHCP grants your device its address when joining a network\n\nA common terminology trap: the layer does not mean the user application like the browser or Outlook — it means protocols serving applications. The browser is user-level software; HTTP is a layer 7 protocol.",
        },
      },
      {
        heading: { ar: "لماذا تتلاشى الثلاث طبقات في TCP/IP", en: "Why the Three Layers Blur in TCP/IP" },
        table: {
          caption: { ar: "الطبقات العليا الثلاث: الوظائف والأمثلة", en: "The three upper layers: roles and examples" },
          headers: [
            { ar: "الطبقة", en: "Layer" },
            { ar: "وظيفتها", en: "Function" },
            { ar: "أمثلة واقعية", en: "Real examples" },
          ],
          rows: [
            [
              { ar: "الطبقة 5 الجلسة", en: "Layer 5 Session" },
              { ar: "فتح الحوار ومزامنته واستعادته بعد الانقطاع", en: "Opening, synchronizing, and resuming dialogs" },
              { ar: "NetBIOS، RPC، SOCKS", en: "NetBIOS, RPC, SOCKS" },
            ],
            [
              { ar: "الطبقة 6 العرض", en: "Layer 6 Presentation" },
              { ar: "الترميز والضغط والتشفير المشترك", en: "Shared encoding, compression, encryption" },
              { ar: "TLS (تاريخياً)، JPEG، ASCII", en: "TLS (historically), JPEG, ASCII" },
            ],
            [
              { ar: "الطبقة 7 التطبيقات", en: "Layer 7 Application" },
              { ar: "خدمات المستخدم النهائي مباشرة", en: "Direct end-user services" },
              { ar: "HTTP، DNS، SMTP، FTP", en: "HTTP, DNS, SMTP, FTP" },
            ],
          ],
        },
        body: {
          ar: "حين بنيت عائلة TCP/IP اختار مهندسوها الدمج البديل للتفكيب الدقيق: طبقة تطبيقات واحدة تبتلع وظائف 5 و6 و7 معاً. النتيجة العملية: جلسات وضغط وتشفير أصبحت تُدار داخل بروتوكولات التطبيقات ذاتها (TLS يعمل تحت HTTP/2 مثلاً، والضغط جزء من بروتوكول الاتصال).\n\nفي الواقع العملي الحديث:\n\n- مفاتيح الجلسة يديرها TLS بين عميل وخادم\n- وظائف العرض (الضغط والتشفير والصيغ) موزعة في TLS وHTTP وبرامج الترميز\n- كتب التعليم المعاصرة تستخدم OSI لتعليم التصنيف، وTCP/IP لوصف الواقع\n\nستسمع المصطلحين معاً طوال مسيرتك: (هذه مشكلة طبقة 7) بلسان OSI، بينما تعمل فعلياً على حزمة TCP/IP. تعلم الاثنين ليس ترفاً؛ إنه كلام أهل المهنة.",
          en: "When the TCP/IP family was built, its engineers chose pragmatic merging over fine decomposition: a single Application layer absorbs the functions of 5, 6, and 7 together. The practical outcome: sessions, compression, and encryption became managed inside the application protocols themselves (TLS runs beneath HTTP/2, and compression is part of the connection protocol).\n\nIn modern practice:\n\n- Session keys are managed by TLS between client and server\n- Presentation functions (compression, encryption, formats) are spread across TLS, HTTP, and codecs\n- Modern textbooks use OSI to teach classification and TCP/IP to describe reality\n\nYou will hear both terms throughout your career: (that is a layer 7 problem) in OSI tongue while practically working over the TCP/IP suite. Learning both is not luxury; it is how the profession speaks.",
        },
        tip: {
          ar: "خريطة حفظ سريعة: DNS/HTTP/SMTP/FTP = تطبيقات (7)؛ TLS/الضغط/الصيغ = عرض (6)؛ نقاط الاستئناف/NetBIOS/RPC = جلسة (5).",
          en: "A quick memorization map: DNS/HTTP/SMTP/FTP = application (7); TLS/compression/formats = presentation (6); resume points/NetBIOS/RPC = session (5).",
        },
      },
    ],
    keyPoints: [
      { ar: "طبقة الجلسة تنشئ الحوار وتديره وتغرس نقاط مزامنة لاستئناف الانقطاعات", en: "The session layer opens dialogs, manages them, and plants sync points for resuming interruptions" },
      { ar: "طبقة العرض: تمثيل البيانات والضغط والتشفير وصيغ الوسائط", en: "Presentation: data representation, compression, encryption, and media formats" },
      { ar: "طبقة التطبيقات = بروتوكولات تخدم تطبيقات المستخدم (HTTP, DNS, SMTP, DHCP) وليست برامج المستخدم", en: "Application = protocols serving user apps (HTTP, DNS, SMTP, DHCP), not the user apps themselves" },
      { ar: "TCP/IP يدمج الطبقات الثلاث في طبقة تطبيقات واحدة", en: "TCP/IP merges the three into a single application layer" },
      { ar: "حدود الطبقات العليا مرنة عملياً: TLS مثال شهير للجدل 5/6/7", en: "Upper layer boundaries are flexible in practice: TLS is the famous 5/6/7 debate" },
    ],
    commands: [
      { cmd: "nslookup www.wikipedia.org", desc: { ar: "شاهد DNS (بروتوكول طبقة 7) يحل الاسم إلى عنوان IP أمامك", en: "Watch DNS (a layer 7 protocol) resolve a name to an IP before your eyes" } },
      { cmd: "curl -v https://example.com", desc: { ar: "تفاصيل طلب HTTP كاملاً مع تفاوض TLS — جولة في الطبقات 6 و7", en: "A full HTTP request with TLS negotiation — a tour of layers 6 and 7" } },
      { cmd: "telnet 8.8.8.8 53", desc: { ar: "اختبار وصول منفذ TCP 53 (طبقة 4) لخدمة DNS (طبقة 7)", en: "Test TCP 53 reachability (layer 4) to a DNS service (layer 7)" } },
    ],
    quiz: [
      {
        q: { ar: "تنزيل ضخم انقطع واستؤنف من نقطة التقدم الأخيرة — هذا جوهر وظيفة:", en: "A huge download interrupted and resumed from the last progress point — the essence of:" },
        options: [
          { ar: "طبقة الجلسة (المزامنة ونقاط التفتيش)", en: "The session layer (synchronization and checkpoints)" },
          { ar: "الطبقة الفيزيائية", en: "The physical layer" },
          { ar: "طبقة الوصل", en: "The data link layer" },
          { ar: "الطبقة الفيزيائية في كلا الطرفين", en: "The physical layer at both ends" },
        ],
        correct: 0,
        explain: { ar: "نقاط التفتيش تسمح باستئناف الحوار الطويل من آخر نقطة بدل البدء من الصفر — روح طبقة الجلسة.", en: "Checkpoints allow long dialogs to resume from the last point rather than restarting — the spirit of the session layer." },
      },
      {
        q: { ar: "الضغط والتمثيل الموحد للبيانات والصيغ مثل JPEG تُنسب إلى:", en: "Compression, unified data representation, and formats like JPEG are attributed to:" },
        options: [
          { ar: "طبقة النقل", en: "The transport layer" },
          { ar: "طبقة العرض", en: "The presentation layer" },
          { ar: "طبقة الشبكة", en: "The network layer" },
          { ar: "الطبقة الفيزيائية", en: "The physical layer" },
        ],
        correct: 1,
        explain: { ar: "العرض هو المترجم: يوحد التمثيل (ترميز النص)، يضغط، يفكى ويصرّف الصيغ القياسية.", en: "Presentation is the translator: unifies representation (text encoding), compresses, and handles standard formats." },
      },
      {
        q: { ar: "أي بروتوكول يسكن الطبقة 7؟", en: "Which protocol lives at layer 7?" },
        options: [
          { ar: "TCP", en: "TCP" },
          { ar: "IP", en: "IP" },
          { ar: "SMTP", en: "SMTP" },
          { ar: "Ethernet MAC", en: "Ethernet MAC" },
        ],
        correct: 2,
        explain: { ar: "SMTP بروتوكول نقل البريد لخدمة المستخدم — طبقة تطبيقات. TCP في 4 و IP في 3 و MAC في 2.", en: "SMTP moves email as a user service — layer 7. TCP is at 4, IP at 3, MAC at 2." },
      },
      {
        q: { ar: "في نموذج TCP/IP، وظائف الطبقات 5 و6 و7 تسكن:", en: "In the TCP/IP model, the functions of layers 5, 6, and 7 live in:" },
        options: [
          { ar: "ثلاث طبقات مستقلة كما هي", en: "Three separate layers as they are" },
          { ar: "طبقة تطبيقات واحدة مدمجة", en: "One merged application layer" },
          { ar: "طبقة النقل", en: "The transport layer" },
          { ar: "طبقة الوصل", en: "The link layer" },
        ],
        correct: 1,
        explain: { ar: "TCP/IP عملي الدمج: جلسات وعرض وتطبيقات صارت في طبقة واحدة تتكفل بها بروتوكولات فوق النقل.", en: "TCP/IP merges pragmatically: sessions, presentation, and applications collapse into one layer handled by protocols above transport." },
      },
    ],
  },
  {
    id: "l015",
    moduleId: "m02",
    order: 5,
    level: "beginner",
    title: { ar: "التغليف ووحدات البيانات PDU: هدية داخل صناديق", en: "Encapsulation & PDUs: A Gift Inside Boxes" },
    summary: {
      ar: "العملية التي تحول بياناتك الخام إلى إشارات: تغليف متتابع عبر الطبقات وترويسات تتكدس واحدة فوق أخرى.",
      en: "The process turning your raw data into signals: sequential wrapping through the layers with headers stacking one over another.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "فكرة التغليف", en: "The Encapsulation Idea" },
        body: {
          ar: "تخيل أنك ترسل قلادة ذهبية (بياناتك) لصديق في مدينة أخرى عبر شركة شحن:\n\n- القلادة توضع في علبة مخملية — ترويسة TCP تحمي وتنظم\n- العلبة توضع في كرتونة عليها عنوان المدينة والشارع — ترويسة IP توجّه عالمياً\n- الكرتونة تُحمَّل في شاحنة محلية قرب محطة الشحن — إطار Ethernet يسافر للقفزة القادمة فقط\n\nكل طبقة لا تشعر إلا بصنديقها هي، وتسلم الصندوق الأكبر لمن تحتها. عند الوصول يحدث العكس تماماً: تُفتح الشاحنة فالكرتونة فالعلبة فالقلادة.\n\nالتغليف (Encapsulation) في الشبكات: كل طبقة تأخذ مخرجات الطبقة الأعلى (سواء بيانات أو صندوق سابق) وتعتبرها بيانات خام، ثم تضيف ترويستها الخاصة (Header) — وأحياناً ذيلاً (Trailer) — حولها.",
          en: "Imagine sending a gold necklace (your data) to a friend in another city via a shipping company:\n\n- The necklace goes into a velvet box — the TCP header protects and organizes\n- The box goes into a carton carrying the city and street address — the IP header routes globally\n- The carton is loaded onto a local truck heading to the depot — the Ethernet frame travels to the next hop only\n\nEach layer only knows its own box and hands the bigger box below. At arrival the exact reverse happens: the truck, then the carton, then the box, then the necklace.\n\nEncapsulation in networks: each layer takes the output of the layer above (whether data or a previous box), treats it as raw payload, then wraps it with its own header — and sometimes a trailer.",
        },
      },
      {
        heading: { ar: "الرحلة رقمياً: من Data إلى Bits", en: "The Journey Digitally: From Data to Bits" },
        diagram: {
          kind: "layers",
          title: { ar: "برج التغليف: من البيانات حتى البتات", en: "The encapsulation tower: from data down to bits" },
          items: [
            { ar: "بيانات Data — خام من طبقات التطبيقات", en: "Data — raw from the application layers" },
            { ar: "مقطع Segment = بيانات + ترويسة TCP/UDP (L4)", en: "Segment = data + TCP/UDP header (L4)" },
            { ar: "حزمة Packet = مقطع + ترويسة IP (L3)", en: "Packet = segment + IP header (L3)" },
            { ar: "إطار Frame = حزمة + ترويسة وذيل إيثرنت (L2)", en: "Frame = packet + Ethernet header & trailer (L2)" },
            { ar: "بتات Bits — إشارات كهربائية/ضوئية (L1)", en: "Bits — electrical or optical signals (L1)" },
          ],
        },
        body: {
          ar: "الآن نفس الرحلة بأرقام دقيقة يجب أن تحفظها كمَهر شبكات. جهازك يريد إرسال طلب صفحة ويب:\n\n- الطبقة 7-5: الطلب نص HTTP يسمى بيانات (Data) — ليست له ترويسة بعد في مفهومنا\n- الطبقة 4: ترويسة TCP بحجم 20 بايت (في الحالة القياسية) تضاف أمام البيانات؛ الناتج قطعة (Segment)\n- الطبقة 3: ترويسة IP بحجم 20 بايت (IPv4 القياسية) تضاف أمام القطعة؛ الناتج رزمة (Packet)\n- الطبقة 2: ترويسة Ethernet بحجم 14 بايت تضاف أمام الرزمة وذيل FCS بحجم 4 بايت خلفها؛ الناتج إطار (Frame)\n- الطبقة 1: الإطار يتحول بتاً بتاً إلى إشارات كهربائية أو ضوئية أو لاسلكية\n\nعند الاستلام يعاد فك كل شيء بالترتيب العكسي نفسه، وكل طبقة تنزع ترويستها وتقرأها ثم تسلّم ما تحتها للطبقة الأعلى.",
          en: "Now the same journey with precise numbers you must memorize as a networking craftsman. Your device wants to send a web page request:\n\n- Layers 7-5: the HTTP request text is called data — no header yet in our model\n- Layer 4: a 20-byte TCP header (standard case) is prepended to the data; the result is a Segment\n- Layer 3: a 20-byte IPv4 header is prepended to the segment; the result is a Packet\n- Layer 2: a 14-byte Ethernet header is prepended to the packet and a 4-byte FCS trailer appended; the result is a Frame\n- Layer 1: the frame becomes bits converted into electrical, optical, or radio signals\n\nOn reception, everything is unwrapped in the exact reverse order, each layer stripping its header, reading it, then passing the remainder upward.",
        },
      },
      {
        heading: { ar: "ماذا يكتب كل صندوق على وجهه؟", en: "What Does Each Box Write on Its Face?" },
        body: {
          ar: "لماذا يشحن كل صندوق ببياناته هذه بالذات؟ لأن كل ترويسة تحمل معلومات لا تعنيها الطبقات الأخرى:\n\n- ترويسة TCP: رقم المنفذ الوجهة والمنبع، أرقام التسلسل للتجميع بالترتيب، أعلام SYN/ACK/FIN للحوار، نافذة الاستقبال لضبط التدفق\n- ترويسة IP: عنواني المصدر والوجهة (يبقيان ثابتين من البداية للنهاية!)، TTL، بروتوكول الطبقة العليا (6 لـ TCP و17 لـ UDP)\n- ترويسة Ethernet: عنوان MAC المصدر والوجهة (يتبدلان عند كل قفزة!)، حقل Type يدل أن الحمولة IP\n- ذيل FCS: بصمة CRC لكشف الفساد — لا يصلح الخطأ بل يرمي الإطار التالف فقط\n\nلاحظ البراعة: الطبقات السفلى تحتاج معلومات فورية متغيرة (MAC القفزة القادمة)، والعلية تحتاج معلومات رحلة كاملة ثابتة (IP والمنافذ). هذا التقسيم الذكي هو ما يسمح بتركيب أي شيء فوق أي شيء.",
          en: "Why does each box carry these specific fields? Because each header holds information meaningless to other layers:\n\n- TCP header: destination and source port numbers, sequence numbers for in-order reassembly, SYN/ACK/FIN dialog flags, receive window for flow control\n- IP header: source and destination addresses (remaining fixed from start to end!), TTL, upper-layer protocol (6 for TCP, 17 for UDP)\n- Ethernet header: source and destination MAC (rewritten at every hop!), a Type field indicating the payload is IP\n- FCS trailer: a CRC fingerprint to detect corruption — it does not repair, it only drops the damaged frame\n\nNotice the brilliance: lower layers need immediate changing info (next hop MAC), upper layers need whole-journey fixed info (IP and ports). This smart split is what allows stacking anything over anything.",
        },
        tip: {
          ar: "احفظ الأرقام الثلاثة: TCP 20 بايت، IP 20 بايت، Ethernet 14+4 بايت. ستستخدمها فوراً في حسابات MTU وتحليل الحزم لاحقاً في هذه الوحدة.",
          en: "Memorize the three numbers: TCP 20 bytes, IP 20 bytes, Ethernet 14+4 bytes. You will use them immediately in MTU math and packet analysis later in this module.",
        },
      },
      {
        heading: { ar: "جدول PDU: تسمية صحيحة أم خلط مشهور؟", en: "The PDU Table: Right Naming or a Famous Mix-Up?" },
        table: {
          caption: { ar: "مراحل التغليف وما يضاف في كل منها", en: "Encapsulation stages and what each adds" },
          headers: [
            { ar: "المرحلة", en: "Stage" },
            { ar: "ما يُضاف", en: "What is added" },
            { ar: "PDU الناتج", en: "Resulting PDU" },
          ],
          rows: [
            [
              { ar: "التطبيقات (7-5)", en: "Application (7-5)" },
              { ar: "لا شيء — البيانات الخام", en: "Nothing — raw data" },
              { ar: "Data", en: "Data" },
            ],
            [
              { ar: "النقل (4)", en: "Transport (4)" },
              { ar: "ترويسة TCP أو UDP مع المنافذ", en: "TCP or UDP header with ports" },
              { ar: "Segment", en: "Segment" },
            ],
            [
              { ar: "الشبكة (3)", en: "Network (3)" },
              { ar: "ترويسة IP مع العناوين", en: "IP header with addresses" },
              { ar: "Packet", en: "Packet" },
            ],
            [
              { ar: "الوصل (2)", en: "Data link (2)" },
              { ar: "ترويسة إيثرنت + ذيل FCS", en: "Ethernet header + FCS trailer" },
              { ar: "Frame", en: "Frame" },
            ],
            [
              { ar: "الفيزيائية (1)", en: "Physical (1)" },
              { ar: "تحويل إلى إشارات على الوسيط", en: "Conversion to signals on the medium" },
              { ar: "Bits", en: "Bits" },
            ],
          ],
        },
        body: {
          ar: "وحدة بيانات البروتوكول (PDU: Protocol Data Unit) هي الاسم الرسمي لما تحمله كل طبقة. هذا الجدول يُسأل عنه في كل اختبار من CCNA إلى المقابلات:\n\n- الطبقة 7-5: Data (بيانات)\n- الطبقة 4: Segment (قطعة) — في TCP تحديداً؛ مع UDP يسميها كثيرون Datagram\n- الطبقة 3: Packet (رزمة)\n- الطبقة 2: Frame (إطار)\n- الطبقة 1: Bits (بتات)\n\nالخلط الشائع القاتل: قول (إطار IP) أو (رزمة Ethernet). الصحيح: IP يصنع الرزم، وEthernet يصنع الإطارات. إذا رأيت عنوان MAC حولها فأنت أمام إطار؛ إذا رأيت عنوان IP حولها فأنت أمام رزمة.\n\nقاعدة لسان سريعة: الطبقات الأربع العليا تعمل بالـ Ports، والوسطى بالـ IP، والسفلى بالـ MAC — وهذا شكل هرم المسؤوليات كله.",
          en: "The Protocol Data Unit (PDU) is the official name for what each layer carries. This table is asked in every exam from CCNA to interviews:\n\n- Layers 7-5: Data\n- Layer 4: Segment — specifically in TCP; with UDP many call it a Datagram\n- Layer 3: Packet\n- Layer 2: Frame\n- Layer 1: Bits\n\nThe killer common mix-up: saying (IP frame) or (Ethernet packet). Correct: IP builds packets, Ethernet builds frames. If you see a MAC address around it, you face a frame; an IP address around it, you face a packet.\n\nA quick tongue rule: the upper four layers work with Ports, the middle with IP, the bottom with MAC — the whole pyramid of responsibility in one line.",
        },
      },
      {
        heading: { ar: "MTU: حدود الصندوق الكبير", en: "MTU: The Big Box Limit" },
        tip: {
          ar: "MTU الإيثرنت القياسي 1500 بايت. إذا لاحظت مواقع تفتح وping ينجح لكن التحميل يعلق فابحث عن مشكلة MTU أو ICMP المحجوب في منتصف المسار.",
          en: "Standard Ethernet MTU is 1500 bytes. If sites open and ping works but transfers hang, suspect an MTU black hole or ICMP being filtered mid-path.",
        },
        body: {
          ar: "لكل وصلة حد أقصى لحجم ما تحمله من بيانات المستخدم يسمى MTU (Maximum Transmission Unit). في الإيثرنت القياسي: 1500 بايت للحمولة.\n\nإذا سلمت الطبقة 4 للطبقة 3 قطعة أكبر من MTU الوصلة القادمة، فإن IPv4 يجزئها (Fragmentation) إلى رزم أصغر تُجمع مجدداً عند الوجهة — عملية مكلفة تستحق التجنب.\n\nحيلة عملية لتقدير MTU مسار كامل من ويندوز: أرسل ping بحجم محدد ومنع التجزئة؛ إن نجح فالمسار يحتمله:\n\n- ping -f -l 1472 8.8.8.8 : يرسل 1472 بايت بيانات + 28 بايت (20 IP + 8 ICMP) = 1500 بالضبط\n- فشل الرسالة (Packet needs to be fragmented) يعني وجود وصلة أضيق في المسار",
          en: "Every link has a maximum payload size called MTU (Maximum Transmission Unit). In standard Ethernet: 1500 bytes of payload.\n\nIf layer 4 hands layer 3 a segment larger than the next link MTU, IPv4 fragments it into smaller packets reassembled at the destination — a costly process worth avoiding.\n\nA practical trick to probe the whole path MTU from Windows: send a ping with a set size and forbid fragmentation; if it succeeds, the path accommodates it:\n\n- ping -f -l 1472 8.8.8.8 : sends 1472 data bytes + 28 bytes (20 IP + 8 ICMP) = exactly 1500\n- A (Packet needs to be fragmented) failure means a narrower link exists somewhere along the path",
        },
        code: {
          lang: "bash",
          snippet: "# لينكس: نفس الاختبار — منع التجزئة بحجم بيانات 1472\nping -M do -s 1472 -c 3 8.8.8.8\n\n# عرض الإطارات مع ترويسات كل الطبقات دفعة واحدة\nsudo tcpdump -i eth0 -e -c 4 host 8.8.8.8",
        },
      },
    ],
    keyPoints: [
      { ar: "التغليف: كل طبقة تعامل مخرجات من فوقها كحمولة وتضيف ترويستها، وL2 تضيف ذيلاً أيضاً", en: "Encapsulation: each layer treats the upper output as payload and adds its header; L2 adds a trailer too" },
      { ar: "سلسلة PDU: Data ثم Segment ثم Packet ثم Frame ثم Bits", en: "The PDU chain: Data, Segment, Packet, Frame, Bits" },
      { ar: "أحجام أساسية: TCP 20 و IP 20 و Ethernet 14 + FCS 4 بايت", en: "Base sizes: TCP 20, IP 20, Ethernet 14 + FCS 4 bytes" },
      { ar: "عناوين IP تبقى ثابتة طوال الرحلة بينما عناوين MAC تتبدل كل قفزة", en: "IP addresses stay fixed the whole journey while MAC addresses change every hop" },
      { ar: "MTU الإيثرنت القياسي 1500 بايت، وping بمنع التجزئة يقيس مسار MTU عملياً", en: "Standard Ethernet MTU is 1500 bytes; a do-not-fragment ping measures path MTU in practice" },
    ],
    commands: [
      { cmd: "ping -f -l 1472 8.8.8.8", desc: { ar: "ويندوز: اختبار امتلاك المسار لـ MTU بحجم 1500 بايت بالضبط", en: "Windows: probe whether the path carries an exact 1500-byte MTU" } },
      { cmd: "ping -M do -s 1472 -c 3 8.8.8.8", desc: { ar: "لينكس: الاختبار المكافئ بمنع التجزئة", en: "Linux: the equivalent test with fragmentation forbidden" } },
      { cmd: "sudo tcpdump -i eth0 -e -c 4", desc: { ar: "مشاهدة ترويسة Ethernet لكل إطار يمر على بطاقتك", en: "Watch the Ethernet header of frames crossing your NIC" } },
    ],
    quiz: [
      {
        q: { ar: "ما الترتيب الصحيح لإضافة الترويسات في التغليف؟", en: "What is the correct order of header addition during encapsulation?" },
        options: [
          { ar: "Ethernet ثم IP ثم TCP", en: "Ethernet, then IP, then TCP" },
          { ar: "TCP ثم IP ثم Ethernet", en: "TCP, then IP, then Ethernet" },
          { ar: "IP ثم TCP ثم Ethernet", en: "IP, then TCP, then Ethernet" },
          { ar: "TCP ثم Ethernet ثم IP", en: "TCP, then Ethernet, then IP" },
        ],
        correct: 1,
        explain: { ar: "النزول من الأعلى للأسفل: قطعة TCP تُغلَّف برزمة IP ثم بإطار Ethernet — والعكس عند الفك.", en: "Descending top to bottom: a TCP segment is wrapped into an IP packet then an Ethernet frame — reversed when decapsulating." },
      },
      {
        q: { ar: "الوحدة الصحيحة لتسمية ما يحمله بروتوكول IP هي:", en: "The correct PDU name for what IP carries is:" },
        options: [
          { ar: "إطار Frame", en: "Frame" },
          { ar: "قطعة Segment", en: "Segment" },
          { ar: "رزمة Packet", en: "Packet" },
          { ar: "بت Bits", en: "Bits" },
        ],
        correct: 2,
        explain: { ar: "TCP/UDP يصنعان القطع، IP يصنع الرزم، وEthernet يصنع الإطارات — خلط المصطلحين أشهر أخطاء المبتدئين.", en: "TCP/UDP build segments, IP builds packets, Ethernet builds frames — mixing these is the most common beginner error." },
      },
      {
        q: { ar: "أي زوج من العناوين يبقى ثابتاً من المصدر حتى الوجهة النهائية؟", en: "Which pair of addresses remains fixed from source to final destination?" },
        options: [
          { ar: "عناوين MAC", en: "MAC addresses" },
          { ar: "عناوين IP", en: "IP addresses" },
          { ar: "أرقام المنافذ فقط عند العميل", en: "Client port numbers only" },
          { ar: "لا شيء يثبت", en: "Nothing stays fixed" },
        ],
        correct: 1,
        explain: { ar: "IP المصدر والوجهة يرافقان الرزمة حتى نهايتها؛ أما MAC فيُعاد كتابته عند كل قفزة لأنه عنوان وصلة محلية.", en: "Source and destination IP accompany the packet to the very end; MAC gets rewritten every hop since it is a local link address." },
      },
      {
        q: { ar: "رسالة ping بحجم بيانات 1472 بايت ومنع التجزئة اختبرت ماذا؟", en: "A ping with 1472 data bytes and no fragmentation tested what?" },
        options: [
          { ar: "سرعة التنزيل", en: "Download speed" },
          { ar: "زمن الاستجابة فقط", en: "Latency only" },
          { ar: "أن المسار يحتمل MTU بقيمة 1500 بايت", en: "That the path supports a 1500-byte MTU" },
          { ar: "عدد القفزات", en: "The hop count" },
        ],
        correct: 2,
        explain: { ar: "1472 بيانات + 20 (IP) + 8 (ICMP) = 1500 بالضبط؛ فشلها يعني أن رزمة بحجم MTU القياسي لا تمر بلا تجزئة.", en: "1472 data + 20 (IP) + 8 (ICMP) = exactly 1500; its failure means a standard-MTU packet cannot pass without fragmentation." },
      },
    ],
  },
  {
    id: "l016",
    moduleId: "m02",
    order: 6,
    level: "beginner",
    title: { ar: "فك التغليف: تشريح وصول الحزمة", en: "Decapsulation: Anatomy of an Arriving Packet" },
    summary: {
      ar: "ماذا يحدث داخل بطاقة الشبكة والمكدس عندما يصلك إطار؟ فحوص كل طبقة ومصير الفاسد منها.",
      en: "What happens inside the NIC and the stack when a frame arrives? Each layer's checks and the fate of corrupted data.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "الاستقبال: صعود البصلة", en: "Reception: Climbing the Onion" },
        diagram: {
          kind: "flow",
          title: { ar: "فك التغليف عند المستقبِل طبقة بعد طبقة", en: "Decapsulation at the receiver, layer by layer" },
          items: [
            { ar: "الوصل: فحص FCS ورفض الفاسد ثم نزع ترويسة الإيثرنت", en: "Link: check FCS, drop corrupt frames, strip the Ethernet header" },
            { ar: "الشبكة: قراءة IP والتأكد أن الحزمة لي", en: "Network: read the IP address and confirm the packet is mine" },
            { ar: "النقل: المنافذ تحدد التطبيق صاحب البيانات", en: "Transport: the ports identify which app owns the payload" },
            { ar: "الطبقات العليا: فك الترميز والتشفير حتى تظهر البيانات", en: "Upper layers: decode and decrypt until the data appears" },
          ],
        },
        body: {
          ar: "كل ما تغلف في الدرس السابق يُفك الآن بترتيب معاكس دقيق. عند وصول الإشارات إلى بطاقة الشبكة (NIC):\n\n- الطبقة 1 تلتقط الإشارات وتحوّلها بتات، وتتحقق من التزامن مع مقدمة الإطار (Preamble)\n- الطبقة 2 تجمع البتات إطاراً؛ تفحص عنوان MAC الوجهة: هل هو أنا؟ هل هو بث عام؟ إن لا — فاسده من فوره بصمت\n- تحسب CRC وتقارن بحقل FCS في الذيل: أي اختلاف يعني إطاراً فاسداً فيُرمى كذلك بصمت\n- الطبقة 3 تقرأ عنوان IP: لي أنا؟ ثم تنقص TTL وتفحص ترويسة IPv4، وتسلّم لبروتوكول الطبقة العليا المذكور في حقل Protocol\n- الطبقة 4 يطابق رقم المنفذ مع جدول المنافذ المفتوحة فيسلم البيانات للعملية صاحبة المقبس\n- الطبقات العليا تفك التشفير والضغط والصيغ وصولاً للنص الذي يعرضه المتصفح\n\nاللافت للنظر: طبقة النقل عند المرسل مالت رأسها شحاً من كثرة الأعباء، وعند المستقبل تكلفت كل هذه الفحوص بصمت تام — لا إعلانات ولا أخطاء وسيطة.",
          en: "Everything wrapped in the previous lesson now unwinds in a precise reverse order. When signals reach the NIC:\n\n- Layer 1 captures the signals, converts them to bits, and synchronizes using the frame preamble\n- Layer 2 assembles bits into a frame; checks the destination MAC: is it me? is it broadcast? If neither — discard instantly and silently\n- It computes CRC and compares with the FCS trailer: any mismatch means a corrupt frame, dropped equally silently\n- Layer 3 reads the IP address: mine? then decrements TTL, verifies the IPv4 header, and hands up to the protocol named in the Protocol field\n- Layer 4 matches the port number against the table of open ports and delivers data to the process owning that socket\n- Upper layers unwrap encryption, compression, and formats down to the text your browser renders\n\nThe striking part: the layers performed all these checks in total silence — no announcements, no intermediate errors.",
        },
      },
      {
        heading: { ar: "مصير الفاسد: الصمت المقدس", en: "The Fate of the Corrupt: Sacred Silence" },
        body: {
          ar: "قاعدة تحتاج أن تسكنها ثقافتك الشبكية: في طبقتي الوصل والشبكة، الفحص الفاشل لا يولد رسالة شكوى — بل رمياً صامتاً (Silent Drop).\n\n- إطار بـ FCS فاسد؟ المبدل يرميه. النهاية.\n- رزمة IP ترويستها تالفة (فحص checksum في IPv4)؟ الموجّه يرميها. النهاية.\n- TTL بلغ الصفر؟ يُرمى — لكن هنا استثناء وحيد: رسالة ICMP تُعاد للمصدر (Time Exceeded) وهي أساس عمل traceroute\n\nمن يملك حق الشكوى إذاً؟ بروتوكولات الطبقات العليا: TCP يفتقد القطعة رقم N فلا تأتي تأكيدها فيعيد إرسالها؛ التطبيق يفشل في الطلب فيعرض للمستخدم خطأ. هذه القسمة (الصمت في الأسفل والذكاء في الأعلى) هي فلسفة TCP/IP نفسها.\n\nلهذا نصف الإيثرنت بأنه (يفسد بصمت) وTCP بأنه (يشكو بلباقة) — الصورة التي سترافقك في كل تشخيص مستقبلي: عدم وجود أخطاء لا يعني دوماً عدم وجود مشاكل!",
          en: "A rule that must settle into your network culture: at the data link and network layers, a failed check generates no complaint message — only a silent drop.\n\n- A frame with a bad FCS? The switch drops it. The end.\n- A packet with a damaged header (the IPv4 checksum)? The router drops it. The end.\n- TTL hit zero? Dropped — with one sole exception: an ICMP message returns to the source (Time Exceeded), the basis of traceroute\n\nSo who holds the right to complain? Upper layer protocols: TCP notices segment N never got acknowledged and retransmits it; the application fails the request and shows the user an error. This division (silence below, intelligence above) is the very philosophy of TCP/IP.\n\nThat is why we describe Ethernet as (corrupting silently) and TCP as (complaining politely) — an image that will accompany every future diagnosis: the absence of errors does not always mean the absence of problems!",
        },
      },
      {
        heading: { ar: "وهم الحوار المتناظر يكتمل", en: "The Peer-Dialog Illusion Completed" },
        body: {
          ar: "ها هو السر يكتمل: طبقة TCP عند الخادم تتعامل مع ترويسة كتبها TCP عند عميلك وكأنهما تشاريا مكتباً واحداً. وكذلك IP وEthernet في كل جهاز على المسار.\n\nكل طبقة عند الاستلام تتصرف كما لو أن نظيرها البعيد سلّمها الصندوق مباشرة:\n\n- لا تعلم أن الرزمة مرّت بعشرة موجهات انقصت TTL فيها وبدلت إطاراتها\n- لا يعرف TCP كم مرة أُعيد إرسال قطعته أو أي منفذ مؤقت فتحه العميل\n\nهذا التجريد ليس حيلة تعليمية فقط؛ إنه ما يسمح لمصمم بروتوكول أن يعمل بمعزل عن قلق الوسائط والقفزات. بروتوكول واحد مثل HTTP يخدم مليار جهاز على وسائط لا حصر لها لأنه لا يرى إلا نظيره.",
          en: "Here the secret completes: the TCP layer at the server handles a header written by TCP on your client as if the two shared one desk. Same for IP and Ethernet on every device along the path.\n\nEach receiving layer behaves as if its remote peer handed it the box directly:\n\n- It does not know the packet passed ten routers that decremented TTL and swapped its frames\n- TCP does not know how many times its segment was retransmitted or which ephemeral port the client opened\n\nThis abstraction is not just a teaching trick; it is what lets a protocol designer work insulated from media and hop worries. A single protocol like HTTP serves a billion devices over countless media because it sees only its peer.",
        },
      },
      {
        heading: { ar: "قصة عودة: من الخادم إلى عينك", en: "The Return Story: From Server to Your Eyes" },
        body: {
          ar: "لنجعل الحقيقة فيلم قصير. طلب HTTP خرج من متصفحك ووصل خادماً في مدينة أخرى؛ ماذا في جواب العودة؟\n\n- الخادم يبني استجابة HTML (بيانات) ويغلفها TCP (قطعة) ثم IP (رزمة) ثم Ethernet (إطار) — بالأرقام نفسها التي حفظتها\n- عند كل قفزة عودة تُفك الإطارات وتُعاد كتابتها، بينما عنواني IP يظلان: الخادم مصدراً وجهازك وجهاً\n- بطاقتك تستلم الإطار، تفحص MAC وFCS، تصعد الرزمة إلى مكدسك، تنقص TTL (وصلت غالباً بقيمة قليلة متبقية)\n- TCP يجمع القطع بالترتيب ويسلم المتصفح دفعة كاملة؛ العرض (فك الترميز والصيغ) يجعل النص مقروءاً؛ والتطبيقات تعرض الصفحة\n\nومرحلة أخيرة تجنّبك ضياعاً: افتح أي التقاط حزم في Wireshark وانقر أي حزمة — سترى بشجرة التفاصيل البصلة تنفتح طبقة فوق طبقة أمام عينيك. لا توجد أداة تعلم هذا الدرس أعمق من هذه التجربة.",
          en: "Let us make the truth a short film. An HTTP request left your browser and reached a server in another city; what happens in the return answer?\n\n- The server builds an HTML response (data) and wraps it TCP (segment), then IP (packet), then Ethernet (frame) — with the same numbers you memorized\n- At every return hop frames are unwrapped and rewritten, while the IP addresses stay: server as source, your device as destination\n- Your NIC receives the frame, checks MAC and FCS, the packet climbs your stack, TTL already low from the journey\n- TCP reassembles segments in order and hands the browser a complete stream; presentation decodes encodings and formats into readable text; the application renders the page\n\nA final tip to save you from getting lost: open any packet capture in Wireshark and click any packet — the detail tree shows the onion unfolding layer by layer before your eyes. No tool teaches this lesson deeper than that experience.",
        },
        tip: {
          ar: "أمر tcpdump مع -XX يطبع كل بايتات الإطار مع تفسير الطبقات — مختبر تشريح مجاني في طرفيتك دون أي واجهة رسومية.",
          en: "The tcpdump -XX flag prints every frame byte with layer interpretation — a free anatomy lab in your terminal with no GUI needed.",
        },
      },
    ],
    keyPoints: [
      { ar: "الفك يحدث بالترتيب العكسي: فحص MAC وFCS عند L2 ثم IP وTTL عند L3 ثم المنفذ عند L4", en: "Decapsulation runs in reverse: MAC and FCS at L2, then IP and TTL at L3, then the port at L4" },
      { ar: "الإطار الفاسد والرزمة التالفة تُرميان بصمت — الشكوى مسؤولية الطبقات العليا", en: "Corrupt frames and damaged packets are silently dropped — complaining is the upper layers' job" },
      { ar: "استثناء الصمت: نفاد TTL يولد رسالة ICMP (Time Exceeded) وهي أساس traceroute", en: "The silence exception: TTL exhaustion births an ICMP Time Exceeded message, the basis of traceroute" },
      { ar: "كل طبقة تتعامل مع ترويسة نظيرتها البعيد وكأن التسليم كان مباشراً", en: "Each layer handles its remote peer's header as if delivery were direct" },
      { ar: "Wireshark وtcpdump -XX يجعلان الفك مرئياً طبقة فوق طبقة", en: "Wireshark and tcpdump -XX make decapsulation visible layer by layer" },
    ],
    commands: [
      { cmd: "sudo tcpdump -i eth0 -XX -c 2", desc: { ar: "طباعة كل بايتات الإطارين القادمين مع تفسير ترويسات الطبقات", en: "Print every byte of two incoming frames with layer header interpretation" } },
      { cmd: "ping -t 5 8.8.8.8", desc: { ar: "ويندوز: أرسل رزم TTL صغيرة وشاهد أي قفزة ترفضها برسالة Time Exceeded", en: "Windows: send low-TTL packets and watch which hop rejects them with Time Exceeded" } },
      { cmd: "traceroute 8.8.8.8", desc: { ar: "لينكس: رسم المسار كاملاً بالاستفادة من رسائل فك التغليف", en: "Linux: map the full path by exploiting decapsulation messages" } },
    ],
    quiz: [
      {
        q: { ar: "وصل إطار إلى بطاقة شبكة وعنوان MAC الوجهة ليس لها ولا هو بث عام — ماذا يحدث؟", en: "A frame arrives at a NIC whose destination MAC is neither its own nor broadcast — what happens?" },
        options: [
          { ar: "تُرسل رسالة خطأ للمصدر", en: "An error message is sent to the source" },
          { ar: "يُمرر إلى كل المنافذ", en: "It is flooded to all ports" },
          { ar: "يُتجاهل بصمت", en: "It is silently ignored" },
          { ar: "تُعاد كتابته بعنوان جديد", en: "It gets rewritten with a new address" },
        ],
        correct: 2,
        explain: { ar: "البطاقة تتجاهله فوراً بلا أي إشعار — فلسفة الصمت في الطبقات الدنيا.", en: "The NIC ignores it immediately with no notification — the lower-layer silence philosophy." },
      },
      {
        q: { ar: "من يكتشف قطعة TCP ضائعة ويعيد إرسالها؟", en: "Who detects a lost TCP segment and retransmits it?" },
        options: [
          { ar: "المبدل", en: "The switch" },
          { ar: "الموجّه", en: "The router" },
          { ar: "بطاقة الشبكة", en: "The network card" },
          { ar: "بروتوكول TCP عند المرسل عبر غياب التأكيد", en: "The sender's TCP via missing acknowledgment" },
        ],
        correct: 3,
        explain: { ar: "القفزات الوسيطة ترمي بصمت؛ TCP المرسل يفتقد التأكيد (ACK) فيعيد القطعة — الذكاء في الأعلى.", en: "Intermediate hops drop silently; the sending TCP misses the ACK and retransmits — intelligence on top." },
      },
      {
        q: { ar: "ما الاستثناء الوحيد تقريباً لرمي الرزم بصمت في IPv4؟", en: "What is nearly the only exception to silent packet drops in IPv4?" },
        options: [
          { ar: "رسالة ICMP عند نفاد TTL", en: "An ICMP message when TTL expires" },
          { ar: "إعادة إرسال فورية من الموجّه", en: "Immediate router retransmission" },
          { ar: "تحويل الرزمة إلى بث عام", en: "Converting the packet to broadcast" },
          { ar: "لا استثناء إطلاقاً", en: "There are no exceptions at all" },
        ],
        correct: 0,
        explain: { ar: "عند TTL = 0 يرمي الموجّه الرزمة ويرسل ICMP Time Exceeded للمصدر — الآلية التي تحولها traceroute لخريطة قفزات.", en: "At TTL = 0 the router drops the packet and sends ICMP Time Exceeded — the mechanism traceroute turns into a hop map." },
      },
      {
        q: { ar: "أثناء رحلة الذهاب والعودة، أي حقول بقيت دون أي تعديل؟", en: "During the round trip, which fields stayed completely untouched?" },
        options: [
          { ar: "عناوين MAC في الإطارات", en: "The MAC addresses in frames" },
          { ar: "TTL في ترويسة IP", en: "The TTL in the IP header" },
          { ar: "عناوين IP المصدر والوجهة وحمولة TCP", en: "Source/destination IP addresses and the TCP payload" },
          { ar: "FCS في كل إطار", en: "The FCS in every frame" },
        ],
        correct: 2,
        explain: { ar: "الـ IP والمنافذ وحمولة TCP هي هوية الرحلة الثابتة؛ MAC وFCS يتجددان كل قفزة وTTL يتناقص.", en: "IP, ports, and the TCP payload are the journey's fixed identity; MAC and FCS renew each hop while TTL decrements." },
      },
    ],
  },
  {
    id: "l017",
    moduleId: "m02",
    order: 7,
    level: "beginner",
    title: { ar: "نموذجا OSI و TCP/IP: القصة والمقارنة", en: "OSI vs TCP/IP: The Story and the Comparison" },
    summary: {
      ar: "نموذجان تتنافسان على لقب مرجع الشبكات: أحدهما رُسم على الورق ثم طُبّق جزئياً، والآخر طُبّق ثم رُسم على الورق.",
      en: "Two models compete for the networking reference title: one drawn on paper then partly implemented, the other implemented then drawn on paper.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "قصة نموذجين متعاكسين", en: "A Tale of Two Opposite Models" },
        diagram: {
          kind: "layers",
          title: { ar: "نموذج TCP/IP العملي بأربع طبقات", en: "The practical four-layer TCP/IP model" },
          items: [
            { ar: "التطبيقات Application — HTTP و DNS و SMTP", en: "Application — HTTP, DNS, SMTP" },
            { ar: "النقل Transport — TCP و UDP", en: "Transport — TCP and UDP" },
            { ar: "الإنترنت Internet — IP و ICMP", en: "Internet — IP and ICMP" },
            { ar: "الوصلة Network Access — الإيثرنت و Wi-Fi", en: "Network Access — Ethernet and Wi-Fi" },
          ],
        },
        body: {
          ar: "TCP/IP وُلد في الميدان قبل أن يولد في المراجع. في سبعينيات القرن الماضي، مُوّل من وزارة الدفاع الأمريكية (نموذج DoD) لبناء ARPANET؛ وفي 1974 نشر فينت سيرف وبوب خان ورقتهما التأسيسية. التجربة العملية أولاً، ثم استُخلص النموذج النظري لاحقاً من الشيء الذي يعمل فعلاً.\n\nOSI جاء بالاتجاه المعاكس تماماً: لجنة ISO رسمت بين 1977 و1984 نموذجاً مثالياً كاملاً (سبع طبقات، بروتوكولات مرافقة)، ثم دُعي العالم لتطبيقه. بعض بروتوكولات OSI طُبقت فعلاً (X.400 للبريد و X.500 للدليل — جد LDAP) لكن الموجة الكاسرة لم تصل قط.\n\nالسبب الحاسم في انتصار TCP/IP: حين احتاجت الجامعات والحكومات ربطاً جاهزاً رخيصاً، كانت حزمة TCP/IP قد صارت مفتوحة ومجانية ومجرَّبة على ARPANET الذي صار الإنترنت — فانضم الجميع إلى ما يعمل.",
          en: "TCP/IP was born in the field before being born in textbooks. In the 1970s it was funded by the US Department of Defense (the DoD model) to build ARPANET; in 1974 Vint Cerf and Bob Kahn published their foundational paper. Practice first, then the theoretical model was distilled from what actually works.\n\nOSI came from the opposite direction: an ISO committee drew an ideal complete model between 1977 and 1984 (seven layers plus companion protocols), then invited the world to implement it. Some OSI protocols did ship (X.400 mail, X.500 directory — the ancestor of LDAP) but the sweeping wave never arrived.\n\nThe decisive reason for TCP/IP's victory: when universities and governments needed ready cheap interconnection, the TCP/IP suite was already open, free, and battle-tested on ARPANET — which became the Internet — so everyone joined what works.",
        },
      },
      {
        heading: { ar: "المقارنة الطبقية وجهاً لوجه", en: "Layer-by-Layer Face-off" },
        table: {
          caption: { ar: "OSI مقابل TCP/IP: الفروقات الجوهرية", en: "OSI vs TCP/IP: the essential differences" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "OSI", en: "OSI" },
            { ar: "TCP/IP", en: "TCP/IP" },
          ],
          rows: [
            [
              { ar: "عدد الطبقات", en: "Number of layers" },
              { ar: "7", en: "7" },
              { ar: "4 (وأحياناً 5)", en: "4 (sometimes 5)" },
            ],
            [
              { ar: "الطابع", en: "Nature" },
              { ar: "نظري مرجعي للفهم", en: "Theoretical reference for understanding" },
              { ar: "عملي — هو ما يشغّل الإنترنت", en: "Practical — it runs the Internet" },
            ],
            [
              { ar: "الجلسة والعرض", en: "Session & presentation" },
              { ar: "طبقتان مستقلتان", en: "Two separate layers" },
              { ar: "مدمجتان ضمن التطبيقات", en: "Merged into the application layer" },
            ],
            [
              { ar: "الوصل والفيزيائية", en: "Data link & physical" },
              { ar: "طبقتان منفصلتان", en: "Two separate layers" },
              { ar: "مدمجتان في الوصلة", en: "Merged into network access" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best use" },
              { ar: "التعليم والتشخيص والنقاش", en: "Teaching, troubleshooting, discussion" },
              { ar: "التصميم والتشغيل الفعلي", en: "Actual design and operations" },
            ],
          ],
        },
        body: {
          ar: "TCP/IP الكلاسيكي من أربع طبقات، وإليك خريطة التطابق مع OSI:\n\n- Application (تطبيقات): تبتلع طبقات OSI الثلاث العليا 5 + 6 + 7\n- Transport (نقل): توازي OSI 4 — TCP و UDP هنا كما هما\n- Internet (إنترنت): توازي OSI 3 — IP و ICMP هنا\n- Network Access / Link (الوصول للشبكة): تبتلع OSI 1 + 2 — الإيثرنت و Wi-Fi هنا\n\nفي الطرف الآخر يتخذ كثير من المدرسين والكتب نموذجاً هجيناً بخمس طبقات: نفس TCP/IP لكن مع فصل L1 عن L2 — الأسهل رسماً وشرحاً وأقرب لما تراه في أوامر التشخيص اليومية.\n\n- الخلاصة العملية: OSI = 7 طبقات مرجعية تعليمية؛ TCP/IP = 4 طبقات هي بنية الإنترنت الفعلية؛ والهجين 5 طبقات = أداة التدريس المفضلة",
          en: "Classic TCP/IP has four layers, and here is the mapping onto OSI:\n\n- Application: absorbs OSI's three upper layers 5 + 6 + 7\n- Transport: parallels OSI 4 — TCP and UDP live here as they are\n- Internet: parallels OSI 3 — IP and ICMP live here\n- Network Access / Link: absorbs OSI 1 + 2 — Ethernet and Wi-Fi live here\n\nOn the other side, many instructors and books adopt a five-layer hybrid: same as TCP/IP but splitting L1 from L2 — easiest to draw, to explain, and closest to what daily diagnostic commands show.\n\n- Practical summary: OSI = a 7-layer educational reference; TCP/IP = the 4-layer actual Internet architecture; the 5-layer hybrid = the preferred teaching tool",
        },
      },
      {
        heading: { ar: "من المنظور الوظيفي: أين تتطابق وأين تفترق", en: "Functional View: Where They Match and Diverge" },
        body: {
          ar: "من حيث الوظائف، النموذجان يقولان الشيء نفسه تقريباً بلغتين مختلفتي التفصيل:\n\n- التشابه: كلاهما يفصل بين (تسليم عملية-لعملية) و(توجيه بين الشبكات) و(نقل على وصلة واحدة) و(إشارات فيزيائية) — جوهر التقسيم واحد\n- الاختلاف الأبرز: OSI يخصص طبقتين مستقلتين للجلسة والعرض؛ TCP/IP يراهما تفاصيل تنفذها بروتوكولات التطبيقات حسب حاجتها\n- OSI يميز بوضوح بين الخدمة (Service) والواجهة (Interface) والبروتوكول (Protocol) — تمييز أكاديمي نفيس\n- TCP/IP لا يحدد بصرامة ما يحدث داخل طبقة الوصول — وهذا تحديداً ما جعله يبتلع كل وسائط المستقبل (واي فاي، خلوي، بلوتوث) بلا تعديل\n\nدرس بليغ من هذه المقارنة: التفوق الهندسي ليس للأكمل على الورق بل للأبسط قابلاً للتطبيق. ستقابل هذا القانون مرات لا تحصى في حياتك التقنية.",
          en: "Functionally, both models say nearly the same thing in two dialects of detail:\n\n- Similarity: both separate (process-to-process delivery), (inter-network routing), (single-link transport), and (physical signals) — the division's essence is one\n- Clearest divergence: OSI dedicates two standalone layers to session and presentation; TCP/IP sees them as details application protocols implement as needed\n- OSI crisply distinguishes service, interface, and protocol — a precious academic distinction\n- TCP/IP does not strictly define what happens inside its access layer — exactly what let it swallow every future medium (Wi-Fi, cellular, Bluetooth) without modification\n\nA telling lesson from this comparison: engineering victory does not go to the most complete on paper but to the simplest that ships. You will meet this law countless times in your technical life.",
        },
      },
      {
        heading: { ar: "أي نموذج أستخدم ومتى؟", en: "Which Model Do I Use, and When?" },
        body: {
          ar: "قاعدة مهنية ناجعة:\n\n- في الوصف العملي والتوثيق: استخدم TCP/IP — لأنه ما يعمل فعلاً؛ نقول (طبقة إنترنت) و(طبقة نقل) في التقارير\n- في التشخيص والتحليل: استخدم لغة OSI — لأن تعدد طبقاتها يعطي دقة أعلى في وصف مكان الخلل: (سليمة في 1 و2، فاشلة عند 3)\n- في التعليم والامتحانات: كلاهما معاً — الامتحانات تسأل المقارنة حرفياً، والمقابلات تحب سؤال الفرق\n- في مراسلات الشهادات: CCNA مثلاً يعتمد التسمية العملية لكن يقيس مفاهيم OSI بدقة\n\nمفارقة تاريخية لطيفة تستحق أن ترويها في أول مقابلة عمل لك: OSI خسر معركة التطبيق وفاز بحرب اللغة — العالم كله يبني شبكات TCP/IP لكنه يتخاطب بترقيم OSI.",
          en: "A productive professional rule:\n\n- For practical description and documentation: use TCP/IP — it is what actually runs; reports say (internet layer) and (transport layer)\n- For troubleshooting and analysis: use OSI language — its many layers give higher precision locating faults: (healthy at 1 and 2, failing at 3)\n- For education and exams: both together — exams literally ask the comparison, and interviews love the difference question\n- In certification correspondence: CCNA, for instance, uses practical naming but rigorously measures OSI concepts\n\nA delightful historical irony worth telling in your first job interview: OSI lost the implementation battle and won the language war — the whole world builds TCP/IP networks but converses using OSI numbering.",
        },
        tip: {
          ar: "احفظ جملة القص للامتحان: TCP/IP يجمع 5-7 في طبقة التطبيقات، ويجمع 1-2 في طبقة الوصول، ويطابق OSI في النقل (4) والإنترنت (3).",
          en: "Memorize the exam one-liner: TCP/IP merges OSI 5-7 into the application layer and 1-2 into the access layer, matching OSI at transport (4) and internet (3).",
        },
      },
    ],
    keyPoints: [
      { ar: "TCP/IP وُلد عملياً من ARPANET (ورقة 1974) ثم استخلص نظرياً؛ OSI رُسم نظرياً (ISO 1984) ثم طُبق جزئياً", en: "TCP/IP was born practically from ARPANET (1974 paper) then theorized; OSI was drawn theoretically (ISO 1984) then partly implemented" },
      { ar: "خريطة التطابق: التطبيقات=5-7، النقل=4، الإنترنت=3، الوصول=1-2", en: "The mapping: Application=5-7, Transport=4, Internet=3, Access=1-2" },
      { ar: "النموذج الهجين بخمس طبقات هو المفضل تعليمياً وأقرب للتشخيص اليومي", en: "The five-layer hybrid is the teaching favorite and closest to daily diagnostics" },
      { ar: "TCP/IP لم يعرّف بدقة طبقة الوصول — وهذا سر قدرته على ابتلاع كل الوسائط الجديدة", en: "TCP/IP loosely defined its access layer — the secret of its ability to swallow every new medium" },
      { ar: "الاستخدام المهني: TCP/IP للتوثيق، وOSI للغة التشخيص — والامتحانات تقيس كليهما", en: "Professional usage: TCP/IP for documentation, OSI for diagnostic language — exams measure both" },
    ],
    commands: [
      { cmd: "show ip interface brief", desc: { ar: "على Cisco: نظرة على الطبقة 3 (عناوين IP وحالة البروتوكول) لكل واجهة", en: "On Cisco: a layer-3 view (IP addresses and protocol state) of all interfaces" } },
      { cmd: "ss -s", desc: { ar: "لينكس: ملخص إحصاءات طبقة النقل — مقابس واتصالات قائمة الآن", en: "Linux: a transport-layer statistics summary — sockets and live connections" } },
      { cmd: "ip -s link show eth0", desc: { ar: "إحصاءات الوصلة (طبقة الوصول): أخطاء ومرسَل ومستقبَل", en: "Link-layer statistics: errors, sent, and received" } },
    ],
    quiz: [
      {
        q: { ar: "أي جملة تصف تسلسل الولادة بدقة؟", en: "Which sentence describes the birth order correctly?" },
        options: [
          { ar: "OSI طُبق أولاً ثم رسم TCP/IP", en: "OSI was implemented first, then TCP/IP was drawn" },
          { ar: "TCP/IP عمل عملياً في السبعينيات ثم استخلص نظرياً، وOSI رسم نظرياً ثم طُبق جزئياً", en: "TCP/IP ran practically in the 70s then was theorized; OSI was drawn theoretically then partly implemented" },
          { ar: "النموذجان وُلدا معاً في ISO", en: "Both were born together at ISO" },
          { ar: "TCP/IP نظري تماماً لم يطبق قط", en: "TCP/IP is purely theoretical, never implemented" },
        ],
        correct: 1,
        explain: { ar: "TCP/IP ابن ARPANET العملي (ورقة سيرف وخان 1974)؛ OSI ابن لجنة ISO (1984) طُبق بعضه كـ X.400/X.500.", en: "TCP/IP is the practical child of ARPANET (the Cerf & Kahn 1974 paper); OSI is the ISO committee child (1984), partly implemented as X.400/X.500." },
      },
      {
        q: { ar: "طبقة النقل في OSI تقابل في TCP/IP:", en: "OSI's transport layer maps to which TCP/IP layer?" },
        options: [
          { ar: "طبقة التطبيقات", en: "The application layer" },
          { ar: "طبقة النقل نفسها (Transport)", en: "The transport layer itself" },
          { ar: "طبقة الوصول للشبكة", en: "The network access layer" },
          { ar: "طبقة الإنترنت", en: "The internet layer" },
        ],
        correct: 1,
        explain: { ar: "التطابق تام عند 4: TCP و UDP يسكنان طبقة النقل في النموذجين.", en: "The match is exact at layer 4: TCP and UDP inhabit the transport layer in both models." },
      },
      {
        q: { ar: "كم عدد طبقات النموذج الهجين المستخدم شائعاً في التعليم؟", en: "How many layers does the commonly used educational hybrid model have?" },
        options: [
          { ar: "4", en: "4" },
          { ar: "5", en: "5" },
          { ar: "6", en: "6" },
          { ar: "8", en: "8" },
        ],
        correct: 1,
        explain: { ar: "خمس طبقات: TCP/IP مع فصل الفيزيائية عن الوصل — أسهل رسماً وأوضح للتشخيص.", en: "Five layers: TCP/IP with Physical split from Data Link — easiest to draw and clearest for troubleshooting." },
      },
      {
        q: { ar: "ما السبب الأبرز لقدرة TCP/IP على استيعاب وسائط مستقبلية (واي فاي، خلوي)؟", en: "What most enabled TCP/IP to absorb future media (Wi-Fi, cellular)?" },
        options: [
          { ar: "طبقة وصول غير محددة بصرامة", en: "A loosely specified access layer" },
          { ar: "امتلاكه 7 طبقات", en: "Having 7 layers" },
          { ar: "بروتوكول جلسة مركزي", en: "A centralized session protocol" },
          { ar: "اعتماده على X.400", en: "Its reliance on X.400" },
        ],
        correct: 0,
        explain: { ar: "لأن TCP/IP لم يشترط كيفية الوصول للوسط؛ أي تقنية وصلة جديدة تعمل تحت طبقة الإنترنت مباشرة.", en: "Because TCP/IP never dictated how to access the medium; any new link technology plugs in beneath the internet layer." },
      },
    ],
  },
  {
    id: "l018",
    moduleId: "m02",
    order: 8,
    level: "beginner",
    title: { ar: "منهجية تشخيص الأعطال بالطبقات", en: "Layered Troubleshooting Methodology" },
    summary: {
      ar: "المنهجيات الثلاث المحترفة: من الأسفل للأعلى، من الأعلى للأسفل، والقسمة والتغلب — مع سيناريو واقعي كامل.",
      en: "The three professional methodologies: bottom-up, top-down, and divide-and-conquer — with a full real-world scenario.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "لماذا المنهجية أصلاً؟", en: "Why Methodology at All?" },
        body: {
          ar: "المبتدئ حين يواجه عطلاً يبدأ بالتخمين: يعيد تشغيل الموجّه! يغير DNS! يبدل الكابل! — أحياناً ينجح بسرعة، وغالباً يضيع ساعات في دوامة عشوائية.\n\nالمحترف يطبق منهجية (Methodology): مسار خطوات منظم يوفر شيئين ثمينين — الوقت واليقين. والمنهجية الطبقية هي الأشهر في الشبكات لأن نموذج الطبقات نفسه خريطة تشخيص جاهزة.\n\nإحصائية عملية يتداولها المهندسون: معظم الأعطال اليومية (الكابل، التوصيل، الإعدادات الأساسية) تسكن الطبقات الدنيا، بينما تأتي أعطال الطبقات العليا من الخدمات والبرمجيات. لهذا يبدأ المحترفون غالباً من الأسفل.",
          en: "A beginner facing a fault starts guessing: reboot the router! Change DNS! Swap the cable! — sometimes it works fast, but often it wastes hours in a random spiral.\n\nThe professional applies a methodology: an organized step path that saves two precious things — time and certainty. The layered methodology is the most famous in networking because the layer model itself is a ready diagnosis map.\n\nA statistic engineers trade: most daily faults (cables, connections, basic settings) live in the lower layers, while upper-layer faults come from services and software. That is why professionals usually start from the bottom.",
        },
      },
      {
        heading: { ar: "المنهجية 1: من الأسفل للأعلى (Bottom-Up)", en: "Method 1: Bottom-Up" },
        table: {
          caption: { ar: "خريطة التشخيص: الطبقة، الأعراض، الأدوات", en: "A troubleshooting map: layer, symptoms, tools" },
          headers: [
            { ar: "الطبقة", en: "Layer" },
            { ar: "أعراض شائعة", en: "Common symptoms" },
            { ar: "أدوات الفحص", en: "Check tools" },
          ],
          rows: [
            [
              { ar: "الفيزيائية L1", en: "Physical L1" },
              { ar: "لا إضاءة وصلة، كابل مفكوك، تلف", en: "No link light, loose or damaged cable" },
              { ar: "فاحص كابلات، ethtool، بدائل", en: "Cable tester, ethtool, spare cables" },
            ],
            [
              { ar: "الوصل L2", en: "Data link L2" },
              { ar: "MAC غير متعلم، VLAN خاطئة، أخطاء FCS", en: "MAC not learned, wrong VLAN, FCS errors" },
              { ar: "show mac address-table، show vlan", en: "show mac address-table, show vlan" },
            ],
            [
              { ar: "الشبكة L3", en: "Network L3" },
              { ar: "ping يفشل، مسار مفقود، لا بوابة", en: "Ping fails, missing route, no gateway" },
              { ar: "ping، traceroute، show ip route", en: "ping, traceroute, show ip route" },
            ],
            [
              { ar: "النقل L4", en: "Transport L4" },
              { ar: "المنفذ مقفل، الاتصال يُرفض", en: "Closed port, connection refused" },
              { ar: "ss -tlnp، telnet، nmap", en: "ss -tlnp, telnet, nmap" },
            ],
            [
              { ar: "التطبيقات L7", en: "Application L7" },
              { ar: "الخدمة ترد بأخطاء أو بطء", en: "Service replies with errors or slowness" },
              { ar: "curl -v، سجلات الخدمة", en: "curl -v, service logs" },
            ],
          ],
        },
        body: {
          ar: "تبدأ من الطبقة 1 وتصعد. المسار القياسي خطوة خطوة:\n\n- L1: هل ضوء الربط مضاء؟ الكابل موصول بالطرفين؟ جرب كبلاً بديلاً أو منفذاً آخر — حل 50% من الحالات هنا\n- L2: هل حالة المنفذ up/up؟ أخطاء CRC أو التصادمات المتأخرة (duplex mismatch)؟ هل VLAN صحيح؟\n- L3: هل للجهاز عنوان صحيح وقناع وبوابة؟ ping البوابة ثم ping عنوان خارجي\n- L4: هل المنفذ المطلوب مفتوح في الجدار الناري؟ هل الخدمة تستمع أصلاً؟\n- L7: هل DNS يحل الاسم؟ هل الخدمة تجيب (curl)؟\n\nمزاياه: شمول بلا استثناء — لن تفوتك مشكلة فيزيائية مهما كانت مخفية. عيبه: البطء النسبي حين يكون العطل معروفاً أنه في الأعلى.\n\nمتى تختاره؟ عطل غامض تماماً، أو مستخدم جديد لا يعمل عنده شيء إطلاقاً (غالباً فيزيائي أو إعدادات).",
          en: "You start at layer 1 and climb. The standard path step by step:\n\n- L1: is the link LED lit? Cable seated at both ends? Try a spare cable or another port — solving 50% of cases right here\n- L2: is the port state up/up? CRC errors or late collisions (duplex mismatch)? Is the VLAN correct?\n- L3: does the device have a valid address, mask, and gateway? Ping the gateway, then ping an external address\n- L4: is the needed port open in the firewall? Is the service even listening?\n- L7: does DNS resolve the name? Does the service answer (curl)?\n\nIts strengths: exhaustive coverage — no physical issue escapes. Its weakness: relative slowness when the fault is clearly up high.\n\nWhen to choose it: a totally mysterious fault, or a new user for whom nothing works at all (usually physical or settings).",
        },
      },
      {
        heading: { ar: "المنهجية 2 و 3: من الأعلى للأسفل والقسمة والتغلب", en: "Methods 2 & 3: Top-Down and Divide-and-Conquer" },
        body: {
          ar: "من الأعلى للأسفل (Top-Down) تبدأ من تجربة المستخدم والطبقة 7 وتنزل:\n\n- يناسب الأعطال التي فيها الاتصال قائم لكن التطبيق مريض: الموقع بطيء، صفحة خطأ، بريد لا يرسل\n- خطوات نموذجية: جرّب موقعاً آخر، افحص DNS، اختبر المنفذ، نازلاً نحو التشخيصات الدنيا\n\nالقسمة والتغلب (Divide-and-Conquer) هي أسلوب الخبراء: اختر طبقة وسطى مرجحة وأجرِ اختباراً قاطعاً عندها، ثم تابع في اتجاه الدليل:\n\n- ناجح ping 8.8.8.8 وفاشل فتح الموقع؟ إذن الطبقات 1-3 سليمة والمشكلة عند 7 (DNS غالباً) — قفزت نصف النموذج بفحص واحد\n- فاشل ping البوابة ونجح محلياً ping 127.0.0.1؟ المشكلة بينك وبين البوابة — انزل نحو 1-2\n\nهذه البراعة تُبنى بالخبرة: كل عطل تشخصه يصبح غريزاً في عطل مشابه قادم.",
          en: "Top-Down starts from the user experience at layer 7 and descends:\n\n- It suits faults where connectivity exists but the application is sick: slow site, error page, mail not sending\n- Typical steps: try another site, check DNS, test the port, descending toward lower diagnostics\n\nDivide-and-Conquer is the expert style: pick a probable middle layer, run one decisive test there, then follow the evidence:\n\n- ping 8.8.8.8 succeeds but the site fails to open? Layers 1-3 are healthy and the problem sits at 7 (usually DNS) — half the model skipped with one test\n- Ping to the gateway fails while local ping 127.0.0.1 works? The problem lies between you and the gateway — descend toward 1-2\n\nThis skill is built by experience: every fault you diagnose becomes instinct in the next similar one.",
        },
      },
      {
        heading: { ar: "سيناريو كامل: لا يفتح الموقع!", en: "A Full Scenario: The Site Will Not Open!" },
        diagram: {
          kind: "flow",
          title: { ar: "تشخيص منظم لموقع لا يفتح", en: "An orderly diagnosis of a site that will not open" },
          items: [
            { ar: "هل تعمل مواقع أخرى؟ — حدد نطاق المشكلة", en: "Do other sites work? — scope the problem" },
            { ar: "ping البوابة 192.168.1.1: هل الوصول محلي؟", en: "Ping the gateway 192.168.1.1: is the local path alive?" },
            { ar: "ping 8.8.8.8: هل الوصول للإنترنت سليم؟", en: "Ping 8.8.8.8: is Internet reachability fine?" },
            { ar: "nslookup للموقع: هل DNS يحل الاسم؟", en: "nslookup the site: does DNS resolve the name?" },
            { ar: "curl -v https://example.com: أين تتوقف المعاملة؟", en: "curl -v https://example.com: where does the transaction stall?" },
          ],
        },
        body: {
          ar: "موظفة تتصل: الإنترنت لا يعمل! إليك مساراً منضبطاً كاملاً كما يفعله مهندس حقيقي، مع تفسير كل خطوة:\n\n- 1) ipconfig /all : عنوان IP صحيح؟ لو ظهر عنوان يبدأ بـ 169.254.x.x فالجهاز لم يستلم DHCP — طبقة 3 فاشلة من الجذر\n- 2) ping 192.168.1.1 (البوابة): ناجح؟ إذن L1 وL2 وL3 المحلية سليمة — أغلقت ثلاث طبقات بضغطة واحدة\n- 3) ping 8.8.8.8 : ناجح؟ الإنترنت واصل؛ فشل؟ فتش عند البوابة/المزود\n- 4) nslookup www.example.com : يحل الاسم؟ فشل الحل = مشكلة DNS (طبقة 7) مع اتصال سليم تماماً\n- 5) curl -v https://www.example.com : رد HTTP؟ هنا يظهر كود الخطأ ومرحلة TLS إن كانت المشكلة أعلى\n\nلاحظ الجمال: خمس أوامر صنّفت العطل بدقة جراحية. لو كانت المشكلة كابلاً مقطوعاً لتوقفت عند الخطوة 2 وذهبت تمشي نحو الخزانة.",
          en: "An employee calls: the Internet is down! Here is the disciplined full path a real engineer takes, with each step explained:\n\n- 1) ipconfig /all : is the IP valid? If it starts with 169.254.x.x the device never got DHCP — layer 3 failed at the root\n- 2) ping 192.168.1.1 (the gateway): success? Then local L1, L2, L3 are healthy — three layers closed with one keystroke\n- 3) ping 8.8.8.8 : success? The Internet is reachable; failure? Investigate the gateway/provider\n- 4) nslookup www.example.com : does the name resolve? Resolution failure = a DNS problem (layer 7) with perfectly fine connectivity\n- 5) curl -v https://www.example.com : HTTP reply? The error code and the TLS stage reveal the upper problem\n\nNotice the beauty: five commands classified the fault with surgical precision. Had it been a severed cable you would have stopped at step 2 and walked toward the cabinet.",
        },
        code: {
          lang: "bash",
          snippet: "# المسار الخمسي المنضبط للتشخيص\nipconfig /all            # 1) فحص الإعدادات (أو: ip a)\nping 192.168.1.1         # 2) البوابة = اختبار L1+L2+L3 دفعة واحدة\nping 8.8.8.8             # 3) الوصول للإنترنت\nnslookup www.example.com # 4) DNS = طبقة التطبيقات\ncurl -v https://www.example.com # 5) الخدمة نفسها وتفاوض TLS",
        },
        tip: {
          ar: "قاعدة الفرز الأسرع في مهنة الشبكات: نجح ping بالعنوان وفشل بالاسم؟ اتهم DNS فوراً قبل أي شيء آخر.",
          en: "The fastest triage rule in networking: ping succeeds by IP but fails by name? Blame DNS immediately before anything else.",
        },
      },
    ],
    keyPoints: [
      { ar: "المنهجية المنظمة توفر الوقت واليقين مقابل تخمين المبتدئ العشوائي", en: "An organized methodology buys time and certainty over random beginner guessing" },
      { ar: "Bottom-Up: شامل من الكابل للأعلى — الأفضل للأعطال الغامضة الكاملة", en: "Bottom-Up: exhaustive from cable up — best for complete mystery faults" },
      { ar: "Top-Down: من تجربة المستخدم نزولاً — الأفضل لاتصال قائم وتطبيق مريض", en: "Top-Down: from user experience down — best when connectivity exists but the app is sick" },
      { ar: "Divide-and-Conquer: اختبار قاطع في طبقة مرجحة — أسلوب الخبراء", en: "Divide-and-Conquer: a decisive test at a probable layer — the expert style" },
      { ar: "نجاح ping للبوابة يغلق الطبقات 1-3 دفعة واحدة، ونجاح IP مع فشل الاسم يتهم DNS", en: "A successful gateway ping closes layers 1-3 at once; IP success with name failure indicts DNS" },
    ],
    commands: [
      { cmd: "ping 192.168.1.1", desc: { ar: "أول قفزة تشخيصية: يثبت سلامة الطبقات 1-3 المحلية في ثوان", en: "The first diagnostic leap: proves local layers 1-3 healthy in seconds" } },
      { cmd: "nslookup www.example.com", desc: { ar: "فرز طبقة التطبيقات: هل الترجمة من اسم إلى IP تعمل؟", en: "Triage the application layer: does name-to-IP translation work?" } },
      { cmd: "curl -v https://www.example.com", desc: { ar: "فحص الخدمة نفسها مع كل تفاصيل HTTP وTLS", en: "Test the service itself with full HTTP and TLS detail" } },
      { cmd: "show interfaces status", desc: { ar: "على المبدل: فحص منافذ الطبقتين 1-2 لأجهزة المستخدمين", en: "On the switch: layer 1-2 inspection of user ports" } },
    ],
    quiz: [
      {
        q: { ar: "نجح ping بالعنوان الرقمي وفشل بالاسم النصي — أين تكمن المشكلة الأرجح؟", en: "Ping succeeds by numeric address but fails by textual name — where does the problem most likely lie?" },
        options: [
          { ar: "الكابل الفيزيائي", en: "The physical cable" },
          { ar: "خدمة DNS في الطبقة 7", en: "The DNS service at layer 7" },
          { ar: "عنوان MAC للبطاقة", en: "The NIC MAC address" },
          { ar: "التبديل في الطبقة 2", en: "Layer 2 switching" },
        ],
        correct: 1,
        explain: { ar: "الاتصال بالـ IP يثبت سلامة الطبقات 1-4 تقريباً؛ فشل الاسم يعزل المشكلة في الترجمة — DNS.", en: "Reaching by IP proves layers 1-4 nearly healthy; name failure isolates the problem to translation — DNS." },
      },
      {
        q: { ar: "مستخدم جديد لا يعمل عنده أي شيء إطلاقاً — أي منهجية تختار؟", en: "A new user for whom nothing works at all — which methodology do you pick?" },
        options: [
          { ar: "من الأعلى للأسفل", en: "Top-down" },
          { ar: "من الأسفل للأعلى", en: "Bottom-up" },
          { ar: "إعادة تشغيل كل الخوادم", en: "Reboot every server" },
          { ar: "استبدال الموجّه مباشرة", en: "Replace the router immediately" },
        ],
        correct: 1,
        explain: { ar: "الانقطاع الكامل للجديد غالباً فيزيائي أو إعدادات دنيا — Bottom-Up يعالجه بلا استثناءات.", en: "Total outage for a new user is usually physical or low-level settings — bottom-up handles it exhaustively." },
      },
      {
        q: { ar: "ماذا يثبت نجاح ping إلى البوابة الافتراضية؟", en: "What does a successful ping to the default gateway prove?" },
        options: [
          { ar: "سلامة الطبقات 1 و 2 و 3 المحلية فقط", en: "Local layers 1, 2, and 3 are healthy" },
          { ar: "سلامة الإنترنت كله", en: "The whole Internet is healthy" },
          { ar: "عمل DNS بلا خطأ", en: "DNS works flawlessly" },
          { ar: "عدم وجود جدار ناري", en: "There is no firewall" },
        ],
        correct: 0,
        explain: { ar: "هو يغلق المحلي 1-3 (كابل، توصيل، عنونة) ولا يقول شيئاً عن الإنترنت أو DNS أو الخدمات.", en: "It closes local 1-3 (cable, connectivity, addressing) while saying nothing about the Internet, DNS, or services." },
      },
      {
        q: { ar: "أي زوج أدوات يشكل أساس القسمة والتغلب؟", en: "Which pair of tools forms the backbone of divide-and-conquer?" },
        options: [
          { ar: "إعادة التشغيل والتخمين", en: "Rebooting and guessing" },
          { ar: "ping قاطع في نقطة مرجحة ثم تتبع الدليل صعوداً أو نزولاً", en: "A decisive ping at a probable point then following evidence up or down" },
          { ar: "استبدال كل الكابلات تباعاً", en: "Replacing every cable in turn" },
          { ar: "قراءة وثائق المزود فقط", en: "Reading vendor docs only" },
        ],
        correct: 1,
        explain: { ar: "جوهر الأسلوب: اختبار واحد قاطع في منتصف النموذج يقسم الاحتمالات نصفين ويوجه المسار.", en: "The style's essence: one decisive mid-model test splitting probabilities in half and steering the path." },
      },
    ],
  },
  {
    id: "l019",
    moduleId: "m02",
    order: 9,
    level: "beginner",
    title: { ar: "الأجهزة في كل طبقة: من المجمّع إلى موازن الأحمال", en: "Devices at Every Layer: From Hub to Load Balancer" },
    summary: {
      ar: "خريطة الأجهزة على نموذج الطبقات، ومفهوما نطاق التصادم ونطاق البث اللذان يحددان قوة كل جهاز.",
      en: "A device map over the layer model, plus the collision-domain and broadcast-domain concepts that define each device's power.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "أجهزة الطبقة 1: عصر ما قبل الذكاء", en: "Layer 1 Devices: The Pre-Intelligence Era" },
        body: {
          ar: "أجهزة الطبقة 1 لا تفهم شيئاً عن العناوين أو الإطارات — إنها تكرر الإشارات فحسب:\n\n- المكرر (Repeater): يستقبل إشارة ضعيفة ويعيد توليدها بقوة؛ غايته مد مسافة الكابل\n- المجمّع (Hub): مكرر متعدد المنافذ؛ ما يصل من منفذ يخرج من كل المنافذ الأخرى — بما فيه الإشارات المتصادمة!\n- محوّل الوسيط (Media Converter): يربط نحاساً بألياف مثلاً، بلا أي فهم لما ينقل\n\nالمجمّع هو الشرير في قصة الشبكات القديمة: كل الأجهزة المتصلة به تتشارك نطاق تصادم (Collision Domain) واحداً وتتنافس على الكلام في نمط نصف مزدوج. كل جهاز جديد يضيف ضجيجاً واحتمال تصادم — لهذا انقرض عملياً اليوم وبقي في الاختبارات كدرس تاريخي ونقطة مقارنة لفهم المبدّل.",
          en: "Layer 1 devices understand nothing about addresses or frames — they merely repeat signals:\n\n- Repeater: takes a weakened signal and regenerates it strongly; its goal is extending cable distance\n- Hub: a multi-port repeater; whatever arrives on one port exits every other port — including colliding signals!\n- Media converter: joins copper to fiber, for instance, with zero understanding of what it carries\n\nThe hub is the villain of old networking stories: every connected device shares one collision domain and competes to speak in half duplex. Each added device adds noise and collision odds — which is why it went practically extinct, surviving in exams as a history lesson and a comparison point for understanding switches.",
        },
      },
      {
        heading: { ar: "أجهزة الطبقة 2: ثورة المبدّل", en: "Layer 2 Devices: The Switch Revolution" },
        body: {
          ar: "المبدّل (Switch) هو بطل القصة الحديثة، وجهازه التاريخي السابق هو الجسر (Bridge):\n\n- الجسر (Bridge): وصّل مقطعين قديمين وقرر تمرير الإطار أو حجزه حسب عنوان MAC — فاصل تصادمات مبكر\n- المبدّل (Switch): جسر بين كل زوج من منافذه؛ يقرأ عنوان MAC الوجهة فيرسل الإطار من منفذه الصحيح فقط\n- نقطة الوصول اللاسلكية (Wireless Access Point): جسر بين عالم الراديو والإيثرنت السلكي\n- بطاقة الشبكة (NIC): تعمل عند 1 و2 معاً — تجسير بين ملكة الإشارة وملكة الإطار\n\nالحصيلة الثورية للمبدّل: كل منفذ نطاق تصادم مستقل — أي أجهزة كثيرة تتكلم في آن واحد بثنائية كاملة (Full Duplex) بلا تصادم واحد. لكن تبقى كل المنافذ (دون تقسيم VLAN) نطاق بث (Broadcast Domain) واحداً: رسالة بث عامة تصرخ في كل زاوية.",
          en: "The Switch is the hero of the modern story, and its historical predecessor is the Bridge:\n\n- Bridge: joined two old segments and decided to forward or block each frame by MAC address — an early collision splitter\n- Switch: a bridge between every pair of its ports; reads the destination MAC and sends the frame out the correct port only\n- Wireless Access Point: a bridge between the radio world and wired Ethernet\n- NIC: operates at 1 and 2 together — bridging the realm of signals and the realm of frames\n\nThe switch's revolutionary yield: every port is its own collision domain — many devices speak simultaneously in full duplex with zero collisions. Yet all ports (without VLANs) remain one broadcast domain: a broadcast message shouts into every corner.",
        },
      },
      {
        heading: { ar: "أجهزة الطبقة 3 وما فوق: العقل والحراسة", en: "Layer 3 and Beyond: The Mind and the Guard" },
        table: {
          caption: { ar: "الأجهزة عبر الطبقات وما تفحصه", en: "Devices across the layers and what they inspect" },
          headers: [
            { ar: "الجهاز", en: "Device" },
            { ar: "طبيقته", en: "Layer" },
            { ar: "ما يفحصه لاتخاذ القرار", en: "What it inspects to decide" },
          ],
          rows: [
            [
              { ar: "Hub", en: "Hub" },
              { ar: "L1", en: "L1" },
              { ar: "لا شيء — يكرر الإشارة للجميع", en: "Nothing — repeats the signal to all" },
            ],
            [
              { ar: "Switch", en: "Switch" },
              { ar: "L2", en: "L2" },
              { ar: "عنوان MAC الوجهة", en: "Destination MAC" },
            ],
            [
              { ar: "Router", en: "Router" },
              { ar: "L3", en: "L3" },
              { ar: "عنوان IP الوجهة وأطول بادئة", en: "Destination IP and longest prefix" },
            ],
            [
              { ar: "موازن الأحمال", en: "Load balancer" },
              { ar: "L4-L7", en: "L4-L7" },
              { ar: "المنافذ والمسارات والمحتوى", en: "Ports, URLs, and content" },
            ],
            [
              { ar: "الجدار الناري", en: "Firewall" },
              { ar: "L3-L7", en: "L3-L7" },
              { ar: "القواعد وحالة الاتصال", en: "Policy and connection state" },
            ],
          ],
        },
        body: {
          ar: "الموجّه (Router) يجلس فوق الجميع في العالم المحلي: كل واجهة له تنهي نطاق بث وتبدأ آخر؛ قلبه جدول توجيه يقرر ببرودة أي مسار للخارج. المبدّل متعدد الطبقات (Layer 3 Switch) يجمع سرعة المبدّل وعقل الموجّه في صندوق واحد — سيد شبكات المؤسسات الحديثة.\n\nفوق ذلك تسكن أجهزة متقدمة تقرأ أعمق في الحزم:\n\n- جدار الحماية (Firewall): يقرر سماحاً أو منعاً وفق IP والمنافذ (3-4) وصولاً لفحص المحتوى في الجيل الحديث (طبقة 7)\n- موازن الأحمال (Load Balancer): يوزع الطلبات على خوادم متعددة (4-7) — لا غنى عنه لأي خدمة ضخمة\n- الوكيل (Proxy): وسيط تطبيقي يعلم باسمك ويجلس عند 7\n- IDS/IPS: عيون أمنية تتفحص الحزم بحثاً عن بصمات هجمات\n\nقاعدة العمر الوظيفي: كلما صعدت الطبقات انخفض عدد الأجهزة وارتفع ثمنها وذكاؤها — من مئات المبدلات إلى بضعة موازنات أحمال ذهبية في البنية.",
          en: "The Router sits above everyone in the local world: each of its interfaces terminates one broadcast domain and starts another; its heart is a routing table that coldly picks the outbound path. The Layer 3 Switch merges switch speed with router brains in one box — the master of modern enterprise networks.\n\nAbove that dwell advanced devices reading deeper into packets:\n\n- Firewall: allows or denies by IP and ports (3-4) up to content inspection in the modern generation (layer 7)\n- Load balancer: distributes requests across servers (4-7) — indispensable for any large service\n- Proxy: an application-level middleman that knows your name and sits at 7\n- IDS/IPS: security eyes scanning packets for attack fingerprints\n\nA career-scale rule: as you climb the layers, device count drops while price and intelligence rise — from hundreds of switches to a handful of golden load balancers in the architecture.",
        },
        tip: {
          ar: "قاعدة الاختبارات الذهبية التي تتكرر بلا رحمة: المجمّع = نطاق تصادم واحد. المبدّل = نطاق تصادم لكل منفذ ونطاق بث واحد. الموجّه = نطاق بث لكل واجهة.",
          en: "The mercilessly repeated exam rule: Hub = one collision domain. Switch = a collision domain per port and one broadcast domain. Router = a broadcast domain per interface.",
        },
      },
    ],
    keyPoints: [
      { ar: "المكرر والمجمّع ومحوّل الوسيط تعمل في L1 وتكرر الإشارات بلا فهم", en: "Repeater, hub, and media converter run at L1 repeating signals with no understanding" },
      { ar: "المبدّل يقرأ MAC فيرسل من المنفذ الصحيح فقط: تصادم مستقل لكل منفذ وبث واحد مشترك", en: "The switch reads MAC and forwards out the right port only: independent collision per port, one shared broadcast" },
      { ar: "الموجّه يفصل نطاقات البث ويربط الشبكات وفق جداول التوجيه", en: "The router separates broadcast domains and interconnects networks via routing tables" },
      { ar: "أجهزة الطبقات 4-7: جدران حماية وموازنات أحمال ووكلاء وعيون أمنية", en: "Layers 4-7 devices: firewalls, load balancers, proxies, and security eyes" },
      { ar: "الارتفاع في الطبقات = أجهزة أقل وأثمن وأذكى", en: "Climbing the layers = fewer, pricier, smarter devices" },
    ],
    commands: [
      { cmd: "show mac address-table", desc: { ar: "على مبدّل: جدول ذكاء L2 — أي MAC يسكن أي منفذ", en: "On a switch: the L2 intelligence table — which MAC lives on which port" } },
      { cmd: "show ip route", desc: { ar: "على موجّه: عقل L3 — أين تذهب الرزم", en: "On a router: the L3 mind — where packets go" } },
      { cmd: "ss -tulpn", desc: { ar: "لينكس: قائمة الخدمات المستمعة بمنافذها (L4) على هذا الجهاز", en: "Linux: services listening with their ports (L4) on this device" } },
    ],
    quiz: [
      {
        q: { ar: "جهاز يرسل كل ما يصله من منفذ إلى كل المنافذ الأخرى هو:", en: "A device sending everything arriving on one port to all other ports is a:" },
        options: [
          { ar: "مبدّل Switch", en: "Switch" },
          { ar: "مجمّع Hub", en: "Hub" },
          { ar: "موجّه Router", en: "Router" },
          { ar: "موازن أحمال", en: "Load balancer" },
        ],
        correct: 1,
        explain: { ar: "المجمّع مكرر متعدد المنافذ بلا أي فهم للعناوين — تعريفه الحرفي هو سلوكه هذا.", en: "The hub is a multi-port repeater with zero address understanding — this behavior is literally its definition." },
      },
      {
        q: { ar: "مبدّل بلا أي تقسيم VLAN يفصل:", en: "A switch with no VLANs separates:" },
        options: [
          { ar: "نطاقات البث فقط", en: "Broadcast domains only" },
          { ar: "نطاقات التصادم فقط", en: "Collision domains only" },
          { ar: "كليهما معاً", en: "Both together" },
          { ar: "لا شيء إطلاقاً", en: "Nothing at all" },
        ],
        correct: 1,
        explain: { ar: "كل منفذ مبدّل نطاق تصادم مستقل؛ لكن البث العام يصل لكل المنافذ — فصل البث يحتاج موجّهاً أو VLANs.", en: "Each switch port is an independent collision domain; yet broadcast reaches all ports — separating broadcast needs a router or VLANs." },
      },
      {
        q: { ar: "أي جهاز يجمع سرعة التحويل وعقل التوجيه في صندوق واحد؟", en: "Which device combines switching speed and routing brains in one box?" },
        options: [
          { ar: "المجمّع", en: "The hub" },
          { ar: "الجسر", en: "The bridge" },
          { ar: "المبدّل متعدد الطبقات L3", en: "The Layer 3 switch" },
          { ar: "المكرر", en: "The repeater" },
        ],
        correct: 2,
        explain: { ar: "مبدّل L3 يوجه بين الشبكات/VLANs بعتاد سريع في قلب شبكات المؤسسات الحديثة.", en: "An L3 switch routes between networks/VLANs at hardware speed — the heart of modern enterprise networks." },
      },
      {
        q: { ar: "موازن الأحمال يعمل نمطياً في الطبقات:", en: "A load balancer typically operates at layers:" },
        options: [
          { ar: "1-2 فقط", en: "1-2 only" },
          { ar: "2-3", en: "2-3" },
          { ar: "4-7", en: "4-7" },
          { ar: "لا يتبع الطبقات", en: "It follows no layers" },
        ],
        correct: 2,
        explain: { ar: "يقرأ المنافذ (4) وصولاً لمحتوى الطلب والكوكيز وعناوين URL (7) ليوزع الأحمال بذكاء.", en: "It reads ports (4) up to request content, cookies, and URLs (7) to distribute load intelligently." },
      },
    ],
  },
  {
    id: "l020",
    moduleId: "m02",
    order: 10,
    level: "beginner",
    title: { ar: "رحلة حزمة حقيقية: من متصفحك إلى خادم العالم", en: "A Real Packet Journey: From Your Browser to a World Server" },
    summary: {
      ar: "الدرس الختامي للوحدة: قصة سينمائية لطلب صفحة واحدة يعبر كل ما تعلمته — طبقات وبروتوكولات وأجهزة.",
      en: "The module's closing lesson: a cinematic story of one page request crossing everything you learned — layers, protocols, and devices.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "المشهد الافتتاحي: أنت والمتصفح", en: "Opening Scene: You and the Browser" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة حزمة حقيقية من متصفحك إلى خادم عالمي", en: "A real packet's journey from your browser to a world server" },
          items: [
            { ar: "المتصفح يستعلم DNS عن عنوان الخادم", en: "The browser resolves the server's address via DNS" },
            { ar: "ARP يحدد MAC البوابة الافتراضية", en: "ARP finds the default gateway's MAC" },
            { ar: "التغليف الكامل وإطار أول قفزة نحو البوابة", en: "Full encapsulation and a first-hop frame toward the gateway" },
            { ar: "الراوترات توجّه الحزمة قفزة بعد قفزة عبر BGP", en: "Routers forward the packet hop by hop via BGP" },
            { ar: "الخادم يفك التغليف ويرد بالطريق نفسه", en: "The server decapsulates and replies along the same path" },
          ],
        },
        body: {
          ar: "تفتح متصفحك وتكتب عنوان موقع أخبار عالمي، ثم تضغط Enter. خلال أجزاء من الثانية تنطلق سلسلة أحداث كاملة:\n\nأولاً يوقف المتصفح عند حقيقة: لا يعرف عنوان IP للخادم. فيرسل سؤالاً لخادم DNS — إن لم يكن الجواب مخزناً في ذاكرة النظام المؤقتة أصلاً. سؤال UDP صغير نحو المنفذ 53، ويعود بالجواب: مثلاً 93.184.216.34.\n\nثانياً يفتح المتصفح قناة TCP نحو الخادم: المصافحة الثلاثية الشهيرة — SYN ثم SYN-ACK ثم ACK — تُسلّم المفاتيح بين الطرفين قبل أي كلمة واحدة من المحتوى. وإن كان الموقع حديثاً فبعد فتح القناة تجري مصافحة TLS تتفقان فيها على التشفير وتبادل الشهادات.\n\nثالثاً — والآن فقط — يُرسل طلب HTTP/GET محتوياً اسم الصفحة المطلوبة.",
          en: "You open the browser, type a global news site address, and press Enter. Within fractions of a second a full chain of events launches:\n\nFirst the browser stops at a fact: it does not know the server's IP. So it asks a DNS server — unless the answer already sits in the system cache. A tiny UDP question toward port 53 returns the answer: say 93.184.216.34.\n\nSecond, the browser opens a TCP channel to the server: the famous three-way handshake — SYN, then SYN-ACK, then ACK — keys handed over before a single word of content. And on a modern site, right after the channel opens, a TLS handshake agrees on encryption and exchanges certificates.\n\nThird — only now — an HTTP GET request goes out carrying the wanted page's name.",
        },
      },
      {
        heading: { ar: "في حاسوبك: التغليف الكامل", en: "Inside Your Computer: Full Encapsulation" },
        body: {
          ar: "طلب GET النصي ينزل الآن طبقات جهازك مرتدياً أثوابه كاملة:\n\n- طبقة التطبيقات سلمت النص؛ النقل أضاف ترويسة TCP: منفذ مصدر مؤقت (مثلاً 51423) ومنفذ وجهة 443 مع رقم تسلسل افتتاحي\n- الشبكة أضافت ترويسة IP: مصدر عنوان جهازك الخاص (192.168.1.50 مثلاً) ووجهة 93.184.216.34 و TTL = 64\n- الوصل بصمت أضافت عناوين MAC: المصدر بطاقتك، والوجهة — انتبه! — ليست الخادم البعيد بل موجّه بوابتك (بوابة البيت)، لأن MAC عنوان للقفزة القادمة فقط\n- الفيزيائية حولت الإطار إلى نبضات كهربائية في كابل نحاسي متجهة للمبدّل\n\nربما لاحظت المفارقة الأنيقة: الإطار يحمل بوجهه عنوان MAC لجهاز لا يعرف شيئاً عن الوجهة النهائية، وفي جوفه رزمة تحمل عنوان IP لجهاز على بعد قارات.",
          en: "The textual GET request now descends your device's layers wearing full attire:\n\n- The application handed down the text; transport added a TCP header: an ephemeral source port (51423, say) and destination port 443 with an opening sequence number\n- The network added an IP header: source your private address (192.168.1.50, say), destination 93.184.216.34, and TTL = 64\n- The link quietly added MAC addresses: source your NIC, destination — pay attention! — not the remote server but your home gateway router, because MAC is next-hop only\n- The physical turned the frame into electric pulses in a copper cable headed for the switch\n\nPerhaps you noticed the elegant paradox: the frame's face carries the MAC of a device that knows nothing of the final destination, while in its belly a packet carries the IP of a device continents away.",
        },
      },
      {
        heading: { ar: "عند المبدّل والبوابة: تبديل الهويات", en: "At the Switch and Gateway: Identity Swapping" },
        body: {
          ar: "المبدّل المنزلي يستقبل الإطار ويقرأ عنوان MAC الوجهة — بوابة البيت — فيجد منفذها من جدوله ويرسل الإطار إليه مباشرة (وليس فيضاناً؛ لقد تعلم عنوانها من قبل). المبدّل لم يلمس ولا بتاً من محتوى الرزمة: عمله ينتهي عند القشرة.\n\nداخل البوابة/الموجّه يحدث التبديل الحقيقي للأبطال:\n\n- تُنزع قشرة Ethernet المنزلية بالكامل ويُرمى عنوانا MAC القديمان\n- يقرأ الموجّه عنوان IP الوجهة ويبحث عنه في جدول التوجيه فيختار المنفذ الخارجي\n- TTL ينقص من 64 إلى 63 — عدّاد رحلة يوشك أبداً على النفاد لا يعرف الرحلات اللانهائية\n- إذا كان عنوانك خاصاً (192.168.x.x) فها هنا تجري ترجمة العناوين NAT: تُسجل مراسلات المنفذ المؤقت ليعود الجواب إليك وحدك، ويوضع عنوان البوابة العام مكان عنوانك\n- تُلبس قشرة Ethernet جديدة بطلاقها: MAC الموجّه مصدراً و MAC الموجّه التالي لمزود الخدمة وجهة\n\nهذه الدورة (خلع ولبس) تتكرر عند كل قفزة عبر الإنترنت: عشرات المرات أحياناً.",
          en: "The home switch receives the frame, reads the destination MAC — the home gateway — finds its port in its table, and forwards the frame there directly (not flooding; it learned the address before). The switch touched not a single bit of the packet's content: its job ends at the shell.\n\nInside the gateway/router, the real identity swap of the protagonists happens:\n\n- The home Ethernet shell is fully stripped, the old MAC pair discarded\n- The router reads the destination IP, consults its routing table, and picks the outbound port\n- TTL drops from 64 to 63 — a journey counter that never knows infinite trips\n- If your address is private (192.168.x.x), NAT happens right here: the ephemeral port mapping is recorded so the answer returns to you alone, and the gateway's public address replaces yours\n- A brand-new Ethernet shell dresses the packet: the router's MAC as source, the ISP's next router MAC as destination\n\nThis undress-and-redress cycle repeats at every hop across the Internet: dozens of times sometimes.",
        },
      },
      {
        heading: { ar: "عبر العالم ثم العودة", en: "Across the World and Back" },
        body: {
          ar: "تسافر الرزمة الآن بين موجّهات مزود الخدمة: كل واحد يقرأ عنوان IP وينقص TTL ويلبس قشرة جديدة. ربما عبرت كابلاً بحرياً ضوئياً تحت محيط، أو عقدة تبادل إنترنت (IXP) ضخمة في مدينة كبرى. وفي كل قفزة رزمة IP بقيت نفسها — هوية واحدة ثابتة — بينما تقشرت الإطارات وتجددت كثياب مسافر يبدلها كل محطة.\n\nعند الخادم البعيد:\n\n- بطاقة شبكته تفحص MAC ثم FCS، والمكدس يصعد الرزمة\n- TCP يرد بالمصافحة إن كانت أول قطعة، والتطبيق يستلم GET ويعمل صفحة HTML\n- الاستجابة تسافر الرحلة المعاكسة بالكامل: تغليفاً وفكاً وNAT عكسيّاً نحو منفذك المؤقت ذاته\n- متصفحك يستلم القطع ويعيد تجميعها ويرسم الصفحة\n\nوكل هذا — من ضغطة Enter حتى ظهور العناوين — حدث في أقل من نصف ثانية غالباً. أعد قراءة هذه القصة وأنت تنظر إلى شاشتك الآن: أنت في نهاية قصة مطابقة تجري ملايين المرات في اللحظة نفسها حول الكوكب.",
          en: "The packet now travels between the ISP's routers: each reads the IP, decrements TTL, and dresses a new shell. It perhaps crossed a submarine fiber cable under an ocean, or a giant Internet Exchange Point (IXP) in a major city. And at every hop, the IP packet remained itself — one fixed identity — while frames molted and renewed like a traveler changing clothes at each station.\n\nAt the remote server:\n\n- Its NIC checks MAC then FCS, and the stack climbs the packet up\n- TCP answers the handshake if it was the first segment, and the application receives GET and builds the HTML page\n- The response travels the complete reverse journey: encapsulating, decapsulating, and reverse-NAT back to your very ephemeral port\n- Your browser receives the segments, reassembles them, and paints the page\n\nAnd all of this — from pressing Enter to headlines appearing — happened in under half a second, usually. Reread this story while looking at your screen right now: you sit at the end of an identical story running millions of times in the same instant around the planet.",
        },
        tip: {
          ar: "جرب الآن: traceroute لموقع عالمي ثم traceroute لموقع محلي — قارن عدد القفزات والزمن. أنت ترى رحلة هذا الدرس بعينيك.",
          en: "Try now: traceroute to a global site, then to a local one — compare hop counts and times. You are watching this lesson's journey with your own eyes.",
        },
      },
    ],
    keyPoints: [
      { ar: "الطلب يمر بتسلسل حاسم: DNS ثم مصافحة TCP ثم TLS ثم HTTP", en: "The request passes a decisive sequence: DNS, then TCP handshake, then TLS, then HTTP" },
      { ar: "عنوان IP هوية الرحلة الثابتة؛ وعناوين MAC ملابس تتبدل كل قفزة", en: "The IP address is the journey's fixed identity; MAC addresses are clothes swapped every hop" },
      { ar: "المبدّل يعمل على القشرة فقط ولا يلمس الرزمة؛ والموجّه يخلع القشرة ويلبسها من جديد", en: "The switch works on the shell only, never touching the packet; the router undresses and redresses it" },
      { ar: "TTL عدّاد رحلة ينقص كل قفزة، وNAT يترجم عنوانك الخاص إلى عام عند البوابة", en: "TTL is a per-hop journey counter; NAT translates your private address to public at the gateway" },
      { ar: "الرحلة الكاملة غالباً تتم في أجزاء من الثانية عبر عشرات الأجهزة وقارات", en: "The complete journey usually completes in fractions of a second across dozens of devices and continents" },
    ],
    commands: [
      { cmd: "tracert www.wikipedia.org", desc: { ar: "ويندوز: شاهد قفزات رحلتك الفعلية نحو خادم حقيقي", en: "Windows: watch the actual hops of your journey toward a real server" } },
      { cmd: "traceroute 1.1.1.1", desc: { ar: "لينكس: المسار نحو خادم Cloudflare مع زمن كل قفزة", en: "Linux: the path to a Cloudflare server with each hop's timing" } },
      { cmd: "sudo tcpdump -i eth0 port 53 -c 4", desc: { ar: "مشاهدة أسئلة DNS الحقيقية التي يطرحها متصفحك", en: "Watch the real DNS questions your browser asks" } },
      { cmd: "ss -tn", desc: { ar: "لينكس: قائمة اتصالات TCP القائمة الآن مع منافذها", en: "Linux: your live TCP connections with their ports" } },
    ],
    quiz: [
      {
        q: { ar: "ما التسلسل الصحيح لأول خطوات فتح موقع https؟", en: "What is the correct order of the first steps of opening an https site?" },
        options: [
          { ar: "HTTP ثم DNS ثم TCP", en: "HTTP, then DNS, then TCP" },
          { ar: "DNS ثم TCP ثم TLS ثم HTTP", en: "DNS, then TCP, then TLS, then HTTP" },
          { ar: "TCP ثم DNS ثم HTTP", en: "TCP, then DNS, then HTTP" },
          { ar: "TLS ثم DNS ثم TCP", en: "TLS, then DNS, then TCP" },
        ],
        correct: 1,
        explain: { ar: "لا قناة بلا ترجمة الاسم (DNS)، ولا تشفير بلا قناة (TCP)، ولا طلب قبل التشفير (TLS).", en: "No channel without name resolution (DNS), no encryption without a channel (TCP), no request before encryption (TLS)." },
      },
      {
        q: { ar: "إطار يغادر حاسوبك في شبكة منزلية نحو خادم بعيد: من هو MAC الوجهة فيه؟", en: "A frame leaving your home computer toward a distant server: who is the destination MAC in it?" },
        options: [
          { ar: "بطاقة الخادم البعيد", en: "The remote server's NIC" },
          { ar: "موجّه البوابة المنزلية", en: "The home gateway router" },
          { ar: "أقرب خادم DNS", en: "The nearest DNS server" },
          { ar: "عنوان البث العام", en: "The broadcast address" },
        ],
        correct: 1,
        explain: { ar: "MAC عنوان القفزة التالية فقط — أي البوابة؛ أما وجهة IP في الإطار فهي الخادم البعيد فعلاً.", en: "MAC is the next-hop address only — the gateway; while the IP destination inside the frame is indeed the far server." },
      },
      {
        q: { ar: "ما الذي يحدث لعنوان IP ولـ TTL عند كل موجّه تعبره الرزمة؟", en: "What happens to the IP address and TTL at each router the packet crosses?" },
        options: [
          { ar: "كلاهما يتبدل كلياً", en: "Both fully change" },
          { ar: "العنوان يبقى وTTL ينقص 1", en: "The address stays and TTL decrements by 1" },
          { ar: "العنوان يتبدل وTTL يثبت", en: "The address changes and TTL stays" },
          { ar: "كلاهما يبقى دون مساس", en: "Both remain untouched" },
        ],
        correct: 1,
        explain: { ar: "هوية IP محفوظة من المصدر للوجهة (عدا ترجمة NAT)؛ وTTL يُنقص كل قفزة لمنع الدوران الأبدي.", en: "The IP identity is preserved source to destination (NAT aside); TTL decrements each hop to prevent eternal looping." },
      },
      {
        q: { ar: "أي جهاز في الرحلة استبدل عنوانك الخاص بعنوان عام ليسهل عودة الجواب إليك؟", en: "Which device on the journey replaced your private address with a public one so the answer could return to you?" },
        options: [
          { ar: "المبدّل المنزلي", en: "The home switch" },
          { ar: "موجّه البوابة (NAT)", en: "The gateway router (NAT)" },
          { ar: "خادم DNS", en: "The DNS server" },
          { ar: "نقطة الوصول اللاسلكية", en: "The wireless access point" },
        ],
        correct: 1,
        explain: { ar: "البوابة تسجل مراسلة منفذك المؤقت وتضع عنوانها العام — فيعود رد الخادم إليها فتسلمه لك حصراً.", en: "The gateway records your ephemeral port mapping and places its public address — the server's reply returns to it and is delivered to you alone." },
      },
    ],
  },
];
