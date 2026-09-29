import type { Lesson } from "@/lib/types";

// Module m08 — Application Layer & Services (l071–l080)
export const m08_LESSONS: Lesson[] = [
  {
    id: "l071",
    moduleId: "m08",
    order: 1,
    level: "intermediate",
    title: { ar: "نظام أسماء النطاقات DNS: دليل هاتف الإنترنت", en: "DNS: The Internet's Phone Book" },
    summary: {
      ar: "كيف يترجم DNS أسماء المواقع إلى عناوين IP عبر بنية هرمية عالمية، ورحلة استعلام كاملة من متصفحك حتى خوادم الجذر.",
      en: "How DNS translates website names into IP addresses through a global hierarchy, and the full journey of a query from your browser to the root servers.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "لماذا نحتاج DNS؟", en: "Why Do We Need DNS?" },
        body: {
          ar: "تخيّل أنك تريد زيارة موقع فتحفظ عنوانه الرقمي 142.250.74.46 عن ظهر قلبك. هذا هو الواقع الذي كنا سنعيشه لولا نظام أسماء النطاقات (Domain Name System).\n\nDNS هو النظام الذي يترجم الأسماء البشرية مثل example.com إلى عناوين IP رقمية تفهمها الشبكة، ويقوم بذلك مليارات المرات يومياً في أجزاء من الثانية.\n\n- في البدايات كان ملفاً واحداً اسمه hosts.txt يُوزَّع يدوياً على جامعات الإنترنت\n- نمو الشبكة جعل المركزية مستحيلة، فوُلد DNS عام 1983 في المعيارين RFC 1034 و RFC 1035\n- اليوم هو أكبر قاعدة بيانات موزّعة هرمية في تاريخ الحوسبة\n\nجهازك يستخدم DNS عشرات المرات يومياً دون أن تشعر: فتح موقع، اتصال تطبيق بخادمه، أو بحث خادم بريد عن عنوان MX.",
          en: "Imagine wanting to visit a site and memorizing its numeric address 142.250.74.46. That is the reality we would live without the Domain Name System.\n\nDNS is the system that translates human names like example.com into numeric IP addresses the network understands, doing this billions of times a day in milliseconds.\n\n- It began as a single file called hosts.txt, distributed manually to Internet universities\n- Network growth made centralization impossible, so DNS was born in 1983 with RFC 1034 and RFC 1035\n- Today it is the largest hierarchical distributed database in computing history\n\nYour device uses DNS dozens of times daily without you noticing: opening a site, an app reaching its server, or a mail server looking up an MX record.",
        },
        tip: {
          ar: "ملف hosts لا يزال حياً: المسار /etc/hosts في لينكس أو C:\\Windows\\System32\\drivers\\etc\\hosts، وأي سطر فيه يُستخدم قبل استعلام DNS.",
          en: "The hosts file is still alive: /etc/hosts on Linux or C:\\Windows\\System32\\drivers\\etc\\hosts — any line there is used before a DNS query.",
        },
      },
      {
        heading: { ar: "الهيكل الهرمي للأسماء", en: "The Hierarchical Namespace" },
        diagram: {
          kind: "topology",
          title: { ar: "شجرة تفويض DNS: من الجذر حتى النطاقات الفرعية", en: "The DNS delegation tree: from the root to subdomains" },
          nodes: ["Root-.", "TLD-.com", "Auth-example.com", "www", "mail", "api"],
          edges: [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5]],
        },
        body: {
          ar: "قوة DNS ليست في خادم واحد بل في تقسيم العمل عمودياً. قراءة الاسم تتم من اليمين إلى اليسار (في التمثيل الإنجليزي):\n\n- النقطة الجذر (.) : قمة الشجرة، تمثلها 13 مجموعة خوادم جذر بأحرف من A إلى M، تُدار عبر تقنية anycast بمئات النسخ الفيزيائية حول العالم\n- نطاق المستوى الأعلى TLD: مثل .com و .org و .sa و .eg، وتُقسم إلى عامة (gTLD) ووطنية (ccTLD)\n- النطاق الثاني: example.com وهو ما تشتريه أنت من مسجّل (Registrar)\n- النطاقات الفرعية: www أو mail أو api — تنشئها أنت بحرية\n\nالاسم الكامل (FQDN) ينتهي بنقطة غالباً ما ننساها: www.example.com. — النقطة هي الجذر.\n\nتحت نطاقك، تُفوَّض (Delegation) المسؤولية لخوادمك المُصدِّقة (Authoritative Servers) التي تملك الإجابة النهائية عن نطاقك ولا أحد غيرها.",
          en: "The power of DNS is not in one server but in dividing the work vertically. The name is read right to left (in its English form):\n\n- The root dot (.): the top of the tree, represented by 13 root server identities labeled A through M, served via anycast from hundreds of physical copies worldwide\n- The Top-Level Domain (TLD): .com, .org, .sa, .eg — split into generic (gTLD) and country-code (ccTLD)\n- The second level: example.com — what you buy from a registrar\n- Subdomains: www, mail, or api — you create them freely\n\nA Fully Qualified Domain Name (FQDN) ends with a dot we usually forget: www.example.com. — that dot is the root.\n\nBeneath your domain, authority is delegated to your authoritative servers, which hold the final answer for your zone and nobody else does.",
        },
      },
      {
        heading: { ar: "رحلة الاستعلام: التكراري مقابل المتتالي", en: "The Query Journey: Recursive vs Iterative" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة استعلام تكراري كاملة من الجذر إلى الإجابة", en: "A full recursive query journey from the root to the answer" },
          items: [
            { ar: "العميل يسأل المُحلِّل: أين www.example.com؟", en: "The client asks the resolver: where is www.example.com?" },
            { ar: "المُحلِّل يسأل الجذر فيُحال إلى خوادم .com", en: "The resolver asks the root and is referred to the .com servers" },
            { ar: "خوادم .com تحيله إلى الخوادم المُصدِّقة لنطاق example.com", en: "The .com servers refer it to example.com's authoritative servers" },
            { ar: "الخادم المُصدِّق يجيب: سجل A هو 93.184.216.34", en: "The authoritative server answers: the A record is 93.184.216.34" },
            { ar: "المُحلِّل يعيد الإجابة للعميل ويخزّنها مؤقتاً وفق TTL", en: "The resolver returns the answer and caches it per the TTL" },
          ],
        },
        body: {
          ar: "عند كتابة اسم موقع في المتصفح تبدأ سلسلة من الأسئلة. المُحلِّل (Resolver) — في جهازك أو لدى مزود الخدمة — يقوم بالعمل التكراري (Recursive) نيابة عنك، أي أنه لا يعود إليك إلا بجواب نهائي.\n\nأما الخوادم التي يسألها فتجيب إجابات متتالية (Iterative) أي: لا أعرف الجواب لكن اسأل هذا الخادم. المسار الكامل:\n\n- 1) المُحلِّل يسأل خوادم الجذر: أين example.com؟\n- 2) الجذر يجيب: لا أعرف، لكن خوادم .com هي هذه — فيرسل قائمة NS الخاصة بـ .com\n- 3) المُحلِّل يسأل خوادم .com، فتجيب: اسأل الخوادم المُصدِّقة لنطاق example.com\n- 4) المُحلِّل يسأل الخادم المُصدِّق، فيجيبه أخيراً: عنوان A هو 93.184.216.34\n- 5) يعود المُحلِّل إليك بالجواب ويخزّنه مؤقتاً\n\nكل هذا يحدث عادة في أقل من 100 ملّي ثانية، ويعمل بالتوازي مع استعلامات AAAA لأجل IPv6.",
          en: "When you type a site name in the browser, a chain of questions begins. The resolver — on your device or at your ISP — performs the recursive work on your behalf, meaning it does not come back to you without a final answer.\n\nThe servers it asks give iterative answers, meaning: I do not know, but ask this server. The full path:\n\n- 1) The resolver asks the root servers: where is example.com?\n- 2) The root answers: I do not know, but the .com servers are these — it sends the NS list for .com\n- 3) The resolver asks the .com servers, which answer: ask the authoritative servers of example.com\n- 4) The resolver asks the authoritative server, which finally answers: the A record is 93.184.216.34\n- 5) The resolver returns the answer to you and caches it\n\nAll of this typically happens in under 100 milliseconds, and it runs in parallel with AAAA queries for IPv6.",
        },
        code: {
          lang: "bash",
          snippet: "dig +trace www.example.com\n\n;; root servers: a.root-servers.net ... m.root-servers.net\n;; .com NS: a.gtld-servers.net ...\n;; example.com. NS: a.iana-servers.net.\n;; ANSWER: www.example.com. 86400 IN A 93.184.216.34",
        },
        tip: {
          ar: "أمر +trace في dig هو أفضل وسيلة تعليمية: يطبع كل قفزة من الجذر حتى الإجابة النهائية كما لو كنت المُحلِّل بنفسك.",
          en: "The +trace option in dig is the best teaching tool: it prints every hop from the root to the final answer as if you were the resolver yourself.",
        },
      },
      {
        heading: { ar: "التخزين المؤقت وقيمة TTL", en: "Caching and the TTL Value" },
        table: {
          caption: { ar: "مستويات خزائن DNS الأربعة", en: "The four DNS cache levels" },
          headers: [
            { ar: "المستوى", en: "Level" },
            { ar: "من يستفيد منه", en: "Who benefits" },
            { ar: "مدة الاحتفاظ", en: "Retention" },
          ],
          rows: [
            [
              { ar: "خزانة المتصفح", en: "Browser cache" },
              { ar: "المستخدم الواحد في جلسته", en: "The single user in their session" },
              { ar: "ثوانٍ إلى دقائق قصيرة", en: "Seconds to a few minutes" },
            ],
            [
              { ar: "خزانة نظام التشغيل", en: "OS cache" },
              { ar: "كل تطبيقات الجهاز نفسه", en: "All applications on that device" },
              { ar: "حسب سياسة النظام (غالباً قصيرة)", en: "Per OS policy (usually short)" },
            ],
            [
              { ar: "مُحلِّل مزود الخدمة", en: "ISP resolver" },
              { ar: "آلاف المستخدمين في المنطقة", en: "Thousands of users in the region" },
              { ar: "يحترم TTL (وقد يتجاوزه بعضها!)", en: "Honors TTL (some exceed it!)" },
            ],
            [
              { ar: "الخادم المُصدِّق", en: "Authoritative server" },
              { ar: "المصدر — إجابته نهائية", en: "The source — its answer is final" },
              { ar: "لا يخزّن: هو الحقيقة نفسها", en: "No caching: it is the truth itself" },
            ],
          ],
        },
        body: {
          ar: "لو سار كل استعلام حتى خوادم الجذر لانهار الإنترنت تحت الحمل. الحل هو التخزين المؤقت (Caching) في كل مستوى:\n\n- المتصفح يخزن الأسماء لمدة قصيرة\n- نظام التشغيل يحتفظ بخزانته الخاصة\n- مُحلِّل مزود الخدمة يخزن ملايين الإجابات ويخدم آلاف المستخدمين منها\n\nمدة الصلاحية لا يقررها المُحلِّل بل مالك السجل عبر قيمة TTL بالثواني. سجل TTL = 3600 يعني: يجوز استخدام النسخة المخزنة لمدة ساعة.\n\n- TTL طويل = استجابات أسرع وتحميل أقل، لكن التغييرات تنتشر ببطء\n- TTL قصير = انتشار سريع للتعديلات لكن حملاً أكبر\n\nقبل نقل نطاقك إلى خادم جديد، خفّض TTL إلى 60-300 ثانية قبل يوم من التغيير — هذه عادة المهندسين المحترفين.",
          en: "If every query went up to the root servers, the Internet would collapse under the load. The solution is caching at every level:\n\n- The browser caches names for a short time\n- The operating system keeps its own cache\n- The ISP resolver caches millions of answers and serves thousands of users from them\n\nThe validity window is not decided by the resolver but by the record owner through the TTL value in seconds. A TTL of 3600 means: the cached copy may be used for one hour.\n\n- Long TTL = faster responses and less load, but changes propagate slowly\n- Short TTL = fast propagation of changes but more load\n\nBefore migrating your domain to a new server, lower the TTL to 60-300 seconds a day ahead — this is a professional engineer habit.",
        },
      },
      {
        heading: { ar: "نقل DNS: UDP أم TCP؟", en: "DNS Transport: UDP or TCP?" },
        body: {
          ar: "يستخدم DNS المنفذ 53 افتراضياً عبر UDP لأن الاستعلام والجواب صغيران والسرعة أهم من إعادة الإرسال الثقيلة.\n\nلكن هناك حالات يتحول فيها إلى TCP:\n\n- عندما يتجاوز حجم الجواب 512 بايت (الحد القديم) — وتم توسيعه عملياً إلى ~1232 بايت عبر EDNS0\n- نقل المنطقة (Zone Transfer) بالكامل بين خادم أساسي وثانوي عبر AXFR\n\nولأن DNS نصّي وغير مشفر، ظهرت تحسينات حديثة: توزيع عشوائي لمنفذ المصدر وترقيم المعاملات لمقاومة التسميم (Cache Poisoning)، وتوقيع DNSSEC للتحقق من صحة البيانات، ونقل DNS عبر TLS (DoT منفذ 853) أو عبر HTTPS (DoH منفذ 443) لمنع التجسس على استعلاماتك.",
          en: "DNS uses port 53 over UDP by default because the query and answer are small, and speed matters more than heavy retransmission.\n\nBut there are cases where it switches to TCP:\n\n- When the answer exceeds 512 bytes (the old limit) — practically extended to ~1232 bytes via EDNS0\n- Full zone transfers (AXFR) between a primary and secondary server\n\nAnd since DNS is plaintext and unencrypted, modern enhancements appeared: randomizing the source port and transaction IDs to resist cache poisoning, DNSSEC signatures to verify data integrity, and carrying DNS over TLS (DoT, port 853) or over HTTPS (DoH, port 443) to prevent eavesdropping on your queries.",
        },
      },
    ],
    keyPoints: [
      { ar: "DNS يترجم الأسماء إلى IP عبر أكبر قاعدة بيانات موزّعة في العالم", en: "DNS maps names to IPs across the world's largest distributed database" },
      { ar: "الهرمية: الجذر ثم TLD ثم النطاق ثم النطاقات الفرعية، والتفويض ينزل درجة درجة", en: "Hierarchy: root, then TLD, then domain, then subdomains — delegation descends step by step" },
      { ar: "المُحلِّل يعمل تكرارياً لصالحك، بينما تعطيه الخوادم إجابات متتالية (اسأل غيري)", en: "The resolver recurses on your behalf, while servers give iterative referrals (ask someone else)" },
      { ar: "TTL يحدد مدة تخزين الإجابة مؤقتاً — خفّضه قبل أي تغيير كبير", en: "TTL controls how long an answer is cached — lower it before any major change" },
      { ar: "المنفذ 53 عبر UDP أساساً، مع انتقال إلى TCP عند الإجابات الكبيرة ونقل المناطق", en: "Port 53 over UDP primarily, switching to TCP for large answers and zone transfers" },
    ],
    commands: [
      { cmd: "nslookup example.com", desc: { ar: "استعلام DNS مبسط يعرض الخادم المستخدم والعنوان (ويندوز/لينكس)", en: "A simple DNS query showing the resolver used and the address (Windows/Linux)" } },
      { cmd: "dig example.com +short", desc: { ar: "الإجابة المختصرة فقط: عناوين A دون تفاصيل", en: "Just the short answer: A addresses without details" } },
      { cmd: "dig +trace example.com", desc: { ar: "تتبع رحلة الاستعلام من الجذر حتى الخادم المُصدِّق خطوة خطوة", en: "Trace the query journey from the root to the authoritative server step by step" } },
      { cmd: "ipconfig /displaydns", desc: { ar: "عرض محتوى خزانة DNS في نظام ويندوز", en: "Show the Windows DNS cache contents" } },
    ],
    quiz: [
      {
        q: { ar: "أي خادم يملك الإجابة النهائية عن سجلات نطاق example.com؟", en: "Which server holds the final answer for example.com's records?" },
        options: [
          { ar: "خادم الجذر", en: "A root server" },
          { ar: "خادم TLD الخاص بـ .com", en: "The .com TLD server" },
          { ar: "الخادم المُصدِّق للنطاق", en: "The domain's authoritative server" },
          { ar: "مُحلِّل مزود الخدمة", en: "The ISP resolver" },
        ],
        correct: 2,
        explain: { ar: "خوادم الجذر و .com تعطي إحالات فقط، بينما الخادم المُصدِّق هو صاحب ملف المنطقة والإجابة النهائية، أما المُحلِّل فيخزن نسخاً مؤقتة.", en: "Root and .com servers give referrals only, while the authoritative server owns the zone file and the final answer; the resolver merely caches copies." },
      },
      {
        q: { ar: "استعلام بسجل TTL = 86400 ثانية وصل للتو إلى مُحلِّل مزود الخدمة. متى سيسأل الخادم المُصدِّق مرة أخرى؟", en: "A record with TTL = 86400 seconds just reached the ISP resolver. When will it query the authoritative server again?" },
        options: [
          { ar: "في كل استعلام جديد من مستخدم", en: "On every new user query" },
          { ar: "بعد مرور 24 ساعة", en: "After 24 hours" },
          { ar: "بعد مرور 86400 دقيقة", en: "After 86400 minutes" },
          { ar: "لن يسأله مجدداً أبداً", en: "Never again" },
        ],
        correct: 1,
        explain: { ar: "86400 ثانية = 24 ساعة بالضبط، خلالها يخدم المُحلِّل النسخة المخزنة دون سؤال الخادم المُصدِّق.", en: "86400 seconds = exactly 24 hours, during which the resolver serves the cached copy without asking the authoritative server." },
      },
      {
        q: { ar: "متى يتحول DNS إلى استخدام TCP بدلاً من UDP؟", en: "When does DNS switch to TCP instead of UDP?" },
        options: [
          { ar: "عند الاستعلام عن سجلات MX فقط", en: "Only when querying MX records" },
          { ar: "دائماً عند استخدام IPv6", en: "Always when using IPv6" },
          { ar: "عند تجاوز حجم الإجابة الحد المسموح أو عند نقل منطقة AXFR", en: "When the answer exceeds the size limit or during an AXFR zone transfer" },
          { ar: "لا يستخدم DNS بروتوكول TCP مطلقاً", en: "DNS never uses TCP at all" },
        ],
        correct: 2,
        explain: { ar: "UDP هو الافتراضي للاستعلامات الصغيرة، أما الإجابات الكبيرة (بعد EDNS0 ~1232 بايت) ونقل المناطق الكامل AXFR فيتم عبر TCP لضمان الموثوقية.", en: "UDP is the default for small queries, while large answers (post-EDNS0 ~1232 bytes) and full AXFR zone transfers use TCP for reliability." },
      },
      {
        q: { ar: "ما الفرق بين عمل المُحلِّل (Resolver) وعمل الخوادم الجذرية أثناء الاستعلام؟", en: "What is the difference between the resolver's job and the root servers' job during a query?" },
        options: [
          { ar: "كلاهما يقدم إجابات نهائية فقط", en: "Both provide only final answers" },
          { ar: "المُحلِّل يتابع حتى الإجابة النهائية، والجذر يقدم إحالة فقط", en: "The resolver pursues the final answer, while the root gives only a referral" },
          { ar: "الجذر يتابع حتى الإجابة النهائية، والمُحلِّل يقدم إحالة", en: "The root pursues the final answer, the resolver gives a referral" },
          { ar: "كلاهما يقدم إحالات فقط ولا أحد يجيب", en: "Both give only referrals and nobody answers" },
        ],
        correct: 1,
        explain: { ar: "المُحلِّل يعمل تكرارياً (Recursive) لصالح العميل حتى يحصل على الإجابة، أما خوادم الجذر فتعمل متتالياً (Iterative) وتكتفي بالإشارة إلى خوادم TLD.", en: "The resolver works recursively on the client's behalf until it gets the answer, while root servers work iteratively and merely point to the TLD servers." },
      },
    ],
  },
  {
    id: "l072",
    moduleId: "m08",
    order: 2,
    level: "intermediate",
    title: { ar: "سجلات DNS بالتفصيل مع التطبيق العملي بـ dig", en: "DNS Record Types in Depth with Hands-on dig" },
    summary: {
      ar: "شرح كل أنواع السجلات A و AAAA و CNAME و MX و NS و SOA و TXT و SRV و PTR و CAA مع أمثلة عملية لأمر dig.",
      en: "Every record type explained — A, AAAA, CNAME, MX, NS, SOA, TXT, SRV, PTR and CAA — with practical dig command examples.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "سجلات العنونة: A و AAAA و CNAME", en: "Address Records: A, AAAA and CNAME" },
        body: {
          ar: "سجل A (Address) هو أبسط السجلات وأكثرها استخداماً: يربط اسماً بعنوان IPv4 واحد. يمكن أن يملك الاسم الواحد عدة سجلات A فيحصل المتصفح على توزيع حمل مجاني عبر (Round Robin).\n\nسجل AAAA (يسمى Quad-A) يفعل الشيء نفسه لكن لعنوان IPv6 مثل 2606:2800:220:1:248:1893:25c8:1946.\n\n- سجل واحد لكل عنوان: لا يستخدم A لل IPv6 ولا AAAA لل IPv4\n- التكرار المتعدد طريقة شائعة لتوزيع الأحمال بسيطة\n\nسجل CNAME (Canonical Name) هو اسم بديل (Alias) يشير إلى اسم آخر: cdn.example.com CNAME example.cdnprovider.net. قاعدتان ذهبيتان: لا يجوز وضع CNAME في قمة النطاق (Apex)، ولا يجوز أن يشير إلى سجل آخر من نوع CNAME بعمق عشوائي — الأفضل أن يشير إلى اسم يملك سجل A.",
          en: "The A (Address) record is the simplest and most used: it maps a name to one IPv4 address. A single name can have multiple A records, giving the browser free round-robin load distribution.\n\nThe AAAA (Quad-A) record does the same for an IPv6 address like 2606:2800:220:1:248:1893:25c8:1946.\n\n- One record per family: A is not used for IPv6 and AAAA not for IPv4\n- Multiple records are a common simple load-balancing trick\n\nThe CNAME (Canonical Name) record is an alias pointing to another name: cdn.example.com CNAME example.cdnprovider.net. Two golden rules: a CNAME must never sit at the zone apex, and it should not chain to other CNAMEs arbitrarily — best practice is pointing to a name that holds an A record.",
        },
        tip: {
          ar: "لا يمكن وجود CNAME في قمة النطاق لأن القمة تملك إجبارياً سجلات NS و SOA، ووجودهما يتعارض مع CNAME.",
          en: "A CNAME cannot exist at the zone apex because the apex must hold NS and SOA records, which conflict with a CNAME.",
        },
      },
      {
        heading: { ar: "سجلات البريد والتفويض: MX و NS و SOA", en: "Mail and Delegation Records: MX, NS and SOA" },
        body: {
          ar: "سجل MX (Mail Exchanger) يقول لخوادم البريد في العالم: أرسل بريد نطاقي إلى هذا الخادم. ويحمل رقماً أولوياً (Preference) — الأصغر يُجرَّب أولاً:\n\n- 10 mail1.example.com (الأساسي)\n- 20 mail2.example.com (الاحتياطي عند فشل الأول)\n\nسجل NS يعلن الخوادم المُصدِّقة للنطاق — وهي البوابة التي يُسأل عنها العالم.\n\nسجل SOA (Start of Authority) هو بطاقة تعريف المنطقة وقلب آلية المزامنة بين الخوادم:\n\n- Serial: رقم تسلسل يرتفع مع كل تعديل — يستخدمه الخادم الثانوي ليعرف أن هناك تحديثاً\n- Refresh: كل كم يفحص الثانوي الأساسي؟ (عادة 3600 ثانية)\n- Retry و Expire: سلوك الثانوي عند فشل الاتصال\n- Minimum (Negative TTL): مدة تخزين إجابة (لا يوجد مثل هذا الاسم) مؤقتاً",
          en: "The MX (Mail Exchanger) record tells the world's mail servers: send my domain's mail to this host. It carries a preference number — the lowest is tried first:\n\n- 10 mail1.example.com (primary)\n- 20 mail2.example.com (backup if the first fails)\n\nThe NS record announces the domain's authoritative servers — the gateway the world asks.\n\nThe SOA (Start of Authority) record is the zone's identity card and the heart of primary-secondary synchronization:\n\n- Serial: a sequence number raised on every edit — how the secondary detects updates\n- Refresh: how often the secondary checks the primary (usually 3600 seconds)\n- Retry and Expire: secondary behavior when contact fails\n- Minimum (Negative TTL): how long a negative answer (no such name) is cached",
        },
      },
      {
        heading: { ar: "سجلات النصوص والخدمات: TXT و SRV و PTR و CAA", en: "Text and Service Records: TXT, SRV, PTR and CAA" },
        table: {
          caption: { ar: "أنواع سجلات DNS الشائعة العشرة في جدول واحد", en: "The ten common DNS record types in one table" },
          headers: [
            { ar: "السجل", en: "Record" },
            { ar: "وظيفته", en: "Purpose" },
            { ar: "مثال", en: "Example" },
          ],
          rows: [
            [
              { ar: "A", en: "A" },
              { ar: "يربط اسماً بعنوان IPv4", en: "Maps a name to an IPv4 address" },
              { ar: "example.com. IN A 93.184.216.34", en: "example.com. IN A 93.184.216.34" },
            ],
            [
              { ar: "AAAA", en: "AAAA" },
              { ar: "يربط اسماً بعنوان IPv6", en: "Maps a name to an IPv6 address" },
              { ar: "example.com. IN AAAA 2606:2800:220:1::248", en: "example.com. IN AAAA 2606:2800:220:1::248" },
            ],
            [
              { ar: "CNAME", en: "CNAME" },
              { ar: "اسم بديل يشير إلى الاسم القانوني", en: "An alias pointing to the canonical name" },
              { ar: "cdn.example.com → example.cdn.net", en: "cdn.example.com → example.cdn.net" },
            ],
            [
              { ar: "MX", en: "MX" },
              { ar: "خوادم بريد النطاق مع الأولوية", en: "The domain's mail servers with preference" },
              { ar: "10 mail1.example.com", en: "10 mail1.example.com" },
            ],
            [
              { ar: "NS", en: "NS" },
              { ar: "الخوادم المُصدِّقة للنطاق", en: "The zone's authoritative servers" },
              { ar: "example.com. IN NS a.iana-servers.net.", en: "example.com. IN NS a.iana-servers.net." },
            ],
            [
              { ar: "SOA", en: "SOA" },
              { ar: "بطاقة تعريف المنطقة ومعالم المزامنة", en: "Zone identity card and sync parameters" },
              { ar: "serial + refresh + retry + expire", en: "serial + refresh + retry + expire" },
            ],
            [
              { ar: "TXT", en: "TXT" },
              { ar: "نص حر: SPF و DKIM و DMARC والتحقق", en: "Free text: SPF, DKIM, DMARC, verification" },
              { ar: "v=spf1 include:_spf.google.com ~all", en: "v=spf1 include:_spf.google.com ~all" },
            ],
            [
              { ar: "SRV", en: "SRV" },
              { ar: "موقع خدمة ومنفذها ووزنها", en: "Locates a service, its port and weight" },
              { ar: "_ldap._tcp 0 100 389 dc01.example.com", en: "_ldap._tcp 0 100 389 dc01.example.com" },
            ],
            [
              { ar: "PTR", en: "PTR" },
              { ar: "تحويل عكسي من IP إلى اسم", en: "Reverse mapping from IP to name" },
              { ar: "34.216.184.93.in-addr.arpa. PTR www", en: "34.216.184.93.in-addr.arpa. PTR www" },
            ],
            [
              { ar: "CAA", en: "CAA" },
              { ar: "جهات إصدار الشهادات المسموح لها", en: "Permitted certificate authorities" },
              { ar: "0 issue \"letsencrypt.org\"", en: "0 issue \"letsencrypt.org\"" },
            ],
          ],
        },
        body: {
          ar: "سجل TXT يحمل نصاً حراً وقد أصبح اليوم أهم سجل متعدد الاستخدامات:\n\n- SPF: يحدد من يحق له إرسال بريد باسم نطاقك\n- DKIM: يستضيف المفتاح العام للتحقق من توقيع الرسائل\n- DMARC: سياسة التعامل مع البريد المزوَّر\n- التحقق من ملكية النطاق لدى Google و Microsoft وخدمات أخرى\n\nسجل SRV يحدد موقع خدمة معينة ومنفذها، ويستخدمه Microsoft في Active Directory للعثور على وحدات التحكم بالمجال: _ldap._tcp.example.com SRV 0 100 389 dc01.example.com.\n\nسجل PTR يعمل بعكس الجميع: يحول عنوان IP إلى اسم عبر مناطق خاصة in-addr.arpa (لـ IPv4) و ip6.arpa (لـ IPv6). يستخدمه البريد والتشخيص الأمني — خادم بريد بلا PTR غالباً سيرفض بريدك الخارج.\n\nسجل CAA (حديث نسبياً) يحدد أي جهات إصدار الشهادات (CAs) يحق لها إصدار شهادات TLS لنطاقك — طبقة أمان إضافية تمنع الإصدار غير المصرح به.",
          en: "The TXT record carries free text and has become today's most versatile record:\n\n- SPF: defines who may send mail on your domain's behalf\n- DKIM: hosts the public key verifying message signatures\n- DMARC: the policy for handling forged mail\n- Domain ownership verification for Google, Microsoft and other services\n\nThe SRV record locates a specific service and its port; Microsoft Active Directory uses it to find domain controllers: _ldap._tcp.example.com SRV 0 100 389 dc01.example.com.\n\nThe PTR record works in reverse: it maps an IP address to a name via the special zones in-addr.arpa (IPv4) and ip6.arpa (IPv6). Mail servers and security diagnostics rely on it — a sending mail server without PTR often gets its mail rejected.\n\nThe CAA record (relatively recent) restricts which certificate authorities may issue TLS certificates for your domain — an extra layer against unauthorized issuance.",
        },
      },
      {
        heading: { ar: "تشريح مخرجات dig", en: "Anatomy of a dig Output" },
        body: {
          ar: "أمر dig (Domain Information Groper) هو سلاح مهندس الشبكات الأول في عالم DNS. مخرجاته منظمة في أقسام:\n\n- HEADER: حالة الاستعلام، أعلامه (rd طلب التكرار، ra تكرار متاح)، ووقت الاستهلاك\n- QUESTION SECTION: ما سألت عنه بالضبط\n- ANSWER SECTION: الإجابات مع قيم TTL والنوع\n- AUTHORITY SECTION: خوادم NS المسؤولة إن لم توجد إجابة مباشرة\n- سطر Server: عنوان المُحلِّل الذي أجاب (الإعداد في /etc/resolv.conf)\n\nحدد نوع السجل بسطر الأمر: dig example.com MX أو dig example.com ANY، وحدد المُحلِّل: dig @8.8.8.8 example.com لسؤال خادم Google مباشرة بدل مُحلِّلك الافتراضي — مفيد جداً عند تتبع مشاكل الانتشار.",
          en: "The dig (Domain Information Groper) command is the network engineer's first weapon in the DNS world. Its output is organized into sections:\n\n- HEADER: query status, flags (rd recursion desired, ra recursion available), and time taken\n- QUESTION SECTION: exactly what you asked\n- ANSWER SECTION: the answers with TTL values and type\n- AUTHORITY SECTION: the responsible NS servers when no direct answer exists\n- The Server line: the resolver that answered (configured in /etc/resolv.conf)\n\nSelect the record type on the command line: dig example.com MX or dig example.com ANY, and choose the resolver: dig @8.8.8.8 example.com asks Google's server directly instead of your default resolver — extremely useful when tracking propagation issues.",
        },
        code: {
          lang: "bash",
          snippet: "dig example.com MX\n\n;; ANSWER SECTION:\nexample.com.    3600  IN  MX  10 mail.example.com.\nexample.com.    3600  IN  MX  20 mail2.example.com.\n\ndig -x 8.8.8.8 +short\ndns.google.\n\ndig _ldap._tcp.example.com SRV +short\n0 100 389 dc01.example.com.",
        },
      },
      {
        heading: { ar: "سيناريو عملي: تتبع مشكلة نشر", en: "Practical Scenario: Tracking a Propagation Issue" },
        body: {
          ar: "غيّرت عنوان خادمك لكن بعض المستخدمين يرون الموقع القديم. خطوات المهندس المحترف:\n\n- اسأل خوادم متعددة: dig @8.8.8.8 example.com ثم dig @1.1.1.1 example.com ثم مُحلِّلك المحلي\n- راقب قيم TTL في الإجابات: قيمة منخفضة متبقية تعني أن الانتظار قصير\n- اسأل الخادم المُصدِّق مباشرة للتأكد أن المصدر يحمل القيمة الجديدة\n\nإذا كان المصدر صحيحاً والفرق عند المُحلِّلات فقط، فالمسألة مسألة وقت — الخزانات ستُفرغ تلقائياً عند انتهاء TTL القديم.\n\n- DoH في المتصفح قد يبقي خزانة مستقلة — فرغها أو اختبر من متصفح آخر\n- بعض المُحلِّلات تتجاهل TTL وتحتفظ لفترة أطول — تجاوز للمعيار لكنه يحدث",
          en: "You changed your server address but some users still see the old site. The professional's steps:\n\n- Ask multiple resolvers: dig @8.8.8.8 example.com, then dig @1.1.1.1 example.com, then your local resolver\n- Watch the TTL values in answers: a low remaining value means the wait is short\n- Query the authoritative server directly to confirm the source holds the new value\n\nIf the source is correct and only resolvers differ, it is purely a matter of time — caches will flush automatically when the old TTL expires.\n\n- Browser DoH may keep an independent cache — clear it or test from another browser\n- Some resolvers ignore TTL and retain records longer — a spec violation, but it happens",
        },
        tip: {
          ar: "خيار +short في dig يعطيك القيم فقط — مثالي للسكربتات والفحص السريع: dig example.com +short",
          en: "dig's +short option returns only the values — perfect for scripts and quick checks: dig example.com +short",
        },
      },
    ],
    keyPoints: [
      { ar: "A لعناوين IPv4 و AAAA لعناوين IPv6، وتكرارهما يوزع الأحمال", en: "A for IPv4 and AAAA for IPv6; duplicates provide load distribution" },
      { ar: "CNAME اسم بديل: ليس في القمة، ويشير لاسم يملك سجل عنوان", en: "CNAME is an alias: never at the apex, points to a name holding an address record" },
      { ar: "MX بأولوية أصغر أولاً، و SOA يحكم المزامنة بين الأساسي والثانوي", en: "MX lowest priority first; SOA governs primary-secondary synchronization" },
      { ar: "TXT اليوم مركز SPF و DKIM و DMARC والتحقق من الملكية", en: "TXT today hosts SPF, DKIM, DMARC and ownership verification" },
      { ar: "PTR في مناطق in-addr.arpa يحول IP إلى اسم — مهم للبريد الصادر", en: "PTR in in-addr.arpa zones maps IP to name — vital for outbound mail" },
    ],
    commands: [
      { cmd: "dig example.com MX +short", desc: { ar: "عرض خوادم البريد لنطاق مع أولوياتها بإيجاز", en: "Show a domain's mail servers with priorities, concisely" } },
      { cmd: "dig -x 8.8.8.8 +short", desc: { ar: "استعلام عكسي: تحويل عنوان IP إلى اسم DNS", en: "Reverse lookup: map an IP address to a DNS name" } },
      { cmd: "dig TXT example.com +short", desc: { ar: "عرض سجلات TXT مثل SPF و DMARC", en: "Show TXT records such as SPF and DMARC" } },
      { cmd: "nslookup -type=SOA example.com", desc: { ar: "عرض سجل SOA عبر أداة nslookup (ويندوز)", en: "Show the SOA record via nslookup (Windows)" } },
    ],
    quiz: [
      {
        q: { ar: "نطاق يملك: 10 mail1 و 40 mail4 و 20 mail2 في سجلات MX. أي خادم يُجرَّب أولاً عند إرسال بريد إليه؟", en: "A domain has MX records: 10 mail1, 40 mail4, 20 mail2. Which server is tried first when sending mail to it?" },
        options: [
          { ar: "mail4 لأن رقمه الأكبر", en: "mail4 because its number is largest" },
          { ar: "mail1 لأن رقمه الأصغر", en: "mail1 because its number is smallest" },
          { ar: "mail2 لأنه في المنتصف", en: "mail2 because it is in the middle" },
          { ar: "تُختار عشوائياً", en: "Chosen randomly" },
        ],
        correct: 1,
        explain: { ar: "قيمة الأولوية في MX: الأصغر يفوز. mail1 (10) يُجرَّب أولاً، وعند فشله ينتقل المرسل إلى mail2 (20) ثم mail4 (40).", en: "The MX preference value: lowest wins. mail1 (10) is tried first; on failure the sender moves to mail2 (20) then mail4 (40)." },
      },
      {
        q: { ar: "أي سجل يحدد الخوادم المُصدِّقة لنطاق ما؟", en: "Which record identifies a domain's authoritative servers?" },
        options: [
          { ar: "PTR", en: "PTR" },
          { ar: "CNAME", en: "CNAME" },
          { ar: "NS", en: "NS" },
          { ar: "TXT", en: "TXT" },
        ],
        correct: 2,
        explain: { ar: "سجلات NS تعلن للعالم الخوادم التي تحتوي نسخة المنطقة الأصلية المُصدِّقة، بينما يشير SOA إلى معلمات المزامنة وليس قائمة الخوادم.", en: "NS records tell the world which servers hold the authoritative original copy of the zone, while SOA describes synchronization parameters, not the server list." },
      },
      {
        q: { ar: "حاولت إنشاء: example.com CNAME example.net في قمة النطاق. لماذا سيفشل هذا؟", en: "You tried to create example.com CNAME example.net at the zone apex. Why will this fail?" },
        options: [
          { ar: "لأن CNAME لا يدعم أسماء .net", en: "Because CNAME does not support .net names" },
          { ar: "لأن القمة يجب أن تحمل سجلات NS و SOA المتعارضة مع CNAME", en: "Because the apex must carry NS and SOA records that conflict with a CNAME" },
          { ar: "لأن CNAME يتطلب IPv6", en: "Because CNAME requires IPv6" },
          { ar: "لأن TTL لا يسمح بذلك", en: "Because TTL does not allow it" },
        ],
        correct: 1,
        explain: { ar: "قاعدة RFC: عند وجود CNAME لا يجوز وجود أي سجلات أخرى لنفس الاسم، والقمة تحتاج إجبارياً NS و SOA — الحل الحديث هو سجلات ALIAS/ANAME لدى بعض المزودين.", en: "The RFC rule: when a CNAME exists, no other records may share the name, yet the apex mandatorily needs NS and SOA — the modern workaround is ALIAS/ANAME records offered by some providers." },
      },
      {
        q: { ar: "ما الغرض الأساسي من سجل CAA؟", en: "What is the primary purpose of a CAA record?" },
        options: [
          { ar: "تحديد خوادم البريد الاحتياطية", en: "Defining backup mail servers" },
          { ar: "تحديد جهات إصدار الشهادات المسموح لها بإصدار TLS للنطاق", en: "Restricting which certificate authorities may issue TLS certs for the domain" },
          { ar: "الإعلان عن خوادم FTP", en: "Announcing FTP servers" },
          { ar: "تحديد أسماء النطاقات الفرعية المسموحة", en: "Defining allowed subdomains" },
        ],
        correct: 1,
        explain: { ar: "سجل CAA يمنع جهات الإصدار غير المذكورة من إصدار شهادات لنطاقك حتى لو طُلب منها ذلك خطأً أو خداعاً.", en: "A CAA record prevents unlisted certificate authorities from issuing certificates for your domain, even if requested erroneously or deceptively." },
      },
    ],
  },
  {
    id: "l073",
    moduleId: "m08",
    order: 3,
    level: "intermediate",
    title: { ar: "بروتوكول HTTP: الطلبات والاستجابات وأكواد الحالة", en: "HTTP: Requests, Responses and Status Codes" },
    summary: {
      ar: "بنية رسائل HTTP والأفعال GET و POST و PUT و DELETE ورموز الحالة من 1xx إلى 5xx مع الترويسات والكوكيز وأمثلة curl.",
      en: "HTTP message structure, the GET/POST/PUT/DELETE verbs, status codes from 1xx to 5xx, headers, cookies, and curl examples.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "نموذج الطلب والاستجابة", en: "The Request-Response Model" },
        body: {
          ar: "HTTP بروتوكول طبقة تطبيقات يعمل فوق TCP (تقليدياً على المنفذ 80). هو بروتوكول عديم الحالة (Stateless): كل طلب مستقل ولا يتذكر الخادم شيئاً عن الطلب السابق.\n\nكل رسالة تتكون من ثلاثة أجزاء:\n\n- سطر البداية: الطريقة + المسار + الإصدار (GET /index.html HTTP/1.1) أو رمز الحالة في الاستجابة\n- الترويسات: أزواج اسم: قيمة تصف البيانات والسياق\n- سطر فارغ ثم الجسم (Body): البيانات الفعلية مثل HTML أو JSON\n\nعديمية الحالة ميزة هندسية تسمح بموازنة الأحمال بين عشرات الخوادم بلا تماسك جلسات، وتم التغلب على حدّها عبر الكوكيز والتوكنات كما سترى.",
          en: "HTTP is an application-layer protocol running over TCP (traditionally on port 80). It is a stateless protocol: each request is independent and the server remembers nothing about the previous one.\n\nEvery message consists of three parts:\n\n- The start line: method + path + version (GET /index.html HTTP/1.1), or the status code in a response\n- Headers: name: value pairs describing the data and context\n- A blank line, then the body: the actual payload such as HTML or JSON\n\nStatelessness is an engineering feature allowing load distribution across dozens of servers without session stickiness; its limit was overcome via cookies and tokens, as you will see.",
        },
      },
      {
        heading: { ar: "أفعال HTTP والسلامة والتكرارية", en: "HTTP Verbs: Safety and Idempotency" },
        table: {
          caption: { ar: "أفعال HTTP السبعة: الغرض والسلامة والتكرارية", en: "The seven HTTP verbs: purpose, safety, idempotency" },
          headers: [
            { ar: "الفعل", en: "Verb" },
            { ar: "الغرض", en: "Purpose" },
            { ar: "آمن؟", en: "Safe?" },
            { ar: "تكراري؟", en: "Idempotent?" },
          ],
          rows: [
            [
              { ar: "GET", en: "GET" },
              { ar: "قراءة مورد", en: "Read a resource" },
              { ar: "نعم", en: "Yes" },
              { ar: "نعم", en: "Yes" },
            ],
            [
              { ar: "POST", en: "POST" },
              { ar: "إنشاء أو إرسال للمعالجة", en: "Create or submit for processing" },
              { ar: "لا", en: "No" },
              { ar: "لا", en: "No" },
            ],
            [
              { ar: "PUT", en: "PUT" },
              { ar: "استبدال كامل للمورد", en: "Full replacement of a resource" },
              { ar: "لا", en: "No" },
              { ar: "نعم", en: "Yes" },
            ],
            [
              { ar: "PATCH", en: "PATCH" },
              { ar: "تعديل جزئي", en: "Partial modification" },
              { ar: "لا", en: "No" },
              { ar: "ليس بالضرورة", en: "Not necessarily" },
            ],
            [
              { ar: "DELETE", en: "DELETE" },
              { ar: "حذف مورد", en: "Remove a resource" },
              { ar: "لا", en: "No" },
              { ar: "نعم عملياً", en: "Practically yes" },
            ],
            [
              { ar: "HEAD", en: "HEAD" },
              { ar: "ترويسات GET بلا جسم", en: "GET headers with no body" },
              { ar: "نعم", en: "Yes" },
              { ar: "نعم", en: "Yes" },
            ],
            [
              { ar: "OPTIONS", en: "OPTIONS" },
              { ar: "اكتشاف الأفعال المدعومة", en: "Discover supported verbs" },
              { ar: "نعم", en: "Yes" },
              { ar: "نعم", en: "Yes" },
            ],
          ],
        },
        body: {
          ar: "الأفعال (Methods) تحدد ماذا تريد أن تفعل بالمورد (Resource):\n\n- GET: قراءة — آمن (لا يغير شيئاً) وقابل للتخزين المؤقت\n- POST: إنشاء أو إرسال بيانات للمعالجة — غير آمن وغير تكراري\n- PUT: استبدال كامل للمورد — تكراري (Idempotent): تنفيذه مرة أو عشر مرات يعطي النتيجة نفسها\n- PATCH: تعديل جزئي\n- DELETE: حذف — تكراري عملياً\n- HEAD: مثل GET لكن بلا جسم — لفحص الحجم والوجود فقط\n- OPTIONS: استكشاف الأفعال المدعومة (مهم في CORS)\n\nالتكرارية (Idempotency) ليست ترفاً نظرياً: عند فشل الشبكة وإعادة إرسال الطلب، التكرارية تحميك من عمليات مكررة مثل إنشاء طلب شراء مرتين.",
          en: "Methods define what you want to do with a resource:\n\n- GET: read — safe (changes nothing) and cacheable\n- POST: create or submit data for processing — unsafe and not idempotent\n- PUT: full replacement of the resource — idempotent: executing it once or ten times yields the same result\n- PATCH: partial modification\n- DELETE: remove — practically idempotent\n- HEAD: like GET but without a body — just to check existence and size\n- OPTIONS: discover supported verbs (important for CORS)\n\nIdempotency is not a theoretical luxury: when the network fails and a request is retried, idempotency protects you from duplicated operations such as creating a purchase order twice.",
        },
        tip: {
          ar: "قاعدة عملية: استخدم PUT للاستبدال الكامل و PATCH للتعديل الجزئي، ووازن بين POST و PUT بحسب تكرارية العملية عند إعادة المحاولة.",
          en: "Practical rule: use PUT for full replacement and PATCH for partial edits, and weigh POST vs PUT by whether the operation is safe to retry.",
        },
      },
      {
        heading: { ar: "أكواد الحالة: لغة الخادم", en: "Status Codes: The Server's Language" },
        table: {
          caption: { ar: "عائلات أكواد الحالة الخمس وأشهر رموزها", en: "The five status-code families and their famous codes" },
          headers: [
            { ar: "العائلة", en: "Family" },
            { ar: "المعنى", en: "Meaning" },
            { ar: "أشهر الرموز", en: "Famous codes" },
          ],
          rows: [
            [
              { ar: "1xx", en: "1xx" },
              { ar: "معلومات مؤقتة", en: "Informational" },
              { ar: "100 Continue، 101 Switching Protocols", en: "100 Continue, 101 Switching Protocols" },
            ],
            [
              { ar: "2xx", en: "2xx" },
              { ar: "نجاح الطلب", en: "Success" },
              { ar: "200 OK، 201 Created، 204 No Content، 206 Partial", en: "200 OK, 201 Created, 204 No Content, 206 Partial" },
            ],
            [
              { ar: "3xx", en: "3xx" },
              { ar: "إعادة توجيه", en: "Redirection" },
              { ar: "301 دائم، 302 مؤقت، 304 Not Modified، 307/308", en: "301 permanent, 302 temporary, 304 Not Modified, 307/308" },
            ],
            [
              { ar: "4xx", en: "4xx" },
              { ar: "خطأ من العميل", en: "Client error" },
              { ar: "400، 401، 403، 404، 405، 429", en: "400, 401, 403, 404, 405, 429" },
            ],
            [
              { ar: "5xx", en: "5xx" },
              { ar: "خطأ من الخادم أو البوابة", en: "Server or gateway error" },
              { ar: "500، 502، 503، 504", en: "500, 502, 503, 504" },
            ],
          ],
        },
        body: {
          ar: "كل استجابة تحمل رمزاً من ثلاث خانات، والخانة الأولى تحدد العائلة:\n\n- 1xx معلومات: 100 Continue أثناء الإرسال، 101 Switching Protocols (ترقية إلى WebSocket)\n- 2xx نجاح: 200 OK، 201 Created بعد إنشاء مورد، 204 No Content نجاح بلا جسم، 206 Partial Content مع التحميل الجزئي\n- 3xx إعادة توجيه: 301 دائم (غيّر الرابط في محركات البحث!)، 302 مؤقت، 304 Not Modified — نجاح التخزين المؤقت، 307/308 تحافظ على الفعل\n- 4xx خطأ العميل: 400 طلب سيئ التشكيل، 401 غير مُصادَق، 403 ممنوع رغم المصادقة، 404 غير موجود، 405 فعل غير مسموح، 418 أنا إبريق شاي (نكتة رسمية!)، 429 تجاوزت حد الطلبات\n- 5xx خطأ الخادم: 500 خطأ داخلي، 502 بوابة سيئة (الخادم الخلفي فشل)، 503 غير متاح حالياً، 504 انتهت مهلة البوابة\n\nمهندس الشبكات يقرأ هذه الرموز يومياً: 502 و 504 غالباً مشاكل شبكة/موازن أحمال وليست مشاكل تطبيق.",
          en: "Every response carries a three-digit code, and the first digit defines the family:\n\n- 1xx informational: 100 Continue mid-upload, 101 Switching Protocols (upgrade to WebSocket)\n- 2xx success: 200 OK, 201 Created after resource creation, 204 No Content success with no body, 206 Partial Content for range downloads\n- 3xx redirection: 301 permanent (update your links in search engines!), 302 temporary, 304 Not Modified — a caching win, 307/308 preserve the method\n- 4xx client errors: 400 malformed request, 401 unauthenticated, 403 forbidden despite authentication, 404 not found, 405 method not allowed, 418 I'm a teapot (an official joke!), 429 too many requests\n- 5xx server errors: 500 internal error, 502 bad gateway (backend failed), 503 unavailable, 504 gateway timeout\n\nNetwork engineers read these daily: 502 and 504 are usually network/load-balancer issues, not application bugs.",
        },
        code: {
          lang: "bash",
          snippet: "curl -i https://api.github.com/users/octocat\n\nHTTP/2 200\ncontent-type: application/json; charset=utf-8\ncache-control: public, max-age=60, s-maxage=60\n\n{ \"login\": \"octocat\", \"id\": 583231, ... }\n\ncurl -i https://example.com/missing\nHTTP/2 404",
        },
      },
      {
        heading: { ar: "الترويسات الأساسية والكوكيز", en: "Core Headers and Cookies" },
        body: {
          ar: "الترويسات هي البيانات الوصفية التي تصاحب كل رسالة. الأهم للشبكات:\n\n- Host: إجباري في HTTP/1.1 — يسمح باستضافة مئات المواقع على عنوان IP واحد (Virtual Hosting)\n- Content-Type: نوع الجسم مثل application/json أو text/html; charset=utf-8\n- Content-Length و Transfer-Encoding: chunked لطول الجسم\n- Cache-Control: قرارات التخزين المؤقت (max-age, no-cache, no-store)\n- Authorization: بيانات المصادقة (Bearer token, Basic)\n- User-Agent و Accept: وصف العميل وقدراته\n\nالكوكيز تحل مشكلة عديمية الحالة: الخادم يرسل Set-Cookie: session=abc123، فيعيد العميل هذه القيمة في كل طلب تالٍ، فيتعرف عليه الخادم. لهذا الكوكيز تعادل بطاقة هوية — وسرقتها تعني سرقة الجلسة.",
          en: "Headers are the metadata accompanying every message. The most important for networking:\n\n- Host: mandatory in HTTP/1.1 — enables hosting hundreds of sites on one IP (virtual hosting)\n- Content-Type: the body's media type such as application/json or text/html; charset=utf-8\n- Content-Length and Transfer-Encoding: chunked for body sizing\n- Cache-Control: caching decisions (max-age, no-cache, no-store)\n- Authorization: credentials (Bearer token, Basic)\n- User-Agent and Accept: describing the client and its capabilities\n\nCookies solve the statelessness problem: the server sends Set-Cookie: session=abc123, and the client returns that value with every subsequent request, letting the server recognize it. That makes cookies the equivalent of an ID card — stealing one means stealing the session.",
        },
      },
      {
        heading: { ar: "من HTTP/1.0 إلى HTTP/1.1: التحسينات", en: "From HTTP/1.0 to HTTP/1.1: The Improvements" },
        body: {
          ar: "HTTP/1.0 (1996) كان يفتح اتصال TCP جديداً لكل طلب — ثلاث مصافحات لكل صورة في الصفحة! HTTP/1.1 (1997) غيّر القواعد:\n\n- الاتصالات الدائمة (Persistent): إعادة استخدام اتصال واحد لطلبات متعددة\n- ترويسة Host الإجبارية: مواقع متعددة على IP واحد\n- النقل المجزأ (Chunked): إرسال بلا معرفة الطول مسبقاً\n- التخزين المؤقت المحسّن وترويسات Cache-Control\n\nلكن بقيت مشاكل: المتصفح يفتح 6 اتصالات فقط لكل مضيف (حد المصافحات)، والطلبات على الاتصال الواحد تخدم تباعاً — طلب بطيء يمنع من بعده (سنتعمق في الدرس القادم عن HTTP/2 و HTTP/3).",
          en: "HTTP/1.0 (1996) opened a new TCP connection per request — three handshakes for every image on a page! HTTP/1.1 (1997) changed the rules:\n\n- Persistent connections: reusing one connection for many requests\n- The mandatory Host header: many sites on one IP\n- Chunked transfer: sending without knowing the length in advance\n- Improved caching and Cache-Control headers\n\nProblems remained: the browser opens only 6 connections per host (handshake limit), and requests on one connection are served sequentially — one slow request blocks everything behind it (we will dive deep into HTTP/2 and HTTP/3 in the next lesson).",
        },
        tip: {
          ar: "الفرق بين 401 و 403: الأول (Unauthorized) يعني من أنت؟ — لا هوية. والثاني (Forbidden) يعني أعرف من أنت — لكن ليس لديك صلاحية.",
          en: "The 401 vs 403 difference: 401 (Unauthorized) means who are you? — no identity. 403 (Forbidden) means I know who you are — but you lack permission.",
        },
      },
    ],
    keyPoints: [
      { ar: "HTTP عديم الحالة فوق TCP، وكل رسالة: سطر بداية + ترويسات + جسم", en: "HTTP is stateless over TCP; every message: start line + headers + body" },
      { ar: "GET آمن وقابل للتخزين، PUT تكراري، POST لا هذا ولا ذاك", en: "GET is safe and cacheable, PUT is idempotent, POST is neither" },
      { ar: "عائلات الرموز: 1xx معلومات، 2xx نجاح، 3xx توجيه، 4xx خطأ العميل، 5xx خطأ الخادم", en: "Code families: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error" },
      { ar: "502 و 504 مؤشرات شبكة: فشل أو مهلة الخادم الخلفي خلف البوابة", en: "502 and 504 are network indicators: backend failure or timeout behind the gateway" },
      { ar: "ترويسة Host مكّنت الاستضافة الافتراضية، والكوكيز منحت الذاكرة للبروتوكول", en: "The Host header enabled virtual hosting; cookies gave the protocol memory" },
    ],
    commands: [
      { cmd: "curl -I https://example.com", desc: { ar: "جلب الترويسات فقط (طلب HEAD) لفحص الخادم والتخزين المؤقت", en: "Fetch headers only (HEAD request) to inspect server and caching" } },
      { cmd: "curl -v https://example.com", desc: { ar: "وضع التفصيل: يعرض الطلب والاستجابة كاملين", en: "Verbose mode: shows the full request and response" } },
      { cmd: "curl -X POST -d '{\"name\":\"Ali\"}' -H \"Content-Type: application/json\" https://api.example.com/users", desc: { ar: "إرسال JSON عبر POST مع تحديد نوع المحتوى", en: "Send JSON via POST with an explicit content type" } },
      { cmd: "curl -o /dev/null -s -w \"%{http_code}\" https://example.com", desc: { ar: "طباعة رمز الحالة فقط — مثالي للسكربتات والمراقبة", en: "Print only the status code — ideal for scripts and monitoring" } },
    ],
    quiz: [
      {
        q: { ar: "متصفح يعرض 504 Gateway Timeout. أين تكمن المشكلة الأرجح؟", en: "A browser shows 504 Gateway Timeout. Where does the problem most likely lie?" },
        options: [
          { ar: "في جهاز المستخدم", en: "In the user's device" },
          { ar: "في خادم DNS", en: "In the DNS server" },
          { ar: "في البوابة/الوكيل الذي لم يستلم رداً من الخادم الخلفي في الوقت المحدد", en: "In the gateway/proxy that got no timely response from the backend server" },
          { ar: "في كابل الشبكة", en: "In the network cable" },
        ],
        correct: 2,
        explain: { ar: "504 تعني أن البوابة (موازن أحمال أو وكيل) أرسلت الطلب للخادم الخلفي لكنه لم يجب خلال المهلة — مشكلة بين البوابة والخلفي، بعكس 500 التي تشير لخطأ في الخادم نفسه.", en: "504 means the gateway (load balancer or proxy) forwarded the request but the backend did not answer in time — a gateway-to-backend issue, unlike 500 which signals a server-side error." },
      },
      {
        q: { ar: "أي فعل يُعتبر آمناً (Safe) وتكرارياً (Idempotent) معاً؟", en: "Which method is both safe and idempotent?" },
        options: [
          { ar: "POST", en: "POST" },
          { ar: "DELETE", en: "DELETE" },
          { ar: "PUT", en: "PUT" },
          { ar: "GET", en: "GET" },
        ],
        correct: 3,
        explain: { ar: "GET يقرأ فقط (آمن) وتكراره يعطي النتيجة نفسها (تكراري). PUT تكراري لكنه ليس آمناً لأنه يعدّل المورد، وPOST ليس أياً منهما.", en: "GET only reads (safe) and repeating it yields the same result (idempotent). PUT is idempotent but not safe since it modifies the resource; POST is neither." },
      },
      {
        q: { ar: "ما الذي مكّن استضافة عشرات المواقع على عنوان IP واحد في HTTP/1.1؟", en: "What enabled hosting dozens of sites on one IP address in HTTP/1.1?" },
        options: [
          { ar: "سجل CNAME في DNS", en: "A DNS CNAME record" },
          { ar: "ترويسة Host في الطلب", en: "The Host header in the request" },
          { ar: "الكوكيز", en: "Cookies" },
          { ar: "رقم المنفذ 443", en: "Port number 443" },
        ],
        correct: 1,
        explain: { ar: "الطلب يصل لنفس ال IP لكنه يحمل Host: example.com، فيقرر الخادم أي موقع افتراضي يخدم — هذه هي الاستضافة الافتراضية (Virtual Hosting).", en: "The request reaches the same IP but carries Host: example.com, letting the server pick which virtual site to serve — this is virtual hosting." },
      },
      {
        q: { ar: "متى يفيد الفعل HEAD عملياً؟", en: "When is the HEAD method practically useful?" },
        options: [
          { ar: "عند إرسال ملفات كبيرة إلى الخادم", en: "When uploading large files to the server" },
          { ar: "عند حذف مورد نهائياً", en: "When permanently deleting a resource" },
          { ar: "عند فحص وجود مورد وحجمه دون تنزيل جسمه", en: "When checking a resource's existence and size without downloading its body" },
          { ar: "عند المصادقة المتبادلة", en: "During mutual authentication" },
        ],
        correct: 2,
        explain: { ar: "HEAD يرسل استجابة كاملة الترويسات بلا جسم: تعرف الحجم (Content-Length) والوجود والرمز دون تحميل البيانات — أساس أدوات مراقبة الروابط.", en: "HEAD returns full headers without a body: you learn the size (Content-Length), existence, and code without transferring data — the basis of link-monitoring tools." },
      },
    ],
  },
  {
    id: "l074",
    moduleId: "m08",
    order: 4,
    level: "intermediate",
    title: { ar: "HTTPS والمصافحة TLS خطوة بخطوة", en: "HTTPS and the TLS Handshake Step by Step" },
    summary: {
      ar: "كيف يؤمّن TLS الاتصال: التشفير الهجين، سلسلة شهادات الثقة، مصافحة TLS 1.2 كاملة، وثورة TLS 1.3 في السرعة والأمان.",
      en: "How TLS secures the connection: hybrid encryption, the certificate chain of trust, the full TLS 1.2 handshake, and the TLS 1.3 speed-and-security revolution.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "المشكلة التي يحلها HTTPS", en: "The Problem HTTPS Solves" },
        body: {
          ar: "HTTP نصّي مكشوف بالكامل: أي جهاز على المسار يستطيع قراءة كلمات المرور والكوكيز وتعديل المحتوى. HTTPS = HTTP داخل نفق TLS (Transport Layer Security) على المنفذ 443، ويحقق ثلاثة أهداف:\n\n- السرية (Confidentiality): لا أحد يقرأ البيانات عدا الطرفين — عبر التشفير المتماثل\n- السلامة (Integrity): أي تعديل في الطريق يُكتشف فوراً — عبر MAC\n- المصادقة (Authentication): أنت متصل فعلاً بخادم example.com وليس بمحتال — عبر الشهادة الرقمية\n\nهذه الثلاثة هي ثالوث CIA نفسه الذي سيلفى في وحدة الأمن — HTTPS أصدق تطبيق عملي له.",
          en: "HTTP is fully exposed plaintext: any device on the path can read passwords and cookies or alter content. HTTPS = HTTP inside a TLS (Transport Layer Security) tunnel on port 443, achieving three goals:\n\n- Confidentiality: nobody but the two parties reads the data — via symmetric encryption\n- Integrity: any in-transit modification is detected immediately — via a MAC\n- Authentication: you are truly connected to example.com, not an impostor — via the digital certificate\n\nThese three are the CIA triad itself, which you will meet again in the security module — HTTPS is its most honest practical application.",
        },
      },
      {
        heading: { ar: "التشفير الهجين: قوة الاثنين معاً", en: "Hybrid Encryption: The Best of Both" },
        table: {
          caption: { ar: "التشفير المتماثل مقابل غير المتماثل", en: "Symmetric vs asymmetric encryption" },
          headers: [
            { ar: "الخاصية", en: "Property" },
            { ar: "المتماثل", en: "Symmetric" },
            { ar: "غير المتماثل", en: "Asymmetric" },
          ],
          rows: [
            [
              { ar: "المفاتيح", en: "Keys" },
              { ar: "مفتاح واحد مشترك بين الطرفين", en: "One shared key between both parties" },
              { ar: "زوج: عام يُنشر وخاص يُحرس", en: "A pair: public published, private guarded" },
            ],
            [
              { ar: "السرعة", en: "Speed" },
              { ar: "عالية جداً — يشفر جيجابت كاملة", en: "Very fast — encrypts full gigabits" },
              { ar: "بطيئة بمراتب (~1000 ضعف)", en: "Orders of magnitude slower (~1000x)" },
            ],
            [
              { ar: "أمثلة", en: "Examples" },
              { ar: "AES-GCM، ChaCha20-Poly1305", en: "AES-GCM, ChaCha20-Poly1305" },
              { ar: "RSA، ECDSA، ECDHE", en: "RSA, ECDSA, ECDHE" },
            ],
            [
              { ar: "المشكلة التي يحلها", en: "Problem it solves" },
              { ar: "تشفير حجم البيانات الضخم", en: "Bulk data encryption" },
              { ar: "تبادل المفاتيح والتوقيع بين غرباء", en: "Key exchange and signing between strangers" },
            ],
            [
              { ar: "دوره في TLS", en: "Role in TLS" },
              { ar: "يحمي كل بيانات الجلسة", en: "Protects all session data" },
              { ar: "يُستخدم مرة واحدة في المصافحة", en: "Used once during the handshake" },
            ],
          ],
        },
        body: {
          ar: "صمّمت المنظومة من نوعين من التشفير:\n\n- التشفير غير المتماثل (مفتاح عام/خاص مثل RSA و ECDSA): يحل مشكلة تبادل المفاتيح بين طرفين لا يعرفان بعضهما، لكنه بطيء جداً لنقل بيانات ضخمة\n- التشفير المتماثل (AES-GCM و ChaCha20-Poly1305): سرعة هائلة وتشفير كامل للبيانات، لكن الطرفين يحتاجان المفتاح نفسه مسبقاً\n\nالحل الهندسي هو النموذج الهجين: تستخدم اللامتماثلية مرة واحدة في البداية لتبادل مفتاح جلسة (Session Key) سري صغير، ثم ينتقل كل التشفير الفعلي إلى المتماثلة السريعة.\n\n- مفتاح الجلسة فريد لكل اتصال ويموت بانتهائه\n- الأسرار الأمامية (Forward Secrecy): حتى لو سُرّب مفتاح الخادم الخاص مستقبلاً لا يمكن فك جلسات قديمة لأن مفاتيحها وُلدت مؤقتاً عبر ECDHE",
          en: "The system combines two encryption families:\n\n- Asymmetric encryption (public/private keys like RSA and ECDSA): solves the key-exchange problem between strangers, but is far too slow for bulk data\n- Symmetric encryption (AES-GCM, ChaCha20-Poly1305): massive speed and full data encryption, but both parties need the same key beforehand\n\nThe engineering answer is the hybrid model: asymmetry is used once, at the start, to exchange a small secret session key; all actual encryption then moves to fast symmetric ciphers.\n\n- The session key is unique per connection and dies with it\n- Forward Secrecy: even if the server's private key leaks in the future, old sessions cannot be decrypted because their keys were ephemeral, generated via ECDHE",
        },
        tip: {
          ar: "السرية الأمامية تعني أن تسريب مفتاح اليوم لا يفك تشفير حركة الأمس — لهذا أصبح ECDHE إلزامياً في TLS 1.3.",
          en: "Forward secrecy means today's key leak cannot decrypt yesterday's traffic — which is why ECDHE became mandatory in TLS 1.3.",
        },
      },
      {
        heading: { ar: "الشهادة وسلسلة الثقة", en: "The Certificate and Chain of Trust" },
        body: {
          ar: "الشهادة الرقمية (X.509) هي جواز سفر الخادم: تحمل اسم النطاق (Common Name/SAN)، المفتاح العام، فترة الصلاحية، وجهة الإصدار، وتوقيع جهة الإصدار (CA).\n\nلا تثق المتصفحات بالشهادة مباشرة، بل تتبع سلسلة الثقة:\n\n- الشهادة الطرفية (Leaf): شهادة example.com — موقعة من وسيط\n- الشهادة الوسيطة (Intermediate): CA وسيط موقّع من الجذر\n- شهادة الجذر (Root CA): مثبتة في متصفحك/نظامك مسبقاً — نقطة الثقة المطلقة\n\nالمتصفح يتحقق من: التوقيعات صحيحة على طول السلسلة، الاسم يطابق الموقع (عبر SAN)، الشهادة غير منتهية، ولم تُسحب (عبر OCSP أو قوائم CRL).\n\n- SNI (Server Name Indication): يرسل العميل الاسم المطلوب في بداية المصافحة ليقدم الخادم الشهادة الصحيحة من بين عشرات الشهادات على IP واحد\n- شهادة واحدة متعددة النطاقات عبر SAN، و Let's Encrypt جعلتها مجانية للجميع",
          en: "The digital certificate (X.509) is the server's passport: it carries the domain name (Common Name/SAN), public key, validity window, issuer, and the issuer's signature.\n\nBrowsers do not trust the certificate directly — they follow the chain of trust:\n\n- Leaf certificate: example.com's certificate — signed by an intermediate\n- Intermediate certificate: an intermediate CA signed by the root\n- Root certificate: pre-installed in your browser/OS — the absolute trust anchor\n\nThe browser verifies: signatures are valid along the chain, the name matches the site (via SAN), the certificate is unexpired, and it has not been revoked (via OCSP or CRL lists).\n\n- SNI (Server Name Indication): the client sends the requested name early in the handshake so the server presents the right certificate among dozens on one IP\n- One certificate covers many domains via SAN, and Let's Encrypt made them free for everyone",
        },
      },
      {
        heading: { ar: "مصافحة TLS 1.2 الكاملة", en: "The Full TLS 1.2 Handshake" },
        diagram: {
          kind: "flow",
          title: { ar: "خطوات مصافحة TLS 1.2 من ClientHello حتى البيانات", en: "TLS 1.2 handshake steps from ClientHello to data" },
          items: [
            { ar: "ClientHello: رقم عشوائي + مجموعات التشفير المدعومة", en: "ClientHello: random number + supported cipher suites" },
            { ar: "ServerHello: اختيار المجموعة + إرسال الشهادة وسلسلتها", en: "ServerHello: cipher choice + certificate chain" },
            { ar: "ServerKeyExchange: معاملات ECDHE موقّعة بالمفتاح الخاص", en: "ServerKeyExchange: ECDHE parameters signed with the private key" },
            { ar: "العميل يتحقق من الشهادة ويرسل معاملاته — اكتمال السر المشترك", en: "Client verifies the certificate and sends its share — secret complete" },
            { ar: "الطرفان يشتقان مفاتيح الجلسة عبر دالة PRF", en: "Both derive session keys via the PRF" },
            { ar: "ChangeCipherSpec + Finished ثم أول بايت مشفر", en: "ChangeCipherSpec + Finished, then the first encrypted byte" },
          ],
        },
        body: {
          ar: "كيف يتفق طرفان غريبان على مفتاح سري عبر قناة مكشوفة؟ هذا تسلسل TLS 1.2 (عند فتح أي موقع HTTPS):\n\n- 1) ClientHello: العميل يرسل رقم عشوائي Client Random ودعمه من مجموعات التشفير (Cipher Suites) وأعلى إصدار\n- 2) ServerHello: الخادم يرسل Server Random ويختار مجموعة التشفير، ثم يرسل شهادته + سلسلتها\n- 3) ServerKeyExchange: الخادم يرسل معاملاته المؤقتة ECDHE موقّعة بمفتاحه الخاص (إثبات الملكية + سرية أمامية)\n- 4) العميل يتحقق من الشهادة والسلسلة، ثم يرسل ClientKeyExchange بمعاملاته، فيمتلك الطرفان الآن المفتاح السري المسبق\n- 5) كلا الطرفين يبني مفاتيح الجلسة من Random + Secret عبر دالة PRF\n- 6) ChangeCipherSpec و Finished: التبديل إلى التشفير ورسالة تحقق أن كل ما سبق لم يُعبث به\n\nالتكلفة: 2 ذهاب وإياب (2-RTT) قبل أول بايت بيانات، وأجزاء كبيرة من المصافحة مكشوفة نصياً — وهذا ما أصلحه TLS 1.3.",
          en: "How do two strangers agree on a secret key over an open channel? Here is the TLS 1.2 sequence (on opening any HTTPS site):\n\n- 1) ClientHello: the client sends a Client Random, its supported cipher suites, and highest version\n- 2) ServerHello: the server sends a Server Random, picks the cipher suite, then presents its certificate chain\n- 3) ServerKeyExchange: the server sends its ephemeral ECDHE parameters signed with its private key (proof of ownership + forward secrecy)\n- 4) The client validates the certificate chain, then sends ClientKeyExchange with its parameters — both sides now hold the premaster secret\n- 5) Both derive the session keys from Random + Secret via the PRF function\n- 6) ChangeCipherSpec and Finished: switching to encryption plus a verification message proving nothing earlier was tampered with\n\nThe cost: 2 round trips (2-RTT) before the first data byte, and large parts of the handshake are visible in plaintext — exactly what TLS 1.3 fixed.",
        },
        code: {
          lang: "bash",
          snippet: "curl -v https://example.com 2>&1 | grep -E \"TLS|subject|SSL\"\n\n* TLSv1.3 (OUT), TLS handshake, Client hello\n* TLSv1.3 (IN), TLS handshake, Server hello\n* subject: CN=www.example.org\n* SSL certificate verify ok.",
        },
      },
      {
        heading: { ar: "ثورة TLS 1.3 والتطبيقات المتقدمة", en: "The TLS 1.3 Revolution and Advanced Uses" },
        body: {
          ar: "TLS 1.3 (RFC 8446، 2018) أعادت كتابة المصافحة:\n\n- 1-RTT: مصافحة كاملة في ذهاب وإياب واحد — العميل يرسل ClientHello + تخمينه للمفتاح فوراً\n- 0-RTT: للجلسات المتكررة، البيانات تُرسل مع الطلب الأول نفسه (مقابل خطر إعادة التشغيل Replay — تستخدمه المتصفحات لطلبات GET الآمنة فقط)\n- حذف الخوارزميات الضعيفة كلها: لا RSA key exchange (فلا سرية أمامية)، لا CBC، لا RC4، لا SHA-1\n- تشفير شهادة الخادم نفسها: حتى اسم الموقع المختبئ في الشهادة لم يعد مرئياً للمراقبين (باستثناء SNI غير المشفر — وجاء ECH لمعالجته)\n- ملاءمة HTTP/3: QUIC بُني على TLS 1.3 نفسها\n\nتطبيقات متقدمة: HSTS ترويسة تأمر المتصفح برفض HTTP نهائياً لهذا النطاق، و mTLS (المصادقة المتبادلة) يطلب من العميل شهادة أيضاً — أساس المصادقة بين الخدمات في المؤسسات الحديثة.",
          en: "TLS 1.3 (RFC 8446, 2018) rewrote the handshake:\n\n- 1-RTT: a complete handshake in a single round trip — the client sends ClientHello plus its key guess immediately\n- 0-RTT: for resumed sessions, data rides along with the very first flight (at the cost of replay risk — browsers use it for safe GET requests only)\n\n- Every weak algorithm removed: no RSA key exchange (hence mandatory forward secrecy), no CBC, no RC4, no SHA-1\n- The server certificate itself is encrypted: even the site name hidden inside it is no longer visible to observers (except plaintext SNI — being fixed by ECH)\n- HTTP/3 fit: QUIC is built on this very TLS 1.3\n\nAdvanced uses: the HSTS header orders browsers to refuse plain HTTP for the domain permanently, and mTLS (mutual TLS) demands a client certificate too — the backbone of service-to-service authentication in modern enterprises.",
        },
        tip: {
          ar: "لرؤية المصافحة حية: openssl s_client -connect example.com:443 -servername example.com ثم راقب مرحلة SSL handshake قبل البيانات.",
          en: "To watch the handshake live: openssl s_client -connect example.com:443 -servername example.com, then observe the SSL handshake stages before any data.",
        },
      },
    ],
    keyPoints: [
      { ar: "HTTPS = HTTP داخل TLS على المنفذ 443، ويحقق السرية والسلامة والمصادقة", en: "HTTPS = HTTP inside TLS on port 443, delivering confidentiality, integrity and authentication" },
      { ar: "النموذج الهجين: غير متماثل لتبادل المفتاح، متماثل لبيانات الجلسة", en: "Hybrid model: asymmetric for key exchange, symmetric for session data" },
      { ar: "سلسلة الثقة: شهادة طرفية ← وسيط ← جذر مثبت في نظامك", en: "Chain of trust: leaf ← intermediate ← root pre-installed in your OS" },
      { ar: "TLS 1.2 يستهلك 2-RTT، و TLS 1.3 يكتفي بـ 1-RTT (و 0-RTT للجلسات المعادة)", en: "TLS 1.2 costs 2-RTT; TLS 1.3 needs just 1-RTT (and 0-RTT for resumed sessions)" },
      { ar: "ECDHE يمنح السرية الأمامية: تسريب المفتاح مستقبلاً لا يفك جلسات الماضي", en: "ECDHE provides forward secrecy: a future key leak cannot decrypt past sessions" },
    ],
    commands: [
      { cmd: "openssl s_client -connect example.com:443 -servername example.com", desc: { ar: "عرض الشهادة وسلسلتها وتفاصيل جلسة TLS الحية", en: "Show the live certificate, its chain, and TLS session details" } },
      { cmd: "curl -v https://example.com", desc: { ar: "رؤية خطوات مصافحة TLS داخل curl بالتفصيل", en: "See the detailed TLS handshake steps inside curl" } },
      { cmd: "curl -svo /dev/null https://example.com 2>&1 | grep -i tls", desc: { ar: "استخراج أسطر TLS فقط من جلسة curl", en: "Extract only the TLS lines from a curl session" } },
      { cmd: "openssl x509 -in cert.pem -noout -dates -subject -issuer", desc: { ar: "فحص صلاحية شهادة ومالكها وجهة إصدارها", en: "Inspect a certificate's validity, subject and issuer" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا يستخدم TLS التشفير غير المتماثل ثم المتماثل في الاتصال نفسه؟", en: "Why does TLS use both asymmetric and symmetric encryption in the same connection?" },
        options: [
          { ar: "لأن المتماثل غير آمن نهائياً", en: "Because symmetric is completely insecure" },
          { ar: "اللامتماثل يحل تبادل المفاتيح لكنه بطيء، فتُستخدم المتماثلة السريعة لبيانات الجلسة", en: "Asymmetric solves key exchange but is slow, so fast symmetric ciphers handle the session data" },
          { ar: "لأن RFC يمنع استخدام نوع واحد", en: "Because the RFC forbids using one type" },
          { ar: "لتقليل حجم الشهادة", en: "To reduce certificate size" },
        ],
        correct: 1,
        explain: { ar: "النموذج الهجين هو قرار هندسي: اللامتماثلية (بطيئة ~1000 مرة) لتبادل مفتاح الجلسة فقط، ثم AES-GCM السريع لكل البيانات الفعلية.", en: "The hybrid model is an engineering decision: asymmetric (~1000x slower) only to exchange the session key, then fast AES-GCM for all actual data." },
      },
      {
        q: { ar: "شهادة خادم موقعك موقعة من CA وسيط. ماذا يفعل المتصفح للتحقق منها؟", en: "Your website certificate is signed by an intermediate CA. What does the browser do to verify it?" },
        options: [
          { ar: "يثق بها مباشرة لأنها موقعة", en: "Trusts it directly because it is signed" },
          { ar: "يبني السلسلة: يتحقق من توقيع الوسيط على شهادتك، ثم توقيع الجذر (المثبت لديه) على الوسيط", en: "Builds the chain: verifies the intermediate's signature on your cert, then the root's (pre-installed) signature on the intermediate" },
          { ar: "يرسل الشهادة إلى الخادم للتحقق", en: "Sends the certificate to the server for verification" },
          { ar: "يتحقق من وجود شهادة للعميل أولاً", en: "Checks for a client certificate first" },
        ],
        correct: 1,
        explain: { ar: "التحقق سلسلة رياضية صاعدة حتى شهادة جذر مثبتة مسبقاً في المخزن الموثوق — أي حلقة مفقودة أو توقيع فاسد يعني رفض الاتصال.", en: "Verification is an ascending mathematical chain up to a root certificate pre-installed in the trust store — any missing link or broken signature rejects the connection." },
      },
      {
        q: { ar: "ما أكبر تحسين في زمن الاتصال قدّمه TLS 1.3؟", en: "What is the biggest latency improvement TLS 1.3 introduced?" },
        options: [
          { ar: "ألغى الحاجة لشهادات تماماً", en: "It removed the need for certificates entirely" },
          { ar: "خفض المصافحة من 2-RTT إلى 1-RTT مع إمكانية 0-RTT للجلسات المعادة", en: "Cut the handshake from 2-RTT to 1-RTT, with 0-RTT possible for resumed sessions" },
          { ar: "استخدم UDP بدلاً من TCP", en: "It uses UDP instead of TCP" },
          { ar: "ضغط الشهادات إلى بايت واحد", en: "Compressed certificates to one byte" },
        ],
        correct: 1,
        explain: { ar: "في TLS 1.3 يرسل العميل معاملات المفتاح مع ClientHello مباشرة، فتكتمل المصافحة في جولة واحدة، وتسمح استعادة الجلسة بإرسال البيانات مبكراً (0-RTT).", en: "In TLS 1.3 the client sends key parameters with the ClientHello itself, completing the handshake in one round trip; session resumption allows early data (0-RTT)." },
      },
      {
        q: { ar: "خادم يستخدم RSA key exchange التقليدي (بلا ECDHE) وسُرّب مفتاحه الخاص اليوم. ماذا يحدث لحركة الاتصالات القديمة المسجلة؟", en: "A server used legacy RSA key exchange (no ECDHE) and its private key leaks today. What happens to previously recorded traffic?" },
        options: [
          { ar: "لا شيء — التشفير يحميها للأبد", en: "Nothing — encryption protects it forever" },
          { ar: "يمكن فك تشفيرها لأن مفتاح الجلسة اشتُق من المفتاح الخاص نفسه", en: "It can be decrypted because the session key was derived from that very private key" },
          { ar: "يمكن فكها فقط بموافقة جهة الإصدار", en: "It can only be decrypted with the issuer's consent" },
          { ar: "تُحذف تلقائياً من مسجلات المهاجم", en: "It is automatically deleted from the attacker's captures" },
        ],
        correct: 1,
        explain: { ar: "بدون سرية أمامية، المفتاح الخاص يستطيع فك تبادل المفاتيح القديم وبالتالي كل الجلسات المسجلة. مع ECDHE المؤقت (إلزامي في TLS 1.3) يصبح هذا مستحيلاً — هذه هي السرية الأمامية.", en: "Without forward secrecy, the private key unlocks the old key exchange and thus every recorded session. With ephemeral ECDHE (mandatory in TLS 1.3) this becomes impossible — that is forward secrecy." },
      },
    ],
  },
  {
    id: "l075",
    moduleId: "m08",
    order: 5,
    level: "intermediate",
    title: { ar: "HTTP/2 و HTTP/3: من التعدد الإرسالي إلى QUIC", en: "HTTP/2 and HTTP/3: From Multiplexing to QUIC" },
    summary: {
      ar: "لماذا وُلد HTTP/2 (التأطير الثنائي والتعدد الإرسالي و HPACK) وكيف حل HTTP/3 و QUIC مشكلة الازدحام في TCP نهائياً.",
      en: "Why HTTP/2 was born (binary framing, multiplexing, HPACK) and how HTTP/3 with QUIC finally solved TCP's head-of-line blocking.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "قيود HTTP/1.1 التي فرضت التغيير", en: "The HTTP/1.1 Limits That Forced Change" },
        body: {
          ar: "الصفحة الحديثة تحمّل 80-100 مورداً (صور و CSS و JS). HTTP/1.1 أمام هذا الواقع يعاني:\n\n- الازدحام على مستوى التطبيق (Application HOL): الطلبات على اتصال واحد تُخدم بالترتيب — طلب بطيء يحجز الاتصال ويجوّع البقية\n- الحل الجزئي: 6 اتصالات TCP لكل مضيف فقط (حد المتصفحات) — كل واحد مصافحة كاملة وبطء إعادة نقل بطيء\n- تكرار الترويسات: نفس User-Agent و Cookies الضخمة تُرسل حرفياً مع كل طلب — مئات الكيلوبايتات الضائعة\n- طلب نصي قابل للقراءة = كلفة تحليل أعلى ومساحة للهجمات\n\nالتحسينات الظرفية (Sprite images و Concatenation و Domain sharding و Inlining) كانت حلول تجميلية مكنت مؤقتاً لكنها شوهت تصميم الويب نفسه.",
          en: "A modern page loads 80-100 resources (images, CSS, JS). HTTP/1.1 suffers against this reality:\n\n- Application-layer head-of-line blocking: requests on one connection are served in order — a slow request hogs the connection and starves the rest\n- The partial fix: only 6 TCP connections per host (browser limit) — each a full handshake with slow slow-start\n- Header duplication: the same User-Agent and heavy cookies literally ride every request — hundreds of wasted kilobytes\n- Human-readable text = higher parsing cost and attack surface\n\nBand-aid optimizations (sprite images, concatenation, domain sharding, inlining) bought time but corrupted web design itself.",
        },
      },
      {
        heading: { ar: "HTTP/2: التأطير الثنائي والتعدد الإرسالي", en: "HTTP/2: Binary Framing and Multiplexing" },
        diagram: {
          kind: "flow",
          title: { ar: "كيف تتداخل تدفقات HTTP/2 على اتصال واحد", en: "How HTTP/2 streams interleave on one connection" },
          items: [
            { ar: "الطلبات المتعددة تُحوَّل إلى تدفقات Streams مستقلة", en: "Multiple requests become independent streams" },
            { ar: "كل رسالة تُجزَّأ إلى إطارات Frames ثنائية صغيرة", en: "Each message splits into small binary frames" },
            { ar: "إطارات التدفقات تتداخل بلا ترتيب على اتصال TCP واحد", en: "Frames from all streams interleave on one TCP connection" },
            { ar: "HPACK يضغط الترويسات بقاموس مشترك — لا تكرار", en: "HPACK compresses headers with a shared dictionary — no repeats" },
            { ar: "الاستجابات تُجمَّع لكل تيار — طلب بطيء لم يعد يحجب البقية", en: "Responses reassemble per stream — a slow one no longer blocks the rest" },
          ],
        },
        body: {
          ar: "HTTP/2 (RFC 7540، 2015، من أبحاث SPDY في Google) غيّر البنية الجوهرية:\n\n- طبقة تأطير ثنائية: كل رسالة تُقسم إلى إطارات (Frames) صغيرة قابلة للتحليل آلياً — لم يعد هناك نص يُقرأ\n- التدفقات (Streams): الاتصال الواحد يحمل عشرات التدفقات المتزامنة، كل تيار يحمل رسالة طلب/استجابة\n- التعدد الإرسالي (Multiplexing): إطارات التدفقات تتداخل بلا ترتيب — طلب بطيء لم يعد يحجب آخر، والحلول الظرفية القديمة أصبحت ضارة\n- HPACK: ضغط الترويسات بقاموس مشترك — الفرق: لن تُرسل User-Agent نفسه مرتين\n- الأولويات (Priorities): العميل يقترح ترتيب الأهمية (CSS قبل الصور)\n- Server Push: أرسل الموارد المرتبطة قبل طلبها (خفض الاستخدام لاحقاً بسبب التعقيد)\n\nكيف يتفق الطرفان على HTTP/2؟ عبر ALPN أثناء TLS (الاسم التفاوضي h2)، أو معرفة مسبقة cleartext (h2c) نادرة الاستخدام.",
          en: "HTTP/2 (RFC 7540, 2015, from Google's SPDY research) changed the core structure:\n\n- Binary framing layer: every message splits into small machine-parseable frames — no more readable text\n- Streams: one connection carries dozens of concurrent streams, each stream carrying one request/response message\n- Multiplexing: frames from different streams interleave freely — a slow request no longer blocks others, and the old band-aid tricks became harmful\n- HPACK: header compression with a shared dictionary — you never send the same User-Agent twice\n- Priorities: the client suggests importance ordering (CSS before images)\n- Server Push: deliver related resources before they are requested (later abandoned due to complexity)\n\nHow do peers agree on HTTP/2? Via ALPN during TLS (the negotiated name h2), or prior-knowledge cleartext (h2c), rarely used.",
        },
        code: {
          lang: "bash",
          snippet: "curl -I --http2 https://www.cloudflare.com\n\nHTTP/2 200\ndate: ...\ncontent-type: text/html\n\n# تفاوض البروتوكول عبر ALPN:\nopenssl s_client -connect www.cloudflare.com:443 -alpn h2 </dev/null 2>/dev/null | grep ALPN\n# ALPN protocol: h2",
        },
      },
      {
        heading: { ar: "المشكلة التي بقيت: ازدحام TCP نفسه", en: "The Remaining Problem: TCP's Own Head-of-Line Blocking" },
        body: {
          ar: "يبدو أن HTTP/2 حل كل شيء، لكن المعالجة انتقلت طبقة أدنى:\n\n- التدفقات المتعددة تعبر اتصال TCP واحداً\n- TCP يضمن تسليم البايتات بالترتيب — هذه وظيفته المقدسة\n- إذا ضاع جزء واحد (Packet Loss) ولو من تيار واحد، يوقف TCP تسليم كل البايتات التالية (من كل التيارات!) حتى يصل الجزء الناقص\n\nالنتيجة: صفحة على شبكة 1% فقد حزم: HTTP/2 المتعدد التدفقات قد يكون أبطأ من HTTP/1.1 بستة اتصالات — لأن الأضرار تتجمع في سلة واحدة.\n\nهذه ليست مشكلة HTTP بل مشكلة جوهرية في TCP عمرها عقود، وإصلاحها يتطلب تغيير بروتوكول النقل نفسه — وهنا يظهر QUIC.",
          en: "HTTP/2 looks like it solved everything, but the problem moved one layer down:\n\n- The many streams ride a single TCP connection\n- TCP guarantees in-order byte delivery — its sacred duty\n- If one segment is lost, even from a single stream, TCP withholds all following bytes (from every stream!) until the gap is repaired\n\nResult: on a network with 1% loss, multiplexed HTTP/2 can be slower than HTTP/1.1 over six connections — because the damage pools in one basket.\n\nThis is not an HTTP problem but a decades-old TCP core problem, and fixing it requires changing the transport itself — enter QUIC.",
        },
        tip: {
          ar: "قاعدة سريعة: ازدحام HTTP/2 = على مستوى التطبيق (حلّه التعدد الإرسالي)، ازدحام HTTP/3 = على مستوى النقل (حلّه QUIC).",
          en: "Quick rule: HTTP/2's blocking was at the application layer (solved by multiplexing); HTTP/3's was at the transport layer (solved by QUIC).",
        },
      },
      {
        heading: { ar: "QUIC و HTTP/3: إعادة اختراع النقل", en: "QUIC and HTTP/3: Reinventing the Transport" },
        table: {
          caption: { ar: "مقارنة أجيال HTTP الثلاثة", en: "Comparing the three HTTP generations" },
          headers: [
            { ar: "الخاصية", en: "Feature" },
            { ar: "HTTP/1.1", en: "HTTP/1.1" },
            { ar: "HTTP/2", en: "HTTP/2" },
            { ar: "HTTP/3", en: "HTTP/3" },
          ],
          rows: [
            [
              { ar: "بروتوكول النقل", en: "Transport" },
              { ar: "TCP", en: "TCP" },
              { ar: "TCP", en: "TCP" },
              { ar: "QUIC فوق UDP 443", en: "QUIC over UDP 443" },
            ],
            [
              { ar: "بنية الرسائل", en: "Message format" },
              { ar: "نصّي مقروء", en: "Readable text" },
              { ar: "إطارات ثنائية", en: "Binary frames" },
              { ar: "إطارات ثنائية", en: "Binary frames" },
            ],
            [
              { ar: "التعدد الإرسالي", en: "Multiplexing" },
              { ar: "لا — 6 اتصالات كحل جزئي", en: "No — 6 connections as a partial fix" },
              { ar: "نعم على اتصال واحد", en: "Yes, on one connection" },
              { ar: "نعم مع تيارات مستقلة", en: "Yes, with independent streams" },
            ],
            [
              { ar: "ازدحام رأس الطابور", en: "Head-of-line blocking" },
              { ar: "في التطبيق والنقل معاً", en: "Both application and transport" },
              { ar: "في طبقة النقل فقط", en: "Transport layer only" },
              { ar: "مُقضى عليه تقريباً", en: "Practically eliminated" },
            ],
            [
              { ar: "ضغط الترويسات", en: "Header compression" },
              { ar: "لا يوجد", en: "None" },
              { ar: "HPACK", en: "HPACK" },
              { ar: "QPACK", en: "QPACK" },
            ],
            [
              { ar: "زمن التأسيس المشفر", en: "Secure establishment" },
              { ar: "TCP + TLS منفصلان", en: "TCP + TLS separate" },
              { ar: "TCP + TLS منفصلان", en: "TCP + TLS separate" },
              { ar: "نقل وتشفير مدمجان: 1-RTT و0-RTT", en: "Transport + crypto fused: 1-RTT and 0-RTT" },
            ],
          ],
        },
        body: {
          ar: "QUIC (RFC 9000) بروتوكول نقل جديد من Google يعمل فوق UDP على المنفذ 443. لماذا UDP؟ لأن نشر بروتوكول جديد في طبقة النقل عبر أنظمة التشغيل والراوترات يحتاج عقوداً، أما UDP فالباب مفتوح دائماً.\n\n- TLS 1.3 مدمج داخلياً: لا طبقة نقل + أمن منفصلتان، بل مصافحة نقل ومصافحة تشفير واحدة — 1-RTT للمرة الأولى\n- 0-RTT للجلسات المعادة: البيانات مع أول حزمة\n- التيارات مستقلة في الاستعادة: فقدان حزمة من تيار يوقف هذا التيار فقط، وتستمر بقية التيارات — القضاء على ازدحام النقل\n- معرفات الاتصال (Connection IDs): الاتصال يُعرَّف بمعرف لا برباعية المنافذ — انتقل من Wi-Fi إلى شبكة الجوال ويتابع الاتصال نفسه حياً (Connection Migration) دون بدء من الصفر\n- استعادة فقدان أسرع وأذكى من TCP: إشارات ACK أكثر دقة وتصحيح نمطية لكل تيار\n\nHTTP/3 (RFC 9114) هو HTTP الدلالي فوق QUIC — الأفعال والترويسات والرموز نفسها التي تعرفها، بانسيابية أعلى. واكتشافه يتم عبر ترويسة Alt-Svc: الخادم يخبر العميل أثناء اتصال HTTP/2 أو 1.1: جربني عبر h3 على هذا العنوان.",
          en: "QUIC (RFC 9000) is a new transport protocol from Google running over UDP on port 443. Why UDP? Because deploying a new transport-layer protocol across operating systems and routers takes decades, while UDP is always open.\n\n- TLS 1.3 built-in: no separate transport + security — one transport-and-crypto handshake, 1-RTT for the first connection\n- 0-RTT for resumed sessions: data with the first packet\n- Independent per-stream recovery: a lost packet stalls only its stream while others continue — killing transport-layer blocking\n- Connection IDs: the connection is identified by an ID, not the port 4-tuple — switch from Wi-Fi to mobile data and the same connection lives on (connection migration) without starting over\n- Faster, smarter loss recovery than TCP: richer ACK signals and per-stream loss signaling\n\nHTTP/3 (RFC 9114) is HTTP semantics over QUIC — the same verbs, headers and codes you know, with better flow. Discovery happens via the Alt-Svc header: during an HTTP/2 or 1.1 connection the server says: try me via h3 at this endpoint.",
        },
      },
      {
        heading: { ar: "الواقع العملي والتبني", en: "Practical Reality and Adoption" },
        body: {
          ar: "كيف تعرف أي إصدار تتحدث به مع أي موقع؟\n\n- في أدوات مطوري المتصفح (F12): عمود Protocol في تبويب Network يظهر h2 أو h3\n- في curl: curl -I --http3 https://cloudflare.com (الإصدارات الحديثة تدعمها)\n- في Wireshark: فلتر http2 أو quic\n\nالتبني اليوم واسع: معظم المواقع الكبرى تدعم HTTP/2 (أكثر من 60% من المواقع الشائعة)، و HTTP/3 ينمو بسرعة عبر CDN الكبرى (Cloudflare و Google و Fastly) لأنها تستطيع تمكينه على مستوى الحافة بلا تغيير خوادم العملاء.\n\n- الشركات المُمكِّنة: CDN أولاً ثم تطبيقات المتصفحات ثم أدوات الخوادم\n- الدافع الأكبر في HTTP/3: الشبكات اللاسلكية المتقلبة حيث الفقد والتنقل بين الشبكات يومي",
          en: "How do you know which version you speak with a site?\n\n- In browser dev tools (F12): the Protocol column in the Network tab shows h2 or h3\n- In curl: curl -I --http3 https://cloudflare.com (recent builds support it)\n- In Wireshark: filter http2 or quic\n\nAdoption is broad: most major sites support HTTP/2 (over 60% of popular sites), and HTTP/3 grows fast through the big CDNs (Cloudflare, Google, Fastly) because they can enable it at the edge without changing customer servers.\n\n- The enablers: CDNs first, then browsers, then server tooling\n- HTTP/3's biggest driver: unstable wireless networks, where loss and network switching are daily life",
        },
      },
    ],
    keyPoints: [
      { ar: "HTTP/1.1 عانى ازدحام التطبيق وحد 6 اتصالات وتكرار الترويسات", en: "HTTP/1.1 suffered application-layer blocking, the 6-connection limit, and header duplication" },
      { ar: "HTTP/2: تأطير ثنائي + تعدد إرسالي على اتصال واحد + ضغط HPACK", en: "HTTP/2: binary framing + multiplexing on one connection + HPACK compression" },
      { ar: "TCP يسبب ازدحاماً في طبقة النقل: فقدان جزء واحد يوقف كل التيارات", en: "TCP causes transport-layer blocking: one lost segment stalls every stream" },
      { ar: "QUIC فوق UDP 443 مع TLS 1.3 مدمجة وتيارات مستقلة وترحيل اتصال حي", en: "QUIC over UDP 443 with built-in TLS 1.3, independent streams, and live connection migration" },
      { ar: "HTTP/3 يُكتشف عبر Alt-Svc، و ALPN هو ما يفاوض HTTP/2 فوق TLS", en: "HTTP/3 is discovered via Alt-Svc; ALPN negotiates HTTP/2 over TLS" },
    ],
    commands: [
      { cmd: "curl -I --http2 https://www.google.com", desc: { ar: "إجبار HTTP/2 وعرض الإصدار في سطر الحالة", en: "Force HTTP/2 and see the version in the status line" } },
      { cmd: "curl -I --http3 https://blog.cloudflare.com", desc: { ar: "اختبار HTTP/3 عبر QUIC على موقع يدعمه", en: "Test HTTP/3 over QUIC on a supporting site" } },
      { cmd: "openssl s_client -connect example.com:443 -alpn h2", desc: { ar: "التحقق من تفاوض HTTP/2 عبر ALPN في TLS", en: "Verify HTTP/2 negotiation via TLS ALPN" } },
      { cmd: "curl -svo /dev/null https://example.com 2>&1 | grep -iE \"HTTP|ALPN\"", desc: { ar: "عرض البروتوكول المتفاوض عليه ضمن تفاصيل curl", en: "Show the negotiated protocol within curl details" } },
    ],
    quiz: [
      {
        q: { ar: "شبكة عالية الفقد للحزم (2%). لماذا قد يتفوق HTTP/1.1 بست اتصالاته على HTTP/2 باتصاله الواحد؟", en: "On a network with 2% packet loss, why might HTTP/1.1 with its six connections beat HTTP/2's single connection?" },
        options: [
          { ar: "لأن HTTP/1.1 أحدث تقنياً", en: "Because HTTP/1.1 is more modern" },
          { ar: "لأن فقدان أي جزء TCP واحد يوقف جميع التدفقات الم multiplexed على الاتصال الواحد — بينما تتوزع الأضرار على ست اتصالات في 1.1", en: "Because one lost TCP segment stalls all multiplexed streams on the single connection — while damage spreads across six connections in 1.1" },
          { ar: "لأن HTTP/2 لا يدعم إعادة الإرسال", en: "Because HTTP/2 cannot retransmit" },
          { ar: "لأن HPACK يبطئ النقل", en: "Because HPACK slows transfer" },
        ],
        correct: 1,
        explain: { ar: "هذا هو ازدجاج رأس الطابور في طبقة النقل: ترتيب بايتات TCP مقدس، فيمنع تسليم كل ما بعد الفجوة. HTTP/1.1 يوزع الطلبات على اتصالات متعددة فلا تتأثر ببعضها.", en: "This is transport head-of-line blocking: TCP's byte ordering is sacred, so everything after the gap is withheld. HTTP/1.1 spreads requests across connections so they do not hurt each other." },
      },
      {
        q: { ar: "لماذا اختار مصممو QUIC بناءه فوق UDP بدلاً من بروتوكول نقل جديد مستقل؟", en: "Why did QUIC's designers build it over UDP rather than a brand-new transport protocol?" },
        options: [
          { ar: "لأن UDP أسرع دائماً من TCP", en: "Because UDP is always faster than TCP" },
          { ar: "لأن UDP يضمن التسليم الموثوق", en: "Because UDP guarantees reliable delivery" },
          { ar: "لأن نشر بروتوكول جديد في طبقة النقل يتطلب تعديل الأنظمة والراوترات عالمياً بينما UDP مدعوم في كل مكان فوراً", en: "Because deploying a new transport protocol requires worldwide OS and router changes, while UDP works everywhere immediately" },
          { ar: "لأن UDP مشفر افتراضياً", en: "Because UDP is encrypted by default" },
        ],
        correct: 2,
        explain: { ar: "طبقة النقل متجذرة في الأنظمة والوسطاء، واعتماد QUIC على UDP سمح بانتشاره في تطبيقات المستخدمين بسرعة سنوات بدلاً من عقود — و QUIC نفسه يضمن الموثوقية داخلياً.", en: "The transport layer is entrenched in OSes and middleboxes; building QUIC on UDP let it spread via user-space applications in years instead of decades — QUIC provides its own reliability internally." },
      },
      {
        q: { ar: "انتقل هاتفك من Wi-Fi إلى بيانات الجوال أثناء تنزيل عبر HTTP/3. ماذا يحدث؟", en: "Your phone switches from Wi-Fi to mobile data during an HTTP/3 download. What happens?" },
        options: [
          { ar: "يُقطع الاتصال ويبدأ التنزيل من الصفر", en: "The connection drops and the download restarts" },
          { ar: "يواصل الاتصال نفسه عبر معرف الاتصال (Connection ID) دون إعادة مصافحة — ترحيل الاتصال", en: "The same connection continues via its Connection ID without a new handshake — connection migration" },
          { ar: "يتحول البروتوكول تلقائياً إلى HTTP/1.1", en: "The protocol automatically downgrades to HTTP/1.1" },
          { ar: "تتوقف البيانات حتى يعود Wi-Fi", en: "Data pauses until Wi-Fi returns" },
        ],
        correct: 1,
        explain: { ar: "معرف الاتصال في QUIC مستقل عن عنوان IP ومنفذ المصدر، فيتعرف الخادم على الاتصال عبر الهوية ويستمر النقل على المسار الجديد.", en: "QUIC's connection ID is independent of the source IP and port, so the server recognizes the connection by identity and the transfer continues on the new path." },
      },
      {
        q: { ar: "ما وظيفة ترويسة Alt-Svc في تشغيل HTTP/3؟", en: "What does the Alt-Svc header do for HTTP/3 enablement?" },
        options: [
          { ar: "تجبر الخادم على استخدام HTTP/2", en: "It forces the server to use HTTP/2" },
          { ar: "تخبر العميل أثناء اتصال قائم أن الخادم متاح عبر HTTP/3 على هذا العنوان ليجربه", en: "It tells the client, during an existing connection, that the server is reachable via HTTP/3 at this endpoint to try" },
          { ar: "تحدد نوع المحتوى", en: "It specifies the content type" },
          { ar: "تضغط الترويسات", en: "It compresses headers" },
        ],
        correct: 1,
        explain: { ar: "الاكتشاف السلس: الخادم يعلن بديله (h3 على UDP 443 مثلاً)، فيجرب العميل QUIC في اتصاله التالي مع الرجوع الآمن للنسخة القديمة عند الفشل.", en: "Smooth discovery: the server advertises its alternative (e.g., h3 on UDP 443); the client tries QUIC next time with safe fallback to the old version on failure." },
      },
    ],
  },
  {
    id: "l076",
    moduleId: "m08",
    order: 6,
    level: "intermediate",
    title: { ar: "بروتوكولات البريد: SMTP و POP3 و IMAP", en: "Email Protocols: SMTP, POP3 and IMAP" },
    summary: {
      ar: "رحلة رسالة بريد من إرسالها حتى وصولها: MTA و MUA و MDA، ومقارنة POP3 بـ IMAP، وحماية البريد عبر SPF و DKIM و DMARC.",
      en: "The journey of an email from send to arrival: MTA, MUA, MDA, the POP3 vs IMAP comparison, and protecting mail with SPF, DKIM and DMARC.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "مكونات منظومة البريد", en: "The Anatomy of a Mail System" },
        diagram: {
          kind: "topology",
          title: { ar: "مسار رسالة بريد عبر أدوار المنظومة الأربعة", en: "An email's path across the four system roles" },
          nodes: ["MUA-المرسل", "MSA-587", "MTA-المرسل", "MTA-المستقبل", "MDA", "MUA-المستلم"],
          edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
        },
        body: {
          ar: "إرسال بريد واحد يمر عبر أربع مراحل متخصصة:\n\n- MUA (Mail User Agent): برنامجك — Outlook أو Thunderbird أو تطبيق الهاتف\n- MSA (Mail Submission Agent): يستقبل رسالتك من برنامجك ويسلّمها للبنية (يستخدم SMTP عادة المنفذ 587)\n- MTA (Mail Transfer Agent): خادم البريد — يبحث عن MX للنطاق الهدف عبر DNS وينقل الرسالة بين الخوادم (المنفذ 25)\n- MDA (Mail Delivery Agent): يضع الرسالة في صندوق المستلم النهائي\n\nمثال كامل: ترسل من Gmail إلى عنوان hotmail. خادم Gmail (MTA) يسأل DNS: ما MX الخاص بـ hotmail.com؟ يتصل بذاك الخادم على المنفذ 25 ويسلمها، فيضعها MDA في صندوق مستلمها، الذي يقرأها لاحقاً عبر IMAP.",
          en: "Sending a single email passes through four specialized stages:\n\n- MUA (Mail User Agent): your program — Outlook, Thunderbird, or a phone app\n- MSA (Mail Submission Agent): receives your message from your client and hands it into the infrastructure (usually SMTP on port 587)\n- MTA (Mail Transfer Agent): the mail server — looks up the destination domain's MX via DNS and relays the message between servers (port 25)\n- MDA (Mail Delivery Agent): drops the message into the recipient's final mailbox\n\nA full example: you send from Gmail to a hotmail address. Gmail's server (MTA) asks DNS: what is hotmail.com's MX? It connects to that server on port 25 and delivers; the MDA files it into the recipient's mailbox, who later reads it via IMAP.",
        },
      },
      {
        heading: { ar: "SMTP: بروتوكول الإرسال", en: "SMTP: The Sending Protocol" },
        body: {
          ar: "SMTP (Simple Mail Transfer Protocol) بروتوكول حوار نصي مبني على أوامر. المنافذ مهمة هنا:\n\n- 25: بين الخوادم (Server-to-Server) — كثير من مزودي المنازل يحجبونه لمنع الرسائل المزعجة\n- 587: الإرسال من برنامجك مع STARTTLS (ترقية الاتصال إلى تشفير بعد البدء)\n- 465: التشفير الضمني SSL/TLS من البداية\n\nحوار الإرسال الفعلي: EHLO للتعريف، MAIL FROM لتحديد المرسل، RCPT TO لكل مستلم، DATA ثم نص الرسالة وتنتهي بنقطة على سطر وحده، وأخيراً QUIT.\n\nكل هذا تعيشه في كل رسالة ترسلها — والتجربة اليدوية عبر openssl تعلمك البروتوكول أعمق من أي كتاب.",
          en: "SMTP (Simple Mail Transfer Protocol) is a text-dialog protocol built on commands. The ports matter here:\n\n- 25: server-to-server — most residential ISPs block it to fight spam\n- 587: submission from your client with STARTTLS (upgrading to encryption after starting)\n- 465: implicit SSL/TLS encryption from the start\n\nThe actual send dialog: EHLO to introduce yourself, MAIL FROM to set the sender, RCPT TO for each recipient, DATA followed by the message text ending with a lone dot, then QUIT.\n\nAll of this happens inside every message you send — and a manual openssl session teaches the protocol deeper than any book.",
        },
        code: {
          lang: "text",
          snippet: "S: 220 mail.example.com ESMTP ready\nC: EHLO client.example.com\nS: 250-mail.example.com / 250-STARTTLS / 250 SIZE 35882577\nC: MAIL FROM:<ali@example.com>\nS: 250 OK\nC: RCPT TO:<sara@hotmail.com>\nS: 250 OK\nC: DATA\nS: 354 Start mail input\nC: Subject: Hello ... .\nS: 250 OK queued as 8F2A1",
        },
        tip: {
          ar: "قاعدة ذهبية: المنفذ 587 للتسليم من العميل (مع مصادقة)، والمنفذ 25 بين الخوادم فقط — استخدام 587 حماية من تحويلك إلى مصدر رسائل مزعجة.",
          en: "Golden rule: port 587 for client submission (with authentication), port 25 strictly server-to-server — using 587 protects you from becoming a spam source.",
        },
      },
      {
        heading: { ar: "POP3 مقابل IMAP: تنزيل أم مزامنة؟", en: "POP3 vs IMAP: Download or Sync?" },
        table: {
          caption: { ar: "POP3 مقابل IMAP: مقارنة القرار", en: "POP3 vs IMAP: the decision comparison" },
          headers: [
            { ar: "الخاصية", en: "Feature" },
            { ar: "POP3", en: "POP3" },
            { ar: "IMAP", en: "IMAP" },
          ],
          rows: [
            [
              { ar: "المنافذ", en: "Ports" },
              { ar: "110 أو 995 مشفر", en: "110, or 995 encrypted" },
              { ar: "143 أو 993 مشفر", en: "143, or 993 encrypted" },
            ],
            [
              { ar: "موطن الرسائل", en: "Where mail lives" },
              { ar: "تُنزّل لجهازك وتُحذف من الخادم", en: "Downloaded to your device, deleted from server" },
              { ar: "تعيش على الخادم دائماً", en: "Live on the server permanently" },
            ],
            [
              { ar: "تعدد الأجهزة", en: "Multi-device" },
              { ar: "بلا مزامنة — كل جهاز رسائله", en: "No sync — each device its own mail" },
              { ar: "حالة واحدة موحدة في كل مكان", en: "One unified state everywhere" },
            ],
            [
              { ar: "الأعلام والمجلدات", en: "Flags and folders" },
              { ar: "غير مدعومة (مقروء محلياً فقط)", en: "Unsupported (local read state only)" },
              { ar: "مدعومة وتتزامن على الخادم", en: "Supported and synced server-side" },
            ],
            [
              { ar: "البحث", en: "Search" },
              { ar: "محلي بعد التنزيل", en: "Local, after download" },
              { ar: "على الخادم نفسه", en: "On the server itself" },
            ],
            [
              { ar: "الأنسب لمن", en: "Best for" },
              { ar: "جهاز واحد وخصوصية محلية بلا سحابة", en: "One device and local privacy without cloud" },
              { ar: "الهواتف المتعددة والعمل الحديث", en: "Multiple phones and modern work" },
            ],
          ],
        },
        body: {
          ar: "بروتوكولا الاستلام يحلان المشكلة نفسها بفلسفتين مختلفتين:\n\nPOP3 (منفذ 110 أو 995 مشفر):\n\n- الفلسفة: نزّل الرسائل إلى جهازك واحذفها من الخادم\n- ميزة: يعمل بدون اتصال دائم، وخزانة الخادم صغيرة\n- عيب: قرأت على الجهاز A؟ لن تجدها على الهاتف B — بلا مزامنة\n\nIMAP (منفذ 143 أو 993 مشفر):\n\n- الفلسفة: الرسائل تعيش على الخادم، وجهازك يرى نسخة متزامنة\n- ميزة: كل أجهزتك ترى الحالة نفسها (مقروء/مجلدات/أعلام)، والبحث على الخادم\n- عيب: مساحة خادم أكبر واعتماد على الاتصال\n\nعصر الهواتف المتعددة حسم المعركة لصالح IMAP — لكن POP3 يبقى خياراً مشروعاً لمن يريد نسخة محلية بلا سحابة.",
          en: "The two receiving protocols solve the same problem with opposite philosophies:\n\nPOP3 (port 110, or 995 encrypted):\n\n- Philosophy: download messages to your device and delete from the server\n- Advantage: works without constant connectivity; small server mailbox\n- Drawback: read on device A? You will not find it on phone B — no sync\n\nIMAP (port 143, or 993 encrypted):\n\n- Philosophy: messages live on the server; your device sees a synchronized view\n- Advantage: all devices share the same state (read/folders/flags), plus server-side search\n- Drawback: larger server storage and connectivity dependence\n\nThe multi-device era settled the battle for IMAP — though POP3 remains legitimate for those wanting a local copy with no cloud.",
        },
      },
      {
        heading: { ar: "ترويسات الرسالة وتتبع مسارها", en: "Message Headers and Tracing the Path" },
        body: {
          ar: "افتح أي رسالة واعرض مصدرها (Show Original) ستجد تاريخاً كاملاً فوق رأسك:\n\n- Received: ترويسة تُضاف في كل MTA يعبر — قراءتها من الأسفل للأعلى تعطيك المسار الكامل مع أزمنة كل قفزة\n- From و To و Subject و Date: العناوين الظاهرة\n- Message-ID: معرف فريد للرسالة\n- Return-Path: عنوان ارتداد الأخطاء\n- MIME-Version و Content-Type: البنية متعددة الأجزاء (نص + HTML + مرفقات)\n\nإذا انتهت رسالة بريد 10 دقائق في الوصول، ترويسات Received تخبرك بالضبط أي خادم أبطأ في المسار — تشخيص شبكي حقيقي داخل البريد.",
          en: "Open any message and view its source (Show Original) — you will find a complete history above your head:\n\n- Received: a header added by every MTA it crosses — reading bottom-up gives the full path with per-hop timestamps\n- From, To, Subject, Date: the visible addresses\n- Message-ID: the message's unique identifier\n- Return-Path: where error bounces go\n- MIME-Version and Content-Type: the multipart structure (text + HTML + attachments)\n\nIf an email takes 10 minutes to arrive, the Received headers tell you exactly which server lagged — real network diagnostics inside mail.",
        },
      },
      {
        heading: { ar: "SPF و DKIM و DMARC: محاربة التزييف", en: "SPF, DKIM and DMARC: Fighting Spoofing" },
        body: {
          ar: "مشكلة SMTP التاريخية: أي خادم يستطيع الادعاء أنه يرسل من أي نطاق! الحل الحديث ثلاث طبقات تُنشر كسجلات TXT في DNS:\n\n- SPF: قائمة الخوادم المخوّلة بالإرسال باسم نطاقك — v=spf1 include:_spf.google.com ~all\n- DKIM: يوقّع خادمك الرسالة توقيعاً رقمياً بمفتاح خاص، وينشر المفتاح العام في DNS — يثبت أن الرسالة لم تُعدّل في الطريق\n- DMARC: سياسة تجمع النتيجتين وتحدد ماذا يفعل المستلم عند الفشل (none/quarantine/reject) وترسل تقارير ملكية\n\nمع الثلاثة مجتمعة، انتحال نطاقك يصبح شبه مستحيل، ورسائلك تصل للبريد الرئيسي لا للرسائل المزعجة — وهو اليوم شرط إلزامي لدى Gmail و Microsoft للإرسال الجماعي.",
          en: "SMTP's historic flaw: any server can claim to send from any domain! The modern answer is three layers published as TXT records in DNS:\n\n- SPF: the list of servers authorized to send on your domain's behalf — v=spf1 include:_spf.google.com ~all\n- DKIM: your server signs each message with a private key, publishing the public key in DNS — proving the message was not altered en route\n- DMARC: a policy combining both results, defining receiver action on failure (none/quarantine/reject) and sending owner reports\n\nWith all three together, spoofing your domain becomes nearly impossible and your mail lands in the inbox, not spam — today a mandatory requirement at Gmail and Microsoft for bulk senders.",
        },
      },
    ],
    keyPoints: [
      { ar: "الرحلة: MUA ← MSA ← MTA (بحث MX) ← MDA ← صندوق المستلم", en: "The journey: MUA ← MSA ← MTA (MX lookup) ← MDA ← recipient mailbox" },
      { ar: "SMTP: 25 بين الخوادم، 587 تسليم العميل مع STARTTLS، 465 تشفير ضمني", en: "SMTP: 25 server-to-server, 587 client submission with STARTTLS, 465 implicit encryption" },
      { ar: "POP3 ينزّل ويحذف (بلا مزامنة)، و IMAP يزامن الحالة عبر كل الأجهزة", en: "POP3 downloads and deletes (no sync); IMAP syncs state across all devices" },
      { ar: "ترويسات Received تتبع مسار الرسالة خادماً خادماً بأزمنة القفزات", en: "Received headers trace the message's path server by server with hop timestamps" },
      { ar: "SPF يحدد المرسلين، DKIM يوقع، و DMARC يضع السياسة والتقارير", en: "SPF lists senders, DKIM signs, DMARC sets policy and reporting" },
    ],
    commands: [
      { cmd: "dig MX gmail.com +short", desc: { ar: "عرض خوادم البريد المستقبلة لنطاق Gmail", en: "Show Gmail's receiving mail servers" } },
      { cmd: "dig TXT gmail.com +short", desc: { ar: "عرض سجل SPF الخاص بالنطاق", en: "Show the domain's SPF record" } },
      { cmd: "openssl s_client -connect smtp.gmail.com:465", desc: { ar: "الاتصال المشفر بخادم SMTP لرؤية ترحيبه", en: "Open an encrypted connection to an SMTP server to see its greeting" } },
      { cmd: "dig TXT default._domainkey.example.com +short", desc: { ar: "عرض المفتاح العام DKIM لنطاق", en: "Show a domain's DKIM public key" } },
    ],
    quiz: [
      {
        q: { ar: "يريد خادم Gmail تسليم رسالة إلى المستلم sara@hotmail.com. ما أول خطوة يفعلها؟", en: "Gmail's server wants to deliver a message to sara@hotmail.com. What is its first step?" },
        options: [
          { ar: "الاتصال بالمنفذ 587 مباشرة", en: "Connect directly to port 587" },
          { ar: "استعلام DNS عن سجلات MX الخاصة بـ hotmail.com", en: "A DNS query for hotmail.com's MX records" },
          { ar: "البحث عن سجل PTR", en: "Look up the PTR record" },
          { ar: "إرسال الرسالة عبر IMAP", en: "Send the message via IMAP" },
        ],
        correct: 1,
        explain: { ar: "سجلات MX تحدد الخوادم المستقبلة وأولوياتها، فيتصل MTA بالأفضل منها على المنفذ 25 لتسليم الرسالة.", en: "MX records identify the receiving servers and their priorities; the MTA then contacts the best one on port 25 to deliver." },
      },
      {
        q: { ar: "مستخدم يقرأ بريده من حاسوب مكتبي وهاتف وصفحته على الويب ويريد الحالة نفسها في كل مكان. أي بروتوكول يخدمه؟", en: "A user reads mail from a desktop client, a phone, and webmail, wanting the same state everywhere. Which protocol serves them?" },
        options: [
          { ar: "POP3", en: "POP3" },
          { ar: "SMTP", en: "SMTP" },
          { ar: "IMAP", en: "IMAP" },
          { ar: "FTP", en: "FTP" },
        ],
        correct: 2,
        explain: { ar: "IMAP يخزن الرسائل على الخادم ويزامن الأعلام والمجلدات لكل العملاء — بينما POP3 ينزّل الرسالة لجهاز واحد ويحذفها عادة من الخادم.", en: "IMAP keeps messages on the server and syncs flags and folders across all clients — whereas POP3 downloads to a single device and usually deletes from the server." },
      },
      {
        q: { ar: "رسالة تأخرت 15 دقيقة في الوصول. كيف تحدد الخادم البطيء في المسار؟", en: "A message took 15 minutes to arrive. How do you identify the slow server in the path?" },
        options: [
          { ar: "من سجل SPF", en: "From the SPF record" },
          { ar: "بقراءة ترويسات Received من الأسفل للأعلى ومقارنة أزمنتها", en: "By reading the Received headers bottom-up and comparing their timestamps" },
          { ar: "بفحص Message-ID", en: "By checking the Message-ID" },
          { ar: "بالاتصال بالمنفذ 25", en: "By connecting to port 25" },
        ],
        correct: 1,
        explain: { ar: "كل MTA يضيف ترويسة Received مع زمنه — الفجوة الزمنية الكبيرة بين ترويستين متتاليتين تكشف الخادم الذي احتجز الرسالة.", en: "Every MTA appends a Received header with its timestamp — a large time gap between two consecutive headers reveals the server that held the message." },
      },
      {
        q: { ar: "ما الذي يثبته DKIM للمستلم؟", en: "What does DKIM prove to the recipient?" },
        options: [
          { ar: "أن المرسل ليس في قائمة سوداء", en: "That the sender is not blacklisted" },
          { ar: "أن الرسالة سُلّمت عبر HTTPS", en: "That the message traveled over HTTPS" },
          { ar: "أن الرسالة موقّعة من نطاق معلوم ولم تتغير أثناء النقل", en: "That the message is signed by a known domain and was not modified in transit" },
          { ar: "أن الرسالة ليست رسالة مزعجة", en: "That the message is not spam" },
        ],
        correct: 2,
        explain: { ar: "DKIM توقيع رقمي بمفتاح خاص يُتحقق منه بالمفتاح المنشور في DNS — يثبت الهوية والسلامة، أما الحكم بالرسائل المزعجة فهو مجموع إشارات منها DMARC والسمعة.", en: "DKIM is a digital signature with a private key verified via the DNS-published public key — it proves identity and integrity; the spam verdict combines multiple signals including DMARC and reputation." },
      },
    ],
  },
  {
    id: "l077",
    moduleId: "m08",
    order: 7,
    level: "intermediate",
    title: { ar: "DHCP وعملية DORA و Agents الترحيل", en: "DHCP, the DORA Process and Relay Agents" },
    summary: {
      ar: "كيف يستلم جهازك عنوان IP آلياً: اكتشاف، عرض، طلب، إقرار — بث رسائل البث الأربع، دورة حياة التأجير، وإعداد الخادم على Cisco IOS.",
      en: "How your device gets an IP automatically: Discover, Offer, Request, Ack — the four broadcast messages, the lease lifecycle, and server setup on Cisco IOS.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "لماذا DHCP؟", en: "Why DHCP?" },
        body: {
          ar: "الإعداد اليدوي (Static) لكل جهاز كارثة إدارية: من يوزع؟ من يسجل؟ من يصلح التعارض؟ من يغير الشبكة الفرعية لـ 500 جهاز ليلة السبت؟\n\nDHCP (Dynamic Host Configuration Protocol) يؤتمت المهمة كلها: خادم واحد يوزع العناوين والإعدادات مركزياً لآلاف الأجهزة.\n\n- يوزع: عنوان IP وقناع الشبكة الفرعية\n- البوابة الافتراضية وخوادم DNS\n- نطاق أسماء النطاق وخيارات إضافية (خيار 150 لخادم TFTP في شبكات الصوت!)\n- يمنع التعارضات عبر تتبع الإيجارات واختبار العناوين قبل منحها\n\nيعمل على UDP: العميل 68 والخادم 67 — لماذا UDP؟ لأن العميل بلا عنوان أصلاً فلا يمكنه إكمال مصافحة TCP!",
          en: "Manual (static) configuration per device is an administrative disaster: who assigns, who records, who fixes conflicts, who re-subnets 500 devices on Saturday night?\n\nDHCP (Dynamic Host Configuration Protocol) automates it all: one server centrally assigns addresses and settings to thousands of devices.\n\n- It hands out: the IP address and subnet mask\n- The default gateway and DNS servers\n- The domain name and extra options (option 150 for the TFTP server in voice networks!)\n- It prevents conflicts by tracking leases and probing addresses before granting them\n\nIt runs over UDP: client 68, server 67 — why UDP? Because the client has no address at all yet, so it cannot even complete a TCP handshake!",
        },
      },
      {
        heading: { ar: "عملية DORA: أربع رسائل تبدأ حياة الجهاز", en: "The DORA Process: Four Messages Start a Device's Life" },
        diagram: {
          kind: "flow",
          title: { ar: "رسائل DORA الأربع بالترتيب", en: "The four DORA messages in order" },
          items: [
            { ar: "Discover: بث من 0.0.0.0 إلى 255.255.255.255 — هل من خادم؟", en: "Discover: broadcast from 0.0.0.0 to 255.255.255.255 — any server?" },
            { ar: "Offer: خادم يعرض عنواناً محجوزاً مؤقتاً مع الإعدادات", en: "Offer: a server proposes a temporarily reserved address with settings" },
            { ar: "Request: العميل يقبل العرض بثاً ليُعلم بقية الخوادم", en: "Request: the client accepts by broadcast, informing the other servers" },
            { ar: "ACK: الخادم يثبّت الملكية والمدة فينشط العميل العنوان", en: "ACK: the server confirms ownership and duration; the client activates the address" },
            { ar: "ARP probe: فحص أخير للتأكد أن العنوان غير مستخدم", en: "ARP probe: a final check that the address is unused" },
          ],
        },
        body: {
          ar: "الجهاز الجديد بلا عنوان يرسل Discover من 0.0.0.0 إلى 255.255.255.255 (بث عام layer 2 أيضاً من MAC للبث FF:FF:FF:FF:FF:FF) حاملاً معرفه (Client ID أو MAC).\n\n- D — Discover: هل من خادم DHCP هنا؟\n- O — Offer: خادم ما يعرض عليك: خذ 192.168.1.50 مع هذه الإعدادات (يُحجز لك مؤقتاً)\n- R — Request: العميل يطلب العنوان المعروض — لكن بثاً وليس أحادياً! لماذا؟ ليعلم بقية الخوادم أن عروضها رُفضت فتحرر حجوزاتها\n- A — ACK: الخادم يؤكد الملكية نهائياً، فيفعّل العميل العنوان ويبدأ العمل\n\nبعدها يرسل العميل ARP probing للتأكد أن لا أحد يستخدم العنوان فعلاً (كشف الخوادم الوهمية)، ويسجل البوابة في جدول ARP.\n\nعند الترقب الشبكي، هذه الرسائل الأربع تظهر بوضوح في Wireshark بفلتر bootp — أول مكان تنظر إليه عندما لا يستلم جهاز عنواناً.",
          en: "The address-less new device sends a Discover from 0.0.0.0 to 255.255.255.255 (also a layer-2 broadcast to FF:FF:FF:FF:FF:FF) carrying its identifier (Client ID or MAC).\n\n- D — Discover: any DHCP server here?\n- O — Offer: some server offers: take 192.168.1.50 with these settings (reserved for you temporarily)\n- R — Request: the client claims the offered address — but as a broadcast, not unicast! Why? So the other servers learn their offers were declined and free their reservations\n- A — ACK: the server confirms final ownership; the client activates the address and starts working\n\nAfterwards the client sends ARP probes to confirm nobody actually uses the address (rogue server detection) and registers the gateway in its ARP table.\n\nWhen troubleshooting, these four messages show clearly in Wireshark with the bootp filter — the first place to look when a device gets no address.",
        },
        tip: { ar: "إن رأيت في Wireshark عروضاً (Offer) بلا طلب يليها، فالرسائل تصل من الخادم ولا تصل عائدة منه — راجع قواعد الجدار الناري أو النطاق الهرمي للـ VLAN.", en: "If Wireshark shows Offers with no Request following, messages reach the client but its replies cannot return — check firewall rules or the VLAN hierarchy." },
      },
      {
        heading: { ar: "دورة حياة الإيجار: التجديد قبل الانتهاء", en: "The Lease Lifecycle: Renewal Before Expiry" },
        table: {
          caption: { ar: "عتبات دورة حياة إيجار DHCP", en: "DHCP lease lifecycle thresholds" },
          headers: [
            { ar: "العتبة", en: "Threshold" },
            { ar: "التوقيت", en: "Timing" },
            { ar: "سلوك العميل", en: "Client behavior" },
          ],
          rows: [
            [
              { ar: "T1 — التجديد", en: "T1 — Renewal" },
              { ar: "50% من مدة الإيجار", en: "50% of the lease" },
              { ar: "DHCPREQUEST أحادي مباشرة للخادم الأصلي", en: "Unicast DHCPREQUEST straight to the original server" },
            ],
            [
              { ar: "T2 — إعادة الارتباط", en: "T2 — Rebinding" },
              { ar: "87.5% من المدة", en: "87.5% of the term" },
              { ar: "DHCPREQUEST بثاً يقبله أي خادم", en: "Broadcast DHCPREQUEST any server may accept" },
            ],
            [
              { ar: "انتهاء المدة", en: "Expiry" },
              { ar: "100% من المدة", en: "100% of the term" },
              { ar: "تخلٍّ عن العنوان وعودة إلى Discover", en: "Release the address and restart at Discover" },
            ],
            [
              { ar: "مثال عملي: إيجار 8 أيام", en: "Worked example: 8-day lease" },
              { ar: "اليوم 4 ثم 7 ثم 8", en: "Day 4, then 7, then 8" },
              { ar: "تجديد أحادي ثم بث ثم تخلٍّ نهائي", en: "Unicast renewal, then broadcast, then final release" },
            ],
          ],
        },
        body: {
          ar: "الإيجار (Lease) ليس ملكية أبدية. الخادم يمنح العنوان لمدة محددة (ساعة، يوم، أسبوع)، والعميل يدير دورة حياته عبر عتبتين:\n\n- T1 = 50% من مدة الإيجار: العميل يحاول التجديد بإرسال DHCPREQUEST أحادي الاتجاه مباشرة إلى خادمه الأصلي — بلا DORA كاملة، مجرد طلب وتأكيد\n- T2 = 87.5% من المدة: إن فشل الخادم الأصلي، يرسل Request بثاً يقبلَه أي خادم (إعادة الارتباط Rebinding)\n- انتهاء المدة 100%: العميل يتخلى عن العنوان ويعود إلى مرحلة Discover من الصفر\n\nالتصميم عبقري: العنوان لا يُسحب فجأة بل هناك فرصتان للتجديد، والخادم يستعيد العناوين تلقائياً من الأجهزة الغائبة (من غادر الشبكة بلا إفلات Graceful Release).\n\n- إيجارات قصيرة للشبكات الزائرة (ضيوف وكافيهات): 1-4 ساعات\n- إيجارات طويلة للمكاتب المستقرة: 8 أيام فأكثر لتقليل حركة DHCP",
          en: "A lease is not eternal ownership. The server grants the address for a finite window (an hour, a day, a week), and the client manages its lifecycle through two thresholds:\n\n- T1 = 50% of the lease: the client attempts renewal by sending a unicast DHCPREQUEST straight to its original server — no full DORA, just request and confirmation\n- T2 = 87.5%: if the original server has failed, the client broadcasts a Request that any server may accept (rebinding)\n- 100% expiry: the client releases the address and restarts from the Discover phase\n\nThe design is brilliant: the address is never yanked away — there are two renewal chances — and the server automatically reclaims addresses from vanished devices (those that left without a graceful release).\n\n- Short leases for transient networks (guests, cafés): 1-4 hours\n- Long leases for stable offices: 8+ days to reduce DHCP chatter",
        },
      },
      {
        heading: { ar: "مُرحِّل DHCP: عبور حدود البث", en: "DHCP Relay: Crossing the Broadcast Boundary" },
        body: {
          ar: "المعضلة: رسائل DORA كلها بث، والراوتر — بطبيعته — لا يمرر البث بين الشبكات. فهل نشغل خادم DHCP في كل شبكة فرعية؟\n\nالحل: مُرحِّل DHCP (Relay Agent) على الراوتر. يستقبل البث من العملاء ويحوّله إلى أحادي موجّه للخادم الحقيقي في شبكة أخرى:\n\n- يضيف حقل giaddr (Gateway IP Address) يحمل عنوان الشبكة التي جاء منها الطلب\n- الخادم يقرأ giaddr فيعرف من أي نطاق (Pool) يمنح العنوان\n- الرد يعود إلى الراوتر الذي يمرره للعميل\n\nعلى Cisco: interface GigabitEthernet0/1 ثم ip helper-address 10.0.20.5 — سطر واحد يربط شبكة كاملة بخادم مركزي.\n\nانتبه: العبارة ip helper-address تُرحّل بروتوكولات UDP أخرى أيضاً (TFTP 69, DNS 53, NTP 123...) — سلوك مفيد في شبكات الصوت Cisco، لكن قد تحتاج تقييده بـ ip forward-protocol.",
          en: "The dilemma: DORA messages are all broadcast, and the router — by nature — does not forward broadcasts between subnets. Must we run a DHCP server in every subnet?\n\nThe solution: a DHCP relay agent on the router. It receives the clients' broadcasts and converts them into unicast toward the real server in another network:\n\n- It adds the giaddr field (Gateway IP Address) carrying the requesting subnet's address\n- The server reads giaddr and knows which pool to allocate from\n- The reply returns to the router, which forwards it to the client\n\nOn Cisco: interface GigabitEthernet0/1, then ip helper-address 10.0.20.5 — one line ties an entire subnet to a central server.\n\nNote: ip helper-address also relays other UDP protocols (TFTP 69, DNS 53, NTP 123...) — useful in Cisco voice networks, but you may restrict it with ip forward-protocol.",
        },
        code: {
          lang: "cisco",
          snippet: "! تكوين خادم DHCP على موجه Cisco IOS\nip dhcp excluded-address 192.168.10.1 192.168.10.10\n!\nip dhcp pool OFFICE\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 8.8.8.8 1.1.1.1\n domain-name netmastery.local\n lease 4\n!\ninterface GigabitEthernet0/1\n ip address 192.168.10.1 255.255.255.0\n ip helper-address 10.0.20.5   ! إذا كان الخادم مركزياً",
        },
      },
      {
        heading: { ar: "DHCPv6 والأمان: من يحرس الخادم؟", en: "DHCPv6 and Security: Who Guards the Server?" },
        body: {
          ar: "في عالم IPv6 تغيرت الفلسفة: التهيئة الذاتية SLAAC تتيح للجهاز توليد عنوانه بنفسه من إعلانات الراوتر (RA) بلا خادم أصلاً — لكن DHCPv6 يبقى ضرورياً لعناوين مركزية وأسماء DNS:\n\n- Stateless DHCPv6 (خيار فقط): SLAAC للعنوان، و DHCPv6 للإعدادات\n- Stateful DHCPv6 (الكامل): الخادم يمنح كل شيء كما في IPv4 — منفذا 546/547\n\nعلى جانب الأمان، أخطر هجوم DHCP هو الخادم الوهمي (Rogue DHCP): جهاز خبيث يرسل Offers فتستلم الأجهزة بوابة وهمية و DNS مزيفاً = اعتراض شامل للمرور. الدفوع:\n\n- DHCP Snooping على المبدلات: منافذ موثوقة (trusted) فقط يحق لها رد DHCP، والبقية untrusted\n- 802.1X (درس قادم) يمنع الغرباء من المنفذ أصلاً\n- مراقبة تنبيهات خوادم DHCP الجديدة في الشبكة",
          en: "In the IPv6 world the philosophy changed: SLAAC lets a device generate its own address from Router Advertisements (RA) with no server at all — but DHCPv6 remains necessary for centralized addresses and DNS names:\n\n- Stateless DHCPv6 (options only): SLAAC for the address, DHCPv6 for settings\n- Stateful DHCPv6 (full): the server grants everything as in IPv4 — ports 546/547\n\nOn the security side, the nastiest DHCP attack is the rogue DHCP server: a malicious device sends Offers, so clients receive a fake gateway and DNS = full traffic interception. Defenses:\n\n- DHCP Snooping on switches: only trusted ports may send DHCP replies; the rest are untrusted\n- 802.1X (an upcoming lesson) keeps strangers off the port in the first place\n- Monitoring alerts for new DHCP servers appearing on the network",
        },
      },
    ],
    keyPoints: [
      { ar: "DHCP على UDP: العميل 68 والخادم 67، لأن العميل بلا عنوان لا يستطيع TCP", en: "DHCP over UDP: client 68, server 67 — an address-less client cannot do TCP" },
      { ar: "DORA: Discover و Offer و Request و ACK، والطلب بثٌّ متعمَّد لإبلاغ الخوادم الخاسرة", en: "DORA: Discover, Offer, Request, ACK — the Request is deliberately broadcast to notify losing servers" },
      { ar: "التجديد عند T1=50% (أحادي) وإعادة الارتباط عند T2=87.5% (بث)", en: "Renewal at T1=50% (unicast) and rebinding at T2=87.5% (broadcast)" },
      { ar: "ip helper-address يُرحِّل البث للخادم المركزي وحقل giaddr يحدد النطاق", en: "ip helper-address relays broadcast to the central server; the giaddr field selects the pool" },
      { ar: "DHCP Snoing يحمي من الخوادم الوهمية بتحديد منافذ موثوقة فقط", en: "DHCP Snooping defends against rogue servers by designating trusted ports only" },
    ],
    commands: [
      { cmd: "ipconfig /release && ipconfig /renew", desc: { ar: "إفلات الإيجار الحالي وطلب عنوان جديد — مشاهدة DORA حية (ويندوز)", en: "Release the current lease and request a new one — watch DORA live (Windows)" } },
      { cmd: "show ip dhcp binding", desc: { ar: "عرض إيجارات DHCP الممنوحة على موجه Cisco", en: "Show granted DHCP leases on a Cisco router" } },
      { cmd: "ip dhcp pool OFFICE", desc: { ar: "إنشاء/الدخول إلى نطاق DHCP لتكوينه", en: "Create/enter a DHCP pool for configuration" } },
      { cmd: "show ip dhcp conflict", desc: { ar: "عرض التعارضات المسجلة في عناوين DHCP", en: "Show recorded DHCP address conflicts" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا يرسل العميل رسالة DHCPREQUEST بثاً رغم أنه يعرف عنوان الخادم الذي عرض عليه؟", en: "Why does the client broadcast its DHCPREQUEST even though it knows the offering server's address?" },
        options: [
          { ar: "لأن بروتوكول DHCP لا يدعم الأحادي", en: "Because DHCP does not support unicast" },
          { ar: "ليعلم بقية الخوادم أن عروضها رُفضت فتحرر عناوينها المحجوزة", en: "So the other servers learn their offers were declined and free their reserved addresses" },
          { ar: "لأن الرسالة أكبر من حد UDP", en: "Because the message exceeds the UDP limit" },
          { ar: "لتشفير الرسالة", en: "To encrypt the message" },
        ],
        correct: 1,
        explain: { ar: "في الشبكة قد ترد عدة خوادم DHCP بعرضات. البث يوصل الرفض للجميع فوراً فتحرر حجوزاتها — وإلا لنفدت العناوين من الحجز الوهمي.", en: "Multiple DHCP servers may reply with offers. The broadcast delivers the rejection to all of them at once so they free their reservations — otherwise addresses would drain from phantom holds." },
      },
      {
        q: { ar: "إيجار مدته 8 أيام. متى يحاول العميل التجديد الأحادي (T1)؟", en: "A lease lasts 8 days. When does the client attempt unicast renewal (T1)?" },
        options: [
          { ar: "بعد 4 أيام", en: "After 4 days" },
          { ar: "بعد 7 أيام", en: "After 7 days" },
          { ar: "بعد 8 أيام تماماً", en: "Exactly after 8 days" },
          { ar: "عند كل إعادة تشغيل", en: "On every reboot" },
        ],
        correct: 0,
        explain: { ar: "T1 = 50% من المدة = 4 أيام، حيث يرسل REQUEST أحادياً لخادمه الأصلي. أما T2 عند 87.5% (7 أيام) فيكون البث لأي خادم.", en: "T1 = 50% of the term = 4 days, where it unicasts a REQUEST to its original server. T2 at 87.5% (7 days) switches to broadcast for any server." },
      },
      {
        q: { ar: "خادم DHCP مركزي في 10.0.20.5 و عملاء في شبكة 192.168.10.0/24 خلف راوتر. ما الذي يمكّن الخدمة عبر الراوتر؟", en: "A central DHCP server at 10.0.20.5 serves clients in 192.168.10.0/24 behind a router. What enables the service across the router?" },
        options: [
          { ar: "تحويل البث في DNS", en: "DNS broadcast forwarding" },
          { ar: "ip helper-address على واجهة الشبكة الفرعية، وحقل giaddr يوجه الخادم للنطاق الصحيح", en: "ip helper-address on the subnet interface, with the giaddr field steering the server to the right pool" },
          { ar: "توجيه OSPF بين الشبكات", en: "OSPF routing between the networks" },
          { ar: "NAT على الراوتر", en: "NAT on the router" },
        ],
        correct: 1,
        explain: { ar: "المُرحِّل يستقبل بث العميل ويغلفه أحادياً للخادم مزروعاً giaddr بعنوان الواجهة، فيعرف الخادم من أي نطاق يمنح العنوان — ثم يمرر الردود عائدة.", en: "The relay receives the client broadcast, unicasts it to the server with giaddr set to the interface address, so the server knows which pool to allocate from — then it relays replies back." },
      },
      {
        q: { ar: "جهاز خبيث يشغل خادم DHCP وهمياً في الشبكة. ما الخطر الأعظم؟", en: "A malicious device runs a rogue DHCP server. What is the greatest danger?" },
        options: [
          { ar: "إبطاء الشبكة فقط", en: "Merely slowing the network" },
          { ar: "استنزاف عناوين IP", en: "Draining IP addresses" },
          { ar: "توزيع بوابة و DNS وهميين = اعتراض حركة الشبكة كاملة (هجوم رجل في المنتصف)", en: "Handing out a fake gateway and DNS = intercepting the entire network's traffic (a man-in-the-middle attack)" },
          { ar: "تعطيل مبدلات الشبكة", en: "Crashing the network switches" },
        ],
        correct: 2,
        explain: { ar: "من يملك البوابة الافتراضية يملك كل المرور الخارج، ومن يملك DNS يوجهك لأي موقع مزيف — لهذا يعد DHCP Rogue من أخطر هجمات الطبقة الثانية، ودفعه DHCP Snooping و 802.1X.", en: "Whoever owns the default gateway owns all outbound traffic, and whoever owns DNS redirects you to any fake site — hence rogue DHCP is among the most dangerous layer-2 attacks, countered by DHCP snooping and 802.1X." },
      },
    ],
  },
  {
    id: "l078",
    moduleId: "m08",
    order: 8,
    level: "intermediate",
    title: { ar: "نقل الملفات والإدارة عن بعد: FTP و TFTP و SSH و SFTP", en: "File Transfer & Remote Management: FTP, TFTP, SSH, SFTP" },
    summary: {
      ar: "بروتوكولات نقل الملفات من FTP ثنائي القنوات إلى SFTP المشفر، ومقارنة الوضع النشط بالسلبي، وإدارة الأجهزة بأمان عبر SSH.",
      en: "File transfer protocols from dual-channel FTP to encrypted SFTP, active vs passive mode, and secure device management via SSH.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "FTP: البروتوكول العجوز بروتوكولين", en: "FTP: The Old Protocol with Two Channels" },
        body: {
          ar: "FTP (File Transfer Protocol) من أقدم بروتوكولات الإنترنت (1971!) وميزته الغريبة أنه يستخدم قناتين منفصلتين:\n\n- قناة التحكم على المنفذ 21: تحمل أوامر الدخول والتنقل (USER, PASS, LS, GET, PUT)\n- قناة البيانات: تُفتح عند كل نقل فعلي — وهنا يكمن التعقيد\n\nالوضع النشط (Active): الخادم يتصل بالعميل من منفذه 20 إلى منفذ عشوائي عند العميل. المشكلة: جدران العميل النارية ترفض اتصالات واردة غالباً!\n\nالوضع السلبي (Passive): العميل يطلب من الخادم فتح منفذ انتظار فيتصل به العميل — اتجاه الاتصال واحد صادر من العميل فينجو عبر الجدران و NAT. أغلب العملاء الحديثة يستخدمون PASV افتراضياً لهذا السبب.\n\nالفجوة القاتلة: كلمات المرور والبيانات تنتقل نصاً مكشوفاً — بروتوكول عصر ما قبل الأمن. استخدمه فقط في شبكات معملية معزولة، أو استبدله فوراً بـ SFTP أو FTPS.",
          en: "FTP (File Transfer Protocol) is among the Internet's oldest protocols (1971!) and its oddity is using two separate channels:\n\n- The control channel on port 21: carrying login and navigation commands (USER, PASS, LS, GET, PUT)\n- The data channel: opened for every actual transfer — and here lies the complexity\n\nActive mode: the server connects to the client from port 20 toward a random client port. Problem: client firewalls usually reject inbound connections!\n\nPassive mode: the client asks the server to open a listening port, then connects to it — one outbound direction from the client, surviving firewalls and NAT. Most modern clients default to PASV for this reason.\n\nThe fatal flaw: passwords and data travel in plaintext — a pre-security-era protocol. Use it only in isolated lab networks, or replace it immediately with SFTP or FTPS.",
        },
        tip: {
          ar: "FTP عبر راوتر NAT في الوضع النشط غالباً يفشل عند فتح قناة البيانات — الحل السريع: أمر passive في عميل FTP.",
          en: "FTP through a NAT router in active mode usually fails when opening the data channel — quick fix: the passive command in your FTP client.",
        },
      },
      {
        heading: { ar: "TFTP: البساطة المتطرفة", en: "TFTP: Extreme Simplicity" },
        body: {
          ar: "TFTP (Trivial FTP) يجسد فلسفة عكس FTP تماماً: بروتوكول واحد UDP 69 بلا مصادقة وبلا كتل وأوامر.\n\n- نقل بسيط للملف كاملاً بقراءة (RRQ) أو كتابة (WRQ)\n- آلية إرسال/إقرار خطوة خطوة — كل كتلة 512 بايت تُقر قبل التالية\n- لا مستخدمين ولا كلمات مرور ولا تنقل بين المجلدات\n\nأين يستخدم؟ تحديداً حيث البساطة ميزة: نقل صور IOS إلى الموجهات والبدلات، ونسخ الإعدادات احتياطياً (المصنعية copy tftp: flash: شهيرة)، و PXE booting للأجهزة بلا قرص، وphones Cisco تحميل ملفاتها التكوينية منه.\n\nحدوده واضحة: غير آمن نهائياً ولا يصلح للإنترنت — لكنه مثالي داخل شبكة إدارة معزولة.",
          en: "TFTP (Trivial FTP) embodies the exact opposite philosophy: a single UDP port 69 protocol with no authentication, no directories, no command set.\n\n- Simple whole-file transfer via read (RRQ) or write (WRQ) requests\n- A lock-step send/acknowledge mechanism — each 512-byte block is acknowledged before the next\n- No users, no passwords, no folder navigation\n\nWhere is it used? Precisely where simplicity is a feature: pushing IOS images to routers and switches, backing up configs (the classic copy tftp: flash:), diskless PXE booting, and Cisco phones loading their config files from it.\n\nIts limits are clear: totally insecure and unfit for the Internet — yet ideal inside an isolated management network.",
        },
      },
      {
        heading: { ar: "SSH: باب الإدارة الآمن", en: "SSH: The Secure Management Door" },
        diagram: {
          kind: "flow",
          title: { ar: "مراحل إنشاء جلسة SSH من الاتصال إلى القناة المشفرة", en: "SSH session setup stages from connect to encrypted channel" },
          items: [
            { ar: "TCP 22: الاتصال وتسجيل بصمة المفتاح المضيف في known_hosts", en: "TCP 22: connect and record the host key fingerprint in known_hosts" },
            { ar: "التفاوض على خوارزميات التشفير والتكامل والمبادلة", en: "Negotiate cipher, integrity and key-exchange algorithms" },
            { ar: "مصادقة المستخدم: مفتاح عام أو كلمة مرور", en: "User authentication: public key or password" },
            { ar: "قناة مشفرة: جلسة أوامر أو SFTP أو نفق", en: "Encrypted channel: shell session, SFTP, or a tunnel" },
            { ar: "كل أوامر الإدارة ونقل الملفات تعبر النفق المشفر", en: "All management commands and file transfers cross the encrypted tunnel" },
          ],
        },
        body: {
          ar: "SSH (Secure Shell) على المنفذ 22 خلف منذ 1995 كبديل آمن لـ Telnet المشفر المكشوف. ما يقدمه فوق التشفير:\n\n- مصادقة المضيف: عند أول اتصال يعرض الخادم بصمة مفتاحه (Host Key) وتُسجل في known_hosts — أي تغيير لاحق ينذر بخطر (هجوم رجل في المنتصف!)\n- مصادقة المستخدم: كلمة مرور أو الأفضل — زوج مفاتيح عام/خاص\n- النقل: جلسات تشغيل أوامر بعيدة، ونقل ملفات (SFTP/SCP)، وأنفاق (Tunneling) تمرر أي بروتوكول آخر داخل الاتصال المشفر — مثل توصيل منفذ قاعدة بيانات بعيد إلى جهازك\n\nإنشاء مفتاحك الخاص بأمر واحد: ssh-keygen -t ed25519 ثم انسخ العام إلى الخادم عبر ssh-copy-id — بعدها كلمات المرور تاريخ.",
          en: "SSH (Secure Shell) on port 22 has served since 1995 as the secure replacement for plaintext Telnet. What it offers beyond encryption:\n\n- Host authentication: on first connect the server presents its host key fingerprint, recorded in known_hosts — any later change signals danger (a man-in-the-middle attack!)\n- User authentication: a password, or better, a public/private key pair\n- Transport: remote command sessions, file transfer (SFTP/SCP), and tunneling that carries any other protocol inside the encrypted connection — such as forwarding a remote database port to your machine\n\nCreate your key pair with one command: ssh-keygen -t ed25519, then copy the public half to the server via ssh-copy-id — after that, passwords are history.",
        },
        code: {
          lang: "bash",
          snippet: "ssh-keygen -t ed25519 -C \"ali@laptop\"\nssh-copy-id admin@10.0.0.1\nssh admin@10.0.0.1\n\n# نفق: منفذ محلي 5432 يصل لقاعدة بيانات داخلية\nssh -L 5432:db.internal:5432 admin@bastion.netmastery.io\n\n# أمر واحد عن بعد دون جلسة تفاعلية\nssh admin@10.0.0.1 \"show ip interface brief\"",
        },
      },
      {
        heading: { ar: "SFTP و SCP مقابل FTPS: أسماء متشابهة عالم مختلف", en: "SFTP and SCP vs FTPS: Similar Names, Different Worlds" },
        table: {
          caption: { ar: "بروتوكولات نقل الملفات الخمسة مقارنةً", en: "The five file-transfer protocols compared" },
          headers: [
            { ar: "البروتوكول", en: "Protocol" },
            { ar: "النقل والمنفذ", en: "Transport & port" },
            { ar: "الأمان", en: "Security" },
            { ar: "الاستخدام الأمثل", en: "Best use" },
          ],
          rows: [
            [
              { ar: "FTP", en: "FTP" },
              { ar: "TCP: تحكم 21 + بيانات 20/PASV", en: "TCP: control 21 + data 20/PASV" },
              { ar: "بلا تشفير إطلاقاً", en: "No encryption at all" },
              { ar: "معمل معزول فقط", en: "Isolated labs only" },
            ],
            [
              { ar: "TFTP", en: "TFTP" },
              { ar: "UDP 69", en: "UDP 69" },
              { ar: "بلا مصادقة ولا تشفير", en: "No auth, no encryption" },
              { ar: "صور IOS و PXE داخل شبكة إدارة", en: "IOS images and PXE inside a management network" },
            ],
            [
              { ar: "SFTP", en: "SFTP" },
              { ar: "SSH — منفذ 22 واحد", en: "SSH — single port 22" },
              { ar: "تشفير ومصادقة SSH كاملان", en: "Full SSH encryption and authentication" },
              { ar: "الاختيار الافتراضي الحديث", en: "Today's default choice" },
            ],
            [
              { ar: "SCP", en: "SCP" },
              { ar: "SSH — منفذ 22", en: "SSH — port 22" },
              { ar: "تشفير SSH", en: "SSH encryption" },
              { ar: "نسخ ملف واحد في سكربت", en: "One-file copy in scripts" },
            ],
            [
              { ar: "FTPS", en: "FTPS" },
              { ar: "TCP 21/990 فوق TLS — قناتان", en: "TCP 21/990 over TLS — two channels" },
              { ar: "تشفير TLS مع بنية FTP القديمة", en: "TLS encryption with legacy FTP architecture" },
              { ar: "تكامل مع أنظمة قديمة فقط", en: "Legacy system integration only" },
            ],
          ],
        },
        body: {
          ar: "الخلط الأشهر في هذا المجال — ثلاثة بروتوكولات آمنة لمعنى مختلف تماماً:\n\n- SFTP (SSH File Transfer Protocol): ليس FTP إطلاقاً! بروتوكول نقل ملفات مصمم أصلاً للعمل فوق قناة SSH — نفس المنفذ 22 ونفس المصادقة ونفس التشفير. يقدم قائمة ملفات ومسارات واستئناف نقل.\n- SCP (Secure Copy): نقل مبسط فوق SSH — نسخة ملف واحد بسرعة وبلا تصفح\n- FTPS: بروتوكول FTP القديم نفسه فوق TLS — منفذ 21 مع STARTTLS أو 990 ضمنياً. يحافظ على التوافق مع بنية FTP (تحكم + بيانات) لكنه أبطأ وأثقل إدارياً عبر الجدران\n\nالتوصية العملية الحديثة: SFTP في كل شيء تقريباً — أمان SSH وبساطة منفذ واحد ونجاة عبر NAT. FTPS فقط عند دمج مع أنظمة قديمة تفرض FTP حرفياً.",
          en: "The classic confusion in this space — three secure protocols meaning entirely different things:\n\n- SFTP (SSH File Transfer Protocol): not FTP at all! A file transfer protocol designed from scratch to run over an SSH channel — same port 22, same authentication, same encryption. It offers directory listings, paths, and resumable transfers.\n- SCP (Secure Copy): a minimal transfer over SSH — one file, fast, no browsing\n- FTPS: the old FTP protocol itself over TLS — port 21 with STARTTLS or 990 implicit. It keeps FTP architecture compatibility (control + data) but is slower and heavier to manage through firewalls\n\nThe modern practical recommendation: SFTP for nearly everything — SSH's security, one simple port, NAT survival. FTPS only when integrating with legacy systems that literally mandate FTP.",
        },
      },
      {
        heading: { ar: "تحصين SSH: أفضل الممارسات", en: "Hardening SSH: Best Practices" },
        body: {
          ar: "SSH بابك الحقيقي للبنية التحتية — تأمينه ليس اختيارياً. في ملف /etc/ssh/sshd_config:\n\n- PasswordAuthentication no بعد توزيع المفاتيح: كلمات المرور تُكسر بالتخمين (السجلات مليئة بمحاولات)\n- PermitRootLogin no: ادخل بحساب شخصي ثم sudo — مسؤولية وتدقيق\n- تغيير المنفذ 22 الافتراضي يقلل الضجيج الآلي (أمن بالغموض — طبقة صغيرة لكنها عملية)\n- AllowUsers / AllowGroups لتحديد المسموح لهم أصلاً\n- استخدم fail2ban لحظر عناوين المحاولات الفاشلة تلقائياً\n- على الأجهزة الشبكية (Cisco): تفعيل ssh version 2 فقط ورفض Telnet و SSHv1 نهائياً، مع شبكة إدارة معزولة (Out-of-band أو MGMT VLAN)\n\nالمفاتيح الحديثة Ed25519 أقصر وأسرع وأسلم من RSA — اجعلها اختيارك الافتراضي.",
          en: "SSH is your real door to the infrastructure — securing it is not optional. In /etc/ssh/sshd_config:\n\n- PasswordAuthentication no after distributing keys: passwords fall to brute force (the logs are full of attempts)\n- PermitRootLogin no: enter with a personal account then sudo — accountability and auditing\n- Changing the default port 22 cuts automated noise (security by obscurity — a small but practical layer)\n- AllowUsers / AllowGroups to whitelist who may connect at all\n- Run fail2ban to auto-ban addresses of failed attempts\n- On network devices (Cisco): enable ssh version 2 only and reject Telnet and SSHv1 outright, with an isolated management network (out-of-band or a MGMT VLAN)\n\nModern Ed25519 keys are shorter, faster, and safer than RSA — make them your default.",
        },
      },
    ],
    keyPoints: [
      { ar: "FTP قناتان: تحكم 21 + بيانات (20 في النشط أو PASV في السلبي لعبور NAT)", en: "FTP has two channels: control 21 + data (20 in active, PASV in passive to survive NAT)" },
      { ar: "TFTP عبر UDP 69: بلا مصادقة — لصور IOS و PXE داخل شبكات الإدارة", en: "TFTP over UDP 69: no authentication — for IOS images and PXE inside management networks" },
      { ar: "SSH منفذ 22: تشفير + مصادقة مفاتيح + أنفاق، ويدعم SFTP و SCP فوقه", en: "SSH port 22: encryption + key auth + tunneling, hosting SFTP and SCP" },
      { ar: "SFTP ليس FTP مشفراً بل بروتوكول جديد فوق SSH — الاختيار الافتراضي اليوم", en: "SFTP is not encrypted FTP but a new protocol over SSH — today's default choice" },
      { ar: "اقتل PasswordAuthentication و root login — المفاتيح + sudo هو المعيار", en: "Kill PasswordAuthentication and root login — keys + sudo is the standard" },
    ],
    commands: [
      { cmd: "ssh-keygen -t ed25519", desc: { ar: "إنشاء زوج مفاتيح SSH حديث (عام/خاص)", en: "Generate a modern Ed25519 SSH key pair" } },
      { cmd: "sftp admin@10.0.0.1", desc: { ar: "جلسة نقل ملفات مشفرة فوق SSH", en: "An encrypted file transfer session over SSH" } },
      { cmd: "scp backup.cfg admin@10.0.0.1:/flash/", desc: { ar: "نسخ ملف واحد بأمان إلى مسار بعيد", en: "Securely copy a single file to a remote path" } },
      { cmd: "ssh -L 8080:internal-server:80 admin@bastion", desc: { ar: "نفق SSH يحول منفذاً محلياً إلى خدمة داخلية", en: "An SSH tunnel forwarding a local port to an internal service" } },
    ],
    quiz: [
      {
        q: { ar: "عميل FTP خلف راوتر NAT يفشل دائماً عند بدء نقل الملفات رغم نجاح الدخول والتصفح. ما السبب والحل؟", en: "An FTP client behind NAT always fails when a file transfer starts despite successful login and browsing. Cause and fix?" },
        options: [
          { ar: "السبب: منفذ 21 محجوب — والحل: تغيير المنفذ", en: "Cause: port 21 blocked — fix: change the port" },
          { ar: "السبب: الوضع النشط يجعل الخادم يتصل بالعميل وراوتر NAT لا يعرف لمن يوجه الاتصال — والحل: الوضع السلبي Passive", en: "Cause: active mode has the server connecting inbound, which NAT cannot map — fix: passive mode" },
          { ar: "السبب: ملفات كبيرة جداً — والحل: ضغطها", en: "Cause: files too large — fix: compress them" },
          { ar: "السبب: DNS — والحل: استخدام IP مباشرة", en: "Cause: DNS — fix: use the IP directly" },
        ],
        correct: 1,
        explain: { ar: "في الوضع النشط يفتح الخادم قناة البيانات باتجاه العميل؛ ترجمة NAT لا تملك خريطة لهذا الاتصال الوارد فيفشل. الوضع السلبي يجعل العميل البادئ فينجو عبر NAT.", en: "In active mode the server opens the data channel inbound; NAT has no mapping for that incoming flow so it fails. Passive mode makes the client the initiator, surviving NAT." },
      },
      {
        q: { ar: "ما الفرق الجوهري بين SFTP و FTPS؟", en: "What is the fundamental difference between SFTP and FTPS?" },
        options: [
          { ar: "SFTP أسرع لأنه لا يشفر", en: "SFTP is faster because it is unencrypted" },
          { ar: "SFTP بروتوكول نقل فوق SSH على منفذ 22، بينما FTPS هو FTP القديم نفسه فوق TLS", en: "SFTP is a transfer protocol over SSH on port 22, while FTPS is the old FTP itself over TLS" },
          { ar: "لا فرق — اسمان لبروتوكول واحد", en: "No difference — two names for one protocol" },
          { ar: "FTPS يعمل على UDP فقط", en: "FTPS works on UDP only" },
        ],
        correct: 1,
        explain: { ar: "SFTP بُني فوق SSH منفذاً وقناة واحدة، أما FTPS فحافظ على بنية FTP بقناتي تحكم وبيانات فوق TLS — نفس التعقيد القديم بثوب مشفر، وأثقل عبر الجدران النارية.", en: "SFTP was built over SSH with one port and one channel, while FTPS kept FTP's two-channel architecture over TLS — the old complexity in encrypted clothing, heavier through firewalls." },
      },
      {
        q: { ar: "حاولت الاتصال بخادم SSH فظهر تحذير: WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! ماذا يعني هذا؟", en: "Connecting to an SSH server shows: WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! What does this mean?" },
        options: [
          { ar: "الخادم تحدث نظام تشغيله", en: "The server upgraded its operating system" },
          { ar: "البصمة المخزنة في known_hosts لا تطابق مفتاح الخادم الحالي — إما إعادة تثبيت حقيقية أو محاولة اعتراض (رجل في المنتصف)", en: "The stored fingerprint in known_hosts no longer matches the server key — either a genuine reinstall or an interception attempt (man-in-the-middle)" },
          { ar: "كلمة مرورك انتهت صلاحيتها", en: "Your password expired" },
          { ar: "جدارك الناري يمنع SSH", en: "Your firewall blocks SSH" },
        ],
        correct: 1,
        explain: { ar: "SSH يحميك بمقارنة بصمة المفتاح مع أول لقاء. التغيير قد يكون بريئاً (إعادة بناء الخادم) لكنه قد يكون هجوماً — لا تتجاهل التحذير أبداً؛ تحقق عبر قناة موثوقة قبل المتابعة.", en: "SSH protects you by comparing the key fingerprint with the first meeting. The change may be innocent (server rebuild) but may be an attack — never ignore the warning; verify via a trusted channel before proceeding." },
      },
      {
        q: { ar: "لماذا يفضل نقل صور IOS إلى الموجهات عبر TFTP و SSH/SFTP معاً في الشبكات الحديثة؟", en: "Why do modern networks often pair TFTP for IOS transfers with SSH/SFTP for management?" },
        options: [
          { ar: "لأن TFTP أسرع من كل البدائل", en: "Because TFTP is faster than all alternatives" },
          { ar: "TFTP مدعوم مباشرة في ROMMON/وضع الاسترداد للموجه وبلا تعقيد، بينما الجلسات الإدارية اليومية تحمى عبر SSH", en: "TFTP is directly supported in ROMMON/recovery mode with zero complexity, while daily management sessions are protected via SSH" },
          { ar: "لأن SSH لا يستطيع نقل الملفات", en: "Because SSH cannot transfer files" },
          { ar: "لأن TFTP مشفر أقوى", en: "Because TFTP is more strongly encrypted" },
        ],
        correct: 1,
        explain: { ar: "بيئة الاسترداد (ROMMON) تدعم TFTP لحاجتها لبروتوكول أعمق بساطة يُنفذ في البرمجيات الثابتة، بينما الإدارة اليومية تستفيد من تشفير SSH كاملاً — الاستخدامان مختلفان.", en: "The recovery environment (ROMMON) supports TFTP because firmware needs the simplest implementable protocol, while daily management benefits from full SSH encryption — two different use cases." },
      },
    ],
  },
  {
    id: "l079",
    moduleId: "m08",
    order: 9,
    level: "intermediate",
    title: { ar: "NTP: لماذا يتفق العالم على الوقت؟", en: "NTP: Why the World Agrees on Time" },
    summary: {
      ar: "زمن الشبكات والطبقات (Stratum)، آلية عمل NTP عبر UDP 123، الإعداد العملي بـ chrony وعلى Cisco IOS، وأمن البروتوكول.",
      en: "Network time and strata, how NTP works over UDP 123, practical setup with chrony and on Cisco IOS, and protocol security.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "الوقت ليس ترفاً في الشبكات", en: "Time Is Not a Luxury in Networks" },
        body: {
          ar: "انحراف ساعتين بمقدار 5 دقائق بين خادمين قد يفك شبكة كاملة بصمت. اعتماديات الزمن:\n\n- السجلات (Logs): كيف تجمع قصة الحادث الأمني من 20 جهازاً إذا كانت سجلاتها غير متزامنة؟ الترتيب يضيع والتحقيق يموت\n- المصادقة: بروتوكول Kerberos يرفض الطلبات إذا تجاوز انحراف الساعة 5 دقائق — تسجيل الدخول للمجال يتوقف!\n- شهادات TLS: صلاحيات إصدار وبدء تعتمد دقة الثواني\n- التشفير الحديث TOTP (مصادقة ثنائية برمز متغير كل 30 ثانية) يستحيل بلا زمن موحد\n- قواعد البيانات الموزعة والنسخ الاحتياطي والفوترة\n\nساعات المعالجات تنجرف (Drift) ثواني يومياً بطبيعتها الفيزيائية — لذا المزامنة المستمرة إلزامية لا خيارية.",
          en: "A 5-minute drift between two servers can silently break a whole network. Time dependencies:\n\n- Logs: how do you assemble an incident story from 20 devices if their logs are unsynchronized? The order is lost and the investigation dies\n- Authentication: Kerberos rejects requests when clock skew exceeds 5 minutes — domain login stops!\n- TLS certificates: issuance and validity windows depend on second-level accuracy\n- Modern TOTP encryption (two-factor codes rotating every 30 seconds) is impossible without unified time\n- Distributed databases, backups, and billing\n\nProcessor clocks physically drift seconds per day by nature — so continuous synchronization is mandatory, not optional.",
        },
      },
      {
        heading: { ar: "آلية العمل: الطبقات و UDP 123", en: "How It Works: Strata and UDP 123" },
        table: {
          caption: { ar: "طبقات NTP من المرجع الفيزيائي حتى العميل", en: "NTP strata from physical reference to client" },
          headers: [
            { ar: "الطبقة", en: "Stratum" },
            { ar: "ما هي", en: "What it is" },
            { ar: "الدقة المتوقعة", en: "Expected accuracy" },
          ],
          rows: [
            [
              { ar: "Stratum 0", en: "Stratum 0" },
              { ar: "مراجع فيزيائية: ساعات ذرية وGPS — لا تتحدث NTP مباشرة", en: "Physical references: atomic clocks, GPS — do not speak NTP directly" },
              { ar: "المرجع المطلق", en: "The absolute reference" },
            ],
            [
              { ar: "Stratum 1", en: "Stratum 1" },
              { ar: "خوادم متصلة مباشرة بالمرجع الفيزيائي", en: "Servers directly attached to the physical reference" },
              { ar: "ميكروثانية", en: "Microseconds" },
            ],
            [
              { ar: "Stratum 2", en: "Stratum 2" },
              { ar: "تتزامن من Stratum 1 — خوادم المؤسسات الكبيرة", en: "Synced from Stratum 1 — large enterprise servers" },
              { ar: "ميلي ثانية قليلة", en: "A few milliseconds" },
            ],
            [
              { ar: "Stratum 3 — 15", en: "Stratum 3 — 15" },
              { ar: "كل طبقة بعداً إضافياً عن المرجع — الشبكات الداخلية", en: "Each layer one more step from the reference — internal networks" },
              { ar: "تتدهور تدريجياً", en: "Gradually degrading" },
            ],
            [
              { ar: "Stratum 16", en: "Stratum 16" },
              { ar: "تعني غير متزامن — تُرفض كمصدر", en: "Means unsynchronized — rejected as a source" },
              { ar: "غير صالحة", en: "Invalid" },
            ],
          ],
        },
        diagram: {
          kind: "topology",
          title: { ar: "هرمية مزامنة الوقت داخل المؤسسة", en: "The time-sync hierarchy inside an enterprise" },
          nodes: ["GPS/ذري (S0)", "خادم S1 عام", "خادما المؤسسة (S2)", "المبدلات والخوادم (S3)", "أجهزة المستخدمين"],
          edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 4]],
        },
        body: {
          ar: "NTP (Network Time Protocol، RFC 5905) يعمل عبر UDP على المنفذ 123 وينظم العالم في هرمية موثوقية تسمى الطبقات (Stratum):\n\n- Stratum 0: مراجع فيزيائية — ساعات ذرية وأجهزة GPS — لا تتحدث NTP مباشرة\n- Stratum 1: خوادم متصلة مباشرة بالمرجع الفيزيائي\n- Stratum 2: تزامن من Stratum 1 (مثل خوادم المؤسسات الكبيرة)\n- Stratum 3 وما فوق: كل طبقة تزداد ابتعاداً عن المرجع\n- الحد الأقصى 15 — و Stratum 16 يعني غير متزامن\n\nالعميل يرسل حزمة تحمل طابع زمن الخروج، فيضع الخادم طابع الوصول والخروج، ويعود العميل بطابع العودة. أربعة طوابع تحسب زمن الذهاب والعودة (RTT) والإزاحة (Offset) فيُعدَّل الساعة بذكاء — ليس قفزاً بل تسريعاً/تباطؤاً لطيفاً (Slewing) يحمي التطبيقات من قفزات الزمن.\n\nخوادم Pool العامة: pool.ntp.org موزعة جغرافياً — خذ 4-5 خوادم موزعة (منطق NTP: لا تثق بخادم واحد أبداً، الخوارزمية ترفض الشاذّ).",
          en: "NTP (Network Time Protocol, RFC 5905) runs over UDP on port 123 and organizes the world into a reliability hierarchy called strata:\n\n- Stratum 0: physical references — atomic clocks and GPS receivers — they do not speak NTP directly\n- Stratum 1: servers directly attached to the physical reference\n- Stratum 2: synchronized from Stratum 1 (like large enterprise servers)\n- Stratum 3 and beyond: each layer further from the reference\n- The maximum is 15 — and Stratum 16 means unsynchronized\n\nThe client sends a packet carrying its departure timestamp; the server stamps arrival and departure; the client stamps return. Four timestamps compute round-trip time (RTT) and offset, and the clock is adjusted intelligently — not jumped, but gently sped/slowed (slewing), protecting applications from time jumps.\n\nPublic pool servers: pool.ntp.org, geographically distributed — take 4-5 diverse servers (NTP logic: never trust a single server; the algorithm rejects outliers).",
        },
        tip: {
          ar: "لا تجعل كل جهاز في مؤسستك يسأل pool.ntp.org مباشرة — عيّن 2-3 خوادم NTP داخلية تزامن مع الخارج، والبقية تزامن منها (هرمية داخلية تخفض الحمل وترفع الدقة).",
          en: "Do not let every device in your organization query pool.ntp.org directly — designate 2-3 internal NTP servers syncing outward, with everyone else syncing from them (an internal hierarchy that cuts load and raises accuracy).",
        },
      },
      {
        heading: { ar: "الإعداد العملي: Linux و Windows و Cisco", en: "Practical Setup: Linux, Windows, Cisco" },
        body: {
          ar: "على لينكس الحديث، chrony هو المعيار (خفيف وأدق من ntpd القديم وأسرع في الالتقاط الابتدائي):\n\nالتحقق من الحالة يعرض مصادرك مع عمودي النبض (Reach) والانحراف (Offset). على Windows الخدمة w32tm تملك مزامنة المجال: أعضاء المجال يزامنون تلقائياً مع وحدات التحكم.\n\nعلى أجهزة Cisco، سطران يكفيان لمزامنة الجهاز، ويمكن جعله خادماً داخلياً للشبكة عبر ntp master — مع ملاحظة أنه سيعلن عن نفسه بطبقة اصطناعية.",
          en: "On modern Linux, chrony is the standard (lighter and more accurate than the old ntpd, with faster initial convergence):\n\nChecking status shows your sources with reach and offset columns. On Windows, the w32tm service handles domain sync: domain members automatically sync with the domain controllers.\n\nOn Cisco devices, two lines synchronize the device, and it can become an internal network server via ntp master — noting it will advertise an artificial stratum.",
        },
        code: {
          lang: "cisco",
          snippet: "! مزامنة موجه Cisco\nntp server 162.159.200.1\nntp server 108.59.2.24 prefer\n!\n! أن يصبح الجهاز خادماً داخلياً (استخدمه بحكمة)\nntp master 3\n!\n! حماية NTP: منع استغلاله في هجمات التضخيم\naccess-list 10 permit 192.168.10.0 0.0.0.255\nntp restrict 10 access-group 10\n!\nshow ntp status\nshow ntp associations",
        },
      },
      {
        heading: { ar: "أمن NTP: هجمات التضخيم والحد منها", en: "NTP Security: Amplification and Mitigation" },
        body: {
          ar: "NTP القديم كان سلاحاً في هجمات الحرمان: أمر monlist (تنبيه 48) يعيد قائمة آخر 600 عنوان اتصل بالخادم — مخلوق صغير برأس 8 بايت وذيل 992 بايت: هجمة تضخيم ×55!\n\n- المهاجم يزيف عنوان الضحية ويسأل خوادم NTP عامة كثيرة\n- كل واحد يغرق الضحية بـ monlist\n- أنظمة التشغيل الحديثة أزالت monlist افتراضياً منذ 2013\n\nالدفوع الإدارية:\n\n- restrict في الإعدادات لمنع الاستعلام العام وتحقيق الإدارة الداخلية فقط\n- جدار ناري: اسمح بالمنفذ 123 وارداً من مصادرك المعروفة فقط\n- NTS (NTP Secure — RFC 8915): NTP عبر TLS مع مصادقة الخادم — الجيل الجديد ضد التزييف والانتحال\n\nوللدقة العظمى في مراكز البيانات والمالية: PTP (IEEE 1588) يحقق دقة ميكروثانية وأدنى عبر ختم زمن الأجهزة — لكنه يتطلب بنية متجانسة الطبقات وتزامن الأجهزة نفسه.",
          en: "Old NTP was a weapon in denial attacks: the monlist command (mode 48) returns the last 600 addresses that contacted the server — a tiny 8-byte head with a 992-byte tail: a ×55 amplification attack!\n\n- The attacker spoofs the victim's address and queries many public NTP servers\n- Each one floods the victim with monlist output\n- Modern operating systems removed monlist by default since 2013\n\nAdministrative defenses:\n\n- restrict in the config to block public queries and serve internal management only\n- Firewall: allow inbound port 123 only from known sources\n- NTS (NTP Secure — RFC 8915): NTP over TLS with server authentication — the new generation against spoofing and impersonation\n\nAnd for ultimate accuracy in datacenters and finance: PTP (IEEE 1588) achieves microsecond and sub-microsecond precision via hardware timestamping — but it requires a homogeneous stratum structure and hardware support itself.",
        },
      },
    ],
    keyPoints: [
      { ar: "الزمن المتزامن شرط للسجلات و Kerberos و TOTP والشهادات — لا نجاة بلا NTP", en: "Synchronized time underpins logs, Kerberos, TOTP and certificates — no survival without NTP" },
      { ar: "هرمية الطبقات: 0 مراجع فيزيائية، وكل طبقة تبتعد درجة، والحد 15", en: "The stratum hierarchy: 0 physical references, each layer one step removed, max 15" },
      { ar: "UDP 123، وأربعة طوابع زمنية تحسب RTT و Offset، والتصحيح تدريجي (Slewing) لا قفزاً", en: "UDP 123; four timestamps compute RTT and offset; correction is gradual slewing, not jumping" },
      { ar: "وزّع على 4-5 مصادر وشكل هرمية داخلية — لا تثق بخادم واحد", en: "Distribute across 4-5 sources and build an internal hierarchy — never trust a single server" },
      { ar: "monlist كان هجمة تضخيم ×55 — قيد الاستعلام واسمح للمعروفين فقط، والجيل الجديد NTS", en: "monlist was a ×55 amplification attack — restrict queries to known sources; the new generation is NTS" },
    ],
    commands: [
      { cmd: "chronyc sources -v", desc: { ar: "عرض خوادم NTP ومستويات الوصول والانحراف في chrony", en: "Show NTP servers, reach levels and offsets in chrony" } },
      { cmd: "timedatectl status", desc: { ar: "فحص حالة المزامنة والانحراف الحالي في لينكس", en: "Check sync status and current drift on Linux" } },
      { cmd: "show ntp associations", desc: { ar: "عرض مصادر NTP ومصادقتها على موجه Cisco", en: "Show NTP sources and their status on a Cisco router" } },
      { cmd: "w32tm /query /status", desc: { ar: "فحص مصدر الوقت في ويندوز", en: "Check the time source on Windows" } },
    ],
    quiz: [
      {
        q: { ar: "شركة ترفض مصادقة المستخدمين بـ Kerberos رغم صحة كلمات المرور. ما أول ما تتحقق منه؟", en: "A company's Kerberos authentication fails despite correct passwords. What do you check first?" },
        options: [
          { ar: "كابلات الشبكة", en: "The network cables" },
          { ar: "تزامن الساعات — انحراف يتجاوز 5 دقائق يجعل Kerberos يرفض التذاكر", en: "Clock sync — skew beyond 5 minutes makes Kerberos reject tickets" },
          { ar: "إعدادات DNS العكسية", en: "Reverse DNS settings" },
          { ar: "حجم الذاكرة", en: "Memory size" },
        ],
        correct: 1,
        explain: { ar: "بروتوكول Kerberos مبني على طوابع زمنية لمنع إعادة استخدام التذاكر، ويشترط انحرافاً أقل من 5 دقائق — أول مشتبه دائم هو NTP.", en: "Kerberos is built on timestamps to prevent ticket replay and demands skew under 5 minutes — the perennial first suspect is NTP." },
      },
      {
        q: { ar: "خادم NTP يعلن Stratum 1 لكنه يتزامن فعلياً من خادم Stratum 3 آخر. ماذا يعني ذلك؟", en: "An NTP server claims Stratum 1 but actually syncs from another Stratum 3 server. What does this mean?" },
        options: [
          { ar: "إعداد طبيعي تماماً", en: "A perfectly normal setup" },
          { ar: "خادم كاذب (False Ticker) يعلن طبقة أقوى مما يملك — يجب استبعاده من المصادر", en: "A false ticker claiming a stronger stratum than it has — exclude it from your sources" },
          { ar: "أنه يستخدم PTP داخلياً", en: "That it uses PTP internally" },
          { ar: "أنه يضاعف الدقة", en: "That it doubles the accuracy" },
        ],
        correct: 1,
        explain: { ar: "طبقة الخادم الحقيقية = طبقة مصدره + 1. خادم Stratum 3 لا يستطيع تقديم Stratum 1 إلا بالكذب — NTP يتعامل مع الحقيقة لا الأعراف، والخوادم الكاذبة تُكشف بمقارنة المصادر المتعددة.", en: "A server's true stratum = its source's stratum + 1. A Stratum 3 source cannot honestly serve Stratum 1 — NTP deals in truth, and false tickers are exposed by cross-comparing multiple sources." },
      },
      {
        q: { ar: "لماذا يصحح NTP الساعة بتسريعها أو إبطائها (Slewing) بدلاً من قفزها مرة واحدة؟", en: "Why does NTP correct the clock by speeding or slowing it (slewing) rather than jumping it once?" },
        options: [
          { ar: "لتوفير الطاقة", en: "To save energy" },
          { ar: "لأن القفزات المفاجئة تكسر التطبيقات الحساسة للزمن مثل المعاملات وسلاسل السجلات", en: "Because sudden jumps break time-sensitive applications like transactions and log ordering" },
          { ar: "لأن أنظمة التشغيل تمنع تغيير الساعة", en: "Because operating systems forbid changing the clock" },
          { ar: "لأن UDP لا ينقل أوامر القفز", en: "Because UDP cannot carry jump commands" },
        ],
        correct: 1,
        explain: { ar: "الزمن الرجعي في السجلات أو مدة سالبة في معاملة = فوضى. التسريع التدريجي يعيد المزامنة دون كسر تسلسل الأحداث — مع سماح بقفزة مغلظة فقط عند فروقات ضخمة.", en: "Backwards time in logs or a negative transaction duration = chaos. Gradual slewing restores sync without breaking event ordering — a step jump is only permitted for huge offsets." },
      },
      {
        q: { ar: "ما الذي جعل أمر monlist في NTP خطراً أمنياً؟", en: "What made NTP's monlist command a security hazard?" },
        options: [
          { ar: "كان يشفر البيانات بقوة", en: "It encrypted data heavily" },
          { ar: "طلب صغير يعيد رداً ضخماً — هجمة تضخيم بمضاعفات تصل ×55 مع انتحال عنوان الضحية", en: "A small request returning a huge reply — an amplification up to ×55 with the victim's spoofed address" },
          { ar: "كان يتطلب كلمة مرور الجذر", en: "It required the root password" },
          { ar: "كان يوقف الخادم فوراً", en: "It crashed the server instantly" },
        ],
        correct: 1,
        explain: { ar: "مبدأ التضخيم: 8 بايتات طلب تستدعي ~55 ضعفاً رداً، ومع تزييف المصدر تذهب الردود كلها إلى الضحية — إزالة monlist الافتراضية أنهت معظم الخطر، وتقييد الاستعلام يكمل الدفاع.", en: "The amplification principle: an 8-byte request invokes a ~55x reply, and with source spoofing all replies go to the victim — removing monlist by default ended most of the risk; query restriction completes the defense." },
      },
    ],
  },
  {
    id: "l080",
    moduleId: "m08",
    order: 10,
    level: "intermediate",
    title: { ar: "شبكات توصيل المحتوى CDN وواجهات APIs", en: "CDNs and APIs" },
    summary: {
      ar: "كيف تُقرب CDNs المحتوى من المستخدم عبر PoPs و anycast والتخزين المؤقت، وكيف تعمل REST APIs فوق HTTP وتؤمَّن بالتوكنات وحدود الطلبات.",
      en: "How CDNs bring content closer via PoPs, anycast and caching, and how REST APIs ride HTTP secured with tokens and rate limits.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "المسافة هي العدو الأول للأداء", en: "Distance Is Performance's Enemy Number One" },
        diagram: {
          kind: "topology",
          title: { ar: "طلب يُخدم من PoP الأقرب بدل العبور للأصل", en: "A request served from the nearest PoP instead of crossing to the origin" },
          nodes: ["المستخدم", "PoP-الأقرب", "PoP-درع", "الخادم الأصل", "مستخدم بعيد"],
          edges: [[0, 1], [1, 2], [2, 3], [4, 2]],
        },
        body: {
          ar: "قانون الفيزياء لا يُتفاوض عليه: الضوء في الألياف يقطع ~200 كم في الملّي ثانية ذهاباً. مستخدم في الرياض يطلب ملفاً من خادم في طوكيو ينتظر ~70 ملّي ثانية قبل أول بايت — ثم تضاف مصافحة TCP (RTT إضافي) ومصافحة TLS (RTT أو اثنان) — 4 رحلات قبل البيانات!\n\nCDN (Content Delivery Network) يحل المعادلة جغرافياً:\n\n- شبكة نقاط حضور (PoPs) موزعة عالمياً في مئات المدن\n- ينسخ المحتوى الثابت (صور، CSS، JS، فيديو) إلى الأقرب من المستخدم\n- RTT ينخفض من 70 إلى 5-15 ملّي ثانية عادة، والمصافحات تصبح شبه فورية\n\nالكيفية الذكية: DNS يحل اسم CDN (مثل cdn.example.com) فيعيد عنوان PoP الأقرب جغرافياً وشبكياً للمستخدم — وأحياناً عبر anycast: عنوان IP واحد معلن من عشرات المواقع فيوجهك بروتوكول التوجيه لأقرب موضع يعلنه.",
          en: "The law of physics is non-negotiable: light in fiber travels ~200 km per millisecond one way. A user in Riyadh requesting a file from a Tokyo server waits ~70 ms before the first byte — then add the TCP handshake (another RTT) and the TLS handshake (one or two RTTs) — 4 round trips before any data!\n\nA CDN (Content Delivery Network) solves the equation geographically:\n\n- A network of Points of Presence (PoPs) distributed across hundreds of cities\n- It replicates static content (images, CSS, JS, video) near the user\n- RTT drops from 70 to typically 5-15 ms, and handshakes become near-instant\n\nThe smart part: DNS resolves the CDN name (like cdn.example.com) returning the PoP nearest geographically and topologically to the user — sometimes via anycast: one IP address announced from dozens of locations, with routing steering you to the nearest announcer.",
        },
      },
      {
        heading: { ar: "التخزين المؤقت: عقود بين المتصفح و CDN والأصل", en: "Caching: Contracts Between Browser, CDN and Origin" },
        body: {
          ar: "الطلب يمر عبر ثلاث فرص للتخزين: متصفحك ثم PoP القريب ثم خادم الأصل (Origin). الترويسات تكتب العقود:\n\n- Cache-Control: max-age=3600 — صالح لمدة ساعة بلا سؤال أحد\n- s-maxage: يخص CDN فقط (غالباً أطول من المتصفح)\n- Cache-Control: no-store — لا تخزن إطلاقاً (بيانات شخصية!)\n\nعند انتهاء الصلاحية، التحقق الذكي بدل إعادة التنزيل:\n\n- الخادم يعطي ETag (بصمة المحتوى مثل مُجمَّع تشفيري)\n- العميل يسأل: If-None-Match: <ETag السابق>\n- إن لم يتغير المحتوى يرد الخادم: 304 Not Modified — بلا جسم! بايتات قليلة عبر المحيط\n\nكلمات عملية: TTL للصور الثابتة شهور (الاسم يحمل إصداراً: app.v42.js)، و purge عند التحديث يعمل فوراً في CDN الحديثة، و stale-while-revalidate يقدم النسخة القديمة ويجدد في الخلفية بلا انتظار المستخدم.",
          en: "A request passes three caching opportunities: your browser, the nearby PoP, then the origin server. Headers write the contracts:\n\n- Cache-Control: max-age=3600 — valid for an hour without asking anyone\n- s-maxage: for the CDN only (usually longer than the browser's)\n- Cache-Control: no-store — never cache (personal data!)\n\nOn expiry, smart validation instead of re-downloading:\n\n- The server provides an ETag (a content fingerprint like a cryptographic hash)\n- The client asks: If-None-Match: <previous ETag>\n- If unchanged, the server replies 304 Not Modified — no body! A few bytes across the ocean\n\nPractical wording: months-long TTL for static images (versioned names: app.v42.js), instant purge on update in modern CDNs, and stale-while-revalidate serving the old copy while refreshing in the background without user waiting.",
        },
        code: {
          lang: "bash",
          snippet: "curl -I https://cdn.example.com/logo.png\n\nHTTP/2 200\ncontent-type: image/png\ncache-control: public, max-age=86400, s-maxage=604800\netag: \"a8f3b2c1\"\nx-cache: HIT from riyadh-po-01\n\n# إعادة الطلب مع بصمة ETag\ncurl -H 'If-None-Match: \"a8f3b2c1\"' -I https://cdn.example.com/logo.png\nHTTP/2 304",
        },
      },
      {
        heading: { ar: "REST APIs: الويب كلغة برمجة", en: "REST APIs: The Web as a Programming Language" },
        body: {
          ar: "API (واجهة برمجة التطبيقات) تسمح للبرامج بالتحدث مع الخوادم بنفس لغة الويب: HTTP. وفلسفة REST تقسم التطبيق إلى موارد (Resources) لكل منها عنوان:\n\n- GET https://api.example.com/v1/users — قائمة المستخدمين\n- GET https://api.example.com/v1/users/42 — مستخدم واحد\n- POST https://api.example.com/v1/users — إنشاء (الجسم JSON: الاسم والإيميل)\n- PUT .../users/42 — استبدال كامل / PATCH — تعديل جزئي\n- DELETE .../users/42 — حذف\n\nمبادئ REST الجوهرية: عديمية الحالة (كل طلب يحمل توكنه)، الموارد لا الأفعال (GET /users/42 لا getUser?id=42)، والإصدارات في المسار (v1) لحماية التوافق.\n\nكود الحالة جزء من اللغة: 201 Created مع رأس Location للمورد الجديد، و 401 للمصادقة، و 404 للمورد غير الموجود، و 422 للتحقق الفاشل.",
          en: "An API (Application Programming Interface) lets programs talk to servers in the web's own language: HTTP. The REST philosophy organizes the app into resources, each with an address:\n\n- GET https://api.example.com/v1/users — list users\n- GET https://api.example.com/v1/users/42 — one user\n- POST https://api.example.com/v1/users — create (JSON body: name and email)\n- PUT .../users/42 — full replace / PATCH — partial edit\n- DELETE .../users/42 — remove\n\nCore REST principles: statelessness (each request carries its token), resources not actions (GET /users/42, not getUser?id=42), and versions in the path (v1) protecting compatibility.\n\nStatus codes are part of the language: 201 Created with a Location header for the new resource, 401 for authentication, 404 for a missing resource, 422 for failed validation.",
        },
        code: {
          lang: "bash",
          snippet: "curl -s https://api.github.com/users/octocat\n\n# طلب مصادق عليه: التوكن في رأس Authorization\ncurl -s -H \"Authorization: Bearer ghp_xxxxxxxx\" \\\n  https://api.github.com/user\n\n# إنشاء مورد عبر POST\ncurl -s -X POST -H \"Authorization: Bearer $TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"NetMastery\",\"private\":false}' \\\n  https://api.github.com/user/repos",
        },
      },
      {
        heading: { ar: "بوابة API: الحارس المُنظِّم", en: "The API Gateway: The Regulating Gatekeeper" },
        body: {
          ar: "عندما تكبر المنظومة (عشرات الخدمات الدقيقة) يظهر طبقة موحدة أمامها: بوابة API (API Gateway) تقدم:\n\n- نقطة دخول واحدة: المصادقة والتوثيق الموحد ثم التوجيه للخدمة الصحيحة\n- حدود المعدل (Rate Limiting): 429 Too Many Requests مع رؤوس RateLimit-Limit و Reset — حماية الخدمات من الإفراط والهجمات\n- الترتيب والتحويل: نسخ v1 و v2 للعملاء المختلفين، وتجميع ردود عدة خدمات في طلب واحد\n- المراقبة والتسجيل المركزي ولوحات التحليلات\n\nالمصادقة الحديثة سلسلة ترقية: مفتاح API (API Key) بسيط للتطبيقات الموثوقة، ثم OAuth 2.0: المستخدم ي authorize التطبيق فيحصل على Access Token قصير العمر، ثم JWT: توكن موقَّع ذاتياً يحمل الهوية والصلاحيات — البوابة تتحقق من التوقيع محلياً بلا استعلام مركزي في كل طلب.",
          en: "When the system grows (dozens of microservices), a unified layer appears in front: an API Gateway providing:\n\n- A single entry point: unified authentication and routing to the right service\n- Rate limiting: 429 Too Many Requests with RateLimit-Limit and Reset headers — protecting services from overload and attacks\n- Composition and transformation: v1 and v2 views for different consumers, aggregating multiple services into one response\n- Central monitoring, logging, and analytics dashboards\n\nModern authentication is an upgrade ladder: an API Key for trusted simple apps, then OAuth 2.0: the user authorizes the app, which obtains a short-lived access token, then JWTs: self-signed tokens carrying identity and scopes — the gateway verifies the signature locally without a central lookup per request.",
        },
      },
      {
        heading: { ar: "ما بعد REST: gRPC و GraphQL و Edge Computing", en: "Beyond REST: gRPC, GraphQL and Edge Computing" },
        table: {
          caption: { ar: "REST مقابل gRPC و GraphQL و Webhooks", en: "REST vs gRPC, GraphQL and Webhooks" },
          headers: [
            { ar: "التقنية", en: "Technology" },
            { ar: "النقل والصيغة", en: "Transport & format" },
            { ar: "نقطة القوة", en: "Strength" },
            { ar: "الاستخدام الأمثل", en: "Best fit" },
          ],
          rows: [
            [
              { ar: "REST", en: "REST" },
              { ar: "HTTP نصي JSON", en: "HTTP with JSON text" },
              { ar: "بسيط وعالمي ومخزّن مؤقتاً", en: "Simple, universal, cacheable" },
              { ar: "واجهات APIs عامة", en: "Public APIs" },
            ],
            [
              { ar: "gRPC", en: "gRPC" },
              { ar: "HTTP/2 ثنائي Protobuf", en: "HTTP/2 binary Protobuf" },
              { ar: "أداء عالٍ وتدفقات ثنائية الاتجاه", en: "High performance, bidirectional streaming" },
              { ar: "خدمات دقيقة داخلية", en: "Internal microservices" },
            ],
            [
              { ar: "GraphQL", en: "GraphQL" },
              { ar: "HTTP استعلام واحد محدد الشكل", en: "HTTP single shaped query" },
              { ar: "العميل يحدد البيانات بدقة — لا طلبات متعددة", en: "Client defines exactly the data — no over-fetching" },
              { ar: "واجهات أمامية معقدة", en: "Complex frontends" },
            ],
            [
              { ar: "Webhooks", en: "Webhooks" },
              { ar: "HTTP صادر من الخادم عند الحدث", en: "HTTP pushed by the server on events" },
              { ar: "إشعار فوري بلا استقصاء", en: "Instant notification without polling" },
              { ar: "التكاملات والإشعارات", en: "Integrations and notifications" },
            ],
          ],
        },
        body: {
          ar: "REST منتصر واسعاً لكن ليس بلا منافسين لهم مواطن قوتهم:\n\n- gRPC: RPC ثنائي فوق HTTP/2 — تدفقات ثنائية متعددة الاتجاهات بضغط protobuf، مثالي للخدمات الداخلية عالية الأداء (Google و Netflix داخلياً)\n- GraphQL: العميل يحدد شكل البيانات في استعلام واحد بدل عشرات الطلبات REST — مرونة للواجهات المعقدة\n- Webhooks: عكس الاستقصاء (Polling) — الخادم يتصل بك عند الحدث بدل أن تسأله كل دقيقة\n\nاتجاه CDN الحديث: Edge Computing — تشغيل أكواد خفيفة (Cloudflare Workers و AWS Lambda@Edge) داخل PoP نفسه قرب المستخدم: تحقق منطقي، تخصيص محتوى، و even تقديم APIs كاملة من الحافة — المستقبل يمزج CDN بتطبيقات البنية كلها.",
          en: "REST has broadly won, but not without rivals with their strongholds:\n\n- gRPC: binary RPC over HTTP/2 — bidirectional multiplexed streams with protobuf compression, ideal for high-performance internal services (Google and Netflix internally)\n- GraphQL: the client specifies the data shape in one query instead of dozens of REST calls — flexibility for complex frontends\n- Webhooks: the reverse of polling — the server calls you upon the event instead of you asking every minute\n\nThe modern CDN trend: Edge Computing — running lightweight code (Cloudflare Workers, AWS Lambda@Edge) inside the PoP itself near the user: logic checks, content personalization, and even whole APIs served from the edge — the future is blending the CDN with the application tier.",
        },
        tip: {
          ar: "اختبار فوري لقربك من CDN: قارن زمن الاستجابة للموقع نفسه عبر curl -w مع مستخدم في قارة أخرى — الفرق الجغرافي يعمل أمامك.",
          en: "An instant CDN proximity test: compare response time for the same site via curl -w with a user on another continent — the geographic gap works right before your eyes.",
        },
      },
    ],
    keyPoints: [
      { ar: "المسافة = زمن استجابة لا مفر منه، و CDN يقرب المحتوى عبر PoPs عالمية", en: "Distance = unavoidable latency; CDNs pull content closer via global PoPs" },
      { ar: "الترويسات عقود تخزين: max-age للصلاحية و ETag/304 للتحقق الذكي", en: "Headers are caching contracts: max-age for validity, ETag/304 for smart validation" },
      { ar: "REST: موارد بعناوين + أفعال HTTP + عديمية حالة، والرموز لغة مشتركة", en: "REST: addressable resources + HTTP verbs + statelessness, with codes as a shared language" },
      { ar: "بوابة API توحد المصادقة وحدود المعدل (429) والمراقبة أمام الخدمات", en: "The API gateway unifies authentication, rate limiting (429) and monitoring in front of services" },
      { ar: "JWT توكن موقَّع يتحقق منه محلياً؛ و gRPC/GraphQL/Webhooks تكمل المشهد", en: "JWT is a self-signed token verified locally; gRPC/GraphQL/Webhooks complete the scene" },
    ],
    commands: [
      { cmd: "curl -s -o /dev/null -w \"%{time_total}\" https://example.com", desc: { ar: "قياس زمن الاستجابة الكامل لطلب واحد", en: "Measure the total response time of a single request" } },
      { cmd: "curl -I https://cdn.example.com/img.png", desc: { ar: "فحص ترويسات التخزين المؤقت و ETag و x-cache للـ CDN", en: "Inspect CDN caching headers, ETag and x-cache" } },
      { cmd: "curl -s https://api.github.com/users/octocat", desc: { ar: "استدعاء REST API عامة وقراءة JSON", en: "Call a public REST API and read the JSON" } },
      { cmd: "dig +short cdn.jsdelivr.net", desc: { ar: "رؤية بنية CDN عبر تحليل اسمها في DNS", en: "See a CDN's structure by resolving its DNS name" } },
    ],
    quiz: [
      {
        q: { ar: "مستخدم في جدة يحمّل ملفاً من خادم Origin في لندن عبر CDN. لماذا تحسّن السرعة كثيراً؟", en: "A user in Jeddah downloads a file whose origin is in London via a CDN. Why does speed improve greatly?" },
        options: [
          { ar: "لأن CDN يضغط الملفات دائماً", en: "Because CDNs always compress files" },
          { ar: "لأن الملف يُخدم من نقطة PoP قريبة في المنطقة بعد نسخه، فتنخفض المسافة وزمن الاستجابة والمصافحات", en: "Because the file is served from a nearby regional PoP after replication, cutting distance, latency and handshakes" },
          { ar: "لأن CDN يرفع سرعة الجهاز", en: "Because the CDN boosts the device's speed" },
          { ar: "لأن HTTP يصبح أسرع قرب الخادم", en: "Because HTTP gets faster near the server" },
        ],
        correct: 1,
        explain: { ar: "فكرة CDN الجوهرية: تقريب البيانات من المستخدم. أول تحميل يجلب الملف من Origin وينسخه في PoP، وكل المستخدمين اللاحقين في المنطقة يخدمون محلياً بزمن ملّي قصير.", en: "The core CDN idea: moving data closer to users. The first download fetches from origin and replicates into the PoP; every subsequent regional user is served locally at low milliseconds." },
      },
      {
        q: { ar: "أرسل العميل If-None-Match مع ETag صحيح لم يتغير محتواه. ما رد الخادم المتوقع؟", en: "The client sends If-None-Match with a still-valid, unchanged ETag. What response is expected?" },
        options: [
          { ar: "200 مع الملف كاملاً", en: "200 with the full file" },
          { ar: "304 Not Modified بلا جسم", en: "304 Not Modified with no body" },
          { ar: "404 Not Found", en: "404 Not Found" },
          { ar: "429 Too Many Requests", en: "429 Too Many Requests" },
        ],
        correct: 1,
        explain: { ar: "آلية التحقق الشرطي: الخادم يقارن البصمة، فإذا تطابقت أثبت أن نسخة العميل سليمة ويكتفي بإشعار 304 — توفير نقل كامل للملف.", en: "The conditional validation mechanism: the server compares the fingerprint; a match proves the client's copy is intact and a 304 notice suffices — saving the full file transfer." },
      },
      {
        q: { ar: "تطبيق يستدعي GET /users/42 لجلب مستخدم. أي مبدأ REST يجسده هذا؟", en: "An app calls GET /users/42 to fetch a user. Which REST principle does this embody?" },
        options: [
          { ar: "عديمية الحالة فقط", en: "Statelessness only" },
          { ar: "الموارد بعناوين وليس أفعالاً: اسم المورد + المنهج يحددان العملية", en: "Resources with addresses, not actions: resource name + method define the operation" },
          { ar: "التخزين المؤقت الإلزامي", en: "Mandatory caching" },
          { ar: "التجميع من الخوادم", en: "Server aggregation" },
        ],
        correct: 1,
        explain: { ar: "GET /users/42 = مورد (المستخدم 42) عبر فعل القراءة. الطريقة غير REST ستكون GET /getUser?id=42 — فعلٌ في المسار يكسر وحدة المورد.", en: "GET /users/42 = a resource (user 42) accessed via the read verb. The non-REST way would be GET /getUser?id=42 — an action in the path, breaking resource uniformity." },
      },
      {
        q: { ar: "أرسل تطبيق 1000 طلب في الدقيقة على API يسمح بـ 100 فقط. ما الرمز الذي سيراه؟", en: "An app sends 1000 requests per minute to an API allowing only 100. What code will it see?" },
        options: [
          { ar: "401 Unauthorized", en: "401 Unauthorized" },
          { ar: "403 Forbidden", en: "403 Forbidden" },
          { ar: "429 Too Many Requests", en: "429 Too Many Requests" },
          { ar: "500 Internal Server Error", en: "500 Internal Server Error" },
        ],
        correct: 2,
        explain: { ar: "بوابة API تطبق حدود المعدل برمز 429 المخصص لهذا الغرض، وترسل رؤوساً تخبرك بالحد ومتى يُعاد الضبط — استعمل backoff أُسّياً بدل إعادة المحاولة الفورية.", en: "The API gateway enforces rate limits with the dedicated 429 code, plus headers telling you the limit and reset time — use exponential backoff instead of immediate retries." },
      },
    ],
  },
];
