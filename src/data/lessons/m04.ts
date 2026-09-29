import type { Lesson } from "@/lib/types";

// Module m04 — Data Link & Switching | طبقة الوصلة والتبديل
// Lessons l031-l040, level: intermediate

export const m04_LESSONS: Lesson[] = [
  {
    id: "l031",
    moduleId: "m04",
    order: 1,
    level: "intermediate",
    title: { ar: "تشريح عنوان MAC: من OUI إلى بتات البث", en: "MAC Address Anatomy: From OUI to Broadcast Bits" },
    summary: {
      ar: "تفكيك عنوان التحكم بالوصول إلى 48 بت: معرّف الشركة المصنّعة OUI، الجزء الخاص بالبطاقة، بت البث/الإرسال الجماعي، وبت الإدارة المحلية، مع العناوين الخاصة التي ستحفظها مدى الحياة.",
      en: "Dissecting the 48-bit MAC address: the vendor OUI, the NIC-specific part, the multicast/broadcast bit, the locally-administered bit, plus the special addresses you will remember for life.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "عنوان MAC: بطاقة هوية واجهة الشبكة", en: "The MAC Address: Your NIC's Identity Card" },
        body: {
          ar: "عنوان MAC (Media Access Control) هو العنوان الفيزيائي لواجهة الشبكة: 48 بت مكتوبة كستة بايتات ستّ عشرية، مثل 3C:5A:B4:7F:12:90. يُحرق هذا العنوان في ذاكرة ROM للبطاقة أثناء التصنيع، ولهذا يُسمّى أيضاً العنوان المُبرمَج (Burned-In Address).\n\nيعمل عنوان MAC في الطبقة الثانية من نموذج OSI، وهو ما تُخاطب به الإيثرنت إطاراتها فعلياً — بينما يعمل IP في الطبقة الثالثة ويتغير مع انتقالك بين الشبكات. هذا التزاوج بين العنوانين الثابت والمتحرك هو أساس كل شبكة محلية.\n\n- تُكتب العناوين بصيغ متعددة تكافئ بعضها: نقطتان (3C:5A:B4:7F:12:90)، شرطة (3C-5A-B4-7F-12-90)، نقاط رباعية (3C5A.B47F.1290 بصيغة Cisco)\n- كل واجهة لها عنوانها الخاص: لابتوب واحد فيه إيثرنت وواي فاي وبلوتوث = ثلاثة عناوين MAC\n- المبدّلات والموجّهات متعددة المنافذ تحمل عنوان MAC لكل منفذ + عناوين إدارية للإدارة عن بُعد",
          en: "A MAC (Media Access Control) address is the physical address of a network interface: 48 bits written as six hexadecimal octets, like 3C:5A:B4:7F:12:90. It is burned into the NIC's ROM during manufacturing, which is why it is also called the Burned-In Address (BIA).\n\nMAC operates at Layer 2 of the OSI model — it is what Ethernet frames actually use on the wire — while IP works at Layer 3 and changes as you move between networks. This pairing of a fixed address and a portable one is the foundation of every LAN.\n\n- Several equivalent notations exist: colon (3C:5A:B4:7F:12:90), hyphen (3C-5A-B4-7F-12-90), and Cisco dotted quad style (3C5A.B47F.1290)\n- Each interface has its own address: a laptop with Ethernet, Wi-Fi and Bluetooth carries three MACs\n- Switches and routers with many ports carry one MAC per port plus additional administrative addresses",
        },
        tip: {
          ar: "الصيغة النقطية الرباعية (3C5A.B47F.1290) هي التي ستراها في مخارج IOS على معدات Cisco، فاعتها على سجلات شاشة العرض تفيدك في المعامل والاختبارات.",
          en: "The dotted-quad style (3C5A.B47F.1290) is what IOS output shows on Cisco gear, so get comfortable reading it on-screen for labs and exams.",
        },
      },
      {
        heading: { ar: "النصف الأول: معرّف الشركة OUI", en: "The First Half: The OUI" },
        body: {
          ar: "تنقسم البتات الـ48 إلى نصفين متساويين. البتات الـ24 الأولى (ست خانات ستّ عشرية) هي معرّف المنظمة الفريد OUI (Organizationally Unique Identifier) الذي تسجّله IEEE وترخّصه لشركة مصنّعة بعينها، تماماً كما تُوزَّع رموز الدول على المطارات.\n\nالبتات الـ24 الثانية يمنحها المصنّع لكل بطاقة ينتجها، فيحصل كل جهاز في العالم على عنوان أحادي (Unicast) نظرياً لا يتكرر. حسابها بسيط: 24 بت تعني 16,777,216 تركيبة لكل OUI — عدّة ملايين من الأجهزة لكل معرّف شركة.\n\n- أمثلة على OUIs تشتهر في المعامل: B8:27:EB لجهاز Raspberry Pi، و00:50:56 لأجهزة VMware الافتراضية، و00:15:5D لبطاقات Hyper-V\n- القياس الرسمي الحديث للمقاس 48 بت هو EUI-48، وستجد المصطلح القديم MAC-48 في المراجع القديمة وهو نفس العنوان عملياً\n- يمكنك معرفة المصنّع من العنوان عبر قواعد OUI العامة (مثل التي يستخدمها Wireshark ليعرض اسم الشركة بجوار العنوان)",
          en: "The 48 bits split into two equal halves. The first 24 bits (six hex digits) are the Organizationally Unique Identifier (OUI) that IEEE registers and licenses to a specific manufacturer — much like airport codes assigned to countries.\n\nThe second 24 bits are assigned by that vendor to each card it builds, giving every device a globally unique unicast address in theory. The math is simple: 24 bits means 16,777,216 combinations per OUI — many millions of devices per vendor.\n\n- OUIs you will keep meeting in labs: B8:27:EB for Raspberry Pi, 00:50:56 for VMware virtual NICs, 00:15:5D for Hyper-V adapters\n- The modern formal standard for 48-bit identifiers is EUI-48; the older term MAC-48 appears in legacy references and is effectively the same thing\n- You can resolve a vendor from an address using public OUI databases — Wireshark does this automatically, showing the company name beside each address",
        },
      },
      {
        heading: { ar: "بتان صغيران يغيّران كل شيء", en: "Two Tiny Bits That Change Everything" },
        body: {
          ar: "أول بايت من العنوان يخفي بتين مهمين للغاية. البت الأول (الأقل أهمية في البايت الأول، ويُرمز له I/G) يحدد نوع العنوان: صفر يعني أحادي Unicast موجه لجهاز واحد، وواحد يعني جماعي Multicast أو بث Broadcast موجّه لمجموعة أو للجميع.\n\nالبت الثاني (U/L) يحدد مصدر العنوان: صفر يعني عنواناً عالمياً مُبرمجاً من المصنّع، وواحد يعني عنواناً مُداراً محلياً (Locally Administered) اختاره مسؤول الشبكة أو النظام بنفسه. هنا بالضبط تظهر عناوين الأجهزة الافتراضية والعناوين العشوائية في الهواتف.\n\n- هذا هو السر في العناوين التي تبدأ بـ 02 مثل 02:1A:2B:3C:4D:5E: البت الثاني مضبوط → إدارة محلية\n- الهواتف الحديثة تستخدم عناوين MAC عشوائية لكل شبكة Wi-Fi لحماية الخصوصية، وكلها محلية الإدارة ببت U/L مضبوط\n- لاحظ النمط: البايت الأول ينتهي بـ 2 أو 6 أو A أو E يعني غالباً عنوان محلي الإدارة",
          en: "The first octet of the address hides two very important bits. Bit 0 (the least significant bit of the first byte, labeled I/G) determines the address type: 0 means unicast destined to a single device, 1 means multicast or broadcast destined to a group or everyone.\n\nBit 1 (labeled U/L) determines the origin: 0 means a globally unique, burned-in vendor address, while 1 means a locally administered address chosen by an admin or the OS itself. This is exactly where virtual machine MACs and randomized phone addresses come from.\n\n- This is the secret behind addresses starting with 02 such as 02:1A:2B:3C:4D:5E: bit 1 set → locally administered\n- Modern phones randomize their Wi-Fi MAC per network for privacy, and every one of them is locally administered with the U/L bit set\n- Spot the pattern: a first octet ending in 2, 6, A, or E usually signals a locally administered address",
        },
        code: {
          lang: "text",
          snippet: "عنوان MAC = 48 بت\n[ OUI: 24 بت من IEEE ][ Device: 24 بت من المصنّع ]\n\nبايت البداية مكوّن من 8 بتات:\n b7  b6  b5  b4  b3  b2  b1(U/L)  b0(I/G)\n\nأمثلة:\n00:1B:21:44:55:66  → unicast عالمي (بتان = 0)\n02:1B:21:44:55:66  → unicast محلي الإدارة\n01:00:5E:xx:xx:xx  → جماعي IPv4 multicast\nFF:FF:FF:FF:FF:FF  → بث broadcast (كل البتات 1)",
        },
      },
      {
        heading: { ar: "عناوين خاصة تحفظها مدى الحياة", en: "Special Addresses to Memorize Forever" },
        body: {
          ar: "بعض العناوين تتكرر أمامك في كل معمل وكل تحليل حزم، حتى إن حفظها يصبح استثماراً مباشراً في سرعة استيعاب ما يجري في الشبكة:\n\n- FF:FF:FF:FF:FF:FF — عنوان البث Broadcast: إطار يحمله يستقبله كل جهاز في نطاق البث نفسه، وهو أساس طلبات ARP وDHCP الأولى\n- 01:00:5E:00:00:00 حتى 01:00:5E:7F:FF:FF — نطاق الجماعي لـ IPv4 Multicast، تُشتق قيمته من آخر 23 بت من عنوان المجموعة\n- 01:80:C2:00:00:00 — عنوان بروتوكول الشجرة الممتدة STP الذي تتخاطب به المبدّلات (درس l039)\n- 33:33:xx:xx:xx:xx — نطاق الجماعي لـ IPv6 بما فيه اكتشاف الجيران NDP\n\nوعند تكوين IPv6 تلقائياً (SLAAC)، يُشتق عنوان الواجهة بتركيب الـ 48 بت مع الكلمة FF:FE في الوسط لصياغة معرّف 64 بت يسمى EUI-64. لن تحتاجه يومياً، لكن فهم اتصاله بعنوان MAC يزيل الغموض عن هذه الصيغ الطويلة.",
          en: "Certain addresses reappear in every lab and every packet capture, to the point that memorizing them is a direct investment in reading speed:\n\n- FF:FF:FF:FF:FF:FF — the broadcast address: any frame carrying it is received by every device in the broadcast domain, and it is the backbone of ARP and initial DHCP requests\n- 01:00:5E:00:00:00 through 01:00:5E:7F:FF:FF — the IPv4 multicast range, derived from the last 23 bits of the group IP\n- 01:80:C2:00:00:00 — the STP address switches speak over (lesson l039)\n- 33:33:xx:xx:xx:xx — the IPv6 multicast range including Neighbor Discovery\n\nWhen IPv6 autoconfigures itself (SLAAC), the interface identifier is built by inserting FF:FE into the middle of the 48-bit MAC to craft a 64-bit EUI-64 identifier. You will not need it daily, but knowing its MAC lineage demystifies those long addresses.",
        },
      },
      {
        heading: { ar: "عرض العنوان وتغييره في أنظمتك", en: "Viewing and Changing It on Your Systems" },
        body: {
          ar: "العنوان المُبرمج في ROM ليس قدراً نهائياً: نظام التشغيل يستطيع تجاوزه بعنوان بديل عند التشغيل، لأن الإطارات تستخدم ما يضعه التعريف (Driver) في الذاكرة لا ما هو محفور في الشريحة. هذه المرونة ميزة للمختبرات والخصوصية، وسلاح في يد المهاجمين أيضاً (سنراها في درس ARP).\n\nعلى لينكس يمنحك ip link العنوان الفعلي لكل واجهة، وعلى ويندوز تطلب getmac التفاصيل. أما macchanger فيتيح تعيين عناوين عشوائية أو محددة، وهو أداة المعامل الكلاسيكية لاختبار سلوك المبدّل عند تعلّم عناوين جديدة.\n\n- عند التقاط حزم بـ tcpdump أو Wireshark، أضف خيار -e أو افتح قسم Ethernet لترى عناوين المصدر والوجهة والشركة المصنّعة لكل إطار\n- إذا رأيت عنواناً محلي الإدارة (U/L=1) في شبكة إنتاج، فإما جهاز افتراضي، أو عشوائية هاتف، أو... بشر يتلاعب",
          en: "The burned-in ROM address is not the final word: the operating system can override it at runtime with a replacement, because frames use whatever the driver places in memory, not what is etched in the silicon. This flexibility is a feature for labs and privacy — and a weapon in attacker hands too (we will see that in the ARP lesson).\n\nOn Linux, ip link shows each interface's active address; on Windows, getmac gives you the details. macchanger lets you set random or specific addresses — the classic lab tool for testing how a switch reacts to newly learned addresses.\n\n- When capturing with tcpdump or Wireshark, add -e or expand the Ethernet section to see source, destination, and vendor per frame\n- If you spot a locally administered address (U/L=1) in production, it is either a VM, a phone's randomization, or... a human tampering",
        },
        code: {
          lang: "bash",
          snippet: "# عرض العنوان الفعلي لكل واجهة على لينكس\nip link show | grep -A1 '^\n[0-9]'\n\n# ويندوز: عرض عناوين MAC مفصلة\ngetmac /v\n\n# تعيين عنوان عشوائي (محلي الإدارة) لأغراض المعمل\nsudo macchanger -r wlan0\n\n# التقاط إطارين لنرى عناوين MAC الحية مع اسم المصنّع\nsudo tcpdump -i eth0 -e -c 2",
        },
      },
    ],
    keyPoints: [
      { ar: "عنوان MAC = 48 بت: 24 بت OUI من IEEE + 24 بت من المصنّع", en: "MAC = 48 bits: 24-bit OUI from IEEE + 24 bits from the vendor" },
      { ar: "بت I/G يفرّق الأحادي (0) عن الجماعي والبث (1)", en: "The I/G bit separates unicast (0) from multicast/broadcast (1)" },
      { ar: "بت U/L يفرّق العالمي المُبرمج (0) عن المحلي الإدارة (1) — سر العناوين التي تبدأ بـ 02", en: "The U/L bit separates burned-in global (0) from locally administered (1) — the secret of 02-prefixed addresses" },
      { ar: "FF:FF:FF:FF:FF:FF للبث، 01:00:5E لجماعي IPv4، 01:80:C2 لـ STP", en: "FF:FF:FF:FF:FF:FF broadcast, 01:00:5E IPv4 multicast, 01:80:C2 for STP" },
      { ar: "العنوان قابل للتجاوز برمجياً من نظام التشغيل — أساس عشوائية الهواتف وانتحال المهاجمين", en: "The address is runtime-overridable by the OS — the basis of phone randomization and attacker spoofing" },
      { ar: "الأنظمة الحديثة تكتبه بصيغ متعددة تكافئ بعضها، وCisco تفضّل النقطية الرباعية", en: "Modern systems use several equivalent notations; Cisco prefers the dotted-quad form" },
    ],
    commands: [
      { cmd: "ip link show", desc: { ar: "عرض واجهات الشبكة مع عناوين MAC الفعلية (لينكس)", en: "List network interfaces with their live MAC addresses (Linux)" } },
      { cmd: "getmac /v", desc: { ar: "عرض عناوين MAC التفصيلية لكل واجهة (ويندوز)", en: "Show verbose MAC addresses per interface (Windows)" } },
      { cmd: "macchanger -r wlan0", desc: { ar: "تعيين عنوان MAC عشوائي محلي الإدارة لأغراض الاختبار", en: "Assign a random locally-administered MAC for testing purposes" } },
      { cmd: "sudo tcpdump -i eth0 -e -c 5", desc: { ar: "التقاط 5 إطارات مع عرض عناوين المصدر والوجهة في طبقة الإيثرنت", en: "Capture 5 frames showing Ethernet source/destination addresses" } },
    ],
    quiz: [
      {
        q: { ar: "كم عدد بتات عنوان MAC القياسي؟", en: "How many bits wide is a standard MAC address?" },
        options: [
          { ar: "32 بت", en: "32 bits" },
          { ar: "48 بت", en: "48 bits" },
          { ar: "64 بت", en: "64 bits" },
          { ar: "128 بت", en: "128 bits" },
        ],
        correct: 1,
        explain: { ar: "عنوان MAC القياسي (EUI-48) طوله 48 بت = 6 بايتات تُكتب كست خانات ستّ عشرية. أما 64 بت فهي معرّف EUI-64 المشتق منه لـ IPv6، و128 بت هي عناوين IPv6 نفسها.", en: "The standard MAC (EUI-48) is 48 bits = 6 bytes written as six hex pairs. 64 bits is the EUI-64 identifier derived for IPv6, and 128 bits is IPv6 itself." },
      },
      {
        q: { ar: "ما الذي يحدده معرّف OUI في عنوان MAC؟", en: "What does the OUI identify in a MAC address?" },
        options: [
          { ar: "الشبكة الفرعية التي ينتمي إليها الجهاز", en: "The subnet the device belongs to" },
          { ar: "نوع البروتوكول المحمول في الإطار", en: "The protocol carried inside the frame" },
          { ar: "الجهة المصنّعة للواجهة كما ترخّصها IEEE", en: "The interface vendor as licensed by IEEE" },
          { ar: "سرعة الواجهة القصوى", en: "The maximum speed of the interface" },
        ],
        correct: 2,
        explain: { ar: "أول 24 بت من العنوان هي OUI الذي تمنحه IEEE لمصنّع بعينه، وآخر 24 بت يمنحها المصنّع لبطاقاته، فيتكوّن عنوان عالمي فريد.", en: "The first 24 bits are the OUI IEEE licenses to a specific vendor; the vendor assigns the last 24 bits to its cards, forming a globally unique address." },
      },
      {
        q: { ar: "عنوان يبدأ بالبايت 02 مثل 02:1A:2B:3C:4D:5E يخبرك فوراً بأنه:", en: "An address whose first octet is 02, like 02:1A:2B:3C:4D:5E, tells you immediately that it is:" },
        options: [
          { ar: "عنوان بث broadcast", en: "A broadcast address" },
          { ar: "عنوان أحادي عالمي من المصنّع", en: "A globally unique vendor-assigned unicast" },
          { ar: "عنوان جماعي multicast لـ IPv4", en: "An IPv4 multicast address" },
          { ar: "عنوان مُدار محلياً (بت U/L مضبوط)", en: "Locally administered (U/L bit set)" },
        ],
        correct: 3,
        explain: { ar: "البايت 02 يساوي 00000010 ثنائياً: بت U/L هو 1 وبت I/G هو 0، أي عنوان أحادي لكنه محلي الإدارة اخترعه نظام التشغيل — نمط الأجهزة الافتراضية والعناوين العشوائية.", en: "Octet 02 is 00000010 in binary: the U/L bit is 1 and I/G is 0 — a unicast address invented locally by the OS, the classic pattern for VMs and randomized addresses." },
      },
      {
        q: { ar: "الإطار الموجّه إلى FF:FF:FF:FF:FF:FF يفعله المبدّل التالي:", en: "A switch receiving a frame destined to FF:FF:FF:FF:FF:FF will:" },
        options: [
          { ar: "يرسله فقط إلى البوابة الافتراضية", en: "Send it only to the default gateway" },
          { ar: "يغرق به كل المنافذ في الـ VLAN نفسه", en: "Flood it out all ports in the same VLAN" },
          { ar: "يرميه لأنه عنوان غير صالح", en: "Discard it as an invalid address" },
          { ar: "يحوّله إلى إطار أحادي للجسر الجذري", en: "Convert it into a unicast frame for the root bridge" },
        ],
        correct: 1,
        explain: { ar: "البث يستقبل مبدئياً كل جهاز في نطاق البث نفسه، والمبدّل ينسخ الإطار إلى كل منافذه ضمن الـ VLAN نفسه عدا منفذ الدخول — هذا سلوك ARP وDHCP في بداية اتصالهما.", en: "Broadcast reaches every device in the same broadcast domain: the switch copies the frame to all its ports in that VLAN except the ingress port — the behavior ARP and DHCP rely on at startup." },
      },
    ],
  },
  {
    id: "l032",
    moduleId: "m04",
    order: 2,
    level: "intermediate",
    title: { ar: "صيغة إطار الإيثرنت: من المقدمة إلى FCS", en: "The Ethernet Frame: From Preamble to FCS" },
    summary: {
      ar: "تفكيك إطار الإيثرنت حقلاً حقلاً: المقدمة وSFD، حقلي MAC، حقل EtherType الذي يصرّح بحمولة الإطار، وحدة النقل القصوى MTU والإطارات العملاقة، وضمان التكامل FCS.",
      en: "Dissecting the Ethernet frame field by field: preamble and SFD, the MAC fields, the EtherType that declares the payload, MTU and jumbo frames, and the FCS integrity check.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "الإطار: مغلّف الطبقة الثانية", en: "The Frame: Layer 2's Envelope" },
        body: {
          ar: "قبل أن تسافر الحزمة (Packet) على السلك، تُغلَّف بغلاف الإيثرنت: ترويسة تحمل عنواني المصدر والوجهة من نوع MAC، وحقل يصرّح بما في الداخل، وذيل يحمي المحتوى من الفساد. هذا الغلاف هو الإطار (Frame).\n\nالتغليف يحدث في كل قفزة: عندما يمر الإطار عبر مبدّل، يُنزع غلافه القديم ويُفحص ثم يُغلَّف من جديد بالعناوين المناسبة للقفزة التالية. المبدّل يعمل على الإطار كله ولا يلمس محتوى الحزمة الداخلية أصلاً — بينما الموجّه يعمل على ما بداخله.\n\n- وحدة العمل في طبقة الوصلة هي الإطار، في طبقة الشبكة هي الحزمة\n- كل بطاقة شبكة تولد إطاراً وتستقبل إطارات موجهة لها أو للبث\n- فهم حقول الإطار هو مفتاح قراءة تحليلات Wireshark بلا حيرة",
          en: "Before a packet travels on the wire, it gets an Ethernet envelope: a header carrying source and destination MAC addresses, a field declaring what is inside, and a trailer protecting the content from corruption. That envelope is the frame.\n\nEncapsulation happens hop by hop: as a frame crosses a switch, the old envelope is read, then the payload is re-framed with fresh addresses for the next hop. A switch processes the whole frame and never touches the inner packet, while the router processes what is inside.\n\n- The unit of work at the data link layer is the frame; at the network layer it is the packet\n- Every NIC builds frames and receives frames addressed to it (or to broadcast)\n- Understanding frame fields is the key to reading Wireshark captures without confusion",
        },
      },
      {
        heading: { ar: "الحقول حقلاً حقلاً", en: "Field by Field" },
        body: {
          ar: "يبدأ الإطار بـ 8 بايتات لا تُحسب ضمن طوله: سبع بايتات مقدمة (Preamble) بنمط 10101010 وبايت بدء محدد الدفق SFD بنمط 10101011. وظيفتها إيقاع الاستقبال: تتيح لدوائر المستقبِل مزامنة ساعتها مع سرعة المرسِل قبل وصول البيانات الحقيقية — كطبّال يضبط الإيقاع قبل الأغنية.\n\nثم تأتي الحقول المحسوبة: عنوان الوجهة (6 بايتات)، عنوان المصدر (6)، ثم حقل الطول/النوع (2)، ثم الحمولة من 46 إلى 1500 بايت، وأخيراً FCS بأربعة بايتات. أصغر إطار قانوني 64 بايتاً وأكبر إطار قياسي 1518 — وإذا وُسم بوسم VLAN ارتفع إلى 1522.\n\n- إذا كانت الحمولة أقل من 46 بايتاً تُحشى بالحشو (Padding) للوصول إلى الحد الأدنى\n- الحد الأدنى 64 بايتاً ليس تعسفياً: إنه شرط كشف التصادمات في CSMA/CD كما سنرى في الدرس التالي\n- فجوة بين الإطارات (Interframe Gap) مقدارها 12 بايت زمنياً تمنح الدوائر مهلة استرخاء بين إطار وإطار",
          en: "The frame opens with 8 bytes that do not count toward its size: seven preamble bytes of the 10101010 pattern plus a Start Frame Delimiter (SFD) byte of 10101011. Their job is receiver rhythm: they let the receiving circuitry clock-sync to the sender's rate before the real data arrives — a drummer counting in the song.\n\nThen come the counted fields: destination MAC (6 bytes), source MAC (6), a Length/Type field (2), the payload from 46 to 1500 bytes, and finally the 4-byte FCS. The smallest legal frame is 64 bytes, the largest standard frame 1518 — rising to 1522 with a VLAN tag.\n\n- Payloads under 46 bytes get padded up to the minimum\n- The 64-byte minimum is not arbitrary: it is the CSMA/CD collision-detection requirement we meet next lesson\n- An interframe gap of 12 bytes' worth of time gives circuits a breather between frames",
        },
        code: {
          lang: "text",
          snippet: "Ethernet II / IEEE 802.3 — تخطيط الإطار\n\n[Preamble 7B][SFD 1B][Dest MAC 6B][Src MAC 6B][Type/Len 2B][Payload 46-1500B][FCS 4B]\n |_______ لا تُحسب _______| |____________ تُحسب في حجم الإطار ____________|\n\nأحجام الحساب: الحد الأدنى 64 بايت، القياسي الأقصى 1518، مع وسم 802.1Q = 1522\nفجوة بين الإطارات IFG = 96 زمن-بت (12 بايت عند 10Mbps)",
        },
      },
      {
        heading: { ar: "EtherType: بطاقة تعريف الحمولة", en: "EtherType: The Payload's ID Card" },
        body: {
          ar: "بعد عنوان المصدر مباشرة يأتي حقل بطول 2 بايت يقرر هوية الإطار كله. في صيغة Ethernet II يُقرأ هذا الحقل كنوع (Type) يصرّح بما في الحمولة؛ وفي الصيغة القديمة 802.3 القائمة على LLC يُقرأ كطول. التمييز آلي: إذا كانت القيمة 1536 (0x0600) أو أكبر فهي نوع، وإن كانت أقل فهي طول.\n\nالقيم التي ستراها كل يوم في التحليلات: 0x0800 لحزم IPv4، و0x0806 لرسائل ARP، و0x86DD لـ IPv6، و0x8100 لوسم VLAN المدرج في درس الجذوع، و0x88CC لبروتوكول LLDP الذي تكتشف به المبدّلات جيرانها.\n\n- هذه القيم هي أول ما يفحصه المبدّل ليعرف هل يوجد وسم 802.1Q بعد عنوان المصدر\n- Wireshark يعرض الحقل تحت اسم EtherType مع تحويله تلقائياً إلى اسم البروتوكول\n- معرفة هذه الخريطة تختصر عليك دقائق عند تشخيص حركة مرور غريبة أو مُكرّرة",
          en: "Right after the source address comes a 2-byte field that decides the entire frame's identity. In Ethernet II it is read as a Type declaring the payload; in the older LLC-based 802.3 form it is read as a length. The disambiguation is automatic: a value of 1536 (0x0600) or more means type, less means length.\n\nThe values you will meet daily in captures: 0x0800 for IPv4 packets, 0x0806 for ARP messages, 0x86DD for IPv6, 0x8100 for the VLAN tag covered in the trunking lesson, and 0x88CC for LLDP, the protocol switches use to discover neighbors.\n\n- These values are the first thing a switch checks to know whether an 802.1Q tag follows the source address\n- Wireshark displays the field as EtherType and resolves it to a protocol name for you\n- Knowing this map saves you minutes whenever you triage strange or duplicate traffic",
        },
      },
      {
        heading: { ar: "MTU والإطارات العملاقة", en: "MTU and Jumbo Frames" },
        body: {
          ar: "الحد الأقصى للحمولة هو 1500 بايت، وهو التعريف الشهير لـ MTU. إذا حاولت طبقة IP إرسال حزمة أكبر من MTU الواجهة، تُجزَّأ (Fragmentation) إلى قطع تُركّب عند المستقبِل — عملية مكلفة أداءً وذاكرةً ويُستاء منها الجميع، لذا صار العالم يتفاداها عبر اكتشاف MTU المسار (PMTUD).\n\nالإطارات العملاقة (Jumbo Frames) ترفع MTU إلى 9000 بايت تقريباً (حتى 9216 حسب المنصة). الفائدة: نفقات ترويسة أقل مقابل حمولة أكبر = كفاءة أعلى للنقل. هذا مهم في شبكات التخزين iSCSI ومراكز البيانات حيث تتحرك ملفات ضخمة على نحو متواصل.\n\n- الشرط الحاكم: كل جهاز على المسار (بطاقات، مبدّلات، موجّهات) يجب أن يدعم نفس MTU وإلا تُهمل الحزم الكبيرة بصمت — أسوأ أعطال التشخيص\n- تختبر المسار بأمر ping مع منع التجزئة: نجح بحجم 8972 = المسار جاهز للإطار العملاق\n- شبكات WAN والإنترنت العامة تعمل بـ 1500 فلا ترفع MTU داخلياً ثم تتفاجأ بالخروج إلى العالم",
          en: "The payload ceiling is 1500 bytes — the famous definition of MTU. If IP tries to send a packet larger than the interface MTU, it is fragmented into pieces reassembled by the receiver: a process that costs performance and memory and is universally disliked, which is why the world now avoids it via Path MTU Discovery (PMTUD).\n\nJumbo frames raise the MTU to roughly 9000 bytes (up to 9216 depending on platform). The benefit: header overhead is amortized over a bigger payload = higher transfer efficiency. That matters in iSCSI storage networks and data centers where giant files move continuously.\n\n- The governing rule: every device on the path (NICs, switches, routers) must support the same MTU or oversized packets are silently dropped — the worst failures to troubleshoot\n- Test the path with a ping that forbids fragmentation: success at 8972 bytes means the path is jumbo-ready\n- WAN and the public Internet run at 1500, so do not raise MTU internally and then act surprised when traffic leaves your building",
        },
        code: {
          lang: "bash",
          snippet: "# رفع MTU على لينكس (يجب تكراره على كل جهاز في المسار)\nsudo ip link set dev eth0 mtu 9000\n\n# اختبار جاهزية المسار للإطارات العملاقة: 9000 - 28 (ترويسات ICMP/IP)\nping -M do -s 8972 -c 3 192.168.1.20\n\n# فشل التجزئة = جهاز ما على المسار لم يرفع MTU بعد\n# Wireshark: ابحث عن ICMP Type 3 Code 4 (fragmentation needed)",
        },
        tip: {
          ar: "حجم 8972 ليس سحراً: هو 9000 مطروحاً منها 20 بايت ترويسة IP و8 بايت ترويسة ICMP. احفظ معادلة: حجم الحمولة = MTU − 28.",
          en: "The 8972 figure is no magic: it is 9000 minus the 20-byte IP header and 8-byte ICMP header. Memorize the equation: payload size = MTU − 28.",
        },
      },
      {
        heading: { ar: "FCS: حارس التكامل", en: "FCS: The Integrity Guard" },
        body: {
          ar: "آخر 4 بايتات من الإطار هي FCS (Frame Check Sequence): بصمة CRC-32 يحسبها المرسِل فوق حقول الإطار من الوجهة حتى نهاية الحمولة، ويعيد المستقبِل حسابها عند الوصول. إذا اختلفت النتيجتان فالإطار فسد أثناء النقل (تشويش كهربائي، كابل معيب، ازدواج غير متطابق) فيُرمى فوراً ودون اعتذار.\n\nالنقطة الجوهرية: طبقة الوصلة لا تعيد الإرسال. الرمي الصامت هنا يترك المهمة للطبقات الأعلى — TCP سيلاحظ الفقد ويبطئ ويعيد، بينما UDP يتجاهل الأمر كلياً. لذلك ترتفع أهمية مراقبة عدادات CRC في المعمل: موجة أخطاء متصاعدة تعني مشكلة فيزيائية على المسار لا في البرمجيات.\n\n- المبدّل بأسلوب store-and-forward يتحقق من FCS قبل التمرير، فيمنع انتشار الفساد (درس l034)\n- ارتفاع CRC على منفذ واحد = كابل أو بطاقة الطرف الآخر؛ ارتفاعه على عدة منافذ = مشكلة في المبدّل نفسه أو تداخل كهربائي\n- ازدواج نصف/كامل غير متطابق يظهر كتصادمات متأخرة وأخطاء CRC معاً — تشخيص سنعيده في الدرس التالي",
          en: "The frame's final 4 bytes are the FCS (Frame Check Sequence): a CRC-32 fingerprint the sender computes over all fields from destination through payload, and the receiver recomputes on arrival. If the results differ, the frame was corrupted in flight (electrical noise, a bad cable, a duplex mismatch) and is immediately discarded — silently and without apology.\n\nThe crucial point: the data link layer does not retransmit. Silent drops here leave the job to upper layers — TCP will notice the loss, slow down and resend, while UDP shrugs entirely. That is why watching CRC counters matters in the field: a climbing error rate means a physical problem on the path, not a software one.\n\n- A store-and-forward switch verifies the FCS before forwarding, stopping corruption from propagating (lesson l034)\n- Rising CRC on a single port means that cable or the far-end NIC; rising across many ports points to the switch itself or electrical interference\n- A half/full duplex mismatch shows up as late collisions plus CRC errors together — a diagnosis we will reuse next lesson",
        },
        code: {
          lang: "bash",
          snippet: "# مراقبة أخطاء الاستقبال (بما فيها CRC) لكل واجهة على لينكس\nip -s link show eth0\n\n# على معدات Cisco\n# show interfaces counters errors\n#   قسم CRC المتصاعد = إطارات فاسدة تُرمى على هذا المنفذ\n\n# التقاط إطارين مع توسيع تفاصيل الإيثرنت كاملة\nsudo tshark -i eth0 -c 2 -V | head -40",
        },
      },
    ],
    keyPoints: [
      { ar: "الإطار = غلاف الطبقة الثانية: ترويسة + حمولة + FCS، والمقدمة وSFD خارج الحساب", en: "Frame = Layer 2 envelope: header + payload + FCS; preamble and SFD sit outside the count" },
      { ar: "الحد الأدنى 64 بايتاً (حشو عند النقص) والأقصى القياسي 1518، و1522 مع وسم VLAN", en: "Minimum 64 bytes (padded up if short), standard max 1518, or 1522 with a VLAN tag" },
      { ar: "EtherType يصرّح بالحمولة: 0x0800 IPv4، 0x0806 ARP، 0x86DD IPv6، 0x8100 VLAN", en: "EtherType declares the payload: 0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6, 0x8100 VLAN" },
      { ar: "MTU الافتراضي 1500، والإطارات العملاقة (~9000) تتطلب دعماً موحّداً على كل المسار", en: "Default MTU is 1500; jumbo frames (~9000) demand uniform support across the whole path" },
      { ar: "FCS بصمة CRC-32: فسادها = رمي صامت بلا إعادة إرسال من طبقة الوصلة", en: "FCS is a CRC-32 fingerprint: a mismatch = silent drop, no L2 retransmission" },
      { ar: "تصاعد أخطاء CRC على منفذ = مشكلة فيزيائية (كابل/بطاقة/ازدواج) لا برمجية", en: "Climbing CRC errors on a port = a physical problem (cable/NIC/duplex), not software" },
    ],
    commands: [
      { cmd: "sudo tshark -i eth0 -c 10", desc: { ar: "التقاط 10 إطارات حية لقراءة حقول الإيثرنت عملياً", en: "Capture 10 live frames to read Ethernet fields hands-on" } },
      { cmd: "sudo ip link set dev eth0 mtu 9000", desc: { ar: "ضبط MTU على 9000 بايت (إطارات عملاقة) — يجب موحداً على المسار", en: "Set MTU to 9000 (jumbo frames) — must match across the path" } },
      { cmd: "ping -M do -s 8972 -c 3 192.168.1.20", desc: { ar: "اختبار جاهزية المسار للحمولة العملاقة مع منع التجزئة", en: "Test path readiness for jumbo payload with fragmentation forbidden" } },
      { cmd: "ip -s link show eth0", desc: { ar: "عرض إحصاءات الواجهة بما فيها أخطاء CRC والفقد", en: "Show interface statistics including CRC errors and drops" } },
    ],
    quiz: [
      {
        q: { ar: "ما القيمة القياسية لـ MTU في الإيثرنت؟", en: "What is the standard Ethernet MTU?" },
        options: [
          { ar: "576 بايتاً", en: "576 bytes" },
          { ar: "1500 بايت", en: "1500 bytes" },
          { ar: "8192 بايتاً", en: "8192 bytes" },
          { ar: "9000 بايت", en: "9000 bytes" },
        ],
        correct: 1,
        explain: { ar: "الحمولة القصوى في الإيثرنت القياسي هي 1500 بايت، وهي MTU المعروفة عالمياً. أما 9000 فهي قيمة الإطارات العملاقة الاختيارية داخل الشبكات المدارة فقط.", en: "Standard Ethernet payload tops out at 1500 bytes — the world-famous MTU. 9000 belongs to optional jumbo frames inside managed networks only." },
      },
      {
        q: { ar: "وصل إطار فشل في تحقق FCS إلى مبدّل يعمل بأسلوب store-and-forward. ماذا يفعل؟", en: "A frame fails its FCS check at a store-and-forward switch. What happens?" },
        options: [
          { ar: "يعيد إرساله إلى المصدر لطلب نسخة جديدة", en: "It returns it to the source requesting a fresh copy" },
          { ar: "يصلحه بحساب CRC جديدة ثم يمرره", en: "It repairs it by computing a new CRC and forwards it" },
          { ar: "يرميه صامتاً قبل التمرير", en: "It silently drops it before forwarding" },
          { ar: "يمرره ويترك التصحيح للمستقبِل النهائي", en: "It forwards it and leaves correction to the final receiver" },
        ],
        correct: 2,
        explain: { ar: "المبدّل بنمط الخزن والتمرير يستقبل الإطار كاملاً ويعيد حساب CRC: اختلاف النتيجة يعني فساداً فيُرمى الإطار فوراً. طبقة الوصلة لا تعيد الإرسال أبداً؛ TCP في الأعلى هو من يتكفل بذلك.", en: "A store-and-forward switch receives the whole frame and recomputes the CRC: any mismatch means corruption and the frame is dropped. Layer 2 never retransmits; TCP above handles that." },
      },
      {
        q: { ar: "قيمة EtherType تساوي 0x8100. ماذا يعني ذلك؟", en: "The EtherType value is 0x8100. What does that mean?" },
        options: [
          { ar: "الحمولة حزمة IPv4", en: "The payload is an IPv4 packet" },
          { ar: "الحمولة رسالة ARP", en: "The payload is an ARP message" },
          { ar: "إطار مضغوط ببروتوكول خاص", en: "A frame compressed with a proprietary protocol" },
          { ar: "يوجد وسم 802.1Q مُدرج بعد عنوان المصدر", en: "An 802.1Q tag follows the source address" },
        ],
        correct: 3,
        explain: { ar: "0x8100 هو TPID لوسم 802.1Q: حين يراه المبدّل يعرف أن بايتات الوسم الأربعة (التي تحمل VLAN ID) تقع بين عنوان المصدر وحقل النوع الأصلي.", en: "0x8100 is the 802.1Q TPID: when a switch sees it, it knows the 4 tag bytes (carrying the VLAN ID) sit between the source address and the original type field." },
      },
      {
        q: { ar: "لماذا الحد الأدنى لحجم الإطار 64 بايتاً؟", en: "Why is there a 64-byte minimum frame size?" },
        options: [
          { ar: "لضمان مساحة كافية لاحتواء ترويسات IPv6 كاملة", en: "To guarantee room for full IPv6 headers" },
          { ar: "لتمكين كشف التصادمات قبل انتهاء الإرسال في CSMA/CD", en: "To let collisions be detected before transmission ends under CSMA/CD" },
          { ar: "حصر تاريخي من زمن المودمات لم يُلغَ قط", en: "A historical modem-era limit never removed" },
          { ar: "لتسهيل حساب FCS على عتاد رخيص", en: "To make FCS computation easy on cheap hardware" },
        ],
        correct: 1,
        explain: { ar: "إطار قصير جداً قد يُرسَل بالكامل قبل أن يصل نبض التصادم إلى المرسِل فيُفشل الكشف. 64 بايتاً = 512 زمن-بت تكفي لذهاب الإشارة والعودة في أطول شبكة إيثرنت مشروعة — تفصيل الدرس التالي.", en: "A too-short frame could finish transmitting before a collision pulse returns to the sender, defeating detection. 64 bytes = 512 bit-times covers signal round-trip in the largest legal Ethernet — next lesson's storyline." },
      },
    ],
  },
  {
    id: "l033",
    moduleId: "m04",
    order: 3,
    level: "intermediate",
    title: { ar: "CSMA/CD ونطاقات التصادم والبث وازدواج الإرسال", en: "CSMA/CD, Collision & Broadcast Domains, Duplex" },
    summary: {
      ar: "كيف تعايشت الإيثرنت القديمة مع الوسط المشترك عبر الاستماع والكشف والتراجع العشوائي، وكيف تختلف نطاقات التصادم عن نطاقات البث عبر المكرّرات والمبدّلات والموجّهات، ولماذا مات CSMA/CD في الشبكات الحديثة.",
      en: "How legacy Ethernet survived a shared medium through listen-detect-backoff, how collision and broadcast domains differ across hubs, switches and routers, and why CSMA/CD is dead in modern networks.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "العالم القديم: المكرّر المشترك", en: "The Old World: The Shared Repeater" },
        body: {
          ar: "قبل المبدّلات، كانت شبكة الإيثرنت مجرد كابل مشترك (10BASE2) أو مكرّر مركزي (Hub) يكرر كل إشارة تصل إليه على كل المنافذ الأخرى. النتيجة: جميع الأجهزة تتشارك نطاق تصادم (Collision Domain) واحداً وزمن الإرسال نفسه — إذا تكلم جهازان معاً تداخل الإشارتان وفسد الإطاران.\n\nلم يكن المكرّر ذكياً: لا يقرأ عناوين ولا يخزن شيئاً؛ يبثّ فقط. لذا اقتضت الأدب أن يتفق الجميع على آلية ترتيب الحديث — وهذا هو CSMA/CD بالضبط: بروتوكول الوصول المتعدد بالاستماع على الحامل مع كشف التصادم.\n\n- 10 أجهزة على مكرّر 10Mbps لا تحصل على 10Mbps إجمالية، بل أقل بكثير مع ازدحام التصادمات\n- كل جهاز يعمل بنصف الازدواج: يرسل أو يستقبل، لا الاثنان معاً\n- الشبكة الافتراضية بأكملها نطاق بث واحد: رسالة واحدة تصل للجميع",
          en: "Before switches, an Ethernet was one shared cable (10BASE2) or a central hub repeating every incoming signal out every other port. The result: all devices shared one collision domain and the same transmission window — if two talked at once, the signals overlapped and both frames were destroyed.\n\nThe hub had no intelligence: it read no addresses and stored nothing; it only repeated. So everyone had to agree on conversation etiquette — which is exactly CSMA/CD: Carrier Sense Multiple Access with Collision Detection.\n\n- Ten devices on a 10 Mbps hub did not get 10 Mbps aggregate; collision congestion kept it far lower\n- Every device ran half-duplex: transmit or receive, never both\n- The whole flat network was one broadcast domain: a single message reached everyone",
        },
      },
      {
        heading: { ar: "خوارزمية CSMA/CD خطوة بخطوة", en: "The CSMA/CD Algorithm Step by Step" },
        body: {
          ar: "البروتوكول رقصة من خمس خطوات: (1) استمع قبل الكلام — الحامل مشغول؟ انتظر حتى يهدأ. (2) أرسل إطاراتك وراقب الأسلاك أثناء الإرسال نفسه — الاستماع الذاتي المتواصل هو جوهر الكشف. (3) اكتشفت جهد التصادم؟ أوقف الإرسال فوراً وأرسل إشارة تشويش Jam لمدة 32 بتاً لتضمن أن كل المرسِلين الآخرين يكتشفون التصادم أيضاً. (4) تراجع زمناً عشوائياً وفق التراجع الأسي الثنائي. (5) أعد المحاولة حتى 16 مرة ثم أعلن الفشل وارمِ الحزمة.\n\nالتراجع الأسي الثنائي ذكي بامتياز: عند التصادم الأول ينتظر كل طرف عدداً عشوائياً من الفتحات من 0 إلى 1، وعند الثاني من 0 إلى 3، ثم 0-7، ثم 0-15... حتى 0-1023. العشوائية تفرّق المتصادمين، والاتساع الأسي يمنح الشبكة فرصة للاستقرار تدريجياً.\n\n- الفتحة الزمنية = 512 زمن-بت، ومن هنا وُلد الحد الأدنى 64 بايتاً للإطار\n- الفكرة الفيزيائية: يجب أن يستمر الإرسال طويلاً كفاية ليصل نبض التصادم إلى المرسِل قبل أن ينهي كلامه — وإلا كشف متأخر فاسد\n- الشبكات القانونية حسبت أقصى قطر (وهذا مصدر قاعدة الـ 100 متر لكل قطعة كابل تقريباً)",
          en: "The protocol is a five-step dance: (1) listen before talking — carrier busy? wait for silence. (2) Transmit while monitoring the wire during the transmission itself — continuous self-listening is the heart of detection. (3) Sensed the collision voltage? Abort immediately and send a 32-bit jam signal guaranteeing every other transmitter also detects it. (4) Wait a random time under binary exponential backoff. (5) Retry up to 16 times, then declare failure and drop the packet.\n\nBinary exponential backoff is brilliantly simple: after the first collision each party waits a random 0-1 slots, next collision 0-3, then 0-7, then 0-15... up to 0-1023. Randomness separates the colliders; exponential widening lets the network stabilize gradually.\n\n- One slot = 512 bit-times — which is exactly where the 64-byte frame minimum was born\n- The physics: a transmission must last long enough for the collision pulse to reach its sender before he finishes talking — otherwise detection comes too late and corrupted\n- Legal networks computed a maximum diameter (the root of the roughly 100-meters-per-cable-segment rule)",
        },
      },
      {
        heading: { ar: "نطاق التصادم مقابل نطاق البث", en: "Collision Domain vs Broadcast Domain" },
        body: {
          ar: "هذان المصطلحان يشكّلان أهم زوج تمييزي في الطبقة الثانية، ومردهما سؤالان مختلفان: نطاق التصادم يجيب عن «من قد يتعارك إرساله معي؟» ونطاق البث يجيب عن «من سيستقبل بثّي حتماً؟».\n\n- المكرّر (Hub): منفذ واحد منطقياً — كل المنافذ نطاق تصادم واحد ونطاق بث واحد\n- المبدّل (Switch): كل منفذ نطاق تصادم مستقل (الحل الشامل للتصادمات مع الازدواج الكامل)، أما البث فينتشر في كل منافذ الـ VLAN نفسه = نطاق بث لكل VLAN\n- الموجّه (Router): يفصل نطاقات البث — إطاره الأول فقط لكل قطاع، لا يمرر البث أبداً\n\nبعبارة جاهزة للحفظ: المبدّل يقسّم نطاقات التصادم ويوسّع نطاق البث؛ الموجّه يقسّم نطاقات البث. الـ VLAN — كما سنرى — تقسّم نطاق البث داخل المبدّل نفسه دون موجّه، وهذه ميزتها التاريخية الكبرى.",
          en: "These two terms form the most important distinction pair in Layer 2, answering different questions: a collision domain answers «who can collide with me?» while a broadcast domain answers «who necessarily receives my broadcast?»\n\n- Hub: logically one port — all ports are one collision domain and one broadcast domain\n- Switch: each port is its own collision domain (with full duplex, collisions are extinct), while broadcasts spread across every port of the same VLAN = one broadcast domain per VLAN\n- Router: separates broadcast domains — it never forwards broadcasts, period\n\nThe memorization-ready line: a switch splits collision domains and extends broadcast domains; a router splits broadcast domains. VLANs — as we will see — split broadcast domains inside a single switch with no router, which was their historic selling point.",
        },
        code: {
          lang: "text",
          snippet: "مقارنة الأجهزة على المحورين\n\nالجهاز    | نطاق التصادم        | نطاق البث\n----------|---------------------|---------------------\nHub       | واحد لكل المنافذ    | واحد لكل المنافذ\nSwitch    | منفصل لكل منفذ      | واحد لكل VLAN\nRouter    | منفصل لكل واجهة     | منفصل لكل واجهة\nVLAN      | —                   | يقسم داخل المبدّل\n\nالمبدّل الحديث + ازدواج كامل = CSMA/CD معطّل عملياً",
        },
      },
      {
        heading: { ar: "الازدواج: نصف وكامل والتفاوض", en: "Duplex: Half, Full, and the Negotiation" },
        body: {
          ar: "نصف الازدواج (Half-Duplex): قناة واحدة تُستخدم إرسالاً أو استقبالاً — نمط المكرّرات وWi-Fi التقليدي وكل بيئة CSMA/CD. الازدواج الكامل (Full-Duplex): قناتان منفصلتان (أزواج سلك مستقلة في الكابل الملتوي) تعملان معاً بسرعة الخط كاملة في الاتجاهين بلا تصادم أصلاً، لأن كل اتجاه له مساره الفيزيائي.\n\nالمفاوضة التلقائية (Autonegotiation) تتفق الطرفين على السرعة والازدواج عند ربط الوصلة. الأعطال الكلاسيكية: طرف يتفاوض وآخر مضبوط يدوياً على Full. النتيجة: المتفاوض يقرر Half (لعدم رد الطرف الآخر على نبضات التفاوض) بينما الثابت على Full يرسل متى شاء — فيحدث التصادم المتأخر (Late Collision): تصادم بعد 512 بت الأولى، وهو مستحيل في الازدواج الكامل الحقيقي وعَلَمُ عدم تطابق صريح.\n\n- الأعراض الدائمة: سرعة تبدو جيدة لكن النقل ينهار، وأخطاء CRC وlate collisions ترتفع في العدادات\n- القاعدة الحديثة: اترك المفاوضة التلقائية مفعّلة على الطرفين — تعطيلها يدوياً على طرف واحد هو أشهر سبب للعطل\n- الازدواج الكامل جعل CSMA/CD يغلق نفسه: لا احتمال تصادم فلا حاجة للآلية، ويحل محله التحكم بالتدفق 802.3x عبر إطارات PAUSE",
          en: "Half-duplex: one channel used either to send or receive — the mode of hubs, classic Wi-Fi, and every CSMA/CD environment. Full-duplex: two separate channels (independent wire pairs in twisted cabling) running simultaneously at full line rate in both directions with zero collisions, because each direction owns its physical path.\n\nAutonegotiation lets both ends agree on speed and duplex at link-up. The classic failure: one side negotiates while the other is hard-coded to Full. The negotiator (hearing no negotiation pulses) falls back to Half while the hard-coded side transmits at will — producing late collisions: collisions after the first 512 bits, impossible in true full-duplex and an explicit mismatch flag.\n\n- The chronic symptoms: link speed looks fine yet throughput collapses, with climbing CRC and late-collision counters\n- The modern rule: leave autonegotiation on at both ends — disabling it on one side is the top misconfiguration cause\n- Full duplex retired CSMA/CD: no collision possibility, no need for the mechanism, replaced by 802.3x flow control via PAUSE frames",
        },
        tip: {
          ar: "قاعدة تشخيص ذهبية: التصادم المتأخر (Late Collision) في عدادات المنفذ = اتهم عدم تطابق الازدواج فوراً قبل الكابل نفسه. التصادم العادي المتزايد في شبكة حديثة أصلاً مؤشر شبه منعدم.",
          en: "A golden diagnostic rule: late collisions in a port's counters = suspect duplex mismatch immediately, before blaming the cable. Ordinary collisions in a modern network are a near-extinct signal.",
        },
      },
      {
        heading: { ar: "أين تبقى هذه المفاهيم حية؟", en: "Where Do These Concepts Still Live?" },
        body: {
          ar: "قد تظن أن التاريخ هنا انتهى، لكن ثلاث جبهات تُبقيه حاضراً. أولاً: Wi-Fi ليس إيثرنت سلكية؛ إنه CSMA/CA — تجنّب التصادم بدل كشفه، لأن جهاز اللاسلكي لا يستطيع الاستماع أثناء إرساله (الإشارة المرسلة تطغى بآلاف المرات على المستقبَلة). سنبني عليه في وحدة اللاسلكي.\n\nثانياً: قراءة العدادات مهارة يومية — show interfaces على Cisco وip -s link على لينكس تعرض التصادمات والمتأخرة منها وCRC، وأنت الآن تملك خريطة تفسيرها. ثالثاً: أسئلة الشهادات تختبر التمييز بين النطاقين بلا رحمة، لأنه يميّز المصمّم الجيد: تصميم يجمع المبدّلات بحكمة ويضع الموجّهات/الـ VLANs في أماكنها الصحيحة يضبط حجم نطاقي البث والتصادم بدقة الجرّاح.\n\n- في المعمل: اربط جهازين عبر مكرّل قديم إن وجد وشاهد التصادمات تتراكم، ثم بدّله بمبدّل وشاهد الصفر المطلق\n- على بطاقة لينكس: ethtool يعرض الحالة التفاوضية الحالية (Speed/Duplex) وسجلها\n- أي وصلة تراها Half اليوم في شبكة سلكية هي إما وصلة قديمة جداً... أو عطل تفاوض",
          en: "You might think history ends here, but three fronts keep it alive. First: Wi-Fi is not wired Ethernet; it runs CSMA/CA — collision avoidance rather than detection, because a radio cannot hear while transmitting (its own signal drowns reception by orders of magnitude). We will build on that in the wireless module.\n\nSecond: reading counters is a daily skill — show interfaces on Cisco and ip -s link on Linux display collisions, late collisions and CRC, and you now own the interpretation map. Third: certification exams test the two-domain distinction mercilessly, because it separates good designers: a design that joins switches wisely and places routers/VLANs correctly tunes broadcast and collision domain sizes like a surgeon.\n\n- In the lab: connect two PCs through an old hub if you find one and watch collisions pile up, then swap in a switch and watch absolute zero\n- On a Linux NIC: ethtool shows the negotiated state (Speed/Duplex) and its history\n- Any half-duplex link in a wired network today is either very old... or a negotiation failure",
        },
        code: {
          lang: "bash",
          snippet: "# عرض سرعة/ازدواج الوصلة الحالية (لينكس)\nsudo ethtool eth0\n#   Settings for eth0:\n#     Speed: 1000Mb/s   Duplex: Full   Auto-negotiation: on\n\n# إحصاءات التصادم وأخطاء CRC\nip -s link show eth0\n\n# فرض ازدواج معين في المعمل (ثم أعده لـ auto!)\nsudo ethtool -s eth0 speed 100 duplex half autoneg off",
        },
      },
    ],
    keyPoints: [
      { ar: "CSMA/CD = استمع، أرسل مع مراقبة ذاتية، اكشف، أرسل Jam، تراجع أسي ثنائي، أعد حتى 16", en: "CSMA/CD = listen, transmit with self-monitoring, detect, jam, binary exponential backoff, retry to 16" },
      { ar: "الحد الأدنى 64 بايتاً (512 زمن-بت) يضمن كشف التصادم قبل نهاية الإرسال", en: "The 64-byte (512 bit-time) minimum guarantees collision detection before transmission ends" },
      { ar: "المبدّل: نطاق تصادم مستقل لكل منفذ + نطاق بث واحد لكل VLAN؛ الموجّه يفصل نطاق البث", en: "Switch: one collision domain per port + one broadcast domain per VLAN; routers separate broadcast domains" },
      { ar: "الازدواج الكامل ألغى التصادمات فأطفأ CSMA/CD، وحل محله تحكم التدفق 802.3x", en: "Full duplex eliminated collisions and switched off CSMA/CD, replaced by 802.3x flow control" },
      { ar: "التصادم المتأخر = بصمة عدم تطابق الازدواج الكلاسيكية", en: "Late collisions = the classic duplex-mismatch fingerprint" },
      { ar: "Wi-Fi يكمل القصة بـ CSMA/CA: تجنّب التصادم لأن الكشف أثناء الإرسال متعذر لاسلكياً", en: "Wi-Fi continues the story with CSMA/CA: avoid collisions because detecting during transmit is radio-impossible" },
    ],
    commands: [
      { cmd: "sudo ethtool eth0", desc: { ar: "عرض سرعة الوصلة وازدواجها وحالة التفاوض التلقائي", en: "Show link speed, duplex, and autonegotiation state" } },
      { cmd: "ip -s link show eth0", desc: { ar: "عرض إحصاءات الواجهة: التصادمات، أخطاء CRC، الفقد", en: "Show interface statistics: collisions, CRC errors, drops" } },
      { cmd: "show interfaces fa0/1", desc: { ar: "على Cisco: تفاصيل الواجهة مع عدادات التصادم والمتأخر منه (IOS)", en: "On Cisco: interface details with collision and late-collision counters (IOS)" } },
      { cmd: "sudo ethtool -s eth0 speed 100 duplex half", desc: { ar: "ضبط يدوي للسرعة والازدواج لاختبار سلوك عدم التطابق في المعمل", en: "Manually set speed/duplex to reproduce mismatch behavior in the lab" } },
    ],
    quiz: [
      {
        q: { ar: "أي جهاز يفصل نطاقات التصادم دون فصل نطاق البث (في VLAN واحد)؟", en: "Which device separates collision domains but not the broadcast domain (within one VLAN)?" },
        options: [
          { ar: "المكرّر Hub", en: "Hub" },
          { ar: "المبدّل Switch", en: "Switch" },
          { ar: "الموجّه Router", en: "Router" },
          { ar: "مكرّر الإشارة Repeater", en: "Repeater" },
        ],
        correct: 1,
        explain: { ar: "كل منفذ مبدّل نطاق تصادم مستقل بذاته (وهذا أنقذ الإيثرنت من التصادمات)، لكن إطار البث ينسخ إلى كل منافذ الـ VLAN نفسه فتبقى نطاق بث واحداً. الموجّه وحده هو من يفصل نطاق البث.", en: "Every switch port is its own collision domain (which rescued Ethernet), yet a broadcast frame is copied to all ports of the same VLAN, keeping one broadcast domain. Only a router splits broadcast domains." },
      },
      {
        q: { ar: "ما وظيفة إشارة التشويش Jam في CSMA/CD؟", en: "What is the purpose of the jam signal in CSMA/CD?" },
        options: [
          { ar: "تشفير الإطار لمنع التنصت", en: "Encrypting the frame against eavesdropping" },
          { ar: "إبلاغ المرسِلين الآخرين بالتصادم ليوقفوا ويعيدوا الجدولة", en: "Telling all other transmitters about the collision so they abort and reschedule" },
          { ar: "طلب إعادة إرسال من المستقبِل", en: "Requesting retransmission from the receiver" },
          { ar: "مزامنة ساعة المستقبِل قبل الإطار", en: "Syncing the receiver clock before a frame" },
        ],
        correct: 1,
        explain: { ar: "المرسل الذي اكتشف التصادم يبثّ 32 بتاً من التشويش عمداً لتضمن وصول «صرخة التصادم» إلى كل طرف يرسل حالياً فتوقف الجميع إرسالها وتدخل في التراجع العشوائي — لولامها لظل بعض المرسلين يتكلم بلا علم.", en: "The station detecting the collision deliberately sends 32 jam bits so the «collision scream» reaches everyone currently transmitting, making all abort and enter random backoff — otherwise some would keep talking unaware." },
      },
      {
        q: { ar: "شبكة مبدّلات سلكية حديثة بكل وصلات ازدواج كامل مفعّلة. ما مصير CSMA/CD؟", en: "A modern all-switched wired network with full duplex everywhere. What happens to CSMA/CD?" },
        options: [
          { ar: "يعمل أسرع لأن عرض النطاق زاد", en: "It runs faster because bandwidth increased" },
          { ar: "يُعطّل عملياً: لا احتمال تصادم فلا حاجة له", en: "It is effectively disabled: no collision possibility, no need for it" },
          { ar: "يُستبدل ببروتوكول ARP", en: "It is replaced by ARP" },
          { ar: "يبقى مفعّلاً في البث فقط", en: "It stays active for broadcasts only" },
        ],
        correct: 1,
        explain: { ar: "في الازدواج الكامل لكل اتجاه مساره الفيزيائي المنفصل فلا يمكن أن يتصادم الإرسالان أصلاً، لذا تتعطل آلية CSMA/CD ذاتياً ويحل محلها تحكم التدفق 802.3x بإطارات PAUSE.", en: "In full duplex each direction has its own physical path so two transmissions can never collide; CSMA/CD therefore self-deactivates and 802.3x flow control with PAUSE frames takes its place." },
      },
      {
        q: { ar: "وصلتان بأداء ممتاز ظاهرياً لكن عدادات المنفذ تظهر late collisions وCRC. أرجح تشخيص؟", en: "A link looks healthy yet shows late collisions and CRC errors. Most likely diagnosis?" },
        options: [
          { ar: "عنوان MAC مكرر في الشبكة", en: "A duplicate MAC address in the network" },
          { ar: "VLAN غير متطابقة على طرفي الوصلة", en: "A VLAN mismatch at the two link ends" },
          { ar: "عدم تطابق الازدواج بين الطرفين", en: "A duplex mismatch between the two ends" },
          { ar: "امتلاء جدول MAC للمبدّل", en: "The switch MAC table is full" },
        ],
        correct: 2,
        explain: { ar: "التصادم المتأخر (بعد 512 بت الأولى) مستحيل فيزيائياً في الازدواج الكامل الحقيقي؛ ظهوره يعني أن طرفاً يرسل متى شاء (Full ثابت) بينما الآخر نصف ازدواج — نمط عدم التطابق الكلاسيكي.", en: "Late collisions (after the first 512 bits) are physically impossible in genuine full duplex; seeing them means one side transmits at will (hard-coded Full) while the other runs half — the classic mismatch pattern." },
      },
    ],
  },
  {
    id: "l034",
    moduleId: "m04",
    order: 4,
    level: "intermediate",
    title: { ar: "منطق تمرير المبدّل: توجيه وترشيح وإغراق", en: "Switch Forwarding Logic: Forward, Filter, Flood" },
    summary: {
      ar: "المصائر الثلاثة للإطار داخل المبدّل وكيف يقررها: التوجيه للمعروف، الترشيح عند المنفذ نفسه، الإغراق للمجهول — ثم مقارنة أسلوبي الخزن والتمرر مع أسلوب القص والتمرير في الأداء والسلامة.",
      en: "The three fates of a frame inside a switch and how it decides: forward the known, filter the same-port, flood the unknown — then store-and-forward versus cut-through performance and integrity trade-offs.",
    },
    durationMin: 14,
    sections: [
      {
        heading: { ar: "ماذا يفعل المبدّل فعلياً؟", en: "What Does a Switch Actually Do?" },
        body: {
          ar: "المبدّل الحديث آلة متخصصة بعمليتين فقط تكررهما مليارات المرات في الثانية: يتعلم (يقرأ عنوان مصدر كل إطار وارد ويربطه بمنفذ الدخول) ويمرّر (يبني قراره لكل إطار من عنوان وجهته). كل هذا في عتاد ASIC مخصص لا في معالج عام — سرعة خطّية بزمن ثابت مهما امتلأت الشبكة.\n\nالفرق عن المكرّر جوهري: المكرّر يكرر الإشارة الكهربائية بلا فهم، والمبدّل يفهم الإطار: يقرأ الوجهة، يبحث في جدول MAC، يتخذ قراراً ذكياً بالمنفذ الخروج. لذلك صار كل منفذ نطاق تصادم مستقلاً والشبكات ازدواجاً كاملاً بلا تصادمات.\n\n- الجدول (MAC Address Table أو CAM Table) هو ذاكرة القرار: عنوان MAC → منفذ + VLAN\n- كل القرارات مقيدة بنطاق الـ VLAN: الإغراق لا يعبر إلى VLAN أخرى أبداً\n- المبدّل شفاف للطرفيات: لا يعرف به أحد، لا يعدّل الإطارات (عدا حساب FCS جديد عند الوسم)",
          en: "A modern switch is a machine specialized in exactly two operations, repeated billions of times per second: it learns (reads the source address of every incoming frame and binds it to the ingress port) and it forwards (builds a per-frame decision from the destination). All in dedicated ASIC silicon, not a general CPU — wire speed with constant latency no matter how busy the network.\n\nThe difference from a hub is fundamental: a hub repeats the electrical signal with no comprehension; a switch understands the frame — reads the destination, looks up its MAC table, makes an intelligent egress-port decision. Hence each port is its own collision domain and networks run full duplex collision-free.\n\n- The table (MAC Address Table, CAM Table) is decision memory: MAC → port + VLAN\n- Every decision is scoped to the VLAN: flooding never crosses into another VLAN\n- The switch is transparent to endpoints: nobody knows it exists, frames pass unmodified (except a recomputed FCS when tagging)",
        },
      },
      {
        heading: { ar: "المصائر الثلاثة للإطار", en: "The Three Fates of a Frame" },
        body: {
          ar: "لكل إطار وارد ثلاث حالات ممكنة لا رابع لها. أولاً — التوجيه (Forward): عنوان الوجهة موجود في الجدول ومنفذه مختلف عن منفذ الدخول، فيُنسخ الإطار إلى ذلك المنفذ وحده. هذا هو الحال الصحي السائد في الشبكة المستقرة.\n\nثانياً — الترشيح (Filter): عنوان الوجهة موجود في الجدول لكن منفذه هو نفسه منفذ الدخول؛ أي أن الوجهة على نفس القطاع الذي جاء منه الإطار. لا داعي لإرساله أصلاً فيُرمى بلا نسخ — المبدّل يوفر عرض النطاق بضربة ذكاء واحدة. ثالثاً — الإغراق (Flood): الوجهة مجهولة أو بث أو جماعي غير مُدار، فيُنسخ الإطار إلى كل منافذ الـ VLAN عدا منفذ الدخول.\n\n- القرار يستغرق زمناً ثابتاً في العتاد: البحث في CAM عملية موازية كهربائية لا بحث برمجي\n- لاحظ عدم التماثل: التعلم من المصدر والتمرير للوجهة — حقلان مختلفان في الإطار الواحد\n- نتيجة عملية: فور اكتمال التعلم المتبادل، تتوقف حركة الإغراق تماماً وتصبح الشبكة نقية تمريراً",
          en: "Every incoming frame has exactly three possible fates. First — Forward: the destination is in the table on a port different from ingress, so the frame is copied out that one port. This is the healthy steady state of a stable network.\n\nSecond — Filter: the destination is in the table but on the very ingress port itself — the destination lives on the same segment the frame came from. No need to send anything, so it is silently dropped — one clever move saves bandwidth. Third — Flood: the destination is unknown, broadcast, or unmanaged multicast, so the frame is copied to every VLAN port except the ingress.\n\n- The decision takes constant time in silicon: a CAM lookup is a parallel electrical match, not a software search\n- Note the asymmetry: learning from the source, forwarding by the destination — two different fields in one frame\n- Practical outcome: once mutual learning completes, flooding ceases entirely and the network becomes pure forwarding",
        },
        code: {
          lang: "text",
          snippet: "شجرة قرار المبدّل لكل إطار وارد\n\nIF (الوجهة موجودة في الجدول) {\n   IF (منفذ الوجهة != منفذ الدخول)  -> Forward: نسخة واحدة إلى منفذ الوجهة\n   ELSE                            -> Filter:  رمي الإطار (الوجهة خلفك أصلاً)\n} ELSE IF (بث أو جماعي)             -> Flood: كل منافذ الـ VLAN عدا الدخول\n} ELSE (أحادي مجهول)               -> Flood: كل منافذ الـ VLAN عدا الدخول\n\nكل شيء ضمن نطاق الـ VLAN نفسه — لا عبور بين VLANs هنا أبداً",
        },
      },
      {
        heading: { ar: "إغراق الأحادي المجهول: السلوك المؤقت الحكيم", en: "Unknown Unicast Flooding: Wise Temporary Behavior" },
        body: {
          ar: "لو صار إطار موجّه إلى جهاز لم يعرفه المبدّل بعد — ماذا يفعل؟ الرمي سيفقد الرسالة، والتسليم مضمون يقتضي السؤال الواسع: يغرق المبدّل الإطار إلى كل المنافذ عدا الدخول، متوكلاً على أن الجهاز المستهدف إن وُجد فسيجيب، وتعليم الجدول بالاستجابة العائدة يجعل الإطارات اللاحقة موجَّهة مباشرة.\n\nهذا التصميم «اطلب السماح لا الإذن» بالمعنى الشبكي هو نفسه منطق ARP في الطبقة الأعلى — والاثنان يلتقيان: حزمة IP إلى جهاز مجهول MAC تستدعي بث ARP، وردّ ARP يعلم الجدولين معاً فتنطفئ موجة الإغراق من تلقاء نفسها.\n\n- الحالة الشاذة المستمرة: جهاز صامت لا يرسل شيئاً أبداً (مستقبِل كاميرا مراقبة مثلاً) — يظل مجهولاً فتغرق كل إطاراته دوماً\n- الحل الأنيق: سجّل عنوانه يدوياً في الجدول (Static MAC Entry) — درس l035\n- احذر تشخيصاً خاطئاً: إغراق طبيعي عابر عند الإقلاع ليس عطلاً؛ الإغراق المزمن المتواصل هو الذي يستحق التشيخ",
          en: "If a frame is destined to a device the switch does not yet know — what then? Dropping it loses the message; guaranteed delivery demands asking broadly: the switch floods the frame to all ports except ingress, trusting that the target, if present, will answer, and learning from the returning reply makes all subsequent frames precisely forwarded.\n\nThis ask-broadly-then-learn design mirrors ARP's logic one layer up — and the two meet: an IP packet to an unknown-MAC host triggers a broadcast ARP, and the ARP reply teaches both tables, extinguishing the flooding wave by itself.\n\n- The chronic anomaly: a permanently silent device (say, a one-way surveillance camera receiver) stays unknown, so every frame to it floods forever\n- The elegant fix: register its address manually (Static MAC Entry) — lesson l035\n- Avoid a wrong diagnosis: brief flooding at startup is normal; chronically continuous flooding is what deserves investigation",
        },
      },
      {
        heading: { ar: "أسلوبا التبديل: خزّن ثم مرّر مقابل قصّ ومرّر", en: "Switching Styles: Store-and-Forward vs Cut-Through" },
        body: {
          ar: "خزّن ثم مرّر (Store-and-Forward): يستقبل المبدّل الإطار كاملاً في الذاكرة، يتحقق من FCS، ثم يمرّره. الكلفة: زمن الكمون يساوي زمن استقبال الإطار كله (عند 1Gbps وحد أقصى 12 ميكروثانية تقريباً — هامش ضئيل). المكافأة: الإطارات الفاسدة تُرمى هنا فلا تسافر عبر الشبكة، وتصبح تصنيفات الجودة QoS المبنية على محتوى الحزمة ممكنة لأن كل شيء متاح للفحص. هذا الأسلوب افتراضي في مبدّلات Cisco الحديثة.\n\nقصّ ومرّر (Cut-Through): يقرأ المبدّل الوجهة فقط (أول بايتات الإطار بعد المقدمة) ويبدأ الدفع خارج المنفذ فوراً بينما ما زال باقي الإطار يصل. الكمون يهبط إلى الحد الأدنى المطلق (ميكروثانية جزئية) — لكن الإطار الفاسد مرّ كما هو، بل قد تُمرَّر قطع قزمية (Runts) ناقصة أصل التصادمات. نمط وسيط اسمه Fragment-Free يقرأ أول 64 بايتاً (حجم التصادم القانوني) قبل التمرير: يستبعد القطع الناقصة بكمون زائد قليل.\n\n- القاعدة العملية الحديثة: سرعات الخطوط العالية جعلت كلفة store-and-forward ضئيلة، فانتشر افتراضياً\n- أنصار cut-through: أقمشة مراكز البيانات فائقة السرعة (عمليات مالية عالية التردد، أقمشة leaf-spine) حيث تُقاس الكمونات بالميكروثانية\n- في نمط cut-through يُقاس الكمون من أول بت داخلاً إلى أول بت خارجاً، وليس من نهاية الإطار",
          en: "Store-and-Forward: the switch receives the entire frame into memory, verifies the FCS, then forwards. The cost: latency equals the full frame's arrival time (at 1 Gbps roughly 12 microseconds maximum — a tiny margin). The reward: corrupt frames die here and never travel the network, and QoS classification based on packet content becomes possible since everything is inspectable. This style is the default on modern Cisco switches.\n\nCut-Through: the switch reads only the destination (the first frame bytes after the preamble) and begins pushing bits out the egress while the rest of the frame is still arriving. Latency drops to the absolute minimum — but a corrupt frame passes untouched, and even runts (collision fragments) may be forwarded. A middle style, Fragment-Free, reads the first 64 bytes (the legal collision size) before forwarding: it excludes fragments at a slightly higher latency.\n\n- The practical modern rule: high line speeds made store-and-forward's cost negligible, so it won the default\n- Cut-through's champions: ultra-low-latency data center fabrics (high-frequency trading, leaf-spine) where microseconds matter\n- In cut-through mode, latency is measured first-bit-in to first-bit-out, not from frame end",
        },
        tip: {
          ar: "في مبدّلات Cisco الحديثة تجد مزيجاً ذكياً: المنفذ يبدأ cut-through لكنه يتحول store-and-forward تلقائياً عندما ترتفع أخطاء الخط — أفضل العالمين بلا تدخل منك.",
          en: "On modern Cisco switches you may find a smart hybrid: ports start cut-through but automatically shift to store-and-forward when line errors rise — best of both worlds without your intervention.",
        },
      },
      {
        heading: { ar: "مراقبة القرار على معدات IOS", en: "Watching the Decision on IOS" },
        body: {
          ar: "لا يكتمل فهم التمرير إلا برؤيته حياً. جدول MAC هو نافذتك الأولى: show mac address-table يعرض العناوين المتعلمة (النوع الديناميكي)، مع منافذها وVLANها. أضف كلمة count لترى حجم الجدول، وaddress مع عنوان لتتبّعه.\n\nثم عدادات المنافذ: show interfaces counters errors تكشف إطارات CRC والقطع الناقصة والتجاوزات لكل منفذ — وهي لغة عتاد store-and-forward. ارتفاع CRC على منفذ واحد يعني مشكلة على وصلة ذلك المنفذ تحديداً، فتعزل التشخيص فوراً. اربط هذه القراءات بما تعلمته عن مصائر الإطار: إطار فاسد يُرمى هنا لا يظهر في عدادات منافذ الخروج أبداً — لذلك مجموع الإطارات قد يتراجع عبر القفزات وهذا طبيعي سليم.\n\nتمرين معمل متكامل يجمع الدرس كله: أفرغ الجدول (clear mac address-table dynamic)، شغّل ping بين جهازين، ثم اعرض الجدول فوراً — سترى التعلمين المتقابلين للمصدرين. أرسل بعدها ping إلى عنوان غير موجود في الشبكة وراقب الإغراق في Wireshark على منفذ ثالث: الحزمة تصله رغم أنه ليس طرفاً — شهادة حية على سلوك الأحادي المجهول الذي شرحناه.",
          en: "Understanding forwarding is incomplete until you watch it live. The MAC table is your first window: show mac address-table lists learned addresses (dynamic type) with their ports and VLANs. Add count to see the table size, or address to trace one entry.\n\nThen port counters: show interfaces counters errors exposes per-port CRC frames, fragments, and overruns — the language of store-and-forward hardware. Rising CRC on a single port means a problem on that port's link specifically, instantly isolating diagnosis. Tie these readings to the frame fates you learned: a corrupt frame dropped here never appears in egress counters, so totals may legitimately shrink across hops.\n\nA complete lab exercise binds the whole lesson: flush the table (clear mac address-table dynamic), run a ping between two hosts, then immediately re-display the table — you will see both sides' mutual learning. Afterwards ping a nonexistent address and watch the flood in Wireshark on a third port: the packet reaches it even though it is not a party — live testimony to the unknown-unicast behavior we explained.",
        },
        code: {
          lang: "text",
          snippet: "Switch# show mac address-table\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  10    0050.56b1.2a41    DYNAMIC     Gi0/1\n  10    00d0.ffab.1201    DYNAMIC     Fa0/5\n  20    b827.eb44.91c3    DYNAMIC     Fa0/9\nTotal Mac Addresses for this criterion: 3\n\nSwitch# show interfaces counters errors\nPort      Align-Err    FCS-Err    Xmit-Err    Rcv-Err\nGi0/1              0          0           0          0\nFa0/5              0         14           0          0   <- وصلة تعاني فساد إطارات",
        },
      },
    ],
    keyPoints: [
      { ar: "المبدّل آلة تعلّم وتمرير في عتاد ASIC: زمن قرار ثابت بسرعة الخط", en: "A switch is a learn-and-forward machine in ASIC: constant decision time at line rate" },
      { ar: "ثلاثة مصائر: توجيه للمعروف، ترشيح عند تطابق منفذي الدخول والوجهة، إغراق للمجهول والبث", en: "Three fates: forward the known, filter when ingress port equals destination port, flood the unknown and broadcast" },
      { ar: "كل القرارات محصورة في نطاق VLAN — الإغراق لا يعبر VLANs", en: "All decisions are scoped to the VLAN — flooding never crosses VLANs" },
      { ar: "store-and-forward: تحقق FCS + إسقاط الفاسد + تمكين QoS، وهو الافتراضي الحديث", en: "Store-and-forward: FCS verification + dropping corruption + enabling QoS — the modern default" },
      { ar: "cut-through: كمون أدنى بلا تحقق — ينقل الفاسد والقطع الناقصة؛ fragment-free حل وسط بأول 64 بايتاً", en: "Cut-through: minimal latency, no verification — carries corrupt frames and runts; fragment-free is the 64-byte middle path" },
      { ar: "الجهاز الصامت للأبد يظل مجهولاً فتُغرق إطاراته دائماً — حله إدخال MAC ثابت", en: "A forever-silent device stays unknown and is perpetually flooded — solved with a static MAC entry" },
    ],
    commands: [
      { cmd: "show mac address-table", desc: { ar: "عرض جدول MAC كاملاً: العناوين والمنافذ وVLAN لكل منها", en: "Display the full MAC table: addresses, ports, and their VLANs" } },
      { cmd: "show mac address-table dynamic", desc: { ar: "عرض العناوين المتعلمة ديناميكياً فقط (دون الثابتة)", en: "Show only dynamically learned entries (excluding statics)" } },
      { cmd: "show interfaces counters errors", desc: { ar: "عرض أخطاء المنافذ: FCS، القطع الناقصة، التجاوزات — لغة عتاد التمرير", en: "Show per-port errors: FCS, fragments, overruns — forwarding-hardware language" } },
      { cmd: "clear mac address-table dynamic", desc: { ar: "مسح التعلمات الديناميكية لإجبار إعادة التعلم (مفيد في المعمل)", en: "Flush dynamic entries to force re-learning (handy in labs)" } },
    ],
    quiz: [
      {
        q: { ar: "وصل إطار أحادي الوجهة إلى منفذ Fa0/5 ووجهته مسجلة في الجدول على منفذ Fa0/5 نفسه. ماذا يفعل المبدّل؟", en: "A unicast frame arrives on Fa0/5 and its destination is table-listed on Fa0/5 itself. What does the switch do?" },
        options: [
          { ar: "يوجّهه إلى جميع المنافذ الأخرى", en: "Forwards it to all other ports" },
          { ar: "يرسل نسخة إلى منفذ البوابة الافتراضية", en: "Sends a copy to the gateway port" },
          { ar: "يرميه — ترشيح لأن الوجهة على منفذ الدخول ذاته", en: "Drops it — filtered because the destination is on the ingress port" },
          { ar: "يحوّله إلى بث ليتأكد الوصول", en: "Converts it to broadcast to ensure delivery" },
        ],
        correct: 2,
        explain: { ar: "هذه حالة الترشيح: الوجهة تعيش على نفس القطاع الذي جاء منه الإطار، فأي إرسال مكرر بلا معنى. المبدّل يرمي الإطار موفراً عرض النطاق — الطرف الآخر وصله مباشرة عبر ذلك القطاع.", en: "This is the filter case: the destination lives on the same segment the frame came from, so re-sending is pointless. The switch drops it, saving bandwidth — the other side already received it directly on that segment." },
      },
      {
        q: { ar: "ما الضعف الجوهري في أسلوب القص والتمرير Cut-Through؟", en: "What is the fundamental weakness of cut-through switching?" },
        options: [
          { ar: "كمون مرتفع جداً مقارنة بأسلوب الخزن", en: "Much higher latency than store-and-forward" },
          { ar: "لا يفهم وسوم VLAN على الإطلاق", en: "It cannot understand VLAN tags at all" },
          { ar: "لا يتحقق من FCS فيمرر الإطارات الفاسدة والقطع الناقصة", en: "It skips FCS verification, forwarding corrupt frames and fragments" },
          { ar: "يتطلب جدول MAC أكبر بعشرة أضعاف", en: "It requires a ten-times larger MAC table" },
        ],
        correct: 2,
        explain: { ar: "القص والتمرر يدفع الإطار خارجاً بمجرد قراءة الوجهة، قبل وصول FCS أصلاً — فالإطار الفاسد يمر كما هو. مقابل ذلك يخسر الكمون الدنيا المطلقة، ولهذا يُستخدم في أقمشة مراكز البيانات فائقة الحساسية للكمون.", en: "Cut-through pushes the frame out upon reading just the destination, before the FCS even arrives — so corrupt frames pass as-is. The price is worth it only in latency-critical data center fabrics." },
      },
      {
        q: { ar: "الوجهة أحادية غير موجودة في جدول MAC. ما مصير الإطار؟", en: "A unicast destination is missing from the MAC table. What happens to the frame?" },
        options: [
          { ar: "يُرمى فوراً لأن التسليم غير مضمون", en: "It is dropped immediately since delivery is not guaranteed" },
          { ar: "يُغرق إلى كل منافذ الـ VLAN عدا منفذ الدخول", en: "It is flooded to all VLAN ports except the ingress" },
          { ar: "يُرسل إلى الموجّه دائماً", en: "It is always sent to the router" },
          { ar: "يُخزن حتى يتعلم المبدّل العنوان", en: "It is buffered until the switch learns the address" },
        ],
        correct: 1,
        explain: { ar: "الأحادي المجهول يُغرق على أمل أن يجيب الجهاز المستهدف فتتعلم المبدّلات المسار من ردّه — تسليم مضمون بثمن موجة عابرة من النسخ. هذا هو السلوك المؤقت الحكيم الذي يزول ذاتياً بالتعلم.", en: "Unknown unicast floods on the hope the target replies, letting switches learn the path from the answer — guaranteed delivery at the price of a transient copy wave. This wise temporary behavior self-extinguishes through learning." },
      },
      {
        q: { ar: "لماذا يستطيع أسلوب store-and-forward تصنيف الحزم في جودة الخدمة QoS أفضل من cut-through؟", en: "Why can store-and-forward classify packets for QoS better than cut-through?" },
        options: [
          { ar: "لأنه يمتلك الإطار كاملاً في ذاكرته فيستطيع فحص الحقول العميقة في الحزمة", en: "Because it holds the whole frame in memory and can inspect deep packet fields" },
          { ar: "لأنه يستخدم معالجاً عاماً أسرع", en: "Because it uses a faster general-purpose CPU" },
          { ar: "لأنه يقرأ بتات المقدمة بدقة أعلى", en: "Because it reads preamble bits more accurately" },
          { ar: "لأنه يتعلم عناوين MAC تلقائياً أثناء التمرير", en: "Because it learns MAC addresses while forwarding" },
        ],
        correct: 0,
        explain: { ar: "التصنيف المتقدم (منافذ TCP/UDP، عناوين IP، حمولات) يتطلب وصولاً لحقول تقبع عميقاً في الحزمة الداخلية — وهذا لا يتاح إلا بعد استقبال الإطار كاملاً في الذاكرة، أي في store-and-forward حصراً.", en: "Advanced classification (TCP/UDP ports, IP addresses, payloads) requires fields deep inside the inner packet — reachable only after the whole frame sits in memory, i.e., exclusively in store-and-forward." },
      },
    ],
  },
  {
    id: "l035",
    moduleId: "m04",
    order: 5,
    level: "intermediate",
    title: { ar: "تعلّم MAC والتقادم وإغراق المجهول", en: "MAC Learning, Table Aging, Unknown Unicast Flooding" },
    summary: {
      ar: "دورة حياة إدخال جدول MAC من لحظة التعلم حتى التقادم: مؤقّت 300 ثانية، تحديثات المرور المتواصل، عودة الإغراق عند الفناء، الإدخالات الثابتة، وأمن المنفذ لتحجيم التعلم.",
      en: "The lifecycle of a MAC table entry from learning to aging: the 300-second timer, refresh-by-traffic, flooding's return on expiry, static entries, and port security to bound learning.",
    },
    durationMin: 12,
    sections: [
      {
        heading: { ar: "كيف يتعلم المبدّل؟ من حقل المصدر فقط", en: "How a Switch Learns: From the Source Field Only" },
        body: {
          ar: "التعلم عمل أحادي الاتجاه: المبدّل يقرأ حقل مصدر كل إطار يدخل منفذاً ما، ثم يسجّل ثلاثية (عنوان MAC + منفذ الدخول + VLAN) في الجدول إن لم تكن موجودة. الجهاز الذي لا يرسل شيئاً لا يتعلم عنه أحد أبداً — أما جهاز يستقبل ويجيب فقد تعلّم عنه الجميع من مجرد إجاباته.\n\nهذه اللاتماثلية (تعلم من المصدر، قرار بالوجهة) هي التي تجعل شبكة الإيثرنت ذاتية التهيئة: صل أي أجهزة بأي مبدّل وشغّلها؛ خلال ثوانٍ من المرور الأول يكتمل الجدول وتصبح معظم الإطارات موجَّهة بدقة. لا مسؤول يضبط شيئاً يدوياً في الشبكات الصغيرة.\n\n- التعلم لا يمس الإطارات نفسها: لا تعديل ولا تأخير زائد ملموس — مجرد تسجيل موازٍ في الذاكرة\n- إطار يدخل بمنفذ مسجل لعنوان آخر؟ الإدخال يُحدَّث لآخر منفذ رأينا المصدر عليه (سلوك المهاجرة)\n- كل التعلمات الديناميكية تضيع عند إعادة التشغيل — الشبكة تبنيها من جديد خلال ثوانٍ",
          en: "Learning is one-directional: the switch reads the source field of every frame entering a port, then records the triple (MAC + ingress port + VLAN) in the table if absent. A device that never transmits is never learned by anyone — while a device that receives and replies is learned everywhere by its mere replies.\n\nThis asymmetry (learn from source, decide by destination) is what makes Ethernet self-configuring: plug anything into any switch, power up, and seconds after first traffic the table completes and most frames become precisely forwarded. No admin hand-enters anything in small networks.\n\n- Learning touches the frames themselves not at all: no modification, no perceptible delay — just a parallel memory write\n- A frame arriving on a port while the table maps that source elsewhere? The entry updates to the latest port (migration behavior)\n\n- All dynamic entries vanish on reboot — the network rebuilds them within seconds",
        },
      },
      {
        heading: { ar: "مؤقّت التقادم: الذاكرة المتجددة", en: "The Aging Timer: Self-Renewing Memory" },
        body: {
          ar: "كل إدخال ديناميكي يولد ومعه ساعة عدّ تنازلي — على مبدّلات Cisco قيمتها الافتراضية 300 ثانية (خمس دقائق). كل إطار جديد مصدره ذلك العنوان يعيد عقارب الساعة إلى بدايتها؛ الجهاز الحي النشِط يظل حاضراً في الجدول إلى الأبد، والجهاز الذي صمت خمس دقائق متواصلة يُمحى تدريجياً.\n\nلماذا هذا الهدر؟ ثلاث حِكَم تختفي في سطر واحد: جدول MAC حجمه محدود بالعتاد (آلاف إلى عشرات آلاف الإدخالات حسب المنصة)، والأجهزة تنتقل بين المنافذ والمبدّلات باستمرار في بيئة عمل حقيقية، وذاكرة تعرف من صمت قبل ساعة عن مساره الحالي هي ذاكرة تكذب. الحذف الدوري يحافظ على صدق الجدول وحيويته.\n\n- اعرض المؤقت: show mac address-table aging-time — سترى 300 للـ VLANs كلها غالباً\n- اضبطه بقيم أقصر (مثلاً 60 ثانية) في بيئات تتنقل أجهزتها بكثافة: تعلم أدق بثمن إغراق عابر أكبر\n- القيمة تُحسب من آخر إطار مصدر لا من لحظة الاستخدام — جهاز يستقبل دون أن يرسل يمحى أيضاً",
          en: "Every dynamic entry is born with a countdown clock — on Cisco switches defaulting to 300 seconds (five minutes). Each new frame sourced from that address resets the clock to the start; a live, active device stays in the table forever, while a device silent for five consecutive minutes fades out.\n\nWhy this housekeeping? Three wisdoms in one line: a MAC table is hardware-bounded in size (thousands to tens of thousands of entries by platform), devices keep moving between ports and switches in real workplaces, and memory claiming a path for someone silent an hour ago is lying memory. Periodic eviction keeps the table honest and fresh.\n\n- View the timer: show mac address-table aging-time — you will usually see 300 across all VLANs\n- Tune it shorter (say 60 seconds) in highly mobile environments: fresher learning at the price of more transient flooding\n- The countdown runs from the last sourced frame, not last use — a device that only receives ages out too",
        },
        code: {
          lang: "text",
          snippet: "Switch# show mac address-table aging-time\nVlan    Aging Time\n----    ----------\n  ALL  300 secs\n\n# تقصير المؤقت في بيئة أجهزتها متنقلة\nSwitch(config)# mac address-table aging-time 60\n\n# عرض حجم الجدول الحالي\nSwitch# show mac address-table count\nMac Entries : 7",
        },
        tip: {
          ar: "في المعمل بعد نقل كابل من منفذ لآخر: لا تنتظر انقضاء 300 ثانية — نفّذ clear mac address-table dynamic فتستقر الشبكة فوراً وترى سلوك الإغراق العابر بإم عينك.",
          en: "In the lab after moving a cable between ports: do not wait out 300 seconds — run clear mac address-table dynamic and the network settles instantly, letting you witness transient flooding with your own eyes.",
        },
      },
      {
        heading: { ar: "عندما يتقادم الإدخال: عودة الإغراق", en: "When the Entry Ages: Flooding Returns" },
        body: {
          ar: "ما إن يُمحى إدخال حتى يفقد المبدّل خرائط ذلك العنوان. الإطار التالي إليه يصير فجأة أحادياً مجهولاً: يُغرق إلى كل منافذ الـ VLAN، وإن أجاب الجهاز المستهدف عاد التعلم وعاد النقاء. هذه الجولة القصيرة (إغراق ثم ردّ ثم إعادة تعلم) هي الفاتورة الدورية لتلك الذاكرة المتجددة — وثمنها ضئيل في شبكة سليمة.\n\nالمشهد يستحق التشخيص الدقيق: إغراق عابر لحظة إقلاع الشبكة سلوك صحي مئة بالمئة. لكن إغراقاً مزمناً متواصلاً له أسباب مرضية تستحق التفتيش: جهاز صامت دائم (مستقبِلات بث)، حلقة طابق ثانٍ تولّد مروراً دائماً (درس l039)، أو جدول ممتلئ فاقد السعة يتعلم وينسى بسرعة جنونية.\n\n- راقب نسبة الإغراق في Wireshark: أغلب الإطارات Broadcast/Multicast مع أحادي معلوم = صحي؛ أحادي مجهول متواصل = فتّش\n- تغيير الطبولوجيا (إضافة مبدّل، تحريك وصلة) يولّد موجات تعلم جديدة — أمر طبيعي يهدأ في ثوانٍ\n- بروتوكول STP يستخدم آلية خاصة (TCN) لتقصير التقادم عمداً بعد تغيّر الطبولوجيا وتسريع إعادة الاستقرار",
          en: "The moment an entry is evicted, the switch loses that address's map. The next frame toward it becomes unknown unicast: flooded to every VLAN port, and if the target answers, learning returns and purity is restored. This short cycle (flood, reply, relearn) is the periodic invoice of self-renewing memory — and a cheap one in a healthy network.\n\nThe scene deserves precise diagnosis: transient flooding at network startup is one hundred percent healthy. But chronically continuous flooding has pathological causes worth investigating: a permanently silent device (broadcast receivers), a Layer 2 loop generating endless traffic (lesson l039), or a full table thrashing learn-and-forget at insane speed.\n\n- Watch flooding ratio in Wireshark: mostly broadcast/multicast plus known unicast = healthy; continuous unknown unicast = investigate\n- Topology changes (adding a switch, moving a link) generate fresh learning waves — normal, settling within seconds\n- STP uses a special mechanism (TCN) to deliberately shorten aging after topology changes, accelerating re-stabilization",
        },
      },
      {
        heading: { ar: "الإدخالات الثابتة وأمن المنفذ", en: "Static Entries and Port Security" },
        body: {
          ar: "ليست كل التعلمات ديناميكية بالضرورة. الإدخال الثابت (Static MAC Entry) يُدوَّن يدوياً في تكوين المبدّل فيبقى عبر إعادة التشغيل ولا يتقادم — الأداة الصحيحة للجهاز الصامت الدائم (مستقبِل إرسال، متحكم صناعي، واجهة إدارة بطابعة لا ترسل أبداً) الذي يستحق توصيلاً نظيفاً بلا إغراق أبدي.\n\nأما أمن المنفذ (Port Security) فهو المقابل الدفاعي لحرية التعلم: بدل أن يتعلم المنفذ ما يشاء بلا حد، تحدّد كم عنواناً أقصى يقبله، وتختار: ثابتاً مدوَّناً يدوياً، أو ملتصقاً Sticky يتحول تلقائياً من تعلم ديناميكي إلى إدخال محفوظ في التكوين الجاري. وعند تجاوز الحد تنطبق سياسة المخالفة: shutdown يُطفئ المنفذ (وضع err-disable)، أو restrict يرمي الإطارات المخالفة مع عدّ الإنذارات، أو protect يرمي بصمت.\n\n- sticky هو الحل الوسط الشائع: اربط الأجهزة القليلة المشروعة تلقائياً ثم راجع التكوين المتولد\n- عالج منفذاً في err-disable بـ shutdown ثم no shutdown بعد معالجة سبب المخالفة\n- أمن المنفذ يقي أيضاً من فيضان MAC (MAC Flooding) الذي يحاول المهاجم إغراق الجدول لتحويل المبدّل إلى مكرّر يتنصت عبره",
          en: "Not all learning must be dynamic. A static MAC entry is hand-written into the switch configuration, surviving reboots and never aging — the right tool for the permanently silent device (a one-way receiver, an industrial controller, a printer's management interface that never transmits) that deserves clean forwarding without eternal flooding.\n\nPort Security is the defensive counterpart to learning freedom: instead of a port learning without limit, you cap how many addresses it accepts, choosing between hand-written statics or sticky mode, which auto-converts dynamic learning into saved running-config entries. On exceeding the limit a violation policy applies: shutdown disables the port (err-disable state), restrict drops offending frames while counting alarms, protect drops silently.\n\n- Sticky is the popular middle path: bind the few legitimate devices automatically, then review the generated config\n- Recover an err-disabled port with shutdown then no shutdown after fixing the violation cause\n- Port security also defends against MAC flooding — an attacker's attempt to overflow the table and turn the switch into a tap-friendly repeater",
        },
        code: {
          lang: "text",
          snippet: "! إدخال ثابت لجهاز صامت في VLAN 10\nSwitch(config)# mac address-table static 00d0.ffab.1201 vlan 10 interface fa0/5\n\n! أمن المنفذ على منفذ وصول\nSwitch(config)# interface fa0/5\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10\nSwitch(config-if)# switchport port-security\nSwitch(config-if)# switchport port-security maximum 2\nSwitch(config-if)# switchport port-security mac-address sticky\nSwitch(config-if)# switchport port-security violation shutdown\n\nSwitch# show port-security interface fa0/5\n",
        },
      },
      {
        heading: { ar: "التوليف والتحقق في الميدان", en: "Tuning and Verifying in the Field" },
        body: {
          ar: "التركيبة العملية لضبط دورة حياة الجدول تتمحور حول ثلاث قراءات: حجم الجدول الحالي مقابل سعة المنصة (show mac address-table count)، وعمر أقدم التعلمات مقابل نمط حركة مرورك، وعدد الإطارات المُغرقَة عبر show mac address-table مع مراقبة Wireshark عند الاشتباه.\n\nفي بيئة مكتتبية نمطية: 300 ثانية افتراضية تناسب 95% من الحالات. قصّرها إلى 60-120 في شبكات لاسلكية كثيفة التنقل أو معامل تكديس دائمة الحركة. ارفعها أو ثبّت الإدخالات في شبكات صناعية تتحكم فيها أجهزة صامتة حساسة. والقاعدة الذهبية: أي تعديل يُقاس بأثره — راقب إغراق ما قبل التغيير وبعده قبل اعتماده نهائياً.\n\n- الجدول الممتلئ المتكرر يستدعي تجزئة نطاق البث (VLANs!) لا مجرد رفع التقادم\n- راقب رسائل التخفيض البرمجية في السجلات: المبدّل الذي يعلن امتلاء الجدول يبدأ فعلاً بالتعلم الجديد محل القديم عشوائياً\n- هذه الحلقة — تعلم، تقادم، إغراق، إعادة تعلم — هي نبض الطبقة الثانية الذي ستحسّه في كل تشخيص لاحق",
          en: "Practical tuning of the table lifecycle centers on three readings: current table size versus platform capacity (show mac address-table count), the age pattern of entries against your traffic pattern, and flooded-frame counts via show mac address-table plus Wireshark when suspicion arises.\n\nIn a typical office environment: the 300-second default suits 95% of cases. Shorten to 60-120 in dense mobile wireless or constantly re-stacked labs. Lengthen or pin static entries in industrial networks run by silent, sensitive controllers. The golden rule: measure any change by its effect — watch flooding before and after before adopting it.\n\n- A repeatedly full table calls for broadcast domain segmentation (VLANs!) rather than mere aging tweaks\n- Watch software downgrade messages in logs: a switch announcing table exhaustion truly starts evicting old entries for new ones at random\n- This cycle — learn, age, flood, relearn — is the Layer 2 heartbeat you will feel in every future diagnosis",
        },
      },
    ],
    keyPoints: [
      { ar: "التعلم من حقل المصدر فقط: (MAC + منفذ الدخول + VLAN) — والقرار من حقل الوجهة", en: "Learning reads the source field only: (MAC + ingress port + VLAN) — decisions read the destination" },
      { ar: "مؤقّت التقادم الافتراضي 300 ثانية على Cisco، وكل إطار مصدره العنوان يعيد عقاربه", en: "Default Cisco aging is 300 seconds; every frame from that source resets the clock" },
      { ar: "الإدخال المتقادم يعني عودة الإغراق العابر حتى يجيب الجهاز ويعاد التعلم", en: "An aged entry means transient flooding returns until the device answers and relearning occurs" },
      { ar: "الإدخال الثابت للجهاز الصامت الدائم؛ وأمن المنفذ يحدّ عدد المتعلمات ويعاقب التجاوز", en: "Static entries for permanently silent devices; port security caps learned addresses and punishes overflow" },
      { ar: "sticky يحول التعلم الديناميكي إلى إدخالات محفوظة، وviolation shutdown يعطّل المنفذ", en: "Sticky converts dynamic learning into saved entries; violation shutdown disables the port" },
      { ar: "الإغراق المزمن المتواصل (لا العابر) هو مؤشر المرض: جهاز صامت أو حلقة أو جدول ممتلئ", en: "Chronically continuous flooding (not transient) is the disease marker: silent device, loop, or full table" },
    ],
    commands: [
      { cmd: "show mac address-table aging-time", desc: { ar: "عرض مؤقّت التقادم لكل VLAN", en: "Show the aging timer per VLAN" } },
      { cmd: "mac address-table aging-time 120", desc: { ar: "ضبط التقادم على 120 ثانية في بيئة متغيرة", en: "Set aging to 120 seconds for mobile environments" } },
      { cmd: "clear mac address-table dynamic", desc: { ar: "مسح التعلمات الديناميكية لإعادة تعلم فورية", en: "Flush dynamic entries for immediate re-learning" } },
      { cmd: "show port-security interface fa0/5", desc: { ar: "عرض حالة أمن المنفذ: الحد الأقصى والعناوين والمخالفات", en: "Show port security state: maximum, addresses, violations" } },
    ],
    quiz: [
      {
        q: { ar: "من أي حقل يتعلم المبدّل عنواناً جديداً؟", en: "From which field does a switch learn a new address?" },
        options: [
          { ar: "حقل الوجهة للإطار الصادر", en: "The destination field of outgoing frames" },
          { ar: "حقل FCS في ذيل الإطار", en: "The FCS field in the frame trailer" },
          { ar: "حقل المصدر للإطار الوارد", en: "The source field of incoming frames" },
          { ar: "حقل EtherType دائماً", en: "Always the EtherType field" },
        ],
        correct: 2,
        explain: { ar: "القاعدة الذهبية: تعلّم من المصدر، وقرّر بالوجهة. الإطار الوارد من منفذ ما يجعل عنوان مصدره مرتبطاً بذلك المنفذ في الجدول — أما وجهته فتُستخدم للبحث واتخاذ قرار التمرير.", en: "The golden rule: learn from the source, decide by the destination. An incoming frame binds its source address to the ingress port — while its destination is looked up for the forwarding decision." },
      },
      {
        q: { ar: "ما القيمة الافتراضية لمؤقّت تقادم MAC على مبدّلات Cisco؟", en: "What is the default MAC aging time on Cisco switches?" },
        options: [
          { ar: "60 ثانية", en: "60 seconds" },
          { ar: "300 ثانية", en: "300 seconds" },
          { ar: "3600 ثانية", en: "3600 seconds" },
          { ar: "لا يوجد تقادم افتراضياً", en: "There is no aging by default" },
        ],
        correct: 1,
        explain: { ar: "الافتراضي 300 ثانية (خمس دقائق) لكل الإدخالات الديناميكية. كل إطار جديد مصدره العنوان يعيد المؤقت، والصمت المتواصل خمس دقائق يمحو الإدخال فيعود الإغراق العابر عند أول إطار لاحق.", en: "The default is 300 seconds (five minutes) for all dynamic entries. Each new frame from that source resets the timer; five continuous minutes of silence evicts the entry, returning transient flooding on the next frame." },
      },
      {
        q: { ar: "جهاز استقبال بث لا يرسل شيئاً أبداً. ما الحل الأنظف لضمان تمرير إطاراته دون إغراق دائم؟", en: "A one-way broadcast receiver never transmits. Cleanest fix to forward its frames without perpetual flooding?" },
        options: [
          { ar: "رفع مؤقّت التقادم إلى أقصى قيمة", en: "Raising the aging timer to maximum" },
          { ar: "إدخال MAC ثابت مرتبط بمنفذه وVLAN", en: "A static MAC entry bound to its port and VLAN" },
          { ar: "تحويل المنفذ إلى وضع جذع Trunk", en: "Converting the port to trunk mode" },
          { ar: "تعطيل أمن المنفذ على المبدّل", en: "Disabling port security on the switch" },
        ],
        correct: 1,
        explain: { ar: "الإدخال الثابت يُدوَّن في التكوين فلا يتقادم ولا يمحى بإعادة التشغيل — فيعرف المبدّل مسار الجهاز الصامت دائماً ويمرر إطاراته مباشرة بلا موجة إغراق.", en: "A static entry lives in the configuration, never aging or vanishing on reboot — the switch permanently knows the silent device's path and forwards its frames directly with no flooding wave." },
      },
      {
        q: { ar: "ما الفرق العملي بين وضعي restrict وprotect في مخالفة أمن المنفذ؟", en: "What is the practical difference between restrict and protect port-security violation modes?" },
        options: [
          { ar: "restrict يرمي الإطارات ويرفع عدّادات الإنذار؛ protect يرمي بصمت بلا عدّ", en: "restrict drops frames and raises alarm counters; protect drops silently without counting" },
          { ar: "restrict يرسل تحذيراً للجهاز المخالف؛ protect يعيد ضبطه", en: "restrict warns the offending device; protect resets it" },
          { ar: "protect يعطّل المنفذ؛ restrict يقيّد سرعته فقط", en: "protect disables the port; restrict only rate-limits it" },
          { ar: "لا فرق بينهما إطلاقاً", en: "There is no difference at all" },
        ],
        correct: 0,
        explain: { ar: "كلاهما يبقي المنفذ عاملاً ويرمي إطارات المصادر الزائدة عن الحد، لكن restrict يعدّ المخالفات ويرسل رسائل Syslog فتظهر في المراقبة، بينما protect يرمي بلا أثر مرئي — الرصد أهم من الصمت التشغيلي غالباً.", en: "Both keep the port up and drop frames from over-limit sources, but restrict counts violations and emits Syslog messages visible to monitoring, while protect drops with no visible trace — visibility usually beats operational silence." },
      },
    ],
  },
  {
    id: "l036",
    moduleId: "m04",
    order: 6,
    level: "intermediate",
    title: { ar: "الشبكات الافتراضية VLANs: التقسيم المنطقي وضبط منافذ الوصول", en: "VLANs: Logical Segmentation and Access Port Configuration" },
    summary: {
      ar: "تحويل مبدّل واحد إلى جزر بث معزولة عبر VLANs: القاعدة الذهبية VLAN=Subnet، منافذ الوصول وتكوينها على IOS خطوة بخطوة، والتحقق وأفضل الممارسات في التصميم.",
      en: "Turning one switch into isolated broadcast islands with VLANs: the VLAN=Subnet golden rule, access ports and step-by-step IOS configuration, verification, and design best practices.",
    },
    durationMin: 15,
    sections: [
      {
        heading: { ar: "لماذا VLANs؟ حدود التجزئة الفيزيائية", en: "Why VLANs? The Limits of Physical Segmentation" },
        body: {
          ar: "قبل VLANs كان تقسيم الشبكة يعني تقسيم العتاد: موجّه إضافي أو مبدّل منفصل لكل مجموعة، وكابلات تجري فوق السقف حسب انتماء الجهاز لا حسب موقعه. أرادت الإدارة نقل موظف من الدور الثاني إلى الأول؟ انطلق فريق الشبكات لسحب كابل جديد — عالم بطيء ومرن كلوح خشب.\n\nVLAN (Virtual LAN) تقلب المنطق: المنفذ — لا الكابل — هو ما يحدد الانتماء. عرّف منفذاً في VLAN 10 فكأنك وصلت جهازه بمبدّل مستقل تماماً لا يرى VLAN 20 ولا تسمع بثّه. التقسيم صار منطقياً برمجياً: انقل الموظف، بدّل انتماء منفذه، انتهى في ثوانٍ.\n\n- عزل نطاق البث: كل VLAN نطاق بث مستقل، فإطار ARP لموظفي المبيعات لا يزعج المحاسبة أبداً\n- أداء أفضل: نطاق بث أصغر يعني انقطاعات أقل لكل جهاز وعرض نطاق أنظف\n- أمن بنيوي: المهمة (Guest/VoIP/الخوادم) معزولة على مستوى التصميم نفسه لا كترقيع لاحق\n- إدارة مركزية: تعريف الشبكات في تكوين المبدّل لا في تمديدات المباني",
          en: "Before VLANs, segmentation meant splitting hardware: an extra router or a separate switch per group, cables running over ceilings according to device membership, not location. Management wants an employee moved from floor two to floor one? The networking team pulled new cable — a world as slow and rigid as plywood.\n\nVLANs (Virtual LANs) invert the logic: the port — not the cable — defines membership. Define a port in VLAN 10 and its device might as well hang off a completely separate switch that never sees VLAN 20 nor hears its broadcast. Segmentation became logical and software-defined: move the employee, change the port's membership, done in seconds.\n\n- Broadcast isolation: each VLAN is its own broadcast domain — sales' ARP never disturbs accounting\n- Better performance: a smaller broadcast domain means fewer interruptions per device and cleaner bandwidth\n- Structural security: functions (guest/VoIP/servers) isolated at design level, not patched later\n- Central management: networks defined in switch configuration, not building cabling",
        },
      },
      {
        heading: { ar: "القاعدة الذهبية: VLAN واحدة = شبكة فرعية واحدة", en: "Golden Rule: One VLAN = One Subnet" },
        body: {
          ar: "احفظ هذه القاعدة قبل أي إعداد: كل VLAN هي نطاق بث مستقل في الطبقة الثانية، والتخاطب داخل نطاق البث يتطلب عناوين IP من الشبكة الفرعية نفسها. لذلك يُصمَّم الزواج المقدس: VLAN 10 = شبكة 192.168.10.0/24، وVLAN 20 = 192.168.20.0/24 — رقم الـ VLAN يتكرر في أوكتت الشبكة لتسهيل الحياة والقراءة.\n\nجهازان في VLANs مختلفة على المبدّل نفسه؟ هما في عالمين منفصلين تماماً: لا بث مشتركاً ولا عناوين متقاربة ولا سماع متبادل. التواصل بينهما يستوجب صعوداً إلى الطبقة الثالثة — موجّهاً أو مبدّلاً ثلاثي الطبقات — وهذا موضوع درس l038 كاملاً.\n\n- الخلط القاتل في المعامل: جهاز في VLAN 10 بعنوان من شبكة VLAN 20 — لا يصل لأحد ويتعذّر تشخيصه إن نسيت القاعدة\n- مساحة المعرفات: 12 بت = 4096 قيمة نظرياً، ومنها 4094 قابلة للاستخدام (0 و4095 محجوزتان)\n- نطاقات عناوية قياسية شائعة في التصاميم: VLAN 10 للإدارة، 20 للمستخدمين، 30 للـ VoIP، 99 للنقل الأصلي، ومئات للضيوف",
          en: "Memorize this rule before any configuration: every VLAN is an independent Layer 2 broadcast domain, and conversation inside a broadcast domain requires IP addresses from the same subnet. Hence the sacred marriage: VLAN 10 = network 192.168.10.0/24, VLAN 20 = 192.168.20.0/24 — the VLAN number repeating in the network octet to keep life readable.\n\nTwo devices in different VLANs on the same switch? They exist in separate worlds: no shared broadcast, no adjacent addresses, no mutual hearing. Communicating requires rising to Layer 3 — a router or L3 switch — which is lesson l038 in full.\n\n- The lab-fatal mistake: a device in VLAN 10 carrying an address from VLAN 20's subnet — it reaches nobody and resists diagnosis if you forget the rule\n- Identifier space: 12 bits = 4096 values, of which 4094 usable (0 and 4095 reserved)\n- Common design address conventions: VLAN 10 management, 20 users, 30 VoIP, 99 native transit, hundreds for guests",
        },
        tip: {
          ar: "خريطة ذهنية لا تخيب: انظر إلى أول ثلاث خانات من عنوان IP — هي تخبرك بالـ VLAN في أي تصميم منضبط. وهذه القاعدة ستسرّع كل تشخيص مستقبلي بين جهازين لا يتواصلان.",
          en: "A mental map that never fails: glance at the first three octets of the IP — they tell you the VLAN in any disciplined design. This rule will accelerate every future two-host troubleshooting session.",
        },
      },
      {
        heading: { ar: "منافذ الوصول: بوابات VLAN واحدة", en: "Access Ports: Gateways of a Single VLAN" },
        body: {
          ar: "منفذ الوصول (Access Port) هو البوابة التي يدخل منها جهاز طرفي إلى عالم VLAN واحدة: يحمل إطارات تلك الـ VLAN فقط، ويستقبلها ويرسلها بلا أي وسم (Untagged) — فالجهاز الطرفي لا يعرف بوجود VLANs أصلاً، وهذا هو المقصود بـ«شفافية» التقسيم.\n\nعند إقلاع المبدّل من المصنع، كل منافذه تعمل كمنافذ وصول في VLAN 1 — «الـ VLAN الافتراضية» التي تربط الجميع في نطاق بث واحد. هذا سلوك آمن للمكتب الصغير الأولي وخطير في الإنتاج: أي جهاز جديد يوصل يرى الجميع فوراً. أول انضباط تصميمي: أخرج المستخدمين من VLAN 1 واتركها للبروتوكولات الإدارية فقط.\n\n- إطار يدخل منفذ وصول دائماً يُنسب إلى VLAN المنفذ مهما كان محتواه\n- البث/الإغراق في منفذ الوصول محصور في منافذ الـ VLAN نفسها حصراً\n- حالة خاصة شائعة: منفذ وصول يحمل VLAN بيانات + VLAN صوتية (Voice VLAN) معاً للهاتف — سنمر عليها عملياً",
          en: "An access port is the gate through which an endpoint enters a single VLAN's world: it carries only that VLAN's frames, sending and receiving them untagged — the endpoint never knows VLANs exist, which is precisely segmentation's «transparency».\n\nFactory-fresh switches place every port as an access port in VLAN 1 — the default VLAN uniting everyone in one broadcast domain. That is safe behavior for a first tiny office and dangerous in production: any newly plugged device instantly sees everything. The first design discipline: move users out of VLAN 1 and reserve it for management protocols only.\n\n- A frame entering an access port always inherits the port's VLAN regardless of content\n- Broadcast/flooding from an access port stays strictly within that VLAN's ports\n- A common special case: an access port carrying a data VLAN plus a voice VLAN for a phone — we will touch it hands-on",
        },
      },
      {
        heading: { ar: "الإعداد على IOS خطوة بخطوة", en: "Configuring on IOS Step by Step" },
        body: {
          ar: "الإعداد رقصة من ثلاث حركات تتكرر: أنشئ الـ VLAN وسمّها، عيّن المنفذ منفذ وصول، اربطه بالـ VLAN. أنشئ VLAN 10 للمبيعات و20 للموارد البشرية ثم وزّع منافذ المبدّل — استخدم نطاق المنافذ (interface range) لتوزيع دفعة كاملة دفعة واحدة.\n\nملاحظات ميدانية على هذا التكوين: أوامر vlan الجديدة تدخل وضع تكوين VLAN حيث تمنح اسماً منطقياً — التوثيق المبني في التكوين نفسه ينجّي فريقاً كاملاً بعد سنة. والأمر switchport access vlan يربط المنفذ، وسياق mode access يثبّت الدور حتى لو حاول بروتوكول DTP التفاوض على شيء آخر.\n\n- بين VLAN وجهاز: أكمل دورة الشبكة بمنح الجهاز عنواناً من شبكة الـ VLAN نفسها + بوابة افتراضية في شبكتها\n- أضف صوتاً: switchport voice vlan 30 يجعل المنفذ يحمل VLAN البيانات للكمبيوتر وVLAN الصوت لهاتف IP متسلسل معه\n- اسم VLAN وصفي قصير = وثيقة تصميم حية داخل التكوين",
          en: "Configuration is a three-move dance that repeats: create the VLAN and name it, set the port to access mode, bind it to the VLAN. Create VLAN 10 for sales and 20 for HR, then distribute switch ports — use interface range to assign a whole bank of ports at once.\n\nField notes on this config: the new vlan commands enter VLAN configuration mode where you grant a logical name — in-config documentation that rescues a whole team a year later. The switchport access vlan binds the port, and the mode access context fixes the role even if DTP attempts other negotiations.\n\n- Between VLAN and device: complete the loop by giving the device an address from that VLAN's subnet plus a default gateway in the same subnet\n- Add voice: switchport voice vlan 30 makes the port carry the data VLAN for the PC and the voice VLAN for a daisy-chained IP phone\n- A short descriptive VLAN name = a living design document inside the configuration",
        },
        code: {
          lang: "text",
          snippet: "! إنشاء الـ VLANs وتسميتها\nSwitch(config)# vlan 10\nSwitch(config-vlan)# name SALES\nSwitch(config-vlan)# vlan 20\nSwitch(config-vlan)# name HR\nSwitch(config-vlan)# exit\n\n! توزيع منافذ الوصول دفعة واحدة\nSwitch(config)# interface range fa0/1 - 8\nSwitch(config-if-range)# switchport mode access\nSwitch(config-if-range)# switchport access vlan 10\nSwitch(config-if-range)# exit\n\n! منفذ فردي مع VLAN صوتية لهاتف IP\nSwitch(config)# interface fa0/9\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 20\nSwitch(config-if)# switchport voice vlan 30",
        },
      },
      {
        heading: { ar: "التحقق وأفضل الممارسات", en: "Verification and Best Practices" },
        body: {
          ar: "أمر التحقق الأم: show vlan brief يعرض جدول VLANs حية: رقمها واسمها وحالتها ومنافذها — نظرة واحدة تكشف التصميم كله. وshow interfaces fa0/1 switchport يفصّل تكوين المنفذ الفردي: الوضع الإداري (access)، وVLAN الوصول، وVLAN الصوت.\n\nأفضل الممارسات الناضجة في تصميم VLANs: اترك VLAN 1 للبروتوكولات الإدارية بلا مستخدمين؛ اختر مخطط ترقيم ثابتاً (مضاعفات 10: 10 إدارة، 20 مستخدمون، 30 صوت...) يترك فراغات للتوسع؛ وأغلق المنافذ غير المستخدمة (shutdown) وألحقها بـ VLAN مهجورة بدل تركها ضالة في VLAN 1 تستقبل أي جهاز غريب.\n\n- وثّق مخطط VLAN-to-Subnet في مكان يراه الفريق — هذه الخريطة أول ما يسأل عنه كل من يرث الشبكة\n- جهاز لا يعمل بعد ربطه بـ VLAN؟ راجع دائماً: عنوان IP من الشبكة الصحيحة + البوابة الصحيحة + منفذ في VLAN الصحيح\n- درس لاحق (l037) يعالج الربط بين المبدّلات نفسها: كيف تعبر VLANs المتعددة وصلة واحدة؟",
          en: "The mother verification command: show vlan brief lists live VLANs with number, name, status, and ports — one glance reveals the entire design. And show interfaces fa0/1 switchport details the individual port: administrative mode (access), access VLAN, and voice VLAN.\n\nMature VLAN design best practices: keep VLAN 1 for management protocols with zero users; choose a fixed numbering scheme (multiples of 10: 10 management, 20 users, 30 voice...) leaving gaps for growth; and shut unused ports (shutdown) parked in a quarantined VLAN rather than leaving them stray in VLAN 1 welcoming any strange device.\n\n- Document the VLAN-to-Subnet scheme somewhere the whole team sees — this map is the first thing asked by whoever inherits the network\n- A device dead after VLAN binding? Always recheck: IP address from the correct subnet + correct gateway + port in the correct VLAN\n- The next lesson (l037) tackles interconnecting the switches themselves: how do multiple VLANs cross a single link?",
        },
        code: {
          lang: "text",
          snippet: "Switch# show vlan brief\n\nVLAN Name                             Status    Ports\n---- -------------------------------- --------- ------------------------\n1    default                          active    Gi0/2\n10   SALES                            active    Fa0/1, Fa0/2, Fa0/3\n20   HR                               active    Fa0/9\n30   VOICE                            active\n\nSwitch# show interfaces fa0/9 switchport\nName: Fa0/9\nSwitchport: Enabled\nAdministrative Mode: static access\nAccess Mode VLAN: 20 (HR)\nTrunking Native Mode VLAN: 1 (default)\nVoice VLAN: 30 (VOICE)",
        },
      },
    ],
    keyPoints: [
      { ar: "VLAN تقسيم منطقي لنطاقات البث داخل المبدّل نفسه — المنفذ لا الكابل يحدد الانتماء", en: "A VLAN is logical broadcast-domain segmentation inside one switch — the port, not the cable, defines membership" },
      { ar: "القاعدة الذهبية: VLAN واحدة = شبكة فرعية واحدة؛ التواصل بين VLANs يستوجب الطبقة الثالثة", en: "Golden rule: one VLAN = one subnet; inter-VLAN communication requires Layer 3" },
      { ar: "منفذ الوصول يحمل VLAN واحدة بإطارات غير موسومة — الطرفية لا تعلم بوجود VLANs", en: "An access port carries one VLAN with untagged frames — endpoints never know VLANs exist" },
      { ar: "كل المنافذ出厂ً في VLAN 1: انقل المستخدمين منها واجعلها إدارية فقط", en: "All ports start in VLAN 1: move users out and keep it management-only" },
      { ar: "الإعداد ثلاث حركات: vlan N + name ثم switchport mode access ثم switchport access vlan N", en: "Configuration is three moves: vlan N + name, then switchport mode access, then switchport access vlan N" },
      { ar: "أغلق المنافذ غير المستخدمة وألحقها بـ VLAN معزولة — انضباط أمني رخيص وعالي الأثر", en: "Shut unused ports and park them in a quarantined VLAN — cheap, high-impact security discipline" },
    ],
    commands: [
      { cmd: "show vlan brief", desc: { ar: "عرض VLANs حية بأسمائها ومنافذها — نظرة التصميم الكاملة", en: "List live VLANs with names and ports — the full design glance" } },
      { cmd: "show interfaces fa0/1 switchport", desc: { ar: "تفصيل تكوين VLAN لمنفذ: الوضع وVLAN الوصول وVLAN الصوت", en: "Detail a port's VLAN config: mode, access VLAN, voice VLAN" } },
      { cmd: "vlan 20 / name HR", desc: { ar: "إنشاء VLAN 20 وتسميتها (وضع تكوين الـ VLAN)", en: "Create VLAN 20 and name it (VLAN config mode)" } },
      { cmd: "show vlan id 20", desc: { ar: "عرض تفاصيل VLAN واحدة محددة ومنافذها", en: "Show one specific VLAN's details and ports" } },
    ],
    quiz: [
      {
        q: { ar: "ما الذي تقسّمه VLAN فعلياً داخل المبدّل؟", en: "What does a VLAN actually partition inside a switch?" },
        options: [
          { ar: "طاقة المنافذ الكهربائية", en: "The electrical power of ports" },
          { ar: "جدول التوجيه IP", en: "The IP routing table" },
          { ar: "نطاق البث: كل VLAN نطاق بث مستقل في الطبقة الثانية", en: "The broadcast domain: each VLAN is an independent L2 broadcast domain" },
          { ar: "سرعة الاتصال لكل منفذ", en: "The link speed per port" },
        ],
        correct: 2,
        explain: { ar: "الـ VLAN تقسم نطاق البث: إطار البث داخل VLAN 10 ينسخ فقط لمنافذ VLAN 10، وكأن كل VLAN مبدّل فيزيائي منفصل. عزل كامل في الطبقة الثانية، والعبور إلى VLAN أخرى يستلزم الطبقة الثالثة.", en: "A VLAN partitions the broadcast domain: a broadcast in VLAN 10 copies only to VLAN 10's ports, as if each VLAN were a separate physical switch. Complete L2 isolation — crossing to another VLAN requires Layer 3." },
      },
      {
        q: { ar: "جهازان موصولان بنفس المبدّل، الأول في VLAN 10 والثاني في VLAN 20. ماذا يلزم ليتصلا؟", en: "Two devices on one switch: first in VLAN 10, second in VLAN 20. What do they need to communicate?" },
        options: [
          { ar: "لا شيء — المبدّل يمرر تلقائياً بين VLANs", en: "Nothing — the switch forwards between VLANs automatically" },
          { ar: "عنوانا MAC من نفس OUI", en: "MAC addresses from the same OUI" },
          { ar: "جهاز توجيه من الطبقة الثالثة بين الشبكتين الافتراضيتين", en: "A Layer 3 routing device between the two virtual networks" },
          { ar: "تعطيل FCS على الإطارات المتبادلة", en: "Disabling FCS on exchanged frames" },
        ],
        correct: 2,
        explain: { ar: "الـ VLANs معزولة في الطبقة الثانية بذات عزل المبدّلات الفيزيائية المتباعدة: لا تمرير ولا بث متبادل. جهاز الطبقة الثالثة (موجّه أو مبدّل L3) هو الجسر — موضوع درس التوجيه بين VLANs.", en: "VLANs are L2-isolated exactly like physically separate switches: no forwarding, no shared broadcast. A Layer 3 device (router or L3 switch) is the bridge — the inter-VLAN routing lesson's subject." },
      },
      {
        q: { ar: "ما وضع منافذ مبدّل Cisco فور خروجه من المصنع؟", en: "What is the state of a factory-fresh Cisco switch's ports?" },
        options: [
          { ar: "منافذ جذع Trunk لكل VLANs", en: "Trunk ports for all VLANs" },
          { ar: "منافذ وصول في VLAN 1 الافتراضية", en: "Access ports in default VLAN 1" },
          { ar: "معطّلة بالكامل حتى تكوينها يدوياً", en: "Fully disabled until manually configured" },
          { ar: "منافذ وصول في VLAN 100", en: "Access ports in VLAN 100" },
        ],
        correct: 1,
        explain: { ar: "الافتراض المصنعي: كل المنافذ منافذ وصول في VLAN 1 — شبكة مسطحة واحدة يرى فيها الجميع الجميع. لذلك تبدأ ممارسات الأمن بتفريغ VLAN 1 من المستخدمين قبل أي شيء آخر.", en: "Factory default: all ports are access ports in VLAN 1 — one flat network where everyone sees everyone. That's why security practice starts by emptying VLAN 1 of users before anything else." },
      },
      {
        q: { ar: "جهاز لا يصل لأي شيء بعد نقله إلى VLAN 20. وفق القاعدة الذهبية، ما أول ما تفحصه؟", en: "A device reaches nothing after moving to VLAN 20. Per the golden rule, what do you check first?" },
        options: [
          { ar: "عنوان IP وبوابته الافتراضية — هل هما من شبكة VLAN 20 الفرعية؟", en: "Its IP address and gateway — are they from VLAN 20's subnet?" },
          { ar: "كابل الشبكة وطوله", en: "The network cable and its length" },
          { ar: "سجل DNS على المبدّل", en: "The DNS log on the switch" },
          { ar: "سرعة المنفذ وازدواجه", en: "Port speed and duplex" },
        ],
        correct: 0,
        explain: { ar: "القاعدة الذهبية VLAN=Subnet: الجهاز الآن في VLAN 20 لكنه ما زال يحمل عنواناً من شبكة VLAN القديمة — فلا يفهم بثّه أحد ولا يجيب عليه ARP. طابق العنوان والبوابة مع شبكة الـ VLAN الجديدة أولاً قبل أي تشخيص أدنى.", en: "The golden rule VLAN=Subnet: the device sits in VLAN 20 still carrying the old VLAN's address — nobody answers its broadcast or ARP. Match address and gateway to the new VLAN's network before any lower-level diagnosis." },
      },
    ],
  },
  {
    id: "l037",
    moduleId: "m04",
    order: 7,
    level: "intermediate",
    title: { ar: "الجذوع Trunking و802.1Q: VLANs تعبر وصلة واحدة", en: "Trunking & 802.1Q: VLANs Crossing a Single Link" },
    summary: {
      ar: "كيف تنقل وصلة واحدة عشرات الشبكات الافتراضية عبر وسم 802.1Q: تشريح الوسم الأربعة بايتات، الشبكة الأصلية Native VLAN، إعداد الجذع على IOS، والتحقق ومعالجة عدم التطابق.",
      en: "How a single link carries dozens of VLANs via 802.1Q tagging: the 4-byte tag anatomy, the Native VLAN, IOS trunk configuration, and verification and mismatch troubleshooting.",
    },
    durationMin: 16,
    sections: [
      {
        heading: { ar: "مشكلة تضاعف الكابلات", en: "The Exploding Cable Problem" },
        body: {
          ar: "لديك مبدّلان وVLANs أربع: المبيعات والموارد والصوت والضيوف. لتوصيل كل VLAN عبر المبدّلين تحتاج وصلة مستقلة لكل منها — أربع وصلات وأربعة أزواج من المنافذ المحترقة. الآن ارفع العدد إلى عشرين VLAN في مبنيين: عشرون وصلة بين كل زوج مبدّلات؟ هذا انتحار منافذ وكابلات لا يبقى بعده مرفق.\n\nالحل الأنيق هو الجذع (Trunk): وصلة واحدة متعددة الإرسال تحمل كل VLANs معاً. السر: وسم صغير بطول 4 بايتات يُدرج في كل إطار يعلن انتماءه — فتقرأ المبدّلات الوسم وتوجّه الإطار إلى VLAN الصحيحة بدقة، وكأن عشرات الوصلات المستقلة انضغطت في وصلة فيزيائية واحدة.\n\n- مصطلح «جذع» مستعار من عالم الأشجار: الجذع الواحد يحمل فروعاً كثيرة (VLANs) ثم تتفرع مجدداً عند الطرف\n- الجذع مفهوم ثنائي الطرفين: الوصلة تعمل جذعاً عند المبدّلين معاً وإلا انهارت\n- استخدام منفذ جذع للمستخدم النهائي خطأ تصميمي: الطرفية لا تفهم الوسم أصلاً",
          en: "You have two switches and four VLANs: sales, HR, voice, guests. To extend each VLAN across both switches you need a dedicated link per VLAN — four links and four burned port pairs. Now scale to twenty VLANs across two buildings: twenty links between every switch pair? That is port-and-cable suicide leaving no capacity behind.\n\nThe elegant answer is the trunk: one multiplexed link carrying all VLANs together. The secret: a tiny 4-byte tag inserted into each frame announcing its membership — switches read the tag and deliver the frame to the right VLAN precisely, as if dozens of dedicated links were squeezed into one physical cable.\n\n- The term «trunk» borrows from trees: one trunk carrying many branches (VLANs), branching out again at the far end\n- Trunking is a two-ended concept: the link must be a trunk at both switches or it collapses\n- Using a trunk port for an end user is a design error: endpoints do not understand tags at all",
        },
      },
      {
        heading: { ar: "تشريح وسم 802.1Q", en: "Anatomy of the 802.1Q Tag" },
        body: {
          ar: "الوسم يقبع بين عنوان المصدر وحقل EtherType الأصلي. يتكون من 4 بايتات: بايتان الأولان هما TPID بقيمة ثابتة 0x8100 تعلن «هذا إطار موسوم» — وهي القيمة التي يفحصها المبدّل فور قراءة العناوين. البايتان الثانيان هما TCI وتضم معلومات الخدمة: أولوية PCP بثلاث بتات لجودة الخدمة (قيم 0-7)، وبت DEI واحدة لاحتمال الإسقاط، و12 بت لمعرّف VLAN.\n\n12 بت = 4096 قيمة ممكنة، والقيمتان 0 و4095 محجوزتان للبروتوكولات فيبقى 4094 VLAN قابلة للاستخدام — رقم رأيته في درس VLANs ويعود هنا بمعناه العتادي الأصيل. وبما أن الوسم يضيف 4 بايتات فعلية، يُعاد حساب FCS كاملاً ويكبر الحد الأقصى للإطار الموسوم إلى 1522 بايتاً (يسميه البعض baby giant).\n\n- الحقل الأصلي EtherType يزاح بعد الوسم فيقرأ المبدّل: وسم → ثم نوع الحمولة الحقيقي\n- كان لـ Cisco بروتوكول قديم منافس اسمه ISL يغلّف الإطار بـ26 بايت ترويسة زائدة — مات واندثر، و802.1Q المعيار الوحيد الحي اليوم\n- أولوية PCP في الوسم هي أداة QoS الأساسية في الطبقة الثانية: إطار صوت بأولوية 5 يسبق إطار نقل ملفات بأولوية 0 في قوائم الانتظار",
          en: "The tag sits between the source address and the original EtherType. It consists of 4 bytes: the first two are the TPID holding the fixed value 0x8100 declaring «this frame is tagged» — the value a switch checks immediately after reading addresses. The second two bytes form the TCI carrying service information: a 3-bit PCP priority for QoS (values 0-7), one DEI bit for drop eligibility, and 12 bits of VLAN ID.\n\n12 bits = 4096 possible values, with 0 and 4095 reserved for protocols, leaving 4094 usable VLANs — the number you met in the VLAN lesson, returning here in its authentic hardware meaning. Since the tag adds 4 real bytes, the FCS is fully recomputed and the tagged frame's ceiling rises to 1522 bytes (some call it a baby giant).\n\n- The original EtherType shifts behind the tag, so the switch reads: tag → then the true payload type\n- Cisco once had a rival protocol called ISL wrapping frames in 26 extra header bytes — dead and gone; 802.1Q is the sole living standard today\n- The tag's PCP priority is Layer 2's core QoS tool: a voice frame at priority 5 beats a file transfer at priority 0 in the queues",
        },
        code: {
          lang: "text",
          snippet: "موقع الوسم داخل الإطار الموسوم\n\n[... Src MAC 6B][ TPID 2B = 0x8100 ][ TCI 2B ][ EtherType 2B ][ Payload ][ FCS ]\n                            |_____________ وسم 802.1Q ______________|\n\nTCI = [ PCP 3bt ][ DEI 1bt ][ VLAN ID 12bt ]\n       أولوية QoS  إسقاط     0-4095 (4094 قابلة للاستخدام)\n\nالحد الأقصى للإطار: 1518 عادي → 1522 موسوم",
        },
      },
      {
        heading: { ar: "الشبكة الأصلية Native VLAN", en: "The Native VLAN" },
        body: {
          ar: "في كل جذع 802.1Q تستثنى VLAN واحدة تسمى الأصلية (Native): إطاراتها تعبر الجذع بلا وسم إطلاقاً — كما لو كانت وصلة وصول عادية مختبئة داخل الجذع. أي إطار غير موسوم يصل إلى منفذ جذع يُنسب تلقائياً إلى VLAN الأصلية، وأي إطار صادر عنها يخرج مجرداً من الوسم.\n\nلماذا هذا الاستثناء؟ تاريخياً لاحتواء أجهزة قديمة لا تفهم الوسم، وهندسياً لأن بعض بروتوكولات التحكم تفضل البساطة. لكن الاستثناء نفسه صار ثغرة شهيرة: إذا اختلفت VLAN الأصلية بين طرفي الجذع، تتسرب الإطارات من VLAN إلى VLAN (VLAN hopping ساذج)، وتظهر سلوكيات شاذة في STP وحسابات التشفير. القاعدة الصارمة: نفس القيمة على الطرفين، دائماً وأبداً.\n\n- الافتراضي المصنعي: VLAN 1 أصلية على كل الجذوع — ممارسة يجب كسرها في الإنتاج\n- التصميم الناضجج: VLAN أصلية مخصصة بلا مستخدمين ولا حركة مرور تُذكر (مثلاً 999) على كلا الطرفين\n- بعض المنصات تدعم «الوسم الإجباري للأصلية» (vlan dot1q tag native) فيغلق الاستثناء كلياً — خيار أمني ممتاز حيثما توفر",
          en: "In every 802.1Q trunk one VLAN is excepted, called the Native VLAN: its frames cross the trunk completely untagged — as if an ordinary access link were hidden inside the trunk. Any untagged frame arriving at a trunk port is automatically assigned to the native VLAN, and any frame sourced from it departs stripped of its tag.\n\nWhy the exception? Historically to accommodate tag-ignorant legacy devices, and engineering-wise because some control protocols prefer simplicity. But the exception itself became a famous hole: if the native VLAN differs between trunk ends, frames leak between VLANs (naive VLAN hopping), with odd STP behavior and accounting anomalies. The strict rule: identical value at both ends, always and forever.\n\n- Factory default: VLAN 1 native on every trunk — a production practice you must break\n- Mature design: a dedicated native VLAN carrying no users and negligible traffic (say 999) on both ends\n- Some platforms support «forced native tagging» (vlan dot1q tag native), closing the exception entirely — an excellent security option wherever available",
        },
        tip: {
          ar: "عدم تطابق Native VLAN بين الطرفين هو أشهر عطل جذع خفي: الشبكة «تعمل» غالباً لكنها تتسرب وتشاذّ. طبّق التصميم الناضج (999 مثلاً على الطرفين) من اليوم الأول ولا توارث خطأ المصنع.",
          en: "Native VLAN mismatch is the most insidious hidden trunk fault: the network «mostly works» yet leaks and misbehaves. Apply the mature design (999 on both ends) from day one and never inherit the factory mistake.",
        },
      },
      {
        heading: { ar: "إعداد الجذع على IOS", en: "Configuring the Trunk on IOS" },
        body: {
          ar: "الإعداد الكلاسيكي على مبدّل Catalyst أربع جمل: تثبيت التغليف 802.1Q، تثبيت الوضع جذعاً، تعيين VLAN الأصلية، وقصر الوصل المسموح بها على قائمة الحاجة الفعلية. الأمر الأخير (allowed vlan) حكمة تصميمية: لماذا يبث جذع الطابق الأرضي إطارات VLAN الطابق الثالث؟ التقليم يقلل نطاق الإغراق والأعطال البثية عبر المبنى كله.\n\nملاحظة أمنية جديرة بالتوسع: بروتوكول DTP (Dynamic Trunking Protocol) يفاوض تلقائياً على تحول الوصلة جذعاً. ملائم بين مبدّليك، خطير أمام غرفة الاجتماعات: مهاجم يشبك مبدّلاً ذا DTP نشط قد يقنع منفذك التفاوضي بأن يصبح جذعاً فيرى كل VLANs دفعة واحدة. الوصفة: ثبّت mode trunk مع nonegotiate على كل جذع ثابت، وابقِ منافذ الوصول access صريحة — فيسقط التفاوض من المعادلة كلياً.\n\n- المنافذ الجذعية يجب أن تحمل نفس قائمة allowed على المبدّلات المتعاقبة وإلا انقطعت VLANs في منتصف المسار\n- تحقق بعد الإعداد مباشرة: show interfaces trunk — يعرض الوضع والوسم والأصلية والمسموح\n- سجّل الأصلية في وثيقة التصميم: قيمة مفاجئة على طرف واحد هي أول ما يُلام عند التسريب",
          en: "Classic Catalyst setup is four lines: fix the encapsulation to 802.1Q, fix the mode to trunk, assign the native VLAN, and restrict the allowed list to actual need. The last one (allowed vlan) is design wisdom: why should a ground-floor trunk broadcast third-floor VLAN frames? Pruning shrinks flooding scope and broadcast-fault blast radius across the whole building.\n\nA security note worth expanding: DTP (Dynamic Trunking Protocol) auto-negotiates a link turning into a trunk. Convenient between your own switches, dangerous near the meeting room: an attacker plugging in a DTP-active switch may persuade your negotiable port to become a trunk and see all VLANs at once. The recipe: hard-code mode trunk with nonegotiate on every fixed trunk and keep access ports explicitly access — negotiation drops out of the equation entirely.\n\n- Trunk ports must carry the same allowed list across successive switches or VLANs die mid-path\n- Verify immediately after configuring: show interfaces trunk — mode, tagging, native, and allowed at a glance\n- Record the native value in the design document: a surprising value on one end is the first suspect in any leak",
        },
        code: {
          lang: "text",
          snippet: "! تكوين جذع 802.1Q مُحصّن\nSwitch(config)# interface gi0/1\nSwitch(config-if)# description TRUNK-TO-SW2\nSwitch(config-if)# switchport trunk encapsulation dot1q\nSwitch(config-if)# switchport mode trunk\nSwitch(config-if)# switchport trunk native vlan 999\nSwitch(config-if)# switchport trunk allowed vlan 10,20,30\nSwitch(config-if)# switchport nonegotiate\nSwitch(config-if)# no shutdown\n\n! إضافة VLAN لاحقة للقائمة دون مسح الباقي (احذر البدء بفاصلة!)\nSwitch(config-if)# switchport trunk allowed vlan add 40",
        },
      },
      {
        heading: { ar: "التحقق ومعالجة عدم التطابق", en: "Verifying and Troubleshooting Mismatches" },
        body: {
          ar: "أعطال الجذوع تتصف بغرابة جزئية تخدع المبتدئين: VLAN موجودة على مبدّل وحاضرة في قائمة الطرف الآخر لكنها مفقودة من القائمة المسموحة للجذع → مستخدمو تلك VLAN معزولون بينما الباقون يعملون تماماً. راجع أولاً قوائم allowed على طول المسار: اختفاء VLAN واحدة من قائمة عقدة وسيطة يقطعها عن الجميع.\n\nعدم تطابق الأصلية يظهر في سلوك أغرب: جهازان في VLAN منطقية واحدة لا يتواصلان، ومرور فحص بروتوكولات CDP/LLDP يطبع تحذيراً صريحاً عن Native VLAN Mismatch — راقب هذه التحذيرات فهي أصدق صديق للتشخيص. وأخيراً: طرف جذع وطرف وصول (وضع غير متطابق) يعطي VLAN واحدة عاملة عبر الوصلة وباقي VLANs ميت — أسلوب أسئلة الشهادات المفضل، ولذلك احفظه بوصفه نمطاً لا استثناء.\n\n- خطة التشخيص الخمسة: show interfaces trunk → قوائم الطرفين → الأصلية → حالة الوصلة الفيزيائية → عدادات أخطاء الوصلة\n- أضف VLAN جديدة للجذوع القائمة بـ allowed vlan add — أما كتابة قائمة جديدة فهي استبدال كامل لا إضافة\n- عطلة «VLAN تعمل في اتجاه واحد» شبه دائماً اختلال في القوائم المسموحة بين عقدتين",
          en: "Trunk faults feature a deceptive partiality that fools beginners: a VLAN exists on one switch, present on the far side's list, yet missing from the trunk's allowed list → that VLAN's users are isolated while everyone else works perfectly. First audit the allowed lists along the path: one VLAN vanishing from a middle node's list cuts it off from all.\n\nNative mismatch shows up stranger still: two devices in one logical VLAN cannot talk, while CDP/LLDP checks print an explicit Native VLAN Mismatch warning — watch those warnings, diagnosis's most honest friend. Finally: trunk on one end, access on the other (mode mismatch) gives you exactly one working VLAN across the link with the rest dead — the certification exams' favorite pattern, so memorize it as a genre, not an exception.\n\n- The five-step plan: show interfaces trunk → both ends' lists → native value → physical link state → link error counters\n- Add a new VLAN to existing trunks with allowed vlan add — writing a new list is a full replacement, not an addition\n- A «VLAN works one way» outage is almost always an allowed-list discrepancy between two nodes",
        },
        code: {
          lang: "text",
          snippet: "Switch# show interfaces trunk\n\nPort        Mode         Encapsulation  Status        Native vlan\nGi0/1       on           802.1q         trunking      999\n\nPort      Vlans allowed on trunk\nGi0/1     10,20,30\n\nPort      Vlans allowed and active in management domain\nGi0/1     10,20,30\n\nPort        Vlans in spanning tree forwarding state\nGi0/1       10,20,30\n\n! التحذير الذي لا يُتجاهل عند عدم تطابق الأصلية\n%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch on Gi0/1",
        },
      },
    ],
    keyPoints: [
      { ar: "الجذع = وصلة واحدة تحمل VLANs متعددة عبر وسوم 802.1Q — حل مشكلة تضاعف الكابلات", en: "A trunk = one link carrying multiple VLANs via 802.1Q tags — the exploding-cable solution" },
      { ar: "الوسم 4 بايتات بعد عنوان المصدر: TPID 0x8100 + TCI (PCP + DEI + 12 بت VLAN ID)", en: "The 4-byte tag follows the source address: TPID 0x8100 + TCI (PCP + DEI + 12-bit VLAN ID)" },
      { ar: "12 بت = 4094 VLAN قابلة للاستخدام (0 و4095 محجوزتان)", en: "12 bits = 4094 usable VLANs (0 and 4095 reserved)" },
      { ar: "إطارات VLAN الأصلية تعبر بلا وسم — يجب تطابقها على الطرفين وإلا تسربت VLANs", en: "Native VLAN frames cross untagged — must match both ends or VLANs leak" },
      { ar: "قصر allowed vlan على الحاجة الفعلية يقلل نطاق الإغراق ونصف قطر الأعطال", en: "Restricting allowed vlans to actual need shrinks flooding scope and fault blast radius" },
      { ar: "عطّل DTP على الجذوع الثابتة (nonegotiate) لسد ثغرة تفاوض الجذع أمام المهاجمين", en: "Disable DTP on fixed trunks (nonegotiate) to close the trunk-negotiation attack hole" },
    ],
    commands: [
      { cmd: "show interfaces trunk", desc: { ar: "عرض جذوع المبدّل: الوضع والأصلية والقوائم المسموحة", en: "List the switch's trunks: mode, native, allowed lists" } },
      { cmd: "switchport mode trunk", desc: { ar: "تثبيت المنفذ جذعاً دائماً بلا تفاوض DTP", en: "Hard-code the port as a permanent trunk without DTP negotiation" } },
      { cmd: "switchport trunk allowed vlan 10,20,30", desc: { ar: "حصر VLANs العابرة للجذع على قائمة الحاجة الفعلية", en: "Restrict the VLANs crossing the trunk to the actual needed list" } },
      { cmd: "switchport trunk native vlan 999", desc: { ar: "تعيين VLAN أصلية مخصصة خالية من المستخدمين (على الطرفين!)", en: "Set a dedicated userless native VLAN (on both ends!)" } },
    ],
    quiz: [
      {
        q: { ar: "كم بايتاً يضيفه وسم 802.1Q إلى الإطار؟", en: "How many bytes does the 802.1Q tag add to a frame?" },
        options: [
          { ar: "2 بايت", en: "2 bytes" },
          { ar: "4 بايتات", en: "4 bytes" },
          { ar: "8 بايتات", en: "8 bytes" },
          { ar: "26 بايتاً", en: "26 bytes" },
        ],
        correct: 1,
        explain: { ar: "الوسم بايتان لـ TPID (0x8100) وبايتان لـ TCI = 4 بايتات تُدرج بعد عنوان المصدر ويُعاد حساب FCS تبعاً لها. (26 بايتاً كانت حجم تغليف ISL المنقرض من Cisco).", en: "The tag is two TPID bytes (0x8100) plus two TCI bytes = 4 bytes inserted after the source address, with the FCS recomputed accordingly. (26 bytes was the size of Cisco's extinct ISL encapsulation.)" },
      },
      {
        q: { ar: "إطار غير موسوم يصل إلى منفذ جذع 802.1Q. إلى أين يُنسب؟", en: "An untagged frame arrives at an 802.1Q trunk port. Where is it assigned?" },
        options: [
          { ar: "يُرمى لأن الجذوع تقبل الموسوم فقط", en: "Dropped, since trunks accept tagged only" },
          { ar: "يُنسب إلى VLAN البث الافتراضية", en: "Assigned to the default broadcast VLAN" },
          { ar: "يُنسب تلقائياً إلى الشبكة الأصلية Native VLAN", en: "Automatically assigned to the Native VLAN" },
          { ar: "يُغرق على كل VLANs الجذع", en: "Flooded across all the trunk's VLANs" },
        ],
        correct: 2,
        explain: { ar: "هذا هو تعريف VLAN الأصلية: العبارة الآمنة للإطارات العارية. لذلك يلزم تطابقها على الطرفين — وإلا حمل كل طرف الإطار العاري إلى عالم مختلف فتسربت الحدود.", en: "That is the native VLAN's definition: the safe harbor for bare frames. Hence the both-ends match requirement — otherwise each end carries the bare frame into a different world, leaking the boundary." },
      },
      {
        q: { ar: "جذع بين مبدّلين، القائمة المسموحة على الأول 10,20,30 وعلى الثاني 10,20,30,40. ماذا يحدث لمستخدمي VLAN 40 خلف المبدّل الثاني؟", en: "A trunk between two switches: first side allows 10,20,30; second side allows 10,20,30,40. What happens to VLAN 40 users behind switch two?" },
        options: [
          { ar: "يعملون طبيعياً لأن أحد الطرفين يسمح بهم", en: "They work normally since one side permits them" },
          { ar: "معزولون عن الوصول عبر الجذع: القائمة تقاطع لا اتحاد", en: "Isolated across the trunk: the list intersects, it does not union" },
          { ar: "يتصلون عبر VLAN الأصلية تلقائياً", en: "They connect automatically via the native VLAN" },
          { ar: "يسقط المبدّل الأول الوصلة كاملة", en: "The first switch drops the entire link" },
        ],
        correct: 1,
        explain: { ar: "حركة VLAN 40 تصل إلى الجذع فيرميها الطرف الذي لا يدرجها في قائمته المسموحة — فالجذع يسمح بما يوافق قائمتي الطرفين معاً (تقاطع). عطل نمطي: VLAN تعمل محلياً وتنقطع عبر المبدّلات.", en: "VLAN 40's traffic reaches the trunk and the side not listing it in its allowed set drops it — a trunk permits what both ends' lists share (intersection). The classic failure: a VLAN working locally yet dead across switches." },
      },
      {
        q: { ar: "لماذا يوصى بتعطيل DTP على الجذوع الثابتة (switchport nonegotiate)؟", en: "Why is disabling DTP on fixed trunks recommended (switchport nonegotiate)?" },
        options: [
          { ar: "لخفض استهلاك المعالج الناتج عن رسائل التفاوض", en: "To reduce CPU consumption from negotiation messages" },
          { ar: "لأن DTP يمنع وسوم 802.1Q من العمل", en: "Because DTP blocks 802.1Q tags from working" },
          { ar: "لإغلاق ثغرة يحول فيها مهاجم منفذ التفاوض إلى جذع ويرى كل VLANs", en: "To close the hole where an attacker negotiates a port into a trunk and sees all VLANs" },
          { ar: "لأن DTP يتعارض مع بروتوكول STP", en: "Because DTP conflicts with STP" },
        ],
        correct: 2,
        explain: { ar: "منفذ في وضع تفاوضي قد يقنع بأن يصبح جذعاً إذا أرسل له المهاجم رسائل DTP مناسبة — فيدخل بجهازه على كل VLANs بضربة واحدة. التثبيت الصريح (mode trunk + nonegotiate، أو access) يسد هذا الباب كلياً.", en: "A port in negotiable mode may be persuaded to become a trunk by an attacker's crafted DTP messages — granting their device all VLANs in one strike. Explicit hard-coding (mode trunk + nonegotiate, or access) slams this door entirely." },
      },
    ],
  },
  {
    id: "l038",
    moduleId: "m04",
    order: 8,
    level: "intermediate",
    title: { ar: "التوجيه بين VLANs: الراوتر على العصا ومبدّل SVI", en: "Inter-VLAN Routing: Router-on-a-Stick & Switch SVI" },
    summary: {
      ar: "طريقان لإعادة لمّ شمل الشبكات الافتراضية المعزولة: الراوتر على العصا بواجهاته الفرعية الموسومة، ومبدّل الطبقة الثالثة بواجهاته SVI الافتراضية — مع تكوين كامل لكل منهما ومقارنة الأداء والتكلفة.",
      en: "Two paths to reunite isolated VLANs: the router-on-a-stick with its tagged subinterfaces, and the Layer 3 switch with its virtual SVIs — complete configuration for both, plus performance and cost comparison.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "من يعيد لمّ الشمل؟", en: "Who Reunites the VLANs?" },
        body: {
          ar: "بنينا في الدرسين السابقين جزراً معزولة: VLANs تفصل نطاقات البث فصلاً محكماً. لكن أي مؤسسة تحتاج عكس ذلك أيضاً — الموظف يطبع على طابعة VLAN أخرى ويصل خادم VLAN الخوادم. من يملك سلطة العبور بين الجزر؟ الطبقة الثالثة حصراً: جهاز توجيه يفهم عناوين IP ويقرر المسار بين الشبكات الفرعية.\n\nفي تصميم VLAN سليم، كل VLAN شبكة فرعية مستقلة ببوابة افتراضية (Default Gateway) خاصة بها. وجهاز التوجيه بينها يتقمص دور البوابة لكل VLAN: يستقبل الحزمة من VLAN المرسل، يفحص عنوان الوجهة، ويعيد تغليفها بإطار VLAN المستقبِل ثم يدفعها إلى العالم الصحيح. الموقع الهندسي لهذا الجهاز يحدد الحلين اللذين يملكان السوق اليوم.\n\n- تذكّر القاعدة: العزل في L2 والربط في L3 — كل قصة VLAN تنتهي عند جهاز توجيه\n- البوابة الافتراضية لكل VLAN يجب أن تقيم في شبكتها الفرعية نفسها (192.168.10.1 لشبكة 10 مثلاً)\n- الأمان يعيش هنا أيضاً: قوائم ACL على واجهة التوجيه هي حاجز المرور بين VLANs — قوة سنعود لها في وحدة الأمن",
          en: "The last two lessons built isolated islands: VLANs sealing broadcast domains tightly. But any organization needs the reverse too — staff printing to another VLAN's printer and reaching the server VLAN. Who holds border-crossing authority between islands? Layer 3 exclusively: a routing device that understands IP addresses and decides paths between subnets.\n\nIn a sound VLAN design, every VLAN is an independent subnet with its own default gateway. The routing device between them embodies the gateway for each VLAN: it receives the packet from the sender's VLAN, inspects the destination, re-frames it into the recipient VLAN's envelope, and pushes it into the right world. This device's engineering placement defines the two solutions dominating the field today.\n\n- Remember the rule: isolation at L2, reunion at L3 — every VLAN story ends at a routing device\n- Each VLAN's default gateway must live inside its own subnet (192.168.10.1 for the 10 network, say)\n- Security lives here too: ACLs on the routing interface are the checkpoint between VLANs — power we revisit in the security module",
        },
      },
      {
        heading: { ar: "الحل الأول: الراوتر على العصا", en: "Solution One: Router-on-a-Stick" },
        body: {
          ar: "التسمية صورية بامتياز: موجّه واحد يتدلى من «عصا» — وصلة فيزيائية وحيدة تصله بالمبدّل، بينما تتفرع منها الواجهات الفرعية المنطقية كفروع الشجرة. الوصلة الوحيدة تُضبط جذعاً 802.1Q، ثم ينشأ لكل VLAN واجهة فرعية (Subinterface) تحمل عنوان بوابة تلك الشبكة وتُعرّف تغليفها بوسمها: encapsulation dot1Q 10.\n\nتسلسل العمل عند إرسال حزمة من VLAN 10 إلى VLAN 20: الجهاز المصدر يرسل إلى بوابة VLAN 10 (عنوان الواجهة الفرعية)؛ يصل الإطار الموسوم بالجذع إلى الموجّه؛ الواجهة الفرعية الصحيحة تقشر الوسم وترفع الحزمة إلى الطبقة الثالثة؛ الموجّه يقرر الخروج نحو شبكة VLAN 20 عبر الواجهة الفرعية الأخرى؛ يُغلف الحزمة بوسم 20 ويعيدها للجذع — والمبدّل يسلمها للوجهة.\n\n- كل حزمة بين VLANs تعبر الوصلة مرتين (دخولاً وخروجاً) — قيد النطاق الترددي الحاكم لهذا الحل\n- الواجهة الفيزيائية بلا عنوان IP: العناوين تتوزع على الفرعيات فقط\n- يلزم no shutdown على الفيزيائية الأم وإلا ماتت كل الفرعيات معها",
          en: "The name is pure imagery: a single router dangling from a «stick» — one physical link to the switch — with logical subinterfaces branching off it like tree limbs. That single link is configured as an 802.1Q trunk, then one subinterface per VLAN carries that network's gateway address and declares its tag: encapsulation dot1Q 10.\n\nThe sequence when a packet travels from VLAN 10 to VLAN 20: the source host sends to VLAN 10's gateway (the subinterface's address); the tagged frame reaches the router over the trunk; the correct subinterface strips the tag and lifts the packet to Layer 3; the router decides to exit toward VLAN 20's network via the other subinterface; the packet is re-framed with tag 20 and returned down the trunk — and the switch delivers it.\n\n- Every inter-VLAN packet crosses the link twice (in and out) — the bandwidth bottleneck governing this design\n- The physical interface carries no IP: addresses distribute across subinterfaces only\n- The physical parent needs no shutdown or every subinterface dies with it",
        },
        code: {
          lang: "text",
          snippet: "! تكوين الراوتر على العصا (الموجّه R1)\nR1(config)# interface gi0/0\nR1(config-if)# description STICK-TO-SW1\nR1(config-if)# no shutdown\n\nR1(config)# interface gi0/0.10\nR1(config-subif)# encapsulation dot1Q 10\nR1(config-subif)# ip address 192.168.10.1 255.255.255.0\n\nR1(config)# interface gi0/0.20\nR1(config-subif)# encapsulation dot1Q 20\nR1(config-subif)# ip address 192.168.20.1 255.255.255.0\n\n! على المبدّل SW1: المنفذ المتجه للموجّه جذع\nSW1(config)# interface gi0/24\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan 10,20",
        },
      },
      {
        heading: { ar: "الحل الثاني: واجهات SVI على مبدّل الطبقة الثالثة", en: "Solution Two: SVIs on a Layer 3 Switch" },
        body: {
          ar: "الأفكار الجوهرية تُختصر أحياناً في واجهة واحدة: واجهة SVI (Switch Virtual Interface) هي واجهة افتراضية بمستوى الطبقة الثالثة تسكن داخل مبدّل متعدد الطبقات، وتمثّل بوابة VLAN كاملة: interface vlan 10 مع عنوان 192.168.10.1. لا عصا ولا وصلة خارجية ولا مرتين عبور — التوجيه يحدث داخل صندوق المبدّل نفسه على مسارات العتاد.\n\nالشرطان المسبقان لعمل هذا العالم أولاً: تمكين ip routing عالمياً ليشحن المبدّل بعقل الموجّه، ووجود VLAN 10 حية بمنفذ نشط أو جذع يحملها — فالـ SVI ترتقي مع الـ VLAN: لا VLAN حية، لا واجهة up. ثم تتوالد الواجهات كل VLAN واحدة، والمبدّل يبني شبكة اتصال مباشرة بينها كلها في جدول توجيهه.\n\n- قارن المسارين: العصا = كل حزمة عبر وصلة واحدة مرتين بسرعة منفذ موجّه؛ SVI = مسار داخلي بسرعة نسيج التبديل كاملاً (جيجابت إلى عشرات الجيجابت)\n- المنافذ الفيزيائية تستطيع أيضاً التحول لمنافذ موجّهة نقية (no switchport + عنوان IP) — وصلات uplink للنواة مثلاً\n- الـ SVIs هي العمود الفقري لتصميمCampus الحديث: طبقة الوصول L2 وطبقة التوزيع/النواة L3",
          en: "Sometimes the essential idea compresses into a single interface: an SVI (Switch Virtual Interface) is a virtual Layer 3 interface living inside a multilayer switch, embodying an entire VLAN's gateway: interface vlan 10 with address 192.168.10.1. No stick, no external link, no double crossing — routing happens inside the switch box itself on hardware paths.\n\nTwo preconditions power this world first: enabling ip routing globally to charge the switch with a router's mind, and VLAN 10 being alive with an active port or trunk carrying it — the SVI rises with its VLAN: no live VLAN, no up interface. Then the interfaces multiply one per VLAN, and the switch builds a directly-connected network among them all in its routing table.\n\n- Compare the paths: the stick = every packet over one link twice at router-port speed; SVI = an internal path at full switching-fabric rate (gigabit to tens of gigabits)\n- Physical ports can also become pure routed ports (no switchport + an IP) — core uplinks, for instance\n- SVIs are the backbone of modern campus design: L2 access layer with L3 distribution/core layers",
        },
        code: {
          lang: "text",
          snippet: "! تكوين مبدّل الطبقة الثالثة بالواجهات SVI\nSW1(config)# ip routing\n\nSW1(config)# vlan 10\nSW1(config-vlan)# name SALES\nSW1(config-vlan)# vlan 20\nSW1(config-vlan)# name HR\n\nSW1(config)# interface vlan 10\nSW1(config-if)# ip address 192.168.10.1 255.255.255.0\nSW1(config-if)# no shutdown\n\nSW1(config)# interface vlan 20\nSW1(config-if)# ip address 192.168.20.1 255.255.255.0\nSW1(config-if)# no shutdown\n\n! تحقق: شبكات متصلة مباشرة في جدول التوجيه\nSW1# show ip route connected\nC    192.168.10.0/24 is directly connected, Vlan10\nC    192.168.20.0/24 is directly connected, Vlan20",
        },
        tip: {
          ar: "أشهر عطل SVI في المعامل: الواجهة vlan 10 رافضة الصعود (down). اعرض show ip interface brief وshow vlan brief معاً — السبب غالباً VLAN غير موجودة أو بلا منفذ نشط يحملها، لا خطأ في الـ SVI نفسها.",
          en: "The lab's most common SVI fault: interface vlan 10 refusing to come up. Show show ip interface brief and show vlan brief together — the cause is usually a nonexistent VLAN or one with no active port carrying it, not an SVI misconfiguration itself.",
        },
      },
      {
        heading: { ar: "المقارنة الهندسية بين الحلين", en: "Engineering Comparison of the Two" },
        body: {
          ar: "متى تختار أياً منهما؟ فكّر بأربعة محاور. الأداء: مبدّل L3 يوجه على عتاد ASIC متخصص بمعدلات أسلاك، بينما يمر الراوتر على العصا بكل حزمة عبر وصلة واحدة مرتين وبسعة معالجة موجّه أضيق — فارق يظهر فوراً مع مئات المستخدمين العابرة بين VLANs. التكلفة: موجّه صغير رخيص لكنه عنق زجاجة؛ مبدّل L3 أغلى لكنه يشتري أداء بكثافة منافذ مزدوجة.\n\nالمرونة المكانية: العصا تعمل حيث يوجد موجّه مستقل أصلاً (فرع صغير، حدود إنترنت)؛ أما التصميم المركزي فـ SVI تجلس في مبدّل التوزيع نفسه حيث تلتقي كل VLANs. قابلية التوسع: العصا تصلح حتى بضع VLANs وسرعات متوسطة، ثم تصطدم بجدار الوصلة الوحيدة؛ SVI تتوسع إلى مئات VLANs ومعدلات نسيج كاملة — مع خيارات زائدة كالتوجيه بين مباني الحرم عبر منافذ L3 نقية.\n\n- الرصيد العملي: الشبكات الحديثة تجعل مبدّل التوزيع موجّهاً (SVI + ip routing) وتترك الراوتر المتخصص لحدود الإنترنت وVPN والأمان المتقدم\n- العصا لا تزال ممتازة تعليمياً وللشبكات الصغيرة جداً والمواقع النائية بموجّه واحد متعدد الأدوار\n- كلا الحلين يكمل بالتكرار: بوابتان لكل VLAN ببروتوكولات HSRP/VRRP — فصل قادم في وحدة التوفر العالي",
          en: "When to choose which? Think along four axes. Performance: an L3 switch routes on dedicated ASIC silicon at wire rates, while the stick passes every packet twice over one link through a narrower router engine — a gap that surfaces instantly with hundreds of users crossing VLANs. Cost: a small router is cheap yet a bottleneck; an L3 switch costs more but buys performance with doubled port density.\n\nLocational flexibility: the stick works wherever a standalone router already exists (small branch, internet edge); centralized design seats SVIs in the distribution switch itself where all VLANs converge. Scalability: the stick suits a handful of VLANs at moderate rates before hitting the single-link wall; SVIs scale to hundreds of VLANs at full fabric rates — plus extras like inter-building campus routing over pure L3 ports.\n\n- The practical verdict: modern networks make the distribution switch the router (SVI + ip routing) and leave the specialized router to internet edge, VPN, and advanced security\n- The stick remains excellent pedagogy, for very small networks, and remote sites with one multi-role router\n- Both solutions complete with redundancy: two gateways per VLAN via HSRP/VRRP — a future chapter in the high-availability module",
        },
      },
      {
        heading: { ar: "التحقق الكامل من التوجيه البيني", en: "Full Inter-VLAN Verification" },
        body: {
          ar: "فحص التوجيه الناجح ثلاثي الطبقات. الأولى — الواجهات: show ip interface brief يجب أن تعرض كل بوابات VLANs أو الفرعيات بحالة up/up مع عناوينها الصحيحة. الثانية — الجدول: show ip route يعرض الشبكات متصلة مباشرة (C) لكل VLAN — هذا الطريق المباشر هو أساس كل عبور بني، وغياب أحدها يعني خللاً في الواجهة أو VLAN نفسها.\n\nالثالثة — الواقع: اختبار ping شامل من جهاز في VLAN 10 إلى بوابته أولاً (يبطل L2 كاملاً)، ثم إلى جهاز في VLAN 20 (يختبر التوجيه فعلياً)، ثم إلى الإنترنت (يختبر المسار الافتراضي كذلك). فشل الطبقة الأولى مع نجاح الباقي يوجّه نحو ACL مانعة؛ نجاح الأولى وفشل الثانية يوجّه نحو الوسوم والجذوع. هذا التدرج المنهجي هو مهنة تشخيص الشبكات في أوجها.\n\n- على الموجّه أو المبدّل: show arp وshow ip arp تعرض خريطة IP→MAC المبنية عبر التوجيه الناجح — حلقة الوصل مع درس ARP الختامي\n- الجهاز الطرفي نفسه يحتاج تهيئة كاملة: IP من الشبكة الصحيحة + البوابة الصحيحة + DNS — نصف أعطال «التوجيه» في المعامل طرفية لا توجيهية\n- وثّق مخطط VLAN-to-Gateway في الوثيقة الحية: كل مهندس يرث الشبكة سيقبّلك عليه",
          en: "Successful routing verification has three layers. First — interfaces: show ip interface brief must show every VLAN gateway or subinterface up/up with correct addresses. Second — the table: show ip route shows each VLAN as directly connected (C) — that direct route is the foundation of every crossing you built, and one missing entry means an interface or VLAN fault.\n\nThird — reality: a comprehensive ping from a VLAN 10 host to its own gateway first (invalidates L2 entirely), then to a VLAN 20 host (tests routing for real), then to the internet (tests the default path too). Layer-one failure with the rest succeeding points to a blocking ACL; layer-one success with layer-two failure points to tags and trunks. This methodical gradient is network diagnosis at its finest.\n\n- On router or switch: show arp and show ip arp display the IP→MAC map built through successful routing — the loop closing with the ARP finale lesson\n- The endpoint itself needs complete configuration: IP from the right subnet + right gateway + DNS — half of all «routing» faults in labs are endpoint issues, not routing ones\n- Document the VLAN-to-Gateway map in the living document: every engineer inheriting the network will thank you for it",
        },
        code: {
          lang: "text",
          snippet: "! التحقق الثلاثي على مبدّل L3\nSW1# show ip interface brief\nInterface              IP-Address      OK  Method Status  Protocol\nVlan10                 192.168.10.1    YES manual up      up\nVlan20                 192.168.20.1    YES manual up      up\n\nSW1# show ip route connected\nC    192.168.10.0/24 is directly connected, Vlan10\nC    192.168.20.0/24 is directly connected, Vlan20\n\n! اختبار من جهاز طرفي في VLAN 10\nPC> ping 192.168.10.1     <- البوابة أولاً: يصحح L2 والـ VLAN\nPC> ping 192.168.20.5     <- جهاز VLAN 20: يختبر التوجيه فعلياً",
        },
      },
    ],
    keyPoints: [
      { ar: "العزل في L2 واللمّ الشمل في L3: كل تواصل بين VLANs يمر بجهاز توجيه", en: "Isolation at L2, reunion at L3: all inter-VLAN traffic passes a routing device" },
      { ar: "الراوتر على العصا: جذع واحد + واجهة فرعية لكل VLAN بوسم encapsulation dot1Q", en: "Router-on-a-stick: one trunk + one subinterface per VLAN with encapsulation dot1Q" },
      { ar: "كل حزمة بين VLANs تعبر وصلة العصا مرتين — عنق الزجاجة البنيوي للحل", en: "Every inter-VLAN packet crosses the stick's link twice — the design's structural bottleneck" },
      { ar: "SVI = interface vlan N بعنوان بوابة الـ VLAN داخل مبدّل L3 مع ip routing مفعّلاً", en: "SVI = interface vlan N with the VLAN's gateway address inside an L3 switch with ip routing enabled" },
      { ar: "الـ SVI ترتقي مع الـ VLAN: واجهة بلا VLAN حية ومنفذ نشط تبقى down مهما صحّ تكوينها", en: "An SVI rises with its VLAN: without a live VLAN and active port the interface stays down however correct the config" },
      { ar: "التصميم الحديث: التوزيع/النواة موجّهان بـ SVI على عتاد ASIC، والراوتر المتخصص لحدود الإنترنت", en: "Modern design: distribution/core route via SVIs on ASIC hardware, with specialized routers at the internet edge" },
    ],
    commands: [
      { cmd: "show ip interface brief", desc: { ar: "عرض حالة كل واجهات IP — أول فحص في أي عطل توجيه بيني", en: "Show all IP interfaces' state — the first check in any inter-VLAN fault" } },
      { cmd: "show ip route", desc: { ar: "عرض جدول التوجيه: الشبكات المتصلة مباشرة عبر الواجهات", en: "Show the routing table: directly connected networks via interfaces" } },
      { cmd: "ip routing", desc: { ar: "تمكين وظيفة التوجيه على مبدّل متعدد الطبقات (شرط SVI)", en: "Enable routing function on a multilayer switch (SVI precondition)" } },
      { cmd: "ping 192.168.20.5 source 192.168.10.1", desc: { ar: "اختبار التوجيه البيني من واجهة البوابة المصدر نحو الوجهة", en: "Test inter-VLAN routing from the source gateway interface toward the destination" } },
    ],
    quiz: [
      {
        q: { ar: "في تصميم الراوتر على العصا، ما وظيفة الواجهة الفرعية gi0/0.10 ذات encapsulation dot1Q 10؟", en: "In router-on-a-stick, what is the role of subinterface gi0/0.10 with encapsulation dot1Q 10?" },
        options: [
          { ar: "تكرار حركة VLAN 10 لأغراض الاحتياط", en: "Mirroring VLAN 10 traffic for redundancy" },
          { ar: "تمثيل بوابة VLAN 10: تقشر الوسم 10 وترفع الحزم إلى الطبقة الثالثة", en: "Acting as VLAN 10's gateway: stripping tag 10 and lifting packets to Layer 3" },
          { ar: "تحويل المنفذ الفيزيائي إلى منفذ وصول", en: "Converting the physical port into an access port" },
          { ar: "إنشاء VLAN 10 على الموجّه نفسه", en: "Creating VLAN 10 on the router itself" },
        ],
        correct: 1,
        explain: { ar: "الواجهة الفرعية تمثل عالم VLAN 10 في عقل الموجّه: تلتقط الإطارات الموسومة بـ 10 عبر الجذع، تقشر الوسم، وتتولى عناوين تلك الشبكة وبوابتها. واجهة فرعية لكل VLAN = بوابات متعددة على وصلة فيزيائية واحدة.", en: "A subinterface embodies VLAN 10's world in the router's mind: it captures tag-10 frames over the trunk, strips the tag, and owns that network's address and gateway. One subinterface per VLAN = multiple gateways on a single physical link." },
      },
      {
        q: { ar: "أنشأت interface vlan 10 بعنوان صحيح على مبدّل L3 مع ip routing، لكن الواجهة down. ما السبب الأرجح؟", en: "You created interface vlan 10 with a correct address on an L3 switch with ip routing, yet it stays down. Most likely cause?" },
        options: [
          { ar: "عنوان IP مكرر في الشبكة", en: "A duplicate IP in the network" },
          { ar: "VLAN 10 غير موجودة أو بلا منفذ نشط/جذع يحملها", en: "VLAN 10 doesn't exist or has no active port/trunk carrying it" },
          { ar: "ip routing لا يدعم SVI أصلاً", en: "ip routing does not support SVIs at all" },
          { ar: "قائمة ACL تحجب الواجهة", en: "An ACL blocking the interface" },
        ],
        correct: 1,
        explain: { ar: "الـ SVI مرآة الـ VLAN: ترتقي معها وتهبط معها. VLAN غير معرفة في قاعدة بيانات المبدّل أو موجودة لكن بلا منفذ نشط — تبقى الواجهة الافتراضية down مهما صحّ تكوينها وعنوانها.", en: "An SVI mirrors its VLAN: rising and falling with it. A VLAN absent from the switch database, or present but without an active port, keeps the virtual interface down no matter how correct its address." },
      },
      {
        q: { ar: "ما الميزة الأدائية الجوهرية لمبدّل الطبقة الثالثة على الراوتر على العصا؟", en: "What is the L3 switch's fundamental performance advantage over router-on-a-stick?" },
        options: [
          { ar: "زمن كفاءة أعلى لأن التوجيه يتم في عتاد ASIC داخل المبدّل بلا وصلة خارجية مزدوجة العبور", en: "Higher efficiency: routing happens in switch ASIC silicon without a doubly-crossed external link" },
          { ar: "لا يحتاج عناوين IP للواجهات", en: "It needs no IP addresses on interfaces" },
          { ar: "يدعم VLANs أكثر من الموجّه بمرتبة قانونية", en: "It legally supports an order of magnitude more VLANs" },
          { ar: "يعمل بلا تمكين ip routing", en: "It works without enabling ip routing" },
        ],
        correct: 0,
        explain: { ar: "الحزمة بين VLANs في المبدّل L3 تعبر نسيج التبديل الداخلي بمعدل الأسلاك على مسارات ASIC، بينما تضطر في العصا لعبور وصلة واحدة مرتين بسعة منفذ الموجّه — الفارق البنيوي الذي يحسم الاختيار مع نمو الشبكة.", en: "An inter-VLAN packet in an L3 switch crosses the internal switching fabric at wire rate on ASIC paths, whereas the stick forces it over one link twice at the router port's capacity — the structural gap that decides the choice as networks grow." },
      },
      {
        q: { ar: "جهاز في VLAN 10 ينجح في ping بوابة شبكته 192.168.10.1 لكنه يفشل نحو جهاز VLAN 20. أين تركز التشخيص؟", en: "A VLAN 10 host successfully pings its gateway 192.168.10.1 but fails toward a VLAN 20 host. Where do you focus?" },
        options: [
          { ar: "كابل الجهاز وسرعة منفذه", en: "The host's cable and port speed" },
          { ar: "عنوان MAC الخاص بالجهاز", en: "The host's MAC address" },
          { ar: "جهاز DNS للشبكة", en: "The network's DNS" },
          { ar: "التوجيه البيني: جدول التوجيه ووسوم الفرعيات/الـ SVI ووسم VLAN 20 عند الوجهة", en: "Inter-VLAN routing: routing table, subinterface/SVI tags, and VLAN 20's state at the destination" },
        ],
        correct: 3,
        explain: { ar: "نجاح ping البوابة يبرّئ الطبقة الثانية كاملة: الوصل والـ VLAN وعنوان الجهاز سليمة. الفشل لما وراءها يركز في التوجيه نفسه (الجدول، الواجهات) أو في عالم VLAN 20 عند الوجهة (منفذها ووصلها) — هذا هو منطق التدرج التشخيصي.", en: "Successful gateway ping fully acquits Layer 2: link, VLAN, and host address are sound. Failure beyond it focuses on routing itself (table, interfaces) or on VLAN 20's world at the destination (its port and link) — this is graduated diagnosis logic." },
      },
    ],
  },
  {
    id: "l039",
    moduleId: "m04",
    order: 9,
    level: "intermediate",
    title: { ar: "بروتوكول الشجرة الممتدة STP: قطع الحلقات بلا قطع التكرار", en: "STP: Cutting Loops Without Cutting Redundancy" },
    summary: {
      ar: "الطبقة الثانية لا تعرف TTL فتدور حلقاتها إلى الأبد: عاصفة البث، انتخاب الجسر الجذري بأدنى Bridge ID، أدوار المنافذ وحالاتها، ثم RSTP بقفزته النوعية في سرعة التقارب، مع الضبط والتحصين.",
      en: "Layer 2 knows no TTL, so its loops spin forever: broadcast storms, root bridge election by lowest Bridge ID, port roles and states, then RSTP's qualitative convergence leap, with tuning and hardening.",
    },
    durationMin: 20,
    sections: [
      {
        heading: { ar: "الفخ: التكرار في الطبقة الثانية", en: "The Trap: Layer-2 Redundancy" },
        body: {
          ar: "في الشبكات الجادة نضيف وصلات احتياطية: مبدّلان بينهما وصلة تالفة؟ وصلة ثانية تحمل الراكب. لكن الطبقة الثانية بُنيت بلا آلية عدّ حياة: حزمة IP تحمل TTL ينقص عند كل قفزة، أما إطار الإيثرنت فلا يحمل شيئاً من هذا — وهنا يفتح الفخ فكّه.\n\nإطار بث يصل إلى المبدّل الأول فينسخ إلى الوصلتين؛ يصله من كل واحدة نسخة فينسخ لكل الأخرى عدا القادمة — فتتوالد النسخ أُسّياً وتدور في الحلقة إلى الأبد: عاصفة بث (Broadcast Storm) تلتهم نطاق الشبكة كله. ومعها يذهب جدول MAC ضحية ثانية: النسخ العائدة من الحلقة تحمل مصادر بعناوين ظهرت للتو على منفذ آخر، فتقفز الإدخالات بين المنافذ بجنون (MAC Flapping) ويتصدع القرار في كل مبدّل.\n\n- الأعراض الميدانية للحلقة: مرور يتوقف كلياً، أضواء منافذ تتوهج ثابتة، وأجهزة تبدو موصولة لا تجيب\n- تشخيص سريع: ارتفاع مذهل في العدادات + سجلات MAC flapping في المبدّلات\n- الحل الفوري عند اكتشاف عاصفة: افصل وصلة واحدة من الحلقة — فتصمت الشبكة فوراً، وتؤكد التشخيص",
          en: "Serious networks add backup links: a failed link between two switches? A second one carries the passengers. But Layer 2 was built with no life counter: an IP packet carries a TTL decremented per hop, while an Ethernet frame carries nothing of the sort — and there the trap springs.\n\nA broadcast frame reaches the first switch and is copied to both links; copies return from each and are copied to every port except the arrival port — multiplying exponentially and spinning in the loop forever: a broadcast storm devouring the network's entire span. The MAC table falls as a second victim: copies returning from the loop carry sources just seen on another port, so entries flap between ports madly (MAC Flapping) and every switch's decision-making shatters.\n\n- Field symptoms of a loop: traffic halts completely, port LEDs glow solid, devices appear connected yet unresponsive\n- Rapid diagnosis: astronomical counter growth + MAC flapping logs on the switches\n- The instant remedy upon discovering a storm: unplug one link from the loop — the network falls silent immediately, confirming the diagnosis",
        },
      },
      {
        heading: { ar: "الحل: شجرة منطقية بجسر جذري", en: "The Solution: A Logical Tree with a Root Bridge" },
        body: {
          ar: "فكرة STP (Spanning Tree Protocol) من هندسة الرسوم البيانية: من شبكة مليئة بالحلقات، احسب شجرة ممتدة واحدة تصل كل المبدّلات بلا دورة، ثم عطّل منطقياً المنافذ الزائدة عن الشجرة — وصلة احتياطية جاهزة للصعود إذا سقطت أخرى. تحتفظ بالتكرار الفيزيائي وتحظر التكرار المنطقي في آن واحد.\n\nالديمقراطية التي تختار قمة الشجرة تجري عبر رسائل BPDU (Bridge Protocol Data Units) تتبادلها المبدّلات كل ثانيتين. كل مبدّل يعلن معرّفه الجسري (Bridge ID) = أولوية (16 بت) + معرف VLAN الموسّع + عنوان MAC، والفوز لأدناها. الأولوية الافتراضية 32768 للجميع، فيُحسم التعادل غالباً بعنوان MAC الأدنى — نتيجة عشوائية التقسيم يجب ألا تركبها أبداً: خطّط جذرك بنفسك.\n\n- الجسر الجذري (Root Bridge) يصبح مركز الشجرة: كل مسارات الشبكة تنحدر منه\n- تعديل الأولوية بقيم مضاعفات 4096 (مثلاً 4096 أو 8192) — أدنى قيمة أعلى من «الجذري الثانوي»\n- كل شيء يُحسب لكل VLAN في وضع PVST+ السائد على Cisco: جذور مختلفة لشبكات افتراضية مختلفة — أداة هندسية لضبط مسارات الحمل",
          en: "STP's (Spanning Tree Protocol) idea comes from graph theory: from a network full of loops, compute one spanning tree connecting every switch with no cycle, then logically disable ports surplus to the tree — a backup link ready to rise if another falls. You retain physical redundancy while banning logical redundancy simultaneously.\n\nThe democracy choosing the tree's apex runs over BPDU (Bridge Protocol Data Units) messages exchanged every 2 seconds. Each switch announces its Bridge ID = priority (16 bits) + extended VLAN identifier + MAC address, with the lowest winning. Default priority is 32768 for everyone, so ties usually resolve by lowest MAC — a random outcome you must never ride: plan your root yourself.\n\n- The Root Bridge becomes the tree's center: every network path descends from it\n- Tune priority in multiples of 4096 (say 4096 or 8192) — lowest value above your «secondary root»\n- Everything is computed per-VLAN in the PVST+ mode dominant on Cisco: different roots for different virtual networks — an engineering tool for load pathing",
        },
        code: {
          lang: "text",
          snippet: "! تخطيط الجذريين عن قصد (لا تتركها لعنوان MAC!)\nCore1(config)# spanning-tree vlan 10,20,30 root primary\n  ! يخفض الأولوية إلى 24576 (أو أقل بما يكزم للفوز)\nCore2(config)# spanning-tree vlan 10,20,30 root secondary\n  ! الأولوية 28672: جاهز للترقية عند سقوط Core1\n\n! أو يدوياً بدقة كاملة\nCore1(config)# spanning-tree vlan 10 priority 4096",
        },
      },
      {
        heading: { ar: "أدوار المنافذ وحساب المسار", en: "Port Roles and Path Calculation" },
        body: {
          ar: "بعد التتويج تتوزع الأدوار. على الجسر الجذري: كل المنافذ «معيّنة» (Designated) — فلماذا لا، وهو القمة. على كل مبدّل آخر: منفذ واحد فقط يُنتخب «منفذاً جذرياً» (Root Port): أفضل طريق إلى الجذري بأقل تكلفة تراكمية؛ وبقية المنافذ المتصلة بقطاعات أخرى تتنافس على «المعيّن» لكل قطاع، والخاسر في القطاع الفائض يصبح «بديلاً» (Alternate/Blocking) — منطقياً مطفأ وحامل وثيقة استعداد.\n\nتكلفة المسار (Path Cost) مستمدة من سرعة الوصلة — بطريقة IEEE القصيرة السائدة: 100Mbps = 19، و1Gbps = 4، و10Gbps = 2. المبدّل يجمع تكاليف مساره إلى الجذري عبر كل منفذ محتمل ويختار الأدنى، والتعادل يحسم بمعايير متدرجة: أدنى Bridge ID للجسر المجاور، ثم أدنى معرّف منفذ (Port ID) عند التطابق الكامل — حالة الوصلات المتوازية بين مبدّلين اثنين فقط.\n\n- منفذ التسلسل للهاتف أو الكمبيوتر لا يجب أن يشارك هذه الانتخابات أصلاً — سيأتي PortFast ليخرجه منها\n- الأدوار لكل VLAN مستقلة في PVST+: وصلة قد تكون جذورية لحركة VLAN 10 وبديلة لحركة VLAN 20 — توازن حمل مجاني بذكاء تصميمي\n- القراءة العملية: show spanning-tree تعرض الدور والتكلفة والحالة لكل منفذ — قائمة قراءتها يومية لمهندس الحرم الجامعي",
          en: "After the coronation, roles distribute. On the root bridge: every port is «Designated» — why not, it is the summit. On every other switch: exactly one port gets elected «Root Port»: the best path to the root at lowest cumulative cost; remaining ports facing other segments compete for «Designated» per segment, and the loser on surplus segments becomes «Alternate» (Blocking) — logically dark yet holding a standby warrant.\n\nPath cost derives from link speed — under the prevailing IEEE short method: 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2. Each switch sums its path costs to the root via every candidate port and picks the lowest, with ties resolved by graduated criteria: lowest neighbor Bridge ID, then lowest Port ID on full match — the case of parallel links between exactly two switches.\n\n- Phone and PC edge ports should never join this election at all — PortFast arrives to exempt them\n- Roles are per-VLAN independent under PVST+: a link may be root for VLAN 10's traffic and alternate for VLAN 20's — free load balancing through design intelligence\n- Practical reading: show spanning-tree displays role, cost, and state per port — daily reading for the campus engineer",
        },
      },
      {
        heading: { ar: "حالات المنافذ: من 50 ثانية إلى أجزاء الثانية", en: "Port States: From 50 Seconds to Sub-Second" },
        body: {
          ar: "الإصدار الأصلي 802.1D يمرّ كل منفذ غير جذري بأربع حالات: تعطيل (Blocking) يستمع للـ BPDU بلا مرور؛ ثم استماع (Listening) 15 ثانية يبني الأدوار؛ ثم تعلم (Learning) 15 ثانية يبني جدول MAC بلا تمرير؛ وأخيراً تمرير (Forwarding). المؤقتات: Hello ثانيتان، Forward Delay 15، Max Age 20 — تقارب كامل عند تغيّر الطبولوجيا يستغرق 30-50 ثانية: عمر كامل في زمن الشبكات الحديث.\n\nRSTP (802.1w — ووضع rapid-pvst على Cisco) يعيد كتابة القصة: ثلاث حالات فقط (Discarding، Learning، Forwarding) وأدوار إضافية (Backup بجانب Alternate)، والأهم آلية المصافحة (Proposal/Agreement) بين المبدّلات المتجاورة: يتفقان على انتقال فوري بدل انتظار المؤقتات العمياء. المنافذ الطرفية (Edge/PortFast) تصعد فوراً، والمنافذ البديلة تعيد الحساب خلال أجزاء ثانية — التقارب يهبط من 50 ثانية إلى ما دون الثانية غالباً.\n\n- انتقل إلى rapid-pvst في كل شبكة حديثة: صراحة التكوين بسطر واحد وربح هائل بلا كلفة\n- المنفذ الذي يتسلم BPDU فجأة وهو PortFast يدخل الانتخابات فوراً — وهنا مخاطرة BPDU Guard الآتية\n- حالة Discarding تجمع Blocking والاستماع القديمين في اسم واحد: مطفأ لكنه مُتنبّه",
          en: "The original 802.1D walks every non-root port through four states: Blocking, listening for BPDUs with no traffic; then Listening (15 seconds) building roles; then Learning (15 seconds) building the MAC table without forwarding; finally Forwarding. Timers: Hello 2 seconds, Forward Delay 15, Max Age 20 — full convergence on topology change takes 30-50 seconds: an entire era in modern network time.\n\nRSTP (802.1w — rapid-pvst mode on Cisco) rewrites the story: only three states (Discarding, Learning, Forwarding), additional roles (Backup beside Alternate), and above all the handshake mechanism (Proposal/Agreement) between neighboring switches: agreeing on immediate transition instead of blind timer waits. Edge ports (PortFast) rise instantly, alternate ports recompute in fractions of a second — convergence drops from 50 seconds to typically under one.\n\n- Move to rapid-pvst in every modern network: one line of configuration for an enormous gain at no cost\n- A PortFast port suddenly receiving a BPDU joins the election immediately — hence the coming BPDU Guard precaution\n- Discarding merges old Blocking and Listening into one name: dark yet watchful",
        },
        code: {
          lang: "text",
          snippet: "Switch# show spanning-tree vlan 10\n\nVLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    24576\n             Address     00d0.ffab.1201\n             Cost        4\n             Port        1 (Gi0/1)\n  Bridge ID  Priority    32782  (priority 32768 sys-id-ext 14)\n             Address     00d0.ffcd.3311\n\nInterface   Role Sts Cost      Prio.Nbr Type\nGi0/1       Root FWD 4         128.1    P2p\nGi0/2       Altn BLK 4         128.2    P2p\nFa0/5       Desg FWD 19        128.5    P2p Edge*",
        },
      },
      {
        heading: { ar: "التحصين: PortFast وBPDU Guard وأنصاف الحلقة", en: "Hardening: PortFast, BPDU Guard, and Half the Loop" },
        body: {
          ar: "أمرّاض STP العملية ثلاثة، ولكل علاجه. أولاً: انتظار 30 ثانية (أو حتى عشر دقائق في أسوأ حالات 802.1D) قبل عمل منفذ طرفي — مستخدم يشبك لابتوبه ويصلي DHCP فيصله انتهاء المهلة. العلاج PortFast: منفذ طرفي معلوم أنه لا يقود إلى مبدّلات، يعمل فوراً بلا انتخابات — لكنه يفقد حصانة الحلقات، ولذلك يرفق دائماً بـ BPDU Guard: إن وصلك BPDU على منفذ PortFast (مبدّل غريب شُبك حيث لا يجب!) يُدخل المنفذ err-disabled فوراً — باب انقلاب الجذع مسدود بلا نقاش.\n\nثانياً: مبدّل بطيء أو معطل يفقد BPDUs فتظنه الشبكة جذعاً سالكاً وتفتح بديلاً — أزمة البيانات المكررة. العلاج الجماعي Root Guard على منافذ لا تقبل جذراً غير جذرك المخطط. ثالثاً: مبدّل جديد يوصل بأولوية أقل فيخطف الجذري ويعاد رسم الشجرة كلها بشكل أهوج — العلاج نفسه بالضبط: Root Guard في حدود النطاق، والبروتوكولات المرافقة مثل BPDU Filter بحذر شديد. الشبكة المنضبطة الحديثة تتولى هذه كلها بأسطر قليلة وتنام مرتاحة.\n\n- القاعدة الذهبية: PortFast للمنافذ الطرفية فقط — وضعه على منفذ يخفي مبدّلاً خلفه نصف حلقة جاهزة الانفجار\n- استعمل spanning-tree portfast default لتشغيله تلقائياً على كل منافذ الوصول النشطة ثم ضف BPDU Guard عالمياً\n- في التصميم الكامل: جذر مُخطط في النواة/التوزيع + تحصين الأطراف = طبقة ثانية تنام في سلمها",
          en: "STP's practical diseases are three, each with its cure. First: waiting 30 seconds (up to ten minutes in 802.1D's worst cases) before an edge port works — a user plugs in a laptop, DHCP times out before the port ever lights. The cure is PortFast: an edge port known to lead to no switches works immediately without elections — but loses loop immunity, hence always accompanied by BPDU Guard: if a BPDU arrives on a PortFast port (a rogue switch plugged where it must not be!) the port enters err-disabled instantly — the trunk-flip door welded shut, no discussion.\n\nSecond: a slow or broken switch losing BPDUs so the network assumes its path dead and opens an alternate — duplicated data crisis. The collective cure is Root Guard on ports that must never accept a root other than your planned one. Third: a new switch plugged in with lower priority hijacks the root and redraws the entire tree haphazardly — the exact same cure: Root Guard at the domain's borders, with companion tools like BPDU Filter handled with great care. A disciplined modern network handles all of this in a few lines and sleeps soundly.\n\n- The golden rule: PortFast for edge ports only — placing it on a port hiding a switch behind it is half a loop ready to detonate\n- Use spanning-tree portfast default to enable it automatically on all active access ports, then add BPDU Guard globally\n- In complete design: a planned root in the core/distribution + hardened edges = a Layer 2 that sleeps in its own bed",
        },
        code: {
          lang: "text",
          snippet: "! التحصين القياسي لمنافذ الطرفيات\nSwitch(config)# spanning-tree mode rapid-pvst\nSwitch(config)# spanning-tree portfast default\nSwitch(config)# spanning-tree portfast bpduguard default\n\n! أو يدوياً على منفذ بعينه\nSwitch(config)# interface range fa0/1 - 20\nSwitch(config-if-range)# spanning-tree portfast\nSwitch(config-if-range)# spanning-tree bpduguard enable\n\n! حماية الجذري من الاختطاف على منافذ التوزيع\nSwitch(config)# interface gi0/24\nSwitch(config-if)# spanning-tree guard root",
        },
        tip: {
          ar: "أشهر خطأ معملي مزدوج: تفعيل portfast على المنفذ الذي يخفي مبدّل اتصال — الإطار الأول يعبر فوراً وتتوالد الحلقة قبل أن يفيق البروتوكول. BPDU Guard هو صمام الأمان الذي يحوّل الخطأ إلى إنذار منضبط بدل عاصفة.",
          en: "The most common double lab mistake: enabling portfast on the port hiding an uplink switch — the first frame crosses instantly and the loop multiplies before the protocol wakes. BPDU Guard is the safety valve turning the mistake into a disciplined alarm instead of a storm.",
        },
      },
    ],
    keyPoints: [
      { ar: "إيثرنت بلا TTL: أي حلقة فيزيائية تولّد عاصفة بث أبدية وارتعاش جدول MAC", en: "Ethernet has no TTL: any physical loop births an eternal broadcast storm and MAC table flapping" },
      { ar: "STP يحسب شجرة ممتدة واحدة ويعطّل المنافذ الزائدة منطقياً — تكرار فيزيائي محفوظ ومنطقي محظور", en: "STP computes one spanning tree and logically disables surplus ports — physical redundancy preserved, logical forbidden" },
      { ar: "الجذري يُنتخب بأدنى Bridge ID (أولوية + VLAN + MAC)؛ خطّط جذرك بـ root primary ولا تتركه لعنوان MAC", en: "The root is elected by lowest Bridge ID (priority + VLAN + MAC); plan it with root primary, never leave it to MAC luck" },
      { ar: "الأدوار: Root Port واحد لكل مبدّل (أفضل مسار للجذري)، Designated لكل قطاع، Alternate مطفأ مستعد", en: "Roles: one Root Port per switch (best path to root), Designated per segment, Alternate dark and standby" },
      { ar: "RSTP: 3 حالات ومصافحة Proposal/Agreement وEdge فورية — تقارب من 50 ثانية إلى أجزاء الثانية", en: "RSTP: 3 states, Proposal/Agreement handshake, instant Edge — convergence from 50 seconds to sub-second" },
      { ar: "PortFast للأطراف فقط + BPDU Guard يغلق باب مبدّلات الغرباء + Root Guard يحمي جذرك من الاختطاف", en: "PortFast for edges only + BPDU Guard closes rogue-switch doors + Root Guard protects your root from hijack" },
    ],
    commands: [
      { cmd: "show spanning-tree vlan 10", desc: { ar: "عرض شجرة VLAN 10: الجذري والأدوار والتكاليف وحالات المنافذ", en: "Show VLAN 10's tree: root, roles, costs, and port states" } },
      { cmd: "spanning-tree mode rapid-pvst", desc: { ar: "التحويل إلى RSTP السريع لكل VLANs — سطر واحد بربح تقارب هائل", en: "Switch to per-VLAN rapid STP — one line for a huge convergence win" } },
      { cmd: "spanning-tree vlan 10 root primary", desc: { ar: "جعل هذا المبدّل جذراً لـ VLAN 10 بخفض الأولوية تلقائياً", en: "Make this switch VLAN 10's root by auto-lowering priority" } },
      { cmd: "show spanning-tree summary", desc: { ar: "ملخص البروتوكول وحالة PortFast وBPDU Guard العامة", en: "Protocol summary and global PortFast/BPDU Guard state" } },
    ],
    quiz: [
      {
        q: { ar: "لماذا لا تتوقف حلقة البث في الطبقة الثانية من تلقاء نفسها؟", en: "Why does a Layer-2 broadcast loop never stop by itself?" },
        options: [
          { ar: "لأن إطارات البث أثقل فتدور أبطأ", en: "Because broadcast frames are heavier and spin slower" },
          { ar: "لأن إطار الإيثرنت لا يحمل TTL ينقص عند كل قفزة كما تفعل حزم IP", en: "Because Ethernet frames carry no per-hop TTL as IP packets do" },
          { ar: "لأن المبدّلات تلتزم تخزين الإطارات إلى الأبد", en: "Because switches commit to storing frames forever" },
          { ar: "لأن STP يعيد توليدها عمداً لاختبار المسارات", en: "Because STP regenerates them deliberately to test paths" },
        ],
        correct: 1,
        explain: { ar: "حزم IP تحمل حقل TTL يُنقص عند كل موجّه فيموت المسن في نهاية المطاف؛ إطار الإيثرنت خالٍ من هذا العداد، فيدور في الحلقة مضاعفاً نفسه إلى أن تفصل وصلات أو يحظر بروتوكول شجرة الحلقة منطقياً.", en: "IP packets carry a TTL field decremented per router so the aged die eventually; Ethernet frames lack this counter, spinning in the loop doubling themselves until links are pulled or a spanning tree logically bans the loop." },
      },
      {
        q: { ar: "ما القيمة الافتراضية لأولوية الجسر في STP؟", en: "What is the default bridge priority in STP?" },
        options: [
          { ar: "1", en: "1" },
          { ar: "100", en: "100" },
          { ar: "32768", en: "32768" },
          { ar: "65535", en: "65535" },
        ],
        correct: 2,
        explain: { ar: "الافتراضي 32768 لكل المبدّلات، وعند تساوي الجميع يفوز أدنى عنوان MAC — نتيجة عشوائية ترفضها هندسة جادة، فيخطط المصمم جذره بأمر root primary الذي يهبط بالأولوية إلى 24576.", en: "Default is 32768 on all switches; on full ties the lowest MAC wins — a random outcome serious engineering rejects, so designers plan the root with root primary, dropping priority to 24576." },
      },
      {
        q: { ar: "منفذ بديل (Alternate) في حالة حجب Blocking. ما معنى ذلك وظيفياً؟", en: "An Alternate port sits in Blocking state. What does that mean functionally?" },
        options: [
          { ar: "المنفذ معطوب فيزيائياً ويحتاج استبدالاً", en: "The port is physically broken and needs replacement" },
          { ar: "وصلة احتياطية جاهزة: مطفأة منطقياً الآن وتفتح فور سقوط المسار الأفضل", en: "A standby link: logically dark now, opening the moment the best path falls" },
          { ar: "المنفذ مخصص لحركة الإدارة فقط", en: "The port is reserved for management traffic only" },
          { ar: "المنفذ رافض لوسوم 802.1Q", en: "The port rejects 802.1Q tags" },
        ],
        correct: 1,
        explain: { ar: "جوهر STP: تعطيل المنافذ الزائدة عن الشجرة منطقياً لا فيزيائياً — فالوصلة الاحتياطية تتلقى BPDUs وتبقى على أهبة الاستعداد، وإذا سقط المسار الجذري الأفضل تعيد الحساب وتتفتح في أجزاء ثانية (في RSTP).", en: "STP's essence: disabling tree-surplus ports logically, not physically — the standby link keeps hearing BPDUs and stands ready, recomputing and opening within sub-second (under RSTP) when the best root path falls." },
      },
      {
        q: { ar: "شُبك مبدّل غريب على منفذ طرفي عليه portfast وbpduguard. ماذا يحدث عند وصول أول BPDU منه؟", en: "A rogue switch is plugged into an edge port carrying portfast and bpduguard. What happens on its first BPDU's arrival?" },
        options: [
          { ar: "يتحول المنفذ جذعاً ويظهر كل VLANs للمهاجم", en: "The port becomes a trunk, exposing all VLANs to the attacker" },
          { ar: "يُدخل المنفذ err-disabled فوراً ويُغلق الباب", en: "The port enters err-disabled immediately, closing the door" },
          { ar: "يتولى المبدّل الغريب الجذري تلقائياً", en: "The rogue switch automatically becomes the root" },
          { ar: "لا شيء — BPDU Guard يعمل في الاتجاه المعاكس فقط", en: "Nothing — BPDU Guard works in the opposite direction only" },
        ],
        correct: 1,
        explain: { ar: "BPDU Guard هو الحارس المرافق لـ PortFast: منفذ طرفي لا يُفترض أن يسمع BPDU أبداً، وسماعها يعني مبدّلاً حيث لا يجب أن يكون — فيطفئ المنفذ إلى وضع err-disabled فوراً ويرفض التفاوض. عالجه بـ shutdown/no shutdown بعد إزالة الجهاز الغريب.", en: "BPDU Guard is PortFast's escort: an edge port should never hear a BPDU, and hearing one means a switch where none belongs — so the port drops into err-disabled instantly, refusing negotiation. Recover with shutdown/no shutdown after removing the rogue device." },
      },
    ],
  },
  {
    id: "l040",
    moduleId: "m04",
    order: 10,
    level: "intermediate",
    title: { ar: "ARP بعمق: الجسر بين IP وMAC وخداعه والدفاع DAI", en: "ARP Deep-Dive: The IP-MAC Bridge, Spoofing & DAI" },
    summary: {
      ar: "آلية حل العناوين خطوة بخطوة من البث إلى الجواب، أنواع ARP الخاصة، هجوم الانتحال الذي يجلس بين الضحية والبوابة، والدفاع المنظم: DHCP Snooping جدولاً ثم Dynamic ARP Inspection شرطة.",
      en: "Address resolution step by step from broadcast to reply, special ARP flavors, the spoofing attack that sits between victim and gateway, and the layered defense: DHCP Snooping for the table, then Dynamic ARP Inspection as the checkpoint.",
    },
    durationMin: 18,
    sections: [
      {
        heading: { ar: "المعضلة: أيهما يعرف من؟", en: "The Dilemma: Who Knows Whom?" },
        body: {
          ar: "طبقات الشبكة تتكلم لغتين لا تترجمان إحداهما للأخرى تلقائياً: التطبيقات والتوجيه يفكرون بعناوين IP (الطبقة الثالثة)، بينما توصيل الإيثرنت لا يفهم إلا عناوين MAC (الطبقة الثانية). عندما يعزم جهازك إرسال حزمة IP، يجب أن يكتب على مغلف الإيثرنت عنوان MAC للمستقبِل — فمن أين يأتي به؟\n\nالجواب هو ARP (Address Resolution Protocol): خدمة استعلام تبث سؤالاً على نطاق البث كله — «من يملك العنوان 192.168.1.20؟ ليخبرني بعنوان MAC الخاص به» — فيردّ المالك وحده بجواب موجه. الافتراض الفلسفي الحاكم: الثقة. من يجيب يُصدَّق دون تحقق، والجواب يُحفظ في ذاكرة مؤقتة لتسريع الجولات القادمة — وهذا بالضبط ما سيستغله المهاجم لاحقاً في هذا الدرس.\n\n- ARP خاص بعائلة IPv4؛ عائلة IPv6 تستبدله بآلية NDP (اكتشاف الجيران) الأغنى والآمنة نسبياً\n- الجسر يعمل للجهاز التالي في المسار فقط لا للوجهة النهائية البعيدة — نقطة جوهرية تلي\n- الجولات مكررة ومكلفة نسبياً (بث في كل مرة) — لذلك وُجدت ذاكرة ARP المؤقتة",
          en: "The network layers speak two languages with no automatic translation: applications and routing think in IP addresses (Layer 3), while Ethernet delivery understands nothing but MACs (Layer 2). When your device resolves to send an IP packet, it must write the recipient's MAC on the Ethernet envelope — so where does it find it?\n\nThe answer is ARP (Address Resolution Protocol): a query service broadcasting a question across the entire broadcast domain — «who owns 192.168.1.20? Tell me your MAC» — and the owner alone replies with a directed answer. The governing philosophical assumption: trust. Whoever answers is believed without verification, and the answer is cached to accelerate future rounds — precisely what the attacker exploits later in this lesson.\n\n- ARP belongs to IPv4; the IPv6 family replaces it with the richer and slightly safer NDP (Neighbor Discovery)\n- The bridge serves only the next hop, never the far final destination — a crucial point ahead\n- Rounds are repeated and relatively costly (broadcast each time) — hence the ARP cache",
        },
      },
      {
        heading: { ar: "الآلية خطوة بخطوة: من البث إلى الخريطة", en: "The Mechanism Step by Step: From Broadcast to Map" },
        body: {
          ar: "المشهد الكامل لرسالة من جهاز A (192.168.1.10) إلى جهاز B (192.168.1.20) في الشبكة المحلية نفسها: يفحص A جدول ARP — لا إدخال؟ فيبني طلباً (ARP Request) وجهته عنوان البث FF:FF:FF:FF:FF:FF يسأل عن مالك 1.20، وتكتبه كل بطاقات نطاق البث ويرفضه الجميع إلا B الذي يرد بجواب (ARP Reply) أحادي موجه إلى A يحمل عنوان MAC الخاص به.\n\nيرتدب عند المستقبِل أثر مهم: B تعلّم من الطلب نفسه عنوان A (الموجود في حقلي المرسل) فتخزنه — جولتان بمعلومة ذاتية الاكتمال. ثم يخزن A الجواب في جدوله ويبدأ الإرسال الفعلي بالإطار الذي يحمل MAC الجديد. الإدخالات تسكن الجدول دقائق معدودة قبل التقادم (تعتمد على النظام) فتضطر الشبكة إلى جولة عابرة كل فترة — والطرفية تنام في هذه الفجوات دون مرور إضافي.\n\n- انظر الجدول الحي على نظامك الآن: arp -a في ويندوز وip neigh show في لينكس\n- الطلب بث والجواب دائماً أحادي موجه — تذكر هذا في تحليلات Wireshark: مرئي للجميع مقابل سري للسائل\n- وحدات الطلب/الجواب بسيطة بشفافية بروتوكول قديم 1982: لا توقيع ولا تحقق — ثقة عمياء صممها زمن بريء",
          en: "The complete scene of a message from host A (192.168.1.10) to host B (192.168.1.20) on the same LAN: A checks its ARP table — no entry? It builds an ARP Request destined to FF:FF:FF:FF:FF:FF asking for 1.20's owner; every NIC in the broadcast domain reads it and all decline except B, which replies with a unicast ARP Reply aimed at A carrying its MAC.\n\nA valuable side-effect unfolds at the receiver: B learns A's address from the request itself (present in the sender fields) and caches it — one round, self-completing information. Then A caches the reply and begins actual transmission with the fresh MAC. Entries dwell in the table only minutes before aging (system-dependent), forcing a transient round each period — endpoints sleeping through these gaps with zero extra traffic.\n\n- See your live table now: arp -a on Windows, ip neigh show on Linux\n- The request is broadcast; the reply is always directed unicast — remember this in Wireshark: public question, private answer\n- The request/reply units are simple with 1982-grade transparency: no signature, no verification — blind trust from an innocent era",
        },
        code: {
          lang: "bash",
          snippet: "# عرض جدول ARP الحي (لينكس)\nip neigh show\n# 192.168.1.1 dev eth0 lladdr 3c:5a:b4:7f:12:90 REACHABLE\n# 192.168.1.20 dev eth0 lladdr b8:27:eb:44:91:c3 STALE\n\n# ويندوز: نفس الجدول بصياغة أخرى\narp -a\n\n# مراقبة جولة ARP كاملة أمام عينيك\nsudo tcpdump -i eth0 -e -n arp",
        },
      },
      {
        heading: { ar: "الأنواع الخاصة: من الشبكات المختلفة إلى الشبكة المجانية", en: "Special Flavors: Other Subnets & Gratuitous Announcements" },
        body: {
          ar: "أشهر سوء فهم في ARP: الجهاز البعيد. حين تريد الوصول إلى خادم في شبكة أخرى (8.8.8.8 مثلاً)، لا تسأل ARP عن عنوانه — فطلبك البث لا يغادر شبكتك أصلاً. بل تسأل عن MAC بوابتك الافتراضية، وتسلّم الحزمة إليها، والبوابة تتولى رحلتها عبر التوجيه. لهذا يحمل جدول ARP لديك عناوين شبكتك الداخلية وبوابتك فقط، مهما تصفحت العالم.\n\nنوع ثانٍ: الشبكة المجانية (Gratuitous ARP) — جهاز يعلن عن نفسه بلا سؤال: يرسل طلب ARP عن عنوانه هو بنفسه! استعمالاته نبيلة: إعلان تجزئة جديدة بعد تجميد التجزئة (failover) لتحديث جداول الجيران فوراً، وكشف تضارب العناوين عند الإقلاع (فعلت العنوان؟ ردّ مجاني يفضحك). وبجانبه Proxy ARP يجيب موجّه عن أسئلة عناوين ليست في شبكته — زمن بدائل التهيئة الخاطئة، مكروه اليوم ومضر أحياناً.\n\n- قاعدة التخزين: «اسأل عن MAC القفزة التالية فقط» — إذا رأيت جدول ARP مليئاً بعناوين إنترنت بعيدة فهنالك شيء غير سليم\n- ردّ Gratuitous ARP الواصل دون إقلاع جديد في شبكتك يستحق الوقفة: فحص تضارب عناوين أو (في الأسوأ) محاولة تسميم\n- سلوك STALE/DELAY/PROBE في ip neigh على لينكس يعكس آلة تحقق نشطة قبل استخدام الإدخال — أعمق من جدول ويندوز البسيط",
          en: "ARP's most famous misunderstanding: the remote host. When you reach a server on another network (8.8.8.8 say), you do not ARP for its address — your broadcast never leaves your network anyway. You ARP for your default gateway's MAC, hand the packet over, and the gateway carries it through routing. That is why your ARP table holds only your internal subnet and your gateway, however far you browse.\n\nA second flavor: Gratuitous ARP — a device announcing itself unasked: an ARP request about its own address! Its uses are noble: announcing a new master after failover to refresh neighbors' tables instantly, and detecting address conflicts at boot (duplicated address? a gratuitous reply exposes you). Beside it, Proxy ARP has a router answer for addresses beyond its network — a legacy of misconfigured-subnet eras, discouraged today and occasionally harmful.\n\n- The storage rule: «ARP only for the next hop» — an ARP table full of distant internet addresses means something is genuinely wrong\n- A gratuitous reply arriving without a fresh boot in your network deserves a pause: address-conflict check, or (at worst) a poisoning attempt\n- The STALE/DELAY/PROBE states in Linux ip neigh reflect an active verification machine before entry use — deeper than Windows' simple table",
        },
      },
      {
        heading: { ar: "الهجوم: الانتحال والجلوس بين الطرفين", en: "The Attack: Spoofing and Sitting in the Middle" },
        body: {
          ar: "الآن اجمع الخيوط: بروتوكول يسأل ويصدق كل من يجيب، بلا توقيع ولا تحقق. المهاجم على نطاق البث نفسه يبث جواب ARP مزيّفاً — لا يحتاج أن يكون سائلاً في الأصل! — يعلن فيه: «عنوان البوابة 192.168.1.1؟ MAC هو عنواني أنا». الضحية تحدّث جدولها بلا تردد، وترسل كل حركة الإنترنت إلى المهاجم، وهو يمررها إلى البوابة الحقيقية بعد نسخها (أو يسربها سوداء لحجب الخدمة).\n\nبمقابلة جواب مزيف للبوابة بجواب مزيف للضحية (يعلن للبوابة أن MAC الضحية هو MAC المهاجم)، يكتمل جلوس الوسط (MITM): تدفق كامل يمر عبر جهاز المهاجم في الاتجاهين والضحية لا تشعر بشيء. التشفير (HTTPS/SSH) يحمي المحتوى لكن لا يحمي الهوية المزيفة على الشبكة نفسها، والفئات غير المشفرة (HTTP القديم، FTP، SNMP الإداري!) تنكشف كاملة.\n\n- أثر الاستكشاف: جدول arp للضحية يعطي MAC البوابة نفسه الذي أعطاه لجار آخر، أو MAC البوابة تغيّر فجأة — arpaudit بسيط يكشف\n- أدوات الهجوم شهيرة ومتاحة للجميع (ettercap وARP Poison المدمج في أنظمة اختبار) — نتعلمها لنحصّن لا لنعتدي\n- هجوم صامت تماماً على الشبكات غير المحصنة: لا إسقاط حزم ولا انقطاع — فقط تدفق يمر بجهة ثالثة",
          en: "Now gather the threads: a protocol that asks and believes whoever answers, unsigned and unverified. An attacker on the same broadcast domain broadcasts a forged ARP reply — it need not have been asked at all! — declaring: «the gateway address 192.168.1.1? Its MAC is mine». The victim updates its table without hesitation, sending all internet traffic to the attacker, who relays it to the real gateway after copying it (or blackholes it for denial of service).\n\nBy pairing a forged gateway reply with a forged victim reply (telling the gateway the victim's MAC is the attacker's), the man-in-the-middle seat completes: full bidirectional flow through the attacker's device with the victim none the wiser. Encryption (HTTPS/SSH) protects content but not the impersonated identity on the network itself, and unencrypted classes (legacy HTTP, FTP, administrative SNMP!) lay fully bare.\n\n- The discovery footprint: the victim's arp table giving the gateway MAC that also belongs to another neighbor, or the gateway MAC changing abruptly — a simple audit exposes it\n- Attack tooling is famous and public (ettercap and built-in ARP poison modes in testing suites) — we learn it to harden, not to assault\n- A perfectly silent attack on unprotected networks: no drops, no outage — just flow passing a third party",
        },
        tip: {
          ar: "فحص وقائي منزلي واحد يكفي شهرياً: arp -a على جهازك وتأكد أن عنوان MAC المكتوب لبوابتك هو نفسه على بقية الأجهزة السوية. اختلافه أو تغيّره المفاجئ = إما تضارب بريء أو جالس وسط يستحق التفتيش.",
          en: "One monthly home check suffices: arp -a on your device and confirm the MAC listed for your gateway matches the one on other healthy devices. A mismatch or sudden change = either innocent duplication or a middle-sitter worth investigating.",
        },
      },
      {
        heading: { ar: "الدفاع المنظم: Snooping ثم DAI ثم الترسيخ", en: "Layered Defense: Snooping, then DAI, then Hardening" },
        body: {
          ar: "الحل البدائي — إدخالات ARP ثابتة يدوية على كل جهاز — يقتل عملياً عند ثالث جهاز: لا يتوسع ولا يتحمل التنقل ولا يجدي مع الطباعة عبر DHCP. الحل الهندسي الحقيقي ثنائي المرحلة على مستوى الشبكة: أولاً DHCP Snooping يميز منافذ الاعتماد (Uplinks نحو خادم DHCP الحقيقي) عن منافذ المستخدمين، ويبني جدول الإرتباطات (Bindings) الموثوق: منفذ + VLAN + MAC + IP الممنوحة فعلياً.\n\nثم يأتي الشرط الثاني فوق الجدول: Dynamic ARP Inspection (DAI) يعترض كل جواب ARP على منافذ المستخدمين ويطابق زوج (IP, MAC) الذي يعلنه مع جدول الارتباطات. الجواب الصادق من جهاز أخذ عنوانه من DHCP بجدارة يجتاز؛ وجواب الانتحال الذي يعلن عنوان البوابة على منفذ مستخدم لا يطابق الجدول فيُرمى فوراً وتُوثَّق المخالفة. مع تحديد معدل (rate limit) على رسائل ARP لكسر هجمات الفيضان، وثقة كاملة على منافذ الجذوع نحو بقية الشبكة الموثوقة.\n\n- فعّل Snooping أولاً وإلا استند DAI إلى جدول فارغ وأسقط كل شيء — تسلسل لا خيار فيه\n- خطر التفعيل الشائع: نسيان ip dhcp snooping trust على منفذ الخادم = انقطاع DHCP كامل بعد التفعيل مباشرة\n- أكمل التحصين بقواعد ARP اليدوية للبوابات الحرجة (arp access-list) حيثما لم يصل DHCP، وبرصد مرجعي بأدوات مثل arpwatch ترصد الانحراف حتى في الشبكات الصغيرة",
          en: "The primitive fix — hand-written static ARP entries on every device — dies in practice by the third machine: unscalable, mobility-hostile, incompatible with DHCP-printing reality. The true engineering fix is two-phase at the network level: first DHCP Snooping distinguishes trusted ports (uplinks toward the real DHCP server) from user ports, building the trusted bindings table: port + VLAN + MAC + the actually-granted IP.\n\nThen the checkpoint rides on the table: Dynamic ARP Inspection (DAI) intercepts every ARP reply on user ports, matching its declared (IP, MAC) pair against the bindings. An honest reply from a device that legitimately earned its DHCP address passes; an impersonation reply declaring the gateway's address on a user port matches nothing and is dropped instantly with the violation logged. Add rate limiting on ARP messages to break flooding attacks, and full trust on trunk ports toward the rest of the trusted network.\n\n- Enable Snooping first, or DAI leans on an empty table and drops everything — sequencing is not optional\n- The common enablement trap: forgetting ip dhcp snooping trust on the server's port = complete DHCP outage right after enabling\n- Complete the hardening with manual ARP rules for critical gateways (arp access-list) wherever DHCP does not reach, and reference monitoring with tools like arpwatch catching drift even in small networks",
        },
        code: {
          lang: "text",
          snippet: "! المرحلة 1: DHCP Snooping يبني جدول الارتباطات\nSwitch(config)# ip dhcp snooping\nSwitch(config)# ip dhcp snooping vlan 10,20\n\nSwitch(config)# interface gi0/1\nSwitch(config-if)# description UPLINK-DHCP-SERVER\nSwitch(config-if)# ip dhcp snooping trust\n\n! المرحلة 2: DAI فوق الجدول\nSwitch(config)# ip arp inspection vlan 10,20\n\nSwitch(config)# interface range fa0/1 - 20\nSwitch(config-if-range)# ip arp inspection limit rate 15\n\nSwitch(config)# interface gi0/2\nSwitch(config-if)# description TRUSTED-UPLINK\nSwitch(config-if)# ip arp inspection trust\n\n! التحقق\nSwitch# show ip dhcp snooping binding\nSwitch# show ip arp inspection statistics",
        },
      },
    ],
    keyPoints: [
      { ar: "ARP يخلق جسر IP→MAC في نطاق البث: طلب بث وجواب أحادي بلا توقيع ولا تحقق", en: "ARP bridges IP→MAC in the broadcast domain: broadcast ask, unicast answer, unsigned and unverified" },
      { ar: "الجهاز في شبكة أخرى؟ اسأل ARP عن بوابتك فقط — القفزة التالية لا الوجهة النهائية", en: "Remote host? ARP only for your gateway — the next hop, never the final destination" },
      { ar: "Gratuitous ARP يعلن بلا سؤال: تحديث الفشل وكشف التضارب — والبديل غير المطلوب يستحق التفتيش", en: "Gratuitous ARP announces unasked: failover refresh and conflict detection — an unsolicited one deserves scrutiny" },
      { ar: "انتحال ARP يحقن جواباً مزيفاً فيبني جلوس الوسط بين الضحية والبوابة بصمت كامل", en: "ARP spoofing injects forged replies, silently seating a middle-man between victim and gateway" },
      { ar: "DAI يتحقق من كل جواب مقابل جدول ارتباطات DHCP Snooping ويرمي الانتحال فوراً", en: "DAI validates every reply against the DHCP Snooping bindings table, instantly dropping impersonations" },
      { ar: "تسلسل إلزامي: Snooping أولاً (وthrift على منفذ الخادم!) ثم DAI ثم قيود المعدل", en: "Mandatory sequencing: Snooping first (and trust on the server port!) then DAI then rate limits" },
    ],
    commands: [
      { cmd: "arp -a", desc: { ar: "عرض جدول ARP الحي على جهازك: عناوين IP مقرونة بعناوين MAC", en: "Show your device's live ARP table: IPs paired with MACs" } },
      { cmd: "ip neigh show", desc: { ar: "عرض جيران IP وحالاتهم على لينكس (أعمق من arp -a)", en: "Show IP neighbors and their states on Linux (deeper than arp -a)" } },
      { cmd: "show ip arp", desc: { ar: "على Cisco: جدول ARP للموجّه أو مبدّل L3 مع الواجهات والعمر", en: "On Cisco: the router/L3 switch ARP table with interfaces and age" } },
      { cmd: "show ip arp inspection statistics", desc: { ar: "إحصاءات DAI: الرسائل المفحوصة والمخالفات المسقطة لكل VLAN", en: "DAI statistics: inspected messages and dropped violations per VLAN" } },
    ],
    quiz: [
      {
        q: { ar: "كيف يُرسَل طلب ARP العادي؟", en: "How is a normal ARP request sent?" },
        options: [
          { ar: "بث Broadcast إلى FF:FF:FF:FF:FF:FF", en: "Broadcast to FF:FF:FF:FF:FF:FF" },
          { ar: "أحادي Unicast إلى البوابة فقط", en: "Unicast to the gateway only" },
          { ar: "جماعي Multicast إلى 01:00:5E", en: "Multicast to 01:00:5E" },
          { ar: "بث لاكتشاف الجذر الجذري لـ STP", en: "Broadcast for STP root discovery" },
        ],
        correct: 0,
        explain: { ar: "الطلب يُبث على كل نطاق البث لأن السائل لا يعرف أصلاً عنوان MAC للمالك — والجواب وحده يأتي أحادياً موهاً للسائل: سؤال علني وجواب خاص، ولهذا تظهر الجولات كاملة في Wireshark عند أي طرف في الشبكة.", en: "The request broadcasts across the whole broadcast domain because the asker does not know the owner's MAC in the first place — only the reply returns unicast to the asker: public question, private answer, which is why any party sees full rounds in Wireshark." },
      },
      {
        q: { ar: "جهازك يريد الوصول إلى خادم بعيد في الإنترنت. عن أي عنوان يسأل ARP؟", en: "Your device wants a remote internet server. Whose address does it ARP for?" },
        options: [
          { ar: "عنوان MAC للخادم البعيد", en: "The remote server's MAC" },
          { ar: "عنوان MAC للبوابة الافتراضية للشبكة المحلية", en: "The local default gateway's MAC" },
          { ar: "عنوان MAC لمخدم DNS", en: "The DNS server's MAC" },
          { ar: "لا يسأل ARP إطلاقاً في هذه الحالة", en: "It performs no ARP at all in this case" },
        ],
        correct: 1,
        explain: { ar: "البث لا يعبر حدود الشبكة المحلية، فالسؤال عن MAC الخادم البعيد بلا معنى. القاعدة: اسأل عن القفزة التالية — بوابتك — وسلّم لها الحزمة بعنوان IP البعيد سليماً في الداخل، وتتولى التوجيه ما بعدها.", en: "Broadcast never crosses the local network's border, so asking for the remote server's MAC is meaningless. The rule: ARP the next hop — your gateway — and hand it the packet with the remote IP intact inside; routing takes over from there." },
      },
      {
        q: { ar: "ما الذي يجعل هجوم انتحال ARP ممكناً أساساً؟", en: "What makes ARP spoofing possible in the first place?" },
        options: [
          { ar: "ضعف تشفير حزم IP", en: "Weak IP packet encryption" },
          { ar: "غياب أي آلية تحقق في البروتوكول: كل جواب يُصدَّق كما هو", en: "Total absence of verification: any reply is believed as-is" },
          { ar: "بطء جدول MAC في المبدّلات", en: "Slow MAC tables in switches" },
          { ar: "استخدام عناوين IPv4 القديمة", en: "The use of legacy IPv4 addresses" },
        ],
        correct: 1,
        explain: { ar: "صمم ARP زمناً بريئاً: لا توقيع ولا تحقق ولا تسلسل — أي جهاز يستطيع الرد على أي سؤال (بل وإرسال ردود بلا سؤال) فتصدقه الطرفيات وتحدّث جداولها. DAI يستعيد التحقق بطبقة شبكية فوق البروتوكول لا بتعديله.", en: "ARP was designed in an innocent era: no signature, no verification, no sequencing — any device may answer any question (even send replies unasked) and endpoints believe and update. DAI restores verification as a network-layer overlay rather than by modifying the protocol." },
      },
      {
        q: { ar: "فعّلت DAI على VLAN 20 دون تمكين DHCP Snooping مسبقاً. ماذا يحدث للمرور؟", en: "You enabled DAI on VLAN 20 without first enabling DHCP Snooping. What happens to traffic?" },
        options: [
          { ar: "يعمل طبيعياً — DAI مستقل تماماً", en: "Works normally — DAI is fully independent" },
          { ar: "يعمل نصفياً: الجواب الصادق يمر والانتحال يسقط", en: "Works partially: honest replies pass, spoofs drop" },
          { ar: "معظم جواب ARP يسقط لأن الجدول الذي يتحقق منه DAI فارغ بلا Snooping", en: "Most ARP replies drop because DAI's validation table is empty without Snooping" },
          { ar: "يتوقف STP بالكامل على VLAN 20", en: "STP halts entirely on VLAN 20" },
        ],
        correct: 2,
        explain: { ar: "DAI يستند في كل قرار إلى جدول ارتباطات DHCP Snooping؛ بدونه لا يعرف العناوين المشروعة فترمي الجواب الصادق والزيف معاً ويختنق مرور الشبكة. التسلسل إلزامي: Snooping أولاً، وثقة على منفذ الخادم، ثم DAI.", en: "DAI grounds every decision in the DHCP Snooping bindings table; without it, legitimate addresses are unknown so honest and forged replies drop together and the network chokes. Sequencing is mandatory: Snooping first, trust on the server port, then DAI." },
      },
    ],
  },
];
