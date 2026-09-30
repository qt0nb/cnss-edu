import type { Lesson } from "@/lib/types";

// Module m10 — Wireless, Advanced Tech & Career (expert level, l091-l100)

export const m10_LESSONS: Lesson[] = [
  // ─── l091: RF fundamentals ───────────────────────────────────────────
  {
    id: "l091",
    moduleId: "m10",
    order: 1,
    level: "expert",
    title: {
      ar: "أساسيات الترددات الراديوية: التردد والقنوات و dBm و SNR",
      en: "RF Fundamentals: Frequency, Channels, dBm & SNR",
    },
    summary: {
      ar: "من الموجة الكهرومغناطيسية إلى رقم قابل للقياس: كيف تُقرأ الترددات والقنوات في نطاقات 2.4 و 5 و 6 GHz، وكيف تُفسَّر القدرة بوحدة dBm، ولماذا تحكم نسبة SNR جودة الاتصال، وكيف تختار عرض القناة الصحيح.",
      en: "From the electromagnetic wave to a measurable number: how frequencies and channels work across 2.4/5/6 GHz, how to read power in dBm, why SNR governs link quality, and how to choose the right channel width.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "ما هي الإشارة الراديوية؟", en: "What Is a Radio Signal?" },
        body: {
          ar: "الإشارة الراديوية (RF) هي موجة كهرومغناطيسية تسير في الهواء بسرعة الضوء تقريباً، وتُوصَف بعاملين مرتبطين رياضياً: التردد (Frequency) وهو عدد الدورات الكاملة في الثانية مقاساً بالهرتز، والطول الموجي (Wavelength) وهو المسافة بين قمتين متتاليتين. العلاقة ثابتة: سرعة الضوء = التردد × الطول الموجي.\n\nتُخصَّص الحكومات طيف الراديو بتراخيص، والجزء المسموح دون ترخيص لشبكات WLAN هو النطاقان الصناعي العلمي الطبي ISM 2.4 GHz و 5 GHz UNII، ثم أُضيف نطاق 6 GHz سنة 2020 لمعيار WiFi 6E.\n\nالقاعدة الذهبية: التردد الأعلى يحمل بيانات أكثر لكنه يفقد طاقة أسرع مع المسافة ويُضعفه الجدران بقسوة أكبر. لهذا يمتد مدى 2.4 GHz أبعد من 5 GHz لكن بسعة أقل.\n\n- 2.4 GHz: مدى أطول، اختراق أفضل، لكن ازدحام رهيب وتداخل مع الأجهزة المنزلية\n- 5 GHz: قنوات كثيرة وسرعة أعلى، مدى أقصر\n- 6 GHz: طيف نظيف واسع (حتى 1200 MHz)، حساسية عالية للانحجاب",
          en: "An RF signal is an electromagnetic wave traveling through air at nearly the speed of light, described by two mathematically linked factors: frequency (cycles per second, in Hertz) and wavelength (distance between two peaks). The relation is fixed: speed of light = frequency × wavelength.\n\nGovernments license the radio spectrum; the unlicensed portions used by WLANs are the ISM 2.4 GHz band, the UNII 5 GHz bands, and the 6 GHz band added in 2020 for WiFi 6E.\n\nThe golden rule: higher frequency carries more data but loses energy faster over distance and is attenuated harder by walls. That is why 2.4 GHz reaches farther than 5 GHz but with far less capacity.\n\n- 2.4 GHz: longer range, better penetration, but heavy congestion and interference from household devices\n- 5 GHz: many channels and higher speed, shorter range\n- 6 GHz: huge clean spectrum (up to 1200 MHz), very sensitive to obstruction",
        },
        tip: {
          ar: "احسب طول الموجة ذهنياً: 300 ÷ التردد بالميجاهرتز = الطول بالمتر. موجة 2.4 GHz طولها ~12.5 سم، وموجة 5 GHz طولها ~6 سم — لهذا يمر الأول عبر الشقوق أفضل من الثاني.",
          en: "Compute wavelength mentally: 300 ÷ frequency in MHz = length in meters. A 2.4 GHz wave is ~12.5 cm, a 5 GHz wave is ~6 cm — that is why the first squeezes through gaps better.",
        },
      },
      {
        heading: { ar: "القنوات في 2.4 و 5 و 6 GHz", en: "Channels in 2.4, 5 and 6 GHz" },
        table: {
          caption: { ar: "النطاقات اللاسلكية الثلاثة مقارنةً", en: "The three wireless bands compared" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "2.4 GHz", en: "2.4 GHz" },
            { ar: "5 GHz", en: "5 GHz" },
            { ar: "6 GHz", en: "6 GHz" },
          ],
          rows: [
            [
              { ar: "قنوات 20 MHz غير متداخلة", en: "Non-overlapping 20 MHz channels" },
              { ar: "3 فقط (1 / 6 / 11)", en: "Only 3 (1 / 6 / 11)" },
              { ar: "~24 عبر UNII-1/2/2e/3", en: "~24 across UNII-1/2/2e/3" },
              { ar: "حتى 59", en: "Up to 59" },
            ],
            [
              { ar: "المسافة والاختراق", en: "Range & penetration" },
              { ar: "الأطول والأفضل عبر الجدران", en: "Longest, best through walls" },
              { ar: "أقصر", en: "Shorter" },
              { ar: "الأقصر — حساس للانحجاب", en: "Shortest — obstruction-sensitive" },
            ],
            [
              { ar: "الازدحام والتداخل", en: "Congestion & interference" },
              { ar: "رهيب — أجهزة منزلية وجيران", en: "Severe — household devices and neighbors" },
              { ar: "متوسط مع DFS", en: "Moderate, with DFS" },
              { ar: "شبه معدوم اليوم", en: "Near zero today" },
            ],
            [
              { ar: "DFS (تجنب الرادار)", en: "DFS (radar avoidance)" },
              { ar: "غير مطلوب", en: "Not required" },
              { ar: "مطلوب في UNII-2/2e", en: "Required in UNII-2/2e" },
              { ar: "لا DFS للطاقة المنخفضة", en: "No DFS for low-power" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best use" },
              { ar: "IoT والأجهزة القديمة", en: "IoT and legacy devices" },
              { ar: "المكاتب والمنازل الحديثة", en: "Modern offices and homes" },
              { ar: "البيئات عالية الكثافة", en: "High-density environments" },
            ],
          ],
        },
        body: {
          ar: "القناة ليست شيئاً مادياً؛ هي نافذة من عرض 20 MHz تقسم النطاق. في 2.4 GHz يوجد 14 قناة متباعدة 5 MHz فقط، أي أن كل قناة 20 MHz تتداخل مع جيرانها! القنوات غير المتداخلة الوحيدة هي 1 و 6 و 11 — ثلاث قنوات فقط لكل المبنى.\n\nفي 5 GHz الوضع أفضل بكثير: نطاقات UNII-1/2/2e/3 تمنح نحو 24 قناة غير متداخلة بعرض 20 MHz، لكن بعضها يتطلب DFS (تجنب الرادار) لأن النطاق مشترك مع رادارات الطقس والعسكرية، فتفرغ نقطة الوصول القناة عند كشف رادار.\n\nفي 6 GHz يحصل WiFi 6E/7 على ما يصل إلى 59 قناة 20 MHz إضافية دون DFS في أنظمة القوى المنخفضة، وهو أكبر توسيع طيفي في تاريخ WiFi.\n\n- 2.4 GHz: قنوات 1/6/11 فقط لشبكة نظيفة\n- 5 GHz: تخطيط قنوات متناثر مع مراعاة DFS\n- 6 GHz: ازدحام شبه معدوم في معظم المباني اليوم",
          en: "A channel is not a physical thing; it is a 20 MHz window slicing the band. In 2.4 GHz there are 14 channels spaced only 5 MHz apart, meaning every 20 MHz channel overlaps its neighbors! The only non-overlapping set is 1, 6 and 11 — three channels for the entire building.\n\nIn 5 GHz the picture is far better: UNII-1/2/2e/3 grant roughly 24 non-overlapping 20 MHz channels, but some require DFS (radar avoidance) because the band is shared with weather and military radar, so the AP must vacate the channel when radar is detected.\n\nIn 6 GHz, WiFi 6E/7 gets up to 59 additional 20 MHz channels with no DFS for low-power systems — the largest spectrum expansion in WiFi history.\n\n- 2.4 GHz: channels 1/6/11 only for a clean network\n- 5 GHz: wider channel plan with DFS awareness\n- 6 GHz: near-zero congestion in most buildings today",
        },
        code: {
          lang: "text",
          snippet: "2.4 GHz  |1|2|3|4|5|6|7|8|8|9|10|11|12|13|   (5 MHz spacing, 20 MHz width)\n           ^       ^               ^\n         ch1     ch6            ch11      = the only non-overlapping trio\n\n5 GHz   UNII-1: 36 40 44 48        (no DFS)\n        UNII-2: 52 56 60 64        (DFS)\n        UNII-2e:100 104 108 ... 144 (DFS)\n        UNII-3: 149 153 157 161 165 (no DFS)\n\n6 GHz   1-233 stepping by 4 → 59 x 20 MHz channels",
        },
        tip: {
          ar: "خطط شبكاتك كأن 2.4 GHz خدمة إنقاذ للأجهزة القديمة و IoT فقط، واجعل كل حاسبات الحديثة على 5 أو 6 GHz — هذا وحده يضاعف الجودة الملموسة.",
          en: "Design 2.4 GHz as a legacy/IoT rescue service only, and push all modern clients to 5 or 6 GHz — this alone doubles perceived quality.",
        },
      },
      {
        heading: { ar: "القدرة ووحدة dBm", en: "Power and the dBm Unit" },
        body: {
          ar: "dBm ليست وحدة قدرة خطية بل لوغاريتمية نسبية إلى 1 ميلي واط: الصيغة dBm = 10 × لوغاريتم(المقدار بالميلي واط). الميزة العملية: الجمع والطرح في dB يقابل الضرب والقسمة في الوحدات الخطية.\n\nقاعدة الحفظ: كل زيادة 3 dB تعني مضاعفة القدرة، وكل 10 dB تعني عشرة أضعاف. رفع الإرسال من 50 إلى 100 mW هو +3 dB فقط — تغيير ضئيل أمام مسافة إضافية، لأن ضياع المسافة الحر (FSPL) يزداد 6 dB مع مضاعفة المسافة!\n\nقيم dBm النموذجية التي يجب حفظها عن ظهر قلب:\n\n- 30 dBm = 1 W (حد الإرسال الأقصى الشائع)\n- -30 dBm: إشارة ممتازة (قريب جداً من نقطة الوصول)\n- -50 dBm: ممتاز\n- -67 dBm: هدف التصميم للصوت والفيديو والتجوال\n- -70 dBm: جيد للبيانات العادية\n- -80 dBm: ضعيف، إعادة إرسال متزايدة\n- -90 dBm: شبه غير قابل للاستخدام",
          en: "dBm is not a linear power unit but a logarithmic one referenced to 1 milliwatt: dBm = 10 × log10(mW). The practical benefit: adding and subtracting in dB maps to multiplying and dividing in linear units.\n\nRules to memorize: every +3 dB doubles the power, every +10 dB is ten times. Raising transmit from 50 to 100 mW is only +3 dB — a tiny change against distance, because Free Space Path Loss grows by 6 dB each time distance doubles!\n\nTypical dBm values to know by heart:\n\n- 30 dBm = 1 W (common regulatory max)\n- -30 dBm: excellent (very close to the AP)\n- -50 dBm: excellent\n- -67 dBm: design target for voice, video and roaming\n- -70 dBm: fine for ordinary data\n- -80 dBm: weak, rising retries\n- -90 dBm: practically unusable",
        },
        code: {
          lang: "text",
          snippet: "mW      → dBm\n1 mW    =  0 dBm\n10 mW   = 10 dBm\n50 mW   ≈ 17 dBm\n100 mW  = 20 dBm\n200 mW  ≈ 23 dBm\n500 mW  ≈ 27 dBm\n1000 mW = 30 dBm\n\nDoubling power   = +3 dB\nHalving power    = -3 dB\nDoubling distance = +6 dB loss (FSPL)\nDoubling frequency = +6 dB loss (FSPL)",
        },
      },
      {
        heading: { ar: "الضوضاء و SNR: الحكم الحقيقي على الجودة", en: "Noise & SNR: The Real Quality Judge" },
        body: {
          ar: "الإشارة وحدها لا تحدد الجودة؛ ما يحددها هو الفرق بينها وبين أرضية الضوضاء (Noise Floor). نسبة الإشارة إلى الضوضاء SNR = RSSI − Noise، وكلما زادت استطاع المستقبِل تمييز الرموز واستخدام تعديل أعلى (QAM) وبالتالي سرعة أعلى.\n\nأرضية الضوضاء النموذجية في بيئة مكتبية نظيفة حوالي -95 dBm، فإشارة -67 dBm تعطي SNR = 28 dB. أما في بيئة مزدحمة (ميكروويف، بلوتوث، نقاط وصول الجيران) فقد ترتفع الضوضاء إلى -85 dBm فتهبط SNR إلى 18 dB وتنخفض سرعة الارتباط درجة أو درجتين.\n\nعندما يهبط SNR تحت ~15 dB يبدأ المتلقِي في فقدان الإطارات، فيعيد المرسِل الإرسال مرات ومرات (Retries)، وينهار الأداء الفعلي حتى لو ظهرت الإشارة قوية في الهاتف. لهذا تُقاس صحة الشبكة بـ SNR وإعادة الإرسال، لا بأشرطة الإشارة.\n\n- SNR فوق 40 dB: تعديل أعلى وسرعة قصوى\n- 25-40 dB: ممتاز لأغلب التطبيقات\n- 15-25 dB: مقبول لكن حساس للتداخل\n- أقل من 15 dB: إعادة إرسال وانهيار أداء",
          en: "Signal alone does not decide quality; the difference between it and the noise floor does. SNR = RSSI − Noise. The higher the SNR, the better the receiver can distinguish symbols, use higher-order modulation (QAM), and thus higher data rates.\n\nA typical noise floor in a clean office is about -95 dBm, so a -67 dBm signal yields SNR = 28 dB. In a congested environment (microwave ovens, Bluetooth, neighboring APs) noise may rise to -85 dBm, dropping SNR to 18 dB and the link rate by one or two MCS steps.\n\nWhen SNR falls below roughly 15 dB the receiver starts losing frames, the sender retransmits repeatedly, and effective throughput collapses even if the phone shows strong bars. That is why network health is measured in SNR and retries, not in signal bars.\n\n- SNR above 40 dB: top modulation and maximum rate\n- 25-40 dB: excellent for most applications\n- 15-25 dB: acceptable but interference-sensitive\n- below 15 dB: retries and performance collapse",
        },
        tip: {
          ar: "قاعدة التصميم الاحترافية: صمم لهدف -67 dBm مع SNR لا يقل عن 25 dB في أي نقطة يستخدمها المتنقلون — هذان الرقمان معاً هما العقد الذي توقّعه مع المستخدم.",
          en: "Professional design rule: target -67 dBm with at least 25 dB SNR at every roaming point — these two numbers together are the contract you sign with the user.",
        },
      },
      {
        heading: { ar: "عرض القناة: 20/40/80/160/320 MHz", en: "Channel Width: 20/40/80/160/320 MHz" },
        body: {
          ar: "عرض القناة هو عدد الموجات الحاملة المتجمعة في ربط واحد: كل مضاعفة للعرض تضاعف السعة النظرية تقريباً، لكنها تستهلك طيفاً مضاعفاً وتقلل عدد القنوات المتاحة، وتجعل الاستقبال أكثر حساسية للضوضاء والتداخل المجاور.\n\nفي 2.4 GHz لا يجوز عملياً استخدام 40 MHz لأنها تبتلع القنوات الثلاث غير المتداخلة كلها وتصطدم بشبكات الجيران. في 5 GHz يُستخدم 40 و 80 MHz شائعاً، و 160 MHz متاح لكنه نادر الإتاحة عملياً (يتطلب قنوات DFS متجاورة أو 80+80).\n\nالقاعدة التخطيطية: لا تخلط عروضاً مختلفة لنفس القناة في نفس منطقة التغطية؛ فإشارة 20 MHz العريضة تعمل كتداخل مجاور (ACI) لقناتها الأم. ابدأ بـ 20 MHz في المناطق المزدحمة كثيرة نقاط الوصول، ووسّع فقط عندما تثبت المسح أن الطيف نظيف.\n\n- 20 MHz: أفضل تعايش وأكثر قنوات\n- 40/80 MHz: معيار المكاتب الحديثة في 5 GHz\n- 160/320 MHz: نقطة وصول واحدة، بيئة مفتوحة، 6 GHz",
          en: "Channel width is the number of subcarriers bonded together: each doubling of width nearly doubles theoretical capacity, but consumes double spectrum, halves the channel count, and makes reception more sensitive to noise and adjacent interference.\n\nIn 2.4 GHz using 40 MHz is practically forbidden — it swallows all three non-overlapping channels and collides with neighbors. In 5 GHz, 40 and 80 MHz are common, while 160 MHz exists but is rarely practical (requires contiguous DFS channels or 80+80).\n\nPlanning rule: never mix widths on the same channel within the same coverage area; a 40 MHz emission acts as adjacent-channel interference on its parent 20 MHz channels. Start at 20 MHz in dense multi-AP areas and widen only when a survey proves clean spectrum.\n\n- 20 MHz: best coexistence, most channels\n- 40/80 MHz: the modern office standard in 5 GHz\n- 160/320 MHz: single-AP open spaces, 6 GHz",
        },
        code: {
          lang: "bash",
          snippet: "# عرض الاتصال الحالي وقوته على لينكس\niw dev wlan0 link\n\n# تعيين قناة وعرض يدوياً (بطاقة تدعم وضع المراقبة/الإدارة)\nsudo iw dev wlan0 set channel 36 HT20     # 20 MHz\nsudo iw dev wlan0 set channel 149 HT40+    # 40 MHz\n\n# عرض قنوات كل نقاط الوصول المرئية وتردداتها\nnmcli -f SSID,SIGNAL,CHAN,FREQ dev wifi list",
        },
      },
    ],
    keyPoints: [
      { ar: "التردد والطول الموجي علاقة عكسية: تردد أعلى = سرعة أعلى ومدى أقصر", en: "Frequency and wavelength are inversely related: higher frequency = higher speed, shorter range" },
      { ar: "في 2.4 GHz لا يوجد سوى 3 قنوات غير متداخلة: 1 و 6 و 11", en: "2.4 GHz has only 3 non-overlapping channels: 1, 6 and 11" },
      { ar: "dBm مقياس لوغاريتمي: +3 dB يعني مضاعفة القدرة، و +6 dB ضياع إضافي مع مضاعفة المسافة", en: "dBm is logarithmic: +3 dB doubles power, +6 dB is the extra loss when distance doubles" },
      { ar: "SNR = الإشارة − الضوضاء؛ هو الحكم الحقيقي على الجودة وليس قوة الإشارة وحدها", en: "SNR = signal − noise; it is the real quality judge, not signal strength alone" },
      { ar: "هدف التصميم الاحترافي: -67 dBm مع SNR ≥ 25 dB في مناطق التجوال", en: "Professional target: -67 dBm with SNR ≥ 25 dB in roaming areas" },
      { ar: "عرض القناة الأوسع = سرعة أعلى لكن قنوات أقل وحساسية أكبر للتداخل", en: "Wider channel = higher speed but fewer channels and more interference sensitivity" },
    ],
    commands: [
      { cmd: "iw dev wlan0 link", desc: { ar: "عرض تفاصيل الاتصال اللاسلكي الحالي بما فيها قوة الإشارة (لينكس)", en: "Show current wireless link details including signal strength (Linux)" } },
      { cmd: "nmcli -f SSID,SIGNAL,CHAN,FREQ dev wifi list", desc: { ar: "سرد شبكات WiFi المرئية مع قوة الإشارة والقناة والتردد", en: "List visible WiFi networks with signal, channel and frequency" } },
      { cmd: "sudo iw dev wlan0 set channel 36 HT20", desc: { ar: "ضبط القناة وعرض القناة يدوياً (36 بعرض 20 MHz)", en: "Manually set channel and width (36 at 20 MHz)" } },
      { cmd: "netsh wlan show interfaces", desc: { ar: "عرض حالة الواجهة اللاسلكية في ويندوز: القناة والنطاق ونسبة الإشارة", en: "Show wireless interface status in Windows: channel, band and signal percentage" } },
    ],
    quiz: [
      {
        q: { ar: "كم قناة غير متداخلة بعرض 20 MHz يوفرها نطاق 2.4 GHz؟", en: "How many non-overlapping 20 MHz channels does 2.4 GHz offer?" },
        options: [
          { ar: "11 قناة", en: "11 channels" },
          { ar: "5 قنوات", en: "5 channels" },
          { ar: "3 قنوات", en: "3 channels" },
          { ar: "13 قناة", en: "13 channels" },
        ],
        correct: 2,
        explain: { ar: "رغم وجود 14 قناة مسماة، تباعدها 5 MHz فقط؛ فالقنوات غير المتداخلة الوحيدة بعرض 20 MHz هي 1 و 6 و 11.", en: "Although 14 channels exist, they are spaced only 5 MHz apart; the only non-overlapping 20 MHz set is 1, 6 and 11." },
      },
      {
        q: { ar: "إذا كانت الإشارة RSSI = -65 dBm وأرضية الضوضاء = -95 dBm، فما قيمة SNR؟", en: "If RSSI = -65 dBm and the noise floor is -95 dBm, what is the SNR?" },
        options: [
          { ar: "160 dB", en: "160 dB" },
          { ar: "25 dB", en: "25 dB" },
          { ar: "30 dB", en: "30 dB" },
          { ar: "20 dB", en: "20 dB" },
        ],
        correct: 2,
        explain: { ar: "SNR هو فرق اللوغاريتمات: -65 − (-95) = +30 dB، وهي قيمة ممتازة تدعم أعلى معدلات التعديل.", en: "SNR is the difference of the logs: -65 − (-95) = +30 dB, an excellent value supporting top modulation rates." },
      },
      {
        q: { ar: "مضاعفة قدرة الإرسال من 100 mW إلى 200 mW تعادل زيادة قدرها:", en: "Doubling transmit power from 100 mW to 200 mW equals a gain of:" },
        options: [
          { ar: "+3 dB", en: "+3 dB" },
          { ar: "+6 dB", en: "+6 dB" },
          { ar: "+10 dB", en: "+10 dB" },
          { ar: "+2 dB", en: "+2 dB" },
        ],
        correct: 0,
        explain: { ar: "المضاعفة الخطية = +3 dB لوغاريتمياً. لهذا نادراً ما تنقذ رفعُ القدرة مشكلةَ مدى حقيقية.", en: "Linear doubling = +3 dB logarithmically. This is why raising power rarely solves a real range problem." },
      },
      {
        q: { ar: "ما الأثر الجانبي الرئيس لتوسيع عرض القناة من 20 إلى 40 MHz؟", en: "What is the main side effect of widening a channel from 20 to 40 MHz?" },
        options: [
          { ar: "انخفاض السعة النظرية", en: "Lower theoretical capacity" },
          { ar: "زيادة عدد القنوات المتاحة", en: "More available channels" },
          { ar: "استهلاك ضعف الطيف وحساسية أعلى للتداخل المجاور", en: "Double spectrum consumption and higher adjacent-interference sensitivity" },
          { ar: "إلغاء الحاجة إلى DFS", en: "Removing the need for DFS" },
        ],
        correct: 2,
        explain: { ar: "الربط المزدوج يضاعف السعة لكنه يستهلك ضعف الطيف، فيقل عدد القنوات ويزداد التداخل المجاور — قاعدة مقايضة صارمة.", en: "Bonding doubles capacity but consumes double spectrum, halving channel count and increasing adjacent interference — a strict trade-off." },
      },
    ],
  },

  // ─── l092: 802.11 evolution ──────────────────────────────────────────
  {
    id: "l092",
    moduleId: "m10",
    order: 2,
    level: "expert",
    title: {
      ar: "رحلة 802.11 الكاملة: من WiFi 1 إلى WiFi 7",
      en: "The Full 802.11 Journey: From WiFi 1 to WiFi 7",
    },
    summary: {
      ar: "تاريخ معايير 802.11 من b و a و g حتى n و ac و ax و be: كيف سمّاها تحالف WiFi بأرقام بسيطة، وما الذي أضافه كل جيل فعلياً من MIMO إلى MU-MIMO إلى OFDMA إلى MLO.",
      en: "The history of 802.11 standards from b, a and g through n, ac, ax and be: how the WiFi Alliance renamed them with simple numbers, and what each generation truly added — MIMO, MU-MIMO, OFDMA, MLO.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "لماذا ظهرت تسميات WiFi 4 و 5 و 6؟", en: "Why WiFi 4/5/6 Numbering Exists" },
        table: {
          caption: { ar: "الميزة المميزة لكل جيل من WiFi 4 إلى WiFi 7", en: "The defining feature of each generation from WiFi 4 to WiFi 7" },
          headers: [
            { ar: "الجيل", en: "Generation" },
            { ar: "الميزة المميزة", en: "Defining feature" },
            { ar: "الفائدة العملية", en: "Practical benefit" },
          ],
          rows: [
            [
              { ar: "WiFi 4 (802.11n)", en: "WiFi 4 (802.11n)" },
              { ar: "MIMO وتشغيل مزدوج للنطاقين", en: "MIMO and dual-band operation" },
              { ar: "سعة مضاعفة بلا طيف إضافي", en: "Doubled capacity without extra spectrum" },
            ],
            [
              { ar: "WiFi 5 (802.11ac)", en: "WiFi 5 (802.11ac)" },
              { ar: "MU-MIMO هابط وعروض 80/160 MHz", en: "Downlink MU-MIMO and 80/160 MHz" },
              { ar: "سرعات جيجابت في 5 GHz", en: "Gigabit speeds in 5 GHz" },
            ],
            [
              { ar: "WiFi 6 (802.11ax)", en: "WiFi 6 (802.11ax)" },
              { ar: "OFDMA و TWT و BSS Color", en: "OFDMA, TWT and BSS Color" },
              { ar: "كفاءة في الازدحام وعمر بطارية أطول", en: "Efficiency under congestion plus battery life" },
            ],
            [
              { ar: "WiFi 6E", en: "WiFi 6E" },
              { ar: "طيف 6 GHz نظيف (1200 MHz)", en: "Clean 6 GHz spectrum (1200 MHz)" },
              { ar: "قنوات واسعة بلا أجهزة قديمة", en: "Wide channels with zero legacy" },
            ],
            [
              { ar: "WiFi 7 (802.11be)", en: "WiFi 7 (802.11be)" },
              { ar: "MLO و 320 MHz و 4096-QAM", en: "MLO, 320 MHz and 4096-QAM" },
              { ar: "موثوقية وتوزيع حمل عبر الروابط", en: "Reliability and load balancing across links" },
            ],
          ],
        },
        body: {
          ar: "منذ 1999 وحتى 2018 كانت المعايير تسمى بأسماء IEEE الغامضة: 802.11b ثم 802.11g ثم 802.11n ثم 802.11ac — أسماء لا تخبر المستخدم أيها أحدث ولا بأي ميزة.\n\nفي 2018 اعتمد تحالف WiFi (Wi-Fi Alliance) إعادة تسمية تسويقية بسيطة: كل جيل يأخذ رقماً متسلسلاً. وهكذا صار 802.11n هو WiFi 4، و 802.11ac هو WiFi 5، و 802.11ax هو WiFi 6، و 802.11be هو WiFi 7.\n\nهذه الأرقام ليست سرعات: WiFi 6 ليس بالضرورة أسرع من WiFi 5 في بيئة هادئة بمستخدم واحد؛ قوته الحقيقية في البيئات المزدحمة. فهمك لماذا يتفوق كل جيل يفصلك عن المهندس الذي يحفظ الأرقام فقط.",
          en: "From 1999 to 2018 the standards carried cryptic IEEE names: 802.11b, then g, then n, then ac — names that told users nothing about which is newer or better.\n\nIn 2018 the Wi-Fi Alliance adopted simple marketing numbering: each generation gets a sequential digit. 802.11n became WiFi 4, 802.11ac became WiFi 5, 802.11ax became WiFi 6, and 802.11be became WiFi 7.\n\nThese numbers are not speeds: WiFi 6 is not automatically faster than WiFi 5 in a quiet single-user environment; its real power shows in dense deployments. Understanding why each generation wins is what separates you from engineers who only memorize numbers.",
        },
        code: {
          lang: "text",
          snippet: "Name      Standard    Year   Bands (GHz)   Max PHY rate   Key tech\nWiFi 1    802.11b     1999   2.4           11 Mbps        DSSS\nWiFi 2    802.11a     1999   5             54 Mbps        OFDM\nWiFi 3    802.11g     2003   2.4           54 Mbps        OFDM\nWiFi 4    802.11n     2009   2.4 / 5       600 Mbps       MIMO 4x4, 40 MHz\nWiFi 5    802.11ac    2014   5 only        ~6.9 Gbps      MU-MIMO DL, 160 MHz, 256-QAM\nWiFi 6    802.11ax    2019   2.4 / 5       ~9.6 Gbps      OFDMA, TWT, BSS Color, 1024-QAM\nWiFi 6E   802.11ax    2020   + 6 GHz       same           clean 1200 MHz spectrum\nWiFi 7    802.11be    2024   2.4/5/6       ~46 Gbps       320 MHz, 4096-QAM, MLO",
        },
      },
      {
        heading: { ar: "الجيل الأول: 802.11b/a/g — وضع الأساس", en: "First Generation: 802.11b/a/g — Laying the Foundation" },
        body: {
          ar: "802.11b (1999) كان أول انتشار واسع: 2.4 GHz بتقنية DSSS وسرعة 11 Mbps — بطيء لكنه صنع سوق WLAN بالكامل.\n\nفي السنة نفسها صدر 802.11a وهو مفارقة تاريخية: تقدّم تقنياً (5 GHz و OFDM و 54 Mbps) لكنه فشل تجارياً بسبب غلاء الشرائح وقلة المعدات، بينما انتشر b الرديء تقنياً. النطاقان بُنيا من أصل مختلف فلا يتكاملان فيزيائياً.\n\nثم جاء 802.11g (2003) ليوفّق بين الطرفين: سرعة a بتقنية OFDM لكن في نطاق b الشائع 2.4 GHz، مع توافق عكسي مع b — وهنا وُلد الجدل الأبدي: الجهاز b الواحد يُجبر الشبكة كلها على آليات حماية تُبطئ الجميع.\n\n- b: انتشار واسع وسعة هزيلة\n- a: تقدم مبكر بلا سوق\n- g: زواج ناجح أنتج عصر الـ hotspots",
          en: "802.11b (1999) was the first mass deployment: 2.4 GHz using DSSS at 11 Mbps — slow, but it created the entire WLAN market.\n\nIn the same year came 802.11a, a historical irony: technically superior (5 GHz, OFDM, 54 Mbps) yet commercially failed due to expensive chipsets, while technically poorer b spread everywhere. The two bands were designed so differently they could not interoperate physically.\n\nThen 802.11g (2003) reconciled both camps: a-class OFDM speed in b-popular 2.4 GHz with backward compatibility — and here was born the eternal lesson: one legacy b client forces protection mechanisms that slow the whole cell.\n\n- b: wide adoption, miserable capacity\n- a: early advance with no market\n- g: the successful marriage that created the hotspot era",
        },
        tip: {
          ar: "قاعدة بقاء حتى اليوم: أبطأ جهاز في الخلية يسحب الشبكة كلها إلى آليات الحماية القديمة. اعزل أجهزة 802.11b/g القديمة في SSID منفصل أو عطّل معدلاتها الموروثة.",
          en: "A rule that survives today: the slowest client in the cell drags the whole network into legacy protection. Isolate ancient b/g clients on a separate SSID or disable legacy rates.",
        },
      },
      {
        heading: { ar: "802.11n — WiFi 4: عصر MIMO", en: "802.11n — WiFi 4: The MIMO Era" },
        body: {
          ar: "جاء 802.11n سنة 2009 بقفزة مفهومية لا مجرد زيادة سرعة: التعدد المكاني (Spatial Multiplexing) عبر MIMO — عدة هوائيات ترسل تدفقات مستقلة في نفس القناة ونفس الزمن، وتفصلها المعالجة الرقمية عند المستقبِل.\n\n2x2 MIMO تعني ضعف السعة النظرية، و 4x4 أربعة أضعاف، مع Greenfield للأجهزة المتوافقة فقط. أُضيف ربط القنوات 40 MHz فتضاعفت السعة مرة أخرى، وظهر تجميع الإطارات A-MPDU/A-MSDU لتقليل الهدر الزمني في التأكيدات.\n\nالقفزة الثالثة: 802.11n أول معيار يشغّل النطاقين 2.4 و 5 GHz معاً (وضع مزدوج)، فبدأ انتقال العالم التدريجي إلى 5 GHz. الحد النظري 600 Mbps لم يتحقق عملياً قط، لكن الواقع 150-300 Mbps كان ثورة آنذاك.\n\n- MIMO: سعة مضاعفة دون طيف إضافي\n- 40 MHz: طيف مضاعف\n- تجميع الإطارات: كفاءة MAC أعلى\n- Beamforming صريح (Explicit TxBF) بدأ هنا",
          en: "802.11n arrived in 2009 with a conceptual leap, not just a speed bump: spatial multiplexing via MIMO — multiple antennas transmitting independent streams in the same channel and time, separated digitally at the receiver.\n\n2x2 MIMO doubles theoretical capacity, 4x4 quadruples it. 40 MHz channel bonding doubled capacity again, and frame aggregation (A-MPDU/A-MSDU) cut the time wasted on acknowledgments.\n\nThe third leap: 802.11n was the first standard to run both 2.4 and 5 GHz concurrently (dual-band), starting the world's gradual migration to 5 GHz. The 600 Mbps theoretical ceiling was never reached, but real-world 150-300 Mbps was revolutionary at the time.\n\n- MIMO: doubled capacity without extra spectrum\n- 40 MHz: doubled spectrum\n- Frame aggregation: higher MAC efficiency\n- Explicit beamforming (TxBF) began here",
        },
      },
      {
        heading: { ar: "802.11ac — WiFi 5: MU-MIMO والعرض الكبير", en: "802.11ac — WiFi 5: MU-MIMO & Big Widths" },
        body: {
          ar: "ركز 802.11ac (2013-2015) بالكامل على نطاق 5 GHz وترك 2.4 لعهدة WiFi 4، ليصوّب كل طاقته على السعة الخام: 80 MHz كمعيار، و 160 MHz (أو 80+80 غير المتجاور) كخيار، و 256-QAM ترفع البتات لكل رمز من 6 إلى 8.\n\nالموجة الثانية (Wave 2) جاءت بالميزة الأهم: MU-MIMO للاتجاه الهابط — نقطة الوصول ترسل في نفس اللحظة تدفقات مكانية مختلفة لمستخدمين مختلفين، فلا تنتظر كل جهاز دوره في الطابور. كما ظهر Beamforming صريح مبسّط (Sounding frames بـ VHT NDP).\n\nبحساب سريع: 4x4 MU-MIMO مع 160 MHz و 256-QAM يعطي ~6.9 Gbps نظرياً — لكن هذه أرقام مختبر؛ فالواقع أن MU-MIMO الهابط لم يعطِ في الميدان المكاسب الموعودة إلا في بيئات محددة، بينما MU-MIMO الصاعد تأخر حتى WiFi 6...\n\n- Wave 1: 80 MHz و 3x3 — واقع 400-800 Mbps\n- Wave 2: 160 MHz و 4x4 و MU-MIMO هابط\n- الجدران الأربعة للمعيار: ترميز أقصر نطاقاً، DFS إلزامي لقنوات كثيرة",
          en: "802.11ac (2013-2015) focused entirely on 5 GHz and left 2.4 to WiFi 4, aiming all its power at raw capacity: 80 MHz as the norm, 160 MHz (or non-contiguous 80+80) as an option, and 256-QAM raising bits per symbol from 6 to 8.\n\nWave 2 brought the headline feature: downlink MU-MIMO — the AP transmits different spatial streams to different users simultaneously, so devices no longer queue for their turn. Simplified explicit beamforming (VHT NDP sounding) arrived too.\n\nQuick math: 4x4 MU-MIMO with 160 MHz and 256-QAM yields ~6.9 Gbps theoretical — lab numbers only; in the field, downlink MU-MIMO underdelivered except in specific environments, while uplink MU-MIMO waited until WiFi 6...\n\n- Wave 1: 80 MHz and 3x3 — real 400-800 Mbps\n- Wave 2: 160 MHz, 4x4 and downlink MU-MIMO\n- The standard's walls: shorter-range coding and mandatory DFS on many channels",
        },
      },
      {
        heading: { ar: "802.11ax — WiFi 6 و 6E: ثورة الكفاءة", en: "802.11ax — WiFi 6 & 6E: The Efficiency Revolution" },
        body: {
          ar: "فهم مهندسو 11ax أن معركة الجيل القادم ليست السعة القصوى بل الكفاءة في الازدحام: نقطة وصول واحدة تخدم عشرات الأجهزة في سوق أو مطار أو ملعب. الجواب كان OFDMA المستعار من LTE.\n\nOFDMA يقسّم القناة إلى وحدات موارد (Resource Units): 20 MHz = 256 ناقِلة فرعية تُجمع في حزم 26/52/106/242 ناقِلة. فبدل أن يستأثر جهاز واحد بالقناة كاملة في كل فرصة إرسال، تخدم نقطة الوصول 8 أجهزة في نفس الوقت بخصائص متفاوتة (جهاز IoT بحزمة صغيرة، وحاسوب بحزمة كبيرة).\n\nأضف إلى ذلك: BSS Coloring لتلوين إطارات الجيران فتتجاهلها البطاقة بدل التعامل معها كتداخل، و TWT (Target Wake Time) لجدولة إيقاظ أجهزة البطاريات فتطول أعمارها أضعافاً، و 1024-QAM، و MU-MIMO صاعد أخيراً حتى 8 تدفقات.\n\nثم في 2020 جاء 6E ففتح نطاق 6 GHz كاملاً لمعيار ax نفسه: طيف نظيف بلا أجهزة قديمة، ووحدات موارد أوسع تصل 996 ناقِلة — وهذا وحده كان أكبر هدية للشبكات المؤسسية منذ عقود.",
          en: "The 11ax designers understood that the next battle was not peak speed but efficiency under congestion: one AP serving dozens of devices in a mall, airport or stadium. The answer was OFDMA, borrowed from LTE.\n\nOFDMA slices the channel into Resource Units: 20 MHz = 256 subcarriers grouped into bundles of 26/52/106/242. Instead of one device hogging the whole channel per transmission opportunity, the AP serves 8 devices simultaneously with right-sized allocations (an IoT device gets a small RU, a laptop a large one).\n\nOn top of that: BSS Coloring tags neighbor frames so your radio ignores them instead of treating them as interference, TWT (Target Wake Time) schedules battery-device wakeups to multiply their battery life, 1024-QAM, and finally uplink MU-MIMO up to 8 streams.\n\nThen in 2020, 6E opened the full 6 GHz band to the same ax standard: clean spectrum with zero legacy devices and wider RUs up to 996 subcarriers — alone the biggest gift to enterprise WLANs in decades.",
        },
        tip: {
          ar: "عند شراء معدات اليوم اسأل عن WiFi 6/6E وليس مجرد سرعة: OFDMA و TWT هما ما يصنع الفرق في منزلك المزدحم بأجهزة IoT، لا رقم الجيجابت على العلبة.",
          en: "When buying gear today, ask for WiFi 6/6E rather than raw speed: OFDMA and TWT make the difference in an IoT-packed home, not the gigabit number on the box.",
        },
      },
      {
        heading: { ar: "802.11be — WiFi 7: MLO والقفزة الأخيرة", en: "802.11be — WiFi 7: MLO & The Latest Leap" },
        body: {
          ar: "أُقرّ 802.11be نهائياً سنة 2024، وأهدافه: 320 MHz من عرض القناة (متاح فعلياً في 6 GHz فقط)، و 4096-QAM (12 بت لكل رمز)، و 16 تدفقاً مكانياً، وربط قنوات غير متجاورة من نطاقات مختلفة.\n\nميزته التأسيسية MLO (Multi-Link Operation): الجهاز ونقطة الوصول يتفقان على قنوات/نطاقات متعددة في آن واحد، فتنتقل التدفقات بينها حسب الجودة والازدحام لحظياً، مع إمكان تكرار الإطار الحرج على رابطين معاً (موثوقية ألعاب/صوت) أو توزيعهما (زيادة إنتاجية).\n\nبالعمق الهندسي: MLO يجعل الحديث عن إطارات (Frames) على رابط واحد صار تاريخاً؛ العلاقة صارت مجموعة روابط منطقية واحدة فوق روابط فيزيائية متعددة — أشبه بـ EtherChannel لكن على مستوى اللاسلكي وبإدارة أذكى.\n\n- 320 MHz و 4096-QAM: سرعات نظرية تصل ~46 Gbps\n- MLO: موثوقية وتوزيع حِمل عبر النطاقات الثلاثة\n- تعديل ترميز مزدوج معدّل (MCS 0-13 + أزواج) وتحسين OFDMA",
          en: "802.11be was finalized in 2024, targeting: 320 MHz channels (practically available only in 6 GHz), 4096-QAM (12 bits per symbol), 16 spatial streams, and bonding of non-contiguous channels across bands.\n\nIts foundational feature is MLO (Multi-Link Operation): device and AP negotiate multiple channels/bands simultaneously, and traffic moves between them instantly based on quality and congestion — with the option to duplicate a critical frame on two links at once (gaming/voice reliability) or to stripe them (throughput).\n\nAt engineering depth: MLO makes single-link frame conversations history; the relationship is now one logical link group over multiple physical links — like an EtherChannel, but wireless and smarter.\n\n- 320 MHz and 4096-QAM: theoretical rates up to ~46 Gbps\n- MLO: reliability and load balancing across all three bands\n- Refined MCS tables and improved OFDMA scheduling",
        },
      },
    ],
    keyPoints: [
      { ar: "أرقام WiFi 4/5/6/7 تسميات تسويقية من تحالف WiFi لمعايير IEEE n/ac/ax/be", en: "WiFi 4/5/6/7 numbers are Wi-Fi Alliance marketing names for IEEE n/ac/ax/be" },
      { ar: "802.11n أدخل MIMO وربط 40 MHz والتشغيل المزدوج 2.4/5 GHz", en: "802.11n introduced MIMO, 40 MHz bonding and dual-band 2.4/5 GHz operation" },
      { ar: "802.11ac انفرد بـ 5 GHz وأضاف MU-MIMO هابطاً و 160 MHz و 256-QAM", en: "802.11ac was 5 GHz only, adding downlink MU-MIMO, 160 MHz and 256-QAM" },
      { ar: "802.11ax غيّر المعادلة من السعة إلى الكفاءة: OFDMA و BSS Color و TWT", en: "802.11ax shifted the equation from peak speed to efficiency: OFDMA, BSS Color, TWT" },
      { ar: "WiFi 6E أضاف نطاق 6 GHz النظيف؛ WiFi 7 أضاف 320 MHz و 4096-QAM و MLO", en: "WiFi 6E added the clean 6 GHz band; WiFi 7 added 320 MHz, 4096-QAM and MLO" },
    ],
    commands: [
      { cmd: "iw list", desc: { ar: "عرض قدرات جهازك اللاسلكي: النطاقات والمعايير المدعومة حتى HE (WiFi 6)", en: "Show your wireless device capabilities: bands and supported standards up to HE (WiFi 6)" } },
      { cmd: "iw phy", desc: { ar: "تفاصيل طبقة PHY: تدفقات MIMO وعروض القنوات وقدرات OFDMA", en: "PHY layer details: MIMO streams, channel widths and OFDMA capabilities" } },
      { cmd: "nmcli dev wifi list", desc: { ar: "مشاهدة نقاط الوصول المرئية ونطاقاتها (يمكنك تمييز أجيال WiFi من التردد)", en: "See visible APs and their bands (you can infer WiFi generations from frequency)" } },
    ],
    quiz: [
      {
        q: { ar: "أي معيار أدخل تقنية OFDMA إلى شبكات WiFi؟", en: "Which standard introduced OFDMA to WiFi networks?" },
        options: [
          { ar: "802.11ac (WiFi 5)", en: "802.11ac (WiFi 5)" },
          { ar: "802.11n (WiFi 4)", en: "802.11n (WiFi 4)" },
          { ar: "802.11ax (WiFi 6)", en: "802.11ax (WiFi 6)" },
          { ar: "802.11be (WiFi 7)", en: "802.11be (WiFi 7)" },
        ],
        correct: 2,
        explain: { ar: "OFDMA جوهر 802.11ax: تقسيم القناة لوحدات موارد تُخدم مستخدمين متعددين في فرصة إرسال واحدة — ثورة الازدحام.", en: "OFDMA is the heart of 802.11ax: slicing the channel into resource units serving multiple users in one transmission opportunity — the congestion revolution." },
      },
      {
        q: { ar: "ما التقنية المميزة لمعيار WiFi 7 (802.11be)؟", en: "What is the signature technology of WiFi 7 (802.11be)?" },
        options: [
          { ar: "MU-MIMO الهابط", en: "Downlink MU-MIMO" },
          { ar: "BSS Coloring", en: "BSS Coloring" },
          { ar: "TWT لجدولة الاستيقاظ", en: "TWT wake scheduling" },
          { ar: "MLO لتشغيل عدة روابط في آن واحد", en: "MLO multi-link simultaneous operation" },
        ],
        correct: 3,
        explain: { ar: "MLO يجعل الجهاز متصلاً عبر قنوات ونطاقات متعددة معاً مع ترحيل التدفقات والتكرار للموثوقية — وهي قفزة جوهرية في 11be.", en: "MLO keeps the device connected over multiple channels and bands at once with traffic steering and duplication for reliability — 11be's core leap." },
      },
      {
        q: { ar: "802.11ac يعمل حصرياً في:", en: "802.11ac operates exclusively in:" },
        options: [
          { ar: "نطاق 2.4 GHz", en: "The 2.4 GHz band" },
          { ar: "نطاق 5 GHz", en: "The 5 GHz band" },
          { ar: "نطاقي 2.4 و 5 GHz", en: "Both 2.4 and 5 GHz bands" },
          { ar: "نطاق 6 GHz", en: "The 6 GHz band" },
        ],
        correct: 1,
        explain: { ar: "صمم 11ac لنطاق 5 GHz فقط، وترك 2.4 GHz لمعيار n — لهذا ترجع أجهزة IoT القديمة إلى WiFi 4.", en: "11ac was designed for 5 GHz only, leaving 2.4 GHz to n — which is why legacy IoT devices fall back to WiFi 4." },
      },
      {
        q: { ar: "ما الفائدة العملية الأساسية لتقنية TWT في WiFi 6؟", en: "What is the main practical benefit of TWT in WiFi 6?" },
        options: [
          { ar: "زيادة السعة القصوى للقناة", en: "Increasing maximum channel capacity" },
          { ar: "إطالة عمر بطارية الأجهزة بجدولة أوقات الاستيقاظ", en: "Extending device battery life by scheduling wake times" },
          { ar: "تشفير البيانات بين الجهاز ونقطة الوصول", en: "Encrypting data between device and AP" },
          { ar: "تسريع التجوال بين نقاط الوصول", en: "Speeding up roaming between APs" },
        ],
        correct: 1,
        explain: { ar: "TWT يتفق مع كل جهاز على موعد استيقاظ محدد فلا يستمر في مراقبة القناة (حالة الاستعداد)، فينخفض استهلاك الطاقة جذرياً — حاسم لأجهزة IoT.", en: "TWT negotiates a specific wake time per device so it stops continuously monitoring the channel, drastically cutting power drain — decisive for IoT." },
      },
    ],
  },

  // ─── l093: WLAN design & site survey ─────────────────────────────────
  {
    id: "l093",
    moduleId: "m10",
    order: 3,
    level: "expert",
    title: {
      ar: "تصميم WLAN والمسح الموقعي: من الورق إلى الخريطة الحرارية",
      en: "WLAN Design & Site Survey: From Blueprint to Heatmap",
    },
    summary: {
      ar: "منهجية التصميم الاحترافي للشبكات اللاسلكية: التصميم للسعة لا للتغطية فقط، أنواع المسح الموقعي وقواعد توضع نقاط الوصول، ومعايير التجوال 802.11k/v/r والتحقق النهائي قبل التسليم.",
      en: "The professional methodology for wireless design: designing for capacity not just coverage, site survey types and AP placement rules, the 802.11k/v/r roaming standards, and final validation before handover.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "التصميم للتغطية مقابل التصميم للسعة", en: "Coverage-First vs Capacity-First Design" },
        body: {
          ar: "التصميم القديم (التغطية أولاً) يوزع نقاط الوصول لتغطية كل سنتيمتر بإشارة كافية — مقبول عام 2005 عندما كان الجهازان في كل مكتب. اليوم، غرفة اجتماعات واحدة تحمل 15 حاسوباً و20 هاتفاً، فيغدو السؤال الحقيقي: كم جهازاً في نفس الوقت وبأي تطبيقات؟\n\nالتصميم للسعة يبدأ من جرد المتطلبات: كثافة العملاء لكل منطقة، التطبيقات (صوت يحتاج -67 dBm وتأخير منخفض؛ فيديو مؤتمرات -65 dBm؛ تصفح عام -70 dBm)، ثم يحدد عدد نقاط الوصول من قسمة الحِمل، ثم يرسم التغطية فوق ذلك — عكس الطريق التقليدي.\n\nعلمياً: كل نقطة وصول WiFi 5/6 تخدم عملياً 25-35 جهازاً بجيدة في بيئة مكتبية، و50-60 جهازاً في 6 GHz بتوزيع محترم. مضاعفة عدد العملاء لا تُحل بمضاعفة قدرة الإرسال (الضجيج يتضاعف أيضاً) بل بتقسيم الخلايا وتقليل نطاق كل واحدة.\n\n- المصطلحان الشهيران: CCI (تداخل القنوات نفسها — طبيعي ومقبول بإدارة جيدة) و ACI (تداخل القنوات المجاورة — داء قاتل يُحظر)\n- خلايا أصغر + نقاط أكثر + طاقة أقل = شبكة سليمة",
          en: "The old coverage-first approach spreads APs so every centimeter gets enough signal — acceptable in 2005 with two devices per office. Today a single meeting room holds 15 laptops and 20 phones, so the real question is: how many concurrent devices, running which applications?\n\nCapacity design starts with a requirements inventory: client density per area, applications (voice needs -67 dBm with low latency; video conferencing -65 dBm; generic browsing -70 dBm), then derives AP count from load, then paints coverage on top — the reverse of the traditional path.\n\nRules of thumb: a WiFi 5/6 AP practically serves 25-35 concurrent clients well in an office, 50-60 in 6 GHz with decent distribution. Doubling clients is solved by shrinking cells and lowering power — never by raising transmit power (noise doubles too).\n\n- The two famous terms: CCI (co-channel interference — natural and acceptable when managed well) and ACI (adjacent-channel interference — a killer disease to be forbidden)\n- Smaller cells + more APs + lower power = a healthy network",
        },
      },
      {
        heading: { ar: "المسح الموقعي: الأنواع والأدوات", en: "The Site Survey: Types & Tools" },
        body: {
          ar: "المسح التنبؤي (Predictive): تحميل مخطط المبنى في أداة تصميم (Ekahau Survey أو Hamina أو AirMagnet) وإضافة مواد الجدران (خرسانة، زجاج، جبس) ومواصفات الأجهزة، فتحسب الأداة الانتشار بمعادلات FSPL و توهين الجدران وتنتج خريطة تقديرية. سريع ورخيص ويصلح كمسودة أولى قبل التركيب.\n\nالمسح السلبي (Passive): تجول بمقياس يستمع فقط للإشارات القائمة فيسجل RSSI والضوضاء والقنوات وSSID الموجودة — يكشف ازدحام الطيف وشبكات الجيران. لا يختبر الأداء الفعلي لأنه لا يرسل بيانات.\n\nالمسح الفعّال (Active): الجهاز يتصل فعلاً بالشبكة ويرسل بيانات أثناء التنقل فيقيس السعة والتأخير والتجوال — وهو الحكم النهائي. المسار الاحترافي: تنبؤي قبل التركيب ← تركيب مؤقت ← مسح تحققي فعال ← معايرة ثم تسليم.\n\n- 3 أنواع: تنبؤي على الورق، سلبي بالاستماع، فعّال بالاتصال والقياس\n- أدوات: Ekahau Sidekick و Hamina و WiFi Analyzer المجاني للبدايات",
          en: "Predictive survey: load the building floor plan into a design tool (Ekahau Survey, Hamina, AirMagnet), add wall materials (concrete, glass, drywall) and hardware specs; the tool computes propagation using FSPL equations and wall attenuation to produce an estimated map. Fast, cheap, ideal as a first draft before installation.\n\nPassive survey: walk the site with a meter that only listens to existing signals, recording RSSI, noise, channels and SSIDs — revealing spectrum congestion and neighbors. It does not test real performance because no data is sent.\n\nActive survey: the device actually associates to the network and sends data while walking, measuring throughput, latency and roaming — the final verdict. The professional path: predictive → temporary install → active validation survey → calibration → handover.\n\n- 3 types: predictive on paper, passive by listening, active by associating and measuring\n- Tools: Ekahau Sidekick, Hamina, and the free WiFi Analyzer for beginners",
        },
        tip: {
          ar: "قاعدة المواد: جدار جبس يُوهين الإشارة 3-4 dB، وخشب 5 dB، وخرسانة مسلحة 10-20 dB، والزجاج المعدني (Low-E) قد يصل 25-40 dB — الخريطة بلا جرد دقيق للمواد خيال علمي.",
          en: "Material rules of thumb: drywall attenuates 3-4 dB, wood ~5 dB, reinforced concrete 10-20 dB, and metallized Low-E glass can reach 25-40 dB — a survey without an accurate material inventory is science fiction.",
        },
      },
      {
        heading: { ar: "قواعد توضع نقاط الوصول", en: "AP Placement Rules" },
        diagram: {
          kind: "topology",
          title: { ar: "نمط إعادة استخدام القنوات بين نقاط وصول متجاورة", en: "The channel reuse pattern between neighboring APs" },
          nodes: ["AP1-CH36", "AP2-CH149", "AP3-CH36", "AP4-CH149", "مستخدمون متنقلون"],
          edges: [[0, 1], [1, 2], [2, 3], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4]],
        },
        body: {
          ar: "ارتفاع التركيب المثالي 4-6 أمتار (سقف المكاتب القياسي)؛ أعلى من ذلك تتحول الهوائيات إلى تغطية طابقين فوق المطلوب وتضعف الخدمة في الطابق المستهدف. تجنب القرب من المعادن والأسقف المعدنية وغرف المصاعد ومولدات البث.\n\nالتداخل الخلوي المطلوب للتجوال السلس 10-15% من نطاق الخلية: أقل منه تنقطع الجلسة أثناء الانتقال، وأكثر منه يخلق منطقة رمادية يتنازع فيها جهازان على العميل (منطقة Ping-Pong). مقياس عملي: عند أسوأ نقطة تجوال يجب ألا تقل قوة الخلية التالية عن -67 dBm أيضاً.\n\nالشبكة القابلة لإعادة الاستخدام (Channel Reuse) في 5 GHz: 1-3-6-9 قنوات متباعدة (40 MHz) في نمط شطرنجي بين الخلايا المتجاورة. في 6 GHz المرونة أكبر بكثير؛ وفي 2.4 GHz لا مفر من نمط 1-6-11 مع طاقة منخفضة.\n\n- لا تضع نقطة وصول داخل كابينة معدنية أو خلف جدار خرساني مواجه\n- الهوائيات الأحادية الاتجاه للدهاليز الطويلة بدلاً من هوائيات مسطحة\n- عدّ الأسقف المستعارة والمواسير عند حساب الارتفاع الفعلي",
          en: "Optimal mounting height is 4-6 meters (standard office ceilings); above that, antennas start illuminating the wrong floor and coverage on the target floor weakens. Avoid proximity to metal, metallic ceilings, elevator shafts and broadcast equipment.\n\nTarget cell overlap for seamless roaming is 10-15% of the cell radius: less breaks sessions mid-transition, more creates a gray zone where two APs fight over the client (the ping-pong effect). Practical rule: at the worst roaming point, the next cell must also be at -67 dBm or better.\n\nChannel reuse in 5 GHz: 1-3-6-9 spacing (40 MHz) in a chessboard pattern between adjacent cells. In 6 GHz you have far more freedom; in 2.4 GHz there is no escape from a 1-6-11 pattern with low power.\n\n- Never mount an AP inside a metal cabinet or behind a facing concrete wall\n- Use directional antennas for long corridors instead of omnis\n- Count drop ceilings and ductwork when computing effective height",
        },
        code: {
          lang: "bash",
          snippet: "# مسح سريع من حاسوب لينكس: كل AP مع القوة والقناة\nsudo iw dev wlan0 scan | grep -E 'SSID:|signal:|DS Parameter|primary channel'\n\n# قائمة مندمجة مفهومة (NetworkManager)\nnmcli -f SSID,SIGNAL,CHAN,FREQ,SECURITY dev wifi list\n\n# على ويندوز: القوة كنسبة، والقناة، والنطاق\nnetsh wlan show interfaces\nnetsh wlan show networks mode=bssid",
        },
      },
      {
        heading: { ar: "التجوال ومعايير 802.11k/v/r", en: "Roaming & the 802.11k/v/r Standards" },
        body: {
          ar: "التجوال (Roaming) هو انتقال العميل من نقطة وصول إلى أخرى دون انقطاع منطقي للجلسة — لكن زمن الانتقال الفيزيائي قد يقتل تطبيقات الوقت الحقيقي. المشكلة الكلاسيكية: إصرار الهاتف على البقاء متصلاً بنقطة بعيدة (التصاق العميل Sticky Client) لأن بطاقة شبكته متساهلة.\n\nثلاثة تعديلات تحل هذا معاً: 11k (تقارير القياس) يزود العميل بقائمة الجيران وقنواتهم وقوتهم فيختار بمعرفة بدل المسح العشوائي الطويل؛ 11v (إدارة الشبكة) يسمح لنقطة الوصول أن تقترح على العميل الانتقال لنقطة أفضل؛ 11r (الانتقال السريع FT) يلغي مصافحة 802.1X الكاملة عند التنقل ويستبدلها بمشتق مفتاح PMKR0/PMKR1 فينزل زمن التجوال من مئات الميلي ثانية إلى عشرات.\n\nفي شبكات WPA3-Enterprise مع 802.11r يجب ضبط RADIUS ليدعم مفاتيح PMK الوسيطة؛ خطأ شائع: تفعيل r على شبكة قديمة قوّتها 11n فقط فيتراجع الأداء. عتبات التجوال العملية: العميل يبدأ البحث عند -70 dBm ويجب أن يجد الجار عند -72 dBm أو أفضل.\n\n- 11k: تقرير الجيران (جمع المعلومات)\n- 11v: توجيه الانتقال (اتخاذ القرار)\n- 11r: نقل المفتاح السريع (سرعة التنفيذ)",
          en: "Roaming is the client moving from one AP to another without a logical session break — but the physical transition time can kill real-time applications. The classic problem: a phone insisting on staying associated to a distant AP (sticky client) because its radio tolerates weak signal.\n\nThree amendments solve this together: 11k (measurement reports) gives the client a neighbor list with channels and signal so it chooses with knowledge instead of a long random scan; 11v (network management) lets the AP suggest a better target; 11r (fast transition) removes the full 802.1X handshake on each move, replacing it with a PMK-R0/R1 key derivative, dropping roam time from hundreds of milliseconds to tens.\n\nIn WPA3-Enterprise with 802.11r, RADIUS must be configured to support the intermediate PMK keys; a common mistake is enabling r on an aging 11n-only network and watching performance regress. Practical roaming thresholds: the client starts searching at -70 dBm and must find a neighbor at -72 dBm or better.\n\n- 11k: neighbor reports (gathering information)\n- 11v: transition steering (making the decision)\n- 11r: fast key handover (executing quickly)",
        },
        tip: {
          ar: "اشترط في أي مشروع WiFi جديد دعم 802.11k/v/r مجتمعةً (خاصة r) لأي استخدام صوتي — بدونها ستُفتح تذاكر شكوى يومية عن انقطاع المكالمات بين الغرف.",
          en: "Require 802.11k/v/r together (especially r) in any new WiFi project that carries voice — without it, expect daily tickets about calls dropping between rooms.",
        },
      },
      {
        heading: { ar: "التحقق النهائي قبل التسليم", en: "Final Validation Before Handover" },
        body: {
          ar: "التسليم الاحترافي يحتاج ملف إثباتات: خرائط RSSI و SNR النهائية مقارنة بالأهداف، اختبار تجوال في المسارات الحقيقية للمستخدمين (ممرات، سلالم، مصاعد إن كانت ضمن النطاق)، واختبار سعة بـ iPerf بعدد عملاء يمثل ذروة الحقيقة لا جهازاً واحداً.\n\nكذلك سجل الإعدادات الكامل (قنوات وطاقة كل نقطة، SSIDs، VLANs) وخطة التوسعة. ساعة واحدة من التوثيق الجيد تختصر أيام دعم لاحقة — وتحميك قانونياً عند النزاع على النطاق.\n\n- خرائط مقارنة: تصميم مقابل قياس فعلي\n- اختبار مواقع متعددة: زاوية كل قاعة، كل مصعد، كل ساحة\n- iPerf بثلاثة مستخدمين متزامنين على الأقل لكل خلية",
          en: "Professional handover needs a proof file: final RSSI and SNR maps compared against targets, roaming tests along the users' real paths (corridors, stairwells, elevators if in scope), and capacity testing with iPerf using a client count that represents real peak, not a single laptop.\n\nAlso required: the complete configuration register (channels and power per AP, SSIDs, VLANs) and an expansion plan. One hour of good documentation saves days of later support — and protects you legally in scope disputes.\n\n- Comparison maps: design vs actual measurement\n- Multi-point testing: every hall corner, every elevator, every courtyard\n- iPerf with at least three concurrent users per cell",
        },
        code: {
          lang: "bash",
          snippet: "# على الخادم (سلكي داخل نفس الشبكة): استقبال الاختبار\niperf3 -s\n\n# على العميل اللاسلكي: اختبار TCP بسعة مفتوحة\niperf3 -c 192.168.10.20 -t 60\n\n# محاكاة صوت: UDP بمعدل محدود وفحص فقد الحزم\niperf3 -c 192.168.10.20 -u -b 120k -t 120 --get-server-output\n\n# ثلاثة عملاء متزامنين (شغّل الأمر على ثلاثة أجهزة في نفس الخلية)",
        },
      },
    ],
    keyPoints: [
      { ar: "التصميم الحديث للسعة أولاً: ابدأ من عدد الأجهزة والتطبيقات ثم ارسم التغطية", en: "Modern design is capacity-first: start from device count and applications, then paint coverage" },
      { ar: "ثلاثة أنواع مسح: تنبؤي على المخطط، سلبي بالاستماع، وفعّال بالاتصال والقياس", en: "Three survey types: predictive on the plan, passive by listening, active by associating and measuring" },
      { ar: "تداخل الخلايا المثالي 10-15% وعتبة التجوال -67/-70 dBm", en: "Ideal cell overlap is 10-15% with roaming thresholds at -67/-70 dBm" },
      { ar: "11k يجمع معلومات الجيران، 11v يوجه الانتقال، 11r ينقل المفاتيح بسرعة", en: "11k gathers neighbor info, 11v steers the transition, 11r hands keys over fast" },
      { ar: "CCI مقبول بإدارة جيدة بينما ACI محرم: لا تخلط عروض قنوات متجاورة في نفس النطاق", en: "CCI is acceptable when managed, ACI is forbidden: never mix overlapping channel widths in the same area" },
      { ar: "التسليم بلا ملف إثباتات (خرائط واختبارات) تسليم منقوص مهنياً", en: "Handover without a proof file (maps and tests) is professionally incomplete" },
    ],
    commands: [
      { cmd: "sudo iw dev wlan0 scan | less", desc: { ar: "تفريغ مسح كامل: كل نقطة وصول بقوتها وقناتها وقدراتها", en: "Full scan dump: every AP with signal, channel and capabilities" } },
      { cmd: "nmcli -f SSID,SIGNAL,CHAN dev wifi list", desc: { ar: "جدول سريع للشبكات المرئية بالقوة والقناة لاستكشاف ازدحام الطيف", en: "Quick table of visible networks by signal and channel to gauge spectrum congestion" } },
      { cmd: "iperf3 -c 192.168.10.20 -t 60", desc: { ar: "قياس السعة الفعلية لخلية WiFi عبر 60 ثانية", en: "Measure real cell throughput over 60 seconds" } },
      { cmd: "iperf3 -c 192.168.10.20 -u -b 120k -t 120", desc: { ar: "اختبار صوتي UDP: فحص الفقد والتأخير تحت حمل بثابت", en: "Voice-grade UDP test: checking loss and jitter under a fixed rate" } },
    ],
    quiz: [
      {
        q: { ar: "ما نسبة التداخل الخلوي الموصى بها للتجوال السلس؟", en: "What cell overlap percentage is recommended for seamless roaming?" },
        options: [
          { ar: "0% — لا تداخل إطلاقاً", en: "0% — no overlap at all" },
          { ar: "10-15%", en: "10-15%" },
          { ar: "30-40%", en: "30-40%" },
          { ar: "50% فأكثر", en: "50% or more" },
        ],
        correct: 1,
        explain: { ar: "10-15% يوازن بين عدم انقطاع الجلسة وتجنب منطقة التنازع (Ping-Pong)؛ فالتداخل الزائد يقذف العميل بين نقطتين متساويتين.", en: "10-15% balances session continuity against the ping-pong zone; excessive overlap bounces the client between two equal APs." },
      },
      {
        q: { ar: "معيار 802.11r يوفر:", en: "The 802.11r amendment provides:" },
        options: [
          { ar: "قائمة الجيران لتفادي المسح الطويل", en: "A neighbor list to avoid long scanning" },
          { ar: "توجيه العميل نحو نقطة وصول أفضل", en: "Steering the client to a better AP" },
          { ar: "انتقالاً سريعاً عبر مشتقات مفتاح PMK دون مصافحة 802.1X كاملة", en: "Fast transition via PMK derivatives without full 802.1X handshake" },
          { ar: "جدولة استيقاظ موفرة للبطارية", en: "Battery-saving wake scheduling" },
        ],
        correct: 2,
        explain: { ar: "11r يستبدل المصافحة الكاملة (مئات الملّي ثانية) بمشتق مفتاح جاهز (عشرات الملّي ثانية) — حاسم للصوت والفيديو أثناء التنقل.", en: "11r replaces the full handshake (hundreds of ms) with a ready key derivative (tens of ms) — critical for voice and video while moving." },
      },
      {
        q: { ar: "نقطة انطلاق التصميم في مشروع مدرسة مزدحمة 30 جهازاً لكل فصل:", en: "The design starting point for a crowded school with 30 devices per classroom:" },
        options: [
          { ar: "شراء أقوى نقاط وصول بأقصى قدرة إرسال", en: "Buying the most powerful APs with maximum transmit power" },
          { ar: "جرد عدد العملاء والتطبيقات لكل منطقة وتحديد عدد APs من الحِمل", en: "Inventorying client count and applications per area, deriving AP count from load" },
          { ar: "تغطية المبنى بأقل عدد نقاط لتقليل الكلفة", en: "Covering the building with the fewest APs to cut cost" },
          { ar: "استخدام نطاق 2.4 GHz لمداه الأبعد", en: "Using 2.4 GHz for its longer range" },
        ],
        correct: 1,
        explain: { ar: "التصميم للسعة يبدأ من العد والاستخدام لا من المدى؛ رفع القدرة يزيد التداخل، والمدى الأبعد يعني خلايا أكبر وأدنى لكل مستخدم.", en: "Capacity design starts from count and usage, not range; raising power adds interference, and longer range means bigger cells with less per user." },
      },
      {
        q: { ar: "هدف قوة الإشارة القياسي لخلايا الصوت (VoWiFi) هو:", en: "The standard signal target for voice cells (VoWiFi) is:" },
        options: [
          { ar: "-80 dBm", en: "-80 dBm" },
          { ar: "-72 dBm", en: "-72 dBm" },
          { ar: "-67 dBm", en: "-67 dBm" },
          { ar: "-50 dBm", en: "-50 dBm" },
        ],
        correct: 2,
        explain: { ar: "-67 dBm هو هدف التصميم العالمي للصوت والفيديو والتجوال (مع SNR ≥ 25 dB) — رقم من معيار BICSI وممارسات Cisco/Ekahau.", en: "-67 dBm is the global design target for voice, video and roaming (with SNR ≥ 25 dB) — from BICSI standards and Cisco/Ekahau practice." },
      },
    ],
  },

  // ─── l094: SDN ───────────────────────────────────────────────────────
  {
    id: "l094",
    moduleId: "m10",
    order: 4,
    level: "expert",
    title: {
      ar: "SDN وفصل المستويات: الشبكة المُبرمَجة",
      en: "SDN & Plane Separation: The Programmable Network",
    },
    summary: {
      ar: "الفكرة الهندسية التي غيّرت الشبكات بعد 2010: فصل مستوى التحكم عن مستوى البيانات، المتحكمات المركزية وواجهاتها الشمالية والجنوبية، بروتوكول OpenFlow، ومرحلة ما بعد SDN: الشبكات القائمة على النية.",
      en: "The engineering idea that changed networking after 2010: separating the control plane from the data plane, central controllers with their northbound and southbound APIs, the OpenFlow protocol, and the post-SDN era of intent-based networking.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "مشكلة الشبكة التقليدية الموزعة", en: "The Problem with Traditional Distributed Networks" },
        table: {
          caption: { ar: "الشبكة التقليدية مقابل الشبكة المعرّفة بالبرمجيات", en: "Traditional network vs software-defined network" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "التقليدية الموزعة", en: "Traditional distributed" },
            { ar: "SDN المركزية", en: "Centralized SDN" },
          ],
          rows: [
            [
              { ar: "موضع التحكم", en: "Control location" },
              { ar: "نسخة على كل جهاز", en: "A copy on every device" },
              { ar: "متحكم مركزي واحد", en: "One central controller" },
            ],
            [
              { ar: "تغيير سياسة", en: "Policy change" },
              { ar: "تسجيل دخول جهازاً جهازاً", en: "Login box by box" },
              { ar: "مرة واحدة توزّع آلياً", en: "Once, auto-distributed" },
            ],
            [
              { ar: "رؤية الشبكة", en: "Network visibility" },
              { ar: "لا نقطة ترى الكل", en: "No point sees the whole" },
              { ar: "طوبولوجيا حية فورية", en: "Instant live topology" },
            ],
            [
              { ar: "الأتمتة", en: "Automation" },
              { ar: "CLI نصي لا يناسبها", en: "Text CLI, ill-suited" },
              { ar: "واجهات REST/Northbound أصلاً", en: "REST/northbound APIs natively" },
            ],
            [
              { ar: "حدود التجريب", en: "Experimentation limits" },
              { ar: "بروتوكولات ثابتة", en: "Fixed protocols" },
              { ar: "برمجة السلوك بلغة عالية", en: "Programming behavior in high-level form" },
            ],
          ],
        },
        body: {
          ar: "في الشبكة الكلاسيكية يحمل كل موجّه ومبدّل نسخته الخاصة من مستوى التحكم: بروتوكولات التوجيه (OSPF، BGP) وشجرة STP وACLs موزعة على كل جهاز، وكل واحد يقرر محلياً ما يفعله بالحزم. هذا التصميم صنع الإنترنت — لكنه صار عبئاً في مركز البيانات.\n\nالنتائج المؤلمة: تغيير سياسة واحدة (مثل عزل VLAN) يعني تسجيل دخول إلى 200 جهاز واحداً واحداً؛ البروتوكولات الموزعة بطيئة التجمّع؛ حالة الشبكة الظاهرة قد تختلف عن الفعلية (التقارب غير المكتمل)؛ و CLI النصي لا يناسب الأتمتة الحديثة.\n\n- مشكلة اليد: تغيير جهاز-بجهاز يستغرق أياماً\n- مشكلة الاتساق: إنسان واحد يخطئ فيسياسة من مئة\n- مشكلة الرؤية: لا توجد نقطة ترى الشبكة كاملة",
          en: "In the classical network, every router and switch carries its own copy of the control plane: routing protocols (OSPF, BGP), STP trees and ACLs distributed box by box, each deciding locally what to do with packets. This design built the Internet — but became a burden in the datacenter.\n\nThe painful results: one policy change (like VLAN isolation) means logging into 200 devices one by one; distributed protocols converge slowly; the apparent network state may differ from reality (incomplete convergence); and text CLIs do not suit modern automation.\n\n- The hands problem: box-by-box changes take days\n- The consistency problem: one human error in a policy of a hundred\n- The visibility problem: no single point sees the whole network",
        },
      },
      {
        heading: { ar: "الحل: فصل المستويات الثلاثة", en: "The Fix: Separating the Three Planes" },
        diagram: {
          kind: "layers",
          title: { ar: "معمارية SDN من التطبيقات حتى مستوى البيانات", en: "SDN architecture from applications to the data plane" },
          items: [
            { ar: "التطبيقات والمنسّقات: سياسات الجدار وتوجيه الحمل", en: "Applications & orchestrators: firewall policy, load steering" },
            { ar: "الواجهة الشمالية Northbound: REST و gRPC", en: "The northbound API: REST and gRPC" },
            { ar: "المتحكم: خريطة الطوبولوجيا ومحرك السياسة والحالة", en: "The controller: topology map, policy engine, state" },
            { ar: "الواجهة الجنوبية Southbound: OpenFlow و NETCONF و gNMI", en: "The southbound API: OpenFlow, NETCONF, gNMI" },
            { ar: "مستوى البيانات: مبدلات وموجهات تنفذ القواعد", en: "The data plane: switches and routers executing rules" },
          ],
        },
        body: {
          ar: "اقترحت SDN نقلاً جذرياً: ارفع مستوى التحكم من الأجهزة إلى متحكم مركزي (Controller) يرى الشبكة كلها، واترك للأجهزة مهمة واحدة: تنفيذ قواعد التوجيه (مستوى البيانات Data Plane). بينهما واجهة جنوبية (Southbound) يبرمج بها المتحكم الأجهزة، وفوق المتحكم واجهة شمالية (Northbound) تستهلكها التطبيقات والمنسّقات.\n\nالفائدة الأولى: الرؤية الكاملة — المتحكم يبني خريطة الطوبولوجيا الحية فوراً (Link Discovery عبر LLDP). الثانية: السياسة المركزية — تكتب مرة وتُوزَّع آلياً على الجميع. الثالثة: التجريب — يمكنك برمجة سلوك الشبكة نفسها بلغة عالية المستوى بدل التنازل مع بروتوكولات ثابتة.\n\nملاحظة نقدية مهمة: SDN التقليدية لم تلغِ بروتوكولات التوجيه في كل مكان؛ فحلول المصنّعين العملية (Cisco DNA، VMware NSX، Cisco SD-WAN) هجينة: تُبقي BGP و OSPF يعملان في الأجهزة وتضيف طبقة تحكم إضافية للسياسات والتجريد.",
          en: "SDN proposed a radical move: lift the control plane from devices into a central controller that sees the entire network, leaving devices a single job: executing forwarding rules (the data plane). Between them, a southbound interface programs the devices; above the controller, a northbound API is consumed by applications and orchestrators.\n\nThe first gain: full visibility — the controller builds a live topology map instantly (link discovery via LLDP). Second: central policy — write once, distribute to everyone automatically. Third: experimentation — you program network behavior itself in a high-level language instead of negotiating with fixed protocols.\n\nAn important critical note: classic SDN did not eliminate routing protocols everywhere; practical vendor solutions (Cisco DNA, VMware NSX, Cisco SD-WAN) are hybrid — they keep BGP and OSPF running in devices while adding a control layer for policy and abstraction.",
        },
        code: {
          lang: "text",
          snippet: "+------------------------------------------+\n|  Applications & Orchestrators            |\n|  (firewall policy, load steering, NMS)   |\n+-------------------+----------------------+\n                    |  Northbound API (REST, gRPC)\n+-------------------v----------------------+\n|            SDN CONTROLLER                |\n|  topology view | policy engine | state   |\n+-------------------+----------------------+\n                    |  Southbound API (OpenFlow, NETCONF/YANG, gNMI)\n+---------+---------+---------+-----------+\n| Switch  |  Switch |  Switch |  Router   |\n| (data   |  (data  |  (data  |  (data    |\n|  plane) |   plane)|   plane)|   plane)  |\n+---------+---------+---------+-----------+",
        },
        tip: {
          ar: "احفظ الاستعارة: المتحكم هو الدماغ، والأجهزة هي العضلات، والواجهة الشمالية هي صوت المدير والواجهة الجنوبية هي الأعصاب. أي نقاش SDN يُبنى على هذه الصورة.",
          en: "Memorize the metaphor: the controller is the brain, devices are the muscles, the northbound API is the manager's voice and the southbound is the nerves. Every SDN discussion builds on this picture.",
        },
      },
      {
        heading: { ar: "المتحكمات: مشاريع ومصنّعون", en: "Controllers: Projects & Vendors" },
        body: {
          ar: "المتحكمات المفتوحة المصدر هي منطلق التعلم العملي: OpenDaylight (ODL) مشروع مؤسسة Linux الضخم، و ONOS المصمم للأداء العالي والتوزيع، و Ryu الخفيف المكتوب بلغة Python والمناسب للتعلم والنماذج الأولية.\n\nفي العالم التجاري: Cisco DNA Center / Catalyst Center لإدارة الشبكات الحديثة القائمة على النية، و VMware NSX للشبكات الافتراضية في مراكز البيانات، و Cisco vManage و SD-WAN لتوجيه WAN عبر الفروع، و APIC لمنصات ACI في مراكز البيانات الكبرى.\n\nالمفاضلة الجوهرية عند اختيار متحكم: التوزيع (هل يعمل كثلاث نسخ منتخبة لتفادي نقطة الفشل؟)، نماذج الواجهة الجنوبية المدعومة (OpenFlow فقط أم NETCONF/YANG أم gNMI و REST)، وحدود قابلية التوسع (كم جهازاً وكم تدفق في الثانية؟).\n\n- تعلّم: Ryu أو ONOS للتطوير، و ODL للمؤسسات\n- إنتاج: حزم المصنّعين (DNA/NSX/ACI) مع دعم ومسؤولية\n- قاعدة: المتحكم نفسه يصبح نظاماً حرجاً يحتاج HA ومراقبة",
          en: "Open-source controllers are the deep-learning launchpad: OpenDaylight (ODL), the large Linux Foundation project; ONOS, built for high performance and distribution; and Ryu, the lightweight Python controller perfect for learning and prototypes.\n\nIn the commercial world: Cisco DNA Center / Catalyst Center for intent-based campus management, VMware NSX for datacenter virtual networking, Cisco vManage and SD-WAN for branch WAN steering, and APIC for large-scale ACI fabrics.\n\nThe essential trade-offs when choosing a controller: distribution (does it run as three elected replicas to avoid a failure point?), supported southbound models (OpenFlow only, or NETCONF/YANG, gNMI and REST?), and scalability limits (how many devices and flows per second?).\n\n- Learning: Ryu or ONOS for development, ODL for enterprise scale\n- Production: vendor suites (DNA/NSX/ACI) with support and accountability\n- Rule: the controller itself becomes a critical system needing HA and monitoring",
        },
      },
      {
        heading: { ar: "OpenFlow: أول لغة قياسية للتحكم", en: "OpenFlow: The First Standard Control Language" },
        body: {
          ar: "صدر OpenFlow من جامعة ستانفورد (2008-2009) ليصبح أول واجهة جنوبية قياسية مفتوحة: يعرّض جدول التدفقات (Flow Table) في المبدّل للمتحكم، حيث كل قاعدة تدفق ثلاثة أجزاء: مطابقة (Match) تحدد الحزم، وأفعال (Actions) تصرح بما يُفعل بها، وعدّادات (Counters) ومؤقتات.\n\nالمطابقة تتعمق في رؤوس الحزم: منفذ الدخول، عناوين Ethernet و IP والمنافذ و VLAN... حتى 12 حقل في الإصدار 1.0 ثم توسّعت كثيراً. الأفعال: تمرير للمنفذ، تعديل، إسقاط، تغليف في قناة، أو دفع القاعدة للمتحكم (Table-miss) فيصبح المبدّل جاهز التدفق لأول مرة.\n\nهذه الآلية الأخيرة هي جوهر SDN: الحزمة مجهولة القاعدة تُرفع للمتحكم فيحسب مسارها ويدفع القاعدة، فكل التدفقات اللاحقة المشابهة تُوجه بالعتاد. لكن هنا سقف الأداء: اضطراب حزم كثيرة لمتحكم واحد يصنع عنق زجاجة — لذلك جاءت بعده معايير أكثر قابلية للتوسع (P4 و gNMI و NETCONF مع BGP/EVPN).",
          en: "OpenFlow came out of Stanford (2008-2009) as the first open standard southbound interface: it exposes the switch's flow table to the controller, where each flow entry has three parts: a match defining which packets, actions declaring what to do with them, and counters and timers.\n\nMatches dig deep into packet headers: ingress port, Ethernet, IP and port addresses, VLAN... 12 fields in version 1.0, expanded greatly afterwards. Actions: forward to port, modify, drop, encapsulate into a tunnel, or punt to the controller (table-miss) making the switch flow-ready for the first time.\n\nThat last mechanism is the essence of SDN: a packet with no matching rule is raised to the controller, which computes its path and installs the rule, so all similar subsequent traffic is forwarded in hardware. But here lies the performance ceiling: heavy punt storms to one controller create a bottleneck — hence the later, more scalable standards (P4, gNMI, and NETCONF with BGP/EVPN).",
        },
        code: {
          lang: "text",
          snippet: "# ovs-ofctl dump-flows br-int (OpenFlow 1.3, Open vSwitch)\n\n cookie=0x0, duration=45.010s, table=0, n_packets=48121, n_bytes=31324530,\n   priority=100, idle_timeout=300,\n   in_port=2, dl_type=0x0800, nw_src=10.1.0.0/24, tp_dst=443\n   actions=mod_vlan_vid:20,output:3\n\n cookie=0x0, duration=12.100s, table=0, n_packets=9, n_bytes=726,\n   priority=0\n   actions=CONTROLLER:65535   # table-miss: punt unknown packets",
        },
      },
      {
        heading: { ar: "ما بعد SDN: الشبكات القائمة على النية", en: "Beyond SDN: Intent-Based Networking" },
        body: {
          ar: "نضجت الصناعة من SDN البكر (برمجة قواعد التدفق يداً) إلى مفهوم أرفع: الشبكة القائمة على النية IBN. أنت لا تصف كيف تُبنى الشبكة بل ماذا يجب أن تحقق: أعلن النية (مثلاً: مستخدمو قسم المالية لا يصلون إلا إلى خوادمهم) فيترجمها النظام إلى قواعد ويوزعها ويتحقق استمرار تحققها.\n\nالحلقة الجوهرية المضافة في IBN هي الطمأنة (Assurance): الشبكة تقارن الحالة المطلوبة بالحالة المقاسة باستمرار (التجمّعات، القنوات المنسدلة، الثغرات) وترفع تحذيراً عند الانحراف، بل وقد تصحح ذاتياً. Cisco IBNS و DNA Center هما أشهر تطبيق مؤسسي.\n\nلماذا يعد هذا نقلة؟ لأنه ينقل الشبكة من الرد الفعلي اليدوي إلى عقد تعريفي (Declarative) شبه إعلاني: تصرح بالغاية والنظام ينجز الوسيلة ويحرس النتيجة — نفس فلسفة Terraform و Kubernetes في عالم البنية التحتية كوداً.\n\n- SDN: أفصل المستويات وأبرمج التدفق\n- IBN: أعلن النية، والنظام يترجم ويوزّع ويتحقق ويصحح\n- القاعدة المتبقية بلا بديل: فهم OSPF و BGP و STP أولاً — إذ تحتها فقط تعرف ما الذي تُبرمجه فعلاً",
          en: "The industry matured from raw SDN (hand-writing flow rules) to a higher concept: intent-based networking (IBN). You no longer describe how the network is built but what it must achieve: declare the intent (finance users reach only their servers) and the system translates it into rules, distributes them, and continuously verifies they hold.\n\nThe crucial loop added by IBN is assurance: the network keeps comparing desired state against measured state (convergence, dead links, gaps) and raises alerts on drift — even self-correcting. Cisco IBNS and DNA Center are the best-known enterprise implementations.\n\nWhy is this a leap? Because it moves networking from manual reaction to a declarative contract: you declare the goal, the system handles the means and guards the outcome — the same philosophy as Terraform and Kubernetes in infrastructure-as-code.\n\n- SDN: separate the planes and program flows\n- IBN: declare intent; the system translates, distributes, verifies and corrects\n- The non-negotiable rule: understand OSPF, BGP and STP first — only then do you know what you are actually programming",
        },
        code: {
          lang: "bash",
          snippet: "# استكشاف Open vSwitch (مفتوح المصدر، يعمل في معظم المخابر)\nsudo ovs-vsctl show\nsudo ovs-ofctl dump-flows br-int\n\n# استعلام REST لمتحكم OpenDaylight (RESTCONF)\ncurl -u admin:labpass -s http://127.0.0.1:8181/restconf/operational/network-topology:network-topology | head -40",
        },
        tip: {
          ar: "أفضل تدريب عملي مجاني على SDN: ثبّت Mininet (محاكي شبكات كاملة في عملية واحدة) مع متحكم Ryu، واكتب تطبيقاً بسيطاً كمبدّل تعلم (Learning Switch) بلغة Python — ستفهم SDN أكثر من قراءة عشر مقالات.",
          en: "The best free SDN hands-on: install Mininet (a full network simulator in one process) with the Ryu controller, and write a simple Python learning-switch application — you will understand SDN better than from ten articles.",
        },
      },
    ],
    keyPoints: [
      { ar: "الشبكة التقليدية تحمل تحكماً موزعاً على كل جهاز؛ SDN تركزه في متحكم", en: "Traditional networks carry distributed control per device; SDN centralizes it in a controller" },
      { ar: "الواجهة الشمالية تربط المتحكم بالتطبيقات، والجنوبية بالمعدات (OpenFlow و NETCONF و gNMI)", en: "The northbound API connects controller to applications; the southbound connects it to devices (OpenFlow, NETCONF, gNMI)" },
      { ar: "قاعدة OpenFlow: مطابقة + أفعال + عدادات؛ وحزمة مجهولة تُرفع للمتحكم (Table-miss)", en: "An OpenFlow rule: match + actions + counters; unknown packets are punted to the controller (table-miss)" },
      { ar: "حلول المصنّعين العملية هجينة: بروتوكولات تقليدية في الأجهزة + طبقة سياسات مركزية", en: "Practical vendor solutions are hybrid: traditional protocols in devices + a central policy layer" },
      { ar: "IBN ترفع المستوى إلى تصريح النتائج مع حلقة تحقق وطمأنة مستمرة", en: "IBN raises the level to declaring outcomes with a continuous verification and assurance loop" },
    ],
    commands: [
      { cmd: "sudo ovs-vsctl show", desc: { ar: "عرض جسور وموانئ Open vSwitch المتصلة بمتحكم SDN", en: "Show Open vSwitch bridges and ports connected to an SDN controller" } },
      { cmd: "sudo ovs-ofctl dump-flows br-int", desc: { ar: "تفريغ جدول تدفقات OpenFlow المبرمج في الجسر", en: "Dump the OpenFlow flow table programmed on the bridge" } },
      { cmd: "sudo mn --topo single,3 --controller remote", desc: { ar: "تشغيل طوبولوجيا Mininet بثلاث مفاتيح ومتحكم خارجي", en: "Start a Mininet topology with three switches and an external controller" } },
      { cmd: "curl -u admin:labpass http://controller:8181/restconf/operational/nodes", desc: { ar: "استعلام RESTCONF لمخزون الأجهزة لدى المتحكم", en: "Query the controller device inventory via RESTCONF" } },
    ],
    quiz: [
      {
        q: { ar: "الواجهة الجنوبية في SDN تربط:", en: "The southbound API in SDN connects:" },
        options: [
          { ar: "المتحكم بالتطبيقات العليا", en: "The controller to upper applications" },
          { ar: "المتحكم بمعدات الشبكة (المبدلات والموجهات)", en: "The controller to network devices (switches and routers)" },
          { ar: "الأجهزة النهائية بالشبكة", en: "End hosts to the network" },
          { ar: "المتحكمات ببعضها", en: "Controllers to each other" },
        ],
        correct: 1,
        explain: { ar: "الجنوب = نحو المعدات: OpenFlow و NETCONF/YANG و gNMI تبرمج مفاتيح التوجيه في الأجهزة. أما الشمال فهو واجهة التطبيقات فوق المتحكم.", en: "South = toward devices: OpenFlow, NETCONF/YANG and gNMI program forwarding tables. North is the application interface above the controller." },
      },
      {
        q: { ar: "ما وظيفة إجراء CONTROLLER في قاعدة OpenFlow ذات أولوية 0؟", en: "What does the CONTROLLER action in a priority-0 OpenFlow rule do?" },
        options: [
          { ar: "يسقط كل الحزم فوراً", en: "Drops all packets immediately" },
          { ar: "يرفع الحزم غير المطابقة لأي قاعدة إلى المتحكم ليقرر", en: "Punts packets matching no rule to the controller for a decision" },
          { ar: "ينسخ الحزم إلى منفذ المراقبة", en: "Mirrors packets to a monitoring port" },
          { ar: "يزيد أولوية القاعدة تلقائياً", en: "Automatically raises the rule priority" },
        ],
        correct: 1,
        explain: { ar: "قاعدة أولوية 0 (Table-miss) هي آلية SDN الجوهرية: الحزمة الغريبة تذهب للدماغ فيحسب المسار ويدفع قاعدة جديدة في العتاد.", en: "The priority-0 (table-miss) rule is SDN's core mechanism: the unknown packet goes to the brain, which computes the path and installs a new hardware rule." },
      },
      {
        q: { ar: "السمة المميزة للشبكات القائمة على النية (IBN) عن SDN الكلاسيكية:", en: "The distinguishing feature of intent-based networking over classic SDN:" },
        options: [
          { ar: "برمجة قواعد التدفق حزمة-بحزمة يدوياً", en: "Hand-programming flow rules packet by packet" },
          { ar: "التصريح بالنتائج المطلوبة مع تحقق وطمأنة مستمرين", en: "Declaring desired outcomes with continuous verification and assurance" },
          { ar: "الاستغناء عن أي متحكم مركزي", en: "Eliminating any central controller" },
          { ar: "حصر التشغيل في واجهة CLI", en: "Restricting operations to the CLI" },
        ],
        correct: 1,
        explain: { ar: "IBN نموذج إعلاني: تُعلن النية، فيترجمها النظام إلى قواعد ويوزعها ويقارن الحالة المطلوبة بالمقاسة باستمرار، وقد يصحح الانحراف ذاتياً.", en: "IBN is declarative: you declare intent; the system translates it into rules, distributes them, and continuously compares desired vs measured state, possibly self-correcting." },
      },
      {
        q: { ar: "لماذا تحتفظ حلول المصنّعين العملية (DNA/NSX) ببروتوكولات التوجيه التقليدية؟", en: "Why do practical vendor solutions (DNA/NSX) keep traditional routing protocols?" },
        options: [
          { ar: "لأن OpenFlow لم يخترع بعد", en: "Because OpenFlow has not been invented yet" },
          { ar: "لأنها أنظمة هجينة: مستوى بيانات معرض للتقليدي + طبقة سياسة مركزية", en: "Because they are hybrid: a traditional data plane plus a central policy layer" },
          { ar: "لأن بروتوكولات التوجيه أسرع من العتاد", en: "Because routing protocols are faster than hardware" },
          { ar: "لأن العملاء لا يريدون الأتمتة", en: "Because customers do not want automation" },
        ],
        correct: 1,
        explain: { ar: "النشر الحقيقي يوازن بين الأداء القياسي الممتحن والسياسة المركزية: الأجهزة تستمر بـ BGP/OSPF للاستقرار، والمتحكم يضيف التجريد والسياسات والطمأنة فوقه.", en: "Real deployments balance proven performance with central policy: devices keep BGP/OSPF for stability, while the controller adds abstraction, policy and assurance on top." },
      },
    ],
  },

  // ─── l095: Cloud networking ──────────────────────────────────────────
  {
    id: "l095",
    moduleId: "m10",
    order: 5,
    level: "expert",
    title: {
      ar: "شبكات السحابة: VPC والشبكات الفرعية والربط الهجين",
      en: "Cloud Networking: VPC, Subnets, Peering & Hybrid",
    },
    summary: {
      ar: "كيف تُبنى الشبكات في السحابة: الـ VPC كشبكة افتراضية معزولة، الشبكات الفرعية العامة والخاصة وجداول التوجيه، الفرق الجوهري بين Security Groups و NACLs، الربط عبر Peering و Transit Gateway، والاتصال الهجين عبر VPN و Direct Connect.",
      en: "How networks are built in the cloud: the VPC as an isolated virtual network, public and private subnets with route tables, the deep difference between Security Groups and NACLs, connectivity via Peering and Transit Gateway, and hybrid links through VPN and Direct Connect.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "ما هي VPC؟", en: "What Is a VPC?" },
        body: {
          ar: "الشبكة الافتراضية الخاصة (Virtual Private Cloud) هي قطعتك المعزولة منطقياً داخل السحابة العامة: تختار نطاق عنواني (CIDR) خاصاً — مثلاً 10.0.0.0/16 — فتصبح كل الموارد التي تنشئها داخلها جزءاً من شبكتك أنت، بجداول توجيه وبوابات وقواعد نارية تتحكم بها أنت وحدك.\n\nفي AWS تُعرَّف VPC داخل منطقة (Region) واحدة ولا تتجاوزها؛ وفي Azure يكافئها VNet ويمكن ربطها عبر مناطق عبر Peering العالمي؛ و GCP تجعل الشبكة الفرعية منطقية عبر المناطق (رؤوس مختلفة لنفس الفلسفة).\n\nملاحظة تحمل رقم التخزين عن ظهر قلب: نطاق /16 يعطيك 65,536 عنواناً و /24 يعطي 256 (خمسة منها محجوزة في AWS). أخطر خطأ مبتدئ: اختيار نطاق يصطدم لاحقاً مع شبكة المكتب عند الربط الهجين — فالاختيار قرار معماري يُتخذ ببصيرة.\n\n- VPC = شبكة منطقية معزولة داخل منطقة سحابية\n- CIDR واحد لكل VPC (ويمكن توسيعه بإضافة ثانوي)\n- خصص نطاقات مختلفة عن شبكتك المحلية منذ اليوم الأول",
          en: "A Virtual Private Cloud is your logically isolated slice inside a public cloud: you pick a private CIDR block — say 10.0.0.0/16 — and every resource you create inside it becomes part of your network, with route tables, gateways and firewall rules you alone control.\n\nIn AWS a VPC lives within a single region and never crosses it; in Azure the equivalent is a VNet (peerable globally); GCP makes subnets regional within one network (different heads, same philosophy).\n\nNumbers to carry forever: a /16 gives 65,536 addresses, a /24 gives 256 (five reserved in AWS). The deadliest beginner mistake: choosing a range that later collides with your office network when you interconnect — address planning is an architectural decision made with foresight.\n\n- VPC = isolated logical network inside a cloud region\n- One CIDR per VPC (extendable with a secondary block)\n- Allocate ranges distinct from your on-prem network from day one",
        },
      },
      {
        heading: { ar: "الشبكات الفرعية العامة والخاصة", en: "Public and Private Subnets" },
        diagram: {
          kind: "topology",
          title: { ar: "VPC بنمط الطبقات: شبكة عامة وخاصة عبر منطقتي توفر", en: "A tiered VPC: public and private subnets across two AZs" },
          nodes: ["Internet", "IGW-بوابة الإنترنت", "Pub-Sub-AZ1", "Priv-Sub-AZ2", "NAT-GW", "LB-موازن الأحمال"],
          edges: [[0, 1], [1, 2], [1, 5], [2, 5], [5, 3], [3, 4], [4, 1]],
        },
        body: {
          ar: "الشبكة الفرعية (Subnet) هي تقسيم الـ VPC إلى مقاطع أصغر داخل منطقة توفر (Availability Zone) — وهنا الحكمة: وزّع طبقاتك على AZs متعددة لتصمد أمام سقوط مركز بيانات كامل.\n\nالفرق بين العامة والخاصة ليس في السحابة نفسها بل في جدول التوجيه: الشبكة العامة جدولها يشير إلى بوابة الإنترنت (IGW) فمواردها تأخذ عناوين عامة أو مرنة وتُتاح من الخارج؛ والخاصة لا مسار لها إلى IGW، فمواردها لا تُقصد من الإنترنت أبداً — بل تخرج عبر بوابة NAT (إن سمحت لها) لتحديثات البرامج.\n\nهذا هو نمط الطبقات القياسي: طبقة ويب في شبكات عامة (أو خلف موازن أحمال)، وطبقة تطبيقات وقواعد بيانات في شبكات خاصة، والوصول الإداري عبر Bastion أو SSM أو VPN — لا فتح RDP للعالم أبداً.\n\n- عامة = طريق إلى IGW؛ خاصة = لا طريق للإنترنت الوارد\n- NAT GW = خروج فقط للخاصة (لا دخول)\n- التوزيع عبر AZs ليس ترفاً بل خط الدفاع الأول",
          en: "A subnet slices the VPC into smaller segments inside an Availability Zone — and here lies the wisdom: spread your tiers across AZs so you survive an entire datacenter failure.\n\nThe public/private difference is not in the cloud itself but in the route table: a public subnet's table points to an Internet Gateway (IGW), so its resources take public or elastic addresses and are reachable from outside; a private subnet has no route to the IGW, so its resources are never targeted from the Internet — they can still egress through a NAT Gateway (if you allow it) for software updates.\n\nThis is the standard tiering pattern: web tier in public subnets (or behind a load balancer), application and database tiers in private ones, with administrative access via a bastion, SSM or VPN — never expose RDP to the world.\n\n- Public = route to IGW; private = no inbound internet route\n- NAT GW = egress-only for private subnets (no inbound)\n- Spreading across AZs is not a luxury but the first line of defense",
        },
        code: {
          lang: "bash",
          snippet: "aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text\n\naws ec2 create-subnet --vpc-id vpc-0abc123 \\\n  --cidr-block 10.0.1.0/24 --availability-zone eu-west-1a\n\naws ec2 create-subnet --vpc-id vpc-0abc123 \\\n  --cidr-block 10.0.11.0/24 --availability-zone eu-west-1b\n\n# إرفاق بوابة إنترنت ثم جدول توجيه للشبكة العامة\naws ec2 create-internet-gateway\naws ec2 attach-internet-gateway --vpc-id vpc-0abc123 \\\n  --internet-gateway-id igw-0xyz789",
        },
      },
      {
        heading: { ar: "مجموعات الأمان مقابل قوائم ACL", en: "Security Groups vs Network ACLs" },
        table: {
          caption: { ar: "مجموعة الأمان مقابل قائمة ACL في السحابة", en: "Security Group vs NACL in the cloud" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "Security Group", en: "Security Group" },
            { ar: "Network ACL", en: "Network ACL" },
          ],
          rows: [
            [
              { ar: "الحالة", en: "State" },
              { ar: "حالي — الردود تلقائية", en: "Stateful — replies automatic" },
              { ar: "عديم الحالة — صريح في الاتجاهين", en: "Stateless — explicit both ways" },
            ],
            [
              { ar: "موضع التطبيق", en: "Applied at" },
              { ar: "المورد نفسه (ENI/الخدمة)", en: "The resource itself (ENI/service)" },
              { ar: "حدود الشبكة الفرعية", en: "The subnet boundary" },
            ],
            [
              { ar: "نوع القواعد", en: "Rule types" },
              { ar: "سماح فقط", en: "Allow only" },
              { ar: "سماح وحظر", en: "Allow and deny" },
            ],
            [
              { ar: "ترتيب التقييم", en: "Evaluation order" },
              { ar: "شامل — كل القواعد تُطبق", en: "Union — all rules apply" },
              { ar: "ترتيبي بالأرقام حتى *", en: "Numeric order ending at *" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best use" },
              { ar: "السياسة الرفيعة لكل دور", en: "Fine policy per role" },
              { ar: "حظر خشن لعنوان/شبكة كاملة", en: "Coarse block of an address/network" },
            ],
          ],
        },
        body: {
          ar: "مجموعة الأمان (Security Group) جدار ناري حالي (Stateful) مرتبط بالمورد نفسه (بطاقة الشبكة للـ EC2 أو الخدمة): تُصرح بالقواعد الواردة فقط، والردود تُسمح تلقائياً بذكاء تتبع الاتصال. في AWS كل القواعد تقييمها تقييم شامل (كل القواعد تُطبق) وليس ترتيبياً.\n\nقائمة تحكم الشبكة (NACL) جدار عديم الحالة (Stateless) على حدود الشبكة الفرعية نفسها: يجب التصريح بالوارد والصادر معاً (الردود تحتاج قواعد صادرة صريحة)، وتُقيَّم بالترتيب الرقمي (قاعدة 100 قبل 200) وتنتهي بـ * الافتراضية. ميزتها الحقيقية: كتلة عنوان كامل عند هجوم بسرعة، دون لمس كل مورد.\n\nالوصفة الاحترافية: اجعل SG هو خط السياسة الرئيسي (رفيع ودقيق لكل دور)، و NACL طبقة حدودية خشنة (حظر شبكات معروفة بالسوء، أو عزل شبكة فرعية أثناء التحقيق الجنائي).\n\n- SG: حالة، على المورد، قواعد سماح فقط، تقييم شامل\n- NACL: بلا حالة، على الشبكة الفرعية، قواعد سماح وحظر، تقييم ترتيبي\n- Azure تقابل SG بـ NSG (وقواعده صادرة أيضاً) و GCP بقواعد جدار الحماية الهرمية",
          en: "A Security Group is a stateful firewall attached to the resource itself (an EC2 ENI or a service): you declare inbound rules only, and replies are automatically permitted via connection tracking. In AWS all rules are evaluated as a union (allow-all-that-matches), not sequentially.\n\nA Network ACL is a stateless firewall at the subnet boundary: you must declare both inbound and outbound (replies need explicit egress rules), rules are evaluated in numbered order (rule 100 before 200) ending in a default *. Its real strength: blocking an entire address range quickly without touching every resource.\n\nThe professional recipe: make the SG your primary policy layer (fine-grained per role), and the NACL a coarse boundary layer (block known-bad networks, or quarantine a subnet during an incident).\n\n- SG: stateful, on the resource, allow rules only, union evaluation\n- NACL: stateless, on the subnet, allow and deny rules, ordered evaluation\n- Azure's counterparts are NSGs (egress rules too) and GCP's hierarchical firewall rules",
        },
        tip: {
          ar: "خطأ يستهلك ساعات تصحيح: السماح بالوارد للمنفذ 443 في SG ونسيان القاعدة الصادرة في NACL للشبكة الفرعية — الطلبات تصل والردود تُحظر فيبدو الخادم معطلاً وهو سليم. تذكر: NACL يحتاج صريحاً في الاتجاهين.",
          en: "A hours-eating mistake: allowing inbound 443 in the SG while forgetting the NACL egress rule — requests arrive, replies are blocked, and the server looks dead while healthy. Remember: NACLs need explicit rules both ways.",
        },
      },
      {
        heading: { ar: "الربط: Peering و Transit Gateway", en: "Connectivity: Peering & Transit Gateway" },
        body: {
          ar: "التناظر (VPC Peering) اتصال شبكي مباشر بين VPC اثنين عبر البنية التحتية للسحابة، وشرطه الوحيد غير القابل للتفاوض: نطاقات غير متداخلة. وهو غير عابر (Non-transitive): إن نظّرت A مع B و B مع C فلا يستطيع A الوصول إلى C عبر B — يجب إنشاء اتصال مباشر لكل زوج.\n\nمع نمو عدد الشبكات تتحول البنية إلى شبكة كاملة (Full Mesh) من N×(N-1)/2 اتصالات: 6 شبكات تعني 15 peering — هنا يظهر Transit Gateway كمُحوّل مركزي (Hub): كل VPC يتصل بالبوابة مرة واحدة، والتوجيه بين أي زوج يمر عبرها، مع دعم جداول توجيه متعددة لعزل مجموعات (نمط Hub-and-Spoke).\n\nفي السيناريوهات المؤسسية الكبرى تُضاف طبقة مشاركة الخدمات: DNS المشترك، جدران التفتيش المركزية، وبوابات الخروج الموحدة — والمعمار الناتج يسمى Landing Zone وتبنيه AWS Organizations مع RAM ومشاركة الموارد.\n\n- Peering: ثنائي مباشر، رخيص، غير عابر\n- TGW: محور مركزي، مبسّط للتوسع، بجداول عزل\n- القاعدة الأولى دائماً: لا تداخل CIDR",
          en: "VPC Peering is a direct network connection between two VPCs over the cloud backbone, with one non-negotiable condition: non-overlapping CIDRs. It is also non-transitive: if A peers with B and B with C, A cannot reach C through B — every pair needs its own connection.\n\nAs VPC count grows the design turns into a full mesh of N×(N-1)/2 links: six networks mean 15 peerings — this is where the Transit Gateway comes in as a central hub: each VPC connects once, routing between any pair flows through it, with multiple route tables to isolate groups (hub-and-spoke pattern).\n\nLarger enterprise scenarios add a shared-services layer: shared DNS, central inspection firewalls and unified egress — the resulting architecture is called a Landing Zone, built with AWS Organizations and RAM resource sharing.\n\n- Peering: direct pair, cheap, non-transitive\n- TGW: central hub, scales cleanly, with isolation route tables\n- The first rule always: no CIDR overlap",
        },
      },
      {
        heading: { ar: "الاتصال الهجين: من المكتب إلى السحابة", en: "Hybrid Connectivity: Office to Cloud" },
        body: {
          ar: "الخطوة الأولى للهجين عادة Site-to-Site VPN: نفق IPSec مشفر عبر الإنترنت بين جدارك وبوابة السحابة الافتراضية، ببروتوكولي BGP ديناميكي لتعلّم المسارات. رخيص وسريع التنصيب، لكن أداؤه رهينة الإنترنت العام: تأخير متفاوت وفقد حزم وسرعة قصوى بحدود بضع مئات الميجابت عادة.\n\nالحل الاحترافي للإنتاج الثقيل: الاتصال المخصص (AWS Direct Connect أو Azure ExpressRoute أو GCP Interconnect): دارة فيزيائية من مزود الاتصالات إلى نقطة حضور السحابة، بسعة تعاقدية ثابتة (من 50 Mbps حتى 100 Gbps)، تأخير ثابت منخفض، وبلا عبور الإنترنت العام — ثم يُلبس فوقه تشفير MACsec أو IPSec عند الحاجة التنظيمية.\n\nالنمط الناضج يجمع الاثنين: DX كمسار الإنتاج و VPN كمسار احتياط يفتح BGP حين يسقط الأول — وفي الحقيقة الأنجع: بوابات اثنتان في AZs مختلفة، وفصل المسارات، وخطة اختبار انعكاس موثقة.\n\n- VPN: ساعات التنصيب وكلفة شهرية صغيرة وأداء متغير\n- DX: أسابيع التعاقد وكلفة أعلى وأداء SLA\n- كلية الإنتاج: الاثنان معاً مع BGP لتبيديل آلي",
          en: "The first hybrid step is usually a Site-to-Site VPN: an IPSec tunnel over the Internet between your firewall and the cloud virtual gateway, with dynamic BGP to learn routes. Cheap and fast to set up, but performance is hostage to the public Internet: variable latency, packet loss and throughput typically capped at a few hundred megabits.\n\nThe professional choice for heavy production: dedicated connectivity (AWS Direct Connect, Azure ExpressRoute, GCP Interconnect): a physical circuit from a telecom provider to a cloud point of presence, with contracted fixed capacity (50 Mbps to 100 Gbps), low stable latency and no public-Internet transit — optionally wrapped with MACsec or IPSec encryption where regulation demands.\n\nThe mature pattern combines both: DX as the production path and VPN as the backup whose BGP activates when the primary fails — and truthfully the most robust design: two gateways in different AZs, path diversity, and a documented failover test plan.\n\n- VPN: hours to install, small monthly cost, variable performance\n- DX: weeks to contract, higher cost, SLA-grade performance\n- Production reality: both together with BGP for automatic failover",
        },
        code: {
          lang: "bash",
          snippet: "# نظرة سريعة على شبكاتك السحابية عبر المزودين\naws ec2 describe-vpcs --query 'Vpcs[].[VpcId,CidrBlock]' --output table\naws ec2 describe-subnets --filters 'Name=vpc-id,Values=vpc-0abc123' \\\n  --query 'Subnets[].[SubnetId,CidrBlock,AvailabilityZone]' --output table\n\naz network vnet list --output table\ngcloud compute networks list",
        },
        tip: {
          ar: "قبل أول VPC: افتح ورقة CIDR واحدة تضم شبكة المكتب وكل السحابات والفروع بنطاقات غير متداخلة (مثلاً 10.0-10.63 للمكتب و 10.64+ لكل سحابة). ساعة تخطيط توفر إعادة بناء كاملة لاحقاً.",
          en: "Before your first VPC: open a single CIDR sheet covering office, every cloud and all branches with non-overlapping ranges (e.g. 10.0-10.63 for the office, 10.64+ per cloud). One planning hour saves a full rebuild later.",
        },
      },
    ],
    keyPoints: [
      { ar: "VPC شبكة منطقية معزولة بنطاق CIDR خاص داخل منطقة سحابية واحدة", en: "A VPC is an isolated logical network with its own CIDR inside one cloud region" },
      { ar: "العام والخاص ليسا خاصية الشبكة بل مسار جدول التوجيه نحو بوابة الإنترنت", en: "Public vs private is not a subnet property but the route-table path toward the Internet gateway" },
      { ar: "SG حالي على المورد بقواعد سماح؛ NACL عديم حالة على الحدود بقواعد ترتيبية", en: "SG is stateful on the resource with allow rules; NACL is stateless at the boundary with ordered rules" },
      { ar: "Peering غير عابر ويتطلب نطاقات غير متداخلة؛ TGW يحل التشابك بمحور مركزي", en: "Peering is non-transitive and requires non-overlapping ranges; TGW solves the mesh with a central hub" },
      { ar: "VPN خطوة هجينة سريعة، و DX/ExpressRoute مسار إنتاج SLA — والناضج يجمعهما مع BGP", en: "VPN is the fast hybrid step; DX/ExpressRoute is the SLA production path — mature setups combine both with BGP" },
    ],
    commands: [
      { cmd: "aws ec2 create-vpc --cidr-block 10.0.0.0/16", desc: { ar: "إنشاء VPC بنطاق /16 في AWS", en: "Create a /16 VPC in AWS" } },
      { cmd: "aws ec2 create-subnet --vpc-id vpc-0abc123 --cidr-block 10.0.1.0/24", desc: { ar: "إنشاء شبكة فرعية داخل VPC", en: "Create a subnet inside a VPC" } },
      { cmd: "aws ec2 describe-vpcs --output table", desc: { ar: "سرد كل VPCs في الحساب بنطاقاتها", en: "List all VPCs in the account with their ranges" } },
      { cmd: "az network vnet list --output table", desc: { ar: "سرد الشبكات الافتراضية في Azure (المكافئ: gcloud compute networks list)", en: "List Azure virtual networks (GCP equivalent: gcloud compute networks list)" } },
    ],
    quiz: [
      {
        q: { ar: "ما السمة الجوهرية لمجموعات الأمان (Security Groups) في AWS؟", en: "What is the defining property of AWS Security Groups?" },
        options: [
          { ar: "عديمة الحالة وتُقيَّم بالترتيب الرقمي", en: "Stateless and evaluated in numeric order" },
          { ar: "حالية: الردود على الاتصالات المسموحة تُسمح تلقائياً", en: "Stateful: replies to allowed connections are automatically permitted" },
          { ar: "تعمل على مستوى الشبكة الفرعية فقط", en: "They operate only at the subnet level" },
          { ar: "تدعم قواعد الحظر الصريح فقط", en: "They support explicit deny rules only" },
        ],
        correct: 1,
        explain: { ar: "SG يتعقب حالة الاتصالات فيسمح بالوارد المصرح به والردود الصادرة تلقائياً؛ قواعده سماح فقط وتقييمها توافقي، بينما NACL هو العديم الحالة الترتيبي.", en: "SG tracks connection state, allowing declared inbound and automatic outbound replies; its rules are allow-only and union-evaluated, while the NACL is the stateless ordered one." },
      },
      {
        q: { ar: "شرط أساسي غير قابل للتفاوض قبل إنشاء Peering بين VPC اثنين:", en: "The non-negotiable prerequisite before peering two VPCs:" },
        options: [
          { ar: "وجودهما في نفس منطقة التوفر AZ", en: "Being in the same Availability Zone" },
          { ar: "استخدام نفس جدول التوجيه", en: "Using the same route table" },
          { ar: "نطاقات CIDR غير متداخلة", en: "Non-overlapping CIDR ranges" },
          { ar: "بوابة NAT في كل شبكة", en: "A NAT gateway in each network" },
        ],
        correct: 2,
        explain: { ar: "التداخل يجعل التوجيه ملتبساً بنيوياً: أي وجهة مشتركة لا يمكن الجزم بأي شبكة تقصدها. هذا سبب أهمية خطة CIDR الموحدة منذ البداية.", en: "Overlap makes routing structurally ambiguous: any shared destination cannot be attributed to one network. This is why a unified CIDR plan matters from the start." },
      },
      {
        q: { ar: "VPC Peering في AWS صفة الاتصال بين الشبكات المتناظرة عبر شبكة ثالثة:", en: "VPC Peering in AWS is what kind of connectivity across a third network?" },
        options: [
          { ar: "عابر (Transitive) بشكل افتراضي", en: "Transitive by default" },
          { ar: "غير عابر: كل زوج يحتاج تناظراً مباشراً", en: "Non-transitive: every pair needs a direct peering" },
          { ar: "عابر فقط مع Transit Gateway", en: "Transitive only with a Transit Gateway" },
          { ar: "عابر بعد تفعيل BGP", en: "Transitive after enabling BGP" },
        ],
        correct: 1,
        explain: { ar: "A-B و B-C لا يعنيان A-C؛ كل زوج يحتاج peering خاصاً أو وصل الجميع بـ Transit Gateway يعمل كمحور — وهو النمط الأمثل للتوسع.", en: "A-B and B-C do not imply A-C; each pair needs its own peering, or attach everyone to a Transit Gateway acting as hub — the scalable pattern." },
      },
      {
        q: { ar: "لماذا تُختار بوابة NAT للشبكة الفرعية الخاصة؟", en: "Why is a NAT Gateway chosen for a private subnet?" },
        options: [
          { ar: "لتمكين الوصول الوارد من الإنترنت لخوادمها", en: "To enable inbound Internet access to its servers" },
          { ar: "لتمكين الخروج فقط (تحديثات واستدعاءات API) دون إتاحة الدخول", en: "To allow outbound only (updates, API calls) without exposing inbound" },
          { ar: "لتشفير حركة المرور بين AZs", en: "To encrypt traffic between AZs" },
          { ar: "لربط VPC ببوابة عبور (Transit)", en: "To attach the VPC to a transit gateway" },
        ],
        correct: 1,
        explain: { ar: "NAT يترجم عناوين الموارد الخاصة لعنوان عام في اتجاه واحد: الخادم يبطل الخروج للتحديث لكن لا يستطيع أحد افتتاح اتصال وارد إليه — حجر زاوية تصميم الطبقات.", en: "NAT maps private resource addresses to a public one, one-directionally: servers can fetch updates but nobody can open an inbound connection to them — the cornerstone of tiered design." },
      },
    ],
  },

  // ─── l096: Automation ────────────────────────────────────────────────
  {
    id: "l096",
    moduleId: "m10",
    order: 6,
    level: "expert",
    title: {
      ar: "أتمتة الشبكات: Ansible و Netmiko من الصفر إلى الإنتاج",
      en: "Network Automation: Ansible & Netmiko from Zero to Production",
    },
    summary: {
      ar: "منهجية الأتمتة الحديثة للشبكات: لماذا نؤتمت (الاتساق والانجراف ومصدر الحقيقة)، معمارية Ansible و playbook حقيقي لمفاتيح Cisco، سكربت Netmiko/Python للتشغيل الجماعي، وممارسات الأمان والتحقق قبل التطبيق.",
      en: "The modern automation methodology for networks: why we automate (consistency, drift, source of truth), the Ansible architecture with a real playbook for Cisco switches, a Netmiko/Python script for bulk operations, and safe verification practices before deployment.",
    },
    durationMin: 25,
    sections: [
      {
        heading: { ar: "لماذا الأتمتة؟ الحجة الهندسية", en: "Why Automate? The Engineering Case" },
        body: {
          ar: "التغيير اليدوي عبر CLI على 40 مفتاحاً يعني 40 فرصة خطأ بشري، و40 تسجيل دخول، وساعة زمن على أقل تقدير — وكل تغيير يخلف انجرافاً (Configuration Drift): أجهزة كان يفترض أن تكون متطابقة تختلف تدريجياً بمرور الشهور حتى تصبح الشبكة أثراً أركيولوجياً لا بنية قابلة للفهم.\n\nالأتمتة تجيب بثلاثة مفاهيم: مصدر الحقيقة (Source of Truth) — مستودع Git وحده يحتفظ بصيغة الشبكة المطلوبة؛ الإنتاج (Idempotency) — تشغيل نفس السكربت عشر مرات يعطي نفس النتيجة النهائية فلا ازدواج ولا فوضى؛ والفروق (Diff) — أداة الأتمتة تطبّق فقط ما اختلف عن الحالة المرغوبة.\n\nالجدوى الاقتصادية مباشرة: توفير ساعات المهندس، تقليص نوافذ التغيير، القضاء على أخطاء النسخ، والقدرة على إعادة بناء المفاتيح من الصفر في دقائق (الشفاء من كارثة بفعل أمر واحد).\n\n- 40 مفتاحاً يدوياً = ساعة و40 خطأ محتملاً\n- Git + الأتمتة = إعادة بناء الشبكة كاملة بأمر واحد\n- الانجراف التدريجي هو القاتل الصامت للشبكات",
          en: "A manual CLI change across 40 switches means 40 chances of human error, 40 logins, and an hour at minimum — and every change leaves drift: devices that should be identical gradually diverge over months until the network becomes an archaeological site rather than an understandable structure.\n\nAutomation answers with three concepts: Source of Truth — a Git repository alone holds the desired network state; Idempotency — running the same script ten times yields the same end state, no duplication, no chaos; and Diff — the tool applies only what differs from the desired state.\n\nThe economics are direct: engineer-hours saved, shorter change windows, copy-error elimination, and the ability to rebuild switches from scratch in minutes (disaster recovery by a single command).\n\n- 40 switches manually = an hour and 40 potential errors\n- Git + automation = rebuilding the whole network with one command\n- Gradual drift is the silent killer of networks",
        },
        tip: {
          ar: "ابدأ بأتمتة أشياء صغيرة مكررة (نسخ احتياطي ليلي للإعدادات، فحص إصدارات IOS) قبل قفزة التهيئة الكاملة — الثقة تُبنى بالتدريج مع أنظمة التحقق.",
          en: "Start by automating small repetitive things (nightly config backups, IOS version audits) before jumping to full provisioning — confidence is built gradually alongside verification systems.",
        },
      },
      {
        heading: { ar: "معمارية Ansible للشبكات", en: "The Ansible Architecture for Networks" },
        diagram: {
          kind: "flow",
          title: { ar: "دورة التغيير الآمنة من Git حتى الأجهزة", en: "The safe change cycle from Git to devices" },
          items: [
            { ar: "الحالة المرغوبة تُكتب في Playbook داخل مستودع Git", en: "Desired state written as a playbook inside the Git repo" },
            { ar: "محاكاة جافة: --check --diff تعرض ما سيتغير فقط", en: "Dry run: --check --diff shows only what would change" },
            { ar: "تطبيق على مجموعة تجريبية (Canary) من جهازين", en: "Apply to a canary group of two devices" },
            { ar: "التعميم التدريجي مع serial للتحكم بالانتشار", en: "Gradual rollout with serial controlling the spread" },
            { ar: "التحقق بالقياس ثم التوثيق في تاريخ Git", en: "Verify by measurement, then document in Git history" },
          ],
        },
        body: {
          ar: "Ansible عديم الوكلاء (Agentless): لا يحتاج تثبيت شيء على المفاتيح — يتصل عبر SSH أو NETCONF/REST-API كما يتصل مهندس بشري، ثم يصف التغييرات بوحدات (Modules) جاهزة. لهذا صار معيار أتمتة الشبكات عملياً.\n\nمكونات الصورة: Inventory يعرّف الأجهزة وتصنيفاتها (مفاتيح الوصول، النواة، كل فرع)؛ Playbook ملف YAML يصف الحالة المرغوبة بلغة شبه بشرية؛ Modules حزم صغيرة تنفذ مهمة واحدة ذكية (ios_vlans، ios_interfaces، ios_config)؛ و Collections حزم التوزيع الحديثة (cisco.ios للسيسكو و community.network للعامة).\n\nسحر الوحدات الذكية (Smart Modules): ليست إرسال أوامر نصية غبية بل تفهم حالة الجهاز — وحدة ios_vlans مع state: merged تضيف VLANs الناقصة فقط ولا تلمس الموجودة، ومع state: deleted تحذف ما تحدد بدقة، ومع overridden تعيد المفتاح بالكامل إلى الحالة المعلنة. هذه هي الإنتاجية الحقيقية (Idempotency) لا مجرد تسلسل أوامر.\n\n- Inventory: من وماذا\n- Playbook: ماذا نريد\n- Module: كيف ننفذ بذكاء دون تكرار أضرار",
          en: "Ansible is agentless: nothing needs installing on switches — it connects over SSH, NETCONF or REST APIs exactly like a human engineer, then describes changes through ready modules. That is why it became the practical standard for network automation.\n\nThe picture's components: the Inventory defines devices and their groups (access switches, core, per-branch); the Playbook is a YAML file describing desired state in near-human language; Modules are small units that execute one intelligent task (ios_vlans, ios_interfaces, ios_config); and Collections are the modern distribution packages (cisco.ios for Cisco, community.network for the rest).\n\nThe magic of smart modules: they are not dumb text-command senders — they understand device state. ios_vlans with state: merged adds only missing VLANs and never touches existing ones; with state: deleted it removes exactly what you specify; with overridden it returns the switch entirely to the declared state. That is real idempotency, not just a command sequence.\n\n- Inventory: who and what\n- Playbook: what we want\n- Module: how to execute intelligently without destructive repeats",
        },
      },
      {
        heading: { ar: "Playbook عملي: نسخ احتياطي و VLANs و لافتة", en: "A Real Playbook: Backup, VLANs & Banner" },
        body: {
          ar: "هذا playbook إنتاجي مصغر يفعل ثلاث مهام يومية: يأخذ نسخة احتياطية من إعدادات كل مفاتيح الوصول قبل أي تغيير (حزام الأمان)، يفرض قائمة VLANs المعلنة في Git، ويضبط لافتة تحذير الملكية — وكل مهمة بالإنتاج الحقيقي: التشغيل المتكرر آمن.\n\nلاحظ connection: network_cli (الاتصال عبر SSH التقليدي) و gather_facts: no (جمع حقائق لينكس لا معنى لها على IOS)، والحلقة loop على قائمة VLANs المعرّفة في vars — وهذا الفصل بين البيانات والمنطق هو روح الأتمتة الصالحة.\n\nاحفظ الملف في مستودع Git مع inventory.ini، واستخدم ansible-lint لمراجعة الأسلوب — نفس انضباط أي مشروع برمجي.",
          en: "This mini production playbook does three daily jobs: backs up every access switch's config before any change (the safety belt), enforces the VLAN list declared in Git, and sets the ownership warning banner — each task with real idempotency: repeated runs are safe.\n\nNote connection: network_cli (classic SSH) and gather_facts: no (collecting Linux facts is meaningless on IOS), plus the loop over the VLAN list declared in vars — this separation of data from logic is the soul of sound automation.\n\nStore the file in a Git repository with inventory.ini, and run ansible-lint for style review — the same discipline as any software project.",
        },
        code: {
          lang: "yaml",
          snippet: "---\n- name: Access switch baseline (backup + VLANs + banner)\n  hosts: access_switches\n  gather_facts: no\n  connection: network_cli\n\n  vars:\n    ansible_network_os: cisco.ios.ios\n    vlan_list:\n      - { id: 10, name: STAFF }\n      - { id: 20, name: GUEST }\n      - { id: 30, name: VOICE }\n\n  tasks:\n    - name: Safety belt - backup current config\n      cisco.ios.ios_config:\n        backup: yes\n      register: backup_out\n\n    - name: Enforce declared VLANs\n      cisco.ios.ios_vlans:\n        config:\n          - vlan_id: '{{ item.id }}'\n            name: '{{ item.name }}'\n            state: active\n        state: merged\n      loop: '{{ vlan_list }}'\n\n    - name: Ownership banner\n      cisco.ios.ios_banner:\n        banner: motd\n        text: 'Managed by Ansible - manual changes are lost'\n        state: present\n\n    - name: Save only when something changed\n      cisco.ios.ios_config:\n        save_when: modified",
        },
      },
      {
        heading: { ar: "Netmiko: الشبكة من داخل Python", en: "Netmiko: The Network from Inside Python" },
        body: {
          ar: "Ansible ممتاز للسياسات المعيارية، لكن بعض المهام تحتاج منطقاً حراً: استجواب 100 جهاز عن حالة كل منفذ وتوليد تقرير، أو رفع إصلاح ظرفي مشروط بنتيجة فحص — هنا يظهر Netmiko، مكتبة Python من كيرك بايرز مبنية فوق Paramiko، متخصصة بالضبط في محادثة أجهزة الشبكة عبر SSH.\n\nالجهد الذي تختصره: هي تتعامل مع الصعوبات الصغيرة اليومية — مطالبة المتابعة (more)، الأوضاع المختلفة للأجهزة (device_type)، إرسال الأوامر وقراءة الناتج حتى نهاية التفاعل — فتعطيك نصاً نظيفاً جاهزاً للتحليل داخل البرنامج.\n\nالنموذج أدناه: يتصل بمفتاح، يجمع show vlan brief، يجمع الإحصاءات، ثم يرسل حزمة أوامر تهيئة (Config Set) في وضع التهيئة — ويتحقق من النتيجة بإعادة الاستعلام. هذه هي البنية النموذجية لآلاف السكربتات الإنتاجية حول العالم.\n\n- send_command: أمر وضع التنفيذ وقراءة ناتجه\n- send_config_set: قائمة أوامر تهيئة في تتابع واحد\n- ConnectHandler كقاموس معلومات الجهاز — والكلمات السرية من متغيرات البيئة لا في النص الصريح",
          en: "Ansible excels at standardized policy, but some tasks need free logic: interrogating 100 devices about each port's state and building a report, or applying a conditional fix based on a check's result — this is where Netmiko appears, Kirk Byers' Python library built atop Paramiko, specialized precisely in talking to network gear over SSH.\n\nThe toil it removes: it handles the daily little pains — the more prompt, per-vendor modes (device_type), sending commands and reading output until the interaction settles — handing you clean text ready for in-program analysis.\n\nThe sample below: connects to a switch, collects show vlan brief, gathers stats, then pushes a configuration set in config mode — and verifies the result by re-querying. This is the canonical shape of thousands of production scripts worldwide.\n\n- send_command: an exec-mode command and its output\n- send_config_set: a list of config commands in one sequence\n- ConnectHandler with a device dict — secrets from environment variables, never hard-coded",
        },
        code: {
          lang: "python",
          snippet: "from netmiko import ConnectHandler\nimport os\n\nswitch = {\n    'device_type': 'cisco_ios',\n    'host': '192.168.1.10',\n    'username': os.environ['NET_USER'],\n    'password': os.environ['NET_PASS'],\n}\n\nwith ConnectHandler(**switch) as net:\n    # 1) قراءة الحالة الحالية\n    print(net.send_command('show vlan brief'))\n\n    # 2) دفعة أوامر تهيئة\n    cfg = [\n        'interface range gi1/0/1 - 8',\n        'switchport mode access',\n        'switchport access vlan 20',\n        'spanning-tree portfast',\n    ]\n    net.send_config_set(cfg)\n\n    # 3) التحقق بعد التطبيق\n    out = net.send_command('show vlan id 20')\n    assert 'GUEST' in out, 'VLAN 20 not active yet!'\n    net.save_config()\n    print('OK: ports moved to VLAN 20 and saved')",
        },
        tip: {
          ar: "لا تضع كلمات السر في الكود أبداً: في Ansible استخدم ansible-vault، وفي Python اقرأ من متغيرات البيئة أو مدير أسرار — تسريبة مستودع Git واحدة تكشف شبكة كاملة.",
          en: "Never put secrets in code: use ansible-vault in Ansible and environment variables or a secrets manager in Python — a single leaked Git repository exposes an entire network.",
        },
      },
      {
        heading: { ar: "ممارسات الأمان والتدرج إلى الإنتاج", en: "Safety Practices & the Path to Production" },
        body: {
          ar: "القاعدة الأولى قبل أي تشغيل واسع: --check --diff — المحاكاة الجافة تعرض ما كان سيُغيَّر دون لمس الأجهزة. راجع الفروق بعينك، ثم شغّل على مجموعة تجريبية (Canary) من جهازين، ثم عمّم تدريجياً.\n\nالثانية: التحكم بسرعة الانتشار serial: 25% في playbook يعني تطبيق ربع الأجهزة ثم التوقف — فرصة لاكتشاف الخلل قبل وصوله للجميع. والثالثة: التوثيق المحيط: كل تشغيل يخلف سجل تغيير، والـ Git history هو سجلك القانوني الكامل لمن غيّر ماذا ومتى ولماذا.\n\nمسار النضج المعتاد للفرق: نسخ احتياطي وتقارير ← فرض معايير (Banner و NTP و SNMP) ← تهيئة منفذ جديدة (Port Provisioning) ← بناء كامل من الصفر (Day-0) مع تكامل GitLab CI واختبارات مبرمجة قبل الدفع للإنتاج.\n\n- --check --diff أولاً دائماً\n- serial للتحكم بانتشار الفشل\n- النضج تدريجي: قراءة ← فرض ← تهيئة ← بناء كامل",
          en: "The first rule before any broad run: --check --diff — the dry run shows what would change without touching devices. Review the diffs with your own eyes, then run on a canary group of two devices, then roll out gradually.\n\nThe second: control the blast radius — serial: 25% in a playbook applies a quarter of the devices then pauses — a chance to catch the flaw before it reaches everyone. The third: surrounding documentation: every run leaves a change record, and Git history is your complete legal record of who changed what, when and why.\n\nThe usual team maturity path: backups and reports ← standards enforcement (banner, NTP, SNMP) ← new-port provisioning ← full Day-0 builds with GitLab CI integration and automated pre-production tests.\n\n- --check --diff first, always\n- serial to control failure propagation\n- Maturity is gradual: read ← enforce ← provision ← full build",
        },
      },
    ],
    keyPoints: [
      { ar: "الأتمتة تعالج الانجراف التدريجي وتجعل Git مصدر الحقيقة الوحيد", en: "Automation cures gradual drift and makes Git the single source of truth" },
      { ar: "Ansible عديم الوكلاء: يتصل عبر SSH/NETCONF ويصف الحالة بوحدات ذكية إنتاجية", en: "Ansible is agentless: connects over SSH/NETCONF and describes state via idempotent smart modules" },
      { ar: "state: merged يضيف الناقص فقط، و overridden يفرض الحالة كاملة، و deleted يحذف بدقة", en: "state: merged adds only what is missing, overridden enforces the full state, deleted removes precisely" },
      { ar: "Netmiko (فوق Paramiko) مكتبة Python للاستجواب والتهيئة الحرة للأجهزة", en: "Netmiko (atop Paramiko) is the Python library for free-form interrogation and configuration" },
      { ar: "الأسرار في vault ومتغيرات البيئة؛ والفحص الجاف والانتشار التدريجي قبل الإنتاج", en: "Secrets live in vault and environment variables; dry runs and gradual rollouts precede production" },
    ],
    commands: [
      { cmd: "ansible-playbook -i inventory.ini site.yml --check --diff", desc: { ar: "محاكاة جافة: عرض التغييرات المقترحة دون تطبيقها", en: "Dry run: show proposed changes without applying them" } },
      { cmd: "ansible-inventory -i inventory.ini --graph", desc: { ar: "عرض شجرة الأجهزة والمجموعات في المخزون", en: "Show the inventory device/group tree" } },
      { cmd: "ansible-doc cisco.ios.ios_vlans", desc: { ar: "توثيق وحدة ios_vlans وكل خياراتها ومعانيها", en: "Documentation for the ios_vlans module and all its options" } },
      { cmd: "ansible-vault encrypt group_vars/all.yml", desc: { ar: "تشفير ملف المتغيرات الحاوي للأسرار بكلمة مرور", en: "Encrypt the secrets variables file with a password" } },
    ],
    quiz: [
      {
        q: { ar: "ما معنى الإنتاجية (Idempotency) في أتمتة الشبكات؟", en: "What does idempotency mean in network automation?" },
        options: [
          { ar: "تشغيل السكربت أسرع في كل مرة", en: "The script running faster each time" },
          { ar: "التكرار المتعدد للسكربت يصل دائماً إلى نفس الحالة النهائية", en: "Running the script multiple times always converges to the same end state" },
          { ar: "القدرة على تشغيل السكربت على أنظمة تشغيل مختلفة", en: "The ability to run the script on different operating systems" },
          { ar: "تشفير الاتصال بين المضيف والأجهزة", en: "Encrypting the connection between host and devices" },
        ],
        correct: 1,
        explain: { ar: "الإنتاجية هي جوهر الأتمتة الآمنة: التشغيل العاشر لا يكرر التغيير بل يتأكد فقط من وجوده — فلا VLAN مزدوج ولا لافتات متراكبة.", en: "Idempotency is the core of safe automation: the tenth run does not repeat changes but merely verifies their presence — no duplicated VLANs, no stacked banners." },
      },
      {
        q: { ar: "أي خيار في ansible-playbook يجري المحاكاة دون تغيير الأجهزة؟", en: "Which ansible-playbook option simulates without touching devices?" },
        options: [
          { ar: "--syntax-check", en: "--syntax-check" },
          { ar: "--check --diff", en: "--check --diff" },
          { ar: "--step", en: "--step" },
          { ar: "--list-hosts", en: "--list-hosts" },
        ],
        correct: 1,
        explain: { ar: "--check وضع عدم التشغيل (Dry Run) مع --diff يعرض الفروق التي كانت ستُطبَّق؛ --syntax-check يراجع القواعد النحوية فقط و --list-hosts يسرد المستهدفين.", en: "--check is the dry-run mode and --diff shows the changes that would apply; --syntax-check reviews syntax only and --list-hosts lists targets." },
      },
      {
        q: { ar: "Netmiko مبنية فوق أي مكتبة أساسية؟", en: "Netmiko is built on top of which core library?" },
        options: [
          { ar: "Requests", en: "Requests" },
          { ar: "Scapy", en: "Scapy" },
          { ar: "Paramiko", en: "Paramiko" },
          { ar: "NAPALM", en: "NAPALM" },
        ],
        correct: 2,
        explain: { ar: "Netmiko تغلف Paramiko (مكتبة SSH) وتضيف ذكاء أجهزة الشبكة: التعامل مع المطالبات و device_type وقراءة المخرجات حتى الاستقرار.", en: "Netmiko wraps Paramiko (an SSH library) and adds network-device intelligence: prompt handling, device_type and output reading until it settles." },
      },
      {
        q: { ar: "وحدة ios_vlans مع state: overridden ست:", en: "The ios_vlans module with state: overridden will:" },
        options: [
          { ar: "تضيف VLANs الجديدة فقط وتترك الموجودة", en: "Add only new VLANs and leave existing ones" },
          { ar: "تحذف كل VLANs غير المعلنة وتفرض القائمة المصرح بها بالضبط", en: "Delete every undeclared VLAN and enforce exactly the declared list" },
          { ar: "تحذف كل VLANs دون استبدال", en: "Delete all VLANs without replacement" },
          { ar: "تنشئ نسخة احتياطية ثم تتوقف", en: "Create a backup then stop" },
        ],
        correct: 1,
        explain: { ar: "overridden أقوى حالات الإنتاج: النتيجة النهائية مطابقة للقائمة المعلنة تماماً — ما ليس في التقرير يُحذف وما فيه يُفرض؛ أما merged فيضيف فقط.", en: "overridden is the strongest idempotent state: the final result exactly matches the declared list — anything absent is removed, anything present is enforced; merged only adds." },
      },
    ],
  },

  // ─── l097: Datacenter fabric ─────────────────────────────────────────
  {
    id: "l097",
    moduleId: "m10",
    order: 7,
    level: "expert",
    title: {
      ar: "نسيج مركز البيانات: Spine-Leaf و VXLAN و EVPN",
      en: "Datacenter Fabric: Spine-Leaf, VXLAN & EVPN",
    },
    summary: {
      ar: "المعمار الحديث لمراكز البيانات: لماذا هجرنا البنية ثلاثية الطبقات نحو Spine-Leaf لحركة الشرق-غرب، الطبقة السفلية الموجهة بـ ECMP، الغلاف VXLAN بمعرّفات VNI، ومستوى تحكم EVPN فوق BGP.",
      en: "The modern datacenter architecture: why we abandoned the three-tier design for Spine-Leaf and east-west traffic, the routed ECMP underlay, the VXLAN overlay with VNIs, and the EVPN control plane over BGP.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "من ثلاث طبقات إلى نسيج Spine-Leaf", en: "From Three Tiers to the Spine-Leaf Fabric" },
        diagram: {
          kind: "topology",
          title: { ar: "نسيج CLOS: كل ورقة متصلة بكل عمود", en: "The CLOS fabric: every leaf connects to every spine" },
          nodes: ["Spine-1", "Spine-2", "Leaf-1-رف1", "Leaf-2-رف2", "Leaf-3-رف3"],
          edges: [[0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4]],
        },
        table: {
          caption: { ar: "البنية الهرمية الثلاثية مقابل نسيج Spine-Leaf", en: "Three-tier hierarchy vs Spine-Leaf fabric" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "ثلاث طبقات", en: "Three tiers" },
            { ar: "Spine-Leaf", en: "Spine-Leaf" },
          ],
          rows: [
            [
              { ar: "نمط الحركة الأمثل", en: "Optimal traffic" },
              { ar: "شمال-جنوب (مستخدم ← خادم)", en: "North-south (user → server)" },
              { ar: "شرق-غرب (خادم ← خوادم)", en: "East-west (server → servers)" },
            ],
            [
              { ar: "عدد القفزات", en: "Hop count" },
              { ar: "متغير حسب الموقع", en: "Variable by location" },
              { ar: "ثابت: ورقة ← عمود ← ورقة", en: "Fixed: leaf → spine → leaf" },
            ],
            [
              { ar: "الروابط", en: "Links" },
              { ar: "STP يحظر الاحتياطية", en: "STP blocks redundancy" },
              { ar: "كل الروابط نشطة عبر ECMP", en: "All links active via ECMP" },
            ],
            [
              { ar: "التوسع", en: "Scaling" },
              { ar: "غير خطي — ترقية الطبقة العليا", en: "Non-linear — upgrade the top tier" },
              { ar: "خطي — أضف عموداً أو ورقة", en: "Linear — add a spine or a leaf" },
            ],
            [
              { ar: "نطاق الفشل", en: "Failure domain" },
              { ar: "كبير — طبقة كاملة", en: "Large — a whole tier" },
              { ar: "صغير — رَف واحد لكل ورقة", en: "Small — one rack per leaf" },
            ],
          ],
        },
        body: {
          ar: "البنية الكلاسيكية (Core ← Distribution ← Access) صُممت لحركة الشمال-جنوب: المستخدم خارج مركز البيانات يدخل ليجد خادماً ويخرج. لكن الحوسبة السحابية والموزعة قلبت المعادلة: أغلب الحركة اليوم شرق-غرب — خادم يتحدث مع مئات الخوادم داخل المركز نفسه (النسخ المتماثل، Hadoop، Kubernetes) عبر مسارات هرمية متفاوتة الطول والزمن.\n\nالجواب: معمارية CLOS (نسبة لمخترع شبكات الهاتف تشارلز كلوس) المعروفة اليوم بـ Spine-Leaf: طبقتان فقط — كل Leaf (ورقة) يتصل بكل Spine (عمود فقري)، ولا يوجد اتصال ضمن الطبقة الواحدة، فيمر أي خادمين عبر أي مسار بطول ثابت: Leaf ← Spine ← Leaf.\n\nالنتيجة الهندسية: زمن تأخير متوقع ومتساوٍ، لا STP ولا حظر منافذ (كل الروابط نشطة)، وقابلية توسع أفقية خطية — تضيف Spine فيتضاعف عرض النسيج، وتضيف Leaf فتزيد كثافة الاتصال. المساواة البنيوية هي جوهر فلسفة CLOS.\n\n- شمال-جنوب (قديم): مستخدم ← خادم\n- شرق-غرب (حديث): خادم ← خوادم داخل النسيج\n- Spine-Leaf: مسار ثابت الطول، كل الروابط تعمل، توسع خطي",
          en: "The classic design (Core ← Distribution ← Access) was built for north-south traffic: a user outside the datacenter enters, finds a server, and leaves. But cloud and distributed computing flipped the equation: most traffic today is east-west — a server talking to hundreds of peers inside the same center (replication, Hadoop, Kubernetes) across hierarchical paths of varying length and latency.\n\nThe answer: the CLOS architecture (after telephone-switching inventor Charles Clos), known today as Spine-Leaf: only two tiers — every Leaf connects to every Spine, no intra-tier links — so any two servers communicate over a path of fixed length: Leaf ← Spine ← Leaf.\n\nThe engineering result: predictable, uniform latency; no STP and no blocked ports (every link active); and linear horizontal scale — add a Spine and fabric bandwidth doubles, add a Leaf and connectivity density grows. Structural equality is the heart of the CLOS philosophy.\n\n- North-south (legacy): user ← server\n- East-west (modern): server ← servers inside the fabric\n- Spine-Leaf: fixed-length paths, all links active, linear scaling",
        },
        code: {
          lang: "text",
          snippet: "        SPINE-1      SPINE-2      SPINE-3      SPINE-4\n          |  \\        /  |  \\        /  |  \\        /  |\n          |   \\      /   |   \\      /   |   \\      /   |\n        LEAF-1    LEAF-2    LEAF-3    LEAF-4    LEAF-5\n        (racks of servers, each leaf = one rack or pair)\n\n- Leaf-to-Spine links: routed L3 (no STP, no blocking)\n- Any leaf pair = exactly 2 hops through any spine\n- Add spines  → aggregate bandwidth grows\n- Add leaves  → server connectivity grows",
        },
      },
      {
        heading: { ar: "الطبقة السفلية (Underlay): توجيه IP مع ECMP", en: "The Underlay: Routed IP with ECMP" },
        body: {
          ar: "قرار تأسيسي في كل نسيج حديث: جعل الطبقة السفلية — البنية الفيزيائية بين Leaf و Spine — توجيه IP خالصاً (Layer 3) لا تبديل Ethernet مع STP. كل وصلة قائمة بذاتها بشبكة /31 (أو unnumbered) والبروتوكول هو OSPF أو IS-IS أو BGP الداخلي.\n\nمع تعدد المسارات المتساوية ECMP يتوزع الحِمل على كل روابط Spine المتوازية في آن واحد: توجيه التدفقات (Flow-based hashing) بهامش خماسي (SRC/DST IP و Ports و Protocol) يرسل كل تدفق لمسار واحد فقط — فالترتيب يُحفظ داخل التدفق، والتوزع يحدث بين التدفقات.\n\nلماذا هذا أعظم من STP؟ ثلاثة أسباب: كل المنافذ نشطة (لا منفذ محجوب)، والفشل يتجمّع في ثوان قليلة ببروتوكول توجيه ممتحن، والتوسع خطي بإضافة وصلات فقط — بينما STP يقرر شجرة واحدة ويحظر البقية مهما كانت سعتها.\n\n- كل وصلة Leaf-Spine شبكة /31 مستقلة\n- ECMP hash خماسي يحفظ ترتيب كل تدفق\n- IS-IS الشائع في أقمشة NX-OS/OS10، و BGP في EVPN",
          en: "A foundational decision in every modern fabric: making the underlay — the physical structure between Leaf and Spine — pure routed IP (Layer 3), not Ethernet switching with STP. Every link is a standalone /31 (or unnumbered) network, and the protocol is OSPF, IS-IS or internal BGP.\n\nWith Equal-Cost Multi-Path, load spreads across all parallel Spine links simultaneously: flow-based hashing on a 5-tuple (SRC/DST IP, ports, protocol) sends each flow down exactly one path — order is preserved within a flow, distribution happens between flows.\n\nWhy is this superior to STP? Three reasons: all ports active (none blocked), failures converge in seconds via a proven routing protocol, and scaling is linear by simply adding links — whereas STP elects one tree and blocks the rest regardless of capacity.\n\n- Each Leaf-Spine link is an independent /31 network\n- 5-tuple ECMP hash preserves per-flow ordering\n- IS-IS common in NX-OS/OS10 fabrics; BGP in EVPN",
        },
        tip: {
          ar: "عند تحليل أداء نسيج: الأمر show ip cef exact-route src dst يكشف أي مسار ECMP اختاره الجهاز لتدفق معين — أساس فهم توزع الحِمل الحقيقي.",
          en: "When analyzing fabric performance: show ip cef exact-route src dst reveals which ECMP path the device chose for a given flow — the basis for understanding real load distribution.",
        },
      },
      {
        heading: { ar: "الغلاف (Overlay): VXLAN و VNI", en: "The Overlay: VXLAN & VNI" },
        body: {
          ar: "المعضلة الكلاسيكية في مركز البيانات: عزل آلاف مجموعات المستأجرين ومحاكاة VLANs على مسافات مركزية — محدودية 4094 VLANs في معيار 802.1Q قفص ضيق. الحل: تغليف إطار L2 الأصلي داخل حزمة UDP وإرساله عبر شبكة IP الموجهة — هذا هو VXLAN (RFC 7348).\n\nالبطل هو VTEP (VXLAN Tunnel Endpoint): جهاز Leaf أو خادم hypervisor يغلف الإطار عند دخوله النسيج (encapsulation) ويكشفه عند الخروج (decapsulation) — فالخوادم لا ترى إلا Ethernet تقليدياً وVLANs عادية، والنسيج بينهما يتعامل مع حزم IP خالصة.\n\nحقل VNI بعرض 24 بتاً يعطي 16.7 مليون شبكة افتراضية معزولة (مقابل 4094!) — وهو يلعب دور VLAN ID لكن عبر مسار L3 كامل. المنفذ الخارجي UDP 4789 هو البصمة القياسية لحزم VXLAN في أي تحليل Packet Capture.\n\n- VXLAN = تغليف L2 داخل UDP/IP عبر نسيج L3\n- VTEP هو طرف النفق (Leaf أو hypervisor)\n- VNI بـ 24 بت = 16.7 مليون قسم معزول\n- المنفذ 4789/UDP هو العلامة الفارقة للحزم",
          en: "The classic datacenter dilemma: isolating thousands of tenant groups and stretching L2 across the center — the 4094-VLAN limit of 802.1Q is a narrow cage. The solution: encapsulate the original L2 frame inside a UDP packet and ship it across a routed IP network — that is VXLAN (RFC 7348).\n\nThe hero is the VTEP (VXLAN Tunnel Endpoint): a Leaf or a hypervisor host that encapsulates the frame entering the fabric and decapsulates it leaving — servers see nothing but plain Ethernet and ordinary VLANs, while the fabric in between handles pure IP packets.\n\nThe 24-bit VNI field provides 16.7 million isolated virtual networks (versus 4094!) — playing the role of VLAN ID but across a full L3 path. Outer UDP port 4789 is the standard fingerprint of VXLAN packets in any packet capture.\n\n- VXLAN = L2 encapsulated inside UDP/IP over an L3 fabric\n- The VTEP is the tunnel endpoint (Leaf or hypervisor)\n- 24-bit VNI = 16.7 million isolated segments\n- UDP port 4789 is the packets' distinguishing mark",
        },
        code: {
          lang: "text",
          snippet: "Packet on the wire (VXLAN):\n+----------+---------+---------+------------------+--------+-------------+\n| Outer    | Outer   | Outer   | VXLAN Header     | Inner  | Original    |\n| Ethernet | IP src= | UDP     | flags|VNI(24bit)| Ethernet| L2 frame   |\n| (VTEP    | Leaf-IP | dport   | + reserved       | (dst   | (tenant     |\n|  MACs)   |         | 4789    |                  | VTEP)  |  payload)   |\n+----------+---------+---------+------------------+--------+-------------+\n\nVLAN 10 (tenant-A) on Leaf-1  →  VNI 10010  →  Leaf-4, VLAN 10\nSame logical L2 domain, no STP, ECMP load-balanced in the core",
        },
      },
      {
        heading: { ar: "EVPN: مستوى التحكم الذكي فوق VXLAN", en: "EVPN: The Intelligent Control Plane over VXLAN" },
        body: {
          ar: "الجيل الأول من VXLAN اعتمد التحكم بالفيضان (Flood-and-Learn): الإطار مجهول الوجهة يُغمر النسيج كله ليتعلم الجميع — يعمل لكنه يبدد النطاق ويبطئ التقارب. الجيل الحالي يستخدم BGP EVPN كمستوى تحكم موزّع: كل VTEP يعلن للبقية ما لديه من MACs وعناوين IP عبر مسارات BGP قياسية.\n\nمسارات EVPN (Route Types) هي مفاتيح الفهم: النوع 2 يعلن زوج MAC/IP (تعلم النهايات)، النوع 3 يعلن شبكة بث الإرسال (multicast/ingress replication) لتجنب الفيضان الأعمى، والأنواع 4 و5 للربط بين الأقمشة وواجهات Ethernet/نطاقات IP.\n\nالفوائد العملية مذهلة: تبديد ARP (ARP Suppression) — الـ VTEP يجيب محلياً عن استفسارات ARP لأنه يعرف زوج MAC/IP من BGP فلا تغرق الشبكة بالبث؛ الترحيل بين الأوراق دون تغيير عنوان MAC (MAC Mobility) لتنقل الأجهزة الافتراضية بين hypervisors؛ والتوجيه الموزع (Distributed Anycast Gateway) — كل Leaf يصبو البوابة الافتراضية نفسها فلا تعبر حركة الشبكات بين VNIs أي Spine للتبديل.\n\n- النوع 2: إعلان MAC/IP\n- النوع 3: نطاق البث ومنع الفيضان\n- Anycast Gateway على كل Leaf للبوابة الافتراضية",
          en: "The first VXLAN generation relied on flood-and-learn: an unknown-destination frame floods the fabric and everyone learns — it works but wastes bandwidth and slows convergence. The current generation uses BGP EVPN as a distributed control plane: each VTEP announces its MACs and IP addresses to the rest via standard BGP routes.\n\nEVPN route types are the keys to understanding: Type 2 announces a MAC/IP pair (endpoint reachability), Type 3 announces broadcast domains (multicast/ingress replication) to avoid blind flooding, and Types 4 and 5 handle inter-fabric and Ethernet/IP route exchange.\n\nThe practical gains are striking: ARP suppression — the VTEP answers ARP locally because it knows MAC/IP pairs from BGP, so the network never drowns in broadcast; MAC mobility across leaves without address changes as VMs migrate between hypervisors; and distributed anycast routing — every Leaf hosts the same virtual gateway, so inter-VNI traffic never crosses a Spine just to be routed.\n\n- Type 2: MAC/IP advertisement\n- Type 3: broadcast scope and flood prevention\n- Anycast Gateway on every Leaf for the virtual gateway",
        },
        tip: {
          ar: "في مقابلات مراكز البيانات سؤال ذهبي: ماذا يعلن مسار EVPN النوع 2؟ الجواب الواثق: زوج MAC/IP (وتفاصيل VNI والشبكة Ethernet). اجعله من محفوظاتك.",
          en: "In datacenter interviews a golden question is: what does EVPN Type 2 advertise? The confident answer: a MAC/IP pair (with VNI and Ethernet segment details). Keep it memorized.",
        },
      },
      {
        heading: { ar: "حسابات التصميم ونطاقات الفشل", en: "Design Math & Failure Domains" },
        body: {
          ar: "الرياضيات قبل الشراء: عدد منافذ الخوادم المطلوبة ÷ كثافة Leaf = عدد الأوراق؛ وعدد الأوراق × عدد وصلات الارتقاء لكل ورقة = منافذ Spine المطلوبة. مثال: 2000 منفذ خادم على أوراق 48 منفذاً = 42 ورقة تقريباً، وكل ورقة بأربع وصلات 40G = 168 منفذ Spine = 4-6 أعمدة بكثافات عالية.\n\nنسبة الاكتتاب (Oversubscription): مجموع سعة الأوراق صعوداً ÷ مجموع سعة الأعمدة. تصميم مرجعي: 48×10G لأسفل و 4×40G لأعلى = 480/160 = 3:1 — معيار شائع للعمل المختلط؛ البيئات الحساسة (HPC، تخزين) تنزل 1:1 أو غير محدودة.\n\nنطاقات الفشل: سقوط Spine واحد لا يلغي المسارات (ECMP يعيد التوزيع فوراً)؛ سقوط Leaf يعزل رَفّه فقط (خزانة واحدة من مئة) — بينما الترقية الآلية يمكن دحرجتها عموداً عموداً وورقة ورقة دون نافذة توقف. هذا التقسيم الدقيق لنطاق الضرر هو أهم ما يميز النسيج عن البنية الهرمية القديمة.\n\n- احسب: منافذ ÷ كثافة = أوراق؛ أوراق × وصلات = منافذ أعمدة\n- 3:1 اكتتاب شائع؛ 1:1 للحمل الحرج\n- نطاق فشل Leaf = رَف واحد فقط",
          en: "Math before purchase: required server ports ÷ Leaf density = number of leaves; leaves × uplinks per leaf = required Spine ports. Example: 2000 server ports on 48-port leaves ≈ 42 leaves, each with four 40G uplinks = 168 Spine ports = 4-6 high-density spines.\n\nOversubscription ratio: total leaf uplink capacity ÷ total spine capacity. A reference design: 48×10G down / 4×40G up = 480/160 = 3:1 — common for mixed workloads; sensitive environments (HPC, storage) drop to 1:1 or non-blocking.\n\nFailure domains: one Spine failing removes no path (ECMP rebalances instantly); a Leaf failing isolates only its rack (one cabinet out of a hundred) — while rolling upgrades proceed spine by spine and leaf by leaf with no maintenance window. This precise slicing of blast radius is the fabric's decisive advantage over the old hierarchy.\n\n- Compute: ports ÷ density = leaves; leaves × uplinks = spine ports\n- 3:1 oversubscription common; 1:1 for critical load\n- A Leaf failure domain = exactly one rack",
        },
      },
    ],
    keyPoints: [
      { ar: "حركة الشرق-غرب في مراكز البيانات الحديثة فرضت معمارية CLOS ثنائية الطبقات", en: "East-west traffic in modern datacenters forced the two-tier CLOS architecture" },
      { ar: "أي خادمين في Spine-Leaf يمران بمسار ثابت: ورقة ← عمود ← ورقة", en: "Any two servers in Spine-Leaf traverse a fixed path: leaf ← spine ← leaf" },
      { ar: "الطبقة السفلية توجيه IP بروابط /31 مع ECMP خماسي التوزيع بلا STP", en: "The underlay is routed IP with /31 links, 5-tuple ECMP and no STP" },
      { ar: "VXLAN يغلّف L2 في UDP/4789 عبر VTEP، و VNI بـ 24 بتاً يمنح 16.7 مليون قسم", en: "VXLAN encapsulates L2 in UDP/4789 via VTEPs; the 24-bit VNI grants 16.7M segments" },
      { ar: "BGP EVPN مستوى تحكم ذكي: النوع 2 لـ MAC/IP والنوع 3 لنطاق البث مع تبديد ARP وبوابة Anycast", en: "BGP EVPN is the smart control plane: Type 2 for MAC/IP, Type 3 for broadcast scope, with ARP suppression and anycast gateway" },
      { ar: "نسبة الاكتتاب ونطاقات الفشل الصغيرة (رف واحد لكل ورقة) تحكم قرارات التصميم", en: "Oversubscription ratios and tiny failure domains (one rack per leaf) drive design decisions" },
    ],
    commands: [
      { cmd: "show bgp evpn summary", desc: { ar: "حال جلسات BGP EVPN مع جيران VTEP في النسيج", en: "State of BGP EVPN sessions with VTEP neighbors in the fabric" } },
      { cmd: "show nve peers", desc: { ar: "عرض أطراف أنفاق VXLAN (VTEPs) المتصلة بكل جهاز", en: "Show the VXLAN tunnel endpoints (VTEPs) peered with the device" } },
      { cmd: "show nve vni", desc: { ar: "قائمة معرفات VNI المفعلة وربطها بـ VLANs و VRFs", en: "List active VNI identifiers and their VLAN/VRF mapping" } },
      { cmd: "show ip cef exact-route 10.1.1.10 10.2.2.20", desc: { ar: "كشف مسار ECMP المختار لتدفق محدد بين عنوانين", en: "Reveal the ECMP path chosen for a specific flow between two addresses" } },
    ],
    quiz: [
      {
        q: { ar: "كم بتاً يبلغ عرض حقل VNI في VXLAN، وما حجم مجاله؟", en: "How wide is the VXLAN VNI field, and how large is its space?" },
        options: [
          { ar: "12 بتاً — 4096 شبكة", en: "12 bits — 4096 networks" },
          { ar: "24 بتاً — نحو 16.7 مليون شبكة", en: "24 bits — about 16.7 million networks" },
          { ar: "32 بتاً — 4 مليارات شبكة", en: "32 bits — 4 billion networks" },
          { ar: "16 بتاً — 65536 شبكة", en: "16 bits — 65536 networks" },
        ],
        correct: 1,
        explain: { ar: "VNI بـ 24 بتاً يتجاوز قفص 802.1Q (12 بتاً) بمرتين لوغاريتمياً: 16,777,216 قسم افتراضي معزول — وهو سبب صلاحية VXLAN للمستأجرين متعددين.", en: "The 24-bit VNI leaps past the 802.1Q cage (12 bits) by two logarithmic levels: 16,777,216 isolated virtual segments — why VXLAN suits multi-tenancy." },
      },
      {
        q: { ar: "كم قفزة (hop) بين أي ورقتين Leaf في نسيج Spine-Leaf سليم؟", en: "How many hops between any two leaves in a healthy Spine-Leaf fabric?" },
        options: [
          { ar: "قفزة واحدة مباشرة", en: "One direct hop" },
          { ar: "قفزتان عبر أي Spine", en: "Two hops through any spine" },
          { ar: "ثلاث قفزات عبر Core", en: "Three hops through a core" },
          { ar: "متغير حسب الحِمل", en: "Variable depending on load" },
        ],
        correct: 1,
        explain: { ar: "Leaf ← Spine ← Leaf: الطول ثابت هيكلياً لأي زوج، وهذا مصدر التأخير المتوقع المتساوي الذي تقدّره التطبيقات الموزعة.", en: "Leaf ← Spine ← Leaf: structurally fixed for any pair — the source of uniform predictable latency that distributed applications value." },
      },
      {
        q: { ar: "ما وظيفة مسار EVPN من النوع 2 (Route Type 2)؟", en: "What does EVPN Route Type 2 do?" },
        options: [
          { ar: "يعلن نطاق البث لمنع الفيضان الأعمى", en: "Advertises the broadcast scope to prevent blind flooding" },
          { ar: "يعلن زوج MAC/IP لإنهاء نحو الجهاز", en: "Advertises a MAC/IP pair for endpoint reachability" },
          { ar: "يربط نسيجين مختلفين عبر AS مختلفة", en: "Interconnects two fabrics across different AS" },
          { ar: "يعلن بادئة IP خارجية في VRF", en: "Advertises an external IP prefix in a VRF" },
        ],
        correct: 1,
        explain: { ar: "النوع 2 هو قلب EVPN: يعلن أزواج MAC/IP فيتعلم كل VTEP مواقع النهايات عبر BGP بدل الفيضان — وهو أساس تبديد ARP والترحيل.", en: "Type 2 is EVPN's heart: it announces MAC/IP pairs so every VTEP learns endpoint locations via BGP instead of flooding — the basis of ARP suppression and mobility." },
      },
      {
        q: { ar: "تصميم ورقة بـ 48 منفذ 10G لأسفل و 4 وصلات 40G لأعلى: ما نسبة الاكتتاب؟", en: "A leaf with 48×10G down and 4×40G up: what is the oversubscription ratio?" },
        options: [
          { ar: "1:1 (غير محدد)", en: "1:1 (non-blocking)" },
          { ar: "3:1", en: "3:1" },
          { ar: "5:1", en: "5:1" },
          { ar: "10:1", en: "10:1" },
        ],
        correct: 1,
        explain: { ar: "الأسفل 480G والأعلى 160G، فالنسبة 3:1 — المعيار المرجعي الشائع للأحمال المختلطة في مراكز البيانات.", en: "Down 480G, up 160G — a 3:1 ratio, the common reference standard for mixed datacenter workloads." },
      },
    ],
  },

  // ─── l098: Monitoring ────────────────────────────────────────────────
  {
    id: "l098",
    moduleId: "m10",
    order: 8,
    level: "expert",
    title: {
      ar: "الرصد والمراقبة: SNMP و NetFlow و Syslog والملاحظة الحديثة",
      en: "Monitoring & Observability: SNMP, NetFlow, Syslog & Beyond",
    },
    summary: {
      ar: "أعين المهندس رصده: بروتوكول SNMP بإصداراته و OIDs، قياس التدفقات عبر NetFlow و sFlow، سجل النظام Syslog بمستوياته الثمانية، ومفهوم الملاحظة الحديثة بالمقاييس والسجلات والتتبعات.",
      en: "An engineer's eyes are their monitoring: the SNMP protocol with its versions and OIDs, flow measurement via NetFlow and sFlow, the syslog system with its eight levels, and the modern observability concept of metrics, logs and traces.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "الرصد قبل الوقاية: لماذا نراقب؟", en: "Monitoring Before Disaster: Why We Watch" },
        body: {
          ar: "شبكة غير مرصودة شبكة ميتة سريرياً: ستعرف بمشاكلها من شكوى المستخدم — أنت متأخر عن الحقيقة دائماً. الرصد الجيد يجيب عن ثلاثة أسئلة قبل أن يسألها أحد: هل الشبكة تعمل الآن؟ (الحالة) — ما مدى جودة عملها؟ (الأداء) — وأين ستنكسر قريباً؟ (الاتجاه).\n\nثلاث ركائز للممارسة الحديثة: المقاييس (Metrics) أرقام زمنية كثيرة التردد (استهلاك المنافذ، تأخير القفزات)، والسجلات (Logs) أحداث نصية غنية التفاصيل من كل جهاز، والتتبعات (Traces) رحلة الطلب عبر الخدمات. الملاحظة (Observability) هي القدرة على استنباط حالة النظام الداخلية من مخرجاته الثلاثة.\n\nالهرم التشغيلي: بيانات ← إنذارات ← لوحات ← تقارير. القاعدة الذهبية للإنذارات: نبّه فقط على ما يستيقظ له المهندس — إنذار مزعج كل ساعتين يُتعوَّد عليه ويُتجاهل (الذئب الكاذب)، فيُفقد الإنذار الحقيقي في الضجيج.\n\n- الأسئلة الثلاثة: الحالة والأداء والاتجاه\n- الركائز الثلاث: مقاييس وسجلات وتتبعات\n- إنذار بلا قرار عمل = ضجيج مدمر",
          en: "An unmonitored network is clinically dead: you learn of its problems from user complaints — always behind reality. Good monitoring answers three questions before anyone asks: is it working now? (status) — how well? (performance) — and where will it break soon? (trend).\n\nThree pillars of modern practice: metrics — high-frequency time-series numbers (port utilization, hop latency); logs — detail-rich textual events from every device; and traces — a request's journey across services. Observability is the ability to infer the system's internal state from these three outputs.\n\nThe operational pyramid: data ← alerts ← dashboards ← reports. The golden alerting rule: alert only on what an engineer would wake up for — a noisy two-hourly alert gets habituated and ignored (the false-positive wolf), burying the real alarm in noise.\n\n- The three questions: status, performance, trend\n- The three pillars: metrics, logs, traces\n- An alert with no actionable response = destructive noise",
        },
        tip: {
          ar: "قاعدة عملية للإنذارات: لكل إنذار اكتب سطر وثيقة يشرح ماذا سيفعل المهندس عند إطلاقه. إن لم تستطع كتابته — احذف الإنذار.",
          en: "A practical alerting rule: for every alert, write a one-line doc explaining what the engineer will do when it fires. If you cannot write it — delete the alert.",
        },
      },
      {
        heading: { ar: "SNMP: لغة الأجهزة الكلاسيكية", en: "SNMP: The Classic Language of Devices" },
        table: {
          caption: { ar: "إصدارات SNMP الثلاثة", en: "The three SNMP versions" },
          headers: [
            { ar: "الإصدار", en: "Version" },
            { ar: "الأمان", en: "Security" },
            { ar: "التحسينات", en: "Improvements" },
            { ar: "الحكم", en: "Verdict" },
          ],
          rows: [
            [
              { ar: "SNMPv1", en: "SNMPv1" },
              { ar: "كلمة سر مشتركة نصية مكشوفة", en: "Cleartext community string" },
              { ar: "الأساس الأولي 1988", en: "The 1988 baseline" },
              { ar: "تراثي — للمعرفة فقط", en: "Legacy — for knowledge only" },
            ],
            [
              { ar: "SNMPv2c", en: "SNMPv2c" },
              { ar: "السر المشترك يبقى مكشوفاً", en: "Shared secret still exposed" },
              { ar: "GetBulk للكفاءة", en: "GetBulk for efficiency" },
              { ar: "مخابر فقط", en: "Labs only" },
            ],
            [
              { ar: "SNMPv3", en: "SNMPv3" },
              { ar: "مصادقة SHA وتشفير AES", en: "SHA authentication and AES encryption" },
              { ar: "سياقات ومستويات أمان", en: "Contexts and security levels" },
              { ar: "معيار الإنتاج الوحيد", en: "The sole production standard" },
            ],
          ],
        },
        body: {
          ar: "SNMP (بروتوكول إدارة الشبكة البسيط) منذ 1988 ما زال العمود الفقري للرصد: كل جهاز شبكة يحمل وكيلاً (Agent) يستمع للمنفذ UDP 161 ويرد بالاستعلامات؛ والمنصة المركزية (Manager) تسأله عن قيم مرقمة تسمى OIDs في شجرة MIB العملاقة.\n\nOID عنوان رقمي في شجرة هرمية: 1.3.6.1.2.1.2.2.1.10 يعني مثلاً بايتات الدخول لكل واجهة. الـ MIB هو ملف قاموس يترجم الأرقام إلى أسماء مفهومة (IF-MIB و TCP-MIB...) — به تستطيع أي منصة أن تفهم أي جهاز بمعايير موحدة.\n\nالإصدارات سيرة تطور أمنية: v1 أولي به كلمات مرور (Community Strings) نصية واضحة؛ v2c حسّن الكفاءة (GetBulk) لكن أبقى السر مشتركاً مكشوفاً؛ v3 أضاف الأمان الغائب: مصادقة (SHA) وتشفير (AES) وسياقات — لا عذر مؤسسياً اليوم لغير v3.\n\nنمطا العمل: الاستطلاع (Polling) — المنصة تسأل دورياً كل دقيقة/خمس دقائق فترسم خطوط الاتجاه؛ والفخاخ (Traps) — الجهاز يرسل فوراً عند حدث (سقوط واجهة) دون انتظار السؤال، على 162/UDP، والحكيم يجمع الاثنين.\n\n- v1/v2c: كلمة سر مشتركة مكشوفة — للمخابر فقط\n- v3: مصادقة وتشفير — معيار الإنتاج\n- اجمع الاستطلاع للاتجاهات والفخاخ للأحداث",
          en: "SNMP (Simple Network Management Protocol) since 1988 remains monitoring's backbone: every network device runs an agent listening on UDP 161 and answering queries; the central platform (manager) asks it for numbered values called OIDs in the giant MIB tree.\n\nAn OID is a numeric address in a hierarchical tree: 1.3.6.1.2.1.2.2.1.10 means, for instance, inbound octets per interface. The MIB is the dictionary file translating numbers into human names (IF-MIB, TCP-MIB...) — through it any platform can understand any device via unified standards.\n\nThe versions tell a security evolution: v1 primitive with cleartext community strings; v2c improved efficiency (GetBulk) but kept the shared secret exposed; v3 added the missing security — authentication (SHA), encryption (AES) and contexts — no enterprise excuse today for anything else.\n\nThe two working modes: polling — the platform asks every minute or five, drawing trend lines; and traps — the device sends instantly on an event (interface down) without waiting, on UDP 162; the wise combine both.\n\n- v1/v2c: cleartext shared password — labs only\n- v3: authentication and encryption — the production standard\n- Combine polling for trends and traps for events",
        },
        code: {
          lang: "bash",
          snippet: "# استطلاع شجرة النظام كاملة (اسم الجهاز والوقت والوصف)\nsnmpwalk -v2c -c public 192.168.1.1 system\n\n# بايتات الدخول والخروج للواجهة رقم 1\nsnmpget -v2c -c public 192.168.1.1 IF-MIB::ifInOctets.1 IF-MIB::ifOutOctets.1\n\n# فحص الحالة بإصدار v3 (مصادقة وتشفير)\nsnmpget -v3 -l authPriv -u monitor \\\n  -a SHA -A 'authpass123' -x AES -X 'encpass456' \\\n  192.168.1.1 sysUpTime.0\n\n# التقاط فخاخ SNMP الواردة على محطة الرصد\nsudo tcpdump -i eth0 udp port 162 -c 10",
        },
      },
      {
        heading: { ar: "NetFlow و sFlow: رؤية ما يمر فعلاً", en: "NetFlow & sFlow: Seeing What Actually Flows" },
        body: {
          ar: "SNMP يخبرك كم بايتاً عبر المنفذ؛ NetFlow يخبرك من أين إلى أين وماذا كان: كل محادثة (Flow) تُلخص بسجل — المصدر والهدف والمنافذ والبروتوكول والبايتات والحوافظ ومدة المحادثة — ثم تُصدَّر لجامع يحللها. هنا تجد المتحدث الأكبر (Top Talkers) الذي يخنق الوصلة، والتطبيقات غير المصرح بها، وبيانات تحليل الاختراقات.\n\nالمفهوم المركزي: تدفق = توصيف سباعي (Source IP، Destination IP، Source Port، Destination Port، Protocol، ToS، Interface). حزم تشترك بالسباعي تنتمي لتدفق واحد، وتُصدَّر عند انتهاء مهلة (Inactive Timeout 15 ثانية عادة) أو عند اكتمال (FIN/RST).\n\nNetFlow/ IPFIX إبداع سيسكو تحول معيار IETF (IPFIX)، و sFlow نهج مختلف: أخذ عينات (Sampling) من حزمة كل ن من الحزم (مثلاً 1 من 2048) مع بيانات واجهة — أخف على المعالج (لا يحتفظ بحالة التدفقات) وأدق للشبكات فائقة السرعة، مع كلفة دقة تقديرية. عادة ذهبية: 1:1000 أو أعلى للترافيك العادي، وأقل للأهم أثناء التحليل.\n\n- NetFlow/IPFIX: تدفقات كاملة الحالة على الموجهات\n- sFlow: عينات عشوائية على المفاتيح عالية السرعة\n- كلاهما يُصدَّر إلى جامع (ntopng، ElastiFlow، SolarWinds NTA)",
          en: "SNMP tells you how many bytes crossed a port; NetFlow tells you from where to where and what: every conversation (flow) is summarized into a record — source, destination, ports, protocol, bytes, packets, duration — then exported to a collector for analysis. There you find the top talker choking a link, unauthorized applications, and intrusion-analysis data.\n\nThe central concept: a flow = a 7-tuple (source IP, destination IP, source port, destination port, protocol, ToS, interface). Packets sharing the tuple belong to one flow, exported when the inactive timeout expires (typically 15 seconds) or on completion (FIN/RST).\n\nNetFlow/IPFIX — Cisco's invention, standardized by the IETF as IPFIX — differs from sFlow: sFlow samples one packet out of n (say 1 in 2048) plus interface metadata — lighter on the CPU (no flow state kept) and better suited to very high-speed switches, at the cost of estimate accuracy. Golden practice: 1:1000 or higher for ordinary traffic, lower when analyzing what matters.\n\n- NetFlow/IPFIX: full-state flows on routers\n- sFlow: random sampling on high-speed switches\n- Both export to a collector (ntopng, ElastiFlow, SolarWinds NTA)",
        },
        code: {
          lang: "text",
          snippet: "Example NetFlow v9 record (as seen by a collector):\n\nSRC            DST            PROT  SPORT DPORT  BYTES     PKTS  DURATION\n192.168.1.50   10.10.0.5      TCP   51522 443    1,204,331  842   65.2s\n192.168.1.61   185.199.108.153 TCP  49110 443    88,120     431   22.1s\n10.10.0.5      192.168.1.50   TCP   443   51522  2,889,010  1,902 65.3s\n\n→ first line: workstation pulling ~1.2 MB over HTTPS from an internal server\n→ collector answers: who are the top talkers? which apps? to where?",
        },
      },
      {
        heading: { ar: "Syslog: سجل النظام بمستوياته الثمانية", en: "Syslog: The System Log and Its Eight Levels" },
        body: {
          ar: "syslog (RFC 3164 ثم 5424) هو نظام السجلات القياسي منذ الثمانينيات: كل جهاز يولّد رسائل نصية مصنفة بمرافق (Facility) — مصدرها التقني (kernel، auth، local0-7) — وشدة (Severity) من 0 إلى 7 تشير لخطورة الحدث، وترسل عبر UDP 514 أو TCP أو TLS الأكثر أماناً إلى خادم مركزي.\n\nالمستويات الثمانية بترتيبها الذي يجب حفظه: 0 Emergency (النظام غير صالح)، 1 Alert (تدخل فوري)، 2 Critical، 3 Error، 4 Warning، 5 Notice (طبيعي لكن مهم — مثل إعادة تحميل واجهة)، 6 Informational، 7 Debug (مطاردة الأعطال فقط — لا يترك مفعلاً دائماً).\n\nالتطبيق العملي: تصفية عند المصدر (logging trap warning — لا ترسل للخادم ما دون شدة معينة) وعند الوجهة (تجمع Warning فأعلى في ملف التنبيهات و Informational في الأرشيف اليومي). الترميز الزمني والتوقيت الموحد NTP شرط لقابلية الربط بين السجلات — ثانية واحدة فارقة بين سجلين تكسر تحقيقاً كاملاً.\n\n- الشدة 0 الأخطر و 7 الأدق تفصيلاً\n- المرافق (Facility) تحدد مصدر الرسالة\n- خادم مركزي + NTP موحد = مقارنة الأحداث عبر الأجهزة",
          en: "syslog (RFC 3164 then 5424) has been the standard logging system since the 1980s: every device generates text messages classified by facility — their technical source (kernel, auth, local0-7) — and severity from 0 to 7 indicating event gravity, shipped over UDP 514, TCP or the safer TLS to a central server.\n\nThe eight levels in must-memorize order: 0 Emergency (system unusable), 1 Alert (act now), 2 Critical, 3 Error, 4 Warning, 5 Notice (normal but significant — like an interface reload), 6 Informational, 7 Debug (troubleshooting only — never leave it permanently on).\n\nPractical application: filter at the source (logging trap warning — send nothing below a severity to the server) and at the destination (collect Warning and above into the alerts file, Informational into the daily archive). Synchronized timestamps via unified NTP are a precondition for cross-referencing logs — a single second's skew between two logs breaks an entire investigation.\n\n- Severity 0 gravest, 7 most verbose\n- Facilities identify the message source\n- Central server + unified NTP = comparing events across devices",
        },
        code: {
          lang: "text",
          snippet: "Facility.Severity   Origin              Example message\n\nkern.emerg          kernel              0.0: kernel panic - not syncing\nauth.alert          login               failed password for admin (attempt 7)\nlocal7.crit         switch              %LINK-3-UPDOWN: Gi1/0/24, changed state to down\nsys.warning         routing             %OSPF-4-ERRRCV: bad packet from 10.0.0.2\nlocal7.notice       switch              %SYS-5-CONFIG_I: configured from console\nlocal7.info         switch               %LINEPROTO-6-UPDOWN: line protocol up\nlocal7.debug        switch               OSPF hello in: 10.0.0.2 (flood details)",
        },
      },
      {
        heading: { ar: "من الرصد إلى الملاحظة الحديثة", en: "From Monitoring to Modern Observability" },
        body: {
          ar: "الملاحظة الحديثة تبني فوق SNMP و syslog أدوات سحابية المبدأ: Prometheus يسحب المقاييس (Pull) من مصدّرات دورية (SNMP Exporter يترجم SNMP إلى مقاييس Prometheus؛ node_exporter للخوادم)، و Grafana يرسم اللوحات ويدير الإنذارات، و Loki يركز سجلات بنفس البنية، و Jaeger/Tempo يتتبعان الطلبات الموزعة.\n\nالقيمة المضافة ليست الأدوات بل المنهج: قياس الذهب (Golden Signals) من كتاب Google SRE — التأخير والحركة والأخطاء والإشباع — كأربعة أسئلة لكل خدمة؛ وأهداف مستوى الخدمة (SLI/SLO/ Error Budget) التي تحول الرصد من لوحات للنظر إلى عقود قابلة للقياس.\n\nلكن كن واقعياً: في عالم أجهزة الشبكة، SNMP و syslog و NetFlow ما زالوا اللغة الأم لمعظم العتاد — والأهرام الصحيحة تبدأ منهم ثم تترجم إلى العالم الحديث. المهندس الحاذق يجيد اللهجتين: SNMP بأسئلته البريئة و Prometheus بلغته العصرية.\n\n- مصدّر SNMP يحوّل OIDs إلى مقاييس زمنية حديثة\n- إشارات الذهب الأربع: تأخير، حركة، أخطاء، إشباع\n- الأدوات جديدة والمنهج أقدم: عرف الحالة وأدِر الاتجاه",
          en: "Modern observability builds cloud-native tools atop SNMP and syslog: Prometheus pulls metrics from exporters (the SNMP Exporter translates SNMP into Prometheus metrics; node_exporter for servers), Grafana paints dashboards and manages alerts, Loki concentrates logs with the same stack, and Jaeger/Tempo trace distributed requests.\n\nThe added value is the method, not the tools: the Golden Signals from Google's SRE book — latency, traffic, errors and saturation — as the four questions for every service; and service-level objectives (SLI/SLO/error budget) that turn monitoring from dashboards-to-look-at into measurable contracts.\n\nBut be realistic: in the world of network devices, SNMP, syslog and NetFlow remain the native tongue of most hardware — and healthy pyramids start from them, then translate into the modern world. The sharp engineer speaks both dialects: SNMP with its plain questions and Prometheus with its modern language.\n\n- The SNMP exporter turns OIDs into modern time-series metrics\n- The four golden signals: latency, traffic, errors, saturation\n- Tools are new; the method is older: know the state, manage the trend",
        },
        tip: {
          ar: "أسرع ربح للمهندس الشاب: شغّل snmp exporter + Grafana على جهاز افتراضي واحد وراقب منزلك/معملك — سيرة ذاتية عملية ودرس ملاحظة حقيقي بسعر صفر.",
          en: "The fastest win for a junior engineer: run the SNMP exporter + Grafana on a single VM and monitor your home/lab — a practical CV line and a real observability lesson at zero cost.",
        },
      },
    ],
    keyPoints: [
      { ar: "الرصد يجيب: الحالة والأداء والاتجاه — قبل أن يسأل المستخدم", en: "Monitoring answers status, performance and trend — before the user asks" },
      { ar: "SNMP v3 هو معيار الإنتاج (مصادة وتشفير)؛ و v2c للمخابر فقط", en: "SNMPv3 is the production standard (auth+encryption); v2c is labs only" },
      { ar: "التدفق توصيف سباعي؛ NetFlow كامل الحالة و sFlow معاينة أخف للمفاتيح السريعة", en: "A flow is a 7-tuple; NetFlow is full-state, sFlow a lighter sample for fast switches" },
      { ar: "شدة syslog من 0 إلى 7: Emergency هو 0 و Debug هو 7 و Notice هو 5", en: "Syslog severity 0-7: Emergency=0, Debug=7, Notice=5" },
      { ar: "إشارات الذهب (تأخير، حركة، أخطاء، إشباع) ومنهج SLO يحولان الرصد لعقود قابلة للقياس", en: "Golden signals (latency, traffic, errors, saturation) and the SLO method turn monitoring into measurable contracts" },
    ],
    commands: [
      { cmd: "snmpwalk -v2c -c public 192.168.1.1 system", desc: { ar: "استطلاع شجرة system على جهاز عبر SNMPv2c (الاسم والوقت والوصف)", en: "Walk the system tree on a device via SNMPv2c (name, uptime, description)" } },
      { cmd: "snmpget -v2c -c public 192.168.1.1 IF-MIB::ifInOctets.1", desc: { ar: "قراءة عداد بايتات الدخول للواجهة الأولى (أساس حساب الاستهلاك)", en: "Read the inbound octets counter of interface 1 (the utilization math basis)" } },
      { cmd: "sudo tcpdump -i eth0 udp port 514", desc: { ar: "التقاط رسائل syslog المتدفقة إلى الخادم المركزي", en: "Capture syslog messages flowing to the central server" } },
      { cmd: "snmpget -v3 -l authPriv -u monitor -a SHA -A 'authpass' -x AES -X 'encpass' 192.168.1.1 sysUpTime.0", desc: { ar: "استعلام آمن SNMPv3 بمصادقة SHA وتشفير AES", en: "Secure SNMPv3 query with SHA authentication and AES encryption" } },
    ],
    quiz: [
      {
        q: { ar: "ما الميزة الأمنية الحاسمة في SNMPv3 مقارنة بـ v2c؟", en: "What is SNMPv3's decisive security feature over v2c?" },
        options: [
          { ar: "استخدام TCP بدل UDP", en: "Using TCP instead of UDP" },
          { ar: "المصادقة والتشفير (SHA و AES)", en: "Authentication and encryption (SHA and AES)" },
          { ar: "دعم GetBulk فائق السرعة", en: "High-speed GetBulk support" },
          { ar: "الغاء الحاجة إلى MIBs", en: "Eliminating the need for MIBs" },
        ],
        correct: 1,
        explain: { ar: "v2c يبث كلمة السر المشتركة نصاً واضحاً في كل حزمة؛ v3 أضاف نماذج الأمان USM: مصادقة المستخدم وتشفير الحزم — الفارق بين معمل وإنتاج.", en: "v2c broadcasts the shared secret in cleartext in every packet; v3 added USM security models: user authentication and payload encryption — the gap between lab and production." },
      },
      {
        q: { ar: "في سلم شدة syslog، ما رقم المستوى Notice؟", en: "In the syslog severity scale, what number is Notice?" },
        options: [
          { ar: "3", en: "3" },
          { ar: "5", en: "5" },
          { ar: "6", en: "6" },
          { ar: "7", en: "7" },
        ],
        correct: 1,
        explain: { ar: "الترتيب من الأخطر: 0 Emergency، 1 Alert، 2 Critical، 3 Error، 4 Warning، 5 Notice، 6 Informational، 7 Debug — فـ Notice رقم 5.", en: "Order from gravest: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug — so Notice is 5." },
      },
      {
        q: { ar: "ما يميز sFlow عن NetFlow/IPFIX؟", en: "What distinguishes sFlow from NetFlow/IPFIX?" },
        options: [
          { ar: "ينقل السجلات مشفرة إلزامياً", en: "It transports records mandatorily encrypted" },
          { ar: "يعتمد أخذ عينات من الحزم بدل تتبع حالة كل تدفق كاملاً", en: "It samples packets instead of tracking every full flow state" },
          { ar: "يعمل على المنفذ 161 فقط", en: "It operates only on port 161" },
          { ar: "يرصد مقاييس الخوادم لا الشبكة", en: "It monitors server metrics rather than the network" },
        ],
        correct: 1,
        explain: { ar: "sFlow يأخذ عينة كل ن حزمة مع بيانات الواجهة دون الاحتفاظ بحالة التدفقات — أخف على المعالج وأليق بالمفاتيح فائقة السرعة بدقة تقديرية.", en: "sFlow samples one packet in n plus interface metadata without keeping flow state — lighter on the CPU and fitter for very fast switches, at estimated accuracy." },
      },
      {
        q: { ar: "ماذا يمثل الفخ (Trap) في SNMP؟", en: "What does an SNMP trap represent?" },
        options: [
          { ar: "استعلام دوري من المنصة إلى الجهاز", en: "A periodic query from the platform to the device" },
          { ar: "إرسال غير متزامن من الجهاز عند وقوع حدث دون انتظار سؤال", en: "An asynchronous send from the device upon an event, without waiting to be asked" },
          { ar: "نسخة احتياطية من إعدادات الجهاز", en: "A backup of the device configuration" },
          { ar: "قاموس ترجمة أسماء OIDs", en: "A dictionary translating OID names" },
        ],
        correct: 1,
        explain: { ar: "الفخ رسالة يرسلها الوكيل فوراً (سقوط واجهة، إعادة تحميل) إلى 162/UDP؛ والاستطلاع رسالة من المدير على 161 — والاثنان معاً صورة الرصد الكاملة.", en: "A trap is an instant agent message (interface down, reload) to UDP 162; polling is a manager query on 161 — both together form the complete monitoring picture." },
      },
    ],
  },

  // ─── l099: Troubleshooting methodology ───────────────────────────────
  {
    id: "l099",
    moduleId: "m10",
    order: 9,
    level: "expert",
    title: {
      ar: "منهجية تشخيص الأعطال المنضبطة + دراسة حالة واقعية",
      en: "Structured Troubleshooting Methodology + a Real Case Study",
    },
    summary: {
      ar: "ما يفصل المهندس المحترف عن الهاوٍ ليس حفظ الأوامر بل منهجية التشخيص: تحديد المشكلة بدقة، وثلاث مدارس (من الأسفل، من الأعلى، فرّق تسد)، منهجية الخطوات السبع، وحلّ قضية انقطاعات غامضة خطوة بخطوة.",
      en: "What separates the professional from the amateur is not memorized commands but the diagnostic method: precise problem definition, three schools (bottom-up, top-down, divide-and-conquer), the seven-step method, and solving a mysterious outage case step by step.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "قبل أي أمر: تحديد المشكلة", en: "Before Any Command: Define the Problem" },
        body: {
          ar: "أكثر مهندسي البداية يطلقون الأوامر قبل أن يفهموا السؤال. الخطوة صفر دائماً: صياغة المشكلة بجملة واحدة دقيقة — من المتأثر؟ (مستخدم واحد، قسم، المبنى كله) ماذا يحدث بالضبط؟ (لا يوجد إنترنت؟ بطء؟ انقطاعات متكررة؟) متى بدأ؟ (بعد تغيير معين؟ في أوقات محددة؟) وما الذي يعمل طبيعياً؟ (الشبكة الداخلية؟ التصفح فقط؟)\n\nهذه الأسئلة الأربعة تصنع نصف الحل قبل لمس أي لوحة مفاتيح، لأنها تحدد نطاق العطل مكانياً وزمانياً وطبقياً: عطل يخص جهازاً واحداً مختلف جذرياً عن عطل يخص قسم، وكلاهما مختلف عن عطل مسائي متقطع.\n\nالتمييز المحوري: العَرَض (Symptom) مقابل السبب الجذري (Root Cause). ارتفاع ضغط الوحدة المعالجة عَرَض؛ حلقة بث (Broadcast Storm) سبب. تبديل جهاز لأنه بطيء علاج عَرَض — سيعود البطء لأن السبب لم يُمس. الاحتراف يطارد السبب الجذري حتى القبض عليه.\n\n- من؟ ماذا؟ متى؟ وما الذي يعمل؟ — أربعة قبل كل شيء\n- حدد النطاق: جهاز ← غرفة ← قسم ← مبنى ← موقع\n- افصل العرض عن السبب الجذري دوماً",
          en: "Most junior engineers fire commands before understanding the question. Step zero is always: one precise sentence defining the problem — who is affected? (one user, one department, the whole building) what exactly happens? (no Internet? slowness? recurring drops?) when did it start? (after a specific change? at specific times?) and what works normally? (internal network? browsing only?)\n\nThese four questions create half the solution before touching any keyboard, because they scope the failure spatially, temporally and by layer: a single-device fault differs radically from a departmental one, and both differ from an intermittent evening fault.\n\nThe pivotal distinction: symptom versus root cause. High CPU is a symptom; a broadcast storm is a cause. Replacing a slow device treats a symptom — the slowness returns because the cause was untouched. Professionalism hunts the root cause until caught.\n\n- Who, what, when, and what still works — four questions before everything\n- Scope it: device ← room ← department ← building ← site\n- Always separate symptom from root cause",
        },
      },
      {
        heading: { ar: "ثلاث مدارس للتشخيص", en: "Three Diagnostic Schools" },
        table: {
          caption: { ar: "مدارس التشخيص الثلاث ومتى تختار كل واحدة", en: "The three diagnostic schools and when to pick each" },
          headers: [
            { ar: "المدرسة", en: "School" },
            { ar: "البداية", en: "Starts at" },
            { ar: "القوة", en: "Strength" },
            { ar: "الأنسب لـ", en: "Best for" },
          ],
          rows: [
            [
              { ar: "من الأسفل للأعلى", en: "Bottom-up" },
              { ar: "الطبقة الفيزيائية ثم صعوداً", en: "Physical layer, climbing up" },
              { ar: "دقة وموثوقية", en: "Precision and reliability" },
              { ar: "نطاق صغير واشتباه فيزيائي", en: "Small scope, physical suspicion" },
            ],
            [
              { ar: "من الأعلى للأسفل", en: "Top-down" },
              { ar: "شكوى التطبيق ثم نزولاً", en: "App complaint, descending" },
              { ar: "سرعة الوصول للسبب", en: "Speed to the cause" },
              { ar: "شكاوى مرتبطة بالتطبيقات", en: "Application-related complaints" },
            ],
            [
              { ar: "فرّق تسد", en: "Divide-and-conquer" },
              { ar: "الطبقة الوسطى (L3 غالباً)", en: "The middle layer (usually L3)" },
              { ar: "تقسيم شجرة الشك نصفين", en: "Halving the doubt tree" },
              { ar: "المشاكل الكبيرة الغامضة", en: "Big vague problems" },
            ],
          ],
        },
        body: {
          ar: "المدرسة الأولى: من الأسفل إلى الأعلى (Bottom-Up) — تبدأ بالطبقة الفيزيائية وتصعد: الوصلة مضاءة؟ التبديل يعمل؟ الـ ARP يتعلم؟ ثم IP ثم التطبيق. دقيقة وموثوقة لكنها بطيئة عبر شبكة كبيرة، وتبدأ من فرضية أن العطل منخفض المستوى.\n\nالمدرسة الثانية: من الأعلى إلى الأسفل (Top-Down) — تبدأ من شكوى المستخدم نفسها (التطبيق) وتنزل: هل يفتح التطبيق؟ الـ DNS؟ الـ TCP؟ تعطي نتائج سريعة عندما تكون الشكوى متعلقة بالتطبيقات، وقد تصل للسبب دون المرور بالكل — لكنها قد تتخطى عللاً فيزيائية خفية.\n\nالثالثة والحكيمة: فرّق تسد (Divide-and-Conquer) — تقفز إلى الطبقة الوسطى (غالباً الشبكة L3) وتختبر مرة واحدة: هل الـ ping للبوابة ينجح؟ فالأسفل سليم غالباً واصعد؛ يفشل؟ فاهبط للأسفل. مثالية للمشاكل واسعة الغموض لأنها تقسم شجرة الاحتمالات نصفين في كل خطوة — على المهندس اختيار الطبقة بحيث يقطع أكبر مساحة شك بفحص واحد.\n\n- Bottom-Up: دقة، مناسبة للنطاق الصغير والاشتباه الفيزيائي\n- Top-Down: سرعة، مناسبة لشكاوى التطبيقات\n- Divide-and-Conquer: كفاءة، خيار الافتراضي للمشاكل الكبيرة الغامضة",
          en: "School one: bottom-up — start at the physical layer and climb: link lit? switch forwarding? ARP learning? then IP then application. Precise and reliable but slow across a large network, and it assumes the fault lies low.\n\nSchool two: top-down — start from the user's complaint itself (the application) and descend: does the app open? DNS? TCP? Fast results when the complaint is application-related, potentially reaching the cause without traversing everything — but it can skip hidden physical faults.\n\nThe third, wise school: divide-and-conquer — jump to the middle layer (usually L3) and test once: does pinging the gateway succeed? Then the lower half is probably fine — climb; it fails? Descend. Ideal for broadly mysterious problems because each step halves the tree of possibilities — the engineer picks the layer where a single test cuts the largest area of doubt.\n\n- Bottom-up: precision, suited to small scope and physical suspicion\n- Top-down: speed, suited to application complaints\n- Divide-and-conquer: efficiency, the default for big vague problems",
        },
        code: {
          lang: "text",
          snippet: "Bottom-Up          Top-Down            Divide-and-Conquer\nL1 cable/LED  ↑    L7 app error   ↓    L3 ping gateway → split\nL2 switch/MAC ↑    L6 TLS/HTTP    ↓    success → climb (L4+)\nL3 IP/ARP     ↑    L5 session     ↓    failure → descend (L2/L1)\nL4 TCP        ↑    L4 TCP         ↓\nL5-7 services ↑    L3 IP/ARP      ↓\n                   L2 switch/MAC  ↓\n                   L1 cable/LED   ↓\n\nSlow but thorough   Fast for app       Halves the search\nsmall scopes        complaints         space each step",
        },
        tip: {
          ar: "قاعدة الاختيار السريع: شكوى مستخدم واحد → فرّق تسد عند طبقته؛ شكاوى متعددة مفاجئة → من الأسفل (شيء مادي مشترك)؛ شكوى تطبيق واحد للجميع → من الأعلى.",
          en: "Quick selection rule: one complaining user → divide-and-conquer at their layer; multiple sudden complaints → bottom-up (something physical and shared); one app failing for everyone → top-down.",
        },
      },
      {
        heading: { ar: "منهجية الخطوات السبع", en: "The Seven-Step Method" },
        diagram: {
          kind: "flow",
          title: { ar: "منهجية التشخيص السبع خطوات", en: "The seven-step troubleshooting methodology" },
          items: [
            { ar: "1) حدد المشكلة بدقة بجملة واحدة", en: "1) Define the problem in one precise sentence" },
            { ar: "2) اجمع المعلومات من المستخدم والسجلات والرصد", en: "2) Gather information from user, logs and monitoring" },
            { ar: "3) حلّل وابنِ الفرضيات — الأرجح أولاً", en: "3) Analyze and form hypotheses — most probable first" },
            { ar: "4) ضع خطة اختبار بأقل تأثير على الإنتاج", en: "4) Build a minimal-impact test plan" },
            { ar: "5) نفّذ خطوة واحدة وقيّم النتيجة", en: "5) Execute one step and evaluate the result" },
            { ar: "6) تحقق من الحل الكامل وزوال العرض", en: "6) Verify the complete fix and symptom removal" },
            { ar: "7) وثّق السبب الجذري والحل والوقاية", en: "7) Document root cause, fix and prevention" },
          ],
        },
        body: {
          ar: "كل الشركات الكبرى تعلّم نسخة من المنهجية المعيارية، والنواة واحدة في سبع خطوات: (1) حدد المشكلة بدقة، (2) اجمع المعلومات — من المستخدم والسجلات والرصد والأعمدة الزمنية، (3) حلّل المعلومات المحتملة واشكّل الفرضيات — أكثر الأسباب احتمالاً أولاً (البساطة قبل التعقيد: كابل قبل جدار ناري!)، (4) ضع خطة اختبار لكل فرضية بأقل تأثير على الإنتاج، (5) نفّذ الخطة خطوة واحدة وقيّم النتيجة بعد كل خطوة، (6) تحقق من الحل الكامل: هل زال العرض أم أخفى مؤقتاً؟ هل تضررت وظائف أخرى؟ ثم (7) وثّق: السبب الجذري، الحل، والوقاية.\n\nالخطوة السابعة الأكثر إهمالاً والأكثر قيمة: توثيق الحادثة يحولها من معاناة فردية إلى معرفة مؤسسية — قاعدة معرفية تنقذ ساعات من زميل يواجه العطل نفسه بعد سنة. وكل ملف حادثة جيد ينتهي بسؤال: ما الذي يمنع تكرار هذا؟ (قاعدة جديدة، إنذار جديد، تغيير تصميم)\n\nانضباط آخر صارم: تغيير واحد في كل مرة. تغييران متزامنان ينتجان ضجيجاً لا علم: نجح العلاج؟ أي منهما شفى؟ فشل؟ أي منهما أعاق؟ متغير واحد في كل تجربة — هذا هو الفارق بين التشخيص والفوضى.",
          en: "Every major company teaches a version of the standard methodology, and the core is the same seven steps: (1) define the problem precisely, (2) gather information — from the user, logs, monitoring, timelines, (3) analyze and form hypotheses — most probable causes first (simplicity before complexity: a cable before a firewall!), (4) build a test plan per hypothesis with minimal production impact, (5) execute one step at a time and evaluate after each, (6) verify the complete fix: did the symptom vanish or is it merely hidden? was anything else harmed? then (7) document: root cause, fix, and prevention.\n\nThe most neglected and most valuable step is the seventh: documenting the incident converts individual suffering into institutional knowledge — a knowledge base saving hours for a colleague facing the same fault a year later. And every good incident file ends with the question: what prevents recurrence? (a new rule, a new alert, a design change)\n\nOne more strict discipline: one change at a time. Two simultaneous changes produce noise, not knowledge: the fix worked — which of the two cured it? It failed — which hindered? A single variable per experiment — that is the difference between diagnosis and chaos.",
        },
      },
      {
        heading: { ar: "دراسة حالة: انقطاعات غامضة في الطابق الثالث", en: "Case Study: Mysterious Drops on the Third Floor" },
        body: {
          ar: "الشكوى (بالعامية): في الطابق الثالث الاتصال ينقطع دقيقة ثم يعود، عشرات المرات يومياً، منذ يومين. لا أحد غيّر شيئاً رسمياً...\n\nالخطوة 1 — التحديد: انقطاعات متكررة لمدة ~60 ثانية، طابق كامل (22 مستخدماً)، بدأت منذ يومين بعد عطلة نهاية الأسبوع، وتؤثر على الشبكة السلكية فقط (اللاسلكي سليم — معلومة ذهبية من الأسئلة الأربعة!).\n\nالخطوة 2 — الجمع: سجلات مفتاح الطابق تظهر رسائل %LINEPROTO-5-UPDOWN متكررة على منفذ واحد Gi1/0/24 كل عدة دقائق. الرصد يظهر أن عدادات أخطاء الإدخال على المنفذ نفسه تنمو بسرعة (CRC و input errors) — عَرَضان يشيران للطبقة الفيزيائية (اختيار مدرسة من الأسفل لأن النطاق مادي مشترك).\n\nالخطوة 3-4 — الفرضيات والخطة: أرجح الأسباب: كابل تالف، منفذ تالف، بطاقة شبكة الجهاز المتصل، أو شيء وُصل حديثاً. الخطة: فحص عداادات المنفذ، اختبار TDR للكابل، ثم تبديل الكابل ثم المنفذ — متغير واحد في كل مرة.\n\nالخطوات 5-6 — التنفيذ والتحقق: TDR أظهر كسراً على بعد 42 متراً — نقطة السقف المستعار حيث مرّ فريق صيانة التكييف نهاية الأسبوع (توقيت البدء يطابق!). استُبدل الكابل فصفرت العدادات ولم تعد الانقطاعات في 48 ساعة رصدها. ثم أُغلق الملف بالخطوة 7 — التوثيق والوقاية: حادثة موثقة بالسبب الجذري والوقت والحل؛ إجراء جديد: أي عمل في السقف المستعار يستوجب إشعار الشبكات؛ وإنذار رصد جديد: تجاوز معدل أخطاء CRC حداً زمنياً على أي منفذ وصول. هكذا تتحول معاناة إلى نظام أفضل.",
          en: "The complaint (in colloquial form): on the third floor the connection drops for a minute then returns, dozens of times daily, for two days now. Nobody officially changed anything...\n\nStep 1 — Definition: recurring ~60-second outages, an entire floor (22 users), starting two days ago after the weekend, affecting wired only (wireless healthy — a golden nugget from the four questions!).\n\nStep 2 — Gathering: the floor switch logs show repeated %LINEPROTO-5-UPDOWN on a single port Gi1/0/24 every few minutes. Monitoring shows input error counters on that same port growing fast (CRC and input errors) — two symptoms pointing at the physical layer (choosing the bottom-up school since the scope is shared and physical).\n\nSteps 3-4 — Hypotheses and plan: most likely causes: a damaged cable, a damaged port, the connected device's NIC, or something newly connected. Plan: check the port counters, run a TDR cable test, then swap the cable then the port — one variable at a time.\n\nSteps 5-6 — Execute and verify: TDR showed a break 42 meters away — the drop-ceiling point where the AC maintenance crew passed during the weekend (the start time matches!). The cable was replaced, counters zeroed, and no drops in 48 monitored hours. The file then closed with Step 7 — Document and prevent: an incident file with root cause, timeline and fix; a new procedure: any above-ceiling work requires notifying the network team; and a new monitoring alert: CRC error rate exceeding a threshold on any access port. That is how suffering becomes a better system.",
        },
        code: {
          lang: "text",
          snippet: "Switch# show interfaces gi1/0/24 | include error|CRC|drops\n  1287 input errors, 1287 CRC, 0 frame, 0 overrun, 0 ignored\n  0 input packets with dribble condition detected\n  431 output errors ... collisions\n\nSwitch# show log | include Gi1/0/24\n%LINK-3-UPDOWN: Interface Gi1/0/24, changed state to down\n%LINEPROTO-5-UPDOWN: Line protocol on Gi1/0/24, changed state to up\n (repeating every few minutes = flap pattern)\n\nSwitch# test cable-diagnostics tdr interface Gi1/0/24\nTDR test running... \nPair A: Fault (open) at 42 meters\n\n→ physical fault confirmed: replace cable, then verify counters zero",
        },
        tip: {
          ar: "أمر test cable-diagnostics tdr متاح على مفاتيح Catalyst الحديثة ويكشف موضع الكسر بالمتر — أسطورة تشخيص الكابلات، اطلبه في أي شك فيزيائي.",
          en: "The test cable-diagnostics tdr command on modern Catalyst switches reveals the break's position in meters — a cabling diagnostic legend; call for it on any physical suspicion.",
        },
      },
      {
        heading: { ar: "أدوات المهني وعاداته", en: "The Professional's Tools & Habits" },
        body: {
          ar: "التشخيص الجيد يقوم على قاعدة بيانات (Baseline): قياسات الحالة الطبيعية قبل العطل — كم زمن ping الطبيعي؟ كم معدل البث الطبيعي؟ بدون خط أساس لا تعرف ما الفرق الشاذ أصلاً. التقط لقطات دورية (بين كل أسبوعين) للإعدادات والعدادات وقارنها بالرصد.\n\nحقيبة الأدوات النهائية: ping و traceroute للمرور، ip/ifconfig للعناوين، arp -a وتفريغ CAM (show mac address-table) للطبقة الثانية، show interfaces للعدادات، tcpdump/Wireshark لما لا يُفسَّر سوى بالحزم نفسها، سجلات syslog وخطوط الرصد الزمنية للربط بين الأحداث.\n\nعادات الفارق: سجل التغييرات المفروض (ماذا غيّرت ومتى ولماذا — أغلب الأعطال الكبرى بعد تغيير موثّق سيئاً أو غير موثق)؛ مقارنة عامل/سليم (diff بين جهاز شاكٍ وجهاز سليم تكشف غالباً الفرق الجوهري)؛ والصبر الإجرائي: لا تتجاوز الخطوة قبل قياس نتيجتها.\n\n- خط أساس دوري قبل أن تحتاجه\n- diff بين شاكٍ وسليم — سلاح مضروب منسي\n- سجل تغييرات صارم: آخر تغيير أول المشتبهين",
          en: "Good diagnosis rests on a baseline: measurements of normal state before the fault — what is normal ping time? normal broadcast rate? Without a baseline you cannot even know what abnormal is. Capture periodic snapshots (biweekly) of configs and counters and compare them against monitoring.\n\nThe ultimate toolkit: ping and traceroute for reachability, ip/ifconfig for addressing, arp -a and CAM dumps (show mac address-table) for layer two, show interfaces for counters, tcpdump/Wireshark for what only the packets themselves explain, syslog logs and monitoring timelines for correlating events.\n\nThe difference-making habits: a change journal (what you changed, when, why — most major outages follow a poorly or non-documented change); the working/broken comparison (a diff between a complaining device and a healthy one often exposes the decisive difference); and procedural patience: never advance a step before measuring its result.\n\n- A periodic baseline before you need it\n- Diff between working and broken — a forgotten weapon\n- A strict change journal: the last change is suspect number one",
        },
        code: {
          lang: "bash",
          snippet: "# خط الأساس: قياسات مأخوذة في حالة الصحة (احفظها)\nping -c 200 -i 0.1 192.168.1.1 | tail -3\nip -s link show eth0\n\n# أثناء الحادث: نفس القياسات ثم قارن\ntraceroute -n 10.10.0.5\narp -n | head\nshow mac address-table | include gi1/0/24\n\n# الربط الزمني بين الأحداث على الجهاز\nshow log | include %LINK|%LINEPROTO",
        },
      },
    ],
    keyPoints: [
      { ar: "حدد المشكلة بأربعة أسئلة قبل أي أمر: من، ماذا، متى، وما الذي يعمل", en: "Define the problem with four questions before any command: who, what, when, and what still works" },
      { ar: "Bottom-Up دقيق للنطاق المادي الصغير؛ Top-Down سريع لشكاوى التطبيقات؛ فرّق تسد يقسم شجرة الشك نصفين", en: "Bottom-up is precise for small physical scopes; top-down is fast for app complaints; divide-and-conquer halves the doubt tree" },
      { ar: "منهجية السبع خطوات تنتهي بالتوثيق والوقاية — لا بالحل فقط", en: "The seven-step method ends with documentation and prevention — not just the fix" },
      { ar: "متغير واحد في كل تجربة وإلا ضاع العلم في الضجيج", en: "One variable per experiment, or knowledge drowns in noise" },
      { ar: "أخطاء CRC المتصاعدة عرَض فيزيائي؛ و TDR يحدد موضع الكسر بالمتر", en: "Rising CRC errors are a physical symptom; TDR locates the cable break in meters" },
      { ar: "خط الأساس وسجل التغييرات وdiff شاكٍ/سليم أدوات الفارق الاحترافي", en: "A baseline, a change journal and the working/broken diff are the professional edge" },
    ],
    commands: [
      { cmd: "ping -c 200 -i 0.1 192.168.1.1 | tail -3", desc: { ar: "قياس مكثف 200 حزمة سريعة للبوابة لرصد فقد متقطع لا يظهر في 4 حزم", en: "Intense 200-packet burst to the gateway to catch intermittent loss invisible in 4 packets" } },
      { cmd: "show interfaces gi1/0/24 | include error|CRC|drops", desc: { ar: "فحص عدادات أخطاء منفذ محدد: CRC والفقد والإدخال", en: "Inspect a specific port error counters: CRC, drops and input" } },
      { cmd: "test cable-diagnostics tdr interface Gi1/0/24", desc: { ar: "اختبار TDR يكشف موقع كسر الكابل بالمتر دون خلعه", en: "TDR test revealing the cable break position in meters without removing it" } },
      { cmd: "show log | include %LINK|%LINEPROTO", desc: { ar: "تصفية سجل الأحداث لأحداث رفع/خفض الوصلات (نمط الرفرفة flap)", en: "Filter the event log for link up/down events (the flap pattern)" } },
    ],
    quiz: [
      {
        q: { ar: "شكاوى متعددة ظهرت فجأة عبر مبنى كامل — أي مدرسة تشخيص تبدأ بها غالباً؟", en: "Multiple sudden complaints across a whole building — which school do you start with?" },
        options: [
          { ar: "من الأعلى (Top-Down) من التطبيق", en: "Top-down from the application" },
          { ar: "من الأسفل (Bottom-Up) — عطب مادي مشترك محتمل", en: "Bottom-up — a probable shared physical fault" },
          { ar: "بالتفريغ الكامل لكل ACL", en: "Full dump of every ACL" },
          { ar: "بإعادة تشغيل كل المفاتيح", en: "Rebooting every switch" },
        ],
        correct: 1,
        explain: { ar: "تأثير جماعي مفاجئ يوحي بعطل في عنصر مشترك منخفض المستوى (مفتاح، وصلة، طاقة) — المدرسة السفلية تصل له أسرع وأوثق، وإعادة التشغيل تمحو الأدلة!", en: "A sudden collective impact suggests a low-level shared element (switch, uplink, power) — the bottom-up school reaches it fastest and most reliably, and reboots destroy evidence!" },
      },
      {
        q: { ar: "ما الخطوة الأولى في أي منهجية تشخيص محترفة؟", en: "What is the first step in any professional troubleshooting methodology?" },
        options: [
          { ar: "إطلاق أوامر show على الأجهزة", en: "Firing show commands on devices" },
          { ar: "تحديد المشكلة بدقة وحصر نطاقها", en: "Precisely defining the problem and scoping it" },
          { ar: "استبدال الجهاز المشتبه به", en: "Replacing the suspected device" },
          { ar: "فتح تذكرة للمستخدم", en: "Opening a user ticket" },
        ],
        correct: 1,
        explain: { ar: "كل المنهجيات تبدأ بالتعريف: من وماذا ومتى وما الذي يعمل. بدون تعريف دقيق تصبح بقية الخطوات عبثاً موجه توجيهاً خاطئاً.", en: "Every methodology starts with definition: who, what, when, and what works. Without precise definition, the remaining steps become misdirected guesswork." },
      },
      {
        q: { ar: "في دراسة الحالة، ما الذي كشفت عنه أخطاء CRC المتصاعدة على المنفذ؟", en: "In the case study, what did the rising CRC errors on the port reveal?" },
        options: [
          { ar: "خطأ في جدول التوجيه", en: "A routing table error" },
          { ar: "مشكلة في الطبقة الفيزيائية (كابل/منفذ)", en: "A physical-layer problem (cable/port)" },
          { ar: "فيروس على حاسوب المستخدم", en: "A virus on the user computer" },
          { ar: "خلل في خادم DHCP", en: "A DHCP server fault" },
        ],
        correct: 1,
        explain: { ar: "أخطاء CRC تعني وصول إطارات تالفة — الحساب في الطبقة الثانية لكن السبب فيزيائي: وصلات سيئة أو كابل مقطوع أو منفذ متضرر، كما أكد اختبار TDR بالحالة.", en: "CRC errors mean arriving corrupted frames — computed at layer two but physical in cause: bad connections, a severed cable or a damaged port, as the case's TDR test confirmed." },
      },
      {
        q: { ar: "لماذا نصر على تغيير واحد فقط في كل خطوة اختبار؟", en: "Why insist on only one change per test step?" },
        options: [
          { ar: "لتوفير وقت التنفيذ", en: "To save execution time" },
          { ar: "لأن الأجهزة لا تقبل تغييرين معاً", en: "Because devices accept no two changes at once" },
          { ar: "لأن عزل المتغير هو ما يمنح النتيجة قوتها التفسيرية", en: "Because isolating the variable is what gives the result explanatory power" },
          { ar: "لتقليل استخدام الأوامر", en: "To reduce command usage" },
        ],
        correct: 2,
        explain: { ar: "تغييران متزامنان يجعلان النتيجة ملتبسة: أيهما شفى أو أعاق؟ عزل المتغير الواحد يحول التجربة إلى دليل علمي لا تخمين مصادف.", en: "Two simultaneous changes make the outcome ambiguous: which cured or broke it? Isolating the single variable turns the experiment into scientific evidence, not lucky guesswork." },
      },
    ],
  },

  // ─── l100: Career roadmap ────────────────────────────────────────────
  {
    id: "l100",
    moduleId: "m10",
    order: 10,
    level: "expert",
    title: {
      ar: "خارطة الطريق المهني: الشهادات والرواتب والمعمل والمقابلات",
      en: "The Career Roadmap: Certs, Salaries, Labs & Interviews",
    },
    summary: {
      ar: "الدرس الختامي: سلّم الوظائف من الدعم الفني إلى معماري الشبكات، مسار الشهادات من Network+ إلى CCNP والتخصصات، أرقام رواتب واقعية، معمل منزلي بثلاث ميزانيات، والاستعداد للمقابلات بملف أعمال حقيقي.",
      en: "The closing lesson: the job ladder from helpdesk to network architect, the certification path from Network+ to CCNP specializations, realistic salary numbers, a home lab at three budgets, and interview preparation with a real portfolio.",
    },
    durationMin: 25,
    sections: [
      {
        heading: { ar: "سلّم الوظائف: من الدعم إلى المعمارية", en: "The Job Ladder: From Support to Architecture" },
        body: {
          ar: "قلما يبدأ مهندس الشبكات مهندساً؛ المسار الكلاسيكي: الدعم الفني/خدمة المكتب (سنة إلى سنتين) تتعلم فيها تشخيص المستوى الأول والتعامل مع الناس — وقيمة هذا الحسّ التشخيصي تبقى معك عمراً كاملاً. ثم فني NOC (مركز العمليات): مراقبة الشبكة والإبلاغ والتدخل الأول، وتتاح لك رؤية شبكة حية كبيرة من الداخل.\n\nثم مهندس شبكات مبتدئ/ثانٍ (1-3 سنوات): تملك تغييرات حقيقية تحت إشراف، ثم مهندس أول: تصميم مواقع كاملة والاستجابة للحالات الصعبة وتوجيه الصغار. بعدها تتفرع المسارات: قائد فريق/رئيس شبكات (إدارة وبشر) أو معماري (تصميم ورؤية وتقارير قرارات) أو مسار سحابي/أتمتة متخصص.\n\nالنقلة النوعية بين الرتب ليست أوامر إضافية بل تغيّر طبيعة الأسئلة: المستوى الأول يسأل (لماذا لا يعمل هذا؟)، والمهندس يسأل (كيف أصلحه؟)، والمعماري يسأل (كيف نصمم بحيث لا يحدث أصلاً؟). لاحظ في أي مقابلة تُسأل أسئلة أي مستوى — فذلك بوصلة نضجك.\n\n- دعم فني ← NOC ← مهندس مبتدئ ← مهندس أول ← قائد/معماري\n- كل ترقية تغيّر سؤالك من لماذا؟ إلى كيف؟ إلى ماذا لو؟\n- سنوات القاعدة الشائعة: 1-2 ثم 1-2 ثم 3-5 لكل رتبة كبرى",
          en: "Rarely does a network engineer start as one; the classic path: helpdesk/field support (1-2 years) learning first-line diagnosis and people skills — and that diagnostic instinct stays with you forever. Then NOC technician: monitoring, reporting, first response, with a view inside a large live network.\n\nThen junior/intermediate network engineer (1-3 years): owning real changes under supervision, then senior engineer: designing whole sites, handling hard cases, mentoring juniors. Afterwards the paths branch: team lead/network manager (management and people), architect (design, vision, decision papers), or a specialized cloud/automation track.\n\nThe qualitative shift between ranks is not extra commands but a change in the nature of questions: level one asks (why does this not work?), the engineer asks (how do I fix it?), and the architect asks (how do we design so it never happens?). Notice which level's questions you are asked in any interview — that is your maturity compass.\n\n- Helpdesk ← NOC ← junior engineer ← senior engineer ← lead/architect\n- Each promotion shifts your question from why? to how? to what if?\n- Common rule-of-thumb years: 1-2, then 1-2, then 3-5 per major rank",
        },
        code: {
          lang: "text",
          snippet: "Title                  Typical years   Core question\nHelpdesk/Field support   0-2          why does this not work?\nNOC Technician           1-3          what is alerting right now?\nNetwork Engineer I/II    2-5          how do I fix and configure it?\nSenior Network Engineer  5-8          how do we design this properly?\nLead / Architect         8+           how do we make it never happen again?\n+ parallel tracks: cloud networking, network automation, security",
        },
      },
      {
        heading: { ar: "مسار الشهادات: Network+ ثم CCNA ثم تخصص CCNP", en: "The Certification Path: Network+ → CCNA → CCNP Specializations" },
        table: {
          caption: { ar: "شهادات الشبكات على السلّم من الدخول إلى القمة", en: "Networking certifications on the ladder from entry to apex" },
          headers: [
            { ar: "الشهادة", en: "Certification" },
            { ar: "مستواها", en: "Level" },
            { ar: "طبيعتها", en: "Nature" },
            { ar: "ما تفتحه", en: "What it opens" },
          ],
          rows: [
            [
              { ar: "Network+ (N10-009)", en: "Network+ (N10-009)" },
              { ar: "دخول", en: "Entry" },
              { ar: "محايدة المصنّع — مفاهيم", en: "Vendor-neutral — concepts" },
              { ar: "وظائف الدعم و NOC", en: "Support and NOC jobs" },
            ],
            [
              { ar: "CCNA (200-301)", en: "CCNA (200-301)" },
              { ar: "أساس المهنة", en: "Career foundation" },
              { ar: "عملي: IOS و VLANs و OSPF", en: "Hands-on: IOS, VLANs, OSPF" },
              { ar: "توظيف حقيقي كمهندس", en: "Genuine engineer employability" },
            ],
            [
              { ar: "CCNP Enterprise", en: "CCNP Enterprise" },
              { ar: "تخصص (ENCOR + تركيز)", en: "Specialization (ENCOR + concentration)" },
              { ar: "EVPN و SD-WAN وأتمتة", en: "EVPN, SD-WAN, automation" },
              { ar: "الأول — السوق الأوسع طلباً", en: "Senior — widest market demand" },
            ],
            [
              { ar: "CCNP DC / Security", en: "CCNP DC / Security" },
              { ar: "تخصص موازٍ", en: "Parallel specialization" },
              { ar: "أقمشة VXLAN أو أمن شبكي", en: "VXLAN fabrics or network security" },
              { ar: "موجة السحابة والأمن", en: "The cloud and security wave" },
            ],
            [
              { ar: "CCIE", en: "CCIE" },
              { ar: "القمة", en: "Apex" },
              { ar: "كتابي + معمل 8 ساعات", en: "Written + 8-hour lab" },
              { ar: "الاستشارات والمشاريع الكبرى", en: "Consulting and major projects" },
            ],
          ],
        },
        body: {
          ar: "المحطة الأولى المقترحة للداخل الجديد: CompTIA Network+ (N10-009 حالياً) — شاملة المفاهيم، محايدة المصنّع، وبلا متطلبات سابقة؛ تفتح أبواب وظائف الدعم والـ NOC وتبني أساس المفاهيم. لكنها تختبر الفهم لا اليد: لن تُطلب منك تهيئة مفتاح فعلي.\n\nالمحطة الذهبية: Cisco CCNA (200-301) — الشهادة الأوسع اعترافاً في الشبكات، تختبر يداً حقيقية: تهيئة IOS، VLANs والتوجيه وOSPF وأمن أولي وأتمتة أولية وشبكات لاسلكية. اجتيازها يعني قابلية توظيف حقيقية كمهندس. صلاحيتها ثلاث سنوات وتتجدد بالنشاط المستمر (CE) أو امتحان أعلى.\n\nبعد CCNA تتخصص في CCNP بمسارك: Enterprise (ENCOR 350-401 كامتحان نواة + امتحان تركيز مثل ENARSI أو SD-WAN أو التصميم)، أو Security، أو Data Center، أو Service Provider، أو Collaboration. مسار Enterprise هو الأكثر طلباً سوقياً؛ وData Center يخدم موجة الأقمشة والسحابة. النواة ENCOR نفسها تغطي EVPN و SD-WAN و QoS والأتمتة — قفزة نوعية عن CCNA.\n\nوقمة الهرم CCIE (امتحان كتابي + معمل ثماني ساعات) — مشاريع كبرى ومستشاريات فقط، ولا يحتاجها معظم المسار المهني. استراتيجية ناضجة: CCNA ثم خبرة سنتين ثم CCNP في تخصص يخدم سوقك الفعلي — لا جمع شهادات كطوابع.\n\n- Network+: باب البداية المفاهيمي\n- CCNA: عتبة المهنة العملية\n- CCNP تخصص: Enterprise الأشهر، وDC للسحابة والأقمشة\n- CCIE: للنخبة الاستشارية فقط",
          en: "The suggested first stop for newcomers: CompTIA Network+ (currently N10-009) — conceptually comprehensive, vendor-neutral, no prerequisites; it opens support and NOC doors and builds the conceptual foundation. But it tests understanding, not hands: you will not configure an actual switch.\n\nThe golden stop: Cisco CCNA (200-301) — the most widely recognized networking certification, testing real hands: IOS configuration, VLANs, routing, OSPF, basic security, basic automation and wireless. Passing it means genuine employability as an engineer. It is valid three years, renewable through continuing education or a higher exam.\n\nAfter CCNA you specialize in CCNP on your track: Enterprise (the ENCOR 350-401 core exam plus a concentration like ENARSI, SD-WAN or design), Security, Data Center, Service Provider, or Collaboration. The Enterprise track has the widest market demand; Data Center serves the fabric and cloud wave. The ENCOR core itself covers EVPN, SD-WAN, QoS and automation — a qualitative leap over CCNA.\n\nAnd the pyramid's apex, CCIE (a written exam plus an eight-hour lab) — for major projects and consulting only; most careers do not need it. A mature strategy: CCNA, then two years of experience, then a CCNP in a specialization serving your actual market — not collecting stamps.\n\n- Network+: the conceptual entry door\n- CCNA: the practical profession threshold\n- CCNP specialization: Enterprise most popular, DC for cloud and fabrics\n- CCIE: for the consulting elite only",
        },
        tip: {
          ar: "لا تقفز إلى CCNP قبل خبرة عملية سنة على الأقل بعد CCNA — الامتحان يعبر، لكن سوق العمل يسأل عن القصص: ماذا بنيت؟ ماذا أصلت؟ الشهادة تفتح الباب والخبرة تدخلك الغرفة.",
          en: "Do not jump to CCNP before at least a year of practice after CCNA — the exam passes, but the job market asks for stories: what did you build? what did you fix? The certificate opens the door; experience walks you into the room.",
        },
      },
      {
        heading: { ar: "الرواتب والسوق: أرقام بلا وهم", en: "Salaries & the Market: Numbers Without Illusion" },
        body: {
          ar: "الأرقام تختلف جذرياً بالبلد والخبرة وحجم الشركة — القيم التالية تقريبية أمريكية سنوياً (2024) وتنخفض أو ترتفع إقليمياً: دعم فني 35-45 ألف دولار، فني NOC نحو 45-60 ألفاً، مهندس شبكات 65-95 ألفاً، مهندس أول 95-130 ألفاً، معماري 120-160 ألفاً فصاعداً. أضف 10-20% لتخصصات الأمن والسحابة والأتمتة في الشركات الكبرى.\n\nفي منطقة الشرق الأوسط تتراوح بداية مهندس الشبكات غالباً بين 8-15 ألف ريال/درهم شهرياً حسب الدولة والقطاع (الحكومي/النفط أعلى عادة من الخاص الصغير)، وترتفع مع CCNP والخبرة إلى 20-35 ألفاً. الفريلانس والاستشارات مسار موازٍ مربح للمتقدمين: تقييم شبكات صغيرة وبناء معامل تدريب ومشاريع أتمتة.\n\nاتجاهات السوق الثلاثة الحاسمة لقرارك: (1) الأتمتة صارت مطلوبة في كل وصف وظيفي مهندس أول تقريباً — تعلم Python/Ansible ليس اختيارياً؛ (2) السحابة (AWS/Azure networking) نقلت جزءاً من الوظائف من مكاتب الشركات إلى السحابة نفسها؛ (3) الأمن الشبكي يقدم علاوات دائمة. المهندس الذي يجمع (شبكات تقليدية + أتمتة + سحابة) هو الأعلى طلباً في كل استطلاع.\n\n- الرواتب أرقام استرشادية تتغير بالبلد والقطاع\n- الأتمتة والسحابة رافعتا الأجر الأكبر حالياً\n- المزيج الثلاثي (شبكات+أتمتة+سحابة) = ندرة مدفوعة الثمن",
          en: "Numbers vary radically by country, experience and company size — the following are approximate annual US figures (2024) that shift regionally: helpdesk $35-45k, NOC technician ~$45-60k, network engineer $65-95k, senior engineer $95-130k, architect $120-160k and up. Add 10-20% for security, cloud and automation specializations in large companies.\n\nIn the Middle East region, a starting network engineer typically earns 8-15k SAR/AED monthly depending on country and sector (government/oil usually above small private), rising with CCNP and experience to 20-35k. Freelancing and consulting are a profitable parallel track for seniors: small-network assessments, training labs, automation projects.\n\nThree decisive market trends for your decision: (1) automation appears in nearly every senior job description — learning Python/Ansible is not optional; (2) the cloud (AWS/Azure networking) moved part of the jobs from company offices into the cloud itself; (3) network security pays permanent premiums. The engineer combining (traditional networking + automation + cloud) is the highest demanded in every survey.\n\n- Salaries are indicative figures shifting by country and sector\n- Automation and cloud are currently the biggest pay elevators\n- The triple mix (networking + automation + cloud) = a paid-for rarity",
        },
      },
      {
        heading: { ar: "المعمل المنزلي بثلاث ميزانيات", en: "The Home Lab at Three Budgets" },
        body: {
          ar: "الميزانية صفر دولار: Cisco Packet Tracer للتدريبات المنهجية (مجاني رسمياً عبر Networking Academy)، و GNS3 مع صور IOS القانونية التي توفرها Cisco مع حساب تعلم، و EVE-NG community على جهاز افتراضي. أضف حساب AWS/Azure مجاني الشهر الأول لتجربة VPCs فعلياً، و Mininet مع متحكم Ryu لمحاكاة SDN، و Ansible داخل أجهزة افتراضية Linux مجاناً. المعمل الصفري الصحيح يغطي 70% من رحلة CCNA وحتى مسالك CCNP العملية.\n\nالميزانية ~200-250 دولاراً: ترخيص Cisco Modeling Labs Personal (نحو 199 دولاراً سنوياً) — محاكاة رسمية شبكات IOS و NX-OS بلا قيود صور القرصنة، 20 عقدة معاً وربما كافٍ حتى مشاريع CCNP؛ أو بديل: شراء قطعتين مستعملتين (مفتاح Catalyst 2960 وموجّه 1941/2911) من السوق الموازي بعشرات الدولارات مع كابلات وحدة تحكم.\n\nالميزانية 600-1500 دولاراً: معمل فيزيائي حقيقي يبقى معك سنين: مفتاحان L3 (3560/3750 مستعملان)، مفتاح وصول، جدار ASA أو بديله، نقطة وصول قابلة للتحكم، PDU ورَف صغير — تشغيل كهربائه الشهري بضعة دولارات إن أخمدته عند اللزوم. العامل المفتاح: الطاقة والضجيج في مسكن صغير!\n\n- 0$: Packet Tracer + GNS3 + حسابات سحابية مجانية\n- 200$: CML Personal أو ثنائي مستعمل بسيط\n- 600$+: رَفّ حقيقي كامل بعناصر L3 وجدار وAP\n- العامل الحاسم: استمرار الاستخدام لا عدد الأجهزة",
          en: "The zero-dollar budget: Cisco Packet Tracer for syllabus drills (officially free via Networking Academy), GNS3 with legal IOS images provided by Cisco with a learning account, and EVE-NG community on a virtual machine. Add the first-month-free AWS/Azure account to actually try VPCs, Mininet+Ryu for SDN, and Ansible inside free Linux VMs. The right zero lab covers 70% of the CCNA journey and even practical CCNP tracks.\n\nThe ~$200-250 budget: a Cisco Modeling Labs Personal license (about $199/year) — official simulation of IOS and NX-OS networks without pirated images, 20 concurrent nodes, likely sufficient even for CCNP projects; or the alternative: two used units (a Catalyst 2960 switch and a 1941/2911 router) from the secondary market for tens of dollars plus console cables.\n\nThe $600-1500 budget: a real physical lab that stays with you for years: two L3 switches (used 3560/3750), an access switch, an ASA-class firewall, a manageable access point, a PDU and a small rack — its monthly electricity a few dollars if you power it down when idle. The key number: power and noise in a small home!\n\n- $0: Packet Tracer + GNS3 + free cloud accounts\n- $200: CML Personal or a simple used pair\n- $600+: a real rack with L3 elements, a firewall and an AP\n- The decisive factor: sustained usage, not device count",
        },
        code: {
          lang: "text",
          snippet: "Budget       Kit                                        Covers\n$0           Packet Tracer, GNS3, Mininet, free         CCNA theory + labs,\n             AWS/Azure first-month VPC, Ansible in VMs     basic CCNP/automation\n$200         Cisco Modeling Labs Personal (1yr) OR      Full CCNA + most CCNP\n             used 2960 + 1941 router + console cables      hands-on labs\n$600+        2x L3 switch + access switch + firewall     CCNP/CCIE-style real\n             + AP + PDU + rack + power planning            design & fault drills\n\nHidden costs: electricity (~$3-8/mo), noise, desk space - plan for them.",
        },
        tip: {
          ar: "القاعدة الذهبية للمعمل: التقط لقطة من كل تجربة ناجحة في مستودع Git مع ملف توضيح — سنتان من هذا تعطيك بورتفوليو أقوى من أي شهادة وحدها.",
          en: "The lab golden rule: snapshot every successful experiment into a Git repo with a readme — two years of this yields a portfolio stronger than any certificate alone.",
        },
      },
      {
        heading: { ar: "المقابلات: الأسئلة التي تتكرر ومنهج الإجابة", en: "Interviews: The Recurring Questions & Answer Method" },
        body: {
          ar: "أسئلة المقابلات التقنية للشبكات شبه ثابتة عبر الشركات: اشرح رحلة حزمة عبر الطبقات من كتابة URL حتى ظهور الصفحة (أشهر سؤال على الإطلاق)؛ الفرق بين مبدل وموجه؛ ماذا يحدث عند تعطل وصلة STP؛ كيف تعمل DHCP عبر DORA؛ حل مسألة subnetting أمامهم؛ ولماذا يفشل ping مع نجاح التصفح (أو العكس) — سؤال التشخيص المتكرر.\n\nسؤال السيناريو هو الحكم: مشكلة لا يستطيع المستخدمون فيها فتح موقع واحد بعينه — ابدأ منهجياً (حدد، اجمع، فرّق تسد...) كما تعلمت في درس المنهجية؛ يريدون رؤية طريقة تفكيرك المنضبطة لا تخمينك السريع. الاعتراف بأني لا أعرف ثم منهج اكتشاف الحقيقة أفضل عند الممتحن المحترف من تضليل واثق كاذب.\n\nمنهج الإجابة النفسي الأنجع STAR للمواقف السلوكية: الوضع (Situation)، المهمة (Task)، الفعل (Action)، النتيجة (Result) — جملتان لكل عنصر. وأسئلة نهاية المقابلة (اسأل دائماً!): ما أكبر تحدي تقني في شبكتكم؟ كيف يبدو النجاح في هذا الدور بعد ستة أشهر؟ — أسئلة تظهر تفكير مهندس لا باحث عن راتب فقط.\n\n- الأسئلة التقنية الخمسة الكبرى: رحلة الحزمة، مبدل/موجه، STP، DORA، وتشخيص غامض\n- سيناريو التشخيص يقيّم المنهج لا الإجابة السريعة\n- لا أعرف + منهج = جواب محترم؛ تظاهر واثقاً = رفض فوري",
          en: "Networking technical interview questions are near-fixed across companies: explain a packet's journey through the layers from typing a URL to the page rendering (the most famous question of all); the difference between a switch and a router; what happens when an STP link fails; how DHCP works through DORA; solve a subnetting task on the spot; and why ping fails while browsing works (or vice versa) — the recurring diagnostic question.\n\nThe scenario question is the judge: users cannot open one specific site — work methodically (define, gather, divide-and-conquer...) as you learned in the methodology lesson; they want to see your disciplined thinking, not quick guessing. Admitting I do not know, then showing a method to discover the truth, scores higher with professional interviewers than confident bluffing.\n\nThe most effective behavioral answer method is STAR: Situation, Task, Action, Result — two sentences each. And end-of-interview questions (always ask!): what is the biggest technical challenge in your network? what does success look like in this role after six months? — questions showing an engineer's mind, not merely a salary seeker.\n\n- The five big technical questions: packet journey, switch/router, STP, DORA, and a vague diagnosis\n- The diagnosis scenario evaluates method, not fast answers\n- I do not know + a method = respected answer; confident bluffing = immediate rejection",
        },
        code: {
          lang: "text",
          snippet: "Q: Users cannot open www.example.com but everything else works.\nStrong answer skeleton (say it methodically):\n1. Scope: one site, many users → shared cause, not one client\n2. Layers: DNS first (nslookup www.example.com), then routing\n   (traceroute to its IP), then the app (curl -v https://...)\n3. Isolate: does it fail on a phone with mobile data? (bypasses\n   our network → internal cause) does dig @8.8.8.8 differ?\n4. Likely causes: DNS poisoning/record, firewall/proxy category,\n   asymmetric MTU on one path, certificate issue\n5. Verify the fix, then document and add an alert if applicable",
        },
      },
      {
        heading: { ar: "ملف الأعمال: وقودك المهني الدائم", en: "The Portfolio: Your Permanent Career Fuel" },
        body: {
          ar: "الشهادات تصف ما تعرفه؛ والبورتفوليو يثبت ما فعلت. مستودع Git شخصي به: مجلد لكل مشروع (معمل منزلي، أتمتة أنسابل، شبكة Mininet، مخططات VPC) وكل مجلد فيه README يشرح المشكلة والحل والصور وملفات التهيئة الحقيقية — وثائق تُقرأ كقصة هندسية.\n\nمثال مجرب: مهندس مبتدئ وثّق رحلة بناء معمله: تصميم الشبكة، إعدادات المفاتيح مع التعليقات، سكربت Netmiko للنسخ الاحتياطي، ثم أوقف عطلاً متعمداً ووثّق تشخيصه بالمنهجية — عشر صفحات أعطته في المقابلة ما لم يعطه أي شهادة: دليل فعل حقيقي.\n\nعناصر الرفع: مخططات مرسومة بأداة مجانية (draw.io/diagrams.net)، ملفات YAML/Python نظيفة ومعلقة، ولقطات ناتج الأوامر قبل/بعد. وإن كتبت ثلاث مقالات تقنية تشرح ما بنيت (LinkedIn أو مدونة شخصية) صرت ضمن الأقلية التي تشارك المعرفة — وقود الطلب عليك.\n\n- البورتفوليو شهادة يقرؤها المحاور قبل المقابلة\n- كل مشروع: مشكلة ← حل ← أدلة (صور/ملفات/نتائج)\n- المشاركة العلنية للمعرفة تنقلك من باحث عمل إلى مرجع يُسأل عنه",
          en: "Certificates describe what you know; a portfolio proves what you did. A personal Git repo with: a folder per project (home lab, Ansible automation, a Mininet network, VPC diagrams), each containing a README explaining the problem, the solution, screenshots and real configuration files — documents that read like an engineering story.\n\nA proven example: a junior engineer documented his lab journey: network design, commented switch configs, a Netmiko backup script, then deliberately broke something and documented the methodical diagnosis — ten pages that gave him in the interview what no certificate did: proof of real action.\n\nThe elements that raise it: diagrams drawn with a free tool (draw.io/diagrams.net), clean commented YAML/Python files, and before/after command output screenshots. And if you write three technical articles explaining what you built (LinkedIn or a personal blog), you join the minority that shares knowledge — fuel for demand in your direction.\n\n- The portfolio is a certificate interviewers read before the interview\n- Every project: problem ← solution ← evidence (images/files/results)\n- Publicly sharing knowledge moves you from job seeker to a referenced authority",
        },
        tip: {
          ar: "أفضل استثمار للساعات الأخيرة في هذه المنصة: اقلب عملك الكامل إلى مستودع Git نظيف باسمك — أنجزت 100 درس؟ وثّق معملك ومشاريعك الآن، فهي مادة البورتفوليو الجاهزة أمامك.",
          en: "The best investment of your final hours on this platform: turn your completed work into a clean Git repo under your name — you finished 100 lessons? Document your lab and projects now; the portfolio material is sitting right in front of you.",
        },
      },
    ],
    keyPoints: [
      { ar: "المسار الواقعي: دعم فني ← NOC ← مهندس ← أول ← قائد/معماري، وكل رتبة تغيّر طبيعة سؤالك", en: "The realistic path: helpdesk ← NOC ← engineer ← senior ← lead/architect, and each rank changes your question's nature" },
      { ar: "Network+ للباب المفاهيمي، و CCNA عتبة التوظيف العملي، و CCNP تخصص بعد خبرة", en: "Network+ for the conceptual door, CCNA as the practical employability threshold, CCNP as a post-experience specialization" },
      { ar: "أرقام الرواتب استرشادية، والمزيج (شبكات+أتمتة+سحابة) هو الرافعة الأعلى حالياً", en: "Salary figures are indicative; the mix (networking + automation + cloud) is the current highest lever" },
      { ar: "المعمل يبدأ من صفر دولار (Packet Tracer و GNS3) و CML Personal خيار 200$ ممتاز", en: "The lab starts at zero dollars (Packet Tracer, GNS3) and CML Personal is an excellent $200 option" },
      { ar: "أسئلة المقابلات شبه ثابتة: رحلة الحزمة و STP و DORA وسيناريو تشخيص يقيم منهجك", en: "Interview questions are near-fixed: packet journey, STP, DORA and a diagnosis scenario evaluating your method" },
      { ar: "بورتفوليو Git موثق يثبت الفعل ويتفوق على الشهادة وحدها في قرارات التوظيف", en: "A documented Git portfolio proves action and beats the certificate alone in hiring decisions" },
    ],
    commands: [
      { cmd: "show ip interface brief", desc: { ar: "أول أمر يتقنه كل مهندس معمل: نظرة عامة على الواجهات وحالاتها وعناوينها", en: "The first command every lab engineer masters: overview of interfaces, states and addresses" } },
      { cmd: "show version", desc: { ar: "إصدار النظام والذاكرة ومدة التشغيل — سؤال مقابلة كلاسيكي عن معلومات الجهاز", en: "System version, memory and uptime — a classic interview question about device facts" } },
      { cmd: "copy running-config startup-config", desc: { ar: "حفظ التهيئة — العادة اليومية الأولى في المعمل وبيئة العمل", en: "Saving the configuration — the number-one daily habit in the lab and at work" } },
      { cmd: "git init && git add . && git commit -m 'network-lab baseline'", desc: { ar: "بدء مستودع ملف الأعمال: أول التزام يوثق معملك", en: "Start the portfolio repository: the first commit documenting your lab" } },
    ],
    quiz: [
      {
        q: { ar: "ما الشهادة المحايدة للمصنّعين والمناسبة كبداية مفاهيمية؟", en: "Which certification is vendor-neutral and suited as a conceptual start?" },
        options: [
          { ar: "Cisco CCNA", en: "Cisco CCNA" },
          { ar: "CompTIA Network+", en: "CompTIA Network+" },
          { ar: "Cisco CCNP Enterprise", en: "Cisco CCNP Enterprise" },
          { ar: "Juniper JNCIE", en: "Juniper JNCIE" },
        ],
        correct: 1,
        explain: { ar: "Network+ من CompTIA محايدة المصنّع وبلا متطلبات، تختبر الفهم المفاهيمي الشامل — باب البداية قبل تخصص Cisco العملي.", en: "CompTIA Network+ is vendor-neutral with no prerequisites, testing broad conceptual understanding — the entry door before the practical Cisco specialization." },
      },
      {
        q: { ar: "ما امتحان النواة لمسار CCNP Enterprise؟", en: "What is the core exam for the CCNP Enterprise track?" },
        options: [
          { ar: "200-301 CCNA", en: "200-301 CCNA" },
          { ar: "N10-009 Network+", en: "N10-009 Network+" },
          { ar: "350-401 ENCOR", en: "350-401 ENCOR" },
          { ar: "400-007 CCIE Written", en: "400-007 CCIE Written" },
        ],
        correct: 2,
        explain: { ar: "ENCOR 350-401 هو النواة الإلزامية لمسار Enterprise، يليه امتحان تركيز مثل ENARSI أو SD-WAN أو التصميم لإكمال CCNP.", en: "ENCOR 350-401 is the mandatory Enterprise core, followed by a concentration exam such as ENARSI, SD-WAN or Design to complete the CCNP." },
      },
      {
        q: { ar: "ما الخيار الأنسب لميزانية معمل 200 دولار تقريباً؟", en: "What suits a lab budget of roughly $200?" },
        options: [
          { ar: "شراء عشرة موجّهات قديمة وتشغيلها دائماً", en: "Buying ten old routers and running them 24/7" },
          { ar: "انتظار توفر شهادة CCIE للشركة", en: "Waiting for a company CCIE to appear" },
          { ar: "ترخيص Cisco Modeling Labs Personal أو ثنائي مستعمل بسيط", en: "A Cisco Modeling Labs Personal license or a simple used pair" },
          { ar: "عدم بناء معمل والاكتفاء بالقراءة", en: "Building no lab and just reading" },
        ],
        correct: 2,
        explain: { ar: "CML Personal (~199$) يمنح محاكاة رسمية 20 عقدة IOS/NX-OS بلا صور قرصنة، أو ثنائي مستعمل (مفتاح+موجه) بعشرات الدولارات — أفضل قيمة لبداية جدية.", en: "CML Personal (~$199) grants official 20-node IOS/NX-OS simulation without pirated images, or a used pair (switch + router) for tens of dollars — the best value for a serious start." },
      },
      {
        q: { ar: "ما القيمة الأساسية لملف الأعمال (Portfolio) في التوظيف؟", en: "What is the portfolio's core value in hiring?" },
        options: [
          { ar: "يستبدل الشهادات تماماً", en: "It fully replaces certificates" },
          { ar: "يثبت الفعل الهندسي الفعلي بأدلة قابلة للقراءة قبل المقابلة", en: "It proves actual engineering action with readable evidence before the interview" },
          { ar: "يزيد عدد صفحات السيرة الذاتية فقط", en: "It merely adds CV pages" },
          { ar: "يغني عن خبرة العمل الميدانية", en: "It substitutes for field work experience" },
        ],
        correct: 1,
        explain: { ar: "الشهادة تصف المعرفة والبورتفوليو يبرهن على التطبيق: مستودع Git بمشاريع موثقة وصور وملفات حقيقية يقرؤه المحاور فيمنحك سبقاً حقيقياً — لا يلغي الشهادة بل يكملها.", en: "The certificate describes knowledge; the portfolio demonstrates application: a Git repo of documented projects, images and real files is read before the interview and earns you a true head start — complementing, not replacing, the certificate." },
      },
    ],
  },
];
