import type { Lesson } from "@/lib/types";

// Module m09 — Network Security (l081–l090)
export const m09_LESSONS: Lesson[] = [
  {
    id: "l081",
    moduleId: "m09",
    order: 1,
    level: "advanced",
    title: { ar: "خريطة التهديدات: كيف يفكر المهاجم؟", en: "The Threat Landscape: How Attackers Think" },
    summary: {
      ar: "ثالوث CIA، سلسلة القتل (Kill Chain)، أنواع الهجمات على الشبكات، والتفكير بأسلوب MITRE ATT&CK لبناء دفاع منهجي.",
      en: "The CIA triad, the kill chain, network attack categories, and MITRE ATT&CK-style thinking for building methodical defense.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "ما الذي نحميه أصلاً؟ ثالوث CIA", en: "What Are We Protecting? The CIA Triad" },
        body: {
          ar: "قبل دراسة الهجمات، حدد ما تحتاج حمايته. كل أمن المعلومات يدور حول ثلاث خصائص:\n\n- السرية (Confidentiality): لا يقرأ البيانات إلا المصرح لهم — سرقة قاعدة العملاء كسر لها\n- السلامة (Integrity): البيانات لم تُعدّل بلا إذن — تحويل رقم حساب في تحويل مالي كسر لها\n- التوافر (Availability): الخدمة تعمل عند الحاجة — إسقاط موقع بنك كسر لها\n\nأضف المحاسبية (Accountability/Non-repudiation): أن تستطيع إثبات من فعل ماذا — وهي ما تصنع التسجيلات (Logging) والهويات الموحدة.\n\nفكرة عملية: كل هجوم ستدرسه في هذه الوحدة يكسر واحدة من هذه الخصائص على الأقل — صنّف كل تهديد بهذا المرآة يسهُل فهمه.",
          en: "Before studying attacks, define what needs protection. All information security revolves around three properties:\n\n- Confidentiality: only authorized parties read the data — stealing the customer database breaks it\n- Integrity: data is not modified without authorization — changing an account number in a wire transfer breaks it\n- Availability: the service works when needed — taking a bank site offline breaks it\n\nAdd accountability (non-repudiation): being able to prove who did what — this is what logs and unified identities build.\n\nA practical idea: every attack you will study in this module breaks at least one of these properties — classify every threat through this lens and it becomes easy to reason about.",
        },
      },
      {
        heading: { ar: "من هم المهاجمون؟", en: "Who Are the Attackers?" },
        body: {
          ar: "فهم الدافع يتنبأ بالأسلوب:\n\n- الهواة (Script Kiddies): يشغلون أدوات جاهزة — خطرهم الاختبار غير المقصود والهجمات العشوائية الواسعة\n- المتنشطون (Hacktivists): دافع أيديولوجي — يستهدفون السمعة بالتوافر (إسقاط مواقع)\n- مجرمو الإنترنت: المال — برمجيات الفدية (Ransomware) وسرقة البيانات والاحتيال؛ اليوم أكبر تهديد إحصائياً\n- المخترق الداخلي (Insider): موظف ساخط أو مهمل — يتمتع بصلاحيات مشروعة أصلاً وتخطي معظم الدفوع المحيطية\n- فرق التهديد المتقدم (APT): جهات حكومية — تمويل وعقود طويلة: استخبارات، سرقة ملكية فكرية، وبنية تحتية\n\nسلسلة القتل (Cyber Kill Chain) تضع الهجوم المتقدم في سبع مراحل: الاستطلاع، التصنيع، التوصيل، الاستغلال، التثبيت، القيادة والسيطرة (C2)، ثم الأفعال على الأهداف.\n\n- كل مرحلة فرصة كشف مختلفة\n- كلما أوقفته مبكراً كانت الكلفة أقل بكثير\n- كلمات مفتاحية للبحث: Indicator of Compromise (IOC) في السجلات والحزم",
          en: "Understanding motive predicts method:\n\n- Script kiddies: running ready-made tools — their danger is unintentional probing and broad random scans\n- Hacktivists: ideological motive — targeting reputation via availability (site takedowns)\n- Cyber criminals: money — ransomware, data theft, fraud; statistically today's biggest threat\n- Insiders: disgruntled or careless employees — they already hold legitimate access, bypassing most perimeter defenses\n- Advanced Persistent Threats (APTs): state-backed — funding and patience: espionage, intellectual property theft, infrastructure\n\nThe Cyber Kill Chain frames an advanced attack in seven stages: reconnaissance, weaponization, delivery, exploitation, installation, command and control (C2), then actions on objectives.\n\n- Each stage is a different detection opportunity\n- The earlier you stop it, the exponentially lower the cost\n- Search keywords: Indicators of Compromise (IOCs) in logs and packets",
        },
      },
      {
        heading: { ar: "هجمات الشبكات الكلاسيكية", en: "Classic Network Attacks" },
        table: {
          caption: { ar: "هجمات الشبكات الكلاسيكية: الهدف والدفاع", en: "Classic network attacks: target and defense" },
          headers: [
            { ar: "الهجوم", en: "Attack" },
            { ar: "ما يستهدفه", en: "What it targets" },
            { ar: "الدفاع الأساسي", en: "Primary defense" },
          ],
          rows: [
            [
              { ar: "التنصت Sniffing", en: "Sniffing" },
              { ar: "السرية — قراءة المرور", en: "Confidentiality — reading traffic" },
              { ar: "التبديل + التشفير (TLS/VPN)", en: "Switching + encryption (TLS/VPN)" },
            ],
            [
              { ar: "انتحال ARP", en: "ARP spoofing" },
              { ar: "رجل في المنتصف على الشبكة الفرعية", en: "Man-in-the-middle on the subnet" },
              { ar: "Dynamic ARP Inspection + DHCP Snooping", en: "Dynamic ARP Inspection + DHCP snooping" },
            ],
            [
              { ar: "انتحال IP/DNS", en: "IP/DNS spoofing" },
              { ar: "الهوية والوجهة الحقيقية للمواقع", en: "Identity and true destination of sites" },
              { ar: "uRPF، DNSSEC، DoT/DoH", en: "uRPF, DNSSEC, DoT/DoH" },
            ],
            [
              { ar: "مسح المنافذ", en: "Port scanning" },
              { ar: "اكتشاف الخدمات المكشوفة", en: "Discovering exposed services" },
              { ar: "جدران نارية + IPS + تصغير السطح", en: "Firewalls + IPS + shrinking the surface" },
            ],
            [
              { ar: "التصيد Phishing", en: "Phishing" },
              { ar: "بوابة الدخول عبر الإنسان", en: "The human entry gate" },
              { ar: "تدريب + MFA + فلترة البريد", en: "Training + MFA + mail filtering" },
            ],
            [
              { ar: "الحركة الجانبية", en: "Lateral movement" },
              { ar: "التوسع داخل الشبكة بعد أول قدم", en: "Expanding inside after the first foothold" },
              { ar: "التقطيع + أقل امتياز + مراقبة شرق-غرب", en: "Segmentation + least privilege + east-west monitoring" },
            ],
            [
              { ar: "رفض الخدمة DoS/DDoS", en: "DoS/DDoS" },
              { ar: "التوافر", en: "Availability" },
              { ar: "CoPP + uRPF + مراكز التنقية", en: "CoPP + uRPF + scrubbing centers" },
            ],
          ],
        },
        body: {
          ar: "قائمة الهجمات التي يجب أن يحفظها مهندس الشبكات عن ظهر قلب:\n\n- التنصت (Sniffing): قراءة المرور — كان سهلاً في عصر Hubs، وفي عصر المبدلات يتطلب خداعاً\n- انتحال ARP (ARP Spoofing): المهاجم يعلن: أنا البوابة! فيتدفق إليه مرور الشبكة الفرعية كلها — رجل في المنتصف حقيقي\n- انتحال IP/DNS: التظاهر بعنوان آخر، أو تسميم خزانة DNS لتحويلك لموقع مزيف\n- هجمات المنفذ والاستطلاع: nmap يكتشف خدماتك المكشوفة — أول ما يفعله أي مهاجم\n- التصيد (Phishing): بوابة الدخول الأولى في أكثر من 90% من الحوادث — بريد يخدع موظفاً فيفتح باباً\n- البرمجيات الخبيثة (Malware): فيروسات وديدان وأحصنة طروادة وبرمجيات فدية\n- الحركة الجانبية (Lateral Movement): بعد أول قدم في الشبكة يتحرك المهاجم داخلياً نحو الأهداف الثمينة\n- رفض الخدمة (DoS/DDoS): درس كامل قادم له\n\nلاحظ النمط: التوصيل عبر البريد أو الويب، ثم الاستغلال، ثم الانتشار — وهذا يقودنا للدفاع الطبقي.",
          en: "The list every network engineer must memorize:\n\n- Sniffing: reading traffic — easy in the hub era; in the switch era it requires a trick\n- ARP spoofing: the attacker announces: I am the gateway! — the whole subnet's traffic flows to him, a true man-in-the-middle\n- IP/DNS spoofing: pretending to be another address, or poisoning the DNS cache to redirect you to fake sites\n- Port scanning and reconnaissance: nmap discovering your exposed services — any attacker's first move\n- Phishing: the number-one entry gate in over 90% of incidents — an email deceiving an employee opens the door\n- Malware: viruses, worms, trojans, ransomware\n- Lateral movement: after the first foothold the attacker moves internally toward valuable targets\n- Denial of service (DoS/DDoS): a full upcoming lesson\n\nNotice the pattern: delivery via email or web, then exploitation, then propagation — which leads us to layered defense.",
        },
        tip: {
          ar: "جرب في مختبر منزلي معزول: arp -a قبل وبعد هجوم انتحال ARP بأداة مثل Ettercap — ستشاهد تغير عنوان MAC للبوابة أمام عينيك.",
          en: "Try in an isolated home lab: arp -a before and after an ARP spoof with a tool like Ettercap — you will watch the gateway MAC address change before your eyes.",
        },
      },
      {
        heading: { ar: "التفكير بأسلوب MITRE ATT&CK", en: "Thinking in MITRE ATT&CK Style" },
        body: {
          ar: "ATT&CK قاعدة معرفة مجانية (mitre-engenuity.org) تصنّف سلوك المهاجمين في مصفوفة: صفوفها الأهداف التكتيكية (Tactics) مثل الوصول الأولي والتنفيذ والاستمرارية والحركة الجانبية والاخراج، وكل صف تقنيات (Techniques) مرقمة مثل T1566 (التصيد) و T1110 (تخمين كلمات المرور) و T1046 (مسح الشبكة).\n\nلماذا تهمك كمهندس شبكات؟\n\n- تحويل الأمان من قائمة أدوات إلى خريطة تغطية: أي تقنيات أغطيها وأيها ينفذ بحرية؟\n\n- لغة مشتركة مع فرق SOC والأمن — تقنية بالرقم بدل وصف فضفاض\n- تعطيك أولويات استثمار: التقنيات الأكثر شيوعاً في قطاعك أولاً\n\nمنهجية عملية: خذ تقنيات ال 10 الأكثر استخداماً في تقرير الهجمات السنوي لقطاعك، ثم لكل واحدة اسأل: ما إشارتي عليها في شبكتي (تسجيل، مراقبة)؟ وما حاجزي (تصحيح، عزل، مصادقة)؟ — هذا جدول فجوات أمني حقيقي.",
          en: "ATT&CK is a free knowledge base (mitre-engenuity.org) classifying attacker behavior in a matrix: rows are tactical goals (tactics) like initial access, execution, persistence, lateral movement, and exfiltration; each row lists numbered techniques like T1566 (phishing), T1110 (password guessing), and T1046 (network service scanning).\n\nWhy should you care as a network engineer?\n\n- It converts security from a tool list into a coverage map: which techniques do I cover, and which run free?\n\n- A shared language with SOC and security teams — a technique by number instead of vague prose\n- It gives you investment priorities: the most common techniques in your sector first\n\nA practical method: take the 10 most-used techniques in your sector's annual attack report, then for each one ask: what is my detection signal (logging, monitoring)? And what is my barrier (patching, segmentation, authentication)? — that is a real security gap table.",
        },
      },
      {
        heading: { ar: "الدفاع في العمق: لا سحر بلا طبقات", en: "Defense in Depth: No Magic Without Layers" },
        diagram: {
          kind: "layers",
          title: { ar: "طبقات الدفاع في العمق من الخارج إلى البيانات", en: "Defense-in-depth layers from outside to data" },
          items: [
            { ar: "الفيزيائي: أقفال غرف الخوادم وكاميرات", en: "Physical: server-room locks and cameras" },
            { ar: "المحيطي: جدران نارية وحماية DDoS", en: "Perimeter: firewalls and DDoS protection" },
            { ar: "الشبكة: تقطيع VLAN و ACL ومراقبة", en: "Network: VLAN segmentation, ACLs, monitoring" },
            { ar: "الهوية: MFA وأقل امتياز", en: "Identity: MFA and least privilege" },
            { ar: "نقطة النهاية: EDR وتصحيح", en: "Endpoint: EDR and patching" },
            { ar: "التطبيق: تحقق المدخلات وترقيع", en: "Application: input validation and patching" },
            { ar: "البيانات: تشفير ونسخ احتياطية معزولة", en: "Data: encryption and isolated backups" },
          ],
        },
        body: {
          ar: "الافتراض التأسيسي: كل حاجز سيفشل يوماً ما. لذلك لا نبني حاجزاً واحداً بل طبقات متتالية يعمل فشل إحداها كفرصة للطبقة التالية:\n\n- الفيزيائي: خزائن الرفوف، أقفال غرف الخوادم، كاميرات\n- المحيطي: جدران نارية وحماية DDoS على الحدود\n- الشبكة: تقطيع VLAN و ACL وقوائم التحكم والمراقبة\n- الهوية: مصادقة متعددة العوامل وأقل امتياز\n- نقطة النهاية: مضاد فيروسات، تصحيح، EDR\n- التطبيق: تحقق المدخلات وترقيع التبعيات\n- البيانات: تشفير في السكون والنقل ونسخ احتياطية معزولة\n\nاعتبار الاختراق (Assume Breach): صمم وكأن المهاجم داخل شبكتك الآن — ماذا يمنعه من الوصول لقاعدة البيانات؟ الإجابة: التقطيع + الهوية + التشفير... هذا تحديداً موضوع درس Zero Trust في نهاية الوحدة.",
          en: "The foundational assumption: every barrier will fail one day. So we do not build one barrier but successive layers, where each failure is a chance for the next layer:\n\n- Physical: rack cabinets, server room locks, cameras\n- Perimeter: firewalls and DDoS protection at the edge\n- Network: VLAN segmentation, ACLs, monitoring\n- Identity: multi-factor authentication and least privilege\n- Endpoint: antivirus, patching, EDR\n- Application: input validation and dependency patching\n- Data: encryption at rest and in transit, isolated backups\n\nAssume breach: design as if the attacker is inside your network right now — what stops him from reaching the database? The answer: segmentation + identity + encryption... which is precisely the Zero Trust lesson at the end of this module.",
        },
      },
    ],
    keyPoints: [
      { ar: "ثالوث CIA: السرية والسلامة والتوافر — صنّف كل تهديد بأيها يكسر", en: "CIA triad: confidentiality, integrity, availability — classify each threat by which it breaks" },
      { ar: "سلسلة القتل 7 مراحل: كل مرحلة فرصة كشف — مبكراً أرخص دائماً", en: "The 7-stage kill chain: each stage is a detection chance — earlier is always cheaper" },
      { ar: "التصيد بوابة أكثر من 90% من الحوادث، والحركة الجانبية يليها", en: "Phishing gates over 90% of incidents; lateral movement follows" },
      { ar: "MITRE ATT&CK: تكتيكات وتقنيات مرقمة تحول الأمن لخريطة تغطية", en: "MITRE ATT&CK: numbered tactics and techniques turning security into a coverage map" },
      { ar: "الدفاع في العمق: افترض فشل كل طبقة وابنِ التي تليها", en: "Defense in depth: assume every layer fails and build the next one" },
    ],
    commands: [
      { cmd: "nmap -sV --top-ports 100 scanme.nmap.org", desc: { ar: "استطلاع مصرح به: اكتشاف الخدمات المكشوفة كما يفعل المهاجم", en: "Authorized recon: discover exposed services as an attacker would" } },
      { cmd: "arp -a", desc: { ar: "عرض جدول ARP — راقب عنوان MAC للبوابة لاكتشاف الانتحال", en: "Show the ARP table — watch the gateway MAC to detect spoofing" } },
      { cmd: "show ip arp", desc: { ar: "جدول ARP على موجه Cisco للتحقق من تطابق MAC-IP", en: "ARP table on a Cisco router to verify MAC-IP matching" } },
      { cmd: "tcpdump -i eth0 arp", desc: { ar: "مراقبة حزم ARP حية لرصد الإعلانات المشبوهة", en: "Live capture of ARP packets to spot suspicious announcements" } },
    ],
    quiz: [
      {
        q: { ar: "مهاجم عدّل مبلغ تحويل مالي من 5000 إلى 50000 أثناء عبوره الشبكة. أي خاصية كسر بالأساس؟", en: "An attacker altered a wire transfer amount from 5,000 to 50,000 in transit. Which property was primarily broken?" },
        options: [
          { ar: "التوافر", en: "Availability" },
          { ar: "السرية", en: "Confidentiality" },
          { ar: "السلامة", en: "Integrity" },
          { ar: "المحاسبية", en: "Accountability" },
        ],
        correct: 2,
        explain: { ar: "تغيير البيانات في الطريق هو كسر السلامة (Integrity) الصريح — وهذا ما تحاربه توقيعات MAC/TLS، بينما السرية تُكسر بالقراءة والتوافر بالتعطيل.", en: "Altering data in transit is an explicit integrity breach — exactly what TLS/MAC signatures fight; confidentiality breaks by reading, availability by disruption." },
      },
      {
        q: { ar: "شركة تعرضت لهجوم وبدأ المهاجم يتحرك من جهاز موظف مصاب نحو الخوادم. ما مصطلح هذا السلوك في ATT&CK؟", en: "A company was attacked and the attacker moves from an infected employee machine toward servers. What is this behavior called in ATT&CK?" },
        options: [
          { ar: "الوصول الأولي (Initial Access)", en: "Initial Access" },
          { ar: "الحركة الجانبية (Lateral Movement)", en: "Lateral Movement" },
          { ar: "الإخراج (Exfiltration)", en: "Exfiltration" },
          { ar: "الاستمرارية (Persistence)", en: "Persistence" },
        ],
        correct: 1,
        explain: { ar: "الحركة الجانبية: التوسع من نقطة القدم الأولى نحو أهداف أخرى داخل الشبكة — وهي المرحلة التي يجعلها التقطيع الدقيق (Segmentation) بطيئة ومرئية.", en: "Lateral movement: expanding from the initial foothold toward other internal targets — the stage that fine-grained segmentation makes slow and visible." },
      },
      {
        q: { ar: "ما القيمة العملية لقاعدة MITRE ATT&CK لمهندس الشبكات؟", en: "What is the practical value of MITRE ATT&CK for a network engineer?" },
        options: [
          { ar: "أداة لمنع كل الهجمات آلياً", en: "A tool to automatically prevent all attacks" },
          { ar: "خريطة تغطية: تقنيات مرقمة تقيس ما ترصده وتحجبه وما ينفذ بحرية، وتوفر لغة مشتركة", en: "A coverage map: numbered techniques measuring what you detect and block versus what runs free, plus a shared language" },
          { ar: "برنامج مضاد فيروسات تجاري", en: "A commercial antivirus product" },
          { ar: "معيار تشفير للشبكات", en: "An encryption standard for networks" },
        ],
        correct: 1,
        explain: { ar: "ATT&CK ليس أداة بل إطار معرفة: يحول دفاعك لمصفوفة تغطية قابلة للقياس، ويوحد مصطلحات الفرق — ومنه تُشتق أولويات الاستثمار الأمني.", en: "ATT&CK is not a tool but a knowledge framework: it turns your defense into a measurable coverage matrix and unifies team terminology — from which security investment priorities derive." },
      },
      {
        q: { ar: "لماذا يعتبر افتراض الاختراق (Assume Breach) قاعدة تصميم وليس تشاؤماً؟", en: "Why is Assume Breach a design principle rather than pessimism?" },
        options: [
          { ar: "لأنه يقلل كلفة التأمين فقط", en: "Because it merely lowers insurance costs" },
          { ar: "لأن التاريخ يثبت أن الحواجز المحيطية تُخترق، فالتصميم للأيام السيئة (تقطيع + هوية + تشفير) يحد الضرر", en: "Because history proves perimeters get breached, so designing for bad days (segmentation + identity + encryption) limits the damage" },
          { ar: "لأنه يمنع الهجمات نهائياً", en: "Because it prevents attacks entirely" },
          { ar: "لأن الأنظمة القديمة لا تدعمه", en: "Because legacy systems do not support it" },
        ],
        correct: 1,
        explain: { ar: "الفارق بين حادث محدود وحدث كارثي ليس منع الدخول (سيحدث) بل ماذا يجد المهاجم بعد دخوله: شبكة مقطعة وهوية مشددة تجعل الاختراق قصة صغيرة.", en: "The difference between a contained incident and a catastrophe is not preventing entry (it will happen) but what the attacker finds inside: a segmented, identity-hardened network keeps the breach a small story." },
      },
    ],
  },
  {
    id: "l082",
    moduleId: "m09",
    order: 2,
    level: "advanced",
    title: { ar: "الجدران النارية: عديم الحالة مقابل ذي الحالة والمناطق", en: "Firewalls: Stateless vs Stateful and Security Zones" },
    summary: {
      ar: "تطور الجدران النارية من فلاتر الحزم إلى جدران الحالة وجدرات الجيل القادم NGFW، والتصميم بالمناطق على Cisco IOS ZBF.",
      en: "Firewall evolution from packet filters to stateful and next-generation firewalls, plus zone-based design on Cisco IOS ZBF.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "ما هو الجدار الناري؟", en: "What Is a Firewall?" },
        body: {
          ar: "الجدار الناري نقطة قرار في مسار الحزم: يفحص كل حزمة عابرة ويقرر سماحها أو رفضها وفق قواعد. مفهومه منذ أواخر الثمانينيات وتطور عبر ثلاثة أجيال:\n\n- الجيل الأول: فلتر الحزم (Packet Filter) — ينظر للحزمة الواحدة معزولة: من أين؟ إلى أين؟ أي بروتوكول ومنفذ؟ سريع وغبي\n- الجيل الثاني: الجدار ذو الحالة (Stateful) — يتذكر اتصالات TCP ويطابق الحزم على جدول الحالات\n- الجيل الثالث: الجيل القادم (NGFW) — يفهم التطبيقات والمستخدمين والمحتوى، ويجمع IPS وهوية و SSL inspection\n\nموضعه الكلاسيكي: بين شبكتك الداخلية والإنترنت — لكن التصميم الحديث يوزعه: على المحيط، بين المناطق الحساسة، وفي مراكز البيانات.",
          en: "A firewall is a decision point in the packet path: it inspects every traversing packet and decides allow or deny per policy. The concept dates to the late 1980s and evolved through three generations:\n\n- Generation one: packet filter — looks at each packet in isolation: from where? to where? which protocol and port? fast but dumb\n- Generation two: stateful firewall — remembers TCP connections and matches packets against a state table\n- Generation three: next-generation (NGFW) — understands applications, users, and content, integrating IPS, identity, and SSL inspection\n\nIts classic placement: between your internal network and the Internet — but modern design distributes it: at the perimeter, between sensitive zones, and in datacenters.",
        },
      },
      {
        heading: { ar: "الفلتر عديم الحالة: بسيط لكن مكشوف", en: "The Stateless Filter: Simple but Exposed" },
        body: {
          ar: "الفلتر عديم الحالة (Stateless) يقيم كل حزمة بمعزل كامل عن سياقها — عادة عبر قوائم التحكم ACL على الموجهات:\n\nالقاعدة تحدد الخماسية: المصدر، الوجهة، البروتوكول، منفذ المصدر، منفذ الوجهة.\n\nقوته: سرعة فائقة وقابلية تنفيذ على أغلب الأجهزة، ومناسب لحجب شبكة معروفة أو السماح بخدمة واحدة.\n\nضعفه القاتل: لا يعرف معنى الاتصال. لتسمح بمرور رد DNS أو رد TCP العائد، يجب أن تفتح قاعدة واسعة (perm tcp any gt 1023 established كانت محاولة قديمة) — والقواعد الواسعة أبواب خلفية. حزمة SYN مزيفة بأعلام صحيحة تنفذ من خلال قوائم متهالكة.",
          en: "The stateless filter evaluates each packet in complete isolation — typically via ACLs on routers:\n\nThe rule defines the 5-tuple: source, destination, protocol, source port, destination port.\n\nIts strength: extreme speed and implementability on almost any device, suitable for blocking a known network or allowing a single service.\n\nIts fatal weakness: it does not know what a connection is. To allow return DNS or TCP replies, you must open a broad rule (perm tcp any gt 1023 established was the old hack) — and broad rules are backdoors. A forged SYN with proper flags slips through stale lists.",
        },
        code: {
          lang: "cisco",
          snippet: "! ACL عديم الحالة على IOS\naccess-list 110 permit tcp 192.168.10.0 0.0.0.255 any eq 443\naccess-list 110 permit udp 192.168.10.0 0.0.0.255 any eq 53\naccess-list 110 deny ip any any log\n!\ninterface GigabitEthernet0/0\n ip access-group 110 in\n!\nshow access-lists 110",
        },
      },
      {
        heading: { ar: "الجدار ذو الحالة: ذاكرة الاتصالات", en: "The Stateful Firewall: Connection Memory" },
        table: {
          caption: { ar: "الفلتر عديم الحالة مقابل الجدار ذي الحالة", en: "Stateless filter vs stateful firewall" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "عديم الحالة", en: "Stateless" },
            { ar: "ذو الحالة", en: "Stateful" },
          ],
          rows: [
            [
              { ar: "ما يراه", en: "What it sees" },
              { ar: "الحزمة الواحدة معزولة", en: "Each packet in isolation" },
              { ar: "الحزم + الجلسات وحالاتها", en: "Packets + sessions and their states" },
            ],
            [
              { ar: "الذاكرة", en: "Memory" },
              { ar: "بلا جدول اتصالات", en: "No connection table" },
              { ar: "جدول حالات لكل TCP/UDP", en: "A state table per TCP/UDP flow" },
            ],
            [
              { ar: "قواعد العودة", en: "Return traffic" },
              { ar: "تفتح قواعد واسعة — أبواب خلفية", en: "Broad open rules — backdoors" },
              { ar: "مسموحة تلقائياً لمطابقة الجلسة", en: "Allowed automatically by session match" },
            ],
            [
              { ar: "حزم ACK مزيفة", en: "Forged ACKs" },
              { ar: "قد تمر", en: "May pass" },
              { ar: "تُرفض لغياب الجلسة", en: "Dropped for lack of session" },
            ],
            [
              { ar: "الأداء والكلفة", en: "Performance & cost" },
              { ar: "أسرع وأخف — على كل الموجهات", en: "Faster, lighter — on every router" },
              { ar: "أعلى حملاً — أجهزة مخصصة", en: "Heavier — dedicated appliances" },
            ],
            [
              { ar: "المكان الأمثل", en: "Best placement" },
              { ar: "حجب شبكات معروفة على الحافة", en: "Blocking known networks at the edge" },
              { ar: "بوابات الإنترنت وبين المناطق", en: "Internet gateways and between zones" },
            ],
          ],
        },
        body: {
          ar: "الجيل الحقيقي جاء مع تتبع الحالة (Stateful Inspection): الجدار يبني جدول اتصالات يرى فيه كل جلسة TCP/UDP مع حالتها:\n\n- SYN_SENT → ESTABLISHED → FIN_WAIT → CLOSED لدورة TCP الكاملة\n- المنافذ المؤقتة المفتوحة للأجوبة، مع مهلة زمنية لكل بروتوكول\n\nالميزة الجوهرية: القاعدة تكتب للاتجاه المبادر فقط (اتصالات خارجية من الداخل مسموحة)، والردود تسمح تلقائياً لأنها تطابق حالة في الجدول — لا قواعد عودة واسعة أبداً.\n\n- يرفض حزم ACK مزيفة بلا جلسة مقابلة — الفلتر عديم الحالة كان يمررها\n- يكشف المحاولات الشاذة: SYN نصف مفتوحة (هجوم!) وإعادة تعيين غريبة\n- يفهم بروتوكولات ديناميكية المنافذ (FTP و SIP) عبر ALB/الاستماع للتطبيق\n\nحدوده: يرى الحزم والاتصالات لا التطبيقات — لهذا ولد NGFW.",
          en: "The real leap came with stateful inspection: the firewall builds a connection table tracking every TCP/UDP session and its state:\n\n- SYN_SENT → ESTABLISHED → FIN_WAIT → CLOSED for the full TCP cycle\n- Ephemeral ports opened for replies, with per-protocol timeouts\n\nThe core advantage: rules are written for the initiating direction only (outbound connections allowed), and replies are permitted automatically because they match a table entry — never broad return rules.\n\n- It rejects forged ACKs with no matching session — a stateless filter would pass them\n- It spots anomalies: half-open SYNs (an attack!) and odd resets\n- It understands dynamically-ported protocols (FTP, SIP) via application awareness/ALGs\n\nIts limit: it sees packets and connections, not applications — hence the NGFW was born.",
        },
        tip: {
          ar: "قاعدة ذهبية: إذا وجدت قاعدة جدار ناري مسموحة بالاتجاهين لتفسير الردود — فهذه رائحة تصميم عديم الحالة؛ اعد كتابتها باتجاه مبادر واحد.",
          en: "Golden rule: if you find a firewall rule allowed in both directions to explain replies — that is the smell of stateless design; rewrite it with a single initiating direction.",
        },
      },
      {
        heading: { ar: "التصميم بالمناطق (Zones)", en: "Zone-Based Design" },
        diagram: {
          kind: "topology",
          title: { ar: "مناطق الثقة الأربع عبر جدار ناري واحد", en: "The four trust zones across one firewall" },
          nodes: ["Internet", "FW-الجدار", "DMZ", "INSIDE-داخلي", "MGMT-إدارة"],
          edges: [[0, 1], [1, 2], [1, 3], [1, 4]],
        },
        body: {
          ar: "المنهجية الحديثة تقسم الشبكة إلى مناطق أمنية (Security Zones) حسب مستوى الثقة: الإنترنت (خارج، لا ثقة)، DMZ (ثقة جزئية: خوادم عامة)، الداخلية (ثقة عالية)، الإدارة (أعلى ثقة وأعلى سرية).\n\nالقاعدة الناظمة: السياسات تكتب بين منطقتين (Zone Pair) لا بين عناوين متفرقة — المرور من منطقة إلى أخرى يخضع للفحص، وما داخل المنطقة الواحدة أمرها الداخلي.\n\nعلى Cisco IOS يتحقق هذا عبر Zone-Based Firewall (ZBF):\n\n- تحديد المناطق وربط الواجهات بها\n- policy-map نوع inspect يحدد ما يُسمح ويُراقب بين منطقتين\n- الحركة من منطقة عضو إلى منطقة بلا سياسة ترفض تلقائياً (سلوك آمن افتراضياً)\n\nهذا النموذج يمنحك تماسكاً معمارياً: كل واجهة تنتمي لمنطقة، وكل سياسة نقطة واضحة بين منطقتين — بدل مئات ACL متناثرة على عشرات الواجهات.",
          en: "The modern methodology divides the network into security zones by trust level: Internet (outside, no trust), DMZ (partial trust: public servers), Inside (high trust), Management (highest trust and secrecy).\n\nThe governing rule: policies are written between two zones (zone pairs), not between scattered addresses — traffic crossing zones is inspected, while intra-zone traffic is that zone's own business.\n\nOn Cisco IOS this is implemented via the Zone-Based Firewall (ZBF):\n\n- Define zones and attach interfaces to them\n- A policy-map of type inspect defines what is allowed and watched between two zones\n- Traffic from a member zone to a zone with no policy is dropped implicitly (secure by default)\n\nThis model grants architectural coherence: every interface belongs to a zone, and every policy is a clear point between two zones — instead of hundreds of ACLs scattered across dozens of interfaces.",
        },
        code: {
          lang: "cisco",
          snippet: "! Zone-Based Firewall على IOS\nzone security INSIDE\nzone security INTERNET\n!\nclass-map type inspect match-any WEB-CLASS\n match protocol http\n match protocol https\n match protocol dns\n!\npolicy-map type inspect INSIDE-TO-INTERNET\n class type inspect WEB-CLASS\n  inspect\n class class-default\n  drop log\n!\nzone-pair security IN-TO-OUT source INSIDE destination INTERNET\n service-policy type inspect INSIDE-TO-INTERNET\n!\ninterface GigabitEthernet0/0\n zone-member security INSIDE\ninterface GigabitEthernet0/1\n zone-member security INTERNET",
        },
      },
      {
        heading: { ar: "جيل اليوم: NGFW و TLS Inspection", en: "Today's Generation: NGFW and TLS Inspection" },
        body: {
          ar: "90%+ من مرور الويب اليوم HTTPS — جدار يرى منافذ 443 فقط لا يعرف شيئاً عما يمر فيها. جدار الجيل القادم يضيف طبقات إدراك:\n\n- التعرف على التطبيقات بعمق الحزم (DPI) حتى داخل الأنفاق: يفرق بين YouTube و Facebook و Teams عبر سلوك البروتوكول لا المنفذ\n- هوية المستخدم من الاندماج مع Active Directory — قاعدة: مجموعة المحاسبة تمنع التخزين السحابي\n- IPS مدمج يرصد محاولات الاستغلال لحظياً\n- فحص TLS: فك تشفير المرور بضبط الشهادات (عبر CA داخلي) ليرصد التهديدات — مع اعتبارات الخصوصية والقانون والأداء\n- تصنيف عناوين URL ومكافحة البرمجيات الخبيثة\n\nنقاط القرار عند الشراء: معدل الإنتاجية مع فحص TLS مفعّل، جودة قاعدة التوقيعات، دعم الأتمتة (APIs)، وتكامل مع إدارة مركزية واحدة.",
          en: "Over 90% of web traffic today is HTTPS — a firewall that only sees port 443 knows nothing about what rides it. The next-generation firewall adds layers of awareness:\n\n- Deep packet inspection (DPI) identifying applications even inside tunnels: distinguishing YouTube from Facebook and Teams via protocol behavior, not port\n- User identity integrated with Active Directory — a rule: the accounting group is denied cloud storage\n- Integrated IPS catching exploitation attempts live\n- TLS inspection: decrypting traffic via a configured internal CA to see threats — with privacy, legal, and performance considerations\n- URL categorization and anti-malware\n\nBuying decision points: throughput with TLS inspection enabled, signature feed quality, automation support (APIs), and single-pane management integration.",
        },
      },
    ],
    keyPoints: [
      { ar: "عديم الحالة يقيّم الحزمة معزولة — سريع لكن يفتح ثغرات لقواعد العودة", en: "Stateless evaluates packets in isolation — fast but opens holes via return rules" },
      { ar: "ذو الحالة يتذكر الجلسات: القواعد للاتجاه المبادر والردود تلقائية", en: "Stateful remembers sessions: rules for the initiating direction, replies automatic" },
      { ar: "المناطق تنظم الثقة: سياسة بين منطقتين بدل مئات ACL المتناثرة", en: "Zones organize trust: one policy between two zones instead of scattered ACLs" },
      { ar: "ZBF على IOS: الحركة بين مناطق بلا سياسة ترفض افتراضياً", en: "IOS ZBF: traffic between zones without a policy is denied by default" },
      { ar: "NGFW يضيف التطبيق والهوية و IPS وفحص TLS فوق تتبع الحالة", en: "NGFW adds application, identity, IPS, and TLS inspection atop state tracking" },
    ],
    commands: [
      { cmd: "show access-lists 110", desc: { ar: "عرض قواعد ACL وعدادات مطابقة كل سطر", en: "Show ACL rules with per-line match counters" } },
      { cmd: "show policy-map type inspect zone-pair", desc: { ar: "عرض سياسات ZBF النشطة وإحصاءاتها", en: "Show active ZBF policies and their statistics" } },
      { cmd: "show conn", desc: { ar: "جدول الاتصالات النشطة على جدار (ASA/FTD) — قلب المراقبة", en: "The active connection table on a firewall (ASA/FTD) — the monitoring core" } },
      { cmd: "access-list 110 remark BLOCK-FROM-VPN", desc: { ar: "إضافة تعليق توثيقي لقاعدة ACL — عادة احترافية", en: "Add a documentation remark to an ACL rule — a professional habit" } },
    ],
    quiz: [
      {
        q: { ar: "جدار ذو حالة، القاعدة تسمح بالاتصالات المبدأة من الداخل فقط. حزمة TCP بأعلام ACK و PSH تصل من الخارج لا تقابلها جلسة في جدول الحالات. ماذا يفعل الجدار؟", en: "A stateful firewall allows only internally initiated connections. A TCP packet with ACK/PSH flags arrives from outside with no matching session in the state table. What does the firewall do?" },
        options: [
          { ar: "يسمح بها لأن ACK يعني اتصالاً قائماً", en: "Allows it because ACK implies an existing connection" },
          { ar: "يرفضها — الحزمة لا تطابق أي جلسة معروفة", en: "Drops it — the packet matches no known session" },
          { ar: "يحولها إلى DMZ للفحص", en: "Redirects it to the DMZ for inspection" },
          { ar: "يسأل الخادم الداخلي أولاً", en: "Asks the internal server first" },
        ],
        correct: 1,
        explain: { ar: "هذه هي قوة تتبع الحالة: ردود حقيقية فقط (جلسة مفتوحة مطابقة) هي التي تمر. ACK مزيف بلا جلسة = حزمة يتيمة ترفض — بينما الفلتر عديم الحالة كان قد فتح لها باباً بقواعد العودة.", en: "This is the power of state tracking: only genuine replies (matching an open session) pass. A forged ACK with no session is an orphan packet dropped — whereas a stateless filter would have opened it a door via return rules." },
      },
      {
        q: { ar: "ما الفائدة المعمارية للتصميم بالمناطق (Zones) بدل ACL لكل واجهة؟", en: "What is the architectural benefit of zone-based design over per-interface ACLs?" },
        options: [
          { ar: "سرعة أعلى بمراحل في كل الحالات", en: "Dramatically higher speed in all cases" },
          { ar: "سياسات مركزية بين مستويات ثقة، ورفض افتراضي لما لم يعرَّف — تماسك يسهل تدقيقه", en: "Centralized policies between trust levels with default-deny for the undefined — coherence that is easy to audit" },
          { ar: "إلغاء الحاجة للتشفير", en: "Eliminating the need for encryption" },
          { ar: "دعم IPv6 فقط", en: "IPv6-only support" },
        ],
        correct: 1,
        explain: { ar: "المناطق تحول الأمان لهرمية منطقية: كل واجهة منطقة، وكل عبور سياسة معرفة. الجدار يرفض ما لم يذكر صراحة — قابلي تدقيق أعلى بكثير من شبكة ACL منتشرة.", en: "Zones turn security into a logical hierarchy: every interface is a zone, every crossing a defined policy. The firewall denies the unspecified — far more auditable than an ACL sprawl." },
      },
      {
        q: { ar: "موقع يستخدم HTTPS فقط. لماذا لا يكفي جدار تتبع الحالة التقليدي لسياسة أمنية حديثة؟", en: "A site uses only HTTPS. Why is a traditional stateful firewall insufficient for a modern security policy?" },
        options: [
          { ar: "لأن HTTPS لا يعمل عبر الجدران النارية", en: "Because HTTPS cannot traverse firewalls" },
          { ar: "لأن كل شيء يبدو مرور 443 — لا تمييز للتطبيقات والتهديدات داخل التشفير دون NGFW وفحص TLS", en: "Because everything looks like port 443 — no application or threat visibility inside encryption without NGFW and TLS inspection" },
          { ar: "لأن الجدران لا تدعم TCP", en: "Because firewalls do not support TCP" },
          { ar: "لأن المنافذ تتغير كل يوم", en: "Because ports change daily" },
        ],
        correct: 1,
        explain: { ar: "تتبع الحالة يرى الاتصالات لا المحتوى. سحب بيانات عبر 443 يبدو كمرور عادي — لهذا أضافت NGFW التعرف العميق على التطبيقات وفحص TLS (مع ضبط ثقة الشهادات).", en: "State tracking sees connections, not content. Data exfiltration over 443 looks like normal traffic — hence NGFWs added deep application identification and TLS inspection (with certificate trust setup)." },
      },
      {
        q: { ar: "في Cisco ZBF، مرور من منطقة INSIDE إلى منطقة INTERNET لكن لا توجد zone-pair مع سياسة بينهما. ماذا يحدث؟", en: "In Cisco ZBF, traffic flows from INSIDE to INTERNET but no zone-pair with a policy exists between them. What happens?" },
        options: [
          { ar: "يمر بحرية", en: "Passes freely" },
          { ar: "يرفض تلقائياً — السياسة الافتراضية بين المناطق هي الرفض", en: "Dropped automatically — the default policy between zones is deny" },
          { ar: "يُوجه إلى DMZ", en: "Routed to the DMZ" },
          { ar: "يعتمد على ACL الواجهة", en: "Depends on the interface ACL" },
        ],
        correct: 1,
        explain: { ar: "فلسفة ZBF: المرور بين المناطق يرفض ما لم تعرَّف له سياسة صريحة (fail-closed) — عكس التفكير القديم بالسماح ثم الاستثناءات، وهذا أأمن تصميمياً.", en: "The ZBF philosophy: inter-zone traffic is denied unless explicitly given a policy (fail-closed) — the opposite of the old allow-then-exception mindset, and safer by design." },
      },
    ],
  },
  {
    id: "l083",
    moduleId: "m09",
    order: 3,
    level: "advanced",
    title: { ar: "أنظمة كشف ومنع الاختراق IDS/IPS", en: "Intrusion Detection and Prevention: IDS/IPS" },
    summary: {
      ar: "الكشف بالتوقيع مقابل الشذوذ، الفرق العملي بين IDS و IPS وأوضاع الفشل، التموضع في المسار، وتشريح قواعد Snort/Suricata.",
      en: "Signature vs anomaly detection, the practical IDS vs IPS difference and failure modes, in-path placement, and Snort/Suricata rule anatomy.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "لماذا الكشف إذا كان عندنا منع؟", en: "Why Detect If We Already Prevent?" },
        body: {
          ar: "الجدار الناري يجيب: هل هذا المرور مسموح بقواعدي؟ — لكن المسموح قد يكون هجوماً: تصيد عبر HTTPS، استغلال ثغرة في موقعك المشروع، أو برمجيات فدية داخل اتصال شرعي. هنا يظهر IDS/IPS ليطرح سؤالاً أعمق: هل هذا السلوك هجوم؟\n\n- IDS (Intrusion Detection System): يراقب وينبه — عيون لا أيدٍ\n- IPS (Intrusion Prevention System): يراقب ويمنع في نفس اللحظة — عيون وأيدٍ\n\nالتكامل النموذجي الحديث: NGFW يدمج IPS في جداره، بينما تبقى أجهزة/برمجيات IDS مخصصة للرصد العميق والتحليل الجنائي.",
          en: "The firewall answers: is this traffic allowed by my rules? — but the allowed can still be an attack: phishing over HTTPS, an exploit in your legitimate site, or ransomware inside a valid connection. Here IDS/IPS appear to ask a deeper question: is this behavior an attack?\n\n- IDS (Intrusion Detection System): watches and alerts — eyes without hands\n- IPS (Intrusion Prevention System): watches and blocks in the same instant — eyes and hands\n\nThe typical modern integration: NGFWs embed IPS in the firewall, while dedicated IDS remains for deep monitoring and forensic analysis.",
        },
      },
      {
        heading: { ar: "كيف يُكتشف الهجوم؟", en: "How Is an Attack Detected?" },
        body: {
          ar: "طريقتان مختلفتان جوهرياً في توليد التنبيهات:\n\nالكشف بالتوقيع (Signature-Based):\n\n- قاعدة تصف بصمة هجوم معروف: حزم بترتيب معين، سلاسل في البيانات، حجم ونمط شاذ\n- ميزة: دقة عالية جداً وقليل الإنذارات الكاذبة للهجمات الموثقة\n- عيب: عمي عن الهجمات الجديدة (Zero-Day) والمتغيرات المعدلة\n\nالكشف بالشذوذ (Anomaly-Based):\n\n- يبني ملفاً سلوكياً طبيعياً (Baseline) للشبكة: معدلات البروتوكولات، أحجام الجلسات، أنماط الاتصال\n- ثم ينبه لكل انحراف ذي دلالة\n- ميزة: يلتقط غير المعروف\n- عيب: صعوبة ضبط الحساسية — إما طوفان إنذارات كاذبة أو تفويت حقيقي\n\nالعملي اليوم: هجين — توقيعات للمعروف، شذوذ وإطارات سلوكية للغريب، مع ذكاء اصطناعي يقلل الضجيج ويجمع التفاصيل المتفرقة في حادث واحد.",
          en: "Two fundamentally different ways to generate alerts:\n\nSignature-based detection:\n\n- A rule describing a known attack's fingerprint: packets in a specific order, strings in the payload, unusual size or pattern\n- Advantage: very high precision with few false alarms for documented attacks\n- Weakness: blind to new attacks (zero-day) and modified variants\n\nAnomaly-based detection:\n\n- It builds a normal behavioral baseline for the network: protocol rates, session sizes, communication patterns\n- Then alerts on meaningful deviation\n- Advantage: catches the unknown\n- Weakness: hard to tune sensitivity — either a flood of false alarms or real misses\n\nToday's practice: hybrid — signatures for the known, anomaly and behavioral models for the strange, with AI reducing noise and clustering scattered events into one incident.",
        },
        tip: {
          ar: "الإنذار الكاذب (False Positive) ليس مزعجاً فقط — يدرّب الفريق على تجاهل التنبيهات، وهذا أخطر من غياب النظام. اضبط وقيس باستمرار.",
          en: "A false positive is not just annoying — it trains the team to ignore alerts, which is more dangerous than having no system. Tune and measure continuously.",
        },
      },
      {
        heading: { ar: "IDS أم IPS؟ السؤال ليس تقنياً بل هندسي", en: "IDS or IPS? An Engineering, Not Technical, Question" },
        table: {
          caption: { ar: "IDS مقابل IPS: قرار هندسي", en: "IDS vs IPS: an engineering decision" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "IDS", en: "IDS" },
            { ar: "IPS", en: "IPS" },
          ],
          rows: [
            [
              { ar: "الموضع", en: "Placement" },
              { ar: "خارج المسار — SPAN أو TAP", en: "Out-of-band — SPAN or TAP" },
              { ar: "في مسار الحزم مباشرة", en: "Inline, in the packet path" },
            ],
            [
              { ar: "القدرة", en: "Capability" },
              { ar: "يراقب وينبّه فقط", en: "Watches and alerts only" },
              { ar: "يسقط ويحاصر الجلسة لحظياً", en: "Drops and contains sessions live" },
            ],
            [
              { ar: "عند الفشل", en: "On failure" },
              { ar: "لا يعطل شيئاً — رصد آمن", en: "Breaks nothing — safe monitoring" },
              { ar: "fail-open يمرر / fail-close يوقف", en: "fail-open passes / fail-close stops" },
            ],
            [
              { ar: "الزمن المضاف", en: "Added latency" },
              { ar: "صفر على المسار", en: "Zero on the path" },
              { ar: "زمن فحص في كل حزمة", en: "Inspection latency per packet" },
            ],
            [
              { ar: "الموضع الأمثل", en: "Best spot" },
              { ar: "الشبكات الداخلية والمناطق التحليلية", en: "Internal networks and analytical zones" },
              { ar: "المحيط ومداخل مراكز البيانات", en: "Perimeter and datacenter entrances" },
            ],
          ],
        },
        body: {
          ar: "الفرق العملي الواحد: هل الجهاز في مسار الحزم (Inline) أم يراقب نسخة منها (Out-of-Band)؟\n\nIPS في المسار:\n\n- كل حزمة تمر عبره: يستطيع الإسقاط وإعادة التعيين ومحاصرة الجلسة لحظياً\n- الثمن: نقطة فشل إضافية — وسلوكه عند الانهيار حاسم: fail-open (يمر المرور إن سقط) أو fail-close (تتوقف الشبكة إن سقط)\n- قرار السلوك فلسفي: أمن أولاً أم توافر أولاً؟ مراكز البيانات المالية تختار غالباً close، والتجارة الإلكترونية تفتح غالباً\n\nIDS خارج المسار:\n\n- يستقبل نسخة من المرور عبر منفذ SPAN/Mirror أو TAP فيزيائي\n- لا يستطيع المنع لكنه لا يعطل شيئاً إن فشل — رصد آمن\n- مثالي للرصد العميق على مناطق حساسة لا ترغب بإضافة زمن إليها\n\nقاعدة الانتشار المعروفة: IPS على المحيط ومراكز البيانات (مواقع القرار)، IDS على الشبكات الداخلية والمناطق التحليلية.",
          en: "The single practical difference: is the device in the packet path (inline) or watching a copy (out-of-band)?\n\nIPS inline:\n\n- Every packet flows through it: it can drop, reset, and contain sessions in real time\n- The price: an extra failure point — and its behavior on crash is decisive: fail-open (traffic passes if it dies) or fail-close (the network stops if it dies)\n- The behavior decision is philosophical: security first or availability first? Financial datacenters often choose close; e-commerce often opens\n\nIDS out-of-band:\n\n- It receives a copy of traffic via a SPAN/mirror port or a physical tap\n- It cannot block but breaks nothing if it fails — safe monitoring\n- Ideal for deep monitoring of sensitive zones where you refuse added latency\n\nThe common deployment rule: IPS at the perimeter and datacenter (decision points), IDS on internal networks and analytical zones.",
        },
      },
      {
        heading: { ar: "التموضع: أين نضع العين؟", en: "Placement: Where to Put the Eye?" },
        diagram: {
          kind: "topology",
          title: { ar: "سلسلة الحافة: راوتر ثم جدار ثم IPS مع مستشعر SPAN داخلي", en: "The edge chain: router, firewall, IPS, plus an internal SPAN sensor" },
          nodes: ["Internet", "Edge-Router", "FW-جدار", "IPS-inline", "LAN-المبدل", "IDS-SPAN"],
          edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        },
        body: {
          ar: "التموضع النموذجي المتدرج في مؤسسة:\n\n- خلف الجدار المحيطي مباشرة: يرى ما نجا من الجدار — الأهم للرصد الخارجي\n- قبل الجدار (الخارج): يرى كل شيء حتى الضجيج — قيمة تحليلية أمنية لكن إنذارات كثيرة\n- داخل مناطق DMZ: مراقبة الخوادم المعرضة\n- بين الشبكات الداخلية (East-West): حيث الحركة الجانبية للمهاجم — الأكثر إهمالاً والأعلى مردوداً اليوم\n\nأدوات النسخ: SPAN على المبدل (نسخة برمجية، بلا تعطيل، قد تسقط حزم عند الحمل العالي) مقابل TAP فيزيائي (نسخة كهربائية دائماً كاملة بلا استثناء، كلفة شراء).\n\nترتيب الأجهزة عند التسلسل له منطق: الراوتر (حافة) ← الجدار الناري ← IPS — لأن IPS يحتاج مروراً منظفاً من الضجيج ليقرأ العميق.",
          en: "The staged typical placement in an enterprise:\n\n- Directly behind the perimeter firewall: sees what survived the firewall — most important for external monitoring\n- Outside the firewall: sees everything including noise — analytical value but many alerts\n- Inside DMZ zones: watching exposed servers\n- Between internal networks (east-west): where the attacker's lateral movement lives — the most neglected and highest-yield spot today\n\nCopy tools: SPAN on the switch (software copy, no disruption, may drop packets under load) versus a physical TAP (always-complete electrical copy, purchase cost).\n\nThe serial order of devices has logic: router (edge) ← firewall ← IPS — because the IPS needs noise-filtered traffic to read deeply.",
        },
      },
      {
        heading: { ar: "قواعد Snort و Suricata: تشريح سطر واحد", en: "Snort and Suricata Rules: One Line, Dissected" },
        body: {
          ar: "Snort (منذ 1998، من مارتن روسش، مملوك ل Cisco) و Suricata (OISF، متعدد الخيوط) يتشاركان صيغة القواعد. مثال حقيقي لرصد محاولة اكتشاف خدمة:\n\nalert tcp $EXTERNAL_NET any -> $HOME_NET 23 (msg:TELNET Attempt; sid:1000001; rev:1;)\n\nتقسيم السطر:\n\n- الإجراء: alert (تنبيه) أو drop (إسقاط — IPS) أو reject (إسقاط + RST)\n- البروتوكول والاتجاه: tcp من أي مصدر خارجي إلى المنفذ 23 داخلياً\n- الرسالة msg: النص الذي يظهر في التنبيه\n- معايير المحتوى: content و pcre لمطابقة سلاسل الهجوم داخل الحزم\n- sid رقم فريد للقاعدة و rev رقم مراجعتها\n\nالمنظومة الحديثة فوق القواعد: ET Open Rulesets مجانية، وتنسيق ملفات متعدد، ومخرجات unified2/JSON تذهب ل SIEM. المنصة المفتوحة الأشهر للإدارة والعرض: Snorby/SELKS الأقدم و Eve/Elastic اليوم.",
          en: "Snort (since 1998, from Martin Roesch, owned by Cisco) and Suricata (OISF, multithreaded) share the rule format. A real example for spotting service discovery:\n\nalert tcp $EXTERNAL_NET any -> $HOME_NET 23 (msg:TELNET Attempt; sid:1000001; rev:1;)\n\nDissecting the line:\n\n- The action: alert, or drop (IPS mode), or reject (drop + RST)\n- Protocol and direction: tcp from any external source to internal port 23\n- The msg: the text shown in the alert\n- Content criteria: content and pcre matching attack strings inside packets\n- sid, the rule's unique ID, and rev, its revision\n\nThe modern stack above the rules: free ET Open Rulesets, multi-file organization, and unified2/JSON outputs feeding a SIEM. The classic open management frontends: Snorby/SELKS, and today Eve/ELK.",
        },
        code: {
          lang: "bash",
          snippet: "# تثبيت وتشغيل Suricata على لينكس\nsudo apt install suricata\nsudo suricata -c /etc/suricata/suricata.yaml -i eth0\n\n# قاعدة مخصصة: تنبيه لكل محاولة SSH من خارج الشبكة\n# /etc/suricata/rules/local.rules:\n# alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (msg:SSH-EXTERNAL-ATTEMPT; sid:990001; rev:1;)\n\n# متابعة التنبيهات الحية\ntail -f /var/log/suricata/fast.log",
        },
      },
    ],
    keyPoints: [
      { ar: "الجدار يسأل: مسموح؟ — IDS/IPS يسأل: هل هذا هجوماً؟", en: "The firewall asks: allowed? — IDS/IPS asks: is this an attack?" },
      { ar: "التوقيع دقيق لكنه أعمى عن الجديد، والشذوذ يلتقط الغريب لكنه صعب الضبط", en: "Signatures are precise but blind to the new; anomaly catches the strange but is hard to tune" },
      { ar: "IPS في المسار يمنع لكنه نقطة فشل — والقرار fail-open أم fail-close فلسفي", en: "Inline IPS blocks but is a failure point — the fail-open vs fail-close choice is philosophical" },
      { ar: "رصد East-West داخل الشبكة هو الأكثر إهمالاً والأعلى مردوداً", en: "East-west monitoring inside the network is the most neglected, highest-yield spot" },
      { ar: "قواعد Snort/Suricata: إجراء + بروتوكول واتجاه + معايير محتوى + sid فريد", en: "Snort/Suricata rules: action + protocol/direction + content criteria + unique sid" },
    ],
    commands: [
      { cmd: "sudo suricata -c /etc/suricata/suricata.yaml -i eth0", desc: { ar: "تشغيل Suricata للمراقبة الحية على واجهة", en: "Run Suricata live monitoring on an interface" } },
      { cmd: "tail -f /var/log/suricata/fast.log", desc: { ar: "متابعة تنبيهات الكشف لحظياً", en: "Follow detection alerts live" } },
      { cmd: "monitor session 1 source vlan 10", desc: { ar: "تكوين SPAN على مبدل Cisco لنسخ المرور إلى مستشعر", en: "Configure SPAN on a Cisco switch to copy traffic to a sensor" } },
      { cmd: "cat /etc/suricata/rules/local.rules", desc: { ar: "عرض القواعد المخصصة المحلية", en: "View local custom rules" } },
    ],
    quiz: [
      {
        q: { ar: "أداة رصد في غرفة تحكم مالية تختار سلوك IPS عند انهياره = fail-close. ما معنى ذلك؟", en: "A financial SOC chooses IPS crash behavior = fail-close. What does that mean?" },
        options: [
          { ar: "يمر المرور بحرية إذا سقط الجهاز", en: "Traffic passes freely if the device fails" },
          { ar: "يتوقف المرور كلياً إذا سقط الجهاز — أولوية الأمان على التوافر", en: "Traffic stops entirely if the device fails — security over availability" },
          { ar: "ينتقل النظام إلى IDS", en: "The system downgrades to IDS" },
          { ar: "يعيد التشغيل تلقائياً فوراً", en: "It reboots automatically immediately" },
        ],
        correct: 1,
        explain: { ar: "fail-close يقفل الباب عند الفشل — مؤسسة تفضل تعطل الخدمة على مرور غير مفحوص. e-commerce عادة تختار fail-open لخسارة البيع الأسوأ من الحادث الأمني.", en: "Fail-close locks the door on failure — an institution preferring an outage over uninspected traffic. E-commerce typically picks fail-open, judging lost sales worse than a security incident." },
      },
      {
        q: { ar: "أي جملة تصف الفرق بين IDS و IPS بدقة؟", en: "Which statement precisely describes the IDS vs IPS difference?" },
        options: [
          { ar: "IDS يشفر المرور و IPS لا", en: "IDS encrypts traffic and IPS does not" },
          { ar: "IDS يراقب نسخة من المرور وينبه، و IPS في المسار فيستطيع المنع الفوري", en: "IDS watches a copy and alerts; IPS sits in-path and can block immediately" },
          { ar: "IDS للأجهزة القديمة فقط", en: "IDS is for old devices only" },
          { ar: "IPS أسرع لأنه لا يفحص المحتوى", en: "IPS is faster because it skips content inspection" },
        ],
        correct: 1,
        explain: { ar: "الموقع في المسار هو الفرق الجوهري: خارج المسار تراقب وتنبه، وفي المسار تقرر وتمنع لحظياً مع تحمل كلفة نقطة الفشل.", en: "In-path position is the essential difference: out-of-band you watch and alert; in-path you decide and block instantly, bearing the failure-point cost." },
      },
      {
        q: { ar: "شبكتك فيها IPS محيطي ممتاز لكن بلا رصد داخلي. ما الخطر الذي تبقى مكشوفاً له؟", en: "Your network has an excellent perimeter IPS but no internal monitoring. What risk remains uncovered?" },
        options: [
          { ar: "هجمات الفيضانات الخارجية", en: "External flood attacks" },
          { ar: "الحركة الجانبية لمهاجم دخل عبر تصيد — المرور الداخلي East-West", en: "Lateral movement of an attacker who entered via phishing — internal east-west traffic" },
          { ar: "مسح المنافذ من الإنترنت", en: "Port scanning from the Internet" },
          { ar: "هجمات DNS الخارجية", en: "External DNS attacks" },
        ],
        correct: 1,
        explain: { ar: "المهاجم الحديث يتخطى المحيط عبر الإنسان (تصيد) ثم يتحرك داخلياً بمرور يبدو مشروعاً — الرصد الداخلي East-West هو ما يكشفه، وهو أضعف حلقة الرصد تقليدياً.", en: "The modern attacker bypasses the perimeter via the human (phishing) then moves internally over legitimate-looking traffic — east-west monitoring is what catches him, traditionally the weakest monitoring link." },
      },
      {
        q: { ar: "في قاعدة Suricata: (msg:SSH-EXTERNAL; sid:990001; rev:2;) — ما وظيفة rev؟", en: "In the Suricata rule: (msg:SSH-EXTERNAL; sid:990001; rev:2;) — what is rev's role?" },
        options: [
          { ar: "سرعة المعالجة المطلوبة", en: "The required processing speed" },
          { ar: "رقم مراجعة القاعدة: يرتفع عند تعديلها ليميز النسخ الجديدة", en: "The rule revision number: raised on edits to distinguish the new version" },
          { ar: "عدد التنبيهات المسموح بها", en: "The allowed alert count" },
          { ar: "أولوية القاعدة من 1 إلى 100", en: "The rule priority from 1 to 100" },
        ],
        correct: 1,
        explain: { ar: "مع sid يعرّف القاعدة فريداً، و rev يميز النسخ: عند تحسين قاعدة يجب رفع rev وإلا اعتبرت الأنظمة النسخة القديمة سارية.", en: "With sid, the rule is uniquely identified; rev distinguishes versions — improving a rule requires raising rev or systems keep the old version active." },
      },
    ],
  },
  {
    id: "l084",
    moduleId: "m09",
    order: 4,
    level: "advanced",
    title: { ar: "الشبكات الخاصة الافتراضية: IPsec بمراحله و WireGuard الحديث", en: "VPNs: IPsec Phases and Modern WireGuard" },
    summary: {
      ar: "مفهوم النفق ومراحل IKE الأولى والثانية ومكونات ESP و SA، وتكوين IPsec على IOS، ثم WireGuard بأكواده الصغيرة.",
      en: "The tunnel concept, IKE phase one and two, ESP and SAs, an IOS IPsec config, then WireGuard with its tiny codebase.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "فكرة النفق: تغليف داخل تغليف", en: "The Tunnel Idea: Encapsulation Inside Encapsulation" },
        body: {
          ar: "VPN (شبكة خاصة افتراضية) تنشئ وصلة آمنة فوق شبكة عامة عبر النفق (Tunneling): حزمة IP كاملة تُغلَّف داخل حزمة أخرى، والتغليف مشفراً وموقَّعاً.\n\nحالتا الاستخدام الكبيرتان:\n\n- موقع إلى موقع (Site-to-Site): يربط فرعين عبر الإنترنت وكأنهما شبكة واحدة — بديل MPLS بجزء من الكلفة\n- الوصول البعيد (Remote Access): موظف من بيته يوصل جهازه بشبكة الشركة\n\nالأهداف الأمنية للنفق: السرية (تشفير)، السلامة (توقيع/ MAC)، المصادقة (أنت فعلاً الطرف المقصود)، ودرجة مقاومة إعادة التشغيل (Anti-Replay).\n\nتقنيات اليوم: IPsec القياسي العريق في الشبكات التقليدية، WireGuard الحديث الأنيق، SSL/TLS VPN للوصول عبر متصفح، و DMVPN/GRE للشبكات الديناميكية.",
          en: "A VPN (virtual private network) creates a secure link over a public network via tunneling: an entire IP packet is encapsulated inside another, with the wrapping encrypted and signed.\n\nThe two big use cases:\n\n- Site-to-site: linking two branches over the Internet as one network — an MPLS alternative at a fraction of the cost\n- Remote access: an employee connecting their device into the corporate network from home\n\nThe tunnel's security goals: confidentiality (encryption), integrity (signature/MAC), authentication (you are truly the intended peer), and anti-replay resistance.\n\nToday's technologies: classic standard IPsec in traditional networks, modern elegant WireGuard, SSL/TLS VPN for browser-based access, and DMVPN/GRE for dynamic topologies.",
        },
      },
      {
        heading: { ar: "IPsec: المكونات قبل المراحل", en: "IPsec: Components Before Phases" },
        body: {
          ar: "IPsec (RFC 4301 وما بعدها) ليس بروتوكولاً واحداً بل منظومة:\n\n- ESP (Encapsulating Security Payload): الحصان العملي — يشفر الحمولة ويوقعها، والمنفذ المنطقي بروتوكول 50\n- AH (Authentication Header): يوقّع الحزمة كاملة بما فيها الترويسات الخارجية — لكنه يتعارض مع NAT فقلّ استخدامه\n- IKE (Internet Key Exchange): بروتوكول التفاوض وتبادل المفاتيح فوق UDP 500 (و 4500 عند عبور NAT)\n- SA (Security Association): الاتفاق الثنائي الموحد: أي خوارزمية وأي مفاتيح وأي مدة — لكل اتجاه SA مستقلة، وتُدار في قاعدة SADB\n\nوضعان للتغليف:\n\n- وضع النقل (Transport): يحمي حمولة حزمة IP نفسها — من مضيف لمضيف\n- وضع النفق (Tunnel): يحمي حزمة IP كاملة داخل حزمة جديدة — المعيار لبوابة إلى بوابة",
          en: "IPsec (RFC 4301 onward) is not one protocol but a system:\n\n- ESP (Encapsulating Security Payload): the workhorse — encrypts and signs the payload; protocol number 50\n- AH (Authentication Header): signs the whole packet including outer headers — but conflicts with NAT, so rarely used now\n- IKE (Internet Key Exchange): the negotiation and key-exchange protocol over UDP 500 (and 4500 through NAT)\n- SA (Security Association): the unified bilateral agreement: which algorithms, which keys, for how long — one SA per direction, managed in the SADB\n\nTwo encapsulation modes:\n\n- Transport mode: protects the payload of the IP packet itself — host-to-host\n- Tunnel mode: protects an entire IP packet inside a new one — the gateway-to-gateway standard",
        },
        tip: {
          ar: "إذا رأيت بروتوكول IP رقم 50 (ESP) في Wireshark عبر منفذ بلا ترويسة TCP/UDP — فهذا نفق IPsec بين بوابتين.",
          en: "If you see IP protocol 50 (ESP) in Wireshark with no TCP/UDP header — that is an IPsec tunnel between two gateways.",
        },
      },
      {
        heading: { ar: "مرحلتا IKE: التفاوض ثم النفق", en: "The Two IKE Phases: Negotiate, Then Tunnel" },
        diagram: {
          kind: "flow",
          title: { ar: "مسار إنشاء نفق IPsec من التفاوض إلى البيانات", en: "The IPsec establishment path from negotiation to data" },
          items: [
            { ar: "المرحلة 1: تفاوض آمن ومصادَق (PSK أو شهادات) يبني قناة IKE", en: "Phase 1: secure authenticated negotiation (PSK or certificates) builds the IKE channel" },
            { ar: "المرحلة 2: فوق القناة الآمنة تُتفاوَض أنفاق البيانات وشبكاتها", en: "Phase 2: data tunnels and their protected networks negotiated over the secure channel" },
            { ar: "المرور المثير للاهتمام يُغلف بـ ESP ويُشفّر", en: "Interesting traffic gets encapsulated in ESP and encrypted" },
            { ar: "بيانات المستخدم تعبر النفق بين البوابتين", en: "User data crosses the tunnel between the two gateways" },
            { ar: "انتهاء عمر SA يعيد التفاوض بمفاتيح جديدة دورياً", en: "SA lifetime expiry renegotiates with fresh keys periodically" },
          ],
        },
        body: {
          ar: "بناء IPsec يحصل على مرحلتين منفصلتين منطقياً:\n\nالمرحلة الأولى (IKE Phase 1 / ISAKMP SA): بناء قناة آمنة للإدارة\n\n- الهدف: تفاوض آمن ومصادَق عليه لإنشاء قناة التفاوض نفسها\n- الوضع الرئيسي (Main Mode): 6 رسائل — هوية محمية (مشفرة)\n- الوضع الهجومي/المتسرع (Aggressive Mode): 3 رسائل أسرع لكن الهوية مكشوفة — مرفوض في المعايير الحديثة\n- المكونات التفاوضية: خوارزمية التشفير والتوقيع، مجموعة Diffie-Hellman، ومدة عمر القناة\n- المصادقة: مفتاح مشترك مسبق (PSK) أو شهادات رقمية\n\nالمرحلة الثانية (IKE Phase 2 / Quick Mode): إنشاء أنفاق البيانات\n\n- تفاوض سريع فوق القناة الآمنة التي بنتها المرحلة الأولى\n- يحدد: SA للبيانات، الخوارزميات، الشبكات المحمية (المرور المثير للاهتمام)، و PFS (سرية أمامية: مفاتيح جديدة عبر DH جديدة لا مشتقة من المرحلة الأولى)\n\nإعادة التفاوض: كل SA عمر محدد (Phase1 عادة 8-24 ساعة و Phase2 ساعة-8 ساعات) فيتجدد الدوران دورياً.",
          en: "Building IPsec happens in two logically separate phases:\n\nPhase one (IKE Phase 1 / ISAKMP SA): building the secure management channel\n\n- Goal: a secure, authenticated negotiation to create the negotiation channel itself\n- Main mode: 6 messages — identity protected (encrypted)\n- Aggressive mode: 3 messages, faster but identity exposed — rejected by modern standards\n- Negotiated components: encryption and hashing algorithms, the Diffie-Hellman group, and the channel's lifetime\n- Authentication: a pre-shared key (PSK) or digital certificates\n\nPhase two (IKE Phase 2 / Quick Mode): building the data tunnels\n\n- Fast negotiation riding the secure channel phase one built\n- It defines: the data SAs, algorithms, the protected networks (interesting traffic), and PFS (forward secrecy: fresh keys via a new DH, not derived from phase one)\n\nRenegotiation: every SA has a lifetime (phase 1 typically 8-24 hours, phase 2 one-to-eight hours), so keys rotate periodically.",
        },
      },
      {
        heading: { ar: "IPsec عملياً على Cisco IOS", en: "IPsec in Practice on Cisco IOS" },
        body: {
          ar: "على موجه Cisco، التكوين يتبع المرحلتين بوضوح — أولاً سياسة ISAKMP والمصادقة (المرحلة 1)، ثم مجموعة التحويل transform-set وخريطة التشفير crypto map التي تحدد المرور المحمي والنظير (المرحلة 2):\n\nنقاط يخطئ فيها المبتدئون كثيراً:\n\n- سياسات ISAKMP والتحويل يجب أن تتطابق بين الطرفين (الخوارزمية و DH group)\n- قائمة المرور المحمية (ACL 130 هنا) يجب أن تكون معكوسة mirror عند الطرف الآخر\n- PSK مع عنوان النظير الخاطئ = فشل مرحلة أولى صامت\n\nالتحقق: show crypto isakmp sa (الحالة QM_IDLE تعني مرحلة أولى قائمة) ثم show crypto ipsec sa لرؤية الأنفاق وعدادات الحزم المكبسة/المفكوكة.",
          en: "On a Cisco router, the config follows the two phases clearly — first the ISAKMP policy and authentication (phase 1), then the transform-set and crypto map defining protected traffic and the peer (phase 2):\n\nPoints where beginners commonly err:\n\n- ISAKMP policies and transforms must match between the peers (algorithm and DH group)\n- The interesting-traffic ACL (ACL 130 here) must be mirrored at the other end\n- A PSK tied to the wrong peer address = a silent phase-one failure\n\nVerification: show crypto isakmp sa (state QM_IDLE means phase one stands), then show crypto ipsec sa to see tunnels and encap/decap packet counters.",
        },
        code: {
          lang: "cisco",
          snippet: "! المرحلة 1: سياسة IKE\ncrypto isakmp policy 10\n encryption aes 256\n hash sha256\n authentication pre-share\n group 14\ncrypto isakmp key S3curePSK! address 203.0.113.2\n!\n! المرحلة 2: التحويل والنفق\ncrypto ipsec transform-set TSET esp-aes 256 esp-sha-hmac\n mode tunnel\n!\naccess-list 130 permit ip 10.1.0.0 0.0.255.255 10.2.0.0 0.0.255.255\n!\ncrypto map CMAP 10 ipsec-isakmp\n set peer 203.0.113.2\n set transform-set TSET\n match address 130\n!\ninterface GigabitEthernet0/1\n crypto map CMAP\n!\nshow crypto isakmp sa\nshow crypto ipsec sa",
        },
      },
      {
        heading: { ar: "WireGuard: المينيمالية المتقدمة", en: "WireGuard: Advanced Minimalism" },
        table: {
          caption: { ar: "IPsec مقابل WireGuard", en: "IPsec vs WireGuard" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "IPsec/IKE", en: "IPsec/IKE" },
            { ar: "WireGuard", en: "WireGuard" },
          ],
          rows: [
            [
              { ar: "قاعدة الكود", en: "Codebase" },
              { ar: "مئات آلاف الأسطر", en: "Hundreds of thousands of lines" },
              { ar: "~4000 سطر قابلة للتدقيق كاملة", en: "~4,000 fully auditable lines" },
            ],
            [
              { ar: "النقل", en: "Transport" },
              { ar: "ESP بروتوكول 50 + IKE UDP 500/4500", en: "ESP protocol 50 + IKE UDP 500/4500" },
              { ar: "UDP 51820 فقط", en: "Just UDP 51820" },
            ],
            [
              { ar: "التفاوض", en: "Negotiation" },
              { ar: "قابل للتهيئة — وله مخاطر هبوط التفاوض", en: "Configurable — with downgrade risks" },
              { ar: "خوارزميات ثابتة — لا هجوم هبوط", en: "Fixed algorithms — no downgrade attack" },
            ],
            [
              { ar: "الهوية", en: "Identity" },
              { ar: "PSK أو شهادات X.509", en: "PSK or X.509 certificates" },
              { ar: "مفاتيح عامة Curve25519 فقط", en: "Curve25519 public keys only" },
            ],
            [
              { ar: "التجوال بين الشبكات", en: "Network roaming" },
              { ar: "مؤلم — النفق مرتبط بالعناوين", en: "Painful — the tunnel is address-bound" },
              { ar: "هيّن — النفق يتبع هوية المفاتيح", en: "Trivial — the tunnel follows key identity" },
            ],
            [
              { ar: "الانتشار الأمثل", en: "Best fit" },
              { ar: "المؤسسات الضخمة والمتطلبات التنظيمية", en: "Large enterprises and regulatory demands" },
              { ar: "الوصول البعيد والشبكات الصغيرة/المتوسطة", en: "Remote access and small/medium networks" },
            ],
          ],
        },
        body: {
          ar: "WireGuard (2020 رسمياً في نواة لينكس) أعاد التفكير من الصفر واكتسب احترام الأمن بفلسفة معاكسة ل IPsec:\n\n- قاعدة كود ~4000 سطر مقابل مئات آلاف ل IPsec/IKE — قابلة للتدقيق الأمني الكامل فعلاً\n- بروتوكول Noise (النمط IK) فوق UDP 51820: مصافحة واحدة قصيرة\n- خيارات ثابتة مثبتة أفضل الممارسات: Curve25519 للتبادل، ChaCha20-Poly1305 للتشفير، BLAKE2s للتجزئة — لا تفاوض يعني لا هجمات تفاوض هبوطاً\n- كل نظير يعرَّف بمفتاحه العام فقط — لا وضع عميل/خادم إجباري: كل جهاز نظير متساوٍ\n- التجوال بين الشبكات هيّن: النفق مبني على هوية المفاتيح لا على العناوين\n\nالإعداد يستغرق دقائق: زوج مفاتيح لكل جهاز، وملف .conf واحد يصف الواجهة والنظراء و IP المسموحة لكل واحد، ثم wg-quick up.\n\nحالتا الاستخدام اليوم: الوصول البعيد الشخصي والشبكات الصغيرة/المتوسطة (مع WireGuard ك mesh)، بينما تبقى IPsec و TLS-VPN في المؤسسات الضخمة حيث المتطلبات التنظيمية والاندماج مع بنى قائمة.",
          en: "WireGuard (officially in the Linux kernel in 2020) rethought everything from scratch and earned security's respect with an anti-IPsec philosophy:\n\n- A ~4000-line codebase versus hundreds of thousands for IPsec/IKE — genuinely fully auditable\n- The Noise protocol (IK pattern) over UDP 51820: one short handshake\n- Fixed, best-practice crypto: Curve25519 for exchange, ChaCha20-Poly1305 for encryption, BLAKE2s for hashing — no negotiation means no downgrade attacks\n- Every peer defined solely by its public key — no forced client/server model: all devices are equal peers\n- Network roaming is trivial: the tunnel rides key identity, not addresses\n\nSetup takes minutes: a key pair per device, one .conf file describing the interface, peers, and each one's allowed IPs, then wg-quick up.\n\nToday's use cases: personal remote access and small/medium networks (including WireGuard meshes), while IPsec and TLS-VPN remain in large enterprises with regulatory demands and legacy integration.",
        },
        code: {
          lang: "bash",
          snippet: "# توليد مفاتيح الطرفين\nwg genkey | tee private.key | wg pubkey > public.key\n\n# /etc/wireguard/wg0.conf على البوابة\n[Interface]\nPrivateKey = <server-private-key>\nAddress = 10.99.0.1/24\nListenPort = 51820\n\n[Peer]\nPublicKey = <client-public-key>\nAllowedIPs = 10.99.0.2/32\n\n# التشغيل والتحقق\nsudo wg-quick up wg0\nsudo wg show",
        },
      },
    ],
    keyPoints: [
      { ar: "النفق يغلف حزمة IP كاملة داخل أخرى مشفرة موقَّعة", en: "A tunnel encapsulates a whole IP packet inside another, encrypted and signed" },
      { ar: "IPsec منظومة: ESP للحمولة و IKE للتفاوض و SA لكل اتجاه", en: "IPsec is a system: ESP for payload, IKE for negotiation, an SA per direction" },
      { ar: "المرحلة 1 تبني قناة التفاوض (6 رسائل Main Mode) والمرحلة 2 تنشئ أنفاق البيانات", en: "Phase 1 builds the negotiation channel (6-message main mode); phase 2 creates data tunnels" },
      { ar: "PSK خاطئ أو ACL غير معكوس = أكثر أسباب فشل IPsec شيوعاً", en: "Wrong PSK or unmirrored ACL = the most common IPsec failures" },
      { ar: "WireGuard: 4000 سطر و Noise و UDP 51820 ومفاتيح عامة فقط — بساطة قابلة للتدقيق", en: "WireGuard: 4000 lines, Noise, UDP 51820, public keys only — auditable simplicity" },
    ],
    commands: [
      { cmd: "show crypto isakmp sa", desc: { ar: "حالة قنوات IKE — QM_IDLE يعني مرحلة أولى سليمة", en: "IKE channel status — QM_IDLE means healthy phase one" } },
      { cmd: "show crypto ipsec sa", desc: { ar: "أنفاق البيانات وعدادات التغليف/الفك", en: "Data tunnels and encaps/decaps counters" } },
      { cmd: "sudo wg-quick up wg0", desc: { ar: "تشغيل واجهة WireGuard من ملف التكوين", en: "Bring up a WireGuard interface from its config" } },
      { cmd: "sudo wg show", desc: { ar: "عرض النظراء ومرورهم وحالات المصافحة", en: "Show peers, their traffic, and handshake states" } },
    ],
    quiz: [
      {
        q: { ar: "ما الغرض الوظيفي من المرحلة الأولى في IPsec (IKE Phase 1)؟", en: "What is the functional purpose of IPsec's IKE Phase 1?" },
        options: [
          { ar: "نقل بيانات المستخدم مشفرة", en: "Carrying encrypted user data" },
          { ar: "بناء قناة آمنة ومصادَقة يُتفاوض فوقها على أنفاق البيانات في المرحلة الثانية", en: "Building a secure authenticated channel over which phase two negotiates data tunnels" },
          { ar: "توزيع شهادات TLS على العملاء", en: "Distributing TLS certificates to clients" },
          { ar: "تحويل المنفذ 50 إلى 500", en: "Converting port 50 to 500" },
        ],
        correct: 1,
        explain: { ar: "المرحلة الأولى تنشئ قناة الإدارة الآمنة (تشفير + مصادقة PSK/شهادات) فقط — أنفاق البيانات الفعلية تُبنى فوقها في المرحلة الثانية عبر Quick Mode.", en: "Phase one only creates the secure management channel (encryption + PSK/certificate authentication) — the actual data tunnels are built on top in phase two via quick mode." },
      },
      {
        q: { ar: "نفق IPsec بين موقعين لا يثبت: المرحلة الأولى فشلت. ما أول ما تتحقق منه؟", en: "An IPsec tunnel between two sites won't establish: phase one fails. What do you check first?" },
        options: [
          { ar: "إصدار متصفح المستخدمين", en: "The users' browser version" },
          { ar: "تطابق سياسات ISAKMP (الخوارزميات و DH group) وصحة PSK وربطه بعنوان النظير", en: "ISAKMP policy match (algorithms, DH group), PSK correctness, and its binding to the peer address" },
          { ar: "حجم جدول ARP", en: "The ARP table size" },
          { ar: "إعدادات NTP", en: "NTP settings" },
        ],
        correct: 1,
        explain: { ar: "فشل المرحلة 1 يعني فشل التفاوض أو المصادقة: خوارزميات غير متطابقة أو PSK خاطئ — تحقق من تطابق السياسات ومفتاح النظير قبل أي شيء آخر.", en: "Phase 1 failure means negotiation or authentication failure: mismatched algorithms or a wrong PSK — verify policy match and the peer key before anything else." },
      },
      {
        q: { ar: "لماذا يعتبر صغر قاعدة كود WireGuard ميزة أمنية وليست تقصيراً؟", en: "Why is WireGuard's small codebase a security feature rather than a shortfall?" },
        options: [
          { ar: "لأن الكود القصير يعمل أسرع دائماً", en: "Because shorter code always runs faster" },
          { ar: "لأنه يجعل التدقيق الأمني الكامل ممكناً عملياً — ~4000 سطر مقابل مئات الآلاف في IPsec", en: "Because it makes a full security audit practically possible — ~4000 lines versus hundreds of thousands in IPsec" },
          { ar: "لأنه يلغي الحاجة للتشفير", en: "Because it removes the need for encryption" },
          { ar: "لأنه يمنع هجمات TCP", en: "Because it prevents TCP attacks" },
        ],
        correct: 1,
        explain: { ar: "الأمان يتحقق بالمراجعة، والمراجعة الشاملة لـ 4000 سطر ممكنة، أما IPsec/IKE فمئات آلاف السطور تجعل الثغرات المختبئة أسهل والتحقق أصعب — ولهذا اختار WireGuard خيارات تشفير ثابتة بدل التفاوض.", en: "Security is proven by review; fully reviewing 4000 lines is feasible, while IPsec/IKE's hundreds of thousands of lines hide bugs more easily — which is why WireGuard also fixed its crypto choices instead of negotiating them." },
      },
      {
        q: { ar: "جهاز يستخدم WireGuard انتقل من Wi-Fi إلى بيانات الجوال. ماذا يحدث للنفق؟", en: "A WireGuard device moves from Wi-Fi to mobile data. What happens to the tunnel?" },
        options: [
          { ar: "يقطع ويعاد بناؤه من الصفر مع مصافحة كاملة", en: "It drops and rebuilds from scratch with a full handshake" },
          { ar: "يستمر — الهوية مبنية على المفاتيح لا على العناوين، فيعيد الإرسال على المسار الجديد", en: "It continues — identity is key-based, not address-based, so it re-transmits on the new path" },
          { ar: "يتحول تلقائياً إلى IPsec", en: "It automatically converts to IPsec" },
          { ar: "يتوقف حتى تفعيل Wi-Fi مرة أخرى", en: "It pauses until Wi-Fi returns" },
        ],
        correct: 1,
        explain: { ar: "النظراء في WireGuard يتواصلون عبر هوية المفتاح العام بزمانيات مصافحة مستمرة (keepalive اختياري)، فتغيير العنوان مجرد مسار جديد للنفق نفسه.", en: "WireGuard peers communicate via public-key identity with persistent handshake timing (optional keepalive), so an address change is merely a new path for the same tunnel." },
      },
    ],
  },
  {
    id: "l085",
    moduleId: "m09",
    order: 5,
    level: "advanced",
    title: { ar: "أمن الشبكات اللاسلكية: من WEP المكسور إلى WPA3", en: "Wireless Security Evolution: From Broken WEP to WPA3" },
    summary: {
      ar: "لماذا فشل WEP، ما أصلح WPA/WPA2 وما ثغرة KRACK، وكيف تغير WPA3 اللعبة عبر SAE وإلزام PMF.",
      en: "Why WEP failed, what WPA/WPA2 fixed and the KRACK flaw, and how WPA3 changes the game via SAE and mandatory PMF.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "لماذا اللاسلكي ساحة أصعب؟", en: "Why Wireless Is a Harder Battlefield" },
        table: {
          caption: { ar: "أجيال أمن Wi-Fi الأربعة: من WEP المكسور إلى WPA3", en: "The four Wi-Fi security generations: from broken WEP to WPA3" },
          headers: [
            { ar: "الجيل", en: "Generation" },
            { ar: "السنة", en: "Year" },
            { ar: "التشفير والمصادقة", en: "Cipher & auth" },
            { ar: "حالته اليوم", en: "Status today" },
          ],
          rows: [
            [
              { ar: "WEP", en: "WEP" },
              { ar: "1999", en: "1999" },
              { ar: "RC4 بمفتاح ثابت و IV بطول 24 بت", en: "RC4, static key, 24-bit IV" },
              { ar: "مكسور بالكامل — ممنوع استخدامه", en: "Fully broken — forbidden to use" },
            ],
            [
              { ar: "WPA", en: "WPA" },
              { ar: "2003", en: "2003" },
              { ar: "TKIP فوق RC4 كإصلاح طوارئ", en: "TKIP over RC4 as an emergency fix" },
              { ar: "مهمل — جسر انتقالي", en: "Deprecated — a transitional bridge" },
            ],
            [
              { ar: "WPA2", en: "WPA2" },
              { ar: "2004", en: "2004" },
              { ar: "AES-CCMP ومصافحة رباعية (PSK أو 802.1X)", en: "AES-CCMP, four-way handshake (PSK or 802.1X)" },
              { ar: "الحد الأدنى المقبول — PSK عرضة للقاموس", en: "The accepted minimum — PSK prone to dictionaries" },
            ],
            [
              { ar: "WPA3", en: "WPA3" },
              { ar: "2018", en: "2018" },
              { ar: "SAE + PMF إلزامي + سرية أمامية", en: "SAE + mandatory PMF + forward secrecy" },
              { ar: "المعيار الحالي الموصى به", en: "The recommended current standard" },
            ],
          ],
        },
        body: {
          ar: "الشبكة السلكية تحرس مدخلها الفيزيائي: من يصل للمنفذ يحتاج حضوراً مادياً. اللاسلكي يبث في المحيط كله:\n\n- حدود تغطيته تتجاوز جدران المبنى — سيارة في الشارع ترى شبكتك\n- الوسط مشترك: كل جهاز في نفس الخلية يسمع إطار الآخر\n- لا يمكن حصر المستقبلين فيزيائياً — التشفير هو الخط الوحيد الفعلي\n- هجمات التشويش (Jamming) و deauthentication ممكنة بعتاد رخيص\n\nلهذا كل جيل من معايير Wi-Fi صاحبه جيل من أمن التشفير: WEP ثم WPA ثم WPA2 ثم WPA3 — قصة صعود وخروق تحفظها كي لا تعيدها.",
          en: "A wired network guards a physical entrance: reaching a port requires physical presence. Wireless broadcasts into the surroundings:\n\n- Its coverage spills beyond the building walls — a car on the street sees your network\n- The medium is shared: every device in the cell hears others' frames\n- Receivers cannot be physically contained — encryption is the only real line\n- Jamming and deauthentication attacks run on cheap hardware\n\nHence every Wi-Fi generation came with a security generation: WEP, then WPA, then WPA2, then WPA3 — a rise-and-breach story you memorize so as not to repeat it.",
        },
      },
      {
        heading: { ar: "WEP: درس تاريخي في فشل التصميم", en: "WEP: A Historic Lesson in Design Failure" },
        body: {
          ar: "WEP (Wired Equivalent Privacy، 1999) هدفه كان بسيطاً: تشفير بسياطة RC4 مع مفتاح مشترك ثابت. الفشل كان منظماً:\n\n- مفتاح تشفير واحد ثابت لكل الشبكة — تغييره يدوي وكل الأجهزة معاً\n- متجه التهيئة (IV) بطول 24 بت فقط — يتكرر بعد آلاف الحزم حتماً\n- FMS/PTW أساليب تحليل كسرته بالكامل بعد التقاط ~40 ألف إطار: دقائق على حاسوب حديث\n\nالنتيجة اليوم: أدوات مثل aircrack-ng تكسر WEP في جلسة معمل واحدة — أي شبكة WEP الباقية هي باب مفتوح بإعلان. قيمته الوحيدة المتبقية: أبلغ درس في أن التشفير المنزلي الصنع دون مراجعة خبراء كارثة.",
          en: "WEP (Wired Equivalent Privacy, 1999) aimed simply: easy RC4 encryption with a fixed shared key. The failure was systemic:\n\n- One static key for the whole network — manual rotation for all devices together\n- An initialization vector (IV) only 24 bits long — guaranteed to repeat after thousands of packets\n- FMS/PTW analysis techniques fully broke it after capturing ~40,000 frames: minutes on a modern computer\n\nThe result today: tools like aircrack-ng crack WEP in a single lab session — any remaining WEP network is an openly announced open door. Its only remaining value: the clearest lesson that homemade crypto without expert review is a catastrophe.",
        },
      },
      {
        heading: { ar: "WPA و WPA2: إصلاح كبير وثقب متأخر", en: "WPA and WPA2: A Big Fix and a Late Puncture" },
        body: {
          ar: "WPA (2003) جاء إصلاحاً طوارئاً على نفس العتاد: بروتوكول TKIP الذي أبقى RC4 لكن بمفاتيح لكل حزمة و IV أكبر و MIC للسلامة — جسر انتقالي أوقف النزيف.\n\nWPA2 (2004) هو المعيار الحقيقي: CCMP — تشفير AES-CCMP الحديث (المنفذ في العتاد اللاحق كله):\n\n- وضع Personal (WPA2-PSK): عبارة مرور مشتركة تتحول عبر PBKDF2 إلى مفتاح — كل مستخدمي الشبكة نفسها بنفس هوية المفتاح\n- وضع Enterprise: 802.1X + RADIUS — هوية فردية لكل مستخدم عبر EAP (درس AAA و NAC)\n\nالثقوب التي ظهرت لاحقاً:\n\n- WPS (زر الإقران): رمزه 8 أرقام قابل للكسر في ساعات — عطّله دائماً\n- KRACK (2017): ثغرة في المصافحة الرباعية لإعادة تثبيت المفتاح — أصلحت بترقيات، لكنها أظهرت هشاشة الطبقة\n- نقطة الضعف الجوهرية الباقية في PSK: كلمة مرور ضعيفة = كسر قاموسي دون تواجد في الشبكة أصلاً (التقاط المصافحة + تخمين آلي)",
          en: "WPA (2003) was an emergency fix on the same hardware: the TKIP protocol kept RC4 but with per-packet keys, a larger IV, and a MIC for integrity — a transitional bridge that stopped the bleeding.\n\nWPA2 (2004) is the real standard: CCMP — modern AES-CCMP encryption (hardware-implemented in everything since):\n\n- Personal mode (WPA2-PSK): a shared passphrase turned into a key via PBKDF2 — all users of the network share the same key identity\n- Enterprise mode: 802.1X + RADIUS — individual identity per user via EAP (the AAA and NAC lessons)\n\nLater punctures:\n\n- WPS (the pairing button): its 8-digit code breaks in hours — always disable it\n- KRACK (2017): a flaw in the four-way handshake's key reinstallation — patched, but it exposed the layer's fragility\n- The fundamental remaining PSK weakness: a weak password = offline dictionary cracking without ever being in the network (capture the handshake + automated guessing)",
        },
        tip: {
          ar: "قوة WPA2-PSK مسألة طول لا غموض: 12+ حرفاً عشوائياً = تخمين عملياً مستحيل؛ كلمة قصيرة قابلة للتذكر = ساعات على بطاقة رسوميات.",
          en: "WPA2-PSK strength is length, not obscurity: 12+ random characters = practically uncrackable; a short memorable word = hours on a GPU.",
        },
      },
      {
        heading: { ar: "WPA3: SAE يغير قواعد اللعبة", en: "WPA3: SAE Changes the Rules" },
        body: {
          ar: "WPA3 (2018) لم يضف طبقة تجميل بل استبدل القلب المصادقي في الوضع الشخصي:\n\n- مصافحة الرباعية القديمة في WPA2 تكشف مادة كافية (M1/M2) لهجوم القاموس دون اتصال (Offline)\n- WPA3 يستبدلها ب SAE (Simultaneous Authentication of Equals، من بروتوكول Dragonfly):\n\nالمستخدم والنقطة يشتقان سراً من كلمة المرور فيلتقيان على نقطة موجية سرية — لكن مراقبة الحوار لا تكشف شيئاً قابلاً للتخمين لاحقاً. الهجوم القاموسي أصبح متصلاً فقط: كل تخمين يتطلب تفاعلاً حياً مع النقطة، فتستطيع حجبه والإبلاغ عنه.\n\nمزايا أخرى في WPA3:\n\n- السرية الأمامية للجلسات: حتى لو استخرجت كلمة المرور لاحقاً، الحوار القديم لا يُفك\n- PMF (Protected Management Frames) إلزامي: إطارات الإدارة (منها deauth!) محمية من التزييف\n- مجموعة 192-بت للأجهزة الحساسة (حكومة/مالية)\n- الوضع الانتقالي (WPA3-Personal Transition) لفترة تعايش مع WPA2\n\nفي Enterprise: WPA3-Enterprise يرفع التشفير الإلزامي إلى 128-بت AES مع SHA-384 اختيارياً في المجموعة 192.",
          en: "WPA3 (2018) added no cosmetic layer — it replaced the personal mode's authentication core:\n\n- WPA2's classic four-way handshake exposes enough material (M1/M2) for offline dictionary attacks\n- WPA3 replaces it with SAE (Simultaneous Authentication of Equals, from the Dragonfly protocol):\n\nUser and access point each derive a secret from the password and converge on a hidden secret point — but eavesdropping the exchange reveals nothing guessable later. Dictionary attacks become online-only: every guess requires a live interaction with the AP, so you can rate-limit and alert on it.\n\nFurther WPA3 gains:\n\n- Session forward secrecy: even if the password leaks later, past traffic stays sealed\n- PMF (Protected Management Frames) mandatory: management frames (including deauth!) protected from forgery\n- A 192-bit suite for sensitive deployments (government/finance)\n- A transition mode (WPA3-Personal Transition) for coexistence with WPA2\n\nIn Enterprise: WPA3-Enterprise raises mandatory encryption to 128-bit AES with optional SHA-384 in the 192-bit suite.",
        },
      },
      {
        heading: { ar: "أفضل الممارسات الميدانية", en: "Field Best Practices" },
        body: {
          ar: "قائمة تدقيق لنشر لاسلكي سليم اليوم:\n\n- WPA3-Personal (أو Transitional عند وجود أجهزة قديمة) ولا تقبل WPA2-PSK في الأنظمة الحساسة — و Enterprise 802.1X حيث ممكن\n- كلمة مرور 16+ حرفاً فعلية وغير قابلة للتخمين\n- تعطيل WPS فوراً في كل بيئة\n- شبكة ضيوف معزولة تماماً (VLAN + منع التواصل الداخلي) بلا كلمة مرور مشتركة مع الشبكة الرئيسية\n- PMF مفعلة ولو في وضع Capable عند التعايش\n- مراقبة لاسلكية WIPS للنقاط المزيفة (Evil Twin) وهجمات التشويش\n\nولا تنسَ الجانب الإنساني: إعلان نقطة بنفس اسم شبكتك و عبارة تسجيل أقوى (Evil Twin) يخدع المستخدمين بلا أي كراك تشفيري — التوعية جزء من البنية.",
          en: "A checklist for a sound wireless deployment today:\n\n- WPA3-Personal (or Transition mode with legacy devices), no WPA2-PSK in sensitive systems — and 802.1X Enterprise wherever possible\n- A real 16+ character password that resists guessing\n- Disable WPS immediately in every environment\n- A fully isolated guest network (VLAN + internal communication blocked) with no shared password with the main network\n- PMF enabled, even in Capable mode during coexistence\n- WIPS wireless monitoring for rogue (evil twin) APs and jamming attacks\n\nAnd never forget the human side: an AP announcing your network's name with a stronger signal (evil twin) deceives users with zero cryptanalysis — awareness is part of the infrastructure.",
        },
      },
    ],
    keyPoints: [
      { ar: "اللاسلكي مشترك ومتعدد الحدود فيزيائياً — التشفير هو الخط الأمامي الوحيد", en: "Wireless is physically shared and borderless — encryption is the only front line" },
      { ar: "WEP: IV قصير 24 بت ومفتاح ثابت — مكسور بالكامل ولا عذر لبقائه", en: "WEP: a 24-bit IV and static key — fully broken with no excuse to remain" },
      { ar: "WPA2 مع CCMP/AES صلب، لكن PSK الضعيف قابل للقاموس دون اتصال و WPS و KRACK أضافت ثقوباً", en: "WPA2 with CCMP/AES is solid, but weak PSK enables offline dictionary attacks, with WPS and KRACK adding holes" },
      { ar: "WPA3-SAE يجعل التخمين متصلاً فقط ويضيف سرية أمامية و PMF إلزامياً", en: "WPA3-SAE forces guessing online-only and adds forward secrecy plus mandatory PMF" },
      { ar: "شبكة الضيوف المعزولة و WIPS حماية تنظيمية لا تقل عن التشفير", en: "An isolated guest network and WIPS are organizational protection as vital as encryption" },
    ],
    commands: [
      { cmd: "netsh wlan show profiles", desc: { ar: "عرض الشبكات المحفوظة وتفاصيلها في ويندوز", en: "Show saved networks and their details on Windows" } },
      { cmd: "nmcli -f SSID,SECURITY,SIGNAL dev wifi list", desc: { ar: "عرض الشبكات المجاورة وأنواع حمايتها وقوة إشارتها", en: "List nearby networks with their security types and signal strength" } },
      { cmd: "sudo iw dev wlan0 scan | grep -E \"SSID|capability\"", desc: { ar: "فحص raw لقدرات النقاط المجاورة عبر iw", en: "Raw scan of neighboring AP capabilities via iw" } },
      { cmd: "wpa_cli status", desc: { ar: "حالة الاتصال الحالي وبروتوكول المصادقة المستخدم (SAE/PSK)", en: "Current connection status and auth protocol in use (SAE/PSK)" } },
    ],
    quiz: [
      {
        q: { ar: "ما الجوهر الذي جعل هجمات القاموس على WPA2-PSK تعمل دون تواجد داخل الشبكة؟", en: "What core fact allows WPA2-PSK dictionary attacks to work without being inside the network?" },
        options: [
          { ar: "بث اسم الشبكة SSID مكشوف", en: "The broadcast SSID is exposed" },
          { ar: "مصافحة الرباعية تُلتقط وتُخمَّن آلياً دون تفاعل مع النقطة (هجوم دون اتصال)", en: "The four-way handshake can be captured and guessed offline without interacting with the AP" },
          { ar: "أعلى قوة إشارة تفك الشبكة", en: "The strongest signal cracks the network" },
          { ar: "IV بطول 24 بت فقط", en: "The 24-bit IV" },
        ],
        correct: 1,
        explain: { ar: "التقاط مصافحة واحدة يكفي لجهاز المهاجم تجربة ملايين الكلمات محلياً بلا كلفة تفاعل — وهذا تحديداً ما أبطله SAE في WPA3 بجعل كل تخمين يتطلب رداً حياً من النقطة.", en: "Capturing one handshake lets an attacker try millions of words locally at zero interaction cost — precisely what WPA3's SAE abolished by requiring a live AP response per guess." },
      },
      {
        q: { ar: "ما الفرق الجوهري بين WPA2-PSK و WPA3-Personal في المصادقة؟", en: "What is the fundamental authentication difference between WPA2-PSK and WPA3-Personal?" },
        options: [
          { ar: "WPA3 يستخدم كلمات أقصر أسهل", en: "WPA3 uses shorter, easier passwords" },
          { ar: "WPA2 يشركك مباشرة المفتاح، بينما WPA3 يستخدم SAE: اشتقاق سر متزامن يجعل التخمين متصلاً فقط ويمنح سرية أمامية", en: "WPA2 shares the key directly, while WPA3 uses SAE: synchronized secret derivation making guessing online-only and granting forward secrecy" },
          { ar: "لا فرق — WPA3 مجرد تسمية تسويقية", en: "No difference — WPA3 is merely marketing" },
          { ar: "WPA3 يلغي التشفير لصالح السرعة", en: "WPA3 removes encryption for speed" },
        ],
        correct: 1,
        explain: { ar: "SAE (Dragonfly) يحول المصادقة من تسليم مفتاح مشتق إلى اشتقاق سر متزامن لا يفصح عن نفسه في المراقبة — ويعطي كل جلسة استقلالها السري عن تسريب كلمة المرور مستقبلاً.", en: "SAE (Dragonfly) turns authentication from handing over a derived key into a synchronized secret derivation that reveals nothing under eavesdropping — and gives each session secrecy independence from future password leaks." },
      },
      {
        q: { ar: "هجوم deauthentication: إطارات إدارة مزيفة تطرد مستخدمين من الشبكة. ما الذي يحمي منه في WPA3؟", en: "Deauth attack: forged management frames kick users off the network. What protects against it in WPA3?" },
        options: [
          { ar: "تشيك AES أقوى", en: "A stronger AES check" },
          { ar: "إلزامية PMF: حماية إطارات الإدارة توقيعياً ضد التزييف", en: "Mandatory PMF: management frames signed against forgery" },
          { ar: "تغيير المنفذ الافتراضي", en: "Changing the default port" },
          { ar: "إخفاء SSID", en: "Hiding the SSID" },
        ],
        correct: 1,
        explain: { ar: "PMF (802.11w) يوقّع إطارات الإدارة ك deauth و disassoc فيتجاهلها العميل إن لم تكن من النقطة الحقيقية — كانت اختيارية في WPA2 وأصبحت إلزامية في WPA3.", en: "PMF (802.11w) signs management frames like deauth and disassoc, so clients ignore them unless from the genuine AP — optional in WPA2, mandatory in WPA3." },
      },
      {
        q: { ar: "ما القيمة الأمنية الحقيقية لتعطيل WPS على الراوتر؟", en: "What is the real security value of disabling WPS on a router?" },
        options: [
          { ar: "لا قيمة — WPS محمي جيداً", en: "None — WPS is well protected" },
          { ar: "رمز التحقق ذو 8 خانات قابل للكسل الآلي في ساعات مهما كانت كلمة مرور الشبكة قوية", en: "Its 8-digit verification code breaks in hours via brute force regardless of a strong network password" },
          { ar: "يمنع هجمات الضجيج فقط", en: "It only prevents noise attacks" },
          { ar: "يخفي الشبكة عن الجيران", en: "It hides the network from neighbors" },
        ],
        correct: 1,
        explain: { ar: "ثغرة WPS تفصل كلمة المرور عن رمز الإقران: حتى أقوى PSK تتجاوزها أداة كسر رمز الـ 8 خانات عبر مسار الضعف في التحقق — أول إعدام يفعله المحترف عند أي راوتر.", en: "The WPS flaw decouples the password from the pairing code: even the strongest PSK is bypassed by a tool cracking the 8-digit code via the verification weakness — the first execution professionals perform on any router." },
      },
    ],
  },
  {
    id: "l086",
    moduleId: "m09",
    order: 6,
    level: "advanced",
    title: { ar: "AAA: المصادقة والتفويض والمحاسبة مع RADIUS و TACACS+", en: "AAA: Authentication, Authorization, Accounting with RADIUS and TACACS+" },
    summary: {
      ar: "المركزية كفلسفة إدارة، الفروق الدقيقة بين RADIUS و TACACS+ في البروتوكول والاستخدام، وتكوين AAA على Cisco IOS.",
      en: "Centralization as a management philosophy, the subtle RADIUS vs TACACS+ protocol and usage differences, and AAA configuration on Cisco IOS.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ثلاث وظائف، قلب واحد", en: "Three Functions, One Heart" },
        body: {
          ar: "AAA ليس بروتوكولاً بل إطار عمل من ثلاث وظائف إدارية:\n\n- Authentication (المصادقة): من أنت؟ — التحقق من الهوية (كلمة مرور، شهادة، رمز ثانٍ)\n- Authorization (التفويض): ماذا يحق لك؟ — ما الأوامر والخدمات والموارد المسموحة لهذه الهوية\n- Accounting (المحاسبة): ماذا فعلت؟ — تسجيل كل جلسة وكل أمر للتدقيق\n\nالقيمة القاتلة: المركزية. بدل حسابات محلية متفرقة على 50 جهازاً شبكياً (كل واحد كلمة مرور خاصة وتغييرها يوماً كاملاً)، لديك مصدر هوية واحد:\n\n- تعيين موظف جديد = سطر واحد في السيرفر المركزي\n- فصل موظف = تعطيل حساب واحد يقفل 50 جهازاً فوراً\n- التدقيق الأمني يقرأ سجلاً واحداً منظماً بدل جمع سجلات خمسين جهازاً",
          en: "AAA is not a protocol but a framework of three administrative functions:\n\n- Authentication: who are you? — verifying identity (password, certificate, second factor)\n- Authorization: what are you allowed? — which commands, services, and resources this identity may use\n- Accounting: what did you do? — logging every session and command for audit\n\nThe killer value: centralization. Instead of local accounts scattered across 50 network devices (each with its password, rotation taking a whole day), you have one identity source:\n\n- Onboarding a new engineer = one line on the central server\n- Offboarding an employee = disabling one account that instantly locks 50 devices\n- Security audit reads one organized log instead of collecting fifty device logs",
        },
      },
      {
        heading: { ar: "RADIUS: بروتوكول الوصول للشبكات", en: "RADIUS: The Network Access Protocol" },
        body: {
          ar: "RADIUS (Remote Authentication Dial-In User Service، RFC 2865) وُلد لعصر الاتصال الهاتفي وسيطر اليوم:\n\n- UDP: مصادقة 1812 ومحاسبة 1813 (القديمة 1645/1646)\n- الأمان: سر مشترك (Shared Secret) مع الخادم + MD5 لإخفاء كلمة المرور فقط — بقية الحزمة (المستخدم، الصلاحيات، السمات) نص مكشوف في الشبكة الداخلية\n- يدمج المصادقة والتفويض في رسالة واحدة (Access-Request → Access-Accept/Reject) ويرسل المحاسبة لاحقاً بشكل مستقل\n- البروتوكول الأصلي يمرر أنواعاً عديدة من EAP (EAP-TLS, PEAP) — بروتوكول ناقل شفاف: النقطة لا تفهم EAP بل تنقل فقط — وهذه القوة التي جعلته معيار 802.1X\n- السمات (Attributes): أزواج رقم-قيمة تحمل السياق — مثل Filter-Id لتطبيق ACL على المستخدم الدائر، أو Session-Timeout لمدة الجلسة\n\nالاستخدام المفضل: مصادقة مستخدمي الشبكة — Wi-Fi Enterprise، VPN، و NAC.",
          en: "RADIUS (Remote Authentication Dial-In User Service, RFC 2865) was born for the dial-up era and dominates today:\n\n- UDP: authentication 1812 and accounting 1813 (legacy 1645/1646)\n- Security: a shared secret with the server + MD5 hiding the password only — the rest of the packet (user, permissions, attributes) is plaintext on the internal network\n- It fuses authentication and authorization in one exchange (Access-Request → Access-Accept/Reject), sending accounting separately afterward\n- The protocol transparently carries EAP types (EAP-TLS, PEAP) — a pass-through: the AP does not understand EAP, it merely relays — which is the power that made it the 802.1X standard\n- Attributes: number-value pairs carrying context — like Filter-Id to apply an ACL to the user's session, or Session-Timeout for its duration\n\nPreferred use: authenticating network users — Wi-Fi Enterprise, VPN, and NAC.",
        },
      },
      {
        heading: { ar: "TACACS+: بروتوكول إداريي الأجهزة", en: "TACACS+: The Device Administrators' Protocol" },
        table: {
          caption: { ar: "RADIUS مقابل TACACS+", en: "RADIUS vs TACACS+" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "RADIUS", en: "RADIUS" },
            { ar: "TACACS+", en: "TACACS+" },
          ],
          rows: [
            [
              { ar: "النقل", en: "Transport" },
              { ar: "UDP 1812/1813", en: "UDP 1812/1813" },
              { ar: "TCP 49", en: "TCP 49" },
            ],
            [
              { ar: "التشفير", en: "Encryption" },
              { ar: "كلمة المرور فقط (MD5 + سر مشترك)", en: "Password only (MD5 + shared secret)" },
              { ar: "جسم الحزمة كاملاً", en: "The full packet body" },
            ],
            [
              { ar: "فصل AAA", en: "AAA separation" },
              { ar: "المصادقة والتفويض في رسالة واحدة", en: "Authentication and authorization fused in one message" },
              { ar: "وظائف الثلاث مفصولة تماماً", en: "All three functions fully separated" },
            ],
            [
              { ar: "تفويض الأمر الواحد", en: "Per-command authorization" },
              { ar: "غير مدعوم", en: "Unsupported" },
              { ar: "مدعوم — كل سطر CLI يُفوَّض", en: "Supported — every CLI line authorized" },
            ],
            [
              { ar: "تمرير EAP", en: "EAP passthrough" },
              { ar: "ممتاز — أساس 802.1X", en: "Excellent — the 802.1X backbone" },
              { ar: "ليس مجاله", en: "Not its domain" },
            ],
            [
              { ar: "الاستخدام الأمثل", en: "Best use" },
              { ar: "مستخدمو الشبكة: Wi-Fi و VPN و NAC", en: "Network users: Wi-Fi, VPN, NAC" },
              { ar: "إداريو الأجهزة: SSH للبدلات والموجهات", en: "Device admins: SSH to switches and routers" },
            ],
          ],
        },
        body: {
          ar: "TACACS+ (Terminal Access Controller Access-Control System Plus، RFC 8907، ملكية Cisco) صُمم خصيصاً لإدارة أجهزة الشبكات:\n\n- TCP 49: موثوقية الاتصال والتحكم بالزمن مضمونة من TCP نفسه\n- تشفير جسم الحزمة كاملاً (باستثناء رأس 12 بايت) عبر السر المشترك — كل شيء سري: المستخدم والأوامر والصلاحيات\n- يفصل AAA فعلياً: رسالة START/CONTINUE/REPLY للمصادقة، ثم طلبات تفويض مستقلة، ثم محاسبة مستقلة — مرونة هندسية\n\nالميزة الفارقة الحقيقية: التفويض على مستوى الأمر (Per-Command Authorization). عند كتابة كل سطر في CLI، يرسل الجهاز سؤال تفويض للخادم: هل يحق للمستخدم ali تنفيذ show ip route؟ و show run؟ و reload؟ — تجزئة صلاحيات دقيقة مستحيلة في RADIUS الكلاسيكي.\n\nالاستخدام الأمثل: إدخال المهندسين لأجهزة الشبكة (SSH إلى البدلات والموجهات) مع صلاحيات متدرجة وتدقيق كل أمر.\n\nفي الواقع المعاصر: كثير من المؤسسات تعمل RADIUS للمستخدمين و TACACS+ للإداريين — معاً لا بديلاً عن بعض.",
          en: "TACACS+ (Terminal Access Controller Access-Control System Plus, RFC 8907, Cisco-owned) was designed specifically for network device administration:\n\n- TCP 49: connection reliability and timing control come free from TCP itself\n- Full body encryption (minus a 12-byte header) via the shared secret — everything is secret: user, commands, permissions\n- It truly separates AAA: START/CONTINUE/REPLY messages for authentication, then independent authorization requests, then independent accounting — engineering flexibility\n\nThe real distinguishing feature: per-command authorization. As each CLI line is typed, the device sends an authorization query: may user ali run show ip route? show run? reload? — granular privilege splitting impossible in classic RADIUS.\n\nBest use: engineers logging into network gear (SSH to switches and routers) with graduated privileges and per-command auditing.\n\nIn today's practice: many enterprises run RADIUS for users and TACACS+ for admins — together, not as substitutes.",
        },
        tip: {
          ar: "قاعدة الاختيار العملية: RADIUS للمستخدم النهائي الداخل للشبكة (Wi-Fi/VPN/NAC)، و TACACS+ للإداري الداخل إلى الأجهزة نفسها.",
          en: "The practical selection rule: RADIUS for the end user entering the network (Wi-Fi/VPN/NAC), TACACS+ for the admin entering the devices themselves.",
        },
      },
      {
        heading: { ar: "AAA عملياً على Cisco IOS", en: "AAA in Practice on Cisco IOS" },
        body: {
          ar: "التفعيل يبدأ بـ aaa new-model — من هذه اللحظة لم تعد كلمات المرور المحلية تكفي وحدها بل تدخل منطق القوائم (Method Lists):\n\n- قائمة الطرق: ترتيب المصادر المجرَّبة بالتسلسل: group tacacs+ أولاً، ثم group radius، ثم local كشبكة أمان إذا سقط السيرفر\n- default تنطبق على كل الخطوط، أو قوائم مسماة لكل خط (vty، console) — console بجدر أشد عادة\n\nأوامر التفويض الدقيق: authorization commands 15 tacacs+ تجعل كل أمر مستوى الامتياز 15 يمر عبر السيرفر قبل التنفيذ — جاذبية TACACS+ الكاملة.\n\nوللمحاسبة: accounting commands بصيغة record start-stop يسجل بداية ونهاية كل جلسة مع مستخدمها وماذا نفذ.\n\nلا تنسَ حساب طوارئ محلي موثق وكلمة مروره في خزنة: يوم يسقط سيرفر TACACS+ ومعك وصول console فقط — حساب enable secret المحلي هو طوق النجاة.",
          en: "Activation starts with aaa new-model — from that moment local passwords no longer suffice alone and method-list logic takes over:\n\n- The method list: the sequence of sources tried in order: group tacacs+ first, then group radius, then local as a lifeline if the server dies\n- default applies to all lines, or named lists per line (vty, console) — console usually gets stricter walls\n\nFine-grained authorization: authorization commands 15 tacacs+ routes every privilege-15 command through the server before execution — TACACS+'s full attraction.\n\nFor accounting: accounting commands in record start-stop form logs each session's start and end with its user and actions.\n\nNever skip a documented local emergency account with its password in a vault: the day TACACS+ dies and you hold console access only, the local enable secret account is your lifeline.",
        },
        code: {
          lang: "cisco",
          snippet: "aaa new-model\n!\ntacacs server TAC-SRV\n address ipv4 10.0.20.100\n key T4cacsSh4red!\n!\naaa group server tacacs+ ADMIN-GROUP\n server name TAC-SRV\n!\naaa authentication login VTY-AUTH group ADMIN-GROUP local\naaa authorization commands 15 VTY-AUTHZ group ADMIN-GROUP local\naaa accounting commands 15 VTY-ACCT start-stop group ADMIN-GROUP\n!\nline vty 0 4\n login authentication VTY-AUTH\n accounting commands 15 VTY-ACCT\n!\ntest aaa group tacacs+ admin P@ssw0rd legacy",
        },
      },
    ],
    keyPoints: [
      { ar: "AAA: من أنت (المصادقة) وماذا يحق لك (التفويض) وماذا فعلت (المحاسبة)", en: "AAA: who you are, what you may do, and what you did" },
      { ar: "المركزية تحول إدارة 50 جهازاً من يوم عمل إلى سطر واحد", en: "Centralization turns managing 50 devices from a workday into one line" },
      { ar: "RADIUS: UDP 1812/1813، يشفر كلمة المرور فقط، ويمرر EAP — ملك 802.1X", en: "RADIUS: UDP 1812/1813, encrypts only the password, carries EAP — the 802.1X king" },
      { ar: "TACACS+: TCP 49، يشفر الجسم كله، ويفصل AAA — ويفرد بتفويض كل أمر", en: "TACACS+: TCP 49, encrypts the whole body, separates AAA — and uniquely authorizes every command" },
      { ar: "Method lists مع local كخيار أخير — وطوق نجاة محلي موثق للطوارئ", en: "Method lists with local as the final option — plus a documented local emergency lifeline" },
    ],
    commands: [
      { cmd: "aaa new-model", desc: { ar: "تفعيل إطار AAA على جهاز Cisco", en: "Enable the AAA framework on a Cisco device" } },
      { cmd: "test aaa group tacacs+ admin P@ssw0rd legacy", desc: { ar: "اختبار مصادقة حساب عبر مجموعة TACACS+ دون دخول فعلي", en: "Test an account's authentication through a TACACS+ group without logging in" } },
      { cmd: "show tacacs servers", desc: { ar: "حالة خوادم TACACS+ وحالات اتصالها", en: "TACACS+ server status and connection states" } },
      { cmd: "debug tacacs authentication", desc: { ar: "تشخيص مفصل لمفاوضات TACACS+ (استخدمه بحذر)", en: "Detailed diagnosis of TACACS+ negotiations (use with care)" } },
    ],
    quiz: [
      {
        q: { ar: "مؤسسة تريد أن يستطيع مهندس المستوى الأول تنفيذ show run فقط دون reload أو تغييرات. أي بروتوكول يدعم هذا التصميم مباشرة؟", en: "A company wants a tier-1 engineer to run only show run without reload or changes. Which protocol supports this design directly?" },
        options: [
          { ar: "RADIUS كلاسيكي", en: "Classic RADIUS" },
          { ar: "TACACS+ بتفويض الأمر الواحد (Per-Command Authorization)", en: "TACACS+ with per-command authorization" },
          { ar: "SNMPv3", en: "SNMPv3" },
          { ar: "NTP", en: "NTP" },
        ],
        correct: 1,
        explain: { ar: "TACACS+ يرسل سؤال تفويض مستقلاً عن كل أمر يكتبه المستخدم قبل تنفيذه — تجزئة صلاحيات فرع الأمر مستحيلة في نموذج RADIUS الذي يجيز جلسة كاملة بقرار واحد.", en: "TACACS+ sends an independent authorization question for every command the user types before executing it — sub-command privilege splitting impossible in RADIUS's one-decision-per-session model." },
      },
      {
        q: { ar: "ما الفرق الأمني بين تشفير RADIUS و TACACS+ للمرور بين الجهاز والخادم؟", en: "What is the security difference between RADIUS and TACACS+ encryption of device-to-server traffic?" },
        options: [
          { ar: "كلاهما يشفر كل شيء بالكامل", en: "Both encrypt everything fully" },
          { ar: "RADIUS يحمي كلمة المرور فقط بينما TACACS+ يشفر جسم الحزمة كاملاً (مستخدم وأوامر وصلاحيات)", en: "RADIUS protects only the password while TACACS+ encrypts the full body (user, commands, privileges)" },
          { ar: "TACACS+ لا يشفر شيئاً", en: "TACACS+ encrypts nothing" },
          { ar: "RADIUS يستخدم TCP لضمان السرية", en: "RADIUS uses TCP for confidentiality" },
        ],
        correct: 1,
        explain: { ar: "في RADIUS فقط كلمة المرور تُخفى بـ MD5+السر المشترك والبقية نصية — مقبول داخل شبكة إدارة معزولة. TACACS+ يشفر الجسم كله بالسر المشترك بأسلوب تشفير قابل للتهيئة.", en: "In RADIUS only the password is hidden via MD5+shared secret, the rest is plaintext — acceptable inside an isolated management network. TACACS+ encrypts the entire body with the shared secret using a configurable cipher." },
      },
      {
        q: { ar: "سطر التكوين: aaa authentication login default group tacacs+ local. ماذا يحدث إذا انقطع الاتصال بسيرفر TACACS+؟", en: "The config line: aaa authentication login default group tacacs+ local. What happens if the TACACS+ server becomes unreachable?" },
        options: [
          { ar: "يقفل كل الدخول نهائياً", en: "All login is permanently locked" },
          { ar: "يُجرَّب local التالي في القائمة: قاعدة البيانات المحلية على الجهاز تقبل الدخول", en: "The next method, local, is tried: the device's local database accepts login" },
          { ar: "يتحول الجهاز إلى RADIUS تلقائياً", en: "The device switches to RADIUS automatically" },
          { ar: "يعاد الاتصال مرتين ثم يتوقف الجهاز", en: "It retries twice then the device halts" },
        ],
        correct: 1,
        explain: { ar: "قائمة الطرق (Method List) منطق احتياطي تسلسلي: سقوط TACACS+ يسقط الدخول إلى الحسابات المحلية المعرَّفة بـ username ... — لهذا يعرف المحترفون حساب طوارئ موثقاً دائماً.", en: "The method list is sequential fallback logic: TACACS+ failing drops login to locally defined username ... accounts — which is why professionals always keep a documented emergency account." },
      },
      {
        q: { ar: "لماذا انتصر RADIUS في مصادقة Wi-Fi للمؤسسات (802.1X)؟", en: "Why did RADIUS win enterprise Wi-Fi authentication (802.1X)?" },
        options: [
          { ar: "لأنه أسرع في نقل البيانات", en: "Because it is faster at moving data" },
          { ar: "لأنه يمرر EAP بشفافية (النقطة لا تفهم البروتوكول بل تنقله) ويحتوي سمات كـ Filter-Id و Session-Timeout تتحكم بجلسة المستخدم", en: "Because it transparently relays EAP (the AP need not understand the protocol) and carries attributes like Filter-Id and Session-Timeout controlling the user session" },
          { ar: "لأنه بروتوكول Cisco خاص", en: "Because it is a proprietary Cisco protocol" },
          { ar: "لأنه لا يحتاج سيرفراً", en: "Because it needs no server" },
        ],
        correct: 1,
        explain: { ar: "خاصية النقل الشفاف ل EAP جعلت البنية تظهر أنواعاً متنوعة (TLS، PEAP) دون ترقية النقاط، والسمات منحت سياسات جلسة غنية — معيار 802.11 المرجعي بلا منافس عملي.", en: "The transparent EAP relay let the architecture support varied types (TLS, PEAP) without upgrading APs, and attributes enabled rich session policies — the reference standard with no practical rival." },
      },
    ],
  },
  {
    id: "l087",
    moduleId: "m09",
    order: 7,
    level: "advanced",
    title: { ar: "التحكم في الوصول للشبكة NAC وبروتوكول 802.1X", en: "Network Access Control (NAC) and 802.1X" },
    summary: {
      ar: "مشكلة المنفذ المفتوح وأدوار Supplicant/Authenticator/Server وأنواع EAP وتكوين dot1x على المبدلات وخيارات الأجهزة غير القادرة.",
      en: "The open-port problem, the supplicant/authenticator/server roles, EAP types, dot1x switch configuration, and options for incapable devices.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "المشكلة: منفذ RJ-45 يعني عضوية", en: "The Problem: An RJ-45 Port Means Membership" },
        body: {
          ar: "أي شخص يدخل مبنى ويمد كابلاً في منفذ حائطي يحصل على عضوية كاملة في شبكتك — بلا سؤال. هذا افتراض شبكات الثمانينيات الذي لم يعد مقبولاً.\n\nNAC (Network Access Control) يقلب المعادلة: المنفذ لا يمنح وصولاً بل بوابة تحقيق:\n\n- من المستخدم؟ (هوية ومصادقة)\n- ما الجهاز؟ (شخصي أم مؤسسي، مُدار أم لا)\n- هل هو سليم؟ (تحديثات، مضاد فيروسات — Posture)\n\nقرار الوصول يتشكل من الإجابات: عضوية كاملة، أو شبكة ضيوف معزولة، أو VLAN حجر صحي (Quarantine) للجهاز غير المتوافق حتى يصلحه.\n\nالعمود الفقري التقني لكل هذا: 802.1X — معيار IEEE من 2001 يعمل في الطبقة الثانية قبل أن يحصل الجهاز حتى على فرصة إرسال IP.",
          en: "Anyone entering a building and plugging into a wall port gains full network membership — no questions asked. That is a 1980s network assumption no longer acceptable.\n\nNAC (Network Access Control) flips the equation: the port grants no access, it is an interrogation gate:\n\n- Who is the user? (identity and authentication)\n- What is the device? (personal or corporate, managed or not)\n- Is it healthy? (patched, antivirus — posture)\n\nThe access decision forms from the answers: full membership, an isolated guest network, or a quarantine VLAN for the non-compliant device until it is fixed.\n\nThe technical backbone for all this: 802.1X — an IEEE standard from 2001 operating at layer 2 before the device even gets a chance to send IP.",
        },
      },
      {
        heading: { ar: "أبطال الثلاثة في 802.1X", en: "The Three Actors in 802.1X" },
        diagram: {
          kind: "flow",
          title: { ar: "حوار EAP عبر المبدل إلى خادم RADIUS حتى فتح المنفذ", en: "The EAP dialog through the switch to RADIUS until the port opens" },
          items: [
            { ar: "Supplicant يبدأ EAPOL على الطبقة الثانية — المنفذ مُقفل", en: "The supplicant starts EAPOL at layer 2 — the port locked" },
            { ar: "المبدل (Authenticator) يمرر EAP إلى خادم RADIUS بلا فهمه", en: "The switch (authenticator) relays EAP to RADIUS without understanding it" },
            { ar: "الخادم يتحقق من الهوية (شهادة أو بيانات داخل نفق TLS)", en: "The server verifies identity (certificate or credentials inside a TLS tunnel)" },
            { ar: "Access-Accept يعود مع سياسة الجلسة: VLAN و ACL ومدة", en: "Access-Accept returns with session policy: VLAN, ACL, duration" },
            { ar: "المنفذ يتحول Authorized — يمرر المرور كاملاً", en: "The port turns Authorized — full traffic passes" },
          ],
        },
        body: {
          ar: "المعمارية تعرف ثلاثة أدوار واضحة:\n\n- Supplicant (مقدم الطلب): برنامج على جهاز المستخدم يصارع لإثبات الهوية — مدمج في Windows (خدمة Wired Autoconfig) و macOS و Android\n- Authenticator (المصادِق): المبدل أو نقطة الوصول — البوابة المادية. دوره رجل بريد أمين: يمرر رسائل EAP بين الطرفين ولا يفهمها، ولا يفتح المنفذ إلا بأمر من الخادم\n- Authentication Server (خادم المصادقة): RADIUS (Cisco ISE، Aruba ClearPass، FreeRADIUS) — صاحب القرار الذي يتحقق من الهوية ويرسل نتيجة قبول مع سياسة (VLAN، ACL، مدة جلسة)\n\nالحوار يجري عبر إطارات EAPOL (EAP over LAN) مباشرة على الطبقة الثانية:\n\n- المنفذ يبدأ في حالة Unauthorized: يمرر فقط رسائل EAPOL (وغالباً CDP/DHCP في وضع monitor)\n- بعد نجاح المصادقة يتحول Authorized فيفتح كل المرور\n- EAPOL-Logoff عند انتهاء الجلسة يعيد القفل",
          en: "The architecture defines three clear roles:\n\n- Supplicant: software on the user's device fighting to prove identity — built into Windows (Wired Autoconfig), macOS, and Android\n- Authenticator: the switch or access point — the physical gate. Its role is an honest mailman: relaying EAP messages between the two parties without understanding them, and opening the port only on the server's command\n- Authentication server: RADIUS (Cisco ISE, Aruba ClearPass, FreeRADIUS) — the decision maker verifying identity and returning an accept with policy (VLAN, ACL, session duration)\n\nThe dialog runs over EAPOL (EAP over LAN) frames directly at layer 2:\n\n- The port starts Unauthorized: passing only EAPOL messages (and usually CDP/DHCP in monitor mode)\n- After successful authentication it turns Authorized, opening all traffic\n- EAPOL-Logoff at session end re-locks it",
        },
        tip: {
          ar: "802.1X لا يعطي عنوان IP أصلاً قبل المصادقة — الجهاز لا يتجاوز الطبقة الثانية، وهذا أقوى من أي جدار ناري داخلي لأنه يوقف من الباب نفسه.",
          en: "802.1X does not even grant an IP before authentication — the device never passes layer 2, which is stronger than any internal firewall because it stops at the door itself.",
        },
      },
      {
        heading: { ar: "عائلة EAP: طرق إثبات الهوية", en: "The EAP Family: Ways to Prove Identity" },
        table: {
          caption: { ar: "طرق EAP الشائعة مقارنةً", en: "The common EAP methods compared" },
          headers: [
            { ar: "الطريقة", en: "Method" },
            { ar: "آلية الإثبات", en: "Proof mechanism" },
            { ar: "المتطلبات", en: "Requirements" },
            { ar: "الحكم", en: "Verdict" },
          ],
          rows: [
            [
              { ar: "EAP-TLS", en: "EAP-TLS" },
              { ar: "شهادات رقمية للطرفين", en: "Certificates for both parties" },
              { ar: "بنية PKI كاملة", en: "A full PKI" },
              { ar: "الأقوى — الطريق الذهبي", en: "The strongest — the golden path" },
            ],
            [
              { ar: "PEAP (MSCHAPv2)", en: "PEAP (MSCHAPv2)" },
              { ar: "شهادة خادم فقط + بيانات داخل نفق TLS", en: "Server cert only + credentials inside a TLS tunnel" },
              { ar: "شهادة خادم + التحقق منها لدى العميل", en: "A server cert + client-side validation" },
              { ar: "الأوسع انتشاراً — توازن جيد", en: "Most widespread — a good balance" },
            ],
            [
              { ar: "EAP-TTLS", en: "EAP-TTLS" },
              { ar: "نفق TLS وبروتوكول داخلي مرن", en: "A TLS tunnel with a flexible inner protocol" },
              { ar: "شهادة خادم فقط", en: "Server cert only" },
              { ar: "بديل PEAP بمرونة أكبر", en: "A PEAP alternative with more flexibility" },
            ],
            [
              { ar: "EAP-MD5", en: "EAP-MD5" },
              { ar: "تجزئة MD5 مكشوفة", en: "Exposed MD5 hash" },
              { ar: "لا شيء تقريباً", en: "Almost none" },
              { ar: "قديم وغير آمن — تجنبه", en: "Old and insecure — avoid it" },
            ],
          ],
        },
        body: {
          ar: "EAP إطار عام، وطرقه (Methods) تحدد كيف يجري الدليل:\n\n- EAP-TLS: الطريق الذهبي — شهادات رقمية للطرفين (خادم ومستخدم/جهاز). الأقوى بلا كلمات مرور أصلاً لكنه يتطلب بنية PKI لإدارة الشهادات\n- PEAP (MSCHAPv2): الأوسع انتشاراً — الخادم فقط يقدم شهادة فتُبنى نفقاً TLS داخلية، وفيها تنتقل بيانات المستخدم التقليدية. يوازن الأمان وسهولة التشغيل\n- EAP-TTLS: مشابه ل PEAP بمرونة أكبر في بروتوكول التحقق الداخلي\n- EAP-MD5: قديم مكشوف — تجنبه\n\nشهادة الخادم في PEAP تفرض تحقق العميل منها (الاسم وسلسلة الثقة) — وإلا صار هجوم نقطة مزيفة (Evil Twin) في Wi-Fi سهلاً: نقطة تنتحل SSID وتخدع المستخدم بلا تحقق شهادة.\n\nوبعد نجاح EAP: RADIUS يعيد سمات السياسة (VLAN المصاحبة، عنوان ديناميكي، ACL) في Access-Accept — وهنا يلتقي درس AAA ب NAC.",
          en: "EAP is a general frame, and its methods define how proof proceeds:\n\n- EAP-TLS: the golden path — digital certificates for both parties (server and user/device). The strongest with no passwords at all, but requiring a PKI to manage certificates\n- PEAP (MSCHAPv2): the most widespread — only the server presents a certificate, building an inner TLS tunnel in which the user's traditional credentials travel. It balances security and operational ease\n- EAP-TTLS: similar to PEAP with more flexibility in the inner verification protocol\n- EAP-MD5: old and exposed — avoid it\n\nThe server certificate in PEAP obliges the client to verify it (name and trust chain) — otherwise a Wi-Fi evil twin attack becomes easy: an AP spoofing the SSID deceiving the user with no certificate check.\n\nAfter EAP succeeds: RADIUS returns policy attributes (dynamic VLAN, address, ACL) in the Access-Accept — where the AAA lesson meets NAC.",
        },
      },
      {
        heading: { ar: "802.1X عملياً على المبدل", en: "802.1X in Practice on the Switch" },
        body: {
          ar: "التكوين الأساسي على مبدل Cisco IOS:\n\nنقاط النشر الحرجة:\n\n- hostname خادم RADIUS و shared-secret يجب أن يطابقا سيرفر ISE/FreeRADIUS حرفياً\n- host-mode single-host: جهاز واحد فقط خلف المنفذ — بينما multi-domain يفصل جهاز الحاسب و هاتف IP (VLAN صوت + بيانات) على منفذ واحد\n- guest-vlan يستقبل الأجهزة بلا Supplicant، و critical-vlan (في النفق الأقدم Inaccessible Authentication Bypass) يحفظ الخدمة عند انقطاع RADIUS نفسه\n\nنشر production يستحق أوضاع المراقبة أولاً (Monitor Mode): يسمح بالمرور ويسجل فقط القرارات التي كانت ستحظر — أسبوع من السجلات يمنع كارثة طرد أجهزة طابعات ومنافذ كاملة يوم التفعيل الحقيقي.",
          en: "The basic configuration on a Cisco IOS switch:\n\nCritical deployment points:\n\n- The RADIUS hostname and shared-secret must match the ISE/FreeRADIUS server literally\n- host-mode single-host: only one device behind the port — while multi-domain separates the PC and IP phone (voice + data VLANs) on one port\n- guest-vlan receives devices with no supplicant, and critical-vlan (the older Inaccessible Authentication Bypass) preserves service when RADIUS itself dies\n\nA production rollout deserves monitor mode first: permitting traffic while logging only the decisions that would have blocked — a week of logs prevents the catastrophe of ejecting printers and whole ports on enforcement day.",
        },
        code: {
          lang: "cisco",
          snippet: "aaa new-model\n!\nradius server ISE-SRV\n address ipv4 10.0.20.100\n key R4diusSh4red!\n!\naaa group server radius ISE-GROUP\n server name ISE-SRV\n!\naaa authentication dot1x default group ISE-GROUP\naaa authorization network default group ISE-GROUP\n!\ndot1x system-auth-control\n!\ninterface GigabitEthernet1/0/12\n switchport mode access\n authentication port-control auto\n dot1x pae authenticator\n dot1x host-mode multi-domain\n authentication guest-vlan 77\n authentication event server dead action authorize vlan 99\n!\nshow dot1x all\nshow authentication sessions interface Gi1/0/12",
        },
      },
    ],
    keyPoints: [
      { ar: "NAC يجعل المنفذ بوابة تحقيق: من؟ بأي جهاز؟ وهل هو سليم؟", en: "NAC turns the port into an interrogation gate: who? with what device? and is it healthy?" },
      { ar: "أدوار 802.1X: Supplicant على الجهاز، المصادِق مبدل/AP، والقرار لخادم RADIUS", en: "802.1X roles: supplicant on the device, authenticator switch/AP, decision at RADIUS" },
      { ar: "EAPOL في الطبقة الثانية قبل أي IP — الحجز من الباب نفسه", en: "EAPOL at layer 2 before any IP — containment at the door itself" },
      { ar: "EAP-TLS بشهادات للطرفين أقوى، و PEAP بالتوازن التشغيلي الأوسع", en: "EAP-TLS with both-side certificates is strongest; PEAP is the operational balance" },
      { ar: "multi-domain يفصل الحاسوب و الهاتف، و guest/critical VLAN تحفظ الخدمة في الحواف", en: "multi-domain separates PC and phone; guest/critical VLANs preserve service at the edges" },
    ],
    commands: [
      { cmd: "dot1x system-auth-control", desc: { ar: "التفعيل العام ل 802.1X على المبدل", en: "Globally enable 802.1X on the switch" } },
      { cmd: "show authentication sessions", desc: { ar: "عرض جلسات المصادقة الحالية وحالتها و VLAN الممنوحة", en: "Show current auth sessions, their state, and granted VLAN" } },
      { cmd: "show dot1x all", desc: { ar: "إحصاءات 802.1X لكل منفذ مفعَّل", en: "Per-port 802.1X statistics on enabled ports" } },
      { cmd: "dot1x pae authenticator", desc: { ar: "تعيين دور المصادِق على واجهة محددة", en: "Set the authenticator role on a specific interface" } },
    ],
    quiz: [
      {
        q: { ar: "من يملك قرار فتح المنفذ في معمارية 802.1X؟", en: "Who owns the port-opening decision in the 802.1X architecture?" },
        options: [
          { ar: "ال Supplicant على جهاز المستخدم", en: "The supplicant on the user's device" },
          { ar: "المبدل (Authenticator) بقراره الخاص", en: "The switch (authenticator) on its own judgment" },
          { ar: "خادم RADIUS (Authentication Server) الذي يرسل القبول مع السياسة", en: "The RADIUS server, which returns the accept with policy" },
          { ar: "DHCP Server عبر خيار 82", en: "The DHCP server via option 82" },
        ],
        correct: 2,
        explain: { ar: "المبدل بوابة تنفيذ لا صاحب قرار: يمرر EAP ويقفل حتى يصله Access-Accept من RADIUS مع سمات السياسة (VLAN و ACL) — حينها فقط يفتح.", en: "The switch is an enforcement gate, not the decision maker: it relays EAP and stays closed until an Access-Accept arrives from RADIUS with policy attributes (VLAN, ACL) — only then it opens." },
      },
      {
        q: { ar: "منفذ مفعَّل عليه dot1x host-mode multi-domain. ماذا يتيح ذلك؟", en: "A port runs dot1x host-mode multi-domain. What does that enable?" },
        options: [
          { ar: "عشرات الأجهزة عشوائياً خلف منفذ واحد", en: "Dozens of arbitrary devices behind one port" },
          { ar: "جهاز حاسب واحد في نطاق البيانات و هاتف IP في نطاق الصوت على المنفذ نفسه", en: "One PC in the data domain and one IP phone in the voice domain on the same port" },
          { ar: "مصادقة لاسلكية فقط", en: "Wireless-only authentication" },
          { ar: "تخطي المصادقة للإدارة", en: "Skipping authentication for management" },
        ],
        correct: 1,
        explain: { ar: "multi-domain صُمم لواقع المكاتب: هاتف يتوقف مصادقة MAC (MAB) في نطاق الصوت والحاسوب يكمل 802.1X في نطاق البيانات — كل على VLAN الخاصة وبمنفذ واحد.", en: "multi-domain was designed for office reality: a phone authenticating via MAC (MAB) in the voice domain while the PC completes 802.1X in the data domain — each on its own VLAN, one port." },
      },
      {
        q: { ar: "طابعة قديمة لا تدعم أي Supplicant. كيف يتعامل NAC معها دون فتح المنفذ للجميع؟", en: "An old printer supports no supplicant. How does NAC handle it without opening the port to everyone?" },
        options: [
          { ar: "تعطيل 802.1X على كل المبدل", en: "Disable 802.1X on the whole switch" },
          { ar: "MAB (MAC Authentication Bypass): مصادقة عبر عنوان MAC المسجل مسبقاً مع سياسة مقيدة", en: "MAB (MAC Authentication Bypass): authentication via a pre-registered MAC with a restricted policy" },
          { ar: "إعطاؤها صلاحيات المسؤول", en: "Granting it admin privileges" },
          { ar: "وضعها في VLAN الإدارة مباشرة", en: "Placing it directly in the management VLAN" },
        ],
        correct: 1,
        explain: { ar: "MAB يسجل عنوان MAC للطابعة في قائمة RADIUS المسموحة، فيقبل الجهاز عبر هويته العتادية — مع سياسة ضيقة (VLAN طابعات و ACL مقيدة). ليس مثالياً (MAC قابل للانتحال) لكنه حل الأجهزة الغبية المقبول.", en: "MAB registers the printer's MAC in RADIUS's allowed list, admitting the device via its hardware identity — with a tight policy (printers VLAN, restricted ACL). Not ideal (MACs can be spoofed) but the accepted answer for incapable devices." },
      },
      {
        q: { ar: "لماذا يبدأ النشر الاحترافي ل NAC بوضع المراقبة (Monitor Mode)؟", en: "Why do professional NAC rollouts begin with monitor mode?" },
        options: [
          { ar: "لأنه أسرع في الأداء", en: "Because it performs faster" },
          { ar: "لجمع قرارات كانت ستحظر دون تنفيذها — كشف الأجهزة بلا Supplicant والحالات الشاذة قبل يوم التفعيل الحقيقي", en: "To gather would-be-block decisions without enforcing them — revealing supplicant-less devices and anomalies before enforcement day" },
          { ar: "لأن RADIUS لا يعمل في وضع التنفيذ", en: "Because RADIUS does not work in enforcement mode" },
          { ar: "لتشفير المرور", en: "To encrypt traffic" },
        ],
        correct: 1,
        explain: { ar: "التفعيل الفوري قد يطرد طابعات وأنظمة تحكم صناعية وكاميرات — وضع المراقبة يرسم الخريطة الحقيقية للأجهزة ويخفض مخاطر اليوم الأول من كارثة إلى مجرد خطة.", en: "Immediate enforcement can eject printers, industrial controllers, and cameras — monitor mode maps the real device inventory, downgrading day-one risk from catastrophe to mere planning." },
      },
    ],
  },
  {
    id: "l088",
    moduleId: "m09",
    order: 8,
    level: "advanced",
    title: { ar: "هجمات حجب الخدمة DoS/DDoS والدفاع عن التوافر", en: "DoS/DDoS Attacks and Defending Availability" },
    summary: {
      ar: "تصنيف الهجمات الحجمية والبروتوكولية والتطبيقية، آلية التضخيم والانعكاس، والدفاع المتدرج من CoPP إلى مراكز التنقية.",
      en: "Volumetric, protocol, and application attack classes, the amplification/reflection mechanics, and tiered defense from CoPP to scrubbing centers.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "أرخص هجوم وأغلى دفاع", en: "The Cheapest Attack, the Priciest Defense" },
        body: {
          ar: "هجمات حجب الخدمة (Denial of Service) فريدة في اقتصادها المقلوب: كلفة إطلاقها هزيلة (شبكة botnet مستأجرة بساعات قليلة من دولارات) وكلفة الدفاع تفوقها بمراحل.\n\n- DoS: مصدر واحد يستنزف خدمة أو شبكة\n- DDoS (الموزع): آلاف المصادر — botnets من أجهزة IoT المخترقة وخدمات مخدومة\n\nالهدف كسر ثالث أركان CIA: التوافر (Availability). أشهر الضحايا: مواقع التجارة، البنوك، منصات الألعاب، وحتى البنية التحتية القومية (Dyn 2016 أسقطت Twitter و Netflix عبر هجوم على DNS!).\n\nالمعركة اللامتكافئة: المهاجم يركز قوته في نقطة واحدة، والمدافع عليه حماية كل الخدمات في كل الوقت.",
          en: "Denial of Service attacks are unique in their inverted economics: launching them is dirt cheap (a rented botnet for a few dollars per hour) while defending costs orders of magnitude more.\n\n- DoS: a single source exhausting a service or network\n- DDoS (distributed): thousands of sources — botnets of hacked IoT devices and hired booter services\n\nThe goal is breaking the third pillar of CIA: availability. Famous victims: e-commerce, banks, gaming platforms, even national infrastructure (the 2016 Dyn attack took down Twitter and Netflix by hitting DNS!).\n\nThe unequal battle: the attacker concentrates force on one point; the defender must protect every service at every moment.",
        },
      },
      {
        heading: { ar: "التصنيف الثلاثي للهجمات", en: "The Three Attack Classes" },
        table: {
          caption: { ar: "فئات هجمات حجب الخدمة الثلاث والدفاع المخصص لكل منها", en: "The three DoS classes and the defense each demands" },
          headers: [
            { ar: "الفئة", en: "Class" },
            { ar: "أمثلة", en: "Examples" },
            { ar: "ما تستنزفه", en: "What it exhausts" },
            { ar: "الدفاع الأساسي", en: "Primary defense" },
          ],
          rows: [
            [
              { ar: "حجمية Volumetric", en: "Volumetric" },
              { ar: "UDP flood، تضخيم DNS/NTP/Memcached", en: "UDP flood, DNS/NTP/Memcached amplification" },
              { ar: "عرض النطاق (Mbps/Gbps)", en: "Bandwidth (Mbps/Gbps)" },
              { ar: "uRPF + مراكز التنقية + Anycast", en: "uRPF + scrubbing centers + anycast" },
            ],
            [
              { ar: "بروتوكولية Protocol", en: "Protocol" },
              { ar: "SYN Flood، هجمات التجزئة", en: "SYN flood, fragmentation attacks" },
              { ar: "حالة الاتصالات وجداول الأجهزة", en: "Connection state and device tables" },
              { ar: "SYN Cookies + TCP Intercept + CoPP", en: "SYN cookies + TCP intercept + CoPP" },
            ],
            [
              { ar: "تطبيقية L7", en: "Application (L7)" },
              { ar: "HTTP flood، Slowloris", en: "HTTP flood, Slowloris" },
              { ar: "خيوط الخادم وموارده", en: "Server threads and resources" },
              { ar: "WAF + حدود المعدل + تحديات البوت", en: "WAF + rate limits + bot challenges" },
            ],
          ],
        },
        body: {
          ar: "الهجمات تصنف بطبقة الاستهداف:\n\n1) حجمية (Volumetric) — إغراق عرض النطاق بالجيجابت:\n\n- UDP flood مباشر من مصادر متعددة\n- التضخيم والانعكاس (Amplification/Reflection): المهاجم يزيف عنوان الضحية ويسأل خوادم عامة (DNS — بطلب edns0 حجمه كبير، NTP — monlist التاريخي، Memcached — بمعامل تضخيم مرعب ×10000!) فتغرق الضحية بأجوبة لم تطلبها\n- القياس بالمقارنة: Mbps أو Gbps أو pps\n\n2) بروتوكولية (Protocol) — استنزاف حالة الأجهزة:\n\n- SYN Flood: إرسال طوابير SYN بلا إكمال المصافحة فتمتلئ جداول نصف الاتصالات\n- هجمات التجزئة و ping of death التاريخي\n\n3) تطبيقية (Application Layer / L7) — الأذكى والأخف حجماً:\n\n- HTTP flood: آلاف الطلبات المشروعة الشكل لصفحات ثقيلة (بحث وبحث وبحث)\n- Slowloris: فتح مئات الاتصالات وإرسال ترويسات ببطء قطرة قطرة فتختنق خيوط الخادم بلا فيضان ظاهر\n\nالدفاع يختلف جذرياً حسب الفئة — لا يوجد حل واحد للثلاثة.",
          en: "Attacks are classified by the targeted layer:\n\n1) Volumetric — flooding bandwidth with gigabits:\n\n- Direct UDP floods from many sources\n- Amplification/reflection: the attacker spoofs the victim's address and queries public servers (DNS — with oversized EDNS0 requests, NTP — the historic monlist, Memcached — with a terrifying ×10000 amplification!) which drown the victim in answers it never requested\n- Measured in Mbps, Gbps, or pps\n\n2) Protocol — exhausting device state:\n\n- SYN flood: sending queues of SYNs without completing handshakes, filling half-open connection tables\n- Fragmentation attacks and the historic ping of death\n\n3) Application layer (L7) — the smartest and lightest:\n\n- HTTP flood: thousands of legitimate-looking requests for heavy pages (search, search, and more search)\n- Slowloris: opening hundreds of connections and sending headers drip-slow, suffocating server threads with no visible flood\n\nDefense differs radically per class — there is no single answer to all three.",
        },
        tip: {
          ar: "أي بروتوكول يرد برد أكبر من طلبه وقبلًا حزم UDP قابلة لتزييف المصدر = مادة تضخيم خام. راجع خوادمك العامة: هل ترد بأحجام مضخمة؟",
          en: "Any protocol replying larger than its request, over spoofable UDP, is raw amplification material. Audit your public servers: do they reply with oversized answers?",
        },
      },
      {
        heading: { ar: "الدفاع المحلي: تقوية الخطوط الأمامية", en: "Local Defense: Hardening the Front Lines" },
        body: {
          ar: "ما يمكنك تنفيذه على أجهزتك نفسها قبل أي خدمة خارجية:\n\n- SYN Cookies / TCP Intercept: الموجه يولد أرقام تسلسل مشفرة للمصافحات نصف المفتوحة فلا تحجز حالة — المبدل/الراوتر يستطيع أيضاً proxy المصافحة\n- Rate Limiting على ACLs و uRPF (Unicast Reverse Path Forwarding): إسقاط الحزم التي مصدرها لا يطابق مسار العودة — قاتل الانعكاسات\n- CoPP (Control Plane Policing) على Cisco: حماية معالج الجهاز نفسه — قييد معدل حزم الإدارة (ARP، BGP، SSH) كي لا يُسقط الجهاز بهجوم بسيط على CPU\n- رفع حدود طوابير الخوادم وضبط المهلات: Slowloris يعالج بحدود ترويسة زمنية صارمة\n- التصميم: توزيع DNS على مزود مقاوم أصلاً (Anycast) وCDN أمام مواقعك",
          en: "What you can enforce on your own devices before any external service:\n\n- SYN cookies / TCP intercept: the router generates cryptographic sequence numbers for half-open handshakes so no state is reserved — the device can also proxy the handshake\n- Rate limiting on ACLs and uRPF (Unicast Reverse Path Forwarding): dropping packets whose source does not match the return path — the reflection killer\n- CoPP (Control Plane Policing) on Cisco: protecting the device's own processor — rate-limiting management-plane packets (ARP, BGP, SSH) so a simple CPU attack cannot down the box\n- Raising server queue limits and tightening timeouts: Slowloris is handled with strict per-header time limits\n- Design: putting DNS on an inherently resilient provider (anycast) and CDNs in front of your sites",
        },
        code: {
          lang: "cisco",
          snippet: "! CoPP: حماية المعالج من طوفان الإدارة\nclass-map match-any MGMT-FLOOD\n match protocol arp\n match protocol icmp\n!\npolicy-map COPP-POLICY\n class MGMT-FLOOD\n  police 64000 8000 conform-action transmit exceed-action drop\n!\ncontrol-plane\n service-policy input COPP-POLICY\n!\n! uRPF على واجهة الحافة\ninterface GigabitEthernet0/1\n ip verify unicast source reachable-via rx\n!\nshow policy-map control-plane",
        },
      },
      {
        heading: { ar: "الدفاع الموزع والهندسي", en: "Distributed and Engineering Defense" },
        diagram: {
          kind: "flow",
          title: { ar: "سلسلة الاستجابة المتكاملة للفيضان الموزع", en: "The integrated response chain against a distributed flood" },
          items: [
            { ar: "CDN/WAF في المقدمة يمتص الجزء الأكبر قبل وصوله", en: "CDN/WAF up front absorbs most of the flood before arrival" },
            { ar: "المراقبة المستمرة تكتشف نمط الهجوم مبكراً", en: "Continuous monitoring detects the attack pattern early" },
            { ar: "تجاوز العتبة ينشّط مركز التنقية عبر إعلانات BGP", en: "Crossing the threshold activates the scrubbing center via BGP announcements" },
            { ar: "المركز ينقي الهجوم ويعيد المرور النظيف عبر GRE", en: "The center scrubs the attack and returns clean traffic via GRE" },
            { ar: "عند الضرورة: التدخل لدى مزود الخدمة و RTBH للطوارئ", en: "When needed: upstream ISP action and RTBH for emergencies" },
          ],
        },
        body: {
          ar: "عندما يتجاوز الفيضان نطاقك الترددي (وسيحدث)، المعركة تنتقل إلى جهات فوقك:\n\n- RTBH (Remotely Triggered Black Hole): تعلن مسار الضحية إلى null0 عبر مجتمع BGP (community 666) — تسقط الضحية عن العالم كله لكنك تنقذ البقية. حلاً للتضحية بالطرف\n- مراكز التنقية (Scrubbing Centers): مزودو مثل Cloudflare و Akamai و regional ISPs يستقبلون مرورك (عبر إعلانات BGP تحويل المسار)، ينقون الهجوم، ويعيدون النظيف إليك عبر نفق GRE — الخدمة الشائعة اليوم\n- Anycast: عنوان واحد معلن من عشرات المواقع يمتص الفيضان موزعاً جغرافياً — بنية DNS الكبرى كلها تعمل هكذا\n- للطبقة السابعة: WAF وحدود معدل على مستوى الطلب واختبارات JS/CAPTCHA تفرق البوت عن البشر\n\nسلسلة الدفاع المتكاملة: CDN/WAF أولاً → مراقبة دائمة تكتشف النموذج → تنشيط التنقية عند العتبة → وصول ISP عند اللزوم.",
          en: "When the flood exceeds your bandwidth (and it will), the battle moves upstream:\n\n- RTBH (Remotely Triggered Black Hole): announcing the victim's route to null0 via a BGP community (666) — the victim drops off the world entirely, but you save everyone else. The sacrifice-one-play tactic\n- Scrubbing centers: providers like Cloudflare, Akamai, and regional ISPs receive your traffic (via rerouting BGP announcements), scrub the attack, and return the clean stream over a GRE tunnel — today's common service\n- Anycast: one address announced from dozens of locations absorbing the flood geographically spread — the entire big-DNS world works this way\n- For layer 7: WAFs, per-request rate limits, and JS/CAPTCHA challenges separating bots from humans\n\nThe complete chain: CDN/WAF first → continuous monitoring detecting the pattern → scrubbing activation at the threshold → upstream ISP when necessary.",
        },
      },
      {
        heading: { ar: "ساعة الهجوم: خطة الاستجابة", en: "Attack Hour: The Response Plan" },
        body: {
          ar: "أثناء الهجوم ليس وقت التخطيط بل التنفيذ. الوثيقة الحاسمة: خطة استجابة DDoS جاهزة سلفاً:\n\n- التواصل مع ISP مسبقاً: من نتصل؟ ما المجتمع/الإجراء المتفق عليه؟ (اتصال الطوارئ يجب أن يكون معروفاً قبل الحاجة)\n- التمييز الأولي: هجوم أم حدث طبيعي (منتج فيروسي / إعلان ناجح يضاعف الزيارات؟) — قرار خاطئ هنا يطرد عملاء حقيقيين\n- التقاط عينات مرورية للحفنة الجنائية (pcap مقتطع) أثناء الحدث\n- قرار خفض الخدمات غير الحرجة (Feature Degradation): أوقف ميزات ثقيلة كي يبقى الشراء حياً\n- التواصل الصريح: صفحة حالة + تحديث دوري للعملاء يخفض الذعر\n\nوبعد انتهائه: تحليل ما بعد الحادث — ما الذي أثقل؟ أين تأخر الكشف؟ وما التحسين التالي في السلسلة الدفاعية؟",
          en: "During an attack is execution time, not planning time. The decisive document: a DDoS response plan prepared beforehand:\n\n- Pre-arranged ISP communication: whom to call? what agreed community/action? (the emergency contact must be known before needed)\n- Initial triage: attack or organic event (a viral product / a successful ad multiplying visits?) — a wrong call here ejects real customers\n- Capturing traffic samples for forensics (a sliced pcap) during the event\n- Non-critical service degradation decisions: turn off heavy features so checkout stays alive\n- Honest communication: a status page plus periodic updates lowers panic\n\nAnd after it ends: the post-incident review — what was heaviest? where was detection slow? and the next improvement in the defensive chain?",
        },
      },
    ],
    keyPoints: [
      { ar: "اقتصاد مقلوب: إطلاق رخيص ودفاع باهظ — والتوافر هو الضحية", en: "Inverted economics: cheap to launch, costly to defend — availability is the casualty" },
      { ar: "تضخيم/انعكاس: تزييف المصدر + بروتوكول يرد أضخم = إغراق بحجم مضاعف", en: "Amplification/reflection: source spoofing + a protocol replying larger = multiplied flooding" },
      { ar: "SYN Cookies و uRPF و CoPP تحصن أجهزتك وجهازها العصبي (CPU)", en: "SYN cookies, uRPF, and CoPP harden your devices and their nervous system (CPU)" },
      { ar: "RTBH تضحية بالهدف لإنقاذ البقية؛ ومراكز التنقية الخدمة العملية اليوم", en: "RTBH sacrifices the target to save the rest; scrubbing centers are today's practical service" },
      { ar: "خطة استجابة مكتوبة قبل الحدث — أثناء الهجوم لا مجال للارتجال", en: "A written response plan before the event — no room for improvising mid-attack" },
    ],
    commands: [
      { cmd: "show policy-map control-plane", desc: { ar: "عرض إحصاءات CoPP وعدادات الإسقاط على المعالج", en: "Show CoPP stats and drop counters on the processor" } },
      { cmd: "show interfaces counters | include drop", desc: { ar: "رصد الإسقاطات على الواجهات — أول مؤشر فيضان", en: "Watch interface drops — the first flood indicator" } },
      { cmd: "ip tcp intercept mode watch", desc: { ar: "حماية خوادم TCP من SYN Flood عبر المراقبة", en: "Protect TCP servers from SYN floods via watch mode" } },
      { cmd: "tcpdump -i eth0 -c 10000 -w attack.pcap", desc: { ar: "التقاط عينة مرورية أثناء الحادث للتحليل", en: "Capture a traffic sample during the incident for analysis" } },
    ],
    quiz: [
      {
        q: { ar: "هجوم يستخدم خوادم Memcached العامة: طلب صغير منسوب زوراً لعنوان الضحية يولد رداً هائلاً. ما اسم الآلية؟", en: "An attack uses public Memcached servers: a small request fraudulently attributed to the victim generates a massive reply. What is the mechanism called?" },
        options: [
          { ar: "Slowloris", en: "Slowloris" },
          { ar: "التضخيم والانعكاس (Amplification/Reflection)", en: "Amplification/reflection" },
          { ar: "SYN Flood", en: "SYN flood" },
          { ar: "ARP Spoofing", en: "ARP spoofing" },
        ],
        correct: 1,
        explain: { ar: "الانعكاس: الخادم الوسيط يرسل الرد لعنوان الضحية. والتضخيم: الرد أكبر بكثير من الطلب (Memcached وصل ×10000). الحل الهيكلي: منع تزييف المصدر عبر uRPF لدى مزودي الخدمة + إغلاق الخوادم العامة المكشوفة.", en: "Reflection: the intermediary server sends the reply to the victim. Amplification: the reply far exceeds the request (Memcached reached ×10000). The structural fixes: anti-spoofing via ISP uRPF + closing exposed public servers." },
      },
      {
        q: { ar: "الخادم يستجيب لكن ببطء شديد، السجلات تظهر مئات الاتصالات المفتوحة من عناوين قليلة بلا طلبات مكتملة. أي هجوم هذا وما العلاج المباشر؟", en: "A server responds but very slowly; logs show hundreds of open connections from few addresses with no completed requests. Which attack is this and the direct remedy?" },
        options: [
          { ar: "UDP Flood — العلاج: حجب UDP", en: "UDP flood — remedy: block UDP" },
          { ar: "Slowloris — العلاج: حدود زمنية صارمة للترويسات وإغلاق الاتصالات البطيئة", en: "Slowloris — remedy: strict header time limits and closing slow connections" },
          { ar: "هجوم DNS — العلاج: تغيير خادم DNS", en: "DNS attack — remedy: change the DNS server" },
          { ar: "فيروس — العلاج: مضاد فيروسات", en: "A virus — remedy: antivirus" },
        ],
        correct: 1,
        explain: { ar: "Slowloris هجوم طبقة تطبيقية شبه صامت: يستهلك خيوط الخادم باتصالات شبه مكتملة. الحدود الزمنية للترويسة (مثل client_header_timeout في nginx) وإغلاق الخامل تجعل هجومه بلا جدوى.", en: "Slowloris is a near-silent application-layer attack consuming server threads with half-completed connections. Header time limits (like nginx's client_header_timeout) plus idle closing render it useless." },
      },
      {
        q: { ar: "ما الغرض من RTBH (Remotely Triggered Black Holing)؟", en: "What is the purpose of RTBH (Remotely Triggered Black Holing)?" },
        options: [
          { ar: "تنقية الهجوم وإعادة المرور النظيف للضحية", en: "Scrubbing the attack and returning clean traffic to the victim" },
          { ar: "إسقاط الهدف المهاجم كلياً عن الإنترنت (null0) لإنقاذ بقية الشبكة من الفيضان", en: "Dropping the attacked target off the Internet entirely (null0) to save the rest of the network from the flood" },
          { ar: "زيادة عرض نطاق الضحية", en: "Increasing the victim's bandwidth" },
          { ar: "تشفير المرور بين المواقع", en: "Encrypting inter-site traffic" },
        ],
        correct: 1,
        explain: { ar: "قرار جراحي: إعلان مسار الهدف نحو null0 يمنع الفيضان من دخول شبكتك أصلاً — يضحي بالهدف لإنقاذ البقية، ويستخدم مؤقتاً حتى تنشيط حل أفضل (التنقية).", en: "A surgical decision: announcing the target's route to null0 stops the flood from entering your network at all — sacrificing the target to save the rest, used temporarily until a better remedy (scrubbing) activates." },
      },
      {
        q: { ar: "لماذا تعتبر CoPP دفاعاً جوهرياً على الموجهات والبدلات حتى مع وجود جدران نارية؟", en: "Why is CoPP a core defense on routers and switches even with firewalls present?" },
        options: [
          { ar: "لأنها تشفر حزم BGP", en: "Because it encrypts BGP packets" },
          { ar: "لأنها تحمي المعالج (Control Plane) نفسه — طوفان ARP/ICPP صغير يستطيع إسقاط الجهاز كله بلا لمس أي جدار", en: "Because it protects the processor (control plane) itself — a small ARP/ICMP flood can down the whole box without touching any firewall" },
          { ar: "لأنها تسرع التوجيه", en: "Because it speeds up routing" },
          { ar: "لأنها تلغي الحاجة ل ACL", en: "Because it eliminates the need for ACLs" },
        ],
        correct: 1,
        explain: { ar: "معالج الجهاز مسؤول عن BGP و OSPF و ARP و SSH — فيضان صغير في حزم الإدارة يرفع CPU إلى 100% فيسقط بروتوكولات التوجيه نفسها. CoPP يضع حداً لمعدل هذه الحزم قبل وصولها للمعالج.", en: "The device's processor runs BGP, OSPF, ARP, and SSH — a small management-plane flood pushes CPU to 100% and takes down routing itself. CoPP rate-limits those packets before they reach the processor." },
      },
    ],
  },
  {
    id: "l089",
    moduleId: "m09",
    order: 9,
    level: "advanced",
    title: { ar: "تقطيع الشبكات: من VLAN إلى التقطيع الدقيق", en: "Network Segmentation: From VLANs to Microsegmentation" },
    summary: {
      ar: "لماذا الشبكة المسطحة قنبلة موقوتة، وأنماط التقطيع بالمناطق و DMZ و Private VLANs، والانتقال إلى سياسات لكل حمل عمل.",
      en: "Why the flat network is a time bomb, segmentation patterns with zones, DMZ and private VLANs, and the move to per-workload policy.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "الشبكة المسطحة: كارثة نطاق الانتشار", en: "The Flat Network: A Blast-Radius Catastrophe" },
        body: {
          ar: "شبكة مسطحة (Flat Network) تعني: كل جهاز يصل لكل جهاز. تصور هذه الأرقام في 2000 جهاز على VLAN واحد:\n\n- الديدان (Worms) تنتشر بسرعة البدل نفسها — لا حدود تبطئها\n- المهاجم بعد أول جهاز مصاب يجرب بوابات كل الشبكة بلا عوائق\n- جهاز IoT رخيص مخترق يصبح نقطة قفز لقواعد البيانات\n- البث (Broadcast) نفسه يستهلك من الجميع\n\nمفهوم قياس الخطر: نطاق الانتشار (Blast Radius) — كم من الشبكة يسقط إذا نجح اختراق واحد؟ التقطيع هو أداة تقليص هذا النطاق تحديداً.\n\nكما يخفض عبء التدقيق: معيار بطاقات الدفع PCI-DSS يفرض عزل أنظمة الدفع — التقطيع الصحيح يقلص نطاق التدقيق السنوي من كل الشبكة إلى جزيرة الدفع فقط.",
          en: "A flat network means: every device reaches every device. Picture these numbers across 2,000 devices on one VLAN:\n\n- Worms propagate at switch speed — no boundaries to slow them\n- The attacker, after one infected device, probes the whole network unimpeded\n- A hacked cheap IoT gadget becomes a launchpad to the databases\n- Broadcast itself consumes everyone's resources\n\nThe risk metric: blast radius — how much of the network falls if one intrusion succeeds? Segmentation is precisely the tool for shrinking that radius.\n\nIt also cuts audit burden: the PCI-DSS payment standard mandates isolating payment systems — proper segmentation shrinks the annual audit scope from the whole network to the payment island only.",
        },
      },
      {
        heading: { ar: "أنماط التقطيع الكلاسيكية", en: "Classic Segmentation Patterns" },
        diagram: {
          kind: "topology",
          title: { ar: "منازل الثقة الثلاث عبر الجدار: DMZ والداخلية والإدارة", en: "The three trust houses across the firewall: DMZ, inside, management" },
          nodes: ["Internet", "FW-جدار", "DMZ-خوادم عامة", "INSIDE-مستخدمون", "MGMT-إدارة"],
          edges: [[0, 1], [1, 2], [1, 3], [1, 4]],
        },
        body: {
          ar: "البنية المعيارية القديمة المجربة — منازل الثقة الثلاثة:\n\n- DMZ (منطقة عزلة منزوعة السلاح): خوادم مواجهة للإنترنت (ويب، بريد عام) — منفذ إلى الخارج لكن مقيدة جداً نحو الداخل\n- الداخلية (Inside): المستخدمون ومراكز العمل\n- الإدارة: أقدس منطقة — وصول الأدوات الإدارية فقط (منفصل عن مرور المستخدمين)\n\nكل عبور بين مناطق يمر عبر جدار ناري يطبق سياسة مكتوبة — الحركة الجانبية عبر المناطق تخضع للفحص.\n\nأدوات التقطيع التقليدية في الطبقة الثانية:\n\n- VLANs + شبكات فرعية IP: الوحدة الأساسية للتقسيم\n- Private VLANs داخل VLAN الواحدة: isolated (الأعضاء يرون البوابة فقط) و community (مجموعات ترى بعضها) — مثالية لفصل خوادم DMZ عن بعضها مع بقاء الوصول للزبائن\n- ACLs على SVIs لتقييد مرور inter-VLAN دون جدر كاملة\n- VRF-Lite لعزل جداول التوجيه نفسها: شبكات زبائن/بيئات مستقلة منطقياً على نفس العتاد",
          en: "The proven standard architecture — the three houses of trust:\n\n- DMZ (demilitarized zone): servers facing the Internet (web, public mail) — an outlet outward, yet strictly limited inward\n- Inside: users and work areas\n- Management: the holiest zone — administrative tooling only (separate from user traffic)\n\nEvery inter-zone crossing passes a firewall enforcing a written policy — lateral movement across zones is inspected.\n\nTraditional layer-2 segmentation tools:\n\n- VLANs + IP subnets: the basic unit of division\n- Private VLANs inside one VLAN: isolated (members see only the gateway) and community (groups see each other) — ideal for separating DMZ servers from each other while client access remains\n- ACLs on SVIs restricting inter-VLAN traffic without full firewalls\n- VRF-Lite isolating the routing tables themselves: logically separate customer/environment networks on the same hardware",
        },
        tip: {
          ar: "قاعدة تصميم الحد الأدنى: اكتب مصفوفة التدفقات المسموحة (منطقة → منطقة: أي بروتوكول/منفذ) قبل رسم أي مخطط — التقطيع يتبع سياسة مكتوبة لا العكس.",
          en: "The minimal design rule: write the allowed flows matrix (zone → zone: which protocol/port) before drawing any diagram — segmentation follows written policy, not the reverse.",
        },
      },
      {
        heading: { ar: "التقطيع الدقيق (Microsegmentation)", en: "Microsegmentation" },
        body: {
          ar: "التقطيع التقليدي يقسم الشبكة إلى جزر كبيرة؛ لكن المهاجم داخل الجزيرة نفسها يتحرك بحرية كاملة. التقطيع الدقيق ينزل الحدود إلى مستوى الحمل الواحد (Workload):\n\n- سياسة لكل خادم/حاوية/عملية: خادم الويب يخاطب خادم التطبيق على 8080 فقط — أي شيء آخر مرفوض\n- الهوية تتجاوز عنوان IP: الوسم (Labels/Tags) يتبع الجهاز حيث انتقل — خادم انتقل بين غرف لم يتغير سياسته\n- التركيز شرق-غرب (East-West): المرور الداخلي بين الخوادم — الذي يتجاوز 70% من مرور مراكز البيانات الحديثة\n\nوسائل التنفيذ:\n\n- على مستوى الـ hypervisor (مثل NSX): جدار ناري موزع في كل مضيف افتراضي\n- وكلاء على الأجهزة نفسها (وضع الأجهزة السحابية)\n- الشبكة المعرفة بالبرمجيات SDN بسياسات مركزية (درس SDN القادم)\n\nالكلفة التشغيلية: صياغة السياسات أصعب بكثير — تحتاج خريطة اتصالات حقيقية للخدمات قبل القفل، وإلا كسرت الإنتاج. لذا يبدأ النشر بوضع المراقبة (رصد فقط) لرسم الخريطة ثم تنفيذ تدريجي.",
          en: "Traditional segmentation divides the network into large islands; yet an attacker inside the same island moves freely. Microsegmentation drops the boundary to the individual workload:\n\n- Policy per server/container/process: the web server talks to the app server on 8080 only — everything else denied\n- Identity transcends the IP address: labels/tags follow the machine wherever it moves — a server relocating between rooms keeps its policy\n- East-west focus: internal server-to-server traffic — exceeding 70% of modern datacenter traffic\n\nEnforcement vehicles:\n\n- At the hypervisor (e.g., NSX): a distributed firewall in every virtual host\n- Agents on the machines themselves (the cloud-native model)\n- Software-defined networking with central policy (the upcoming SDN lesson)\n\nThe operational cost: writing policies is far harder — you need a true dependency map of the services before locking down, or production breaks. Hence rollouts begin in monitor mode (observe only) to draw the map, then enforce gradually.",
        },
      },
    ],
    keyPoints: [
      { ar: "الشبكة المسطحة تعطي المهاجم نطاق انتشار كامل — التقطيع يقلصه", en: "A flat network grants the attacker full blast radius — segmentation shrinks it" },
      { ar: "ثلاث منازل: DMZ للخوادم العامة، الداخلية للمستخدمين، الإدارة معزولة تماماً", en: "Three houses: DMZ for public servers, inside for users, management fully isolated" },
      { ar: "Private VLANs تفصل داخل VLAN الواحدة، و VRF يعزل جداول التوجيه نفسها", en: "Private VLANs separate within one VLAN; VRF isolates the routing tables themselves" },
      { ar: "التقطيع الدقيق: سياسة لكل حمل عمل بهوية متسمة — يحمي المرور شرق-غرب", en: "Microsegmentation: policy per workload with tagged identity — protecting east-west traffic" },
      { ar: "ابدأ بوضع المراقبة لرسم خريطة الاتصالات الحقيقية قبل فرض السياسات", en: "Start in monitor mode to map real dependencies before enforcing policy" },
    ],
    commands: [
      { cmd: "vlan 30", desc: { ar: "إنشاء VLAN للتقطيع (مثلاً VLAN خوادم)", en: "Create a VLAN for segmentation (e.g., a servers VLAN)" } },
      { cmd: "show vlan brief", desc: { ar: "عرض VLANs والمنافذ المخصصة لها", en: "Show VLANs and their assigned ports" } },
      { cmd: "switchport protected", desc: { ar: "منع المنافذ المحمية من التواصل فيما بينها على المبدل", en: "Prevent protected ports from talking to each other on the switch" } },
      { cmd: "show interfaces trunk", desc: { ar: "فحص منافذ Trunk التي تعبرها كل VLANs", en: "Inspect trunk ports carrying all VLANs" } },
    ],
    quiz: [
      {
        q: { ar: "ماذا يعني مفهوم نطاق الانتشار (Blast Radius) في سياق التقطيع؟", en: "What does the blast radius concept mean in the segmentation context?" },
        options: [
          { ar: "قوة انفجار مادي للكابلات", en: "The physical explosion force of cables" },
          { ar: "كمية الشبكة التي يسقطها اختراق واحد ناجح — وكلما قلَّ التقطيع زاد النطاق", en: "How much of the network one successful intrusion takes down — the less segmentation, the bigger the radius" },
          { ar: "مدى تغطية Wi-Fi", en: "The Wi-Fi coverage range" },
          { ar: "عدد الجدران النارية", en: "The number of firewalls" },
        ],
        correct: 1,
        explain: { ar: "التقطيع ليس منعاً للاختراق بل احتواء نتيجته: نجاح في جزيرة واحدة لا يعني سقوط القلعة كلها — هذا تحديداً ما يحدد فرق حادث صغير عن كارثة.", en: "Segmentation does not prevent intrusion but contains its outcome: success in one island does not fell the whole castle — precisely what separates a small incident from a catastrophe." },
      },
      {
        q: { ar: "خوادم DMZ على VLAN واحدة: خادم الويب يجب أن يصل لخادم التطبيق لكن الخوادم يجب ألا تصل لبعضها مباشرة. أي أداة تناسبها مباشرة؟", en: "DMZ servers on one VLAN: the web server must reach the app server, but servers must not reach each other directly. Which tool fits directly?" },
        options: [
          { ar: "Private VLANs مع مجتمع/community للخوادم المرتبطة و isolated للبقية", en: "Private VLANs with a community for linked servers and isolated for the rest" },
          { ar: "DHCP Snooping", en: "DHCP snooping" },
          { ar: "STP PortFast", en: "STP PortFast" },
          { ar: "NTP", en: "NTP" },
        ],
        correct: 0,
        explain: { ar: "Private VLAN تصميم لضبط الرؤية داخل VLAN الواحدة: isolated يرى البوابة فقط و community يرى مجموعته — الوسيلة الأنظف لفصل خوادم DMZ دون VLANs متعددة وجدر إضافية.", en: "Private VLANs tune visibility within one VLAN: isolated sees only the gateway, community sees its group — the cleanest way to separate DMZ servers without extra VLANs and firewalls." },
      },
      {
        q: { ar: "لماذا يعتمد التقطيع الدقيق على وسوم الهوية (Labels) بدل عناوين IP فقط؟", en: "Why does microsegmentation rely on identity labels rather than just IP addresses?" },
        options: [
          { ar: "لأن IP لا يعمل في السحابة", en: "Because IP does not work in the cloud" },
          { ar: "لأن العنوان يتغير مع نقل الأحمال و DHCP، بينما الوسم يتبع الحمل فيظل مصدر الحقيقة للسياسة", en: "Because addresses change as workloads move and with DHCP, while the label follows the workload, remaining the policy's source of truth" },
          { ar: "لأن الوسوم أسرع في التوجيه", en: "Because labels route faster" },
          { ar: "لتقليل استهلاك الطاقة", en: "To reduce power consumption" },
        ],
        correct: 1,
        explain: { ar: "في البيئات الديناميكية (سحابة و vMotion و حاويات) عنوان IP مؤقت: السياسة المبنية عليه تنتظر الكارثة. الوسم يلتصق بالحمل نفسه فتبقى السياسة صحيحة حيثما انتقل.", en: "In dynamic environments (cloud, vMotion, containers) the IP is temporary: policy built on it awaits disaster. The label sticks to the workload itself, keeping policy correct wherever it moves." },
      },
    ],
  },
  {
    id: "l090",
    moduleId: "m09",
    order: 10,
    level: "advanced",
    title: { ar: "هندسة الثقة الصفرية Zero Trust", en: "Zero Trust Architecture" },
    summary: {
      ar: "مبدأ لا تثق أحداً و دائماً تحقق، ركائز النموذج ومكوناته (محرك السياسة ونقاط التنفيذ)، والفروق الجوهرية عن VPN التقليدية.",
      en: "The never-trust-always-verify principle, the model's pillars and components (policy engine, enforcement points), and its core differences from traditional VPN.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "انكسار فكرة القلعة", en: "The Collapse of the Castle Idea" },
        body: {
          ar: "نموذج القلعة والخندق (Castle and Moat): جدر محيطية صلبة وثقة كاملة بالداخل. عمل عقوداً حتى كشفت الحقيقة:\n\n- السحابة نقلت مواردك خارج الجدار أصلاً\n- العمل البعيد أدخل المستخدمين من كل مكان\n- التصيد يتخطى الجدار عبر البشر يومياً\n- المهاجم الذي يعبر مرة واحدة أصبح يعمل في بيئة موثوقة بالكامل — حلمٌ له\n\nمسار المصطلح: منتدى Jericho (2004) لاحظ انحلال المحيط، ثم تجربة Google الشهيرة BeyondCorp (بعد عملية Aurora 2009) أعادت بناء وصول الموظفين بلا VPN تقليدية، ثم صاغ NIST الإطار المعياري في SP 800-207 (2020).\n\nالجملة الحاكمة: لا تثق أحداً، تحقق دائماً (Never Trust, Always Verify) — موقعك في الشبكة لم يعد دليلاً على هويتك أو صلاحياتك.",
          en: "The castle-and-moat model: hard perimeter walls, full trust inside. It worked for decades until reality exposed it:\n\n- The cloud moved your resources outside the wall in the first place\n- Remote work brought users in from everywhere\n- Phishing crosses the wall through humans daily\n- An attacker who crosses once now operates in a fully trusted environment — a dream for him\n\nThe term's path: the Jericho Forum (2004) noticed the dissolving perimeter, then Google's famous BeyondCorp (after 2009's Operation Aurora) rebuilt employee access without traditional VPNs, then NIST codified the standard framework in SP 800-207 (2020).\n\nThe governing sentence: never trust, always verify — your location on the network is no longer evidence of your identity or your rights.",
        },
      },
      {
        heading: { ar: "المكونات المعمارية في نموذج NIST", en: "Architectural Components in the NIST Model" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة طلب وصول داخل نموذج الثقة الصفرية", en: "An access request's journey inside the zero-trust model" },
          items: [
            { ar: "المستخدم يطلب المورد عبر نقطة تنفيذ PEP", en: "The user requests the resource through a PEP" },
            { ar: "محرك السياسة يجمع الإشارات: هوية، حالة الجهاز، سياق، حساسية", en: "The policy engine gathers signals: identity, device state, context, sensitivity" },
            { ar: "القرار: منح أو رفض — لا موقع شبكي يمنح ثقة", en: "The decision: grant or deny — no network location grants trust" },
            { ar: "مدير السياسة يفتح جلسة محدودة المدة والنطاق", en: "The policy administrator opens a time- and scope-limited session" },
            { ar: "تقييم مستمر: سلوك شاذ يغلق الجلسة فوراً", en: "Continuous evaluation: abnormal behavior closes the session instantly" },
          ],
        },
        body: {
          ar: "SP 800-207 يصف مكونات منطقية واضحة:\n\n- محرك السياسة (Policy Engine): العقل — يقرر منح الوصول أو رفضه عبر جمع كل الإشارات: الهوية، حالة الجهاز (صلاحية؟ مصاب؟)، الموقع/الزمان، حساسية المورد، وسلوك الجلسة\n- مدير السياسة (Policy Administrator): اليد — ينفذ قرار المحرك بإنشاء/إنهاء الجلسات وإصدار بيانات الاعتماد\n- نقاط التنفيذ (PEP): الأبواب — بوابات أو وكلاء تفرض القرار قبل وصول أي مرور للمورد\n\nالقرار مستمر لا مرة واحدة: جلسة تتصرف شاذاً في منتصفها تُغلق فوراً (Continuous Evaluation) — عكس نموذج VPN الذي يمنح الثقة عند الدخول ثم ينسى.\n\nالركائز التي يستمد منها الإشارات:\n\n- الهوية: MFA، إدارة هوية مركزية (IdP)، SSO\n- الجهاز: مخزون أصول حي، إدارة، حالة أمنية\n- الشبكة: تقطيع دقيق ومراقبة شرق-غرب\n- التطبيقات والبيانات: تصنيف الحساسية وسياسات لكل مورد",
          en: "SP 800-207 describes clear logical components:\n\n- Policy Engine: the brain — granting or denying access by weighing every signal: identity, device state (compliant? infected?), location/time, resource sensitivity, and session behavior\n- Policy Administrator: the hand — executing the engine's decision by creating/terminating sessions and issuing credentials\n- Policy Enforcement Points (PEPs): the doors — gateways or agents enforcing the decision before any traffic reaches the resource\n\nThe decision is continuous, not one-time: a session behaving abnormally mid-stream is closed immediately (continuous evaluation) — unlike the VPN model that grants trust at entry then forgets.\n\nThe pillars feeding the signals:\n\n- Identity: MFA, a central identity provider (IdP), SSO\n- Device: a live asset inventory, management, security posture\n- Network: microsegmentation and east-west monitoring\n- Applications and data: sensitivity classification and per-resource policy",
        },
        tip: {
          ar: "مؤشر عملي لصحة أي مشروع Zero Trust: هل يستطيع نظام واحد (SIEM/IdP) أن يجيب فوراً: من الواصل؟ بأي جهاز؟ لأي تطبيق؟ وآخر متى؟ — إن تعددت الإجابات فالوصول لا يزار مركزياً.",
          en: "A practical health metric for any Zero Trust project: can a single system (SIEM/IdP) answer instantly: who is connected? with which device? to which app? and last seen when? — if the answers scatter, access is not centrally visible.",
        },
      },
      {
        heading: { ar: "ZTNA مقابل VPN: نقلة فلسفية", en: "ZTNA vs VPN: A Philosophical Shift" },
        table: {
          caption: { ar: "VPN التقليدية مقابل ZTNA", en: "Traditional VPN vs ZTNA" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "VPN التقليدية", en: "Traditional VPN" },
            { ar: "ZTNA", en: "ZTNA" },
          ],
          rows: [
            [
              { ar: "نطاق الوصول", en: "Access scope" },
              { ar: "عضوية الشبكة كاملة", en: "Full network membership" },
              { ar: "التطبيق المحدد فقط", en: "Only the specific application" },
            ],
            [
              { ar: "لحظة الثقة", en: "Trust moment" },
              { ar: "مرة واحدة عند الدخول ثم تنسى", en: "Once at entry, then forgotten" },
              { ar: "تحقق مستمر قبل وأثناء الجلسة", en: "Continuous verification before and during" },
            ],
            [
              { ar: "إشارات القرار", en: "Decision signals" },
              { ar: "بيانات الاعتماد غالباً", en: "Mostly credentials" },
              { ar: "هوية + حالة جهاز + سياق + سلوك", en: "Identity + device posture + context + behavior" },
            ],
            [
              { ar: "المسار", en: "Path" },
              { ar: "كل المرور عبر بوابة المقر", en: "All traffic via the HQ gateway" },
              { ar: "اتصال مباشر للتطبيق حيث أمكن", en: "Direct-to-app connection where possible" },
            ],
            [
              { ar: "مثال محسوس", en: "Tangible example" },
              { ar: "مفتاح المدينة كلها", en: "A key to the whole city" },
              { ar: "مفتاح غرفة واحدة فقط", en: "A key to a single room" },
            ],
          ],
        },
        body: {
          ar: "الفرق ليس تقنياً فحسب بل نموذجياً:\n\nVPN التقليدية:\n\n- تمنح عضوية شبكة كاملة: من يدخل يرى الشبكة الداخلية كلها (ما لم تقسم بجدارة)\n- الثقة تعطى مرة عند الدخول ثم تجدد بلا تحقق عميق\n-瓶颈 الأداء: كل المرور يُضغط عبر بوابة واحدة\n- تكلفة تشغيل بشرية عالية\n\nZTNA (Zero Trust Network Access):\n\n- وصول لكل تطبيق على حدة: النفق يقام بين المستخدم والتطبيق المحدد فقط — لا يرى بقية الشبكة أبداً\n- التحقق مستمر بكل إشارة (هوية + جهاز + سياق) قبل كل جلسة وأثناءها\n- الوكيل الذكي (Identity-Aware Proxy) يفصل المستخدم عن الشبكة: هوياته تمر وأحمال الشبكة الداخلية تبقى خلف الستار\n- أداء أفضل: اتصال مباشر للسحابة عند إمكانه بلا رحلة عبر مقر الشركة\n\nمثال محسوس: مهندس خارجي يحتاج تطبيق لوحة واحدة — VPN تفتح له مدينة كاملة، و ZTNA تعطيه مفتاح غرفة واحدة فقط.",
          en: "The difference is not merely technical but paradigm-level:\n\nTraditional VPN:\n\n- Grants full network membership: whoever enters sees the entire internal network (unless painstakingly partitioned)\n- Trust is granted once at entry and renewed without deep verification\n- Performance bottleneck: all traffic squeezed through one gateway\n- Heavy human operational cost\n\nZTNA (Zero Trust Network Access):\n\n- Per-application access: the tunnel is established between the user and that specific application only — the rest of the network is never visible\n- Continuous verification with every signal (identity + device + context) before and during each session\n- The identity-aware proxy separates the user from the network: identities pass while internal network loads stay behind the curtain\n- Better performance: direct cloud connections where possible, without detouring through headquarters\n\nA tangible example: an external engineer needs one dashboard app — the VPN opens an entire city for him; ZTNA hands him the key to a single room.",
        },
      },
    ],
    keyPoints: [
      { ar: "الموقع الشبكي ليس دليلاً على الثقة — كل طلب يتحقق ويصرَّح", en: "Network location is not proof of trust — every request is verified and authorized" },
      { ar: "NIST 800-207: محرك سياسة (القرار) + مدير (التنفيذ) + نقاط PEP (الأبواب)", en: "NIST 800-207: policy engine (decision) + administrator (execution) + PEPs (doors)" },
      { ar: "التحقق مستمر: الجلسة الشاذة تُغلق في منتصفها لا بعد الحادثة", en: "Continuous verification: an anomalous session closes mid-stream, not after the incident" },
      { ar: "الركائز: هوية (MFA/IdP) وجهاز (مخزون وحالة) وشبكة (تقطيع) وتطبيق وبيانات", en: "Pillars: identity (MFA/IdP), device (inventory/posture), network (segmentation), app and data" },
      { ar: "ZTNA تمنح مفتاح التطبيق الواحد بدل عضوية الشبكة الكاملة كما في VPN", en: "ZTNA grants the single-app key instead of the full network membership VPNs give" },
    ],
    commands: [
      { cmd: "curl -s -o /dev/null -w \"%{http_code}\" https://app.company.com", desc: { ar: "اختبار نقطة تنفيذ PEP: هل يصل تطبيق داخلي من خارج دون تسجيل؟", en: "Probe a PEP: does an internal app respond externally without login?" } },
      { cmd: "ss -tnp", desc: { ar: "عرض جلسات TCP الحية على جهازك — اكتشاف الأنفاق لكل تطبيق", en: "Show live TCP sessions on your device — spotting per-app tunnels" } },
      { cmd: "show crypto ipsec sa", desc: { ar: "عرض أنفاق VPN القائمة (النموذج القديم) ومقارنة نطاقها", en: "Show active VPN tunnels (the old model) and compare their scope" } },
      { cmd: "whoami /all", desc: { ar: "فحص هوية وأعضويات الرموز الأمنية في ويندوز — أساس إشارات الهوية", en: "Inspect Windows identity and security group memberships — the identity signal base" } },
    ],
    quiz: [
      {
        q: { ar: "أي عبارة تجسد جوهر Zero Trust بدقة؟", en: "Which statement precisely embodies the essence of Zero Trust?" },
        options: [
          { ar: "شبكة داخلية موثوقة وشبكة خارجية غير موثوقة", en: "A trusted internal network and an untrusted external one" },
          { ar: "لا تثق أحداً، تحقق دائماً — كل طلب وصول يمر بالتحقق بصرف النظر عن مصدره الشبكي", en: "Never trust, always verify — every access request passes verification regardless of its network origin" },
          { ar: "الاعتماد على جدار ناري محيطي أقوى", en: "Relying on a stronger perimeter firewall" },
          { ar: "تشفير كل شيء ونسيان الهوية", en: "Encrypt everything and forget identity" },
        ],
        correct: 1,
        explain: { ar: "الثقة الصفرية تلغي الافتراض الجغرافي: طلب من داخل المبنى ومن فيلا بعيدة يخضعان للتحقق نفسه — لأن الموقع لا يثبت هوية ولا صلاحية.", en: "Zero trust abolishes the geographic assumption: a request from inside the building and one from a distant villa face identical verification — because location proves neither identity nor rights." },
      },
      {
        q: { ar: "في نموذج NIST 800-207، ما وظيفة نقاط التنفيذ PEP؟", en: "In the NIST 800-207 model, what is the PEP's role?" },
        options: [
          { ar: "اتخاذ قرار المنح أو الرفض", en: "Deciding grant or deny" },
          { ar: "فرض قرار المحرك عملياً: لا مرور يصل للمورد إلا عبرها", en: "Practically enforcing the engine's decision: no traffic reaches the resource except through them" },
          { ar: "توليد شهادات TLS", en: "Generating TLS certificates" },
          { ar: "تخزين سجلات المحاسبة", en: "Storing accounting logs" },
        ],
        correct: 1,
        explain: { ar: "الفصل المتعمد: المحرك يقرر، المدير ينشئ الجلسات، و PEP هي البوابة الفيزيائية/البرمجية التي يمر عبرها كل شيء — قرار واحد ومنفذ واحد يضمن لا مجال للتجاوز.", en: "Deliberate separation: the engine decides, the administrator creates sessions, and the PEP is the physical/software gate everything traverses — one decision and one choke point leave no bypass." },
      },
      {
        q: { ar: "مقاول خارجي يحتاج الوصول لتطبيق واحد داخل الشركة. لماذا تعتبر ZTNA أفضل من VPN كلاسيكية هنا؟", en: "An external contractor needs access to one internal app. Why is ZTNA better than a classic VPN here?" },
        options: [
          { ar: "لأن ZTNA أسرع في التنزيلات الكبيرة", en: "Because ZTNA is faster for large downloads" },
          { ar: "لأنها تنشئ نفقاً للتطبيق المحدد فقط دون كشف بقية الشبكة، مع تحقق مستمر من هويته وحالة جهازه", en: "Because it tunnels to that specific app only, exposing nothing else of the network, with continuous identity and device-posture verification" },
          { ar: "لأنها لا تتطلب مصادقة أصلاً", en: "Because it requires no authentication at all" },
          { ar: "لأن VPN لا يدعم التطبيقات الداخلية", en: "Because VPNs cannot reach internal apps" },
        ],
        correct: 1,
        explain: { ar: "VPN تعطيه رؤية شبكية واسعة قابلة للاستغلال، و ZTNA تحصره في غرفة واحدة: نفق للتطبيق فقط + تحقق دائم — مبدأ أقل امتياز مطبق على مستوى الوصول.", en: "A VPN gives him broad network visibility primed for abuse; ZTNA confines him to one room: an app-only tunnel plus continuous verification — least privilege applied at the access layer." },
      },
      {
        q: { ar: "جلسة مستخدم نشطة بدأ سلوكها يصبح شاذاً (نقل بيانات ضخم غير معتاد). كيف يتصرف النظام في النموذج الصفري؟", en: "An active user session starts behaving anomalously (unusually massive data transfer). How does the zero-trust system respond?" },
        options: [
          { ar: "لا شيء — الثقة مُنحت عند الدخول", en: "Nothing — trust was granted at entry" },
          { ar: "التقييم المستمر يرصد الشذوذ وقد يوقف الجلسة فوراً ويطلب إعادة تحقق", en: "Continuous evaluation detects the anomaly and may kill the session instantly, demanding re-verification" },
          { ar: "يرسل تقريراً نهاية الشهر", en: "It sends an end-of-month report" },
          { ar: "يزيد عرض النطاق للجلسة", en: "It increases bandwidth for the session" },
        ],
        correct: 1,
        explain: { ar: "جوهر التقييم المستمر: الثقة ليست عقداً عند الدخول بل حالة تُراجع باستمرار — انحراف السلوك يعيد فتح ملف التحقق ويوقف الضرر مبكراً.", en: "The heart of continuous evaluation: trust is not an entry-time contract but a constantly reviewed state — behavioral deviation reopens the verification file and halts damage early." },
      },
    ],
  },
];
