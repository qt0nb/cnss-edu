import type { Lesson } from "@/lib/types";

export const m03_LESSONS: Lesson[] = [
  {
    id: "l021",
    moduleId: "m03",
    order: 1,
    level: "beginner",
    title: { ar: "الإشارات وعرض النطاق: فيزياء الشبكات الأولى", en: "Signals & Bandwidth: The First Physics of Networking" },
    summary: {
      ar: "كيف تسافر الأرقام في الأسلاك كإشارات، وما الفرق الدقيق بين عرض النطاق والإنتاجية والمُنتَج الصافي.",
      en: "How numbers travel in wires as signals, and the subtle difference between bandwidth, throughput, and goodput.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "ما الإشارة؟ تشابهان وفرق جوهري", en: "What Is a Signal? Two Alike and One Deep Difference" },
        body: {
          ar: "الإشارة (Signal) هي التمثيل الفيزيائي للبيانات أثناء سفرها في وسط النقل. ولها وجهان: تناظرية (Analog) تتغير بسلاسة متصلة كأمواج — مثل صوتك في الهاتف القديم — ورقمية (Digital) تقفز بين حالتين منفصلتين فقط: صفر وواحد.\n\nحواسيبنا رقمية بالكامل، لكن الوسائط نفسها تناظرية القلب: الجهد الكهربائي يرتفع وينخفض بموجة متصلة، والضوء يشتعل ويخفت. الحل: نتفق على ترميز (Encoding) يربط نمط الموجة بالبتات — فمثلاً في إيثرنت النحاسي يمثل مستوى الجهد أو انتقاله بتة معينة.\n\n- الترميز ليس مجرد ترف: منهجية Manchester القديمة (10BASE-T) تجعل كل بتة انتقالاً في المستوى، فيحمل الإشارة ساعتها الداخلية ذاتها\n- الإشارات الأسرع تحتاج رموزاً أذكى (PAM-5 في الجيجابت مثلاً) لأن الموجات البسيطة لا تكفي\n\nعلى الشبكة البصرية، البتة نبضة ضوء؛ وعلى اللاسلكي موجة راديو معدَّلة. الجوهر واحد: تمثيل فيزيائي قابل للاستعادة لثنائية الرقم.",
          en: "A signal is the physical representation of data while it travels in the medium. It has two faces: analog, varying smoothly like waves — your voice on an old telephone — and digital, jumping between only two discrete states: zero and one.\n\nOur computers are fully digital, yet the media themselves are analog at heart: voltage rises and falls in a continuous wave, light brightens and dims. The solution: an encoding agreement linking the wave pattern to bits — for instance, in copper Ethernet a voltage level or transition represents a particular bit.\n\n- Encoding is not a luxury: the old Manchester scheme (10BASE-T) makes each bit a level transition, so the signal carries its own clock\n- Faster signals need smarter codes (PAM-5 in Gigabit, for example) because simple waves do not suffice\n\nOver optical media a bit is a light pulse; over wireless, a modulated radio wave. The essence is one: a recoverable physical representation of digital duality.",
        },
      },
      {
        heading: { ar: "أعداء الإشارة الثلاثة", en: "The Three Enemies of the Signal" },
        body: {
          ar: "كل وسط نقل يهاجم إشارتك بثلاث وسائل، وفهمها يفسر معظم قرارات صناعة الكابلات:\n\n- التوهين (Attenuation): الإشارة تفقد قوتها كلما سافرت — تماماً كصوت ينخفت مع البعد. النحاس يفقد أكثر، والألياف أقل بكثير؛ لهذا يحد النحاس بمئة متر بينما تمشي الألياف عشرات الكيلومترات\n- الضجيج (Noise): إشارات غريبة تدخل خطك من مصادر خارجية — محركات كهربائية، إضاءة فلورسنتية، كابلات كهرباء مجاورة، بل وبرق السماء\n- التداخل المتشابك (Crosstalk): إشارة زملائك في السلك المجاور داخل الكابل نفسه تتسرب إلى خطك — أشهر عدو في كابلات UTP وسبب لفّها المزدوج أصلاً\n\nحصيلة المعركة تُقاس بنسبة الإشارة إلى الضجيج (SNR: Signal-to-Noise Ratio): كلما ارتفعت عاش الاتصال. كل تطور في كابلات الإيثرنت من Cat5e إلى Cat8 هو في جوهره تاريخ انتصارات على التوهين والتشابك — لفّ أدق، حجب أفضل، ترددات أعلى.\n\nقانون شانون (Shannon) يضع سقف الحقيقة أمام الجميع: أقصى معدل بيانات خالٍ من الأخطاء = عرض النطاق × لوغاريتم (1 + SNR). ترجمة عملية: ضاعف عرض النطاق أو حسّن النسبة — لا طريق ثالث.",
          en: "Every medium attacks your signal in three ways, and understanding them explains most cabling industry decisions:\n\n- Attenuation: the signal loses strength as it travels — exactly like a voice fading with distance. Copper loses more, fiber far less; hence copper's 100-meter limit while fiber walks tens of kilometers\n- Noise: foreign signals entering your line from outside sources — electric motors, fluorescent lighting, nearby power cables, even sky lightning\n- Crosstalk: your colleagues' signals in the neighboring wire inside the same cable leaking into yours — the most famous enemy in UTP cables and the very reason for their twisting\n\nThe battle's outcome is measured as the Signal-to-Noise Ratio (SNR): the higher it lives, the healthier the communication. Every Ethernet cable evolution from Cat5e to Cat8 is at heart a history of victories over attenuation and crosstalk — tighter twists, better shielding, higher frequencies.\n\nShannon's law sets the ceiling of truth for everyone: maximum error-free data rate = bandwidth × log(1 + SNR). Practical translation: double the bandwidth or improve the ratio — there is no third way.",
        },
      },
      {
        heading: { ar: "عرض النطاق والإنتاجية والمُنتَج الصافي", en: "Bandwidth, Throughput, and Goodput" },
        table: {
          caption: { ar: "مفردات عالم الإشارات", en: "The vocabulary of the signal world" },
          headers: [
            { ar: "المصطلح", en: "Term" },
            { ar: "معناه", en: "Meaning" },
            { ar: "قيمة مثال", en: "Example value" },
          ],
          rows: [
            [
              { ar: "التردد Frequency", en: "Frequency" },
              { ar: "عدد دورات الموجة في الثانية", en: "Wave cycles per second" },
              { ar: "2.4 GHz", en: "2.4 GHz" },
            ],
            [
              { ar: "عرض النطاق Bandwidth", en: "Bandwidth" },
              { ar: "مدى الترددات المتاح لقناة واحدة", en: "The frequency span available to one channel" },
              { ar: "قناة 20 MHz", en: "A 20 MHz channel" },
            ],
            [
              { ar: "dBm", en: "dBm" },
              { ar: "قوة الإشارة لوغاريتمياً نسبة إلى ميلي واط", en: "Signal power in log scale relative to 1 mW" },
              { ar: "-67 dBm", en: "-67 dBm" },
            ],
            [
              { ar: "SNR", en: "SNR" },
              { ar: "نسبة قوة الإشارة إلى الضجيج", en: "Signal power versus noise power" },
              { ar: "25 dB", en: "25 dB" },
            ],
            [
              { ar: "Baseband", en: "Baseband" },
              { ar: "إرسال نبضات رقمية على التردد الأصلي", en: "Digital pulses on the native frequency" },
              { ar: "الإيثرنت Ethernet", en: "Ethernet" },
            ],
            [
              { ar: "Broadband", en: "Broadband" },
              { ar: "تقطيف إشارات على عدة حوامل ترددية", en: "Modulating signals onto several carriers" },
              { ar: "كابل التلفاز CATV", en: "Cable TV (CATV)" },
            ],
          ],
        },
        body: {
          ar: "ثلاثة مصطلحات يخلطها الناس يومياً وتفصل بينها عقود من الدقة:\n\n- عرض النطاق (Bandwidth): السعة النظرية القصوى للوصلة — عرض الطريق نفسه. نقيسها بت في الثانية (والمعايير تصف ترددات الكابل بالميجاهرتز، وهي سعة الموجات التي يحملها بسلام)\n- الإنتاجية (Throughput): ما يمر فعلاً في لحظة معينة — السيارات التي تقطع الطريق الآن. تقل دوماً عن النطاق بسبب الترويسات والبروتوكولات والازدحام\n- المُنتَج الصافي (Goodput): البيانات المفيدة الصافية فقط — الركاب فعلاً، بعد استبعاد الشاحنات الفارغة (الترويسات وإعادة الإرسال والتأكيدات)\n\nتشبيه يثبت في الذهن: طريق بثلاث مسارات (نطاق 3) يمر به الآن مسار ونصف (إنتاجية) تقل حين تصل تصل ركابه الصافيون (مُنتَج).\n\n- وعد البائع على علبة الكابل = عرض نطاق\n- قياس iperf بين جهازين = إنتاجية\n- حجم الملف المنقول فعلاً ÷ الزمن = أقرب قياس للمُنتَج الصافي\n\nومصطلح تاريخي مهم: النطاق الأساسي (Baseband) يعني استخدام الوسط كله لإشارة واحدة كما يفعل الإيثرنت — ومنه حرف B في 10BASE — بينما النطاق العريض (Broadband) يقسم الوسط قنوات متعددة متوازية (كالتلفاز الكبلي والإنترنت عبره).",
          en: "Three terms people mix daily, separated by decades of precision:\n\n- Bandwidth: the link's theoretical maximum capacity — the width of the road itself. We measure it in bits per second (while cable standards describe frequencies in MHz, the wave capacity it carries cleanly)\n- Throughput: what actually passes at a given moment — the cars crossing the road right now. Always below bandwidth due to headers, protocols, and congestion\n- Goodput: the net useful data — the actual passengers, after excluding the empty trucks (headers, retransmissions, acknowledgments)\n\nA mind-anchoring analogy: a three-lane road (bandwidth 3) currently flowing at one and a half lanes (throughput) whose actual passenger count is lower (goodput).\n\n- The vendor's promise on the cable box = bandwidth\n- An iperf measurement between two machines = throughput\n- Actually transferred file size ÷ time = the closest goodput measure\n\nAnd an important historical term: baseband means using the entire medium for one signal as Ethernet does — hence the B in 10BASE — while broadband divides the medium into multiple parallel channels (as cable TV and its Internet do).",
        },
        tip: {
          ar: "عند اتهام شبكة بالبطء: قس أولاً بالإنتاجية الفعلية (iperf) ثم قارنها بالسعة الموعدة — التشخيص يبدأ من الفجوة بين الرقمين.",
          en: "When blaming a network for slowness: first measure actual throughput (iperf) then compare against the promised capacity — diagnosis starts from the gap between the two numbers.",
        },
      },
    ],
    keyPoints: [
      { ar: "الإشارة تناظرية متصلة أو رقمية متقطعة، والترميز يربط نمط الموجة بالبتات", en: "A signal is smooth analog or discrete digital; encoding binds the wave pattern to bits" },
      { ar: "أعداء الإشارة: التوهين مع المسافة، والضجيج الخارجي، والتشابك من الجيران", en: "The signal's enemies: attenuation over distance, external noise, and neighboring crosstalk" },
      { ar: "SNR نسبة الإشارة للضجيج تحدد جودة الوصلة، وقانون شانون يسقف المعدل", en: "SNR determines link quality; Shannon's law caps the achievable rate" },
      { ar: "النطاق سعة نظرية، والإنتاجية ما يمر فعلاً، والمُنتَج الصافي بيانات مفيدة فقط", en: "Bandwidth is capacity, throughput is actual flow, goodput is useful data only" },
      { ar: "Baseband = الوسط كله لإشارة واحدة (إيثرنت)؛ Broadband = قنوات متوازية", en: "Baseband = the whole medium for one signal (Ethernet); Broadband = parallel channels" },
    ],
    commands: [
      { cmd: "ethtool eth0", desc: { ar: "عرض سرعة الوصلة المتفاوض عليها فعلياً وثنائيتها", en: "Show the actually negotiated link speed and duplex" } },
      { cmd: "iperf3 -c 192.168.1.50", desc: { ar: "قياس الإنتاجية الفعلية للوصلة بين جهازين (شغل الخادم بـ iperf3 -s)", en: "Measure actual link throughput between two hosts (run the server side with iperf3 -s)" } },
      { cmd: "ethtool -S eth0 | grep -i error", desc: { ar: "عدادات أخطاء الإشارة على بطاقة الشبكة — أثر التوهين والضجيج", en: "Signal error counters on the NIC — the footprint of attenuation and noise" } },
    ],
    quiz: [
      {
        q: { ar: "ما الظاهرة التي تصف فقدان الإشارة لقوتها مع ازدياد المسافة؟", en: "Which phenomenon describes a signal losing strength with distance?" },
        options: [
          { ar: "التشابك Crosstalk", en: "Crosstalk" },
          { ar: "التوهين Attenuation", en: "Attenuation" },
          { ar: "الانعكاس Reflection", en: "Reflection" },
          { ar: "التضمين Modulation", en: "Modulation" },
        ],
        correct: 1,
        explain: { ar: "التوهين هو الضعف التدريجي مع المسافة — وهو سبب حد النحاس بمئة متر بينما تتفوق الألياف.", en: "Attenuation is the gradual weakening with distance — the reason copper is capped at 100 meters while fiber excels." },
      },
      {
        q: { ar: "اشترى أحدهم وصلة موعودة بـ 1000 ميجابت ثم قاس نقل ملف فحصل على 880 ميجابت صافية — أي مصطلح وصف قياسه؟", en: "Someone bought a link rated 1000 Mbps then measured a file transfer getting 880 Mbps net — which term described his measurement?" },
        options: [
          { ar: "عرض النطاق", en: "Bandwidth" },
          { ar: "الإنتاجية أو أقرب للمُنتَج الصافي", en: "Throughput, or closest to goodput" },
          { ar: "التردد", en: "Frequency" },
          { ar: "الممانعة", en: "Impedance" },
        ],
        correct: 1,
        explain: { ar: "النطاق هو الوعد النظري؛ ما قاسه هو ما مر فعلاً من بيانات مفيدة — إنتاجية ومُنتَج صافي لا سعة.", en: "Bandwidth is the theoretical promise; what he measured is actual useful data passing — throughput and goodput, not capacity." },
      },
      {
        q: { ar: "التشابك (Crosstalk) يحدث عندما:", en: "Crosstalk happens when:" },
        options: [
          { ar: "يضعف الكابل مع المسافة", en: "The cable weakens over distance" },
          { ar: "يتسرب تداخل من سلك مجاور داخل الكابل نفسه", en: "Interference leaks from a neighboring wire within the same cable" },
          { ar: "يقطع الموصل الاتصال كلياً", en: "The connector severs the connection entirely" },
          { ar: "ترتد الإشارة عن موصل سيئ", en: "The signal bounces off a bad connector" },
        ],
        correct: 1,
        explain: { ar: "التشابك جيران داخل البيت: أزواج متجاورة تتسرب فيما بينها — ولفّها المزدوج ولحمة الدفاع الأولى ضده.", en: "Crosstalk is neighbors inside the home: adjacent pairs leaking into each other — their twisting is the first line of defense." },
      },
      {
        q: { ar: "حرف B في تسمية 10BASE-T يشير إلى:", en: "The letter B in 10BASE-T stands for:" },
        options: [
          { ar: "Binary ثنائي", en: "Binary" },
          { ar: "Baseband: الوسط كله لإشارة واحدة", en: "Baseband: the whole medium for a single signal" },
          { ar: "Broadband قنوات متعددة", en: "Broadband multi-channel" },
          { ar: "Buffer مخزن مؤقت", en: "Buffer" },
        ],
        correct: 1,
        explain: { ar: "إيثرنت ينطق بأسلوب النطاق الأساسي: كل الوسط لإشارته وحده — بعكس تقنيات الـ Broadband المقسمة قنوات.", en: "Ethernet speaks baseband style: the whole medium for its signal alone — unlike Broadband technologies divided into channels." },
      },
    ],
  },
  {
    id: "l022",
    moduleId: "m03",
    order: 2,
    level: "beginner",
    title: { ar: "كابلات UTP وفئاتها: من Cat5e إلى Cat8", en: "UTP Cables & Categories: Cat5e to Cat8" },
    summary: {
      ar: "بنية الكابل المجدول الشهير، وجدول الفئات الكامل بسرعاتها وتردداتها، ومتى تدفع أكثر مقابل فئة أعلى.",
      en: "The anatomy of the famous twisted-pair cable, the full category table with speeds and frequencies, and when paying more is worth it.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "بنية UTP: لماذا اللفّ المزدوج عبقرية؟", en: "UTP Anatomy: Why Twisting Is Genius" },
        tip: {
          ar: "اللفّ المزدوج ليس زينة: كل زوج ملتف يلغي تشويش التداخل الكهرومغناطيسي عن نفسه — لذا حافظ على اللف حتى نقطة الضغط في الموصل.",
          en: "The twist is not decoration: each twisted pair cancels electromagnetic interference on itself — keep the twist right up to the crimp point.",
        },
        body: {
          ar: "زوج مجدول غير محجب (UTP: Unshielded Twisted Pair) هو نجم الشبكات المحلية: داخل غلاف بلاستيكي تسكن أربعة أزواج من أسلاك النحاس، كل زوجين ملتفين حول بعضهما باتجاهين متعاكسين وخطوات لفّ محسوبة، والمجموع ثمانية أسلاك تُقوى في موصل RJ45.\n\nلماذا اللفّ أصلاً؟ السبب إلكتروني أنيق: التشويش الخارجي يصيب كلا السلكين المتجاورين بالتقريب نفسه، لكن لأن كل سلك يتبادل موضعه (مرة قريب من مصدر الضجيج ومرة بعيد) كل نصف لفة، يُلغى الفرق بين السلكين في الرياضيات، فيسقط التشويش عند استقبال الإشارة تفاضلياً.\n\n- كلما زادت كثافة اللفّ (لفات أكثر لكل متر) تحمل الزوج ترددات أعلى بلا تشابك — وهذا جوهر الفرق بين الفئات\n- الأزواج الأربعة ملفوفة بمنحنيات مختلفة الطول حتى لا تتزامن أوضاعها فتزيد التشابك البيني\n- هذه الحيلة تمنح UTP حصانة جيدة بلا أي حجب معدني — وهو سر رخصه وانتشاره",
          en: "Unshielded Twisted Pair (UTP) is the star of local networks: inside a plastic jacket live four copper pairs, each two wires twisted around each other with opposite orientation and calculated twist rates, totaling eight wires terminated in an RJ45 connector.\n\nWhy twist at all? The reason is elegantly electronic: external interference hits both adjacent wires nearly equally, but because each wire swaps position (once near the noise source, once far) every half twist, the difference between the wires mathematically cancels, and the noise drops when the signal is received differentially.\n\n- The denser the twist (more twists per meter), the higher the frequencies a pair carries without crosstalk — the essence of category differences\n- The four pairs use different twist lengths so their positions never synchronize, reducing pair-to-pair crosstalk\n- This trick grants UTP good immunity with zero metallic shielding — the secret of its cheapness and spread",
        },
      },
      {
        heading: { ar: "جدول الفئات الرسمي", en: "The Official Category Table" },
        table: {
          caption: { ar: "فئات UTP من Cat5e إلى Cat8", en: "UTP categories from Cat5e to Cat8" },
          headers: [
            { ar: "الفئة", en: "Category" },
            { ar: "عرض النطاق", en: "Bandwidth" },
            { ar: "السرعة القصوى", en: "Max speed" },
            { ar: "المسافة القصوى", en: "Max distance" },
          ],
          rows: [
            [
              { ar: "Cat5e", en: "Cat5e" },
              { ar: "100 MHz", en: "100 MHz" },
              { ar: "1 Gbps", en: "1 Gbps" },
              { ar: "100 m", en: "100 m" },
            ],
            [
              { ar: "Cat6", en: "Cat6" },
              { ar: "250 MHz", en: "250 MHz" },
              { ar: "1 Gbps (و10G حتى 55 m)", en: "1 Gbps (10G up to 55 m)" },
              { ar: "100 m", en: "100 m" },
            ],
            [
              { ar: "Cat6a", en: "Cat6a" },
              { ar: "500 MHz", en: "500 MHz" },
              { ar: "10 Gbps", en: "10 Gbps" },
              { ar: "100 m", en: "100 m" },
            ],
            [
              { ar: "Cat7", en: "Cat7" },
              { ar: "600 MHz", en: "600 MHz" },
              { ar: "10 Gbps — محجوب بالكامل S/FTP", en: "10 Gbps — fully shielded S/FTP" },
              { ar: "100 m", en: "100 m" },
            ],
            [
              { ar: "Cat8", en: "Cat8" },
              { ar: "2000 MHz", en: "2000 MHz" },
              { ar: "25/40 Gbps", en: "25/40 Gbps" },
              { ar: "30 m فقط (مراكز البيانات)", en: "30 m only (datacenters)" },
            ],
          ],
        },
        body: {
          ar: "معيار TIA/EIA-568 هو المرجع الذي يصنف فئات كابلات الزوج المجدول. هذا الجدول يستحق الحفظ الحرفي:\n\n- Cat5e (enhanced): ترددات حتى 100 ميجاهرتز — جيجابت واحد حتى 100 متر — الحد الأدنى المقبول اليوم\n- Cat6: حتى 250 ميجاهرتز — جيجابت حتى 100 متر، و10 جيجابت حتى 55 متراً تقريباً (حسب ظروف التشابك الخارجي)\n- Cat6a (augmented): حتى 500 ميجاهرتز — 10 جيجابت كاملة حتى 100 متر — سيد شبكات المكاتب الحديثة\n- Cat7 / Cat7a: حتى 600 / 1000 ميجاهرتز — شبه محجبة بالكامل S/FTP وتتطلب موصلات خاصة غير RJ45 (GG45 أو TERA) — لاحظ أن TIA لم تعتمدهما رسمياً؛ هما معيار ISO\n- Cat8: حتى 2000 ميجاهرتز (2 جيجاهرتز) — 25/40 جيجابت حتى 30 متراً فقط — مخصصة لمراكز البيانات ووصلات الطاقة القصيرة بين الخزانات\n\nلاحظ عمودين يخلطهما الناس: التردد (ميجاهرتز) سعة الموجات، والسرعة (جيجابت) معدل البيانات — الصناعة تلجأ لترميزات ذكية لتسريع البيانات فوق تردد الكابل نفسه، لهذا يحقق Cat6a عشرة أضعاف Cat5e بتردد خمسة أضعاف فقط.",
          en: "The TIA/EIA-568 standard is the reference classifying twisted-pair categories. This table deserves verbatim memorization:\n\n- Cat5e (enhanced): frequencies up to 100 MHz — one gigabit up to 100 m — today's acceptable minimum\n- Cat6: up to 250 MHz — gigabit up to 100 m, and 10 gigabit up to about 55 m (depending on alien crosstalk conditions)\n- Cat6a (augmented): up to 500 MHz — full 10 gigabit up to 100 m — the master of modern office networks\n- Cat7 / Cat7a: up to 600 / 1000 MHz — fully shielded S/FTP requiring special non-RJ45 connectors (GG45 or TERA) — note TIA never ratified them; they are ISO standards\n- Cat8: up to 2000 MHz (2 GHz) — 25/40 gigabit up to 30 meters only — built for datacenters and short rack-to-rack runs\n\nNotice the two columns people confuse: frequency (MHz) is wave capacity, while speed (Gbps) is the data rate — the industry deploys smart coding to push data faster over the same cable frequency, which is how Cat6a achieves ten times Cat5e with only five times the frequency.",
        },
        tip: {
          ar: "قاعدة قرار سريعة للمكاتب: Cat6a لكل تمديد جديد — فارق سعته عن Cat6 قليل الثمن اليوم يجعلك جاهزاً لعقد قادم كامل.",
          en: "A quick office decision rule: Cat6a for every new installation — the small price gap versus Cat6 today readies you for a full coming decade.",
        },
      },
      {
        heading: { ar: "العائلة المحجوبة: متى تحتاج درعاً؟", en: "The Shielded Family: When Do You Need Armor?" },
        body: {
          ar: "حين يشتد الضجيج البيئي (مصانع، مستشفيات بأجهزة طبية، قرب كابلات الطاقة، استوديوهات) تنتقل إلى الأخوات المحجوبة، ويقرأ نظام تسميتها من اليسار للخط المائل:\n\n- U/UTP: لا حجب إطلاقاً (القياسية)\n- F/UTP: رقائق احباط تحجب الكابل كله تحت غلاف\n- U/FTP: كل زوج محجوب بورق احباطه\n- S/FTP: درع نحاسي مضفور للكابل + احباط لكل زوج — أعلى حماية (سينمائية في Cat7)\n\n(الحرف الأول: حجب الكابل الكلي؛ الثاني: حجب الأزواج — U بلا، F احباط Foil، S مضفور Screen)\n\n- الحجب بلا تأريض صحيح يتحول إلى هوائي يستقبل الضجيج ويعيد بثه للأسلاك! — قاعدة: كل كابل محجوب يحتاج تأريضاً مستمراً من طرفيه\n- غلاف الكابل يوصف بحروف بعد النبالة: CM عام، CMP (Plenum) مقاوم لهب ودخان لمجاري التكييف، CMR رأسي للآبار، LSZH بلا هالوجينات مدخنة",
          en: "When environmental noise intensifies (factories, hospitals with medical equipment, proximity to power cables, studios) you move to the shielded sisters, and their naming system reads left of the slash:\n\n- U/UTP: no shielding at all (the standard)\n- F/UTP: foil shielding the whole cable beneath the jacket\n- U/FTP: each pair shielded in its own foil\n- S/FTP: braided copper screen around the cable + foil per pair — maximum protection (standard in Cat7)\n\n(First letter: overall cable shield; second: pair shielding — U none, Foil, braided Screen)\n\n- Shielding without proper grounding turns into an antenna receiving noise and re-radiating it into the wires! — rule: every shielded cable needs continuous grounding at its ends\n- The jacket earns letters of its own: CM general, CMP (Plenum) flame-and-smoke rated for HVAC ducts, CMR riser for vertical shafts, LSZH halogen-free",
        },
      },
      {
        heading: { ar: "قرار الشراء: العقل قبل الغريزة", en: "The Purchase Decision: Mind Over Instinct" },
        body: {
          ar: "في المتجر سيسألك البائع: أي فئة تشتري؟ قرار احترافي يوازن أربعة عوامل:\n\n- تطبيقات اليوم: ما سرعة معداتك الفعلية؟ جيجابت معظم المكاتب — Cat5e يكفيها نظرياً لكن عمره التشغيلي انتهى عملياً\n- المستقبل المنظور: هل ستشتري معدات 10 جيجابت خلال 5 سنوات؟ الكابل أصعب ما يُستبدل في المبنى (داخل الجدران والأسقف)\n- البيئة: ضجيج عالٍ؟ مسافات قصيرة في مركز بيانات؟ احسب الحجب و Cat8\n- الميزانية: فرق السعر بين الفئات تقلص كثيراً — بينما كلفة إعادة التمديد لاحقاً مضاعفة\n\nالحكمة الشبكية الراسخة: الكابلات تحفر في الخرسانة، والمعدات تتبدل كل ثلاث سنوات — اشتر للأبعد أمداً تستطيعه. الفئة الأعلى ليست تبذراً؛ إنها بوليصة تأمين زمنية.",
          en: "At the store the seller will ask: which category? A professional decision balances four factors:\n\n- Today's applications: what is your equipment's actual speed? Most offices run gigabit — Cat5e covers it theoretically but its operational lifetime is practically over\n- The foreseen future: will you buy 10-gigabit gear within 5 years? Cable is the hardest thing to replace in a building (inside walls and ceilings)\n- The environment: heavy noise? short datacenter runs? compute shielding and Cat8\n- Budget: price gaps between categories have narrowed a lot — while the cost of re-cabling later multiplies\n\nThe entrenched networking wisdom: cables are cast in concrete while equipment refreshes every three years — buy the longest horizon you can afford. The higher category is not extravagance; it is a time insurance policy.",
        },
      },
    ],
    keyPoints: [
      { ar: "UTP = 4 أزواج مجدولة تلغي الضجيج رياضياً بتبادل المواضع كل نصف لفة", en: "UTP = 4 twisted pairs canceling noise mathematically by swapping positions each half twist" },
      { ar: "Cat5e جيجابت/100م، Cat6 عشرة جيجابت/55م، Cat6a عشرة جيجابت/100م، Cat8 أربعون جيجابت/30م", en: "Cat5e gigabit/100m, Cat6 10G/55m, Cat6a 10G/100m, Cat8 40G/30m" },
      { ar: "تسمية الحجب X/Y: الأول للكابل والثاني للأزواج (U بلا، F احباط، S مضفور)", en: "Shield naming X/Y: first letter the cable, second the pairs (U none, F foil, S braid)" },
      { ar: "كابل محجوب بلا تأريض يصبح هوائي ضجيج — التأريض شرط الحماية لا رفاهية", en: "A shielded cable without grounding becomes a noise antenna — grounding is protection's condition, not luxury" },
      { ar: "اشتر الكابل للأبعد أمداً: استبداله داخل الجدران أغلى بكثير من فرق الفئات", en: "Buy cable for the longest horizon: replacing it inside walls costs far more than category gaps" },
    ],
    commands: [
      { cmd: "ethtool eth0", desc: { ar: "تحقق من سرعة الوصلة التي تفاوض عليها كابلك فعلاً مع المبدّل", en: "Verify the speed your cable actually negotiated with the switch" } },
      { cmd: "show interfaces status", desc: { ar: "على مبدّل Cisco: سرعة كل منفذ ونوعه — هل تسير بقدرة الكابل؟", en: "On a Cisco switch: each port's speed and type — are you running at cable capacity?" } },
      { cmd: "lspci | grep -i ethernet", desc: { ar: "لينكس: عرض بطاقات الشبكة المتاحة وقدراتها في جهازك", en: "Linux: list your machine's available NICs and capabilities" } },
    ],
    quiz: [
      {
        q: { ar: "أي فئة تدعم 10 جيجابت لمسافة 100 متر كاملة؟", en: "Which category supports 10 Gbps over a full 100 meters?" },
        options: [
          { ar: "Cat5e", en: "Cat5e" },
          { ar: "Cat6", en: "Cat6" },
          { ar: "Cat6a", en: "Cat6a" },
          { ar: "Cat8", en: "Cat8" },
        ],
        correct: 2,
        explain: { ar: "Cat6a صُمم لهذا الهدف تحديداً (500 ميجاهرتز). أما Cat6 فيتوقف عند ~55 متراً وCat8 عند 30 متراً.", en: "Cat6a was designed precisely for this goal (500 MHz). Cat6 stops at ~55 meters and Cat8 at 30 meters." },
      },
      {
        q: { ar: "ما الغرض الأساسي من لفّ سلكي الزوج حول بعضهما؟", en: "What is the primary purpose of twisting a pair's wires together?" },
        options: [
          { ar: "إطالة الكابل", en: "Making the cable longer" },
          { ar: "إلغاء الضجيج والتداخل الخارجي تفاضلياً", en: "Differentially canceling external noise and interference" },
          { ar: "تجميل المظهر", en: "Improving appearance" },
          { ar: "تقليل وزن النحاس", en: "Reducing copper weight" },
        ],
        correct: 1,
        explain: { ar: "اللفّ يجعل الضجيج يصيب السلكين بالتساوي فيتلاشى فرقهما عند الاستقبال — حيلة إلغاء رياضية بسيطة وعبقرية.", en: "Twisting makes noise hit both wires equally, so their difference vanishes at reception — a simple, genius mathematical cancellation trick." },
      },
      {
        q: { ar: "كابل موصوف S/FTP يعني:", en: "A cable described as S/FTP means:" },
        options: [
          { ar: "بلا أي حجب", en: "No shielding at all" },
          { ar: "درع مضفور للكابل واحباط لكل زوج", en: "A braided screen around the cable plus foil per pair" },
          { ar: "احباط للكابل فقط", en: "Foil around the cable only" },
          { ar: "مخصص للهواء الطلق", en: "Rated for outdoor air" },
        ],
        correct: 1,
        explain: { ar: "القراءة: S = درع مضفور للكابل الكلي، وFTP = احباط لكل زوج — أعلى مستويات الحماية.", en: "Read it as: S = braided overall screen, FTP = foil per pair — the highest protection tier." },
      },
      {
        q: { ar: "أخطأ فريق بتركيب كابل محجوب دون تأريض — النتيجة المرجحة؟", en: "A team installed shielded cable without grounding — the likely outcome?" },
        options: [
          { ar: "أداء مثالي كأنه مؤرض", en: "Perfect performance as if grounded" },
          { ar: "الحجب يلتقط الضجيج ويعيد بثه للأسلاك فيسوء الأداء", en: "The shield collects noise and re-radiates it, worsening performance" },
          { ar: "لا تأثير للحجب أصلاً", en: "Shielding has no effect anyway" },
          { ar: "احتراق الكابل فوراً", en: "The cable instantly burns" },
        ],
        correct: 1,
        explain: { ar: "درع عائم بلا مسار أرضي يتحول إلى هوائي — القاعدة الذهبية: كل حجب يستلزم تأريضاً مستمراً من الطرفين.", en: "A floating shield with no earth path turns into an antenna — the golden rule: every shield demands continuous grounding from both ends." },
      },
    ],
  },
  {
    id: "l023",
    moduleId: "m03",
    order: 3,
    level: "beginner",
    title: { ar: "موصل RJ54... RJ45: ترتيب المسامير والكابلات المستقيمة والمتصالبة", en: "RJ45 & Pinouts: T568A/B, Straight vs Crossover" },
    summary: {
      ar: "ترتيبات T568A وT568B سلكاً سلكاً، ومتى تحتاج كابلاً متصالباً، وكيف قتل Auto-MDIX هذا التقليد.",
      en: "T568A and T568B wiring order wire by wire, when you need a crossover cable, and how Auto-MDIX killed this tradition.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الموصل 8P8C المسمى RJ45", en: "The 8P8C Connector Nicknamed RJ45" },
        body: {
          ar: "الموصل الشفاف في نهاية كل كابل شبكة اسمه الدقيق 8P8C (ثمانية مواضع، ثمانية موصلات)، بينما RJ45 اسم واجهة هاتفية تاريخية التصق به التصاقاً شعبياً. البصمة العملية: ثمانية مسامير نحاسية ذهبية الطلاء تُقرأ من اليسار لليمين عند النظر للموصل بمسمار السلك (Latch) للأسفل.\n\nلماذا يشترط معيار TIA/EIA-568 ترتيبين قياسيين للألوان؟ لأن العشوائية تدمر اللفّ المزدوج: أزواج الإشارات (خصوصاً في الإيثرنت السريع) يجب أن تسافر داخل أزواجها الصحيحة ليعمل الإلغاء التفاضلي. الترتيبان المعتمدان:\n\n- T568A: أبيض-أخضر، أخضر، أبيض-برتقالي، أزرق، أبيض-أزرق، برتقالي، أبيض-بني، بني\n- T568B: أبيض-برتقالي، برتقالي، أبيض-أخضر، أزرق، أبيض-أزرق، أخضر، أبيض-بني، بني\n\nلاحظ أن الاختلاف بينهما تبادل وضعي الزوج الأخضر والبرتقالي فقط — الزوج الأزرق والبني مكانهما ثابت في كليهما. يُشترط الالتزام بترتيب واحد في المنشأة كلها (الأكثر شيوعاً عالمياً: B، بينما A مطلوب أحياناً في مشاريع الحكومة الأمريكية).",
          en: "The transparent connector at the end of every network cable is precisely named 8P8C (eight positions, eight contacts), while RJ45 is a historical telephone interface name that popularly stuck. The practical fingerprint: eight gold-plated copper pins read left to right when looking at the connector with the latch facing down.\n\nWhy does TIA/EIA-568 mandate two standard color orders? Because randomness destroys the twist: signal pairs (especially in Fast Ethernet) must travel inside their correct pairs for differential cancellation to work. The two sanctioned orders:\n\n- T568A: white-green, green, white-orange, blue, white-blue, orange, white-brown, brown\n- T568B: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown\n\nNotice the difference is only swapping the green and orange pair positions — blue and brown stay fixed in both. One scheme must be followed across the entire facility (the global favorite: B, while A is sometimes required in US government projects).",
        },
      },
      {
        heading: { ar: "الكابل المستقيم والمتصالب: فلسفة الإرسال والاستقبال", en: "Straight-Through vs Crossover: The TX/RX Philosophy" },
        table: {
          caption: { ar: "أي كابل بين أي جهازين؟", en: "Which cable between which devices?" },
          headers: [
            { ar: "النوع", en: "Cable type" },
            { ar: "الترتيب في الطرفين", en: "Pinout at both ends" },
            { ar: "يستخدم بين", en: "Use between" },
          ],
          rows: [
            [
              { ar: "مستقيم Straight-Through", en: "Straight-through" },
              { ar: "T568B في الطرفين (أو A في الاثنين)", en: "T568B at both ends (or A at both)" },
              { ar: "جهازين مختلفين: PC ↔ مبدّل", en: "Unlike devices: PC ↔ switch" },
            ],
            [
              { ar: "متقاطع Crossover", en: "Crossover" },
              { ar: "T568A في طرف و T568B في الآخر", en: "T568A one end, T568B the other" },
              { ar: "جهازين متماثلين: مبدّل ↔ مبدّل أو حاسوب ↔ حاسوب", en: "Like devices: switch ↔ switch or PC ↔ PC" },
            ],
            [
              { ar: "Auto-MDIX", en: "Auto-MDIX" },
              { ar: "أي ترتيب — المنفذ يصحح منطقياً", en: "Any pinout — the port corrects it logically" },
              { ar: "كل المنافذ الحديثة — جعل التقاطع شبه مهمل", en: "All modern ports — made crossover near-obsolete" },
            ],
          ],
        },
        body: {
          ar: "في إيثرنت 10/100 ميجابت، يستخدم الجهاز زوجين فقط من الأزواج الأربعة: الزوج البرتقالي (المسامير 1-2) للإرسال TX والزوج الأخضر (3-6) للاستقبال RX. وهنا نشأت مشكلة تاريخية شهيرة:\n\n- جهازان من نوعين مختلفين (حاسوب ومبدّل): مبدّلاً إرسال أحدهما يستقبل الآخر — توصيل مستقيم (نفس الترتيب في الطرفين) يعمل\n- جهازان من نوع واحد (حاسبان معاً، أو مبدلان معاً): إرسال يصطدم بإرسال! الحل التاريخي: كابل متصالب Crossover يجعل طرفه الثاني بترتيب معاكس — الزوج البرتقالي في طرف يذهب للأخضر في الآخر (تبديل 1↔3 و 2↔6)\n\nقاعدة الحفظ القديمة (قبل 2008 تقريباً):\n\n- أجهزة مختلفة = مستقيم Straight-Through\n- أجهزة متشابهة = متصالب Crossover\n\nثم جاء الجيجابت فغيّر اللعبة: 1000BASE-T يستخدم الأزواج الأربعة كلها إرسالاً واستقبالاً في آن واحد (ثنائية كاملة عبر كل زوج)، فالتقسيم القديم فقد معناه.",
          en: "In 10/100 Mbps Ethernet, a device uses only two of the four pairs: the orange pair (pins 1-2) for TX and the green pair (3-6) for RX. Here a famous historical problem was born:\n\n- Two different device types (computer and switch): one's transmitter feeds the other's receiver — a straight-through cable (same order at both ends) works\n- Two same-type devices (two computers, or two switches): transmitter crashes into transmitter! The historical fix: a crossover cable whose second end reverses the order — the orange pair at one end maps to green at the other (swapping 1↔3 and 2↔6)\n\nThe old memorization rule (before roughly 2008):\n\n- Different devices = straight-through\n- Similar devices = crossover\n\nThen Gigabit changed the game: 1000BASE-T uses all four pairs for both transmitting and receiving simultaneously (full duplex over every pair), so the old division lost its meaning.",
        },
      },
      {
        heading: { ar: "Auto-MDIX: التقنية التي أنهت العذاب", en: "Auto-MDIX: The Technology That Ended the Suffering" },
        body: {
          ar: "كل مهندس عجوز يقص أساطير عصر ما قبل Auto-MDIX: خزانة كابلات متصالبة ومستقيمة مرمية بلافتات، وضحايا لا يحصون وقعوا في فخ (كابل خاطئ النوع) في مواقف حرجة.\n\nAuto-MDIX (Automatic Medium-Dependent Interface Crossover) جعل كل منفذ يكتشف تلقائياً أي زوج يرسل الطرف الآخر ويعدّل وضعه: إن رأى إرساله يلتقي إرسال جاره قلب اتجاهه. النتيجة: أي كابل بأي ترتيب يعمل تقريباً مع أي جهازين.\n\n- الشرط الخفي المهم: Auto-MDIX يعمل فقط عندما يكون التفاوض التلقائي (Autonegotiation) مفعّلاً — عطّله يدوياً في طرف فيسقط Auto-MDIX معه غالباً\n- سلوك Cisco المعاصر: مفعّل افتراضياً على المنافذ النحاسية\n- الحكمة العملية اليوم: اصنع/اشتر كل الكابلات مستقيمة بترتيب T568B في الطرفين، وانسَ المتصالب إلا في معامل المتاحف\n\nوتبقى قاعدة صارمة واحدة رغم كل هذا: لا تخلط الترتيبين في الطرفين أبداً إلا عمداً للمتصالب — كابل طرفاه A وB خلطاً غير مقصود هو أخطأ ما يمر عليك (سيمر الفحص الساذج للتوصل ويفشل فحص التشابك الحقيقي).",
          en: "Every veteran engineer tells legends of the pre-Auto-MDIX era: a cabinet of crossover and straight cables with labels, and countless victims of the (wrong cable type) trap in critical moments.\n\nAuto-MDIX (Automatic Medium-Dependent Interface Crossover) made every port automatically detect which pair the other end transmits on and adjust itself: if it sees its transmit meeting its neighbor's transmit, it flips direction. The result: nearly any cable in any orientation works between any two devices.\n\n- The important hidden condition: Auto-MDIX works only when autonegotiation is enabled — manually disable it on one side and Auto-MDIX usually falls with it\n- Modern Cisco behavior: enabled by default on copper ports\n- Today's practical wisdom: make/buy all cables straight with T568B on both ends and forget crossover except in museum labs\n\nOne strict rule survives all this: never mix the two orders at the two ends unintentionally — a cable accidentally terminated A on one end and B on the other is the worst thing you will meet (it passes naive continuity checks and fails real crosstalk testing).",
        },
      },
      {
        heading: { ar: "صناعة الكابل بيدك: طقوس الحرفة", en: "Making the Cable Yourself: Craft Rituals" },
        body: {
          ar: "التثبيت (Crimping) مهارة يدوية لها آدابها — عشر دقائق تعلمها وستغني عن ورشة:\n\n- قصّ الغلاف الخارجي نحو 3 سم بحرص دون جرح العزل الداخلي (سكة الجرح تفسد اللفّ في تلك البقعة)\n- فكّ فتلة اللفّ حتى آخر الغلاف — النحاس المفكوك يسلم لمنع التشابك\n- رتّب الأسلاك بترتيب T568B مسطحةً متجاورة، وقصّ نهاياتها مستوية بطول ~1.4 سم من الغلاف\n- ادفعها في الموصل حتى تلمس جدار النهاية — سترى النحاس عبر الشقوق الأمامية\n- اضغط بأداة Crimp محكمة حتى تسمع صوت دبيس المسامير واستقرار السلك (البلاستيك الحاجز يثبت الغلاف)\n\nأخطاء المبتدئين المميتة: أسلاك بأسنان غير مستوية (واحد لا يصل)، غلاف لم يدخل في موضع التثبيت (ينقطع عند أول شدة)، زوج مفكوك الترتيب (الأسوأ لأنه يمر فحوص التوصل ويفشل في الاستخدام)، وكبس مزدوج بسكين الحجب بأسفل الأداة على موصل غير محجب.",
          en: "Crimping is a manual skill with its etiquette — ten minutes of learning spare you a workshop:\n\n- Strip the outer jacket about 3 cm carefully without scoring the inner insulation (a score mark ruins the twist at that spot)\n- Untwist back to the jacket edge — untwisted copper surrenders to crosstalk\n- Arrange the wires flat and adjacent in T568B order, and trim their tips flush to about 1.4 cm from the jacket\n- Push them into the connector until they touch the end wall — you will see copper through the front slots\n- Squeeze with a firm crimping tool until you hear the pins bite and the strain relief settle\n\nThe beginner's deadly mistakes: wires with ragged lengths (one never reaches), jacket not seated into the strain relief (breaks at the first tug), a pair in wrong order (worst because it passes continuity and fails in use), and double-punching a shielded slot onto an unshielded connector.",
        },
        code: {
          lang: "text",
          snippet: "T568B (الطرفان مستقيمان — الأشهر عالمياً)\nمسمار 1: أبيض-برتقالي   مسمار 5: أبيض-أزرق\nمسمار 2: برتقالي        مسمار 6: أخضر\nمسمار 3: أبيض-أخضر     مسمار 7: أبيض-بني\nمسمار 4: أزرق           مسمار 8: بني\n\nكابل متصالب (تاريخي): طرف T568A والآخر T568B\nالنتيجة: 1↔3 و 2↔6 (البرتقالي والأخضر يتبادلان)",
        },
        tip: {
          ar: "دائماً افحص الكابل الذي صنعت بأداة اختبار سلكية (Wire Map Tester) قبل تركيبه — ثوانٍ توفر ساعتين من التشخيص لاحقاً.",
          en: "Always test your handmade cable with a wire-map tester before installing it — seconds that save two hours of later diagnosis.",
        },
      },
    ],
    keyPoints: [
      { ar: "الموصل الدقيق 8P8C والاسم الشائع RJ45، والترتيب القياسي الأشهر T568B", en: "The precise connector is 8P8C, popularly RJ45, and the most common order is T568B" },
      { ar: "إيثرنت 10/100 يستخدم زوجين فقط: برتقالي (1-2) إرسالاً وأخضر (3-6) استقبالاً", en: "10/100 Ethernet uses only two pairs: orange (1-2) transmit and green (3-6) receive" },
      { ar: "المتصالب يبدّل 1↔3 و2↔6؛ وكان واجباً للأجهزة المتشابهة قبل عصر Auto-MDIX", en: "Crossover swaps 1↔3 and 2↔6; it was mandatory for like devices before Auto-MDIX" },
      { ar: "Auto-MDIX (مع تفعيل التفاوض) جعل الكابل المستقيم حلاً كلياً", en: "Auto-MDIX (with autoneg enabled) made the straight cable a universal solution" },
      { ar: "لا تخلط A وB في طرفين إلا عمداً — الكابل الخليط يفشل تشابكياً ولو مرّ فحص التوصل", en: "Never mix A and B at the ends accidentally — a hybrid cable fails crosstalk even passing continuity" },
    ],
    commands: [
      { cmd: "ethtool eth0", desc: { ar: "بعد تركيب كابلك المصنوع: هل رفع الوصلة أصلاً وبأي سرعة؟", en: "After installing your handmade cable: did the link come up, and at what speed?" } },
      { cmd: "show interfaces status", desc: { ar: "على المبدّل: حالة المنفذ المتصل بكابلك — connected أم notconnect", en: "On the switch: the state of the port your cable serves — connected or notconnect" } },
      { cmd: "show interfaces gigabitethernet 0/5", desc: { ar: "فحص عميق: أخطاء CRC إشارة لكابل رديء الصنع", en: "Deep inspection: CRC errors flagging a poorly made cable" } },
    ],
    quiz: [
      {
        q: { ar: "في ترتيب T568B، ما اللونان على المسامير 1 و2؟", en: "In T568B, which colors sit on pins 1 and 2?" },
        options: [
          { ar: "أبيض-أخضر ثم أخضر", en: "White-green then green" },
          { ar: "أبيض-برتقالي ثم برتقالي", en: "White-orange then orange" },
          { ar: "أزرق ثم أبيض-أزرق", en: "Blue then white-blue" },
          { ar: "أبيض-بني ثم بني", en: "White-brown then brown" },
        ],
        correct: 1,
        explain: { ar: "B يبدأ بالزوج البرتقالي (1-2) ثم الأبيض-الأخضر في 3. بينما A يعكس موضعي الزوجين الأخضر والبرتقالي.", en: "B starts with the orange pair (1-2) then white-green on 3, while A reverses the green and orange pair positions." },
      },
      {
        q: { ar: "الفرق بين ترتيبي T568A وT568B هو:", en: "The difference between T568A and T568B is:" },
        options: [
          { ar: "تبادل موضعي الزوجين البرتقالي والأخضر فقط", en: "Swapping only the orange and green pair positions" },
          { ar: "عكس كامل الترتيب", en: "Reversing the entire order" },
          { ar: "تبديل الأزرق بالبني", en: "Swapping blue with brown" },
          { ar: "لا فرق إطلاقاً", en: "No difference at all" },
        ],
        correct: 0,
        explain: { ar: "A يبدأ بأبيض-أخضر وB بأبيض-برتقالي؛ والزوجان الأزرق (4-5) والبني (7-8) ثابتان في الترتيبين.", en: "A starts with white-green and B with white-orange; the blue (4-5) and brown (7-8) pairs are fixed in both." },
      },
      {
        q: { ar: "متى كان الكابل المتصالب ضرورة تاريخية؟", en: "When was the crossover cable a historical necessity?" },
        options: [
          { ar: "وصل جهازين مختلفي النوع مثل حاسوب بمبدّل", en: "Connecting two different device types like a PC to a switch" },
          { ar: "وصل جهازين متشابهي النوع مثل حاسوبين أو مبدلين", en: "Connecting two similar device types like two PCs or two switches" },
          { ar: "وصل الألياف بالنحاس", en: "Connecting fiber to copper" },
          { ar: "تمديدات تتجاوز 100 متر", en: "Runs exceeding 100 meters" },
        ],
        correct: 1,
        explain: { ar: "المتشابهان يرسلان على المسامير نفسها فيتصادمان؛ المتصالب يوجه إرسال كل منهما لاستقبال الآخر.", en: "Similar devices transmit on the same pins and collide; the crossover routes each one's transmit to the other's receive." },
      },
      {
        q: { ar: "ما الشرط الوظيفي لعمل Auto-MDIX؟", en: "What is the functional condition for Auto-MDIX to work?" },
        options: [
          { ar: "كابل من فئة Cat6 فأعلى", en: "A Cat6 or better cable" },
          { ar: "تفعيل التفاوض التلقائي Autonegotiation", en: "Autonegotiation being enabled" },
          { ar: "سرعة 10 ميجابت فقط", en: "10 Mbps speed only" },
          { ar: "منافذ الألياف الضوئية", en: "Fiber optic ports" },
        ],
        correct: 1,
        explain: { ar: "Auto-MDIX يستند إلى نبضات التفاوض ذاتها؛ تعطيل التفاوض يدوياً يسقطه ويعيدك لعالم الكابلات المتصالبة.", en: "Auto-MDIX builds on autonegotiation pulses themselves; manually disabling negotiation drops it and returns you to the crossover-cable world." },
      },
    ],
  },
  {
    id: "l024",
    moduleId: "m03",
    order: 4,
    level: "beginner",
    title: { ar: "الكابلات المحورية والتسلسلية: قدامى لا يزالون يعملون", en: "Coax & Serial: Old Guards Still on Duty" },
    summary: {
      ar: "بنية الكابل المحوري ودوره اليوم في إنترنت الكابل، والوصلات التسلسلية التاريخية في شبكات WAN وواجهات الإدارة.",
      en: "Coax construction and its modern role in cable Internet, plus the legacy serial links in WANs and management interfaces.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "المحوري: سلك داخل درع داخل غلاف", en: "Coaxial: A Wire Inside a Shield Inside a Jacket" },
        table: {
          caption: { ar: "أنواع الكابل المحوري الشائعة", en: "Common coaxial cable types" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "الموصل", en: "Connector" },
            { ar: "الاستخدام الشائع", en: "Common use" },
          ],
          rows: [
            [
              { ar: "RG-58 (Thinnet)", en: "RG-58 (Thinnet)" },
              { ar: "BNC", en: "BNC" },
              { ar: "إيثرنت 10BASE2 القديم", en: "Legacy 10BASE2 Ethernet" },
            ],
            [
              { ar: "RG-6", en: "RG-6" },
              { ar: "F-type", en: "F-type" },
              { ar: "تلفاز الكابل وإنترنت الكابل", en: "Cable TV and cable Internet" },
            ],
            [
              { ar: "RG-11", en: "RG-11" },
              { ar: "F-type", en: "F-type" },
              { ar: "تركيبات خارجية لمسافات أطول", en: "Outdoor runs over longer distances" },
            ],
            [
              { ar: "RS-232 (تسلسلي)", en: "RS-232 (serial)" },
              { ar: "DB-9", en: "DB-9" },
              { ar: "كونسول إدارة الراوترات والمبدلات", en: "Router and switch management console" },
            ],
          ],
        },
        body: {
          ar: "الكابل المحوري (Coaxial) بنية طبقية متناظرة حول محور واحد — ومنه اسمه: ناقل نحاسي مركزي يحيط به عزل، ثم درع معدني مضفور أو رقائقي، ثم غلاف خارجي. هذا التصميم المتماثل يمنحه مناعة ممتازة للضجيج، لأن الدرع يعمل كقفص فاراداي حول الإشارة.\n\nالمحاور تأتي بمقاومات (Impedance) قياسية تُطابق المعدات: 50 أوم للبيانات والراديو (التاريخية RG-58 و RG-8)، و75 أوم للفيديو والتلفاز والإنترنت الكبلي (RG-59 و RG-6 الأشهر اليوم).\n\n- RG-58 قاد سابقاً شبكات 10BASE2 (إيثرنت المحوري الرفيع) بقطاعات 185 متراً\n- RG-6 هو وتر إنترنت الكابل المنزلي الحديث عبر موجه الكابل (Cable Modem) ومعيار DOCSIS\n\nالموصلات: BNC رأس دوّار بقفل سريع للمحاور الرفيعة، وF-Type برغي بسيط تعرفه من خلف كل جهاز استقبال منزلي — وربما من مزود الإنترنت الكبلي عندك.",
          en: "The coaxial cable is a layered structure symmetrical around one axis — hence its name: a central copper conductor surrounded by insulation, then a braided or foil metallic shield, then the outer jacket. This symmetric design grants it excellent noise immunity because the shield acts as a Faraday cage around the signal.\n\nCoaxes come in standard impedances matched to equipment: 50 ohm for data and radio (the historical RG-58 and RG-8), and 75 ohm for video, TV, and cable Internet (RG-59 and today's favorite RG-6).\n\n- RG-58 once led 10BASE2 networks (thin coax Ethernet) in 185-meter segments\n- RG-6 is the string of modern home cable Internet via the cable modem and the DOCSIS standard\n\nThe connectors: BNC, a twist-lock quick head for thin coax, and the simple screw-on F-Type you know from behind every home receiver — probably from your own cable ISP.",
        },
      },
      {
        heading: { ar: "إيثرنت المحوري: درس تاريخي قيّم", en: "Coaxial Ethernet: A Valuable History Lesson" },
        body: {
          ar: "قبل انتصار النجمة والزوج المجدول، كانت LAN تعيش على المحوري بطوبولوجيا الناقل (Bus):\n\n- 10BASE5 (Thicknet / Thick Ethernet): كابل سميك RG-8 بقطاعات حتى 500 متر، تُوصل الأجهزة بنقر مصائد (Vampire Taps) تخترق الغلاف بأسنان — منظر مهيب وكابلات صلبة تقاوم اللفّ\n- 10BASE2 (Thinnet / Cheapernet): RG-58 أرخص وأمكن حتى 185 متراً، بوصلات T متسلسلة من بطاقة إلى بطاقة، وضرورة إنهاء طرفي السلسلة بـ Terminators مقاومة 50 أوم وإلا ارتدّت الإشارات ودمرت الشبكة\n\nلماذا ماتت هذه الحقبة؟ عيوب قاتلة: قطع واحد يصمت الشبكة كلها، تشخيص جماعي مرهق (مقاطع كثيرة مسلسلة)، وأداء يتراجع مع كل جهاز يضاف. انتصرت النجمة المبنية على الزوج المجدول لأن عطلاً واحداً يعزل وصلة واحدة فقط.\n\nلكن المحوري انتقم انتقاماً جميلاً: صار وسيلة إنترنت واسعة الانتشار عبر DOCSIS — شبكة هجينة ألياف/محورية (HFC) تصل الملايين من البيوت بسرعات تقاسمية عالية (نظرياً حتى عشرات الميجابت لكل مشترك، وبمجموع جيجابت في DOCSIS 3.1).",
          en: "Before the triumph of star and twisted pair, LANs lived on coax with a bus topology:\n\n- 10BASE5 (Thicknet): thick RG-8 cable in segments up to 500 meters, devices attached through vampire taps whose teeth pierce the jacket — an impressive sight with cables stiff enough to resist bending\n- 10BASE2 (Thinnet / Cheapernet): cheaper RG-8 reaching 185 meters, daisy-chained by T-connectors from card to card, with the chain's two ends requiring 50-ohm terminators or the signal reflected back and wrecked the network\n\nWhy did this era die? Fatal flaws: one cut silences the whole network, exhausting collective troubleshooting (many daisy-chained segments), and performance sagging with each added device. Star over twisted pair won because a single fault isolates a single link.\n\nYet coax took beautiful revenge: it became the mass-market Internet medium via DOCSIS — a hybrid fiber/coax (HFC) network reaching millions of homes with high shared speeds (theoretically tens of megabits per subscriber, gigabit-class aggregate in DOCSIS 3.1).",
        },
      },
      {
        heading: { ar: "التسلسلي في شبكات WAN: أزمنة الخطوط المؤجرة", en: "Serial in WANs: The Leased-Line Era" },
        body: {
          ar: "قبل الألياف الرخيصة، ربطت الشركات فروعها بخطوط تسلسلية (Serial) مؤجرة من شركات الهاتف، والمعادلة الكاملة هناك: واجهة تسلسلية على الموجّه + وحدة CSU/DSU تحول النبضات لخط الهاتف + دائرة فيزيائية من المزود.\n\nالأرقام التاريخية الواجبة الحفظ من هذه الحقبة:\n\n- T1: 1.544 ميجابت في الثانية — 24 قناة صوتية × 64 كيلوبت + 8 كيلوبت ترويسة تأطير — معيار أمريكا الشمالية واليابان\n- E1: 2.048 ميجابت في الثانية — 30 قناة × 64 كيلوبت + قناتا توقيت وإشارات — معيار أوروبا والعالم العربي غالباً\n- بروتوكولات نقل الخط: HDLC (افتراضي على Cisco) و PPP المرن بالمصادقة\n\nوعلى منافذ الإدارة التاريخية يجلس RS-232 — الواجهة التسلسلية البيتية العريقة التي منها منفذ Console الأزرق الشهير على كل موجّه: 9600 باود و8 بتات بلا تكافؤ وسطر إيقاف واحد (8N1) — البروتوكول الذي تظل تعرفه رغم عمره نصف قرن.",
          en: "Before cheap fiber, companies tied their branches over leased serial lines from telephone carriers, and the full equation there was: a serial interface on the router + a CSU/DSU converting pulses to the phone line + a physical circuit from the provider.\n\nThe historically required numbers from this era:\n\n- T1: 1.544 Mbps — 24 voice channels × 64 kbps + 8 kbps framing overhead — the North American and Japanese standard\n- E1: 2.048 Mbps — 30 channels × 64 kbps + timing and signaling channels — the European and mostly Arab-world standard\n- Line transport protocols: HDLC (Cisco default) and the flexible authenticated PPP\n\nAnd on the legacy management side sits RS-232 — the venerable home serial interface behind the famous blue Console port on every router: 9600 baud, 8 bits, no parity, one stop bit (8N1) — a protocol you will keep knowing despite its half-century age.",
        },
      },
      {
        heading: { ar: "ماذا ترث من هذه الحقبة اليوم؟", en: "What Do You Inherit From This Era Today?" },
        body: {
          ar: "قد تسأل: لماذا أدرس كابلات ماتت؟ ثلاث إجابات عملية:\n\n- إنترنت الكابل (DOCSIS) يخدم ملايين المنازل حولك — ومهندس الدعم الذي يفهم المحوري وضجيجه وفواصله يشخّص أفضل من أقرانه\n- منافذ Console التسلسلية (RS-232 على USB-C اليوم) هي مفتاح إنقاذ كل موجّه مقفل أو ميت الشبكة — أول مهارة في أي مختبر CCNA\n- خطوط T1/E1 ما زالت تعمل في مبانٍ ومزارع وبنوك نائية حول العالم، والفروق التاريخية تفسر لغز أرقام غريبة ستقابلها\n\nتركت الحقبة أيضاً دروساً معمارية: التقاسم (المحوري ناقل مشترك) ضد التخصص (النجمة وصلة لكل جهاز) — وهو نفس الجدل الذي أعادته لنا شبكات Wi-Fi (وسط مشترك) مرات عدة. التاريخ في الشبكات لا يكرر نفسه لكنه يمشي بخطى متشابهة.",
          en: "You may ask: why study dead cables? Three practical answers:\n\n- Cable Internet (DOCSIS) serves millions of homes around you — and a support engineer who understands coax, its noise, and its splitters outdiagnoses peers\n- Serial console ports (RS-232 over USB-C today) are the rescue key for every locked or network-dead router — the first skill in any CCNA lab\n- T1/E1 lines still run in remote buildings, farms, and banks worldwide, and the historical differences explain strange numbers you will meet\n\nThe era also left architectural lessons: sharing (shared coax bus) versus dedication (star, one link per device) — the very debate Wi-Fi (a shared medium) handed back to us repeatedly. History in networking does not repeat itself, but it walks in similar steps.",
        },
        tip: {
          ar: "احفظ دائماً: T1 = 1.544 و E1 = 2.048 ميجابت. الفرق 24 مقابل 30 قناة 64 كيلوبت — رقمان يسأل عنهما الامتحان دائماً.",
          en: "Always memorize: T1 = 1.544 and E1 = 2.048 Mbps. The difference: 24 versus 30 channels of 64 kbps — two numbers exams always ask about.",
        },
      },
    ],
    keyPoints: [
      { ar: "المحوري بنية متناظرة بمقاومة 50 أوم للبيانات و75 أوم للفيديو وإنترنت الكابل", en: "Coax is a symmetric structure: 50 ohm for data, 75 ohm for video and cable Internet" },
      { ar: "10BASE2/10BASE5: إيثرنت ناقل على محوري بإنهاءات 50 أوم — مات بعيوب الناقل المشترك", en: "10BASE2/10BASE5: bus Ethernet over terminated 50-ohm coax — killed by shared-bus flaws" },
      { ar: "DOCSIS يبعث المحوري اليوم عبر شبكات HFC لخدمة ملايين البيوت", en: "DOCSIS revives coax today via HFC networks serving millions of homes" },
      { ar: "T1 = 1.544 ميجابت (24×64) و E1 = 2.048 ميجابت (30×64) — رقمان تاريخيان خالدان", en: "T1 = 1.544 Mbps (24×64) and E1 = 2.048 Mbps (30×64) — two immortal historical numbers" },
      { ar: "RS-232 حي في منافذ Console: 9600 baud و 8N1 — مفتاح إنقاذ الموجهات", en: "RS-232 lives on in console ports: 9600 baud, 8N1 — the routers' rescue key" },
    ],
    commands: [
      { cmd: "show controllers serial 0/0/0", desc: { ar: "على موجّه Cisco: حالة الواجهة التسلسلية فيزيائياً ونوع الكابل المكتشف", en: "On a Cisco router: the serial interface's physical state and detected cable type" } },
      { cmd: "show interfaces serial 0/0/0", desc: { ar: "إحصاءات الوصلة التسلسلية: أخطاء وقطعات ومدة الاستقرار", en: "Serial link statistics: errors, drops, and uptime" } },
      { cmd: "screen /dev/ttyUSB0 9600", desc: { ar: "لينكس/ماك: فتح جلسة Console على موجّه عبر محول USB-تسلسلي بسرعة 9600", en: "Linux/Mac: open a console session to a router over a USB-serial adapter at 9600" } },
    ],
    quiz: [
      {
        q: { ar: "كابل RG-6 بمقاومة 75 أوم يستخدم اليوم أساساً في:", en: "A 75-ohm RG-6 cable is used today mainly for:" },
        options: [
          { ar: "شبكات LAN السريعة", en: "Fast LAN networks" },
          { ar: "إنترنت الكابل DOCSIS والتلفاز", en: "Cable Internet DOCSIS and television" },
          { ar: "وصلات الألياف طويلة المدى", en: "Long-haul fiber links" },
          { ar: "منافذ Console للموجهات", en: "Router console ports" },
        ],
        correct: 1,
        explain: { ar: "RG-6 وتر شبكات HFC التلفازية وإنترنت الكابل المنزلي عبر موجهات الكابل.", en: "RG-6 is the string of HFC TV networks and home cable Internet through cable modems." },
      },
      {
        q: { ar: "لماذا كانت Terminators بـ 50 أوم إلزامية في شبكات 10BASE2؟", en: "Why were 50-ohm terminators mandatory in 10BASE2 networks?" },
        options: [
          { ar: "لزيادة سرعة الإرسال", en: "To increase transmission speed" },
          { ar: "لمنع ارتداد الإشارة عند أطراف الناقل فتفسد الشبكة", en: "To stop signal reflection at the bus ends which corrupts the network" },
          { ar: "لأنها مجرد زينة صناعية", en: "They were mere industrial decoration" },
          { ar: "لتفريغ الكهرباء الساكنة فقط", en: "Only to drain static electricity" },
        ],
        correct: 1,
        explain: { ar: "ناقل بلا إنهاء مطابق يرتد منه الإشارة كصدى مدمر؛ المقاومة المطابقة تمتص الطاقة عند الطرفين.", en: "An unterminated bus reflects the signal like destructive echo; matched resistance absorbs the energy at both ends." },
      },
      {
        q: { ar: "الفرق بين T1 و E1 هو:", en: "The difference between T1 and E1 is:" },
        options: [
          { ar: "T1 أوروبي و E1 أمريكي", en: "T1 is European and E1 American" },
          { ar: "T1 بـ 24 قناة و 1.544 ميجابت، و E1 بـ 30 قناة و 2.048 ميجابت", en: "T1 has 24 channels at 1.544 Mbps; E1 has 30 channels at 2.048 Mbps" },
          { ar: "لا فرق سوى الاسم", en: "Only the name differs" },
          { ar: "T1 للألياف و E1 للنحاس", en: "T1 for fiber and E1 for copper" },
        ],
        correct: 1,
        explain: { ar: "كلاهما قنوات صوت 64 كيلوبت مجمعة: أمريكا الشمالية 24 قناة، وأوروبا (ومعها غالباً العالم العربي) 30 قناة.", en: "Both bundle 64-kbps voice channels: North America 24 channels, Europe (mostly with the Arab world) 30 channels." },
      },
      {
        q: { ar: "إعدادات منفذ Console القياسية هي:", en: "The standard console port settings are:" },
        options: [
          { ar: "115200 baud و 7 بتات", en: "115200 baud and 7 bits" },
          { ar: "9600 baud و 8N1", en: "9600 baud and 8N1" },
          { ar: "2400 baud بلا توقف", en: "2400 baud with no stop bits" },
          { ar: "يتفاوض تلقائياً مثل الإيثرنت", en: "It autonegotiates like Ethernet" },
        ],
        correct: 1,
        explain: { ar: "9600 باود، 8 بتات بيانات، بلا تكافؤ Parity، سطر إيقاف واحد — البروتوكول الذي وحد كل بائعي الموجهات.", en: "9600 baud, 8 data bits, no parity, one stop bit — the protocol every router vendor converged on." },
      },
    ],
  },
  {
    id: "l025",
    moduleId: "m03",
    order: 5,
    level: "beginner",
    title: { ar: "الألياف الضوئية: النور في قلب الشبكات", en: "Fiber Optics: Light in the Heart of Networks" },
    summary: {
      ar: "كيف يسافر الضوء داخل خيط زجاج أرفع من الشعرة، ولماذا صارت الألياف العمود الفقري لكل شبكة حديثة.",
      en: "How light travels inside a glass thread thinner than hair, and why fiber became the backbone of every modern network.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "بنية الليفة الزجاجية", en: "The Anatomy of a Glass Fiber" },
        body: {
          ar: "الليفة الضوئية (Optical Fiber) خيط زجاجي نقي مذهل: قلب (Core) فائق النقاء يمر فيه الضوء، محاطاً بغلاف (Cladding) زجاج أقل كثافة ضوئية، ثم بطانة واقية (Buffer) وغلاف خارجي متين.\n\nالمعجزة الفيزيائية المسماة الانعكاس الكلي الداخلي (Total Internal Reflection): حين يعبر الضوء من وسط أسرع (القلب، معامل انكسار أعلى) نحو وسط أبطأ (الغلاف) بزاوية مائلة كفاية، لا يخرج منه إطلاقاً — يرتد داخلياً مرات لا تحصى ككرة بلياردو ترتد بين جدارين متوازيين إلى الأبد.\n\n- لهذا يمشي الضوء أميالاً داخل زجاج انحناؤه بلا خروج — الزجاج ليس أنبوباً مجوفاً كما يتوهم الناس، بل قلب مصمت\n- قطر القلب 8-10 ميكرومتر في الأحادية، أو 50/62.5 ميكرومتر في المتعددة — والغلاف دائماً 125 ميكرومتر، فالليفة كلها أرفع من شعرة إنسان بأضعاف\n\nالضوء المستخدم ليس مرئياً: أطوال موجية في تحت الحمراء (850 و 1310 و 1550 نانومتر) تُختار لأن الزجاج يشفّ فيها بأقل امتصاص.",
          en: "An optical fiber is an astonishingly pure glass thread: a core of extreme purity carrying the light, surrounded by cladding of slightly lower optical density, then a protective buffer and a tough outer jacket.\n\nThe physical miracle called Total Internal Reflection: when light crosses from a faster medium (the core, higher refractive index) toward a slower one (the cladding) at a sufficiently oblique angle, it never exits — it reflects internally countless times like a billiard ball bouncing between two parallel walls forever.\n\n- That is why light walks for miles inside bent glass without escaping — the glass is not a hollow tube as people imagine, but a solid core\n- Core diameter is 8-10 micrometers in single-mode, or 50/62.5 micrometers in multimode — with cladding always 125 micrometers, the whole fiber is several times thinner than a human hair\n\nThe light used is not visible: infrared wavelengths (850, 1310, and 1550 nanometers) chosen because glass is most transparent there with minimal absorption.",
        },
      },
      {
        heading: { ar: "منبع الضوء وعين الاستقبال", en: "The Light Source and the Receiving Eye" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة نبضة ضوء عبر الليف الزجاجي", en: "A light pulse's journey through the glass fiber" },
          items: [
            { ar: "المحوّل الكهروضوئي يحوّل البتات نبضات ضوء (ليزر أو LED)", en: "The transceiver turns bits into light pulses (laser or LED)" },
            { ar: "النبضات تسافر في القلب الزجاجي بالانعكاس الكلي", en: "Pulses travel through the glass core by total internal reflection" },
            { ar: "المضخمات تجدد الإشارة كل عشرات الكيلومترات", en: "Amplifiers renew the signal every tens of kilometers" },
            { ar: "المستقبِل الضوئي يعيد البتات إشارة كهربائية", en: "The photodetector turns pulses back into electrical bits" },
          ],
        },
        body: {
          ar: "النظام الضوئي ثنائي: مرسل (Transmitter) يحول الإشارات الكهربائية إلى نبضات ضوء عبر ديود مضيء LED أو ليزر (و VCSEL الوسيط المشهور في المتعددة الأنماط)، ومستقبل (Receiver) يحول الضوء عودة للكهرباء عبر ثنائي ضوئي (Photodiode).\n\nوالقلب التجاري للقصة: وحدات الإرسال والاستقبال القابلة للتبديل الساخن في المبدلات — أشهرها:\n\n- SFP (Small Form-factor Pluggable) للجيجابت — بحجم إصبع\n- SFP+ لعشرة جيجابت، QSFP+ لأربعين، و QSFP28 لمئة جيجابت\n- تُغرس في منفذ واحد وتحمل معها هوية الليفة والطول الموجي والمدى — اشترِ الوحدة المناسبة لمسافتك وادسها فحسب\n\nهذه الوحدات هي سر مرونة الألياف: المنفذ نفسه يخدم 300 متر أو 10 كيلومترات بتغيير وحدة صغيرة. لاحظ أنها تحتوي مرسلاً ومستقبلاً معاً، والكابل ضوئي ثنائي الليفات (ليفة إرسال واعدة + ليفة استقبال واردة).",
          en: "The optical system is a duo: a transmitter converting electrical signals to light pulses via an LED or laser (and the famous middle option VCSEL in multimode), and a receiver converting light back to electricity via a photodiode.\n\nThe commercial heart of the story: hot-swappable transceiver modules in switches — the most famous:\n\n- SFP (Small Form-factor Pluggable) for gigabit — finger-sized\n- SFP+ for ten gigabit, QSFP+ for forty, QSFP28 for a hundred\n- They plug into one port and carry the fiber type, wavelength, and reach identity — just buy the unit matching your distance and insert it\n\nThese modules are fiber's flexibility secret: the same port serves 300 meters or 10 kilometers by swapping a small unit. Note they contain both transmitter and receiver, and duplex fiber cable is a pair (outbound transmit fiber + inbound receive fiber).",
        },
      },
      {
        heading: { ar: "لماذا تنتصر الألياف؟ الحصيلة الكاملة", en: "Why Fiber Wins: The Full Ledger" },
        body: {
          ar: "قارن الألياف بالنحاس في كل بند وستفهم لماذا حكمت العمود الفقري العالمي:\n\n- السعة: عرض نطاق فعلي يبلغ التيرابت في الليفة الواحدة (مع تقنيات متعددة الأطوال) — النحاس يلهث وراء عشرات الجيجابت على أحسن فئاته\n- المسافة: عشرات الكيلومترات بلا مكررات — النحاس يموت عند 100 متر\n- المناعة: لا تتأثر بأي ضجيج كهرومغناطيسي — كابل يمر بجوار محرك قطار ولا يهمس؛ ولهذا تعبر الكابلات البحرية محيطات كاملة\n- الأمان: اعتراضها يتطلب قطعاً فيزيائياً يُكتشف فوراً وينخفض نبوب الإشارة — بعكس الالتقاط اللاسلكي أو التسرب من النحاس\n- الحجم والوزن: نفس سعة ألوف أزواج النحاس في خيوط قليلة خفيفة\n\nوالعجز الواقعي الذي يمنعها من السيطرة المطلقة:\n\n- الكلفة: وحدات الإرسال الضوئية أغلى من منافذ النحاس، والإنهاء الدقيق (اللحام Fusion Splicing أو الموصلات) يتطلب مهارة ومعدات\n- الهشاشة النسبية: انحناءات حادة تفقد الضوء (نصف قطر انحناء أدنى)، وذرة غبار على نهاية تقتل الوصلة — لذا الأغطية الواقية وثيقة ومسح الأطراف بالكحول طقس مقدس\n- القابلية للكسر في التمديدات الخشنة",
          en: "Compare fiber to copper line by line and you will understand why it rules the global backbone:\n\n- Capacity: effective bandwidth reaching terabits per single fiber (with multi-wavelength techniques) — copper pants behind at tens of gigabit on its best categories\n- Distance: tens of kilometers without repeaters — copper dies at 100 meters\n- Immunity: unaffected by any electromagnetic noise — a cable passing beside a train engine does not whisper; hence submarine cables cross entire oceans\n- Security: interception requires a physical cut detected instantly as the signal drops — unlike wireless sniffing or copper leakage\n- Size and weight: the capacity of thousands of copper pairs in a few light threads\n\nAnd the realistic deficits preventing absolute domination:\n\n- Cost: optical transceivers cost more than copper ports, and precise termination (fusion splicing or connectors) demands skill and equipment\n- Relative fragility: sharp bends lose the light (a minimum bend radius), and a speck of dust on a tip kills the link — hence tight protective caps and alcohol-wiping the tips as sacred ritual\n- Breakability in rough installations",
        },
        tip: {
          ar: "قبل توصيل أي ليف: انفخ عن نهايته بهواء مضغوط أو امسحها بمسحة كحول ثم افحصها بعدسة الفحص — أكثر من نصف مشاكل الألياف الميدانية سببها ذرة غبار أو بصمة إصبع.",
          en: "Before mating any fiber: blow the tip with compressed air or wipe it with an alcohol swab, then inspect with a scope — over half of field fiber faults come from a dust speck or a fingerprint.",
        },
      },
    ],
    keyPoints: [
      { ar: "الليفة = قلب زجاجي نقي + غلاف أقل انكساراً، والضوء يسير بالانعكاس الكلي الداخلي", en: "Fiber = a pure glass core + lower-index cladding; light travels by total internal reflection" },
      { ar: "الأطوال الموجية 850/1310/1550 نانومتر تحت حمراء لأن الزجاج أشفّ فيها", en: "The 850/1310/1550 nm infrared wavelengths are chosen for glass transparency" },
      { ar: "وحدات SFP/SFP+/QSFP قابلة للتبديل الساخن تحدد المدى والطول الموجي للمنفذ", en: "Hot-swappable SFP/SFP+/QSFP modules set a port's reach and wavelength" },
      { ar: "انتصارات الألياف: سعة تيرابتية، مسافات كيلومترية، مناعة كهرومغناطيسية كاملة، وأمان اعتراض شبه مستحيل", en: "Fiber victories: terabit capacity, kilometer reaches, total EMI immunity, and near-impossible interception" },
      { ar: "نقاط ضعفها: كلفة الإرسال والإنهاء، حساسية الانحناء، وقتل ذرة الغبار للوصلة", en: "Its weaknesses: transceiver and termination cost, bend sensitivity, and a dust speck killing the link" },
    ],
    commands: [
      { cmd: "show interfaces status", desc: { ar: "على مبدّل حديث: نوع وحدة SFP المركبة في كل منفذ (تظهر في عمود Type)", en: "On a modern switch: the SFP module type installed per port (shown in the Type column)" } },
      { cmd: "ethtool -m eth0", desc: { ar: "لينكس: قراءة معلومات وحدة SFP (DOM) — النوع والطول الموجي والمسافة", en: "Linux: read SFP (DOM) info — type, wavelength, and distance rating" } },
      { cmd: "ethtool eth0", desc: { ar: "التحقق من رفع الوصلة الضوئية وسرعتها بعد التوصيل", en: "Verify the optical link came up and its speed after connection" } },
    ],
    quiz: [
      {
        q: { ar: "الضوء يبقى داخل الليفة بفضل ظاهرة:", en: "Light stays inside the fiber thanks to the phenomenon of:" },
        options: [
          { ar: "الانعكاس الكلي الداخلي بين القلب والغلاف", en: "Total internal reflection between core and cladding" },
          { ar: "التوصيل الكهربائي للزجاج", en: "Electrical conduction of glass" },
          { ar: "المغناطيسية العكسية", en: "Reverse magnetism" },
          { ar: "الانكسار الخارجي الكامل", en: "Complete external refraction" },
        ],
        correct: 0,
        explain: { ar: "فرق معاملي الانكسار يجعل الضوء يرتد داخلياً عند الحد بين القلب والغلاف بزاوية مائلة — سجن ضوئي مثالي.", en: "The refractive index difference makes light reflect internally at the core-cladding boundary at oblique angles — a perfect optical prison." },
      },
      {
        q: { ar: "الأطوال الموجية المستخدمة في الاتصالات الضوئية هي:", en: "The wavelengths used in optical communications are:" },
        options: [
          { ar: "الضوء الأزرق المرئي 450 نانومتر", en: "Visible blue light at 450 nm" },
          { ar: "تحت الحمراء: 850 و 1310 و 1550 نانومتر", en: "Infrared: 850, 1310, and 1550 nm" },
          { ar: "موجات راديو طويلة", en: "Long radio waves" },
          { ar: "الأشعة السينية", en: "X-rays" },
        ],
        correct: 1,
        explain: { ar: "هذه الثلاثية تحت الحمراء هي نقاط الشفافية القصوى للزجاج (فقدان أقل ديسيبل/كم).", en: "This infrared trio marks glass's transparency peaks (lowest dB/km loss)." },
      },
      {
        q: { ar: "أي ميزة أمنية تختص بها الألياف دون النحاس؟", en: "Which security advantage belongs to fiber over copper?" },
        options: [
          { ar: "تشفير مدمج تلقائي", en: "Built-in automatic encryption" },
          { ar: "الاعتراض يتطلب قطعاً فيزيائياً يُرصد فوراً بهبوط الإشارة", en: "Interception requires a physical cut, instantly exposed by signal drop" },
          { ar: "عدم قابلية القطع إطلاقاً", en: "It cannot be cut at all" },
          { ar: "التعتيم الحكومي", en: "Government jamming" },
        ],
        correct: 1,
        explain: { ar: "لا يمكن التقاط إشارة الألياف بلا مساس فيزيائي — وأي مساس يسقط القدرة المستقبلة ويُكتشف.", en: "A fiber's signal cannot be tapped without physical intervention — and any intervention drops received power and gets exposed." },
      },
      {
        q: { ar: "بعد توصيل ليفين جديدين لم ترتفع الوصلة — ما أول ما تفتشه مهنياً؟", en: "After connecting two new fibers the link did not come up — what do you inspect first professionally?" },
        options: [
          { ar: "إعدادات VLAN على المبدّلين", en: "VLAN settings on both switches" },
          { ar: "نظافة نهايات الليفين وترتيب اتجاه الإرسال/الاستقبال", en: "The fiber tips' cleanliness and the transmit/receive orientation" },
          { ar: "برنامج تشغيل المتصفح", en: "The browser driver" },
          { ar: "عنوان IP للمبدّلين", en: "Both switches' IP addresses" },
        ],
        correct: 1,
        explain: { ar: "الغبار وتبديل اتجاه الليفتين (الإرسال في الاستقبال) أشهر سببين لوصلة ضوئية نائمة — فحصهما أولاً.", en: "Dust and swapping the two fibers (transmit into receive) are the two most common causes of a dead optical link — check them first." },
      },
    ],
  },
  {
    id: "l026",
    moduleId: "m03",
    order: 6,
    level: "beginner",
    title: { ar: "أحادية النمط مقابل متعددة الأنماط: قرار الألياف الأكبر", en: "Single-Mode vs Multimode: The Biggest Fiber Decision" },
    summary: {
      ar: "الفرق الفيزيائي بين نوعي الألياف، وجدول OM و OS، وقواعد الاختيار بين حرم ومدى وكلفة.",
      en: "The physical difference between the two fiber types, the OM and OS tables, and the rules for choosing between campus, reach, and cost.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "الفرق الجوهري: قطر القلب", en: "The Core Difference: Diameter" },
        table: {
          caption: { ar: "أحادية النمط مقابل متعددة الأنماط", en: "Single-mode vs multimode" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "أحادية النمط SM", en: "Single-mode SM" },
            { ar: "متعددة الأنماط MM", en: "Multimode MM" },
          ],
          rows: [
            [
              { ar: "قطر القلب", en: "Core diameter" },
              { ar: "8-10 ميكرومتر", en: "8-10 µm" },
              { ar: "50 أو 62.5 ميكرومتر", en: "50 or 62.5 µm" },
            ],
            [
              { ar: "الطول الموجي", en: "Wavelength" },
              { ar: "1310 / 1550 nm", en: "1310 / 1550 nm" },
              { ar: "850 / 1300 nm", en: "850 / 1300 nm" },
            ],
            [
              { ar: "مصدر الضوء", en: "Light source" },
              { ar: "ليزر Laser", en: "Laser" },
              { ar: "LED أو VCSEL", en: "LED or VCSEL" },
            ],
            [
              { ar: "المسافة", en: "Distance" },
              { ar: "حتى 100+ كم", en: "Up to 100+ km" },
              { ar: "حتى 550 m تقريباً", en: "Up to roughly 550 m" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best use" },
              { ar: "الأعمدة الفقرية والاتصالات البعيدة", en: "Backbones and long-haul links" },
              { ar: "داخل المباني ومراكز البيانات", en: "In-building and datacenter runs" },
            ],
          ],
        },
        body: {
          ar: "كل قرار الألياف يتفرع من رقم واحد: قطر القلب.\n\n- الأحادية النمط (SMF: Single-Mode Fiber): قلب 8-10 ميكرومتر أرفع من الخيط — أدق من أن يحتمل أكثر من مسار ضوئي واحد، فيسير شعاع الليزر مستقيماً متجانساً كليزر متوازٍ\n- المتعددة الأنماط (MMF: Multimode Fiber): قلب 50 أو 62.5 ميكرومتر أعرض — يستوعب مئات المسارات (الأنماط) للضوء نفسه: بعضها ينعطف بزوايا أضيق وبعضها أوسع، فيصل بعضها قبل بعض\n\nوهذه النقطة هي عقبة المتعددة الكبرى المسماة التشتت النمطي (Modal Dispersion): نبضة واحدة تدخل فتتشتت رحلاتها، فتصل مشوهة ممطوطة عند البعد — يضعُف البعد الأقصى إلى مئات الأمتار فقط.\n\nالأحادية لا تعاني هذا أصلاً (نمط واحد فلا تشتت نمطي) فتمشي 10-80 كيلومتراً وأبعد مع الليزر البعيد (1550 نانومتر). الحسم الواقعي: قلبك صغير تدفع ليزراً أدق أغلى، وقلبك كبير تقتنع ببعد أقصر مقابل بثاث أرخص.",
          en: "The entire fiber decision branches from one number: core diameter.\n\n- Single-Mode Fiber (SMF): an 8-10 micrometer core thinner than thread — too fine to host more than one light path, so the laser beam travels uniformly straight like a parallel laser\n- Multimode Fiber (MMF): a 50 or 62.5 micrometer core — wide enough to host hundreds of paths (modes) for the same light: some bounce at tighter angles, some wider, arriving at different times\n\nAnd this is MMF's big obstacle called modal dispersion: a single pulse enters, its journeys scatter, and it arrives distorted and stretched over distance — collapsing the maximum reach to mere hundreds of meters.\n\nSingle-mode never suffers this at all (one mode, no modal dispersion), so it walks 10-80 kilometers and beyond with long-reach lasers (1550 nm). The real-world trade: a small core means paying for a pricier precision laser; a big core means accepting shorter reach for cheaper transceivers.",
        },
      },
      {
        heading: { ar: "جدولا OM و OS: لغة السوق الرسمية", en: "The OM and OS Tables: The Market's Official Language" },
        body: {
          ar: "المتعددة تصنف بفئات OM (Optical Mode) — احفظ الأرقام المفيدة عند 10 جيجابت:\n\n- OM1 (62.5 ميكرومتر، برتقالي الغلاف): ~33 متراً عند 10G — تراثي\n- OM2 (50 ميكرومتر): ~82 متراً — تراثي\n- OM3 (50 ميكرومتر، فيروزي الغلاف): 300 متر — اللون البحري المميز لألياف مراكز البيانات\n- OM4 (الفيروزي أيضاً): 550 متراً — ببصمة حمراء وربما لضمان أعلى\n- OM5 (الفيروزي الجديد): مثل OM4 ويضاف له استخدام أطوال موجة متعددة (SWDM بين 850-953 نانومتر)\n\nوالأحادية تصنف بـ OS:\n\n- OS1 (أصفر... بل إن الغلاف الأصفر للأحادية عموماً): فقدان 1.0 ديسيبل/كم — للتطبيقات الداخلية\n- OS2: فقدان 0.4 ديسيبل/كم — للتمديدات الخارجية الطويلة\n\nأما الوحدات فتخاطبك بأسمائها: SR تعني Short Reach على متعددة، و LR طويل على أحادية (10 كم)، و ER أطول (40 كم). أشهر ثنائية مبتدئة: 10GBASE-SR على OM3/OM4 داخل المبنى، و 10GBASE-LR على OS2 بين المباني.",
          en: "Multimode is classified in OM (Optical Mode) grades — memorize the useful 10G figures:\n\n- OM1 (62.5 micrometers, orange jacket): ~33 meters at 10G — legacy\n- OM2 (50 micrometers): ~82 meters — legacy\n- OM3 (50 micrometers, aqua jacket): 300 meters — the distinctive sea color of datacenter fiber\n- OM4 (also aqua): 550 meters — with a red imprint or higher guarantee\n- OM5 (the new aqua): like OM4 plus multi-wavelength use (SWDM between 850-953 nm)\n\nSingle-mode is classified in OS:\n\n- OS1: 1.0 dB/km loss — for indoor applications\n- OS2: 0.4 dB/km loss — for long outdoor installations\n\n(And single-mode jackets are yellow as a rule, while multimode run orange or aqua.)\n\nThe modules address you by their names: SR means Short Reach over multimode, LR long over single-mode (10 km), ER even longer (40 km). The most famous starter pair: 10GBASE-SR on OM3/OM4 within a building, and 10GBASE-LR on OS2 between buildings.",
        },
      },
      {
        heading: { ar: "الموصلات ونهايات القصة", en: "Connectors and the Story's Ends" },
        body: {
          ar: "تتعرف الألياف عند نهاياتها بموصلات صغيرة قياسية:\n\n- LC (Latching Connector): الأشهر اليوم — صغير بحجم نصف RJ45، بقفل صغير، يثبت ثنائياً (ليفتان في قالب واحد)\n- SC (Subscriber Connector): المربع الضخم نسبياً ذو الدفع والسحب — يسرق ابتسامة المستخدمين ببساطته\n- ST (Straight Tip): بايونيتي توّاء قديم تراه في التركيبات العريقة\n- MPO/MTP: مصفوفة 12 أو 24 ليفة في موصل واحد — العمود الفقري لوصلات 40G/100G المتوازية\n\nعصب عملي لصيانتك: الألياف المتعددة عادة زوج منفصل (ليفة إرسال وضاءة حمراء عند الفحص البصري، وليفة استقبال) — إن لم يرفع طرفٌ الوصلة فجرب قلب الثنائي في ناحية واحدة، فخطأ الاتجاه أشهر خطأ ميداني.\n\nوقاعدة الحفظ اللوني الموثوقة للكابلات الضوئية نفسها: البرتقالي = متعددة تقليدية، الفيروزي = OM3/OM4/OM5، الأصفر = أحادية النمط. لون الغلاف أول فحص تقوم به في أي خزانة مجهولة.",
          en: "You recognize fibers at their ends by small standard connectors:\n\n- LC (Latching Connector): today's favorite — half an RJ45 in size, with a small latch, usually duplexed (two fibers in one body)\n- SC (Subscriber Connector): the relatively chunky square push-pull one — steals smiles with its simplicity\n- ST (Straight Tip): the old twist-on bayonet you meet in veteran installations\n- MPO/MTP: an array of 12 or 24 fibers in a single connector — the backbone of parallel 40G/100G links\n\nA practical nerve for your maintenance: multimode usually runs as a distinct pair (a transmit fiber glowing red under visual inspection, and a receive fiber) — if one end refuses the link, try flipping the pair on one side; reversed orientation is the most common field error.\n\nAnd the reliable color code for the fiber cables themselves: orange = legacy multimode, aqua = OM3/OM4/OM5, yellow = single-mode. The jacket color is the first inspection you run in any unknown cabinet.",
        },
        tip: {
          ar: "قاعدة ميدانية حاسمة: لا تنظر أبداً في نهاية ليفة نشطة — وحدات الإرسال بالأشعة تحت الحمراء غير المرئية لكنها قد تجرح شبكية العين. افحص بالعدسات المخصصة أو العلامات فقط.",
          en: "A critical field rule: never look into the end of an active fiber — infrared transmitters are invisible yet can injure the retina. Inspect only with proper scopes or labels.",
        },
      },
    ],
    keyPoints: [
      { ar: "القلب 8-10 ميكرومتر (أحادية) مقابل 50/62.5 ميكرومتر (متعددة) — كل الاختلاف من هنا", en: "An 8-10 µm core (single-mode) versus 50/62.5 µm (multimode) — all differences flow from here" },
      { ar: "التشتت النمطي في المتعددة يمدد النبضات فيحد البد بمئات الأمتار", en: "Modal dispersion in multimode stretches pulses, capping reach at hundreds of meters" },
      { ar: "OM3 = 300م و OM4 = 550م عند 10G؛ و OS2 يفقد 0.4 ديسيبل/كم فقط", en: "OM3 = 300 m and OM4 = 550 m at 10G; OS2 loses only 0.4 dB/km" },
      { ar: "SR متعددة قصيرة، LR أحادية 10 كم، ER أحادية 40 كم — وحدات تسمي مداها", en: "SR short multimode, LR 10 km single-mode, ER 40 km — modules name their reach" },
      { ar: "الألوان: برتقالي متعددة تقليدية، فيروزي OM3+، أصفر أحادية — و LC الأشهر موصلاً", en: "Colors: orange legacy MMF, aqua OM3+, yellow SMF — with LC the favorite connector" },
    ],
    commands: [
      { cmd: "show interfaces status", desc: { ar: "على المبدّل: أعمدة النوع تكشف SFP-10G-SR (متعددة) مقابل LR (أحادية)", en: "On the switch: the type column reveals SFP-10G-SR (multimode) versus LR (single-mode)" } },
      { cmd: "ethtool -m eth0", desc: { ar: "قراءة بيانات وحدة SFP المركبة: الطول الموجي والنوع ومسافة التصنيف", en: "Read the installed SFP's data: wavelength, type, and rated distance" } },
      { cmd: "show interfaces transceiver", desc: { ar: "على بعض منصات Cisco: جدول وحدات الإرسال المركبة وحالتها", en: "On some Cisco platforms: the installed transceiver table and status" } },
    ],
    quiz: [
      {
        q: { ar: "ألياف OM3 فئة فيروزية تدعم 10 جيجابت حتى:", en: "Aqua OM3 fiber supports 10 Gbps up to:" },
        options: [
          { ar: "33 متراً", en: "33 meters" },
          { ar: "82 متراً", en: "82 meters" },
          { ar: "300 متر", en: "300 meters" },
          { ar: "40 كيلومتراً", en: "40 kilometers" },
        ],
        correct: 2,
        explain: { ar: "OM3 = 300 متر و OM4 = 550 متراً عند 10G على 850 نانومتر — الفيروزي عماد مراكز البيانات.", en: "OM3 = 300 m and OM4 = 550 m at 10G over 850 nm — the aqua backbone of datacenters." },
      },
      {
        q: { ar: "ما الذي يحد البعد الأقصى في الألياف المتعددة الأنماط؟", en: "What limits the maximum distance in multimode fiber?" },
        options: [
          { ar: "التشتت النمطي لمسارات الضوء المتعددة", en: "Modal dispersion of the multiple light paths" },
          { ar: "التوهين الكهربائي", en: "Electrical attenuation" },
          { ar: "انقلاب القطبية الضوئية", en: "Optical polarity inversion" },
          { ar: "حجم الموصل LC", en: "The LC connector size" },
        ],
        correct: 0,
        explain: { ar: "مئات الأنماط تسافر بأطوال مسار مختلفة فتصل النبضة ممطوطة — الأحادية تحسم المشكلة بنمط واحد.", en: "Hundreds of modes travel different path lengths so the pulse arrives stretched — single-mode settles it with one mode." },
      },
      {
        q: { ar: "وحدة 10GBASE-LR على ألياف أحادية النمط تبلغ عادة:", en: "A 10GBASE-LR module over single-mode fiber typically reaches:" },
        options: [
          { ar: "300 متر", en: "300 meters" },
          { ar: "550 متراً", en: "550 meters" },
          { ar: "10 كيلومترات", en: "10 kilometers" },
          { ar: "30 متراً فقط", en: "30 meters only" },
        ],
        correct: 2,
        explain: { ar: "LR = Long Reach: 10 كم على أحادية بطول موجي 1310 نانومتر؛ و ER يمد إلى 40 كم.", en: "LR = Long Reach: 10 km over single-mode at 1310 nm; ER extends to 40 km." },
      },
      {
        q: { ar: "وجدت كابلاً ضوئياً غلافه أصفر في خزانة — توقعك المهني الأول؟", en: "You find a yellow-jacketed fiber cable in a cabinet — your first professional guess?" },
        options: [
          { ar: "متعددة قديمة OM1", en: "Legacy OM1 multimode" },
          { ar: "أحادية النمط SMF", en: "Single-mode fiber" },
          { ar: "كابل نحاس Cat6", en: "Cat6 copper" },
          { ar: "كابل محوري", en: "Coaxial cable" },
        ],
        correct: 1,
        explain: { ar: "الاصطلاح اللوني: الأصفر أحادية، البرتقالي/الفيروزي متعددة — أول قراءة تصنيفية بلا أدوات.", en: "The color convention: yellow single-mode, orange/aqua multimode — the first toolless classification read." },
      },
    ],
  },
  {
    id: "l027",
    moduleId: "m03",
    order: 7,
    level: "beginner",
    title: { ar: "تطور الإيثرنت: من 10 ميجابت إلى 400 جيجابت", en: "Ethernet Evolution: 10 Mbps to 400 Gbps" },
    summary: {
      ar: "تاريخ أربعين عاماً من التسريع: كيف تضاعفت السرعة عشرات آلاف المرات مع بقاء الاسم نفسه.",
      en: "Four decades of acceleration history: how speed multiplied tens of thousands of times while the name stayed the same.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "قواعد التسمية: فك شيفرة الاسم", en: "Naming Rules: Cracking the Code" },
        body: {
          ar: "كل اسم إيثرنت يُقرأ بمعادلة ثابتة: [السرعة][BASE أو BROAD]-[الوسط]\n\n- 10BASE-T: عشرة ميجابت، نطاق أساسي، وسط زوج مجدول Twisted pair\n- 1000BASE-SX: جيجابت، أساسي، ضوء قصير الطول الموجي (Short-wavelength، 850 نانومتر)\n- 10GBASE-LR: عشرة جيجابت، ضوء طويل المدى (1310 نانومتر)\n- 40GBASE-SR4: أربعون جيجابت، قصير المدى عبر 4 ليفات متوازية (لذا الرقم 4)\n\nسنة التدوين الذهبية: حرف T يعني زوجاً مجدولاً (نحاس)، وغيابه يعني ضوءاً؛ والحرف الرقمي بعد S/L يعدد الليفات المتوازية المتشاركة في الحمل.\n\nنمط تاريخي متكرر بديع: كل جيل يظهر أولاً على الألياف (أسهل تسريعاً) ثم يلحق به النحاس بعد سنين من الهندسة العنيدة — الجيجابت صار نحاسياً بعد 4 سنين، والعشرة جيجابت بعد 7 تقريباً.",
          en: "Every Ethernet name reads with a fixed equation: [speed][BASE or BROAD]-[medium]\n\n- 10BASE-T: ten megabits, baseband, twisted-pair medium\n- 1000BASE-SX: gigabit, baseband, short-wavelength light (850 nm)\n- 10GBASE-LR: ten gigabit, long-reach light (1310 nm)\n- 40GBASE-SR4: forty gigabit, short reach over 4 parallel fibers (hence the 4)\n\nThe golden notation year: the letter T means twisted pair (copper); its absence means light; and a digit after S/L counts the parallel fibers sharing the load.\n\nA delightful repeated historical pattern: every generation debuts over fiber (easier to accelerate) then copper catches up after years of stubborn engineering — gigabit went copper after 4 years, ten gigabit after roughly 7.",
        },
      },
      {
        heading: { ar: "خط الزمن المجيد: 1980 - 2010", en: "The Glorious Timeline: 1980 - 2010" },
        table: {
          caption: { ar: "تطور معايير الإيثرنت عبر العقود", en: "Ethernet standards across the decades" },
          headers: [
            { ar: "المعيار", en: "Standard" },
            { ar: "السرعة", en: "Speed" },
            { ar: "السنة", en: "Year" },
            { ar: "الوسيط النموذجي", en: "Typical medium" },
          ],
          rows: [
            [
              { ar: "10BASE-T", en: "10BASE-T" },
              { ar: "10 Mbps", en: "10 Mbps" },
              { ar: "1990", en: "1990" },
              { ar: "UTP Cat3", en: "UTP Cat3" },
            ],
            [
              { ar: "100BASE-TX", en: "100BASE-TX" },
              { ar: "100 Mbps", en: "100 Mbps" },
              { ar: "1995", en: "1995" },
              { ar: "UTP Cat5", en: "UTP Cat5" },
            ],
            [
              { ar: "1000BASE-T", en: "1000BASE-T" },
              { ar: "1 Gbps", en: "1 Gbps" },
              { ar: "1999", en: "1999" },
              { ar: "UTP Cat5e", en: "UTP Cat5e" },
            ],
            [
              { ar: "10GBASE-T", en: "10GBASE-T" },
              { ar: "10 Gbps", en: "10 Gbps" },
              { ar: "2006", en: "2006" },
              { ar: "UTP Cat6a", en: "UTP Cat6a" },
            ],
            [
              { ar: "40/100GBASE", en: "40/100GBASE" },
              { ar: "40 / 100 Gbps", en: "40 / 100 Gbps" },
              { ar: "2010+", en: "2010+" },
              { ar: "ألياف متوازية (SR4/LR4)", en: "Parallel fiber (SR4/LR4)" },
            ],
            [
              { ar: "400GBASE", en: "400GBASE" },
              { ar: "400 Gbps", en: "400 Gbps" },
              { ar: "2017+", en: "2017+" },
              { ar: "ألياف بموصلات QSFP-DD", en: "Fiber with QSFP-DD optics" },
            ],
          ],
        },
        body: {
          ar: "الإيثرنت الأصلي وُلد 1980 تجريبياً و 1983 معيارياً (IEEE 802.3) على كابل محوري سميك بـ 10 ميجابت. ثم مشى التسريع بتسلسل جبار:\n\n- 1990 — 802.3i و 10BASE-T: نقلة الحياة — الهبوط إلى الزوج المجدول الشهير جعل كل مكتب قادراً على الشبكات، وأطلق النجمة التي تعرفها\n- 1995 — 802.3u و 100BASE-TX: الإيثرنت السريع Fast Ethernet على نفس الكابلات — عشرة أضعاف بلا تغيير تمديد\n- 1999 — 802.3ab و 1000BASE-T: الجيجابت على أربعة أزواج من Cat5e — إنجاز هندسي إذ ابتكر ترميز PAM-5 والثنائية على كل زوج\n- 2002 — 802.3ae: عشرة جيجابت على الألياف\n- 2006 — 802.3an و 10GBASE-T: العشرة جيجابت تهبط للنحاس (Cat6a للمئة متر) — بعد معركة زمن وصول (Latency) حامية\n- 2010 — 802.3ba: نقلة معمارية — 40 و 100 جيجابت معاً لأول مرة في معيار واحد، عبر مسارات متوازية MPO\n\nرقم يلخص المجد: من 10 ميجابت 1990 إلى 400 جيجابت 2017 — أربعون ألف ضعف في جيل بشري واحد.",
          en: "Original Ethernet was born experimental in 1980 and standardized in 1983 (IEEE 802.3) over thick coax at 10 Mbps. Then the acceleration marched in giant strides:\n\n- 1990 — 802.3i and 10BASE-T: the life leap — landing on twisted pair made every office cable-capable and launched the star you know\n- 1995 — 802.3u and 100BASE-TX: Fast Ethernet over the same cables — tenfold with zero recabling\n- 1999 — 802.3ab and 1000BASE-T: gigabit over four Cat5e pairs — an engineering triumph inventing PAM-5 coding and per-pair duplex\n- 2002 — 802.3ae: ten gigabit over fiber\n- 2006 — 802.3an and 10GBASE-T: ten gigabit lands on copper (Cat6a for 100 m) — after a fierce latency battle\n- 2010 — 802.3ba: an architectural leap — 40 and 100 gigabit together in one standard for the first time, over parallel MPO paths\n\nOne number summarizes the glory: from 10 Mbps in 1990 to 400 Gbps in 2017 — forty thousandfold within a single human generation.",
        },
      },
      {
        heading: { ar: "بيانات اليوم: 25 و 100 و 400 جيجابت", en: "Today's Datacenters: 25, 100, and 400 Gigabit" },
        body: {
          ar: "مراكز البيانات الحديثة ليست شبكات بل مدن خوادم، ومحركها الاقتصادي (الشرق-غرب): الخوادم تتخاطب فيما بينها أكثر مما تخاطب المستخدمين — نسخ ومزامنة قواعد البيانات والنسخ الاحتياطية وسلاسل الذكاء الاصطناعي.\n\n- 25GBASE على SFP28: صنف شائع لوصل الخوادم — توازن أناقة بين كلفة الوحدة والسرعة (نصف قناة 100G)\n- 100GBASE-SR4/QSFP28 على MPO: عمود التوزيع في مراكز البيانات\n- 200/400GBASE (802.3bs وck وما بعدها): طبقة النوى بين الخزانات — بوحدات QSFP-DD و OSFP المزدوجة الكثافة وبترميزات PAM4 الضوئية\n\nمفهوم العصر الجديد: الترتيب الهرمي المورق (Leaf-Spine) الذي سيصلك في وحدة مراكز البيانات — شبكة مصممة لحركة الشرق-غرب الكاسحة.\n\nوفي بيوتنا ومكاتبنا اليوم: الجيجابت معيار الأساس، و2.5G و 5G (802.3bz) تطلان كترقية لطيفة على نفس الكابلات — نعمة التوافق الخلفي الذي حافظ عليه الإيثرنت أربعين عاماً.",
          en: "Modern datacenters are not networks but cities of servers, driven economically by east-west traffic: servers talk to each other more than to users — database replication, synchronization, backups, and AI training chains.\n\n- 25GBASE on SFP28: a popular server attach class — a balance of unit cost and speed (half a 100G channel)\n- 100GBASE-SR4/QSFP28 over MPO: the distribution spine in datacenters\n- 200/400GBASE (802.3bs and beyond): the inter-rack core layer — with QSFP-DD and OSFP double-density modules and PAM4 optical coding\n\nThe new era concept: the Leaf-Spine hierarchy you will meet in the datacenter module — a network designed for sweeping east-west traffic.\n\nAnd in our homes and offices today: gigabit is the baseline, with 2.5G and 5G (802.3bz) peeking in as a gentle upgrade over the same cables — the blessing of backward compatibility Ethernet kept for forty years.",
        },
        tip: {
          ar: "في الاختبارات والامتحانات: احفظ أزواج المعيار والسنة الشهيرة (802.3u=100M، 802.3ab=1G نحاس، 802.3an=10G نحاس) — سؤال حيلة محبوب.",
          en: "For exams: memorize the famous standard-year pairs (802.3u=100M, 802.3ab=1G copper, 802.3an=10G copper) — a beloved trick question.",
        },
      },
    ],
    keyPoints: [
      { ar: "معادلة الاسم: سرعة + BASE (أساسي) + وسط؛ و T نحاس وغيابه ضوء", en: "The name equation: speed + BASE + medium; T means copper, its absence light" },
      { ar: "خط النحاس المجيد: 10BASE-T (1990) ثم 100 (1995) ثم جيجابت (1999) ثم 10G (2006)", en: "The copper glory line: 10BASE-T (1990), then 100 (1995), gigabit (1999), then 10G (2006)" },
      { ar: "الألياف تسبق النحاس في كل جيل سرعة ثم يلحق بها بعد سنين", en: "Fiber leads every speed generation, with copper catching up years later" },
      { ar: "802.3ba (2010) أول معيار يجمع 40 و100 جيجابت عبر مسارات MPO متوازية", en: "802.3ba (2010): the first standard uniting 40 and 100 gigabit over parallel MPO paths" },
      { ar: "التوافق الخلفي عقيدة الإيثرنت: من 10 إلى 400 جيجابت على نفس الفلسفة", en: "Backward compatibility is Ethernet's creed: from 10 Mbps to 400 Gbps on the same philosophy" },
    ],
    commands: [
      { cmd: "ethtool eth0", desc: { ar: "ما جيل السرعة الذي تعمل عليه وصلتك الفعلية اليوم؟", en: "Which speed generation is your actual link running today?" } },
      { cmd: "show interfaces status", desc: { ar: "على المبدّل: جرد سرعات كل المنافذ وأنواع وسائطها", en: "On the switch: an inventory of every port's speed and media type" } },
      { cmd: "sudo lshw -class network", desc: { ar: "لينكس: قدرات بطاقة الشبكة — ما أقصى سرعاتها المدعومة", en: "Linux: your NIC's capabilities — its maximum supported speeds" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يعني الحرف T في 1000BASE-T؟", en: "What does the letter T in 1000BASE-T mean?" },
        options: [
          { ar: "زوج مجدول Twisted Pair (نحاس)", en: "Twisted pair (copper)" },
          { ar: "ألياف ضوئية", en: "Optical fiber" },
          { ar: "تضمين الترددات", en: "Frequency modulation" },
          { ar: "تنقّل لاسلكي", en: "Wireless mobility" },
        ],
        correct: 0,
        explain: { ar: "T للزوج المجدول؛ أسماء الألياف تحمل حروف الوسط الضوئي (SX, LR) بدلاً منه.", en: "T stands for twisted pair; fiber names carry optical medium letters (SX, LR) instead." },
      },
      {
        q: { ar: "أي معيار جسّر الجيجابت على كابلات النحاس؟", en: "Which standard landed gigabit on copper cables?" },
        options: [
          { ar: "802.3u", en: "802.3u" },
          { ar: "802.3ab", en: "802.3ab" },
          { ar: "802.3ae", en: "802.3ae" },
          { ar: "802.3ba", en: "802.3ba" },
        ],
        correct: 1,
        explain: { ar: "802.3ab هو 1000BASE-T على أربعة أزواج Cat5e؛ و 802.3u للسرعة 100M و 802.3ae عشرة جيجابت ضوئياً.", en: "802.3ab is 1000BASE-T over four Cat5e pairs; 802.3u is 100M and 802.3ae is 10G over fiber." },
      },
      {
        q: { ar: "الرقم 4 في 40GBASE-SR4 يشير إلى:", en: "The number 4 in 40GBASE-SR4 refers to:" },
        options: [
          { ar: "أربع ليفات متوازية تتشارك الحمل", en: "Four parallel fibers sharing the load" },
          { ar: "أربع مرات إعادة إرسال", en: "Four retransmissions" },
          { ar: "أربع طبقات OSI", en: "Four OSI layers" },
          { ar: "الجيل الرابع من المعيار", en: "The standard's fourth generation" },
        ],
        correct: 0,
        explain: { ar: "السرعات الضخمة تبنى بتوازي الليفات (4×10G) عبر موصلات MPO — هندسة المسارات المتوازية.", en: "Huge speeds are built by fiber parallelism (4×10G) over MPO connectors — the parallel-paths engineering." },
      },
      {
        q: { ar: "ما محرك الطلب الأساسي على 100/400 جيجابت في مراكز البيانات؟", en: "What is the primary demand driver for 100/400 gigabit in datacenters?" },
        options: [
          { ar: "تخزين المستخدمين المنزلي", en: "Home user storage" },
          { ar: "حركة الشرق-غرب: تخاطب الخوادم فيما بينها والذكاء الاصطناعي", en: "East-west traffic: servers talking to each other and AI" },
          { ar: "طباعة الشبكات", en: "Network printing" },
          { ar: "البريد الإلكتروني فقط", en: "Email only" },
        ],
        correct: 1,
        explain: { ar: "الخوادم تتخاطب أكثر مما تخدم الخارج — المزامنة والنسخ والتدريب الضخم تفجر الحاجة للسرعات القصوى.", en: "Servers talk to each other more than they serve the outside — replication, backups, and massive training explode the need for top speeds." },
      },
    ],
  },
  {
    id: "l028",
    moduleId: "m03",
    order: 8,
    level: "beginner",
    title: { ar: "التفاوض التلقائي والثنائية: قاتل الأداء الخفي", en: "Autonegotiation & Duplex: The Hidden Performance Killer" },
    summary: {
      ar: "الفرق بين نصف الثنائية والكاملة، وكيف يعمل التفاوض التلقائي، ولماذا يعد أشد أعطال الأداء شيوعاً وخفاءً.",
      en: "The difference between half and full duplex, how autonegotiation works, and why mismatch is the most common and hidden performance fault.",
    },
    durationMin: 13,
    sections: [
      {
        heading: { ar: "الثنائية: من اللاسلكي اليدوي إلى الهاتف", en: "Duplex: From Walkie-Talkie to Telephone" },
        body: {
          ar: "المفهوم يشرحه تشبيهان من حياتك اليومية حرفياً:\n\n- نصف الثنائية (Half Duplex): جهاز اتصال لاسلكي ميداني — اضغط لتتكلم وأترك لتسمع؛ لا يمكن للطرفين الكلام معاً أو تتصادم الأصوات. الوسط واحد مشترك، فتحتاج آلية CSMA/CD لتنظيم الكلام (ستقابلها بعمق في الوحدة القادمة)\n- الثنائية الكاملة (Full Duplex): مكالمة هاتفية — كلاكما يتكلم ويسمع في آن واحد عبر مساري إرسال واستقبال منفصلين\n\nفي الإيثرنت النحاسي، الجيجابت يوظف الأزواج الأربعة كلها بثنائية كاملة (كل زوج يرسل ويستقبل في نفس اللحظة بذكاء إلكتروني)، بينما كان 10/100M التاريخي يستخدم زوجين منفصلين (زوج إرسال وزوج استقبال) — وهو ما يسمح بالثنائية الكاملة أيضاً حين لا يوجد صراع على الوسط.\n\nحصيلة الثنائية الكاملة: إلغاء التصادمات نهائياً (لا مشتركين على المسار) — تضاعف السعة الفعلية، لأن كل اتجاه يملك عرضه كاملاً.",
          en: "The concept is explained by two literally everyday analogies:\n\n- Half Duplex: a field walkie-talkie — press to talk and release to listen; both sides cannot speak together or the voices collide. The single shared medium needs CSMA/CD to organize speech (you will meet it in depth next module)\n- Full Duplex: a phone call — both of you speak and listen simultaneously over separate transmit and receive paths\n\nIn copper Ethernet, gigabit employs all four pairs in full duplex (each pair transmitting and receiving at the same instant through electronic wizardry), while legacy 10/100M used two separate pairs (one transmit, one receive) — which also permits full duplex when no one contends for the medium.\n\nThe full-duplex yield: collisions abolished outright (no contenders on the path) — actual capacity doubles, because each direction owns its full bandwidth.",
        },
      },
      {
        heading: { ar: "التفاوض التلقائي: كيف يتفق الطرفان؟", en: "Autonegotiation: How the Two Sides Agree" },
        table: {
          caption: { ar: "سيناريوهات التفاوض والثنائية", en: "Negotiation and duplex scenarios" },
          headers: [
            { ar: "الحالة على الطرفين", en: "State on both ends" },
            { ar: "النتيجة", en: "Result" },
          ],
          rows: [
            [
              { ar: "كلاهما تفاوض تلقائي", en: "Both autonegotiate" },
              { ar: "أفضل وضع مشترك — عادة Full Duplex", en: "Best common mode — usually full duplex" },
            ],
            [
              { ar: "طرف تلقائي وطرف مثبت على 100/Full", en: "One auto, one hardcoded 100/Full" },
              { ar: "الطرف التلقائي يهبط إلى Half — تضار ثنائية وأداء منهار", en: "The auto side falls to half — duplex mismatch, collapsed throughput" },
            ],
            [
              { ar: "سرعتان مختلفتان", en: "Mismatched speeds" },
              { ar: "لا تنشأ الوصلة أصلاً — لا ضوء ربط", en: "No link at all — no link light" },
            ],
            [
              { ar: "أعراض تضار الثنائية", en: "Duplex-mismatch symptoms" },
              { ar: "أخطاء CRC/FCS وتصادمات متأخرة وسرعة زحفية", en: "CRC/FCS errors, late collisions, crawling speed" },
            ],
          ],
        },
        body: {
          ar: "عند رفع وصلة، يتبادل الطرفان إعلانات قدراتهما عبر نبضات FLP (Fast Link Pulses) — رسائل صغيرة مرمزة تحمل قائمة ما يدعمه كل طرف: سرعاته، وثنائياته، وتحكمه بالتدفق. ثم يختار الطرفان تلقائياً أعلى تطابق مشترك: كلاهما يدعم 1000/كاملة؟ فهي إذن.\n\nتفصيلة هندسية تفسر نصف الحوادث: السرعة تُكتشف كهربائياً من شكل الإشارة نفسها (حتى لو عُطّل التفاوض)، أما الثنائية فلا تُعرف إلا عبر نبضات FLP المتفاوضة.\n\n- المشهد التاريخي للكوارث: مسؤول يعطّل التفاوض في الطرفين ويضبط يدوياً 100/كامل في الأول — فيؤدي النصف الآخر (ما زال تفاوضياً) القاعدة الافتراضية للسرعة المكتشفة: نصف ثنائية!\n- النتيجة: طرف يظن أنه الوحيد على المسار ويرسل كلاماً كاملاً، وطرف يحسب الآخر ينصت ويتوقف عن الاستماع أثناء إرساله — اصطدامات متأخرة (Late Collisions) وأخطاء CRC وحصيلة أداء مقرفة بلا أي تنبيه واضح\n\nوAuto-MDIX الذي رأيته في درس الكابلات يعيش فوق هذه الطبقة نفسها: يعمل فقط عندما يظل التفاوض مفعلاً.",
          en: "When a link comes up, both sides exchange capability advertisements via FLP (Fast Link Pulses) — small coded messages carrying each side's supported list: speeds, duplex modes, and flow control. Both then automatically pick the highest common match: both support 1000/full? So be it.\n\nAn engineering detail explaining half the incidents: speed is detected electrically from the signal's shape itself (even with negotiation disabled), while duplex is known only through the negotiated FLP pulses.\n\n- The classic disaster scene: an admin disables negotiation on both ends and manually sets 100/full on one — the other end (still negotiating) falls back to the default for the detected speed: half duplex!\n- The result: one side believing it alone owns the path transmits freely, while a side assuming the other is listening stops listening while sending — late collisions, CRC errors, and abysmal performance with no clear alarm\n\nAnd the Auto-MDIX you met in the cabling lesson lives on this very layer: it works only while negotiation remains enabled.",
        },
      },
      {
        heading: { ar: "علاج عدم التطابق: قاعدة ذهبية واحدة", en: "Curing Mismatch: One Golden Rule" },
        body: {
          ar: "عدم تطابق الثنائية (Duplex Mismatch) لا يرفع علماً أحمر مضيئاً: الشبكة (تعمل) لكنها زحف — والعلامات التي تفشي التشخيص:\n\n- في الطرف نصف الثنائية: تعدادات Late Collisions تتصاعد\n- في الطرف كامل الثنائية: أخطاء CRC/Runts تتراكم (يستقبل بقايا إطارات الآخر)\n- الأداء ينهار تحديداً في الاتجاه نحو الطرف المضبوط يدوياً\n\nالقاعدة الذهبية المهنية، وليس منها بد: إما أن تترك الطرفين تفاوضياً تلقائيين (الخيار الأمثل المعاصر)، وإما أن تضبط الطرفين يدوياً بقيم متطابقة — أما مزج التفاوض واليدوي فوصفة كارثة مضمونة على السرعات القديمة تحديداً.\n\nعلى أجهزة Cisco الحديثة التفاوض هو الافتراضي، وأمر الضبط اليدوي (عند الحاجة الموثقة فقط) سرعة وثنائية على الواجهة.",
          en: "Duplex mismatch raises no flashing red flag: the network (works) yet crawls — and the signs that betray the diagnosis:\n\n- On the half-duplex side: climbing Late Collision counters\n- On the full-duplex side: accumulating CRC/Runts errors (receiving fragments of the other's frames)\n- Performance collapses specifically toward the manually configured side\n\nThe golden professional rule, no exceptions: either leave both ends auto-negotiating (today's optimal choice), or configure both ends manually with identical values — mixing negotiation with manual is a guaranteed catastrophe recipe, especially at legacy speeds.\n\nOn modern Cisco gear negotiation is the default, and the manual override (only for documented needs) is speed and duplex on the interface.",
        },
        code: {
          lang: "text",
          snippet: "Switch# show interfaces status\nPort    Status   Vlan  Duplex  Speed  Type\nGi0/1   connected 10   a-full  a-1000 10/100/1000BaseTX\nGi0/5   connected 10   half    100    10/100BaseTX   <-- مشتبه!\n\n# الضبط اليدوي الموثق (الطرفان معاً حصراً):\nSwitch(config)# interface gigabitethernet 0/5\nSwitch(config-if)# speed 100\nSwitch(config-if)# duplex full",
        },
        tip: {
          ar: "القاعدة الذهبية المصغرة: حرف a- أمام قيمة Duplex/Speed في مخرجات show interfaces status يعني (تفاوضية تلقائية) — غيابه عن طرف واحد مع طرف آخر متفاوض = شبه جريمة تشخيصية.",
          en: "The mini golden rule: the letter a- before a Duplex/Speed value in show interfaces status output means (auto-negotiated) — its absence on one end while the other is negotiated is a near-diagnostic crime.",
        },
      },
    ],
    keyPoints: [
      { ar: "نصف الثنائية: مسار مشترك بلا كلام متزامن (لاسلكي ميداني)؛ كاملة: مساران مستقلان (هاتف)", en: "Half duplex: shared path no simultaneous talk (walkie-talkie); full: two independent paths (phone)" },
      { ar: "التفاوض عبر نبضات FLP يعلن القدرات ويختار أعلى تطابق مشترك", en: "FLP-pulse negotiation advertises capabilities and picks the highest common match" },
      { ar: "السرعة تُكتشف كهربائياً حتى بلا تفاوض؛ الثنائية تُعرف عبر التفاوض فقط — هنا تولد الكارثة", en: "Speed is detected electrically even without negotiation; duplex is known only through it — there the disaster is born" },
      { ar: "أعراض عدم التطابق: اصطدامات متأخرة طرفاً، و CRC طرفاً، وأداء منهار بصمت", en: "Mismatch symptoms: late collisions one side, CRC the other, and silently collapsed performance" },
      { ar: "القاعدة: تفاوض تلقائي في الطرفين، أو ضبط يدوي متطابق في الطرفين — لا مزج أبداً", en: "The rule: auto on both ends, or identical manual on both — never mix" },
    ],
    commands: [
      { cmd: "show interfaces status", desc: { ar: "السطر الأول في أي تشخيص ثنائية: قيم Duplex و Speed ووجود a- الدالة على التفاوض", en: "The first line of any duplex diagnosis: Duplex and Speed values and the negotiated a- marker" } },
      { cmd: "show interfaces gigabitethernet 0/5", desc: { ar: "العمق: عدادات الاصطدامات المتأخرة وأخطاء CRC التي تفشي عدم التطابق", en: "The depth: late-collision and CRC counters that expose the mismatch" } },
      { cmd: "ethtool -s eth0 speed 100 duplex full", desc: { ar: "لينكس: ضبط يدوي للسرعة والثنائية (يطبق على الطرف المقابل بالمثل)", en: "Linux: manual speed and duplex setting (apply identically on the far end)" } },
    ],
    quiz: [
      {
        q: { ar: "في الثنائية الكاملة، أي من الآلي ينحل؟", en: "Under full duplex, which mechanism dissolves?" },
        options: [
          { ar: "التصادمات وآلية CSMA/CD", en: "Collisions and CSMA/CD" },
          { ar: "العنونة المنطقية", en: "Logical addressing" },
          { ar: "التوجيه", en: "Routing" },
          { ar: "تشفير البيانات", en: "Data encryption" },
        ],
        correct: 0,
        explain: { ar: "لا مشتركين على المسار فلا احتمال تصادم — CSMA/CD فقد وظيفته تماماً في التحويل المبدلي الحديث.", en: "With no contenders on the path, collision is impossible — CSMA/CD fully lost its purpose in modern switched networks." },
      },
      {
        q: { ar: "عُطّل التفاوض في طرف وضُبط 100/كامل، وبقي الطرف الآخر تفاوضياً — ماذا سيختار غالباً؟", en: "Negotiation disabled on one end set to 100/full; the other end stayed negotiating — what will it usually pick?" },
        options: [
          { ar: "100/كامل بالتطابق", en: "Matching 100/full" },
          { ar: "100/نصف وفق الافتراضي للسرعة المكتشفة", en: "100/half per the detected-speed default" },
          { ar: "1000/كامل", en: "1000/full" },
          { ar: "10/نصف", en: "10/half" },
        ],
        correct: 1,
        explain: { ar: "الطرف التفاوضي يكتشف السرعة كهربائياً لكنه لا يستقبل إعلان ثنائية، فيسقط للافتراض نصف الثنائية — وتبدأ المأساة.", en: "The negotiating side detects speed electrically but receives no duplex advertisement, falling to the half-duplex default — the tragedy begins." },
      },
      {
        q: { ar: "أي عرض جانبي يستقر على الطرف نصف الثنائية في سيناريو عدم التطابق؟", en: "Which side effect settles on the half-duplex side in a mismatch scenario?" },
        options: [
          { ar: "أخطاء FCS فقط", en: "FCS errors only" },
          { ar: "اصطدامات متأخرة Late Collisions", en: "Late collisions" },
          { ar: "إطارات عمالقة Giants", en: "Giant frames" },
          { ar: "لا شيء إطلاقاً", en: "Nothing at all" },
        ],
        correct: 1,
        explain: { ar: "الطرف النصفي يكتشف ردم إرسال الآخر أثناء إرساله بعد تجاوز نافذة الاصطدام العادية — اصطدام متأخر متكرر.", en: "The half side detects the other's transmission colliding after the normal collision window — repeated late collisions." },
      },
      {
        q: { ar: "رأيت في show interfaces status: طرف (a-full a-1000) والآخر (full 1000) يدوي — التقييم المهني؟", en: "You saw in show interfaces status: one end (a-full a-1000) and the other manual (full 1000) — the professional verdict?" },
        options: [
          { ar: "مثالي وسليم تماماً", en: "Perfectly fine" },
          { ar: "تطابق فعلي في الجيجابت غالباً، لكنه نمط هش مخالف للقاعدة الذهبية — وحّد الطرفين", en: "Actually matching at gigabit usually, yet a fragile pattern violating the golden rule — unify both ends" },
          { ar: "كارثة مؤكدة ستفصل الوصلة", en: "A certain catastrophe that will drop the link" },
          { ar: "لا يمكن قراءة ذلك من الأمر", en: "That cannot be read from this command" },
        ],
        correct: 1,
        explain: { ar: "في الجيجابت يحاول المعياري معمارية كاملة (نظراً لاستخدام الأزواج كلها) فغالباً ينجح التطابق — لكن بقية السرعات لا ترحم؛ التوحيد سياسة المهر.", en: "At gigabit the negotiating side attempts full architecture (using all pairs) so it usually matches — but other speeds show no mercy; unification remains the craftsman's policy." },
      },
    ],
  },
  {
    id: "l029",
    moduleId: "m03",
    order: 9,
    level: "beginner",
    title: { ar: "التمديدات المنظمة: هندسة الكابلات في المباني", en: "Structured Cabling: The Engineering of In-Building Cables" },
    summary: {
      ar: "معيار TIA-568 وأنظمة MDF/IDF وقاعدة التسعين متراً — الفرق بين شبكة محترفة وشبكة خيوط عشوائية.",
      en: "The TIA-568 standard, the MDF/IDF hierarchy, and the 90-meter rule — the difference between a professional network and a random thread nest.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ما هي التمديدات المنظمة؟", en: "What Is Structured Cabling?" },
        diagram: {
          kind: "topology",
          title: { ar: "هرم التمديد: MDF في القمة وIDF في الطوابق", en: "The cabling pyramid: MDF on top, IDF per floor" },
          nodes: ["MDF", "IDF-1", "IDF-2", "Outlet A1", "Outlet B1", "PC1", "PC2"],
          edges: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6]],
        },
        body: {
          ar: "لو فتحت سقف مبنى قديم لوجدت عشوائية مؤلمة: كابلات معلقة بالصدف، مرمية فوق بعضها بلا أغلفة، تمتد بين الغرف بلا خريطة. التمديدات المنظمة (Structured Cabling) هي الهندسة التي تحل محل ذلك: بنية موحدة قياسية مستقلة عن المعدات، تُممَّد مرة واحدة وتخدم عقوداً من التقنيات المتغيرة.\n\nالفكرة الجوهرية: الكابلات جزء من البناء مثل الكهرباء والسباكة — تصمم وتنفذ وتوثق قبل الجدران، لا أن تُرمى خلفها عند كل حاجة.\n\n- الفائدة الاقتصادية: نقل موظف من مكتب لآخر = وصلة قصيرة جديدة في الخزانة، لا تمديداً جديداً فوق السقف\n- الفائدة التشغيلية: كل عطل له موقع موصّف، وكل كابل له لافتة وهوية\n- الفائدة المستقبلية: وصلات 10 جيجابت غداً على نفس البنية التي مددتها اليوم\n\nالمعيار الحاكم عالمياً: عائلة ANSI/TIA-568 (مع شقيقتها ISO/IEC 11801)، وتحدد الالتزام بها جودة أي مقاول تمديدات.",
          en: "Open an old building's ceiling and you find painful randomness: cables hanging by coincidence, piled unlabeled, stretched between rooms without a map. Structured cabling is the engineering replacing that: a unified vendor-independent standard infrastructure, installed once and serving decades of changing technologies.\n\nThe core idea: cables are part of the building like electricity and plumbing — designed, executed, and documented before the walls, not thrown behind them at every need.\n\n- The economic benefit: moving an employee to another office = a short new patch cord in the closet, not a new ceiling run\n- The operational benefit: every fault has a labeled location, every cable has an identity\n- The future benefit: 10-gigabit links tomorrow over the same infrastructure you install today\n\nThe globally governing standard: the ANSI/TIA-568 family (with its sibling ISO/IEC 11801), and compliance with it defines any cabling contractor's quality.",
        },
      },
      {
        heading: { ar: "الأنظمة الفرعية الستة وقاعدة 90 متراً", en: "The Six Subsystems and the 90-Meter Rule" },
        table: {
          caption: { ar: "الأنظمة الفرعية للتمديد المنظم", en: "Structured-cabling subsystems" },
          headers: [
            { ar: "النظام الفرعي", en: "Subsystem" },
            { ar: "نطاقه", en: "Scope" },
          ],
          rows: [
            [
              { ar: "منطقة العمل", en: "Work area" },
              { ar: "من مخرج الجدار إلى جهاز المستخدم", en: "From the wall outlet to the user device" },
            ],
            [
              { ar: "التمديد الأفقي", en: "Horizontal cabling" },
              { ar: "من المخرج إلى خزانة الطابق ≤ 90 m", en: "Outlet to floor closet, ≤ 90 m" },
            ],
            [
              { ar: "الخزانة الأرضية IDF", en: "Floor closet (IDF)" },
              { ar: "لوحات التوصيل ومبدلات الطابق", en: "Patch panels and floor switches" },
            ],
            [
              { ar: "الكابل الفقري", en: "Backbone cabling" },
              { ar: "بين الخزائن وغرفة المعدات الرئيسية", en: "Between closets and the main equipment room" },
            ],
            [
              { ar: "غرفة المعدات MDF", en: "Equipment room (MDF)" },
              { ar: "المبدلات والراوترات الرئيسية للمبنى", en: "The building's core switches and routers" },
            ],
            [
              { ar: "مدخل المنشأة", en: "Entrance facility" },
              { ar: "نقطة دخول مزود الخدمة وحد الحماية", en: "Provider entry point and protection demarc" },
            ],
          ],
        },
        body: {
          ar: "يقسم المعيار المنشأة إلى أنظمة فرعية تشكل مسار الكابل من الجهاز إلى الخزانة إلى غرفة المعدات:\n\n- منطقة العمل (Work Area): من مخرج الحائط إلى جهاز المستخدم — وصلات قصيرة Patch Cords\n- التمديد الأفقي (Horizontal Cabling): من مخرج الحائط حتى لوحة التوصيل في خزانة الاتصالات — النحاس هنا يحد بـ 90 متراً كحد أقصى للرابط الثابت\n- خزانة الاتصالات (Telecommunications Room — TR/IDF): الموزع الأفقي لطابق أو قطاع، وفيها لوحات التوصيل والمبدلات\n- الظهر (Backbone): بين الخزائن وبينها وبين غرفة المعدات — عادة ألياف ضوئية بين الطوابق والمباني\n- غرفة المعدات (Equipment Room — ER/MDF): قلب الشبكة حيث تسكن الموجهات والخوادم والمبدلات الرئيسية\n- منشأ الدخول (Entrance Facility): حيث تعبر خدمات المزود حدّ المبنى — بكرات وحمايات وأطراف التأريض\n\nقاعدة الحساب الذهبية للقناة النحاسية كاملة: 90 متراً رابط ثابت + حتى 10 أمتار وصلات قصيرة (5 في منطقة العمل و5 في الخزانة) = 100 متر قناة قصوى.\n\nوالهيكل المتراتب يسمى هرمياً: نجمة في كل طابق نحو IDF، ونجمة من كل IDF نحو MDF — النجمة فوق النجمة، لا الحلقات أبداً في النحاس.",
          en: "The standard divides the facility into subsystems forming the cable's path from device to closet to equipment room:\n\n- Work Area: from the wall outlet to the user device — short patch cords\n- Horizontal Cabling: from the wall outlet to the patch panel in the telecom closet — copper here is capped at 90 meters maximum for the fixed link\n- Telecommunications Room (TR/IDF): the horizontal distributor for a floor or zone, hosting patch panels and switches\n- Backbone: between closets and toward the equipment room — usually fiber between floors and buildings\n- Equipment Room (ER/MDF): the network heart where routers, servers, and core switches live\n- Entrance Facility: where provider services cross the building boundary — with protectors and grounding terminations\n\nThe golden channel calculation: 90 meters fixed link + up to 10 meters patch cords (5 at the work area, 5 in the closet) = a 100-meter maximum channel.\n\nAnd the tiered structure is called hierarchical: a star per floor toward the IDF, and a star from every IDF toward the MDF — star over star, never rings in copper.",
        },
      },
      {
        heading: { ar: "آداب التنفيذ الميداني", en: "The Field Execution Etiquette" },
        body: {
          ar: "الفارق بين تمديد يموت بعد سنتين وآخر يعيش عشرين: التفاصيل الصغيرة التي لا تراها العين بعد إغلاق السقف:\n\n- نصف قطر الانحناء (Bend Radius): لا تثني النحاس أضيق من 4 أضعاف قطره، والألياف أضيق من 10 أضعاف — الانحناء الحاد يهزم التلف وتوهينه يتسرب\n- شد الربط: أربطة القص وولاء الفيلكرو الفضفاض — لا تشد ربطة حتى يتشوه شكل الكابل؛ الكابل المفلطح كابل متعذّر الأداء\n- الفصل عن الكهرباء: لا تسير مع كابلات الطاقة في نفس المجرى — قاعدة التباعد نصف متر عن الكهرباء القوية، والابتعاد عن محركات وإضاءات فلورسنتية\n- الحرارة: الأسقف المضاءة شمساً ترفع التوهين (خصوصاً في الكابلات الجديدة ذات النحاس المقاوم) — احسب مسارات الظل\n- اللافتات (TIA-606): كل طرف من كل كابل يحمل هوية تتطابق في الخزانة وفي المخرج — والوثيقة الحية في جيبك عند كل عطل\n- خيوط السحب (Pull String) المتروكة في المجرى: هدية لمن يجيء بعدك\n\nوثيقة الغرامة المهنية: إهمال التوثيق لا يعذّبك اليوم بل يعذّب من يأتي بعد خمس سنوات — وغالباً أنت.",
          en: "The difference between a cabling run dying in two years and one living twenty: the small details your eye never sees once the ceiling closes:\n\n- Bend radius: never bend copper tighter than 4 times its diameter, nor fiber tighter than 10 times — a sharp bend defeats the twist and its attenuation leaks\n- Tie tension: hook-and-loop velcro over zip ties — never tighten a tie until the cable deforms; a flattened cable is a disabled cable\n- Separation from power: never run alongside power cables in the same conduit — the half-meter rule from strong power, away from motors and fluorescent fixtures\n- Heat: sun-baked ceilings raise attenuation (especially in modern cables) — calculate shaded routes\n- Labeling (TIA-606): both ends of every cable carry an identity matching in the closet and at the outlet — and a living document in your pocket at every fault\n- Pull strings left in conduits: a gift to whoever comes after you\n\nThe professional fine print: neglecting documentation does not torture you today but tortains whoever comes in five years — usually you.",
        },
        tip: {
          ar: "قاعدة التسعين متراً ليست اقتراحاً: الكابل 101 متر يعمل (بالصدفة) ثم يفشل غداً مع حرارة الصيف أو إطار ثقيل — صمم دائماً داخل الحد لا على حافته.",
          en: "The 90-meter rule is not a suggestion: a 101-meter cable works (by luck) then fails tomorrow with summer heat or a heavy frame — always design inside the limit, never on its edge.",
        },
      },
    ],
    keyPoints: [
      { ar: "التمديدات المنظمة: بنية موحدة مستقلة عن المعدات تخدم عقوداً من التقنيات", en: "Structured cabling: a unified equipment-independent infrastructure serving decades of technologies" },
      { ar: "الأنظمة الستة: منطقة العمل، الأفقي 90م، خزانات IDF، الظهر، غرفة MDF، منشأ الدخول", en: "The six subsystems: work area, 90m horizontal, IDF closets, backbone, MDF room, entrance facility" },
      { ar: "القناة النحاسية: 90م رابط ثابت + 10م وصلات = 100م قصوى", en: "The copper channel: 90m fixed + 10m patches = 100m maximum" },
      { ar: "الهرم نجمة فوق نجمة (طوابق→IDF→MDF) — لا حلقات في النحاس", en: "The hierarchy: star over star (floors→IDF→MDF) — no copper rings" },
      { ar: "آداب التنفيذ: انحناء 4×/10×، ربط فضفاض، تباعد كهربائي، لافتات متطابقة طرفياً", en: "Execution etiquette: 4×/10× bend, loose ties, power separation, matching end labels" },
    ],
    commands: [
      { cmd: "show interfaces status", desc: { ar: "جرد منافذ خزانتك: ما المرفوع وما مطفي — أول خريطة تعمل", en: "Your closet inventory: what is up and what is dark — the first working map" } },
      { cmd: "test cable-diagnostics tdr interface gigabitethernet 0/5", desc: { ar: "على مبدلات Cisco: قياس طول الكابل المرفوع بالـ TDR — هل يتجاوز 100 متر؟", en: "On Cisco switches: TDR length measurement of the installed cable — does it exceed 100 meters?" } },
      { cmd: "ethtool eth0", desc: { ar: "سرعة الوصلة الفعلية عند مخرج المستخدم — شاهدة على جودة القناة", en: "Actual link speed at the user's outlet — a witness to channel quality" } },
    ],
    quiz: [
      {
        q: { ar: "ما الحد الأقصى للرابط النحاسي الأفقي الثابت في التمديدات المنظمة؟", en: "What is the maximum fixed horizontal copper link in structured cabling?" },
        options: [
          { ar: "100 متر للقناة كاملة", en: "100 meters for the whole channel" },
          { ar: "90 متراً للرابط الثابت + 10م وصلات", en: "90 meters for the fixed link + 10 m of patches" },
          { ar: "185 متراً", en: "185 meters" },
          { ar: "500 متر بلا حد", en: "500 meters unbounded" },
        ],
        correct: 1,
        explain: { ar: "المعيار يقسم المئة: 90 ثابتة داخل الجدران و10 وصلات قابلة للتبديل طرفي الطريق.", en: "The standard splits the hundred: 90 fixed inside walls and 10 replaceable patches at the two ends." },
      },
      {
        q: { ar: "وظيفة خزانة IDF في الهرم البنيوي؟", en: "The role of an IDF closet in the structural hierarchy?" },
        options: [
          { ar: "الموزع الأفقي لطابق أو قطاع نحو نجمة محلية", en: "The horizontal distributor of a floor or zone toward a local star" },
          { ar: "نقطة دخول مزود الخدمة", en: "The provider's entrance point" },
          { ar: "غرفة الخوادم المركزية", en: "The central server room" },
          { ar: "لا وظيفة لها قياسياً", en: "No standard role" },
        ],
        correct: 0,
        explain: { ar: "IDF يجمع نجمة الطابق ثم يصعد بالظهر نحو MDF المركزي — نجمة فوق نجمة.", en: "The IDF gathers the floor's star then ascends the backbone toward the central MDF — star over star." },
      },
      {
        q: { ar: "كابل صُرّ برباطات شدّت حتى تشوه شكله — العاقبة المهنية؟", en: "A cable was zip-tied until its shape deformed — the professional consequence?" },
        options: [
          { ar: "لا تأثير — الشكل جمالي فقط", en: "No impact — aesthetics only" },
          { ar: "يفسد اللفّ المزدوج فيرفع التشابك ويهبط الأداء", en: "It ruins the twist, raising crosstalk and dropping performance" },
          { ar: "يحسّن الأداء بثبات أقوى", en: "It improves performance with firmer stability" },
          { ar: "يقطع الكابل فوراً", en: "It severs the cable instantly" },
        ],
        correct: 1,
        explain: { ar: "التشوه يفك اللفّ الهندسي المضاد للضجيج — لهذا يعتمد المحترفون الفيلكرو وربطات الابتسامة لا الخنق.", en: "Deformation undoes the anti-noise engineering twist — hence professionals favor velcro and smile-tight ties over strangulation." },
      },
      {
        q: { ar: "أي قرار ينتمي لروح التمديدات المنظمة؟", en: "Which decision belongs to the structured cabling spirit?" },
        options: [
          { ar: "مدّ كابل جديد فوق السقف لكل موظف ينتقل", en: "Running a new ceiling cable for every moving employee" },
          { ar: "بنية موحدة موثقة مرة وتخدم عقوداً من المعدات المتغيرة", en: "A unified documented infrastructure installed once serving decades of changing gear" },
          { ar: "شراء كابلات بألوان عشوائية للجمال", en: "Buying randomly colored cables for beauty" },
          { ar: "اعتماد الحلقات لخفض الكلفة", en: "Adopting rings to cut cost" },
        ],
        correct: 1,
        explain: { ar: "جوهر الفلسفة: البنية قبل المعدات والتوثيق قبل التوسع — الكابل أبقى عناصر الشبكة عمراً.", en: "The philosophy's core: infrastructure before equipment, documentation before expansion — cable outlives every network element." },
      },
    ],
  },
  {
    id: "l030",
    moduleId: "m03",
    order: 10,
    level: "beginner",
    title: { ar: "اختبار الكابلات وحل مشاكلها: من مجرّد سلك إلى شهادة معتمدة", en: "Cable Testing & Troubleshooting: From a Bare Wire to a Certified Link" },
    summary: {
      ar: "معايير الفحص الحقيقية (خريطة الأسلاك، التوهين، التشابك) ومستويات الأجهزة، ومنهجية شائكة المشاكل الميدانية.",
      en: "The real test parameters (wire map, loss, crosstalk), the instrument tiers, and the field methodology for nagging faults.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ثلاثة مستويات من الأجهزة", en: "Three Tiers of Instruments" },
        body: {
          ar: "سوق فحص الكابلات يبيعك ثلاث طبقات واعية — والخلط بينها يهدر ميزانيات:\n\n- أجهزة التحقق (Verification): فحوصلة تكفي 20 دولاراً تضيء مصابيح للتحقق من توصل الأسلاك الثمانية وترتيبها — تكفي لصانع الكابلات اليدوي\n- أجهزة التأهيل (Qualification): تختبر هل يتحمل الكابل القائم جيجابت أو 10G — تسأل: هل يعمل لتقنية معينة؟\n- أجهزة الاعتماد (Certification): محطات مثل Fluke DSX تقيس كل معامل بمعيار TIA وتطبع شهادة نجاح/فشل — عقد المقاولين وشركات التسليم يُبنى عليها\n\nدرس ذهبي من الواقع: كابل يمر فحص التحقق (مصابيح خضراء) قد يفشل فحص الاعتماد فشلاً ذريعاً — لأن مقياس التوصل لا يقيس التشابك ولا التوهين؛ الفرق بين (متصل) و(يؤدي عمله بمستوى فئته).",
          en: "The cable-testing market sells you three conscious tiers — and confusing them wastes budgets:\n\n- Verification tools: a $20 continuity checker lighting lamps to confirm the eight wires connect in order — enough for the handmade-cable maker\n- Qualification tools: test whether an installed cable sustains gigabit or 10G — they answer: does it work for a specific technology?\n- Certification tools: stations like the Fluke DSX measuring every parameter against TIA limits and printing a pass/fail certificate — contractor and handover contracts are built on them\n\nA golden real-world lesson: a cable passing verification (green lamps) can fail certification catastrophically — because continuity does not measure crosstalk or loss; the difference between (connected) and (performing at its category level).",
        },
      },
      {
        heading: { ar: "المعايير المقاسة: مفردات المختبر", en: "The Measured Parameters: The Lab Vocabulary" },
        table: {
          caption: { ar: "اختبارات الكابلات وما تفحصه", en: "Cable tests and what they examine" },
          headers: [
            { ar: "الاختبار", en: "Test" },
            { ar: "ما يفحص", en: "What it checks" },
          ],
          rows: [
            [
              { ar: "Wiremap", en: "Wiremap" },
              { ar: "ترتيب الأسلاك الثمانية والانقسامات المقلوبة", en: "Order of the eight conductors and split pairs" },
            ],
            [
              { ar: "Length", en: "Length" },
              { ar: "الطول ضمن 90 m بقياس زمني", en: "Length within 90 m via time measurement" },
            ],
            [
              { ar: "NEXT", en: "NEXT" },
              { ar: "التداخل القريب بين الأزواج المتجاورة", en: "Near-end crosstalk between adjacent pairs" },
            ],
            [
              { ar: "Insertion Loss", en: "Insertion loss" },
              { ar: "التوهين الكلي للإشارة عبر المسار", en: "Total signal attenuation across the path" },
            ],
            [
              { ar: "Return Loss", en: "Return loss" },
              { ar: "الانعكاسات الناتجة عن موصلات رديئة", en: "Reflections caused by poor terminations" },
            ],
            [
              { ar: "Delay Skew", en: "Delay skew" },
              { ar: "فرق التأخير بين الأزواج الأربعة", en: "Timing difference among the four pairs" },
            ],
          ],
        },
        body: {
          ar: "شهادة الاعتماد تختبر مجموعة قياسات محددة كلها بوحدات الديسيبل — هذه أهم مفرداتها:\n\n- خريطة الأسلاك (Wire Map): الترتيب الصحيح للأزواج على المسامير الثمانية — وأخطاؤها: انقطاع Open، تقصير Short، انعكاس Reversed، وأخطرها الأزواج المفصولة Split Pairs (أسلاك من زوجين مختلفين تتزوج خطأً — توصلها سليم وكل شيء آخر فشل)\n- الطول (Length) وانحراف التأخير (Delay Skew): TDR يرسل نبضة ويقيس زمن ارتدادها لتحديد مكان أي عيب وحدّ الطول — واختلاف تأخير الأزواج (حده 50 نانوثانية للقناة) يهلك تقنيات الجيجابت التي تسلّم البيانات على الأربعة معاً\n- فقد الإدخال (Insertion Loss): التوهين الكلي عند أعلى تردد للفئة — كلما قل كان أفضل\n- التشابك الطرفي القريب (NEXT): إشارة تتسرب من زوج مُرسل إلى زوج مجاور عند النهاية نفسها — أخطر قياس يفسد الكابلات المصنوعة يدوياً\n- ارتداد الخسارة (Return Loss): جزء الإشارة المرتد بسبب اختلال الممانعة (75 أوم موصل في كابل 100 أوم مثلاً)\n\nكل قياس له حد أدنى/أقصى محدد بجدول الفئة: Cat6a تُختبر حتى 500 ميجاهرتز وCat6 حتى 250 — ولهذا ترفض شهادة Cat6a كابلاً مرّ سابقاً كـ Cat5e.",
          en: "The certification tests a defined set of measurements, all in decibels — here are its key vocabulary words:\n\n- Wire map: the correct pair order on the eight pins — its faults: open, short, reversed, and the deadliest, split pairs (wires from two different pairs mis-married — continuity looks perfect while everything else fails)\n- Length and delay skew: TDR sends a pulse and measures its echo time to locate any defect and bound the length — and pair delay difference (capped at 50 ns for the channel) kills gigabit technologies delivering data across all four pairs together\n- Insertion loss: total attenuation at the category's top frequency — the lower the better\n- Near-end crosstalk (NEXT): signal leaking from a transmitting pair into an adjacent pair at the same end — the deadliest measurement exposing handmade cables\n- Return loss: the portion of signal reflected back due to impedance discontinuity (a 75-ohm connector on a 100-ohm cable, say)\n\nEvery measurement has a min/max bound in the category table: Cat6a tests up to 500 MHz and Cat6 to 250 — which is why a Cat6a certificate rejects a cable that previously passed as Cat5e.",
        },
      },
      {
        heading: { ar: "منهجية الميدان: من شكوى بطء إلى الجاني", en: "Field Methodology: From a Slowness Complaint to the Culprit" },
        body: {
          ar: "شكوى نمطية: موظف يقول الوصلة بطيئة والويندوز يقول (متصل). مسار التقصي المنضبط:\n\n- 1) عدادات المنفذ أولاً: show interfaces — تراكم CRC وinput errors؟ الكابل مشتبه فوراً. عدادات صفرية نظيفة؟ الانتقال للمبدّل والمسار\n- 2) بدّل وصلة القاعدة (Patch Cord) بمصنعة حديثاً معروفة الجودة — تحل وحدها نسبة مذهلة من الحالات (الوصلات القابلة للعبث أكثر الأجزاء انكساراً)\n- 3) فحص TDR على المنفذ إن دعمه المبدّل: يعطيك طول الكابل وموقع أي عيب بدقة الأمتار\n- 4) أجهزة القياس: من فاحصة التحقق للاشتباه السريع إلى DSX للشهادة القاطعة عند نزاع مع مقاول\n- 5) الفحص البصري للطريق: مسارات مضغوطة بأثاث؟ ربطة خنق؟ مسار مواز لكابل كهرباء؟ سقف ساخن؟\n\nقاعدة خبرة مطرزة: حين تجوع إحصاءات CRC على منفذ، فالجاني بالترتيب الاحتمالي: وصلة قاعدة، ثم موصل مثبت رديئاً، ثم كابل مضغوط في مساره، ثم المنفذ ذاته.\n\nوفي النحاس تقنية الإنقاذ المدمجة بالمبدّلات الحديثة: TDR — ستراها في الأوامر أدناه تنقذ جلسة عطل كاملة بأمر واحد.",
          en: "A typical complaint: an employee says the link is slow while Windows says (connected). The disciplined investigation path:\n\n- 1) Port counters first: show interfaces — accumulating CRC and input errors? The cable is instantly suspect. Clean zero counters? Move to the switch and path\n- 2) Swap the patch cord with a freshly made known-good one — alone it resolves an astonishing share of cases (user-touchable cords are the most broken component)\n- 3) Run TDR on the port if the switch supports it: it gives cable length and any defect's location to meter accuracy\n- 4) Measuring instruments: from a verification checker for quick suspicion to a DSX for the decisive certificate in contractor disputes\n- 5) Visual route inspection: routes crushed by furniture? a strangling tie? a run parallel to power? a hot ceiling?\n\nAn embroidered experience rule: when CRC statistics starve a port, the culprits in probability order: patch cord, then a poorly crimped connector, then a crushed run, then the port itself.\n\nAnd in copper, the rescue technology embedded in modern switches: TDR — you will see it in the commands below save a whole troubleshooting session with one command.",
        },
        code: {
          lang: "text",
          snippet: "Switch# test cable-diagnostics tdr interface gigabitethernet 0/5\nTDR test started on interface Gi0/5\n\nSwitch# show cable-diagnostics tdr interface gigabitethernet 0/5\nInterface  Speed  Local pair  Pair length  Remote pair  Pair status\nGi0/5      1000   Pair A      85  +/- 5 m   Pair A       Normal\nGi0/5             Pair B      84  +/- 5 m   Pair B       Normal\nGi0/5             Pair C      85  +/- 5 m   Pair C       Normal\nGi0/5             Pair D      10  +/- 2 m   Pair D       Fault/Open",
        },
        tip: {
          ar: "Pair status تطبع (Normal) للأزواج السليمة و (Open/Short) لكل عطل مع موقعه بالأمتار — اطبع هذه الشاشة في أي تقرير عطل نحاسي وستبدو نبياً أمام عملائك.",
          en: "Pair status prints (Normal) for healthy pairs and (Open/Short) for every fault with its meter location — print this screen in any copper fault report and you will look prophetic to your clients.",
        },
      },
    ],
    keyPoints: [
      { ar: "ثلاث طبقات أجهزة: تحقق (توصل) — تأهيل (تقنية بعينها) — اعتماد (شهادة معيارية)", en: "Three instrument tiers: verification (continuity), qualification (a specific technology), certification (standard-grade)" },
      { ar: "الإطار الناجح للتوصل قد يفشل التشابك — Split Pairs الخطر الصامت", en: "A continuity pass may fail crosstalk — split pairs are the silent danger" },
      { ar: "القياسات الجوهرية: خريطة أسلاك، طول/انحراف تأخير، فقد إدخال، NEXT، ارتداد خسارة", en: "Core measurements: wire map, length/delay skew, insertion loss, NEXT, return loss" },
      { ar: "تراكم CRC على منفذ = اتهم بالترتيب: وصلة، موصل، مسار مضغوط، المنفذ", en: "Accumulating port CRC = suspect in order: patch cord, connector, crushed run, the port" },
      { ar: "TDR المدمج بالمبدّل يحدد طول الكابل وموقع العطل بالأمتار بأمر واحد", en: "Switch-embedded TDR locates cable length and fault position in meters with one command" },
    ],
    commands: [
      { cmd: "test cable-diagnostics tdr interface gigabitethernet 0/5", desc: { ar: "إطلاق فحص TDR على منفذ نحاسي — طول الكامل وموقع أي عطل", en: "Launch TDR on a copper port — full length and any fault's location" } },
      { cmd: "show cable-diagnostics tdr interface gigabitethernet 0/5", desc: { ar: "قراءة نتيجة TDR: حالة كل زوج وطوله", en: "Read the TDR result: each pair's state and length" } },
      { cmd: "show interfaces counters errors", desc: { ar: "جرد أخطاء المنافذ: CRC و runts — بوصلتك البصرية إلى الكابلات المريضة", en: "Port error inventory: CRC and runts — your visual link to sick cables" } },
      { cmd: "ethtool -S eth0", desc: { ar: "لينكس: عدادات أخطاء بطاقة الشبكة التفصيلية", en: "Linux: the NIC's detailed error counters" } },
    ],
    quiz: [
      {
        q: { ar: "كابل مصنوع يدوياً مرّ فحص التوصل (كل المصابيح خضراء) لكن الشبكة تتصادم وتفشل — الجاني الأرجح؟", en: "A handmade cable passed continuity (all lamps green) yet the network misbehaves — the most likely culprit?" },
        options: [
          { ar: "طوله 95 متراً", en: "Its 95-meter length" },
          { ar: "أزواج مفصولة Split Pairs: توصل سليم وتشابك فاشل", en: "Split pairs: continuity fine, crosstalk failed" },
          { ar: "لون الغلاف خاطئ", en: "Wrong jacket color" },
          { ar: "المبدّل تالف دوماً", en: "The switch is always broken" },
        ],
        correct: 1,
        explain: { ar: "الخريطة تبدو متصلة لكن أسلاك من زوجين مختلفين تتشارك نقل الإشارة فيغيب الإلغاء التفاضلي وينفجر التشابك.", en: "The map looks connected but wires from two different pairs share signaling, losing differential cancellation and exploding crosstalk." },
      },
      {
        q: { ar: "قياس NEXT يفحص:", en: "The NEXT measurement examines:" },
        options: [
          { ar: "توهين الإشارة مع المسافة", en: "Signal attenuation over distance" },
          { ar: "تسرب إشارة زوج مرسل إلى زوج مجاور عند النهاية نفسها", en: "Leakage from a transmitting pair into an adjacent pair at the same end" },
          { ar: "زمن ارتداد النبضة", en: "Pulse echo time" },
          { ar: "عدد بتات الترويسة", en: "Header bit count" },
        ],
        correct: 1,
        explain: { ar: "Near-End Crosstalk: عذاب الكابلات المصنوعة يدوياً خصوصاً — فكّ اللفّ القريب من الموصل يفجره.", en: "Near-End Crosstalk: handmade cables' torment especially — untwisting near the connector detonates it." },
      },
      {
        q: { ar: "أظهر TDR زوجاً واحداً Open عند 10 أمتار والبقية Normal عند 85 — التقرير المهني؟", en: "TDR shows one pair Open at 10 meters and the rest Normal at 85 — the professional report?" },
        options: [
          { ar: "الكابل سليم كلياً", en: "The cable is fully healthy" },
          { ar: "قطع في أحد الأزواج عند ~10 أمتار من المبدّل — عطل موضعي مطلوب إصلاحه", en: "A break in one pair at ~10 meters from the switch — a localized fault needing repair" },
          { ar: "يجب استبدال المبدّل", en: "The switch must be replaced" },
          { ar: "النتيجة تعني نجاح الاعتماد", en: "The result means certification passed" },
        ],
        correct: 1,
        explain: { ar: "TDR يحدد العيب بالأمتار لكل زوج على حدة — هذا القطع عند الأمتار العشرة يعزل توصيلة أو ضغطة في المسار.", en: "TDR pinpoints faults per pair in meters — this break at 10 meters isolates a connector or crush along the run." },
      },
      {
        q: { ar: "أي ترتيب اتهام صحيح عند جوع عدادات CRC على منفذ؟", en: "Which accusation order is correct when CRC counters starve a port?" },
        options: [
          { ar: "المبدّل ثم الموجه ثم الكابل", en: "Switch, then router, then cable" },
          { ar: "وصلة القاعدة ثم الموصل ثم المسار المضغوط ثم المنفذ", en: "Patch cord, then connector, then crushed run, then the port" },
          { ar: "DNS ثم DHCP ثم NAT", en: "DNS, then DHCP, then NAT" },
          { ar: "لا علاقة للـ CRC بالكابلات", en: "CRC has no relation to cables" },
        ],
        correct: 1,
        explain: { ar: "أكثر الملامسين تلفاً أولاً: الوصلة القابلة للعبث، ثم مصيدة الموصل الرديء، ثم الكابل المضغوط في مساره — قبل اتهام العتاد كله.", en: "Most-touched parts first: the user-fiddled patch cord, then a bad crimp, then a crushed run — before blaming entire hardware." },
      },
    ],
  },
];
