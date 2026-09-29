import type { Lesson } from "@/lib/types";

// ─── Module 07: Transport Layer — TCP vs UDP, segments, handshake,
//     flow/congestion control, ports, sockets (l061-l070) ────────────────
export const m07_LESSONS: Lesson[] = [
  {
    id: "l061",
    moduleId: "m07",
    order: 1,
    level: "intermediate",
    title: {
      ar: "دور طبقة النقل: تعدد الإرسال والمنافذ",
      en: "The Transport Layer's Role: Multiplexing & Ports",
    },
    summary: {
      ar: "كيف تُدير طبقة النقل عشرات التطبيقات المتزامنة على جهاز واحد وعنوان IP واحد، ولماذا تُعد المنافذ مفتاح هذه المعجزة.",
      en: "How the transport layer runs dozens of concurrent apps on one device behind one IP address, and why ports are the key to that miracle.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "أين تجلس طبقة النقل؟", en: "Where the Transport Layer Sits" },
        body: {
          ar: "طبقة النقل (Transport Layer) هي الطبقة الرابعة في نموذج OSI، وهي آخر محطة يتولاها نظام التشغيل قبل أن تغادر البيانات جهازك إلى عالم الإنترنت.\n\nبينما تعمل طبقة الشبكة (IP) على توصيل الحزمة من جهاز إلى جهاز — من عنوان إلى عنوان — تعمل طبقة النقل على توصيل البيانات من عملية إلى عملية، أي من تطبيق إلى تطبيق.\n\n- IP يجيب عن سؤال: «كيف يصل هذا إلى ذلك الحاسوب؟»\n- النقل يجيب عن سؤال: «كيف يصل هذا إلى ذلك التطبيق داخل الحاسوب؟»\n\nوحدة البيانات هنا تسمى «مقطعاً» (Segment) في حالة TCP، و«مخطط بيانات» (Datagram) في حالة UDP، وكل منهما يُغلَّف داخل حزمة IP.",
          en: "The transport layer is Layer 4 of the OSI model — the last stop handled by your operating system before data leaves your device into the Internet.\n\nWhile the network layer (IP) delivers a packet from machine to machine — address to address — the transport layer delivers data from process to process, application to application.\n\n- IP answers: \"how does this reach that computer?\"\n- Transport answers: \"how does this reach that application inside the computer?\"\n\nThe unit of data here is called a segment in TCP and a datagram in UDP, and each one gets encapsulated inside an IP packet.",
        },
      },
      {
        heading: { ar: "تعدد الإرسال (Multiplexing)", en: "Multiplexing: Many Apps, One Wire" },
        body: {
          ar: "جهازك الآن يفتح متصفحاً مع اثني عشر تبويباً، وبريداً يجدد نفسه، ومكالمة فيديو، وتحديثات نظام في الخلفية — كل ذلك عبر بطاقة شبكة واحدة وعنوان IP واحد. كيف؟\n\nالجواب هو تعدد الإرسال (Multiplexing): قبل خروج أي بيانات، يضيف نظام التشغيل ترويسة نقل تحمل «منفذ المصدر» و«منفذ الوجهة»، فيصبح لكل تطبيق مسار موسوم خاص به داخل القناة الفيزيائية نفسها.\n\n- المتصفح يرسل من منفذ عشوائي مثل 52344 نحو المنفذ 443\n- مكالمة الفيديو تستخدم منافذ UDP الخاصة بالوسائط\n- البريد يستهدف المنفذ 993\n\nهذا الخلط المنظم هو ما يجعل الإنترنت متعدد المهام بامتياز — آلاف المحادثات المستقلة تتقاسم السلك الواحد دون أن تختلط.",
          en: "Right now your device runs a browser with twelve tabs, a self-refreshing mail client, a video call, and OS updates in the background — all over one NIC and one IP address. How?\n\nThe answer is multiplexing: before any data leaves, the OS adds a transport header carrying a source port and a destination port, giving each application its own labeled lane inside the same physical channel.\n\n- The browser sends from a random port like 52344 toward port 443\n- The video call uses its UDP media ports\n- Email targets port 993\n\nThis disciplined mixing is what makes the Internet multitask brilliantly — thousands of independent conversations share one wire without ever tangling.",
        },
      },
      {
        heading: { ar: "فصل تعدد الإرسال (Demultiplexing)", en: "Demultiplexing: Delivering to the Right App" },
        table: {
          caption: { ar: "ثلاث جلسات متزامنة نحو المنفذ 443 نفسه", en: "Three concurrent sessions toward the same port 443" },
          headers: [
            { ar: "البروتوكول", en: "Proto" },
            { ar: "منفذ المصدر", en: "Source port" },
            { ar: "IP المصدر", en: "Source IP" },
            { ar: "الوجهة", en: "Destination" },
          ],
          rows: [
            [
              { ar: "TCP", en: "TCP" },
              { ar: "52344", en: "52344" },
              { ar: "192.168.1.10", en: "192.168.1.10" },
              { ar: "142.250.74.100:443", en: "142.250.74.100:443" },
            ],
            [
              { ar: "TCP", en: "TCP" },
              { ar: "52345", en: "52345" },
              { ar: "192.168.1.22", en: "192.168.1.22" },
              { ar: "142.250.74.100:443", en: "142.250.74.100:443" },
            ],
            [
              { ar: "TCP", en: "TCP" },
              { ar: "61200", en: "61200" },
              { ar: "10.0.0.5", en: "10.0.0.5" },
              { ar: "142.250.74.100:443", en: "142.250.74.100:443" },
            ],
          ],
        },
        body: {
          ar: "عند وصول الحزمة إلى وجهتها، يقرأ نظام التشغيل حقلي المنافذ من ترويسة النقل ويقرر: أي عمليةٍ تستلم هذه البيانات؟ هذه العملية تسمى فصل تعدد الإرسال (Demultiplexing).\n\nمفتاح القرار ليس المنفذ وحده، بل التركيبة الكاملة: بروتوكول النقل (TCP أو UDP)، منفذ الوجهة، عنوان IP للمصدر، ومنفذ المصدر — ما يُعرف بالصف الرباعي (4-tuple).\n\n- خادم ويب واحد على المنفذ 443 يخدم آلاف العملاء المتزامنين\n- كل عميل يملك تركيبة فريدة (IP مختلف أو منفذ مصدر مختلف)\n- لذلك لا تتضارب المقاطع أبداً داخل الخادم\n\nهذا أيضاً ما يسمح لخادم واحد بخدمة مئات آلاف الاتصالات المتزامنة نظرياً — الحد العملي هو ذاكرة النواة لا رقم المنفذ. انظر بنفسك كيف يفرّق الجدول بين ثلاثة اتصالات نحو المنفذ نفسه:",
          en: "When a packet arrives at its destination, the OS reads the port fields from the transport header and decides which process gets the data. That decision process is demultiplexing.\n\nThe key is not the port alone but the full combination: transport protocol (TCP or UDP), destination port, source IP address, and source port — known as the 4-tuple.\n\n- One web server on port 443 serves thousands of concurrent clients\n- Each client has a unique combination (different IP or different source port)\n- So segments never collide inside the server\n\nThis is also what lets a single server theoretically serve hundreds of thousands of concurrent connections — the practical limit is kernel memory, not the port number. See for yourself how the table separates three connections toward the same port:",
        },
        code: {
          lang: "text",
          snippet: "$ ss -tn state established\nRecv-Q Send-Q Local Address:Port   Peer Address:Port\n0      0      192.168.1.20:52344  142.250.74.78:443\n0      0      192.168.1.20:52351  142.250.74.78:443\n0      0      192.168.1.20:52677  93.184.216.34:443\n\n# ثلاثة اتصالات إلى المنفذ 443 نفسه:\n# تميزها النواة بعناوين المصدر ومنافذ المصدر (الصف الرباعي)\n# Three connections to the same port 443:\n# the kernel separates them by source IPs and source ports (4-tuple)",
        },
        tip: {
          ar: "«المنفذ مفتوح» يعني حرفياً: هناك عملية عقدت نداء استماع (listen) على هذا الرقم — لا أكثر ولا أقل.",
          en: "A port being \"open\" literally means: some process made a listen() call on that number — nothing more, nothing less.",
        },
      },
      {
        heading: { ar: "تشريح رقم المنفذ", en: "Port Number Anatomy" },
        tip: {
          ar: "عند قراءة أي اتصال اقرأ الرباعية كاملة: بروتوكول + منفذ مصدر + منفذ وجهة + عناوين — الاتصالان قد يتشابهان في منفذ الوجهة ويختلفان في كل شيء آخر.",
          en: "When reading any connection, read the full 4-tuple: protocol + source port + destination port + addresses — two sessions may share a destination port yet differ in everything else.",
        },
        body: {
          ar: "المنفذ رقم بطول 16 بت، أي 65,536 قيمة ممكنة تمتد من 0 إلى 65,535. ترويسة النقل تحمل منفذين دائماً: المصدر والوجهة، ولكلٍّ دور مختلف تماماً.\n\n- منفذ الوجهة يحدد الخدمة المطلوبة (443 = HTTPS مثلاً، و53 = DNS)\n- منفذ المصدر يحدد «باب الرد» في جهازك — منفذ مؤقت عشوائي يختاره النظام\n\nحين يرد الخادم، يعكس الحقلين فيصبح منفذك المؤقت هو وجهته — وهكذا يجد الرد طريقه إلى تطبيقك بالضبط وليس إلى جارك في التبويب الآخر.\n\nجرّب الآن مراقبة الجدول الحي للمنافذ على جهازك:",
          en: "A port is a 16-bit number, giving 65,536 possible values from 0 to 65,535. The transport header always carries two ports: source and destination, each playing a completely different role.\n\n- The destination port identifies the service you want (443 = HTTPS, 53 = DNS, for example)\n- The source port is the \"reply door\" on your device — a random ephemeral port picked by the OS\n\nWhen the server replies, it swaps the two fields, making your ephemeral port its destination — so the reply finds exactly your app, not your neighbor in the other browser tab.\n\nTry watching the live table of open ports on your machine right now:",
        },
        code: {
          lang: "bash",
          snippet: "# كل مقابس TCP/UDP مع أرقام المنافذ\nss -tun\n\n# مع PID واسم العملية (يحتاج صلاحيات لعرض عمليات الآخرين)\nss -tunp\n\n# ما الذي يستمع عليه جهازك الآن؟\nss -tlnp",
        },
      },
      {
        heading: { ar: "فلسفتان لنقل البيانات", en: "Two Philosophies of Delivery" },
        table: {
          caption: { ar: "TCP مقابل UDP: المقارنة الحاسمة", en: "TCP vs UDP: the decisive comparison" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "TCP", en: "TCP" },
            { ar: "UDP", en: "UDP" },
          ],
          rows: [
            [
              { ar: "الاتصال", en: "Connection" },
              { ar: "مصافحة قبل الإرسال", en: "Handshake before sending" },
              { ar: "لا شيء — أرسل فوراً", en: "None — fire away" },
            ],
            [
              { ar: "الموثوقية", en: "Reliability" },
              { ar: "إقرارات وإعادة إرسال للفاقد", en: "ACKs and retransmission of losses" },
              { ar: "أفضل جهد بلا ضمانات", en: "Best effort, no guarantees" },
            ],
            [
              { ar: "الترتيب", en: "Ordering" },
              { ar: "مضمون بأرقام التسلسل", en: "Guaranteed via sequence numbers" },
              { ar: "قد يصل بلا ترتيب", en: "May arrive out of order" },
            ],
            [
              { ar: "حجم الترويسة", en: "Header size" },
              { ar: "20-60 بايتاً", en: "20-60 bytes" },
              { ar: "8 بايتات فقط", en: "Just 8 bytes" },
            ],
            [
              { ar: "ضبط التدفق والازدحام", en: "Flow & congestion control" },
              { ar: "نافذة انزلاقية وبدء بطيء وAIMD", en: "Sliding window, slow start, AIMD" },
              { ar: "لا شيء — التطبيق مسؤول", en: "None — the application decides" },
            ],
            [
              { ar: "أبرز الاستخدامات", en: "Classic uses" },
              { ar: "الويب والبريد ونقل الملفات", en: "Web, email, file transfer" },
              { ar: "DNS و VoIP والألعاب والبث الحي", en: "DNS, VoIP, gaming, live streams" },
            ],
          ],
        },
        body: {
          ar: "توفر طبقة النقل بروتوكولين مختلفين في المزاج تماماً: TCP و UDP، واختيار أحدهما قرار هندسي صريح لا ذوق شخصي.\n\n- TCP: موثوق، مرتب، مؤكد الاستلام، متحكم في التدفق والازدحام — مقابل كلفة زمن وذاكرة\n- UDP: بسيط، سريع، بلا ضمانات — مقابل حرية كاملة وأدنى زمن ممكن\n\nمتصفحك يستخدم TCP (أو QUIC فوق UDP) لأن صفحة HTML ناقصة نصفها لا قيمة لها، بينما مكالمة VoIP تفضل UDP لأن وصول الصوت متأخراً بثانية أسوأ من فقدان جزء منه نهائياً.\n\nسنفصّل كل بروتوكول في الدروس القادمة، لكن القاعدة الذهبية ابقَ معك: الموثوقية كلفة، والسرعة تضحية — اختر ما يستحق تطبيقك دفعه.",
          en: "The transport layer offers two protocols with completely different temperaments: TCP and UDP, and picking one is an explicit engineering decision, not personal taste.\n\n- TCP: reliable, ordered, acknowledged, with flow and congestion control — at the cost of latency and memory\n- UDP: simple, fast, no guarantees — in exchange for total freedom and the lowest possible latency\n\nYour browser uses TCP (or QUIC over UDP) because an HTML page missing half its bytes is worthless, while a VoIP call prefers UDP because audio arriving a second late is worse than losing a piece of it forever.\n\nWe will dissect each protocol in the coming lessons, but keep the golden rule: reliability is a cost, speed is a trade-off — choose what your application is actually willing to pay for.",
        },
        tip: {
          ar: "عند قراءة أي أمر تشخيص، اسأل نفسك دائماً: أي حقل من الصف الرباعي يصفيه؟ ستقرأ مخرجات ss و netstat بعين جديدة.",
          en: "When reading any diagnostic command, always ask: which field of the 4-tuple is it filtering on? You will read ss and netstat output with new eyes.",
        },
      },
    ],
    keyPoints: [
      { ar: "طبقة النقل = L4: توصيل من تطبيق إلى تطبيق، لا من جهاز إلى جهاز", en: "Transport = L4: delivery from application to application, not machine to machine" },
      { ar: "المنفذ رقم 16 بت (0-65535) يعرّف العملية داخل الجهاز", en: "A port is a 16-bit number (0-65535) identifying the process inside the machine" },
      { ar: "مفتاح التمييز هو الصف الرباعي: بروتوكول + منفذ وجهة + IP مصدر + منفذ مصدر", en: "The demultiplexing key is the 4-tuple: protocol + destination port + source IP + source port" },
      { ar: "TCP = موثوقية بكلفة، UDP = سرعة بلا ضمانات", en: "TCP = reliability at a cost; UDP = speed with no guarantees" },
      { ar: "وحدة بيانات TCP مقطع (Segment) ووحدة UDP مخطط بيانات (Datagram)", en: "TCP's data unit is a segment; UDP's is a datagram" },
    ],
    commands: [
      { cmd: "ss -tunap", desc: { ar: "عرض كل مقابس TCP/UDP مع العمليات المالكة لها", en: "List all TCP/UDP sockets with their owning processes" } },
      { cmd: "sudo lsof -i :443", desc: { ar: "من الذي يستخدم المنفذ 443 الآن؟", en: "Who is using port 443 right now?" } },
      { cmd: "curl -v https://example.com", desc: { ar: "شاهد المنفذ الافتراضي 443 في العمل أثناء اتصال حقيقي", en: "Watch port 443 in action during a real connection" } },
    ],
    quiz: [
      {
        q: { ar: "ما الذي تحدده المنافذ في طبقة النقل؟", en: "What do ports identify in the transport layer?" },
        options: [
          { ar: "التطبيق أو العملية داخل الجهاز", en: "The application or process inside the machine" },
          { ar: "عنوان IP الخاص بالجهاز", en: "The machine's IP address" },
          { ar: "المبدل الذي تمر عبره البيانات", en: "The switch the data passes through" },
          { ar: "نوع وسيط النقل", en: "The type of transmission medium" },
        ],
        correct: 0,
        explain: {
          ar: "IP يحدد الجهاز، أما المنفذ فيحدد العملية داخل الجهاز — هذا هو جوهر تعدد الإرسال وفصله.",
          en: "IP identifies the machine; the port identifies the process inside it — that is the essence of multiplexing and demultiplexing.",
        },
      },
      {
        q: { ar: "خادم يستقبل اتصالين من عميلين مختلفين على المنفذ 443. ما الذي يفرّق بين الاتصالين لديه؟", en: "A server receives two connections from two clients on port 443. What distinguishes them?" },
        options: [
          { ar: "منفذ الوجهة (443) فقط", en: "The destination port (443) only" },
          { ar: "عنوان IP المصدر ومنفذ المصدر معاً", en: "The source IP address and source port together" },
          { ar: "عنوان MAC للعميل", en: "The client's MAC address" },
          { ar: "قيمة TTL في حزم العميل", en: "The TTL value in the client's packets" },
        ],
        correct: 1,
        explain: {
          ar: "الصف الرباعي (IP المصدر + منفذ المصدر + IP الوجهة + منفذ الوجهة) هو ما يجعل كل اتصال فريداً حتى مع منفذ وجهة واحد.",
          en: "The 4-tuple (source IP + source port + destination IP + destination port) makes each connection unique even with a single destination port.",
        },
      },
      {
        q: { ar: "كم عدد المنافذ المتاحة نظرياً؟", en: "How many ports are theoretically available?" },
        options: [
          { ar: "1,024", en: "1,024" },
          { ar: "32,768", en: "32,768" },
          { ar: "65,536", en: "65,536" },
          { ar: "65,535", en: "65,535" },
        ],
        correct: 2,
        explain: {
          ar: "المنفذ 16 بت، لذا 2^16 = 65,536 قيمة ممكنة (من 0 إلى 65,535).",
          en: "A port is 16 bits, so 2^16 = 65,536 possible values (from 0 to 65,535).",
        },
      },
      {
        q: { ar: "أي وحدة بيانات تُنسب إلى UDP تحديداً؟", en: "Which data unit is specifically attributed to UDP?" },
        options: [
          { ar: "المقطع (Segment)", en: "The segment" },
          { ar: "مخطط البيانات (Datagram)", en: "The datagram" },
          { ar: "الإطار (Frame)", en: "The frame" },
          { ar: "الحزمة (Packet)", en: "The packet" },
        ],
        correct: 1,
        explain: {
          ar: "UDP يرسل مخططات بيانات مستقلة، بينما يرسل TCP مقاطع مرقمة من تيار واحد، والإطار يخص طبقة الوصل والحزمة تخص IP.",
          en: "UDP sends independent datagrams, TCP sends numbered segments of one stream, frames belong to the link layer, and packets to IP.",
        },
      },
    ],
  },
  {
    id: "l062",
    moduleId: "m07",
    order: 2,
    level: "intermediate",
    title: {
      ar: "تشريح ترويسة TCP: كل حقل له حكمة",
      en: "TCP Header Anatomy: Every Field Has a Purpose",
    },
    summary: {
      ar: "جولة حقلاً بحقل داخل ترويسة TCP: أرقام التسلسل، الأعلام التسعة، النافذة، والخيارات — مع أمثلة tcpdump حقيقية.",
      en: "A field-by-field tour of the TCP header: sequence numbers, the nine flags, the window, and options — with real tcpdump examples.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "بنية الترويسة: 20 بايت كحد أدنى", en: "Header Structure: 20 Bytes Minimum" },
        table: {
          caption: { ar: "أهم حقول ترويسة TCP", en: "Key TCP header fields" },
          headers: [
            { ar: "الحقل", en: "Field" },
            { ar: "الحجم", en: "Size" },
            { ar: "وظيفته", en: "Purpose" },
          ],
          rows: [
            [
              { ar: "Source / Destination Port", en: "Source / Destination Port" },
              { ar: "2+2 bytes", en: "2+2 bytes" },
              { ar: "تمييز التطبيقين المتخاطبين", en: "Identify the two talking applications" },
            ],
            [
              { ar: "Sequence Number", en: "Sequence Number" },
              { ar: "4 bytes", en: "4 bytes" },
              { ar: "ترتيب البايتات المرسلة في التيار", en: "Ordering of sent bytes in the stream" },
            ],
            [
              { ar: "Acknowledgment Number", en: "Acknowledgment Number" },
              { ar: "4 bytes", en: "4 bytes" },
              { ar: "أول بايت متوقع تالياً", en: "The next byte expected" },
            ],
            [
              { ar: "Flags (SYN/ACK/FIN/RST...)", en: "Flags (SYN/ACK/FIN/RST...)" },
              { ar: "9 بتات", en: "9 bits" },
              { ar: "التحكم بمراحل دورة حياة الاتصال", en: "Control the connection lifecycle stages" },
            ],
            [
              { ar: "Window", en: "Window" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "نافذة الاستقبال المعلنة للمرسل", en: "The advertised receive window" },
            ],
            [
              { ar: "Checksum", en: "Checksum" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "فحص سلامة الترويسة والبيانات معاً", en: "Integrity of header and payload together" },
            ],
          ],
        },
        body: {
          ar: "تحتل ترويسة TCP عشرين بايت في حالتها المجردة، وتمتد حتى ستين بايت عند إضافة الخيارات. اقرأها كمصفوفة حقول متتابعة، كل حقل يحمل جزءاً من «عقد الاتفاق» الذي يحكم الاتصال:\n\n- منفذا المصدر والوجهة (4 بايت): هوية التطبيقين\n- رقم التسلسل (4 بايت): موقع هذا المقطع في تيار البايتات\n- رقم الإقرار (4 بايت): تأكيد ما وصل حتى الآن\n- الأعلام (12 بت شاملة المحجوز): لغة إشارات دورة الحياة\n- النافذة (2 بايت): إعلان سعة المخزن\n- المجموع الاختباري والمؤشر العاجل (4 بايت)\n- الخيارات (0-40 بايت): التفاوض على قدرات إضافية\n\nهذه الخريطة مرجعك مدى الحياة — ارسمها مرة واحدة بيدك وستقرأ أي التقاط حزم بعدها بارتياح:",
          en: "The TCP header occupies 20 bytes in its bare form and stretches to 60 bytes when options are added. Read it as an array of consecutive fields, each carrying part of the \"contract\" governing the connection:\n\n- Source and destination ports (4 bytes): the two applications' identity\n- Sequence number (4 bytes): this segment's position in the byte stream\n- Acknowledgment number (4 bytes): confirmation of what has arrived so far\n- Flags (12 bits including reserved): the lifecycle signal language\n- Window (2 bytes): receive-buffer capacity advertisement\n- Checksum and urgent pointer (4 bytes)\n- Options (0-40 bytes): extra capability negotiation\n\nThis map is your lifelong reference — draw it once by hand and you will read any packet capture with confidence afterward:",
        },
        code: {
          lang: "text",
          snippet: " 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |        Destination Port       |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                        Sequence Number                        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                     Acknowledgment Number                     |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|  Data |Res. |U|A|P|R|S|F|                                     |\n| Offset|     |R|C|S|S|Y|I|            Window                  |\n|       |     |G|K|H|N|T|N|                                     |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|           Checksum            |         Urgent Pointer        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Options (0-40 bytes)                       |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+",
        },
      },
      {
        heading: { ar: "أرقام التسلسل والإقرار", en: "Sequence & Acknowledgment Numbers" },
        body: {
          ar: "رقم التسلسل (Sequence Number) عدّاد بطول 32 بت يحدد رقم أول بايت بيانات في هذا المقطع. ولأنه 32 بت فهو يدور (wraps) بعد نحو أربعة مليارات بايت — وهذا مقبول لأن الأرقام تُقارن بالفروق لا بالقيم المطلقة.\n\nرقم الإقرار (Acknowledgment Number) يقول: «استلمت كل البايتات قبل هذا الرقم، فأرسل لي من هذا الرقم فصاعداً». وهو لا يصبح ذا معنى إلا إذا كان علم ACK مرفوعاً — أول حزمة SYN لا تحمل إقراراً، لذلك يظهر حقلها صفراً.\n\n- البادئ يولّد ISN (رقم التسلسل الابتدائي) عشوائياً — إجراء أمني يمنع توقع الأرقام وهجمات الانتحال\n- كلا الطرفين يملك عدّاده المستقل: واحد للبيانات الصادرة وواحد للواردة\n\nفي الدرس الخامس من هذه الوحدة نحل مثالاً كاملاً بايتاً بايت حتى تترسخ العلاقة بين الحقلين عملياً.",
          en: "The Sequence Number is a 32-bit counter identifying the first data byte in this segment. Being 32-bit, it wraps after roughly four billion bytes — acceptable because the numbers are compared as differences, not absolute values.\n\nThe Acknowledgment Number says: \"I have received every byte before this number; send me from this number onward.\" It is only meaningful when the ACK flag is set — the opening SYN carries no acknowledgment, so its ack field shows zero.\n\n- The initiator picks the ISN (Initial Sequence Number) randomly — a security measure against sequence prediction and spoofing attacks\n- Each side keeps its own independent counter: one for outbound data and one for inbound\n\nIn lesson five of this module we will work through a full byte-by-byte example so the relationship between these two fields becomes second nature.",
        },
      },
      {
        heading: { ar: "الأعلام التسعة", en: "The Nine Flags" },
        body: {
          ar: "تحمل ترويسة TCP تسعة أعلام، كل علم بت واحد يقلب معنى المقطع بالكامل — هي «لغة الإشارات» التي تدير دورة حياة الاتصال:\n\n- SYN: طلب مزامنة وبدء اتصال\n- ACK: حقل الإقرار صالح ومعتمد\n- FIN: لا مزيد من بيانات مرسلي — أريد الإغلاق بلطف\n- RST: أوقف فوراً — شيء مرفوض أو خاطئ\n- PSH: ادفع البيانات للتطبيق فوراً دون تجميع\n- URG: المؤشر العاجل ساري (نادر الاستخدام)\n- ECE و CWR: إشارات الإشعار الصريح بالازدحام (ECN)\n- NS: مجموع اختباري محمي (Nonce Sum)\n\nالأعلام الأربعة الأولى ستقابلها يومياً في tcpdump و Wireshark. لاحظ الصيغة المضغوطة التي يعرضها tcpdump: [S] للـ SYN و [S.] للـ SYN-ACK و [.] للـ ACK و [F.] للـ FIN و [R] للـ RST.",
          en: "The TCP header carries nine flags, each a single bit that completely changes the segment's meaning — the \"signal language\" running the connection's lifecycle:\n\n- SYN: request to synchronize and open a connection\n- ACK: the acknowledgment field is valid and authoritative\n- FIN: no more data from my side — I want a graceful close\n- RST: abort now — something is rejected or wrong\n- PSH: push data to the application immediately, no batching\n- URG: the urgent pointer is active (rarely used)\n- ECE and CWR: Explicit Congestion Notification signaling\n- NS: Nonce Sum (protected checksum)\n\nThe first four flags you will meet daily in tcpdump and Wireshark. Note tcpdump's compact notation: [S] for SYN, [S.] for SYN-ACK, [.] for ACK, [F.] for FIN, and [R] for RST.",
        },
        code: {
          lang: "bash",
          snippet: "# التقاط حزم SYN فقط (ولادة الاتصالات)\nsudo tcpdump -i eth0 'tcp[13] & 2 != 0'\n\n# حزم RST (الاتصالات المرفوضة أو المقطوعة)\nsudo tcpdump -i eth0 'tcp[13] & 4 != 0'\n\n# SYN و FIN معاً: شاهد ولادة وموت كل اتصال\nsudo tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-fin) != 0'",
        },
        tip: {
          ar: "البت رقم 13 من ترويسة TCP هو بايت الأعلام — لهذا تصفية tcpdump تكتب tcp[13]: بايت كامل تحجب منه الأعلام بمقارنة بيتية.",
          en: "Byte 13 of the TCP header is the flags byte — that is why tcpdump filters write tcp[13]: one whole byte you bitmask to test individual flags.",
        },
      },
      {
        heading: { ar: "النافذة والمجموع الاختباري والمؤشر العاجل", en: "Window, Checksum & Urgent Pointer" },
        body: {
          ar: "حقل النافذة (Window) بطول 16 بت يعلن حجم المساحة الحرة في مخزن استقبال المرسِل — أي «كم بايتاً يمكنك إرساله لي قبل انتظار إقراري؟». هذا هو أساس ضبط التدفق الذي نفصله في الدرس السادس، ويُضاعف فعلياً بمضاعف النافذة (Window Scale) المتفق عليه في المصافحة.\n\nالمجموع الاختباري (Checksum) يغطي الترويسة والبيانات معاً مع «ترويسة زائفة» تتضمن عناوين IP، ليكشف أي تلف في المسار. إن فشل التحقق يُرمى المقطع بصمت — لا رسالة خطأ ترسل — والمرسِل يعيد إرساله عند انتهاء مهلته.\n\nالمؤشر العاجل (Urgent Pointer) يعمل فقط مع علم URG ويشير إلى موضع بيانات «طارئة» داخل المقطع. قلّ استخدامه اليوم، وله تاريخ أمني طويل من الالتباس في التفسير بين الأنظمة، فاعتبره معرفة تاريخية أكثر من كونها ممارسة عملية.",
          en: "The Window field is 16 bits advertising the free space in the sender's receive buffer — in effect, \"how many bytes can you send me before waiting for my ACK?\" This is the backbone of flow control (lesson six), and it is effectively multiplied by the Window Scale factor agreed during the handshake.\n\nThe Checksum covers both header and data plus a \"pseudo-header\" containing the IP addresses, detecting corruption anywhere along the path. If verification fails, the segment is silently discarded — no error message is sent — and the sender retransmits it when its timer expires.\n\nThe Urgent Pointer only works with the URG flag and points to the position of \"urgent\" data inside the segment. It is rarely used today and has a long, messy history of interpretation differences between stacks, so treat it as historical knowledge rather than practice.",
        },
      },
      {
        heading: { ar: "حقل الخيارات", en: "The Options Field" },
        body: {
          ar: "حقل الخيارات (0-40 بايت) هو ما يجعل ترويسة TCP مرنة: يتفاوض الطرفان على قدرات إضافية أثناء المصافحة فقط — طرف يعرض والآخر يقبل:\n\n- MSS: الحد الأقصى لحجم بيانات المقطع الواحد (1460 في إيثرنت عادة)\n- Window Scale: مضاعف النافذة حتى 2^14 مرة\n- SACK-Permitted: السماح بالإقرار الانتقائي لاحقاً عند الفقد\n- Timestamps: قياس RTT دقيق مع حماية PAWS من الأرقام القديمة\n\nحقل Data Offset يخبرنا أين تبدأ البيانات: قيمته تُقاس بالكلمات (4 بايت)، لذا 20 بايت = 5 و 60 بايت = 15. وتُحشى الخيارات ببايتات NOP حتى يصبح الطول الكلي مضاعفاً لأربعة.\n\nالدروس القادمة تعتمد كلياً على فهم هذا الحقل: المصافحة تتحدث بلغة الخيارات، وضبط النافذة والازدحام يقومان عليها.",
          en: "The Options field (0-40 bytes) is what keeps the TCP header flexible: the two sides negotiate extra capabilities during the handshake only — one side offers, the other accepts:\n\n- MSS: maximum data size per segment (1460 on typical Ethernet)\n- Window Scale: window multiplier up to 2^14\n- SACK-Permitted: allow selective acknowledgment later on loss\n- Timestamps: precise RTT measurement plus PAWS protection against old duplicates\n\nThe Data Offset field tells us where data begins: it counts in 32-bit words, so 20 bytes = 5 and 60 bytes = 15. Options are padded with NOP bytes so the total length is a multiple of four.\n\nThe coming lessons lean entirely on this field: the handshake speaks the language of options, and both flow and congestion control are built upon them.",
        },
        tip: {
          ar: "بروكسي أو جدار حماية «يبتلع» خيار Window Scale من حزم SYN يحكم على الاتصال بنافذة 64KB مدى الحياة — سبب كلاسيكي لأداء سيئ على الروابط عالية التأخير.",
          en: "A proxy or firewall that strips the Window Scale option from SYNs sentences the connection to a 64KB window for life — a classic cause of bad performance on high-latency links.",
        },
      },
    ],
    keyPoints: [
      { ar: "ترويسة TCP: 20 بايتاً كحد أدنى و 60 بايتاً كحد أقصى", en: "TCP header: 20 bytes minimum, 60 bytes maximum" },
      { ar: "رقم التسلسل يحدد أول بايت بيانات، والإقرار يعلن أول بايت متوقع", en: "Sequence number points at the first data byte; acknowledgment announces the first byte expected" },
      { ar: "الأعلام التسعة: SYN و ACK و FIN و RST و PSH و URG و ECE و CWR و NS", en: "The nine flags: SYN, ACK, FIN, RST, PSH, URG, ECE, CWR, NS" },
      { ar: "حقل النافذة يعلن مساحة مخزن استقبال المعلِن (16 بت قبل المضاعف)", en: "The window field advertises the advertising side's receive-buffer space (16 bits before scaling)" },
      { ar: "الخيارات (MSS, WS, SACK, Timestamps) تُتفاوض في SYN فقط", en: "Options (MSS, WS, SACK, Timestamps) are negotiated in SYNs only" },
    ],
    commands: [
      { cmd: "sudo tcpdump -i eth0 -c 3 'tcp[tcpflags] & tcp-syn != 0'", desc: { ar: "التقاط أول 3 مصافحات TCP لرؤية ترويسة SYN حية", en: "Capture your first 3 TCP handshakes to see a live SYN header" } },
      { cmd: "ss -ti dst :443", desc: { ar: "اعرض MSS و RTT و cwnd لاتصالات HTTPS النشطة", en: "Show live MSS, RTT and cwnd for active HTTPS connections" } },
      { cmd: "sudo tcpdump -i eth0 -XX -c 1 'tcp port 443'", desc: { ar: "تفريغ hex لحزمة كاملة — اقرأ الحقول بنفسك", en: "Hex-dump one full packet — read the fields yourself" } },
    ],
    quiz: [
      {
        q: { ar: "ما الحد الأدنى لحجم ترويسة TCP؟", en: "What is the minimum size of a TCP header?" },
        options: [
          { ar: "8 بايت", en: "8 bytes" },
          { ar: "16 بايت", en: "16 bytes" },
          { ar: "20 بايت", en: "20 bytes" },
          { ar: "40 بايت", en: "40 bytes" },
        ],
        correct: 2,
        explain: {
          ar: "الترويسة الأساسية 20 بايتاً، وتمتد إلى 60 عند إضافة خيارات بحد أقصى 40 بايتاً.",
          en: "The base header is 20 bytes and stretches to 60 when options (max 40 bytes) are added.",
        },
      },
      {
        q: { ar: "أي علم يجب أن يكون مرفوعاً حتى يُعتبر حقل رقم الإقرار صالحاً؟", en: "Which flag must be set for the acknowledgment number field to be considered valid?" },
        options: [
          { ar: "SYN", en: "SYN" },
          { ar: "FIN", en: "FIN" },
          { ar: "ACK", en: "ACK" },
          { ar: "PSH", en: "PSH" },
        ],
        correct: 2,
        explain: {
          ar: "حقل الإقرار لا معنى له إلا مع علم ACK — ولهذا يظهر صفراً في حزمة SYN الأولى.",
          en: "The ack field is meaningless without the ACK flag — which is why it shows zero in the first SYN packet.",
        },
      },
      {
        q: { ar: "ماذا يعلن حقل النافذة في ترويسة TCP؟", en: "What does the Window field in a TCP header advertise?" },
        options: [
          { ar: "المساحة الفارغة في مخزن استقبال الجهة المعلِنة", en: "The free space in the advertising side's receive buffer" },
          { ar: "عدد المقاطع المسموح إرسالها في الثانية", en: "The number of segments allowed per second" },
          { ar: "سعة شبكة IP المتبقية للمسار", en: "The remaining IP network capacity on the path" },
          { ar: "عدد أجهزة NAT المسموح بمرورها", en: "The number of allowed NAT devices" },
        ],
        correct: 0,
        explain: {
          ar: "النافذة = المساحة الحرة في مخزن استقبال المعلِن، وهي أداة ضبط التدفق لحماية المستقبِل من الغرق.",
          en: "The window = free space in the advertiser's receive buffer — the flow-control tool protecting the receiver from being flooded.",
        },
      },
      {
        q: { ar: "ما الحد الأقصى لحجم حقل الخيارات في ترويسة TCP؟", en: "What is the maximum size of the TCP options field?" },
        options: [
          { ar: "20 بايتاً", en: "20 bytes" },
          { ar: "30 بايتاً", en: "30 bytes" },
          { ar: "40 بايتاً", en: "40 bytes" },
          { ar: "60 بايتاً", en: "60 bytes" },
        ],
        correct: 2,
        explain: {
          ar: "الخيارات حتى 40 بايتاً، لأن سقف الترويسة الكلي 60 بايتاً منها 20 أساسية.",
          en: "Options go up to 40 bytes, because the total header ceiling is 60 bytes minus the 20-byte base.",
        },
      },
    ],
  },
  {
    id: "l063",
    moduleId: "m07",
    order: 3,
    level: "intermediate",
    title: {
      ar: "UDP: السرعة عبر البساطة",
      en: "UDP: Speed Through Simplicity",
    },
    summary: {
      ar: "ترويسة من ثمانية بايتات فقط: كيف يحقق UDP أدنى زمن ممكن، ومتى يكون الخيار الهندسي الصحيح بدلاً من TCP.",
      en: "An eight-byte header: how UDP achieves minimal latency, and when it is the right engineering choice instead of TCP.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "ترويسة من 8 بايت فقط", en: "An 8-Byte Header" },
        table: {
          caption: { ar: "حقول ترويسة UDP الأربعة", en: "The four UDP header fields" },
          headers: [
            { ar: "الحقل", en: "Field" },
            { ar: "الحجم", en: "Size" },
            { ar: "وظيفته", en: "Purpose" },
          ],
          rows: [
            [
              { ar: "Source Port", en: "Source Port" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "منفذ المرسل — يمكن أن يكون صفراً نظرياً", en: "The sender's port — theoretically may be zero" },
            ],
            [
              { ar: "Destination Port", en: "Destination Port" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "منفذ التطبيق المستهدف", en: "The target application's port" },
            ],
            [
              { ar: "Length", en: "Length" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "طول الترويسة والبيانات معاً", en: "Total length of header plus payload" },
            ],
            [
              { ar: "Checksum", en: "Checksum" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "فحش اختياري في IPv4 — إلزامي في IPv6", en: "Optional in IPv4 — mandatory in IPv6" },
            ],
          ],
        },
        body: {
          ar: "بينما تفتح ترويسة TCP بـ 20 بايت على الأقل، تكتفي ترويسة UDP بثمانية بايتات وأربعة حقول — لا أعلام، لا أرقام تسلسل، لا نافذة، لا خيارات:\n\n- منفذ المصدر (2 بايت): باب الرد عند الحاجة\n- منفذ الوجهة (2 بايت): الخدمة المطلوبة\n- الطول (2 بايت): طول الترويسة والبيانات معاً بالبايت\n- المجموع الاختباري (2 بايت): اختياري في IPv4، إجباري في IPv6\n\nبعد هذه البايتات الثمانية تأتي البيانات مباشرة. هذه البساطة ليست كسلاً — بل فلسفة صريحة: يفعل البروتوكول أقل ما يمكن ويترك كل الذكاء للتطبيق فوقه.",
          en: "While the TCP header opens with at least 20 bytes, UDP's header needs just eight bytes and four fields — no flags, no sequence numbers, no window, no options:\n\n- Source port (2 bytes): the reply door if needed\n- Destination port (2 bytes): the service requested\n- Length (2 bytes): header plus data in bytes\n- Checksum (2 bytes): optional in IPv4, mandatory in IPv6\n\nData follows immediately after those eight bytes. This simplicity is not laziness — it is an explicit philosophy: the protocol does the bare minimum and leaves all intelligence to the application above it.",
        },
        code: {
          lang: "text",
          snippet: " 0      7 8     15 16    23 24    31\n+--------+--------+--------+--------+\n|     Source      |   Destination   |\n|      Port       |      Port       |\n+--------+--------+--------+--------+\n|     Length      |     Checksum    |\n+--------+--------+--------+--------+\n|           Data (if any) ...       |\n+-----------------------------------+",
        },
      },
      {
        heading: { ar: "لماذا UDP أسرع فعلاً؟", en: "Why UDP Is Actually Faster" },
        body: {
          ar: "ما الذي يجعل UDP أسرع من TCP؟ الجواب الدقيق: ما لا يفعله UDP. افحص القائمة وستجد كل بند منها كلفة حقيقية في عالم الاتصالات:\n\n- لا مصافحة: أول حزمة تحمل بيانات فعلية — صفر RTT للتأسيس\n- لا حالة في النواة: لا جداول اتصال ولا مخازن إعادة إرسال — خادم UDP يخدم ملايين «العملاء» دون تكلفة اتصال لكل واحد\n- لا انتظار إعادة الإرسال: ضياع حزمة لا يوقف التيار — حيوي للوسائط الحية\n- لا انسداد رأس الطابور: فقدان جزء لا يعطل الأجزاء اللاحقة في التطبيقات المصممة جيداً\n- ترويسة أصغر: 8 بايت مقابل 20 وما فوق — فرق ملموس في مليارات الحزم الصغيرة\n\nكل هذه المزايا تُدفع من رصيد واحد: الموثوقية. إذا ضاعت حزمة UDP فهي ضائعة إلى الأبد — البروتوكول لن يعرف ولن يهتم.",
          en: "What makes UDP faster than TCP? The precise answer: everything UDP does not do. Examine the list and each item is a real cost in the connectivity world:\n\n- No handshake: the first packet carries actual data — zero RTT to establish\n- No kernel state: no connection tables or retransmit buffers — a UDP server serves millions of \"clients\" with no per-connection cost\n- No retransmit waits: a lost packet does not stall the stream — vital for live media\n- No head-of-line blocking: losing one piece does not hold back later pieces in well-designed apps\n- Smaller header: 8 bytes versus 20+ — a tangible difference across billions of small packets\n\nAll these advantages are paid from one account: reliability. If a UDP datagram is lost, it is lost forever — the protocol will never know and never care.",
        },
      },
      {
        heading: { ar: "متى يكون UDP الخيار الصحيح؟", en: "When UDP Is the Right Choice" },
        body: {
          ar: "UDP ليس خياراً للطلاب الفاشلين — بل الاختيار الصحيح لفئة كاملة من التطبيقات التي تضرّها الموثوقية أكثر مما تنفعها:\n\n- DNS: الاستعلام 60 بايتاً تقريباً — إقامة اتصال TCP كامل (RTT إضافي) أغلى من إعادة الاستعلام نفسه عند الفقد\n- DHCP: الجهاز أصلاً لا يملك عنوان IP — يحتاج البث (broadcast) الذي يستطيعه UDP وحده\n- VoIP والوسائط الحية: الصوت الواصل متأخراً عديم القيمة، والإنسان لا يلاحظ فقد 20ms صوت\n- البث المباشر والبث المتعدد (Multicast): TCP اتصال ثنائي بحكم تعريفه، بينما UDP يبث لملايين المستقبلين دفعة واحدة\n- الألعاب: موقع اللاعب القديم بلا قيمة — أرسل الحالة الأحدث فوراً ودع القديمة تموت\n- SNMP و Syslog: المراقبة والسجلات — خسارة عينة ليست كارثة تستحق قطع التدفق\n\nوهناك الحالة الوسط المحذورة: نقل ملف ضخم فوق UDP بلا أي تحكم = كارثة على شبكة مزدحمة. القاعدة: احسب كلفة الفقد مقابل كلفة التأخير قبل الحسم.",
          en: "UDP is not the choice of failing students — it is the correct choice for an entire class of applications that are hurt by reliability more than helped by it:\n\n- DNS: a query is about 60 bytes — a full TCP connection (extra RTT) costs more than simply re-asking on loss\n- DHCP: the device does not even have an IP yet — it needs broadcast, which only UDP can do\n- VoIP and live media: audio arriving late is worthless, and humans never notice a lost 20ms of sound\n- Live streaming and multicast: TCP is by definition point-to-point, while UDP broadcasts to millions of receivers at once\n- Gaming: the player's old position is worthless — send the newest state immediately and let the old one die\n- SNMP and Syslog: monitoring and logging — losing one sample is not worth stalling the flow\n\nAnd there is the warned middle case: transferring a huge file over UDP with no control = disaster on a congested network. The rule: weigh the cost of loss against the cost of delay before deciding.",
        },
        code: {
          lang: "bash",
          snippet: "# استعلام DNS واحد فوق UDP: لاحظ البروتوكول والمنفذ 53\nsudo tcpdump -i eth0 -n 'udp port 53' -c 2\n# 11:02:11.551 IP 192.168.1.20.53315 > 8.8.8.8.53: 58123+ A? example.com. (31)\n# 11:02:11.572 IP 8.8.8.8.53 > 192.168.1.20.53315: 58123 1/0/0 A 93.184.216.34 (52)\n\n# ذهاب وإياب في رحلتين فقط — لا مصافحة ولا إغلاق\n# Two trips total — no handshake, no teardown",
        },
        tip: {
          ar: "قاعدة عملية: إن كان تطبيقك يتحمل فقد بيانات عابرة ويحتاج زمن استجابة أقل — فكّر في UDP أولاً، ثم اسأل: من سيبني الذكاء الناقص؟",
          en: "Practical rule: if your app tolerates transient loss and needs lower latency — think UDP first, then ask: who builds the missing intelligence?",
        },
      },
      {
        heading: { ar: "الموثوقية الانتقائية: درس QUIC", en: "Reliability à la Carte: The QUIC Lesson" },
        body: {
          ar: "أحدث فصول الحكاية: HTTP/3 يعمل فوق QUIC، و QUIC نفسه يعمل فوق UDP. لماذا يعود كبار المهندسين إلى UDP بعد هيمنة TCP لعقود؟\n\n- مصافحة 0/1-RTT: يدمج QUIC تفاوض TLS مع تأسيس الاتصال في جولة واحدة أو صفر\n- تدفقات مستقلة: فقدان حزمة في صورة واحدة لا يوقف تنزيل صفحة HTML — حل جذري لانسداد رأس الطابور\n- إقرار انتقائي واسترداد أسرع وأدق من TCP التقليدي\n- هوية الاتصال بمعرف دائم لا بالصف الرباعي — ينتقل جهازك بين WiFi وشبكة الجوال دون قطع جلساتك\n\nالدرس الهندسي الأعمق: عندما تحتاج موثوقية «مخصبة» بسرعة UDP، لا تعيد اختراع TCP كاملاً — ابنِ فوق UDP القدر الذي تحتاجه فقط. بهذا المنوال سارت بروتوكولات حديثة أخرى، من HTTP/3 إلى أنفاق الوسائط في تطبيقات المحادثة الشهيرة.",
          en: "The newest chapter of the story: HTTP/3 runs over QUIC, and QUIC itself runs over UDP. Why did top engineers go back to UDP after decades of TCP dominance?\n\n- 0/1-RTT handshake: QUIC merges TLS negotiation with connection setup in one round trip or zero\n- Independent streams: a lost packet in one image does not stall the HTML download — a head-of-line blocking cure\n- Selective acknowledgment and faster, more precise recovery than classic TCP\n- Connection identity by a durable ID rather than the 4-tuple — your device roams between WiFi and mobile without dropping sessions\n\nThe deeper engineering lesson: when you need reliability \"spiced\" with UDP speed, do not reinvent all of TCP — build on UDP exactly the slice you need. Other modern protocols followed the same pattern, from HTTP/3 to media tunnels in popular chat apps.",
        },
      },
    ],
    keyPoints: [
      { ar: "ترويسة UDP ثمانية بايتات وأربعة حقول فقط", en: "UDP's header is eight bytes with only four fields" },
      { ar: "لا حالة في النواة = خدمة ملايين العملاء بتكلفة ثابتة", en: "No kernel state = serving millions of clients at constant cost" },
      { ar: "استخداماته المثالية: DNS و DHCP و VoIP والبث والألعاب والمراقبة", en: "Ideal uses: DNS, DHCP, VoIP, streaming/multicast, gaming, monitoring" },
      { ar: "المجموع الاختباري اختياري في IPv4 وإجباري في IPv6", en: "The checksum is optional in IPv4 and mandatory in IPv6" },
      { ar: "QUIC يبني موثوقية انتقائية فوق UDP بدل إعادة اختراع TCP", en: "QUIC builds selective reliability on UDP instead of reinventing TCP" },
    ],
    commands: [
      { cmd: "dig example.com", desc: { ar: "استعلام DNS حقيقي فوق UDP 53", en: "A real DNS query over UDP 53" } },
      { cmd: "sudo tcpdump -i eth0 'udp port 53'", desc: { ar: "راقب استعلامات DNS وهي تغادر جهازك وتعود", en: "Watch DNS queries leave your device and return" } },
      { cmd: "ss -u -a", desc: { ar: "قائمة بكل مقابس UDP في النظام", en: "List every UDP socket on the system" } },
    ],
    quiz: [
      {
        q: { ar: "ما حجم ترويسة UDP؟", en: "What is the size of a UDP header?" },
        options: [
          { ar: "4 بايت", en: "4 bytes" },
          { ar: "8 بايت", en: "8 bytes" },
          { ar: "16 بايت", en: "16 bytes" },
          { ar: "20 بايت", en: "20 bytes" },
        ],
        correct: 1,
        explain: {
          ar: "أربعة حقول × بايتين لكل حقل = ثمانية بايتات، بعدها تأتي البيانات مباشرة.",
          en: "Four fields × 2 bytes each = 8 bytes, with data following immediately.",
        },
      },
      {
        q: { ar: "أي تطبيق يناسبه UDP أكثر من غيره؟", en: "Which application fits UDP best?" },
        options: [
          { ar: "تنزيل ملف ضخم", en: "Downloading a huge file" },
          { ar: "مكالمة صوتية حية", en: "A live voice call" },
          { ar: "نسخ قاعدة بيانات احتياطياً", en: "Replicating a database backup" },
          { ar: "إرسال بريد إلكتروني", en: "Sending email" },
        ],
        correct: 1,
        explain: {
          ar: "الصوت الحي يفضل سرعة الوصول على اكتماله: قطعة متأخرة بلا قيمة، وفقدان 20ms لا يُلاحظ.",
          en: "Live voice prefers arrival speed over completeness: a late piece is worthless, and losing 20ms goes unnoticed.",
        },
      },
      {
        q: { ar: "أي عبارة صحيحة عن المجموع الاختباري في UDP؟", en: "Which statement about the UDP checksum is correct?" },
        options: [
          { ar: "إجباري في جميع نسخ IP", en: "Mandatory in all IP versions" },
          { ar: "اختياري في IPv4 وواجب في IPv6", en: "Optional in IPv4, mandatory in IPv6" },
          { ar: "غير موجود في UDP أصلاً", en: "It does not exist in UDP at all" },
          { ar: "يغطي البيانات دون الترويسة", en: "It covers data but not the header" },
        ],
        correct: 1,
        explain: {
          ar: "IPv4 تركه اختيارياً (لكن الأنظمة الحديثة تحسبه)، و IPv6 جعله إجبارياً لأن IP نفسه بلا مجموع اختباري.",
          en: "IPv4 made it optional (though modern stacks compute it), while IPv6 mandates it since IP itself carries no checksum.",
        },
      },
      {
        q: { ar: "لماذا يحتاج DHCP إلى UDP تحديداً؟", en: "Why does DHCP specifically need UDP?" },
        options: [
          { ar: "لأن TCP أبطأ دائماً من UDP", en: "Because TCP is always slower than UDP" },
          { ar: "لأن العميل لا يملك عنوان IP بعد فيعتمد على البث", en: "Because the client has no IP yet and relies on broadcast" },
          { ar: "لأن منافذ TCP محجوزة لخدمات الويب", en: "Because TCP ports are reserved for web services" },
          { ar: "لأن UDP يشفر البيانات تلقائياً", en: "Because UDP encrypts data automatically" },
        ],
        correct: 1,
        explain: {
          ar: "العميل قبل الحصول على IP لا يستطيع حتى إنشاء اتصال TCP — رسائل DHCP تُبث (67/68) فوق UDP ويجيب الخادم على عنوان الطلب.",
          en: "A client without an IP cannot even form a TCP connection — DHCP messages broadcast (67/68) over UDP and the server replies to the requesting address.",
        },
      },
    ],
  },
  {
    id: "l064",
    moduleId: "m07",
    order: 4,
    level: "intermediate",
    title: {
      ar: "مصافحة TCP الثلاثية وإنهاء الاتصال",
      en: "The TCP 3-Way Handshake & Connection Teardown",
    },
    summary: {
      ar: "من SYN إلى TIME_WAIT: كيف يولد اتصال TCP ويموت بكرامة، ولماذا تُعد المصافحة حواراً ضرورياً لا ترفاً.",
      en: "From SYN to TIME_WAIT: how a TCP connection is born and dies with dignity, and why the handshake is a necessary dialogue, not a luxury.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "لماذا مصافحة أصلاً؟", en: "Why a Handshake at All?" },
        body: {
          ar: "تخيل أن تبدأ إلقاء محاضرة على شخص دون الاتفاق على لغة الحوار أو التأكد أنه يسمعك أصلاً. هذه بالضبط الفوضى التي تمنعها المصافحة: قبل تبادل أي بيانات، يتفق الطرفان على قواعد الجلسة.\n\nالمصافحة تحسم ثلاثة أمور جوهرية:\n\n- مزامنة أرقام التسلسل: كل طرف يعلن رقمه الابتدائي (ISN) ويعترف برقم الآخر\n- تبادل خيارات القدرات: MSS و Window Scale و SACK — لا تُتفاوض في أي مقطع آخر بعدها\n- إثبات الاتصال بالاتجاهين: كل طرف يثبت أنه يسمع الآخر فعلاً، لا مجرد أن حزمه تعبر الشبكة\n\nكلفة ذلك جولة ذهاب وإياب واحدة (1 RTT) قبل أول بايت بيانات. خاصية TCP Fast Open تسمح بحمل بيانات داخل SYN نفسه للتخفيف، لكن الكلاسيكي المتعارف عليه هو ثلاث حزم.",
          en: "Imagine launching into a lecture with someone before agreeing on a common language or confirming they can hear you at all. That is precisely the chaos the handshake prevents: before any data flows, both sides agree on the session's ground rules.\n\nThe handshake settles three essential matters:\n\n- Synchronizing sequence numbers: each side announces its ISN and acknowledges the other's\n- Exchanging capability options: MSS, Window Scale, SACK — never negotiated in any later segment\n- Proving bidirectional reachability: each side proves it hears the other, not just that its packets traverse the network\n\nThe cost is one round trip (1 RTT) before the first data byte. TCP Fast Open can carry data inside the SYN itself to soften this, but the classic contract remains three packets.",
        },
      },
      {
        heading: { ar: "الخطوات الثلاث", en: "The Three Steps" },
        diagram: {
          kind: "flow",
          title: { ar: "مصافحة TCP الثلاثية: فتح الاتصال", en: "The TCP three-way handshake: opening the connection" },
          items: [
            { ar: "SYN من العميل: أريد اتصالاً ورقم تسلسلي x", en: "Client SYN: let us connect, my sequence number is x" },
            { ar: "SYN-ACK من الخادم: قبلت ورقمي y", en: "Server SYN-ACK: accepted, my sequence is y" },
            { ar: "ACK من العميل: التأكيد الأخير", en: "Client ACK: the final confirmation" },
            { ar: "ESTABLISHED: قناة مزدوجة الاتجاه جاهزة للبيانات", en: "ESTABLISHED: a two-way channel ready for data" },
          ],
        },
        tip: {
          ar: "شغّل curl -v ثم راقب بأداة التقاط الحزم: أول ثلاث حزم في كل اتصال جديد هي SYN وSYN-ACK وACK — أسرع طريقة لترسيخ المصافحة في ذهنك.",
          en: "Run curl -v while capturing packets: the first three packets of any new connection are SYN, SYN-ACK, and ACK — the fastest way to burn the handshake into memory.",
        },
        body: {
          ar: "اتبع الأرقام في المخطط: العميل يفتح بالـ SYN حاملاً رقم تسلسله الابتدائي x، والخادم يرد بالـ SYN-ACK معترفاً برقم العميل (ack = x+1) ومعلناً رقمه الخاص y، وأخيراً العميل يؤكد (ack = y+1) — فيتحول الطرفان معاً إلى الحالة ESTABLISHED.\n\n- SYN: العميل يدخل SYN_SENT وينتظر\n- SYN-ACK: الخادم يدخل SYN_RCVD — نصف الطريق مكتمل\n- ACK: الطرفان ESTABLISHED — القناة مفتوحة للبيانات\n\nلاحظ دقة الإقرارات: كل اعتراف = الرقم المعلن + 1، لأن SYN نفسه يُحسب «بايتاً وهمياً» واحداً في عدّ التسلسل. المخطط التالي يعرض تتبعاً حقيقياً من tcpdump بعد المخطط النظري:",
          en: "Follow the numbers in the diagram: the client opens with a SYN carrying its initial sequence number x, the server replies with SYN-ACK acknowledging the client's number (ack = x+1) while announcing its own y, and finally the client confirms (ack = y+1) — both sides simultaneously become ESTABLISHED.\n\n- SYN: the client enters SYN_SENT and waits\n- SYN-ACK: the server enters SYN_RCVD — halfway done\n- ACK: both sides ESTABLISHED — the channel is open for data\n\nNote the precision of the acks: each acknowledgment = announced number + 1, because the SYN itself is counted as one \"phantom byte\" in sequence accounting. The diagram below shows a real tcpdump trace after the theoretical one:",
        },
        code: {
          lang: "text",
          snippet: "Client                                     Server\n  |                                          |\n  |--- SYN  (seq=x, flags=[S]) ------------->|  client: SYN_SENT\n  |                                          |  server: SYN_RCVD\n  |<-- SYN+ACK (seq=y, ack=x+1, [S.]) -------|\n  |                                          |\n  |--- ACK (seq=x+1, ack=y+1, [.]) --------->|  both: ESTABLISHED\n  |                                          |\n  |<========= data flows both ways =========>|\n\nReal capture (tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'):\n14:20:01.101 IP 192.168.1.20.52344 > 93.184.216.34.443: Flags [S],  seq 2841136306\n14:20:01.133 IP 93.184.216.34.443 > 192.168.1.20.52344: Flags [S.], seq 4189926400, ack 2841136307\n14:20:01.133 IP 192.168.1.20.52344 > 93.184.216.34.443: Flags [.], ack 4189926401",
        },
      },
      {
        heading: { ar: "ما يُتفاوض عليه في SYN", en: "What SYN Packets Negotiate" },
        body: {
          ar: "حزمتا SYN هما «عقد القدرات» الوحيد في عمر الاتصال: كل خيار يعرضه طرف ويقبله الآخر هنا يبقى ثابتاً حتى الإغلاق. لهذا لو أهمل أحد الطرفين Window Scale في SYN فلن يمكن تفعيله لاحقاً مهما اتسع الاتصال.\n\n- MSS: يعلن كل طرف أقصى بيانات يقبلها في المقطع الواحد\n- WS: مضاعف النافذة — بدونه يظل السقف 65,535 بايتاً للأبد\n- SACK-Permitted: موافقة مسبقة على الإقرار الانتقائي عند الفقد\n- Timestamps: لقياس RTT دقيق وحماية PAWS\n\nهذه الحقيقة تجعل من SYN أكثر المقاطع حساسية للتلاعب: أجهزة وسيطة «تُنظّف» الخيارات لأسباب أمنية مزعومة فتُقصّر أجنحة الاتصال دون أن يشعر أحد. إذا رأيت أداءً سيئاً على رابط طويل مع نافذة صغيرة ثابتة في التقاط الحزم — فتش عن SYN مُبتورة الخيارات.",
          en: "The two SYN packets are the only \"capabilities contract\" of the connection's lifetime: any option offered by one side and accepted here stays fixed until close. That is why if either side omits Window Scale in its SYN, it can never be enabled later no matter how fat the pipe becomes.\n\n- MSS: each side announces the maximum data it accepts per segment\n- WS: the window multiplier — without it the ceiling stays 65,535 bytes forever\n- SACK-Permitted: advance consent to selective acknowledgment on loss\n- Timestamps: precise RTT measurement and PAWS protection\n\nThis makes SYN the most tamper-sensitive segment of all: middleboxes that \"sanitize\" options for supposed security reasons clip the connection's wings without anyone noticing. If you see poor performance on a long-fat link with a persistently small window in your capture — hunt for a SYN with stripped options.",
        },
      },
      {
        heading: { ar: "الإغلاق: وداع FIN الرباعي", en: "Teardown: The FIN Four-Way Goodbye" },
        diagram: {
          kind: "flow",
          title: { ar: "إغلاق اتصال TCP بأدب", en: "Closing a TCP connection politely" },
          items: [
            { ar: "FIN من الطرف الأول: انتهيت من الإرسال", en: "First side FIN: I am done sending" },
            { ar: "ACK من الثاني: وصلني وسأنهي أنا أيضاً", en: "Second side ACK: received, and I will finish too" },
            { ar: "FIN من الطرف الثاني: انتهيت بدوري", en: "Second side FIN: I am done in turn" },
            { ar: "ACK أخير ثم TIME_WAIT قبل الإغلاق الكامل", en: "Final ACK, then TIME_WAIT before full close" },
          ],
        },
        body: {
          ar: "الفتح ثلاث حزم، لكن الإغلاق أربع — لأن TCP اتصال مزدوج كامل التناظر: كل اتجاه يُغلق باستقلال. الطرف البادئ يرسل FIN بمعنى «انتهت بياناتي»، ويظل قادراً على الاستقبال حتى يُغلق الاتجاه المقابل.\n\n- FIN من العميل: يدخل FIN_WAIT_1 ثم FIN_WAIT_2 بعد الرد\n- الخادم يتلقى FIN: يدخل CLOSE_WAIT — وتظل بياناته تتدفق إن شاء\n- FIN من الخادم: يدخل LAST_ACK بعد إعلان انتهاء بياناته\n- ACK ختامي من العميل: الخادم يغلق فوراً، والعميل يدخل TIME_WAIT\n\nهذا «الإغلاق النصف» (half-close) ميزة تصميمية: عميل ينهي طلبه ويظل يستمع لرد الخادم — سلوك طبيعي في بروتوكولات كثيرة مثل الأوامر التفاعلية.",
          en: "Opening takes three packets, but closing takes four — because TCP is fully symmetric duplex: each direction closes independently. The initiating side sends FIN meaning \"my data is done\", yet keeps receiving until the opposite direction closes too.\n\n- FIN from the client: it enters FIN_WAIT_1, then FIN_WAIT_2 after the reply\n- The server receives FIN: it enters CLOSE_WAIT — its own data may keep flowing\n- FIN from the server: it enters LAST_ACK after declaring its data done\n- Final ACK from the client: the server closes immediately, the client enters TIME_WAIT\n\nThis \"half-close\" is a design feature: a client finishing its request while still listening for the server's reply — natural behavior in many protocols like interactive commands.",
        },
        code: {
          lang: "text",
          snippet: "Client (active close)                 Server (passive close)\n  |                                        |\n  |--- FIN (seq=u) --------------------->|  FIN_WAIT_1\n  |                                        |  CLOSE_WAIT\n  |<-- ACK (ack=u+1) ---------------------|  (app may still send)\n  FIN_WAIT_2                              |\n  |<-- FIN (seq=v) -----------------------|  LAST_ACK\n  |--- ACK (ack=v+1) -------------------->|  CLOSED\n  TIME_WAIT (2*MSL)                       |\n  CLOSED                                  |",
        },
      },
      {
        heading: { ar: "TIME_WAIT: الحارس الصبور", en: "TIME_WAIT: The Patient Sentinel" },
        body: {
          ar: "بعد الإغلاق النهائي يبقى الطرف النشط في TIME_WAIT مدة ضعف MSL (أقصى عمر للحزمة في الشبكة — دقيقة كاملة تقليدياً، و 60 ثانية في لينكس). يبدو إهداراً، لكنه يخدم غرضين مصيريين:\n\n- ضمان وصول ACK الختامي: لو ضاع، سيعيد الطرف الآخر FIN وينتظر رداً — وبدون TIME_WAIT سيصطدم برسالة RST وتُغلق الجلسة بعُنف\n- موت المقاطع القديمة: منع تكرارات ضائعة من اتصال سابق من الالتباس مع اتصال جديد يملك الصف الرباعي نفسه\n\nالمشكلة العملية: خادم يفتح ويغلق آلاف الاتصالات في الثانية قد يستنزف مقابسه بآلاف TIME_WAIT متراكمة. الحلول المعروفة: إعادة استخدام المنافذ (tcp_tw_reuse مع timestamps)، وتوسيع مدى المنافذ المؤقتة، وتصميم التجميع (connection pooling) الذي يبقي الاتصالات حية بدل هدمها وبنائها.\n\nتمييز حاسم في التشخيص: TIME_WAIT سلوك سليم ينظف نفسه تلقائياً، أما CLOSE_WAIT المتراكمة فمرض تطبيقي — علامة كودٍ نسي استدعاء close().",
          en: "After the final close, the active side stays in TIME_WAIT for twice the MSL (maximum segment lifetime — a full minute classically, 60 seconds on Linux). It looks wasteful, but it serves two mission-critical purposes:\n\n- Guaranteeing the final ACK arrives: if lost, the peer retransmits its FIN and awaits a reply — without TIME_WAIT it would instead hit an RST and the session dies rudely\n- Letting old segments die: preventing wandering duplicates from an old connection confusing a new one reusing the same 4-tuple\n\nThe practical issue: a server opening and closing thousands of connections per second can exhaust its sockets with piled-up TIME_WAIT. Known fixes: port reuse (tcp_tw_reuse with timestamps), a wider ephemeral range, and connection pooling that keeps connections alive instead of demolishing and rebuilding them.\n\nA crucial diagnostic distinction: TIME_WAIT is healthy and self-cleaning, while accumulating CLOSE_WAIT is an application disease — the signature of code forgetting to call close().",
        },
        tip: {
          ar: "تراكم مئات مقابس CLOSE_WAIT (وليس TIME_WAIT) يعني تطبيقاً لا يُغلق اتصالاته — راقبه بـ ss -t state close-wait وابدأ من الكود لا من الشبكة.",
          en: "Hundreds of CLOSE_WAIT sockets (not TIME_WAIT) mean an app that never closes its connections — watch it with ss -t state close-wait and start from the code, not the network.",
        },
      },
    ],
    keyPoints: [
      { ar: "المصافحة: SYN ثم SYN-ACK ثم ACK — جولة RTT واحدة قبل البيانات", en: "Handshake: SYN, then SYN-ACK, then ACK — one RTT before data" },
      { ar: "خيارات القدرات (MSS/WS/SACK/Timestamps) تُتفاوض في SYN فقط", en: "Capability options (MSS/WS/SACK/Timestamps) are negotiated in SYNs only" },
      { ar: "الإغلاق رباعي: FIN/ACK في كل اتجاه باستقلال (إغلاق نصف)", en: "Close is four-way: FIN/ACK per direction, independently (half-close)" },
      { ar: "TIME_WAIT = 2×MSL على الطرف البادئ، لحماية ACK الأخرك وموت المقاطع القديمة", en: "TIME_WAIT = 2×MSL on the initiator, protecting the last ACK and letting old segments die" },
      { ar: "CLOSE_WAIT المتراكمة = تسريب تطبيقي لا مشكلة شبكة", en: "Accumulating CLOSE_WAIT = an application leak, not a network problem" },
    ],
    commands: [
      { cmd: "sudo tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-fin) != 0'", desc: { ar: "شاهد لحظة ميلاد وموت كل اتصال TCP", en: "Watch every TCP connection being born and dying" } },
      { cmd: "ss -t state time-wait | wc -l", desc: { ar: "عُدّ مقابس TIME_WAIT على جهازك الآن", en: "Count your machine's TIME_WAIT sockets right now" } },
      { cmd: "ss -t state close-wait", desc: { ar: "كشف تسريبات التطبيقات التي لا تُغلق اتصالاتها", en: "Detect apps leaking connections they never close" } },
    ],
    quiz: [
      {
        q: { ar: "كم حزمة تتطلب مصافحة TCP الثلاثية؟", en: "How many packets does the TCP three-way handshake require?" },
        options: [
          { ar: "حزمتان", en: "Two packets" },
          { ar: "ثلاث حزم", en: "Three packets" },
          { ar: "أربع حزم", en: "Four packets" },
          { ar: "ست حزم", en: "Six packets" },
        ],
        correct: 1,
        explain: {
          ar: "SYN ثم SYN-ACK ثم ACK — ثلاث حزم تُكمل جولة ذهاب وإياب واحدة (RTT).",
          en: "SYN, then SYN-ACK, then ACK — three packets completing exactly one round trip.",
        },
      },
      {
        q: { ar: "في حزمة SYN-ACK، ما قيمة حقل الإقرار؟", en: "In the SYN-ACK packet, what is the acknowledgment field's value?" },
        options: [
          { ar: "رقم تسلسل العميل الابتدائي نفسه", en: "The client's initial sequence number itself" },
          { ar: "رقم تسلسل العميل الابتدائي + 1", en: "The client's initial sequence number + 1" },
          { ar: "رقم تسلسل الخادم الابتدائي", en: "The server's initial sequence number" },
          { ar: "صفر دائماً", en: "Always zero" },
        ],
        correct: 1,
        explain: {
          ar: "الخادم يعترف باستلام SYN — و SYN يُحسب بايتاً واحداً في العدّ، فيكون الإقرار ISN العميل زائد واحد.",
          en: "The server acknowledges receiving the SYN — and a SYN counts as one byte, so the ack is the client's ISN plus one.",
        },
      },
      {
        q: { ar: "كم تدوم حالة TIME_WAIT نظرياً؟", en: "How long does TIME_WAIT theoretically last?" },
        options: [
          { ar: "ضعف MSL (2×MSL)", en: "Twice the MSL (2×MSL)" },
          { ar: "MSL واحدة فقط", en: "A single MSL" },
          { ar: "عشر دقائق ثابتة", en: "A fixed ten minutes" },
          { ar: "RTO مضروبة في أربعة", en: "RTO times four" },
        ],
        correct: 0,
        explain: {
          ar: "المدة ضعف أقصى عمر للحزمة: وقت ليصل ACK الختامي + وقت لموت أي تكرار ضائع في الاتجاهين.",
          en: "The duration is twice the maximum segment lifetime: time for the final ACK to arrive plus time for any lost duplicate to die in both directions.",
        },
      },
      {
        q: { ar: "خادم عليه مئات مقابس CLOSE_WAIT منذ ساعات. ما التفسير الأرجح؟", en: "A server has hundreds of CLOSE_WAIT sockets for hours. What is the most likely explanation?" },
        options: [
          { ar: "العملاء يرسلون SYN بوتيرة عالية", en: "Clients are sending SYNs at high rate" },
          { ar: "الشبكة مزدحمة بشدة", en: "The network is heavily congested" },
          { ar: "الجدار الناري يقطع الاتصالات فجأة", en: "The firewall suddenly cuts connections" },
          { ar: "تطبيق الخادم لا يستدعي close() بعد استلام FIN", en: "The server application never calls close() after receiving FIN" },
        ],
        correct: 3,
        explain: {
          ar: "استلام FIN ينقل المقبس إلى CLOSE_WAIT، ولا يغادرها إلا باستدعاء close() من التطبيق — تراكمها دليل كودٍ نسي استدعاء close() لا مشكلة شبكية.",
          en: "Receiving a FIN moves the socket to CLOSE_WAIT, and only the application calling close() moves it out — their accumulation proves forgotten code, not a network fault.",
        },
      },
    ],
  },
  {
    id: "l065",
    moduleId: "m07",
    order: 5,
    level: "intermediate",
    title: {
      ar: "أرقام التسلسل والإقرار: مثال محلول بايتاً بايتاً",
      en: "Sequence & ACK Numbers: A Worked Byte-Counting Example",
    },
    summary: {
      ar: "حسابات حقيقية بأرقام حقيقية: كيف تَعُدّ أرقام التسلسل البايتات، وكيف تقرأ الإقرارات التراكمية في أي التقاط حزم.",
      en: "Real math with real numbers: how sequence numbers count bytes and how to read cumulative ACKs in any packet capture.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "التسلسل يَعُدّ البايتات لا الحزم", en: "Sequence Numbers Count Bytes, Not Packets" },
        body: {
          ar: "الخطأ الشائع في فهم TCP هو قراءة رقم التسلسل كأنه «رقم الحزمة». الحقيقة أدق وأجمل: رقم التسلسل يَعُدّ البايتات في تيار البيانات منذ لحظة إنشاء الاتصال.\n\n- إذا أرسلت 1460 بايتاً انطلاقاً من تسلسل 1000، فمقطعك التالي يبدأ من 2460\n- الإقرار لا يقول «وصلت الحزمة رقم 3» بل «استلمت كل البايتات حتى الرقم 2920 حصراً»\n\nهذا العدّ البايتي هو ما يمنح TCP قدرته على الإرسال الدقيق: إذا ضاعت البايتات 1461-2920 وحدها، يعرف المرسِل بالضبط أي بايتات يُعيد. وهو نفسه أساس النافذة المنزلقة — النافذة تُقاس بالبايتات لا بالمقاطع، وكل حسابات ضبط التدفق والازدحام تنبني عليه.",
          en: "The classic misconception is reading the sequence number as a \"packet number\". The truth is subtler and more elegant: the sequence number counts bytes in the data stream since the connection was created.\n\n- If you send 1460 bytes starting from sequence 1000, your next segment begins at 2460\n- An acknowledgment never says \"packet 3 arrived\" but \"I have every byte up to 2920, exclusive\"\n\nThis byte counting is what gives TCP its surgical retransmission: if bytes 1461-2920 alone are lost, the sender knows exactly which bytes to resend. It is also the foundation of the sliding window — windows are measured in bytes, not segments, and every flow- and congestion-control calculation builds on it.",
        },
      },
      {
        heading: { ar: "المثال المحلول", en: "The Worked Example" },
        table: {
          caption: { ar: "تتبع أرقام التسلسل والإقرار بايتاً بايت", en: "Tracking sequence and ack numbers, byte by byte" },
          headers: [
            { ar: "الخطوة", en: "Step" },
            { ar: "الإرسال", en: "Sender sends" },
            { ar: "الإقرار العائد", en: "Returned ACK" },
          ],
          rows: [
            [
              { ar: "1", en: "1" },
              { ar: "100 بايت تبدأ من seq=1000", en: "100 bytes starting at seq=1000" },
              { ar: "ACK 1100", en: "ACK 1100" },
            ],
            [
              { ar: "2", en: "2" },
              { ar: "200 بايت تبدأ من seq=1100", en: "200 bytes starting at seq=1100" },
              { ar: "ACK 1300", en: "ACK 1300" },
            ],
            [
              { ar: "3", en: "3" },
              { ar: "المقطع الثاني فُقد في الطريق!", en: "The second segment is lost in transit!" },
              { ar: "إقرار مكرر ACK 1300 (dup)", en: "Duplicate ACK 1300 (dup)" },
            ],
            [
              { ar: "4", en: "4" },
              { ar: "إعادة إرسال الـ 200 بايت", en: "Retransmission of the 200 bytes" },
              { ar: "ACK 1500", en: "ACK 1500" },
            ],
          ],
        },
        body: {
          ar: "لنحل مثالاً كاملاً: عميل يطلب ملفاً من خادم ويب، حجم الملف 3,320 بايت، وقيمة MSS المتفقة 1460 بايت. سنتتبع حرفياً كل رقم يظهر في كل مقطع، من أول الترويسة إلى آخرها.\n\nالقاعدتان الحاسبتان للمثال كله:\n\n- القاعدة الأولى: التسلسل التالي = التسلسل الحالي + طول البيانات المُرسلة\n- القاعدة الثانية: قيمة الإقرار = تسلسل الطرف الآخر + طول بياناته (أي أول بايت يتوقعه مني)\n\nابدأ من السطر الأول وتحقق بنفسك من كل رقم قبل قراءة السطر التالي — هكذا وحده تترسخ العضلة الحسابية:",
          en: "Let us solve a complete example: a client fetches a file from a web server, the file is 3,320 bytes, and the negotiated MSS is 1460 bytes. We will literally track every number appearing in every segment.\n\nThe two calculating rules for the whole example:\n\n- Rule one: next sequence = current sequence + length of data sent\n- Rule two: ACK value = the other side's sequence + its data length (the first byte it expects from me)\n\nStart at the first line and verify each number yourself before reading the next — that is the only way the counting muscle truly forms:",
        },
        code: {
          lang: "text",
          snippet: "Client                                  Server\n  |                                       |\n  | [seq=1, len=100]  GET /file -------> |   100 bytes: request bytes 1-100\n  | <-- [ack=101] ----------------------- |   \"I have 1-100, waiting for 101+\"\n  |                                       |\n  | <-- [seq=1, len=1460] -------------- |   file bytes 1-1460\n  | [ack=1461] -----------------------> |\n  | <-- [seq=1461, len=1460] ----------- |   file bytes 1461-2920\n  | [ack=2921] -----------------------> |\n  | <-- [seq=2921, len=400] ------------ |   file bytes 2921-3320 (last)\n  | [ack=3321] -----------------------> |\n\nRules applied:\n- seq 1 + len 1460  -> next seq 1461\n- seq 1461 + len 1460 -> next seq 2921\n- ack = other side seq + len (next byte expected)",
        },
        tip: {
          ar: "لاحظ أن طلب GET حمل seq=1 و len=100 في نفس الوقت: البيانات الصاعدة من العميل تُحسب بنفس المنطق — وكل اتجاه يملك عدّاده المستقل تماماً.",
          en: "Notice the GET request carried seq=1 and len=100 simultaneously: client-to-server data counts the same way — each direction keeps a fully independent counter.",
        },
      },
      {
        heading: { ar: "الإقرارات التراكمية", en: "Cumulative Acknowledgments" },
        body: {
          ar: "الإقرار في TCP تراكمي (Cumulative) بطبيعته: قيمة ACK تعني «كل ما قبلها سليم واصل» — لكنها لا تقول شيئاً عمّا بعدها. وصلت القطعتان الأولى والثالثة وضاعت الثانية؟ سيظل الإقرار عالقاً عند 1461 كأن شيئاً لم يصل بعدها أصلاً.\n\n- تكرار الإقرار نفسه ثلاث مرات = «ثمة ثقب عند 1461» → إشارة إعادة الإرسال السريع\n- خيار SACK يضيف قوائم بالفجوات المستلمة فيرفع دقة إعادة الإرسال\n\nبلا SACK قد يعيد المرسِل ما وصل أصلاً (إهدار عرض النطاق). خوارزميات أحدث مثل RACK تقلل هذا الإهدار بمقارنة أزمنة وصول المقاطع لا أرقامها فقط.\n\nدرس تشخيصي عملي: إقرار «متوقف عن التقدم» في التقاط الحزم = فقدان مستمر في نقطة محددة — ابحث عن جودة المسار بين الطرفين عند ذاك البايت بالضبط.",
          en: "TCP acknowledgments are cumulative by nature: an ACK value means \"everything before it arrived intact\" — but says nothing about what follows. If segments one and three arrived while two was lost, the ACK stays pinned at 1461 as if nothing after it ever came.\n\n- The same ACK repeating three times = \"there is a hole at 1461\" → the fast retransmit signal\n- The SACK option adds lists of received gaps, sharpening retransmission precision\n\nWithout SACK, the sender may resend what already arrived (wasted bandwidth). Newer algorithms like RACK reduce this waste by comparing segment arrival times, not just numbers.\n\nA practical diagnostic lesson: an ACK that \"stops advancing\" in your capture = persistent loss at a specific point — investigate path quality between the peers at exactly that byte.",
        },
      },
      {
        heading: { ar: "الأرقام النسبية في أدوات التحليل", en: "Relative Numbers in Analysis Tools" },
        body: {
          ar: "افتح Wireshark وسترى أرقام تسلسل تبدأ من 0 أو 1 — هذه «أرقام نسبية» يعرضها المحلل لراحتك، لأن ISN الحقيقي رقم عشوائي ضخم مثل 2,841,136,306 لا قيمة بصرية له.\n\n- Wireshark: النسبية هي الافتراض (تُطفأ من Preferences → Protocols → TCP)\n- tcpdump: النسبية افتراضية أيضاً، والخيار -S يفصح عن المطلقة\n\nتنبيه تشخيصي مهم: عند قراءة أي التقاط، اعرف دائماً أي نمط تراه. الخلط بين النسبي والمطلق سبب شائع جداً لاستنتاجات خاطئة عن «قفزات غامضة» في الأرقام أو «إقرارات لا معنى لها».\n\nالأرقام النسبية تصلح للحساب التفاضلي (فوارق الطول والتقدم)، أما الأرقام المطلقة فتلزم عند مطابقة اتصالات متعددة أو تتبع حالة عبر أدوات مختلفة:",
          en: "Open Wireshark and you will see sequence numbers starting at 0 or 1 — those are \"relative numbers\" the analyzer displays for your comfort, because the real ISN is a huge random value like 2,841,136,306 with no visual value.\n\n- Wireshark: relative is the default (toggle in Preferences → Protocols → TCP)\n- tcpdump: relative by default too, and the -S flag reveals absolute values\n\nAn important diagnostic warning: when reading any capture, always know which mode you are viewing. Mixing up relative and absolute is a very common cause of false conclusions about \"mysterious jumps\" or \"meaningless ACKs\".\n\nRelative numbers suit differential math (lengths and progress), while absolute values matter when correlating multiple connections or tracing state across different tools:",
        },
        code: {
          lang: "bash",
          snippet: "# tcpdump الافتراضي: أرقام نسبية صغيرة\nsudo tcpdump -c 4 'tcp port 443'\n# ... seq 1:1461, ack 1\n\n# مع -S: الأرقام المطلقة الحقيقية\nsudo tcpdump -S -c 4 'tcp port 443'\n# ... seq 2841136307:2841137767, ack 4189926401",
        },
      },
    ],
    keyPoints: [
      { ar: "رقم التسلسل يَعُدّ البايتات: seq + len = التسلسل التالي", en: "Sequence numbers count bytes: seq + len = next sequence" },
      { ar: "قيمة الإقرار = أول بايت يتوقعه المقرّ بعد ذلك", en: "The ACK value = the first byte the acknowledger expects next" },
      { ar: "الإقرارات تراكمية: تعترف بكل ما قبلها وتصمت عمّا بعدها", en: "ACKs are cumulative: they confirm everything before them and stay silent about the rest" },
      { ar: "ثلاثة إقرارات مكررة = إشارة فقدان إلى إعادة الإرسال السريع", en: "Three duplicate ACKs = a loss signal for fast retransmit" },
      { ar: "الأدوات تعرض أرقاماً نسبية افتراضياً — -S في tcpdump يعرض المطلقة", en: "Tools show relative numbers by default — -S in tcpdump shows absolute" },
    ],
    commands: [
      { cmd: "sudo tcpdump -i eth0 -S -c 20 'tcp port 443'", desc: { ar: "اعرض الأرقام المطلقة الحقيقية لا النسبية", en: "Show true absolute sequence numbers, not relative ones" } },
      { cmd: "sudo tcpdump -i eth0 -w /tmp/tcp.pcap 'tcp port 443'", desc: { ar: "احفظ التقاطاً إلى ملف لتحليله لاحقاً بهدوء", en: "Save a capture to a file for calm offline analysis" } },
      { cmd: "ss -ti dst :443", desc: { ar: "شاهد عدادات البايتات المؤكدة والمعلقة لكل اتصال", en: "See acked and unacked byte counters per connection" } },
    ],
    quiz: [
      {
        q: { ar: "مقطع يحمل seq=5000 وطول بيانات 700 بايت. ما رقم تسلسل المقطع التالي؟", en: "A segment carries seq=5000 with 700 bytes of data. What is the next segment's sequence number?" },
        options: [
          { ar: "5001", en: "5001" },
          { ar: "5700", en: "5700" },
          { ar: "6460", en: "6460" },
          { ar: "7000", en: "7000" },
        ],
        correct: 1,
        explain: {
          ar: "التسلسل التالي = 5000 + 700 = 5700 — التسلسل يعدّ البايتات المنقولة فعلاً.",
          en: "Next sequence = 5000 + 700 = 5700 — sequence counts bytes actually delivered.",
        },
      },
      {
        q: { ar: "ما معنى وصول إقرار بقيمة ACK=3321؟", en: "What does receiving an ACK with value 3321 mean?" },
        options: [
          { ar: "استُلمت كل البايتات حتى 3320 والمستقبِل ينتظر البايت 3321", en: "All bytes up to 3320 arrived and the receiver awaits byte 3321" },
          { ar: "استُلم 3321 بايتاً مع فقدان جزء منها", en: "3321 bytes arrived with some of them lost" },
          { ar: "المرسِل سيقسم البيانات إلى 3321 حزمة", en: "The sender will split data into 3321 packets" },
          { ar: "خطأ في المجموع الاختباري عند البايت 3321", en: "A checksum error occurred at byte 3321" },
        ],
        correct: 0,
        explain: {
          ar: "الإقرار تراكمي: القيمة تحدد أول بايت متوقع — كل ما قبله سليم مهما وصل مبعثراً.",
          en: "The ACK is cumulative: the value names the first expected byte — everything before it is intact, no matter how scattered its arrival was.",
        },
      },
      {
        q: { ar: "استلم الخادم بايتات 1-1460 و 2921-3320 وضاعت 1461-2920. ما قيمة إقراره التراكمي؟", en: "The server received bytes 1-1460 and 2921-3320, losing 1461-2920. What is its cumulative ACK value?" },
        options: [
          { ar: "3321", en: "3321" },
          { ar: "2921", en: "2921" },
          { ar: "1461", en: "1461" },
          { ar: "1460", en: "1460" },
        ],
        correct: 2,
        explain: {
          ar: "الإقرار التراكمي يتوقف عند الثقب الأول: 1461 — وما بعده لا يُعترف به مهما وصل، حتى لو وصل بلا خدش.",
          en: "The cumulative ACK parks at the first hole: 1461 — nothing after it is acknowledged no matter how intact its arrival was.",
        },
      },
      {
        q: { ar: "ما وظيفة خيار -S في tcpdump؟", en: "What does the -S flag do in tcpdump?" },
        options: [
          { ar: "يعرض الحزم الأبطأ فقط", en: "Shows only the slower packets" },
          { ar: "يعرض أرقام التسلسل المطلقة", en: "Shows absolute sequence numbers" },
          { ar: "يضاعف طول الترويسة المعروضة", en: "Doubles the displayed header length" },
          { ar: "يفك تشفير الحزم تلقائياً", en: "Automatically decrypts packets" },
        ],
        correct: 1,
        explain: {
          ar: "tcpdump يعرض أرقاماً نسبية افتراضاً لتسهيل القراءة، و -S يعيدها إلى قيمها المطلقة الحقيقية.",
          en: "tcpdump prints relative numbers by default for readability; -S restores their true absolute values.",
        },
      },
    ],
  },
  {
    id: "l066",
    moduleId: "m07",
    order: 6,
    level: "intermediate",
    title: {
      ar: "ضبط التدفق: النافذة المنزلقة",
      en: "Flow Control: The Sliding Window",
    },
    summary: {
      ar: "كيف يعلن المستقبِل سعته ويُلزم المرسِل بها: النافذة المنزلقة، النافذة الصفرية ومسباراتها، ومضاعف النافذة.",
      en: "How the receiver advertises capacity and binds the sender to it: the sliding window, zero-window probes, and window scaling.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "لماذا يوجد ضبط التدفق؟", en: "Why Flow Control Exists" },
        body: {
          ar: "مخزن المستقبِل المؤقت حجمه محدود: التطبيق يقرأ بسرعته (ربما ببطء لأنه يكتب على قرص أو يفك ترميز فيديو)، بينما الشبكة توصل بسرعتها القصوى. بلا تنسيق سيفيض المخزن وتُرمى المقاطع وتُعاد بلا نهاية — كارثة أداء للطرفين معاً.\n\nضبط التدفق (Flow Control) هو حل TCP: المستقبِل يعلن في كل ACK حجم مساحته الحرة، والمرسِل يلتزم ألا يرسل أكثر منها بلا إقرار. لاحظ التمييز الحاسم الذي يحسم نقاشات المهندسين:\n\n- ضبط التدفق يحمي المستقبِل (rwnd): «لا تُغرقني أنا»\n- ضبط الازدحام (الدرس التالي) يحمي الشبكة (cwnd): «لا تُغرق الوسط بيننا»\n\nالقيد الفعلي على المرسِل هو الأشد من الاثنين: min(rwnd, cwnd).",
          en: "The receiver's buffer is finite: the application drains it at its own pace (perhaps slowly, writing to disk or decoding video) while the network delivers at full speed. Without coordination the buffer overflows, segments get dropped, and retransmissions loop forever — a performance disaster for both sides.\n\nFlow control is TCP's answer: the receiver advertises its free space in every ACK, and the sender commits to never exceeding it without acknowledgment. Note the crucial distinction that settles engineering debates:\n\n- Flow control protects the receiver (rwnd): \"don't drown me\"\n- Congestion control (next lesson) protects the network (cwnd): \"don't drown the medium between us\"\n\nThe sender's effective limit is the harsher of the two: min(rwnd, cwnd).",
        },
      },
      {
        heading: { ar: "نافذة المستقبِل (rwnd)", en: "The Receiver Window (rwnd)" },
        body: {
          ar: "حقل Window في كل مقطع — بما فيها ACKs الخالصة — يعلن: «في مخزني N بايتاً فارغة الآن». المرسِل يحسب نافذته الفعلية = min(إعلان المستقبِل, cwnd).\n\n- مستقبِل بطيء القراءة؟ إعلاناته تتقلص تدريجياً مع امتلاء المخزن\n- مستقبِل سريع؟ النافذة تتوسع ويملأ المرسِل الأنبوب بكامل طاقته\n- قيمة صفر تعني «مخزني ممتلئ تماماً — توقف عن الإرسال مؤقتاً»\n\nنقطة دقيقة يغفلها كثيرون: النافذة المعلنة تخص اتجاهاً واحداً. اتصال TCP واحد يحمل نافذتين مستقلتين — واحدة لكل اتجاه — فخادم يرسل ملفاً ضخماً لعميل بطيء قد يستقبل في الوقت نفسه طلبات العميل الصغيرة بسرعة البرق.",
          en: "The Window field in every segment — pure ACKs included — announces: \"my buffer currently has N free bytes\". The sender computes its effective window = min(receiver's advertisement, cwnd).\n\n- A slow-reading receiver? Its advertisements shrink gradually as the buffer fills\n- A fast receiver? The window grows and the sender fills the pipe to capacity\n- A zero value means \"my buffer is completely full — pause sending for now\"\n\nA subtle point many miss: the advertised window belongs to one direction only. A single TCP connection carries two independent windows — one per direction — so a server pushing a huge file to a slow client may simultaneously receive the client's tiny requests at lightning speed.",
        },
      },
      {
        heading: { ar: "كيف تنزلق النافذة؟", en: "How the Window Slides" },
        diagram: {
          kind: "flow",
          title: { ar: "انزلاق نافذة المستقبِل خطوة خطوة", en: "The receiver window sliding, step by step" },
          items: [
            { ar: "المستقبِل يعلن نافذة 4000 بايت", en: "The receiver advertises a 4000-byte window" },
            { ar: "المرسل يرسل ضمن النافذة فقط", en: "The sender transmits within the window only" },
            { ar: "الإقرارات تدفع حافة النافذة للأمام", en: "ACKs push the window's edge forward" },
            { ar: "ازدحام عند المستقبِل يقلّص النافذة المعلنة", en: "Receiver congestion shrinks the advertised window" },
            { ar: "نافذة صفر: المرسل ينتظر مسبارات النافذة", en: "Zero window: the sender waits for window probes" },
          ],
        },
        body: {
          ar: "تخيل النافذة إطاراً ينزلق فوق تيار البايتات: حافته اليسرى تتقدم مع كل إقرار (البايتات نالت اعترافها وتخرج من الحساب)، وحدّه الأيمن = اليسرى + حجم النافذة المعلن.\n\n- البايتات يسار الإطار: مُسلَّمة ومؤكدة — انتهى دورها\n- البايتات داخل الإطار: مُرسلة أو قابلة للإرسال فوراً دون انتظار\n- البايتات يمين الإطار: محجوزة للمستقبل — لا تُرسل بعد\n\nحركة النافذة إيقاعها ثنائي: الإقرارات تدفعها أماماً، وتقلص إعلانات المستقبِل يحدّها خلفاً. اتصال صحي تراه يتقدم بانسياب، واتصال متعثر تراه يتوقف ويقفز — القراءة البصرية للانزلاق أول مهارات تحليل الأداء:",
          en: "Picture the window as a frame sliding over the byte stream: its left edge advances with every acknowledgment (bytes confirmed and retired from the count), and its right edge = left edge + the advertised window size.\n\n- Bytes left of the frame: delivered and acknowledged — done\n- Bytes inside the frame: sent or immediately sendable without waiting\n- Bytes right of the frame: reserved for the future — not yet sendable\n\nThe window moves to a two-part rhythm: ACKs push it forward, shrinking receiver advertisements pull it back. A healthy connection glides forward smoothly; a struggling one stalls and jumps — visually reading the slide is the first skill of performance analysis:",
        },
        code: {
          lang: "text",
          snippet: "Sender's view of the byte stream:\n\n [1 ....... 1000] [1001 ...... 2000] [2001 ......... 3000]\n |--- ACKed -----| |- sent/unACKed -| |- not sent yet -|\n                  \\___ in-flight ___/ \\____ allowed ____/\n\n left edge  = oldest unacknowledged byte\n right edge = left edge + advertised window\n\nWindow slides forward as ACKs arrive:\n [1 ....... 1500] [1501 ...... 2500] [2501 ......... 3500]\n |---- ACKed ----| |- sent/unACKed -| |- not sent yet -|",
        },
        tip: {
          ar: "في Wireshark، رسم رسم TCP Stream Graph (Time-Sequence) يعرض انزلاق النافذة بصرياً — خط متصاعد بانسياب = اتصال صحي، ودرجات سلالم = توقف متكرر.",
          en: "In Wireshark, the TCP Stream Graph (Time-Sequence) plots the sliding window visually — a smooth rising line = healthy connection, staircase steps = repeated stalls.",
        },
      },
      {
        heading: { ar: "النافذة الصفرية ومسباراتها", en: "Zero Window and Its Probes" },
        body: {
          ar: "ماذا لو أعلن المستقبِل نافذة صفرية؟ يتوقف المرسِل — لكن ليس إلى الأبد، وإلا فقد الطرفان تزامنهما نهائياً لو ضاع إشعار «توسع النافذة» اللاحق.\n\nالحل: مؤقت المثابرة (Persist Timer) — المرسِل يرسل مسبارات نافذة صفرية (Zero-Window Probes) دورياً، كل مسبار يحمل بايتاً واحداً كي يتيح للمستقبِل فرصة الرد بحالة مخزنه. فور وصول قيمة موجبة يستأنف الإرسال من حيث توقف.\n\nحالات «النافذة الصفرية المزمنة» الظاهرة في ss -ti علامة تشخيصية ذهبية: تطبيق مستقبِل لا يقرأ بياناته — مخزن ممتلئ دائماً. الأسباب المعتادة: استعلام قاعدة بيانات بطيء، مؤشر ترابط عالق، أو تطبيق يعالج البيانات بوتيرة أبطأ من الشبكة بمراحل.\n\nأما «متلازمة النافذة الحمقاء» (Silly Window Syndrome) فهي الحالة المعاكسة: إعلانات متقطعة بحجم بايتات قليلة تُلهي المرسِل — عالجتها TCP بخوارزميتي Nagle و Clark معاً.",
          en: "What if the receiver advertises a zero window? The sender pauses — but not forever, otherwise both sides would permanently lose sync if the later \"window reopened\" notice were lost.\n\nThe solution: the Persist Timer — the sender periodically sends Zero-Window Probes, each carrying a single byte to give the receiver a chance to answer with its buffer state. The moment a positive value arrives, sending resumes where it stopped.\n\nChronic zero-window states visible in ss -ti are a golden diagnostic sign: a receiving application that never drains its data — a permanently full buffer. Usual causes: a slow database query, a stuck thread, or an app processing data far slower than the network delivers it.\n\nThe opposite pathology is the \"Silly Window Syndrome\": trickle advertisements of tiny sizes that keep the sender busy — TCP cured it with the Nagle and Clark algorithms together.",
        },
      },
      {
        heading: { ar: "تكبير النافذة (Window Scaling)", en: "Window Scaling" },
        body: {
          ar: "حقل Window نفسه 16 بت: سقف مطلق 65,535 بايتاً. يبدو كثيراً حتى تضربه في الواقع: أنبوب سعة 1Gbps وزمن ذهاب وإياب 30ms يستوعب نظرياً نحو 3.75MB في الطيران (السعة × التأخير). بنافذة 64KB لا يمكن للإنتاج أن يتجاوز ~17.9Mbps مهما كان الخط أسرع — الرياضيات لا تجامل أحداً.\n\nخيار Window Scale (المتفاوض عليه في SYN فقط!) يضيف مضاعفاً أسّياً: القيمة 7 مثلاً تعني ضرب كل إعلان نافذة في 128. الحد الأقصى 14 → نافذة تصل قريباً من 1GB، تكفي لأي أنبوب واقعي اليوم.\n\n- تحقق من التفعيل: sysctl net.ipv4.tcp_window_scaling = 1 (افتراضي منذ عشرين عاماً)\n- أداء ضعيف على رابط طويل + نافذة ثابتة عند 64KB في التقاط الحزم = أحد الأطراف أو وسيط أسقط خيار WS\n\nجرّب الحركة الحية بنفسك: شغّل تيار iperf3 وراقب النافذة في طرفية مجاورة:",
          en: "The Window field itself is 16 bits: an absolute ceiling of 65,535 bytes. It sounds generous until reality multiplies it: a 1Gbps pipe with 30ms round trip theoretically holds about 3.75MB in flight (bandwidth × delay). With a 64KB window, throughput can never exceed ~17.9Mbps no matter how fast the link — the math flatters no one.\n\nThe Window Scale option (negotiated in SYNs only!) adds an exponential multiplier: a value of 7, for example, multiplies every window advertisement by 128. The maximum of 14 yields a window approaching 1GB — enough for any realistic pipe today.\n\n- Verify it: sysctl net.ipv4.tcp_window_scaling = 1 (default for twenty years)\n- Poor performance on a long link + a window pinned at 64KB in your capture = one side or a middlebox dropped the WS option\n\nWatch it live yourself: start an iperf3 stream and observe the window in a neighboring terminal:",
        },
        code: {
          lang: "bash",
          snippet: "# على الجهاز الأول: خادم قياس\niperf3 -s\n\n# على الجهاز الثاني: تيار TCP لمدة 30 ثانية\niperf3 -c 192.168.1.50 -t 30\n\n# في طرفية ثالثة: راقب نافذة الاتصال الحية\nss -ti dst 192.168.1.50\n\n# تأكد من تفعيل مضاعف النافذة\nsysctl net.ipv4.tcp_window_scaling",
        },
      },
    ],
    keyPoints: [
      { ar: "ضبط التدفق يحمي المستقبِل؛ ضبط الازدحام يحمي الشبكة — والقيد الفعلي min(rwnd, cwnd)", en: "Flow control protects the receiver; congestion control protects the network — effective limit is min(rwnd, cwnd)" },
      { ar: "حقل Window يعلن المساحة الحرة في مخزن المستقبِل في كل مقطع", en: "The Window field advertises the receiver's free buffer space in every segment" },
      { ar: "النافذة تنزلق: الحافة اليسرى تتبع الإقرارات واليمنى = اليسرى + الإعلان", en: "The window slides: left edge follows ACKs, right edge = left + advertisement" },
      { ar: "النافذة الصفرية: المرسِل يتوقف ويرسل مسبارات دورية حتى يعود إعلان موجب", en: "Zero window: the sender pauses and probes periodically until a positive advertisement returns" },
      { ar: "Window Scale (في SYN فقط) يرفع السقف من 64KB إلى نحو 1GB", en: "Window Scale (SYN only) lifts the ceiling from 64KB to about 1GB" },
    ],
    commands: [
      { cmd: "ss -ti dst :443", desc: { ar: "افحص rwnd و cwnd و bytes_unacked لاتصال حي", en: "Inspect live rwnd, cwnd and bytes_unacked for a connection" } },
      { cmd: "sysctl net.ipv4.tcp_window_scaling", desc: { ar: "تأكد من تفعيل مضاعف النافذة في نواتك", en: "Verify window scaling is enabled in your kernel" } },
      { cmd: "iperf3 -c 192.168.1.50 -t 30", desc: { ar: "ولّد تيار TCP ثقيلاً وراقب نافذته تنزلق", en: "Generate a heavy TCP stream and watch its window slide" } },
    ],
    quiz: [
      {
        q: { ar: "من الذي يحميه ضبط التدفق في TCP؟", en: "Whom does TCP flow control protect?" },
        options: [
          { ar: "الشبكة الوسيطة", en: "The intermediate network" },
          { ar: "المستقبِل النهائي", en: "The end receiver" },
          { ar: "المرسِل", en: "The sender" },
          { ar: "الموجهات على المسار", en: "The routers along the path" },
        ],
        correct: 1,
        explain: {
          ar: "ضبط التدفق عبر rwnd يمنع غرق مخزن المستقبِل — حماية الشبكة مهمة ضبط الازدحام و cwnd.",
          en: "Flow control via rwnd prevents drowning the receiver's buffer — protecting the network is congestion control's job via cwnd.",
        },
      },
      {
        q: { ar: "أعلن المستقبِل نافذة صفرية. ماذا يفعل المرسِل؟", en: "The receiver advertised a zero window. What does the sender do?" },
        options: [
          { ar: "يتوقف ويبدأ إرسال مسبارات نافذة صفرية دورية", en: "It pauses and starts periodic zero-window probes" },
          { ar: "يُغلق الاتصال فوراً", en: "It closes the connection immediately" },
          { ar: "يعيد إرسال كل البيانات غير المؤكدة", en: "It retransmits all unacknowledged data" },
          { ar: "يزيد سرعة الإرسال لتعويض التأخير", en: "It increases sending speed to compensate for delay" },
        ],
        correct: 0,
        explain: {
          ar: "المؤقت المثابر يرسل مسبارات بايت واحد حتى يرد المستقبِل بإعلان موجب فيستأنف الإرسال — لا قطع ولا إعادة إرسال.",
          en: "The persist timer sends one-byte probes until the receiver answers with a positive advertisement, then sending resumes — no close, no retransmission.",
        },
      },
      {
        q: { ar: "ما الحد الأقصى لحقل Window الخام (16 بت) دون مضاعف؟", en: "What is the raw maximum of the 16-bit Window field without scaling?" },
        options: [
          { ar: "1024 بايت", en: "1,024 bytes" },
          { ar: "32,768 بايت", en: "32,768 bytes" },
          { ar: "65,535 بايت", en: "65,535 bytes" },
          { ar: "1,073,741,824 بايت", en: "1,073,741,824 bytes" },
        ],
        correct: 2,
        explain: {
          ar: "16 بت = 65,535 بايتاً كحد أقصى خاماً — ولهذا وُجد خيار Window Scale للروابط الطويلة العريضة.",
          en: "16 bits = 65,535 bytes raw maximum — which is exactly why the Window Scale option exists for long, fat links.",
        },
      },
      {
        q: { ar: "متى يُتفاوض على خيار Window Scale؟", en: "When is the Window Scale option negotiated?" },
        options: [
          { ar: "في أي مقطع لاحق عند الحاجة", en: "In any later segment whenever needed" },
          { ar: "في حزمتي SYN و SYN-ACK فقط", en: "In the SYN and SYN-ACK packets only" },
          { ar: "في حزمة FIN عند الإغلاق", en: "In the FIN packet at close" },
          { ar: "لا يُتفاوض عليه مطلقاً — دائم مفعّل", en: "It is never negotiated — always on" },
        ],
        correct: 1,
        explain: {
          ar: "خيارات القدرات كلها تُحسم في المصافحة: من لم يعرض WS في SYN فسقفه 64KB إلى الأبد.",
          en: "All capability options settle in the handshake: whoever omits WS in its SYN stays capped at 64KB forever.",
        },
      },
    ],
  },
  {
    id: "l067",
    moduleId: "m07",
    order: 7,
    level: "intermediate",
    title: {
      ar: "ضبط الازدحام: من البدء البطيء إلى BBR",
      en: "Congestion Control: From Slow Start to BBR",
    },
    summary: {
      ar: "cwnd و ssthresh والبدء البطيء و AIMD والإرسال السريع — كيف يستشف TCP حالة الشبكة من مجرد صمتها، وتطور الخوارزميات حتى BBR.",
      en: "cwnd, ssthresh, slow start, AIMD and fast retransmit — how TCP infers network state from its silence alone, and algorithm evolution up to BBR.",
    },
    durationMin: 22,
    sections: [
      {
        heading: { ar: "الازدحام ليس مشكلة المستقبِل", en: "Congestion Is Not the Receiver's Problem" },
        body: {
          ar: "ضبط التدفق حمى المستقبِل. لكن من يحمي الشبكة نفسها؟ مخازن الموجهات محدودة، وإذا تدفق عليها عشرة آلاف مرسِل بلا قيد، فاضت الطوابير وسقطت الحزم — والأسوأ أن كل مرسِلٍ فقدَ حزمةً يزيدها إرسالاً لإحلال مكانها، فيتفاقم الازدحام ازدحاماً: هذا هو «انهيار الازدحام» (Congestive Collapse) الذي وُصف نظرياً عام 1984 وكان كابوس الإنترنت المبكر.\n\nحل TCP: نافذة ازدحام (cwnd) خاصة بالمرسِل وحده. لا وجود لأي حقل لها في الترويسة أبداً — بل حالة داخلية يستنتجها المرسِل من دليلين فقط:\n\n- انتهاء مهلة إعادة الإرسال (RTO): أسوأ النذر — الشبكة شبه صمّاء عن هذا التدفق\n- إقرارات مكررة: فقدان معزول والاتصال حي يتنفس\n\nالقيد الفعلي على الإرسال: min(cwnd, rwnd) — يأخذ الأشد عليهما. حساب cwnd هي حكاية الخوارزميات: Tahoe ثم Reno ثم CUBIC ثم BBR.",
          en: "Flow control protected the receiver. But who protects the network itself? Router buffers are finite, and if ten thousand senders flood them unbounded, queues overflow and packets die — worse, every sender that lost a packet pushes even more traffic to replace it, compounding congestion into congestion: the \"congestive collapse\" described theoretically in 1984 and the early Internet's nightmare.\n\nTCP's answer: a congestion window (cwnd) belonging to the sender alone. No header field ever carries it — it is internal state the sender infers from just two clues:\n\n- A retransmission timeout (RTO): the worst omen — the network is nearly deaf to this flow\n- Duplicate ACKs: isolated loss while the connection still breathes\n\nThe effective send limit: min(cwnd, rwnd) — whichever is harsher. Computing cwnd is the story of the algorithms: Tahoe, then Reno, then CUBIC, then BBR.",
        },
      },
      {
        heading: { ar: "البدء البطيء: نمو أُسّي حذر", en: "Slow Start: Careful Exponential Growth" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة cwnd عبر مراحل ضبط الازدحام", en: "cwnd's journey through the congestion-control phases" },
          items: [
            { ar: "البدء البطيء: cwnd يتضاعف كل RTT", en: "Slow start: cwnd doubles each RTT" },
            { ar: "بلوغ ssthresh: تحول إلى نمو خطي (+1 MSS)", en: "Reaching ssthresh: switch to linear growth (+1 MSS)" },
            { ar: "تجنب الازدحام AIMD: زيادة حذرة وانخفاض حاد عند الفقد", en: "AIMD avoidance: careful increase, sharp cut on loss" },
            { ar: "3 إقرارات مكررة: إرسال سريع واسترداد سريع", en: "3 duplicate ACKs: fast retransmit and fast recovery" },
            { ar: "انتهاء مهلة RTO: عودة كاملة للبدء البطيء", en: "RTO timeout: a full return to slow start" },
          ],
        },
        body: {
          ar: "لماذا «البدء البطيء» بكل هذا البطء؟ لأن المرسِل لا يعلم شيئاً عن سعة الشبكة أمامه: أنبوب لاسلكي رفيع أم رابط مركزي 100Gbps؟ التخمين الجريء يُغرق الشبكة فوراً، والتخمين الجبان يهدر السعة.\n\nالاستراتيجية: ابدأ صغيراً ثم ضاعف:\n\n- RTT الأولى: أرسل نحو 10 مقاطع (القيمة الابتدائية الحديثة RFC 6928)\n- كل إقرار يصل يرفع cwnd بمقطع واحد → عملياً تتضاعف النافذة كل جولة\n- 10 → 20 → 40 → 80 → ... نمو أُسّي مبهر لكنه محسوب\n\nيتوقف النمو الأُسّي عند أول عتبة: ssthresh (عتبة البدء البطيء). بعدها يتحول TCP إلى النمو الخطي الحذر. ومن هنا اكتشاف سوء التسمية التاريخية: طور «البدء البطيء» هو أسرع أطوار TCP نمواً على الإطلاق — بطؤه الوحيد في بداياته المتواضعة.",
          en: "Why is \"slow start\" so slow? Because the sender knows nothing about the network's capacity ahead: a thin wireless pipe or a 100Gbps datacenter link? A bold guess floods the network instantly; a timid guess wastes the capacity.\n\nThe strategy: start small, then double:\n\n- First RTT: send about 10 segments (the modern initial window, RFC 6928)\n- Every arriving ACK raises cwnd by one segment → in practice the window doubles each round\n- 10 → 20 → 40 → 80 → ... dazzling yet disciplined exponential growth\n\nThe exponential phase stops at the first threshold: ssthresh (slow-start threshold). Beyond it, TCP shifts to careful linear growth. This is where you discover the historical misnomer: the \"slow start\" phase is the fastest-growing phase in all of TCP — its only slowness is its humble beginning.",
        },
        code: {
          lang: "text",
          snippet: "cwnd (segments)\n80 |                                        /\n64 |                                      /\n48 |                          ssthresh ->/- loss! cwnd = cwnd/2\n32 |                      /\n24 |                  /\n16 |              /\n12 |          /\n10 |      x2 each RTT\n   |_/\n   +----------------------------------------------> RTT count\n      |<--- slow start (exponential) --->|<-- congestion avoidance (+1/RTT) -->|",
        },
      },
      {
        heading: { ar: "تجنب الازدحام و AIMD", en: "Congestion Avoidance & AIMD" },
        table: {
          caption: { ar: "مراحل ضبط الازدحام ومحفزاتها", en: "Congestion-control phases and their triggers" },
          headers: [
            { ar: "المرحلة", en: "Phase" },
            { ar: "المحفّز", en: "Trigger" },
            { ar: "سلوك cwnd", en: "cwnd behavior" },
          ],
          rows: [
            [
              { ar: "البدء البطيء", en: "Slow start" },
              { ar: "بداية الاتصال أو بعد RTO", en: "Connection start or after an RTO" },
              { ar: "تتضاعف كل RTT", en: "Doubles each RTT" },
            ],
            [
              { ar: "تجنب الازدحام", en: "Congestion avoidance" },
              { ar: "بلوغ ssthresh", en: "Reaching ssthresh" },
              { ar: "+1 MSS لكل RTT — نمو خطي", en: "+1 MSS per RTT — linear growth" },
            ],
            [
              { ar: "الإرسال السريع", en: "Fast retransmit" },
              { ar: "3 إقرارات مكررة", en: "3 duplicate ACKs" },
              { ar: "إعادة إرسال فورية للمقطع الفاقد", en: "Immediate retransmission of the lost segment" },
            ],
            [
              { ar: "الاسترداد السريع", en: "Fast recovery" },
              { ar: "بعد الإرسال السريع", en: "After fast retransmit" },
              { ar: "ssthresh = النصف ثم استمرار خطي", en: "ssthresh halved, then linear growth" },
            ],
            [
              { ar: "BBR الحديثة", en: "Modern BBR" },
              { ar: "نمذجة عرض النطاق و RTT بدل الفقد", en: "Modeling bandwidth and RTT instead of loss" },
              { ar: "يوازن معدل الإرسال بلا انتظار الفقدان", en: "Paces the send rate without waiting for loss" },
            ],
          ],
        },
        body: {
          ar: "بعد تجاوز ssthresh يبدأ طور تجنب الازدحام: نمو خطي حذر بمعدل +1 MSS فقط لكل RTT. الفلسفة: نحن الآن في منطقة «آمنة تقريباً»، نستكشف حافة السعة بهدوء بيتا بيت.\n\nعند أول فقدان (ثلاثة إقرارات مكررة) يطبق TCP «التنصيف الضربي»: ssthresh الجديد = نصف cwnd الحالية، وتعود cwnd إلى القيمة الجديدة مباشرة عبر الاسترداد السريع (في Reno). هذا هو AIMD الشهير:\n\n- Additive Increase: زيادة خطية بطيئة — استكشاف لطيف للسعة\n- Multiplicative Decrease: خفض إلى النصف — احترام فوري للأزمة\n\nAIMD مستقر رياضياً وعادل نسبياً بين التدفقات المتنافسة على الرابط الواحد. لكنه متحفظ بطبعه: الشبكات الحديثة تفقد حزمة هنا أو هناك لأسباب لا علاقة لها بالازدحام (واي فاي مضطرب مثلاً) فيعاقب TCP نفسه بلا مذنب حقيقي.",
          en: "After crossing ssthresh begins the congestion-avoidance phase: careful linear growth at just +1 MSS per RTT. The philosophy: we are now in a \"roughly safe\" zone, probing the capacity's edge one step at a time.\n\nAt the first loss (three duplicate ACKs) TCP applies \"multiplicative decrease\": the new ssthresh = half the current cwnd, and cwnd jumps straight to that new value via fast recovery (in Reno). This is the famous AIMD:\n\n- Additive Increase: slow linear growth — gentle capacity probing\n- Multiplicative Decrease: halving — immediate respect for the crisis\n\nAIMD is mathematically stable and roughly fair among competing flows on one link. But it is conservative by nature: modern networks lose a packet here or there for reasons unrelated to congestion (a jittery Wi-Fi, for example), and TCP punishes itself with no true culprit.",
        },
      },
      {
        heading: { ar: "الفقدان: الإرسال والاسترداد السريعان", en: "Loss: Fast Retransmit & Fast Recovery" },
        body: {
          ar: "ليست كل الخسارات سواء، وتمييزها جوهر تشخيص الأداء:\n\n- ثلاثة إقرارات مكررة: ثقب معزول — إعادة الإرسال السريعة (Fast Retransmit) ترسل القطعة الضائعة فوراً دون انتظار RTO، ثم يواصل الاسترداد السريع (Fast Recovery) من ssthresh الجديد بلا عودة للبدء البطيء — سلوك Reno\n- انتهاء المهلة (RTO): كارثة معلنة — تعود cwnd إلى 1 MSS وينطلق البدء البطيء من الصفر (سلوك Tahoe)، مع مضاعفة RTO تراكمياً في كل فشل\n- إعادة الإرسال الزائفة (Spurious): وصل ACK متأخر بعد بدء الإعادة — أُعيد ما لا حاجة لإعادته؛ خوارزميات F-RTO و RACK تخفف هذا الإهدار\n\nراقب انهيار cwnd أمام عينيك: شغّل ss -ti أثناء تحميل كبير وستجد القيمة تقفز بين الأطوار — أحياناً في أجزاء الثانية.",
          en: "Not all losses are equal, and telling them apart is the heart of performance diagnosis:\n\n- Three duplicate ACKs: an isolated hole — Fast Retransmit sends the lost piece immediately without waiting for RTO, then Fast Recovery continues from the new ssthresh with no slow-start restart — Reno's behavior\n- A timeout (RTO): declared catastrophe — cwnd collapses back to 1 MSS and slow start launches from zero (Tahoe's behavior), with RTO doubling cumulatively on each failure\n- Spurious retransmission: an ACK arrived late after the resend began — data resent needlessly; the F-RTO and RACK algorithms soften this waste\n\nWatch cwnd collapse before your eyes: run ss -ti during a heavy download and you will see the value leaping between phases — sometimes within fractions of a second.",
        },
        code: {
          lang: "bash",
          snippet: "# ما خوارزمية الازدحام النشطة في نواتك؟\nsysctl net.ipv4.tcp_congestion_control\n# net.ipv4.tcp_congestion_control = cubic\n\n# ما الخوارزميات المتاحة؟\nsysctl net.ipv4.tcp_available_congestion_control\n# net.ipv4.tcp_available_congestion_control = reno cubic bbr\n\n# راقب cwnd و rtt و ssthresh لاتصال حي\nss -ti dst :443\n# ... cubic wscale:7,7 rto:364 rtt:18.5/2.1 mss:1448 cwnd:12 ssthresh:11 ...",
        },
        tip: {
          ar: "حقل cwnd في مخرجات ss -ti يقيس بالمقاطع لا بالبايتات — اضربه في MSS لتحويله إلى بايتات عند مقارنته بالنافذة.",
          en: "The cwnd field in ss -ti output counts segments, not bytes — multiply by MSS when comparing it against the window.",
        },
      },
      {
        heading: { ar: "من Reno إلى CUBIC و BBR", en: "From Reno to CUBIC and BBR" },
        body: {
          ar: "خوارزمية لينكس الافتراضية منذ 2006 هي CUBIC: بدلاً من الزيادة الخطية تنمو النافذة بدالة تكعيبية لزمنٍ منذ آخر فقدان، فتستعيد سرعتها بعد التنصيف أسرع بكثير من Reno — سلوك أنسب للشبكات عالية السرعة عالية التأخير.\n\nثم قلبت BBR (من Google عام 2016) الطاولة فلسفياً: بدل انتظار الفقدان «لكي نكتشف» الازدحام، تقيس BBR فعلياً معدل التسليم الأقصى (عرض عنق الزجاجة) وزمن الذهاب والإياب الأدنى، وتضبط الإرسال عند ناتجهما. النتيجة: استغلال أدق للروابط دون إغراق مخازنها — تقليل bufferbloat وزمن الاستجابة معاً.\n\n- CUBIC يزاحم المخازن بشراهة، و BBR أرحم بزمن الاستجابة\n- BBRv1 أثار جدل «عدالة» التدفقات المتنافسة — تعالجه مراجعات v2/v3\n- اختر الخوارزمية بطباع خطك: لاسلكي متذبذب ≠ ليف مركزي مستقر\n\nيمكن تغيير الخوارزمية لكل مسار (congctl) أو عالمياً — أداة تشخيص ثمينة عند دراسة سلوك خط بعينه.",
          en: "Linux's default algorithm since 2006 is CUBIC: instead of linear growth, the window follows a cubic function of time since the last loss, regaining speed after a halving far faster than Reno — behavior suiting high-speed, high-delay networks.\n\nThen BBR (from Google, 2016) flipped the table philosophically: instead of waiting for loss \"to discover\" congestion, BBR actually measures the maximum delivery rate (the bottleneck bandwidth) and the minimum round-trip time, tuning the send rate to their product. The result: sharper link utilization without flooding buffers — reducing bufferbloat and latency together.\n\n- CUBIC greedily pressures buffers; BBR is kinder to latency\n- BBRv1 stirred the \"fairness\" debate among competing flows — revisions v2/v3 address it\n- Choose the algorithm to match your line's temperament: jittery wireless ≠ stable datacenter fiber\n\nYou can switch the algorithm per route (congctl) or globally — a valuable diagnostic tool when studying a specific line's behavior.",
        },
      },
    ],
    keyPoints: [
      { ar: "cwnd حالة داخلية لدى المرسِل — لا حقل لها في الترويسة أبداً", en: "cwnd is sender-internal state — no header field ever carries it" },
      { ar: "البدء البطيء نمو أُسّي (تضاعف كل RTT) يتوقف عند ssthresh", en: "Slow start is exponential growth (doubling per RTT) stopping at ssthresh" },
      { ar: "AIMD: زيادة خطية +1 MSS لكل RTT، وخفض للنصف عند الفقد", en: "AIMD: linear increase +1 MSS per RTT, halving on loss" },
      { ar: "ثلاثة إقرارات مكررة = إرسال سريع؛ انتهاء RTO = انهيار إلى 1 MSS", en: "Three duplicate ACKs = fast retransmit; RTO expiry = collapse to 1 MSS" },
      { ar: "CUBIC (تكعيبي) افتراضي لينكس، و BBR يقيس عنق الزجاجة بدل انتظار الفقد", en: "CUBIC (cubic) is the Linux default; BBR measures the bottleneck instead of waiting for loss" },
    ],
    commands: [
      { cmd: "sysctl net.ipv4.tcp_congestion_control", desc: { ar: "ما خوارزمية الازدحام النشطة في نواتك؟", en: "Which congestion algorithm is active in your kernel?" } },
      { cmd: "sysctl net.ipv4.tcp_available_congestion_control", desc: { ar: "اقرأ قائمة الخوارزميات المتاحة", en: "List the congestion algorithms available" } },
      { cmd: "ss -ti dst :443", desc: { ar: "راقب cwnd و ssthresh و rtt مباشرة أثناء التحميل", en: "Watch live cwnd, ssthresh and RTT during a download" } },
    ],
    quiz: [
      {
        q: { ar: "أين تُخزَّن نافذة الازدحام cwnd؟", en: "Where is the congestion window cwnd stored?" },
        options: [
          { ar: "في ترويسة كل مقطع TCP", en: "In every TCP segment's header" },
          { ar: "حالة داخلية لدى المرسِل فقط", en: "As sender-internal state only" },
          { ar: "في مخازن الموجهات الوسيطة", en: "In the intermediate routers' buffers" },
          { ar: "في سجلات خادم DNS", en: "In DNS server records" },
        ],
        correct: 1,
        explain: {
          ar: "cwnd استنتاج خاص بالمرسِل من الأدلة (مهلات وإقرارات مكررة) — لا يظهر في أي ترويسة، والمستقبِل لا يعلم عنه شيئاً.",
          en: "cwnd is the sender's private inference from clues (timeouts, duplicate ACKs) — it appears in no header, and the receiver knows nothing about it.",
        },
      },
      {
        q: { ar: "كيف تنمو cwnd خلال طور البدء البطيء؟", en: "How does cwnd grow during slow start?" },
        options: [
          { ar: "نمو خطي: +1 MSS لكل RTT", en: "Linearly: +1 MSS per RTT" },
          { ar: "تبقى ثابتة حتى أول فقدان", en: "Constant until the first loss" },
          { ar: "نمو أُسّي: تتضاعف كل RTT", en: "Exponentially: doubling every RTT" },
          { ar: "قيمة عشوائية كل جولة", en: "A random value every round" },
        ],
        correct: 2,
        explain: {
          ar: "كل إقرار يرفع النافذة بمقطع، فتتضاعف cwnd كل RTT — النمو الأُسّي الحذر حتى ssthresh.",
          en: "Each ACK raises the window by a segment, so cwnd doubles every RTT — careful exponential growth up to ssthresh.",
        },
      },
      {
        q: { ar: "ما الحدث الذي يشعل إعادة الإرسال السريعة (Fast Retransmit)؟", en: "Which event triggers Fast Retransmit?" },
        options: [
          { ar: "وصول ثلاثة إقرارات مكررة", en: "Arrival of three duplicate ACKs" },
          { ar: "انتهاء مهلة RTO", en: "Expiry of the RTO timer" },
          { ar: "إعلان نافذة صفرية", en: "A zero-window advertisement" },
          { ar: "فشل رسالة keepalive", en: "A failed keepalive message" },
        ],
        correct: 0,
        explain: {
          ar: "ثلاثة إقرارات متطابقة عن ثقب واحد = فقدان معزول والاتصال حي، فيعاد المقطع فوراً دون انتظار المهلة.",
          en: "Three identical ACKs for the same hole = isolated loss with a live connection, so the segment is resent immediately without waiting for the timer.",
        },
      },
      {
        q: { ar: "في سلوك TCP الكلاسيكي، ماذا يحدث لـ cwnd عند انتهاء مهلة RTO؟", en: "In classic TCP behavior, what happens to cwnd when RTO expires?" },
        options: [
          { ar: "تُنصّف فقط ويستمر الإرسال بمعدله", en: "Halved only, and sending continues at that rate" },
          { ar: "تنهار إلى 1 MSS ويعود البدء البطيء من الصفر", en: "Collapses to 1 MSS and slow start restarts from zero" },
          { ar: "لا تتغير إطلاقاً", en: "Unchanged entirely" },
          { ar: "تتضاعف تعويضاً عن الفقد", en: "Doubled to compensate for the loss" },
        ],
        correct: 1,
        explain: {
          ar: "انتهاء المهلة أسوأ إشارة ازدحام: ssthresh يصبح نصف cwnd، و cwnd تنهار إلى 1 MSS وينطلق البدء البطيء من جديد (سلوك Tahoe).",
          en: "A timeout is the worst congestion signal: ssthresh becomes half of cwnd, cwnd collapses to 1 MSS, and slow start launches anew (Tahoe behavior).",
        },
      },
    ],
  },
  {
    id: "l068",
    moduleId: "m07",
    order: 8,
    level: "intermediate",
    title: {
      ar: "مدى المنافذ وجدول المنافذ الشائعة",
      en: "Port Ranges & the Common Ports Table",
    },
    summary: {
      ar: "المناطق الثلاث لفضاء المنافذ، الجدول الذهبي للمنافذ الشائعة الذي يقرأه كل مهندس يومياً، وعلاقة المنافذ المؤقتة بـ NAT والأمن.",
      en: "The three zones of port space, the golden table of common ports every engineer reads daily, and how ephemeral ports tie into NAT and security.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "المناطق الثلاث لفضاء المنافذ", en: "The Three Zones of Port Space" },
        table: {
          caption: { ar: "مناطق المنافذ الـ 65,536", en: "The three zones of the 65,536 ports" },
          headers: [
            { ar: "المدى", en: "Range" },
            { ar: "التصنيف", en: "Classification" },
            { ar: "أمثلة", en: "Examples" },
          ],
          rows: [
            [
              { ar: "0 - 1023", en: "0 - 1023" },
              { ar: "معروفة Well-Known — خدمات النظام", en: "Well-known — system services" },
              { ar: "SSH 22، DNS 53، HTTPS 443", en: "SSH 22, DNS 53, HTTPS 443" },
            ],
            [
              { ar: "1024 - 49151", en: "1024 - 49151" },
              { ar: "مسجلة Registered — تطبيقات الشركات", en: "Registered — vendor applications" },
              { ar: "MySQL 3306، PostgreSQL 5432", en: "MySQL 3306, PostgreSQL 5432" },
            ],
            [
              { ar: "49152 - 65535", en: "49152 - 65535" },
              { ar: "ديناميكية/مؤقتة Ephemeral — منافذ مصدر العملاء", en: "Dynamic/ephemeral — client source ports" },
              { ar: "منفذ متصفحك العشوائي 52344", en: "Your browser's random 52344" },
            ],
          ],
        },
        tip: {
          ar: "لينكس يستخدم عملياً 32768-60999 مدىً مؤقتاً افتراضياً — أوسع من توصية IANA — تحقق بنفسك بـ sysctl net.ipv4.ip_local_port_range.",
          en: "Linux practically uses 32768-60999 as its default ephemeral range — wider than IANA's recommendation — verify it yourself with sysctl net.ipv4.ip_local_port_range.",
        },
        body: {
          ar: "المنافذ الـ 65,536 لا تُدار فوضى، بل ثلاث مناطق تعاقبية دستورتها IANA بوضوح:\n\n- المنافذ المعروفة (Well-Known): 0-1023 — خدمات النظام الكلاسيكية (SSH 22، DNS 53، HTTPS 443). في لينكس ويونكس لا يُسمح إلا للجذر بالاستماع عليها (منافذ مميزة privileged)\n- المنافذ المسجلة (Registered): 1024-49151 — تطبيقات شركات معروفة (MySQL 3306، PostgreSQL 5432، Redis 6379)\n- المنافذ الديناميكية/المؤقتة (Dynamic/Ephemeral): 49152-65535 — منافذ مصدر العملاء العشوائية\n\nلينكس عملياً يستخدم 32768-60999 مدىً مؤقتاً افتراضياً — أوسع من توصية IANA — انظره بنفسك في الأمر التالي. هذه المناطق ليست قانوناً ملزماً تقنياً: تستطيع تشغيل خدمتك على أي منفذ، لكن الالتزام بها يجعل الإنترنت قابلاً للتشغيل البيني.",
          en: "The 65,536 ports are not managed as chaos but as three sequential zones constitutionally defined by IANA:\n\n- Well-Known ports: 0-1023 — classic system services (SSH 22, DNS 53, HTTPS 443). On Linux/Unix only root may listen on them (privileged ports)\n- Registered ports: 1024-49151 — known vendor applications (MySQL 3306, PostgreSQL 5432, Redis 6379)\n- Dynamic/Ephemeral ports: 49152-65535 — random client source ports\n\nLinux practically uses 32768-60999 as its default ephemeral range — wider than IANA's recommendation — see for yourself in the command below. These zones are not technically enforceable law: you can run your service on any port, but honoring them keeps the Internet interoperable.",
        },
        code: {
          lang: "bash",
          snippet: "# مدى المنافذ المؤقتة في نواتك\nsysctl net.ipv4.ip_local_port_range\n# net.ipv4.ip_local_port_range = 32768 60999\n\n# جرد ما يستمع عليه جهازك الآن\nss -tulpn",
        },
      },
      {
        heading: { ar: "الجدول الذهبي للمنافذ الشائعة", en: "The Golden Table of Common Ports" },
        table: {
          caption: { ar: "المنافذ التي تقابلها كل يوم في العمل والامتحانات", en: "The ports you meet daily at work and in exams" },
          headers: [
            { ar: "المنفذ", en: "Port" },
            { ar: "البروتوكول", en: "Protocol" },
            { ar: "الخدمة", en: "Service" },
          ],
          rows: [
            [
              { ar: "20 / 21", en: "20 / 21" },
              { ar: "TCP", en: "TCP" },
              { ar: "FTP — البيانات والتحكم", en: "FTP — data and control" },
            ],
            [
              { ar: "22", en: "22" },
              { ar: "TCP", en: "TCP" },
              { ar: "SSH — إدارة مشفرة", en: "SSH — encrypted management" },
            ],
            [
              { ar: "23", en: "23" },
              { ar: "TCP", en: "TCP" },
              { ar: "Telnet — قديم غير مشفر", en: "Telnet — legacy, unencrypted" },
            ],
            [
              { ar: "25", en: "25" },
              { ar: "TCP", en: "TCP" },
              { ar: "SMTP — إرسال البريد", en: "SMTP — sending mail" },
            ],
            [
              { ar: "53", en: "53" },
              { ar: "UDP / TCP", en: "UDP / TCP" },
              { ar: "DNS — حل الأسماء", en: "DNS — name resolution" },
            ],
            [
              { ar: "67 / 68", en: "67 / 68" },
              { ar: "UDP", en: "UDP" },
              { ar: "DHCP — الخادم والعميل", en: "DHCP — server and client" },
            ],
            [
              { ar: "80", en: "80" },
              { ar: "TCP", en: "TCP" },
              { ar: "HTTP — الويب غير المشفر", en: "HTTP — plain web" },
            ],
            [
              { ar: "110", en: "110" },
              { ar: "TCP", en: "TCP" },
              { ar: "POP3 — تنزيل البريد", en: "POP3 — mail download" },
            ],
            [
              { ar: "143", en: "143" },
              { ar: "TCP", en: "TCP" },
              { ar: "IMAP — مزامنة البريد", en: "IMAP — mail sync" },
            ],
            [
              { ar: "161", en: "161" },
              { ar: "UDP", en: "UDP" },
              { ar: "SNMP — مراقبة المعدات", en: "SNMP — device monitoring" },
            ],
            [
              { ar: "443", en: "443" },
              { ar: "TCP", en: "TCP" },
              { ar: "HTTPS — الويب المشفر", en: "HTTPS — encrypted web" },
            ],
            [
              { ar: "993", en: "993" },
              { ar: "TCP", en: "TCP" },
              { ar: "IMAPS — بريد مشفر", en: "IMAPS — encrypted mail" },
            ],
          ],
        },
        body: {
          ar: "هذه المنافذ تحفظ كما تحفظ أرقام الطوارئ — ستقرأها يومياً في الشبكات وجدران الحماية ونتائج الفحص:\n\n- المنفذ يقرأ دائماً مع بروتوكوله: 53 UDP ≠ 53 TCP في الوظيفة الغالبة\n- بعض الخدمات تركت TCP للتاريخ: Telnet 23 محرم استخدامه، و SSH 22 بديله الآمن\n- المنفذ 443 اليوم بات مزدوج البروتوكول: HTTPS فوق TCP، و HTTP/3 (QUIC) فوق UDP\n\nاربط كل منفذ بذاكرة عمل لا بحفظ أعمى: مررت بجدار حماية يسمح به؟ أو خادم يستمع عليه؟ أو هجوم استهدفه؟ الحكاية تجعل الرقم يثبت.",
          en: "Memorize these ports the way you memorize emergency numbers — you will read them daily in networks, firewalls, and scan results:\n\n- A port is always read with its protocol: UDP 53 ≠ TCP 53 in dominant function\n- Some services left TCP for history: Telnet 23 is forbidden practice, SSH 22 its secure replacement\n- Port 443 today is dual-protocol: HTTPS over TCP, and HTTP/3 (QUIC) over UDP\n\nTie each port to a working memory, not blind memorization: a firewall rule allowing it? a server listening on it? an attack targeting it? The story makes the number stick.",
        },
        code: {
          lang: "text",
          snippet: "| Port  | Proto    | Service     | Purpose                                   |\n|-------|----------|-------------|-------------------------------------------|\n| 20/21 | TCP      | FTP         | File transfer (data/control)              |\n| 22    | TCP      | SSH         | Secure shell, SFTP/SCP                    |\n| 23    | TCP      | Telnet      | Legacy shell - plaintext, avoid           |\n| 25    | TCP      | SMTP        | Mail transfer between servers             |\n| 53    | UDP/TCP  | DNS         | Name resolution                           |\n| 67/68 | UDP      | DHCP        | IP auto-configuration (server/client)     |\n| 80    | TCP      | HTTP        | Web                                       |\n| 110   | TCP      | POP3        | Mail retrieval (legacy)                   |\n| 123   | UDP      | NTP         | Time synchronization                      |\n| 143   | TCP      | IMAP        | Mail retrieval                            |\n| 161   | UDP      | SNMP        | Network monitoring (and 162 for traps)    |\n| 389   | TCP/UDP  | LDAP        | Directory services (636 = LDAPS)          |\n| 443   | TCP/UDP  | HTTPS       | Web over TLS / HTTP3 over QUIC            |\n| 445   | TCP      | SMB         | Windows file sharing                      |\n| 514   | UDP/TCP  | Syslog      | Log shipping                              |\n| 3306  | TCP      | MySQL       | Database                                  |\n| 3389  | TCP      | RDP         | Windows remote desktop                    |\n| 5432  | TCP      | PostgreSQL  | Database                                  |\n| 6379  | TCP      | Redis       | In-memory cache                           |",
        },
      },
      {
        heading: { ar: "المنافذ المؤقتة و NAT", en: "Ephemeral Ports & NAT" },
        body: {
          ar: "منفذ المصدر المؤقت هو نصف الصف الرباعي الذي ينساه الناس دوماً. حين يفتح متصفحك أربعين اتصالاً: أربعون منفذاً مؤقتاً مختلفاً من مدى جهازك — لهذا يميز المتصفح ردودها ويعرف الجدار الناري أي استجابة تعود لأي طلب.\n\n- الجدار بحالة (Stateful) يبني جدول الطلبات الصادرة ليسمح بردودها فقط — كل شيء آخر يُصد\n- NAT يعيش على هذه المنافذ: يعيد كتابة منفذ المصدر لتمييز عشرات الأجهزة خلف IP عام واحد\n- استنفاد المنافذ (Port Exhaustion) ظاهرة حقيقية: جهاز يفتح ~28 ألف اتصال لوجهة واحدة (IP:port) سيقف بلا منافذ — الحل منافذ مصدر متعددة أو تجميع اتصالات\n\nولهذا يظهر في سجلات الخوادم أنماط «مصافحة متكررة» عند سوء تصميم التطبيقات: كل طلب = اتصال جديد = منفذ مؤقت جديد = TIME_WAIT متراكمة على الخادم.",
          en: "The ephemeral source port is the half of the 4-tuple people always forget. When your browser opens forty connections: forty different ephemeral ports from your device's range — that is how the browser tells their replies apart and how the firewall knows which response belongs to which request.\n\n- A stateful firewall builds a table of outbound requests to allow only their replies — everything else gets dropped\n- NAT lives on these ports: it rewrites the source port to distinguish dozens of devices behind one public IP\n- Port exhaustion is a real phenomenon: a device opening ~28 thousand connections to one destination (IP:port) runs out of ports — solved with multiple source ports or connection pooling\n\nThis is also why server logs show \"handshake spam\" patterns under poor application design: every request = a new connection = a new ephemeral port = TIME_WAIT piling up on the server.",
        },
        tip: {
          ar: "قبل تشخيص «الشبكة بطيئة» على خادم مزدحم، افحص عدد TIME_WAIT أولاً: ss -tan | grep -c TIME-WAIT — قد تكون المشكلة تصميم اتصالات لا عرض النطاق.",
          en: "Before diagnosing a \"slow network\" on a busy server, check TIME_WAIT first: ss -tan | grep -c TIME-WAIT — the problem may be connection design, not bandwidth.",
        },
      },
      {
        heading: { ar: "المنافذ والأمن", en: "Ports & Security" },
        body: {
          ar: "منفذ مفتوح = خدمة تنتظر ضيفاً؛ وكل خدمة انتظار = سطح هجوم. لهذا كان أبسط الاستطلاعات الأمنية وأقدمها هو فحص المنافذ:\n\n- nmap -sT: مصافحة كاملة صادقة — تظهر في سجلات الخدمة بوضوح\n- nmap -sS: نصف مصافحة (SYN ثم لا شيء) — أخف وأسرع وأكثر شبحية، يظهر كمحاولة اتصال فاشلة\n- المنفذ «المُصفّى» (filtered) يعني جداراً يسقط الحزم بصمت، و«المغلق» (closed) يعني رد RST صريح\n\nقاعدة التحصين الصارمة: أغلق كل ما لا تحتاج، وقيّد ما تحتاجه (SSH من عنوانك فقط مثلاً)، وراقب الباقي. جدول المنافذ الشائع أعلاه هو قاموسك الأول لقراءة نتائج nmap وتحديد الخدمة المطالِبة بالتحديث أو الإغلاق.",
          en: "An open port = a service waiting for a guest; and every waiting service = attack surface. That is why the simplest and oldest security reconnaissance is port scanning:\n\n- nmap -sT: an honest full handshake — clearly visible in service logs\n- nmap -sS: a half-open scan (SYN then nothing) — lighter, faster, stealthier, appearing as failed connection attempts\n- A \"filtered\" port means a firewall silently drops packets; \"closed\" means an explicit RST reply\n\nThe hardening rule: close everything you do not need, restrict what you need (SSH from your address only, for example), and monitor the rest. The common ports table above is your first dictionary for reading nmap results and naming the service demanding an update or shutdown.",
        },
        code: {
          lang: "bash",
          snippet: "# افتح منفذك للاختبار\nnc -l 5555\n\n# من طرفية ثانية: اتصِل به ثم راقبهما\nnc 192.168.1.20 5555\nss -tnp | grep 5555\n\n# فحص منافذ جهاز آخر في شبكتك (بإذن مالكه!)\nnmap -sT -p 1-1024 192.168.1.10",
        },
      },
    ],
    keyPoints: [
      { ar: "المناطق الثلاث: معروفة 0-1023، مسجلة 1024-49151، مؤقتة 49152-65535", en: "Three zones: well-known 0-1023, registered 1024-49151, ephemeral 49152-65535" },
      { ar: "لينكس يستخدم 32768-60999 كمدى مؤقت افتراضي", en: "Linux uses 32768-60999 as its default ephemeral range" },
      { ar: "المنافذ تحت 1024 مميزة: الاستماع عليها يتطلب صلاحيات الجذر", en: "Ports below 1024 are privileged: listening requires root privileges" },
      { ar: "NAT والجدران بحالة يعيشان على المنافذ المؤقتة للتمييز والتعقب", en: "NAT and stateful firewalls live on ephemeral ports for distinction and tracking" },
      { ar: "منفذ مفتوح = سطح هجوم — أغلق ما لا تحتاج وقيّد ما تحتاج", en: "An open port = attack surface — close what you don't need, restrict what you do" },
    ],
    commands: [
      { cmd: "ss -tulpn", desc: { ar: "جرد كامل لما يستمع عليه جهازك مع العمليات", en: "Full inventory of what your machine listens on, with processes" } },
      { cmd: "sysctl net.ipv4.ip_local_port_range", desc: { ar: "مدى المنافذ المؤقتة في نواتك", en: "Your kernel's ephemeral port range" } },
      { cmd: "nmap -sT -p 1-1024 192.168.1.10", desc: { ar: "فحص منافذ جهاز في شبكتك (بإذن مالكه!)", en: "Scan a device on your network (with its owner's permission!)" } },
    ],
    quiz: [
      {
        q: { ar: "ما المدى الصحيح للمنافذ المعروفة (Well-Known)؟", en: "What is the correct range for well-known ports?" },
        options: [
          { ar: "0-1023", en: "0-1023" },
          { ar: "1024-49151", en: "1024-49151" },
          { ar: "0-65535", en: "0-65535" },
          { ar: "1-1000", en: "1-1000" },
        ],
        correct: 0,
        explain: {
          ar: "المعروفة 0-1023، ثم المسجلة 1024-49151، ثم الديناميكية/المؤقتة 49152-65535 حسب دستور IANA.",
          en: "Well-known 0-1023, then registered 1024-49151, then dynamic/ephemeral 49152-65535 per IANA's constitution.",
        },
      },
      {
        q: { ar: "ما الخدمة التي تعمل على UDP 53؟", en: "Which service runs on UDP 53?" },
        options: [
          { ar: "DHCP", en: "DHCP" },
          { ar: "DNS", en: "DNS" },
          { ar: "NTP", en: "NTP" },
          { ar: "SNMP", en: "SNMP" },
        ],
        correct: 1,
        explain: {
          ar: "DNS يستعلم على UDP 53 أساساً، ويلجأ إلى TCP 53 للإجابات الضخمة ونقل المناطق.",
          en: "DNS queries ride UDP 53 primarily, falling back to TCP 53 for oversized answers and zone transfers.",
        },
      },
      {
        q: { ar: "لماذا يفشل مستخدم عادي في لينكس من تشغيل خادم على المنفذ 80؟", en: "Why does a normal Linux user fail to run a server on port 80?" },
        options: [
          { ar: "لأن 80 محجوز لبروتوكول QUIC فقط", en: "Because 80 is reserved for QUIC only" },
          { ar: "لأن المنافذ تحت 1024 مميزة وتتطلب صلاحيات الجذر", en: "Because ports below 1024 are privileged and require root privileges" },
          { ar: "لأن النواة تمنع بروتوكول HTTP دائماً", en: "Because the kernel always blocks the HTTP protocol" },
          { ar: "لأن المنفذ 80 لا وجود له في لينكس", en: "Because port 80 does not exist on Linux" },
        ],
        correct: 1,
        explain: {
          ar: "المنافذ تحت 1024 «مميزة»: الاستماع عليها حكر على الجذر — إجراء أمني قديم يمنع المستخدمين العاديين من انتحال خدمات النظام.",
          en: "Ports below 1024 are \"privileged\": listening is reserved for root — an old security measure preventing ordinary users from impersonating system services.",
        },
      },
      {
        q: { ar: "من أي منطقة يختار جهاز العميل منفذ المصدر لاتصالاته؟", en: "From which zone does a client device pick its source port for connections?" },
        options: [
          { ar: "المعروفة 0-1023", en: "Well-known 0-1023" },
          { ar: "المسجلة 1024-49151", en: "Registered 1024-49151" },
          { ar: "المؤقتة/الديناميكية (المرتفعة)", en: "The dynamic/ephemeral (high) zone" },
          { ar: "من نطاق عناوين MAC", en: "From the MAC address space" },
        ],
        correct: 2,
        explain: {
          ar: "العملاء يختارون منافذ مصدر عشوائية من المدى المؤقت — لينكس مثلاً بين 32768 و 60999.",
          en: "Clients pick random source ports from the ephemeral range — Linux, for example, between 32768 and 60999.",
        },
      },
    ],
  },
  {
    id: "l069",
    moduleId: "m07",
    order: 9,
    level: "intermediate",
    title: {
      ar: "المقابس (Sockets) وممارسة ss و netstat",
      en: "Sockets & Hands-On ss/netstat Practice",
    },
    summary: {
      ar: "المقبس بطاقة هوية الاتصال: الصف الرباعي، آلة حالات TCP كاملة، وتمارين ss و netstat حية على جهازك.",
      en: "The socket as the connection's ID card: the 4-tuple, TCP's full state machine, and live ss/netstat drills on your own machine.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "المقبس: بطاقة هوية الاتصال", en: "Socket: The Connection's ID Card" },
        body: {
          ar: "المقبس (Socket) هو الكيان الذي تديره نواة نظام التشغيل ليتمثل اتصالاً حياً أو باب انتظار. هوية كل مقبس اتصال هي الصف الرباعي:\n\n- IP المصدر + منفذ المصدر + IP الوجهة + منفذ الوجهة (+ بروتوكول النقل للدقة = الصف الخماسي)\n\nبينما مقبس الاستماع (Listening Socket) أبسط تركيباً: بروتوكول + عنوان محلي + منفذ — «باب مفتوح ينتظر أي زائر». لحظة قبول زائر، تُنشئ النواة مقبساً رباعياً مستقلاً له، ويظل باب الاستماع مفتوحاً لمن بعده.\n\n- على المنفذ 443: مقبس استماع واحد + آلاف المقابس الرباعية المتفرعة عنه\n- كل مقبس يملك مخازن (إرسال/استقبال) وحالة وواصف ملف (file descriptor) يمتلكه التطبيق\n\nمن هنا تنبع قوة أدوات مثل ss: هي ببساطة قارئ ماهر لجداول النواة هذه — عرضها بأمانة وترتيبها.",
          en: "The socket is the entity the OS kernel manages to represent a live connection or a waiting door. Each connection socket's identity is the 4-tuple:\n\n- Source IP + source port + destination IP + destination port (+ transport protocol for precision = the 5-tuple)\n\nA listening socket is structurally simpler: protocol + local address + port — \"an open door awaiting any visitor\". The moment a visitor is accepted, the kernel spawns an independent 4-tuple socket for it, while the listening door stays open for the next one.\n\n- On port 443: one listening socket + thousands of connection sockets branching from it\n- Every socket owns buffers (send/receive), a state, and a file descriptor held by the application\n\nThis is where tools like ss get their power: they are simply skilled readers of these kernel tables — displaying them faithfully and sorting them usefully.",
        },
      },
      {
        heading: { ar: "دورة حياة حالات المقبس", en: "The Socket State Lifecycle" },
        table: {
          caption: { ar: "أهم حالات اتصال TCP ومعانيها", en: "Key TCP connection states and their meaning" },
          headers: [
            { ar: "الحالة", en: "State" },
            { ar: "معناها", en: "Meaning" },
          ],
          rows: [
            [
              { ar: "LISTEN", en: "LISTEN" },
              { ar: "الخادم يستقبل اتصالات جديدة", en: "A server accepting new connections" },
            ],
            [
              { ar: "SYN_SENT", en: "SYN_SENT" },
              { ar: "العميل أرسل SYN وينتظر الرد", en: "A client sent SYN and awaits the reply" },
            ],
            [
              { ar: "SYN_RCVD", en: "SYN_RCVD" },
              { ar: "الخادم رد بـ SYN-ACK وينتظر التأكيد", en: "The server replied SYN-ACK, awaiting confirmation" },
            ],
            [
              { ar: "ESTABLISHED", en: "ESTABLISHED" },
              { ar: "الاتصال مفتوح بالكامل وينقل البيانات", en: "Fully open and transferring data" },
            ],
            [
              { ar: "CLOSE_WAIT", en: "CLOSE_WAIT" },
              { ar: "الطرف المقابل أغلق — التطبيق لم يغلق بعد", en: "The peer closed — the local app has not yet" },
            ],
            [
              { ar: "TIME_WAIT", en: "TIME_WAIT" },
              { ar: "انتظار 2×MSL قبل الإغلاق النهائي", en: "Waiting 2×MSL before final close" },
            ],
          ],
        },
        body: {
          ar: "لكل مقبس TCP حالة في آلة حالات محكمة — معرفتها تختصر ساعات تشخيص. المخطط يقرأ من الأعلى (الولادة) إلى الأسفل (الاندثار):\n\n- LISTEN و SYN-SENT و SYN-RCVD: لحظات التأسيس الثلاث\n- ESTABLISHED: الاتصال الحي العامل — كل الأحلام تتحقق هنا\n- FIN_WAIT_1 و FIN_WAIT_2 و CLOSING و TIME_WAIT: مراحل وداع الطرف الفاعل\n- CLOSE_WAIT و LAST_ACK: مراحل وداع الطرف المتلقي\n\nاحفظ الثنائية المتقابلة للأبد: FIN_WAIT للبادئ و CLOSE_WAIT للمتلقي. تراكم الأولى سليم ومنظف ذاتياً، وتراكم الثانية مرض تطبيقي — هذا التمييز وحده يجعلك تشخص المشكلة في الصف الأول من التحقيق.",
          en: "Every TCP socket holds a state in a disciplined state machine — knowing it saves hours of diagnosis. The map reads from top (birth) to bottom (demise):\n\n- LISTEN, SYN-SENT, SYN-RCVD: the three founding moments\n- ESTABLISHED: the live working connection — where all the dreams come true\n- FIN_WAIT_1, FIN_WAIT_2, CLOSING, TIME_WAIT: the initiator's farewell stages\n- CLOSE_WAIT and LAST_ACK: the receiver's farewell stages\n\nMemorize the paired opposites forever: FIN_WAIT for the initiator, CLOSE_WAIT for the receiver. Piles of the first are healthy and self-cleaning; piles of the second are an application disease — this distinction alone puts you one row ahead in any investigation.",
        },
        code: {
          lang: "text",
          snippet: "server: bind + listen -> LISTEN\n\nclient: connect -> SYN-SENT -----> server: SYN-RCVD\n                                    |\nboth: ESTABLISHED <----------------+\n\nESTABLISHED\n  | active close (initiator)         passive close (receiver)\n  v                                   v\nFIN_WAIT_1 -> FIN_WAIT_2 -> TIME_WAIT   CLOSE_WAIT -> LAST_ACK\n   (FIN sent)  (FIN ACKed)  (2*MSL)    (FIN received,\n        |            ^                    waiting for app close())\n        v            |                          v\n        +-- ACK <----+                     CLOSED\nCLOSED (after TIME_WAIT expires)",
        },
      },
      {
        heading: { ar: "ss: أداة العصر", en: "ss: The Modern Tool" },
        body: {
          ar: "ss (socket statistics) من حزمة iproute2 هي وريث netstat وأسرع منه بمراحل، لأنها تخاطب النواة عبر netlink مباشرة بدل قراءة ملفات /proc سطراً سطراً — فرق يظهر على الخوادم ذات مئات آلاف المقابس.\n\nمعنى أعلامها الأساسية:\n\n- -t مقابس TCP و -u مقابس UDP و -l المستمِعة فقط\n- -a الكل بما فيه غير المتصلة و -n أرقام خام دون ترجمة أسماء\n- -p العمليات المالكة و -i معلومات الأداء (rtt, cwnd, retrans) و -m أحجام المخازن\n- -s ملخص إحصائي سريع لكل النظام\n\nاقرأ المثال التالي بعين مهندس: الحالة، الطوابير، المالك — ثلاثة أعمدة تروي قصة كل اتصال:",
          en: "ss (socket statistics) from the iproute2 package is netstat's heir and far faster, because it talks to the kernel via netlink directly instead of reading /proc files line by line — a difference that shows on servers with hundreds of thousands of sockets.\n\nIts essential flags:\n\n- -t TCP sockets, -u UDP sockets, -l listening only\n- -a all (stacked with -l shows everything) and -n raw numbers without name resolution\n- -p owning processes, -i performance info (rtt, cwnd, retrans) and -m buffer sizes\n- -s a quick statistical summary of the whole system\n\nRead the next example with an engineer's eye: state, queues, owner — three columns narrating each connection's story:",
        },
        code: {
          lang: "text",
          snippet: "$ ss -tunap\nNetid State  Recv-Q Send-Q Local Address:Port   Peer Address:Port   Process\ntcp   LISTEN 0      128    0.0.0.0:22          0.0.0.0:*         users:((\"sshd\",pid=912,fd=3))\ntcp   LISTEN 0      511    0.0.0.0:443         0.0.0.0:*         users:((\"nginx\",pid=1043,fd=6))\ntcp   ESTAB  0      0      192.168.1.20:52344  93.184.216.34:443 users:((\"firefox\",pid=2210,fd=89))\nudp   UNCONN 0      0      0.0.0.0:53          0.0.0.0:*         users:((\"dnsmasq\",pid=745,fd=4))\n\n# Recv-Q on LISTEN = current accept-queue / backlog limit\n# Recv-Q on ESTAB  = bytes received but not yet read by the app\n# Send-Q on ESTAB  = bytes sent but not yet ACKed by the peer",
        },
        tip: {
          ar: "Recv-Q مرتفع ومتراكم على مقبس LISTEN يعني طابور قبول ممتلئاً — عملاء ينتظرون قبولك: ارفع backlog أو راجع أداء التطبيق.",
          en: "A high, growing Recv-Q on a LISTEN socket means a full accept queue — clients are waiting for you: raise the backlog or review app performance.",
        },
      },
      {
        heading: { ar: "netstat: الجد المحترم", en: "netstat: The Respected Grandfather" },
        body: {
          ar: "وُلد netstat في ثمانينيات يونكس وخدم أجيالاً من المهندسين — لكنه اليوم موروث بطيء نسبياً على الخوادم الضخمة. المقابلات العملية بينه وبين ss تحفظ في دقيقة:\n\n- ss -tunap ⇔ netstat -tunap\n- ss -tlnp ⇔ netstat -tlnp\n- ss -s ⇔ netstat -s (ملخص البروتوكولات)\n- ip route ⇔ netstat -r (جدول التوجيه)\n- ss -tan ⇔ netstat -tan\n\nيظل netstat مفيداً لأمر واحد شهير حتى اليوم: netstat -s يلخص إحصاءات البروتوكولات (إعادة الإرسال، الاتصالات الفاشلة، الانبعاثات) بصياغة بشرية ودودة — وسنستخدمه في الدرس التالي لتشخيص TCP.",
          en: "netstat was born in 1980s Unix and served generations of engineers — but today it is a relatively slow legacy on huge servers. The practical ss↔netstat equivalences take one minute to memorize:\n\n- ss -tunap ⇔ netstat -tunap\n- ss -tlnp ⇔ netstat -tlnp\n- ss -s ⇔ netstat -s (protocol summary)\n- ip route ⇔ netstat -r (routing table)\n- ss -tan ⇔ netstat -tan\n\nnetstat remains useful for one popular command to this day: netstat -s summarizes protocol statistics (retransmissions, failed connections, resets) in friendly human phrasing — we will use it in the next lesson for TCP troubleshooting.",
        },
      },
      {
        heading: { ar: "تمارين عملية على جهازك", en: "Practice Drills on Your Machine" },
        body: {
          ar: "لا تقرأ عن المقابس — عُدّها وافحصها بيدك. التمارين التالية متدرجة من الإحصاء إلى التتبع الحي:\n\n- التمرين الأول: عدّ المقابس في كل حالة — هل تتوقع حضور TIME_WAIT على جهاز شخصي؟\n- التمرين الثاني: حدد مالك منفذ بعينه — من يستمع على 53 عندك؟ ربما dnsmasq أو systemd-resolved\n- التمرين الثالث: راقب اتصالاً يتشكل أمامك في الزمن الحقيقي\n- التمرين الرابع: خذ ملخصاً عاماً وقرأ أرقام TCP بوصفها نبضاً للنظام\n\nكررها على خادم إن توفر لديك وستلمس الفرق الشاسع في الحجم والأنماط:",
          en: "Do not read about sockets — count and inspect them yourself. The following drills escalate from census to live tracking:\n\n- Drill one: count sockets per state — do you expect TIME_WAIT on a personal machine?\n- Drill two: pin down a port's owner — who listens on 53 for you? dnsmasq or systemd-resolved perhaps\n- Drill three: watch a connection forming in real time before your eyes\n- Drill four: take a general summary and read TCP's numbers as the system's pulse\n\nRepeat them on a server if you have access and you will feel the vast difference in scale and patterns:",
        },
        code: {
          lang: "bash",
          snippet: "# 1) عدّ المقابس في كل حالة\nss -tan | awk 'NR>1 {print $1}' | sort | uniq -c\n\n# 2) من يملك المنفذ 443؟\nss -tlnp 'sport = :443'\n\n# 3) شاهد حالة تتشكل: شغّل curl في طرفية أخرى\ncurl -s https://example.com &\nss -tn state established '( dport = :443 )'\n\n# 4) ملخص إحصائي سريع\nss -s\n\n# 5) عرض المنافذ من منظور العمليات\nsudo lsof -i -P -n | grep LISTEN",
        },
      },
    ],
    keyPoints: [
      { ar: "هوية المقبس = الصف الرباعي (IP ومنفذ لكل طرف) + البروتوكول", en: "A socket's identity = the 4-tuple (IP and port per side) + protocol" },
      { ar: "مقبس استماع واحد يتفرع عنه آلاف مقابس الاتصال الرباعية", en: "One listening socket branches into thousands of 4-tuple connection sockets" },
      { ar: "FIN_WAIT للبادئ و CLOSE_WAIT للمتلقي — التراكم الثاني مرض تطبيقي", en: "FIN_WAIT for the initiator, CLOSE_WAIT for the receiver — the latter piling up is an app disease" },
      { ar: "ss أسرع من netstat لأنها تخاطب النواة عبر netlink", en: "ss beats netstat by talking to the kernel via netlink" },
      { ar: "Recv-Q على ESTAB = بايتات لم يقرأها التطبيق بعد — مؤشر صحة التطبيق", en: "Recv-Q on ESTAB = bytes the app hasn't read yet — an app-health indicator" },
    ],
    commands: [
      { cmd: "ss -tunap", desc: { ar: "كل المقابس مع العمليات — سلاحك اليومي", en: "All sockets with processes — your daily driver" } },
      { cmd: "ss -t state established '( dport = :443 )'", desc: { ar: "تصفية دقيقة: الاتصالات القائمة نحو HTTPS", en: "Precise filter: established connections toward HTTPS" } },
      { cmd: "sudo lsof -i -P -n", desc: { ar: "عرض المنافذ من منظور العمليات نفسها", en: "View ports from the processes' own perspective" } },
    ],
    quiz: [
      {
        q: { ar: "ما المكونات الأربعة لهوية مقبس الاتصال؟", en: "What four components make up a connection socket's identity?" },
        options: [
          { ar: "IP ومنفذ الوجهة فقط", en: "Destination IP and port only" },
          { ar: "IP ومنفذ المصدر و IP ومنفذ الوجهة", en: "Source IP and port plus destination IP and port" },
          { ar: "عنوان MAC و IP للمصدر", en: "Source MAC and IP address" },
          { ar: "PID العملية واسم الخدمة", en: "The process PID and service name" },
        ],
        correct: 1,
        explain: {
          ar: "الصف الرباعي هو الهوية الكاملة: كل اتصال على الخادم نفسه يشارك المنفذين المحليين لكن يختلف في طرف المصدر.",
          en: "The 4-tuple is the full identity: every connection on the same server shares the local pair yet differs in the source endpoint.",
        },
      },
      {
        q: { ar: "مقبس ESTABLISHED وقيمته Recv-Q تتضخم باطراد. ماذا يعني ذلك؟", en: "An ESTABLISHED socket's Recv-Q keeps swelling. What does that mean?" },
        options: [
          { ar: "الشبكة توصل أسرع من أي وقت", en: "The network is delivering faster than ever" },
          { ar: "التطبيق المالك لا يقرأ من المخزن بسرعة كافية", en: "The owning application is not draining the buffer fast enough" },
          { ar: "TCP يعد إعادة إرسال كبرى", en: "TCP is planning a major retransmission" },
          { ar: "خدمة DNS تتعطل", en: "The DNS service is failing" },
        ],
        correct: 1,
        explain: {
          ar: "Recv-Q في الاتصال القائم = بايتات وصلت ولم يقرأها التطبيق — تضخمها يعني قارئاً بطيئاً أو متوقفاً.",
          en: "Recv-Q on an established connection = bytes arrived but unread by the app — its swelling means a slow or stalled reader.",
        },
      },
      {
        q: { ar: "ما الأداة الحديثة التي حلت محل netstat؟", en: "Which modern tool replaced netstat?" },
        options: [
          { ar: "ss", en: "ss" },
          { ar: "netcat", en: "netcat" },
          { ar: "nmap", en: "nmap" },
          { ar: "traceroute", en: "traceroute" },
        ],
        correct: 0,
        explain: {
          ar: "ss من حزمة iproute2 هي الوارث الرسمي: نفس الوظائف تقريباً بأداء أعلى بكثير على الأنظمة الضخمة.",
          en: "ss from iproute2 is the official heir: nearly the same functions with far higher performance on large systems.",
        },
      },
      {
        q: { ar: "خادم يستقبل 5000 اتصال متزامن على المنفذ 443. كم مقبس استماع لديه؟", en: "A server accepts 5,000 concurrent connections on port 443. How many listening sockets does it have?" },
        options: [
          { ar: "5000 — واحد لكل اتصال", en: "5,000 — one per connection" },
          { ar: "واحد فقط", en: "Exactly one" },
          { ar: "صفر — تختفي بعد أول اتصال", en: "Zero — it disappears after the first connection" },
          { ar: "443 — بعدد المنفذ", en: "443 — matching the port number" },
        ],
        correct: 1,
        explain: {
          ar: "مقبس الاستماع واحد يظل مفتوحاً، وتتفرع عنه مقابس الاتصال الرباعية المستقلة لكل عميل.",
          en: "There is one listening socket that stays open, with independent 4-tuple connection sockets branching per client.",
        },
      },
    ],
  },
  {
    id: "l070",
    moduleId: "m07",
    order: 10,
    level: "intermediate",
    title: {
      ar: "استكشاف أخطاء TCP: RST وإعادة الإرسال و Keepalive",
      en: "TCP Troubleshooting: RST, Retransmissions & Keepalive",
    },
    summary: {
      ar: "منهجية تشخيص عملية: قراءة أسباب RST، تفسير إعادة الإرسال والإقرارات المكررة، وضبط keepalive — مع سير عمل tcpdump/ss جاهز.",
      en: "A practical diagnostic method: decoding RST causes, interpreting retransmissions and duplicate ACKs, tuning keepalive — with a ready tcpdump/ss workflow.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "علم RST: أسبابه وصيغه", en: "The RST Flag: Causes & Patterns" },
        table: {
          caption: { ar: "قراءة سريعة لأسباب RST", en: "A quick read of RST causes" },
          headers: [
            { ar: "العرَض", en: "Symptom" },
            { ar: "السبب المحتمل", en: "Likely cause" },
            { ar: "الأداة", en: "Tool" },
          ],
          rows: [
            [
              { ar: "RST فوري بعد SYN", en: "Immediate RST after SYN" },
              { ar: "المنفذ مقفل أو الجدار يرفض الاتصال", en: "Closed port or a rejecting firewall" },
              { ar: "curl -v، nmap", en: "curl -v, nmap" },
            ],
            [
              { ar: "إعادة إرسال متكررة ثم انقطاع", en: "Repeated retransmissions then a cut" },
              { ar: "ازدحام حقيقي أو وصلة رديئة", en: "Real congestion or a bad link" },
              { ar: "ss -ti، Wireshark", en: "ss -ti, Wireshark" },
            ],
            [
              { ar: "انتهاء مهلات بلا رد", en: "Timeouts with no answer" },
              { ar: "مسار مفقود أو MTU أسود أو فلترة صامتة", en: "Missing route, MTU black hole, or silent filtering" },
              { ar: "ping، traceroute", en: "ping, traceroute" },
            ],
            [
              { ar: "اتصالات تتجمد بعد فترة خمول", en: "Connections stall after idle" },
              { ar: "جدار يقتل الجلسات الخاملة", en: "A firewall killing idle sessions" },
              { ar: "ضبط keepalive", en: "Keepalive tuning" },
            ],
          ],
        },
        body: {
          ar: "علم RST هو «طلقة الرحمة» في TCP: المقطع الحامل له يقتل الاتصال فوراً — بلا وداع، بلا TIME_WAIT، بلا تفاوض. أسبابه الأشهر بالترتيب العملي:\n\n- لا شيء يستمع على المنفذ المطلوب: الرد فوري [R.] ويرى العميل «Connection refused»\n- جدار حماية بسياسة REJECT: يرد RST نيابة عن الهدف أو من نفسه — رفض صريح وسريع\n- انهيار التطبيق أو إقفاله القسري: إغلاق المقابس مع SO_LINGER=0 يولّد RST بدلاً من FIN\n- اتصال نصف مفتوح: نظيرك اختفى (إعادة تشغيل) ثم عاد — باكاته القديمة تصطدم بحالة لا يعرفها فيرد RST\n- وسيط منتهي الصبر: بعض الأجهزة ترسل RST للاتصالات الخاملة لتوفير جداولها\n\nالفرق التشخيصي الذهبي الذي يقسم المشاكل نصفين من السطر الأول: فشل فوري = RST (منفذ مغلق أو رفض صريح)؛ بينما تعليق ثم مهلة = حزم مُسقطة صمتاً (DROP) أو مسار ميت. جرّب بنفسك:",
          en: "The RST flag is TCP's \"mercy shot\": the segment carrying it kills the connection instantly — no farewell, no TIME_WAIT, no negotiation. Its most common causes in practical order:\n\n- Nothing listens on the requested port: instant [R.] reply and the client sees \"Connection refused\"\n- A firewall with a REJECT policy: replies RST on the target's behalf or from itself — explicit and fast rejection\n- Application crash or forceful abort: closing sockets with SO_LINGER=0 generates RST instead of FIN\n- A half-open connection: your peer vanished (rebooted) then returned — its old packets hit a state it no longer knows and it answers RST\n- An impatient middlebox: some devices send RST for idle connections to save table space\n\nThe golden diagnostic split that halves the problem space from line one: instant failure = RST (closed port or explicit reject); versus a hang then timeout = silently dropped packets (DROP) or a dead path. Try it yourself:",
        },
        code: {
          lang: "bash",
          snippet: "# التقاط كل حزم RST على الواجهة\nsudo tcpdump -i eth0 'tcp[13] & 4 != 0'\n\n# المحاولة على منفذ مغلق تُرد فوراً\ncurl -v http://192.168.1.10:9999\n# curl: (7) Failed to connect to 192.168.1.10 port 9999: Connection refused\n\n# tcpdump سيرى:\n# 10:00:01.001 IP 192.168.1.20.45222 > 192.168.1.10.9999: Flags [S],  seq 123456789\n# 10:00:01.003 IP 192.168.1.10.9999 > 192.168.1.20.45222: Flags [R.], seq 0, win 0",
        },
        tip: {
          ar: "تعليقُ الاتصال التام بلا رد = غالباً جدار DROP؛ بينما الرفض الفوري = RST. هذا الفرق يوفر عليك ساعات تخمين منذ أول ثانية.",
          en: "A total silent hang = usually a firewall DROP; an instant refusal = an RST. This difference saves you hours of guessing from the first second.",
        },
      },
      {
        heading: { ar: "إعادة الإرسال والإقرارات المكررة", en: "Retransmissions & Duplicate ACKs" },
        body: {
          ar: "TCP لا يعترف بالفقدان إلا بطريقتين: انتهاء مهلة إعادة الإرسال (RTO) أو إقرارات مكررة. وإعادة الإرسال نفسها ليست خطيئة بل آلية سلامة — السؤال التشخيصي الدائم: كم؟ ومتى؟ ولماذا؟\n\n- RTO تُحسب من تقدير RTT (SRTT) مع تضخيم احترازي، وتتضاعف تراكمياً مع كل فشل\n- الإقرار المكرر: وصلت بايتات بعد الثقب فيعيد المستقبِل إقرار آخر موضع سليم\n- ثلاثة مكررات = إرسال سريع عادي؛ عشرات = مشكلة جودة؛ مئات = طبقة فيزيائية أو تشبع\n\nأسباب إعادة الإرسال الشائعة في الميدان: ازدحام حقيقي، واي فاي مضطرب، كابل معيب أو موصلات رديئة، تذبذب زمن الوصول الذي يسبب إرسالاً زائفاً، وجدران تبتلع ICMP فتظن النواة المسار ميتاً فتعيد. راقب العدادات عددياً — النسب المئوية أهم من الأرقام المطلقة:",
          en: "TCP recognizes loss in only two ways: a retransmission timeout (RTO) or duplicate ACKs. Retransmission itself is not a sin but a safety mechanism — the standing diagnostic question is: how many? when? and why?\n\n- RTO is computed from the RTT estimate (SRTT) with conservative inflation, doubling cumulatively with each failure\n- A duplicate ACK: bytes arrived after the hole, so the receiver re-ACKs the last healthy position\n- Three duplicates = ordinary fast retransmit; tens = a quality problem; hundreds = physical layer or saturation\n\nCommon field causes of retransmissions: genuine congestion, jittery Wi-Fi, a faulty cable or bad connectors, path delay variance causing spurious sends, and firewalls swallowing ICMP so the kernel presumes a dead path and resends. Watch the counters numerically — percentages matter more than absolute numbers:",
        },
        code: {
          lang: "bash",
          snippet: "# إحصاءات إعادة الإرسال لاتصال حي\nss -ti dst :443\n# ... retrans 4/12 ...  (successful retrans / total attempts)\n\n# إعادة الإرسال على مستوى النظام\nnetstat -s | grep -i retrans\n#     1201 segments retransmitted\n#     3 bad retransmitted\n\n# شاهد إعادة الإرسال لحظياً في التقاط\nsudo tcpdump -i eth0 'tcp port 443'\n# 10:00:05.101 IP a > b: Flags [.], seq 1:1461, length 1460\n# 10:00:05.335 IP a > b: Flags [.]  <- retransmission after RTO",
        },
      },
      {
        heading: { ar: "Keepalive: هل ما زلت حياً؟", en: "Keepalive: Are You Still There?" },
        body: {
          ar: "مشكلة «النظير الصامت»: خادم انهار أو مسار انقطع بصمت — يظل TCP قائماً بانتظار بيانات لن تأتي أبداً. من يكشف الموت؟\n\nبلا تطبيق ذكي: آلية Keepalive في النواة — بعد سكون مدته net.ipv4.tcp_keepalive_time (ساعتان افتراضياً!) ترسل النواة مسبارات صغيرة، وبعد فشل عدد tcp_keepalive_probes بتردد tcp_keepalive_intvl تُعلن الاتصال ميتاً وتُغلق.\n\n- ساعتان أطول مما يتحمله معظم تطبيقات اليوم — لهذا يبني التطبيق نبضه الخاص: WebSocket ping، و SSH KeepAlive، و HTTP health checks\n\nوترتيب اليأس الكلي أشد بطئاً: tcp_retries2 = 15 محاولة إعادة إرسال بترايد أُسّي — نحو 15-30 دقيقة قبل إعلان موت اتصال معلق. الخلاصة الهندسية: لا تعتمد على النواة وحدها في كشف الموت — صمّم نبضاً على مستوى التطبيق.",
          en: "The \"silent peer\" problem: a server crashed or a path died quietly — TCP still stands, waiting for data that will never come. Who detects the death?\n\nWithout a smart application: the kernel's Keepalive mechanism — after an idle period of net.ipv4.tcp_keepalive_time (two hours by default!) the kernel sends tiny probes, and after tcp_keepalive_probes failures spaced by tcp_keepalive_intvl, the connection is declared dead and closed.\n\n- Two hours is longer than most modern apps tolerate — which is why applications build their own pulse: WebSocket pings, SSH KeepAlive, HTTP health checks\n\nThe total-despair sequence is even slower: tcp_retries2 = 15 retransmission attempts with exponential backoff — roughly 15-30 minutes before a stuck connection is declared dead. The engineering conclusion: never rely on the kernel alone to detect death — design a heartbeat at the application level.",
        },
        code: {
          lang: "bash",
          snippet: "# القيم الافتراضية: سكون / عدد المسبارات / الفاصل بينها\nsysctl net.ipv4.tcp_keepalive_time net.ipv4.tcp_keepalive_probes net.ipv4.tcp_keepalive_intvl\n# net.ipv4.tcp_keepalive_time = 7200   (ساعتان!)\n# net.ipv4.tcp_keepalive_probes = 9\n# net.ipv4.tcp_keepalive_intvl = 75\n\n# قبل أن ييأس TCP من اتصال معلق؟\nsysctl net.ipv4.tcp_retries2\n# net.ipv4.tcp_retries2 = 15",
        },
      },
      {
        heading: { ar: "سير عمل تشخيص منهجي", en: "A Systematic Diagnostic Workflow" },
        diagram: {
          kind: "flow",
          title: { ar: "تشخيص مشكلات TCP خطوة خطوة", en: "Diagnosing TCP troubles, step by step" },
          items: [
            { ar: "هل المنفذ مفتوح أصلاً؟ — ss -tlnp على الخادم", en: "Is the port open at all? — ss -tlnp on the server" },
            { ar: "هل يصل SYN؟ — التقاط حزم على الطرفين", en: "Does the SYN arrive? — capture on both ends" },
            { ar: "هل يأتي RST أم صمت تام؟", en: "Is it an RST or total silence?" },
            { ar: "راجع الجدران ومسارات الشبكة في المسار", en: "Inspect firewalls and paths along the way" },
            { ar: "قارن عدادات إعادة الإرسال قبل وبعد", en: "Compare retransmission counters before and after" },
          ],
        },
        body: {
          ar: "عند شكوى «الاتصال بطيء أو يتقطع» — خطة من خمس خطوات تقصي الاحتمالات تباعاً، من الأرخص إلى الأغلى:\n\n- الخطوة 1: نبض النظام العام — هل المشكلة فردية أم عامة؟\n- الخطوة 2: هل الاتصال قائم أصلاً؟ أم يرفض فوراً (RST) أو يعلق (DROP)؟\n- الخطوة 3: صحة الاتصال — rtt و retrans و النافذة تكشف الجودة\n- الخطوة 4: التقاط حقيقي محفوظ — الدليل الجنائي الذي لا يقبل الجدل\n- الخطوة 5: طبقات أدنى — هل المشكلة فقداناً (واي فاي/كابل) أم تأخيراً (ازدحام)؟\n\nغالباً ينتهي التشخيص عند الخطوة 3: RST؟ إعدادات وجدران. إعادة إرسال؟ جودة المسار. نافذة صفرية؟ تطبيق بطيء. التقاط صغير مُصفّى بخيار واحد أبلغ من ألف تخمين — ووثّق دائماً بملف pcap ليعود إليه من لم يشهدها:",
          en: "When the complaint is \"slow or intermittent connections\" — a five-step plan eliminates possibilities in order, cheapest first:\n\n- Step 1: the system's general pulse — is the problem isolated or global?\n- Step 2: does the connection even exist? Instantly refused (RST) or hanging (DROP)?\n- Step 3: connection health — rtt, retrans, and the window reveal quality\n- Step 4: a saved real capture — the forensic evidence no argument beats\n- Step 5: lower layers — is the problem loss (Wi-Fi/cable) or delay (congestion)?\n\nDiagnosis usually ends at step 3: RST? configuration and firewalls. Retransmissions? path quality. Zero window? a slow application. A small filtered capture beats a thousand guesses — and always document with a pcap file so those absent can revisit it:",
        },
        code: {
          lang: "bash",
          snippet: "# سير عمل تشخيص TCP في خمس خطوات\n# 1) نبض عام\nss -s\n# 2) هل الاتصال قائم؟\nss -tn state established '( dport = :443 )'\n# 3) صحة الاتصال: rtt / retrans / النافذة\nss -ti dst :443\n# 4) التقاط حقيقي (احفظ وحلل)\nsudo tcpdump -i eth0 -w /tmp/tcp.pcap 'tcp port 443'\n# 5) الطبقات الأدنى: فقدان أم تأخير؟\nping -c 20 192.168.1.10\nmtr -rw 192.168.1.10",
        },
        tip: {
          ar: "التقط دائماً بـ -w file.pcap ثم حلّل مرتين: مرة حية بمرشحات سريعة، ومرة بهدوء لاحقاً — الملف نفسه يجيب أسئلة لم تخطر لك وقت الحادث.",
          en: "Always capture with -w file.pcap then analyze twice: once live with quick filters, once calmly later — the same file answers questions you never thought of during the incident.",
        },
      },
    ],
    keyPoints: [
      { ar: "فشل فوري = RST (منفذ مغلق أو REJECT)؛ تعليق ثم مهلة = DROP صامت", en: "Instant failure = RST (closed port or REJECT); hang then timeout = silent DROP" },
      { ar: "ثلاثة إقرارات مكررة إرسال سريع عادي — والعشرات مشكلة جودة مسار", en: "Three duplicate ACKs are normal fast retransmit — tens of them mean path quality trouble" },
      { ar: "keepalive الافتراضي ساعتا سكون + 9 مسبارات × 75 ثانية — أبطأ من متطلبات أغلب التطبيقات", en: "Default keepalive = 2h idle + 9 probes × 75s — slower than most apps require" },
      { ar: "tcp_retries2=15: قد يمضي 15-30 دقيقة قبل إعلان موت اتصال معلق", en: "tcp_retries2=15: 15-30 minutes may pass before a stuck connection is declared dead" },
      { ar: "منهجية خمس خطوات: ss -s ثم الحالة ثم ss -ti ثم pcap ثم ping/mtr", en: "Five-step method: ss -s, state check, ss -ti, a pcap, then ping/mtr" },
    ],
    commands: [
      { cmd: "sudo tcpdump -i eth0 'tcp[13] & 4 != 0'", desc: { ar: "اصطد كل حزم RST — طلقات القطع", en: "Catch every RST packet — the abort bullets" } },
      { cmd: "ss -ti dst :443", desc: { ar: "صحة الاتصالات الحية: RTT و retrans والنافذة", en: "Health of live connections: RTT, retransmits, window" } },
      { cmd: "netstat -s | grep -i retrans", desc: { ar: "عدادات إعادة الإرسال على مستوى النظام", en: "System-wide retransmission counters" } },
      { cmd: "sysctl net.ipv4.tcp_keepalive_time", desc: { ar: "اطّلع على مهلة السكون الافتراضية لـ keepalive", en: "Check the default keepalive idle period" } },
    ],
    quiz: [
      {
        q: { ar: "عميل يفشل فوراً برسالة «Connection refused». ما التفسير الأرجح؟", en: "A client fails instantly with \"Connection refused\". What is the most likely explanation?" },
        options: [
          { ar: "جدار حماية يسقط الحزم بصمت (DROP)", en: "A firewall silently dropping packets (DROP)" },
          { ar: "الهدف رد بـ RST — لا مستمع على المنفذ", en: "The target replied with RST — nothing listens on the port" },
          { ar: "فشل تحليل اسم DNS", en: "A DNS resolution failure" },
          { ar: "فشل بروتوكول ARP", en: "An ARP protocol failure" },
        ],
        correct: 1,
        explain: {
          ar: "الرفض الفوري علامة RST: لا عملية تستمع على المنفذ أو وسيط يرفض صراحة. أما السقوط الصامت فيُظهر تعليقاً ثم مهلة.",
          en: "Instant refusal is the RST signature: no process listening, or a middlebox rejecting explicitly. Silent drops instead show a hang then a timeout.",
        },
      },
      {
        q: { ar: "ما الفرق بين سياسة DROP و REJECT في جدار حماية من منظور العميل؟", en: "What is the client-side difference between a firewall's DROP and REJECT policies?" },
        options: [
          { ar: "لا فرق بينهما إطلاقاً", en: "There is no difference at all" },
          { ar: "DROP يعني صمتاً ومهلة، و REJECT يعني رفضاً سريعاً بـ RST", en: "DROP means silence and a timeout; REJECT means a fast RST refusal" },
          { ar: "REJECT يمرر الحزم دائماً", en: "REJECT always passes packets through" },
          { ar: "DROP يرد أسرع من REJECT", en: "DROP replies faster than REJECT" },
        ],
        correct: 1,
        explain: {
          ar: "DROP يترك العميل معلقاً ينتظر حتى المهلة؛ REJECT يرسل له رداً فورياً (RST أو ICMP) يخبره بالرفض — فرق حاسم في التشخيص.",
          en: "DROP leaves the client hanging until timeout; REJECT sends an immediate reply (RST or ICMP) informing it of refusal — a decisive diagnostic difference.",
        },
      },
      {
        q: { ar: "ما الذي يشير عادة إلى فقدان مقطع معزول مع بقاء الاتصال حياً؟", en: "What usually indicates an isolated segment loss while the connection stays alive?" },
        options: [
          { ar: "انتهاء مهلة RTO", en: "An RTO timeout" },
          { ar: "فشل مسبار keepalive", en: "A failed keepalive probe" },
          { ar: "وصول ثلاثة إقرارات مكررة", en: "Arrival of three duplicate ACKs" },
          { ar: "إعلان نافذة صفرية", en: "A zero-window advertisement" },
        ],
        correct: 2,
        explain: {
          ar: "الإقرارات المكررة الثلاثة تبلغ المرسِل بثقب محدد بينما الإرسال في الاتجاهين مستمر — فيشعل إعادة الإرسال السريعة فوراً.",
          en: "Three duplicate ACKs report a specific hole while data flow continues both ways — immediately triggering fast retransmit.",
        },
      },
      {
        q: { ar: "ما القيمة الافتراضية لـ net.ipv4.tcp_keepalive_time في لينكس؟", en: "What is the default value of net.ipv4.tcp_keepalive_time on Linux?" },
        options: [
          { ar: "75 ثانية", en: "75 seconds" },
          { ar: "720 ثانية", en: "720 seconds" },
          { ar: "7200 ثانية", en: "7,200 seconds" },
          { ar: "72000 ثانية", en: "72,000 seconds" },
        ],
        correct: 2,
        explain: {
          ar: "ساعتان (7200 ثانية) من السكون قبل أول مسبار — طويلة جداً لمعظم التطبيقات الحديثة التي تبني نبضها الخاص.",
          en: "Two hours (7,200 seconds) of idle before the first probe — far too long for most modern apps, which build their own heartbeat.",
        },
      },
    ],
  },
];
