import type { Lesson } from "@/lib/types";

// Module 05: Network Layer & IP Addressing — الطبقة الثالثة وعنونة IP
// Lessons l041-l050, level: intermediate

export const m05_LESSONS: Lesson[] = [
  {
    id: "l041",
    moduleId: "m05",
    order: 1,
    level: "intermediate",
    title: { ar: "دور طبقة الشبكة: العنونة المنطقية وتحديد المسار", en: "The Network Layer Role: Logical Addressing & Path Determination" },
    summary: {
      ar: "كيف تنقل طبقة الشبكة الحزم بين شبكات مختلفة، وما الفرق الجوهري بين العنونة المنطقية والفيزيائية، وكيف يفكر الموجّه عند كل حزمة.",
      en: "How the network layer moves packets across different networks, the core difference between logical and physical addressing, and how a router thinks about every packet.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "مكان الطبقة الثالثة في الصورة الكاملة", en: "Where Layer 3 Fits in the Big Picture" },
        body: {
          ar: "طبقة الشبكة (Network Layer) هي الطبقة الثالثة في نموذج OSI ومسؤولة عن نقل البيانات بين شبكات مختلفة، وليس فقط داخل شبكة واحدة كما تفعل طبقة الوصل.\n\nوحدة البيانات في هذه الطبقة تسمى الحزمة (Packet)، وعندما يمرّ حزمة عبر موجّه (Router) فإنه يفكّ الإطار ويعيد تغليف الحزمة في إطار جديد تماماً.\n\n- الطبقة الثانية: تسليم محلي داخل الشبكة نفسها باستخدام عناوين MAC\n- الطبقة الثالثة: تسليم شامل عبر الشبكات باستخدام عناوين IP\n- المبدّل يبني جداول MAC، والموجّه يبني جدول توجيه (Routing Table)",
          en: "The network layer is Layer 3 of the OSI model, responsible for moving data between different networks — not just within one network as the data link layer does.\n\nThe PDU at this layer is called a packet. When a packet crosses a router, the router strips the old frame and re-encapsulates the packet into a brand-new frame.\n\n- Layer 2: local delivery inside the same network using MAC addresses\n- Layer 3: global delivery across networks using IP addresses\n- A switch builds MAC tables; a router builds a routing table",
        },
      },
      {
        heading: { ar: "الوظائف الثلاث الكبرى للطبقة", en: "The Three Big Jobs of the Layer" },
        body: {
          ar: "تقوم طبقة الشبكة بثلاث وظائف جوهرية لا غنى عن أي منها:\n\nأولاً: العنونة المنطقية (Logical Addressing) — كل جهاز يحصل على عنوان IP فريد في نطاق شبكته، وهذا العنوان يحمل معلومتين: الشبكة والمضيف.\n\nثانياً: تحديد المسار (Path Determination) — الموجّه يستشير جدوله ليقرر إلى أين يرسل الحزمة تالياً: إلى واجهة محلية، أم إلى موجّه آخر أقرب للوجهة.\n\nثالثاً: التوجيه وإعادة الإرسال (Forwarding) — النقل الفعلي للحزمة من واجهة دخول إلى واجهة خروج، وهو عمل متكرر بملايين المرات في الثانية على الموجّهات الحديثة.\n\n- عناوين IP تُدار مركزياً من IANA عبر السلطات الإقليمية\n- قرار التوجيه يؤخذ لكل حزمة على حدة\n- القرار يعتمد على أطول بادئة مطابقة في الجدول (سنتعمق لاحقاً)",
          en: "The network layer performs three essential functions:\n\nFirst: logical addressing — every device gets an IP address unique within its scope, and that address encodes two things: the network and the host.\n\nSecond: path determination — the router consults its table to decide where to send the packet next: out a local interface, or to another router closer to the destination.\n\nThird: forwarding — actually moving the packet from an inbound interface to an outbound one, repeated millions of times per second on modern routers.\n\n- IP addresses are managed centrally by IANA through regional registries\n- The routing decision is made per packet\n- The decision relies on the longest matching prefix in the table (covered in depth later)",
        },
        code: {
          lang: "cisco",
          snippet: "Router# show ip route\ncodes: C - connected, L - local, S - static, O - OSPF, B - BGP\n\nC    192.168.1.0/24 is directly connected, GigabitEthernet0/0\nL    192.168.1.1/32 is directly connected, GigabitEthernet0/0\nO    10.10.0.0/16 [110/65] via 192.168.1.2, 00:05:12, Gi0/0\nS*   0.0.0.0/0 [1/0] via 203.0.113.1",
        },
      },
      {
        heading: { ar: "العنوان المنطقي مقابل العنوان الفيزيائي", en: "Logical vs Physical Addressing" },
        body: {
          ar: "عنوان MAC فيزيائي وثابت يُحفر في واجهة الشبكة من المصنع، وعنوان IP منطقي وقابل للتغيير حسب الشبكة التي تتصل بها.\n\nتشبيه دقيق: عنوان IP هو عنوان منزلك الكامل (الحي، الشارع، رقم البناية) بينما عنوان MAC هو رقم جواز سفرك — الأول يخبر أين توجد، والثاني يخبر من أنت.\n\n- عنوان MAC يتغير كل قفزة: كل موجّه يضع عنوان MAC جديداً للقفزة التالية\n- عنوان IP للوجهة يبقى ثابتاً من البداية حتى النهاية (في حال عدم وجود NAT)\n- عنوان IP للمصدر أيضاً يبقى ثابتاً ما لم تترجمه NAT\n\nهذا الانفصال هو ما يجعل الإنترنت ممكناً: فالإطارات تُبنى وتهدم ملايين المرات، والحزم تعبر قارات كاملة بعنوانين ثابتين.",
          en: "A MAC address is physical and factory-burned into the NIC; an IP address is logical and changes depending on the network you join.\n\nAn accurate analogy: your IP address is your full postal address (district, street, building number), while your MAC is your passport number — the first says where you are, the second says who you are.\n\n- MAC addresses change at every hop: each router writes a new MAC for the next hop\n- The destination IP stays constant from source to destination (absent NAT)\n- The source IP also stays constant unless NAT translates it\n\nThis separation is what makes the Internet possible: frames are built and destroyed millions of times while packets cross entire continents with two constant addresses.",
        },
        tip: {
          ar: "عند تشغيل tracert لاحظ أن كل قفزة IP واحدة فقط، بينما تغيّرت عناوين MAC عند كل موجّه — أدوات مثل Wireshark تُظهر هذا بوضوح.",
          en: "When running tracert notice each hop is one IP hop, while MAC addresses change at every router — tools like Wireshark show this clearly.",
        },
      },
      {
        heading: { ar: "الموجّه مقابل المبدّل: من يفعل ماذا؟", en: "Router vs Switch: Who Does What?" },
        table: {
          caption: { ar: "المبدّل والراوتر: تقسيم العمل بينهما", en: "Switch and router: the division of labor" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "المبدّل Switch", en: "Switch" },
            { ar: "الموجّه Router", en: "Router" },
          ],
          rows: [
            [
              { ar: "الطبقة", en: "Layer" },
              { ar: "L2 — الوصل", en: "L2 — data link" },
              { ar: "L3 — الشبكة", en: "L3 — network" },
            ],
            [
              { ar: "العنوان الذي يقرأه", en: "Address it reads" },
              { ar: "MAC", en: "MAC" },
              { ar: "IP", en: "IP" },
            ],
            [
              { ar: "وحدة البيانات", en: "PDU" },
              { ar: "إطار Frame", en: "Frame" },
              { ar: "حزمة Packet", en: "Packet" },
            ],
            [
              { ar: "نطاق عمله", en: "Scope" },
              { ar: "قطاع محلي واحد / VLAN", en: "One local segment / VLAN" },
              { ar: "بين الشبكات عبر المسارات", en: "Between networks across paths" },
            ],
            [
              { ar: "جدوله", en: "Its table" },
              { ar: "MAC Address Table", en: "MAC address table" },
              { ar: "جدول التوجيه Routing Table", en: "The routing table" },
            ],
          ],
        },
        body: {
          ar: "المبدّع يعمل في الطبقة الثانية ويبني جدول عناوين MAC ليجري التبديل داخل شبكة بث واحدة، أما الموجّه فيعمل في الطبقة الثالثة ويفصل بين نطاقات البث (Broadcast Domains) ويجعل كل منفذ شبكة مستقلة.\n\nعندما يستلم الموجّه إطاراً على واجهة ما، يمرّ بالخطوات التالية:\n\n- يفحص غلاف الإطار ويستخرج الحزمة\n- ينقص قيمة TTL (Time To Live) بمقدار واحد لمنع الحزم من الدوران للأبد\n- يعيد حساب ترويسة التحقق (Checksum) بعد التعديل\n- يبحث في جدول التوجيه عن أطول بادئة تطابق عنوان الوجهة\n- يغلّف الحزمة في إطار جديد بعناوين MAC للقفزة التالية ويرسلها\n\nالمبدّلات الحديثة (Layer 3 Switches) تجمع الوظيفتين معاً، لكن المبدأ يبقى كما هو.",
          en: "A switch operates at Layer 2, building a MAC table to forward frames inside one broadcast domain. A router operates at Layer 3, separating broadcast domains and making each port an independent network.\n\nWhen a router receives a frame on an interface, it goes through these steps:\n\n- Checks the frame integrity and extracts the packet\n- Decrements TTL (Time To Live) by one, preventing packets from looping forever\n- Recomputes the header checksum after the change\n- Looks up the longest matching prefix for the destination address\n- Encapsulates the packet in a new frame with next-hop MACs and sends it\n\nModern Layer 3 switches combine both roles, but the principle is unchanged.",
        },
        tip: {
          ar: "انقاص TTL بمقدار واحد عند كل موجّه هو السبب الدقيق لعمل الأمر traceroute: الحزمة التي تنتهي صلاحيتها تُعيد رسالة ICMP Time Exceeded إلى المصدر.",
          en: "Decrementing TTL by one at each router is exactly why traceroute works: the expiring packet makes each router send back an ICMP Time Exceeded message to the source.",
        },
      },
      {
        heading: { ar: "التسليم بأفضل جهد: بلا ضمانات", en: "Best-Effort Delivery: No Guarantees" },
        body: {
          ar: "طبقة الشبكة في TCP/IP صادقة بلا مجاملة: إنها تُسلّم بأفضل جهد (Best-Effort) فقط، أي بلا أي ضمان.\n\n- لا ضمان للتسليم: قد تُهدر الحزمة عند الازدحام\n- لا ضمان للترتيب: حزمتان قد تصلان بترتيب مختلف\n- لا ضمان لسلامة البيانات من طرف لطرف\n- لا آلية لإعادة الإرسال في IPv4\n\nمن يتكفل بكل ذلك؟ الطبقات الأعلى: بروتوكول TCP يضبط كل شيء من إعادة الإرسال إلى الترتيب وصولاً إلى سلامة البيانات. أما UDP فيترك المسؤولية للتطبيق نفسه.\n\nفلسفة التصميم هنا مقصودة: اجعل نواة الشبكة بسيطة وسريعة، وضع الذكاء في الأطراف. هذه البساطة هي سرّ قابلية التوسع الهائلة للإنترنت.",
          en: "The TCP/IP network layer is honest without politeness: it is best-effort only, with zero guarantees.\n\n- No delivery guarantee: a packet may be dropped under congestion\n- No ordering guarantee: two packets may arrive in different order\n- No end-to-end data integrity\n- No retransmission mechanism in IPv4\n\nWho fixes all of that? The upper layers: TCP handles everything from retransmission to ordering to data integrity, while UDP leaves responsibility to the application.\n\nThe design philosophy is deliberate: keep the network core simple and fast, put intelligence at the edges. That simplicity is the secret of the Internet is enormous scalability.",
        },
      },
    ],
    keyPoints: [
      { ar: "طبقة الشبكة تنقل الحزم بين شبكات مختلفة ووحدة بياناتها الحزمة (Packet)", en: "The network layer moves packets between networks; its PDU is the packet" },
      { ar: "وظائفها: عنونة منطقية، تحديد مسار، وإعادة توجيه الحزم", en: "Its jobs: logical addressing, path determination, and forwarding" },
      { ar: "IP ثابت من المصدر للوجهة، بينما MAC يتغير عند كل قفزة", en: "IP stays constant source-to-destination, while MAC changes at every hop" },
      { ar: "الموجّه ينقص TTL ويعيد التغليف عند كل قفزة، وهذا أساس عمل traceroute", en: "Routers decrement TTL and re-encapsulate each hop — the basis of traceroute" },
      { ar: "IPv4 تسليم بأفضل جهد بلا ضمانات، والطبقات الأعلى تعوّض ذلك", en: "IPv4 is best-effort with no guarantees; upper layers compensate" },
    ],
    commands: [
      { cmd: "show ip route", desc: { ar: "عرض جدول التوجيه على موجّه Cisco (مباشر أو عبر SSH)", en: "Show the routing table on a Cisco router (console or SSH)" } },
      { cmd: "ip route show", desc: { ar: "عرض جدول التوجيه على لينكس بصيغة مفصلة", en: "Show the routing table on Linux in detailed format" } },
      { cmd: "traceroute 8.8.8.8", desc: { ar: "تتبع المسار ورؤية TTL يعمل قفزة بعد قفزة", en: "Trace the path and watch TTL at work hop by hop" } },
    ],
    quiz: [
      {
        q: { ar: "ما الفرق الأساسي بين عنوان IP وعنوان MAC عند عبور حزمة ثلاثة موجّهات؟", en: "What is the essential difference between the IP and MAC addresses when a packet crosses three routers?" },
        options: [
          { ar: "كلاهما يتغير عند كل قفزة", en: "Both change at every hop" },
          { ar: "IP يبقى ثابتاً بينما MAC يتغير عند كل قفزة", en: "IP stays constant while MAC changes at every hop" },
          { ar: "MAC يبقى ثابتاً بينما IP يتغير عند كل قفزة", en: "MAC stays constant while IP changes at every hop" },
          { ar: "كلاهما يبقى ثابتاً طوال الرحلة", en: "Both stay constant the whole trip" },
        ],
        correct: 1,
        explain: { ar: "الإطار يُبنى من جديد عند كل قفزة بعناوين MAC جديدة، بينما عنوانا IP للمصدر والوجهة يبقيان ثابتين ما لم توجد NAT.", en: "The frame is rebuilt at every hop with new MACs, while source and destination IPs stay constant unless NAT is present." },
      },
      {
        q: { ar: "لماذا ينقص الموجّه قيمة TTL بمقدار واحد لكل حزمة؟", en: "Why does a router decrement TTL by one for each packet?" },
        options: [
          { ar: "لحساب عدد البايتات المنقولة", en: "To count transferred bytes" },
          { ar: "لترتيب الحزم عند الوجهة", en: "To order packets at the destination" },
          { ar: "لمنع دوران الحزم بلا نهاية عند وجود حلقات توجيه", en: "To prevent packets from looping forever when routing loops exist" },
          { ar: "لتشفير محتوى الحزمة", en: "To encrypt the packet content" },
        ],
        correct: 2,
        explain: { ar: "TTL عدّاد حياة الحزمة؛ لو وُجدت حلقة توجيه لدارت الحزمة للأبد، فلذلك ينقص حتى الصفر ثم تُهدر ويُعاد ICMP Time Exceeded للمصدر.", en: "TTL is a packet lifetime counter; if a routing loop existed the packet would circulate forever, so it counts down to zero, gets dropped, and an ICMP Time Exceeded returns to the source." },
      },
      {
        q: { ar: "أي من هذه الضمانات تقدمها طبقة الشبكة في IPv4؟", en: "Which of these guarantees does the IPv4 network layer provide?" },
        options: [
          { ar: "ضمان تسليم الحزمة", en: "Guaranteed delivery" },
          { ar: "ضمان وصول الحزم بالترتيب", en: "Guaranteed in-order arrival" },
          { ar: "ضمان سري زمني من المصدر للوجهة", en: "Guaranteed source-to-destination latency" },
          { ar: "لا شيء مما سبق — التسليم بأفضل جهد فقط", en: "None of the above — best-effort only" },
        ],
        correct: 3,
        explain: { ar: "IPv4 لا يضمن شيئاً: لا تسليماً ولا ترتيباً ولا زمناً. بروتوكولات الطبقات الأعلى مثل TCP هي من تبني الضمانات.", en: "IPv4 guarantees nothing: no delivery, no ordering, no timing. Higher-layer protocols like TCP build the guarantees." },
      },
    ],
  },
  {
    id: "l042",
    moduleId: "m05",
    order: 2,
    level: "intermediate",
    title: { ar: "تشريح ترويسة IPv4 حقلاً حقلاً", en: "Dissecting the IPv4 Header Field by Field" },
    summary: {
      ar: "بنية ترويسة IPv4 المكونة من 20 إلى 60 بايت: كل حقل ووظيفته، مع مثال محسوب على التفتيت وبحث TTL وبروتوكول.",
      en: "The 20-to-60-byte IPv4 header structure: every field and its job, with a worked fragmentation example and a look at TTL and protocol.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "البنية العامة للترويسة", en: "The Header Blueprint" },
        body: {
          ar: "كل حزمة IPv4 تبدأ بترويسة يبلغ حجمها الأدنى 20 بايت، ويمكن أن تصل إلى 60 بايت عند استخدام حقل الخيارات.\n\nحقل طول الترويسة (IHL - Internet Header Length) طوله 4 بت ويقيس طول الترويسة بوحدات كلمات من 32 بت. القيمة الدنيا 5 (أي 5×32 = 160 بت = 20 بايت) والقصوى 15 (أي 15×32 = 480 بت = 60 بايت).\n\n- كلمات الترويسة الكلية = 5 كلمات ثابتة + كلمات الخيارات\n- الحقول الأساسية الثابتة تكفي تماماً 20 بايت\n- الخيارات نادرة الاستخدام عملياً اليوم (تُستخدم في تشخيص محدود مثل Record Route)",
          en: "Every IPv4 packet begins with a header of at least 20 bytes, extendable to 60 bytes when options are present.\n\nThe Internet Header Length (IHL) field is 4 bits and measures the header in 32-bit words. The minimum is 5 (5×32 = 160 bits = 20 bytes) and the maximum is 15 (15×32 = 480 bits = 60 bytes).\n\n- Total header words = 5 fixed words + option words\n- The fixed essential fields fit exactly 20 bytes\n- Options are rare today (limited diagnostics such as Record Route)",
        },
        code: {
          lang: "text",
          snippet: "IPv4 Header (32 bits wide):\n+--------+--------+----------------+------------------------------+\n| Ver(4) | IHL(4) | DSCP(6)+ECN(2)|      Total Length (16)       |\n+--------+--------+----------------+------------------------------+\n|     Identification (16)      | Flags(3)  | Fragment Off.(13) |\n+---------------+--------------+-----------------+------------+\n|   TTL (8)     | Protocol (8) |     Header Checksum (16)      |\n+---------------+--------------+------------------------------+\n|                    Source IP Address (32)                      |\n+---------------------------------------------------------------+\n|                 Destination IP Address (32)                    |\n+---------------------------------------------------------------+\n|               Options (0 - 40 bytes, if IHL > 5)              |\n+---------------------------------------------------------------+",
        },
      },
      {
        heading: { ar: "حقول التحكم الأساسية", en: "Core Control Fields" },
        table: {
          caption: { ar: "أهم حقول ترويسة IPv4", en: "Key IPv4 header fields" },
          headers: [
            { ar: "الحقل", en: "Field" },
            { ar: "الحجم", en: "Size" },
            { ar: "وظيفته", en: "Purpose" },
          ],
          rows: [
            [
              { ar: "Version + IHL", en: "Version + IHL" },
              { ar: "1 byte", en: "1 byte" },
              { ar: "الإصدار (4) وطول الترويسة بوحدات 4 بايتات", en: "Version (4) and header length in 4-byte words" },
            ],
            [
              { ar: "Total Length", en: "Total Length" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "طول الحزمة كاملاً حتى 65535 بايتاً", en: "Full packet length, up to 65535 bytes" },
            ],
            [
              { ar: "Flags + Fragment Offset", en: "Flags + Fragment Offset" },
              { ar: "3 + 13 bits", en: "3 + 13 bits" },
              { ar: "التحكم بالتفتيت وموقع الشظية", en: "Fragmentation control and shard position" },
            ],
            [
              { ar: "TTL", en: "TTL" },
              { ar: "1 byte", en: "1 byte" },
              { ar: "ينقص كل قفزة — يمنع التوهان الأبدي", en: "Decrements per hop — kills eternal loops" },
            ],
            [
              { ar: "Protocol", en: "Protocol" },
              { ar: "1 byte", en: "1 byte" },
              { ar: "من يستلم الحمولة: 6=TCP، 17=UDP، 1=ICMP", en: "Who receives the payload: 6=TCP, 17=UDP, 1=ICMP" },
            ],
            [
              { ar: "Header Checksum", en: "Header Checksum" },
              { ar: "2 bytes", en: "2 bytes" },
              { ar: "فحص سلامة الترويسة فقط — يُعاد حسابه كل قفزة", en: "Header-only integrity check — recomputed each hop" },
            ],
            [
              { ar: "Source / Destination IP", en: "Source / Destination IP" },
              { ar: "4+4 bytes", en: "4+4 bytes" },
              { ar: "العنوانان المنطقيان للطرفين", en: "The two logical endpoint addresses" },
            ],
          ],
        },
        body: {
          ar: "حقل الإصدار (Version) طوله 4 بت وقيمته 4 لـ IPv4 و 6 لـ IPv6 — أول ما يقرأه المستقبِل ليعرف صيغة الحزمة.\n\nحقل DSCP (سابقاً Type of Service) طوله 6 بت يمنح الحزم درجات أولوية لجودة الخدمة (QoS) — كأن تُعطى حزم مكالمة صوتية أولوية أعلى من تنزيل ملف.\n\nحقل الطول الكلي (Total Length) طوله 16 بت ويقيس كامل الحزمة: الترويسة + البيانات، أي 20 إلى 65,535 بايت. لاحظ أن الطول الأقصى نظرياً 65,535 بايت، لكن إيثرنت يحدّه عملياً بـ 1500 بايت (MTU).\n\n- الإصدار 4 بت: 0100 لـ IPv4\n- DSCP: 6 بت للجودة، وبتّان لـ ECN لإشعار الازدحام\n- الطول الكلي يشمل الترويسة نفسها",
          en: "The Version field is 4 bits: value 4 for IPv4 and 6 for IPv6 — the very first thing a receiver reads to identify the packet format.\n\nThe DSCP field (formerly Type of Service) is 6 bits giving packets QoS priority classes — voice call packets can be prioritized over a file download, for instance.\n\nThe Total Length field is 16 bits and measures the entire packet: header + data, i.e. 20 to 65,535 bytes. Note the theoretical maximum of 65,535 bytes, though Ethernet practically limits it to 1500 bytes (MTU).\n\n- Version: 4 bits, 0100 for IPv4\n- DSCP: 6 bits for QoS, 2 bits for ECN congestion notification\n- Total Length includes the header itself",
        },
      },
      {
        heading: { ar: "التفتيت: مثال محسوب بالأرقام", en: "Fragmentation: A Worked Numerical Example" },
        body: {
          ar: "عندما تكون الحزمة أكبر من MTU للقفزة التالية، يقوم الموجّه بتفتيتها (Fragmentation) بدل إسقاطها، إذا سمحت أعلام التفتيت بذلك.\n\nمثال محسوب: حزمة بطول كلي 4000 بايت (ترويسة 20 + بيانات 3980) تصل إلى رابط إيثرنت MTU=1500:\n\n- الشظية الأولى: 20 بايت ترويسة + 1480 بايت بيانات (الإزاحة 0 وعلم MF=1)\n- الشظية الثانية: 1480 بايت بيانات، الإزاحة 1480÷8 = 185\n- الشظية الثالثة: 1020 بايت بيانات متبقية، الإزاحة 2960÷8 = 370 وعلم MF=0\n\nلاحظ أن الإزاحة تُقاس بوحدات من 8 بايت، ولهذا يجب أن يكون حجم بيانات كل شظية (عدا الأخيرة) قابلاً للقسمة على 8 — و 1480 ÷ 8 = 185 بالضبط.\n\nالشظيات تُجمع في الوجهة النهائية فقط (وليس في الموجّهات الوسيطة) باستخدام رقم التعريف (Identification) المشترك بينها. علم DF (Don not Fragment) يمنع التفتيت فيسقط الموجّه الحزمة ويرسل ICMP Code 4 (fragmentation needed).",
          en: "When a packet exceeds the next hop MTU, the router fragments it instead of dropping it, if the flags allow.\n\nWorked example: a 4000-byte packet (20 header + 3980 data) hits an Ethernet link with MTU 1500:\n\n- Fragment 1: 20-byte header + 1480 bytes data (offset 0, MF flag = 1)\n- Fragment 2: 1480 bytes data, offset 1480÷8 = 185\n- Fragment 3: remaining 1020 bytes data, offset 2960÷8 = 370, MF = 0\n\nNote the offset counts in 8-byte units, which is why every fragment payload except the last must be divisible by 8 — and 1480 ÷ 8 = 185 exactly.\n\nFragments are reassembled only at the final destination (never at intermediate routers) using the shared Identification number. The DF (Do not Fragment) flag forbids fragmentation, so the router drops the packet and sends ICMP Code 4 (fragmentation needed).",
        },
        tip: {
          ar: "أفضل ممارسة عملية: اضبط MSS على 1460 بايت (1500 ناقص 20 لـ IP و 20 لـ TCP) لتجنب التفتيت نهائياً — التفتيت يضاعف احتمالية فقدان الحزمة لأن فقدان شظية واحدة يُهدر الحزمة كلها.",
          en: "Best practice: set MSS to 1460 bytes (1500 minus 20 for IP and 20 for TCP) to avoid fragmentation entirely — losing one fragment wastes the whole packet, doubling loss impact.",
        },
      },
      {
        heading: { ar: "TTL والبروتوكول والترويسة أختصر", en: "TTL, Protocol, and the Checksum" },
        body: {
          ar: "حقل TTL طوله 8 بت: كل موجّه ينقصه واحداً، وعند بلوغه صفراً تُهدر الحزمة ويُرسل ICMP Time Exceeded. القيم الشائعة 64 (لينكس/ماك) و 128 (ويندوز) و 255 (بعض الموجّهات).\n\nحقل البروتوكول (Protocol) طوله 8 بت يحدد من يستلم بيانات الحزمة في الطبقة الأعلى:\n\n- 1 = ICMP — رسائل التشخيص مثل ping\n- 6 = TCP — النقل الموثوق\n- 17 = UDP — النقل السريع\n- 89 = OSPF و 47 = GRE — أمثلة بروتوكولات أخرى\n\nأما مجموع التحقق (Header Checksum) فيحمي الترويسة فقط لا البيانات، ويُعاد حسابه عند كل موجّه لأن TTL يتغير — وهذا أحد أسباب إلغائه في IPv6 لتحسين الأداء.",
          en: "The TTL field is 8 bits: every router decrements it by one, and on reaching zero the packet is dropped with an ICMP Time Exceeded. Common values are 64 (Linux/macOS), 128 (Windows), and 255 (some routers).\n\nThe Protocol field is 8 bits identifying which upper-layer protocol owns the payload:\n\n- 1 = ICMP — diagnostic messages like ping\n- 6 = TCP — reliable transport\n- 17 = UDP — fast transport\n- 89 = OSPF and 47 = GRE — examples of other protocols\n\nThe Header Checksum protects the header only, not the data, and is recomputed at every router because TTL changes — one reason IPv6 removed it for performance.",
        },
      },
      {
        heading: { ar: "العنوانان والخيارات", en: "The Two Addresses and Options" },
        body: {
          ar: "الحقلان الأهم في الترويسة: عنوان المصدر وعنوان الوجهة، كل منهما 32 بت (4 بايت) — ولهذا نكتب IPv4 كأربع خانات عشرية (كل خانة = بايت واحد من 0 إلى 255).\n\nهذان الحقلان هما محور عملية التوجيه: كل موجّه في طريقك يبحث عن عنوان الوجهة في جدوله، والعنوانان يبقيان ثابتين طوال الرحلة في حالة IPv4 النقية.\n\nحقل الخيارات (Options) يصل إلى 40 بايت واختياري بالكامل. أشهر استخداماته تاريخية وتشخيصية: تسجيل المسار (Record Route) وتحديد المصدر (Source Route). وجوده يسبب مشكلتين: يفرض إعادة محاذاة الحزمة عند المعالجات الحديثة ويبطئ المسار السريع في الموجّهات.\n\n- عنوان المصدر: 32 بت يقرأه الوجهة للرد\n- عنوان الوجهة: 32 بت يقرأه كل موجّه في الطريق\n- الخيارات: نادراً ما تراها في حركة الإنترنت الواقعية",
          en: "The two most important fields: Source Address and Destination Address, each 32 bits (4 bytes) — which is why IPv4 is written as four decimal octets (each octet = one byte, 0 to 255).\n\nThese two fields are the heart of routing: every router on the path looks up the destination address in its table, and both addresses remain constant for the whole journey in pure IPv4.\n\nThe Options field spans up to 40 bytes and is fully optional. Its uses are historical and diagnostic: Record Route and Source Route. Its presence causes two problems: it forces realignment on modern CPUs and slows the fast path in routers.\n\n- Source address: 32 bits, read by the destination to reply\n- Destination address: 32 bits, read by every router en route\n- Options: rarely seen in real Internet traffic",
        },
        tip: {
          ar: "افتح Wireshark والتقط أي حزمة IP وانقر IPv4 في لوحة التفاصيل: سترى كل حقل من هذه الحقول منفصلاً بأسمائه وقيمه — أفضل طريقة لترسيخ هذا الدرس.",
          en: "Open Wireshark, capture any IP packet, and click IPv4 in the detail pane: you will see every one of these fields with names and values — the best way to anchor this lesson.",
        },
      },
    ],
    keyPoints: [
      { ar: "ترويسة IPv4 بين 20 و 60 بايت، وحقل IHL يقيسها بوحدات كلمات 32 بت", en: "The IPv4 header is 20 to 60 bytes; IHL measures it in 32-bit words" },
      { ar: "التفتيت: الإزاحة بوحدات 8 بايت، والشظية الأولى تحمل علم MF وبياناتها تقبل القسمة على 8", en: "Fragmentation: offsets in 8-byte units; non-final fragments carry MF and payload divisible by 8" },
      { ar: "TTL ينقص عند كل موجّه؛ قيم بروتوكول: ICMP=1 و TCP=6 و UDP=17", en: "TTL decrements per router; protocol values: ICMP=1, TCP=6, UDP=17" },
      { ar: "مجموع تحقق IPv4 يحمي الترويسة فقط ويُعاد حسابه عند كل قفزة — حُذف في IPv6", en: "The IPv4 checksum covers the header only and is recomputed per hop — removed in IPv6" },
      { ar: "المثال المحسوب: حزمة 4000 بايت على MTU 1500 تُفتت إلى شظيات 1480 و 1480 و 1020 بايت", en: "Worked example: a 4000-byte packet over MTU 1500 fragments into 1480, 1480, and 1020-byte payloads" },
    ],
    commands: [
      { cmd: "ping -M do -s 1472 8.8.8.8", desc: { ar: "اختبار MTU على لينكس: يمنع التفتيت بحجم بيانات 1472 (1500-28)، لو فشل فالمسار أصغر", en: "Test path MTU on Linux: forbids fragmentation with 1472 payload bytes (1500-28); failure means a smaller path MTU" } },
      { cmd: "sudo tcpdump -n -v ip and host 8.8.8.8", desc: { ar: "عرض حقول ترويسة IP (TTL، الطول، المعرف) مباشرة في الطرفية", en: "Print IP header fields (TTL, length, ID) right in the terminal" } },
      { cmd: "ping 8.8.8.8 -i 3", desc: { ar: "تعيين TTL بقيمة 3 لرؤية أي موجّه يُرجع ICMP Time Exceeded", en: "Set TTL to 3 and see which router returns ICMP Time Exceeded" } },
    ],
    quiz: [
      {
        q: { ar: "حزمة IPv4 ترويستها 60 بايت. ما قيمة حقل IHL؟", en: "An IPv4 packet has a 60-byte header. What is the IHL value?" },
        options: [
          { ar: "15", en: "15" },
          { ar: "30", en: "30" },
          { ar: "60", en: "60" },
          { ar: "1500", en: "1500" },
        ],
        correct: 0,
        explain: { ar: "IHL يقيس بوحدات كلمات 32 بت: 60 بايت = 480 بت ÷ 32 = 15 كلمة، وهي القيمة القصوى المسموحة لحقل من 4 بت (0-15).", en: "IHL counts 32-bit words: 60 bytes = 480 bits ÷ 32 = 15 words — the maximum a 4-bit field (0-15) allows." },
      },
      {
        q: { ar: "شظية تفتيت إزاحتها 185 ووحدتها 8 بايت. أين يبدأ موضع بياناتها من بداية بيانات الحزمة الأصلية؟", en: "A fragment has offset 185 in 8-byte units. Where does its data begin within the original payload?" },
        options: [
          { ar: "البايت 185", en: "Byte 185" },
          { ar: "البايت 925", en: "Byte 925" },
          { ar: "البايت 1480", en: "Byte 1480" },
          { ar: "البايت 370", en: "Byte 370" },
        ],
        correct: 2,
        explain: { ar: "الإزاحة 185 × 8 بايت = 1480، أي أن بيانات هذه الشظية تبدأ بعد أول 1480 بايت من بيانات الحزمة الأصلية — وهذا يطابق مثالنا في الدرس.", en: "Offset 185 × 8 bytes = 1480, so this fragment starts after the first 1480 bytes of original payload — matching our worked example." },
      },
      {
        q: { ar: "ماذا يحدث لحزمة تحمل علم DF وحجمها أكبر من MTU القفزة التالية؟", en: "What happens to a packet carrying the DF flag that exceeds the next hop MTU?" },
        options: [
          { ar: "تُفتت إلى شظيات أصغر", en: "It is fragmented into smaller pieces" },
          { ar: "تُهدر ويُرسل ICMP يفيد الحاجة للتفتيت", en: "It is dropped and an ICMP message reports fragmentation needed" },
          { ar: "تنتظر في مخزن الموجّه حتى يتوفر مسار أوسع", en: "It waits in the router buffer until a wider path is available" },
          { ar: "تُرسل كاملة وتتجاهل MTU", en: "It is sent whole, ignoring the MTU" },
        ],
        correct: 1,
        explain: { ar: "علم Don't Fragment يمنع الموجّه من التفتيت، فيسقط الحزمة ويرسل ICMP Destination Unreachable مع الكود 4 ليعرف المصدر أن عليه تصغير حزمه (هذا أساس اكتشاف PMTUD).", en: "The Don't Fragment flag forbids the router from fragmenting, so it drops the packet and sends ICMP Destination Unreachable code 4, telling the source to shrink its packets (the basis of PMTUD)." },
      },
      {
        q: { ar: "أي بروتوكول طبقة أعلى يمثل الرقم 6 في حقل Protocol؟", en: "Which upper-layer protocol does the value 6 in the Protocol field represent?" },
        options: [
          { ar: "ICMP", en: "ICMP" },
          { ar: "UDP", en: "UDP" },
          { ar: "TCP", en: "TCP" },
          { ar: "OSPF", en: "OSPF" },
        ],
        correct: 2,
        explain: { ar: "الأرقام الرسمية من IANA: ICMP=1 و TCP=6 و UDP=17 و OSPF=89. هذا الحقل يخبر المستقبِل كيف يسلّم البيانات للطبقة الأعلى.", en: "Official IANA numbers: ICMP=1, TCP=6, UDP=17, OSPF=89. This field tells the receiver how to hand data up the stack." },
      },
    ],
  },
  {
    id: "l043",
    moduleId: "m05",
    order: 3,
    level: "intermediate",
    title: { ar: "فئات IPv4 التاريخية والنطاقات الخاصة", en: "IPv4 Classes (Historical) & Special Ranges" },
    summary: {
      ar: "التمثيل الثنائي لعناوين IPv4، والفئات A/B/C/D/E كما وُلدت تاريخياً، ثم النطاقات الخاصة الخاصة بـ RFC 1918 التي تبني عليها كل الشبكات اليوم.",
      en: "The binary representation of IPv4, the historical A/B/C/D/E classes, and the RFC 1918 private ranges every real network is built on today.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "قراءة العنوان ثنائياً: اللغة الأصلية للحواسيب", en: "Reading the Address in Binary: The Native Language of Machines" },
        body: {
          ar: "عنوان IPv4 هو رقم ثنائي من 32 بت مقسّم إلى أربع خانات (Octets) كل منها 8 بت، ونكتبها بالعشري ليسهل علينا نطقها.\n\nكل خانة لها أوزان ثنائية من اليسار لليمين: 128، 64، 32، 16، 8، 4، 2، 1. لتحويل خانة ثنائية إلى عشرية: اجمع أوزان البتات المضبوطة على 1.\n\nمثال: الخانة 11000010 = 128 + 64 + 0 + 0 + 0 + 0 + 2 + 0 = 194.\n\n- إتقان هذه الأوزان الثمانية شرط إلزامي لإتقان التقسيم الفرعي لاحقاً\n- أكبر قيمة للخانة: 11111111 = 255\n- أصغر قيمة: 00000000 = 0\n\nاحفظ جدول الأوزان هذا غيباً: 128-64-32-16-8-4-2-1 — سيوفر عليك ساعات في الدروس القادمة.",
          en: "An IPv4 address is a 32-bit binary number split into four octets of 8 bits each, written in decimal so humans can pronounce it.\n\nEach octet has positional weights from left to right: 128, 64, 32, 16, 8, 4, 2, 1. To convert a binary octet to decimal: sum the weights of the bits set to 1.\n\nExample: the octet 11000010 = 128 + 64 + 0 + 0 + 0 + 0 + 2 + 0 = 194.\n\n- Mastering these eight weights is mandatory for subnetting mastery later\n- Largest octet value: 11111111 = 255\n- Smallest: 00000000 = 0\n\nMemorize this weight table: 128-64-32-16-8-4-2-1 — it will save you hours in upcoming lessons.",
        },
        code: {
          lang: "text",
          snippet: "Octet weights:   128  64  32  16  8  4  2  1\n\nExample 192:     1    1   0   0   0  0  0  0   = 128+64 = 192\nExample 168:     1    0   1   0   1  0  0  0   = 128+32+8 = 168\nExample 10:      0    0   0   0   1  0  1  0   = 8+2 = 10\nExample 194:     1    1   0   0   0  0  1  0   = 128+64+2 = 194",
        },
      },
      {
        heading: { ar: "الفئات الخمس كما صممت أصلاً", en: "The Five Classes as Originally Designed" },
        table: {
          caption: { ar: "فئات IPv4 التاريخية", en: "The historical IPv4 classes" },
          headers: [
            { ar: "الفئة", en: "Class" },
            { ar: "مدى البايت الأول", en: "First-octet range" },
            { ar: "القناع الافتراضي", en: "Default mask" },
            { ar: "الاستخدام المخصص", en: "Intended use" },
          ],
          rows: [
            [
              { ar: "A", en: "A" },
              { ar: "1 - 126", en: "1 - 126" },
              { ar: "/8 (255.0.0.0)", en: "/8 (255.0.0.0)" },
              { ar: "شبكات ضخمة (16.7 مليون عنوان)", en: "Huge networks (16.7M addresses)" },
            ],
            [
              { ar: "B", en: "B" },
              { ar: "128 - 191", en: "128 - 191" },
              { ar: "/16 (255.255.0.0)", en: "/16 (255.255.0.0)" },
              { ar: "مؤسسات متوسطة (65 ألف عنوان)", en: "Medium organizations (65K addresses)" },
            ],
            [
              { ar: "C", en: "C" },
              { ar: "192 - 223", en: "192 - 223" },
              { ar: "/24 (255.255.255.0)", en: "/24 (255.255.255.0)" },
              { ar: "شبكات صغيرة (254 مضيفاً)", en: "Small networks (254 hosts)" },
            ],
            [
              { ar: "D", en: "D" },
              { ar: "224 - 239", en: "224 - 239" },
              { ar: "—", en: "—" },
              { ar: "البث المتعدد Multicast", en: "Multicast" },
            ],
            [
              { ar: "E", en: "E" },
              { ar: "240 - 255", en: "240 - 255" },
              { ar: "—", en: "—" },
              { ar: "تجريبي محجوز", en: "Experimental, reserved" },
            ],
          ],
        },
        body: {
          ar: "في التصميم الأصلي (Classful) قُسم فضاء العناوين إلى فئات حسب البتات الأولى من الخانة الأولى، لتحديد قناع افتراضي بلا كتابته صراحة:\n\n- الفئة A: أول بت 0 — المدى 1.0.0.0 إلى 126.255.255.255 — قناع /8 (255.0.0.0) — 16,777,214 مضيفاً لكل شبكة\n- الفئة B: أول بتين 10 — المدى 128.0.0.0 إلى 191.255.255.255 — قناع /16 (255.255.0.0) — 65,534 مضيفاً\n- الفئة C: أول ثلاثة بتات 110 — المدى 192.0.0.0 إلى 223.255.255.255 — قناع /24 (255.255.255.0) — 254 مضيفاً\n- الفئة D: 1110 — 224.0.0.0 إلى 239.255.255.255 — للبث المتعدد (Multicast) وليس للأجهزة\n- الفئة E: 1111 — 240.0.0.0 إلى 255.255.255.255 — تجريبية محجوزة\n\nلاحظ الفجوة: 127.x.x.x ليست فئة A عادية بل نطاق الاختبار العكسي (Loopback) — عنوان 127.0.0.1 يعني أنا نفسي.",
          en: "In the original classful design, the address space was split into classes based on the leading bits of the first octet, giving each an implied default mask:\n\n- Class A: first bit 0 — range 1.0.0.0 to 126.255.255.255 — mask /8 (255.0.0.0) — 16,777,214 hosts per network\n- Class B: first two bits 10 — range 128.0.0.0 to 191.255.255.255 — mask /16 (255.255.0.0) — 65,534 hosts\n- Class C: first three bits 110 — range 192.0.0.0 to 223.255.255.255 — mask /24 (255.255.255.0) — 254 hosts\n- Class D: 1110 — 224.0.0.0 to 239.255.255.255 — multicast, not for hosts\n- Class E: 1111 — 240.0.0.0 to 255.255.255.255 — experimental, reserved\n\nNote the gap: 127.x.x.x is not a normal Class A but the loopback range — 127.0.0.1 means myself.",
        },
        tip: {
          ar: "حيلة حفظ حدود الفئات: 128 و 192 (نصف + ربع 256): A تنتهي عند 126، B عند 191، C عند 223. الرقم 127 محجوز للـ Loopback دائماً.",
          en: "Memory hook for class boundaries: 128 and 192 (half + quarter of 256): A ends at 126, B at 191, C at 223. The number 127 is always reserved for loopback.",
        },
      },
      {
        heading: { ar: "النطاقات الخاصة RFC 1918: قلب شبكات اليوم", en: "RFC 1918 Private Ranges: The Heart of Modern Networks" },
        table: {
          caption: { ar: "النطاقات الخاصة والخاصة الأخرى التي تحفظها", en: "Private and other special ranges to memorize" },
          headers: [
            { ar: "النطاق", en: "Range" },
            { ar: "النوع", en: "Type" },
            { ar: "الملاحظة العملية", en: "Practical note" },
          ],
          rows: [
            [
              { ar: "10.0.0.0/8", en: "10.0.0.0/8" },
              { ar: "خاص — كبير", en: "Private — large" },
              { ar: "المؤسسات والمراكز الكبيرة", en: "Enterprises and large campuses" },
            ],
            [
              { ar: "172.16.0.0/12", en: "172.16.0.0/12" },
              { ar: "خاص — متوسط", en: "Private — medium" },
              { ar: "من 172.16 حتى 172.31", en: "From 172.16 through 172.31" },
            ],
            [
              { ar: "192.168.0.0/16", en: "192.168.0.0/16" },
              { ar: "خاص — صغير", en: "Private — small" },
              { ar: "المنازل والمعامل وكل راوتر منزلي", en: "Homes, labs, and every home router" },
            ],
            [
              { ar: "127.0.0.0/8", en: "127.0.0.0/8" },
              { ar: "Loopback", en: "Loopback" },
              { ar: "اختبار الحزمة داخلياً — 127.0.0.1", en: "Internal stack testing — 127.0.0.1" },
            ],
            [
              { ar: "169.254.0.0/16", en: "169.254.0.0/16" },
              { ar: "APIPA", en: "APIPA" },
              { ar: "علامة فشل DHCP — لا تدخلها في التصميم", en: "A DHCP failure flag — never design with it" },
            ],
            [
              { ar: "100.64.0.0/10", en: "100.64.0.0/10" },
              { ar: "CGNAT", en: "CGNAT" },
              { ar: "ترجمة مشتركة لدى المشغلين", en: "Carrier-grade shared NAT space" },
            ],
          ],
        },
        body: {
          ar: "عند اقتراب نفاد العناوين العامة، عرّف المعيار RFC 1918 ثلاث كتل للاستخدام الخاص داخل أي شبكة، ولا يجوز توجيهها في الإنترنت العام أبداً:\n\n- 10.0.0.0/8 : من 10.0.0.0 إلى 10.255.255.255 — 16,777,216 عنواناً — للشركات الكبيرة\n- 172.16.0.0/12 : من 172.16.0.0 إلى 172.31.255.255 — 1,048,576 عنواناً — للمتوسطة\n- 192.168.0.0/16 : من 192.168.0.0 إلى 192.168.255.255 — 65,536 عنواناً — للمنازل والصغيرة\n\nكل هذه العناوين تخرج للإنترنت عبر NAT (درس قادم)، ولهذا يمكن لملايين المنازل استخدام 192.168.1.0/24 نفسها دون تعارض.\n\nانتبه لخطأ شائع: النطاق الخاص الثاني هو 172.16 حتى 172.31 فقط — فـ 172.32.0.0 ليس خاصاً، و 172.15 كذلك ليس خاصاً.",
          en: "Facing public address exhaustion, RFC 1918 defined three blocks for private use inside any network, which must never be routed on the public Internet:\n\n- 10.0.0.0/8 : 10.0.0.0 to 10.255.255.255 — 16,777,216 addresses — for large enterprises\n- 172.16.0.0/12 : 172.16.0.0 to 172.31.255.255 — 1,048,576 addresses — for medium ones\n- 192.168.0.0/16 : 192.168.0.0 to 192.168.255.255 — 65,536 addresses — for homes and small offices\n\nAll of these reach the Internet through NAT (an upcoming lesson), which is why millions of homes can reuse the same 192.168.1.0/24 without conflict.\n\nBeware a common trap: the second private range is only 172.16 through 172.31 — 172.32.0.0 is not private, and neither is 172.15.",
        },
        code: {
          lang: "text",
          snippet: "Range              CIDR              Usable hosts      Typical use\n10.0.0.0/8         10.0.0.0/8        16,777,214        Enterprise / ISPs\n172.16.0.0/12      172.16-172.31     1,048,574         Mid-size networks\n192.168.0.0/16     192.168.x.x       65,534            Home / small office\n\nSpecial:\n127.0.0.0/8        loopback (127.0.0.1 = localhost)\n169.254.0.0/16     link-local / APIPA (automatic fallback)\n100.64.0.0/10      CGNAT (carrier-grade NAT)\n0.0.0.0            unspecified / default route\n255.255.255.255    limited broadcast",
        },
      },
      {
        heading: { ar: "عنوان APIPA: علامة استفهام على شبكتك", en: "APIPA: The Question Mark on Your Network" },
        body: {
          ar: "إذا رأيت جهازك يحمل عنواناً من 169.254.x.x فهذا ليس عطاء DHCP، بل عنوان ربط محلي (Link-Local) تولّده الأجهزة تلقائياً (APIPA في ويندوز) عندما تفشل في الوصول إلى خادم DHCP.\n\nهذا العنوان يعمل فقط على القسم المحلي، ومعناه العملي عند استكشاف الأخطاء: جهازك متصل بالشبكة فيزيائياً لكنه لم يستلم إعدادات IP — فابحث عن: خادم DHCP معطّل، أو كابل إلى VLAN خاطئة، أو استنفاد المجال في الخادم.\n\n- 169.254.0.0/16 محجوز لهذا الغرض تحديداً في RFC 3927\n- لا يُوجَّه عبر أي موجّه\n- رؤيته تشخيص فوري: طبقة 1/2 سليمة غالباً، و DHCP هو المشكلة",
          en: "If your device shows an address in 169.254.x.x, that is not a DHCP gift — it is a link-local address devices generate automatically (APIPA on Windows) when they fail to reach a DHCP server.\n\nIt works only on the local segment, and its practical troubleshooting meaning: your device is physically connected but received no IP settings — so check for a dead DHCP server, a cable landing in the wrong VLAN, or an exhausted scope.\n\n- 169.254.0.0/16 is reserved for exactly this purpose in RFC 3927\n- It is never routed across any router\n- Seeing it is an instant diagnosis: Layers 1/2 are likely fine; DHCP is the problem",
        },
        tip: {
          ar: "عند فشل DHCP في ويندوز جرّب: ipconfig /release ثم ipconfig /renew — إن عاد 169.254 فالمشكلة في الخادم أو المسار إليه لا في جهازك.",
          en: "When DHCP fails on Windows try: ipconfig /release then ipconfig /renew — if 169.254 returns, the problem is the server or the path to it, not your device.",
        },
      },
      {
        heading: { ar: "لماذا ندرس فئات ماتت؟", en: "Why Study Dead Classes?" },
        body: {
          ar: "النظام الطبقي (Classful) انتهى عملياً في 1993 مع ظهور CIDR الذي يسمح بقناع عند أي بت — سندرسه بعد درسين. فلماذا نستذكر الفئات؟\n\n- لأن المصطلحات باقية: ما زلنا نقول شبكة من الفئة C نقصد /24 تقريباً\n- لأن الأدوات القديمة والأسئلة المقابلات تستخدمها\n- لأن النطاقات الخاصة الثلاثة بُنيت على حدود الفئات\n- لأن فهم التطور يشرح لماذا صُمم CIDR أصلاً: هدر هائل — فئة A واحدة كافية لشركة فيها مئة جهاز فقط، و 16 مليون عنوان تُهدر\n\nالخلاصة العملية: الفئات تاريخ يفهم، و CIDR هو الحاضر الذي نعمل به.",
          en: "The classful system effectively died in 1993 with CIDR, which allows a mask at any bit — we cover it two lessons ahead. So why recall the classes?\n\n- The vocabulary persists: people still say a Class C network meaning roughly a /24\n- Legacy tools and interview questions use the terms\n- The three private ranges were built on class boundaries\n- Understanding the evolution explains why CIDR exists: colossal waste — one Class A held 16 million addresses for a company with a hundred devices\n\nPractical takeaway: classes are history to understand; CIDR is the present we work in.",
        },
      },
    ],
    keyPoints: [
      { ar: "عنوان IPv4 = 32 بت = 4 خانات؛ أوزان الخانة: 128-64-32-16-8-4-2-1", en: "IPv4 = 32 bits = 4 octets; octet weights: 128-64-32-16-8-4-2-1" },
      { ar: "الفئات: A من 1-126 بـ /8، B من 128-191 بـ /16، C من 192-223 بـ /24", en: "Classes: A 1-126 with /8, B 128-191 with /16, C 192-223 with /24" },
      { ar: "D (224-239) للبث المتعدد و E (240-255) تجريبية، و 127 نطاق الاختبار العكسي", en: "D (224-239) is multicast, E (240-255) experimental, and 127 is loopback" },
      { ar: "الخاص: 10.0.0.0/8 و 172.16.0.0/12 و 192.168.0.0/16 — لا تُوجَّه في الإنترنت", en: "Private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — never routed on the Internet" },
      { ar: "169.254.0.0/16 = APIPA: يعني فشل DHCP وليس اتصالاً سليماً", en: "169.254.0.0/16 = APIPA: it means DHCP failure, not healthy connectivity" },
    ],
    commands: [
      { cmd: "ipconfig /all", desc: { ar: "تحقق من عنوانك: هل هو خاص؟ هل هو 169.254 (فشل DHCP)؟", en: "Check your address: is it private? Is it 169.254 (DHCP failure)?" } },
      { cmd: "ip -4 addr show", desc: { ar: "عرض عناوين IPv4 على لينكس مع نطاق كل عنوان", en: "Show IPv4 addresses on Linux with each address scope" } },
      { cmd: "whois 8.8.8.8", desc: { ar: "استعلام WHOIS لمعرفة من يملك عنواناً عاماً وكيف تُدار الكتل", en: "Query WHOIS to see who owns a public address and how blocks are managed" } },
    ],
    quiz: [
      {
        q: { ar: "العنوان 172.20.50.7 ينتمي إلى:", en: "The address 172.20.50.7 belongs to:" },
        options: [
          { ar: "نطاق عام قابل للتوجيه في الإنترنت", en: "A public, Internet-routable range" },
          { ar: "نطاق RFC 1918 الخاص", en: "The RFC 1918 private range" },
          { ar: "نطاق البث المتعدد", en: "The multicast range" },
          { ar: "نطاق APIPA للربط المحلي", en: "The APIPA link-local range" },
        ],
        correct: 1,
        explain: { ar: "النطاق الخاص الثاني هو 172.16.0.0/12 أي من 172.16.0.0 إلى 172.31.255.255، و 172.20 يقع داخله. أما 172.32 وما بعده فعام.", en: "The second private range is 172.16.0.0/12 spanning 172.16.0.0 to 172.31.255.255, and 172.20 falls inside it. 172.32 and beyond are public." },
      },
      {
        q: { ar: "جهاز يحمل 169.254.100.20. ما الاستنتاج الصحيح؟", en: "A device holds 169.254.100.20. What is the correct conclusion?" },
        options: [
          { ar: "اتصال إنترنت سليم عبر DHCP", en: "Healthy Internet connectivity via DHCP" },
          { ar: "عنوان عام من فئة A", en: "A public Class A address" },
          { ar: "فشل الحصول على عنوان من DHCP وتوليد عنوان ربط محلي تلقائي", en: "DHCP failed and a link-local address was self-generated" },
          { ar: "عنوان بث متعدد لخدمة الترجمة", en: "A multicast address for a discovery service" },
        ],
        correct: 2,
        explain: { ar: "169.254.0.0/16 نطاق ربط محلي (APIPA): يظهر عندما تفشل عملية DHCP. الجهاز يتصل بالقسم المحلي فقط ولا يصل الإنترنت.", en: "169.254.0.0/16 is the link-local (APIPA) range: it appears when DHCP fails. The device can talk only on the local segment, not the Internet." },
      },
      {
        q: { ar: "أي عنوان لا يصح تعيينه لمضيف أبداً؟", en: "Which address can never be assigned to a host?" },
        options: [
          { ar: "10.200.1.1", en: "10.200.1.1" },
          { ar: "192.168.50.20", en: "192.168.50.20" },
          { ar: "172.18.0.1", en: "172.18.0.1" },
          { ar: "224.0.0.5", en: "224.0.0.5" },
        ],
        correct: 3,
        explain: { ar: "224.0.0.5 عنوان بث متعدد (فئة D) يخصص لبروتوكول OSPF تحديداً، وعناوين فئة D لا تُمنح للمضيفين بل تُشترك فيها عمليات بث متعدد.", en: "224.0.0.5 is a Class D multicast address reserved specifically for OSPF; Class D addresses are joined by multicast processes, never assigned to hosts." },
      },
    ],
  },
  {
    id: "l044",
    moduleId: "m05",
    order: 4,
    level: "intermediate",
    title: { ar: "قناع الشبكة وعملية AND الثنائية", en: "Subnet Masks & the Binary AND Operation" },
    summary: {
      ar: "كيف يفصل القناع جزء الشبكة عن جزء المضيف، وجدول البادئات الشائعة بالأرقام، ومثال AND ثنائي كامل يشرح كيف يعرف جهازك شبكته الحقيقية.",
      en: "How the mask separates the network part from the host part, the common prefixes by the numbers, and a full binary AND example showing how your device knows its real network.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "ماذا يفعل القناع بالضبط؟", en: "What Does the Mask Actually Do?" },
        body: {
          ar: "قناع الشبكة الفرعية (Subnet Mask) رقم من 32 بت يُلبس العنوان ليحتفل جزءاه: البتات المضبوطة على 1 تُعرّف جزء الشبكة (Network Portion)، والبتات المضبوطة على 0 تُعرّف جزء المضيف (Host Portion).\n\nشرط تصميمي صارم: البتات الآحادية يجب أن تكون متجاورة ومتصلة من اليسار — قناع مثل 255.0.255.0 غير قانوني لأنه يكسر التفصيل المتصل، وبالتالي لا يوجد له مسار تمثيل بـ CIDR بسيط.\n\nنكتب القناع بطريقتين متكافئتين:\n\n- الصيغة العشرية المنقطة: 255.255.255.192\n- صيغة CIDR (Slash): /26 — يقال عدد البتات الآحادية مباشرة\n\nالرابط بينهما: 26 بتاً آحادياً = 24 بتاً (ثلاث خانات 255) + بتان إضافيان في الخانة الرابعة، والبتان مع وزنيهما 128+64 = 192.",
          en: "A subnet mask is a 32-bit number worn over the address to separate its two parts: bits set to 1 define the network portion, bits set to 0 define the host portion.\n\nA strict design rule: the 1-bits must be contiguous from the left — a mask like 255.0.255.0 is illegal because it breaks contiguity, hence has no simple CIDR representation.\n\nWe write masks two equivalent ways:\n\n- Dotted decimal: 255.255.255.192\n- CIDR (slash) notation: /26 — literally the count of 1-bits\n\nThe link: 26 one-bits = 24 bits (three 255 octets) + 2 extra bits in the fourth octet, and those two bits with weights 128+64 = 192.",
        },
      },
      {
        heading: { ar: "جدول البادئات التي ستحفظه مدى الحياة", en: "The Prefix Table You Will Keep for Life" },
        table: {
          caption: { ar: "جدول CIDR والمضيفين لكل قناع", en: "The CIDR table and hosts per mask" },
          headers: [
            { ar: "CIDR", en: "CIDR" },
            { ar: "القناع", en: "Mask" },
            { ar: "حجم الكتلة", en: "Block size" },
            { ar: "المضيفون الصالحون", en: "Usable hosts" },
          ],
          rows: [
            [
              { ar: "/24", en: "/24" },
              { ar: "255.255.255.0", en: "255.255.255.0" },
              { ar: "256", en: "256" },
              { ar: "254", en: "254" },
            ],
            [
              { ar: "/25", en: "/25" },
              { ar: "255.255.255.128", en: "255.255.255.128" },
              { ar: "128", en: "128" },
              { ar: "126", en: "126" },
            ],
            [
              { ar: "/26", en: "/26" },
              { ar: "255.255.255.192", en: "255.255.255.192" },
              { ar: "64", en: "64" },
              { ar: "62", en: "62" },
            ],
            [
              { ar: "/27", en: "/27" },
              { ar: "255.255.255.224", en: "255.255.255.224" },
              { ar: "32", en: "32" },
              { ar: "30", en: "30" },
            ],
            [
              { ar: "/28", en: "/28" },
              { ar: "255.255.255.240", en: "255.255.255.240" },
              { ar: "16", en: "16" },
              { ar: "14", en: "14" },
            ],
            [
              { ar: "/29", en: "/29" },
              { ar: "255.255.255.248", en: "255.255.255.248" },
              { ar: "8", en: "8" },
              { ar: "6", en: "6" },
            ],
            [
              { ar: "/30", en: "/30" },
              { ar: "255.255.255.252", en: "255.255.255.252" },
              { ar: "4", en: "4" },
              { ar: "2 — وصلات WAN نقطية", en: "2 — point-to-point WAN links" },
            ],
          ],
        },
        body: {
          ar: "عدد المضيفين القابل للاستخدام في أي شبكة = 2^(عدد بتات المضيف) - 2، لأننا نطرح عنوانين مقدسيين: عنوان الشبكة نفسها (كل بتات المضيف صفر) وعنوان البث (كل بتات المضيف واحد).\n\nاحفظ هذا الجدول من القلب — إنه جهاز الحاسبة الذي ستحمله في رأسك:\n\n- /24: 8 بتات مضيف → 256-2 = 254 مضيفاً (الشبكة المنزلية الكلاسيكية)\n- /25: 7 بتات → 128-2 = 126\n- /26: 6 بتات → 64-2 = 62\n- /27: 5 بتات → 32-2 = 30\n- /28: 4 بتات → 16-2 = 14\n- /30: بتان → 4-2 = 2 (روابط WAN حصراً)\n\nلاحظ النمط الجميل: كل بت تستلفه من المضيفين يضاعف عدد الشبكات الفرعية ويقسم عدد المضيفين تقريباً إلى النصف.",
          en: "Usable hosts in any network = 2^(host bits) - 2, because we subtract two sacred addresses: the network address itself (all host bits zero) and the broadcast address (all host bits one).\n\nMemorize this table by heart — it is the calculator you will carry in your head:\n\n- /24: 8 host bits → 256-2 = 254 hosts (the classic home network)\n- /25: 7 bits → 128-2 = 126\n- /26: 6 bits → 64-2 = 62\n- /27: 5 bits → 32-2 = 30\n- /28: 4 bits → 16-2 = 14\n- /30: 2 bits → 4-2 = 2 (WAN links only)\n\nNotice the elegant pattern: every bit borrowed from hosts doubles the subnet count and nearly halves the host count.",
        },
        code: {
          lang: "text",
          snippet: "Prefix   Mask             Host bits   Hosts (usable)\n/8       255.0.0.0        24          16,777,214\n/16      255.255.0.0      16          65,534\n/24      255.255.255.0    8           254\n/25      255.255.255.128  7           126\n/26      255.255.255.192  6           62\n/27      255.255.255.224  5           30\n/28      255.255.255.240  4           14\n/29      255.255.255.248  3           6\n/30      255.255.255.252  2           2\n/31      255.255.255.254  1           2* (RFC 3021 p2p links)\n/32      255.255.255.255  0           host route (1 address)",
        },
        tip: {
          ar: "/31 (255.255.255.254) استثناء حديث من RFC 3021: رابطان نقطيان بلا عنوان شبكة ولا بث — يوفر عنوانين لكل رابط WAN. و /32 ليس شبكة بل مسار مضيف واحد.",
          en: "/31 (255.255.255.254) is a modern exception from RFC 3021: point-to-point links with no network or broadcast address — saving two addresses per WAN link. And /32 is not a network but a single host route.",
        },
      },
      {
        heading: { ar: "عملية AND: كيف يعرف جهازك شبكته؟", en: "The AND Operation: How Your Device Knows Its Network" },
        diagram: {
          kind: "flow",
          title: { ar: "خطوات تحديد الشبكة بالقناع", en: "Deriving the network with the mask" },
          items: [
            { ar: "اكتب العنوان والقناع بصيغة ثنائية 32 بتاً", en: "Write the address and mask as 32 binary bits" },
            { ar: "طبّق عملية AND بتاً مقابل بت", en: "AND them bit by bit" },
            { ar: "الناتج هو عنوان الشبكة", en: "The result is the network address" },
            { ar: "كرر العملية مع وجهة الرحلة", en: "Repeat the operation for the trip's destination" },
            { ar: "نفس الشبكة؟ أرسل مباشرة — وإلا فإلى البوابة", en: "Same network? Send direct — otherwise, to the gateway" },
          ],
        },
        body: {
          ar: "كل جهاز يجري عملية منطقية بسيطة عند كل إرسال: AND بين عنوانه وعنوان الوجهة مع قناعه، والنتيجتان تحددان إن كان الوجهة في شبكته أم لا.\n\nقاعدة AND: الناتج 1 فقط إذا كان المدخلان 1، وغير ذلك صفر. مثال محسوب كامل — العنوان 192.168.10.75 مع القناع /26 (255.255.255.192):\n\nانظر المثال الثنائي في الكود أدناه سطراً سطراً. النتيجة: عنوان الشبكة 192.168.10.64.\n\nومنه نستخرج كل شيء عن هذه الشبكة الفرعية:\n\n- حجم الكتلة: 256-192 = 64 عنواناً\n- المدى: من 192.168.10.64 (عنوان الشبكة) إلى 192.168.10.127 (البث)\n- المضيفون: 192.168.10.65 حتى 192.168.10.126 = 62 مضيفاً قابلاً للاستخدام",
          en: "Every device runs one simple logic operation on every send: AND between its address and the destination address using its mask; the two results decide whether the destination is in its own network.\n\nAND rule: output is 1 only when both inputs are 1, otherwise zero. A fully worked example — address 192.168.10.75 with mask /26 (255.255.255.192):\n\nRead the binary example below line by line. The result: network address 192.168.10.64.\n\nFrom it we derive everything about this subnet:\n\n- Block size: 256-192 = 64 addresses\n- Range: 192.168.10.64 (network address) to 192.168.10.127 (broadcast)\n- Hosts: 192.168.10.65 through 192.168.10.126 = 62 usable hosts",
        },
        code: {
          lang: "text",
          snippet: "Address  192.168.10.75  = 11000000.10101000.00001010.01001011\nMask     255.255.255.192 = 11111111.11111111.11111111.11000000\n                              AND AND AND AND\nNetwork  192.168.10.64  = 11000000.10101000.00001010.01000000\n\nHost bits (last 6 bits of 75 = 010011):\n  010011 = 11  →  64 + 11 = 75   ✓\nNetwork = 64, broadcast = 64+63 = 127, hosts = 65..126",
        },
        tip: {
          ar: "لا تجري AND على الشبكات المسطحة فقط بيدك — لكن افهمها مرة واحدة بعمق، بعدها تكتفي بالاختصارات الحسابية العشرية.",
          en: "Do not hand-calculate flat-network ANDs forever — but understand it deeply once; after that, decimal shortcuts are all you need.",
        },
      },
      {
        heading: { ar: "قرار الإرسال: مباشرة أم عبر البوابة؟", en: "The Send Decision: Direct or via Gateway?" },
        tip: {
          ar: "أسرع فحص لأعطال القناع: إذا تحدث جاران على المنفذ نفسه ولا يصل أحدهما للآخر فقارن أقنعة الشبكة قبل أي شيء آخر — قناع مخطئ يرسل الحزم إلى بوابة غريبة.",
          en: "The fastest mask-fault check: when two neighbors on the same port cannot reach each other, compare their subnet masks before anything else — a wrong mask detours packets to a strange gateway.",
        },
        body: {
          ar: "عندما يريد جهازك إرسال حزمة، يجري العملية التالية تلقائياً في أجزاء من الميكروثانية:\n\n- يحسب AND لعنوانه مع قناعه → شبكته\n- يحسب AND لعنوان الوجهة مع القناع نفسه → شبكة الوجهة كما يراها\n- إذا تطابق الناتجان: الوجهة محلية — يرسل إطاراً مباشراً إلى MAC الوجهة بعد استعلام ARP\n- إذا اختلفا: الوجهة بعيدة — يرسل الإطار إلى MAC البوابة الافتراضية (Default Gateway) بينما يبقى IP للوجهة الأصلية\n\nهذه هي الآلية التي تحدد حياة كل حزمة: نفس الفلسفة في أنظمة التشغيل والموجّهات ومكدسات TCP/IP في كل مكان.\n\nملاحظة عملية: البوابة الافتراضية هي جهاز توجيه له واجهة في شبكتك، وعنوانه يجب أن يكون من نفس الشبكة الفرعية — خطأ شائع جداً: إدخال بوابة من شبكة أخرى فيجعل الجهاز عاجزاً عن الوصول لما هو خارج شبكته.",
          en: "When your device wants to send a packet, it automatically runs this in microseconds:\n\n- ANDs its own address with its mask → its network\n- ANDs the destination address with the same mask → the destination network as it sees it\n- If the two results match: destination is local — send a frame directly to the destination MAC after an ARP query\n- If they differ: destination is remote — send the frame to the default gateway MAC while the IP header keeps the real destination\n\nThis is the mechanism that shapes every packet's life: identical philosophy in operating systems, routers, and every TCP/IP stack.\n\nPractical note: the default gateway is a router with an interface in your network, and its address must belong to your own subnet — a very common mistake is entering a gateway from another network, leaving the device unable to reach anything beyond it.",
        },
      },
    ],
    keyPoints: [
      { ar: "القناع: بتات 1 متصلة من اليسار = جزء الشبكة، وبتات 0 = جزء المضيف", en: "Mask: contiguous 1-bits on the left = network part, 0-bits = host part" },
      { ar: "المضيفون القابلون للاستخدام = 2^(بتات المضيف) - 2 (شبكة + بث)", en: "Usable hosts = 2^(host bits) - 2 (network + broadcast)" },
      { ar: "AND يحدد شبكة أي عنوان: 192.168.10.75/26 يقع في 192.168.10.64", en: "AND determines an address's network: 192.168.10.75/26 lives in 192.168.10.64" },
      { ar: "تطابق شبكتي وشبكة الوجهة = إرسال ARP مباشر؛ اختلافهما = إرسال عبر البوابة", en: "My network matches destination network = direct ARP send; mismatch = send via gateway" },
      { ar: "/30 لروابط WAN (مضيفان)، و /31 نقطة-لنقطة وفق RFC 3021، و /32 مسار مضيف", en: "/30 for WAN links (2 hosts), /31 point-to-point per RFC 3021, /32 a host route" },
    ],
    commands: [
      { cmd: "ipcalc 192.168.10.75/26", desc: { ar: "حساب شبكة العنوان والمدى والبث ومعلومات AND (لينكس)", en: "Compute the network, range, broadcast, and AND details (Linux)" } },
      { cmd: "ip route get 192.168.10.75", desc: { ar: "سؤال نواة لينكس: عبر أي واجهة وإلى أي قفزة يذهب هذا العنوان؟", en: "Ask the Linux kernel: via which interface and next hop does this address go?" } },
      { cmd: "show ip interface g0/0", desc: { ar: "على Cisco: عرض عنوان الواجهة وقناعها وشبكتها الناتجة عن AND", en: "On Cisco: show the interface address, mask, and resulting ANDed network" } },
    ],
    quiz: [
      {
        q: { ar: "العنوان 192.168.10.75/26. ما عنوان شبكته؟", en: "For 192.168.10.75/26, what is its network address?" },
        options: [
          { ar: "192.168.10.0", en: "192.168.10.0" },
          { ar: "192.168.10.64", en: "192.168.10.64" },
          { ar: "192.168.10.72", en: "192.168.10.72" },
          { ar: "192.168.10.128", en: "192.168.10.128" },
        ],
        correct: 1,
        explain: { ar: "البتان الآحاديان في الخانة الرابعة يغطيان 64 عنواناً: الكتل هي 0 و 64 و 128 و 192. الرقم 75 يقع في كتلة 64، وعنوان الشبكة 192.168.10.64.", en: "The two one-bits in the fourth octet span 64 addresses: blocks are 0, 64, 128, 192. 75 falls in the 64 block, so the network address is 192.168.10.64." },
      },
      {
        q: { ar: "شبكة /28 كم مضيفاً قابلاً للاستخدام تضم؟", en: "How many usable hosts does a /28 network hold?" },
        options: [
          { ar: "16 مضيفاً", en: "16 hosts" },
          { ar: "14 مضيفاً", en: "14 hosts" },
          { ar: "12 مضيفاً", en: "12 hosts" },
          { ar: "8 مضيفين", en: "8 hosts" },
        ],
        correct: 1,
        explain: { ar: "/28 يترك 4 بتات للمضيف: 2^4 = 16، ناقص 2 لعنوان الشبكة والبث = 14 مضيفاً صالحاً.", en: "/28 leaves 4 host bits: 2^4 = 16, minus 2 for network and broadcast = 14 usable hosts." },
      },
      {
        q: { ar: "جهاز عنوانه 10.1.1.10/24 والبوابة 10.1.2.1. ماذا يحدث عند محاولة الوصول إلى 8.8.8.8؟", en: "A device is 10.1.1.10/24 with gateway 10.1.2.1. What happens when reaching for 8.8.8.8?" },
        options: [
          { ar: "يعمل كل شيء سليماً", en: "Everything works fine" },
          { ar: "يفشل الإرسال: البوابة ليست في نفس الشبكة الفرعية للجهاز", en: "Sending fails: the gateway is not in the device's own subnet" },
          { ar: "تصل الحزمة لكن الرد لا يرجع", en: "The packet arrives but the reply never returns" },
          { ar: "يستخدم الجهاز ARP للوصول إلى 8.8.8.8 مباشرة", en: "The device ARPs directly for 8.8.8.8" },
        ],
        correct: 1,
        explain: { ar: "البوابة 10.1.2.1 تقع في شبكة 10.1.2.0/24 بينما الجهاز في 10.1.1.0/24 — لا يمكن للجهاز الوصول إليها مباشرة عبر ARP، فتفشل كل الرسائل نحو الخارج.", en: "Gateway 10.1.2.1 sits in network 10.1.2.0/24 while the device is in 10.1.1.0/24 — the device cannot reach it directly via ARP, so all outbound traffic fails." },
      },
    ],
  },
  {
    id: "l045",
    moduleId: "m05",
    order: 5,
    level: "intermediate",
    title: { ar: "تقسيم الشبكات الفرعية خطوة بخطوة: المنهجية الكاملة", en: "Subnetting Step by Step: The Complete Method" },
    summary: {
      ar: "المنهجية الخمسية الاحترافية للتقسيم الفرعي مع مثالين محلولين بالكامل بالثنائي والعشري — الدرس الذي يحوّل التقسيم من رعب إلى روتين.",
      en: "The professional five-step subnetting method with two fully worked examples in binary and decimal — the lesson that turns subnetting from terror into routine.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "لماذا نقسم أصلاً؟", en: "Why Subnet at All?" },
        body: {
          ar: "الشبكة المسطحة الكبيرة عدوّ نفسها: بث واحد يوقف الجميع، وعطل واحد يعطّل الجميع، وأمن واحد يحمي الجميع بالدرجة نفسها.\n\nالتقسيم الفرعي (Subnetting) يحل أربعة مشاكل بضربة واحدة:\n\n- الأداء: تقليل نطاق البث (Broadcast Domain) — كل شبكة فرعية عزلة بث خاصة\n- الأمن: عزل الأقسام حساسة عن عامة، ورقابة على حدود كل جزء بقوائم وصول\n- الكفاءة: لا تهدر عناوين أكثر من حاجة كل قسم\n- التنظيم: هيكل هرمي يعكس بنية المنظمة (أقسام، طوابق، فروع)\n\nبعد هذا الدرس لن تسأل: هل أستطيع؟ بل: بأي سرعة أستطيع؟",
          en: "One big flat network is its own enemy: a single broadcast stops everyone, one fault hits everyone, one security level protects everyone equally.\n\nSubnetting solves four problems in one stroke:\n\n- Performance: shrink broadcast domains — each subnet gets its own isolated broadcast scope\n- Security: separate sensitive from general departments, control each boundary with ACLs\n- Efficiency: waste no more addresses than each department needs\n- Organization: a hierarchy mirroring the org (departments, floors, branches)\n\nAfter this lesson you will not ask whether you can — only how fast.",
        },
      },
      {
        heading: { ar: "المنهجية الخمسية", en: "The Five-Step Method" },
        diagram: {
          kind: "flow",
          title: { ar: "منهجية التقسيم الفرعي في خمس خطوات", en: "The subnetting method in five steps" },
          items: [
            { ar: "حدد عدد الشبكات الفرعية المطلوب", en: "Determine how many subnets you need" },
            { ar: "اقترض بتات: 2^بتات ≥ المطلوب", en: "Borrow bits: 2^bits ≥ needed" },
            { ar: "احسب القناع الجديد وحجم الكتلة", en: "Compute the new mask and block size" },
            { ar: "ارسم حدود الشبكات بمضاعفات الكتلة", en: "Lay out boundaries at block multiples" },
            { ar: "خصّص عنوان البوابة أول مضيف في كل شبكة", en: "Assign the gateway as the first host of each subnet" },
          ],
        },
        body: {
          ar: "سنستخدم منهجية موحدة لكل مسألة تقسيم، بالترتيب نفسه دائماً:\n\nالخطوة 1 — حدد المتطلبين: كم شبكة فرعية تحتاج (S) وكم أكبر عدد مضيفين في أي شبكة (H)؟\n\nالخطوة 2 — أوجد بتات الاستلاف: بتات الشبكات s تحقق 2^s ≥ S، وبتات المضيفين h تحقق 2^h - 2 ≥ H. تحقق دائماً من العددين معاً — ميزانية الخانات 32 بتاً مشتركة.\n\nالخطوة 3 — اكتب القناع الجديد: القناع الأصلي + s بتاً مستلفاً. مثلاً /24 + 2 = /26.\n\nالخطوة 4 — احسب حجم الكتلة: في الخانة المهمة (آخر خانة فيها بتات آحادية)، Block Size = 256 - قيمة القناع. مع /26: 256-192 = 64.\n\nالخطوة 5 — اعدّ الكتل من الصفر: الشبكات الفرعية تبدأ عند 0، 64، 128، 192 — وكل كتلة: أولها عنوان الشبكة، آخرها عنوان البث، وما بينهما مضيفون.\n\n- الرقم السحري (Magic Number) = حجم الكتلة نفسه\n- القفزات تكون دائماً مضاعفات حجم الكتلة\n- ناقش دائماً: هل 2^s و 2^h يتسعان معاً في 32 بتاً؟",
          en: "We will use one unified method for every problem, always in the same order:\n\nStep 1 — Define the two requirements: how many subnets you need (S) and the largest host count in any subnet (H).\n\nStep 2 — Find the borrowed bits: network bits s must satisfy 2^s ≥ S, and host bits h must satisfy 2^h - 2 ≥ H. Always check both together — the 32-bit budget is shared.\n\nStep 3 — Write the new mask: original mask + s borrowed bits. E.g. /24 + 2 = /26.\n\nStep 4 — Compute the block size: in the interesting octet (last one with 1-bits), Block Size = 256 - mask value. For /26: 256-192 = 64.\n\nStep 5 — Count blocks from zero: subnets start at 0, 64, 128, 192 — and in each block: the first address is the network, the last is broadcast, everything between is hosts.\n\n- The magic number equals the block size itself\n- Jumps are always multiples of the block size\n- Always sanity-check: do 2^s and 2^h both fit within 32 bits together?",
        },
        tip: {
          ar: "الخانة المهمة هي آخر خانة فيها بتات آحادية في القناع: مع /26 هي الخانة الرابعة، ومع /20 هي الخانة الثالثة (255.255.240.0 → حجم الكتلة 256-240 = 16 في الخانة الثالثة).",
          en: "The interesting octet is the last octet with 1-bits in the mask: with /26 it is the fourth; with /20 it is the third (255.255.240.0 → block size 256-240 = 16 in the third octet).",
        },
      },
      {
        heading: { ar: "مثال محلول بالكامل: 192.168.1.0/24 إلى /26", en: "Fully Worked Example: 192.168.1.0/24 into /26" },
        table: {
          caption: { ar: "الكتل الأربع الناتجة عن تقسيم /24 إلى /26", en: "The four blocks resulting from /24 into /26" },
          headers: [
            { ar: "الشبكة", en: "Network" },
            { ar: "نطاق المضيفين", en: "Host range" },
            { ar: "البث Broadcast", en: "Broadcast" },
            { ar: "المضيفون", en: "Hosts" },
          ],
          rows: [
            [
              { ar: "192.168.1.0/26", en: "192.168.1.0/26" },
              { ar: ".1 - .62", en: ".1 - .62" },
              { ar: "192.168.1.63", en: "192.168.1.63" },
              { ar: "62", en: "62" },
            ],
            [
              { ar: "192.168.1.64/26", en: "192.168.1.64/26" },
              { ar: ".65 - .126", en: ".65 - .126" },
              { ar: "192.168.1.127", en: "192.168.1.127" },
              { ar: "62", en: "62" },
            ],
            [
              { ar: "192.168.1.128/26", en: "192.168.1.128/26" },
              { ar: ".129 - .190", en: ".129 - .190" },
              { ar: "192.168.1.191", en: "192.168.1.191" },
              { ar: "62", en: "62" },
            ],
            [
              { ar: "192.168.1.192/26", en: "192.168.1.192/26" },
              { ar: ".193 - .254", en: ".193 - .254" },
              { ar: "192.168.1.255", en: "192.168.1.255" },
              { ar: "62", en: "62" },
            ],
          ],
        },
        tip: {
          ar: "عنوان البوابة لا يشترط أن يكون أول مضيف، لكن جعله كذلك (‎.1 أو ‎.65 في الكتلة الثانية) يسهّل الحفظ والتوثيق ويمنع تفرّقاً محرجاً في التصميم.",
          en: "The gateway need not be the first usable host, but making it so (‎.1 or ‎.65 in the second block) eases memory and documentation and prevents awkward design drift.",
        },
        body: {
          ar: "المطلوب: أربع شبكات فرعية من 192.168.1.0/24 بأقل هدر.\n\nالخطوة 1: S = 4 شبكات، H = 60 مضيفاً للكبرى (لنقل قسم المبيعات).\n\nالخطوة 2: 2^s ≥ 4 يعطي s = 2 (1 يمنح شبكتين فقط — لا يكفي). و 2^h - 2 ≥ 60 يعطي h = 6 (64-2 = 62 ≥ 60 ✓). تحقق: 24 + 2 = 26 بتاً للشبكة + 6 للمضيف = 32 بالضبط ✓\n\nالخطوة 3: القناع الجديد /26 = 255.255.255.192.\n\nالخطوة 4: حجم الكتلة = 256 - 192 = 64.\n\nالخطوة 5: الكتل الأربع مذكورة في الجدول أدناه مع الثنائي الذي يثبت أن البتين المستلفين يميزان كل كتلة — لاحظ بت الخانة الرابعة الأخيران: 00، 01، 10، 11.",
          en: "Requirement: four subnets out of 192.168.1.0/24 with minimal waste.\n\nStep 1: S = 4 subnets, H = 60 hosts for the largest (say Sales).\n\nStep 2: 2^s ≥ 4 gives s = 2 (1 bit yields only two subnets — insufficient). And 2^h - 2 ≥ 60 gives h = 6 (64-2 = 62 ≥ 60 ✓). Check: 24 + 2 network bits + 6 host bits = 32 exactly ✓\n\nStep 3: New mask /26 = 255.255.255.192.\n\nStep 4: Block size = 256 - 192 = 64.\n\nStep 5: The four blocks are listed below, with the binary proving the two borrowed bits distinguish each block — watch the final two bits of the fourth octet: 00, 01, 10, 11.",
        },
        code: {
          lang: "text",
          snippet: "192.168.1.0/24 → /26 (borrow 2 bits, 4 subnets, 62 hosts each)\n\nSubnet 1: 192.168.1.0/26    host bits: 000000\n  Network: .0    Hosts: .1  - .62     Broadcast: .63\nSubnet 2: 192.168.1.64/26   host bits: 010000 (64)\n  Network: .64   Hosts: .65 - .126    Broadcast: .127\nSubnet 3: 192.168.1.128/26  host bits: 100000 (128)\n  Network: .128  Hosts: .129 - .190   Broadcast: .191\nSubnet 4: 192.168.1.192/26  host bits: 110000 (192)\n  Network: .192  Hosts: .193 - .254   Broadcast: .255\n\nBinary of 4th octet, first two bits = subnet ID:\n  0   = 000000|00    64  = 010000|00\n  128 = 100000|00    192 = 110000|00   (| = borrowed bits boundary)",
        },
      },
      {
        heading: { ar: "مثال ثانٍ سريع: /27 ثم /30 لروابط WAN", en: "A Second Quick Example: /27 then /30 for WAN Links" },
        body: {
          ar: "لنقتطع من نفس الشبكة الأصلية شبكات أصغر احترافياً:\n\nمثال /27: نحتاج 8 شبكات صغيرة (نقاط بيع مثلاً) بعشرة مضيفين لكل منها.\n\n- 2^s ≥ 8 → s = 3، والقناع /27 = 255.255.255.224\n- حجم الكتلة: 256 - 224 = 32، و المضيفون 32-2 = 30 ≥ 10 ✓\n- الكتل: 0 و 32 و 64 و 96 و 128 و 160 و 192 و 224 — أولها 192.168.1.0/27 ومضيفوه .1 حتى .30 والبث .31\n\nمثال /30 لرابط WAN نقطي بين موجّهين: نحتاج مضيفين فقط.\n\n- 2^h - 2 ≥ 2 → h = 2 → القناع /30 = 255.255.255.252\n- حجم الكتلة 256-252 = 4: كل كتلة تعطي عنوانين دقيقين للموجّهين وعنوان شبكة وعنوان بث\n- مثال كتلة: 192.168.1.240/30 → الموجّه الأول .241 والثاني .242 والبث .243\n\nهذه هي البادئة القياسية لروابط WAN في الشبكات القديمة قبل شيوع /31.",
          en: "Let us carve smaller professional pieces from the same original network:\n\nExample /27: we need 8 small networks (point-of-sale kiosks) with ten hosts each.\n\n- 2^s ≥ 8 → s = 3, mask /27 = 255.255.255.224\n- Block size: 256 - 224 = 32, hosts 32-2 = 30 ≥ 10 ✓\n- Blocks: 0, 32, 64, 96, 128, 160, 192, 224 — first is 192.168.1.0/27 with hosts .1 to .30 and broadcast .31\n\nExample /30 for a point-to-point WAN link between two routers: only two hosts needed.\n\n- 2^h - 2 ≥ 2 → h = 2 → mask /30 = 255.255.255.252\n- Block size 256-252 = 4: each block gives exactly two addresses for the routers, plus network and broadcast\n- Example block: 192.168.1.240/30 → first router .241, second .242, broadcast .243\n\nThis is the classic WAN-link prefix before /31 became widespread.",
        },
        tip: {
          ar: "خطأ الامتحانات المفضل: خلط أعداد الشبكات بالمضيفين. سؤال: كم شبكة وكم مضيفاً؟ جاوب صريحاً: الشبكات 2^s والمضيفون 2^h - 2. لا تُبدل أبداً.",
          en: "A favorite exam trap: swapping subnet counts for host counts. Read: how many networks and how many hosts? Answer explicitly: networks = 2^s, hosts = 2^h - 2. Never swap them.",
        },
      },
      {
        heading: { ar: "أخطاء قاتلة تتجنبها من اليوم", en: "Fatal Mistakes to Avoid From Today" },
        body: {
          ar: "المهندسون الجدد يقعون في أخطاء متكررة — احفظها واجتنبها:\n\n- تعيين عنوان الشبكة لمضيف: 192.168.1.64 مضيفاً في شبكة /26 — ممنوع، هذا عنوان الشبكة نفسه\n- تعيين عنوان البث لمضيف: 192.168.1.127 — ممنوع كذلك\n- الخلط بين القناع والمدى: عنوان 192.168.1.100 في شبكة /27 ليس في كتلة 96 فقط لأن 100 قريب من 96؟ بل: كتل /27 هي 0 و 32 و 64 و 96 و 128 — و 100 يقع في كتلة 96 صحيحاً لكن البث 127 وليس 31 (البث لكل كتلة = بداية الكتلة + 31)\n- نسيان الفحص المزدوج: 2^s و 2^h معاً قد لا يتسعان في 32 بتاً لو طُلب المستحيل\n\nتدريب مقترح: ألقِ على نفسك عناوين عشوائية وأقنعة عشوائية، واحسب الشبكة والبث والمدى ذهنياً خلال 30 ثانية — هذه العضلة الذهنية تُبنى بالتكرار فقط.",
          en: "New engineers repeat the same mistakes — memorize and avoid:\n\n- Assigning the network address to a host: 192.168.1.64 as a host in a /26 — forbidden, that is the network address itself\n- Assigning the broadcast address: 192.168.1.127 — equally forbidden\n- Confusing mask and range: is 192.168.1.100 in /27 block 96? Yes — blocks are 0, 32, 64, 96, 128 — but its broadcast is 127, not 31 (each block's broadcast = block start + 31)\n- Forgetting the joint check: 2^s and 2^h together may not fit in 32 bits when the request is impossible\n\nSuggested drill: throw random addresses and masks at yourself and mentally compute network, broadcast, and range within 30 seconds — this mental muscle is built by repetition only.",
        },
      },
    ],
    keyPoints: [
      { ar: "المنهجية: متطلبات ← بتات (2^s ≥ S و 2^h-2 ≥ H) ← قناع ← حجم كتلة ← عدّ الكتل", en: "Method: requirements ← bits (2^s ≥ S and 2^h-2 ≥ H) ← mask ← block size ← count blocks" },
      { ar: "حجم الكتلة = 256 - قيمة القناع في الخانة المهمة", en: "Block size = 256 - mask value in the interesting octet" },
      { ar: "192.168.1.0/24 عند /26: كتل 0/64/128/192 لكل منها 62 مضيفاً", en: "192.168.1.0/24 at /26: blocks 0/64/128/192, each with 62 hosts" },
      { ar: "عنوان الشبكة وعنوان البث محرمان على المضيفين دائماً", en: "The network and broadcast addresses are always forbidden to hosts" },
      { ar: "/30 = رابط WAN بمضيفين اثنين بالضبط (255.255.255.252)", en: "/30 = a WAN link with exactly two hosts (255.255.255.252)" },
    ],
    commands: [
      { cmd: "ipcalc 192.168.1.0/26", desc: { ar: "تحقق من كل كتلة ومضيفيها وبثها آلياً — قارن نتائجك اليدوية", en: "Verify every block, its hosts, and broadcast automatically — compare with your hand results" } },
      { cmd: "ipcalc 172.16.0.0/20", desc: { ar: "تدريب على الخانة الثالثة: قناع 255.255.240.0 وحجم كتلة 16", en: "Practice on the third octet: mask 255.255.240.0 and block size 16" } },
      { cmd: "show ip route 192.168.1.64", desc: { ar: "على Cisco: أي مسار تطابق هذا العنوان وبأي تفاصيل", en: "On Cisco: which route matches this address and with what details" } },
    ],
    quiz: [
      {
        q: { ar: "شبكة 192.168.1.128/26. ما عنوان البث فيها؟", en: "In network 192.168.1.128/26, what is the broadcast address?" },
        options: [
          { ar: "192.168.1.159", en: "192.168.1.159" },
          { ar: "192.168.1.191", en: "192.168.1.191" },
          { ar: "192.168.1.255", en: "192.168.1.255" },
          { ar: "192.168.1.190", en: "192.168.1.190" },
        ],
        correct: 1,
        explain: { ar: "حجم الكتلة 64: كتلة 128 تمتد حتى 128+63 = 191 وهو آخر عنوان = عنوان البث. أما 190 فآخر مضيف قابل للاستخدام.", en: "Block size 64: the 128 block spans to 128+63 = 191, its last address = broadcast. 190 is merely the last usable host." },
      },
      {
        q: { ar: "تحتاج 7 شبكات فرعية من /24 وأكبرها 25 مضيفاً. ما أصغر قناع يحقق الشرطين؟", en: "You need 7 subnets from a /24, the largest holding 25 hosts. What is the smallest mask satisfying both?" },
        options: [
          { ar: "/26", en: "/26" },
          { ar: "/27", en: "/27" },
          { ar: "/28", en: "/28" },
          { ar: "/25", en: "/25" },
        ],
        correct: 1,
        explain: { ar: "الشبكات: 2^3 = 8 ≥ 7 → ثلاثة بتات ← /27. المضيفون: /27 يعطي 30 ≥ 25 ✓. أي /28 (14 مضيفاً) يفشل شرط المضيفين، و /25 يعطي شبكتين فقط.", en: "Subnets: 2^3 = 8 ≥ 7 → three bits → /27. Hosts: /27 yields 30 ≥ 25 ✓. /28 (14 hosts) fails the host requirement; /25 yields only two subnets." },
      },
      {
        q: { ar: "العنوان 192.168.1.100 في شبكة /27. ما عنوان شبكته؟", en: "Address 192.168.1.100 in a /27. What is its network address?" },
        options: [
          { ar: "192.168.1.96", en: "192.168.1.96" },
          { ar: "192.168.1.64", en: "192.168.1.64" },
          { ar: "192.168.1.100", en: "192.168.1.100" },
          { ar: "192.168.1.128", en: "192.168.1.128" },
        ],
        correct: 0,
        explain: { ar: "كتل /27 كل 32 عنواناً: 0 و 32 و 64 و 96 و 128... الرقم 100 يقع بين 96 و 128، فشبكته 192.168.1.96 وبثها 192.168.1.127 ومضيفوه من 97 حتى 126.", en: "/27 blocks every 32 addresses: 0, 32, 64, 96, 128... 100 lies between 96 and 128, so its network is 192.168.1.96, broadcast 192.168.1.127, hosts 97 to 126." },
      },
    ],
  },
  {
    id: "l046",
    moduleId: "m05",
    order: 6,
    level: "intermediate",
    title: { ar: "VLSM: أقنعة متغيرة الطول وتصميم الشبكات الواقعية", en: "VLSM: Variable-Length Masks & Real-World Design" },
    summary: {
      ar: "تجاوز الطول الواحد للقناع: كيف توزع العناوين بعدالة حسب حاجة كل قسم، مع خطة تصميم كاملة لشركة من خمسة أقسام وجدول نهائي دقيق.",
      en: "Beyond the single mask length: allocate addresses fairly by each department's need, with a complete design plan for a five-department company and a precise final table.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "مشكلة الطول الواحد: هدر بملايين العناوين", en: "The Single-Length Problem: Wasted by the Millions" },
        body: {
          ar: "التقسيم التقليدي متساوي الأقنعة (FLSM - Fixed Length Subnet Mask) يفرض قناعاً واحداً على كل الشبكات الفرعية — وهذا كارثة هدر عند اختلاف أحجام الأقسام.\n\nمثال: قسم فيه 100 مضيف وقسم فيه 10 وروابط WAN فيها مضيفان. لو فرضنا /26 على الجميع (لأن الأكبر يحتاج 62.. لا يكفي أصلاً) — ثم /25 على الجميع: قسم العشرة يهدر 112 عنواناً وكل رابط WAN يهدر 124 عنواناً.\n\nVLSM (Variable Length Subnet Mask) — التقسيم بأطوال متغيرة — يسمح باستخدام /25 للقسم الكبير و /27 للصغير و /30 للروابط النقطية، من نفس الكتلة الأصلية، بلا هدر تقريباً.\n\n- كان FLSM إلزامياً زمن البروتوكولات الطبقية مثل RIP v1\n- بروتوكولات اليوم (OSPF و EIGRP و RIP v2) كلها لا طبقية وتدعم VLSM\n- VLSM أحد الركائز التي مكنت الإنترنت من البقاء حياً عقداً إضافياً",
          en: "Fixed-Length Subnet Masking (FLSM) imposes one mask on every subnet — a wasteful disaster when departments differ in size.\n\nExample: a department of 100 hosts, one of 10, and WAN links of 2. Forcing one mask on all: /26 does not even fit the big one; /25 fits it but the ten-host department wastes 112 addresses and every WAN link wastes 124.\n\nVLSM (Variable Length Subnet Mask) lets you use /25 for the large department, /27 for the small, and /30 for point-to-point links — all from the same original block, with almost no waste.\n\n- FLSM was mandatory in the classful era, e.g. RIPv1\n- Today's protocols (OSPF, EIGRP, RIPv2) are all classless and VLSM-capable\n- VLSM is one of the pillars that kept the Internet alive an extra decade",
        },
      },
      {
        heading: { ar: "القاعدة الذهبية: من الأكبر إلى الأصغر", en: "The Golden Rule: Largest to Smallest" },
        body: {
          ar: "التوزيع الصحيح يتطلب قاعدة ترتيب صارمة: ابدأ دائماً بالشبكة الأكبر حاجة وانزل نحو الأصغر.\n\nلماذا؟ لأن الكتل الكبيرة يجب أن تُوضع عند حدود محاذاة صارمة. كتلة /25 يجب أن تبدأ عند مضاعفات 128 في الخانة الرابعة (0 أو 128). لو بدأت بتوزيع كتلة صغيرة عند 0 فستحتل مساحة تمنع محاذاة الكبيرة لاحقاً وتكسر التصميم.\n\nالمنهجية العملية:\n\n- رتّب المتطلبات تنازلياً حسب عدد المضيفين\n- لكل متطلب اختر أصغر قناع يكفيه مع هامش نمو معقول\n- وزّع الكتل بالتسلسل من بداية العنوان الأم\n- احتفظ بكتل متبقية للأقسام المستقبلية\n\nهذا الترتيب يضمن محاذاة مثالية ويترك المساحة المتبقية متجاورة وقابلة للاستخدام لاحقاً — لا فتاتاً مبعثراً غير قابل للتوظيف.",
          en: "Correct allocation demands a strict ordering rule: always start with the largest-need network and descend to the smallest.\n\nWhy? Because big blocks must sit at strict alignment boundaries. A /25 must start at multiples of 128 in the fourth octet (0 or 128). If you place a small block at 0 first, it occupies space that later blocks the large one's alignment and breaks the design.\n\nThe practical method:\n\n- Sort requirements descending by host count\n- For each, choose the smallest mask that fits with a sensible growth margin\n- Allocate blocks sequentially from the parent start\n- Reserve leftover blocks for future departments\n\nThis ordering guarantees perfect alignment and leaves the remainder contiguous and usable later — not unusable scattered crumbs.",
        },
        tip: {
          ar: "أضف هامش نمو 20-50% لكل قسم في تقدير الحاجة: قسم فيه 55 مضيفاً اليوم خذ له /26 (62) لا /27 (30) — النمو سريع دائماً والتعديل لاحقاً مؤلم.",
          en: "Add a 20-50% growth margin per department: a 55-host department today deserves /26 (62), not /27 (30) — growth is always fast and renumbering later is painful.",
        },
      },
      {
        heading: { ar: "خطة تصميم كاملة: شركة المثال", en: "A Complete Design Plan: The Example Company" },
        table: {
          caption: { ar: "توزيع VLSM من 192.168.10.0/24", en: "A VLSM allocation from 192.168.10.0/24" },
          headers: [
            { ar: "الإدارة", en: "Department" },
            { ar: "المضيفون المطلوبون", en: "Hosts needed" },
            { ar: "الشبكة المخصصة", en: "Allocated subnet" },
            { ar: "المتاح", en: "Available" },
          ],
          rows: [
            [
              { ar: "الإنتاج", en: "Production" },
              { ar: "100", en: "100" },
              { ar: "192.168.10.0/25", en: "192.168.10.0/25" },
              { ar: "126", en: "126" },
            ],
            [
              { ar: "الدعم", en: "Support" },
              { ar: "50", en: "50" },
              { ar: "192.168.10.128/26", en: "192.168.10.128/26" },
              { ar: "62", en: "62" },
            ],
            [
              { ar: "الإدارة", en: "Admin" },
              { ar: "20", en: "20" },
              { ar: "192.168.10.192/27", en: "192.168.10.192/27" },
              { ar: "30", en: "30" },
            ],
            [
              { ar: "وصلات WAN", en: "WAN links" },
              { ar: "2 لكل وصلة", en: "2 each" },
              { ar: "192.168.10.224/30 و ‎.228/30", en: "192.168.10.224/30 and ‎.228/30" },
              { ar: "2", en: "2" },
            ],
          ],
        },
        body: {
          ar: "الشركة تملك 192.168.1.0/24 وتحتاج:\n\n- المبيعات: 100 مضيف\n- الهندسة: 50 مضيفاً\n- تقنية المعلومات: 25 مضيفاً\n- الإدارة: 10 مضيفين\n- رابطا WAN بين المقر والفرع: مضيفان لكل رابط\n\nالترتيب تنازلياً وحلّ كل متطلب:\n\n- 100 مضيفاً → 2^7-2 = 126 ≥ 100 → /25 → الكتلة الأولى: 192.168.1.0/25 (من .0 إلى .127)\n- 50 مضيفاً → 2^6-2 = 62 ≥ 50 → /26 → التالية المتاحة: 192.168.1.128/26 (من .128 إلى .191)\n- 25 مضيفاً → 2^5-2 = 30 ≥ 25 → /27 → 192.168.1.192/27 (من .192 إلى .223)\n- 10 مضيفين → 2^4-2 = 14 ≥ 10 → /28 → 192.168.1.224/28 (من .224 إلى .239)\n- رابطا WAN → /30 لكل واحد → 192.168.1.240/30 (240-243) و 192.168.1.244/30 (244-247)\n\nالمتبقي: من 192.168.1.248 إلى 192.168.1.255 — كتلة /29 قابلة للتوسع المستقبلي. لاحظ الجدول الدقيق في الكود أدناه.",
          en: "The company owns 192.168.1.0/24 and needs:\n\n- Sales: 100 hosts\n- Engineering: 50 hosts\n- IT: 25 hosts\n- Administration: 10 hosts\n- Two WAN links HQ-branch: 2 hosts each\n\nSorted descending, each requirement solved:\n\n- 100 hosts → 2^7-2 = 126 ≥ 100 → /25 → first block: 192.168.1.0/25 (.0 to .127)\n- 50 hosts → 2^6-2 = 62 ≥ 50 → /26 → next available: 192.168.1.128/26 (.128 to .191)\n- 25 hosts → 2^5-2 = 30 ≥ 25 → /27 → 192.168.1.192/27 (.192 to .223)\n- 10 hosts → 2^4-2 = 14 ≥ 10 → /28 → 192.168.1.224/28 (.224 to .239)\n- Two WAN links → /30 each → 192.168.1.240/30 (240-243) and 192.168.1.244/30 (244-247)\n\nLeftover: 192.168.1.248 to 192.168.1.255 — a future-growth /29 block. See the precise table in the code below.",
        },
        code: {
          lang: "text",
          snippet: "Parent: 192.168.1.0/24 (256 addresses)\n\nDept            Prefix      Network             Hosts range      Bcast\nSales (100)     /25         192.168.1.0/25      .1   - .126      .127\nEng   (50)      /26         192.168.1.128/26    .129 - .190      .191\nIT    (25)      /27         192.168.1.192/27    .193 - .222      .223\nAdmin (10)      /28         192.168.1.224/28    .225 - .238      .239\nWAN-1 (2)       /30         192.168.1.240/30    .241 - .242      .243\nWAN-2 (2)       /30         192.168.1.244/30    .245 - .246      .247\nFuture          /29+        192.168.1.248 ...   available\n\nUsed: 252 of 256 addresses (98.4% efficiency)",
        },
      },
      {
        heading: { ar: "تطبيق الخطة على الموجّهات", en: "Applying the Plan on Routers" },
        body: {
          ar: "الخطة على الورق لا تكفي — إليك تكوين الواجهات على موجّه Cisco بحيث تخدم كل قسم ببوابته:\n\n- واجهة G0/0 للمبيعات: عنوان 192.168.1.1 بقناع /25 — البوابة للمبيعات\n- واجهة G0/1 للهندسة: 192.168.1.129/26\n- واجهة G0/2 لتقنية المعلومات: 192.168.1.193/27\n- واجهة G0/3 للإدارة: 192.168.1.225/28\n\nلاحظ أن كل عنوان بوابة هو أول عنوان قابل للاستخدام في كتلته — عرف تصميمي شائع يسهّل التوثيق ويُتوقع لدى الفرق.\n\nبعد التهيئة، كل قسم شبكة بث معزولة: عطل بث في المبيعات لا يلمس الهندسة أبداً، وقوائم الوصول على واجهة القسم الحساس تحدّد حركته بدقة — هذه هي ثمرة التقسيم الذكي.",
          en: "A paper plan is not enough — here is the interface configuration on a Cisco router serving each department with its gateway:\n\n- G0/0 for Sales: 192.168.1.1 with /25 mask — the Sales gateway\n- G0/1 for Engineering: 192.168.1.129/26\n- G0/2 for IT: 192.168.1.193/27\n- G0/3 for Administration: 192.168.1.225/28\n\nNotice each gateway address is the first usable address in its block — a common design convention that eases documentation and is expected by teams.\n\nAfter configuration, each department is an isolated broadcast domain: a broadcast storm in Sales never touches Engineering, and ACLs on the sensitive department's interface control its traffic precisely — this is the fruit of smart subnetting.",
        },
        code: {
          lang: "cisco",
          snippet: "Router(config)# interface g0/0\nRouter(config-if)# ip address 192.168.1.1 255.255.255.128\nRouter(config-if)# description SALES-GATEWAY\nRouter(config-if)# no shutdown\n\nRouter(config)# interface g0/1\nRouter(config-if)# ip address 192.168.1.129 255.255.255.192\nRouter(config-if)# description ENGINEERING-GATEWAY\nRouter(config-if)# no shutdown\n\nRouter(config)# interface g0/2\nRouter(config-if)# ip address 192.168.1.193 255.255.255.224\nRouter(config-if)# description IT-GATEWAY\nRouter(config-if)# no shutdown\n\nRouter(config)# interface serial 0/0/0\nRouter(config-if)# ip address 192.168.1.241 255.255.255.252\nRouter(config-if)# description WAN-TO-BRANCH\nRouter(config-if)# no shutdown",
        },
      },
    ],
    keyPoints: [
      { ar: "FLSM قناع واحد للجميع = هدر هائل عند اختلاف أحجام الأقسام", en: "FLSM one mask for all = huge waste when department sizes differ" },
      { ar: "VLSM يسمح بأقنعة مختلفة داخل نفس الكتلة ويحتاج بروتوكولات لا طبقية", en: "VLSM allows different masks inside one block and needs classless protocols" },
      { ar: "القاعدة الذهبية: وزّع من أكبر حاجة إلى أصغرها لضمان محاذاة الكتل", en: "Golden rule: allocate from largest to smallest to keep blocks aligned" },
      { ar: "لكل عدد مضيفين: أصغر قناع يحقق 2^h - 2 ≥ الحاجة مع هامش نمو", en: "For each host count: the smallest mask satisfying 2^h - 2 ≥ need, with growth margin" },
      { ar: "مثالنا: /25 و /26 و /27 و /28 و /30×2 من 192.168.1.0/24 بكفاءة 98.4%", en: "Our example: /25, /26, /27, /28, and two /30s from 192.168.1.0/24 at 98.4% efficiency" },
    ],
    commands: [
      { cmd: "ipcalc 192.168.1.128/26", desc: { ar: "تحقق من كتلة الهندسة: المدى والبث وعدد المضيفين", en: "Verify the Engineering block: range, broadcast, host count" } },
      { cmd: "show ip interface brief", desc: { ar: "على Cisco: مراجعة كل الواجهات بعناوينها وأقنعتها وحالتها", en: "On Cisco: review all interfaces with addresses, masks, and status" } },
      { cmd: "show running-config interface g0/0", desc: { ar: "عرض تكوين واجهة بعينها للتدقيق في العنوان والقناع", en: "Show one interface's configuration to audit address and mask" } },
    ],
    quiz: [
      {
        q: { ar: "قسم يحتاج 60 مضيفاً. أي قناع يحقق أقل هدر ممكن؟", en: "A department needs 60 hosts. Which mask wastes the least?" },
        options: [
          { ar: "/25", en: "/25" },
          { ar: "/26", en: "/26" },
          { ar: "/27", en: "/27" },
          { ar: "/28", en: "/28" },
        ],
        correct: 1,
        explain: { ar: "/26 يعطي 62 مضيفاً: يحقق الحاجة (60) بأقل هدر (2 عنوانين فقط). /25 يهدر 66 و /27 لا يكفي أصلاً (30).", en: "/26 gives 62 hosts: satisfies the need (60) with minimal waste (just 2 addresses). /25 wastes 66 and /27 does not even fit (30)." },
      },
      {
        q: { ar: "في خطة VLSM وزعت كتلة /27 عند بداية الكتلة الأصلية، ثم احتجت كتلة /26. ما النتيجة؟", en: "In a VLSM plan you placed a /27 at the start of the parent block, then needed a /26. What happens?" },
        options: [
          { ar: "تعمل بشكل طبيعي بلا مشاكل", en: "It works normally with no issues" },
          { ar: "لا يمكن وضع /26 متجاورة عند الصفر لأن /27 حالت دون المحاذاة الصحيحة", en: "The /26 cannot sit contiguously at zero because the /27 blocked proper alignment" },
          { ar: "الموجّه يرفض التكوين بالكامل", en: "The router rejects the whole configuration" },
          { ar: "تُدمج الكتلتان تلقائياً في /25", en: "The two blocks automatically merge into a /25" },
        ],
        correct: 1,
        explain: { ar: "كتلة /26 يجب أن تبدأ عند مضاعف 64 (0 أو 64 أو 128...). الكتلة /27 عند 0 تستهلك 0-31، فلا يمكن محاذاة /26 عند الصفر — يجب توزيع الأكبر أولاً.", en: "A /26 must start at a multiple of 64 (0, 64, 128...). The /27 at 0 consumes 0-31, so the /26 cannot align at zero — largest first is mandatory." },
      },
      {
        q: { ar: "أي بروتوكول توجيه يدعم VLSM؟", en: "Which routing protocol supports VLSM?" },
        options: [
          { ar: "RIP الإصدار 1", en: "RIP version 1" },
          { ar: "IGRP الكلاسيكي", en: "Classic IGRP" },
          { ar: "OSPF", en: "OSPF" },
          { ar: "لا شيء مما سبق", en: "None of the above" },
        ],
        correct: 2,
        explain: { ar: "OSPF بروتوكول لا طبقي يحمل قناع كل مسار، لذا يدعم VLSM (وكذلك RIP v2 و EIGRP). RIP v1 و IGRP طبقيان لا يحملان الأقنعة فلا يدعمانه.", en: "OSPF is classless and carries each route's mask, hence VLSM-capable (as are RIPv2 and EIGRP). RIPv1 and IGRP are classless-free — they carry no masks, so no VLSM." },
      },
    ],
  },
  {
    id: "l047",
    moduleId: "m05",
    order: 7,
    level: "intermediate",
    title: { ar: "CIDR وتجميع المسارات: الفضاء الطبقي الحر", en: "CIDR & Route Aggregation: The Classless Free Space" },
    summary: {
      ar: "كيف كسر CIDR نظام الفئات عام 1993، ولماذا يعتبر تجميع المسارات (Supernetting) إنقاذاً لجداول التوجيه العالمية، مع مثال تجميع محسوب بالثنائي.",
      en: "How CIDR broke the class system in 1993, why route aggregation (supernetting) rescued the global routing tables, and a binary-verified aggregation example.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "ما غيره CIDR في القواعد", en: "What CIDR Changed in the Rules" },
        table: {
          caption: { ar: "التوجيه الطبقي مقابل CIDR", en: "Classful addressing vs CIDR" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "طبقي Classful", en: "Classful" },
            { ar: "CIDR", en: "CIDR" },
          ],
          rows: [
            [
              { ar: "الأقنعة", en: "Masks" },
              { ar: "ثابتة ضمنية حسب الفئة", en: "Implicit and fixed by class" },
              { ar: "أي طول بادئة /8 حتى /32", en: "Any prefix length /8 to /32" },
            ],
            [
              { ar: "هدر العناوين", en: "Address waste" },
              { ar: "كبير — فئة B لعشرات المضيفين", en: "Huge — a Class B for dozens of hosts" },
              { ar: "بالحد الأدنى المطلوب فعلاً", en: "Only what is actually needed" },
            ],
            [
              { ar: "دعم VLSM", en: "VLSM support" },
              { ar: "غير مدعوم", en: "Not supported" },
              { ar: "أصلي ومطلوب", en: "Native and expected" },
            ],
            [
              { ar: "جدول التوجيه العالمي", en: "Global routing table" },
              { ar: "ينفجر مع نمو الشبكات", en: "Explodes with network growth" },
              { ar: "يُضغط بالتجميع Aggregation", en: "Compressed via aggregation" },
            ],
          ],
        },
        body: {
          ar: "CIDR (Classless Inter-Domain Routing) — التوجيه بين النطاقات اللا طبقي — وُلد عام 1993 في RFC 1519 ليقتل نظام الفئات الذي هدر الفضاء هدراً مروعاً.\n\nفكرة واحدة بسيطة غيّرت كل شيء: القناع يمكن أن يقع عند أي بت، في أي خانة — لا حدود جاهزة عند 8 و 16 و 24 بتاً.\n\n- قبل CIDR: مزود يحتاج 300 عنوان يُمنح فئة C كاملة (256) لا تكفيه، فيُمنح فئتين أو فئة B بـ 65 ألف عنوان — هدر فاحش\n- بعد CIDR: يُمنح /23 بالضبط = 512 عنواناً\n- العنوان والقناع يكتبان معاً: 203.0.113.0/23 — لا مجال للالتباس\n\nمع CIDR صار تخصيص العناوين بمقاس الحاجة تماماً، وأصبح تجميع المسارات ممكناً — موضوع بقية الدرس.",
          en: "CIDR (Classless Inter-Domain Routing) was born in 1993 in RFC 1519 to kill the class system that squandered address space horribly.\n\nOne simple idea changed everything: the mask may sit at any bit, in any octet — no ready-made boundaries at 8, 16, or 24 bits.\n\n- Pre-CIDR: a provider needing 300 addresses got a full Class C (256 — insufficient), so two of them, or a Class B with 65 thousand — flagrant waste\n- Post-CIDR: they get exactly a /23 = 512 addresses\n- Address and mask are written together: 203.0.113.0/23 — no room for ambiguity\n\nWith CIDR, allocations fit needs precisely, and route aggregation became possible — the rest of this lesson.",
        },
      },
      {
        heading: { ar: "التجميع: مثال محسوب بالثنائي", en: "Aggregation: A Binary-Verified Example" },
        body: {
          ar: "لديك أربع شبكات متجاورة تريد إعلانها كمسار واحد في جدول التوجيه:\n\n- 192.168.8.0/24 و 192.168.9.0/24 و 192.168.10.0/24 و 192.168.11.0/24\n\nاكتب الخانة الثالثة لكل عنوان ثنائياً: 8 = 00001000، 9 = 00001001، 10 = 00001010، 11 = 00001011.\n\nقارن البتات من اليسار: أول 6 بتات متطابقة في الجميع (000010..)، وبتان الأخيران فقط يختلفان (00 و 01 و 10 و 11). إذن البادئة المشتركة = 16 + 6 = 22 بتاً.\n\nالنتيجة: مسار واحد 192.168.8.0/22 (قناع 255.255.252.0) يغطي الأربع شبكات بالضبط، من 192.168.8.0 إلى 192.168.11.255 — اقرأ البرهان الثنائي في الكود.\n\nشرطا التجميع الناجح دائماً: التجاور (Contiguity) والمحاذاة على حدود البادئة (Alignment) — والبداية يجب أن تكون مضاعفاً لحجم الكتلة (هنا 4 شبكات × 256 = كتلة /22 تبدأ عند مضاعف 4 في الخانة الثالثة: 8 ✓).",
          en: "You have four contiguous networks to announce as one route:\n\n- 192.168.8.0/24, 192.168.9.0/24, 192.168.10.0/24, and 192.168.11.0/24\n\nWrite each third octet in binary: 8 = 00001000, 9 = 00001001, 10 = 00001010, 11 = 00001011.\n\nCompare bits from the left: the first 6 bits match across all (000010..); only the last two differ (00, 01, 10, 11). So the common prefix = 16 + 6 = 22 bits.\n\nResult: one route 192.168.8.0/22 (mask 255.255.252.0) covers exactly the four networks, from 192.168.8.0 to 192.168.11.255 — read the binary proof in the code.\n\nTwo conditions always govern successful aggregation: contiguity and alignment on prefix boundaries — and the start must be a multiple of the block size (here 4 networks × 256 = a /22 block starting at a multiple of 4 in the third octet: 8 ✓).",
        },
        code: {
          lang: "text",
          snippet: "192.168.8.0/24    3rd octet: 000010|00   = 8\n192.168.9.0/24    3rd octet: 000010|01   = 9\n192.168.10.0/24   3rd octet: 000010|10   = 10\n192.168.11.0/24   3rd octet: 000010|11   = 11\n                            ^^^^^^ 6 common bits + 16 = /22\n\nAggregate: 192.168.8.0/22  (mask 255.255.252.0)\n  covers 192.168.8.0  through 192.168.11.255\n  = 4 x 256 = 1024 addresses exactly\n\nRouter: ip route 192.168.8.0 255.255.252.0 <next-hop>\nAlternative: ip route 192.168.8.0 255.255.252.0 s0/0/0",
        },
      },
      {
        heading: { ar: "لماذا التجمع مسألة حياة للإنترنت؟", en: "Why Aggregation Is a Matter of Life for the Internet" },
        body: {
          ar: "بدون تجميع، سيحتوي جدول التوجيه في كل موجّه رئيس على الإنترنت ملايين المسارات المنفردة — وهذا مستحيل ذاكرياً وحسابياً وزمنياً.\n\nالحل الهرمي: كل مزود خدمة يجمع شبكات عملائه في بادئة واحدة أو قليلة ويعلنها لمزوديه، والذين يجمعون تجميعاتهم في بادئات أكبر وهكذا — هرمية تجميع تعكس هرمية الإنترنت نفسها.\n\nأثر التجميع بأرقام حقيقية:\n\n- عدد المسارات في جدول BGP العالمي اليوم يتجاوز 900 ألف مسار\n- لو أُعلن كل /24 منفرداً (نحو 16 مليون /24 ممكن) لتضخم الجدول بما لا تحتمله الموجّهات\n- كل مسار يستهلك ذاكرة ومعالجة وزمن بحثاً في كل جهاز توجيه حدودي\n\nهذا هو السبب الذي يجعل IANA و السلطات الإقليمية توزع الكتل بمحاذاة هرمية جغرافية دقيقة — لا عبثية.",
          en: "Without aggregation, every core Internet router's table would hold millions of individual routes — impossible in memory, computation, and time.\n\nThe hierarchical solution: each ISP aggregates customer networks into one or few prefixes, announces them upstream; those aggregate further into larger prefixes — a hierarchy of aggregation mirroring the Internet itself.\n\nThe impact in real numbers:\n\n- The global BGP table today exceeds 900,000 routes\n- If every possible /24 were announced separately (some 16 million of them), the table would bloat beyond what routers can bear\n- Every route consumes memory, CPU, and lookup time at every edge router\n\nThis is exactly why IANA and the regional registries allocate blocks in careful geographic hierarchy — not randomly.",
        },
        tip: {
          ar: "عند تصميم شبكتك: خطط للتجمع منذ اليوم الأول — اجعل كل موقع أو عميل يتسلسل ضمن كتلة قابلة للإعلان كبادئة واحدة. تصميم العناوين الذكي يبقى أرخص أداة توسع تملكها.",
          en: "When designing your network: plan for aggregation from day one — keep every site or customer inside a block that can be announced as one prefix. Smart address design remains the cheapest scaling tool you own.",
        },
      },
      {
        heading: { ar: "حدود التجميع ومتى يفشل", en: "The Limits and Failure Cases of Aggregation" },
        body: {
          ar: "التجميع سلاح بشرطين صارمين، وإذا فشلا فشل كل شيء:\n\n- التجاور: لا يمكنك تجميع 192.168.8.0/24 و 192.168.12.0/24 في /22 واحد — يلزم كتلتان\n- المحاذاة: لا يمكن تجميع 192.168.9.0 حتى 192.168.12.0 في /22 لأن بداية الكتلة (9) ليست مضاعفاً لحجمها (4)\n- سياسة التوجيه الموحدة: لو خرجت شبكة واحدة من الكتلة عبر مسار مختلف (Multihoming) فستضطر لإعلانها منفردة — استثناء يوسّع التجمع (كثرتها في مواقع العملاء المحترفين)\n\nظاهرة عكسية تذكرها هنا: التفصيل المفرط (Route Leaking / De-aggregation) عندما يعلن مزود /24 منفردة بدل /16 — يضخم جداول العالم بلا داعٍ، وحدثت حوادث شهيرة عطّلت أجزاء من الإنترنت.",
          en: "Aggregation is a weapon with two strict conditions; fail them and everything fails:\n\n- Contiguity: you cannot aggregate 192.168.8.0/24 and 192.168.12.0/24 into one /22 — two blocks required\n- Alignment: 192.168.9.0 through 192.168.12.0 cannot form a /22 because the block start (9) is not a multiple of its size (4)\n- Unified routing policy: if one network leaves the block via a different path (multihoming), it must be announced individually — an exception that punches a hole in the aggregate (frequent with professional customer sites)\n\nA reverse phenomenon worth noting: de-aggregation, when a provider announces /24s instead of a /16 — bloating the world's tables for no reason, with famous incidents that broke parts of the Internet.",
        },
      },
    ],
    keyPoints: [
      { ar: "CIDR (1993): القناع عند أي بت، والتخصيص بمقاس الحاجة بالضبط", en: "CIDR (1993): mask at any bit, allocation exactly sized to need" },
      { ar: "التجميع: أربع /24 متجاورة (8-11) = مسار واحد 192.168.8.0/22", en: "Aggregation: four contiguous /24s (8-11) = one route 192.168.8.0/22" },
      { ar: "شرطا التجميع: التجاور والمحاذاة على حدود البادئة", en: "Aggregation conditions: contiguity and prefix-boundary alignment" },
      { ar: "جدول BGP العالمي يتجاوز 900 ألف مسار بفضل التجميع الهرمي", en: "The global BGP table exceeds 900,000 routes thanks to hierarchical aggregation" },
      { ar: "المسار المجمّع يُكتب: ip route 192.168.8.0 255.255.252.0 ...", en: "The aggregate is written: ip route 192.168.8.0 255.255.252.0 ..." },
    ],
    commands: [
      { cmd: "ipcalc 192.168.8.0/22", desc: { ar: "تحقق من مساحة /22: من 192.168.8.0 حتى 192.168.11.255 (1024 عنواناً)", en: "Verify the /22 space: 192.168.8.0 through 192.168.11.255 (1024 addresses)" } },
      { cmd: "ip route add blackhole 192.168.8.0/22", desc: { ar: "إضافة مسار مجمّع على لينكس للاختبار (لصندوق أسود)", en: "Add an aggregate route on Linux for testing (to a blackhole)" } },
      { cmd: "whois -h whois.ripe.net 193.0.0.0/8", desc: { ar: "استعراض كيف تُدار كتل /8 إقليمياً — جذر هرمية التجميع", en: "Explore how /8 blocks are managed regionally — the root of aggregation hierarchy" } },
    ],
    quiz: [
      {
        q: { ar: "أي كتلة تمثل تجميع 192.168.8.0/24 و 192.168.9.0/24 و 192.168.10.0/24 و 192.168.11.0/24؟", en: "Which block aggregates 192.168.8.0/24, 192.168.9.0/24, 192.168.10.0/24, and 192.168.11.0/24?" },
        options: [
          { ar: "192.168.8.0/21", en: "192.168.8.0/21" },
          { ar: "192.168.8.0/22", en: "192.168.8.0/22" },
          { ar: "192.168.0.0/16", en: "192.168.0.0/16" },
          { ar: "192.168.8.0/23", en: "192.168.8.0/23" },
        ],
        correct: 1,
        explain: { ar: "أربع شبكات × 256 = 1024 عنواناً = /22، والخانات الثالثة 8-11 تشترك بأول 6 بتات (000010). /23 يغطي اثنتين فقط و /21 يغطي ثمانياً ويشمل ما ليس لك.", en: "Four networks × 256 = 1024 addresses = /22, and third octets 8-11 share the first 6 bits (000010). /23 covers only two; /21 covers eight, including what is not yours." },
      },
      {
        q: { ar: "متى يتعذر تجميع شبكات متجاورة عددياً؟", en: "When is aggregating numerically contiguous networks impossible?" },
        options: [
          { ar: "أبداً — التجاور يكفي دائماً", en: "Never — contiguity always suffices" },
          { ar: "عندما لا تبدأ الكتلة عند مضاعف لحجمها (فشل المحاذاة)", en: "When the block does not start at a multiple of its size (alignment failure)" },
          { ar: "فقط في IPv6", en: "Only in IPv6" },
          { ar: "عند استخدام بروتوكولات طبقية", en: "When using classful protocols" },
        ],
        correct: 1,
        explain: { ar: "مثال: 192.168.9.0 حتى 192.168.12.0 متجاورة عددياً لكن كتلة /22 يجب أن تبدأ عند مضاعف 4 في الخانة الثالثة (مثل 8)، و 9 ليست كذلك — فلا يوجد /22 واحد يطابقها.", en: "Example: 192.168.9.0 through 192.168.12.0 are numerically contiguous, but a /22 must start at a multiple of 4 in the third octet (like 8); 9 is not — so no single matching /22 exists." },
      },
      {
        q: { ar: "ما الفائدة العملية الأولى من تقليل عدد المسارات في جداول التوجيه؟", en: "What is the first practical benefit of fewer routes in routing tables?" },
        options: [
          { ar: "زيادة سرعة إرسال الحزم", en: "Faster packet forwarding" },
          { ar: "تشفير أقوى للحزم", en: "Stronger packet encryption" },
          { ar: "زيادة عدد المضيفين لكل شبكة", en: "More hosts per network" },
          { ar: "استهلاك أقل للذاكرة والمعالجة وزمن بحث أقصر عند كل جهاز توجيه", en: "Less memory and CPU consumption with shorter lookup time at every router" },
        ],
        correct: 3,
        explain: { ar: "كل مسار يستهلك ذاكرة و معالجة وزمن بحث — تقليل المسارات يقلل الثلاثة معاً في كل الموجّهات الحدودية، ولهذا يُعد التجميع الهرمي فضيلة هندسية.", en: "Every route costs memory, CPU, and lookup time — reducing routes cuts all three at every edge router, which is why hierarchical aggregation is an engineering virtue." },
      },
    ],
  },
  {
    id: "l048",
    moduleId: "m05",
    order: 8,
    level: "intermediate",
    title: { ar: "NAT و PAT: ترجمة العناوين في الواقع العملي", en: "NAT & PAT: Address Translation in the Real World" },
    summary: {
      ar: "الأنواع الثلاثة للترجمة (الثابتة والديناميكية والفائقة)، المصطلحات الأربعة التي تربك الجميع، تكوين Cisco كامل، ولماذا وُجد NAT أصلاً وما ثمنه.",
      en: "The three translation types (static, dynamic, overload), the four terms that confuse everyone, a full Cisco configuration, and why NAT exists at all — and its price.",
    },
    durationMin: 19,
    sections: [
      {
        heading: { ar: "لماذا وُجد NAT؟ المعضلة والسبب", en: "Why NAT Exists: The Crisis and the Cause" },
        body: {
          ar: "معضلة IPv4 بسيطة وقاسية: 32 بتاً = 4.3 مليار عنوان تقريباً، وهو رقم تضخم عن سكان الأرض المتصلين بسرعة في التسعينيات.\n\nبدل تحويل الإنترنت كله إلى IPv6 فوراً (خطوة بطيئة حتى اليوم)، ولدت NAT (Network Address Translation) كحل جسر: ملايين الشبكات الخاصة تشارك عدداً صغيراً من العناوين العامة.\n\nالفكرة الجوهرية: داخل شبكتك تستخدم عناوين RFC 1918 الخاصة (مثل 192.168.1.0/24)، وعند حدود شبكتك يترجم الموجّه العناوين إلى عنوانه العام — والعكس في الاتجاه العائد.\n\n- NAT يعمل في موجّه الحدود (أو جهاز جدار حماية)\n- الترجمة تعتمد على جدول حالة يجمع كل جلسة نشطة\n- منقذ IPv4 بحق: أطال عمره عقوداً كاملة",
          en: "The IPv4 crisis is simple and cruel: 32 bits = about 4.3 billion addresses, a number the connected world outgrew rapidly in the nineties.\n\nInstead of instantly converting the whole Internet to IPv6 (a step still incomplete today), NAT (Network Address Translation) was born as a bridge: millions of private networks share a small pool of public addresses.\n\nThe core idea: inside your network you use private RFC 1918 addresses (like 192.168.1.0/24); at your network edge, the router translates them to its public address — and back on the return path.\n\n- NAT runs on the border router (or firewall appliance)\n- Translation relies on a state table tracking every active session\n- A genuine IPv4 savior: it extended its life by decades",
        },
      },
      {
        heading: { ar: "المصطلحات الأربعة التي يجب أن تتقنها", en: "The Four Terms You Must Master" },
        diagram: {
          kind: "flow",
          title: { ar: "رحلة حزمة عبر ترجمة PAT", en: "A packet's journey through PAT translation" },
          items: [
            { ar: "الحزمة تخرج من الشبكة الداخلية بعنوان خاص", en: "The packet leaves the LAN with a private source" },
            { ar: "الراوتر يستبدل المصدر بعنوانه العام ويسجل الربط بالمنفذ", en: "The router swaps in its public IP and logs the port mapping" },
            { ar: "الخادم البعيد يرد إلى العنوان العام والمنفذ", en: "The remote server replies to the public address and port" },
            { ar: "الراوتر يراجع جدوله ويعيد العنوان الخاص للمستقبِل", en: "The router consults its table and restores the private address" },
          ],
        },
        body: {
          ar: "وثيقة Cisco الشهيرة تصف NAT بأربعة مصطلحات دقيقة — فهمها يحل نصف الالتباس:\n\n- داخلي محلي (Inside Local): عنوان الجهاز كما يراه داخل الشبكة الخاصة — 192.168.1.50 مثلاً\n- داخلي عام (Inside Global): العنوان العام الذي يترجم إليه عنوان الجهاز عند خروجه — 203.0.113.5\n- خارجي محلي (Outside Local): عنوان الخادم الخارجي كما يراه أجهزتك الداخلية — غالباً عنوانه العام نفسه\n- خارجي عام (Outside Global): العنوان الحقيقي للخادم الخارجي — 8.8.8.8 مثلاً\n\nقاعدة فهم سريعة: كلمة داخلي/خارجي تصف مكان الجهاز (داخل شبكتك أم خارجها)، ومحلي/عام تصف كيف يظهر العنوان (خاص أم قابل للتوجيه عاماً).",
          en: "The classic Cisco documentation defines NAT with four precise terms — understanding them dissolves half the confusion:\n\n- Inside Local: the device's address as seen inside the private network — e.g. 192.168.1.50\n- Inside Global: the public address it translates to when leaving — 203.0.113.5\n- Outside Local: the external server's address as your inside devices see it — usually its real public address\n- Outside Global: the external server's true address — e.g. 8.8.8.8\n\nQuick comprehension rule: inside/outside describes where the device lives (in your network or beyond it); local/global describes how the address appears (private or publicly routable).",
        },
        code: {
          lang: "text",
          snippet: "Host 192.168.1.50  -->  Router NAT  -->  Server 8.8.8.8\n   (Inside Local)        (Inside Global)   (Outside Global)\n\nTranslation table example (PAT):\nProto  Inside Local         Inside Global        Outside\nTCP    192.168.1.50:51522   203.0.113.5:51522    8.8.8.8:443\nTCP    192.168.1.61:51522   203.0.113.5:51523    93.184.216.34:443\nUDP    192.168.1.22:5353    203.0.113.5:5353     8.8.8.8:53",
        },
      },
      {
        heading: { ar: "الأنواع الثلاثة: ثابتة، ديناميكية، وفائقة", en: "The Three Types: Static, Dynamic, and Overload" },
        table: {
          caption: { ar: "أنواع NAT ومتى تستخدم كلاً منها", en: "NAT types and when to use each" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "كيف يعمل", en: "How it works" },
            { ar: "الاستخدام الأمثل", en: "Best use" },
          ],
          rows: [
            [
              { ar: "ثابت Static NAT", en: "Static NAT" },
              { ar: "علاقة 1:1 — خادم داخلي بعنوان عام ثابت", en: "A 1:1 mapping — an internal server pinned to one public IP" },
              { ar: "خادم يستقبل اتصالات واردة", en: "A server receiving inbound connections" },
            ],
            [
              { ar: "ديناميكي Dynamic NAT", en: "Dynamic NAT" },
              { ar: "مجموعة عناوين عامة تُخصص من الخزان بالترتيب", en: "A pool of public addresses allocated in turn" },
              { ar: "عدة مستخدمين بلا حاجة لعنوان لكل واحد", en: "Several users without per-user addresses" },
            ],
            [
              { ar: "PAT / Overload", en: "PAT / Overload" },
              { ar: "منفذ مصدر فريد لكل جلسة على عنوان واحد", en: "A unique source port per session on one address" },
              { ar: "الراوتر المنزلي — آلاف الجلسات على IP واحد", en: "The home router — thousands of sessions on one IP" },
            ],
          ],
        },
        body: {
          ar: "NAT الثابت (Static NAT): ترجمة واحد لواحد دائمة — العنوان الخاص 192.168.1.10 يظهر دائماً بالعام 203.0.113.5. الاستخدام: نشر خادم داخلي للعالم الخارجي باتصالات واردة.\n\nNAT الديناميكي (Dynamic NAT): مجموعة عناوين خاصة تترجم إلى مجموعة عامة (Pool) بحسب الطلب — أول مجيء أول ترجمة، وتتحرر الترجمة عند انتهاء الجلسة. عملياً: يستهلك عناوين عامة بعدد المتصلين المتزامنين، لذا نادر اليوم.\n\nPAT (Port Address Translation) — الترجمة الفائقة Overload: العجيبة العملية — آلاف الأجهزة تشارك عنواناً عاماً واحداً عبر تمييز كل جلسة برقم منفذ مصدر مختلف. هذا ما يعمل في راوتر منزلك الآن.\n\n- كيف يميز PAT الجلسات؟ ثنائية (عنوان:منفذ) الداخل والعنوان الخارجي الرباعية\n- عند تصادم منفذين случайно يختار الموجّه منفذاً بديلاً — عنده 64 ألف احتمال لكل عنوان\n- كل الجلسات في جدول ترجمة (Translations Table) له مهلة انتهاء (24 ساعة للـ TCP الافتراضية في Cisco، 60 ثانية DNS... حسب البروتوكول)",
          en: "Static NAT: a permanent one-to-one mapping — private 192.168.1.10 always appears as public 203.0.113.5. Use case: publishing an internal server for inbound connections.\n\nDynamic NAT: a set of private addresses translates into a public pool on demand — first come, first served, freed at session end. Practically: consumes one public address per simultaneous user, hence rare today.\n\nPAT (Port Address Translation) — overload: the practical marvel — thousands of devices share one public address, each session distinguished by a different source port. This is what your home router runs right now.\n\n- How does PAT tell sessions apart? The 4-tuple of (inside address:port) plus the outside destination\n- On a random port collision the router picks another — it has about 64 thousand options per address\n- All sessions live in a translations table with per-protocol timeouts (24 hours for TCP by Cisco default, 60 seconds for DNS...)",
        },
        tip: {
          ar: "المصطلح الشائع في الأدب هو أن NAT العامة تعني اليوم PAT عملياً — عندما تقرأ NAT في راوتر منزلي فالمقصود الترجمة الفائقة بمنافذ مصدر مميزة.",
          en: "In common usage NAT today practically means PAT — when a home router says NAT, it means overload translation with distinct source ports.",
        },
      },
      {
        heading: { ar: "تكوين كامل على Cisco IOS", en: "A Full Configuration on Cisco IOS" },
        body: {
          ar: "لنبنِ سيناريو واقعياً: شبكة داخلية 192.168.1.0/24 تخرج عبر واجهة عامة Serial بعنوان 203.0.113.5، مع خادم ويب داخلي ننشره للعالم:\n\nالخطوة 1: تعريف الواجهات الداخلية والخارجية — NAT يحتاج معرفة الحدودين بوضوح.\n\nالخطوة 2: قائمة وصول تحدد من يحق له الترجمة (الشبكة الداخلية كلها هنا).\n\nالخطوة 3: قاعدة PAT تربط الحركة بالعنوان العام للواجهة مع كلمة overload — البوابة السحرية.\n\nالخطوة 4: ترجمة ثابتة تنشر خادم الويب الداخلي على المنفذ 80 للعام.\n\nاقرأ التكوين في الكود — ولاحظ أن الترتيب يهم: الواجهات أولاً، ثم القوائم، ثم قواعد الترجمة.",
          en: "Let us build a realistic scenario: an inside network 192.168.1.0/24 exits via a public Serial interface with address 203.0.113.5, plus an internal web server published to the world:\n\nStep 1: Define inside and outside interfaces — NAT must clearly know both edges.\n\nStep 2: An access list defining who may be translated (the whole inside network here).\n\nStep 3: The PAT rule binding that traffic to the interface's public address with the overload keyword — the magic gateway.\n\nStep 4: A static translation publishing the internal web server on port 80.\n\nRead the configuration in the code — and note that order matters: interfaces first, then lists, then translation rules.",
        },
        code: {
          lang: "cisco",
          snippet: "Router(config)# interface g0/0\nRouter(config-if)# ip address 192.168.1.1 255.255.255.0\nRouter(config-if)# ip nat inside\n\nRouter(config)# interface serial 0/0/0\nRouter(config-if)# ip address 203.0.113.5 255.255.255.248\nRouter(config-if)# ip nat outside\n\nRouter(config)# access-list 1 permit 192.168.1.0 0.0.0.255\nRouter(config)# ip nat inside source list 1 interface s0/0/0 overload\n\nRouter(config)# ip nat inside source static tcp 192.168.1.10 80 203.0.113.5 80\n\nRouter# show ip nat translations\nPro Inside global      Inside local       Outside local      Outside global\ntcp 203.0.113.5:80     192.168.1.10:80    ---                ---\ntcp 203.0.113.5:51522  192.168.1.50:51522 8.8.8.8:53         8.8.8.8:53",
        },
      },
      {
        heading: { ar: "الثمن الذي ندفعه: ما يكسره NAT", en: "The Price We Pay: What NAT Breaks" },
        body: {
          ar: "NAT ليس حلاً مجانياً — كسر مبدأ TCP/IP الأصيل: الاتصال الطرفي للطرفي (End-to-End):\n\n- التطبيقات النظيرة (P2P): جهازان خلف NAT لا يستطيعان بدء اتصال أحدهما بالآخر مباشرة — ولدت حلول اختراق معقدة (STUN و TURN و ICE)\n- الأمان: يعتمد حماية رصد الحالة فقط — NAT ليس جدار حماية بالمعنى الصحيح ولا يفحص محتوى الحزم\n- التتبع والتدقيق: عنوان عام واحد لآلاف المستخدمين يربك السجلات ويعقّد تحديد المصدر\n- الأداء: كل حزمة تُفحص وتُعدّل وتُعاد حساب ترويستها — حمل معالجة دائم على الحدود\n\nوفي المقابل: أنقذ IPv4 وأخفى الشبكات الداخلية عن المسح الخارجي المباشر. التوازن العملي اليوم: NAT للحياة اليومية، و IPv6 لعالم النهاية-للنهاية الحقيقي — والاثنان يعيشان معاً في شبكاتنا سنوات قادمة.",
          en: "NAT is not free — it broke the founding TCP/IP principle of end-to-end connectivity:\n\n- P2P apps: two devices behind NAT cannot directly initiate connections to each other — complex piercing solutions were born (STUN, TURN, ICE)\n\n- Security: relies purely on stateful inspection luck — NAT is not a firewall in the true sense and never inspects payload\n\n- Traceability: one public address for thousands of users muddles logs and complicates attribution\n\n- Performance: every packet is inspected, rewritten, and re-checksummed — a permanent processing tax at the edge\n\nIn exchange: it rescued IPv4 and hid internal networks from direct external scanning. Today's practical balance: NAT for daily life, IPv6 for a true end-to-end world — both will coexist in our networks for years to come.",
        },
      },
    ],
    keyPoints: [
      { ar: "NAT يترجم العناوين الخاصة إلى عامة عند حدود الشبكة عبر جدول حالة للجلسات", en: "NAT translates private to public addresses at the network edge via a session state table" },
      { ar: "المصطلحات: داخلي محلي/عام وخارجي محلي/عام — موقع الجهاز وطريقة ظهور العنوان", en: "Terms: inside local/global and outside local/global — device location and address appearance" },
      { ar: "PAT يميز الجلسات بمنفذ المصدر: آلاف الأجهزة على عنوان عام واحد", en: "PAT distinguishes sessions by source port: thousands of devices on one public address" },
      { ar: "أوامر القلب: ip nat inside/outside ثم ip nat inside source list 1 interface s0/0/0 overload", en: "Core commands: ip nat inside/outside, then ip nat inside source list 1 interface s0/0/0 overload" },
      { ar: "NAT يكسر الاتصال الطرفي ويعقّد P2P — وليس جدار حماية حقيقياً", en: "NAT breaks end-to-end and complicates P2P — and is not a true firewall" },
    ],
    commands: [
      { cmd: "show ip nat translations", desc: { ar: "عرض جدول الترجمات الحية: الجلسات والمنافذ المترجمة", en: "Show the live translations table: sessions and translated ports" } },
      { cmd: "show ip nat statistics", desc: { ar: "إحصاءات NAT: عدد الترجمات النشطة والضائعة والتجاوزات", en: "NAT statistics: active translations, misses, and overflows" } },
      { cmd: "clear ip nat translation *", desc: { ar: "مسح جدول الترجمات عند التعديل أو استكشاف خلل (يفصل الجلسات النشطة!)", en: "Flush the translations table after changes or troubleshooting (drops active sessions!)" } },
    ],
    quiz: [
      {
        q: { ar: "كيف يميز PAT اتصالين خرجا من نفس العنوان العام في اللحظة نفسها؟", en: "How does PAT distinguish two connections leaving the same public address simultaneously?" },
        options: [
          { ar: "بعنوان MAC مختلف لكل اتصال", en: "By a different MAC address per connection" },
          { ar: "برقم منفذ مصدر مختلف لكل جلسة في جدول الترجمات", en: "By a distinct source port per session in the translations table" },
          { ar: "بترميز معلومات في حقل TTL", en: "By encoding information in the TTL field" },
          { ar: "لا يمكنه التمييز — تتعارض الجلستان", en: "It cannot — the two sessions collide" },
        ],
        correct: 1,
        explain: { ar: "كل جلسة تسجل برباعية (عنوان داخلي:منفذ ← عنوان عام:منفذ ← وجهة)، وينشئ PAT منفذ مصدر فريداً عند التصادم — نحو 64 ألف احتمال متاح.", en: "Each session records a 4-tuple (inside addr:port → global addr:port → destination), and PAT assigns a unique source port on collision — with about 64 thousand options available." },
      },
      {
        q: { ar: "عنوان 192.168.1.50 وهو يتصل بخادم خارجي — كيف يسمى في اصطلاح NAT؟", en: "The address 192.168.1.50 as it connects outward — what is it called in NAT terminology?" },
        options: [
          { ar: "Inside Global", en: "Inside Global" },
          { ar: "Outside Local", en: "Outside Local" },
          { ar: "Inside Local", en: "Inside Local" },
          { ar: "Outside Global", en: "Outside Global" },
        ],
        correct: 2,
        explain: { ar: "الجهاز داخل الشبكة الخاصة وعنوانه كما يظهر داخلياً = Inside Local. أما العنوان العام المترجم (203.0.113.5) فيسمى Inside Global.", en: "A device inside the private network, addressed as seen internally = Inside Local. Its translated public address (203.0.113.5) is the Inside Global." },
      },
      {
        q: { ar: "تريد نشر خادم ويب داخلي ليصل إليه المستخدمون من الإنترنت. أي نوع NAT تستخدم؟", en: "You want to publish an internal web server for Internet users. Which NAT type do you use?" },
        options: [
          { ar: "PAT الفائق فقط", en: "Overload PAT only" },
          { ar: "NAT الديناميكي بمجموعة عناوين", en: "Dynamic NAT with a pool" },
          { ar: "NAT الثابت (Static) للمنفذ أو العنوان", en: "Static NAT for the port or address" },
          { ar: "NAT غير ممكن لهذه الحالة", en: "NAT is impossible for this case" },
        ],
        correct: 2,
        explain: { ar: "الوارد يحتاج ترجمة ثابتة معروفة مسبقاً: ip nat inside source static tcp 192.168.1.10 80 203.0.113.5 80 — الترجمة الديناميكية عشوائية ولا يعرف الخارج أين يتصل.", en: "Inbound needs a pre-known fixed mapping: ip nat inside source static tcp 192.168.1.10 80 203.0.113.5 80 — dynamic translation is unpredictable, leaving the outside unsure where to connect." },
      },
    ],
  },
  {
    id: "l049",
    moduleId: "m05",
    order: 9,
    level: "intermediate",
    title: { ar: "IPv6: البنية وأنواع العناوين", en: "IPv6: Anatomy & Address Types" },
    summary: {
      ar: "قراءة عنوان الـ 128 بتاً وقواعد الاختصار خطوة خطوة، وأنواع العناوين الستة من العام إلى ربط المحلي، وكيف يولّد الجهاز معرفه الفريد بلا DHCP.",
      en: "Reading the 128-bit address and compression rules step by step, the six address types from global to link-local, and how a device builds its unique ID without DHCP.",
    },
    durationMin: 17,
    sections: [
      {
        heading: { ar: "من 32 إلى 128 بتاً: لعبة الأرقام الجديدة", en: "From 32 to 128 Bits: The New Numbers Game" },
        table: {
          caption: { ar: "IPv4 مقابل IPv6: الفروقات الجوهرية", en: "IPv4 vs IPv6: the essential differences" },
          headers: [
            { ar: "المعيار", en: "Criterion" },
            { ar: "IPv4", en: "IPv4" },
            { ar: "IPv6", en: "IPv6" },
          ],
          rows: [
            [
              { ar: "طول العنوان", en: "Address length" },
              { ar: "32 بتاً", en: "32 bits" },
              { ar: "128 بتاً", en: "128 bits" },
            ],
            [
              { ar: "الكتابة", en: "Notation" },
              { ar: "عشري منقط 192.168.1.1", en: "Dotted decimal 192.168.1.1" },
              { ar: "سداسي عشري بمجموعات 2001:db8::1", en: "Hex groups 2001:db8::1" },
            ],
            [
              { ar: "الترويسة", en: "Header" },
              { ar: "20-60 بايتاً مع خيارات", en: "20-60 bytes with options" },
              { ar: "40 بايتاً ثابتة مبسطة", en: "A fixed simplified 40 bytes" },
            ],
            [
              { ar: "التهيئة", en: "Configuration" },
              { ar: "يدوي أو DHCP", en: "Manual or DHCP" },
              { ar: "تلقائية SLAAC + DHCPv6 اختياري", en: "Automatic SLAAC + optional DHCPv6" },
            ],
            [
              { ar: "البث العام", en: "Broadcast" },
              { ar: "موجود ويصل الجميع", en: "Exists and reaches everyone" },
              { ar: "لا يوجد — بث متعدد بدلاً منه", en: "None — multicast instead" },
            ],
            [
              { ar: "دعم IPsec", en: "IPsec" },
              { ar: "اختياري", en: "Optional" },
              { ar: "مصمم ليكون أصلياً وداعماً", en: "Designed-in and supported natively" },
            ],
          ],
        },
        body: {
          ar: "IPv6 عنوان من 128 بتاً — العدد 2^128 ≈ 340 undecillion (3.4×10^38)، أي 340 مليار مليار مليار مليار عنوان: ما يكفي لعنوان لكل حبة رمل على الأرض مرات عدة، وبفائض هائل.\n\nنكتب العنوان في 32 خانة سداسية عشر (0-9 و a-f) مقسمة إلى 8 مجموعات رباعية تسمى (Hextets) تفصلها نقطتان:\n\n2001:0db8:0000:0000:0000:ff00:0042:8329\n\nكل مجموعة أربعة خانات سداسية = 16 بتاً (لأن كل خانة 4 بتات). المجموعات الثماني × 16 بتاً = 128 بتاً بالضبط.\n\n- تُكتب الخانات بأحرف صغيرة عرفاً (a وليس A)\n- كل خانة سداسية قيمتها 0-15\n- البادئة القياسية للشبكات المحلية /64 — النصف الأول شبكة والنصف الثاني معرف واجهة",
          en: "An IPv6 address is 128 bits — the number 2^128 ≈ 340 undecillion (3.4×10^38), enough to address every grain of sand on Earth many times over, with room to spare.\n\nWe write it as 32 hexadecimal digits (0-9, a-f) split into eight groups of four called hextets, separated by colons:\n\n2001:0db8:0000:0000:0000:ff00:0042:8329\n\nEach hextet is four hex digits = 16 bits (each digit is 4 bits). Eight groups × 16 bits = exactly 128 bits.\n\n- Digits are lowercase by convention (a, not A)\n- Each hex digit ranges 0-15\n- The standard LAN prefix is /64 — first half network, second half interface ID",
        },
      },
      {
        heading: { ar: "قاعدتا الاختصار: إتقان الكتابة", en: "The Two Compression Rules: Writing Mastery" },
        body: {
          ar: "العنوان الكامل مرهق، والإنترنت يكتب IPv6 بقاعدتين للاختصار:\n\nالقاعدة 1 — حذف الأصفار البادئة في كل مجموعة: كل مجموعة تحذف أصفارها اليسرى حتى تبقى خانة واحدة على الأقل. المجموعة 0db8 تصير db8، و 0042 تصير 42، و 0000 تبقى 0.\n\nالقاعدة 2 — استبدال أطول تسلسل مجموعات صفرية متتالية بـ (::) — مرة واحدة فقط في العنوان كله:\n\n2001:0db8:0000:0000:0000:ff00:0042:8329 → 2001:db8::ff00:42:8329\n\nتحذير السؤال المحبوب في الامتحانات: (::) مرة واحدة فقط. عنوان مثل 2001::db8::1 غير قانوني — أي التسلسل أطول؟ التباس يمنع المسك!\n\n- عنوان السلسلة (Loopback) ::1 = كامل الشكل 0000:...:0001\n- العنوان غير المحدد :: = كل الأصفار (يستخدمه المضيف قبل حصوله على عنوان)",
          en: "The full form is tedious, so IPv6 is written with two compression rules:\n\nRule 1 — drop leading zeros in each hextet: trim left zeros per hextet, keeping at least one digit. 0db8 becomes db8, 0042 becomes 42, 0000 stays 0.\n\nRule 2 — replace the longest run of consecutive zero hextets with :: — once only per address:\n\n2001:0db8:0000:0000:0000:ff00:0042:8329 → 2001:db8::ff00:42:8329\n\nA beloved exam warning: :: appears once only. An address like 2001::db8::1 is illegal — which run is longer? Ambiguity breaks parsing!\n\n- Loopback ::1 = full form 0000:...:0001\n- The unspecified address :: = all zeros (used before a host gains an address)",
        },
        code: {
          lang: "text",
          snippet: "Full:      2001:0db8:0000:0000:0000:ff00:0042:8329\nRule 1:    2001:db8:0:0:0:ff00:42:8329\nRule 2:    2001:db8::ff00:42:8329   (3 zero hextets replaced)\n\nfe80:0000:0000:0000:0a00:27ff:fe5b:8a2c\nfe80::a00:27ff:fe5b:8a2c\n\nLoopback:  0000:0000:0000:0000:0000:0000:0000:0001  =  ::1\nAll-zero:  0000:0000:0000:0000:0000:0000:0000:0000  =  ::",
        },
      },
      {
        heading: { ar: "أنواع العناوين: تعرف على السكان", en: "Address Types: Meet the Residents" },
        table: {
          caption: { ar: "أنواع عناوين IPv6", en: "IPv6 address types" },
          headers: [
            { ar: "النوع", en: "Type" },
            { ar: "البادئة", en: "Prefix" },
            { ar: "الاستخدام", en: "Use" },
          ],
          rows: [
            [
              { ar: "عام قابل للتوجيه GUA", en: "Global unicast (GUA)" },
              { ar: "2000::/3", en: "2000::/3" },
              { ar: "المكافئ للعنوان العام في IPv4", en: "The IPv4 public-address equivalent" },
            ],
            [
              { ar: "ربط محلي Link-Local", en: "Link-local" },
              { ar: "FE80::/10", en: "FE80::/10" },
              { ar: "التخاطب داخل الوصلة — موجود دائماً على كل واجهة", en: "On-link talk — present on every interface" },
            ],
            [
              { ar: "محلي فريد ULA", en: "Unique local (ULA)" },
              { ar: "FC00::/7 (FD00 عملياً)", en: "FC00::/7 (FD00 in practice)" },
              { ar: "المكافئ لنطاقات RFC 1918 الخاصة", en: "The RFC 1918 private equivalent" },
            ],
            [
              { ar: "بث متعدد Multicast", en: "Multicast" },
              { ar: "FF00::/8", en: "FF00::/8" },
              { ar: "بديل البث — لا يوجد بث عام في IPv6", en: "Replaces broadcast — no broadcast in IPv6" },
            ],
            [
              { ar: "Loopback", en: "Loopback" },
              { ar: "::1/128", en: "::1/128" },
              { ar: "اختبار المكدس داخلياً", en: "Internal stack testing" },
            ],
          ],
        },
        body: {
          ar: "IPv6 نظّم أنواع العناوين ببادئات دقيقة — تعلمها كجدول جيوب:\n\n- GUA (Global Unicast): 2000::/3 — أي 2000 حتى 3fff كبداية — المعادل لعنوان IPv4 العام، قابل للتوجيه عالمياً\n- Link-Local: fe80::/10 — يعمل على القسم المحلي فقط ولا يعبر موجّهاً أبداً — إلزامي لكل واجهة IPv6 لعمليات مثل اكتشاف الجيران NDP\n- ULA (Unique Local): fc00::/7 عملياً fd00::/8 — المعادل الخاص لـ RFC 1918، بمعرف شبه عشوائي 40 بتاً\n- Multicast: ff00::/8 — البث المتعدد (لا بث عام في IPv6 — البث أُلغي وحُلّ محلّه بالبث المتعدد)\n- Loopback: ::1 — الاختبار المحلي\n- Anycast: يُخصص من نطاق GUA لكن يوجّه لأقرب عقدة تحمل العنوان نفسه — تستخدمه جذور DNS\n\nلاحظ اختلافاً جذرياً عن IPv4: الواجهة الواحدة تحمل عدة عناوين قانونياً في آن واحد — عادةً GUA و Link-Local معاً.",
          en: "IPv6 organized address types on precise prefixes — learn them as a pocket table:\n\n- GUA (Global Unicast): 2000::/3 — i.e. 2000 through 3fff as the leading hextet — the IPv4-public equivalent, globally routable\n- Link-Local: fe80::/10 — works on the local segment only, never crosses a router — mandatory on every IPv6 interface for protocols like NDP neighbor discovery\n- ULA (Unique Local): fc00::/7, practically fd00::/8 — the RFC 1918 private equivalent, with a 40-bit pseudo-random ID\n- Multicast: ff00::/8 — group traffic (no broadcast in IPv6 — it was abolished and replaced by multicast)\n- Loopback: ::1 — local testing\n- Anycast: allocated from GUA space but routed to the nearest node holding the same address — used by DNS roots\n\nNote a radical difference from IPv4: one interface legally holds several addresses at once — typically a GUA and a Link-Local together.",
        },
        code: {
          lang: "text",
          snippet: "Type            Prefix        Scope            IPv4 analogy\nGlobal Unicast   2000::/3      Internet         Public IP\nLink-Local       fe80::/10     One segment      169.254.0.0/16\nUnique Local     fd00::/8      Site (private)   10.0.0.0/8 etc\nMulticast        ff00::/8      Group            224.0.0.0/4\nLoopback         ::1           Host itself      127.0.0.1\nUnspecified      ::            No address yet   0.0.0.0\nAnycast          from GUA      Nearest node     (no analog)",
        },
        tip: {
          ar: "سهل التذكر: fe80 = فئة محلية للربط، fd00 = خاصة للموقع، 2000-3fff = عام. أما البث العام (Broadcast) في IPv6 فميت — كل ما كان بثاً صار بثاً متعدداً موجهاً.",
          en: "Easy recall: fe80 = link-local, fd00 = site-private, 2000-3fff = global. And broadcast is dead in IPv6 — everything broadcast did became targeted multicast.",
        },
      },
      {
        heading: { ar: "كيف يحصل الجهاز على عنوانه؟", en: "How a Device Gets Its Address" },
        body: {
          ar: "IPv6 يقدم ثلاث طرق، والرائع أن أولها لا يحتاج خادماً أصلاً:\n\n- SLAAC (Stateless Autoconfiguration): الموجّه يعلن بادئة الشبكة في رسائل Router Advertisement، والجهاز يكمل النصف الثاني بمعرف واجهة من عنده — لا خادم ولا حالة تُدار\n- DHCPv6: النسخة المُدارة بالكامل — الخادم يوزع العناوين والإعدادات كما يعرف من IPv4، وتستخدم عندما تريد مركزية السيطرة\n- يدوي: تعيين ثابت للخوادم والبنى الحساسة\n\nمعرف الواجهة (64 بتاً) يتولد بطريقتين:\n\n- EUI-64: من عنوان MAC — نُدخل ff:fe وسط العنوان ونقلب البت السابع: MAC 00:a0:27:5b:8a:2c يصير 02a0:27ff:fe5b:8a2c\n- عشوائي مؤقت (Privacy Extensions): يولد معرفاً عشوائياً يتبدل دورياً لحماية الخصوصية من التتبع — هو الافتراضي في الأنظمة الحديثة",
          en: "IPv6 offers three methods, and beautifully the first needs no server at all:\n\n- SLAAC (Stateless Address Autoconfiguration): the router announces the network prefix in Router Advertisement messages, and the device completes the second half with its own interface ID — no server, no managed state\n- DHCPv6: the fully managed version — the server hands out addresses and settings as IPv4 taught us, used when you want central control\n- Manual: static assignment for servers and sensitive infrastructure\n\nThe 64-bit interface ID is generated two ways:\n\n- EUI-64: from the MAC address — insert ff:fe in the middle and flip the seventh bit: MAC 00:a0:27:5b:8a:2c becomes 02a0:27ff:fe5b:8a2c\n- Temporary random (privacy extensions): a rotating random ID protecting against tracking — the default on modern systems",
        },
        code: {
          lang: "bash",
          snippet: "$ ip -6 addr show eth0\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet6 2001:db8:cafe:1:2a0:27ff:fe5b:8a2c/64 scope global dynamic\n       valid_lft 2591940sec preferred_lft 604140sec\n    inet6 fe80::2a0:27ff:fe5b:8a2c/64 scope link\n\n# EUI-64 from MAC 00:a0:27:5b:8a:2c:\n#  00a0:27 ff:fe 5b:8a2c  -> flip 7th bit of first octet\n#  00 = 00000000 -> 00000010 = 02\n#  result: 02a0:27ff:fe5b:8a2c",
        },
      },
    ],
    keyPoints: [
      { ar: "IPv6 = 128 بتاً مكتوبة في 8 مجموعات سداسية رباعية (2^128 ≈ 3.4×10^38 عنواناً)", en: "IPv6 = 128 bits written as eight hex hextets (2^128 ≈ 3.4×10^38 addresses)" },
      { ar: "الاختصار: حذف الأصفار البادئة لكل مجموعة + (::) مرة واحدة لأطول تسلسل صفري", en: "Compression: trim leading zeros per hextet + one :: for the longest zero run" },
      { ar: "2000::/3 عام، fe80::/10 للربط المحلي، fd00::/8 خاص، ff00::/8 بث متعدد، ::1 اختبار", en: "2000::/3 global, fe80::/10 link-local, fd00::/8 unique-local, ff00::/8 multicast, ::1 loopback" },
      { ar: "لا بث عام في IPv6 — استُبدل بالبث المتعدد الموجه", en: "No broadcast in IPv6 — replaced by directed multicast" },
      { ar: "SLAAC: الموجّه يعلن البادئة والجهاز يبني معرفه (EUI-64 أو عشوائي) بلا خادم", en: "SLAAC: router announces the prefix, device builds its ID (EUI-64 or random), no server" },
    ],
    commands: [
      { cmd: "ip -6 addr show", desc: { ar: "عرض عناوين IPv6 لواجهاتك: العام والربط المحلي وطريقة توليدها", en: "Show your IPv6 addresses: global, link-local, and generation method" } },
      { cmd: "ping6 ::1", desc: { ar: "اختبار مجموعة IPv6 في جهازك — نظير ping 127.0.0.1", en: "Test your device's IPv6 stack — the ping 127.0.0.1 equivalent" } },
      { cmd: "ip -6 route show", desc: { ar: "عرض مسارات IPv6 والبوابة الافتراضية عبر عنوان ربط محلي", en: "Show IPv6 routes and the default gateway via link-local" } },
    ],
    quiz: [
      {
        q: { ar: "العنوان 2001:0db8:0000:0000:0000:0000:0042:8329 — ما اختصاره الصحيح؟", en: "The address 2001:0db8:0000:0000:0000:0000:0042:8329 — what is its correct compressed form?" },
        options: [
          { ar: "2001:db8::42:8329", en: "2001:db8::42:8329" },
          { ar: "2001:db8::::42:8329", en: "2001:db8::::42:8329" },
          { ar: "2001::db8::42:8329", en: "2001::db8::42:8329" },
          { ar: "2001:db8:0:0:0:0:42:8329 لا يمكن اختصاره", en: "2001:db8:0:0:0:0:42:8329 cannot be compressed" },
        ],
        correct: 0,
        explain: { ar: "حذف الأصفار البادئة (0db8 → db8 و 0042 → 42) ثم استبدال التسلسل الصفري المتتالي الأطول (خمس مجموعات صفرية) بعلامة :: مرة واحدة فقط.", en: "Trim leading zeros (0db8 → db8, 0042 → 42), then replace the longest consecutive zero run (five zero hextets) with a single ::." },
      },
      {
        q: { ar: "أي بادئة تمثل عناوين ربط محلي (Link-Local) في IPv6؟", en: "Which prefix denotes link-local addresses in IPv6?" },
        options: [
          { ar: "2000::/3", en: "2000::/3" },
          { ar: "fe80::/10", en: "fe80::/10" },
          { ar: "fd00::/8", en: "fd00::/8" },
          { ar: "ff00::/8", en: "ff00::/8" },
        ],
        correct: 1,
        explain: { ar: "fe80::/10 للربط المحلي: لا يعبر موجّهاً ويلزم لكل واجهة IPv6. 2000::/3 عام و fd00::/8 خاص و ff00::/8 بث متعدد.", en: "fe80::/10 is link-local: never crosses a router and is mandatory on every IPv6 interface. 2000::/3 is global, fd00::/8 unique-local, ff00::/8 multicast." },
      },
      {
        q: { ar: "عند توليد معرف EUI-64 من MAC 00:1A:2B:3C:4D:5E، ما معرف الواجهة الناتج؟", en: "Generating an EUI-64 ID from MAC 00:1A:2B:3C:4D:5E, what is the resulting interface ID?" },
        options: [
          { ar: "001a:2bff:fe3c:4d5e", en: "001a:2bff:fe3c:4d5e" },
          { ar: "021a:2bff:fe3c:4d5e", en: "021a:2bff:fe3c:4d5e" },
          { ar: "021a:2b3c:4d5e:0000", en: "021a:2b3c:4d5e:0000" },
          { ar: "fe80:001a:2bff:fe3c", en: "fe80:001a:2bff:fe3c" },
        ],
        correct: 1,
        explain: { ar: "نفصل النصفين: 001a:2b و 3c:4d5e، ندرج ff:fe بينهما: 001a:2bff:fe3c:4d5e، ثم نقلب البت السابع من 00 (00000010 = 02) فيصير 021a:2bff:fe3c:4d5e.", en: "Split the halves: 001a:2b and 3c:4d5e; insert ff:fe between: 001a:2bff:fe3c:4d5e; then flip the seventh bit of 00 (00000010 = 02), giving 021a:2bff:fe3c:4d5e." },
      },
    ],
  },
  {
    id: "l050",
    moduleId: "m05",
    order: 10,
    level: "intermediate",
    title: { ar: "تقسيم IPv6 و الانتقال التدريجي من IPv4", en: "IPv6 Subnetting & the Transition from IPv4" },
    summary: {
      ar: "فلسفة التقسيم بالنيبل وهرمية /48 و /64، وتكوين IPv6 مزدوج التكديس على Cisco، وآليات الانتقال: الأنفاق و NAT64 و DS-Lite.",
      en: "Nibble-based subnetting philosophy, the /48 and /64 hierarchy, dual-stack configuration on Cisco, and transition mechanisms: tunnels, NAT64, and DS-Lite.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "هرمية توزيع IPv6: من RIRO إلى واجهتك", en: "The IPv6 Allocation Hierarchy: From RIR to Your Interface" },
        body: {
          ar: "IPv6 لا يعاني ندرة، لذا فلسفة التقسيم فيه معاكسة تماماً لـ IPv4: وفرة سخية بدل تقتير محنّك.\n\nالهرمية القياسية:\n\n- RIRO (السلطة الإقليمية) تمنح المزود /12 أو أقصر\n- المزود يمنح العميل عادة /48 (نطاق الموقع Site)\n- داخل /48 لديك 16 بتاً لمعرف الشبكة الفرعية (Subnet ID) = 65,536 شبكة فرعية\n- كل شبكة فرعية /64 بالضبط: 18,446,744,073,709,551,616 عنواناً لكل منها\n\nقاعدة صارمة يجب التقيد بها: الشبكة المحلية دائماً /64 — لا تجمّل نفسك وتقتطع /72 أو /80 لأشخاص يفعلونها بعقلية IPv4! SLAAC يعتمد بنية /64 (معرف واجهة 64 بتاً)، وكسر القاعدة يكسر التوليف الآلي وخدمات عديدة معه.",
          en: "IPv6 suffers no scarcity, so its subnetting philosophy is the exact opposite of IPv4's: generous abundance instead of clever rationing.\n\nThe standard hierarchy:\n\n- The RIR grants an ISP a /12 or shorter\n- The ISP grants a customer typically a /48 (the site scope)\n- Inside your /48 you hold 16 bits of subnet ID = 65,536 subnets\n- Every subnet is exactly /64: 18,446,744,073,709,551,616 addresses each\n\nOne strict rule to live by: LANs are always /64 — do not outsmart yourself by carving /72 or /80 like an IPv4 mindset! SLAAC depends on the /64 structure (a 64-bit interface ID), and breaking the rule breaks autoconfiguration and many services with it.",
        },
      },
      {
        heading: { ar: "التقسيم بالنيبل: حساب في أربع بتات", en: "Nibble Subnetting: Counting in Fours" },
        body: {
          ar: "التقسيم في IPv6 لعبة أنيقة: تعمل دائماً بـ (النيبل) = 4 بتات = خانة سداسية واحدة، لأن كل خانة في العنوان تمثل 4 بتات بالضبط.\n\nمن /48 إلى /64: 16 بتاً من معرف الشبكة الفرعية — أربع خانات سداسية (xxxx). خطوات التقسيم المريحة: /48 ← /52 ← /56 ← /60 ← /64، كل خطوة خانة سداسية إضافية.\n\nمثال محسوب: الموقع 2001:db8:cafe::/48 ومعرف الشبكة 0001 يعطي الشبكة 2001:db8:cafe:1::/64 — و 0010 يعطي 2001:db8:cafe:10::/64 و a تعطي 2001:db8:cafe:a::/64.\n\nلاحظ الاناقة: عدّ الشبكات الفرعية بالسداسي عشر العادي (1، 2، 3... 9، a، b... f)، وتستطيع ترقيم الطوابق أو الفروع بالخانات نفسها بلا تحويل ثنائي إطلاقاً — التقسيم هنا عدّ سداسي صريح.",
          en: "IPv6 subnetting is an elegant game: you always work in nibbles = 4 bits = one hex digit, since each address digit is exactly 4 bits.\n\nFrom /48 to /64: 16 bits of subnet ID — four hex digits (xxxx). The comfortable division steps: /48 → /52 → /56 → /60 → /64, each step one extra hex digit.\n\nWorked example: site 2001:db8:cafe::/48 with subnet ID 0001 gives network 2001:db8:cafe:1::/64 — and 0010 gives 2001:db8:cafe:10::/64, while a gives 2001:db8:cafe:a::/64.\n\nNote the elegance: counting subnets is plain hexadecimal (1, 2, 3... 9, a, b... f); you can number floors or branches in those same digits with zero binary conversion — subnetting here is straightforward hex counting.",
        },
        code: {
          lang: "text",
          snippet: "Site prefix:        2001:db8:cafe::/48\nSubnet ID field:    2001:db8:cafe:[xxxx]::/64  (16 bits, 4 hex digits)\n\nSimple scheme (nibble 1 = first subnet digit):\n  2001:db8:cafe:0001::/64  -> 2001:db8:cafe:1::/64   (Sales, floor 1)\n  2001:db8:cafe:0002::/64  -> 2001:db8:cafe:2::/64   (Engineering)\n  2001:db8:cafe:000a::/64  -> 2001:db8:cafe:a::/64   (IT, floor 10)\n  2001:db8:cafe:00ff::/64  -> 2001:db8:cafe:ff::/64  (Lab 255)\n\nTotal subnets available in a /48: 16^4 = 65,536",
        },
        tip: {
          ar: "خطط ترقيم ذكي دلالي: الخانة الأولى طابق، الثانية دور القسم — شبكة 2001:db8:cafe:21::/64 تعني الطابق الثاني القسم الأول، وستشكرك إدارة العمليات لاحقاً.",
          en: "Design semantic numbering: first digit floor, second department role — 2001:db8:cafe:21::/64 reads as floor 2, department 1. Future operations teams will thank you.",
        },
      },
      {
        heading: { ar: "التكديس المزدوج: تكوين IPv6 على الموجّه", en: "Dual Stack: Configuring IPv6 on the Router" },
        body: {
          ar: "أشهر آليات الانتقال وأفضلها: التكديس المزدوج (Dual Stack) — تفعيل البروتوكولين معاً على الجهاز نفسه، وتفضل التطبيقات IPv6 عندما يتوفر.\n\nعلى Cisco IOS الخطوات ثلاث:\n\n- تفعيل توجيه IPv6 عالمياً: ipv6 unicast-routing — بلا هذا الأمر يبقى الموجّه مضيفاً لا موجّهاً\n- تعيين العناوين على الواجهات — معروفاً: العام /64 والربط المحلي fe80 يُنشأ تلقائياً\n- إضافة مسار افتراضي عبر البوابة العليا\n\nبعد التهيئة سيعمل الجهاز بالبروتوكولين: يستقبل RA ويعلن البادئات، ويجيب على ping6 و ssh بالنسختين معاً. الأدوات المرافقة في لينكس: ip -6 addr و ip -6 route.",
          en: "The most common and best transition mechanism: dual stack — running both protocols on the same device, with applications preferring IPv6 when available.\n\nOn Cisco IOS, three steps:\n\n- Enable IPv6 routing globally: ipv6 unicast-routing — without it the router stays a host, not a router\n- Assign addresses on interfaces — typically the /64 global; the fe80 link-local generates itself\n- Add a default route toward the upstream gateway\n\nAfter configuration the device speaks both stacks: receives RAs, announces prefixes, answers ping6 and ssh in either family. Companion Linux tools: ip -6 addr and ip -6 route.",
        },
        code: {
          lang: "cisco",
          snippet: "Router(config)# ipv6 unicast-routing\n\nRouter(config)# interface g0/0\nRouter(config-if)# ipv6 address 2001:db8:cafe:1::1/64\nRouter(config-if)# ipv6 address fe80::1 link-local\nRouter(config-if)# no shutdown\n\nRouter(config)# interface g0/1\nRouter(config-if)# ipv6 address 2001:db8:cafe:2::1/64\n\nRouter(config)# ipv6 route ::/0 2001:db8:cafe:ff::1\n\nRouter# show ipv6 interface brief\nGigabitEthernet0/0   [up/up]\n    2001:db8:cafe:1::1\n    FE80::1\nGigabitEthernet0/1   [up/up]\n    2001:db8:cafe:2::1",
        },
      },
      {
        heading: { ar: "آليات الانتقال الأخرى: الأنفاق والترجمة", en: "Other Transition Mechanisms: Tunnels & Translation" },
        body: {
          ar: "لا تعيش كل الشبكات مزدوجة التكديس بعد — بينها وبين IPv6 النقي جسور مؤقتة:\n\n- أنفاق مُدارة يدوياً (6in4): تغليف حزم IPv6 داخل IPv4 بين موجّهين — بسيطة وثابتة، تحتاج عناوين IPv4 طرفية عامة\n- 6to4 و Teredo: أنفاق آلية — Teredo انتهى عملياً بعد انتشار IPv6 الأصيل\n- DS-Lite: العميل يشغل IPv6 داخلياً والتوجيه يُغلف IPv4 فوقه في مزود الخدمة — عكس الأنفاق القديمة، لأن المستقبل هو IPv6\n- NAT64 + DNS64: للشبكات IPv6-Native التي تريد الوصول لخوادم IPv4 فقط: يُصطنع عنواناً عاماً بالبادئة المعروفة 64:ff9b::/96 يُرمّز فيه عنوان IPv4، ويترجمة الجهاز الحدودي\n\nالأفق عملياً: نسبة حركة IPv6 في الإنترنت تجاوزت 40% وتنمو باطّراد، والشبكات الكبرى تشغّل مزدوجاً منذ سنوات — والتكديس المزدوج يبقى الإستراتيجية الموصى بها لأي شبكة جديدة اليوم.",
          en: "Not every network runs dual stack yet — between them and native IPv6 stand temporary bridges:\n\n- Manually managed tunnels (6in4): encapsulating IPv6 packets inside IPv4 between two routers — simple and static, needing public IPv4 endpoints\n- 6to4 and Teredo: automatic tunnels — Teredo is practically extinct after native IPv6 spread\n- DS-Lite: the customer runs IPv6 internally and IPv4 rides over it at the provider — the reverse of old tunnels, because the future is IPv6\n- NAT64 + DNS64: for IPv6-native networks needing IPv4-only servers: DNS64 synthesizes AAAA records under the well-known prefix 64:ff9b::/96 encoding the IPv4 address, and the border device translates\n\nThe practical horizon: IPv6 traffic on the Internet has passed 40% and grows steadily; large networks have run dual stack for years — and dual stack remains the recommended strategy for any new network today.",
        },
        tip: {
          ar: "أدواتك الفورية: موقع test-ipv6.com يخبرك بنوعية جاهزيتك للانتقال، و traceroute6 أو tracert -6 يعرض مسار IPv6 الفعلي — جربهما الآن وقارن المسارين.",
          en: "Your immediate tools: test-ipv6.com reports your transition readiness, and traceroute6 or tracert -6 shows the actual IPv6 path — try both now and compare the two paths.",
        },
      },
    ],
    keyPoints: [
      { ar: "الهرمية: /48 للموقع، 16 بتاً لمعرف الشبكة الفرعية = 65,536 شبكة، كل منها /64", en: "Hierarchy: /48 per site, 16-bit subnet ID = 65,536 subnets, each a /64" },
      { ar: "الشبكة المحلية دائماً /64 — SLAAC يعتمد بنية معرف الواجهة 64 بتاً", en: "LANs are always /64 — SLAAC depends on the 64-bit interface ID structure" },
      { ar: "التقسيم بالنيبل (4 بتات): عدّ الشبكات سداسياً مباشراً بلا ثنائي", en: "Nibble (4-bit) subnetting: counting subnets in plain hex, no binary" },
      { ar: "التكديس المزدوج: ipv6 unicast-routing ثم عناوين الواجهات ثم ::/0", en: "Dual stack: ipv6 unicast-routing, then interface addresses, then ::/0" },
      { ar: "NAT64 + DNS64 بالبادئة 64:ff9b::/96 يصلون شبكات IPv6 بخوادم IPv4 فقط", en: "NAT64 + DNS64 with prefix 64:ff9b::/96 bridges IPv6 networks to IPv4-only servers" },
    ],
    commands: [
      { cmd: "ip -6 route show", desc: { ar: "فحص مسارات IPv6 وبوابتك الافتراضية (::/0) في لينكس", en: "Inspect IPv6 routes and your default gateway (::/0) on Linux" } },
      { cmd: "ping -6 2001:db8:cafe:2::1", desc: { ar: "اختبار الوصول لبوابة قسم ثانٍ داخل شبكة IPv6", en: "Test reachability to a second department's gateway in IPv6" } },
      { cmd: "traceroute6 google.com", desc: { ar: "تتبع المسار الكامل عبر IPv6 نحو خدمة عامة", en: "Trace the full IPv6 path toward a public service" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا يُنصح بجعل كل شبكة IPv6 محلية بادئة /64 دائماً؟", en: "Why should every IPv6 LAN always use a /64 prefix?" },
        options: [
          { ar: "لأنه الحد الأقصى الذي تدعمه الموجّهات", en: "Because it is the maximum routers support" },
          { ar: "لأن SLAAC وبروتوكولات NDP تعتمد معرف الواجهة 64 بتاً — كسر القاعدة يكسر التوليف الآلي", en: "Because SLAAC and NDP depend on a 64-bit interface ID — breaking the rule breaks autoconfiguration" },
          { ar: "لتوفير العناوين وتقليل الهدر", en: "To conserve addresses and reduce waste" },
          { ar: "لأن البادئات الأقصر غير قابلة للتوجيه", en: "Because shorter prefixes are unroutable" },
        ],
        correct: 1,
        explain: { ar: "معرف الواجهة 64 بتاً جزء من بنية SLAAC و EUI-64 و NDP؛ استخدام /72 مثلاً يكسر التوليف الآلي وخدمات الخصوصية وأدوات عديدة — الوفرة في IPv6 تجعل التوفير هدفاً بلا معنى.", en: "The 64-bit interface ID is structural to SLAAC, EUI-64, and NDP; a /72 breaks autoconfiguration, privacy extensions, and many tools — IPv6 abundance makes conservation pointless." },
      },
      {
        q: { ar: "من 2001:db8:cafe::/48، كم شبكة فرعية /64 يمكنك تكوينها؟", en: "From 2001:db8:cafe::/48, how many /64 subnets can you build?" },
        options: [
          { ar: "256", en: "256" },
          { ar: "4,096", en: "4,096" },
          { ar: "65,536", en: "65,536" },
          { ar: "16,777,216", en: "16,777,216" },
        ],
        correct: 2,
        explain: { ar: "من /48 إلى /64 = 16 بتاً إضافية لمعرف الشبكة الفرعية: 2^16 = 65,536 شبكة فرعية، كل واحدة سعة 18.4 كوينتليون عنوان.", en: "From /48 to /64 = 16 extra bits of subnet ID: 2^16 = 65,536 subnets, each holding 18.4 quintillion addresses." },
      },
      {
        q: { ar: "شبكة تعمل IPv6 نقي وتريد الوصول لخادم يعمل IPv4 فقط. أي آلية تناسبها؟", en: "A pure IPv6 network must reach an IPv4-only server. Which mechanism fits?" },
        options: [
          { ar: "6to4 نفق آلي", en: "Automatic 6to4 tunneling" },
          { ar: "NAT64 مع DNS64", en: "NAT64 with DNS64" },
          { ar: "تقسيم فرعي بالنيبل", en: "Nibble subnetting" },
          { ar: "لا حل — يجب تشغيل IPv4 كاملاً في الشبكة", en: "No solution — the whole network must run IPv4" },
        ],
        correct: 1,
        explain: { ar: "NAT64 يترجم IPv6 إلى IPv4 عند الحدود، و DNS64 يصطنع سجلات AAAA بالبادئة 64:ff9b::/96 لخوادم IPv4 فقط — الحل المعياري لهذا السيناريو.", en: "NAT64 translates IPv6 to IPv4 at the border, and DNS64 synthesizes AAAA records under 64:ff9b::/96 for IPv4-only servers — the standard solution for this scenario." },
      },
    ],
  },
];
